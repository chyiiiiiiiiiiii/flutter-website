---
title: 可滾動的 AlertDialog（不再被棄用）
description: AlertDialog 在內容溢出時應自動滾動。
---

{% render docs/breaking-changes.md %}

## 摘要

:::note
`AlertDialog.scrollable` 不再被棄用，因為沒有向後相容的方法能讓 `AlertDialog` 預設為可滾動。
相反地，此參數將會保留，如果你希望 `AlertDialog` 可滾動，可以將 `scrollable` 設為 true。
:::

現在，當 `AlertDialog` 內容溢出時，會自動支援滾動。

## 背景說明

在此變更之前，
當 `AlertDialog` 元件（Widget）的內容過高時，
畫面會發生溢出，導致內容被裁切。
這會造成以下問題：

* 被裁切的內容無法被檢視。
* 大多數提示對話框（alert dialogs）會在內容下方放置按鈕，讓使用者執行操作。
  若內容溢出並遮蔽了按鈕，
  使用者可能不會注意到這些按鈕的存在。

## 變更說明

先前的作法是將標題與內容元件
依序放在 `Column` 元件中。

```dart
Column(
  mainAxisSize: MainAxisSize.min,
  crossAxisAlignment: CrossAxisAlignment.stretch,
  children: <Widget>[
    if (title != null)
      Padding(
        padding: titlePadding ?? EdgeInsets.fromLTRB(24, 24, 24, content == null ? 20 : 0),
        child: DefaultTextStyle(
          style: titleTextStyle ?? dialogTheme.titleTextStyle ?? theme.textTheme.title,
          child: Semantics(
          child: title,
          namesRoute: true,
          container: true,
          ),
        ),
      ),
    if (content != null)
      Flexible(
        child: Padding(
        padding: contentPadding,
        child: DefaultTextStyle(
          style: contentTextStyle ?? dialogTheme.contentTextStyle ?? theme.textTheme.subhead,
          child: content,
        ),
      ),
    ),
    // ...
  ],
);
```

新的做法會將這兩個元件（Widgets）包裹在`SingleChildScrollView`中，並放置於按鈕區塊（button section）之上，使這兩個元件成為同一個可滾動區域的一部分，並讓按鈕區塊顯示在對話框（dialog）底部。

```dart
Column(
  mainAxisSize: MainAxisSize.min,
  crossAxisAlignment: CrossAxisAlignment.stretch,
  children: <Widget>[
    if (title != null || content != null)
      SingleChildScrollView(
        child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
         children: <Widget>[
           if (title != null)
             titleWidget,
             if (content != null)
             contentWidget,
         ],
       ),
     ),
   // ...
  ],
),
```

## 遷移指南

你可能會因這項變更而遇到以下問題：

**由於新增了 `SingleChildScrollView`，語意測試（semantics tests）可能會失敗。**
: 針對 `Talkback` 和 `VoiceOver` 功能進行手動測試，
  顯示它們仍然維持與先前相同（正確）的行為。

**Golden tests 可能會失敗。**
: 此變更可能導致（原本通過的）golden tests 出現差異，
  因為 `SingleChildScrollView` 現在同時巢狀了標題和內容元件（Widgets）。
  有些 Flutter 專案會透過擷取 Flutter 除錯模式下語意節點的 golden 來建立語意測試。

  <br>任何反映滾動容器新增的語意 golden 更新都是預期中的，這些差異應該是安全可接受的。

  範例產生的 Semantics 樹如下：

```plaintext
flutter:        ├─SemanticsNode#30 <-- SingleChildScrollView
flutter:          │ flags: hasImplicitScrolling
flutter:          │ scrollExtentMin: 0.0
flutter:          │ scrollPosition: 0.0
flutter:          │ scrollExtentMax: 0.0
flutter:          │
flutter:          ├─SemanticsNode#31 <-- title
flutter:          │   flags: namesRoute
flutter:          │   label: "Hello"
flutter:          │
flutter:          └─SemanticsNode#32 <-- contents
flutter:              label: "Huge content"
```

**由於滾動視圖（scroll view），可能會導致版面配置變化。**
：如果對話框（dialog）原本就有溢出問題，
  這項變更將修正該問題。
  這種版面配置的變化是預期中的。

  <br>如果在`AlertDialog.content`中巢狀了`SingleChildScrollView`，
  只要是有意為之，應該都能正常運作；
  但如果並非預期，建議移除，
  以免造成混淆。

遷移前的程式碼：

```dart
AlertDialog(
  title: Text(
    'Very, very large title that is also scrollable',
    textScaleFactor: 5,
  ),
  content: SingleChildScrollView( // won't be scrollable
    child: Text('Scrollable content', textScaleFactor: 5),
  ),
  actions: <Widget>[
    TextButton(child: Text('Button 1'), onPressed: () {}),
    TextButton(child: Text('Button 2'), onPressed: () {}),
  ],
)
```

遷移後的程式碼：

```dart
AlertDialog(
  title: Text('Very, very large title', textScaleFactor: 5),
  content: Text('Very, very large content', textScaleFactor: 5),
  actions: <Widget>[
    TextButton(child: Text('Button 1'), onPressed: () {}),
    TextButton(child: Text('Button 2'), onPressed: () {}),
  ],
)
```

## 時程

納入版本：1.16.3<br>  
正式版本：1.17

## 參考資料

設計文件：

* [Scrollable `AlertDialog`][Scrollable `AlertDialog`]

API 文件：

* [`AlertDialog`][`AlertDialog`]

相關議題：

* [在最大無障礙字型大小下發生 Overflow 例外][Overflow exceptions with maximum accessibility font size]

相關 PR：

* [更新至 `AlertDialog.scrollable`][Update to `AlertDialog.scrollable`]
* [首次嘗試實作 scrollable `AlertDialog`][Original attempt to implement scrollable `AlertDialog`]
* [回復首次嘗試實作 scrollable `AlertDialog`][Revert of original attempt to implement scrollable `AlertDialog`]


[`AlertDialog`]: {{site.api}}/flutter/material/AlertDialog-class.html
[Original attempt to implement scrollable `AlertDialog`]: {{site.repo.flutter}}/pull/43226
[Overflow exceptions with maximum accessibility font size]: {{site.repo.flutter}}/issues/42696
[Revert of original attempt to implement scrollable `AlertDialog`]: {{site.repo.flutter}}/pull/44003
[Scrollable `AlertDialog`]: /go/scrollable-alert-dialog
[Update to `AlertDialog.scrollable`]: {{site.repo.flutter}}/pull/45079
