# 帶有 action 的 SnackBar 不再自動關閉

> 帶有 action 按鈕的 SnackBar 現在預設不會自動關閉，除非使用者手動關閉。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

[`SnackBar`][] 帶有 action 的預設行為已經變更。
先前，帶有 action 的 `SnackBar` 如果啟用了 talkback，則不會自動關閉。
現在，所有帶有 action 的 `SnackBar` 元件 (Widget) 預設都會處於不可自動關閉的狀態，直到使用者與 action 按鈕互動為止。

## 背景

帶有 action 按鈕的 `SnackBar` 現在被視為需要使用者互動的較持久通知。
這項變更提升了無障礙性與使用者體驗，確保重要通知會一直顯示在螢幕上，直到被確認為止。

## 變更說明

這項變更與 Material 3 設計規範中的 `SnackBar` 元件行為一致：

* 舊行為：帶有 action 按鈕的 `SnackBar` 會在一段時間後自動關閉，除非啟用了 talkback。
* 新行為：帶有 action 按鈕的 `SnackBar` 不會自動關閉；它會一直顯示在螢幕上，直到使用者手動關閉。

為了覆寫這個行為，`SnackBar` 新增了一個可選的 `persist` 屬性。
當 `persist` 為 `true` 時，`SnackBar` 不會自動關閉，並會一直顯示在螢幕上，直到使用者手動關閉。
當為 `false` 時，`SnackBar` 會在標準顯示時間後自動關閉，不論是否有 action。
若為 `null`，`SnackBar` 則會遵循預設行為——即帶有 action 時不會自動關閉。

## 遷移指南

若要恢復舊有帶有 action 的 SnackBar 自動關閉行為，請將 `persist` 設為 `false`。

遷移前的程式碼：

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

```dart highlightLines=4
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

納入版本：3.37.0-0.0.pre
穩定版本釋出：3.38

## 參考資料

API 文件：

* [`SnackBar`][]

相關 PR：

* [SnackBar with action no longer auto-dismisses][]

[`SnackBar`]: https://api.flutter.dev/flutter/material/SnackBar-class.html

[SnackBar with action no longer auto-dismisses]: https://github.com/flutter/flutter/pull/173084

