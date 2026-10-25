# 建置與發佈 Web 應用程式

> 如何準備並發佈 Web 應用程式。



在一般的開發週期中，
你會在命令列介面 (Command Line Interface) 上使用 `flutter run -d chrome`
（例如）來測試應用程式。
這會建置出你的應用程式的 _debug_（除錯）版本。

本頁將協助你準備應用程式的 _release_（發佈）版本，
並涵蓋以下主題：

* [建置發佈版本的應用程式](#building-the-app-for-release)
* [Web 內容雜湊與 HTTP 快取](#web-content-hashing)
* [部署至 Web](#deploying-to-the-web)
* [部署至 Firebase Hosting](#deploying-to-firebase-hosting)
* [在 Web 上處理圖片](#handling-images-on-the-web)
* [選擇加入 WebAssembly](#opting-in-to-webassembly)
* [程式碼壓縮（Minification）](#minification)
* [行動瀏覽器 viewport 與 SafeArea](#mobile-browser-viewport-and-safearea)

## 建置發佈版本的應用程式

請使用 `flutter build web` 指令來建置應用程式以進行部署。

```console
flutter build web
```

若要使用 WebAssembly (Wasm) 建置你的應用程式，請加上 `--wasm` 旗標：

```console
flutter build web --wasm
```

這個動作會產生應用程式（包含資源），並將檔案放置在專案的 `/build/web` 目錄中。

若要驗證應用程式的發行版本（release build），請啟動一個網頁伺服器（例如 `python -m http.server 8000`，或使用 [dhttpd][] 套件），然後開啟 /build/web 目錄。在瀏覽器中前往 `localhost:8000`（以 Python SimpleHTTPServer 為例），即可檢視應用程式的發行版本。

## 其他建置旗標

你可能需要部署 profile 或 debug 版本以進行測試。
要這麼做，請在 `flutter build web` 指令中加入 `--profile` 或 `--debug` 旗標。
Profile 版本專為使用 Chrome DevTools 進行效能分析而設計，
Debug 版本則可用來設定 dart2js 以支援 assertion 並調整最佳化等級（可使用 `-O` 旗標）。

### Source maps

若要產生 source map，以便在當機回報服務中進行符號還原（symbolication），
請加上 `--source-maps` 旗標：

```console
flutter build web --source-maps
```

產生 source map 時，會在 `build/web` 目錄中建立獨立的 `.js.map` 或 `.wasm.map` 檔案
（或兩者皆有，視你的建置目標而定），
且不會為編譯後的輸出增加二進位檔的負擔。

:::warning 請將 source map 排除在公開託管之外
依預設，標準的 Web 部署工具會上傳 `build/web/` 中的所有檔案。
如果 source map 被公開部署，瀏覽器 DevTools 會自動下載它們，
進而暴露未壓縮的符號名稱、類別階層以及本機檔案路徑。

請在 CI/CD 期間將 `.map` 檔案上傳至你的私有錯誤監控服務
（例如 Sentry 或 Datadog），並將 `*.map` 檔案排除在公開的 Web 託管之外
（例如在 `firebase.json` 中使用 `"ignore": ["**/*.map"]`，或在部署前將其移除）。
:::

### Web 內容雜湊 (--web-content-hash) {:#web-content-hashing}

:::version-note
Web 內容雜湊（`--web-content-hash`）需要 Flutter 3.50 或更新版本。
:::

若要在多次部署之間啟用以內容為基礎的自動快取更新（cache busting），
請在 `flutter build web` 中加上 `--web-content-hash`：

```console
flutter build web --wasm --web-content-hash
```

啟用 `--web-content-hash` 後，Flutter 會將截短為 8 個字元的 SHA-256 內容雜湊，
嵌入編譯後的進入點以及 `build/web/assets/**` 下的所有檔案，
並將雜湊後的路徑記錄在 `flutter_bootstrap.js`（`_flutter.buildConfig`）中：

* **已雜湊的不可變檔案（`Cache-Control: public, max-age=31536000, immutable`）**：
  * 編譯後的進入點：`main.dart.<hash>.js`、`main.dart.<hash>.wasm` 以及
    `main.dart.<hash>.mjs`（若啟用 `--source-maps`，另有 `main.dart.<hash>.js.map` 與
    `main.dart.<hash>.mjs.map`）。
  * `assets/**` 下的所有檔案：包含 `AssetManifest.<hash>.bin`、
    `AssetManifest.bin.<hash>.json`、`FontManifest.<hash>.json`、
    `NOTICES.<hash>`、字型、圖片以及 `shaders/**`。
* **未雜湊的啟動與根目錄檔案（`Cache-Control: max-age=0, must-revalidate` 或 `no-cache`）**：
  * `index.html`、`flutter_bootstrap.js`、`flutter.js`、`manifest.json`、
    `version.json`、`404.html` 以及 `icons/**`。
  * 使用 `--no-web-resources-cdn` 建置時所內含的 `canvaskit/**` 檔案。
  * 使用 `--source-maps` 建置時的 `main.dart.wasm.map`（`.wasm`
    二進位檔的 `sourceMappingURL` 自訂區段所參照的是未雜湊的
    `.wasm.map` 檔名）。

如需完整的 `firebase.json` 範例，請參閱 [Web FAQ][web-faq-caching]。

:::note
無論是 JavaScript（`dart2js`）或 WebAssembly（`dart2wasm` /
`--enable-wasm-deferred-loading`）建置，`--web-content-hash` 目前都尚不支援延遲匯入（`deferred as`）。
:::

#### 針對作用中瀏覽器分頁的疊加部署

當你部署新版本（`N`）時，已開啟瀏覽器分頁且仍執行前一版本（`N-1`）的使用者，
可能會延遲載入（lazily fetch）檔名帶有 `N-1` 版本內容雜湊的資源、字型或圖片。

為避免在版本推出期間於工作階段中途出現 `404` 錯誤，
請採用**疊加部署（overlay deployment）**策略：

* 在你的 CDN 或儲存空間 bucket 中，除了 `N` 版本已雜湊的檔案之外，
  至少也保留前一版本（`N-1`）已雜湊的 `main.dart.*` 與
  `assets/**` 檔案（或在 24–72 小時的寬限期後清除舊的雜湊檔案）。
* 最後再以原子（atomic）方式更新 `index.html` 與 `flutter_bootstrap.js`。
* 將 `/assets/**`、`/canvaskit/**`、`/icons/**` 與 `/main.dart.*` 排除在
  單頁應用程式（SPA）的 `/index.html` 全域改寫（catch-all rewrite）規則之外，
  這樣找不到的資源就會回傳真正的 `404`，而不是 `200 text/html`。

#### 自訂 service worker（`precache_manifest.json`）

啟用 `--web-content-hash` 後，`flutter build web` 會將物料清單（bill of materials）
寫入 `build/web/precache_manifest.json`：

```json title="build/web/precache_manifest.json"
{
  "version": 1,
  "entries": [
    {
      "url": "flutter_bootstrap.js",
      "hash": "a1b2c3d4",
      "size": 10432,
      "urlHashed": false
    },
    {
      "url": "main.dart.f215ce97.wasm",
      "hash": "f215ce97",
      "size": 1842104,
      "urlHashed": true
    }
  ]
}
```

自訂的 PWA service worker 或 [Workbox][] 管線可以直接使用
`precache_manifest.json`（傳入 `revision: entry.urlHashed ? null : entry.hash`，
以避免 URL 已雜湊的檔案因查詢參數而被重複快取）。

## 選擇加入 WebAssembly

若要針對 WebAssembly 編譯並最佳化你的應用程式，
請在執行或建置時使用 `--wasm` 旗標。

如需更多資訊，請參閱 [Support for WebAssembly (Wasm)][Wasm support]。

:::important 提供 WebAssembly 建置
WebAssembly 建置使用多執行緒以提升渲染效能，
並要求你的網頁伺服器回傳特定的 COEP/COOP HTTP 回應標頭
（`Cross-Origin-Embedder-Policy: credentialless` 與
`Cross-Origin-Opener-Policy: same-origin`）。
完整細節請參閱 [Support for WebAssembly (Wasm)][Wasm support]。
:::

## 部署至 Web

當你準備好部署應用程式時，請將發行套件（release bundle）上傳至 Firebase、雲端或其他類似服務。以下是幾種常見選擇，當然還有其他方式：

* [Firebase Hosting][]
* [GitHub Pages][]
* [Google Cloud Hosting][]

## 部署至 Firebase Hosting

你可以使用 Firebase CLI 來建置並釋出 Flutter 應用程式至 Firebase Hosting。

### 開始之前

首先，請[安裝或更新][install-firebase-cli] Firebase CLI：

```console
npm install -g firebase-tools
```

### 初始化 Firebase

1. 在 [Firebase framework-aware CLI][] 啟用 Web 框架預覽功能：

    ```console
    firebase experiments:enable webframeworks
    ```

2. 在一個空的目錄或現有的 Flutter 專案中，執行初始化指令：

    ```console
    firebase init hosting
    ```

3. 當系統詢問是否要使用 web framework（網頁框架）時，請選擇 `yes`。

4. 如果你目前位於一個空的目錄中，系統會要求你選擇你的 web framework，請選擇 `Flutter Web`。

5. 選擇你的 Hosting 原始目錄（hosting source directory）；這可以是一個現有的 Flutter 應用程式。

6. 選擇一個區域來託管你的檔案。

7. 選擇是否要與 GitHub 設定自動建置與部署。

8. 將應用程式部署到 Firebase Hosting：

    ```console
    firebase deploy
    ```

    執行此指令會自動執行 `flutter build web --release`，
    因此你不需要另外進行應用程式的建置步驟。

如需進一步了解，請參閱官方 [Firebase Hosting][]
Flutter Web 文件。

## 在 Web 上處理圖片

Web 支援標準的 `Image` 元件（Widget）來顯示圖片。
基於設計，網頁瀏覽器會執行不受信任的程式碼，同時不會危害主機電腦。
這使得在圖片處理方面，Web 相較於行動裝置和桌面平台有更多限制。

如需更多資訊，請參閱 [Displaying images on the web][]。

## 程式碼壓縮（Minification）

為了提升應用程式啟動速度，編譯器會透過移除未使用的程式碼（稱為 _tree shaking_ 樹狀搖晃），以及將程式碼符號重新命名為更短的字串（例如將 `AlignmentGeometryTween` 重新命名為像是 `ab`）來減少編譯後程式碼的大小。這兩種最佳化方式的應用，取決於建置模式：

| Web 應用程式建置類型 | 程式碼壓縮？ | 是否執行 tree shaking？ |
|-----------------------|--------------|-------------------------|
| debug                 | 否           | 否                      |
| profile               | 否           | 是                      |
| release               | 是           | 是                      |

## 行動瀏覽器 viewport 與 SafeArea {:#mobile-browser-viewport-and-safearea}

:::version-note
支援 `viewport-fit=cover` 的 `SafeArea` 內縮（inset），
以及在瀏覽器歷史紀錄中保留 URL 百分比編碼（percent-encoding），
需要 Flutter 3.50 或更新版本。
:::

在具有螢幕切口、瀏海或 Home 指示條的行動瀏覽器（例如 iOS Safari 與 Android Chrome）上，
Flutter Web 預設會在瀏覽器的安全區域內進行渲染（`viewport-fit=contain`）。

若要橫跨整個螢幕進行邊到邊（edge-to-edge）渲染，
並以瀏覽器的 CSS `env(safe-area-inset-*)` 內縮值填入 Flutter 的
[`SafeArea`][] 與 [`MediaQuery.paddingOf`][]，
請在 `web/index.html` 檔案的 `<head>` 中加入帶有
`viewport-fit=cover` 的 `<meta name="viewport">` 標籤
（新建立的 `web/index.html` 範本中已將其以註解形式附上作為選項）：

```html title="web/index.html"
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

:::note
如果現有的 Web 應用程式已在 `web/index.html` 中包含 `viewport-fit=cover`，
Flutter 3.50 與更新版本會遵循它，而不是將其移除，
這會導致應用程式渲染到裝置切口後方，除非 UI 控制項
被包在 [`SafeArea`][] 元件中。如需遷移細節，請參閱
[`viewport-fit=cover` SafeArea 重大變更指南][viewport-fit-breaking]。
:::

### 瀏覽器歷史紀錄中的 URL 百分比編碼

在 Flutter 3.50 與更新版本中，傳給
`SystemNavigator.routeInformationUpdated` 的路由字串，
在寫入瀏覽器網址列與歷史紀錄時，會保留百分比編碼序列
（例如 `%2F`、`%26`、`%23` 與 `%20`），
而不是使用 `Uri.decodeComponent` 將其解碼。

## 將 Flutter 應用程式嵌入 HTML 頁面

請參閱 [Embedding Flutter web][]。

[Embedding Flutter web]: /platform-integration/web/embedding-flutter-web

[dhttpd]: https://pub.dev/packages/dhttpd
[Displaying images on the web]: /platform-integration/web/web-images
[Firebase Hosting]: https://firebase.google.com/docs/hosting/frameworks/flutter
[Firebase framework-aware CLI]: https://firebase.google.com/docs/hosting/frameworks/frameworks-overview
[install-firebase-cli]: https://firebase.google.com/docs/cli#install_the_firebase_cli
[GitHub Pages]: https://pages.github.com/
[give us feedback]: https://github.com/flutter/flutter/issues/new?title=%5Bweb%5D:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[Google Cloud Hosting]: https://cloud.google.com/solutions/web-hosting
[`MediaQuery.paddingOf`]: https://api.flutter.dev/flutter/widgets/MediaQuery/paddingOf.html
[`SafeArea`]: https://api.flutter.dev/flutter/widgets/SafeArea-class.html
[viewport-fit-breaking]: /release/breaking-changes/viewport-fit-cover-safe-area
[Wasm support]: /platform-integration/web/wasm
[web-faq-caching]: /platform-integration/web/faq#how-do-i-configure-my-cache-headers
[Workbox]: https://github.com/GoogleChrome/workbox

