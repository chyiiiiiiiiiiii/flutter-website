---
title: Bottom Navigation Title To Label
description: >
  已棄用 BottomNavigationBarItem 的 title（Widget），
  改為使用 label（String）。
---

{% render docs/breaking-changes.md %}

## 摘要

`BottomNavigationBarItem.title` 會顯示棄用警告，
或在程式碼中引用時已不存在。

## 背景

`BottomNavigationBarItem` 的 `title` 參數已被棄用，
改為使用 `label`。這項變更是為了在文字縮放比例增加時，
提升 `BottomNavigationBar` 的使用者體驗。現在，在 `BottomNavigationBar`
中的項目於長按時會顯示提示（tooltip）。
要實現這個功能，`BottomNavigationBarItem` 需要有 `String` 參數。

## 變更說明

`BottomNavigationBarItem` 類別新增了 `title` 參數，
其型別為 `Widget`。這使得
`BottomNavigationBar` 無法顯示 `Tooltip` 元件（Widgets），
這項變更是為了提升無障礙體驗而必須進行的。
現在，BottomNavigationBar 不再建立 `BottomNavigationBarItem.title`
元件，而是將 `BottomNavigationBarItem.label` 包裝在 Text 元件（Text Widget）中並進行建立。

## 遷移指南

遷移前的程式碼：

```dart
BottomNavigationBarItem(
  icon: Icons.add,
  title: Text('add'),
)
```

遷移後的程式碼：

```dart
BottomNavigationBarItem(
  icon: Icons.add,
  label: 'add',
)
```

## 時程

引入版本：1.22.0<br>  
進入穩定版本：2.0.0

## 參考資料

API 文件：

* [`BottomNavigationBarItem`][`BottomNavigationBarItem`]

相關 PR：

* [PR 60655][PR 60655]：清理 hero controller 範圍
* [PR 59127][PR 59127]：更新 BottomNavigationBar，支援長按顯示工具提示（tooltip）。

重大變更提案：

* [Breaking Change: Bottom Navigation Item Title][Breaking Change: Bottom Navigation Item Title]


[`BottomNavigationBarItem`]: {{site.api}}/flutter/widgets/BottomNavigationBarItem-class.html
[Breaking Change: Bottom Navigation Item Title]: /go/bottom-navigation-bar-title-deprecation
[PR 59127]: {{site.repo.flutter}}/pull/59127
[PR 60655]: {{site.repo.flutter}}/pull/60655
