---
title: 將 enterText 方法修改為將游標移至輸入文字結尾
description: >
  WidgetTester.enterText 與 TestTextInput.enterText 現在
  會將游標移至輸入文字的結尾。
---

{% render docs/breaking-changes.md %}

## 摘要

`WidgetTester.enterText` 與 `TestTextInput.enterText` 方法
現在會將游標移至輸入文字的結尾。

## 背景說明

游標（caret）用來指示目前在作用中輸入欄位（input field）中的插入點。一般來說，當輸入新字元時，游標會停留在該字元之後。在 Flutter 中，游標位置是以收合的選取範圍（collapsed selection）來表示。當選取範圍無效時，通常使用者將無法修改或新增文字，直到他們將選取範圍變更為有效值。

`WidgetTester.enterText` 與 `TestTextInput.enterText` 是測試中用來取代目標文字欄位內容的兩個方法。在這項變更之前，`WidgetTester.enterText` 與 `TestTextInput.enterText`
會將選取範圍設為無效範圍（-1, -1），表示沒有選取區或游標。這與一般輸入欄位的典型行為相矛盾。

## 變更說明

除了以提供的文字取代原有文字外，
`WidgetTester.enterText` 與 `TestTextInput.enterText` 現在會將
選取範圍設為 `TextSelection.collapsed(offset: text.length)`，
而非 `TextSelection.collapsed(offset: -1)`。

## 遷移指南

測試依賴 `enterText` 先前行為的情況應極為罕見，因為通常選取範圍不應為無效。**請考慮調整測試中的預期值，以配合 `enterText` 的變更。**

這項變更可能導致的常見測試失敗包括：

- Golden 測試失敗：

  游標現在會出現在文字結尾，而不是變更前的文字前方。
  
- 呼叫 `enterText` 後的 `TextEditingValue.selection` 不同：

  文字欄位（text field）的 `TextEditingValue` 現在會有一個 offset 為非負值的收合選取範圍，而不是
  變更前的 `TextSelection.collapsed(offset: -1)`。
  例如，你可能會看到
  `expect(controller.value.selection.baseOffset, -1);`
  在呼叫 `enterText` 後失敗。

如果你的測試必須依賴將選取範圍設為無效，則可以使用 `updateEditingValue` 來達到先前的行為：

### `TestTextInput.enterText`

遷移前的程式碼：

```dart
await testTextInput.enterText(text);
```

遷移後的程式碼：

```dart
await testTextInput.updateEditingValue(TextEditingValue(
  text: text,
));
```

### `WidgetTester.enterText`

遷移前的程式碼：

```dart
await tester.enterText(finder, text);
```

遷移後的程式碼：

```dart
await tester.showKeyboard(finder);
await tester.updateEditingValue(TextEditingValue(
  text: text,
));
await tester.idle();
```

## 時程

合併於版本：2.1.0-13.0.pre<br>  
正式版本釋出：2.5

## 參考資料

API 文件：

* [`WidgetTester.enterText`][`WidgetTester.enterText`]
* [`TestTextInput.enterText`][`TestTextInput.enterText`]

相關議題：

* [Issue 79494][Issue 79494]

相關 PR：

* [enterText to move the caret to the end][enterText to move the caret to the end]


[`WidgetTester.enterText`]: {{site.api}}/flutter/flutter_test/WidgetTester/enterText.html
[`TestTextInput.enterText`]: {{site.api}}/flutter/flutter_test/TestTextInput/enterText.html

[Issue 79494]: {{site.repo.flutter}}/issues/79494
[enterText to move the caret to the end]: {{site.repo.flutter}}/pull/79506
