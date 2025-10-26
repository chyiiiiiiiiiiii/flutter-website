---
title: 建置並發布 iOS 應用程式
description: 如何將 Flutter 應用程式發布到 App Store。
shortTitle: iOS
---

本指南將逐步說明如何將 Flutter 應用程式發布到 [App Store][appstore] 及 [TestFlight][TestFlight]。

## 前置作業

建置與發布應用程式需要使用 Xcode。
您必須在執行 macOS 的裝置上操作，才能依照本指南進行。

在開始發布應用程式之前，請確保您的應用程式符合 Apple 的 [App Review Guidelines][appreview]（應用程式審查指引）。

若要將應用程式發布到 App Store，您必須先加入 [Apple Developer Program][devprogram]。
您可以參考 Apple 的 [Choosing a Membership][devprogram_membership] 指南，了解各種會員方案。

## 影片總覽

如果您偏好觀看影片而非閱讀文字，下方影片涵蓋了本指南的所有內容。

{% ytEmbed 'iE2bpP56QKc', 'Release an iOS app built with Flutter in 7 steps' %}

## 在 App Store Connect 註冊您的應用程式

您可以在 [App Store Connect][appstoreconnect] (formerly iTunes Connect) 管理應用程式的生命週期。
您可以在此定義應用程式名稱與描述、加入螢幕截圖、設定價格，並管理 App Store 及 TestFlight 的發布。

註冊應用程式包含兩個步驟：註冊唯一的 Bundle ID，以及在 App Store Connect 建立應用程式紀錄。

如需 App Store Connect 的詳細說明，請參閱 [App Store Connect][appstoreconnect_guide] 指南。

### 註冊 Bundle ID

每個 iOS 應用程式都會與一個 Bundle ID（唯一識別碼）綁定，並向 Apple 註冊。
請依照下列步驟為您的應用程式註冊 Bundle ID：

1. 開啟開發者帳戶的 [App IDs][devportal_appids] 頁面。
1. 點擊 **+** 以建立新的 Bundle ID。
1. 輸入應用程式名稱，選擇 **Explicit App ID**，並輸入一個 ID。
1. 選擇您的應用程式所需的服務，然後點擊 **Continue**。
1. 在下一頁確認細節後，點擊 **Register** 完成註冊。

### 在 App Store Connect 建立應用程式紀錄

在 App Store Connect 註冊您的應用程式：

1. 在瀏覽器中開啟 [App Store Connect][appstoreconnect_login]。
1. 於 App Store Connect 首頁點擊 **Apps**。
1. 點擊左上角的 **+**，然後選擇 **New App**。
1. 在出現的表單中填寫應用程式詳細資訊。在 Platforms 區塊，請確保已勾選 iOS。
   由於 Flutter 目前尚未支援 tvOS，請勿勾選該選項。點擊 **Create**。
1. 前往您的應用程式詳細資料頁，並從側邊欄選擇 **App Information**。
1. 在 General Information 區塊，選擇您在前述步驟註冊的 Bundle ID。

如需詳細說明，請參閱 [Add an app to your account][appstoreconnect_guide_register]。

## 檢查 Xcode 專案設定

本步驟將說明如何檢查 Xcode 工作區中最重要的設定。
如需詳細步驟與說明，請參閱 [Prepare for app distribution][distributionguide_config]。

在 Xcode 中前往您的目標設定：

1. 在 Flutter 專案目錄的終端機視窗執行 `open ios/Runner.xcworkspace`，以開啟專案的預設 Xcode 工作區。
1. 在 Xcode 導覽器中選擇 **Runner** 目標，以檢視應用程式設定。

請確認以下重要設定。

在 **General** 分頁的 **Identity** 區塊：

`Display Name`
: 您的應用程式顯示名稱。

`Bundle Identifier`
: 您在 App Store Connect 註冊的 App ID。

在 **Signing & Capabilities** 分頁：

`Automatically manage signing`
: 是否讓 Xcode 自動管理應用程式的簽章與配置。預設為 `true`，對大多數應用程式而言已足夠。若有更複雜的需求，請參閱 [Code Signing Guide][codesigning_guide]。

