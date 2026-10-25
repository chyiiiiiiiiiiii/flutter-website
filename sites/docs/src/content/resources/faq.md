---
title: 常見問題 (FAQ)
description: 關於 Flutter 的常見問題與解答。
showBreadcrumbs: false
---

## 介紹

本頁整理了關於 Flutter 的常見問題。你也可以參考以下專門主題的 FAQ：

* [Web FAQ][]
* [效能 FAQ][Performance FAQ]

[Performance FAQ]: /perf/faq
[Web FAQ]: /platform-integration/web/faq

### 什麼是 Flutter？

Flutter 是 Google 的開源框架，用於以單一程式碼庫打造精美、原生編譯的行動裝置 (iOS、Android)、網頁、桌面 (macOS、Windows、Linux) 與嵌入式裝置應用程式。Flutter 能與現有程式碼協作，受到全球開發者與組織的採用，且完全免費並開源。

### Flutter 適合哪些人？

對開發者而言，Flutter 能加快應用程式開發速度，並降低跨平台建置的成本與複雜度。

對設計師而言，Flutter 為高端使用者體驗提供了靈活的設計畫布。它能將概念轉化為生產程式碼，而不受傳統跨平台框架所帶來的妥協限制。

對工程經理與企業而言，Flutter 讓應用程式開發者得以整合為單一團隊，以單一程式碼庫打造多平台的品牌應用程式。Flutter 能加快功能開發速度，並同步整個客戶群的發佈時程。

### 使用 Flutter 需要多少開發經驗？

只要熟悉物件導向，以及命令式或宣告式程式設計概念，就能輕鬆上手 Flutter。如果你有 Java、Kotlin、Swift、TypeScript 或 C# 等語言的經驗，就能更快學會 Dart 與 Flutter。

### 我可以用 Flutter 開發哪些類型的應用程式？

Flutter 支援開發 Android 與 iOS 的行動應用程式、網頁應用程式、macOS、Windows 與 Linux 的桌面應用程式，以及嵌入式裝置介面。

需要自訂、品牌化設計的應用程式特別適合用 Flutter 開發。你也可以打造符合 Android 的 Material Design 與 iOS 的 Cupertino 設計語言的像素完美體驗。

Flutter 在 pub.dev 上的[套件生態系][package ecosystem]支援各種硬體（如相機、GPS、藍牙、網路與本機儲存）與雲端服務（如驗證、通知、支付與儲存）。

[package ecosystem]: {{site.pub}}/flutter

### Flutter 是誰開發的？

Flutter 是一個由 Google 管理的開源專案，由全球開發者、公司和個人組成的社群共同貢獻。

### 誰在使用 Flutter？

全球的開發者與組織都在使用 Flutter 來打造原生編譯的應用程式。想了解使用 Flutter 建置的應用程式，請瀏覽[展示案例][showcase]。

[showcase]: {{site.main-url}}/showcase

### Flutter 有哪些獨特之處？

Flutter 與大多數其他跨平台方案不同，它不依賴網頁瀏覽器的檢視，也不使用系統提供的平台元件 (Widget)。Flutter 使用自有的高效能渲染引擎 ([Impeller][]) 來渲染 UI。

此外，Flutter 的大部分框架（包括合成、手勢、動畫與元件）都以 [Dart][] 實作。這種架構讓你對 UI 擁有深度的掌控力、高度的可預測性，並能在任何層級檢視或修改框架。

[Dart]: {{site.dart-site}}/
[Impeller]: /perf/impeller

### 我應該用 Flutter 開發下一個正式上線的應用程式嗎？

應該。從早期新創公司到大型企業，成千上萬的組織都已將 Flutter 應用程式部署到正式環境，服務數億使用者。你可以在[展示案例][showcase]中查看實際範例。

Flutter 會定期釋出更新，將效能改進、新功能與平台更新帶入穩定版 (stable) 頻道。

## Flutter 提供了什麼？

### Flutter SDK 內含哪些內容？

Flutter SDK 包含：

