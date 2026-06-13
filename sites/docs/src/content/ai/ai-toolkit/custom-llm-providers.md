---
title: 自訂大型語言模型 (LLM) 提供者
sidenav: ai
description: >
  如何與其他 Flutter 功能整合。
prev:
  title: 功能整合
  path: /ai/ai-toolkit/feature-integration
next:
  title: 聊天用戶端範例
  path: /ai/ai-toolkit/chat-client-sample
---

連接大型語言模型 (LLM) 與 `LlmChatView` 的協定，
是透過 [`LlmProvider` 介面][`LlmProvider` interface] 來表達的：

```dart
abstract class LlmProvider implements Listenable {
  Stream<String> generateStream(String prompt, {Iterable<Attachment> attachments});
  Stream<String> sendMessageStream(String prompt, {Iterable<Attachment> attachments});
  Iterable<ChatMessage> get history;
  set history(Iterable<ChatMessage> history);
}
```

大型語言模型 (LLM) 可以部署在雲端或本地端，
可以託管於 Google Cloud Platform，
也可以在其他雲端服務商上，
可以是專有的大型語言模型，也可以是開源的。
任何能夠用來實作此介面的
大型語言模型 (LLM) 或類 LLM 端點，
都可以作為 LLM 提供者，插入聊天視圖中。
AI Toolkit 預設提供兩種 LLM 提供者，
這兩者都實作了 `LlmProvider` 介面，
因此可作為下列用途：

* [Firebase AI Logic provider][Firebase AI Logic provider]，
  封裝了 `firebase_ai` 套件
* [Echo provider][Echo provider]，
  作為最簡單的提供者範例非常實用

