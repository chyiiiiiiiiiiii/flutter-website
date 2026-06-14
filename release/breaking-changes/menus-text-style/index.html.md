# 更新選單的預設文字樣式

> 選單的預設文字樣式已更新，以符合 Material 3 規範。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

選單所使用的預設文字樣式已更新，以符合 Material 3 規範。

## 背景

`MenuItemButton`（用於 `MenuBar` 以及由 `MenuAnchor` 建立的選單中的元件 (Widget)）與 `DropdownMenuEntry`（在 `DropdownMenu` 中）所使用的預設文字樣式，已更新為符合 Material 3 規範。

同樣地，`DropdownMenu` 的 `TextField` 預設文字樣式也已更新，以符合 Material 3 規範。

## 變更說明

`MenuItemButton`（用於 `MenuBar` 以及由 `MenuAnchor` 建立的選單中的元件 (Widget)）與 `DropdownMenuEntry`（在 `DropdownMenu` 中）所使用的預設文字樣式，從 `TextTheme.bodyLarge` 更新為 Material 3 的 `TextTheme.labelLarge`。

`DropdownMenu` 的 `TextField` 預設文字樣式，從 `TextTheme.labelLarge` 更新為 Material 3 的 `TextTheme.bodyLarge`。

## 遷移指南

Material 3 的 `MenuItemButton` 會使用 `TextTheme.labelLarge` 作為預設文字樣式。
若要使用先前的預設文字樣式，請於 `MenuItemButton.style` 或 `MenuButtonThemeData.style` 屬性中設定 `TextTheme.bodyLarge` 文字樣式。

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

Material 3 的 `DropdownMenu` 的 `TextField` 預設會使用 `TextTheme.bodyLarge` 作為文字樣式。
若要使用先前的預設文字樣式，請在 `DropdownMenu.textStyle` 或 `DropdownMenuThemeData.textStyle` 屬性中設定 `TextTheme.labelLarge` 文字樣式。

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

Material 3 的 `DropdownMenu` 的 `DropdownMenuEntry` 預設會使用 `TextTheme.labelLarge` 作為文字樣式。
若要使用先前的預設文字樣式，請在 `DropdownMenuEntry.style` 或 `MenuButtonThemeData.style` 屬性中設定 `TextTheme.bodyLarge` 文字樣式。

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

* [`MenuBar`][]
* [`MenuAnchor`][]
* [`MenuItemButton`][]
* [`MenuButtonTheme`][]
* [`DropdownMenu`][]
* [`DropdownMenuEntry`][]
* [`DropdownMenuTheme`][]
* [`TextTheme`][]

相關 PR：

* [Update default menu text styles for Material 3][]

[`MenuBar`]: https://api.flutter.dev/flutter/material/MenuBar-class.html
[`MenuAnchor`]: https://api.flutter.dev/flutter/material/MenuAnchor-class.html
[`MenuItemButton`]: https://api.flutter.dev/flutter/material/MenuItemButton-class.html
[`MenuButtonTheme`]: https://api.flutter.dev/flutter/material/MenuButtonTheme-class.html
[`DropdownMenu`]: https://api.flutter.dev/flutter/material/DropdownMenu-class.html
[`DropdownMenuEntry`]: https://api.flutter.dev/flutter/material/DropdownMenuEntry-class.html
[`DropdownMenuTheme`]: https://api.flutter.dev/flutter/material/DropdownMenuTheme-class.html
[`TextTheme`]: https://api.flutter.dev/flutter/material/TextTheme-class.html

[Update default menu text styles for Material 3]: https://github.com/flutter/flutter/pull/131930

