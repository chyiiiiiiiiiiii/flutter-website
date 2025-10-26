---
title: Web 常見問答
description: 在 Flutter 上撰寫或執行 Web 應用程式時的一些注意事項與差異。
---

## 問題集

### 哪些情境最適合在 Web 上使用 Flutter？

並非所有網頁都適合使用 Flutter，但我們認為 Flutter 特別適合以應用程式為核心的體驗：

* 漸進式網頁應用程式（Progressive Web Apps, PWA）
* 單頁應用程式（Single Page Apps, SPA）
* 現有的 Flutter 行動應用程式

目前，Flutter 並不適合用於以大量文字為主、以內容流式呈現為主的靜態網站。例如，部落格文章更適合採用 Web 原生的文件導向模型，而不是像 Flutter 這類 UI 框架所提供的應用程式導向服務。不過，你仍然可以使用 Flutter 將互動式體驗嵌入這些網站中。

如需更多有關如何在 Web 上使用 Flutter 的資訊，請參閱 [Web support for Flutter][Web support for Flutter]。

### 搜尋引擎最佳化（SEO）

一般來說，Flutter 著重於動態應用程式體驗，Web 端的 Flutter 也不例外。Flutter Web 以效能、畫面品質與一致性為優先，這代表應用程式的輸出結果無法完全符合搜尋引擎正確索引所需的格式。對於靜態或文件型態的 Web 內容，我們建議使用 HTML——就像我們在 [flutter.dev]({{site.main-url}})、[dart.dev]({{site.dart-site}}) 以及 [pub.dev]({{site.pub}}) 上所做的那樣。你也可以考慮將主要的應用程式體驗（以 Flutter 建立）與首頁、行銷內容、說明內容（以具備搜尋引擎最佳化的 HTML 建立）分開。

如 [roadmap][roadmap] 所述，Flutter 團隊計劃進一步研究 Flutter Web 的搜尋引擎可索引性。

### Web 應用程式支援熱重載（hot reload）嗎？

支援！不過目前仍需啟用實驗性旗標。
如需更多資訊，請參閱
[hot reload on the web][hot reload on the web]。

[hot reload on the web]: /platform-integration/web/building#hot-reload-web

熱重啟（hot restart）則不需要旗標，是一種快速查看變更的方法，無需重新啟動 Web 應用程式並等待重新編譯與載入。這與 Flutter 行動開發的熱重載功能類似。不同之處在於，熱重載會保留你的狀態，而熱重啟則不會。

### Flutter 支援哪些 Web 瀏覽器？

Flutter Web 應用程式可在以下瀏覽器執行：

* Chrome（行動裝置與桌面）
* Safari（行動裝置與桌面）
* Edge（行動裝置與桌面）
* Firefox（行動裝置與桌面）

在開發期間，Chrome（於 macOS、Windows 和 Linux 上）以及 Edge（於 Windows 上）支援作為預設的偵錯瀏覽器。

### 我可以在任何 IDE 中建置、執行與部署 Web 應用程式嗎？

你可以在 Android Studio/IntelliJ 及 VS Code 中選擇 **Chrome** 或 **Edge** 作為目標裝置。

所有通道的裝置下拉選單現在都應該包含 **Chrome (web)** 選項。

### 如何為 Web 建立響應式應用程式？

請參閱 [Creating responsive apps][Creating responsive apps]。

### 我可以在 Web 應用程式中使用 `dart:io` 嗎？

不行。瀏覽器無法存取檔案系統。
若需網路功能，請使用 [`http`][`http`] 套件。請注意，安全性會有些許不同，因為是由瀏覽器（而非應用程式）來控制 HTTP 請求的標頭。

### 如何處理 Web 專屬的匯入（import）？

有些套件需要平台專屬的匯入，特別是當它們使用到檔案系統時（瀏覽器無法存取）。若要在你的應用程式中使用這些套件，請參閱 [dart.dev]({{site.dart-site}}) 上的[條件匯入文件][documentation for conditional imports]。

### Flutter Web 支援並行處理（concurrency）嗎？

Dart 透過 [isolates][isolates] 提供的並行處理，目前尚未在 Flutter Web 支援。

