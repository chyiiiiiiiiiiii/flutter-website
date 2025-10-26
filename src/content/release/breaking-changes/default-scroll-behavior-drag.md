---
title: 預設拖曳滾動裝置
description: >
  ScrollBehaviors 現在會設定哪些
  PointerDeviceKinds 可以拖曳滾動元件 (Scrollables)。
---

{% render docs/breaking-changes.md %}

## 摘要

`ScrollBehavior` 現在允許或禁止來自指定 `PointerDeviceKind` 的拖曳滾動行為。`ScrollBehavior.dragDevices` 預設情況下，允許所有 `PointerDeviceKind`（除了 `PointerDeviceKind.mouse`）拖曳滾動元件 (Scrolling Widgets)。

## 背景說明

在此變更之前，所有 `PointerDeviceKind` 都可以拖曳 `Scrollable` 元件 (Widget)。這與開發者在使用滑鼠輸入裝置操作 Flutter 應用程式時的預期不符。同時，也讓執行其他滑鼠手勢變得困難，例如選取包含在 `Scrollable` 元件內的文字。

現在，繼承的 `ScrollBehavior` 會依據 `ScrollBehavior.dragDevices` 指定，管理哪些裝置可以拖曳滾動元件 (Scrolling Widgets)。這組 `PointerDeviceKind` 會被允許進行拖曳操作。

## 變更說明

這項變更修正了先前可用滑鼠拖曳滾動的非預期行為。

如果你的應用程式依賴於先前的行為，現在有幾種方式可以控制與設定此功能。

- 繼承 `ScrollBehavior`、`MaterialScrollBehavior` 或 `CupertinoScrollBehavior`
  來修改預設行為，覆寫 `ScrollBehavior.dragDevices`。
  
  - 使用你自訂的 `ScrollBehavior`，可以透過設定 `MaterialApp.scrollBehavior` 或 `CupertinoApp.scrollBehavior`，套用至整個應用程式。
  - 或者，若只想套用於特定元件 (Widget)，可在該元件上方加入 `ScrollConfiguration`，並使用你的自訂 `ScrollBehavior`。
 
你的滾動元件 (Scrolling Widgets) 會繼承並反映這個行為。

- 除了自訂 `ScrollBehavior` 外，另一種變更預設行為的方法是複製現有的 `ScrollBehavior`，並設定不同的 `dragDevices`。
  - 在元件樹中建立 `ScrollConfiguration`，並透過 `copyWith` 在當前 context 提供修改過的 `ScrollBehavior` 副本。

為了配合 `ScrollBehavior` 中拖曳裝置的新設定，`GestureDetector.kind` 以及所有該參數的子類別實例已被棄用。Flutter 提供了 flutter fix，可協助將現有所有手勢偵測器的程式碼從 `kind` 遷移至 `supportedDevices`。
先前的參數 `kind` 只允許用一個 `PointerDeviceKind` 來過濾手勢。`supportedDevices` 的引入，讓多個有效的 `PointerDeviceKind` 成為可能。

## 遷移指南

### 為你的應用程式設定自訂的 `ScrollBehavior`

遷移前的程式碼：

```dart
MaterialApp(
  // ...
);
```

遷移後的程式碼：

```dart
class MyCustomScrollBehavior extends MaterialScrollBehavior {
  // Override behavior methods and getters like dragDevices
  @override
  Set<PointerDeviceKind> get dragDevices => { 
    PointerDeviceKind.touch,
    PointerDeviceKind.mouse,
    // etc.
  };
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
 }
);
```

遷移後的程式碼：

```dart
class MyCustomScrollBehavior extends MaterialScrollBehavior {
  // Override behavior methods and getters like dragDevices
  @override
  Set<PointerDeviceKind> get dragDevices => { 
    PointerDeviceKind.touch,
    PointerDeviceKind.mouse,
    // etc.
  };
}

// ScrollBehavior can be set for a specific widget.
final ScrollController controller = ScrollController();
ScrollConfiguration(
  behavior: MyCustomScrollBehavior(),
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
     return Text('Item $index');
    }
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
 }
);
```

遷移後的程式碼：

```dart
// ScrollBehavior can be copied and adjusted.
final ScrollController controller = ScrollController();
ScrollConfiguration(
  behavior: ScrollConfiguration.of(context).copyWith(dragDevices: {
    PointerDeviceKind.touch,
    PointerDeviceKind.mouse,
  }),
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
     return Text('Item $index');
    }
  ),
);
```

### 將 `GestureDetector` 從 `kind` 遷移至 `supportedDevices`

遷移前的程式碼：

```dart
VerticalDragGestureRecognizer(
  kind: PointerDeviceKind.touch,
);
```

遷移後的程式碼：

```dart
VerticalDragGestureRecognizer(
  supportedDevices: <PointerDeviceKind>{ PointerDeviceKind.touch },
);
```

## 時程

合併於版本：2.3.0-12.0.pre<br>  
穩定版發佈：2.5

## 參考資料

API 文件：

* [`ScrollConfiguration`][`ScrollConfiguration`]
* [`ScrollBehavior`][`ScrollBehavior`]
* [`MaterialScrollBehavior`][`MaterialScrollBehavior`]
* [`CupertinoScrollBehavior`][`CupertinoScrollBehavior`]
* [`PointerDeviceKind`][`PointerDeviceKind`]
* [`GestureDetector`][`GestureDetector`]

相關議題：

* [Issue #71322][Issue #71322]

相關 PR：

* [Reject mouse drags by default in scrollables][Reject mouse drags by default in scrollables]
* [Deprecate GestureDetector.kind in favor of new supportedDevices][Deprecate GestureDetector.kind in favor of new supportedDevices]


[`ScrollConfiguration`]: {{site.api}}/flutter/widgets/ScrollConfiguration-class.html
[`ScrollBehavior`]: {{site.api}}/flutter/widgets/ScrollBehavior-class.html
[`MaterialScrollBehavior`]: {{site.api}}/flutter/material/MaterialScrollBehavior-class.html
[`CupertinoScrollBehavior`]: {{site.api}}/flutter/cupertino/CupertinoScrollBehavior-class.html
[`PointerDeviceKind`]: {{site.api}}/flutter/dart-ui/PointerDeviceKind-class.html
[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[Issue #71322]: {{site.repo.flutter}}/issues/71322
[Reject mouse drags by default in scrollables]: {{site.repo.flutter}}/pull/81569
[Deprecate GestureDetector.kind in favor of new supportedDevices]: {{site.repo.flutter}}/pull/81858
