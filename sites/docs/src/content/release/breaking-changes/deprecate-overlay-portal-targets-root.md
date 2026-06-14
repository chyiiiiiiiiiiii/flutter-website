---
title: 棄用 `OverlayPortal.targetsRootOverlay` 並在 `Overlay.of` 中強制套用 `LookupBoundary`
description: >-
  了解 Flutter 中 OverlayPortal 與 Overlay 的相關變更。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`OverlayPortal.targetsRootOverlay` 屬性已被棄用，
並以 `overlayLocation` 取代。

`Overlay.of` 與 `Overlay.maybeOf` 現在會遵守 `LookupBoundary`。

## 背景

`overlayLocation` 參數已新增至
`OverlayPortal` 的預設建構子，用於
控制 overlay 子元素的渲染位置。
因此，`OverlayPortal.targetsRootOverlay` 建構子
已不再有使用價值。

為了防止 `OverlayEntry` 在不知情的情況下跨越多視圖邊界插入，
`Overlay.of` 現在會遵守 `LookupBoundary`。

## 變更說明

`OverlayPortal.targetsRootOverlay` 建構子已被棄用。

`Overlay.of` 與 `Overlay.maybeOf` 將不再查找超過 `LookupBoundary` 的範圍。

## 遷移指南

若您正在使用 `OverlayPortal.targetsRootOverlay`，
請改用帶有 `overlayLocation` 的 `OverlayPortal`。

### 情況一：簡單情況

遷移前的程式碼：

```dart
Widget build(BuildContext context) {
  return OverlayPortal.targetsRootOverlay(
    controller: myController,
    overlayChildBuilder: _myBuilder,
    child: myChild,
  );
}
```

遷移後的程式碼：

```dart highlightLines=3
Widget build(BuildContext context) {
  return OverlayPortal(
    overlayLocation: OverlayChildLocation.rootOverlay,
    controller: myController,
    overlayChildBuilder: _myBuilder,
    child: myChild,
  );
}
```

若您希望 `Overlay.of` 與 `Overlay.maybeOf` 能查找超過 `LookupBoundary` 的範圍，
請改用 `findAncestorStateOfType`。

遷移前的程式碼：

```dart
Widget build(BuildContext context) {
  Overlay.of(context);
  // ...
}
```

遷移後的程式碼：

```dart
Widget build(BuildContext context) {
  context.findAncestorStateOfType<OverlayState>();
  // ...
}
```

## 時間軸

已合併至版本：3.38.0-0.1.pre<br>
穩定版發布：3.38

## 參考資料

API 文件：

* [`OverlayPortal`][]
* [`Overlay.of`][]
* [`Overlay.maybeOf`][]
* [`LookupBoundary`][]

相關 Issue：

* [Issue 168785][]

相關 PR：

* [PR 174239][]

[`OverlayPortal`]: {{site.api}}/flutter/widgets/OverlayPortal-class.html
[`Overlay.of`]: {{site.api}}/flutter/widgets/Overlay/of.html
[`Overlay.maybeOf`]: {{site.api}}/flutter/widgets/Overlay/maybeOf.html
[`LookupBoundary`]: {{site.api}}/flutter/widgets/LookupBoundary-class.html
[Issue 168785]: {{site.repo.flutter}}/issues/168785
[PR 174239]: {{site.repo.flutter}}/pull/174239
