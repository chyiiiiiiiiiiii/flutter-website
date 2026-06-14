# DevTools 2.19.0 版本發行說明

> Dart 與 Flutter DevTools 2.19.0 版本的發行說明。



Dart 與 Flutter DevTools 2.19.0 版本，
除了其他一般性改進外，還包含以下變更。
如需進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 效能更新

* 新增按鈕，可切換 Flutter Frames 圖表的顯示與隱藏 -
  [#4577](https://github.com/flutter/devtools/pull/4577)

  ![diff](/assets/images/docs/tools/devtools/release-notes/images-2.19.0/4577.png "Flutter Frames")

* 優化偵錯模式（debug mode）警告，讓說明更清楚哪些資料在偵錯模式下是準確的，哪些資料可能會有誤導性 -
  [#3537](https://github.com/flutter/devtools/pull/3537)
* 重新排序效能工具分頁，並僅在「Timeline Events」分頁顯示 CPU profiler -
  [#4629](https://github.com/flutter/devtools/pull/4629)

## 記憶體更新

* 改善 memory Profile 分頁的體驗 -
  [#4583](https://github.com/flutter/devtools/pull/4583)

## 除錯器（Debugger）更新

* 修正 hover 卡片出現但無法消失的問題 -
  [#4627](https://github.com/flutter/devtools/pull/4627)
* 修正檔案搜尋自動完成對話框的錯誤 -
  [#4409](https://github.com/flutter/devtools/pull/4409)

## 網路分析工具（Network profiler）更新

* 在 Network Request 檢視中新增「Copy」按鈕
  （感謝 @netos23 貢獻）-
  [#4509](https://github.com/flutter/devtools/pull/4509)

## 完整提交紀錄

如需查閱自上個版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.18.0...v2.19.0)。

