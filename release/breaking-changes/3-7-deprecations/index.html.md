# v3.7 之後移除的已棄用 API

> 在達到生命週期終點後，以下已棄用的 API 已從 Flutter 中移除。



## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 3.7 穩定版發佈後達到生命週期終點的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此
主要來源，以協助遷移。
同時也提供了[快速參考表][quick reference sheet]。

[Deprecation Policy]: https://github.com/flutter/flutter/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-7

## 變更內容

本節將依受影響的類別列出棄用項目。

### `GestureRecognizer.kind` 及其子類別

Flutter Fix 支援：是

`GestureRecognizer.kind` 已於 v2.3 棄用。
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

* [`GestureRecognizer`][]
* [`EagerGestureRecognizer`][]
* [`ForcePressGestureRecognizer`][]
* [`LongPressGestureRecognizer`][]
* [`DragGestureRecognizer`][]
* [`VerticalDragGestureRecognizer`][]
* [`HorizontalDragGestureRecognizer`][]
* [`MultiDragGestureRecognizer`][]
* [`ImmediateMultiDragGestureRecognizer`][]
* [`HorizontalMultiDragGestureRecognizer`][]
* [`VerticalMultiDragGestureRecognizer`][]
* [`DelayedMultiDragGestureRecognizer`][]
* [`DoubleTapGestureRecognizer`][]
* [`MultiTapGestureRecognizer`][]
* [`OneSequenceGestureRecognizer`][]
* [`PrimaryPointerGestureRecognizer`][]
* [`ScaleGestureRecognizer`][]

相關 PR：

