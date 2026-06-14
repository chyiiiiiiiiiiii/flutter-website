---
title: 支援新的 Android 插件 API
description: 如何將使用舊 API 的插件升級以支援新 API。
---

{% render "docs/breaking-changes.md" %}

<?code-excerpt path-base="platform_integration/plugin_api_migration"?>

:::note
新插件以及所有相容於 Flutter 2（2021 年 3 月）的插件可以忽略本頁內容。
:::

:::note
如果框架偵測到您的應用程式使用了基於舊 Android API 的插件，您可能會被導向本頁。
:::

_如果您沒有撰寫或維護 Android Flutter 插件，可以跳過本頁。_

自 1.12 版本起，Android 平台已提供新的插件 API。
基於 [`PluginRegistry.Registrar`][] 的舊 API 不會立即被棄用，
但我們鼓勵您遷移至基於 [`FlutterPlugin`][] 的新 API。

新 API 相較於舊 API，能為依賴生命週期的元件提供更乾淨的存取方式。
例如，若 Flutter 尚未附加至任何 activity，[`PluginRegistry.Registrar.activity()`][] 可能會回傳 null。

換句話說，使用舊 API 的插件在將 Flutter 嵌入 Android 應用程式時，可能會產生未定義行為。
flutter.dev 團隊所提供的大多數 [Flutter 插件][Flutter plugins] 已經完成遷移。
（了解如何成為 pub.dev 上的 [verified publisher][]！）
如需使用新 API 插件的範例，請參考 [battery plus package][]。

## 升級步驟

以下說明支援新 API 的步驟：

1. 更新主要插件類別（`*Plugin.java`），使其實作 [`FlutterPlugin`][] 介面。
   對於較複雜的插件，您可以將 `FlutterPlugin` 和 `MethodCallHandler` 拆分為兩個類別。
   詳細說明如何在最新版本（v2）embedding 中存取應用程式資源，
   請參閱下一節 [基本插件][Basic plugin]。
   <br><br>
   另外，請注意插件仍需保留靜態 `registerWith()` 方法，
   以保持對未使用 v2 Android embedding 的應用程式相容。
   （詳情請參閱 [Upgrading pre 1.12 Android projects][]。）
   最簡單的做法（若可行）是將 `registerWith()` 的邏輯移至一個私有方法，
   讓 `registerWith()` 和 `onAttachedToEngine()` 都能呼叫。
   `registerWith()` 或 `onAttachedToEngine()` 只會擇一被呼叫，不會同時呼叫。
   <br><br>
   此外，您應該為插件中所有未被覆寫的 public 成員撰寫文件。
   在 add-to-app 情境下，這些類別會對開發者可見，因此需要文件說明。

1. （選用）如果您的插件需要 `Activity` 參考，也請實作 [`ActivityAware`][] 介面。

1. （選用）如果您的插件預期會在任何時間點被保留於背景 Service，
   請實作 [`ServiceAware`][] 介面。

1. 將範例應用程式的 `MainActivity.java` 更新為使用 v2 embedding 的 `FlutterActivity`。
   詳情請參閱 [Upgrading pre 1.12 Android projects][]。
   如果您的插件類別尚未有公開建構子，您可能需要新增。例如：

   ```java title="MainActivity.java"
    package io.flutter.plugins.firebasecoreexample;

    import io.flutter.embedding.android.FlutterActivity;
    import io.flutter.embedding.engine.FlutterEngine;
    import io.flutter.plugins.firebase.core.FirebaseCorePlugin;

    public class MainActivity extends FlutterActivity {
      // You can keep this empty class or remove it. Plugins on the new embedding
      // now automatically registers plugins.
    }
    ```

1. （選用）如果你已經移除 `MainActivity.java`，請更新
   `<plugin_name>/example/android/app/src/main/AndroidManifest.xml`
   以使用 `io.flutter.embedding.android.FlutterActivity`。
   例如：

    ```xml title="AndroidManifest.xml"
     <activity android:name="io.flutter.embedding.android.FlutterActivity"
            android:theme="@style/LaunchTheme"
   android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale"
            android:hardwareAccelerated="true"
            android:exported="true"
            android:windowSoftInputMode="adjustResize">
            <meta-data
                android:name="io.flutter.app.android.SplashScreenUntilFirstFrame"
                android:value="true" />
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    ```

