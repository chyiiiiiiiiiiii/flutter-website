---
title: Flutter 與 Dart DevTools
description: 如何在 Flutter 中使用 Flutter DevTools。
---

## 什麼是 DevTools？

DevTools 是一套針對 Dart 與 Flutter 的效能與除錯工具。
_Flutter DevTools_ 與 _Dart DevTools_ 指的是同一組工具。

![Dart DevTools Screens](/assets/images/docs/tools/devtools/dart-devtools.webp){:width="100%"}

若想觀看 DevTools 的影片介紹，請參考以下的深入導覽與實際應用說明：

{% ytEmbed '_EYk-E29edo', 'Dive in to Flutter and Dart DevTools' %}

## 我可以用 DevTools 做什麼？

以下是你可以使用 DevTools 完成的部分事項：

* 檢查 Flutter 應用程式的 UI 版面配置與狀態。
* 診斷 Flutter 應用程式中的 UI 卡頓效能問題。
* 針對 Flutter 或 Dart 應用程式進行 CPU 剖析。
* 針對 Flutter 應用程式進行網路剖析。
* 針對 Flutter 或 Dart 應用程式進行原始碼層級的除錯。
* 除錯 Flutter 或 Dart 命令列應用程式的記憶體問題。
* 檢視執行中的 Flutter 或 Dart 命令列應用程式的一般日誌與診斷資訊。
* 分析程式碼與應用程式大小。
* 驗證你的 Android 或 iOS 應用程式中的深層連結 (deep links)。

我們建議你將 DevTools 與現有的 IDE 或命令列 (Command Line Interface) 開發流程搭配使用。

<a id="how-do-i-install-devtools"></a>
<a id="install-devtools"></a>

## 如何啟動 DevTools {:#start}

你可以透過以下工具啟動 DevTools：

* [VS Code][VS Code]
* [Android Studio/IntelliJ][Android Studio/IntelliJ]
* [命令列][command line]

## 常見問題排解

**問題**：我的應用程式看起來卡頓或有延遲。
  我該如何解決？

**解答**：效能問題可能導致 [UI 畫格][UI frames] 卡頓，或使某些操作變慢。

  1. 若要偵測哪些程式碼影響到具體延遲的畫格，請從 [Performance > Timeline][Performance > Timeline] 開始。
  2. 若要了解哪些程式碼在背景中佔用最多 CPU 時間，請使用 [CPU 剖析器][CPU profiler]。

欲了解更多資訊，請參閱 [Performance][Performance] 頁面。

**問題**：我看到有很多垃圾回收（GC）事件發生。
  這會有問題嗎？

**解答**：在 DevTools > Memory > Memory 圖表中，可能會顯示頻繁的 GC 事件。大多數情況下，這不是問題。

如果你的應用程式在背景有頻繁活動且有部分閒置時間，Flutter 可能會利用這些時機來回收已建立的物件，而不會影響效能。

[CPU profiler]: /tools/devtools/cpu-profiler
[Performance]: /perf
[Performance > Timeline]: /tools/devtools/performance#timeline-events-tab
[UI frames]: /perf/ui-performance

## 提供回饋

請試用 DevTools，並在 [DevTools 問題追蹤器][DevTools issue tracker] 提供回饋或回報問題。感謝！

## DevTools 版本管理

DevTools 隨 Flutter SDK 一同發佈。若要取得最新的 DevTools 功能，請執行 `flutter upgrade` 以獲得最即時的 Flutter 版本。若想在 DevTools 新功能進入 Flutter `stable` 頻道前搶先體驗，請考慮切換至 `beta` 或 `main` 頻道。

## 其他資源

如需更多有關除錯與剖析 Flutter 應用程式的資訊，請參閱 [Debugging][Debugging] 頁面，特別是其中的 [其他資源][other resources] 清單。

如需在 Dart 命令列應用程式中使用 DevTools 的詳細說明，請參閱
[dart.dev 上的 DevTools 文件]({{site.dart-site}}/tools/dart-devtools)。

[Android Studio/IntelliJ]: /tools/devtools/android-studio
[VS Code]: /tools/devtools/vscode
[command line]: /tools/devtools/cli
[DevTools issue tracker]: {{site.github}}/flutter/devtools/issues
[Debugging]: /testing/debugging
[Other resources]: /testing/debugging#other-resources
