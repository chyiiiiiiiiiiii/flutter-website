---
title: 停止支援 Android KitKat
description: >-
  Flutter 將最低支援的 Android 版本從 KitKat（API 19）提升至 Lollipop（API 21）。
---

{% render docs/breaking-changes.md %}

## 摘要

Flutter 現在最低支援的 Android 版本為 Lollipop（API 21）。
自 Flutter 3.22 穩定版起，
Flutter 將不再支援運行於 Android KitKat（API 19）裝置。

## 背景說明

有關此次棄用的背景、目的與說明，請參閱
[go/rfc-android-k-deprecation][go/rfc-android-k-deprecation] 設計文件。

## 移轉指南

針對 Android 開發的 Flutter 開發者，需將
`minSdkVersion` 在 `build.gradle` 與 `AndroidManifest.xml` 檔案中
從 `19` 提升至至少 `21`。

## 時程

於穩定版發佈：3.22

[go/rfc-android-k-deprecation]: {{site.main-url}}/go/rfc-android-k-deprecation
