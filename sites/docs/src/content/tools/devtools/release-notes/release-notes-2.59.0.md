---
title: DevTools 2.59.0 版本發行說明
shortTitle: 2.59.0 版本發行說明
breadcrumb: 2.59.0
description: Dart 與 Flutter DevTools 2.59.0 版本的發行說明。
showToc: false
---

Dart 與 Flutter DevTools 2.59.0 版本包含以下變更及其他一般性改善。
若要深入了解 DevTools，請參閱
[DevTools 總覽](/tools/devtools)。

## 一般更新

- 修正了當父層以不同子元件數量重建元件 (Widget) 時，`SplitPane` 拋出 `RangeError` 的問題。
  例如切換某個面板進入或離開版面配置時。 -
  [#9822](https://github.com/flutter/devtools/pull/9822)

## Inspector 更新

- 修正了元件樹中懸停提示框（hover tooltip）被視窗邊界裁切的問題。 -
  [#9823](https://github.com/flutter/devtools/pull/9823)

## 完整提交記錄

若要查看本次發行的完整變更清單，請參閱
[DevTools git 記錄](https://github.com/flutter/devtools/tree/v2.59.0)。
