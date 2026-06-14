# 將 Flutter Fragment 加入 Android 應用程式

> 學習如何將 Flutter Fragment 加入現有的 Android 應用程式。



<img src='/assets/images/docs/development/add-to-app/android/add-flutter-fragment/add-flutter-fragment_header.png' alt="Add Flutter Fragment Header">

本指南說明如何將 Flutter `Fragment` 加入現有的 Android 應用程式。在 Android 中，[`Fragment`][] 代表一個大型 UI 的模組化部分。`Fragment` 可用於顯示滑動抽屜、分頁內容、`ViewPager` 中的一個頁面，或僅僅代表單一 `Activity` 應用程式中的一般螢幕。Flutter 提供了 [`FlutterFragment`][]，讓開發者可以在任何可使用一般 `Fragment` 的地方呈現 Flutter 體驗。

如果 `Activity` 同樣適用於你的應用需求，建議[改用 `FlutterActivity`][using a `FlutterActivity`]，其比 `FlutterFragment` 更快速且易於使用。

`FlutterFragment` 讓開發者能夠控制 `Fragment` 中 Flutter 體驗的下列細節：

 * 初始 Flutter 路由
 * 要執行的 Dart 進入點
 * 不透明或半透明背景
 * `FlutterFragment` 是否應該控制其周圍的 `Activity`
 * 應使用新的 [`FlutterEngine`][] 還是快取的 `FlutterEngine`

`FlutterFragment` 也包含多個必須從其周圍 `Activity` 轉發的呼叫。這些呼叫讓 Flutter 能夠正確回應作業系統事件。

本指南將說明所有種類的 `FlutterFragment` 及其需求。

## 以新的 `FlutterEngine` 將 `FlutterFragment` 加入 `Activity`

要使用 `FlutterFragment`，首先需將其加入主機 `Activity`。

若要將 `FlutterFragment` 加入主機 `Activity`，請在 `Activity` 的 `onCreate()` 中，或在其他適合你應用的時機，實例化並附加 `FlutterFragment` 的實例：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="MyActivity.kt"
class MyActivity : FragmentActivity() {
  companion object {
    // Define a tag String to represent the FlutterFragment within this
    // Activity's FragmentManager. This value can be whatever you'd like.
    private const val TAG_FLUTTER_FRAGMENT = "flutter_fragment"
  }

  // Declare a local variable to reference the FlutterFragment so that you
  // can forward calls to it later.
  private var flutterFragment: FlutterFragment? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // Inflate a layout that has a container for your FlutterFragment. For
    // this example, assume that a FrameLayout exists with an ID of
    // R.id.fragment_container.
    setContentView(R.layout.my_activity_layout)

    // Get a reference to the Activity's FragmentManager to add a new
    // FlutterFragment, or find an existing one.
    val fragmentManager: FragmentManager = supportFragmentManager

    // Attempt to find an existing FlutterFragment, in case this is not the
    // first time that onCreate() was run.
    flutterFragment = fragmentManager
      .findFragmentByTag(TAG_FLUTTER_FRAGMENT) as FlutterFragment?

    // Create and attach a FlutterFragment if one does not exist.
    if (flutterFragment == null) {
      var newFlutterFragment = FlutterFragment.createDefault()
      flutterFragment = newFlutterFragment
      fragmentManager
        .beginTransaction()
        .add(
          R.id.fragment_container,
          newFlutterFragment,
          TAG_FLUTTER_FRAGMENT
        )
        .commit()
    }
  }
}
```

</Tab>
<Tab name="Java">

```java title="MyActivity.java"
public class MyActivity extends FragmentActivity {
    // Define a tag String to represent the FlutterFragment within this
    // Activity's FragmentManager. This value can be whatever you'd like.
    private static final String TAG_FLUTTER_FRAGMENT = "flutter_fragment";

    // Declare a local variable to reference the FlutterFragment so that you
    // can forward calls to it later.
    private FlutterFragment flutterFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Inflate a layout that has a container for your FlutterFragment.
        // For this example, assume that a FrameLayout exists with an ID of
        // R.id.fragment_container.
        setContentView(R.layout.my_activity_layout);

        // Get a reference to the Activity's FragmentManager to add a new
        // FlutterFragment, or find an existing one.
        FragmentManager fragmentManager = getSupportFragmentManager();

