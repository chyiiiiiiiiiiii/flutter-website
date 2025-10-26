---
title: 導航與路由
description: Flutter 導航與路由功能總覽
---

Flutter 提供了一套完整的系統，用於在不同畫面間導航並處理深層連結（deep links）。對於沒有複雜深層連結需求的小型應用程式，可以使用 [`Navigator`][`Navigator`]；而如果您的應用程式有特定的深層連結與導航需求，則建議同時使用 [`Router`][`Router`]，以正確處理 Android 與 iOS 上的深層連結，並在應用程式於網頁端執行時，保持與網址列（address bar）的同步。

若要設定您的 Android 或 iOS 應用程式以支援深層連結，請參考 [Deep linking][Deep linking]。

## 使用 Navigator

`Navigator` 元件（Widget）會以堆疊（stack）方式顯示畫面，並根據目標平台呈現正確的轉場動畫。若要導向至新畫面，可透過路由的 `BuildContext` 取得 `Navigator`，並呼叫像是 `push()`、`or pop()` 等命令式方法：

<?code-excerpt "ui/navigation/lib/navigator_basic.dart (push-route)"?>
```dart
child: const Text('Open second screen'),
onPressed: () {
  Navigator.of(context).push(
    MaterialPageRoute<void>(
      builder: (context) => const SecondScreen(),
    ),
  );
},
```

由於 `Navigator` 維持著一個 `Route` 物件的堆疊（代表歷史堆疊），`push()` 方法同樣會接收一個 `Route` 物件。`MaterialPageRoute` 物件是 `Route` 的子類別，專門用來指定 Material Design 的轉場動畫。若要查看更多 `Navigator` 的使用範例，請參考 Flutter Cookbook 的 [navigation recipes][navigation recipes] 或瀏覽 [Navigator API 文件][`Navigator`]。

## 使用命名路由

:::note
我們不建議大多數應用程式使用命名路由。
更多資訊請參閱下方的「限制」章節。
:::

如果應用程式的導覽與深度連結需求較為簡單，可以使用 `Navigator` 來進行導覽，以及利用 [`MaterialApp.routes`][`MaterialApp.routes`] 參數來處理深度連結：

<?code-excerpt "ui/navigation/lib/navigator_named_routes.dart (push-route)"?>
```dart
child: const Text('Open second screen'),
onPressed: () {
  Navigator.pushNamed(context, '/second');
},
```

`/second` 代表在 `MaterialApp.routes` 清單中宣告的 _命名路由_。完整範例請參考 Flutter Cookbook 的 [Navigate with named routes][Navigate with named routes] 教學。

### 限制

雖然命名路由可以處理深層連結（deep links），但其行為始終相同，無法自訂。當平台收到新的深層連結時，無論使用者目前所在位置，Flutter 都會在 Navigator 上推送一個新的 `Route`。

此外，Flutter 目前不支援在使用命名路由的應用程式中使用瀏覽器的前進按鈕。因此，我們不建議在大多數應用程式中使用命名路由。

## 使用 Router

若 Flutter 應用程式有進階的導覽與路由需求（例如：網頁應用程式需要直接連結到每個畫面，或是有多個 `Navigator` 元件），建議使用像 [go_router][go_router] 這類的路由套件，能夠解析路徑並在應用程式收到新深層連結時設定 `Navigator`。

要使用 Router，請在 `MaterialApp` 或 `CupertinoApp` 上切換至 `router` 建構函式，並提供 `Router` 設定。路由套件（如 [go_router][go_router]）通常會提供路由設定，並可依下列方式使用：

<?code-excerpt "ui/navigation/lib/navigator_router.dart (push-route)"?>
```dart
child: const Text('Open second screen'),
onPressed: () => context.go('/second'),
```

由於像 go_router 這樣的套件是 _宣告式_ 的，因此當收到深層連結（deep link）時，總是會顯示相同的畫面。

