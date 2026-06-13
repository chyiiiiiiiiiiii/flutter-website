---
title: 新增 iOS App Clip target
description: 如何在你的 Flutter 專案中新增 iOS App Clip target。
---

:::important
將目標設為 iOS 16 會將未壓縮 IPA 載入大小上限提升至 15MB。根據你的 App 大小，你可能會達到此限制。([#71098][#71098])
:::

本指南說明如何手動將另一個
由 Flutter 渲染的 iOS App Clip target
新增到你現有的 Flutter 專案或 [add-to-app][add-to-app] 專案中。

[#71098]: {{site.repo.flutter}}/issues/71098
[add-to-app]: /add-to-app

:::warning
這是一份進階指南，建議具備 iOS 開發經驗的讀者參考。
:::

如需運作中的範例，請參考 GitHub 上的 [App Clip 範例][App Clip sample]。

[App Clip sample]: {{site.repo.samples}}/tree/main/ios_app_clip

## 步驟 1 - 開啟專案

開啟你的 iOS Xcode 專案，例如
`ios/Runner.xcworkspace`（完整 Flutter 應用程式）。

## 步驟 2 - 新增 App Clip target

**2.1**

在 Project Navigator 點選你的專案，以顯示專案設定。

在 target 列表底部按下 **+** 來新增一個新的 target。

<DashImage figure image="development/platform-integration/ios-app-clip/add-target.png" />

**2.2**

為你的新 target 選擇 **App Clip** 類型。

<DashImage figure image="development/platform-integration/ios-app-clip/add-app-clip.png" />

**2.3**

在對話框中輸入你的新 target 詳細資訊。

Interface 請選擇 **Storyboard**。

**Language** 請選擇與你原本 target 相同的語言。

（換句話說，為了簡化設定，
不要為 Objective-C 主 target 建立 Swift App Clip target，反之亦然。）

<DashImage figure image="development/platform-integration/ios-app-clip/app-clip-details.png" />

**2.4**

在接下來的對話框中，
啟用新 target 的新 scheme。

<DashImage figure image="development/platform-integration/ios-app-clip/activate-scheme.png" />

**2.5**

回到專案設定，打開 **Build Phases** 分頁。
將 **Embedded App Clips** 拖曳到 **Thin Binary** 之上。

<DashImage figure image="development/platform-integration/ios-app-clip/embedded-app-clips.png" />

<a id="step-3"></a>
## 步驟 3 - 移除不需要的檔案

**3.1**

在 Project Navigator 中，於新建立的 App Clip 群組內，
刪除除 `Info.plist` 和
`<app clip target>.entitlements` 以外的所有檔案。

:::tip
對於 add-to-app 使用者，是否保留這些範本檔案，
取決於你之後是否需要從這段程式碼呼叫
`FlutterViewController` 或 `FlutterEngine` API。
:::

<DashImage figure image="development/platform-integration/ios-app-clip/clean-files.png" />

將檔案移至垃圾桶。

**3.2**

如果你沒有使用 `SceneDelegate.swift` 檔案，
請在 `Info.plist` 中移除對它的參考。

打開 App Clip 群組中的 `Info.plist` 檔案。
刪除 **Application Scene Manifest** 的整個 dictionary 項目。

<DashImage figure image="development/platform-integration/ios-app-clip/scene-manifest.png" />

## 步驟 4 - 共用建置組態

這一步對 add-to-app 專案來說不是必須的，
因為 add-to-app 專案會有自訂的建置組態和版本。

**4.1**

回到專案設定，
這次選擇專案本身而非任何 target。

在 **Info** 分頁下的 **Configurations**
展開群組，展開
**Debug**、**Profile** 和 **Release** 項目。

對每一個項目，從下拉選單中為 App Clip target
選擇與主 App target 相同的值。

這樣你的 App Clip target 就能存取 Flutter 所需的建置設定。

將 **iOS Deployment Target** 設定為至少 **16.0**，
以利用 15MB 的大小限制。

<DashImage figure image="development/platform-integration/ios-app-clip/configuration.png" />

**4.2**

在 App Clip 群組的 `Info.plist` 檔案中，設定：

* `Build version string (short)` 為 `$(FLUTTER_BUILD_NAME)`
* `Bundle version` 為 `$(FLUTTER_BUILD_NUMBER)`

## 步驟 5 - 共用程式碼與資源

### 選項 1 - 共用所有內容

假設你希望在標準 App 和 App Clip 中顯示相同的 Flutter UI，
可以共用相同的程式碼與資源。

對於以下每一個檔案：`Main.storyboard`、`Assets.xcassets`、
`LaunchScreen.storyboard`、`GeneratedPluginRegistrant.m` 以及
`AppDelegate.swift`（若使用 Objective-C 則包含 `Supporting Files/main.m`），
選取檔案後，在檢查器的第一個分頁中，
於 `Target Membership` 勾選群組中也勾選 App Clip target。

<DashImage figure image="development/platform-integration/ios-app-clip/add-target-membership.png" />

### 選項 2 - 為 App Clip 客製化 Flutter 啟動

若採用此方式，
請不要刪除 [步驟 3](#step-3) 中列出的所有檔案。
而是利用這些 scaffold 檔案及 [iOS add-to-app API][iOS add-to-app APIs]
來自訂啟動 Flutter。
例如顯示 [自訂 Flutter 路由][custom Flutter route]。

[custom Flutter route]: /add-to-app/ios/add-flutter-screen#route
[iOS add-to-app APIs]: /add-to-app/ios/add-flutter-screen

## 步驟 6 - 新增 App Clip 關聯網域

這是 App Clip 開發的標準步驟。
請參考 [Apple 官方文件][official Apple documentation]。

[official Apple documentation]: {{site.apple-dev}}/documentation/app_clips/creating_an_app_clip_with_xcode#3604097

**6.1**

打開 `<app clip target>.entitlements` 檔案。
新增一個 `Associated Domains` 陣列型態。
在陣列中新增一列，內容為 `appclips:<your bundle id>`。

<DashImage figure image="development/platform-integration/ios-app-clip/app-clip-entitlements.png" />

**6.2**

同樣的關聯網域權限也需要加入到你的主 App。

將 App Clip 群組中的 `<app clip target>.entitlements` 檔案
複製到主 App 群組並重新命名為
與主 target 相同的名稱，
例如 `Runner.entitlements`。

打開該檔案並刪除
`Parent Application Identifiers`
這一行（僅針對主 App 的權限檔案，App Clip 的權限檔案則保留）。

<DashImage figure image="development/platform-integration/ios-app-clip/main-app-entitlements.png" />

**6.3**

回到專案設定，選擇主 App 的 target，
打開 **Build Settings** 分頁。
將 **Code Signing Entitlements** 設定為
剛才為主 App 建立的第二個權限檔案的相對路徑。

<DashImage figure image="development/platform-integration/ios-app-clip/main-app-entitlements-setting.png" />

## 步驟 7 - 整合 Flutter

這些步驟對 add-to-app 專案來說不是必須的。

**7.1**

對於 Swift target，
將 `Objective-C Bridging Header`
建置設定設為 `Runner/Runner-Bridging-Header.h`

換句話說，
與主 App target 的建置設定相同。

<DashImage figure image="development/platform-integration/ios-app-clip/bridge-header.png" />

**7.2**

現在打開 **Build Phases** 分頁。按下 **+** 號
並選擇 **New Run Script Phase**。

<DashImage figure image="development/platform-integration/ios-app-clip/new-build-phase.png" />

將這個新階段拖曳到 **Dependencies** 階段之下。

展開這個新階段，並在腳本內容中加入以下這一行：

```bash
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" build
```

取消勾選 **Based on dependency analysis**（根據相依性分析）。

換句話說，
這與主應用程式目標（main app target）的建置階段（build phases）設定相同。

<DashImage figure image="development/platform-integration/ios-app-clip/xcode-backend-build.png" />

這可確保在執行 App Clip 目標時，
你的 Flutter Dart 程式碼會被編譯。

**7.3**

點擊 **+** 號，然後再次選擇 **New Run Script Phase**（新增執行腳本階段）。
請將其保留為最後一個階段。

這次，請加入：

```bash
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" embed_and_thin
```

取消勾選 **Based on dependency analysis**（依據相依性分析）。

換句話說，
這與主應用程式 target 的 build phases 相同。

<DashImage figure image="development/platform-integration/ios-app-clip/xcode-backend-embed.png" />

這樣可以確保你的 Flutter 應用程式及引擎
被嵌入到 App Clip bundle 中。

## 步驟 8 - 整合插件

**8.1**

開啟你的 Flutter 專案
或 add-to-app host 專案的 `Podfile`。

對於全 Flutter 應用程式，請取代以下區段：

```ruby
target 'Runner' do
  use_frameworks!
  use_modular_headers!

  flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))
end
```

with:

```ruby
use_frameworks!
use_modular_headers!
flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))

target 'Runner'
target '<name of your App Clip target>'
```

在檔案的最上方，
也請取消註解 `platform :ios, '13.0'`，並將
version 設定為兩個目標的 iOS
Deployment Target 中較低的那一個。

若為 add-to-app，請加到：

```ruby
target 'MyApp' do
  install_all_flutter_pods(flutter_application_path)
end
```

使用：

```ruby
target 'MyApp' do
  install_all_flutter_pods(flutter_application_path)
end

target '<name of your App Clip target>'
  install_all_flutter_pods(flutter_application_path)
end
```

**8.2**

請在命令列（Command Line Interface）中，
進入你的 Flutter 專案目錄，
然後安裝 pod：

```console
cd ios
pod install
```

## 執行

你現在可以在 Xcode 中執行你的 App Clip target，
只需從方案下拉選單中選擇你的 App Clip target，
選擇一台 iOS 16 或更高版本的裝置，然後按下執行。

<DashImage figure image="development/platform-integration/ios-app-clip/run-select.png" />

若要從頭開始測試啟動 App Clip，
也請參考 Apple 的[測試你的 App Clip 啟動體驗][testing]文件。

[testing]: {{site.apple-dev}}/documentation/app_clips/testing_your_app_clip_s_launch_experience

## 除錯與熱重載

很遺憾，`flutter attach` 無法自動發現
App Clip 中的 Flutter 工作階段，
這是因為網路權限的限制。

因此，你必須將其複製並貼回
`flutter attach` 指令來進行連線。

例如：

```console
flutter attach --debug-uri <copied URI>
```
