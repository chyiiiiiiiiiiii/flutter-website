---
title: v1.22 之後移除的已棄用 API
description: >
  在達到生命週期終止後，
  下列已棄用的 API 已從 Flutter 中移除。
---

## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 1.22 穩定版發布後達到生命週期終止的已棄用 API 已被移除。
這是 Flutter 首次移除已棄用的 API，
其中部分棄用甚至早於我們的
遷移指南政策。

所有受影響的 API 都已彙整於此
主要來源文件，以協助遷移。
另有[快速參考表][quick reference sheet]可供查閱。

如需更多關於 Flutter 棄用政策的背景說明，請參考[設計文件][design document]與[文章][article]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-1-22
[design document]: /go/deprecation-lifetime
[article]: {{site.flutter-medium}}/deprecation-lifetime-in-flutter-e4d76ee738ad

## 變更內容

本節將依受影響的類別列出所有棄用項目。

### `CupertinoDialog`

支援修正工具：僅限 IDE 修正。

`CupertinoDialog` 已於 v0.2.3 棄用。
請改用 `CupertinoAlertDialog` 或 `CupertinoPopupSurface`。

**遷移指南**

*CupertinoAlertDialog*

遷移前的程式碼：

```dart
CupertinoDialog(child: myWidget);
```

遷移後的程式碼：

```dart
CupertinoAlertDialog(content: myWidget);
```

*CupertinoPopupSurface*

遷移前的程式碼：

```dart
CupertinoDialog(child: myWidget);
```

遷移後的程式碼：

```dart
CupertinoPopupSurface(child: myWidget);
```

**參考資料**

API 文件：

* [`CupertinoAlertDialog`][`CupertinoAlertDialog`]
* [`CupertinoPopupSurface`][`CupertinoPopupSurface`]

相關議題：

* [Deprecate CupertinoDialog class][Deprecate CupertinoDialog class]

相關 PR：

