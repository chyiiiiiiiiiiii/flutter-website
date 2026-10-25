---
title: Impeller 抗鋸齒
description: Impeller 如何執行抗鋸齒（anti-aliasing）？
---

鋸齒（aliasing）是將幾何圖形繪製到像素網格（光柵化，rasterization）時產生的視覺瑕疵，
會讓形狀的邊緣看起來呈鋸齒狀或粗糙不平。
Impeller 採用了幾種技術，來平滑光柵圖形的對應結果（抗鋸齒，anti-aliasing）。

## 技術

### 多重取樣抗鋸齒 (MSAA)

[MSAA][] 是一種全域的抗鋸齒技術，會作用於整個螢幕的內容。
它是對「以較大比例渲染整個螢幕再縮小」（[SSAA][]）這種做法的最佳化。
它不會對每個子取樣（sub-sample）都執行片段運算（fragment operation），
而是將該像素的計算複製到各個子取樣上，並在其中進行邊界檢查。
這樣就能把平滑處理限制在邊緣。
行動裝置的 GPU 有特殊的硬體可以最佳化這個過程（[Tiled
rendering][]）。
它可以依據要考慮的取樣數量而有不同的等級。

在桌面與行動平台上，所有渲染呼叫都使用 4x MSAA。

### 帶號距離場 ([SDFs][])

一般來說，硬體加速的電腦圖學會定義一系列的點與邊（[網格][mesh]，mesh）以及[著色器][shaders]（shaders）。
SDF 則改為在片段著色器（fragment shader）程式中，以帶號距離場的方式渲染形狀。
由於形狀是在片段著色器中定義的，
因此可以在片段層級平滑邊緣，而不必仰賴網格的光柵化。

在桌面平台上，預設啟用 SDF 渲染。在行動平台上，SDF 是一個選項，預設為 false。

桌面平台優先採用這項技術，是因為 SDF 渲染對 GPU 的負擔較大，
而 Flutter 也支援較舊的行動裝置。
此外，桌面電腦的實體像素尺寸通常比行動裝置大，
因此任何瑕疵在桌面上都會更明顯。

### 範例

| No AA                                       | MSAA 4x                                        | MSAA 4x + SDF                                           |
| ------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| ![No AA](/assets/images/docs/perf/noaa.png) | ![MSAA 4x](/assets/images/docs/perf/msaa4.png) | ![MSAA 4x + SDF](/assets/images/docs/perf/msaa4sdf.png) |

## 使用抗鋸齒

### 搭配 FragmentShader API 使用 SDF

Flutter 中的標準基本形狀預設就是以 SDF 繪製的。
如果 Flutter 開發者想用 SDF 定義自己的自訂圖形，
可以透過 [FragmentShader API][] 來達成。
對大多數使用情境而言，使用 [drawPath()][] 就已足夠，
不需要訴諸高品質的 SDF 渲染。
不過，並不保證所有繪製的路徑都會以 SDF 渲染。

使用 FragmentShader API 渲染 SDF 的範例，可以在
[`simple_sdf`][] 找到。

### 在 iOS 上啟用 SDF

可以在專案的 `Info.plist` 中新增一個欄位，在 iOS 上啟用 SDF。

```xml
  <key>FLTEnableSDFs</key>
  <true/>
```

[MSAA]: https://en.wikipedia.org/wiki/Multisample_anti-aliasing
[SSAA]: https://en.wikipedia.org/wiki/Supersampling
[Tiled rendering]: https://en.wikipedia.org/wiki/Tiled_rendering
[SDFs]: https://en.wikipedia.org/wiki/Signed_distance_function
[mesh]: https://en.wikipedia.org/wiki/Polygon_mesh
[shaders]: https://en.wikipedia.org/wiki/Shader
[FragmentShader API]: /ui/design/graphics/fragment-shaders
[drawPath()]: {{site.api}}/flutter/dart-ui/Canvas/drawPath.html
[`simple_sdf`]: https://github.com/flutter/samples/tree/main/simple_sdf
