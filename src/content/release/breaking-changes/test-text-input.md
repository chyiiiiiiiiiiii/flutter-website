---
title: TestTextInput 狀態重設
description: TestTextInput 的狀態現在會在每個測試之間重設。
---

{% render docs/breaking-changes.md %}

## 摘要

`TestTextInput` 實例（作為系統螢幕鍵盤的 stub）的狀態，
現在會在每個測試之間重設。

## 背景說明

Flutter 測試框架會使用一個名為 `TestTextInput` 的類別，
用於在元件（Widgets）測試中追蹤與操作編輯狀態。
各個測試可以呼叫方法來修改此物件的內部狀態，
有時甚至是間接修改（例如在 `SystemChannels.textInput` 上設定自己的 handler）。
接下來的測試如果檢查 `WidgetTester.testTextInput` 的狀態，可能會得到非預期的值。

## 變更說明

`WidgetTester.testTextInput` 的狀態
現在會在執行 `testWidgets` 測試前重設。

## 遷移指南

如果測試依賴於前一個測試遺留的髒狀態（dirty state），
就必須進行更新。例如，以下這個來自 `packages/flutter/test/material/text_field_test.dart`
在 `'Controller can update server'` 測試中的測試，
過去會因為前一個測試遺留的髒狀態，
以及在應該設定狀態時未實際設定而通過。

遷移前的程式碼：

在 `widgetsTest` 中，於實際變更文字編輯元件（text editing widget）上的文字之前，
這個呼叫可能會成功：

```dart
    expect(tester.testTextInput.editingState['text'], isEmpty);
```

遷移後的程式碼：

你可以選擇完全移除該呼叫，或考慮使用下列方式來斷言狀態尚未被修改：

```dart
    expect(tester.testTextInput.editingState, isNull);
```

## 時程

引入版本：1.16.3<br>
穩定版釋出：1.17

## 參考資料

API 文件：

* [`TestTextInput`][`TestTextInput`]
* [`WidgetTester`][`WidgetTester`]

相關議題：

* [隨機化測試順序以避免全域狀態][Randomize test order to avoid global state]

相關 PR：

* [在測試間重設狀態][Reset state between tests]


[Randomize test order to avoid global state]: {{site.repo.flutter}}/issues/47233
[Reset state between tests]: {{site.repo.flutter}}/pull/47464
[`TestTextInput`]: {{site.api}}/flutter/flutter_test/TestTextInput-class.html
[`WidgetTester`]: {{site.api}}/flutter/flutter_test/WidgetTester-class.html
