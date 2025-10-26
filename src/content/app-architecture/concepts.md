---
title: 常見架構概念
shortTitle: 架構概念
description: >
  了解應用程式設計中的常見架構概念，
  以及這些概念如何應用於 Flutter。
prev:
    title: Flutter 應用程式架構設計
    path: /app-architecture
next:
    title: 應用程式架構指南
    path: /app-architecture/guide
---

在本節中，你將會看到在應用程式開發領域中廣泛應用、經過驗證的架構原則，
以及這些原則如何特別適用於 Flutter。
這是一個針對推薦架構與最佳實踐相關詞彙與概念的溫和入門，
讓你能在本指南後續章節中進一步深入探索。

## 關注點分離（Separation of concerns）

[關注點分離（Separation-of-concerns）][Separation-of-concerns] 是應用程式開發中的核心原則，
透過將應用程式的功能劃分為獨立且自包含的單元，來促進模組化與可維護性。
從高層次來看，這意味著將 UI 邏輯與業務邏輯分離。
這通常被稱為 *分層（layered）* 架構。
在每一層中，你還應該根據功能或特性進一步拆分應用程式。
例如，應用程式的認證邏輯應該與搜尋邏輯分屬不同的類別。

在 Flutter 中，這一原則同樣適用於 UI 層的元件（Widgets）。
你應該撰寫可重用且精簡的元件，並盡可能減少其中的邏輯。

## 分層架構（Layered architecture）

Flutter 應用程式應以 *分層* 方式撰寫。分層架構是一種軟體設計模式，
將應用程式組織為不同的層級，每一層有明確的角色與責任。
通常，根據應用程式的複雜度，會分為 2 至 3 層。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/horizontal-layers-with-icons.png' alt="常見的三層應用程式架構：UI 層、邏輯層、資料層。">

* **UI 層** - 顯示由業務邏輯層提供的資料，並處理使用者互動。這一層也常被稱為「展示層（presentation layer）」。
* **邏輯層** - 實作核心業務邏輯，並促進資料層與 UI 層之間的互動。通常稱為「領域層（domain layer）」。
  邏輯層是可選的，僅當你的應用程式在客戶端有複雜業務邏輯時才需要實作。
  許多應用程式只需將資料呈現給使用者，並允許使用者修改資料（俗稱 CRUD 應用程式）。
  這類應用程式可能不需要這個可選層。
* **資料層** - 管理與資料來源（如資料庫或平台外掛）的互動，並將資料與方法暴露給業務邏輯層。

這些被稱為「層」，是因為每一層只能與其正上方或正下方的層進行溝通。
UI 層不應該知道資料層的存在，反之亦然。

## 單一真實來源（Single source of truth, SSOT）

應用程式中的每一種資料型別都應該有一個[單一真實來源（single source of truth, SSOT）][single source of truth] (SSOT)。
這個來源負責表示本地或遠端的狀態。
如果資料可以在應用程式中被修改，
那麼 SSOT 類別應該是唯一能進行修改的類別。

這可以大幅減少應用程式中的錯誤數量，
並簡化程式碼，因為你只會有一份相同資料的副本。

通常，應用程式中每一種資料的真實來源會由一個稱為 **Repository**（儲存庫）的類別持有，這是資料層的一部分。
通常你的應用程式中每一種資料型別會有一個對應的儲存庫類別。

這個原則可以跨層、跨元件應用於你的應用程式，也可以應用在單一類別內。
例如，一個 Dart 類別可以使用 [getter][getters] 從 SSOT 欄位推導出值
（而不是維護多個需要獨立更新的欄位），
或使用 [record][records] 清單來分組相關值
（而不是平行的多個清單，避免索引不同步的問題）。

## 單向資料流（Unidirectional data flow, UDF）

[單向資料流（Unidirectional data flow, UDF）][Unidirectional data flow] (UDF) 是一種設計模式，
有助於將狀態與顯示該狀態的 UI 解耦。
簡單來說，狀態會從資料層經過邏輯層，最終流向 UI 層的元件（Widgets）。
而來自使用者互動的事件則反方向流動，
從展示層回到邏輯層，最後到資料層。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/horizontal-layers-with-UDF.png' alt="常見的三層應用程式架構：UI 層、邏輯層、資料層，以及狀態從資料層流向 UI 層的流程。">

在 UDF 中，從使用者互動到 UI 重新渲染的更新循環如下：

1. 【UI 層】由於使用者互動發生事件，例如按下按鈕。元件的事件處理 callback 會呼叫邏輯層類別所暴露的方法。
2. 【邏輯層】邏輯類別呼叫儲存庫所暴露、負責修改資料的方法。
3. 【資料層】儲存庫更新資料（如有需要），然後將新資料提供給邏輯類別。
4. 【邏輯層】邏輯類別儲存新的狀態，並將其傳送給 UI。
5. 【UI 層】UI 顯示新的 view model 狀態。

新的資料也可以從資料層開始。
例如，儲存庫可能會定時向 HTTP 伺服器輪詢新資料。
在這種情況下，資料流只會走流程的後半段。
最重要的觀念是，資料的變動永遠發生在 [SSOT][SSOT]，也就是資料層。
這讓你的程式碼更容易理解、不易出錯，
並能防止產生格式錯誤或非預期的資料。

## UI 是（不可變）狀態的函數

Flutter 採用宣告式（declarative）設計，
也就是說 UI 會反映應用程式當前的狀態。
當狀態改變時，
你的應用程式應該觸發依賴該狀態的 UI 重新建構。
在 Flutter 中，你經常會聽到「UI 是狀態的函數」這種說法。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/ui-f-state.png' style="width:50%; margin:auto; display:block" alt="UI 是狀態的函數。">

讓資料驅動 UI，而不是反過來，這一點至關重要。
資料應該是不可變且具持久性的，
而視圖（views）應盡量少包含邏輯。
這樣可以降低資料在應用程式關閉時遺失的可能性，
並讓你的應用程式更容易測試且更能抵抗錯誤。

## 可擴充性（Extensibility）

每一個架構元件都應該有明確定義的輸入與輸出。
例如，邏輯層中的 view model 應該只接受資料來源（如儲存庫）作為輸入，
並僅暴露給視圖使用的指令與格式化後的資料。

以這種方式使用乾淨的介面，可以讓你在不需更動消費該介面的程式碼的情況下，
替換類別的具體實作。

## 可測試性（Testability）

讓軟體具備可擴充性的原則，同時也讓軟體更容易測試。
例如，你可以透過 mock 一個儲存庫，來測試 view model 的自包含邏輯。
view model 的測試不需要 mock 應用程式的其他部分，
你也可以將 UI 邏輯與 Flutter 元件本身分開測試。

你的應用程式也會更具彈性。
新增新的邏輯與 UI 會變得簡單且風險低。
例如，新增一個新的 view model 不會破壞資料層或業務邏輯層的任何邏輯。

下一節將說明在應用程式架構中，任何元件的輸入與輸出概念。

[Separation-of-concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns
[single source of truth]: https://en.wikipedia.org/wiki/Single_source_of_truth
[SSOT]: https://en.wikipedia.org/wiki/Single_source_of_truth
[getters]: {{site.dart-site}}/effective-dart/design#do-use-getters-for-operations-that-conceptually-access-properties
[records]: {{site.dart-site}}/language/records
[Unidirectional data flow]: https://en.wikipedia.org/wiki/Unidirectional_Data_Flow_(computer_science)

## 意見回饋

由於本網站此部分內容仍在持續演進中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="concepts"
