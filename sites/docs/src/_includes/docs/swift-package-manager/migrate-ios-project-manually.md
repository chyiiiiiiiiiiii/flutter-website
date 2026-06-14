遷移至 SwiftPM 需要更新
`ios/Runner.xcodeproj/project.pbxproj` 與
`ios/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme` 檔案。

### 步驟 1：新增 FlutterGeneratedPluginSwiftPackage 套件相依 {:.no_toc}

1. 在 Xcode 中開啟 `ios/Runner.xcworkspace`。
1. 前往專案的 **Package Dependencies**。

   <DashImage image="development/packages-and-plugins/swift-package-manager/package-dependencies.png" caption="專案的套件相依項目" />

1. 點選 <Icon id="add" label="add/plus"></Icon> 按鈕。
1. 在開啟的對話框中，點選 **Add Local...**。
1. 前往 `ios/Flutter/ephemeral/Packages/FlutterGeneratedPluginSwiftPackage`
   並點選 **Add Package**。
1. 確認已新增至 `Runner` target，然後點選 **Add Package**。

   <DashImage image="development/packages-and-plugins/swift-package-manager/choose-package-products.png" caption="確認套件已新增至 `Runner` target" />

1. 確認 `FlutterGeneratedPluginSwiftPackage` 已新增至 **Frameworks,
   Libraries, and Embedded Content**。

   <DashImage image="development/packages-and-plugins/swift-package-manager/add-generated-framework.png" caption="確認 `FlutterGeneratedPluginSwiftPackage` 已新增至 **Frameworks, Libraries, and Embedded Content**" />

### 步驟 2：新增 Run Prepare Flutter Framework Script 預先動作 {:.no_toc}

**以下步驟必須針對每個 flavor 個別完成。**

1. 前往 **Product > Scheme > Edit Scheme**。
1. 展開左側欄的 **Build** 區段。
1. 點選 **Pre-actions**。
1. 點選 <Icon id="add" label="add/plus"></Icon> 按鈕，
   並從選單中選取 **New Run Script Action**。
1. 點選 **Run Script** 標題並將其更名為：

   ```plaintext
   Run Prepare Flutter Framework Script
   ```

1. 將 **Provide build settings from** 變更為 `Runner` 應用程式。
1. 在文字方塊中輸入以下內容：

   ```sh
   "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" prepare
   ```

   <DashImage image="development/packages-and-plugins/swift-package-manager/add-flutter-pre-action.png" caption="新增 **Run Prepare Flutter Framework Script** 建置預先動作" />

### 步驟 3：執行應用程式 {:.no_toc}

1. 在 Xcode 中執行應用程式。
1. 確認 **Run Prepare Flutter Framework Script** 已作為預先動作執行，
   且 `FlutterGeneratedPluginSwiftPackage` 已列為 target 相依項目。

   <DashImage image="development/packages-and-plugins/swift-package-manager/flutter-pre-action-build-log.png" caption="確認 **Run Prepare Flutter Framework Script** 已作為預先動作執行" />

1. 確認應用程式可透過命令列以 `flutter run` 正常執行。

[turn on Swift Package Manager]: /packages-and-plugins/swift-package-manager/for-app-developers/#how-to-turn-on-swift-package-manager
[file an issue]: {{site.github}}/flutter/flutter/issues/new?template=2_bug.yml
