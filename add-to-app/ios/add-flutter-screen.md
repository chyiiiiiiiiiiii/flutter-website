# 在 iOS 應用程式中加入 Flutter 螢幕

> 學習如何在現有的 iOS 應用程式中加入單一 Flutter 螢幕。



本指南說明如何在現有的 iOS 應用程式中加入單一 Flutter 螢幕。

## 啟動 FlutterEngine 與 FlutterViewController

若要從現有的 iOS 應用程式啟動 Flutter 螢幕，你需要啟動一個
[`FlutterEngine`][] 和一個 [`FlutterViewController`][]。

:::note
`FlutterEngine` 作為 Dart VM 與 Flutter 執行時環境的主機，
而 `FlutterViewController` 則會附加到 `FlutterEngine`，以將
輸入事件傳遞給 Flutter，並顯示由
`FlutterEngine` 所渲染的畫面。
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

更多有關預先啟動 engine 的延遲與記憶體取捨分析，請參閱 [Loading sequence and performance][]。

### 建立 FlutterEngine

你應該在何處建立 `FlutterEngine`，取決於你的主應用程式架構。

<Tabs key="darwin-framework">
<Tab name="SwiftUI">

以下範例在 SwiftUI 的 [`Observable`][]
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

</Tab>
<Tab name="UIKit-Swift">

以下範例示範如何在應用程式啟動時，於 app delegate 中建立一個 `FlutterEngine`，並將其作為屬性公開。

```swift title="AppDelegate.swift"
import UIKit
import Flutter
// The following library connects plugins with iOS platform code to this app.
import FlutterPluginRegistrant

@UIApplicationMain
class AppDelegate: FlutterAppDelegate { // More on FlutterAppDelegate and FlutterSceneDelegate below.
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

</Tab>
<Tab name="UIKit-ObjC">

以下範例展示如何在 app 啟動時，於 app delegate 中建立一個 `FlutterEngine`，並作為屬性對外公開。

```objc title="AppDelegate.h"
@import UIKit;
@import Flutter;

@interface AppDelegate : FlutterAppDelegate // More on FlutterAppDelegate and FlutterSceneDelegate below.
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

</Tab>
</Tabs>

### 使用你的 FlutterEngine 顯示 FlutterViewController

<Tabs key="darwin-framework">
<Tab name="SwiftUI">

以下範例展示了一個通用的 `ContentView`，其中
[`NavigationLink`][] 已連接到一個 Flutter 螢幕。
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

</Tab>
<Tab name="UIKit-Swift">

以下範例展示了一個通用的 `ViewController`，
並且有一個 `UIButton` 綁定用來顯示一個 [`FlutterViewController`][]。
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


</Tab>
<Tab name="UIKit-ObjC">

以下範例展示了一個通用的 `ViewController`，並且將 `UIButton` 綁定來顯示一個 [`FlutterViewController`][]。
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


</Tab>
</Tabs>

### _另一種方式_ - 使用隱式 FlutterEngine 建立 FlutterViewController

作為前述範例的替代方案，你可以讓 `FlutterViewController` 隱式地自行建立 `FlutterEngine`，而不需要事先預先啟動一個。

通常不建議這麼做，因為隨需建立 `FlutterEngine` 可能會導致在顯示 `FlutterViewController` 與其渲染第一個畫面之間出現明顯的延遲。不過，如果 Flutter 螢幕很少被顯示、沒有合適的啟發式方法來判斷何時該啟動 Dart VM，且 Flutter 不需要在多個 view controller 之間持續保存狀態時，這種方式會很有用。

若要讓 `FlutterViewController` 在沒有既有 `FlutterEngine` 的情況下顯示，請省略 `FlutterEngine` 的建立，並在沒有 engine 參考的情況下建立 `FlutterViewController`。

<Tabs key="darwin-framework">
<Tab name="SwiftUI">

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

</Tab>
<Tab name="UIKit-Swift">

```swift title="ViewController.swift"
// Existing code omitted.
func showFlutter() {
  let flutterViewController = FlutterViewController(project: nil, nibName: nil, bundle: nil)
  present(flutterViewController, animated: true, completion: nil)
}
```

</Tab>
<Tab name="UIKit-ObjC">

