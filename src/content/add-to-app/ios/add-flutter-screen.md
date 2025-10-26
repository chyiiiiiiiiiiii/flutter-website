---
title: 在 iOS 應用程式中加入 Flutter 螢幕
shortTitle: 加入 Flutter 螢幕
description: 學習如何在現有的 iOS 應用程式中加入單一 Flutter 螢幕。
---

本指南說明如何在現有的 iOS 應用程式中加入單一 Flutter 螢幕。

## 啟動 FlutterEngine 與 FlutterViewController

若要從現有的 iOS 應用程式啟動 Flutter 螢幕，你需要啟動一個 [`FlutterEngine`][`FlutterEngine`] 和一個 [`FlutterViewController`][`FlutterViewController`]。

:::note
`FlutterEngine` 作為 Dart VM 與 Flutter 執行時環境的主機，
而 `FlutterViewController` 則會附加到 `FlutterEngine`，以將
輸入事件傳遞給 Flutter，並顯示由
`FlutterEngine` 所繪製的畫面。
:::

`FlutterEngine` 的生命週期可以與你的
`FlutterViewController` 相同，或比你的 `FlutterViewController` 更長。

:::tip
一般建議為你的應用程式預先啟動一個長生命週期的
`FlutterEngine`，原因如下：

* 在顯示 `FlutterViewController` 時，第一幀畫面會更快出現。
* 你的 Flutter 與 Dart 狀態將會比單一 `FlutterViewController` 存活更久。
* 你的應用程式與插件可以在顯示 UI 之前，就與 Flutter 及 Dart
  邏輯互動。
:::

更多有關預先啟動 engine 的延遲與記憶體取捨分析，請參閱 [Loading sequence and performance][Loading sequence and performance]。

### 建立 FlutterEngine

你應該在何處建立 `FlutterEngine`，取決於你的主應用程式架構。

{% tabs "darwin-framework" %}
{% tab "SwiftUI" %}

在此範例中，我們在 SwiftUI 的 [`Observable`][`Observable`] 
物件中建立一個 `FlutterEngine` 物件，命名為 `FlutterDependencies`。
透過呼叫 `run()` 來預先啟動 engine，然後使用 `environment()` view 修飾器
將此物件注入到 `ContentView` 中。 

 ```swift title="MyApp.swift"
import SwiftUI
import Flutter
// The following library connects plugins with iOS platform code to this app.
import FlutterPluginRegistrant

@Observable
class FlutterDependencies {
  let flutterEngine = FlutterEngine(name: "my flutter engine")
  init() {
    // Runs the default Dart entrypoint with a default Flutter route.
    flutterEngine.run()
    // Connects plugins with iOS platform code to this app.
    GeneratedPluginRegistrant.register(with: self.flutterEngine);
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

{% endtab %}
{% tab "UIKit-Swift" %}

舉例來說，我們將示範如何在應用程式啟動時，於 app delegate 中建立一個`FlutterEngine`，並將其作為屬性公開。

```swift title="AppDelegate.swift"
import UIKit
import Flutter
// The following library connects plugins with iOS platform code to this app.
import FlutterPluginRegistrant

@UIApplicationMain
class AppDelegate: FlutterAppDelegate { // More on the FlutterAppDelegate.
  lazy var flutterEngine = FlutterEngine(name: "my flutter engine")

  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Runs the default Dart entrypoint with a default Flutter route.
    flutterEngine.run();
    // Connects plugins with iOS platform code to this app.
    GeneratedPluginRegistrant.register(with: self.flutterEngine);
    return super.application(application, didFinishLaunchingWithOptions: launchOptions);
  }
}
```

{% endtab %}
{% tab "UIKit-ObjC" %}

以下範例展示如何在 app 啟動時，於 app delegate 中建立一個 `FlutterEngine`，並作為屬性對外公開。

```objc title="AppDelegate.h"
@import UIKit;
@import Flutter;

@interface AppDelegate : FlutterAppDelegate // More on the FlutterAppDelegate below.
@property (nonatomic,strong) FlutterEngine *flutterEngine;
@end
```

```objc title="AppDelegate.m"
// The following library connects plugins with iOS platform code to this app.
#import <FlutterPluginRegistrant/GeneratedPluginRegistrant.h>

