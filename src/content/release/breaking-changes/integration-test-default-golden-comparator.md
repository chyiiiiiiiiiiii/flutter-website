---
title: Android 和 iOS 上整合測試的預設 golden-file 比對器已變更
description: >-
  當使用 `package:integration_test` 在 Android 裝置或模擬器，或 iOS 裝置或模擬器上執行測試時，預設的 `goldenFileComparator` 已變更，並且現在正確地使用主機檔案系統。
---

{% render docs/breaking-changes.md %}

## 摘要

除非在測試中手動設定使用者自訂的 [`goldenFileComparator`][`goldenFileComparator`]，或透過 `flutter_test_config.dart` 檔案設定，否則 Android 和 iOS 裝置及模擬器／模擬器現在有新的預設值，會代理到本地主機的檔案系統，修正了一個長期存在的錯誤（[#143299][Issue 143299]）。

## 背景

[`integration_test`][`integration_test`] 套件，以及其與 [`flutter_test`][`flutter_test`] 的整合，過去一直存在一個錯誤，當使用 [`matchesGoldenFile`][`matchesGoldenFile`] 或類似 API 時，會拋出 `FileSystemException`。

部分使用者可能透過撰寫並使用自訂的 [`goldenFileComparator`][`goldenFileComparator`] 來解決此問題：

```dart
import 'package:integration_test/integration_test.dart';
import 'package:my_integration_test/custom_golden_file_comparator.dart';

void main() {
  goldenFileComparator = CustomGoldenFileComparatorThatWorks();

  // ...
}
```

這類變通方法現在已不再需要，若對預設值進行型別檢查，也將無法像以往那樣運作：

```dart
if (goldenFileComparator is ...) {
  // The new default is a new (hidden) type that has not existed before.
}
```

## 遷移指南

在大多數情況下，我們預期使用者不需要做任何事——這在某種意義上是
「新」的功能，用來取代原本無法運作且會導致未處理例外、進而造成測試失敗的功能。

如果你有自行撰寫自訂的測試基礎架構與比較器（comparator），建議考慮移除 [`goldenFileComparator`][`goldenFileComparator`] 覆寫，改為依賴（新的）預設值，這應該會如預期般運作：

```diff
import 'package:integration_test/integration_test.dart';
-import 'package:my_integration_test/custom_golden_file_comparator.dart';

void main() {
-  goldenFileComparator = CustomGoldenFileComparatorThatWorks();

  // ...
}
```

_有趣的小知識_：現有用於 _web_ 平台的程式碼已被[重複利用][PR 160484]。

## 時程

合併於版本：3.29.0-0.0.pre<br>  
穩定版發佈：3.32

## 參考資料

相關 API：

- [`flutter_test`][`flutter_test`]，介紹了 `flutter_test_config.dart` 及其功能。
- [`goldenFileComparator`][`goldenFileComparator`]，實作了比較功能，且可由使用者自訂。

相關議題 (Issues)：

- [Issue 143299][Issue 143299]，這是許多用戶回報長期存在錯誤的其中之一。
- [Issue 160043][Issue 160043]，詳細說明了為什麼 [`matchesGoldenFile`][`matchesGoldenFile`] 會失敗的技術原因。

相關 PR：

- [PR 160215][PR 160215]，在這裡將 web 工具的實作重構為通用版本。
- [PR 160484][PR 160484]，利用 Dart VM 服務協定在裝置與主機之間進行代理。

[`flutter_test`]: {{site.api}}/flutter/flutter_test
[`goldenFileComparator`]: {{site.api}}/flutter/flutter_test/goldenFileComparator.html
[`integration_test`]: {{site.api}}/flutter/package-integration_test_integration_test/
[Issue 143299]: {{site.repo.flutter}}/issues/143299
[Issue 160043]: {{site.repo.flutter}}/issues/160043
[`matchesGoldenFile`]: {{site.api}}/flutter/flutter_test/MatchesGoldenFile-class.html
[PR 160215]: {{site.repo.flutter}}/pull/160215
[PR 160484]: {{site.repo.flutter}}/pull/160484
