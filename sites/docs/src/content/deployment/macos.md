---
title: 建置與發佈 macOS 應用程式
description: 如何將 Flutter 應用程式發佈到 macOS App Store。
shortTitle: macOS
---

本指南將逐步說明如何將 Flutter 應用程式發佈到 [App Store][appstore]。

## 前置作業

在開始發佈應用程式的流程前，請確保您的應用程式符合 Apple 的 [App Review Guidelines][appreview]（應用程式審查指引）。

若要將應用程式發佈到 App Store，您必須先加入 [Apple Developer Program][devprogram]。
您可以在 Apple 的 [Choosing a Membership][devprogram_membership] 指南中，了解各種會員方案的詳細資訊。

## 在 App Store Connect 註冊您的應用程式

請在 [App Store Connect][appstoreconnect_login] (formerly iTunes Connect) 上管理您的應用程式生命週期。
您可以在此定義應用程式名稱與描述、加入螢幕截圖、設定價格，並管理 App Store 與 TestFlight 的發佈。

註冊應用程式包含兩個步驟：註冊唯一的 Bundle ID，以及在 App Store Connect 上建立應用程式記錄。

如需 App Store Connect 的詳細說明，請參閱 [App Store Connect][appstoreconnect_guide] 指南。

### 註冊 Bundle ID

每個 macOS 應用程式都會關聯一個 Bundle ID，這是一個向 Apple 註冊的唯一識別碼。
請依照下列步驟為您的應用程式註冊 Bundle ID：

1. 開啟您開發者帳號的 [App IDs][devportal_appids] 頁面。
1. 點選 **+** 以建立新的 Bundle ID。
1. 輸入應用程式名稱，選擇 **Explicit App ID**，並輸入一個 ID。
1. 選擇您的應用程式所需的服務，然後點選 **Continue**。
1. 在下一頁確認細節後，點選 **Register** 以註冊您的 Bundle ID。

### 在 App Store Connect 建立應用程式記錄

在 App Store Connect 註冊您的應用程式：

1. 在瀏覽器中開啟 [App Store Connect][appstoreconnect_login]。
1. 在 App Store Connect 首頁，點選 **My Apps**。
1. 在 My Apps 頁面左上角點選 **+**，然後選擇 **New App**。
1. 在出現的表單中填寫您的應用程式詳細資訊。在 Platforms 區段，請確保已勾選 macOS。
   由於 Flutter 目前尚未支援 tvOS，請勿勾選該選項。點選 **Create**。
1. 進入您的應用程式詳細頁面，並從側邊欄選擇 **App Information**。
1. 在 General Information 區段，選擇您於前一步註冊的 Bundle ID。

如需詳細說明，請參閱 [Add an app to your account][appstoreconnect_guide_register]。

## 檢查 Xcode 專案設定

本步驟將說明如何檢查 Xcode 工作區中最重要的設定。
如需詳細操作與說明，請參閱 [Prepare for app distribution][distributionguide_config]。

請在 Xcode 中前往您的目標設定：

1. 在 Xcode 中，開啟您應用程式 `macos` 資料夾內的 `Runner.xcworkspace`。
1. 若要檢視應用程式設定，請在 Xcode 專案導覽器中選擇 **Runner** 專案。接著，在主視圖側邊欄中選擇 **Runner** 目標。
1. 選擇 **General** 分頁。

請確認下列重要設定。

在 **Identity** 區段：

`App Category`
: 您的應用程式在 Mac App Store 上所屬的應用程式類別。此欄位不可為 none。

`Bundle Identifier`
: 您在 App Store Connect 上註冊的 App ID。

在 **Deployment info** 區段：

`Deployment Target`
: 您的應用程式支援的最低 macOS 版本。
  若要查詢 Flutter 支援部署到哪些 macOS 版本，請參閱 Flutter 的 [Supported deployment platforms][]。

在 **Signing & Capabilities** 區段：

`Automatically manage signing`
: Xcode 是否應自動管理應用程式簽署與描述檔。預設為 `true`，對大多數應用程式來說已足夠。如需更複雜的情境，請參閱 [Code Signing Guide][codesigning_guide]。

`Team`
: 選擇與您註冊的 Apple Developer 帳號相關聯的團隊。如有需要，請選擇 **Add Account...**，然後更新此設定。

您的專案設定的 **General** 分頁應如下圖所示：

![Xcode Project Settings](/assets/images/docs/releaseguide/macos_xcode_settings.png){:width="100%"}