        // Attempt to find an existing FlutterFragment,
        // in case this is not the first time that onCreate() was run.
        flutterFragment = (FlutterFragment) fragmentManager
            .findFragmentByTag(TAG_FLUTTER_FRAGMENT);

        // Create and attach a FlutterFragment if one does not exist.
        if (flutterFragment == null) {
            flutterFragment = FlutterFragment.createDefault();

            fragmentManager
                .beginTransaction()
                .add(
                    R.id.fragment_container,
                    flutterFragment,
                    TAG_FLUTTER_FRAGMENT
                )
                .commit();
        }
    }
}
```

</Tab>
</Tabs>

前述程式碼已足以渲染一個 Flutter UI，該 UI 會從呼叫你的 `main()` Dart 進入點開始，初始 Flutter 路由為 `/`，並建立一個新的 `FlutterEngine`。然而，這段程式碼尚不足以實現所有預期的 Flutter 行為。Flutter 依賴於各種作業系統（OS）訊號，這些訊號必須從你的主機 `Activity` 傳遞到 `FlutterFragment`。下列範例展示了這些呼叫：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="MyActivity.kt"
class MyActivity : FragmentActivity() {
  override fun onPostResume() {
    super.onPostResume()
    flutterFragment!!.onPostResume()
  }

  override fun onNewIntent(@NonNull intent: Intent) {
    flutterFragment!!.onNewIntent(intent)
  }

  override fun onBackPressed() {
    flutterFragment!!.onBackPressed()
  }

  override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<String?>,
    grantResults: IntArray
  ) {
    flutterFragment!!.onRequestPermissionsResult(
      requestCode,
      permissions,
      grantResults
    )
  }

  override fun onActivityResult(
    requestCode: Int,
    resultCode: Int,
    data: Intent?
  ) {
    super.onActivityResult(requestCode, resultCode, data)
    flutterFragment!!.onActivityResult(
      requestCode,
      resultCode,
      data
    )
  }

  override fun onUserLeaveHint() {
    flutterFragment!!.onUserLeaveHint()
  }

  override fun onTrimMemory(level: Int) {
    super.onTrimMemory(level)
    flutterFragment!!.onTrimMemory(level)
  }
}
```

</Tab>
<Tab name="Java">

```java title="MyActivity.java"
public class MyActivity extends FragmentActivity {
    @Override
    public void onPostResume() {
        super.onPostResume();
        flutterFragment.onPostResume();
    }

    @Override
    protected void onNewIntent(@NonNull Intent intent) {
        flutterFragment.onNewIntent(intent);
    }

    @Override
    public void onBackPressed() {
        flutterFragment.onBackPressed();
    }

    @Override
    public void onRequestPermissionsResult(
        int requestCode,
        @NonNull String[] permissions,
        @NonNull int[] grantResults
    ) {
        flutterFragment.onRequestPermissionsResult(
            requestCode,
            permissions,
            grantResults
        );
    }

    @Override
    public void onActivityResult(
        int requestCode,
        int resultCode,
        @Nullable Intent data
    ) {
        super.onActivityResult(requestCode, resultCode, data);
        flutterFragment.onActivityResult(
            requestCode,
            resultCode,
            data
        );
    }

    @Override
    public void onUserLeaveHint() {
        flutterFragment.onUserLeaveHint();
    }

    @Override
    public void onTrimMemory(int level) {
        super.onTrimMemory(level);
        flutterFragment.onTrimMemory(level);
    }
}
```

</Tab>
</Tabs>

當作業系統訊號已成功轉發給 Flutter 時，
你的 `FlutterFragment` 就能如預期運作。
你現在已經將 `FlutterFragment` 新增到現有的 Android 應用程式中。

最簡單的整合方式是使用一個新的 `FlutterEngine`，
但這會帶來不小的初始化時間，
導致在 Flutter 第一次初始化並渲染前，
畫面會出現空白 UI。
大部分的時間延遲可以透過使用
快取且預先啟動（pre-warmed）的 `FlutterEngine` 來避免，
相關內容將在下節說明。

## 使用預先啟動的 `FlutterEngine`

