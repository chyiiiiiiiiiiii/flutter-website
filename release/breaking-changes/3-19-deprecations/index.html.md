# v3.19 之後移除的已棄用 API

> 在達到生命週期終止後，以下已棄用的 API 已從 Flutter 中移除。



## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 3.19 穩定版發佈後達到生命週期終止的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此主要來源，
以協助您進行遷移。
為了進一步協助您的遷移，請參考這份
[快速參考表][quick reference sheet]。

[Deprecation Policy]: https://github.com/flutter/flutter/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-19

## 變更內容

本節依套件及受影響的類別列出棄用項目。

### `TextTheme`

套件：flutter
Flutter Fix 支援：是

為了支援 Material Design 規範中的新樣式，`TextTheme` 的多個 `TextStyle` 屬性已於 v3.1 棄用。
這些屬性及其在新 API 中的對應替代項如下表所示。

| 棄用項目 | 新 API |
|---|---|
| headline1	| displayLarge |
| headline2	| displayMedium |
| headline3	| displaySmall |
| headline4	| headlineMedium |
| headline5	| headlineSmall |
| headline6	| titleLarge |
| subtitle1	| titleMedium |
| subtitle2	| titleSmall |
| bodyText1	| bodyLarge |
| bodyText2	| bodyMedium |
| caption	  | bodySmall |
| button	  | labelLarge |
| overline	| labelSmall |

**遷移指南**

遷移前的程式碼：

```dart
// TextTheme
// Base constructor
TextTheme(
  headline1: headline1Style,
  headline2: headline2Style,
  headline3: headline3Style,
  headline4: headline4Style,
  headline5: headline5Style,
  headline6: headline6Style,
  subtitle1: subtitle1Style,
  subtitle2: subtitle2Style,
  bodyText1: bodyText1Style,
  bodyText2: bodyText2Style,
  caption: captionStyle,
  button: buttonStyle,
  overline: overlineStyle,
);

// copyWith
TextTheme.copyWith(
  headline1: headline1Style,
  headline2: headline2Style,
  headline3: headline3Style,
  headline4: headline4Style,
  headline5: headline5Style,
  headline6: headline6Style,
  subtitle1: subtitle1Style,
  subtitle2: subtitle2Style,
  bodyText1: bodyText1Style,
  bodyText2: bodyText2Style,
  caption: captionStyle,
  button: buttonStyle,
  overline: overlineStyle,
);

// Getters
TextStyle style;
style = textTheme.headline1,
style = textTheme.headline2,
style = textTheme.headline3,
style = textTheme.headline4,
style = textTheme.headline5,
style = textTheme.headline6,
style = textTheme.subtitle1,
style = textTheme.subtitle2,
style = textTheme.bodyText1,
style = textTheme.bodyText2,
style = textTheme.caption,
style = textTheme.button,
style = textTheme.overline,
```

遷移後的程式碼：

```dart
// TextTheme
// Base constructor
TextTheme(
  displayLarge: headline1Style,
  displayMedium: headline2Style,
  displaySmall: headline3Style,
  headlineMedium: headline4Style,
  headlineSmall: headline5Style,
  titleLarge: headline6Style,
  titleMedium: subtitle1Style,
  titleSmall: subtitle2Style,
  bodyLarge: bodyText1Style,
  bodyMedium: bodyText2Style,
  bodySmall: captionStyle,
  labelLarge: buttonStyle,
  labelSmall: overlineStyle,
);

TextTheme.copyWith(
  displayLarge: headline1Style,
  displayMedium: headline2Style,
  displaySmall: headline3Style,
  headlineMedium: headline4Style,
  headlineSmall: headline5Style,
  titleLarge: headline6Style,
  titleMedium: subtitle1Style,
  titleSmall: subtitle2Style,
  bodyLarge: bodyText1Style,
  bodyMedium: bodyText2Style,
  bodySmall: captionStyle,
  labelLarge: buttonStyle,
  labelSmall: overlineStyle,
);

TextStyle style;
style = textTheme.displayLarge;
style = textTheme.displayMedium;
style = textTheme.displaySmall;
style = textTheme.headlineMedium;
style = textTheme.headlineSmall;
style = textTheme.titleLarge;
style = textTheme.titleMedium;
style = textTheme.titleSmall;
style = textTheme.bodyLarge;
style = textTheme.bodyMedium;
style = textTheme.bodySmall;
style = textTheme.labelLarge;
style = textTheme.labelSmall;
```