```objc title="ViewController.m"
// Existing code omitted.
- (void)showFlutter {
  FlutterViewController *flutterViewController =
      [[FlutterViewController alloc] initWithProject:nil nibName:nil bundle:nil];
  [self presentViewController:flutterViewController animated:YES completion:nil];
}
@end
```

</Tab>
</Tabs>

請參閱 [Loading sequence and performance][]，以深入探討延遲與記憶體使用情形。

<a id="using-the-flutterappdelegate" aria-hidden="true"></a>

## 使用 FlutterAppDelegate 與 FlutterSceneDelegate

從 Flutter 3.41 開始，`UIScene` 支援已成為 iOS 應用程式的預設，
而且 Apple 要求以較新 iOS SDK 建置的 UIKit 應用程式
必須使用 `UIScene` 生命週期。

在此架構下，職責分由兩個 delegate 負責：

* `FlutterAppDelegate`:
  處理程序（process）事件與整體應用程式生命週期
  （例如遠端通知與背景執行），
  並在裝置鎖定時保持 Flutter 偵錯連線開啟。
* `FlutterSceneDelegate`:
  處理 UI 與 scene 生命週期事件，
  並將 [`scene(_:openURLContexts:)`][]
  與 [`scene(_:continue:)`][] 等回呼（callback）轉發給
  [`local_auth`][] 等插件。

為確保 Flutter 插件能收到所有必要的生命週期事件，
請同時採用 `FlutterAppDelegate`（或 `FlutterAppLifeCycleProvider`）
與 `FlutterSceneDelegate`（或 `FlutterSceneLifeCycleProvider`）。

如需更多關於 `UIScene` 生命週期遷移的細節，
請參閱 [UIScene migration guide][]。

### 使用 FlutterAppDelegate

建議（但非必須）讓你的 `UIApplicationDelegate`
繼承 `FlutterAppDelegate`。

#### 建立 FlutterAppDelegate 子類別

在 UIKit 應用程式中建立 `FlutterAppDelegate` 的子類別，已於[啟動 FlutterEngine 與 FlutterViewController 章節][Start a FlutterEngine and FlutterViewController section]中說明。

在 SwiftUI 應用程式中，你可以建立 `FlutterAppDelegate` 的子類別，
實作 `application(_:configurationForConnecting:options:)`
以指定 `FlutterSceneDelegate`，
並使用 [`Observable()`][] 巨集標記該類別：

```swift title="MyApp.swift"
import SwiftUI
import Flutter
import FlutterPluginRegistrant

@Observable
class AppDelegate: FlutterAppDelegate {
  let flutterEngine = FlutterEngine(name: "my flutter engine")

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    // Runs the default Dart entrypoint with a default Flutter route.
    flutterEngine.run()
    // Used to connect plugins (only if you have plugins with iOS platform code).
    GeneratedPluginRegistrant.register(with: self.flutterEngine)
    return true
  }

  override func application(
    _ application: UIApplication,
    configurationForConnecting connectingSceneSession: UISceneSession,
    options: UIScene.ConnectionOptions
  ) -> UISceneConfiguration {
    let configuration = UISceneConfiguration(
      name: nil,
      sessionRole: connectingSceneSession.role
    )
    configuration.delegateClass = FlutterSceneDelegate.self
    return configuration
  }
}

@main
struct MyApp: App {
  // Use this property wrapper to tell SwiftUI
  // it should use the AppDelegate class for the application delegate.
  @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

  var body: some Scene {
    WindowGroup {
      ContentView()
    }
  }
}
```

然後，在你的視圖中，
可以透過視圖環境存取 `AppDelegate`。

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
      bundle: nil
    )
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

#### 如果你無法繼承 FlutterAppDelegate

如果你的 app delegate 無法繼承 `FlutterAppDelegate`，
請遵循 `FlutterAppLifeCycleProvider` protocol，
並使用 `FlutterPluginAppLifeCycleDelegate`，以確保
插件能收到應用程式層級的回呼（callback）。

<Tabs key="darwin-language">
<Tab name="Swift">

