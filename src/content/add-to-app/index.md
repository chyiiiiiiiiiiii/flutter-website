---
title: 將 Flutter 加入現有應用程式
shortTitle: 加入現有應用
description: 將 Flutter 以函式庫方式加入現有 Android 或 iOS 應用程式。
---

## 加入現有應用（Add-to-app）

如果你是從零開始撰寫新應用程式，使用 Flutter [快速開始][get started] 非常簡單。但如果你已經有一個不是用 Flutter 撰寫的應用程式，而且從頭開始重寫並不實際，該怎麼辦？

針對這些情境，Flutter 可以以模組（module）方式逐步整合到你的現有應用程式中。這個功能稱為「加入現有應用（add-to-app）」。你可以將這個模組匯入現有應用程式，讓應用程式的部分畫面由 Flutter 負責渲染，其他部分則繼續使用原本的技術。這種方式也能利用 Dart 的可攜性與與其他語言的互通性，執行共用的非 UI 邏輯。

目前，加入現有應用功能支援 Android、iOS 以及 Web。

Flutter 提供兩種加入現有應用的模式：

- **多引擎（Multi-engine）**：支援於 Android 與 iOS，允許執行一個或多個 Flutter 實例，每個實例都會在主應用程式中嵌入一個元件（Widget）。每個實例都是獨立的 Dart 程式，彼此隔離執行。多個 Flutter 實例可以讓每個實例維持獨立的應用程式與 UI 狀態，同時佔用極少的記憶體資源。詳情請參考 [多個 Flutter 實例][multiple Flutters] 頁面。
- **多視圖（Multi-view）**：支援於 Web，允許建立多個 [FlutterView][FlutterView]，每個都在主應用程式中嵌入一個元件（Widget）。在這個模式下，只有一個 Dart 程式，所有視圖與元件可以共用物件。

加入現有應用支援整合多個任意大小的 Flutter 視圖，滿足各種使用情境。最常見的兩種情境為：

* **混合式導覽堆疊（Hybrid navigation stacks）**：應用程式由多個螢幕組成，其中部分由 Flutter 渲染，部分由其他框架渲染。無論螢幕由哪個框架渲染，使用者都可以自由地在不同螢幕間切換。
* **部分螢幕視圖（Partial-screen views）**：應用程式中的某個螢幕包含多個元件（Widget），其中部分由 Flutter 渲染，部分由其他框架渲染。無論元件由哪個框架渲染，使用者都可以自由地捲動與互動。

## 支援的功能

### 加入 Android 應用程式

{% render docs/app-figure.md, image:"development/add-to-app/android-overview.webp", alt:"Add-to-app steps on Android" %}

* 只需在 Gradle 腳本中加入 Flutter SDK 鉤子，即可自動建置並匯入 Flutter 模組。
* 可將 Flutter 模組建置為通用的 [Android Archive (AAR)][Android Archive (AAR)]，方便整合到你自己的建置系統中，並提升與 AndroidX 的 Jetifier 相容性。
* [`FlutterEngine`][java-engine] API，可在不綁定 [`FlutterActivity`][`FlutterActivity`]/[`FlutterFragment`][`FlutterFragment`] 等的情況下，啟動並維持 Flutter 執行環境。
* 支援 Android Studio 的 Android/Flutter 共編輯與模組建立/匯入精靈。
* 支援 Java 與 Kotlin 主應用程式。
* Flutter 模組可使用 [Flutter 插件（plugins）][Flutter plugins] 與平台互動。
* 可透過 IDE 或命令列使用 `flutter attach` 連線到包含 Flutter 的應用程式，支援 Flutter 偵錯與狀態式熱重載（stateful hot reload）。

### 加入 iOS 應用程式

{% render docs/app-figure.md, image:"development/add-to-app/ios-overview.webp", alt:"Add-to-app steps on iOS" %}

