# TextField FocusNode 附加位置變更

> EditableText.focusNode 不再附加於 EditableTextState 的 BuildContext。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`EditableText.focusNode` 現在會附加到
`EditableText` 下方的一個專用 `Focus` 元件 (Widget)。

## 背景說明

一個文字輸入欄位元件（例如 `TextField`）
通常會擁有一個 `FocusNode`。
當該 `FocusNode` 是應用程式的主要焦點時，
事件（例如鍵盤按鍵）會被傳送到
`FocusNode` 所附加的 `BuildContext`。

`FocusNode` 也在快捷鍵處理中扮演角色：
`Shortcuts` 元件會將按鍵序列轉換為 `Intent`，
並嘗試從附加了 `FocusNode` 的 `BuildContext`
開始，往元件樹（Widget tree）根部尋找第一個適合該 `Intent` 的處理器。
這代表如果一個 `Actions` 元件（提供不同 `Intent` 的處理器）
位於樹狀結構下方，當主要焦點的 `BuildContext` 位於其上方時，
將無法處理任何快捷鍵 `Intent`。

過去在 `EditableText` 中，`FocusNode` 會附加於
`EditableTextState` 的 `BuildContext`。
任何在 `EditableTextState` 中定義的 `Actions` 元件（這些元件會被插入在 `EditableTextState` 的 `BuildContext` 下方）
即使該 `EditableText` 已獲得焦點，也無法處理快捷鍵，
原因如上所述。

## 變更說明

`EditableTextState` 現在會建立一個專用的 `Focus` 元件來
承載 `EditableText.focusNode`。
這讓 `EditableTextState` 可以為快捷鍵 `Intent` 定義處理器。
例如，`EditableText` 現在有一個處理器，
當按下 <kbd>DEL</kbd> 鍵時，會處理 "deleteCharacter" intent。

這項變更不涉及任何公開 API 變更，
但會影響依賴該特定實作細節來判斷
`FocusNode` 是否與文字輸入欄位相關聯的程式碼庫。

這項變更不會導致建置失敗，但可能會在執行時產生問題，
或導致現有測試失敗。

## 遷移指南

`EditableText` 元件（Widget）會以 `FocusNode` 作為參數，
過去這個參數會附加到其 `EditableText` 的 `BuildContext`。
如果你依賴於執行時型別檢查來判斷
`FocusNode` 是否附加於文字輸入欄位或可選取文字欄位，例如：

- `focusNode.context.widget is EditableText`
- `(focusNode.context as StatefulElement).state as EditableTextState`

請繼續閱讀，並考慮依照下方遷移步驟操作，以避免破壞。

如果你不確定程式碼庫是否需要遷移，
請搜尋 `is EditableText`、`as EditableText`、`is EditableTextState` 和
`as EditableTextState`，並確認搜尋結果中是否有對 `FocusNode.context` 進行型別檢查或型別轉換的情況。
如果有，則需要進行遷移。

為了避免對 `FocusNode` 關聯的 `BuildContext` 進行型別檢查或向下轉型，
並根據程式碼庫實際想從該 `FocusNode` 呼叫的功能，
請從該 `BuildContext` 觸發一個 `Intent`。
例如，如果你想將目前獲得焦點的 `TextField` 文字更新為特定值，請參考下方範例：

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

如需 `EditableText` 元件所支援的 `Intent` 完整清單，
請參閱 `EditableText` 元件的文件。

## 時程

合併於版本：2.6.0-12.0.pre<br>
進入穩定版：2.10.0

## 參考資料

API 文件：

* [`EditableText`][]

相關 PR：

* [Move text editing Actions to EditableTextState][]

[`EditableText`]: https://api.flutter.dev/flutter/widgets/EditableText-class.html
[Move text editing Actions to EditableTextState]: https://github.com/flutter/flutter/pull/90684

