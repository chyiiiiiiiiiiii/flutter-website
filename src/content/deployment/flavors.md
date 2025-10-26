---
title: 為 Android 設定 Flutter flavors
shortTitle: Flavors（Android）
description: >
  如何針對不同的發佈類型或開發環境建立專屬的
  build flavors。
---

本指南將說明如何為 Android 應用程式建立 Flutter flavors。

## 概述

在 Android 中使用 Flutter flavor 時，這是一個統一的術語，代表多種平台專屬的功能。例如，flavor 可以決定特定版本應用程式所對應的圖示、應用程式名稱、API 金鑰、功能旗標（feature flag）以及日誌等級（logging level）。

如果你想為 Android 應用程式建立 Flutter flavors，可以直接在 Flutter 中完成。在 Android 裡，Flutter flavor 被稱為 [_product flavor_][_product flavor_]。

下方說明了當一個 Android 應用程式有兩個 product flavors（`staging`、`production`）以及兩個 build types（`debug`、`release`）時，所產生的 Android [_build variants_] 組合範例：

<table class="table table-striped">
  <thead>
    <tr>
      <th>Product flavors</th>
      <th>Build types</th>
      <th>Resulting build variants</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>staging</td>
      <td>debug</td>
      <td>
        stagingDebug</br>
        stagingRelease</br>
      </td>
    </tr>
    <tr>
      <td>production</td>
      <td>release</td>
      <td>
        productionDebug</br>
        productionRelease</br>
      </td>
    </tr>
  </tbody>
</table>

[_product flavor_]: https://developer.android.com/build/build-variants#product-flavors
[_build variants_]: https://developer.android.com/build/build-variants

## 設定你的 product flavors {: #using-flavors-in-android }

請依照下列步驟，為一個名為 `flavors_example` 的新 Flutter 專案新增兩個 Android product flavors，分別為 `staging` 和 `production`，並測試你的專案以確保 flavors 能如預期運作。

1.  建立一個名為 `flavors_example` 的新 Flutter 專案，並選擇 Kotlin 作為 Android 的首選語言。預設情況下，該專案會包含 `debug` 和 `release` 這兩種 Android build types。

    ```console title="console"
    $ flutter create --android-language kotlin flavors_example
    ```

1.  在 `flavors_example` 專案中新增名為 `staging` 和 `production` 的 product flavors（產品風味）。

    * 在 `flavors_example` 專案中，導航至 `android/app/` 目錄並開啟 `build.gradle.kts`。

    * 在 `android {} block` 內新增 `flavorsDimension` 屬性以及 `productFlavors` 屬性。請確保 `android {}` 區塊同時包含預設的 `debug` 和 `release` build types（建置類型）：

      ```kotlin title="build.gradle.kts"
      android {
          ...
          buildTypes {
            getByName("debug") {...}
            getByName("release") {...}
          }
          ...
          flavorDimensions += "default"
          productFlavors {
              create("staging") {
                  dimension = "default"
                  applicationIdSuffix = ".staging"
              }
              create("production") {
                  dimension = "default"
                  applicationIdSuffix = ".production"
              }
          }
      }
      ```

1.  為了確保你已經正確完成所有設定，請在 Android 的產品風味（product flavors）上執行你的應用程式。雖然目前設定尚未變更，因此你不會看到任何差異，但你仍然需要確認應用程式可以正常執行。

    * 啟動一個 Android 模擬器，或連接一台已啟用開發人員選項的實體裝置。

    * 在終端機中，切換到 `flavors_example` 目錄，並輸入以下指令來測試 `staging` 風味：

      ```console title="console"
      $ flutter run --flavor staging
      ```

    * 對 `production` flavor 重複前一個步驟。

1.  如果一切運作正常，您就可以開始自訂您的
    設定檔了。欲了解更多資訊，請參閱
    [自訂設定檔][Customize configurations]。

[Customize configurations]: #自訂組態

