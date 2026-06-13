---
title: 建置與發布 iOS 應用程式
description: 如何將 Flutter 應用程式發布到 App Store。
shortTitle: iOS
---

本指南將逐步說明如何將 Flutter 應用程式發布到 [App Store][appstore] 和 [TestFlight][]。

## 前置作業

建置與發布您的應用程式需要使用 Xcode。
您必須在執行 macOS 的裝置上操作，才能依照本指南進行。

在開始發布應用程式之前，請確保您的應用程式符合 Apple 的 [App Review Guidelines][appreview]（App 審查指引）。

若要將應用程式發布到 App Store，您必須先加入 [Apple Developer Program][devprogram]（Apple 開發者計畫）。
您可以在 Apple 的 [Choosing a Membership][devprogram_membership] 指南中，瞭解各種會員方案的詳細資訊。

## 影片總覽

如果您偏好觀看影片而非閱讀文字，下方影片涵蓋了與本指南相同的內容。

<YouTubeEmbed id="iE2bpP56QKc" title="Release an iOS app built with Flutter in 7 steps"></YouTubeEmbed>

## 在 App Store Connect 註冊您的應用程式

透過 [App Store Connect][appstoreconnect]（前身為 iTunes Connect）管理您的應用程式生命週期。
您可以在此定義應用程式名稱與描述、加入螢幕截圖、設定價格，並管理 App Store 與 TestFlight 的發布。

註冊應用程式包含兩個步驟：註冊唯一的 Bundle ID，以及在 App Store Connect 建立應用程式記錄。

如需 App Store Connect 的詳細介紹，請參閱 [App Store Connect][appstoreconnect_guide] 指南。

### 註冊 Bundle ID

每個 iOS 應用程式都會對應一個 Bundle ID，這是向 Apple 註冊的唯一識別碼。
要為您的應用程式註冊 Bundle ID，請依照下列步驟操作：

1. 開啟開發者帳戶的 [App IDs][devportal_appids] 頁面。
1. 點選 **+** 以建立新的 Bundle ID。
1. 輸入應用程式名稱，選擇 **Explicit App ID**，並輸入一個 ID。
1. 選擇您的應用程式所需的服務，然後點選 **Continue**。
1. 在下一頁確認細節後，點選 **Register** 完成 Bundle ID 註冊。

### 在 App Store Connect 建立應用程式記錄

在 App Store Connect 註冊您的應用程式：

1. 在瀏覽器中開啟 [App Store Connect][appstoreconnect_login]。
1. 於 App Store Connect 首頁點選 **Apps**。
1. 點選左上角的 **+**，然後選擇 **New App**。
1. 在出現的表單中填寫應用程式詳細資訊。在 Platforms 區段，請確保已勾選 iOS。
   由於 Flutter 目前尚未支援 tvOS，請勿勾選該選項。點選 **Create**。
1. 前往您的應用程式詳細頁，並從側邊欄選擇 **App Information**。
1. 在 General Information 區段，選擇您在前一步註冊的 Bundle ID。

如需詳細說明，請參閱 [Add an app to your account][appstoreconnect_guide_register]。

## 檢查 Xcode 專案設定

本步驟將帶您檢查 Xcode 工作區中最重要的設定。
如需詳細步驟與說明，請參閱 [Prepare for app distribution][distributionguide_config]。

在 Xcode 中前往目標設定：

1. 在您的 Flutter 專案目錄中，於終端機執行 `open ios/Runner.xcworkspace`，以開啟預設的 Xcode 工作區。
1. 在 Xcode 導覽器中，選擇 **Runner** 目標以檢視應用程式設定。

請檢查以下重要設定。

在 **General** 分頁的 **Identity** 區段：

`Display Name`
: 您的應用程式顯示名稱。

`Bundle Identifier`
: 您在 App Store Connect 註冊的 App ID。

在 **Signing & Capabilities** 分頁：

`Automatically manage signing`
: 是否讓 Xcode 自動管理應用程式簽署與配置描述檔。預設為 `true`，大多數應用程式使用此設定即可。如需更進階的情境，請參閱 [Code Signing Guide][codesigning_guide]。

`Team`
: 選擇與您註冊的 Apple Developer 帳號相關聯的團隊。如果需要，請選擇 **Add Account...**，然後更新此設定。

在 **Build Settings** 分頁的 **Deployment** 區段：

