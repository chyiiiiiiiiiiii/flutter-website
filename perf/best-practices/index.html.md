# 效能最佳實踐

> 如何確保你的 Flutter 應用程式具有良好效能。



::: note
若要瞭解如何使用 **Performance View**
（Flutter DevTools 的一部分）
來除錯效能問題，
請參閱 [使用 Performance 檢視][Using the Performance view]。
:::

[Using the Performance view]: /tools/devtools/performance


一般來說，Flutter 應用程式預設就有不錯的效能，因此只要避免常見的陷阱，就能獲得極佳的效能。以下這些最佳實踐建議，將協助你撰寫效能最佳的 Flutter 應用程式。

:::note
如果你正在使用 Flutter 開發 Web 應用程式，你可能會對 Flutter Material 團隊撰寫的一系列文章感興趣。他們針對 [Flutter Gallery][] 應用程式進行了修改，以提升其在 Web 上的效能：

* [透過 tree shaking 與延遲載入優化 Flutter Web 應用程式效能][web-perf-1]
* [利用圖片預留位、預先快取與停用導覽轉場提升感知效能][web-perf-2]
* [打造高效能的 Flutter 元件 (Widget)][web-perf-3]
:::

[Flutter Gallery]: https://flutter-gallery-archive.web.app
[web-perf-1]: https://blog.flutter.dev/optimizing-performance-in-flutter-web-apps-with-tree-shaking-and-deferred-loading-535fbe3cd674
[web-perf-2]: https://blog.flutter.dev/improving-perceived-performance-with-image-placeholders-precaching-and-disabled-navigation-6b3601087a2b
[web-perf-3]: https://blog.flutter.dev/building-performant-flutter-widgets-3b2558aa08fa

你該如何設計 Flutter 應用程式，才能最有效率地渲染場景？特別是，如何確保框架產生的繪製（Painting）程式碼盡可能高效？有些渲染與版面配置操作已知較慢，但有時無法完全避免。這些操作應該謹慎使用，並遵循下方指引。

## 最小化昂貴操作

某些操作比其他操作更耗資源。顯然，你應該只在必要時才使用這些操作。你如何設計與實作應用程式的 UI，會對其執行效率產生重大影響。

### 控制 build() 成本

設計 UI 時，請注意以下事項：

* 避免在 `build()` 方法中重複且耗時的工作，因為 `build()` 可能會在父元件（Widget）重建時頻繁被呼叫。
* 避免建立過於龐大的單一元件，其 `build()` 函式過大。請根據封裝性以及元件變動方式將其拆分成不同元件：
  * 當對 `State` 物件呼叫 `setState()` 時，所有子孫元件都會重建。因此，應將 `setState()` 呼叫侷限於實際需要變更 UI 的子樹部分。如果變更只影響樹中的小區塊，避免在樹的高層呼叫 `setState()`。
  * 重建所有子孫元件的遍歷會在遇到與前一幀相同實例的子元件時停止。這個技巧在框架內部被大量用於最佳化動畫（Animation），當動畫不影響子樹時。請參考 [`TransitionBuilder`][] 模式，以及 [`SlideTransition` 原始碼][source code for `SlideTransition`]，其利用此原則在動畫時避免重建子元件。（「相同實例」是透過 `operator ==` 判斷，但請參閱本頁最後的陷阱區段，了解何時應避免覆寫 `operator ==`。）
  * 儘可能使用 `const` 建構函式，因為這能讓 Flutter 快速跳過大部分重建工作。若想在可能時自動提醒你使用 `const`，請啟用 [`flutter_lints`][] 套件中的推薦 lint。更多資訊請參考 [`flutter_lints` 遷移指南][`flutter_lints` migration guide]。
  * 若要建立可重複使用的 UI 區塊，建議使用 [`StatelessWidget`][]，而非單純的函式。

更多資訊請參考：

* [效能考量][Performance considerations]，屬於 [`StatefulWidget`][] API 文件的一部分
* [Widgets vs helper methods][]，這是 Flutter 官方 YouTube 頻道的影片，說明為何元件（特別是具有 `const` 建構函式的元件）比函式更具效能。

[`flutter_lints`]: https://pub.dev/packages/flutter_lints
[`flutter_lints` migration guide]: /release/breaking-changes/flutter-lints-package#migration-guide
[Performance considerations]: https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html#performance-considerations
[source code for `SlideTransition`]: https://github.com/flutter/flutter/blob/main/packages/flutter/lib/src/widgets/transitions.dart#L168
[`StatefulWidget`]: https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html
[`StatelessWidget`]: https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html
[`TransitionBuilder`]: https://api.flutter.dev/flutter/widgets/TransitionBuilder.html
[Widgets vs helper methods]: https://www.youtube.com/watch?v=IOyq-eTRhvo

