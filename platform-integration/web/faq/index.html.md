# Web 常見問答

> 在 Flutter 上撰寫或執行 Web 應用程式時，常見的注意事項與差異。



## 問題集

### 哪些情境最適合在 Web 上使用 Flutter？

並非每個網頁都適合用 Flutter 製作，但我們認為 Flutter 特別適合以應用程式為核心的體驗：

* 漸進式網頁應用程式（Progressive Web Apps）
* 單頁應用程式（Single Page Apps）
* 現有的 Flutter 行動應用程式

目前，Flutter 並不適合用於以大量文字內容為主、以文件流為基礎的靜態網站。例如，部落格文章更適合使用 Web 所建構的文件導向模型，而不是像 Flutter 這類 UI 框架所提供的應用程式導向服務。不過，你_可以_使用 Flutter 將互動式體驗嵌入到這些網站中。

如需更多關於如何在 Web 上使用 Flutter 的資訊，請參閱 [Web support for Flutter][]。

### 搜尋引擎最佳化（SEO）

一般來說，Flutter 主要針對動態應用程式體驗設計，Web 端的 Flutter 也不例外。Flutter Web 著重於效能、精確度與一致性。這意味著應用程式的輸出結果，並不符合搜尋引擎正確索引所需的格式。

不過，社群發布的 Dart 套件 [Jaspr][] _確實_ 支援靜態網站。事實上，[Dart 文件][Dart documentation]、[Flutter 文件][Flutter documentation] 和 [Flutter 行銷][Flutter marketing] 網站均已遷移至使用 Jaspr 套件。

總結來說，對於靜態或文件型態的 Web 內容，我們建議_擇一_使用：

1. [Jaspr][]，若你希望使用 Dart 但想要更傳統的 DOM 架構網站。同時請注意，Jaspr 的 SEO 運作方式與傳統網站相同。
1. HTML——在此情況下，請考慮將主要的應用程式體驗（以 Flutter 建立）與首頁、行銷內容及說明內容（以符合搜尋引擎最佳化的 HTML 製作）分開。

[Dart documentation]: https://dart.dev
[Flutter documentation]: /
[Flutter marketing]: https://flutter.dev
[Jaspr]: https://jaspr.site/

### Web 應用程式可以使用熱重載（hot reload）嗎？

可以！如需更多資訊，請參閱 [hot reload on the web][]。

[hot reload on the web]: /platform-integration/web/building#hot-reload-web

### Flutter 支援哪些 Web 瀏覽器？

Flutter Web 應用程式可在以下瀏覽器執行：

* Chrome（行動裝置與桌面）
* Safari（行動裝置與桌面）
* Edge（行動裝置與桌面）
* Firefox（行動裝置與桌面）

在開發期間，Chrome（於 macOS、Windows 和 Linux 上）以及 Edge（於 Windows 上）支援作為預設的除錯瀏覽器。

### 我可以在任何 IDE 中建置、執行與部署 Web 應用程式嗎？

你可以在 Android Studio/IntelliJ 與 VS Code 中，選擇 **Chrome** 或 **Edge** 作為目標裝置。

所有頻道的裝置下拉選單現在都應該包含 **Chrome (web)** 選項。

### 如何為 Web 建立響應式應用程式？

請參閱 [Creating responsive apps][]。

### 我可以在 Web 應用程式中使用 `dart:io` 嗎？

不行。瀏覽器無法存取檔案系統。若需網路功能，請使用 [`http`][] 套件。請注意，安全性機制略有不同，因為 HTTP 請求的標頭是由瀏覽器（而非應用程式）所控制。

### 如何處理 Web 特定的匯入（import）？

