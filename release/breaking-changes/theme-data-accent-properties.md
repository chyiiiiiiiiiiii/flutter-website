# ThemeData 的 accent 屬性已被棄用

> ThemeData 的 accentColor、accentColorBrightness、accentIconTheme 與 accentTextTheme 屬性已被棄用。





:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

ThemeData 的 [accentColor][]、[accentColorBrightness][]、[accentIconTheme][]
以及 [accentTextTheme][] 屬性已被棄用。

[Material Design 規範][Material Design spec] 已不再為 Material 元件 (Material components) 指定或使用「accent」色彩。元件的預設顏色現在是根據整體主題的 [色彩方案 (color scheme)][color-scheme-prop] 推導而來。
`ColorScheme` 的 [secondary color][] 現在通常取代了
`accentColor`，而當需要對比色時則會使用 [onSecondary color][]。

## 背景說明

這是 [Material 主題系統更新][Material Theme System Updates] 專案中的一個小部分。

自 Flutter 1.17 起，ThemeData 的 accent 屬性（accentColor、accentColorBrightness、accentIconTheme 與 accentTextTheme）已不再被 Material 函式庫使用。這些屬性已被主題的 [`colorScheme`][color-scheme-prop] 和
[`textTheme`][text-scheme-prop] 屬性所取代，這也是讓 Material 元件 (Material components) 的預設設定幾乎完全依賴這兩個屬性的長期目標之一。

這些變更的動機是為了讓主題系統更容易理解與使用。所有元件的預設顏色將由元件自身根據色彩方案 (color scheme) 定義。特定元件類型的預設值可以透過像是 [`FloatingActionButtonThemeData`][] 或
[`CheckBoxTheme`][] 這類元件專屬主題來覆寫。過去，像 accentColor 這樣的屬性只會被少數元件類型在某些情境下使用，這讓覆寫這些屬性時的影響變得難以理解。

## 變更說明

ThemeData 的 accentColor、accentColorBrightness、accentIconTheme 與
accentTextTheme 屬性已被棄用，因為 Material 函式庫已不再使用這些屬性。

## 遷移指南

### 應用程式主題

[`ThemeData`][] 的設定現在不需要再指定 accentColor、accentColorBrightness、accentIconTheme 或 accentTextTheme。

若要以與過去大致相同的方式設定 Material 元件 (Material components) 的外觀，請改為指定色彩方案 (color scheme) 的 secondary color 來取代 accentColor。

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

最接近向後相容的 [`ColorScheme`][] 顏色是
[`ColorScheme.secondary`][]。若要最貼近最新的 Material Design 指南，可以改用 `ColorScheme.primary`。
如果需要對比色，請使用 [`ColorScheme.onSecondary`][]。

自訂元件（custom components）如果原本是查詢主題的 accentColor，現在可以改為查詢 `ColorScheme.secondary`。

遷移前的程式碼：

```dart
Color myColor = Theme.of(context).accentColor;
```

遷移後的程式碼：

```dart
Color myColor = Theme.of(context).colorScheme.secondary;
```

### `accentColorBrightness`

靜態的 [`ThemeData.estimateBrightnessForColor()`][] 方法可用於計算任何顏色的亮度。

### `accentTextTheme`

這在深色主題下是白色的 [`TextStyle`]，在淺色主題下則是黑色的 TextStyle。在大多數情況下，可以改用 textTheme。一個常見的寫法是從 accentTextTheme 參照某個 TextStyle，因為該文字樣式的顏色能保證與 accent color（強調色）有良好對比（現在為 `ColorScheme.secondaryColor`）。
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

此屬性過去僅用於設定 [`FloatingActionButton`][] 內圖示的顏色。現在可以直接設定圖示顏色，或透過 [`FloatingActionButtonThemeData`][] 來設定。詳見 [FloatingActionButton and ThemeData's accent properties][]。

## 時程

Landed in version: 2.3.0-0.1.pre<br>
In stable release: 2.5

## 參考資料

API 文件：

* [`ColorScheme`][]
* [`FloatingActionButton`][]
* [`FloatingActionButtonThemeData`][]
* [`TextStyle`][]
* [`TextTheme`][]
* [`Theme`][]
* [`ThemeData`][]

相關議題：

* [Issue #56918][]

相關 PR：

* [PR #81336][]

其他：

* [Material Theme System Updates][]


[accentColor]: https://pub.dev/documentation/material_ui/latest/material_ui/ThemeData/accentColor.html
[accentColorBrightness]: https://pub.dev/documentation/material_ui/latest/material_ui/ThemeData/accentColorBrightness.html
[accentIconTheme]: https://pub.dev/documentation/material_ui/latest/material_ui/ThemeData/accentIconTheme.html
[accentTextTheme]: https://pub.dev/documentation/material_ui/latest/material_ui/ThemeData/accentTextTheme.html
[`CheckboxTheme`]: https://pub.dev/documentation/material_ui/latest/material_ui/CheckboxTheme-class.html
[color-scheme-prop]: https://pub.dev/documentation/material_ui/latest/material_ui/ThemeData/colorScheme.html
[`colorScheme.onSecondary`]: https://pub.dev/documentation/material_ui/latest/material_ui/ColorScheme/onSecondary.html
[`colorScheme.secondary`]: https://pub.dev/documentation/material_ui/latest/material_ui/ColorScheme/secondary.html
[`ColorScheme`]: https://pub.dev/documentation/material_ui/latest/material_ui/ColorScheme-class.html
[Issue #56918]: https://github.com/flutter/flutter/issues/56918
[FloatingActionButton and ThemeData's accent properties]: /release/breaking-changes/fab-theme-data-accent-properties
[`FloatingActionButton`]: https://pub.dev/documentation/material_ui/latest/material_ui/FloatingActionButton-class.html
[`FloatingActionButtonThemeData`]: https://pub.dev/documentation/material_ui/latest/material_ui/FloatingActionButtonThemeData-class.html
[Material Design spec]: https://m3.material.io/styles/color
[Material Theme System Updates]: /go/material-theme-system-updates
[secondary color]: https://pub.dev/documentation/material_ui/latest/material_ui/ColorScheme/secondary.html
[onSecondary color]: https://pub.dev/documentation/material_ui/latest/material_ui/ColorScheme/onSecondary.html
[PR #81336]: https://github.com/flutter/flutter/pull/81336
[`TextStyle`]: https://api.flutter.dev/flutter/painting/TextStyle-class.html
[text-scheme-prop]: https://pub.dev/documentation/material_ui/latest/material_ui/ThemeData/textTheme.html
[`TextTheme`]: https://pub.dev/documentation/material_ui/latest/material_ui/TextTheme-class.html
[`Theme`]: https://pub.dev/documentation/material_ui/latest/material_ui/Theme-class.html
[`ThemeData`]: https://pub.dev/documentation/material_ui/latest/material_ui/ThemeData-class.html
[`ThemeData.estimateBrightnessForColor()`]: https://pub.dev/documentation/material_ui/latest/material_ui/ThemeData/estimateBrightnessForColor.html