如需應用程式簽署的詳細說明，請參閱 [Create, export, and delete signing certificates][appsigning]。

[Supported deployment platforms]: /reference/supported-platforms

## 設定應用程式名稱、Bundle Identifier 與版權

產品識別相關設定統一集中於 `macos/Runner/Configs/AppInfo.xcconfig`。若要設定應用程式名稱，請設置 `PRODUCT_NAME`；設定版權請設置 `PRODUCT_COPYRIGHT`；最後，請於 `PRODUCT_BUNDLE_IDENTIFIER` 設定應用程式的 bundle identifier。

## 更新應用程式版本號

應用程式的預設版本號為 `1.0.0`。
若要更新版本號，請前往 `pubspec.yaml` 檔案，並更新下列這一行：

`version: 1.0.0+1`

版本號由三個以點分隔的數字組成，例如上述範例中的 `1.0.0`，後面可選擇性加上一個 build number，例如上述範例中的 `1`，兩者以 `+` 分隔。

在 Flutter 的建置過程中，您可以分別透過指定 `--build-name` 與 `--build-number` 來覆寫版本號與 build number。

在 macOS 中，`build-name` 使用 `CFBundleShortVersionString`，而 `build-number` 則使用 `CFBundleVersion`。
如需更多關於 iOS 版本管理的資訊，請參閱 Apple Developer 網站上的 [Core Foundation Keys][]。

## 新增應用程式圖示

當您建立新的 Flutter 應用程式時，會自動產生一組預設圖示。本步驟將說明如何將這些預設圖示替換為您自己的應用程式圖示：

1. 請參閱 [macOS App Icon][appicon] 指南。
1. 在 Xcode 專案導覽器中，選擇 `Assets.xcassets`（位於 `Runner` 資料夾內）。請將預設圖示替換為您自己的應用程式圖示。
1. 透過執行 `flutter run -d macos` 來驗證圖示已成功替換。

## 使用 Xcode 建立建置封存檔（Build Archive）

本步驟將說明如何使用 Xcode 建立建置封存檔，並將您的建置上傳至 App Store Connect。

在開發期間，您會以 _debug_ 模式進行建置、除錯與測試。當您準備好將應用程式發佈到 App Store 或 TestFlight 給使用者時，需準備 _release_ 模式的建置。
此時，您可以考慮[混淆您的 Dart 程式碼][obfuscating your Dart code]，以增加逆向工程的難度。混淆程式碼僅需在建置指令中加入幾個參數即可。

在 Xcode 中，請設定應用程式版本與建置號：

1. 開啟您應用程式 `macos` 資料夾內的 `Runner.xcworkspace`。若要從命令列執行，請於應用程式專案的根目錄下執行下列指令。
   ```console
   open macos/Runner.xcworkspace
   ```
1. 在 Xcode 專案導覽器中選擇 **Runner**，然後在設定檢視側邊欄中選擇
   **Runner** target。
1. 在 Identity（識別）區段中，將 **Version** 更新為你希望發布給使用者看到的版本號碼。
1. 在 Identity（識別）區段中，將 **Build** 識別碼更新為一個用於在 App Store Connect 追蹤此版本的唯一建置編號。
   每次上傳都需要一個唯一的建置編號。

最後，建立建置封存（build archive）並上傳至 App Store Connect：

1. 建立你的應用程式的發行版 Archive（封存檔）。在你的應用程式專案根目錄下，執行以下指令。
   ```console
   flutter build macos
   ```
1. 開啟 Xcode，選擇 **Product > Archive**，以開啟在前一步建立的封存檔（archive）。
1. 點擊 **Validate App** 按鈕。如果有任何問題被回報，請修正後重新建立一次 build。在你上傳封存檔前，可以重複使用同一個 build ID。
1. 封存檔驗證成功後，點擊 **Distribute App**。你可以在 [App Store Connect][appstoreconnect_login] 上，進入你的應用程式詳細頁的 Activities 分頁，追蹤 build 的狀態。

你應該會在 30 分鐘內收到一封電子郵件，通知你的 build 已通過驗證，並可在 TestFlight 上釋出給測試者。此時，你可以選擇在 TestFlight 上釋出，或是直接將你的應用程式發佈到 App Store。

如需更多細節，請參閱
[Upload an app to App Store Connect][distributionguide_upload]。

## 使用 Codemagic CLI 工具建立 build 封存檔

本步驟說明如何使用 Flutter build 指令與 [Codemagic CLI Tools][codemagic_cli_tools]，在 Flutter 專案目錄的終端機中建立 build 封存檔並上傳到 App Store Connect。

