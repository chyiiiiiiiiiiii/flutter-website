---
title: 在 IgnorePointer 及相關元件 (Widgets) 中 ignoringSemantics 的遷移指南
description: 移除 IgnorePointer 及相關元件 (Widgets) 中的 ignoringSemantics。
---

{% render docs/breaking-changes.md %}

## 摘要

`IgnoringPointer` 元件（Widget）可讓你指定 UI 中不接受指標事件的區域，例如當你不希望使用者在文字欄位 (text field) 中輸入文字時。

過去，`IgnorePointer` 不僅會阻擋指標事件，還會將其子樹從語意樹 (semantics tree) 中移除。`ignoreSemantics` 參數被引入作為一種變通方式，以便在使用 `IgnorePointer` 時保留語意樹。

`IgnorePointer` 的行為已經改變，現在不再移除整個語意子樹，而僅僅是在子樹中阻擋語意動作。`ignoringSemantics` 這個變通方式已不再需要，並已被棄用。

此變更同樣適用於 `AbsorbPointer` 及 `SliverIgnorePointer` 元件（Widgets）。

## 變更說明

`ignoringSemantics` 已被移除。

## 遷移指南

如果你在這些元件（Widgets）中將此參數設為 true，請考慮改用 `ExcludeSemantics`。

遷移前的程式碼：

```dart
IgnorePointer(
  ignoringSemantics: true,
  child: const PlaceHolder(),
);

AbsorbPointer(
  ignoringSemantics: true,
  child: const PlaceHolder(),
);

SliverIgnorePointer(
  ignoringSemantics: true,
  child: const PlaceHolder(),
);
```

遷移後的程式碼：

```dart
ExcludeSemantics(
  child: IgnorePointer(
    child: const PlaceHolder(),
  ),
);

ExcludeSemantics(
  child: AbsorbPointer(
    child: const PlaceHolder(),
  ),
);

SliverIgnorePointer(
  child: ExcludeSemantics(
    child: const PlaceHolder(),
  ),
);
```

如果你之前在使用`IgnorePointer`並將`ignoringSemantics`設為`false`，你可以直接將下列元件（Widgets）複製到你的程式碼中使用，以達到相同的行為。

```dart
/// A widget ignores pointer events without modifying the semantics tree.
class _IgnorePointerWithSemantics extends SingleChildRenderObjectWidget {
  const _IgnorePointerWithSemantics({
    super.child,
  });

  @override
  _RenderIgnorePointerWithSemantics createRenderObject(BuildContext context) {
    return _RenderIgnorePointerWithSemantics();
  }
}

class _RenderIgnorePointerWithSemantics extends RenderProxyBox {
  _RenderIgnorePointerWithSemantics();

  @override
  bool hitTest(BoxHitTestResult result, { required Offset position }) => false;
}

/// A widget absorbs pointer events without modifying the semantics tree.
class _AbsorbPointerWithSemantics extends SingleChildRenderObjectWidget {
  const _AbsorbPointerWithSemantics({
    super.child,
  });

  @override
  _RenderAbsorbPointerWithSemantics createRenderObject(BuildContext context) {
    return _RenderAbsorbPointerWithSemantics();
  }
}

class _RenderAbsorbPointerWithSemantics extends RenderProxyBox {
  _RenderAbsorbPointerWithSemantics();

  @override
  bool hitTest(BoxHitTestResult result, { required Offset position }) {
    return size.contains(position);
  }
}

/// A sliver ignores pointer events without modifying the semantics tree.
class _SliverIgnorePointerWithSemantics extends SingleChildRenderObjectWidget {
  const _SliverIgnorePointerWithSemantics({
    super.child,
  });

  @override
  _RenderSliverIgnorePointerWithSemantics createRenderObject(BuildContext context) {
    return _RenderSliverIgnorePointerWithSemantics();
  }
}

class _RenderSliverIgnorePointerWithSemantics extends RenderProxySliver {
  _RenderSliverIgnorePointerWithSemantics();

  @override
  bool hitTest(BoxHitTestResult result, { required Offset position }) => false;
}
```

## 時程

合併於版本：3.10.0-2.0.pre<br>  
正式版釋出於：3.13.0

## 參考資料

相關 PR：

* [PR 120619][PR 120619]：修正 IgnorePointer 與 AbsorbPointer，僅在無障礙 (a11y) 中阻擋使用者互動。

[PR 120619]: {{site.repo.flutter}}/pull/120619
[`IgnorePointer`]: {{site.api}}/flutter/widgets/IgnorePointer-class.html
[`AbsorbPointer`]: {{site.api}}/flutter/widgets/AbsorbPointer-class.html
[`SliverIgnorePointer`]: {{site.api}}/flutter/widgets/SliverIgnorePointer-class.html
[`RenderSliverIgnorePointer`]: {{site.api}}/flutter/rendering/RenderSliverIgnorePointer-class.html
[`RenderIgnorePointer`]: {{site.api}}/flutter/rendering/RenderIgnorePointer-class.html
[`RenderAbsorbPointer`]: {{site.api}}/flutter/rendering/RenderAbsorbPointer-class.html
