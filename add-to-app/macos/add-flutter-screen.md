# 將 Flutter 畫面加入 macOS 應用程式

> 學習如何將單一 Flutter 畫面加入現有的 macOS 應用程式。



本指南說明如何將單一 Flutter 畫面加入現有的 macOS 應用程式。

## 啟動 FlutterEngine 與 FlutterViewController

要從現有的 macOS 應用程式啟動 Flutter 畫面，
你需要啟動 [`FlutterEngine`][] 與 [`FlutterViewController`][]。

:::note
`FlutterEngine` 作為 Dart VM 及 Flutter 執行環境 (runtime) 的宿主，
而 `FlutterViewController` 會附接到 `FlutterEngine`，
以將輸入事件傳入 Flutter，
並顯示由 `FlutterEngine` 渲染的畫面。
:::

`FlutterEngine` 的生命週期可能與 `FlutterViewController` 相同，
也可能比 `FlutterViewController` 更長。

:::tip
通常建議為應用程式預先暖機 (pre-warm) 一個長生命週期的
`FlutterEngine`，原因如下：

* 顯示 `FlutterViewController` 時，第一幀畫面出現得更快。
* Flutter 與 Dart 的狀態將不受單一 `FlutterViewController` 的生命週期限制。
* 在顯示 UI 前，應用程式與插件 (plugin) 可與 Flutter
  及 Dart 邏輯進行互動。
:::

請參閱[載入順序與效能][Loading sequence and performance]，
進一步分析預先暖機引擎的延遲與記憶體取捨。

### 建立 FlutterEngine

建立 `FlutterEngine` 的位置取決於你的宿主應用程式。

<Tabs key="macos-framework">
<Tab name="SwiftUI">

在此範例中，我們在名為 `FlutterDependencies` 的 SwiftUI [`Observable`][] 物件內
建立 `FlutterEngine` 物件。
透過呼叫 `run()` 預先暖機引擎，然後使用 `environment()` 視圖修飾器
將此物件注入 `ContentView`。

 ```swift title="MyApp.swift"
import SwiftUI
import FlutterMacOS
// The following library connects plugins with macOS platform code to this app.
import FlutterPluginRegistrant

@Observable
class FlutterDependencies {
  let flutterEngine = FlutterEngine(name: "my flutter engine", project: nil)
  init() {
    // Runs the default Dart entrypoint with a default Flutter route.
    flutterEngine.run(withEntrypoint: nil)
    // Connects plugins with macOS platform code to this app.
    RegisterGeneratedPlugins(registry: self.flutterEngine)
  }
}

@main
struct MyApp: App {
    // flutterDependencies will be injected through the view environment.
    @State var flutterDependencies = FlutterDependencies()
    var body: some Scene {
      WindowGroup {
        ContentView()
          .environment(flutterDependencies)
      }
    }
}
```

</Tab>
<Tab name="AppKit-Swift">

以下範例示範在 app delegate 中於應用程式啟動時
建立 `FlutterEngine`，並以屬性形式公開。

```swift title="AppDelegate.swift"
import Cocoa
import FlutterMacOS
// The following library connects plugins with macOS platform code to this app.
import FlutterPluginRegistrant

@main
class AppDelegate: FlutterAppDelegate {
  lazy var flutterEngine = FlutterEngine(name: "my flutter engine", project: nil)

  override func applicationDidFinishLaunching(_ aNotification: Notification) {
    flutterEngine.run(withEntrypoint: nil)
    RegisterGeneratedPlugins(registry: self.flutterEngine)
  }
}
```

</Tab>
</Tabs>

### 使用 FlutterEngine 顯示 FlutterViewController

<Tabs key="macos-framework">
<Tab name="SwiftUI">

以下範例展示一個通用的 `ContentView`，其中
[`NavigationLink`][] 連結到 Flutter 畫面。
首先，建立 `FlutterViewControllerRepresentable`
以代表 `FlutterViewController`。
`FlutterViewController` 建構子接受
預先暖機的 `FlutterEngine` 作為參數，
該參數透過視圖環境注入。

```swift title="ContentView.swift"
import SwiftUI
import FlutterMacOS

struct FlutterViewControllerRepresentable: NSViewControllerRepresentable {
  // Flutter dependencies are passed in through the view environment.
  @Environment(FlutterDependencies.self) var flutterDependencies

  func makeNSViewController(context: Context) -> FlutterViewController {
    return FlutterViewController(
      engine: flutterDependencies.flutterEngine,
      nibName: nil,
      bundle: nil
    )
  }

  func updateNSViewController(_ nsViewController: FlutterViewController, context: Context) {}
}

struct ContentView: View {
  var body: some View {
    NavigationStack {
      NavigationLink("My Flutter Feature") {
        FlutterViewControllerRepresentable()
      }
    }
  }
}
```

現在，你的 macOS 應用程式中已嵌入了 Flutter 畫面。

:::note
在此範例中，你的 Dart `main()` 進入點函式
會在 `FlutterDependencies` observable 初始化時執行。
:::

</Tab>
<Tab name="AppKit-Swift">

以下範例展示一個通用的 `ViewController`，其中
`NSButton` 連結以呈現 [`FlutterViewController`][]。
`FlutterViewController` 使用在 `AppDelegate` 中建立的
`FlutterEngine` 實例。

