---
title: ParentDataWidget 的泛型類型變更為 ParentData
description: ParentDataWidget 現在綁定於 ParentData 類型。
---

{% render docs/breaking-changes.md %}

## 摘要

`ParentDataWidget` 的泛型類型已從
`RenderObjectWidget` 變更為 `ParentData`。

## 背景說明

在此變更之前，`ParentDataWidget` 會綁定到特定的 `RenderObjectWidget` 類型作為其父層。
例如，`Positioned` 元件（Widget）只能用於
`Stack` 元件（Widget）之內。有了這項變更，
`ParentDataWidget` 可以搭配任何
`RenderObjectWidget` 類型作為父層，只要該 `RenderObjectWidget` 的 `RenderObject`
設定了正確的 `ParentData` 類型。在這個新架構下，
`Positioned` 元件（Widget）可以重複利用於假設性的
新 `SuperStack` 元件（Widget）。

## 變更說明

`ParentDataWidget` 的泛型型別參數
已從 `RenderObjectWidget` 變更為 `ParentData`，
並且在 `ParentDataWidget` 中新增了一個新的除錯屬性 `debugTypicalAncestorWidgetClass`。
後者會用於錯誤訊息，讓使用者能更清楚了解特定 `ParentDataWidget`
應該用於的上下文情境。

## 移轉指南

如果你有繼承或實作 `ParentDataWidget`，
則必須依照本節說明進行程式碼移轉。
當你升級至包含此變更的 Flutter 版本時，分析器會顯示以下警告：

```plaintext
  error • Missing concrete implementation of 'getter ParentDataWidget.debugTypicalAncestorWidgetClass' • lib/main.dart:114:7 • non_abstract_class_inherits_abstract_member
  error • 'FrogJar' doesn't extend 'ParentData' • lib/main.dart:114:41 • type_argument_not_matching_bounds
```

遷移前的程式碼：

```dart
class FrogSize extends ParentDataWidget<FrogJar> {
  FrogSize({
    Key key,
    required this.size,
    required Widget child,
  }) : assert(child != null),
        assert(size != null),
        super(key: key, child: child);

  final Size size;

  @override
  void applyParentData(RenderObject renderObject) {
    final FrogJarParentData parentData = renderObject.parentData;
    if (parentData.size != size) {
      parentData.size = size;
      final RenderFrogJar targetParent = renderObject.parent;
      targetParent.markNeedsLayout();
    }
  }
}

class FrogJarParentData extends ParentData {
  Size size;
}

class FrogJar extends RenderObjectWidget {
  // ...
}
```

遷移後的程式碼：

```dart
class FrogSize extends ParentDataWidget<FrogJarParentData> { // FrogJar changed to FrogJarParentData
  FrogSize({
    Key key,
    required this.size,
    required Widget child,
  }) : assert(child != null),
        assert(size != null),
        super(key: key, child: child);

  final Size size;

  @override
  void applyParentData(RenderObject renderObject) {
    final FrogJarParentData parentData = renderObject.parentData;
    if (parentData.size != size) {
      parentData.size = size;
      final RenderFrogJar targetParent = renderObject.parent;
      targetParent.markNeedsLayout();
    }
  }

  @override
  Type get debugTypicalAncestorWidgetClass => FrogJar; // Newly added
}
```

`ParentDataWidget` 超類別的泛型型別
從 `FrogJar`（`RenderObjectWidget`）變更為
`FrogJarParentData`（`ParentData` 型別，即
`FrogSize.applyParentData` 希望操作的型別）。
此外，這個 `ParentDataWidget` 子類別
也實作了新的 `debugTypicalAncestorWidgetClass`。
它會回傳此 `ParentDataWidget` 的典型祖先 `RenderObjectWidget`
的型別。大多數情況下，
你只需要在這裡回傳舊的泛型型別
（本例中為 `FrogJar`）。

## 時程

合併於版本：1.16.3<br>
正式版釋出：1.17

## 參考資料

API 文件：

* [`ParentDataWidget`][`ParentDataWidget`]

相關 PR：

* [讓 ParentDataWidget 可用於不同祖先 RenderObjectWidget 型別][Make ParentDataWidget usable with different ancestor RenderObjectWidget types]


[Make ParentDataWidget usable with different ancestor RenderObjectWidget types]: {{site.repo.flutter}}/pull/48541
[`ParentDataWidget`]: {{site.api}}/flutter/widgets/ParentDataWidget-class.html
