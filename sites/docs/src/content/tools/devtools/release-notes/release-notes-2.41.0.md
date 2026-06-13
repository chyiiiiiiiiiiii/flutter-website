---
title: DevTools 2.41.0 版本說明
shortTitle: 2.41.0 版本說明
breadcrumb: 2.41.0
description: Dart 和 Flutter DevTools 2.41.0 版本說明。
showToc: false
---

Dart 和 Flutter DevTools 2.41.0 版本包含以下變更及其他一般性改善。
若想進一步瞭解 DevTools，請參閱
[DevTools 總覽](/tools/devtools/overview)。

## 一般更新

* 跨 session 保留篩選設定。 - [#8447](https://github.com/flutter/devtools/pull/8447),
  [#8456](https://github.com/flutter/devtools/pull/8456)
  [#8470](https://github.com/flutter/devtools/pull/8470)

## Inspector 更新

* 在新版 Inspector 的設定中新增選項，允許在熱重載 (hot-reload) 後自動重新整理元件 (Widget) 樹。 -
  [#8483](https://github.com/flutter/devtools/pull/8483)

## 網路分析器更新

* 在最上層的網路分析器控制列中新增篩選文字欄位。 -
  [#8469](https://github.com/flutter/devtools/pull/8469)
  ![網路篩選欄位](/assets/images/docs/tools/devtools/release-notes/images-2.41.0/network_filter.png "Network filter field")

## 日誌更新

* 接收日誌時立即擷取日誌詳細資料，避免因延遲載入而造成日誌資料遺失。 - [#8421](https://github.com/flutter/devtools/pull/8421)
* 縮短初始頁面載入時間。 - [#8500](https://github.com/flutter/devtools/pull/8500)
* 新增對顯示中繼資料的支援，例如日誌嚴重性、類別、zone 以及 isolate -
  [#8419](https://github.com/flutter/devtools/pull/8419),
  [#8439](https://github.com/flutter/devtools/pull/8439),
  [#8441](https://github.com/flutter/devtools/pull/8441)。現在也可以依這些中繼資料值進行搜尋與篩選。 - [#8473](https://github.com/flutter/devtools/pull/8473)
  ![日誌中繼資料顯示](/assets/images/docs/tools/devtools/release-notes/images-2.41.0/log_metadata.png "Logging metadata display")
* 在最上層的日誌控制列中新增篩選文字欄位。 -
  [#8427](https://github.com/flutter/devtools/pull/8427)
  ![日誌篩選](/assets/images/docs/tools/devtools/release-notes/images-2.41.0/log_filter.png "Logging filter")
* 新增依日誌嚴重性 / 等級進行篩選的支援。 -
  [#8433](https://github.com/flutter/devtools/pull/8433)
  ![日誌等級篩選](/assets/images/docs/tools/devtools/release-notes/images-2.41.0/log_level_filter.png "Log level filter")
* 新增用於設定日誌保留限制的設定項目。 - [#8493](https://github.com/flutter/devtools/pull/8493)
* 新增按鈕，可在原始文字與 JSON 之間切換日誌詳細資料的顯示方式。 -
  [#8445](https://github.com/flutter/devtools/pull/8445)
* 修正日誌在午夜後順序錯亂的問題。 -
  [#8420](https://github.com/flutter/devtools/pull/8420)
* 初始載入時自動將日誌表格捲動至最底部。 -
  [#8437](https://github.com/flutter/devtools/pull/8437)

## VS Code 側邊欄更新

* 舊版以 `postMessage` 為基礎的 VS Code 側邊欄已移除，改採以 DTD 驅動的版本。嘗試存取舊版側邊欄時，將顯示建議更新 Dart VS Code 擴充功能的提示訊息。Dart VS Code 擴充功能是舊版側邊欄的唯一使用者，並已於 v3.96 版本完成遷移。

## 完整提交歷史

若要查看本次發布的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.41.0)。
