當你在設定 `FlutterActivity` 或 `FlutterFragment` 並搭配新的 `FlutterEngine` 時，可以使用初始路由 (initial route) 的概念。
然而，`FlutterActivity` 與 `FlutterFragment` 在使用快取引擎 (cached engine) 時，並不支援初始路由的設定。
這是因為快取引擎預期已經在執行 Dart 程式碼，也就是說，此時再設定初始路由已經太晚了。

如果開發者希望他們的快取引擎能以自訂的初始路由啟動，可以在執行 Dart 進入點 (Dart entrypoint) 之前，設定他們的快取 `FlutterEngine` 使用自訂的初始路由。
以下範例展示如何在快取引擎中使用初始路由：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="MyApplication.kt"
class MyApplication : Application() {
  lateinit var flutterEngine : FlutterEngine
  override fun onCreate() {
    super.onCreate()
    // Instantiate a FlutterEngine.
    flutterEngine = FlutterEngine(this)
    // Configure an initial route.
    flutterEngine.navigationChannel.setInitialRoute("your/route/here");
    // Start executing Dart code to pre-warm the FlutterEngine.
    flutterEngine.dartExecutor.executeDartEntrypoint(
      DartExecutor.DartEntrypoint.createDefault()
    )
    // Cache the FlutterEngine to be used by FlutterActivity or FlutterFragment.
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
  @Override
  public void onCreate() {
    super.onCreate();
    // Instantiate a FlutterEngine.
    flutterEngine = new FlutterEngine(this);
    // Configure an initial route.
    flutterEngine.getNavigationChannel().setInitialRoute("your/route/here");
    // Start executing Dart code to pre-warm the FlutterEngine.
    flutterEngine.getDartExecutor().executeDartEntrypoint(
      DartEntrypoint.createDefault()
    );
    // Cache the FlutterEngine to be used by FlutterActivity or FlutterFragment.
    FlutterEngineCache
      .getInstance()
      .put("my_engine_id", flutterEngine);
  }
}
```

</Tab>
</Tabs>

透過設定 navigation channel 的初始路由，相關的
`FlutterEngine` 在首次執行 `runApp()` Dart 函式時，會顯示指定的路由。

在首次執行 `runApp()` 之後，再變更 navigation channel 的初始路由屬性將不會產生任何效果。
如果開發者希望在不同的 `Activity` 和 `Fragment` 之間共用同一個 `FlutterEngine`，並在這些顯示之間切換路由，則需要建立 method channel，並明確指示 Dart 程式碼切換 `Navigator` 路由。