* 已在 [#20649][#20649] 標記為過時
* 已在 [#73604][#73604] 移除

[`CupertinoAlertDialog`]: {{site.api}}/flutter/cupertino/CupertinoAlertDialog-class.html
[`CupertinoPopupSurface`]: {{site.api}}/flutter/cupertino/CupertinoPopupSurface-class.html
[Deprecate CupertinoDialog class]: {{site.repo.flutter}}/issues/20397
[#20649]: {{site.repo.flutter}}/pull/20649
[#73604]: {{site.repo.flutter}}/pull/73604

---

### Cupertino 導航列的 `actionsForegroundColor`

支援修正工具：否

`CupertinoNavigationBar.actionsForegroundColor`
和 `CupertinoSliverNavigationBar.actionsForegroundColor`
自 v1.1.2 起已被標記為過時。
現在請在 `CupertinoTheme` 中設定 `primaryColor` 來傳遞此屬性。
若要存取 `primaryColor`，
請呼叫 `CupertinoTheme.of(context).primaryColor`。

**遷移指南**

遷移前的程式碼：

```dart
CupertinoNavigationBar(
  actionsForegroundColor: CupertinoColors.systemBlue,
);
CupertinoSliverNavigationBar(
  actionsForegroundColor: CupertinoColors.systemBlue,
);
```

遷移後的程式碼：

```dart
CupertinoTheme(
  data: CupertinoThemeData(
    primaryColor: CupertinoColors.systemBlue
  ),
  child: ...
);

// To access the color from the `CupertinoTheme`
CupertinoTheme.of(context).primaryColor;
```

**參考資料**

API 文件：

* [`CupertinoNavigationBar`][`CupertinoNavigationBar`]
* [`CupertinoSliverNavigationBar`][`CupertinoSliverNavigationBar`]
* [`CupertinoTheme`][`CupertinoTheme`]
* [`CupertinoThemeData`][`CupertinoThemeData`]

相關議題：

* [Create a CupertinoApp and a CupertinoTheme][Create a CupertinoApp and a CupertinoTheme]

相關 PR：

* 在 [#23759][#23759] 中標記為已淘汰
* 在 [#73745][#73745] 中移除

[`CupertinoNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoNavigationBar-class.html
[`CupertinoSliverNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoSliverNavigationBar-class.html
[`CupertinoTheme`]: {{site.api}}/flutter/cupertino/CupertinoTheme-class.html
[`CupertinoThemeData`]: {{site.api}}/flutter/cupertino/CupertinoThemeData-class.html
[Create a CupertinoApp and a CupertinoTheme]: {{site.repo.flutter}}/issues/18037
[#23759]: {{site.repo.flutter}}/pull/23759
[#73745]: {{site.repo.flutter}}/pull/73745

---

### `CupertinoTextThemeData.brightness`

支援修正工具：是

`CupertinoTextThemeData.brightness` 已於 v1.10.14 標記為已淘汰（deprecated）。
此欄位成員在標記為已淘汰時即已無效。
此參數沒有替代方案，應將相關引用移除。

**遷移指南**

遷移前的程式碼：

```dart
const CupertinoTextThemeData themeData = CupertinoTextThemeData(brightness: Brightness.dark);
themeData.copyWith(brightness: Brightness.light);
```

遷移後的程式碼：

```dart
const CupertinoTextThemeData themeData = CupertinoTextThemeData();
themeData.copyWith();
```

**參考資料**

API 文件：

* [`CupertinoTextThemeData`][`CupertinoTextThemeData`]

相關議題：

* [Revise CupertinoColors and CupertinoTheme for dynamic colors][Revise CupertinoColors and CupertinoTheme for dynamic colors]

相關 PR：

* 已在 [#41859][#41859] 標記為過時
* 已在 [#72017][#72017] 移除

[`CupertinoTextThemeData`]: {{site.api}}/flutter/cupertino/CupertinoTextThemeData-class.html
[Revise CupertinoColors and CupertinoTheme for dynamic colors]: {{site.repo.flutter}}/issues/35541
[#41859]: {{site.repo.flutter}}/pull/41859
[#72017]: {{site.repo.flutter}}/pull/72017

---

### Pointer events constructed `fromHoverEvent`

支援修正工具：是

`fromHoverEvent` 的建構函式（constructors）在 `PointerEnterEvent`
和 `PointerExitEvent` 已於 v1.4.3 標記為過時。
建議改用 `fromMouseEvent` 建構函式。

**遷移指南**

遷移前的程式碼：

```dart
final PointerEnterEvent enterEvent = PointerEnterEvent.fromHoverEvent(PointerHoverEvent());
final PointerExitEvent exitEvent = PointerExitEvent.fromHoverEvent(PointerHoverEvent());
```

遷移後的程式碼：

```dart
final PointerEnterEvent enterEvent = PointerEnterEvent.fromMouseEvent(PointerHoverEvent());
final PointerExitEvent exitEvent = PointerExitEvent.fromMouseEvent(PointerHoverEvent());
```

**參考資料**

API 文件：

* [`PointerEnterEvent`][`PointerEnterEvent`]
* [`PointerExitEvent`][`PointerExitEvent`]

相關議題：

* [PointerEnterEvent 和 PointerExitEvent 只能從 hover 事件建立][]

相關 PR：

* 已在 [#28602][#28602] 標記為不建議使用
* 已在 [#72395][#72395] 移除

[`PointerEnterEvent`]: {{site.api}}/flutter/gestures/PointerEnterEvent-class.html
[`PointerExitEvent`]: {{site.api}}/flutter/gestures/PointerExitEvent-class.html
[PointerEnterEvent and PointerExitEvent can only be created from hover events]: {{site.repo.flutter}}/issues/29696
[#28602]: {{site.repo.flutter}}/pull/28602
[#72395]: {{site.repo.flutter}}/pull/72395

---

### `showDialog` 使用 `builder`

支援修正工具：是

`showDialog` 的 `child` 參數已於 v0.2.3 標記為不建議使用。
應改用 `builder` 參數。

**遷移指南**

遷移前的程式碼：

```dart
showDialog(child: myWidget);
```

遷移後的程式碼：
```dart
showDialog(builder: (context) => myWidget);
```

**參考資料**

API 文件：

* [`showDialog`][`showDialog`]

相關議題：

* [showDialog 應該接收 builder 而非 child][showDialog should take a builder rather than a child]

相關 PR：

* 在 [#15303][#15303] 中標記為已淘汰
* 在 [#72532][#72532] 中移除
 
[`showDialog`]: {{site.api}}/flutter/material/showDialog.html
[showDialog should take a builder rather than a child]: {{site.repo.flutter}}/issues/14341
[#15303]: {{site.repo.flutter}}/pull/15303
[#72532]: {{site.repo.flutter}}/pull/72532

---

### `Scaffold.resizeToAvoidBottomPadding`

支援修正工具：是

`Scaffold` 的 `resizeToAvoidBottomPadding` 參數自 v1.1.9 起已被淘汰。
請改用 `resizeToAvoidBottomInset` 參數。

**遷移指南**
 
遷移前的程式碼：

```dart
Scaffold(resizeToAvoidBottomPadding: true);
```

遷移後的程式碼：

```dart
Scaffold(resizeToAvoidBottomInset: true);
```

**參考資料**

API 文件：

* [`Scaffold`][`Scaffold`]

相關議題：

* [當巢狀使用 Scaffolds 時顯示警告][Show warning when nesting Scaffolds]
* [SafeArea 與鍵盤][SafeArea with keyboard]
* [雙層堆疊的 material scaffolds 不應該重複執行 resizeToAvoidBottomPadding][Double stacked material scaffolds shouldn't double resizeToAvoidBottomPadding]
* [Window 與 MediaQueryData 上的 viewInsets 和 padding 應該定義它們如何互動][viewInsets and padding on Window and MediaQueryData should define how they interact]
* [在 tabbarview 中使用 textfields 時發生底部溢位問題][bottom overflow issue, when using textfields inside tabbarview]

相關 PR：

* 在 [#26259][#26259] 中標記為已淘汰
* 在 [#72890][#72890] 中移除

[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[Show warning when nesting Scaffolds]: {{site.repo.flutter}}/issues/23106
[SafeArea with keyboard]: {{site.repo.flutter}}/issues/25758
[Double stacked material scaffolds shouldn't double resizeToAvoidBottomPadding]: {{site.repo.flutter}}/issues/12084
[viewInsets and padding on Window and MediaQueryData should define how they interact]: {{site.repo.flutter}}/issues/15424
[bottom overflow issue, when using textfields inside tabbarview]: {{site.repo.flutter}}/issues/20295
[#26259]: {{site.repo.flutter}}/pull/26259
[#72890]: {{site.repo.flutter}}/pull/72890

---

### `ButtonTheme.bar`

支援修正工具：否

`ButtonTheme` 的 `bar` 建構函式已於 v1.9.1 被標記為已淘汰（deprecated）。
針對 `ButtonBar`，可以改用 `ButtonBarTheme`，
若用途不限於 `ButtonBar`，也可使用 `ButtonTheme` 的其他建構函式。

針對按鈕的主題化（theming），也可使用 `TextButtonTheme`、
`ElevatedButtonTheme` 和 `OutlinedButtonTheme` 類別，
它們分別對應到相應的按鈕類別，
`TextButton`、`ElevatedButton` 和 `OutlinedButton`。

**遷移指南**

遷移前的程式碼：

```dart
ButtonTheme.bar(
  minWidth: 10.0,
  alignedDropdown: true,
  height: 40.0,
);
```

遷移後的程式碼，使用 `ButtonTheme`：

```dart
ButtonTheme(
  minWidth: 10.0,
  alignedDropdown: true,
  height: 40.0,
);
```

遷移後，使用 `ButtonBarTheme` 的程式碼：

```dart
ButtonBarTheme(
  data: ButtonBarThemeData(
    buttonMinWidth: 10.0,
    buttonAlignedDropdown: true,
    buttonHeight: 40.0,
  )
);
```

**參考資料**

API 文件：

* [`ButtonTheme`][`ButtonTheme`]
* [`ButtonBarTheme`][`ButtonBarTheme`]
* [`ButtonBar`][`ButtonBar`]
* [`TextButtonTheme`][`TextButtonTheme`]
* [`TextButton`][`TextButton`]
* [`ElevatedButtonTheme`][`ElevatedButtonTheme`]
* [`ElevatedButton`][`ElevatedButton`]
* [`OutlinedButtonTheme`][`OutlinedButtonTheme`]
* [`OutlinedButton`][`OutlinedButton`]

相關議題：

* [ButtonTheme.bar uses accent color when it should be using primary color][ButtonTheme.bar uses accent color when it should be using primary color]
* [ThemeData.accentColor has insufficient contrast for text][ThemeData.accentColor has insufficient contrast for text]
* [Increased height as a result of changes to materialTapTargetSize affecting AlertDialog/ButtonBar heights][Increased height as a result of changes to materialTapTargetSize affecting AlertDialog/ButtonBar heights]

相關 PR：

* 於 [#37544][#37544] 標記為已淘汰
* 於 [#73746][#73746] 移除

[`ButtonTheme`]: {{site.api}}/flutter/material/ButtonTheme-class.html
[`ButtonBarTheme`]: {{site.api}}/flutter/material/ButtonBarTheme-class.html
[`ButtonBar`]: {{site.api}}/flutter/material/ButtonBar-class.html
[`TextButtonTheme`]: {{site.api}}/flutter/material/TextButtonTheme-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`ElevatedButtonTheme`]: {{site.api}}/flutter/material/ElevatedButtonTheme-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`OutlinedButtonTheme`]: {{site.api}}/flutter/material/OutlinedButtonTheme-class.html
[`OutlinedButton`]: {{site.api}}/flutter/material/OutlinedButton-class.html
[ButtonTheme.bar uses accent color when it should be using primary color]: {{site.repo.flutter}}/issues/31333
[ThemeData.accentColor has insufficient contrast for text]: {{site.repo.flutter}}/issues/19946
[Increased height as a result of changes to materialTapTargetSize affecting AlertDialog/ButtonBar heights]: {{site.repo.flutter}}/issues/20585
[#37544]: {{site.repo.flutter}}/pull/37544
[#73746]: {{site.repo.flutter}}/pull/73746

---

### `InlineSpan`、`TextSpan`、`PlaceholderSpan`

支援修正工具：否

以下方法在
`InlineSpan`、`TextSpan` 及 `PlaceholderSpan` 中被標記為已淘汰，
以支援將元件（Widgets）內嵌於段落中，例如圖片。

**遷移指南**

遷移前的程式碼 | 遷移後的程式碼
-- | --
`InlineSpan.text` | `TextSpan.text`
`InlineSpan.children` | `TextSpan.children`
`InlineSpan.visitTextSpan` | `InlineSpan.visitChildren`
`InlineSpan.recognizer` | `TextSpan.recognizer`
`InlineSpan.describeSemantics` | `InlineSpan.computeSemanticsInformation`
`PlaceholderSpan.visitTextSpan` | `PlaceHolderSpan.visitChildren`
`TextSpan.visitTextSpan` |  `TextSpan.visitChildren`

**參考資料**

API 文件：

* [`InlineSpan`][`InlineSpan`]
* [`TextSpan`][`TextSpan`]
* [`PlaceholderSpan`][`PlaceholderSpan`]
* [`WidgetSpan`][`WidgetSpan`]

相關議題：

* [Text: support inline images][Text: support inline images]

相關 PR：

* 開發歷程：
  * [#30069][#30069]
  * [#33946][#33946]
  * [#33794][#33794]
* 於 [#34051][#34051] 標記為已淘汰
* 於 [#73747][#73747] 移除

[`InlineSpan`]: {{site.api}}/flutter/painting/InlineSpan-class.html
[`TextSpan`]: {{site.api}}/flutter/painting/TextSpan-class.html
[`PlaceholderSpan`]: {{site.api}}/flutter/painting/PlaceholderSpan-class.html
[`WidgetSpan`]: {{site.api}}/flutter/widgets/WidgetSpan-class.html
[Text: support inline images]: {{site.repo.flutter}}/issues/2022
[#30069]: {{site.repo.flutter}}/pull/30069
[#33946]: {{site.repo.flutter}}/pull/33946
[#33794]: {{site.repo.flutter}}/pull/33794
[#34051]: {{site.repo.flutter}}/pull/34051
[#73747]: {{site.repo.flutter}}/pull/73747

---

### `RenderView.scheduleInitialFrame`

支援修正工具：否

`RenderView.scheduleInitialFrame` 方法已被標記為淘汰並移除，
以避免啟動畫面（splash screen）過早被移除，
導致出現黑畫面。
當呼叫 `WidgetsFlutterBinding.ensureInitialized` 時會發生此問題。
請改為使用 `RenderView.prepareInitialFrame`，
並接著呼叫 `RenderView.owner.requestVisualUpdate` 來取代此方法。

**遷移指南**

遷移前的程式碼：

```dart
scheduleInitialFrame();
```

遷移後的程式碼：

```dart
prepareInitialFrame();
owner.requestVisualUpdate();
```

**參考資料**

API 文件：

* [`RenderView`][`RenderView`]
* [`WidgetsFlutterBinding`][`WidgetsFlutterBinding`]

相關議題：

* [WidgetsFlutterBinding.ensureInitialized() takes down splash screen too early][WidgetsFlutterBinding.ensureInitialized() takes down splash screen too early]

相關 PR：

* 已在 [#39535][#39535] 標記為過時
* 已在 [#73748][#73748] 移除

[`RenderView`]: {{site.api}}/flutter/rendering/RenderView-class.html
[`TextSpan`]: {{site.api}}/flutter/widgets/WidgetsFlutterBinding-class.html
[`WidgetsFlutterBinding`]: {{site.api}}/flutter/widgets/WidgetsFlutterBinding-class.html
[WidgetsFlutterBinding.ensureInitialized() takes down splash screen too early]: {{site.repo.flutter}}/issues/39494
[#39535]: {{site.repo.flutter}}/pull/39535
[#73748]: {{site.repo.flutter}}/pull/73748

---

### `Layer.findAll`

支援修正工具：否

`Layer.findAll` 方法在引入 `Layer.findAnnotations` 時被標記為過時，
目的是統一 `find` 與 `findAll` 的實作方式。
若要遷移受影響的程式碼，請改為呼叫 `findAllAnnotations`。
此方法會回傳一個 `AnnotationResult`，其中包含原本
`findAll` 在 `AnnotationResult.annotations` 中的回傳值。

**遷移指南**

遷移前的程式碼：

```dart
findAll(offset);
```

遷移後的程式碼：

```dart
findAllAnnotations(offset).annotations;
```

**參考資料**

API 文件：

* [`Layer`][`Layer`]
* [`MouseRegion`][`MouseRegion`]
* [`RenderMouseRegion`][`RenderMouseRegion`]
* [`AnnotatedRegionLayer`][`AnnotatedRegionLayer`]
* [`AnnotationResult`][`AnnotationResult`]

相關議題：

* [重大變更提案：MouseRegion 預設為 opaque；Layers 需實作 findAnnotations][Breaking Proposal: MouseRegion defaults to opaque; Layers are required to implement findAnnotations]

相關 PR：

* 最初變更於 [#37896][#37896]
* 棄用於 [#42953][#42953]
* 移除於 [#73749][#73749]

[`Layer`]: {{site.api}}/flutter/rendering/Layer-class.html
[`MouseRegion`]: {{site.api}}/flutter/widgets/MouseRegion-class.html
[`RenderMouseRegion`]: {{site.api}}/flutter/rendering/RenderMouseRegion-class.html
[`AnnotatedRegionLayer`]: {{site.api}}/flutter/rendering/AnnotatedRegionLayer-class.html
[`AnnotationResult`]: {{site.api}}/flutter/rendering/AnnotationResult-class.html
[Breaking Proposal: MouseRegion defaults to opaque; Layers are required to implement findAnnotations]: {{site.repo.flutter}}/issues/38488
[#37896]: {{site.repo.flutter}}/pull/37896
[#42953]: {{site.repo.flutter}}/pull/42953
[#73749]: {{site.repo.flutter}}/pull/73749

---

### `BinaryMessages`

修正工具支援：否

`BinaryMessages` 類別、其相關的靜態方法以及 `defaultBinaryMessenger` getter 已被棄用並移除。`defaultBinaryMessenger` 實例已移至 `ServicesBinding`。這使得在測試環境下，可以註冊不同的預設 `BinaryMessenger`，只需為測試建立 `ServicesBinding` 子類別即可。這樣做可以讓你追蹤待處理平台訊息的數量，以利同步用途。

**遷移指南**

遷移前程式碼： | 遷移後程式碼：
-- | --
`defaultBinaryMessenger` | `ServicesBinding.instance.defaultBinaryMessenger`
`BinaryMessages` | `BinaryMessenger`
`BinaryMessages.handlePlatformMessage` | `ServicesBinding.instance.defaultBinaryMessenger.handlePlatformMessage`
`BinaryMessages.send` | `ServicesBinding.instance.defaultBinaryMessenger.send`
`BinaryMessages.setMessageHandler` | `ServicesBinding.instance.defaultBinaryMessenger.setMessageHandler`
`BinaryMessages.setMockMessageHandler` | `ServicesBinding.instance.defaultBinaryMessenger.setMockMessageHandler`

**參考資料**

API 文件：

* [`ServicesBinding`][`ServicesBinding`]
* [`BinaryMessenger`][`BinaryMessenger`]

相關議題：

* [Flutter 對 Espresso/EarlGrey 的同步支援][Flutter synchronization support for Espresso/EarlGrey]

相關 PR：

* 最初變更於 [#37489][#37489]
* 棄用於 [#38464][#38464]
* 移除於 [#73750][#73750]

[`ServicesBinding`]: {{site.api}}/flutter/services/ServicesBinding-mixin.html
[`BinaryMessenger`]: {{site.api}}/flutter/services/BinaryMessenger-class.html
[Flutter synchronization support for Espresso/EarlGrey]: {{site.repo.flutter}}/issues/37409
[#37489]: {{site.repo.flutter}}/pull/37489
[#38464]: {{site.repo.flutter}}/pull/38464
[#73750]: {{site.repo.flutter}}/pull/73750

---

### `BuildContext` 的泛型方法

修正工具支援：是

`BuildContext` 中有多個方法使用 `Type` 來搜尋祖先。這些方法大多在呼叫端需要進行型別轉換，因為它們的回傳型別是父類型。此外，即使型別實際上有限制，分析時也不會檢查所提供的型別。將這些方法改為泛型後，能提升型別安全性並減少程式碼量。

這些方法的變更會影響 `BuildContext`、`Element` 和 `StatefulElement` 類別。`TypeMatcher` 類別也已被移除。

**遷移指南**

遷移前程式碼：

```dart
ComplexLayoutState state = context.ancestorStateOfType(const TypeMatcher<ComplexLayoutState>()) as ComplexLayoutState;
```

遷移後的程式碼：

```dart
ComplexLayoutState state = context.ancestorStateOfType<ComplexLayoutState>();
```

`BuildContext`

遷移前的程式碼： | 遷移後的程式碼：
--  | --
`inheritFromElement` | `dependOnInheritedElement`
`inheritFromWidgetOfExactType` | `dependOnInheritedWidgetOfExactType`
`ancestorInheritedElementForWidgetOfExactType` | `getElementForInheritedWidgetOfExactType`
`ancestorWidgetOfExactType` | `findAncestorWidgetOfExactType`
`ancestorStateOfType` | `findAncestorStateOfType`
`rootAncestorStateOfType` | `findRootAncestorStateOfType`
`ancestorRenderObjectOfType` | `findAncestorRenderObjectOfType`

`Element`

遷移前的程式碼： | 遷移後的程式碼：
--  | --
`inheritFromElement` | `dependOnInheritedElement`
`inheritFromWidgetOfExactType` | `dependOnInheritedWidgetOfExactType`
`ancestorInheritedElementForWidgetOfExactType` | `getElementForInheritedWidgetOfExactType`
`ancestorWidgetOfExactType` | `findAncestorWidgetOfExactType`
`ancestorStateOfType` | `findAncestorStateOfType`
`rootAncestorStateOfType` | `findRootAncestorStateOfType`
`ancestorRenderObjectOfType` | `findAncestorRenderObjectOfType`

`StatefulElement`

遷移前的程式碼： | 遷移後的程式碼：
--  | --
`inheritFromElement` | `dependOnInheritedElement`

**參考資料**

API 文件：

* [`Type`][`Type`]
* [`BuildContext`][`BuildContext`]
* [`Element`][`Element`]
* [`StatefulElement`][`StatefulElement`]

相關 PR：

* 在 [#44189][#44189] 中標記為已淘汰
* 已於以下 PR 移除：
  * [#69620][#69620]
  * [#72903][#72903]
  * [#72901][#72901]
  * [#73751][#73751]

[`Type`]: {{site.api}}/flutter/dart-core/Type-class.html
[`BuildContext`]: {{site.api}}/flutter/widgets/BuildContext-class.html
[`Element`]: {{site.api}}/flutter/widgets/Element-class.html
[`StatefulElement`]: {{site.api}}/flutter/widgets/StatefulElement-class.html
[#44189]: {{site.repo.flutter}}/pull/44189
[#69620]: {{site.repo.flutter}}/pull/69620
[#72903]: {{site.repo.flutter}}/pull/72903
[#72901]: {{site.repo.flutter}}/pull/72901
[#73751]: {{site.repo.flutter}}/pull/73751

---

### `WidgetsBinding.deferFirstFrameReport` & `WidgetsBinding.allowFirstFrameReport`

支援自動修復工具：是

`WidgetsBinding` 的 `deferFirstFrameReport` 和 `allowFirstFrameReport` 方法
已被標記為淘汰並移除，以便提供延遲首次繪製畫面的選項。
這對於需要非同步取得初始化資訊的元件（Widgets）非常有用，
在等待這些資訊的期間，不應繪製任何畫面，否則會導致啟動畫面過早消失。
請分別改用 `deferFirstFrame` 和 `allowFirstFrame` 方法。

**遷移指南**

遷移前的程式碼：

```dart
final WidgetsBinding binding = WidgetsBinding.instance;
binding.deferFirstFrameReport();
binding.allowFirstFrameReport();
```

遷移後的程式碼：

```dart
final WidgetsBinding binding = WidgetsBinding.instance;
binding.deferFirstFrame();
binding.allowFirstFrame();
```

**參考資料**

API 文件：

* [`WidgetsBinding`][`WidgetsBinding`]

相關 PR：

* 最初變更於
  * [#45135][#45135]
  * [#45588][#45588]
* 在 [#45941][#45941] 標記為已淘汰
* 在 [#72893][#72893] 移除

[`WidgetsBinding`]: {{site.api}}/flutter/widgets/WidgetsBinding-mixin.html
[#45135]: {{site.repo.flutter}}/pull/45135
[#45588]: {{site.repo.flutter}}/pull/45588
[#45941]: {{site.repo.flutter}}/pull/45941
[#72893]: {{site.repo.flutter}}/pull/72893

---

### `WaitUntilNoTransientCallbacks`、`WaitUntilNoPendingFrame` 與 `WaitUntilFirstFrameRasterized`

支援自動修復工具：否

`flutter_driver` 套件中的 `WaitUntilNoTransientCallbacks`、`WaitUntilNoPendingFrame` 和 `WaitUntilFirstFrameRasterized` 方法已被標記為已淘汰並移除，以提供更具組合性的 `waitForCondition` API，讓用戶端能夠自行組合想要等待的條件。

**遷移指南**

遷移前程式碼： | 遷移後程式碼：
-- | --
`WaitUntilNoTransientCallbacks` | `WaitForCondition(NoTransientCallbacks())`
`WaitUntilNoPendingFrame` | `WaitForCondition(NoPendingFrame())`
`WaitUntilFirstFrameRasterized` | `WaitForCondition(FirstFrameRasterized))`

**參考資料**

API 文件：

* [`WaitForCondition`][`WaitForCondition`]

相關議題：

* [Flutter synchronization support for Espresso/EarlGrey][Flutter synchronization support for Espresso/EarlGrey]

相關 PR：

* 最初變更於 [#37736][#37736]
* 在 [#38836][#38836] 標記為已淘汰
* 在 [#73754][#73754] 移除

[`WaitForCondition`]: {{site.api}}/flutter/flutter_driver/WaitForCondition-class.html
[#37736]: {{site.repo.flutter}}/pull/37736
[#38836]: {{site.repo.flutter}}/pull/38836
[#73754]: {{site.repo.flutter}}/pull/73754

---

## 時程表

穩定版發佈：2.0.0
