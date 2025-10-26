---
title: 載入順序、效能與記憶體
description: 顯示 Flutter UI 時所涉及的步驟。
---

本頁說明顯示 Flutter UI 時所涉及步驟的詳細拆解。了解這些步驟後，您可以更有依據地決定何時預先啟動 Flutter 引擎、各階段可執行哪些操作，以及這些操作的延遲與記憶體成本。

## 載入 Flutter

Android 與 iOS 應用程式（這兩個是目前支援整合至現有應用的平臺）、完整的 Flutter 應用程式，以及 add-to-app 模式，在顯示 Flutter UI 時，都有類似的概念性載入步驟流程。

### 尋找 Flutter 資源

Flutter 的引擎執行階段與您的應用程式編譯後的 Dart 程式碼，會以共享函式庫（shared libraries）的形式打包於 Android 與 iOS 上。載入 Flutter 的第一步，就是在您的 .apk/.ipa/.app 檔案中找到這些資源（以及其他 Flutter 資產，如圖片、字型與 JIT 程式碼（如適用））。

這個步驟會在您第一次建立 `FlutterEngine` 時於 **[Android][android-engine]** 及 **[iOS][ios-engine]** API 上發生。

:::note
有些套件允許您將圖片與字型從原生應用程式分享給 Flutter 畫面。例如：
* [native_font]({{site.pub-pkg}}/native_font)
* [ios_platform_images]({{site.pub-pkg}}/ios_platform_images)
:::

### 載入 Flutter 函式庫

找到資源後，引擎的共享函式庫會在每個行程（process）中載入一次至記憶體。

在 **Android** 上，這個步驟同樣會在建立 [`FlutterEngine`][android-engine] 時發生，因為 JNI 連接器需要參考 Flutter 的 C++ 函式庫。在 **iOS** 上，則是在首次執行 [`FlutterEngine`][ios-engine]（例如執行 [`runWithEntrypoint:`][`runWithEntrypoint:`]）時發生。

### 啟動 Dart VM

Dart 執行階段負責管理您的 Dart 程式碼的記憶體與並行處理。在 JIT 模式下，還會於執行時將 Dart 原始碼編譯為機器碼。

在 Android 與 iOS 上，每個應用程式會話（session）僅有一個 Dart 執行階段。

首次建立 [`FlutterEngine`][android-engine]（於 **Android**）或首次 [執行 Dart entrypoint][ios-engine]（於 **iOS**）時，會進行 Dart VM 的一次性啟動。

此時，您的 Dart 程式碼的 [snapshot][snapshot] 也會從應用程式檔案中載入到記憶體。

這是一個通用流程，即使您直接使用 [Dart SDK][Dart SDK] 而未經 Flutter 引擎，也會發生。

Dart VM 一旦啟動後，便不會再關閉。

### 建立並執行 Dart Isolate

Dart 執行階段初始化後，下一步就是 Flutter 引擎對 Dart 執行階段的使用。

這會透過在 Dart 執行階段啟動一個 [Dart `Isolate`][Dart `Isolate`] 來完成。Isolate 是 Dart 用來管理記憶體與執行緒的容器。此時，主機平臺也會建立多個 [輔助執行緒][auxiliary threads]，以支援 isolate，例如用於 GPU 處理卸載的執行緒、影像解碼等。

每個 `FlutterEngine` 實例對應一個 isolate，同一個 Dart VM 可以承載多個 isolate。

在 **Android** 上，這會在您於 `FlutterEngine` 實例上呼叫 [`DartExecutor.executeDartEntrypoint()`][`DartExecutor.executeDartEntrypoint()`] 時發生。

在 **iOS** 上，則是在您於 `FlutterEngine` 上呼叫 [`runWithEntrypoint:`][`runWithEntrypoint:`] 時發生。

