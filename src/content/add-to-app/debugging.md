---
title: 偵錯你的 add-to-app 模組
shortTitle: 偵錯
description: 如何執行、偵錯與熱重載你的 add-to-app Flutter 模組。
---

當你已將 Flutter 模組整合到你的專案，並且使用 Flutter 的平台 API 來執行 Flutter 引擎和／或 UI 之後，你就可以像執行一般 Android 或 iOS 應用程式一樣，建置並執行你的 Android 或 iOS 應用程式。

只要你的程式碼中包含 `FlutterActivity` 或 `FlutterViewController`，Flutter 就會驅動該處的 UI。

## 概覽

你可能已經習慣在執行 `flutter run` 或從 IDE 執行等效指令時，能夠使用你最喜愛的一系列 Flutter 偵錯工具。但在 add-to-app 的情境下，你同樣可以使用所有 Flutter [偵錯功能][debugging functionalities]，例如熱重載、效能疊加、DevTools，以及設置中斷點等。

`flutter attach` 指令提供了這些功能。你可以透過 SDK 的命令列工具（CLI）、VS Code、IntelliJ IDEA 或 Android Studio 來執行這個指令。

當你執行 `FlutterEngine` 時，`flutter attach` 指令會連線。它會持續附加，直到你釋放你的 `FlutterEngine`。你也可以在啟動引擎前呼叫 `flutter attach`。`flutter attach` 指令則會等待你的引擎所託管的下一個可用 Dart VM。

## 從終端機進行偵錯

若要從終端機附加，請執行 `flutter attach`。若要選擇特定目標裝置，請加上 `-d <deviceId>`。

```console
$ flutter attach
```

該指令應該會輸出類似以下的內容：

```console
Syncing files to device iPhone 15 Pro...
 7,738ms (!)

To hot reload the changes while running, press "r".
To hot restart (and rebuild state). press "R".
```

## 在 Xcode 和 VS Code 中除錯 iOS 擴充功能

{% render docs/debug/debug-flow-ios.md, add:'launch' %}

## 在 Android Studio 中除錯 Android 擴充功能

{% render docs/debug/debug-flow-androidstudio-as-start.md %}

[debugging functionalities]: /testing/debugging

## 無需 USB 連線進行除錯 {:#wireless-debugging}

若要在 iOS 或 Android 裝置上透過 Wi-Fi 進行應用程式除錯，
請使用 `flutter attach`。

### 在 iOS 裝置上透過 Wi-Fi 除錯

針對 iOS 目標，請完成以下步驟：

1. 確認您的裝置已如 [iOS 設定指南][iOS setup guide] 所述，透過 Wi-Fi 連線至 Xcode。

1. 在您的 macOS 開發機上，
   開啟 **Xcode** <span aria-label="and then">></span>
   **Product** <span aria-label="and then">></span>
   **Scheme** <span aria-label="and then">></span>
   **Edit Scheme...**。

   您也可以按下 <kbd>Cmd</kbd> + <kbd><</kbd>。

1. 點擊 **Run**。

1. 點擊 **Arguments**。

1. 在 **Arguments Passed On Launch** 中，點擊 **+**。

   {:type="a"}
   1. 如果您的開發機使用 IPv4，請加入 `--vm-service-host=0.0.0.0`。

   1. 如果您的開發機使用 IPv6，請加入 `--vm-service-host=::0`。

   {% render docs/app-figure.md, img-class:"site-mobile-screenshot border", image:"development/add-to-app/debugging/wireless-port.png",
   caption:"已新增 IPv4 網路的 Arguments Passed On Launch 畫面", width:"100%" %}

#### 如何判斷您是否在 IPv6 網路下

1. 開啟 **設定** <span aria-label="and then">></span> **Wi-Fi**。

1. 點擊您已連線的網路。

1. 點擊 **詳細資訊...**

1. 點擊 **TCP/IP**。

1. 檢查是否有 **IPv6 位址** 區段。

   {% render docs/app-figure.md, img-class:"site-mobile-screenshot border", image:"development/add-to-app/ipv6.png", caption:"macOS 系統設定中的 WiFi 對話框", width:"60%" %}

### 在 Android 裝置上透過 Wi-Fi 除錯

請依照 [Android 設定指南][Android setup guide] 所述，確認您的裝置已透過 Wi-Fi 連線至 Android Studio。

[iOS setup guide]: /platform-integration/ios/setup
[Android setup guide]: /platform-integration/android/setup#set-up-devices
