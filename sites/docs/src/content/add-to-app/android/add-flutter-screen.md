---
title: 在 Android 應用程式中加入 Flutter 螢幕
shortTitle: 加入 Flutter 螢幕
description: >
  學習如何在現有的 Android 應用程式中加入單一 Flutter 螢幕。
---

本指南說明如何在現有的 Android 應用程式中加入單一 Flutter 螢幕。Flutter 螢幕可以作為一般、不透明的螢幕加入，也可以作為可透視的半透明螢幕加入。本指南將說明這兩種方式。

## 加入一般 Flutter 螢幕

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-screen/add-single-flutter-screen_header.png' alt="Add Flutter Screen Header">

### 步驟 1：在 AndroidManifest.xml 中加入 FlutterActivity

Flutter 提供了 [`FlutterActivity`][]，可在 Android 應用程式中顯示 Flutter 體驗。和其他 [`Activity`][] 一樣，`FlutterActivity` 必須註冊在你的 `AndroidManifest.xml` 中。請在 `AndroidManifest.xml` 檔案的 `application` 標籤下方加入以下 XML：

```xml
<activity
  android:name="io.flutter.embedding.android.FlutterActivity"
  android:theme="@style/LaunchTheme"
  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize"
  />
```

`@style/LaunchTheme` 的參考可以替換為任何你想要套用到 `FlutterActivity` 的 Android 主題（theme）。
主題的選擇會決定應用於 Android 系統 chrome（如 Android 導覽列）的顏色，以及在 Flutter UI 首次渲染前，`FlutterActivity` 的背景顏色。

### 步驟 2：啟動 FlutterActivity

在你的 manifest 檔案中註冊好 `FlutterActivity` 之後，
你可以在應用程式中任何你想要的地方，加入程式碼來啟動 `FlutterActivity`。以下範例展示了
從 `OnClickListener` 啟動 `FlutterActivity` 的方式。

:::note
請確保使用以下 import：

```java
import io.flutter.embedding.android.FlutterActivity;
```
:::

<Tabs key="android-framework">
<Tab name="Jetpack Compose">

```kotlin title="ExistingActivity.kt"
MyButton(onClick = {
    startActivity(
        FlutterActivity.createDefaultIntent(this)
    )
})

@Composable
fun MyButton(onClick: () -> Unit) {
    Button(onClick = onClick) {
        Text("Launch Flutter!")
    }
}
```

</Tab>
<Tab name="Kotlin">

```kotlin title="ExistingActivity.kt"
myButton.setOnClickListener {
  startActivity(
    FlutterActivity.createDefaultIntent(this)
  )
}
```

</Tab>
<Tab name="Java">

```java title="ExistingActivity.java"
myButton.setOnClickListener(new OnClickListener() {
  @Override
  public void onClick(View v) {
    startActivity(
      FlutterActivity.createDefaultIntent(currentActivity)
    );
  }
});
```

</Tab>
</Tabs>

前述範例假設你的 Dart 進入點（entrypoint）為 `main()`，且初始的 Flutter 路由為 `/`。Dart 進入點無法透過 `Intent` 進行變更，但初始路由可以使用 `Intent` 來修改。以下範例說明如何啟動一個 `FlutterActivity`，並在 Flutter 中初始渲染自訂路由。

<Tabs key="android-framework">
<Tab name="Jetpack Compose">

```kotlin title="ExistingActivity.kt"
MyButton(onClick = {
  startActivity(
    FlutterActivity
      .withNewEngine()
      .initialRoute("/my_route")
      .build(this)
  )
})

@Composable
fun MyButton(onClick: () -> Unit) {
    Button(onClick = onClick) {
        Text("Launch Flutter!")
    }
}
```

</Tab>
<Tab name="Kotlin">

```kotlin title="ExistingActivity.kt"
myButton.setOnClickListener {
  startActivity(
    FlutterActivity
      .withNewEngine()
      .initialRoute("/my_route")
      .build(this)
  )
}
```

</Tab>
<Tab name="Java">

```java title="ExistingActivity.java"
myButton.addOnClickListener(new OnClickListener() {
  @Override
  public void onClick(View v) {
    startActivity(
      FlutterActivity
        .withNewEngine()
        .initialRoute("/my_route")
        .build(currentActivity)
      );
  }
});
```

</Tab>
</Tabs>

將 `"/my_route"` 替換為你想要的初始路由。