```swift title="AppDelegate.swift"
import Foundation
import Flutter

@Observable
class AppDelegate: UIResponder, UIApplicationDelegate, FlutterAppLifeCycleProvider {

  private let lifecycleDelegate = FlutterPluginAppLifeCycleDelegate()

  let flutterEngine = FlutterEngine(name: "my flutter engine")

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    flutterEngine.run()
    return lifecycleDelegate.application(
      application,
      didFinishLaunchingWithOptions: launchOptions ?? [:]
    )
  }

  func application(
    _ application: UIApplication,
    didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
  ) {
    lifecycleDelegate.application(
      application,
      didRegisterForRemoteNotificationsWithDeviceToken: deviceToken
    )
  }

  func application(
    _ application: UIApplication,
    didFailToRegisterForRemoteNotificationsWithError error: Error
  ) {
    lifecycleDelegate.application(
      application,
      didFailToRegisterForRemoteNotificationsWithError: error
    )
  }

  func application(
    _ application: UIApplication,
    didReceiveRemoteNotification userInfo: [AnyHashable: Any],
    fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
  ) {
    lifecycleDelegate.application(
      application,
      didReceiveRemoteNotification: userInfo,
      fetchCompletionHandler: completionHandler
    )
  }

  func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey: Any] = [:]
  ) -> Bool {
    return lifecycleDelegate.application(app, open: url, options: options)
  }

  func application(_ application: UIApplication, handleOpen url: URL) -> Bool {
    return lifecycleDelegate.application(application, handleOpen: url)
  }

  func application(
    _ application: UIApplication,
    open url: URL,
    sourceApplication: String?,
    annotation: Any
  ) -> Bool {
    return lifecycleDelegate.application(
      application,
      open: url,
      sourceApplication: sourceApplication ?? "",
      annotation: annotation
    )
  }

  func application(
    _ application: UIApplication,
    performActionFor shortcutItem: UIApplicationShortcutItem,
    completionHandler: @escaping (Bool) -> Void
  ) {
    lifecycleDelegate.application(
      application,
      performActionFor: shortcutItem,
      completionHandler: completionHandler
    )
  }

  func application(
    _ application: UIApplication,
    handleEventsForBackgroundURLSession identifier: String,
    completionHandler: @escaping () -> Void
  ) {
    lifecycleDelegate.application(
      application,
      handleEventsForBackgroundURLSession: identifier,
      completionHandler: completionHandler
    )
  }

  func application(
    _ application: UIApplication,
    performFetchWithCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
  ) {
    lifecycleDelegate.application(
      application,
      performFetchWithCompletionHandler: completionHandler
    )
  }

  func add(_ delegate: FlutterApplicationLifeCycleDelegate) {
    lifecycleDelegate.add(delegate)
  }
}
```

</Tab>
<Tab name="Objective-C">

```objc title="AppDelegate.h"
@import Flutter;
@import UIKit;
@import FlutterPluginRegistrant;

@interface AppDelegate : UIResponder <UIApplicationDelegate, FlutterAppLifeCycleProvider>
@property (strong, nonatomic) UIWindow *window;
@property (nonatomic, strong) FlutterEngine *flutterEngine;
@end
```

