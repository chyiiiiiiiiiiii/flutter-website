# DevTools 2.18.0 版本發行說明

Dart 與 Flutter DevTools 2.18.0 版本包含以下變更，以及其他一般性改進。  
如需進一步了解 DevTools，請參閱 [DevTools overview](https://docs.flutter.dev/tools/devtools)。

## Inspector 更新

- 改善自動捲動行為，當將元件 (Widget) 對齊聚焦時更為順暢 - [#4283](https://github.com/flutter/devtools/pull/4283)
- 修正當連線到暫停中的應用程式時，元件檢查器 (widget inspector) 無法載入的問題 - [#4527](https://github.com/flutter/devtools/pull/4527)
- 改善元件檢查器 (widget inspector) 的 hover 卡片，等待資料時會顯示進度 - [#4488](https://github.com/flutter/devtools/pull/4488)

## 效能 (Performance) 更新

- 修正捲軸與畫面內容不同步的問題 - [#4503](https://github.com/flutter/devtools/pull/4503)
- 新增離線瀏覽 raster 統計資料的支援 - [#4491](https://github.com/flutter/devtools/pull/4491)
- 在 Raster Metrics 分頁中新增「Rendering time」欄位 - [#4474](https://github.com/flutter/devtools/pull/4474)

  ![render-time-column](/assets/images/docs/tools/devtools/release-notes/images-2.18.0/render-time-column.png "Rendering time column in the Raster Metrics tab")

## CPU 分析器 (Profiler) 更新

- 修正過濾空 frame 時發生閃退的問題 - [#4502](https://github.com/flutter/devtools/pull/4502)
- 修正在 CPU profile 樹狀結構中的錯誤 - [#4413](https://github.com/flutter/devtools/pull/4413)
- UI 介面優化 - [#4404](https://github.com/flutter/devtools/pull/4404)

## 記憶體 (Memory) 更新

- 新增 Profile 與 Allocation Tracing 子分頁 - [#4523](https://github.com/flutter/devtools/pull/4523)

  ![profile](/assets/images/docs/tools/devtools/release-notes/images-2.18.0/profile.png "Profile in Memory tab")

  ![allocation-tracing](/assets/images/docs/tools/devtools/release-notes/images-2.18.0/allocation-tracing.png "Allocation Tracing in Memory tab")

- 實作快照視覺化功能 - [#4473](https://github.com/flutter/devtools/pull/4473)

## 除錯器 (Debugger) 更新

- 修正檔案開啟器與搜尋功能的錯誤 - [#4525](https://github.com/flutter/devtools/pull/4525)
- 修正程式碼檢視區的可捲動範圍 - [#4448](https://github.com/flutter/devtools/pull/4448)
- 允許在剖析器中對巢狀擷取進行語法高亮 - [#4427](https://github.com/flutter/devtools/pull/4427)

## 網路分析器 (Network Profiler) 更新

- 當位於 Network 分頁時，應用程式進行熱重啟後，網路錄製功能仍可持續運作 - [#4438](https://github.com/flutter/devtools/pull/4438)

## 日誌 (Logging) 更新

- 現在會顯示來自非 stdout 來源的日誌訊息 - [#4487](https://github.com/flutter/devtools/pull/4487)

## 完整提交紀錄

如需查詢自上個版本以來的完整變更清單，請參閱 [the diff on GitHub](https://github.com/flutter/devtools/compare/v2.17.0...v2.18.0)。
