---
title: 棄用 MemoryAllocations，改用 FlutterMemoryAllocations
description: >-
  MemoryAllocations 已更名為 FlutterMemoryAllocations。
---

{% render docs/breaking-changes.md %}

## 摘要

純 Dart 專案中的 Disposables 無法在 Flutter 中使用 `MemoryAllocations`。
因此，若要支援記憶體洩漏追蹤，他們需要一個僅限 Dart 的類別。
Flutter 中的 `MemoryAllocations` 已更名，以便讓這個名稱可供非 Flutter 的 Dart 專案使用。

## 遷移指南

變更前：

```dart 
if (kFlutterMemoryAllocationsEnabled) {
  MemoryAllocations.instance.dispatchObjectCreated(
    library: 'package:flutter/gestures.dart',
    className: '$MultiDragPointerState',
    object: this,
  );
}
```

之後：

```dart 
if (kFlutterMemoryAllocationsEnabled) {
  FlutterMemoryAllocations.instance.dispatchObjectCreated(
    library: 'package:flutter/gestures.dart',
    className: '$MultiDragPointerState',
    object: this,
  );
}
```

## 時間軸

合併於版本：3.19.0-2.0.pre<br>  
進入穩定版：3.22.0

## 參考資料

相關議題：

* [將 MemoryAllocations 重新命名為 FlutterMemoryAllocations（Issue 140622）][Rename MemoryAllocations to FlutterMemoryAllocations (Issue 140622)]

[Rename MemoryAllocations to FlutterMemoryAllocations (Issue 140622)]: {{site.repo.flutter}}/issues/140622
