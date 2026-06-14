# 必須至少提供一種剪貼簿資料變體

> 為了支援多種剪貼簿資料變體， 現在必須至少提供一種剪貼簿資料變體。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

[`ClipboardData constructor`][] 的 `text` 參數現在不再允許為 null。
如果您的程式碼過去將 `null` 傳遞給 `text` 參數，請遷移為傳遞
空字串 `''`。

## 背景說明

為了支援多種剪貼簿資料變體，
`ClipboardData` 建構函式現在要求必須至少提供一種資料變體。

過去，各平台對於如何處理 `null` 並不一致。
現在這個行為已在所有平台上統一。如果您對底層細節有興趣，請參閱 [PR 122446][]。

## 變更說明

[`ClipboardData constructor`][] 的 `text` 參數現在不再允許為 null。

## 遷移指南

若要重設文字剪貼簿，請使用空字串 `''`，而非 `null`。

遷移前的程式碼：

```dart
void resetClipboard() {
  Clipboard.setData(ClipboardData(text: null));
}
```

遷移後的程式碼：

```dart
void resetClipboard() {
  Clipboard.setData(ClipboardData(text: ''));
}
```

## 時程

已於版本：3.10.0-9.0.pre<br>
正式版發佈：3.10.0

## 參考資料

API 文件：

* [`Clipboard.setData`][]
* [`ClipboardData constructor`][]

相關 PR：

* [Assert at least one clipboard data variant is provided][]

[`ClipboardData constructor`]: https://api.flutter.dev/flutter/services/ClipboardData/ClipboardData.html
[`Clipboard.setData`]: https://api.flutter.dev/flutter/services/Clipboard/setData.html
[PR 122446]: https://github.com/flutter/flutter/pull/122446
[Assert at least one clipboard data variant is provided]: https://github.com/flutter/flutter/pull/122446

