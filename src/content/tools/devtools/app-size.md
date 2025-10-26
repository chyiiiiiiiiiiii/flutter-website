---
title: 使用 App Size 工具
description: 學習如何使用 DevTools 的 App Size 工具。
---

## 什麼是 App Size 工具？

App Size 工具可讓你分析應用程式的總體大小。
你可以透過 [Analysis 分析標籤][Analysis tab] 檢視單一快照的「大小資訊」，
或透過 [Diff 差異標籤][Diff tab] 比較兩個不同快照的「大小資訊」。

### 什麼是「大小資訊」？

「大小資訊」包含 Dart 程式碼、原生程式碼，以及應用程式中非程式碼元素（如應用程式套件、資源和字型）的大小資料。一個「大小資訊」檔案會記錄應用程式整體大小的相關數據。

### Dart 大小資訊

Dart AOT 編譯器在編譯應用程式時（僅限 profile 或 release 模式，AOT 編譯器不會用於 debug 建置，debug 建置會使用 JIT 編譯），會對你的程式碼進行 tree-shaking。這表示編譯器會試圖最佳化應用程式的大小，移除未使用或無法到達的程式碼。

在編譯器盡可能最佳化你的程式碼後，最終結果可以彙整為存在於二進位輸出中的套件、函式庫、類別和函式的集合，以及它們各自的位元組大小。這就是我們在 App Size 工具中可以進一步分析、最佳化 Dart 程式碼並追蹤大小問題的 Dart 部分「大小資訊」。

## 如何使用

如果 DevTools 已經連線到正在執行的應用程式，
請切換到「App Size」標籤。

![App Size 標籤螢幕截圖](/assets/images/docs/tools/devtools/app_size_tab.png)

如果 DevTools 尚未連線到正在執行的應用程式，
你可以在啟動 DevTools 後顯示的首頁存取此工具
（請參閱[啟動說明][launch instructions]）。

![首頁上的 App Size 存取截圖](/assets/images/docs/tools/devtools/app_size_access_landing_page.png){:width="100%"}

## Analysis 分析標籤

分析標籤可讓你檢查單一快照的大小資訊。你可以透過樹狀圖（treemap）和表格檢視大小資料的階層結構，也可以透過 dominator tree（支配樹）和呼叫圖（call graph）檢視程式碼歸因資料（例如，為什麼某段程式碼會被包含在編譯後的應用程式中）。

![App Size 分析螢幕截圖](/assets/images/docs/tools/devtools/app_size_analysis.png){:width="100%"}

### 載入大小檔案

當你開啟分析標籤時，會看到載入 App Size 檔案的說明。請將 App Size 檔案拖曳到對話框中，然後點擊「Analyze Size」。

![App Size 分析載入畫面截圖](/assets/images/docs/tools/devtools/app_size_load_analysis.png){:width="100%"}

有關產生大小檔案的資訊，請參閱下方[產生大小檔案][Generating size files]。

### 樹狀圖（Treemap）與表格

樹狀圖和表格會顯示應用程式大小的階層式資料。

#### 使用樹狀圖（Treemap）

樹狀圖是一種用於階層式資料的視覺化方式。
畫面會被劃分為多個矩形，每個矩形的大小與順序取決於某個數值變數（在此為位元組大小）。
每個矩形的面積與該節點在編譯後應用程式中所佔的大小成正比。在每個矩形（稱為 A）內，還會有更深一層的矩形（A 的子節點），代表資料階層中的下一層。

若要深入樹狀圖的某個區塊，請選取該區塊。
這會將樹的根節點重新設為所選區塊，讓它成為樹狀圖的視覺根節點。

若要返回或上移一層，請使用樹狀圖頂部的麵包屑導覽列。

![樹狀圖麵包屑導覽列截圖](/assets/images/docs/tools/devtools/treemap_breadcrumbs.png){:width="100%"}

### Dominator Tree（支配樹）與呼叫圖

此頁面區段會顯示程式碼大小歸因資料（例如，為什麼某段程式碼會被包含在編譯後的應用程式中）。這些資料會以 dominator tree（支配樹）和呼叫圖的形式呈現。

#### 使用 dominator tree（支配樹）

[支配樹（dominator tree）][dominator tree] 是一種樹狀結構，每個節點的子節點是它直接支配的節點。若每一條到`b`的路徑都必須經過`a`，則稱`a`「支配」`b`。

[dominator tree]: https://en.wikipedia.org/wiki/Dominator_(graph_theory)

以 App Size 分析為例，
假設`package:a`同時匯入了`package:b`和`package:c`，
而`package:b`和`package:c`都匯入了`package:d`。

```plaintext
package:a
|__ package:b
|   |__ package:d
|__ package:c
    |__ package:d
```

在此範例中，`package:a` 主控（dominates）`package:d`，
因此這份資料的 dominator tree（主控樹）會如下所示：

```plaintext
package:a
|__ package:b
|__ package:c
|__ package:d
```