`Team`
: 選擇與您 Apple Developer 帳戶綁定的團隊。如有需要，請選擇 **Add Account...** 並更新此設定。

在 **Build Settings** 分頁的 **Deployment** 區塊：

`iOS Deployment Target`
: 您的應用程式支援的最低 iOS 版本。Flutter 支援 iOS 13 及以上版本。如果您的應用程式或外掛包含使用 iOS 12 之後 API 的 Objective-C 或 Swift 程式碼，請將此設定更新為所需的最高版本。

您的專案設定中的 **General** 分頁應類似下圖：

![Xcode Project Settings](/assets/images/docs/releaseguide/xcode_settings.png){:width="100%"}

如需應用程式簽章的詳細說明，請參閱 [Create, export, and delete signing certificates][appsigning]。

## 更新應用程式的部署版本

如果您在 Xcode 專案中變更了 `Deployment Target`，請開啟 Flutter 應用程式中的 `ios/Flutter/AppframeworkInfo.plist`，並將 `MinimumOSVersion` 的值更新為相同。

## 新增應用程式圖示

當您建立新的 Flutter 應用程式時，會自動產生一組預設圖示。本步驟說明如何將這些預設圖示替換為您自己的應用程式圖示：

1. 參閱 [iOS App Icon][app-icon] 指南，特別是有關 [建立淺色、深色與色調][icon-modes] 圖示的建議。
1. 在 Xcode 專案導覽器中，選擇 `Assets.xcassets`（位於 `Runner` 資料夾內）。將預設圖示替換為您自己的應用程式圖示。
1. 執行 `flutter run` 以驗證圖示已被正確替換。

[app-icon]: {{site.apple-dev}}/design/human-interface-guidelines/app-icons/
[icon-modes]: {{site.apple-dev}}/design/human-interface-guidelines/app-icons#iOS-iPadOS

## 新增啟動畫面圖片

與應用程式圖示類似，您也可以替換預設的啟動畫面圖片：

1. 在 Xcode 專案導覽器中，選擇 `Assets.xcassets`（位於 `Runner` 資料夾內）。將預設啟動畫面圖片替換為您自己的圖片。
1. 重新啟動應用程式（hot restart）以驗證新的啟動畫面圖片。（請勿使用 `hot reload`。）

## 建立建置封存檔並上傳至 App Store Connect

在開發期間，您通常會使用 _debug_ 模式進行建置、除錯與測試。當您準備將應用程式發布到 App Store 或 TestFlight 給使用者時，必須準備 _release_ 模式的建置版本。

### 更新應用程式的建置號碼與版本號

應用程式的預設版本號為 `1.0.0`。
若要更新，請前往 `pubspec.yaml` 檔案，並修改下列這一行：

```yaml
version: 1.0.0+1
```

版本號由三個以點分隔的數字組成，
例如上方範例中的 `1.0.0`，後面可以選擇性地加上一個
建置號（build number），如上方範例中的 `1`，兩者之間以 `+` 分隔。

你可以在 `flutter build ipa` 中分別指定 `--build-name` 和 `--build-number`，
以覆寫版本號與建置號。

在 iOS 中，`build-name` 使用 `CFBundleShortVersionString`，
而 `build-number` 則使用 `CFBundleVersion`。
你可以在 Apple Developer 網站的 [Core Foundation Keys][Core Foundation Keys]
閱讀更多關於 iOS 版本管理的資訊。

你也可以在 Xcode 中覆寫 `pubspec.yaml` 的 build name 和 build number：

1. 在你的應用程式的 `ios` 資料夾中開啟 `Runner.xcworkspace`。
1. 在 Xcode 專案導覽器中選取 **Runner**，然後在設定檢視側邊欄中選取
   **Runner** target。
1. 在 Identity 區段中，將 **Version** 更新為你想要發佈給使用者的版本號。
1. 在 Identity 區段中，將 **Build** 識別碼更新為用於追蹤此版本於 App Store Connect 上的唯一建置號。
   每次上傳都需要一個唯一的建置號。

### 建立 app bundle