* 高效能 2D 渲染引擎 ([Impeller][])
* 以 Dart 撰寫的現代化響應式框架
* 豐富的元件集，實作 Material Design 3 與 Cupertino（iOS 風格）
* 單元、元件與整合測試 API
* 與系統功能及原生 SDK 連接的互通與插件 API
* 支援在 Windows、Linux 與 macOS 上執行測試的無頭 (headless) 測試執行器
* [Flutter DevTools][]，用於效能分析、除錯與檢查你的應用程式
* 用於建立、建置、測試與編譯應用程式的命令列工具

[Flutter DevTools]: /tools/devtools

### Flutter 支援哪些編輯器或 IDE？

Flutter 提供了 [VS Code][]、[Antigravity][]（AI 輔助 IDE）、[Android Studio][] 與 [IntelliJ IDEA][] 的插件與擴充功能。請參考[編輯器設定][editor configuration]以取得安裝細節，並參考 [VS Code][] 與 [Android Studio/IntelliJ][] 以了解使用說明。

你也可以直接在終端機執行 `flutter` 指令，搭配任何支援[編輯 Dart][editing Dart]的編輯器。

[Android Studio]: {{site.android-dev}}/studio
[Android Studio/IntelliJ]: /tools/android-studio
[Antigravity]: /ai/get-started
[editing Dart]: {{site.dart-site}}/tools
[editor configuration]: /tools/editors
[IntelliJ IDEA]: https://www.jetbrains.com/idea/
[VS Code]: https://code.visualstudio.com/

### Flutter 有內建框架嗎？

有。Flutter 內建現代化的響應式框架。此框架採分層且可自訂的設計，讓你可以使用高階元件，或直接與渲染管線的較底層互動。

### Flutter 有內建元件 (Widget) 嗎？

有。Flutter 內建一系列高品質的 [Material Design 與 Cupertino（iOS 風格）元件][widgets]、版面配置與主題。你可以直接使用這些元件、自訂它們，或建立自訂元件。

[widgets]: /ui/widgets

### Flutter 支援 Material Design 嗎？

有。Flutter 完整支援 Google 的設計系統 [Material Design 3][widget catalog]。

[widget catalog]: /ui/widgets/material

### Flutter 有內建測試框架嗎？

有。Flutter 內建支援單元、元件與整合測試。若要了解更多，請參考[測試總覽][Testing overview]。

[Testing overview]: /testing/overview

### Flutter 有內建除錯工具嗎？

有。Flutter 內建 [Flutter DevTools][]。詳情請參考[除錯 Flutter 應用程式][Debugging Flutter apps]與 [Flutter DevTools][] 文件。

[Debugging Flutter apps]: /testing/debugging

### Flutter 有內建相依性注入框架嗎？

Flutter 並不要求使用特定主張的相依性注入框架。Flutter 生態系提供了多種用於相依性注入與服務定位的套件，例如 [Riverpod][]、[get_it][]、[Provider][] 與 [injectable][]。

[get_it]: {{site.pub}}/packages/get_it
[injectable]: {{site.pub}}/packages/injectable
[Provider]: {{site.pub}}/packages/provider
[Riverpod]: {{site.pub}}/packages/riverpod

## 技術

### Flutter 是用什麼技術打造的？

Flutter 以 C、C++ 與 Dart 開發。它使用 [Impeller][] 作為預設渲染引擎，並善用現代圖形 API，例如 iOS 與 macOS 上的 Metal，以及 Android 上的 Vulkan。若想深入了解 Flutter 的分層架構，請閱讀[架構總覽][architectural overview]。

[architectural overview]: /resources/architectural-overview

### Flutter 如何在 Android 上執行我的程式碼？ {:#run-android}

引擎的 C 與 C++ 程式碼會使用 Android 的 NDK 編譯。Dart 程式碼（包含框架與你的應用程式程式碼）會以 AOT（Ahead-of-Time，提前編譯）方式編譯為原生機器碼。這些程式庫會被打包進一個 runner Android 專案，並建置成 APK 或 Android App Bundle (AAB)。啟動時，應用程式會載入 Flutter 引擎，由引擎執行已編譯的程式碼並渲染 UI。