使用 `withNewEngine()` 工廠方法會設定一個 `FlutterActivity`，該物件會在內部自行建立一個 [`FlutterEngine`][] 實例。這樣會帶來不小的初始化時間。另一種做法是指示 `FlutterActivity` 使用預先加載並快取的 `FlutterEngine`，這樣可以將 Flutter 的初始化時間降到最低。接下來將說明這種做法。

### 步驟 3：（選用）使用快取的 FlutterEngine

每個 `FlutterActivity` 預設都會建立自己的 `FlutterEngine`。每個 `FlutterEngine` 都需要一定的預熱時間。這表示啟動標準的 `FlutterActivity` 時，在你的 Flutter 體驗顯示出來前會有短暫的延遲。為了減少這個延遲，你可以在進入 `FlutterActivity` 之前先預熱一個 `FlutterEngine`，然後直接使用這個預熱好的 `FlutterEngine`。

要預熱一個 `FlutterEngine`，請在你的應用程式中找到合適的位置來實例化 `FlutterEngine`。以下範例會在 `Application` 類別中隨機預熱一個 `FlutterEngine`：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="MyApplication.kt"
class MyApplication : Application() {
  lateinit var flutterEngine : FlutterEngine

  override fun onCreate() {
    super.onCreate()

    // Instantiate a FlutterEngine.
    flutterEngine = FlutterEngine(this)

    // Start executing Dart code to pre-warm the FlutterEngine.
    flutterEngine.dartExecutor.executeDartEntrypoint(
      DartExecutor.DartEntrypoint.createDefault()
    )

    // Cache the FlutterEngine to be used by FlutterActivity.
    FlutterEngineCache
      .getInstance()
      .put("my_engine_id", flutterEngine)
  }
}
```

</Tab>
<Tab name="Java">

```java title="MyApplication.java"
public class MyApplication extends Application {
  public FlutterEngine flutterEngine;

  @Override
  public void onCreate() {
    super.onCreate();
    // Instantiate a FlutterEngine.
    flutterEngine = new FlutterEngine(this);

    // Start executing Dart code to pre-warm the FlutterEngine.
    flutterEngine.getDartExecutor().executeDartEntrypoint(
      DartEntrypoint.createDefault()
    );

    // Cache the FlutterEngine to be used by FlutterActivity.
    FlutterEngineCache
      .getInstance()
      .put("my_engine_id", flutterEngine);
  }
}
```

</Tab>
</Tabs>

傳遞給 [`FlutterEngineCache`][] 的 ID 可以是任何你想要的值。
請確保你在任何需要使用快取 `FlutterEngine` 的 `FlutterActivity`
或 [`FlutterFragment`][] 中傳遞相同的 ID。
接下來會說明如何將 `FlutterActivity` 與已快取的 `FlutterEngine` 搭配使用。

:::note
要預先啟動（warm up）`FlutterEngine`，你必須執行 Dart
的 entrypoint。請注意，當你呼叫
`executeDartEntrypoint()` 時，
你的 Dart entrypoint 方法就會開始執行。
如果你的 Dart entrypoint 呼叫了 `runApp()`
來執行 Flutter 應用程式，那麼你的 Flutter 應用程式會像是在一個零尺寸的視窗中運作，直到這個
`FlutterEngine` 被附加到 `FlutterActivity`、
`FlutterFragment` 或 `FlutterView`。請確保你的應用程式在預熱與顯示 Flutter 內容之間的這段期間能正常運作。
:::

有了預先啟動並快取的 `FlutterEngine` 之後，你現在需要
指示你的 `FlutterActivity` 使用這個快取的
`FlutterEngine`，而不是建立新的實例。
為了達成這個目的，請使用 `FlutterActivity` 的 `withCachedEngine()`
builder：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="ExistingActivity.kt"
myButton.setOnClickListener {
  startActivity(
    FlutterActivity
      .withCachedEngine("my_engine_id")
      .build(this)
  )
}
```

</Tab>
<Tab name="Java">

```java title="ExistingActivity.java"
myButton.addOnClickListener(new OnClickListener() {
  @Override
  public void onClick(View v) {
    startActivity(
      FlutterActivity
        .withCachedEngine("my_engine_id")
        .build(currentActivity)
      );
  }
});
```

</Tab>
</Tabs>

當你使用 `withCachedEngine()` 工廠方法時，
請傳入你在快取目標 `FlutterEngine` 時所使用的相同 ID。

