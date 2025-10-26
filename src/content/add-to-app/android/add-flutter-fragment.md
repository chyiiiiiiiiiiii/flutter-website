---
title: 將 Flutter Fragment 加入 Android 應用程式
shortTitle: 加入 Flutter Fragment
description: 學習如何將 Flutter Fragment 加入現有的 Android 應用程式。
---

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-fragment/add-flutter-fragment_header.png' alt="Add Flutter Fragment Header">

本指南說明如何將 Flutter `Fragment` 加入現有的 Android 應用程式。在 Android 中，[`Fragment`][`Fragment`] 代表一個大型 UI 的模組化元件。`Fragment` 可以用來呈現滑動抽屜、分頁內容、`ViewPager` 中的某一頁，或僅僅代表單一`Activity`應用程式中的一般螢幕。Flutter 提供了 [`FlutterFragment`][`FlutterFragment`]，讓開發者能在任何可使用一般 `Fragment` 的地方呈現 Flutter 體驗。

如果 `Activity` 同樣適合你的應用需求，建議[改用 `FlutterActivity`][using a `FlutterActivity`]，它比`FlutterFragment`更快速且容易使用。

`FlutterFragment` 讓開發者可以控制 `Fragment` 中 Flutter 體驗的下列細節：

 * 初始 Flutter 路由
 * 要執行的 Dart entrypoint
 * 不透明或半透明背景
 * `FlutterFragment` 是否應該控制其周圍的 `Activity`
 * 應該使用新的 [`FlutterEngine`][`FlutterEngine`] 還是已快取的 `FlutterEngine`

`FlutterFragment` 也包含多個必須從其周圍 `Activity` 轉發的呼叫。這些呼叫讓 Flutter 能正確回應作業系統事件。

本指南將說明所有 `FlutterFragment` 的變化型及其需求。

## 以新的 `FlutterEngine` 將 `FlutterFragment` 加入 `Activity`

要使用 `FlutterFragment`，第一步是將其加入主機 `Activity`。

若要將 `FlutterFragment` 加入主機 `Activity`，請在 `Activity` 的 `onCreate()` 中建立並附加 `FlutterFragment` 的實例，或在你應用程式適合的其他時機進行：

{% tabs "android-language" %}
{% tab "Kotlin" %}

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

{% endtab %}
{% tab "Java" %}

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

{% endtab %}
{% endtabs %}

前述程式碼已足以渲染一個 Flutter UI，該 UI 會從呼叫你的 `main()` Dart 進入點（entrypoint）開始，初始的 Flutter 路由為 `/`，並建立一個新的 `FlutterEngine`。  
然而，這段程式碼尚不足以實現所有預期的 Flutter 行為。Flutter 依賴於多種作業系統（OS）訊號，這些訊號必須從你的主機 `Activity` 傳遞給 `FlutterFragment`。  
這些呼叫方式如下例所示：

{% tabs "android-language" %}
{% tab "Kotlin" %}

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

{% endtab %}
{% tab "Java" %}

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

{% endtab %}
{% endtabs %}

當作業系統訊號已正確轉發給 Flutter，
你的 `FlutterFragment` 就能如預期運作。
你現在已經將 `FlutterFragment` 加入到現有的 Android 應用程式中。

最簡單的整合方式是使用新的 `FlutterEngine`，
但這會帶來較長的初始化時間，
導致在 Flutter 第一次初始化並渲染之前，
畫面會顯示為空白。
大部分的這段時間延遲可以透過使用
快取且預先加載（pre-warmed）的 `FlutterEngine` 來避免，相關內容將於下節說明。

## 使用預先加載的 `FlutterEngine`

預設情況下，`FlutterFragment` 會自行建立一個
`FlutterEngine` 實例，這需要較長的預熱時間。
這表示使用者會在短暫時間內看到空白的 `Fragment`。
你可以透過使用已存在且預先加載的 `FlutterEngine` 實例，
來減少大部分的預熱時間。

若要在 `FlutterFragment` 中使用預先加載的 `FlutterEngine`，
請使用 `withCachedEngine()` 工廠方法來實例化 `FlutterFragment`。

{% tabs "android-language" %}
{% tab "Kotlin" %}

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

{% endtab %}
{% tab "Java" %}

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

{% endtab %}
{% endtabs %}

