---
title: Flutter 的建置模式
description: 說明 Flutter 的建置模式，以及何時應該使用 debug、release 或 profile 模式。
---

Flutter 工具在編譯您的應用程式時支援三種模式，以及一種無頭（headless）測試模式。您可以根據開發週期的階段選擇不同的編譯模式。您正在除錯程式碼嗎？需要效能分析資訊嗎？還是已經準備好要部署您的應用程式？

以下是各模式適用時機的快速摘要：

* 在開發過程中，當您需要使用 [hot reload][hot reload] 時，請使用 [debug](#debug) 模式。
* 當您需要分析效能時，請使用 [profile](#profile) 模式。
* 當您準備好要釋出應用程式時，請使用 [release](#release) 模式。

本頁其餘部分將詳細說明這些模式。

* 若要了解無頭測試模式，請參考 engine wiki 上的 [Flutter's build modes][Flutter's build modes] 文件。
* 若要了解如何偵測建置模式，請參考 [Check for Debug/Release Mode in Flutter Apps] 部落格文章。
[Check for Debug/Release Mode in Flutter Apps]: https://retroportalstudio.medium.com/check-for-debug-release-mode-in-flutter-apps-d8d545f20da3

## Debug

在 _debug 模式_ 下，應用程式會以便於在實體裝置、模擬器或模擬器（simulator）上進行除錯的方式設置。

行動裝置上的 debug 模式表示：

* [Assertions][Assertions]（斷言）已啟用。
* 服務擴充功能（Service extensions）已啟用。
* 編譯優化以加快開發與執行週期（但不針對執行速度、二進位檔案大小或部署進行最佳化）。
* 除錯功能已啟用，並且支援原始碼層級除錯的工具（如 [DevTools][DevTools]）可以連接到該程序。

Web 應用程式的 debug 模式表示：

* 建置結果**未**進行壓縮（minify），且**未**執行 tree shaking。
* 應用程式會使用 [dartdevc][dartdevc] 編譯器進行編譯，以便於除錯。

預設情況下，`flutter run` 會編譯為 debug 模式。您的 IDE 支援此模式。例如，Android Studio 提供 **Run > Debug...** 選單選項，以及專案頁面上的綠色錯誤蟲圖示（帶有小三角形）。

:::note
* Hot reload 僅在 debug 模式下可用。
* 模擬器與 simulator 僅能在 debug 模式下執行。
* 在 debug 模式下，應用程式效能可能會不流暢。請在實體裝置上以 [profile](#profile) 模式測量效能。
:::

## Release

當您要部署應用程式、追求最大最佳化與最小體積時，請使用 _release 模式_。針對行動裝置，release 模式（不支援在模擬器或 simulator 上執行）表示：

* 斷言（Assertions）已停用。
* 除錯資訊已移除。
* 除錯功能已停用。
* 編譯優化以實現快速啟動、快速執行與小型套件大小。
* 服務擴充功能（Service extensions）已停用。

Web 應用程式的 release 模式表示：

* 建置結果已壓縮（minified），且已執行 tree shaking。
* 應用程式會使用 [dart2js][dart2js] 編譯器進行編譯，以獲得最佳效能。

指令 `flutter run --release` 會編譯為 release 模式。您的 IDE 支援此模式。例如，Android Studio 提供 **Run > Run...** 選單選項，以及專案頁面上的綠色三角形執行按鈕圖示。您也可以使用 `flutter build <target>` 為特定目標編譯為 release 模式。若要查看支援的目標清單，請使用 `flutter help build`。

如需更多資訊，請參閱釋出 [iOS][iOS] 與 [Android][Android] 應用程式的相關文件。

## Profile

在 _profile 模式_ 下，保留部分除錯能力—足以分析應用程式的效能。由於模擬器與 simulator 的行為無法代表真實效能，因此 profile 模式在這些環境下是停用的。在行動裝置上，profile 模式與 release 模式類似，但有以下差異：

* 部分服務擴充功能（如效能疊加層）已啟用。
* 追蹤（Tracing）已啟用，並且支援原始碼層級除錯的工具（如 [DevTools][DevTools]）可以連接到該程序。

Web 應用程式的 profile 模式表示：

* 建置結果**未**壓縮，但已執行 tree shaking。
* 應用程式會使用 [dart2js][dart2js] 編譯器進行編譯。
* DevTools 無法連接到以 profile 模式執行的 Flutter web 應用程式。請使用 Chrome DevTools 來[產生時間軸事件][generate timeline events]。

您的 IDE 支援此模式。例如，Android Studio 提供 **Run > Profile...** 選單選項。指令 `flutter run --profile` 會編譯為 profile 模式。

:::note
請使用 [DevTools][DevTools] 工具組來分析應用程式效能。
:::

如需更多關於建置模式的資訊，請參閱 [Flutter's build modes][Flutter's build modes]。


[Android]: /deployment/android
[Assertions]: {{site.dart-site}}/language/error-handling#assert
[dart2js]: {{site.dart-site}}/tools/dart2js
[dartdevc]: {{site.dart-site}}/tools/dartdevc
[DevTools]: /tools/devtools
[Flutter's build modes]: {{site.repo.flutter}}/blob/main/docs/engine/Flutter's-modes.md
[generate timeline events]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance/performance-reference
[hot reload]: /tools/hot-reload
[iOS]: /deployment/ios
