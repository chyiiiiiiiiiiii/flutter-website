# 常見問題 (FAQ)

> 關於 Flutter 的常見問題與解答。



## 介紹

本頁整理了關於 Flutter 的一些常見問題。你也可以參考以下專門主題的 FAQ：

* [Web FAQ][]
* [效能 FAQ][Performance FAQ]

[Web FAQ]: /platform-integration/web/faq
[Performance FAQ]: /perf/faq

### 什麼是 Flutter？

Flutter 是 Google 推出的可攜式 UI 工具包，用於以單一程式碼庫打造精美、原生編譯的行動裝置、網頁與桌面應用程式。Flutter 能與現有程式碼協作，受到全球開發者與組織的採用，且完全免費並開源。

### Flutter 適合哪些人？

對使用者而言，Flutter 讓美觀的應用程式得以實現。

對開發者而言，Flutter 降低了建置應用程式的門檻，加快開發速度，並減少跨平台應用程式的製作成本與複雜度。

對設計師而言，Flutter 提供了一個高端使用者體驗的設計畫布。Fast Company 曾將 Flutter 評選為[十年來最重要的設計理念之一][one of the top design ideas of the decade]，因其能將概念直接轉化為生產程式碼，而不受傳統框架所帶來的妥協限制。它同時也是高效的原型設計工具，支援如 [FlutterFlow][] 這類拖放工具，以及 [Zapp!][] 這樣的網頁 IDE。

對工程經理與企業而言，Flutter 讓應用程式開發團隊能整合為單一的 _行動、網頁與桌面應用團隊_，以單一程式碼庫打造多平台品牌應用程式。Flutter 能加快功能開發速度，並同步整個用戶群的發佈時程。

[FlutterFlow]: https://flutterflow.io/
[Zapp!]: https://zapp.run/
[one of the top design ideas of the decade]: https://www.fastcompany.com/90442092/the-14-most-important-design-ideas-of-the-decade-according-to-the-experts

### 使用 Flutter 需要多少開發經驗？

只要熟悉物件導向概念（類別、方法、變數等）與命令式程式設計概念（迴圈、條件式等），就能輕鬆上手 Flutter。

我們也曾見過程式設計經驗不多的人，學習並使用 Flutter 來做原型設計與應用程式開發。

### 我可以用 Flutter 開發哪些類型的應用程式？

Flutter 設計上支援同時運行於 Android 與 iOS 的行動應用程式，以及你希望在網頁或桌面上執行的互動式應用程式。

需要高度品牌化設計的應用程式特別適合用 Flutter 開發。不過，你也可以用 Flutter 打造符合 Android 與 iOS 設計語言的像素完美體驗。

Flutter 的[套件生態系][package ecosystem]支援各種硬體（如相機、GPS、網路、儲存）與服務（如支付、雲端儲存、驗證，以及[廣告][ads]）。

[ads]: https://flutter.dev/monetization
[package ecosystem]: https://pub.dev/flutter

### Flutter 是誰開發的？

Flutter 是一個開源專案，由 Google 及其他公司和個人共同貢獻。

### 誰在使用 Flutter？

Google 內外的開發者都在使用 Flutter 來打造美觀、原生編譯的 iOS 與 Android 應用程式。想了解其中一些應用程式，請瀏覽[展示案例][showcase]。

[showcase]: https://flutter.dev/showcase

### Flutter 有哪些獨特之處？

Flutter 與大多數其他行動應用開發方案不同，它不依賴網頁瀏覽器技術，也不使用裝置內建的元件 (Widget) 集合。Flutter 使用自有的高效能渲染引擎來繪製元件。

此外，Flutter 僅有極薄的一層 C/C++ 程式碼。Flutter 的大部分系統（合成、手勢、動畫、框架、元件等）都以 [Dart][]（一種現代、簡潔的物件導向語言）實作，開發者可以輕鬆閱讀、修改、替換或移除。這讓開發者對系統擁有極高的掌控力，也大幅降低了接觸大部分系統的門檻。

[Dart]: https://dart.dev/

### 我應該用 Flutter 開發下一個正式上線的應用程式嗎？

[Flutter 1][] 於 2018 年 12 月 4 日發佈，[Flutter 2][] 於 2021 年 3 月 3 日發佈，[Flutter 3][] 於 2023 年 5 月 10 日發佈。截至 2023 年 5 月，已有超過 _一百萬_ 款應用程式透過 Flutter 發佈，裝置數量達數億。你可以在[展示案例][showcase]中查看一些範例應用程式。

Flutter 大約每季都會釋出更新，提升穩定性與效能，並回應用戶常見功能需求。

[Flutter 1]: https://developers.googleblog.com/2018/12/flutter-10-googles-portable-ui-toolkit.html
[Flutter 2]: https://developers.googleblog.com/2021/03/announcing-flutter-2.html
[Flutter 3]: https://developers.googleblog.com/flutter/introducing-flutter-3-5eb69151622f

## Flutter 提供了什麼？

### Flutter SDK 內含哪些內容？

Flutter 包含：

* 針對行動裝置優化的高效能 2D 渲染引擎，並對文字有出色的支援
* 現代化的 react 風格框架
* 豐富的元件集，實作 Material Design 與 iOS 風格
* 單元與整合測試 API
* 與系統及第三方 SDK 連接的互通與插件 API
* 支援在 Windows、Linux 與 Mac 上執行測試的無頭 (headless) 測試執行器
* [Flutter DevTools][]（也稱為 Dart DevTools），用於測試、除錯與效能分析應用程式
* 用於建立、建置、測試與編譯應用程式的命令列工具

### Flutter 支援哪些編輯器或 IDE？

我們提供了 [VS Code][]、[Antigravity][]（AI 輔助 IDE）、[Android Studio][] 與 [IntelliJ IDEA][] 的插件。請參考[編輯器設定][editor configuration]以取得安裝細節，並參考 [VS Code][] 與 [Android Studio/IntelliJ][] 以了解插件使用技巧。

你也可以直接在終端機使用 `flutter` 指令，搭配支援[編輯 Dart][editing Dart]的各種編輯器。


