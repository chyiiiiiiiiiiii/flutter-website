---
title: ThemeData 的 toggleableActiveColor 屬性已被棄用
description: >
  使用 toggleableActiveColor 屬性的 Material 元件 (Widgets)
  已遷移至使用 Material ColorScheme。
---

{% render docs/breaking-changes.md %}

## 摘要

Material 元件 (Widgets) `Switch`、`SwitchListTile`、`Checkbox`、
`CheckboxListTile`、`Radio`、`RadioListTile` 現在會為其可切換元件
使用 `ColorScheme.secondary` 顏色。
`ThemeData.toggleableActiveColor` 已被棄用，未來將會移除。

## 背景說明

依賴 `ThemeData.toggleableActiveColor` 的元件遷移至 `ColorScheme.secondary`
後，使得 `toggleableActiveColor` 屬性變得不再需要。根據 Flutter 的
[棄用政策](/release/compatibility-policy#deprecation-policy)，此屬性未來將會被移除。

## 變更說明

原本使用 `ThemeData.toggleableActiveColor` 顏色作為
啟用／選取狀態的元件，現在改為使用 `ColorScheme.secondary`。

## 遷移指南

可切換元件的啟用／選取顏色，通常有三種自訂方式：

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

穩定版本推出：3.7

## 參考資料

API 文件：

* [`ThemeData.toggleableActiveColor`][`ThemeData.toggleableActiveColor`]
* [`ColorScheme.secondary`][`ColorScheme.secondary`]

相關議題：

* [`Switch` widget color doesn't use `ColorScheme`][`Switch` widget color doesn't use `ColorScheme`]

相關 PR：

* [Deprecate `toggleableActiveColor`][Deprecate `toggleableActiveColor`]。

[`ThemeData.toggleableActiveColor`]: {{site.api}}/flutter/material/ThemeData/toggleableActiveColor.html
[`ColorScheme.secondary`]: {{site.api}}/flutter/material/ColorScheme/secondary.html
[`Switch` widget color doesn't use `ColorScheme`]: {{site.repo.flutter}}/issues/93709
[Deprecate `toggleableActiveColor`]: {{site.repo.flutter}}/pull/97972
