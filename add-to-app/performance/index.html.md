# 載入順序、效能與記憶體

> 顯示 Flutter UI 時所涉及的步驟說明。



本頁說明顯示 Flutter UI 時所涉及步驟的詳細拆解。了解這些步驟後，您可以更好地決定何時預先啟動 Flutter 引擎、各階段可執行哪些操作，以及這些操作的延遲與記憶體成本。

## 載入 Flutter

Android 與 iOS 應用程式（目前支援整合至既有應用的兩大平台）、完整 Flutter 應用程式，以及 add-to-app 模式，在顯示 Flutter UI 時，其概念上的載入步驟大致相同。

### 尋找 Flutter 資源

Flutter 的引擎執行階段與您的應用程式編譯後的 Dart 程式碼，都會以共享函式庫（shared libraries）的形式，打包在 Android 與 iOS 上。載入 Flutter 的第一步，是在您的 .apk/.ipa/.app 檔案中找到這些資源（以及其他 Flutter 資產，如圖片、字型與 JIT 程式碼（若適用））。

這個步驟會在您第一次建立 `FlutterEngine` 時於 **[Android][android-engine]** 與 **[iOS][ios-engine]** API 上發生。

:::note
有些套件允許您將原生應用程式的圖片與字型共用到 Flutter 螢幕。例如：
* [native_font](https://pub.dev/packages/native_font)
* [ios_platform_images](https://pub.dev/packages/ios_platform_images)
:::

### 載入 Flutter 函式庫

找到資源後，引擎的共享函式庫會在每個行程（process）中載入一次至記憶體。

在 **Android** 上，這個步驟也會在建立 [`FlutterEngine`][android-engine] 時發生，因為 JNI 連接器需要參考 Flutter 的 C++ 函式庫。在 **iOS** 上，則是在第一次執行 [`FlutterEngine`][ios-engine]（例如執行 [`runWithEntrypoint:`][`runWithEntrypoint:`]）時發生。

### 啟動 Dart VM

Dart 執行階段負責管理 Dart 記憶體與並行處理。在 JIT 模式下，還會在執行期間將 Dart 原始碼編譯為機器碼。

每個 Android 與 iOS 應用程式會有一個 Dart 執行階段（runtime）。

首次於 **Android** 建立 [`FlutterEngine`][android-engine]，或於 **iOS** 首次[執行 Dart entrypoint][ios-engine] 時，會進行 Dart VM 的一次性啟動。

此時，您的 Dart 程式碼的 [snapshot][snapshot] 也會從應用程式檔案載入至記憶體。

這是通用流程，即使您直接使用 [Dart SDK][Dart SDK] 而非 Flutter 引擎，也會發生。

Dart VM 啟動後，將不會關閉。

### 建立並執行 Dart Isolate

Dart 執行階段初始化後，下一步是 Flutter 引擎對 Dart 執行階段的使用。

這會在 Dart 執行階段中啟動一個 [Dart `Isolate`][Dart `Isolate`]。Isolate 是 Dart 用來管理記憶體與執行緒的容器。此時，主機平台也會建立數個[輔助執行緒][auxiliary threads]，以支援 isolate，例如用於 GPU 處理卸載的執行緒，以及圖片解碼的執行緒。

每個 `FlutterEngine` 實例對應一個 isolate，同一個 Dart VM 可同時託管多個 isolate。

在 **Android** 上，這會在您於 `FlutterEngine` 實例上呼叫 [`DartExecutor.executeDartEntrypoint()`][`DartExecutor.executeDartEntrypoint()`] 時發生。

在 **iOS** 上，則是在您於 `FlutterEngine` 上呼叫 [`runWithEntrypoint:`][`runWithEntrypoint:`] 時發生。

此時，您的 Dart 程式碼所選的 entrypoint（預設為 Dart 程式庫 `main.dart` 檔案中的 `main()` 函式）會被執行。如果您在 `main()` 函式中呼叫了 Flutter 的 [`runApp()`][`runApp()`] 函式，則您的 Flutter 應用程式或程式庫的元件樹（widget tree）也會被建立與建構。如果您需要避免 Flutter 程式碼中某些功能被執行，則 `AppLifecycleState.detached` 列舉值表示 `FlutterEngine` 尚未附加至任何 UI 元件，例如 iOS 上的 `FlutterViewController` 或 Android 上的 `FlutterActivity`。

### 將 UI 附加至 Flutter 引擎

標準的完整 Flutter 應用程式在啟動時就會進入此階段。

在 add-to-app 情境下，這會在您將 `FlutterEngine` 附加至 UI 元件時發生，例如於 **Android** 呼叫 [`startActivity()`][`startActivity()`] 並傳入以 [`FlutterActivity.withCachedEngine()`][`FlutterActivity.withCachedEngine()`] 建立的 [`Intent`][`Intent`]；或於 **iOS** 使用 [`initWithEngine: nibName: bundle:`][`initWithEngine: nibName: bundle:`] 初始化後，展示 [`FlutterViewController`][`FlutterViewController`]。

若未先預熱 `FlutterEngine`，直接啟動 Flutter UI 元件（如在 **Android** 使用 [`FlutterActivity.createDefaultIntent()`][`FlutterActivity.createDefaultIntent()`]，或在 **iOS** 使用 [`FlutterViewController initWithProject: nibName: bundle:`][`FlutterViewController initWithProject: nibName: bundle:`]），也會進入此階段。這些情境下會隱式建立 `FlutterEngine`。

在幕後，兩個平台的 UI 元件都會為 `FlutterEngine` 提供一個繪圖表面，例如 **Android** 上的 [`Surface`][`Surface`]，或 **iOS** 上的 [CAEAGLLayer][CAEAGLLayer] 或 [CAMetalLayer][CAMetalLayer]。

此時，您的 Flutter 程式每一幀所產生的 [`Layer`][`Layer`] 樹，會被轉換為 OpenGL（或 Vulkan、Metal）GPU 指令。

[android-engine]: https://api.flutter.dev/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[auxiliary threads]: https://github.com/flutter/flutter/blob/main/docs/about/The-Engine-architecture.md#threading
[CAEAGLLayer]: https://developer.apple.com/documentation/quartzcore/caeagllayer
[CAMetalLayer]: https://developer.apple.com/documentation/quartzcore/cametallayer
[Dart `Isolate`]: https://api.dart.dev/dart-isolate/Isolate-class.html
[Dart SDK]: https://dart.dev/tools/sdk
[`DartExecutor.executeDartEntrypoint()`]: https://api.flutter.dev/javadoc/io/flutter/embedding/engine/dart/DartExecutor.html#executeDartEntrypoint-io.flutter.embedding.engine.dart.DartExecutor.DartEntrypoint-
[`FlutterActivity.createDefaultIntent()`]: https://api.flutter.dev/javadoc/io/flutter/embedding/android/FlutterActivity.html#createDefaultIntent-android.content.Context-
[`FlutterActivity.withCachedEngine()`]: https://api.flutter.dev/javadoc/io/flutter/embedding/android/FlutterActivity.html#withCachedEngine-java.lang.String-
[`FlutterViewController`]: https://api.flutter.dev/ios-embedder/interface_flutter_view_controller.html
[`FlutterViewController initWithProject: nibName: bundle:`]: https://api.flutter.dev/ios-embedder/interface_flutter_view_controller.html#aa3aabfb89e958602ce6a6690c919f655
[`initWithEngine: nibName: bundle:`]: https://api.flutter.dev/ios-embedder/interface_flutter_view_controller.html#a0aeea9525c569d5efbd359e2d95a7b31
[`Intent`]: https://developer.android.com/reference/android/content/Intent.html
[ios-engine]: https://api.flutter.dev/ios-embedder/interface_flutter_engine.html
[`Layer`]: https://api.flutter.dev/flutter/rendering/Layer-class.html
[multiple Flutters]: /add-to-app/multiple-flutters
[`runApp()`]: https://api.flutter.dev/flutter/widgets/runApp.html
[`runWithEntrypoint:`]: https://api.flutter.dev/ios-embedder/interface_flutter_engine.html#a019d6b3037eff6cfd584fb2eb8e9035e
[snapshot]: https://github.com/dart-lang/sdk/wiki/Snapshots
[`startActivity()`]: https://developer.android.com/reference/android/content/Context#startActivity(android.content.Intent)
[`Surface`]: https://developer.android.com/reference/android/view/Surface

