---
title: Flutter 網頁應用程式初始化
description: 自訂 Flutter 應用程式在網頁上的初始化方式。
---

本頁說明 Flutter 網頁應用程式的初始化流程，以及如何進行自訂。

## 啟動（Bootstrapping）

`flutter build web` 指令會在建置輸出目錄（`build/web`）中產生一個名為 `flutter_bootstrap.js` 的指令碼（script）。
這個檔案包含初始化與執行 Flutter 應用程式所需的 JavaScript 程式碼。
你可以在 Flutter 應用程式的 `web` 子目錄下的 `index.html` 檔案中，透過加入一個 async-script 標籤來使用這個指令碼：

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

`{% raw %}{{flutter_bootstrap_js}}{% endraw %}` 這個 token 會在建置步驟中，當 `index.html` 檔案被複製到輸出目錄（`build/web`）時，替換為 `flutter_bootstrap.js` 檔案的內容。

<a id="customizing-initialization" aria-hidden="true"></a>

## 自訂初始化流程

預設情況下，`flutter build web` 會產生一個 `flutter_bootstrap.js` 檔案，該檔案會對你的 Flutter 應用程式進行簡單的初始化。
然而，在某些情境下，你可能會有理由自訂這個初始化流程，例如：

* 為你的應用程式設定自訂的 Flutter 設定。
* 更改 Flutter service worker 的設定。
* 撰寫自訂的 JavaScript 程式碼，以便在啟動流程的不同階段執行。

如果你想撰寫自己的自訂 bootstrapping 邏輯，而不是使用建置步驟產生的預設腳本，可以將 `flutter_bootstrap.js` 檔案放在專案的 `web` 子目錄下，這個檔案會被複製並取代建置產生的預設腳本。
這個檔案同樣支援模板語法，你可以插入多個特殊 token，建置步驟會在複製 `flutter_bootstrap.js` 檔案到輸出目錄時進行替換。
下表列出建置步驟會在 `flutter_bootstrap.js` 或 `index.html` 檔案中替換的 token：

| Token | 替換內容 |
|---|---|
| `{% raw %}{{flutter_js}}{% endraw %}` | 讓 `FlutterLoader` 物件可在 `_flutter.loader` 全域變數中使用的 JavaScript 程式碼。（詳情請參見下方 `_flutter.loader.load() API` 章節。） |
| `{% raw %}{{flutter_build_config}}{% endraw %}` | 一個 JavaScript 陳述式，設定建置流程產生的中繼資料，這些資料會提供 `FlutterLoader` 正確啟動應用程式所需的資訊。 |
| `{% raw %}{{flutter_service_worker_version}}{% endraw %}` | 一個代表 service worker 建置版本的唯一數字，可作為 service worker 設定的一部分傳遞（詳見下方「常見警告」說明）。 |
| `{% raw %}{{flutter_bootstrap_js}}{% endraw %}` | 如上所述，這會將 `flutter_bootstrap.js` 檔案的內容直接內嵌到 `index.html` 檔案中。請注意，此 token 僅能用於 `index.html`，不能用於 `flutter_bootstrap.js` 檔案本身。 |

{:.table}

<a id="write-a-custom-flutter_bootstrap-js" aria-hidden="true"></a>

## 撰寫自訂 bootstrap 腳本 {:#custom-bootstrap-js}

任何自訂的 `flutter_bootstrap.js` 腳本都必須包含三個元件，才能成功啟動你的 Flutter 應用程式：

* `{% raw %}{{flutter_js}}{% endraw %}` token，
  讓 `_flutter.loader` 可用。
* `{% raw %}{{flutter_build_config}}{% endraw %}` token，
  提供關於建置的資訊給
  `FlutterLoader`，以啟動你的應用程式。
* 呼叫 `_flutter.loader.load()`，實際啟動應用程式。

最基本的 `flutter_bootstrap.js` 檔案會如下所示：

```js
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

_flutter.loader.load();
```

## 自訂 Flutter 載入器

可以使用 `_flutter.loader.load()` JavaScript API，並傳入選用參數，
以自訂初始化行為：

| 名稱                    | 說明                                                                                                                   | JS&nbsp;型別 |
|-------------------------|------------------------------------------------------------------------------------------------------------------------|--------------|
| `config`                | 您的應用程式的 Flutter 設定。                                                                                        | `Object`     |
| `onEntrypointLoaded`    | 當引擎準備好初始化時會呼叫的函式。僅接收一個 `engineInitializer` 物件作為參數。 | `Function`   |

{:.table}

`config` 參數是一個物件，可包含以下選用欄位：

