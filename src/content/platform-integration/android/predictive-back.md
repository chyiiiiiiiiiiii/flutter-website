---
title: 新增預測式返回手勢
shortTitle: 預測式返回
description: >-
  學習如何在你的 Android 應用程式中新增預測式返回（predictive back）手勢。
---

此功能已在 Flutter 中推出，
但目前在 Android 系統本身尚未預設啟用。
你可以依照以下說明進行嘗試。

## 設定你的應用程式

請確認你的應用程式支援 Android API 33 或更高版本，
因為預測式返回無法在較舊版本的 Android 上運作。
接著，在`android/app/src/main/AndroidManifest.xml`中設定旗標`android:enableOnBackInvokedCallback="true"`。

## 設定你的裝置

你需要在裝置上啟用開發人員模式，並設定相關旗標，
因此目前還無法預期大多數使用者的 Android 裝置會支援預測式返回。
如果你想在自己的裝置上試用，
請確保裝置運行的是 API 33 或更高版本，然後在
**設定 => 系統 => 開發人員選項**
中，啟用 **預測式返回動畫（Predictive back animations）** 的開關。

## 設定你的應用程式

預測式返回的 Route（路由）轉場目前
預設尚未啟用，因此你需要在應用程式中手動啟用。
通常，你可以透過在主題（theme）中設定來達成：

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

最後，請確保你使用的 Flutter 版本至少為 3.22.2，這是在撰寫本文時的最新穩定版本，來執行你的應用程式。

## 進一步資訊

你可以在以下連結找到更多資訊：

* [Android predictive back][Android predictive back] 重大變更

[Android predictive back]: /release/breaking-changes/android-predictive-back

