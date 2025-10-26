---
title: 將 Flutter 模組整合進你的 Android 專案
shortTitle: 整合 Flutter
description: 學習如何將 Flutter 模組整合到你現有的 Android 專案中。
---

你可以將 Flutter 以原始碼 Gradle 子專案或 AAR 的形式，逐步嵌入到你現有的 Android 應用程式中。

整合流程可以透過安裝 [Flutter plugin][Flutter plugin] 的 Android Studio IDE 進行，或是手動操作。

:::warning
你現有的 Android 應用程式可能支援像是 `mips` 或 `x86` 等架構。Flutter 目前[僅支援][only supports]為 `x86_64`、`armeabi-v7a` 和 `arm64-v8a` 建立預先編譯（AOT, ahead-of-time）的函式庫。

建議使用 [`abiFilters`][`abiFilters`] Android Gradle Plugin API 來限制 APK 支援的架構。這麼做可以避免例如缺少 `libflutter.so` 導致的執行階段崩潰，例如：

{% tabs "android-build-language" %}
{% tab "Kotlin" %}

```kotlin title="MyApp/app/build.gradle.kts"
android {
    //...
    defaultConfig {
        ndk {
            // Filter for architectures supported by Flutter
            abiFilters += listOf("armeabi-v7a", "arm64-v8a", "x86_64")
        }
    }
}
```

{% endtab %}
{% tab "Groovy" %}

```groovy title="MyApp/app/build.gradle"
android {
    // ...
    defaultConfig {
        ndk {
            // Filter for architectures supported by Flutter
            abiFilters "armeabi-v7a", "arm64-v8a", "x86_64"
        }
    }
}
```

{% endtab %}
{% endtabs %}

Flutter 引擎也有 `x86_64` 版本。
當你在模擬器上以偵錯 Just-In-Time（JIT）模式運行時，
Flutter 模組依然可以正常運作。
:::

## 整合你的 Flutter 模組

{% tabs %}
{% tab "使用 Android Studio" %}

### 使用 Android Studio 進行整合 {:.no_toc}

Android Studio IDE 可以協助你整合 Flutter 模組。
透過 Android Studio，你可以在同一個 IDE 中編輯 Android 及 Flutter 程式碼。

你也可以使用 IntelliJ Flutter 外掛的功能，例如
Dart 程式碼自動補全、熱重載（hot reload）、以及元件檢查器（widget inspector）。

為了建置你的應用程式，Android Studio 外掛會將你的
Android 專案設定為將 Flutter 模組新增為相依性。

1. 在 Android Studio 中開啟你的 Android 專案。

1. 前往 **File** > **New** > **New Project...**。
    這時會顯示 **New Project** 對話框。

1. 點擊 **Flutter**。

1. 如果系統要求你提供 **Flutter SDK 路徑**，請填寫並點擊 **Next**。

1. 完成 Flutter 模組的相關設定。

    * 如果你已有現有專案：

        {: type="a"}
        1. 若要選擇現有專案，請點擊 **...**
           （位於 **Project location** 欄位右側）。
        1. 導航至你的 Flutter 專案目錄。
        1. 點擊 **Open**。

    * 如果你需要建立新的 Flutter 專案：

        {: type="a"}
        1. 完成設定對話框。
        1. 在 **Project type** 選單中，選擇 **Module**。

1. 點擊 **Finish**。

:::tip
預設情況下，你的專案 Project 面板可能顯示為「Android」檢視。
如果你在 Project 面板中看不到新的 Flutter 檔案，
請將 Project 面板切換為顯示 **Project Files**。
這樣可以顯示所有檔案，不會被過濾。
:::

{% endtab %}
{% tab "不使用 Android Studio" %}

### 不使用 Android Studio 進行整合 {:.no_toc}

若要手動將 Flutter 模組整合到現有 Android 應用程式中，
且不使用 Flutter 的 Android Studio 外掛，
請依照下列步驟進行：

#### 建立 Flutter 模組

