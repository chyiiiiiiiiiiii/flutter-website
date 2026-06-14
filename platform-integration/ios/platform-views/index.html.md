# 在 Flutter 應用程式中以平台視圖 (platform views) 嵌入原生 iOS 視圖

> 學習如何在 Flutter 應用程式中以平台視圖 (platform views) 嵌入原生 iOS 視圖。



<?code-excerpt path-base="platform_integration/platform_views"?>

平台視圖 (platform views) 讓你可以在 Flutter 應用程式中嵌入原生視圖，
因此你可以從 Dart 對原生視圖進行轉換、裁剪與透明度等操作。

這使你能夠，例如，直接在 Flutter 應用程式中
使用來自 Android 與 iOS SDK 的原生 Google Maps。

:::note
本頁說明如何在 Flutter 應用程式中
嵌入你自己的原生 iOS 視圖。
如果你想在 Flutter 應用程式中嵌入原生 Android 視圖，
請參閱 [Hosting native Android views][]。
如果你想在 Flutter 應用程式中嵌入原生 macOS 視圖，
請參閱 [Hosting native macOS views][]。
:::

[Hosting native Android views]: /platform-integration/android/platform-views
[Hosting native macOS views]: /platform-integration/macos/platform-views


iOS 僅使用 Hybrid composition（混合組成），
這代表原生的
`UIView` 會被加入到視圖階層中。

要在 iOS 上建立平台視圖 (platform view)，
請依照以下指示操作：

## Dart 端

在 Dart 端，建立一個 `Widget`，
並加入 build 實作，
如以下步驟所示。

在 Dart 元件 (Widget) 檔案中，請進行類似於 `native_view_example.dart` 的修改：

<ol>
<li>

加入以下 import：

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
[`UIKitView`][]。

[`UIKitView`]: https://api.flutter.dev/flutter/widgets/UiKitView-class.html

## 在平台端

在平台端，可以使用 Swift 或 Objective-C：

<Tabs key="darwin-language">
<Tab name="Swift">

實作 factory 與 platform view。
`FLNativeViewFactory` 會建立 platform view，
而 platform view 則會提供 `UIView` 的參考。
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
這可以在應用程式（app）或插件（plugin）中完成。

若要在應用程式中註冊，
請修改 App 的 `AppDelegate.swift`：

```swift
import Flutter
import UIKit

@main
@objc class AppDelegate: FlutterAppDelegate, FlutterImplicitEngineDelegate {
   
    func didInitializeImplicitFlutterEngine(_ engineBridge: FlutterImplicitEngineBridge) {
        GeneratedPluginRegistrant.register(with: engineBridge.pluginRegistry)

        guard let pluginRegistrar = engineBridge.pluginRegistry.registrar(forPlugin: "plugin-name") else { return }

        let factory = FLNativeViewFactory(messenger: pluginRegistrar.messenger())
        pluginRegistrar.register(
            factory,
            withId: "<platform-view-type>")
    }
}
```

若要註冊插件，
請修改該插件的主要檔案
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

</Tab>
<Tab name="Objective-C">

在 Objective-C 中，請加入 factory 和 platform view 的標頭檔。
例如，如 `FLNativeView.h` 所示：

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

實作 factory 與 platform view。
`FLNativeViewFactory` 負責建立 platform view，
而 platform view 則會提供對 `UIView` 的參考。舉例來說，`FLNativeView.m`：

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
這可以在應用程式（app）或插件（plugin）中完成。

若要在應用程式中註冊，
請修改 App 的 `AppDelegate.m`：

```objc
#import "AppDelegate.h"
#import "FLNativeView.h"
#import "GeneratedPluginRegistrant.h"

@implementation AppDelegate

- (void)didInitializeImplicitFlutterEngine:(NSObject<FlutterImplicitEngineBridge>*)engineBridge {
  [GeneratedPluginRegistrant registerWithRegistry:engineBridge.pluginRegistry];

  NSObject<FlutterPluginRegistrar>* registrar =
      [engineBridge.pluginRegistry registrarForPlugin:@"plugin-name"];

  FLNativeViewFactory* factory =
      [[FLNativeViewFactory alloc] initWithMessenger:registrar.messenger];

  [registrar registerViewFactory:factory withId:@"<platform-view-type>"];
}

@end
```

若要註冊插件，
請修改主要的插件檔案
（例如：`FLPlugin.m`）：

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

</Tab>
</Tabs>

如需更多資訊，請參閱以下的 API 文件：

* [`FlutterPlatformViewFactory`][]
* [`FlutterPlatformView`][]
* [`PlatformView`][]

[`FlutterPlatformView`]: https://api.flutter.dev/ios-embedder/protocol_flutter_platform_view-p.html
[`FlutterPlatformViewFactory`]: https://api.flutter.dev/ios-embedder/protocol_flutter_platform_view_factory-p.html
[`PlatformView`]: https://api.flutter.dev/javadoc/io/flutter/plugin/platform/PlatformView.html

## 綜合應用

當你在 Dart 中實作 `build()` 方法時，
可以使用 [`defaultTargetPlatform`][]
來偵測平台，並決定要使用哪個元件 (Widget)：

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

在 Flutter 中使用平台視圖（Platform Views）會帶來效能上的取捨。

針對較複雜的情境，可以採用一些技巧來減輕效能問題。

例如，你可以在 Dart 執行動畫時，使用佔位紋理（placeholder texture）。
換句話說，如果在渲染平台視圖時動畫變慢，可以考慮對原生視圖進行截圖，然後將其作為紋理來渲染。

## 組合限制

在組合 iOS 平台視圖（Platform Views）時有一些限制。

- 不支援 [`ShaderMask`][] 和 [`ColorFiltered`][] 元件（Widgets）。
- 支援 [`BackdropFilter`][] 元件（Widget），
  但其使用方式有一些限制。
  詳細資訊請參考
  [iOS Platform View Backdrop Filter Blur design doc][design-doc]。

[`ShaderMask`]: https://api.flutter.dev/flutter/foundation/ShaderMask.html
[`ColorFiltered`]: https://api.flutter.dev/flutter/foundation/ColorFiltered.html
[`BackdropFilter`]: https://api.flutter.dev/flutter/foundation/BackdropFilter.html
[`defaultTargetPlatform`]: https://api.flutter.dev/flutter/foundation/defaultTargetPlatform.html
[design-doc]: https://flutter.dev/go/ios-platformview-backdrop-filter-blur

