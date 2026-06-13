---
title: DevTools 2.31.0 發行說明
shortTitle: 2.31.0 發行說明
breadcrumb: 2.31.0
description: Dart 與 Flutter DevTools 2.31.0 版本的發行說明。
showToc: false
---

Dart 與 Flutter DevTools 2.31.0 版本包含以下變更，以及其他一般性改進。
如需進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 新增深層連結 (deep link) 驗證功能，
  支援在 Android 上進行深層連結網頁檢查。- [#6935](https://github.com/flutter/devtools/pull/6935)
* 新增基礎結構以允許連線至 Dart Tooling Daemon。- [#7009](https://github.com/flutter/devtools/pull/7009)
* 表格文字現在可被選取 [#6919](https://github.com/flutter/devtools/pull/6919)

## 檢查器更新

* 在搜尋欄位輸入完成後，
  現在會自動選取下一個項目 - [#6677](https://github.com/flutter/devtools/pull/6677)
* 在檢查設定對話框中，新增指向套件目錄文件的連結 - [#6825](https://github.com/flutter/devtools/pull/6825)

  ![Link to documentation](/assets/images/docs/tools/devtools/release-notes/images-2.31.0/link-to-doc.png "Link to documentation")

* 修正由 Flutter framework 擁有的元件 (Widget) 會顯示在元件樹檢視中的問題 - [#6857](https://github.com/flutter/devtools/pull/6857)
* 僅快取使用者新增的 pub 根目錄 - [#6897](https://github.com/flutter/devtools/pull/6897)
* 若 Flutter pub 根目錄被誤快取，則移除該快取 - [#6911](https://github.com/flutter/devtools/pull/6911)

## 效能更新

* 將光柵圖層預覽背景改為棋盤格樣式。- [#6827](https://github.com/flutter/devtools/pull/6827)

## CPU 分析器更新

* 在下拉選單項目上新增懸停卡片，顯示取樣率。- [#7010](https://github.com/flutter/devtools/pull/7010)

  ![Sampling rate for dropdown](/assets/images/docs/tools/devtools/release-notes/images-2.31.0/hover-for-dropdown.png "Sampling rate for dropdown")

## 除錯器更新

* 將 `extension type` 高亮顯示為宣告關鍵字，
  將識別字串插值中的 `$` 高亮為插值的一部分，
  並正確高亮顯示型別參數中的註解。- [6837](https://github.com/flutter/devtools/pull/6837)

## 日誌更新

* 在詳細資訊窗格新增捲軸。- [#6917](https://github.com/flutter/devtools/pull/6917)

## VS Code 側邊欄更新

* 修正導致 VS Code 側邊欄在近期 beta/master 版本無法載入的問題。- [#6984](https://github.com/flutter/devtools/pull/6984)

## DevTools 擴充功能更新

* 修正數個導致 Dart 伺服器應用程式無法連線至 DevTools 擴充功能的錯誤。- [#6982](https://github.com/flutter/devtools/pull/6982), [#6993](https://github.com/flutter/devtools/pull/6993)

## 完整提交紀錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.31.0)。
