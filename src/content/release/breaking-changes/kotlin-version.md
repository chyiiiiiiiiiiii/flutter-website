---
title: 必要的 Kotlin 版本
description: >
    為 Android 平台建置的 Flutter 應用程式
    現在需要 Kotlin 1.5.31 或更高版本。
---

{% render docs/breaking-changes.md %}

:::important
自 Flutter 3.16 起，預設的 Gradle 建置腳本在不同 Flutter 版本間有所不同。例如，Kotlin 版本現在是在 `android/settings.gradle` 檔案中設定。
如果你的專案是使用較舊版本的 Flutter 產生，建議你將建置腳本升級至最新格式。更多資訊請參閱 [Issue 10380][Issue 10380] 及 [Issue 135392]。
:::

[Issue 10380]:  {{site.github}}/flutter/website/issues/10380
[Issue 135392]: {{site.github}}/flutter/flutter/issues/135392

## 摘要

要為 Android 建置 Flutter 應用程式，必須使用 Kotlin 1.5.31 或更高版本。

如果你的應用程式使用較低版本，
你將會收到以下錯誤訊息：

```plaintext noHighlight
┌─ Flutter Fix ────────────────────────────────────────────────────────────┐
│                                                                          │
│ [!] Your project requires a newer version of the Kotlin Gradle plugin.   │
│ Find the latest version on                                               │
│ https://kotlinlang.org/docs/gradle.html#plugin-and-versions, then update │
│ <path-to-app>/android/build.gradle:                                      │
│ ext.kotlin_version = '<latest-version>'                                  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

## 背景說明

Flutter 已在 Android 上新增對 [可摺疊裝置][1] 的支援。
這項更新需要在 Flutter embedding 中加入 AndroidX 相依性，
並要求應用程式必須使用 Kotlin 1.5.31 或更高版本。

## 變更說明

現在，為 Android 編譯的 Flutter 應用程式會自動包含 Gradle 相依性
`androidx.window:window-java`。

## 遷移指南

請開啟 `<app-src>/android/build.gradle`，並修改 `ext.kotlin_version`：

```groovy diff
  buildscript {
-     ext.kotlin_version = '1.3.50'
+     ext.kotlin_version = '1.5.31'
```

## 時程

導入版本：v2.9.0 beta<br>  
正式版本：2.10

## 參考資料

相關 PR：

* [PR 29585: Display Features support][PR 29585: Display Features support]


[PR 29585: Display Features support]: {{site.repo.engine}}/pull/29585

[1]: {{site.android-dev}}/guide/topics/large-screens/learn-about-foldables
