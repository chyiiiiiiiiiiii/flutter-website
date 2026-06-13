---
title: 建置與發佈 Android 應用程式
description: 如何準備並將 Android 應用程式發佈到 Play 商店。
shortTitle: Android
---

要測試應用程式，你可以在命令列使用 `flutter run`，
或在你的 IDE 中使用 **Run** 和 **Debug** 選項。

當你準備好要建立應用程式的 _發佈_ 版本時，
例如要[發佈到 Google Play 商店][play]，
本頁將提供協助。在發佈之前，
你可能會想為應用程式做一些最後的修飾。
本指南將說明如何執行以下任務：

* [新增啟動器圖示](#add-a-launcher-icon)
* [啟用 Material 元件](#enable-material-components)
* [簽署應用程式](#sign-the-app)
* [使用 R8 縮減程式碼](#shrink-your-code-with-r8)
* [啟用 multidex 支援](#enable-multidex-support)
* [檢查應用程式 manifest](#review-the-app-manifest)
* [檢查建置組態](#review-the-gradle-build-configuration)
* [建置發佈版應用程式](#build-the-app-for-release)
* [發佈到 Google Play 商店](#publish-to-the-google-play-store)
* [更新應用程式版本號](#update-the-apps-version-number)
* [Android 發佈常見問答](#android-release-faq)

:::note
本頁中，`[project]` 指的是
你的應用程式所在的目錄。在依照這些指示操作時，請將
`[project]` 替換為你的應用程式目錄。
:::

[play]: {{site.android-dev}}/distribute

## 新增啟動器圖示

當你建立新的 Flutter 應用程式時，會有一個預設的啟動器圖示。
若要自訂這個圖示，你可以參考
[flutter_launcher_icons][] 套件。

另外，你也可以依照以下步驟手動設定：

1. 參閱
   [Material Design 產品圖示][launchericons]設計指引，了解圖示設計原則。

1. 在 `[project]/android/app/src/main/res/` 目錄下，
   將你的圖示檔案放在以
   [設定限定詞][config-qual]命名的資料夾中。
   預設的 `mipmap-` 資料夾展示了正確的
   命名規則。

1. 在 `AndroidManifest.xml` 中，更新
   [`application`][applicationtag] 標籤的 `android:icon`
   屬性，讓它參考前一步驟中的圖示（例如，
   `<application android:icon="@mipmap/ic_launcher" ...`）。

1. 為確認圖示已被替換，
   請執行你的應用程式並檢查 Launcher 中的應用程式圖示。

[flutter_launcher_icons]: {{site.pub}}/packages/flutter_launcher_icons
[launchericons]: {{site.material}}/styles/icons
[config-qual]: {{site.android-dev}}/guide/topics/resources/providing-resources#AlternativeResources
[applicationtag]: {{site.android-dev}}/guide/topics/manifest/application-element

## 啟用 Material 元件

如果你的應用程式使用了[平台視圖 (platform views)][platform views]，你可能會想要依照
[Android 入門指南][Getting Started guide for Android]中的步驟啟用 Material 元件 (Material Components)。

例如：

1. 在 `<my-app>/android/app/build.gradle.kts` 中新增 Android Material 的相依套件：

<Tabs key="android-material-dependency">
<Tab name="Kotlin">

```kotlin
dependencies {
    // ...
    implementation("com.google.android.material:material:<version>")
    // ...
}
```

</Tab>
<Tab name="Groovy">

```groovy
dependencies {
    // ...
    implementation 'com.google.android.material:material:<version>'
    // ...
}
```

</Tab>
</Tabs>

   若要查詢最新版本，請造訪 [Google Maven][maven-material]。

1. 在 `<my-app>/android/app/src/main/res/values/styles.xml` 中設定亮色主題：

   ```xml diff
   - <style name="NormalTheme" parent="@android:style/Theme.Light.NoTitleBar">
   + <style name="NormalTheme" parent="Theme.MaterialComponents.Light.NoActionBar">
   ```

1. 在 `<my-app>/android/app/src/main/res/values-night/styles.xml` 中設定深色主題：

   ```xml diff
   - <style name="NormalTheme" parent="@android:style/Theme.Black.NoTitleBar">
   + <style name="NormalTheme" parent="Theme.MaterialComponents.DayNight.NoActionBar">
   ```

[platform views]: /platform-integration/android/platform-views
[Getting Started guide for Android]: {{site.material}}/develop/android/mdc-android
[maven-material]: https://maven.google.com/web/index.html#com.google.android.material:material

<a id="signing-the-app"></a>
## 簽署應用程式

若要在 Play 商店發佈，你需要使用數位憑證簽署應用程式。

Android 會使用兩種簽署金鑰：_上傳金鑰_（upload key）與 _應用程式簽署金鑰_（app signing key）。

* 開發者需將以 _上傳金鑰_ 簽署的 `.aab` 或 `.apk` 檔案上傳至 Play 商店。
* 最終用戶會下載以 _應用程式簽署金鑰_ 簽署的 `.apk` 檔案。

如需建立應用程式簽署金鑰，請依照[官方 Play 商店文件][official Play Store documentation]中所述，使用 Play App Signing。

如需簽署應用程式，請依照以下說明操作。

[official Play Store documentation]: https://support.google.com/googleplay/android-developer/answer/7384423?hl=en

### 建立上傳 keystore

如果你已有現有的 keystore，請跳至下一步。
若沒有，請使用下列其中一種方式建立：

1. 依照 [Android Studio 金鑰產生步驟][as-key-steps]操作。
1. 在命令列執行下列指令：

   在 macOS 或 Linux 上，請使用以下指令：

   ```console
   keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA \
           -storetype JKS -keysize 2048 -validity 10000 -alias upload
   ```

   在 Windows 上，請在 PowerShell 中使用以下指令：

   ```ps
   keytool -genkey -v -keystore $env:USERPROFILE\upload-keystore.jks `
           -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 `
           -alias upload
   ```

   此指令會將 `upload-keystore.jks` 檔案儲存在你的家目錄。如果你想將其儲存在其他位置，請更改傳遞給 `-keystore` 參數的引數。
   **不過，請務必將 `keystore` 檔案保密；不要將它提交到公開的原始碼控管系統！**

   :::note
   * `keytool` 指令可能不在你的路徑中&mdash;它是 Java 的一部分，會隨著 Android Studio 一起安裝。
     若要取得實際路徑，請執行 `flutter doctor -v`，然後找到「Java binary at:」後面顯示的路徑。
     接著使用該完整路徑，並將最後的 `java` 替換為 `keytool`。
     如果你的路徑中包含空格分隔的名稱，例如 `Program Files`，請依照平台使用適當的表示方式。
     例如，在 macOS 和 Linux 上請使用 `Program\ Files`，在 Windows 上則使用 `"Program Files"`。

   * `-storetype JKS` 標籤僅在 Java 9 或更新版本時才需要。自 Java 9 發布起，keystore 類型預設為 PKS12。
   :::

[as-key-steps]: {{site.android-dev}}/studio/publish/app-signing#generate-key

### 從應用程式參考 keystore

建立一個名為 `[project]/android/key.properties` 的檔案，
內容包含對你的 keystore 的參考。
不要包含尖括號（`< >`）。
這些尖括號表示該文字僅為你的值的佔位符。

```properties
storePassword=<password-from-previous-step>
keyPassword=<password-from-previous-step>
keyAlias=upload
storeFile=<keystore-file-location>
```

`storeFile` 可能位於
macOS 的 `/Users/<user name>/upload-keystore.jks`
或 Windows 的 `C:\\Users\\<user name>\\upload-keystore.jks`。

:::note
Windows 上 `keystore.jks` 的路徑必須以雙反斜線指定：`\\`。
:::

:::warning
請將 `key.properties` 檔案保持私密；
不要將其提交到公開的原始碼管理系統。
:::

### 在 Gradle 中設定簽章

當你以 release 模式建置應用程式時，需要設定 Gradle 使用你的上傳金鑰（upload key）。
要設定 Gradle，請編輯 `<project>/android/app/build.gradle.kts` 檔案。

1. 在 `android` 屬性區塊之前，定義並載入 keystore 屬性檔案。

1. 設定 `keystoreProperties` 物件以載入 `key.properties` 檔案。

<Tabs key="android-keystore-properties">
<Tab name="Kotlin">

```kotlin diff title="[project]/android/app/build.gradle.kts"
+ import java.util.Properties
+ import java.io.FileInputStream
+
  plugins {
     ...
  }
+
+ val keystoreProperties = Properties()
+ val keystorePropertiesFile = rootProject.file("key.properties")
+ if (keystorePropertiesFile.exists()) {
+     keystoreProperties.load(FileInputStream(keystorePropertiesFile))
+ }
+
  android {
     ...
  }
```

</Tab>
<Tab name="Groovy">

```groovy diff title="[project]/android/app/build.gradle"
+ import java.util.Properties
+ import java.io.FileInputStream
+
  plugins {
     ...
  }
+
+ def keystoreProperties = new Properties()
+ def keystorePropertiesFile = rootProject.file('key.properties')
+ if (keystorePropertiesFile.exists()) {
+     keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
+ }
+
  android {
     ...
  }
```

</Tab>
</Tabs>

1. 在 `android` 屬性區塊內，於 `buildTypes` 屬性區塊之前新增簽章（signing）設定。

<Tabs key="android-signing-config">
<Tab name="Kotlin">

```kotlin diff title="[project]/android/app/build.gradle.kts"
  android {
      // ...

+     signingConfigs {
+         create("release") {
+             keyAlias = keystoreProperties["keyAlias"] as String
+             keyPassword = keystoreProperties["keyPassword"] as String
+             storeFile = keystoreProperties["storeFile"]?.let { file(it) }
+             storePassword = keystoreProperties["storePassword"] as String
+         }
+     }
      buildTypes {
          release {
              // TODO: Add your own signing config for the release build.
              // Signing with the debug keys for now,
              // so `flutter run --release` works.
-             signingConfig = signingConfigs.getByName("debug")
+             signingConfig = signingConfigs.getByName("release")
          }
      }
  ...
  }
```

</Tab>
<Tab name="Groovy">

```groovy diff title="[project]/android/app/build.gradle"
  android {
      // ...

+     signingConfigs {
+         release {
+             keyAlias = keystoreProperties['keyAlias']
+             keyPassword = keystoreProperties['keyPassword']
+             storeFile = keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
+             storePassword = keystoreProperties['storePassword']
+         }
+     }
      buildTypes {
          release {
              // TODO: Add your own signing config for the release build.
              // Signing with the debug keys for now,
              // so `flutter run --release` works.
-             signingConfig = signingConfigs.debug
+             signingConfig = signingConfigs.release
          }
      }
  ...
  }
```

</Tab>
</Tabs>

Flutter 現在會為所有 release 版本進行簽章。

:::note
在修改 Gradle 檔案後，你可能需要執行 `flutter clean`。
這可以避免快取的建置結果影響簽章流程。
:::

想進一步了解如何為你的應用程式簽章，請參考 Android 開發者文件中的
[Sign your app][]。

[Sign your app]: {{site.android-dev}}/studio/publish/app-signing.html#generate-key

### 後量子密碼學 (PQC) 混合簽章（Android 17+）

Android 17 引入了 v3.2 APK 簽章方案（APK Signature Scheme）。
此方案將傳統簽章（例如 RSA 或 EC）與 ML-DSA 簽章結合，
以實現後量子密碼學 (PQC) 混合簽章。
這讓你的應用程式簽章身分能夠抵禦未來量子運算所帶來的潛在攻擊威脅。

* **使用 Play App Signing 的應用程式**：
  如果你使用 Play App Signing，
  可以等待 Google Play 提供選項，讓你升級為使用 Google Play 生成的 PQC 金鑰進行混合簽章。
* **使用自管金鑰的應用程式**：
  如果你自行管理簽章金鑰，
  可以使用更新版的 Android 建置工具（例如 `apksigner`）
  輪換為混合身分，將 PQC 金鑰與新的傳統金鑰結合。
  請注意，你必須建立新的傳統金鑰；
  無法重複使用舊有的金鑰。

如需更多資訊，請參考
[Android 關於 PQC APK 簽章的文件][android-doc]。

[android-doc]: {{site.android-dev}}/about/versions/17/features#pqc-apk-signing

## 使用 R8 縮減程式碼

[R8][] 是 Google 推出的新一代程式碼壓縮工具。
當你建置 release APK 或 AAB 時，R8 會預設啟用。
若要停用 R8，請在執行 `flutter build apk` 或 `flutter build appbundle` 時加入 `--no-shrink` 旗標。

:::note
混淆與壓縮會顯著增加 Android 應用程式的編譯時間。

`--[no-]shrink` 旗標不會產生任何效果。
在 release 版本建置時，程式碼壓縮始終會啟用。
想了解更多，請參考 [Shrink, obfuscate, and optimize your app][]。
:::

[R8]: {{site.android-dev}}/studio/build/shrink-code
[Shrink, obfuscate, and optimize your app]: {{site.android-dev}}/studio/build/shrink-code

## 啟用 multidex 支援

當你開發大型應用程式或使用大型插件時，
如果目標最低 API 為 20 或以下，可能會遇到 Android 的 64k 方法數限制。
在使用未啟用壓縮的 `flutter run` 執行應用程式的 debug 版本時，也可能遇到此限制。

Flutter 工具支援輕鬆啟用 multidex。
最簡單的方式是依照提示選擇啟用 multidex 支援。
工具會偵測到 multidex 建置錯誤，並在修改你的 Android 專案前詢問你。
選擇啟用後，Flutter 會自動相依於 `androidx.multidex:multidex`，並使用產生的
`FlutterMultiDexApplication` 作為專案的 application。

當你在 IDE 中使用 **Run** 和 **Debug** 選項嘗試建置並執行應用程式時，建置可能會失敗，並出現以下訊息：

<img src='/assets/images/docs/deployment/android/ide-build-failure-multidex.png'
  width="100%" alt='Build failure because Multidex support is required'>

若要從命令列啟用 multidex，請執行 `flutter run --debug` 並選擇一台 Android 裝置：

<img src='/assets/images/docs/deployment/android/cli-select-device.png'
  width="100%" alt='Selecting an Android device with the flutter CLI.'>

當系統提示時，請輸入 `y`。
Flutter 工具會啟用 multidex 支援並重新嘗試建置：

<img src='/assets/images/docs/deployment/android/cli-multidex-added-build.png'
  width="100%" alt='The output of a successful build after adding multidex.'>

:::note
當目標為 Android SDK 21 或更高版本時，multidex 支援已原生內建。
:::

你也可以選擇依照 Android 官方指南手動支援 multidex，
並修改專案的 Android 目錄設定。
必須指定一個 [multidex keep file][multidex-keep]，內容需包含：

```plaintext
io/flutter/embedding/engine/loader/FlutterLoader.class
io/flutter/util/PathUtils.class
```

同時，也請包含應用程式啟動時所使用的其他類別。
如需手動新增 multidex 支援的詳細指引，請參考官方 [Android 文件][multidex-docs]。

[multidex-keep]: {{site.android-dev}}/studio/build/multidex#keep
[multidex-docs]: {{site.android-dev}}/studio/build/multidex

## 檢查應用程式 manifest

請檢查預設的 [App Manifest][manifest] 檔案。

```xml title="[project]/android/app/src/main/AndroidManifest.xml"
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        [!android:label="[project]"!]
        ...
    </application>
    ...
    [!<uses-permission android:name="android.permission.INTERNET"/>!]
</manifest>
```

請確認下列數值：

| 標籤                                | 屬性 | 值                                                                                                   |
|------------------------------------|-----------|-----------------------------------------------------------------------------------------------------------|
| [`application`][applicationtag]    | 編輯 [`application`][applicationtag] 標籤中的 `android:label`，以反映應用程式的最終名稱。 |
| [`uses-permission`][permissiontag] | 如果你的應用程式需要存取網際網路，請在 `android:name` 屬性中新增 `android.permission.INTERNET` [permission][permissiontag] 值。標準範本並未包含此標籤，但在開發期間允許網際網路存取，以便 Flutter 工具與執行中的應用程式進行通訊。 |

{:.table .table-striped}

[manifest]: {{site.android-dev}}/guide/topics/manifest/manifest-intro
[applicationtag]: {{site.android-dev}}/guide/topics/manifest/application-element
[permissiontag]: {{site.android-dev}}/guide/topics/manifest/uses-permission-element

## 檢查 Gradle 建置組態 {:#review-the-gradle-build-configuration}

若要確認 Android 建置組態，請檢查預設
[Gradle 建置腳本][gradlebuild]中的 `android` 區塊。
預設的 Gradle 建置腳本位於 `[project]/android/app/build.gradle.kts`。

```kotlin title="[project]/android/app/build.gradle.kts"
android {
    namespace = "com.example.[project]"
    // Any value starting with "flutter." gets its value from
    // the Flutter Gradle plugin.
    // To change from these defaults, make your changes in this file.
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    ...

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "com.example.[project]"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    buildTypes {
        ...
    }
}
```

[gradlebuild]: {{site.android-dev}}/studio/build/#module-level

### Application ID

`applicationId` 是你的應用程式在 Google Play 商店與開發者裝置上的唯一識別符。

:::important
請確認 `defaultConfig` 中的 `applicationId` 是唯一的。
通常這是一個反向域名，例如 `com.example.myapp`。
一旦你將應用程式上傳至 Play 商店後，就無法再更改 Application ID。
:::

如果你更新了 `applicationId` 和 `namespace` 屬性，
還必須同步更新 `MainActivity.kt`
或 `MainActivity.java` 檔案中的 `package` 宣告，並將檔案
移至對應的目錄結構。

例如：

- 在 Kotlin 中，如果你的新 ID 為 `com.example.myapp`，
  請將 `MainActivity` 檔案移至
  `android/app/src/main/kotlin/com/example/myapp/MainActivity.kt`，
  並確保第一行為 `package com.example.myapp`。
- 在 Java 中，請將 `MainActivity` 檔案移至
  `android/app/src/main/java/com/example/myapp/MainActivity.java`，
  並確保第一行為 `package com.example.myapp`。

[application-id]: {{site.android-dev}}/studio/build/application-id

### Android SDK 版本

Flutter 工具會為 Android SDK 版本設定預設值：

* **`compileSdk`**：用於編譯應用程式的 Android SDK 版本。
* **`minSdk`**：應用程式支援的最低 Android 版本。
* **`targetSdk`**：應用程式設計並測試運行的 Android 版本。

這些預設值（`flutter.compileSdkVersion` 等）由 Flutter 管理，
以確保與框架和插件的相容性。
通常你**不需要**更改這些值，除非：

1. **需要更新的 API**：如果你使用的插件或功能需要比 Flutter 預設值更高的
   `minSdk`，可以手動將其設為更高的版本號
   （例如，`minSdk = 24`）。
2. **需要鎖定版本**：如果你想在升級 Flutter 時避免這些版本自動更新，
   可以將預設變數替換為特定的整數值。

### 版本代碼與版本名稱

`versionCode` 和 `versionName` 會自動從 `pubspec.yaml` 檔案
（使用 `version: 1.0.0+1` 欄位）取得。通常你不需要在 Gradle 檔案中修改這些值。

[Version your app]: {{site.android-dev}}/studio/publish/versioning

## 建置發佈版應用程式

當你要發佈至 Play 商店時，有兩種發行格式可選：

* App bundle（建議使用）
* APK

:::note
Google Play 商店偏好使用 app bundle 格式。
如需詳細資訊，請參閱 [About Android App Bundles][bundle]。
:::

[bundle]: {{site.android-dev}}/guide/app-bundle

### 建立 app bundle

本節說明如何建立發行版 app bundle。
如果你已完成簽署步驟，
則 app bundle 會被簽署。
此時，你可以考慮[混淆你的 Dart 程式碼][obfuscating your Dart code]，
以增加逆向工程的難度。
混淆程式碼需在建置指令中加入額外旗標，
並維護額外檔案以還原堆疊追蹤。

在命令列執行：

1. 輸入 `cd [project]`<br>
1. 執行 `flutter build appbundle`<br>
   （執行 `flutter build` 預設為發行版建置。）

你的應用程式發行 bundle 會建立於
`[project]/build/app/outputs/bundle/release/app.aab`。

預設情況下，app bundle 內含你的 Dart 程式碼與 Flutter
執行時期，並針對 [armeabi-v7a][] (ARM 32-bit)、[arm64-v8a][]
(ARM 64-bit) 和 [x86-64][] (x86 64-bit) 進行編譯。

[obfuscating your Dart code]: /deployment/obfuscate
[arm64-v8a]: {{site.android-dev}}/ndk/guides/abis#arm64-v8a
[armeabi-v7a]: {{site.android-dev}}/ndk/guides/abis#v7a
[x86-64]: {{site.android-dev}}/ndk/guides/abis#86-64

### 測試 app bundle

app bundle 可透過多種方式測試。
本節介紹其中兩種。

#### 使用 bundle tool 離線測試

1. 若尚未下載，請從其 [GitHub repository][bundletool-github]
   下載 `bundletool`。
1. [從 app bundle 產生 APK 集合][apk-set]。
1. [將 APK 部署][apk-deploy]至連接的裝置。

[bundletool-github]: {{site.github}}/google/bundletool/releases/latest
[apk-set]: {{site.android-dev}}/studio/command-line/bundletool#generate_apks
[apk-deploy]: {{site.android-dev}}/studio/command-line/bundletool#deploy_with_bundletool

#### 使用 Google Play 線上測試

1. 將你的 bundle 上傳至 Google Play 進行測試。
   你可以使用內部測試軌道，
   或 alpha、beta 頻道先行測試 bundle，
   再正式發佈至生產環境。
2. 依照步驟[上傳你的 bundle][upload-bundle]
   至 Play 商店。

[upload-bundle]: {{site.android-dev}}/studio/publish/upload-bundle

### 建立 APK

雖然 app bundle 為建議格式，
但仍有部分商店尚未支援 app bundle。
此時，請為每個目標 ABI（Application Binary Interface）建立發行版 APK。

如果你已完成簽署步驟，APK 會被簽署。
此時，你可以考慮[混淆你的 Dart 程式碼][obfuscating your Dart code]，
以增加逆向工程的難度。
混淆程式碼需在建置指令中加入額外旗標。

在命令列執行：

1. 輸入 `cd [project]`。

1. 執行 `flutter build apk --split-per-abi`。
   （`flutter build` 指令預設為 `--release`。）

此指令會產生三個 APK 檔案：

* `[project]/build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk`
* `[project]/build/app/outputs/flutter-apk/app-arm64-v8a-release.apk`
* `[project]/build/app/outputs/flutter-apk/app-x86_64-release.apk`

移除 `--split-per-abi` 旗標會產生 fat APK，該檔案包含
針對 _所有_ 目標 ABI 編譯的程式碼。
這類 APK 檔案體積較分割版本更大，
使用者需下載與其裝置架構不相容的原生二進位檔。

[obfuscating your Dart code]: /deployment/obfuscate

### 在裝置上安裝 APK

請依下列步驟將 APK 安裝至已連接的 Android 裝置。

在命令列執行：

1. 使用 USB 線將 Android 裝置連接至電腦。
1. 輸入 `cd [project]`。
1. 執行 `flutter install`。

## 發佈至 Google Play 商店

如需將應用程式發佈至 Google Play 商店的詳細說明，
請參閱 [Google Play launch][play] 文件。

## 更新應用程式版本號

應用程式的預設版本號為 `1.0.0`。
若要更新，請前往 `pubspec.yaml` 檔案，
並更新下列這一行：

```yaml
version: 1.0.0+1
```

版本號由三個以點號分隔的數字組成，
例如前述範例中的 `1.0.0`，
後面可以接一個選填的建置號（build number），
例如前述範例中的 `1`，兩者之間以 `+` 分隔。

在 Flutter 的建置過程中，可以分別透過指定 `--build-name` 和 `--build-number` 來覆寫
版本號與建置號。

在 Android 中，`build-name` 會作為 `versionName` 使用，
而 `build-number` 則作為 `versionCode` 使用。更多資訊請參考 Android 文件中的
[Version your app][]。

當你為 Android 重新建置應用程式時，來自 pubspec 檔案的
版本號更新會同步到 `local.properties` 檔案中的 `versionName` 與 `versionCode`。

[Version your app]: {{site.android-dev}}/studio/publish/versioning

## Android 發佈常見問答

以下是關於 Android 應用程式部署的一些常見問題。

### 什麼時候應該建置 app bundle 而不是 APK？

Google Play 商店建議你部署 app bundle，
因為這能讓應用程式更有效率地傳送給使用者。
然而，如果你不是透過 Play 商店分發應用程式，
那麼 APK 可能是你唯一的選擇。

### 什麼是 fat APK？

[fat APK][] 是一個單一 APK 檔案，內含多個
ABI 的二進位檔。這樣的好處是單一 APK 可以在多種架構上執行，
因此相容性更廣，但缺點是檔案體積會大很多，
導致使用者安裝應用程式時需要下載與儲存更多資料。
當你選擇建置 APK 而非 app bundle 時，
強烈建議使用分割 APK（split APK）的方式，
詳見[建立 APK](#build-an-apk)，並使用
`--split-per-abi` 旗標。

[fat APK]: https://en.wikipedia.org/wiki/Fat_binary

### 支援哪些目標架構？

當你以 release 模式建置應用程式時，
Flutter 應用程式可編譯為 [armeabi-v7a][] (ARM 32-bit)、
[arm64-v8a][] (ARM 64-bit)，以及 [x86-64][] (x86 64-bit)。

### 如何簽署由 `flutter build appbundle` 產生的 app bundle？

請參考[簽署應用程式](#sign-the-app)。

### 如何在 Android Studio 中建置 release 版本？

在 Android Studio 中，開啟你應用程式資料夾下現有的 `android/`
資料夾。然後，在專案面板中選擇 **build.gradle (Module: app)**：

<img src='/assets/images/docs/deployment/android/gradle-script-menu.png'
  alt='The Gradle build script menu in Android Studio.' style="max-height: 20rem">

接著，選擇建置變體（build variant）。在主選單中點選 **Build > Select Build Variant**。
在 **Build Variants** 面板中選擇任一變體（預設為 debug）：

<img src='/assets/images/docs/deployment/android/build-variant-menu.png'
  alt='The build variant menu in Android Studio with Release selected.'
  style="max-height: 20rem">

產生的 app bundle 或 APK 檔案會位於你應用程式資料夾下的
`build/app/outputs` 目錄中。

### 如何判斷某個 APK 是否使用 Flutter 開發？

你可以使用 [`apkanalyzer`][] 工具列出檔案：

```sh
apkanalyzer files list --files-only <SOME-APK> files list --files-only <SOME-APK>
```

然後尋找 `/lib/<ARCH>/libflutter.so` 路徑下的檔案。

例如，以下指令應回傳大於 0 的數字：

```sh
apkanalyzer files list some-flutter-app.apk | grep flutter.so | wc -l
```

**原理說明**

Flutter 相依於 Flutter 引擎所使用的 C++ 程式碼。在 Android 中，
此程式碼與 Flutter 框架及開發者的 Dart 程式碼一起打包為名為 `libflutter.so` 的原生函式庫。
Java/Android 工具鏈會在函式庫名稱前加上 `lib` 前綴，
並根據架構處理函式庫的位置。
這就是部分逆向工程師用來識別 Flutter 應用程式的方式。

[`apkanalyzer`]: {{site.android-dev}}/tools/apkanalyzer

#### 次要評估方式：

執行 `apkanalyzer manifest print <SOME-APK>`，並尋找
`android:name="flutterEmbedding"` 的 `<meta-data>` 標籤。
其值可以是 `1` 或 `2`。

範例：
`apkanalyzer manifest print some-flutter-app.apk | grep flutterEmbedding -C 2`
會回傳如下格式的字串：
```
<meta-data
   android:name="flutterEmbedding"
   android:value="2" />
```

**原理說明**

Flutter 曾有兩種不同的嵌入器（embedder），
此旗標用於判斷使用哪一種嵌入器。
[Flutter 3.22][] 已移除 v1 嵌入器應用程式的建置能力。
不建議使用此方法，因為目前尚不確定 `flutterEmbedding` 值
會在所有 Flutter 應用程式中保留多久。
此外，對於以 AAR 相依套件形式匯入 Android 應用程式的 Flutter 函式庫，
此方法也不適用。

[Flutter 3.22]: {{site.flutter-blog}}/whats-new-in-flutter-3-22-fbde6c164fe3

#### 非技術性評估方式

* 在裝置上下載 [Flutter Shark][]，讓它掃描本機應用程式。
* 造訪 [Flutter Hunt][] 網站。

[Flutter Hunt]: https://flutterhunt.com/
[Flutter Shark]: https://play.google.com/store/apps/details?id=com.fluttershark.fluttersharkapp&pli=1

{% comment %}
### Are there any special considerations with add-to-app?
{% endcomment %}
