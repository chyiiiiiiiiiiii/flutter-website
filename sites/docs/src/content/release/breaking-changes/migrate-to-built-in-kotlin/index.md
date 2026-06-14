---
title: 將 Flutter Android 專案遷移至內建 Kotlin
description: >-
  更新您的 Flutter Android Gradle 檔案以使用內建 Kotlin 支援。
  這是將專案遷移至 Android Gradle Plugin 9 或更新版本的必要步驟。
---

{% render "docs/breaking-changes.md" %}

## 摘要

若要為 Android 建置 Flutter 應用程式，
必須使用 Android Gradle Plugin（AGP）。
若要使用 AGP 9 及更新版本，需要進行下列遷移作業。

首先，AGP 9 及更新版本預設使用內建 Kotlin。
使用 `kotlin-android` 插件（即 Kotlin Gradle Plugin，KGP）的
應用程式將會建置失敗（[Issue #181383][]）。
不過，Flutter 團隊已在 AGP 9 及更新版本中加入對舊版
Kotlin Gradle Plugin 的暫時性支援（[Issue #183909][]）。
這讓應用程式與插件開發者無論遷移進度如何，都能安全地建置專案。

其次，AGP 9 及更新版本僅使用新的 AGP DSL 介面。
這意味著所有舊的 DSL 型別將無法被識別。
Flutter 團隊正在將舊的 DSL 型別遷移至新的 DSL：[Issue #180137][]。
在此期間，Flutter 團隊已將 AGP DSL 設定為與舊版 DSL 型別相容（[Issue #184838][]）。
這確保應用程式與插件開發者能安全地升級至 AGP 9 及更新版本。

為確保相容性，
請手動將所有應用程式與插件
從舊版 KGP 遷移至內建 Kotlin。
Flutter 計劃在未來版本中移除套用 KGP 的支援（[Issue #184837][]）。

若要深入瞭解 Android Gradle Plugin，
請參閱 [Android Gradle Plugin 文件][AGP block]。

[AGP block]: {{site.android-dev}}/build/releases/gradle-plugin

## 遷移

**應用程式開發者：**
請遵循[應用程式開發者遷移指南][app-migration-guide]。

**插件作者：**
請遵循[插件作者遷移指南][plugin-migration-guide]。

[app-migration-guide]: /release/breaking-changes/migrate-to-built-in-kotlin/for-app-developers
[plugin-migration-guide]: /release/breaking-changes/migrate-to-built-in-kotlin/for-plugin-authors

## 後續步驟

- **移除對 KGP 的支援：**
  在 Flutter 的未來版本中，
  套用 KGP 的支援將被移除（[Issue #184837][]）。
  請遷移應用程式、插件與宿主應用程式，以保持正常建置。

- **移除 DSL Gradle 屬性：**
  一旦 Flutter 團隊完成至新 AGP DSL 的遷移，
  將會移除對舊版 DSL 的支援（[Issue #184839][]）。

## 時間表

首次登陸版本：3.44.0-0.1.pre<br>
穩定版發佈：3.44

## 參考資料

相關 Issue：

- [Issue #180137][]：從舊版遷移至新版 AGP DSL
- [Issue #181383][]：Flutter 插件應支援 AGP 9.0.0
- [Issue #183909][]：在 AGP+ 中加入對 KGP 的支援
- [Issue #184837][]：移除對 KGP 的支援
- [Issue #184838][]：預設停用新的 AGP DSL 旗標
- [Issue #184839][]：移除對舊版 AGP DSL 型別的支援

您應用程式中的 Gradle 建置檔案會因建立應用程式時所使用的
Flutter 版本而有所不同。
建議定期在應用程式目錄中執行 `flutter upgrade`，
以保持建置檔案與最新版本同步。

[Issue #180137]: {{site.repo.flutter}}/issues/180137
[Issue #181383]: {{site.repo.flutter}}/issues/181383
[Issue #183909]: {{site.repo.flutter}}/issues/183909
[Issue #184837]: {{site.repo.flutter}}/issues/184837
[Issue #184838]: {{site.repo.flutter}}/issues/184838
[Issue #184839]: {{site.repo.flutter}}/issues/184839