執行 `flutter build ipa`，會在你的專案 `build/ios/archive/` 目錄下產生一個 Xcode build archive（`.xcarchive` 檔案），
並在 `build/ios/ipa` 產生一個 App Store app bundle（`.ipa` 檔案）。

建議加入 `--obfuscate` 和 `--split-debug-info` 旗標來
[混淆你的 Dart 程式碼][obfuscate your Dart code]，以增加逆向工程的難度。

如果你不是要發佈到 App Store，也可以選擇不同的 [export method][app_bundle_export_method]，
只要加上 `--export-method ad-hoc`、
`--export-method development` 或 `--export-method enterprise` 選項即可。

:::note
在 Flutter 某些版本中若無法使用 `flutter build ipa --export-method`，
請開啟 `build/ios/archive/MyApp.xcarchive` 並依照下方說明，
從 Xcode 進行驗證與發佈。
:::

### 將 app bundle 上傳至 App Store Connect

建立好 app bundle 後，你可以透過下列方式
將其上傳至 [App Store Connect][appstoreconnect_login]：

<ol>
<li>

安裝並開啟 [Apple Transport macOS app][apple_transport_app]。
將 `build/ios/ipa/*.ipa` app bundle 拖曳到該應用程式中。

</li>

<li>

或者你也可以在命令列執行下列指令來上傳 app bundle：

```bash
xcrun altool --upload-app --type ios -f build/ios/ipa/*.ipa --apiKey your_api_key --apiIssuer your_issuer_id
```

執行 `man altool` 以取得如何使用 App Store Connect API 金鑰進行驗證的詳細說明。

</li>

<li>

或者在 Xcode 中開啟 `build/ios/archive/MyApp.xcarchive`。

點擊 **Validate App** 按鈕。如果有任何問題被回報，請修正後重新產生一次 build。在你上傳歸檔檔案（archive）之前，可以重複使用同一個 build ID。

當歸檔檔案成功驗證後，請點擊 **Distribute App**。

:::note
當你在 **Distribute App** 步驟結束時匯出你的 app，Xcode 會建立一個目錄，裡面包含你的 app 的 IPA 檔案和一個 `ExportOptions.plist` 檔案。
你可以透過執行 `flutter build ipa --export-options-plist=path/to/ExportOptions.plist`，不需啟動 Xcode，即可用相同選項建立新的 IPA 檔案。
有關此 property list 中金鑰的詳細說明，請參閱 `xcodebuild -h`。
:::

</li>
</ol>

你可以在 [App Store Connect][appstoreconnect_login] 上你的 app 詳細頁面的 Activities 分頁中，追蹤 build 的狀態。
你應該會在 30 分鐘內收到一封電子郵件，通知你的 build 已通過驗證，並可在 TestFlight 上提供給測試者。
此時你可以選擇是否要在 TestFlight 上釋出，或是直接將你的 app 發佈到 App Store。

如需更多細節，請參閱 [Upload an app to App Store Connect][distributionguide_upload]。

## 使用 Codemagic CLI 工具建立 build 歸檔檔案

本步驟說明如何使用 Flutter build 指令和在 Flutter 專案目錄終端機中執行的 [Codemagic CLI Tools][codemagic_cli_tools]，建立 build 歸檔檔案並上傳到 App Store Connect。這讓你可以在與登入金鑰圈（keychain）隔離的暫存金鑰圈中，完全掌控發佈憑證來建立 build 歸檔檔案。

<ol>
<li>

安裝 Codemagic CLI 工具：

```bash
pip3 install codemagic-cli-tools
```

</li>
<li>

你需要產生一組具有 App Manager 存取權限的 [App Store Connect API Key][appstoreconnect_api_key]，以便自動化操作 App Store Connect。為了讓後續指令更簡潔，請將新金鑰的 issuer id、key id 以及 API 金鑰檔案設定為以下環境變數。

```bash
export APP_STORE_CONNECT_ISSUER_ID=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
export APP_STORE_CONNECT_KEY_IDENTIFIER=ABC1234567
export APP_STORE_CONNECT_PRIVATE_KEY=`cat /path/to/api/key/AuthKey_XXXYYYZZZ.p8`
```

