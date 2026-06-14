---
title: 文件最新動態
description: >-
  docs.flutter.dev 及相關文件網站的最新內容列表。
---

本頁列出 Flutter 網站與部落格的最新及近期公告。
過去的最新動態資訊請參閱
[最新動態彙整][what's new archive]頁面。
您也可以查閱
Flutter SDK [發行說明][release notes]。

若要掌握 Flutter 公告（包含破壞性變更），
請加入 [flutter-announce][] Google 群組。

Dart 方面，您可以加入 [Dart Announce][] Google 群組，
並查閱 [Dart 變更記錄][Dart changelog]。

[Dart Announce]: {{site.groups}}/a/dartlang.org/g/announce
[Dart changelog]: {{site.github}}/dart-lang/sdk/blob/main/CHANGELOG.md
[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce
[release notes]: /release/release-notes

## 2026 年 5 月 18 日：Google I/O 發行 3.44

Flutter 3.44 正式上線！本次發行內容相當豐富。
詳情請參閱 [Flutter 3.44 部落格文章][3.44-blog-post]，
並[觀看影片][3.44-whats-new]：

<div class="video-wrapper">
<span class="video-intro">探索 Dart 與 Flutter 的最新動態</span>
<YouTubeEmbed id="I1uIbGh1dGE" title="What's New in Dart and Flutter 3.44" fullWidth></YouTubeEmbed>
</div>

[3.44-blog-post]: {{site.flutter-blog}}/whats-new-in-flutter-3-44-b0cc1ad3c527
[3.44-whats-new]: https://www.youtube.com/watch?v=I1uIbGh1dGE&t=451s

更多網站更新內容即將公布。

## 2026 年 2 月 11 日：「火馬年」發行 3.41

Flutter 3.41 正式上線！詳情請參閱
[Flutter 3.41 部落格文章][3.41-blog-post]。

[3.41-blog-post]: {{site.flutter-blog}}/whats-new-in-flutter-3-41-302ec140e632


**自 3.38 發行後更新或新增的文件**

除了許多較小幅度的更新外，以下是一些較重要的變更：

* 我們引入了全新的入門體驗，適用於
  Flutter 和 Dart，已於近期[部落格文章][few]中宣布。
  您可以在 [docs.flutter.dev][] 頂部的 **Learn**
  索引標籤下找到 Flutter [學習路徑][learning pathway]。若要返回網站其他部分，
  請選擇 **Guides** 索引標籤。一如既往，**Reference**
  索引標籤會帶您前往 [Flutter API 文件][Flutter API docs]。

* Flutter 和 Dart 現在擁有[官方詞彙表][official glossary]。
  作為近期網站遷移至 Jaspr 的一部分，
  詞彙表已新增至 Flutter 網站。
  預計隨著時間推移，內容將持續擴充。

* 如往常一樣，請查閱本次發行的[破壞性變更][bc-3-41]頁面，
  其中包含遷移指南連結及其他重要資訊。
  特別感謝 [navaronbracke][]，他撰寫了
  [`onReorder` 回呼（callback）棄用][onReorder]的遷移指南。

[bc-3-41]: /release/breaking-changes#released-in-flutter-3-41
[docs.flutter.dev]: /
[Flutter API docs]: {{site.api}}
[few]: {{site.flutter-blog}}/announcing-our-new-dart-and-flutter-getting-started-experience-b8c4b2be0984
[learning pathway]: /learn
[navaronbracke]: {{site.github}}/navaronbracke
[official glossary]: /resources/glossary
[onReorder]: /release/breaking-changes/separated-builder-find-child-index-callback

---

## 2025 年 11 月 12 日：發行 3.38

Flutter 3.38 正式上線！詳情請參閱
[Flutter 3.38 技術部落格文章][3.38-tech]。

[3.38-tech]: {{site.flutter-blog}}/whats-new-in-flutter-3-38-3f7b258f7228

**網站更新**

網站近期已完成一次重大更新！
如同今年稍早 dart.dev 網站的更新，
docs.flutter.dev 網站已重新以 [Jaspr][]（一個 Dart 網頁框架）實作。

歡迎告訴我們您的想法！

[Jaspr]: https://jaspr.site/

**自 3.35 發行後更新或新增的文件**

* Dart 語言現在支援「_點簡寫（dot shorthands）_」語法
  （又稱 _shorthands_），讓您可以撰寫更
  簡潔的程式碼。詳情請造訪
  dart.dev 上的 [Dart 點簡寫][Dart dot shorthands]頁面。隨著時間推移，
  本網站上的範例將陸續更新，
  以善用這項新功能。

* `flutter run` 指令現在支援設定檔，
  讓您可以指定網頁設定，例如主機、連接埠、
  憑證及標頭。
  網頁開發設定檔也支援代理設定，
  可將特定路徑請求轉送至另一台伺服器。這讓開發連接至同一主機上動態端點的
  網頁客戶端變得更加容易。
  詳情請造訪
  [設定網頁開發設定檔][web-config-file]。

* 元件 (Widget) 預覽工具的開發持續進行，
  該工具於 3.35 發行版本中作為實驗性功能推出。
  本次發行，預覽工具更好地整合了 VS Code
  和 IntelliJ IDE（包含 Android Studio）。
  目前仍屬實驗性功能。
  如需最新版本的詳細資訊，
  請查閱[元件 (Widget) 預覽工具頁面][Widget Previewer tool page]。

* Flutter 3.38 版本完整支援
  iOS 26、Xcode 26 和 macOS 26 的平台發行，這些版本均於九月發布。
  如需 Flutter 對 iOS 支援的最新資訊，
  請造訪 [Flutter 在最新 iOS 上][Flutter on latest iOS]。

* Flutter 3.38 支援 Apple 強制要求的新 [UIScene 生命週期][UIScene lifecycle]。
  為支援此功能，需要進行程式碼遷移。
  詳情請造訪 [UIScene 遷移指南][UIScene migration guide]。

* 著眼於改善 Flutter 的無障礙功能，
  [無障礙文件][accessibility docs]也已全面重新整理。

* 另外，別忘了查閱本次發行的[破壞性變更][bc-3.38]
  頁面，在那裡您可以找到破壞性變更、程式碼棄用及遷移指南的相關資訊。

其他相關資源：

* [3.38 發行說明與變更記錄][3.38 release notes and changelog]
* [DevTools 2.51.1 發行說明][DevTools 2.51.1 release notes]
* [Dart 3.10 發行][Dart 3.10 release]部落格文章

[3.38 release notes and changelog]: /release/release-notes/release-notes-3.38.0
[accessibility docs]: /ui/accessibility
[bc-3.38]: /release/breaking-changes#released-in-flutter-3-38
[Dart 3.10 release]: https://blog.dart.dev/announcing-dart-3-10-ea8b952b6088
[Dart dot shorthands]: {{site.dart-site}}/language/dot-shorthands
[DevTools 2.51.1 release notes]: /tools/devtools/release-notes/release-notes-2.51.1
[Flutter on latest iOS]: /platform-integration/ios/ios-latest
[UIScene lifecycle]: {{site.apple-dev}}/documentation/technotes/tn3187-migrating-to-the-uikit-scene-based-life-cycle
[UIScene migration guide]: /release/breaking-changes/uiscenedelegate
[Widget Previewer tool page]: /tools/widget-previewer
[web-config-file]: /platform-integration/web/web-dev-config-file

--- 

## 2025 年 8 月 13 日：發行 3.35

Flutter 3.35 正式上線！詳情請參閱
[Flutter 3.35 技術部落格文章][3.35-tech]。
您也可以查閱 [Dart 3.9 發行][Dart 3.9 release]部落格文章。

[3.35-tech]: {{site.flutter-blog}}/whats-new-in-flutter-3-35-c58ef72e3766
[Dart 3.9 release]: {{site.medium}}/dartlang/announcing-dart-3-9-ba49e8f38298

**自 3.32 發行後更新或新增的文件**

* 熱重載現已在網頁平台上可用，不再
  需要實驗性旗標。詳情請查閱
  [熱重載][hot reload]。

* 新增了[使用 AI 建立][Create with AI]指南，涵蓋
  如何善用 Gemini Code Assist、
  GeminiCLI 及 Dart 和 Flutter MCP Server 等 AI 工具，
  為您的 Flutter 應用程式建置 AI 驅動的功能。

* 您現在可以使用 [Flutter 元件 (Widget) 預覽工具][Flutter Widget Previewer]指南，
  在 Chrome 中預覽您的 Flutter 元件。

* 每次穩定版（stable）發行都會影響
  Flutter 支援的已部署平台版本。
  詳情請造訪更新後的
  [支援的平台][supported platforms]頁面。

* 在 Android 上，您現在可以在分享螢幕時
  保護敏感內容，例如客戶資訊。
  請造訪[保護應用程式的敏感內容][Protect your app's sensitive content]以了解更多。

* 另外，別忘了查閱本次發行的[破壞性變更][bc-3.35]
  頁面，那裡同樣有實用的遷移資訊。

[Flutter Widget Previewer]: /tools/widget-previewer
[Create with AI]: /ai/create-with-ai
[bc-3.35]: /release/breaking-changes#released-in-flutter-3-35
[hot reload]: /tools/hot-reload
[Protect your app's sensitive content]: /platform-integration/android/sensitive-content
[supported platforms]: /reference/supported-platforms

---

如需過去的發行資訊，請查閱
[最新動態彙整][What's new archive]頁面。

[What's new archive]: /release/archive-whats-new
