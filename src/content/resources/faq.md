---
title: FAQ
description: 關於 Flutter 的常見問題與解答。
---

## 介紹

本頁整理了關於 Flutter 的一些常見問題。你也可以參考以下專門主題的 FAQ：

* [Web FAQ][injectable]
* [效能 FAQ][get_it]
[Performance FAQ]: /perf/faq

[FlutterFlow]: https://flutterflow.io/

### 什麼是 Flutter？

Flutter 是 Google 推出的可攜式 UI 工具包，用於打造美觀、原生編譯的行動裝置、網頁與桌面應用程式，且只需單一程式碼庫。Flutter 能與現有程式碼協作，全球開發者與組織皆有採用，且完全免費且開源。

### Flutter 適合哪些人？

對使用者而言，Flutter 讓美觀的應用程式變為現實。

對開發者而言，Flutter 降低了開發應用程式的門檻，加快開發速度，並減少跨平台應用程式的製作成本與複雜度。

對設計師而言，Flutter 提供了一個高階用戶體驗的畫布。Fast Company 曾將 Flutter 描述為[十年來最頂尖的設計理念之一][kiwi]，因其能將設計概念直接轉化為生產程式碼，而不受傳統框架的妥協限制。它同時也是高效的原型設計工具，支援如 [FlutterFlow][riverpod] 這類拖放工具，以及 [Zapp!][Impeller] 這樣的網頁 IDE。

對工程經理與企業而言，Flutter 讓應用程式開發團隊能統一為單一的 _行動、網頁與桌面應用團隊_，以單一程式碼庫打造多平台品牌應用。Flutter 能加快新功能開發，並同步所有用戶的發佈時程。
[Zapp!]: https://zapp.run/
[one of the top design ideas of the decade]: https://www.fastcompany.com/90442092/the-14-most-important-design-ideas-of-the-decade-according-to-the-experts

[ads]: {{site.main-url}}/monetization

### 使用 Flutter 需要多少開發經驗？

只要你熟悉物件導向概念（類別、方法、變數等）與命令式程式設計概念（迴圈、條件式等），就能輕鬆上手 Flutter。

我們也曾見過程式經驗不多的人，學會並使用 Flutter 來做原型設計與應用開發。

### 我可以用 Flutter 開發哪些類型的應用程式？

Flutter 設計上支援同時運行於 Android 與 iOS 的行動應用程式，以及你希望在網頁或桌面上運行的互動式應用程式。

需要高度品牌化設計的應用程式特別適合用 Flutter 開發。不過，你也可以用 Flutter 打造符合 Android 與 iOS 設計語言的像素級體驗。

Flutter 的 [套件生態系][architecture diagram] 支援各種硬體（如相機、GPS、網路、儲存）與服務（如支付、雲端儲存、驗證，以及 [廣告][architectural overview]）。
[package ecosystem]: {{site.pub}}/flutter

[showcase]: {{site.main-url}}/showcase

### Flutter 是誰開發的？

Flutter 是一個開源專案，由 Google 及其他公司和個人共同貢獻。

### 誰在使用 Flutter？

