---
title: Route 和 Navigator 重構
description: >
  Route 和 Navigator 類別的部分 API 及函式簽章已經變更。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`Route` 類別不再於 overlay 中管理其 overlay entries，且其 `install()` 方法不再具有 `insertionPoint` 參數。
`RouteSetting` 中的 `isInitialRoute` 屬性已被棄用，`Navigator.pop()` 也不再回傳任何值。

## 背景

我們重構了 navigator API，以因應新的 page API 以及 [Router][] 設計文件中所提到的 `Router` 元件 (Widget) 的導入。
這次重構帶來了一些函式簽章的變更，目的是讓現有的 navigator API 能夠繼續與新的 page API 搭配運作。

## 變更說明

`Navigator.pop()` 的布林值回傳結果定義不明確，且使用者可透過呼叫 `Navigator.canPop()` 達到相同效果。
由於 `Navigator.canPop()` 的 API 定義較為明確，因此我們簡化了 `Navigator.pop()`，使其不再回傳布林值。

另一方面，navigator 需要能夠手動調整 overlay 中的 entries，以便使用者在新 API 下變更路由歷史紀錄。
我們調整為 route 僅負責建立與銷毀其 overlay entries，而 navigator 則負責將 overlay entries 插入或移除 overlay。
同時，我們也移除了 `Route.install()` 的 `insertionPoint` 參數，因為在這次變更後已經不再需要。

最後，作為重構的一部分，我們從 `RouteSetting` 移除了 `isInitialRoute` 屬性，並提供了 `onGenerateInitialRoutes` API 以便完全掌控初始路由的產生。

## 遷移指南

情境 1：應用程式依賴 `pop()` 回傳布林值。

```dart
TextField(
  onTap: () {
    if (Navigator.pop(context))
      print('There still is at least one route after pop');
    else
      print('Oops! No more routes.');
  }
)
```

你可以將 `Navigator.canPop()` 與 `Navigator.pop()` 結合使用，以達到相同的效果。

```dart
TextField(
  onTap: () {
    if (Navigator.canPop(context))
      print('There still is at least one route after pop');
    else
      print('Oops! No more routes.');
    // Our navigator pops the route anyway.
    Navigator.pop(context);
  }
)
```

情境 2：應用程式根據 `isInitialRoute` 產生路由。

```dart
MaterialApp(
  onGenerateRoute: (RouteSetting setting) {
    if (setting.isInitialRoute)
      return FakeSplashRoute();
    else
      return RealRoute(setting);
  }
)
```

有多種方式可以遷移這項變更。
其中一種方式是為 `MaterialApp.initialRoute` 設定明確的值。
接著，你可以在需要 `isInitialRoute` 的地方，改為檢查這個值。
由於 `initialRoute` 的預設值是在 Flutter 的範疇之外繼承的，
因此你必須為它設定明確的值。

```dart
MaterialApp(
  initialRoute: '/', // Set this value explicitly. Default might be altered.
  onGenerateRoute: (RouteSetting setting) {
    if (setting.name == '/')
      return FakeSplashRoute();
    else
      return RealRoute(setting);
  }
)
```

如果有更複雜的使用情境，
你可以在 `MaterialApp` 或 `CupertinoApp` 中使用新的 API `onGenerateInitialRoutes`。

```dart
MaterialApp(
  onGenerateRoute: (RouteSetting setting) {
    return RealRoute(setting);
  },
  onGenerateInitialRoutes: (String initialRouteName) {
    return <Route>[FakeSplashRoute()];
  }
)
```

## 時程

合併於版本：1.16.3<br>
正式版本釋出：1.17

## 參考資料

設計文件：

* [Router][]

API 文件：

* [`Route`][]
* [`Route.install`][]
* [`RouteSetting.isInitialRoute`][]
* [`Navigator`][]
* [`Navigator.pop`][]
* [`Navigator.canPop`][]

相關議題：

* [Issue 45938: Router][]

相關 PR：

* [PR 44930][] - 重構命令式 API 以支援新導覽系統


[Issue 45938: Router]: {{site.repo.flutter}}/issues/45938
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Navigator.pop`]: {{site.api}}/flutter/widgets/Navigator/pop.html
[`Navigator.canPop`]: {{site.api}}/flutter/widgets/Navigator/canPop.html
[Router]: /go/navigator-with-router
[PR 44930]: {{site.repo.flutter}}/pull/44930
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[`Route.install`]: {{site.api}}/flutter/widgets/Route/install.html
[`RouteSetting.isInitialRoute`]: {{site.api}}/flutter/widgets/RouteSettings/isInitialRoute.html
