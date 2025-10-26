---
title: 使用 CPU 分析器檢視
description: 了解如何使用 DevTools 的 CPU 分析器檢視。
---

:::note
CPU 分析器檢視僅適用於 Dart CLI 和行動應用程式。  
若要分析 Web 應用程式的效能，請使用 Chrome DevTools 的[效能分析功能][analyze performance]。
:::

CPU 分析器檢視允許你從 Dart 或 Flutter 應用程式錄製並分析一個執行階段（session）。
分析器可以協助你解決效能問題，或更全面地瞭解應用程式的 CPU 活動。
Dart VM 會收集 CPU 取樣（即某一時刻 CPU 呼叫堆疊的快照），
並將資料傳送至 DevTools 以視覺化呈現。
透過彙整大量的 CPU 取樣，分析器可以幫助你瞭解 CPU 大部分時間花費在哪些地方。

:::note
**如果你正在執行 Flutter 應用程式，請使用 profile build 來進行效能分析。**
除非你的 Flutter 應用程式以 profile 模式執行，否則 CPU 分析結果無法反映 release 模式的效能。
:::

## CPU 分析器

點擊 **Record** 開始錄製 CPU 分析資料。
錄製完成後，點擊 **Stop**。此時，CPU 分析資料會從 VM 讀取並顯示於分析器檢視（Call tree、Bottom up、Method table 以及 Flame chart）。

若想載入所有可用的 CPU 取樣而不需手動錄製與停止，可以點擊 **Load all CPU samples**，
這會將 VM 已記錄並儲存在其環形緩衝區（ring buffer）中的所有 CPU 取樣讀取出來，並顯示於分析器檢視中。

### Bottom up

此表格提供 CPU 分析的 bottom-up（自底向上）表示法。
這代表 bottom up 表格中的每個頂層方法（root），其實是某些 CPU 取樣中呼叫堆疊的最上層方法。
換句話說，bottom up 表格中的每個頂層方法，都是 top down 表格（call tree）中的葉節點。
在這個表格中，可以展開方法以顯示其 _呼叫者_。

此檢視有助於找出 CPU 分析中「昂貴」的 _方法_。
當此表格中的 root 節點有很高的 _self_ 時間，表示本次分析中有許多 CPU 取樣以該方法作為呼叫堆疊的頂端結束。

