---
title: 預設拖曳捲動裝置
description: >
  ScrollBehaviors 現在會設定哪些
  PointerDeviceKinds 可以拖曳滾動元件 (Scrollables)。
---

{% render docs/breaking-changes.md %}

## 摘要

`ScrollBehavior` 現在可以允許或禁止指定的 `PointerDeviceKind` 進行拖曳捲動。`ScrollBehavior.dragDevices` 預設情況下，
允許所有 `PointerDeviceKind` 拖曳滾動元件 (Scrolling Widgets)，
除了 `PointerDeviceKind.mouse` 之外。

## 背景說明

在這項變更之前，所有 `PointerDeviceKind` 都可以拖曳 `Scrollable` 元件 (Widget)。
這與開發者在使用滑鼠輸入裝置操作 Flutter 應用程式時的預期不符。
此外，這也讓執行其他滑鼠手勢變得困難，例如選取包含在 `Scrollable` 元件 (Widget) 內的文字。

現在，繼承的 `ScrollBehavior` 會根據 `ScrollBehavior.dragDevices` 指定哪些裝置可以拖曳滾動元件。
這組 `PointerDeviceKind` 可以進行拖曳操作。

## 變更說明

這項變更修正了使用滑鼠拖曳進行捲動的非預期行為。

如果你的應用程式依賴於先前的行為，現在有幾種方式可以控制與設定此功能。

- 繼承 `ScrollBehavior`、`MaterialScrollBehavior` 或 `CupertinoScrollBehavior`
  來修改預設行為，覆寫 `ScrollBehavior.dragDevices`。
  
  - 使用你自訂的 `ScrollBehavior`，可以透過設定 `MaterialApp.scrollBehavior` 或 `CupertinoApp.scrollBehavior`
    來套用至整個應用程式。
  - 或者，如果只想套用到特定元件 (Widget)，
    可以在該元件上方加入 `ScrollConfiguration`，並使用你自訂的 `ScrollBehavior`。
 
你的滾動元件 (Scrolling Widgets) 會繼承並反映這個行為。

- 除了自訂 `ScrollBehavior` 外，另一個變更預設行為的方式是複製現有的 `ScrollBehavior`，
  並設定不同的 `dragDevices`。
  - 在元件樹中建立一個 `ScrollConfiguration`，並使用 `copyWith`
    在目前的 context 中提供修改過的 `ScrollBehavior` 副本。

為了因應 `ScrollBehavior` 中拖曳裝置的新設定方式，
`GestureDetector.kind` 以及所有該參數的子類別實例都已被棄用。
Flutter 提供了 flutter fix，可協助將現有的手勢偵測器程式碼
從 `kind` 遷移至 `supportedDevices`。
先前的參數 `kind` 只允許一個 `PointerDeviceKind`
用來過濾手勢。
而新增的 `supportedDevices` 則讓多個有效的 `PointerDeviceKind` 成為可能。

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
正式版發佈於：2.5

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
