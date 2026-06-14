# 棄用 `ThemeData.indicatorColor`，改用 `TabBarThemeData.indicatorColor`

> `ThemeData.indicatorColor` 參數已被 `TabBarThemeData.indicatorColor` 取代。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

[`ThemeData.indicatorColor`][] 參數已被棄用，建議改用 [`TabBarThemeData.indicatorColor`][] 參數。

## 背景說明

[`TabBar`][] 元件 (Widget) 的預設值可以透過像 [`TabBarThemeData`][] 這樣的元件專屬主題（component-specific theme）來覆寫。
過去，`ThemeData.indicatorColor` 參數用於在 Material Design 2 中覆寫預設的分頁列指示器顏色，但這個功能已被 [`TabBarThemeData`][] 取代，因此變得多餘。

## 變更說明

[`ThemeData.indicatorColor`][] 已被棄用，建議改用元件專屬主題。
請使用 [`TabBarThemeData`][] 來覆寫預設的指示器顏色。

## 遷移指南

當 [`ThemeData.useMaterial3`][] 旗標（flag）設為 `false` 時，請將 [`ThemeData.indicatorColor`][] 替換為 [`TabBarThemeData.indicatorColor`][]，以覆寫預設的分頁列指示器顏色。

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

Landed in version: 3.30.0-0.0.pre<br>
In stable release: 3.32

## 參考資料

API 文件：

- [`ThemeData.indicatorColor`][]
- [`ThemeData.useMaterial3`][]
- [`TabBarThemeData.indicatorColor`][]
- [`TabBarThemeData`][]
- [`TabBar`][]

相關議題：

- [Issue #91772][]

相關 PR：

- [Deprecate `ThemeData.indicatorColor` in favor of `TabBarThemeData.indicatorColor`][]

[`ThemeData.indicatorColor`]: https://api.flutter.dev/flutter/material/ThemeData/indicatorColor.html
[`ThemeData.useMaterial3`]: https://api.flutter.dev/flutter/material/ThemeData/useMaterial3.html
[`TabBarThemeData.indicatorColor`]: https://api.flutter.dev/flutter/material/TabBarThemeData/indicatorColor.html
[`TabBarThemeData`]: https://api.flutter.dev/flutter/material/TabBarThemeData-class.html
[`TabBar`]: https://api.flutter.dev/flutter/material/TabBar-class.html
[Issue #91772]: https://github.com/flutter/flutter/issues/91772
[Deprecate `ThemeData.indicatorColor` in favor of `TabBarThemeData.indicatorColor`]: https://github.com/flutter/flutter/pull/160024

