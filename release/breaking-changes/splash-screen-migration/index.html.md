# 已淘汰的 Splash Screen API 遷移

> 如何從 Manifest/Activity 定義的 splash screen 遷移。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


在 Flutter 2.5 之前，Flutter 應用程式可以透過在應用程式的 manifest 檔案
（`AndroidManifest.xml`）中定義 splash screen，或是在其 [`FlutterActivity`][] 中實作
[`provideSplashScreen`][]，或同時採用這兩種方式。這會在 Android 啟動畫面顯示之後、Flutter
繪製出第一個畫面之前，短暫顯示自訂的 splash screen。自 Flutter 2.5 起，這種做法已經被淘汰。
Flutter 現在會自動維持 Android 啟動畫面顯示，直到 Flutter 繪製出第一個畫面為止。

若要從自訂 splash screen 遷移至僅定義自訂啟動畫面，請依照下列步驟，根據你在 2.5 版本之前如何定義
自訂 splash screen 進行調整。

**在 [`FlutterActivity`][] 中定義自訂 splash screen**

1. 找到你的應用程式在 `FlutterActivity` 中對 `provideSplashScreen()` 的實作，並**將其刪除**。
   這段實作通常會建立你的應用程式自訂的 splash screen，並作為 `Drawable`。例如：

   ```java
   @Override
   public SplashScreen provideSplashScreen() {
       // ...
       return new DrawableSplashScreen(
           new SomeDrawable(
               ContextCompat.getDrawable(this, R.some_splash_screen)));
   }
   ```

2. 請依照下方章節的步驟，確保你的 `Drawable` 啟動畫面（在前述範例中為 `R.some_splash_screen`）
   已正確設定為應用程式的自訂啟動畫面。

**在 Manifest 中定義自訂 splash screen**

1. 找到你的應用程式的 `AndroidManifest.xml` 檔案。
   在此檔案中，找到 `activity` 元素。
   在該元素內，確認 `android:theme` 屬性以及以
   `io.flutter.embedding.android.SplashScreenDrawable` 定義 splash screen 的
   `meta-data` 元素，並進行更新。舉例如下：

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

2. 如果未指定 `android:theme` 屬性，請新增該屬性，並[為你的應用程式啟動畫面定義一個啟動主題][define a launch theme]。

3. 刪除 `meta-data` 元素，因為 Flutter 已不再使用該元素，且它可能導致應用程式崩潰。

4. 在你的應用程式 `style` 資源中，找到由 `android:theme` 屬性指定的主題定義。這個主題會指定你的
   應用程式啟動主題。請確保 `style` 屬性已使用你的自訂啟動畫面來設定 `android:windowBackground`
   屬性。例如：

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

[`provideSplashScreen`]: https://api.flutter.dev/javadoc/io/flutter/embedding/android/SplashScreenProvider.html#provideSplashScreen--
[`FlutterActivity`]: https://api.flutter.dev/javadoc/io/flutter/embedding/android/FlutterActivity.html
[define a launch theme]:  /platform-integration/android/splash-screen

