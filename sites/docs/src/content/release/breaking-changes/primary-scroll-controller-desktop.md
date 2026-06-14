---
title: 桌面端預設的 `PrimaryScrollController`
description: >
  `PrimaryScrollController` 將不再自動附加到桌面端的垂直 `ScrollView`。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`PrimaryScrollController` API 已更新，現在不會再自動附加到桌面平台上的垂直 `ScrollView`。

## 背景說明

在此變更之前，如果 `ScrollView` 的滾動方向為 `Axis.vertical`，且尚未提供 `ScrollController`，則 `ScrollView.primary` 會預設為 true。這讓常見的 UI 模式（例如 iOS 上的捲動至頂功能）在 Flutter 應用程式中能夠開箱即用。然而，在桌面端，這個預設值經常導致以下的 assertion 錯誤：

```plaintext
ScrollController attached to multiple ScrollViews.
```

雖然行動應用程式通常一次只顯示一個 `ScrollView`，
但桌面 UI 模式則更常同時並排顯示多個 `ScrollView`。
先前的 `PrimaryScrollController` 實作方式與這種模式產生衝突，
導致經常出現無法提供幫助的錯誤訊息。
為了解決這個問題，`PrimaryScrollController` 已經新增了額外的參數，
同時針對多個依賴它的元件 (Widget) 提供了更完善的錯誤訊息。

## 變更說明

先前的 `ScrollView` 實作方式，
會讓所有沒有 `ScrollController` 的垂直 `ScrollView`，在所有平台上，
`primary` 預設為 true。
這個預設行為並不總是很明確，
特別是因為它與 `PrimaryScrollController` 本身是分開的。

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
當 `primary` 為 null 且未提供 `ScrollController` 時，`ScrollView`
會查找 `PrimaryScrollController`，並改為呼叫 `shouldInherit` 來判斷
指定的 `ScrollView` 是否應該使用 `PrimaryScrollController`。

`PrimaryScrollController` 類別的新成員，
`automaticallyInheritForPlatforms` 和 `scrollDirection`，會在
`shouldInherit` 中被評估，讓使用者能更清楚且可控地掌握
`PrimaryScrollController` 的行為。

預設情況下，行動裝置平台會維持向下相容性。
`PrimaryScrollController.shouldInherit` 對於垂直的
`ScrollView` 會回傳 true。在桌面端，預設則回傳 false。

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

若要變更預設行為，使用者可以將 `ScrollView.primary` 設為 true 或 false，以明確管理個別 `ScrollView` 的 `PrimaryScrollController`。
針對多個 `ScrollView` 之間的行為，現在可以透過設定特定平台，以及偏好繼承的滾動方向，來設定 `PrimaryScrollController`。

使用 `PrimaryScrollController` 的元件 (Widget)，例如 `NestedScrollView`、`Scrollbar` 和 `DropdownMenuButton`，其現有功能將不受影響。像 iOS 的 scroll-to-top 這類功能也會如預期般運作，無需進行任何遷移。

`ScrollAction` 以及桌面上的 `ScrollIntent` 是唯一受此變更影響且需要遷移的類別。預設情況下，若目前的 `Focus` 包含於 `Scrollable` 中，則會使用 `PrimaryScrollController` 來執行備援的鍵盤滾動 `Shortcuts`。由於在桌面平台上並排顯示多個 `ScrollView` 十分常見，因此 Flutter 無法自行決定「此畫面中哪一個 `ScrollView` 應該是主要的，並接收鍵盤滾動操作？」

若在此變更前存在多個 `ScrollView`，也會拋出相同的斷言（`ScrollController attached to multiple ScrollViews.`）。
現在，在桌面平台上，使用者需要指定 `primary: true`，以指定哪一個 `ScrollView` 作為備援，接收未處理的鍵盤 `Shortcuts`。

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
於穩定版發佈：3.3

## 參考資料

API 文件：

* [`PrimaryScrollController`][]
* [`ScrollView`][]
* [`ScrollAction`][]
* [`ScrollIntent`][]
* [`Scrollbar`][]

設計文件：

* [Updating PrimaryScrollController][]

相關議題：

* [Issue #100264][]

相關 PR：

* [Updating PrimaryScrollController for Desktop][]

[`PrimaryScrollController`]: {{site.api}}/flutter/widgets/PrimaryScrollController-class.html
[`ScrollView`]: {{site.api}}/flutter/widgets/ScrollView-class.html
[`ScrollAction`]: {{site.api}}/flutter/widgets/ScrollAction-class.html
[`ScrollIntent`]: {{site.api}}/flutter/widgets/ScrollIntent-class.html
[`Scrollbar`]: {{site.api}}/flutter/material/Scrollbar-class.html
[Updating PrimaryScrollController]: https://docs.google.com/document/d/12OQx7h8UQzzAi0Kxh-saDC2dg7h2fghCCzwJ0ysPmZE/edit?usp=sharing&resourcekey=0-ATO-1Er3HO2HITm59I0IdA
[Issue #100264]: {{site.repo.flutter}}/issues/100264
[Updating PrimaryScrollController for Desktop]: {{site.repo.flutter}}/pull/102099
