---
title: 應用程式架構指南
shortTitle: 架構指南
description: >-
  建議的 Flutter 應用程式架構方式。
prev:
    title: 常見架構概念
    path: /app-architecture/concepts
next:
  title: 架構案例研究
  path: /app-architecture/case-study
---

以下頁面將示範如何依循最佳實踐來建構應用程式。本指南中的建議適用於大多數應用程式，能讓應用程式更容易擴展、測試與維護。然而，這些僅為指引而非絕對規則，您應根據自身需求進行調整。

本節將提供 Flutter 應用程式架構的高層次概觀。內容說明應用程式的各個層次，以及每一層中存在的類別。接下來的章節則會提供具體的程式碼範例，並帶您逐步了解一個實作了這些建議的 Flutter 應用程式。

## 專案結構概覽

在設計 Flutter 應用程式時，[關注點分離（Separation-of-concerns）][Separation-of-concerns] 是最重要的原則。您的 Flutter 應用程式應該大致分為兩個主要層次：UI 層與資料層（Data layer）。

每個層次又可細分為不同元件，每個元件都具有明確的職責、定義良好的介面、邊界與相依性。本指南建議您將應用程式拆分為以下元件：

* Views（視圖）
* View models（視圖模型）
* Repositories（儲存庫）
* Services（服務）

### MVVM

如果您曾接觸過 [Model-View-ViewModel 架構模式][Model-View-ViewModel architectural pattern] (MVVM)，這裡的內容會很熟悉。MVVM 是一種將應用程式的功能拆分為三個部分的架構模式：`Model`、`ViewModel` 和 `View`。Views 與 view models 組成應用程式的 UI 層；repositories 與 services 則代表應用程式的資料（即 MVVM 的 model 層）。這些元件的定義會在下一節說明。

<img src='/assets/images/docs/app-architecture/guide/mvvm-intro-with-layers.png' alt="MVVM 架構模式">

應用程式中的每個功能都會包含一個 view（描述 UI）、一個 view model（處理邏輯）、一個或多個 repository（作為應用程式資料的真實來源），以及零個或多個 service（與外部 API 互動，例如客戶端伺服器或平台插件）。

一個應用程式的單一功能可能需要以下所有物件：

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-example.png' alt="本頁所述架構下，單一功能可能存在的 Dart 物件範例。">

本頁將詳細說明這些物件及其之間的箭頭關係。整份指南會以下方這個簡化版圖作為說明主軸。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified.png' alt="本頁所述架構的簡化圖。">

:::note
具有複雜邏輯的應用程式，可能還會有一個邏輯層（logic layer），位於 UI 層與資料層之間。這個邏輯層通常稱為 *domain layer*（領域層）。領域層包含額外的元件，通常稱為 *interactors* 或 *use-cases*（用例）。本指南稍後會介紹領域層。
:::

[Model-View-ViewModel architectural pattern]: https://en.wikipedia.org/wiki/Model–view–viewmodel

## UI 層

應用程式的 UI 層負責與使用者互動。它將應用程式資料顯示給使用者，並接收使用者輸入，例如點擊事件與表單輸入。

UI 會對資料變化或使用者輸入做出反應。當 UI 從 repository 收到新資料時，應重新渲染以顯示新資料。當使用者與 UI 互動時，UI 也應隨之變化以反映該互動。

UI 層由兩個基於 MVVM 設計模式的架構元件組成：

* **Views（視圖）**：描述如何將應用程式資料呈現給使用者。具體來說，指的是構成一個功能的*元件 (Widget) 組合*。例如，一個 view 通常（但不一定）是一個螢幕，包含一個 `Scaffold` 元件，以及在元件樹中其下方的所有元件。view 也負責在使用者互動時，將事件傳遞給 view model。
* **View models（視圖模型）**：包含將應用程式資料轉換為 *UI 狀態（UI State）* 的邏輯，因為從 repository 取得的資料格式，通常與 UI 需要顯示的資料不同。例如，您可能需要合併多個 repository 的資料，或想要過濾資料紀錄清單。

View 與 view model 應該是一對一的關係。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-UI-highlighted.png'
  alt="本頁所述架構簡化圖，已標示出 view 與 view model 物件。">

簡單來說，view model 負責管理 UI 狀態，view 則負責顯示該狀態。透過 view 與 view model，您的 UI 層可以在組態變更（如螢幕旋轉）時維持狀態，且您可以獨立於 Flutter 元件測試 UI 邏輯。

:::note
「View」是一個抽象術語，一個 view 不等於一個元件（Widget）。元件是可組合的，數個元件可以組合成一個 view。因此，view model 與元件不是一對一關係，而是與一組元件（*collection* of widgets）一對一。
:::

