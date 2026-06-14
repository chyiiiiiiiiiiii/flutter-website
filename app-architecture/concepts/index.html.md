# 常見架構概念

> 了解應用程式設計中的常見架構概念， 以及這些概念如何應用於 Flutter。




在本節中，你將會看到在應用程式開發領域中指引架構決策的經典原則，
以及這些原則如何特別適用於 Flutter。
這是一個關於推薦架構及最佳實踐相關詞彙與概念的溫和入門，
讓你能在本指南中深入探索更多細節。

## 關注點分離（Separation of concerns）

[關注點分離（Separation-of-concerns）][Separation-of-concerns] 是應用程式開發中的核心原則，
透過將應用程式的功能劃分為獨立且自包含的單元，促進模組化與可維護性。
從高層次來看，這代表將 UI 邏輯與業務邏輯分離。
這通常被描述為 *分層* 架構（layered architecture）。
在每一層中，你還應該依據功能或特性進一步拆分應用程式。
舉例來說，應用程式的認證邏輯應該與搜尋邏輯分屬不同的類別。

在 Flutter 中，這一原則同樣適用於 UI 層的元件 (Widget)。
你應該撰寫可重用、精簡且邏輯最少的元件。

## 分層架構（Layered architecture）

Flutter 應用程式建議採用 *分層* 寫法。分層架構是一種軟體設計模式，
將應用程式組織為明確分工的多個層級，每一層都有特定的角色與責任。
通常，應用程式會依複雜度分為 2 至 3 層。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/horizontal-layers-with-icons.png' alt="應用程式架構常見的三層：UI 層、邏輯層、資料層。">

* **UI 層** - 顯示由業務邏輯層提供的資料，並處理使用者互動。
  這一層也常被稱為「呈現層（presentation layer）」。
* **邏輯層** - 實作核心業務邏輯，並協助資料層與 UI 層之間的互動。
  通常也稱為「領域層（domain layer）」。
  邏輯層是可選的，僅當你的應用程式在客戶端有複雜業務邏輯時才需要實作。
  許多應用程式只需展示資料給使用者並允許修改（俗稱 CRUD 應用程式），
  這類應用可能不需要這個可選層。
* **資料層** - 管理與資料來源（如資料庫或平台插件）的互動，
  並向業務邏輯層提供資料與方法。

這些被稱為「層」，是因為每一層只能與其直接上下層溝通。
UI 層不應該知道資料層的存在，反之亦然。

## 單一真實來源（Single source of truth, SSOT）

應用程式中的每種資料型別都應該有一個[單一真實來源（single source of truth）][single source of truth] (SSOT)。
這個來源負責表示本地或遠端狀態。
如果資料可在應用程式中被修改，
那麼 SSOT 類別應該是唯一可以進行修改的類別。

這能大幅減少應用程式中的錯誤數量，
並簡化程式碼，因為你只需維護同一份資料的唯一副本。

一般來說，應用程式中每種資料的真實來源會由一個稱為 **Repository**（儲存庫）的類別負責，這屬於資料層的一部分。
通常應用程式中每種資料型別都會有一個對應的儲存庫類別。

這個原則不僅適用於應用程式的各層與元件之間，也適用於個別類別內部。
舉例來說，一個 Dart 類別可以使用 [getter][getters] 從 SSOT 欄位推導出值
（而不是維護多個需要獨立更新的欄位），
或使用 [record][records] 列表將相關值分組
（避免多個平行列表的索引不同步問題）。

## 單向資料流（Unidirectional data flow, UDF）

[單向資料流（Unidirectional data flow）][Unidirectional data flow] (UDF) 是一種設計模式，
有助於將狀態管理與顯示該狀態的 UI 解耦。
簡單來說，狀態會從資料層經過邏輯層，最終流向 UI 層的元件。
而使用者互動產生的事件則反方向流動，
由呈現層回傳至邏輯層，再到資料層。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/horizontal-layers-with-UDF.png' alt="應用程式架構常見的三層：UI 層、邏輯層、資料層，以及狀態從資料層流向 UI 層的流程。">

在 UDF 中，從使用者互動到 UI 重新渲染的更新循環如下：

1. 【UI 層】由於使用者互動（例如點擊按鈕）而發生事件。
   元件的事件處理回呼（callback）會呼叫邏輯層類別所暴露的方法。
2. 【邏輯層】邏輯類別呼叫儲存庫（repository）所暴露、能夠變更資料的方法。
3. 【資料層】儲存庫更新資料（如有需要），然後將新資料提供給邏輯類別。
4. 【邏輯層】邏輯類別儲存新的狀態，並將其傳送給 UI。
5. 【UI 層】UI 顯示新的 view model 狀態。

新的資料也可以從資料層開始。
例如，儲存庫可能會定時向 HTTP 伺服器輪詢新資料。
在這種情況下，資料流只會走完後半段流程。
最重要的觀念是，資料的變更永遠發生在 [SSOT][SSOT]，也就是資料層。
這讓你的程式碼更易於理解、不易出錯，
並可避免產生格式錯誤或非預期的資料。


## UI 是（不可變）狀態的函數

Flutter 採用宣告式（declarative）設計，
也就是說 UI 會根據應用程式的當前狀態來建構。
當狀態改變時，
你的應用程式應該觸發依賴該狀態的 UI 重新建構。
在 Flutter 中，你經常會聽到「UI 是狀態的函數」這種說法。

<img src='/assets/images/docs/app-architecture/common-architecture-concepts/ui-f-state.png' style="width:50%; margin:auto; display:block" alt="UI is a function of state.">

關鍵在於，應該由資料驅動 UI，而不是反過來。
資料應該是不可變且持久的，
而視圖（view）應儘量少包含邏輯。
這樣可以降低應用程式關閉時資料遺失的風險，
並讓你的應用程式更容易測試且更能抵抗錯誤。

## 可擴展性（Extensibility）

每個架構元件都應該有明確定義的輸入與輸出。
例如，邏輯層的 view model 應只接受資料來源（如儲存庫）作為輸入，
並僅暴露給視圖使用的指令與格式化資料。

透過這種乾淨的介面設計，你可以在不更動介面消費端程式碼的情況下，
隨時替換類別的具體實作。

## 可測試性（Testability）

讓軟體具備可擴展性的原則，同時也讓軟體更容易測試。
舉例來說，你可以透過 mock 一個儲存庫來測試 view model 的自包含邏輯。
view model 的測試不需要 mock 應用程式的其他部分，
而且你可以將 UI 邏輯的測試與 Flutter 元件本身分開進行。

你的應用程式也會因此更加靈活。
新增邏輯或 UI 會變得簡單且風險低。
例如，新增一個新的 view model 不會破壞資料層或業務邏輯層的任何邏輯。

下一節將說明應用程式架構中各元件的輸入與輸出概念。

[Separation-of-concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns
[single source of truth]: https://en.wikipedia.org/wiki/Single_source_of_truth
[SSOT]: https://en.wikipedia.org/wiki/Single_source_of_truth
[getters]: https://dart.dev/effective-dart/design#do-use-getters-for-operations-that-conceptually-access-properties
[records]: https://dart.dev/language/records
[Unidirectional data flow]: https://en.wikipedia.org/wiki/Unidirectional_Data_Flow_(computer_science)

## 意見回饋

由於本網站此區內容仍在持續演進中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="concepts"

