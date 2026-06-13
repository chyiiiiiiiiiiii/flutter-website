---
title: 導覽與路由
description: Flutter 導覽與路由功能總覽
---

Flutter 提供了一套完整的系統，用於在螢幕之間導覽並處理深層連結 (deep links)。如果您的應用程式較小且不需要複雜的深度連結功能，可以使用 [`Navigator`][]；而如果您的應用有特定的深度連結與導覽需求，則應同時使用 [`Router`][]，以正確處理 Android 和 iOS 上的深層連結 (deep links)，並在應用程式於網頁上運行時與網址列 (address bar) 保持同步。

若要設定您的 Android 或 iOS 應用程式以處理深層連結，請參閱 [Deep linking][]。

## 使用 Navigator

`Navigator` 元件 (Widget) 會以堆疊的方式顯示螢幕，並根據目標平台使用正確的轉場動畫。若要導覽至新螢幕，可透過路由的 `BuildContext` 取得 `Navigator`，並呼叫命令式方法，例如 `push()` `or pop()`：

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

由於 `Navigator` 維護了一個 `Route` 物件的堆疊（代表歷史堆疊），`push()` 方法同樣也會接收一個 `Route` 物件。`MaterialPageRoute` 物件是 `Route` 的子類別，專門用來指定 Material Design 的轉場動畫。若想了解更多 `Navigator` 的使用範例，請參考 Flutter Cookbook 的 [navigation recipes][] 或瀏覽 [Navigator API 文件][`Navigator`]。

## 使用命名路由（named routes）

:::note
我們不建議大多數應用程式使用命名路由（named routes）。
請改用 [go_router][]（或其他路由套件），或使用 `Navigator` 搭配 [`MaterialPageRoute`][]。
更多資訊請參閱下方的[限制說明](#limitations)。
:::

具有簡單導覽和深層連結（deep linking）需求的應用程式，可以使用 `Navigator` 來進行導覽，並透過 [`MaterialApp.routes`][] 參數處理深層連結：

<?code-excerpt "ui/navigation/lib/navigator_named_routes.dart (push-route)"?>
```dart
child: const Text('Open second screen'),
onPressed: () {
  Navigator.pushNamed(context, '/second');
},
```

`/second` 代表在 `MaterialApp.routes` 清單中宣告的 _命名路由_。完整範例請參考 Flutter Cookbook 的 [使用命名路由進行導覽][Navigate with named routes] 教學。


### 限制 {: #limitations}

雖然命名路由可以處理深層連結 (deep links)，但其行為始終相同，無法自訂。當平台收到新的深層連結時，Flutter 會在 Navigator 上推入新的 `Route`，不論使用者目前位於哪個位置。

此外，Flutter 針對使用命名路由的應用程式，並不支援瀏覽器的前進按鈕。因此，我們不建議大多數應用程式使用命名路由。請改用像 [go_router][] 這樣的路由套件，或使用 `Navigator` 搭配 [`MaterialPageRoute`][]。

## 使用 Router

如果 Flutter 應用程式有進階的導覽與路由需求（例如：網頁應用程式需直接連結至每個螢幕，或應用程式中有多個 `Navigator` 元件 (Widgets)），建議使用如 [go_router][] 這類路由套件，能夠解析路由路徑，並在應用程式收到新的深層連結時，動態設定 `Navigator`。

要使用 Router，請在 `MaterialApp` 或 `CupertinoApp` 上切換至 `router` 建構函式，並提供 `Router` 設定。像 [go_router][] 這樣的路由套件，通常會提供路由設定，並可如下使用：

<?code-excerpt "ui/navigation/lib/navigator_router.dart (push-route)"?>
```dart
child: const Text('Open second screen'),
onPressed: () => context.go('/second'),
```

由於像 go_router 這類套件是**宣告式**的，因此當收到深層連結 (deep link) 時，總是會顯示相同的螢幕。

:::note 進階開發者注意
如果你不想使用路由套件，並希望完全掌控應用程式中的導覽與路由，請覆寫 `RouteInformationParser` 和 `RouterDelegate`。當你的應用程式狀態改變時，你可以透過 `Navigator.pages` 參數，精確地以一個 `Page` 物件清單來控制螢幕堆疊。詳情請參閱 `Router` API 文件。
:::

## 同時使用 Router 與 Navigator

`Router` 和 `Navigator` 設計上是可以一起運作的。你可以透過宣告式路由套件（如 `go_router`）使用 `Router` API 來導覽，或是直接在 `Navigator` 上呼叫 `push()` 和 `pop()` 這類命令式方法。

當你使用 `Router` 或宣告式路由套件進行導覽時，Navigator 上的每個路由都是**以頁面為基礎**（page-backed），也就是它是透過 [`Page`][] 並搭配 [`pages`][] 參數於 `Navigator` 建構函式中建立的。相反地，任何透過呼叫 `Navigator.push` 或 `showDialog` 所建立的 `Route`，都會在 Navigator 上新增一個**無頁面**（pageless）的路由。如果你使用路由套件，則**以頁面為基礎**的路由永遠可以進行深層連結，而**無頁面**的路由則無法。

當一個**以頁面為基礎**的 `Route` 從 `Navigator` 移除時，之後所有**無頁面**的路由也會一併被移除。例如，若深層連結導致 Navigator 移除一個**以頁面為基礎**的路由，則該路由之後（直到下一個**以頁面為基礎**路由為止）的所有**無頁面**路由也會被移除。

:::note
你無法使用 `WillPopScope` 來阻止從以頁面為基礎的螢幕進行導覽。請改為參考你所用路由套件的 API 文件。
:::

## 網頁支援

使用 `Router` 類別的應用程式會與瀏覽器的 History API 整合，讓使用者在點擊瀏覽器的返回與前進按鈕時，獲得一致的體驗。每當你使用 `Router` 進行導覽時，瀏覽器的歷史堆疊中就會新增一個 History API 項目。按下**返回**按鈕時，會採用**反向時間順序導覽**（[reverse chronological navigation][]），也就是將使用者帶回先前透過 `Router` 顯示的位置。這表示，如果使用者從 `Navigator` 彈出一個頁面後，再按瀏覽器的**返回**按鈕，上一個頁面會再次被推回堆疊中。

## 更多資訊

若想進一步了解導覽與路由，請參考以下資源：

* Flutter cookbook 包含多個[導覽教學範例][navigation recipes]，說明如何使用 `Navigator`。
* [`Navigator`][] 與 [`Router`][] API 文件，詳細介紹如何在不使用路由套件的情況下設定宣告式導覽。
* [Understanding navigation][]（Material Design 文件頁面）說明設計應用程式導覽時的概念，包括前進、向上與時間順序導覽等解釋。
* [Learning Flutter's new navigation and routing system][]（Medium 文章），介紹如何直接使用 `Router` 元件（Widget），而不需路由套件。
* [Router design document][] 詳細說明 `Router` API 的設計動機與架構。

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
[`MaterialPageRoute`]: {{site.api}}/flutter/material/MaterialPageRoute-class.html