```swift title="ViewController.swift"
import Cocoa
import FlutterMacOS

class ViewController: NSViewController {

  override func viewDidLoad() {
    super.viewDidLoad()

    // Make a button to call the showFlutter function when pressed.
    let button =  NSButton(title: "Show Flutter!", target: self, action: #selector(showFlutter))
    button.frame = CGRect(x: 202, y: 187, width: 160.0, height: 40.0)
    self.view.addSubview(button)
  }

  @objc func showFlutter() {
    let flutterEngine = (NSApplication.shared.delegate as! AppDelegate).flutterEngine
    let flutterViewController =
        FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
    self.addChild(flutterViewController)
    flutterViewController.view.frame = self.view.bounds
    presentAsModalWindow(flutterViewController)
  }
}
```

現在，你的 macOS 應用程式中已嵌入了 Flutter 畫面。

:::note
使用前述範例時，預設 Dart 程式庫的預設 `main()` 進入點函式
會在 `AppDelegate` 中建立的 `FlutterEngine` 呼叫 `run` 時執行。
:::

</Tab>
</Tabs>

### _或者_ — 使用隱含的 FlutterEngine 建立 FlutterViewController

作為前述範例的替代方案，
你可以讓 `FlutterViewController` 隱含地建立
自己的 `FlutterEngine`，而不需要事先預先暖機。

通常不建議這樣做，
因為按需建立 `FlutterEngine` 可能會在
呈現 `FlutterViewController` 至渲染第一幀之間
引入明顯的延遲。
但在 Flutter 畫面極少顯示、
沒有良好的啟發式方法來決定 Dart VM 應何時啟動，
以及 Flutter 不需要在視圖控制器之間保持狀態時，
這種方式可能有其用途。

若要讓 `FlutterViewController` 在沒有現有 `FlutterEngine` 的情況下呈現，
請省略 `FlutterEngine` 的建構，
並在建立 `FlutterViewController` 時不傳入引擎參考。

<Tabs key="macos-framework">
<Tab name="SwiftUI">

```swift title="ContentView.swift"
// Existing code omitted.
func makeNSViewController(context: Context) -> FlutterViewController {
  return FlutterViewController()
}
```

</Tab>
<Tab name="AppKit-Swift">

```swift title="ViewController.swift"
// Existing code omitted.
func showFlutter() {
  let flutterViewController = FlutterViewController()
  self.addChild(flutterViewController)
  flutterViewController.view.frame = self.view.bounds
  presentAsModalWindow(flutterViewController)
}
```

</Tab>
</Tabs>

請參閱[載入順序與效能][Loading sequence and performance]
以進一步探討延遲與記憶體使用量。

## 使用 FlutterAppDelegate

建議讓應用程式的 `UIApplicationDelegate` 子類別
繼承 `FlutterAppDelegate`，但這並非必要。

`FlutterAppDelegate` 執行的功能包括：

* 將 [`openURLs`][] 等應用程式回呼（callback）
  轉送給 [google_sign_in][] 等插件。

### 建立 FlutterAppDelegate 子類別

在 UIKit 應用程式中建立 `FlutterAppDelegate` 子類別的方式
已在[啟動 FlutterEngine 與 FlutterViewController 章節][Start a FlutterEngine and FlutterViewController section]中說明。
在 SwiftUI 應用程式中，你可以建立 `FlutterAppDelegate` 的子類別
並以 [`Observable()`][] 巨集標註，如下所示：

```swift title="MyApp.swift"
import SwiftUI
import FlutterMacOS

@Observable
class AppDelegate: FlutterAppDelegate {
  let flutterEngine = FlutterEngine(name: "my flutter engine", project: nil)

  override func applicationDidFinishLaunching(_ aNotification: Notification) {
    // Runs the default Dart entrypoint with a default Flutter route.
    flutterEngine.run(withEntrypoint: nil)
    // Used to connect plugins (only if you have plugins
    // with macOS platform code).
    RegisterGeneratedPlugins(registry: self.flutterEngine)
  }
}

@main
struct MyApp: App {
  // Use this property wrapper to tell SwiftUI
  // it should use the AppDelegate class for the application delegate
  @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

  var body: some Scene {
    WindowGroup {
      ContentView()
    }
  }
}
```

接著，在你的視圖中，可透過視圖環境存取 `AppDelegate`。

```swift title="ContentView.swift"
import SwiftUI
import FlutterMacOS

struct FlutterViewControllerRepresentable: NSViewControllerRepresentable {
  // Access the AppDelegate through the view environment.
  @Environment(AppDelegate.self) var appDelegate

  func makeNSViewController(context: Context) -> FlutterViewController {
    return FlutterViewController(
      engine: appDelegate.flutterEngine,
      nibName: nil,
      bundle: nil
    )
  }

  func updateNSViewController(_ nsViewController: FlutterViewController, context: Context) {}
}

struct ContentView: View {
  var body: some View {
    NavigationStack {
      NavigationLink("My Flutter Feature") {
        FlutterViewControllerRepresentable()
      }
    }
  }
}
```

[`FlutterEngine`]: https://api.flutter.dev/macos-embedder/interface_flutter_engine.html
[`FlutterViewController`]: https://api.flutter.dev/macos-embedder/interface_flutter_view_controller.html
[Loading sequence and performance]: /add-to-app/performance
[google_sign_in]: https://pub.dev/packages/google_sign_in
[`openURLs`]: https://developer.apple.com/documentation/appkit/nsapplicationdelegate/application(_:open:)
[Start a FlutterEngine and FlutterViewController section]:/add-to-app/macos/add-flutter-screen/#start-a-flutterengine-and-flutterviewcontroller
[`Observable`]: https://developer.apple.com/documentation/observation/observable
[`NavigationLink`]: https://developer.apple.com/documentation/swiftui/navigationlink
[`Observable()`]: https://developer.apple.com/documentation/observation/observable()

