---
title: 為 iOS 與 macOS 設定 Flutter flavors
shortTitle: Flavors（iOS 與 macOS）
description: >
  如何為 iOS 或 macOS 應用程式建立 Flutter flavors。
---

本指南將說明如何為 iOS 或 macOS 應用程式建立 Flutter flavors。

## 概覽

Flutter flavor 基本上是一組設定，用來定義你的應用程式某個特定版本的建置與執行方式。例如，flavor 可以決定特定版本的應用程式所使用的圖示、應用名稱、API 金鑰、功能旗標（feature flag）以及日誌等級。

如果你想為 iOS 應用程式建立 Flutter flavors，必須在 Xcode 中進行設定。Xcode 並沒有「flavor」這個概念，而是需要建立「scheme」（方案），並為其附加自訂設定（configuration）。

以下範例說明了兩個 Flutter flavors（staging、production）如何作為 Xcode schemes，並分別指派自訂的 Xcode configurations：

<table class="table table-striped">
  <thead>
    <tr>
      <th>Scheme</th>
      <th>Configurations for the scheme</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>staging</td>
      <td>
        Debug-staging</br>
        Profile-staging</br>
        Release-staging</br>
      </td>
    </tr>
    <tr>
      <td>production</td>
      <td>
        Debug-production</br>
        Profile-production</br>
        Release-production</br>
      </td>
    </tr>
  </tbody>
</table>

## 設定 Xcode schemes

以下步驟將說明如何為你的 Flutter iOS 專案設定兩個名為 `staging` 和 `production` 的 Xcode schemes。你也可以依照這些步驟，將其中所有 `iOS` 的參考替換為 `macOS`，以設定 macOS 專案。

為了讓流程更順暢，本說明以一個名為 `flavors_example` 的全新 Flutter 專案為例，但你也可以直接在現有專案上操作。

1.  建立一個名為 `flavors_example` 的新 Flutter 專案。

    ```console title="console"
    $ flutter create flavors_example
    ```

1.  開啟`flavors_example` 專案的 iOS 版本預設 Xcode workspace。

    ```console title="console"
    $ cd flavors_example && open ios/Runner.xcworkspace
    ```

1.  在 Xcode 專案導覽器中開啟 `flavors_example` 專案：

    * 開啟 **專案導覽器**（**View** > **Navigators** > **Project**）。

    * 在 **專案導覽器**頂部，選擇 **Runner**。

1.  在 Xcode 中建立 schemes（方案）：

    * 開啟 **New Scheme** 視窗（**Product > Scheme > New Scheme**）。

    * 在 **Target** 欄位中，選擇 **Runner**。

    * 在 **Name** 欄位中，輸入 `staging`。

    * 點擊 **Okay** 以新增新的 scheme。

    * 針對名為 `production` 的 scheme，重複上述步驟。

    * 完成後，請確認你擁有以下 schemes：

      ![Schemes for Flutter flavors](/assets/images/docs/flavors/flavors-ios-schemes.png){:width="100%"}

    :::note
    預設情況下，新增的 schemes 會被設為共享。為了讓 Flutter flavors 正常運作，schemes 必須設為共享。你可以再次確認共享是否已啟用，方法是開啟 **Manage Schemes** 視窗（**Product > Scheme > Manage Schemes**），並確保新 scheme 右側的 **Shared** 核取方塊已勾選。
    :::   

1.  在 Xcode 中為 schemes 建立對應的 configurations（組態）：

    * 在 **專案導覽器**中，選擇 **Runner**。

    * 在主視窗的 **PROJECT** 區塊下，選擇 **Runner**。

    * 若尚未開啟，請切換到 **Info** 分頁。

    * 前往 **Configurations** 區段，新增新的 `Debug` 組態。

      * 點擊 **+**，選擇 **Duplicate "Debug" configuration**，並將新組態命名為 `Debug-staging`。
      * 點擊 **+**，選擇 **Duplicate "Debug" configuration**，並將新組態命名為 `Debug-production`。

    * 針對 `Release` 組態與 `Profile` 組態，重複上述步驟。
    
    * 完成後，請確認你擁有以下 configurations：

      ![Scheme configurations for Flutter flavors](/assets/images/docs/flavors/flavors-ios-scheme-configurations.png){:width="100%"}

    :::note
    若要搭配 Flutter CLI 指令使用，組態名稱後方所附加的 scheme 名稱（例如：`staging`）必須為小寫。
    :::

    :::note
    Your configurations should be based on your
    `Debug.xconfig`, `Profile.xcconfig`, and
    `Release.xcconfig` files, not the
    `Pods-Runner.xcconfigs` file. You can check this by
    expanding the configuration names in Xcode.
    :::

