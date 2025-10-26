---
title: Android v1 embedding 應用程式與插件建立棄用公告
description: Android v1 embedding 的逐步棄用。
---

{% render docs/breaking-changes.md %}

## 摘要

`flutter create` 應用程式與插件的範本
不再基於 v1 Android embedding 建立 Android 包裝，
這是我們逐步棄用 Android v1 embedding 的一部分，詳情請參閱
[Android Migration Summary][Android Migration Summary]。

建議仍使用 v1 Android embedding 的應用程式專案，
依照[升級 pre 1.12 Android 專案][Upgrading pre 1.12 Android projects]中的步驟進行遷移。

針對 v1 Android embedding 的插件，也建議依照
[支援新的 Android 插件 API][Supporting the new Android plugins APIs]中的說明進行遷移。

[Android Migration Summary]: /go/android-migration-summary
[Upgrading pre 1.12 Android projects]: {{site.repo.flutter}}/blob/main/docs/platforms/android/Upgrading-pre-1.12-Android-projects.md
[Supporting the new Android plugins APIs]: /release/breaking-changes/plugin-api-migration

## 背景說明

在 Flutter 1.12 版本中，我們推出了一套基於 [`io.flutter.embedding`][`io.flutter.embedding`]
套件的 v2 Android API，以支援 Android 上的 [add-to-app][add-to-app] 工作流程。

隨著時間推移，我們逐步棄用了舊有
基於 [`io.flutter.app`][`io.flutter.app`] 套件的 v1 Android embedding。

截至 2020 年第二季，僅有 26% 的應用程式仍使用 v1 embedding。

自 Flutter v1.12 發布後的 7 個月內，v2 embedding 已被廣泛採用，
因此我們停用了基於 v1 embedding 建立新應用程式與插件專案的功能。

[add-to-app]: /add-to-app
[`io.flutter.embedding`]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/embedding/
[`io.flutter.app`]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/app/.

## 變更說明

`flutter config` 指令不再提供
可切換的 `enable-android-embedding-v2`
旗標（自 v1.12 起預設為 true）。
所有使用 `flutter create`
與 `flutter create -t plugin` 建立的專案，皆僅支援
Android v2 embedding。

既有的 v1 應用程式仍可正常運作。

既有 v1 應用程式若使用插件，現在會收到
提示警告，建議遷移至 v2 embedding。

既有 v1 應用程式若使用僅支援 v2 embedding 的插件，將無法建置，必須進行遷移。
這一點自 v1.12 起即為如此。然而，
隨著越來越多插件開發者僅開發與發佈 v2 版本插件，
遇到此情況的機率將會提高。

既有 v2 應用程式，不論是否使用插件，皆可正常運作。

既有 v2 應用程式若使用僅支援 v1 embedding 的插件，仍會收到警告提示。
隨著插件開發者持續開發與發佈 v2 插件，
遇到此情況的機率將會降低。

## 遷移指南

欲瞭解更多資訊，
請參閱[升級 pre 1.12 Android 專案][Upgrading pre 1.12 Android projects]。

## 時程

合併於版本：1.20.0-8.0<br>
穩定版釋出：1.22
