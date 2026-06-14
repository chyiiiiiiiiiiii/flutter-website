---
title: 插件作者的內建 Kotlin 遷移指南
description: >-
  將 Flutter 插件遷移至使用內建 Kotlin。
---

## 遷移您的 Flutter 插件

本指南專門針對插件作者說明遷移步驟。

### 更新 Gradle 檔案

以下步驟假設您可以將插件的 Flutter SDK 最低版本更新至 3.44。若您無法將 Flutter SDK 最低版本更新至 3.44，請依照
[支援低於 3.44 的 Flutter 版本][flutter-sdk-minimum-below-3.44] 中的說明進行操作。

首先，找到 `kotlin-android` 插件（或 `org.jetbrains.kotlin.android` 插件）。
它通常位於 `<plugin-project>/build.gradle` 或 `<plugin-project>/build.gradle.kts` 檔案的 `plugins` 區塊中。
若您使用舊式 `apply` 語法，它會位於基於 Groovy 的 `<plugin-project>/build.gradle` 檔案中，因為此語法不支援 Kotlin DSL。

以下範例示範如何遷移 Flutter 插件：

<Tabs key="modern-legacy-apply">
<Tab name="plugins block">

**遷移前**：

```kotlin title="<app-src>/android/build.gradle(.kts)"
plugins {
    id("com.android.library")
    id("kotlin-android")
    // ...
}

android {
    // ...
    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }
    // ...
}

// ...
```

接下來，移除 `kotlin-android` 插件及 `kotlinOptions` 區塊：

```kotlin diff title="<app-src>/android/build.gradle.kts"
  plugins {
      id("com.android.library")
-     id("kotlin-android")
      // ...
  }

  android {
      // ...
-     kotlinOptions {
-         jvmTarget = JavaVersion.VERSION_17.toString()
-     }
      // ...
  }
```

加入含有下列內容的 `kotlin.compilerOptions{}` DSL 區塊：

```kotlin diff title="<app-src>/android/build.gradle.kts"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

完成後，檔案的內容大致如下：

**遷移後**：

```kotlin title="<app-src>/android/build.gradle(.kts)"
plugins {
    id("com.android.library")
    // ...
}

android {
    // ...
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

// ...
```

</Tab>
<Tab name="legacy apply">

**遷移前**：

```groovy title="<app-src>/android/build.gradle"
apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'
// ...

android {
    // ...
    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }
    // ...
}

// ...
```

接下來，移除 `kotlin-android` 插件及 `kotlinOptions` 區塊：

```groovy diff title="<app-src>/android/build.gradle"
  apply plugin: 'com.android.library'
- apply plugin: 'kotlin-android'
// ...

  android {
      // ...
-     kotlinOptions {
-         jvmTarget = JavaVersion.VERSION_17.toString()
-     }
      // ...
  }
```
加入含有下列內容的 `kotlin.compilerOptions{}` DSL 區塊：

```groovy diff title="<app-src>/android/build.gradle"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

完成後，檔案的內容大致如下：

**遷移後**：

```groovy title="<app-src>/android/build.gradle"
apply plugin: 'com.android.library'
// ...

android {
    // ...
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

// ...
```
</Tab>
</Tabs>

### 更新插件的 `pubspec.yaml`

使用 `kotlin.compilerOptions {}` DSL 區塊需要 Kotlin Gradle Plugin (KGP) 最低版本為 2.0.0。
從 Flutter 3.44 開始，所需的最低 KGP 版本為 2.0.0。
為確保使用您插件的應用程式能夠安全地遷移至內建 Kotlin，
您應在此插件版本中要求 Flutter 最低版本為 3.44。

由於您正在更新 Flutter 最低版本，
您也必須同步更新對應的 Dart 最低版本。

更新 Flutter 最低版本及 Dart 最低版本：

```yaml diff title="<plugin-project>/pubspec.yaml"
# ...

  environment:
-   sdk: ^<previous-dart-minimum>
+   sdk: ^3.12.0
-   flutter: ">=<previous-flutter-minimum>"
+   flutter: ">=3.44.0"

# ...
```

完成後，檔案的內容大致如下：

```yaml title="<plugin-project>/pubspec.yaml"
# ...

environment:
  sdk: ^3.12.0
  flutter: ">=3.44.0"

# ...
```

## 支援低於 3.44 的 Flutter 版本

若您已將插件的 Flutter SDK 最低版本更新至 3.44，請跳過本節並繼續更新插件的 `CHANGELOG.md`。

若您無法將插件的 Flutter SDK 最低版本更新至 3.44，則必須對
`<plugin-project>/android/build.gradle` 或
`<plugin-project>/android/build.gradle.kts` 進行以下修改，
以同時支援 AGP < 9 和 AGP >= 9 的應用程式：

