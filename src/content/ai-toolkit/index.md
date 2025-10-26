---
title: AI Toolkit
description: >
  學習如何將 AI Toolkit 聊天機器人
  加入到你的 Flutter 應用程式中。
next:
  title: 使用者體驗
  path: /ai-toolkit/user-experience
---

您好，歡迎來到 Flutter AI Toolkit！

AI Toolkit 是一套與 AI 聊天相關的元件，能讓你輕鬆地在 Flutter 應用程式中加入 AI 聊天視窗。AI Toolkit 以抽象化的大型語言模型（LLM）提供者 API 為核心設計，方便你隨時切換想要用於聊天的 LLM 提供者。開箱即用，支援兩種 LLM 提供者整合：Google Gemini AI 以及 Firebase Vertex AI。

## 主要功能

* **多輪對話**：可在多次互動間維持上下文。
* **串流回應**：AI 回應會即時顯示，隨生成內容同步呈現。
* **豐富文字顯示**：支援聊天訊息中的格式化文字。
* **語音輸入**：允許使用者透過語音輸入提示。
* **多媒體附件**：可傳送與接收各種媒體類型。
* **自訂樣式**：提供高度自訂化，能符合你的應用程式設計。
* **聊天序列化／反序列化**：可在應用程式不同階段儲存與讀取對話內容。
* **自訂回應元件**：可引入專屬 UI 元件來呈現 LLM 回應。
* **可插拔 LLM 支援**：只需實作簡單介面，即可接入自有 LLM。
* **跨平台支援**：相容於 Android、iOS、Web 及 macOS 平台。

## 線上展示

這裡有一個線上展示，展示 AI Toolkit：

<a href="https://flutter-ai-toolkit-examp-60bad.web.app/">
<img src="/assets/images/docs/ai-toolkit/ai-toolkit-app.png" alt="AI demo app">
</a>

這個展示的[原始碼][src-code]可在 GitHub 的儲存庫中取得。

你也可以在 [Firebase Studio][Firebase Studio] 中開啟，這是 Google 的雲端全方位 AI 工作空間與 IDE：

<a href="https://studio.firebase.google.com/new?template=https%3A%2F%2Fgithub.com%2Fflutter%2Fai">
  <picture>
    
    
    <img
      height="32"
      alt="Try in Firebase Studio"
      src="https://cdn.firebasestudio.dev/btn/try_blue_32.svg">
  </picture>
</a>

[src-code]: {{site.github}}/flutter/ai/blob/main/example/lib/demo/demo.dart
[Firebase Studio]: https://firebase.studio/

## 開始使用

<ol>
<li><b>安裝</b>

請在你的 `pubspec.yaml` 檔案中加入以下相依套件：

```yaml
dependencies:
  flutter_ai_toolkit: ^latest_version
  google_generative_ai: ^latest_version # you might choose to use Gemini,
  firebase_core: ^latest_version        # or Vertex AI or both
```
</li>

<li><b>Gemini AI 設定</b>

此工具包同時支援 Google Gemini AI 與 Firebase Vertex AI 作為大型語言模型 (LLM) 提供者。
若要使用 Google Gemini AI，請先至 Gemini AI Studio
[取得 API 金鑰][obtain an API key]。
請注意，切勿將此金鑰提交到你的原始碼儲存庫，以避免未經授權的存取。


[obtain an API key]: https://aistudio.google.com/app/apikey

你也需要選擇一個特定的 Gemini 模型名稱，
以便在建立 Gemini 模型實例時使用。
以下範例使用 `gemini-2.0-flash`，
但你也可以從[持續擴充的模型清單][models]中選擇其他模型。


[models]: https://ai.google.dev/gemini-api/docs/models/gemini


```dart
import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:flutter_ai_toolkit/flutter_ai_toolkit.dart';

// ... app stuff here

class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text(App.title)),
        body: LlmChatView(
          provider: GeminiProvider(
            model: GenerativeModel(
              model: 'gemini-2.0-flash',
              apiKey: 'GEMINI-API-KEY',
            ),
          ),
        ),
      );
}
```

`GenerativeModel` 類別來自 `google_generative_ai` 套件。  
AI Toolkit 以此套件為基礎，並透過 `GeminiProvider` 將 Gemini AI 插入到 `LlmChatView`，這是一個頂層元件（Widget），可為你的使用者提供基於大型語言模型 (LLM) 的聊天對話功能。

如需完整範例，請參考 [`gemini.dart`][`gemini.dart`]（GitHub）。

[`gemini.dart`]: {{site.github}}/flutter/ai/blob/main/example/lib/gemini/gemini.dart
</li>

<li><b>Vertex AI 設定</b>

雖然 Gemini AI 很適合快速原型開發，  
但建議在正式上線的應用程式中使用 Firebase 的 Vertex AI。這樣一來，就不需要在用戶端應用程式中存放 API 金鑰，而是以更安全的 Firebase 專案取代。  
若要在你的專案中使用 Vertex AI，請依照  
[Get started with the Gemini API using the Vertex AI in Firebase SDKs][vertex] 文件中的步驟操作。

[vertex]: https://firebase.google.com/docs/vertex-ai/get-started?platform=flutter

