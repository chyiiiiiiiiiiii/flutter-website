---
title: 適用於應用程式開發者的 Swift Package Manager
description: 如何使用 Swift Package Manager 管理原生 iOS 或 macOS 相依套件
---

:::note
自 3.44 版本起，Flutter 使用 [Swift Package Manager][]
來管理 iOS 和 macOS 的原生相依套件。
Flutter 繼續以維護模式支援 CocoaPods，
但 CocoaPods 套件庫將於
[2026 年 12 月 2 日起永久變為唯讀][cocoapods]。
:::

[cocoapods]: https://blog.cocoapods.org/CocoaPods-Specs-Repo/
[Swift Package Manager]: https://www.swift.org/documentation/package-manager/

## 如何開啟 Swift Package Manager

自 3.44 版本起，Flutter 的 Swift Package Manager (SwiftPM)
支援預設為開啟狀態。
升級 Flutter 並執行應用程式後，系統會自動加入 SwiftPM 整合，
使專案下載 Flutter 插件所相依的 Swift 套件。
若要使用舊版 Flutter，
你可能需要從應用程式中[移除 Swift Package Manager 整合][removeSPM]。

請注意，對於尚未支援 Swift Package Manager 的相依套件，
Flutter 會回退至 CocoaPods。

[選用] 若要確認專案是否正在使用 SwiftPM：

1. 在 Xcode 中執行應用程式。
1. 確認 **Run Prepare Flutter Framework Script** 已作為建置前置動作 (pre-action) 執行，
   且 `FlutterGeneratedPluginSwiftPackage` 已列為目標相依性 (target dependency)。

   <DashImage image="development/packages-and-plugins/swift-package-manager/flutter-pre-action-build-log.png" caption="確認 **Run Prepare Flutter Framework Script** 已作為建置前置動作執行" />

若你先前已停用 SwiftPM，可能需要執行
`flutter config --enable-swift-package-manager` 來重新啟用。

若自動遷移可正常運作，設定便已完成！
你可以離開此頁面了。

## 如何手動新增 Swift Package Manager 整合

當你升級至 Flutter 3.44 或更新版本並執行應用程式時，
系統會自動加入 SwiftPM 整合。只有在自動遷移發生問題、
需要手動將 SwiftPM 整合加入專案時，才需要參考以下說明。

大多數開發者不需要進行此操作。

若在自動遷移至 SwiftPM 時遇到問題，請[回報 Issue][file an issue]。
請附上錯誤訊息，並在可能的情況下，
將以下檔案的副本附加至 Issue 中：

* `ios/Runner.xcodeproj/project.pbxproj`
* `ios/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme`
   （或所用 flavor 的 xcscheme 檔案）

<Tabs key="darwin-platform">
<Tab name="iOS project">

{% render "docs/swift-package-manager/migrate-ios-project-manually.md", site: site %}

</Tab>
<Tab name="macOS project">

{% render "docs/swift-package-manager/migrate-macos-project-manually.md", site: site %}

</Tab>
</Tabs>

[file an issue]: {{site.github}}/flutter/flutter/issues/new?template=02_bug.yml

### 新增至現有應用程式 (add-to-app)

若要使用 SwiftPM，請視情況參閱下列頁面之一：

* [將 Flutter 應用程式整合至 iOS 專案][ios-add-2-app]
* [將 Flutter 應用程式整合至 macOS 專案][macos-add-2-app]

[ios-add-2-app]:   /add-to-app/ios/project-setup
[macos-add-2-app]: /add-to-app/macos/project-setup

### 新增至自訂 Xcode 目標

你的 Flutter Xcode 專案可以有自訂的 [Xcode 目標 (targets)][Xcode targets]，
用於建置其他產出物，例如 framework 或單元測試。
你可以將 Swift Package Manager 整合加入這些自訂 Xcode 目標。

請依照[如何手動新增 Swift Package Manager 整合][manualIntegration]中的步驟操作。

在[步驟 1][Step 1] 的第 6 個項目中，
使用你的自訂目標取代 `Flutter` 目標。

在[步驟 2][Step 2] 的第 6 個項目中，
使用你的自訂目標取代 `Flutter` 目標。

