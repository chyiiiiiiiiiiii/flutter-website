---
title: Web 渲染器
description: 為 Flutter Web 應用程式選擇建置模式與渲染器。
---

Flutter Web 提供兩種 _建置模式_ 以及兩種 _渲染器_。  
兩種建置模式分別為 **預設** 及 **WebAssembly**，  
而兩種渲染器則為 **canvaskit** 與 **skwasm**。

Flutter 會在建置應用程式時選擇建置模式，  
並於執行階段決定可用的渲染器。

在預設建置時，  
Flutter 會於執行階段選擇 `canvaskit` 渲染器。  
若為 WebAssembly 建置，  
Flutter 會於執行階段選擇 `skwasm` 渲染器，  
若瀏覽器不支援 `skwasm`，則會回退至 `canvaskit`。

## 建置模式

### 預設建置模式

當使用 `flutter run` 或 `flutter build web` 指令且未傳遞 `--wasm`，或有傳遞 `--no-wasm` 時，  
Flutter 會選擇預設模式。

此建置模式僅使用 `canvaskit` 渲染器。

若要在 Chrome 中以預設建置模式執行：

```console
flutter run -d chrome
```

要使用預設的建置模式將您的應用程式建置為發行版本，請執行以下步驟：

```console
flutter build web
```

### WebAssembly 建置模式

啟用此模式時，需在 `flutter run` 和 `flutter build web` 指令中傳入 `--wasm`。

此模式會同時提供 `skwasm` 和 `canvaskit`。`skwasm` 需要 [WasmGC][WasmGC]，而目前並非所有現代瀏覽器都支援該功能。因此，Flutter 會在執行時偵測是否支援垃圾回收（garbage collection），若支援則選擇 `skwasm`，否則則退回使用 `canvaskit`。這讓以 WebAssembly 模式編譯的應用程式仍可在所有現代瀏覽器中運作。

`--wasm` 旗標不支援非 Web 平台。

若要在 Chrome 上以 WebAssembly 模式執行：

```console
flutter run -d chrome --wasm
```

若要使用 WebAssembly 模式建置您的應用程式以進行發佈：

```console
flutter build web --wasm
```

## 渲染器

Flutter 有兩種渲染器（`canvaskit` 和 `skwasm`），
這兩者都是為了在瀏覽器中運行而重新實作的 Flutter 引擎。
渲染器會將 UI 原語（以 `Scene` 物件儲存）轉換為像素。

### canvaskit

`canvaskit` 渲染器相容於所有現代瀏覽器，並且是 _預設_ 建置模式下所使用的渲染器。

它包含一份以 WebAssembly 編譯的 Skia，這會增加約 1.5MB 的下載大小。

### skwasm

`skwasm` 渲染器是 Skia 的更精簡版本，
同樣以 WebAssembly 編譯，並支援在獨立執行緒上進行渲染。

此渲染器必須搭配 _WebAssembly_ 建置模式使用，
該模式會將 Dart 程式碼編譯為 WebAssembly。

若要利用多執行緒的優勢，
Web 伺服器必須符合 [SharedArrayBuffer 安全性要求][SharedArrayBuffer security requirements]。
在此模式下，
Flutter 會使用專屬的 [web worker][web worker]，將部分渲染工作負載分派到獨立執行緒，
以善用多核心 CPU。
如果瀏覽器不符合這些要求，
`skwasm` 渲染器則會以單執行緒模式運作。

此渲染器包含以 WebAssembly 編譯的 Skia 精簡版本，
會增加約 1.1MB 的下載大小。

## 執行階段選擇渲染器

預設情況下，當以 WebAssembly 模式建置時，Flutter 會自動決定何時使用 `skwasm`，
以及何時回退至 `canvaskit`。你可以透過傳遞設定物件給載入器來覆寫此行為，方法如下：

 1. 使用 `--wasm` 旗標建置應用程式，讓 `skwasm` 和 `canvaskit`
    兩種渲染器都可供應用程式使用。
 1. 依照[撰寫自訂 `flutter_bootstrap.js`][custom-bootstrap] 的說明，設定自訂 web 應用程式初始化流程。
 1. 準備一個設定物件，並將 `renderer` 屬性設為
    `"canvaskit"` 或 `"skwasm"`。
 1. 將你準備好的設定物件，作為新物件的 `config` 屬性，
    傳遞給先前注入的 `_flutter.loader.load` 方法。

範例：

```html highlightLines=9-14
<body>
  <script>
    {% raw %}{{flutter_js}}{% endraw %}
    {% raw %}{{flutter_build_config}}{% endraw %}

    // TODO: Replace this with your own code to determine which renderer to use.
    const useCanvasKit = true;

    const config = {
      renderer: useCanvasKit ? "canvaskit" : "skwasm",
    };
    _flutter.loader.load({
      config: config,
    });
  </script>
</body>
```

在呼叫 `load` 方法後，Web renderer（網頁渲染器）將無法變更。因此，任何關於選擇使用哪一種 renderer 的決策，都必須在呼叫 `_flutter.loader.load` 之前完成。

[custom-bootstrap]: /platform-integration/web/initialization#custom-bootstrap-js
[customizing-web-init]: /platform-integration/web/initialization

## 選擇建置模式

若要將 Dart 編譯為 WebAssembly，您的應用程式及其插件／套件必須符合以下要求：

- **使用新版 JS Interop** - 
  程式碼必須僅使用新版 JS interop 函式庫 `dart:js_interop`。舊式的 `dart:js`、`dart:js_util` 和 `package:js` 已不再支援。
- **使用新版 Web API** -
  使用 Web API 的程式碼必須改用新版 `package:web`，而非 `dart:html`。
- **數值型別相容性** -
  WebAssembly 對 Dart 的數值型別 `int` 和 `double` 的實作方式與 Dart VM 完全相同。在 JavaScript 中，這些型別則是以 JS `Number` 型別進行模擬。您的程式碼有可能無意間或刻意依賴了 JavaScript 處理數值的行為。如果有這種情況，則必須更新相關程式碼，以確保其行為與 Dart VM 一致。

您可以依據以下建議來決定使用哪一種模式：

* **套件支援度** - 如果您的應用程式依賴尚未支援 WebAssembly 的插件或套件，請選擇預設模式。
* **效能** -
  如果您的應用程式程式碼及套件皆相容於 WebAssembly，且效能表現很重要，請選擇 WebAssembly 模式。`skwasm` 相較於 `canvaskit`，在應用程式啟動速度與畫面效能上有明顯提升。`skwasm` 在多執行緒模式下特別有效，因此建議您設定伺服器以符合 [SharedArrayBuffer 安全性需求][SharedArrayBuffer security requirements]。

[canvaskit]: https://skia.org/docs/user/modules/canvaskit/
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[web worker]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
[WasmGC]: https://developer.chrome.com/blog/wasmgc
[SharedArrayBuffer security requirements]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements
