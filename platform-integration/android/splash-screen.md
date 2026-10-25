# 為你的 Android 應用程式新增啟動畫面（Splash Screen）

> 學習如何為你的 Android 應用程式新增啟動畫面。



<img src='/assets/images/docs/development/ui/splash-screen/android-splash-screen/splash-screens_header.png' alt="A graphic outlining the launch flow of an app including a splash screen">

## 概覽

啟動畫面（Splash screen，也稱為啟動畫面）在你的 Android 應用程式載入時，提供一個簡單的初始體驗。它為你的應用程式營造開場氛圍，同時讓應用程式引擎有時間載入並初始化你的應用程式。

你有幾種方式可以實作啟動畫面：

1. 你可以使用 [pub.dev][pub.dev] 上提供的套件之一。

2. 你也可以像 [splash screen sample app][splash screen sample app] 範例中那樣手動實作。本頁後續將以手動實作為前提進行說明。

[pub.dev]: https://pub.dev/packages?q=splash+screen
[splash screen sample app]: https://github.com/flutter/samples/tree/main/android_splash_screen

## 初始化應用程式

每個 Android 應用程式在作業系統建立應用程式程序時，都需要一段初始化時間。Android 提供了 [launch screen][launch screen]（啟動畫面）的概念，可以在應用程式初始化期間顯示 `Drawable`。

:::note
如果你的應用程式是在既有 Android 應用中嵌入一個或多個 Flutter 螢幕，建議考慮[預先啟動 `FlutterEngine`][pre-warming a `FlutterEngine`]，並在整個應用程式中重複使用同一個引擎，以減少 Flutter 引擎初始化所需的等待時間。
:::

`Drawable` 是一種 Android 圖形資源。若想了解如何將 `Drawable` 新增至你的 Flutter 專案（在 Android Studio 中），請參考 Android 開發人員文件中的 [Import drawables into your project][drawables][drawables]。

Flutter 預設的專案範本已包含啟動主題與啟動背景的定義。你可以透過編輯 `styles.xml` 來自訂這些內容，在這裡你可以定義一個主題，並將其 `windowBackground` 設定為應顯示為啟動畫面的 `Drawable`。

```xml
<style name="LaunchTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowBackground">@drawable/launch_background</item>
</style>
```

此外，`styles.xml` 會定義一個 _normal theme_（一般主題），在啟動畫面結束後套用到 `FlutterActivity`。

一般主題的背景只會在啟動畫面（splash screen）消失後的極短暫時刻顯示，以及螢幕方向改變和 `Activity` 恢復期間顯示。

因此，建議一般主題使用與 Flutter UI 主要背景色相近的純色背景。

```xml
<style name="NormalTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowBackground">@drawable/normal_background</item>
</style>
```

[drawables]: https://developer.android.com/studio/write/resource-manager#import

## 在 AndroidManifest.xml 中設定 FlutterActivity

在 `AndroidManifest.xml` 中，將 `FlutterActivity` 的 `theme` 設定為啟動畫面主題（launch theme）。然後，在指定的 `FlutterActivity` 中新增一個 metadata 元素，以指示 Flutter 在適當的時機，從啟動畫面主題切換到一般主題（normal theme）。

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

現在 Android 應用程式會在初始化期間顯示預期的啟動畫面。

## SplashScreen API

Android 12 引入了 [`SplashScreen`][`SplashScreen`] API。
請在你的 `styles.xml` 檔案中使用 `SplashScreen` API。
例如：

```xml
<style name="LaunchTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowSplashScreenBackground">@color/bgColor</item>
    <item name="android:windowSplashScreenAnimatedIcon">@drawable/launch_background</item>
</style>
```

:::note
如果你的 Android 應用程式同時支援 Android 12 之前的版本 _以及_ Android 12 之後的版本，建議在你的 `styles.xml` 檔案中使用兩個不同的資源。另外，請確保你的背景圖片符合圖示設計指引。欲了解更多資訊，請參閱 [Android Splash Screens][Android Splash Screens]。
:::

[Android Splash Screens]: https://developer.android.com/develop/ui/views/launch/splash-screen
[`SplashScreen`]: https://developer.android.com/reference/android/window/SplashScreen

有些應用程式可能希望在 Flutter 中持續顯示 Android 啟動畫面的最後一幀。例如，這樣可以在 Dart 進行額外載入時，維持單一畫面的視覺連貫性。為了達成此目的，下列 Android API 可能會有所幫助：

<Tabs key="android-language">
<Tab name="Kotlin">

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

</Tab>
<Tab name="Java">

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

</Tab>
</Tabs>

接著，你可以在 Flutter 中重新實作第一個畫面，讓 Android 啟動畫面（launch screen）的元素在螢幕上的相同位置顯示。
相關範例請參考
[splash screen sample app][splash screen sample app]。

[launch screen]: https://developer.android.com/topic/performance/vitals/launch-time#themed
[pre-warming a `FlutterEngine`]: /add-to-app/android/add-flutter-fragment#using-a-pre-warmed-flutterengine