`iOS Deployment Target`
: 您的應用程式支援的最低 iOS 版本。Flutter 支援 iOS 13 及以上版本。如果您的應用程式或套件包含使用 iOS 13 之後 API 的 Objective-C 或 Swift 程式碼，請將此設定更新為所需的最高版本。

您的專案設定的 **General** 分頁應類似下圖：

![Xcode Project Settings](/assets/images/docs/releaseguide/xcode_settings.png){:width="100%"}

如需應用程式簽署的詳細說明，請參閱 [Create, export, and delete signing certificates][appsigning]。


## 新增應用程式圖示

當建立新的 Flutter 應用程式時，系統會產生一組預設的佔位圖示。此步驟將說明如何將這些佔位圖示替換為您自己的應用程式圖示：

1. 請參閱 [iOS App Icon][app-icon] 指南，特別是關於[建立淺色、深色與色彩變化][icon-modes]圖示的建議。
1. 在 Xcode 專案導覽器中，選擇 `Assets.xcassets`（位於 `Runner` 資料夾內）。將預設圖示替換為您自己的應用程式圖示。
1. 透過執行 `flutter run` 來驗證圖示已成功替換。

[app-icon]: {{site.apple-dev}}/design/human-interface-guidelines/app-icons/
[icon-modes]: {{site.apple-dev}}/design/human-interface-guidelines/app-icons#iOS-iPadOS

## 新增啟動畫面圖片

與應用程式圖示類似，您也可以替換預設的啟動畫面圖片：

1. 在 Xcode 專案導覽器中，選擇 `Assets.xcassets`（位於 `Runner` 資料夾內）。將預設啟動畫面圖片替換為您自己的圖片。
1. 透過熱重啟（hot restart）您的應用程式來驗證新的啟動畫面圖片。（請勿使用 `hot reload`。）

## 建立建置封存檔並上傳至 App Store Connect

在開發過程中，您一直使用 _debug_ 模式進行建置、除錯與測試。當您準備好將應用程式發布到 App Store 或 TestFlight 給使用者時，需準備 _release_ 模式的建置版本。

### 更新應用程式的建置號碼與版本號碼

應用程式的預設版本號為 `1.0.0`。
若要更新版本號，請前往 `pubspec.yaml` 檔案，並更新下列這一行：

```yaml
version: 1.0.0+1
```

版本號由三個以點分隔的數字組成，
例如上方範例中的 `1.0.0`，後面可選擇性加上一個
建置號（build number），如上方範例中的 `1`，兩者之間以 `+` 分隔。

你可以在 `flutter build ipa` 中分別透過指定 `--build-name` 和 `--build-number`
來覆寫版本號與建置號。

在 iOS 中，`build-name` 會使用 `CFBundleShortVersionString`，
而 `build-number` 則會使用 `CFBundleVersion`。
你可以在 Apple Developer 網站上的 [Core Foundation Keys][]
閱讀更多關於 iOS 版本管理的資訊。

你也可以在 Xcode 中覆寫 `pubspec.yaml` 的建置名稱與號碼：

1. 在你的應用程式 `ios` 資料夾中開啟 `Runner.xcworkspace`。
1. 在 Xcode 專案導覽區選取 **Runner**，然後在設定檢視側邊欄選擇
   **Runner** target。
1. 在 Identity 區段，將 **Version** 更新為你想要發布給使用者看到的
   版本號。
1. 在 Identity 區段，將 **Build** 識別碼更新為一個用於在 App Store Connect
   追蹤此建置的唯一建置號。
   每次上傳都需要一個唯一的建置號。

### 建立 app bundle

執行 `flutter build ipa`，即可在你的專案 `build/ios/archive/` 目錄中產生一個 Xcode 建置封存檔（`.xcarchive` 檔案），
並在 `build/ios/ipa` 產生一個 App Store app bundle（`.ipa` 檔案）。

你可以考慮加入 `--obfuscate` 與 `--split-debug-info` 旗標來
[混淆你的 Dart 程式碼][obfuscate your Dart code]，讓逆向工程變得更加困難。

如果你不是要發佈到 App Store，也可以選擇不同的 [export method][app_bundle_export_method]，
只需加上 `--export-method ad-hoc`、
`--export-method development` 或 `--export-method enterprise` 選項。

:::note
在 Flutter 某些版本中若 `flutter build ipa --export-method` 無法使用時，
請開啟 `build/ios/archive/MyApp.xcarchive`，並依照下方說明
從 Xcode 驗證並發佈應用程式。
:::