#import "AppDelegate.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> *)launchOptions {
  self.flutterEngine = [[FlutterEngine alloc] initWithName:@"my flutter engine"];
  // Runs the default Dart entrypoint with a default Flutter route.
  [self.flutterEngine run];
  // Connects plugins with iOS platform code to this app.
  [GeneratedPluginRegistrant registerWithRegistry:self.flutterEngine];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

@end
```

{% endtab %}
{% endtabs %}

### 使用你的 FlutterEngine 顯示 FlutterViewController

{% tabs "darwin-framework" %}
{% tab "SwiftUI" %}

以下範例展示了一個通用的 `ContentView`，其中
[`NavigationLink`][`NavigationLink`] 已連接到一個 Flutter 螢幕。
首先，建立一個 `FlutterViewControllerRepresentable` 來表示
`FlutterViewController`。`FlutterViewController` 的建構子會接收
預先加載的 `FlutterEngine` 作為參數，該參數會透過
view environment 注入。 

```swift title="ContentView.swift"
import SwiftUI
import Flutter

struct FlutterViewControllerRepresentable: UIViewControllerRepresentable {
  // Flutter dependencies are passed in through the view environment.
  @Environment(FlutterDependencies.self) var flutterDependencies
  
  func makeUIViewController(context: Context) -> some UIViewController {
    return FlutterViewController(
      engine: flutterDependencies.flutterEngine,
      nibName: nil,
      bundle: nil)
  }
  
