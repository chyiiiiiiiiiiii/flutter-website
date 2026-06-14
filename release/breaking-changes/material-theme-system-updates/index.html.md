# Material 主題系統更新

> `CardTheme`、`DialogTheme` 和 `TabBarTheme` 已經標準化，以遵循 Flutter 的 Material 函式庫中元件主題（component themes）的慣例。在 `ThemeData` 中，這些屬性的型別也已相應變更。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`CardTheme`、`DialogTheme` 和 `TabBarTheme` 已經重構，以符合 Flutter 元件主題（component themes）的慣例。`CardThemeData`、`DialogThemeData` 和 `TabBarThemeData` 已新增，用於定義元件視覺屬性的預設值覆寫。

在卡片主題（card theme）標準化過程中，`ThemeData.cardTheme` 的型別已變更為 `Object?`，以同時接受 `CardTheme` 和 `CardThemeData`，以便於破壞性變更的平滑過渡。相同的做法也用於 `dialogTheme` 和 `tabBarTheme`。

為了完成過渡並完全符合 `ThemeData` 的慣例，`ThemeData.cardTheme` 的型別已更改為 `CardThemeData?`；`ThemeData.dialogTheme` 的型別已更改為 `DialogThemeData?`；`ThemeData.tabBarTheme` 的型別已更改為 `TabBarThemeData?`。

## 遷移指南

先前，`ThemeData.cardTheme` 的型別為 `Object?`，可同時接受 `CardTheme` 和 `CardThemeData`。現在型別已變更為 `CardThemeData?`，如果有使用 `ThemeData.cardTheme`，則需要進行遷移。同樣地，`ThemeData.dialogTheme` 和 `ThemeData.tabBarTheme` 的型別也應分別遷移為 `DialogThemeData` 和 `TabBarThemeData`。

遷移前的程式碼：

```dart
final ThemeData theme = ThemeData(
    cardTheme: CardTheme(),
    dialogTheme: DialogTheme(),
    tabBarTheme: TabBarTheme(),
);
```

遷移後的程式碼：

```dart
final ThemeData theme = ThemeData(
    cardTheme: CardThemeData(),
    dialogTheme: DialogThemeData(),
    tabBarTheme: TabBarThemeData(),
);
```

## 時程

合併於版本：3.31.0-0.0.pre<br>
正式版釋出：3.32

## 參考資料

API 文件：

* [`ThemeData`][]
* [`CardTheme`][]
* [`DialogTheme`][]
* [`TabBarTheme`][]

相關 PR：

* [將 cardTheme、dialogTheme 和 tabBarTheme 的型別變更為 xxxThemeData][Change cardTheme, dialogTheme, and tabBarTheme type to xxxThemeData]

[Change cardTheme, dialogTheme, and tabBarTheme type to xxxThemeData]: https://github.com/flutter/flutter/pull/157292
[`ThemeData`]: https://api.flutter.dev/flutter/material/ThemeData-class.html
[`CardTheme`]: https://api.flutter.dev/flutter/material/CardTheme-class.html
[`DialogTheme`]: https://api.flutter.dev/flutter/material/DialogTheme-class.html
[`TabBarTheme`]: https://api.flutter.dev/flutter/material/TabBarTheme-class.html