---

### 使用 StringBuffer 來高效組合字串

當你需要從多個部分組合字串，特別是在迴圈內時，使用 `+` 運算子會效率低下，因為每次串接都會建立新的 `String` 物件。更好的做法是使用 `StringBuffer`，它會先收集所有字串，最後在呼叫 `toString()` 時一次串接。

<YouTubeEmbed id="xSsFtDY-nOw" title="StringBuffer (Technique of the Week)"></YouTubeEmbed>

---

### 謹慎使用 saveLayer()

有些 Flutter 程式碼會使用 `saveLayer()`（這是一個昂貴的操作）來實作各種 UI 視覺效果。即使你的程式碼沒有明確呼叫 `saveLayer()`，你使用的其他元件或套件也可能在背後呼叫它。也許你的應用程式呼叫了過多的 `saveLayer()`；過度呼叫 `saveLayer()` 會導致卡頓（jank）。

#### 為什麼 saveLayer 很昂貴？

呼叫 `saveLayer()` 會配置一個離屏緩衝區（offscreen buffer），並將內容繪製到該緩衝區時，可能會觸發渲染目標切換。GPU 希望像消防水管一樣高速運作，而渲染目標切換會強迫 GPU 暫時改變資料流向，然後再切回來。在行動裝置的 GPU 上，這對渲染吞吐量特別有影響。

#### 什麼時候必須使用 saveLayer？

在執行階段，如果你需要動態顯示來自伺服器的各種形狀（例如），且每個形狀都有透明度，且可能會重疊或不重疊，那麼你幾乎必須使用 `saveLayer()`。

#### 偵錯 saveLayer 呼叫

你如何判斷應用程式直接或間接呼叫了多少次 `saveLayer()`？`saveLayer()` 方法會在 [DevTools timeline][] 觸發事件；你可以在 [DevTools Performance view][] 中檢查 `PerformanceOverlayLayer.checkerboardOffscreenLayers` 開關，了解你的場景何時使用了 `saveLayer`。

[DevTools timeline]: /tools/devtools/performance#timeline-events-tab

#### 最小化 saveLayer 呼叫

你能避免呼叫 `saveLayer` 嗎？這可能需要你重新思考視覺效果的實現方式：

* 如果呼叫來自 _你的_ 程式碼，你能否減少或消除這些呼叫？
  例如，假設你的 UI 有兩個形狀重疊，且都有非零透明度：
  * 如果它們總是以相同方式、相同透明度重疊，你可以預先計算這個重疊後的半透明物件，快取起來，然後直接使用，而不是每次都呼叫 `saveLayer()`。這適用於任何你能預先計算的靜態形狀。
  * 你能否重構繪製邏輯，完全避免重疊？


* 如果呼叫來自你無法控制的套件，請聯絡套件作者詢問為何需要這些呼叫。能否減少或消除？如果不能，你可能需要尋找其他套件，或自行實作。

:::note 給套件作者的建議
作為最佳實踐，請考慮為你的套件提供相關文件，說明何時可能需要 `saveLayer`、如何避免，以及何時無法避免。
:::

其他可能觸發 `saveLayer()` 且潛在昂貴的元件 (Widget)：

* [`ShaderMask`][]
* [`ColorFilter`][]
* [`Chip`][]&mdash;若 `disabledColorAlpha != 0xff`，可能觸發 `saveLayer()` 呼叫
* [`Text`][]&mdash;若有 `overflowShader`，可能觸發 `saveLayer()` 呼叫

[`Chip`]: https://api.flutter.dev/flutter/material/Chip-class.html
[`ColorFilter`]: https://api.flutter.dev/flutter/dart-ui/ColorFilter-class.html
[`FadeInImage`]: https://api.flutter.dev/flutter/widgets/FadeInImage-class.html
[`Opacity`]: https://api.flutter.dev/flutter/widgets/Opacity-class.html
[`ShaderMask`]: https://api.flutter.dev/flutter/widgets/ShaderMask-class.html
[`Text`]: https://api.flutter.dev/flutter/widgets/Text-class.html
[Transparent image]: https://api.flutter.dev/flutter/widgets/Opacity-class.html#transparent-image

---

### 最小化 opacity 與裁剪（clipping）操作

Opacity（透明度）與裁剪（clipping）都是昂貴的操作。以下是一些實用建議：

