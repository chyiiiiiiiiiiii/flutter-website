---
title: Flutter 中的 Material 3 標記（tokens）更新
description: >-
  最新的 Material Design 3 標記（v6.1）已套用至
  Flutter 的 Material 函式庫。
---

{% render docs/breaking-changes.md %}

## 摘要

Material Design 標記（tokens）更新了
4 種色彩角色在淺色模式（light mode）下的對應關係，
讓視覺效果更加美觀，同時保有可存取性的對比度。
測試結果顯示，此變更在 Flutter 中屬於[非破壞性][non-breaking]，
但部分使用者可能會注意到這些細微的變化。
這次更新影響了以下色彩屬性：

* `onPrimaryContainer`（Primary10 變更為 Primary30）
* `onSecondaryContainer`（Secondary10 變更為 Secondary30）
* `onTertiaryContainer`（Tertiary10 變更為 Tertiary30）
* `onErrorContainer`（Error10 變更為 Error30）

使用這些角色作為預設值的元件（Widgets），
外觀可能會有所不同。

此外，Material 3 標記也將 chip 元件的邊框顏色
從 `ColorScheme.outline` 更新為 `ColorScheme.outlineVariant`，
以提升 chip 與按鈕之間的視覺層級。
使用 chip 邊框標記的 chip（`Chip`、`ActionChip`、`ChoiceChip`、`FilterChip` 和 `InputChip`），
外觀也可能會有所不同。

## 移轉指南

色彩角色對應的差異非常細微。
若需還原為原本的預設顏色，請使用 `ColorScheme.copyWith`：

移轉前的程式碼：

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

套用 token 更新後，
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
正式版發佈於：3.27

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
