---
title: ThemeData 的 accent 屬性已被棄用
description: >
  ThemeData 的 accentColor、accentColorBrightness、accentIconTheme 以及
  accentTextTheme 屬性已被棄用。
---

{% render docs/breaking-changes.md %}

## 摘要

ThemeData 的 [accentColor][accentColor]、[accentColorBrightness][accentColorBrightness]、[accentIconTheme][accentIconTheme]
以及 [accentTextTheme][accentTextTheme] 屬性已被棄用。

[Material Design 規範][Material Design spec] 不再為 Material 元件 (Material components) 指定或使用「accent」色彩。元件的預設色彩值現在是從整體主題的 [color scheme][color-scheme-prop] 派生而來。
`ColorScheme` 的 [secondary color][secondary color] 現在通常取代了
`accentColor` 的角色，而當需要對比色時則會使用 [onSecondary color][onSecondary color]。

## 背景

這是 [Material Theme System Updates][Material Theme System Updates] 專案中的一個小部分。

自 Flutter 1.17 起，ThemeData 的 accent 屬性（accentColor、accentColorBrightness、accentIconTheme 以及 accentTextTheme）已不再被 Material 函式庫 (Materials library) 使用。這些屬性已被主題的 [`colorScheme`][color-scheme-prop] 以及
[`textTheme`][text-scheme-prop] 屬性所取代，這也是讓 Material 元件 (Material components) 的預設設定幾乎只依賴這兩個屬性的長期目標之一。

這些變更的動機是讓主題系統更容易理解與使用。所有元件的預設色彩都將由元件自身定義，並以 color scheme 為基礎。特定元件類型的預設值可以透過像是 [`FloatingActionButtonThemeData`][`FloatingActionButtonThemeData`] 或
[`CheckBoxTheme`][`CheckBoxTheme`] 這類元件專屬主題來覆寫。過去，像 accentColor 這類屬性只被少數元件類型、且僅在某些情況下使用，這讓覆寫這些屬性時的影響變得難以理解。

## 變更說明

ThemeData 的 accentColor、accentColorBrightness、accentIconTheme 以及
accentTextTheme 屬性已被棄用，因為 Material 函式庫 (Materials library) 已不再使用這些屬性。

## 遷移指南

### 應用程式主題

[`ThemeData`][`ThemeData`] 的值現在不再需要指定 accentColor、accentColorBrightness、accentIconTheme 或 accentTextTheme。

若要讓 Material 元件 (Material components) 的外觀配置與先前大致相同，請以 color scheme 的 secondary color 取代 accentColor。

遷移前的程式碼：

```dart
MaterialApp(
  theme: ThemeData(accentColor: myColor),
  // ...
);
```

遷移後的程式碼：

```dart
final ThemeData theme = ThemeData();
MaterialApp(
  theme: theme.copyWith(
    colorScheme: theme.colorScheme.copyWith(secondary: myColor),
  ),
  //...
)
```

### `accentColor`

最接近向後相容的 [`ColorScheme`][`ColorScheme`] 顏色為 [`ColorScheme.secondary`][`ColorScheme.secondary`]。若要更貼近最新的 Material Design 指南，則可以改用 `ColorScheme.primary`。如果需要對比色，請使用 [`ColorScheme.onSecondary`][`ColorScheme.onSecondary`]。

過去自訂元件（components）會查詢主題的 accentColor，現在可以改為查詢 `ColorScheme.secondary`。

遷移前的程式碼如下：

```dart
Color myColor = Theme.of(context).accentColor;
```

遷移後的程式碼：

```dart
Color myColor = Theme.of(context).colorScheme.secondary;
```

### `accentColorBrightness`

靜態的 [`ThemeData.estimateBrightnessForColor()`][`ThemeData.estimateBrightnessForColor()`] 方法可用來計算任意顏色的亮度。

### `accentTextTheme`

