---
title: 使用 Flutter 進行持續交付
description: >
  如何自動化持續建置與發佈你的 Flutter 應用程式。
---

遵循 Flutter 的持續交付（Continuous Delivery, CD）最佳實踐，確保你的應用程式能夠頻繁地交付給測試人員並進行驗證，而無需依賴人工流程。

## CI/CD 選項

有許多持續整合（Continuous Integration, CI）與持續交付（Continuous Delivery, CD）選項可協助你自動化應用程式的交付流程。

### 內建 Flutter 功能的全方位平台

* [Codemagic][Codemagic]
* [Bitrise][Bitrise]
* [Appcircle][Appcircle]

### 將 fastlane 整合至現有工作流程

你可以將 fastlane 與下列工具搭配使用：

* [GitHub Actions][GitHub Actions]
  * 範例：[Github Action in Flutter Project][Github Action in Flutter Project]
* [Cirrus][Cirrus]
* [Travis][Travis]
* [GitLab][GitLab]
* [CircleCI][CircleCI]
   * [Building and deploying Flutter apps with Fastlane][Building and deploying Flutter apps with Fastlane]

本指南將說明如何設定 fastlane，並將其整合至你現有的測試與持續整合（CI）工作流程。更多資訊請參閱「Integrating fastlane with existing workflow」。

## fastlane

[fastlane][fastlane] 是一套開源工具組，用於自動化你的應用程式的發佈與部署流程。

### 本地端設定

建議你在遷移至雲端系統前，先在本地端測試建置與部署流程。你也可以選擇直接在本地機器上執行持續交付。

1. 安裝 fastlane `gem install fastlane` 或 `brew install fastlane`。
   詳細資訊請參閱 [fastlane docs][fastlane]。
1. 建立名為 `FLUTTER_ROOT` 的環境變數，
   並將其設定為你的 Flutter SDK 根目錄。
   （這對於 iOS 部署腳本是必要的。）
1. 建立你的 Flutter 專案，並在準備好時，確保專案可以透過以下方式建置：
    * ![Android](/assets/images/docs/cd/android.png) `flutter build appbundle`；以及
    * ![iOS](/assets/images/docs/cd/ios.png) `flutter build ipa`。
1. 為每個平台初始化 fastlane 專案。
    * ![Android](/assets/images/docs/cd/android.png) 在你的 `[project]/android`
      目錄中執行 `fastlane init`。
    * ![iOS](/assets/images/docs/cd/ios.png) 在你的 `[project]/ios` 目錄中，
      執行 `fastlane init`。
1. 編輯 `Appfile`，確保其中包含足夠的應用程式中繼資料。
    * ![Android](/assets/images/docs/cd/android.png) 檢查 `package_name` 在
      `[project]/android/fastlane/Appfile` 是否與 AndroidManifest.xml 中的套件名稱相符。
    * ![iOS](/assets/images/docs/cd/ios.png) 檢查 `app_identifier` 在
      `[project]/ios/fastlane/Appfile` 是否也與 Info.plist 的 bundle identifier 相符。請填入
      `apple_id`、`itc_team_id`、`team_id` 等你的帳號資訊。
1. 設定本地端商店登入憑證。
    * ![Android](/assets/images/docs/cd/android.png) 依照 [Supply setup steps][Supply setup steps]
      並確保 `fastlane supply init` 能成功從 Play Store 控制台同步資料。_請將 .json 檔案視為密碼，不要將其提交到任何公開原始碼版本庫。_
    * ![iOS](/assets/images/docs/cd/ios.png) 你的 iTunes Connect 使用者名稱已經
      在 `Appfile` 的 `apple_id` 欄位中。請以 shell 環境變數 `FASTLANE_PASSWORD` 設定你的 iTunes Connect 密碼。否則，當你上傳至 iTunes/TestFlight 時會被要求輸入密碼。