### 上傳 app bundle 至 App Store Connect

建立好 app bundle 後，可以透過以下方式
上傳至 [App Store Connect][appstoreconnect_login]：

<ol>
<li>

安裝並開啟 [Apple Transport macOS app][apple_transport_app]。
將 `build/ios/ipa/*.ipa` app bundle 拖曳到該應用程式中。

</li>

<li>

或是在命令列執行下列指令來上傳 app bundle：

```bash
xcrun altool --upload-app --type ios -f build/ios/ipa/*.ipa --apiKey your_api_key --apiIssuer your_issuer_id
```

執行 `man altool` 以取得如何使用 App Store Connect API 金鑰進行驗證的詳細說明。

</li>

<li>

或在 Xcode 中開啟 `build/ios/archive/MyApp.xcarchive`。

點擊 **Validate App** 按鈕。如果有任何問題被回報，請修正後重新產生一次 build。在你上傳封存檔（archive）之前，可以重複使用同一個 build ID。

當封存檔成功驗證後，請點擊 **Distribute App**。

:::note
當你在 **Distribute App** 最後匯出你的應用程式時，Xcode 會建立一個目錄，裡面包含你的應用程式 IPA 檔案以及一個 `ExportOptions.plist` 檔案。
你可以在不開啟 Xcode 的情況下，執行 `flutter build ipa --export-options-plist=path/to/ExportOptions.plist` 來用相同的選項建立新的 IPA。
關於這個 property list 中各個 key 的詳細說明，請參閱 `xcodebuild -h`。
:::

</li>
</ol>

你可以在 [App Store Connect][appstoreconnect_login] 上你的應用程式詳細頁面的 Activities 分頁中，追蹤 build 的狀態。
你應該會在 30 分鐘內收到一封電子郵件，通知你的 build 已通過驗證，並可在 TestFlight 上釋出給測試者。
此時，你可以選擇是否在 TestFlight 上釋出，或直接將你的應用程式發佈到 App Store。

欲了解更多詳情，請參閱 [Upload an app to App Store Connect][distributionguide_upload]。

## 使用 Codemagic CLI 工具建立 build 封存檔

本步驟說明如何使用 Flutter build 指令及 [Codemagic CLI Tools][codemagic_cli_tools]，在 Flutter 專案目錄的終端機中建立 build 封存檔並上傳到 App Store Connect。這讓你可以在與登入鑰匙圈（login keychain）隔離的暫存鑰匙圈中，完全掌控發佈憑證，建立 build 封存檔。

<ol>
<li>

安裝 Codemagic CLI 工具：

```bash
pip3 install codemagic-cli-tools
```

</li>
<li>

你需要產生一組具有 App Manager 存取權限的 [App Store Connect API Key][appstoreconnect_api_key]，以便自動化與 App Store Connect 的操作。為了讓後續的指令更為簡潔，請將新金鑰的 issuer id、key id 以及 API 金鑰檔案設為下列環境變數。

```bash
export APP_STORE_CONNECT_ISSUER_ID=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
export APP_STORE_CONNECT_KEY_IDENTIFIER=ABC1234567
export APP_STORE_CONNECT_PRIVATE_KEY=`cat /path/to/api/key/AuthKey_XXXYYYZZZ.p8`
```

</li>
<li>

你需要匯出或建立一個 iOS 發行（Distribution）憑證，才能進行程式簽署並封裝建置歸檔檔案。

如果你已有現有的[憑證][devportal_certificates]，可以針對每個憑證執行以下指令來匯出私密金鑰：

```bash
openssl pkcs12 -in <certificate_name>.p12 -nodes -nocerts | openssl rsa -out cert_key
```

或者，你也可以執行以下指令來建立新的私密金鑰：

```bash
ssh-keygen -t rsa -b 2048 -m PEM -f cert_key -q -N ""
```

之後，你可以讓命令列介面 (CLI) 工具根據私鑰自動建立新的 iOS 發佈憑證（iOS Distribution）。

</li>
<li>

設定一個新的暫時性鑰匙圈（keychain），用於程式碼簽署（code signing）：

```bash
keychain initialize
```

:::note 恢復 Login Keychain！
在執行 `keychain initialize` 之後，您**必須**執行下列指令：<br>

`keychain use-login`

這會將您的 login keychain 設為預設，以避免本機應用程式可能發生的驗證問題。
:::

</li>
<li>

