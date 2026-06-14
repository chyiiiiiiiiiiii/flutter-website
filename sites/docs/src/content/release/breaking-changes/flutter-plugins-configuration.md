---
title: .flutter-plugins-dependencies 取代 .flutter-plugins。
description: >-
  已淘汰的 `.flutter-plugins` 工具檔案輸出已被
  `.flutter-plugins-dependencies` 取代，所有建置腳本或相關引用也必須一併更新。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`flutter` 工具將不再輸出 `.flutter-plugins` 中繼資料檔案，僅會輸出 `.flutter-plugins-dependencies`。

依賴 `.flutter-plugins` 存在的工具與建置腳本（例如 Android 應用程式的 Gradle 設定）都需要進行更新。

## 背景

[在 2019 年][PR 45379]，`.flutter-plugins-dependencies` 被新增為取代 `.flutter-plugins` 的新檔案格式。

因此，原本看起來像這樣的檔案：

```plaintext title=".flutter-plugins"
camera=/path/to/camera/plugin
shared_preferences=shared_preferences
```

已被類似以下的方式所取代：

```json title=".flutter-plugins-dependencies"
{
  "dependencyGraph": {
    "camera": {
      "name": "camera",
      "version": "0.10.0",
      "dependencies": {
        "flutter": "0.0.0"
      }
    },
    "shared_preferences": {
      "name": "shared_preferences",
      "version": "2.0.15",
      "dependencies": {
        "flutter": "0.0.0"
      }
    }
  },
  "flutter": {
    "frameworkRevision": "3a0f99d4f2",
    "channel": "stable"
  }
}
```

同時產生這兩個檔案會造成技術債，並使新功能的開發變得更加複雜，例如在發行版應用程式中不綑綁 `dev_dependency` 插件。

## 遷移指南

大多數 Flutter 開發者並不會解析或使用這個檔案，但建置設定可能會用到，包括舊版 `flutter create --platforms android` 指令所產生的 `settings.gradle` 檔案。
這些舊有檔案可能仍然參考 `.flutter-plugins`，因此必須更新為較新的建置腳本。

例如：

```groovy title="settings.gradle"
include ':app'

def flutterProjectRoot = rootProject.projectDir.parentFile.toPath()

def plugins = new Properties()
// Note explicitly reading the legacy '.flutter-plugins' file.
def pluginsFile = new File(flutterProjectRoot.toFile(), '.flutter-plugins')
if (pluginsFile.exists()) {
    pluginsFile.withReader('UTF-8') { reader -> plugins.load(reader) }
}

plugins.each { name, path ->
    def pluginDirectory = flutterProjectRoot.resolve(path).resolve('android').toFile()
    include ":$name"
    project(":$name").projectDir = pluginDirectory
}
```

可能會升級為其 `settings.gradle.kts` 對應版本：

```kts title="settings.gradle.kts"
pluginManagement {
    val flutterSdkPath = run {
        val properties = java.util.Properties()
        file("local.properties").inputStream().use { properties.load(it) }
        val flutterSdkPath = properties.getProperty("flutter.sdk")
        require(flutterSdkPath != null) { "flutter.sdk not set in local.properties" }
        flutterSdkPath
    }

    includeBuild("$flutterSdkPath/packages/flutter_tools/gradle")

    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    // Note the use of the flutter-plugin-loader versus reading '.flutter-plugins'
    id("dev.flutter.flutter-plugin-loader") version "1.0.0"
    id("com.android.application") version "8.1.0" apply false
    id("org.jetbrains.kotlin.android") version "1.8.22" apply false
}

include(":app")
```

如需協助切換至較新的 plugin DSL，請參閱
[Deprecated imperative apply of Flutter's Gradle plugins][imperative-apply]。

若要進行冒煙測試 (smoke test)，檢查你的建置是否依賴 `.flutter-plugins` 檔案，
你可以使用功能旗標 `explicit-package-dependencies`：

```console
$ flutter config --explicit-package-dependencies
```

任何依賴於 `.flutter-plugins` 檔案輸出的建置工具或腳本，現在都會失敗。

## 時程

變更納入版本：3.28.0-0.0.pre<br>
穩定版發佈：3.32

在此變更納入後的下一個穩定版發佈，`.flutter-plugins` 將不再被產生。

## 參考資料

相關議題：

- [Issue 48918][]，`.flutter-plugins` 於 2020 年被列為即將淘汰（deprecated）。

相關 PR：

- [PR 45379][]，`.flutter-plugins-dependencies` 最初於此新增。
- [PR 157388][]，於 Flutter Android 建置腳本中新增了警告。

[Issue 48918]: {{site.repo.flutter}}/issues/48918
[PR 45379]: {{site.repo.flutter}}/pull/45379
[PR 157388]: {{site.repo.flutter}}/pull/157388
[imperative-apply]: /release/breaking-changes/flutter-gradle-plugin-apply
