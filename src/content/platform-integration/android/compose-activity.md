---
title: 從你的 Flutter 應用程式啟動 Jetpack Compose Activity
shortTitle: 原生 Android 活動 (activities)
description: >-
  了解如何在 Flutter 應用程式中啟動原生 Android 活動 (activities)。
---

<?code-excerpt path-base="platform_integration/compose_activities"?>

原生 Android 活動 (activities) 允許你在 Flutter 應用程式中啟動
完全由 Android 平台執行的全螢幕 UI。
在這些畫面中，你只會撰寫 Kotlin 程式碼（雖然它們可能會
與 Dart 程式碼互相傳遞訊息），同時你也能存取
完整的原生 Android 功能。

要加入這項功能，需要對你的 Flutter 應用程式以及其內部產生的 Android 應用程式做出幾個調整。
在 Flutter 端，你需要建立一個新的
平台方法通道（platform method channel），並呼叫其 `invokeMethod` 方法。
在 Android 端，你需要註冊一個對應的原生 `MethodChannel`，
以接收來自 Dart 的訊號，然後啟動新的 activity。
請記得，所有 Flutter 應用程式（在 Android 執行時）都存在於
一個完全被 Flutter 應用程式佔用的 Android activity 之中。
因此，如你在程式碼範例中所見，原生 `MethodChannel` callback 的工作就是啟動第二個 activity。

:::note
本頁說明如何在 Flutter 應用程式中啟動原生 Android 活動 (activities)。
如果你想在 Flutter 應用程式中嵌入原生 Android 視圖，
請參考 [Hosting native Android views][Hosting native Android views]。
:::

[Hosting native Android views]: /platform-integration/android/platform-views

並非所有 Android 活動 (activities) 都使用 Jetpack Compose，
但本教學假設你希望使用 Compose。

## Dart 端的實作

在 Dart 端，請建立一個方法通道（method channel），並在
特定的使用者互動（例如點擊按鈕）時呼叫它。

<?code-excerpt "lib/launch_compose_activity_example_1.dart"?>
```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

// SECTION 1: START COPYING HERE
const platformMethodChannel = MethodChannel(
  // Note: You can change this string value, but it must match
  // the `CHANNEL` attribute in the next step.
  'com.example.flutter_android_activity',
);
// SECTION 1: END COPYING HERE

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  // SECTION 2: START COPYING HERE
  void _launchAndroidActivity() {
    platformMethodChannel.invokeMethod(
      // Note: You can change this value, but it must match
      // the `call.method` value in the next section.
      'launchActivity',

      // Note: You can pass any primitive data types you like.
      // To pass complex types, use package:pigeon to generate
      // matching Dart and Kotlin classes that share serialization logic.
      {'message': 'Hello from Flutter'},
    );
  }
  // SECTION 2: END COPYING HERE

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: const Center(child: Text('Hello World!')),
        floatingActionButton: FloatingActionButton(
          // SECTION 3: Call `_launchAndroidActivity` somewhere.
          onPressed: _launchAndroidActivity,

          // SECTION 3: End
          tooltip: 'Launch Android activity',
          child: const Icon(Icons.launch),
        ),
      ),
    );
  }
}
```

有三個重要的值，必須在你的 Dart 和 Kotlin 程式碼中保持一致：

 1. channel 名稱（在此範例中，值為 `"com.example.flutter_android_activity"`）。
 2. 方法名稱（在此範例中，值為 `"launchActivity"`）。
 3. Dart 傳遞的資料結構，以及 Kotlin 預期接收的資料結構。
    在這個案例中，資料是一個帶有單一 `"message"` 鍵的 map。


## 在 Android 端

你必須修改產生的 Android 應用程式中的 4 個檔案，以準備啟動全新的 Compose activities。

第一個需要修改的檔案是 `android/app/build.gradle`。

 1. 在現有的 `android` 區塊中新增以下內容：

    ```groovy title="android/app/build.gradle"
    android {
      // Begin adding here
      buildFeatures {
        compose true
      }
      composeOptions {
        // https://developer.android.com/jetpack/androidx/releases/compose-kotlin
        kotlinCompilerExtensionVersion = "1.4.8"
      }
      // End adding here
    }
    ```

    請造訪程式碼片段中的 [developer.android.com][developer.android.com] 連結，並依需要調整 `kotlinCompilerExtensionVersion`。
只有當你在 `flutter run` 過程中遇到錯誤，且這些錯誤告訴你機器上安裝了哪些版本時，才需要這麼做。

    [developer.android.com]: {{site.android-dev}}/jetpack/androidx/releases/compose-kotlin

