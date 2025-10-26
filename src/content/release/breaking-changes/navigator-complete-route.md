---
title: 當 Route 從堆疊中移除時，相關的 Future 必須完成
description: >
  在此重大變更之前，由 Navigator 建立並等待結果的 Route，
  如果是被移除而非被彈出（pop），則其相關的 Future 可能永遠不會完成。
---

{% render docs/breaking-changes.md %}

## 摘要

當 Route 被推入（push）時，開發者可以等待（await）它，以便在 Route 被彈出（pop）時收到通知。然而，當 Route 被移除（remove）時，這個機制並未生效，因為相關的 Future 從未被完成。

## 背景

所有呼叫 `remove` 的 Navigator 方法都存在這個問題。透過使用 `complete`，
此問題已被正確解決，讓開發者可以傳遞結果。

## 變更說明

所有 Navigator 方法現已更新，不再呼叫 `remove`，而是改為
使用 `complete`。內容選單（context menus）現在會從 `contextMenuBuilder`
參數建立。

所有直接使用 `complete` 的方法，現在都接受一個可選的 `result`
參數，以便將其傳回給相關的 Future。其他間接使用 `remove` 的方法，目前會回傳 `null`。未來，我們可能會為這些方法擴充一個可選的 callback 函式，讓開發者能在間接情境（例如 `removeUntil`）中處理 pop 邏輯。

在此 PR 之前，下列方法無法回傳結果：

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

如果你實作了 `RouteTransitionRecord` 並且使用了 `markForRemove`，
你現在需要改用 `markForComplete`。`markForRemove` 現已被棄用。

對於其他開發者，則無需進行任何更動。Navigator 仍會如預期運作，並且具備新的功能。

## 時程

合併於版本：3.31.0-0.0.pre<br>  
正式版本：3.32

## 參考資料

### API 文件：

* [`RouteTransitionRecord`]({{site.api}}/flutter/widgets/RouteTransitionRecord-class.html)
* [`Navigator`]({{site.api}}/flutter/widgets/Navigator-class.html)

### 相關議題：

* [removeRoute unresolved future]({{site.repo.flutter}}/issues/157505)

### 相關 PR：

* [feat: removeRoute now calls didComplete]({{site.repo.flutter}}/pull/157725)
