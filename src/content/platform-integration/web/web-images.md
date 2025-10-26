---
title: 在網頁上顯示圖片
shortTitle: 網頁圖片
description: 學習如何在網頁上載入與顯示圖片。
---

Web 支援標準的 [`Image`][`Image`] 元件（Widget）以及更進階的 [`dart:ui/Image`][`dart:ui/Image`] 類別（當你需要更細緻地控制圖片顯示時）。
然而，由於網頁瀏覽器設計上必須安全地執行不受信任的程式碼，
因此在圖片處理上，與行動裝置和桌面平台相比，會有一些限制。
本頁將說明這些限制，並提供對應的解決方法。

[`Image`]: {{site.api}}/flutter/widgets/Image-class.html
[`dart:ui/Image`]: {{site.api}}/flutter/dart-ui/Image-class.html

:::note
若想了解如何最佳化網頁載入速度，
請參考 Medium 上的（免費）文章：
[Best practices for optimizing Flutter web loading speed][article]。

[article]: {{site.flutter-medium}}/best-practices-for-optimizing-flutter-web-loading-speed-7cc0df14ce5c
:::

## 背景說明

Web 提供了多種顯示圖片的方法：

- 內建的 [`<img>`][`<img>`] 與 [`<picture>`][`<picture>`] HTML 元素
- 在 [`<canvas>`][`<canvas>`] 元素上使用 [`drawImage`][`drawImage`] 方法
- 使用自訂圖片編解碼器（codec）渲染至 WebGL canvas

每種選擇都有其優缺點。
例如，內建的 HTML 元素能夠自然地與其他 HTML 元素混合，
並且自動利用瀏覽器的快取、內建圖片最佳化與記憶體管理功能。
這些方法讓你可以安全地從任意來源顯示圖片
（更多細節請見下方的 CORS 章節）。
`drawImage` 適合圖片必須嵌入於
以 `<canvas>` 元素渲染的其他內容中時使用。
你也能控制圖片尺寸，並且在 CORS 政策允許的情況下，
將圖片像素讀回以進行進一步處理。
最後，WebGL 提供了對圖片最高程度的控制。
你不僅可以讀取像素、套用自訂圖片演算法，
還能利用 GLSL 進行硬體加速。

[`<img>`]: https://developer.mozilla.org/docs/Web/HTML/Element/img
[`<picture>`]: https://developer.mozilla.org/docs/Web/HTML/Element/picture
[`drawImage`]: https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/drawImage
[`<canvas>`]: https://developer.mozilla.org/docs/Web/HTML/Element/canvas

## 跨來源資源共享（CORS）

[CORS][CORS]（Cross-Origin Resource Sharing）是一種瀏覽器用來控制
一個網站如何存取另一個網站資源的機制。
其設計目的是，預設情況下，一個網站不能
透過 [XHR][XHR] 或 [`fetch`][`fetch`] 向另一個網站發送 HTTP 請求。  
這樣可防止其他網站上的腳本以用戶身份操作，
或在未經授權的情況下存取其他網站的資源。

在 Web 上，Flutter 會使用 CanvasKit
或 skwasm（當使用 Wasm 時）渲染器來渲染應用程式。這兩者都依賴於 WebGL。
WebGL 需要存取原始圖片資料（位元組），
才能正確渲染圖片。
因此，圖片必須來自已設定好 CORS 政策、
允許你的應用程式網域存取的伺服器。

:::note   
如需更多有關網頁渲染器的資訊，請參考
[Web renderers][Web renderers]。
:::

[CORS]: https://developer.mozilla.org/docs/Web/HTTP/CORS
[XHR]: https://developer.mozilla.org/docs/Web/API/XMLHttpRequest
[`fetch`]: https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
[Web renderers]: /platform-integration/web/renderers

## 解決方案

在 Flutter 中，有多種方法可因應 CORS 限制。

### 記憶體內、資源檔與同源網路圖片

如果應用程式已將編碼後的圖片位元組存於記憶體中、
以 [資源][asset] 方式提供，或是儲存在
與應用程式相同伺服器上
（也就是 _同源_），則不需額外處理。
你可以直接使用
[`Image.memory`][`Image.memory`]、[`Image.asset`][`Image.asset`] 或 [`Image.network`][`Image.network`] 來顯示圖片。

[asset]: /ui/assets/assets-and-images
[`Image.memory`]: {{site.api}}/flutter/widgets/Image/Image.memory.html
[`Image.asset`]: {{site.api}}/flutter/widgets/Image/Image.asset.html
[`Image.network`]: {{site.api}}/flutter/widgets/Image/Image.network.html

### 將圖片託管於支援 CORS 的 CDN

一般來說，內容傳遞網路（CDN）
都可以設定允許哪些網域存取你的內容。
例如，Firebase 網站託管服務允許你
[自訂指定][custom-header] `Access-Control-Allow-Origin`
標頭於 `firebase.json` 檔案中。

[custom-header]: {{site.firebase}}/docs/hosting/full-config#headers

### 若無法控制來源伺服器，請使用 CORS 代理伺服器

如果圖片伺服器無法設定允許你的應用程式進行 CORS 請求，
你仍可透過另一台伺服器代理請求來載入圖片。這需要
中介伺服器有足夠的權限來載入這些圖片。

此方法適用於原始圖片伺服器為公開服務圖片，
但未正確設定 CORS 標頭的情境。

範例：

* 使用 [CloudFlare Workers][CloudFlare Workers]。
* 使用 [Firebase Functions][Firebase Functions]。

[CloudFlare Workers]: https://developers.cloudflare.com/workers/examples/cors-header-proxy
[Firebase Functions]: {{site.github}}/7kfpun/cors-proxy

### 使用 HTML 平台視圖

如果上述方法都不適用於你的應用程式，Flutter
支援在應用程式中嵌入原始 HTML，
可透過 [`HtmlElementView`][`HtmlElementView`] 實現。你可以用它來建立 `<img>`
元素，從其他網域渲染圖片。

[`HtmlElementView`]: {{site.api}}/flutter/widgets/HtmlElementView-class.html