  func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {}
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

現在，你已經在你的 iOS 應用程式中嵌入了一個 Flutter 螢幕。

:::note
在此範例中，當 `FlutterDependencies` observable 被初始化時，
你的 Dart `main()` entrypoint 函式會執行。
:::

{% endtab %}
{% tab "UIKit-Swift" %}

以下範例展示了一個通用的 `ViewController`，
並且有一個 `UIButton` 綁定用來顯示一個 [`FlutterViewController`][`FlutterViewController`]。
`FlutterViewController` 使用在 `AppDelegate` 中建立的 `FlutterEngine` 實例。

```swift title="ViewController.swift"
import UIKit
import Flutter

class ViewController: UIViewController {
  override func viewDidLoad() {
    super.viewDidLoad()

    // Make a button to call the showFlutter function when pressed.
    let button = UIButton(type:UIButton.ButtonType.custom)
    button.addTarget(self, action: #selector(showFlutter), for: .touchUpInside)
    button.setTitle("Show Flutter!", for: UIControl.State.normal)
    button.frame = CGRect(x: 80.0, y: 210.0, width: 160.0, height: 40.0)
    button.backgroundColor = UIColor.blue
    self.view.addSubview(button)
  }

  @objc func showFlutter() {
    let flutterEngine = (UIApplication.shared.delegate as! AppDelegate).flutterEngine
    let flutterViewController =
        FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
    present(flutterViewController, animated: true, completion: nil)
  }
}
```

現在，你已經在你的 iOS 應用程式中嵌入了一個 Flutter 螢幕。

:::note
根據前述範例，當你在 `AppDelegate` 中建立的 `FlutterEngine` 上呼叫 `run` 時，你預設 Dart 程式庫的預設 `main()` 進入點函式會被執行。
:::


{% endtab %}
{% tab "UIKit-ObjC" %}

以下範例展示了一個通用的 `ViewController`，並且將 `UIButton` 綁定來顯示一個 [`FlutterViewController`][`FlutterViewController`]。
`FlutterViewController` 使用在 `AppDelegate` 中建立的 `FlutterEngine` 實例。

```objc title="ViewController.m"
@import Flutter;
#import "AppDelegate.h"
#import "ViewController.h"

@implementation ViewController
- (void)viewDidLoad {
    [super viewDidLoad];

    // Make a button to call the showFlutter function when pressed.
    UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
    [button addTarget:self
               action:@selector(showFlutter)
     forControlEvents:UIControlEventTouchUpInside];
    [button setTitle:@"Show Flutter!" forState:UIControlStateNormal];
    button.backgroundColor = UIColor.blueColor;
    button.frame = CGRectMake(80.0, 210.0, 160.0, 40.0);
    [self.view addSubview:button];
}

- (void)showFlutter {
    FlutterEngine *flutterEngine =
        ((AppDelegate *)UIApplication.sharedApplication.delegate).flutterEngine;
    FlutterViewController *flutterViewController =
        [[FlutterViewController alloc] initWithEngine:flutterEngine nibName:nil bundle:nil];
    [self presentViewController:flutterViewController animated:YES completion:nil];
}
@end
```

現在，你已經在你的 iOS 應用程式中嵌入了一個 Flutter 螢幕。

:::note
根據前述範例，當你在 `AppDelegate` 中建立的 `FlutterEngine` 上呼叫 `run` 時，預設 Dart 函式庫的預設 `main()` 進入點函式會被執行。
:::


{% endtab %}
{% endtabs %}

### _另一種方式_ - 使用隱式 FlutterEngine 建立 FlutterViewController

作為前述範例的替代方案，你可以讓 `FlutterViewController` 隱式地自行建立 `FlutterEngine`，而不需要事先預先啟動一個。

通常不建議這麼做，因為隨需建立 `FlutterEngine` 可能會導致在顯示 `FlutterViewController` 與其渲染第一個畫面之間出現明顯的延遲。不過，如果 Flutter 螢幕很少被顯示、沒有合適的啟發式方法來判斷何時該啟動 Dart VM，且 Flutter 不需要在多個 view controller 之間持續保存狀態時，這種方式會很有用。

若要讓 `FlutterViewController` 在沒有既有 `FlutterEngine` 的情況下顯示，請省略 `FlutterEngine` 的建立，並在沒有 engine 參考的情況下建立 `FlutterViewController`。

{% tabs "darwin-framework" %}
{% tab "SwiftUI" %}

```swift title="ContentView.swift"
import SwiftUI
import Flutter

struct FlutterViewControllerRepresentable: UIViewControllerRepresentable {
  func makeUIViewController(context: Context) -> some UIViewController {
    return FlutterViewController(
      project: nil,
      nibName: nil,
      bundle: nil)
  }
  
  func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {}
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

{% endtab %}
{% tab "UIKit-Swift" %}

```swift title="ViewController.swift"
// Existing code omitted.
func showFlutter() {
  let flutterViewController = FlutterViewController(project: nil, nibName: nil, bundle: nil)
  present(flutterViewController, animated: true, completion: nil)
}
```

{% endtab %}
{% tab "UIKit-ObjC" %}

```objc title="ViewController.m"
// Existing code omitted.
- (void)showFlutter {
  FlutterViewController *flutterViewController =
      [[FlutterViewController alloc] initWithProject:nil nibName:nil bundle:nil];
  [self presentViewController:flutterViewController animated:YES completion:nil];
}
@end
```

{% endtab %}
{% endtabs %}

請參閱[載入順序與效能][Loading sequence and performance]，以深入探討延遲與記憶體使用情形。

## 使用 FlutterAppDelegate

建議（但非必須）讓您的應用程式的`UIApplicationDelegate`子類別繼承`FlutterAppDelegate`。

`FlutterAppDelegate`負責執行以下功能：

* 將應用程式回呼（如 [`openURL`][`openURL`]）轉發給像 [local_auth][local_auth] 這樣的插件。
* 在偵錯模式下，當手機螢幕鎖定時，保持 Flutter 連線開啟。

### 建立 FlutterAppDelegate 子類別
在 UIKit 應用程式中建立`FlutterAppDelegate`的子類別，已於[啟動 FlutterEngine 與 FlutterViewController 章節][Start a FlutterEngine and FlutterViewController section]中說明。
在 SwiftUI 應用程式中，您可以建立`FlutterAppDelegate`的子類別，並使用 [`Observable()`][`Observable()`]巨集進行註解，如下所示：

```swift title="MyApp.swift"
import SwiftUI
import Flutter
import FlutterPluginRegistrant

@Observable
class AppDelegate: FlutterAppDelegate {
  let flutterEngine = FlutterEngine(name: "my flutter engine")

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
      // Runs the default Dart entrypoint with a default Flutter route.
      flutterEngine.run();
      // Used to connect plugins (only if you have plugins with iOS platform code).
      GeneratedPluginRegistrant.register(with: self.flutterEngine);
      return true;
    }
}

@main
struct MyApp: App {
  // Use this property wrapper to tell SwiftUI
  // it should use the AppDelegate class for the application delegate
  @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