1. （選用）建立一個 `EmbeddingV1Activity.java` 檔案，
   在與 `MainActivity` 相同的資料夾中，使用 v1 embedding
   來測試範例專案，
   以便持續測試 v1 embedding 與你的插件的相容性。
   請注意，你必須手動註冊所有插件，
   而不能使用 `GeneratedPluginRegistrant`。
   例如：

    ```java title="EmbeddingV1Activity.java"
    package io.flutter.plugins.batteryexample;

    import android.os.Bundle;
    import io.flutter.app.FlutterActivity;
    import io.flutter.plugins.battery.BatteryPlugin;

    public class EmbeddingV1Activity extends FlutterActivity {
      @Override
      protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        BatteryPlugin.registerWith(registrarFor("io.flutter.plugins.battery.BatteryPlugin"));
      }
    }
    ```

1.  將 `<meta-data android:name="flutterEmbedding" android:value="2"/>`
    新增到 `<plugin_name>/example/android/app/src/main/AndroidManifest.xml`。
    這會將範例應用程式設為使用 v2 embedding。

1. （選用）如果你在前一步建立了 `EmbeddingV1Activity`，
   請將 `EmbeddingV1Activity` 新增到
   `<plugin_name>/example/android/app/src/main/AndroidManifest.xml` 檔案中。
   例如：

    ```xml title="AndroidManifest.xml"
    <activity
        android:name=".EmbeddingV1Activity"
        android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale"
        android:hardwareAccelerated="true"
        android:exported="true"
        android:windowSoftInputMode="adjustResize">
    </activity>
    ```

## 測試你的插件

以下步驟將說明如何測試你的插件，我們鼓勵你進行這個步驟，但這不是必須的。

1. 更新 `<plugin_name>/example/android/app/build.gradle`，
   將對 `android.support.test` 的引用替換為 `androidx.test`：

    ```groovy title="build.gradle"
    defaultConfig {
      ...
      testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
      ...
    }
    ```

    ```groovy title="build.gradle"
    dependencies {
    ...
    androidTestImplementation 'androidx.test:runner:1.2.0'
    androidTestImplementation 'androidx.test:rules:1.2.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
    ...
    }
    ```

1. 在 `<plugin_name>/example/android/app/src/androidTest/java/<plugin_path>/` 中
   為 `MainActivity` 和 `EmbeddingV1Activity` 新增測試檔案。
   你需要自行建立這些目錄。例如：

    ```java title="MainActivityTest.java"
    package io.flutter.plugins.firebase.core;

    import androidx.test.rule.ActivityTestRule;
    import io.flutter.plugins.firebasecoreexample.MainActivity;
    import org.junit.Rule;
    import org.junit.runner.RunWith;

    @RunWith(FlutterRunner.class)
    public class MainActivityTest {
      // Replace `MainActivity` with `io.flutter.embedding.android.FlutterActivity` if you removed `MainActivity`.
      @Rule public ActivityTestRule<MainActivity> rule = new ActivityTestRule<>(MainActivity.class);
    }
    ```

    ```java title="EmbeddingV1ActivityTest.java"
    package io.flutter.plugins.firebase.core;

    import androidx.test.rule.ActivityTestRule;
    import io.flutter.plugins.firebasecoreexample.EmbeddingV1Activity;
    import org.junit.Rule;
    import org.junit.runner.RunWith;

    @RunWith(FlutterRunner.class)
    public class EmbeddingV1ActivityTest {
      @Rule
      public ActivityTestRule<EmbeddingV1Activity> rule =
          new ActivityTestRule<>(EmbeddingV1Activity.class);
    }
    ```

1. 將 `integration_test` 和 `flutter_driver` 加入到
   `<plugin_name>/pubspec.yaml` 以及
   `<plugin_name>/example/pubspec.yaml` 的 dev_dependencies 中。

    ```yaml title="pubspec.yaml"
    integration_test:
      sdk: flutter
    flutter_driver:
      sdk: flutter
    ```

1. 更新 `<plugin_name>/pubspec.yaml` 中的環境最低 Flutter 版本。
   所有未來的插件都會將最低版本設為 1.12.13+hotfix.6，
   這是我們能保證支援的最低版本。例如：

    ```yaml title="pubspec.yaml"
    environment:
      sdk: ">=2.16.1 <3.0.0"
      flutter: ">=1.17.0"
    ```