[Android Studio]: https://developer.android.com/studio
[Android Studio/IntelliJ]: /tools/android-studio
[Antigravity]: /ai/antigravity
[editing Dart]: https://dart.dev/tools
[editor configuration]: /tools/editors
[IntelliJ IDEA]: https://www.jetbrains.com/idea/
[VS Code]: https://code.visualstudio.com/

### Flutter 有內建框架嗎？

有！Flutter 內建現代化的 react 風格框架。Flutter 的框架設計為分層、可自訂（且可選用）。開發者可以選擇只使用部分框架，甚至完全替換上層框架。

### Flutter 有內建元件 (Widget) 嗎？

有！Flutter 內建一組[高品質的 Material Design 與 Cupertino（iOS 風格）元件][widgets]、版面配置與主題。當然，這些元件只是起點。Flutter 的設計讓你能輕鬆建立自己的元件，或自訂現有元件。

[widgets]: /ui/widgets

### Flutter 支援 Material Design 嗎？

有！Flutter 團隊與 Material 團隊密切合作，完整支援 Material Design。詳情請參考[元件目錄][widget catalog]中的 Material 2 與 Material 3 元件。

[widget catalog]: /ui/widgets/material

### Flutter 有內建測試框架嗎？

有，Flutter 提供撰寫單元與整合測試的 API。請參考[使用 Flutter 進行測試][testing with Flutter]以了解更多。

我們使用自家測試功能來測試 Flutter SDK，並在每次提交時量測[測試覆蓋率][test coverage]。

[test coverage]: https://coveralls.io/github/flutter/flutter?branch=master
[testing with Flutter]: /testing/overview

### Flutter 有內建除錯工具嗎？

有，Flutter 內建 [Flutter DevTools][]（也稱為 Dart DevTools）。詳情請參考[使用 Flutter 除錯][Debugging with Flutter]與 [Flutter DevTools][] 文件。

[Debugging with Flutter]: /testing/debugging
[Flutter DevTools]: /tools/devtools

### Flutter 有內建相依性注入框架嗎？

我們沒有內建特定方案，但有多種套件可用於相依性注入與服務定位，例如 [injectable][]、[get_it][]、[kiwi][] 與 [riverpod][]。


[get_it]: https://pub.dev/packages/get_it
[injectable]: https://pub.dev/packages/injectable
[kiwi]: https://pub.dev/packages/kiwi
[riverpod]: https://pub.dev/packages/riverpod

## 技術

### Flutter 是用什麼技術打造的？

Flutter 以 C、C++、Dart、Skia（2D 渲染引擎）以及 [Impeller][]（iOS 上的預設渲染引擎）開發。請參考這份[架構圖][architecture diagram]以了解主要元件。若想深入了解 Flutter 的分層架構，請閱讀[架構總覽][architectural overview]。

[architectural overview]: /resources/architectural-overview
[architecture diagram]: https://docs.google.com/presentation/d/1cw7A4HbvM_Abv320rVgPVGiUP2msVs7tfGbkgdrTy0I/edit#slide=id.gbb3c3233b_0_162
[Impeller]: /perf/impeller

### Flutter 如何在 Android 上執行我的程式碼？ {:#run-android}

引擎的 C 與 C++ 程式碼會以 Android 的 NDK 編譯。Dart 程式碼（包含 SDK 與你的程式碼）會以 AOT（Ahead-of-Time，提前編譯）方式編譯為原生 ARM 與 x86-64 程式庫。這些程式庫會被包含在一個「runner」Android 專案中，整個專案會被建置成 `.apk`。啟動時，應用程式會載入 Flutter 程式庫，所有渲染、輸入、事件處理等，都會委派給已編譯的 Flutter 與應用程式程式碼處理。這與許多遊戲引擎的運作方式類似。

在除錯模式下，Flutter 會使用虛擬機器 (VM) 來執行程式碼，以支援 stateful hot reload（狀態保留熱重載），讓你能在不重新編譯的情況下修改執行中的程式碼。此模式下，應用程式右上角會顯示「debug」橫幅，提醒你目前的效能不代表最終發佈版本的效能。

### Flutter 如何在 iOS 上執行我的程式碼？ {:#run-ios}

引擎的 C 與 C++ 程式碼會以 LLVM 編譯。Dart 程式碼（包含 SDK 與你的程式碼）會以 AOT（Ahead-of-Time，提前編譯）方式編譯為原生 ARM 程式庫。該程式庫會被包含在一個「runner」iOS 專案中，整個專案會被建置成 `.ipa`。啟動時，應用程式會載入 Flutter 程式庫，所有渲染、輸入或事件處理等，都會委派給已編譯的 Flutter 與應用程式程式碼處理。這與許多遊戲引擎的運作方式類似。

在除錯模式下，Flutter 會使用虛擬機器 (VM) 來執行程式碼，以支援 stateful hot reload（狀態保留熱重載），讓你能在不重新編譯的情況下修改執行中的程式碼。此模式下，應用程式右上角會顯示「debug」橫幅，提醒你目前的效能不代表最終發佈版本的效能。

### Flutter 會使用作業系統內建的平台元件 (Widget) 嗎？

