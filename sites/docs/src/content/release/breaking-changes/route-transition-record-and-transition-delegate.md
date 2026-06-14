---
title: Route transition record 和 transition delegate 更新
description: >
  關於 transition delegate 如何解析路由轉場的規則變更。
---

{% render "docs/breaking-changes.md" %}

## 摘要

在 route transition record 中新增了一個布林值 getter `isWaitingForExitingDecision`，
並且將 `isEntering` getter 改名為 `isWaitingForEnteringDecision`。
在 transition delegate 的 `resolve()` 方法中，
請使用 `isWaitingForExitingDecision` 來檢查一個即將離開的 Route
是否真的需要明確決定如何從螢幕上移除。
如果你嘗試對一個「不需要等待決策」的既有 Route 做出決策，
Flutter 會拋出 assertion error（斷言錯誤）。

## 背景說明

當 Navigator 收到新的 pages 清單時，會嘗試將目前的 routes stack
同步至該清單。不過，這需要明確決定每個 Route 要如何進入或離開螢幕。
過去，所有不在新清單中的 Route 都需要決定如何離開螢幕。
但後來發現，這並不總是正確。如果某個 Route 已被 pop，
但仍在等待 pop 動畫結束，
這個 Route 會暫時留在 Navigator 的 routes stack 直到動畫完成。
如果這段期間發生了 page 更新，
這個 Route 會離開，但不需要決定如何從螢幕上移除。
因此，新增了 `isWaitingForExitingDecision` 來涵蓋這種情境。

同時，`isEntering` getter 也被重新命名為
`isWaitingForEnteringDecision`，讓名稱更具描述性且更一致。

## 遷移指南

如果你有自訂 transition delegate，
在呼叫 `markForPop`、`markForComplete` 或 `markForRemove` 之前，
需要先用 getter `isWaitingForExitingDecision` 檢查即將離開的 Route。
另外，也需要將所有 `isEntering` 的參考名稱改為
`isWaitingForEnteringDecision`。

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

## 時間軸

導入版本：1.18.0<br>
穩定版本：1.20

## 參考資料

API 文件：

* [`Navigator`][]
* [`TransitionDelegate`][]
* [`RouteTransitionRecord`][]

相關議題：

* [Issue 45938: Navigator 2.0][]

相關 PR：

* [PR 55998][]：修正當仍有 Route 等待時，Navigator 頁面更新導致的閃退問題


[Issue 45938: Navigator 2.0]: {{site.repo.flutter}}/issues/45938
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[PR 55998]: {{site.repo.flutter}}/pull/55998
[`TransitionDelegate`]: {{site.api}}/flutter/widgets/TransitionDelegate-class.html
[`RouteTransitionRecord`]: {{site.api}}/flutter/widgets/RouteTransitionRecord-class.html
