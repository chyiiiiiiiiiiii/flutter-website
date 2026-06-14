# 效能常見問答

> Flutter 效能相關的常見問題



本頁整理了有關評估與除錯 Flutter 效能的常見問題。

* 哪些效能儀表板有與 Flutter 相關的指標？
  * [Flutter dashboard on appspot][]
  * [Flutter Skia dashboard][]
  * [Flutter Engine Skia dashboard][]

[Flutter dashboard on appspot]: https://flutter-dashboard.appspot.com/
[Flutter engine Skia dashboard]: https://flutter-engine-perf.skia.org/t/?subset=regressions
[Flutter Skia dashboard]: https://flutter-flutter-perf.skia.org/t/?subset=regressions

* 如何為 Flutter 新增效能基準測試（benchmark）？
  * [How to write a render speed test for Flutter][speed-test]
  * [How to write a memory test for Flutter][memory-test]

[memory-test]: https://github.com/flutter/flutter/blob/main/docs/contributing/testing/How-to-write-a-memory-test-for-Flutter.md
[speed-test]: https://github.com/flutter/flutter/blob/main/docs/contributing/testing/How-to-write-a-render-speed-test-for-Flutter.md

* 有哪些工具可以擷取與分析效能指標？
  * [Dart/Flutter DevTools](/tools/devtools)
  * [Apple instruments](https://en.wikipedia.org/wiki/Instruments_(software))
  * [Linux perf](https://en.wikipedia.org/wiki/Perf_(Linux))
  * [Chrome tracing（在 Chrome 網址列輸入 `about:tracing`）][tracing]
  * [Android systrace（`adb systrace`）][systrace]
  * [Fuchsia `fx traceutil`][traceutil]
  * [Perfetto](https://ui.perfetto.dev/)
  * [speedscope](https://www.speedscope.app/)

[systrace]: https://developer.android.com/studio/profile/systrace
[tracing]: https://www.chromium.org/developers/how-tos/trace-event-profiling-tool
[traceutil]: https://fuchsia.dev/fuchsia-src/development/tracing/usage-guide

* 我的 Flutter 應用程式出現卡頓或掉幀，該如何解決？
  * [提升繪製效能][Improving rendering performance]

[Improving rendering performance]: /perf/rendering-performance

* 有哪些需要特別注意的高成本效能操作？
  * [`Opacity`][]、[`Clip.antiAliasWithSaveLayer`][]，
     或任何會觸發 [`saveLayer`][] 的操作
  * [`ImageFilter`][]
  * 另請參考 [效能最佳實踐][Performance best practices]

[`Clip.antiAliasWithSaveLayer`]: https://api.flutter.dev/flutter/dart-ui/Clip.html#antiAliasWithSaveLayer
[`ImageFilter`]: https://api.flutter.dev/flutter/dart-ui/ImageFilter-class.html
[`Opacity`]: https://api.flutter.dev/flutter/widgets/Opacity-class.html
[Performance best practices]: /perf/best-practices
[`savelayer`]: https://api.flutter.dev/flutter/dart-ui/Canvas/saveLayer.html

* 如何判斷 Flutter 應用程式中哪些元件 (Widget) 在每一幀被重建？
  * 在 [widgets/debug.dart][debug.dart] 中將 [`debugProfileBuildsEnabled`][] 設為 true。
  * 或者，修改 [widgets/framework.dart][framework.dart] 中的 `performRebuild` 函式，讓其忽略 `debugProfileBuildsEnabled` 並總是呼叫 `Timeline.startSync(...)/finish`。
  * 如果你使用 IntelliJ，可以透過圖形介面檢視這些資料。選擇 **Track widget rebuilds**，IDE 會顯示哪些元件被重建。

[`debugProfileBuildsEnabled`]: https://api.flutter.dev/flutter/widgets/debugProfileBuildsEnabled.html
[debug.dart]: https://github.com/flutter/flutter/blob/main/packages/flutter/lib/src/widgets/debug.dart
[framework.dart]: https://github.com/flutter/flutter/blob/main/packages/flutter/lib/src/widgets/framework.dart

* 如何查詢螢幕的目標每秒幀數（frames per second, FPS）？
  * [取得顯示器更新率][Get the display refresh rate]

[Get the display refresh rate]: https://github.com/flutter/flutter/blob/main/docs/engine/Engine-specific-Service-Protocol-extensions.md#get-the-display-refresh-rate-_fluttergetdisplayrefreshrate

* 如果我的動畫因為耗時的 Dart 非同步（async）函式呼叫而導致 UI 執行緒被阻塞，該如何解決？
  * 使用 [`compute()`][] 方法建立另一個 isolate，如 [在背景解析 JSON][Parse JSON in the background] cookbook 範例所示。

[`compute()`]: https://api.flutter.dev/flutter/foundation/compute-constant.html
[Parse JSON in the background]: /cookbook/networking/background-parsing

* 如何得知使用者下載的 Flutter 應用程式套件大小？
  * 請參考 [測量應用程式大小][Measuring your app's size]

[Measuring your app's size]: /perf/app-size

* 如何查看 Flutter 引擎的大小組成？
  * 請造訪 [binary size dashboard][]，並將網址中的 git hash 替換為 [Flutter 的 GitHub commits][Flutter's GitHub commits] 中的最新提交 hash。

[binary size dashboard]: https://storage.googleapis.com/flutter_infra_release/flutter/241c87ad800beeab545ab867354d4683d5bfb6ce/android-arm-release/sizes/index.html
[Flutter's GitHub commits]: https://github.com/flutter/flutter/commits/main

* 如何將正在執行的應用程式截圖並匯出為 SKP 檔案？
  * 執行 `flutter screenshot --type=skia --observatory-uri=...`
  * 注意已知的截圖檢視問題：
    * [Issue 21237][]：無法在實體裝置上記錄圖片。
  * 若要分析與視覺化 SKP 檔案，請參考 [Skia WASM debugger][]。

[Issue 21237]: https://github.com/flutter/flutter/issues/21237
[Skia WASM debugger]: https://debugger.skia.org/

* 如何從裝置中取得 shader persistent cache（著色器持久快取）？
  * 在 Android 上，你可以這麼做：
    ```console
    adb shell
    run-as <com.your_app_package_name>
    cp <your_folder> <some_public_folder, e.g., /sdcard> -r
    adb pull <some_public_folder/your_folder>
    ```

* 如何在 Fuchsia 執行追蹤（trace）？
  * 請參閱 [Fuchsia 追蹤指引][traceutil]

