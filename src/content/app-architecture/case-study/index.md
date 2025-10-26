---
title: 架構案例研究
shortTitle: 架構案例研究
description: >-
  逐步解析一個實作 MVVM 架構模式的 Flutter 應用程式。
prev:
  title: 應用程式架構指南
  path: /app-architecture/guide
next:
  title: UI 層
  path: /app-architecture/case-study/ui-layer
---

本指南中的程式碼範例取自 [Compass 範例應用程式][Compass sample application]，
這是一款協助使用者規劃並預訂旅遊行程的應用程式。
這個範例應用具備多項功能、路由與螢幕，
是一個相當完整且健全的範例。
該應用程式會與 HTTP 伺服器進行通訊，
同時支援開發與正式環境，
包含品牌專屬樣式，並具有高測試覆蓋率。
透過這些特性，它模擬了一個真實世界、功能豐富的 Flutter 應用程式。

<div class="wrapping-row" style="margin-block-end: 2rem">
  {% render docs/app-figure.md, image:"app-architecture/case-study/splash_screen.png", alt:"A screenshot of the splash screen of the compass app.", img-style:"max-height: 400px;" %}
  {% render docs/app-figure.md, image:"app-architecture/case-study/home_screen.png", alt:"A screenshot of the home screen of the compass app.", img-style:"max-height: 400px;" %}
  {% render docs/app-figure.md, image:"app-architecture/case-study/search_form_screen.png", alt:"A screenshot of the search form screen of the compass app.", img-style:"max-height: 400px;" %}
  {% render docs/app-figure.md, image:"app-architecture/case-study/booking_screen.png", alt:"A screenshot of the booking screen of the compass app.", img-style:"max-height: 400px;" %}
</div>

Compass 應用程式的架構最接近 [MVVM 架構模式][MVVM architectural pattern]，
其設計方式可參考 Flutter 的 [應用程式架構指南][app architecture guidelines]。
本架構案例研究將透過 Compass 應用程式的「首頁」功能，
示範如何實作這些指引。
如果你尚未熟悉 MVVM，建議先閱讀上述指南。

Compass 應用程式的首頁會顯示使用者帳戶資訊，
以及使用者儲存的行程清單。
你可以在此螢幕登出、開啟詳細行程頁面、
刪除已儲存的行程，並導向應用程式核心流程的第一頁，
讓使用者建立新的行程規劃。

在本案例研究中，你將學到以下內容：

* 如何在 [資料層][data layer] 使用 repository 與 service，
  並在 [UI 層][UI layer] 實作 MVVM 架構模式，以落實 Flutter 的 [應用程式架構指南][app architecture guidelines]
* 如何運用 [Command 模式][Command pattern]，在資料變動時安全地渲染 UI
* 如何使用 [`ChangeNotifier`][`ChangeNotifier`] 與 [`Listenable`][`Listenable`] 物件來管理狀態
* 如何使用 `package:provider` 實作 [依賴注入（Dependency Injection）][Dependency Injection]
* 遵循推薦架構時，如何 [設置測試][set up tests]
* 適用於大型 Flutter 應用程式的 [套件結構][package structure]

本案例研究建議依照順序閱讀，
各頁內容可能會參考前面章節。

本案例研究中的程式碼範例，包含了理解架構所需的所有細節，
但並非完整、可直接執行的程式片段。
如果你希望參考完整應用程式，
可以在 [GitHub][GitHub] 找到原始碼。

## 套件結構

良好組織的程式碼，能讓多位工程師協作時減少衝突，
也讓新進工程師更容易理解與導覽專案。
程式碼組織與明確的架構設計相輔相成。

常見的程式碼組織方式有兩種：

1. 依功能（feature）劃分——將每個功能所需的類別歸在一起。
   例如，你可能會有一個 `auth` 目錄，裡面包含
   `auth_viewmodel.dart`、`login_usecase.dart`、`logout_usecase.dart`、
   `login_screen.dart`、`logout_button.dart` 等檔案。
2. 依型態（type）劃分——將每種「型態」的架構物件歸在一起。
   例如，你可能會有 `repositories`、`models`、`services`、`viewmodels` 等目錄。

本指南推薦的架構，適合結合這兩種方式。
資料層物件（repository 與 service）通常不綁定於單一功能，
而 UI 層物件（view 與 view model）則與特定功能相關。
以下說明 Compass 應用程式的程式碼組織方式。