`FlutterFragment` 會在內部識別 [`FlutterEngineCache`][`FlutterEngineCache`]，
並根據傳遞給 `withCachedEngine()` 的 ID 取得預先加載（pre-warmed）的 `FlutterEngine`。

透過如前所示提供預先加載的 `FlutterEngine`，
您的應用程式可以盡可能快速地渲染出第一個 Flutter 畫面。

#### 使用快取引擎（cached engine）設定初始路由

{% render docs/add-to-app/android-initial-route-cached-engine.md %}

## 顯示啟動畫面（Splash Screen）

即使使用了預先加載的 `FlutterEngine`，
Flutter 內容在初次顯示時仍需等待一段時間。
為了提升使用者在這段短暫等待期間的體驗，Flutter 支援顯示啟動畫面（splash screen，也稱為「啟動畫面」），直到 Flutter 渲染出第一個畫面為止。關於如何顯示啟動畫面的詳細說明，請參閱 [splash screen guide][splash screen guide]。

## 以指定的初始路由執行 Flutter

一個 Android 應用程式可能包含多個獨立的 Flutter 體驗，
分別運行於不同的 `FlutterFragment`，並搭配不同的
`FlutterEngine`。在這些情境下，
每個 Flutter 體驗通常會以不同的初始路由（非 `/`）開始。
為了實現這個需求，`FlutterFragment` 的 `Builder`
允許您指定所需的初始路由，如下所示：

{% tabs "android-language" %}
{% tab "Kotlin" %}

```kotlin title="MyActivity.kt"
// With a new FlutterEngine.
val flutterFragment = FlutterFragment.withNewEngine()
    .initialRoute("myInitialRoute/")
    .build()
```

{% endtab %}
{% tab "Java" %}

```java title="MyActivity.java"
// With a new FlutterEngine.
FlutterFragment flutterFragment = FlutterFragment.withNewEngine()
    .initialRoute("myInitialRoute/")
    .build();
```

{% endtab %}
{% endtabs %}

:::note
`FlutterFragment` 的 initial route 屬性在使用預先加載（pre-warmed）的 `FlutterEngine` 時不會產生作用，因為預先加載的 `FlutterEngine` 已經選定了初始路由（initial route）。在預先加載 `FlutterEngine` 時，可以明確指定初始路由。
:::

## 從指定的 entrypoint 執行 Flutter

類似於變更初始路由，不同的 `FlutterFragment` 可能會希望執行不同的 Dart entrypoint。在一般的 Flutter 應用程式中，通常只有一個 Dart entrypoint：`main()`，但你也可以定義其他 entrypoint。

`FlutterFragment` 支援為指定的 Flutter 體驗明確指定要執行的 Dart entrypoint。
若要指定 entrypoint，請如以下範例建立 `FlutterFragment`：

{% tabs "android-language" %}
{% tab "Kotlin" %}

```kotlin title="MyActivity.kt"
val flutterFragment = FlutterFragment.withNewEngine()
    .dartEntrypoint("mySpecialEntrypoint")
    .build()
```

{% endtab %}
{% tab "Java" %}

```java title="MyActivity.java"
FlutterFragment flutterFragment = FlutterFragment.withNewEngine()
    .dartEntrypoint("mySpecialEntrypoint")
    .build();
```

{% endtab %}
{% endtabs %}

`FlutterFragment` 設定會執行一個名為 `mySpecialEntrypoint()` 的 Dart entrypoint。
請注意，括號 `()` 並不包含在 `dartEntrypoint` `String` 名稱中。

:::note
當使用預先加載（pre-warmed）的 `FlutterEngine` 時，`FlutterFragment` 的 Dart entrypoint 屬性將不會生效，因為預先加載的 `FlutterEngine` 已經執行過 Dart entrypoint。
在預先加載 `FlutterEngine` 時，可以明確選擇 Dart entrypoint。
:::

## 控制 `FlutterFragment` 的渲染模式

`FlutterFragment` 可以使用 `SurfaceView` 來渲染其 Flutter 內容，或是使用 `TextureView`。
預設值為 `SurfaceView`，其效能明顯優於 `TextureView`。然而，`SurfaceView` 無法在 Android `View` 階層結構中間穿插。
`SurfaceView` 必須是階層中最底層的 `View`，或是階層中最上層的 `View`。
此外，在 Android N 之前的版本中，`SurfaceView` 無法進行動畫，因為它們的版面配置與渲染無法與其他 `View` 階層同步。
如果你的應用程式有上述任一需求，則需要使用 `TextureView` 取代 `SurfaceView`。
你可以透過建構 `FlutterFragment` 並指定 `texture` `RenderMode` 來選擇 `TextureView`：

