---
title: 狀態管理的多種方法
short-link: State-management approaches
breadcrumb: 方法
description: >-
  介紹在 Flutter 應用程式中管理狀態的不同方法。
prev:
  title: 簡單應用程式狀態管理
  path: /data-and-backend/state-mgmt/simple
---

狀態管理是一個複雜的主題。
如果你覺得有些問題還沒有獲得解答，
或是這些頁面所描述的方法
不適用於你的使用情境，那你很可能是對的。

你可以從以下資源獲得更多資訊，
其中許多內容來自 Flutter 社群的貢獻。

## 概覽

在選擇方法之前，建議先檢視以下內容。

* [狀態管理簡介][Introduction to state management]，
  這是本節的開頭
  （如果你是直接來到本「方法選擇」頁面，
  而錯過了前面的內容）
* [Pragmatic State Management in Flutter][Pragmatic State Management in Flutter]，
  Google I/O 2019 的一支影片
* [Flutter Architecture Samples][Flutter Architecture Samples]，作者 Brian Egan

[Flutter Architecture Samples]: https://fluttersamples.com/
[Introduction to state management]: /data-and-backend/state-mgmt/intro
[Pragmatic State Management in Flutter]: {{site.yt.watch}}?v=d_m5csmrf7I

## 內建方法

### `setState`

這是用於元件（Widget）專屬、短暫狀態的低階方法。

* [為你的 Flutter 應用程式加入互動性][Adding interactivity to your Flutter app]，Flutter 教學
* [Google Flutter 的基本狀態管理][Basic state management in Google Flutter]，作者 Agung Surya

[Adding interactivity to your Flutter app]: /ui/interactivity
[Basic state management in Google Flutter]: {{site.medium}}/@agungsurya/basic-state-management-in-google-flutter-6ee73608f96d

<a id="valuenotifier-inheritednotifier" aria-hidden="true"></a>

### `ValueNotifier` 與 `InheritedNotifier`

這種方法僅使用 Flutter 提供的 API
來更新狀態並通知 UI 變更。

* [使用 ValueNotifier 和 InheritedNotifier 進行狀態管理][State Management using ValueNotifier and InheritedNotifier]，作者 Tadas Petra

[State Management using ValueNotifier and InheritedNotifier]: https://www.hungrimind.com/articles/flutter-state-management

<a id="inheritedwidget-inheritedmodel" aria-hidden="true"></a>

### `InheritedWidget` 與 `InheritedModel`

這是用於在元件樹中
祖先與子元件之間溝通的低階方法。
`package:provider` 以及許多其他方法的底層實作都會用到這個機制。

以下這支由講師帶領的影片工作坊，介紹如何使用 `InheritedWidget`：

{% ytEmbed 'LFcGPS6cGrY', 'How to manage application state using inherited widgets' %}

其他實用文件包括：

* [InheritedWidget 文件][InheritedWidget docs]
* [使用 InheritedWidgets 管理 Flutter 應用程式狀態][Managing Flutter Application State With InheritedWidgets]，
  作者 Hans Muller
* [Inheriting Widgets][Inheriting Widgets]，作者 Mehmet Fidanboylu
* [有效運用 Flutter Inherited Widgets][Using Flutter Inherited Widgets Effectively]，作者 Eric Windmill
* [Widget - State - Context - InheritedWidget][Widget - State - Context - InheritedWidget]，作者 Didier Bolelens

[InheritedWidget docs]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Inheriting Widgets]: {{site.medium}}/@mehmetf_71205/inheriting-widgets-b7ac56dbbeb1
[Managing Flutter Application State With InheritedWidgets]: {{site.flutter-medium}}/managing-flutter-application-state-with-inheritedwidgets-1140452befe1
[Using Flutter Inherited Widgets Effectively]: https://ericwindmill.com/articles/inherited_widget/
[Widget - State - Context - InheritedWidget]: https://www.didierboelens.com/2018/06/widget---state---context---inheritedwidget/

## 社群提供的套件

根據你的應用程式複雜度以及團隊偏好，
你可能會覺得採用狀態管理套件很有幫助。
狀態管理套件通常能協助減少樣板程式碼、
提供專門的除錯工具，並有助於
建立更清晰且一致的應用程式架構。

Flutter 社群提供了各式各樣的狀態管理套件。
最適合你應用程式的選擇，通常取決於應用程式的複雜度、
團隊的偏好，以及你需要解決的具體問題。

想要開始探索可用的選項，
可以前往 pub.dev 網站上的 [`#state-management`][`#state-management`]{: target="_blank"} 主題，
並進一步篩選，找到符合你需求的套件。

<div class="card-grid">
  <a class="card outlined-card" href="{{site.pub}}/packages?q=topic%3Astate-management" target="_blank">
    <div class="card-header">
      <span class="card-title">
        <span>狀態管理套件</span>
        <span class="material-symbols" aria-hidden="true" style="font-size: 1rem;" translate="no">open_in_new</span>
      </span>
    </div>
    <div class="card-content">
      <p>探索由 Flutter 社群打造、為 Flutter 社群設計的多種狀態管理套件。</p>
    </div>
  </a>
</div>

:::tip
如果你開發了一個
你認為對 Flutter 社群有幫助的狀態管理套件，
歡迎[新增 `state-management` 主題][pub-topics]，
並[將套件發佈][pub-publish]到 pub.dev。
:::

[`#state-management`]: {{site.pub}}/packages?q=topic%3Astate-management
[pub-topics]: {{site.dart-site}}/tools/pub/pubspec#topics
[pub-publish]: {{site.dart-site}}/tools/pub/publishing
