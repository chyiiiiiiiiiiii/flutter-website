---
title: 整合測試概念
description: 了解 Flutter 中的整合測試。
shortTitle: 介紹
---

<?code-excerpt path-base="cookbook/testing/integration/introduction/"?>

單元測試（Unit tests）與元件測試（Widget tests）用於驗證個別的類別、函式或元件（Widgets）。
但它們無法驗證各個部分在整個應用程式中如何協同運作，也無法評估應用程式在真實裝置上運行時的效能。
若要執行這些任務，請使用*整合測試（integration tests）*。

整合測試（integration tests）用於驗證完整應用程式的行為。
這類測試也稱為端對端測試（end-to-end testing）或 GUI 測試（GUI testing）。

Flutter SDK（Flutter 軟體開發套件）內建 [integration_test][integration_test] 套件。

## 術語說明

**host machine（主機）**
: 你開發應用程式所使用的系統，例如桌上型電腦。

**target device（目標裝置）**
: 執行你的 Flutter 應用程式的行動裝置、瀏覽器或桌面應用程式。

  如果你在網頁瀏覽器或桌面應用程式中執行應用程式，主機（host machine）與目標裝置（target device）即為同一台設備。

## 相依套件

若要執行整合測試，請將 `integration_test` 套件
新增為 Flutter 應用程式測試檔案的相依套件。

若需將現有使用 `flutter_driver` 的專案進行遷移，
請參考 [Migrating from flutter_driver][Migrating from flutter_driver] 指南。

使用 `integration_test` 套件撰寫的測試
可以執行以下任務：

* 在目標裝置（target device）上執行。
  若要測試多台 Android 或 iOS 裝置，請使用 Firebase Test Lab。
* 透過主機（host machine）使用 `flutter test integration_test` 執行。
* 使用 `flutter_test` API。這讓整合測試的寫法
  與 [元件測試（widget tests）][widget tests] 類似。

## 整合測試的使用情境

本節的其他指南將說明如何利用整合測試來驗證
[功能][functionality]與[效能][performance]。

[functionality]: /testing/integration-tests/
[performance]: /cookbook/testing/integration/profiling/
[integration_test]: {{site.repo.flutter}}/tree/main/packages/integration_test
[Migrating from flutter_driver]:
    /release/breaking-changes/flutter-driver-migration
[widget tests]: /testing/overview#widget-tests
