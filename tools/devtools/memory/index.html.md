# 使用記憶體檢視

> 了解如何使用 DevTools 記憶體檢視。



記憶體檢視可深入了解應用程式的記憶體配置細節，
並提供偵測與除錯特定問題的工具。

:::note
本頁內容已更新至 DevTools 2.23.0 版本。
:::

若需瞭解如何在不同的 IDE 中找到 DevTools 螢幕，
請參閱 [DevTools overview](/tools/devtools)。

為了更好地理解本頁所介紹的資訊，
第一節將說明 Dart 如何管理記憶體。
如果你已經了解 Dart 的記憶體管理方式，
可以直接跳到 [Memory view guide](#記憶體檢視指南)。

## 使用記憶體檢視的理由

當你需要預先進行記憶體最佳化，或是你的應用程式出現以下情況時，
建議使用記憶體檢視：

* 記憶體不足時發生當機
* 執行速度變慢
* 導致裝置變慢或無回應
* 因超過作業系統強制的記憶體限制而關閉
* 超過記憶體使用上限
  * 此上限會依你的應用程式目標裝置類型而有所不同。
* 懷疑有記憶體洩漏

## 基本記憶體概念

使用類別建構函式建立的 Dart 物件
（例如，透過 `MyClass()` 建立）會存在於
稱為 _heap_（堆積）的記憶體區域中。
heap 中的記憶體由 Dart VM（虛擬機器）管理。
Dart VM 會在物件建立時分配記憶體，
並在物件不再使用時釋放（或解除分配）記憶體
（請參閱 [Dart garbage collection][Dart garbage collection]）。

[Dart garbage collection]: https://medium.com/flutter/flutter-dont-fear-the-garbage-collector-d69b3ff1ca30

### 物件類型

#### 可釋放物件（Disposable object）

可釋放物件是指任何定義了 `dispose()` 方法的 Dart 物件。
為避免記憶體洩漏，當物件不再需要時，請呼叫 `dispose`。

#### 記憶體高風險物件（Memory-risky object）

記憶體高風險物件是指若未正確釋放，
或已釋放但未被 GC（垃圾回收）處理，
_可能_ 造成記憶體洩漏的物件。

### 根物件、保留路徑與可達性

#### 根物件（Root object）

每個 Dart 應用程式都會建立一個 _根物件_，
此物件會直接或間接參考應用程式分配的所有其他物件。

#### 可達性（Reachability）

如果在應用程式執行的某個時刻，
根物件停止參考某個已分配的物件，
該物件就會變成 _不可達_，
這會通知垃圾回收器（GC）釋放該物件的記憶體。

#### 保留路徑（Retaining path）

從根物件到某個物件的參考序列，
稱為該物件的 _保留路徑_，
因為它會讓該物件的記憶體不被垃圾回收。
一個物件可以有多條保留路徑。
至少有一條保留路徑的物件，
稱為 _可達_ 物件。

#### 範例

以下範例說明上述概念：

```dart
class Child{}

class Parent {
  Child? child;
}

Parent parent1 = Parent();

void myFunction() {

  Child? child = Child();

  // The `child` object was allocated in memory.
  // It's now retained from garbage collection
  // by one retaining path (root …-> myFunction -> child).

  Parent? parent2 = Parent()..child = child;
  parent1.child = child;

  // At this point the `child` object has three retaining paths:
  // root …-> myFunction -> child
  // root …-> myFunction -> parent2 -> child
  // root -> parent1 -> child

  child = null;
  parent1.child = null;
  parent2 = null;

  // At this point, the `child` instance is unreachable
  // and will eventually be garbage collected.

  …
}
```

### Shallow size 與 retained size 的差異

**Shallow size**（淺層大小）只包含物件本身及其參考（references）的大小，而 **retained size**（保留大小）則同時包含該物件所保留（retained）的其他物件的大小。

根物件（root object）的 **retained size** 包含所有可被存取的 Dart 物件。

在以下範例中，`myHugeInstance` 的大小不屬於父物件或子物件的 shallow size，但會被計算在它們的 retained size 之中：

```dart
class Child{
  /// The instance is part of both [parent] and [parent.child]
  /// retained sizes.
  final myHugeInstance = MyHugeInstance();
}

class Parent {
  Child? child;
}

Parent parent = Parent()..child = Child();
```

在 DevTools 的計算中，如果一個物件有多條保留路徑（retaining path），則其大小只會被分配為保留給最短保留路徑上的成員。

在這個例子中，物件 `x` 有兩條保留路徑：

```console
root -> a -> b -> c -> x
root -> d -> e -> x (shortest retaining path to `x`)
```

只有最短路徑上的成員（`d` 和 `e`）會將
`x` 計入其保留大小（retaining size）。

### Dart 也會發生記憶體洩漏嗎？

垃圾回收器（Garbage Collector）無法防止所有類型的記憶體洩漏，開發者
仍然需要監控物件，確保其生命週期不會發生洩漏。

#### 為什麼垃圾回收器無法防止所有記憶體洩漏？

雖然垃圾回收器會自動處理所有
不可到達（unreachable）的物件，但應用程式
本身必須確保不再需要的物件
不再可被存取（即不再從 root 被參考）。

因此，如果不需要的物件仍被參考
（例如存在於全域變數、靜態變數，
或長生命週期物件的欄位中），
垃圾回收器就無法辨識它們為可回收物件，
記憶體分配會逐漸增加，
最終應用程式會因為 `out-of-memory` 錯誤而崩潰。

#### 為什麼閉包（closure）需要特別注意

有一種難以察覺的記憶體洩漏模式與閉包（closure）的使用有關。
在下方的程式碼中，原本設計為短生命週期的 `myHugeObject`
會被隱式地儲存在閉包的上下文中，並傳遞給 `setHandler`。
因此，只要 `handler` 仍然可被存取，
`myHugeObject` 就不會被垃圾回收器回收。

```dart
  final handler = () => print(myHugeObject.name);
  setHandler(handler);
```
#### 為什麼 `BuildContext` 需要特別注意

一個可能會擠進長壽命區域、進而導致記憶體洩漏的大型短生命週期物件範例，就是傳遞給 Flutter 的 `build` 方法的 `context` 參數。

以下程式碼容易產生記憶體洩漏，因為 `useHandler` 可能會將 handler 儲存在長壽命區域中：

```dart
// BAD: DO NOT DO THIS
// This code is leak prone:
@override
Widget build(BuildContext context) {
  final handler = () => apply(Theme.of(context));
  useHandler(handler);
…
```

#### 如何修正容易造成記憶體洩漏的程式碼？

以下程式碼不容易造成記憶體洩漏，原因如下：

1. 閉包（closure）沒有使用體積大且生命週期短的 `context` 物件。
2. 改而使用的 `theme` 物件，其生命週期較長。該物件只會建立一次，並在多個 `BuildContext` 實例之間共用。


```dart
// GOOD
@override
Widget build(BuildContext context) {
  final theme = Theme.of(context);
  final handler = () => apply(theme);
  useHandler(handler);
…
```

#### `BuildContext` 的一般規則

一般而言，對於 `BuildContext`，請遵循以下規則：如果閉包（closure）不會比元件（Widget）存活得更久，則可以將 context 傳遞給該閉包。

有狀態元件（Stateful widgets）需要額外注意。它們由兩個類別組成：[元件與元件狀態][interactive]，其中元件（Widget）壽命較短，而狀態（State）壽命較長。由元件所擁有的 build context，不應該從狀態（State）的欄位中被引用，因為狀態不會隨著元件一起被垃圾回收，且可能比元件存活得更久。

[interactive]: /ui/interactivity#creating-a-stateful-widget

### 記憶體洩漏 vs 記憶體膨脹

在記憶體洩漏（memory leak）中，應用程式會逐漸消耗越來越多的記憶體，例如，不斷建立監聽器（listener）但未釋放（dispose）它。

記憶體膨脹（memory bloat）則是指使用了超過最佳效能所需的記憶體，例如，使用過大的圖片或在整個生命週期內保持串流（stream）開啟。

無論是洩漏還是膨脹，當規模很大時，都會導致應用程式因 `out-of-memory` 錯誤而崩潰。然而，洩漏更容易造成記憶體問題，因為即使是小規模的洩漏，只要重複多次，也會導致崩潰。

## 記憶體檢視指南

DevTools 的記憶體檢視（memory view）可協助你調查記憶體配置（包含堆積與外部記憶體）、記憶體洩漏、記憶體膨脹等問題。此檢視包含以下功能：

[**可展開圖表**](#可展開圖表)
: 提供記憶體配置的高階追蹤，並可檢視標準事件（如垃圾回收）與自訂事件（如圖片配置）。

[**Profile Memory** 分頁](#profile-memory-分頁)
: 依類別與記憶體型態列出目前的記憶體配置。

[**Diff Snapshots** 分頁](#diff-snapshots-分頁)
: 偵測並調查特定功能的記憶體管理問題。

[**Trace Instances** 分頁](#trace-instances-分頁)
: 針對指定類別，調查特定功能的記憶體管理情形。

### 可展開圖表

可展開圖表提供下列功能：

#### 記憶體結構解析

時間序列圖（timeseries graph）用於視覺化 Flutter 記憶體在不同時間區間的狀態。圖表上的每個資料點對應於堆積（heap）在某個時間戳（x 軸）下的測量數值（y 軸）。例如，會紀錄使用量、容量、外部記憶體、垃圾回收與常駐集大小（resident set size, RSS）等資訊。

![Screenshot of a memory anatomy page](/assets/images/docs/tools/devtools/memory_chart_anatomy.png){:width="100%"}

#### 記憶體總覽圖表

記憶體總覽圖表是一個收集記憶體統計資料的時間序列圖。它以視覺化方式呈現 Dart 或 Flutter 堆積，以及 Dart 或 Flutter 原生記憶體（native memory）隨時間的變化。

圖表的 x 軸為事件時間軸（timeseries）。y 軸所繪製的資料皆帶有資料收集時的時間戳。換句話說，它每 500 毫秒顯示一次記憶體的輪詢狀態（容量、已用、外部、RSS（常駐集大小）、GC（垃圾回收））。這有助於在應用程式執行時，提供記憶體狀態的即時外觀。

點擊 **Legend** 按鈕可顯示收集到的測量項目、符號與用於顯示資料的顏色。

![Screenshot of a memory anatomy page](/assets/images/docs/tools/devtools/memory_chart_anatomy.png){:width="100%"}

**Memory Size Scale**（記憶體大小刻度）y 軸會自動調整至目前可見圖表範圍內所收集資料的範圍。

y 軸上繪製的數值如下：

**Dart/Flutter Heap**
: 堆積中的物件（Dart 與 Flutter 物件）。

**Dart/Flutter Native**
: 不屬於 Dart/Flutter 堆積，但仍屬於總記憶體佔用的記憶體。這部分的物件通常是原生物件（例如，將檔案讀入記憶體，或解碼後的圖片）。這些原生物件會透過 Dart 嵌入器（embedder）從原生作業系統（如 Android、Linux、Windows、iOS）暴露給 Dart VM。嵌入器會建立帶有 finalizer 的 Dart 包裝器，讓 Dart 程式碼能與這些原生資源互動。Flutter 為 Android 與 iOS 提供了嵌入器。詳情請參閱 [Command-line and server apps][Command-line and server apps]、[Dart on the server with Dart Frog][frog]、[Custom Flutter Engine Embedders][Custom Flutter Engine Embedders]、[Dart web server deployment with Heroku][heroku]。

**Timeline**
: 在特定時間點（timestamp）收集到的所有記憶體統計資料與事件的時間戳。

**Raster Cache**
: Flutter 引擎的 raster cache 圖層或圖片的大小，在經過合成後進行最終繪製時產生。詳情請參閱 [Flutter architectural overview][Flutter architectural overview] 與 [DevTools Performance view][DevTools Performance view]。

**Allocated**
: 所有 Dart 堆積目前的總容量，通常會比所有堆積物件的總大小略大。

**RSS - Resident Set Size**
: 常駐集大小（RSS）顯示某個程序所佔用的記憶體量。不包含已被交換（swapped out）的記憶體。包含已載入的共用函式庫、所有堆疊與堆積記憶體。詳情請參閱 [Dart VM internals][Dart VM internals]。

[Command-line and server apps]: https://dart.dev/server
[Custom Flutter engine embedders]: https://github.com/flutter/flutter/blob/main/docs/engine/Custom-Flutter-Engine-Embedders.md
[Dart VM internals]: https://mrale.ph/dartvm/
[DevTools Performance view]: /tools/devtools/performance
[Flutter architectural overview]: /resources/architectural-overview
[frog]: https://dartfrog.vgv.dev/
[heroku]: https://www.youtube.com/watch?v=nkTUMVNelXA

<a id="profile-tab" aria-hidden="true"></a>

### Profile Memory 分頁

使用 **Profile Memory** 分頁可依類別與記憶體型態檢視目前的記憶體配置。若需在 Google Sheets 或其他工具中進行更深入分析，可下載 CSV 格式的資料。切換 **Refresh on GC**，即可即時檢視配置狀態。

![Screenshot of the profile tab page](/assets/images/docs/tools/devtools/profile-tab.png){:width="100%"}

### Diff Snapshots 分頁

使用 **Diff Snapshots** 分頁來調查特定功能的記憶體管理。請依照分頁上的指引，在與應用程式互動前後分別擷取快照，並比較這些快照：

![Screenshot of the diff tab page](/assets/images/docs/tools/devtools/diff-tab.png){:width="100%"}

點擊 **Filter classes and packages** 按鈕可縮小資料範圍：

![Screenshot of the filter options ui](/assets/images/docs/tools/devtools/filter-ui.png)

若需在 Google Sheets 或其他工具中進行更深入分析，可下載 CSV 格式的資料。

<a id="trace-tab" aria-hidden="true"></a>

### Trace Instances 分頁

使用 **Trace Instances** 分頁可調查在功能執行期間，哪些方法為一組類別配置了記憶體：

1. 選擇要追蹤的類別
1. 與你的應用程式互動，以觸發你關心的程式碼
1. 點擊 **Refresh**
1. 選擇一個已追蹤的類別
1. 檢視收集到的資料

![Screenshot of a trace tab](/assets/images/docs/tools/devtools/trace-instances-tab.png){:width="100%"}

#### Bottom up 與 Call tree 檢視

可根據任務需求，在 bottom-up 與 call tree 檢視間切換。

![Screenshot of a trace allocations](/assets/images/docs/tools/devtools/trace-view.png)

call tree 檢視會顯示每個實例的方法配置情形。此檢視為呼叫堆疊的自頂向下（top-down）表示，亦即可展開方法以顯示其被呼叫者（callees）。

bottom-up 檢視則會顯示配置這些實例的不同呼叫堆疊清單。

## 其他資源

如需更多資訊，請參考以下資源：

* 若想學習如何使用 DevTools 監控應用程式記憶體使用狀況並偵測記憶體洩漏，請參考導引式 [Memory View tutorial][memory-tutorial]。
* 若想了解 Android 的記憶體結構，請參考 [Android: Memory allocation among processes][Android: Memory allocation among processes]。

[memory-tutorial]: https://medium.com/@fluttergems/mastering-dart-flutter-devtools-memory-view-part-7-of-8-e7f5aaf07e15
[Android: Memory allocation among processes]: https://developer.android.com/topic/performance/memory-management

