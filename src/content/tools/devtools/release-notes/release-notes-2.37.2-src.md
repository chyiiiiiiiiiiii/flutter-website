# DevTools 2.37.2 發行說明

Dart 與 Flutter DevTools 2.37.2 版本
包含以下變更及其他一般性改進。
如需進一步了解 DevTools，請參閱
[DevTools overview](/tools/devtools/overview)。

## 一般更新

* 當已連線應用程式的平台不支援某個螢幕（screen）時，改進了訊息提示。- [#7958](https://github.com/flutter/devtools/pull/7958)
* 修正了一個錯誤，當應用程式斷線時會出現無限旋轉的載入動畫。- [#7992](https://github.com/flutter/devtools/pull/7992)
* 修正了一個錯誤，嘗試重複使用已斷線的 DevTools 實例時會失敗。- [#8009](https://github.com/flutter/devtools/pull/8009)

## 效能更新

* 移除了「Raster Stats」功能。
  此工具無法支援 Impeller 繪圖引擎，
  且對於 SKIA 繪圖引擎所提供的資訊
  經常具有誤導性且難以採取行動。建議使用者在除錯 Flutter 應用程式的繪圖效能時，請依循官方 Flutter 的 [Performance and optimization](/perf) 指南。- [#7981](https://github.com/flutter/devtools/pull/7981)。

## 網路分析工具（Network profiler）更新

* 修正了一個問題，socket 統計資料被誤報為 web sockets。- [#8061](https://github.com/flutter/devtools/pull/8061)

    ![Network profiler correctly displaying socket statistics](/assets/images/docs/tools/devtools/release-notes/images-2.37.2/socket-profiling.png "Network profiler correctly displaying socket statistics")

* 在請求詳細資料檢視中新增了查詢參數。- [#7825](https://github.com/flutter/devtools/pull/7825)

## VS Code 側邊欄（Sidebar）更新

* 預設在側邊欄中加入所有 DevTools 工具按鈕，即使目前沒有偵錯工作階段也會顯示。- [#7947](https://github.com/flutter/devtools/pull/7947)

    ![DevTools tools in the sidebar](/assets/images/docs/tools/devtools/release-notes/images-2.37.2/devtools_in_sidebar.png)

## 完整提交記錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.37.0)。