```objc title="AppDelegate.m"
#import "AppDelegate.h"

@interface AppDelegate ()
@property (nonatomic, strong) FlutterPluginAppLifeCycleDelegate *lifeCycleDelegate;
@end

@implementation AppDelegate

- (instancetype)init {
  if (self = [super init]) {
    _lifeCycleDelegate = [[FlutterPluginAppLifeCycleDelegate alloc] init];
  }
  return self;
}

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> *)launchOptions {
  self.flutterEngine = [[FlutterEngine alloc] initWithName:@"io.flutter" project:nil];
  [self.flutterEngine runWithEntrypoint:nil];
  [GeneratedPluginRegistrant registerWithRegistry:self.flutterEngine];
  return [_lifeCycleDelegate application:application didFinishLaunchingWithOptions:launchOptions];
}

// Returns the key window's rootViewController, if it's a FlutterViewController.
// Otherwise, returns nil.
- (FlutterViewController *)rootFlutterViewController {
  UIViewController *viewController = [UIApplication sharedApplication].keyWindow.rootViewController;
  if ([viewController isKindOfClass:[FlutterViewController class]]) {
    return (FlutterViewController *)viewController;
  }
  return nil;
}

- (void)application:(UIApplication *)application
    didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  [_lifeCycleDelegate application:application
      didRegisterUserNotificationSettings:notificationSettings];
}

- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [_lifeCycleDelegate application:application
      didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application
    didReceiveRemoteNotification:(NSDictionary *)userInfo
          fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
  [_lifeCycleDelegate application:application
     didReceiveRemoteNotification:userInfo
           fetchCompletionHandler:completionHandler];
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
  return [_lifeCycleDelegate application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url {
  return [_lifeCycleDelegate application:application handleOpenURL:url];
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [_lifeCycleDelegate application:application
                                 openURL:url
                       sourceApplication:sourceApplication
                              annotation:annotation];
}

- (void)application:(UIApplication *)application
    performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem
               completionHandler:(void (^)(BOOL succeeded))completionHandler {
  [_lifeCycleDelegate application:application
     performActionForShortcutItem:shortcutItem
                completionHandler:completionHandler];
}

- (void)application:(UIApplication *)application
    handleEventsForBackgroundURLSession:(nonnull NSString *)identifier
                      completionHandler:(nonnull void (^)(void))completionHandler {
  [_lifeCycleDelegate application:application
      handleEventsForBackgroundURLSession:identifier
                        completionHandler:completionHandler];
}

- (void)application:(UIApplication *)application
    performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
  [_lifeCycleDelegate application:application performFetchWithCompletionHandler:completionHandler];
}

- (void)addApplicationLifeCycleDelegate:(NSObject<FlutterPlugin> *)delegate {
  [_lifeCycleDelegate addDelegate:delegate];
}
@end
```

</Tab>
</Tabs>

### 使用 FlutterSceneDelegate

與 `FlutterAppDelegate` 類似，
建議（但非必須）繼承 `FlutterSceneDelegate`。
`FlutterSceneDelegate` 會將 [`scene(_:openURLContexts:)`][]
與 [`scene(_:continue:)`][] 等 scene 回呼（callback）
轉發給 [`local_auth`][] 等插件。

#### 建立或更新 SceneDelegate

在 UIKit 應用程式中，請將你的 `SceneDelegate` 改為繼承
`FlutterSceneDelegate`：

<Tabs key="ios-framework-switcher">
<Tab name="UIKit-Swift">

```swift title="SceneDelegate.swift" diff
  import UIKit
+ import Flutter

- class SceneDelegate: UIResponder, UIWindowSceneDelegate {
+ class SceneDelegate: FlutterSceneDelegate {
```

</Tab>
<Tab name="UIKit-ObjC">

```objc title="SceneDelegate.h" diff
  #import <UIKit/UIKit.h>
+ #import <Flutter/Flutter.h>

- @interface SceneDelegate : UIResponder <UIWindowSceneDelegate>
+ @interface SceneDelegate : FlutterSceneDelegate
```

</Tab>
<Tab name="SwiftUI">

在 SwiftUI 應用程式中，請在
`application(_:configurationForConnecting:options:)` 中設定 scene delegate 類別，
如 [FlutterAppDelegate SwiftUI 範例][FlutterAppDelegate SwiftUI example]所示。

如果你的應用程式不支援多個 scene，
請在 target 的 `Info.plist` 中，於 **Application Scene Manifest** 底下
將 **Enable Multiple Scenes**（`UIApplicationSupportsMultipleScenes`）設為 **NO**。

</Tab>
</Tabs>

#### 如果你無法繼承 FlutterSceneDelegate

如果你的 `SceneDelegate` 無法繼承 `FlutterSceneDelegate`，
請採用 `FlutterSceneLifeCycleProvider` protocol，並使用
`FlutterPluginSceneLifeCycleDelegate` 物件，將
scene 生命週期事件轉發給 Flutter：

<Tabs key="ios-language-switcher">
<Tab name="Swift">