這些資訊有助於了解為什麼某些程式碼會出現在你編譯後的應用程式中。例如，當你分析應用程式體積時，若發現有意外的套件被包含在編譯後的應用程式內，你可以利用 dominator tree（主導樹）追蹤該套件的根本來源。

![Screenshot of code size dominator tree](/assets/images/docs/tools/devtools/app_size_dominator_tree.png){:width="100%"}

#### 使用 call graph（呼叫圖）

call graph（呼叫圖）提供了與 dominator tree（主導樹）類似的資訊，能幫助你理解為什麼某段程式碼會存在於編譯後的應用程式中。然而，與 dominator tree 顯示程式碼體積資料節點之間一對多的主導關係不同，call graph 則顯示程式碼體積資料節點之間多對多的關聯。

同樣地，請參考以下範例：

```plaintext
package:a
|__ package:b
|   |__ package:d
|__ package:c
    |__ package:d
```

這些資料的呼叫圖（call graph）會將 `package:d` 連結到其直接呼叫者 `package:b` 和 `package:c`，而不是其「支配者」（dominator）`package:a`。

```plaintext
package:a --> package:b -->
                              package:d
package:a --> package:c -->
```

這些資訊有助於你瞭解程式碼各部分（套件、函式庫、類別、函式）之間的細緻依賴關係。

![Screenshot of code size call graph](/assets/images/docs/tools/devtools/app_size_call_graph.png){:width="100%"}

#### 我應該使用 Dominator Tree 還是 Call Graph（呼叫圖）？

如果你想瞭解某段程式碼被納入應用程式的*根本*原因，請使用 dominator tree（主導樹）。如果你想瞭解某段程式碼所有的呼叫路徑（進出路徑），請使用 call graph（呼叫圖）。

dominator tree 是一種對 call graph 資料的分析或切片，其中節點之間是以「主導」關係連結，而非父子階層。在父節點主導子節點的情況下，call graph 與 dominator tree 的關係會相同，但這並非總是如此。

如果 call graph 是完整的（每對節點之間都有邊），則 dominator tree 會顯示`root`是圖中所有節點的主導者。這就是一個 call graph 能讓你更好理解某段程式碼為何被納入應用程式的例子。

## Diff 分頁

Diff 分頁可讓你比較兩個不同的程式碼體積（size）資訊快照。你要比較的這兩個 size 資訊檔案，應該是從同一個應用程式的兩個不同版本產生的；例如，分別在你修改程式碼前後所產生的 size 檔案。你可以透過 treemap（樹狀圖）和表格視覺化這兩組資料的差異。

![Screenshot of app size diff](/assets/images/docs/tools/devtools/app_size_diff.png){:width="100%"}

### 載入 size 檔案

當你開啟 **Diff** 分頁時，會看到載入「舊」與「新」size 檔案的指示。這些檔案必須是從同一個應用程式產生的。請將這兩個檔案分別拖曳到對應的對話框中，然後點擊 **Analyze Diff**。

![Screenshot of app size diff loading screen](/assets/images/docs/tools/devtools/app_size_load_diff.png){:width="100%"}

有關如何產生這些檔案，請參考下方的[Generating size files][Generating size files]。

### Treemap 與表格

在 diff 檢視中，treemap 和樹狀表格只會顯示兩個匯入 size 檔案之間有差異的資料。

如需有關 treemap 使用方式的問題，請參考上方的[Use the treemap][Use the treemap]。

## 產生 size 檔案

要使用 app size 工具，你需要先產生一個 Flutter 體積分析檔案（size analysis file）。這個檔案包含整個應用程式的體積資訊（原生程式碼、Dart 程式碼、資源、字型等），你可以使用`--analyze-size`參數來產生：

```console
flutter build <your target platform> --analyze-size
```

這會建置您的應用程式，並在命令列（Command Line Interface）上顯示大小摘要，同時顯示一行訊息，告訴您在哪裡可以找到大小分析檔案。

```console
flutter build apk --analyze-size --target-platform=android-arm64
...
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
app-release.apk (total compressed)                               6 MB
...
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
A summary of your APK analysis can be found at: build/apk-code-size-analysis_01.json
```

在此範例中，請將`build/apk-code-size-analysis_01.json`檔案匯入 App Size Tool（應用程式大小工具）以進一步分析。
欲了解更多資訊，請參閱 [App Size Documentation][App Size Documentation]。

## 其他資源

若想學習如何使用 DevTools 逐步分析 Wonderous App 的大小，請參考 [App Size Tool 教學][app-size-tutorial]。文件中也討論了各種減少應用程式大小的策略。

[Use the treemap]: #使用樹狀圖-treemap
[Generating size files]: #generating-size-files
[Analysis tab]: #analysis-分析標籤
[Diff tab]: #diff-tab
[launch instructions]: /tools/devtools#start
[App Size Documentation]: /perf/app-size#breaking-down-the-size
[app-size-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-app-size-tool-part-3-of-8-9be6e9ec42a2
