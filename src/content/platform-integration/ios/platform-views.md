---
title: 在 Flutter 應用程式中以平台視圖 (Platform Views) 托管原生 iOS 視圖
shortTitle: iOS 平台視圖
description: >-
  學習如何在 Flutter 應用程式中以平台視圖 (Platform Views) 托管原生 iOS 視圖。
---

<?code-excerpt path-base="platform_integration/platform_views"?>

平台視圖 (Platform views) 允許你在 Flutter 應用程式中嵌入原生視圖，
因此你可以從 Dart 端對原生視圖進行變換、裁剪以及調整透明度。

這讓你能夠，例如，直接在 Flutter 應用程式中
使用 Android 和 iOS SDK 提供的原生 Google Maps。

:::note
本頁說明如何在 Flutter 應用程式中托管你自己的原生 iOS 視圖。
如果你想在 Flutter 應用程式中嵌入原生 Android 視圖，
請參考 [Hosting native Android views][Hosting native Android views]。
如果你想在 Flutter 應用程式中嵌入原生 macOS 視圖，
請參考 [Hosting native macOS views][Hosting native macOS views]。
:::

[Hosting native Android views]: /platform-integration/android/platform-views
[Hosting native macOS views]: /platform-integration/macos/platform-views

iOS 僅使用 Hybrid composition（混合組合），
這表示原生的
`UIView` 會被加入到視圖階層中。

要在 iOS 上建立平台視圖，
請依照以下步驟操作：

## Dart 端

在 Dart 端，建立一個 `Widget`，
並新增建構（build）實作，
如以下步驟所示。

在 Dart 元件（Widget）檔案中，進行如 `native_view_example.dart` 所示的修改：

<ol>
<li>

新增以下匯入：

<?code-excerpt "lib/native_view_example_3.dart (import)"?>
```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
```

</li>

<li>

實作一個 `build()` 方法：

<?code-excerpt "lib/native_view_example_3.dart (ios-composition)"?>
```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  const String viewType = '<platform-view-type>';
  // Pass parameters to the platform side.
  final Map<String, dynamic> creationParams = <String, dynamic>{};

  return UiKitView(
    viewType: viewType,
    layoutDirection: TextDirection.ltr,
    creationParams: creationParams,
    creationParamsCodec: const StandardMessageCodec(),
  );
}
```

</li>
</ol>

如需更多資訊，請參閱 API 文件：
[`UIKitView`][`UIKitView`]。

[`UIKitView`]: {{site.api}}/flutter/widgets/UiKitView-class.html

## 平台端

在平台端，可以使用 Swift 或 Objective-C：

{% tabs "darwin-language" %}
{% tab "Swift" %}

實作 factory 以及平台 view。
`FLNativeViewFactory` 會建立平台 view，
而平台 view 則會提供 `UIView` 的參考。
例如，`FLNativeView.swift`：

```swift
import Flutter
import UIKit

class FLNativeViewFactory: NSObject, FlutterPlatformViewFactory {
    private var messenger: FlutterBinaryMessenger

    init(messenger: FlutterBinaryMessenger) {
        self.messenger = messenger
        super.init()
    }

    func create(
        withFrame frame: CGRect,
        viewIdentifier viewId: Int64,
        arguments args: Any?
    ) -> FlutterPlatformView {
        return FLNativeView(
            frame: frame,
            viewIdentifier: viewId,
            arguments: args,
            binaryMessenger: messenger)
    }

    /// Implementing this method is only necessary when the `arguments` in `createWithFrame` is not `nil`.
    public func createArgsCodec() -> FlutterMessageCodec & NSObjectProtocol {
          return FlutterStandardMessageCodec.sharedInstance()
    }
}

class FLNativeView: NSObject, FlutterPlatformView {
    private var _view: UIView

    init(
        frame: CGRect,
        viewIdentifier viewId: Int64,
        arguments args: Any?,
        binaryMessenger messenger: FlutterBinaryMessenger?
    ) {
        _view = UIView()
        super.init()
        // iOS views can be created here
        createNativeView(view: _view)
    }

    func view() -> UIView {
        return _view
    }

    func createNativeView(view _view: UIView){
        _view.backgroundColor = UIColor.blue
        let nativeLabel = UILabel()
        nativeLabel.text = "Native text from iOS"
        nativeLabel.textColor = UIColor.white
        nativeLabel.textAlignment = .center
        nativeLabel.frame = CGRect(x: 0, y: 0, width: 180, height: 48.0)
        _view.addSubview(nativeLabel)
    }
}
```

