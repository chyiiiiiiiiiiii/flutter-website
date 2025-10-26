---
title: PopScope 的泛型型別
description: >-
  為 PopScope 類別新增了泛型型別，
  並更新了 onPopInvoked 函式簽章。
---

{% render docs/breaking-changes.md %}

## 摘要

為 [`PopScope`][`PopScope`] 類別新增了泛型型別，並將
[`onPopInvoked`][`onPopInvoked`] 替換為新的方法 [`onPopInvokedWithResult`][`onPopInvokedWithResult`]。
新方法以布林值 `didPop` 和 `result` 作為位置參數。

同時也將 [`Form.onPopInvoked`] 替換為 [`Form.onPopInvokedWithResult`][`Form.onPopInvokedWithResult`]，
原因相同。

## 背景說明

過去，`PopScope` 在呼叫 `onPopInvoked` 時，
無法存取 pop 結果。
現在於 `PopScope` 類別中加入泛型型別，
讓新方法 `onPopInvokedWithResult` 可以存取型別安全的結果。

## 變更說明

在 `PopScope` 類別中新增了泛型型別（`<T>`），
並新增了新方法 `onPopInvokedWithResult`。
`onPopInvoked` 屬性已棄用，建議改用 `onPopInvokedWithResult`。

同時也在 `Form` 中新增了新方法 `onPopInvokedWithResult`，
以取代 `onPopInvoked`。

## 遷移指南

遷移前的程式碼：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      navigatorKey: nav,
      home: Column(
        children: [
          Form(
            canPop: false,
            onPopInvoked: (bool didPop) {
              if (didPop) {
                return;
              }
              launchConfirmationDialog();
            },
            child: MyWidget(),
          ),
          PopScope(
            canPop: false,
            onPopInvoked: (bool didPop) {
              if (didPop) {
                return;
              }
              launchConfirmationDialog();
            },
            child: MyWidget(),
          ),
        ],
      ),
    ),
  );
}
```

遷移後的程式碼：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      navigatorKey: nav,
      home: Column(
        children: [
          Form(
            canPop: false,
            onPopInvokedWithResult: (bool didPop, Object? result) {
              if (didPop) {
                return;
              }
              launchConfirmationDialog();
            },
            child: MyWidget(),
          ),
          PopScope<Object?>(
            canPop: false,
            onPopInvokedWithResult: (bool didPop, Object? result) {
              if (didPop) {
                return;
              }
              launchConfirmationDialog();
            },
            child: MyWidget(),
          ),
        ],
      ),
    ),
  );
}
```

泛型型別應與[`Route`][`Route`]所在的`PopScope`的泛型型別相符。
例如，如果該路由（Route）使用`int`作為其泛型型別，
建議使用`PopScope<int>`。

如果`PopScope`元件（Widgets）在多個具有不同型別的路由（Route）之間共用，可以使用`PopScope<Object?>`來涵蓋所有可能的型別。

## 時程

合併於版本：3.22.0-26.0.pre<br>  
正式版釋出：3.24.0

## 參考資料

API 文件：

* [`PopScope`][`PopScope`]
* [`onPopInvoked`][`onPopInvoked`]
* [`Route`][`Route`]
* [`onPopInvokedWithResult`][`onPopInvokedWithResult`]
* [`Form.onPopInvoked`][`Form.onPopInvoked`]
* [`Form.onPopInvokedWithResult`][`Form.onPopInvokedWithResult`]

相關議題：

* [Issue 137458][Issue 137458]

相關 PR：

* [Add generic type for result in PopScope][Add generic type for result in PopScope] _(已回滾)_
* [Reapply new PopScope API][Reapply new PopScope API] _(最終重新合併)_

[Add generic type for result in PopScope]: {{site.repo.flutter}}/pull/139164
[Reapply new PopScope API]: {{site.repo.flutter}}/pull/147607
[`PopScope`]: {{site.api}}/flutter/widgets/PopScope-class.html
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[`onPopInvoked`]: {{site.api}}/flutter/widgets/PopScope/onPopInvoked.html
[`onPopInvokedWithResult`]: {{site.api}}/flutter/widgets/PopScope/onPopInvokedWithResult.html
[`Form.onPopInvoked`]: {{site.api}}/flutter/widgets/Form/onPopInvoked.html
[`Form.onPopInvokedWithResult`]: {{site.api}}/flutter/widgets/Form/onPopInvokedWithResult.html
[Issue 137458]: {{site.repo.flutter}}/issues/137458