**參考資料**

API 文件：

* [`TextTheme`][]

相關 PR：

* 在 [#109817][] 標記為已淘汰
* 在 [#139255][] 移除

[`TextTheme`]: https://api.flutter.dev/flutter/material/TextTheme-class.html

[#109817]: https://github.com/flutter/flutter/pull/109817
[#139255]: https://github.com/flutter/flutter/pull/139255

---

### `ThemeData`

套件：flutter
Flutter Fix 支援：是

為了支援 Material Design 規範中的新樣式，`ThemeData` 的多個 `Color` 屬性自 v3.3 起已被標記為已淘汰。這些顏色分別為 `errorColor`、`backgroundColor`、`bottomAppBarColor` 和 `toggleableActiveColor`。前兩者已由 `ThemeData.colorScheme` 的屬性取代，而 `bottomAppBarColor` 則由元件主題的顏色 `BottomAppBarTheme` 取代。`toggleableActiveColor` 已不再被框架使用，因此被移除。

**遷移指南**

遷移前的程式碼：

```dart
var myTheme = ThemeData(
  //...
  errorColor: Colors.red,
  backgroundColor: Colors.blue,
  bottomAppBarColor: Colors.purple,
  toggleableActiveColor: Colors.orange,
  //...
);
var errorColor = myTheme.errorColor;
var backgroundColor = myTheme.backgroundColor;
var bottomAppBarColor = myTheme.bottomAppBarColor;
var toggleableActiveColor = myTheme.toggleableActiveColor;
```

遷移後的程式碼：

```dart
var myTheme = ThemeData(
  //...
  colorScheme: ColorScheme(
    /// ...
    error: Colors.red,
    background: Colors.blue,
  ),
  bottomAppBarTheme: BottomAppBarTheme(
    color: Colors.purple,
  ),
  //...
);
var errorColor = myTheme.colorScheme.error;
var backgroundColor = myTheme.colorScheme.background;
var bottomAppBarColor = myTheme.bottomAppBarTheme.color;
var toggleableActiveColor = Colors.orange;
```

**參考資料**

API 文件：

* [`ThemeData`][]
* [`ColorScheme`][]
* [`BottomAppBarTheme`][]

相關 PR：

* 已在 [#110162][]、[#111080][] 和 [#97972][] 標記為已淘汰
* 已在 [#144178][]、[#144080][]、[#144079][] 和 [#144078][] 移除

[`ThemeData`]: https://api.flutter.dev/flutter/material/ThemeData-class.html
[`ColorScheme`]: https://api.flutter.dev/flutter/material/ColorScheme-class.html
[`BottomAppBarTheme`]: https://api.flutter.dev/flutter/material/BottomAppBarTheme-class.html

[#110162]: https://github.com/flutter/flutter/pull/110162
[#111080]: https://github.com/flutter/flutter/pull/111080
[#97972]: https://github.com/flutter/flutter/pull/97972
[#144178]: https://github.com/flutter/flutter/pull/144178
[#144080]: https://github.com/flutter/flutter/pull/144080
[#144079]: https://github.com/flutter/flutter/pull/144079
[#144078]: https://github.com/flutter/flutter/pull/144078

---

### `CupertinoContextMenu.previewBuilder`

套件：flutter
Flutter Fix 支援：是

`previewBuilder` 在 v3.4 之後被 `CupertinoContextMenu` 的 `builder` 取代。透過加入 `builder`，可以涵蓋由內容選單（context menu）執行的整個動畫（Animation），其中後半段原本是由 `previewBuilder` 執行，並由 `CupertinoContextMenu.animationOpensAt` 劃分。


**遷移指南**

遷移前的程式碼：

```dart
CupertinoContextMenu(
  previewBuilder: (BuildContext context, Animation<double> animation, Widget child) {
    return FittedBox(
      fit: BoxFit.cover,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(64.0 * animation.value),
        child: Image.asset('assets/photo.jpg'),
      ),
    );
  },
  actions: <Widget>[
    CupertinoContextMenuAction(
      child: const Text('Action one'),
      onPressed: () {},
    ),
  ],
  child: FittedBox(
    fit: BoxFit.cover,
    child: Image.asset('assets/photo.jpg'),
  ),
);
```

遷移後的程式碼：

```dart
CupertinoContextMenu(
  actions: <Widget>[
    CupertinoContextMenuAction(
      child: const Text('Action one'),
      onPressed: () {},
    ),
  ],
  builder: (BuildContext context, Animation<double> animation) {
    final Animation<BorderRadius?> borderRadiusAnimation = BorderRadiusTween(
      begin: BorderRadius.circular(0.0),
      end: BorderRadius.circular(CupertinoContextMenu.kOpenBorderRadius),
    ).animate(
      CurvedAnimation(
        parent: animation,
        curve: Interval(
          CupertinoContextMenu.animationOpensAt,
          1.0,
        ),
      ),
    );

    final Animation<Decoration> boxDecorationAnimation = DecorationTween(
      begin: const BoxDecoration(
        color: Color(0xFFFFFFFF),
        boxShadow: <BoxShadow>[],
      ),
      end: BoxDecoration(
        color: Color(0xFFFFFFFF),
        boxShadow: CupertinoContextMenu.kEndBoxShadow,
      ),
    ).animate(
      CurvedAnimation(
        parent: animation,
        curve: Interval(
          0.0,
          CupertinoContextMenu.animationOpensAt,
        )
      )
    );

    return Container(
      decoration: animation.value < CupertinoContextMenu.animationOpensAt
        ? boxDecorationAnimation.value
        : null,
      child: FittedBox(
        fit: BoxFit.cover,
        child: ClipRRect(
          borderRadius: borderRadiusAnimation.value ?? BorderRadius.circular(0.0),
          child: SizedBox(
            height: 150,
            width: 150,
            child: Image.asset('assets/photo.jpg'),
          ),
        ),
      )
    );
   }
 )
```

**參考資料**

API 文件：

* [`CupertinoContextMenu`][]

相關 PR：

* 在 [#110616][] 標記為已淘汰
* 在 [#143990][] 移除

[`CupertinoContextMenu`]: https://api.flutter.dev/flutter/cupertino/CupertinoContextMenu-class.html

[#110616]: https://github.com/flutter/flutter/pull/110616
[#143990]: https://github.com/flutter/flutter/pull/143990

---

### `Scrollbar.showTrackOnHover`

套件：flutter
Flutter Fix 支援：是

`Scrollbar` 的 `showTrackOnHover` 屬性，以及其相關的元件主題 `ScrollbarThemeData.showTrackOnHover`，自 v3.4 之後已被有狀態屬性 `ScrollbarThemeData.trackVisibility` 取代。透過使用 `trackVisibility`，所有狀態的組合都能影響捲動條軌道（scrollbar track）的顯示，不再僅限於 hover 狀態。


**遷移指南**

遷移前的程式碼：

```dart
Scrollbar(
  showTrackOnHover: true,
  child: //...
);
ScrollbarThemeData(
  showTrackOnHover: true,
);
```

遷移後的程式碼：

```dart
Scrollbar(
  child: //...
);
ScrollbarThemeData(
  // This will always show the track for any state.
  trackVisibility: MaterialStateProperty<bool>.all(true),
);
// Or
ScrollbarThemeData(
  // Only show on hover.
  trackVisibility: (Set<MaterialState> states) => states.contains(MaterialState.hovered),
);
```

**參考資料**

API 文件：

* [`Scrollbar`][]
* [`ScrollbarThemeData`][]
* [`MaterialState`][]
* [`MaterialStateProperty`][]

相關 PR：

* 在 [#111706][] 中標記為已淘汰
* 在 [#144180][] 中移除

[`Scrollbar`]: https://api.flutter.dev/flutter/material/Scrollbar-class.html
[`ScrollbarThemeData`]: https://api.flutter.dev/flutter/material/ScrollbarThemeData-class.html
[`MaterialState`]: https://api.flutter.dev/flutter/material/MaterialState-class.html
[`MaterialStateProperty`]: https://api.flutter.dev/flutter/material/MaterialStateProperty-class.html

[#111706]: https://github.com/flutter/flutter/pull/111706
[#144180]: https://github.com/flutter/flutter/pull/144180

---

### `KeepAliveHandle.release` 方法

套件：flutter
Flutter Fix 支援：否

`KeepAliveHandle` 的 `release` 方法自 v3.3 之後已被移除，並改為呼叫 `dispose`。進行此變更的原因是發現 `release` 經常被呼叫後，未再呼叫 `dispose`，導致記憶體洩漏。現在 `dispose` 方法執行的功能與過去的 `release` 相同。


**遷移指南**

遷移前的程式碼：

```dart
KeepAliveHandle handle = KeepAliveHandle();
handle.release();
handle.dispose();
```

遷移後的程式碼：

```dart
KeepAliveHandle handle = KeepAliveHandle();
handle.dispose();
```

**參考資料**

API 文件：

* [`KeepAliveHandle`][]

相關 PR：

* 在 [#108384][] 標記為已淘汰
* 在 [#143961][] 移除

[`KeepAliveHandle`]: https://api.flutter.dev/flutter/widgets/KeepAliveHandle-class.html

[#108384]: https://github.com/flutter/flutter/pull/108384
[#143961]: https://github.com/flutter/flutter/pull/143961

---

### `InteractiveViewer.alignPanAxis`

套件：flutter
Flutter Fix 支援：是

`InteractiveViewer` 的 `alignPanAxis` 屬性已於 v3.3 之後移除，並以 `panAxis` 取代。此更動是為了讓 `InteractiveViewer` 支援更多平移（panning）模式。


**遷移指南**

遷移前的程式碼：

```dart
InteractiveViewer(
  alignPanAxis: true,
);
```

遷移後的程式碼：

```dart
InteractiveViewer(
  panAxis: PanAxis.aligned,
);
```

**參考資料**

API 文件：

* [`InteractiveViewer`][]
* [`PanAxis`][]

相關 PR：

* 在 [#109014][] 標記為已淘汰
* 在 [#142500][] 移除

[`InteractiveViewer`]: https://api.flutter.dev/flutter/widgets/InteractiveViewer-class.html
[`PanAxis`]: https://api.flutter.dev/flutter/widgets/PanAxis.html

[#109014]: https://github.com/flutter/flutter/pull/109014
[#142500]: https://github.com/flutter/flutter/pull/142500

---

### `MediaQuery.boldTextOverride`

套件：flutter
Flutter Fix 支援：是

`MediaQuery` 的 `boldTextOverride` 方法自 v3.5 之後已被移除，並以 `boldTextOf` 取代。這項變更是 `MediaQuery` 大規模重構的一部分，最顯著的改進是減少依賴該元件 (Widget) 的元件所觸發的重建次數。


**遷移指南**

遷移前的程式碼：

```dart
MediaQuery.boldTextOverride(context);
```

遷移後的程式碼：

```dart
MediaQuery.boldTextOf(context)
```

**參考資料**

API 文件：

* [`MediaQuery`][]

相關 PR：

* 在 [#114459][] 標記為已淘汰
* 在 [#143960][] 移除

[`MediaQuery`]: https://api.flutter.dev/flutter/widgets/MediaQuery-class.html

[#114459]: https://github.com/flutter/flutter/pull/114459
[#143960]: https://github.com/flutter/flutter/pull/143960

---

### `AnimatedList` 的 builder 類型定義重新命名

套件：flutter
Flutter Fix 支援：否

隨著 `AnimatedGrid` 的加入，`AnimatedList` 已重構為共用一個基底類別。原本命名為 `AnimatedListItemBuilder` 和 `AnimatedListRemovedItemBuilder` 的類型定義，於 v3.5 之後重新命名，以更貼近其實際可搭配的類別。請將所有 `AnimatedItemBuilder` 和 `AnimatedRemovedItemBuilder` 的引用重新命名。

**參考資料**

API 文件：

* [`AnimatedGrid`][]
* [`AnimatedList`][]
* [`AnimatedItemBuilder`][]
* [`AnimatedRemovedItemBuilder`][]

相關 PR：

* 在 [#113793][] 標記為已淘汰
* 在 [#143974][] 移除

[`AnimatedGrid`]: https://api.flutter.dev/flutter/widgets/AnimatedGrid-class.html
[`AnimatedList`]: https://api.flutter.dev/flutter/widgets/AnimatedList-class.html
[`AnimatedItemBuilder`]: https://api.flutter.dev/flutter/widgets/AnimatedItemBuilder.html
[`AnimatedRemovedItemBuilder`]: https://api.flutter.dev/flutter/widgets/AnimatedRemovedItemBuilder.html

[#113793]: https://github.com/flutter/flutter/pull/113793
[#143974]: https://github.com/flutter/flutter/pull/143974

---

### `FlutterDriver.enableAccessibility`

套件：flutter_driver
Flutter Fix 支援：是

`flutterDriver` 的 `enableAccessibility` 方法已於 v2.3 標記為已淘汰。該方法已被移除，並以 `setSemantics` 取代。這項變更讓你可以選擇啟用或停用無障礙功能，而不再只能啟用。

**遷移指南**

遷移前的程式碼：

```dart
FlutterDriver driver = FlutterDriver.connectedTo(
  // ...
);
driver.enableAccessibility();
```

遷移後的程式碼：

```dart
FlutterDriver driver = FlutterDriver.connectedTo(
  // ...
);
driver.setSemantics(true);
```

**參考資料**

API 文件：

* [`FlutterDriver`][]

相關 PR：

* 已在 [#82939][] 標記為已淘汰
* 已在 [#143979][] 移除

[`FlutterDriver`]: https://api.flutter.dev/flutter/flutter_driver/FlutterDriver-class.html

[#82939]: https://github.com/flutter/flutter/pull/82939
[#143979]: https://github.com/flutter/flutter/pull/143979

---

### `TimelineSummary.writeSummaryToFile`

套件：flutter_driver
Flutter Fix 支援：是

`TimelineSummary` 的 `writeSummaryToFile` 方法已在 v2.1 被標記為已淘汰，
並已移除且以 `writeTimelineToFile` 取代。

**遷移指南**

遷移前的程式碼：

```dart
TimelineSummary summary = TimelineSummary.summarize(
  myTimeline,
);
summary.writeSummaryToFile(
  traceName,
  pretty: true,
);
```

遷移後的程式碼：

```dart
TimelineSummary summary = TimelineSummary.summarize(
  myTimeline,
);
summary.writeTimelineToFile(
  traceName,
  pretty: true,
);
```

**參考資料**

API 文件：

* [`TimelineSummary`][]

相關 PR：

* 在 [#79310][] 宣告為已淘汰
* 在 [#143983][] 移除

[`TimelineSummary`]: https://api.flutter.dev/flutter/flutter_driver/TimelineSummary-class.html

[#79310]: https://github.com/flutter/flutter/pull/79310
[#143983]: https://github.com/flutter/flutter/pull/143983

### `Android Platform Views on API 22 and below `

Flutter Fix 支援：否

自 Flutter 3.0 起，平台視圖（platform views）需要 API 23 或更高版本。在 Flutter 3.19 中，若於執行 API 等級 22 或以下的 Android 裝置上使用平台視圖，現在會拋出 `UnsupportedOperationException`。

**遷移指南**

請將最低 API 等級設定為 23（或更高），或在顯示平台視圖前檢查 Android API 等級。

---

[先前已公告][previously announced] 與內容選單（context menus）相關的淘汰（deprecations），包括 `ToolbarOptions`，以及部分 `TextSelectionController` 和 `SelectableRegionState`，本次版本尚未移除，以便提供更多遷移時間。
預計這些淘汰項目將於下個週期移除，屆時會再次公告。

[previously announced]: https://groups.google.com/g/flutter-announce/c/8XjXpUKlnf8

---

## 時程

穩定版發佈：3.22.0

