# RouteSettings copyWith 遷移指南

> RouteSettings copyWith 移除與遷移方式




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`RouteSettings.copyWith` 方法已被移除，所有使用該方法的應用程式，需改為使用建構子來建立新的 `RouteSettings` 實例。

## 背景

隨著 [`Page`][] 類別的引入，`RouteSettings.copyWith` 已不再是一個可行的 API。

## 變更說明

`RouteSettings.copyWith` 已被移除

## 遷移指南

遷移前的程式碼：

```dart
RouteSettings newSettings = oldSettings.copyWith(name: 'new name');
```

遷移後的程式碼：

```dart
RouteSettings newSettings = RouteSettings(name: 'new name', arguments: oldSettings.arguments);
```

## 時程

合併於版本：3.5.0-9.0.pre-137-gc6f6095acd<br>
正式版釋出：3.7

## 參考資料

相關 PR：

* [PR 113860][]：移除 RouteSetting.copyWith。

[PR 113860]: https://github.com/flutter/flutter/pull/113860
[`Page`]: https://api.flutter.dev/flutter/widgets/Page-class.html

