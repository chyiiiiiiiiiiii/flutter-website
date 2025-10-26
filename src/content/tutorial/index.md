---
title: 學習 Flutter
description: 幫助你學習 Flutter 的資源。
showToc: false
---

## 歡迎！

歡迎來到 Flutter 教學！本教學將教你如何從零開始構建可在行動裝置、桌面與網頁上運行的應用程式。

你將從最基礎開始：建立一個空白的 Flutter 應用程式。
到最後，你將完成數個小型應用程式，這些應用程式將展示 Flutter 開發的關鍵功能（以及更多內容！）

{%- comment %}
TODO(ewindmill) welcome video
{%- endcomment %}

## 什麼是 Flutter？

Flutter 是一個開源的 UI 工具包（UI toolkit），可協助你以單一程式碼庫構建可原生編譯、表現力豐富的應用程式，涵蓋行動裝置、網頁與桌面平台。
它採用宣告式、響應式設計，具備 hot reload（熱重載）功能以加快開發週期，並擁有豐富且可自訂的元件（Widgets）集，方便打造具表現力的介面。

Flutter 會自行繪製每一個像素，而不是包裝原生元件，這讓開發者能完全掌控 UI，並確保跨平台的視覺一致性。

## 如何使用本教學

為了順利跟隨本教學，你應該已熟悉 Dart 程式語言。本教學預設你已具備 Dart 相關教學——[Learn Dart tutorial][Learn Dart tutorial]——中的所有知識。（或者，如果你熟悉其他通用的物件導向語言，如 Java 或 Kotlin，應該也沒問題。）

## 設定環境

閱讀本教學時，建議你能一邊參考範例一邊實際撰寫程式碼。
你可以選擇[在本機安裝 Flutter][installing Flutter on your machine]，
或使用支援 Flutter 的網頁 IDE——[Firebase Studio][Firebase Studio]。

如果你選擇在本機執行，本教學預設你會在網頁上運行 Flutter 應用程式，並使用 [Chrome][Chrome]。這不需要安裝 Xcode 或 Android Studio，因此是最快開始使用 Flutter 的方式。

## 內容目錄

1. Flutter UI 入門
   1. [建立 Flutter 應用程式][Create a Flutter app]
   2. [元件（Widgets）基礎][Widget fundamentals]
   3. [在螢幕上配置元件][Layout widgets on a screen]
   4. [處理使用者輸入（Input）][Handle User input]
   5. [認識有狀態元件（stateful widgets）][Learn about stateful widgets]
   6. [加入隱式動畫（implicit animations）][Add implicit animations]
2. Flutter 應用程式中的狀態管理
   1. [建立新專案][Set up a new project]
   2. [發送 HTTP 請求][Make Http Requests]
   3. [使用 `ChangeNotifier` 更新應用程式狀態][Use `ChangeNotifier` to update app state]
   4. [使用 `ListenableBuilder` 更新應用程式 UI][Use `ListenableBuilder` to update app UI]
3. Flutter UI 進階（102）
   1. [設定你的專案][Set up your project]
   2. [`LayoutBuilder` 與自適應版面][`LayoutBuilder` and adaptive layouts]
   3. [滾動與 slivers][Scrolling and slivers]
   4. [基於堆疊的導覽（stack based navigation）][Stack based navigation]

[Learn Dart tutorial]: https://dart.dev/
[installing Flutter on your machine]: /get-started
[Firebase Studio]: https://firebase.studio/
[Chrome]: https://www.google.com/chrome/

[Create a Flutter app]: /tutorial/create-an-app/
[Widget fundamentals]: /tutorial/stateless-widgets/
[Layout widgets on a screen]: /tutorial/layout/
[Handle user input]: /tutorial/user-input/
[Learn about stateful widgets]: /tutorial/stateful-widgets/
[Add implicit animations]: /tutorial/animations/
[Set up a new project]: /tutorial/set-up-state-app/
[Make Http Requests]: /tutorial/http/
[Use `ChangeNotifier` to update app state]:/tutorial/change-notifier/
[Use `ListenableBuilder` to update app UI]: /tutorial/listenables/
[Set up your project]: /tutorial/set-up-ui-102/
[`LayoutBuilder` and adaptive layouts]: /tutorial/adaptive-layouts/
[Scrolling and slivers]: /tutorial/slivers/
[Stack based navigation]: /tutorial/stack-based-navigation/