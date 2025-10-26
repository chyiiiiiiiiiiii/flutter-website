---
title: 使用記憶體檢視
description: 學習如何使用 DevTools 的記憶體檢視。
---

記憶體檢視可提供應用程式記憶體配置的詳細資訊，
並提供用於偵測與除錯特定問題的工具。

:::note
本頁內容已更新至 DevTools 2.23.0。
:::

若需瞭解如何在不同 IDE 中找到 DevTools 螢幕，
請參閱 [DevTools overview](/tools/devtools)。

為了更好地理解本頁所介紹的資訊，
第一節將說明 Dart 如何管理記憶體。
如果你已經了解 Dart 的記憶體管理方式，
可以直接跳到 [Memory view guide](#記憶體檢視-memory-view-指南)。

## 為什麼要使用記憶體檢視

當你需要預先優化記憶體，或是你的應用程式出現以下情況時，
建議使用記憶體檢視：

* 記憶體不足時發生當機
* 執行速度變慢
* 導致裝置變慢或無回應
* 因超過作業系統強制的記憶體限制而被關閉
* 超出記憶體使用上限
  * 此限制會根據你的應用程式目標裝置類型而有所不同。
* 懷疑有記憶體洩漏

## 基本記憶體概念

使用類別建構函式建立的 Dart 物件
（例如，使用 `MyClass()`）會存在於稱為 _heap_（堆積）的記憶體區塊中。
heap 中的記憶體由 Dart VM（虛擬機器）管理。
Dart VM 會在物件建立時分配記憶體，
並在物件不再被使用時釋放（或解除分配）該記憶體
（請參閱 [Dart garbage collection][Dart garbage collection]）。

[Dart garbage collection]: {{site.medium}}/flutter/flutter-dont-fear-the-garbage-collector-d69b3ff1ca30

### 物件類型

#### 可釋放物件（Disposable object）

可釋放物件是指任何定義了 `dispose()` 方法的 Dart 物件。
為了避免記憶體洩漏，當物件不再需要時，請呼叫 `dispose`。

#### 記憶體高風險物件（Memory-risky object）

記憶體高風險物件是指如果未正確釋放，或已釋放但未被 GC 處理，
_可能_ 會導致記憶體洩漏的物件。

### 根物件、保留路徑與可達性

#### 根物件（Root object）

每個 Dart 應用程式都會建立一個 _根物件_，
它會直接或間接參照應用程式所配置的所有其他物件。

#### 可達性（Reachability）

在應用程式執行過程中的某個時刻，
如果根物件停止參照某個已配置的物件，
該物件就會變成 _不可達_，
這會通知垃圾回收器（GC）釋放該物件的記憶體。

#### 保留路徑（Retaining path）

從根物件到某個物件的參照序列稱為該物件的 _保留路徑_，
因為它會使該物件的記憶體不被垃圾回收。
一個物件可以有多條保留路徑。
至少擁有一條保留路徑的物件稱為 _可達物件_。

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

### Shallow size 與 retained size

**Shallow size**（淺層大小）只包含物件本身及其參考（references）的大小，而 **retained size**（保留大小）則同時包含被保留物件的大小。

根物件（root object）的 **retained size** 包含所有可被存取的 Dart 物件。

在以下範例中，`myHugeInstance` 的大小不屬於父物件或子物件的 shallow size，但會被計入它們的 retained size：

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

在 DevTools 的計算中，如果一個物件有多條保留路徑（retaining path），則該物件的大小只會被分配為保留（retained）給最短保留路徑上的成員。

在這個例子中，物件 `x` 有兩條保留路徑：

```console
root -> a -> b -> c -> x
root -> d -> e -> x (shortest retaining path to `x`)
```

只有最短路徑上的成員（`d` 和 `e`）會將 `x` 計入其保留大小（retaining size）。

### Dart 會發生記憶體洩漏嗎？

垃圾回收器（Garbage Collector）無法防止所有類型的記憶體洩漏，開發者仍需監控物件，確保其生命週期不會發生洩漏。

#### 為什麼垃圾回收器無法防止所有洩漏？

雖然垃圾回收器會處理所有無法到達（unreachable）的物件，但應用程式本身必須確保不再需要的物件已經不可被存取（即不再從 root 被參考）。

因此，如果不再需要的物件仍然被參考（例如存在於全域或靜態變數中，或作為長壽命物件的欄位），垃圾回收器將無法辨識這些物件，記憶體分配會逐漸增加，最終應用程式會因為 `out-of-memory` 錯誤而崩潰。

#### 為什麼閉包（closure）需要額外注意

有一種難以發現的洩漏模式與閉包的使用有關。在以下程式碼中，原本設計為短生命週期的 `myHugeObject` 會被隱含地儲存在閉包的上下文中，並傳遞給 `setHandler`。因此，只要 `handler` 仍可被存取，`myHugeObject` 就不會被垃圾回收器回收。

```dart
  final handler = () => print(myHugeObject.name);
  setHandler(handler);
```
#### 為什麼`BuildContext`需要特別注意

一個可能會擠進長生命週期區域、進而導致記憶體洩漏的大型短生命週期物件範例，就是傳遞給 Flutter 的`build`方法的`context`參數。

以下程式碼容易發生記憶體洩漏，因為`useHandler`可能會將 handler 儲存在長生命週期區域：

```dart
// BAD: DO NOT DO THIS
// This code is leak prone:
@override
Widget build(BuildContext context) {
  final handler = () => apply(Theme.of(context));
  useHandler(handler);
…
```

#### 如何修正容易產生記憶體洩漏的程式碼？

以下程式碼並不容易產生記憶體洩漏，原因如下：

1. 閉包（closure）沒有使用體積大且存活時間短的 `context` 物件。
2. 改為使用的 `theme` 物件則是長時間存活的。它只會被建立一次，並在多個 `BuildContext` 實例之間共用。


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

一般來說，對於 `BuildContext`，請遵循以下規則：如果閉包（closure）不會比元件（Widget）存活得更久，則可以將 context 傳遞給該閉包。

有狀態元件（Stateful widgets）需要額外注意。它們由兩個類別組成：[元件與元件狀態][interactive]，其中元件（Widget）生命週期較短，而狀態（State）則生命週期較長。由元件所擁有的 build context，不應該從 state 的欄位中被引用，因為 state 不會與元件一同被垃圾回收，且可能遠比元件存活得更久。
[interactive]: /ui/interactivity#creating-a-stateful-widget

### 記憶體洩漏（Memory leak） vs 記憶體膨脹（Memory bloat）

在記憶體洩漏的情況下，應用程式會逐漸佔用越來越多的記憶體，例如，不斷建立監聽器（listener）卻未正確釋放。

記憶體膨脹則是指應用程式佔用超過最佳效能所需的記憶體，例如，使用過大的圖片或在整個生命週期中持續開啟資料流（stream）。

當洩漏或膨脹情況嚴重時，都會導致應用程式因 `out-of-memory` 錯誤而崩潰。然而，洩漏更容易引發記憶體問題，因為即使是很小的洩漏，只要重複發生多次，也會導致崩潰。

## 記憶體檢視（Memory view）指南

DevTools 的記憶體檢視可協助你調查記憶體配置（包含堆積區與外部記憶體）、記憶體洩漏、記憶體膨脹等問題。此檢視包含以下功能：

[**可展開圖表**](#可展開圖表)
: 取得記憶體配置的高層次追蹤，並檢視標準事件（如垃圾回收）及自訂事件（如圖片配置）。

[**Profile Memory** 分頁](#profile-memory-分頁)
: 依類別與記憶體型態顯示目前的記憶體配置。

[**Diff Snapshots** 分頁](#diff-snapshots-分頁)
: 偵測並調查特定功能的記憶體管理問題。

[**Trace Instances** 分頁](#trace-instances-分頁)
: 針對指定類別，調查特定功能的記憶體管理狀況。

### 可展開圖表

可展開圖表提供以下功能：

#### 記憶體結構（Memory anatomy）

時間序列圖（timeseries graph）會視覺化顯示 Flutter 記憶體在連續時間區間內的狀態。圖表上的每個資料點對應於堆積區（heap）在某個時間點（x 軸）所測量的數值（y 軸）。例如，使用量、容量、外部記憶體、垃圾回收（GC）、常駐集大小（RSS）等資訊都會被記錄。

![Screenshot of a memory anatomy page](/assets/images/docs/tools/devtools/memory_chart_anatomy.png){:width="100%"}

#### 記憶體總覽圖表（Memory overview chart）

記憶體總覽圖表是一個收集記憶體統計資料的時間序列圖。它會隨時間視覺化呈現 Dart 或 Flutter 堆積區，以及 Dart 或 Flutter 原生記憶體的狀態。

圖表的 x 軸為事件時間軸（timeseries）。y 軸所繪製的所有資料都帶有資料收集時的時間戳記。換句話說，它每 500 毫秒顯示一次記憶體的輪詢狀態（容量、已用、外部、RSS（常駐集大小）、GC（垃圾回收））。這有助於在應用程式執行時，提供即時的記憶體狀態視覺化。

點擊 **Legend** 按鈕可顯示收集到的測量項目、符號與顏色對應說明。

![Screenshot of a memory anatomy page](/assets/images/docs/tools/devtools/memory_chart_anatomy.png){:width="100%"}

**Memory Size Scale**（記憶體大小刻度）y 軸會自動根據目前可見圖表範圍內的資料調整顯示範圍。

y 軸所繪製的數值說明如下：

**Dart/Flutter Heap**
: 堆積區中的物件（Dart 與 Flutter 物件）。

**Dart/Flutter Native**
: 非屬於 Dart/Flutter 堆積區，但仍計入總記憶體佔用的記憶體。這類記憶體中的物件通常為原生物件（例如，從檔案讀取進記憶體，或已解碼的圖片）。這些原生物件會透過 Dart embedder 從原生作業系統（如 Android、Linux、Windows、iOS）暴露給 Dart VM。Embedder 會建立帶有 finalizer 的 Dart 包裝器，讓 Dart 程式碼能與這些原生資源溝通。Flutter 為 Android 與 iOS 提供 embedder。更多資訊請參見 [Command-line and server apps][Command-line and server apps]、[Dart on the server with Dart Frog][frog]、[Custom Flutter Engine Embedders][Custom Flutter Engine Embedders]、[Dart web server deployment with Heroku][heroku]。

**Timeline**
: 在特定時間點（timestamp）收集到的所有記憶體統計資料與事件的時間戳記。

**Raster Cache**
: Flutter 引擎在合成後進行最終繪製時，raster cache 圖層或圖片的大小。詳情請參閱 [Flutter architectural overview][Flutter architectural overview] 及 [DevTools Performance view][DevTools Performance view]。

**Allocated**
: 堆積區目前的容量，通常會比所有堆積區物件的總大小略大。

**RSS - Resident Set Size（常駐集大小）**
: 顯示某個程序所佔用的記憶體量。不包含已被交換（swapped out）的記憶體。包含已載入的共用函式庫記憶體，以及所有堆疊與堆積區記憶體。詳情請參見 [Dart VM internals][Dart VM internals]。

[Command-line and server apps]: {{site.dart-site}}/server
[Custom Flutter engine embedders]: {{site.repo.flutter}}/blob/main/engine/src/flutter/docs/Custom-Flutter-Engine-Embedders.md
[Dart VM internals]: https://mrale.ph/dartvm/
[DevTools Performance view]: /tools/devtools/performance
[Flutter architectural overview]: /resources/architectural-overview
[frog]: https://dartfrog.vgv.dev/
[heroku]: {{site.yt.watch}}?v=nkTUMVNelXA

<a id="profile-tab" aria-hidden="true"></a>

### Profile Memory 分頁

使用 **Profile Memory** 分頁可依類別與記憶體型態檢視目前的記憶體配置。如需在 Google Sheets 或其他工具中進行更深入分析，可下載 CSV 格式的資料。切換 **Refresh on GC**，可即時查看配置情況。

![Screenshot of the profile tab page](/assets/images/docs/tools/devtools/profile-tab.png){:width="100%"}

### Diff Snapshots 分頁

使用 **Diff Snapshots** 分頁來調查特定功能的記憶體管理。請依照分頁上的指引，在與應用程式互動前後分別擷取快照，並進行差異比較：

![Screenshot of the diff tab page](/assets/images/docs/tools/devtools/diff-tab.png){:width="100%"}

點擊 **Filter classes and packages** 按鈕，可縮小資料範圍：

![Screenshot of the filter options ui](/assets/images/docs/tools/devtools/filter-ui.png)

如需在 Google Sheets 或其他工具中進行更深入分析，可下載 CSV 格式的資料。

<a id="trace-tab" aria-hidden="true"></a>

### Trace Instances 分頁

使用 **Trace Instances** 分頁，可調查在功能執行期間，哪些方法為一組類別配置了記憶體：

1. 選擇要追蹤的類別
1. 與你的應用程式互動，以觸發你關注的程式碼
1. 點擊 **Refresh**
1. 選擇已追蹤的類別
1. 檢視收集到的資料

![Screenshot of a trace tab](/assets/images/docs/tools/devtools/trace-instances-tab.png){:width="100%"}

#### Bottom up 與 Call tree 檢視

可依任務需求，在 bottom-up 與 call tree 檢視間切換。

![Screenshot of a trace allocations](/assets/images/docs/tools/devtools/trace-view.png)

call tree 檢視會顯示每個實例的 method 配置情況。此檢視為呼叫堆疊的自頂向下表示，代表你可以展開某個方法來查看其被呼叫的方法（callees）。

bottom-up 檢視則會顯示分配這些實例的不同呼叫堆疊清單。

## 其他資源

如需更多資訊，請參考以下資源：

* 若要學習如何使用 DevTools 監控應用程式記憶體用量並偵測記憶體洩漏，請參考導引式 [Memory View tutorial][memory-tutorial]。
* 若要了解 Android 記憶體結構，請參考 [Android: Memory allocation among processes][Android: Memory allocation among processes]。

[memory-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-memory-view-part-7-of-8-e7f5aaf07e15
[Android: Memory allocation among processes]: {{site.android-dev}}/topic/performance/memory-management
