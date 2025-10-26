---
title: 在 Flutter 應用程式中使用 Platform Views 嵌入原生 Android 視圖
shortTitle: Android platform-views
description: 學習如何在 Flutter 應用程式中透過 Platform Views 嵌入原生 Android 視圖。
---

<?code-excerpt path-base="platform_integration/platform_views"?>

Platform Views 允許你在 Flutter 應用程式中嵌入原生視圖，因此你可以從 Dart 端對原生視圖進行變換、裁剪以及透明度等操作。

這讓你可以，例如，直接在 Flutter 應用程式內使用來自 Android SDK 的原生 Google Maps。

:::note
本頁說明如何在 Flutter 應用程式中嵌入你自己的原生 Android 視圖。
如果你想在 Flutter 應用程式中嵌入原生 iOS 視圖，請參考[Hosting native iOS views][Hosting native iOS views]。
如果你想在 Flutter 應用程式中嵌入原生 macOS 視圖，請參考[Hosting native macOS views][Hosting native macOS views]。
:::

[Hosting native iOS views]: /platform-integration/ios/platform-views
[Hosting native macOS views]: /platform-integration/macos/platform-views

Android 上的 Platform Views 有兩種實作方式。這兩種方式在效能與呈現品質上各有取捨。
Platform Views 需要 Android API 23 以上版本。

## [Hybrid Composition](#hybrid-composition)

Platform Views 會以原生方式進行渲染。Flutter 內容則渲染到一個 texture 上。
SurfaceFlinger 負責將 Flutter 內容與 platform views 組合顯示。

* `+` 最佳的 Android 視圖效能與呈現品質。
* `-` Flutter 效能會受到影響。
* `-` 應用程式的 FPS 會較低。
* `-` 某些可套用於 Flutter 元件 (Widgets) 的變換操作，無法套用於 platform views。

## [Texture Layer](#texturelayerhybridcomposition)（或稱 Texture Layer Hybrid Composition）

Platform Views 會被渲染到一個 texture 上。
Flutter 會繪製這些 platform views（透過該 texture）。
Flutter 內容則直接渲染到 Surface 上。

* `+` 提供良好的 Android 視圖效能
* `+` 提供最佳的 Flutter 渲染效能。
* `+` 所有變換操作皆可正確運作。
* `-` 快速捲動（例如 web view）時會有卡頓現象
* `-` SurfaceViews 在此模式下會有問題，並會被移至虛擬顯示（導致無障礙功能失效）
* `-` 除非 Flutter 被渲染到 TextureView，否則文字放大鏡功能會失效。

要在 Android 上建立 platform view，請依照下列步驟：

## Dart 端操作

在 Dart 端，建立一個 `Widget`，並加入下列其中一種 build 實作方式。

### Hybrid composition

在你的 Dart 檔案中，例如 `native_view_example.dart`，請依照下列指示操作：

1. 新增以下 import：  

   <?code-excerpt "lib/native_view_example_1.dart (import)"?>
   ```dart
   import 'package:flutter/foundation.dart';
   import 'package:flutter/gestures.dart';
   import 'package:flutter/material.dart';
   import 'package:flutter/rendering.dart';
   import 'package:flutter/services.dart';
   ```  
    
2. 實作 `build()` 方法：

   <?code-excerpt "lib/native_view_example_1.dart (hybrid-composition)"?>
   ```dart
   Widget build(BuildContext context) {
     // This is used in the platform side to register the view.
     const String viewType = '<platform-view-type>';
     // Pass parameters to the platform side.
     const Map<String, dynamic> creationParams = <String, dynamic>{};
   
     return PlatformViewLink(
       viewType: viewType,
       surfaceFactory: (context, controller) {
         return AndroidViewSurface(
           controller: controller as AndroidViewController,
           gestureRecognizers: const <Factory<OneSequenceGestureRecognizer>>{},
           hitTestBehavior: PlatformViewHitTestBehavior.opaque,
         );
       },
       onCreatePlatformView: (params) {
         return PlatformViewsService.initSurfaceAndroidView(
             id: params.id,
             viewType: viewType,
             layoutDirection: TextDirection.ltr,
             creationParams: creationParams,
             creationParamsCodec: const StandardMessageCodec(),
             onFocus: () {
               params.onFocusChanged(true);
             },
           )
           ..addOnPlatformViewCreatedListener(params.onPlatformViewCreated)
           ..create();
       },
     );
   }
   ```

如需更多資訊，請參閱以下 API 文件：