此時，您的 Dart 程式碼所選的 entrypoint（預設為 Dart 程式庫 `main.dart` 檔案中的 `main()` 函式）會被執行。如果您在 `main()` 函式中呼叫了 Flutter 函式 [`runApp()`][`runApp()`]，那麼您的 Flutter 應用程式或程式庫的元件樹也會被建立與建構。如果您需要防止某些功能在 Flutter 程式碼中執行，可以利用 `AppLifecycleState.detached` 列舉值來判斷 `FlutterEngine` 尚未附加至任何 UI 元件，例如 iOS 的 `FlutterViewController` 或 Android 的 `FlutterActivity`。

### 將 UI 附加至 Flutter 引擎

標準的完整 Flutter 應用程式在啟動後會立即進入這個狀態。

在 add-to-app 情境下，則是在您將 `FlutterEngine` 附加至 UI 元件時發生，例如於 **Android** 上使用 [`startActivity()`][`startActivity()`] 並傳入以 [`FlutterActivity.withCachedEngine()`][`FlutterActivity.withCachedEngine()`] 建立的 [`Intent`][`Intent`]；或於 **iOS** 上呈現以 [`initWithEngine: nibName: bundle:`][`initWithEngine: nibName: bundle:`] 初始化的 [`FlutterViewController`][`FlutterViewController`]。

如果未預先啟動 `FlutterEngine`，而是直接啟動 Flutter UI 元件，例如在 **Android** 上使用 [`FlutterActivity.createDefaultIntent()`][`FlutterActivity.createDefaultIntent()`]，或在 **iOS** 上使用 [`FlutterViewController initWithProject: nibName: bundle:`][`FlutterViewController initWithProject: nibName: bundle:`]，也會進行這個步驟。這些情況下會自動建立一個隱含的 `FlutterEngine`。

在背後，兩個平臺的 UI 元件都會為 `FlutterEngine` 提供一個繪製表面，例如 **Android** 上的 [`Surface`][`Surface`]，或 **iOS** 上的 [CAEAGLLayer][CAEAGLLayer] 或 [CAMetalLayer][CAMetalLayer]。

此時，您的 Flutter 程式每一幀所產生的 [`Layer`][`Layer`] 樹，會被轉換為 OpenGL（或 Vulkan、Metal）GPU 指令。

[android-engine]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[auxiliary threads]: {{site.repo.flutter}}/blob/main/docs/about/The-Engine-architecture.md#threading
[CAEAGLLayer]: {{site.apple-dev}}/documentation/quartzcore/caeagllayer
[CAMetalLayer]: {{site.apple-dev}}/documentation/quartzcore/cametallayer
[Dart `Isolate`]: {{site.dart.api}}/dart-isolate/Isolate-class.html
[Dart SDK]: {{site.dart-site}}/tools/sdk
[`DartExecutor.executeDartEntrypoint()`]: {{site.api}}/javadoc/io/flutter/embedding/engine/dart/DartExecutor.html#executeDartEntrypoint-io.flutter.embedding.engine.dart.DartExecutor.DartEntrypoint-
[`FlutterActivity.createDefaultIntent()`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html#createDefaultIntent-android.content.Context-
[`FlutterActivity.withCachedEngine()`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html#withCachedEngine-java.lang.String-
[`FlutterViewController`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html
[`FlutterViewController initWithProject: nibName: bundle:`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html#aa3aabfb89e958602ce6a6690c919f655
[`initWithEngine: nibName: bundle:`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html#a0aeea9525c569d5efbd359e2d95a7b31
[`Intent`]: {{site.android-dev}}/reference/android/content/Intent.html
[ios-engine]: {{site.api}}/ios-embedder/interface_flutter_engine.html
[`Layer`]: {{site.api}}/flutter/rendering/Layer-class.html
[multiple Flutters]: /add-to-app/multiple-flutters
[`runApp()`]: {{site.api}}/flutter/widgets/runApp.html
[`runWithEntrypoint:`]: {{site.api}}/ios-embedder/interface_flutter_engine.html#a019d6b3037eff6cfd584fb2eb8e9035e
[snapshot]: {{site.github}}/dart-lang/sdk/wiki/Snapshots
[`startActivity()`]: {{site.android-dev}}/reference/android/content/Context#startActivity(android.content.Intent)
[`Surface`]: {{site.android-dev}}/reference/android/view/Surface