假設你已有一個現有的 Android 應用程式，位於
`some/path/MyApp`，而你希望將 Flutter
專案作為其同層目錄的專案：

```console
cd some/path/
flutter create -t module --org com.example flutter_module
```

這會建立一個 `some/path/flutter_module/` Flutter 模組專案，
其中包含一些入門用的 Dart 程式碼，以及一個 `.android/`
隱藏子資料夾。`.android` 資料夾內包含一個
Android 專案，這個專案除了可以讓你透過 `flutter run`
執行 Flutter 模組的極簡獨立版本外，
同時也是一個包裝器，協助將 Flutter 模組作為可嵌入的 Android 函式庫啟動。

:::note
請將自訂的 Android 程式碼加入你自己現有
應用程式的專案或插件中，
不要加在 `.android/` 中的模組裡。
你在模組的 `.android/`
資料夾所做的變更，不會反映到使用該模組的現有 Android
專案中。

`.android/` 資料夾是自動產生的，請勿納入版本控制。
在新機器上建置模組前，請先在 `flutter_module`
目錄下執行 `flutter pub get`，
以便在使用 Flutter 模組建置 Android 專案前，重新產生 `.android/`
資料夾。
:::

:::note
為避免 Dex 合併衝突，`flutter.androidPackage`
不應與你的主應用程式的 package name 完全相同。
:::

#### Java 版本需求

Flutter 要求你的專案必須宣告相容於 Java 11 或以上版本。

在嘗試將 Flutter 模組專案
連接到你的主 Android 應用程式前，請確保你的主 Android
應用程式已在 `build.gradle` 檔案的 `android { }` 區塊中
宣告下列原始碼相容性設定。

```groovy title="MyApp/app/build.gradle"
android {
    // ...
    compileOptions {
        sourceCompatibility = 11 // The minimum value
        targetCompatibility = 11 // The minimum value
    }
}
```

#### 集中管理 repository 設定

自 Gradle 7 起，Android 建議在 `settings.gradle` 中集中宣告 repository，而不是在專案或模組層級的 `build.gradle` 檔案中宣告。

在嘗試將你的 Flutter 模組專案連接到主 Android 應用程式之前，請先進行以下變更。

1. 移除所有應用程式 `build.gradle` 檔案中的 `repositories` 區塊。

   ```groovy
   // Remove the following block, starting on the next line
       repositories {
           google()
           mavenCentral()
       }
   // ...to the previous line
   ```

1. 將此步驟中顯示的 `dependencyResolutionManagement` 新增到
   `settings.gradle` 檔案中。

{% tabs "settings.gradle.kts" %}
{% tab "Kotlin" %}

```kotlin title="settings.gradle.kts"
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    val storageUrl: String = System.getenv("FLUTTER_STORAGE_BASE_URL") ?: "https://storage.googleapis.com"
    repositories {
        google()
        mavenCentral()
        maven("$storageUrl/download.flutter.io")
    }
}
```

{% endtab %}
{% tab "Groovy" %}

```groovy title="settings.gradle"
dependencyResolutionManagement {
    repositoriesMode = RepositoriesMode.PREFER_SETTINGS
    String storageUrl = System.env.FLUTTER_STORAGE_BASE_URL ?: "https://storage.googleapis.com"
    repositories {
        google()
        mavenCentral()
        maven {
            url = uri("$storageUrl/download.flutter.io")
        }
    }
}
```

{% endtab %}
{% endtabs %}

{% endtab %}
{% endtabs %}

## 將 Flutter 模組作為相依性加入

在 Gradle 中，將 Flutter 模組作為您現有應用程式的相依性。您可以透過以下兩種方式來達成。

1. **Android archive**
    AAR 機制會建立通用的 Android AAR 做為中介，將您的 Flutter 模組封裝起來。
    當您的下游應用程式建置者不希望安裝 Flutter SDK 時，這是一個不錯的選擇。
    但如果您經常建置，這會多增加一個建置步驟。

