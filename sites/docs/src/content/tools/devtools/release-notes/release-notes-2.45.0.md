---
title: DevTools 2.45.0 發行說明
shortTitle: 2.45.0 發行說明
breadcrumb: 2.45.0
description: Dart 與 Flutter DevTools 2.45.0 版本的發行說明。
showToc: false
---

Dart 與 Flutter DevTools 2.45.0 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools 總覽](/tools/devtools/overview)。

## 一般更新

* 新增記憶體壓力警告，讓你可以降低 DevTools 的記憶體使用量，以避免發生 OOM（記憶體不足）當機。-
  [#8989](https://github.com/flutter/devtools/pull/8989)、
  [#8997](https://github.com/flutter/devtools/pull/8997)、
  [#8998](https://github.com/flutter/devtools/pull/8998)

* 修正斷線時檢視歷史紀錄的相關錯誤。-
  [#8985](https://github.com/flutter/devtools/pull/8985)

* 修正 DevTools 連線時自動繼續執行，而非在中斷點暫停的問題。-
  [#8991](https://github.com/flutter/devtools/pull/8991)

* 防止文字輸入欄位搶奪 IDE 焦點。-
  [#9091](https://github.com/flutter/devtools/pull/9091)

## Inspector 更新

* 修正 Inspector 樹狀結構中發生錯誤（例如 RenderFlex overflow 錯誤）時，進行熱重載後錯誤未被移除的問題。-
  [#9106](https://github.com/flutter/devtools/pull/9106)

## 除錯器（Debugger）更新

* 將「暫停」與「繼續」按鈕合併為單一按鈕。-
  [#9095](https://github.com/flutter/devtools/pull/9095)

## 深層連結 (deep links) 工具更新

* 修正 Windows 檔案路徑在深層連結頁面顯示不正確的問題 [#9027](https://github.com/flutter/devtools/pull/9027)。

* 修正當沒有 iOS 設定時，深層連結頁面會當機的問題 [#9027](https://github.com/flutter/devtools/pull/9027)。

## 完整提交紀錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.45.0)。