1. 設定程式碼簽署。
    * ![Android](/assets/images/docs/cd/android.png) 請依照 [Android app signing steps][Android app signing steps]。
    * ![iOS](/assets/images/docs/cd/ios.png) 在 iOS 上，當你準備好使用 TestFlight 或 App Store 進行測試與部署時，請建立並使用發佈憑證（distribution certificate），而非開發憑證（development certificate）。
        * 在你的 [Apple Developer Account console][Apple Developer Account console] 建立並下載發佈憑證。
        * `open [project]/ios/Runner.xcworkspace/` 並在目標設定頁面中選擇發佈憑證。
1. 為每個平台建立 `Fastfile` 腳本。
    * ![Android](/assets/images/docs/cd/android.png) 在 Android 上，請參考
      [fastlane Android beta deployment guide][fastlane Android beta deployment guide]。
      你的編輯可以簡單地新增一個 `lane`，呼叫
      `upload_to_play_store`。
      將 `aab` 參數設為 `../build/app/outputs/bundle/release/app-release.aab`，
      以使用已建置好的 app bundle `flutter build`。
    * ![iOS](/assets/images/docs/cd/ios.png) 在 iOS 上，請參考
      [fastlane iOS beta deployment guide][fastlane iOS beta deployment guide]。
      你可以指定 archive 路徑以避免重新建置專案。例如：
      
      ```ruby
      build_app(
        skip_build_archive: true,
        archive_path: "../build/ios/archive/Runner.xcarchive",
      )
      upload_to_testflight
      ```

你現在已經準備好在本地執行部署，或將部署流程遷移到持續整合（CI，Continuous Integration）系統。

### 在本地執行部署

1. 建置釋出模式（release mode）的應用程式。
    * ![Android](/assets/images/docs/cd/android.png) `flutter build appbundle`。
    * ![iOS](/assets/images/docs/cd/ios.png) `flutter build ipa`。
1. 在各平台執行 Fastfile 腳本。
    * ![Android](/assets/images/docs/cd/android.png) `cd android`，然後
    `fastlane [name of the lane you created]`。
    * ![iOS](/assets/images/docs/cd/ios.png) `cd ios`，然後
    `fastlane [name of the lane you created]`。

### 雲端建置與部署設定

首先，請依照「Local setup」章節說明完成本地端設定，確保流程運作正常，再遷移到像 Travis 這類雲端系統。

主要需要注意的是，雲端執行環境通常是短暫且不可信任的，因此你不應將 Play Store 服務帳戶 JSON 或 iTunes 發佈憑證等憑證留在伺服器上。

持續整合（CI）系統通常支援加密環境變數來儲存私密資料。你可以在建置應用程式時，透過 `--dart-define MY_VAR=MY_VALUE` 傳遞這些環境變數。

**請特別注意，不要在測試腳本中將這些變數的值回顯到主控台。** 這些變數在 pull request 尚未合併前也不會提供，以防止惡意人士建立會印出這些機密的 pull request。請謹慎處理你接受並合併的 pull request 與這些機密的互動。

1. 讓登入憑證具備短暫性（ephemeral）。
    * ![Android](/assets/images/docs/cd/android.png) 在 Android：
        * 從 `Appfile` 移除 `json_key_file` 欄位，並將 JSON 的字串內容儲存到 CI 系統的加密變數中。
          在你的 `Fastfile` 中直接讀取該環境變數。
          ```plaintext
          upload_to_play_store(
            ...
            json_key_data: ENV['<variable name>']
          )
          ```
        * 將你的上傳金鑰進行序列化（例如，使用 base64），並將其儲存為加密的環境變數。你可以在 CI 系統的安裝階段反序列化它，方法如下：
          ```bash
          echo "$PLAY_STORE_UPLOAD_KEY" | base64 --decode > [path to your upload keystore]
          ```
    * ![iOS](/assets/images/docs/cd/ios.png) 在 iOS 上：
        * 將本機環境變數 `FASTLANE_PASSWORD` 移至 CI 系統上使用加密環境變數。
        * CI 系統需要存取你的發佈憑證。建議使用 fastlane 的 [Match][Match] 系統來同步不同機器間的憑證。

