# 應用程式開發者的內建 Kotlin 遷移指南

> 將 Flutter 應用程式遷移至使用內建 Kotlin。



本指南專門針對應用程式開發者，說明遷移步驟。

以下說明假設您正從 AGP 9.0.0 以前的版本更新至 AGP 9.0.0+。
您也應使用 [Android Gradle Plugin 文件][AGP block] 中列出的最低相容相依性版本。

:::warning
本指南僅適用於已使用 Kotlin Gradle Plugin (KGP) 的應用程式。

若要確認您的應用程式是否套用了 KGP，
請找到 `kotlin-android` 插件
（或 `org.jetbrains.kotlin.android` 插件）。
它通常位於 `<app-src>/android/app/build.gradle` 或
`<app-src>/android/app/build.gradle.kts` 檔案中。
若要查看 KGP 的套用程式碼，
請參閱[更新 Gradle 檔案](#update-the-gradle-file)。

若您的應用程式目前並未套用 KGP，
請勿遷移至內建 Kotlin。
:::

:::note
若要將 Flutter 插件更新為使用內建 Kotlin，
請依照[插件作者遷移指南][migration guide for plugin authors]操作。
:::

[AGP block]: https://developer.android.com/build/releases/gradle-plugin
[migration guide for plugin authors]: /release/breaking-changes/migrate-to-built-in-kotlin/for-plugin-authors

<a id="verify-flags-in-properties-file" aria-hidden="true"></a>

## 確認 Gradle properties 檔案中的旗標

Flutter 預設使用舊版 Kotlin Gradle Plugin (KGP) 以及舊版 AGP DSL 型別，
以支援尚未完成遷移的專案。
Flutter 遷移工具會自動將 `android.builtInKotlin=false`
及 `android.newDsl=false` 加入您的 `gradle.properties` 檔案。

若這些旗標在您的 `gradle.properties` 檔案中遺失，
Flutter 工具會在您下次使用 `flutter run` 或 `flutter build apk`
建置或執行應用程式時自動加入。

此外，使用 Android Studio 工具建置專案也會自動加入這些旗標。
程序完成後，請確認旗標已被加入。
詳細資訊請參閱 Flutter [issue #183910][issue-183910]。

所有 add-to-app 專案必須手動將
`android.builtInKotlin=false` 及 `android.newDsl=false`
加入 Android 主應用程式的 `gradle.properties` 檔案。
Flutter 遷移工具在 add-to-app Android 主應用程式建置時無法執行，
因為主應用程式是純原生 Android 專案。

```properties diff title="<host-app-project>/gradle.properties"
# ...
+ android.newDsl=false
+ android.builtInKotlin=false
```

:::note
若您的應用程式未套用 `kotlin-android` 插件（也稱為 Kotlin Gradle Plugin），
則只需加入 `android.newDsl=false`，無需進行任何進一步的遷移步驟。
:::

## 更新 Gradle 檔案

首先，找到 `kotlin-android` 插件（或 `org.jetbrains.kotlin.android` 插件）。
它通常位於 `<app-src>/android/app/build.gradle` 或
`<app-src>/android/app/build.gradle.kts` 檔案的 `plugins` 區塊中。
若您使用舊版 `apply` 語法，它會位於以 Groovy 為基礎的
`<app-src>/android/app/build.gradle` 檔案中，
因為 Kotlin DSL 不支援此語法。

以下範例示範如何遷移 Flutter Android 應用程式
及 add-to-app Android 主應用程式：

### 遷移您的 Flutter Android 應用程式

<Tabs key="modern-legacy-apply">
<Tab name="plugins block">

**遷移前**：

```kotlin title="<app-src>/android/app/build.gradle(.kts)"
plugins {
    id("com.android.application")
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

接著，移除 `kotlin-android` 插件及 `kotlinOptions` 區塊：

```kotlin diff title="<app-src>/android/app/build.gradle.kts"
  plugins {
      id("com.android.application")
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

加入含有以下內容的 `kotlin.compilerOptions{}` DSL 區塊：

```kotlin diff title="<app-src>/android/app/build.gradle.kts"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

以下是檔案最終的大致樣貌：

**遷移後**：

```kotlin title="<app-src>/android/app/build.gradle(.kts)"
plugins {
    id("com.android.application")
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

```groovy title="<app-src>/android/app/build.gradle"
apply plugin: 'com.android.application'
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

接著，移除 `kotlin-android` 插件及 `kotlinOptions` 區塊：

```groovy diff title="<app-src>/android/app/build.gradle"
  apply plugin: 'com.android.application'
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

加入含有以下內容的 `kotlin.compilerOptions{}` DSL 區塊：

```groovy diff title="<app-src>/android/app/build.gradle"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

以下是檔案最終的大致樣貌：

**遷移後**：

```groovy title="<app-src>/android/app/build.gradle"
apply plugin: 'com.android.application'
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

### 遷移您的 add-to-app Android 主應用程式

Android 原生應用程式使用 `alias` 關鍵字套用插件，
這與舊版 `apply()` 語法不相容。
因此，此處僅提供 `plugins {}` 區塊的說明。

**遷移前**：

```kotlin title="<app-src>/android/app/build.gradle(.kts)"
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
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

接著，移除 `kotlin-android` 插件及 `kotlinOptions` 區塊：

```kotlin diff title="<app-src>/android/app/build.gradle.kts"
  plugins {
      alias(libs.plugins.android.application)
-     alias(libs.plugins.kotlin.android)
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

加入含有以下內容的 `kotlin.compilerOptions{}` DSL 區塊：

```kotlin diff title="<app-src>/android/app/build.gradle.kts"
+ kotlin {
+     compilerOptions {
+         jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
+     }
+ }
```

以下是檔案最終的大致樣貌：

**遷移後**：

```kotlin title="<app-src>/android/app/build.gradle(.kts)"
plugins {
    alias(libs.plugins.android.application)
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

## 驗證

在啟用內建 Kotlin 之前，
請確認您已遷移自己的應用程式
以及其所使用的所有 Flutter 插件。
此外，也請確認您已將應用程式更新至 AGP 9+，
因為內建 Kotlin 需要 AGP 9+。

若要啟用內建 Kotlin，
請在 `gradle.properties` 檔案中
將 `android.builtInKotlin` 屬性設為 `true`：

```properties diff title="<flutter-project>/android/gradle.properties"
# ...
+ android.builtInKotlin=true
```

:::version-note
Flutter 3.44 新增了在停用內建 Kotlin
（`android.builtInKotlin=false`）的情況下支援 AGP 9，
而啟用內建 Kotlin（`android.builtInKotlin=true`）
則需要 Flutter 3.47 或更新版本。
:::

啟用內建 Kotlin 後，
執行 `flutter run` 或 `flutter build apk`，
確認您的應用程式能在已連接的 Android 裝置或模擬器上
成功建置並啟動。

若您的應用程式因使用尚未遷移的 Flutter 插件而建置失敗，
請依照以下步驟操作：

## 向插件作者回報不相容的 Kotlin Gradle Plugin 使用情況

僅在您的應用程式使用尚未遷移至內建 Kotlin 的 Flutter 插件時，
才需依照以下步驟操作。

1.  在 [pub.dev](https://pub.dev) 或線上搜尋插件名稱，
    找到該未遷移 Flutter 插件的儲存庫。
1.  查看插件的變更記錄 (changelog)，
    確認目前沒有任何版本已遷移至內建 Kotlin。
1.  向插件作者回報問題，
    告知他們 Kotlin Gradle Plugin 不相容，
    且未來的 Flutter 版本將不再支援。

您可以使用以下範本提交問題：

**問題標題：** Migrate plugin to built-in Kotlin

**問題內文：**

```markdown
I am using `<plugin-name>` in my Flutter app.

Starting with Android Gradle Plugin (AGP) 9.0,
support for applying the Kotlin Gradle Plugin (KGP) has been removed.
Because this plugin applies KGP,
it causes a compilation error that prevents my app from building.
Flutter [issue #181383](https://github.com/flutter/flutter/issues/181383)
includes an example of the error.

Flutter has temporarily added support to allow KGP
while apps and plugins migrate to AGP 9.0 or later,
but this support will be removed in a future version of Flutter.

Please migrate this plugin to use built-in Kotlin to
ensure your plugin users can successfully
build their apps in future versions of Flutter.

Here is the Flutter
[migration guide for plugin authors](https://docs.flutter.dev/release/breaking-changes/migrate-to-built-in-kotlin/for-plugin-authors).
```

回報問題時，請尊重並留意
插件儲存庫的規則與行為準則，
並與插件作者保持良好互動。

可參考 [Flutter 行為準則][Code of Conduct]。

[Code of Conduct]: https://github.com/flutter/flutter/blob/main/CODE_OF_CONDUCT.md

## 後續步驟

後續步驟請參閱
[內建 Kotlin 遷移概覽][migration-overview]。

[migration-overview]: /release/breaking-changes/migrate-to-built-in-kotlin

## 參考資料

相關 Issue：

- [Issue #183910][issue-183910]：Add Disable Built-in Kotlin and new DSL Migrators
- [Issue #181383][issue-181383]：Flutter plugins should support AGP 9.0.0

您應用程式中的 Gradle 建置檔案會依據
建立應用程式時所使用的 Flutter 版本而有所不同。
建議定期在應用程式根目錄中執行 `flutter upgrade`，
以跟上最新版本的建置檔案。

[issue-183910]: https://github.com/flutter/flutter/issues/183910
[issue-181383]: https://github.com/flutter/flutter/issues/181383

