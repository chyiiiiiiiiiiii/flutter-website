---
title: 使用 Debug 主控台
description: 學習如何使用 DevTools 主控台。
---

DevTools 的 Debug 主控台允許你監看應用程式的標準輸出（`stdout`）、在偵錯模式下針對暫停或執行中的應用程式評估運算式，並分析物件的進出參考（inbound and outbound references）。

:::note
本頁內容已更新至 DevTools 2.23.0。
:::

Debug 主控台可從 [Inspector][Inspector]、[Debugger][Debugger] 與 [Memory][Memory] 檢視畫面進入。

[Inspector]: /tools/devtools/inspector
[Debugger]:  /tools/devtools/debugger
[Memory]:    /tools/devtools/memory

## 監看應用程式輸出

主控台會顯示應用程式的標準輸出（`stdout`）：

![Console 螢幕中顯示 stdout 的截圖](/assets/images/docs/tools/devtools/console-stdout.png)

## 探索已檢查的元件 (Widgets)

當你在 **Inspector** 螢幕點擊某個元件時，該元件的變數會顯示在 **Console** 主控台中：

![Console 螢幕中顯示已檢查元件的截圖](/assets/images/docs/tools/devtools/console-inspect-widget.png){:width="100%"}

## 評估運算式

在主控台中，你可以針對暫停或執行中的應用程式評估運算式，前提是你正在以偵錯模式執行應用程式：

![在主控台評估運算式的截圖](/assets/images/docs/tools/devtools/console-evaluate-expressions.png)

若要將評估後的物件指派給變數，請使用 `$0`、`$1`（至 `$5`），格式為 `var x = $0`：

![如何評估變數的截圖](/assets/images/docs/tools/devtools/console-evaluate-variables.png){:width="100%"}

## 瀏覽記憶體堆疊快照（heap snapshot）

若要將變數從堆疊快照拖曳到主控台，請依下列步驟操作：

1. 前往 **Devtools > Memory > Diff Snapshots**。
2. 錄製一個記憶體堆疊快照。
3. 點擊內容選單 `[⋮]`，以檢視所需 **Class** 的 **Instances** 數量。
4. 選擇你要將單一實例儲存為主控台變數，還是要將應用程式中目前存活的 _所有_ 實例都儲存下來。

![如何瀏覽堆疊快照的截圖](/assets/images/docs/tools/devtools/browse-heap-snapshot.png){:width="100%"}

Console 螢幕會同時顯示動態與靜態的進出參考（inbound and outbound references），以及欄位值：

![Console 螢幕中顯示進出參考的截圖](/assets/images/docs/tools/devtools/console-references.png){:width="100%"}

