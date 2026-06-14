# GestureRecognizer 清理

> OneSequenceGestureRecognizer 子類別應該 覆寫 `addAllowedPointer` 以接收 `PointerDownEvent`




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`OneSequenceGestureRecognizer.addAllowedPointer()` 已修改為接收
`PointerDownEvent`，與其父類別一致。先前它接受較為
通用的 `PointerEvent` 類型，這是不正確的。

## 背景說明

框架實際上只會傳遞 `PointerDownEvent` 物件給
`addAllowedPointer()`。將
`OneSequenceGestureRecognizer.addAllowedPointer()` 宣告為接受更通用的
類型容易造成混淆，並導致 `OneSequenceGestureRecognizer` 子類別
必須將其參數轉型為正確的類別。

## 變更說明

先前的宣告強迫 `OneSequenceGestureRecognizer` 的子類別
必須像這樣覆寫 `addAllowedPointer()`：

```dart
class CustomGestureRecognizer extends ScaleGestureRecognizer {
  @override
  void addAllowedPointer(PointerEvent event) {
    // insert custom handling of event here...
    super.addAllowedPointer(event);
  }
}
```

新的方法宣告將導致這段程式碼失敗，並出現以下錯誤訊息：

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
進入穩定版：2.5

## 參考資料

API 文件：

* [`OneSequenceGestureRecognizer`][]

相關 PR：

* [Fix addAllowedPointer() overrides][]

[`OneSequenceGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/OneSequenceGestureRecognizer-class.html
[Fix addAllowedPointer() overrides]: https://github.com/flutter/flutter/pull/82834