Flutter Web 應用程式可以考慮使用 [web workers][web workers] 作為替代方案，但目前尚未內建相關支援。

### 如何部署 Web 應用程式？

請參閱 [Preparing a web app for release][Preparing a web app for release]。

### `Platform.is` 能在 Web 上運作嗎？

目前尚未支援。

### 為什麼我的應用程式在部署後沒有立即更新？

你可能需要設定 Web 伺服器回傳的 `Cache-Control` 標頭。例如，若此標頭設為 3600，瀏覽器與 CDN 會快取該資源 1 小時，因此使用者在你部署新版本後，最多可能還會看到舊版本 1 小時。關於 Web 快取的更多資訊，請參閱 [Prevent unnecessary network requests with the HTTP Cache][http-cache]。

建議你了解這種行為，以避免造成不良的使用者體驗。當你部署應用程式後，使用者可能會在快取標頭定義的期間內，繼續使用被瀏覽器或 CDN 快取的舊版本。這可能導致使用者的應用程式版本與後端服務已部署的變更不相容。

### 部署後如何清除 Web 快取並強制用戶下載新版應用程式？
如果你希望在每次部署後強制跳過這些快取標頭，一個常見做法是為你的靜態資源連結加上某種建置 ID，或直接更新檔案名稱。
例如，`logo.png` 可能會變成 `logo.v123.png`。

```html
<!-- Option 1, append build ID as a query parameter in your links -->
<script src="flutter_bootstrap.js?v=123" async></script>

<!-- Option 2, update the filename and update your links -->
<script src="flutter_bootstrap.v123.js" async></script>
```

Flutter 目前尚未支援自動將 build ID 附加到資源。

### 如何設定快取標頭（cache headers）？

如果你使用的是 Firebase Hosting，當你部署新版應用程式時，共用快取（CDN）會自動失效（invalidate）。但你也可以選擇如下設定快取標頭，讓瀏覽器快取不會快取應用程式腳本，但共用快取仍會快取。

```json
{
  "hosting": {
    "headers": [
      {
        "source":
          "**/*.@(jpg|jpeg|gif|png|svg|webp|css|eot|otf|ttf|ttc|woff|woff2|font.css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=3600,s-maxage=604800"
          }
        ]
      },
      {
        "source":
          "**/*.@(mjs|js|wasm|json)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=0,s-maxage=604800"
          }
        ]
      }
    ]
  }
}
```

### 我該如何設定 service worker？

由 `flutter build web` 產生的 service worker 已經被棄用，
你可以在執行 `flutter build web` 指令時，將 `--pwa-strategy` 旗標設為 `none` 來停用它。

```console
flutter build web --pwa-strategy=none
```

如果你希望繼續使用 service worker，可以[自行建置][using-service-workers]，或嘗試第三方工具，例如 [Workbox][workbox]。

如果你的 service worker 沒有及時更新，請透過設定 CDN 與瀏覽器快取，將 `Cache-Control` 標頭設為較小的值，例如 0 或 60 秒。

[building a web app with Flutter]: /platform-integration/web/building
[Creating responsive apps]: /ui/adaptive-responsive
[documentation for conditional imports]: {{site.dart-site}}/guides/libraries/create-library-packages#conditionally-importing-and-exporting-library-files
[Embedding Flutter web]: /platform-integration/web/embedding-flutter-web
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[`http`]: {{site.pub}}/packages/http
[http-cache]: https://web.dev/articles/http-cache
[`iframe`]: https://html.com/tags/iframe/
[isolates]: {{site.dart-site}}/guides/language/concurrency
[Issue 32248]: {{site.repo.flutter}}/issues/32248
[Preparing a web app for release]: /deployment/web
[roadmap]: {{site.github}}/flutter/flutter/blob/master/docs/roadmap/Roadmap.md#web-platform
[run your web apps in any supported browser]: /platform-integration/web/building#create-and-run
[using-service-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
[Web content in Flutter]: /platform-integration/web/web-content-in-flutter
[Web support for Flutter]: /platform-integration/web
[web workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[workbox]: https://github.com/GoogleChrome/workbox
