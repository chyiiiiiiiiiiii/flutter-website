---
title: 為 Material 3 引入全新 ColorScheme 角色
description: >-
  `ColorScheme` 引入了新的顏色角色，
  以更好地符合 Material Design 3。
  `ColorScheme.fromSeed` 方法也已更新，
  以支援新加入的顏色。
---

{% render docs/breaking-changes.md %}

## 摘要

`ColorScheme` 中新增的顏色角色包含
七種基於色調的表面（surface）與容器（container），以及
主色（primary）、次色（secondary）、第三色（tertiary）群組的十二種強調色（accent colors）。
此次更新也棄用了三個現有的顏色角色：
`background`、`onBackground` 和 `surfaceVariant`。
經由更新後的 `ColorScheme.fromSeed` 方法所建構的 `ColorScheme`
現在會產生與先前版本不同的值，
以符合 Material Design 3 的設計指引。

## 背景

基於色調的表面顏色包括：

- `surfaceBright`
- `surfaceDim`
- `surfaceContainer`
- `surfaceContainerLow`
- `surfaceContainerLowest`
- `surfaceContainerHigh`
- `surfaceContainerHighest`

這些變更有助於消除元件（Widgets）`surfaceTintColor` 的使用，
並取代舊有的透明度模型，
該模型會根據元件的高度（elevation）在表面上套用帶色彩的覆蓋層。

所有元件（Widgets）的預設 `surfaceTintColor` 現在為 `null`，
其預設背景顏色也改為基於新的色調表面顏色。

`ColorScheme.fromSeed` 也已更新，採用 [Material color utilities][Material color utilities] 套件的最新演算法。
此變更可避免建構出的 `ColorScheme` 過於明亮，
即使來源顏色本身很亮且具有高彩度（即幾乎不含黑、白及灰階）。

[Material color utilities]: {{site.pub-pkg}}/material_color_utilities

## 遷移指南

由於更新後的 `ColorScheme.fromSeed` 及新顏色角色所造成的差異應該很小且可接受。
但若在 `ColorScheme.fromSeed` 提供較亮的種子顏色時，
可能會產生相對較暗版本的 `ColorScheme`。
若希望輸出仍然保持明亮，
請在 `ColorScheme.fromSeed` 中設定 `dynamicSchemeVariant: DynamicSchemeVariant.fidelity`。例如：

遷移前的程式碼：

```dart
ColorScheme.fromSeed(
    seedColor: Color(0xFF0000FF), // Bright blue
)
```

遷移後的程式碼：

```dart
ColorScheme.fromSeed(
    seedColor: Color(0xFF0000FF), // Bright blue
    dynamicSchemeVariant: DynamicSchemeVariant.fidelity,
)
```

Material Design 3 移除了 3 種顏色。

若要設定 Material 元件 (Material components) 的外觀，
`background` 應替換為 `surface`，
`onBackground` 應替換為 `onSurface`，
`surfaceVariant` 則應遷移至 `surfaceContainerHighest`。

遷移前的程式碼：

```dart
final ColorScheme colorScheme = ColorScheme();
MaterialApp(
  theme: ThemeData(
    //...
    colorScheme: colorScheme.copyWith(
      background: myColor1,
      onBackground: myColor2,
      surfaceVariant: myColor3,
    ),
  ),
  //...
)
```

遷移後的程式碼：

```dart
final ColorScheme colorScheme = ColorScheme();
MaterialApp(
  theme: ThemeData(
    //...
    colorScheme: colorScheme.copyWith(
      surface: myColor1,
      onSurface: myColor2,
      surfaceContainerHighest: myColor3,
    ),
  ),
  //...
)
```

先前自訂元件（Widget）會查找 `ColorScheme.background`、`ColorScheme.onBackground` 和 `ColorScheme.surfaceVariant`，現在可以改為查找 `ColorScheme.surface`、`ColorScheme.onSurface` 和 `ColorScheme.surfaceContainerHighest`。

遷移前的程式碼：

```dart
Color myColor1 = Theme.of(context).colorScheme.background;
Color myColor2 = Theme.of(context).colorScheme.onBackground;
Color myColor3 = Theme.of(context).colorScheme.surfaceVariant;
```

遷移後的程式碼：

```dart
Color myColor1 = Theme.of(context).colorScheme.surface;
Color myColor2 = Theme.of(context).colorScheme.onSurface;
Color myColor3 = Theme.of(context).colorScheme.surfaceContainerHighest;
```

## 時程

合併於版本：3.21.0-4.0.pre<br>  
進入穩定版：3.22.0

## 參考資料

相關議題：

* [Support tone-based surface and surface container ColorScheme roles][Support tone-based surface and surface container ColorScheme roles]
* [Support fidelity variant for ColorScheme.fromSeed][Support fidelity variant for ColorScheme.fromSeed]

相關 PR：

* [Introduce tone-based surfaces and accent color add-ons - Part 1][Introduce tone-based surfaces and accent color add-ons - Part 1]
* [Introduce tone-based surfaces and accent color add-ons - Part 2][Introduce tone-based surfaces and accent color add-ons - Part 2]
* [Enhance ColorScheme.fromSeed with a new variant parameter][Enhance ColorScheme.fromSeed with a new variant parameter]

[Support tone-based surface and surface container ColorScheme roles]: {{site.repo.flutter}}/issues/115912
[Support fidelity variant for ColorScheme.fromSeed]: {{site.repo.flutter}}/issues/144649
[Introduce tone-based surfaces and accent color add-ons - Part 1]: {{site.repo.flutter}}/pull/142654
[Introduce tone-based surfaces and accent color add-ons - Part 2]: {{site.repo.flutter}}/pull/144273
[Enhance ColorScheme.fromSeed with a new variant parameter]: {{site.repo.flutter}}/pull/144805
