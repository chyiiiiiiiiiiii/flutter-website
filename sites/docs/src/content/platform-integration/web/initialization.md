---
title: Flutter 網頁應用程式初始化
description: 自訂 Flutter 應用程式在網頁上的初始化方式。
---

本頁說明 Flutter 網頁應用程式的初始化流程，以及如何進行自訂。

## 啟動（Bootstrapping）

`flutter build web` 指令會在建置輸出目錄（`build/web`）中產生一個名為 `flutter_bootstrap.js` 的指令碼。
這個檔案包含初始化及執行您的 Flutter 應用程式所需的 JavaScript 程式碼。
您可以在 Flutter 應用程式的 `web` 子目錄下的 `index.html` 檔案中，透過加入一個 async-script 標籤來使用這個指令碼：

```html highlightLines=3
<html>
  <body>
    <script src="flutter_bootstrap.js" async></script>
  </body>
</html>
```

或者，您也可以將整個 `flutter_bootstrap.js` 檔案的內容直接內嵌，只需在您的 `index.html` 檔案中插入樣板標記 `{% raw %}{{flutter_bootstrap_js}}{% endraw %}`：

```html highlightLines=4
<html>
  <body>
    <script>
      {% raw %}{{flutter_bootstrap_js}}{% endraw %}
    </script>
  </body>
</html>
```

在建置步驟期間，當 `index.html` 檔案被複製到輸出目錄（`build/web`）時，`{% raw %}{{flutter_bootstrap_js}}{% endraw %}` 標記會被替換為 `flutter_bootstrap.js` 檔案的內容。

<a id="customizing-initialization" aria-hidden="true"></a>

## 自訂初始化

預設情況下，`flutter build web` 會產生一個 `flutter_bootstrap.js` 檔案，該檔案會對你的 Flutter 應用程式進行簡單的初始化。
然而，在某些情境下，你可能會有理由自訂這個初始化流程，例如：

* 為你的應用程式設定自訂的 Flutter 設定。
* 整合自訂 service worker，以支援離線使用或快取。
* 撰寫自訂 JavaScript 程式碼，以便在啟動流程的不同階段執行。

如果你想撰寫自己的自訂啟動（bootstrapping）邏輯，而不是使用建置步驟產生的預設指令碼，你可以在專案的 `web` 子目錄中放置一個 `flutter_bootstrap.js` 檔案，這個檔案會被複製並取代建置產生的預設指令碼。
這個檔案同樣支援樣板語法，你可以插入多個特殊標記，建置步驟在複製 `flutter_bootstrap.js` 檔案到輸出目錄時，會於建置時將這些標記替換為對應內容。
下表列出了建置步驟會在 `flutter_bootstrap.js` 或 `index.html` 檔案中進行替換的標記：