有些套件需要平台特定的匯入，特別是如果它們使用檔案系統（瀏覽器無法存取）。若要在你的應用程式中使用這些套件，請參閱 [dart.dev](https://dart.dev) 上的 [條件匯入（conditional imports）文件][documentation for conditional imports]。

### Flutter Web 支援並行（concurrency）嗎？

Dart 透過 [isolates][] 提供的並行支援，目前尚未在 Flutter Web 中支援。

Flutter Web 應用程式有可能透過 [web workers][] 來達到類似效果，但目前尚未內建支援。

### 如何部署 Web 應用程式？

請參閱 [Preparing a web app for release][]。

### `Platform.is` 能在 Web 上運作嗎？

不行。雖然你在為 Web 編譯時技術上可以匯入 `dart:io`，但呼叫任何 `Platform.isXYZ` 方法都會拋出 `UnsupportedError`。此外，在套件中匯入 `dart:io`（除非透過條件匯入）會導致 pub.dev 將該套件評分為不支援 Web。

* 如果你正在開發 Flutter 應用程式，請考慮使用 [`kIsWeb`][]。
* 如果你正在開發套件（尤其是沒有 Flutter 相依性的套件），請考慮使用 [`os_detect`][] 套件。

[`kIsWeb`]: https://api.flutter.dev/flutter/foundation/kIsWeb-constant.html

### 為什麼我的應用程式在部署後沒有立即更新？

你可能需要設定 Web 伺服器回傳的 `Cache-Control` 標頭。例如，若此標頭設為 3600，瀏覽器與 CDN 會將資源快取 1 小時，因此使用者在你部署新版本後，最多可能會看到 1 小時前的舊版本。關於 Web 上的快取機制，請參閱 [Prevent unnecessary network requests with the HTTP Cache][http-cache]。

建議你了解這種行為，以避免不良的使用者體驗。部署應用程式後，使用者可能會在快取標頭所定義的期間內，繼續使用快取版本（由瀏覽器或 CDN 快取）。這可能導致使用者使用的應用程式版本與後端服務已部署的變更不相容。

### 部署後如何清除 Web 快取並強制用戶端重新下載應用程式？

如果你希望在每次部署後強制失效這些快取標頭，一個常見做法是將某種建置 ID 加入靜態資源的連結，或直接更新檔案名稱。例如，`logo.png` 可能會變成 `logo.v123.png`。

```html
<!-- Option 1, append build ID as a query parameter in your links -->
<script src="flutter_bootstrap.js?v=123" async></script>

<!-- Option 2, update the filename and update your links -->
<script src="flutter_bootstrap.v123.js" async></script>
```

Flutter 目前尚未支援自動將 build ID 附加到資源上。

### 如何設定快取標頭（cache headers）？

如果你正在使用 Firebase Hosting，當你部署新版本的應用程式時，共用快取（CDN）會被自動失效（invalidate）。不過，為了確保瀏覽器不會快取應用程式腳本但共用快取仍然會快取，你可以如下方式設定快取標頭：

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

### 如何設定 service worker？

Flutter 預設不再產生或管理 service worker。

如果你的應用程式需要離線支援或進階快取功能，你需要自行使用標準的 Web 工具或第三方解決方案（例如 [Workbox][workbox]）來設定 service worker。

如需更多關於建置自訂 service worker 的資訊，請參閱 [Using service workers][]。

如果你的 service worker 沒有及時更新，請透過設定 CDN 與瀏覽器快取，將 `Cache-Control` 標頭設為較小的數值，例如 0 或 60 秒。

[building a web app with Flutter]: /platform-integration/web/building
[Creating responsive apps]: /ui/adaptive-responsive
[documentation for conditional imports]: https://dart.dev/guides/libraries/create-library-packages#conditionally-importing-and-exporting-library-files
[Embedding Flutter web]: /platform-integration/web/embedding-flutter-web
[file an issue]: https://github.com/flutter/flutter/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[`http`]: https://pub.dev/packages/http
[http-cache]: https://web.dev/articles/http-cache
[`iframe`]: https://html.com/tags/iframe/
[isolates]: https://dart.dev/guides/language/concurrency
[Issue 32248]: https://github.com/flutter/flutter/issues/32248
[Preparing a web app for release]: /deployment/web
[roadmap]: https://github.com/flutter/flutter/blob/master/docs/roadmap/Roadmap.md#web-platform
[run your web apps in any supported browser]: /platform-integration/web/building#create-and-run
[Using service workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
[Web content in Flutter]: /platform-integration/web/web-content-in-flutter
[Web support for Flutter]: /platform-integration/web
[web workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[workbox]: https://github.com/GoogleChrome/workbox
[`os_detect`]: https://pub.dev/packages/os_detect

