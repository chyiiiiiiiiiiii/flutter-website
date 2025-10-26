---
title: Material 本地化字串的遷移指南
description: >
  ReorderableListView 的本地化字串已從
  Material 本地化移至 Widgets 本地化。
---

{% render docs/breaking-changes.md %}

## 摘要

`ReorderableListView` 的本地化字串已從
Material 本地化移至 Widgets 本地化。
這些字串在 Material 本地化中已被棄用。

## 背景

[`ReorderableListView`][`ReorderableListView`] 使用這些字串來標註其語意動作（semantics actions）。
若要對 [`ReorderableList`][`ReorderableList`]
和 [`SliverReorderableList`][`SliverReorderableList`] 應用相同的標註，
它們需要從 Widgets 函式庫存取這些字串。

## 變更說明

[`MaterialLocalizations`][`MaterialLocalizations`] 的字串
`reorderItemToStart`、`reorderItemToEnd`、`reorderItemUp`、
`reorderItemDown`、`reorderItemLeft` 和 `reorderItemRight` 已被棄用，
並由 [`WidgetsLocalizations`][`WidgetsLocalizations`] 中相同的字串取代。

## 遷移指南

如果你在程式碼中使用這些字串，
請改為從 `WidgetsLocalizations` 存取。

遷移前的程式碼：

```dart
MaterialLocalizations.of(context).reorderItemToStart;
```

遷移後的程式碼：

```dart
WidgetsLocalizations.of(context).reorderItemToStart;
```

如果你有覆寫 `MaterialLocalizations` 或 `WidgetsLocalizations`，
請務必將相關翻譯從 `MaterialLocalizations`
子類別中移除，並移至 `WidgetsLocalizations` 子類別。

遷移前的程式碼：

```dart
class MaterialLocalizationsMyLanguage extends MaterialLocalizationsEn {
  // ...
  @override
  String get reorderItemRight => 'my translation';
}
```

遷移後的程式碼：

```dart
class MaterialLocalizationsMyLanguage extends MaterialLocalizationsEn {
  // ...
}

class WidgetsLocalizationsMyLanguage extends WidgetsLocalizationsEn {
  // ...
  @override
  String get reorderItemRight => 'my translation';
}
```

## 時程

合併於版本：v3.10.0-2.0.pre<br>  
進入穩定版：3.13.0

## 參考資料

相關 PR：

* [PR 124711][PR 124711]：將 material_localizations 中 ReorderableList 的字串標記為已淘汰。

[PR 124711]: {{site.repo.flutter}}/pull/124711
[`ReorderableListView`]: {{site.api}}/flutter/material/ReorderableListView-class.html
[`ReorderableList`]: {{site.api}}/flutter/widgets/ReorderableList-class.html
[`SliverReorderableList`]: {{site.api}}/flutter/widgets/SliverReorderableList-class.html
[`MaterialLocalizations`]: {{site.api}}/flutter/material/MaterialLocalizations-class.html
[`WidgetsLocalizations`]: {{site.api}}/flutter/widgets/WidgetsLocalizations-class.html
