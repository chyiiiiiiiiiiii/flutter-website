---
title: 元件主題正規化
description: >-
  `CardTheme`、`DialogTheme` 和 `TabBarTheme` 已正規化，以遵循 Flutter 在 Material 函式庫中對元件主題的慣例。
---

{% render docs/breaking-changes.md %}

## 摘要

`CardTheme`、`DialogTheme` 和 `TabBarTheme` 已重構，以符合 Flutter 對元件主題的慣例。
`CardThemeData`、`DialogThemeData` 和 `TabBarThemeData` 已新增，用於定義元件視覺屬性的預設值覆寫。
Flutter 的發行版本會持續對這類元件主題進行正規化，以在 Material 函式庫中帶來更一致的主題化體驗。

## 遷移指南

在 `ThemeData` 中：

- `cardTheme` 屬性的型別已從 `CardTheme` 變更為 `CardThemeData`。
- `dialogTheme` 屬性的型別已從 `DialogTheme` 變更為 `DialogThemeData`。
- `tabBarTheme` 屬性的型別已從 `TabBarTheme` 變更為 `TabBarThemeData`。

元件主題 `xTheme.of()` 方法與 `Theme.of().xTheme` 的回傳型別也已相應變更為 `xThemeData`。

遷移前的程式碼：

```dart
final CardTheme cardTheme = Theme.of(context).cardTheme;
final CardTheme cardTheme = CardTheme.of(context);

final DialogTheme dialogTheme = Theme.of(context).dialogTheme;
final DialogTheme dialogTheme = DialogTheme.of(context);

final TabBarTheme tabBarTheme = Theme.of(context).tabBarTheme;
final TabBarTheme tabBarTheme = TabBarTheme.of(context);
```

遷移後的程式碼：

```dart
final CardThemeData cardTheme = Theme.of(context).cardTheme;
final CardThemeData cardTheme = CardTheme.of(context);

final DialogThemeData dialogTheme = Theme.of(context).dialogTheme;
final DialogThemeData dialogTheme = DialogTheme.of(context);

final TabBarThemeData tabBarTheme = Theme.of(context).tabBarTheme;
final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
```

## 時程

合併於版本：3.27.0-0.0.pre<br>  
穩定版本：3.27

## 參考資料

API 文件：

* [`ThemeData`][`ThemeData`]
* [`CardTheme`][`CardTheme`]
* [`DialogTheme`][`DialogTheme`]
* [`TabBarTheme`][`TabBarTheme`]

相關 PR：

* [Normalize ThemeData.cardTheme][Normalize ThemeData.cardTheme]
* [Normalize ThemeData.dialogTheme][Normalize ThemeData.dialogTheme]
* [Normalize ThemeData.tabBarTheme][Normalize ThemeData.tabBarTheme]

[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`CardTheme`]: {{site.api}}/flutter/material/CardTheme-class.html
[`DialogTheme`]: {{site.api}}/flutter/material/DialogTheme-class.html
[`TabBarTheme`]: {{site.api}}/flutter/material/TabBarTheme-class.html
[Normalize ThemeData.cardTheme]: {{site.repo.flutter}}/pull/153254
[Normalize ThemeData.dialogTheme]: {{site.repo.flutter}}/pull/155129
[Normalize ThemeData.tabBarTheme]: {{site.repo.flutter}}/pull/156253
