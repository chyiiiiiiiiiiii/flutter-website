---
title: 使用除錯器
description: 如何使用 DevTools 的原始碼層級除錯器。
---

:::note
如果應用程式是從 VS Code 啟動的，DevTools 會隱藏 Debugger 分頁，
因為 VS Code 已內建除錯器。
:::

## 入門

DevTools 提供完整的原始碼層級除錯器，
支援中斷點、單步執行以及變數檢查。

當你開啟 Debugger 分頁時，應該會看到應用程式主要進入點的原始碼
已經載入在除錯器中。

若要瀏覽更多應用程式的原始碼，請點選右上角的 **Libraries**
或按下 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>P</kbd>。
這會開啟函式庫視窗，讓你可以搜尋其他原始碼檔案。

![Debugger 分頁螢幕截圖](/assets/images/docs/tools/devtools/debugger_screenshot.png){:width="100%"}

## 設定中斷點

要設定中斷點，請在原始碼區域的左側邊緣（行號尺規）點擊。
點擊一次會設定一個中斷點，該中斷點也會顯示在左側的 **Breakpoints** 區域。
再次點擊則會移除該中斷點。

## 呼叫堆疊與變數區域

當你的應用程式遇到中斷點時，會在該處暫停，
DevTools 除錯器會在原始碼區域顯示暫停的執行位置。
此外，`Call stack` 和 `Variables`
區域會顯示目前暫停 isolate 的呼叫堆疊，
以及所選堆疊框架的區域變數。選取 `Call stack`
區域中的其他框架時，變數內容也會跟著變動。

在 `Variables` 區域中，你可以展開個別物件來檢查其欄位。
將滑鼠游標懸停在 `Variables` 區域的物件上時，會呼叫該物件的 `toString()`
並顯示結果。

## 單步執行原始碼

當暫停時，三個單步執行按鈕會變為可用。

* 使用 **Step in** 可進入方法呼叫，並在被呼叫方法的第一個可執行行暫停。
* 使用 **Step over** 可略過方法呼叫；
  這會在目前方法內逐行執行原始碼。
* 使用 **Step out** 可跳出目前方法，
  不會在中間的任何行暫停。

此外，**Resume** 按鈕可讓應用程式繼續正常執行。

## 主控台輸出

執行中應用程式的主控台輸出（stdout 與 stderr）
會顯示在原始碼區域下方的主控台中。
你也可以在 [Logging view][Logging view] 中查看輸出。

## 例外中斷

若要調整遇到例外時的暫停行為，可切換除錯器檢視頂端的
**Ignore** 下拉選單。

僅在未處理例外時中斷，表示只有當中斷點被視為應用程式程式碼未捕捉時，
才會暫停執行。
對所有例外中斷則會讓除錯器無論該中斷點是否被應用程式程式碼捕捉，
都會暫停執行。

## 已知問題

當對 Flutter 應用程式執行熱重啟（hot restart）時，
使用者設定的中斷點會被清除。

[Logging view]: /tools/devtools/logging

## 其他資源

如需更多除錯與效能分析的資訊，請參閱
[Debugging][Debugging] 頁面。

[Debugging]: /testing/debugging
