---
title: 在 Flutter 應用程式中使用 Platform Views 承載原生 macOS 視圖
shortTitle: macOS platform-views
description: 學習如何在 Flutter 應用程式中使用 Platform Views 承載原生 macOS 視圖。
---

<?code-excerpt path-base="platform_integration/platform_views"?>

Platform views（平台視圖）允許你在 Flutter 應用程式中嵌入原生視圖，因此你可以從 Dart 對原生視圖套用轉換、裁剪和透明度等效果。

這讓你例如可以直接在 Flutter 應用程式內使用原生的網頁視圖（web views）。

:::note
本頁說明如何在 Flutter 應用程式中承載你自己的
原生 macOS 視圖。
如果你想在 Flutter 應用程式中嵌入原生 Android 視圖，
請參閱 [Hosting native Android views][Hosting native Android views]。
如果你想在 Flutter 應用程式中嵌入原生 iOS 視圖，
請參閱 [Hosting native iOS views][Hosting native iOS views]。
:::

[Hosting native Android views]: /platform-integration/android/platform-views
[Hosting native iOS views]: /platform-integration/ios/platform-views

:::version-note
目前版本下，macOS 上的 Platform view 支援尚未完全可用。
例如，macOS 尚未支援手勢操作。
請持續關注未來的穩定版本更新。
:::

macOS 採用 Hybrid composition（混合組合），這代表
原生的 `NSView` 會被加入到視圖階層中。

要在 macOS 上建立 platform view，請依照以下指示操作：

## Dart 端

在 Dart 端，建立一個 `Widget` 並新增 build 實作，
如以下步驟所示：

在 Dart 元件（Widget）檔案中，進行類似 `native_view_example.dart` 的修改：

 1. 新增以下匯入：

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

如需更多資訊，請參閱 [`AppKitView`][`AppKitView`] API 文件。

[`AppKitView`]: {{site.api}}/flutter/widgets/AppKitView-class.html

## 在平台端

實作 factory 與 platform view。
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

最後，註冊平台視圖（platform view）。
這可以在應用程式或外掛程式（plugin）中完成。

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

要註冊 plugin，請修改該 plugin 的主檔案：

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

[`defaultTargetPlatform`]: {{site.api}}/flutter/foundation/defaultTargetPlatform.html

## 效能

在 Flutter 中使用平台視圖（Platform views）會帶來效能上的取捨。

舉例來說，在一般的 Flutter 應用程式中，Flutter UI 會在專屬的光柵執行緒（raster thread）上進行組合。這讓 Flutter 應用程式能夠保持高速，因為這個執行緒很少被阻塞。

當以混合組合（hybrid composition）方式渲染平台視圖時，Flutter UI 依然會由專屬的光柵執行緒來組合，但平台視圖則會在平台執行緒（platform thread）上執行圖形操作。為了將這些內容一同光柵化，Flutter 會在其光柵執行緒與平台執行緒之間進行同步。因此，任何在平台執行緒上發生的緩慢或阻塞操作，都可能對 Flutter 的圖形效能產生負面影響。
