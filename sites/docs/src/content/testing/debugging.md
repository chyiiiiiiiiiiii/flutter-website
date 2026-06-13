---
title: 偵錯 Flutter 應用程式
description: 如何偵錯你的 Flutter 應用程式。
---

<?code-excerpt path-base="testing/debugging"?>

Flutter 應用程式有各種工具和功能可協助進行偵錯。以下是部分可用的工具：

* [VS Code][]（推薦）以及 [Android Studio/IntelliJ][]
  （需安裝 Flutter 與 Dart 插件），
  支援內建的原始碼層級除錯器，
  可設定中斷點、逐步執行程式碼，
  並檢查變數值。
* [DevTools][]，一套在瀏覽器中執行的效能與分析工具。
* [Flutter inspector][]，一個元件 (Widget) 檢查工具，
  可在 DevTools 中使用，也可直接從 Android Studio
  和 IntelliJ（需安裝 Flutter 插件）啟用。
  Inspector 讓你檢視元件樹的視覺化表示、檢查
  個別元件及其屬性值、啟用效能疊加層等功能。

## 其他資源

你可能會覺得以下文件很有幫助：

* [效能最佳實踐][Performance best practices]
* [Flutter 效能分析][Flutter performance profiling]
* [使用原生除錯器][Use a native debugger]
* [Flutter 的模式][Flutter's modes]
* [以程式方式偵錯 Flutter 應用程式][Debugging Flutter apps programmatically]

[Debugging Flutter apps programmatically]: /testing/code-debugging
[Flutter's modes]: /testing/build-modes
[Flutter performance profiling]: /perf/ui-performance
[Performance best practices]: /perf/best-practices
[Use a native debugger]: /testing/native-debugging

[Android Studio/IntelliJ]: /tools/android-studio#run-app-with-breakpoints
[VS Code]: /tools/vs-code#run-app-with-breakpoints
[DevTools]: /tools/devtools
[Flutter inspector]: /tools/devtools/inspector
