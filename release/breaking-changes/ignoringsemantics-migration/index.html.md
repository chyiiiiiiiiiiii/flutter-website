# 在 IgnorePointer 及相關元件中 ignoringSemantics 的遷移指南

> 移除 IgnorePointer 及相關元件中的 ignoringSemantics。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`IgnoringPointer` 元件 (Widget) 可讓你指定 UI 中某個區域不接受指標事件，例如當你不希望使用者在文字欄位 (text field) 中輸入文字時。

過去，`IgnorePointer` 不僅會阻擋指標事件，也會將其子樹從 semantics 樹中移除。`ignoreSemantics` 參數被引入作為權宜之計，用於在使用 `IgnorePointer` 時保留 semantics 樹。

`IgnorePointer` 的行為已變更，現在不再移除整個 semantics 子樹，而僅會阻擋子樹中的 semantics 操作。`ignoringSemantics` 這個權宜之計已不再需要，並且已被棄用。

這項變更同樣適用於 `AbsorbPointer` 和 `SliverIgnorePointer` 元件。

## 變更說明

`ignoringSemantics` 已被移除。

## 遷移指南

如果你在這些元件中將此參數設為 true，請考慮改用 `ExcludeSemantics`。

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

如果你之前在使用 `IgnorePointer` 並將 `ignoringSemantics` 設為 `false`，你可以直接將下列元件複製到你的程式碼中使用，以達到相同的行為效果。

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

* [PR 120619][]：修正 IgnorePointer 與 AbsorbPointer，讓它們僅在無障礙（a11y）情境下阻擋使用者互動。

[PR 120619]: https://github.com/flutter/flutter/pull/120619
[`IgnorePointer`]: https://api.flutter.dev/flutter/widgets/IgnorePointer-class.html
[`AbsorbPointer`]: https://api.flutter.dev/flutter/widgets/AbsorbPointer-class.html
[`SliverIgnorePointer`]: https://api.flutter.dev/flutter/widgets/SliverIgnorePointer-class.html
[`RenderSliverIgnorePointer`]: https://api.flutter.dev/flutter/rendering/RenderSliverIgnorePointer-class.html
[`RenderIgnorePointer`]: https://api.flutter.dev/flutter/rendering/RenderIgnorePointer-class.html
[`RenderAbsorbPointer`]: https://api.flutter.dev/flutter/rendering/RenderAbsorbPointer-class.html

