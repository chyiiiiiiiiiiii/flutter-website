---
title: 在 add-to-app 中管理插件與相依套件
shortTitle: 插件設定
description: >
  學習如何在現有應用程式中使用插件，並共用你的
  插件函式庫相依套件。
---

本指南說明如何設定你的專案以使用
插件，以及如何在現有 Android 應用程式與 Flutter 模組的插件之間
管理 Gradle 函式庫相依套件。

## A. 簡單情境

在簡單的情境下：

* 你的 Flutter 模組使用的插件沒有額外的
  Android Gradle 相依套件，因為它僅使用 Android OS
  API，例如 camera 插件。
* 你的 Flutter 模組使用的插件有 Android
  Gradle 相依套件，例如
  [video_player 插件中的 ExoPlayer][ExoPlayer from the video_player plugin]，
  但你的現有 Android 應用程式並未依賴 ExoPlayer。

這些情況下不需要額外步驟。你的 add-to-app
模組會像完整 Flutter 應用程式一樣運作。
無論你是透過 Android Studio、
Gradle 子專案還是 AARs 整合，
Android Gradle 的傳遞性函式庫都會自動
根據需要打包進你的外部現有應用程式中。

## B. 需要編輯專案的插件

有些插件需要你對
專案的 Android 端進行一些編輯。

例如，[firebase_crashlytics][firebase_crashlytics] 插件的整合說明
需要你手動編輯 Android wrapper 專案的 `build.gradle` 檔案。

對於完整 Flutter 應用程式，這些編輯會在
Flutter 專案的 `/android/` 目錄中完成。

若是 Flutter 模組，模組專案中只有 Dart
檔案。請將這些 Android Gradle 檔案的編輯動作
放在你的外部現有 Android
應用程式中，而不是 Flutter 模組裡。

:::note
細心的讀者可能會注意到 Flutter 模組
目錄中也包含 `.android` 和
`.ios` 目錄。這些目錄是 Flutter 工具自動產生的，
僅用於將 Flutter 引導進通用的
Android 或 iOS 函式庫。這些目錄不應該被編輯或納入版本控制。
這樣設計是為了讓 Flutter 能在
Gradle、Android、Android Gradle Plugin 等有新版本或修正時，
改善整合點。

進階使用者若需要更高的模組化，且必須
避免將 Flutter 模組的相依套件資訊洩漏到
外部主應用程式，可以將 Flutter 模組的 Gradle 函式庫
重新包裝在另一個原生 Android Gradle
函式庫中，該函式庫依賴 Flutter 模組的 Gradle 函式庫。
你可以在這個 wrapper 函式庫中進行 Android 相關的修改，
例如編輯 AndroidManifest.xml、Gradle 檔案或加入更多 Java 檔案。
:::

## C. 合併函式庫

需要稍加注意的情境是，
如果你的現有 Android 應用程式已經依賴
與 Flutter 模組（透過插件傳遞性）相同的 Android 函式庫。

舉例來說，你現有應用程式的 Gradle 可能已經有：

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

這個套件的使用會透過 firebase_crashlytics v0.1.3 自身的 [Gradle 檔案][Gradle file]，間接再次加入一個 Gradle 相依套件：

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
可能不是相同的版本。在這個範例中，
主應用程式要求的是 v2.10.1，而 Flutter
模組的 plugin 則要求 v2.9.9。

預設情況下，Gradle v5
會透過[解析相依套件版本衝突][resolves dependency version conflicts]
的方式，選擇使用該函式庫的最新版本。

只要這些版本之間沒有 API
或實作上的破壞性變更，這通常是沒問題的。
例如，你可能會在現有的應用程式中如下使用新版 Crashlytics 函式庫：

```groovy title="ExistingApp/app/build.gradle"
…
dependencies {
    …
    implementation("com.google.firebase:firebase-crashlytics:17.0.0-beta03")
    …
}
…
```

這種做法無法運作，因為 Crashlytics 的 Gradle 函式庫（Gradle library）版本 v17.0.0-beta03 與 v2.9.9 之間存在重大 API 差異。

對於遵循語意化版本控制（semantic versioning）的 Gradle 函式庫，通常只要在既有應用程式與 Flutter 模組外掛中使用相同的主要語意版本（major semantic version），即可避免編譯與執行階段錯誤。


[ExoPlayer from the video_player plugin]: {{site.repo.packages}}/blob/main/packages/video_player/video_player_android/android/build.gradle
[firebase_crashlytics]: {{site.pub}}/packages/firebase_crashlytics
[Gradle file]: {{site.github}}/firebase/flutterfire/blob/bdb95fcacf7cf077d162d2f267eee54a8b0be3bc/packages/firebase_crashlytics/android/build.gradle#L40
[resolves dependency version conflicts]: https://docs.gradle.org/current/userguide/dependency_resolution.html#sub:resolution-strategy

