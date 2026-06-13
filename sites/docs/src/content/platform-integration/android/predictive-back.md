---
title: 新增預測返回（predictive-back）手勢
shortTitle: Predictive-back
description: >-
  瞭解如何在你的 Android 應用程式中新增預測返回（predictive back）手勢。
---

此功能已經在 Flutter 登場，
但目前在 Android 本身尚未預設啟用。
你可以依照以下說明進行嘗試。

## 設定你的應用程式

請確保你的應用程式支援 Android API 33 或更高版本，
因為預測返回在較舊版本的 Android 上無法運作。
接著，在 `android/app/src/main/AndroidManifest.xml` 中設定旗標 `android:enableOnBackInvokedCallback="true"`。

## 設定你的裝置

你需要在裝置上啟用開發人員模式（Developer Mode）並設定相關旗標，
因此目前尚無法期待大多數使用者的 Android 裝置能正常使用預測返回功能。如果你想在自己的裝置上試用，
請確保裝置運行的是 API 33 或更高版本，然後在
**設定 => 系統 => 開發人員選項（Developer options）**
中，啟用 **預測返回動畫（Predictive back animations）** 開關。

## 設定你的應用程式

預測返回的 Route 轉場目前
預設尚未啟用，因此你需要在應用程式中手動啟用。
通常，你可以在主題（theme）中進行設定：

```dart
MaterialApp(
  theme: ThemeData(
    pageTransitionsTheme: const PageTransitionsTheme(
      builders: <TargetPlatform, PageTransitionsBuilder>{
        // Set the predictive back transitions for Android.
        TargetPlatform.android: PredictiveBackPageTransitionsBuilder(),
      },
    ),
  ),
  ...
),
```

## 執行你的應用程式

最後，請確保你使用的 Flutter 版本至少為 3.22.2，這是在撰寫本文時的最新穩定版本，以執行你的應用程式。

## 進一步資訊

你可以在以下連結找到更多資訊：

* [Android predictive back][] 重大變更

[Android predictive back]: /release/breaking-changes/android-predictive-back
