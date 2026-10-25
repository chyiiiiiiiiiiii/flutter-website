# Flutter 應用程式架構設計

> 學習如何組織 Flutter 應用程式的結構。




<div class="side-by-side">
<div>

架構（Architecture）是打造可維護、具韌性且可擴展的 Flutter 應用程式時非常重要的一環。
在本指南中，你將學習到 Flutter 應用程式的架構原則，以及建構 Flutter 應用程式的最佳實踐。

「架構」是一個難以明確定義的詞彙。
這是一個廣泛的術語，根據不同情境可以指涉許多不同主題。在本指南中，
「架構」指的是如何組織、規劃與設計你的 Flutter 應用程式，以便隨著專案需求與團隊規模的成長而能夠順利擴展。

</div>
<div class="centered-rows">
<img src='/assets/images/docs/app-architecture/hero-image.png' style="max-height: 480px;" alt="Hero image">
</div>
</div>


## 你將學到什麼

* 有意識的架構設計帶來的好處
* 常見的架構原則
* Flutter 團隊推薦的應用程式架構
* MVVM 與狀態管理
* 相依性注入（Dependency injection）
* 撰寫健壯 Flutter 應用程式的常見設計模式



## 有意識架構設計的好處

良好的應用程式架構能為工程團隊及最終用戶帶來多項益處。

* 可維護性 — 良好的應用程式架構能讓後續的修改、更新與修復問題變得更容易。
* 可擴展性 — 經過深思熟慮的應用程式設計，能讓更多人同時貢獻同一份程式碼庫，且減少程式碼衝突。
* 可測試性 — 有意識設計的應用程式通常擁有簡潔的類別，輸入與輸出明確，讓模擬與測試變得更容易。
* 降低認知負擔 — 新加入專案的開發者能更快上手，且當程式碼易於理解時，程式碼審查也會更省時。
* 更佳的用戶體驗 — 新功能能更快推出，且錯誤更少。

## 如何使用本指南

本指南旨在協助你打造可擴展的 Flutter 應用程式，特別適用於有多位開發者共同貢獻同一程式碼庫、且功能豐富的團隊。
如果你正在開發一個*團隊與程式碼庫都在成長*的 Flutter 應用程式，本指南非常適合你。

除了提供一般性的架構建議外，本指南也會給出具體的最佳實踐範例與明確的建議。
部分函式庫可以替換，對於極大型且複雜度特殊的團隊，某些內容可能不完全適用。
無論如何，這些核心理念仍然值得參考。
這是建構 Flutter 應用程式的推薦方式。

本指南的第一部分，將從高層次介紹常見的架構原則。第二部分，
則會帶你實際走過 Flutter 應用程式架構設計的具體建議。
最後，在本指南結尾，你將看到設計模式清單與範例程式碼，展示這些建議的實際應用。

[Common architectural principles]: /app-architecture/concepts
[recommended app architecture]: /app-architecture/guide
[MVVM]: /app-architecture/guide#mvvm


## 意見回饋

由於本網站區塊仍在持續優化中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="index"

