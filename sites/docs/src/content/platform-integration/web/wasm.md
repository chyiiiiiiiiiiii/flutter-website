---
title: 支援 WebAssembly (Wasm)
description: >-
  Flutter 對 WebAssembly (Wasm) 支援的最新狀態。
shortTitle: Wasm
last-update: Nov 6, 2024
---

Flutter 與 Dart 支援將
[WebAssembly](https://webassembly.org/)
作為網頁應用程式的編譯目標。

[`stable`]: {{site.github}}/flutter/flutter/blob/master/docs/releases/Flutter-build-release-channels.md#stable
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
要執行已編譯為 Wasm 的 Flutter 應用程式，您需要一個支援 [WasmGC][] 的瀏覽器。

[Chromium 和 V8][Chromium and V8] 自第 119 版起支援 WasmGC。
iOS 上的 Chrome 使用 WebKit，目前尚未 [支援 WasmGC][support WasmGC]。
Firefox 在 Firefox 120 宣布穩定支援 WasmGC，
但目前因已知限制而無法運作（詳情見下方）。

[WasmGC]: {{site.github}}/WebAssembly/gc/tree/main/proposals/gc
[Chromium and V8]: https://chromestatus.com/feature/6062715726462976
[support WasmGC]: https://bugs.webkit.org/show_bug.cgi?id=247394
[issue]: https://bugzilla.mozilla.org/show_bug.cgi?id=1788206

- **為什麼不能用 Firefox？**
  Firefox 120 版及之後的版本過去可以執行 Flutter/Wasm，但目前遇到一個錯誤，導致與 Flutter 的 Wasm renderer 不相容。詳情請追蹤 [此錯誤][firefox-bug]。
- **為什麼不能用 Safari？**
  Safari 現已支援 WasmGC，但也遇到類似的錯誤，導致與 Flutter 的 Wasm renderer 不相容。
  詳情請追蹤 [此錯誤][safari-bug]。

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1788206
[safari-bug]: https://bugs.webkit.org/show_bug.cgi?id=267291

:::warning
編譯為 Wasm 的 Flutter 無法在任何 iOS 版本的瀏覽器上執行。
所有 iOS 上的瀏覽器都必須使用 WebKit，
且無法使用自己的瀏覽器引擎。
:::

## 使用相容的 JS interop 函式庫 {:#js-interop-wasm}

為了支援編譯至 Wasm，Dart 已改變其與瀏覽器及 JavaScript API 互通的方式。
這導致使用 `dart:html` 或 `package:js` 的 Dart 程式碼
無法編譯為 Wasm。

取而代之的是，Dart 現在提供了全新、輕量級，且以靜態 JS interop 為核心的解決方案：

- [`package:web`][]，可取代 `dart:html`（以及其他 web 函式庫）
- [`dart:js_interop`][]，可取代 `package:js` 與 `dart:js`

想進一步了解 Dart 的 JS interop，
請參考 Dart 的 [JS interop][] 文件頁面。

[`package:url_launcher`]: {{site.pub-pkg}}/url_launcher
[`package:web` migration guide]: {{site.dart-site}}/interop/js-interop/package-web
[JS interop]: {{site.dart-site}}/interop/js-interop
[`wasm-ready`]: {{site.pub-pkg}}?q=is%3Awasm-ready
[pub.dev]: {{site.pub}}