</li>
<li>

你需要匯出或建立一個 iOS 發佈（Distribution）憑證，以便進行程式碼簽署並封裝建置歸檔檔案（build archive）。

如果你已有現有的 [憑證][devportal_certificates]，可以針對每一個憑證執行以下指令來匯出私鑰：

```bash
openssl pkcs12 -in <certificate_name>.p12 -nodes -nocerts | openssl rsa -out cert_key
```

或者，你也可以執行以下指令來建立新的私密金鑰：

```bash
ssh-keygen -t rsa -b 2048 -m PEM -f cert_key -q -N ""
```

之後，你可以讓命令列介面 (Command Line Interface, CLI) 工具自動從私密金鑰建立新的 iOS 發行憑證（iOS Distribution）。

</li>
<li>

設定一個新的暫時性金鑰圈（keychain），以用於程式碼簽署（code signing）：

```bash
keychain initialize
```

:::note 恢復 Login Keychain！
在執行 `keychain initialize` 之後，您**必須**執行以下指令：<br>

`keychain use-login`

這會將您的 login keychain 設為預設，以避免本機應用程式可能出現的驗證問題。
:::

</li>
<li>

從 App Store Connect 下載簽署檔案（code signing files）：

```bash
app-store-connect fetch-signing-files $(xcode-project detect-bundle-id) \
    --platform IOS \
    --type IOS_APP_STORE \
    --certificate-key=@file:/path/to/cert_key \
    --create
```

其中 `cert_key` 可以是你匯出的 iOS 發佈（Distribution）憑證私鑰，或是一組新的私鑰（此時會自動產生新的憑證）。如果 App Store Connect 中尚未存在該憑證，則會根據私鑰建立新的憑證。

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

如前所述，請不要忘記將您的登入鑰匙圈（login keychain）設為預設值，以避免您的電腦上應用程式發生驗證問題：

```bash
keychain use-login
```

</li>
</ol>

你應該會在 30 分鐘內收到一封電子郵件，通知你你的建置已通過驗證，並可在 TestFlight 上釋出給測試者。此時，你可以選擇是否要在 TestFlight 上釋出，或是直接將你的應用程式發佈到 App Store。

## 在 TestFlight 上釋出你的應用程式

[TestFlight][TestFlight] 允許開發者將應用程式推送給內部與外部測試者。這個可選步驟說明如何在 TestFlight 上釋出你的建置。

1. 前往 [App Store Connect][appstoreconnect_login] 中你應用程式的詳細資料頁面的 TestFlight 分頁。
1. 在側邊欄選擇 **Internal Testing**（內部測試）。
1. 選擇要釋出給測試者的建置，然後點擊 **Save**（儲存）。
1. 新增任何內部測試者的電子郵件地址。你可以在 App Store Connect 頁面頂部下拉選單中的 **Users and Roles**（使用者與角色）頁面新增其他內部使用者。

如需更多細節，請參閱 [使用 TestFlight 發佈應用程式][distributionguide_testflight]。

## 將你的應用程式發佈到 App Store

當你準備好向全球用戶發佈你的應用程式時，請依照以下步驟提交你的應用程式以供審查並發佈到 App Store：

1. 在 [App Store Connect][appstoreconnect_login] 中你應用程式的詳細資料頁面側邊欄選擇 **Pricing and Availability**（價格與可用性），並填寫必要資訊。
1. 在側邊欄選擇狀態。如果這是此應用程式的首次發佈，其狀態為 **1.0 Prepare for Submission**（1.0 準備提交）。請完成所有必填欄位。
1. 點擊 **Submit for Review**（提交審查）。

Apple 會在應用程式審查流程完成後通知你。你的應用程式將依照你在 **Version Release**（版本釋出）區段中指定的指示進行發佈。

如需更多細節，請參閱 [透過 App Store 發佈應用程式][distributionguide_submit]。

## 疑難排解

[發佈你的應用程式][distributionguide] 指南提供了將應用程式發佈到 App Store 流程的詳細總覽。

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
