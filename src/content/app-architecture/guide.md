---
title: 應用程式架構指南
shortTitle: 架構指南
description: >
  建議的 Flutter 應用程式架構方式。
prev:
    title: 常見架構概念
    path: /app-architecture/concepts
next:
  title: 架構案例研究
  path: /app-architecture/case-study
---

以下頁面將示範如何依循最佳實踐來建構應用程式。
本指南中的建議適用於大多數應用程式，
能讓應用程式更容易擴展、測試與維護。
然而，這些只是指引而非絕對規則，
你應根據自身需求進行調整。

本節將提供 Flutter 應用程式架構的高層次概覽。
說明應用程式的各個層次，
以及每個層次中包含的類別。
接下來的章節則會提供具體的程式碼範例，
並帶你一步步了解一個實作這些建議的 Flutter 應用程式。

## 專案結構總覽

在設計 Flutter 應用程式時，[關注點分離（Separation of concerns）][Separation-of-concerns] 是最重要的原則。
你的 Flutter 應用程式應該大致分為兩個主要層次：
UI 層（UI layer）與資料層（Data layer）。

每個層次又細分為不同的元件，
每個元件都有明確的職責、定義良好的介面、
邊界與相依關係。
本指南建議你將應用程式拆分為以下元件：

* Views（視圖）
* View models（視圖模型）
* Repositories（儲存庫）
* Services（服務）

### MVVM

如果你曾接觸過 [Model-View-ViewModel（MVVM）架構模式][Model-View-ViewModel architectural pattern] (MVVM)，
這一切將會很熟悉。
MVVM 是一種將應用程式功能拆分為三個部分的架構模式：
`Model`、`ViewModel` 以及 `View`。
Views 和 view models 組成應用程式的 UI 層。
Repositories 和 services 則代表應用程式的資料，
也就是 MVVM 的 model 層。
這些元件的詳細定義會在下一節說明。

<img src='/assets/images/docs/app-architecture/guide/mvvm-intro-with-layers.png' alt="MVVM architectural pattern">

應用程式中的每個功能都會包含一個 view 來描述 UI，
以及一個 view model 處理邏輯，
一個或多個 repositories 作為應用程式資料的真實來源，
以及零個或多個與外部 API（如客戶端伺服器與平台插件）互動的 services。

單一功能可能會需要以下所有物件：

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-example.png' alt="An example of the Dart objects that might exist in one feature using the architecture described on page.">

本頁將詳細解釋這些物件及其之間的連結箭頭。
在本指南中，會以下方這個簡化版圖示作為說明的主軸。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified.png' alt="A simplified diagram of the architecture described on this page.">

:::note
邏輯較為複雜的應用程式，可能還會有一個介於 UI 層與資料層之間的邏輯層（logic layer）。
這個邏輯層通常稱為 *domain layer*（領域層）。
領域層包含額外的元件，通常稱為 *interactors* 或 *use-cases*（用例）。
本指南稍後會介紹領域層。
:::

[Model-View-ViewModel architectural pattern]: https://en.wikipedia.org/wiki/Model–view–viewmodel

## UI 層

應用程式的 UI 層負責與使用者互動。
它將應用程式的資料顯示給使用者，並接收使用者輸入，
例如點擊事件與表單輸入。

UI 會對資料變化或使用者輸入做出反應。
當 UI 從 Repository 收到新資料時，
應重新渲染以顯示新資料。
當使用者與 UI 互動時，
UI 也應隨之變化以反映該互動。

UI 層由兩個基於 MVVM 設計模式的架構元件組成：

* **Views（視圖）**：描述如何將應用程式資料呈現給使用者。
  具體來說，指的是「元件（Widgets）組合」來構成一個功能。
  例如，一個 view 通常（但不一定）是一個螢幕，
  其包含一個 `Scaffold` 元件，以及
  元件樹中所有位於其下的元件。
  View 也負責在使用者互動時，將事件傳遞給 view model。
* **View models（視圖模型）**：包含將應用程式資料轉換為 *UI 狀態（UI State）* 的邏輯，
  因為從 repositories 取得的資料格式，通常與 UI 需要顯示的資料不同。
  例如，你可能需要合併多個 repository 的資料，
  或需要對資料記錄清單進行篩選。

View 與 view model 應該是一對一的關係。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-UI-highlighted.png' alt="A simplified diagram of the architecture described on this page with the view and view model objects highlighted.">