* [`PlatformViewLink`][`PlatformViewLink`]
* [`AndroidViewSurface`][`AndroidViewSurface`]
* [`PlatformViewsService`][`PlatformViewsService`]

[`AndroidViewSurface`]: {{site.api}}/flutter/widgets/AndroidViewSurface-class.html
[`PlatformViewLink`]: {{site.api}}/flutter/widgets/PlatformViewLink-class.html
[`PlatformViewsService`]: {{site.api}}/flutter/services/PlatformViewsService-class.html

### TextureLayerHybridComposition

在你的 Dart 檔案中，
例如 `native_view_example.dart`，
請依照下列步驟操作：

1. 新增以下匯入：

   <?code-excerpt "lib/native_view_example_2.dart (import)"?>
   ```dart
   import 'package:flutter/material.dart';
   import 'package:flutter/services.dart';
   ```

2. 實作 `build()` 方法：

   <?code-excerpt "lib/native_view_example_2.dart (virtual-display)"?>
   ```dart
   Widget build(BuildContext context) {
     // This is used in the platform side to register the view.
     const String viewType = '<platform-view-type>';
     // Pass parameters to the platform side.
     final Map<String, dynamic> creationParams = <String, dynamic>{};
   
     return AndroidView(
       viewType: viewType,
       layoutDirection: TextDirection.ltr,
       creationParams: creationParams,
       creationParamsCodec: const StandardMessageCodec(),
     );
   }
   ```

如需更多資訊，請參閱 API 文件：

* [`AndroidView`][`AndroidView`]

[`AndroidView`]: {{site.api}}/flutter/widgets/AndroidView-class.html

## 在平台端

在平台端，請於 Kotlin 或 Java 中使用標準的
`io.flutter.plugin.platform` 套件：

{% tabs "android-language" %}
{% tab "Kotlin" %}

在您的原生程式碼中，請實作以下內容：

擴充 `io.flutter.plugin.platform.PlatformView`
以提供對 `android.view.View` 的參考
（例如，`NativeView.kt`）：

```kotlin
package dev.flutter.example

import android.content.Context
import android.graphics.Color
import android.view.View
import android.widget.TextView
import io.flutter.plugin.platform.PlatformView

internal class NativeView(context: Context, id: Int, creationParams: Map<String?, Any?>?) : PlatformView {
    private val textView: TextView

    override fun getView(): View {
        return textView
    }

    override fun dispose() {}

    init {
        textView = TextView(context)
        textView.textSize = 72f
        textView.setBackgroundColor(Color.rgb(255, 255, 255))
        textView.text = "Rendered on a native Android view (id: $id)"
    }
}
```

建立一個 factory 類別，用來建立先前所建立的 `NativeView` 實例（例如，`NativeViewFactory.kt`）：

```kotlin
package dev.flutter.example

import android.content.Context
import io.flutter.plugin.common.StandardMessageCodec
import io.flutter.plugin.platform.PlatformView
import io.flutter.plugin.platform.PlatformViewFactory

class NativeViewFactory : PlatformViewFactory(StandardMessageCodec.INSTANCE) {
    override fun create(context: Context, viewId: Int, args: Any?): PlatformView {
        val creationParams = args as Map<String?, Any?>?
        return NativeView(context, viewId, creationParams)
    }
}
```

最後，請註冊 platform view。  
你可以在應用程式或外掛程式（plugin）中進行這個步驟。

若要在應用程式中註冊，  
請修改應用程式的 main activity  
（例如，`MainActivity.kt`）：

```kotlin
package dev.flutter.example

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine

class MainActivity : FlutterActivity() {
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        flutterEngine
                .platformViewsController
                .registry
                .registerViewFactory("<platform-view-type>", 
                                      NativeViewFactory())
    }
}
```

若要進行 plugin 註冊，
請修改該 plugin 的主類別
（例如，`PlatformViewPlugin.kt`）：

```kotlin
package dev.flutter.plugin.example

import io.flutter.embedding.engine.plugins.FlutterPlugin
import io.flutter.embedding.engine.plugins.FlutterPlugin.FlutterPluginBinding

class PlatformViewPlugin : FlutterPlugin {
    override fun onAttachedToEngine(binding: FlutterPluginBinding) {
        binding
                .platformViewRegistry
                .registerViewFactory("<platform-view-type>", NativeViewFactory())
    }

    override fun onDetachedFromEngine(binding: FlutterPluginBinding) {}
}
```

{% endtab %}
{% tab "Java" %}

在你的原生程式碼中，請實作以下內容：

