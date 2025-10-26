---
title: Route transition record 和 transition delegate 的更新
description: >
  關於 transition delegate 如何解析路由轉場的規則變更。
---

{% render docs/breaking-changes.md %}

## 摘要

在 route transition record 中新增了一個布林值 getter `isWaitingForExitingDecision`，
而 getter `isEntering` 則被重新命名為 `isWaitingForEnteringDecision`。
在 transition delegate 的 `resolve()` 方法中，
請使用 `isWaitingForExitingDecision` 來檢查一個即將離開的 Route
是否真的需要明確決定如何從螢幕上移除。
如果你試圖對一個 _並未_ 等待決策的現有 Route 做出決策，
Flutter 會拋出 assertion error（斷言錯誤）。

## 背景說明

當 Navigator 收到新的 page 清單時，會嘗試將目前的 Route 堆疊
更新為與該清單一致。不過，這需要明確決定
如何將 Route 轉場進入或離開螢幕。
過去，所有不在新清單中的 Route 都需要決定
如何離開螢幕。但後來我們發現，這並非總是如此。
如果一個 Route 已經被 pop，
但仍在等待 pop 動畫（Animation）結束，
這個 Route 會暫時留在 Navigator 的 Route 堆疊中，
直到動畫完成。如果這期間發生 page 更新，
這個 Route 雖然離開了，但不需要決定
如何從螢幕上移除。因此，
新增了 `isWaitingForExitingDecision` 來涵蓋這種情境。

getter `isEntering` 也被重新命名為
`isWaitingForEnteringDecision`，讓名稱更具描述性，
同時提升命名的一致性。

## 遷移指南

如果你有自行實作 transition delegate，請在
對即將離開的 Route 呼叫 `markForPop`、`markForComplete` 或 `markForRemove` 之前，
務必先透過 getter `isWaitingForExitingDecision` 進行檢查。
同時，也需要將所有 `isEntering` 的參考
改為 `isWaitingForEnteringDecision`。

遷移前的程式碼：

```dart
import 'package:flutter/widgets.dart';

class NoAnimationTransitionDelegate extends TransitionDelegate<void> {
  @override
  Iterable<RouteTransitionRecord> resolve({
    List<RouteTransitionRecord> newPageRouteHistory,
    Map<RouteTransitionRecord, RouteTransitionRecord> locationToExitingPageRoute,
    Map<RouteTransitionRecord, List<RouteTransitionRecord>> pageRouteToPagelessRoutes,
  }) {
    final List<RouteTransitionRecord> results = <RouteTransitionRecord>[];

    for (final RouteTransitionRecord pageRoute in newPageRouteHistory) {
      if (pageRoute.isEntering) {
        pageRoute.markForAdd();
      }
      results.add(pageRoute);

    }
    for (final RouteTransitionRecord exitingPageRoute in locationToExitingPageRoute.values) {
      exitingPageRoute.markForRemove();
      final List<RouteTransitionRecord> pagelessRoutes = pageRouteToPagelessRoutes[exitingPageRoute];
      if (pagelessRoutes != null) {
        for (final RouteTransitionRecord pagelessRoute in pagelessRoutes) {
          pagelessRoute.markForRemove();
        }
      }
      results.add(exitingPageRoute);

    }
    return results;
  }
}
```

遷移後的程式碼：

```dart
import 'package:flutter/widgets.dart';

class NoAnimationTransitionDelegate extends TransitionDelegate<void> {
  @override
  Iterable<RouteTransitionRecord> resolve({
    List<RouteTransitionRecord> newPageRouteHistory,
    Map<RouteTransitionRecord, RouteTransitionRecord> locationToExitingPageRoute,
    Map<RouteTransitionRecord, List<RouteTransitionRecord>> pageRouteToPagelessRoutes,
  }) {
    final List<RouteTransitionRecord> results = <RouteTransitionRecord>[];

    for (final RouteTransitionRecord pageRoute in newPageRouteHistory) {
      // Renames isEntering to isWaitingForEnteringDecision.
      if (pageRoute.isWaitingForEnteringDecision) {
        pageRoute.markForAdd();
      }
      results.add(pageRoute);

    }
    for (final RouteTransitionRecord exitingPageRoute in locationToExitingPageRoute.values) {
      // Checks the isWaitingForExitingDecision before calling the markFor methods.
      if (exitingPageRoute.isWaitingForExitingDecision) {
        exitingPageRoute.markForRemove();
        final List<RouteTransitionRecord> pagelessRoutes = pageRouteToPagelessRoutes[exitingPageRoute];
        if (pagelessRoutes != null) {
          for (final RouteTransitionRecord pagelessRoute in pagelessRoutes) {
            pagelessRoute.markForRemove();
          }
        }
      }
      results.add(exitingPageRoute);

    }
    return results;
  }
}
```

## 時程

納入版本：1.18.0<br>  
穩定版發佈：1.20

## 參考資料

API 文件：

* [`Navigator`][`Navigator`]
* [`TransitionDelegate`][`TransitionDelegate`]
* [`RouteTransitionRecord`][`RouteTransitionRecord`]

相關議題：

* [Issue 45938: Navigator 2.0][Issue 45938: Navigator 2.0]

相關 PR：

* [PR 55998][PR 55998]：修正當仍有 Route 等待時，Navigator 頁面更新發生的崩潰問題
  

[Issue 45938: Navigator 2.0]: {{site.repo.flutter}}/issues/45938
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[PR 55998]: {{site.repo.flutter}}/pull/55998
[`TransitionDelegate`]: {{site.api}}/flutter/widgets/TransitionDelegate-class.html
[`RouteTransitionRecord`]: {{site.api}}/flutter/widgets/RouteTransitionRecord-class.html
