---
title: 棄用 `ButtonBar`，改用 `OverflowBar`
description: >-
  ButtonBar 元件（Widget）已被更高效的 OverflowBar 元件取代。
---

{% render docs/breaking-changes.md %}

## 摘要

`ButtonBar` 元件（Widget）已被棄用，建議改用更高效的 `OverflowBar` 元件。
因此，`ThemeData.buttonBarTheme` 和 `ButtonBarTheme` 也一併被棄用。

## 背景說明

`ButtonBar` 元件會將其子元件（children）以橫向排列，若橫向空間不足則改為縱向排列。
`OverflowBar` 元件也有相同的行為，但它不依賴於 Material 函式庫，且屬於核心的 `widgets.dart` 函式庫。

## 變更說明

- 將 `ButtonBar` 元件（Widget）替換為 `OverflowBar` 元件。
- 預設情況下，`ButtonBar` 會將其子元件對齊到版面配置的結尾，而
  `OverflowBar` 則會將其子元件對齊到起始位置。
  若要將 `OverflowBar` 的子元件對齊到結尾，請將 `OverflowBar.alignment` 屬性設為 `MainAxisAlignment.end`。
- `ButtonBar.buttonPadding` 提供按鈕之間的間距以及按鈕周圍的內距（padding）。
  請改用 `OverflowBar.spacing`，該元件僅提供按鈕之間的間距。
  若需為按鈕周圍增加內距，請將 `OverflowBar` 元件包裹在 `Padding` 元件中。
- 將 `ButtonBar.overflowButtonSpacing` 替換為 `OverflowBar.overflowSpacing`，
  當橫向空間不足時，按鈕改為縱向排列時，該元件可提供按鈕之間的間距。
- 若有指定，請從 `ThemeData` 中移除 `ButtonBarThemeData`。

## 遷移指南

請將 `ButtonBar` 替換為 `OverflowBar`，如有需要可覆寫預設對齊方式，
將 `ButtonBar.buttonPadding` 替換為 `Padding` 元件，並使用 `OverflowBar.spacing` 來處理按鈕之間及周圍的間距，
同時將 `ButtonBar.overflowButtonSpacing` 替換為 `OverflowBar.overflowSpacing`，以便在橫向空間不足、按鈕改為縱向排列時提供按鈕之間的間距。

Before:

```dart
ButtonBar(
  buttonPadding: const EdgeInsets.all(8.0),
  overflowButtonSpacing: 8.0,
  children: <Widget>[
    TextButton(child: const Text('Button 1'), onPressed: () {}),
    TextButton(child: const Text('Button 2'), onPressed: () {}),
    TextButton(child: const Text('Button 3'), onPressed: () {}),
  ],
),
```

之後：

```dart
Padding(
  padding: const EdgeInsets.all(8.0),
  child: OverflowBar(
    alignment: MainAxisAlignment.end,
    spacing: 8.0,
    overflowSpacing: 8.0,
    children: <Widget>[
      TextButton(child: const Text('Button 1'), onPressed: () {}),
      TextButton(child: const Text('Button 2'), onPressed: () {}),
      TextButton(child: const Text('Button 3'), onPressed: () {}),
    ],
  ),
),
```

如果你有指定 `ThemeData.buttonBarTheme`，請將其移除，並改用 `OverflowBar` 元件（Widget）屬性來自訂 `OverflowBar` 元件（Widget）。

修改前：

```dart
ThemeData(
  buttonBarTheme: ButtonBarThemeData(
    alignment: MainAxisAlignment.center,
  ),
),
```

之後：

```dart
ThemeData(
  // ...
),
```

如果你使用了 `ButtonBarTheme` 元件（Widget），請將其移除，並改用 `OverflowBar` 元件（Widget）的屬性來自訂 `OverflowBar` 元件（Widget）。

Before:

```dart
ButtonBarTheme(
  data: ButtonBarThemeData(
    alignment: MainAxisAlignment.center,
  ),
  child: ButtonBar(
    children: <Widget>[
      // ...
    ],
  ),
),
```

之後：

```dart
OverflowBar(
  alignment: MainAxisAlignment.center,
  children: <Widget>[
    // ...
  ],
),
```

## 時程

合併於版本：3.22.0-2.0.pre<br>  
於穩定版本發佈：3.24.0

## 參考資料

API 文件：

- [`OverflowBar`][`OverflowBar`]
- [`ButtonBar`][`ButtonBar`]

相關議題：

- [Issue #127955][Issue #127955]

相關 PR：

- [Deprecate `ButtonBar`, `ButtonBarThemeData`, and `ThemeData.buttonBarTheme`][Deprecate `ButtonBar`, `ButtonBarThemeData`, and `ThemeData.buttonBarTheme`]

[`OverflowBar`]: {{site.api}}/flutter/widgets/OverflowBar-class.html
[`ButtonBar`]: {{site.api}}/flutter/material/ButtonBar-class.html
[Issue #127955]: {{site.repo.flutter}}/issues/127955
[Deprecate `ButtonBar`, `ButtonBarThemeData`, and `ThemeData.buttonBarTheme`]: {{site.repo.flutter}}/pull/145523
