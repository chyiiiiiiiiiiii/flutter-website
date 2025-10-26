---
title: Flutter 的 Web 支援
shortTitle: Web
description: 關於 Flutter 如何支援建立網頁體驗的詳細資訊。
---

Flutter 在網頁上提供與行動裝置相同的體驗。

基於 Dart 的可攜性、Web 平台的強大功能、Flutter 框架的彈性，以及 WebAssembly 的高效能，你可以使用同一份程式碼庫，為 iOS、Android 及瀏覽器建構應用程式。Web 就是你的應用程式的另一個裝置目標。

想開始使用，請參閱[使用 Flutter 建立網頁應用程式][Building a web application with Flutter]。

## 由 WebAssembly 強力驅動

Dart 與 Flutter 能夠編譯為 WebAssembly，
這是一種二進位指令格式，能讓所有主流瀏覽器上的應用程式運行更快速。

想了解使用 WebAssembly 的優勢，
可以觀看下方影片。

{% ytEmbed 'lpnKWK-KEYs?start=1712', 'What\'s new in Flutter - WebAssembly' %}

## 運作原理

為 Flutter 增加 Web 支援，涉及將 Flutter 的核心繪圖層實作於標準瀏覽器 API 之上，並將 Dart 編譯成 JavaScript，而不是行動應用程式所用的 ARM 機器碼。透過結合 DOM、Canvas 及 WebAssembly，Flutter 能在現代瀏覽器上提供可攜、高品質且高效能的使用者體驗。我們將核心繪圖層完全以 Dart 實作，並利用 Dart 最佳化的 JavaScript 編譯器，將 Flutter 核心、框架及你的應用程式一併編譯成單一、壓縮過的原始檔，可部署至任何 Web 伺服器。

<img src="/assets/images/docs/arch-overview/web-framework-diagram.png" alt="Flutter architecture for web" >

## 我可以建立哪些類型的應用程式？

雖然你可以在 Web 上做很多事，
但 Flutter 的 Web 支援在以下情境中最具價值：

**單頁應用程式（Single Page Application）**
: Flutter 的 Web 支援讓複雜、獨立的網頁應用程式，能夠擁有豐富的圖形與互動內容，並觸及各種裝置的終端使用者。

**既有行動應用程式**
: Flutter 的 Web 支援為現有的 Flutter 行動應用程式提供了基於瀏覽器的發佈模式。

目前，並非所有 HTML 應用場景都完全適合使用 Flutter。例如，內容以文字為主、流程導向、靜態的內容（如部落格文章），更適合 Web 所建構的文件導向模型，而不是像 Flutter 這樣的 UI 框架所提供的應用程式導向服務。不過，你 _可以_ 使用 Flutter 將互動體驗嵌入這些網站中。

## 開始使用

以下資源可協助你快速上手：

* 若要為現有應用程式新增 Web 支援，或建立包含 Web 支援的新應用程式，請參閱
  [使用 Flutter 建立網頁應用程式][Building a web application with Flutter]。
* 若要在集中式檔案中設定 Web 開發伺服器設定，請參閱 [設定 Web 開發組態檔][Set up a web development configuration file]。
* 若要了解 Flutter 不同的 Web 繪製器（CanvasKit 與 Skwasm），請參閱
  [Web 繪製器][Web renderers]。
* 若要學習如何建立響應式 Flutter
  應用程式，請參閱 [建立響應式應用程式][Creating responsive apps]。
* 若要查看常見問題與解答，請參閱
  [Web 常見問答集][web FAQ]。
* 若要查看程式碼範例，
  請參閱 [Flutter 的 Web 範例][web samples for Flutter]。
* 若要觀看 Flutter Web 應用程式展示，請參閱 [Wonderous app][Wonderous app]。
* 若要了解如何部署 Web 應用程式，請參閱
  [準備 Web 發佈][Preparing an app for web release]。
* 如需回報問題，請至 Flutter 主要儲存庫 [提出 issue][File an issue]。
* 你可以在 [Discord][Discord] 的 **#help** 頻道上即時討論並詢問與 Web 相關的問題。

[Building a web application with Flutter]: /platform-integration/web/building
[Set up a web development configuration file]: /platform-integration/web/web-dev-config-file
[Creating responsive apps]: /ui/adaptive-responsive
[Discord]: https://discordapp.com/invite/yeZ6s7k
[file an issue]: https://goo.gle/flutter_web_issue
[Wonderous app]: {{site.wonderous}}/web
[Preparing an app for web release]: /deployment/web
[Progressive Web Application]: https://web.dev/progressive-web-apps/
[web FAQ]: /platform-integration/web/faq
[web samples for Flutter]: https://github.com/flutter/samples/#?platform=web
[Web renderers]: /platform-integration/web/renderers