<ol>
<li>

安裝 Codemagic CLI 工具：

```bash
pip3 install codemagic-cli-tools
```

</li>
<li>

你需要產生一組具有 App Manager 存取權限的 [App Store Connect API Key][appstoreconnect_api_key]，以便自動化與 App Store Connect 的操作。為了讓後續指令更簡潔，請將新金鑰中的 issuer id、key id 以及 API 金鑰檔案設定為以下環境變數。

```bash
export APP_STORE_CONNECT_ISSUER_ID=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
export APP_STORE_CONNECT_KEY_IDENTIFIER=ABC1234567
export APP_STORE_CONNECT_PRIVATE_KEY=`cat /path/to/api/key/AuthKey_XXXYYYZZZ.p8`
```

</li>
<li>

你需要匯出或建立 Mac App Distribution 以及 Mac Installer Distribution 憑證，以進行程式碼簽署並封裝建置歸檔檔案。

如果你已有現有的 [憑證][devportal_certificates]，可以針對每個憑證執行以下指令來匯出私鑰：

```bash
openssl pkcs12 -in <certificate_name>.p12 -nodes -nocerts | openssl rsa -out cert_key
```

或者，你也可以透過執行以下指令來建立新的私密金鑰：

```bash
ssh-keygen -t rsa -b 2048 -m PEM -f cert_key -q -N ""
```

之後，你可以讓命令列介面 (Command Line Interface, CLI) 工具自動建立新的 Mac App Distribution 以及 Mac Installer Distribution 憑證。你可以為每個新憑證使用相同的私鑰。

</li>
<li>

從 App Store Connect 下載程式碼簽署檔案：

```bash
app-store-connect fetch-signing-files YOUR.APP.BUNDLE_ID \
    --platform MAC_OS \
    --type MAC_APP_STORE \
    --certificate-key=@file:/path/to/cert_key \
    --create
```

其中 `cert_key` 可以是你匯出的 Mac App Distribution 憑證私鑰，或是一組新的私鑰（系統會自動產生新的憑證）。

</li>
<li>

如果你沒有 Mac Installer Distribution 憑證，可以執行以下指令來建立新的憑證：

```bash
app-store-connect certificates create \
    --type MAC_INSTALLER_DISTRIBUTION \
    --certificate-key=@file:/path/to/cert_key \
    --save
```

請使用先前建立的私密金鑰的 `cert_key`。

</li>
<li>

取得 Mac Installer Distribution 憑證：

```bash
app-store-connect certificates list \
    --type MAC_INSTALLER_DISTRIBUTION \
    --certificate-key=@file:/path/to/cert_key \
    --save
```

</li>
<li>

建立一個新的暫存金鑰圈（keychain），用於程式碼簽章（code signing）：

```bash
keychain initialize
```

:::note 恢復登入鑰匙圈！
在執行 `keychain initialize` 之後，您**必須**執行以下指令：<br>

`keychain use-login`

這會將您的登入鑰匙圈設為預設，以避免本機應用程式可能發生的驗證問題。
:::

</li>
<li>

現在，請將取得的憑證加入您的鑰匙圈：

```bash
keychain add-certificates
```

</li>
<li>

更新 Xcode 專案設定以使用擷取到的簽章設定檔：

```bash
xcode-project use-profiles
```

</li>

<li>

安裝 Flutter 相依套件：

```bash
flutter packages pub get
```

</li>
<li>

安裝 CocoaPods 相依套件：

```bash
find . -name "Podfile" -execdir pod install \;
```

</li>
<li>

建置 Flutter macOS 專案：

```bash
flutter build macos --release
```

</li>
<li>

封裝應用程式：

```bash
APP_NAME=$(find $(pwd) -name "*.app")
PACKAGE_NAME=$(basename "$APP_NAME" .app).pkg
xcrun productbuild --component "$APP_NAME" /Applications/ unsigned.pkg

INSTALLER_CERT_NAME=$(keychain list-certificates \
          | jq '[.[]
            | select(.common_name
            | contains("Mac Developer Installer"))
            | .common_name][0]' \
          | xargs)
xcrun productsign --sign "$INSTALLER_CERT_NAME" unsigned.pkg "$PACKAGE_NAME"
rm -f unsigned.pkg
```

</li>
<li>

將已封裝的應用程式發佈到 App Store Connect：

```bash
app-store-connect publish \
    --path "$PACKAGE_NAME"
```

