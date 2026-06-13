---
title: 插件作者適用的 Swift Package Manager 指南
description: 如何為 iOS 和 macOS 插件新增 Swift Package Manager 相容性
---

:::note
自 3.44 版本起，Flutter 使用 [Swift Package Manager][]
來管理 iOS 和 macOS 的原生相依套件。
Flutter 持續以維護模式支援 CocoaPods，
但 CocoaPods 套件登錄庫將於
[2026 年 12 月 2 日起永久變為唯讀][cocoapods]。
:::

[cocoapods]: https://blog.cocoapods.org/CocoaPods-Specs-Repo/
[Swift Package Manager]: https://www.swift.org/documentation/package-manager/

如需了解如何開啟或關閉 SwiftPM，請參閱
[應用程式開發者適用的 Swift Package Manager 指南][for-app-devs]。

[for-app-devs]: /packages-and-plugins/swift-package-manager/for-app-developers

## 如何為現有的 Flutter 插件新增 Swift Package Manager 支援

本指南說明如何為已支援 CocoaPods 的插件新增 Swift Package Manager 支援，
以確保該插件可供所有 Flutter 專案使用。

Flutter 插件應在另行通知前**同時**支援 Swift Package Manager 和 CocoaPods。

Swift Package Manager 的採用將會是漸進式的。
自 Flutter 3.44 起，不支援 CocoaPods 的插件
無法在尚未遷移至 Swift Package Manager 的專案中使用。
不支援 Swift Package Manager 的插件
可能會對已完成遷移的專案造成問題。
請盡快遷移您的插件。

<Tabs key="darwin-plugin-type">
<Tab name="Swift plugin">

{% render "docs/swift-package-manager/migrate-swift-plugin.md", site: site %}

</Tab>
<Tab name="Objective-C plugin">

{% render "docs/swift-package-manager/migrate-objective-c-plugin.md", site: site %}

</Tab>
</Tabs>

## （可選，但建議）將插件作為本機套件新增至範例應用程式

若您的插件包含範例應用程式，
建議將插件作為本機套件新增至範例應用程式中。
雖然這並非必要，但在範例應用程式中編輯插件原始碼時，
可提供更好的 Xcode 支援。
請參閱 [issue #179032](https://github.com/flutter/flutter/issues/179032)。

### 將插件新增為本機套件

1. 在終端機中切換至 `my_plugin` 目錄。

1. 在 Xcode 中，執行以下指令以開啟範例應用程式的工作區
   （視需要將 `ios` 替換為 `macos`）：

```bash
open example/ios/Runner.xcworkspace
```

1. 右鍵點擊 **Flutter** > **Add Files to "Runner"**。

   ![Add Files to Runner](/assets/images/docs/development/packages-and-plugins/swift-package-manager/add-files-to-runner.png)

1. 選取 `my_plugin/ios/my_plugin`
   （或視需要選 `macos` 或 `darwin`）。

1. 確認已選取 "Reference files in place"
   （這應為預設選項），然後點擊 **Finish**。

   ![Select Reference files in place](/assets/images/docs/development/packages-and-plugins/swift-package-manager/reference-files-in-place.png)

這會將插件新增為本機套件，
但它是以絕對路徑參照，
這在散佈時並不理想。
若要將其改為相對路徑，請依照以下說明操作。

### 改為相對路徑

1. 從 File Inspector 複製插件的「Full Path」。

   ![Copy Full Path](/assets/images/docs/development/packages-and-plugins/swift-package-manager/copy-full-path.png)

1. 在終端機中執行：
   `open -a Xcode example/ios/Runner.xcodeproj/project.pbxproj`

1. 找到以下內容：
   ```text
   path = [COPIED FULL PATH]; sourceTree = "<absolute>"  
   ```

   例如：

   ```text
   path = /Users/username/path/to/my_plugin/ios/my_plugin; sourceTree = "<absolute>"
   ```

1. 並將其替換為相對路徑：

   ```text
   path = ../../ios/my_plugin; sourceTree = "<group>"
   ```
   （視需要將 `ios` 調整為 `macos` 或 `darwin`）。

## 如何更新插件範例應用程式中的單元測試

若您的插件含有原生 XCTests，
且以下任一條件成立，
您可能需要更新這些測試以配合 Swift Package Manager：

* 您在測試中使用了 CocoaPod 相依套件。
* 您在插件的 `Package.swift` 檔案中明確將其設定為 `type: .dynamic`。

若要更新單元測試：

1. 在 Xcode 中開啟 `example/ios/Runner.xcworkspace`。

1. 若您在測試中使用了 CocoaPod 相依套件（例如 `OCMock`），
   請將其從 `Podfile` 檔案中移除。

   ```ruby title="ios/Podfile" diff
     target 'RunnerTests' do
       inherit! :search_paths

   -   pod 'OCMock', '3.5'
     end
   ```

   接著在終端機中，於 `plugin_name_ios/example/ios`
   目錄下執行 `pod install`。

1. 在專案中切換至 **Package Dependencies**。

   <DashImage image="development/packages-and-plugins/swift-package-manager/package-dependencies.png" caption="專案的套件相依性" />

1. 點擊 **+** 按鈕，並在右上角的搜尋列中搜尋
   僅供測試使用的相依套件並加以新增。

   <DashImage image="development/packages-and-plugins/swift-package-manager/search-for-ocmock.png" caption="搜尋僅供測試使用的相依套件" />

   :::note
   OCMock 使用了不安全的建置旗標，只能透過指定 commit 的方式使用。
   `fe1661a3efed11831a6452f4b1a0c5e6ddc08c3d` 是 3.9.3 版本對應的 commit。
   :::

1. 確認相依套件已新增至 `RunnerTests` 目標 (Target)。

   <DashImage image="development/packages-and-plugins/swift-package-manager/choose-package-products-test.png" caption="確認相依套件已新增至 `RunnerTests` 目標" />

1. 點擊 **Add Package** 按鈕。

1. 若您已在插件的 `Package.swift` 檔案中明確將函式庫類型設定為 `.dynamic`
   （[Apple 不建議此做法][library type recommendations]），
   您還需要將其作為相依套件新增至 `RunnerTests` 目標。

   1. 確認 `RunnerTests` 的 **Build Phases** 中包含 **Link Binary With Libraries**
      建置階段：

      <DashImage image="development/packages-and-plugins/swift-package-manager/runner-tests-link-binary-with-libraries.png" caption="`RunnerTests` 目標中的 `Link Binary With Libraries` 建置階段" />

      若該建置階段尚不存在，請建立一個。
      點擊 <Icon id="add" label="plus/add"></Icon> 按鈕，
      然後點擊 **New Link Binary With Libraries Phase**。

      <DashImage image="development/packages-and-plugins/swift-package-manager/add-runner-tests-link-binary-with-libraries.png" caption="新增 `Link Binary With Libraries` 建置階段" />

   1. 在專案中切換至 **Package Dependencies**。

   1. 點擊 <Icon id="add" label="plus/add"></Icon> 按鈕。

   1. 在開啟的對話框中，點擊 **Add Local...** 按鈕。

   1. 切換至 `plugin_name/plugin_name_ios/ios/plugin_name_ios` 並點擊
      **Add Package** 按鈕。

   1. 確認已將其新增至 `RunnerTests` 目標，然後點擊
      **Add Package** 按鈕。

1. 確認測試通過：**Product > Test**。

[library type recommendations]: {{site.apple-dev}}/documentation/packagedescription/product/library(name:type:targets:)
