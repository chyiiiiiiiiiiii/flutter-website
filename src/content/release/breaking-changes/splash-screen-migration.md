---
title: 已淘汰的 Splash Screen API 遷移指南
description: 如何從 Manifest/Activity 定義的 splash screen 遷移。
---

{% render docs/breaking-changes.md %}

在 Flutter 2.5 之前，Flutter 應用程式可以透過在應用程式的 manifest 檔案（`AndroidManifest.xml`）的 metadata 中定義 splash screen，或是在其 [`FlutterActivity`][`FlutterActivity`] 內實作 [`provideSplashScreen`][`provideSplashScreen`]，或兩者皆用。這種方式會在 Android 啟動畫面顯示結束與 Flutter 繪製第一幀之間的短暫時間內顯示 splash screen。自 Flutter 2.5 起，這種做法已被淘汰。Flutter 現在會自動維持 Android 啟動畫面顯示，直到繪製出第一幀為止。

若要從自訂 splash screen 遷移為僅定義自訂啟動畫面，請依照下列步驟，根據你的應用程式在 2.5 版本之前如何定義自訂 splash screen 進行調整。

**在 [`FlutterActivity`][`FlutterActivity`] 中定義自訂 splash screen**

1. 找到你的應用程式在 `FlutterActivity` 中對 `provideSplashScreen()` 的實作，並**刪除**它。這段實作通常會將你的自訂 splash screen 建構為 `Drawable`。例如：

   ```java
   @Override
   public SplashScreen provideSplashScreen() {
       // ...
       return new DrawableSplashScreen(
           new SomeDrawable(
               ContextCompat.getDrawable(this, R.some_splash_screen)));
   }
   ```

2. 請依照下方章節的步驟，確保您的`Drawable`啟動畫面（在前述範例中為`R.some_splash_screen`）已正確設定為應用程式的自訂啟動畫面。

**在 Manifest 中定義自訂啟動畫面**

1. 找到您的應用程式`AndroidManifest.xml`檔案。
   在此檔案中，尋找`activity`元素。
   在該元素內，確認`android:theme`屬性以及定義啟動畫面的`meta-data`元素，
   並將其更新為`io.flutter.embedding.android.SplashScreenDrawable`。例如：

   ```xml
   <activity
       // ...
       android:theme="@style/SomeTheme">
     // ...
     <meta-data
         android:name="io.flutter.embedding.android.SplashScreenDrawable"
         android:resource="@drawable/some_splash_screen"
         />
   </activity>
   ```

2. 如果未指定 `android:theme` 屬性，請新增該屬性，並且[為您的應用程式啟動畫面定義啟動主題][define a launch theme]。

3. 刪除 `meta-data` 元素，因為 Flutter 已不再使用該元素，且其可能導致應用程式崩潰。

4. 在您的應用程式 `style` 資源中，找到由 `android:theme` 屬性所指定的主題定義。這個主題會指定您的應用程式啟動主題。請確保 `style` 屬性已將 `android:windowBackground` 屬性設定為您自訂的 splash screen。例如：

   ```xml
   <resources>
       <style
           name="SomeTheme"
           // ...
           >
           <!-- Show a splash screen on the activity. Automatically removed when
                Flutter draws its first frame -->
           <item name="android:windowBackground">@drawable/some_splash_screen</item>
       </style>
   </resources>
   ```

[`provideSplashScreen`]: {{site.api}}/javadoc/io/flutter/embedding/android/SplashScreenProvider.html#provideSplashScreen--  
[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html  
[define a launch theme]:  /platform-integration/android/splash-screen
