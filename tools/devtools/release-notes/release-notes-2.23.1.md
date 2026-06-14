# DevTools 2.23.1 發行說明

> Dart 與 Flutter DevTools 2.23.1 版本的發行說明。



Dart 與 Flutter DevTools 2.23.1 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* DevTools 更新至全新 Material 3 設計風格 -
  [#5429](https://github.com/flutter/devtools/pull/5429)
* 使用預設的 Flutter service worker -
  [#5331](https://github.com/flutter/devtools/pull/5331)
* 新增詳細日誌（verbose logging）功能，協助我們偵錯使用者問題 -
  [#5404](https://github.com/flutter/devtools/pull/5404)

  ![verbose logging](/assets/images/docs/tools/devtools/release-notes/images-2.23.1/verbose-logging.png "verbose_logging")

* 修正部分非同步錯誤未被回報的問題 -
  [#5456](https://github.com/flutter/devtools/pull/5456)
* 新增支援在應用程式斷線後，於支援離線檢視的螢幕中檢視資料
  （目前僅支援 Performance 與 CPU profiler 頁面）-
  [#5509](https://github.com/flutter/devtools/pull/5509)
* 在嵌入檢視的頁腳新增設定按鈕 -
  [#5528](https://github.com/flutter/devtools/pull/5528)

## 效能更新

* 修正時間軸事件處理的效能回歸問題 -
  [#5460](https://github.com/flutter/devtools/pull/5460)
* 保留使用者偏好，預設是否顯示 Flutter Frames 圖表 -
  [#5339](https://github.com/flutter/devtools/pull/5339)
* 當於 iOS 裝置偵測到 shader compilation jank 時，指引使用者參考 [Impeller](https://docs.flutter.dev/perf/impeller) -
  [#5455](https://github.com/flutter/devtools/pull/5455)
* 從舊版 trace viewer 移除 CPU profiler -
  [#5539](https://github.com/flutter/devtools/pull/5539)

## CPU profiler 更新

* 為 CPU profiler 新增 Method Table（方法表）-
  [#5366](https://github.com/flutter/devtools/pull/5366)

  ![Method table](/assets/images/docs/tools/devtools/release-notes/images-2.23.1/cpu-method-table.png "method_table")

* 提升 CPU profiler 資料處理效能 -
  [#5468](https://github.com/flutter/devtools/pull/5468),
  [#5533](https://github.com/flutter/devtools/pull/5533),
  [#5535](https://github.com/flutter/devtools/pull/5535)
* CPU profile flame chart（火焰圖）細節優化與效能提升 -
  [#5529](https://github.com/flutter/devtools/pull/5529)
* 新增檢視 CPU profile 統計資料的功能 -
  [#5340](https://github.com/flutter/devtools/pull/5340)
* 修正 Native stack frames（原生堆疊框架）名稱遺失的問題 -
  [#5344](https://github.com/flutter/devtools/pull/5344)
* 修正 bottom up tree（自底向上樹）總時間與自身時間計算錯誤 -
  [#5348](https://github.com/flutter/devtools/pull/5348)
* 新增支援使用 ,AOE 鍵縮放與瀏覽 flame chart
  （對 Dvorak 鍵盤使用者更友善）-
  [#5545](https://github.com/flutter/devtools/pull/5545)

## 記憶體（Memory）更新

* 修正「Trace Instances」檢視中的篩選錯誤 -
  [#5406](https://github.com/flutter/devtools/pull/5406)
* 啟用 heap snapshot（堆積快照）中實例的評估與瀏覽功能 -
  [#5542](https://github.com/flutter/devtools/pull/5542)
* 修正 heap snapshot 失敗問題 -
  [#5520](https://github.com/flutter/devtools/pull/5520)
* 停止在 allocation profile 顯示 external sizes（外部大小）-
  [#5555](https://github.com/flutter/devtools/pull/5555)
* 在 heap snapshot 中顯示記憶體總量 -
  [#5593](https://github.com/flutter/devtools/pull/5593)

## 除錯器（Debugger）更新

* 修正檢查變數時，
  某些實例有時未顯示子項目的問題 -
  [#5356](https://github.com/flutter/devtools/pull/5356)
* 當「file search」對話框開啟時，隱藏「search in file」對話框 -
  [#5393](https://github.com/flutter/devtools/pull/5393)
* 修正檔案搜尋時，若搜尋至檔名結尾，最後一個字母會消失的問題 -
  [#5397](https://github.com/flutter/devtools/pull/5397)
* 在檔案列新增搜尋圖示，提升檔案搜尋易發現性 -
  [#5351](https://github.com/flutter/devtools/issues/5351)
* 於 Web 應用程式在 JS 中暫停時允許運算式求值 -
  [#5427](https://github.com/flutter/devtools/pull/5427)
* 語法高亮更新至
  [dart-lang/dart-syntax-highlight v1.2.0](https://github.com/dart-lang/dart-syntax-highlight/blob/master/CHANGELOG.md#120-2023-01-30) -
  [#5477](https://github.com/flutter/devtools/pull/5477)
* 除錯器面板支援「密集模式（dense mode）」-
  [#5517](https://github.com/flutter/devtools/pull/5517)

## 網路分析器（Network profiler）更新

* 修正檢視包含 null 值之 JSON 回應時的錯誤 -
  [#5424](https://github.com/flutter/devtools/pull/5424)
* 修正 JSON 請求以純文字顯示，而非格式化 JSON 檢視器的問題 -
  [#5463](https://github.com/flutter/devtools/pull/5463)
* 修正回應或請求分頁的複製按鈕，在資料仍載入中時仍可複製的 UI 問題 -
  [#5476](https://github.com/flutter/devtools/pull/5476)

## 完整提交歷史

如需查閱自上個版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.22.2...v2.23.1)。

