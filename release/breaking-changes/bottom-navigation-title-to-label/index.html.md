# Bottom Navigation Title To Label

> 已棄用 BottomNavigationBarItem 的 title（一個元件 (Widget)）， 改為使用 label（一個 String）。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`BottomNavigationBarItem.title` 會顯示棄用警告，
或在程式碼中引用時已不存在。

## 背景

`BottomNavigationBarItem` 的 `title` 參數已被棄用，
改為使用 `label`。這項變更是為了在文字縮放比例增加時，
提升 `BottomNavigationBar` 的使用者體驗。現在，`BottomNavigationBar`
中的項目於長按時會顯示工具提示（tooltip）。
要實現這個功能，`BottomNavigationBarItem` 需要有 `String` 參數。

## 變更說明

`BottomNavigationBarItem` 類別具有 `title` 參數，
其型別為 `Widget`。這使得
`BottomNavigationBar` 無法顯示 `Tooltip` 元件，
而這項變更是為了提升無障礙體驗所必須進行的。
現在，`BottomNavigationBar` 不再建置 `BottomNavigationBarItem.title`
元件，而是將 `BottomNavigationBarItem.label` 包裝在 Text 元件中並進行建置。

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

* [`BottomNavigationBarItem`][]

相關 PR：

* [PR 60655][]：清理 hero controller 範圍
* [PR 59127][]：更新 BottomNavigationBar，支援長按顯示工具提示。

重大變更提案：

* [Breaking Change: Bottom Navigation Item Title][]


[`BottomNavigationBarItem`]: https://api.flutter.dev/flutter/widgets/BottomNavigationBarItem-class.html
[Breaking Change: Bottom Navigation Item Title]: /go/bottom-navigation-bar-title-deprecation
[PR 59127]: https://github.com/flutter/flutter/pull/59127
[PR 60655]: https://github.com/flutter/flutter/pull/60655

