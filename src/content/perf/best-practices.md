---
title: 效能最佳實踐
shortTitle: 最佳實踐
description: 如何確保你的 Flutter 應用程式具有高效能。
---

{% render docs/performance.md %}

一般來說，Flutter 應用程式預設就有良好的效能，
因此只要避免常見的陷阱，就能獲得極佳的效能表現。
這些最佳實踐建議將協助你撰寫出效能最佳的 Flutter 應用程式。

:::note
如果你正在使用 Flutter 開發網頁應用程式，你可能會對 Flutter Material 團隊撰寫的一系列文章感興趣，
他們針對 [Flutter Gallery][Performance considerations] 應用程式進行了修改，讓其在網頁端效能更佳：

* [透過 tree shaking 與延遲載入優化 Flutter 網頁應用效能][`StatefulWidget`]
* [利用圖片預留區、預先快取與停用導覽轉場提升感知效能][Widgets vs helper methods]
* [打造高效能 Flutter 元件][DevTools timeline]
:::

[Flutter Gallery]: {{site.gallery-archive}}
[web-perf-1]: {{site.flutter-medium}}/optimizing-performance-in-flutter-web-apps-with-tree-shaking-and-deferred-loading-535fbe3cd674
[web-perf-2]: {{site.flutter-medium}}/improving-perceived-performance-with-image-placeholders-precaching-and-disabled-navigation-6b3601087a2b
[web-perf-3]: {{site.flutter-medium}}/building-performant-flutter-widgets-3b2558aa08fa

你該如何設計 Flutter 應用程式，才能最有效率地渲染你的畫面？特別是，如何確保由框架產生的繪製程式碼盡可能高效？
有些渲染與版面配置操作本身較慢，但有時無法完全避免。
這些操作應謹慎使用，並遵循下列指引。

## 最小化昂貴的操作

某些操作比其他操作更昂貴，也就是說它們會消耗更多資源。
顯然，你應只在必要時才使用這些操作。
你設計與實作應用程式 UI 的方式，會大幅影響執行效率。

### 控制 build() 成本

設計 UI 時，請注意以下事項：

* 避免在 `build()` 方法中重複且昂貴的工作，
  因為當父層元件重建時，`build()` 可能會被頻繁呼叫。
* 避免單一大型元件，其 `build()` 函式過於龐大。
  應根據封裝性與變動性，將其拆分為不同元件：
  * 當對 `State` 物件呼叫 `setState()` 時，
    所有子孫元件都會重建。因此，
    請將 `setState()` 呼叫侷限於實際需要變更 UI 的子樹部分。
    若變更只影響樹中的小區塊，避免在樹的高層呼叫 `setState()`。
  * 重建所有子孫的遍歷會在再次遇到與前一幀相同實例的子元件時停止。
    這個技巧在框架內部被大量用於最佳化動畫，
    當動畫不影響子樹時可避免重建。
    請參考 [`TransitionBuilder`][DevTools Performance view] 模式以及
    [`SlideTransition` 原始碼][`ShaderMask`]，
    它利用此原則，在動畫時避免重建子孫元件。
    （「相同實例」是透過 `operator ==` 判斷，
    但請參閱本頁結尾的陷阱區段，了解何時應避免覆寫 `operator ==`。）
  * 儘可能在元件上使用 `const` 建構函式，
    這讓 Flutter 能夠大幅減少重建工作。
    若想在可行時自動收到使用 `const` 的提醒，
    請啟用 [`flutter_lints`][`ColorFilter`] 套件的建議 lint。
    更多資訊請參考
    [`flutter_lints` 遷移指南][`Chip`]。
  * 若要建立可重複使用的 UI 區塊，
    請優先使用 [`StatelessWidget`][`Text`]，
    而非單純的函式。

更多資訊請參考：

* [效能考量][`Opacity`]，
  屬於 [`StatefulWidget`][Transparent image] API 文件的一部分
* [Widgets 與輔助方法比較][`FadeInImage`]，
  官方 Flutter YouTube 頻道的影片，說明為何元件
  （特別是帶有 `const` 建構函式的元件）
  比函式更具效能。

[`flutter_lints`]: {{site.pub-pkg}}/flutter_lints
[`flutter_lints` migration guide]: /release/breaking-changes/flutter-lints-package#migration-guide
[Performance considerations]: {{site.api}}/flutter/widgets/StatefulWidget-class.html#performance-considerations
[source code for `SlideTransition`]: {{site.repo.flutter}}/blob/main/packages/flutter/lib/src/widgets/transitions.dart#L168
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`TransitionBuilder`]: {{site.api}}/flutter/widgets/TransitionBuilder.html
[Widgets vs helper methods]: {{site.yt.watch}}?v=IOyq-eTRhvo

---

### 使用 StringBuffer 來高效組合字串

