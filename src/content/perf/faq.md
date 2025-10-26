---
title: 效能常見問答集
description: Flutter 效能評估與除錯的常見問題
---

本頁整理了有關評估與除錯 Flutter 效能的一些常見問題。

* 哪些效能儀表板有與 Flutter 相關的指標？
  * [Flutter dashboard on appspot][Flutter dashboard on appspot]
  * [Flutter Skia dashboard][Flutter Skia dashboard]
  * [Flutter Engine Skia dashboard][Flutter Engine Skia dashboard]

[Flutter dashboard on appspot]: https://flutter-dashboard.appspot.com/
[Flutter engine Skia dashboard]: https://flutter-engine-perf.skia.org/t/?subset=regressions
[Flutter Skia dashboard]: https://flutter-flutter-perf.skia.org/t/?subset=regressions

* 如何為 Flutter 新增效能基準測試（benchmark）？
  * [How to write a render speed test for Flutter][speed-test]
  * [How to write a memory test for Flutter][memory-test]

[memory-test]: {{site.repo.flutter}}/blob/main/docs/contributing/testing/How-to-write-a-memory-test-for-Flutter.md
[speed-test]: {{site.repo.flutter}}/blob/main/docs/contributing/testing/How-to-write-a-render-speed-test-for-Flutter.md

* 有哪些工具可以擷取與分析效能指標？
  * [Dart/Flutter DevTools](/tools/devtools)
  * [Apple instruments](https://en.wikipedia.org/wiki/Instruments_(software)
  * [Linux perf](https://en.wikipedia.org/wiki/Perf_(Linux)
  * [Chrome tracing（在 Chrome 的 URL 欄位輸入 `about:tracing`）][tracing]
  * [Android systrace（`adb systrace`）][systrace]
  * [Fuchsia `fx traceutil`][traceutil]
  * [Perfetto](https://ui.perfetto.dev/)
  * [speedscope](https://www.speedscope.app/)

[systrace]: {{site.android-dev}}/studio/profile/systrace
[tracing]: https://www.chromium.org/developers/how-tos/trace-event-profiling-tool
[traceutil]: https://fuchsia.dev/fuchsia-src/development/tracing/usage-guide

* 我的 Flutter 應用程式出現卡頓或延遲，該如何改善？
  * [提升渲染效能][Improving rendering performance]

[Improving rendering performance]: /perf/rendering-performance

* 有哪些高成本的效能操作需要特別注意？
  * [`Opacity`][`Opacity`]、[`Clip.antiAliasWithSaveLayer`][`Clip.antiAliasWithSaveLayer`]，
     或任何會觸發 [`saveLayer`][`saveLayer`] 的操作
  * [`ImageFilter`][`ImageFilter`]
  * 另請參考 [效能最佳實踐][Performance best practices]

[`Clip.antiAliasWithSaveLayer`]: {{site.api}}/flutter/dart-ui/Clip.html#antiAliasWithSaveLayer
[`ImageFilter`]: {{site.api}}/flutter/dart-ui/ImageFilter-class.html
[`Opacity`]: {{site.api}}/flutter/widgets/Opacity-class.html
[Performance best practices]: /perf/best-practices
[`savelayer`]: {{site.api}}/flutter/dart-ui/Canvas/saveLayer.html

* 如何判斷 Flutter 應用程式中哪些元件（Widgets）在每一幀被重建？
  * 在 [widgets/debug.dart][debug.dart] 中將 [`debugProfileBuildsEnabled`][`debugProfileBuildsEnabled`] 設為 true。
  * 或者，修改 [widgets/framework.dart][framework.dart] 中的 `performRebuild` 函式，讓其忽略 `debugProfileBuildsEnabled` 並始終呼叫 `Timeline.startSync(...)/finish`。
  * 如果你使用 IntelliJ，可以透過圖形化介面檢視這些資料。
    選擇 **Track widget rebuilds**，你的 IDE 會顯示哪些元件被重建。

[`debugProfileBuildsEnabled`]: {{site.api}}/flutter/widgets/debugProfileBuildsEnabled.html
[debug.dart]: {{site.repo.flutter}}/blob/main/packages/flutter/lib/src/widgets/debug.dart
[framework.dart]: {{site.repo.flutter}}/blob/main/packages/flutter/lib/src/widgets/framework.dart

* 如何查詢顯示器的目標每秒幀數（frames per second, FPS）？
  * [取得顯示器的刷新率][Get the display refresh rate]

[Get the display refresh rate]: {{site.repo.flutter}}/blob/main/engine/src/flutter/docs/Engine-specific-Service-Protocol-extensions.md#get-the-display-refresh-rate-_fluttergetdisplayrefreshrate

* 如果我的動畫因為昂貴的 Dart 非同步函式呼叫而造成 UI 執行緒阻塞，該如何解決？
  * 使用 [`compute()`][`compute()`] 方法建立新的 isolate，參考 [在背景解析 JSON][Parse JSON in the background] cookbook 範例。

[`compute()`]: {{site.api}}/flutter/foundation/compute-constant.html
[Parse JSON in the background]: /cookbook/networking/background-parsing

* 如何得知使用者下載的 Flutter 應用程式套件大小？
  * 請參考 [測量應用程式大小][Measuring your app's size]

[Measuring your app's size]: /perf/app-size

* 如何查看 Flutter 引擎的大小組成？
  * 請造訪 [binary size dashboard][binary size dashboard]，並將網址中的 git hash 換成 [Flutter 的 GitHub commits][Flutter's GitHub commits] 中的最新提交 hash。

[binary size dashboard]: https://storage.googleapis.com/flutter_infra_release/flutter/241c87ad800beeab545ab867354d4683d5bfb6ce/android-arm-release/sizes/index.html
[Flutter's GitHub commits]: {{site.repo.flutter}}/commits/main

* 如何將正在執行的應用程式截圖並匯出成 SKP 檔案？
  * 執行 `flutter screenshot --type=skia --observatory-uri=...`
  * 已知的截圖問題：
    * [Issue 21237][Issue 21237]：無法在真實裝置上錄製圖片。
  * 若要分析與視覺化 SKP 檔案，請參考 [Skia WASM debugger][Skia WASM debugger]。

[Issue 21237]: {{site.repo.flutter}}/issues/21237
[Skia WASM debugger]: https://debugger.skia.org/

* 如何從裝置上取得著色器（shader）持久性快取？
  * 在 Android 上，你可以這麼做：
    ```console
    adb shell
    run-as <com.your_app_package_name>
    cp <your_folder> <some_public_folder, e.g., /sdcard> -r
    adb pull <some_public_folder/your_folder>
    ```

* 如何在 Fuchsia 執行 trace（追蹤）？
  * 請參閱 [Fuchsia tracing guidelines][traceutil]