預設情況下，`FlutterFragment` 會自行建立一個
`FlutterEngine` 實例，這需要一定的啟動時間。
這表示使用者會在短暫時間內看到空白的 `Fragment`。
你可以透過使用已存在且預先啟動的 `FlutterEngine` 實例，
來減少大部分的啟動延遲。

若要在 `FlutterFragment` 中使用預先啟動的 `FlutterEngine`，
請使用 `withCachedEngine()` 工廠方法實例化 `FlutterFragment`。

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="MyApplication.kt"
// Somewhere in your app, before your FlutterFragment is needed,
// like in the Application class ...
// Instantiate a FlutterEngine.
val flutterEngine = FlutterEngine(context)

// Start executing Dart code in the FlutterEngine.
flutterEngine.getDartExecutor().executeDartEntrypoint(
    DartEntrypoint.createDefault()
)

// Cache the pre-warmed FlutterEngine to be used later by FlutterFragment.
FlutterEngineCache
  .getInstance()
  .put("my_engine_id", flutterEngine)
```

```kotlin title="MyActivity.java"
FlutterFragment.withCachedEngine("my_engine_id").build()
```

</Tab>
<Tab name="Java">

```java title="MyApplication.java"
// Somewhere in your app, before your FlutterFragment is needed,
// like in the Application class ...
// Instantiate a FlutterEngine.
FlutterEngine flutterEngine = new FlutterEngine(context);

// Start executing Dart code in the FlutterEngine.
flutterEngine.getDartExecutor().executeDartEntrypoint(
    DartEntrypoint.createDefault()
);

// Cache the pre-warmed FlutterEngine to be used later by FlutterFragment.
FlutterEngineCache
  .getInstance()
  .put("my_engine_id", flutterEngine);
```

```java title="MyActivity.java"
FlutterFragment.withCachedEngine("my_engine_id").build();
```

</Tab>
</Tabs>

`FlutterFragment` 會在內部知曉 [`FlutterEngineCache`][]，
並根據提供給 `withCachedEngine()` 的 ID 取得預先啟動（pre-warmed）的 `FlutterEngine`。

如前所示，透過提供預先啟動的 `FlutterEngine`，
你的應用程式能夠盡可能快速地渲染出
第一個 Flutter 畫面。

#### 使用快取引擎指定初始路由

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


## 顯示啟動畫面

即使使用了預先啟動的 `FlutterEngine`，
在最初顯示 Flutter 內容時仍需等待一段時間。
為了提升使用者在這段短暫等待期間的體驗，Flutter 支援顯示啟動畫面（也稱為「launch screen」），直到 Flutter
渲染出第一個畫面為止。關於如何顯示啟動畫面的詳細說明，請參閱[啟動畫面指南][splash screen guide]。

## 以指定的初始路由執行 Flutter

一個 Android 應用程式可能包含多個獨立的 Flutter 體驗，
分別運行於不同的 `FlutterFragment`，並搭配不同的
`FlutterEngine`。在這些情境下，
每個 Flutter 體驗通常會以不同的初始路由（而非 `/`）開始。
為了實現這一點，`FlutterFragment` 的 `Builder`
允許你指定所需的初始路由，如下所示：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="MyActivity.kt"
// With a new FlutterEngine.
val flutterFragment = FlutterFragment.withNewEngine()
    .initialRoute("myInitialRoute/")
    .build()
```

</Tab>
<Tab name="Java">

```java title="MyActivity.java"
// With a new FlutterEngine.
FlutterFragment flutterFragment = FlutterFragment.withNewEngine()
    .initialRoute("myInitialRoute/")
    .build();
```

</Tab>
</Tabs>

:::note
當使用預先啟動（pre-warmed）的 `FlutterEngine` 時，`FlutterFragment` 的 initial route 屬性不會產生效果，因為預先啟動的 `FlutterEngine` 已經選擇了一個初始路由。當預先啟動 `FlutterEngine` 時，可以明確指定初始路由。
:::

## 從指定的進入點執行 Flutter

與變更初始路由類似，不同的 `FlutterFragment` 可能希望執行不同的 Dart 進入點。在典型的 Flutter 應用程式中，通常只有一個 Dart 進入點：`main()`，但你也可以定義其他進入點。