2. 建議使用 Gemfile，而非每次在 CI 系統上執行不確定性的 `gem install fastlane`，以確保 fastlane 相關依賴在本地與雲端機器間能夠穩定且可重現。不過，這個步驟為選用。
    * 在你的 `[project]/android` 與 `[project]/ios` 資料夾中，建立一個包含以下內容的 `Gemfile`：
        ```plaintext
        source "https://rubygems.org"

        gem "fastlane"
        ```
    * 在兩個目錄中都執行 `bundle update`，並將 `Gemfile` 和 `Gemfile.lock` 一併提交到版本控制系統。
    * 本地執行時，請使用 `bundle exec fastlane` 取代 `fastlane`。

3. 在你的程式庫根目錄建立 CI 測試腳本，例如 `.travis.yml` 或 `.cirrus.yml`。
    * 請參閱 [fastlane CI 文件][fastlane CI documentation] 以了解 CI 的專屬設定方式。
    * 將你的腳本分片（shard），以便同時在 Linux 與 macOS 平台上執行。
    * 在 CI 任務的設定階段，請執行以下步驟：
         * 使用 `gem install bundler` 確認 Bundler 已可用。
         * 在 `[project]/android` 或 `[project]/ios` 中執行 `bundle install`。
         * 確保 Flutter SDK 已可用，並已設定於 `PATH`。
         * Android 部分，請確保 Android SDK 已可用，並設定 `ANDROID_SDK_ROOT` 路徑。
         * iOS 部分，你可能需要指定對 Xcode 的相依性（例如 `osx_image: xcode9.2`）。
    * 在 CI 任務的腳本階段：
         * 根據平台執行 `flutter build appbundle` 或 `flutter build ios --release --no-codesign --config-only`。
         * `cd android` 或 `cd ios`
         * `bundle exec fastlane [name of the lane]`

## Xcode Cloud

[Xcode Cloud][Xcode Cloud] 是一項持續整合與交付（CI/CD）服務，用於建置、測試與發佈 Apple 平台上的應用程式與框架。

### 系統需求

* Xcode 13.4.1 或更新版本。
* 必須加入 [Apple Developer Program][Apple Developer Program]。

### 自訂建置腳本

Xcode Cloud 可辨識[自訂建置腳本][custom build scripts]，可用於在指定時機執行額外任務。它同時提供一組[預設環境變數][predefined environment variables]，例如 `$CI_WORKSPACE`（即你的程式庫複製位置）。

:::note
Xcode Cloud 使用的暫存建置環境包含 macOS 與 Xcode 的內建工具（例如 Python），並額外內建 Homebrew，以支援安裝第三方相依套件與工具。
:::

#### Post-clone 腳本

利用 post-clone 自訂建置腳本，在 Xcode Cloud 複製你的 Git 程式庫後執行，請依下列指示操作：

在 `ios/ci_scripts/ci_post_clone.sh` 建立一個檔案，並加入以下內容。

<?code-excerpt "deployment/xcode_cloud/ci_post_clone.sh"?>
```sh
#!/bin/sh

# Fail this script if any subcommand fails.
set -e

# The default execution directory of this script is the ci_scripts directory.
cd $CI_PRIMARY_REPOSITORY_PATH # change working directory to the root of your cloned repo.

# Install Flutter using git.
git clone https://github.com/flutter/flutter.git --depth 1 -b stable $HOME/flutter
export PATH="$PATH:$HOME/flutter/bin"

# Install Flutter artifacts for iOS (--ios), or macOS (--macos) platforms.
flutter precache --ios

# Install Flutter dependencies.
flutter pub get

# Install CocoaPods using Homebrew.
HOMEBREW_NO_AUTO_UPDATE=1 # disable homebrew's automatic updates.
brew install cocoapods

# Install CocoaPods dependencies.
cd ios && pod install # run `pod install` in the `ios` directory.

exit 0
```

此檔案應新增至你的 git 儲存庫並設為可執行檔。

```console
$ git add --chmod=+x ios/ci_scripts/ci_post_clone.sh
```

### 工作流程設定

