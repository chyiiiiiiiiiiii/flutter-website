---
title: 在 add-to-app 中管理插件與相依套件
shortTitle: 插件設定
description: >
  學習如何在現有應用程式中使用插件，並共用插件的函式庫相依套件。
---

本指南說明如何設定您的專案以使用插件，以及如何在現有 Android 應用程式與 Flutter 模組的插件之間管理 Gradle 函式庫相依套件。

## A. 簡單情境

在簡單的情境下：

* 您的 Flutter 模組使用的插件沒有額外的 Android Gradle 相依套件，因為它僅使用 Android OS API，例如 camera 插件。
* 您的 Flutter 模組使用的插件有 Android Gradle 相依套件，例如
  [video_player 插件所用的 ExoPlayer][ExoPlayer from the video_player plugin]，
  但您的現有 Android 應用程式並未依賴 ExoPlayer。

這些情況下不需要額外步驟。您的 add-to-app 模組將與完整 Flutter 應用程式的運作方式相同。無論您是透過 Android Studio、Gradle 子專案還是 AARs 整合，所需的 Android Gradle 傳遞性函式庫都會自動打包進您的外層現有應用程式中。

## B. 需要編輯專案的插件

有些插件需要您對專案的 Android 端進行一些編輯。

例如，[firebase_crashlytics][firebase_crashlytics] 插件的整合說明要求您手動編輯 Android wrapper 專案的 `build.gradle` 檔案。

對於完整 Flutter 應用程式，這些編輯會在 Flutter 專案的 `/android/` 目錄下進行。

若是 Flutter 模組，模組專案中僅包含 Dart 檔案。請將這些 Android Gradle 檔案的編輯動作，放在外層現有的 Android 應用程式中，而不是 Flutter 模組內。

:::note
細心的讀者可能會注意到 Flutter 模組目錄中也包含 `.android` 和 `.ios` 目錄。這些目錄是由 Flutter 工具自動產生的，僅用於將 Flutter 引導至通用的 Android 或 iOS 函式庫。這些目錄不應該被編輯或納入版本控制。
這樣設計的目的是讓 Flutter 能在 Gradle、Android、Android Gradle Plugin 等有新版本或修正時，改善整合點。

進階用戶若需要更高的模組化，且必須避免將 Flutter 模組的相依資訊洩漏到外層主應用程式，可以將 Flutter 模組的 Gradle 函式庫包裝在另一個原生 Android Gradle 函式庫中，該函式庫依賴 Flutter 模組的 Gradle 函式庫。您可以在這個包裝函式庫中進行 Android 相關的變更，例如編輯 AndroidManifest.xml、Gradle 檔案或新增 Java 檔案。
:::

## C. 合併函式庫

較需要注意的情境是，當您的現有 Android 應用程式已經依賴與 Flutter 模組（透過插件傳遞性）相同的 Android 函式庫時。

舉例來說，您的現有應用程式的 Gradle 可能已經有：

```groovy title="ExistingApp/app/build.gradle"
…
dependencies {
    …
    implementation("com.crashlytics.sdk.android:crashlytics:2.10.1")
    …
}
…
```

而你的 Flutter 模組也透過 `pubspec.yaml` 相依於 [firebase_crashlytics][firebase_crashlytics]：

```yaml title="flutter_module/pubspec.yaml"
…
dependencies:
  …
  firebase_crashlytics: ^0.1.3
  …
…
```

此插件的使用會透過 firebase_crashlytics v0.1.3 自身的 [Gradle file][Gradle file]，間接再次加入一個 Gradle 相依性：

```groovy title="firebase_crashlytics_via_pub/android/build.gradle
…
dependencies {
    …
    implementation("com.crashlytics.sdk.android:crashlytics:2.9.9")
    …
}
…
```

這兩個 `com.crashlytics.sdk.android:crashlytics` 相依套件
可能不是相同的版本。在這個例子中，
主應用程式要求的是 v2.10.1，而 Flutter
模組中的 plugin 則要求 v2.9.9。

預設情況下，Gradle v5
會透過[解析相依套件版本衝突][resolves dependency version conflicts]
的機制，使用該函式庫的最新版本。

只要不同版本之間沒有 API
或實作上的重大變更，這通常是沒問題的。
例如，你可能會在現有應用程式中如下使用新版 Crashlytics 函式庫：

```groovy title="ExistingApp/app/build.gradle"
…
dependencies {
    …
    implementation("com.google.firebase:firebase-crashlytics:17.0.0-beta03")
    …
}
…
```

這種做法無法運作，因為 Crashlytics 的 Gradle 函式庫版本 v17.0.0-beta03 與 v2.9.9 之間存在重大的 API 差異。

對於遵循語意化版本控制（semantic versioning）的 Gradle 函式庫，通常只要在既有應用程式與 Flutter 模組插件中使用相同的主要語意版本（major semantic version），就能避免編譯與執行階段的錯誤。


[ExoPlayer from the video_player plugin]: {{site.repo.packages}}/blob/main/packages/video_player/video_player_android/android/build.gradle
[firebase_crashlytics]: {{site.pub}}/packages/firebase_crashlytics
[Gradle file]: {{site.github}}/firebase/flutterfire/blob/bdb95fcacf7cf077d162d2f267eee54a8b0be3bc/packages/firebase_crashlytics/android/build.gradle#L40
[resolves dependency version conflicts]: https://docs.gradle.org/current/userguide/dependency_resolution.html#sub:resolution-strategy

