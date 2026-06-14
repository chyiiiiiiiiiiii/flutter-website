---
title: 已淘汰的 ExpansionTileController
description: >
  `ExpansionTileController` 已被淘汰，並由 `ExpansibleController` 取代。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`ExpansionTileController` 已被淘汰。相同的功能現在可以透過 `ExpansibleController` 來實現。

## 背景

`ExpansionTileController` 可用於以程式方式展開與收合 `ExpansionTile`。元件 (Widget) 函式庫中新增了一個新的 `Expansible` 元件，其包含展開與收合的邏輯，且不再綁定於 Material 函式庫。`ExpansibleController` 補足了 `Expansible`，並且擁有與 `ExpansionTileController` 相同的功能。此外，`ExpansibleController` 也支援在展開狀態 (state) 變更時新增與通知監聽器。

當應用程式在 debug 模式下使用 `ExpansionTileController` 時，會顯示以下錯誤訊息：「請改用 `ExpansibleController`。」。具體來說，這表示使用者應將 `ExpansionTileController` 的用法替換為 `ExpansibleController`。

## 遷移指南

要進行遷移，請將 `ExpansionTile` 的 `controller` 參數，從 `ExpansionTileController` 替換為 `ExpansibleController`。與 `ExpansionTileController` 不同，`ExpansibleController` 是一個 `ChangeNotifier`，因此請記得在不需要時釋放（dispose）新的 `ExpansibleController`。

遷移前的程式碼：

```dart
class _MyWidgetState extends State<MyWidget> {
  final ExpansionTileController controller = ExpansionTileController();

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      controller: controller,
    );
  }
}
```

遷移後的程式碼：

```dart
class _MyWidgetState extends State<MyWidget> {
  final ExpansibleController controller = ExpansibleController();

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      controller: controller,
    );
  }
}
```

## 時程

合併於版本：3.31.0-0.1.pre<br>
正式版發佈於：3.32

## 參考資料

API 文件：

* [`ExpansionTileController`][]
* [`ExpansibleController`][]
* [`ExpansionTile.controller`][]
* [`Expansible.controller`][]

相關議題：

* [ExpansionTile 與其 Cupertino 變體的程式碼共用][Codeshare between ExpansionTile and its Cupertino variant]
* [棄用 ExpansionTileController，改用 ExpansibleController][Deprecate ExpansionTileController in favor of ExpansibleController]

相關 PR：

* [引入 Expansible，作為 ExpansionTile 的基礎元件][Introduce Expansible, a base widget for ExpansionTile]
* [棄用 ExpansionTileController][Deprecate ExpansionTileController]

[`ExpansionTileController`]: {{site.api}}/flutter/material/ExpansionTileController-class.html
[`ExpansibleController`]: {{site.api}}/flutter/widgets/ExpansibleController-class.html
[`ExpansionTile.controller`]: {{site.api}}/flutter/material/ExpansionTile/controller.html
[`Expansible.controller`]: {{site.api}}/flutter/widgets/Expansible/controller.html

[Codeshare between ExpansionTile and its Cupertino variant]: {{site.repo.flutter}}/issues/163552
[Deprecate ExpansionTileController in favor of ExpansibleController]: {{site.repo.flutter}}/issues/165511
[Introduce Expansible, a base widget for ExpansionTile]: {{site.repo.flutter}}/pull/164049
[Deprecate ExpansionTileController]: {{site.repo.flutter}}/pull/166368
