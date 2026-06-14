# 在 TextInputClient 新增 showAutocorrectionPromptRect 方法

> 在 TextInputClient 介面中新增了一個新方法：void showAutocorrectionPromptRect(int start, int end)




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

在 `TextInputClient` 介面中新增了一個新方法 `void showAutocorrectionPromptRect(int start, int end)`。

## 背景

為了在 iOS 顯示自動校正（autocorrection）高亮區域，
iOS 文字輸入插件需要有一種方式，能將高亮區域的起始與結束位置
通知給 Flutter 框架。

## 變更說明

在 `TextInputClient` 介面中新增了一個新方法 `void showAutocorrectionPromptRect(int start, int end)`。iOS 會在偵測到
使用者當前輸入中有新的自動校正候選詞時，或是先前已高亮的
候選詞範圍發生變化時，呼叫此方法。

## 遷移指南

如果你的應用程式沒有實作或繼承 `TextInputClient`，則不需要進行任何遷移。
如果你的應用程式沒有針對 iOS，或是實作 `textInputClient` 介面的類別
本身不支援自動校正（autocorrect），你只需要為這個新方法
加上一個空的實作即可：

```dart
class CustomTextInputClient implements TextInputClient {
  void showAutocorrectionPromptRect(int start, int end) {}
}
```

否則，如果你的應用程式目標平台為 iOS，且在 iOS 上支援自動校正（autocorrect），我們建議你在 `TextInputClient` 子類別中加入合理的 `void showAutocorrectionPromptRect(int start, int end)` 實作。

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

* [`TextInputClient`][]

相關議題：

* [Issue 12920][]

相關 PR：

* [iOS UITextInput autocorrection prompt][]


[iOS UITextInput autocorrection prompt]: https://github.com/flutter/flutter/pull/54119/
[Issue 12920]: https://github.com/flutter/flutter/issues/12920
[`TextInputClient`]: https://api.flutter.dev/flutter/services/TextInputClient-class.html