從 App Store Connect 取得簽署檔案（code signing files）：

```bash
app-store-connect fetch-signing-files $(xcode-project detect-bundle-id) \
    --platform IOS \
    --type IOS_APP_STORE \
    --certificate-key=@file:/path/to/cert_key \
    --create
```

其中 `cert_key` 可以是你匯出的 iOS 發行（Distribution）憑證私鑰，或是一組新的私鑰（此時會自動產生新的憑證）。如果 App Store Connect 中尚未存在該憑證，系統會根據私鑰建立憑證。

</li>
<li>

現在，請將取得的憑證加入你的鑰匙圈（keychain）：

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

建置 Flutter 的 iOS 專案：

```bash
flutter build ipa --release \
    --export-options-plist=$HOME/export_options.plist
```

請注意，`export_options.plist` 是 `xcode-project use-profiles` 指令的輸出結果。

</li>
<li>

將應用程式發佈到 App Store Connect：

```bash
app-store-connect publish \
    --path $(find $(pwd) -name "*.ipa")
```

</li>
<li>

如前所述，請不要忘記將您的登入鑰匙圈（login keychain）設為預設，以避免您的機器上應用程式發生驗證問題：

```bash
keychain use-login
```

</li>
</ol>

你應該會在 30 分鐘內收到一封電子郵件，通知你建置已通過驗證，並可在 TestFlight 上釋出給測試者。此時，你可以選擇是否要在 TestFlight 上釋出，或是直接將你的應用程式發佈到 App Store。

## 在 TestFlight 上釋出你的應用程式

[TestFlight][] 讓開發者可以將應用程式推送給內部與外部測試者。這個選擇性步驟說明如何在 TestFlight 上釋出你的建置版本。

1. 前往 [App Store Connect][appstoreconnect_login] 中你應用程式的詳細資料頁面的 TestFlight 分頁。
1. 在側邊欄選擇 **Internal Testing**（內部測試）。
1. 選擇要釋出給測試者的建置版本，然後點擊 **Save**（儲存）。
1. 新增任何內部測試者的電子郵件地址。你可以在 App Store Connect 頁面頂部下拉選單中的 **Users and Roles**（使用者與角色）頁面新增更多內部使用者。

如需詳細資訊，請參閱 [Distribute an app using TestFlight][distributionguide_testflight]。

## 將你的應用程式發佈到 App Store

當你準備好將應用程式發佈給全球用戶時，請依照以下步驟提交應用程式審查並發佈到 App Store：

1. 在 [App Store Connect][appstoreconnect_login] 中你應用程式的詳細資料頁面側邊欄，選擇 **Pricing and Availability**（價格與可用性），並完成所需資訊。
1. 在側邊欄選擇狀態。如果這是此應用程式的首次發佈，其狀態會是 **1.0 Prepare for Submission**（1.0 準備提交）。請填寫所有必填欄位。
1. 點擊 **Submit for Review**（提交審查）。

Apple 會在應用程式審查流程完成時通知你。你的應用程式將依照你在 **Version Release**（版本釋出）區段中指定的指示進行發佈。

如需詳細資訊，請參閱 [Distribute an app through the App Store][distributionguide_submit]。

## 疑難排解

[Distribute your app][distributionguide] 指南提供了將應用程式發佈到 App Store 流程的詳細說明。

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
[devportal_appids]: {{site.apple-dev}}/account/ios/identifier/bundle
[devportal_certificates]: {{site.apple-dev}}/account/resources/certificates
[devprogram]: {{site.apple-dev}}/programs/
[devprogram_membership]: {{site.apple-dev}}/support/compare-memberships/
[distributionguide]: https://help.apple.com/xcode/mac/current/#/devac02c5ab8
[distributionguide_config]: https://help.apple.com/xcode/mac/current/#/dev91fe7130a
[distributionguide_submit]: https://help.apple.com/xcode/mac/current/#/dev067853c94
[distributionguide_testflight]: https://help.apple.com/xcode/mac/current/#/dev2539d985f
[distributionguide_upload]: https://help.apple.com/xcode/mac/current/#/dev442d7f2ca
[obfuscate your Dart code]: /deployment/obfuscate
[TestFlight]: {{site.apple-dev}}/testflight/
[app_bundle_export_method]: https://help.apple.com/xcode/mac/current/#/dev31de635e5
[apple_transport_app]: https://apps.apple.com/us/app/transporter/id1450874784
