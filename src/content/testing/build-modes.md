---
title: Flutter 的建置模式
description: 說明 Flutter 的建置模式，以及何時應該使用 debug、release 或 profile 模式。
---

Flutter 工具在編譯應用程式時支援三種模式，以及一種無頭（headless）測試模式。你可以根據開發週期的階段選擇不同的編譯模式。你正在除錯程式碼嗎？你需要效能分析資訊嗎？你已經準備好部署你的應用程式了嗎？

以下是各模式適用時機的快速摘要：

* 在開發過程中，當你需要使用 [hot reload][hot reload] 時，請使用 [debug](#debug) 模式。
* 當你需要分析效能時，請使用 [profile](#profile) 模式。
* 當你準備好要發佈應用程式時，請使用 [release](#release) 模式。

本頁其餘部分將詳細說明這些模式。

* 若要瞭解無頭測試模式，請參考 engine wiki 上的 [Flutter's build modes][Flutter's build modes] 文件。
* 若要瞭解如何偵測建置模式，請參考部落格文章 [Check for Debug/Release Mode in Flutter Apps][Check for Debug/Release Mode in Flutter Apps]: https://retroportalstudio.medium.com/check-for-debug-release-mode-in-flutter-apps-d8d545f20da3。

## Debug

在 _debug 模式_ 下，應用程式會被設置為可在實體裝置、模擬器或模擬器（simulator）上進行除錯。

行動裝置上的 debug 模式意味著：

* [Assertions][Assertions] 已啟用。
* 服務擴充功能已啟用。
* 編譯優化以加快開發與執行週期（但不針對執行速度、二進位檔案大小或部署進行最佳化）。
* 已啟用除錯，且支援原始碼層級除錯的工具（如 [DevTools][DevTools]）可以連接至該程序。

Web 應用程式的 debug 模式則表示：

* 建置結果**未**進行壓縮（minify），且**未**執行 tree shaking。
* 應用程式使用 [dartdevc][dartdevc] 編譯器編譯，以便更容易除錯。

預設情況下，`flutter run` 會編譯為 debug 模式。你的 IDE 支援此模式。例如，Android Studio 提供 **Run > Debug...** 選單選項，以及在專案頁面上的綠色小蟲圖示（上有小三角形）。

:::note
* Hot reload 僅在 debug 模式下可用。
* 模擬器與 simulator 僅能在 debug 模式下執行。
* 在 debug 模式下應用程式效能可能會卡頓。請在實體裝置的 [profile](#profile) 模式下進行效能測量。
:::

## Release

當你要部署應用程式，並追求最大化最佳化與最小化檔案體積時，請使用 _release 模式_。對於行動裝置，release 模式（不支援在模擬器或 simulator 上執行）意味著：

* Assertions 已停用。
* 除錯資訊已移除。
* 除錯功能已停用。
* 編譯會針對快速啟動、快速執行與小型套件體積進行最佳化。
* 服務擴充功能已停用。

Web 應用程式的 release 模式則表示：

* 建置結果已壓縮（minify），且已執行 tree shaking。
* 應用程式使用 [dart2js][dart2js] 編譯器編譯，以獲得最佳效能。

指令 `flutter run --release` 會編譯為 release 模式。你的 IDE 支援此模式。例如，Android Studio 提供 **Run > Run...** 選單選項，以及專案頁面上的綠色三角形執行按鈕圖示。你也可以使用 `flutter build <target>` 為特定目標編譯為 release 模式。若要查看支援的目標清單，請使用 `flutter help build`。

如需更多資訊，請參閱發佈 [iOS][iOS] 與 [Android][Android] 應用程式的相關文件。

## Profile

在 _profile 模式_ 下，保留了一些除錯能力——足以分析應用程式效能。Profile 模式在模擬器與 simulator 上是停用的，因為這些環境的行為無法代表真實效能。在行動裝置上，profile 模式與 release 模式類似，但有以下差異：

* 部分服務擴充功能（如效能疊加層）已啟用。
* 已啟用追蹤（tracing），且支援原始碼層級除錯的工具（如 [DevTools][DevTools]）可以連接至該程序。

Web 應用程式的 profile 模式則表示：

* 建置結果**未**壓縮（minify），但已執行 tree shaking。
* 應用程式使用 [dart2js][dart2js] 編譯器編譯。
* DevTools 無法連接至以 profile 模式執行的 Flutter web 應用程式。請使用 Chrome DevTools 來 [產生時間軸事件][generate timeline events] 以分析 web 應用程式。

你的 IDE 支援此模式。例如，Android Studio 提供 **Run > Profile...** 選單選項。指令 `flutter run --profile` 會編譯為 profile 模式。

:::note
請使用 [DevTools][DevTools] 工具組來分析應用程式效能。
:::

如需更多建置模式相關資訊，請參閱 [Flutter's build modes][Flutter's build modes]。
