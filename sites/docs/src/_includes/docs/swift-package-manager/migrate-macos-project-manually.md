遷移至 SwiftPM 需要更新
`macos/Runner.xcodeproj/project.pbxproj` 與
`macos/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme` 檔案。

### 步驟 1：新增 FlutterGeneratedPluginSwiftPackage 套件相依性 {:.no_toc}

1. 在 Xcode 中，開啟 `macos/Runner.xcworkspace`。
1. 導航至專案的 **Package Dependencies**。

   <DashImage image="development/packages-and-plugins/swift-package-manager/package-dependencies.png" caption="專案的套件相依性" />

1. 點擊 <Icon id="add" label="add/plus"></Icon> 按鈕。
1. 在開啟的對話框中，點擊 **Add Local...**。
1. 導航至 `macos/Flutter/ephemeral/Packages/FlutterGeneratedPluginSwiftPackage`
   並點擊 **Add Package**。
1. 確認已將其新增至 Runner Target，然後點擊 **Add Package**。

   <DashImage image="development/packages-and-plugins/swift-package-manager/choose-package-products.png" caption="確認套件已新增至 `Runner` target" />

1. 確認 `FlutterGeneratedPluginSwiftPackage` 已新增至 **Frameworks,
   Libraries, and Embedded Content**。

   <DashImage image="development/packages-and-plugins/swift-package-manager/add-generated-framework.png" caption="確認 `FlutterGeneratedPluginSwiftPackage` 已新增至 **Frameworks, Libraries, and Embedded Content**" />

### 步驟 2：新增 Run Prepare Flutter Framework Script 前置動作 {:.no_toc}

**以下步驟必須對每個 flavor 分別完成。**

1. 前往 **Product > Scheme > Edit Scheme**。
1. 展開左側欄的 **Build** 區段。
1. 點擊 **Pre-actions**。
1. 點擊 <Icon id="add" label="add/plus"></Icon> 按鈕
   並從選單中選取 **New Run Script Action**。
1. 點擊 **Run Script** 標題並將其修改為：

   ```plaintext
   Run Prepare Flutter Framework Script
   ```

1. 將 **Provide build settings from** 改為 `Runner` target。
1. 在文字方塊中輸入以下內容：

   ```sh
   "$FLUTTER_ROOT"/packages/flutter_tools/bin/macos_assemble.sh prepare
   ```

   <DashImage image="development/packages-and-plugins/swift-package-manager/add-flutter-pre-action.png" caption="新增 **Run Prepare Flutter Framework Script** 建置前置動作" />

### 步驟 3：執行應用程式 {:.no_toc}

1. 在 Xcode 中執行應用程式。
1. 確認 **Run Prepare Flutter Framework Script** 已作為前置動作執行，
   且 `FlutterGeneratedPluginSwiftPackage` 為目標相依項目。

   <DashImage image="development/packages-and-plugins/swift-package-manager/flutter-pre-action-build-log.png" caption="確認 `Run Prepare Flutter Framework Script` 已作為前置動作執行" />

1. 確認應用程式可透過命令列以 `flutter run` 正常執行。

[file an issue]: {{site.github}}/flutter/flutter/issues/new?template=2_bug.yml
