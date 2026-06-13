---
title: 將 Flutter 加入現有應用程式
shortTitle: 加入現有應用
description: 將 Flutter 以函式庫方式加入現有 Android、iOS、macOS 或 Web 應用程式。
---

## 加入現有應用（Add-to-app）

如果你是從零開始撰寫新應用程式，使用 Flutter [快速開始][get started] 非常簡單。但如果你已經有一個不是用 Flutter 撰寫的應用，且無法從頭重做，該怎麼辦？

針對這種情境，Flutter 支援以模組（module）方式逐步整合到你的現有應用中。這項功能稱為「加入現有應用（add-to-app）」。你可以將 Flutter 模組匯入現有應用，讓應用的部分畫面由 Flutter 負責渲染，其餘部分則繼續使用原有技術。這種方式也可用於執行共用的非 UI 邏輯，善用 Dart 的可攜性與與其他語言的互通性。

目前，加入現有應用功能支援 Android、iOS、macOS 及 Web。

Flutter 支援兩種加入現有應用的模式：

- **多引擎（Multi-engine）**：支援於 Android、iOS 和 macOS，允許執行一個或多個 Flutter 實例，每個實例都可將元件 (Widget) 嵌入主應用程式。每個實例都是獨立的 Dart 程式，彼此隔離。多個 Flutter 實例可讓每個實例維持獨立的應用與 UI 狀態，且記憶體資源消耗極低。詳情請參閱 [多個 Flutter 實例][multiple Flutters] 頁面。
- **多視圖（Multi-view）**：支援於 Web，允許建立多個 [FlutterView][]，每個都可將元件 (Widget) 嵌入主應用。在此模式下，僅有一個 Dart 程式，所有視圖與元件可共用物件。

加入現有應用支援整合多個任意大小的 Flutter 視圖，滿足多種情境。最常見的兩種情境為：

* **混合導覽堆疊（Hybrid navigation stacks）**：應用程式由多個螢幕組成，有些由 Flutter 渲染，有些則由其他框架渲染。使用者可自由在各螢幕間切換，無論該螢幕由哪個框架渲染。
* **部分螢幕視圖（Partial-screen views）**：應用中的某個螢幕同時渲染多個元件 (Widget)，其中部分由 Flutter 負責，部分由其他框架負責。使用者可自由捲動並與任何元件互動，無論其渲染方式為何。

## 支援的功能

### 加入 Android 應用程式

<DashImage figure image="development/add-to-app/android-overview.webp" alt="Add-to-app steps on Android" />

* 只需在 Gradle 腳本中加入 Flutter SDK 掛勾，即可自動建置並匯入 Flutter 模組。
* 可將 Flutter 模組建置為通用的 [Android Archive (AAR)][Android Archive (AAR)]，方便整合至自有建置系統，並提升與 AndroidX 的 Jetifier 相容性。
* 提供 [`FlutterEngine`][java-engine] API，可在不綁定 [`FlutterActivity`][]/[`FlutterFragment`][] 等元件的情況下，啟動並持續維護 Flutter 執行環境。
* 支援 Android Studio 的 Android/Flutter 共編輯，以及模組建立/匯入精靈。
* 支援 Java 與 Kotlin 主應用程式。
* Flutter 模組可透過 [Flutter plugins][] 與平台互動。
* 可透過 IDE 或命令列使用 `flutter attach` 連接含有 Flutter 的應用，支援 Flutter 偵錯與狀態熱重載（stateful hot reload）。

### 加入 iOS 應用程式

<DashImage figure image="development/add-to-app/ios-overview.webp" alt="Add-to-app steps on iOS" />

* 可將 Flutter 模組建置為 Swift 套件，方便整合至自有建置系統。
* 透過 Xcode build phase 自動建置並匯入 Flutter 模組。
* 提供 [`FlutterEngine`][ios-engine] API，可在不綁定 [`FlutterViewController`][] 的情況下，啟動並持續維護 Flutter 執行環境。
* 支援 Objective-C 與 Swift 主應用程式。
* Flutter 模組可透過 [Flutter plugins][] 與平台互動。
* 可透過 IDE 或命令列使用 `flutter attach` 連接含有 Flutter 的應用，支援 Flutter 偵錯與狀態熱重載（stateful hot reload）。

Android 與 iOS 匯入 Flutter 模組的 UI 範例，請參考我們的 [add-to-app GitHub Samples repository][]。

### 加入 macOS 應用程式
* 可將 Flutter 模組建置為 Swift 套件，方便整合至自有建置系統。
* 透過 Xcode build phase 自動建置並匯入 Flutter 模組。
* 提供 [`FlutterEngine`][macos-engine] API，可在不綁定 [`FlutterViewController`][macos-flutterviewcontroller] 的情況下，啟動並持續維護 Flutter 執行環境。
* 支援 Swift 主應用程式。
* Flutter 模組可透過 [Flutter plugins][] 與平台互動。
* 可透過 IDE 或命令列使用 `flutter attach` 連接含有 Flutter 的應用，支援 Flutter 偵錯與狀態熱重載（stateful hot reload）。

