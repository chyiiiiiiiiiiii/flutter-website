# PopScope 的泛型型別

> 為 PopScope 類別新增了泛型型別，並更新了 onPopInvoked 函式的簽章。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

為 [`PopScope`][] 類別新增了泛型型別，並將
[`onPopInvoked`][] 替換為新的方法 [`onPopInvokedWithResult`][]。
新方法接受一個布林值 `didPop` 和一個 `result` 作為位置參數。

同時也將 [`Form.onPopInvoked`] 替換為 [`Form.onPopInvokedWithResult`][]，
原因相同。

## 背景說明

過去，`PopScope` 在呼叫 `onPopInvoked` 時
無法取得 pop 的結果。
現在於 `PopScope` 類別中新增了泛型型別，
讓新方法 `onPopInvokedWithResult` 能夠存取型別安全的結果。

## 變更說明

為 `PopScope` 類別新增了泛型型別（`<T>`），並
新增了一個新方法 `onPopInvokedWithResult`。
`onPopInvoked` 屬性已被棄用，建議改用 `onPopInvokedWithResult`。

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

泛型型別應與 [`Route`][] 所在的 `PopScope` 的泛型型別一致。
例如，如果該路由（Route）使用 `int` 作為其泛型型別，
建議使用 `PopScope<int>`。

如果 `PopScope` 元件 (Widget) 在多個具有不同型別的路由（Route）間共用，
可以使用 `PopScope<Object?>` 來涵蓋所有可能的型別。

## 時程

合併於版本：3.22.0-26.0.pre<br>
穩定版釋出：3.24.0

## 參考資料

API 文件：

* [`PopScope`][]
* [`onPopInvoked`][]
* [`Route`][]
* [`onPopInvokedWithResult`][]
* [`Form.onPopInvoked`][]
* [`Form.onPopInvokedWithResult`][]

相關議題：

* [Issue 137458][]

相關 PR：

* [Add generic type for result in PopScope][] _(已回滾)_
* [Reapply new PopScope API][] _(最終重新合併)_

[Add generic type for result in PopScope]: https://github.com/flutter/flutter/pull/139164
[Reapply new PopScope API]: https://github.com/flutter/flutter/pull/147607
[`PopScope`]: https://api.flutter.dev/flutter/widgets/PopScope-class.html
[`Route`]: https://api.flutter.dev/flutter/widgets/Route-class.html
[`onPopInvoked`]: https://api.flutter.dev/flutter/widgets/PopScope/onPopInvoked.html
[`onPopInvokedWithResult`]: https://api.flutter.dev/flutter/widgets/PopScope/onPopInvokedWithResult.html
[`Form.onPopInvoked`]: https://api.flutter.dev/flutter/widgets/Form/onPopInvoked.html
[`Form.onPopInvokedWithResult`]: https://api.flutter.dev/flutter/widgets/Form/onPopInvokedWithResult.html
[Issue 137458]: https://github.com/flutter/flutter/issues/137458