1.  在 Xcode 中將組態指派給 schemes：

    * 開啟 **Manage Schemes** 視窗
      （**Product > Scheme > Manage Schemes**）。

    * 選取 `staging` scheme 並進行編輯。

    * 在下列分頁中，依照以下方式更新
      **Build Configuration** 欄位：

      * **Run**：`Debug-staging`
      * **Test**：`Debug-staging`
      * **Profile**：`Profile-staging`
      * **Analyze**：`Debug-staging`
      * **Archive**：`Release-staging`

    * 點選 **Close**。

    * 對 `production` scheme 重複上述步驟。

1.  如果你正在處理一個已存在且至少有一個 Podfile 的 Flutter 專案，請更新該 Podfile。欲了解更多資訊，請參閱 [Update Podfiles][Update Podfiles]。

1.  為了確保所有設定都正確，請在 Xcode 中於新 scheme 上執行你的應用程式。你不會看到任何差異，因為組態設定尚未變更，但你需要確認應用程式可以順利執行。

    * 選取 `staging` scheme
      （**Product > Schemes > staging**）。

    * 在工具列中 `staging` 右側，選擇你想要測試的 iOS 裝置。以下範例中，裝置為 `iPhone 16 Pro`。

      ![Run a Flutter flavor](/assets/images/docs/flavors/flavors-ios-test-scheme.png){:width="100%"}

    * 執行 app scheme（**Product > Run**）。

    * 對 `production` scheme 重複上述步驟。

1.  如果一切順利執行，即可開始自訂你的組態。欲了解更多資訊，請參閱
    [Customize configurations][Customize configurations]。

[Update Podfiles]: #更新-podfile
[Customize configurations]: #customize-configurations

## 啟動 Xcode scheme

在你於 Xcode 中為 iOS 應用程式建立好 schemes 之後，可以透過 Xcode 或 Flutter 啟動特定的 scheme。你也可以依照這些步驟，將專案替換為 macOS，將所有 `iOS` 的參照替換為 `macOS`。

### 使用 flavor 旗標（Flutter CLI）

你可以使用下列步驟，透過 Flutter 命令列介面（Command Line Interface）在 `Debug` 模式下啟動 Xcode scheme：

1.  在你的 IDE 中啟動 iOS 模擬器。

1.  在終端機中，切換到
    `flavors_example` 目錄並輸入以下指令：

    ```console title="console"
    $ flutter run --flavor <xcode_scheme_name>
    ```

    * `<xcode_scheme_name>`：請將此處替換為你在 Xcode 中的 scheme 名稱（例如，`staging` 或 `production`）。

    範例：

    ```console title="console"
    $ flutter run --flavor staging
    ```

### 使用 run 指令（Xcode）

你可以依照以下步驟，在 Xcode 中啟動特定的 scheme：

1.  選擇你要測試的 scheme
    （**Product > Schemes > Choose scheme**）。

2.  在工具列中 scheme 名稱旁，選擇你要測試的裝置。

3.  執行你 App 的 scheme
    （**Product > Run**）。

## 自訂設定

在新增 Xcode scheme 後，你可以針對你的 iOS App 進行自訂。若要設定 macOS 專案，也可以依照以下步驟，只需將所有 `iOS` 的參照替換為 `macOS`。

### 建立不同的 App 顯示名稱 {: #create_a_distinct_app_display_name }

如果你有多個 scheme，為每個 scheme 設定不同的 App 名稱，可以快速辨識部署的 App 使用的是哪個 scheme。

<img src="/assets/images/docs/flavors/flavors-ios-app-names.png" alt="Rename a Flutter flavor" width="50%">

以下步驟說明如何在 Xcode 中，為專案 `flavors_example` 的兩個 scheme（`staging` 和 `production`）新增不同的 App 顯示名稱。

