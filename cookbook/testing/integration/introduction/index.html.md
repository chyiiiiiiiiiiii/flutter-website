# 整合測試概念

> 了解 Flutter 中的整合測試。



<?code-excerpt path-base="cookbook/testing/integration/introduction/"?>

單元測試（Unit tests）與元件測試（Widget tests）用於驗證個別的類別、函式或元件（Widgets）。
但它們無法驗證各個部分在整個應用程式中如何協同運作，也無法評估應用程式在真實裝置上運行時的效能。
若要執行這些任務，請使用*整合測試（integration tests）*。

整合測試（integration tests）用於驗證完整應用程式的行為。
這類測試也稱為端對端測試（end-to-end testing）或 GUI 測試（GUI testing）。

## 測試框架

執行 Flutter 整合測試通常會使用以下兩個套件：

- [integration_test][integration_test] 套件：Flutter SDK 內建的官方整合測試套件。
  使用 `integration_test` 撰寫的測試可以執行下列任務：在目標裝置（target device）上執行、
  從主機（host machine）使用 `flutter test integration_test` 執行，
  以及使用 `flutter_test` API。這讓整合測試的寫法與[元件測試（widget tests）][widget tests]類似。
  但 `integration_test` 無法與原生平台 UI 互動。

- [patrol][] 套件：一個廣受歡迎的第三方整合測試套件，
  支援 `integration_test` 套件的多數功能，
  但還能額外與原生平台 UI 互動，例如權限對話框、通知或平台視圖的內容。

## 術語說明

**host machine（主機）**
: 你開發應用程式所使用的系統，例如桌上型電腦。

**target device（目標裝置）**
: 執行你的 Flutter 應用程式的行動裝置、瀏覽器或桌面應用程式。

  如果你在網頁瀏覽器或桌面應用程式中執行應用程式，主機（host machine）與目標裝置（target device）即為同一台設備。

## 入門

若要使用 `integration_test`，請將其新增為 Flutter 應用程式測試檔案的相依套件。

若需將現有使用 `flutter_driver` 的專案進行遷移，
請參考 [Migrating from flutter_driver][] 指南。

若要使用 `patrol`，請參閱 [Patrol setup guide][]。

## 整合測試的使用情境

本節的其他指南將說明如何利用整合測試來驗證
[功能][functionality]與[效能][performance]。

[functionality]: /testing/integration-tests/
[integration_test]: https://github.com/flutter/flutter/tree/main/packages/integration_test
[Migrating from flutter_driver]: /release/breaking-changes/flutter-driver-migration
[patrol]: https://pub.dev/packages/patrol
[Patrol setup guide]: https://patrol.leancode.co/getting-started
[performance]: /cookbook/testing/integration/profiling/
[widget tests]: /testing/overview#widget-tests

