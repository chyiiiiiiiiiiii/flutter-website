# Material 本地化字串的遷移指南

> ReorderableListView 的本地化字串已從 Material 本地化移至 Widgets 本地化。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`ReorderableListView` 的本地化字串已從
Material 本地化移至 Widgets 本地化。
這些字串在 Material 本地化中已被棄用。

## 背景

[`ReorderableListView`][] 使用這些字串來標註其語意動作（semantics actions）。
若要對 [`ReorderableList`][]
和 [`SliverReorderableList`][] 應用相同的標註，
它們需要從 Widgets 函式庫存取這些字串。

## 變更說明

[`MaterialLocalizations`][] 的字串
`reorderItemToStart`、`reorderItemToEnd`、`reorderItemUp`、
`reorderItemDown`、`reorderItemLeft` 和 `reorderItemRight` 已被棄用，
並由 [`WidgetsLocalizations`][] 中相同的字串取代。

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

* [PR 124711][]：將 material_localizations 中 ReorderableList 的字串標記為已淘汰。

[PR 124711]: https://github.com/flutter/flutter/pull/124711
[`ReorderableListView`]: https://api.flutter.dev/flutter/material/ReorderableListView-class.html
[`ReorderableList`]: https://api.flutter.dev/flutter/widgets/ReorderableList-class.html
[`SliverReorderableList`]: https://api.flutter.dev/flutter/widgets/SliverReorderableList-class.html
[`MaterialLocalizations`]: https://api.flutter.dev/flutter/material/MaterialLocalizations-class.html
[`WidgetsLocalizations`]: https://api.flutter.dev/flutter/widgets/WidgetsLocalizations-class.html

