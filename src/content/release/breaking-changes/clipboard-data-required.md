```markdown
---
title: 必須至少提供一種剪貼簿資料變體
description: >
  為了支援多種剪貼簿資料變體，
  現在必須至少提供一種剪貼簿資料變體。
---

{% render docs/breaking-changes.md %}

## 摘要

[`ClipboardData constructor`][`ClipboardData constructor`] 的 `text` 參數不再允許為 null。
如果你的程式碼原本將 `null` 傳遞給 `text` 參數，請遷移為傳遞
空字串 `''`。

## 背景說明

為了支援多種剪貼簿資料變體，
`ClipboardData` 建構函式現在要求必須至少提供一種資料變體。

過去，各平台對於 `null` 的處理方式並不一致。
現在這個行為已在所有平台上統一。如果你對底層細節有興趣，請參考 [PR 122446][PR 122446]。

## 變更說明

[`ClipboardData constructor`][`ClipboardData constructor`] 的 `text` 參數不再允許為 null。

## 遷移指南

若要重設文字剪貼簿，請使用空字串 `''` 取代 `null`。

遷移前的程式碼：
```

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

合併於版本：3.10.0-9.0.pre<br>  
穩定版釋出：3.10.0

## 參考資料

API 文件：

* [`Clipboard.setData`][`Clipboard.setData`]
* [`ClipboardData constructor`][`ClipboardData constructor`]

相關 PR：

* [Assert at least one clipboard data variant is provided][Assert at least one clipboard data variant is provided]

[`ClipboardData constructor`]: {{site.api}}/flutter/services/ClipboardData/ClipboardData.html
[`Clipboard.setData`]: {{site.api}}/flutter/services/Clipboard/setData.html
[PR 122446]: {{site.repo.flutter}}/pull/122446
[Assert at least one clipboard data variant is provided]: {{site.repo.flutter}}/pull/122446
