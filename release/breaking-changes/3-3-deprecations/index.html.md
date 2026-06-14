# v3.3 之後移除的已棄用 API

> 在達到生命週期終點後，下列已棄用的 API 已從 Flutter 中移除。



## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 3.3 穩定版發佈後達到生命週期終點的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此
主要來源，以協助遷移。
同時也提供[快速參考表][quick reference sheet]。

[Deprecation Policy]: https://github.com/flutter/flutter/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-3

## 變更內容

本節依受影響的類別列出棄用項目。

### `RenderUnconstrainedBox`

支援 Flutter Fix：否

`RenderUnconstrainedBox` 在 v2.1 中已被棄用。
請改用 `RenderConstraintsTransformBox`。

當在兩個軸向皆無限制時，請提供 `ConstraintsTransformBox.unconstrained`
給 `constraintsTransform`。

若先前有設定 `RenderUnconstrainedBox.constrainedAxis`，
請分別替換為：

- 若 `constrainedAxis` 先前為 `Axis.horizontal`，請將
  `constraintsTransform` 設為 `ConstraintsTransformBox.widthUnconstrained`。
- 若 `constrainedAxis` 先前為 `Axis.vertical`，請將
  `constraintsTransform` 設為 `ConstraintsTransformBox.heightUnconstrained`。

此變更允許透過 `ConstraintsTransformBox` 引入更多類型的限制條件
轉換。舊 API 的其他參數與新 API 相容。

**遷移指南**

遷移前的程式碼：

```dart
// Unconstrained
final RenderUnconstrainedBox unconstrained = RenderUnconstrainedBox(
  textDirection: TextDirection.ltr,
  child: RenderConstrainedBox(
    additionalConstraints: const BoxConstraints.tightFor(height: 200.0),
  ),
  alignment: Alignment.center,
);

// Constrained in horizontal axis
final RenderUnconstrainedBox unconstrained = RenderUnconstrainedBox(
  constrainedAxis: Axis.horizontal,
  textDirection: TextDirection.ltr,
  child: RenderConstrainedBox(
    additionalConstraints: const BoxConstraints.tightFor(width: 200.0, height: 200.0),
  ),
  alignment: Alignment.center,
);

// Constrained in vertical axis
final RenderUnconstrainedBox unconstrained = RenderUnconstrainedBox(
  constrainedAxis: Axis.vertical,
  textDirection: TextDirection.ltr,
  child: RenderFlex(
    direction: Axis.vertical,
    textDirection: TextDirection.ltr,
    children: <RenderBox>[flexible],
  ),
  alignment: Alignment.center,
);
```

遷移後的程式碼：

```dart
// Unconstrained
final RenderConstraintsTransformBox unconstrained = RenderConstraintsTransformBox(
  constraintsTransform: ConstraintsTransformBox.unconstrained,
  textDirection: TextDirection.ltr,
  child: RenderConstrainedBox(
    additionalConstraints: const BoxConstraints.tightFor(height: 200.0),
  ),
  alignment: Alignment.center,
);

// Constrained in horizontal axis
final RenderConstraintsTransformBox unconstrained = RenderConstraintsTransformBox(
  constraintsTransform: ConstraintsTransformBox.widthUnconstrained,
  textDirection: TextDirection.ltr,
  child: RenderConstrainedBox(
    additionalConstraints: const BoxConstraints.tightFor(width: 200.0, height: 200.0),
  ),
  alignment: Alignment.center,
);

// Constrained in vertical axis
final RenderConstraintsTransformBox unconstrained = RenderConstraintsTransformBox(
  constraintsTransform: ConstraintsTransformBox.widthUnconstrained,
  textDirection: TextDirection.ltr,
  child: RenderFlex(
    direction: Axis.vertical,
    textDirection: TextDirection.ltr,
    children: <RenderBox>[flexible],
  ),
  alignment: Alignment.center,
);
```

**參考資料**

API 文件：

* [`RenderConstraintsTransformBox`][`RenderConstraintsTransformBox`]
* [`ConstraintsTransformBox`][`ConstraintsTransformBox`]

相關 PR：

