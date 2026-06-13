---
title: DevTools 2.9.1 版本更新說明
shortTitle: 2.9.1 版本更新說明
breadcrumb: 2.9.1
description: Dart 與 Flutter DevTools 2.9.1 版本的更新說明。
showToc: false
---

Dart 與 Flutter DevTools 2.9.1 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 除錯器（Debugger）更新

* 改善在除錯器變數面板（Debugger variables pane）中檢查大型 list 與 map 的支援 - [#3497](https://github.com/flutter/devtools/pull/3497)

  ![Inspection before](/assets/images/docs/tools/devtools/release-notes/images-2.9.1/image1.png "Inspection before")

  ![Inspection after](/assets/images/docs/tools/devtools/release-notes/images-2.9.1/image2.png "Inspection after")

* 新增在程式瀏覽器大綱檢視（program explorer outline view）中選取物件的支援。
  選取物件後，除錯器會自動捲動原始碼至所選物件 -
  [#3480](https://github.com/flutter/devtools/pull/3480)

## 效能（Performance）更新

* 修正效能頁面搜尋相關錯誤並提升效能 -
  [#3515](https://github.com/flutter/devtools/pull/3515)
* 為 Flutter frame 新增加強型工具提示（tooltip） -
  [#3493](https://github.com/flutter/devtools/pull/3493)

  ![Flutter frame tooltips](/assets/images/docs/tools/devtools/release-notes/images-2.9.1/image3.png "Flutter frame tooltips")

## 完整提交紀錄

如需查閱自上個版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.8.0...v2.9.1)。
