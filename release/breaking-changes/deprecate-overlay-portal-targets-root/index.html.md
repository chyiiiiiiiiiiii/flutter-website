# 棄用 `OverlayPortal.targetsRootOverlay` 並在 `Overlay.of` 中強制套用 `LookupBoundary`

> 了解 Flutter 中 OverlayPortal 與 Overlay 的相關變更。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


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

[`OverlayPortal`]: https://api.flutter.dev/flutter/widgets/OverlayPortal-class.html
[`Overlay.of`]: https://api.flutter.dev/flutter/widgets/Overlay/of.html
[`Overlay.maybeOf`]: https://api.flutter.dev/flutter/widgets/Overlay/maybeOf.html
[`LookupBoundary`]: https://api.flutter.dev/flutter/widgets/LookupBoundary-class.html
[Issue 168785]: https://github.com/flutter/flutter/issues/168785
[PR 174239]: https://github.com/flutter/flutter/pull/174239

