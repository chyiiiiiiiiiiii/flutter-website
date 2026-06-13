---
title: 使用 CPU 分析器檢視
description: 學習如何使用 DevTools 的 CPU 分析器檢視。
---

:::note
CPU 分析器檢視僅適用於 Dart CLI 和行動應用程式。
若要分析 Web 應用程式的效能，請使用 Chrome DevTools [分析效能][analyze performance]。
:::

CPU 分析器檢視可讓你錄製並分析 Dart 或 Flutter 應用程式的執行階段。
分析器能協助你解決效能問題，或一般性地了解應用程式的 CPU 活動。
Dart VM 會收集 CPU 樣本（即某一時刻 CPU 呼叫堆疊的快照），並將資料傳送至 DevTools 進行視覺化。
透過彙整多個 CPU 樣本，分析器能協助你了解 CPU 大部分時間花在哪些地方。

:::note
**如果你正在執行 Flutter 應用程式，請使用 profile build 來分析效能。**
除非你的 Flutter 應用程式以 profile 模式執行，否則 CPU 分析結果無法代表 release 模式下的效能。
:::

## CPU 分析器

點擊 **Record** 開始錄製 CPU 分析資料。
錄製完成後，點擊 **Stop**。此時，CPU 分析資料會從 VM 擷取並顯示於分析器檢視（Call tree、Bottom up、Method table 及 Flame chart）。

若想載入所有可用的 CPU 樣本而不需手動錄製與停止，可點擊 **Load all CPU samples**，
這會擷取 VM 已記錄並儲存在其樣本緩衝區中的所有 CPU 樣本，然後在分析器檢視中顯示這些樣本。

預設情況下，VM 的樣本緩衝區會作為環形緩衝區使用，
這意味著一旦緩衝區填滿，新樣本將開始覆寫緩衝區中最舊的樣本。
若要讓 VM 在樣本緩衝區填滿後捨棄後續收集的所有樣本，
請在執行 `dart run` 或 `flutter run` 時傳入 `--profile-startup` 旗標。

### Bottom up

此表格提供 CPU 分析資料的 bottom-up（自底向上）表示。
這表示 bottom up 表格中的每個頂層方法（root）實際上是某些 CPU 樣本呼叫堆疊的最上層方法。
換句話說，bottom up 表格中的每個頂層方法，都是 top down 表格（呼叫樹）中的葉節點。
在這個表格中，你可以展開方法以檢視其 _呼叫者_。

此檢視對於找出 CPU 分析中耗時的 _方法_ 很有幫助。
當此表格中的根節點有較高的 _self_ 時間，代表本次分析中有許多 CPU 樣本的呼叫堆疊最上層是該方法。