1. 在 `<plugin_name>/test/<plugin_name>_test.dart` 中建立一個簡單的測試。
   為了測試新增 v2 embedding 支援的 PR，
   我們會嘗試測試這個插件的一些非常基本的功能。
   這是一個冒煙測試（smoke test），用來確保插件能正確地向新的 embedder 註冊。
   例如：

    <?code-excerpt "lib/test.dart (test)"?>
    ```dart
    import 'package:flutter_test/flutter_test.dart';
    import 'package:integration_test/integration_test.dart';
    
    void main() {
      IntegrationTestWidgetsFlutterBinding.ensureInitialized();
    
      testWidgets('Can get battery level', (tester) async {
        final Battery battery = Battery();
        final int batteryLevel = await battery.batteryLevel;
        expect(batteryLevel, isNotNull);
      });
    }
    ```

1. 請在本機測試執行 `integration_test` 測試。在終端機中，請執行以下步驟：

    ```console
    flutter test integration_test/app_test.dart
    ```

## 基本插件 {:#basic-plugin}

若要在程式碼中開始建立 Flutter Android 插件，請先實作 `FlutterPlugin`。

```java
public class MyPlugin implements FlutterPlugin {
  @Override
  public void onAttachedToEngine(@NonNull FlutterPluginBinding binding) {
    // TODO: your plugin is now attached to a Flutter experience.
  }

  @Override
  public void onDetachedFromEngine(@NonNull FlutterPluginBinding binding) {
    // TODO: your plugin is no longer attached to a Flutter experience.
  }
}
```

如上所示，您的插件可能會（也可能不會）在任何特定時間點與某個 Flutter 體驗產生關聯。
您應該注意在 `onAttachedToEngine()` 中初始化插件的行為，
並在 `onDetachedFromEngine()` 中清理插件的參考（references）。

FlutterPluginBinding 會為您的插件提供幾個重要的參考：

**binding.getFlutterEngine()**
: 回傳插件所附加的 `FlutterEngine`，
  可用來存取像是 `DartExecutor`、`FlutterRenderer` 等元件 (Widget)。

**binding.getApplicationContext()**
: 回傳執行中 Android 應用程式的 `Context`。

## UI/Activity 插件 {:#ui-activity-plugin}

如果您的插件需要與 UI 互動，
例如請求權限或修改 Android UI chrome，
則需要額外步驟來定義您的插件。
您必須實作 `ActivityAware` 介面。

```java
public class MyPlugin implements FlutterPlugin, ActivityAware {
  //...normal plugin behavior is hidden...

  @Override
  public void onAttachedToActivity(ActivityPluginBinding activityPluginBinding) {
    // TODO: your plugin is now attached to an Activity
  }

  @Override
  public void onDetachedFromActivityForConfigChanges() {
    // TODO: the Activity your plugin was attached to was
    // destroyed to change configuration.
    // This call will be followed by onReattachedToActivityForConfigChanges().
  }

  @Override
  public void onReattachedToActivityForConfigChanges(ActivityPluginBinding activityPluginBinding) {
    // TODO: your plugin is now attached to a new Activity
    // after a configuration change.
  }

  @Override
  public void onDetachedFromActivity() {
    // TODO: your plugin is no longer associated with an Activity.
    // Clean up references.
  }
}
```

要與 `Activity` 互動，您的 `ActivityAware` 插件必須在四個階段實作相應的行為。
首先，您的插件會被附加到 `Activity`。
您可以透過所提供的 `ActivityPluginBinding` 存取該 `Activity` 以及多個回呼（callback）函式。

由於 `Activity` 在設定變更期間可能會被銷毀，
您必須在 `onDetachedFromActivityForConfigChanges()` 中清除對指定 `Activity` 的所有參考，
然後在 `onReattachedToActivityForConfigChanges()` 中重新建立這些參考。

最後，在 `onDetachedFromActivity()` 階段，
您的插件應該清除所有與 `Activity` 行為相關的參考，並回復到非 UI 的設定狀態。


[`ActivityAware`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/activity/ActivityAware.html
[Basic plugin]: #basic-plugin
[battery plus package]: {{site.github}}/fluttercommunity/plus_plugins/tree/main/packages/battery_plus/battery_plus
[Flutter plugins]: {{site.pub}}/flutter/packages
[`FlutterPlugin`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/FlutterPlugin.html
[`PluginRegistry.Registrar`]: {{site.api}}/javadoc/io/flutter/plugin/common/PluginRegistry.Registrar.html
[`PluginRegistry.Registrar.activity()`]: {{site.api}}/javadoc/io/flutter/plugin/common/PluginRegistry.Registrar.html#activity--
[`ServiceAware`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/service/ServiceAware.html
[Upgrading pre 1.12 Android projects]: {{site.repo.flutter}}/blob/main/docs/platforms/android/Upgrading-pre-1.12-Android-projects.md
[verified publisher]: {{site.dart-site}}/tools/pub/verified-publishers
