---
title: 更新選單的預設文字樣式
description: >-
  選單的預設文字樣式已更新，以符合 Material 3 規範。
---

{% render docs/breaking-changes.md %}

## 摘要

選單所使用的預設文字樣式已更新，以符合 Material 3 規範。

## 背景

`MenuItemButton`（用於`MenuBar`以及由`MenuAnchor`建立的選單中的元件（Widget））與`DropdownMenuEntry`（在`DropdownMenu`中）所使用的預設文字樣式，已更新為符合 Material 3 規範。

同樣地，`DropdownMenu`的`TextField`預設文字樣式也已更新，以符合 Material 3 規範。

## 變更說明

`MenuItemButton`（用於`MenuBar`以及由`MenuAnchor`建立的選單中的元件（Widget））與`DropdownMenuEntry`（在`DropdownMenu`中）所使用的預設文字樣式，從`TextTheme.bodyLarge`更新為 Material 3 的`TextTheme.labelLarge`。

`DropdownMenu`的`TextField`預設文字樣式，從`TextTheme.labelLarge`更新為 Material 3 的`TextTheme.bodyLarge`。

## 遷移指南

Material 3 的`MenuItemButton`會使用`TextTheme.labelLarge`作為預設文字樣式。  
若要使用先前的預設文字樣式，請於`MenuItemButton.style`或`MenuButtonThemeData.style`屬性中設定`TextTheme.bodyLarge`文字樣式。

遷移前的程式碼：

```dart
MenuItemButton(
  child: Text(MenuEntry.about.label),
  onPressed: () => _activate(MenuEntry.about),
),
```

```dart
menuButtonTheme: MenuButtonThemeData(
  style: MenuItemButton.styleFrom(
    /// ...
  ),
),
```

遷移後的程式碼：

```dart
MenuItemButton(
  style: MenuItemButton.styleFrom(
    textStyle: Theme.of(context).textTheme.bodyLarge,
  ),
  child: Text(MenuEntry.about.label),
  onPressed: () => _activate(MenuEntry.about),
),
```

```dart
menuButtonTheme: MenuButtonThemeData(
  style: MenuItemButton.styleFrom(
    textStyle: Theme.of(context).textTheme.bodyLarge,
  ),
),
```

`DropdownMenu` 的 `TextField` 在 Material 3 中  
預設會使用 `TextTheme.bodyLarge` 作為文字樣式（text style）。  
若要使用先前的預設文字樣式，  
請在 `DropdownMenu.textStyle` 或 `DropdownMenuThemeData.textStyle` 屬性中  
設定 `TextTheme.labelLarge` 文字樣式。

遷移前的程式碼：

```dart
DropdownMenu<ColorLabel>(
  initialSelection: ColorLabel.green,
  controller: colorController,
  label: const Text('Color'),
  dropdownMenuEntries: colorEntries,
  onSelected: (ColorLabel? color) {
    setState(() {
      selectedColor = color;
    });
  },
),
```

```dart
dropdownMenuTheme: DropdownMenuThemeData(
  /// ...
),
```

遷移後的程式碼：

```dart
DropdownMenu<ColorLabel>(
  textStyle: Theme.of(context).textTheme.labelLarge,
  initialSelection: ColorLabel.green,
  controller: colorController,
  label: const Text('Color'),
  dropdownMenuEntries: colorEntries,
  onSelected: (ColorLabel? color) {
    setState(() {
      selectedColor = color;
    });
  },
),
```

```dart
dropdownMenuTheme: DropdownMenuThemeData(
  textStyle: TextStyle(
    fontStyle: FontStyle.italic,
    fontWeight: FontWeight.bold,
  ),
),
```

`DropdownMenu` 的 `DropdownMenuEntry` 在 Material 3 中  
預設會使用 `TextTheme.labelLarge` 作為文字樣式（text style）。  
若要使用先前的預設文字樣式，請在  
`DropdownMenuEntry.style` 或 `MenuButtonThemeData.style` 屬性中設定  
`TextTheme.bodyLarge` 文字樣式。

遷移前的程式碼：

```dart
DropdownMenuEntry<ColorLabel>(
  value: color,
  label: color.label,
),
```

```dart
menuButtonTheme: MenuButtonThemeData(
  style: MenuItemButton.styleFrom(
    /// ...
  ),
),
```

遷移後的程式碼：

```dart
DropdownMenuEntry<ColorLabel>(
  style: MenuItemButton.styleFrom(
    textStyle: Theme.of(context).textTheme.bodyLarge,
  ),
  value: color,
  label: color.label,
),
```

```dart
menuButtonTheme: MenuButtonThemeData(
  style: MenuItemButton.styleFrom(
    textStyle: Theme.of(context).textTheme.bodyLarge,
  ),
),
```

## 時程

引入版本：3.14.0-11.0.pre<br>  
正式版本：3.16

## 參考資料

API 文件：

* [`MenuBar`][`MenuBar`]
* [`MenuAnchor`][`MenuAnchor`]
* [`MenuItemButton`][`MenuItemButton`]
* [`MenuButtonTheme`][`MenuButtonTheme`]
* [`DropdownMenu`][`DropdownMenu`]
* [`DropdownMenuEntry`][`DropdownMenuEntry`]
* [`DropdownMenuTheme`][`DropdownMenuTheme`]
* [`TextTheme`][`TextTheme`]

相關 PR：

* [Update default menu text styles for Material 3][Update default menu text styles for Material 3]

[`MenuBar`]: {{site.api}}/flutter/material/MenuBar-class.html
[`MenuAnchor`]: {{site.api}}/flutter/material/MenuAnchor-class.html
[`MenuItemButton`]: {{site.api}}/flutter/material/MenuItemButton-class.html
[`MenuButtonTheme`]: {{site.api}}/flutter/material/MenuButtonTheme-class.html
[`DropdownMenu`]: {{site.api}}/flutter/material/DropdownMenu-class.html
[`DropdownMenuEntry`]: {{site.api}}/flutter/material/DropdownMenuEntry-class.html
[`DropdownMenuTheme`]: {{site.api}}/flutter/material/DropdownMenuTheme-class.html
[`TextTheme`]: {{site.api}}/flutter/material/TextTheme-class.html

[Update default menu text styles for Material 3]: {{site.repo.flutter}}/pull/131930
