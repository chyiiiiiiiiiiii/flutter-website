# DevTools 2.48.0 發行說明

Dart 與 Flutter DevTools 2.48.0 版本
除了其他一般性改進外，還包含以下變更。
想進一步了解 DevTools，請參閱
[DevTools overview](/tools/devtools/overview)。

## 網路分析工具（Network profiler）更新

* 修正了熱重啟（hot restart）後的網路日誌紀錄問題。-
  [#9271](https://github.com/flutter/devtools/pull/9271)。

## 日誌（Logging）更新

* Logging View 現在開始顯示與計時器（timers）相關的事件。-
  [#9238](https://github.com/flutter/devtools/pull/9238)。

## 進階開發者模式（Advanced developer mode）更新

* 在 VM Tools 畫面新增了 Queued Microtasks 分頁，讓使用者可以
  查看某個 isolate 的 microtask queue 中已排程 microtasks 的詳細資訊。
  目前此分頁僅在 DevTools 連線至以 `--profile-microtasks` 啟動的 Flutter 或 Dart 應用程式時顯示。-
  [#9239](https://github.com/flutter/devtools/pull/9239)。

## 完整提交紀錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.48.0)。
