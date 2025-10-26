---
title: 預設多點觸控捲動
description: >
  ScrollBehaviors 現在會設定 Scrollables 如何回應
  多點觸控手勢。
---

{% render docs/breaking-changes.md %}

## 摘要

`ScrollBehavior` 現在允許或不允許捲動速度受到螢幕上指標數量的影響。`ScrollBehavior.multitouchDragStrategy` 預設會防止多個指標同時與可捲動元件互動時影響捲動速度。

## 背景說明

在此變更之前，每個指標拖曳 `Scrollable` 元件時，捲動速度都會增加。這種行為與在 Flutter 應用程式中與平台的預期互動不符。

現在，繼承的 `ScrollBehavior` 會根據 `ScrollBehavior.multitouchDragStrategy` 的設定，管理多個指標如何影響滾動元件 (Scrolling Widgets)。這個列舉型別 `MultitouchDragStrategy` 也可以設定為先前的行為。

## 變更說明

這項變更修正了用多根手指拖曳時，能夠意外提升捲動速度的問題。

如果您的應用程式依賴於先前的行為，您有多種方式可以控制與設定此功能。

- 擴充 `ScrollBehavior`、`MaterialScrollBehavior` 或 `CupertinoScrollBehavior`
  以修改預設行為，並覆寫
  `ScrollBehavior.multitouchDragStrategy`。

    - 使用您自訂的 `ScrollBehavior`，可以透過設定 `MaterialApp.scrollBehavior` 或 `CupertinoApp.scrollBehavior`，將其套用至整個應用程式。
    - 或者，如果只想套用於特定元件，請在該元件上方加入 `ScrollConfiguration`，並使用您自訂的 `ScrollBehavior`。

您的可捲動元件 (Scrollable Widgets) 會繼承並反映這個行為。

- 除了自行建立 `ScrollBehavior` 外，另一種變更預設行為的方式是複製現有的 `ScrollBehavior`，並設定不同的 `multitouchDragStrategy`。
    - 在您的元件樹中建立 `ScrollConfiguration`，並使用 `copyWith` 在目前的 context 中提供修改過的 `ScrollBehavior` 複本。

為了因應新的設定方式，
`DragGestureRecognizer` 也已更新，以支援在其他拖曳情境下的 `MultitouchDragStrategy`。

## 遷移指南

### 為您的應用程式設定自訂 `ScrollBehavior`

遷移前的程式碼：

```dart
MaterialApp(
  // ...
);
```

遷移後的程式碼：

```dart
class MyCustomScrollBehavior extends MaterialScrollBehavior {
  // Override behavior methods and getters like multitouchDragStrategy
  @override
  MultitouchDragStrategy getMultitouchDragStrategy(BuildContext context) => MultitouchDragStrategy.sumAllPointers;
}

// Set ScrollBehavior for an entire application.
MaterialApp(
  scrollBehavior: MyCustomScrollBehavior(),
  // ...
);
```

### 為特定元件（Widget）設定自訂的 `ScrollBehavior`

遷移前的程式碼：

```dart
final ScrollController controller = ScrollController();
ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
    return Text('Item $index');
  },
);
```

遷移後的程式碼：

```dart
class MyCustomScrollBehavior extends MaterialScrollBehavior {
  // Override behavior methods and getters like multitouchDragStrategy
  @override
  MultitouchDragStrategy getMultitouchDragStrategy(BuildContext context) => MultitouchDragStrategy.sumAllPointers;
}

// ScrollBehavior can be set for a specific widget.
final ScrollController controller = ScrollController();
ScrollConfiguration(
  behavior: MyCustomScrollBehavior(),
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    },
  ),
);
```

### 複製並修改現有的 `ScrollBehavior`

遷移前的程式碼：

```dart
final ScrollController controller = ScrollController();
ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
    return Text('Item $index');
  },
);
```

遷移後的程式碼：

```dart
// ScrollBehavior can be copied and adjusted.
final ScrollController controller = ScrollController();
ScrollConfiguration(
  behavior: ScrollConfiguration.of(context).copyWith(
    multitouchDragStrategy: MultitouchDragStrategy.sumAllPointers,
  ),
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    },
  ),
);
```

## 時間軸

合併於版本：3.18.0-4.0.pre<br>  
正式版本釋出：3.19.0

## 參考資料

API 文件：

* [`ScrollConfiguration`][`ScrollConfiguration`]
* [`ScrollBehavior`][`ScrollBehavior`]
* [`MaterialScrollBehavior`][`MaterialScrollBehavior`]
* [`CupertinoScrollBehavior`][`CupertinoScrollBehavior`]
* [`MultitouchDragStrategy`][`MultitouchDragStrategy`]
* [`DragGestureRecognizer`][`DragGestureRecognizer`]

相關議題：

* [Issue #11884][Issue #11884]

相關 PR：

* [Introduce multi-touch drag strategies for DragGestureRecognizer][Introduce multi-touch drag strategies for DragGestureRecognizer]


[`ScrollConfiguration`]: {{site.api}}/flutter/widgets/ScrollConfiguration-class.html
[`ScrollBehavior`]: {{site.api}}/flutter/widgets/ScrollBehavior-class.html
[`MaterialScrollBehavior`]: {{site.api}}/flutter/material/MaterialScrollBehavior-class.html
[`CupertinoScrollBehavior`]: {{site.api}}/flutter/cupertino/CupertinoScrollBehavior-class.html
[`MultitouchDragStrategy`]: {{site.api}}/flutter/gestures/MultitouchDragStrategy.html
[`DragGestureRecognizer`]: {{site.api}}/flutter/gestures/DragGestureRecognizer-class.html
[Issue #11884]: {{site.repo.flutter}}/issues/11884
[Introduce multi-touch drag strategies for DragGestureRecognizer]: {{site.repo.flutter}}/pull/136708
