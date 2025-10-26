---
title: 使用 Performance 檢視
description: 學習如何使用 DevTools 的 Performance 檢視。
---

:::note
DevTools 的 Performance 檢視適用於 Flutter 行動裝置與桌面應用程式。
對於 Web 應用程式，Flutter 會將時間軸事件加入
Chrome DevTools 的 performance 面板中。
若要了解如何分析 Web 應用程式的效能，
請參考 [Debugging web performance][Debugging web performance]。
:::

[Debugging web performance]: /perf/web-performance

Performance 頁面可以協助你診斷應用程式中的效能問題與 UI 卡頓（jank）。
此頁面會提供應用程式活動的時序與效能資訊。
它包含多種工具，協助你找出應用程式效能不佳的原因：

* Flutter frames 圖表（僅限 Flutter 應用程式）
* Frame analysis 分析標籤（僅限 Flutter 應用程式）
* Timeline events 時間軸事件追蹤檢視器（所有原生 Dart 應用程式皆適用）
* 進階除錯工具（僅限 Flutter 應用程式）

:::secondary
**請使用應用程式的 [profile build][profile build] 來分析效能。**
在 debug 模式下執行時，frame 的渲染時間無法反映實際發佈時的效能。
請以 profile 模式執行你的應用程式，此模式仍會保留有用的除錯資訊。
:::

[profile build]: /testing/build-modes#profile

Performance 檢視也支援匯入與匯出資料快照。
如需詳細資訊，請參考 [Import and export][Import and export] 章節。

## 什麼是 Flutter 的 frame？

Flutter 設計上會以每秒 60 幀（fps）來渲染 UI，
在支援 120Hz 更新頻率的裝置上則為 120 fps。
每次渲染稱為一個 _frame_（幀）。
這代表大約每 16 毫秒，UI 就會更新一次，
以反映動畫或其他 UI 變化。若某個 frame 渲染超過 16 毫秒，
就會在顯示裝置上產生卡頓（jank，畫面不流暢）。

## Flutter frames 圖表

此圖表包含應用程式的 Flutter frame 資訊。
圖表中的每一組 bar 代表一個 Flutter frame。
這些 bar 會以不同顏色區分，突顯渲染 Flutter frame 時
所發生的不同工作部分：UI 執行緒的工作與 raster 執行緒的工作。

