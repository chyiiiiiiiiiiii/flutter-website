---
title: 新增 iOS App Extension
description: 瞭解如何將 App Extension 新增至你的 Flutter 應用程式
---

本指南將說明如何在 Flutter 應用程式中使用 iOS app extension。

## 概述 {: #overview }

[iOS app extension][iOS app extensions] 允許你將功能擴展到 iOS 應用程式之外。你的應用程式可以作為主畫面小工具（widget）出現，或讓你的應用程式部分功能在其他應用程式中使用。

在以下範例中，當使用者在 iOS 相簿應用程式中選擇要分享的照片時，一個名為 `Example App With Extension` 的 Flutter 應用程式會顯示在
相簿應用程式的分享選單（share sheet）中：

<figure>
  <div class="site-figure-container">
    <img src='/assets/images/docs/development/platform-integration/app-extensions/share-extension.png' alt='Share sheet with a Flutter app in it.' height='400'>
  </div>
</figure>

[iOS app extensions]: {{site.apple-dev}}/app-extensions/

## 將 iOS app extension 新增至你的 Flutter 應用程式 {: #add-extension }

如果你想讓 Flutter 應用程式與 iOS 作業系統整合，可以將 iOS app extension 新增到你的 Flutter 專案。為了讓流程更順暢，下列步驟將示範如何將 [Share][Share] app extension 新增到一個名為 `example_app_with_extension` 的新 Flutter 應用程式，但你也可以從既有專案開始。

1.  在終端機中建立一個名為 `example_app_with_extension` 的新 Flutter 專案。

    ```console
    $ flutter create example_app_with_extension
    ```

1.  在終端機中，開啟 `example_app_with_extension` 專案的 Xcode workspace。

    ```console
    $ cd example_app_with_extension && open ios/Runner.xcworkspace
    ```

1.  在 Xcode 中，新增一個名為 `Share` 的 app extension，並將其命名為 `ShareExtension`。

    *   在 Xcode 功能表列中，選擇
        **File** > **New** > **Target**。

    *   新增 **Share Extension**。

    *   在 **Name field**（名稱欄位）中輸入 **ShareExtension**。

    *   點擊 **Finish**。

    *   在出現的 **Activate … Scheme** 對話框中，
        選擇 **Activate**。

1.  在 Xcode 中，調整建置流程的順序。

    *   開啟 **project navigator**
        （**View** > **Navigators** > **Project**）。

    *   在 **project navigator** 頂部，選擇
        **Runner**。

    *   在主視窗的 **TARGETS** 區塊下，選擇
        **Runner**。

    *   開啟 **Build Phases** 分頁。

    *   將 **Embed Foundation Extensions** 拖曳到
        **Run Script** 之上。


1.  確認你的 **Minimum Deployments** iOS 值已正確設定，且在 **Runner** 與 **ShareExtension** 中一致

    *   開啟 **project navigator**
        （**View** > **Navigators** > **Project**）。

    *   在 **project navigator** 頂部，選擇
        **Runner**。

    *   在主視窗的 **TARGETS** 區塊下，選擇
        **Runner**。

    *   在 **General** 分頁中，檢查 **Minimum Deployments**
        下拉選單的值，需與
        **ShareExtension** > **General** 分頁中的值相同。

1.  在終端機中執行以下指令，以重新建置你的 iOS 應用程式：

    ```console
    $ flutter build ios --config-only
    ```

1.  [使用模擬器測試你的應用程式][Test your app with the simulator]。

