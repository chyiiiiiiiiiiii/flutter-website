---
title: Flutter 效能分析（Performance Profiling）
subtitle: 當你的 Flutter 應用程式在 UI 上掉幀時，該從哪裡著手排查。
description: 診斷 Flutter 的 UI 效能問題。
---

## 概覽

應用程式效能涵蓋多個層面，從純粹的速度與 I/O 吞吐量，到使用者介面的流暢度。本頁重點著重於 UI 流暢度（避免卡頓或延遲），但這裡介紹的工具通常也能用於診斷其他效能問題。

Flutter 提供了多種效能分析工具，以下是其中幾項：

* **效能疊加層（Performance Overlay）**：直接在執行中的應用程式內顯示簡化的效能指標。詳情請參閱本主題後續章節。

* **效能檢視（Performance View）**：一個網頁介面，可連接到你的應用程式並顯示詳細的效能指標。這是 DevTools 工具的一部分。詳情請參閱 [使用效能檢視][Use the Performance View]。

* **Dart 內的效能追蹤（Performance tracing within Dart）**：可直接在你的 Dart 程式碼中加入追蹤（tracing），使用 `dart:developer package`，然後在 DevTools 工具中追蹤你的應用程式效能。詳情請參閱 [追蹤 Dart 程式碼][Tracing Dart code]。

* **效能基準測試（Benchmarking）**：你可以撰寫基準測試來衡量並追蹤應用程式效能。Flutter Driver 函式庫提供基準測試支援。透過這個整合測試框架，你可以產生追蹤卡頓、下載大小、電池效率與啟動時間等指標。更多資訊請參閱 [整合測試][Integration testing]。

* **元件重建分析器（Widget rebuild profiler，IntelliJ for Android Studio）**：卡頓常常是由於不必要的 UI 重建所導致。如果你使用的是 IntelliJ for Android Studio，Widget Rebuild Profiler 可以協助你定位並修正這些問題，顯示目前螢幕與畫格的元件重建次數。詳情請參閱 [顯示效能資料][Show performance data]。

Flutter 的目標是提供每秒 60 幀（fps）的效能，若裝置支援則可達到 120 fps。為了達到 60fps，每一畫格必須在約 16 毫秒內完成渲染，才能避免卡頓。當畫格渲染時間明顯超過這個標準並被丟棄時，就會產生卡頓現象，導致動畫出現明顯的延遲。例如，若某一畫格偶爾需要比平常多 10 倍的時間來渲染，這個畫格很可能會被丟棄，造成動畫出現頓挫感。

[Use the Performance View]: /tools/devtools/performance
[Tracing Dart code]: /testing/code-debugging#trace-dart-code-performance
[Show performance data]: /tools/android-studio#show-performance-data
[Integration testing]: /testing/integration-tests

## 連接實體裝置

幾乎所有 Flutter 應用程式的效能除錯工作，都應該在實體 Android 或 iOS 裝置上進行，並且讓你的 Flutter 應用程式以 [profile mode][profile mode] 執行。使用 debug mode 或在模擬器（simulator）/模擬裝置（emulator）上執行，通常無法反映最終 release mode 構建的實際行為。
_你應該考慮在用戶可能會用到的最慢裝置上檢查效能。_

:::secondary 為什麼要在真實裝置上執行
* 模擬器與模擬裝置所使用的硬體不同，因此效能特性也不同——有些操作在模擬器上比真實裝置快，有些則較慢。
* Debug mode 會啟用額外的檢查（如 assert），這些檢查在 profile 或 release 構建時不會執行，而這些檢查可能會消耗較多資源。
* Debug mode 的程式碼執行方式也與 release mode 不同。Debug 構建會在應用程式執行時「即時編譯」（JIT）Dart 程式碼，而 profile 與 release 構建則會在應用程式載入到裝置前，預先編譯為原生指令（也稱為「預先編譯」AOT）。JIT 可能會導致應用程式暫停進行 JIT 編譯，這本身就可能造成卡頓。
:::

## 以 profile mode 執行

Flutter 的 profile mode 編譯並啟動你的應用程式，方式幾乎與 release mode 相同，但會額外保留足夠的功能以協助除錯效能問題。例如，profile mode 會提供追蹤資訊給效能分析工具。

