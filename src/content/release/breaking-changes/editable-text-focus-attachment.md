---
title: TextField FocusNode 附加位置變更
description: >
  EditableText.focusNode 不再附加於
  EditableTextState 的 BuildContext。
---

{% render docs/breaking-changes.md %}

## 摘要

`EditableText.focusNode` 現在會附加在
`EditableText` 下方的一個專用 `Focus` 元件（Widget）上。

## 背景說明

一個文字輸入欄位元件（例如 `TextField`）
通常會擁有一個 `FocusNode`。
當該 `FocusNode` 成為應用程式的主要焦點時，
事件（例如按鍵）會被傳送到
`FocusNode` 所附加的 `BuildContext`。

`FocusNode` 也在快捷鍵處理中扮演角色：
`Shortcuts` 元件會將按鍵序列轉換為 `Intent`，
並嘗試從 `FocusNode` 所附加的 `BuildContext`
開始，向上查找第一個適合該 `Intent` 的處理器，
直到元件樹（widget tree）的根部。這代表一個
`Actions` 元件（可為不同 `Intent` 提供處理器）
若位於主要焦點的 `BuildContext` 之下，則無法處理任何快捷鍵 `Intent`。

過去對於 `EditableText`，`FocusNode` 會附加在
`EditableTextState` 的 `BuildContext` 上。
任何在 `EditableTextState` 中定義的 `Actions` 元件（Widget）（這些會被插入在 `EditableTextState` 的 `BuildContext` 下方）
即使該 `EditableText` 已取得焦點，也無法處理快捷鍵，
原因如上所述。

## 變更說明

`EditableTextState` 現在會建立一個專用的 `Focus` 元件（Widget）
來承載 `EditableText.focusNode`。
這讓 `EditableTextState` 可以為快捷鍵 `Intent` 定義處理器。
例如，`EditableText` 現在有一個處理器，
當按下 <kbd>DEL</kbd> 鍵時，會處理 "deleteCharacter" intent。

這項變更沒有任何公開 API 的更動，
但會影響那些依賴此實作細節來判斷某個 `FocusNode`
是否與文字輸入欄位相關聯的程式碼庫。

這項變更不會造成建置失敗，但可能導致執行時問題，
或使現有測試失敗。

## 遷移指南

`EditableText` 元件會以 `FocusNode` 作為參數，該參數
先前會附加在其 `EditableText` 的 `BuildContext` 上。如果你依賴
執行時型別檢查來判斷某個 `FocusNode` 是否附加在
文字輸入欄位或可選取文字欄位上，例如：

- `focusNode.context.widget is EditableText`
- `(focusNode.context as StatefulElement).state as EditableTextState`

請繼續閱讀，並考慮依照下方遷移步驟，以避免破壞。

如果你不確定程式碼庫是否需要遷移，
請搜尋 `is EditableText`、`as EditableText`、`is EditableTextState` 和
`as EditableTextState`，並確認搜尋結果中是否有對 `FocusNode.context`
進行型別檢查或型別轉換。
如果有，則需要進行遷移。

為了避免對 `BuildContext` 進行型別檢查或向下轉型，
並根據程式碼庫實際想從該 `FocusNode`
呼叫的功能，請從該 `BuildContext` 觸發 `Intent`。
例如，如果你希望將目前取得焦點的 `TextField`
的文字更新為特定值，請參考以下範例：

遷移前的程式碼：

```dart
final Widget? focusedWidget = primaryFocus?.context?.widget;
if (focusedWidget is EditableText) {
  widget.controller.text = 'Updated Text';
}
```

遷移後的程式碼：

```dart
final BuildContext? focusedContext = primaryFocus?.context;
if (focusedContext != null) {
  Actions.maybeInvoke(focusedContext, ReplaceTextIntent('UpdatedText'));
}
```

如需`Intent`在`EditableText`元件（Widget）中支援的完整列表，
請參考`EditableText`元件（Widget）的文件。

## 時程

合併於版本：2.6.0-12.0.pre<br>
正式版發佈：2.10.0

## 參考資料

API 文件：

* [`EditableText`][`EditableText`]

相關 PR：

* [Move text editing Actions to EditableTextState][Move text editing Actions to EditableTextState]

[`EditableText`]: {{site.api}}/flutter/widgets/EditableText-class.html
[Move text editing Actions to EditableTextState]: {{site.repo.flutter}}/pull/90684
