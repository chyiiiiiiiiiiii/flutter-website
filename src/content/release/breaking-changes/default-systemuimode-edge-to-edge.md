---
title: 將`SystemUiMode`的預設值設為 edge-to-edge
description: >-
    預設情況下，目標為 Android SDK 15+ 的應用程式將自動啟用
    edge-to-edge 模式。
---

{% render docs/breaking-changes.md %}

:::note
你可能是因為在 Google Play Console 看到「Edge-to-edge 可能不會對所有使用者顯示」或「你的應用程式使用了已淘汰的 edge-to-edge API 或參數」等警告而來到這個頁面。
這些警告**不會**影響使用者。

這些警告是指 Flutter 引擎中用於實作 edge-to-edge 模式的已淘汰程式碼。該引擎依賴這些已淘汰的程式碼，以避免對使用者造成破壞性變更，因此如果你在應用程式中設定 edge-to-edge 模式，它仍然可以正常運作。詳情請參閱 [flutter#169810]。
:::

## 摘要

如果你的 Flutter 應用程式目標為 Android SDK 版本 15，
你的應用程式將自動以 edge-to-edge 模式顯示，
詳見 [`SystemUiMode`][`SystemUiMode`] API 文件頁面。
若要維持非 edge-to-edge 的應用程式行為
（包括未設定 `SystemUiMode`），
請依照 [遷移指南](#遷移指南) 進行。

:::note
如果你的 Flutter 應用程式目標為 Android SDK 版本 16 或以上，
你的應用程式將自動以 edge-to-edge 模式顯示，且無法選擇退出。想了解此變更的更多資訊，請參閱
[Android 16 發行說明][Android 16 release notes]。
:::

[`SystemUiMode`]: {{site.api}}/flutter/services/SystemUiMode.html

## 背景說明

預設情況下，Android 會對所有目標為 Android 15 或以上的應用程式強制啟用 [edge-to-edge 模式][edge-to-edge mode]。
如需此變更的更多資訊，請參閱 [Android 15 發行說明][Android 15 release notes]。
這會影響運行於 Android SDK 15+ 或 API 35+ 的裝置。

在 Flutter 3.27 之前，Flutter 應用程式預設目標為 Android 14，
不會自動啟用 edge-to-edge 模式，但
當你選擇將應用程式目標設為 Android 15 時，_仍然_會受到影響。
如果你的應用程式目標為 `flutter.targetSdkVersion`（預設即如此），
那麼從 Flutter 3.27 開始就會以 Android 15 為目標，
並自動啟用 edge-to-edge 模式。

如果你的應用程式已明確設定 `SystemUiMode.edgeToEdge`，
並透過呼叫 [`SystemChrome.setEnabledSystemUIMode`][`SystemChrome.setEnabledSystemUIMode`] 以 edge-to-edge 模式運行，
那麼你的應用程式已完成遷移。需要更多時間遷移至 edge-to-edge 模式的應用程式，必須依照下列步驟，在運行 Android SDK 15 的裝置上選擇退出。

請注意下列事項：

 1. Android 計劃僅暫時提供此處所述的解決方法。
 2. Flutter 計劃在今年內與 Android（以及 iOS）保持一致，
    預設支援 edge-to-edge，因此
    **請在作業系統移除退出選項前完成 edge-to-edge 模式的遷移**。

[edge-to-edge mode]: {{site.android-dev}}/develop/ui/views/layout/edge-to-edge
[Android 15 release notes]: {{site.android-dev}}/about/versions/15/behavior-changes-15#edge-to-edge
[Android 16 release notes]: {{site.android-dev}}/about/versions/16/behavior-changes-16#edge-to-edge
[`SystemChrome.setEnabledSystemUIMode`]: {{site.api}}/flutter/services/SystemChrome/setEnabledSystemUIMode.html

## 遷移指南

若要在 SDK 15 上選擇退出 edge-to-edge，請在每個需要的 activity 中指定新的 style 屬性。
如果你有父層 style，且子 style 也需要選擇退出，
你可以只修改父層 style。
以下範例中，
請更新由 `flutter create` 產生的 style 設定。

預設情況下，Flutter 應用程式所使用的 style 設定於
Android manifest 檔案（`your_app/android/app/src/main/AndroidManifest.xml`）中。
一般來說，style 以 `@style` 表示，並協助主題化你的應用程式。
請在 manifest 檔案中修改這些預設 style：

```xml title="AndroidManifest.xml" highlightLines=5-8
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application ...>
        <activity ...>
            <!-- Style to modify: -->
            <meta-data
              android:name="io.flutter.embedding.android.NormalTheme"
              android:resource="@style/NormalTheme"
            />
        </activity>
    </application>
</manifest>
```

在以下位置找到樣式（style）定義：
`your_app/android/app/src/main/res/values/styles.xml`。

在適當的樣式中新增以下屬性：

```xml title="styles.xml" highlightLines=6,12
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="LaunchTheme" parent="@android:style/Theme.Light.NoTitleBar">
        ...
        <!-- Add the following line: -->
        <item name="android:windowOptOutEdgeToEdgeEnforcement">true</item>
    </style>
    ...
    <style name="NormalTheme" parent="@android:style/Theme.Light.NoTitleBar">
        ...
	      <!-- Add the following line: -->
        <item name="android:windowOptOutEdgeToEdgeEnforcement">true</item>
    </style>
</resources>
```

請確保在夜間模式樣式檔案中也套用相同的變更：
`your_app/android/app/src/main/res/values-night/styles.xml`。

請確保這兩個檔案中的樣式都已一致更新。

這個修改後的樣式會讓你的應用程式在
目標為 Android SDK 15 的應用程式中，不再啟用 edge-to-edge。
這樣就完成了！

## 時程表

從 Flutter 3.27 開始，Flutter 應用程式預設會以 Android 15 為目標，
因此如果你希望使用這個版本，且不想手動將
Flutter 應用程式的目標 SDK 版本設為較低版本，
請依照前述的[遷移步驟](#遷移指南)操作，
以維持未設定或非 edge-to-edge 的 `SystemUiMode`。

納入版本：3.26.0-0.0.pre<br>
穩定版發佈：3.27

## 參考資料

* [支援的 Flutter `SystemUiMode`][The supported Flutter `SystemUiMode`s]
* [Android 15 edge-to-edge 行為變更指南][The Android 15 edge-to-edge behavior changes guide]
* [Android 16 edge-to-edge 行為變更指南][The Android 16 edge-to-edge behavior changes guide]

[The supported Flutter `SystemUiMode`s]: {{site.api}}/flutter/services/SystemUiMode.html
[The Android 15 edge-to-edge behavior changes guide]: {{site.android-dev}}/about/versions/15/behavior-changes-15#edge-to-edge
[The Android 16 edge-to-edge behavior changes guide]: {{site.android-dev}}/about/versions/16/behavior-changes-16#edge-to-edge
[flutter#169810]: https://github.com/flutter/flutter/issues/169810
