---
title: 為部分 Flutter 可釋放物件新增了遺漏的 `dispose()`
description: >
  'dispose()' 可能因重複釋放而失敗。
---

{% render docs/breaking-changes.md %}

## 摘要

針對部分可釋放物件，補上了遺漏的 `dispose()` 呼叫。
例如，`ContextMenuController` 先前未釋放 `OverlayEntry`，
而 `EditableTextState` 也未釋放 `TextSelectionOverlay`。

如果其他程式碼也對該物件呼叫 `dispose()`，
且該物件有防止重複釋放的機制，
第二次呼叫 `dispose()` 時會出現以下錯誤訊息：

`Once you have called dispose() on a <class name>, it can no longer be used.` 

## 背景

慣例上，物件的擁有者應負責釋放該物件。

但在某些地方違反了這項慣例：
擁有者未釋放可釋放物件。
此問題已透過新增 `dispose()` 呼叫來修正。
然而，若物件有防止重複釋放的機制，
則在除錯模式下執行時，
且於其他地方也呼叫了 `dispose()`，
可能會導致失敗。

## 移轉指南

若您遇到以下錯誤，請更新您的程式碼，
僅在您的程式碼建立該物件時才呼叫 `dispose()`。

```plaintext
Once you have called dispose() on a <class name>, it can no longer be used.
```

遷移前的程式碼：

```dart
x.dispose();
```

遷移後的程式碼：

```dart
if (xIsCreatedByMe) {
  x.dispose();
}
```

要定位錯誤的資源釋放（disposal），請檢查錯誤的呼叫堆疊（call stack）。如果呼叫堆疊指向你程式碼中的 `dispose`，那麼這次釋放是不正確的，應該修正。

如果錯誤發生在 Flutter 程式碼中，代表第一次呼叫 `dispose()` 時就已經不正確。

你可以暫時在失敗的方法 `dispose` 內部呼叫 `print(StackTrace.current)`，以定位錯誤的呼叫位置。

## 時程表

請參閱 [追蹤議題中的進度與狀態]({{site.repo.flutter}}/issues/134787)。
