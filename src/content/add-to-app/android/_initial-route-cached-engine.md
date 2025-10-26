當你使用新的 `FlutterEngine` 來設定 `FlutterActivity` 或 `FlutterFragment` 時，可以指定 initial route（初始路由）的概念。
然而，當你使用快取引擎（cached engine）時，`FlutterActivity` 和 `FlutterFragment` 並不支援 initial route（初始路由）的設定。
這是因為快取引擎預期已經在執行 Dart 程式碼，也就是說，此時再設定初始路由已經太遲了。

如果開發者希望他們的快取引擎（cached engine）能以自訂的 initial route（初始路由）啟動，可以在執行 Dart entrypoint 之前，為他們的快取 `FlutterEngine` 設定自訂的 initial route（初始路由）。
以下範例展示了如何在快取引擎（cached engine）中使用 initial route（初始路由）：

{% tabs "android-language" %}
{% tab "Kotlin" %}

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

{% endtab %}
{% tab "Java" %}

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

{% endtab %}
{% endtabs %}

透過設定 navigation channel 的 initial route，相關的 `FlutterEngine` 在首次執行 `runApp()` Dart 函式時，會顯示所需的路由（Route）。

在 `runApp()` 首次執行後，再變更 navigation channel 的 initial route 屬性將不會產生任何效果。
如果開發者希望在不同的 `Activity` 和 `Fragment` 之間重複使用同一個 `FlutterEngine`，並在這些顯示之間切換路由，則需要設置一個 method channel，並明確指示 Dart 程式碼切換 `Navigator` 路由（Route）。