1. **模組原始碼**
    原始碼子專案機制提供方便的一鍵建置流程，但需要安裝 Flutter SDK。
    這也是 Android Studio IDE 外掛所採用的機制。

{% tabs %}
{% tab "Android Archive" %}

### 依賴 Android Archive (AAR) {:.no_toc}

此選項會將您的 Flutter 函式庫封裝成由 AAR 與 POM 構成的本地 Maven 儲存庫。
這讓您的團隊可以在不安裝 Flutter SDK 的情況下建置主應用程式。之後，您可以從本地或遠端儲存庫分發這些產物。

假設您已在 `some/path/flutter_module` 建立了一個 Flutter 模組，然後執行：

```console
cd some/path/flutter_module
flutter build aar
```

然後，請依照畫面上的指示進行整合。

{% render docs/app-figure.md, image:"development/add-to-app/android/project-setup/build-aar-instructions.png" %}

更具體來說，此指令會建立
（預設包含所有 debug/profile/release 模式）
一個[本機儲存庫][local repository]，其中包含以下檔案：

```plaintext
build/host/outputs/repo
└── com
    └── example
        └── flutter_module
            ├── flutter_release
            │   ├── 1.0
            │   │   ├── flutter_release-1.0.aar
            │   │   ├── flutter_release-1.0.aar.md5
            │   │   ├── flutter_release-1.0.aar.sha1
            │   │   ├── flutter_release-1.0.pom
            │   │   ├── flutter_release-1.0.pom.md5
            │   │   └── flutter_release-1.0.pom.sha1
            │   ├── maven-metadata.xml
            │   ├── maven-metadata.xml.md5
            │   └── maven-metadata.xml.sha1
            ├── flutter_profile
            │   ├── ...
            └── flutter_debug
                └── ...
```

為了讓主應用程式能夠依賴 AAR，主應用程式必須能夠找到這些檔案。

為此，請編輯你的主應用程式中的 `settings.gradle`，
以包含本地儲存庫以及相依套件：

{% tabs "settings.gradle.kts" %}
{% tab "Kotlin" %}

```kotlin title="settings.gradle.kts"
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    repositories {
        google()
        mavenCentral()
        maven("https://storage.googleapis.com/download.flutter.io")
    }
}
```

{% endtab %}
{% tab "Groovy" %}

```groovy title="settings.gradle"
dependencyResolutionManagement {
    repositoriesMode = RepositoriesMode.PREFER_SETTINGS
    repositories {
        google()
        mavenCentral()

        // Add the new repositories starting on the next line...
        maven {
            url = uri("some/path/flutter_module/build/host/outputs/repo")
            // This is relative to the location of the build.gradle file
            // if using a relative path.
        }

        maven {
            url = uri("https://storage.googleapis.com/download.flutter.io")
        }
        // ...to before this line  
    }
}
```

{% endtab %}
{% endtabs %}

<br>

### 基於 Kotlin DSL 的 Android 專案

在對基於 Kotlin DSL 的 Android 專案進行`aar`建置之後，  
請依照以下步驟將 flutter_module 加入專案。

在 Android 專案的`app/build.gradle`檔案中，  
將 Flutter 模組作為相依性（dependency）引入。

```kotlin title="MyApp/app/build.gradle.kts"
android {
    buildTypes {
        release {
          ...
        }
        debug {
          ...
        }
        create("profile") {
            initWith(getByName("debug"))
        }
}

dependencies {
  // ...
  debugImplementation("com.example.flutter_module:flutter_debug:1.0")
  releaseImplementation("com.example.flutter_module:flutter_release:1.0")
  add("profileImplementation", "com.example.flutter_module:flutter_profile:1.0")
}
```

`profileImplementation` ID 是一個自訂的 `configuration`，需要在 host 專案的 `app/build.gradle` 檔案中實作。

```kotlin title="host-project/app/build.gradle.kts"
configurations {
    getByName("profileImplementation") {
    }
}
```

