在本指南中，請將 `plugin_name` 替換為您的插件名稱。
以下範例使用 `ios`，請依實際情況替換為 `macos` 或 `darwin`。

1. 確認您使用的是 Flutter 3.44 或更新版本，此版本預設啟用 SwiftPM。

1. 首先在 `ios`、`macos` 及/或 `darwin` 目錄下建立一個子目錄。
   將這個新目錄命名為平台套件的名稱。

   <FileTree>

   - plugin_name/
     - ios/
       - ...
       - **plugin_name/**
   
   </FileTree>

1. 在這個新目錄中，建立以下檔案/目錄：

   - `Package.swift`（檔案）
   - `Sources`（目錄）
   - `Sources/plugin_name`（目錄）

   您的插件結構應如下所示：

   <FileTree>

   - plugin_name/
     - ios/
       - ...
       - plugin_name/
         - **Package.swift**
         - **Sources/**
           - **plugin_name/**

   </FileTree>

1. 在 `Package.swift` 檔案中使用以下範本：

   ```swift title="Package.swift"
   // swift-tools-version: 5.9
   // The swift-tools-version declares the minimum version of Swift required to build this package.

   import PackageDescription

   let package = Package(
       // TODO: Update your plugin name.
       name: "plugin_name",
       platforms: [
           // TODO: Update the platforms your plugin supports.
           // If your plugin only supports iOS, remove `.macOS(...)`.
           // If your plugin only supports macOS, remove `.iOS(...)`.
           .iOS("13.0"),
           .macOS("10.15")
       ],
       products: [
           // TODO: Update your library and target names.
           // If the plugin name contains "_", replace with "-" for the library name.
           .library(name: "plugin-name", targets: ["plugin_name"])
       ],
       dependencies: [
           .package(name: "FlutterFramework", path: "../FlutterFramework")
       ],
       targets: [
           .target(
               // TODO: Update your target name.
               name: "plugin_name",
               dependencies: [
                   .product(name: "FlutterFramework", package: "FlutterFramework")
               ],
               resources: [
                   // TODO: If your plugin requires a privacy manifest
                   // (e.g. if it uses any required reason APIs), update the PrivacyInfo.xcprivacy file
                   // to describe your plugin's privacy impact, and then uncomment this line.
                   // For more information, visit:
                   // https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
                   // .process("PrivacyInfo.xcprivacy"),

                   // TODO: If you have other resources that need to be bundled with your plugin, refer to
                   // the following instructions to add them:
                   // https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package
               ]
           )
       ]
   )
   ```

1. 在 `Package.swift` 檔案中更新[支援的平台][supported platforms]。

   ```swift title="Package.swift"
       platforms: [
           // TODO: Update the platforms your plugin supports.
           // If your plugin only supports iOS, remove `.macOS(...)`.
           // If your plugin only supports macOS, remove `.iOS(...)`.
           [!.iOS("13.0"),!]
           [!.macOS("10.15")!]
       ],
   ```

   [supported platforms]: {{site.apple-dev}}/documentation/packagedescription/supportedplatform

1. 在 `Package.swift` 檔案中更新套件、程式庫及目標名稱。

   ```swift title="Package.swift"
   let package = Package(
       // TODO: Update your plugin name.
       name: [!"plugin_name"!],
       platforms: [
           .iOS("13.0"),
           .macOS("10.15")
       ],
       products: [
           // TODO: Update your library and target names.
           // If the plugin name contains "_", replace with "-" for the library name
           .library(name: [!"plugin-name"!], targets: [[!"plugin_name"!]])
       ],
       dependencies: [],
       targets: [
           .target(
               // TODO: Update your target name.
               name: [!"plugin_name"!],
               dependencies: [],
               resources: [
                   // TODO: If your plugin requires a privacy manifest
                   // (e.g. if it uses any required reason APIs), update the PrivacyInfo.xcprivacy file
                   // to describe your plugin's privacy impact, and then uncomment this line.
                   // For more information, visit:
                   // https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
                   // .process("PrivacyInfo.xcprivacy"),

                   // TODO: If you have other resources that need to be bundled with your plugin, refer to
                   // the following instructions to add them:
                   // https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package
               ]
           )
       ]
   )
   ```

   :::note
   若插件名稱包含 `_`，程式庫名稱必須改用 `-` 分隔的版本。
   :::

1. 若您的插件有 [`PrivacyInfo.xcprivacy` 檔案][`PrivacyInfo.xcprivacy` file]，請將其移至
   `ios/plugin_name/Sources/plugin_name/PrivacyInfo.xcprivacy`，並在
   `Package.swift` 檔案中取消對應資源的註解。

   ```swift title="Package.swift"
               resources: [
                   // TODO: If your plugin requires a privacy manifest
                   // (e.g. if it uses any required reason APIs), update the PrivacyInfo.xcprivacy file
                   // to describe your plugin's privacy impact, and then uncomment this line.
                   // For more information, visit:
                   // https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
                   [!.process("PrivacyInfo.xcprivacy"),!]

                   // TODO: If you have other resources that need to be bundled with your plugin, refer to
                   // the following instructions to add them:
                   // https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package
               ],
   ```

1. 將 `ios/Assets` 中的資源檔移至
   `ios/plugin_name/Sources/plugin_name`（或其子目錄）。
   如有必要，將資源檔加入 `Package.swift` 檔案。
   更多操作說明請參考
   [使用 Swift 套件捆綁資源][Bundling resources with a Swift package]。

[Bundling resources with a Swift package]: {{site.apple-dev}}/documentation/xcode/bundling-resources-with-a-swift-package

1. 將 `ios/Classes` 中的所有檔案移至 `ios/plugin_name/Sources/plugin_name`。

1. 將 `FlutterFramework` 新增為相依套件，並更新 Dart 和 Flutter 版本。

   更新 `Package.swift` 以包含 `FlutterFramework`：

   ```swift title="Package.swift"
   dependencies: [
       [!.package(name: "FlutterFramework", path: "../FlutterFramework")!]
   ],
   targets: [
       .target(
           // TODO: Update your target name.
           name: "plugin_name",
           dependencies: [
               [!.product(name: "FlutterFramework", package: "FlutterFramework")!]
           ],
   ```

   在 `pubspec.yaml` 中，將版本更新為：

   ```yaml title="pubspec.yaml"
   environment:
     sdk: ^3.11.0
     flutter: ">=3.41.0"
   ```

1. `ios/Assets`、`ios/Resources` 和 `ios/Classes` 目錄現在應該是空的，可以刪除。

1. 若您的插件使用 [Pigeon][]，請更新 Pigeon 輸入檔案。

   ```dart title="pigeons/messages.dart" diff
     kotlinOptions: KotlinOptions(),
     javaOut: 'android/app/src/main/java/io/flutter/plugins/Messages.java',
     javaOptions: JavaOptions(),
   - swiftOut: 'ios/Classes/messages.g.swift',
   + swiftOut: 'ios/plugin_name/Sources/plugin_name/messages.g.swift',
     swiftOptions: SwiftOptions(),
   ```

1. 依需求更新 `Package.swift` 檔案中的自訂設定。

   1. 在 Xcode 中，開啟 `ios/plugin_name/` 目錄。

   1. 在 Xcode 中，開啟您的 `Package.swift` 檔案。
      確認 Xcode 對此檔案不產生任何警告或錯誤。

      :::tip
      若 Xcode 未顯示任何檔案，請退出 Xcode（**Xcode > Quit Xcode**）後重新開啟。

      若 Xcode 在您修改後未更新，請嘗試點選
      **File > Packages > Reset Package Caches**。
      :::

   1. 若您的 `ios/plugin_name.podspec` 檔案有 [CocoaPods `dependency`][]，
      請在 `Package.swift` 檔案中加入對應的 [Swift Package Manager 相依套件][Swift Package Manager dependencies]。

   1. 若您的套件必須明確指定為 `static` 或 `dynamic` 連結
      （[Apple 不建議此做法][not recommended by Apple]），請更新 [Product][] 以定義類型：

      ```swift title="Package.swift"
      products: [
          .library(name: "plugin-name", type: .static, targets: ["plugin_name"])
      ],
      ```

   1. 進行其他自訂設定。如需更多關於如何撰寫 `Package.swift` 檔案的資訊，
      請參考 [`PackageDescription`][]。

      :::tip
      若您在 `Package.swift` 中新增目標，請使用唯一名稱，
      以避免與其他套件的目標產生衝突。
      :::

[`PackageDescription`]: {{site.apple-dev}}/documentation/packagedescription

1. 更新 `ios/plugin_name.podspec` 以指向新路徑。

   ```ruby title="ios/plugin_name.podspec" diff
   - s.source_files = 'Classes/**/*.swift'
   - s.resource_bundles = {'plugin_name_privacy' => ['Resources/PrivacyInfo.xcprivacy']}
   + s.source_files = 'plugin_name/Sources/plugin_name/**/*.swift'
   + s.resource_bundles = {'plugin_name_privacy' => ['plugin_name/Sources/plugin_name/PrivacyInfo.xcprivacy']}
   ```

1. 更新從 bundle 載入資源的方式，改用 [`Bundle.module`][]。

   ```swift
   #if SWIFT_PACKAGE
        let settingsURL = Bundle.module.url(forResource: "image", withExtension: "jpg")
   #else
        let settingsURL = Bundle(for: Self.self).url(forResource: "image", withExtension: "jpg")
   #endif
   ```

   :::note
   `Bundle.module` 只有在
   [`Package.swift` 檔案中定義了資源][Bundling resources] 或
   [Xcode 自動包含資源][Xcode resource detection] 時才有效。
   否則，使用 `Bundle.module` 會產生錯誤。
   :::

1. 若您的 `.gitignore` 尚未包含 `.build/` 和 `.swiftpm/` 目錄，
   請更新 `.gitignore` 加入以下內容：

    ```text title=".gitignore"
    .build/
    .swiftpm/
    ```

    將插件的變更提交至您的版本控制系統。

1. 確認插件仍可在 CocoaPods 下正常運作。

   1. 關閉 Swift Package Manager。

      ```sh
      flutter config --no-enable-swift-package-manager
      ```

   1. 切換至插件的範例應用程式目錄。

      ```sh
      cd path/to/plugin/example/
      ```

   1. 確認插件的範例應用程式可以建置並執行。

      ```sh
      flutter run
      ```

   1. 切換至插件的頂層目錄。

      ```sh
      cd path/to/plugin/
      ```

   1. 執行 CocoaPods 驗證 lint。

      ```sh
      pod lib lint ios/plugin_name.podspec  --configuration=Debug --skip-tests --use-modular-headers --use-libraries
      ```

      ```sh
      pod lib lint ios/plugin_name.podspec  --configuration=Debug --skip-tests --use-modular-headers
      ```

1. 確認插件可在 Swift Package Manager 下正常運作。

   1. 開啟 Swift Package Manager。

       ```sh
       flutter config --enable-swift-package-manager
       ```

   1. 切換至插件的範例應用程式目錄。

      ```sh
      cd path/to/plugin/example/
      ```

   1. 確認插件的範例應用程式可以建置並執行。

      ```sh
      flutter run
      ```

      :::note
      使用 Flutter CLI 在開啟 Swift Package Manager 功能的情況下執行插件的範例應用程式，
      會將專案遷移以新增 Swift Package Manager 整合。

      這會將範例應用程式的 Flutter SDK 最低需求提升至 3.24 版或更新版本。

      若您需要使用較舊的 Flutter SDK 版本執行範例應用程式，
      請勿將遷移變更提交至版本控制系統。
      如有需要，您可以隨時
      [復原 Swift Package Manager 遷移][removeSPM]。
      :::

   1. 在 Xcode 中，開啟插件的範例應用程式。
      確認左側**專案導覽器**（Project Navigator）中顯示了 **Package Dependencies**。

1. 確認測試通過。

   * **若您的插件有原生單元測試（XCTest），請確保您也
     [更新了插件範例應用程式中的單元測試][update unit tests in the plugin's example app]。**

   * 請依照[測試插件][testing plugins]的操作說明進行。

[`PrivacyInfo.xcprivacy` file]: {{site.apple-dev}}/documentation/bundleresources/privacy_manifest_files
[Pigeon]: https://pub.dev/packages/pigeon
[CocoaPods `dependency`]: https://guides.cocoapods.org/syntax/podspec.html#dependency
[Swift Package Manager dependencies]: {{site.apple-dev}}/documentation/packagedescription/package/dependency
[not recommended by Apple]: {{site.apple-dev}}/documentation/packagedescription/product/library(name:type:targets:)
[Product]: {{site.apple-dev}}/documentation/packagedescription/product
[`Bundle.module`]: {{site.apple-dev}}/documentation/xcode/bundling-resources-with-a-swift-package#Access-a-resource-in-code
[Bundling resources]: {{site.apple-dev}}/documentation/xcode/bundling-resources-with-a-swift-package#Explicitly-declare-or-exclude-resources
[Xcode resource detection]: {{site.apple-dev}}/documentation/xcode/bundling-resources-with-a-swift-package#:~:text=Xcode%20detects%20common%20resource%20types%20for%20Apple%20platforms%20and%20treats%20them%20as%20a%20resource%20automatically
[removeSPM]: /packages-and-plugins/swift-package-manager/for-app-developers#how-to-remove-swift-package-manager-integration
[update unit tests in the plugin's example app]: /packages-and-plugins/swift-package-manager/for-plugin-authors/#how-to-update-unit-tests-in-a-plugins-example-app
[testing plugins]: /testing/testing-plugins
