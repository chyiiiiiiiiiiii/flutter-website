---
title: 棄用 `ThemeData.dialogBackgroundColor`，改用 `DialogThemeData.backgroundColor`
description: >-
  `ThemeData.dialogBackgroundColor` 參數已被 `DialogThemeData.backgroundColor` 取代。
---

{% render docs/breaking-changes.md %}

## 摘要

[`ThemeData.dialogBackgroundColor`][`ThemeData.dialogBackgroundColor`] 參數已被棄用，建議改用 [`DialogThemeData.backgroundColor`][`DialogThemeData.backgroundColor`] 參數。

## 背景說明

[`Dialog`][`Dialog`] 與 [`AlertDialog`][`AlertDialog`] 元件（Widgets）的預設值可以透過像 [`DialogThemeData`][`DialogThemeData`] 這樣的元件專屬主題（component-specific theme）來覆寫。過去，會使用 `ThemeData.dialogBackgroundColor` 參數來覆寫對話框的預設背景顏色，但這個作法已因 [`DialogThemeData`][`DialogThemeData`] 而變得多餘。

## 變更說明

[`ThemeData.dialogBackgroundColor`][`ThemeData.dialogBackgroundColor`] 已被棄用，建議改用元件專屬主題（component-specific theme）。如需覆寫預設背景顏色，請使用 [`DialogThemeData`][`DialogThemeData`]。

## 遷移指南

如需覆寫對話框的預設背景顏色，請將 [`ThemeData.dialogBackgroundColor`][`ThemeData.dialogBackgroundColor`] 替換為 [`DialogThemeData.backgroundColor`][`DialogThemeData.backgroundColor`]。

遷移前的程式碼：

```dart
theme: ThemeData(
  dialogBackgroundColor: Colors.orange,
),
```

遷移後的程式碼：

```dart
theme: ThemeData(
  dialogTheme: const DialogThemeData(backgroundColor: Colors.orange),
),
```

## 時程

合併於版本：3.28.0-0.1.pre<br>  
穩定版釋出：3.29

## 參考資料

API 文件：

- [`ThemeData.dialogBackgroundColor`][`ThemeData.dialogBackgroundColor`]
- [`DialogThemeData.backgroundColor`][`DialogThemeData.backgroundColor`]
- [`DialogThemeData`][`DialogThemeData`]
- [`Dialog`][`Dialog`]
- [`AlertDialog`][`AlertDialog`]

相關議題：

- [Issue #91772][Issue #91772]

相關 PR：

- [Deprecate `ThemeData.dialogBackgroundColor` in favor of `DialogTheme.backgroundColor`][Deprecate `ThemeData.dialogBackgroundColor` in favor of `DialogTheme.backgroundColor`]

[`ThemeData.dialogBackgroundColor`]: {{site.api}}/flutter/material/ThemeData/dialogBackgroundColor.html
[`DialogThemeData.backgroundColor`]: {{site.api}}/flutter/material/DialogThemeData/backgroundColor.html
[`DialogThemeData`]: {{site.api}}/flutter/material/DialogThemeData-class.html
[`Dialog`]: {{site.api}}/flutter/material/Dialog-class.html
[`AlertDialog`]: {{site.api}}/flutter/material/AlertDialog-class.html
[Issue #91772]: {{site.repo.flutter}}/issues/91772
[Deprecate `ThemeData.dialogBackgroundColor` in favor of `DialogTheme.backgroundColor`]: {{site.repo.flutter}}/pull/155072