* 在 [#81858][] 標記為已棄用
* 在 [#119572][] 移除

[`GestureRecognizer`]: https://api.flutter.dev/flutter/gestures/GestureRecognizer-class.html
[`EagerGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/EagerGestureRecognizer-class.html
[`ForcePressGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/ForcePressGestureRecognizer-class.html
[`LongPressGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/LongPressGestureRecognizer-class.html
[`DragGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/DragGestureRecognizer-class.html
[`VerticalDragGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/VerticalDragGestureRecognizer-class.html
[`HorizontalDragGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/HorizontalDragGestureRecognizer-class.html
[`MultiDragGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/MultiDragGestureRecognizer-class.html
[`ImmediateMultiDragGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/ImmediateMultiDragGestureRecognizer-class.html
[`HorizontalMultiDragGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/HorizontalMultiDragGestureRecognizer-class.html
[`VerticalMultiDragGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/VerticalMultiDragGestureRecognizer-class.html
[`DelayedMultiDragGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/DelayedMultiDragGestureRecognizer-class.html
[`DoubleTapGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/DoubleTapGestureRecognizer-class.html
[`MultiTapGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/MultiTapGestureRecognizer-class.html
[`OneSequenceGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/OneSequenceGestureRecognizer-class.html
[`PrimaryPointerGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/PrimaryPointerGestureRecognizer-class.html
[`ScaleGestureRecognizer`]: https://api.flutter.dev/flutter/gestures/ScaleGestureRecognizer-class.html


[#81858]: https://github.com/flutter/flutter/pull/81858
[#119572]: https://github.com/flutter/flutter/pull/119572

---

### `ThemeData` `accentColor`、`accentColorBrightness`、`accentColorTextTheme`、`accentColorIconTheme` 和 `buttonColor`

Flutter Fix 支援：是

`accentColor`、`accentColorBrightness`、`accentColorTextTheme`、
`accentColorIconTheme` 和 `buttonColor` 這些 `ThemeData` 的屬性已於 v2.3 被標記為已棄用。

此變更讓 `ThemeData` 更加符合 Material Design 指南。這也讓主題化（theming）更為清晰，因為現在可依賴核心色彩方案或個別元件主題來達到所需的樣式。

`accentColorBrightness`、`accentColorTextTheme`、
`accentColorIconTheme` 和 `buttonColor` 已不再被框架使用。
應移除相關參考。

對於 `ThemeData.accentColor` 的使用，請改為使用
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

* [Accent color migration guide][]

API 文件：

* [`ThemeData`][]
* [`ColorScheme`][]

相關議題：

* [#56639][]
* [#84748][]
* [#56918][]
* [#91772][]

相關 PR：

已棄用於：

* [#92822][]
* [#81336][]
* [#85144][]

已移除於：

* [#118658][]
* [#119360][]
* [#120577][]
* [#120932][]

[Accent color migration guide]: /release/breaking-changes/theme-data-accent-properties
[`ThemeData`]: https://api.flutter.dev/flutter/widgets/Draggable-class.html
[`ColorScheme`]: https://api.flutter.dev/flutter/widgets/LongPressDraggable-class.html
[#56639]: https://github.com/flutter/flutter/pull/56639
[#84748]: https://github.com/flutter/flutter/pull/84748
[#56918]: https://github.com/flutter/flutter/pull/56918
[#91772]: https://github.com/flutter/flutter/pull/91772
[#92822]: https://github.com/flutter/flutter/pull/92822
[#81336]: https://github.com/flutter/flutter/pull/81336
[#85144]: https://github.com/flutter/flutter/pull/85144
[#118658]: https://github.com/flutter/flutter/pull/118658
[#119360]: https://github.com/flutter/flutter/pull/119360
[#120577]: https://github.com/flutter/flutter/pull/120577
[#120932]: https://github.com/flutter/flutter/pull/120932

---

### `AppBar`、`SliverAppBar` 與 `AppBarTheme` 更新

Flutter Fix 支援：是

在 v2.4 版本中，為了更符合 Material Design，對 app bar 類別及其主題進行了多項調整。當時有數個屬性被標記為棄用，現已被移除。

針對 `AppBar`、`SliverAppBar` 和 `AppBarTheme`：

* `brightness` 已被移除，請改用 `systemOverlayStyle`。
* `textTheme` 已被移除，請改用 `toolbarTextStyle` 或 `titleTextStyle` 其中之一。
* `backwardsCompatibility` 可直接移除，因為它僅為這些屬性的暫時遷移旗標。

此外，`AppBarTheme.color` 也已被移除，請改用 `AppBarTheme.backgroundColor` 作為替代。

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

* [`AppBar`][]
* [`SliverAppBar`][]
* [`AppBarTheme`][]

相關議題：

* [#86127][]
* [#70645][]
* [#67921][]
* [#67497][]
* [#50606][]
* [#51820][]
* [#61618][]

已棄用於：

* [#86198][]
* [#71184][]

已移除於：

* [#120618][]
* [#119253][]
* [#120575][]


[`AppBar`]: https://api.flutter.dev/flutter/material/AppBar-class.html
[`SliverAppBar`]: https://api.flutter.dev/flutter/material/SliverAppBar-class.html
[`AppBarTheme`]: https://api.flutter.dev/flutter/material/AppBarTheme-class.html
[#86127]: https://github.com/flutter/flutter/pull/86127
[#70645]: https://github.com/flutter/flutter/pull/70645
[#67921]: https://github.com/flutter/flutter/pull/67921
[#67497]: https://github.com/flutter/flutter/pull/67497
[#50606]: https://github.com/flutter/flutter/pull/50606
[#51820]: https://github.com/flutter/flutter/pull/51820
[#61618]: https://github.com/flutter/flutter/pull/61618
[#86198]: https://github.com/flutter/flutter/pull/86198
[#71184]: https://github.com/flutter/flutter/pull/71184
[#120618]: https://github.com/flutter/flutter/pull/120618
[#119253]: https://github.com/flutter/flutter/pull/119253
[#120575]: https://github.com/flutter/flutter/pull/120575

---

### `SystemChrome.setEnabledSystemUIOverlays`

Flutter Fix 支援：是

在 v2.3 版本中，`SystemChrome.setEnabledSystemUIOVerlays` 這個用於設定裝置系統層級覆蓋（如狀態列與導覽列）的靜態方法已被棄用，建議改用 `SystemChrome.setEnabledSystemUIMode`。

這項變更讓開發者可以設定符合原生 Android 應用程式設計（如 edge to edge）的常見全螢幕模式。

若仍需手動設定 overlays，而非選擇特定模式，仍可透過 `SystemUiMode.manual` 來實現，開發者可以如以往一樣傳入相同的 overlays 清單。

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

* [`SystemChrome`][]

相關議題：

* [#35748][]
* [#40974][]
* [#44033][]
* [#63761][]
* [#69999][]

已棄用於：

* [#81303][]

已移除於：

* [#11957][]

[`SystemChrome`]: https://api.flutter.dev/flutter/services/SystemChrome-class.html
[#35748]: https://github.com/flutter/flutter/pull/35748
[#40974]: https://github.com/flutter/flutter/pull/40974
[#44033]: https://github.com/flutter/flutter/pull/44033
[#63761]: https://github.com/flutter/flutter/pull/63761
[#69999]: https://github.com/flutter/flutter/pull/69999
[#81303]: https://github.com/flutter/flutter/pull/81303
[#11957]: https://github.com/flutter/flutter/pull/11957

---

### `SystemNavigator.routeUpdated`

Flutter Fix 支援：是

在 v2.3 版本中，`SystemNavigator.routeUpdated` 已被棄用，建議改用
`SystemNavigator.routeInformationUpdated`。

為了避免有兩種方式向引擎回報當前路由，這項變更將所有相關操作統一到一個 API，當建立一個能回報路由的 `Navigator` 時，會分別選擇單一項目的歷史模式。

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

* [`SystemNavigator`][]

相關議題：

* [#82574][]

已棄用於：

* [#82594][]

已移除於：

* [#119187][]


[`SystemNavigator`]: https://api.flutter.dev/flutter/services/SystemNavigator-class.html
[#82594]: https://github.com/flutter/flutter/pull/82594
[#82574]: https://github.com/flutter/flutter/pull/82574
[#119187]: https://github.com/flutter/flutter/pull/119187

---

### `AnimatedSize.vsync`

Flutter Fix 支援：是

在 v2.2 版本中，`AnimatedSize.vsyc` 已被棄用。自從 `AnimatedSize` 被轉換為 `StatefulWidget`，且其 `State` 混入了 `SingleTickerProviderStateMixin` 之後，此屬性已不再需要。這項變更是為了解決記憶體洩漏的問題。

應移除對 `vsync` 的使用，因為現在由 `AnimatedSize` 處理該屬性。

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

* [`AnimatedSize`][]

已棄用於：

* [#80554][]
* [#81067][]

已移除於：

* [#119186][]

[`AnimatedSize`]: https://api.flutter.dev/flutter/widgets/AnimatedSize-class.html
[#80554]: https://github.com/flutter/flutter/pull/80554
[#81067]: https://github.com/flutter/flutter/pull/81067
[#119186]: https://github.com/flutter/flutter/pull/119186

---

## 時程

在穩定版本：3.10

