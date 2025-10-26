# DevTools 2.37.2 發行說明

Dart 與 Flutter DevTools 2.37.2 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](/tools/devtools/overview)。

## 一般更新

* 當連線的應用程式平台不支援某個螢幕時，改善了提示訊息。- [#7958](https://github.com/flutter/devtools/pull/7958)
* 修正了一個在應用程式斷線時會顯示無限旋轉載入圖示的錯誤。- [#7992](https://github.com/flutter/devtools/pull/7992)
* 修正了嘗試重複使用已斷線的 DevTools 實例時會失敗的問題。- [#8009](https://github.com/flutter/devtools/pull/8009)

## 效能更新

* 移除了「Raster Stats」功能。
  此工具無法支援 Impeller 繪圖引擎，
  且針對 SKIA 繪圖引擎所提供的資訊
  常常具有誤導性且無法採取行動。建議使用者在
  偵錯 Flutter 應用程式的繪圖效能時，遵循官方 Flutter 的[效能與最佳化](/perf)指引。- [#7981](https://github.com/flutter/devtools/pull/7981)。

## 網路分析工具更新

* 修正了將 socket 統計資料誤報為 web sockets 的問題。- [#8061](https://github.com/flutter/devtools/pull/8061)

    ![Network profiler correctly displaying socket statistics](/assets/images/docs/tools/devtools/release-notes/images-2.37.2/socket-profiling.png "Network profiler correctly displaying socket statistics")

* 在請求詳細資料檢視中新增了查詢參數顯示。- [#7825](https://github.com/flutter/devtools/pull/7825)

## VS Code 側邊欄更新

* 預設在側邊欄中加入所有 DevTools 工具的按鈕，即使當下沒有偵錯工作階段也會顯示。- [#7947](https://github.com/flutter/devtools/pull/7947)

    ![DevTools tools in the sidebar](/assets/images/docs/tools/devtools/release-notes/images-2.37.2/devtools_in_sidebar.png)

## 完整提交紀錄

如需本次發行的完整變更列表，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.37.0)。
