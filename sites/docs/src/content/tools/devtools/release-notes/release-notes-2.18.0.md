---
title: DevTools 2.18.0 發行說明
shortTitle: 2.18.0 發行說明
breadcrumb: 2.18.0
description: Dart 與 Flutter DevTools 2.18.0 版本的發行說明。
showToc: false
---

Dart 與 Flutter DevTools 2.18.0 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## Inspector 更新

- 改善自動捲動行為，當將元件 (Widget) 對齊焦點時表現更佳 -
  [#4283](https://github.com/flutter/devtools/pull/4283)
- 修正當連接到暫停中的應用程式時，
  元件檢查器 (Widget Inspector) 無法載入的問題 -
  [#4527](https://github.com/flutter/devtools/pull/4527)
- 改善元件檢查器的懸停卡片，等待資料時會顯示進度 -
  [#4488](https://github.com/flutter/devtools/pull/4488)

## 效能 (Performance) 更新

- 修正捲軸與畫面內容不同步的問題 -
  [#4503](https://github.com/flutter/devtools/pull/4503)
- 新增離線模式下的 raster 統計支援 -
  [#4491](https://github.com/flutter/devtools/pull/4491)
- 在 Raster Metrics 分頁新增「Rendering time」欄位 -
  [#4474](https://github.com/flutter/devtools/pull/4474)

  ![render-time-column](/assets/images/docs/tools/devtools/release-notes/images-2.18.0/render-time-column.png "Rendering time column in the Raster Metrics tab")

## CPU 分析器 (Profiler) 更新

- 修正過濾空 frame 時發生崩潰的問題 -
  [#4502](https://github.com/flutter/devtools/pull/4502)
- 修正 CPU profile 樹狀結構中的錯誤 -
  [#4413](https://github.com/flutter/devtools/pull/4413)
- UI 清理 - [#4404](https://github.com/flutter/devtools/pull/4404)

## 記憶體 (Memory) 更新

- 新增 Profile 與 Allocation Tracing 子分頁 -
  [#4523](https://github.com/flutter/devtools/pull/4523)

  ![profile](/assets/images/docs/tools/devtools/release-notes/images-2.18.0/profile.png "Profile in Memory tab")

  ![allocation-tracing](/assets/images/docs/tools/devtools/release-notes/images-2.18.0/allocation-tracing.png "Allocation Tracing in Memory tab")

- 實作快照視覺化功能 -
  [#4473](https://github.com/flutter/devtools/pull/4473)

## 除錯器 (Debugger) 更新

- 修正檔案開啟器與搜尋的錯誤 -
  [#4525](https://github.com/flutter/devtools/pull/4525)
- 修正程式碼檢視區的可捲動區域 -
  [#4448](https://github.com/flutter/devtools/pull/4448)
- 支援語法高亮於剖析器中的巢狀擷取 -
  [#4427](https://github.com/flutter/devtools/pull/4427)

## 網路分析器 (Network Profiler) 更新

- 當位於 Network 分頁時，應用程式熱重啟後
  網路錄製功能現在會持續運作 -
  [#4438](https://github.com/flutter/devtools/pull/4438)

## 日誌 (Logging) 更新

- 現在會顯示來自非 stdout 來源的日誌訊息 -
  [#4487](https://github.com/flutter/devtools/pull/4487)

## 完整提交紀錄

若要查詢自上個版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.17.0...v2.18.0)。
