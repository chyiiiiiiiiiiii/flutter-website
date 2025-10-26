---
title: 在 TextInputClient 新增 showAutocorrectionPromptRect 方法
description: >
  在 TextInputClient 介面中新增了一個新方法：void showAutocorrectionPromptRect(int start, int end)
---

{% render docs/breaking-changes.md %}

## 摘要

在`TextInputClient`介面中新增了一個新方法 `void showAutocorrectionPromptRect(int start, int end)`。

## 背景

為了在 iOS 顯示自動校正（autocorrection）高亮區域，
iOS 輸入插件需要有一種方式，能將高亮區域的起始與結束位置
通知給 Flutter 框架。

## 變更說明

在`TextInputClient`介面中新增了一個新方法 `void showAutocorrectionPromptRect(int start, int end)`。iOS 會在偵測到
使用者當前輸入中有新的自動校正候選詞時，或是先前已高亮的
候選詞範圍發生變化時，呼叫此方法。

## 遷移指南

如果你的應用程式沒有實作或繼承`TextInputClient`，則不需要進行任何遷移。
如果你的應用程式沒有針對 iOS，或是實作`textInputClient`介面的類別
本身不支援自動校正（autocorrect），你只需要為這個新方法
加上一個空的實作即可：

```dart
class CustomTextInputClient implements TextInputClient {
  void showAutocorrectionPromptRect(int start, int end) {}
}
```

否則，如果您的應用程式目標平台為 iOS，且在 iOS 上支援自動校正（autocorrect），我們建議您在 `TextInputClient` 子類別中加入合理的 `void showAutocorrectionPromptRect(int start, int end)` 實作。

遷移後的程式碼：

```dart
// Assume your `TextInputClient` is a `State` subclass, and it has a variable 
// `_currentPromptRectRange` that controls the autocorrection highlight.
class CustomTextInputClient extends State<...> implements TextInputClient {
  @override
  void updateEditingValue(TextEditingValue value) {
    // When the text changes, the highlight needs to be dismissed.
    if (value.text != _value.text) {
      setState(() {
        _currentPromptRectRange = null;
      });
    }
  }

  void _handleFocusChanged() {
    // When this text input loses focus, the autocorrection highlight needs
    // to be dismissed.
    if (!_hasFocus) {
      setState(() {
        _currentPromptRectRange = null;
      });
    }
  }

  @override
  void showAutocorrectionPromptRect(int start, int end) {
    // Updates the range of the highlight, as iOS requested.
    // This method isn't called when iOS decides to
    // dismiss the highlight.
    setState(() {
      _currentPromptRectRange = TextRange(start: start, end: end);
    });
  }
}
```

## 時程

穩定版發佈：1.20

## 參考資料

API 文件：

* [`TextInputClient`][`TextInputClient`]

相關議題：

* [Issue 12920][Issue 12920]

相關 PR：

* [iOS UITextInput autocorrection prompt][iOS UITextInput autocorrection prompt]


[iOS UITextInput autocorrection prompt]: {{site.repo.flutter}}/pull/54119/
[Issue 12920]: {{site.repo.flutter}}/issues/12920
[`TextInputClient`]: {{site.api}}/flutter/services/TextInputClient-class.html