{% tabs "android-language" %}
{% tab "Kotlin" %}

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

{% endtab %}
{% tab "Java" %}

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

{% endtab %}
{% endtabs %}

使用上述設定後，產生的`FlutterFragment`會將其 UI 繪製到`TextureView`。

## 顯示具有透明度的`FlutterFragment`

預設情況下，`FlutterFragment`會以不透明的背景進行繪製，並使用`SurfaceView`。（請參閱「控制`FlutterFragment`的渲染模式」。）對於任何未被 Flutter 繪製的像素，該背景會顯示為黑色。為了效能考量，以不透明背景進行繪製是建議的渲染模式。在 Android 上以透明背景進行 Flutter 繪製會對效能產生負面影響。然而，許多設計需求會要求 Flutter 的畫面中有透明像素，讓底層的 Android UI 可以透出。因此，Flutter 支援在`FlutterFragment`中使用半透明效果。

:::note
`SurfaceView`與`TextureView`皆支援透明度。
但當`SurfaceView`被設定為透明渲染時，它會將自身定位在所有其他 Android `View`之上的較高 z-index，因此會顯示在所有其他`View`之上。這是`SurfaceView`的限制。如果你可以接受將 Flutter 畫面渲染在所有內容之上，那麼`FlutterFragment`的預設`RenderMode`為`surface`就是你應該使用的`RenderMode`。但如果你需要在 Flutter 畫面之上和之下同時顯示 Android `View`，則必須指定`RenderMode`為`texture`。
關於如何控制`FlutterFragment`的渲染模式，請參閱「控制`RenderMode`」。
:::

若要為`FlutterFragment`啟用透明度，請使用以下設定進行建立：

{% tabs "android-language" %}
{% tab "Kotlin" %}

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

{% endtab %}
{% tab "Java" %}

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

{% endtab %}
{% endtabs %}

## `FlutterFragment` 與其 `Activity` 之間的關係

有些應用程式會選擇將 `Fragment` 作為整個 Android 螢幕來使用。
在這類應用中，讓 `Fragment` 控制系統 chrome（如 Android 的狀態列、導覽列與螢幕方向）是合理的。

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-fragment/add-flutter-fragment_fullscreen.png' alt="Fullscreen Flutter">

在其他應用程式中，`Fragment` 只用來呈現部分 UI。`FlutterFragment` 可能被用來實作抽屜（drawer）內部、影片播放器或單一卡片。在這些情境下，讓 `FlutterFragment` 影響 Android 的系統 chrome 就不太合適，因為同一個 `Window` 內還有其他 UI 元素。

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-fragment/add-flutter-fragment_partial-ui.png' alt="Flutter as Partial UI">

`FlutterFragment` 提供了一個概念，協助區分何時應讓 `FlutterFragment` 控制其所屬的 `Activity`，以及何時應讓 `FlutterFragment` 僅影響自身行為。為了避免 `FlutterFragment` 將其 `Activity` 暴露給 Flutter 外掛，並防止 Flutter 控制 `Activity` 的系統 UI，請在 `FlutterFragment` 的 `Builder` 中使用 `shouldAttachEngineToActivity()` 方法，如下所示：

{% tabs "android-language" %}
{% tab "Kotlin" %}

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

{% endtab %}
{% tab "Java" %}

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

{% endtab %}
{% endtabs %}

將 `false` 傳遞給 `shouldAttachEngineToActivity()`
`Builder` 方法會防止 Flutter 與周圍的 `Activity` 互動。預設值為 `true`，
這允許 Flutter 及 Flutter 插件與周圍的 `Activity` 互動。

:::note
有些插件可能會期望或需要 `Activity` 參考。請確保你的插件中沒有任何一個需要 `Activity`
之後再停用存取權限。
:::

[`Fragment`]: {{site.android-dev}}/guide/components/fragments
[`FlutterFragment`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html
[using a `FlutterActivity`]: /add-to-app/android/add-flutter-screen
[`FlutterEngine`]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[`FlutterEngineCache`]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngineCache.html
[splash screen guide]: /platform-integration/android/splash-screen