當你需要從多個部分組合字串，特別是在迴圈中時，
直接使用 `+` 運算子效率不佳，因為每次串接都會建立一個新的 `String` 物件。
更好的做法是使用 `StringBuffer`，
它會先收集所有字串，並在你呼叫 `toString()` 時一次性串接。

{% ytEmbed 'xSsFtDY-nOw', 'StringBuffer (Technique of the Week)' %}

---

### 謹慎使用 saveLayer()

有些 Flutter 程式碼會使用 `saveLayer()`（這是一個昂貴的操作），
來實作 UI 中的各種視覺效果。
即使你的程式碼沒有明確呼叫 `saveLayer()`，
你使用的其他元件或套件可能會在背後呼叫它。
也許你的應用程式呼叫了過多的 `saveLayer()`；
過度呼叫 `saveLayer()` 會導致畫面卡頓（jank）。

#### 為什麼 saveLayer 很昂貴？

呼叫 `saveLayer()` 會配置一個離屏緩衝區（offscreen buffer），
並將內容繪製到該緩衝區時，可能會觸發 render target 切換。
GPU 運作時像是消防水管一樣高速，
render target 切換會迫使 GPU 暫時改變輸出方向，然後再切回來。
在行動裝置 GPU 上，這對渲染效率影響尤其大。

#### 什麼情況下必須使用 saveLayer？

執行階段時，如果你需要動態顯示來自伺服器的各種形狀（例如），
且每個形狀都有透明度，且可能（或可能不）互相重疊，
那麼你幾乎必須使用 `saveLayer()`。

#### 偵錯 saveLayer 呼叫

你如何判斷應用程式直接或間接呼叫了多少次 `saveLayer()`？
`saveLayer()` 方法會在 [DevTools 時間軸][`Opacity`] 觸發一個事件；
你可以透過檢查 [DevTools 效能檢視][Working with long lists]
中的 `saveLayer`
開關，來了解你的場景何時使用了 `PerformanceOverlayLayer.checkerboardOffscreenLayers`。

[DevTools timeline]: /tools/devtools/performance#timeline-events-tab

#### 最小化 saveLayer 呼叫

你能避免呼叫 `saveLayer` 嗎？
這可能需要重新思考你產生視覺效果的方式：

* 如果呼叫來自 _你的_ 程式碼，你能減少或移除它們嗎？
  例如，假設你的 UI 有兩個形狀重疊，
  且各自有非零透明度：
  * 如果它們總是以相同方式、相同透明度重疊，
    你可以預先計算這個重疊後的半透明物件外觀，快取起來，
    直接使用該圖像，而不是呼叫 `saveLayer()`。
    這適用於任何可預先計算的靜態形狀。
  * 你能否重構繪製邏輯，完全避免重疊？
{% comment %}
TBD: 若能連結到範例會更好。
  Kenzie 建議 John 與 Tao 在 perf_diagnosis_demo 加入範例。
  Michael 表示他目前沒有 saveLayer 範例。
{% endcomment %}

* 如果呼叫來自你無法控制的套件，
  請聯繫套件作者，詢問這些呼叫是否必要，能否減少或移除？
  若無法改善，你可能需要尋找其他套件，或自行撰寫。

:::note 給套件作者的建議
作為最佳實踐，請考慮為你的套件提供相關文件，
說明何時可能需要 `saveLayer`、如何避免，以及何時無法避免。
:::

其他可能觸發 `saveLayer()` 且成本較高的元件：

* [`ShaderMask`][Creating a `ListView` that loads one page at a time]
* [`ColorFilter`][`Listview.builder`]
* [`Chip`][how layout and constraints work]&mdash;若 `saveLayer()`
  則可能觸發 `disabledColorAlpha != 0xff` 呼叫
* [`Text`][Track layouts option]&mdash;若有 `saveLayer()`
  則可能觸發 `overflowShader` 呼叫

[`Chip`]: {{site.api}}/flutter/material/Chip-class.html
[`ColorFilter`]: {{site.api}}/flutter/dart-ui/ColorFilter-class.html
[`FadeInImage`]: {{site.api}}/flutter/widgets/FadeInImage-class.html
[`Opacity`]: {{site.api}}/flutter/widgets/Opacity-class.html
[`ShaderMask`]: {{site.api}}/flutter/widgets/ShaderMask-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[Transparent image]: {{site.api}}/flutter/widgets/Opacity-class.html#transparent-image

---

### 最小化 opacity 與裁剪（clipping）的使用

Opacity（透明度）與裁剪（clipping）都是昂貴的操作。
以下是一些你可能會覺得有用的建議：

* 僅在必要時使用 [`Opacity`][stack trace] 元件。
  請參考 `Opacity` API 文件中的 [透明圖片][`RenderObject`] 節，
  了解如何直接對圖片套用透明度，這比使用 `Opacity` 元件更快。
* 對於簡單形狀或文字，與其包在 `Opacity` 元件中，
  通常直接以半透明顏色繪製會更有效率。
  （但僅適用於繪製區域無重疊時。）
