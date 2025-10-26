---
title: v3.10 後移除的已棄用 API
description: >
  在達到生命週期結束後，下列已棄用的 API
  已從 Flutter 中移除。
---

## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 3.10 穩定版發佈後達到生命週期結束的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此主要來源，
以協助遷移作業。同時也提供了
[快速參考表][quick reference sheet]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-10

## 變更內容

本節依套件與受影響的類別列出各項棄用項目。

### ThemeData.fixTextFieldOutlineLabel

套件：flutter
支援 Flutter Fix：是

`ThemeData.fixTextFieldOutlineLabel` 於 v2.5 被棄用。
可將對此屬性的參考移除。

`fixTextFieldOutlineLabel` 是一個臨時的遷移旗標，讓使用者
能夠平順地遷移至新行為，而不會直接產生重大破壞。
在棄用前，此屬性已從
修正後的文字欄位 (text field) 標籤行為轉換為新的預設值。

**遷移指南**

遷移前的程式碼：

```dart
var themeData = ThemeData(
  fixTextFieldOutlineLabel: true,  
);
```

遷移後的程式碼：

```dart
var themeData = ThemeData(
);
```

**參考資料**

API 文件：

* [`ThemeData`][`ThemeData`]

相關 PR：

* 在 [#87281][#87281] 標記為已淘汰（Deprecated）
* 在 [#125893][#125893] 移除

[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html

[#87281]: {{site.repo.flutter}}/pull/87281
[#125893]: {{site.repo.flutter}}/pull/125893

---

### OverscrollIndicatorNotification.disallowGlow

套件：flutter  
Flutter Fix 支援：是

`OverscrollIndicatorNotification.disallowGlow` 已於 v2.5 標記為已淘汰。  
建議使用 `disallowIndicator` 方法作為替代。

`disallowIndicator` 是隨著 `StretchingOverscrollIndicator` 的引入而作為原方法的替代方案。  
在此之前，`GlowingOverscrollIndicator` 是唯一會派發 `OverscrollIndicatorNotification` 的類型，因此該方法已更新，以更好地反映多種指示器類型。

**遷移指南**

遷移前的程式碼：

```dart
bool _handleOverscrollIndicatorNotification(OverscrollIndicatorNotification notification) {
  notification.disallowGlow();
  return false;
}
```

遷移後的程式碼：

```dart
bool _handleOverscrollIndicatorNotification(OverscrollIndicatorNotification notification) {
  notification.disallowIndicator();
  return false;
}
```

**參考資料**

API 文件：

* [`OverscrollIndicatorNotification`][`OverscrollIndicatorNotification`]
* [`StretchingOverscrollIndicator`][`StretchingOverscrollIndicator`]
* [`GlowingOverscrollIndicator`][`GlowingOverscrollIndicator`]

相關 PR：

* 已在 [#87839][#87839] 標記為已淘汰（Deprecated）
* 已在 [#127042][#127042] 移除


[`OverscrollIndicatorNotification`]: {{site.api}}/flutter/widgets/OverscrollIndicatorNotification-class.html
[`StretchingOverscrollIndicator`]: {{site.api}}/flutter/widgets/StretchingOverscrollIndicator-class.html
[`GlowingOverscrollIndicator`]: {{site.api}}/flutter/widgets/GlowingOverscrollIndicator-class.html

[#87839]: {{site.repo.flutter}}/pull/87839
[#127042]: {{site.repo.flutter}}/pull/127042

---

### ColorScheme primaryVariant & secondaryVariant

套件：flutter  
Flutter Fix 支援：是

`ColorScheme.primaryVariant` 和 `ColorScheme.secondaryVariant` 已於 v2.6 被標記為已淘汰（Deprecated）。  
其替代方案分別為 `ColorScheme.primaryContainer` 和 `ColorScheme.secondaryContainer`。

這些變更是為了符合最新的 Material Design  
`ColorScheme` 規範。關於 `ColorScheme` 的更新，可參考  
[ColorScheme for Material 3][ColorScheme for Material 3] 設計文件以獲得更詳細的說明。

**遷移指南**

遷移前的程式碼：

```dart
var colorScheme = ColorScheme(
  primaryVariant: Colors.blue,
  secondaryVariant: Colors.amber,
);
var primaryColor = colorScheme.primaryVariant;
var secondaryColor = colorScheme.secondaryVariant;
```

遷移後的程式碼：

```dart
var colorScheme = ColorScheme(
  primaryContainer: Colors.blue,
  secondaryContainer: Colors.amber,
);
var primaryColor = colorScheme.primaryContainer;
var secondaryColor = colorScheme.secondaryContainer;
```

**參考資料**

設計文件：

* [ColorScheme for Material 3][ColorScheme for Material 3]

API 文件：

* [`ColorScheme`][`ColorScheme`]

相關 PR：

* 在 [#93427][#93427] 標記為已淘汰
* 在 [#127124][#127124] 移除

[ColorScheme for Material 3]: /go/colorscheme-m3

[`ColorScheme`]: {{site.api}}/flutter/material/ColorScheme-class.html

[#93427]: {{site.repo.flutter}}/pull/93427
[#127124]: {{site.repo.flutter}}/pull/127124

---

### ThemeData.primaryColorBrightness

套件：flutter  
Flutter Fix 支援：是

`ThemeData.primaryColorBrightness` 已於 v2.6 被標記為已淘汰，且自那時起框架就不再使用該屬性。建議移除相關參考。現在，`Brightness` 會從 `ThemeData.primaryColor` 推導而來（如果未明確提供 `ThemeData.brightness`）。

此變更是為了將 `Theme` 更新以符合新的 Material Design 指南。關於主題化系統的整體更新，包括移除 `primaryColorBrightness`，可參閱 [Material Theme System Updates][Material Theme System Updates] 設計文件以獲得更詳細的說明。

**遷移指南**

遷移前的程式碼：

```dart
var themeData = ThemeData(
  primaryColorBrightness: Brightness.dark,
);
```

遷移後的程式碼：

```dart
var themeData = ThemeData(
);
```

**參考資料**

設計文件：

* [Material 主題系統更新][Material Theme System Updates]

API 文件：

* [`Theme`][`Theme`]
* [`ThemeData`][`ThemeData`]
* [`Brightness`][`Brightness`]

相關 PR：

* 在 [#93396][#93396] 標記為已淘汰
* 在 [#127238][#127238] 移除

[Material Theme System Updates]: /go/material-theme-system-updates

[`Theme`]: {{site.api}}/flutter/material/Theme-class.html
[`ThemeData`]: {{site.api}}/flutter/material/Theme-class.html
[`Brightness`]: {{site.api}}/flutter/dart-ui/Brightness.html

[#93396]: {{site.repo.flutter}}/pull/93396
[#127238]: {{site.repo.flutter}}/pull/127238

---

### RawScrollbar 及其子類別更新

套件：flutter  
支援 Flutter Fix：是

`RawScrollbar`、`Scrollbar`、`ScrollbarThemeData` 和 `CupertinoScrollbar` 的 `isAlwaysShown` 屬性已於 v2.9 標記為已淘汰。所有情境下的替代方案為 `thumbVisibility`。

進行此變更的原因是，`isAlwaysShown` 一直指的是 scrollbar 的 thumb（滑塊）。隨著 scrollbar track（軌道）的加入，以及針對滑鼠懸停與拖曳時可見性的多種設定，我們將該屬性重新命名，以提供更清晰的 API。

此外，`Scrollbar.hoverThickness` 也於 v2.9 標記為已淘汰。其替代方案為 `MaterialStateProperty` `ScrollbarThemeData.thickness`。

此變更的目的是讓 `Scrollbar` 的 thickness（粗細）能夠對所有狀態做出反應，而不僅僅是懸停。使用 `MaterialStateProperties` 也符合 material 函式庫中根據元件狀態來設定元件的慣例，而不是為每一種互動狀態組合都設置一個屬性。

**遷移指南**

遷移前的程式碼：

```dart
var rawScrollbar = RawScrollbar(
  isAlwaysShown: true,
);
var scrollbar = Scrollbar(
  isAlwaysShown: true,
  hoverThickness: 15.0,
);
var cupertinoScrollbar = CupertinoScrollbar(
  isAlwaysShown: true,
);
var scrollbarThemeData = ScrollbarThemeData(
  isAlwaysShown: true,
);
```

遷移後的程式碼：

```dart
var rawScrollbar = RawScrollbar(
  thumbVisibility: true,
);
var scrollbar = Scrollbar(
  thumbVisibility: true,
);
var cupertinoScrollbar = CupertinoScrollbar(
  thumbVisibility: true,
);
var scrollbarThemeData = ScrollbarThemeData(
  thumbVisibility: true,
  thickness: MaterialStateProperty.resolveWith((Set<MaterialState> states) {
    return states.contains(MaterialState.hovered) ? null : 15.0;
  }),
);
```

**參考資料**

API 文件：

* [`RawScrollbar`][`RawScrollbar`]
* [`Scrollbar`][`Scrollbar`]
* [`CupertinoScrollbar`][`CupertinoScrollbar`]
* [`ScrollbarThemeData`][`ScrollbarThemeData`]
* [`MaterialStateProperty`][`MaterialStateProperty`]
* [`MaterialState`][`MaterialState`]

相關 PR：

* 已在 [#96957][#96957] 標記為已淘汰（Deprecated）
* 已在 [#97173][#97173] 標記為已淘汰（Deprecated）
* 已在 [#127351][#127351] 移除


[`RawScrollbar`]: {{site.api}}/flutter/widgets/RawScrollbar-class.html
[`Scrollbar`]: {{site.api}}/flutter/material/Scrollbar-class.html
[`CupertinoScrollbar`]: {{site.api}}/flutter/cupertino/CupertinoScrollbar-class.html
[`ScrollbarThemeData`]: {{site.api}}/flutter/material/ScrollbarThemeData-class.html
[`MaterialStateProperty`]: {{site.api}}/flutter/material/MaterialStateProperty-class.html
[`MaterialState`]: {{site.api}}/flutter/material/MaterialState.html

[#96957]: {{site.repo.flutter}}/pull/96957
[#97173]: {{site.repo.flutter}}/pull/97173
[#127351]: {{site.repo.flutter}}/pull/127351

---

### AnimationSheetBuilder display & sheetSize

套件：flutter_test  
Flutter Fix 支援：是

`AnimationSheetBuilder` 的 `display` 和 `sheetSize` 方法已在 v2.3 中標記為已淘汰（Deprecated）。建議改用 `collate` 方法。

過去 `AnimationSheetBuilder` 的輸出步驟需要呼叫這兩個方法，但現在僅需單一呼叫 `collate` 即可完成。

`collate` 函式會直接將圖片合併，並以非同步方式回傳一張圖片。這樣不僅減少樣板程式碼，還能輸出更小的圖片，且不會影響品質。

**遷移指南**

[提供詳細遷移指南]

遷移前的程式碼：

```dart
final AnimationSheetBuilder animationSheet = AnimationSheetBuilder(
    frameSize: const Size(40, 40)
);

await tester.pumpFrames(animationSheet.record(
  const Directionality(
    textDirection: TextDirection.ltr,
    child: Padding(
      padding: EdgeInsets.all(4),
      child: CircularProgressIndicator(),
    ),
  ),
), const Duration(seconds: 2));

tester.binding.setSurfaceSize(animationSheet.sheetSize());

final Widget display = await animationSheet.display();
await tester.pumpWidget(display);

await expectLater(
  find.byWidget(display),
  matchesGoldenFile('material.circular_progress_indicator.indeterminate.png'),
);
```

遷移後的程式碼：

```dart
final AnimationSheetBuilder animationSheet = AnimationSheetBuilder(
    frameSize: const Size(40, 40)
);

await tester.pumpFrames(animationSheet.record(
  const Directionality(
    textDirection: TextDirection.ltr,
    child: Padding(
      padding: EdgeInsets.all(4),
      child: CircularProgressIndicator(),
    ),
  ),
), const Duration(seconds: 2));

await expectLater(
  animationSheet.collate(20),
  matchesGoldenFile('material.circular_progress_indicator.indeterminate.png'),
);
```

[In-depth migration guide available]: /release/breaking-changes/animation-sheet-builder-display

**參考資料**

API 文件：

* [`AnimationSheetBuilder`][`AnimationSheetBuilder`]

相關 PR：

* 在 [#83337][#83337] 中已棄用
* 在 [#129657][#129657] 中已移除

[`AnimationSheetBuilder`]: {{site.api}}/flutter/flutter_test/AnimationSheetBuilder-class.html

[#83337]: {{site.repo.flutter}}/pull/83337
[#129657]: {{site.repo.flutter}}/pull/129657

---

---

### flutter_test timeout 邏輯

套件：flutter_test  
Flutter Fix 支援：否

以下與測試 timeout 邏輯相關的 API 已於 v2.6 棄用。這些 API 沒有替代方案，應直接移除相關引用，唯一例外是 `testWidgets` 的 `initialTimeout` 參數，請改用 `timeout` 來取代。

* `TestWidgetsFlutterBinding.addTime`
* `TestWidgetsFlutterBinding.runAsync` 方法 - `additionalTime` 參數
* `TestWidgetsFlutterBinding.runTest` 方法 - `timeout` 參數
* `AutomatedTestWidgetsFlutterBinding.runTest` 方法 - `timeout` 參數
* `LiveTestWidgetsFlutterBinding.runTest` 方法 - `timeout` 參數
* `testWidgets` 方法 - `initialTime` 參數

這些 API 被發現會導致測試不穩定，且實際上並未被測試用戶所使用。

自從這些 API 被棄用後，相關參數的使用對測試已無任何影響，因此移除引用不會影響現有程式碼庫。

**遷移指南**


遷移前的程式碼：

```dart
testWidgets('Test', (_) {}, initialTimeout:  Duration(seconds: 5));
```

遷移後的程式碼：

```dart
testWidgets('Test', (_) {}, timeout:  Timeout(Duration(seconds: 5)));
```

**參考資料**

API 文件：

* [`testWidgets`][`testWidgets`]
* [`TestWidgetsFlutterBinding`][`TestWidgetsFlutterBinding`]
* [`AutomatedTestWidgetsFlutterBinding`][`AutomatedTestWidgetsFlutterBinding`]
* [`LiveTestWidgetsFlutterBinding`][`LiveTestWidgetsFlutterBinding`]

相關 PR：

* 已在 [#89952][#89952] 標記為已淘汰（Deprecated）
* 已在 [#129663][#129663] 移除


[`testWidgets`]: {{site.api}}/flutter/flutter_test/testWidgets.html
[`TestWidgetsFlutterBinding`]: {{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding-class.html
[`AutomatedTestWidgetsFlutterBinding`]: {{site.api}}/flutter/flutter_test/AutomatedTestWidgetsFlutterBinding-class.html
[`LiveTestWidgetsFlutterBinding`]: {{site.api}}/flutter/flutter_test/LiveTestWidgetsFlutterBinding-class.html

[#89952]: {{site.repo.flutter}}/pull/89952
[#129663]: {{site.repo.flutter}}/pull/129663

---

## 時程

在穩定版發行：3.13.0
