---
title: 給應用程式開發者的 Swift Package Manager
description: 如何使用 Swift Package Manager 管理原生 iOS 或 macOS 相依性
---

:::warning
Flutter 正在遷移至 [Swift Package Manager][Swift Package Manager] 來管理 iOS 與 macOS 的原生相依性。
Flutter 對 Swift Package Manager 的支援仍在開發中。
如果你發現 Flutter 的 Swift Package Manager 支援有 bug，請[提交 issue][open an issue]。
Swift Package Manager 支援[預設為關閉][off by default]。
Flutter 仍然支援 CocoaPods。
:::

Flutter 整合 Swift Package Manager 有以下幾項優點：

1. **可存取 Swift 套件生態系**。
   Flutter 套件（plugins）可以利用日益壯大的 [Swift 套件][Swift packages] 生態系。
1. **簡化 Flutter 安裝流程**。
   Xcode 已內建 Swift Package Manager。
   如果你的專案使用 Swift Package Manager，就不需要安裝 Ruby 與 CocoaPods。

[Swift Package Manager]: https://www.swift.org/documentation/package-manager/
[off by default]: #how-to-turn-on-swift-package-manager
[Swift packages]: https://swiftpackageindex.com/
[open an issue]: {{site.github}}/flutter/flutter/issues/new?template=2_bug.yml

{% render docs/swift-package-manager/how-to-enable-disable.md, site: site %}

## 如何新增 Swift Package Manager 整合

### 新增至 Flutter 應用程式

{% tabs %}
{% tab "iOS 專案" %}

{% render docs/swift-package-manager/migrate-ios-project.md, site: site %}

{% endtab %}
{% tab "macOS 專案" %}

{% render docs/swift-package-manager/migrate-macos-project.md, site: site %}

{% endtab %}
{% endtabs %}

### _手動_ 新增至 Flutter 應用程式

{% tabs %}
{% tab "iOS 專案" %}

{% render docs/swift-package-manager/migrate-ios-project-manually.md, site: site %}

{% endtab %}
{% tab "macOS 專案" %}

{% render docs/swift-package-manager/migrate-macos-project-manually.md, site: site %}

{% endtab %}
{% endtabs %}

### 新增至現有應用程式（add-to-app）

Flutter 的 Swift Package Manager 支援目前不適用於 add-to-app 情境。

若想掌握最新狀態，請參考 [flutter#146957][flutter#146957]。

[flutter#146957]: https://github.com/flutter/flutter/issues/146957

### 新增至自訂 Xcode target

你的 Flutter Xcode 專案可以擁有自訂的 [Xcode targets][Xcode targets]，用來建置額外產品，例如 framework 或單元測試。
你可以將 Swift Package Manager 整合新增至這些自訂 Xcode target。

請依照
[如何手動將 Swift Package Manager 整合新增至專案][manualIntegration] 的步驟操作。

在 [步驟 1][manualIntegrationStep1]，第 6 項，請使用你的自訂 target 取代 `Flutter` target。

在 [步驟 2][manualIntegrationStep2]，第 6 項，請使用你的自訂 target 取代 `Flutter` target。

[Xcode targets]: https://developer.apple.com/documentation/xcode/configuring-a-new-target-in-your-project
[manualIntegration]: /packages-and-plugins/swift-package-manager/for-app-developers/#how-to-add-swift-package-manager-integration-to-a-flutter-app-manually
[manualIntegrationStep1]: /packages-and-plugins/swift-package-manager/for-app-developers/#step-1-add-fluttergeneratedpluginswiftpackage-package-dependency
[manualIntegrationStep2]: /packages-and-plugins/swift-package-manager/for-app-developers/#step-2-add-run-prepare-flutter-framework-script-pre-action

## 如何移除 Swift Package Manager 整合

為了新增 Swift Package Manager 整合，Flutter CLI 會遷移你的專案。
這個遷移會更新你的 Xcode 專案，以加入 Flutter 套件（plugin）相依性。

若要還原這個遷移：

1. [關閉 Swift Package Manager][Turn off Swift Package Manager]。

1. 清理你的專案：

   ```sh
   flutter clean
   ```

1. 在 Xcode 中開啟你的應用程式（`ios/Runner.xcworkspace` 或 `macos/Runner.xcworkspace`）。

1. 前往專案的 **Package Dependencies**（套件相依性）。

1. 點選 `FlutterGeneratedPluginSwiftPackage` 套件，然後點擊
   <span class="material-symbols" translate="no">remove</span>。

   {% render docs/captioned-image.liquid, image:"development/packages-and-plugins/swift-package-manager/remove-generated-package.png", caption:"要移除的 `FlutterGeneratedPluginSwiftPackage`" %}

1. 前往 `Runner` target 的 **Frameworks, Libraries, and Embedded Content**（框架、程式庫與嵌入內容）。

1. 點選 `FlutterGeneratedPluginSwiftPackage`，然後點擊
   <span class="material-symbols" translate="no">remove</span>。

   {% render docs/captioned-image.liquid, image:"development/packages-and-plugins/swift-package-manager/remove-generated-framework.png", caption:"要移除的 `FlutterGeneratedPluginSwiftPackage`" %}

1. 前往 **Product > Scheme > Edit Scheme**。

1. 在左側邊欄展開 **Build** 區段。

1. 點選 **Pre-actions**（預先動作）。

1. 展開 **Run Prepare Flutter Framework Script**。

1. 點選 **<span class="material-symbols" translate="no">delete</span>**。

   {% render docs/captioned-image.liquid, image:"development/packages-and-plugins/swift-package-manager/remove-flutter-pre-action.png", caption:"要移除的建置前動作" %}

[Turn off Swift Package Manager]: /packages-and-plugins/swift-package-manager/for-app-developers/#how-to-turn-off-swift-package-manager

## 如何使用需要較高作業系統版本的 Swift Package Manager Flutter 插件

如果某個 Swift Package Manager Flutter 插件所需的作業系統版本高於你的專案設定，可能會出現如下錯誤：

```plaintext
Target Integrity (Xcode): The package product 'plugin_name_ios' requires minimum platform version 14.0 for the iOS platform, but this target supports 12.0
```

要使用此插件：

1. 在 Xcode 中開啟您的應用程式（`ios/Runner.xcworkspace` 或 `macos/Runner.xcworkspace`）。

1. 提高您的應用程式目標的**Minimum Deployments**（最低部署版本）設定。

   {% render docs/captioned-image.liquid, image:"development/packages-and-plugins/swift-package-manager/minimum-deployments.png", caption:"目標的 **Minimum Deployments** 設定" %}

1. 如果您已更新 iOS 應用程式的 **Minimum Deployments**，請重新產生 iOS 專案的組態檔案：

   ```sh
   flutter build ios --config-only
   ```

1. 如果你已更新 macOS 應用程式的**最低部署版本（Minimum Deployments）**，  
   請重新產生 macOS 專案的設定檔案：

   ```sh
   flutter build macos --config-only
   ```
