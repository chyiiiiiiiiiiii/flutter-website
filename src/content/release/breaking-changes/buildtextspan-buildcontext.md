---
title: 為 TextEditingController.buildTextSpan 新增 BuildContext 參數
description: >
  為 TextEditingController.buildTextSpan 新增 BuildContext 參數，
  讓繼承並覆寫 buildTextSpan 的類別可以存取繼承的元件 (Widgets)。
---

{% render docs/breaking-changes.md %}

## 摘要

在 `TextEditingController.buildTextSpan` 中新增了一個 `BuildContext` 參數。

所有繼承或實作 `TextEditingController`
並覆寫 `buildTextSpan` 的類別，
都需要在方法簽章中加入 `BuildContext` 參數，
以符合有效的覆寫（override）。

呼叫 `TextEditingController.buildTextSpan` 的地方
必須傳入一個 `BuildContext`。

## 背景說明

`TextEditingController.buildTextSpan` 會由 `EditableText`
在其 controller 上呼叫，以建立它要渲染的 `TextSpan`。
`buildTextSpan` 可以在自訂類別中覆寫，
這些類別需繼承 `TextEditingController`。
這讓繼承 `TextEditingController` 的類別可以覆寫 `buildTextSpan`，
例如用於富文字編輯時，改變部分文字的樣式。

任何 `buildTextSpan` 需要的狀態
（除了 `TextStyle` 和 `withComposing` 參數之外），
都必須傳入繼承 `TextEditingController` 的類別中。

## 變更說明

現在有了 `BuildContext` 之後，使用者可以在 `buildTextSpan`
內部存取 `InheritedWidgets`，
以取得需要用來設定文字樣式的狀態，
或以其他方式操作所建立的 `TextSpan`。

舉例來說，假設我們有一個
`HighlightTextEditingController`，它希望
將文字顏色設為 `Theme.accentColor` 來進行高亮顯示。

在這項變更之前，controller 的實作會像這樣：

```dart
class HighlightTextEditingController extends TextEditingController {
  HighlightTextEditingController(this.highlightColor);

  final Color highlightColor;

  @override
  TextSpan buildTextSpan({TextStyle? style, required bool withComposing}) {
    return super.buildTextSpan(style: TextStyle(color: highlightColor), withComposing: withComposing);
  }
```

而使用該 controller 的使用者，在建立 controller 時需要傳入 color。

有了 `BuildContext` 參數後，
`HighlightTextEditingController` 可以直接透過 `Theme.of(BuildContext)`
存取 `Theme.accentColor`：

```dart
class HighlightTextEditingController extends TextEditingController {
  @override
  TextSpan buildTextSpan({required BuildContext context, TextStyle? style, required bool withComposing}) {
    final Color color = Theme.of(context).accentColor;
    return super.buildTextSpan(context: context, style: TextStyle(color: color), withComposing: withComposing);
  }
}
```

## 遷移指南

### 覆寫 `TextEditingController.buildTextSpan`

在覆寫 `buildTextSpan` 的方法簽章中，新增一個 `required BuildContext context` 參數。

遷移前的程式碼：

```dart
class MyTextEditingController {
  @override
  TextSpan buildTextSpan({TextStyle? style, required bool withComposing}) {
    /* ... */
  }
}
```

遷移前的範例錯誤訊息：

```plaintext
'MyTextEditingController.buildTextSpan' ('TextSpan Function({TextStyle? style, required bool withComposing})') isn't a valid override of 'TextEditingController.buildTextSpan' ('TextSpan Function({required BuildContext context, TextStyle? style, required bool withComposing})').
```

遷移後的程式碼：

```dart
class MyTextEditingController {
  @override
  TextSpan buildTextSpan({required BuildContext context, TextStyle? style, required bool withComposing}) {
    /* ... */
  }
}
```

### 呼叫 `TextEditingController.buildTextSpan`

在呼叫時，請傳遞一個具名參數 `context`，其型別為 `BuildContext`。

遷移前的程式碼：

```dart
TextEditingController controller = /* ... */;
TextSpan span = controller.buildTextSpan(withComposing: false);
```

遷移前的錯誤訊息：

```plaintext
The named parameter 'context' is required, but there's no corresponding argument.
Try adding the required argument.
```

遷移後的程式碼：

```dart
BuildContext context = /* ... */;
TextEditingController controller = /* ... */;
TextSpan span = controller.buildTextSpan(context: context, withComposing: false);
```

## 時程

合併於版本：1.26.0<br>  
進入穩定版：2.0.0

## 參考資料

API 文件：

* [`TextEditingController.buildTextSpan`][`TextEditingController.buildTextSpan`]

相關議題：

* [Issue #72343][Issue #72343]

相關 PR：

* [重新合併「為 TextEditingController.buildTextSpan 新增 BuildContext 參數」#73510][Reland "Add BuildContext parameter to TextEditingController.buildTextSpan" #73510]
* [還原「為 TextEditingController.buildTextSpan 新增 BuildContext 參數」#73503][Revert "Add BuildContext parameter to TextEditingController.buildTextSpan" #73503]
* [為 TextEditingController.buildTextSpan 新增 BuildContext 參數 #72344][Add BuildContext parameter to TextEditingController.buildTextSpan #72344]

[Add BuildContext parameter to TextEditingController.buildTextSpan #72344]: {{site.repo.flutter}}/pull/72344
[Issue #72343]: {{site.repo.flutter}}/issues/72343
[Reland "Add BuildContext parameter to TextEditingController.buildTextSpan" #73510]: {{site.repo.flutter}}/pull/73510
[Revert "Add BuildContext parameter to TextEditingController.buildTextSpan" #73503]: {{site.repo.flutter}}/pull/73503
[`TextEditingController.buildTextSpan`]: {{site.api}}/flutter/widgets/TextEditingController/buildTextSpan.html
