---
title: 架構建議與資源
shortTitle: 架構建議
description: >
  建立可擴展 Flutter 應用程式的建議。
prev:
  title: 架構案例研究
  path: /app-architecture/case-study
next:
  title: 設計模式
  path: /app-architecture/design-patterns
---

本頁介紹架構最佳實踐、其重要性，以及我們是否建議你在 Flutter 應用程式中採用這些做法。
你應將這些建議視為參考，而非絕對規則，並根據你應用程式的獨特需求進行調整。

本頁的最佳實踐會標註優先級，這反映了 Flutter 團隊對該建議的推薦程度。

* **強烈建議：** 如果你正在開始建立新應用程式，應始終實作此建議。除非與你現有的架構方式根本衝突，否則也應強烈考慮將現有應用程式重構以實現此做法。
* **建議：** 採用此做法很可能會提升你的應用程式品質。
* **視情況而定：** 在特定情境下，此做法可以改善你的應用程式。

## 關注點分離 {#separation-of-concerns}

你應將應用程式分為 UI 層與資料層。在這些層中，
你應進一步依職責將邏輯拆分為不同類別。

<ArchitectureRecommendations category="separation-of-concerns" />

## 資料處理 {#handling-data}

謹慎處理資料能讓程式碼更易於理解、降低錯誤發生機率，
並防止產生格式錯誤或非預期的資料。

<ArchitectureRecommendations category="handling-data" />

## 應用程式結構 {#app-structure}

組織良好的程式碼對應用程式本身的健全性及開發團隊都有所助益。

<ArchitectureRecommendations category="app-structure" />

## 測試 {#testing}

良好的測試實踐讓你的應用程式更具彈性。
同時也能讓新增邏輯與 UI 的過程更簡單、風險更低。

<ArchitectureRecommendations category="testing" />

<a id="recommended-resources" aria-hidden="true"></a>

## 推薦資源 {:#resources}

* 程式碼與範本
  * [Compass app source code][] -
    一個功能完整且健壯的 Flutter 應用程式原始碼，實作了許多本頁建議。
  * [very_good_cli][] -
    由 Flutter 專家 Very Good Ventures 製作的 Flutter 應用程式範本。
    此範本會產生類似的應用程式結構。
* 文件
  * [Very Good Engineering architecture documentation][] -
    Very Good Engineering 是 VGV 經營的文件網站，包含技術文章、展示與開源專案。
    其中也有關於 Flutter 應用程式架構的文件。
* 工具
  * [Flutter developer tools][] -
    DevTools 是一套針對 Dart 與 Flutter 的效能與除錯工具。
  * [flutter_lints][] -
    由 Flutter 團隊推薦的 Flutter 應用程式檢查規則套件。
    使用此套件可促進團隊間良好的程式撰寫習慣。


[Compass app source code]: https://github.com/flutter/samples/tree/main/compass_app
[very_good_cli]: https://cli.vgv.dev/
[Very Good Engineering architecture documentation]: https://engineering.verygood.ventures/architecture/architecture/
[Flutter developer tools]: /tools/devtools
[flutter_lints]: https://pub.dev/packages/flutter_lints

## 意見回饋

由於本網站此區塊仍在持續演進中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="recommendations"
