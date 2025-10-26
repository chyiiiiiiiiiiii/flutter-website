---
title: 棄用 `ThemeData.indicatorColor`，改用 `TabBarThemeData.indicatorColor`
description: >-
  `ThemeData.indicatorColor` 參數已被 `TabBarThemeData.indicatorColor` 取代。
---

{% render docs/breaking-changes.md %}

## 摘要

[`ThemeData.indicatorColor`][`ThemeData.indicatorColor`] 參數已被棄用，建議改用 [`TabBarThemeData.indicatorColor`][`TabBarThemeData.indicatorColor`] 參數。

## 背景說明

[`TabBar`][`TabBar`] 元件（Widget）的預設值可以透過像 [`TabBarThemeData`][`TabBarThemeData`] 這樣的元件專屬主題（component-specific theme）來覆寫。
過去，`ThemeData.indicatorColor` 參數用於在 Material Design 2 中覆寫預設的分頁列指示器顏色，但這個功能已被 [`TabBarThemeData`][`TabBarThemeData`] 取代，因此變得多餘。

## 變更說明

[`ThemeData.indicatorColor`][`ThemeData.indicatorColor`] 已被棄用，建議改用元件專屬主題。
請使用 [`TabBarThemeData`][`TabBarThemeData`] 來覆寫預設的指示器顏色。

## 遷移指南

當 [`ThemeData.useMaterial3`][`ThemeData.useMaterial3`] 旗標（flag）設為 `false` 時，請將 [`ThemeData.indicatorColor`][`ThemeData.indicatorColor`] 替換為 [`TabBarThemeData.indicatorColor`][`TabBarThemeData.indicatorColor`]，以覆寫預設的分頁列指示器顏色。

遷移前的程式碼：

```dart
theme: ThemeData(
  indicatorColor: Colors.red,
  useMaterial3: false,
),
```

遷移後的程式碼：

```dart
theme: ThemeData(
  tabBarTheme: const TabBarThemeData(indicatorColor: Colors.red),
  useMaterial3: false,
),
```

## 時程

合併於版本：3.30.0-0.0.pre<br>  
穩定版釋出：3.32

## 參考資料

API 文件：

- [`ThemeData.indicatorColor`][`ThemeData.indicatorColor`]
- [`ThemeData.useMaterial3`][`ThemeData.useMaterial3`]
- [`TabBarThemeData.indicatorColor`][`TabBarThemeData.indicatorColor`]
- [`TabBarThemeData`][`TabBarThemeData`]
- [`TabBar`][`TabBar`]

相關議題：

- [Issue #91772][Issue #91772]

相關 PR：

- [Deprecate `ThemeData.indicatorColor` in favor of `TabBarThemeData.indicatorColor`][Deprecate `ThemeData.indicatorColor` in favor of `TabBarThemeData.indicatorColor`]

[`ThemeData.indicatorColor`]: {{site.api}}/flutter/material/ThemeData/indicatorColor.html
[`ThemeData.useMaterial3`]: {{site.api}}/flutter/material/ThemeData/useMaterial3.html
[`TabBarThemeData.indicatorColor`]: {{site.api}}/flutter/material/TabBarThemeData/indicatorColor.html
[`TabBarThemeData`]: {{site.api}}/flutter/material/TabBarThemeData-class.html
[`TabBar`]: {{site.api}}/flutter/material/TabBar-class.html
[Issue #91772]: {{site.repo.flutter}}/issues/91772
[Deprecate `ThemeData.indicatorColor` in favor of `TabBarThemeData.indicatorColor`]: {{site.repo.flutter}}/pull/160024
