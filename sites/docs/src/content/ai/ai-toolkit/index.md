---
title: Flutter AI Toolkit
sidenav: ai
shortTitle: AI Toolkit
description: >
  了解如何將 AI Toolkit 聊天機器人
  加入您的 Flutter 應用程式。
next:
  title: User experience
  path: /ai/ai-toolkit/user-experience
---

您好，歡迎使用 Flutter AI Toolkit！

AI Toolkit 是一組 AI 聊天相關的元件 (Widget)，可讓您輕鬆地在 Flutter 應用程式中加入 AI 聊天視窗。AI Toolkit 圍繞著抽象的 LLM 提供者 API 進行組織，方便您替換聊天提供者所使用的 LLM 提供者。開箱即用，它已內建支援 [Firebase AI Logic][]。

[Firebase AI Logic]: https://firebase.google.com/docs/ai-logic

## 主要功能

* **多輪對話**：在多次互動中保持上下文。
* **串流回應**：在 AI 生成回應時即時顯示。
* **富文字顯示**：支援聊天訊息中的格式化文字。
* **語音輸入**：允許使用者透過語音輸入提示。
* **多媒體附件**：支援傳送和接收各種媒體類型。
* **函式呼叫**：支援對 LLM 提供者的工具呼叫。
* **自訂樣式**：提供廣泛的自訂功能，以符合您的應用程式設計。
* **聊天序列化/反序列化**：在應用程式工作階段之間儲存與取得對話。
* **自訂回應元件**：引入專屬 UI 元件來呈現 LLM 回應。
* **可插拔的 LLM 支援**：實作簡單介面以插入您自己的 LLM。
* **跨平台支援**：相容於 Android、iOS、web 及 macOS 平台。

## 示範

以下是搭載 AI Toolkit 的示範範例畫面：

<img src="/assets/images/docs/ai-toolkit/ai-toolkit-app.png" alt="AI demo app">

此示範的[原始碼][src-code]已在 GitHub 的 repo 中公開。

[src-code]: {{site.github}}/flutter/ai/blob/main/example/lib/demo/demo.dart

## 開始使用

<ol>
<li><b>安裝</b>

在您的 `pubspec.yaml` 檔案中加入以下相依套件：

```yaml
dependencies:
  flutter_ai_toolkit: ^latest_version
  firebase_ai: ^latest_version
  firebase_core: ^latest_version
```
</li>

<li><b>設定</b>

AI Toolkit 同時支援 Gemini 端點（用於原型開發）和 Vertex 端點（用於正式環境）。兩者都需要一個 Firebase 專案，並如 [使用 Firebase AI Logic SDK 開始使用 Gemini API][firebase_ai] 文件所述初始化 `firebase_core` 套件。

[firebase_ai]:
    https://firebase.google.com/docs/ai-logic/get-started?platform=flutter

完成後，請使用 `flutterfire CLI` 工具將新的 Firebase 專案整合至您的 Flutter 應用程式中，如 [將 Firebase 加入您的 Flutter 應用程式][firebase] 文件所述。

[firebase]: https://firebase.google.com/docs/flutter/setup

按照這些指示操作後，您即可使用 Firebase 在 Flutter 應用程式中整合 AI。首先初始化 Firebase：

```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_ai/firebase_ai.dart';
import 'package:flutter_ai_toolkit/flutter_ai_toolkit.dart';

// ... 其他 import

import 'firebase_options.dart'; // 來自 `flutterfire config`

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const App());
}

// ... 應用程式內容
```

在 Flutter 應用程式中正確初始化 Firebase 後，您就可以建立 Firebase 提供者的實例。您可以透過兩種方式進行。若要進行原型開發，請考慮使用 Gemini AI 端點：

```dart
import 'package:firebase_ai/firebase_ai.dart';
import 'package:flutter_ai_toolkit/flutter_ai_toolkit.dart';

// ... 應用程式內容

class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text(App.title)),
        // 建立聊天視圖，並傳入 Firebase 提供者
        body: LlmChatView(
          provider: FirebaseProvider(
            // 使用 Google AI 端點
            model: FirebaseAI.googleAI().generativeModel(
              model: 'gemini-2.5-flash',
            ),
          ),
        ),
      );
}
```

`FirebaseProvider` 類別將 Firebase AI Logic SDK 暴露給 `LlmChatView`。請注意，您提供的是模型名稱（您有[多個選項][options]可供選擇），而無需提供 API 金鑰，這些都由 Firebase 專案統一處理。