在除錯模式下，Flutter 會在 Dart VM 中執行，以支援 stateful [hot reload][]（狀態保留熱重載），讓你能在不重新編譯的情況下修改執行中的程式碼。應用程式右上角會顯示「debug」橫幅，表示應用程式正以除錯模式執行。

### Flutter 如何在 iOS 上執行我的程式碼？ {:#run-ios}

引擎的 C 與 C++ 程式碼會以 LLVM 編譯。Dart 程式碼（包含框架與你的應用程式程式碼）會以 AOT（Ahead-of-Time，提前編譯）方式編譯為原生 ARM 機器碼。已編譯的程式碼會被打包進一個 runner iOS 專案，並建置成 `.ipa` 套件。啟動時，應用程式會載入 Flutter 引擎，由引擎執行已編譯的程式碼，並使用 Impeller 渲染 UI。

在除錯模式下，Flutter 會在 Dart VM 中執行，以支援 stateful [hot reload][]。應用程式右上角會顯示「debug」橫幅，表示應用程式正以除錯模式執行。

### Flutter 會使用作業系統內建的平台元件 (Widget) 嗎？

不會。Flutter 使用自有引擎直接渲染元件，並提供 Material Design 與 Cupertino（iOS 風格）元件的實作。你可以在[元件目錄][catalog of Flutter's widgets]中瀏覽可用的元件。

透過直接渲染像素，Flutter 避免了平台元件抽象層所帶來的效能限制與行為差異。這種方式能在各平台上提供一致的效能與外觀。

如果你需要平台原生元件（例如 Google Maps 或 web view），Flutter 支援將[平台檢視 (platform views)][platform views] 直接嵌入元件樹中。

[catalog of Flutter's widgets]: /ui/widgets
[platform views]: /platform-integration/platform-views

### 當行動作業系統更新並推出新元件時會發生什麼？

Flutter 團隊與社群會持續追蹤 Apple 與 Google 的新設計準則與平台元件，並據此更新 Flutter 的元件庫。由於 Flutter 元件以 Dart 撰寫，你也可以立即建置或調整元件，無需等待作業系統或 SDK 更新。

### 當行動作業系統更新並推出新平台功能時會發生什麼？

Flutter 的插件架構、[平台通道 (platform channels)][platform channels]，以及原生互通工具（例如 Dart FFI、`ffigen` 與 `jnigen`），讓你能立即存取新的作業系統 API。你無需等待 Flutter SDK 釋出新版本，就能整合新的平台功能。

[platform channels]: /platform-integration/platform-channels

### Flutter 支援 code push 嗎？

Flutter 並未內建 code push 功能。第三方方案（例如 [Shorebird][]）可為 Flutter 應用程式提供 code push 支援。

[Shorebird]: https://shorebird.dev/

### 可以用哪些作業系統開發 Flutter 應用程式？

Flutter 支援在 macOS、Windows、Linux 與 ChromeOS 上進行開發。關於系統需求的詳細資訊，請參考[安裝指南][install]。

[install]: /install

### Flutter 是用什麼語言寫的？

Flutter 框架以 [Dart][] 撰寫。底層的引擎與圖形管線則以 C 與 C++ 實作。

### 為什麼 Flutter 選擇使用 Dart？

在初期開發階段，Flutter 團隊評估了多種語言與執行環境，最終選擇 Dart 作為框架與元件的語言。Dart 在幾項關鍵評估標準中得分最高：

_開發者生產力_
: Dart 同時支援 JIT（Just-in-Time）編譯，以便透過 stateful hot reload 快速開發，以及 AOT（Ahead-of-Time）編譯，以便在正式環境產生高效的原生機器碼。由於框架本身以 Dart 撰寫，開發者可以檢視、除錯並修改整個技術堆疊。

_物件導向與 UI 組合_
: Dart 的物件導向結構符合建置可組合使用者介面的需求，且無需另外使用標記語言。

_可預測的高效能_
: Dart 直接編譯為原生機器碼，無需直譯器或橋接層，能提供一致的幀率，不會出現無法預測的執行期暫停。

_快速記憶體配置_
: Flutter 的響應式框架會建立大量短暫存活的物件。Dart 的分代垃圾回收器針對快速配置與清理這類暫時性物件進行了優化。

### Flutter 能執行任何 Dart 程式碼嗎？

Flutter 能執行任何不依賴目標平台上無法使用的函式庫的 Dart 程式碼。例如，行動與桌面應用程式無法匯入網頁專用的函式庫，而網頁應用程式則無法使用 `dart:io`。

### Flutter 如何為網頁編譯？

Flutter 會將網頁版的 Dart 同時編譯為 JavaScript 與 WebAssembly (Wasm)。WebAssembly 編譯 (WasmGC) 能提供媲美原生桌面與行動應用程式的高效能渲染。詳情請參考 [Flutter 網頁文件][web]。

[web]: /platform-integration/web

### Flutter 引擎有多大？ {:#how-big-is-the-flutter-engine}

一個最小的正式版 Flutter 應用程式包含 Flutter 引擎、框架與你的應用程式程式碼。引擎會增加少量的基本體積（壓縮後數 MB），實際大小會因目標平台與架構而異。

應用程式大小主要取決於所打包的資產、字型與第三方套件。若要分析並縮小應用程式的大小，請參考[測量應用程式大小][Measuring your app's size]。

[Measuring your app's size]: /perf/app-size

### Flutter 如何定義像素？

Flutter 使用邏輯像素，在標準密度的顯示器上大致對應實體像素。Flutter 會根據檢視的 [`devicePixelRatio`][]，自動將邏輯像素對應到實體裝置像素。

[`devicePixelRatio`]: {{site.api}}/flutter/dart-ui/FlutterView/devicePixelRatio.html

## 功能能力

### 我可以期待怎樣的應用程式效能？

Flutter 的設計旨在提供流暢的 60fps 與 120fps 動畫。Flutter 應用程式直接編譯為原生機器碼或 WebAssembly，消除了直譯器的額外負擔。若要深入了解效能最佳化，請參考[效能 FAQ][Performance FAQ]。

### 我可以期待怎樣的開發週期？從編輯到重新整理需要多長時間？ {:#hot-reload}

Flutter 實作了 stateful _熱重載 (hot reload)_ 開發週期。在實體裝置、模擬器 (emulator) 與模擬器 (simulator) 上，你都可以期待不到一秒的重載時間。

熱重載會保留你的應用程式狀態，讓你能快速迭代，而無需在每次修改程式碼後都重新導覽回目前的畫面。

### 熱重載 (hot reload) 與熱重啟 (hot restart) 有何不同？

熱重載會將更新後的原始程式碼檔案注入執行中的 Dart VM，而不清除應用程式狀態。熱重啟則會重置應用程式狀態並重新執行 `main()`，所需時間比熱重載稍長，但仍比完整重新編譯快。

更多資訊，請參考[熱重載][Hot reload]。

[Hot reload]: /tools/hot-reload

### 我可以將 Flutter 應用程式部署到哪裡？

你可以將 Flutter 應用程式編譯並部署到 iOS、Android、[網頁][web]、[桌面][desktop] (macOS、Windows、Linux) 以及嵌入式裝置。

[desktop]: /platform-integration/desktop

### Flutter 在哪些裝置與作業系統版本上執行？ {:#what-devices-and-os-versions-does-flutter-run-on}

Flutter 支援廣泛的作業系統與硬體平台：

* 行動裝置：Android (ARM32、ARM64、x86_64) 與 iOS (ARM64)。
* 桌面：macOS (x86_64、ARM64)、Windows (x86_64、ARM64) 與 Linux (x86_64、ARM64)。
* 網頁：支援 WebAssembly 或 JavaScript 的現代瀏覽器。

如需完整的支援作業系統版本清單，請參考[支援的平台][Supported platforms]。

[Supported platforms]: /reference/supported-platforms

### Flutter 能在網頁上執行嗎？

可以。Flutter 的網頁支援已在穩定版頻道提供，並支援編譯為 WebAssembly (Wasm) 與 JavaScript。詳情請參考 [Flutter 的網頁支援][web]。

### 我可以用 Flutter 建置桌面應用程式嗎？

可以。macOS、Windows 與 Linux 的桌面支援已在穩定版頻道提供。詳情請參考 [Flutter 的桌面支援][desktop]。

### 我可以在現有的原生應用程式中使用 Flutter 嗎？

可以。你可以使用[加入現有應用程式 (Add-to-App)][add-to-app]，將 Flutter 整合到現有的 Android 與 iOS 應用程式中。

[add-to-app]: /add-to-app

### 我可以存取感測器和本機儲存等平台服務與 API 嗎？

可以。Flutter 透過 [pub.dev][ready-made packages] 上提供的插件，讓你存取平台特定的 API 與硬體。你也可以使用[平台通道][platform channels]或原生互通 (Dart FFI) 建立自訂整合。

[ready-made packages]: {{site.pub}}/flutter/

### 我可以擴充和自訂內建元件嗎？

可以。Flutter 的元件系統是以組合 (composition) 為核心建構的。你不需要繼承複雜的元件，而是組合較小、單一用途的元件來建立自訂設計。這種架構讓你能掌控版面配置、繪製與手勢處理。

### 為什麼我要在 iOS 和 Android 之間共享版面配置程式碼？

共享版面配置與 UI 程式碼能減少工程投入、讓功能發佈保持同步，並確保跨平台的一致品牌體驗。當你需要平台特定的行為或樣式時，可以使用平台檢查或響應式版面配置來調整 UI。

### 我可以與行動平台的預設程式設計語言互通嗎？

可以。Flutter 在所有支援的平台上都支援呼叫原生程式碼：

* 在 Android 上：透過[平台通道][platform channels]與 [JNI 互通][JNI interop] (`jnigen`) 使用 Kotlin 與 Java。
* 在 iOS 與 macOS 上：透過[平台通道][platform channels]與 [Objective-C/Swift 互通][Objective-C/Swift interop] (`ffigen`) 使用 Swift 與 Objective-C。
* 在桌面與行動裝置上：透過 Dart FFI ([`dart:ffi`][]) 使用 C 與 C++。

[JNI interop]: {{site.dart-site}}/interop/java-interop
[Objective-C/Swift interop]: {{site.dart-site}}/interop/objective-c-interop
[`dart:ffi`]: {{site.dart-site}}/interop/c-interop

### Flutter 有反射 (reflection) / mirrors 系統嗎？

沒有。Dart 在 Flutter 中停用了 `dart:mirrors`，以支援積極的 AOT（提前）編譯與無用程式碼消除 (tree shaking)。這能讓二進位檔保持小巧，並加快啟動速度。對於中繼資料檢查與序列化，Flutter 應用程式使用編譯時的程式碼生成。

### 是否支援國際化與在地化？

是的。Flutter 內建支援國際化 (i18n) 與在地化 (l10n)，包括複數處理、雙向文字與日期格式化。若要了解更多，請參考[將 Flutter 應用程式國際化][internationalization documentation]。

[internationalization documentation]: /ui/internationalization

### 支援哪些無障礙功能？

Flutter 支援標準的無障礙功能 (a11y)，包括螢幕閱讀器 (TalkBack、VoiceOver)、大字體縮放、高對比主題以及硬體開關存取。詳情請參考[無障礙功能][accessibility documentation]。

[accessibility documentation]: /ui/accessibility

### 如何為 Flutter 撰寫平行及/或並行的應用程式？

Dart 使用事件迴圈 (event loop) 處理非同步操作（`Future` 與 `Stream`）。對於需要大量 CPU 運算的任務，Flutter 支援 isolate，也就是具有獨立記憶體堆積、透過訊息傳遞通訊的隔離執行緒。你可以使用 [`Isolate.run()`][] 或 [`compute()`][] 函式，在背景執行繁重的運算。

[`Isolate.run()`]: {{site.api}}/flutter/dart-isolate/Isolate/run.html
[`compute()`]: {{site.api}}/flutter/foundation/compute.html

### 我可以在 Flutter 應用程式的背景執行 Dart 程式碼嗎？

可以。你可以透過背景執行套件與平台服務整合，在 Android 與 iOS 的背景處理程序中執行 Dart 程式碼。

### 我可以在 Flutter 中使用 JSON、XML 或 Protocol Buffers 嗎？

可以。Dart 生態系在 [pub.dev][] 上提供了用於 JSON 序列化、XML 解析、Protocol Buffers 以及其他資料格式的套件。如需關於處理 JSON 的詳細說明，請參考 [JSON 與序列化][JSON tutorial]。

[JSON tutorial]: /data-and-backend/serialization/json
[pub.dev]: {{site.pub}}

### 我可以用 Flutter 建置 3D 應用程式嗎？

可以。Flutter 透過 Flutter GPU 以及 `flutter_scene` 等套件支援 3D 圖形，這些方案使用 Impeller 渲染後端來繪製 3D 場景。你也可以使用平台檢視嵌入第三方 3D 檢視（例如 Unity 或原生 3D 引擎）。

### 為什麼我的 APK 或 IPA 這麼大？

應用程式套件大小包含 Flutter 引擎、框架程式碼、應用程式邏輯，以及所打包的資產（例如圖片、字型與音訊）。請務必建立正式版建置 (release build)（Android 使用 `flutter build apk` 或 `flutter build appbundle`，iOS 使用 `flutter build ipa`），這會移除除錯符號並啟用編譯器最佳化。若要分析並縮減應用程式大小，請參考[測量應用程式大小][Measuring your app's size]。

### Flutter 是否與 ABI 相容？

Flutter 與 Dart 並不提供跨不同編譯器版本的應用程式二進位介面 (ABI) 相容性。請務必使用相符的 SDK 版本來編譯你的應用程式。

### Flutter 如何處理捲動？

Flutter 提供符合各平台原生捲動行為的平台專屬捲動物理效果（例如 iOS 上的慣性捲動，以及 Android 上的過度捲動拉伸效果）。更多詳情請參考[捲動][scrolling]文件。

[scrolling]: /ui/layout/scrolling

## 框架

### 為什麼 `build()` 方法在 `State` 上，而不是在 `StatefulWidget` 上？

將 `Widget build(BuildContext context)` 方法放在 `State` 而不是 `StatefulWidget` 上，能讓開發者在繼承 `StatefulWidget` 與管理生命週期狀態時擁有更多彈性。詳細說明請參考 [`State.build` 的 API 文件][API documentation for `State.build`]。

[API documentation for `State.build`]: {{site.api}}/flutter/widgets/State/build.html

### Flutter 的標記語言在哪裡？為什麼 Flutter 沒有標記語法？

Flutter UI 是以 Dart 程式碼定義，而不是宣告式標記語言。以程式碼定義 UI 能帶來：

* 透過 stateful hot reload 快速開發。
* 完整使用程式語言功能（迴圈、條件式、函式）。
* 強型別安全與編譯器檢查。
* 輕鬆重構，並在元件之間重複使用程式碼。

由於 build 方法就是標準程式碼，你也可以根據資料或外部設定動態建立元件。

### 我的應用程式右上角出現了 Debug 橫幅。為什麼會這樣？

預設情況下，`flutter run` 會以除錯模式啟動應用程式。除錯版建置設定會在 Dart VM 中執行程式碼，以支援 stateful [hot reload][]，並啟用執行期斷言 (assertions) 以及早發現錯誤。「Debug」橫幅表示這些檢查已啟用。

若要在不啟用斷言且具備最佳化效能的情況下執行，請使用 `flutter run --release` 以 release 模式執行應用程式，或建置 release 二進位檔。

### Flutter 框架使用哪種程式設計範式？ {:#what-programming-paradigm-does-flutters-framework-use}

Flutter 結合了多種程式設計範式，並在最有效的場景中採用各自的範式：

**組合 (Composition)**
: Flutter 的主要範式是將小而單一用途的元件組合成複雜的使用者介面。例如，Material [`TextButton`][] 元件是由 [`IconTheme`][]、[`InkWell`][]、[`Padding`][]、[`Center`][]、[`Material`][]、[`AnimatedDefaultTextStyle`][] 與 [`ConstrainedBox`][] 組成的。

**函數式程式設計 (Functional programming)**
: 應用程式可以使用 [`StatelessWidget`][] 實例定義 UI，它們的作用就像將設定輸入對應到子元件的函式。Flutter 在整個元件階層中使用不可變資料結構，包括 [`Widget`][]、[`TextStyle`][] 與 [`Rect`][]。

**事件驅動程式設計 (Event-driven programming)**
: 使用者互動以事件物件表示，並分派到註冊在元件上的回呼（callback）。[`Listenable`][] 等類別將事件訂閱模型正式化。

**基於類別的物件導向程式設計 (Class-based object-oriented programming)**
: 框架 API 使用繼承來專門化行為。例如，[`RenderBox`][] 繼承 [`RenderObject`][]，為 2D 版面配置建立笛卡爾坐標系統。

**基於原型的物件導向程式設計 (Prototype-based object-oriented programming)**
: [`ScrollPhysics`][] 類別透過鏈接實例，在執行時期動態組合捲動物理效果。

**命令式程式設計 (Imperative programming)**
: 命令式程式碼用於管理封裝的狀態與測試執行，在這些場景中逐步執行的邏輯最為清楚。

**響應式程式設計 (Reactive programming)**
: 建構子參數會將變更向下傳播到元件樹，而使用者互動則透過回呼（callback）觸發向上更新樹。狀態變更會排程重建受影響的子樹。

**宣告式程式設計 (Declarative programming)**
: 元件的 `build` 方法以宣告式描述所需的 UI 狀態，將版面配置與渲染更新交給框架處理。

**泛型程式設計 (Generic programming)**
: 泛型型別在整個框架中強制執行型別安全，例如以其元件型別參數化 [`State<T>`][]，以及以其狀態型別參數化 [`GlobalKey<T>`][]。

**並行程式設計 (Concurrent programming)**
: Flutter 使用 [`Future`][] 與 [`Stream`][] 處理非同步操作，並使用 isolate 進行平行的背景運算。

**約束程式設計 (Constraint programming)**
: 版面配置系統使用由父元件向下傳遞給子元件的盒狀約束（最小與最大寬度及高度），在單次遍歷中計算幾何形狀。

[`AnimatedDefaultTextStyle`]: {{site.api}}/flutter/widgets/AnimatedDefaultTextStyle-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`ConstrainedBox`]: {{site.api}}/flutter/widgets/ConstrainedBox-class.html
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html
[`GlobalKey<T>`]: {{site.api}}/flutter/widgets/GlobalKey-class.html
[`IconTheme`]: {{site.api}}/flutter/widgets/IconTheme-class.html
[`InkWell`]: {{site.material_ui}}/InkWell-class.html
[`Listenable`]: {{site.api}}/flutter/foundation/Listenable-class.html
[`Material`]: {{site.material_ui}}/Material-class.html
[`Padding`]: {{site.api}}/flutter/widgets/Padding-class.html
[`Rect`]: {{site.api}}/flutter/dart-ui/Rect-class.html
[`RenderBox`]: {{site.api}}/flutter/rendering/RenderBox-class.html
[`RenderObject`]: {{site.api}}/flutter/rendering/RenderObject-class.html
[`ScrollPhysics`]: {{site.api}}/flutter/widgets/ScrollPhysics-class.html
[`State<T>`]: {{site.api}}/flutter/widgets/State-class.html
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`Stream`]: {{site.api}}/flutter/dart-async/Stream-class.html
[`TextButton`]: {{site.material_ui}}/TextButton-class.html
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
[`Widget`]: {{site.api}}/flutter/widgets/Widget-class.html

## 專案

### 我可以在哪裡獲得支援？

如果要回報錯誤或請求功能，請在 [Flutter 問題追蹤器][issue tracker]中提交 issue。

若要進行社群討論、疑難排解與取得建議：

* 加入 [Flutter Discord][Discord]。
* 在 [Stack Overflow][] 上使用 `flutter` 標籤提問。
* 參與 [Reddit r/FlutterDev][Reddit] 上的討論。
* 造訪[社群][Community]頁面以取得更多資源。

[Community]: {{site.main-url}}/community
[Discord]: https://discord.com/invite/rflutterdev
[issue tracker]: {{site.repo.flutter}}/issues
[Reddit]: https://www.reddit.com/r/FlutterDev/
[Stack Overflow]: {{site.so}}/tags/flutter

### 我要如何參與貢獻？

Flutter 是開源的，歡迎你做出貢獻。你可以透過以下方式幫忙：

* 在[問題追蹤器][issue tracker]上回報錯誤與功能請求。
* 依照[貢獻指南][Contributing guide]貢獻程式碼與文件。
* 在 [Discord][] 與 [Stack Overflow][] 上協助分類 issue 或幫助其他開發者。

[Contributing guide]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md

### Flutter 是開源的嗎？

是的。Flutter 是開源的，採用 BSD 3-Clause 授權，可在 [GitHub][] 上取得。

[GitHub]: {{site.repo.flutter}}

### Flutter 及其相依套件適用哪些軟體授權？

Flutter 包含兩個主要元件：引擎（含相依套件的已編譯二進位檔）與框架（Dart 原始碼）。

* 框架採用 [BSD 3-Clause 授權][only one license]。
* 引擎使用的開源相依套件列於其[授權檔案][license file]中。
* pub.dev 上的 Dart 套件各自指定其個別授權。

[license file]: {{site.repo.flutter}}/blob/main/engine/src/flutter/sky/packages/sky_engine/LICENSE
[only one license]: {{site.repo.flutter}}/blob/main/LICENSE

### 我如何確認我的 Flutter 應用程式需要顯示哪些授權？

Flutter 提供內建 API 來顯示開源授權：

* 如果你的應用程式使用 `Drawer`，請新增 [`AboutListTile`][]。
* 如果你的應用程式使用 Material Design，請呼叫 [`showAboutDialog`][] 或 [`showLicensePage`][]。
* 如需自訂呈現方式，你可以從 [`LicenseRegistry`][] 取得原始授權資訊。

[`AboutListTile`]: {{site.material_ui}}/AboutListTile-class.html
[`LicenseRegistry`]: {{site.api}}/flutter/foundation/LicenseRegistry-class.html
[`showAboutDialog`]: {{site.material_ui}}/showAboutDialog.html
[`showLicensePage`]: {{site.material_ui}}/showLicensePage.html

### 誰在開發 Flutter？

Flutter 由 Google 的工程師與全球數百位開源貢獻者共同開發。若要加入社群，請參考[為 Flutter 做出貢獻][contribute to Flutter]。

[contribute to Flutter]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md

### Flutter 的指導原則是什麼？

Flutter 圍繞三項核心原則建構：

_掌控力 (Control)_
: 開發者能完整存取並掌控系統的每一個層次。

_效能 (Performance)_
: 應用程式提供流暢、響應迅速、無卡頓的體驗。

_保真度 (Fidelity)_
: 應用程式在每個平台上都能達成像素完美、美觀的使用者體驗。

### Apple 或 Google 會拒絕我的 Flutter 應用程式嗎？

不會。成千上萬的 Flutter 應用程式已在 Apple App Store 與 Google Play 商店上架、通過審核並獲得精選推薦。與任何應用程式一樣，請確保你的應用程式遵守 Apple 的 [App Store 審查準則][guidelines]以及 Google Play 的開發人員計畫政策。

[guidelines]: {{site.apple-dev}}/app-store/review/guidelines/
