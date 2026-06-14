# 插入內容文字輸入客戶端

> 在 `TextInputClient` 介面中新增一個方法， 讓 Android 虛擬鍵盤可以將豐富內容插入 Flutter 文字欄位 (text field)。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

在 `TextInputClient` 介面中新增了 `insertContent` 方法，
允許 Android 的圖片鍵盤功能
將內容插入到 Flutter `TextField` 中。

## 背景

自 Android 7.1 起，IME（輸入法編輯器或虛擬鍵盤）可以將
圖片與豐富內容傳送到文字編輯器。
這讓使用者能夠在文字欄位 (text field) 中插入 gif、貼圖，
或是與情境相關的豐富內容。

## 變更說明

當使用者在 IME 中插入豐富內容時，平台會
傳送 `TextInputClient.commitContent` 通道訊息，
通知 Dart 程式碼 IME 已插入豐富內容。
該通道訊息會以 JSON 形式包含
插入內容的 mime type、URI 及 bytedata。

## 遷移指南

如果你之前有實作 `TextInputClient` 介面，請覆寫
`insertContent`，以支援豐富內容插入
或提供一個空的實作。

要進行遷移，請實作 `insertContent`。

遷移前的程式碼：

```dart
class MyCustomTextInputClient implements TextInputClient {
  // ...
}
```

遷移後的程式碼：

```dart
class MyCustomTextInputClient implements TextInputClient {
  // ...
  @override
  void insertContent() {
    // ...
  }
  // ...
}
```

您的 `TextInputClient` 實作可能不需要從 IME 插入豐富內容（rich content）的能力。在這種情況下，您可以將 `insertContent` 的實作留空，並不會有任何影響。

```dart
class MyCustomTextInputClient implements TextInputClient {
  // ...
  @override
  void insertContent() {}
  // ...
}
```

作為替代方案，您可以使用與預設 `TextInputClient` 類似的實作方式。
如需瞭解如何操作，請參考 [insertContent 實作說明][insertContent implementation]。

為了避免對介面產生重大變更，
請使用 `with TextInputClient`，而非 `implements TextInputClient`。

[insertContent implementation]: https://api.flutter.dev/flutter/services/TextInputClient/insertContent.html

## 時程

合併於版本：3.8.0-1.0.pre<br>
穩定版本釋出：3.10.0

## 參考資料

API 文件：

* [`TextInputClient`](https://api.flutter.dev/flutter/services/TextInputClient-class.html)

相關議題：

* [Issue 20796](https://github.com/flutter/flutter/issues/20796)

相關 PR：

* [24224: 支援 Android 上的圖片插入（engine）](https://github.com/flutter/engine/pull/35619)
* [97437: 支援 Android 上的圖片插入](https://github.com/flutter/flutter/pull/110052)

