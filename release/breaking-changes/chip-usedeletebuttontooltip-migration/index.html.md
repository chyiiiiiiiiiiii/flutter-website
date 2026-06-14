# 將 useDeleteButtonTooltip 遷移至 Chips 的 deleteButtonTooltipMessage

> 已淘汰具備刪除按鈕的 chips 的 useDeleteButtonTooltip， 請改用 deleteButtonTooltipMessage。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

在任何具有刪除按鈕的 chip 上使用 `useDeleteButtonTooltip`，都會出現淘汰（deprecation）警告，或在被引用時已不存在。這包括 `Chip`、`InputChip` 和 `RawChip` 元件 (Widget)。

## 背景

`Chip`、`InputChip` 和 `RawChip` 元件 (Widget) 的 `useDeleteButtonTooltip`
已被淘汰，建議改用 `deleteButtonTooltipMessage`，因為後者可用於停用 chip 刪除按鈕的提示工具（tooltip）。

## 變更說明

`deleteButtonTooltipMessage` 屬性可為 chip 元件的刪除按鈕提示工具（tooltip）提供訊息。
隨後，進行了調整，若此屬性設為空字串，則會停用該提示工具。

為避免 API 冗餘，此次變更淘汰了原本專為此功能設計的 `useDeleteButtonTooltip`。如需協助將現有程式碼從 `useDeleteButtonTooltip` 遷移至 `deleteButtonTooltipMessage`（特別是你有明確停用提示工具的情境），可使用 [Flutter fix][]。

## 遷移指南

預設情況下，刪除按鈕的提示工具（tooltip）始終啟用。
若需明確停用提示工具，請將 `deleteButtonTooltipMessage` 屬性設為空字串。
下方程式碼片段展示了遷移前後的差異，適用於 `Chip`、`InputChip` 和 `RawChip` 元件：

遷移前的程式碼：

```dart
Chip(
  label: const Text('Disabled delete button tooltip'),
  onDeleted: _handleDeleteChip,
  useDeleteButtonTooltip: false,
);

RawChip(
  label: const Text('Enabled delete button tooltip'),
  onDeleted: _handleDeleteChip,
  useDeleteButtonTooltip: true,
);
```

遷移後的程式碼：

```dart
Chip(
  label: const Text('Disabled delete button tooltip'),
  onDeleted: _handleDeleteChip,
  deleteButtonTooltipMessage: '',
);

RawChip(
  label: const Text('Enabled delete button tooltip'),
  onDeleted: _handleDeleteChip,
);
```

## 時程

合併於版本：2.11.0-0.1.pre<br>
進入穩定版本：3.0.0

## 參考資料

API 文件：

* [`Chip`][]
* [`InputChip`][]
* [`RawChip`][]

相關 PR：

* [Deprecate `useDeleteButtonTooltip` for Chips][]

[`Chip`]: https://api.flutter.dev/flutter/material/Chip-class.html
[`InputChip`]: https://api.flutter.dev/flutter/material/InputChip-class.html
[`RawChip`]: https://api.flutter.dev/flutter/material/RawChip-class.html

[Deprecate `useDeleteButtonTooltip` for Chips]: https://github.com/flutter/flutter/pull/96174
[Flutter fix]: /tools/flutter-fix