### 加入 Web 應用程式

Flutter 可加入任何現有的 HTML DOM 為基礎的 Web 應用，無論是任何用 Dart 編寫的前端 Web 框架（如 [jaspr][]、[ngdart][]、[over_react][] 等）、任何前端 JavaScript 框架（如 [React][]、[Angular][]、[Vue.js][] 等）、任何伺服器端渲染框架（如 [Django][]、[Ruby on Rails][]、[Apache Struts][] 等），甚至是沒有框架（俗稱「[VanillaJS][]」）的專案。唯一的最低需求是：你的現有應用及其框架能匯入 JavaScript 函式庫，並能建立 HTML 元素讓 Flutter 渲染。

要將 Flutter 加入現有應用，請正常建置，然後依照 [嵌入指引][embedding instructions] 將 Flutter 視圖放到頁面上。

[jaspr]: https://pub.dev/packages/jaspr
[ngdart]: https://pub.dev/packages/ngdart
[over_react]: https://pub.dev/packages/over_react
[React]: https://react.dev/
[Angular]: https://angular.dev/
[Vue.js]: https://vuejs.org/
[Django]: https://www.djangoproject.com/
[Ruby on Rails]: https://rubyonrails.org/
[Apache Struts]: https://struts.apache.org/
[VanillaJS]: http://vanilla-js.com/
[embedding instructions]: {{site.docs}}/platform-integration/web/embedding-flutter-web#embedded-mode

## 開始使用

請參閱我們針對 Android、Web、iOS 和 macOS 的專案整合指南：

<div class="card-grid">
  <a class="card outlined-card" href="/add-to-app/android/project-setup">
    <div class="card-header text-center">
      <span class="card-title">Android</span>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/embedding-flutter-web#embedded-mode">
    <div class="card-header text-center">
      <span class="card-title">Web</span>
    </div>
  </a>
</div>

<div class="card-grid">
  <a class="card outlined-card" href="/add-to-app/ios/project-setup">
    <div class="card-header text-center">
      <span class="card-title">iOS</span>
    </div>
  </a>
  <a class="card outlined-card" href="/add-to-app/macos/project-setup">
    <div class="card-header text-center">
      <span class="card-title">macOS</span>
    </div>
  </a>
</div>

## API 使用方式

將 Flutter 整合進專案後，請參考下列 API 使用指南：

<div class="card-grid">
  <a class="card outlined-card" href="/add-to-app/android/add-flutter-screen">
    <div class="card-header text-center">
      <span class="card-title">Android</span>
    </div>
  </a>

  <a class="card outlined-card" href="/platform-integration/web/embedding-flutter-web#manage-flutter-views-from-js">
    <div class="card-header text-center">
      <span class="card-title">web</span>
    </div>
  </a>
</div>

<div class="card-grid">
<a class="card outlined-card" href="/add-to-app/ios/add-flutter-screen">
    <div class="card-header text-center">
      <span class="card-title">iOS</span>
    </div>
  </a>
  <a class="card outlined-card" href="/add-to-app/macos/add-flutter-screen">
    <div class="card-header text-center">
      <span class="card-title">macOS</span>
    </div>
  </a>
</div>

## 限制說明

行動端限制：

* 不支援多視圖模式（僅支援多引擎模式）。
* 不支援將多個 Flutter 函式庫打包進同一應用程式。
* 不支援 `FlutterPlugin` 的插件，若插件假設某些前提（如假設一定存在 Flutter `Activity`），在加入現有應用時可能會有非預期行為。
* 在 Android 上，Flutter 模組僅支援 AndroidX 應用程式。

Web 限制：

* 不支援多引擎模式（僅支援多視圖模式）。
* 無法完全「關閉」Flutter 引擎。應用可以移除所有 [FlutterView][] 物件，並確保所有資料依照 Dart 的一般機制被垃圾回收；但即使未渲染任何內容，引擎仍會保持啟動狀態。

[get started]: /learn/pathway
[add-to-app GitHub Samples repository]: {{site.repo.samples}}/tree/main/add_to_app
[Android Archive (AAR)]: {{site.android-dev}}/studio/projects/android-library
[Flutter plugins]: {{site.pub}}/flutter
[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html
[java-engine]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[ios-engine]: {{site.api}}/ios-embedder/interface_flutter_engine.html
[FlutterFire]: {{site.github}}/firebase/flutterfire/tree/main/packages
[`FlutterFragment`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html
[`FlutterPlugin`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/FlutterPlugin.html
[`FlutterViewController`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html
[iOS Framework]: {{site.apple-dev}}/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WhatAreFrameworks.html
[maintained by the Flutter team]: {{site.repo.packages}}/tree/main/packages
[multiple Flutters]: /add-to-app/multiple-flutters
[FlutterView]: https://api.flutter.dev/flutter/dart-ui/FlutterView-class.html
[macos-engine]: {{site.api}}/macos-embedder/interface_flutter_engine.html
[macos-flutterviewcontroller]: {{site.api}}/macos-embedder/interface_flutter_view_controller.html
