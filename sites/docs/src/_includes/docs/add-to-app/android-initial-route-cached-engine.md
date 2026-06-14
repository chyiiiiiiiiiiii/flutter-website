初始路由的概念可在使用新的 `FlutterEngine` 設定 `FlutterActivity` 或 `FlutterFragment` 時使用。
然而，使用快取引擎時，`FlutterActivity` 與 `FlutterFragment` 並不提供初始路由的概念。
這是因為快取引擎預期已在執行 Dart 程式碼，這表示此時已來不及設定初始路由。

希望快取引擎以自訂初始路由啟動的開發者，可以在執行 Dart 進入點之前，設定快取的 `FlutterEngine` 使用自訂初始路由。以下範例示範如何在快取引擎中使用初始路由：

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

透過設定導航頻道的初始路由，相關聯的 `FlutterEngine` 將在初次執行 `runApp()` Dart 函式時顯示所需的路由。

在 `runApp()` 初次執行後再變更導航頻道的初始路由屬性將不會有任何效果。
希望在不同 `Activity` 與 `Fragment` 之間共用相同 `FlutterEngine` 並在這些畫面之間切換路由的開發者，需要設定方法頻道，並明確指示其 Dart 程式碼變更 `Navigator` 路由。