## 啟動 flavor {: #launching-your-app-flavors }

在您為 Android 應用程式建立好 product flavor 之後，
可以透過 Flutter 啟動特定的 product flavor。

您可以依照以下步驟，使用 Flutter 命令列介面（Command Line Interface）啟動指定的 product flavor：

1.  啟動 Android 模擬器，或連接已啟用開發者選項的實體裝置。

1. 在終端機中，切換到 `flavors_example`
目錄，並輸入以下指令：

```console title="console"
$ flutter (run | build <subcommand>) --flavor <flavor_name>
```

* `(run | build <subcommand>)`：請以以下其中一項取代：
  * `run`：以偵錯模式（debug mode）執行應用程式。
  * `build`：建置 APK 或 appbundle。
    * `<subcommand>`：可為 `apk` 或 `appbundle`。

* `<flavor_name>`：請以您的 Android 產品風味（product flavor）名稱取代（例如：`staging`、`production`）。

範例：

```console title="console"
$ flutter build apk --flavor staging
```

## 自訂組態

在你新增產品風味（product flavors）後，可以針對你的 Android 應用程式進行自訂設定。

### 建立獨特的應用程式顯示名稱

如果你有多個產品風味，使用不同的應用程式名稱可以快速辨識你部署的應用程式所使用的風味。

![Distinct app names in menu](/assets/images/docs/flavors/flavors-android-app-names-1.png){:width="40%"}

以下步驟說明如何為一個名為 `flavors_example` 的專案中的兩個產品風味 `staging` 和 `production`，新增獨特的應用程式顯示名稱。

1. 在你的 IDE 中更新 `build.gradle.kts`：

    * 在 `flavors_example` 專案中，導航至 `android/app/` 目錄並開啟 `build.gradle.kts`。

    * 在 `flavorsDimension` 區塊中，於 `staging` 和 `production` 風味下，新增一個名為 `app_name` 的 `resValue()` 屬性：

      ```kotlin title="build.gradle.kts"
      android {
          ...
          flavorDimensions += "default"
          productFlavors {
              create("staging") {
                  dimension = "default"
                  resValue(
                      type = "string",
                      name = "app_name",
                      value = "Flavors staging")
                  applicationIdSuffix = ".staging"
              }
              create("production") {
                  dimension = "default"
                  resValue(
                      type = "string",
                      name = "app_name",
                      value = "Flavors production")
                  applicationIdSuffix = ".production"
              }
          }
      ```

1.  在你的 IDE 中更新 `AndroidManifest.xml`：

    * 在 `flavors_example` 專案中，導覽至
      `android/app/src/main` 並開啟 `AndroidManifest.xml`。

    * 將 `android:label` 的值替換為
      `@string/app_name`。

      ```xml title="AndroidManifest.xml"
      <manifest xmlns:android="http://schemas.android.com/apk/res/android">
          <application
            android:label="@string/app_name"
            ...
          />
      />
      ```

1.  針對每個產品 flavor（`staging`、`production`）啟動應用程式，並檢查應用程式顯示名稱是否有正確變更。

    * 如何啟動產品 flavor，請參考[啟動 flavor][Launch a flavor]的步驟。

    * 在 Android App 模擬器中，前往應用程式清單。你應該會看到`Flavors p...`和`Flavors s...`各自一個。

    * 若要查看更多`Flavors p...`或`Flavors s...`的資訊，請長按其中一個圖示，然後選擇`App info`。

[Launch a flavor]: #launching-your-app-flavors

### 建立不同的圖示

如果你有多個產品 flavor，為每個設定建立不同的圖示，可以幫助你快速辨識目前部署的應用程式所使用的 flavor。

![Distinct icons](/assets/images/docs/flavors/flavors-android-icons.png){:width="40%"}

以下步驟說明如何在名為`flavors_example`的專案中，為兩個名為`staging`和`production`的產品 flavor 新增不同的圖示。

