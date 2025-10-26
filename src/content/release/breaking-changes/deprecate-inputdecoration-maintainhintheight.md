---
title: 棄用 `InputDecoration.maintainHintHeight`，改用 `InputDecoration.maintainHintSize`
description: >-
  `InputDecoration.maintainHintHeight` 參數已被 `InputDecoration.maintainHintSize` 取代。
---

{% render docs/breaking-changes.md %}

## 摘要

[`InputDecoration.maintainHintHeight`][`InputDecoration.maintainHintHeight`] 參數已被棄用，建議改用 [`InputDecoration.maintainHintSize`][`InputDecoration.maintainHintSize`] 參數。

## 背景說明

輸入裝飾器（input decorator）的預設內在尺寸會依賴提示文字（hint）的尺寸。
[`InputDecoration.maintainHintSize`][`InputDecoration.maintainHintSize`] 參數可以設為 `false`，讓內在尺寸在提示文字不可見時忽略其尺寸。
過去，`InputDecoration.maintainHintHeight` 參數是用來覆寫預設的內在高度，且不會影響內在寬度。

## 變更說明

[`InputDecoration.maintainHintHeight`][`InputDecoration.maintainHintHeight`] 已被棄用，建議改用 [`InputDecoration.maintainHintSize`][`InputDecoration.maintainHintSize`]，此參數會讓內在寬度與高度都依賴提示文字的尺寸。

## 遷移指南

請將 [`InputDecoration.maintainHintHeight`][`InputDecoration.maintainHintHeight`] 替換為 [`InputDecoration.maintainHintSize`][`InputDecoration.maintainHintSize`]，以覆寫預設的內在尺寸計算方式。

遷移前的程式碼：

```dart highlightLines=3
TextField(
  indicator: InputDecoration(
    maintainHintHeight: false,
  ),
),
```

遷移後的程式碼：

```dart highlightLines=3
TextField(
  indicator: InputDecoration(
    maintainHintSize: false,
  ),
),
```

## 時程

合併於版本：3.30.0-0.0.pre<br>  
正式版釋出：3.32

## 參考資料

API 文件：

- [`InputDecoration.maintainHintHeight`][`InputDecoration.maintainHintHeight`]
- [`InputDecoration.maintainHintSize`][`InputDecoration.maintainHintSize`]

相關議題：

- [Issue #93337][Issue #93337]

相關 PR：

- [Fix TextField intrinsic width when hint is not visible][Fix TextField intrinsic width when hint is not visible]

[`InputDecoration.maintainHintHeight`]: {{site.api}}/flutter/material/InputDecoration/maintainHintHeight.html
[`InputDecoration.maintainHintSize`]: {{site.main-api}}/flutter/material/InputDecoration/maintainHintSize.html
[Issue #93337]: {{site.repo.flutter}}/issues/93337
[Fix TextField intrinsic width when hint is not visible]: {{site.repo.flutter}}/pull/161235