當你新增一個 App Extension（應用程式擴充）時，Xcode 會根據你選擇的範本產生範例程式碼。關於這些產生的程式碼以及 WidgetKit 的更多資訊，請參考 [Apple 的 App Extension 文件][Apple's app extension documentation]。

[Apple's app extension documentation]: {{site.apple-dev}}/app-extensions/
[Test your app with the simulator]: #test-extensions
[Share]: {{site.apple-dev}}/library/archive/documentation/General/Conceptual/ExtensibilityPG/Share.html

## 測試 iOS App Extension {: #test-extensions }

在你將 App Extension 新增至 Flutter 專案後，可以使用模擬器或實體裝置進行測試。
如果你要在偵錯模式（debug mode）下測試 extension，必須使用 iOS 模擬器。

以下步驟假設你正在使用
[新增 iOS App Extension][Adding iOS app extensions] 中的範例應用程式與 Share extension（分享擴充）。

<Tabs key="register-plugins-tabs" wrapped="true">

<Tab name="Simulator">

1.  在 Xcode 中，[將 App Extension 新增至你的專案][add an app extension to your project]。

1.  在終端機中，使用以下指令來執行你的 iOS 應用程式：

    ```console
    $ flutter run
    ```

1.  在模擬器中測試你的 app extension（應用程式擴充功能）。

    *   啟動一個支援 Share extension（分享擴充功能）的應用程式，
        例如 Photos app（照片應用程式）。

    *   選擇一張照片，點擊分享按鈕，然後點擊你應用程式的 share extension 圖示。

</Tab>

<Tab name="Physical device">

1.  將 app extension 新增至你的專案。

1.  在終端機中，以 release 模式執行你的 Flutter 應用程式：

    ```console
    $ flutter run --release
    ```

1.  在你的裝置上測試你的 app extension（應用程式擴充套件）。

    *   啟動一個支援 Share extension（分享擴充套件）的應用程式，
        例如「照片」(Photos) app。

    *   選擇一張照片，點擊分享按鈕，然後點擊你應用程式的
        分享擴充套件圖示。

</Tab>

</Tabs>

[Adding iOS app extensions]: #add-extension
[add an app extension to your project]: #add-extension

## 與 iOS app extension 互動的其他方式 {: #interact-app-extensions }

Flutter 應用程式與 iOS app extension（應用程式擴充套件）互動時，
採用與 UIKit 或 SwiftUI 應用程式相同的技術。
主應用程式與 app extension 之間不會直接通訊。
當使用者與 extension 互動時，主應用程式可能並未執行中。
主應用程式與 extension 可以讀寫共用資源，
或使用更高階的 API 來彼此溝通。

### 使用高階 API {: #using-higher-level-apis }

部分 extension 提供 API。例如，
[Core Spotlight][Core Spotlight] framework 可為你的應用程式建立索引，
讓使用者能從 Spotlight 與 Safari 進行搜尋。
[WidgetKit][WidgetKit] framework 則可觸發
主畫面小工具（widget）的更新。

為簡化應用程式與 extension 的溝通方式，
Flutter 插件會包裝這些 API。
若要尋找包裝 extension API 的插件，
請參考 [Leveraging Apple's System APIs and Frameworks][leverage]
或在 [pub.dev][pub.dev] 搜尋。

[Core Spotlight]: {{site.apple-dev}}/documentation/corespotlight
[leverage]: /platform-integration/ios/apple-frameworks
[pub.dev]: {{site.pub-pkg}}
[WidgetKit]: {{site.apple-dev}}/documentation/widgetkit

### 共用資源 {: #sharing-resources }

若要在 Flutter 應用程式與 app extension 之間共用資源，
請將 `Runner` app target 和 extension target
放入同一個 [App Group][App Group]。

:::note
你必須登入你的 Apple Developer 帳號。
:::

將 target 加入 App Group 的步驟如下：

1. 在 Xcode 中開啟該 target 的設定。
1. 前往 **Signing & Capabilities** 分頁。
1. 選擇 **+ Capability**，然後選擇 **App Groups**。
1. 從以下兩種方式選擇你要加入的 App Group：

    {: type="a"}
    1. 從清單中選擇一個 App Group。
    1. 點擊 **+** 以新增一個新的 App Group。

<DashImage figure image="development/platform-integration/app-extensions/xcode-app-groups.png" alt="在 Xcode Runner target 設定中選擇 App Group。" />

當兩個 target 屬於同一個 App Group 時，
它們可以讀寫相同的來源資料。
請根據你的資料選擇以下其中一種來源方式：

* **Key/value：** 使用 [`shared_preference_app_group`][]
  插件在同一個 App Group 內讀寫 `UserDefaults`。
* **檔案：** 使用 [`path_provider`][] 插件取得 App Group container 路徑，
  以[讀寫檔案][read and write files]。
* **資料庫：** 使用 [`path_provider`][] 插件取得 App Group container 路徑，
  並搭配 [`sqflite`][] 插件建立資料庫。

[App Group]: {{site.apple-dev}}/documentation/xcode/configuring-app-groups
[`path_provider`]: {{site.pub-pkg}}/path_provider
[read and write files]: /cookbook/persistence/reading-writing-files
[`shared_preference_app_group`]: {{site.pub-pkg}}/shared_preference_app_group
[`sqflite`]: {{site.pub-pkg}}/sqflite

### 排程背景更新 {: #background-updates }

背景任務可讓你無論應用程式狀態為何，
皆能透過程式碼更新 extension。

若要從 Flutter 應用程式排程背景工作，
請使用 [`workmanager`][] 插件。

[`workmanager`]: {{site.pub-pkg}}/workmanager

### 加入深度連結 {: #deep-linking }

你可能會希望從 app extension
將使用者導向 Flutter 應用程式中的特定頁面。
若要在應用程式中開啟特定路由，
可以使用 [Deep Linking][Deep Linking]。

[Deep Linking]:/ui/navigation/deep-linking

### 加入可捲動清單 {: #advanced-scrolling-behavior }

預設情況下，flutter view 在 [Share][Share] extension 中
不會處理捲動手勢。若要在 Share extension 中支援可捲動清單，
請依照 [GitHub 上的說明][issue-164670] 操作。

[Share]: {{site.apple-dev}}/library/archive/documentation/General/Conceptual/ExtensibilityPG/Share.html
[issue-164670]: {{site.repo.flutter}}/issues/164670#issuecomment-2762124121

### 在 iOS app extension 中開啟 Flutter 應用程式 {: #creating-app-extension-uis-with-flutter }

你可以直接在某些 iOS app extension（如
[Share][Share] extension）中開啟你的 Flutter 應用程式，
並搭配 `FlutterViewController` 使用。

以下範例中，一個名為 `Example App With Extension` 的 Flutter 應用程式
被開啟於 Share extension，讓使用者可在應用程式間分享內容：

<figure>
  <div class="site-figure-container">
    <img src='/assets/images/docs/development/platform-integration/app-extensions/share-extension-open-app.gif' alt='Flutter 應用程式新增至分享選單的範例' height='400'>
  </div>
</figure>

請依照以下步驟，在 [Share][Share] app extension 中顯示 Flutter 應用程式。
此範例中，app extension scheme 名稱為 `ShareExtension`，
Flutter app scheme 名稱為 `Runner`，
Flutter 應用程式名稱為 `Example App With Extension`：

1.  [將 extension 加入你的 Flutter 應用程式][Add an extension to your Flutter app]
    （若尚未加入）。

1.  在終端機中，切換至你的 Flutter 專案目錄，
    然後使用以下指令在 Xcode 中開啟你的專案：

    ```console
    open ios/Runner.xcworkspace
    ```

1.  在 Xcode 中，停用使用者腳本沙箱（User Script Sandboxing）。

    *   開啟 **project navigator**
        （**View** > **Navigators** > **Project**）。

    *   在主視窗下方的 **TARGETS** 區塊，選擇 **ShareExtension**。

    *   開啟 **Build Settings** 分頁。

    *   前往 **Build Options**。

    *   將 **User Script Sandboxing** 設定為 **No**。

1.  在 Xcode 中，為 `ShareExtension` scheme 新增 pre-action。

    *   開啟 **Manage Schemes** 視窗（**Product** > **Scheme** > **Manage Schemes**）。

    *   選擇 **ShareExtension** scheme 並進行編輯。

    *   展開 **Build** 分頁。

    *   選擇 **Pre-actions**。

    *   點擊 **+** 並選擇 **New Run Script Action**。

    *   在 **Provide build settings from** 下拉選單中，選擇 **ShareExtension**。

    *   在 **Shell** 文字欄位中輸入：

        ```console
        /bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" prepare
        ```

    *   點擊 **Close**（關閉）。

1.  在 Xcode 中，共享建置組態。

    *   開啟 **project navigator**
        （**View** > **Navigators** > **Project**）。

    *   在主視窗的 **PROJECT** 區塊下，選取
        **Runner**。

    *   開啟 **Info** 分頁。

    *   展開 **Configuration**。

    *   展開 **Debug**，並將
        **ShareExtension** 的值更新為與
        **Runner** 相同。

    *   針對 **Profile** 和
        **Release** 重複前述步驟。

    *   完成後，請確認組態看起來類似以下畫面：

        ![Xcode configurations](/assets/images/docs/development/platform-integration/app-extensions/xcode-configurations.png)


1.  （選用）如有需要，在 Xcode 中以 extension 類別取代任何 storyboard 檔案。

    *   開啟 **project navigator**
        （**View** > **Navigators** > **Project**）。

    *   選取 **Runner** > **ShareExtension** > **Info**。

    *   展開 **Information Property List**。

    *   刪除 **NSExtensionMainStoryboard** 鍵。

    *   新增 **NSExtensionPrincipalClass** 鍵。

    *   為 `NSExtensionPrincipalClass` 鍵新增以下其中一個值：

        *   （Swift）**ShareExtension.ShareViewController**
        *   （Objective-C）**ShareViewController**

1.  在 Xcode 中，將 `ShareViewController` 更新為使用
    `FlutterViewController`。

    *   開啟 **project navigator**
        （**View** > **Navigators** > **Project**）。

    *   選取 **Runner** > **ShareExtension** > **ShareViewController**。

    *   將 `ShareViewController` 更新為使用
        `FlutterViewController` 類別：

<Tabs key="controller-code-tabs" wrapped="true">
<Tab name="UIKit-Swift">

```swift title="ShareViewController.swift"
import UIKit
import Flutter

class ShareViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        showFlutter()
    }

    func showFlutter() {
        let flutterEngine = FlutterEngine(name: "my flutter engine")
        flutterEngine.run()
        let flutterViewController = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
        addChild(flutterViewController)
        view.addSubview(flutterViewController.view)
        flutterViewController.view.frame = view.bounds
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        self.extensionContext?.cancelRequest(
            withError: NSError(domain: Bundle.main.bundleIdentifier!, code: 0))
    }
}
```

</Tab>

<Tab name="UIKit-ObjC">

```objc title="ShareViewController.h"
@import Flutter;
@import UIKit;

@interface ShareViewController : UIViewController

@end
```

```objc title="ShareViewController.m"
#import "ShareViewController.h"
@import Flutter;

@implementation ShareViewController
- (void)viewDidLoad {
    [super viewDidLoad];
    [self showFlutter];
}

- (void)showFlutter {
    FlutterEngine *flutterEngine = [[FlutterEngine alloc] initWithName:@"my flutter engine"];
    [flutterEngine run];
    FlutterViewController *flutterViewController =
            [[FlutterViewController alloc] initWithEngine:flutterEngine nibName:nil bundle:nil];
    [self addChildViewController:flutterViewController];
    [self.view addSubview:flutterViewController.view];
    flutterViewController.view.frame = self.view.bounds;
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    [self.extensionContext cancelRequestWithError:[NSError errorWithDomain:NSBundle.mainBundle.bundleIdentifier code:0 userInfo:nil]];
}
@end
```

</Tab>

</Tabs>

8.  [使用模擬器測試你的應用程式][Test your app with the simulator]。

[Add an extension to your Flutter app]: #add-extension
[Share]: {{site.apple-dev}}/library/archive/documentation/General/Conceptual/ExtensibilityPG/Share.html
[Test your app with the simulator]: #test-extensions

### 註冊插件（Register plugins）

請依照以下步驟，為應用程式擴充（app extension）註冊插件（plugin）。在此範例中，應用程式擴充方案名稱為 `ShareExtension`，Flutter 應用程式方案名稱為 `Runner`，Flutter 應用程式名稱為 `Example App With Extension`：

1.  若尚未完成，請[將擴充功能新增至你的 Flutter 應用程式][Add an extension to your Flutter app]。

1.  在 Xcode 中，將 `GeneratedPluginRegistrant.m` 加入至應用程式擴充目標（app extension target）。

    *   開啟 **project navigator**
        （**View** > **Navigators** > **Project**）。

    *   在主視窗的 **TARGETS** 區塊下，選取
        **ShareExtension**。

    *   開啟 **Build Phases** 分頁。

    *   展開 **Compile Sources**。

    *   點擊 **+**。

    *   在
        _Choose item to add_ 對話框的清單中，選取
        **GeneratedPluginRegistrant.m**。

    *   點擊 **Add**。

1.  （僅限 Swift）在 Xcode 中，更新
    `SWIFT_OBJC_BRIDGING_HEADER` 的 build setting。

    *   開啟 **project navigator**
        （**View** > **Navigators** > **Project**）。

    *   在主視窗的 **TARGETS** 區塊下，選取
        **ShareExtension**。

    *   開啟 **Build Settings** 分頁。

    *   選擇 **All** 篩選器。

    *   前往 **Swift Compiler - General**，將
        **Objective-C Bridging Header** 鍵值設為 **Runner/Runner-Bridging-Header.h**。

1.  在 Xcode 中，更新 `ShareViewController` 的程式碼，
    以註冊 `GeneratedPluginRegistrant.h`。

    *   開啟 **project navigator**
        （**View** > **Navigators** > **Project**）。

    *   選取 **Runner** > **ShareExtension** > **ShareViewController**。

    *   更新 `ShareViewController` 檔案，使用
        `GeneratedPluginRegistrant.h`：

<Tabs key="register-plugins-tabs" wrapped="true">

<Tab name="UIKit-Swift">

```swift title="ShareViewController.swift"
// Add this inside `showFlutter()` at the top
GeneratedPluginRegistrant.register(with: flutterEngine)
```

</Tab>

<Tab name="UIKit-ObjC">

```objc title="ShareViewController.m"
// Add this import at the top
#import "GeneratedPluginRegistrant.h"
```

```objc title="ShareViewController.m"
// Add this after [flutterEngine run]
[GeneratedPluginRegistrant registerWithRegistry:flutterEngine];
```

</Tab>

</Tabs>

5.  （Xcode）[使用模擬器測試你的應用程式][Test your app with the simulator]。

[Add an extension to your Flutter app]: #add-extension
[Share]: {{site.apple-dev}}/library/archive/documentation/General/Conceptual/ExtensibilityPG/Share.html
[Test your app with the simulator]: #test-extensions

## 限制條件 {: #constraints }

*   你必須使用 iOS 模擬器來在偵錯模式下測試你的擴充功能（extension）。

*   Flutter 在建構擴充功能 UI 時，尚未完全支援在實體裝置上以偵錯模式執行應用程式擴充功能，因為實體裝置可能會發生記憶體不足的情況。

*   iOS 應用程式擴充功能有記憶體限制。
    建議僅在應用程式擴充功能至少支援 100MB 記憶體時，才修改其 UI。

## 在 iOS 應用程式擴充功能中呼叫 Dart 程式碼／渲染 Flutter 內容

[home_widget][] 套件提供了大量功能，包括允許以下操作：

* 在應用程式擴充功能中[使用 Dart 程式碼回應使用者輸入][Respond to user input]。

* 在應用程式擴充功能中[將 Flutter 元件（Widget）渲染為圖片][Render Flutter widgets]。

* [從 `UserDefaults` 儲存與讀取資料][Save and retrieve data]於 iOS 上。

## 其他資源 {: #other-resources }

如需逐步操作說明，了解如何在 Flutter iOS 應用程式中使用應用程式擴充功能，請參考
[為你的 Flutter 應用程式新增主畫面小工具（Home Screen Widget）][lab]
教學。

若想進一步了解在 iOS 應用程式中新增 Flutter 螢幕的各種方式，請參閱
[在 iOS 應用程式中新增 Flutter 螢幕][Adding a Flutter Screen to an iOS app]。

[Adding a Flutter Screen to an iOS app]: /add-to-app/ios/add-flutter-screen
[lab]: {{site.codelabs}}/flutter-home-screen-widgets
[home_widget]: https://pub.dev/packages/home_widget
[Save and retrieve data]: https://docs.page/abausg/home_widget/usage/sync-data
[Render Flutter widgets]: https://docs.page/abausg/home_widget/features/render-flutter-widgets
[Respond to user input]: https://docs.page/abausg/home_widget/features/interactive-widgets
