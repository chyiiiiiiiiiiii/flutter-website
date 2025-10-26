---
title: v3.3 之後移除的已棄用 API
description: >
  在達到生命週期終點後，以下已棄用的 API
  已從 Flutter 中移除。
---

## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 3.3 穩定版發佈後達到生命週期終點的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此主要來源，
以協助遷移作業。另有提供
[快速參考表][quick reference sheet]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-3

## 變更內容

本節列出依受影響類別分類的棄用項目。

### `RenderUnconstrainedBox`

Flutter Fix 支援：否

`RenderUnconstrainedBox` 於 v2.1 棄用。
請改用 `RenderConstraintsTransformBox`。

若在兩個軸向皆無限制時，請將 `ConstraintsTransformBox.unconstrained`
提供給 `constraintsTransform`。

若先前已設定 `RenderUnconstrainedBox.constrainedAxis`，
請分別替換如下：

- 若 `constrainedAxis` 先前為 `Axis.horizontal`，請將
  `constraintsTransform` 設為 `ConstraintsTransformBox.widthUnconstrained`。
- 若 `constrainedAxis` 先前為 `Axis.vertical`，請將
  `constraintsTransform` 設為 `ConstraintsTransformBox.heightUnconstrained`。

此變更允許透過 `ConstraintsTransformBox` 引入更多類型的限制轉換。
舊 API 的其他參數與新 API 相容。

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

* 在 [#78673][#78673] 中標記為已淘汰
* 在 [#111711][#111711] 中移除

[`RenderConstraintsTransformBox`]: {{site.api}}/flutter/rendering/RenderConstraintsTransformBox-class.html
[`ConstraintsTransformBox`]: {{site.api}}/flutter/widgets/ConstraintsTransformBox-class.html
[#78673]: {{site.repo.flutter}}/pull/78673
[#111711]: {{site.repo.flutter}}/pull/111711

---

### `DragAnchor`、`Draggable.dragAnchor` 與 `LongPressDraggable.dragAnchor`

Flutter Fix 支援：是

列舉型別 `DragAnchor` 以及其在 `Draggable.dragAnchor` 和
`LongPressDraggable.dragAnchor` 中的用法已於 v2.1 標記為已淘汰。
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

* 已於 [#79160][#79160] 標記為已淘汰
* 已於 [#111713][#111713] 移除

[`Draggable`]: {{site.api}}/flutter/widgets/Draggable-class.html
[`LongPressDraggable`]: {{site.api}}/flutter/widgets/LongPressDraggable-class.html
[`DragAnchorStrategy`]: {{site.api}}/flutter/widgets/DragAnchorStrategy.html
[#73143]: {{site.repo.flutter}}/pull/73143
[#79160]: {{site.repo.flutter}}/pull/79160
[#111713]: {{site.repo.flutter}}/pull/111713

---

### `ScrollBehavior.buildViewportChrome`

Flutter Fix 支援：是

`ScrollBehavior.buildViewportChrome` 方法自 v2.1 起已被標記為已淘汰。

此方法過去由 `Scrollable` 元件（Widget）用於在適當的平台上，預設套用像 `GlowingOverscrollIndicator` 這樣的 overscroll 指示器。隨著更多預設裝飾器（decorator）被加入，例如 `Scrollbar`，每一個現在都被拆分為獨立的方法，以取代 `buildViewportChrome`。

這讓繼承的類別只需透過 `buildScrollbar` 或 `buildOverscrollIndicator` 覆寫特定的裝飾器，而不需要為了維護其中之一而重寫程式碼。

**遷移指南**

[提供詳細的遷移指南][In-depth migration guide available]

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
* 在 [#78588][#78588] 中標記為已棄用
* 在 [#111715][#111715] 中移除

[In-depth migration guide available]: /release/breaking-changes/default-desktop-scrollbars
[Exposing & Updating ScrollBehaviors]: /go/exposing-scroll-behaviors
[`ScrollBehavior`]: {{site.api}}/flutter/widgets/ScrollBehavior-class.html
[Scrollbars should be always visible and instantiated by default on web and desktop]: {{site.repo.flutter}}/issues/40107
[#76739]: {{site.repo.flutter}}/pull/76739
[#78588]: {{site.repo.flutter}}/pull/78588
[#111715]: {{site.repo.flutter}}/pull/111715

---

## 時程

在穩定版發佈：3.7