[Echo provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/EchoProvider-class.html
[`LlmProvider` interface]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html
[Firebase AI Logic provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/FirebaseProvider-class.html

## 實作方式

若要建立自訂的 LLM 提供者，您需要實作
`LlmProvider` 介面，並注意以下幾點：

1. 提供完整的組態支援
1. 處理歷史紀錄
1. 將訊息與附件轉換給底層 LLM
1. 呼叫底層 LLM

1. 組態
   為了讓您的自訂提供者支援完整的組態功能，
   您應該允許使用者建立底層模型，
   並將其作為參數傳入，就像 MyLlmProvider 所做的那樣：

```dart
class MyLlmProvider extends LlmProvider ... {
  @immutable
  MyLlmProvider({
    required GenerativeModel model,
    ...
  })  : _model = model,
        ...

  final GenerativeModel _model;
  ...
}
```

如此一來，無論未來底層模型有任何變動，所有的設定選項都會對你自訂的 provider 使用者開放。

2. 歷史紀錄
歷史紀錄（History）是任何 provider 的重要部分——provider 不僅需要允許直接操作歷史紀錄，還必須在變動時通知監聽者。此外，為了支援序列化以及變更 provider 參數，它還必須支援在建構過程中儲存歷史紀錄。

Firebase provider 的處理方式如下所示：

```dart
class MyLlmProvider extends LlmProvider with ChangeNotifier {
  @immutable
  MyLlmProvider({
    required GenerativeModel model,
    Iterable<ChatMessage>? history,
    ...
  })  : _model = model,
        _history = history?.toList() ?? [],
        ... { ... }

  final GenerativeModel _model;
  final List<ChatMessage> _history;
  ...

  @override
  Stream<String> sendMessageStream(
    String prompt, {
    Iterable<Attachment> attachments = const [],
  }) async* {
    final userMessage = ChatMessage.user(prompt, attachments);
    final llmMessage = ChatMessage.llm();
    _history.addAll([userMessage, llmMessage]);

    final response = _generateStream(
      prompt: prompt,
      attachments: attachments,
      contentStreamGenerator: _chat!.sendMessageStream,
    );

    yield* response.map((chunk) {
      llmMessage.append(chunk);
      return chunk;
    });

    notifyListeners();
  }

  @override
  Iterable<ChatMessage> get history => _history;

  @override
  set history(Iterable<ChatMessage> history) {
    _history.clear();
    _history.addAll(history);
    _chat = _startChat(history);
    notifyListeners();
  }

  ...
}
```

你會在這段程式碼中注意到以下幾點：
* 使用 `ChangeNotifier` 來實作 `LlmProvider` 介面中的 `Listenable` 方法需求
* 可以在建構子參數中傳入初始歷史紀錄（history）
* 當有新的使用者提示/大型語言模型 (LLM) 回應配對時，會通知監聽器
* 當歷史紀錄被手動變更時，會通知監聽器
* 當歷史紀錄變更時，會使用新的歷史紀錄建立新的聊天

基本上，自訂的 provider 會管理與底層大型語言模型 (LLM) 單一聊天會話的歷史紀錄。
隨著歷史紀錄的變化，底層聊天需要自動保持最新
（就像當你呼叫底層聊天專用方法時，Firebase provider 會自動同步）
或是需要手動重新建立
（就像當 Firebase provider 手動設定歷史紀錄時所做的那樣）。

3. 訊息與附件

附件必須從 `LlmProvider` 類型所公開的標準 `ChatMessage` 類別，
對應到底層大型語言模型 (LLM) 能處理的格式。
例如，Firebase provider 會將 AI Toolkit 的 `ChatMessage` 類別
對應到 Firebase Logic AI SDK 所提供的 `Content` 類型，
如下例所示：

```dart
import 'package:firebase_ai/firebase_ai.dart';
...

class MyLlmProvider extends LlmProvider with ChangeNotifier {
  ...
  static Part _partFrom(Attachment attachment) => switch (attachment) {
        (final FileAttachment a) => DataPart(a.mimeType, a.bytes),
        (final LinkAttachment a) => FilePart(a.url),
      };

  static Content _contentFrom(ChatMessage message) => Content(
        message.origin.isUser ? 'user' : 'model',
        [
          TextPart(message.text ?? ''),
          ...message.attachments.map(_partFrom),
        ],
      );
}
```

`_contentFrom` 方法會在每當需要將使用者提示詞傳送至底層 LLM 時被呼叫。
每個提供者都需要為其自身實作對應的映射。

4. 呼叫 LLM

你如何呼叫底層 LLM 來實作 `generateStream` 和 `sendMessageStream` 方法，取決於其所公開的協定。
AI Toolkit 中的 Firebase provider 會處理組態與歷史紀錄，但對 `generateStream` 和 `sendMessageStream` 的呼叫，最終都會轉為呼叫 Firebase Logic AI SDK 的 API：

```dart
class MyLlmProvider extends LlmProvider with ChangeNotifier {
  ...

  @override
  Stream<String> generateStream(
    String prompt, {
    Iterable<Attachment> attachments = const [],
  }) =>
      _generateStream(
        prompt: prompt,
        attachments: attachments,
        contentStreamGenerator: (c) => _model.generateContentStream([c]),
      );

  @override
  Stream<String> sendMessageStream(
    String prompt, {
    Iterable<Attachment> attachments = const [],
  }) async* {
    final userMessage = ChatMessage.user(prompt, attachments);
    final llmMessage = ChatMessage.llm();
    _history.addAll([userMessage, llmMessage]);

    final response = _generateStream(
      prompt: prompt,
      attachments: attachments,
      contentStreamGenerator: _chat!.sendMessageStream,
    );

    yield* response.map((chunk) {
      llmMessage.append(chunk);
      return chunk;
    });

    notifyListeners();
  }

  Stream<String> _generateStream({
    required String prompt,
    required Iterable<Attachment> attachments,
    required Stream<GenerateContentResponse> Function(Content)
        contentStreamGenerator,
  }) async* {
    final content = Content('user', [
      TextPart(prompt),
      ...attachments.map(_partFrom),
    ]);

    final response = contentStreamGenerator(content);
    yield* response
        .map((chunk) => chunk.text)
        .where((text) => text != null)
        .cast<String>();
  }

  @override
  Iterable<ChatMessage> get history => _history;

  @override
  set history(Iterable<ChatMessage> history) {
    _history.clear();
    _history.addAll(history);
    _chat = _startChat(history);
    notifyListeners();
  }
}
```

## 範例

[Firebase provider][Firebase provider] 的實作
為你自訂的 provider 提供了一個很好的起點。
如果你想參考一個將所有對底層大型語言模型 (LLM) 呼叫都移除的 provider 實作範例，
可以查看 [Echo example app][Echo example app]。該範例僅將使用者的 prompt 和附件格式化為 Markdown，然後作為回應傳回給使用者。

[Echo example app]:
    {{site.github}}/flutter/ai/blob/main/lib/src/providers/implementations/echo_provider.dart
[Firebase provider]:
    {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/FirebaseProvider-class.html
