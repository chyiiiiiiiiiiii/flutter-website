---
title: 將 Flutter 應用程式整合至您的 macOS 專案
shortTitle: 整合 Flutter
description: 瞭解如何將 Flutter 應用程式整合至您現有的 macOS 專案。
---

:::note
自 3.44 版本起，Flutter 使用 [Swift Package Manager][]
來管理 iOS 和 macOS 的原生相依性。
Flutter 繼續以維護模式支援 CocoaPods，
但 CocoaPods 套件庫將於
[2026 年 12 月 2 日永久改為唯讀][cocoapods]。
:::

[cocoapods]: https://blog.cocoapods.org/CocoaPods-Specs-Repo/
[Swift Package Manager]: https://www.swift.org/documentation/package-manager/

Flutter UI 元件 (Widget) 可以透過 Swift 套件
逐步新增至您現有的 macOS 應用程式中。

## 前置條件

* Flutter 3.44 或更新版本
* Xcode 15.0 或更新版本

### 從舊版整合方式遷移（如適用）{: #migrate-legacy-integration}

若您先前已使用嵌入式框架將 Flutter 整合至 macOS 應用程式，
在依照以下 Swift Package Manager 指示操作之前，
必須先移除該整合。

<details>
  <summary>展開以查看從嵌入式框架整合方式遷移的指示</summary>

  若您的應用程式先前使用由 `flutter build macos-framework` 指令
  產生的框架進行整合，
  必須先從 Xcode 專案中移除這些框架。

  1. 前往您目標的 **General** 分頁，
     在 **Frameworks, Libraries, and Embedded Content** 下
     移除所有與 Flutter 相關的框架和函式庫。

       這包括 `App.xcframework`、`FlutterMacOS.xcframework`、
       `FlutterPluginRegistrant.xcframework`，
       以及任何 Flutter 插件的 `xcframework` 檔案。

  1. 從 Podfile 中移除 Flutter pod
      ```ruby title="MyApp/Podfile" diff
      - pod 'FlutterMacOS', :podspec => '/path/to/MyApp/Flutter/[build mode]/FlutterMacOS.podspec'
      ```

   1. 執行 `pod install`。
</details>

### 整理專案的相對位置 {: #organize-projects-relatively}

本指南假設您現有的 macOS 應用程式
和 Flutter 應用程式位於相鄰的目錄中。
若您的目錄結構不同，
需要相應調整範例中的相對路徑。

:::note

若是首次整合，
請執行以下指令建立新的 Flutter 應用程式：

```console
flutter create my_flutter_app
```

:::

範例目錄結構如下所示：

<FileTree>

- my_flutter_app/
  - macos/
  - lib/
    - main.dart
- MyNativeApp/
  - MyNativeApp.xcodeproj/

</FileTree>

