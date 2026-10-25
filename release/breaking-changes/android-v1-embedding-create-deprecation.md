# Android v1 embedding 應用程式與插件建立棄用公告

> Android v1 embedding 的逐步棄用。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`flutter create` 應用程式與插件的範本
不再基於 v1 Android embedding 建立 Android 包裝，
這是我們依據
[Android 遷移摘要][Android Migration Summary]
所描述的 Android v1 embedding 逐步棄用流程的一部分。

建議使用 v1 Android embedding 的應用程式專案，
依照[升級 1.12 之前的 Android 專案][Upgrading pre 1.12 Android projects]
中所述的步驟進行遷移。

針對 v1 Android embedding 的插件也建議
依照[支援新版 Android 插件 API][Supporting the new Android plugins APIs]
中的說明進行遷移。

[Android Migration Summary]: /go/android-migration-summary
[Upgrading pre 1.12 Android projects]: https://github.com/flutter/flutter/blob/main/docs/platforms/android/Upgrading-pre-1.12-Android-projects.md
[Supporting the new Android plugins APIs]: /release/breaking-changes/plugin-api-migration

## 背景說明

在 Flutter 1.12 版本中，我們推出了一組基於 [`io.flutter.embedding`][]
套件的 v2 Android API，
以支援 Android 上的 [add-to-app][] 工作流程。

隨著時間推移，我們逐步棄用了舊有
基於 [`io.flutter.app`][] 套件的 v1 Android embedding。

截至 2020 年第二季，僅有 26% 的應用程式仍使用 v1 embedding。

自 Flutter v1.12 推出後的 7 個月內，v2 embedding 已被廣泛採用，
因此我們已停用使用 v1 embedding 建立新應用程式與插件專案的功能。

[add-to-app]: /add-to-app
[`io.flutter.embedding`]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/embedding/
[`io.flutter.app`]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/app/.

## 變更說明

`flutter config` 指令已不再提供
可切換的 `enable-android-embedding-v2`
旗標（自 v1.12 起預設為 true）。
所有以 `flutter create`
與 `flutter create -t plugin` 建立的專案皆僅使用
Android v2 embedding。

既有的 v1 應用程式仍可正常運作。

既有的 v1 應用程式若使用插件，現在會收到
建議遷移至 v2 embedding 的警告提示。

既有的 v1 應用程式若使用僅支援 v2 embedding 的插件，將無法建置，必須進行遷移。
這種情況自 v1.12 起即已存在。然而，
隨著插件開發者持續創建並發佈僅支援 v2 的插件，
遇到此情形的機率將會提高。

既有的 v2 應用程式無論是否使用插件，皆可正常運作。

既有的 v2 應用程式若使用僅支援 v1 embedding 的插件，仍會收到警告提示。
隨著插件開發者逐步創建並發佈 v2 插件，
遇到此情形的機率將會降低。

## 遷移指南

欲了解更多資訊，
請參閱[升級 1.12 之前的 Android 專案][Upgrading pre 1.12 Android projects]。

## 時程

合併進版本：1.20.0-8.0<br>
穩定版本：1.22

