在整份指南中，請將 `plugin_name` 替換為你的插件名稱。
以下範例使用 `ios`，請依實際情況替換為 `macos` 或 `darwin`。

1.  確認你目前執行的是 Flutter 3.44 或更新版本。此版本預設啟用 SwiftPM。

1. 首先，在 `ios`、`macos` 和/或 `darwin` 目錄下建立一個子目錄。
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
    - `Sources/plugin_name/include`（目錄）
    - `Sources/plugin_name/include/plugin_name`（目錄）
    - `Sources/plugin_name/include/plugin_name/.gitkeep`（檔案）
      - 此檔案確保該目錄會被提交。
        若目錄中已新增其他檔案，可移除 `.gitkeep` 檔案。

   你的插件結構應如下所示：

   <FileTree>

   - plugin_name/
     - ios/
       - ...
       - plugin_name/
         - **Package.swift**
         - **Sources/plugin_name/include/plugin_name/**
           - **.gitkeep/**

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
           // If the plugin name contains "_", replace with "-" for the library name
           .library(name: "plugin-name", targets: ["plugin_name"])
       ],
       dependencies: [],
       targets: [
           .target(
               // TODO: Update your target name.
               name: "plugin_name",
               dependencies: [],
               resources: [
                   // TODO: If your plugin requires a privacy manifest
                   // (in other words, if it uses any required reason APIs),
                   // update the PrivacyInfo.xcprivacy file
                   // to describe your plugin's privacy impact, and then uncomment this line.
                   // For more information, visit:
                   // https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
                   // .process("PrivacyInfo.xcprivacy"),

                   // TODO: If you have other resources that need to be bundled with your plugin, refer to
                   // the following instructions to add them:
                   // https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package
               ],
               cSettings: [
                   // TODO: Update your plugin name.
                   .headerSearchPath("include/plugin_name")
               ]
           )
       ]
   )
   ```

1. 更新 `Package.swift` 檔案中的[支援平台][supported platforms]。

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

1. 更新 `Package.swift` 檔案中的套件、程式庫與目標名稱。

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
                   // (for example, if it uses any required reason APIs),
                   // update the PrivacyInfo.xcprivacy file
                   // to describe your plugin's privacy impact, and then uncomment this line.
                   // For more information, visit:
                   // https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
                   // .process("PrivacyInfo.xcprivacy"),

                   // TODO: If you have other resources that need to be bundled with your plugin, refer to
                   // the following instructions to add them:
                   // https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package
               ],
               cSettings: [
                   // TODO: Update your plugin name.
                   .headerSearchPath("include/[!plugin_name!]")
               ]
           )
       ]
   )
   ```

   :::note
   若插件名稱包含 `_`，程式庫名稱必須改用 `-` 分隔。
   :::

1. 若你的插件有 [`PrivacyInfo.xcprivacy` 檔案][`PrivacyInfo.xcprivacy` file]，
   請將其移至 `ios/plugin_name/Sources/plugin_name/PrivacyInfo.xcprivacy`，
   並取消 `Package.swift` 檔案中對應資源的註解。

   ```swift title="Package.swift"
               resources: [
                   // TODO: If your plugin requires a privacy manifest
                   // (for example, if it uses any required reason APIs),
                   // update the PrivacyInfo.xcprivacy file
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
   若適用，請將資源檔加入 `Package.swift` 檔案。
   更多操作說明請參閱
   [https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package]({{site.apple-dev}}/documentation/xcode/bundling-resources-with-a-swift-package)。

1. 將 `ios/Classes` 中的所有公開標頭移至
   `ios/plugin_name/Sources/plugin_name/include/plugin_name`。

   * 若不確定哪些標頭是公開的，請查看 `podspec` 檔案的
     [`public_header_files`][] 屬性。
     若未指定此屬性，則所有標頭均為公開。
     建議你考慮是否真的需要將所有標頭設為公開。

   * 在 `pubspec.yaml` 中定義的 `pluginClass` 必須為公開，
     且須位於此目錄中。

1. 處理 `modulemap`。

   若你的插件沒有 `modulemap`，請跳過此步驟。

   若你使用 `modulemap` 讓 CocoaPods 建立 Test 子模組，
   可考慮在 Swift Package Manager 中將其移除。
   請注意，這會讓所有公開標頭都可透過模組存取。

   若要在 Swift Package Manager 中移除 `modulemap` 但保留 CocoaPods 的設定，
   請在插件的 `Package.swift` 檔案中排除 `modulemap` 和 umbrella header。

   以下範例假設 `modulemap` 和 umbrella header 位於
   `ios/plugin_name/Sources/plugin_name/include` 目錄中。

    ```swift title="Package.swift" diff
      .target(
          name: "plugin_name",
          dependencies: [],
    +     exclude: ["include/cocoapods_plugin_name.modulemap", "include/plugin_name-umbrella.h"],
    ```

    若你希望單元測試同時相容 CocoaPods 和 Swift Package Manager，
    可嘗試以下做法：

    ```objc title="Tests/TestFile.m" diff
      @import plugin_name;
    - @import plugin_name.Test;
    + #if __has_include(<plugin_name/plugin_name-umbrella.h>)
    +   @import plugin_name.Test;
    + #endif
    ```

    若要在 Swift 套件中使用自訂 `modulemap`，
    請參閱 [Swift Package Manager 的說明文件][Swift Package Manager's documentation]。

1. 將 `ios/Classes` 中所有剩餘的檔案移至
   `ios/plugin_name/Sources/plugin_name`。

1. `ios/Assets`、`ios/Resources` 和 `ios/Classes` 目錄現在應為空，
   可以刪除。

1. 若標頭檔案不再與實作檔案位於同一目錄，
   請更新你的 import 陳述式。

   舉例來說，假設有以下遷移情境：

   * 遷移前：

     ```plaintext
     ios/Classes/
     ├── PublicHeaderFile.h
     └── ImplementationFile.m
     ```

   * 遷移後：

     ```plaintext highlightLines=2
     ios/plugin_name/Sources/plugin_name/
     └── include/plugin_name/
        └── PublicHeaderFile.h
     └── ImplementationFile.m
     ```

   在此範例中，`ImplementationFile.m` 中的 import 陳述式應更新為：

   ```objc title="Sources/plugin_name/ImplementationFile.m" diff
   - #import "PublicHeaderFile.h"
   + #import "./include/plugin_name/PublicHeaderFile.h"
   ```

1. 若你的插件使用 [Pigeon][]，請更新 Pigeon 輸入檔案。

   ```dart title="pigeons/messages.dart" diff
     javaOptions: JavaOptions(),
   - objcHeaderOut: 'ios/Classes/messages.g.h',
   - objcSourceOut: 'ios/Classes/messages.g.m',
   + objcHeaderOut: 'ios/plugin_name/Sources/plugin_name/messages.g.h',
   + objcSourceOut: 'ios/plugin_name/Sources/plugin_name/messages.g.m',
     copyrightHeader: 'pigeons/copyright.txt',
   ```

   若 `objcHeaderOut` 檔案不再與 `objcSourceOut` 位於同一目錄，
   可透過 `ObjcOptions.headerIncludePath` 修改 `#import`：

   ```dart title="pigeons/messages.dart" diff
     javaOptions: JavaOptions(),
   - objcHeaderOut: 'ios/Classes/messages.g.h',
   - objcSourceOut: 'ios/Classes/messages.g.m',
   + objcHeaderOut: 'ios/plugin_name/Sources/plugin_name/include/plugin_name/messages.g.h',
   + objcSourceOut: 'ios/plugin_name/Sources/plugin_name/messages.g.m',
   + objcOptions: ObjcOptions(
   +   headerIncludePath: './include/plugin_name/messages.g.h',
   + ),
     copyrightHeader: 'pigeons/copyright.txt',
   ```

   執行 Pigeon 以依最新設定重新產生程式碼。

1. 依需求更新 `Package.swift` 檔案中的自訂設定。

   1. 在 Xcode 中開啟 `ios/plugin_name/` 目錄。

   1. 在 Xcode 中開啟 `Package.swift` 檔案。
      確認 Xcode 對此檔案不會產生任何警告或錯誤。

      :::tip
      若 Xcode 沒有顯示任何檔案，請退出 Xcode（**Xcode > Quit Xcode**）後重新開啟。

      若 Xcode 在你修改後沒有更新，請嘗試點擊
      **File > Packages > Reset Package Caches**。
      :::

   1. 若你的 `ios/plugin_name.podspec` 檔案有 [CocoaPods `dependency`][]，
      請將對應的 [Swift Package Manager dependencies][] 加入 `Package.swift` 檔案。

   1. 若套件必須明確指定連結方式為 `static` 或 `dynamic`
      （[Apple 不建議此做法][not recommended by Apple]），請更新 [Product][] 以定義類型：

      ```swift title="Package.swift"
      products: [
          .library(name: "plugin-name", type: .static, targets: ["plugin_name"])
      ],
      ```

   1. 進行其他自訂設定。如需了解如何撰寫 `Package.swift` 檔案的詳細資訊，請參閱
      [https://developer.apple.com/documentation/packagedescription](https://developer.apple.com/documentation/packagedescription)。

      :::tip
      若你在 `Package.swift` 檔案中新增目標，請使用唯一名稱，
      以避免與其他套件的目標發生衝突。
      :::

1. 更新 `ios/plugin_name.podspec` 以指向新路徑。

   ```ruby title="ios/plugin_name.podspec" diff
   - s.source_files = 'Classes/**/*.{h,m}'
   - s.public_header_files = 'Classes/**/*.h'
   - s.module_map = 'Classes/cocoapods_plugin_name.modulemap'
   - s.resource_bundles = {'plugin_name_privacy' => ['Resources/PrivacyInfo.xcprivacy']}
   + s.source_files = 'plugin_name/Sources/plugin_name/**/*.{h,m}'
   + s.public_header_files = 'plugin_name/Sources/plugin_name/include/**/*.h'
   + s.module_map = 'plugin_name/Sources/plugin_name/include/cocoapods_plugin_name.modulemap'
   + s.resource_bundles = {'plugin_name_privacy' => ['plugin_name/Sources/plugin_name/PrivacyInfo.xcprivacy']}
   ```

1. 更新從 bundle 載入資源的方式，改用 `SWIFTPM_MODULE_BUNDLE`：

   ```objc
   #if SWIFT_PACKAGE
      NSBundle *bundle = SWIFTPM_MODULE_BUNDLE;
    #else
      NSBundle *bundle = [NSBundle bundleForClass:[self class]];
    #endif
    NSURL *imageURL = [bundle URLForResource:@"image" withExtension:@"jpg"];
   ```

   :::note
   `SWIFTPM_MODULE_BUNDLE` 僅在有實際資源時才能使用（無論是
   [在 `Package.swift` 檔案中明確定義][Bundling resources]，還是
   [由 Xcode 自動偵測][Xcode resource detection]）。
   否則使用 `SWIFTPM_MODULE_BUNDLE` 將會產生錯誤。
   :::

1. 若 `ios/plugin_name/Sources/plugin_name/include` 目錄中
   只包含 `.gitkeep`，請更新 `.gitignore` 加入以下內容：

    ```text title=".gitignore"
    !.gitkeep
    ```

    執行 `flutter pub publish --dry-run` 以確認 `include` 目錄
    會被發布。

1. 將插件的變更提交至版本控制系統。

1. 驗證插件仍可與 CocoaPods 正常運作。

   1. 關閉 Swift Package Manager：

      ```sh
      flutter config --no-enable-swift-package-manager
      ```

   1. 切換至插件的範例應用程式目錄。

      ```sh
      cd path/to/plugin/example/
      ```

   1. 確認插件的範例應用程式可正常建置與執行。

      ```sh
      flutter run
      ```

   1. 切換至插件的頂層目錄。

      ```sh
      cd path/to/plugin/
      ```

   1. 執行 CocoaPods 驗證 lint：

      ```sh
      pod lib lint ios/plugin_name.podspec  --configuration=Debug --skip-tests --use-modular-headers --use-libraries
      ```

      ```sh
      pod lib lint ios/plugin_name.podspec  --configuration=Debug --skip-tests --use-modular-headers
      ```

1. 驗證插件可與 Swift Package Manager 正常運作。

   1. 開啟 Swift Package Manager：

      ```sh
      flutter config --enable-swift-package-manager
      ```

   1. 切換至插件的範例應用程式目錄。

      ```sh
      cd path/to/plugin/example/
      ```

   1. 確認插件的範例應用程式可正常建置與執行。

      ```sh
      flutter run
      ```

      :::note
      使用 Flutter CLI 在開啟 Swift Package Manager 功能的情況下執行插件的範例應用程式，
      會將專案遷移以加入 Swift Package Manager 整合。

      這會將範例應用程式的 Flutter SDK 最低版本需求提升至 3.24 或更高版本。

      若你希望使用較舊的 Flutter SDK 版本執行範例應用程式，
      請勿將遷移的變更提交至版本控制系統。
      如有需要，你隨時可以
      [復原 Swift Package Manager 遷移][removeSPM]。
      :::

   1. 在 Xcode 中開啟插件的範例應用程式。
      確認左側 **Project Navigator** 中顯示 **Package Dependencies**。

1. 驗證測試通過。

   * **若你的插件有原生單元測試（XCTest），請務必同時
     [更新插件範例應用程式中的單元測試][update unit tests in the plugin's example app]。**

   * 依照[測試插件][testing plugins]的說明操作。

[`PrivacyInfo.xcprivacy` file]: https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
[`public_header_files`]: https://guides.cocoapods.org/syntax/podspec.html#public_header_files
[Swift Package Manager's documentation]: {{site.github}}/apple/swift-package-manager/blob/main/Documentation/Usage.md#creating-c-language-targets
[Pigeon]: https://pub.dev/packages/pigeon
[CocoaPods `dependency`]: https://guides.cocoapods.org/syntax/podspec.html#dependency
[Swift Package Manager dependencies]: https://developer.apple.com/documentation/packagedescription/package/dependency
[not recommended by Apple]: https://developer.apple.com/documentation/packagedescription/product/library(name:type:targets:)
[Product]: https://developer.apple.com/documentation/packagedescription/product
[Bundling resources]: https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package#Explicitly-declare-or-exclude-resources
[Xcode resource detection]: https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package#:~:text=Xcode%20detects%20common%20resource%20types%20for%20Apple%20platforms%20and%20treats%20them%20as%20a%20resource%20automatically
[removeSPM]: /packages-and-plugins/swift-package-manager/for-app-developers#how-to-remove-swift-package-manager-integration
[update unit tests in the plugin's example app]: /packages-and-plugins/swift-package-manager/for-plugin-authors/#how-to-update-unit-tests-in-a-plugins-example-app
[testing plugins]: https://docs.flutter.dev/testing/testing-plugins
