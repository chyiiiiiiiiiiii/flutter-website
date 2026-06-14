# 使用 Performance 檢視

> 學習如何使用 DevTools 的 Performance 檢視。



:::note
DevTools 的 Performance 檢視適用於 Flutter 行動裝置與桌面應用程式。
對於 Web 應用程式，Flutter 會將時間軸事件新增到
Chrome DevTools 的 performance 面板中。
若要了解如何對 Web 應用程式進行效能分析，
請參閱 [Debugging web performance][Debugging web performance]。
:::

[Debugging web performance]: /perf/web-performance

Performance 頁面可以協助你診斷應用程式中的效能問題與 UI 卡頓（jank）。
此頁面提供應用程式活動的時序與效能資訊，
包含多項工具，協助你找出導致效能不佳的原因：

* Flutter frames 圖表（僅限 Flutter 應用程式）
* Frame analysis 分析標籤（僅限 Flutter 應用程式）
* Timeline events 事件追蹤檢視器（所有原生 Dart 應用程式）
* 進階除錯工具（僅限 Flutter 應用程式）

:::secondary
**請使用應用程式的 [profile build][profile build] 來分析效能。**
在 debug 模式下執行時，frame 的渲染時間無法反映正式版的效能表現。
請以 profile 模式執行你的應用程式，該模式仍保留有用的除錯資訊。
:::

[profile build]: /testing/build-modes#profile

Performance 檢視也支援匯入與匯出資料快照。
如需詳細資訊，請參閱 [Import and export][Import and export] 章節。

## Flutter 中的 frame 是什麼？

Flutter 設計目標是在每秒 60 幀（fps）下渲染 UI，
或在支援 120Hz 更新的裝置上達到 120 fps。
每一次渲染稱為一個 _frame_（畫格）。
這代表大約每 16 毫秒，UI 就會更新一次，
以反映動畫或其他 UI 變化。
若某個 frame 渲染超過 16 毫秒，會導致畫面卡頓（jank）。

## Flutter frames 圖表

此圖表包含你的應用程式的 Flutter frame 資訊。
圖表中的每一組 bar 代表一個 Flutter frame。
這些 bar 以不同顏色區分，突顯出渲染 Flutter frame 時
UI 執行緒與 raster 執行緒所執行的不同工作階段。

