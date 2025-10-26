---
title: Flutter 中的 Material 3 標記（tokens）更新
description: >-
  最新的 Material Design 3 標記（v6.1）已套用至
  Flutter 的 Material 函式庫。
---

{% render docs/breaking-changes.md %}

## 摘要

Material Design 標記（tokens）更新了在亮色模式下
4 個顏色角色的對應關係，使其在保有可及性對比的同時，
視覺上更具吸引力。
測試結果顯示這項變更在 Flutter 中屬於[非破壞性][non-breaking]，
但部分使用者可能會注意到這項細微的變化。
這次更新影響了以下顏色屬性：

* `onPrimaryContainer`（Primary10 變更為 Primary30）
* `onSecondaryContainer`（Secondary10 變更為 Secondary30）
* `onTertiaryContainer`（Tertiary10 變更為 Tertiary30）
* `onErrorContainer`（Error10 變更為 Error30）

那些以這些角色作為預設值的元件（Widgets），
外觀可能會有所不同。

此外，Material 3 標記也將 chip 元件的邊框顏色
從 `ColorScheme.outline` 更新為 `ColorScheme.outlineVariant`，
以提升 chip 與按鈕之間的視覺階層。
使用 chip 邊框標記的 chips（`Chip`、`ActionChip`、`ChoiceChip`、`FilterChip` 和 `InputChip`）
外觀也可能有所不同。

## 遷移指南

這些顏色角色對應的差異很小。
若需回復至原本的預設顏色，請使用 `ColorScheme.copyWith`：

遷移前的程式碼：

```dart
final ColorScheme colors = ThemeData().colorScheme;
```

遷移後的程式碼：

```dart
final ColorScheme colors = ThemeData().colorScheme.copyWith(
  onPrimaryContainer: const Color(0xFF21005D),
  onSecondaryContainer: const Color(0xFF1D192B),
  onTertiaryContainer: const Color(0xFF31111D),
  onErrorContainer: const Color(0xFF410E0B),
);
```

在套用 token 更新後，
M3 chips（Material 3 晶片）的預設邊框顏色看起來會變得較淺。
以 `ActionChip` 為例：

遷移前的程式碼：

```dart
final chip = ActionChip(
  label: const Text('action chip'),
  onPressed: () {},
);
```

遷移後的程式碼：

```dart
final chip = ChipTheme(
  data: ChipThemeData(
    side: BorderSide(
      color: Theme.of(context).colorScheme.outline
    ),
  ),
  child: ActionChip(
    label: const Text('action chip'), 
    onPressed: () {}
  )
);
```

## 時程

已於版本：3.26.0-0.0.pre<br>
正式版釋出：3.27

## 參考資料

API 文件：

* [`ColorScheme`][`ColorScheme`]
* [`ThemeData`][`ThemeData`]
* [`Chip`][`Chip`]

相關 PR：

* [Update tokens to v5.0.0][Update tokens to v5.0.0]
* [Update tokens to v6.1.0][Update tokens to v6.1.0]

[`ColorScheme`]: {{site.api}}/flutter/material/ColorScheme-class.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`Chip`]: {{site.api}}/flutter/material/Chip-class.html
[Update tokens to v5.0.0]: {{site.repo.flutter}}/pull/153385
[Update tokens to v6.1.0]: {{site.repo.flutter}}/pull/153722
[non-breaking]: {{site.repo.flutter}}/flutter/blob/master/docs/contributing/Tree-hygiene.md#1-determine-if-your-change-is-a-breaking-change
