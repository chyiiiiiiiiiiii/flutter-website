# ThemeData 的 toggleableActiveColor 屬性已被棄用

> 使用 toggleableActiveColor 屬性的 Material 元件 (Widgets) 已遷移至使用 Material ColorScheme。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

Material 元件 (Widgets) `Switch`、`SwitchListTile`、`Checkbox`、
`CheckboxListTile`、`Radio`、`RadioListTile` 現在會為其可切換元件
使用 `ColorScheme.secondary` 顏色。
`ThemeData.toggleableActiveColor` 已被棄用，並且最終將會被移除。

## 背景

依賴於 `ThemeData.toggleableActiveColor` 的元件已遷移至 `ColorScheme.secondary`，
因此 `toggleableActiveColor` 屬性已不再需要。根據 Flutter 的
[棄用政策](/release/compatibility-policy#deprecation-policy)，此屬性最終將會被移除。

## 變更說明

原本使用 `ThemeData.toggleableActiveColor` 顏色來表示
啟用／選取狀態的元件，現在改為使用 `ColorScheme.secondary`。

## 遷移指南

可切換元件的啟用／選取顏色一般可透過以下三種方式自訂：

1. 使用 ThemeData 的 `ColorScheme.secondary`。
2. 使用元件主題 `SwitchThemeData`、`ListTileThemeData`、
   `CheckboxThemeData` 和 `RadioThemeData`。
3. 直接自訂元件的顏色屬性。

遷移前的程式碼：

```dart
MaterialApp(
  theme: ThemeData(toggleableActiveColor: myColor),
  // ...
);
```

遷移後的程式碼：

```dart
final ThemeData theme = ThemeData();
MaterialApp(
  theme: theme.copyWith(
    switchTheme: SwitchThemeData(
      thumbColor: MaterialStateProperty.resolveWith<Color?>(
          (Set<MaterialState> states) {
        if (states.contains(MaterialState.disabled)) {
          return null;
        }
        if (states.contains(MaterialState.selected)) {
          return myColor;
        }
        return null;
      }),
      trackColor: MaterialStateProperty.resolveWith<Color?>(
          (Set<MaterialState> states) {
        if (states.contains(MaterialState.disabled)) {
          return null;
        }
        if (states.contains(MaterialState.selected)) {
          return myColor;
        }
        return null;
      }),
    ),
    radioTheme: RadioThemeData(
      fillColor: MaterialStateProperty.resolveWith<Color?>(
          (Set<MaterialState> states) {
        if (states.contains(MaterialState.disabled)) {
          return null;
        }
        if (states.contains(MaterialState.selected)) {
          return myColor;
        }
        return null;
      }),
    ),
    checkboxTheme: CheckboxThemeData(
      fillColor: MaterialStateProperty.resolveWith<Color?>(
          (Set<MaterialState> states) {
        if (states.contains(MaterialState.disabled)) {
          return null;
        }
        if (states.contains(MaterialState.selected)) {
          return myColor;
        }
        return null;
      }),
    ),
  ),
  //...
)
```

## 時程

穩定版發佈於：3.7

## 參考資料

API 文件：

* [`ThemeData.toggleableActiveColor`][]
* [`ColorScheme.secondary`][]

相關議題：

* [`Switch` widget color doesn't use `ColorScheme`][]

相關 PR：

* [Deprecate `toggleableActiveColor`][]。

[`ThemeData.toggleableActiveColor`]: https://api.flutter.dev/flutter/material/ThemeData/toggleableActiveColor.html
[`ColorScheme.secondary`]: https://api.flutter.dev/flutter/material/ColorScheme/secondary.html
[`Switch` widget color doesn't use `ColorScheme`]: https://github.com/flutter/flutter/issues/93709
[Deprecate `toggleableActiveColor`]: https://github.com/flutter/flutter/pull/97972