一個 [Xcode Cloud 工作流程][Xcode Cloud workflow] 定義了當你的工作流程被觸發時，在 CI/CD 流程中所執行的步驟。

:::note
這需要你的專案已經初始化為 Git，並且連結到遠端儲存庫。
:::

要在 Xcode 中建立新的工作流程，請依照下列指示操作：

1. 選擇 **Product > Xcode Cloud > Create Workflow**，以開啟
   **Create Workflow** 視窗。

2. 選擇此工作流程要附加的產品（App），然後點擊
   **Next** 按鈕。

3. 下一個視窗會顯示 Xcode 提供的預設工作流程概覽，
    你可以點擊 **Edit Workflow** 按鈕進行自訂。

#### 分支變更

Xcode 預設建議使用「分支變更（Branch Changes）」條件，這會在你的 Git 儲存庫預設分支有任何變更時啟動新的建置。

對於你的 App 的 iOS 版本，你很可能希望在變更 Flutter 套件，或是在 `lib\` 和 `ios\` 目錄下修改 Dart 或 iOS 原始碼檔案後，讓 Xcode Cloud 觸發你的工作流程。

你可以透過以下「檔案與資料夾（Files and Folders）」條件來達成：

![Xcode Workflow Branch Changes](/assets/images/docs/releaseguide/xcode_workflow_branch_changes.png){:width="100%"}

### 下一個建置號碼

Xcode Cloud 會將新工作流程的建置號碼預設為 `1`，並在每次建置成功後自動遞增。如果你使用的是已存在且建置號碼較高的 App，則需要在你的流程中指定 `Next Build Number`，讓 Xcode Cloud 使用正確的建置號碼。

請參閱 [設定 Xcode Cloud 建置的下一個建置號碼][Setting the next build number for Xcode Cloud builds] 以取得更多資訊。

[Android app signing steps]: /deployment/android#signing-the-app
[Appcircle]: https://appcircle.io/blog/guide-to-automated-mobile-ci-cd-for-flutter-projects-with-appcircle/
[Apple Developer Account console]: {{site.apple-dev}}/account/ios/certificate/
[Bitrise]: https://devcenter.bitrise.io/en/getting-started/quick-start-guides/getting-started-with-flutter-apps
[CI Options and Examples]: #reference-and-examples
[Cirrus]: https://cirrus-ci.org
[Codemagic]: https://blog.codemagic.io/getting-started-with-codemagic/
[fastlane]: https://docs.fastlane.tools
[fastlane Android beta deployment guide]: https://docs.fastlane.tools/getting-started/android/beta-deployment/
[fastlane CI documentation]: https://docs.fastlane.tools/best-practices/continuous-integration
[fastlane iOS beta deployment guide]: https://docs.fastlane.tools/getting-started/ios/beta-deployment/
[Github Action in Flutter Project]: {{site.github}}/nabilnalakath/flutter-githubaction
[GitHub Actions]: {{site.github}}/features/actions
[GitLab]: https://docs.gitlab.com/ee/ci/
[CircleCI]: https://circleci.com
[Building and deploying Flutter apps with Fastlane]: https://circleci.com/blog/deploy-flutter-android
[Match]: https://docs.fastlane.tools/actions/match/
[Supply setup steps]: https://docs.fastlane.tools/getting-started/android/setup/#setting-up-supply
[Travis]: https://travis-ci.org/
[Apple Developer Program]: {{site.apple-dev}}/programs
[Xcode Cloud]: {{site.apple-dev}}/xcode-cloud
[Xcode Cloud workflow]: {{site.apple-dev}}/documentation/xcode/xcode-cloud-workflow-reference
[custom build scripts]: {{site.apple-dev}}/documentation/xcode/writing-custom-build-scripts
[predefined environment variables]: {{site.apple-dev}}/documentation/xcode/environment-variable-reference
[Setting the next build number for Xcode Cloud builds]: {{site.apple-dev}}/documentation/xcode/setting-the-next-build-number-for-xcode-cloud-builds#Set-the-next-build-number-to-a-custom-value
