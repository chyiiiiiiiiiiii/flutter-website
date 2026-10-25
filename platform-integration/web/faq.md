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

有些套件需要平台特定的匯入，特別是如果它們使用檔案系統（瀏覽器無法存取）。若要在你的應用程式中使用這些套件，請使用條件匯入（conditional imports）。

編譯為 WebAssembly 時，請檢查 `dart.library.js_interop`
（而不是 Wasm 不支援的 `dart.library.js` 或 `dart.library.html`）：

```dart
import 'fallback.dart'
  if (dart.library.js) 'legacy_web_interop.dart'
  if (dart.library.js_interop) 'wasm_web_interop.dart';
```

如需更多細節，請參閱 [dart.dev](https://dart.dev) 上的 [條件匯入（conditional imports）文件][documentation for conditional imports]。若想了解如何處理因不支援的匯入而導致的 Wasm 編譯失敗，請參閱
[診斷 Wasm 編譯錯誤](/platform-integration/web/wasm#diagnosing-wasm-compilation-errors)。

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

在 Flutter 3.50 及更新版本中，建置 Web 應用程式時請傳入 `--web-content-hash`：

```console
$ flutter build web --web-content-hash
```

`--web-content-hash` 旗標會將 8 個字元的 SHA-256 內容雜湊值嵌入
已編譯的進入點、JavaScript source map，以及 `build/web/assets/**` 底下的所有檔案，
並自動更新 `flutter_bootstrap.js` 中對它們的參照。
如需完整的雜湊檔案清單與 overlay 上線指引，
請參閱 [Web content hashing](/deployment/web#web-content-hashing)。

如果你沒有使用 `--web-content-hash`，可以手動在 bootstrap 腳本標籤中加入 build ID 查詢參數或具版本的檔名：

```html
<!-- Option 1, append build ID as a query parameter in your links -->
<script src="flutter_bootstrap.js?v=123" async></script>

<!-- Option 2, update the filename and update your links -->
<script src="flutter_bootstrap.v123.js" async></script>
```

### 如何設定快取標頭（cache headers）？

如果你正在使用 Firebase Hosting，當你部署新版本的應用程式時，共用快取（CDN）會被自動失效（invalidate）。不過，Firebase Hosting 預設會對靜態檔案設定 `Cache-Control: max-age=3600`，
這表示在部署後最長一小時內，瀏覽器仍可能提供過期的 `index.html`、
`flutter_bootstrap.js` 或 manifest 檔案。

如果你使用 `flutter build web --web-content-hash` 建置，請設定
`firebase.json`，讓 `index.html`、`flutter_bootstrap.js` 和 `404.html`
在每次載入時重新驗證（`max-age=0, must-revalidate`），
而有雜湊的進入點與 `assets/**` 則以 immutable 方式快取一年
（`public, max-age=31536000, immutable`）：

```json
{
  "hosting": {
    "public": "build/web",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "**/*.map"
    ],
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=0, must-revalidate"
          }
        ]
      },
      {
        "source": "assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "main.dart.*.+(js|wasm|mjs)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "404.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=0, must-revalidate"
          }
        ]
      }
    ],
    "rewrites": [
      {
        "source": "!(/assets/**|/canvaskit/**|/icons/**|/main.dart.*)",
        "destination": "/index.html"
      }
    ]
  }
}
```

如果你建置時沒有使用 `--web-content-hash`，請省略 `assets/**` 與
`main.dart.*.+(js|wasm|mjs)` 的 `immutable` 規則，讓所有檔案都透過
`"source": "**"` 與 `"source": "404.html"`（`max-age=0, must-revalidate`）重新驗證，
未變更時即可從 CDN 邊緣節點取得快速的 `304 Not Modified` 回應。

`/index.html` rewrite 的排除規則
（`!(/assets/**|/canvaskit/**|/icons/**|/main.dart.*)`）可確保
對不存在的資源或已編譯進入點的請求會回傳真正的 `404` 狀態，
而不是狀態為 `200 OK` 的 `index.html`；
`404.html` 規則則可防止 CDN 在萬用字元 TTL 下快取 404 回應。

### 如何設定 service worker？

Flutter 預設不再產生或管理會快取的 service worker
（在較新的版本中，它會寫入一個會自我清除的 stub，用來移除舊版 service worker）。

如果你的應用程式需要離線支援或進階快取功能，你需要自行使用標準的 Web 工具或第三方解決方案（例如 [Workbox][workbox]）來設定 service worker。
使用 `--web-content-hash` 建置時，Flutter 會產生
`build/web/precache_manifest.json`，其中包含 `{url, hash, size, urlHashed}`
項目，你可以將它們餵入自訂 service worker 的建置流程。

如需更多關於建置自訂 service worker 的資訊，請參閱 [Using service workers][]。

[building a web app with Flutter]: /platform-integration/web/building
[Creating responsive apps]: /ui/adaptive-responsive
[documentation for conditional imports]: https://dart.dev/interop/js-interop/package-web#conditional-imports
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