```swift title="SceneDelegate.swift" diff
  import UIKit
+ import Flutter

- class SceneDelegate: UIResponder, UIWindowSceneDelegate {
+ class SceneDelegate: UIResponder, UIWindowSceneDelegate, FlutterSceneLifeCycleProvider {
+   var sceneLifeCycleDelegate = FlutterPluginSceneLifeCycleDelegate()

    var window: UIWindow?

    func scene(
      _ scene: UIScene,
      willConnectTo session: UISceneSession,
      options connectionOptions: UIScene.ConnectionOptions
    ) {
+     sceneLifeCycleDelegate.scene(
+       scene,
+       willConnectTo: session,
+       options: connectionOptions
+     )
    }

    func sceneDidDisconnect(_ scene: UIScene) {
+     sceneLifeCycleDelegate.sceneDidDisconnect(scene)
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
+     sceneLifeCycleDelegate.sceneWillEnterForeground(scene)
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
+     sceneLifeCycleDelegate.sceneDidBecomeActive(scene)
    }

    func sceneWillResignActive(_ scene: UIScene) {
+     sceneLifeCycleDelegate.sceneWillResignActive(scene)
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
+     sceneLifeCycleDelegate.sceneDidEnterBackground(scene)
    }

    func scene(
      _ scene: UIScene,
      openURLContexts URLContexts: Set<UIOpenURLContext>
    ) {
+     sceneLifeCycleDelegate.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
+     sceneLifeCycleDelegate.scene(scene, continue: userActivity)
    }

    func windowScene(
      _ windowScene: UIWindowScene,
      performActionFor shortcutItem: UIApplicationShortcutItem,
      completionHandler: @escaping (Bool) -> Void
    ) {
+     sceneLifeCycleDelegate.windowScene(
+       windowScene,
+       performActionFor: shortcutItem,
+       completionHandler: completionHandler
+     )
    }
  }
```

</Tab>
<Tab name="Objective-C">

```objc title="SceneDelegate.h" diff
  #import <UIKit/UIKit.h>
+ #import <Flutter/Flutter.h>

- @interface SceneDelegate : UIResponder <UIWindowSceneDelegate>
+ @interface SceneDelegate : UIResponder <UIWindowSceneDelegate, FlutterSceneLifeCycleProvider>

  @property (strong, nonatomic) UIWindow *window;

+ @property (nonatomic, strong) FlutterPluginSceneLifeCycleDelegate *sceneLifeCycleDelegate;

  @end
```

```objc title="SceneDelegate.m" diff
  #import "SceneDelegate.h"

  @implementation SceneDelegate

  - (instancetype)init {
    if (self = [super init]) {
+     _sceneLifeCycleDelegate = [[FlutterPluginSceneLifeCycleDelegate alloc] init];
    }
    return self;
  }

  - (void)scene:(UIScene *)scene
      willConnectToSession:(UISceneSession *)session
                   options:(UISceneConnectionOptions *)connectionOptions {
+   [self.sceneLifeCycleDelegate scene:scene willConnectToSession:session options:connectionOptions];
  }

  - (void)sceneDidDisconnect:(UIScene *)scene {
+   [self.sceneLifeCycleDelegate sceneDidDisconnect:scene];
  }

  - (void)sceneDidBecomeActive:(UIScene *)scene {
+   [self.sceneLifeCycleDelegate sceneDidBecomeActive:scene];
  }

  - (void)sceneWillResignActive:(UIScene *)scene {
+   [self.sceneLifeCycleDelegate sceneWillResignActive:scene];
  }

  - (void)sceneWillEnterForeground:(UIScene *)scene {
+   [self.sceneLifeCycleDelegate sceneWillEnterForeground:scene];
  }

  - (void)sceneDidEnterBackground:(UIScene *)scene {
+   [self.sceneLifeCycleDelegate sceneDidEnterBackground:scene];
  }

  - (void)scene:(UIScene *)scene openURLContexts:(NSSet<UIOpenURLContext *> *)URLContexts {
+   [self.sceneLifeCycleDelegate scene:scene openURLContexts:URLContexts];
  }

  - (void)scene:(UIScene *)scene continueUserActivity:(NSUserActivity *)userActivity {
+   [self.sceneLifeCycleDelegate scene:scene continueUserActivity:userActivity];
  }

  - (void)windowScene:(UIWindowScene *)windowScene
      performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem
                 completionHandler:(void (^)(BOOL))completionHandler {
+   [self.sceneLifeCycleDelegate windowScene:windowScene
+               performActionForShortcutItem:shortcutItem
+                          completionHandler:completionHandler];
  }

  @end
```

</Tab>
</Tabs>

## 啟動選項

