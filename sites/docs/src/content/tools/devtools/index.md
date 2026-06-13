---
title: Flutter 與 Dart DevTools
breadcrumb: DevTools
description: 如何在 Flutter 中使用 Flutter DevTools。
---

## 什麼是 DevTools？

DevTools 是一套用於 Dart 與 Flutter 的效能與除錯工具。
_Flutter DevTools_ 與 _Dart DevTools_ 指的是同一組工具。

![Dart DevTools Screens](/assets/images/docs/tools/devtools/dart-devtools.webp){:width="100%"}

若想觀看 DevTools 的影片介紹，請參考以下深入解析與實際案例導覽：

<YouTubeEmbed id="_EYk-E29edo" title="Dive in to Flutter and Dart DevTools"></YouTubeEmbed>

## 我可以用 DevTools 做什麼？

以下是你可以使用 DevTools 完成的部分事項：

* 檢查 Flutter 應用程式的 UI 版面配置與狀態。
* 診斷 Flutter 應用程式中的 UI 卡頓效能問題。
* 對 Flutter 或 Dart 應用程式進行 CPU 分析。
* 對 Flutter 應用程式進行網路分析。
* 針對 Flutter 或 Dart 應用程式進行原始碼層級除錯。
* 偵錯 Flutter 或 Dart 命令列應用程式 (command-line app) 的記憶體問題。
* 檢視正在執行的 Flutter 或 Dart 命令列應用程式的一般日誌與診斷資訊。
* 分析程式碼與應用程式大小。
* 驗證 Android 或 iOS 應用程式中的深層連結 (deep links)。

我們建議你搭配現有的 IDE 或命令列為基礎的開發流程一起使用 DevTools。

<a id="how-do-i-install-devtools"></a>
<a id="install-devtools"></a>

## 如何啟動 DevTools {:#start}

你可以透過以下工具啟動 DevTools：

* [VS Code][]
* [Android Studio/IntelliJ][]
* [命令列][command line]

## 常見問題排解

**問題**：我的應用程式看起來卡頓或有延遲，該怎麼解決？

**解答**：效能問題可能導致 [UI 畫格][UI frames] 卡頓，或讓某些操作變慢。

  1. 若要偵測哪些程式碼影響到具體的延遲畫格，請從 [Performance > Timeline][Performance > Timeline] 開始。
  2. 若想了解哪些程式碼在背景中耗費最多 CPU 時間，請使用 [CPU profiler][]。

更多資訊請參考 [Performance][] 頁面。

**問題**：我看到有很多垃圾回收（GC）事件發生，這是個問題嗎？

**解答**：在 DevTools > Memory > Memory 圖表中可能會顯示頻繁的 GC 事件。大多數情況下，這不是問題。

如果你的應用程式有頻繁的背景活動並伴隨一些閒置時間，Flutter 可能會利用這些時機回收已建立的物件，而不會影響效能。

[CPU profiler]: /tools/devtools/cpu-profiler
[Performance]: /perf
[Performance > Timeline]: /tools/devtools/performance#timeline-events-tab
[UI frames]: /perf/ui-performance

## 提供回饋

請試用 DevTools，提供意見回饋，並在 [DevTools 問題追蹤器][DevTools issue tracker] 回報問題。感謝！

## DevTools 版本管理

DevTools 隨 Flutter SDK 一同發佈。若要取得最新的 DevTools 功能，請執行 `flutter upgrade` 以獲得最即時的 Flutter 版本。若想在功能正式進入 Flutter `stable` 頻道前搶先體驗 DevTools 新功能，可考慮切換至 `beta` 或 `main` 頻道。

## 其他資源

如需更多有關 Flutter 應用程式除錯與效能分析的資訊，請參閱 [Debugging][] 頁面，特別是其中的 [其他資源][other resources] 列表。

如需更多關於在 Dart 命令列應用程式 (command-line app) 中使用 DevTools 的資訊，請參閱
[dart.dev 上的 DevTools 文件]({{site.dart-site}}/tools/dart-devtools)。

[Android Studio/IntelliJ]: /tools/devtools/android-studio
[VS Code]: /tools/devtools/vscode
[command line]: /tools/devtools/cli
[DevTools issue tracker]: {{site.github}}/flutter/devtools/issues
[Debugging]: /testing/debugging
[Other resources]: /testing/debugging#other-resources