應用程式的功能以使用者為中心，因此由 UI 層定義。每一組 *view* 與 *view model* 的配對，就定義了應用程式中的一個功能。這通常是一個螢幕，但不必然如此。例如，考慮登入與登出：

登入通常會在一個專屬螢幕進行，該螢幕唯一目的就是讓使用者登入。在應用程式程式碼中，登入螢幕會由 `LoginViewModel` 類別與 `LoginView` 類別組成。

相對地，登出通常不會有專屬螢幕。登出功能通常以按鈕形式出現在選單、使用者帳戶螢幕或其他多個位置，且常常出現在多個不同地方。在這種情境下，您可能會有一個 `LogoutViewModel` 與 `LogoutView`，其內容僅為一個可插入其他元件的按鈕。

### Views（視圖）

在 Flutter 中，view 就是應用程式的元件（Widget）類別。view 是呈現 UI 的主要方式，不應包含任何商業邏輯。view 應從 view model 接收所有需要渲染的資料。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-View-highlighted.png'
  alt="本頁所述架構簡化圖，已標示出 view 物件。">

view 唯一可以包含的邏輯為：

* 根據 view model 中的旗標或可為 null 的欄位，使用簡單的 if 判斷式顯示或隱藏元件
* 動畫邏輯
* 根據裝置資訊（如螢幕大小或方向）的版面配置邏輯
* 簡單的路由邏輯

所有與資料相關的邏輯都應由 view model 處理。

### View models（視圖模型）

view model 負責公開渲染 view 所需的應用程式資料。在本頁描述的架構設計中，大部分 Flutter 應用程式的邏輯都存在於 view model 中。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-ViewModel-highlighted.png'
  alt="本頁所述架構簡化圖，已標示出 view model 物件。">

view model 的主要職責包括：

* 從 repository 取得應用程式資料，並轉換為適合在 view 呈現的格式。例如，可能需要過濾、排序或彙總資料。
* 維護 view 所需的當前狀態，使 view 能夠重新建置而不會遺失資料。例如，可能包含布林旗標，以條件式渲染 view 中的元件，或追蹤畫面上哪個輪播區段為啟用狀態的欄位。
* 向 view 提供可用於事件處理器（如按鈕點擊或表單送出）的回呼（callback）（稱為 **commands**）。

Commands（命令）名稱來自 [command pattern（命令模式）][command pattern]，是 Dart 函式，讓 view 能執行複雜邏輯而不需知道其實作細節。commands 會作為 view model 類別的成員，由 view 類別中的手勢處理器呼叫。

您可以在 [架構案例研究][App architecture case study] 的 [UI 層][UI layer] 部分找到 view、view model 與 command 的範例。

若想輕鬆入門 Flutter 的 MVVM，請參考 [狀態管理基礎][state management fundamentals]。

[UI layer]: /app-architecture/case-study/ui-layer
[App architecture case study]: /app-architecture/case-study
[state management fundamentals]: /data-and-backend/state-mgmt/intro

## 資料層（Data layer）

應用程式的資料層負責處理商業資料與邏輯。資料層由兩個架構元件組成：services（服務）與 repositories（儲存庫）。這些元件應具有明確的輸入與輸出，以簡化重複使用與測試。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Data-highlighted.png'
  alt="本頁所述架構簡化圖，已標示出資料層。">

以 MVVM 的術語來說，services 與 repositories 組成您的 *model 層*。

### Repositories（儲存庫）

[Repository][Repository] 類別是 model 資料的真實來源。它們負責從 services 輪詢資料，並將原始資料轉換為 **domain models（領域模型）**。領域模型代表應用程式所需的資料，並以 view model 類別可消費的格式呈現。您的應用程式每處理一種不同型態的資料，就應有一個 repository 類別。

repositories 負責與 services 相關的商業邏輯，例如：

* 快取
* 錯誤處理
* 重試邏輯
* 資料刷新
* 輪詢 services 取得新資料
* 根據使用者動作刷新資料

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Repository-highlighted.png'
  alt="本頁所述架構簡化圖，已標示出 Repository 物件。">

repositories 會以領域模型的形式輸出應用程式資料。例如，一個社群媒體應用程式可能有一個 `UserProfileRepository` 類別，公開一個 `Stream<UserProfile?>`，每當使用者登入或登出時就會發出新值。

repository 輸出的模型會被 view model 消費。repositories 與 view models 之間是多對多關係。view model 可以使用多個 repository 取得所需資料，而一個 repository 也可以被多個 view model 使用。

repositories 不應彼此知曉。如果您的應用程式有商業邏輯需要來自兩個 repository 的資料，應在 view model 或 domain layer 合併資料，特別是當 repository 與 view model 之間的關係較為複雜時。

#### 管理全應用程式範圍的 Session 狀態

