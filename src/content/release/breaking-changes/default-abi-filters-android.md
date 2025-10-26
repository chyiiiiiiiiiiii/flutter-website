---
title: Flutter 現在於 Android 建置中自動設定預設的 `abiFilters`
description: >-
  Flutter Gradle Plugin 現在會自動為 Android 建置設定 abiFilters，
  這可能會影響自訂 abiFilters 的設定。
---

{% render docs/breaking-changes.md %}

## 摘要

自 Flutter 3.35 起，Flutter Gradle Plugin 會自動為 Android 建置設定
[`abiFilters`][`abiFilters`]，以避免在發佈 APK 時包含不支援的架構。
此變更可能會影響你在應用程式的 `build.gradle` 檔案中自訂的
`abiFilters` 設定。

## 背景

這項變更是為了解決第三方相依套件帶有 x86 原生函式庫時，
Google Play 會錯誤地判斷 Flutter 應用程式支援 x86 裝置的問題。
當使用 x86 裝置的用戶安裝這些應用程式時，會因 Flutter 的原生函式庫
並未支援 x86 而導致執行時當機。

Flutter Gradle Plugin 現在會自動設定 `abiFilters`，
只包含 Flutter 支援的架構。這可防止 Google Play
將應用程式提供給不相容的裝置。

## 變更說明

Flutter Gradle Plugin 現在會在非 debuggable 建置時，
且預設未啟用 `--splits-per-abi` 選項時，以程式方式設定 `abiFilters` 為：
- `armeabi-v7a`
- `arm64-v8a`
- `x86_64`

由於這項自動設定會在處理你的 `build.gradle` 檔案之前執行，
因此可能會影響依賴於該設定為空的自訂 `abiFilters` 設定。

## 遷移指南

如果你的應用程式沒有自訂 `abiFilters`，則無需進行任何變更。

如果你的應用程式需要自訂包含哪些架構，有以下幾種選擇：

### 選項 1：使用 splits-per-abi 旗標

如果你想要控制架構的納入，請使用 Flutter 內建的
`--splits-per-abi` 選項，而非手動設定 `abiFilters`：

```console
flutter build apk --splits-per-abi
```

這會為每個架構建立獨立的 APK，並自動停用自動的 `abiFilters` 設定。

### 選項 2：清除並重新設定 abiFilters

如果你必須使用單一 APK 並自訂架構過濾器，請先清除自動設定的過濾器，然後在你的 `build.gradle` 中自行設定。例如：

```kotlin
android {
    buildTypes {
        release {
            // Clear the automatically set filters.
            ndk.abiFilters.clear()
            // Set your custom filters.
            ndk.abiFilters.addAll(listOf("arm64-v8a"))
        }
    }
}
```

## 時程

已納入版本：3.35.0<br>  
穩定版發佈：3.35

相關議題：
* [Issue #174004]({{site.repo.flutter}}/issues/174004)
* [Issue #153476]({{site.repo.flutter}}/issues/153476)

相關 PR：
* [PR #168293]({{site.repo.flutter}}/pull/168293)

[`abiFilters`]: https://developer.android.com/reference/tools/gradle-api/8.7/com/android/build/api/dsl/Ndk#abiFilters()