* 僅在必要時使用 [`Opacity`][] 元件。請參考 `Opacity` API 頁面的 [Transparent image][] 區段，該範例展示了直接對圖片套用透明度，這比用 `Opacity` 元件更快。
* 若要為簡單形狀或文字套用透明度，通常直接用半透明顏色繪製會比包一層 `Opacity` 元件更快。（但前提是要繪製的形狀沒有重疊區塊。）
* 若要實作圖片淡入效果，建議使用 [`FadeInImage`][] 元件，它會利用 GPU 的片段著色器（fragment shader）實現漸變透明度。更多資訊請參考 [`Opacity`][] 文件。
* **裁剪（clipping）** 不會呼叫 `saveLayer()`（除非明確指定 `Clip.antiAliasWithSaveLayer`），因此這些操作不像 `Opacity` 那麼昂貴，但裁剪仍然有成本，請謹慎使用。預設情況下，裁剪是關閉的（`Clip.none`），需要時必須明確啟用。
* 若要建立圓角矩形，與其套用裁剪矩形，不如考慮使用許多元件類別都提供的 `borderRadius` 屬性。

---

### 審慎實作 grids 與 lists

你的 grids（網格）與 lists（清單）實作方式，可能會導致應用程式效能問題。本節說明建立 grids 與 lists 時的重要最佳實踐，以及如何判斷應用程式是否有過多的版面配置（layout）傳遞。

#### 採用 lazy（延遲）機制！

建立大型 grid 或 list 時，請使用 lazy builder 方法與回呼（callback）。這可確保啟動時只建立螢幕上可見的部分。

更多資訊與範例請參考：

* [處理長清單][Working with long lists]
* [建立一次只載入一頁的 `ListView`][Creating a `ListView` that loads one page at a time]，由 AbdulRahman AlHamali 撰寫的社群文章
* [`ListView.builder`][] API

[Creating a `ListView` that loads one page at a time]: https://medium.com/saugo360/flutter-creating-a-listview-that-loads-one-page-at-a-time-c5c91b6fabd3
[`ListView.builder`]: https://api.flutter.dev/flutter/widgets/ListView/ListView.builder.html
[Working with long lists]: /cookbook/lists/long-lists

#### 避免使用 intrinsics

關於 intrinsic 傳遞可能導致 grids 與 lists 問題的說明，請見下一節。

---

### 最小化由 intrinsic 操作引起的 layout 傳遞

如果你有較多 Flutter 開發經驗，應該熟悉[版面配置與約束的運作方式][how layout and constraints work]。你甚至可能已經記住 Flutter 的基本版面配置規則：**Constraints go down. Sizes go up. Parent sets position.**

對於某些元件，特別是 grids 與 lists，版面配置過程可能很耗資源。Flutter 會盡量只對元件進行一次 layout 傳遞，但有時需要第二次傳遞（稱為 _intrinsic pass_），這會拖慢效能。

#### 什麼是 intrinsic pass？

當你希望所有格子都與最大或最小的格子同尺寸（或進行類似需要查詢所有格子的計算）時，就會發生 intrinsic pass。

舉例來說，假設有一個大型的 `Card` grid。grid 應有統一尺寸的格子，因此 layout 程式碼會從 grid 的根節點（widget tree 中）開始，詢問 grid 中**每一個**卡片（不僅是可見卡片）其 _intrinsic_ 尺寸——即在無約束下元件偏好的尺寸。有了這些資訊，框架會決定統一的格子尺寸，然後再次遍歷所有格子，告訴每個卡片該用什麼尺寸。

#### 偵錯 intrinsic 傳遞

若要判斷是否有過多的 intrinsic 傳遞，請在 DevTools（預設關閉）啟用 **[Track layouts option][]**，並查看應用程式的 [stack trace][]，了解進行了多少次 layout 傳遞。啟用追蹤後，intrinsic timeline 事件會標記為 '$runtimeType intrinsics'。

#### 避免 intrinsic 傳遞

你有幾種方式可以避免 intrinsic pass：

* 直接將格子尺寸設為固定值。
* 選定特定格子作為「錨點」格子——所有格子都以此為基準調整尺寸。你可以撰寫自訂的 [`RenderObject`][]，先定位錨點子元件，再依序配置其他子元件。

想進一步了解 layout 的運作方式，請參考 [Flutter 架構總覽][Flutter architectural overview] 中的 [layout and rendering][] 章節。


