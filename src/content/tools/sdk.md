---
title: Flutter SDK（Flutter 軟體開發套件）總覽
shortTitle: Flutter SDK
description: Flutter 函式庫與命令列工具。
---

Flutter SDK（Flutter 軟體開發套件）包含了你在各平台開發 Flutter 應用程式所需的套件與命令列工具。若要取得 Flutter SDK，請參閱 [Install][Install]。

## Flutter SDK 內容介紹

透過 Flutter SDK，你可以取得以下內容：

* [Dart SDK][Dart SDK]
* 高度最佳化、以行動裝置為優先的 2D 繪製引擎，並具備優異的文字支援
* 現代化的 React 風格框架
* 豐富的元件 (Widgets) 集合，實作 Material Design 與 iOS 風格
* 提供單元測試與整合測試的 API
* 用於連接系統與第三方 SDK 的互通與外掛 API
* 可在 Windows、Linux 與 Mac 上執行測試的無頭（headless）測試執行器
* [Flutter DevTools][Flutter DevTools]，協助你測試、除錯與分析應用程式效能
* `flutter` 與 `dart` 命令列工具，用於建立、建置、測試與編譯你的應用程式

注意：如需更多關於 Flutter SDK 的資訊，請參閱其 [README file][README file]。

## `flutter` 命令列工具

[`flutter` CLI 工具][`flutter` CLI tool] (`flutter/bin/flutter`) 是開發者（或 IDE 代表開發者）與 Flutter 互動的主要方式。

## `dart` 命令列工具

[`dart` CLI 工具][`dart` CLI tool] 隨 Flutter SDK 提供，位於 `flutter/bin/dart`。

[Flutter DevTools]: /tools/devtools
[Dart SDK]: {{site.dart-site}}/tools/sdk
[`dart` CLI tool]: {{site.dart-site}}/tools/dart-tool
[`flutter` CLI tool]: /reference/flutter-cli
[Install]: /get-started
[README file]: {{site.repo.flutter}}/blob/main/README.md

## Flutter 開發工具的 SDK 支援

Flutter 的 IDE 工具（Android Studio 與 Intellij 外掛、VS Code 擴充套件）支援可追溯至兩年前的 Flutter SDK 版本。這代表雖然這些工具在更舊的 SDK 版本上可能仍可運作，但針對這些舊版本的特定問題將不再提供修正。
