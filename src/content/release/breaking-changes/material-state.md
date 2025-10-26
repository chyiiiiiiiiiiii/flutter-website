---
title: 將 MaterialState 更名為 WidgetState
description: >-
  MaterialState 及其相關 API
  已從 Material 函式庫中移除，並更名為
  WidgetState。
---

{% render docs/breaking-changes.md %}

## 摘要

`MaterialState` 及其相關 API 已從 Material 函式庫中移除，並更名為 `WidgetState`。

## 背景

過去，`MaterialState` 提供了處理元件（Widget）可能具有的多種狀態（如「懸停」、「聚焦」與「停用」）的邏輯。由於這項功能在 Material 函式庫之外也很有用，例如基礎元件層（Widgets layer）與 Cupertino，因此決定將其移出 Material。作為遷移的一部分，並為了避免未來混淆，不同的 `MaterialState` 類別已更名為 `WidgetState`。兩者的行為完全相同。

| 變更前                          | 變更後                           |
|---------------------------------|-------------------------------|
| `MaterialState`                 | `WidgetState`                 |
| `MaterialStatePropertyResolver` | `WidgetStatePropertyResolver` |
| `MaterialStateColor`            | `WidgetStateColor`            |
| `MaterialStateMouseCursor`      | `WidgetStateColorMouseCursor` |
| `MaterialStateBorderSide`       | `WidgetStateBorderSide`       |
| `MaterialStateOutlinedBorder`   | `WidgetStateOutlinedBorder`   |
| `MaterialStateTextStyle`        | `WidgetStateTextStyle`        |
| `MaterialStateProperty`         | `WidgetStateProperty`         |
| `MaterialStatePropertyAll`      | `WidgetStatePropertyAll`      |
| `MaterialStatesController`      | `WidgetStatesController`      |

`MaterialStateOutlineInputBorder` 和 `MaterialStateUnderlineInputBorder` 這兩個類別則保留在 Material 函式庫中，沒有 `WidgetState` 的對應版本，因為它們僅適用於 Material Design。

## 遷移指南

提供了 [Flutter fix][Flutter fix]，可協助將 `MaterialState` 類別遷移至 `WidgetState`。

要進行遷移，請將 `MaterialState` 替換為 `WidgetState`。

遷移前的程式碼：

```dart
MaterialState selected = MaterialState.selected;

final MaterialStateProperty<Color> backgroundColor;

class _MouseCursor extends MaterialStateMouseCursor{
  const _MouseCursor(this.resolveCallback);

  final MaterialPropertyResolver<MouseCursor?> resolveCallback;

  @override
  MouseCursor resolve(Set<MaterialState> states) => resolveCallback(states) ?? MouseCursor.uncontrolled;
}

BorderSide side = MaterialStateBorderSide.resolveWith((Set<MaterialState> states) {
  if (states.contains(MaterialState.selected)) {
    return const BorderSide(color: Colors.red);
  }
  return null;
});
```

遷移後的程式碼：

```dart
WidgetState selected = WidgetState.selected;

final WidgetStateProperty<Color> backgroundColor;

class _MouseCursor extends WidgetStateMouseCursor{
  const _MouseCursor(this.resolveCallback);

  final WidgetPropertyResolver<MouseCursor?> resolveCallback;

  @override
  MouseCursor resolve(Set<WidgetState> states) => resolveCallback(states) ?? MouseCursor.uncontrolled;
}

BorderSide side = WidgetStateBorderSide.resolveWith((Set<WidgetState> states) {
  if (states.contains(WidgetState.selected)) {
    return const BorderSide(color: Colors.red);
  }
  return null;
});
```

## 時程

合併於版本：3.21.0-11.0.pre<br>  
正式版釋出：3.22.0

## 參考資料

相關議題：

* [Create widgets level support for State][Create widgets level support for State]

相關 PR：

* [Widget State Properties][Widget State Properties]

[Create widgets level support for State]: {{site.repo.flutter}}/issues/138270
[Flutter fix]: /tools/flutter-fix
[Widget State Properties]: {{site.repo.flutter}}/pull/142151
