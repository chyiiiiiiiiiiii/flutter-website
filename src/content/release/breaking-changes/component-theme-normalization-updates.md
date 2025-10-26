---
title: 元件主題正規化更新
description: >-
  `AppBarTheme`、`BottomAppBarTheme` 和 `InputDecorationTheme` 已正規化，以遵循 Flutter 在 Material 函式庫中對元件主題的慣例。
---

{% render docs/breaking-changes.md %}

## 摘要

`AppBarTheme`、`BottomAppBarTheme` 和 `InputDecorationTheme` 已經重構，以符合 Flutter 對元件主題的慣例。
`AppBarThemeData`、`BottomAppBarThemeData` 和 `InputDecorationThemeData` 已新增，用於定義元件視覺屬性預設值的覆寫。
Flutter 的版本持續對這類元件主題進行正規化，以便在 Material 函式庫中帶來更一致的主題化（theming）體驗。

## 遷移指南

在 `ThemeData` 中：
- `appBarTheme` 屬性的型別已從 `AppBarTheme` 變更為 `AppBarThemeData`。
- `bottomAppBarTheme` 屬性的型別已從 `BottomAppBarTheme` 變更為 `BottomAppBarThemeData`。
- `inputDecorationTheme` 屬性的型別已從 `InputDecorationTheme` 變更為 `InputDecorationThemeData`。

元件主題的 `xTheme.of()` 方法和 `Theme.of().xTheme` 的回傳型別也已變更為 `xThemeData`。

在 `DatePickerThemeData` 和 `TimePickerThemeData` 中，`inputDecorationTheme` 屬性的型別已從 `InputDecorationTheme` 變更為 `InputDecorationThemeData`。

遷移前的程式碼：

```dart
final AppBarTheme appBarTheme = Theme.of(context).appBarTheme;
final AppBarTheme appBarTheme = AppBarTheme.of(context);

final BottomAppBarTheme bottomAppBarTheme = Theme.of(context).bottomAppBarTheme;
final BottomAppBarTheme bottomAppBarTheme = BottomAppBarTheme.of(context);

final InputDecorationTheme inputDecorationTheme = Theme.of(context).inputDecorationTheme;
final InputDecorationTheme inputDecorationTheme = InputDecorationTheme.of(context);
final InputDecorationTheme inputDecorationTheme = Theme.of(context).datePickerTheme.inputDecorationTheme;
final InputDecorationTheme inputDecorationTheme = Theme.of(context).timePickerTheme.inputDecorationTheme;
```

```dart
final ThemeData theme = ThemeData(
  appBarTheme: AppBarTheme(),
  bottomAppBarTheme: BottomAppBarTheme(),
  inputDecorationTheme: InputDecorationTheme(),
);

final ThemeData theme = ThemeData().copyWith(
  appBarTheme: AppBarTheme(),
  bottomAppBarTheme: BottomAppBarTheme(),
  inputDecorationTheme: InputDecorationTheme(),
);

const DatePickerThemeData datePickerTheme = DatePickerThemeData(inputDecorationTheme: InputDecorationTheme());
const TimePickerThemeData timePickerTheme = TimePickerThemeData(inputDecorationTheme: InputDecorationTheme());
```

遷移後的程式碼：

```dart
final AppBarThemeData appBarTheme = Theme.of(context).appBarTheme;
final AppBarThemeData appBarTheme = AppBarTheme.of(context);

final BottomAppBarThemeData bottomAppBarTheme = Theme.of(context).bottomAppBarTheme;
final BottomAppBarThemeData bottomAppBarTheme = BottomAppBarTheme.of(context);

final InputDecorationThemeData inputDecorationTheme = Theme.of(context).inputDecorationTheme;
final InputDecorationThemeData inputDecorationTheme = InputDecorationTheme.of(context);
final InputDecorationThemeData inputDecorationTheme = Theme.of(context).datePickerTheme.inputDecorationTheme;
final InputDecorationThemeData inputDecorationTheme = Theme.of(context).timePickerTheme.inputDecorationTheme;
```

```dart
final ThemeData theme = ThemeData(
  appBarTheme: AppBarThemeData(),
  bottomAppBarTheme: BottomAppBarThemeData(),
  inputDecorationTheme: InputDecorationThemeData(),
);

final ThemeData theme = ThemeData().copyWith(
  appBarTheme: AppBarThemeData(),
  bottomAppBarTheme: BottomAppBarThemeData(),
  inputDecorationTheme: InputDecorationThemeData(),
);

const DatePickerThemeData datePickerTheme = DatePickerThemeData(inputDecorationTheme: InputDecorationThemeData());
const TimePickerThemeData timePickerTheme = TimePickerThemeData(inputDecorationTheme: InputDecorationThemeData());
```

## 時程

納入版本：3.33.0-1.0.pre 至 3.35.0-0.0.pre<br>  
穩定版發佈：3.35

## 參考資料

API 文件：

* [`AppBarTheme`][`AppBarTheme`]
* [`BottomAppBarTheme`][`BottomAppBarTheme`]
* [`InputDecorationTheme`][`InputDecorationTheme`]

相關 PR：

* [Normalize ThemeData.appBarTheme][Normalize ThemeData.appBarTheme]
* [Normalize ThemeData.bottomAppBarTheme][Normalize ThemeData.bottomAppBarTheme]
* [Normalize InputDecorationTheme][Normalize InputDecorationTheme]
* [Apply normalization to TimePickerThemeData.inputDecorationTheme][Apply normalization to TimePickerThemeData.inputDecorationTheme]

[`AppBarTheme`]: {{site.api}}/flutter/material/AppBarTheme-class.html
[Normalize ThemeData.appBarTheme]: {{site.repo.flutter}}/pull/169130
[`BottomAppBarTheme`]: {{site.api}}/flutter/material/BottomAppBarTheme-class.html
[Normalize ThemeData.bottomAppBarTheme]: {{site.repo.flutter}}/pull/168586
[`InputDecorationTheme`]: {{site.api}}/flutter/material/InputDecorationTheme-class.html
[Normalize InputDecorationTheme]: {{site.repo.flutter}}/pull/168981
[Apply normalization to TimePickerThemeData.inputDecorationTheme]: {{site.repo.flutter}}/pull/171584