不會。Flutter 提供一套自有的元件集（包括 Material Design 與 Cupertino（iOS 風格）元件），由 Flutter 框架與引擎管理與渲染。你可以瀏覽 [Flutter 元件目錄][catalog of Flutter's widgets]。

我們相信這樣的方式能帶來更高品質的應用程式。如果重用平台內建元件，Flutter 應用程式的品質與效能將受限於那些元件的彈性與品質。

以 Android 為例，其內建了一組固定的手勢與判斷規則；而在 Flutter，你可以撰寫自訂的手勢辨識器，成為[手勢系統][gesture system]的一等成員。此外，兩個由不同開發者撰寫的元件甚至可以協調合作來消除手勢歧義。

現代應用程式的設計趨勢越來越重視動態豐富的 UI 與品牌優先的設計。為了實現這種高度自訂且精美的設計，Flutter 採用直接驅動像素的架構，而非依賴平台內建元件。

藉由使用相同的渲染引擎、框架與元件集，你可以更輕鬆地以同一份程式碼發佈多平台應用程式，無需進行繁瑣且高成本的規劃來對齊不同平台的功能集與 API 特性。

藉由對所有程式碼使用單一語言、單一框架與單一函式庫集（無論你的 UI 是否針對不同平台做差異化），我們也旨在幫助降低應用程式的開發與維護成本。

[catalog of Flutter's widgets]: /ui/widgets
[gesture system]: /ui/interactivity/gestures

### 當行動作業系統更新並推出新元件時會發生什麼？

Flutter 團隊會持續關注 iOS 與 Android 新元件的採用情形與需求，並與社群合作，為新元件建置支援。這可能以底層框架功能、新的可組合元件，或全新的元件實作方式呈現。

Flutter 的分層架構設計能支援多種元件庫，我們也鼓勵並支援社群建立與維護元件庫。

### 當行動作業系統更新並推出新平台功能時會發生什麼？

Flutter 的互通與插件系統設計，讓開發者能立即存取新的行動作業系統功能與能力。開發者無需等待 Flutter 團隊公開新的行動 OS 功能。

### Flutter 支援 code push 嗎？

Code push（直接將應用程式更新推送到用戶裝置的能力）並不是 Flutter 直接支援的功能。不過，我們知道有一個第三方方案，叫做 [Shorebird][]。請注意，這並非官方背書或推薦。

[Shorebird]: https://shorebird.dev/

### 可以用哪些作業系統開發 Flutter 應用程式？

Flutter 支援在 Linux、macOS、ChromeOS 與 Windows 上進行開發。

### Flutter 是用什麼語言寫的？

[Dart][]，一種快速成長、專為用戶端應用程式優化的現代語言。底層的圖形框架與 Dart 虛擬機器則以 C/C++ 實作。

### 為什麼 Flutter 選擇使用 Dart？

在初期開發階段，Flutter 團隊評估了許多語言與執行環境，最終選擇 Dart 作為框架與元件的語言。Flutter 從四個主要面向進行評估，並考量框架作者、開發者與最終用戶的需求。我們發現許多語言能滿足部分需求，但 Dart 在所有評估面向都有出色的表現，並符合我們所有的需求與標準。

Dart 的執行環境與編譯器支援 Flutter 所需的兩個關鍵特性的組合：基於 JIT 的快速開發週期，讓具有型別的語言能進行形狀變更與 stateful hot reload；以及 AOT（提前）編譯器，能輸出高效的 ARM 程式碼，以確保生產環境部署的快速啟動與可預測效能。

此外，我們有機會與 Dart 社群密切合作，他們正積極投入資源改善 Dart 在 Flutter 中的使用體驗。例如，當我們採用 Dart 時，該語言尚未擁有用於產生原生二進位檔的 AOT 工具鏈，而這對於實現可預測的高效能至關重要；但現在該語言已具備此能力，因為 Dart 團隊為 Flutter 建置了它。同樣地，Dart VM 過去針對吞吐量進行優化，但團隊現在正針對延遲進行優化，這對 Flutter 的工作負載更為重要。

Dart 在以下主要標準上獲得我們的高度評價：

_開發者生產力_
: Flutter 的主要價值主張之一是，讓開發者以同一份程式碼建置 iOS 與 Android 應用程式，從而節省工程資源。使用高生產力的語言能進一步加速開發者並使 Flutter 更具吸引力。這對我們的框架團隊和開發者都非常重要。Flutter 的大部分都以我們提供給用戶的同一種語言建置，因此我們需要在數十萬行程式碼中保持高效率，同時不犧牲框架與元件對開發者的可及性或可讀性。

_物件導向_
: 對於 Flutter，我們希望採用適合其問題領域的語言：建立視覺化的使用者體驗。業界已有數十年在物件導向語言中建置使用者介面框架的經驗。雖然我們可以使用非物件導向語言，但這意味著需要重新發明輪子來解決幾個棘手的問題。此外，絕大多數開發者都有物件導向開發的經驗，這使得學習如何使用 Flutter 開發更加容易。

_可預測的高效能_
: 有了 Flutter，我們希望讓開發者能夠創造快速、流暢的使用者體驗。為了實現這一目標，我們需要能夠在每個動畫幀期間執行大量終端開發者程式碼。這意味著我們需要一種能夠同時提供高效能與可預測效能的語言，不會有導致掉幀的週期性暫停。

_快速記憶體配置_
: Flutter 框架使用函數式風格的流程，這對底層記憶體配置器高效處理小型、短暫的配置有很高的依賴。這種風格是在具備此特性的語言中開發的，在缺乏此機制的語言中無法高效運作。

### Flutter 能執行任何 Dart 程式碼嗎？

Flutter 能執行不直接或間接匯入 `dart:mirrors` 或 `dart:html` 的 Dart 程式碼。

### Flutter 能將 Dart 編譯為 JavaScript 嗎？

Flutter 使用 [`js.dart`][] 套件將 Dart 編譯為 JavaScript。

[`js.dart`]: https://dart.dev/tools/dart-compile#js

### Flutter 引擎有多大？

在 2021 年 3 月，我們測量了一個[最小 Flutter 應用程式][minimal Flutter app]（不含 Material 元件，只有一個 `Center` 元件，以 `flutter build apk --split-per-abi` 建置）的下載大小，打包並壓縮為正式版 APK 後，ARM32 約為 4.3 MB，ARM64 約為 4.8 MB。

在 ARM32 上，核心引擎約為 3.4 MB（壓縮後），框架 + 應用程式程式碼約為 765 KB（壓縮後），LICENSE 檔案為 58 KB（壓縮後），必要的 Java 程式碼（`classes.dex`）為 120 KB（壓縮後）。

在 ARM64 上，核心引擎約為 4.0 MB（壓縮後），框架 + 應用程式程式碼約為 659 KB（壓縮後），LICENSE 檔案為 58 KB（壓縮後），必要的 Java 程式碼（`classes.dex`）為 120 KB（壓縮後）。

這些數字是使用 [apkanalyzer][] 測量的，該工具也已[整合至 Android Studio][built into Android Studio]。

在 iOS 上，根據 Apple App Store Connect 的回報，同一款應用程式的正式版 IPA 在 iPhone X 上的下載大小為 10.9 MB。IPA 比 APK 大，主要是因為 Apple 會對 IPA 中的二進位檔進行加密，使壓縮效率降低（請參考 Apple [QA1795][] 中的 [iOS App Store 特定注意事項][iOS App Store Specific Considerations]章節）。

當然，我們建議你測量自己的應用程式大小。請參考[測量應用程式大小][Measuring your app's size]。


[apkanalyzer]: https://developer.android.com/studio/command-line/apkanalyzer
[built into Android Studio]: https://developer.android.com/studio/build/apk-analyzer
[iOS App Store Specific Considerations]: https://developer.apple.com/library/archive/qa/qa1795/_index.html#//apple_ref/doc/uid/DTS40014195-CH1-APP_STORE_CONSIDERATIONS
[Measuring your app's size]: /perf/app-size
[minimal Flutter app]: https://github.com/flutter/flutter/tree/75228a59dacc24f617272f7759677e242bbf74ec/examples/hello_world
[QA1795]: https://developer.apple.com/library/archive/qa/qa1795/_index.html

### Flutter 如何定義像素？

Flutter 使用邏輯像素，且通常直接稱之為「像素」。Flutter 的 [`devicePixelRatio`][] 表示實體像素與邏輯 CSS 像素之間的比例。

[`devicePixelRatio`]: https://api.flutter.dev/flutter/dart-html/Window/devicePixelRatio.html

## 功能能力

### 我可以期待怎樣的應用程式效能？

一般而言，你可以期待出色的效能。Flutter 的設計旨在幫助開發者輕鬆達到穩定的 60fps。Flutter 應用程式使用原生編譯的程式碼執行，因此不涉及任何直譯器。這意味著 Flutter 應用程式啟動速度快。

Flutter 在使用原生程式碼時的效能取決於你的[應用程式架構][app's architecture]。為了獲得最佳效能，請熟悉 Flutter 的[平台通道 (platform channels)][platform channels]。這些通道提供了一個非同步訊息傳遞系統，用於與原生程式碼通訊。

若要深入了解 Flutter 的效能，請參考[效能 FAQ][Performance FAQ]。

[platform channels]: /platform-integration/platform-channels
[app's architecture]: /app-architecture
[Performance FAQ]: /perf/faq

### 我可以期待怎樣的開發週期？從編輯到重新整理需要多長時間？ {:#hot-reload}

Flutter 實作了 _熱重載 (hot reload)_ 開發週期。在裝置或模擬器上，你可以期待不到一秒的重載時間。

Flutter 的熱重載是 _stateful_（狀態保留）的，即應用程式狀態在重載後會被保留。這意味著你可以快速迭代深層巢狀頁面，而無需在每次重載後都從首頁重新開始。

### _熱重載 (hot reload)_ 與 _熱重啟 (hot restart)_ 有何不同？

熱重載的運作方式是將更新後的原始程式碼檔案注入執行中的 Dart 虛擬機器 (VM)。這不僅能新增類別，還能為現有類別新增方法與欄位，並修改現有函式。熱重啟則會將狀態重置為應用程式的初始狀態。

更多資訊，請參考[熱重載][Hot reload]。


[Hot reload]: /tools/hot-reload

### 我可以將 Flutter 應用程式部署到哪裡？

你可以將 Flutter 應用程式編譯並部署到 iOS、Android、[網頁][web]以及[桌面][desktop]。


[desktop]: /platform-integration/desktop
[web]: /platform-integration/web

### Flutter 在哪些裝置與作業系統版本上執行？

* 我們支援並測試 Flutter 在各種低階到高階平台上的執行。如需測試平台的詳細清單，請參考[支援的平台][supported platforms]清單。

* Flutter 支援為 `x86-64`、`armeabi-v7a` 與 `arm64-v8a` 建置 AOT（提前）編譯的程式庫。

* 為 ARMv7 或 ARM64 建置的應用程式，在許多 x86-64 Android 裝置上能正常執行（使用 ARM 模擬）。

* 我們支援在多種平台上開發 Flutter 應用程式。請參考各[開發作業系統][install]下列出的系統需求。


[install]: /install
[supported platforms]: /reference/supported-platforms

### Flutter 能在網頁上執行嗎？

可以，網頁支援已在穩定版 (stable) 頻道提供。詳情請參考[網頁相關說明][web instructions]。

[web instructions]: /platform-integration/web/building

### 我可以用 Flutter 建置桌面應用程式嗎？

可以，Windows、macOS 與 Linux 的桌面支援已在穩定版提供。

### 我可以在現有的原生應用程式中使用 Flutter 嗎？

可以，請參考我們網站上的[加入現有應用程式 (add-to-app)][add-to-app]章節以了解更多。

[add-to-app]: /add-to-app

### 我可以存取感測器和本機儲存等平台服務與 API 嗎？

可以。Flutter 讓開發者開箱即用地存取 _部分_ 作業系統特定的服務與 API。不過，我們希望避免大多數跨平台 API 常見的「最小公分母」問題，因此我們並不打算為所有原生服務與 API 建置跨平台 API。

許多平台服務與 API 已有[現成的套件][ready-made packages]可在 pub.dev 上取得。使用現有套件[非常簡單][is easy]。

最後，我們鼓勵開發者使用 Flutter 的非同步訊息傳遞系統，建立你自己與[平台及第三方 API][platform and third-party APIs]的整合。開發者可以依據需要公開多或少的平台 API，並建立最適合其專案的抽象層。


[is easy]: /packages-and-plugins/using-packages
[platform and third-party APIs]: /platform-integration/platform-channels
[ready-made packages]: https://pub.dev/flutter/

### 我可以擴充和自訂內建元件嗎？

當然可以。Flutter 的元件系統設計上就是為了方便自訂。

Flutter 採用組合 (composition) 的方式，而非為每個元件提供大量參數。元件由更小的元件組合而成，你可以以新穎的方式重複使用和組合這些元件來建立自訂元件。例如，`ElevatedButton` 不是繼承自通用按鈕元件，而是將 Material 元件與 `GestureDetector` 元件組合在一起。Material 元件提供視覺設計，而 `GestureDetector` 元件則提供互動設計。

如果要建立具有自訂視覺設計的按鈕，你可以將實作視覺設計的元件與提供互動設計的 `GestureDetector` 組合在一起。例如，`CupertinoButton` 就採用這種方式，將 `GestureDetector` 與多個實作其視覺設計的元件組合在一起。

組合讓你對元件的視覺與互動設計擁有最大的掌控力，同時也允許大量的程式碼重複使用。在框架中，我們將複雜的元件分解為分別實作視覺、互動和動態設計的各個部分。你可以任意混搭這些元件，建立具有完整表達能力的自訂元件。

### 為什麼我要在 iOS 和 Android 之間共享版面配置程式碼？

你可以選擇為 iOS 和 Android 實作不同的應用程式版面配置。開發者可以在執行時期檢測行動作業系統並渲染不同的版面配置，儘管我們發現這種做法並不常見。

越來越多的行動應用程式版面配置與設計趨向於更強調品牌一致性，並在平台間統一。這意味著在 iOS 與 Android 之間共享版面配置與 UI 程式碼有強烈的動機。

應用程式的品牌識別與審美設計的自訂性，如今變得比嚴格遵守傳統平台美學更為重要。例如，應用程式設計通常需要自訂字型、顏色、形狀、動態效果等，以清楚傳達其品牌識別。

我們也看到跨 iOS 與 Android 部署的常見版面配置模式。例如，「底部導覽列」模式如今已自然地出現在 iOS 與 Android 上。行動平台之間的設計理念似乎正趨於融合。

### 我可以與行動平台的預設程式設計語言互通嗎？

可以，Flutter 支援呼叫平台程式碼，包括在 Android 上整合 Java 或 Kotlin 程式碼，以及在 iOS 上整合 Swift 或 Objective-C 程式碼。這透過靈活的訊息傳遞風格實現，Flutter 應用程式可以使用 [`BasicMessageChannel`][] 向行動平台傳送和接收訊息。

請參考[平台通道][platform channels]以了解在 Flutter 中存取平台及第三方服務的更多資訊。

這裡有一個[範例專案][example project]，展示了如何使用平台通道在 iOS 和 Android 上存取電池狀態資訊。


[`BasicMessageChannel`]: https://api.flutter.dev/flutter/services/BasicMessageChannel-class.html
[example project]: https://github.com/flutter/flutter/tree/main/examples/platform_channel
[platform channels]: /platform-integration/platform-channels

### Flutter 有反射 (reflection) / mirrors 系統嗎？

沒有。Dart 包含提供型別反射的 `dart:mirrors`。但由於 Flutter 應用程式會預先編譯以用於生產環境，而且二進位檔大小對行動應用程式來說始終是一個考量，因此這個函式庫在 Flutter 應用程式中無法使用。

使用靜態分析，我們可以刪除任何未使用的程式碼（「tree shaking」）。如果你匯入了一個龐大的 Dart 函式庫，但只使用了其中一個獨立的兩行方法，那麼你只需承擔那兩行方法的成本，即使該 Dart 函式庫本身匯入了數十個其他函式庫也是如此。這個保證只有在 Dart 能在編譯時識別程式碼路徑的情況下才是可靠的。迄今為止，我們已針對特定需求找到了其他能提供更佳權衡的方法，例如程式碼生成。

### 是否支援國際化與在地化？

是的，Flutter 支援國際化 (i18n) 與在地化 (l10n)，讓你的應用程式能適應不同的語言與文化。你可以在[國際化文件][internationalization documentation]中了解更多。

[internationalization documentation]: /ui/internationalization

### 支援哪些無障礙功能？

Flutter 支援嚴格的無障礙需求 (a11y)。例如，螢幕閱讀器、大字體、色彩對比度以及硬體開關控制都受到支援。若要了解更多，請參考[無障礙功能文件][accessibility documentation]。

[accessibility documentation]: /ui/accessibility

### 如何為 Flutter 撰寫平行及/或並行的應用程式？

Flutter 支援 isolate。Isolate 是 Flutter 虛擬機器中獨立的記憶體堆積，它們能夠並行執行（通常以獨立執行緒的方式實作）。Isolate 透過傳送和接收非同步訊息來通訊。

請參考[在 Flutter 中使用 isolate 的範例][example of using isolates with Flutter]。

[example of using isolates with Flutter]: https://github.com/flutter/flutter/blob/main/examples/layers/services/isolate.dart

### 我可以在 Flutter 應用程式的背景執行 Dart 程式碼嗎？

可以，你可以在 iOS 和 Android 上的背景處理程序中執行 Dart 程式碼。更多資訊，請參考 Medium 上的免費文章[使用 Flutter 插件和地理圍欄在背景執行 Dart][backgnd]。

[backgnd]: https://blog.flutter.dev/executing-dart-in-the-background-with-flutter-plugins-and-geofencing-2b3e40a1a124

### 我可以在 Flutter 中使用 JSON/XML/<wbr>Protobufs（等）嗎？

當然可以。[pub.dev][] 上有用於 JSON、XML、protobufs 以及許多其他工具程式和格式的函式庫。

如需關於在 Flutter 中使用 JSON 的詳細說明，請參考 [JSON 教學][JSON tutorial]。

[JSON tutorial]: /data-and-backend/serialization/json
[pub.dev]: https://pub.dev

### 我可以用 Flutter 建置 3D（OpenGL）應用程式嗎？

目前我們不支援使用 OpenGL ES 或類似技術的 3D。我們有長期計畫公開優化的 3D API，但目前我們專注於 2D。

### 為什麼我的 APK 或 IPA 這麼大？

通常，APK 或 IPA 的大部分體積來自資產，包括圖片、音效檔案、字型等。Android 與 iOS 生態系統中的各種工具可以幫助你了解 APK 或 IPA 的內容。

此外，請確保使用 Flutter 工具建立 APK 或 IPA 的 _正式版建置 (release build)_。正式版建置通常比 _除錯版建置 (debug build)_ _小得多_。

若要了解更多，請參考[建立 Android 應用程式的正式版建置][release build of your Android app]以及[建立 iOS 應用程式的正式版建置][release build of your iOS app]。另請參考[測量應用程式大小][Measuring your app's size]。


[release build of your Android app]: /deployment/android
[release build of your iOS app]: /deployment/ios

### Flutter 應用程式能在 Chromebook 上執行嗎？

我們已見過 Flutter 應用程式在部分 Chromebook 上執行。我們正在追蹤[與在 Chromebook 上執行 Flutter 相關的問題][issues related to running Flutter on Chromebooks]。

[issues related to running Flutter on Chromebooks]: https://github.com/flutter/flutter/labels/platform-arc

### Flutter 是否與 ABI 相容？

Flutter 與 Dart 並不提供應用程式二進位介面 (ABI) 相容性。提供 ABI 相容性目前不是 Flutter 或 Dart 的目標。

### Flutter 如何處理捲動？

每個應用程式平台都使用自訂的捲動實作，使捲動行為符合該平台的原生外觀與感覺。若要深入了解 Flutter 的捲動，請參考[捲動][scrolling]文件。

[scrolling]: /ui/layout/scrolling

## 框架

### 為什麼 `build()` 方法在 `State` 上，而不是在 `StatefulWidget` 上？

將 `Widget build(BuildContext context)` 方法放在 `State` 上，而不是將 `Widget build(BuildContext context, State state)` 方法放在 `StatefulWidget` 上，能讓開發者在繼承 `StatefulWidget` 時擁有更多彈性。你可以在 [`State.build` 的 API 文件中閱讀更詳細的討論][detailed discussion on the API docs for `State.build`]。

[detailed discussion on the API docs for `State.build`]: https://api.flutter.dev/flutter/widgets/State/build.html

### Flutter 的標記語言在哪裡？為什麼 Flutter 沒有標記語法？

Flutter UI 是以命令式、物件導向的語言（Dart，與建置 Flutter 框架所用的相同語言）建置的。Flutter 不附帶宣告式標記語言。

我們發現以程式碼動態建置的 UI 能提供更大的彈性。例如，我們發現剛性的標記系統難以表達和產生具有特定行為的自訂元件。

我們也發現「程式碼優先」的方式更有利於實現熱重載和動態環境適應等功能。

當然，也可以建立自訂語言，然後動態將其轉換為元件。由於 build 方法「只是程式碼」，它們可以做任何事情，包括解析標記並將其轉換為元件。

### 我的應用程式右上角出現了 Debug 橫幅/彩帶。為什麼會這樣？

預設情況下，`flutter run` 指令使用除錯版建置設定。

除錯版設定在虛擬機器 (VM) 中執行你的 Dart 程式碼，以支援[熱重載][hot reload]（正式版建置則使用標準的 [Android][] 與 [iOS][] 工具鏈進行編譯）的快速開發週期。

除錯版設定也會檢查所有斷言，這有助於你在開發初期發現錯誤，但也會帶來執行期的成本。「Debug」橫幅表示這些檢查已啟用。你可以透過向 `flutter run` 傳遞 `--profile` 或 `--release` 旗標，在不進行這些檢查的情況下執行應用程式。

如果你的 IDE 使用 Flutter 插件，你可以在 profile 或 release 模式下啟動應用程式。在 VS Code 中，使用 **Run > Start debugging** 或 **Run > Run without debugging** 選單項目。在 IntelliJ 中，使用 **Run > Flutter Run in Profile Mode** 或 **Release Mode** 選單項目。


[Android]: #run-android
[hot reload]: #hot-reload
[iOS]: #run-ios

### Flutter 框架使用哪種程式設計範式？

Flutter 是一個多範式程式設計環境。Flutter 使用了過去幾十年來發展出的許多程式設計技術。我們在認為某種技術的優勢特別適合特定場景時就採用它。以下不按特定順序排列：

**組合 (Composition)**
: Flutter 使用的主要範式是使用具有窄行為範疇的小物件，組合在一起以獲得更複雜的效果，有時稱為 _激進組合 (aggressive composition)_。Flutter 元件庫中的大多數元件都以這種方式建置。例如，Material [`TextButton`][] 類別是使用 [`IconTheme`][]、[`InkWell`][]、[`Padding`][]、[`Center`][]、[`Material`][]、[`AnimatedDefaultTextStyle`][] 與 [`ConstrainedBox`][] 建置的。[`InkWell`][] 是使用 [`GestureDetector`][] 建置的。[`Material`][] 是使用 [`AnimatedDefaultTextStyle`][]、[`NotificationListener`][] 和 [`AnimatedPhysicalModel`][] 建置的。依此類推，一路往下都是元件。

**函數式程式設計 (Functional programming)**
: 整個應用程式可以只用 [`StatelessWidget`][] 建置，這些本質上是描述引數如何對應到其他函式的函式，最終到達計算版面配置或繪製圖形的基本元素。（此類應用程式不容易擁有狀態，因此通常不具互動性。）例如，[`Icon`][] 元件本質上是一個將其引數（[`color`][]、[`icon`][]、[`size`][]）映射到版面配置基本元素的函式。此外，大量使用了不可變資料結構，包括整個 [`Widget`][] 類別階層以及眾多輔助類別，例如 [`Rect`][] 和 [`TextStyle`][]。在較小的尺度上，Dart 的 [`Iterable`][] API 大量使用函數式風格（map、reduce、where 等），經常用於在框架中處理值列表。

**事件驅動程式設計 (Event-driven programming)**
: 使用者互動以事件物件的形式表示，這些物件會被分派到已向事件處理器註冊的回呼（callback）中。畫面更新由類似的回呼機制觸發。[`Listenable`][] 類別用作動畫系統的基礎，為具有多個監聽器的事件正式化了訂閱模型。

**基於類別的物件導向程式設計 (Class-based object-oriented programming)**
: 框架的大多數 API 都是使用具有繼承關係的類別建置的。我們採用的方式是在基底類別中定義非常高層級的 API，然後在子類別中迭代地進行專門化。例如，我們的渲染物件有一個對坐標系統不可知的基底類別（[`RenderObject`][]），然後我們有一個子類別（[`RenderBox`][]），引入了幾何應基於笛卡爾坐標系（x/寬度 和 y/高度）的概念。

**基於原型的物件導向程式設計 (Prototype-based object-oriented programming)**
: [`ScrollPhysics`][] 類別透過鏈接實例在執行時期動態組合應用於捲動的物理效果。這讓系統能夠組合，例如分頁物理效果與平台特定的物理效果，而無需在編譯時選擇平台。

**命令式程式設計 (Imperative programming)**
: 直接的命令式程式設計，通常與封裝在物件中的狀態配對，用於能提供最直覺解決方案的場景。例如，測試以命令式風格撰寫，首先描述被測試的情境，然後列出測試必須符合的不變量，再視需要推進時鐘或插入事件。

**響應式程式設計 (Reactive programming)**
: 元件樹和元素樹有時被描述為響應式的，因為在元件建構子中提供的新輸入會由元件的 build 方法立即作為變更傳播到下層元件，而下層元件中的變更（例如回應用戶輸入）則透過事件處理器傳播回樹的上層。框架中同時存在函數響應式和命令響應式兩種面向，取決於元件的需求。build 方法僅由一個描述元件如何對其設定變更做出反應的表達式組成的元件，是函數響應式元件（例如，Material [`Divider`][] 類別）。build 方法透過多個陳述式構建子元件列表，描述元件如何對其設定變更做出反應的元件，是命令響應式元件（例如，[`Chip`][] 類別）。

**宣告式程式設計 (Declarative programming)**
: 元件的 build 方法通常是單一表達式，包含多層巢狀建構子，使用 Dart 的嚴格宣告式子集撰寫。此類巢狀表達式可以機械地與任何表達能力足夠的標記語言互相轉換。例如，[`UserAccountsDrawerHeader`][] 元件有一個較長的 build 方法（20 行以上），由單一巢狀表達式組成。這也可以與命令式風格結合，建置在純宣告式方式中更難描述的 UI。

**泛型程式設計 (Generic programming)**
: 型別可用於幫助開發者及早發現程式設計錯誤。Flutter 框架使用泛型程式設計來協助實現這一目標。例如，[`State`][] 類別以其關聯元件的型別參數化，使 Dart 分析器能夠捕捉狀態與元件不匹配的情況。同樣地，[`GlobalKey`][] 類別接受型別參數，以便能以型別安全的方式（使用執行期檢查）存取遠端元件的狀態；[`Route`][] 介面以其[彈出][popped]時預期使用的型別參數化；[`List`][]、[`Map`][] 和 [`Set`][] 等集合都已參數化，使不符的元素能在分析期間或除錯時的執行期及早被發現。

**並行程式設計 (Concurrent programming)**
: Flutter 大量使用 [`Future`][] 與其他非同步 API。例如，動畫系統透過完成 future 來報告動畫結束。圖片載入系統同樣使用 future 來報告載入完成。

**約束程式設計 (Constraint programming)**
: Flutter 中的版面配置系統使用一種弱形式的約束程式設計來確定場景的幾何形狀。約束（例如，對於笛卡爾盒子，最小和最大寬度以及最小和最大高度）從父元件傳遞到子元件，子元件選擇符合那些約束的最終幾何形狀（例如，對於笛卡爾盒子，一個大小，具體為寬度和高度）。透過使用這種技術，Flutter 通常只需單次遍歷即可完成整個場景的版面配置。


[`AnimatedDefaultTextStyle`]: https://api.flutter.dev/flutter/widgets/AnimatedDefaultTextStyle-class.html
[`AnimatedPhysicalModel`]: https://api.flutter.dev/flutter/widgets/AnimatedPhysicalModel-class.html
[`Center`]: https://api.flutter.dev/flutter/widgets/Center-class.html
[`Chip`]: https://api.flutter.dev/flutter/material/Chip-class.html
[`color`]: https://api.flutter.dev/flutter/widgets/Icon/color.html
[`ConstrainedBox`]: https://api.flutter.dev/flutter/widgets/ConstrainedBox-class.html
[`Divider`]: https://api.flutter.dev/flutter/material/Divider-class.html
[`Future`]: https://api.flutter.dev/flutter/dart-async/Future-class.html
[`GestureDetector`]: https://api.flutter.dev/flutter/widgets/GestureDetector-class.html
[`GlobalKey`]: https://api.flutter.dev/flutter/widgets/GlobalKey-class.html
[`icon`]: https://api.flutter.dev/flutter/widgets/Icon/icon.html
[`Icon`]: https://api.flutter.dev/flutter/widgets/Icon-class.html
[`IconTheme`]: https://api.flutter.dev/flutter/widgets/IconTheme-class.html
[`InkWell`]: https://api.flutter.dev/flutter/material/InkWell-class.html
[`Iterable`]: https://api.flutter.dev/flutter/dart-core/Iterable-class.html
[`List`]: https://api.flutter.dev/flutter/dart-core/List-class.html
[`Listenable`]: https://api.flutter.dev/flutter/foundation/Listenable-class.html
[`Map`]: https://api.flutter.dev/flutter/dart-core/Map-class.html
[`Material`]: https://api.flutter.dev/flutter/material/Material-class.html
[`NotificationListener`]: https://api.flutter.dev/flutter/widgets/NotificationListener-class.html
[`Padding`]: https://api.flutter.dev/flutter/widgets/Padding-class.html
[popped]: https://api.flutter.dev/flutter/widgets/Navigator/pop.html
[`Rect`]: https://api.flutter.dev/flutter/dart-ui/Rect-class.html
[`RenderBox`]: https://api.flutter.dev/flutter/rendering/RenderBox-class.html
[`RenderObject`]: https://api.flutter.dev/flutter/rendering/RenderObject-class.html
[`Route`]: https://api.flutter.dev/flutter/widgets/Route-class.html
[`ScrollPhysics`]: https://api.flutter.dev/flutter/widgets/ScrollPhysics-class.html
[`Set`]: https://api.flutter.dev/flutter/dart-core/Set-class.html
[`size`]: https://api.flutter.dev/flutter/widgets/Icon/size.html
[`State`]: https://api.flutter.dev/flutter/widgets/State-class.html
[`StatelessWidget`]: https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html
[`TextButton`]: https://api.flutter.dev/flutter/material/TextButton-class.html
[`TextStyle`]: https://api.flutter.dev/flutter/painting/TextStyle-class.html
[`UserAccountsDrawerHeader`]: https://api.flutter.dev/flutter/material/UserAccountsDrawerHeader-class.html
[`Widget`]: https://api.flutter.dev/flutter/widgets/Widget-class.html

## 專案

### 我可以在哪裡獲得支援？

如果你認為遇到了錯誤，請在我們的[問題追蹤器][issue tracker]中提報。你也可以在 [Stack Overflow][] 上尋求「如何操作」類型的問題解答。如需討論，請加入我們在 [flutter-dev@googlegroups.com][] 的郵件清單，或在 [Discord][] 上找到我們。

更多資訊，請參考我們的[社群][Community]頁面。


[Community]: https://flutter.dev/community
[Discord]: https://discord.com/invite/rflutterdev
[issue tracker]: https://github.com/flutter/flutter/issues
[flutter-dev@googlegroups.com]: mailto:flutter-dev@googlegroups.com
[Stack Overflow]: https://stackoverflow.com/tags/flutter

### 我要如何參與貢獻？

Flutter 是開源的，我們鼓勵你做出貢獻。你可以從在我們的[問題追蹤器][issue tracker]中提交功能請求和錯誤報告開始。

我們建議你加入我們在 [flutter-dev@googlegroups.com][] 的郵件清單，讓我們知道你如何使用 Flutter 以及你希望用它做什麼。

如果你有興趣貢獻程式碼，可以從閱讀我們的[貢獻指南][Contributing guide]開始，並查看我們的[容易上手的議題][easy starter issues]清單。

最後，你可以與熱心的 Flutter 社群建立連結。更多資訊，請參考[社群][Community]頁面。

你也可以在 Flutter [Discord][] 上與其他開發者交流。

[Contributing guide]: https://github.com/flutter/flutter/blob/main/CONTRIBUTING.md
[easy starter issues]: https://github.com/flutter/flutter/issues?q=is%3Aopen+is%3Aissue+label%3A%22easy+fix%22

### Flutter 是開源的嗎？

是的，Flutter 是開源技術。你可以在 [GitHub][] 上找到這個專案。

[GitHub]: https://github.com/flutter/flutter

### Flutter 及其相依套件適用哪些軟體授權？

Flutter 包含兩個元件：一個以動態連結二進位檔形式發佈的引擎，以及引擎載入的 Dart 框架（作為獨立的二進位檔）。引擎使用多個軟體元件，具有許多相依套件；請在其[授權檔案][license file]中查看完整清單。

框架是完全獨立的，只需要[一個授權][only one license]。

此外，你使用的任何 Dart 套件可能有其自己的授權需求。

[license file]: https://github.com/flutter/flutter/blob/main/engine/src/flutter/sky/packages/sky_engine/LICENSE
[only one license]: https://github.com/flutter/flutter/blob/main/LICENSE

### 我如何確認我的 Flutter 應用程式需要顯示哪些授權？

有一個 API 可以找到你需要顯示的授權清單：

* 如果你的應用程式有 [`Drawer`][]，請新增 [`AboutListTile`][]。

* 如果你的應用程式沒有 Drawer 但使用了 Material Components 函式庫，請呼叫 [`showAboutDialog`][] 或 [`showLicensePage`][]。

* 如需更自訂的方式，你可以從 [`LicenseRegistry`][] 取得原始授權資訊。


[`AboutListTile`]: https://api.flutter.dev/flutter/material/AboutListTile-class.html
[`Drawer`]: https://api.flutter.dev/flutter/material/Drawer-class.html
[`LicenseRegistry`]: https://api.flutter.dev/flutter/foundation/LicenseRegistry-class.html
[`showAboutDialog`]: https://api.flutter.dev/flutter/material/showAboutDialog.html
[`showLicensePage`]: https://api.flutter.dev/flutter/material/showLicensePage.html

### 誰在開發 Flutter？

我們大家！Flutter 是一個開源專案。目前，大部分的開發工作由 Google 的工程師完成。如果你對 Flutter 感到興奮，我們鼓勵你加入社群並[為 Flutter 做出貢獻][contribute to Flutter]！

[contribute to Flutter]: https://github.com/flutter/flutter/blob/master/CONTRIBUTING.md

### Flutter 的指導原則是什麼？

我們相信以下幾點：

* 為了觸及每一位潛在用戶，開發者需要以多個行動平台為目標。
* 現今的 HTML 與 WebView，由於自動行為（捲動、版面配置）和對舊版的支援，使得持續達到高幀率並提供高保真體驗變得困難。
* 如今，多次建置相同的應用程式成本太高：需要不同的團隊、不同的程式碼庫、不同的工作流程、不同的工具等。
* 開發者希望有一種更簡單、更好的方式，使用單一程式碼庫為多個目標平台建置行動應用程式，而且不想犧牲品質、掌控力或效能。

我們專注於三件事：

_掌控力 (Control)_
: 開發者應該能夠存取並掌控系統的所有層次。這帶來了：

_效能 (Performance)_
: 用戶應得到完全流暢、響應迅速、無卡頓的應用程式。這帶來了：

_保真度 (Fidelity)_:
: 每個人都應得到精確、美觀、令人愉悅的應用程式體驗。

### Apple 會拒絕我的 Flutter 應用程式嗎？

我們無法代表 Apple 發言，但他們的 App Store 中有許多使用 Flutter 等框架技術建置的應用程式。事實上，Flutter 使用與 Unity（許多 Apple Store 最熱門遊戲所採用的引擎）相同的基本架構模型。

Apple 曾多次精選以 Flutter 建置的精美設計應用程式，包括 [Hamilton][Hamilton for iOS] 和 [Reflectly][]。

與任何提交至 Apple Store 的應用程式一樣，以 Flutter 建置的應用程式應遵循 Apple 的 App Store 提交[準則][guidelines]。


[guidelines]: https://developer.apple.com/app-store/review/guidelines/
[Hamilton for iOS]: https://itunes.apple.com/us/app/hamilton-the-official-app/id1255231054?mt=8
[Reflectly]: https://apps.apple.com/us/app/reflectly-journal-ai-diary/id1241229134

