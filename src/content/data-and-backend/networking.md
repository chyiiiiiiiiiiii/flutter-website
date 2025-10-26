---
title: 網路通訊
description: Flutter 中的網路（Internet）呼叫。
---

## 跨平台 HTTP 網路通訊

[`http`][`http`] 套件提供最簡單的方式來發送 HTTP 請求。此套件支援 Android、iOS、macOS、Windows、Linux 以及網頁（web）平台。

## 各平台注意事項

部分平台需要額外設定，詳情如下。

### Android

Android 應用程式必須在 Android manifest（`AndroidManifest.xml`）中[宣告其網路使用權限][declare]：

```xml
<manifest xmlns:android...>
 ...
 <uses-permission android:name="android.permission.INTERNET" />
 <application ...
</manifest>
```

### macOS

macOS 應用程式必須在相關的 `*.entitlements` 檔案中允許網路存取。 

```xml
<key>com.apple.security.network.client</key>
<true/>
```

進一步了解[設定權限][setting up entitlements]。

[setting up entitlements]: /platform-integration/macos/building#setting-up-entitlements

## 範例

如需各種網路任務（包含資料擷取、WebSockets，以及在背景解析資料）的實用範例，請參考
[networking cookbook recipes](/cookbook/networking)。

[declare]: {{site.android-dev}}/training/basics/network-ops/connecting
[`http`]: {{site.pub-pkg}}/http
