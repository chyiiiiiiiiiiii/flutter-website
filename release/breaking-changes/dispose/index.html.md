# 為 Flutter 中部分可釋放物件新增遺漏的 `dispose()`

> 'dispose()' 可能因重複釋放而失敗。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

已為部分可釋放（disposable）物件補上遺漏的 `dispose()` 呼叫。
例如，ContextMenuController 先前未釋放 OverlayEntry，
而 EditableTextState 也未釋放 TextSelectionOverlay。

如果其他程式碼也對該物件呼叫了 `dispose()`，
且該物件具備防止重複釋放的機制，
第二次呼叫 `dispose()` 時會出現以下錯誤訊息：

`Once you have called dispose() on a <class name>, it can no longer be used.`

## 背景

慣例上，物件的擁有者應負責釋放（dispose）該物件。

但在某些情境下，這項慣例被打破：
擁有者未釋放可釋放的物件。
這個問題已透過新增對 `dispose()` 的呼叫來修正。
然而，若該物件具備防止重複釋放的機制，
則在偵錯模式下執行時，當其他地方也對該物件呼叫 `dispose()`，
就可能導致失敗。

## 遷移指南

如果你遇到下列錯誤，請更新你的程式碼，
僅在你的程式碼本身建立該物件時才呼叫 `dispose()`。

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

若要定位錯誤的釋放（disposal），請檢查錯誤的呼叫堆疊（call stack）。如果呼叫堆疊指向你程式碼中的 `dispose`，則這次釋放是不正確的，應予以修正。

如果錯誤發生在 Flutter 程式碼中，則第一次呼叫 `dispose()` 時就已經不正確。

你可以暫時在發生錯誤的方法 `dispose` 內部呼叫 `print(StackTrace.current)`，以定位錯誤的呼叫位置。

## 時程表

請參閱 [追蹤議題中的進度與狀態](https://github.com/flutter/flutter/issues/134787)。