1.  在 Xcode 中建立使用者自訂設定：

    * 開啟 **project navigator**
      （**View > Navigators > Project**）。

    * 在 **project navigator** 頂部，選擇
      **Runner**。

    * 在主視窗 **TARGETS** 下，選擇
      **Runner**。

    * 開啟 **Build Settings** 分頁。

    * 在 Basic 分頁左側，點擊 **+** 並選擇
      **Add User-Defined Setting**。

    * 建立一個名稱為 `APP_DISPLAY_NAME` 的設定。

    * 展開 **APP_DISPLAY_NAME** 設定。

    * 為以下 key 指定對應的值：

      * **Debug-production**：`Flavors prod`
      * **Debug-staging**：`Flavors staging`
      * **Profile-production**：`Flavors prod`
      * **Profile-staging**：`Flavors staging`
      * **Release-production**：`Flavors prod`
      * **Release-staging**：`Flavors staging`

2.  在 Xcode 更新 `Info.plist`：

    * 在 project navigator 中，選擇
      **Runner > Runner > Info** 以開啟
      `flavor_test/ios/Runner/Info.plist`。

    * 在 **Information Property List** 下，找到以下 key 並更新其值：

      * **Key**：`CFBundleDisplayName`
      * **Value**：`$(APP_DISPLAY_NAME)`

3.  分別啟動每個 scheme（`staging`、`production`），確認 App 顯示名稱是否已正確變更。如何啟動 scheme，請參考 [Launch an Xcode scheme][Launch an Xcode scheme]。

[Launch an Xcode scheme]: #啟動-xcode-scheme

### 建立不同的圖示

如果你有多個 scheme，為每個設定不同的 App 圖示，可以快速辨識部署的 App 使用的是哪個 scheme。

<img src="/assets/images/docs/flavors/flavors-ios-icons.png" alt="Rename a Flutter flavor" width="50%">

以下步驟說明如何在 iOS 專案 `flavors_example` 中，為兩個 scheme（`staging` 和 `production`）新增不同的 App 圖示。

1.  準備你的圖示：

    * 使用你喜歡的設計工具，設計 staging 圖示和 production 圖示。

    * 產生 staging 圖示和 production 圖示所需的各種尺寸版本，並以 PNG 格式儲存。

      :::note
      你可以使用像 [App Icon Generator][App Icon Generator] 這類工具來產生各種尺寸的圖示。
      :::

2.  將圖示加入 Xcode 專案：

    * 開啟 **project navigator**
      （**View > Navigators > Project**）。

    * 在 **project navigator** 中，選擇
      **Runner > Runner > Assets** 以開啟
      **Assets** 視窗。

    * 針對 staging 圖示，完成以下步驟：

      * 點擊 **+  > iOS > iOS App icon**。

      * 將圖示命名為 `AppIcon-staging`。

      * 將 staging 圖示拖曳到
        **AppIcon-staging** 視窗，並確認圖示已分配到正確尺寸。

    * 對 production 圖示重複上述步驟。

3.  將圖示與 scheme 連結：

    * 開啟 **project navigator**。

    * 在主視窗 **TARGETS** 下，選擇
      **Runner**。

    * 開啟 **General** 分頁（若尚未開啟）。

    * 前往 **Apps Icons and Launch Screen** 區塊並展開。

    * 在 **App icon** 欄位右側，點擊 **+** 並依下列方式更新欄位：

      * **Debug-staging**：`AppIcon-staging`
      * **Profile-staging**：`AppIcon-staging`
      * **Release-staging**：`AppIcon-staging`
      * **Debug-production**：`AppIcon-production`
      * **Profile-production**：`AppIcon-production`
      * **Release-production**：`AppIcon-production`

4.  分別啟動每個 scheme（`staging`、`production`），確認 App 圖示是否已正確變更。如何啟動 scheme，請參考 [Launch an Xcode scheme][Launch an Xcode scheme]。

[Launch an Xcode scheme]: #啟動-xcode-scheme
[App Icon Generator]: https://www.appicon.co/

### 新增不同的 bundle identifier

bundle identifier 是你在 Apple 平台上應用程式的唯一識別碼。如果你將多個 Xcode scheme 作為 Flutter flavor 使用，可以讓 Apple 將每個 scheme 視為獨立的應用程式。為此，你需要為每個 scheme 指定不同的 bundle identifier。如此一來，你可以在某一版本（例如 `staging`）測試新功能或修復錯誤，而不影響另一版本（例如 `production`）。

以下步驟說明如何在 iOS 專案 `flavors_example` 中，為兩個 Xcode scheme（`staging` 和 `production`）設定唯一的 bundle identifier。

1.  在 Xcode 中開啟 **project navigator**
    （**View > Navigators > Project**）。

2.  在主視窗 **TARGETS** 下，選擇
    **Runner**。

3.  開啟 **Build Settings** 分頁。

4.  前往 **Packaging** 區段。

