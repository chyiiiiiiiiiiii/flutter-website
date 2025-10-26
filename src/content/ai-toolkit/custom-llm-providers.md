---     
title: 自訂大型語言模型 (LLM) 提供者
description: >
  如何與其他 Flutter 功能整合。
prev:
  title: 功能整合
  path: /ai-toolkit/feature-integration
next:
  title: 聊天用戶端範例
  path: /ai-toolkit/chat-client-sample
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
也可以在其他雲端服務提供者上，
可以是專有的 LLM，也可以是開源的。
任何能夠實作此介面的 LLM 或類 LLM 端點，
都可以作為 LLM 提供者，插入聊天視圖中使用。AI Toolkit
預設內建三種提供者，
這三者皆實作了 `LlmProvider` 介面，
可將提供者插入至下列項目：

* [Gemini provider][Gemini provider]，
  其包裝了 `google_generative_ai` 套件
* [Vertex provider][Vertex provider]，
  其包裝了 `firebase_vertexai` 套件
* [Echo provider][Echo provider]，
  作為最簡範例的提供者非常實用

[Echo provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/EchoProvider-class.html
[Gemini provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/GeminiProvider-class.html
[`LlmProvider` interface]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html
[Vertex provider]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/VertexProvider-class.html

## 實作方式

若要建立自訂的提供者，您需要實作
`LlmProvider` 介面，並注意以下幾點：

1. 提供完整的組態支援
1. 處理歷史紀錄
1. 將訊息與附件轉換給底層 LLM
1. 呼叫底層 LLM

1. 組態
   為了讓您的自訂提供者支援完整的可組態性，
   您應允許使用者建立底層模型，
   並將其作為參數傳入，這與 Gemini provider 的做法相同：

```dart
class GeminiProvider extends LlmProvider ... {
  @immutable
  GeminiProvider({
    required GenerativeModel model,
    ...
  })  : _model = model,
        ...

  final GenerativeModel _model;
  ...
}
```

如此一來，無論未來底層模型有任何變動，所有的設定選項都會對您自訂的提供者使用者開放。

2. 歷史紀錄（History）
  歷史紀錄是任何提供者（provider）中非常重要的一環——提供者不僅需要允許直接操作歷史紀錄，還必須在歷史紀錄變更時通知監聽者。此外，為了支援序列化以及變更提供者參數，還必須支援在建構過程中將歷史紀錄儲存為一部分。

  Gemini 提供者（Gemini provider）處理此需求的方式如下所示：

```dart
class GeminiProvider extends LlmProvider with ChangeNotifier {
  @immutable
  GeminiProvider({
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

你會在這段程式碼中注意到幾件事：

* 使用 `ChangeNotifier` 來實作 `LlmProvider` 介面中的 `Listenable` 方法需求
* 可以在建構子參數中傳入初始歷史紀錄
* 當有新的使用者提示/大型語言模型 (LLM) 回應配對時，會通知監聽者
* 當歷史紀錄被手動變更時，會通知監聽者
* 當歷史紀錄變更時，會根據新歷史紀錄建立新的聊天

基本上，自訂提供者會管理與底層大型語言模型 (LLM) 單一聊天會話的歷史紀錄。
隨著歷史紀錄的變更，底層聊天必須自動保持最新
（就像當你呼叫底層 Gemini AI SDK for Dart 的聊天專用方法時會自動更新）
或是需要手動重新建立
（就像當 Gemini 提供者手動設定歷史紀錄時所做的）。

3. 訊息與附件

附件必須從由 `LlmProvider` 類型所公開的標準 `ChatMessage` 類別，
對應到底層大型語言模型 (LLM) 所處理的格式。
例如，Gemini 提供者會將 AI Toolkit 的 `ChatMessage` 類別，
對應到 Gemini AI SDK for Dart 所提供的 `Content` 類型，
如下例所示：

```dart
import 'package:google_generative_ai/google_generative_ai.dart';
...

class GeminiProvider extends LlmProvider with ChangeNotifier {
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

`_contentFrom` 方法會在每當需要將使用者提示詞（prompt）傳送給底層 LLM 時被呼叫。  
每個 provider 都需要為其自身實作對應的映射。

4. 呼叫 LLM

你如何呼叫底層 LLM 來實作 `generateStream` 和 `sendMessageStream` 方法，取決於它所暴露的協定（protocol）。  
AI Toolkit 中的 Gemini provider 負責處理設定與歷史紀錄，但對 `generateStream` 和 `sendMessageStream` 的呼叫，最終都會轉為呼叫 Gemini AI SDK for Dart 的 API：

```dart
class GeminiProvider extends LlmProvider with ChangeNotifier {
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

[Gemini provider][Gemini provider] 與 [Vertex provider][Vertex provider] 的實作幾乎完全相同，非常適合作為你自訂 provider 的起點。如果你想參考一個將所有底層大型語言模型 (LLM) 呼叫移除的 provider 實作範例，可以查看 [Echo example app][Echo example app]。這個範例僅將使用者的提示與附件格式化為 Markdown，並作為回應傳回給使用者。

[Echo example app]: {{site.github}}/flutter/ai/blob/main/lib/src/providers/implementations/echo_provider.dart
