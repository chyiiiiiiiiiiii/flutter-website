---
title: 將 useDeleteButtonTooltip 遷移至 Chips 的 deleteButtonTooltipMessage
description: >
  已淘汰帶有刪除按鈕的 chips 的 useDeleteButtonTooltip，
  請改用 deleteButtonTooltipMessage。
---

{% render docs/breaking-changes.md %}

## 摘要

在任何帶有刪除按鈕的 chip 上使用 `useDeleteButtonTooltip`
會出現淘汰（deprecation）警告，或在引用時已不存在。這包括
`Chip`、`InputChip` 和 `RawChip` 元件 (Widgets)。

## 背景

`Chip`、`InputChip` 和 `RawChip` 元件 (Widgets) 的 `useDeleteButtonTooltip`
已被淘汰，建議改用 `deleteButtonTooltipMessage`，因為後者可以用來停用 chip 刪除按鈕的提示訊息（tooltip）。

## 變更說明

`deleteButtonTooltipMessage` 屬性可為 chip 元件 (Widgets) 的刪除按鈕提示訊息（tooltip）提供內容。
隨後，進行了變更：若為此屬性提供空字串，則會停用該提示訊息。

為了避免 API 冗餘，此次變更淘汰了為此功能而設計的 `useDeleteButtonTooltip`。
若你曾明確停用提示訊息，[Flutter 修正工具][Flutter fix]
可協助你將現有程式碼從 `useDeleteButtonTooltip` 遷移至
`deleteButtonTooltipMessage`。

## 遷移指南

預設情況下，刪除按鈕的提示訊息（tooltip）始終啟用。
若要明確停用提示訊息，請為 `deleteButtonTooltipMessage` 屬性提供空字串。
以下程式碼片段展示了遷移前後的差異，適用於
`Chip`、`InputChip` 和 `RawChip` 元件 (Widgets)：

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
進入穩定版：3.0.0

## 參考資料

API 文件：

* [`Chip`][`Chip`]
* [`InputChip`][`InputChip`]
* [`RawChip`][`RawChip`]

相關 PR：

* [Deprecate `useDeleteButtonTooltip` for Chips][Deprecate `useDeleteButtonTooltip` for Chips]

[`Chip`]: {{site.api}}/flutter/material/Chip-class.html
[`InputChip`]: {{site.api}}/flutter/material/InputChip-class.html
[`RawChip`]: {{site.api}}/flutter/material/RawChip-class.html

[Deprecate `useDeleteButtonTooltip` for Chips]: {{site.repo.flutter}}/pull/96174
[Flutter fix]: /tools/flutter-fix
