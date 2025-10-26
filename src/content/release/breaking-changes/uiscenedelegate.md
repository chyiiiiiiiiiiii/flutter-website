---
title: 採用 UISceneDelegate
description: >
  給 Flutter iOS 開發者的 Apple UISceneDelegate protocol 採用指南。
---

{% render docs/breaking-changes.md %}

:::note
這是一項即將到來但尚未最終定案或實作的重大變更。目前的細節屬於暫定版本，未來可能會有所調整。隨著變更接近實作階段，將會有進一步的公告。
:::

## 摘要

Apple 現在要求 iOS 開發者採用 UIScene 生命週期。
這項遷移會影響 [應用程式啟動流程]({{site.apple-dev}}/documentation/uikit/about-the-app-launch-sequence)
以及 [應用程式生命週期]({{site.apple-dev}}/documentation/uikit/managing-your-app-s-life-cycle)。

## 背景

在 WWDC25 期間，Apple
[宣布]({{site.apple-dev}}/videos/play/wwdc2025/243/?time=1317)
如下內容：
> 在 iOS 26 之後的版本中，任何使用最新 SDK 建置的 UIKit 應用程式都必須使用 UIScene 生命週期，否則將無法啟動。

若要在 Flutter 中使用 UIScene 生命週期，請遷移下列支援內容：
* 所有支援 iOS 的 Flutter 應用程式－請參閱 [Flutter 應用程式遷移指南](/release/breaking-changes/uiscenedelegate/#migration-guide-for-flutter-apps)
* 使用 iOS 應用程式生命週期事件的 Flutter 套件－請參閱 [套件遷移指南](/release/breaking-changes/uiscenedelegate/#migration-guide-for-flutter-plugins)
* 在 iOS 原生應用程式中嵌入 Flutter－請參閱 [將 Flutter 加入現有應用程式的遷移指南](/release/breaking-changes/uiscenedelegate/#migration-guide-for-adding-flutter-to-existing-app-add-to-app)

遷移至 UIScene 會改變 AppDelegate 的角色——UI 生命週期現在由 UISceneDelegate 處理。AppDelegate
仍然負責處理程序事件以及整體應用程式生命週期。所有與 UI 相關的邏輯都應從 AppDelegate 移至對應的 UISceneDelegate 方法。遷移到 UIScene 之後，
UIKit 將不再呼叫與 UI 狀態相關的 AppDelegate 方法。

## Flutter 應用程式的遷移指南

### 自動遷移（實驗性）

如果您的 AppDelegate 沒有自訂過，Flutter CLI 可以自動為您的應用程式進行遷移。

1. 啟用 UIScene 遷移功能

```console
flutter config --enable-uiscene-migration
```

2. 建置或執行您的應用程式

```console
flutter run
or
flutter build ios
```

如果遷移成功，你會看到一條日誌顯示「Finished migration to UIScene lifecycle」。否則，系統會提醒你需依照附帶的說明手動遷移。如果遷移成功，則無需進一步操作！

### 遷移 AppDelegate

過去，Flutter 外掛（plugin）會在`application:didFinishLaunchingWithOptions:`中註冊。為了配合新的應用程式啟動流程，外掛註冊現在必須在一個新的回呼函式 `didInitializeImplicitFlutterEngine` 中處理。

1. 新增 `FlutterImplicitEngineDelegate`，並移動 `GeneratedPluginRegistrant`。

```swift  title="my_app/ios/Runner/AppDelegate.swift" diff
- @objc class AppDelegate: FlutterAppDelegate {
+ @objc class AppDelegate: FlutterAppDelegate, FlutterImplicitEngineDelegate {
    override func application(
      _ application: UIApplication,
      didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
-     GeneratedPluginRegistrant.register(with: self)
      return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
  }

+ func didInitializeImplicitFlutterEngine(_ engineBridge: FlutterImplicitEngineBridge) {
+   GeneratedPluginRegistrant.register(with: engineBridge.pluginRegistry)
+ }
}
```
```objc title="my_app/ios/Runner/AppDelegate.h" diff
- @interface AppDelegate : FlutterAppDelegate
+ @interface AppDelegate : FlutterAppDelegate <FlutterImplicitEngineDelegate>
```
```objc title="my_app/ios/Runner/AppDelegate.m" diff
  - (BOOL)application:(UIApplication *)application
      didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
-    [GeneratedPluginRegistrant registerWithRegistry:self];
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
  }

+ - (void)didInitializeImplicitFlutterEngine:(NSObject<FlutterImplicitEngineBridge>*)engineBridge {
+   [GeneratedPluginRegistrant registerWithRegistry:engineBridge.pluginRegistry];
+ }
```

2. 如果適用，請在`didInitializeImplicitFlutterEngine`中建立 method channels（方法通道）與 platform views（平台視圖）。

如果你之前是在`application:didFinishLaunchingWithOptions:`中建立 [method channels][platform-views-docs] 或 [platform views][platform-views-docs]，請將相關邏輯移至`didInitializeImplicitFlutterEngine`。

```swift
  func didInitializeImplicitFlutterEngine(_ engineBridge: FlutterImplicitEngineBridge) {
    // Register plugins with `engineBridge.pluginRegistry`
    GeneratedPluginRegistrant.register(with: engineBridge.pluginRegistry)

    // Create method channels with `engineBridge.applicationRegistrar.messenger()`
    let batteryChannel = FlutterMethodChannel(
      name: "samples.flutter.dev/battery",
      binaryMessenger: engineBridge.applicationRegistrar.messenger()
    )

    // Create platform views with `engineBridge.applicationRegistrar.messenger()`
    let factory = FLNativeViewFactory(messenger: engineBridge.applicationRegistrar.messenger())
  }
```

```objc
  func didInitializeImplicitFlutterEngine:(NSObject<FlutterImplicitEngineBridge>*)engineBridge {
    // Register plugins with `engineBridge.pluginRegistry`
    [GeneratedPluginRegistrant registerWithRegistry:engineBridge.pluginRegistry];

    // Create method channels with `engineBridge.applicationRegistrar.messenger`
    FlutterMethodChannel* batteryChannel = [FlutterMethodChannel
                                          methodChannelWithName:@"samples.flutter.dev/battery"
                                          binaryMessenger:engineBridge.applicationRegistrar.messenger];

    // Create platform views with `engineBridge.applicationRegistrar.messenger`
    FLNativeViewFactory* factory =
      [[FLNativeViewFactory alloc] initWithMessenger:engineBridge.applicationRegistrar.messenger];
  }
```

:::warning
如果你嘗試在`application:didFinishLaunchingWithOptions:`中存取`FlutterViewController`，可能會導致應用程式當機。請改用`FlutterImplicitEngineDelegate`協定（protocol）。

```swift
// BAD
let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
```

若要直接存取 `FlutterViewController`，請參閱
[Bespoke FlutterViewController
usage](/release/breaking-changes/uiscenedelegate/#bespoke-flutterviewcontroller-usage)。
:::

3. 遷移應用程式生命週期事件中的自訂邏輯。

Apple 已棄用與 UI 狀態相關的應用程式生命週期事件。完成遷移至 UIScene 生命週期後，UIKit 將不再呼叫這些事件。

如果你曾經使用這些已棄用的 API，例如
[`applicationDidBecomeActive`]({{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/applicationdidbecomeactive(_:))，
你很可能需要建立一個 SceneDelegate，並遷移至 scene 生命週期事件。請參考 [Apple 的
文件]({{site.apple-dev}}/documentation/technotes/tn3187-migrating-to-the-uikit-scene-based-life-cycle)
以了解遷移方式。

如果你自行實作 SceneDelegate，必須以 `FlutterSceneDelegate` 為子類別，或遵循 `FlutterSceneLifeCycleProvider`
協定（protocol）。請參考[以下範例](/release/breaking-changes/uiscenedelegate/#createupdate-a-scenedelegate-uikit)。

### 遷移 Info.plist

為完成遷移至 UIScene 生命週期，請在 Info.plist 中新增 `Application Scene
Manifest`。

在 Xcode 編輯器中的顯示如下：

![Xcode plist editor for
UIApplicationSceneManifest](/assets/images/docs/breaking-changes/uiscenedelegate-plist.png)

XML 格式如下：

```xml title="Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
 <key>UIApplicationSceneManifest</key>
 <dict>
  <key>UIApplicationSupportsMultipleScenes</key>
  <false/>
  <key>UISceneConfigurations</key>
  <dict>
  <key>UIWindowSceneSessionRoleApplication</key>
    <array>
      <dict>
        <key>UISceneClassName</key>
        <string>UIWindowScene</string>
        <key>UISceneDelegateClassName</key>
        <string>FlutterSceneDelegate</string>
        <key>UISceneConfigurationName</key>
        <string>flutter</string>
        <key>UISceneStoryboardFile</key>
        <string>Main</string>
      </dict>
    </array>
   </dict>
 </dict>
</dict>
```

### 建立 SceneDelegate（選用）

如果你需要存取 `SceneDelegate`，可以透過繼承 `FlutterSceneDelegate` 來建立一個。

1. 在 Xcode 中開啟你的應用程式
2. 於 **Runner** 資料夾上按右鍵，選擇 **New Empty File**

![Xcode 中的 New Empty File 選項](/assets/images/docs/breaking-changes/uiscene-new-file.png)

若為 Swift 專案，請建立 `SceneDelegate.swift`：

```swift title=my_app/ios/Runner/SceneDelegate.swift
import Flutter
import UIKit

class SceneDelegate: FlutterSceneDelegate {

}
```

對於 Objective-C 專案，請建立 `SceneDelegate.h` 和 `SceneDelegate.m`：

```objc title=my_app/ios/Runner/SceneDelegate.h
#import <Flutter/Flutter.h>
#import <UIKit/UIKit.h>

@interface SceneDelegate : FlutterSceneDelegate

@end
```

```objc title=my_app/ios/Runner/SceneDelegate.m
#import "SceneDelegate.h"

@implementation SceneDelegate

@end
```

3. 將 Info.plist 中的 "Delegate Class Name"（`UISceneDelegateClassName`）從 `FlutterSceneDelegate`
變更為 `$(PRODUCT_MODULE_NAME).SceneDelegate`。

## Flutter 插件的遷移指南

並非所有插件都會使用生命週期事件。不過，如果你的插件有使用這些事件，
你就需要遷移到 UIKit 的基於 scene 的生命週期。

1. 實作 `FlutterSceneLifeCycleDelegate` protocol

```swift diff
- public final class MyPlugin: NSObject, FlutterPlugin {
+ public final class MyPlugin: NSObject, FlutterPlugin, FlutterSceneLifeCycleDelegate {
```

```objc diff
- @interface MyPlugin : NSObject<FlutterPlugin>
+ @interface MyPlugin : NSObject<FlutterPlugin, FlutterSceneLifeCycleDelegate>
```

2. 將該插件註冊為`UISceneDelegate`呼叫的接收者。

為了持續支援尚未遷移至 UIScene 生命週期的應用程式，您可以考慮繼續註冊至 App Delegate，並同時保留 App Delegate 的事件處理。

```swift diff
  public static func register(with registrar: FlutterPluginRegistrar) {
    ...
    registrar.addApplicationDelegate(instance)
+   registrar.addSceneDelegate(instance)
  }
```

```objc diff
  + (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar> *)registrar {
    ...
    [registrar addApplicationDelegate:instance];
+   [registrar addSceneDelegate:instance];
  }
```

3. 為您的 plugin 新增一個或多個所需的 scene 事件。

大多數 App Delegate UI 事件都有一對一的對應替代項。若需查看每個事件的詳細資訊，請參閱 Apple 的
[UISceneDelegate]({{site.apple-dev}}/documentation/uikit/uiscenedelegate)
及
[UIWindowSceneDelegate]({{site.apple-dev}}/documentation/uikit/uiwindowscenedelegate)
官方文件。


```swift
public func scene(
  _ scene: UIScene,
  willConnectTo session: UISceneSession,
  options connectionOptions: UIScene.ConnectionOptions?
) -> Bool { }

public func sceneDidDisconnect(_ scene: UIScene) { }

public func sceneWillEnterForeground(_ scene: UIScene) { }

public func sceneDidBecomeActive(_ scene: UIScene) { }

public func sceneWillResignActive(_ scene: UIScene) { }

public func sceneDidEnterBackground(_ scene: UIScene) { }

public func scene(
    _ scene: UIScene,
    openURLContexts URLContexts: Set<UIOpenURLContext>
  ) -> Bool { }

public func scene(_ scene: UIScene, continue userActivity: NSUserActivity)
    -> Bool { }

public func windowScene(
    _ windowScene: UIWindowScene,
    performActionFor shortcutItem: UIApplicationShortcutItem,
    completionHandler: @escaping (Bool) -> Void
  ) -> Bool { }
```

```objc
- (BOOL)scene:(UIScene*)scene
    willConnectToSession:(UISceneSession*)session
                 options:(nullable UISceneConnectionOptions*)connectionOptions;

- (void)sceneDidDisconnect:(UIScene*)scene { }

- (void)sceneWillEnterForeground:(UIScene*)scene { }

- (void)sceneDidBecomeActive:(UIScene*)scene { }

- (void)sceneWillResignActive:(UIScene*)scene { }

- (void)sceneDidEnterBackground:(UIScene*)scene { }

- (BOOL)scene:(UIScene*)scene openURLContexts:(NSSet<UIOpenURLContext*>*)URLContexts { }

- (BOOL)scene:(UIScene*)scene continueUserActivity:(NSUserActivity*)userActivity { }

- (BOOL)windowScene:(UIWindowScene*)windowScene
    performActionForShortcutItem:(UIApplicationShortcutItem*)shortcutItem
               completionHandler:(void (^)(BOOL succeeded))completionHandler { }
```

4. 將啟動邏輯從 `application:willFinishLaunchingWithOptions:` 和
`application:didFinishLaunchingWithOptions:` 移至
`scene:willConnectToSession:options:`。

儘管 `application:willFinishLaunchingWithOptions:` 和
`application:didFinishLaunchingWithOptions:` 尚未被棄用，在
遷移至 UIScene 生命週期後，啟動選項將會是 `nil`。任何在此處與啟動選項相關的邏輯，都應該移至
`scene:willConnectToSession:options:` 事件。

## 將 Flutter 加入現有應用程式（Add to App）的遷移指南

與 `FlutterAppDelegate` 類似，建議但不強制使用 `FlutterSceneDelgate`。`FlutterSceneDelgate` 會將場景回呼（scene callbacks），例如
[`openURL`][`openURL`]，轉發給像 [local_auth][local_auth] 這樣的插件（plugin）。

### 建立／更新 SceneDelegate（UIKit）

```swift diff
  import UIKit
+ import Flutter

- class SceneDelegate: UIResponder, UIWindowSceneDelegate {
+ class SceneDelegate: FlutterSceneDelegate {
```

```objc diff
- @interface SceneDelegate : UIResponder <UIWindowSceneDelegate>
+ @interface SceneDelegate : FlutterSceneDelegate
```


### 建立或更新 SceneDelegate（SwiftUI）

當你在 SwiftUI 應用程式中使用 Flutter 時，可以[選擇性地使用 FlutterAppDelegate](/add-to-app/ios/add-flutter-screen#using-the-flutterappdelegate)來接收應用程式事件。若要將其遷移為使用 UIScene 事件，可以進行以下變更：

1. 在`application:configurationForConnecting:options:`中，將 Scene Delegate 設定為`FlutterSceneDelegate`。

```swift diff
  @Observable
  class AppDelegate: FlutterAppDelegate {
    ...
+   override func application(
+     _ application: UIApplication,
+     configurationForConnecting connectingSceneSession: UISceneSession,
+     options: UIScene.ConnectionOptions
+   ) -> UISceneConfiguration {
+     let configuration = UISceneConfiguration(
+       name: nil,
+       sessionRole: connectingSceneSession.role
+     )
+     configuration.delegateClass = FlutterSceneDelegate.self
+     return configuration
+   }
  }
```

2. 如果你的應用程式不支援多重場景（multiple scenes），請在目標的 Info 屬性中的 `Application Scene Manifest` 下，將 `Enable Multiple Scenes` 設定為 `NO`。對於 SwiftUI 應用程式，此設定預設為啟用。

![Xcode plist editor for
UIApplicationSceneManifest](/assets/images/docs/breaking-changes/uiscenedelegate-swiftui-info-plist.png)

否則，請參閱 [If your app supports multiple
scenes](/release/breaking-changes/uiscenedelegate/#if-your-app-supports-multiple-scenes)
以取得進一步的指引。

### 如果你無法直接讓 FlutterSceneDelegate 成為子類別

如果你無法直接讓 `FlutterSceneDelegate` 成為子類別，你可以使用 `FlutterSceneLifeCycleProvider` 協定（protocol）以及 `FlutterPluginSceneLifeCycleDelegate` 物件，將場景生命週期事件轉發給 Flutter。

```swift title="SceneDelegate.swift" diff
  import Flutter
  import UIKit

- class SceneDelegate: UIResponder, UIWindowSceneDelegate
+ class SceneDelegate: UIResponder, UIWindowSceneDelegate, FlutterSceneLifeCycleProvider
  {
+   var sceneLifeCycleDelegate: FlutterPluginSceneLifeCycleDelegate =
+     FlutterPluginSceneLifeCycleDelegate()

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
```objc title="SceneDelegate.h" diff
- @interface SceneDelegate : UIResponder <UIWindowSceneDelegate>
+ @interface SceneDelegate : UIResponder <UIWindowSceneDelegate, FlutterSceneLifeCycleProvider>

  @property(strong, nonatomic) UIWindow* window;

+ @property (nonatomic,strong) FlutterPluginSceneLifeCycleDelegate *sceneLifeCycleDelegate;

  @end
```
```objc title="SceneDelegate.m" diff
  @implementation SceneDelegate

  - (instancetype)init {
      if (self = [super init]) {
+         _sceneLifeCycleDelegate = [[FlutterPluginSceneLifeCycleDelegate alloc] init];
      }
      return self;
  }

  - (void)scene:(UIScene*)scene
      willConnectToSession:(UISceneSession*)session
                  options:(UISceneConnectionOptions*)connectionOptions {
+   [self.sceneLifeCycleDelegate scene:scene willConnectToSession:session options:connectionOptions];
  }

  - (void)sceneDidDisconnect:(UIScene*)scene {
+   [self.sceneLifeCycleDelegate sceneDidDisconnect:scene];
  }

  - (void)sceneDidBecomeActive:(UIScene*)scene {
+   [self.sceneLifeCycleDelegate sceneDidBecomeActive:scene];
  }

  - (void)sceneWillResignActive:(UIScene*)scene {
+   [self.sceneLifeCycleDelegate sceneWillResignActive:scene];
  }

  - (void)sceneWillEnterForeground:(UIScene*)scene {
+   [self.sceneLifeCycleDelegate sceneWillEnterForeground:scene];
  }

  - (void)sceneDidEnterBackground:(UIScene*)scene {
+   [self.sceneLifeCycleDelegate sceneDidEnterBackground:scene];
  }

  - (void)scene:(UIScene *)scene openURLContexts:(NSSet<UIOpenURLContext *> *)URLContexts {
+   [self.sceneLifeCycleDelegate scene:scene openURLContexts:URLContexts];
  }

  - (void)scene:(UIScene *)scene continueUserActivity:(NSUserActivity *)userActivity {
+   [self.sceneLifeCycleDelegate scene:scene continueUserActivity:userActivity];
  }

  - (void)windowScene:(UIWindowScene *)windowScene performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem completionHandler:(void (^)(BOOL))completionHandler {
+   [self.sceneLifeCycleDelegate windowScene:windowScene performActionForShortcutItem:shortcutItem completionHandler:completionHandler];
  }
```

### 如果你的應用程式支援多個場景

當啟用多個場景（UIApplicationSupportsMultipleScenes）時，Flutter 無法在場景連接階段自動將 `UIApplicationSupportsMultipleScenes` 與場景關聯。  
為了讓插件能夠接收到啟動連線資訊，必須在 `FlutterSceneDelegate` 期間，手動將 `FlutterEngine` 註冊到 `scene:willConnectToSession:options:` 或 `FlutterEngine`。  
否則，一旦由 `FlutterPluginSceneLifeCycleDelegate` 和 `FlutterViewController` 建立的視圖被加入到視圖階層中，`FlutterEngine` 就會自動註冊場景事件。

```swift title="SceneDelegate.swift"
import Flutter
import FlutterPluginRegistrant
import UIKit

class SceneDelegate: FlutterSceneDelegate {
  let flutterEngine = FlutterEngine(name: "my flutter engine")

  override func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = scene as? UIWindowScene else { return }
    window = UIWindow(windowScene: windowScene)

    flutterEngine.run()
    GeneratedPluginRegistrant.register(with: flutterEngine)

    // If using FlutterSceneDelegate:
    self.registerSceneLifeCycle(with: flutterEngine)

    // If using FlutterSceneLifeCycleProvider:
    // sceneLifeCycleDelegate.registerSceneLifeCycle(with: flutterEngine)

    let viewController = ViewController(engine: flutterEngine)
    window?.rootViewController = viewController
    window?.makeKeyAndVisible()
    super.scene(scene, willConnectTo: session, options: connectionOptions)
  }
}
```
```objc title="SceneDelegate.h"
#import <UIKit/UIKit.h>
#import <Flutter/Flutter.h>
#import <FlutterPluginRegistrant/GeneratedPluginRegistrant.h>

@interface SceneDelegate : FlutterSceneDelegate
@property (nonatomic, strong) FlutterEngine *flutterEngine;
@end
```
```objc title="SceneDelegate.m"
#import "SceneDelegate.h"
#import "ViewController.h"

@implementation SceneDelegate

  - (instancetype)init {
      if (self = [super init]) {
         _flutterEngine = [[FlutterEngine alloc] initWithName:@"my flutter engine"];
      }
      return self;
  }

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session
                                            options:(UISceneConnectionOptions *)connectionOptions {
    if (![scene isKindOfClass:[UIWindowScene class]]) {
        return;
    }
    UIWindowScene *windowScene = (UIWindowScene *)scene;
    self.window = [[UIWindow alloc] initWithWindowScene:windowScene];

    [self.flutterEngine run];
    [GeneratedPluginRegistrant registerWithRegistry:self.flutterEngine];

    // If using FlutterSceneDelegate:
    [self registerSceneLifeCycleWithFlutterEngine:self.flutterEngine];

    // If using FlutterSceneLifeCycleProvider:
    // [self.sceneLifeCycleDelegate registerSceneLifeCycleWithFlutterEngine:self.flutterEngine];

    ViewController *viewController = [[ViewController alloc] initWithEngine:self.flutterEngine];
    self.window.rootViewController = viewController;
    [self.window makeKeyAndVisible];
    [super scene:scene willConnectToSession:session options:connectionOptions];
}
@end
```

如果你手動將 `FlutterEngine` 註冊到某個 scene（場景），那麼當由 `FlutterEngine` 所建立的 view（檢視畫面）變更至其他 scene 時，你也必須將其解除註冊。

```swift
// If using FlutterSceneDelegate:
self.unregisterSceneLifeCycle(with: flutterEngine)

// If using FlutterSceneLifeCycleProvider:
sceneLifeCycleDelegate.unregisterSceneLifeCycle(with: flutterEngine)
```

```objc
// If using FlutterSceneDelegate:
[self unregisterSceneLifeCycleWithFlutterEngine:self.flutterEngine];

// If using FlutterSceneLifeCycleProvider:
[self.sceneLifeCycleDelegate unregisterSceneLifeCycleWithFlutterEngine:self.flutterEngine];
```


## 自訂 FlutterViewController 的使用

對於在 `application:didFinishLaunchingWithOptions:` 中，因非建立平台通道（platform channels）以外原因，從 Storyboards 實例化 `FlutterViewController` 的應用程式，必須自行處理新的初始化順序。

遷移選項：

- 繼承（subclass）`FlutterViewController`，並將相關邏輯放入子類別的 `awakeFromNib`。
- 在 `Info.plist` 或 `UIApplicationDelegate` 中指定 `UISceneDelegate`，並將相關邏輯放入 `scene:willConnectToSession:options:`。
  更多資訊請參閱 [Apple 的文件][apple-delegate-docs]。

[apple-delegate-docs]: {{site.apple-dev}}/documentation/uikit/specifying-the-scenes-your-app-supports

#### 範例

```swift
@objc class MyViewController: FlutterViewController {
  override func awakeFromNib() {
    self.awakeFromNib()
    doSomethingWithFlutterViewController(self)
  }
}
```

## 隱藏遷移警告
若要隱藏 Flutter CLI 關於遷移至 UIScene 的警告，請在你的 pubspec.yaml 中加入以下內容：

```yaml file="pubspec.yaml" diff
  flutter:
    config:
+     enable-uiscene-migration: false
```


## 時程

- 已合併至 main：待定
- 已合併至 stable：待定
- 未知：Apple 可能會將他們的警告升級為斷言（assert），而尚未採用 `UISceneDelegate` 的 Flutter 應用程式，將會在使用最新 SDK 啟動時發生閃退。

## 參考資料

- [Issue 167267][Issue 167267] - 最初回報的問題。

[Issue 167267]: {{site.github}}/flutter/flutter/issues/167267
[apple-delegate-docs]: {{site.apple-dev}}/documentation/uikit/specifying-the-scenes-your-app-supports
[method-channels-docs]: /platform-integration/platform-channels
[platform-views-docs]: /platform-integration/ios/platform-views
[`openURL`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/1623112-application
[local_auth]: {{site.pub}}/packages/local_auth
