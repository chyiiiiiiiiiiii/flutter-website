# 深度連結

> 當應用程式收到新的 URL 時，導向至對應的路由。



深層連結（deep links）是指不僅能開啟應用程式，還能將使用者導向應用程式內部特定位置的連結。例如，來自一則運動鞋廣告的深層連結可能會開啟購物應用程式，並直接顯示該雙鞋子的商品頁面。

Flutter 在 iOS、Android 以及網頁上皆支援深度連結。開啟一個 URL 會在你的應用程式中顯示對應的螢幕。透過以下步驟，你可以使用命名路由（named routes）（可透過 [`routes`][routes] 參數或 [`onGenerateRoute`][onGenerateRoute]），或是使用 [`Router`][Router] 元件（Widget）來啟動並顯示路由。

:::note
大多數應用程式已不再建議使用命名路由（named routes）。詳情請參閱 [navigation overview][navigation overview] 頁面中的 [Limitations][]。
:::

[Limitations]: /ui/navigation#limitations
[navigation overview]: /ui/navigation

如果你在網頁瀏覽器中執行應用程式，則無需額外設定。路由路徑的處理方式與 iOS 或 Android 的深層連結相同。預設情況下，網頁應用程式會從 URL 的 hash fragment（雜湊片段）讀取深層連結路徑，使用的模式為：`/#/path/to/app/screen`，但你可以透過[設定 URL 策略][configuring the URL strategy]來變更此行為。

如果你偏好視覺化學習，歡迎觀看以下影片：

<YouTubeEmbed id="KNAb2XL7k2g" title="Deep linking in Flutter"></YouTubeEmbed>

## 開始使用 {:#get-started}

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

## 從基於插件的深度連結遷移

如果你曾經依照 [Deep Links and Flutter applications][plugin-linking]（Medium 上的免費文章）撰寫插件來處理深層連結，則應該停用 Flutter 預設的深層連結處理器。你可以在 `Info.plist` 中將 `FlutterDeepLinkingEnabled` 設為 false，_或_ 在 `AndroidManifest.xml` 中將 `flutter_deeplinking_enabled` 設為 false。

## 行為說明

根據平台以及應用程式是否已啟動，行為會略有不同。

| 平台 / 情境                | 使用 Navigator                                                      | 使用 Router                                                                                                                                                                                                     |
|----------------------------|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| iOS（未啟動）              | 應用程式會取得 initialRoute（"/"），並在短時間後收到 pushRoute        | 應用程式會取得 initialRoute（"/"），並在短時間後使用 RouteInformationParser 解析路由，然後呼叫 RouterDelegate.setNewRoutePath，將對應的 Page 設定給 Navigator。                                                 |
| Android（未啟動）          | 應用程式會取得包含路由（"/deeplink"）的 initialRoute                | 應用程式會取得 initialRoute（"/deeplink"），並傳遞給 RouteInformationParser 解析路由，然後呼叫 RouterDelegate.setNewRoutePath，將對應的 Pages 設定給 Navigator。                                               |
| iOS（已啟動）              | 會呼叫 pushRoute                                                    | 路徑會被解析，並以新的 Pages 集合設定 Navigator。                                                                                                                         |
| Android（已啟動）          | 會呼叫 pushRoute                                                    | 路徑會被解析，並以新的 Pages 集合設定 Navigator。                                                                                                                         |

{:.table .table-striped}

當你使用 [`Router`][Router] 元件（Widget）時，應用程式在執行期間若開啟新的深層連結，可以直接替換目前的 Pages 集合。

## 深入瞭解

* [Learning Flutter's new navigation and routing system][] 介紹 Router 系統的基礎。
* [Deep dive into Flutter deep linking][io-dl] —— 來自 Google I/O 2023 的影片
* [Flutter Deep Linking: The Ultimate Guide][]，逐步教學如何在 Flutter 中實作深層連結。

[io-dl]: https://www.youtube.com/watch?v=6RxuDcs6jVw&t=3s
[Learning Flutter's new navigation and routing system]: https://blog.flutter.dev/learning-flutters-new-navigation-and-routing-system-7c9068155ade
[routes]: https://api.flutter.dev/flutter/material/MaterialApp/routes.html
[onGenerateRoute]: https://api.flutter.dev/flutter/material/MaterialApp/onGenerateRoute.html
[Router]: https://api.flutter.dev/flutter/widgets/Router-class.html
[plugin-linking]: https://medium.com/flutter-community/deep-links-and-flutter-applications-how-to-handle-them-properly-8c9865af9283
[Flutter Deep Linking: The Ultimate Guide]: https://codewithandrea.com/articles/flutter-deep-links/

[configuring the URL strategy]: /ui/navigation/url-strategies