這些範例展示了如何使用預設的啟動設定來執行 Flutter。

若你需要自訂 Flutter 執行時環境，
也可以指定 Dart 的 entrypoint（進入點）、library（函式庫）以及 route（路由）。

### Dart entrypoint（進入點）

在 `FlutterEngine` 上呼叫 `run`，預設會執行
`lib/main.dart` 檔案中的 `main()` Dart 函式。

你也可以透過 [`runWithEntrypoint`][] 並傳入包含
不同 Dart 函式名稱的 `NSString`，來執行其他 entrypoint 函式。

:::note
若 Dart entrypoint 函式不是 `main()`，
則必須加上以下標記，才能在編譯時避免被 [tree-shaken][] 移除：

```dart
@pragma('vm:entry-point')
void myOtherEntrypoint() { ... };
```
:::

### Dart 函式庫

除了可以指定 Dart 函式外，你也可以在特定檔案中指定進入點（entrypoint）函式。

例如，下列程式碼會在 `lib/other_file.dart` 執行 `myOtherEntrypoint()`，而不是在 `lib/main.dart` 執行 `main()`：

<Tabs key="darwin-language">
<Tab name="Swift">

```swift
flutterEngine.run(withEntrypoint: "myOtherEntrypoint", libraryURI: "other_file.dart")
```

</Tab>
<Tab name="Objective-C">

```objc
[flutterEngine runWithEntrypoint:@"myOtherEntrypoint" libraryURI:@"other_file.dart"];
```

</Tab>
</Tabs>


### Route

從 Flutter 1.22 版本開始，在建立 Flutter
[`WidgetsApp`][] 時，可以為 FlutterEngine 或 FlutterViewController 設定初始 Route（路由）。

<Tabs key="darwin-language">
<Tab name="Swift">

```swift
let flutterEngine = FlutterEngine()
// FlutterDefaultDartEntrypoint is the same as nil, which will run main().
engine.run(
  withEntrypoint: "main", initialRoute: "/onboarding")
```

</Tab>
<Tab name="Objective-C">

```objc
FlutterEngine *flutterEngine = [[FlutterEngine alloc] init];
// FlutterDefaultDartEntrypoint is the same as nil, which will run main().
[flutterEngine runWithEntrypoint:FlutterDefaultDartEntrypoint
                    initialRoute:@"/onboarding"];
```

</Tab>
</Tabs>

這段程式碼會將你的 `dart:ui` 的 [`PlatformDispatcher.defaultRouteName`][]
設為 `"/onboarding"`，而不是 `"/"`。

另外，如果你想直接建立一個 FlutterViewController，而不需要預先啟動
FlutterEngine，可以這麼做：

<Tabs key="darwin-language">
<Tab name="Swift">

```swift
let flutterViewController = FlutterViewController(
      project: nil, initialRoute: "/onboarding", nibName: nil, bundle: nil)
```

</Tab>
<Tab name="Objective-C">

```objc
FlutterViewController* flutterViewController =
      [[FlutterViewController alloc] initWithProject:nil
                                        initialRoute:@"/onboarding"
                                             nibName:nil
                                              bundle:nil];
```

</Tab>
</Tabs>

:::tip
如果你想在 `FlutterEngine` 已經執行後，從平台端以命令式方式變更目前的 Flutter Route，請在 `FlutterViewController` 上使用 [`pushRoute()`][]
或 [`popRoute()`][]。

若要從 Flutter 端 pop 掉 iOS 的 Route，請呼叫 [`SystemNavigator.pop()`][]。
:::

如需更多關於 Flutter Route 的資訊，請參閱 [Navigation and routing][]。

### 其他

前述範例僅說明了自訂 Flutter 實例啟動方式的幾種方法。透過 [platform channels][]，你可以在使用 `FlutterViewController` 呈現 Flutter UI 之前，以任何你想要的方式推送資料或準備 Flutter 執行環境。

## 依內容調整大小的視圖

在 iOS 上，你也可以將嵌入的 `FlutterView` 設定為依據其內容自動調整大小。

<Tabs key="darwin-language">
<Tab name="Swift">

```swift
let flutterViewController = FlutterViewController(engine: engine, nibName: nil, bundle: nil)
flutterViewController.isAutoResizable = true
```