這個圖表提供你的應用程式的 Flutter frame 時間資訊。
圖表中的每對 bar 代表一個 Flutter frame。
從這個圖表選取某個 frame，會更新下方
[Frame analysis](#frame-analysis-分析標籤) 標籤或 [Timeline events](#timeline-events-事件標籤) 標籤所顯示的資料。

[DevTools 2.23.1]: /tools/devtools/release-notes/release-notes-2.23.1

當你的應用程式繪製新 frame 時，Flutter frames 圖表會自動更新。
若要暫停圖表更新，請點擊圖表右側的暫停按鈕。
你也可以點擊圖表上方的 **Flutter frames** 按鈕來收合此圖表，
以便為下方資料提供更多瀏覽空間。

![Flutter frames 圖表螢幕截圖](/assets/images/docs/tools/devtools/flutter-frames-chart.png)

每個 Flutter frame 對應的兩個 bar 會以不同顏色區分，
用來突顯渲染過程中 UI 執行緒與 raster 執行緒所執行的不同工作階段。

### UI

UI 執行緒在 Dart VM 中執行 Dart 程式碼，包含你的應用程式程式碼與 Flutter framework 程式碼。
當你的應用程式建立並顯示一個場景時，UI 執行緒會建立一個 layer tree（層級樹），
這是一個包含與裝置無關繪製指令的輕量物件，並將 layer tree 傳送給 raster 執行緒，
由其負責在裝置上渲染。**請勿**阻塞此執行緒。

### Raster

Raster 執行緒執行來自 Flutter Engine 的圖形程式碼。
此執行緒會接收 layer tree，並透過與 GPU（圖形處理單元）溝通來顯示畫面。
你無法直接存取 raster 執行緒或其資料，但如果這個執行緒變慢，
通常是因為 Dart 程式碼中某些操作導致。
Skia（圖形函式庫）在此執行緒上運行。
[Impeller][Impeller] 也會使用這個執行緒。

[Impeller]: /perf/impeller

有時候，一個場景雖然 layer tree 結構簡單，但在 raster 執行緒上渲染卻很耗資源。
這種情況下，你需要找出是哪些程式碼導致渲染變慢。
某些特定工作負載對 GPU 來說較困難，可能包含不必要的 `saveLayer()` 呼叫、
多物件交疊的透明度（opacity）、以及特定情境下的裁剪（clip）或陰影（shadow）效果。

如需效能分析的更多資訊，請參閱
[Identifying problems in the GPU graph][GPU graph]。

### Jank（卡頓 frame）

Frame 渲染圖表會以紅色覆蓋顯示卡頓（jank）。
若某個 frame 渲染超過約 16 毫秒（以 60 FPS 裝置為例），
就會被視為卡頓 frame。
為了達到每秒 60 幀（FPS）的渲染速度，每個 frame 必須在約 16 毫秒內完成渲染。
若未達標，則可能出現 UI 卡頓或掉幀（dropped frames）。

如需分析應用程式效能的更多資訊，請參閱 [Flutter performance profiling][Flutter performance profiling]。

### 著色器（Shader）編譯

當你的 Flutter 應用程式首次使用某個著色器（shader）時，會進行著色器編譯。
執行著色器編譯的 frame 會以深紅色標示：

![Frame 著色器編譯螢幕截圖](/assets/images/docs/tools/devtools/shader-compilation-frames-chart.png)

如需降低著色器編譯卡頓的方法，請參閱
[Reduce shader compilation jank on mobile][Reduce shader compilation jank on mobile]。

## Frame analysis 分析標籤

從上方 Flutter frames 圖表選取一個卡頓 frame（紅色，速度較慢），
Frame analysis 標籤會顯示除錯提示。
這些提示可協助你診斷應用程式中的卡頓現象，
並提醒你我們偵測到哪些可能導致 frame 時間變慢的高成本操作。

![Frame analysis 分析標籤螢幕截圖](/assets/images/docs/tools/devtools/frame-analysis-tab.png)

## Timeline events 事件標籤

Timeline events 圖表顯示應用程式的所有事件追蹤紀錄。
Flutter framework 會在建構 frame、繪製場景，以及追蹤其他活動（如 HTTP 請求時序與垃圾回收）時發出時間軸事件。
這些事件會顯示在 Timeline 中。
你也可以使用 dart:developer 的 [`Timeline`][`Timeline`] 與 [`TimelineTask`][`TimelineTask`] API 發送自訂 Timeline 事件。

[`Timeline`]: https://api.flutter.dev/flutter/dart-developer/Timeline-class.html
[`TimelineTask`]: https://api.flutter.dev/flutter/dart-developer/TimelineTask-class.html

![Timeline events 標籤螢幕截圖](/assets/images/docs/tools/devtools/timeline-events-tab.png)
如需操作與瀏覽 trace viewer 的協助，
請點擊 timeline events 標籤列右上角的 **?** 按鈕。
若要以應用程式的新事件重新整理 timeline，
請點擊標籤控制區右上角的重新整理按鈕。

## 進階除錯工具

### 增強追蹤（Enhance tracing）

若要在 timeline events 圖表中檢視更詳細的追蹤資訊，
請使用增強追蹤下拉選單中的選項：

:::note
啟用這些選項時，frame 時間可能會受到負面影響。
:::

![增強追蹤選項螢幕截圖](/assets/images/docs/tools/devtools/enhanced-tracing.png)

若要查看新的 timeline 事件，請在應用程式中重現你想追蹤的活動，
然後選取某個 frame 以檢查 timeline。

### 追蹤 Widget 建構

若要在 timeline 中查看 `build()` 方法事件，
請啟用 **Track Widget Builds** 選項。
timeline 事件中會顯示 widget 的名稱。

![Track widget builds 螢幕截圖](/assets/images/docs/tools/devtools/track-widget-builds.png)

[觀看此影片，了解追蹤 widget 建構的範例][track-widgets]

### 追蹤版面配置（Track layouts）

若要在 timeline 中查看 render object 版面配置事件，
請啟用 **Track Layouts** 選項：

![Track layouts 螢幕截圖](/assets/images/docs/tools/devtools/track-layouts.png)

[觀看此影片，了解追蹤版面配置的範例][track-layouts]

### 追蹤繪製（Track paints）

若要在 timeline 中查看 render object 繪製事件，
請啟用 **Track Paints** 選項：

![Track paints 螢幕截圖](/assets/images/docs/tools/devtools/track-paints.png)

[觀看此影片，了解追蹤繪製的範例][track-paints]

## 更多除錯選項

若要診斷與渲染層（rendering layers）相關的效能問題，
可切換關閉某個渲染層。
這些選項預設為啟用。

若要觀察對應用程式效能的影響，
請在應用程式中重現相關活動，
然後在 frames 圖表中選取新 frame，
以檢查 timeline 事件（在已停用層的情況下）。
如果 raster 時間明顯減少，
代表你停用的效果可能過度使用，導致應用程式出現卡頓。

**Render Clip layers**
: 關閉此選項以檢查過度使用裁剪（clipping）是否影響效能。
  若關閉後效能改善，請嘗試減少應用程式中裁剪效果的使用。
  
**Render Opacity layers**
:  關閉此選項以檢查過度使用透明度（opacity）效果是否影響效能。
   若關閉後效能改善，請嘗試減少應用程式中透明度效果的使用。
  
**Render Physical Shape layers**
: 關閉此選項以檢查過度使用實體建模（physical modeling）效果（如陰影或 elevation）是否影響效能。
  若關閉後效能改善，請嘗試減少應用程式中實體建模效果的使用。

![更多除錯選項螢幕截圖](/assets/images/docs/tools/devtools/more-debugging-options.png)

## 匯入與匯出

DevTools 支援匯入與匯出效能快照。
點擊 frame rendering 圖表上方右上角的匯出按鈕，
即可下載目前 Performance 頁面的資料快照。
若要匯入效能快照，你可以從任一頁面將快照檔案拖曳到 DevTools 中。
**請注意，DevTools 僅支援匯入原本由 DevTools 匯出的檔案。**

## 其他資源

若要學習如何使用 DevTools 監控應用程式效能並偵測卡頓，
請參閱導覽式
[Performance View 教學][performance-tutorial]。

[GPU graph]: /perf/ui-performance#identifying-problems-in-the-gpu-graph
[Flutter performance profiling]: /perf/ui-performance
[Reduce shader compilation jank on mobile]: /perf/rendering-performance
[Import and export]: #匯入與匯出
[performance-tutorial]: https://medium.com/@fluttergems/mastering-dart-flutter-devtools-performance-view-part-8-of-8-4ae762f91230
[track-widgets]: https://www.youtube.com/watch/_EYk-E29edo?t=623
[track-layouts]: https://www.youtube.com/watch/_EYk-E29edo?t=676
[track-paints]: https://www.youtube.com/watch/_EYk-E29edo?t=748

