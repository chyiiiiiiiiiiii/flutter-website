# 棄用 `ThemeData.dialogBackgroundColor`，改用 `DialogThemeData.backgroundColor`

> `ThemeData.dialogBackgroundColor` 參數已被 `DialogThemeData.backgroundColor` 取代。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

[`ThemeData.dialogBackgroundColor`][] 參數已被棄用，建議改用
[`DialogThemeData.backgroundColor`][] 參數。

## 背景說明

[`Dialog`][] 與 [`AlertDialog`][] 元件 (Widget) 的預設值可以透過像
[`DialogThemeData`][] 這樣的元件專屬主題（component-specific theme）來覆寫。
過去，會使用 `ThemeData.dialogBackgroundColor` 參數來覆寫對話框的預設背景顏色，
但這個作法已因 [`DialogThemeData`][] 而變得多餘。

## 變更說明

[`ThemeData.dialogBackgroundColor`][] 已被棄用，建議改用元件專屬主題
（component-specific theme）。如需覆寫預設背景顏色，請使用 [`DialogThemeData`][]。

## 遷移指南

如需覆寫對話框的預設背景顏色，請將 [`ThemeData.dialogBackgroundColor`][]
替換為 [`DialogThemeData.backgroundColor`][]。

遷移前的程式碼：

```dart
theme: ThemeData(
  dialogBackgroundColor: Colors.orange,
),
```

遷移後的程式碼：

```dart
theme: ThemeData(
  dialogTheme: const DialogThemeData(backgroundColor: Colors.orange),
),
```

## 時程

合併於版本：3.28.0-0.1.pre<br>
穩定版釋出：3.29

## 參考資料

API 文件：

- [`ThemeData.dialogBackgroundColor`][]
- [`DialogThemeData.backgroundColor`][]
- [`DialogThemeData`][]
- [`Dialog`][]
- [`AlertDialog`][]

相關議題：

- [Issue #91772][]

相關 PR：

- [Deprecate `ThemeData.dialogBackgroundColor` in favor of `DialogTheme.backgroundColor`][]

[`ThemeData.dialogBackgroundColor`]: https://api.flutter.dev/flutter/material/ThemeData/dialogBackgroundColor.html
[`DialogThemeData.backgroundColor`]: https://api.flutter.dev/flutter/material/DialogThemeData/backgroundColor.html
[`DialogThemeData`]: https://api.flutter.dev/flutter/material/DialogThemeData-class.html
[`Dialog`]: https://api.flutter.dev/flutter/material/Dialog-class.html
[`AlertDialog`]: https://api.flutter.dev/flutter/material/AlertDialog-class.html
[Issue #91772]: https://github.com/flutter/flutter/issues/91772
[Deprecate `ThemeData.dialogBackgroundColor` in favor of `DialogTheme.backgroundColor`]: https://github.com/flutter/flutter/pull/155072