最後，註冊 platform view（平台視圖）。
這個步驟可以在應用程式或外掛程式（plugin）中完成。

若要在應用程式中註冊，
請修改 App 的 `AppDelegate.swift`：

```swift
import Flutter
import UIKit

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]?
    ) -> Bool {
        GeneratedPluginRegistrant.register(with: self)

        guard let pluginRegistrar = self.registrar(forPlugin: "plugin-name") else { return false }

        let factory = FLNativeViewFactory(messenger: pluginRegistrar.messenger())
        pluginRegistrar.register(
            factory,
            withId: "<platform-view-type>")
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
}
```

若要註冊 plugin，
請修改該 plugin 的主檔案
（例如：`FLPlugin.swift`）：

```swift
import Flutter
import UIKit

class FLPlugin: NSObject, FlutterPlugin {
    public static func register(with registrar: FlutterPluginRegistrar) {
        let factory = FLNativeViewFactory(messenger: registrar.messenger())
        registrar.register(factory, withId: "<platform-view-type>")
    }
}
```

{% endtab %}
{% tab "Objective-C" %}

在 Objective-C 中，請加入 factory 和 platform view 的標頭檔。
例如，如`FLNativeView.h`所示：

```objc
#import <Flutter/Flutter.h>

@interface FLNativeViewFactory : NSObject <FlutterPlatformViewFactory>
- (instancetype)initWithMessenger:(NSObject<FlutterBinaryMessenger>*)messenger;
@end

@interface FLNativeView : NSObject <FlutterPlatformView>

- (instancetype)initWithFrame:(CGRect)frame
               viewIdentifier:(int64_t)viewId
                    arguments:(id _Nullable)args
              binaryMessenger:(NSObject<FlutterBinaryMessenger>*)messenger;

- (UIView*)view;
@end
```

實作 factory 與 platform view。`FLNativeViewFactory` 負責建立 platform view，而 platform view 則提供對 `UIView` 的參考。例如，`FLNativeView.m`：

```objc
#import "FLNativeView.h"

@implementation FLNativeViewFactory {
  NSObject<FlutterBinaryMessenger>* _messenger;
}

- (instancetype)initWithMessenger:(NSObject<FlutterBinaryMessenger>*)messenger {
  self = [super init];
  if (self) {
    _messenger = messenger;
  }
  return self;
}

- (NSObject<FlutterPlatformView>*)createWithFrame:(CGRect)frame
                                   viewIdentifier:(int64_t)viewId
                                        arguments:(id _Nullable)args {
  return [[FLNativeView alloc] initWithFrame:frame
                              viewIdentifier:viewId
                                   arguments:args
                             binaryMessenger:_messenger];
}

/// Implementing this method is only necessary when the `arguments` in `createWithFrame` is not `nil`.
- (NSObject<FlutterMessageCodec>*)createArgsCodec {
    return [FlutterStandardMessageCodec sharedInstance];
}

@end

@implementation FLNativeView {
   UIView *_view;
}

- (instancetype)initWithFrame:(CGRect)frame
               viewIdentifier:(int64_t)viewId
                    arguments:(id _Nullable)args
              binaryMessenger:(NSObject<FlutterBinaryMessenger>*)messenger {
  if (self = [super init]) {
    _view = [[UIView alloc] init];
  }
  return self;
}

- (UIView*)view {
  return _view;
}

@end
```