簡單來說，
view model 負責管理 UI 狀態，view 則負責顯示該狀態。
透過 views 與 view models，你的 UI 層可以在
組態變更（如螢幕旋轉）時維持狀態，
並且可以獨立於 Flutter 元件測試 UI 邏輯。

:::note
「View」是一個抽象術語，一個 view 並不等於一個元件（Widget）。
元件是可組合的，數個元件可組合成一個 view。
因此，view model 與單一元件並非一對一關係，
而是與一組元件（*collection* of widgets）一對一。
:::

應用程式的一個功能是以使用者為中心，
因此由 UI 層來定義。
每一組 *view* 與 *view model* 的配對，即定義了應用程式中的一個功能。
這通常是一個螢幕，但不一定如此。
舉例來說，登入與登出：

登入通常在一個專屬螢幕上進行，
其唯一目的就是讓使用者登入。
在應用程式程式碼中，登入螢幕會由一個 `LoginViewModel` 類別與一個 `LoginView` 類別組成。

相反地，
登出通常不會有專屬螢幕。
登出功能通常以按鈕的形式出現在選單、使用者帳戶頁面，
或其他多個位置，甚至同時出現在多個地方。
這種情境下，你可能會有一個 `LogoutViewModel` 與一個 `LogoutView`，
其中只包含一個可嵌入其他元件的按鈕。

### Views（視圖）

在 Flutter 中，views 就是你的應用程式的元件（Widget）類別。
Views 是渲染 UI 的主要方式，
不應包含任何商業邏輯。
它們應該從 view model 接收所有需要渲染的資料。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-View-highlighted.png' alt="A simplified diagram of the architecture described on this page with the view object highlighted.">

View 中唯一應包含的邏輯為：

* 根據 view model 中旗標或可為 null 的欄位，使用簡單的 if 判斷式顯示或隱藏元件
* 動畫邏輯
* 根據裝置資訊（如螢幕大小或方向）的版面配置邏輯
* 簡單的路由邏輯

所有與資料相關的邏輯都應由 view model 處理。

### View models（視圖模型）

View model 負責公開渲染 view 所需的應用程式資料。
在本頁描述的架構設計中，
大部分 Flutter 應用程式的邏輯都存在於 view model 中。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-ViewModel-highlighted.png' alt="A simplified diagram of the architecture described on this page with the view model object highlighted.">

View model 的主要職責包括：

* 從 repositories 取得應用程式資料，並轉換為適合在 view 呈現的格式。
  例如，可能需要對資料進行篩選、排序或彙總。
* 維護 view 所需的目前狀態，
  讓 view 可以重新建構而不會遺失資料。
  例如，可能包含布林旗標以條件式渲染 view 中的元件，
  或追蹤輪播（carousel）目前顯示哪一區段的欄位。
* 向 view 提供可綁定事件處理器的回呼（**commands**），
  例如按鈕點擊或表單送出。

Commands（命令）名稱來自於 [command pattern（命令模式）][command pattern]，
是 Dart 函式，讓 views 可以
執行複雜邏輯而不需了解其實作細節。
Commands 會作為 view model 類別的成員，
供 view 類別中的手勢處理器呼叫。

你可以在
[App 架構案例研究][App architecture case study]的[UI 層][UI layer]章節中找到 views、view models 與 commands 的範例。

若想了解 Flutter 中 MVVM 的入門介紹，
可參考 [狀態管理基礎][state management fundamentals]。

[UI layer]: /app-architecture/case-study/ui-layer
[App architecture case study]: /app-architecture/case-study
[state management fundamentals]: /get-started/fundamentals/state-management

## 資料層（Data layer）

應用程式的資料層負責處理你的商業資料與邏輯。
資料層由兩個架構元件組成：services（服務）與 repositories（儲存庫）。
這些元件應有明確定義的輸入與輸出，
以簡化其重複使用性與可測試性。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Data-highlighted.png' alt="A simplified diagram of the architecture described on this page with the Data layer highlighted.">

以 MVVM 的術語來說，services 與 repositories 組成你的 *model 層*。

### Repositories（儲存庫）

[Repository][Repository] 類別是你的 model 資料的真實來源（source of truth）。
它們負責從 services 輪詢（polling）資料，
並將原始資料轉換為 **domain models（領域模型）**。
領域模型代表應用程式所需的資料，
並以 view model 類別可消費的格式呈現。
每種不同類型的資料，都應有一個 repository 類別負責。

