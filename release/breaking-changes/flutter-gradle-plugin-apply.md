# Flutter 的 Gradle 外掛指令式套用方式已棄用

> 如何將你的 Flutter 應用程式的 Android Gradle 建置檔案遷移到 全新的宣告式格式。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

為了在 Android 上建置 Flutter 應用程式，必須套用 Flutter 的 Gradle 外掛。過去，這通常是透過 Gradle 的[傳統指令式 apply script 方法][legacy, imperative apply script method]來完成。

自 Flutter 3.16 起，已支援使用 Gradle 的[宣告式 plugins {} 區塊][declarative plugins {} block]（也稱為 Plugin DSL）來套用這些外掛，這也是目前推薦的做法。從 Flutter 3.16 開始，使用 `flutter create` 產生的專案會利用 Plugin DSL 來套用 Gradle 外掛。若是 Flutter 3.16 之前版本建立的專案，則需要手動遷移。

使用 `plugins {}` 區塊套用 Gradle 外掛，執行的程式碼與過去相同，產生的應用程式二進位檔也應該是一致的。

若想了解新 Plugin DSL 語法相較於傳統 `apply` script 語法的優勢，請參閱 [Gradle docs][plugins block]。

將應用程式生態系統遷移至新方式，也將讓 Flutter 團隊更容易開發 Flutter 的 Gradle 外掛，並在未來啟用更多令人期待的新功能，例如在 Gradle 建置腳本中使用 Kotlin 取代 Groovy。

## 遷移方式

### android/settings.gradle

首先，請找出專案目前所使用的 Android Gradle Plugin (AGP) 和 Kotlin 的版本。除非你已經將它們移動過，否則這些設定很可能定義在 `<app-src>/android/build.gradle` 檔案的 buildscript 區塊中。

以下是一個範例，說明在本次變更前新建立的 Flutter 應用程式中的 `build.gradle` 檔案內容：

```groovy
buildscript {
    ext.kotlin_version = '1.7.10'
    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:7.3.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.buildDir = '../build'
subprojects {
    project.buildDir = "${rootProject.buildDir}/${project.name}"
}
subprojects {
    project.evaluationDependsOn(':app')
}

tasks.register("clean", Delete) {
    delete rootProject.buildDir
}
```

AGP 版本是指在這一行結尾的數字
`classpath 'com.android.tools.build:gradle:7.3.0'`，所以在這個例子中是 `7.3.0`。
同樣地，Kotlin 版本則是在這一行結尾
`ext.kotlin_version = '1.7.10'`，在這個例子中是 `1.7.10`。

接下來，請將
`<app-src>/android/settings.gradle` 的內容替換為以下內容，
並記得將 `{agpVersion}` 和 `{kotlinVersion}` 替換為前面
所取得的值：

```groovy
pluginManagement {
    def flutterSdkPath = {
        def properties = new Properties()
        file("local.properties").withInputStream { properties.load(it) }
        def flutterSdkPath = properties.getProperty("flutter.sdk")
        assert flutterSdkPath != null, "flutter.sdk not set in local.properties"
        return flutterSdkPath
    }()

    includeBuild("$flutterSdkPath/packages/flutter_tools/gradle")

    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id "dev.flutter.flutter-plugin-loader" version "1.0.0" // apply true
    id "com.android.application" version "{agpVersion}" apply false
    id "org.jetbrains.kotlin.android" version "{kotlinVersion}" apply false
}

include ":app"
```

如果你對此檔案做了修改，請確保這些修改放在
`pluginManagement {}` 和 `plugins {}` 區塊之後，因為 Gradle 強制要求
這些區塊之前不能有其他程式碼。

Flutter Gradle Plugin（`dev.flutter.flutter-plugin-loader`）的設定
不應該設為 apply false（預設為 true），或應明確
設為 true。


### android/build.gradle

請從 `<app-src/android/build.gradle` 中移除整個 `buildscript` 區塊：

```groovy diff
- buildscript {
-     ext.kotlin_version = '{kotlinVersion}'
-     repositories {
-         google()
-         mavenCentral()
-     }
-
-     dependencies {
-         classpath "org.jetbrains.kotlin:gradle-plugin:$kotlin_version"
-     }
- }
```

該檔案最終可能會是這樣：

