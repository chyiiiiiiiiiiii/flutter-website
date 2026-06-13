---
title: DevTools 2.52.0 發布說明
shortTitle: 2.52.0 發布說明
breadcrumb: 2.52.0
showToc: false
---

Dart 和 Flutter DevTools 的 2.52.0 版本包含以下變更及其他一般性改進。
若要深入瞭解 DevTools，請參閱
[DevTools 總覽](/tools/devtools/overview)。

## 一般更新

- 在資料表格中新增水平捲動列，以改善導覽體驗。 -
  [#9482](https://github.com/flutter/devtools/pull/9482)
- 現在可以透過拖曳標題分隔線來調整資料表格的欄位寬度。 -
  [#9485](https://github.com/flutter/devtools/pull/9485)

## 網路分析器更新

- 修正頁籤名稱中「錯誤計數」徽章的版面配置問題。 -
  [#9470](https://github.com/flutter/devtools/pull/9470)
- 修正在沒有標頭時，「回應標頭 (Response Headers)」和「請求標頭 (Request Headers)」的顯示問題。 -
  [#9492](https://github.com/flutter/devtools/pull/9492)
- 新增橫幅，以清楚標示 DevTools 目前未記錄網路請求的狀況。 -
  [#9495](https://github.com/flutter/devtools/pull/9495)

## VS Code 更新

- 修正在 macOS 上將 DevTools 嵌入 VS Code 時，`Cmd`+`C` 和 `Cmd`+`V` 等快捷鍵無法正常運作的問題。 -
  [#9472](https://github.com/flutter/devtools/pull/9472)

## 完整提交紀錄

若要查看此版本的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.52.0)。