| 名稱 | 說明 | Dart&nbsp;型別 |
|---|---|---|
|`assetBase`| 應用程式 `assets` 目錄的基礎 URL。當 Flutter 從與實際網頁應用程式不同的網域或子目錄載入時，請加入此設定。當您將 Flutter Web 嵌入其他應用程式，或將其資源部署到 CDN 時，可能會需要這個設定。 |`String`|
|`canvasKitBaseUrl`| `canvaskit.wasm` 下載的基礎 URL。 |`String`|
|`canvasKitVariant`| 要下載的 CanvasKit 變體。選項包含：<br><br>1. `auto`：下載最適合瀏覽器的變體。預設為此值。<br>2. `full`：下載可在所有瀏覽器運作的完整 CanvasKit 變體。<br>3. `chromium`：下載較小的 CanvasKit 變體，僅使用 Chromium 相容 API。**_警告_**：除非您只打算支援 Chromium-based 瀏覽器，否則請勿使用 `chromium` 選項。 |`String`|
|`canvasKitForceCpuOnly`| 當 `true` 時，強制 CanvasKit 僅使用 CPU 繪圖（引擎不會使用 WebGL）。 |`bool`|
|`canvasKitMaximumSurfaces`| CanvasKit 繪圖引擎可使用的最大疊加層數量。 |`double`|
|`debugShowSemanticNodes`| 若設為 `true`，Flutter 會在畫面上顯示語意樹（用於除錯）。  |`bool`|
|`entrypointBaseUrl`| 您的 Flutter 應用程式進入點的基礎 URL。預設為 "/"。  |`String`|
|`hostElement`| Flutter 要渲染應用程式的 HTML 元素。若未設定，Flutter Web 會接管整個頁面。 |`HtmlElement`|
|`renderer`| 指定目前 Flutter 應用程式的 [web renderer][web-renderers]，可選擇 `"canvaskit"` 或 `"skwasm"`。 |`String`|

{:.table}

[web-renderers]: /platform-integration/web/renderers

## 範例：根據 URL 查詢參數自訂 Flutter 設定

以下範例展示了一個自訂的 `flutter_bootstrap.js`，允許
使用者透過在網站 URL 中提供 `renderer` 查詢參數
（例如：`?renderer=skwasm`）來選擇渲染器：

```js
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

const searchParams = new URLSearchParams(window.location.search);
const renderer = searchParams.get('renderer');
const userConfig = renderer ? {'renderer': renderer} : {};
_flutter.loader.load({
  config: userConfig,
});
```

此腳本會評估頁面的`URLSearchParams`，以判斷使用者是否傳遞了`renderer`查詢參數，然後變更 Flutter 應用程式的使用者設定。

## onEntrypointLoaded 回呼函式

你也可以將`onEntrypointLoaded`回呼函式傳入`load` API，以便在初始化流程的不同階段執行自訂邏輯。初始化流程分為以下幾個階段：

**載入 entrypoint 腳本**
: `load` 函式會在 Service Worker 初始化完成，且`main.dart.js` entrypoint 已由瀏覽器下載並執行後，呼叫`onEntrypointLoaded`回呼函式。
  Flutter 也會在開發期間的每次熱重啟時呼叫`onEntrypointLoaded`。

**初始化 Flutter 引擎**
: `onEntrypointLoaded`回呼函式會接收一個**engine initializer**（引擎初始化器）物件作為唯一參數。
  使用 engine initializer 的`initializeEngine()`函式來設定執行時組態，例如`multiViewEnabled: true`，並啟動 Flutter Web 引擎。

**執行應用程式**
: `initializeEngine()`函式會回傳一個[`Promise`][js-promise]，該物件解析後會得到一個**app runner**（應用程式執行器）物件。app runner 具有一個方法`runApp()`，可用來執行 Flutter 應用程式。

**將視圖加入（或從應用程式移除視圖）**
: `runApp()`方法會回傳一個**flutter app**物件。
  在多視圖模式下，可使用`addView`與`removeView`方法，從主應用程式管理應用程式視圖。
  想了解更多，請參閱[嵌入模式][embedded-mode]。

[embedded-mode]: {{site.docs}}/platform-integration/web/embedding-flutter-web/#embedded-mode
[js-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

## 範例：顯示進度指示器

為了讓你的應用程式使用者在初始化過程中獲得回饋，
你可以利用每個階段所提供的 hooks 來更新 DOM：

```js
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

const loading = document.createElement('div');
document.body.appendChild(loading);
loading.textContent = "Loading Entrypoint...";
_flutter.loader.load({
  onEntrypointLoaded: async function(engineInitializer) {
    loading.textContent = "Initializing engine...";
    const appRunner = await engineInitializer.initializeEngine();

    loading.textContent = "Running app...";
    await appRunner.runApp();
  }
});
```

## 常見警告

如果你遇到類似以下的警告：

```text
Warning: In index.html:37: Local variable for "serviceWorkerVersion" is deprecated.
Use "{{flutter_service_worker_version}}" template token instead.
```

你可以透過刪除 `web/index.html` 檔案中的以下這一行來修正這個問題：

```html title="web/index.html"
var serviceWorkerVersion = null;
```