* 在 [#78673][#78673] 標記為已淘汰
* 在 [#111711][#111711] 移除

[`RenderConstraintsTransformBox`]: https://api.flutter.dev/flutter/rendering/RenderConstraintsTransformBox-class.html
[`ConstraintsTransformBox`]: https://api.flutter.dev/flutter/widgets/ConstraintsTransformBox-class.html
[#78673]: https://github.com/flutter/flutter/pull/78673
[#111711]: https://github.com/flutter/flutter/pull/111711

---

### `DragAnchor`、`Draggable.dragAnchor` 與 `LongPressDraggable.dragAnchor`

支援 Flutter Fix：是

列舉型別 `DragAnchor` 以及其在 `Draggable.dragAnchor` 和
`LongPressDraggable.dragAnchor` 中的用法，已於 v2.1 標記為已淘汰。
請改用 `dragAnchorStrategy`。

此變更讓可拖曳元件（draggable widget）在與其他元件（如 `Stack` 和 `InteractiveViewer`）搭配使用時，能提供更精確的回饋。

**遷移指南**

遷移前的程式碼：

```dart
Draggable draggable = Draggable();
draggable = Draggable(dragAnchor: DragAnchor.child);
draggable = Draggable(dragAnchor: DragAnchor.pointer);

LongPressDraggable longPressDraggable = LongPressDraggable();
longPressDraggable = LongPressDraggable(dragAnchor: DragAnchor.child);
longPressDraggable = LongPressDraggable(dragAnchor: DragAnchor.pointer);
```

遷移後的程式碼：

```dart
Draggable draggable = Draggable();
draggable = Draggable(dragAnchorStrategy: childDragAnchorStrategy);
draggable = Draggable(dragAnchorStrategy: pointerDragAnchorStrategy);

LongPressDraggable longPressDraggable = LongPressDraggable();
longPressDraggable = LongPressDraggable(dragAnchorStrategy: childDragAnchorStrategy);
longPressDraggable = LongPressDraggable(dragAnchorStrategy: pointerDragAnchorStrategy);
```

**參考資料**

API 文件：

* [`Draggable`][`Draggable`]
* [`LongPressDraggable`][`LongPressDraggable`]
* [`DragAnchorStrategy`][`DragAnchorStrategy`]

相關議題：

* [#73143][#73143]

相關 PR：

* 在 [#79160][#79160] 中標記為已棄用
* 在 [#111713][#111713] 中移除

[`Draggable`]: https://api.flutter.dev/flutter/widgets/Draggable-class.html
[`LongPressDraggable`]: https://api.flutter.dev/flutter/widgets/LongPressDraggable-class.html
[`DragAnchorStrategy`]: https://api.flutter.dev/flutter/widgets/DragAnchorStrategy.html
[#73143]: https://github.com/flutter/flutter/pull/73143
[#79160]: https://github.com/flutter/flutter/pull/79160
[#111713]: https://github.com/flutter/flutter/pull/111713

---

### `ScrollBehavior.buildViewportChrome`

支援 Flutter Fix：是

`ScrollBehavior.buildViewportChrome` 方法自 v2.1 起已被棄用。

此方法過去由 `Scrollable` 元件（Widget）用於在適當的平台上預設套用 overscroll 指示器，例如 `GlowingOverscrollIndicator`。隨著更多預設裝飾器（decorator）被加入，例如 `Scrollbar`，每一種裝飾器都被拆分為獨立的方法，以取代 `buildViewportChrome`。

這樣一來，繼承的類別只需透過 `buildScrollbar` 或 `buildOverscrollIndicator` 覆寫特定的裝飾器方法，而無需為了維護其中之一而重寫整段程式碼。

**遷移指南**

[提供詳細遷移指南][In-depth migration guide available]

遷移前的程式碼：

```dart
final ScrollBehavior scrollBehavior = ScrollBehavior();
scrollBehavior.buildViewportChrome(context, child, axisDirection);
```

遷移後的程式碼：

```dart
final ScrollBehavior scrollBehavior = ScrollBehavior();
scrollBehavior.buildOverscrollIndicator(context, child, axisDirection);
```

**參考資料**

設計文件：

* [Exposing & Updating ScrollBehaviors][Exposing & Updating ScrollBehaviors]

API 文件：

* [`ScrollBehavior`][`ScrollBehavior`]

相關議題：

* [Scrollbars should be always visible and instantiated by default on web and desktop][Scrollbars should be always visible and instantiated by default on web and desktop]

相關 PR：

* [#76739][#76739]
* 在 [#78588][#78588] 中標記為已淘汰
* 在 [#111715][#111715] 中移除

[In-depth migration guide available]: /release/breaking-changes/default-desktop-scrollbars
[Exposing & Updating ScrollBehaviors]: /go/exposing-scroll-behaviors
[`ScrollBehavior`]: https://api.flutter.dev/flutter/widgets/ScrollBehavior-class.html
[Scrollbars should be always visible and instantiated by default on web and desktop]: https://github.com/flutter/flutter/issues/40107
[#76739]: https://github.com/flutter/flutter/pull/76739
[#78588]: https://github.com/flutter/flutter/pull/78588
[#111715]: https://github.com/flutter/flutter/pull/111715

---

## 時程

於穩定版發布：3.7