2. 接下來，請在檔案底部（根層級）新增以下區塊：
 
    ```groovy title="android/app/build.gradle"
    dependencies {
        implementation("androidx.core:core-ktx:1.10.1")
        implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.6.1")
        implementation("androidx.activity:activity-compose")
        implementation(platform("androidx.compose:compose-bom:2024.06.00"))
        implementation("androidx.compose.ui:ui")
        implementation("androidx.compose.ui:ui-graphics")
        implementation("androidx.compose.ui:ui-tooling-preview")
        implementation("androidx.compose.material:material")
        implementation("androidx.compose.material3:material3")
        testImplementation("junit:junit:4.13.2")
        androidTestImplementation("androidx.test.ext:junit:1.1.5")
        androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
        androidTestImplementation(platform("androidx.compose:compose-bom:2023.08.00"))
        androidTestImplementation("androidx.compose.ui:ui-test-junit4")
        debugImplementation("androidx.compose.ui:ui-tooling")
        debugImplementation("androidx.compose.ui:ui-test-manifest")
    }
    ```

    第二個需要修改的檔案是 `android/build.gradle`。

1. 請在檔案頂部新增以下 buildscript 區塊：
 
    ```groovy title="android/build.gradle"
    buildscript {
        dependencies {
            // Replace with the latest version.
            classpath 'com.android.tools.build:gradle:8.1.1'
        }
        repositories {
            google()
            mavenCentral()
        }
    }
    ```

    第三個需要修改的檔案是
    `android/app/src/main/AndroidManifest.xml`。

 1. 在 root application 區塊中，新增以下 `<activity>` 宣告：
 
    ```xml title="android/app/src/main/AndroidManifest.xml"
    <manifest xmlns:android="http://schemas.android.com/apk/res/android">
        <application
            android:label="flutter_android_activity"
            android:name="${applicationName}"
            android:icon="@mipmap/ic_launcher">

           // START COPYING HERE
            <activity android:name=".SecondActivity" android:exported="true" android:theme="@style/LaunchTheme"></activity>
           // END COPYING HERE

           <activity android:name=".MainActivity" …></activity>
          …
    </manifest>
    ```

    第四個也是最後一個需要修改的程式碼是
    `android/app/src/main/kotlin/com/example/flutter_android_activity/MainActivity.kt`。
    在這裡，你將撰寫 Kotlin 程式碼，以實現你想要的 Android 功能。

 1. 在檔案頂部加入必要的 import：

    :::note
    如果函式庫版本有所變動，或是在撰寫自己的 Kotlin 程式碼時引入了不同的 Compose 類別，你的 import 可能會有所不同。
    請依照 IDE 的提示，加入你所需的正確 import。
    :::

    ```kotlin title="MainActivity.kt"
    package com.example.flutter_android_activity

    import android.content.Intent
    import android.os.Bundle
    import androidx.activity.ComponentActivity
    import androidx.activity.compose.setContent
    import androidx.compose.foundation.layout.Column
    import androidx.compose.foundation.layout.fillMaxSize
    import androidx.compose.material3.Button
    import androidx.compose.material3.MaterialTheme
    import androidx.compose.material3.Surface
    import androidx.compose.material3.Text
    import androidx.compose.ui.Modifier
    import androidx.core.app.ActivityCompat
    import io.flutter.embedding.android.FlutterActivity
    import io.flutter.embedding.engine.FlutterEngine
    import io.flutter.plugin.common.MethodCall
    import io.flutter.plugin.common.MethodChannel
    import io.flutter.plugins.GeneratedPluginRegistrant
    ```
 
 1. 修改產生的 `MainActivity` 類別，新增一個 `CHANNEL` 欄位以及一個 `configureFlutterEngine` 方法：
 
     ```kotlin  title="MainActivity.kt"
     class MainActivity: FlutterActivity() {
         // This value must match the `MethodChannel` name in your Dart code.
         private val CHANNEL = "com.example.flutter_android_activity"

         override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
             GeneratedPluginRegistrant.registerWith(flutterEngine)

             MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
                 call: MethodCall, result: MethodChannel.Result ->
                     when (call.method) {
                         // Note: This must match the first parameter passed to
                         // `platformMethodChannel.invokeMethod` in your Dart code.
                         "launchActivity" -> {
                             try {
                                 // Takes an object, in this case a String.
                                 val message = call.arguments
                                 val intent = Intent(this@MainActivity, SecondActivity::class.java)
                                 intent.putExtra("message", message.toString())
                                 startActivity(intent)
                             } catch (e: Exception){}
                                 result.success(true)
                             }
                             else -> {}
                     }
             }
         }
     }
     ```
 
 1. 在檔案底部新增第二個 `Activity`，這是在先前對 `AndroidManifest.xml` 所做變更中參考到的：
 
    ```kotlin  title="MainActivity.kt"
    class SecondActivity : ComponentActivity() {
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)

            setContent {
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    Column {
                        Text(text = "Second Activity")
                        // Note: This must match the shape of the data passed from your Dart code.
                        Text("" + getIntent()?.getExtras()?.getString("message"))
                        Button(onClick = {  finish() }) {
                            Text("Exit")
                        }
                    }
                }
            }
        }
    }
    ```

這些步驟說明如何從 Flutter 應用程式啟動原生 Android activity，有時這是一種簡單的方法，可以連接到特定的 Android 功能。
