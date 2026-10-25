# 將 `SystemUiMode` 的預設值設為 edge-to-edge

> 預設情況下，目標為 Android SDK 15+ 的應用程式將自動啟用 edge-to-edge 模式。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

Edge-to-edge 模式是 Android 15 及以上版本的預設顯示行為。
在 Android 15 中，你可以選擇退出此行為，但自 Android 16 起便無法退出。
若要了解此變更的更多資訊，
請參閱 [Android 16 發行說明][Android 16 release notes]。

[Android 16 release notes]: https://developer.android.com/about/versions/16/behavior-changes-16#edge-to-edge

## Android 16（或更新版本）

在 Android 16 或更新版本上使用退出 edge-to-edge 的機制
可能會導致應用程式崩潰，但你可以透過使用特定版本的資源來避免此問題；
詳情請參閱[遷移指南](#遷移指南)。

若要了解如何規劃應用程式結構以避免此問題，
建議你閱讀 LeanCode 的文章：[Mastering Edge-To-Edge in Flutter:
A Deep Dive Into the System Navigation Bar in Android][article]。
你也可以在 GitHub 的 [Issue 168635][] 中找到更多討論。

[article]: https://leancode.co/blog/mastering-edge-to-edge-in-flutter
[Issue 168635]: https://github.com/flutter/flutter/issues/168635#issuecomment-3485274018

## Android 15（及以下版本）

如果你的 Flutter 應用程式目標為 Android SDK 版本 15，
你的應用程式將自動以 edge-to-edge 模式顯示，
詳見 [`SystemUiMode`][] API 文件頁面。
若要維持非 edge-to-edge 的應用程式行為
（包括未設定 `SystemUiMode`），
請依照[遷移指南](#遷移指南)進行。

[`SystemUiMode`]: https://api.flutter.dev/flutter/services/SystemUiMode.html

## 背景說明

預設情況下，Android 會對所有目標為 Android 15 或以上的應用程式強制啟用 [edge-to-edge 模式][edge-to-edge mode]。
若要了解此變更的更多資訊，請參閱 [Android 15 發行說明][Android 15 release notes]。
這會影響運行於 Android SDK 15+ 或 API 35+ 的裝置。

在 Flutter 3.27 之前，Flutter 應用程式預設目標為 Android 14，
不會自動啟用 edge-to-edge 模式，但
當你選擇將應用程式目標設為 Android 15 時，_仍然_會受到影響。
如果你的應用程式目標為 `flutter.targetSdkVersion`（預設即如此），
那麼從 Flutter 3.27 開始就會以 Android 15 為目標，
並自動啟用 edge-to-edge 模式。

如果你的應用程式已明確設定 `SystemUiMode.edgeToEdge`，
並透過呼叫 [`SystemChrome.setEnabledSystemUIMode`][] 以 edge-to-edge 模式運行，
那麼你的應用程式已完成遷移。需要更多時間遷移至 edge-to-edge 模式的應用程式，
必須依照下列步驟，在運行 Android SDK 15 的裝置上選擇退出。

請注意下列事項：

 1. Android 計劃僅暫時提供此處所述的解決方法。
 2. Flutter 計劃在今年內與 Android（以及 iOS）保持一致，
    預設支援 edge-to-edge，因此
    **請在作業系統移除退出選項前完成 edge-to-edge 模式的遷移**。

[edge-to-edge mode]: https://developer.android.com/develop/ui/views/layout/edge-to-edge
[Android 15 release notes]: https://developer.android.com/about/versions/15/behavior-changes-15#edge-to-edge
[`SystemChrome.setEnabledSystemUIMode`]: https://api.flutter.dev/flutter/services/SystemChrome/setEnabledSystemUIMode.html

## 遷移指南

若要在 SDK 15 上選擇退出 edge-to-edge，
請在每個需要的 activity 中指定新的 style 屬性。
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
目標為 Android SDK 15 的情況下退出 edge-to-edge 模式。

:::note
如果你的應用程式運行於 Android 16 或以上版本，為避免崩潰，你可以
建立 `your_app/android/app/src/main/res/values-35` 資源目錄，
其中包含不含 `android:windowOptOutEdgeToEdgeEnforcement` 屬性的樣式。
:::

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

[The supported Flutter `SystemUiMode`s]: https://api.flutter.dev/flutter/services/SystemUiMode.html
[The Android 15 edge-to-edge behavior changes guide]: https://developer.android.com/about/versions/15/behavior-changes-15#edge-to-edge
[The Android 16 edge-to-edge behavior changes guide]: https://developer.android.com/about/versions/16/behavior-changes-16#edge-to-edge
[flutter#169810]: https://github.com/flutter/flutter/issues/169810