由於 repositories 是應用程式資料的唯一真實來源，它們也是管理**全應用程式範圍生命週期狀態（app-wide lifecycle state）**的理想位置——這類狀態需要跨多個 view model 共享，但不應在當前應用程式 session 結束後持續存在。

全應用程式範圍生命週期狀態的範例包括：使用中的使用者 session、記憶體內的資料快取，以及暫時性的應用程式設定。由於 view model 與 repository 之間是多對多關係，多個 view model 可以相依於同一個 repository 實例（通常透過 service locator 或相依性注入容器管理）。這讓不同功能能透過 repository 公開的串流與方法，以響應式方式觀察並修改相同的共享狀態，同時不破壞 view 與其 view model 之間清晰的一對一邊界。

### Services（服務）

services 位於應用程式的最底層。它們包裝 API 端點，並公開非同步回應物件，例如 `Future` 與 `Stream` 物件。services 僅用於隔離資料載入，不持有任何狀態。您的應用程式每個資料來源應有一個 service 類別。services 可能包裝的端點範例如下：

* 底層平台，如 iOS 與 Android API
* REST 端點
* 本地檔案

經驗法則是：當所需資料存在於應用程式 Dart 程式碼之外時（如上述例子），services 就最有幫助。

services 與 repositories 之間是多對多關係。一個 repository 可以使用多個 service，而一個 service 也可以被多個 repository 使用。

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Service-highlighted.png'
  alt="本頁所述架構簡化圖，已標示出 Service 物件。">

## 選用：領域層（Domain layer）

隨著應用程式成長並新增功能，您可能需要將過於複雜的邏輯自 view model 中抽離。這些類別通常稱為 interactors 或 **use-cases（用例）**。

use-cases 負責簡化 UI 與資料層之間的互動，並提升重用性。它們從 repository 取得資料，並轉換為適合 UI 層的格式。

<img src='/assets/images/docs/app-architecture/guide/mvvm-intro-with-domain-layer.png'
  alt="MVVM 設計模式，已加入領域層物件">

use-cases 主要用來封裝本應存在於 view model 中、但符合下列一項或多項條件的商業邏輯：

1. 需要合併多個 repository 的資料
2. 邏輯極為複雜
3. 該邏輯會被不同 view model 重複使用

此層為選用，因為不是所有應用程式或功能都需要這些條件。如果您認為應用程式會因這個額外層次受益，請考量下表的優缺點：


| 優點                                                                     | 缺點                                                                                       |
|--------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| ✅ 避免 view model 內的程式碼重複                                         | ❌ 增加架構複雜度，需維護更多類別，認知負擔較高                                              |
| ✅ 將複雜商業邏輯與 UI 邏輯分離，提升可測試性                             | ❌ 測試時需額外建立 mock                                                                     |
| ✅ 提升 view model 內程式碼可讀性                                         | ❌ 增加額外樣板程式碼                                                                        |

{:.table .table-striped}

### 以 use-case 存取資料

在加入領域層時，另一個要考量的點是：view model 是否仍可直接存取 repository 資料，或是必須強制透過 use-case 取得資料。換句話說，您會在需要時才新增 use-case 嗎？也許是當您發現 view model 中出現重複邏輯時？還是每當 view model 需要資料時都建立一個 use-case，即使 use-case 內的邏輯很簡單？

若選擇後者，前述優缺點將更加明顯。您的應用程式程式碼會極度模組化且易於測試，但也會帶來大量不必要的額外負擔。

較佳的做法是：僅在需要時才新增 use-case。如果發現您的 view model 大多透過 use-case 存取資料，隨時可以重構程式碼，全面使用 use-case。本指南後續的範例應用程式，部分功能有 use-case，部分 view model 則直接與 repository 互動。一個複雜的功能最終可能如下圖所示：

<img src='/assets/images/docs/app-architecture/guide/feature-architecture-simplified-with-logic-layer.png'
alt="本頁所述架構簡化圖，已加入 use case 物件。">

這種新增 use-case 的方式由以下規則定義：

* use-case 相依於 repository
* use-case 與 repository 是多對多關係
* view model 相依於一個或多個 use-case *以及* 一個或多個 repository

這種 use-case 的使用方式，不再像層層堆疊的千層麵，更像是一份有兩道主菜（UI 層與資料層）加一道配菜（領域層）的套餐。use-cases 只是具有明確輸入與輸出的實用類別。這個方式靈活且可擴展，但需要更嚴謹的紀律來維持秩序。

[Separation-of-concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns
[command pattern]: https://en.wikipedia.org/wiki/Command_pattern
[Repository]: https://martinfowler.com/eaaCatalog/repository.html

## 意見回饋

本網站這個章節仍持續演進，
歡迎您 [提供意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="guide"
