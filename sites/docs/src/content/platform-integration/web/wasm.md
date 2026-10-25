---
title: 支援 WebAssembly (Wasm)
description: >-
  Flutter 對 WebAssembly (Wasm) 支援的最新狀態。
shortTitle: Wasm
last-update: Oct 16, 2026
---

Flutter 與 Dart 支援將
[WebAssembly](https://webassembly.org/)
作為網頁應用程式的編譯目標。

[`stable`]: {{site.repo.flutter}}/blob/master/docs/releases/Flutter-build-release-channels.md#stable
[`package:web`]: {{site.pub-pkg}}/web
[`dart:js_interop`]: {{site.dart.api}}/dart-js_interop/dart-js_interop-library.html

## 開始使用

若想體驗預先建置的 Flutter WebAssembly 應用程式，請參考
[Wonderous demo app](https://wonderous.app/web/)。

若要在自己的應用程式中嘗試 Wasm，請依照以下步驟操作。

### 切換到最新版本的 Flutter

請切換至 Flutter 3.24 或更高版本，
以便執行並編譯 Flutter 應用程式至 WebAssembly。
為確保您使用的是最新版本，請執行 `flutter upgrade`。

### 確認應用程式的相依套件相容

您可以嘗試預設範本 [sample app][]，
或選擇任何已遷移為
[相容 Wasm](#js-interop-wasm)
的 Flutter 應用程式。

[sample app]: /reference/create-new-app

### 修改 index 頁面

請確保您的 `web/index.html` 已更新為 Flutter 3.22 及之後版本的
[Flutter web app initialization][]。

如果您想使用預設設定，請刪除 `web/`
目錄中的所有內容，然後執行下列指令以重新產生：

```console
$ flutter create . --platforms web
```

[Flutter web app initialization]: /platform-integration/web/initialization

### 執行或建置您的應用程式

若要在開發或測試時以 Wasm 執行應用程式，請在 `flutter run` 指令中加入 `--wasm` 旗標。

```console
$ flutter run -d chrome --wasm
```

要建置一個使用 Wasm 的網頁應用程式，請在現有的 `flutter build web` 指令中加入 `--wasm` 旗標。

```console
$ flutter build web --wasm
```

該指令會將輸出產生在相對於套件根目錄的 `build/web` 目錄中，就像 `flutter build web` 一樣。

:::note
為 Flutter 網頁應用程式啟用 Wasm 編譯時，預設不會使用延遲載入 (deferred loading)。
Wasm 中的延遲載入在 Flutter 3.50 及更高版本提供，
可使用 `--enable-wasm-deferred-loading` 旗標啟用：

```console
$ flutter build web --wasm --enable-wasm-deferred-loading
```

若要自訂執行時如何下載延遲載入的 `.wasm` 模組，
請在 [Flutter web app initialization][] 設定中提供 `wasmDeferredModulesLoader` 回呼（callback）。
:::

#### Wasm 正式環境除錯

預設情況下，Wasm release 建置會移除除錯符號 (debug symbols) 並省略 source map，
以將二進位檔大小降到最低。

- **用於錯誤監控（建議）**：傳入 `--source-maps` 以產生
  `main.dart.wasm.map` 檔案，供錯誤追蹤服務進行符號還原 (symbolication)。
  關於安全性建議與部署警告，請參考
  [Source maps](/deployment/web#source-maps)。
- **用於 staging 或 QA 建置**：傳入 `--no-strip-wasm` 以在瀏覽器主控台的堆疊追蹤 (stack trace) 中
  直接保留 Wasm 函式名稱，代價是 Wasm 二進位檔大小大約會**增加 47%**。

```console
# Generate source maps for production error tracking:
$ flutter build web --wasm --source-maps

# Preserve Wasm function names for staging/QA debugging:
$ flutter build web --wasm --no-strip-wasm
```

### 在相容的網頁瀏覽器中開啟應用程式
即使加上 `--wasm` 旗標，Flutter 仍然會將應用程式編譯為 JavaScript。如果在執行時未偵測到 WasmGC 支援，則會使用 JavaScript 輸出，因此應用程式仍可在所有主流瀏覽器中正常運作。

您可以透過檢查在編譯期間設定的 `dart2wasm` 環境變數（建議方式），來驗證應用程式是否實際以 Wasm 執行。

```dart
const isRunningWithWasm = bool.fromEnvironment('dart.tool.dart2wasm');
```

或者，您也可以利用數值表示方式的差異，來測試是否使用了原生（Wasm）數值表示方式。

```dart
final isRunningWithWasm = identical(double.nan, double.nan);
```

### 使用 HTTP 伺服器提供建置後的輸出

Flutter Web WebAssembly 可以利用多執行緒來更快地渲染您的應用程式，減少卡頓現象。為了達成這一點，Flutter 會使用進階的瀏覽器功能，而這些功能需要特定的 HTTP 回應標頭（HTTP response headers）。

:::important
如果伺服器沒有設定傳送特定的 HTTP 標頭，使用 WebAssembly 編譯的 Flutter Web 應用程式將無法以多執行緒運作。
:::

| 名稱 | 值 |
|-|-|
| `Cross-Origin-Embedder-Policy` | `credentialless` <br> 或 <br> `require-corp` |
| `Cross-Origin-Opener-Policy` | `same-origin` |

{:.table}

想進一步了解這些標頭，請參考
[Load cross-origin resources without CORP headers using COEP: credentialless][coep]。

[coep]: https://developer.chrome.com/blog/coep-credentialless-origin-trial

## 進一步了解瀏覽器相容性

在 Flutter 3.50 及更高版本中，執行編譯為 Wasm 的 Flutter 應用程式（`dart2wasm` +
`skwasm`）需要支援三項標準化 WebAssembly 功能的瀏覽器：

* [WasmGC][]（垃圾回收，Garbage Collection）
* [JS String Builtins][wasm-js-string]（`wasm:js-string`）
* [Phase 4 Exception Handling][wasm-eh]（`try_table` / `exnref`）

啟動時，`flutter_bootstrap.js` 會探測瀏覽器的 WebAssembly 引擎是否支援這些功能，
並在選擇 Wasm 建置前檢查 `wasmAllowList` 設定。
當瀏覽器不支援這些功能，或未在 `wasmAllowList` 中啟用時，
Flutter 會自動退回使用 `flutter build web --wasm` 所產生的
JavaScript（`dart2js`）與 CanvasKit 建置。

| 瀏覽器引擎 | Wasm 最低版本 | Flutter 3.50 的預設行為 (`--wasm`) | 如何啟用 Wasm |
| :--- | :--- | :--- | :--- |
| **Chromium** (Chrome, Edge, Opera, Brave) | **137+** (Desktop & Android) | 預設執行 `dart2wasm` + `skwasm`；Chrome `< 137` 會退回 `dart2js` + CanvasKit。 | 預設啟用 (`wasmAllowList.blink: true`)。 |
| **WebKit** (Safari macOS & iOS, all iOS browsers) | **Safari 26.2+** (macOS & iOS 26.2+) | 預設退回 `dart2js` + CanvasKit (`wasmAllowList.webkit: false`)。 | 在 [Flutter web app initialization][] 中設定 `wasmAllowList: { webkit: true }`。Safari `<= 26.1` 會透過執行時功能偵測自動退回 `dart2js` + CanvasKit。 |
| **Gecko** (Firefox) | **Firefox 147+** | 預設退回 `dart2js` + CanvasKit (`wasmAllowList.gecko: false`)。 | 在 [Flutter web app initialization][] 中設定 `wasmAllowList: { gecko: true }`。Firefox `< 147` 會自動退回 `dart2js` + CanvasKit。 |

{:.table}

[WasmGC]: https://github.com/WebAssembly/gc/tree/main/proposals/gc
[wasm-js-string]: https://github.com/WebAssembly/js-string-builtins
[wasm-eh]: https://github.com/WebAssembly/exception-handling

## 使用相容的 JS interop 函式庫 {:#js-interop-wasm}

為了支援編譯至 Wasm，Dart 已將其與瀏覽器及 JavaScript API 互通的方式現代化。
舊版 Dart SDK 的 web 與 JS interop 函式庫（`dart:html`、`dart:js`、
`dart:js_util`、`dart:indexed_db`、`dart:svg`、`dart:web_audio` 以及
`dart:web_gl`）已**棄用，並計畫在未來的版本中從 Dart SDK 移除**，
編譯至 Wasm 時，這些函式庫與已棄用的 `package:js` 套件皆不受支援。

取而代之的是，Dart 提供輕量級、以靜態 JS interop 為核心的解決方案，
可同時適用於 JavaScript 與 WebAssembly 目標：

- [`package:web`][]，可取代 `dart:html`（以及其他舊版 web 函式庫）
- [`dart:js_interop`][]，可取代 `package:js`、`dart:js` 與 `dart:js_util`

關於遷移既有程式碼的詳細指南，
請參考 [`package:web` 遷移指南][`package:web` migration guide]。

編譯至 Wasm 時，請留意 JS interop 型別在執行時的差異
（例如 `is`/`as` 型別轉換，以及回呼中的 Zone 傳遞）。
詳情請參考 Dart 的
[JS interop 型別文件]({{site.dart-site}}/interop/js-interop/js-types#compatibility-type-checks-and-casts)
與 [package:web Zones 章節]({{site.dart-site}}/interop/js-interop/package-web#zones)。

想進一步了解 Dart 的 JS interop，
請參考 Dart 的 [JS interop][] 文件頁面。

### 診斷 Wasm 編譯錯誤 {:#diagnosing-wasm-compilation-errors}

使用 `--wasm` 編譯 Flutter 網頁專案時，如果您的應用程式或其套件
匯入了不支援的 web API（例如 `dart:html` 或 `package:js`），
編譯就會失敗。

#### 1. 及早偵測並強制使用現代 JS interop

您可以透過 dry-run 警告及早偵測不相容之處。執行不帶 `--wasm` 旗標的
`flutter build web` 時，仍會自動執行 Wasm dry run
（傳入 `--no-wasm-dry-run` 可停用）。如果發現不相容之處，
您會看到類似下列的非致命警告：

```console
Wasm dry run failed:
Found incompatibilities with WebAssembly.

package:my_app/main.dart 1:1 - dart:html unsupported (0)
```

在 Flutter 3.50 及更高版本中，您也可以在 JavaScript（`dart2js` 與 `ddc`）建置中
強制使用現代 JS interop。這可確保 Wasm 相容性，
並讓您的應用程式為即將從 Dart SDK 移除已棄用 web 函式庫做好準備。
請將 `--no-deprecated-js-interop` 傳給 `flutter build web`、
`flutter run`、`flutter drive` 或 `flutter test --platform chrome`：

```console
$ flutter build web --no-deprecated-js-interop
```

傳入 `--no-deprecated-js-interop` 會使匯入已棄用 `dart:*` web
函式庫（以及匯入它們的套件，例如 `package:js`）的程式碼在
編譯時失敗。它也會讓條件式匯入中的 `dart.library.html`、`dart.library.js` 與
`dart.library.js_util` 求值為 `false`。

#### 2. 檢查編譯器相依樹

如果您執行 `flutter build web --wasm` 時因不支援的匯入而失敗，
`flutter_tools` 會印出結構化的 `Context` 樹，
顯示是哪個套件與檔案匯入了無法使用的函式庫：

```console
Context: The unavailable library 'dart:html' is imported through these packages:

    main.dart => package:my_app => dart:html

Detailed import paths for (some of) these imports:

    main.dart => package:my_app/main.dart => dart:html
```

#### 3. 遷移舊版匯入

若要修正這些編譯錯誤，您必須從舊版 JS interop
套件遷移至相容 WebAssembly 的現代替代方案：

- 以 [`package:web`][] 取代 `dart:html` 與其他舊版 web 函式庫。
- 以 [`dart:js_interop`][] 取代 `dart:js` 與 `package:js`。

完整的遷移說明，請參考
[dart.dev 上的 `package:web` 遷移指南]({{site.dart-site}}/interop/js-interop/package-web)
以及 Dart 的 [JS interop 使用指南]({{site.dart-site}}/interop/js-interop)。

如果您在遷移期間需要同時支援舊版與現代環境，
請透過檢查 `dart.library.js_interop` 來使用條件式匯入：

```dart
import 'fallback.dart'
  if (dart.library.js) 'legacy_web_interop.dart'
  if (dart.library.js_interop) 'wasm_web_interop.dart';
```

想進一步了解如何在編譯時選擇實作，請參考
[dart.dev 上的條件式匯入文件]({{site.dart-site}}/interop/js-interop/package-web#conditional-imports)。

[`package:url_launcher`]: {{site.pub-pkg}}/url_launcher
[`package:web` migration guide]: {{site.dart-site}}/interop/js-interop/package-web
[JS interop]: {{site.dart-site}}/interop/js-interop
[`wasm-ready`]: {{site.pub-pkg}}?q=is%3Awasm-ready
[pub.dev]: {{site.pub}}