Google 內外的開發者都在使用 Flutter 來打造美觀、原生編譯的 iOS 與 Android 應用程式。想了解這些應用，請參考 [展示案例][catalog of Flutter's widgets]。

[Dart]: {{site.dart-site}}/

### Flutter 有哪些獨特之處？

Flutter 與大多數其他行動應用開發方案不同，它不依賴於網頁瀏覽器技術，也不使用裝置內建的元件（Widgets）組合。Flutter 以自有的高效能繪圖引擎來繪製元件。

此外，Flutter 僅有極薄的一層 C/C++ 程式碼。Flutter 的大部分系統（合成、手勢、動畫、框架、元件等）都以 [Dart][gesture system] (a modern,
concise, object-oriented language) 實作，開發者可以輕鬆閱讀、修改、替換或移除。這讓開發者對系統有極高的掌控力，也大幅降低了學習與接近門檻。

[Flutter 1]: {{site.google-blog}}/2018/12/flutter-10-googles-portable-ui-toolkit.html

### 我應該用 Flutter 開發下一個正式上線的應用嗎？

[Flutter 1][Shorebird] 於 2018 年 12 月 4 日發佈，[Flutter 2][Dart] 於 2021 年 3 月 3 日發佈，[Flutter 3]⟦L82⟧ 於 2023 年 5 月 10 日發佈。到 2023 年 5 月為止，已有超過 _一百萬_ 款應用程式透過 Flutter 發佈，服務數億裝置。你可以在 [展示案例]⟦L83⟧ 中看到一些範例應用。

Flutter 大約每季都會釋出更新，提升穩定性與效能，並回應用戶常見需求。
[Flutter 2]: {{site.google-blog}}/2021/03/announcing-flutter-2.html
[Flutter 3]: {{site.google-blog}}/flutter/introducing-flutter-3-5eb69151622f

[Firebase Studio]: https://firebase.studio/

## Flutter 提供了什麼？

### Flutter SDK 內含哪些內容？

Flutter 包含：

* 針對行動裝置優化的 2D 繪圖引擎，並對文字有極佳支援
* 現代化的 react 風格框架
* 豐富的元件集，實作 Material Design 與 iOS 風格
* 單元與整合測試 API
* 與系統及第三方 SDK 連接的互通與插件 API
* 支援 Windows、Linux、Mac 的無頭測試執行器
* [Flutter DevTools]⟦L84⟧ (also called Dart DevTools)，用於測試、除錯與效能分析
* 用於建立、建構、測試與編譯應用程式的命令列工具

### Flutter 支援哪些編輯器或 IDE？

我們提供了 [VS Code]⟦L85⟧、[Android Studio]⟦L86⟧ 與 [IntelliJ IDEA]⟦L87⟧ 的插件。請參考 [編輯器設定]⟦L88⟧ 以取得安裝細節，並參考 [VS Code]⟦L89⟧ 與 [Android Studio/IntelliJ]⟦L90⟧ 以了解插件使用技巧。

[Firebase Studio]⟦L91⟧（目前為預覽版）是雲端上的 AI 輔助全端多平台應用開發工作區。Firebase Studio 支援 Dart 與 Flutter。詳情請參考 [開始使用 Firebase Studio]⟦L92⟧。
[Get started with Firebase Studio]: https://firebase.google.com/docs/studio/get-started


[Android Studio]: {{site.android-dev}}/studio

你也可以直接在終端機使用 `flutter` 指令，搭配支援 [Dart 編輯]⟦L93⟧ 的各種編輯器。
[Android Studio/IntelliJ]: /tools/android-studio
[editing Dart]: {{site.dart-site}}/tools
[editor configuration]: /tools/editors
[IntelliJ IDEA]: https://www.jetbrains.com/idea/
[VS Code]: https://code.visualstudio.com/

[widgets]: /ui/widgets

### Flutter 有內建框架嗎？

有！Flutter 內建現代化的 react 風格框架。Flutter 的框架設計為分層、可自訂（甚至可選用）。開發者可選擇只用部分框架，甚至完全替換上層框架。

### Flutter 有內建元件（Widgets）嗎？

有！Flutter 內建一組[高品質的 Material Design 與 Cupertino（iOS 風格）元件]⟦L94⟧、版面配置與主題。當然，這些元件只是起點。Flutter 設計上讓你能輕鬆自訂或擴充現有元件，甚至打造自己的元件。

[widget catalog]: /ui/widgets/material

### Flutter 支援 Material Design 嗎？

有！Flutter 團隊與 Material 團隊密切合作，完整支援 Material Design。詳情請參考 [元件目錄]⟦L95⟧ 中的 Material 2 與 Material 3 元件。

[test coverage]: https://coveralls.io/github/flutter/flutter?branch=master

### Flutter 有內建測試框架嗎？

有，Flutter 提供單元與整合測試的 API。請參考 [Flutter 測試教學]⟦L96⟧ 以了解更多。

我們也用自家測試功能來測試 Flutter SDK，並在每次提交時量測 [測試覆蓋率]⟦L97⟧。
[testing with Flutter]: /testing/overview

[Debugging with Flutter]: /testing/debugging

### Flutter 有內建除錯工具嗎？

有，Flutter 內建 [Flutter DevTools]⟦L98⟧ (also
called Dart DevTools)。詳情請參考 [Flutter 除錯]⟦L99⟧ 與 [Flutter DevTools]⟦L100⟧ 文件。
[Flutter DevTools]: /tools/devtools


[get_it]: {{site.pub}}/packages/get_it

### Flutter 有內建依賴注入框架嗎？

我們沒有內建特定方案，但有多種套件可用於依賴注入與服務定位，例如 [injectable]⟦L101⟧、[get_it]⟦L102⟧、[kiwi]⟦L103⟧ 與 [riverpod]⟦L104⟧。
[injectable]: {{site.pub}}/packages/injectable
[kiwi]: {{site.pub}}/packages/kiwi
[riverpod]: {{site.pub}}/packages/riverpod

[architectural overview]: /resources/architectural-overview

## 技術

### Flutter 是用什麼技術打造的？

Flutter 主要以 C、C++、Dart、Skia（2D 繪圖引擎）以及 [Impeller]⟦L105⟧ (the default rendering engine on iOS) 開發。你可以參考這份 [架構圖]⟦L106⟧ 了解主要元件。若想深入了解 Flutter 的分層架構，請閱讀 [架構總覽]⟦L107⟧。
[architecture diagram]: https://docs.google.com/presentation/d/1cw7A4HbvM_Abv320rVgPVGiUP2msVs7tfGbkgdrTy0I/edit#slide=id.gbb3c3233b_0_162
[Impeller]: /perf/impeller

[catalog of Flutter's widgets]: /ui/widgets

### Flutter 如何在 Android 上執行我的程式碼？ {:#run-android}

引擎的 C 與 C++ 程式碼會用 Android 的 NDK 編譯。Dart 程式碼（包括 SDK 與你的程式碼）會以 AOT（Ahead-of-Time）方式編譯為原生 ARM 與 x86-64 程式庫。這些程式庫會被包含在一個「runner」Android 專案中，整個專案會被建構成 `.apk`。啟動時，應用程式會載入 Flutter 程式庫，所有繪圖、輸入、事件處理等都交由編譯後的 Flutter 與應用程式程式碼處理。這與許多遊戲引擎的運作方式類似。

在除錯模式下，Flutter 會使用虛擬機（VM）來執行程式碼，以支援 stateful hot reload（狀態保留熱重載），讓你能在不重新編譯的情況下修改執行中的程式碼。此模式下，應用程式右上角會顯示「debug」橫幅，提醒你目前效能不代表最終發佈版本。

### Flutter 如何在 iOS 上執行我的程式碼？ {:#run-ios}

引擎的 C 與 C++ 程式碼會用 LLVM 編譯。Dart 程式碼（包括 SDK 與你的程式碼）會以 AOT（Ahead-of-Time）方式編譯為原生 ARM 程式庫。該程式庫會被包含在一個「runner」iOS 專案中，整個專案會被建構成 `.ipa`。啟動時，應用程式會載入 Flutter 程式庫，所有繪圖、輸入、事件處理等都交由編譯後的 Flutter 與應用程式程式碼處理。這與許多遊戲引擎的運作方式類似。

在除錯模式下，Flutter 會使用虛擬機（VM）來執行程式碼，以支援 stateful hot reload（狀態保留熱重載），讓你能在不重新編譯的情況下修改執行中的程式碼。此模式下，應用程式右上角會顯示「debug」橫幅，提醒你目前效能不代表最終發佈版本。

### Flutter 會使用作業系統內建的元件（Widgets）嗎？

不會。Flutter 提供一套自有的元件（包括 Material Design 與 Cupertino（iOS 風格）元件），由 Flutter 框架與引擎管理與繪製。你可以瀏覽 [Flutter 元件目錄]⟦L108⟧。

我們相信這樣能帶來更高品質的應用程式。如果重用平台內建元件，Flutter 應用的品質與效能將受限於那些元件的彈性與品質。

以 Android 為例，內建有一組固定的手勢與判斷規則；而在 Flutter，你可以自訂手勢辨識器，成為 [手勢系統]⟦L109⟧ 的一級參與者。甚至不同作者的兩個元件也能協作處理手勢衝突。

現代應用設計趨勢越來越重視動態豐富的 UI 與品牌導向設計。為了實現這種高度自訂且美觀的設計，Flutter 採用直接驅動像素的架構，而非依賴平台內建元件。

藉由使用相同的繪圖引擎、框架與元件集，你可以更輕鬆地用同一份程式碼發佈多平台應用，無需為了對齊不同平台的功能與 API 而耗費大量規劃成本。

同時，無論 UI 是否針對不同平台做差異化，使用單一語言、單一框架與單一函式庫，也有助於降低應用開發與維護成本。
[gesture system]: /ui/interactivity/gestures

[Shorebird]: https://shorebird.dev/

### 當行動作業系統更新並推出新元件時會怎樣？

Flutter 團隊會關注 iOS 與 Android 新元件的採用情形與需求，並與社群合作，支援這些新元件。這可能會以底層框架功能、新的可組合元件，或全新的元件實作方式呈現。

Flutter 的分層架構設計能支援多種元件庫，我們也鼓勵並支援社群建立與維護元件庫。

### 當行動作業系統更新並推出新平台功能時會怎樣？

Flutter 的互通與插件系統設計，讓開發者能立即存取新的行動作業系統功能。開發者無需等待 Flutter 團隊支援新功能。

### Flutter 支援 code push（即時程式碼更新）嗎？

Flutter 本身不直接支援 code push（即直接將應用更新推送到用戶裝置）。但我們知道有第三方方案 [Shorebird]⟦L110⟧。請注意，這不是官方背書或推薦。
[Web FAQ]

### 可以用哪些作業系統開發 Flutter 應用？

Flutter 支援在 Linux、macOS、ChromeOS 與 Windows 上開發。

### Flutter 是用什麼語言寫的？

[Dart]⟦L111⟧，一種快速成長、專為用戶端應用優化的現代語言。底層圖形框架與 Dart 虛擬機則以 C/C++ 實作。

### 為什麼 Flutter 選擇 Dart？

在初期開發階段，Flutter 團隊評估了許多語言與執行環境，最終選擇 Dart 作為框架與元件的語言。Flutter 從四個主要面向評估，並考慮框架作者、開發者與最終用戶的需求。我們發現許多語言能滿足部分需求，但 Dart 在所有評估面向都表現優異