## 與 Swift Package Manager 整合 {: #integrate-with-swiftpm}

 1. <h3>建置 FlutterNativeIntegration Swift 套件</h3>

    在您的 Flutter 應用程式或模組中，執行以下指令：

    ```console
    flutter build swift-package --platform macos
    ```

    此指令會產生以下目錄：

    <FileTree>

    - my_flutter_app/build/macos/SwiftPackages/
      - FlutterNativeIntegration/ (一個 Swift 套件)
      - Scripts/ (腳本及其他所需檔案的目錄)

    </FileTree>

    您可以選擇使用 `--output` 旗標
    來變更此輸出的位置。

 1. <h3>將 FlutterNativeIntegration 新增至您的 Xcode 專案</h3>

    1. 在 Project navigator 中，右鍵點擊您的專案
       並選擇 **Add Files to "MyNativeApp"...**
    1. 導覽至並選取產生的
       `FlutterNativeIntegration` Swift 套件，然後點擊 **Add**。
    1. 選擇 **Reference files in place** 並點擊 **Finish**。
    1. 在 File inspector 中，
       確認 **Location** 為 **Relative to Project**。
       若不是，您需要將 Flutter 輸出目錄
       移至與原生應用程式相鄰的目錄。

       <DashImage image="development/add-to-app/macos/project-setup-swiftpm/flutternativeintegration-relative-location.png" caption="Xcode File inspector 中顯示的 FlutterNativeIntegration 相對位置。" />

    1. 前往您目標的 **General** 分頁，
       在 **Frameworks, Libraries, and Embedded Content** 下
       新增 `FlutterNativeIntegration`。
       <DashImage image="development/add-to-app/ios/project-setup-swiftpm/flutternativeintegration-library.png" caption="Frameworks, Libraries, and Embedded Content 下的 FlutterNativeIntegration。" />

 1. <h3>新增建置設定</h3>

    1. 在 **Build Settings** 分頁中，
       設定 Flutter 應用程式 Swift 套件輸出目錄的位置：
       ```
       FLUTTER_SWIFT_PACKAGE_OUTPUT=$SRCROOT/../my_flutter_app/build/macos/SwiftPackages
       ```
    1. 針對自訂設定，設定 Flutter 建置模式。

       Flutter 支援三種[建置模式][build modes]：Debug、Profile 和 Release。
       建置模式透過 `CONFIGURATION` 的值來決定。
       若您的設定名稱與這些名稱不符，
       可以將 `FLUTTER_BUILD_MODE` 建置設定
       設為其中一個值。

       <DashImage image="development/add-to-app/ios/project-setup-swiftpm/flutter-build-mode.png" caption="在 **Build Settings** 下為自訂設定設定 `FLUTTER_BUILD_MODE`。" />

    1. 僅針對 **Debug** 設定，設定以下建置設定：

       ```
       ENABLE_APP_SANDBOX=YES
       ENABLE_INCOMING_NETWORK_CONNECTIONS=YES
       RUNTIME_EXCEPTION_ALLOW_JIT=YES
       ```

       <DashImage image="development/add-to-app/macos/project-setup-swiftpm/allow-jit-build-setting.png" caption="僅針對 **Debug** 設定，在目標的 **Build Settings** 中將 **Allow JIT** (RUNTIME_EXCEPTION_ALLOW_JIT) 設為 **YES**。" />

    1. （可選）允許 Xcode 重新建置您的 Flutter 應用程式。

       在目標中新增以下建置設定，
       讓 Xcode 在其建置過程中重新建置您的 Flutter 應用程式。
       這可讓您在修改 Flutter 應用程式時，
       無需重新執行 `flutter build swift-package`。
       這需要機器上已安裝 Flutter。

       ```
       FLUTTER_APPLICATION_PATH=$SRCROOT/../my_flutter_app
       ENABLE_USER_SCRIPT_SANDBOXING=NO
       ```

       :::tip
       這只會重新建置 Flutter 應用程式的程式碼。
       若您新增了新的相依套件，
       仍需重新執行 `flutter build swift-package`。
       :::

 1. <h3>在 Scheme 中新增 Pre-action Run Script</h3>

    1. 開啟 **Product** &gt; **Scheme** &gt; **Edit Scheme...**
       &gt; **Build**（左側邊欄）&gt; **Pre-action** &gt; **+**
       &gt; **New Run Script Action**

    1. 在 **Provide build settings from** 下拉選單中選擇您的專案。

    1. 將腳本設定為以下內容：
       ```
       /bin/sh $FLUTTER_SWIFT_PACKAGE_OUTPUT/Scripts/flutter_integration.sh prebuild
       ```

    <DashImage image="development/add-to-app/ios/project-setup-swiftpm/pre-action.png" caption="Scheme 編輯器中的 Pre-action Run Script。" />

 1. <h3>在目標中新增新的 Run Script 建置階段</h3>

    1. 前往您目標的 **Build Phases**
       &gt; **+** &gt; **New Run Script Phase**

    1. 將腳本設定為以下內容：
       ```
       /bin/sh $FLUTTER_SWIFT_PACKAGE_OUTPUT/Scripts/flutter_integration.sh assemble
       ```
    1. 取消勾選 **Based on dependency analysis**
    1. 在 **Input File Lists** 中新增以下內容：
       ```
       $(FLUTTER_SWIFT_PACKAGE_OUTPUT)/Scripts/FlutterAssembleInputs.xcfilelist
       ```

    <DashImage image="development/add-to-app/ios/project-setup-swiftpm/build-phase-run-script.png" caption="Build Phases 下的新 Run Script Build Phase。" />

{:.steps}

## 後續步驟

您現在可以[在現有 macOS 應用程式中新增 Flutter 頁面][add a Flutter screen]。

[add a Flutter screen]: /add-to-app/macos/add-flutter-screen
[build modes]: /testing/build-modes
