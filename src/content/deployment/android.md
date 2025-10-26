---
title: 建置與發佈 Android 應用程式
description: 如何準備並將 Android 應用程式發佈到 Play 商店。
shortTitle: Android
---

要測試應用程式，你可以在命令列使用 `flutter run`，
或是在你的 IDE 中使用 **Run** 和 **Debug** 選項。

當你準備好要建立應用程式的 _發佈_ 版本時，
例如要[發佈到 Google Play 商店][play]，
本頁將提供協助。在發佈之前，
你可能會想為應用程式做一些最後的修飾。
本指南說明如何執行以下任務：

* [新增啟動器圖示](#新增啟動器圖示)
* [啟用 Material 元件 (Material components)](#啟用-material-元件-material-components)
* [簽署應用程式](#簽署應用程式)
* [使用 R8 縮減程式碼](#使用-r8-縮減程式碼)
* [啟用 multidex 支援](#啟用-multidex-支援)
* [檢查應用程式 manifest](#檢查-app-manifest)
* [檢查建置組態](#檢查或變更-gradle-建置組態-review-the-gradle-build-configuration)
* [建置發佈版本](#建立發行版應用程式)
* [發佈到 Google Play 商店](#發佈到-google-play-商店)
* [更新應用程式版本號](#更新應用程式的版本號)
* [Android 發佈常見問答](#android-發佈常見問答)
:::note
在本頁中，`[project]` 指的是
你的應用程式所在的目錄。在依照這些指示操作時，請將
`[project]` 替換為
你的應用程式目錄。
:::

[play]: {{site.android-dev}}/distribute

## 新增啟動器圖示

當你建立新的 Flutter 應用程式時，會有一個預設的啟動器圖示。
若要自訂這個圖示，你可以參考
[flutter_launcher_icons][flutter_launcher_icons] 套件。

另外，你也可以依照以下步驟手動設定：

1. 參考
   [Material Design 產品圖示][launchericons]設計圖示。

1. 在 `[project]/android/app/src/main/res/` 目錄下，
   將你的圖示檔案放在以
   [組態修飾符][configuration qualifiers]命名的資料夾中。
   預設的 `mipmap-` 資料夾展示了正確的
   命名方式。

1. 在 `AndroidManifest.xml` 中，更新
   [`application`][applicationtag] 標籤的 `android:icon`
   屬性，讓它參考前一步中放置的圖示（例如，
   `<application android:icon="@mipmap/ic_launcher" ...`）。

1. 若要確認圖示已經被替換，
   請執行你的應用程式，並在啟動器中檢查應用程式圖示。

[flutter_launcher_icons]: {{site.pub}}/packages/flutter_launcher_icons
[launchericons]: {{site.material}}/styles/icons
[configuration qualifiers]: {{site.android-dev}}/guide/topics/resources/providing-resources#AlternativeResources
[applicationtag]: {{site.android-dev}}/guide/topics/manifest/application-element

## 啟用 Material 元件 (Material components)

如果你的應用程式使用了 [平台視圖 (platform views)][platform views]，你可能會想要依照
[Android 入門指南][Getting Started guide for Android]中的步驟啟用
Material 元件 (Material components)。

例如：

1. 在 `<my-app>/android/app/build.gradle.kts` 中加入 Android Material 的相依性：

   ```groovy
   dependencies {
       // ...
       implementation("com.google.android.material:material:<version>")
       // ...
   }
   ```

   若要查詢最新版本，請造訪 [Google Maven][maven-material]。

1. 在 `<my-app>/android/app/src/main/res/values/styles.xml` 中設定淺色主題：

   ```xml diff
   - <style name="NormalTheme" parent="@android:style/Theme.Light.NoTitleBar">
   + <style name="NormalTheme" parent="Theme.MaterialComponents.Light.NoActionBar">
   ```

1. 在`<my-app>/android/app/src/main/res/values-night/styles.xml`中設定深色主題：

   ```xml diff
   - <style name="NormalTheme" parent="@android:style/Theme.Black.NoTitleBar">
   + <style name="NormalTheme" parent="Theme.MaterialComponents.DayNight.NoActionBar">
   ```

[platform views]: /platform-integration/android/platform-views
[Getting Started guide for Android]: {{site.material}}/develop/android/mdc-android
[maven-material]: https://maven.google.com/web/index.html#com.google.android.material:material

<a id="signing-the-app"></a>
## 簽署應用程式

若要在 Play 商店上發布，您需要使用數位憑證對您的應用程式進行簽署。

Android 使用兩種簽署金鑰：_上傳金鑰_（upload key）與 _應用程式簽署金鑰_（app signing key）。

* 開發者需將使用 _上傳金鑰_ 簽署的 `.aab` 或 `.apk` 檔案上傳至 Play 商店。
* 最終使用者則會下載已由 _應用程式簽署金鑰_ 簽署的 `.apk` 檔案。

如需建立您的應用程式簽署金鑰，請依照 [官方 Play 商店文件][official Play Store documentation] 中所述，使用 Play App Signing。

若要簽署您的應用程式，請依照以下說明操作。

[official Play Store documentation]: https://support.google.com/googleplay/android-developer/answer/7384423?hl=en

### 建立上傳 keystore

如果您已有現有的 keystore，請跳至下一步。
若沒有，請使用下列其中一種方法建立：

1. 依照 [Android Studio 金鑰產生步驟][Android Studio key generation steps] 操作。
1. 在命令列執行以下指令：

   在 macOS 或 Linux 上，請使用以下指令：

   ```console
   keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA \
           -keysize 2048 -validity 10000 -alias upload
   ```

   在 Windows 上，請在 PowerShell 中使用以下指令：

   ```powershell
   keytool -genkey -v -keystore $env:USERPROFILE\upload-keystore.jks `
           -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 `
           -alias upload
   ```

   此指令會將 `upload-keystore.jks` 檔案儲存在你的家目錄中。如果你想將它儲存在其他位置，請更改傳遞給 `-keystore` 參數的引數。
**但請務必將 `keystore` 檔案保密；不要將它提交到公開的原始碼管理系統！**

:::note
* `keytool` 指令可能不在你的路徑中——它是 Java 的一部分，隨 Android Studio 一起安裝。
  若要取得實際路徑，請執行 `flutter doctor -v`，並找到「Java binary at:」後面顯示的路徑。
  然後使用該完整路徑，將結尾的 `java` 替換為 `keytool`。
  如果你的路徑中包含空格，例如 `Program Files`，請依據作業系統使用適當的路徑表示方式。
  例如，在 macOS 和 Linux 上請使用 `Program\ Files`，在 Windows 上請使用 `"Program Files"`。

* `-storetype JKS` 標籤僅在 Java 9 或更新版本時需要。自 Java 9 發布起，keystore 類型預設為 PKS12。
:::

[Android Studio key generation steps]: {{site.android-dev}}/studio/publish/app-signing#generate-key

### 從應用程式參考 keystore

建立一個名為 `[project]/android/key.properties` 的檔案，內容包含對你的 keystore 的參考。
不要包含尖括號（`< >`）。
這些尖括號表示該文字是你的值的佔位符。

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
Windows 路徑中的 `keystore.jks` 必須使用雙反斜線指定：`\\`。
:::

:::warning
請將 `key.properties` 檔案保密；
不要將其提交到公開的原始碼控管系統。
:::

### 在 Gradle 中設定簽署

當以 release 模式建置您的應用程式時，請設定 Gradle 使用您的上傳金鑰（upload key）。
要設定 Gradle，請編輯 `<project>/android/app/build.gradle.kts` 檔案。

1. 在 `android` 屬性區塊之前，定義並載入 keystore 屬性檔案。

1. 設定 `keystoreProperties` 物件以載入 `key.properties` 檔案。

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

1. 在 `android` 屬性區塊內，於 `buildTypes` 屬性區塊之前新增簽署（signing）設定。

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

Flutter 現在會為所有發行版（release builds）進行簽署。

:::note
當你變更 Gradle 檔案後，可能需要執行 `flutter clean`。
這可以避免快取的建置影響簽署流程。
:::

想了解更多關於簽署應用程式的資訊，請參考
Android 開發者文件中的 [Sign your app][Sign your app]。

[Sign your app]: {{site.android-dev}}/studio/publish/app-signing.html#generate-key

## 使用 R8 縮減程式碼

[R8][R8] 是 Google 推出的新一代程式碼縮減工具。
當你建置發行版 APK 或 AAB 時，R8 預設會啟用。
若要停用 R8，請在 `flutter build apk` 或 `flutter build appbundle` 命令中加入 `--no-shrink` 參數。

:::note
混淆（Obfuscation）與壓縮（Minification）會顯著延長
Android 應用程式的編譯時間。

`--[no-]shrink` 參數已無作用。
在發行版建置時，程式碼縮減始終會啟用。
如需詳情，請參考 [Shrink, obfuscate, and optimize your app][Shrink, obfuscate, and optimize your app]。
:::

[R8]: {{site.android-dev}}/studio/build/shrink-code
[Shrink, obfuscate, and optimize your app]: {{site.android-dev}}/studio/build/shrink-code

## 啟用 multidex 支援

當你開發大型應用程式或使用大型套件時，
如果目標最低 API 為 20 或以下，可能會遇到 Android 的 dex 限制（64k 方法）。
在使用 `flutter run` 執行除錯版（debug）時，且未啟用程式碼縮減，也可能遇到此限制。

Flutter 工具支援輕鬆啟用 multidex。
最簡單的方式是在提示時選擇加入 multidex 支援。
工具會偵測 multidex 建置錯誤，並在修改你的 Android 專案前詢問你。
選擇加入後，Flutter 會自動依賴 `androidx.multidex:multidex`，並使用產生的
`FlutterMultiDexApplication` 作為專案的 application。

當你在 IDE 中使用 **Run** 和 **Debug** 選項建置並執行應用程式時，可能會遇到以下錯誤訊息：

<img src='/assets/images/docs/deployment/android/ide-build-failure-multidex.png' width="100%" alt='Build failure because Multidex support is required'>

若要透過命令列介面（Command Line Interface）啟用 multidex，
請執行 `flutter run --debug` 並選擇一台 Android 裝置：

<img src='/assets/images/docs/deployment/android/cli-select-device.png' width="100%" alt='Selecting an Android device with the flutter CLI.'>

當系統提示時，請輸入 `y`。
Flutter 工具會啟用 multidex 支援並重新嘗試建置：

<img src='/assets/images/docs/deployment/android/cli-multidex-added-build.png' width="100%" alt='The output of a successful build after adding multidex.'>

:::note
當目標為 Android SDK 21 或更高版本時，multidex 支援已原生內建。
:::

你也可以選擇依照 Android 官方指南手動支援 multidex，
並修改專案的 Android 目錄設定。
必須指定一個 [multidex keep file][multidex-keep] 來包含：

```plaintext
io/flutter/embedding/engine/loader/FlutterLoader.class
io/flutter/util/PathUtils.class
```

另外，也請包含應用程式啟動時所使用的其他類別。
如需手動新增 multidex 支援的詳細指引，
請參考官方 [Android documentation][multidex-docs]。

[multidex-keep]: {{site.android-dev}}/studio/build/multidex#keep
[multidex-docs]: {{site.android-dev}}/studio/build/multidex

## 檢查 App Manifest

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

| 標籤                                | 屬性      | 值                                                                                                   |
|------------------------------------|-----------|------------------------------------------------------------------------------------------------------|
| [`application`][applicationtag]    | 請編輯 [`application`][applicationtag] 標籤中的 `android:label`，以反映應用程式的最終名稱。 |
| [`uses-permission`][permissiontag] | 如果您的應用程式需要存取網際網路，請在 `android:name` 屬性中新增 `android.permission.INTERNET` [permission][permissiontag] 值。標準範本並未包含此標籤，但在開發期間允許網際網路存取，以便 Flutter 工具與執行中的應用程式進行通訊。 |

{:.table .table-striped}

[manifest]: {{site.android-dev}}/guide/topics/manifest/manifest-intro
[applicationtag]: {{site.android-dev}}/guide/topics/manifest/application-element
[permissiontag]: {{site.android-dev}}/guide/topics/manifest/uses-permission-element

## 檢查或變更 Gradle 建置組態 {:#review-the-gradle-build-configuration}

若要驗證 Android 建置組態，請檢查預設
[Gradle 建置腳本][gradlebuild]中的 `android` 區塊。
預設的 Gradle 建置腳本位於 `[project]/android/app/build.gradle.kts`。
您可以變更這些屬性的任何值。

```kotlin title="[project]/android/app/build.gradle.kts"
android {
    namespace = "com.example.[project]"
    // Any value starting with "flutter." gets its value from
    // the Flutter Gradle plugin.
    // To change from these defaults, make your changes in this file.
    [!compileSdk = flutter.compileSdkVersion!]
    ndkVersion = flutter.ndkVersion

    ...

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        [!applicationId = "com.example.[project]"!]
        // You can update the following values to match your application needs.
        [!minSdk = flutter.minSdkVersion!]
        [!targetSdk = flutter.targetSdkVersion!]
        // These two properties use values defined elsewhere in this file.
        // You can set these values in the property declaration
        // or use a variable.
        [!versionCode = flutterVersionCode.toInteger()!]
        [!versionName = flutterVersionName!]
    }

    buildTypes {
        ...
    }
}
```

[gradlebuild]: {{site.android-dev}}/studio/build/#module-level

### 在 build.gradle.kts 中可調整的屬性

| 屬性                   | 目的                                                                                                                                                                                                                                                     | 預設值                      |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|
| `compileSdk`         | 您的應用程式編譯時所對應的 Android API 等級。這應該設為可用的最高版本。如果您將此屬性設為 `31`，只要您的應用程式未使用僅限於 `31` 的 API，則仍可在運行 API `30` 或更早版本的裝置上執行。 | |
| `defaultConfig`      |  |  |
| `.applicationId`     | 最終且唯一的 [application ID][application ID]，用於識別您的應用程式。                                                                                                                                                                                              |                            |
| `.minSdk`            | 您設計應用程式可運行的 [最低 Android API 等級][minimum Android API level]。                                                                                                                                                                                   | `flutter.minSdkVersion`    |
| `.targetSdk`         | 您測試應用程式運行時所對應的 Android API 等級。您的應用程式應能在此等級及以下的所有 Android API 等級上運行。                                                                                                                               | `flutter.targetSdkVersion` |
| `.versionCode`       | 設定 [內部版本號][internal version number] 的正整數。這個數字僅用於判斷哪個版本較新，數字越大代表版本越新。應用程式使用者不會看到這個值。                                          |                            |
| `.versionName`       | 您的應用程式顯示為版本號的字串。可以直接設為原始字串，或設為字串資源的參考。                                                                                                                            |                            |
| `.buildToolsVersion` | Gradle 外掛會指定專案所使用的預設 Android build tools 版本。若要指定不同版本的 build tools，請變更此值。                                                                                    |                            |

{:.table .table-striped}

如需更多 Gradle 相關資訊，請參考 [Gradle build file][gradlebuild] 的模組層級 build 章節。

:::note
如果您使用較新版本的 Android SDK，
可能會收到有關
`compileSdkVersion`、`minSdkVersion` 或 `targetSdkVersion` 的棄用警告。
您可以將這些屬性分別重新命名為
`compileSdk`、`minSdk` 和 `targetSdk`。
:::

[application ID]: {{site.android-dev}}/studio/build/application-id
[minimum Android API level]: {{site.android-dev}}/studio/publish/versioning#minsdk
[internal version number]: {{site.android-dev}}/studio/publish/versioning
[gradlebuild]: {{site.android-dev}}/studio/build/#module-level

## 建立發行版應用程式

當您要發佈到 Play 商店時，有兩種可能的發行格式：

* App bundle（建議使用）
* APK

:::note
Google Play 商店偏好使用 app bundle 格式。
如需詳細資訊，請參閱 [About Android App Bundles][bundle]。
:::

[bundle]: {{site.android-dev}}/guide/app-bundle

### 建立 app bundle

本節說明如何建立發行版 app bundle。
如果您已完成簽章步驟，
則 app bundle 會被簽署。
此時，您可以考慮[混淆您的 Dart 程式碼][obfuscating your Dart code]，
以增加逆向工程的難度。
混淆程式碼需要在建置指令中加入額外參數，
並維護額外檔案以還原堆疊追蹤。

在命令列執行：

1. 輸入 `cd [project]`<br>
1. 執行 `flutter build appbundle`<br>
   （執行 `flutter build` 預設為發行版建置。）

您的應用程式發行 bundle 會產生於
`[project]/build/app/outputs/bundle/release/app.aab`。

預設情況下，app bundle 會包含您的 Dart 程式碼以及為 [armeabi-v7a][armeabi-v7a] (ARM 32-bit)、[arm64-v8a][arm64-v8a] (ARM 64-bit) 和 [x86-64][x86-64] (x86 64-bit) 編譯的 Flutter 執行階段。

[obfuscating your Dart code]: /deployment/obfuscate
[arm64-v8a]: {{site.android-dev}}/ndk/guides/abis#arm64-v8a
[armeabi-v7a]: {{site.android-dev}}/ndk/guides/abis#v7a
[x86-64]: {{site.android-dev}}/ndk/guides/abis#86-64

### 測試 app bundle

app bundle 可以透過多種方式測試。
本節說明其中兩種。

#### 離線使用 bundle tool

1. 如果尚未下載，請從其 [GitHub repository][bundletool-github] 下載 `bundletool`。
1. [從您的 app bundle 產生 APK 集合][apk-set]。
1. [將 APK 部署][apk-deploy] 到已連接的裝置。

[bundletool-github]: {{site.github}}/google/bundletool/releases/latest
[apk-set]: {{site.android-dev}}/studio/command-line/bundletool#generate_apks
[apk-deploy]: {{site.android-dev}}/studio/command-line/bundletool#deploy_with_bundletool

#### 在線上透過 Google Play 測試

1. 將您的 bundle 上傳至 Google Play 進行測試。
   您可以使用內部測試軌道，
   或使用 alpha 或 beta 頻道，在正式發佈前先測試 bundle。
2. 按照步驟將 [您的 bundle 上傳][upload-bundle]
   至 Play 商店。

[upload-bundle]: {{site.android-dev}}/studio/publish/upload-bundle

### 建立 APK

雖然 app bundle 是首選格式，
但有些商店尚未支援 app bundle。
此時，請為每個目標 ABI（應用程式二進位介面，Application Binary Interface）建立發行版 APK。

如果您已完成簽章步驟，APK 會被簽署。
此時，您可以考慮[混淆您的 Dart 程式碼][obfuscating your Dart code]，
以增加逆向工程的難度。
混淆程式碼需要在建置指令中加入額外參數。

在命令列執行：

1. 輸入 `cd [project]`。

1. 執行 `flutter build apk --split-per-abi`。
   （`flutter build` 指令預設為 `--release`。）

此指令會產生三個 APK 檔案：

* `[project]/build/app/outputs/apk/release/app-armeabi-v7a-release.apk`
* `[project]/build/app/outputs/apk/release/app-arm64-v8a-release.apk`
* `[project]/build/app/outputs/apk/release/app-x86_64-release.apk`

移除 `--split-per-abi` 參數會產生一個 fat APK，內容包含
為 _所有_ 目標 ABI 編譯的程式碼。
這類 APK 檔案比分割後的 APK 更大，
使用者會下載到與其裝置架構不相容的原生二進位檔，
導致下載檔案變大。

[obfuscating your Dart code]: /deployment/obfuscate

### 在裝置上安裝 APK

請依照下列步驟，將 APK 安裝到已連接的 Android 裝置上。

在命令列執行：

1. 使用 USB 線將您的 Android 裝置連接至電腦。
1. 輸入 `cd [project]`。
1. 執行 `flutter install`。

## 發佈到 Google Play 商店

如需將應用程式發佈到 Google Play 商店的詳細說明，
請參閱 [Google Play launch][play] 文件。

## 更新應用程式的版本號

應用程式的預設版本號為 `1.0.0`。
若要更新版本號，請前往 `pubspec.yaml` 檔案，
並更新下列這一行：

```yaml
version: 1.0.0+1
```

版本號由三個以點號分隔的數字組成，
例如前述範例中的 `1.0.0`，
後面可以接一個選填的建置號（build number），
如前述範例中的 `1`，兩者之間以 `+` 分隔。

在 Flutter 的建置過程中，可以分別透過指定 `--build-name` 和 `--build-number`
來覆寫版本號與建置號。

在 Android 中，`build-name` 會作為 `versionName` 使用，
而 `build-number` 則會作為 `versionCode` 使用。更多資訊請參閱 Android 文件中的
[Version your app][Version your app]。

當你為 Android 重新建置應用程式時，
來自 pubspec 檔案的版本號更新會自動同步到
`local.properties` 檔案中的 `versionName` 和 `versionCode`。

[Version your app]: {{site.android-dev}}/studio/publish/versioning

## Android 發佈常見問答

以下是有關 Android 應用程式部署的常見問題。

### 什麼時候應該建置 app bundle 而不是 APK？

Google Play 商店建議你發佈 app bundle，
因為這樣可以更有效率地將應用程式分發給使用者。
但如果你不是透過 Play 商店發佈應用程式，
那麼 APK 可能是你唯一的選擇。

### 什麼是 fat APK？

[fat APK][fat APK] 是一種單一 APK 檔案，
其中包含多個 ABI 的二進位檔。
這樣的好處是單一 APK 可以在多種架構上運行，
因此相容性較高，但缺點是檔案體積較大，
使用者在安裝你的應用程式時需要下載和儲存更多資料。
如果你選擇建置 APK 而非 app bundle，
強烈建議你依照 [build an APK](#建立-apk) 的說明，
使用 `--split-per-abi` 參數來建置分割 APK（split APK）。

[fat APK]: https://en.wikipedia.org/wiki/Fat_binary

### 支援哪些目標架構？

當你以 release 模式建置應用程式時，
Flutter 應用程式可以編譯為 [armeabi-v7a][armeabi-v7a] (ARM 32-bit)、
[arm64-v8a][arm64-v8a] (ARM 64-bit)，以及 [x86-64][x86-64] (x86 64-bit)。

### 如何簽署由 `flutter build appbundle` 產生的 app bundle？

請參閱 [Sign the app](#簽署應用程式)。

### 如何在 Android Studio 內建置 release 版本？

在 Android Studio 中，開啟你應用程式資料夾下的現有 `android/`
資料夾。然後，在專案面板中選擇 **build.gradle (Module: app)**：

<img src='/assets/images/docs/deployment/android/gradle-script-menu.png' alt='The Gradle build script menu in Android Studio.' style="max-height: 20rem">

接下來，選擇建置變體（build variant）。
在主選單點選 **Build > Select Build Variant**。
在 **Build Variants** 面板中選擇任一變體（預設為 debug）：

<img src='/assets/images/docs/deployment/android/build-variant-menu.png' alt='The build variant menu in Android Studio with Release selected.' style="max-height: 20rem">

產生的 app bundle 或 APK 檔案會位於你應用程式資料夾下的
`build/app/outputs`。

{% comment %}
### 使用 add-to-app 有什麼特別注意事項嗎？
{% endcomment %}
