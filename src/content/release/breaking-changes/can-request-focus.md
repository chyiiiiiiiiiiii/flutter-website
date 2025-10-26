---
title: TextField.canRequestFocus 已淘汰
description: >-
  TextField 的 canRequestFocus 參數已被淘汰，請改用其 FocusNode 的 canRequestFocus 參數。
---

{% render docs/breaking-changes.md %}

## 摘要

`TextField.canRequestFocus` 已被淘汰。
相同的功能可以透過設定 `TextField` 的 `FocusNode` 的 `canRequestFocus` 參數來達成。

## 背景

`TextField.canRequestFocus` 是為了支援 `DropdownMenu` 而新增的，
該元件有一個 `TextField`，有時並非可互動的。然而，這個功能其實可以透過設定 `TextField` 的 `FocusNode` 的 `canRequestFocus` 參數來實現。`DropdownMenu` 已經改採此做法，
其他使用情境也建議採用相同模式。

在 debug 模式下執行使用 `TextField.canRequestFocus` 的應用程式時，會顯示以下錯誤訊息：「請改用 `focusNode`。」。具體來說，這代表使用者應該在 `TextField.focusNode` 傳入 `FocusNode`，
並設定 `FocusNode.canRequestFocus` 參數。

## 移轉指南

移轉時，請移除 `TextField.canRequestFocus` 參數。建立一個 `FocusNode`，並將 `FocusNode.canRequestFocus` 參數設為所需的值，然後將其傳入 `TextField.focusNode`。

移轉前的程式碼：

```dart
class _MyWidgetState extends State<MyWidget> {
  @override
  Widget build(BuildContext context) {
    return TextField(
      canRequestFocus: false,
    );
  }
}
```

遷移後的程式碼：

```dart
class _MyWidgetState extends State<MyWidget> {
  final FocusNode _focusNode = FocusNode(canRequestFocus: false);

  @override
  Widget build(BuildContext context) {
    return TextField(
      focusNode: _focusNode,
    );
  }
}
```

## 時程

合併於版本：已回退，等待重新合併<br>  
在穩定版釋出：尚未

## 參考資料

API 文件：

* [`DropdownMenu`][`DropdownMenu`]
* [`FocusNode.canRequestFocus`][`FocusNode.canRequestFocus`]
* [`TextField.canRequestFocus`][`TextField.canRequestFocus`]
* [`TextField.focusNode`][`TextField.focusNode`]

相關議題：

* [當 canRequestFocus: false 時，TextField 的選取功能異常][Broken selection on TextField if canRequestFocus: false]
* [DropdownMenu 停用文字輸入][DropdownMenu Disable text input]

相關 PR：

* [為 DropdownMenu 新增 requestFocusOnTap][Add requestFocusOnTap to DropdownMenu]
* [以 TextField.focusNode.canRequestFocus 取代 TextField.canRequestFocus][Replace TextField.canRequestFocus with TextField.focusNode.canRequestFocus]

[`DropdownMenu`]: {{site.api}}/flutter/material/DropdownMenu-class.html
[`FocusNode.canRequestFocus`]: {{site.api}}/flutter/widgets/FocusNode/canRequestFocus.html
[`TextField.canRequestFocus`]: {{site.api}}/flutter/material/TextField/canRequestFocus.html
[`TextField.focusNode`]: {{site.api}}/flutter/material/TextField/focusNode.html

[Broken selection on TextField if canRequestFocus: false]: {{site.repo.flutter}}/issues/130011
[DropdownMenu Disable text input]: {{site.repo.flutter}}/issues/116587
[Replace TextField.canRequestFocus with TextField.focusNode.canRequestFocus]: {{site.repo.flutter}}/pull/130164
[Add requestFocusOnTap to DropdownMenu]: {{site.repo.flutter}}/pull/117504