</li>
<li>

如前所述，請不要忘記將您的登入鑰匙圈（login keychain）設為預設值，以避免您機器上的應用程式發生驗證問題：

```bash
keychain use-login
```

</li>
</ol>

## 在 TestFlight 發佈您的應用程式

[TestFlight][] 讓開發者可以將應用程式推送給內部和外部測試人員。這個可選步驟說明如何在 TestFlight 上發佈您的建置版本。

1. 前往 [App Store Connect][appstoreconnect_login] 中您應用程式的應用程式詳細資料頁面的 TestFlight 分頁。
1. 在側邊欄選擇 **Internal Testing**（內部測試）。
1. 選擇要發佈給測試人員的建置版本，然後點擊 **Save**（儲存）。
1. 新增任何內部測試人員的電子郵件地址。您也可以在 App Store Connect 頁面頂部下拉選單中的 **Users and Roles**（使用者與角色）頁面，新增其他內部使用者。

## 發佈到已註冊裝置

請參考 [distribution guide][distributionguide_macos]，準備要分發到指定 Mac 電腦的封存檔案。

## 將您的應用程式發佈到 App Store

當您準備好將應用程式發佈給全世界時，請依照以下步驟提交您的應用程式進行審查並發佈到 App Store：

1. 在 [App Store Connect][appstoreconnect_login] 的應用程式詳細資料頁面側邊欄選擇 **Pricing and Availability**（價格與可用性），並填寫必要資訊。
1. 在側邊欄選擇狀態。如果這是此應用程式的首次發佈，狀態會是 **1.0 Prepare for Submission**（1.0 準備提交）。請完成所有必填欄位。
1. 點擊 **Submit for Review**（提交審查）。

Apple 會在應用程式審查流程完成時通知您。您的應用程式將依您在 **Version Release**（版本發佈）區段中指定的指示發佈。

如需更多詳細資訊，請參閱 [Distribute an app through the App Store][distributionguide_submit]。

## 疑難排解

[Distribute your app][distributionguide] 指南提供了將應用程式發佈到 App Store 的詳細流程說明。

## 其他資源

若想了解如何以開源方式封裝並分發您的 Flutter 桌面應用程式到 macOS，而不需使用付費的 Apple 開發者帳號，請參考逐步說明的 [macOS packaging guide][macos_packaging_guide]。

[appicon]: {{site.apple-dev}}/design/human-interface-guidelines/macos/icons-and-images/app-icon/
[appreview]: {{site.apple-dev}}/app-store/review/
[appsigning]: https://help.apple.com/xcode/mac/current/#/dev154b28f09
[appstore]: {{site.apple-dev}}/app-store/submissions/
[appstoreconnect]: {{site.apple-dev}}/support/app-store-connect/
[appstoreconnect_api_key]: https://appstoreconnect.apple.com/access/api
[appstoreconnect_guide]: {{site.apple-dev}}/support/app-store-connect/
[appstoreconnect_guide_register]: https://help.apple.com/app-store-connect/#/dev2cd126805
[appstoreconnect_login]: https://appstoreconnect.apple.com/
[codemagic_cli_tools]: {{site.github}}/codemagic-ci-cd/cli-tools
[codesigning_guide]: {{site.apple-dev}}/library/content/documentation/Security/Conceptual/CodeSigningGuide/Introduction/Introduction.html
[Core Foundation Keys]: {{site.apple-dev}}/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html
[devportal_appids]: {{site.apple-dev}}/account/resources/identifiers/list
[devportal_certificates]: {{site.apple-dev}}/account/resources/certificates/list
[devprogram]: {{site.apple-dev}}/programs/
[devprogram_membership]: {{site.apple-dev}}/support/compare-memberships/
[distributionguide]: https://help.apple.com/xcode/mac/current/#/dev8b4250b57
[distributionguide_config]: https://help.apple.com/xcode/mac/current/#/dev91fe7130a
[distributionguide_macos]: https://help.apple.com/xcode/mac/current/#/dev295cc0fae
[distributionguide_submit]: https://help.apple.com/xcode/mac/current/#/dev067853c94
[distributionguide_upload]: https://help.apple.com/xcode/mac/current/#/dev442d7f2ca
[obfuscating your Dart code]: /deployment/obfuscate
[TestFlight]: {{site.apple-dev}}/testflight/
[macos_packaging_guide]: https://medium.com/@fluttergems/packaging-and-distributing-flutter-desktop-apps-the-missing-guide-part-1-macos-b36438269285
