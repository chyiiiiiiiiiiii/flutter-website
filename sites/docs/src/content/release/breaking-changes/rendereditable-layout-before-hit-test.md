---
title: 必須先進行 RenderEditable 的版面配置，才能進行點擊測試
description: >
  RenderEditable 的點擊測試需要額外的資訊，而這些資訊僅在完成版面配置後才可取得。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`RenderEditable` 的實例必須在進行點擊測試（hit testing）前先完成版面配置（layout）。如果在版面配置前嘗試對 `RenderEditable` 物件進行點擊測試，會導致如下的斷言錯誤：

```plaintext
Failed assertion: line 123 pos 45: '!debugNeedsLayout': is not true.
```

## 背景

為了在可選取文字中支援手勢辨識器，`RenderEditable` 需要其文字區段（text spans）的版面配置（layout）資訊，以判斷哪個文字區段應接收指標事件。（在此變更之前，`RenderEditable` 物件在進行命中測試（hit test）時，並不會考慮其文字內容。）為了實作這項功能，現在在對 `RenderEditable` 物件執行命中測試前，必須先完成版面配置。

實際上，這種情況很少發生。元件（Widget）函式庫會確保所有 render objects 在進行任何命中測試前都已完成版面配置。這個問題通常只會出現在直接操作 render objects 的程式碼中，例如在自訂 render objects 的測試中。

## 遷移指南

如果你在對 `RenderEditable` 進行命中測試時遇到 `'!debugNeedsLayout': is not true` 斷言錯誤，請在執行前先對 `RenderEditable` 進行版面配置。

遷移前的程式碼：

```dart
import 'package:flutter/rendering.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';

void main() {
  test('attach and detach correctly handle gesture', () {
    final RenderEditable editable = RenderEditable(
      textDirection: TextDirection.ltr,
      offset: ViewportOffset.zero(),
      textSelectionDelegate: FakeEditableTextState(),
      startHandleLayerLink: LayerLink(),
      endHandleLayerLink: LayerLink(),
    );
    final PipelineOwner owner = PipelineOwner(onNeedVisualUpdate: () {});
    editable.attach(owner);
    // This throws an assertion error because
    // the RenderEditable hasn't been laid out.
    editable.handleEvent(const PointerDownEvent(),
        BoxHitTestEntry(editable, const Offset(10, 10)));
    editable.detach();
  });
}

class FakeEditableTextState extends TextSelectionDelegate {
  @override
  TextEditingValue textEditingValue;
  @override
  void hideToolbar() {}
  @override
  void bringIntoView(TextPosition position) {}
}
```

遷移後的程式碼：

```dart
import 'package:flutter/rendering.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';

void main() {
  test('attach and detach correctly handle gesture', () {
    final RenderEditable editable = RenderEditable(
      textDirection: TextDirection.ltr,
      offset: ViewportOffset.zero(),
      textSelectionDelegate: FakeEditableTextState(),
      startHandleLayerLink: LayerLink(),
      endHandleLayerLink: LayerLink(),
    );
    // Lay out the RenderEditable first.
    editable.layout(BoxConstraints.loose(const Size(1000.0, 1000.0)));
    final PipelineOwner owner = PipelineOwner(onNeedVisualUpdate: () {});
    editable.attach(owner);
    editable.handleEvent(const PointerDownEvent(),
        BoxHitTestEntry(editable, const Offset(10, 10)));
    editable.detach();
  });
}

class FakeEditableTextState extends TextSelectionDelegate {
  @override
  TextEditingValue textEditingValue;
  @override
  void hideToolbar() {}
  @override
  void bringIntoView(TextPosition position) {}
}
```

## 時程

合併於版本：1.18.0<br>
進入穩定版本：1.20

## 參考資料

API 文件：

* [`RenderEditable`][]

相關議題：

* [Issue 43494][]：SelectableText.rich 搭配 TapGestureRecognizer 使用時無法正常運作

相關 PR：

* [PR 54479: Enable gesture recognizer in selectable rich text][]


[Issue 43494]: {{site.repo.flutter}}/issues/43494
[`RenderEditable`]: {{site.api}}/flutter/rendering/RenderEditable-class.html
[PR 54479: Enable gesture recognizer in selectable rich text]: {{site.repo.flutter}}/pull/54479
