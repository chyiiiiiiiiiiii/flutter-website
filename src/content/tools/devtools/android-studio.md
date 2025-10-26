---
title: 從 Android Studio 執行 DevTools
description: 瞭解如何從 Android Studio 啟動並使用 DevTools。
---

## 安裝 Flutter 外掛程式

如果你尚未安裝 Flutter 外掛程式，請先加入。
你可以透過 IntelliJ 和 Android Studio 設定中的 **Plugins**（外掛程式）頁面進行安裝。
打開該頁面後，可以在 Marketplace 搜尋 Flutter 外掛程式。

## 啟動應用程式以進行偵錯 {: #run-and-debug}

要開啟 DevTools，首先需要執行一個 Flutter 應用程式。
你可以打開一個 Flutter 專案，確保已連接裝置，
然後點擊工具列上的 **Run**（執行）或 **Debug**（偵錯）按鈕。

## 從工具列／選單啟動 DevTools

當應用程式正在執行時，
你可以透過以下任一方式啟動 DevTools：

* 在 Run 檢視中選擇 **Open DevTools** 工具列操作。
* 在 Debug 檢視中選擇 **Open DevTools** 工具列操作（若正在偵錯）。
* 在 Flutter Inspector 檢視的 **More Actions**（更多操作）選單中選擇 **Open DevTools** 操作。

![screenshot of Open DevTools button](/assets/images/docs/tools/devtools/android_studio_open_devtools.png){:width="100%"}

## 從動作（Action）啟動 DevTools

你也可以從 IntelliJ 的動作（Action）開啟 DevTools。
打開 **Find Action...**（尋找動作...）對話框
（在 macOS 上，請按 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd>），
然後搜尋 **Open DevTools** 動作。
當你選擇該動作時，DevTools 伺服器會啟動，並自動開啟一個指向 DevTools 應用程式的瀏覽器視窗。

當你透過 IntelliJ 動作開啟 DevTools 時，DevTools 並不會自動連接到 Flutter 應用程式。你需要為目前正在執行的應用程式提供一個 service protocol port（服務協定埠）。
你可以使用內嵌的 **Connect to a running app**（連接至執行中的應用程式）對話框來完成此操作。
