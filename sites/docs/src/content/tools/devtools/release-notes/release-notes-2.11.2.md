---
title: DevTools 2.11.2 發行說明
shortTitle: 2.11.2 發行說明
breadcrumb: 2.11.2
description: Dart 與 Flutter DevTools 2.11.2 版的發行說明。
showToc: false
---

Dart 與 Flutter DevTools 2.11.2 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 本次版本進行了大量的程式碼清理與技術債減少。

## CPU 分析器（CPU profiler）更新

* 在 CPU 分析檔案（CPU profiles）的檔案 URI 中新增了原始碼行號 -
  [#3718](https://github.com/flutter/devtools/pull/3718)

  ![cpu stack frame line numbers](/assets/images/docs/tools/devtools/release-notes/images-2.11.2/image1.png "cpu stack frame line numbers")

## 除錯器（Debugger）更新

* 檔案開啟器（File opener）使用體驗（UX）改進，包括支援點擊
  原始碼檔案名稱以開啟檔案搜尋視窗 -
  [#3612](https://github.com/flutter/devtools/pull/3612),
  [#3758](https://github.com/flutter/devtools/pull/3758)
* 新增支援自動捲動檔案總管（File Explorer）至選取的檔案 -
  [#3786](https://github.com/flutter/devtools/pull/3786),
  [#3794](https://github.com/flutter/devtools/pull/3794)

  ![debugger file explorer scrolling](/assets/images/docs/tools/devtools/release-notes/images-2.11.2/image2.gif "debugger file explorer scrolling")

## 完整提交紀錄

如需查詢自上個版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.10.0...v2.11.2)。
