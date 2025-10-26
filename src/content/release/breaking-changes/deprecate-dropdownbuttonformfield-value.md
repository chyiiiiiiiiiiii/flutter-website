---
title: >-
  停用 'DropdownButtonFormField' 建構函式的 'value' 參數
description: >-
  `DropdownButtonFormField` 建構函式參數 `value` 已被參數 `initialValue` 取代。
---

{% render docs/breaking-changes.md %}

## 摘要

[`DropdownButtonFormField`][`DropdownButtonFormField`] 建構函式的 `value` 參數已被棄用，建議改用 `initialValue` 參數。

## 背景說明

[`DropdownButtonFormField`][`DropdownButtonFormField`] 建構函式的 `value` 參數過去用於初始化 [`DropdownButtonFormField.initialValue`][`DropdownButtonFormField.initialValue`]。
由於名稱不一致，容易造成混淆。例如，開發者可能誤以為設定 `value` 可以改變目前選取的值，但實際上並非如此——它只會設定初始值，或在欄位重設時生效。

## 變更說明

[`DropdownButtonFormField`][`DropdownButtonFormField`] 建構函式的 `value` 參數已被棄用，請改用名為 `initialValue` 的參數。

## 遷移指南

請將 [`DropdownButtonFormField`][`DropdownButtonFormField`] 建構函式中的 `value` 參數，替換為 `initialValue` 參數，以初始化 [`DropdownButtonFormField.initialValue`][`DropdownButtonFormField.initialValue`]。

遷移前的程式碼：

```dart highlightLines=2
DropdownButtonFormField(
  value: 'Yellow',
),
```

遷移後的程式碼：

```dart highlightLines=2
DropdownButtonFormField(
  initialValue: 'Yellow',
),
```

## 時程

合併於版本：3.35.0-0.0.pre<br>  
正式版釋出：3.35

## 參考資料

API 文件：

- [`DropdownButtonFormField`][`DropdownButtonFormField`]
- [`DropdownButtonFormField.initialValue`][`DropdownButtonFormField.initialValue`]

相關議題：

- [Issue #169983][Issue #169983]

相關 PR：

- [Deprecate `DropdownButtonFormField` `value` 參數，改用 `initialValue`][Deprecate `DropdownButtonFormField` `value` parameter in favor of `initialValue`]

[`DropdownButtonFormField`]: {{site.api}}/flutter/material/DropdownButtonFormField/DropdownButtonFormField.html
[`DropdownButtonFormField.initialValue`]: {{site.main-api}}/flutter/widgets/FormField/initialValue.html
[Issue #169983]: {{site.repo.flutter}}/issues/169983
[Deprecate `DropdownButtonFormField` `value` parameter in favor of `initialValue`]: {{site.repo.flutter}}/pull/170805