```kotlin title="MyApp/settings.gradle.kts"
include(":app")

dependencyResolutionManagement {
    repositories {
        maven(url = "https://storage.googleapis.com/download.flutter.io")
        maven(url = "some/path/flutter_module_project/build/host/outputs/repo")
    }
}
```

:::important
如果你位於中國，請使用鏡像站點，而非`storage.googleapis.com`網域。想了解更多鏡像站點的資訊，請參閱[在中國使用 Flutter][Using Flutter in China]頁面。
:::

:::tip
你也可以在 Android Studio 中，透過`Build > Flutter > Build AAR`選單為你的 Flutter 模組建置 AAR。

{% render docs/app-figure.md, image:"development/add-to-app/android/project-setup/ide-build-aar.png" %}
:::

{% endtab %}
{% tab "Module source code" %}

### 依賴模組原始碼 {:.no_toc}

這個選項可以讓你的 Android 專案與 Flutter 專案進行一步建置。當你需要同時開發並快速迭代這兩個部分時，這個方式非常方便，但團隊成員必須安裝 Flutter SDK 才能建置主應用程式（host app）。

:::tip
預設情況下，主應用程式會提供`:app` Gradle 專案。若要變更此專案名稱，請在 Flutter 模組的`gradle.properties`檔案中設定`flutter.hostAppProjectName`。並在主應用程式的`settings.gradle`檔案中引入這個專案。
:::

#### 更新`settings.gradle`

請將 Flutter 模組作為子專案（subproject）包含在主應用程式的`settings.gradle`中。以下範例假設`flutter_module`與`MyApp`位於同一個目錄。

如果你使用 Kotlin，請套用以下變更：

```kotlin title="MyApp/settings.gradle.kts"
// Include the host app project. Assumed existing content.
include(":app")            
// Replace "flutter_module" with whatever package_name you supplied when you ran:
// `$ flutter create -t module [package_name]
val filePath = settingsDir.parentFile.toString() + "/flutter_module/.android/include_flutter.groovy"
apply(from = File(filePath))
```

:::warning
從 Kotlin 程式碼呼叫 `include_flutter.groovy` 的能力
需要 Flutter 3.27 版本。
要查詢你目前的 Flutter 版本，
請執行 `flutter --version`。如果版本低於 3.27，
請考慮切換到 `main` 或 `beta` 頻道。
:::

如果你使用的是 Groovy，請套用以下變更：

```groovy title="MyApp/settings.gradle"
// Include the host app project.
include(":app")                                   // assumed existing content
setBinding(new Binding([gradle: this]))           // new
def filePath = settingsDir.parentFile.toString() + "/flutter_module/.android/include_flutter.groovy" // new
apply from: filePath                              // new
```

綁定與腳本評估允許 Flutter 模組在您的 `settings.gradle` 的評估環境中`include`自身（作為 `:flutter`），以及該模組所使用的任何 Flutter 外掛（例如 `:package_info` 和 `:video_player`）。

#### 更新 `app/build.gradle`

在您的應用程式中，為 Flutter 模組新增一個 `implementation` 相依性：

```groovy title="MyApp/app/build.gradle"
dependencies {
    implementation(project(":flutter"))
}
```

:::note
這段程式碼在 Groovy 與 Kotlin 之間是相同的。
:::

{% endtab %}
{% endtabs %}

您的應用程式現在已將 Flutter 模組作為相依性（dependency）納入。

請繼續參閱 [Adding a Flutter screen to an Android app][Adding a Flutter screen to an Android app] 指南。

[`abiFilters`]: {{site.android-dev}}/reference/tools/gradle-api/4.2/com/android/build/api/dsl/Ndk#abiFilters:kotlin.collections.MutableSet
[Adding a Flutter screen to an Android app]: /add-to-app/android/add-flutter-screen
[Flutter plugin]: https://plugins.jetbrains.com/plugin/9212-flutter
[local repository]: https://docs.gradle.org/current/userguide/declaring_repositories.html#sub:maven_local
[only supports]: /resources/faq#what-devices-and-os-versions-does-flutter-run-on
[Using Flutter in China]: /community/china