[Xcode targets]: {{site.apple-dev}}/documentation/xcode/configuring-a-new-target-in-your-project
[manualIntegration]: #how-to-add-swift-package-manager-integration-manually
[Step 1]: #step-1-add-fluttergeneratedpluginswiftpackage-package-dependency
[Step 2]: #step-2-add-run-prepare-flutter-framework-script-pre-action

## 如何移除 Swift Package Manager 整合

當應用程式被修改以支援 SwiftPM 後，
Xcode 專案會更新並加入 Flutter 插件相依套件。

若要復原此遷移：

1. [關閉 Swift Package Manager][Turn off Swift Package Manager]。

1. 清理專案：

   ```sh
   flutter clean
   ```

1. 在 Xcode 中開啟應用程式
   （`ios/Runner.xcworkspace` 或 `macos/Runner.xcworkspace`）。

1. 前往專案的 **Package Dependencies**。

1. 點選 `FlutterGeneratedPluginSwiftPackage` 套件，然後點選
   <Icon id="remove" label="remove/minus"></Icon> 按鈕。

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-generated-package.png" caption="要移除的 `FlutterGeneratedPluginSwiftPackage`" />

1. 前往 `Runner` 目標的 **Frameworks, Libraries, and Embedded Content**。

1. 點選 `FlutterGeneratedPluginSwiftPackage`，然後點選
   <Icon id="remove" label="remove/minus"></Icon> 按鈕。

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-generated-framework.png" caption="要移除的 `FlutterGeneratedPluginSwiftPackage`" />

1. 前往 **Product > Scheme > Edit Scheme**。

1. 展開左側邊欄的 **Build** 區段。

1. 點選 **Pre-actions**。

1. 展開 **Run Prepare Flutter Framework Script**。

1. 點選 <Icon id="delete" label="delete/trash"></Icon> 按鈕。

   <DashImage image="development/packages-and-plugins/swift-package-manager/remove-flutter-pre-action.png" caption="要移除的建置前置動作" />

[Turn off Swift Package Manager]: #how-to-turn-off-swift-package-manager

## 如何使用需要較高作業系統版本的 Swift Package Manager Flutter 插件

若某個 Swift Package Manager Flutter 插件所要求的最低作業系統版本
高於專案目前的設定，你可能會收到類似以下的錯誤訊息：

```plaintext
Target Integrity (Xcode): The package product 'plugin_name_ios' requires minimum platform version 14.0 for the iOS platform, but this target supports 12.0
```

若要使用此插件：

1. 在 Xcode 中開啟應用程式
   （`ios/Runner.xcworkspace` 或 `macos/Runner.xcworkspace`）。

1. 提高應用程式目標的 **Minimum Deployments** 設定。

   <DashImage image="development/packages-and-plugins/swift-package-manager/minimum-deployments.png" caption="目標的 **Minimum Deployments** 設定" />

1. 若你更新了 iOS 應用程式的 **Minimum Deployments**，
   請重新產生 iOS 專案的設定檔：

   ```sh
   flutter build ios --config-only
   ```

1. 若你更新了 macOS 應用程式的 **Minimum Deployments**，
   請重新產生 macOS 專案的設定檔：

   ```sh
   flutter build macos --config-only
   ```

## 如何關閉 Swift Package Manager

一般情況下，請勿執行此操作。請記住，
CocoaPods 套件庫將於 2026 年 12 月 2 日起變為唯讀，
未來將不允許停用 SwiftPM。

停用 Swift Package Manager 會導致 Flutter 對所有相依套件改用 CocoaPods。
但 SwiftPM 仍會保留在你的專案中。
若要從專案中完全移除 Swift Package Manager 整合，
請依照[如何移除 Swift Package Manager 整合][removeSPM]的說明操作。

### 為單一專案關閉 SwiftPM

在專案的 `pubspec.yaml` 檔案中，於 `flutter` 區段下，
在 `config` 子區段中將 `enable-swift-package-manager` 設為 `false`。

```yaml title="pubspec.yaml"
# The following section is specific to Flutter packages.
flutter:
  config:
    enable-swift-package-manager: false
```

這會為此專案的所有貢獻者關閉 Swift Package Manager。

### 為所有專案全域關閉 SwiftPM

執行以下指令：

```sh
flutter config --no-enable-swift-package-manager
```

這會為目前使用者關閉 Swift Package Manager。

若某個專案與 Swift Package Manager 不相容，
所有貢獻者都需要執行此指令。

[removeSPM]: #how-to-remove-swift-package-manager-integration
