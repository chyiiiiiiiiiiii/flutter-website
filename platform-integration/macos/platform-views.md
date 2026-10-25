# 在 Flutter 應用程式中使用 Platform Views 嵌入原生 macOS 視圖

> 學習如何透過 Platform Views 在 Flutter 應用程式中嵌入原生 macOS 視圖。



<?code-excerpt path-base="platform_integration/platform_views"?>

Platform views（平台視圖）允許你在 Flutter 應用程式中嵌入原生視圖，因此你可以從 Dart 端對原生視圖進行變換、裁剪和透明度等操作。

這讓你，例如，可以直接在 Flutter 應用程式內使用原生網頁視圖。

:::note
本頁說明如何在 Flutter 應用程式中嵌入你自己的
原生 macOS 視圖。
如果你想在 Flutter 應用程式中嵌入原生 Android 視圖，
請參閱 [Hosting native Android views][]。
如果你想在 Flutter 應用程式中嵌入原生 iOS 視圖，
請參閱 [Hosting native iOS views][]。
:::

[Hosting native Android views]: /platform-integration/android/platform-views
[Hosting native iOS views]: /platform-integration/ios/platform-views

:::version-note
截至目前版本，macOS 上的 Platform view 支援尚未完全可用。
例如，目前在 macOS 上尚未支援手勢操作。
請持續關注未來的穩定版本更新。
:::

macOS 採用 Hybrid composition（混合式組成），這表示
原生的 `NSView` 會被加入到視圖階層中。

要在 macOS 上建立 platform view，請依照以下步驟操作：

## Dart 端操作

在 Dart 端，建立一個 `Widget` 並加入 build 實作，
如以下步驟所示：

在 Dart 元件 (Widget) 檔案中，進行如下
`native_view_example.dart` 所示的修改：

 1. 加入以下 import：

    <?code-excerpt "lib/native_view_example_4.dart (import)"?>
    ```dart
    import 'package:flutter/foundation.dart';
    import 'package:flutter/services.dart';
    ```

 1. 實作一個 `build()` 方法：

    <?code-excerpt "lib/native_view_example_4.dart (macos-composition)"?>
    ```dart
    Widget build(BuildContext context) {
      // This is used in the platform side to register the view.
      const String viewType = '<platform-view-type>';
      // Pass parameters to the platform side.
      final Map<String, dynamic> creationParams = <String, dynamic>{};
    
      return AppKitView(
        viewType: viewType,
        layoutDirection: TextDirection.ltr,
        creationParams: creationParams,
        creationParamsCodec: const StandardMessageCodec(),
      );
    }
    ```

如需更多資訊，請參閱 [`AppKitView`][] API 文件。

[`AppKitView`]: https://api.flutter.dev/flutter/widgets/AppKitView-class.html

## 在平台端

實作 factory 以及 platform view（平台視圖）。
`NativeViewFactory` 會建立 platform view，而
platform view 則會提供 `NSView` 的參考。
例如，`NativeView.swift`：

```swift title="NativeView.swift"
import Cocoa
import FlutterMacOS

class NativeViewFactory: NSObject, FlutterPlatformViewFactory {
  private var messenger: FlutterBinaryMessenger

  init(messenger: FlutterBinaryMessenger) {
    self.messenger = messenger
    super.init()
  }

  func create(
    withViewIdentifier viewId: Int64,
    arguments args: Any?
  ) -> NSView {
    return NativeView(
      viewIdentifier: viewId,
      arguments: args,
      binaryMessenger: messenger)
  }

  /// Implementing this method is only necessary when
  /// the `arguments` in `createWithFrame` is not `nil`.
  public func createArgsCodec() -> (FlutterMessageCodec & NSObjectProtocol)? {
    return FlutterStandardMessageCodec.sharedInstance()
  }
}

class NativeView: NSView {

  init(
    viewIdentifier viewId: Int64,
    arguments args: Any?,
    binaryMessenger messenger: FlutterBinaryMessenger?
  ) {
    super.init(frame: CGRect(x: 0, y: 0, width: 200, height: 200))
    wantsLayer = true
    layer?.backgroundColor = NSColor.systemBlue.cgColor
    // macOS views can be created here
    createNativeView(view: self)
  }

    required init?(coder nsCoder: NSCoder) {
        super.init(coder: nsCoder)
    }

  func createNativeView(view _view: NSView) {
    let nativeLabel = NSTextField()
    nativeLabel.frame = CGRect(x: 0, y: 0, width: 180, height: 48.0)
    nativeLabel.stringValue = "Native text from macOS"
    nativeLabel.textColor = NSColor.black
    nativeLabel.font = NSFont.systemFont(ofSize: 14)
    nativeLabel.isBezeled = false
    nativeLabel.focusRingType = .none
    nativeLabel.isEditable = true
    nativeLabel.sizeToFit()
    _view.addSubview(nativeLabel)
  }
}
```

最後，註冊 platform view（平台視圖）。
這可以在應用程式或插件（plugin）中完成。

若要在應用程式中註冊，請修改 App 的 `MainFlutterWindow.swift`：

```swift title="MainFlutterWindow.swift"
import Cocoa
import FlutterMacOS

class MainFlutterWindow: NSWindow {
  override func awakeFromNib() {
    // ...

    let registrar = flutterViewController.registrar(forPlugin: "plugin-name")
    let factory = NativeViewFactory(messenger: registrar.messenger)
    registrar.register(
      factory,
      withId: "<platform-view-type>")
  }
}
```

若要註冊插件，請修改該插件的主檔案：

```swift title="Plugin.swift"
import Cocoa
import FlutterMacOS

public class Plugin: NSObject, FlutterPlugin {
  public static func register(with registrar: FlutterPluginRegistrar) {
    let factory = NativeViewFactory(messenger: registrar.messenger)
    registrar.register(factory, withId: "<platform-view-type>")
  }
}
```

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
來偵測平台，並決定要使用哪個元件（Widget）：

<?code-excerpt "lib/native_view_example_4.dart (together-widget)"?>
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

[`defaultTargetPlatform`]: https://api.flutter.dev/flutter/foundation/defaultTargetPlatform.html

## 效能

在 Flutter 中使用平台視圖（Platform views）會帶來效能上的取捨。

舉例來說，在一般的 Flutter 應用程式中，Flutter UI 會在專屬的光柵執行緒（raster thread）上進行組合。這讓 Flutter 應用程式能夠保持高速，因為這個執行緒很少被阻塞。

當平台視圖以混合組合（hybrid composition）方式渲染時，Flutter UI 仍然會從專屬的光柵執行緒進行組合，但平台視圖則會在平台執行緒（platform thread）上執行圖形操作。為了將合併後的內容進行光柵化，Flutter 會在其光柵執行緒與平台執行緒之間進行同步。因此，任何在平台執行緒上的緩慢或阻塞操作，都可能對 Flutter 的圖形效能產生負面影響。