`FlutterFragment` 支援指定要為特定 Flutter 體驗執行的 Dart 進入點。
若要指定進入點，請如以下方式建立 `FlutterFragment`：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="MyActivity.kt"
val flutterFragment = FlutterFragment.withNewEngine()
    .dartEntrypoint("mySpecialEntrypoint")
    .build()
```

</Tab>
<Tab name="Java">

```java title="MyActivity.java"
FlutterFragment flutterFragment = FlutterFragment.withNewEngine()
    .dartEntrypoint("mySpecialEntrypoint")
    .build();
```

</Tab>
</Tabs>

`FlutterFragment` 的設定會執行名為 `mySpecialEntrypoint()` 的 Dart 進入點。
請注意，括號 `()` 不包含在 `dartEntrypoint` `String` 名稱中。

:::note
當使用預先啟動（pre-warmed）的 `FlutterEngine` 時，`FlutterFragment` 的 Dart 進入點屬性將不會生效，因為預先啟動的 `FlutterEngine` 已經執行過 Dart 進入點。
在預先啟動 `FlutterEngine` 時，可以明確指定要執行的 Dart 進入點。
:::

## 控制 `FlutterFragment` 的渲染 (render) 模式

`FlutterFragment` 可以使用 `SurfaceView` 來渲染其 Flutter 內容，或是使用 `TextureView`。
預設值為 `SurfaceView`，其效能明顯優於 `TextureView`。然而，`SurfaceView` 無法插入在 Android `View` 階層的中間。
`SurfaceView` 必須是階層中最底層的 `View`，或是階層中最頂層的 `View`。
此外，在 Android N 之前的版本上，`SurfaceView` 無法進行動畫，因為它們的版面配置與渲染無法與其他 `View` 階層同步。
如果你的應用程式有上述任一需求，則必須使用 `TextureView` 取代 `SurfaceView`。
可透過建構帶有 `texture` `RenderMode` 的 `FlutterFragment` 來選擇 `TextureView`：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="MyActivity.kt"
// With a new FlutterEngine.
val flutterFragment = FlutterFragment.withNewEngine()
    .renderMode(FlutterView.RenderMode.texture)
    .build()

// With a cached FlutterEngine.
val flutterFragment = FlutterFragment.withCachedEngine("my_engine_id")
    .renderMode(FlutterView.RenderMode.texture)
    .build()
```

</Tab>
<Tab name="Java">

```java title="MyActivity.java"
// With a new FlutterEngine.
FlutterFragment flutterFragment = FlutterFragment.withNewEngine()
    .renderMode(FlutterView.RenderMode.texture)
    .build();

// With a cached FlutterEngine.
FlutterFragment flutterFragment = FlutterFragment.withCachedEngine("my_engine_id")
    .renderMode(FlutterView.RenderMode.texture)
    .build();
```

</Tab>
</Tabs>

使用上述設定後，產生的 `FlutterFragment` 會將其 UI 繪製到 `TextureView`。

## 顯示具有透明度的 `FlutterFragment`

預設情況下，`FlutterFragment` 會以不透明的背景進行渲染，並使用 `SurfaceView`。（請參閱「控制 `FlutterFragment` 的渲染模式」。）對於 Flutter 未繪製的像素，該背景會顯示為黑色。為了效能考量，以不透明背景進行渲染是建議的渲染模式。在 Android 上以透明方式渲染 Flutter 會對效能產生負面影響。然而，許多設計需求會要求 Flutter 畫面中的透明像素能夠顯示底層的 Android UI。為此，Flutter 支援在 `FlutterFragment` 中使用半透明效果。

:::note
`SurfaceView` 與 `TextureView` 皆支援透明度。
但當 `SurfaceView` 被設定為透明渲染時，它會自動將自己置於所有其他 Android `View` 之上的較高 z-index，也就是說它會顯示在所有其他 `View` 之上。這是 `SurfaceView` 的限制。如果你可以接受讓 Flutter 畫面顯示在所有其他內容之上，那麼 `FlutterFragment` 的預設 `RenderMode` 為 `surface` 就是你應該使用的 `RenderMode`。但如果你需要在 Flutter 畫面之上與之下同時顯示 Android `View`，則必須指定 `RenderMode` 為 `texture`。
關於如何控制 `FlutterFragment` 的渲染模式，請參閱「控制 `FlutterFragment` 的渲染模式」。
:::

