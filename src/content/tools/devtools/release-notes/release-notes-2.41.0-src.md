# DevTools 2.41.0 發行說明

Dart 與 Flutter DevTools 2.41.0 版本
除了其他一般性改進外，還包含以下變更。
想進一步了解 DevTools，請參閱
[DevTools overview](/tools/devtools/overview)。

## 一般更新

* 跨工作階段保留篩選器設定。 - [#8447](https://github.com/flutter/devtools/pull/8447)、
[#8456](https://github.com/flutter/devtools/pull/8456)
[#8470](https://github.com/flutter/devtools/pull/8470)

## Inspector（檢查器）更新

* 在[新版 Inspector](https://docs.flutter.dev/tools/devtools/release-notes/release-notes-2.40.2#inspector-updates)
  設定中新增選項，可在熱重載（hot-reload）後自動重新整理元件樹（widget tree）。 - [#8483](https://github.com/flutter/devtools/pull/8483)

## 網路分析器（Network profiler）更新

* 在頂層 Network profiler 控制項新增篩選文字欄位。-
[#8469](https://github.com/flutter/devtools/pull/8469)
    ![Network filter field](/assets/images/docs/tools/devtools/release-notes/images-2.41.0/network_filter.png "Network filter field")

## 日誌（Logging）更新

* 在接收到日誌時立即擷取日誌細節，避免因延遲載入而導致日誌資料遺失。 - [#8421](https://github.com/flutter/devtools/pull/8421)
* 減少初始頁面載入時間。 - [#8500](https://github.com/flutter/devtools/pull/8500)
* 新增支援顯示中繼資料（metadata），例如日誌嚴重性（severity）、分類（category）、zone 及 isolate -
[#8419](https://github.com/flutter/devtools/pull/8419)、
[#8439](https://github.com/flutter/devtools/pull/8439)、
[#8441](https://github.com/flutter/devtools/pull/8441)。現在也可以
根據這些中繼資料值進行搜尋與篩選。 - [#8473](https://github.com/flutter/devtools/pull/8473)
    ![Logging metadata display](/assets/images/docs/tools/devtools/release-notes/images-2.41.0/log_metadata.png "Logging metadata display")
* 在頂層 Logging 控制項新增篩選文字欄位。-
[#8427](https://github.com/flutter/devtools/pull/8427)
    ![Logging filter](/assets/images/docs/tools/devtools/release-notes/images-2.41.0/log_filter.png "Logging filter")
* 新增依日誌嚴重性／等級進行篩選的支援。-
[#8433](https://github.com/flutter/devtools/pull/8433)
    ![Log level filter](/assets/images/docs/tools/devtools/release-notes/images-2.41.0/log_level_filter.png "Log level filter")
* 新增設定，可設定日誌保留上限。 - [#8493](https://github.com/flutter/devtools/pull/8493)
* 新增按鈕，可在原始文字與 JSON 之間切換日誌細節顯示。-
[#8445](https://github.com/flutter/devtools/pull/8445)
* 修正午夜過後日誌順序錯亂的錯誤。-
[#8420](https://github.com/flutter/devtools/pull/8420)
* 初次載入時，自動將日誌表格滾動至底部。-
[#8437](https://github.com/flutter/devtools/pull/8437)

## VS Code 側邊欄（Sidebar）更新

* 已移除 VS Code 側邊欄的舊版 `postMessage`，改為使用 DTD 驅動的版本。若嘗試存取舊版側邊欄，將顯示提示訊息，建議更新 Dart VS Code 擴充功能。Dart VS Code 擴充功能是唯一使用舊版側邊欄的用戶，並已於 v3.96 完成遷移。

## 完整提交歷史

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.41.0)。
