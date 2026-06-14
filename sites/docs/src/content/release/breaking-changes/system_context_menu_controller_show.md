---
title: SystemContextMenuController.show 已淘汰
description: >-
  `SystemContextMenuController` 的 `show` 方法已被淘汰，並由其 `showWithItems` 方法取代。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`SystemContextMenuController.show` 已被淘汰。相同的功能現在可以透過將呼叫 `SystemContextMenu.getDefaultItems` 的結果傳遞給 `SystemContextMenuController.showWithItems` 來實現。

## 背景

iOS 原生繪製的 `SystemContextMenu` 功能最初加入時，並沒有辦法控制選單中顯示哪些項目。平台會根據當前的 `TextInputConnection` 來決定要顯示哪些項目。

這種做法的問題在於，「自動填充（Autofill）」按鈕經常會被顯示出來，但 Flutter 並沒有辦法對這個按鈕做出回應。因此在許多情況下，使用者會看到一個「自動填充（Autofill）」按鈕，但點擊後沒有任何反應，而 Flutter 應用程式開發者也無法隱藏這個按鈕。

這個問題已透過引入新方法 `SystemContextMenuController.showWithItems` 得到解決，該方法要求傳入一個 `items` 的清單。

如果開發者對於顯示哪些項目沒有特別偏好，可以呼叫新方法 `SystemContextMenu.getDefaultItems`，根據給定的 `EditableTextState` 取得預設項目。例如，如果 `EditableTextState` 表示目前沒有任何選取內容，則 **Copy**（複製）按鈕就不會包含在內，因為複製功能需要有選取內容才能使用。

## 遷移指南

大多數使用者都是透過 `SystemContextMenu` 元件（Widget）來使用系統內容選單，在這種情況下不需要做任何更動。`SystemContextMenu` 元件會自動在底層取得預設項目。

不需要進行遷移：

```dart
class _MyWidgetState extends State<MyWidget> {
  @override
  Widget build(BuildContext context) {
    TextField(
      contextMenuBuilder: (BuildContext context, EditableTextState editableTextState) {
        return SystemContextMenu.editableText(
          editableTextState: editableTextState,
        );
      }
    );
  }
}
```

對於直接使用 `SystemContextMenuController` 的進階使用者，請遷移至新的方法 `SystemContextMenuController.showWithItems`。
預設值可以從 `SystemContextMenu.getDefaultItems` 取得，該預設值是一個 `IOSSystemContextMenuItem` 的清單，
可透過 `IOSSystemContextMenuItem.getData` 轉換為 `showWithItems` 所需的格式。

遷移前的程式碼如下：

```dart
_controller.show(selectionRect);
```

遷移後的程式碼：

```dart
final List<IOSSystemContextMenuItem> defaultItems =
    SystemContextMenu.getDefaultItems(editableTextState);
final WidgetsLocalizations localizations =
    WidgetsLocalizations.of(context);
final List<IOSSystemContextMenuItemData> defaultItemData =
    defaultItems
        .map((IOSSystemContextMenuItem item) =>
            item.getData(localizations))
        .toList();
_controller.showWithItems(selectionRect, defaultItemData);
```

## 時程

合併於版本：3.29.0-0.3.pre<br>
正式版推出：3.32

## 參考資料

API 文件：

* [`TextInputConnection`][]
* [`SystemContextMenuController.show`][]
* [`SystemContextMenuController.showWithItems`][]
* [`SystemContextMenu`][]

相關議題：

* [Flutter 應支援 iOS 15 的 Secure Paste 功能][Flutter should support iOS 15's Secure Paste feature]

相關 PR：

* [Secure paste 里程碑 2][Secure paste milestone 2]
* [iOS secure_paste 根據 framework 傳送的資訊顯示選單項目][ios secure_paste show menu item based on info sent from framework]
* [原生 iOS context menu][Native ios context menu]
* [ios_edit_menu 新增原生編輯選單][ios_edit_menu add native edit menu]

[`TextInputConnection`]: {{site.api}}/flutter/services/TextInputConnection-class.html
[`SystemContextMenuController.show`]: {{site.api}}/flutter/services/SystemContextMenuController/show.html
[`SystemContextMenuController.showWithItems`]: {{site.api}}/flutter/services/SystemContextMenuController/showWithItems.html
[`SystemContextMenu`]: {{site.api}}/flutter/services/SystemContextMenu.html

[Secure paste milestone 2]: {{site.repo.flutter}}/pull/159013
[ios secure_paste show menu item based on info sent from framework]: {{site.repo.engine}}/pull/161103
[Native ios context menu]: {{site.repo.flutter}}/pull/143002
[ios_edit_menu add native edit menu]: {{site.repo.flutter}}/pull/50095
[Flutter should support iOS 15's Secure Paste feature]: {{site.repo.flutter}}/issues/103163
