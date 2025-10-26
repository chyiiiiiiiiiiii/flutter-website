---
title: Flutter 當機回報（Crash Reporting）
description: >-
  Google 如何使用當機回報、收集哪些資訊，以及如何選擇退出。
---

如果你尚未選擇退出 Flutter 的分析（analytics）與當機回報（crash reporting），
當執行 `flutter` 指令發生當機時，
系統會嘗試將當機回報傳送給 Google，
以協助 Google 持續改進 Flutter。
當機回報可能包含以下資訊：

* 你本機作業系統的名稱與版本。
* 執行該指令所使用的 Flutter 版本。
* 錯誤的執行時型別，例如
  `StateError` 或 `NoSuchMethodError`。
* 當機所產生的堆疊追蹤（stack trace），其中僅包含 Flutter 命令列介面（Command Line Interface, CLI）本身的程式碼參考，不會包含你的應用程式程式碼。
* 客戶端 ID：一組為安裝 Flutter 的電腦所產生的常數且唯一的數字。
  這有助於我們去除來自同一台電腦的多個相同當機回報。
  也能協助我們在你升級到下一個 Flutter 版本後，驗證修復是否如預期運作。

Google 會依照
[Google 隱私權政策][Google Privacy Policy]
處理此工具所回報的所有資料。

你可以在
`.dart-tool/dart-flutter-telemetry.log` 檔案中檢視最近回報的資料。
在 macOS 或 Linux 上，這個日誌位於家目錄（`~/`）。
在 Windows 上，這個日誌位於 Roaming AppData 目錄（`%APPDATA%`）。

## 關閉分析回報

若要選擇退出匿名當機回報與功能使用統計資料，請執行下列指令：

```console
$ flutter --disable-analytics
```

如果你選擇停用分析（analytics），Flutter 會傳送一個停用事件（opt-out event）。
此 Flutter 安裝將不會再傳送或儲存任何進一步的資訊。

若要重新啟用分析（opt into analytics），請執行以下指令： 

```console
$ flutter --enable-analytics
```

若要顯示目前的設定，請執行以下指令：

```console
$ flutter config
```

[Google Privacy Policy]: https://policies.google.com/privacy
