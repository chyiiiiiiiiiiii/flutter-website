---
title: 偵錯 Flutter 應用程式
description: 如何偵錯你的 Flutter 應用程式。
---

<?code-excerpt path-base="testing/debugging"?>

Flutter 應用程式有多種工具和功能可協助進行偵錯。以下是部分可用的工具：

* [VS Code][VS Code] (recommended) 以及 [Android Studio/IntelliJ][Android Studio/IntelliJ]
  （需安裝 Flutter 與 Dart 外掛），
  支援內建的原始碼層級除錯器，可設置中斷點、逐步執行程式碼，以及檢查變數值。
* [DevTools][DevTools]，一套在瀏覽器中運行的效能與剖析工具。
* [Flutter inspector][Flutter inspector]，一個可在 DevTools 中使用的元件（Widget）檢查工具，
  也可直接在 Android Studio 和 IntelliJ（需安裝 Flutter 外掛）中啟用。
  Inspector 允許你檢視元件樹的視覺化表示、檢查個別元件及其屬性值、啟用效能疊加層等功能。

## 其他資源

你可能會覺得以下文件很有幫助：

* [效能最佳實踐][Performance best practices]
* [Flutter 效能剖析][Flutter performance profiling]
* [使用原生除錯器][Use a native debugger]
* [Flutter 的運行模式][Flutter's modes]
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
