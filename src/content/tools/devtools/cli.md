---
title: 從命令列啟動 DevTools
description: 學習如何從命令列啟動與使用 DevTools。
---

若要從命令列 (Command Line Interface) 執行 DevTools，
您必須將 `dart` 加入至您的路徑 (path)。
接著，請執行 `dart devtools` 指令以啟動 DevTools。

若要升級 DevTools，請升級 Flutter。
如果較新的 Dart SDK
（包含於 Flutter SDK 中）
內含較新版的 DevTools，
執行 `dart devtools` 時會自動啟動該版本。
如果 `which dart` 指向的 Dart SDK 並非
包含於您的 Flutter SDK 中，僅更新該
Dart SDK 並不會更新 Flutter 的版本。

當您從命令列執行 DevTools 時，
您應該會看到類似以下的輸出：

```plaintext
Serving DevTools at http://127.0.0.1:9100
```

## 啟動要除錯的應用程式

接下來，請啟動一個可供連線的應用程式。
這可以是 Flutter 應用程式，
也可以是 Dart 命令列應用程式（command-line application）。
以下指令指定了一個 Flutter 應用程式：

```console
cd path/to/flutter/app
flutter run
```

你需要先連接裝置或開啟模擬器，`flutter run` 才能運作。當應用程式啟動後，你會在終端機中看到類似以下的訊息：

```console
A Dart VM Service on macOS is available at:
http://127.0.0.1:51830/u37pq71Re0k=/
The Flutter DevTools debugger and profiler on macOS
is available at:
http://127.0.0.1:9100?uri=http://127.0.0.1:51830/u37pq71Re0k=/
```

開啟連接到你的應用程式的 DevTools 實例，
方法是在 Chrome 中開啟第二個連結。

這個 URL 包含安全性權杖，
因此每次執行應用程式時都會不同。
這表示如果你停止應用程式並重新執行，
就需要使用新的 URL 再次連接 DevTools。

## 連接到新的應用程式實例

如果你的應用程式停止執行，
或你手動開啟了 DevTools，
你應該會看到一個 **Connect**（連線）對話框：

![Screenshot of the DevTools connect dialog](/assets/images/docs/tools/devtools/connect_dialog.png){:width="100%"}

你可以手動將 DevTools 連接到新的應用程式實例，
方法是複製你從執行應用程式時獲得的連結，
例如 ` http://127.0.0.1:51830/u37pq71Re0k=/`
