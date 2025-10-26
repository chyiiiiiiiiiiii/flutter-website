---
title: 為你的 Android 應用程式新增啟動畫面（Splash Screen）
shortTitle: 啟動畫面
description: 學習如何為你的 Android 應用程式新增啟動畫面（Splash Screen）。
---

<img src='/assets/images/docs/development/ui/splash-screen/android-splash-screen/splash-screens_header.png' alt="A graphic outlining the launch flow of an app including a splash screen">

## 概述

啟動畫面（Splash screen，也稱為啟動畫面或 Launch screen）在你的 Android 應用程式載入時，提供一個簡單的初始體驗。它為你的應用程式營造開場，同時讓應用程式引擎有時間載入並初始化你的應用程式。

你有幾種方式可以實作啟動畫面：

1. 你可以使用 [pub.dev][pub.dev] 上提供的套件之一。

2. 你也可以手動實作，如 [splash screen sample app][splash screen sample app] 所示。本頁其餘內容將以手動實作為主。

[pub.dev]: {{site.pub}}/packages?q=splash+screen
[splash screen sample app]: {{site.github}}/flutter/samples/tree/main/android_splash_screen

## 初始化應用程式

每個 Android 應用程式在作業系統建立應用程式程序時，都需要一些初始化時間。Android 提供了 [launch screen][launch screen] 的概念，用來在應用程式初始化時顯示 `Drawable`。

:::note
如果你的應用程式是在既有的 Android 應用程式中嵌入一個或多個 Flutter 螢幕，建議[預先啟動（pre-warming）`FlutterEngine`][pre-warming a `FlutterEngine`]，並在整個應用程式中重複使用同一個引擎，以最小化 Flutter 引擎初始化所需的等待時間。
:::

`Drawable` 是一種 Android 圖形資源。若想了解如何將 `Drawable` 新增到你的 Flutter 專案中，請參考 Android 開發者文件中的 [Import drawables into your project][drawables]（匯入 drawables 到你的專案）。

Flutter 預設的專案範本已包含啟動主題（launch theme）與啟動背景（launch background）的定義。你可以透過編輯 `styles.xml` 來自訂這些設定，在這裡你可以定義一個主題（theme），並將其 `windowBackground` 設為你希望在啟動畫面顯示的 `Drawable`。

```xml
<style name="LaunchTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowBackground">@drawable/launch_background</item>
</style>
```

此外，`styles.xml` 會定義一個 _一般主題_（normal theme），
在啟動畫面消失後套用到 `FlutterActivity`。

一般主題的背景只會在啟動畫面消失後的極短暫時間顯示，
以及在螢幕方向改變和 `Activity` 還原期間出現。

因此，建議一般主題使用實心背景色，
且該顏色應與 Flutter UI 的主要背景色相近。

```xml
<style name="NormalTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowBackground">@drawable/normal_background</item>
</style>
```

[drawables]: {{site.android-dev}}/studio/write/resource-manager#import

## 在 AndroidManifest.xml 中設定 FlutterActivity

在 `AndroidManifest.xml` 中，將 `FlutterActivity` 的 `theme` 設定為啟動畫面主題（launch theme）。接著，於指定的 `FlutterActivity` 新增一個 metadata 元素，以指示 Flutter 在適當的時機，從啟動畫面主題切換至一般主題（normal theme）。

```xml
<activity
    android:name=".MyActivity"
    android:theme="@style/LaunchTheme"
    // ...
    >
    <meta-data
        android:name="io.flutter.embedding.android.NormalTheme"
        android:resource="@style/NormalTheme"
        />
    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>
</activity>
```

現在，Android 應用程式會在初始化時顯示所需的啟動畫面。

## SplashScreen API

Android 12 引入了 [`SplashScreen`][`SplashScreen`] API。
請在您的 `styles.xml` 檔案中使用 `SplashScreen` API。
例如：

```xml
<style name="LaunchTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowSplashScreenBackground">@color/bgColor</item>
    <item name="android:windowSplashScreenAnimatedIcon">@drawable/launch_background</item>
</style>
```

:::note
如果您的 Android 應用程式同時支援 Android 12 之前 _以及_ Android 12 之後的版本，建議在您的 `styles.xml` 檔案中使用兩個不同的資源。此外，請確保您的背景圖片符合圖示設計指引。欲了解更多資訊，請參閱 [Android Splash Screens][Android Splash Screens]。
:::

[Android Splash Screens]: https://developer.android.com/develop/ui/views/launch/splash-screen
[`SplashScreen`]: https://developer.android.com/reference/android/window/SplashScreen

有些應用程式可能希望在 Flutter 中繼續顯示 Android 啟動畫面的最後一幀。例如，這樣可以在 Dart 進行額外載入時，維持單一畫面的視覺連貫性。為達成此目的，下列 Android API 可能會有所幫助：

{% tabs "android-language" %}
{% tab "Kotlin" %}

```kotlin title="MainActivity.kt"
import android.os.Build
import android.os.Bundle
import androidx.core.view.WindowCompat
import io.flutter.embedding.android.FlutterActivity

class MainActivity : FlutterActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    // Aligns the Flutter view vertically with the window.
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false)

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      // Disable the Android splash screen fade out animation to avoid
      // a flicker before the similar frame is drawn in Flutter.
      splashScreen.setOnExitAnimationListener { splashScreenView -> splashScreenView.remove() }
    }

    super.onCreate(savedInstanceState)
  }
}
```

{% endtab %}
{% tab "Java" %}

```java title="MainActivity.java"
import android.os.Build;
import android.os.Bundle;
import android.window.SplashScreenView;
import androidx.core.view.WindowCompat;
import io.flutter.embedding.android.FlutterActivity;

public class MainActivity extends FlutterActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Aligns the Flutter view vertically with the window.
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            // Disable the Android splash screen fade out animation to avoid
            // a flicker before the similar frame is drawn in Flutter.
            getSplashScreen()
                .setOnExitAnimationListener(
                    (SplashScreenView splashScreenView) -> {
                        splashScreenView.remove();
                    });
        }

        super.onCreate(savedInstanceState);
    }
}
```

{% endtab %}
{% endtabs %}

接著，你可以在 Flutter 中重新實作第一個畫面，讓你的 Android 啟動畫面（launch screen）元素顯示在螢幕上的相同位置。
如需範例，請參考 [splash screen sample app][splash screen sample app]。

[launch screen]: {{site.android-dev}}/topic/performance/vitals/launch-time#themed
[pre-warming a `FlutterEngine`]: /add-to-app/android/add-flutter-fragment#using-a-pre-warmed-flutterengine