Repositories 處理與 services 相關的商業邏輯，例如：

* 快取
* 錯誤處理
* 重試邏輯
* 資料刷新
* 從 services 輪詢新資料
* 根據使用者動作刷新資料

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Repository-highlighted.png' alt="A simplified diagram of the architecture described on this page with the Repository object highlighted.">

Repositories 會以領域模型（domain models）形式輸出應用程式資料。
舉例來說，社群媒體應用程式可能有一個
`UserProfileRepository` 類別，公開一個 `Stream<UserProfile?>`，
每當使用者登入或登出時就會發出新值。

Repositories 輸出的模型會被 view models 消費。
Repositories 與 view models 之間是多對多關係。
一個 view model 可以使用多個 repositories 取得所需資料，
而一個 repository 也可以被多個 view models 使用。

Repositories 之間不應彼此知曉。
如果你的應用程式有商業邏輯需要兩個 repositories 的資料，
你應在 view model 或 domain layer 合併資料，
特別是當 repository 與 view model 的關係較為複雜時。

### Services（服務）

Services 位於應用程式的最底層。
它們包裝 API 端點，並公開非同步回應物件，
如 `Future` 與 `Stream` 物件。
Services 僅用於隔離資料載入，且不持有任何狀態。
你的應用程式每個資料來源應有一個 service 類別。
Services 可能包裝的端點範例包括：

* 底層平台，如 iOS 和 Android API
* REST 端點
* 本地檔案

經驗法則是，當所需資料存在於應用程式 Dart 程式碼之外時，
services 就會非常有幫助——上述每個例子都屬於此情境。

Services 與 repositories 之間是多對多關係。
單一 Repository 可以使用多個 services，
而一個 service 也可以被多個 repositories 使用。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Service-highlighted.png' alt="A simplified diagram of the architecture described on this page with the Service object highlighted.">

## 選用：領域層（Domain layer）

隨著應用程式成長並新增功能，你可能需要將複雜邏輯自 view models 中抽離。
這些類別通常稱為 interactors 或 **use-cases（用例）**。

Use-cases 負責讓 UI 層與資料層的互動更簡單、更可重用。
它們從 repositories 取得資料，並轉換為適合 UI 層的格式。

<img src='/assets/images/docs/app-architecture/guide/mvvm-intro-with-domain-layer.png' alt="MVVM design pattern with an added domain layer object">

Use-cases 主要用於封裝本來會存在於 view model 中的商業邏輯，且符合下列一個或多個條件：

1. 需要合併多個 repositories 的資料
2. 邏輯極為複雜
3. 該邏輯會被不同的 view models 重複使用

這個層次是選用的，因為不是所有應用程式或功能都需要這些條件。
如果你認為應用程式
會因這個額外層次而受益，可以考慮以下優缺點：

| 優點                                                                     | 缺點                                                                                       |
|--------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| ✅ 避免 view models 中的程式碼重複                                       | ❌ 增加架構複雜度，帶來更多類別與更高的認知負擔                                            |
| ✅ 藉由將複雜商業邏輯與 UI 邏輯分離，提高可測試性                        | ❌ 測試時需要額外的 mock                                                                    |
| ✅ 提高 view models 中的程式碼可讀性                                     | ❌ 增加額外樣板程式碼                                                                        |

{:.table .table-striped}

### 使用 use-cases 存取資料

在新增領域層時，另一個考量是 view models 是否仍可直接存取 repository 資料，
還是強制 view models 必須透過 use-cases 取得資料。換句話說，
你會在需要時才新增 use-cases 嗎？
也許是在發現 view models 中有重複邏輯時？
還是每當 view model 需要資料時都建立一個 use-case，
即使 use-case 中的邏輯很簡單？

如果你選擇後者，
前述優缺點會更加明顯。
你的應用程式程式碼將會非常模組化且易於測試，
但也會增加大量不必要的負擔。

較佳做法是僅在需要時才新增 use-cases。
如果你發現 view models
大多數時候都透過 use-cases 存取資料，
你隨時可以重構程式碼，完全採用 use-cases。
本指南後續的範例應用程式，部分功能有 use-cases，
也有直接與 repositories 互動的 view models。
一個複雜功能最終可能會長這樣：

<img src='/assets/images/docs/app-architecture/guide/