```plaintext
lib
├─┬─ ui
│ ├─┬─ core
│ │ ├─┬─ ui
│ │ │ └─── <shared widgets>
│ │ └─── themes
│ └─┬─ <FEATURE NAME>
│   ├─┬─ view_model
│   │ └─── <view_model class>.dart
│   └─┬─ widgets
│     ├── <feature name>_screen.dart
│     └── <other widgets>
├─┬─ domain
│ └─┬─ models
│   └─── <model name>.dart
├─┬─ data
│ ├─┬─ repositories
│ │ └─── <repository class>.dart
│ ├─┬─ services
│ │ └─── <service class>.dart
│ └─┬─ model
│   └─── <api model class>.dart
├─── config
├─── utils
├─── routing
├─── main_staging.dart
├─── main_development.dart
└─── main.dart

// The test folder contains unit and widget tests
test
├─── data
├─── domain
├─── ui
└─── utils

// The testing folder contains mocks other classes need to execute tests
testing
├─── fakes
└─── models
```

大部分的應用程式程式碼都位於 `data`、`domain` 和 `ui` 資料夾中。  
`data` 資料夾依照類型來組織程式碼，因為 repositories 和 services 可以跨不同功能以及被多個 view model 使用。  
`ui` 資料夾則依照功能來組織程式碼，因為每個功能都會對應一個 view 和一個 view model。

這個資料夾結構還有其他值得注意的特點：

* `ui` 資料夾下還包含一個名為 `core` 的子目錄。`core` 內含多個 view 共用的元件 (Widgets) 和主題邏輯，例如具有品牌樣式的按鈕。
* `domain` 資料夾包含應用程式的資料型別，因為這些型別會被 `data` 和 `ui` 層共同使用。
* `app` 目錄下有三個 "main" 檔案，分別作為開發、測試（staging）和正式（production）環境的不同進入點。
* 在與 `lib` 同一層級有兩個與測試相關的目錄：`test/` 放置測試程式碼，其結構與 `lib/` 相同。`testing/` 則是一個子套件，包含可供其他套件測試程式碼使用的 mock 及其他測試工具。`testing/` 資料夾可以被描述為「你不會發佈的 app 版本」，它是用來進行測試的內容。

在 compass app 中還有一些與架構無關的額外程式碼。  
完整的套件結構，請[在 GitHub 上查看][view it on GitHub]。

## 其他架構選項

本案例研究中的範例展示了一個應用程式如何遵循我們推薦的架構規則，但其實還有許多其他範例應用可以寫出來。這個 app 的 UI 很大程度上依賴 view model 和 `ChangeNotifier`，但其實也可以用 streams，或是其他像 [`riverpod`][`riverpod`]、[`flutter_bloc`][`flutter_bloc`] 和 [`signals`][`signals`] 套件所提供的函式庫來實作。

本 app 各層之間的溝通全部都用方法呼叫來處理，包括輪詢新資料。你也可以改用 streams，將 repository 的資料公開給 view model，同時仍然遵守本指南涵蓋的規則。

即使你完全照本指南實作，且選擇不額外引入其他函式庫，仍然有一些決策需要做：  
你會有 domain 層嗎？如果有，你要如何管理資料存取？  
答案高度依賴於每個團隊的需求，因此沒有唯一正確的做法。  
無論你的選擇為何，本指南中的原則都能協助你撰寫可擴展的 Flutter 應用程式。

而且如果你仔細想想，其實所有架構本質上不都是 MVVM 嗎？

[Compass sample application]: https://github.com/flutter/samples/tree/main/compass_app
[MVVM architectural pattern]: https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel
[app architecture guidelines]: /app-architecture/guide
[data layer]: /app-architecture/case-study/data-layer
[UI layer]: /app-architecture/case-study/ui-layer
[Command pattern]: /app-architecture/case-study/ui-layer#command-objects
[`ChangeNotifier`]: {{site.api}}/flutter/foundation/ChangeNotifier-class.html
[`Listenable`]: {{site.api}}/flutter/foundation/Listenable-class.html
[Dependency Injection]: /app-architecture/case-study/dependency-injection
[set up tests]: /app-architecture/case-study/testing
[view it on GitHub]: https://github.com/flutter/samples/tree/main/compass_app
[GitHub]: https://github.com/flutter/samples/tree/main/compass_app
[`riverpod`]: {{site.pub-pkg}}/riverpod
[`flutter_bloc`]: {{site.pub-pkg}}/flutter_bloc
[`signals`]: {{site.pub-pkg}}/signals
[package structure]: /app-architecture/case-study#package-structure

## 意見回饋

由於本網站區塊仍在持續演進中，  
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="case-study/index"
