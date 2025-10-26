---
title: v3.7 之後移除的已棄用 API
description: >
  在達到生命週期結束後，以下已棄用的 API
  已從 Flutter 中移除。
---

## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 3.7 穩定版發佈後達到生命週期結束的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此主來源，
以協助遷移作業。同時也提供了
[快速參考表][quick reference sheet]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-7

## 變更內容

本節列出了依受影響類別分類的棄用項目。

### `GestureRecognizer.kind` 及其子類別

Flutter Fix 支援：是

`GestureRecognizer.kind` 於 v2.3 被棄用。
請改用 `GestureRecognizer.supportedDevices`。

此變更同樣影響 `GestureRecognizer` 的所有子類別：

* `EagerGestureRecognizer`
* `ForcePressGestureRecognizer`
* `LongPressGestureRecognizer`
* `DragGestureRecognizer`
* `VerticalDragGestureRecognizer`
* `HorizontalDragGestureRecognizer`
* `MultiDragGestureRecognizer`
* `ImmediateMultiDragGestureRecognizer`
* `HorizontalMultiDragGestureRecognizer`
* `VerticalMultiDragGestureRecognizer`
* `DelayedMultiDragGestureRecognizer`
* `DoubleTapGestureRecognizer`
* `MultiTapGestureRecognizer`
* `OneSequenceGestureRecognizer`
* `PrimaryPointerGestureRecognizer`
* `ScaleGestureRecognizer`

此變更允許手勢可辨識多個裝置，
而不再僅限於 `kind` 所提供的單一選項。

**遷移指南**

遷移前的程式碼：

```dart
var myRecognizer = GestureRecognizer(
  kind: PointerDeviceKind.mouse,  
);
```

遷移後的程式碼：

```dart
var myRecognizer = GestureRecognizer(
  supportedDevices: <PointerDeviceKind>[ PointerDeviceKind.mouse ],
);

```

**參考資料**

API 文件：

* [`GestureRecognizer`][`GestureRecognizer`]
* [`EagerGestureRecognizer`][`EagerGestureRecognizer`]
* [`ForcePressGestureRecognizer`][`ForcePressGestureRecognizer`]
* [`LongPressGestureRecognizer`][`LongPressGestureRecognizer`]
* [`DragGestureRecognizer`][`DragGestureRecognizer`]
* [`VerticalDragGestureRecognizer`][`VerticalDragGestureRecognizer`]
* [`HorizontalDragGestureRecognizer`][`HorizontalDragGestureRecognizer`]
* [`MultiDragGestureRecognizer`][`MultiDragGestureRecognizer`]
* [`ImmediateMultiDragGestureRecognizer`][`ImmediateMultiDragGestureRecognizer`]
* [`HorizontalMultiDragGestureRecognizer`][`HorizontalMultiDragGestureRecognizer`]
* [`VerticalMultiDragGestureRecognizer`][`VerticalMultiDragGestureRecognizer`]
* [`DelayedMultiDragGestureRecognizer`][`DelayedMultiDragGestureRecognizer`]
* [`DoubleTapGestureRecognizer`][`DoubleTapGestureRecognizer`]
* [`MultiTapGestureRecognizer`][`MultiTapGestureRecognizer`]
* [`OneSequenceGestureRecognizer`][`OneSequenceGestureRecognizer`]
* [`PrimaryPointerGestureRecognizer`][`PrimaryPointerGestureRecognizer`]
* [`ScaleGestureRecognizer`][`ScaleGestureRecognizer`]

相關 PR：

