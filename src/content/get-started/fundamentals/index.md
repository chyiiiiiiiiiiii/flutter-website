---
title: 學習基礎知識
shortTitle: 基礎知識
description: >
  你已經初步體驗過 Flutter 框架；
  現在，進一步學習 Flutter 的基礎知識吧。
showToc: false
---



<div class="side-by-side">
<div>

## 用 Flutter 找到你的方向！

如果你是 Flutter 新手，並且已經完成了
[你的第一個 Flutter codelab][your first Flutter codelab]，
那麼本網站的這個區塊就是為你準備的！

這裡的目標是引導你進行下一步的 Flutter 學習。
這裡不是教你如何「程式設計」，
而是教你 Flutter 的運作方式。


</div>
<div class="centered-rows">
  {% render docs/app-figure.md, image:"fwe/dash-search.png", alt:"Dash with magnifying glass", img-style: "max-height: 320px;"%}
</div>
</div>


:::note
這些基礎知識文件仍在持續完善中，歡迎你提供寶貴意見！
請考慮填寫本頁底部及本區新主題頁面上的問卷調查。
:::

我們建議你依照下列順序學習這些主題。

 1. [Dart 入門][Intro to Dart] _(選擇性)_
    如你所知，Flutter 使用 [Dart 語言][Dart language]。
    如果你有其他物件導向語言（如 Java、C++ 或 Swift）的經驗，
    Dart 對你來說應該會很熟悉。
    截至目前為止，
    [Dart 是成長最快的語言之一][dart-lang]，
    這在某種程度上要歸功於 Flutter。
 2. [元件 (Widgets) 基礎][Widget fundamentals]
    了解 Flutter 應用程式的主要構建基礎之一——元件 (Widgets)。
 3. [版面配置][Layout]
    Flutter 與其他 UI 框架不同，
    你需要以程式化方式建立版面配置。
    這讓你能夠組合元件 (Widgets)，
    也就是 Flutter 的基本構建單元，
    來實現你自己的版面設計想法。
    此外，也有助於設計 UI，
    以最佳化你的應用程式在任何螢幕上的顯示效果。
 4. [狀態管理][State management]
    學習如何在元件 (Widgets) 之間共享狀態，並在狀態變化時通知應用程式的其他部分。
    了解如何在 Flutter 中實作 MVVM，以有效管理中小型應用程式的狀態。
 5. [處理使用者輸入][Handling user input]
    了解 Flutter 支援互動的元件 (Widgets)，如按鈕和文字。
    也學習如何為尚未支援互動的元件新增互動功能。
 6. [網路與資料][Networking and data]
    網路是一個非常龐大的主題，
    本章節聚焦於基本的網路功能，
    例如如何使用 HTTP 取得或提交資料、
    如何進行 JSON 轉換、
    如何進行驗證、
    如何實作非同步處理等內容。
 7. [本地資料與快取][Local data and caching]
    學習不同的本地資料快取技術。

[Dart language]: {{site.dart-site}}
[dart-lang]: https://twitter.com/MiSvTh/status/1732002450641400276?cxt
[Intro to Dart]: /get-started/fundamentals/dart
[Layout]: /get-started/fundamentals/layout
[State management]: /get-started/fundamentals/state-management
[Handling user input]: /get-started/fundamentals/user-input
[Networking and data]: /get-started/fundamentals/networking
[Local data and caching]: /get-started/fundamentals/local-caching
[Widget fundamentals]: /get-started/fundamentals/widgets
[your first Flutter codelab]: {{site.codelabs}}/codelabs/flutter-codelab-first

## 意見回饋

由於本網站區塊仍在持續演進中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="index"
