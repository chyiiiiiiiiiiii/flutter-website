---
title: 停用 `OverlayPortal.targetsRootOverlay`
description: >-
  了解 Flutter 中 OverlayPortal 的變更。
---

{% render docs/breaking-changes.md %}

## 摘要

`OverlayPortal.targetsRootOverlay` 屬性已被停用，並由 `overlayLocation` 取代。

## 背景說明

在 OverlayPortal 的預設建構函式中新增了一個參數 `overlayLocation`，用來控制 overlay 子元件的渲染位置。因此，建構函式 `OverlayPortal.targetsRootOverlay` 已不再具有實用價值。

## 變更說明

`OverlayPortal.targetsRootOverlay` 已被停用。

## 遷移指南

如果你正在使用 `OverlayPortal.targetsRootOverlay`，可以改用 `OverlayPortal` 並搭配 `overlayLocation`。

### 情境 1：簡單案例

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

```dart
Widget build(BuildContext context) {
  return OverlayPortal(
    overlayLocation: OverlayChildLocation.rootOverlay,
    controller: myController,
    overlayChildBuilder: _myBuilder,
    child: myChild,
  );
}
```

## 時程

納入版本：3.35.0-0.0.pre<br>  
正式版本：待定

## 參考資料

API 文件：

* [`OverlayPortal`][`OverlayPortal`]

相關議題：

* [Issue 168785][Issue 168785]

相關 PR：

* [PR 174239][PR 174239]

[`OverlayPortal`]: {{site.api}}/flutter/widgets/OverlayPortal-class.html
[Issue 168785]: {{site.repo.flutter}}/issues/168785
[PR 174239]: {{site.repo.flutter}}/pull/174239
