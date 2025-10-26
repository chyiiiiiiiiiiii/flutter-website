---
title: 為 Material 3 引入新的 ColorScheme 角色
description: >-
  `ColorScheme` 新增了新的顏色角色，
  以更好地符合 Material Design 3。
  `ColorScheme.fromSeed` 方法也已更新，
  支援新加入的顏色。
---

{% render docs/breaking-changes.md %}

## 摘要

`ColorScheme` 中的新顏色角色包含
七種以色調為基礎的表面與容器，以及十二種用於
primary、secondary 和 tertiary 群組的強調色（accent colors）。
此更新將淘汰三個現有的顏色角色：
`background`、`onBackground` 和 `surfaceVariant`。
經由更新後的 `ColorScheme.fromSeed` 方法所建構的 `ColorScheme`，
現在會產生與先前版本不同的值，
以符合 Material Design 3 的指引。

## 背景

以色調為基礎的表面顏色包括：

- `surfaceBright`
- `surfaceDim`
- `surfaceContainer`
- `surfaceContainerLow`
- `surfaceContainerLowest`
- `surfaceContainerHigh`
- `surfaceContainerHighest`

這些變更有助於移除元件（Widgets）中的 `surfaceTintColor`，
並取代舊有的透明度模型，
即根據元件的高程（elevation）在表面上疊加色調覆蓋層的做法。

所有元件（Widgets）的預設 `surfaceTintColor` 現在為 `null`，
而其預設背景顏色則改為
以新的色調型表面顏色為基礎。

`ColorScheme.fromSeed` 也已更新，採用 [Material color utilities][Material color utilities] 套件的最新演算法。
此變更可避免建構出的 `ColorScheme` 過於明亮，
即使來源顏色看起來很亮且
具有高色度（幾乎不含黑、白及灰階）。

[Material color utilities]: {{site.pub-pkg}}/material_color_utilities

## 遷移指南

因更新後的 `ColorScheme.fromSeed` 及
新顏色角色所造成的差異應屬輕微且可接受。
然而，當你在 `ColorScheme.fromSeed` 提供較亮的種子顏色時，
可能會建構出相對較暗的 `ColorScheme` 版本。
若要強制輸出仍然保持明亮，
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
應將 `background` 替換為 `surface`，
`onBackground` 替換為 `onSurface`，
並將 `surfaceVariant` 遷移至 `surfaceContainerHighest`。

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

自訂元件（Custom components）如果之前是查找 `ColorScheme.background`、`ColorScheme.onBackground` 和 `ColorScheme.surfaceVariant`，現在可以改為查找 `ColorScheme.surface`、`ColorScheme.onSurface` 和 `ColorScheme.surfaceContainerHighest`。

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

導入版本：3.21.0-4.0.pre<br>  
穩定版釋出：3.22.0

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
