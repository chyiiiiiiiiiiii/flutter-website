---
title: 架構設計 Flutter 應用程式
shortTitle: 架構
description: >
  學習如何組織與架構 Flutter 應用程式。
showToc: false
next:
  title: 架構概念
  path: /app-architecture/concepts
---

<div class="side-by-side">
<div>

架構（Architecture）是打造可維護、具韌性且可擴展 Flutter 應用程式的重要一環。
在本指南中，你將學習到 Flutter 應用程式的架構原則與最佳實踐。

「架構」是一個難以明確定義的詞彙。
這是一個廣泛的術語，根據不同情境可能指涉許多主題。在本指南中，
「架構」是指如何組織、規劃與設計你的 Flutter 應用程式，
以因應專案需求與團隊規模的成長。

</div>
<div class="centered-rows">
<img src='/assets/images/docs/app-architecture/hero-image.png' style="max-height: 480px;" alt="Hero image">
</div>
</div>


## 你將學到什麼

* 有意識地設計架構的好處
* 常見的架構原則
* Flutter 團隊推薦的應用程式架構
* MVVM 與狀態管理
* 相依性注入（Dependency Injection）
* 撰寫健壯 Flutter 應用程式的常見設計模式

{% comment %}
TODO @ewindmill 隨著頁面上線補齊此清單，並加入連結。
{% endcomment %}

## 有意識架構設計的好處

良好的應用程式架構能為工程團隊及最終使用者帶來多項好處。

* 可維護性 — 良好的應用程式架構讓後續修改、更新及修復問題變得更容易。
* 可擴展性 — 經過深思熟慮的應用程式設計，能讓更多人同時貢獻同一份程式碼庫，且減少程式碼衝突。
* 可測試性 — 有意識設計的應用程式，通常類別較為簡潔，且有明確的輸入與輸出，使其更容易進行模擬與測試。
* 降低認知負荷 — 新加入專案的開發者能在更短時間內上手，且當程式碼更易理解時，程式碼審查也會更省時。
* 更佳的使用者體驗 — 新功能能更快上線且有更少的錯誤。

## 如何使用本指南

本指南旨在協助你打造可擴展的 Flutter 應用程式，適用於有多位開發者共同貢獻同一程式碼庫、並且功能豐富的團隊。
如果你正在開發一個 *團隊與程式碼庫持續成長* 的 Flutter 應用程式，
這份指引就是為你而設。

除了提供一般性的架構建議外，本指南也會給出具體的最佳實踐範例與明確建議。
部分函式庫可依需求替換，而對於極大型且具獨特複雜度的團隊，某些內容可能不完全適用。
無論如何，這些理念依然值得參考。
這是建構 Flutter 應用程式的推薦方式。

本指南的第一部分，將從高層次介紹常見的架構原則。第二部分，
則會帶你逐步了解 Flutter 應用程式架構的具體建議與實作方式。
最後，在指南結尾，你將看到設計模式清單與範例程式碼，展示這些建議如何實際應用。


[Common architectural principles]: /app-architecture/concepts
[recommended app architecture]: /app-architecture/guide
[MVVM]: /app-architecture/guide#mvvm


## 意見回饋

由於本網站區塊仍在持續發展中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="index"