:::note 進階開發者注意
如果你不想使用路由套件，並希望完全掌控應用程式中的導覽與路由，可以覆寫 `RouteInformationParser` 和 `RouterDelegate`。當你的應用程式狀態改變時，可以透過 `Navigator.pages` 參數，精確地以一個 `Page` 物件清單來控制畫面堆疊。更多細節請參考 `Router` API 文件。
:::

## 同時使用 Router 與 Navigator

`Router` 和 `Navigator` 設計上是可以一起運作的。你可以透過宣告式路由套件（如 `go_router`）使用 `Router` API 來導覽，或是直接在 `Navigator` 上呼叫 `push()` 和 `pop()` 等命令式方法。

當你使用 `Router` 或宣告式路由套件進行導覽時，Navigator 上的每個路由都是 _page-backed_ 的，也就是它是透過 [`Page`][`Page`] 並使用 [`pages`][`pages`] 參數在 `Navigator` 建構函式中建立的。相反地，任何透過呼叫 `Navigator.push` 或 `showDialog` 所建立的 `Route`，都會在 Navigator 中新增一個 _pageless_ 路由。如果你使用路由套件，_page-backed_ 的 Routes 永遠可以被深層連結，而 _pageless_ 路由則無法。

當一個 _page-backed_ 的 `Route` 從 `Navigator` 移除時，之後所有的 _pageless_ 路由也會一併移除。例如，如果深層連結導覽時移除了 Navigator 上的 _page-backed_ 路由，則之後（直到下一個 _page-backed_ 路由為止）的所有 _pageless_ 路由也會被移除。

:::note
你無法使用 `WillPopScope` 阻止從 page-backed 畫面進行導覽。請改為參考你所使用路由套件的 API 文件。
:::

## 網頁支援

使用 `Router` 類別的應用程式會與瀏覽器的 History API 整合，讓使用瀏覽器的返回與前進按鈕時能有一致的體驗。每當你使用 `Router` 進行導覽時，瀏覽器的歷史堆疊就會新增一個 History API 項目。按下 **返回** 按鈕時，會採用 _[reverse chronological navigation][reverse
chronological navigation]_（逆時序導覽），也就是使用者會回到先前透過 `Router` 顯示的位置。這代表如果使用者從 `Navigator` 彈出一個頁面後再按瀏覽器的 **返回** 按鈕，前一個頁面會重新推回堆疊。

## 更多資訊

若需更多有關導覽與路由的資訊，請參考以下資源：

* Flutter Cookbook 包含多個 [navigation recipes][navigation recipes]，展示如何使用 `Navigator`。
* [`Navigator`][`Navigator`] 與 [`Router`][`Router`] API 文件詳細說明如何不使用路由套件來設置宣告式導覽。
* [Understanding navigation][Understanding navigation]（Material Design 文件中的一頁），說明如何設計應用程式中的導覽，包括前進、向上和時序導覽等概念。
* [Learning Flutter's new navigation and routing system][Learning Flutter's new navigation and routing system]（Medium 文章），介紹如何直接使用 `Router` 元件（Widgets），而不透過路由套件。
* [Router design document][Router design document] 說明 `Router` API 的設計動機與架構。

[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Router`]: {{site.api}}/flutter/widgets/Router-class.html
[Deep linking]: /ui/navigation/deep-linking
[navigation recipes]: /cookbook/navigation
[`MaterialApp.routes`]: {{site.api}}/flutter/material/MaterialApp/routes.html
[Navigate with named routes]: /cookbook/navigation/named-routes
[go_router]: {{site.pub}}/packages/go_router
[`Page`]: {{site.api}}/flutter/widgets/Page-class.html
[`pages`]: {{site.api}}/flutter/widgets/Navigator/pages.html
[reverse chronological navigation]: https://material.io/design/navigation/understanding-navigation.html#reverse-navigation
[Understanding navigation]: https://material.io/design/navigation/understanding-navigation.html
[Learning Flutter's new navigation and routing system]: {{site.medium}}/flutter/learning-flutters-new-navigation-and-routing-system-7c9068155ade
[Router design document]: {{site.main-url}}/go/navigator-with-router