完成上述步驟後，請依照 [Add Firebase to your Flutter app][firebase] 文件的說明，使用 `flutterfire CLI` 工具將新的 Firebase 專案整合到你的 Flutter 應用程式中。

[firebase]: https://firebase.google.com/docs/flutter/setup

完成這些設定後，你就可以在 Flutter 應用程式中使用 Firebase Vertex AI 了。  
首先，初始化 Firebase：

```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_vertexai/firebase_vertexai.dart';
import 'package:flutter_ai_toolkit/flutter_ai_toolkit.dart';

// ... other imports

import 'firebase_options.dart'; // from `flutterfire config`

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const App());
}

// ...app stuff here
```

當你已在 Flutter 應用程式中正確初始化 Firebase 後，
現在就可以建立 Vertex provider 的實例了：

```dart
class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text(App.title)),
        // create the chat view, passing in the Vertex provider
        body: LlmChatView(
          provider: VertexProvider(
            chatModel: FirebaseVertexAI.instance.generativeModel(
              model: 'gemini-2.0-flash',
            ),
          ),
        ),
      );
}
```


`FirebaseVertexAI` 類別來自 `firebase_vertexai` 套件。AI Toolkit 會建立 `VertexProvider` 類別，以將 Vertex AI 暴露給 `LlmChatView`。請注意，您需要提供模型名稱（[您有多種選擇][options]），但不需要提供 API 金鑰。這些都會由 Firebase 專案自動處理。

如需完整範例，請參考 GitHub 上的 [vertex.dart][vertex.dart]。

[options]: https://firebase.google.com/docs/vertex-ai/gemini-models#available-model-names
[vertex.dart]: {{site.github}}/flutter/ai/blob/main/example/lib/vertex/vertex.dart
</li>

<li><b>設定裝置權限</b>

若要讓您的使用者能夠使用語音輸入及媒體附件等功能，請確保您的應用程式已取得必要的權限：

* **網路存取權限：**
  若要在 macOS 上啟用網路存取，請在您的 `*.entitlements` 檔案中加入以下內容：

  ```xml
  <plist version="1.0">
    <dict>
      ...
      <key>com.apple.security.network.client</key>
      <true/>
    </dict>
  </plist>
  ```

  若要在 Android 啟用網路存取，請確保您的 `AndroidManifest.xml` 檔案包含以下內容：

  ```xml
  <manifest xmlns:android="http://schemas.android.com/apk/res/android">
      ...
      <uses-permission android:name="android.permission.INTERNET"/>
  </manifest>
  ```

* **麥克風存取權限**：請依照
  [record 套件的權限設定說明][record]進行設定。
* **檔案選擇**：請參考 [file_selector 外掛的說明][file]。
* **圖片選擇**：若要拍照或從裝置選擇圖片，
  請參考 [image_picker 外掛的安裝說明][image_picker]。
* **網頁拍照**：若要在網頁端拍照，請依照
  [camera 外掛的設定說明][camera]進行應用程式設定。

[camera]: {{site.pub-pkg}}/camera#setup
[file]: {{site.pub-pkg}}/file_selector#usage
[image_picker]: {{site.pub-pkg}}/image_picker#installation
[record]: {{site.pub-pkg}}/record#setup-permissions-and-others
</li>
</ol>

## 範例

若要執行此儲存庫中的 [範例應用程式][example apps]，
你需要替換 `example/lib/gemini_api_key.dart`
與 `example/lib/firebase_options.dart` 這兩個檔案，
這兩個檔案目前都只是占位符。它們是
啟用 `example/lib` 目錄下範例專案所必需的。

**gemini_api_key.dart**

大多數範例應用程式都依賴 Gemini API 金鑰，
因此你必須將自己的 API 金鑰
填入 `example/lib/gemini_api_key.dart` 檔案中才能正常運作。
你可以在 [Gemini AI Studio][Gemini AI Studio] 取得 API 金鑰。

:::note
**請務必不要將 `gemini_api_key.dart` 檔案提交到你的 git 儲存庫中。**
:::

**firebase_options.dart**

若要使用 [Vertex AI 範例應用程式][vertex-ex]，
請將你的 Firebase 設定資訊
放入 `example/lib/firebase_options.dart` 檔案中。
你可以依照 [將 Firebase 新增至你的 Flutter 應用程式][add-fb]
文件中的說明，使用 `flutterfire CLI` 工具
**在 `example` 目錄下** 完成這個步驟。

:::note
**請務必不要將 `firebase_options.dart`
檔案提交到你的 git 儲存庫中。**
:::

## 意見回饋！

在你使用這個套件的過程中，
歡迎[回報問題與功能需求][file-issues]，
也歡迎[貢獻你想提交的程式碼][submit]。
我們非常重視你的回饋與貢獻，
希望能讓 AI Toolkit 在真實應用中
更加穩健且實用。

[add-fb]: https://firebase.google.com/docs/flutter/setup
[example apps]: {{site.github}}/flutter/ai/tree/main/example/lib
[file-issues]: {{site.github}}/flutter/ai/issues
[Gemini AI Studio]: https://aistudio.google.com/app/apikey
[submit]: {{site.github}}/flutter/ai/pulls
[vertex-ex]: {{site.github}}/flutter/ai/blob/main/example/lib/vertex/vertex.dart
