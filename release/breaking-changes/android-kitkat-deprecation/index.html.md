# 停止支援 Android KitKat

> Flutter 將最低支援的 Android 版本從 KitKat（API 19）提升至 Lollipop（API 21）。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

Flutter 現在最低支援的 Android 版本為 Lollipop（API 21）。
從 Flutter 3.22 穩定版開始，
Flutter 將不再支援運行於 Android KitKat（API 19）的裝置。

## 背景

此棄用的背景、目的與說明可參考
[go/rfc-android-k-deprecation][] 設計文件。

## 移轉指南

針對 Android 開發的 Flutter 開發者，需將
`build.gradle` 與 `AndroidManifest.xml` 檔案中的
`minSdkVersion` 從 `19` 提升至至少 `21`。

## 時程

於穩定版發佈：3.22

[go/rfc-android-k-deprecation]: https://flutter.dev/go/rfc-android-k-deprecation

