---
title: Flutter 相容性政策
description: Flutter 如何處理破壞性變更的相關政策說明。
---

Flutter 團隊致力於在 API 穩定性與 API 持續演進（如修復錯誤、提升 API 易用性、以及有系統地新增功能）之間取得平衡。

為此，我們建立了一個測試註冊機制，您可以提供自己的應用程式或函式庫的單元測試，這些測試會在每次變更時執行，協助我們追蹤可能會導致現有應用程式損壞的變更。我們的承諾是：在未與這些測試的開發者合作，(a) 判斷該變更是否具有足夠價值，以及 (b) 提供修正程式碼以確保測試能繼續通過之前，不會進行任何會導致這些測試失敗的變更。

如果您希望參與此計畫並提供測試，請提交 PR 至 [flutter/tests repository][flutter/tests repository]。
該 repository 的 [README][flutter-tests-readme]
詳細說明了相關流程。

[flutter/tests repository]: {{site.github}}/flutter/tests
[flutter-tests-readme]: {{site.github}}/flutter/tests#adding-more-tests

## 公告與遷移指南

若我們確實進行了破壞性變更（定義為導致一個或多個已提交測試需要修改的變更），我們會在 [flutter-announce][flutter-announce]
郵件論壇以及發行說明中公告此變更。

我們也會提供受破壞性變更影響的[程式碼遷移指南列表][guides for migrating code]。

[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce
[guides for migrating code]: /release/breaking-changes

## 棄用政策

我們有時會選擇棄用某些 API，而非直接在短時間內移除。這與我們的相容性政策無關，後者僅依據上述提交測試是否失敗來判斷。

Flutter 團隊不會依照固定時程移除已棄用的 API。
若團隊決定移除已棄用的 API，會遵循與破壞性變更相同的程序。


## Dart 及 Flutter 所使用的其他函式庫

Dart 語言本身有[獨立的破壞性變更政策][separate breaking-change policy]，並會在 [Dart announce][Dart announce]
公告相關訊息。

一般而言，Flutter 團隊目前對於其他相依套件的破壞性變更尚無特別承諾。
例如，某個新版 Flutter 若採用新版 Skia
（Flutter 某些平台所用的圖形引擎）
或 Harfbuzz（Flutter 所用的字型排版引擎），
可能會帶來影響已提交測試的變更。
這類變更未必會附帶遷移指南。

[separate breaking-change policy]: {{site.github}}/dart-lang/sdk/blob/main/docs/process/breaking-changes.md
[Dart announce]: {{site.groups}}/a/dartlang.org/g/announce
