# Flutter 效能分析

> 診斷 Flutter 的 UI 效能問題。



## 概覽

應用程式效能涵蓋多個層面，從純粹的速度與 I/O 吞吐量，到使用者介面的流暢度。本頁主要聚焦於 UI 流暢度（即無卡頓或延遲），但此處介紹的工具通常也可用於診斷其他效能問題。

Flutter 提供了多種效能分析工具，以下是其中幾項：

* **效能疊加層（Performance Overlay）**：直接在執行中的應用程式內顯示簡化的效能指標。欲了解詳情，請參閱本主題後續章節。

* **效能檢視（Performance View）**：一個基於網頁的介面，可連接你的應用程式並顯示詳細的效能指標。這是 DevTools 工具的一部分。詳情請參閱 [使用 Performance View][Use the Performance View]。

* **Dart 內的效能追蹤**：可直接在應用程式的 Dart 程式碼中加入追蹤（tracing），使用 `dart:developer package`，然後在 DevTools 工具中追蹤應用程式效能。詳情請參閱 [追蹤 Dart 程式碼][Tracing Dart code]。

* **效能基準測試（Benchmarking）**：你可以撰寫基準測試來量測並追蹤應用程式的效能。Flutter Driver 函式庫提供基準測試支援。利用這個整合測試框架，你可以產生追蹤卡頓、下載大小、電池效率及啟動時間等指標。更多資訊請參閱 [整合測試][Integration testing]。

* **元件重建分析工具（Widget rebuild profiler，IntelliJ for Android Studio）**：卡頓常因不必要的 UI 重建所致。若你使用 IntelliJ for Android Studio，Widget Rebuild Profiler 可協助你定位並修正這些問題，透過顯示目前螢幕與畫格的元件 (Widget) 重建次數。詳情請參閱 [顯示效能資料][Show performance data]。

Flutter 目標是提供每秒 60 幀（fps）的效能，或在支援的裝置上達到 120 fps。為達到 60fps，每一幀必須約每 16 毫秒渲染一次，以避免卡頓。當畫格渲染時間明顯過長並被丟棄時，就會產生卡頓，導致動畫出現明顯的延遲。例如，若某一畫格偶爾渲染時間比平常長 10 倍，該畫格很可能會被丟棄，造成動畫顯得不流暢。

[Use the Performance View]: /tools/devtools/performance
[Tracing Dart code]: /testing/code-debugging#trace-dart-code-performance
[Show performance data]: /tools/android-studio#show-performance-data
[Integration testing]: /testing/integration-tests

## 連接實體裝置

幾乎所有 Flutter 應用程式的效能除錯，都應該在實體 Android 或 iOS 裝置上進行，並以 [profile 模式][profile mode] 執行你的 Flutter 應用程式。在 debug 模式下，或於模擬器／模擬裝置上執行，通常無法反映最終 release 模式建置的實際行為。
_你應該考慮在用戶可能會使用的最慢裝置上檢查效能。_

:::secondary 為什麼要在真實裝置上執行
* 模擬器與模擬裝置（emulator）所用硬體不同，因此效能特性也不同——有些操作在模擬器上比真機快，有些則較慢。
* Debug 模式會啟用額外的檢查（如 assert），這些在 profile 或 release 建置時不會執行，而這些檢查可能會消耗大量資源。
* Debug 模式的程式碼執行方式也與 release 模式不同。Debug 建置在應用程式執行時以「即時編譯」（JIT）方式編譯 Dart 程式碼，而 profile 與 release 建置則會在應用程式載入至裝置前預先編譯為原生指令（也稱為「預先編譯」，AOT）。JIT 可能導致應用程式暫停進行 JIT 編譯，而這本身就可能造成卡頓。
:::

## 以 profile 模式執行

Flutter 的 profile 模式會以幾乎與 release 模式相同的方式編譯並啟動你的應用程式，但同時保留足夠的額外功能以便進行效能除錯。例如，profile 模式會為效能分析工具提供追蹤資訊。

:::note
Dart/Flutter DevTools 無法連接執行於 profile 模式的 Flutter Web 應用程式。
請改用 Chrome DevTools
[產生時間軸事件][generate timeline events] 來分析 Web 應用程式。
:::

