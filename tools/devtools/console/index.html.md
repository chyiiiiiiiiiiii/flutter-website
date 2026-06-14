# 使用 Debug 主控台

> 學習如何使用 DevTools 主控台。



DevTools 的 Debug 主控台可讓你監看應用程式的標準輸出（`stdout`）、在除錯模式下針對暫停或執行中的應用程式評估運算式，並分析物件的進出參考。

:::note
本頁內容已更新至 DevTools 2.23.0。
:::

Debug 主控台可從 [Inspector][Inspector]、[Debugger][Debugger] 和 [Memory][Memory] 檢視畫面進入。

[Inspector]: /tools/devtools/inspector
[Debugger]:  /tools/devtools/debugger
[Memory]:    /tools/devtools/memory

## 監看應用程式輸出

主控台會顯示應用程式的標準輸出（`stdout`）：

![Console 檢視畫面中的 stdout 截圖](/assets/images/docs/tools/devtools/console-stdout.png)

## 探索被檢查的元件 (Widgets)

如果你在 **Inspector** 螢幕上點擊某個元件 (Widget)，該元件的變數會顯示在 **Console** 中：

![Console 檢視畫面中被檢查元件的截圖](/assets/images/docs/tools/devtools/console-inspect-widget.png){:width="100%"}

## 評估運算式

在主控台中，你可以針對暫停或執行中的應用程式評估運算式，前提是你正在除錯模式下執行應用程式：

![主控台中評估運算式的截圖](/assets/images/docs/tools/devtools/console-evaluate-expressions.png)

若要將評估後的物件指派給變數，可以使用 `$0`、`$1`（到 `$5`）的形式，例如 `var x = $0`：

![如何評估變數的截圖](/assets/images/docs/tools/devtools/console-evaluate-variables.png){:width="100%"}

## 瀏覽記憶體堆疊快照

若要從堆疊快照拖放變數到主控台，請依照下列步驟操作：

1. 前往 **Devtools > Memory > Diff Snapshots**。
1. 錄製一個記憶體堆疊快照。
1. 點擊內容選單 `[⋮]` 以檢視所選 **Class** 的 **Instances** 數量。
1. 選擇你要將單一實例儲存為主控台變數，或是將應用程式中目前所有存活的實例都儲存下來。

![如何瀏覽堆疊快照的截圖](/assets/images/docs/tools/devtools/browse-heap-snapshot.png){:width="100%"}

Console 螢幕會同時顯示動態與靜態的進出參考，以及欄位值：

![Console 中進出參考的截圖](/assets/images/docs/tools/devtools/console-references.png){:width="100%"}

