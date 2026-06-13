---
title: 在網頁上顯示圖片
shortTitle: 網頁圖片
description: 學習如何在網頁上載入與顯示圖片。
---

Web 支援標準的 [`Image`][] 元件（Widget）以及更進階的 [`dart:ui/Image`][] 類別（當你需要更細緻的控制來顯示圖片時）。
然而，由於網頁瀏覽器的設計目的是為了安全地執行不受信任的程式碼，因此在圖片處理上，與行動裝置和桌面平台相比，會有一些限制。本頁將說明這些限制，並提供因應方式。

[`Image`]: {{site.api}}/flutter/widgets/Image-class.html
[`dart:ui/Image`]: {{site.api}}/flutter/dart-ui/Image-class.html

:::note
若需瞭解如何最佳化網頁載入速度，請參考 Medium 上的免費文章：[Best practices for optimizing Flutter web loading speed][article]。

[article]: {{site.flutter-blog}}/best-practices-for-optimizing-flutter-web-loading-speed-7cc0df14ce5c
:::

## 背景說明

Web 提供了多種顯示圖片的方法：

- 內建的 [`<img>`][] 與 [`<picture>`][] HTML 元素
- [`drawImage`][] 方法，作用於 [`<canvas>`][] 元素
- 自訂圖片編解碼器，渲染至 WebGL 畫布

每種選擇都有其優缺點。例如，內建的 HTML 元素能夠與其他 HTML 元素良好地整合，並自動利用瀏覽器快取、內建圖片最佳化與記憶體管理。這些元素允許你安全地顯示來自任意來源的圖片（詳情請見下方 CORS 章節）。
`drawImage` 適合圖片必須嵌入於使用 `<canvas>` 元素渲染的其他內容中時使用。你也能夠控制圖片尺寸，並在 CORS 政策允許時，讀取圖片像素以進行進一步處理。
最後，WebGL 提供了最高程度的圖片控制權。不僅可以讀取像素並套用自訂圖片演算法，還能利用 GLSL 進行硬體加速。

[`<img>`]: https://developer.mozilla.org/docs/Web/HTML/Element/img
[`<picture>`]: https://developer.mozilla.org/docs/Web/HTML/Element/picture
[`drawImage`]: https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/drawImage
[`<canvas>`]: https://developer.mozilla.org/docs/Web/HTML/Element/canvas

## 跨來源資源共享（CORS）

[CORS][]（Cross-Origin Resource Sharing，跨來源資源共享）是瀏覽器用來控制一個網站如何存取另一個網站資源的機制。其設計目的是預設情況下，一個網站不能透過 [XHR][] 或 [`fetch`][] 向另一個網站發送 HTTP 請求。
這可防止其他網站上的腳本在未經授權的情況下，代表使用者操作或存取另一網站的資源。

在 Web 上，Flutter 會使用 CanvasKit 或 skwasm（當使用 Wasm 時）作為渲染器。這兩者都依賴於 WebGL。WebGL 需要存取原始圖片資料（位元組），才能渲染圖片。因此，圖片必須來自已針對服務你應用程式網域設定好 CORS 政策的伺服器。

:::note
如需更多有關網頁渲染器的資訊，請參閱 [Web renderers][]。
:::

[CORS]: https://developer.mozilla.org/docs/Web/HTTP/CORS
[XHR]: https://developer.mozilla.org/docs/Web/API/XMLHttpRequest
[`fetch`]: https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
[Web renderers]: /platform-integration/web/renderers

## 解決方案

在 Flutter 中，有多種方式可以因應 CORS 限制。

### 記憶體內、資源（Assets）或同源網路圖片

如果應用程式已經將編碼後的圖片位元組存於記憶體中、作為 [資源][asset] 提供，或是儲存在與應用程式相同伺服器上（也稱為 _同源_），則不需要額外處理。
可以直接使用 [`Image.memory`][]、[`Image.asset`][] 或 [`Image.network`][] 來顯示圖片。

[asset]: /ui/assets/assets-and-images
[`Image.memory`]: {{site.api}}/flutter/widgets/Image/Image.memory.html
[`Image.asset`]: {{site.api}}/flutter/widgets/Image/Image.asset.html
[`Image.network`]: {{site.api}}/flutter/widgets/Image/Image.network.html

### 將圖片託管於啟用 CORS 的 CDN

通常，內容傳遞網路（CDN）可以設定允許哪些網域存取你的內容。例如，Firebase 網站託管允許你在 `firebase.json` 檔案中 [自訂指定][custom-header] `Access-Control-Allow-Origin` 標頭。

[custom-header]: {{site.firebase}}/docs/hosting/full-config#headers

### 若無法控制來源伺服器，請使用 CORS 代理伺服器

如果圖片伺服器無法設定允許你的應用程式發送 CORS 請求，你仍可透過其他伺服器中繼請求來載入圖片。這需要中繼伺服器具備足夠權限來載入圖片。

這種方式適用於原始圖片伺服器公開提供圖片，但未正確設定 CORS 標頭的情境。

範例：

* 使用 [CloudFlare Workers][]。
* 使用 [Firebase Functions][]。

[CloudFlare Workers]: https://developers.cloudflare.com/workers/examples/cors-header-proxy
[Firebase Functions]: {{site.github}}/7kfpun/cors-proxy

<a id="use-a-html-platform-view" aria-hidden="true"></a>

### 使用 HTML 平台檢視（platform view）

如果上述方法都無法滿足你的應用需求，Flutter 支援在應用程式中嵌入原始 HTML，方法是使用 [`HtmlElementView`][]。你可以利用它建立 `<img>` 元素，從其他網域渲染圖片。

[`HtmlElementView`]: {{site.api}}/flutter/widgets/HtmlElementView-class.html
