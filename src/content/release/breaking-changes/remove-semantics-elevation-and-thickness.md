---
title: 移除 semantics 的 elevation 和 thickness
description: >-
  已從 semantics 屬性中移除 elevation 和 thickness。
---

{% render docs/breaking-changes.md %}

## 摘要

semantics 屬性中的 elevation 和 thickness 以及其相關 API 均已被移除。

## 背景

elevation 和 thickness 這兩個 semantics 屬性原本是為 Fuchsia 的 3D 繪製（rendering）所設計。
但它們從未被實作，因此一直未被使用。此外，也沒有其他已知用途。
這些屬性只會增加不必要的程式碼複雜度，因此已被移除。

## 變更說明

以下屬性已被移除：`SemanticsConfiguration.elevation`、
`SemanticsConfiguration.thickness`、
`SemanticsNode.thickness`、`SemanticsNode.elevation`、以及 `SemanticsNode.elevationAdjustment`。

## 遷移指南

如果你之前有指派這些屬性，請將相關指派移除。

遷移前的程式碼：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.label = 'my label';
  config.elevation = 1;
  config.thickness = 1;
}
```

遷移後的程式碼：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.label = 'my label';
}
```

## 時程

合併於版本：3.34.0-0.0.pre<br>  
正式版發佈於：3.35

## 參考資料

API 文件：

* [`SemanticsConfiguration`][`SemanticsConfiguration`]
* [`SemanticsNode`][`SemanticsNode`]

相關議題：

* [Issue 166092][Issue 166092]

相關 PR：

* [PR 169382][PR 169382]

[`SemanticsConfiguration`]: {{site.api}}/flutter/semantics/SemanticsConfiguration-class.html
[`SemanticsNode`]: {{site.api}}/flutter/semantics/SemanticsNode-class.html
[Issue 166092]: {{site.repo.flutter}}/issues/166092
[PR 169382]: {{site.repo.flutter}}/pull/169382
