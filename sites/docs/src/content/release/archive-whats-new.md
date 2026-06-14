---
title: What's new 歷史存檔
description: >-
  docs.flutter.dev 及相關文件網站過去 What's new 更新列表。
---

本頁收錄了 Flutter 官方網站及部落格的 What's new 歷史公告。
若需最新版本資訊，請參閱[目前的 What's new][] 頁面。

[current what's new]: /release/whats-new

---

## 2025 年 5 月 20 日：Google I/O 3.32 版發佈

Flutter 3.32 已經上線！更多資訊請參閱 [Flutter 3.32 技術部落格文章][3.32-tech]。
你也可以參考 [Dart 3.8 發佈][Dart 3.8 release] 部落格文章。

[3.32-tech]: {{site.medium}}/flutter/whats-new-in-flutter-3-32-40c1086bab6e
[Dart 3.8 release]: {{site.medium}}/dartlang/announcing-dart-3-8-724eaaec9f47

**網站更新**

首先，網站已在幕後進行了一次重寫。這些改動是逐步發佈的，
你可能已經注意到其中部分變化：

* 現已支援深色模式
* 你現在可以對網站上的每個頁面按讚或按倒讚進行評分
* 側邊導覽已調整，希望能更容易找到所需內容
* 網站的無障礙性已獲改善
* 部分檔案已移動位置（我們一律提供重新導向）

**自 3.29 版以來更新或新增的文件**

* 更新了 [Flutter on iOS][] 頁面。
* 我們提供了全新的 [Flutter 安裝工作流程][workflow for installing Flutter]，
  適用於各種開發平台。此工作仍在持續進行，請持續關注。
* 新增頁面，說明如何使用新的 DevTools 功能
  [Flutter Property Editor][]。
  [VS Code][] 及 [Android Studio/IntelliJ][] 的使用說明也已更新。
* 網站已更新，說明如何[在網頁上透過旗標啟用熱重載][use hot reload on web]。
  本次發佈中，網頁熱重載為實驗性功能。
* 新增頁面，說明[如何新增 iOS 應用擴充功能][adding iOS app extensions]。
* 完整重寫了[為 iOS 和 macOS 設定 Flutter flavors][setting up Flutter flavors for iOS and macOS] 頁面。
* 新增[為 Android 設定 Flutter flavors][setting up Flutter flavors for Android] 頁面。
* 為 [Place a floating app bar above a list][floating-app-bar] cookbook 教學更新了 Cupertino 說明。
* 你現在可以[透過 SemanticRoles 提升應用程式的無障礙性][semantic-roles]。
* 另外，別忘了查看本次發佈的[重大變更][bc-3.32]頁面，裡面也有實用的遷移資訊。

[Architectural overview page]: /resources/architectural-overview
[bc-3.32]: /release/breaking-changes#released-in-flutter-3-32

[adding iOS app extensions]: /platform-integration/ios/app-extensions
[Android Studio/IntelliJ]: /tools/android-studio#property-editor
[floating-app-bar]: /cookbook/lists/floating-app-bar
[Flutter on iOS]: https://flutter.dev/multi-platform/ios
[Flutter Property Editor]: /tools/property-editor
[semantic-roles]: /ui/accessibility/web-accessibility#enhancing-accessibility-with-semantic-roles
[setting up Flutter flavors for Android]: /deployment/flavors
[setting up Flutter flavors for iOS and macOS]: /deployment/flavors-ios
[use hot reload on web]: /platform-integration/web/building#hot-reload-web
[VS Code]: /tools/vs-code#property-editor
[workflow for installing Flutter]: /install

---

## 2025 年 2 月 12 日：3.29 版發佈

Flutter 3.29 已經上線！更多資訊請參閱 [Flutter 3.29 技術部落格文章][3.29-tech]。
你也可以參考 [Dart 3.7 發佈][Dart 3.7 release] 部落格文章。

[3.29-tech]: {{site.medium}}/flutter/whats-new-in-flutter-3-29-f90c380c2317
[Dart 3.7 release]: {{site.medium}}/dartlang/announcing-dart-3-7-bf864a1b195c

**自 3.27 版以來更新或新增的文件**

* 隨著 Flutter 持續演進，其內部架構也有所調整。
  [架構總覽頁面][Architectural overview page] 已更新。

* 如果你來自 Android 開發且熟悉 Jetpack Compose，請參閱
  [Flutter for Jetpack Compose devs][]。

* 新增一則 cookbook 教學，介紹如何測試元件 (Widget) 的方向，[Test orientation][]。

* 另外，別忘了查看本次發佈的[重大變更][bc-3.29]頁面，裡面也有實用的遷移資訊。

[Architectural overview page]: /resources/architectural-overview
[bc-3.29]: /release/breaking-changes#released-in-flutter-3-29
[Dart 3.7 release]: {{site.medium}}/dartlang/announcing-dart-3-7-bf864a1b195c
[Flutter for Jetpack Compose devs]: /flutter-for/compose-devs
[Test orientation]: /cookbook/testing/widget/orientation

---

## 2024 年 12 月 11 日：3.27 版發佈

Flutter 3.27 已經上線！更多資訊請參閱 [Flutter 3.27 總覽部落格文章][3.27-umbrella]
及 [Flutter 3.27 技術部落格文章][3.27-tech]。
你也可以參考 [Dart 3.6 發佈][Dart 3.6 release] 部落格文章。

[3.27-umbrella]: {{site.medium}}/flutter/flutter-in-production-f9418261d8e1
[3.27-tech]: {{site.medium}}/flutter/whats-new-in-flutter-3-27-28341129570c
[Dart 3.6 release]: {{site.medium}}/dartlang/announcing-dart-3-6-778dd7a80983

**自 3.24 版以來更新或新增的文件**

本次網站發佈包含多項重要更新！

* Flutter AI Toolkit 正式推出！你可以在網站側邊導覽選單
  **App solutions > AI** 下方，或於 [Flutter AI Toolkit][] 找到相關文件。

* 長久以來，我們收到許多開發大型、複雜 Flutter 應用程式的開發者
  希望有更多指引。這項工作已經啟動：
  推出 [Architecting Flutter apps][]！
  這個區塊包含八個全新頁面，介紹 Flutter 應用程式架構設計，
  其中 [Design patterns][] 頁面收錄六種常見設計模式的實作食譜，供你參考。

* 新增更多關於 [WebAssembly (Wasm) 支援][Support for WebAssembly (Wasm)] 的資訊。

* [Web renderers][] 頁面經過重構，涵蓋 Web 的兩種建置模式及其兩種渲染器。

* Impeller 現已成為 iOS 與 Android 的預設渲染引擎。我們也在
  Impeller 頁面新增連結，指向詳細的 [Can I use Impeller?][] 頁面。

* 有興趣變現的開發者，我們推出了全新 [Interactive Media Ads][] 套件。
  你可以在網站側邊導覽選單
  **App solutions > Monetization > Advertising** 下方找到。
  另外，請參閱 [Flutter 的影片與網頁應用支援][ad-bp] 部落格文章。

* 新增 Flutter 與 Android 整合的相關文件，特別是
  [從 Flutter 應用程式啟動 Jetpack Compose activity][jc]
  及 [呼叫 JetPack API][jetpack-api]。

* [學習基礎知識][fwe] 頁面（前稱 First Week Experience）持續更新中。
  除了多個頁面更新，也新增了 [Dart 入門][Intro to Dart] 頁面。

* Swift Package Manager 支援與文件進一步更新。
  你現在可以在 stable channel 上針對 SwiftPM 進行建置，
  但插件仍會透過 CocoaPods 安裝，因為 SwiftPM 功能
  在 stable channel 尚未開放：
  [插件作者的 Swift Package Manager 指南][plugin-authors] 與
  [應用程式作者的 Swift Package Manager 指南][app-authors]。

* [深度連結驗證工具][deep-linking-tool]（DevTools 的一部分）現已支援 iOS 與 Android。

* 另外，別忘了查看本次發佈的[重大變更][bc-3.27]頁面，裡面也有實用的遷移資訊。

[ad-bp]: {{site.medium}}/flutter/video-web-ad-support-in-flutter-f50e5a3480a8
[app-authors]: /packages-and-plugins/swift-package-manager/for-app-developers
[Architecting Flutter apps]: /app-architecture
[bc-3.27]: /release/breaking-changes#released-in-flutter-3-27
[Can I use Impeller?]: {{site.main-url}}/go/can-i-use-impeller
[deep-linking-tool]: /tools/devtools/deep-links
[design patterns]: /app-architecture/design-patterns
[Flutter AI Toolkit]: /ai/ai-toolkit
[fwe]: /learn/pathway
[Interactive Media Ads]: {{site.pub-pkg}}/interactive_media_ads
[jc]: /platform-integration/android/compose-activity
[jetpack-api]: /platform-integration/android/call-jetpack-apis
[Intro to Dart]: {{site.dart-site}}/tutorials
[plugin-authors]: /packages-and-plugins/swift-package-manager/for-plugin-authors
[Support for WebAssembly (Wasm)]: /platform-integration/web/wasm
[web renderers]: /platform-integration/web/renderers

---

## 2024 年 8 月 7 日：I/O Connect 北京 3.24 版發佈

Flutter 3.24 已經上線！更多資訊請參閱 [Flutter 3.24 總覽部落格文章][3.24-umbrella]
及 [Flutter 3.24 技術部落格文章][3.24-tech]。
你也可以參考 [Dart 3.5 發佈][Dart 3.5 release] 部落格文章。

[3.24-tech]: {{site.flutter-blog}}/whats-new-in-flutter-3-24-6c040f87d1e4
[3.24-umbrella]: {{site.flutter-blog}}/flutter-3-24-dart-3-5-204b7d20c45d
[Dart 3.5 release]: {{site.medium}}/dartlang/dart-3-5-6ca36259fa2f

**自 3.22 版以來更新或新增的文件**

本次網站發佈包含多項重要更新！

* 元件 (Widget) 目錄更新：
  * [Cupertino 目錄][Cupertino catalog] 新增 37 個缺漏的元件，並為更新後的 `CupertinoActionSheet` 元件加入新截圖。
  * 新增 [`CarouselView`][] 元件。
  * `CupertinoButton` 與 `CupertinoTextField` 也有行為更新。
* 新增指南，說明如何將 Swift Package Manager 支援加入
  [iOS 插件][iOS plugins] 與 [iOS 應用程式][iOS apps]。（注意：在所有相依套件完成遷移前，Flutter 仍會使用 CocoaPods。）
* Web 文件更新：
  * [在網頁嵌入 Flutter][Embedding Flutter on the web]，包含如何啟用多視窗模式
  * [將網頁內容嵌入 Flutter 應用程式][Embedding web content into a Flutter app]
* Android 14 更新：
  若你使用 Android 14 裝置，現在可以支援 Android 的[預測返回手勢][predictive back gesture]。
* iOS 18 更新：
  iOS 18 發佈時仍為 beta。這些 iOS 18 功能已在 Flutter 啟用，並於文件中說明：
  * 在 Flutter 應用中使用 [iOS app extension][] 建立自訂切換開關。使用者可在自訂控制中心時加入你的應用程式切換開關。
  * 支援 [Tinted app icons][]
* [Flutter 基礎知識文件][Flutter fundamentals docs] 有兩頁更新：
  * [元件][Widgets]
  * [版面配置][Layout]
  希望這些頁面對新手 Flutter 開發者有所幫助。
* DevTools 也有更新。請參閱 [DevTools 2.35.0][]、[DevTools 2.36.0][] 與 [DevTools 2.37.2][] 發佈說明。

[`CarouselView`]: {{site.api}}/flutter/material/CarouselView-class.html
[Cupertino catalog]: /ui/widgets/cupertino
[DevTools 2.35.0]: /tools/devtools/release-notes/release-notes-2.35.0
[DevTools 2.36.0]: /tools/devtools/release-notes/release-notes-2.36.0
[DevTools 2.37.2]: /tools/devtools/release-notes/release-notes-2.37.2
[Embedding Flutter on the web]: /platform-integration/web/embedding-flutter-web
[Embedding web content into a Flutter app]: /platform-integration/web/web-content-in-flutter
[Flutter fundamentals docs]: /learn/pathway
[Widgets]: /learn/pathway/tutorial/widget-fundamentals
[iOS app extension]: /platform-integration/ios/app-extensions
[iOS plugins]: /packages-and-plugins/swift-package-manager/for-plugin-authors
[iOS apps]: /packages-and-plugins/swift-package-manager/for-app-developers
[Layout]: /learn/pathway/tutorial/layout
[predictive back gesture]: /platform-integration/android/predictive-back
[Tinted app icons]: /deployment/ios#add-an-app-icon

<b>其他</b>

* 若你對新的實驗性 Flutter GPU API 有興趣，請參閱 [Flutter GPU 部落格文章][Flutter GPU blog post]。
* Flutter wiki 已拆分並移動到相關 GitHub 倉庫，讓資訊更容易維護與更新。

[Flutter GPU blog post]: {{site.flutter-blog}}/getting-started-with-flutter-gpu-f33d497b7c11

---

## 2024 年 5 月 14 日：Google I/O 3.22 版發佈

Flutter 3.22 已經上線！更多資訊請參閱 [Flutter 3.22 總覽部落格文章][3.22-umbrella]
及 [Flutter 3.22 技術部落格文章][3.22-tech]。

你也可以參考 [Dart 3.4 發佈][Dart 3.4 release] 部落格文章。
特別是 Dart 現在內建了一個語言 macro，`JsonCodable`，可用於 JSON 資料序列化與反序列化。
未來（尚未指定時程）的 Dart 發佈將允許你自訂 macro。
想了解更多，請參閱 [dart.dev/go/macros][]。

[3.22-tech]: {{site.flutter-blog}}/whats-new-in-flutter-3-22-fbde6c164fe3
[3.22-umbrella]: {{site.flutter-blog}}/io24-5e211f708a37
[Dart 3.4 release]: {{site.medium}}/dartlang/dart-3-4-bd8d23b4462a
[dart.dev/go/macros]: http://dart.dev/go/macros

**自 3.19 版以來更新或新增的文件**

* 新增 7 頁[自適應與響應式設計][Adaptive and Responsive design]專區。
  （這取代了先前較為分散的相關文件。）
* 若你是剛完成第一個 Flutter codelab 的新手開發者，我們新增了「下一步建議」，
  幫助你持續進階。請參閱 [Flutter 基礎知識文件][Flutter fundamentals docs]。
* [Flutter 安裝][Flutter install] 文件已全面改版。
* 新增三個 codelab 及一份 Games Toolkit 新指南。
  相關新增內容請參閱更新後的 [Casual Games Toolkit][] 頁面。
* Flutter 對 Web Assembly (Wasm) 的支援已進入穩定版。
  詳情請參閱更新後的 [WebAssembly (Wasm) 支援][Support for WebAssembly (Wasm)] 頁面。
* DevTools 新增 Android 深度連結評估畫面。
  詳情請參閱新頁面 [驗證深度連結][Validate deep links]。
* 新增說明 Flutter SDK 3.22 及以後版本 Web 啟動流程的頁面。
  請參閱 [Flutter 網頁應用程式初始化][Flutter web app initialization]。
* 你現在可以在執行時提供程式碼，將資源轉換為其他格式。
  詳情請參閱 [建置時轉換資源][Transforming assets at build time]。

**網站基礎架構**

* 若你有貢獻網站，可能已注意到近期有些變動。網站基礎架構已更新，新的工作流程更簡單。
  詳情請參閱 [網站 README][website README]。
* 你可能也注意到側邊選單的 **App solutions**
  子選單現在有 **AI** 區塊，以及加強的 **Monetization** 區塊，這只是部分變動。

[Adaptive and Responsive design]: /ui/adaptive-responsive
[Casual Games Toolkit]: /resources/games-toolkit
[Flutter fundamentals docs]: /learn/pathway
[Flutter install]: /install
[Flutter web app initialization]: /platform-integration/web/initialization
[website README]: {{site.github}}/flutter/website/?tab=readme-ov-file#flutter-documentation-website
[Support for WebAssembly (Wasm)]: /platform-integration/web/wasm
[Transforming assets at build time]: /ui/assets/asset-transformation
[Validate deep links]: /tools/devtools/deep-links

## 2024 年 2 月 15 日：情人節前夕 3.19 版發佈

Flutter 3.19 已經上線！更多資訊請參閱 [Flutter 3.19 總覽部落格文章][3.19-umbrella]
及 [Flutter 3.19 技術部落格文章][3.19-tech]。

你也可以參考 [Dart 3.3 發佈][Dart 3.3 release] 部落格文章。

[3.19-tech]: {{site.flutter-blog}}/whats-new-in-flutter-3-19-58b1aae242d2
[3.19-umbrella]: {{site.flutter-blog}}/starting-2024-strong-with-flutter-and-dart-cae9845264fe
[Dart 3.3 release]: {{site.medium}}/dartlang/new-in-dart-3-3-extension-types-javascript-interop-and-more-325bf2bf6c13

**自 3.16 版以來更新或新增的文件**

* 新增[從 Material 2 遷移到 Material 3][migrating from Material 2 to Material 3] 頁面。感謝 [@TahaTesser][] 撰寫本指南。
* Material 3 在主題化上與 Material 2 有顯著不同。
  [使用主題共用顏色與字型樣式][Use themes to share colors and font styles] cookbook 教學已更新以反映這些改變。
* [Flutter 安裝][Flutter install] 頁面已更新。歡迎[提供意見][let us know]。
* [並行與 isolates][Concurrency and isolates] 頁面已重寫。

[@TahaTesser]: {{site.github}}/TahaTesser
[Concurrency and isolates]: /perf/isolates
[Flutter install]: /install
[let us know]: {{site.github}}/flutter/website/issues/new/choose
[migrating from Material 2 to Material 3]: /release/breaking-changes/material-3-migration
[Use themes to share colors and font styles]: /cookbook/design/themes

**其他更新**

* 請參閱剛發佈的 [Flutter 與 Dart 2024 路線圖][Flutter and Dart 2024 Roadmap]。
* 請參閱[在 Dart 與 Flutter 應用中運用 Gemini API][Harness the Gemini API in your Dart and Flutter apps]。

[Flutter and Dart 2024 Roadmap]: {{site.github}}/flutter/flutter/blob/main/docs/roadmap/Roadmap.md
[Harness the Gemini API in your Dart and Flutter apps]: {{site.flutter-blog}}/harness-the-gemini-api-in-your-dart-and-flutter-apps-00573e560381

## 2023 年 11 月 15 日：3.16 版發佈

Flutter 3.16 已經上線！更多資訊請參閱 [Flutter 3.16 部落格文章][3.16-umbrella]
及技術性 [Flutter 3.16 新功能][What's new in Flutter 3.16] 部落格文章。

你也可以參考 [Dart 3.2 發佈][Dart 3.2 release]。

**自 3.13 版以來更新或新增的文件**

* 從本版起，**Material Flutter 應用程式的預設主題為 Material 3**。
  除非你在應用程式主題中明確指定 Material 2
  （使用 `useMaterial3: false`），
  否則升級後應用程式的外觀 _會_ 有所不同。
* 雖然 Flutter Casual Games Toolkit 技術上不算 3.16 發佈的一部分，
  但我們同步釋出了一次重大更新。
  本次更新包含三個全新遊戲程式碼範本、三個新遊戲 cookbook 教學，
  以及整體文件重組。詳情請參閱 [Casual Games Toolkit][]，並記得查看側邊選單！
* Impeller 執行時現已
  **在 Vulkan 裝置上的 Android 可用**，
  需透過 `--enable-impeller` 旗標啟用。
  詳情請參閱
  [Impeller 渲染引擎][impeller] 頁面。
* 你現在可以在 iOS 上執行時，
  為 Flutter 應用程式新增 Apple iOS 應用擴充功能。
  詳情請參閱
  [新增 iOS 應用擴充功能][ios-app-ext]。

**文章**

以下文章自 Flutter 3.13 以來發佈於 [Flutter Medium][] 刊物：

* [How IBM is creating a Flutter Center of Excellence][ibm]
* [Introducing the Flutter Consulting Directory][fcd]
* [Developing Flutter apps for large screens][ls]
* [Dart & Flutter DevTools Extensions][dt-ext]
* [Building your next casual game with Flutter][games-2]

[3.16-umbrella]: {{site.flutter-blog}}/flutter-3-16-dart-3-2-high-level-umbrella-post-b9218b17f0f7
[Casual Games Toolkit]: /resources/games-toolkit
[Dart 3.2 release]: {{site.medium}}/dartlang/dart-3-2-c8de8fe1b91f
[dt-ext]: {{site.flutter-blog}}/dart-flutter-devtools-extensions-c8bc1aaf8e5f
[fcd]: {{site.flutter-blog}}/introducing-the-flutter-consulting-directory-f6fc4c1d2ba3
[games-2]: {{site.flutter-blog}}/building-your-next-casual-game-with-flutter-716ef457e440
[ibm]: {{site.flutter-blog}}/how-ibm-is-creating-a-flutter-center-of-excellence-3c6a3c025441
[impeller]: /perf/impeller
[ls]: {{site.flutter-blog}}/developing-flutter-apps-for-large-screens-53b7b0e17f10
[ios-app-ext]: /platform-integration/ios/app-extensions
[What's new in Flutter 3.16]: {{site.flutter-blog}}/whats-new-in-flutter-3-16-dba6cb1015d1

## 2023 年 8 月 16 日：3.13 版發佈

Flutter 3.13 已經上線！更多資訊請參閱 [Flutter 3.13 部落格文章][blog-general]。

你也可以參考
[Dart 3.1 及 Dart 3 函數式程式設計風格回顧][Dart 3.1 & a retrospective on functional style programming in Dart 3]。

除了自上次發佈以來的新文件，我們也在逐步發佈改版後的
docs.flutter.dev 網站。具體來說，我們重新整理（扁平化）了
資訊架構（IA），並將部分最受歡迎的 cookbook 教學
納入側邊導覽。
[歡迎告訴我們你的想法！][file-issue]

**自 3.10 版以來更新或新增的文件**

* 完整重寫並重新命名了
  [使用原生語言除錯器][oem] 頁面。
  本頁面介紹如何同時連接原生除錯器
  和 Dart 除錯器至 Android _及_ iOS 應用程式。（之前的版本已過時，
  且未涵蓋 iOS。）
* 新增[版面配置/捲動][scrolling-overview]總覽頁面。
  （事實上，捲動也是 IA 中的新區塊。）
* 我們已停止提供 Happy Paths 建議，
  改為採用 [Flutter Favorites 計畫][Flutter Favorites program]。
  Flutter Favorites 很快就會有新增項目！
* Impeller 執行時現已在 macOS 上
  於旗標後方提供。詳情請參閱
  [Impeller 渲染引擎][impeller] 頁面。
* 如往常一樣，本版本包含一些
  [重大變更][breaking-changes]。
  以下連結提供更多資訊，包含如何遷移至新 API：
  * [從 `IgnorePointer`、`AbsorbPointer` 和 `SliverIgnorePointer` 移除 `ignoreSemantics` 屬性][pointer]
  * [`Editable.onCaretChanged` 回呼（callback）已移除][editable-onCaretChanged]
  * 另請參閱 [3.10 版以來的棄用 API][deprecated-3.10]

[blog-general]: {{site.flutter-blog}}/whats-new-in-flutter-3-13-479d9b11df4d
[Dart 3.1 & a retrospective on functional style programming in Dart 3]: {{site.medium}}/dartlang/dart-3-1-a-retrospective-on-functional-style-programming-in-dart-3-a1f4b3a7cdda
[Flutter Favorites program]: /packages-and-plugins/favorites
[breaking-changes]: /release/breaking-changes
[deprecated-3.10]: /release/breaking-changes/3-10-deprecations
[editable-onCaretChanged]: /release/breaking-changes/editable-text-scroll-into-view
[oem]: /testing/native-debugging?tab=from-vscode-to-xcode-ios
[pointer]: /release/breaking-changes/ignoringsemantics-migration
[scrolling-overview]: /ui/layout/scrolling

**Codelab 與工作坊**

以下 codelab 自 Flutter 3.10 以來已發佈：

* [為 Flutter 應用程式新增主畫面元件][home-screen]

[home-screen]:   {{site.codelabs}}/flutter-home-screen-widgets

**文章**

以下文章自 Flutter 3.10 以來發佈於 [Flutter Medium][] 刊物：

* [The Future of iOS development with Flutter][]
* [How it's made: I/O Flip][]
* [Flutter 2023 Q1 survey results][]

[Flutter 2023 Q1 survey results]: {{site.flutter-blog}}/flutter-2023-q1-survey-api-breaking-changes-deep-linking-and-more-7ff692f974e0
[How it's made: I/O Flip]: {{site.flutter-blog}}/how-its-made-i-o-flip-da9d8184ef57
[The Future of iOS development with Flutter]: {{site.flutter-blog}}/the-future-of-ios-development-with-flutter-833aa9779fac

**即將推出的功能**

即將在穩定版本中推出的功能：

**Material 3**

你可能已經知道 [Material 3][] 即將推出。
Flutter 一段時間前就已支援，
只需在程式碼中設定 `useMaterial3: true` 即可啟用。
到下一個 Q4 的穩定版本時，
Material 3 將預設啟用。現在是開始遷移程式碼的好時機。
本網站幾乎所有範例程式碼都已更新為使用 Material 3。

更多資訊請參閱以下資源：

* [Flutter 3.13 部落格文章][blog-material]
* [Flutter 的 Material Design][Material Design for Flutter] 頁面

**Android 版 Impeller**

Android 版 Impeller 的進展持續中。
更多資訊請參閱
[Flutter 3.13 部落格文章][blog-impeller]。

**新的捲動 API**

我們一直在更新捲動 API。
重寫後最終將支援樹狀結構和表格的 2D 捲動，甚至對角線捲動！
Flutter 3.13 也提供了用於精美捲動效果的新 Sliver 類別。
更多資訊請參閱
[Flutter 3.13 部落格文章][blog-scrolling]。

**Games Toolkit 更新**

我們正在更新 Flutter Games Toolkit，
包括範例程式碼、額外文件和新影片。
Games Toolkit 的開發獨立於
Flutter SDK，敬請期待相關更新。
更多資訊請參閱 [Flutter 3.13 部落格文章][blog-games]。

[blog-games]:     {{site.flutter-blog}}/whats-new-in-flutter-3-13-479d9b11df4d#30b2
[blog-impeller]:  {{site.flutter-blog}}/whats-new-in-flutter-3-13-479d9b11df4d#a7be
[blog-material]:  {{site.flutter-blog}}/whats-new-in-flutter-3-13-479d9b11df4d#4c90
[blog-scrolling]: {{site.flutter-blog}}/whats-new-in-flutter-3-13-479d9b11df4d#02dc
[Material 3]: {{site.material}}
[Material Design for Flutter]: /ui/design/material

<hr>

## 2023 年 5 月 10 日：Google I/O 2023：3.10 版發佈

Flutter 3.10 已經上線！本版本包含許多更新與改進。本頁列出文件變更，
你也可以參閱 [3.10 部落格文章][3.10 blog post] 及
[3.10 發佈說明][3.10 release notes]。

你也可以參考 [Dart 3 發佈介紹][Introducing Dart 3]。

[3.10 blog post]: {{site.flutter-blog}}/whats-new-in-flutter-3-10-b21db2c38c73
[3.10 release notes]: /release/release-notes/release-notes-3.10.0
[Introducing Dart 3]: {{site.medium}}/dartlang/announcing-dart-3-53f065a10635

**自 3.7 版以來更新或新增的文件**

* 在 add-to-app 模組指南中，新增了適用於 iOS 或 Android 的[無線除錯][wireless debugging]章節。
  你可以透過 Wi-Fi 在實體裝置上除錯 iOS 或 Android 應用程式。
* 更新了 [Material 元件目錄][Material Widget Catalog] 以涵蓋 Material 3。
* 新增了 [canvasKitVariant 執行時設定][canvasKitVariant runtime configuration] 選項。
  此 Web 初始化選項可讓你設定要下載的 CanvasKit 版本。
* 更新了 [Impeller][] 參考資料。
  iOS 應用程式現在預設使用 Impeller 渲染器。
* 新增了 [Android Java Gradle 遷移][Android Java Gradle migration] 指南，
  說明如何解決 Java 17 與 7.3 之前版本 Gradle 之間的不相容問題。
* 更新了 [DevTools][] 參考資料。
* 更新了 [WebAssembly 支援][WebAssembly support] 參考資料，
  加入試用預覽支援的指引。
* 新增了[為 Flutter 應用程式新增 iOS 應用擴充功能][adding iOS app extensions] 指南。
  本版本支援在 Flutter 應用程式中使用原生 iOS 應用擴充功能。
* 新增了[測試 Flutter 插件][testing Flutter plugins] 指南。
* 新增了[字型與字體排印][fonts and typography] 指南。
* 新增了在 [Android][] 和 [iOS][] Flutter 應用程式上還原狀態的指南。
* 新增了關於[共用 iOS 和 macOS 插件實作][sharing iOS and macOS plugin implementations] 的章節。
* 新增了根據目前平台調適 Material 元件
  [頂端應用程式列與導覽列][top app bar and navigation bar] 及[底端導覽列][bottom navigation bar] 的指南，
  作為 UI 元件平台調適準則的起點。
* 在架構總覽中引入了[應用程式解剖][Anatomy of an app]章節。
* 依照 SLSA 標準，在 [SDK 封存頁面][SDK archive page] 的所有下載項目中新增了出處資訊。
  出處資訊保證建置產物來自預期的來源。

[wireless debugging]: /add-to-app/debugging
[Material Widget Catalog]: /ui/widgets/material
[canvasKitVariant runtime configuration]: /platform-integration/web/initialization
[Android Java Gradle migration]: /release/breaking-changes/android-java-gradle-migration-guide
[DevTools]: /tools/devtools
[WebAssembly support]: /platform-integration/web/wasm
[adding iOS app extensions]: /platform-integration/ios/app-extensions
[testing Flutter plugins]: /testing/testing-plugins
[fonts and typography]: /ui/design/text/typography
[Android]: /platform-integration/android/restore-state-android
[iOS]: /platform-integration/ios/restore-state-ios
[sharing iOS and macOS plugin implementations]: /packages-and-plugins/developing-packages#shared-ios-and-macos-implementations
[alert dialog]: /platform-integration/platform-adaptations#alert-dialog
[top app bar and navigation bar]: /platform-integration/platform-adaptations#top-app-bar-and-navigation-bar
[bottom navigation bar]: /platform-integration/platform-adaptations#bottom-navigation-bars
[Anatomy of an app]: /resources/architectural-overview#anatomy-of-an-app
[SDK archive page]: /install/archive

**Codelab**

以下 codelab 自 Flutter 3.7 以來已發佈：

* [Dart 3 的 Records 與 Patterns][Records and Patterns in Dart 3]<br>
  探索 Dart 3 的新 records 和 patterns 功能。
  學習如何在 Flutter 應用程式中使用它們，撰寫更易讀且易於維護的 Dart 程式碼。
* [在 Flutter 中建置次世代 UI][Building next generation UIs in Flutter] _（現已封存）_ <br>
  學習如何建置一個利用 `flutter_animate`、片段著色器和粒子場的 Flutter 應用程式。
  你將打造一個令人聯想到我們都喜愛的科幻電影和電視節目的使用者介面。
* [使用 PaLM API 和 Flutter 建立 Google 產品俳句][Create haikus about Google products with the PaLM API and Flutter]<br>
  學習如何建置一個使用 PaLM API 根據 Google 產品名稱產生俳句的應用程式。
  PaLM API 讓你能夠存取 Google 最先進的大型語言模型。

[Building next generation UIs in Flutter]: https://web.archive.org/web/20251126130753/https://codelabs.developers.google.com/codelabs/flutter-next-gen-uis
[Records and Patterns in Dart 3]: {{site.codelabs}}/codelabs/dart-patterns-records
[Create haikus about Google products with the PaLM API and Flutter]: {{site.codelabs}}/haiku-generator

**文章**

Flutter 團隊自 Flutter 3.7 以來在 [Flutter Medium][] 刊物發佈了以下文章：

* [Flutter in 2023: strategy and roadmap][]
* [Wonderous nominated for Webby Award][]

[Wonderous nominated for Webby Award]: {{site.flutter-blog}}/wonderous-nominated-for-webby-award-8e00e2a648c2
[Flutter in 2023: strategy and roadmap]: {{site.flutter-blog}}/flutter-in-2023-strategy-and-roadmap-60efc8d8b0c7

## 2023 年 1 月 25 日：Flutter Forward：3.7 版發佈

Flutter 3.7 已經上線！本版本包含許多更新與改進。本頁列出文件變更，
你也可以參閱 [3.7 部落格文章][3.7 blog post] 及
[3.7 發佈說明][3.7 release notes]。

你也可以參考 [Flutter 的下一步][What's next for Flutter]
及 [Dart 3 alpha 介紹][Introducing Dart 3 alpha]。

[3.7 blog post]: {{site.flutter-blog}}/whats-new-in-flutter-3-7-38cbea71133c
[3.7 release notes]: /release/release-notes/release-notes-3.7.0
[Introducing Dart 3 alpha]: {{site.medium}}/dartlang/dart-3-alpha-f1458fb9d232
[What's next for Flutter]: {{site.flutter-blog}}/whats-next-for-flutter-b94ce089f49c

**自 3.3 版以來更新或新增的文件**

* 你現在可以在 `initializeEngine` 方法中傳入設定資訊至引擎。
  更多資訊請參閱
  [自訂網頁應用程式初始化][Customizing web app initialization]。
* [建立 Flutter Flavors][Creating Flavors for Flutter]
  學習如何在 Flutter 中建立 flavor
  （在 iOS 中也稱為 _build configuration_）。
* 國際化支援已全面改版，
  [Flutter 應用程式國際化][Internationalizing Flutter apps] 頁面已更新。
* DevTools 的記憶體除錯工具已完整改版，
  對應頁面 [使用記憶體檢視][Using the memory view] 已重寫。
* 本版本對 Flutter 自訂片段著色器的支援進行了大量改進。
  更多資訊請參閱新頁面
  [撰寫並使用片段著色器][Writing and using fragment shaders]。
* 部分安全工具會錯誤回報 Flutter 應用程式中的安全漏洞。
  新的[安全性偽陽性][Security false positives]頁面
  列出了已知的偽陽性及可以忽略的原因。
* 你現在可以從任何 isolate（包括背景 isolate）呼叫 platform channel。
  更多資訊請參閱
  [撰寫自訂平台特定程式碼][Writing custom platform-specific code]
  及 Medium 上的 [介紹 isolate 背景 channels][Introducing isolate background channels] 文章。
* 我們已更新 Swift 相關文件。
  新增及更新的頁面包括：
  * [Flutter for SwiftUI developers][] - 更新
  * [Add a Flutter screen to an iOS app][] - 更新，適用於 SwiftUI
  * [Flutter concurrency for Swift developers][] - 新增
  * dart.dev 上的 [Learning Dart as a Swift developer][] - 新增
* 自 Xcode 14 起，Apple 不再支援 bitcode。
  我們的兩個頁面 [Adding an iOS clip target][]
  及 [Flutter FAQ][] 已更新以反映此事實。
* 對於喜歡嘗鮮的開發者，
  你可能會想試試 Flutter 未來的渲染引擎 Impeller。
  由於 Impeller 尚未準備好穩定版本，
  你可以在我們的 [Flutter GitHub wiki][Impeller] 上找到更多資訊。

{% comment %}

* Missing docs (xxx):
  * Frame analysis tab in Performance view - Kenzie
  * Menu bars (M3) - Greg Spencer
    No docs yet (other than API docs)
  * Cascading menus (M3) - Greg Spencer
    No docs yet (other than API docs)
  * Custom context menus - Justin
    No docs yet (he volunteered to do something after 3.7)
  * CupertinoListSelection, CupertinoListTile (new Cupertino) - Mitchell Goodwin
  * AnimatedGrid, AnimatedSliverGrid (new widgets) - Kate
  * Material 3 - what had been worked on? started? who in eng owns this?
  * Global selection improvements - ChunHeng Tai (chtai)
  * magnification property (who owns this? - I asked Justin)
    No docs yet (other than API docs)
    <https://main-api.flutter.dev/flutter/material/TextField/magnifierConfiguration.html>
  * Implementing iOS PlatformView BackdropFilter. (Blur) - Leigha and Chris Yang
    <https://docs.google.com/document/d/1V7Jc_RGaknrBBPPBBKB8lT7f3PKhYr8sin35MSMFAf4/edit>
  * Memory management updates - Zach Anderson
  * toImageSync - new API for rendering improvement - Zach Anderson
    Nope, nothing available
  * Font asset hot reload - Jonah
{% endcomment -%}

[Add a Flutter screen to an iOS app]: /add-to-app/ios/add-flutter-screen
[Adding an iOS clip target]: /platform-integration/ios/ios-app-clip
[Creating Flavors for Flutter]: /deployment/flavors
[Customizing web app initialization]: /platform-integration/web/initialization
[Flutter concurrency for Swift developers]: /flutter-for/dart-swift-concurrency
[Flutter FAQ]: /resources/faq
[Flutter for SwiftUI developers]: /flutter-for/swiftui-devs
[Internationalizing Flutter apps]: /ui/internationalization
[Introducing isolate background channels]: {{site.medium}}/flutter/introducing-background-isolate-channels-7a299609cad8
[Learning Dart as a Swift developer]: {{site.dart-site}}/guides/language/coming-from/swift-to-dart
[Security false positives]: /reference/security-false-positives
[Using the memory view]: /tools/devtools/memory
[Writing and using fragment shaders]: /ui/design/graphics/fragment-shaders
[Writing custom platform-specific code]: /platform-integration/platform-channels

**Codelab 與工作坊**

自上次穩定版本以來，我們新增了以下 codelab：

* [你的第一個 Flutter 應用程式][Your first Flutter app]<br>
  在建置一個產生酷炫名稱的應用程式（例如「newstay」、「lightstream」、「mainbrake」或「graypine」）的過程中學習 Flutter。
  使用者可以請求下一個名稱、收藏目前的名稱，
  並在獨立頁面上查看收藏名稱列表。
  最終的應用程式會響應不同的螢幕尺寸。
  （注意：本 codelab 取代了先前「為行動裝置撰寫你的第一個 Flutter codelab 第 1 和第 2 部分」。）
* [在 Flutter 插件中使用 FFI][Using FFI in a Flutter plugin] _（現已封存）_ <br>
  Dart 的 FFI（foreign function interface，外部函式介面）允許 Flutter 應用程式使用公開 C API 的既有原生程式庫。
  Dart 在 Android、iOS、Windows、macOS 和 Linux 上支援 FFI。
* [使用 Flutter 和 Flame 建置遊戲][Building a game with Flutter and Flame]<br>
  學習如何使用 Flutter 和 Flame 建置一個平台跳躍遊戲！
  在 Doodle Dash 遊戲中（靈感來自 Doodle Jump），
  你扮演 Dash（Flutter 吉祥物）
  或她的好友 Sparky（Firebase 吉祥物），
  透過在平台上跳躍來盡可能達到最高處。
* [使用 FirebaseUI 為 Flutter 應用程式新增使用者驗證流程][Add a user authentication flow to a Flutter app using FirebaseUI]<br>
  學習如何使用 FlutterFire UI 套件為 Flutter 應用程式新增 Firebase 驗證。
  你將為 Flutter 應用程式新增電子郵件/密碼
  和 Google 登入授權。你也將學習
  如何設定 Firebase 專案，
  並使用 FlutterFire CLI 在 Flutter 應用程式中初始化 Firebase。
* [使用 Firebase Emulator Suite 進行 Flutter 應用程式本地開發][Local development for your Flutter apps using the Firebase Emulator Suite] _（現已封存）_ <br>
  學習如何在本地開發期間使用 Firebase Emulator Suite 搭配 Flutter，
  包括如何使用 Emulator Suite 進行電子郵件密碼驗證，
  以及如何讀寫資料至 Firestore 模擬器。此外，你還將學習
  從模擬器匯入和匯出資料，以便每次返回開發時使用相同的模擬資料。

此外，我們已更新所有現有 codelab 以支援多平台。
[Codelab 與工作坊][codelabs & workshops] 頁面已更新，
反映最新可用的 codelab。

[Add a user authentication flow to a Flutter app using FirebaseUI]: {{site.firebase}}/codelabs/firebase-auth-in-flutter-apps
[Building a game with Flutter and Flame]: {{site.codelabs}}/codelabs/flutter-flame-game
[codelabs & workshops]: /reference/learning-resources
[Local development for your Flutter apps using the Firebase Emulator Suite]: https://web.archive.org/web/20251102002913/https://firebase.google.com/codelabs/get-started-firebase-emulators-and-flutter
[Using FFI in a Flutter plugin]: https://web.archive.org/web/20250908035316/https://codelabs.developers.google.com/codelabs/flutter-ffigen
[Your first Flutter app]: {{site.codelabs}}/codelabs/flutter-codelab-first

**文章**

自上次穩定版本以來，我們在 [Flutter Medium][] 刊物發佈了以下文章：

* [What's next for Flutter][]
* [Adapting Wonderous to larger device formats][]
* [What's new in Flutter 3.7][3.7 blog post]
* [Announcing the Flutter News Toolkit][]
* [How it's made: Holobooth][]
* [Playful typography with Flutter][]
* [Material 3 for Flutter][]
* [Introducing background isolate channels][]
* [How can we improve the Flutter experience for desktop?][]
* [What we learned from the Flutter Q3 2022 survey][]
* [Supporting six platforms with two keyboards][]
* [Studying developer's usage of IDEs for Flutter development][]

[Announcing the Flutter News Toolkit]: {{site.flutter-blog}}/announcing-the-flutter-news-toolkit-180a0d32c012
[Adapting Wonderous to larger device formats]: {{site.flutter-blog}}/adapting-wonderous-to-larger-device-formats-ac51e1c00bc0
[How can we improve the Flutter experience for desktop?]: {{site.medium}}/flutter/how-can-we-improve-the-flutter-experience-for-desktop-70b34bff9392
[How it's made: Holobooth]: {{site.flutter-blog}}/how-its-made-holobooth-6473f3d018dd
[Introducing background isolate channels]: {{site.flutter-blog}}/introducing-background-isolate-channels-7a299609cad8
[Material 3 for Flutter]: {{site.flutter-blog}}/material-3-for-flutter-d417a8a65564
[Playful typography with Flutter]: {{site.medium}}/flutter/playful-typography-with-flutter-f030385058b4
[Studying developer's usage of IDEs for Flutter development]: {{site.medium}}/flutter/studying-developers-usage-of-ides-for-flutter-development-4c0a648a48
[Supporting six platforms with two keyboards]: {{site.medium}}/flutter/what-we-learned-from-the-flutter-q3-2022-survey-9b78803accd2
[What we learned from the Flutter Q3 2022 survey]: {{site.medium}}/flutter/what-we-learned-from-the-flutter-q3-2022-survey-9b78803accd2

## 2022 年 8 月 31 日：Flutter Vikings：3.3 版發佈

Flutter 3.3 已經上線！更多資訊請參閱

[Flutter 3.3 新功能][What's new in Flutter 3.3]，
[Dart 2.18：Objective-C 與 Swift 互通][Dart 2.18: Objective-C & Swift interop]（Medium 上的免費文章），
及 [Flutter 3.3 發佈說明][3.3 release notes]。

[3.3 release notes]: /release/release-notes/release-notes-3.3.0
[Dart 2.18: Objective-C & Swift interop]: {{site.medium}}/dartlang/dart-2-18-f4b3101f146c
[What's new in Flutter 3.3]: {{site.medium}}/flutter/whats-new-in-flutter-3-3-893c7b9af1ff

**自 3.0 版以來更新或新增的文件**

* [導覽與路由總覽][navigation and routing overview] 頁面已重寫，
  提供更多關於同時使用 `Navigator`
  和 `Router`、具名路由以及
  使用路由套件的指引。
* [URL 策略][URL strategies] 頁面也已更新，
  反映更精簡的 API。
* 對於未發佈至 Microsoft Store 的應用程式，
  你現在可以在 pubspec 檔案中
  設定應用程式執行檔的版本與產品版本。
  更多資訊請參閱
  [建置並發佈 Windows 桌面應用程式][Build and release a Windows desktop app]。
* 若你正在開發 iOS 16 及以上版本的軟體，
  必須啟用[開發者模式][Developer mode]。
  macOS [安裝頁面][install page] 已更新此資訊。
* 如 [3.3 發佈說明][3.3 release notes] 所述，
  你應該透過設定
  `PlatformDispatcher.onError` 回呼（callback）
  來捕捉應用程式中的所有錯誤與例外，
  而不是使用自訂的 `Zone`。
  [Flutter 錯誤處理][Handling errors in Flutter]
  頁面已更新此建議。

[Build and release a Windows desktop app]: /deployment/windows
[Developer mode]: {{site.apple-dev}}/documentation/xcode/enabling-developer-mode-on-a-device
[Handling errors in Flutter]: /testing/errors
[install page]: /install
[navigation and routing overview]: /ui/navigation
[URL strategies]: /ui/navigation/url-strategies

## 2022 年 5 月 11 日：Google I/O 2022：Flutter 3 發佈

Flutter 3 已經上線！！！更多資訊請參閱
[Flutter 3 介紹][Introducing Flutter 3]、[Flutter 3 新功能][What's new in Flutter 3]，
及 [Dart 2.17：生產力與整合][Dart 2.17: Productivity and integration]
（Medium 上的免費文章），
以及 [Flutter 3 發佈說明][Flutter 3 release notes]。

[Dart 2.17: Productivity and integration]: {{site.medium}}/dartlang/dart-2-17-b216bfc80c5d
[Flutter 3 release notes]: /release/release-notes/release-notes-3.0.0
[Introducing Flutter 3]: {{site.medium}}/flutter/introducing-flutter-3-5eb69151622f
[What's new in Flutter 3]: {{site.medium}}/flutter/whats-new-in-flutter-3-8c74a5bc32d0

**自 2.10 版以來更新或新增的文件**

* 我們推出了 Casual Games Toolkit，幫助你使用 Flutter 建置遊戲。
  請至 [Games 頁面][Games page] 及
  [Games 文件頁面][Games doc page] 了解更多。
* 你是否在努力提升 Flutter 開發技能？
  我們建立了 Happy paths 計畫來提供協助。
  請至 Happy paths 頁面了解更多。
  （注意：此計畫已停止，改由 [Flutter Favorite 計畫][Flutter Favorite Program] 取代。）
* 你是否是希望對應用程式啟動流程有更多控制的網頁開發者？
  請參閱新頁面
  [自訂網頁應用程式初始化][Customizing web app initialization]，
  該頁面已新增至全面更新的
  `/platform-integration/web` 下的網頁文件集合。
* Flutter 3 支援 Apple Silicon 處理器。
  我們已更新 macOS [安裝頁面][install page]，
  提供 Apple Silicon 的下載按鈕。
* 在 Flutter 3 中，macOS 和 Linux 平台
  已達穩定版，與 Windows 同行。
  你現在可以開發可在上述任一或全部平台運行的應用程式。
  因此，[桌面版][Desktop]（及相關）頁面已更新。
* [效能最佳實踐][Performance best practices] 頁面已大幅重寫並移至更顯眼的位置。
  變更包括避免卡頓的額外建議，
  包括如何最小化因固有尺寸（intrinsics）引起的版面配置過程，
  以及最小化 `saveLayer()` 呼叫次數的技巧。
* Firebase 的 Flutter 文件已全面改版。
  請查看更新後的
  [Flutter Firebase 入門指南][Flutter Firebase get started guide]。
* [dart.dev][] 網站有自己的 [what's new][dart-whats-new] 頁面，
  但值得一提的新頁面是指南
  [將 Dart 作為 JavaScript 開發者學習][js-to-dart]。
  請繼續關注類似的 Swift 和 C# 相關文章。

[dart-whats-new]: {{site.dart-site}}/guides/whats-new
[dart.dev]: {{site.dart-site}}
[Desktop]: /platform-integration/desktop
[Flutter Firebase get started guide]: {{site.firebase}}/docs/flutter/setup
[Games page]: {{site.main-url}}/games
[Games doc page]: /resources/games-toolkit
[js-to-dart]: {{site.dart-site}}/guides/language/coming-from/js-to-dart
[install page]: /install

**Codelab 與工作坊**

自上次穩定版本以來，我們新增了以下 codelab：

* [讓你的 Flutter 應用程式從無聊到美麗][Take your Flutter app from boring to beautiful] _（現已封存）_ <br>
  學習如何使用 Material 3 的功能讓你的應用程式更美觀 _且_ 更具響應性。

另外，請查看我們的 GDE 撰寫的工作坊，可在 [Flutter 社群部落格][Flutter community blog] 上取得。

[Flutter community blog]: {{site.medium}}/@flutter_community/622b52f70173
[Take your Flutter app from boring to beautiful]: https://web.archive.org/web/20251204045151/https://codelabs.developers.google.com/codelabs/flutter-boring-to-beautiful

**影片**

Google I/O 2022 已結束，但你仍可在[影片][videos]頁面查看
Google I/O 上 Flutter 相關的更新與演講。

[videos]: /resources/videos

---

## 2022 年 2 月 3 日：Windows 支援：2.10 版發佈

Microsoft Windows 的桌面支援
（2.10 版的核心功能）正式上線！
更多資訊請參閱
[宣布 Flutter for Windows][Announcing Flutter for Windows]
及 [Flutter 2.10 新功能][What's new in Flutter 2.10]，
這些是 Medium 上的免費文章。

<YouTubeEmbed id="g-0B_Vfc9qM" title="Flutter Update: Windows"></YouTubeEmbed>

[Announcing Flutter for Windows]: {{site.flutter-blog}}/announcing-flutter-for-windows-6979d0d01fed
[What's new in Flutter 2.10]: {{site.flutter-blog}}/whats-new-in-flutter-2-10-5aafb0314b12

---

## 2021 年 12 月 8 日：2.8 版發佈

Flutter 2.8 已經上線！詳情請參閱
[宣布 Flutter 2.8][Announcing Flutter 2.8] 及
[Flutter 2.8 新功能][What's new in Flutter 2.8]。

[Announcing Flutter 2.8]: {{site.flutter-blog}}/announcing-flutter-2-8-31d2cb7e19f5
[What's new in Flutter 2.8]: {{site.flutter-blog}}/whats-new-in-flutter-2-8-d085b763d181

## 2021 年 9 月 8 日：2.5 版發佈

Flutter 2.5 已經上線！詳情請參閱
[Flutter 2.5 新功能][What's new in Flutter 2.5]。

我們對 flutter/website 倉庫進行了重大修改，使其更易於使用和維護。
若你有貢獻此倉庫，請參閱 [README][] 檔案了解更多資訊。

**自 2.2 版以來更新或新增的文件**

* 新增了關於[使用 Actions 與快捷鍵][Using Actions and Shortcuts] 的頁面。

**文章**

自上次穩定版本以來，我們在 [Flutter Medium][] 刊物發佈了以下文章：

* [Raster thread performance optimization tips][]
* [Writing a good code sample][]
* [GSoC'21: Creating a desktop sample for Flutter][]
* [Flutter Hot Reload][]
* [What can we do to better improve Flutter?][]
* [Adding Flutter to your existing iOS and Android codebases][]
* [Google I/O Spotlight: Flutter in action at ByteDance][]
* [Improving Platform Channel Performance in Flutter][]

[Adding Flutter to your existing iOS and Android codebases]: {{site.flutter-blog}}/adding-flutter-to-your-existing-ios-and-android-codebases-3e2c5a4797c1
[What's new in Flutter 2.5]: {{site.flutter-blog}}/whats-new-in-flutter-2-5-6f080c3f3dc
[Flutter Hot Reload]: {{site.flutter-blog}}/flutter-hot-reload-f3c5994e2cee
[Google I/O Spotlight: Flutter in action at ByteDance]: {{site.flutter-blog}}/google-i-o-spotlight-flutter-in-action-at-bytedance-c22f4b6dc9ef
[GSoC'21: Creating a desktop sample for Flutter]: {{site.flutter-blog}}/gsoc-21-creating-a-desktop-sample-for-flutter-7d77e74812d6
[Improving Platform Channel Performance in Flutter]: {{site.flutter-blog}}/improving-platform-channel-performance-in-flutter-e5b4e5df04af
[Raster thread performance optimization tips]: {{site.flutter-blog}}/raster-thread-performance-optimization-tips-e949b9dbcf06
[README]: {{site.repo.this}}/#flutter-website
[Using Actions and Shortcuts]: /ui/interactivity/actions-and-shortcuts
[What can we do to better improve Flutter?]: {{site.flutter-blog}}/what-can-we-do-better-to-improve-flutter-q2-2021-user-survey-results-1037fb8f057b
[Writing a good code sample]: {{site.flutter-blog}}/writing-a-good-code-sample-323358edd9f3

---

## 2021 年 5 月 18 日：Google I/O 2021：2.2 版發佈

Flutter 2.2 已經上線！詳情請參閱
[宣布 Flutter 2.2][Announcing Flutter 2.2] 及
[Flutter 2.2 新功能][What's New in Flutter 2.2]。

我們持續將網站上的程式碼遷移至使用 null safety，但此工作尚未完成。

**自 2.0 版以來更新或新增的文件**

* 新增了建置自適應應用程式的頁面。
* 新增了說明如何在 Flutter 中使用 [Google API][Google APIs] 的頁面。
* 新增了 [Flutter 嵌入式支援][Embedded Support for Flutter] 的登陸頁面。
* 新增了在 Android 上設定與使用[延遲元件][Deferred components]的頁面。
* 大幅更新了 DevTools 的[記憶體檢視頁面][Memory view page]。
* [桌面版][desktop] 頁面已更新，反映桌面支援的最新進展，
  特別是對 Windows UWP 的新支援。

{% comment %}

* migration guides (drag gestures and package:flutter_lints, depending)
{% endcomment %}

**Codelab**

自上次穩定版本以來的新 codelab：

* [為 Flutter 應用程式新增應用程式內購][Adding in-app purchases to your Flutter app]
* [使用 Dialogflow Essentials 與 Flutter 為 Android 建置語音機器人][Build Voice Bots for Android with Dialogflow Essentials & Flutter]
* [開始使用 Firebase for Flutter][Get to know Firebase for Flutter]

**工作坊**

針對 Google I/O 2021，我們新增了一個
基於 DartPad 的全新 Flutter/Dart 學習工具：**工作坊！**
這些工作坊設計為由講師帶領進行。
由講師帶領的影片可在
Flutter 和 Firebase YouTube 頻道上取得：

* [建置你的第一個 Flutter 應用程式][Building your first Flutter app]
* [Flutter 的 Firebase][Firebase for Flutter]
* [Flutter 與 Dialogflow 語音機器人][Flutter and Dialogflow voice bots]
* [Inherited 元件][Inherited widgets]
* [Null safety][]
* [Sliver][]

如需查看 I/O 上所有 Flutter 相關活動的列表，
請參閱 [Google 2021 I/O Flutter][] 頁面。

你可以自行撰寫 DartPad 工作坊！
若有興趣，請查看以下資源：

* [DartPad 工作坊撰寫指南][DartPad Workshop Authoring Guide]
* [DartPad 分享指南（使用 Gist 檔案）][DartPad Sharing Guide (using a Gist file)]
* [在網頁中嵌入 DartPad][Embedding DartPad in your web page]

[Google 2021 I/O Flutter]: https://events.google.com/io/program/content?4=topic_flutter

**文章**

自上次穩定版本以來，我們在 [Flutter Medium][] 刊物發佈了以下文章：

* [How It's Made: I/O Photo Booth][]
* [Which factors affected users' decisions to adopt Flutter? - Q1 2021 user survey results][Q1 2021 survey]

[Adding in-app purchases to your Flutter app]: {{site.codelabs}}/codelabs/flutter-in-app-purchases
[Announcing Flutter 2.2]: {{site.flutter-blog}}/announcing-flutter-2-2-at-google-i-o-2021-92f0fcbd7ef9
[Build Voice Bots for Android with Dialogflow Essentials & Flutter]: {{site.codelabs}}/codelabs/dialogflow-flutter
[Building your first Flutter app]: {{site.yt.watch}}?v=Z6KZ3cTGBWw
[DartPad Sharing Guide (using a Gist file)]: {{site.github}}/dart-lang/dart-pad/wiki/Sharing-Guide
[DartPad Workshop Authoring Guide]: {{site.github}}/dart-lang/dart-pad/wiki/Workshop-Authoring-Guide
[Deferred components]: /perf/deferred-components
[Embedded Support for Flutter]: /embedded
[Embedding DartPad in your web page]: {{site.github}}/dart-lang/dart-pad/wiki/Embedding-Guide
[Firebase for Flutter]: {{site.yt.watch}}?v=4wunbF29Kkg
[Flutter and Dialogflow voice bots]: {{site.yt.watch}}?v=O7JfSF3CJ84
[Get to know Firebase for Flutter]: {{site.firebase}}/codelabs/firebase-get-to-know-flutter#0
[Google APIs]: /data-and-backend/google-apis
[How It's Made: I/O Photo Booth]: {{site.flutter-blog}}/how-its-made-i-o-photo-booth-3b8355d35883
[Inherited widgets]: {{site.yt.watch}}?v=LFcGPS6cGrY
[Memory view page]: /tools/devtools/memory
[Null safety]: {{site.yt.watch}}?v=HdKwuHQvArY
[Slivers]: {{site.yt.watch}}?v=YY-_yrZdjGc
[Q1 2021 survey]: {{site.flutter-blog}}/which-factors-affected-users-decisions-to-adopt-flutter-q1-2021-user-survey-results-563e61fc68c9
[What's New in Flutter 2.2]: {{site.flutter-blog}}/whats-new-in-flutter-2-2-fd00c65e2039

---

## 2021 年 3 月 3 日：Flutter Engage：2.0 版發佈

Flutter 2 已經上線！！！更多資訊請參閱
[宣布 Flutter 2][Announcing Flutter 2]、[Flutter 2 新功能][What's new in Flutter 2]、
[Flutter Web 支援達到穩定里程碑][Flutter web support hits the stable milestone]、
[宣布 Dart 2.12][Announcing Dart 2.12]，
及 [Flutter 2 發佈說明][Flutter 2 release notes]。

**自 1.22 版以來更新或新增的文件**

* 新增了 [Dash 是誰？][Who is Dash?] 頁面！
* 關於應用程式變現的資訊已收集到新的 [Flutter Ads][] 登陸頁面。
* 新增了說明 [Flutter Fix][] 功能及其使用方式的頁面。
* 新增及更新的 Web 頁面，包括：
  * [Flutter 的 Web 支援][Web support for Flutter]
  * [在 Web 上設定 URL 策略][Configuring the URL strategy on the web]
  * [Web FAQ][]
* [Flutter 的桌面支援][Desktop support for Flutter] 頁面已更新，
  以及網站上其他討論桌面支援的頁面。
* [DevTools][] 文件已更新。最重要的更新是以下頁面：
  * [Flutter inspector][]
* 新增了說明如何為行動裝置和 Web [實作深度連結][implement deep linking] 的頁面。
* 更新了[建立響應式與自適應應用程式][Creating responsive and adaptive apps] 頁面。
* 許多頁面（包括 flutter.dev 上的所有 codelab）
  和範例已更新為支援 null safety。
* 新增了兩個 add-to-app 頁面：
  * [使用多個 Flutter 實例][Using multiple Flutter instances]
  * [將 Flutter 視圖新增至 Android 應用程式][Adding a Flutter view to an Android app]
* 新增了說明如何[使用 integration_test 套件撰寫整合測試][write integration tests using the integration_test package] 的頁面。
* 大幅更新了[國際化][internationalization] 頁面。
* 新增及更新了[效能][performance] 相關頁面，包括：
  * [效能指標][Performance metrics]
  * [效能 FAQ][Performance faq]
  * [更多效能思考][More thoughts about performance]

**Codelab**

我們的許多 codelab 已更新至支援 null safety。
自上次穩定版本以來，我們也新增了一個新 codelab：

* [為 Flutter 應用程式新增 AdMob 橫幅廣告與原生嵌入廣告][Adding AdMob banner and native inline ads to a Flutter app]

完整列表請參閱 [Flutter codelab][Flutter codelabs]。

**文章**

自上次穩定版本以來，我們在 [Flutter Medium][] 刊物發佈了以下文章：

* [Flutter performance updates in the first half of 2020][perf-H1-2020]
* [Are you happy with Flutter? - Q4 2020 user survey results][Q4]
* [Join us for #30DaysOfFlutter][]
* [Providing operating system compatibility on a large scale][comp]
* [Updates on Flutter Testing][]
* [Announcing Dart null safety beta][]
* [Deprecation Lifetime in Flutter][]
* [New ad formats for Flutter][]
* [Accessible expression with Material Icons and Flutter][]
* [Dart sound null safety: technical preview 2][]
* [Flutter on the web, slivers, and platform-specific issues: user survey results from Q3 2020][Q3]
* [Testable Flutter and Cloud Firestore][]
* [Performance testing on the web][]

[Accessible expression with Material Icons and Flutter]: {{site.flutter-blog}}/accessible-expression-with-material-icons-and-flutter-e3f3f622200b
[Adding AdMob banner and native inline ads to a Flutter app]: {{site.codelabs}}/codelabs/admob-inline-ads-in-flutter
[Adding a Flutter view to an Android app]: /add-to-app/android/add-flutter-view
[Announcing Dart null safety beta]: {{site.flutter-blog}}/announcing-dart-null-safety-beta-4491da22077a
[Announcing Dart 2.12]: {{site.medium}}/dartlang/announcing-dart-2-12-499a6e689c87
[Announcing Flutter 2]: {{site.google-blog}}/2021/03/announcing-flutter-2.html
[comp]: {{site.flutter-blog}}/providing-operating-system-compatibility-on-a-large-scale-374cc2fb0dad
[Configuring the URL strategy on the web]: /ui/navigation/url-strategies
[Creating responsive and adaptive apps]: /ui/adaptive-responsive
[Dart sound null safety: technical preview 2]: {{site.flutter-blog}}/null-safety-flutter-tech-preview-cb5c98aba187
[Deprecation Lifetime in Flutter]: {{site.flutter-blog}}/deprecation-lifetime-in-flutter-e4d76ee738ad
[Desktop support for Flutter]: /platform-integration/desktop
[Flutter Ads]: {{site.main-url}}/monetization
[Flutter 2 release notes]: /release/release-notes/release-notes-2.0.0
[Flutter Fix]: /tools/flutter-fix
[Flutter inspector]: /tools/devtools/inspector
[Flutter web support hits the stable milestone]: {{site.flutter-blog}}/flutter-web-support-hits-the-stable-milestone-d6b84e83b425
[implement deep linking]: /ui/navigation/deep-linking
[internationalization]: /ui/internationalization
[Join us for #30DaysOfFlutter]: {{site.flutter-blog}}/join-us-for-30daysofflutter-9993e3ec847b
[More thoughts about performance]: /perf/appendix
[New ad formats for Flutter]: {{site.flutter-blog}}/new-ads-beta-inline-banner-and-native-support-for-the-flutter-mobile-ads-plugin-e48a7e9a0e64
[perf-H1-2020]: {{site.flutter-blog}}/flutter-performance-updates-in-the-first-half-of-2020-5c597168b6bb
[performance]: /perf
[Performance faq]: /perf/faq
[Performance metrics]: /perf/metrics
[Performance testing on the web]: {{site.flutter-blog}}/performance-testing-on-the-web-25323252de69
[Q3]: {{site.flutter-blog}}/flutter-on-the-web-slivers-and-platform-specific-issues-user-survey-results-from-q3-2020-f8034236b2a8
[Q4]: {{site.flutter-blog}}/are-you-happy-with-flutter-q4-2020-user-survey-results-41cdd90aaa48
[Testable Flutter and Cloud Firestore]: {{site.flutter-blog}}/flutter/testable-flutter-and-cloud-firestore-1cf2fbbce97b
[Updates on Flutter Testing]: {{site.flutter-blog}}/updates-on-flutter-testing-f54aa9f74c7e
[Using multiple Flutter instances]: /add-to-app/multiple-flutters
[Web FAQ]: /platform-integration/web/faq
[Web support for Flutter]: /platform-integration/web
[What's new in Flutter 2]: {{site.flutter-blog}}/whats-new-in-flutter-2-0-fe8e95ecc65
[Who is Dash?]: /dash
[write integration tests using the integration_test package]: /testing/integration-tests

---

## 2020 年 10 月 1 日：1.22 版發佈

Flutter 1.22 已經上線！詳情請參閱
[宣布 Flutter 1.22][Announcing Flutter 1.22]。

**自 1.20 版以來更新或新增至 flutter.dev 的文件**

* 更新了[為 iOS 14 開發][Developing for iOS 14] 頁面，
  詳述了使用 Flutter 以 iOS 14 為目標的相關事項，包括
  Add-to-App、深度連結和通知的注意事項。
* 新增了說明如何[新增 iOS App Clip][add an iOS App Clip] 的頁面，
  這是 iOS 14 的新功能，支援執行不超過 10 MB 的輕量級免安裝應用程式。
* 新增了說明如何[遷移應用程式以使用 `CupertinoIcons` 中新圖示字形][cupertino-icons] 的頁面。
* 新增了說明 Platform Views 新實作的頁面，以及如何使用它們
  在 Flutter 應用程式中托管原生 [Android 視圖][Android views] 和 [iOS 視圖][iOS views]。
  此功能已使 [google_maps_flutter][]
  和 [webview_flutter][] 插件更新至生產就緒的 1.0 版本。
* 新增了說明如何使用 Dart DevTools 中新的
  [應用程式大小工具][App Size tool] 的頁面。

**Codelab**

自上次穩定版本以來，我們新增了一個新 codelab：

* [使用 Flutter 的 Material Motion 建置精美轉場效果][Building Beautiful Transitions with Material Motion for Flutter]<br>
  學習如何使用 Material [animations][] 套件
  為名為 Reply 的 Material 應用程式新增預建轉場效果。

完整列表請參閱 [Flutter codelab][Flutter codelabs]。

**文章**

自上次穩定版本以來，我們在 [Flutter Medium][] 刊物發佈了以下文章：

* [Learning Flutter's new navigation and routing][]
* [Integration testing with flutter_driver][]
* [Announcing Flutter Windows Alpha][]
* [Handling web gestures in Flutter][]
* [Supporting iOS 14 and Xcode 12 with Flutter][]
* [Learn testing with the new Flutter sample][]
* [Platform channel examples][]
* [Updates on Flutter and Firebase][]

[add an iOS App Clip]: /platform-integration/ios/ios-app-clip
[animations]: {{site.pub}}/packages/animations
[Announcing Flutter 1.22]: {{site.flutter-blog}}/announcing-flutter-1-22-44f146009e5f
[Announcing Flutter Windows Alpha]: {{site.flutter-blog}}/announcing-flutter-windows-alpha-33982cd0f433
[App Size tool]: /tools/devtools/app-size
[Building Beautiful Transitions with Material Motion for Flutter]: {{site.codelabs}}/codelabs/material-motion-flutter
[cupertino-icons]: /release/breaking-changes/cupertino-icons-1.0.0
[Developing for iOS 14]: /platform-integration/ios/ios-debugging
[google_maps_flutter]: {{site.pub}}/packages/google_maps_flutter
[Handling web gestures in Flutter]: {{site.flutter-blog}}/handling-web-gestures-in-flutter-e16946a04745
[Integration testing with flutter_driver]: {{site.flutter-blog}}/integration-testing-with-flutter-driver-36f66ede5cf2
[Learn testing with the new Flutter sample]: {{site.flutter-blog}}/learn-testing-with-the-new-flutter-sample-gsoc20-work-product-e872c7f6492a
[Learning Flutter's new navigation and routing]: {{site.flutter-blog}}/learning-flutters-new-navigation-and-routing-system-7c9068155ade
[Platform channel examples]: {{site.flutter-blog}}/platform-channel-examples-7edeaeba4a66
[Android views]: /platform-integration/android/platform-views
[iOS views]: /platform-integration/ios/platform-views
[Supporting iOS 14 and Xcode 12 with Flutter]: {{site.flutter-blog}}/supporting-ios-14-and-xcode-12-with-flutter-15fe0062e98b
[Updates on Flutter and Firebase]: {{site.flutter-blog}}/updates-on-flutter-and-firebase-8076f70bc90e
[webview_flutter]: {{site.pub}}/packages/webview_flutter

## 2020 年 8 月 5 日：1.20 版發佈

Flutter 1.20 已經上線！詳情請參閱
[宣布 Flutter 1.20][Announcing Flutter 1.20]。

**更新或新增至 flutter.dev 的文件**

* [Flutter 架構總覽][Flutter architectural overview]，深入探討 Flutter 架構，
  在 1.20 版發佈後數天新增至網站。
* [減少行動裝置上的著色器編譯卡頓][Reducing shader compilation jank on mobile] 已新增至效能文件。
* [為 iOS 14 beta 開發][Developing for iOS 14 beta] 概述了在執行 iOS 14 beta 的裝置上開發時
  可能遇到的問題。
* 新增了使用 snapd 在 Linux 上安裝 Flutter 的說明。
* 更新了[桌面支援][Desktop support] 頁面，反映 Linux 桌面應用程式（以及 macOS）現已以 alpha 版本提供。
* 已出版數本 Flutter 新書。Flutter 書籍頁面已相應更新。
* [Codelab 登陸][codelabs landing] 頁面已更新。

dart.dev 新增了深入探討 null safety 的文章：

* [理解 null safety][Understanding null safety]

**Codelab**

[Flutter Day][] 於 2020 年 6 月 25 日舉行。
為了準備此活動，
我們撰寫了新的 codelab 並更新了現有的 codelab。
新的 codelab 包括：

* [為 Flutter 應用程式新增 Admob 廣告][Adding Admob Ads to a Flutter app]
* [如何撰寫 Flutter 插件][How to write a Flutter plugin] _（現已封存）_
* [多平台 Firestore Flutter][Multi-platform Firestore Flutter]
* [在 Flutter Web 應用程式中使用插件][Using a plugin with a Flutter web app] _（現已封存）_
* [撰寫 Flutter 桌面應用程式][Write a Flutter desktop application] _（現已封存）_

完整列表請參閱 [Flutter codelab][Flutter codelabs]。

**文章**

自上次穩定版本以來，我們在 [Flutter Medium][] 刊物發佈了以下文章：

* [Announcing Adobe XD support for Flutter][]
* [What are the important & difficult tasks for Flutter devs? - Q1 2020 survey results][q1-2020]
* [Optimizing performance in Flutter web apps with tree shaking and deferred loading][shaking]
* [Flutter Package Ecosystem Update][]
* [Improving perceived performance with image placeholders, precaching, and disabled navigation transitions][web-perf]
* [Two Months of #FlutterGoodNewsWednesday][]
* [Handling 404: Page not found error in Flutter][]
* [Flutter and Desktop apps][]
* [What's new with the Slider widget?][]
* [New tools for Flutter developers, built in Flutter][dev-tools]
* [Canonical enables Linux desktop app support with Flutter][ubuntu]
* [Enums with Extensions in Dart][]
* [Managing issues in a large-scale open source project][]
* [What we learned from the Flutter Q2 2020 survey][]
* [Building performant Flutter widgets][]
* [How to debug layout issues with the Flutter Inspector][]
* [Going deeper with Flutter's web support][]
* [Flutter Performance Updates in 2019][]

[Adding Admob Ads to a Flutter app]: {{site.codelabs}}/codelabs/admob-ads-in-flutter/
[Announcing Adobe XD Support for Flutter]: {{site.flutter-blog}}/announcing-adobe-xd-support-for-flutter-4b3dd55ff40e
[Announcing Flutter 1.20]: {{site.flutter-blog}}/announcing-flutter-1-20-2aaf68c89c75
[Building performant Flutter widgets]: {{site.flutter-blog}}/building-performant-flutter-widgets-3b2558aa08fa
[codelabs landing]: /reference/learning-resources
[Desktop support]: /platform-integration/desktop
[dev-tools]: {{site.flutter-blog}}/new-tools-for-flutter-developers-built-in-flutter-a122cb4eec86
[Developing for iOS 14 beta]: /platform-integration/ios/ios-debugging
[Enums with Extensions in Dart]: {{site.flutter-blog}}/enums-with-extensions-dart-460c42ea51f7
[Flutter and Desktop apps]: {{site.flutter-blog}}/flutter-and-desktop-3a0dd0f8353e
[Flutter architectural overview]: /resources/architectural-overview
[Flutter codelabs]: /reference/learning-resources
[Flutter Day]: https://events.withgoogle.com/flutter-day/
[Flutter Package Ecosystem Update]: {{site.flutter-blog}}/flutter-package-ecosystem-update-d50645f2d7bc
[Flutter Performance Updates in 2019]: {{site.flutter-blog}}/going-deeper-with-flutters-web-support-66d7ad95eb5224
[Going deeper with Flutter's web support]: {{site.flutter-blog}}/going-deeper-with-flutters-web-support-66d7ad95eb52
[Handling 404: Page not found error in Flutter]: {{site.flutter-blog}}/handling-404-page-not-found-error-in-flutter-731f5a9fba29
[How to write a Flutter plugin]: https://web.archive.org/web/20250908035316/https://codelabs.developers.google.com/codelabs/flutter-ffigen
[Managing issues in a large-scale open source project]: {{site.flutter-blog}}/managing-issues-in-a-large-scale-open-source-project-b3be6eecae2b
[How to debug layout issues with the Flutter Inspector]: {{site.flutter-blog}}/how-to-debug-layout-issues-with-the-flutter-inspector-87460a7b9db
[Multi-platform Firestore Flutter]: {{site.codelabs}}/codelabs/friendlyeats-flutter/
[q1-2020]: {{site.flutter-blog}}/what-are-the-important-difficult-tasks-for-flutter-devs-q1-2020-survey-results-a5ef2305429b
[Reducing shader compilation jank on mobile]: /perf/rendering-performance
[shaking]: {{site.flutter-blog}}/optimizing-performance-in-flutter-web-apps-with-tree-shaking-and-deferred-loading-535fbe3cd674
[Two Months of #FlutterGoodNewsWednesday]: {{site.flutter-blog}}/two-months-of-fluttergoodnewswednesday-a12e60bab782
[ubuntu]: {{site.flutter-blog}}/announcing-flutter-linux-alpha-with-canonical-19eb824590a9
[Understanding null safety]: {{site.dart-site}}/null-safety/understanding-null-safety
[Using a plugin with a Flutter web app]: https://web.archive.org/web/20230927112932/https://codelabs.developers.google.com/codelabs/web-url-launcher
[web-perf]: {{site.flutter-blog}}/improving-perceived-performance-with-image-placeholders-precaching-and-disabled-navigation-6b3601087a2b
[What's new with the Slider widget?]: {{site.flutter-blog}}/whats-new-with-the-slider-widget-ce48a22611a3
[What we learned from the Flutter Q2 2020 survey]: {{site.flutter-blog}}/what-we-learned-from-the-flutter-q2-2020-survey-a4f1fc8faac9
[Write a Flutter desktop application]: https://web.archive.org/web/20250908033205/https://codelabs.developers.google.com/codelabs/flutter-github-client

## 2020 年 5 月 6 日：居家工作：1.17 版發佈

Flutter 1.17 已經上線！

更多資訊請參閱 [宣布 Flutter 1.17][Announcing Flutter 1.17]。

自上次公告以來新增與更新的文件包括：

* 新增了關於[理解約束][Understanding constraints] 的新頁面，
  由 Flutter 社群成員 Marcelo Glasberg 貢獻。
* [動畫登陸頁面][animations landing page] 已重寫。
  此頁面現在包含動畫決策樹，
  幫助你找出適合需求的動畫方式。也包含了關於
  新的 [Material 元件預建動畫套件][package for pre-canned Material widget animations] 的資訊。
* [熱重載][hot reload] 頁面已重寫。希望你覺得更清楚！
* [桌面版][Desktop] 頁面已更新，現在包含了在 macOS 上設定使用授權與使用應用程式沙盒的資訊。
* 插件文件已更新，涵蓋新的 Android Plugin API 並描述聯合插件。受影響的頁面包括：
  * [開發套件與插件][Developing packages and plugins]
  * [開發插件套件][Developing plugin packages]
  * [支援新的 Android 插件 API][Supporting the new Android plugin APIs]
  * [撰寫自訂平台特定程式碼][Writing custom platform-specific code]
* 新增了 [Dart 程式碼混淆][Obfuscating Dart code] 頁面。
  （從 wiki 移動並在 1.16.2 更新。）
* 新增了關於使用 Xcode 11.4 以及如何手動更新專案的頁面。
  若工具偵測到需要，可能會在自動更新設定時引導你到此頁面。
* 新增了在 Android 開發時[管理 add-to-app 的插件與相依套件][add2app] 的頁面。

其他新鮮事：

* 自上次穩定版本以來，我們在 [Flutter Medium][] 刊物發佈了許多文章：
  * [Custom implicit animations in Flutter…with TweenAnimationBuilder][]
  * [Directional animations with build-in explicit animations][]
  * [When should I use AnimatedBuilder or AnimatedWidget?][]
  * [Improving Flutter with your opinion - Q4 2019 survey results][]
  * [How to write a Flutter web plugin, Part 2][]
  * [It's Time: The Flutter Clock contest results][]
  * [How to float an overlay widget over a (possibly transformed) UI widget][]
  * [How to embed a Flutter application in a website using DartPad][]
  * [Flutter web: Navigating URLs using named routes][]
  * [How to choose which Flutter animation widget is right for you?][]
  * [Announcing a free Flutter introductory course][]
  * [Announcing CodePen support for Flutter][]
  * [Animation deep dive][]
  * [Flutter Spring 2020 update][]
  * [Introducing Google Fonts for Flutter v 1.0.0!][]
  * [Flutter web support updates][]
  * [Modern Flutter plugin development][]

[add2app]: /add-to-app/android/plugin-setup
[Animation deep dive]: {{site.flutter-blog}}/animation-deep-dive-39d3ffea111f
[animations landing page]: /ui/animations
[Announcing a free Flutter introductory course]: {{site.flutter-blog}}/learn-flutter-for-free-c9bc3b898c4d
[Announcing CodePen support for Flutter]: {{site.flutter-blog}}/announcing-codepen-support-for-flutter-bb346406fe50
[Announcing Flutter 1.17]: {{site.flutter-blog}}/announcing-flutter-1-17-4182d8af7f8e
[Custom implicit animations in Flutter…with TweenAnimationBuilder]: {{site.flutter-blog}}/custom-implicit-animations-in-flutter-with-tweenanimationbuilder-c76540b47185
[Developing packages and plugins]: /packages-and-plugins/developing-packages
[Developing plugin packages]: /packages-and-plugins/developing-packages#federated-plugins
[Directional animations with build-in explicit animations]: {{site.flutter-blog}}/directional-animations-with-built-in-explicit-animations-3e7c5e6fbbd7
[Flutter Medium]: {{site.medium}}/flutter
[Flutter Spring 2020 update]: {{site.flutter-blog}}/spring-2020-update-f723d898d7af
[Flutter web: Navigating URLs using named routes]: {{site.flutter-blog}}/web-navigating-urls-using-named-routes-307e1b1e2050
[Flutter web support updates]: {{site.flutter-blog}}/web-support-updates-8b14bfe6a908
[hot reload]: /tools/hot-reload
[How to choose which Flutter animation widget is right for you?]: {{site.flutter-blog}}/how-to-choose-which-flutter-animation-widget-is-right-for-you-79ecfb7e72b5
[How to embed a Flutter application in a website using DartPad]: {{site.flutter-blog}}/how-to-embed-a-flutter-application-in-a-website-using-dartpad-b8fd0ee8c4b9
[How to float an overlay widget over a (possibly transformed) UI widget]: {{site.flutter-blog}}/how-to-float-an-overlay-widget-over-a-possibly-transformed-ui-widget-1d15ca7667b6
[How to write a Flutter web plugin, Part 2]: {{site.flutter-blog}}/how-to-write-a-flutter-web-plugin-part-2-afdddb69ece6
[Improving Flutter with your opinion - Q4 2019 survey results]: {{site.flutter-blog}}/improving-flutter-with-your-opinion-q4-2019-survey-results-ba0e6721bf23
[Introducing Google Fonts for Flutter v 1.0.0!]: {{site.flutter-blog}}/introducing-google-fonts-for-flutter-v-1-0-0-c0e993617118
[It's Time: The Flutter Clock contest results]: {{site.flutter-blog}}/its-time-the-flutter-clock-contest-results-dcebe2eb3957
[Obfuscating Dart code]: /deployment/obfuscate
[package for pre-canned Material widget animations]: {{site.pub}}/packages/animations
[Modern Flutter plugin development]: {{site.flutter-blog}}/modern-flutter-plugin-development-4c3ee015cf5a
[Supporting the new Android plugin APIs]: /release/breaking-changes/plugin-api-migration
[Understanding constraints]: /ui/layout/constraints
[When should I use AnimatedBuilder or AnimatedWidget?]: {{site.flutter-blog}}/when-should-i-useanimatedbuilder-or-animatedwidget-57ecae0959e8

## 2019 年 12 月 11 日：Flutter Interact：1.12 版發佈

Flutter 1.12 已經上線！

更多資訊請參閱
[Flutter：為無所不在的運算而設計的首個 UI 平台][Flutter: the first UI platform designed for ambient computing]、
[宣布 Flutter 1.12：多麼美好的一年！][Announcing Flutter 1.12: What a year!] 及
[Flutter 1.12.13][] 發佈說明。

自上次公告以來新增與更新的文件包括：

* 配合 add-to-app 的更新實作，我們新增了說明
  如何[將 Flutter 新增至現有應用程式][add Flutter to an existing app] 的文件（適用於 iOS 和 Android）。
* 若你擁有插件程式碼，我們建議你更新至
  新的 Android 插件 API。更多資訊請參閱
  [將插件遷移至新的 Android API][Migrating your plugin to the new Android APIs]。
* Web 支援已移至 beta channel。更多資訊請參閱 [Flutter 的 Web 支援][Web support for Flutter] 及
  Medium 刊物上的 [Flutter Web 支援進入 beta][Web support for Flutter goes beta]。
  另外，[使用 Flutter 建置 Web 應用程式][building a web app with Flutter] 頁面也已更新。
* 在 [Get started][] 文件中新增了一個撰寫你的第一個 Flutter Web 應用程式的 codelab，
  包含在 DevTools 中設定中斷點的說明！
* 我們推出了一個推薦特定 Dart 和
  Flutter 插件及套件的計畫。了解更多關於
  [Flutter Favorite 計畫][Flutter Favorite program] 的資訊。
* 新增了一個使用 DartPad 的隱式動畫 codelab（不需要下載任何軟體即可執行！）。
* Alpha 版 macOS（桌面版）支援現已在
  master 和 dev channel 的 1.13 版本中提供。
  更多資訊請參閱 [Flutter 的桌面支援][Desktop support for Flutter]。
* [應用程式大小][app size] 頁面的 iOS 章節已更新，以反映 bitcode 的納入。
* Flutter Layout Explorer 的 alpha 版本發佈，這是一個新功能
  （Flutter inspector 的一部分），允許你以視覺化方式探索版面配置。
  更多資訊請參閱 [Flutter Layout Explorer][] 文件。

其他新鮮事：

* 全新版本的 [Flutter Gallery][]。

祝 Flutter 使用愉快！

[add Flutter to an existing app]: /add-to-app
[Announcing Flutter 1.12: What a year!]: {{site.flutter-blog}}/announcing-flutter-1-12-what-a-year-22c256ba525d
[app size]: /perf/app-size#ios
[building a web app with Flutter]: /platform-integration/web/building
[Flutter: the first UI platform designed for ambient computing]: {{site.google-blog}}/2019/12/flutter-ui-ambient-computing.html?m=1
[Flutter Favorite program]: /packages-and-plugins/favorites
[Flutter 1.12.13]: /release/release-notes/release-notes-1.12.13
[Flutter Gallery]: {{site.gallery-archive}}
[Flutter Layout Explorer]: /tools/devtools/legacy-inspector#flutter-layout-explorer
[Flutter Medium publication]: {{site.medium}}/flutter
[Migrating your plugin to the new Android APIs]: /release/breaking-changes/plugin-api-migration
[Web support for Flutter goes beta]: {{site.flutter-blog}}/web-support-for-flutter-goes-beta-35b64a1217c0
[Get started]: /install

## 2019 年 9 月 10 日：1.9 版發佈

Flutter 1.9 已經上線！

更多資訊請參閱 [Flutter 來自 GDD China 的消息：
在 Web 和行動裝置上統一 Flutter，並介紹 Flutter 1.9][Flutter news from GDD China: uniting Flutter on web and mobile, and introducing Flutter 1.9]
及 [1.9.1 發佈說明][1.9.1 release notes]。

對於 1.9 版本，Flutter 的 Web 支援已合併（「unforked」）至主倉庫。
**Web 支援尚未達到 beta，尚不適合在生產環境中使用。**
Web 和桌面支援（也即將推出）將
影響網站內容，原本網站是專門為
開發 Flutter 行動應用程式所撰寫的。
部分網站更新現已提供（如下所列），
但仍有更多即將推出。

網站上的新增與更新文件包括：

* 我們已改版了 [Showcase][] 頁面。
* Flutter 版面配置 codelab 已重寫，並
  使用更新後的 DartPad，這個基於瀏覽器的 Dart 程式碼執行工具現已支援 Flutter！
  [試試看]({{site.dartpad}}) 並告訴我們你的想法。
* 新增了關於[使用 dart:ffi 程式庫][using the dart:ffi library] 將應用程式綁定至原生程式碼的頁面
  （此功能目前正在開發中）。
* Performance 檢視工具已在 DevTools 中啟用，允許你
  記錄並分析 Dart/Flutter 應用程式的工作階段。更多資訊請參閱
  [Performance 檢視][Performance view] 頁面。
* 新增了關於[建置 Web 應用程式][building a web application] 的頁面。
* 新增了關於在 Flutter 中[建立響應式應用程式][creating responsive apps] 的頁面。
* 新增了關於[為 Web 應用程式準備發佈][preparing a web app for release] 的頁面。
* 新增了 [Web FAQ][web FAQ] 頁面。
* 更新了 [Flutter for Web][Flutter for web] 頁面。

其他相關文件：

* SDK 1.9 改善了錯誤訊息。
  更多資訊請閱讀
  [Flutter Medium 刊物][Flutter Medium publication] 上的
  [改善 Flutter 的錯誤訊息][Improving Flutter's Error Messages]。
* 若你已有依賴 flutter_web 套件的 Web 應用程式，
  以下說明告訴你如何遷移至 flutter 套件：
  從 package:flutter_web 升級至 Flutter SDK。
* 新的 [`ToggleButtons`][] 元件，在 API 文件中有說明。
  [ToggleButtons 示範][ToggleButtons demo]
* 新的 [`ColorFiltered`][] 元件，同樣在 API 文件中有說明。
  [ColorFiltered 示範][ColorFiltered demo]
* [`SelectableText`][] 元件的新行為。

祝 Flutter 使用愉快！

[1.9.1 release notes]: /release/release-notes/release-notes-1.9.1
[building a web application]: /platform-integration/web/building
[`ColorFiltered`]: {{site.api}}/flutter/widgets/ColorFiltered-class.html
[ColorFiltered demo]: {{site.github}}/csells/flutter_color_filter
[creating responsive apps]: /ui/adaptive-responsive
[Flutter for web]: /platform-integration/web
[Flutter news from GDD China: uniting Flutter on web and mobile, and introducing Flutter 1.9]: {{site.google-blog}}/2019/09/flutter-news-from-gdd-china-flutter1.9.html?m=1
[Improving Flutter's Error Messages]: {{site.flutter-blog}}/improving-flutters-error-messages-e098513cecf9
[Performance view]: /tools/devtools/performance
[preparing a web app for release]: /deployment/web
[`SelectableText`]: {{site.api}}/flutter/material/SelectableText-class.html
[Showcase]: {{site.main-url}}/showcase
[`ToggleButtons`]: {{site.api}}/flutter/material/ToggleButtons-class.html
[ToggleButtons demo]: {{site.github}}/csells/flutter_toggle_buttons
[using the dart:ffi library]: /platform-integration/legacy-ffi-plugin

## 2019 年 7 月 9 日：1.7 版發佈

Flutter 1.7 已經上線！

更多資訊請參閱 [Flutter Medium 刊物][Flutter Medium Publication] 上的
[宣布 Flutter 1.7][Announcing Flutter 1.7]，
及 [1.7.8 發佈說明][1.7.8 release notes]。

網站上的新增與更新文件包括：

* [為 Android 應用程式準備發佈][Preparing an Android app for release]
  頁面已更新，說明如何使用應用程式套件建置 Android 發佈版本，
  以及如何為 32 位元和 64 位元裝置分別建立 APK 檔案。
* [DevTools][] 文件已遷移至 flutter.dev。
  若你尚未試用這套以瀏覽器為基礎的除錯、效能、記憶體和檢查工具套件，
  可與 Flutter 和 Dart 應用程式搭配使用，並可從
  Android Studio/IntelliJ _以及_ VS Code 啟動，請務必試試！
* [簡單的應用程式狀態管理][Simple app state management] 頁面已更新。
  頁面中的範例程式碼現在使用 Provider 套件的 3.0 版本。
* 新增了動畫教學 [為頁面路由轉場製作動畫][Animate a page route transition]
  至 Flutter Cookbook。
* [除錯][Debugging]、[Flutter 的建置模式][Flutter's build modes]、
  [效能最佳實踐][Performance best practices] 及 [效能分析][Performance profiling]
  頁面已更新以反映 DevTools。
  另外也新增了[以程式方式除錯應用程式][Debugging apps programmatically] 頁面。

Flutter 1.7 版本包含了新的 [`RangeSlider`][] 元件，
讓使用者可以在值的範圍中選擇上限和下限。
關於此元件及其自訂方式，請參閱
[Flutter 中的 Material RangeSlider][Material RangeSlider in Flutter]。

[1.7.8 release notes]: /release/release-notes/release-notes-1.7.8
[Animate a page route transition]: /cookbook/animation/page-route-animation
[Announcing Flutter 1.7]: {{site.flutter-blog}}/announcing-flutter-1-7-9cab4f34eacf
[Debugging]: /testing/debugging
[Debugging apps programmatically]: /testing/code-debugging
[Flutter's build modes]: /testing/build-modes
[Material RangeSlider in Flutter]: {{site.flutter-blog}}/material-range-slider-in-flutter-a285c6e3447d
[Performance best practices]: /perf/best-practices
[Performance profiling]: /perf/ui-performance
[Preparing an Android app for release]: /deployment/android
[`RangeSlider`]: {{site.api}}/flutter/material/RangeSlider-class.html
[Simple app state management]: /data-and-backend/state-mgmt/simple

## 2019 年 5 月 7 日：Google I/O 2019：1.5 版發佈

[Flutter 1.5][] 已經上線！

關於更新的更多資訊，請參閱 [1.5.4 發佈說明][1.5.4 release notes]
或[下載此版本][download the release]。

我們正在更新 DartPad 以支援 Flutter。試試新的
Flutter 基礎版面配置 codelab 並告訴我們你的想法！

[download the release]: /install/archive
[Flutter 1.5]: {{site.google-blog}}/2019/05/Flutter-io19.html
[1.5.4 release notes]: /release/release-notes/release-notes-1.5.4

## 2019 年 2 月 26 日：1.2 版發佈

Flutter 在巴塞隆納的 Mobile World Congress（MWC）發佈了 [1.2 版][version 1.2]。更多資訊請參閱
[1.2.1 發佈說明][1.2.1 release notes] 或 [下載此版本][download the release]。

此外，以下是近期的新增與更新文件：

* 我們更新了[狀態管理建議][state management advice]。
  新頁面包括[簡介][introduction]、
  [宣告式思考][thinking declaratively]、[短暫狀態與應用程式狀態][ephemeral vs app state]、
  [簡單的應用程式狀態管理][simple app state management] 及
  [不同的狀態管理選項][different state management options]。
  記錄狀態管理是件棘手的事，因為沒有一種方法能適用所有情況。我們很樂意聽取你對這些新文件的意見！
* 新增了關於[效能最佳實踐][Performance best practices] 的頁面。
* 同樣在 MWC，我們發佈了新 Dart DevTools 的預覽版本，
  用於分析和除錯 Dart 及 Flutter 應用程式。
  你可以在 DevTools wiki 上找到相關文件
  （注意：現已移至[本網站][this site]。）
  特別是，你可以使用 DevTools 的[元件檢查器][widget inspector] 除錯 UI，
  或使用[時間軸檢視][timeline view] 分析 Flutter 應用程式的效能。試試看並告訴我們你的想法！
* 更新了[效能分析][Performance profiling] 頁面，
  融入了新的 Dart DevTools UI。
* 更新了 [Android Studio/IntelliJ][]
  及 [VS Code][] 頁面，融入了
  新的 Dart DevTools UI 相關資訊。

若你對上述任何文件有問題或意見，
請[提出 issue][file-issue]。

[Android Studio/IntelliJ]: /tools/android-studio
[different state management options]: /data-and-backend/state-mgmt/options
[ephemeral vs app state]: /data-and-backend/state-mgmt/ephemeral-vs-app
[file-issue]: {{site.repo.this}}/issues
[introduction]: /data-and-backend/state-mgmt/intro
[1.2.1 release notes]: /release/release-notes/release-notes-1.2.1
[state management advice]: /data-and-backend/state-mgmt/intro
[thinking declaratively]: /data-and-backend/state-mgmt/declarative
[this site]: /tools/devtools
[timeline view]: /tools/devtools/performance
[VS Code]: /tools/vs-code
[widget inspector]: /tools/devtools/inspector

[version 1.2]: {{site.google-blog}}/2019/02/launching-flutter-12-at-mobile-world.html

## 2018 年 11 月 5 日：全新網站

歡迎來到全新改版的 Flutter 網站！

我們花了幾個月重新設計網站及其資訊組織方式。希望你能更輕鬆地找到
所需的文件。網站的部分變更包括：

* 修訂後的[首頁][front]
* 修訂後的 [showcase][] 頁面
* 修訂後的[社群][community] 頁面
* 修訂後的左側欄導覽
* 大多數頁面右側的目錄

部分新內容包括：

* 深入探討 Flutter 內部機制，[Flutter 內部][Inside Flutter]
* [技術影片][Technical videos]
* [狀態管理][State management]
* [背景 Dart 程式][Background Dart processes]
* [Flutter 的建置模式][Flutter's build modes]
{% comment %}
* How to connect
  [a native debugger _and_ a Dart debugger to your app]
  (not yet complete)
{% endcomment %}

若你對改版後的網站有問題或意見，
請[提出 issue][file an issue]。

[a native debugger _and_ a Dart debugger to your app]: /testing/oem-debuggers
[Background Dart processes]: /packages-and-plugins/background-processes
[community]: {{site.main-url}}/community
[file an issue]: {{site.repo.this}}/issues
[front]: /
[Inside Flutter]: /resources/inside-flutter
[State management]: /data-and-backend/state-mgmt
[Technical videos]: /resources/videos
[Flutter's build modes]: /testing/build-modes
[Flutter Favorite Program]: /packages-and-plugins/favorites
[file-issue]: {{site.github}}/flutter/website/issues/new/choose
[Impeller]: /perf/impeller
[Flutter Medium]: {{site.medium}}/flutter
[Flutter Medium Publication]: {{site.medium}}/flutter
[Desktop]: /platform-integration/desktop
[Performance best practices]: /perf/best-practices
[Customizing web app initialization]: /platform-integration/web/initialization
[Flutter codelabs]: /reference/learning-resources
[simple app state management]: /data-and-backend/state-mgmt/simple
[web FAQ]: /platform-integration/web/faq
[building a web application]: /platform-integration/web/building
[Desktop support for Flutter]: /platform-integration/desktop
[Flutter Favorite program]: /packages-and-plugins/favorites
