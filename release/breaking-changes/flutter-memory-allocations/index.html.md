# 棄用 MemoryAllocations，改用 FlutterMemoryAllocations

> MemoryAllocations 已更名為 FlutterMemoryAllocations。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


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

變更後：

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

[Rename MemoryAllocations to FlutterMemoryAllocations (Issue 140622)]: https://github.com/flutter/flutter/issues/140622

