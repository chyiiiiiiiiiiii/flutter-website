---
title: 文件最新動態
description: >-
  docs.flutter.dev 及相關文件網站的最新動態列表。
---

本頁包含 Flutter 官方網站及部落格的最新公告與近期動態。
過往的最新動態資訊可參見
[what's new archive][what's new archive] 頁面。
你也可以參考
Flutter SDK 的 [release notes][release notes]。

若想即時掌握 Flutter 的公告（包含重大變更），
歡迎加入 [flutter-announce][flutter-announce] Google 群組。

關於 Dart，你可以加入 [Dart Announce][Dart Announce] Google 群組，
並瀏覽 [Dart changelog][Dart changelog]。

[Dart Announce]: {{site.groups}}/a/dartlang.org/g/announce
[Dart changelog]: {{site.github}}/dart-lang/sdk/blob/main/CHANGELOG.md
[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce
[release notes]: /release/release-notes

## 2025 年 8 月 13 日：3.35 版發佈

Flutter 3.35 已經上線！欲了解更多資訊，
請參閱 [Flutter 3.35 技術部落格文章][3.35-tech]。
你也可以參考 [Dart 3.9 版本][Dart 3.9 release] 部落格文章。

[3.35-tech]: {{site.flutter-medium}}/whats-new-in-flutter-3-35-c58ef72e3766
[Dart 3.9 release]: {{site.medium}}/dartlang/announcing-dart-3-9-ba49e8f38298

**自 3.32 版本以來更新或新增的文件**

* 熱重載（Hot reload）現已可在 Web 上使用，且不再需要實驗性旗標。
  詳細資訊請參閱 [hot reload][hot reload]。

* 新增 [Create with AI][Create with AI] 指南，說明如何運用 AI 工具（如 Gemini Code Assist、GeminiCLI 及 Dart 和 Flutter MCP Server）來為你的 Flutter 應用程式打造 AI 驅動的功能。

* 你現在可以參考 [Flutter Widget Previewer][Flutter Widget Previewer] 指南，
  於 Chrome 中預覽你的 Flutter 元件 (Widgets)。

* 每個穩定版本都會影響 Flutter 支援的已部署平台版本。
  詳細資訊請參閱更新後的 [supported platforms][supported platforms] 頁面。

* 在 Android 上，現在可以在螢幕分享時保護敏感內容（如客戶資訊）。
  請參閱 [Protect your app's sensitive content][Protect your app's sensitive content] 以了解更多。

* 另外，別忘了查看本次發佈的 [breaking changes][bc-3.35] 頁面，
  你也能在那裡找到有用的遷移資訊。

[Flutter Widget Previewer]: /tools/widget-previewer
[Create with AI]: /ai/create-with-ai
[bc-3.35]: /release/breaking-changes#released-in-flutter-3-35
[hot reload]: /tools/hot-reload
[Protect your app's sensitive content]: /platform-integration/android/sensitive-content
[supported platforms]: /reference/supported-platforms

---

## 2025 年 5 月 20 日：Google I/O 3.32 版發佈

Flutter 3.32 已經上線！欲了解更多資訊，
請參閱 [Flutter 3.32 技術部落格文章][3.32-tech]。
你也可以參考 [Dart 3.8 版本][Dart 3.8 release] 部落格文章。

[3.32-tech]: {{site.medium}}/flutter/whats-new-in-flutter-3-32-40c1086bab6e
[Dart 3.8 release]: {{site.medium}}/dartlang/announcing-dart-3-8-724eaaec9f47

**網站更新**

首先，網站已在幕後進行重構。
這些變更已逐步釋出，你或許已經注意到：

* 現已支援深色模式（Dark mode）
* 你現在可以對網站上的每個頁面按讚或倒讚
* 側邊導覽列（sidenav）已更新，期望能更容易找到內容
* 網站的無障礙性已提升
* 檔案結構有調整（我們都會提供重新導向）

**自 3.29 版本以來更新或新增的文件**

* 更新的 [Flutter on iOS][Flutter on iOS] 頁面。
* 新增 [在各開發平台安裝 Flutter 的工作流程][workflow for installing Flutter] 指南。
  此內容仍在持續完善中，敬請期待。
* 新增如何使用 DevTools 新功能
  [Flutter Property Editor][Flutter Property Editor] 的頁面。
  [VS Code][VS Code] 及 [Android Studio/IntelliJ][Android Studio/IntelliJ]
  的相關說明也已更新。
* 網站已更新，說明如何在 Web 上
  [以旗標啟用 hot reload][use hot reload on web]。
  本次發佈中，Web 上的 hot reload 屬於實驗性功能。
* 新增 [新增 iOS 應用程式擴充功能][adding iOS app extensions] 頁面。
* 全新改寫的
  [設定 iOS 與 macOS Flutter flavors][setting up Flutter flavors for iOS and macOS] 頁面。
* 新增 [設定 Android Flutter flavors][setting up Flutter flavors for Android] 頁面。
* Cupertino 指南已更新
  [在清單上方放置浮動應用程式列（App bar）][floating-app-bar]
  的 cookbook 教學。
* 你現在可以
  [透過 SemanticRoles 提升應用程式的無障礙性][semantic-roles]。
* 另外，別忘了查看本次發佈的 [breaking changes][bc-3.32] 頁面，
  你也能在那裡找到有用的遷移資訊。

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

過往版本請參閱
[What's new archive][What's new archive] 頁面。

[What's new archive]: /release/archive-whats-new

