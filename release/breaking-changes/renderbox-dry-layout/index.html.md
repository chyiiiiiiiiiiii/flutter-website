# RenderBox 的 Dry layout 支援

> 在 RenderBox 協定中新增了 "computeDryLayout" 方法， 以便在某些情境下正確計算其內在尺寸。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

在 `RenderBox` 協定中新增了一個名為 `computeDryLayout` 的新方法。
`RenderBox` 的子類別預期需要實作這個方法，以便在進行內在尺寸計算時，
根據一組 `BoxConstraints` 正確回報其期望尺寸。已實作 `computeDryLayout` 的子類別，
現在不再需要覆寫 `performResize`。

## 背景

在 `RenderBox` 協定中新增了一個新方法 `computeDryLayout`，
用於正確計算具有 `WidgetSpan` 子元件和 `RenderWrap` 的 `RenderParagraph` 的內在尺寸。
該方法會接收一組 `BoxConstraints`，並預期計算出 `RenderBox` 的結果尺寸，
但不會更動任何內部狀態。這本質上是一種僅計算結果尺寸、不實際擺放子元件的
`performLayout` 的 dry run。`computeDryLayout` 方法屬於 intrinsics 協定的一部分
（另請參閱 [`RenderBox.computeMinIntrinsicWidth`][] 及相關內容）。

## 變更說明

如果 `RenderBox` 的子類別被用作會查詢其子元件內在尺寸的 `RenderObject` 的後代，
則需要覆寫新的 `computeDryLayout` 方法。會這麼做的元件 (Widget) 範例包括
`IntrinsicHeight` 和 `IntrinsicWidth`。

`RenderBox.performResize` 的預設實作也會使用 `computeDryLayout` 計算出的尺寸來進行調整。
因此，不再需要覆寫 `performResize`。

## 遷移指南

已經覆寫 `performResize` 的子類別，只需將函式簽名從 `void performResize()`
改為 `Size computeDryLayout(BoxConstraints constraints)`，並回傳計算出的尺寸，
而不是將其指派給 `size` setter。舊的 `performResize` 實作可以移除。

遷移前的程式碼：

```dart
  @override
  void performResize() {
     size = constraints.biggest;
  }
```

遷移後的程式碼：

```dart
  // This replaces the old performResize method.
  @override
  Size computeDryLayout(BoxConstraints constraints) {
     return constraints.biggest;
  }
```

如果子類別沒有覆寫 `performResize`，那麼 `computeDryLayout` 的實作必須從 `performLayout` 方法中抽取出來。
基本上，`computeDryLayout` 需要執行所有 `performLayout` 所做的工作，以計算 `RenderBox` 的尺寸。
不過，`computeDryLayout` 並不是將計算結果指派給 `size` setter，而是回傳計算出來的尺寸。
如果 `computeDryLayout` 需要知道其子元件的尺寸，必須透過呼叫子元件的 `getDryLayout`
來取得尺寸，而不是呼叫 `layout`。

如果因某些原因無法計算 dry layout，`computeDryLayout` 必須在 assert 內呼叫
`debugCannotComputeDryLayout`，並回傳一個假尺寸 `const Size(0, 0)`。
舉例來說，當 `RenderBox` 的尺寸依賴於其子元件的 baseline 指標時，就無法計算 dry layout。

```dart
  @override
  Size computeDryLayout(BoxConstraints constraints) {
    assert(debugCannotComputeDryLayout(
      reason: 'Layout requires baseline metrics, which are only available after a full layout.'
    ));
    return const Size(0, 0);
  }
```

## 時程

合併於版本：1.25.0-4.0.pre<br>
穩定版發佈於：2.0.0

## 參考資料

API 文件：

* [`RenderBox`][]
* [`computeMinIntrinsicWidth`][]
* [`computeDryLayout`][]
* [`getDryLayout`][]
* [`performResize`][]
* [`RenderWrap`][]
* [`RenderParagraph`][]

相關議題：

* [Issue 48679][]

相關 PR：

* [Fixes Intrinsics for RenderParagraph and RenderWrap][]

[`RenderBox`]: https://api.flutter.dev/flutter/rendering/RenderBox-class.html
[`RenderBox.computeMinIntrinsicWidth`]: https://api.flutter.dev/flutter/rendering/RenderBox/computeMinIntrinsicWidth.html
[`computeMinIntrinsicWidth`]: https://api.flutter.dev/flutter/rendering/RenderBox/computeMinIntrinsicWidth.html
[`computeDryLayout`]: https://api.flutter.dev/flutter/rendering/RenderBox/computeDryLayout.html
[`getDryLayout`]: https://api.flutter.dev/flutter/rendering/RenderBox/getDryLayout.html
[`performResize`]: https://api.flutter.dev/flutter/rendering/RenderBox/performResize.html
[`RenderWrap`]: https://api.flutter.dev/flutter/rendering/RenderWrap-class.html
[`RenderParagraph`]: https://api.flutter.dev/flutter/rendering/RenderParagraph-class.html

[Issue 48679]: https://github.com/flutter/flutter/issues/48679
[Fixes Intrinsics for RenderParagraph and RenderWrap]: https://github.com/flutter/flutter/pull/70656

