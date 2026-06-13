---
title: Flutter 的 Web 支援
shortTitle: Web
description: 關於 Flutter 如何支援建立網頁體驗的詳細說明。
---

Flutter 在 Web 上提供與行動裝置相同的體驗。

基於 Dart 的可攜性、Web 平台的強大功能、Flutter 框架的彈性，以及 WebAssembly 的高效能，您可以使用相同的程式碼庫建置 iOS、Android 及瀏覽器上的應用程式。Web 只是您的應用程式的另一個裝置目標。

想快速開始，請參閱[使用 Flutter 建立 Web 應用程式][Building a web application with Flutter]。

## 由 WebAssembly 驅動

Dart 與 Flutter 可以編譯為 WebAssembly，
這是一種二進位指令格式，可在所有主流瀏覽器上實現高速應用程式。

想了解使用 WebAssembly 的好處，
請觀看下方影片。

<YouTubeEmbed id="lpnKWK-KEYs?start=1712"
  title="What's new in Flutter - WebAssembly"></YouTubeEmbed>

## 運作原理

為 Flutter 增加 Web 支援，涉及將 Flutter 的核心繪圖層實作於標準瀏覽器 API 之上，並將 Dart 編譯為 JavaScript，而非行動應用程式所用的 ARM 機器碼。透過結合 DOM、Canvas 及 WebAssembly，Flutter 能在現代瀏覽器中提供可攜、高品質且高效能的使用者體驗。我們以 Dart 完整實作了核心繪圖層，並利用 Dart 最佳化的 JavaScript 編譯器，將 Flutter 核心、框架及您的應用程式一同編譯為單一、經過壓縮的原始檔，可部署至任何 Web 伺服器。

<img src="/assets/images/docs/arch-overview/web-framework-diagram.png"
  alt="Flutter architecture for web" >

## 我可以建立哪些類型的應用程式？

雖然 Web 上能做的事情很多，
但 Flutter 的 Web 支援在下列情境中最具價值：

**單頁應用程式（Single Page Application）**
: Flutter 的 Web 支援讓複雜且富含圖形與互動內容的獨立網頁應用程式，能夠在各種裝置上觸及終端使用者。

**既有行動應用程式**
: Flutter 的 Web 支援為既有 Flutter 行動應用程式提供基於瀏覽器的發佈模式。

目前並非所有 HTML 情境都完全適合使用 Flutter。例如，內容以文字為主、流程導向、靜態的內容（如部落格文章），更適合 Web 所建構的以文件為中心的模型，而不是像 Flutter 這樣的 UI 框架所提供的以應用程式為中心的服務。不過，您 _可以_ 使用 Flutter 將互動體驗嵌入這些網站中。

然而，如果您想使用 Dart 並希望實作傳統的以 DOM 為基礎的網站，社群發布的 Dart 套件 [Jaspr][] 支援靜態網站；事實上，[Dart 文件][Dart documentation]、[Flutter 文件][Flutter documentation] 及[行銷][marketing]網站皆已遷移至使用 Jaspr 套件。請注意，Jaspr 使用 Dart（但非 Flutter），並以傳統網站相同的方式處理 SEO。

[Dart documentation]: {{site.dart-site}}
[Flutter documentation]: {{site.main-url}}
[Jaspr]: https://jaspr.site/
[marketing]: {{site.main-url}}

## 開始使用

以下資源可協助您開始：

* 若要為現有應用程式新增 Web 支援，或建立包含 Web 支援的新應用程式，請參閱
  [使用 Flutter 建立 Web 應用程式][Building a web application with Flutter]。
* 若要在集中式檔案中設定 Web 開發伺服器設定，請參閱 [設定 Web 開發組態檔][Set up a web development configuration file]。
* 若要了解 Flutter 不同的 Web 繪製器（CanvasKit 與 Skwasm），請參閱
  [Web 繪製器][Web renderers]。
* 若要學習如何建立響應式 Flutter
  應用程式，請參閱 [建立響應式應用程式][Creating responsive apps]。
* 若要查看常見問題與解答，請參閱
  [Web 常見問答][web FAQ]。
* 若要查看程式碼範例，
  請參考 [Flutter 的 Web 範例][web samples for Flutter]。
* 若要觀看 Flutter Web 應用程式展示，請參考 [Wonderous app][Wonderous app]。
* 若要了解如何部署 Web 應用程式，請參閱
  [準備 Web 發佈][Preparing an app for web release]。
* 如需回報問題，請至 Flutter 主要儲存庫 [提出 issue][File an issue]。
* 您也可以在 [Discord][Discord] 的 **#help** 頻道進行聊天並詢問 Web 相關問題。

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