![Bottom up 檢視畫面截圖](/assets/images/docs/tools/devtools/bottom-up-view.png)
請參閱下方 [Guidelines](#指引) 章節，了解如何啟用此圖中出現的藍色與綠色垂直線。

提示說明可協助你理解各欄位的數值：

**Total time**
：對於 bottom-up 樹中的頂層方法（至少有一個 CPU 樣本的堆疊框架在最上層），
此數值表示該方法執行自身程式碼以及其所呼叫方法的程式碼所花費的總時間。

**Self time**
：對於 bottom-up 樹中的頂層方法（至少有一個 CPU 樣本的堆疊框架在最上層），
此數值表示該方法僅執行自身程式碼所花費的時間。<br><br>
對於 bottom-up 樹中的子方法（呼叫者），此數值表示頂層方法（被呼叫者）透過該子方法（呼叫者）呼叫時的 self time。

**表格元素**（self time）
![Bottom up 表格截圖](/assets/images/docs/tools/devtools/table-element.png)

### Call tree

此表格提供 CPU 分析資料的 top-down（自頂向下）表示。
這表示呼叫樹中的每個頂層方法是某些 CPU 樣本的根節點。
在這個表格中，你可以展開方法以檢視其 _被呼叫者_（callees）。

此檢視對於找出 CPU 分析中耗時的 _路徑_ 很有幫助。
當此表格中的根節點有較高的 _total_ 時間，代表本次分析中有許多 CPU 樣本的呼叫堆疊最底層是該方法。

![Call tree 表格截圖](/assets/images/docs/tools/devtools/call-tree.png)
請參閱下方 [Guidelines](#指引) 章節，了解如何啟用此圖中出現的藍色與綠色垂直線。

提示說明可協助你理解各欄位的數值：

**Total time**
：方法執行自身程式碼以及其所呼叫方法的程式碼所花費的總時間。

**Self time**
：方法僅執行自身程式碼所花費的時間。

### Method table

Method table（方法表）提供 CPU 分析中每個方法的統計資料。
在左側表格中，會列出所有可用方法及其 **total** 與 **self** 時間。

**Total** 時間為方法在呼叫堆疊上**任何位置**所花費的總時間，
換句話說，就是方法執行自身程式碼以及其所呼叫方法的程式碼所花費的時間。

**Self** 時間為方法在呼叫堆疊最上層時所花費的總時間，
換句話說，就是方法僅執行自身程式碼所花費的時間。

![Call tree 表格截圖](/assets/images/docs/tools/devtools/method-table.png)

從左側表格選取一個方法後，會顯示該方法的呼叫圖（call graph）。
呼叫圖會顯示該方法的呼叫者與被呼叫者，以及各自的呼叫百分比。

### Flame chart

Flame chart（火焰圖）檢視是 [Call tree](#call-tree) 的圖形化表示。
這是 CPU 分析的自頂向下檢視，因此在此圖中，最上層的方法會呼叫下方的方法。
每個火焰圖元素的寬度代表該方法在呼叫堆疊上所花費的時間。

與 Call tree 類似，此檢視有助於找出 CPU 分析中耗時的路徑。

![Flame chart 截圖](/assets/images/docs/tools/devtools/cpu-flame-chart.png)

說明選單可透過點擊搜尋列旁的 `?` 圖示開啟，提供如何在圖表中瀏覽與縮放的資訊，以及色彩標註圖例。
![Flame chart 說明截圖](/assets/images/docs/tools/devtools/flame-chart-help.png){:width="70%"}


### CPU 取樣率

DevTools 會設定 VM 收集 CPU 樣本的頻率：
1 個樣本 / 250 微秒（μs）。
在 CPU 分析器頁面預設選擇為「Cpu sampling rate: medium」。
你可以透過頁面頂端的選擇器調整此頻率。

![CPU sampling rate 選單截圖](/assets/images/docs/tools/devtools/cpu-sampling-rate-menu.png){:width="70%"}

**low**、**medium** 與 **high** 取樣率分別為 1,000 Hz、4,000 Hz 及 20,000 Hz。
調整此設定時，請注意其權衡。

以**較高**取樣率錄製的分析檔案，會產生更細緻的 CPU 分析資料，樣本數更多。
這可能會影響應用程式效能，因為 VM 必須更頻繁地中斷以收集樣本。
同時也會導致 VM 的 CPU 樣本緩衝區更快溢位。
VM 可儲存 CPU 樣本資訊的空間有限。
在較高取樣率下，空間會比低取樣率更快填滿並開始溢位。
這表示你可能無法取得錄製分析檔案初期的 CPU 樣本，具體取決於錄製期間緩衝區是否溢位。

以較低取樣率錄製的分析檔案，會產生較粗略的 CPU 分析資料，樣本數較少。
這對應用程式效能的影響較小，但你能取得的 CPU 活動資訊也較少。
VM 的樣本緩衝區填滿速度也較慢，因此你可以看到更長時間的 CPU 樣本。
這表示你更有機會檢視到錄製分析檔案初期的 CPU 樣本。

### 篩選

在檢視 CPU 分析資料時，你可以依據程式庫、方法名稱或 [`UserTag`][] 進行資料篩選。

![依標籤篩選選單截圖](/assets/images/docs/tools/devtools/filter-by-tag.png)

[`UserTag`]: {{site.api}}/flutter/dart-developer/UserTag-class.html

## 指引

當你檢視 call tree 或 bottom up 檢視時，樹狀結構有時會非常深。
為了協助你在深層樹狀結構中檢視父子關係，可以啟用 **Display guidelines** 選項。
這會在樹狀結構中的父節點與子節點之間加入垂直指引線。

![顯示選項截圖](/assets/images/docs/tools/devtools/display-options.png)

[analyze performance]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance/

## 其他資源

若想學習如何使用 DevTools 分析計算密集型 Mandelbrot 應用程式的 CPU 使用情況，
請參考導引式 [CPU Profiler View 教學][profiler-tutorial]。
同時，也可學習當應用程式使用 isolates 進行平行運算時，如何分析 CPU 使用情況。

[profiler-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-cpu-profiler-view-part-6-of-8-31e24eae6bf8