現在，當你啟動 `FlutterActivity` 時，
顯示 Flutter 內容的延遲會大幅減少。

:::note
當你使用已快取的 `FlutterEngine` 時，該 `FlutterEngine` 的生命週期會超過任何顯示它的
`FlutterActivity` 或 `FlutterFragment`。請注意，Dart 程式碼會在你預先加載（pre-warm）`FlutterEngine` 時立即開始執行，
並且在你的 `FlutterActivity`/`FlutterFragment` 銷毀後仍會繼續執行。若要停止執行並釋放資源，
請從 `FlutterEngineCache` 取得你的 `FlutterEngine`，並使用 `FlutterEngine.destroy()` 銷毀 `FlutterEngine`。
:::

:::note
執行時效能並不是你預先加載並快取 `FlutterEngine` 的唯一理由。
預先加載的 `FlutterEngine` 可以獨立於 `FlutterActivity` 執行 Dart 程式碼，
這讓這樣的 `FlutterEngine` 能夠隨時執行任意 Dart 程式碼。
非 UI 的應用程式邏輯，例如網路請求與資料快取，可以在 `FlutterEngine` 中執行，
也可以在 `Service` 或其他地方進行背景行為。當你使用 `FlutterEngine`
在背景中執行行為時，請務必遵守 Android 對於背景執行的所有限制。
:::

:::note
Flutter 的 debug/release 版本在效能特性上有極大差異。若要評估 Flutter 的效能，
請使用 release 版本。
:::

#### 使用已快取 engine 設定初始路由

{% render "docs/add-to-app/android-initial-route-cached-engine.md" %}

## 新增半透明的 Flutter 螢幕

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-screen/add-single-flutter-screen-transparent_header.png' alt="Add Flutter Screen With Translucency Header">

大多數全螢幕的 Flutter 體驗都是不透明的。
然而，有些應用程式希望部署看起來像模態視窗（modal）的 Flutter 螢幕，
例如對話框（dialog）或底部彈出視窗（bottom sheet）。
Flutter 原生支援半透明的 `FlutterActivity`。

若要讓你的 `FlutterActivity` 具有半透明效果，
請在建立與啟動 `FlutterActivity` 的一般流程中進行以下修改。

### 步驟 1：使用具有半透明屬性的主題

Android 要求具有半透明背景的 `Activity` 必須指定特殊的主題屬性。
請建立或更新一個 Android 主題，並加入以下屬性：

```xml
<style name="MyTheme" parent="@style/MyParentTheme">
  <item name="android:windowIsTranslucent">true</item>
</style>
```

然後，將半透明主題（translucent theme）套用到你的 `FlutterActivity`。

```xml
<activity
  android:name="io.flutter.embedding.android.FlutterActivity"
  android:theme="@style/MyTheme"
  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize"
  />
```

你的 `FlutterActivity` 現在已支援透明度（translucency）。
接下來，你需要以明確支援透明度的方式啟動你的 `FlutterActivity`。

### 步驟 2：以透明背景啟動 FlutterActivity

若要以透明背景啟動你的 `FlutterActivity`，
請將適當的 `BackgroundMode` 傳遞給 `IntentBuilder`：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="ExistingActivity.kt"
// Using a new FlutterEngine.
startActivity(
  FlutterActivity
    .withNewEngine()
    .backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.transparent)
    .build(this)
);

// Using a cached FlutterEngine.
startActivity(
  FlutterActivity
    .withCachedEngine("my_engine_id")
    .backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.transparent)
    .build(this)
);
```

</Tab>
<Tab name="Java">

```java title="ExistingActivity.java"
// Using a new FlutterEngine.
startActivity(
  FlutterActivity
    .withNewEngine()
    .backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.transparent)
    .build(context)
);

// Using a cached FlutterEngine.
startActivity(
  FlutterActivity
    .withCachedEngine("my_engine_id")
    .backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.transparent)
    .build(context)
);
```

</Tab>
</Tabs>

你現在已經擁有一個具有透明背景的 `FlutterActivity`。

:::note
請確保你的 Flutter 內容同樣包含半透明背景。如果你的 Flutter UI 繪製了一個實心背景色，則看起來你的 `FlutterActivity` 仍然是具有不透明背景的。
:::

[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html
[`Activity`]: {{site.android-dev}}/reference/android/app/Activity
[`FlutterEngine`]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[`FlutterEngineCache`]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngineCache.html
[`FlutterFragment`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html
