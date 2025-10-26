---
title: Navigator 的 page API 重大變更
description: >-
  將 Navigator 的 `onPopPage` 屬性替換為 `onDidRemovePage` 屬性。
---

{% render docs/breaking-changes.md %}

## 摘要

[`Navigator`][`Navigator`] page API 已經重構，以便能與 Flutter 其他的 pop 機制整合。

## 背景

`onPopPage` 屬性原本是為了在頁面即將被 pop 時進行清理而新增的。
若要否決 pop，可以在回呼中回傳 `false`。
但這種方式與框架中其他 pop 機制（例如 [`PopScope`][`PopScope`] 以及 iOS 返回手勢）並不兼容。

為了整合框架的 pop 機制，page API 需要進行重構。

## 變更說明

`onDidRemovePage` 屬性取代了 `onPopPage` 屬性。
你無法再於 `onDidRemovePage` 屬性中否決 pop。
相反地，你現在只需負責更新 [`pages`][`pages`]。

否決 pop 的機制現由 `Page.canPop` 與 `Page.onPopInvoked` 屬性管理。
這些屬性的運作方式類似於你使用 `PopScope` 元件時的行為。

[`pages`]: {{site.api}}/flutter/widgets/Navigator/pages.html

## 遷移指南

遷移前的程式碼：

```dart
import 'package:flutter/material.dart';

final MaterialPage<void> page1 = MaterialPage<void>(child: Placeholder());
final MaterialPage<void> page2 = MaterialPage<void>(child: Placeholder());
final MaterialPage<void> page3 = MaterialPage<void>(child: Placeholder());

void main() {
  final List<Page<void>> pages = <Page<void>>[page1, page2, page3];
  runApp(
    MaterialApp(
      home: Navigator(
        pages: pages,
        onPopPage: (Route<Object?> route, Object? result) {
          if (route.settings == page2) {
            return false;
          }
          if (route.didPop) {
            pages.remove(route.settings);
            return true;
          }
          return false;
        },
      ),
    ),
  );
}
```

遷移後的程式碼：

```dart
import 'package:flutter/material.dart';

final MaterialPage<void> page1 = MaterialPage<void>(child: Placeholder());
final MaterialPage<void> page2 = MaterialPage<void>(canPop: false, child: Placeholder());
final MaterialPage<void> page3 = MaterialPage<void>(child: Placeholder());

void main() {
  final List<Page<void>> pages = <Page<void>>[page1, page2, page3];
  runApp(
    MaterialApp(
      home: Navigator(
        pages: pages,
        onDidRemovePage: (Page<Object?> page) {
          pages.remove(page);
        },
      ),
    ),
  );
}
```

## 時程

合併於版本：3.22.0-32.0.pre<br>  
正式發行版本：3.24.0

## 參考資料

API 文件：

* [`Navigator`][`Navigator`]
* [`PopScope`][`PopScope`]

相關議題：

* [Issue 137458][Issue 137458]

相關 PR：

* [Refactors page API][Refactors page API]

[Refactors page API]: {{site.repo.flutter}}/pull/137792
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`PopScope`]: {{site.api}}/flutter/widgets/PopScope-class.html
[Issue 137458]: {{site.repo.flutter}}/issues/137458