[Flutter architectural overview]: /resources/architectural-overview
[how layout and constraints work]: /ui/layout/constraints
[layout and rendering]: /resources/architectural-overview#layout-and-rendering
[stack trace]: /tools/devtools/cpu-profiler#flame-chart
[Track layouts option]: /tools/devtools/performance#track-layouts

---

### 在 16ms 內建立並顯示畫面

由於建立與渲染分別在兩個執行緒進行，在 60Hz 螢幕上，你有 16ms 用於建立，16ms 用於渲染。如果你在意延遲，請確保在 _16ms 以內_ 完成一個畫面的建立與顯示。換句話說，建立需在 8ms 以內，渲染也需在 8ms 以內，總計不超過 16ms。

如果你的畫面在 [profile mode][] 下總渲染時間遠低於 16ms，即使有些效能陷阱存在，通常也不用太擔心，但仍應盡量讓畫面建立與渲染越快越好。為什麼？

* 將畫面渲染時間壓低到 16ms 以下，雖然視覺上可能沒差異，但能**提升電池續航**並減少發熱。
* 在你的裝置上可能運作順暢，但請考慮你所支援的最低規格裝置的效能表現。
* 隨著 120fps 裝置愈來愈普及，你需要在 8ms（總計）以內渲染畫面，才能提供最流暢的體驗。

如果你想了解為何 60fps 能帶來流暢的視覺體驗，請參考影片 [Why 60fps?][]

[profile mode]: /testing/build-modes#profile
[Why 60fps?]: https://www.youtube.com/watch?v=CaMTIgxCSqU

## 陷阱

如果你需要調校應用程式效能，或 UI 的流暢度不如預期，[DevTools Performance view][] 可以幫上忙！

此外，IDE 的 Flutter 插件也可能有所幫助。在 Flutter Performance 視窗中，勾選 **Show widget rebuild information** 核取方塊。此功能有助於偵測畫面渲染與顯示時間超過 16ms 的情況。在可能的情況下，插件會提供相關建議的連結。

以下行為可能會對應用程式效能造成負面影響：

* 避免使用 `Opacity` 元件，特別是在動畫中避免使用。請改用 `AnimatedOpacity` 或 `FadeInImage`。更多資訊請參考[透明度動畫的效能考量][Performance considerations for opacity animation]。

* 使用 `AnimatedBuilder` 時，避免在 builder 函式中放置不依賴動畫的子樹。該子樹會在每個動畫 tick 時重建。應將該部分子樹建置一次後，以 child 的形式傳入 `AnimatedBuilder`。更多資訊請參考[效能最佳化][Performance optimizations]。

* 避免在動畫中使用裁剪。若可行，請在動畫前先預先裁剪圖片。

* 如果大多數子元件不在螢幕上可見，避免使用含具體 `List` 子元件的建構函式（例如 `Column()` 或 `ListView()`），以降低建置成本。

* 避免在 `Widget` 物件上覆寫 `operator ==`。雖然看起來可以藉此避免不必要的重建，但實際上會因為 O(N²) 的行為而損害效能。此規則的唯一例外是葉節點元件（沒有子元件的元件），且僅限於比較元件屬性的成本明顯低於重建元件，以及元件設定鮮少變動的特定情況。即便如此，通常仍建議依賴快取元件，因為即使只有一處覆寫 `operator ==`，也可能導致整體效能下降——編譯器將無法再假設該呼叫始終是靜態的。


## 資源

更多效能相關資訊，請參考以下資源：

* AnimatedBuilder API 頁面中的[效能最佳化][Performance optimizations]
* Opacity API 頁面中的[透明度動畫的效能考量][Performance considerations for opacity animation]
* ListView API 頁面中的[子元素生命週期][Child elements' lifecycle]及其高效載入方式
* `StatefulWidget` 的[效能考量][Performance considerations]
* [優化 Flutter Web 載入速度的最佳實踐][best-practices-medium]

[Child elements' lifecycle]: https://api.flutter.dev/flutter/widgets/ListView-class.html#child-elements-lifecycle
[`CustomPainter`]: https://api.flutter.dev/flutter/rendering/CustomPainter-class.html
[DevTools Performance view]: /tools/devtools/performance
[Performance optimizations]: https://api.flutter.dev/flutter/widgets/AnimatedBuilder-class.html#performance-optimizations
[Performance considerations for opacity animation]: https://api.flutter.dev/flutter/widgets/Opacity-class.html#performance-considerations-for-opacity-animation
[`RenderObject`]: https://api.flutter.dev/flutter/rendering/RenderObject-class.html
[best-practices-medium]: https://blog.flutter.dev/best-practices-for-optimizing-flutter-web-loading-speed-7cc0df14ce5c

