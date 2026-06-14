---
title: 棄用 `containsSemantics`，改用 `isSemantics`
description: >-
  `containsSemantics` 匹配器已棄用，改用
  `isSemantics` 與 `matchesSemantics` 匹配器。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`containsSemantics` 部分匹配器已棄用，並由 `isSemantics` 取代，
以釐清意圖並統一匹配器的命名慣例。

## 背景

部分匹配器（例如 `containsSemantics`）的 `contains` 前綴已替換為 `is`，
以符合以下命名慣例：

* **部分匹配器**（例如 `isSemantics`）只匹配明確提供的屬性。
  未提供的引數會被忽略。
* **精確匹配器**（例如 `matchesSemantics`）則驗證所有值。
  未提供的引數預期應符合物件的預設值。

## 遷移指南

若要自動遷移程式碼，請執行以下指令：

```console
$ dart fix --apply
```

或者，針對部分匹配（最常見的情況），將 `containsSemantics` 替換為 `isSemantics`；
若需要斷言精確的屬性值（包含省略引數的預設值），則替換為 `matchesSemantics`。

遷移前的程式碼：

```dart
expect(
  tester.getSemantics(find.byType(MyWidget)),
  containsSemantics(
    label: 'My Widget',
    isButton: true,
  ),
);
```

遷移後的程式碼：

```dart
expect(
  tester.getSemantics(find.byType(MyWidget)),
  isSemantics(
    label: 'My Widget',
    isButton: true,
  ),
);
```

## 時間軸

導入版本：3.40.0-1.0.pre<br>
穩定版發布：3.41

## 參考資料

API 文件：

* [`isSemantics`][]
* [`matchesSemantics`][]

相關 Issue：

* [Issue 180534][]
* [Issue 107859][]

相關 PR：

* [PR 180538][]

[`isSemantics`]: {{site.api}}/flutter/flutter_test/isSemantics.html
[`matchesSemantics`]: {{site.api}}/flutter/flutter_test/matchesSemantics.html
[Issue 180534]: {{site.repo.flutter}}/issues/180534
[Issue 107859]: {{site.repo.flutter}}/issues/107859
[PR 180538]: {{site.repo.flutter}}/pull/180538