:::note
Dart/Flutter DevTools 無法連接到以 profile mode 執行的 Flutter web 應用程式。
請使用 Chrome DevTools
[產生時間軸事件][generate timeline events] 來分析 web 應用程式。
:::

以 profile mode 啟動應用程式的方法如下：

* 在 VS Code 中，開啟你的 `launch.json` 檔案，並將
  `flutterMode` 屬性設為 `profile`
  （效能分析完成後，請將其改回 `release` 或 `debug`）：

  ```json
  "configurations": [
    {
      "name": "Flutter",
      "request": "launch",
      "type": "dart",
      "flutterMode": "profile"
    }
  ]
  ```
* 在 Android Studio 和 IntelliJ 中，請使用 **Run > Flutter Run main.dart in Profile Mode** 選單項目。
* 若使用命令列，請加上 `--profile` 旗標：

  ```console
  $ flutter run --profile
  ```

如需不同模式的詳細資訊，請參閱 [Flutter 的建置模式][Flutter's build modes]。

你將從開啟 DevTools 並檢視效能疊加層（performance overlay）開始，
相關說明請參見下一節。

[Flutter's build modes]: /testing/build-modes
[generate timeline events]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance/performance-reference

## 啟動 DevTools

DevTools 提供多種功能，例如效能分析（profiling）、檢查堆積（heap）、顯示程式碼涵蓋率、啟用效能疊加層，以及逐步除錯器。
DevTools 的 [時間軸檢視（Timeline view）][Timeline view] 可讓你逐幀調查應用程式的 UI 效能。

當你的應用程式以 profile mode 執行時，請[啟動 DevTools][launch DevTools]。

[Timeline view]: /tools/devtools/performance
[launch DevTools]: /tools/devtools

## 顯示效能疊加層 {:#displaying-the-performance-overlay}

你可以透過以下方式切換效能疊加層的顯示：

* **DevTools Performance 檢視**：在 [DevTools][DevTools] 的 [Performance 檢視][Performance view] 中啟用 PerformanceOverlay 元件是最簡單的方式。只需點擊 **Performance Overlay** 按鈕，即可在執行中的應用程式上切換疊加層顯示。

* **命令列**：在命令列中按下 **P** 鍵即可切換效能疊加層。

* **程式化啟用**：若要以程式方式啟用疊加層，請參閱 [Performance overlay][Performance overlay]，該內容位於 [以程式方式除錯 Flutter 應用程式][Debugging Flutter apps programmatically] 頁面。

[Performance overlay]: /testing/code-debugging#add-performance-overlay
[Debugging Flutter apps programmatically]: /testing/code-debugging

<a id="the-performance-overlay" aria-hidden="true"></a>

## 觀察效能疊加層 {:#performance-overlay}

效能疊加層會以兩個圖表顯示統計資訊，讓你了解應用程式的時間花費在哪裡。如果 UI 出現卡頓（跳幀），這些圖表有助於你找出原因。
圖表會顯示在執行中的應用程式上方，但它們不是以一般元件（Widget）繪製&mdash;而是由 Flutter 引擎直接繪製，對效能的影響極小。
每個圖表代表該執行緒最近 300 幀的狀態。

本節將說明如何啟用效能疊加層，並利用它診斷應用程式卡頓的原因。
下圖為 Flutter Gallery 範例中執行的效能疊加層畫面截圖：

![Screenshot of overlay showing zero jank](/assets/images/docs/tools/devtools/performance-overlay-green.png)
<br>效能疊加層顯示上方為 raster 執行緒，
下方為 UI 執行緒。<br>垂直綠色條代表當前幀。

### 檢視圖表 {:#interpreting-the-graphs}

上方圖表（標示為 "GPU"）顯示 raster 執行緒所花費的時間，下方圖表則顯示 UI 執行緒所花費的時間。
圖表中的白線代表垂直軸上的 16 毫秒間隔；如果圖表超過這些線條，則代表執行頻率低於 60Hz。
水平軸代表幀數。圖表僅在應用程式繪製時更新，因此如果應用程式處於閒置狀態，圖表也會暫停移動。

疊加層應始終在 [profile mode][profile mode] 下檢視，因為 [debug mode][debug mode] 會為了協助開發而犧牲效能，啟用較昂貴的斷言（assert），因此結果並不具參考價值。

每一幀都應該在 1/60 秒（約 16 毫秒）內建立並顯示。若有任何一個圖表的幀超過此限制，該幀將無法即時顯示，造成卡頓，並在圖表中出現垂直紅色條。
若 UI 圖表出現紅條，代表 Dart 程式碼運算過於耗時；若 GPU 圖表出現紅色垂直條，則代表場景過於複雜，無法快速渲染。

![Screenshot of performance overlay showing jank with red bars](/assets/images/docs/tools/devtools/performance-overlay-jank.png)
<br>垂直紅條表示目前幀在繪製與渲染上都很耗時。<br>當兩個圖表同時出現紅條時，請先從診斷 UI 執行緒著手。

### 檢視執行緒 {:#flutters-threads}

Flutter 會使用多個執行緒來完成工作，但疊加層僅顯示其中兩個執行緒。
所有 Dart 程式碼都在 UI 執行緒上執行。
雖然你無法直接存取其他執行緒，但你在 UI 執行緒上的操作會影響其他執行緒的效能。

**Platform 執行緒**
: 平台的主執行緒。Plugin 程式碼會在此執行。
  詳細資訊請參閱 iOS 的 [UIKit][UIKit] 文件，或 Android 的 [MainThread][MainThread] 文件。
  _此執行緒不會顯示於效能疊加層。_

**UI 執行緒**
: UI 執行緒在 Dart VM 中執行 Dart 程式碼。
  此執行緒包含你撰寫的程式碼，以及 Flutter 框架代表你的應用程式執行的程式碼。
  當應用程式建立並顯示場景時，UI 執行緒會建立 _layer tree_（圖層樹），這是一個包含與裝置無關的繪製指令的輕量物件，並將 layer tree 傳送至 raster 執行緒，由其負責在裝置上渲染。_切勿阻塞這個執行緒！_
  顯示於效能疊加層的下方圖表。

**Raster 執行緒**
: Raster 執行緒接收 layer tree，並透過 GPU（圖形處理單元）進行顯示。
  你無法直接存取 raster 執行緒或其資料，但若此執行緒運作緩慢，通常是 Dart 程式碼造成的。Skia 與 Impeller（圖形函式庫）皆在此執行緒運作。
  顯示於效能疊加層的上方圖表。
  請注意，雖然 raster 執行緒負責 GPU 光柵化，但執行緒本身仍運作於 CPU。

**I/O 執行緒**
: 執行耗時的任務（主要為 I/O），避免阻塞 UI 或 raster 執行緒。
  _此執行緒不會顯示於效能疊加層。_
    
如需更多資訊與影片連結，請參閱 [框架架構（The Framework architecture）][The Framework architecture]（位於 [Flutter wiki][Flutter wiki]），以及社群文章 [The Layer Cake][The Layer Cake]。

[debug mode]: /testing/build-modes#debug
[Flutter wiki]: {{site.repo.flutter}}/tree/main/docs
[UIKit]: {{site.apple-dev}}/documentation/uikit
[The Layer Cake]: {{site.medium}}/flutter-community/the-layer-cake-widgets-elements-renderobjects-7644c3142401
[The Framework architecture]: {{site.repo.flutter}}/blob/main/docs/about/The-Framework-architecture.md
[MainThread]: {{site.android-dev}}/reference/android/support/annotation/MainThread

## 識別問題

### 檢視 UI 圖表 {:#identifying-problems-in-the-ui-graph}

若效能疊加層在 UI 圖表出現紅條，請先分析 Dart VM 的效能，即使 GPU 圖表也同時出現紅條亦然。

### 檢視 GPU 圖表 {:#identifying-problems-in-the-gpu-graph}

有時候，某些場景雖然 layer tree 很容易建立，但在 raster 執行緒上渲染卻很耗時。此時 UI 圖表沒有紅條，但 GPU 圖表出現紅條。
這種情況下，你需要找出程式碼中哪些操作導致渲染變慢。特定類型的工作負載對 GPU 來說較為困難，可能涉及不必要的 [`saveLayer`][`saveLayer`] 呼叫、多個物件交錯的透明度，以及特定情境下的裁剪（clip）或陰影（shadow）。

如果你懷疑動畫期間造成效能下降，可以在 Flutter 檢查器（inspector）中點擊 **Slow Animations** 按鈕，將動畫速度放慢 5 倍。
若需要更細緻的速度控制，也可以[以程式方式][programmatically]進行設定。

卡頓是發生在第一幀，還是整個動畫過程？如果是整個動畫過程，是否因為裁剪（clipping）造成效能下降？也許可以用其他方式繪製場景而不需裁剪。例如，將不透明的角落疊加在方形上，而不是裁剪成圓角矩形。
如果是靜態場景進行淡入淡出、旋轉或其他操作，[`RepaintBoundary`][`RepaintBoundary`] 可能會有所幫助。

[programmatically]: /testing/code-debugging#debug-animation-issues

#### 檢查離屏圖層（offscreen layers）

[`saveLayer`][`saveLayer`] 方法是 Flutter 框架中最耗資源的方法之一。當你需要對場景進行後處理時很有用，但如果不需要應避免使用，否則會拖慢應用程式。即使你沒有明確呼叫 `saveLayer`，在某些情況下也可能會被隱式呼叫，例如指定 [`Clip.antiAliasWithSaveLayer`][`Clip.antiAliasWithSaveLayer`] (typically as a `clipBehavior`) 時。

舉例來說，假設你有一組物件需要套用透明度，並使用 `saveLayer` 進行渲染。這種情況下，將透明度分別套用到每個元件（Widget）通常比在元件樹較高層的父元件套用來得有效率。其他可能耗資源的操作（如裁剪或陰影）亦同理。

:::note
透明度、裁剪與陰影本身並非壞事，但如果套用在元件樹頂層，可能會導致額外的 `saveLayer` 呼叫與不必要的處理。
:::

當你發現有 `saveLayer` 呼叫時，請自問：

* 應用程式真的需要這個效果嗎？
* 這些呼叫有沒有可能被移除？
* 能否只對單一元素而非整組套用相同效果？

[`Clip.antiAliasWithSaveLayer`]: {{site.api}}/flutter/dart-ui/Clip.html

#### 檢查未快取的圖片

使用 [`RepaintBoundary`][`RepaintBoundary`] 快取圖片是好事，
_前提是有其必要_。

從資源消耗的角度來看，渲染圖片檔案的紋理是一個非常昂貴的操作。
首先，壓縮過的圖片會從永久儲存空間讀取出來，
接著圖片會被解壓縮到主機記憶體（GPU 記憶體），再傳輸到裝置記憶體（RAM）。

換句話說，圖片 I/O 很耗資源。
快取能為複雜的階層結構提供快照，讓後續幀的渲染更輕鬆。
_由於 raster 快取項目建立成本高且佔用大量 GPU 記憶體，
請僅在絕對必要時才快取圖片。_

## 其他資源

以下資源提供更多有關使用 Flutter 工具與除錯的資訊：

* [除錯（Debugging）][Debugging]
* [Performance 檢視][Performance view]
* [Flutter 檢查器（inspector）][Flutter inspector]
* [Flutter inspector talk][Flutter inspector talk]，於 DartConf 2018 發表
* [Why Flutter Uses Dart][Why Flutter Uses Dart]，Hackernoon 文章
* [Why Flutter uses Dart][video]，Flutter 頻道影片
* [DevTools][devtools]：Dart 與 Flutter 應用程式的效能工具
* [Flutter API 文件][Flutter API]，特別是 [`PerformanceOverlay`][`PerformanceOverlay`] 類別，以及 [dart:developer][dart:developer] 套件

[`PerformanceOverlay`]: {{site.api}}/flutter/widgets/PerformanceOverlay-class.html
[`RepaintBoundary`]: {{site.api}}/flutter/widgets/RepaintBoundary-class.html
[`saveLayer`]: {{site.api}}/flutter/dart-ui/Canvas/saveLayer.html
[dart:developer]: {{site.api}}/flutter/dart-developer/dart-developer-library.html
[Debugging]: /testing/debugging
[devtools]: /tools/devtools
[Flutter API]: {{site.api}}
[Flutter inspector talk]: {{site.yt.watch}}?v=JIcmJNT9DNI
[Flutter inspector]: /tools/devtools/inspector
[Performance view]: /tools/devtools/performance
[profile mode]: /testing/build-modes#profile
[video]: {{site.yt.watch}}?v=5F-6n_2XWR8
[Why Flutter Uses Dart]: https://hackernoon.com/why-flutter-uses-dart-dd635a054ebf
