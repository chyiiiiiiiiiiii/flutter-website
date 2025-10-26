```markdown
---
title: 不再支援 Web 專用的 golden 比對
description: >-
  `WebGoldenComparator` 類別與 `webGoldenComparator` 頂層實例已被棄用，預計將移除，Web 渲染後端（包含 CanvasKit 與 skWasm）現在會直接使用 `GoldenFileComparator` 與 `goldenFileComparator`。
---

{% render docs/breaking-changes.md %}

## 摘要

`flutter_test` 套件與 `flutter` 工具將不再使用 [`webGoldenComparator`][`webGoldenComparator`] 頂層變數，而是改為使用原本的 [`goldenFileComparator`][`goldenFileComparator`] 頂層變數（如同非 Web 平台）。

對於 `flutter_test` 的_使用者_，這些變更會自動完成。

## 背景

最初，[`WebGoldenComparator`][class-WebGoldenComparator] 是為了 Flutter Web 的 HTML 後端所新增，因為當時無法建立編碼後的 PNG（位元組緩衝區），因此需要一個新的 API。隨著 [HTML 後端即將被棄用與移除][Issue 145954]，這個額外的 API 已不再需要。

## 遷移指南

對於大多數使用者，無需進行任何變更（除了需遷移離開 HTML 後端，這部分不在本文件範圍內），`flutter` 工具會自動設定 [`goldenFileComparator`][`goldenFileComparator`] 並加以使用（當使用非 HTML 的 Web 後端時）。

若您有實作自訂的 [`WebGoldenComparator`][`WebGoldenComparator`]，則需將實作遷移到 [`GoldenFileComparator`][`GoldenFileComparator`]。幸運的是，CanvasKit 與 SkWasm 後端本來就需要類似的方法（`compareButes` 與 `updateBytes`）。

例如：
```

```dart
// Before
class MyWebGoldenComparator extends WebGoldenComparator {
  @override
  Future<bool> compare(double width, double height, Uri golden) {
    // will be removed in the migration
  }

  @override
  Future<bool> update(double width, double height, Uri golden) {
    // will be removed in the migration
  }

  @override
  Future<bool> compareBytes(Uint8List bytes, Uri golden) {
    // will be renamed "compare"
  }

  @override
  Future<bool> updateBytes(Uint8List bytes, Uri golden) {
    // will be renamed "update" and the parameter orders swapped
  }
}

// After
class MyGenericGoldenComparator extends GoldenFileComparator {
  @override
  Future<bool> compare(Uint8List bytes, Uri golden) {
    // used to be "compareBytes"
  }

  @override
  Future<bool> update(Uri golden, Uint8List bytes) {
    // used to be "updateBytes"
  }
}
```

## 時程

已於版本：3.29.0-0.0.pre<br>
正式版發布：3.29

## 參考資料

相關議題（Issues）：

- [Issue 145954][Issue 145954]，HTML renderer 已被棄用。
- [Issue 160261][Issue 160261]，提出合併 `GoldenFileComparator` 與 `WebGoldenComparator` 的建議。

相關 PR：

- [PR 161196][PR 161196]，在此 PR 中 `WebGoldenComparator` 被棄用，且 `flutter` 命令列介面 (Command Line Interface) 開始使用 `goldenFileComparator`。

[Issue 145954]: {{site.github}}/flutter/flutter/issues/145954
[Issue 160261]: {{site.github}}/flutter/flutter/issues/160261
[PR 161196]: https://github.com/flutter/flutter/pull/161196
[class-WebGoldenComparator]: {{site.api}}/flutter/flutter_test/WebGoldenComparator-class.html
[`webGoldenComparator`]: {{site.api}}/flutter/flutter_test/webGoldenComparator.html
[`goldenFileComparator`]: {{site.api}}/flutter/flutter_test/goldenFileComparator.html
