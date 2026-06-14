# 元件主題正規化

> `CardTheme`、`DialogTheme` 和 `TabBarTheme` 已正規化，以遵循 Flutter 在 Material 函式庫中對元件主題 (Component Theme) 的慣例。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


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

* [`ThemeData`][]
* [`CardTheme`][]
* [`DialogTheme`][]
* [`TabBarTheme`][]

相關 PR：

* [Normalize ThemeData.cardTheme][]
* [Normalize ThemeData.dialogTheme][]
* [Normalize ThemeData.tabBarTheme][]

[`ThemeData`]: https://api.flutter.dev/flutter/material/ThemeData-class.html
[`CardTheme`]: https://api.flutter.dev/flutter/material/CardTheme-class.html
[`DialogTheme`]: https://api.flutter.dev/flutter/material/DialogTheme-class.html
[`TabBarTheme`]: https://api.flutter.dev/flutter/material/TabBarTheme-class.html
[Normalize ThemeData.cardTheme]: https://github.com/flutter/flutter/pull/153254
[Normalize ThemeData.dialogTheme]: https://github.com/flutter/flutter/pull/155129
[Normalize ThemeData.tabBarTheme]: https://github.com/flutter/flutter/pull/156253