</Tab>
<Tab name="Objective-C">

```objc
_flutterViewController = [[FlutterViewController alloc] initWithEngine:engine nibName:nil bundle:nil];
_flutterViewController.autoResizable = YES;
```

</Tab>
</Tabs>

### 限制

若要使用此功能，你的根元件 (Widget) 必須支援無限制約束。請避免在元件樹的頂層使用需要有界約束的元件（如 `ListView` 或 `LayoutBuilder`），因為這些元件可能與動態調整大小的邏輯產生衝突。

在實際使用中，這意味著許多常見元件並不支援，
例如 `ScaffoldBuilder`、`CupertinoTimerPicker`，
或任何在內部依賴 `LayoutBuilder` 的元件。
如有疑問，你可以使用 `UnconstrainedBox` 來測試某個元件是否適用於依內容調整大小的視圖，如以下範例所示：

```dart
import 'package:material_ui/material_ui.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context)
  => MaterialApp(home: MyPage());
}

class MyPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: UnconstrainedBox(
          // TODO: Edit this line to check if a widget
          // can cause problems with content-sized views.
          child: Text('This works!'),
          // child: Column(children: [Column(children: [Expanded(child: Text('This blows up!'))])]),
          // child: ListView(children: [Text('This blows up!')]),
        )
    );
  }
}
```
如需可運行的範例，請參閱此[範例專案][sample project]。

[`FlutterEngine`]: https://api.flutter.dev/ios-embedder/interface_flutter_engine.html
[`FlutterViewController`]:
https://api.flutter.dev/ios-embedder/interface_flutter_view_controller.html
[Loading sequence and performance]: /add-to-app/performance
[local_auth]: https://pub.dev/packages/local_auth
[Navigation and routing]: /ui/navigation
[Navigator]: https://api.flutter.dev/flutter/widgets/Navigator-class.html
[`NavigatorState`]: https://api.flutter.dev/flutter/widgets/NavigatorState-class.html
[`openURL`]:
https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623112-application
[platform channels]: /platform-integration/platform-channels
[`popRoute()`]:
https://api.flutter.dev/ios-embedder/interface_flutter_view_controller.html#ac89c8010fbf7a39f7aaab64f68c013d2
[`pushRoute()`]:
https://api.flutter.dev/ios-embedder/interface_flutter_view_controller.html#ac7cffbf03f9c8c0b28d1f0dafddece4e
[`runApp`]: https://api.flutter.dev/flutter/widgets/runApp.html
[`runWithEntrypoint`]:
https://api.flutter.dev/ios-embedder/interface_flutter_engine.html#a019d6b3037eff6cfd584fb2eb8e9035e
[`SystemNavigator.pop()`]:
https://api.flutter.dev/flutter/services/SystemNavigator/pop.html
[`scene(_:openURLContexts:)`]:
https://developer.apple.com/documentation/uikit/uiscenedelegate/scene(_:openurlcontexts:)
[`scene(_:continue:)`]:
https://developer.apple.com/documentation/uikit/uiscenedelegate/scene(_:continue:)
[UIScene migration guide]:
/release/breaking-changes/uiscenedelegate#migration-guide-for-adding-flutter-to-existing-app-add-to-app
[FlutterAppDelegate SwiftUI example]: #create-a-flutterappdelegate-subclass
[`local_auth`]: https://pub.dev/packages/local_auth
[tree-shaken]: https://en.wikipedia.org/wiki/Tree_shaking
[`WidgetsApp`]: https://api.flutter.dev/flutter/widgets/WidgetsApp-class.html
[`PlatformDispatcher.defaultRouteName`]:
https://api.flutter.dev/flutter/dart-ui/PlatformDispatcher/defaultRouteName.html
[Start a FlutterEngine and FlutterViewController section]: /add-to-app/ios/add-flutter-screen#start-a-flutterengine-and-flutterviewcontroller
[`Observable`]: https://developer.apple.com/documentation/observation/observable
[`NavigationLink`]: https://developer.apple.com/documentation/swiftui/navigationlink
[`Observable()`]: https://developer.apple.com/documentation/observation/observable()
[sample project]:
https://github.com/flutter/samples/tree/main/add_to_app/ios_content_resizing

