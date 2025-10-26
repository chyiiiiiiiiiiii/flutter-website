---
title: 桌面端預設的 `PrimaryScrollController`
description: >
  `PrimaryScrollController` 將不再自動附加到
  桌面端的垂直 `ScrollView`。
---

{% render docs/breaking-changes.md %}

## 摘要

`PrimaryScrollController` API 已更新，現在在桌面平台上
不會再自動附加到垂直的 `ScrollView`。

## 背景說明

在此變更之前，如果 `ScrollView` 具有 `Axis.vertical` 滾動方向且尚未提供 `ScrollController`，
則 `ScrollView.primary` 會預設為 true。這使得常見的 UI 模式（例如 iOS 上的
捲動至頂功能）能夠在 Flutter 應用程式中直接運作。
但在桌面端，這個預設值經常導致以下斷言錯誤：

```plaintext
ScrollController attached to multiple ScrollViews.
```

雖然行動應用程式通常一次只顯示一個`ScrollView`，
但桌面 UI 模式更傾向於同時並排顯示多個`ScrollView`。
先前的`PrimaryScrollController`實作方式與這種模式有所衝突，導致出現經常無法提供幫助的錯誤訊息。為了解決這個問題，
`PrimaryScrollController`已經新增了額外的參數，並且針對多個依賴它的元件（Widgets）改善了錯誤訊息的提示。

## 變更說明

先前的`ScrollView`實作方式，會導致所有沒有`ScrollController`的垂直`ScrollView`，
在所有平台上，預設`primary`為 true。這個預設行為並不總是很明確，
特別是因為它與`PrimaryScrollController`本身是分開的。

```dart
// Previously, this ListView would always result in primary being true,
// and attached to the PrimaryScrollController on all platforms.
Scaffold(
  body: ListView.builder(
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    }
  ),
);
```

此實作將 `ScrollView.primary` 改為可為 null，並將預設決策邏輯移至 `PrimaryScrollController`。
當 `primary` 為 null，且未提供 `ScrollController` 時，`ScrollView`
會查找 `PrimaryScrollController`，並改為呼叫 `shouldInherit`，
以判斷指定的 `ScrollView` 是否應該使用 `PrimaryScrollController`。

`PrimaryScrollController` 類別的新成員
`automaticallyInheritForPlatforms` 和 `scrollDirection`，會在
`shouldInherit` 中進行評估，讓使用者能更清楚且可控地掌握
`PrimaryScrollController` 的行為。

預設情況下，行動裝置平台會維持向下相容性。
對於垂直 `ScrollView`，`PrimaryScrollController.shouldInherit` 會回傳 true。
在桌面端，預設則回傳 false。

```dart
// Only on mobile platforms will this attach to the PrimaryScrollController by
// default.
Scaffold(
  body: ListView.builder(
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    }
  ),
);
```

若要變更預設行為，使用者可以將`ScrollView.primary`設為 true 或 false，以明確管理單一`ScrollView`的`PrimaryScrollController`。若需跨多個`ScrollView`調整行為，現在可以透過設定特定平台以及偏好繼承的捲動方向來設定`PrimaryScrollController`。

使用`PrimaryScrollController`的元件（Widgets），例如`NestedScrollView`、`Scrollbar`和`DropdownMenuButton`，現有功能將不受影響。像是 iOS 的「點擊狀態列回頂」等功能，也會如預期運作，無需進行遷移。

本次變更僅影響`ScrollAction`與桌面端的`ScrollIntent`這兩個類別，需進行遷移。預設情況下，若目前的`Focus`位於`Scrollable`之內，則會使用`PrimaryScrollController`來執行備援的鍵盤捲動`Shortcuts`。由於在桌面平台上，並排顯示多個`ScrollView`是常見情境，因此 Flutter 無法自動判斷「此畫面中哪一個`ScrollView`應該是主要元件並接收鍵盤捲動操作？」

若在此變更前已有多個`ScrollView`存在，則同樣會拋出（`ScrollController attached to multiple ScrollViews.`）這個 assertion。
現在，在桌面平台上，使用者需要明確指定`primary: true`，以標示哪一個`ScrollView`作為備援，接收未處理的鍵盤`Shortcuts`。

## 遷移指南

遷移前的程式碼：

```dart
// These side-by-side ListViews would throw errors from Scrollbars and
// ScrollActions previously due to the PrimaryScrollController.
Scaffold(
  body: LayoutBuilder(
    builder: (context, constraints) {
      return Row(
        children: [
          SizedBox(
            height: constraints.maxHeight,
            width: constraints.maxWidth / 2,
            child: ListView.builder(
              itemBuilder: (BuildContext context, int index) {
                return Text('List 1 - Item $index');
              }
            ),
          ),
          SizedBox(
            height: constraints.maxHeight,
            width: constraints.maxWidth / 2,
            child: ListView.builder(
              itemBuilder: (BuildContext context, int index) {
                return Text('List 2 - Item $index');
              }
            ),
          ),
        ]
      );
    },
  ),
);
```

遷移後的程式碼：

```dart
// These side-by-side ListViews will no longer throw errors, but for
// default ScrollActions, one will need to be designated as primary.
Scaffold(
  body: LayoutBuilder(
    builder: (context, constraints) {
      return Row(
        children: [
          SizedBox(
            height: constraints.maxHeight,
            width: constraints.maxWidth / 2,
            child: ListView.builder(
              // This ScrollView will use the PrimaryScrollController
              primary: true,
              itemBuilder: (BuildContext context, int index) {
                return Text('List 1 - Item $index');
              }
            ),
          ),
          SizedBox(
            height: constraints.maxHeight,
            width: constraints.maxWidth / 2,
            child: ListView.builder(
              itemBuilder: (BuildContext context, int index) {
                return Text('List 2 - Item $index');
              }
            ),
          ),
        ]
      );
    },
  ),
);
```

## 時程

合併於版本：3.3.0-0.0.pre<br>  
於穩定版釋出：3.3

## 參考資料

API 文件：

* [`PrimaryScrollController`][`PrimaryScrollController`]
* [`ScrollView`][`ScrollView`]
* [`ScrollAction`][`ScrollAction`]
* [`ScrollIntent`][`ScrollIntent`]
* [`Scrollbar`][`Scrollbar`]

設計文件：

* [Updating PrimaryScrollController][Updating PrimaryScrollController]

相關議題：

* [Issue #100264][Issue #100264]

相關 PR：

* [Updating PrimaryScrollController for Desktop][Updating PrimaryScrollController for Desktop]

[`PrimaryScrollController`]: {{site.api}}/flutter/widgets/PrimaryScrollController-class.html
[`ScrollView`]: {{site.api}}/flutter/widgets/ScrollView-class.html
[`ScrollAction`]: {{site.api}}/flutter/widgets/ScrollAction-class.html
[`ScrollIntent`]: {{site.api}}/flutter/widgets/ScrollIntent-class.html
[`Scrollbar`]: {{site.api}}/flutter/material/Scrollbar-class.html
[Updating PrimaryScrollController]: https://docs.google.com/document/d/12OQx7h8UQzzAi0Kxh-saDC2dg7h2fghCCzwJ0ysPmZE/edit?usp=sharing&resourcekey=0-ATO-1Er3HO2HITm59I0IdA
[Issue #100264]: {{site.repo.flutter}}/issues/100264
[Updating PrimaryScrollController for Desktop]: {{site.repo.flutter}}/pull/102099