<Tabs key="workaround-for-plugins">
<Tab name="Kotlin DSL fix">

**遷移前**：

```kotlin title="<app-src>/android/build.gradle.kts"
plugins {
    id("com.android.library")
    id("kotlin-android")
    // ...
}

android {
    // ...
    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }
    // ...
}

// ...
```

接下來，移除 `kotlin-android` 插件及 `kotlinOptions` 區塊：

```kotlin diff title="<app-src>/android/build.gradle.kts"
  plugins {
      id("com.android.library")
-     id("kotlin-android")
      // ...
  }

  android {
      // ...
-     kotlinOptions {
-         jvmTarget = JavaVersion.VERSION_17.toString()
-     }
      // ...
  }
```

加入一個條件判斷，僅在應用程式的 Android Gradle Plugin 版本低於 9 時才套用 Kotlin Gradle Plugin。

```kotlin diff title="<app-src>/android/build.gradle.kts"
+ val agpMajor = com.android.Version.ANDROID_GRADLE_PLUGIN_VERSION.substringBefore('.').toInt()
+
+ if (agpMajor < 9) {
+    apply(plugin = "org.jetbrains.kotlin.android")
+ }
```

使用 project extension 加入 `compilerOptions` 設定：

```kotlin diff title="<app-src>/android/build.gradle.kts"
+ project.extensions.configure(org.jetbrains.kotlin.gradle.dsl.KotlinAndroidProjectExtension::class.java) {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

完成後，檔案的內容大致如下：

**遷移後**：

```kotlin title="<app-src>/android/build.gradle.kts"
plugins {
    id("com.android.library")
    // ...
}

val agpMajor = com.android.Version.ANDROID_GRADLE_PLUGIN_VERSION.substringBefore('.').toInt()

if (agpMajor < 9) {
    apply(plugin = "org.jetbrains.kotlin.android")
}

android {
    // ...
}

project.extensions.configure(org.jetbrains.kotlin.gradle.dsl.KotlinAndroidProjectExtension::class.java) {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

// ...
```

</Tab>
<Tab name="Groovy DSL fix">

**遷移前**：

```groovy title="<app-src>/android/build.gradle"
apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'

android {
    // ...
    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }
    // ...
}

// ...
```

接下來，移除 `kotlin-android` 插件及 `kotlinOptions` 區塊：

```groovy diff title="<app-src>/android/build.gradle"
  apply plugin: 'com.android.library'
- apply plugin: 'kotlin-android'

  android {
      // ...
-     kotlinOptions {
-         jvmTarget = JavaVersion.VERSION_17.toString()
-     }
      // ...
  }
```

加入一個條件判斷，僅在應用程式的 Android Gradle Plugin 版本低於 9 時才套用 Kotlin Gradle Plugin。

```groovy diff title="<app-src>/android/build.gradle"
+ def agpMajor = com.android.Version.ANDROID_GRADLE_PLUGIN_VERSION.tokenize('.')[0] as int
+
+ if (agpMajor < 9) {
+    apply plugin: 'kotlin-android'
+ }
```

加入含有下列內容的 `kotlin.compilerOptions{}` DSL 區塊：

```groovy diff title="<app-src>/android/build.gradle"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

完成後，檔案的內容大致如下：

**遷移後**：

```groovy title="<app-src>/android/build.gradle"
apply plugin: 'com.android.library'

def agpMajor = com.android.Version.ANDROID_GRADLE_PLUGIN_VERSION.tokenize('.')[0] as int
if (agpMajor < 9) {
    apply plugin: 'kotlin-android'
}

android {
    // ...
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

// ...
```
</Tab>
</Tabs>

### 更新插件的 `CHANGELOG.md`

在新發布的插件版本的 CHANGELOG 中記錄您的變更：

```markdown diff title="<plugin-project>/CHANGELOG.md"
+ ## <new-plugin-release-version>

+ - Updates minimum supported SDK version to Flutter 3.44/Dart 3.12.
+ - Migrates to built-in Kotlin

// ...
```

### 驗證

執行 `flutter run` 或 `flutter build apk`，確認您的插件範例應用程式能在已連接的 Android 裝置或模擬器上成功建置並啟動。

若您的插件範例應用程式也有套用 KGP，
則您還需要遷移範例應用程式。
請依照[應用程式開發者遷移指南][app-migration-guide]來遷移您的範例應用程式。

[app-migration-guide]: {{site.flutter-docs}}/release/breaking-changes/migrate-to-built-in-kotlin/for-app-developers
[flutter-sdk-minimum-below-3.44]: {{site.flutter-docs}}/release/breaking-changes/migrate-to-built-in-kotlin/for-plugin-authors#supporting-flutter-versions-earlier-than-3-44