以 profile 模式啟動應用程式的方法如下：

* 在 VS Code 中，打開你的 `launch.json` 檔案，並將
  `flutterMode` 屬性設為 `profile`
  （完成效能分析後，請改回 `release` 或 `debug`）：

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
* 在 Android Studio 和 IntelliJ 中，請使用
  **執行 > 以 Profile 模式執行 main.dart（Run > Flutter Run main.dart in Profile Mode）** 選單項目。
* 從命令列（Command Line Interface），請使用 `--profile` 旗標：

  ```console
  $ flutter run --profile
  ```

如需不同模式的詳細資訊，請參閱 [Flutter 的建置模式][Flutter's build modes]。

你將從開啟 DevTools 並檢視效能疊加層（performance overlay）開始，如下一節所述。

[Flutter's build modes]: /testing/build-modes
[generate timeline events]: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference

## 啟動 DevTools

DevTools 提供多項功能，例如效能分析（profiling）、檢查堆積（heap）、顯示程式碼涵蓋率、啟用效能疊加層，以及逐步除錯器（step-by-step debugger）。
DevTools 的 [Timeline 檢視][Timeline view] 允許你以逐幀（frame-by-frame）方式調查應用程式的 UI 效能。

當你的應用程式以 profile 模式執行時，[啟動 DevTools][launch DevTools]。

[Timeline view]: /tools/devtools/performance
[launch DevTools]: /tools/devtools

## 顯示效能疊加層 {:#displaying-the-performance-overlay}

你可以透過以下方式切換效能疊加層的顯示：

* **DevTools Performance 檢視**：啟用 PerformanceOverlay 元件（Widget）最簡單的方法，是在 [DevTools][DevTools] 的 [Performance 檢視][Performance view] 中操作。只需點擊 **Performance Overlay** 按鈕，即可在執行中的應用程式上切換疊加層。

* **命令列**：在命令列中使用 **P** 鍵切換效能疊加層。

* **程式控制**：若要以程式方式啟用疊加層，請參閱 [Performance overlay][Performance overlay]，該內容位於 [以程式方式除錯 Flutter 應用程式][Debugging Flutter apps programmatically] 頁面。

[Performance overlay]: /testing/code-debugging#add-performance-overlay
[Debugging Flutter apps programmatically]: /testing/code-debugging

<a id="the-performance-overlay" aria-hidden="true"></a>

## 觀察效能疊加層 {:#performance-overlay}

效能疊加層會以兩個圖表顯示統計數據，幫助你了解應用程式的時間花費位置。如果 UI 出現卡頓（跳幀），這些圖表能協助你找出原因。
圖表會顯示在執行中的應用程式上方，但它們不是以一般元件（Widget）方式繪製&mdash;而是由 Flutter 引擎直接繪製，對效能影響極小。
每個圖表代表該執行緒最近 300 幀的狀態。

本節將說明如何啟用效能疊加層，並利用它診斷應用程式卡頓的原因。
以下螢幕截圖顯示效能疊加層在 Flutter Gallery 範例中的運作情形：

![Screenshot of overlay showing zero jank](/assets/images/docs/tools/devtools/performance-overlay-green.png)
<br>效能疊加層顯示光柵化執行緒（raster thread，頂部）與 UI 執行緒（底部）。<br>垂直綠色條代表當前幀。

### 檢視圖表 {:#interpreting-the-graphs}

頂部圖表（標記為 "GPU"）顯示光柵化執行緒（raster thread）所花費的時間，底部圖表則顯示 UI 執行緒所花費的時間。
圖表中的白線代表垂直軸上的 16 毫秒間隔；如果圖表超過這條線，則代表更新率低於 60Hz。
水平軸代表幀數。圖表僅在應用程式繪製時更新，因此若應用程式閒置，圖表也會停止移動。

疊加層應始終在 [profile 模式][profile mode] 下檢視，因為 [debug 模式][debug mode] 會刻意犧牲效能，以換取有助於開發的昂貴斷言，因此結果會產生誤導。

每一幀都應在 1/60 秒（約 16 毫秒）內建立並顯示。若任何一個圖表的幀超過此限制，該幀將無法及時顯示，導致卡頓（jank），並在圖表中出現垂直紅條。
若 UI 圖表出現紅條，表示 Dart 程式碼過於耗時。若 GPU 圖表出現紅色垂直條，則代表場景過於複雜，無法快速渲染。

![Screenshot of performance overlay showing jank with red bars](/assets/images/docs/tools/devtools/performance-overlay-jank.png)
<br>垂直紅條表示目前這一幀在繪製與渲染上都非常耗時。<br>當兩個圖表都出現紅條時，請先從診斷 UI 執行緒著手。

### 檢視執行緒 {:#flutters-threads}

Flutter 會使用多個執行緒來完成工作，但疊加層僅顯示其中兩個執行緒。
你所有的 Dart 程式碼都在 UI 執行緒上執行。
雖然你無法直接存取其他執行緒，但你在 UI 執行緒上的行為會影響其他執行緒的效能。

**平台執行緒（Platform thread）**
: 平台的主要執行緒。Plugin 程式碼會在此執行。
  相關資訊請參閱 iOS 的 [UIKit][UIKit] 文件，或 Android 的 [MainThread][MainThread] 文件。
  _此執行緒不會顯示在效能疊加層中。_

**UI 執行緒（UI thread）**
: UI 執行緒在 Dart VM 中執行 Dart 程式碼。
  此執行緒包含你撰寫的程式碼，以及 Flutter framework 代表你的應用程式執行的程式碼。
  當你的應用程式建立並顯示場景時，UI 執行緒會建立一個 _layer tree_（層級樹），這是一個包含與裝置無關繪製指令的輕量級物件，並將其傳送給光柵化執行緒進行裝置上的渲染。_請勿阻塞此執行緒！_
  此執行緒顯示於效能疊加層的底部列。

**光柵化執行緒（Raster thread）**
: 光柵化執行緒負責接收 layer tree 並透過 GPU（圖形處理單元）進行顯示。
  你無法直接存取光柵化執行緒或其資料，但若此執行緒速度緩慢，通常是 Dart 程式碼造成的。Skia 與 Impeller（圖形函式庫）會在此執行緒上運作。
  此執行緒顯示於效能疊加層的頂部列。
  請注意，雖然光柵化執行緒負責為 GPU 光柵化，但執行緒本身是在 CPU 上執行。

**I/O 執行緒（I/O thread）**
: 執行耗時的任務（主要為 I/O），以避免阻塞 UI 或光柵化執行緒。
  _此執行緒不會顯示在效能疊加層中。_

如需更多資訊與影片，請參閱 [Flutter wiki][Flutter wiki] 中的 [The Framework architecture][The Framework architecture]，以及社群文章 [The Layer Cake][The Layer Cake]。

[debug mode]: /testing/build-modes#debug
[Flutter wiki]: https://github.com/flutter/flutter/tree/main/docs
[UIKit]: https://developer.apple.com/documentation/uikit
[The Layer Cake]: https://medium.com/flutter-community/the-layer-cake-widgets-elements-renderobjects-7644c3142401
[The Framework architecture]: https://github.com/flutter/flutter/blob/main/docs/about/The-Framework-architecture.md
[MainThread]: https://developer.android.com/reference/android/support/annotation/MainThread

## 問題識別

### 檢視 UI 圖表 {:#identifying-problems-in-the-ui-graph}

如果效能疊加層在 UI 圖表顯示紅色，請先對 Dart VM 進行效能分析，即使 GPU 圖表也出現紅色。

### 檢視 GPU 圖表 {:#identifying-problems-in-the-gpu-graph}

有時候，一個場景雖然 layer tree 很容易建立，但在光柵化執行緒上渲染卻非常耗時。這種情況下，UI 圖表沒有紅色，但 GPU 圖表出現紅色。
這時，你需要找出程式碼中導致渲染變慢的原因。某些特定類型的工作負載對 GPU 來說較困難，可能涉及不必要的 [`saveLayer`][] 呼叫、多個物件交錯透明度，以及特定情境下的裁剪（clip）或陰影（shadow）。

如果你懷疑動畫期間造成效能下降，請在 Flutter 檢查器（inspector）中點擊 **Slow Animations** 按鈕，將動畫速度放慢 5 倍。
如果你需要更細緻的速度控制，也可以[以程式方式][programmatically]調整。

效能下降是發生在第一幀，還是整個動畫期間？如果是整個動畫，是否因為裁剪（clipping）造成延遲？或許可以用其他方式繪製場景而不需裁剪。例如，將不透明的角落覆蓋在方形上，而不是裁剪成圓角矩形。
如果是靜態場景被淡入淡出、旋轉或其他操作，[`RepaintBoundary`][] 可能會有所幫助。

[programmatically]: /testing/code-debugging#debug-animation-issues

#### 檢查離屏圖層（offscreen layers）

[`saveLayer`][] 方法是 Flutter framework 中最昂貴的方法之一。當你需要對場景進行後處理時很有用，但若無必要應避免使用，否則會拖慢應用程式。即使你沒有明確呼叫 `saveLayer`，在某些情況下也可能會被隱式呼叫，例如指定 [`Clip.antiAliasWithSaveLayer`][]（通常作為 `clipBehavior`）時。

舉例來說，
假設你有一組物件，其透明度是透過 `saveLayer` 來渲染。在這種情況下，將透明度分別套用到每個元件（Widget）通常比套用到元件樹較高層的父元件更有效率。其他潛在昂貴的操作（如裁剪或陰影）亦同理。

:::note
透明度、裁剪與陰影本身並非壞主意。然而，若將這些效果套用在元件樹頂層，可能會導致額外的 `saveLayer` 呼叫與不必要的處理。
:::

當你遇到 `saveLayer` 呼叫時，請自問：

* 應用程式真的需要這個效果嗎？
* 這些呼叫有沒有可以省略的？
* 能否將同樣效果套用在單一元素，而不是整個群組？

[`Clip.antiAliasWithSaveLayer`]: https://api.flutter.dev/flutter/dart-ui/Clip.html

#### 檢查未快取的圖片

使用 [`RepaintBoundary`][] 快取圖片是好事，_前提是有其必要_。

從資源角度來看，
渲染圖片檔案的紋理（texture）是最昂貴的操作之一。
首先，壓縮過的圖片會從永久儲存空間讀取出來。
接著，圖片會在主機記憶體（GPU 記憶體）中解壓縮，然後傳輸到裝置記憶體（RAM）。

換句話說，圖片 I/O 可能非常耗時。
快取能為複雜的階層結構提供快照，使後續幀的渲染更容易。
_由於光柵快取（raster cache）項目建構成本高且佔用大量 GPU 記憶體，請僅在絕對必要時才快取圖片。_

## 其他資源

以下資源提供更多有關使用 Flutter 工具與除錯的資訊：

* [Debugging][]
* [Performance view][]
* [Flutter inspector][]
* [Flutter inspector talk][]，於 DartConf 2018 發表
* [Why Flutter Uses Dart][]，Hackernoon 上的文章
* [Why Flutter uses Dart][video]，Flutter 頻道上的影片
* [DevTools][devtools]：Dart 與 Flutter 應用程式的效能工具
* [Flutter API][] 文件，特別是 [`PerformanceOverlay`][] 類別，以及 [`dart:developer`][] 套件

[`PerformanceOverlay`]: https://api.flutter.dev/flutter/widgets/PerformanceOverlay-class.html
[`RepaintBoundary`]: https://api.flutter.dev/flutter/widgets/RepaintBoundary-class.html
[`saveLayer`]: https://api.flutter.dev/flutter/dart-ui/Canvas/saveLayer.html
[`dart:developer`]: https://api.flutter.dev/flutter/dart-developer/dart-developer-library.html
[Debugging]: /testing/debugging
[devtools]: /tools/devtools
[Flutter API]: https://api.flutter.dev
[Flutter inspector talk]: https://www.youtube.com/watch?v=JIcmJNT9DNI
[Flutter inspector]: /tools/devtools/inspector
[Performance view]: /tools/devtools/performance
[profile mode]: /testing/build-modes#profile
[video]: https://www.youtube.com/watch?v=5F-6n_2XWR8
[Why Flutter Uses Dart]: https://hackernoon.com/why-flutter-uses-dart-dd635a054ebf