若要用於正式環境的工作負載，可以輕鬆切換至 Firebase Logic AI 端點：

```dart
class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text(App.title)),
        body: LlmChatView(
          provider: FirebaseProvider(
            // 使用 Vertex AI 端點
            model: FirebaseAI.vertexAI().generativeModel(
              model: 'gemini-2.5-flash',
            ),
          ),
        ),
      );
}
```


如需完整範例，請參閱 [gemini.dart] 和 [vertex.dart][] 範例。

[options]:
    https://firebase.google.com/docs/vertex-ai/gemini-models#available-model-names
[gemini.dart]:
    {{site.github}}/flutter/ai/blob/main/example/lib/gemini/gemini.dart
[vertex.dart]:
    {{site.github}}/flutter/ai/blob/main/example/lib/vertex/vertex.dart
</li>

<li><b>設定裝置權限</b>

為了讓您的使用者能夠使用語音輸入和媒體附件等功能，請確保您的應用程式具備必要的權限：

* **網路存取**：若要在 macOS 上啟用網路存取，請在您的 `*.entitlements` 檔案中加入以下內容：

  ```xml
  <plist version="1.0">
    <dict>
      ...
      <key>com.apple.security.network.client</key>
      <true/>
    </dict>
  </plist>
  ```

  若要在 Android 上啟用網路存取，請確保您的 `AndroidManifest.xml` 檔案包含以下內容：

  ```xml
  <manifest xmlns:android="http://schemas.android.com/apk/res/android">
      ...
      <uses-permission android:name="android.permission.INTERNET"/>
  </manifest>
  ```

* **麥克風存取**：請依照 [record 套件的權限設定說明][record] 進行設定。
* **檔案選取**：請遵循 [file_selector 插件的說明][file]。
* **圖片選取**：若要在裝置上拍照_或_從裝置中選取圖片，請參閱 [image_picker 插件的安裝說明][image_picker]。
* **網頁拍照**：若要在網頁上拍照，請依照 [camera 插件的設定說明][camera] 設定應用程式。

[camera]: {{site.pub-pkg}}/camera#setup
[file]: {{site.pub-pkg}}/file_selector#usage
[image_picker]: {{site.pub-pkg}}/image_picker#installation
[record]: {{site.pub-pkg}}/record#setup-permissions-and-others
</li>
</ol>

## 範例

**firebase_options.dart**

若要使用 [Vertex AI 範例應用程式][vertex-ex]，請將您的 Firebase 設定詳細資訊放入 `example/lib/firebase_options.dart` 檔案中。您可以在 **`example` 目錄內**，使用 `flutterfire CLI` 工具完成此操作，如 [將 Firebase 加入您的 Flutter 應用程式][add-fb] 文件所述。

:::note `firebase_options.dart` 的安全性考量

如果您的 Flutter 應用程式直接從用戶端呼叫 Gemini 或 Vertex AI，請勿將 `firebase_options.dart` 提交至公開儲存庫。任何人都可以重複使用您的應用程式設定，向您的 AI 端點發送請求，進而消耗配額並可能產生費用。

雖然本指南為了簡便起見展示了直接用戶端呼叫的方式，但對於正式環境的應用程式，您應將 AI 請求透過後端服務進行路由（例如 [Cloud Functions for Firebase](https://firebase.google.com/docs/functions)、[Cloud Run](https://cloud.google.com/run) 或您自己的伺服器）。在這種設定下，由後端而非用戶端控制存取，將 `firebase_options.dart` 包含在儲存庫中也是安全的。

您也應該檢視並遵循 [Firebase 安全性檢查清單](https://firebase.google.com/support/guides/security-checklist)。
:::

## 意見回饋

在您使用此套件的過程中，請[記錄問題和功能請求][file-issues]，並提交您希望[貢獻的程式碼][submit]。我們希望獲得您的意見回饋與貢獻，以確保 AI Toolkit 能為您的實際應用程式提供盡可能強健且實用的功能。

[add-fb]: https://firebase.google.com/docs/flutter/setup
[example apps]: {{site.github}}/flutter/ai/tree/main/example/lib
[file-issues]: {{site.github}}/flutter/ai/issues
[submit]: {{site.github}}/flutter/ai/pulls
[vertex-ex]: {{site.github}}/flutter/ai/blob/main/example/lib/vertex/vertex.dart
