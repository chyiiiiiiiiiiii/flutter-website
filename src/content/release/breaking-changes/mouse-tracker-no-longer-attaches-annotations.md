---
title: MouseTracker 不再附加註解
description: >
  MouseTracker 現在不再依賴註解附加來執行 mounted-exit 檢查；
  因此，相關的三個方法已被移除。
---

{% render docs/breaking-changes.md %}

## 摘要

已移除 `MouseTracker` 的方法 `attachAnnotation`、
`detachAnnotation` 以及 `isAnnotationAttached`。

## 背景說明

滑鼠事件，例如滑鼠指標進入區域、離開區域或懸停於區域時，
會透過在 render 階段放置於感興趣區域的 `MouseTrackerAnnotation` 來偵測。
每次更新（新畫面或新事件）時，
`MouseTracker` 會比較滑鼠指標在更新前後所懸停的註解，
並據此分派回呼函式。

管理滑鼠指標狀態的 `MouseTracker` 類別，
過去需要 `MouseRegion` 在掛載（mounted）時附加註解，
在卸載（unmounted）時移除註解。
這個機制被 `MouseTracker` 用來執行
「mounted-exit 檢查」（例如，若離開事件是因元件卸載所致，
則不得呼叫 `MouseRegion.onExit`），
以避免呼叫已卸載元件的 `setState` 而導致例外狀況
（詳見 [Issue #44631][Issue #44631]）。

此機制現已被新的方式取代：將 `MouseRegion`
設計為 stateful widget（有狀態元件），
使其能在卸載時自行阻擋回呼來執行 mounted-exit 檢查。
因此，這些方法已被移除，`MouseTracker`
也不再追蹤螢幕上的所有註解。

## 變更說明

`MouseTracker` 類別已移除三個與註解附加相關的方法：

```dart diff
  class MouseTracker extends ChangeNotifier {
    // ...
-   void attachAnnotation(MouseTrackerAnnotation annotation) {/* ... */}

-   void detachAnnotation(MouseTrackerAnnotation annotation) {/* ... */}

-   @visibleForTesting
-   bool isAnnotationAttached(MouseTrackerAnnotation annotation) {/* ... */}
  }
```

`RenderMouseRegion` 和 `MouseTrackerAnnotation` 不再執行 mounted-exit 檢查，而 `MouseRegion` 仍然會執行。

## 遷移指南

呼叫 `MouseTracker.attachAnnotation` 和 `detachAnnotation` 應該可以直接移除，幾乎不會有任何影響：

* 使用 `MouseRegion` 不會受到任何影響。
* 如果你的程式碼有直接使用 `RenderMouseRegion` 或 `MouseTrackerAnnotation`，請注意，當離開是由過去會呼叫 `MouseTracker.detachAnnotation` 的事件所觸發時，現在會改為呼叫 `onExit`。
  如果沒有涉及狀態，這通常不會造成問題；否則你可能需要自行加入 mounted-exit 檢查，特別是當 callback 外洩，導致外層元件 (Widgets) 可能會在其中呼叫 `setState`。例如：

遷移前的程式碼：

```dart
class MyMouseRegion extends SingleChildRenderObjectWidget {
  const MyMouseRegion({this.onHoverChange});

  final ValueChanged<bool> onHoverChange;

  @override
  RenderMouseRegion createRenderObject(BuildContext context) {
    return RenderMouseRegion(
      onEnter: (_) { onHoverChange(true); },
      onExit: (_) { onHoverChange(false); },
    );
  }

  @override
  void updateRenderObject(BuildContext context, RenderMouseRegion renderObject) {
    renderObject
      ..onEnter = (_) { onHoverChange(true); }
      ..onExit = (_) { onHoverChange(false); };
  }
}
```

遷移後的程式碼：

```dart
class MyMouseRegion extends SingleChildRenderObjectWidget {
  const MyMouseRegion({this.onHoverChange});

  final ValueChanged<bool> onHoverChange;

  @override
  RenderMouseRegion createRenderObject(BuildContext context) {
    return RenderMouseRegion(
      onEnter: (_) { onHoverChange(true); },
      onExit: (_) { onHoverChange(false); },
    );
  }

  @override
  void updateRenderObject(BuildContext context, RenderMouseRegion renderObject) {
    renderObject
      ..onEnter = (_) { onHoverChange(true); }
      ..onExit = (_) { onHoverChange(false); };
  }

  @override
  void didUnmountRenderObject(RenderMouseRegion renderObject) {
    renderObject
      ..onExit = onHoverChange == null ? null : (_) {};
  }
}
```

必須移除對 `MouseTracker.isAnnotationAttached` 的呼叫。
此功能現已無法技術上實現，
因為註解（annotations）已不再被追蹤。
如果你仍然需要此功能，請提交 issue。

## 時程

合併版本：1.15.4<br>
正式版釋出：1.17

## 參考資料

API 文件：

* [`MouseRegion`][`MouseRegion`]
* [`MouseTracker`][`MouseTracker`]
* [`MouseTrackerAnnotation`][`MouseTrackerAnnotation`]
* [`RenderMouseRegion`][`RenderMouseRegion`]

相關 PR：

* [MouseTracker no longer requires annotations attached][MouseTracker no longer requires annotations attached]，
  即進行此項變更的 PR
* [Improve MouseTracker lifecycle: Move checks to post-frame][Improve MouseTracker lifecycle: Move checks to post-frame]，
  首次引入 mounted-exit 變更，
  詳細說明請參見 _The change to onExit_。


[Improve MouseTracker lifecycle: Move checks to post-frame]: {{site.repo.flutter}}/issues/44631
[Issue #44631]: {{site.repo.flutter}}/pull/44631
[`MouseRegion`]: {{site.api}}/flutter/widgets/MouseRegion-class.html
[`MouseTracker`]: {{site.api}}/flutter/gestures/MouseTracker-class.html
[MouseTracker no longer requires annotations attached]: {{site.repo.flutter}}/issues/48453
[`MouseTrackerAnnotation`]: {{site.api}}/flutter/gestures/MouseTrackerAnnotation-class.html
[`RenderMouseRegion`]: {{site.api}}/flutter/rendering/RenderMouseRegion-class.html
