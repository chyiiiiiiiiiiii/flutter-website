---
title: 當 Route 從堆疊中移除時，相關的 Future 必須完成
description: >
  在這項重大變更之前，由 Navigator 建立並等待結果的 Route，
  若是被移除而非被 pop，則永遠無法完成其相關的 future。
---

{% render docs/breaking-changes.md %}

## 摘要

當 Route 被推入（push）時，開發者可以等待（await）它們，以便在被 pop 時獲得通知。然而，當 Route 被移除時，這個機制並未生效，因為相關的 future 從未完成。

## 背景說明

所有呼叫 `remove` 的 Navigator 方法都存在這個問題。透過使用 `complete`，這個問題已被正確解決，讓開發者可以傳遞結果。

## 變更說明

所有 Navigator 方法現在已更新，不再呼叫 `remove`，而是改為使用 `complete`。內容選單（context menus）現在會從 `contextMenuBuilder` 參數建立。

所有直接使用 `complete` 的方法，現在都接受一個可選的 `result` 參數，以便將其回傳給相關的 future。其他間接使用 `remove` 的方法，目前會回傳 `null`。未來，我們可能會擴充這些方法，加入可選的 callback 函式，讓開發者能在間接情境（例如 `removeUntil`）中處理 pop 邏輯。

在這個 PR 之前，下列方法無法回傳結果：

```dart
Navigator.of(context).removeRoute(route);
Navigator.of(context).removeRouteBelow(route);
```

在此 PR 之後，方法可以回傳結果：

```dart
Navigator.of(context).removeRoute(route, result);
Navigator.of(context).removeRouteBelow(route, result);
```

## 遷移指南

如果你實作了 `RouteTransitionRecord` 並使用了 `markForRemove`，你現在需要改用 `markForComplete`。`markForRemove` 已經被棄用。

對於其他開發者，則不需要進行任何更動。Navigator 仍會如預期運作，並具備新的功能。

## 時程

合併於版本：3.31.0-0.0.pre<br>  
正式版釋出：3.32

## 參考資料

### API 文件：

* [`RouteTransitionRecord`]({{site.api}}/flutter/widgets/RouteTransitionRecord-class.html)
* [`Navigator`]({{site.api}}/flutter/widgets/Navigator-class.html)

### 相關議題：

* [removeRoute unresolved future]({{site.repo.flutter}}/issues/157505)

### 相關 PR：

* [feat: removeRoute now calls didComplete]({{site.repo.flutter}}/pull/157725)