```groovy
allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.buildDir = '../build'
subprojects {
    project.buildDir = "${rootProject.buildDir}/${project.name}"
}
subprojects {
    project.evaluationDependsOn(':app')
}

tasks.register("clean", Delete) {
    delete rootProject.buildDir
}
```

### android/app/build.gradle

預設情況下，以下這些位於 `<app-src>/android/app/build.gradle` 的程式碼也需要進行相應的變更。
首先，請移除以下兩段使用舊式指令式 apply 方法的程式碼區塊：

```groovy diff
- def flutterRoot = localProperties.getProperty('flutter.sdk')
- if (flutterRoot == null) {
-     throw new GradleException("Flutter SDK not found. Define location with flutter.sdk in the local.properties file.")
- }
```

```groovy diff
- apply plugin: 'com.android.application'
- apply plugin: 'com.jetbrains.kotlin.android'
- apply from: "$flutterRoot/packages/flutter_tools/gradle/flutter.gradle"
```

現在請再次套用這些插件，
但這次請使用 Plugin DSL 語法。
在檔案的最上方加入以下內容：

```groovy
plugins {
    id "com.android.application"
    id "kotlin-android"
    id "dev.flutter.flutter-gradle-plugin"
}
```
`"dev.flutter.flutter-gradle-plugin"` 是專案的 Flutter Gradle Plugin，這個字串與在 settings.gradle(.kts) 中所設定的值（`"dev.flutter.flutter-plugin-loader"`）不同。

最後，如果你的 `dependencies` 區塊中包含對 `"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"` 的相依性，請將該相依性移除。

```groovy diff
  dependencies {
-     implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
  }
```
如果它是 `dependencies` 區塊中唯一的相依項，
那麼你也可以直接將該區塊整個移除。

### 驗證

執行 `flutter run`，以確認你的應用程式能夠順利建置，
並在已連接的 Android 裝置或模擬器上啟動。

## 範例

### Google Mobile Services 與 Crashlytics

如果你的應用程式有使用 Google Mobile Services 與 Crashlytics，
請從 `<app-src>/android/build.gradle` 中移除以下這幾行：

```groovy diff
  buildscript {
      // ...

      dependencies {
          // ...
-         classpath "com.google.gms:google-services:4.4.0"
-         classpath "com.google.firebase:firebase-crashlytics-gradle:2.9.9"
      }
  }
```

然後，請從 `<app-src>/android/app/build.gradle` 中移除以下這兩行：

```groovy diff
- apply plugin: 'com.google.gms.google-services'
- apply plugin: 'com.google.firebase.crashlytics'
```

要遷移至 GMS 和 Crashlytics 插件的新宣告式 apply 語法，請將它們加入應用程式的 `plugins` 區塊中，位於 `<app-src>/android/settings.gradle` 檔案內。

新增內容應類似於下方範例，但請使用你所需的插件版本，這些版本通常與你從 `<app-src>/android/build.gradle` 檔案中移除的版本相同。

```groovy diff
  plugins {
      id "dev.flutter.flutter-plugin-loader" version "1.0.0"
      id "com.android.application" version "{agpVersion}" apply false
      id "org.jetbrains.kotlin.android" version "{kotlinVersion}" apply false
+     id "com.google.gms.google-services" version "4.4.0" apply false
+     id "com.google.firebase.crashlytics" version "2.9.9" apply false
  }
```

請將以下程式碼加入 `<app-src>/android/app/build.gradle`：

```groovy diff
  plugins {
      id "com.android.application"
      id "dev.flutter.flutter-gradle-plugin"
      id "org.jetbrains.kotlin.android"
+     id "com.google.gms.google-services"
+     id "com.google.firebase.crashlytics"
  }
```

## 時程

在穩定版支援：3.16.0
在穩定版建議使用：3.19.0

## 參考資料

由 `flutter create` 產生的 Gradle 建置檔案，會因 Flutter 版本而有所不同。
如需詳細說明，請參閱 [issue #135392][]。
建議您使用最新版的建置檔案。

[legacy, imperative apply script method]: https://docs.gradle.org/8.5/userguide/plugins.html#sec:script_plugins
[declarative plugins {} block]: https://docs.gradle.org/8.5/userguide/plugins.html#sec:plugins_block
[plugins block]: https://docs.gradle.org/current/userguide/plugins.html#plugins_dsl_limitations
[issue #135392]: https://github.com/flutter/flutter/issues/135392

