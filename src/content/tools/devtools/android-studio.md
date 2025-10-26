---
title: 從 Android Studio 執行 DevTools
description: 學習如何從 Android Studio 啟動與使用 DevTools。
---

## 安裝 Flutter 外掛程式

如果你尚未安裝 Flutter 外掛程式，請先加以安裝。
你可以在 IntelliJ 與 Android Studio 的 **外掛程式（Plugins）** 頁面中進行安裝。
打開該頁面後，可以在市集搜尋 Flutter 外掛程式。

## 啟動應用程式以進行除錯 {: #run-and-debug}

要開啟 DevTools，首先需要執行一個 Flutter 應用程式。
你可以打開一個 Flutter 專案，確保已連接裝置，
然後點擊工具列上的 **執行（Run）** 或 **除錯（Debug）** 按鈕。

## 從工具列／選單啟動 DevTools

當應用程式正在執行時，
你可以透過以下任一方式啟動 DevTools：

* 在執行（Run）檢視中選擇 **Open DevTools** 工具列動作。
* 在除錯（Debug）檢視中選擇 **Open DevTools** 工具列動作（若正在除錯）。
* 在 Flutter Inspector 檢視的 **更多動作（More Actions）** 選單中，選擇 **Open DevTools** 動作。

![screenshot of Open DevTools button](/assets/images/docs/tools/devtools/android_studio_open_devtools.png){:width="100%"}

## 透過動作（Action）啟動 DevTools

你也可以透過 IntelliJ 的動作（Action）來開啟 DevTools。
開啟 **尋找動作...（Find Action...）** 對話框
（在 macOS 上，請按下 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd>），
並搜尋 **Open DevTools** 動作。
當你選擇該動作時，DevTools 伺服器會啟動，
並自動開啟一個指向 DevTools 應用程式的瀏覽器視窗。

透過 IntelliJ 動作開啟時，DevTools 並不會自動連接到 Flutter 應用程式。
你需要為目前正在執行的應用程式提供一個服務協定埠（service protocol port）。
你可以透過內嵌的 **連接至執行中的應用程式（Connect to a running app）** 對話框來完成這個步驟。
