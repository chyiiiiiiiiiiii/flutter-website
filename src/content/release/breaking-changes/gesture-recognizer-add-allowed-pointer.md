---
title: GestureRecognizer 清理
description: >
  OneSequenceGestureRecognizer 子類別應該
  覆寫 `addAllowedPointer` 以接收 `PointerDownEvent`
---

{% render docs/breaking-changes.md %}

## 摘要

`OneSequenceGestureRecognizer.addAllowedPointer()` 已更改為接收
`PointerDownEvent`，與其父類別一致。先前，它接受較為
通用的 `PointerEvent` 類型，這是不正確的。

## 背景

框架實際上只會傳遞 `PointerDownEvent` 物件給
`addAllowedPointer()`。將
`OneSequenceGestureRecognizer.addAllowedPointer()` 宣告為接收更通用的
類型會造成混淆，並導致 `OneSequenceGestureRecognizer` 子類別
必須將其參數轉型為正確的類別。

## 變更說明

先前的宣告會強制 `OneSequenceGestureRecognizer` 的子類別
像這樣覆寫 `addAllowedPointer()`：

```dart
class CustomGestureRecognizer extends ScaleGestureRecognizer {
  @override
  void addAllowedPointer(PointerEvent event) {
    // insert custom handling of event here...
    super.addAllowedPointer(event);
  }
}
```

新的方法宣告會導致此程式碼失敗，並出現以下錯誤訊息：

```plaintext
super.addAllowedPointer(event); The argument type 'PointerEvent' can't be assigned to the parameter type 'PointerDownEvent'.
                                #argument_type_not_assignable

```

## 遷移指南

遷移前的程式碼：

```dart
class CustomGestureRecognizer extends ScaleGestureRecognizer {
  @override
  void addAllowedPointer(PointerEvent event) {
    // insert custom handling of event here...
    super.addAllowedPointer(event);
  }
}
```

遷移後的程式碼：

```dart
class CustomGestureRecognizer extends ScaleGestureRecognizer {
  @override
  void addAllowedPointer(PointerDownEvent event) {
    // insert custom handling of event here...
    super.addAllowedPointer(event);
  }
}
```

## 時程

合併於版本：2.3.0-13.0.pre<br>  
穩定版釋出：2.5

## 參考資料

API 文件：

* [`OneSequenceGestureRecognizer`][`OneSequenceGestureRecognizer`]

相關 PR：

* [Fix addAllowedPointer() overrides][Fix addAllowedPointer() overrides]

[`OneSequenceGestureRecognizer`]: {{site.api}}/flutter/gestures/OneSequenceGestureRecognizer-class.html
[Fix addAllowedPointer() overrides]: {{site.repo.flutter}}/pull/82834