這在深色主題下是白色的 [`TextStyle`]，在淺色主題下則是黑色的 TextStyle。在大多數情況下，可以改用 textTheme。常見的寫法是從 accentTextTheme 取得其中一個 TextStyle，因為該文字樣式的顏色能確保與 accent color（現在為 `ColorScheme.secondaryColor`）有良好對比。
若要取得相同效果，請將 text style 的顏色指定為 `ColorScheme.onSecondary`：

遷移前的程式碼：

```dart
TextStyle style = Theme.of(context).accentTextTheme.headline1;
```

遷移後的程式碼：

```dart
final ThemeData theme = Theme.of(context);
TextStyle style = theme.textTheme.headline1.copyWith(
  color: theme.colorScheme.onSecondary,
)
```

### `accentIconTheme`

此屬性過去僅用於設定 [`FloatingActionButton`][`FloatingActionButton`] 內圖示的顏色。現在可以直接或透過 [`FloatingActionButtonThemeData`][`FloatingActionButtonThemeData`] 來設定圖示顏色。請參閱 [FloatingActionButton 與 ThemeData 的 accent 屬性][FloatingActionButton and ThemeData's accent properties]。

## 時程

合併於版本：2.3.0-0.1.pre<br>  
穩定版發佈：2.5

## 參考資料

API 文件：

* [`ColorScheme`][`ColorScheme`]
* [`FloatingActionButton`][`FloatingActionButton`]
* [`FloatingActionButtonThemeData`][`FloatingActionButtonThemeData`]
* [`TextStyle`][`TextStyle`]
* [`TextTheme`][`TextTheme`]
* [`Theme`][`Theme`]
* [`ThemeData`][`ThemeData`]

相關議題：

* [Issue #56918][Issue #56918]

相關 PR：

* [PR #81336][PR #81336]

其他：

* [Material Theme System Updates][Material Theme System Updates]


[accentColor]: {{site.api}}/flutter/material/ThemeData/accentColor.html
[accentColorBrightness]: {{site.api}}/flutter/material/ThemeData/accentColorBrightness.html
[accentIconTheme]: {{site.api}}/flutter/material/ThemeData/accentIconTheme.html
[accentTextTheme]: {{site.api}}/flutter/material/ThemeData/accentTextTheme.html
[`CheckboxTheme`]: {{site.api}}/flutter/material/CheckboxTheme-class.html
[color-scheme-prop]: {{site.api}}/flutter/material/ThemeData/colorScheme.html
[`colorScheme.onSecondary`]: {{site.api}}/flutter/material/ColorScheme/onSecondary.html
[`colorScheme.secondary`]: {{site.api}}/flutter/material/ColorScheme/secondary.html
[`ColorScheme`]: {{site.api}}/flutter/material/ColorScheme-class.html
[Issue #56918]: {{site.repo.flutter}}/issues/56918
[FloatingActionButton and ThemeData's accent properties]: /release/breaking-changes/fab-theme-data-accent-properties
[`FloatingActionButton`]: {{site.api}}/flutter/material/FloatingActionButton-class.html
[`FloatingActionButtonThemeData`]: {{site.api}}/flutter/material/FloatingActionButtonThemeData-class.html
[Material Design spec]: {{site.material}}/styles/color
[Material Theme System Updates]: /go/material-theme-system-updates
[secondary color]: {{site.api}}/flutter/material/ColorScheme/secondary.html
[onSecondary color]: {{site.api}}/flutter/material/ColorScheme/onSecondary.html
[PR #81336]: {{site.repo.flutter}}/pull/81336
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
[text-scheme-prop]: {{site.api}}/flutter/material/ThemeData/textTheme.html
[`TextTheme`]: {{site.api}}/flutter/material/TextTheme-class.html
[`Theme`]: {{site.api}}/flutter/material/Theme-class.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`ThemeData.estimateBrightnessForColor()`]: {{site.api}}/flutter/material/ThemeData/estimateBrightnessForColor.html
