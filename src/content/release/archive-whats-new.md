---
title: What's new 歷史存檔
description: >-
  docs.flutter.dev 及相關文件網站過去 What's new 更新列表。
---

本頁收錄了 Flutter 官方網站及部落格的 What's new 歷史公告。
若需最新版本資訊，請參閱[目前的 What's new]⟦L406⟧頁面。
[Dart 3.7 release]: {{site.medium}}/dartlang/announcing-dart-3-7-bf864a1b195c

## 2025 年 2 月 12 日：3.29 版發佈

Flutter 3.29 已經上線！更多資訊請參閱 [Flutter 3.29 技術部落格文章]⟦L407⟧。
你也可以參考 [Dart 3.7 發佈]⟦L408⟧部落格文章。
[Flutter for Jetpack Compose devs]: /get-started/flutter-for/compose-devs
[Test orientation]: /cookbook/testing/widget/orientation

**自 3.27 版以來更新或新增的文件**

* 隨著 Flutter 持續演進，其內部架構也有所調整。
  [架構總覽頁面]⟦L409⟧已更新。

* 如果你來自 Android 開發且熟悉 Jetpack Compose，請參閱
  [Flutter for Jetpack Compose devs]⟦L410⟧。

* 新增一則 cookbook 教學，介紹如何測試元件的方向，[測試方向]⟦L411⟧。

* 另外，別忘了查看本次發佈的[重大變更]⟦L412⟧頁面，裡面也有實用的遷移資訊。

[3.27-umbrella]: {{site.medium}}/flutter/flutter-in-production-f9418261d8e1
[3.27-tech]: {{site.medium}}/flutter/whats-new-in-flutter-3-27-28341129570c
[Dart 3.6 release]: {{site.medium}}/dartlang/announcing-dart-3-6-778dd7a80983

[ad-bp]: {{site.medium}}/flutter/video-web-ad-support-in-flutter-f50e5a3480a8
[app-authors]: /packages-and-plugins/swift-package-manager/for-app-developers

---

## 2024 年 12 月 11 日：3.27 版發佈

Flutter 3.27 已經上線！更多資訊請參閱 [Flutter 3.27 總覽部落格文章]⟦L413⟧
及 [Flutter 3.27 技術部落格文章]⟦L414⟧。
你也可以參考 [Dart 3.6 發佈]⟦L415⟧部落格文章。
[Architecting Flutter apps]: /app-architecture
[bc-3.27]: /release/breaking-changes#released-in-flutter-3-27
[Can I use Impeller?]: {{site.main-url}}/go/can-i-use-impeller

**自 3.24 版以來更新或新增的文件**

本次網站發佈包含多項重要更新！

* Flutter AI Toolkit 正式推出！你可以在網站側邊導覽選單
  **App solutions > AI** 下方，或於 [Flutter AI Toolkit]⟦L416⟧找到相關文件。

* 長久以來，我們收到許多開發大型、複雜 Flutter 應用程式的開發者
  希望有更多指引。這項工作已經啟動：
  推出 [Architecting Flutter apps]⟦L417⟧！
  這個區塊包含八個全新頁面，介紹 Flutter 應用程式架構設計，
  其中 [設計模式]⟦L418⟧頁面收錄六種常見設計模式的實作食譜，供你參考。

* 新增更多關於 [WebAssembly (Wasm) 支援]⟦L419⟧的資訊。

* [Web renderers]⟦L420⟧頁面經過重構，涵蓋 Web 的兩種建置模式及其兩種渲染器。

* Impeller 現已成為 iOS 與 Android 的預設渲染引擎。我們也在
  Impeller 頁面新增連結，指向詳細的 [Can I use Impeller?]⟦L421⟧頁面。

* 有興趣變現的開發者，我們推出了全新 [Interactive Media Ads]⟦L422⟧ 套件。
  你可以在網站側邊導覽選單
  **App solutions > Monetization > Advertising** 下方找到。
  另外，請參閱 [Flutter 的影片與網頁應用支援]⟦L423⟧部落格文章。

* 新增 Flutter 與 Android 整合的相關文件，特別是
  [從 Flutter 應用程式啟動 Jetpack Compose activity]⟦L424⟧
  及 [呼叫 JetPack API]⟦L425⟧。

* [學習基礎知識]⟦L426⟧頁面（前稱 First Week Experience）持續更新中。
  除了多個頁面更新，也新增了 [Dart 入門]⟦L427⟧頁面。

* Swift Package Manager 支援與文件進一步更新。
  你現在可以在 stable channel 上針對 SPM 進行建置，
  但插件仍會透過 CocoaPods 安裝，因為 SwiftPM 功能
  在 stable channel 尚未開放：
  [插件作者的 Swift Package Manager 指南]⟦L428⟧ 與
  [應用程式作者的 Swift Package Manager 指南]⟦L429⟧。

* [深度連結驗證工具]⟦L430⟧（DevTools 的一部分）現已支援 iOS 與 Android。

* 另外，別忘了查看本次發佈的[重大變更]⟦L431⟧頁面，裡面也有實用的遷移資訊。
[deep-linking-tool]: /tools/devtools/deep-links
[design patterns]: /app-architecture/design-patterns
[Flutter AI Toolkit]: /ai-toolkit
[fwe]: /get-started/fundamentals
[Interactive Media Ads]: {{site.pub-pkg}}/interactive_media_ads
[jc]: /platform-integration/android/compose-activity
[jetpack-api]: /platform-integration/android/call-jetpack-apis
[Intro to Dart]: /get-started/fundamentals/dart
[plugin-authors]: /packages-and-plugins/swift-package-manager/for-plugin-authors
[Support for WebAssembly (Wasm)]: /platform-integration/web/wasm
[web renderers]: /platform-integration/web/renderers

[3.24-tech]: {{site.flutter-medium}}/whats-new-in-flutter-3-24-6c040f87d1e4
[3.24-umbrella]: {{site.flutter-medium}}/flutter-3-24-dart-3-5-204b7d20c45d
[Dart 3.5 release]: {{site.medium}}/dartlang/dart-3-5-6ca36259fa2f

[`CarouselView`]: {{site.api}}/flutter/material/CarouselView-class.html
[Cupertino catalog]: /ui/widgets/cupertino

---

## 2024 年 8 月 7 日：I/O Connect 北京 3.24 版發佈

Flutter 3.24 已經上線！更多資訊請參閱 [Flutter 3.24 總覽部落格文章]⟦L432⟧
及 [Flutter 3.24 技術部落格文章]⟦L433⟧。
你也可以參考 [Dart 3.5 發佈]⟦L434⟧部落格文章。
[DevTools 2.35.0]: /tools/devtools/release-notes/release-notes-2.35.0
[DevTools 2.36.0]: /tools/devtools/release-notes/release-notes-2.36.0
[DevTools 2.37.2]: /tools/devtools/release-notes/release-notes-2.37.2

**自 3.22 版以來更新或新增的文件**

本次網站發佈包含多項重要更新！

* 元件目錄更新：
  * [Cupertino 目錄]⟦L435⟧新增 37 個缺漏的元件，並為更新後的 `CupertinoActionSheet` 元件加入新截圖。
  * 新增 [`CarouselView`]⟦L436⟧ 元件。
  * `CupertinoButton` 與 `CupertinoTextField` 也有行為更新。
* 新增指南，說明如何將 Swift Package Manager 支援加入
  [iOS 插件]⟦L437⟧與[iOS 應用程式]⟦L438⟧。（注意：在所有相依套件完成遷移前，Flutter 仍會使用 CocoaPods。）
* Web 文件更新：
  * [在網頁嵌入 Flutter]⟦L439⟧，包含如何啟用多視窗模式
  * [將網頁內容嵌入 Flutter 應用程式]⟦L440⟧
* Android 14 更新：
  若你使用 Android 14 裝置，現在可以支援 Android 的 [預測返回手勢]⟦L441⟧。
* iOS 18 更新：
  iOS 18 發佈時仍為 beta。這些 iOS 18 功能已在 Flutter 啟用，並於文件中說明：
  * 在 Flutter 應用中使用 [iOS app extension]⟦L442⟧ 建立自訂切換開關。使用者可在自訂控制中心時加入你的 app 切換開關。
  * 支援 [Tinted app icons]⟦L443⟧
* [Flutter 基礎知識文件]⟦L444⟧有兩頁更新：
  * [元件]⟦L445⟧
  * [版面配置]⟦L446⟧
  希望這些頁面對新手 Flutter 開發者有所幫助。
* DevTools 也有更新。請參閱 [DevTools 2.35.0]⟦L447⟧、[DevTools 2.36.0]⟦L448⟧ 與 [DevTools 2.37.2]⟦L449⟧ 發佈說明。
[Embedding Flutter on the web]: /platform-integration/web/embedding-flutter-web
[Embedding web content into a Flutter app]: /platform-integration/web/web-content-in-flutter
[Flutter fundamentals docs]: /get-started/fundamentals
[Widgets]: /get-started/fundamentals/widgets
[iOS app extension]: /platform-integration/ios/app-extensions
[iOS plugins]: /packages-and-plugins/swift-package-manager/for-plugin-authors
[iOS apps]: /packages-and-plugins/swift-package-manager/for-app-developers
[Layout]: /get-started/fundamentals/layout
[predictive back gesture]: /platform-integration/android/predictive-back
[Tinted app icons]: /deployment/ios#add-an-app-icon

[Flutter GPU blog post]: {{site.flutter-medium}}/getting-started-with-flutter-gpu-f33d497b7c11

[3.22-tech]: {{site.flutter-medium}}/whats-new-in-flutter-3-22-fbde6c164fe3
[3.22-umbrella]: {{site.flutter-medium}}/io24-5e211f708a37
[Dart 3.4 release]: {{site.medium}}/dartlang/dart-3-4-bd8d23b4462a
[dart.dev/go/macros]: http://dart.dev/go/macros

⟦L831⟧其他⟦L832⟧

* 若你對新的實驗性 Flutter GPU API 有興趣，請參閱 [Flutter GPU 部落格文章]⟦L450⟧。
* Flutter wiki 已拆分並移動到相關 GitHub 倉庫，讓資訊更容易維護與更新。

[Adaptive and Responsive design]: /ui/adaptive-responsive

---

## 2024 年 5 月 14 日：Google I/O 3.22 版發佈

Flutter 3.22 已經上線！更多資訊請參閱 [Flutter 3.22 總覽部落格文章]⟦L451⟧
及 [Flutter 3.22 技術部落格文章]⟦L452⟧。

你也可以參考 [Dart 3.4 發佈]⟦L453⟧部落格文章。
特別是 Dart 現在內建了一個語言 macro，`JsonCodable`，可用於 JSON 資料序列化與反序列化。
未來（尚未指定時程）的 Dart 發佈將允許你自訂 macro。
想了解更多，請參閱 [dart.dev/go/macros]⟦L454⟧。
[Casual Games Toolkit]: /resources/games-toolkit
[Flutter fundamentals docs]: /get-started/fundamentals
[Flutter install]: /get-started
[Flutter web app initialization]: /platform-integration/web/initialization

**自 3.19 版以來更新或新增的文件**

* 新增 7 頁[自適應與響應式設計]⟦L455⟧專區。
  （這取代了先前較為分散的相關文件。）
* 若你是剛完成第一個 Flutter codelab 的新手開發者，我們新增了「下一步建議」，
  幫助你持續進階。請參閱 [Flutter 基礎知識文件]⟦L456⟧。
* [Flutter 安裝]⟦L457⟧文件已全面改版。
* 新增三個 codelab 及一份 Games Toolkit 新指南。
  相關新增內容請參閱更新後的 [Casual Games Toolkit]⟦L458⟧頁面。
* Flutter 對 Web Assembly (Wasm) 的支援已進入穩定版。
  詳情請參閱更新後的 [WebAssembly (Wasm) 支援]⟦L459⟧頁面。
* DevTools 新增 Android 深度連結評估畫面。
  詳情請參閱新頁面 [驗證深度連結]⟦L460⟧。
* 新增說明 Flutter SDK 3.22 及以後版本 Web 啟動流程的頁面。
  請參閱 [Flutter 網頁應用初始化]⟦L461⟧。
* 你現在可以在執行時提供程式碼，將資源轉換為其他格式。
  詳情請參閱 [建置時轉換資源]⟦L462⟧。

**網站基礎架構**

* 若你有貢獻網站，可能已注意到近期有些變動。網站基礎架構已更新，新的工作流程更簡單。
  詳情請參閱 [網站 README]⟦L463⟧。
* 你可能也注意到側邊選單的 **App solutions**
  子選單現在有 **AI** 區塊，以及加強的 **Monetization** 區塊，這只是部分變動。
[website README]: {{site.github}}/flutter/website/?tab=readme-ov-file#flutter-documentation-website
[Support for WebAssembly (Wasm)]: /platform-integration/web/wasm
[Transforming assets at build time]: /ui/assets/asset-transformation
[Validate deep links]: /tools/devtools/deep-links

[3.19-tech]: {{site.flutter-medium}}/whats-new-in-flutter-3-19-58b1aae242d2
[3.19-umbrella]: {{site.flutter-medium}}/starting-2024-strong-with-flutter-and-dart-cae9845264fe
[Dart 3.3 release]: {{site.medium}}/dartlang/new-in-dart-3-3-extension-types-javascript-interop-and-more-325bf2bf6c13

[@TahaTesser]: {{site.github}}/TahaTesser
[Concurrency and isolates]: /perf/isolates

## 2024 年 2 月 15 日：情人節前夕 3.19 版發佈

Flutter 3.19 已經上線！更多資訊請參閱 [Flutter 3.19 總覽部落格文章]⟦L464⟧
及 [Flutter 3.19 技術部落格文章]⟦L465⟧。

你也可以參考 [Dart 3.3 發佈]⟦L466⟧部落格文章。
[Flutter install]: /get-started
[let us know]: {{site.github}}/flutter/website/issues/new/choose
[migrating from Material 2 to Material 3]: /release/breaking-changes/material-3-migration

**自 3.16 版以來更新或新增的文件**

* 新增 [從 Material 2 遷移到 Material 3]⟦L467⟧頁面。感謝 [@TahaTesser]⟦L468⟧ 撰寫本指南。
* Material 3 在主題化上與 Material 2 有顯著不同。
  [使用主題共用顏色與字型樣式]⟦L469⟧ cookbook 教學已更新以反映這些改變。
* [Flutter 安裝]⟦L470⟧頁面已更新。歡迎[提供意見]⟦L471⟧。
* [並行與 isolates]⟦L472⟧頁面已重寫。
[Use themes to share colors and font styles]: /cookbook/design/themes

[Flutter and Dart 2024 Roadmap]: {{site.github}}/flutter/flutter/blob/main/docs/roadmap/Roadmap.md
[Harness the Gemini API in your Dart and Flutter apps]: {{site.flutter-medium}}/harness-the-gemini-api-in-your-dart-and-flutter-apps-00573e560381
[current what's new]
[3.29-tech]
[Dart 3.7 release]

**其他更新**

* 請參閱剛發佈的 [Flutter 與 Dart 2024 路線圖]⟦L473⟧。
* 請參閱 [在 Dart 與 Flutter 應用中運用 Gemini API]⟦L474⟧。
[Architectural overview page]
[Flutter for Jetpack Compose devs]

## 2023 年 11 月 15 日：3.16 版發佈

Flutter 3.16 已經上線！更多資訊請參閱 [Flutter 3.16 部落格文章]⟦L475⟧
及技術性 [Flutter 3.16 新功能]⟦L476⟧部落格文章。

你也可以參考 [Dart 3.2 發佈]⟦L477⟧。

**自 3.13 版以來更新或新增的文件**

* 從本版起，**Material Flutter 應用的預設主題為 Material 3**。
  除非你在應用主題中明確指定 Material 2
  （使用 `useMaterial3: false`），
  否則升級後應用的外觀 _會_ 有所不同。
* 雖然 Flutter Casual Games Toolkit 技術上不算 3.16 發佈的一部分，
  但我們同步釋出了一次重大更新。
  本次更新包含三個全新遊戲範本、三個新遊戲 cookbook 教學，
  以及整體文件重組。詳情請參閱 [Casual Games Toolkit]⟦L478⟧，並記得查看側邊選單！
* Impeller 執行時現已
  **在 Vulkan 裝置上的 Android 可用**
  ，需透過 `--enable-impeller` 旗標啟用。
  詳情請參閱
  [Impeller 渲染引擎]