若要為 `FlutterFragment` 啟用透明度，請使用以下設定進行建構：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="MyActivity.kt"
// Using a new FlutterEngine.
val flutterFragment = FlutterFragment.withNewEngine()
    .transparencyMode(FlutterView.TransparencyMode.transparent)
    .build()

// Using a cached FlutterEngine.
val flutterFragment = FlutterFragment.withCachedEngine("my_engine_id")
    .transparencyMode(FlutterView.TransparencyMode.transparent)
    .build()
```

</Tab>
<Tab name="Java">

```java title="MyActivity.java"
// Using a new FlutterEngine.
FlutterFragment flutterFragment = FlutterFragment.withNewEngine()
    .transparencyMode(FlutterView.TransparencyMode.transparent)
    .build();

// Using a cached FlutterEngine.
FlutterFragment flutterFragment = FlutterFragment.withCachedEngine("my_engine_id")
    .transparencyMode(FlutterView.TransparencyMode.transparent)
    .build();
```

</Tab>
</Tabs>

## `FlutterFragment` 與其 `Activity` 的關係

有些應用程式會將 `Fragment` 作為整個 Android 螢幕來使用。
在這類應用中，讓 `Fragment` 控制系統 chrome（如 Android 的狀態列、導覽列和螢幕方向）是合理的。

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-fragment/add-flutter-fragment_fullscreen.png' alt="Fullscreen Flutter">

在其他應用中，`Fragment` 只用來呈現 UI 的某一部分。`FlutterFragment` 可能被用來實作抽屜內部、影片播放器或單一卡片。在這些情境下，讓 `FlutterFragment` 影響 Android 的系統 chrome 就不太合適，因為同一個 `Window` 內還有其他 UI 元素。

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-fragment/add-flutter-fragment_partial-ui.png' alt="Flutter as Partial UI">

`FlutterFragment` 提供了一個概念，協助區分何時應讓 `FlutterFragment` 能夠控制其所屬的 `Activity`，以及何時 `FlutterFragment` 只應影響自身行為。為了避免 `FlutterFragment` 將其 `Activity` 暴露給 Flutter 插件，並防止 Flutter 控制 `Activity` 的系統 UI，請在 `FlutterFragment` 的 `Builder` 中使用 `shouldAttachEngineToActivity()` 方法，如下所示：

<Tabs key="android-language">
<Tab name="Kotlin">

```kotlin title="MyActivity.kt"
// Using a new FlutterEngine.
val flutterFragment = FlutterFragment.withNewEngine()
    .shouldAttachEngineToActivity(false)
    .build()

// Using a cached FlutterEngine.
val flutterFragment = FlutterFragment.withCachedEngine("my_engine_id")
    .shouldAttachEngineToActivity(false)
    .build()
```

</Tab>
<Tab name="Java">

```java title="MyActivity.java"
// Using a new FlutterEngine.
FlutterFragment flutterFragment = FlutterFragment.withNewEngine()
    .shouldAttachEngineToActivity(false)
    .build();

// Using a cached FlutterEngine.
FlutterFragment flutterFragment = FlutterFragment.withCachedEngine("my_engine_id")
    .shouldAttachEngineToActivity(false)
    .build();
```

</Tab>
</Tabs>

將 `false` 傳遞給 `shouldAttachEngineToActivity()`
`Builder` 方法會防止 Flutter 與
周圍的 `Activity` 互動。預設值為 `true`，
這允許 Flutter 及 Flutter 插件與
周圍的 `Activity` 互動。

:::note
有些插件可能會預期或需要 `Activity` 參考。
在你停用存取前，請確保你的插件都不需要 `Activity`。
:::

[`Fragment`]: https://developer.android.com/guide/components/fragments
[`FlutterFragment`]: https://api.flutter.dev/javadoc/io/flutter/embedding/android/FlutterFragment.html
[using a `FlutterActivity`]: /add-to-app/android/add-flutter-screen
[`FlutterEngine`]: https://api.flutter.dev/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[`FlutterEngineCache`]: https://api.flutter.dev/javadoc/io/flutter/embedding/engine/FlutterEngineCache.html
[splash screen guide]: /platform-integration/android/splash-screen

