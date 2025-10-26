---
title: 文件最新動態
description: >-
  docs.flutter.dev 及相關文件網站的最新動態列表。
---

本頁列出了 Flutter 官方網站及部落格的最新公告。
過往的最新動態可參考
[what's new archive][what's new archive] 頁面。
你也可以查看 Flutter SDK 的
[release notes][release notes]。

若想隨時掌握 Flutter 的公告（包括重大變更），
歡迎加入 [flutter-announce][flutter-announce] Google 群組。

關於 Dart，你可以加入 [Dart Announce][Dart Announce] Google 群組，
並查閱 [Dart changelog][Dart changelog]。

[Dart Announce]: {{site.groups}}/a/dartlang.org/g/announce
[Dart changelog]: {{site.github}}/dart-lang/sdk/blob/main/CHANGELOG.md
[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce
[release notes]: /release/release-notes

## 2025 年 8 月 13 日：3.35 版釋出

Flutter 3.35 已正式上線！欲了解更多資訊，
請參閱 [Flutter 3.35 technical blog post][3.35-tech]。
你也可以參考 [Dart 3.9 release][Dart 3.9 release] 部落格文章。

[3.35-tech]: {{site.flutter-medium}}/whats-new-in-flutter-3-35-c58ef72e3766
[Dart 3.9 release]: {{site.medium}}/dartlang/announcing-dart-3-9-ba49e8f38298

**自 3.32 版以來更新或新增的文件**

* 熱重載（Hot reload）現已可於 Web 使用，且不再需要實驗性旗標。
  詳情請參閱 [hot reload][hot reload]。

* 新增 [Create with AI][Create with AI] 指南，介紹如何運用 AI 工具（如 Gemini Code Assist、GeminiCLI 以及 Dart 和 Flutter MCP Server）來為你的 Flutter 應用程式打造 AI 驅動功能。

* 你現在可以參考 [Flutter Widget Previewer][Flutter Widget Previewer] 指南，
  在 Chrome 中預覽你的 Flutter 元件 (Widgets)。

* 每個穩定版釋出都會影響 Flutter 支援的部署平台版本。
  詳情請參閱更新後的
  [supported platforms][supported platforms] 頁面。

* 在 Android 上，你現在可以在螢幕分享時保護敏感內容（如客戶資訊）。
  進一步了解請參閱 [Protect your app's sensitive content][Protect your app's sensitive content]。

* 另外，別忘了查看本次釋出的 [breaking changes][bc-3.35]
  頁面。你也可以在那裡找到實用的遷移資訊。

[Flutter Widget Previewer]: /tools/widget-previewer
[Create with AI]: /ai/create-with-ai
[bc-3.35]: /release/breaking-changes#released-in-flutter-3-35
[hot reload]: /tools/hot-reload
[Protect your app's sensitive content]: /platform-integration/android/sensitive-content
[supported platforms]: /reference/supported-platforms

---

## 2025 年 5 月 20 日：Google I/O 3.32 版釋出

Flutter 3.32 已正式上線！欲了解更多資訊，
請參閱 [Flutter 3.32 technical blog post][3.32-tech]。
你也可以參考 [Dart 3.8 release][Dart 3.8 release] 部落格文章。

[3.32-tech]: {{site.medium}}/flutter/whats-new-in-flutter-3-32-40c1086bab6e
[Dart 3.8 release]: {{site.medium}}/dartlang/announcing-dart-3-8-724eaaec9f47

**網站更新**

首先，網站的幕後重構已經進行多時。
這些變更已陸續上線，你或許已經注意到：

* 現已支援深色模式（Dark mode）
* 你可以對每個頁面按讚或倒讚評分
* 側邊導覽列（sidenav）已調整，內容（希望）更易於搜尋
* 網站的無障礙性已提升
* 檔案結構有調整（我們都已設置重新導向）

**自 3.29 版以來更新或新增的文件**

* 全新 [Flutter on iOS][Flutter on iOS] 頁面。
* 我們針對各開發平台，推出了新的 [workflow for installing Flutter][workflow for installing Flutter] 指南。此內容仍在持續完善中，敬請期待。
* 新增一頁介紹如何使用 DevTools 新功能
  [Flutter Property Editor][Flutter Property Editor]。
  [VS Code][VS Code] 及 [Android Studio/IntelliJ][Android Studio/IntelliJ]
  的相關說明也已更新。
* 網站已更新，說明如何在 Web 上
  [use hot reload on web][use hot reload on web]（需開啟旗標）。
  本次釋出中，Web 熱重載為實驗性功能。
* 新增 [adding iOS app extensions][adding iOS app extensions] 頁面。
* [setting up Flutter flavors for iOS and macOS][setting up Flutter flavors for iOS and macOS]
  頁面已完全重寫。
* 新增 [setting up Flutter flavors for Android][setting up Flutter flavors for Android] 頁面。
* Cupertino 指南已更新
  [Place a floating app bar above a list][floating-app-bar]
  cookbook 教學。
* 你現在可以
  [improve accessibility of your apps with SemanticRoles][semantic-roles]。
* 另外，別忘了查看本次釋出的 [breaking changes][bc-3.32]
  頁面。你也可以在那裡找到實用的遷移資訊。

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

過往版本請參考
[What's new archive][What's new archive] 頁面。

[What's new archive]: /release/archive-whats-new