| 標記 | 替換內容 |
|---|---|
| `{% raw %}{{flutter_js}}{% endraw %}` | 使 `FlutterLoader` 物件可用於 `_flutter.loader` 全域變數的 JavaScript 程式碼。（詳情請參閱下方 `_flutter.loader.load() API` 章節。） |
| `{% raw %}{{flutter_build_config}}{% endraw %}` | 一個 JavaScript 陳述式，用來設定建置流程產生的中繼資料，這些資料會提供 `FlutterLoader` 啟動應用程式所需的資訊。 |
| `{% raw %}{{flutter_service_worker_version}}{% endraw %}` | **已棄用。** 先前用來替換 Flutter 舊版 service worker 載入器的建置版本號。Flutter 不再產生或註冊快取用的 service worker；請參閱 [Service worker 棄用](#service-worker-version-deprecation) 與 [Web FAQ](/platform-integration/web/faq#how-do-i-configure-a-service-worker)。 |
| `{% raw %}{{flutter_bootstrap_js}}{% endraw %}` | 如上所述，這會將 `flutter_bootstrap.js` 檔案的內容直接嵌入到 `index.html` 檔案中。請注意，此標記僅能用於 `index.html`，不能用於 `flutter_bootstrap.js` 檔案本身。 |

{:.table}

<a id="write-a-custom-flutter_bootstrap-js" aria-hidden="true"></a>

## 撰寫自訂啟動指令碼 {:#custom-bootstrap-js}

任何自訂的 `flutter_bootstrap.js` 指令碼，為了能順利啟動你的 Flutter 應用程式，都需要包含以下三個元件：

* 一個 `{% raw %}{{flutter_js}}{% endraw %}` 標記，
  以便讓 `_flutter.loader` 可用。
* 一個 `{% raw %}{{flutter_build_config}}{% endraw %}` 標記，
  這會將建置相關資訊提供給
  啟動應用程式所需的 `FlutterLoader`。
* 一次對 `_flutter.loader.load()` 的呼叫，這會實際啟動應用程式。

最基本的 `flutter_bootstrap.js` 檔案會像這樣：

```js
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

_flutter.loader.load();
```

:::tip 與 `--web-content-hash` 的相容性
當你使用 [`flutter build web --web-content-hash`][web-content-hashing] 建置時，
Flutter 會將帶有內容雜湊的 entrypoint 檔名（`mainJsPath`、
`mainWasmPath`、`jsSupportRuntimePath`）以及雜湊後的資源清單對應
（`assetManifest`、`fontManifest`、`extraAssets`）注入到
`{% raw %}{{flutter_build_config}}{% endraw %}` 中。自訂的 `web/index.html` 或
`web/flutter_bootstrap.js` 檔案必須包含
`{% raw %}{{flutter_build_config}}{% endraw %}` 並呼叫 `_flutter.loader.load()`，
而不是寫死 `"main.dart.js"`，也不要呼叫已棄用的
`FlutterLoader.loadEntrypoint()` API。
:::

[web-content-hashing]: /deployment/web#web-content-hashing

## 自訂 Flutter 載入器

可以使用 `_flutter.loader.load()` JavaScript API，並帶入選用參數來自訂初始化行為：

| 名稱                    | 說明                                                                                                                   | JS&nbsp;型別 |
|-------------------------|------------------------------------------------------------------------------------------------------------------------|--------------|
| `config`                | 您應用程式的 Flutter 設定。                                                                                        | `Object`     |
| `onEntrypointLoaded`    | 當引擎準備好初始化時會呼叫的函式。僅接收一個 `engineInitializer` 物件作為參數。 | `Function`   |

{:.table}

`config` 參數是一個物件，可包含下列選用欄位：

| 名稱 | 說明 | Dart&nbsp;型別 |
|---|---|---|
|`assetBase`| 應用程式 `assets` 目錄的基礎 URL。當 Flutter 從與實際網頁應用程式不同的網域或子目錄載入時，請加入此設定。當您將 Flutter web 嵌入到其他應用程式，或將其資源部署到 CDN 時，可能會需要這個設定。 |`String`|
|`canvasKitBaseUrl`| `canvaskit.wasm` 下載來源的基礎 URL。 |`String`|
|`canvasKitVariant`| 要下載的 CanvasKit 變體。選項包含：<br><br>1. `auto`：下載最適合瀏覽器的變體。預設為此值。<br>2. `full`：下載適用於所有瀏覽器的完整 CanvasKit 變體。<br>3. `chromium`：下載較小的 CanvasKit 變體，僅使用 Chromium 相容 API。**_警告_**：除非您只打算支援 Chromium-based 瀏覽器，否則請勿使用 `chromium` 選項。 |`String`|
|`canvasKitForceCpuOnly`| 當 `true` 時，強制 CanvasKit 僅使用 CPU 繪製（引擎不會使用 WebGL）。 |`bool`|
|`canvasKitMaximumSurfaces`| CanvasKit 渲染器可使用的最大疊加層數量。 |`double`|
|`debugShowSemanticsNodes`| 若設為 `true`，Flutter 會將語意樹直接顯示在畫面上（用於除錯）。 |`bool`|
|`entrypointBaseUrl`| 您的 Flutter 應用程式進入點的基礎 URL。預設為 "/"。 |`String`|
|`fontFallbackBaseUrl`| 當內建字型缺少所需字形時，下載備用字型的基礎 URL。預設為 `"https://fonts.gstatic.com/s/"`。 |`String`|
|`forceSingleThreadedSkwasm`| 強制使用單執行緒 SkWasm 模式以確保相容性（僅影響以 `--wasm` 編譯、且在執行時選擇 [WebAssembly][wasm-support] 的應用程式）。 |`bool`|
|`hostElement`| Flutter 要渲染應用程式的 HTML 元素（請參閱[嵌入 Flutter 視圖][embedding-flutter-web]）。若未設定，Flutter web 會接管整個頁面。 |`HtmlElement`|
|`multiViewEnabled`| 啟用多視圖模式，以便動態地將 [Flutter 視圖嵌入][embedding-flutter-web]到宿主 DOM 元素中。 |`bool`|
|`nonce`| 套用於引擎所建立之內嵌指令碼與樣式的 [Content Security Policy (CSP) nonce][nonce-mdn] 字串。 |`String`|
|`renderer`| 明確強制指定渲染器為 `'canvaskit'` 或 `'skwasm'`。 |`String`|
|`suppressMultithreadingWarning`| 當 `true` 時，會抑制因缺少 `Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy` 標頭而使 `skwasm` 以單執行緒執行時，在主控台記錄的警告。 |`bool`|
|`verboseBuildSelection`| 當 `true` 時，會以 `console.warn` 記錄詳細診斷資訊，說明 `_flutter.buildConfig.builds` 中每個候選建置為何被選用或略過。 |`bool`|
|`wasmAllowList`| 瀏覽器引擎允許清單（`{ blink?: boolean, webkit?: boolean, gecko?: boolean, unknown?: boolean }`），用來控制在執行時 WebAssembly 功能探測通過時，哪些瀏覽器引擎可以執行 `skwasm` + `dart2wasm` 建置（請參閱[WebAssembly 支援][wasm-support]）。預設為 `{ blink: true, gecko: false, webkit: false, unknown: false }`。 |`Object`|
|`wasmDeferredModulesLoader`| 自訂的 `(moduleNames: string[], onModuleLoaded: (moduleName: string, bytes: Uint8Array) => Promise<void>) => Promise<void>` hook，在啟用 `--enable-wasm-deferred-loading` 時，用來擷取延遲載入的 `.wasm` 模組。 |`Function`|

{:.table}

[embedding-flutter-web]: /platform-integration/web/embedding-flutter-web
[nonce-mdn]: https://developer.mozilla.org/docs/Web/HTML/Global_attributes/nonce
[wasm-support]: /platform-integration/web/wasm

## forceSingleThreadedSkwasm

這是一個布林旗標，用來強制 Skia WebAssembly（skwasm）渲染器以**單執行緒模式**執行。適用於以下情境：

* 您的環境不支援多執行緒 WASM。例如，
  `SharedArrayBuffer` 不可用或缺少必要的安全性標頭。
* 您想要最大程度地相容各種瀏覽器。
* 使用 `false`（預設值）可在支援的情況下啟用多執行緒渲染，以提升效能。

## 範例用法

```js
_flutter.loader.load({
  config: {
    forceSingleThreadedSkwasm: true,
    wasmAllowList: {
      blink: true,
      webkit: true,
      gecko: true,
    },
  },
});
```

## 範例：根據 URL 查詢參數自訂 Flutter 設定

以下範例展示了一個自訂的 `flutter_bootstrap.js`，會在 URL 中存在 `force_st` 查詢參數時啟用單執行緒模式：

```js
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

const searchParams = new URLSearchParams(window.location.search);
const forceSt = searchParams.has('force_st');
const userConfig = forceSt ? { forceSingleThreadedSkwasm: true } : {};
_flutter.loader.load({
  config: userConfig,
});
```

此腳本會評估頁面的 `URLSearchParams`，以判斷使用者是否傳遞了 `force_st` 查詢參數，並據此設定應用程式。

## onEntrypointLoaded 回呼函式

你也可以將 `onEntrypointLoaded` 回呼（callback）函式傳入 `load` API，以便在初始化流程的不同階段執行自訂邏輯。初始化流程分為以下幾個階段：

**載入 entrypoint 腳本**
: `load` 函式會在主要 entrypoint 腳本已由瀏覽器下載並執行後，呼叫 `onEntrypointLoaded` 回呼（callback）函式。
  Flutter 也會在開發期間每次熱重啟時呼叫 `onEntrypointLoaded`。

**初始化 Flutter 執行引擎**
: `onEntrypointLoaded` 回呼（callback）函式會接收一個 **engine initializer** 物件作為唯一參數。
  使用 engine initializer 的 `initializeEngine()` 函式來設定執行時組態（如 `multiViewEnabled: true`），並啟動 Flutter Web 執行引擎。

**執行應用程式**
: `initializeEngine()` 函式會回傳一個 [`Promise`][js-promise]，該物件解析後會得到一個 **app runner** 物件。app runner 物件有一個方法 `runApp()`，可用來執行 Flutter 應用程式。

**向應用程式新增或移除視圖**
: `runApp()` 方法會回傳一個 **flutter app** 物件。
  在多視圖模式下，可以使用 `addView` 與 `removeView` 方法，從主應用程式管理應用程式的視圖。
  想了解更多，請參考[嵌入模式][embedded-mode]。

[embedded-mode]: /platform-integration/web/embedding-flutter-web#embedded-mode
[js-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

:::warning
當你提供自己的 `onEntrypointLoaded` 回呼（callback）時，
傳給 `_flutter.loader.load()` 的 `config`**不會**自動轉交給引擎。
只有在你省略 `onEntrypointLoaded`、由載入器啟動應用程式時，
Flutter 才會幫你套用該 `config`。

在自訂回呼中，請自行將設定傳給 `initializeEngine()`，
否則設定會被靜默忽略：

```js
_flutter.loader.load({
  onEntrypointLoaded: async function(engineInitializer) {
    const appRunner = await engineInitializer.initializeEngine({
      // Set your run-time configuration here.
      renderer: 'canvaskit',
    });
    await appRunner.runApp();
  },
});
```

:::

## 範例：顯示進度指示器

為了在初始化流程期間，讓你的應用程式使用者獲得回饋，
可以利用每個階段所提供的 hooks 來更新 DOM：

```js
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

const loading = document.createElement('div');
document.body.appendChild(loading);
loading.textContent = "Loading Entrypoint...";
_flutter.loader.load({
  onEntrypointLoaded: async function(engineInitializer) {
    loading.textContent = "Initializing engine...";
    // If you have a `config`, pass it here. The config given to `load()`
    // is not forwarded when you supply your own `onEntrypointLoaded`.
    const appRunner = await engineInitializer.initializeEngine();

    loading.textContent = "Running app...";
    await appRunner.runApp();
  }
});
```

## 常見警告 {:#common-warnings}

本節說明常見的網頁建置與初始化警告，以及如何解決。

### Service worker 棄用 {:#service-worker-version-deprecation}

如果你在執行 `flutter build web` 期間遇到類似以下的警告：

```text
Warning: In index.html:37: Flutter's service worker is deprecated and will be removed in a future Flutter release.
See https://github.com/flutter/flutter/issues/156910 for more details.
```

請從你的 `web/index.html` 或自訂的
`web/flutter_bootstrap.js` 檔案中，移除舊版 service worker 變數、註冊呼叫與
`serviceWorkerSettings`：

```js
// Remove legacy serviceWorkerVersion declarations:
var serviceWorkerVersion = null;
const serviceWorkerVersion = null;

// Remove legacy flutter_service_worker.js registration calls:
navigator.serviceWorker.register('flutter_service_worker.js');

// Remove serviceWorkerSettings from _flutter.loader.load():
_flutter.loader.load({
  serviceWorkerSettings: {
    serviceWorkerVersion: {% raw %}{{flutter_service_worker_version}}{% endraw %},
  },
});
```

如果你的應用程式需要自訂 service worker，請參閱
[Web FAQ](/platform-integration/web/faq#how-do-i-configure-a-service-worker)
以及 [Web 內容雜湊（`precache_manifest.json`）][web-content-hashing]。

### FlutterLoader.loadEntrypoint 棄用

如果你遇到類似以下的警告：

```text
Warning: In index.html:40: "FlutterLoader.loadEntrypoint" is deprecated.
Use "FlutterLoader.load" instead.
```

當較舊的 `web/index.html` 檔案使用 `_flutter.loader.loadEntrypoint()`
而非 `_flutter.loader.load()` 時，就會出現此警告。
CLI 訊息中提到的是 `FlutterLoader` 介面，
JavaScript 程式碼則是透過 `_flutter.loader` 來存取它。

如果你的應用程式使用預設初始化，且不需要自訂啟動邏輯，
請將 `web/index.html` 中舊版的指令碼區塊替換為標準的 script 標籤：

```html title="web/index.html"
<script src="flutter_bootstrap.js" async></script>
```

如果你自訂了初始化邏輯，
請更新 `web/index.html`
（或自訂的 `web/flutter_bootstrap.js` 檔案）中的啟動程式碼，
改為呼叫 `_flutter.loader.load()`：

```js
_flutter.loader.load({
  onEntrypointLoaded: async function(engineInitializer) {
    const appRunner = await engineInitializer.initializeEngine();
    await appRunner.runApp();
  }
});
```

若要查看在啟動期間更新 DOM 元素的範例，
請參閱[進度指示器範例][progress indicator example]。

[progress indicator example]: #example-display-a-progress-indicator
