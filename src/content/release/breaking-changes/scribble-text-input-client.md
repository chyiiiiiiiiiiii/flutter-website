---
title: Scribble 文字輸入客戶端
description: >
  在 TextInputClient 介面中新增方法，以允許 Scribble
  插入或移除文字佔位符並顯示工具列。
---

{% render docs/breaking-changes.md %}

## 摘要

在 `TextInputClient` 介面中新增三個方法：`showToolbar`、`insertTextPlaceholder` 和
`removeTextPlaceholder`，以支援 iOS 14 的 Scribble 功能插入與移除文字佔位符，以及顯示工具列。

## 背景

自 iOS 14 起，iPad 支援使用 Apple Pencil 的 Scribble 功能。
此功能允許使用者透過 Apple Pencil 與文字欄位 (text field) 互動，
包括新增、刪除、選取及修改文字。

## 變更說明

在原生文字元件 (Text Widgets) 中，當使用者在執行 iOS 14 或更高版本的 iPad 上使用 Apple Pencil 選取文字時，會顯示文字工具列。
為了重現這個行為，平台會發送一個名為 `TextInputClient.showToolbar` 的 `textInput` channel 訊息，
通知 Dart 程式碼應顯示工具列。

當使用者長按 Apple Pencil 時，文字中會出現一個可視化的間隙，讓使用者有額外空間書寫。
為了重現這個行為，平台會發送名為 `TextInputClient.insertTextPlaceholder` 和
`TextInputClient.removeTextPlaceholder` 的 `textInput` channel 訊息。
多行文字輸入應提供可增加垂直空間的佔位符，
而單行輸入則應提供水平空間。

## 遷移指南

如果你之前實作過 `TextEditingClient`，你必須覆寫
`showToolbar`、`insertTextPlaceholder` 和 `removeTextPlaceholder`，
以支援這些 Scribble 功能或提供空實作。

遷移時，請實作 `showToolbar`、`insertTextPlaceholder` 和
`removeTextPlaceholder`。

遷移前的程式碼：

```dart
class MyCustomTextInputClient implements TextInputClient {
  ...
}
```

程式碼遷移後：

```dart
class MyCustomTextInputClient implements TextInputClient {
  ...
  @override
  void showToolbar() {
    ...
  }
  
  @override
  void insertTextPlaceholder(Size size) {
    ...
  }
  
  @override
  void removeTextPlaceholder() {
    ...
  }
}
```

## 時程

合併於版本：2.9.0-1.0.pre<br>  
正式版釋出：2.10

## 參考資料

API 文件：

* [`TextInputClient`]({{site.api}}/flutter/services/TextInputClient-class.html)

相關議題：

* [Issue 61278]({{site.repo.flutter}}/issues/61278)

相關 PR：

* [24224: 支援 Scribble 手寫（engine）][24224: Support Scribble Handwriting (engine)]
* [75472: 支援 Scribble 手寫][75472: Support Scribble Handwriting]
* [97437: 重新合併 Scribble 手寫支援][97437: Re-land Support Scribble Handwriting]

[24224: Support Scribble Handwriting (engine)]: {{site.repo.engine}}/pull/24224
[97437: Re-land Support Scribble Handwriting]: {{site.repo.flutter}}/pull/97437
[75472: Support Scribble Handwriting]: {{site.repo.flutter}}/pull/75472