* 只需在 CocoaPods 與 Xcode build phase 中加入 Flutter SDK 鉤子，即可自動建置並匯入 Flutter 模組。
* 可將 Flutter 模組建置為通用的 [iOS Framework][iOS Framework]，方便整合到你自己的建置系統中。
* [`FlutterEngine`][ios-engine] API，可在不綁定 [`FlutterViewController`][`FlutterViewController`] 的情況下，啟動並維持 Flutter 執行環境。
* 支援 Objective-C 與 Swift 主應用程式。
* Flutter 模組可使用 [Flutter 插件（plugins）][Flutter plugins] 與平台互動。
* 可透過 IDE 或命令列使用 `flutter attach` 連線到包含 Flutter 的應用程式，支援 Flutter 偵錯與狀態式熱重載（stateful hot reload）。

你可以參考我們的 [add-to-app GitHub 範例專案庫][add-to-app GitHub Samples repository]，其中有 Android 與 iOS 匯入 Flutter 模組進行 UI 整合的範例專案。

### 加入 Web 應用程式

Flutter 可以加入任何基於 HTML DOM 的現有 Web 應用程式，無論是用任何 Dart 前端 Web 框架（如 [jaspr][jaspr]、[ngdart][ngdart]、[over_react][over_react] 等）、任何前端 JavaScript 框架（如 [React][React]、[Angular][Angular]、[Vue.js][Vue.js] 等）、任何伺服器端渲染框架（如 [Django][Django]、[Ruby on Rails][Ruby on Rails]、[Apache Struts][Apache Struts] 等），甚至是沒有任何框架（俗稱「[VanillaJS][VanillaJS]」）的專案。唯一的最低需求是：你的現有應用程式及其框架能夠匯入 JavaScript 函式庫，並建立 HTML 元素讓 Flutter 可以渲染。

要將 Flutter 加入現有應用程式，請照常建置 Flutter，然後依照 [嵌入指引][embedding instructions] 將 Flutter 視圖放到網頁上。

## 開始使用

若要開始，請參考我們針對 Android 與 iOS 的專案整合指南：

<div class="card-grid">
  <a class="card outlined-card" href="/add-to-app/android/project-setup">
    <div class="card-header text-center">
      <span class="card-title">Android</span>
    </div>
  </a>
  <a class="card outlined-card" href="/add-to-app/ios/project-setup">
    <div class="card-header text-center">
      <span class="card-title">iOS</span>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/embedding-flutter-web#embedded-mode">
    <div class="card-header text-center">
      <span class="card-title">Web</span>
    </div>
  </a>
</div>

## API 使用方式

將 Flutter 整合進你的專案後，請參考下列 API 使用指南：

<div class="card-grid">
  <a class="card outlined-card" href="/add-to-app/android/add-flutter-screen">
    <div class="card-header text-center">
      <span class="card-title">Android</span>
    </div>
  </a>
  <a class="card outlined-card" href="/add-to-app/ios/add-flutter-screen">
    <div class="card-header text-center">
      <span class="card-title">iOS</span>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/embedding-flutter-web#manage-flutter-views-from-js">
    <div class="card-header text-center">
      <span class="card-title">Web</span>
    </div>
  </a>
</div>

## 限制事項

行動裝置端限制：

* 不支援多視圖模式（僅支援多引擎模式）。
* 不支援將多個 Flutter 函式庫打包進同一個應用程式。
* 不支援 `FlutterPlugin` 的插件若假設某些在加入現有應用情境下不成立的條件（例如假設總是存在 Flutter `Activity`），可能會出現非預期行為。
* 在 Android 上，Flutter 模組僅支援 AndroidX 應用程式。

Web 限制：

* 不支援多引擎模式（僅支援多視圖模式）。
* 無法完全「關閉」Flutter 引擎。應用程式可以移除所有 [FlutterView][FlutterView] 物件，並透過 Dart 的一般機制確保所有資料都被垃圾回收。然而，即使沒有渲染任何內容，引擎仍會保持啟動狀態。
