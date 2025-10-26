---
title: 帶有 action 的 SnackBar 不再自動關閉
description: >-
  帶有 action 按鈕的 SnackBar 現在預設不會自動關閉，除非使用者手動關閉。
---

{% render docs/breaking-changes.md %}

## 摘要

帶有 action 的 [`SnackBar`][`SnackBar`] 的預設行為已經變更。過去，帶有 action 的 `SnackBar` 在啟用 talkback 時不會自動關閉。
現在，所有帶有 action 的 `SnackBar` 預設都會維持在螢幕上，直到使用者與 action 按鈕互動為止。

## 背景說明

帶有 action 按鈕的 `SnackBar` 現在被視為需要使用者互動的較持久通知。這項變更提升了無障礙性與使用者體驗，確保重要通知會一直顯示在螢幕上，直到被確認。

## 變更說明

這項變更符合 Material 3 設計規範對 `SnackBar` 的要求：
* 舊行為：帶有 action 按鈕的 `SnackBar` 會在一段時間後自動關閉，除非啟用 talkback。
* 新行為：帶有 action 按鈕的 `SnackBar` 不會自動關閉；它會一直顯示在螢幕上，直到使用者手動關閉。

若需覆寫此行為，已在 `SnackBar` 中新增了可選的 `persist` 屬性。
當 `persist` 為 true 時，`SnackBar` 不會自動關閉，並會一直顯示在螢幕上，直到使用者手動關閉。若為 false，`SnackBar` 會在標準時間後自動關閉，不論是否有 action。若為 null，`SnackBar` 則會遵循預設行為：若有 action 則不會自動關閉。

## 移轉指南

若要讓帶有 action 的 SnackBar 恢復舊有的自動關閉行為，請將 `persist` 設為 false。

移轉前的程式碼：

```dart
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: const Text('This is a snackbar with an action.'),
    action: SnackBarAction(
      label: 'Action',
      onPressed: () {
        // Perform some action
      },
    ),
  ),
);
```

遷移後的程式碼：

```dart
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: const Text('This is a snackbar with an action.'),
    persist: false, // Add this line to restore auto-dismiss behavior
    action: SnackBarAction(
      label: 'Action',
      onPressed: () {
        // Perform some action
      },
    ),
  ),
);
```

## 時程

納入版本：TBD  
穩定版釋出：TBD

## 參考資料

API 文件：

* [`SnackBar`][`SnackBar`]

相關 PR：

* [SnackBar with action no longer auto-dismisses][SnackBar with action no longer auto-dismisses]

[`SnackBar`]: {{site.api}}/flutter/material/SnackBar-class.html

[SnackBar with action no longer auto-dismisses]: {{site.repo.flutter}}/pull/173084
