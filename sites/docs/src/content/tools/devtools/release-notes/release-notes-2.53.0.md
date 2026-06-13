---
title: DevTools 2.53.0 發布說明
shortTitle: 2.53.0 發布說明
breadcrumb: 2.53.0
showToc: false
---

# DevTools 2.53.0 發布說明

Dart 和 Flutter DevTools 的 2.53.0 版本包含以下變更及其他一般性改進。
若要深入瞭解 DevTools，請參閱
[DevTools 概覽](/tools/devtools/overview)。

## 一般更新

- 將 DevTools 的預設編譯器切換為 `dart2wasm`。-
  [#9530](https://github.com/flutter/devtools/pull/9530)

## 效能更新

- 將分析資料上限從 64MB 提升至 2GB，修復大型分析檔案導致面板無法載入的問題。-
  [#9540](https://github.com/flutter/devtools/pull/9540)

## 進階開發者模式更新

- 修復啟用「進階開發者模式」時 CPU 分析檔無法載入的問題。- [#9528](https://github.com/flutter/devtools/pull/9528)

## 完整提交記錄

若要查看本次發布的完整變更清單，請參閱
[DevTools git 記錄](https://github.com/flutter/devtools/tree/v2.53.0)。