最後，註冊 platform view（平台視圖）。
這個步驟可以在應用程式或插件中完成。

若要在應用程式中註冊，
請修改 App 的 `AppDelegate.m`：

```objc
#import "AppDelegate.h"
#import "FLNativeView.h"
#import "GeneratedPluginRegistrant.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [GeneratedPluginRegistrant registerWithRegistry:self];

   NSObject<FlutterPluginRegistrar>* registrar =
      [self registrarForPlugin:@"plugin-name"];

  FLNativeViewFactory* factory =
      [[FLNativeViewFactory alloc] initWithMessenger:registrar.messenger];

  [[self registrarForPlugin:@"<plugin-name>"] registerViewFactory:factory
                                                          withId:@"<platform-view-type>"];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

@end
```

若要註冊 plugin，請修改主要的 plugin 檔案（例如：`FLPlugin.m`）：

```objc
#import <Flutter/Flutter.h>
#import "FLNativeView.h"

@interface FLPlugin : NSObject<FlutterPlugin>
@end

@implementation FLPlugin

+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
  FLNativeViewFactory* factory =
      [[FLNativeViewFactory alloc] initWithMessenger:registrar.messenger];
  [registrar registerViewFactory:factory withId:@"<platform-view-type>"];
}

@end
```

{% endtab %}
{% endtabs %}

如需更多資訊，請參閱以下 API 文件：

* [`FlutterPlatformViewFactory`][`FlutterPlatformViewFactory`]
* [`FlutterPlatformView`][`FlutterPlatformView`]
* [`PlatformView`][`PlatformView`]

[`FlutterPlatformView`]: {{site.api}}/ios-embedder/protocol_flutter_platform_view-p.html
[`FlutterPlatformViewFactory`]: {{site.api}}/ios-embedder/protocol_flutter_platform_view_factory-p.html
[`PlatformView`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformView.html

## 綜合應用

當你在 Dart 中實作 `build()` 方法時，
可以使用 [`defaultTargetPlatform`][`defaultTargetPlatform`]
來偵測平台，並決定要使用哪個元件（Widget）：

<?code-excerpt "lib/native_view_example_3.dart (together-widget)"?>
```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  const String viewType = '<platform-view-type>';
  // Pass parameters to the platform side.
  final Map<String, dynamic> creationParams = <String, dynamic>{};

  switch (defaultTargetPlatform) {
    case TargetPlatform.android:
    // return widget on Android.
    case TargetPlatform.iOS:
    // return widget on iOS.
    case TargetPlatform.macOS:
    // return widget on macOS.
    default:
      throw UnsupportedError('Unsupported platform view');
  }
}
```

## 效能

在 Flutter 中使用平台視圖（Platform Views）會帶來效能上的權衡。

針對較複雜的情境，可以採用一些技巧來減輕效能問題。

例如，你可以在 Dart 執行動畫（Animation）時，先使用一個佔位的紋理（texture）。
換句話說，如果在渲染平台視圖時動畫運作緩慢，可以考慮先對原生視圖截圖，然後將其作為紋理來渲染。

## 組合限制

在組合 iOS 平台視圖（Platform Views）時有一些限制。

- 不支援 [`ShaderMask`][`ShaderMask`] 和 [`ColorFiltered`][`ColorFiltered`] 元件（Widgets）。
- 支援 [`BackdropFilter`][`BackdropFilter`] 元件（Widget），
  但在使用方式上有一些限制。
  詳細資訊請參閱
  [iOS Platform View Backdrop Filter Blur design doc][design-doc]。

[`ShaderMask`]: {{site.api}}/flutter/foundation/ShaderMask.html
[`ColorFiltered`]: {{site.api}}/flutter/foundation/ColorFiltered.html
[`BackdropFilter`]: {{site.api}}/flutter/foundation/BackdropFilter.html
[`defaultTargetPlatform`]: {{site.api}}/flutter/foundation/defaultTargetPlatform.html
[design-doc]: {{site.main-url}}/go/ios-platformview-backdrop-filter-blur