* 已在 [#81858][#81858] 標記為過時
* 已在 [#119572][#119572] 移除

[`GestureRecognizer`]: {{site.api}}/flutter/gestures/GestureRecognizer-class.html
[`EagerGestureRecognizer`]: {{site.api}}/flutter/gestures/EagerGestureRecognizer-class.html
[`ForcePressGestureRecognizer`]: {{site.api}}/flutter/gestures/ForcePressGestureRecognizer-class.html
[`LongPressGestureRecognizer`]: {{site.api}}/flutter/gestures/LongPressGestureRecognizer-class.html
[`DragGestureRecognizer`]: {{site.api}}/flutter/gestures/DragGestureRecognizer-class.html
[`VerticalDragGestureRecognizer`]: {{site.api}}/flutter/gestures/VerticalDragGestureRecognizer-class.html
[`HorizontalDragGestureRecognizer`]: {{site.api}}/flutter/gestures/HorizontalDragGestureRecognizer-class.html
[`MultiDragGestureRecognizer`]: {{site.api}}/flutter/gestures/MultiDragGestureRecognizer-class.html
[`ImmediateMultiDragGestureRecognizer`]: {{site.api}}/flutter/gestures/ImmediateMultiDragGestureRecognizer-class.html
[`HorizontalMultiDragGestureRecognizer`]: {{site.api}}/flutter/gestures/HorizontalMultiDragGestureRecognizer-class.html
[`VerticalMultiDragGestureRecognizer`]: {{site.api}}/flutter/gestures/VerticalMultiDragGestureRecognizer-class.html
[`DelayedMultiDragGestureRecognizer`]: {{site.api}}/flutter/gestures/DelayedMultiDragGestureRecognizer-class.html
[`DoubleTapGestureRecognizer`]: {{site.api}}/flutter/gestures/DoubleTapGestureRecognizer-class.html
[`MultiTapGestureRecognizer`]: {{site.api}}/flutter/gestures/MultiTapGestureRecognizer-class.html
[`OneSequenceGestureRecognizer`]: {{site.api}}/flutter/gestures/OneSequenceGestureRecognizer-class.html
[`PrimaryPointerGestureRecognizer`]: {{site.api}}/flutter/gestures/PrimaryPointerGestureRecognizer-class.html
[`ScaleGestureRecognizer`]: {{site.api}}/flutter/gestures/ScaleGestureRecognizer-class.html


[#81858]: {{site.repo.flutter}}/pull/81858
[#119572]: {{site.repo.flutter}}/pull/119572

---

### `ThemeData` `accentColor`、`accentColorBrightness`、`accentColorTextTheme`、`accentColorIconTheme` 以及 `buttonColor`

Flutter Fix 支援：是

`accentColor`、`accentColorBrightness`、`accentColorTextTheme`、
`accentColorIconTheme` 以及 `buttonColor` 屬性在 v2.3 中已被標記為過時。

此變更讓 `ThemeData` 更符合 Material Design 指引，同時也讓主題化更清晰，未來將依賴核心色彩方案或個別元件主題來達到所需的樣式。

`accentColorBrightness`、`accentColorTextTheme`、
`accentColorIconTheme` 以及 `buttonColor` 已不再被框架使用，
請移除相關參考。

`ThemeData.accentColor` 的使用應改為
`ThemeData.colorScheme.secondary`。

## 遷移指南

遷移前的程式碼：

```dart
var myTheme = ThemeData(
  //...
  accentColor: Colors.blue,
  //...
);
var color = myTheme.accentColor;
```

遷移後的程式碼：

```dart
var myTheme = ThemeData(
  //...
  colorScheme: ColorScheme(
    //...
    secondary:Colors.blue,
    //...
  ),
  //...
);
var color = myTheme.colorScheme.secondary;
```

**參考資料**

* [重點色彩遷移指南][Accent color migration guide]

API 文件：

* [`ThemeData`][`ThemeData`]
* [`ColorScheme`][`ColorScheme`]

相關議題：

* [#56639][#56639]
* [#84748][#84748]
* [#56918][#56918]
* [#91772][#91772]

相關 PR：

已棄用於：

* [#92822][#92822]
* [#81336][#81336]
* [#85144][#85144]

已移除於：

* [#118658][#118658]
* [#119360][#119360]
* [#120577][#120577]
* [#120932][#120932]

[Accent color migration guide]: /release/breaking-changes/theme-data-accent-properties
[`ThemeData`]: {{site.api}}/flutter/widgets/Draggable-class.html
[`ColorScheme`]: {{site.api}}/flutter/widgets/LongPressDraggable-class.html
[#56639]: {{site.repo.flutter}}/pull/56639
[#84748]: {{site.repo.flutter}}/pull/84748
[#56918]: {{site.repo.flutter}}/pull/56918
[#91772]: {{site.repo.flutter}}/pull/91772
[#92822]: {{site.repo.flutter}}/pull/92822
[#81336]: {{site.repo.flutter}}/pull/81336
[#85144]: {{site.repo.flutter}}/pull/85144
[#118658]: {{site.repo.flutter}}/pull/118658
[#119360]: {{site.repo.flutter}}/pull/119360
[#120577]: {{site.repo.flutter}}/pull/120577
[#120932]: {{site.repo.flutter}}/pull/120932

---

### `AppBar`、`SliverAppBar` 和 `AppBarTheme` 更新

Flutter Fix 支援：是

在 v2.4 版本中，為了更貼近 Material Design，對 app bar 元件（Widgets）及其主題進行了多項調整。當時有多個屬性已被標記為棄用，現已移除。

針對 `AppBar`、`SliverAppBar` 和 `AppBarTheme`：

* `brightness` 已移除，請改用 `systemOverlayStyle`。
* `textTheme` 已移除，請改用 `toolbarTextStyle` 或 `titleTextStyle`。
* `backwardsCompatibility` 可直接移除，該屬性僅作為這些屬性的暫時遷移旗標。

此外，`AppBarTheme.color` 也已移除，請改用 `AppBarTheme.backgroundColor`。

**遷移指南**

遷移前的程式碼：

```dart
var toolbarTextStyle = TextStyle(...);
var titleTextStyle = TextStyle(...);
AppBar(
  brightness: Brightness.light,
  textTheme: TextTheme(
    bodyMedium: toolbarTextStyle,
    titleLarge: titleTextStyle,
  )
  backwardsCompatibility: true,
);
AppBarTheme(color: Colors.blue);
```

遷移後的程式碼：

```dart
var toolbarTextStyle = TextStyle(...);
var titleTextStyle = TextStyle(...);
AppBar(
  systemOverlayStyle: SystemOverlayStyle(statusBarBrightness: Brightness.light),
  toolbarTextStyle: toolbarTextStyle,
  titleTextStyle: titleTextStyle,
);
AppBarTheme(backgroundColor: Colors.blue);
```

**參考資料**

API 文件：

* [`AppBar`][`AppBar`]
* [`SliverAppBar`][`SliverAppBar`]
* [`AppBarTheme`][`AppBarTheme`]

相關議題：

* [#86127][#86127]
* [#70645][#70645]
* [#67921][#67921]
* [#67497][#67497]
* [#50606]⟧L23⟧
* [#51820][#51820]
* [#61618][#61618]

已棄用於：

* [#86198][#86198]
* [#71184][#71184]

已移除於：

* [#120618][#120618]
* [#119253][#119253]
* [#120575][#120575]


[`AppBar`]: {{site.api}}/flutter/material/AppBar-class.html
[`SliverAppBar`]: {{site.api}}/flutter/material/SliverAppBar-class.html
[`AppBarTheme`]: {{site.api}}/flutter/material/AppBarTheme-class.html
[#86127]: {{site.repo.flutter}}/pull/86127
[#70645]: {{site.repo.flutter}}/pull/70645
[#67921]: {{site.repo.flutter}}/pull/67921
[#67497]: {{site.repo.flutter}}/pull/67497
[#50606]: {{site.repo.flutter}}/pull/50606
[#51820]: {{site.repo.flutter}}/pull/51820
[#61618]: {{site.repo.flutter}}/pull/61618
[#86198]: {{site.repo.flutter}}/pull/86198
[#71184]: {{site.repo.flutter}}/pull/71184
[#120618]: {{site.repo.flutter}}/pull/120618
[#119253]: {{site.repo.flutter}}/pull/119253
[#120575]: {{site.repo.flutter}}/pull/120575

---

### `SystemChrome.setEnabledSystemUIOverlays`

Flutter Fix 支援：是

在 v2.3 版本中，`SystemChrome.setEnabledSystemUIOVerlays`，這個用於設定裝置系統層級覆蓋（如狀態列與導覽列）的靜態方法，已被棄用，建議改用 `SystemChrome.setEnabledSystemUIMode`。

此變更允許設定符合原生 Android 應用設計（如 edge to edge）的常見全螢幕模式。

若仍需手動設定覆蓋項，而非選擇特定模式，仍可透過 `SystemUiMode.manual` 來實現，開發者可以像以往一樣傳入相同的覆蓋項清單。

**遷移指南**

遷移前的程式碼：
```dart
SystemChrome.setEnabledSystemUIOverlays(<SystemUiOverlay>[
  SystemUiOverlay.top,
  SystemUiOverlay.bottom,
]);
```

遷移後的程式碼：
```dart
SystemChrome.setEnabledSystemUIMode(
  SystemUiMode.manual,
  overlays: <SystemUiOverlay>[
    SystemUiOverlay.top,
    SystemUiOverlay.bottom,
  ],
);
```

**參考資料**

API 文件：

* [`SystemChrome`][`SystemChrome`]

相關議題：

* [#35748][#35748]
* [#40974][#40974]
* [#44033][#44033]
* [#63761][#63761]
* [#69999][#69999]

已棄用於：

* [#81303][#81303]

已移除於：

* [#11957][#11957]

[`SystemChrome`]: {{site.api}}/flutter/services/SystemChrome-class.html
[#35748]: {{site.repo.flutter}}/pull/35748
[#40974]: {{site.repo.flutter}}/pull/40974
[#44033]: {{site.repo.flutter}}/pull/44033
[#63761]: {{site.repo.flutter}}/pull/63761
[#69999]: {{site.repo.flutter}}/pull/69999
[#81303]: {{site.repo.flutter}}/pull/81303
[#11957]: {{site.repo.flutter}}/pull/11957

---

### `SystemNavigator.routeUpdated`

Flutter Fix 支援：是

在 v2.3 版本中，`SystemNavigator.routeUpdated` 已被棄用，建議改用
`SystemNavigator.routeInformationUpdated`。

為了避免有兩種方式向引擎更新目前的 Route，這項變更將所有相關操作整合到單一 API。如果建立了一個會回報 Route 的 `Navigator`，則會分別選擇單一項目的歷史模式（single-entry history mode）。

**遷移指南**

遷移前的程式碼：

```dart
SystemNavigator.routeUpdated(routeName: 'foo', previousRouteName: 'bar');
```

遷移後的程式碼：

```dart
SystemNavigator.routeInformationUpdated(location: 'foo');
```

**參考資料**

API 文件：

* [`SystemNavigator`][`SystemNavigator`]

相關議題：

* [#82574][#82574]

已棄用於：

* [#82594][#82594]

已移除於：

* [#119187][#119187]


[`SystemNavigator`]: {{site.api}}/flutter/services/SystemNavigator-class.html
[#82594]: {{site.repo.flutter}}/pull/82594
[#82574]: {{site.repo.flutter}}/pull/82574
[#119187]: {{site.repo.flutter}}/pull/119187

---

### `AnimatedSize.vsync`

Flutter Fix 支援：是

在 v2.2 版本中，`AnimatedSize.vsyc` 已被棄用。自從 `AnimatedSize` 轉換為 `StatefulWidget`，且其 `State` 混入了 `SingleTickerProviderStateMixin` 之後，這個屬性就不再需要。此變更是為了解決記憶體洩漏問題。

應移除對 `vsync` 的使用，因為現在已由 `AnimatedSize` 處理此屬性。

**遷移指南**

遷移前的程式碼：

```dart
AnimatedSize(
  vsync: this,
  // ...
);
```

遷移後的程式碼：

```dart
AnimatedSize(
  // ...
);
```

**參考資料**

API 文件：

* [`AnimatedSize`][`AnimatedSize`]

已棄用於：

* [#80554][#80554]
* [#81067][#81067]

已移除於：

* [#119186][#119186]

[`AnimatedSize`]: {{site.api}}/flutter/widgets/AnimatedSize-class.html
[#80554]: {{site.repo.flutter}}/pull/80554
[#81067]: {{site.repo.flutter}}/pull/81067
[#119186]: {{site.repo.flutter}}/pull/119186

---

## 時程

在穩定版發行：3.10