繼承 `io.flutter.plugin.platform.PlatformView`
以提供對 `android.view.View` 的參考
（例如，`NativeView.java`）：

```java
package dev.flutter.example;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import io.flutter.plugin.platform.PlatformView;
import java.util.Map;

class NativeView implements PlatformView {
   @NonNull private final TextView textView;

    NativeView(@NonNull Context context, int id, @Nullable Map<String, Object> creationParams) {
        textView = new TextView(context);
        textView.setTextSize(72);
        textView.setBackgroundColor(Color.rgb(255, 255, 255));
        textView.setText("Rendered on a native Android view (id: " + id + ")");
    }

    @NonNull
    @Override
    public View getView() {
        return textView;
    }

    @Override
    public void dispose() {}
}
```

建立一個 factory 類別，用來建立先前所建立的 `NativeView` 實例
（例如，`NativeViewFactory.java`）：

```java
package dev.flutter.example;

import android.content.Context;
import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import io.flutter.plugin.common.StandardMessageCodec;
import io.flutter.plugin.platform.PlatformView;
import io.flutter.plugin.platform.PlatformViewFactory;
import java.util.Map;

class NativeViewFactory extends PlatformViewFactory {

  NativeViewFactory() {
    super(StandardMessageCodec.INSTANCE);
  }

  @NonNull
  @Override
  public PlatformView create(@NonNull Context context, int id, @Nullable Object args) {
    final Map<String, Object> creationParams = (Map<String, Object>) args;
    return new NativeView(context, id, creationParams);
  }
}
```

最後，註冊 platform view（平台視圖）。
你可以在應用程式（app）或外掛（plugin）中進行這個動作。

若要在應用程式中註冊，
請修改應用程式的主要 activity
（例如，`MainActivity.java`）：

```java
package dev.flutter.example;

import androidx.annotation.NonNull;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;

public class MainActivity extends FlutterActivity {
    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        flutterEngine
            .getPlatformViewsController()
            .getRegistry()
            .registerViewFactory("<platform-view-type>", new NativeViewFactory());
    }
}
```

若要進行 plugin 註冊，  
請修改該 plugin 的主檔案  
（例如：`PlatformViewPlugin.java`）：

```java
package dev.flutter.plugin.example;

import androidx.annotation.NonNull;
import io.flutter.embedding.engine.plugins.FlutterPlugin;

public class PlatformViewPlugin implements FlutterPlugin {
  @Override
  public void onAttachedToEngine(@NonNull FlutterPluginBinding binding) {
    binding
        .getPlatformViewRegistry()
        .registerViewFactory("<platform-view-type>", new NativeViewFactory());
  }

  @Override
  public void onDetachedFromEngine(@NonNull FlutterPluginBinding binding) {}
}
```

{% endtab %}
{% endtabs %}

如需更多資訊，請參閱以下 API 文件：

* [`FlutterPlugin`][`FlutterPlugin`]
* [`PlatformViewRegistry`][`PlatformViewRegistry`]
* [`PlatformViewFactory`][`PlatformViewFactory`]
* [`PlatformView`][`PlatformView`]

[`FlutterPlugin`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/FlutterPlugin.html
[`PlatformView`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformView.html
[`PlatformViewFactory`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformViewFactory.html
[`PlatformViewRegistry`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformViewRegistry.html

最後，請修改你的 `build.gradle` 檔案，
以要求其中一個最低版本的 Android SDK：

```kotlin
android {
    defaultConfig {
        minSdk = 19 // if using hybrid composition
        minSdk = 20 // if using virtual display.
    }
}
```
### Surface Views

在 Flutter 中處理 SurfaceView 具有一定的困難性，建議盡可能避免使用。

### 手動檢查檢視（Manual view invalidation）

某些 Android View 在其內容變更時不會自動進行無效化（invalidate）。
舉例來說，包括 `SurfaceView` 和 `SurfaceTexture` 等 View。
當你的 Platform View（平台檢視）中包含這些 View 時，你必須在它們被繪製之後（更精確地說：在 swap chain 被翻轉之後），手動使該 View 無效化。
手動檢查檢視可透過呼叫 View 或其父 View 的 `invalidate` 方法來完成。

[`AndroidViewSurface`]: {{site.api}}/flutter/widgets/AndroidViewSurface-class.html

### 已知問題

[現有 Platform View 問題](https://github.com/flutter/flutter/issues?q=is%3Aopen+is%3Aissue+label%3A%22a%3A+platform-views%22)

{% render docs/platform-view-perf.md, site: site %}

