---
title: DevTools 2.24.0 版本發行說明
shortTitle: 2.24.0 版本發行說明
breadcrumb: 2.24.0
description: Dart 與 Flutter DevTools 2.24.0 版本的發行說明。
showToc: false
---

Dart 與 Flutter DevTools 2.24.0 版本
包含以下變更及其他一般性改進。
如需進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 改善 DevTools 表格的整體效能 -
  [#5664](https://github.com/flutter/devtools/pull/5664),
  [#5696](https://github.com/flutter/devtools/pull/5696)

## CPU 分析器更新

* 修正 CPU flame chart（火焰圖）選取與工具提示的錯誤 -
  [#5676](https://github.com/flutter/devtools/pull/5676)

## 除錯器 (Debugger) 更新

* 強化對檢查 `UserTag` 與 `MirrorReferent` 實例的支援 -
  [#5490](https://github.com/flutter/devtools/pull/5490)
* 修正運算式評估錯誤，當選取欄位的自動完成結果時會清除目前輸入內容的問題 -
  [#5717](https://github.com/flutter/devtools/pull/5717)
* 當選取堆疊框架（stack frame）時，
  會自動捲動至原始碼中的該框架位置 -
  [#5722](https://github.com/flutter/devtools/pull/5722)
* 提升搜尋檔案及在檔案內搜尋的效能 -
  [#5733](https://github.com/flutter/devtools/pull/5733)
* 因效能限制，對於超過 100,000 字元的檔案停用語法高亮顯示 -
  [#5743](https://github.com/flutter/devtools/pull/5743)
* 修正當檔案語法高亮顯示被停用時，原始碼無法顯示的錯誤 -
  [#5743](https://github.com/flutter/devtools/pull/5743)
* 防止檔名與原始碼內容不同步的情況發生 -
  [#5827](https://github.com/flutter/devtools/pull/5827)

## 完整提交紀錄

如需查閱自上個版本以來的完整變更列表，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.23.1...v2.24.0).