![Bottom up 檢視畫面截圖](/assets/images/docs/tools/devtools/bottom-up-view.png)  
請參閱下方的[指引](#指引)，了解如何啟用圖中所見的藍色與綠色垂直線。

提示說明可協助你理解各欄位的數值：

**Total time（總時間）**
: 對於 bottom-up 樹中的頂層方法（至少有一個 CPU 取樣的堆疊框架位於頂端），
此欄顯示該方法執行自身程式碼及其所呼叫方法程式碼的總時間。

**Self time（自身時間）**
: 對於 bottom-up 樹中的頂層方法（至少有一個 CPU 取樣的堆疊框架位於頂端），
此欄顯示該方法僅執行自身程式碼所花費的時間。<br><br>
對於 bottom-up 樹中的子方法（呼叫者），
此欄顯示頂層方法（被呼叫者）透過該子方法（呼叫者）呼叫時的 self time。

**表格元素**（self time）
![Bottom up 表格截圖](/assets/images/docs/tools/devtools/table-element.png)

### Call tree

此表格提供 CPU 分析的 top-down（自頂向下）表示法。
這代表 call tree 中的每個頂層方法是某些 CPU 取樣的根節點。
在此表格中，可以展開方法以顯示其 _被呼叫者_（callees）。

此檢視有助於找出 CPU 分析中「昂貴」的 _路徑_。
當此表格中的 root 節點有很高的 _total_ 時間，表示本次分析中有許多 CPU 取樣以該方法作為呼叫堆疊的底端開始。

![Call tree 表格截圖](/assets/images/docs/tools/devtools/call-tree.png)  
請參閱下方的[指引](#指引)，了解如何啟用圖中所見的藍色與綠色垂直線。

提示說明可協助你理解各欄位的數值：

**Total time（總時間）**
: 方法執行自身程式碼及其所呼叫方法程式碼所花費的時間。

**Self time（自身時間）**
: 方法僅執行自身程式碼所花費的時間。

### Method table

Method table（方法表格）提供 CPU 分析中每個方法的統計資料。
在左側的表格中，會列出所有可用的方法及其 **total**（總時間）與 **self**（自身時間）。

**Total**（總時間）是指該方法在呼叫堆疊「任何位置」所花費的總時間，
也就是該方法執行自身程式碼及其所呼叫方法程式碼的總和。

**Self**（自身時間）是指該方法位於呼叫堆疊頂端時所花費的總時間，
也就是僅執行自身程式碼的時間。

![Call tree 表格截圖](/assets/images/docs/tools/devtools/method-table.png)

從左側表格選取一個方法後，會顯示該方法的呼叫圖（call graph）。
呼叫圖會顯示該方法的呼叫者與被呼叫者，以及各自的呼叫百分比。

### Flame chart

Flame chart（火焰圖）檢視是[Call tree](#call-tree)的圖形化表示。
這是一種自頂向下的 CPU 分析檢視，因此在圖中，最上層的方法會呼叫其下方的方法。
每個火焰圖元素的寬度代表該方法在呼叫堆疊上所花費的時間。

與 Call tree 相同，此檢視有助於找出 CPU 分析中「昂貴」的路徑。

![Flame chart 截圖](/assets/images/docs/tools/devtools/cpu-flame-chart.png)

說明選單可透過點擊搜尋列旁的 `?` 圖示開啟，提供如何在圖表中瀏覽與縮放的資訊，以及色碼圖例。
![Flame chart 說明截圖](/assets/images/docs/tools/devtools/flame-chart-help.png){:width="70%"}

### CPU 取樣率（CPU sampling rate）

DevTools 會設定 VM 收集 CPU 取樣的速率：
每 250 微秒（μs）取樣 1 次。
預設在 CPU 分析器頁面上顯示為「Cpu sampling rate: medium」。
你可以透過頁面頂端的選擇器調整此速率。

![CPU 取樣率選單截圖](/assets/images/docs/tools/devtools/cpu-sampling-rate-menu.png){:width="70%"}

**low**、**medium**、**high** 取樣率分別為 1,000 Hz、4,000 Hz 及 20,000 Hz。
調整此設定時，請注意其權衡影響。

以**較高**取樣率錄製的分析，會產生更細緻的 CPU 分析資料，取樣數量更多。
但這可能會影響應用程式效能，因為 VM 會更頻繁地被中斷以收集取樣。
同時，VM 的 CPU 取樣緩衝區也會更快溢位。
VM 用於儲存 CPU 取樣資訊的空間有限，
在較高取樣率下，空間會比低取樣率更快填滿並開始溢位。
這代表你可能無法取得錄製分析起始時的 CPU 取樣，具體取決於錄製期間緩衝區是否溢位。

以較低取樣率錄製的分析，會產生較粗略的 CPU 分析資料，取樣數量較少。
這對應用程式效能的影響較小，
但你可能獲得的 CPU 活動資訊也較少。
VM 的取樣緩衝區填滿速度也較慢，因此你能看到更長時間的 CPU 取樣。
這表示你更有機會檢視到錄製分析起始時的 CPU 取樣。

### 篩選（Filtering）

在檢視 CPU 分析時，你可以依據程式庫、方法名稱或[`UserTag`][`UserTag`]進行資料篩選。

![篩選標籤選單截圖](/assets/images/docs/tools/devtools/filter-by-tag.png)  

[`UserTag`]: {{site.api}}/flutter/dart-developer/UserTag-class.html

## 指引

當你檢視 call tree 或 bottom up 檢視時，樹狀結構有時可能非常深。
為了協助你在深層樹狀結構中辨識父子關係，可以啟用 **Display guidelines** 選項。
這會在樹狀結構中的父節點與子節點之間加入垂直指引線。

![顯示選項截圖](/assets/images/docs/tools/devtools/display-options.png)  

[analyze performance]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance/
  
## 其他資源
  
若想學習如何使用 DevTools 分析計算密集型 Mandelbrot 應用程式的 CPU 使用情形，
請參考導引式[CPU 分析器檢視教學][profiler-tutorial]。
同時，也可學習在應用程式使用 isolates 進行平行運算時如何分析 CPU 使用情形。

[profiler-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-cpu-profiler-view-part-6-of-8-31e24eae6bf8
