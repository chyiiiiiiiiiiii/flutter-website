---
title: Swift Package Manager 給插件作者
description: 如何為 iOS 和 macOS 插件新增 Swift Package Manager 相容性
---

:::warning
Flutter 正在遷移至 [Swift Package Manager][Swift Package Manager]
以管理 iOS 和 macOS 的原生相依套件。
Flutter 對 Swift Package Manager 的支援仍在開發中。
如果你發現 Flutter 的 Swift Package Manager 支援有錯誤，
請[提交 issue][open an issue]。
Swift Package Manager 支援[預設為關閉][off by default]。
Flutter 仍然支援 CocoaPods。
:::

Flutter 整合 Swift Package Manager 有以下幾項優點：

1. **可存取 Swift 套件生態系統**。
   Flutter 插件現在可以使用日益壯大的 [Swift packages][Swift packages] 生態系統！
1. **簡化 Flutter 安裝流程**。
   Swift Package Manager 已隨 Xcode 一同安裝。
   未來，你不需要再安裝 Ruby 和 CocoaPods 來支援 iOS 或 macOS。


[Swift Package Manager]: https://www.swift.org/documentation/package-manager/
[off by default]: #how-to-turn-on-swift-package-manager
[Swift packages]: https://swiftpackageindex.com/
[open an issue]: {{site.github}}/flutter/flutter/issues/new?template=2_bug.yml

{% render docs/swift-package-manager/how-to-enable-disable.md, site: site %}

## 如何為現有 Flutter 插件新增 Swift Package Manager 支援

本指南說明如何為已支援 CocoaPods 的插件新增 Swift Package Manager 支援。
這可確保該插件可被所有 Flutter 專案使用。

在另行通知前，Flutter 插件應同時支援 _Swift Package Manager_ 和 CocoaPods。

Swift Package Manager 的導入將會是漸進式的。
尚未支援 CocoaPods 的插件，將無法被尚未遷移至 Swift Package Manager 的專案使用。
而不支援 Swift Package Manager 的插件，則可能會對已遷移的專案造成問題。


{% tabs %}
{% tab "Swift 插件" %}

{% render docs/swift-package-manager/migrate-swift-plugin.md, site: site %}

{% endtab %}
{% tab "Objective-C 插件" %}

{% render docs/swift-package-manager/migrate-objective-c-plugin.md, site: site %}

{% endtab %}
{% endtabs %}

## 如何更新插件範例 App 的單元測試

如果你的插件有原生的 XCTest 單元測試，且符合以下其中一項情況，則你可能需要更新測試以支援 Swift Package Manager：

* 你的測試使用了 CocoaPod 相依套件。
* 你的插件在 `Package.swift` 檔案中明確設定為 `type: .dynamic`。

要更新你的單元測試：

1. 在 Xcode 中開啟你的 `example/ios/Runner.xcworkspace`。

1. 如果你原本在測試中使用了 CocoaPod 相依套件（例如 `OCMock`），
   請將其從 `Podfile` 檔案中移除。

   ```ruby title="ios/Podfile" diff
     target 'RunnerTests' do
       inherit! :search_paths
   
   -   pod 'OCMock', '3.5'
     end
   ```

   然後在終端機中，在`plugin_name_ios/example/ios`目錄下執行`pod install`。

1. 導覽至專案的 **Package Dependencies**（套件相依性）。

   {% render docs/captioned-image.liquid, image:"development/packages-and-plugins/swift-package-manager/package-dependencies.png", caption:"專案的套件相依性" %}

1. 點擊 **+** 按鈕，並在右上角的搜尋欄中搜尋，新增任何僅用於測試的相依套件。

   {% render docs/captioned-image.liquid, image:"development/packages-and-plugins/swift-package-manager/search-for-ocmock.png", caption:"搜尋僅用於測試的相依套件" %}

   :::note
   OCMock 使用不安全的建置旗標，僅能在以 commit 指定時使用。
   `fe1661a3efed11831a6452f4b1a0c5e6ddc08c3d` 是 3.9.3 版本的 commit。
   :::

1. 確認該相依套件已加入至`RunnerTests`目標（Target）。

   {% render docs/captioned-image.liquid, image:"development/packages-and-plugins/swift-package-manager/choose-package-products-test.png", caption:"確保相依套件已加入至`RunnerTests`目標" %}

1. 點擊 **Add Package**（新增套件）按鈕。

1. 如果你已在`Package.swift`檔案中明確將 plugin 的 library type 設為`.dynamic`
   （[Apple 不建議這麼做][library type recommendations]），
   你還需要將其加入`RunnerTests`目標的相依套件中。

   1. 確認`RunnerTests`的 **Build Phases**（建置階段）中有 **Link Binary With Libraries**
      的建置階段：

      {% render docs/captioned-image.liquid, image:"development/packages-and-plugins/swift-package-manager/runner-tests-link-binary-with-libraries.png", caption:"`Link Binary With Libraries` 建置階段於`RunnerTests`目標" %}

      如果該建置階段尚未存在，請新增一個。
      點擊 <span class="material-symbols" translate="no">add</span>，然後點擊 **New Link Binary With Libraries Phase**（新增連結二進位檔與函式庫階段）。

      {% render docs/captioned-image.liquid, image:"development/packages-and-plugins/swift-package-manager/add-runner-tests-link-binary-with-libraries.png", caption:"新增`Link Binary With Libraries`建置階段" %}

   1. 導覽至專案的 **Package Dependencies**（套件相依性）。

   1. 點擊 <span class="material-symbols" translate="no">add</span>。

   1. 在開啟的對話視窗中，點擊 **Add Local...**（新增本地...）按鈕。

   1. 導覽至`plugin_name/plugin_name_ios/ios/plugin_name_ios`，然後點擊 **Add Package**（新增套件）按鈕。

   1. 確認已將其加入`RunnerTests`目標，並點擊 **Add Package**（新增套件）按鈕。

1. 確認測試通過：**Product > Test**。

[library type recommendations]: https://developer.apple.com/documentation/packagedescription/product/library(name:type:targets:)