此圖表包含應用程式的 Flutter frame 時間資訊。
圖表中的每對 bar 代表一個 Flutter frame。
從此圖表選取 frame 會更新下方
[Frame analysis](#frame-analysis-分析標籤) 標籤或 [Timeline events](#timeline-events-時間軸事件標籤) 標籤所顯示的資料。

[DevTools 2.23.1]: /tools/devtools/release-notes/release-notes-2.23.1

當你的應用程式繪製新 frame 時，Flutter frames 圖表會自動更新。
若要暫停圖表的更新，請點擊圖表右側的暫停按鈕。
你也可以點擊圖表上方的 **Flutter frames** 按鈕，將圖表收合，
以便下方資料有更多顯示空間。

![Flutter frames 圖表螢幕截圖](/assets/images/docs/tools/devtools/flutter-frames-chart.png)

每個 Flutter frame 所對應的兩個 bar 會以不同顏色區分，
以突顯渲染 Flutter frame 時發生的不同工作部分：
UI 執行緒的工作與 raster 執行緒的工作。

### UI

UI 執行緒會在 Dart VM 中執行 Dart 程式碼，
這包含你的應用程式程式碼以及 Flutter framework 的程式碼。
當你的應用程式建立並顯示場景時，UI 執行緒會建立 layer tree，
這是一個包含與裝置無關繪製指令的輕量物件，
並將 layer tree 傳送到 raster 執行緒在裝置上進行渲染。
**請勿** 阻塞這個執行緒。

### Raster

Raster 執行緒會執行來自 Flutter Engine 的圖形程式碼。
這個執行緒會接收 layer tree，並透過 GPU（圖形處理器）進行顯示。
你無法直接存取 raster 執行緒或其資料，
但如果這個執行緒變慢，通常是 Dart 程式碼造成的。
Skia（圖形函式庫）會在這個執行緒上運作。
[Impeller][Impeller] 也會使用這個執行緒。

[Impeller]: /perf/impeller

有時候，一個場景會產生容易建立但在 raster 執行緒上渲染成本高昂的 layer tree。
這種情況下，你需要找出你的程式碼中導致渲染程式碼變慢的原因。
某些特定的工作負載對 GPU 來說較為困難，
例如不必要地呼叫 `saveLayer()`、多個物件交疊的透明度（opacity），
以及特定情境下的裁剪（clip）或陰影（shadow）。

如需效能分析的詳細資訊，請參考
[Identifying problems in the GPU graph][GPU graph]。

### Jank（慢 frame）

Frame 渲染圖表會以紅色覆蓋顯示卡頓（jank）。
若某個 frame 渲染超過約 16 毫秒（針對 60 FPS 裝置），
就會被視為卡頓（janky）。
為達到 60 FPS（每秒 60 幀）的渲染速率，
每個 frame 必須在約 16 毫秒內完成渲染。
若未達此目標，可能會出現 UI 卡頓或 frame 掉幀的情況。

如需分析應用程式效能的詳細資訊，請參考
[Flutter performance profiling][Flutter performance profiling]。

### 著色器（Shader）編譯

當你的 Flutter 應用程式首次使用某個 shader（著色器）時，會進行著色器編譯。
執行著色器編譯的 frame 會以深紅色標記：

![Frame 著色器編譯螢幕截圖](/assets/images/docs/tools/devtools/shader-compilation-frames-chart.png)

如需降低著色器編譯卡頓的方法，請參考
[Reduce shader compilation jank on mobile][Reduce shader compilation jank on mobile]。

## Frame analysis 分析標籤

從上方 Flutter frames 圖表選取一個卡頓（janky，紅色）frame，
會在 Frame analysis 分析標籤中顯示除錯提示。
這些提示能協助你診斷應用程式中的卡頓，
並通知你我們偵測到的任何高成本操作，
這些操作可能導致該 frame 渲染時間過長。

![Frame analysis 分析標籤螢幕截圖](/assets/images/docs/tools/devtools/frame-analysis-tab.png)

## Timeline events 時間軸事件標籤

Timeline events 圖表會顯示應用程式所有事件追蹤紀錄。
Flutter framework 在建構 frame、繪製場景及追蹤其他活動（如 HTTP 請求時序與垃圾回收）時，
會發出 timeline 事件。這些事件會在 Timeline 中顯示。
你也可以使用 dart:developer 的
[`Timeline`][`Timeline`] 與 [`TimelineTask`][`TimelineTask`] API 發送自訂 Timeline 事件。

[`Timeline`]: {{site.api}}/flutter/dart-developer/Timeline-class.html
[`TimelineTask`]: {{site.api}}/flutter/dart-developer/TimelineTask-class.html

![Timeline events 標籤螢幕截圖](/assets/images/docs/tools/devtools/timeline-events-tab.png)
如需操作與瀏覽 trace viewer 的協助，
請點擊 timeline events 標籤列右上角的 **?** 按鈕。
若要以應用程式的新事件刷新 timeline，請點擊
控制列右上角的刷新按鈕。

## 進階除錯工具

### 增強追蹤（Enhance tracing）

若要在 timeline events 圖表中檢視更詳細的追蹤資訊，
請使用增強追蹤下拉選單中的選項：

:::note
啟用這些選項時，frame 時間可能會受到負面影響。
:::

![增強追蹤選項螢幕截圖](/assets/images/docs/tools/devtools/enhanced-tracing.png)

若要查看新的 timeline 事件，請在你的應用程式中重現你想追蹤的活動，
然後選取一個 frame 以檢查 timeline。

### 追蹤元件（Widget）建構

若要在 timeline 中看到 `build()` 方法事件，
請啟用 **Track Widget Builds** 選項。
timeline 事件中會顯示元件（Widget）的名稱。

![Track widget builds 螢幕截圖](/assets/images/docs/tools/devtools/track-widget-builds.png)

[觀看此影片，瞭解追蹤元件建構的範例][track-widgets]

### 追蹤版面配置（Track layouts）

若要在 timeline 中看到 render object 版面配置事件，
請啟用 **Track Layouts** 選項：

![Track layouts 螢幕截圖](/assets/images/docs/tools/devtools/track-layouts.png)

[觀看此影片，瞭解追蹤版面配置的範例][track-layouts]

### 追蹤繪製（Track paints）

若要在 timeline 中看到 render object 繪製事件，
請啟用 **Track Paints** 選項：

![Track paints 螢幕截圖](/assets/images/docs/tools/devtools/track-paints.png)

[觀看此影片，瞭解追蹤繪製的範例][track-paints]

## 更多除錯選項

若要診斷與渲染層（rendering layers）相關的效能問題，
可以關閉某個渲染層。
這些選項預設為啟用。

若要觀察對應用程式效能的影響，
請在應用程式中重現相關活動，
然後在 frames 圖表中選取新的 frame，
以檢查關閉層後 timeline events 的變化。
如果 raster 時間明顯下降，
表示你所關閉的效果過度使用，可能是造成卡頓的原因。

**Render Clip layers**
: 關閉此選項可檢查過度使用裁剪（clipping）是否影響效能。
  若關閉後效能改善，請嘗試減少應用程式中的裁剪效果。

**Render Opacity layers**
: 關閉此選項可檢查過度使用透明度（opacity）效果是否影響效能。
  若關閉後效能改善，請嘗試減少應用程式中的透明度效果。

**Render Physical Shape layers**
: 關閉此選項可檢查過度使用物理建模效果（如陰影或 elevation）是否影響效能。
  若關閉後效能改善，請嘗試減少應用程式中的物理建模效果。

![更多除錯選項螢幕截圖](/assets/images/docs/tools/devtools/more-debugging-options.png)

## 匯入與匯出

DevTools 支援匯入與匯出效能快照。
點擊 frame rendering 圖表右上方的匯出按鈕，
即可下載目前 Performance 頁面的資料快照。
若要匯入效能快照，你可以將快照檔案從任何頁面拖曳到 DevTools。
**請注意，DevTools 僅支援匯入原本由 DevTools 匯出的檔案。**

## 其他資源

若要學習如何使用 DevTools 監控應用程式效能並偵測卡頓，
請參考導覽式
[Performance View 教學][performance-tutorial]。

[GPU graph]: /perf/ui-performance#identifying-problems-in-the-gpu-graph
[Flutter performance profiling]: /perf/ui-performance
[Reduce shader compilation jank on mobile]: /perf/rendering-performance
[Import and export]: #匯入與匯出
[performance-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-performance-view-part-8-of-8-4ae762f91230
[track-widgets]: {{site.yt.watch}}/_EYk-E29edo?t=623
[track-layouts]: {{site.yt.watch}}/_EYk-E29edo?t=676
[track-paints]: {{site.yt.watch}}/_EYk-E29edo?t=748
