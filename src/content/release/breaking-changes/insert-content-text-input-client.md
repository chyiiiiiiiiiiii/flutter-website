---
title: 插入內容文字輸入客戶端
description: >
  在 `TextInputClient` 介面中新增一個方法，
  讓 Android 虛擬鍵盤能將豐富內容插入 Flutter 文字欄位 (text field)。
---

{% render docs/breaking-changes.md %}

## 摘要

在 `TextInputClient` 介面中新增 `insertContent` 方法，
以支援 Android 的圖片鍵盤功能，
能將內容插入 Flutter `TextField`。

## 背景

自 Android 7.1 起，IME（輸入法編輯器或虛擬鍵盤）可以將
圖片與豐富內容傳送至文字編輯器。
這讓使用者能在文字欄位 (text field) 中插入 gif、貼圖，
或是與情境相關的豐富內容。

## 變更說明

當使用者在 IME 中插入豐富內容時，平台會
發送 `TextInputClient.commitContent` channel 訊息，
通知 Dart 程式碼 IME 已插入豐富內容。
該 channel 訊息會以 JSON 形式包含
插入內容的 mime type、URI 以及 bytedata。

## 遷移指南

如果你先前已實作 `TextInputClient` 介面，請覆寫
`insertContent`，以支援豐富內容插入，
或提供一個空的實作。

如要遷移，請實作 `insertContent`。

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
如需瞭解如何操作，請參考 [insertContent implementation][insertContent implementation]。

為避免對介面產生破壞性變更，
請使用 `with TextInputClient`，而非 `implements TextInputClient`。

[insertContent implementation]: {{site.api}}/flutter/services/TextInputClient/insertContent.html

## 時程

合併於版本：3.8.0-1.0.pre<br>
穩定版發佈於：3.10.0

## 參考資料

API 文件：

* [`TextInputClient`]({{site.api}}/flutter/services/TextInputClient-class.html)

相關議題：

* [Issue 20796]({{site.repo.flutter}}/issues/20796)

相關 PR：

* [24224: Support Image Insertion on Android (engine)]({{site.repo.engine}}/pull/35619)
* [97437: Support Image Insertion on Android]({{site.repo.flutter}}/pull/110052)
