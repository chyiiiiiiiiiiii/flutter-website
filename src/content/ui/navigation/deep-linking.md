---
title: 深度連結（Deep linking）
description: 當應用程式收到新的 URL 時，導向至指定路由。
---

深度連結（Deep links）是指不僅能開啟應用程式，還能將使用者導向至應用程式內部特定位置的連結。例如，一則運動鞋廣告中的深度連結可能會開啟購物應用程式，並直接顯示該雙鞋子的商品頁面。

Flutter 支援在 iOS、Android 及網頁上的深度連結。開啟 URL 時，會在您的應用程式中顯示相對應的畫面。透過以下步驟，您可以使用命名路由（named routes）（可透過 [`routes`][routes] 參數或 [`onGenerateRoute`][onGenerateRoute]），或使用 [`Router`][Router] 元件來啟動並顯示路由。

:::note
命名路由（named routes）已不再建議用於大多數應用程式。如需更多資訊，請參閱 [Limitations][Limitations]（限制）於 [navigation overview][navigation overview]（導覽總覽）頁面。
:::

[Limitations]: /ui/navigation#limitations
[navigation overview]: /ui/navigation

如果您在網頁瀏覽器中執行應用程式，則無需額外設定。路由路徑的處理方式與 iOS 或 Android 的深度連結相同。預設情況下，網頁應用程式會根據 URL fragment 使用以下模式：`/#/path/to/app/screen` 來讀取深度連結路徑，但您也可以透過 [configuring the URL strategy][configuring the URL strategy]（設定 URL 策略）來更改此行為。

如果您偏好視覺化學習方式，歡迎觀看以下影片：

{% ytEmbed 'KNAb2XL7k2g', 'Flutter 深度連結教學' %}

## 開始使用

請參考我們針對 Android 與 iOS 的教學：

<div class="card-grid">
  <a class="card outlined-card" href="/cookbook/navigation/set-up-app-links">
    <div class="card-header text-center">
      <span class="card-title">Android</span>
    </div>
  </a>
  <a class="card outlined-card" href="/cookbook/navigation/set-up-universal-links">
    <div class="card-header text-center">
      <span class="card-title">iOS</span>
    </div>
  </a>
</div>

## 從插件式深度連結遷移

如果您曾依照 [Deep Links and Flutter applications][plugin-linking]（深度連結與 Flutter 應用程式）撰寫插件來處理深度連結，(a free article on Medium)，則應停用 Flutter 預設的深度連結處理器。您可以在 `Info.plist` 中將 `FlutterDeepLinkingEnabled` 設為 false，或在 `AndroidManifest.xml` 中將 `flutter_deeplinking_enabled` 設為 false 來達成。

## 行為說明

根據平台及應用程式是否已啟動，行為會略有不同。

| 平台 / 情境               | 使用 Navigator（導覽元件）                                         | 使用 Router（路由元件）                                                                                                                                                                                    |
|--------------------------|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| iOS（未啟動）             | 應用程式取得 initialRoute（"/"），稍後收到 pushRoute                | 應用程式取得 initialRoute（"/"），稍後使用 RouteInformationParser 解析路由並呼叫 RouterDelegate.setNewRoutePath，將對應的 Page 設定至 Navigator。                                                        |
| Android（未啟動）         | 應用程式取得包含路由的 initialRoute（"/deeplink"）                  | 應用程式取得 initialRoute（"/deeplink"），並傳給 RouteInformationParser 解析路由，呼叫 RouterDelegate.setNewRoutePath，將對應的 Pages 設定至 Navigator。                                                 |
| iOS（已啟動）             | 呼叫 pushRoute                                                      | 解析路徑後，Navigator 會以新的 Pages 集合進行設定。                                                                                                                  |
| Android（已啟動）         | 呼叫 pushRoute                                                      | 解析路徑後，Navigator 會以新的 Pages 集合進行設定。                                                                                                                  |

{:.table .table-striped}

當您使用 [`Router`][Router] 元件時，應用程式可在執行期間開啟新的深度連結時，替換目前的頁面集合。

## 延伸閱讀

* [Learning Flutter's new navigation and routing system][Learning Flutter's new navigation and routing system]（認識 Flutter 新的導覽與路由系統）介紹 Router 系統。
* [Deep dive into Flutter deep linking][io-dl]（Flutter 深度連結深入解析）— Google I/O 2023 影片
* [Flutter Deep Linking: The Ultimate Guide][Flutter Deep Linking: The Ultimate Guide]（Flutter 深度連結終極指南），逐步教學如何在 Flutter 中實作深度連結。

[io-dl]: {{site.yt.watch}}?v=6RxuDcs6jVw&t=3s
[Learning Flutter's new navigation and routing system]: {{site.flutter-medium}}/learning-flutters-new-navigation-and-routing-system-7c9068155ade
[routes]: {{site.api}}/flutter/material/MaterialApp/routes.html
[onGenerateRoute]: {{site.api}}/flutter/material/MaterialApp/onGenerateRoute.html
[Router]: {{site.api}}/flutter/widgets/Router-class.html
[plugin-linking]: {{site.medium}}/flutter-community/deep-links-and-flutter-applications-how-to-handle-them-properly-8c9865af9283
[Flutter Deep Linking: The Ultimate Guide]: https://codewithandrea.com/articles/flutter-deep-links/

[configuring the URL strategy]: /ui/navigation/url-strategies