  var body: some Scene {
      WindowGroup {
        ContentView()
      }
  }
}
```

然後，在你的視圖中，可以透過視圖環境存取 `AppDelegate`。

```swift title="ContentView.swift"
import SwiftUI
import Flutter

struct FlutterViewControllerRepresentable: UIViewControllerRepresentable {
  // Access the AppDelegate through the view environment.
  @Environment(AppDelegate.self) var appDelegate
  
  func makeUIViewController(context: Context) -> some UIViewController {
    return FlutterViewController(
      engine: appDelegate.flutterEngine,
      nibName: nil,
      bundle: nil)
  }
  
  func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {}
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

### 如果你無法直接讓 FlutterAppDelegate 成為子類別

如果你的 app delegate 無法直接讓 `FlutterAppDelegate` 成為子類別，請讓你的 app delegate 實作 `FlutterAppLifeCycleProvider` protocol，以確保你的插件（plugins）能夠收到必要的回呼（callback）。否則，依賴這些事件的插件可能會出現未定義的行為。

例如：

{% tabs "darwin-language" %}
{% tab "Swift" %}

```swift title="AppDelegate.swift"
import Foundation
import Flutter

@Observable
class AppDelegate: UIResponder, UIApplicationDelegate, FlutterAppLifeCycleProvider {

  private let lifecycleDelegate = FlutterPluginAppLifeCycleDelegate()

  let flutterEngine = FlutterEngine(name: "my flutter engine")

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    flutterEngine.run()
    return lifecycleDelegate.application(application, didFinishLaunchingWithOptions: launchOptions ?? [:])
  }

  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    lifecycleDelegate.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
  }

  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    lifecycleDelegate.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
  }

  func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    lifecycleDelegate.application(application, didReceiveRemoteNotification: userInfo, fetchCompletionHandler: completionHandler)
  }

  func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return lifecycleDelegate.application(app, open: url, options: options)
  }

  func application(_ application: UIApplication, handleOpen url: URL) -> Bool {
    return lifecycleDelegate.application(application, handleOpen: url)
  }

  func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
    return lifecycleDelegate.application(application, open: url, sourceApplication: sourceApplication ?? "", annotation: annotation)
  }

  func application(_ application: UIApplication, performActionFor shortcutItem: UIApplicationShortcutItem, completionHandler: @escaping (Bool) -> Void) {
    lifecycleDelegate.application(application, performActionFor: shortcutItem, completionHandler: completionHandler)
  }

  func application(_ application: UIApplication, handleEventsForBackgroundURLSession identifier: String, completionHandler: @escaping () -> Void) {
    lifecycleDelegate.application(application, handleEventsForBackgroundURLSession: identifier, completionHandler: completionHandler)
  }

  func application(_ application: UIApplication, performFetchWithCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    lifecycleDelegate.application(application, performFetchWithCompletionHandler: completionHandler)
  }

  func add(_ delegate: FlutterApplicationLifeCycleDelegate) {
    lifecycleDelegate.add(delegate)
  }
}
```

{% endtab %}
{% tab "Objective-C" %}

```objc title="AppDelegate.h"
@import Flutter;
@import UIKit;
@import FlutterPluginRegistrant;

@interface AppDelegate : UIResponder <UIApplicationDelegate, FlutterAppLifeCycleProvider>
@property (strong, nonatomic) UIWindow *window;
@property (nonatomic,strong) FlutterEngine *flutterEngine;
@end
```

實作時應主要委派給
`FlutterPluginAppLifeCycleDelegate`：

```objc title="AppDelegate.m"
@interface AppDelegate ()
@property (nonatomic, strong) FlutterPluginAppLifeCycleDelegate* lifeCycleDelegate;
@end

@implementation AppDelegate

- (instancetype)init {
    if (self = [super init]) {
        _lifeCycleDelegate = [[FlutterPluginAppLifeCycleDelegate alloc] init];
    }
    return self;
}

- (BOOL)application:(UIApplication*)application
didFinishLaunchingWithOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id>*))launchOptions {
    self.flutterEngine = [[FlutterEngine alloc] initWithName:@"io.flutter" project:nil];
    [self.flutterEngine runWithEntrypoint:nil];
    [GeneratedPluginRegistrant registerWithRegistry:self.flutterEngine];
    return [_lifeCycleDelegate application:application didFinishLaunchingWithOptions:launchOptions];
}

// Returns the key window's rootViewController, if it's a FlutterViewController.
// Otherwise, returns nil.
- (FlutterViewController*)rootFlutterViewController {
    UIViewController* viewController = [UIApplication sharedApplication].keyWindow.rootViewController;
    if ([viewController isKindOfClass:[FlutterViewController class]]) {
        return (FlutterViewController*)viewController;
    }
    return nil;
}

- (void)application:(UIApplication*)application
didRegisterUserNotificationSettings:(UIUserNotificationSettings*)notificationSettings {
    [_lifeCycleDelegate application:application
didRegisterUserNotificationSettings:notificationSettings];
}

- (void)application:(UIApplication*)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken {
    [_lifeCycleDelegate application:application
didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication*)application
didReceiveRemoteNotification:(NSDictionary*)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
    [_lifeCycleDelegate application:application
       didReceiveRemoteNotification:userInfo
             fetchCompletionHandler:completionHandler];
}

- (BOOL)application:(UIApplication*)application
            openURL:(NSURL*)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id>*)options {
    return [_lifeCycleDelegate application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication*)application handleOpenURL:(NSURL*)url {
    return [_lifeCycleDelegate application:application handleOpenURL:url];
}

- (BOOL)application:(UIApplication*)application
            openURL:(NSURL*)url
  sourceApplication:(NSString*)sourceApplication
         annotation:(id)annotation {
    return [_lifeCycleDelegate application:application
                                   openURL:url
                         sourceApplication:sourceApplication
                                annotation:annotation];
}

- (void)application:(UIApplication*)application
performActionForShortcutItem:(UIApplicationShortcutItem*)shortcutItem
  completionHandler:(void (^)(BOOL succeeded))completionHandler {
    [_lifeCycleDelegate application:application
       performActionForShortcutItem:shortcutItem
                  completionHandler:completionHandler];
}

- (void)application:(UIApplication*)application
handleEventsForBackgroundURLSession:(nonnull NSString*)identifier
  completionHandler:(nonnull void (^)(void))completionHandler {
    [_lifeCycleDelegate application:application
handleEventsForBackgroundURLSession:identifier
                  completionHandler:completionHandler];
}

- (void)application:(UIApplication*)application
performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
    [_lifeCycleDelegate application:application performFetchWithCompletionHandler:completionHandler];
}

- (void)addApplicationLifeCycleDelegate:(NSObject<FlutterPlugin>*)delegate {
    [_lifeCycleDelegate addDelegate:delegate];
}
@end
```

{% endtab %}
{% endtabs %}

## 啟動選項

這些範例展示了如何使用預設的啟動設定來執行 Flutter。

若您需要自訂 Flutter 執行時環境，
也可以指定 Dart 的 entrypoint（進入點）、library（函式庫）以及 route（路由）。

### Dart entrypoint（進入點）

在 `FlutterEngine` 上呼叫 `run`，預設會執行
`lib/main.dart` 檔案中的 `main()` Dart 函式。

您也可以透過 [`runWithEntrypoint`][`runWithEntrypoint`] 並傳入包含
不同 Dart 函式名稱的 `NSString`，來執行其他 entrypoint 函式。

:::note
若 Dart entrypoint 函式不是 `main()`，
則必須加上以下註解，才能在編譯時避免被 [tree-shaken][tree-shaken] 移除：

```dart
@pragma('vm:entry-point')
void myOtherEntrypoint() { ... };
```
:::

### Dart 函式庫

除了可以指定 Dart 函式外，你也可以在特定檔案中指定進入點（entrypoint）函式。

例如，下列程式碼會在 `lib/other_file.dart` 執行 `myOtherEntrypoint()`，而不是在 `lib/main.dart` 執行 `main()`：

{% tabs "darwin-language" %}
{% tab "Swift" %}

```swift
flutterEngine.run(withEntrypoint: "myOtherEntrypoint", libraryURI: "other_file.dart")
```

{% endtab %}
{% tab "Objective-C" %}

```objc
[flutterEngine runWithEntrypoint:@"myOtherEntrypoint" libraryURI:@"other_file.dart"];
```

{% endtab %}
{% endtabs %}


### Route

從 Flutter 1.22 版本開始，在建立 Flutter
[`WidgetsApp`][`WidgetsApp`] 時，可以為 FlutterEngine 或 FlutterViewController 設定初始 Route（路由）。

{% tabs "darwin-language" %}
{% tab "Swift" %}

```swift
let flutterEngine = FlutterEngine()
// FlutterDefaultDartEntrypoint is the same as nil, which will run main().
engine.run(
  withEntrypoint: "main", initialRoute: "/onboarding")
```

{% endtab %}
{% tab "Objective-C" %}

```objc
FlutterEngine *flutterEngine = [[FlutterEngine alloc] init];
// FlutterDefaultDartEntrypoint is the same as nil, which will run main().
[flutterEngine runWithEntrypoint:FlutterDefaultDartEntrypoint
                    initialRoute:@"/onboarding"];
```

{% endtab %}
{% endtabs %}

這段程式碼會將你的 `dart:ui` 的 [`PlatformDispatcher.defaultRouteName`][`PlatformDispatcher.defaultRouteName`]
設為 `"/onboarding"`，而不是 `"/"`。

另外，如果你想直接建立一個 FlutterViewController，而不需要預先啟動
FlutterEngine，可以這麼做：

{% tabs "darwin-language" %}
{% tab "Swift" %}

```swift
let flutterViewController = FlutterViewController(
      project: nil, initialRoute: "/onboarding", nibName: nil, bundle: nil)
```

{% endtab %}
{% tab "Objective-C" %}

```objc
FlutterViewController* flutterViewController =
      [[FlutterViewController alloc] initWithProject:nil
                                        initialRoute:@"/onboarding"
                                             nibName:nil
                                              bundle:nil];
```

{% endtab %}
{% endtabs %}

:::tip
如果你想在 `FlutterEngine` 已經執行後，從平台端以命令式方式變更目前的 Flutter Route，請在 `FlutterViewController` 上使用 [`pushRoute()`][`pushRoute()`] 或 [`popRoute()`]。

若要從 Flutter 端 pop 掉 iOS 的 Route，請呼叫 [`SystemNavigator.pop()`][`SystemNavigator.pop()`]。
:::

如需更多關於 Flutter Route 的資訊，請參閱 [Navigation and routing][Navigation and routing]。

### 其他

前述範例僅說明了自訂 Flutter 實例啟動方式的幾種方法。透過 [platform channels][platform channels]，你可以在使用 `FlutterViewController` 呈現 Flutter UI 之前，以任何你想要的方式推送資料或準備 Flutter 執行環境。


[`FlutterEngine`]: {{site.api}}/ios-embedder/interface_flutter_engine.html
[`FlutterViewController`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html
[Loading sequence and performance]: /add-to-app/performance
[local_auth]: {{site.pub}}/packages/local_auth
[Navigation and routing]: /ui/navigation
[Navigator]: {{site.api}}/flutter/widgets/Navigator-class.html
[`NavigatorState`]: {{site.api}}/flutter/widgets/NavigatorState-class.html
[`openURL`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/1623112-application
[platform channels]: /platform-integration/platform-channels
[`popRoute()`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html#ac89c8010fbf7a39f7aaab64f68c013d2
[`pushRoute()`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html#ac7cffbf03f9c8c0b28d1f0dafddece4e
[`runApp`]: {{site.api}}/flutter/widgets/runApp.html
[`runWithEntrypoint`]: {{site.api}}/ios-embedder/interface_flutter_engine.html#a019d6b3037eff6cfd584fb2eb8e9035e
[`SystemNavigator.pop()`]: {{site.api}}/flutter/services/SystemNavigator/pop.html
[tree-shaken]: https://en.wikipedia.org/wiki/Tree_shaking
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html
[`PlatformDispatcher.defaultRouteName`]: {{site.api}}/flutter/dart-ui/PlatformDispatcher/defaultRouteName.html
[Start a FlutterEngine and FlutterViewController section]:/add-to-app/ios/add-flutter-screen/#start-a-flutterengine-and-flutterviewcontroller
[`Observable`]: https://developer.apple.com/documentation/observation/observable
[`NavigationLink`]: https://developer.apple.com/documentation/swiftui/navigationlink
[`Observable()`]: https://developer.apple.com/documentation/observation/observable()
