---
title: 插件作者的內建 Kotlin 遷移指南
description: >-
  將 Flutter 插件遷移至使用內建 Kotlin。
---

本指南專門針對插件作者說明遷移步驟。

:::warning
遷移至內建 Kotlin 需要 Flutter 最低版本為 3.44。

此遷移使用 `kotlin.compilerOptions {}`，
這需要 Kotlin Gradle Plugin (KGP) 2.0.0 或更高版本。
自 Flutter 3.44 起，Flutter 強制要求 KGP 最低版本為 2.0.0。
插件作者在遷移時，必須在 `pubspec.yaml` 中
將插件的 Flutter 最低版本更新至至少 3.44。

本指南僅適用於已經使用 Kotlin Gradle Plugin (KGP) 的插件。

若要確認您的插件是否套用了 KGP，
請找到 `kotlin-android` 插件
（或 `org.jetbrains.kotlin.android` 插件）。
它通常位於
`<plugin-project>/android/build.gradle` 或
`<plugin-project>/android/build.gradle.kts` 檔案中。
若要查看 KGP 的套用程式碼，
請參閱[更新 Gradle 檔案](#update-the-gradle-file)。

若您的插件專案目前並未套用 KGP，
請勿遷移至內建 Kotlin。
:::

:::note
若要將 Flutter 應用程式更新為使用內建 Kotlin，
請依照[應用程式開發者遷移指南][migration guide for app developers]操作。
:::

[migration guide for app developers]: /release/breaking-changes/migrate-to-built-in-kotlin/for-app-developers

## 更新 Gradle 檔案

首先，找到 `kotlin-android` 插件
（或 `org.jetbrains.kotlin.android` 插件）。
它通常位於 `<plugin-project>/android/build.gradle` 或 `<plugin-project>/android/build.gradle.kts` 檔案的 `plugins` 區塊中。
若您使用舊式 `apply` 語法，
它會位於基於 Groovy 的 `<plugin-project>/android/build.gradle` 檔案中，
因為 Kotlin DSL 不支援此語法。

以下範例示範如何遷移 Flutter 插件：

<Tabs key="modern-legacy-apply">
<Tab name="Plugins block">

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
<Tab name="Legacy apply">

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

## 更新插件的 `pubspec.yaml`

使用 `kotlin.compilerOptions {}` DSL 區塊需要 Kotlin Gradle Plugin (KGP) 最低版本為 2.0.0。
從 Flutter 3.44 開始，所需的最低 KGP 版本為 2.0.0。
為確保使用您插件的應用程式能夠在 AGP 9 上建置，
請在插件版本中要求 Flutter 最低版本為 3.44。
這讓使用您插件的應用程式可以在停用內建 Kotlin（`android.builtInKotlin=false`）的情況下，
於 AGP 9 上建置。

:::note
在插件的範例應用程式中啟用內建 Kotlin（`android.builtInKotlin=true`）
需要 Flutter 3.47 或更新版本。
:::

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

<a id="update-the-plugins-changelog-md" aria-hidden="true"></a>

## 更新插件的 changelog

在新發布的插件版本的 `CHANGELOG.md` 檔案中記錄您的變更：

```markdown diff title="<plugin-project>/CHANGELOG.md"
+ ## <new-plugin-release-version>

+ - Updates the minimum supported SDK version to Flutter 3.44/Dart 3.12.
+ - Migrates to built-in Kotlin.

// ...
```

## 驗證

在啟用內建 Kotlin 之前，
請確認您已遷移插件範例應用程式
及其使用的所有 Flutter 插件。
同時也請確認您已將插件範例應用程式
更新至 AGP 9 以上，因為內建 Kotlin 需要 AGP 9 以上。

若要啟用內建 Kotlin，
請在 `gradle.properties` 檔案中
將 `android.builtInKotlin` 屬性設為 `true`：

```properties diff title="<flutter-project>/android/gradle.properties"
# ...
+ android.builtInKotlin=true
```

:::version-note
Flutter 3.44 新增了對停用內建 Kotlin（`android.builtInKotlin=false`）的 AGP 9 支援，
而啟用內建 Kotlin（`android.builtInKotlin=true`）
則需要 Flutter 3.47 或更新版本。
:::

啟用內建 Kotlin 後，
請執行 `flutter run` 或 `flutter build apk`，
確認您的插件範例應用程式能在已連接的 Android 裝置或模擬器上成功建置並啟動。

若您的插件範例應用程式也有套用 KGP，
則您還需要遷移範例應用程式。
若要遷移您的範例應用程式，
請依照[應用程式開發者遷移指南][app-migration-guide]操作。

[app-migration-guide]: /release/breaking-changes/migrate-to-built-in-kotlin/for-app-developers