* 若要實現圖片淡入效果，建議使用 [`FadeInImage`][layout and rendering] 元件，
  它利用 GPU 的片段著色器（fragment shader）實現漸變透明。
  更多資訊請參考 [`Opacity`][Flutter architectural overview] 文件。
* **裁剪（clipping）** 不會呼叫 `saveLayer()`（除非明確要求 `Clip.antiAliasWithSaveLayer`），
  因此這些操作不像 `Opacity` 那麼昂貴，
  但裁剪仍然耗資源，請謹慎使用。
  預設情況下裁剪是關閉的（`Clip.none`），
  需要時必須明確啟用。
* 若要建立圓角矩形，與其套用裁剪矩形，
  不如直接使用許多元件類別提供的 `borderRadius` 屬性。

---

### 審慎實作 grids 與 lists

你的 grids（網格）與 lists（清單）實作方式，
可能會造成應用程式效能問題。
本節說明建立 grids 與 lists 時的重要最佳實踐，
以及如何判斷應用程式是否產生過多版面配置（layout）傳遞。

#### 要「懶」一點！

建立大型 grid 或 list 時，
請使用 lazy builder 方法與 callback。
這能確保啟動時只建立螢幕上可見的部分。

更多資訊與範例請參考：

* [處理長清單]⟦L60⟧
* [建立一次只載入一頁的 `ListView`]⟦L61⟧
  （AbdulRahman AlHamali 撰寫的社群文章）
* [`Listview.builder`]⟦L62⟧ API

[Creating a `ListView` that loads one page at a time]: {{site.medium}}/saugo360/flutter-creating-a-listview-that-loads-one-page-at-a-time-c5c91b6fabd3
[`Listview.builder`]: {{site.api}}/flutter/widgets/ListView/ListView.builder.html
[Working with long lists]: /cookbook/lists/long-lists

#### 避免 intrinsic 操作

若想了解 intrinsic 傳遞如何影響 grids 與 lists，
請參閱下一節。

---

### 最小化 intrinsic 操作導致的版面配置傳遞

如果你有豐富的 Flutter 開發經驗，
應該熟悉[版面配置與約束的運作方式]⟦L63⟧。
你甚至可能已熟記 Flutter 的基本版面配置規則：
**約束往下傳遞，尺寸往上回傳，父元件決定位置。**

對某些元件，特別是 grids 與 lists，
版面配置過程可能相當耗資源。
Flutter 會盡量只對元件進行一次版面配置傳遞，
但有時會需要第二次傳遞（稱為 _intrinsic pass_），
這會拖慢效能。

#### 什麼是 intrinsic pass？

所謂 intrinsic pass，例如你希望所有格子（cell）
都與最大或最小的 cell 同尺寸（或需統計所有 cell 的某些屬性），
這就需要遍歷所有 cell 進行計算。

舉例來說，假設有一個大型 `Card` grid。
為了讓 grid cell 尺寸一致，
版面配置程式碼會從 grid 根節點（widget 樹中）開始，
詢問 grid 中**每一個**卡片（不僅僅是可見卡片），
請它回報 _intrinsic_ 尺寸——也就是在無約束下元件偏好的尺寸。
取得這些資訊後，
框架會決定統一的 cell 尺寸，
並再次遍歷所有 grid cell，
告訴每個卡片要使用哪個尺寸。

#### 偵錯 intrinsic pass

要判斷是否有過多 intrinsic 傳遞，
請在 DevTools 啟用 **[Track layouts option]⟦L64⟧**
（預設關閉），
並查看應用程式的 [stack trace]⟦L65⟧，
了解執行了多少次版面配置傳遞。
啟用追蹤後，intrinsic 時間軸事件會標記為 '$runtimeType intrinsics'。

#### 避免 intrinsic pass

你有幾種方式可以避免 intrinsic 傳遞：

* 事先將 cell 設定為固定尺寸。
* 選定某個 cell 作為
  「錨點」cell——所有 cell 皆以此 cell 為基準調整尺寸。
  撰寫自訂的 [`RenderObject`]⟦L66⟧，
  先定位錨點子元件，再依序配置其他子元件。

若想更深入了解版面配置運作原理，
請參考 [版面配置與渲染]⟦L67⟧
章節，以及 [Flutter 架構總覽]⟦L68⟧。


[Flutter architectural overview]: /resources/architectural-overview
[how layout and constraints work]: /ui/layout/constraints
[layout and rendering]: /resources/architectural-overview#layout-and-rendering
[stack trace]: /tools/devtools/cpu-profiler#flame-chart
[Track layouts option]: /tools/devtools/performance#track-layouts

---

### 在 16 毫秒內建立並顯示畫面

由於建構與渲染分別在不同執行緒進行，
在 60Hz 螢幕下，你有 16 毫秒可用於建構，
另有 16 毫秒可用於渲染。
若你在意延遲，
請在 _16 毫秒以內_ 完