5.  展開 **Product Bundle Identifier** 設定，以查看不同的 build configuration。

6.  為每個 scheme 的 build configuration 設定所需的 bundle identifier。例如：

    *   Debug-staging、Profile-staging、Release-staging：

        `com.example.flavorsExample.staging`

    *   Debug、Profile、Release、Debug-production、
        Profile-production、Release-production：
        
        `com.example.flavorsExample`

7.  確認這些 bundle identifier 已包含在你的 App ID 中，且你的 App ID 已[註冊於 Apple Developer 帳號][registered in your Apple Developer account]。

[registered in your Apple Developer account]: https://developer.apple.com/help/account/identifiers/register-an-app-id/

### 資源打包

如果你的 App 某些資源僅在特定 flavor 使用，可以設定只在啟動該 flavor 時才打包這些資源，避免未使用資源造成 App bundle 檔案過大。若要為各 flavor 打包資源，請在專案的 pubspec 檔案的 `assets` 欄位中加入 `flavors` 子欄位。詳情請參考 [`assets` 欄位][`assets` field] 及 [Flutter pubspec options][Flutter pubspec options]。

[`assets` field]: /tools/pubspec#assets
[Flutter pubspec options]: /tools/pubspec

### 更新 Podfile

如果你在 Flutter iOS 專案中建立新的 Xcode scheme，且現有 Flutter 專案已包含 iOS Podfile，則必須更新 Flutter iOS Podfile，使其與你在 Xcode 所做的變更一致。

以下步驟說明如何在 Flutter 專案 `flavors_example` 中，將 iOS Podfile 更新為包含兩個新的 Xcode scheme（`staging` 和 `production`）。若要更新 macOS 專案，也可以依照這些步驟，只需將所有 `iOS` 的參照替換為 `macOS`。

1. 在你的 IDE 中開啟 `ios/Podfile` 檔案。
2. 依照下列方式更新內容並儲存。

    ```ruby title="flavors_example/ios/Podfile"
    project 'Runner', {
      ...
      'Debug' => :debug,
      'Debug-staging' => :debug,
      'Debug-production' => :debug,
      'Profile' => :release,
      'Profile-staging' => :release,
      'Profile-production' => :release,
      'Release' => :release,
      'Release-staging' => :release,
      'Release-production' => :release,
      ...
    ```

### 新增唯一的建置設定

你可以使用 [build settings][build settings] 來管理你的 iOS 建置流程，涵蓋從編譯、連結到除錯與發佈的各個階段。

你可以將建置設定與 Flutter flavors 搭配使用的一種方式，是將這些 build settings 指派給 Xcode 的 build configurations（建置組態）。

例如，你可能會希望為 `Debug-staging` 和 `Debug-production` 指派不同的 API URL。例如： 

```plaintext title="debug-staging-settings.xcconfig"
# Debug-staging build settings
API_BASE_URL = staging.flavors.com/api
```

```plaintext title="debug-production-settings.xcconfig"
# Debug-production build settings
API_BASE_URL = flavors.com/api
```

如果你想要為特定的建置組態（build configuration）新增額外的建置設定，請參閱 Apple 的
[將建置組態檔案新增至你的專案][Adding a build configuration file to your project]。

[build settings]: https://developer.apple.com/documentation/xcode/build-settings-reference/
[Adding a build configuration file to your project]: https://developer.apple.com/documentation/xcode/adding-a-build-configuration-file-to-your-project

### 新增額外自訂設定

本文件包含了一些常見的 Xcode scheme 組態，但你還可以套用更多不同的設定。
若想了解更多相關資訊，請參閱
[自訂專案的建置 scheme][Customizing the build schemes for a project]。

[Customizing the build schemes for a project]: https://developer.apple.com/documentation/xcode/customizing-the-build-schemes-for-a-project

## 更多資訊

如需建立與使用 flavors 的更多資訊，請參考以下資源：

* [如何使用 FlutterFire CLI 設定 Flutter 與 Firebase 多重 flavors][flutterfireCLI]
* [在 Flutter（Android 與 iOS）中使用不同 Firebase 專案建立 build flavors，Flutter Ready to Go][flavors-firebase]

[flutterfireCLI]: https://codewithandrea.com/articles/flutter-firebase-multiple-flavors-flutterfire-cli/
[flavors-firebase]: {{site.medium}}/@animeshjain/build-flavors-in-flutter-android-and-ios-with-different-firebase-projects-per-flavor-27c5c5dac10b