1.  準備你的圖示：

    * 使用你喜歡的設計工具設計`staging`圖示和`production`圖示。

    * 產生`staging`圖示和`production`圖示的多個尺寸版本，並以`PNG`格式儲存：

      * mipmap-mdpi（48x48 像素）
      * mipmap-hdpi（72x72 像素）
      * mipmap-xhdpi（96x96 像素）
      * mipmap-xxhdpi（144x144 像素）
      * mipmap-xxxhdpi（192x192 像素）

    :::note
    你可以使用像是 [App Icon Generator][App Icon Generator] 這類工具來產生各尺寸的圖示版本。
    :::

1.  建立 flavor 專屬的資源目錄：

    * 前往`android/app/src`目錄。

    * 建立名為`staging/res`的目錄。

    * 前往`staging/res`目錄。

    * 建立下列`mipmap`目錄，並將各尺寸的`staging`圖示移入：

      * `mipmap-mdpi/48x48_staging.png`
      * `mipmap-hdpi/72x72_staging.png`
      * `mipmap-xhdpi/96x96_staging.png`
      * `mipmap-xxhdpi/144x144_staging.png`
      * `mipmap-xxxhdpi/192x192_staging.png`

    * 針對`production` flavor 的目錄與圖示，重複上述步驟。

    * 將所有圖示重新命名為`ic_launcher.png`。

1.  在你的 IDE 中，仔細檢查`AndroidManifest.xml`的設定：

    * 在`flavors_example`專案中，前往`android/app/src/main`並開啟`AndroidManifest.xml`。

    * 確認`android:icon`的值為`@mipmap/ic_launcher`。

1.  針對每個產品 flavor（`staging`、`production`）啟動應用程式，並確認每個 flavor 的應用程式圖示都有變更。如何啟動產品 flavor，請參考[啟動 flavor][Launch a flavor]的步驟。

[Launch a flavor]: #launching-your-app-flavors
[App Icon Generator]: https://www.appicon.co/

### 打包資源（Bundle assets）

如果你的應用程式中有僅在特定 flavor 使用的資源（assets），你可以設定這些資源只在啟動該 flavor 時才會被打包進應用程式。這樣可以避免未使用的資源讓你的應用程式包（app bundle）變得過大。要為每個 flavor 打包資源，請在專案的 pubspec 中的`assets`欄位下新增`flavors`子欄位。想了解更多，請參考 [`assets` 欄位][`assets` field]於[Flutter pubspec options][Flutter pubspec options]。

[`assets` field]: /tools/pubspec#assets
[Flutter pubspec options]: /tools/pubspec

### 設定預設 flavor

你可以讓應用程式在未指定 flavor 時，預設使用特定的 flavor。要這麼做，請在專案的 pubspec 中新增`default-flavor`欄位。想了解更多，請參考 [`default-flavor` 欄位][`default-flavor` field]於[Flutter pubspec options][Flutter pubspec options]。

[`default-flavor` field]: /tools/pubspec#default-flavor-field

### 新增專屬的建置設定

如果你有額外的建置設定需要針對特定 Android 產品 flavor 進行設定，請參考 Android 官方的[設定建置變體（Configure build variants）][Configure build variants]。

[Configure build variants]: https://developer.android.com/build/build-variants

## 更多資訊

如需更多關於建立與使用 flavor 的資訊，請參考以下資源：

* [Build flavors in Flutter (Android and iOS) with Firebase][Build flavors in Flutter (Android and iOS) with Firebase]
* [How to Setup Flutter & Firebase with Multiple Flavors using the FlutterFire CLI][flutterfireCLI]

[Build flavors in Flutter (Android and iOS) with Firebase]: {{site.medium}}/@animeshjain/build-flavors-in-flutter-android-and-ios-with-different-firebase-projects-per-flavor-27c5c5dac10b
[flutterfireCLI]: https://codewithandrea.com/articles/flutter-firebase-multiple-flavors-flutterfire-cli/