---
title: 移除 `InputDecoration.collapsed` 的無效參數
description: >
  'InputDecoration.collapsed' 建構函式中的
  'floatingLabelBehavior' 和 'floatingLabelAlignment' 參數已被棄用且無替代方案，
  因為這些參數沒有任何作用。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`InputDecoration.collapsed` 的無效參數 `floatingLabelBehavior` 和
`floatingLabelAlignment` 已被棄用。

## 背景

`InputDecoration.collapsed` 建構函式用於
建立一個沒有標籤的極簡裝飾。

參數 `floatingLabelAlignment` 和 `floatingLabelBehavior`
沒有任何作用，因為使用
`InputDecoration.collapsed` 建立的輸入裝飾（InputDecoration）不會有標籤。

## 遷移指南

若要進行遷移，請在呼叫 `InputDecoration.collapsed` 建構函式時移除 `floatingLabelBehavior` 和 `floatingLabelAlignment`
這兩個參數的使用。這些參數本來就沒有任何作用。

遷移前的程式碼：

```dart
InputDecoration.collapsed(
  hintText: 'Hint',
  floatingLabelAlignment: FloatingLabelAlignment.center,
  floatingLabelBehavior: FloatingLabelBehavior.auto,
),
```

遷移後的程式碼：

```dart
InputDecoration.collapsed(
  hintText: 'Hint',
),
```

## 時程

合併於版本：3.24.0-0.1.pre<br>
正式版發佈於：3.27.0

## 參考資料

API 文件：

* [`InputDecoration.collapsed`][]
* [`InputDecoration.floatingLabelAlignment`][]
* [`InputDecoration.floatingLabelBehavior`][]

相關議題：

* [Add prefixIcon and suffixIcon parameters to InputDecoration.collapsed][]

相關 PR：

* [Deprecate invalid InputDecoration.collapsed parameters][]
* [Cleanup InputDecoration.collapsed constructor][]

[`InputDecoration.collapsed`]: {{site.api}}/flutter/material/InputDecoration/InputDecoration.collapsed.html
[`InputDecoration.floatingLabelAlignment`]: {{site.api}}/flutter/material/InputDecoration/floatingLabelAlignment.html
[`InputDecoration.floatingLabelBehavior`]: {{site.api}}/flutter/material/InputDecoration/floatingLabelBehavior.html

[Add prefixIcon and suffixIcon parameters to InputDecoration.collapsed]: {{site.repo.flutter}}/issues/61331
[Deprecate invalid InputDecoration.collapsed parameters]: {{site.repo.flutter}}/pull/152486
[Cleanup InputDecoration.collapsed constructor]: {{site.repo.flutter}}/pull/152165
