---
title: v2.10 之後移除的已棄用 API
description: >
  在達到生命週期終止後，以下已棄用的 API
  已從 Flutter 中移除。
---

## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 2.10 穩定版發佈後達到生命週期終止的已棄用 API 已被移除。

所有受影響的 API 已彙整於此主要來源，協助您進行遷移。
同時也提供[快速參考表][quick reference sheet]。


[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-2-10

## 變更內容

本節依受影響的類別列出棄用項目。

---

### `maxLengthEnforced`（屬於 `TextField` 及相關類別）

Flutter Fix 支援：是

`maxLengthEnforced` 已於 v1.25 棄用。

請改用 `maxLengthEnforcement`。
當 `maxLengthEnforced` 為 true 時，請改為使用 `MaxLengthEnforcement.enforce`。
當 `maxLengthEnforced` 為 false 時，請改為使用 `MaxLengthEnforcement.none`。
此變更允許指定更多行為，不再僅限於原本的二元選擇，並新增了 `MaxLengthEnforcement.truncateAfterCompositionEnds` 作為
額外選項。

以下類別皆有相同的 API 變更：

- `TextField`
- `TextFormField`
- `CupertinoTextField`

**遷移指南**

[詳細遷移指南請參閱][In-depth migration guide available]

遷移前的程式碼：

```dart
const TextField textField = TextField(maxLengthEnforced: true);
const TextField textField = TextField(maxLengthEnforced: false);
final lengthEnforced = textField.maxLengthEnforced;

const TextFormField textFormField = TextFormField(maxLengthEnforced: true);
const TextFormField textFormField = TextFormField(maxLengthEnforced: false);
final lengthEnforced = textFormField.maxLengthEnforced;

const CupertinoTextField cupertinoTextField = CupertinoTextField(maxLengthEnforced: true);
const CupertinoTextField cupertinoTextField = CupertinoTextField(maxLengthEnforced: false);
final lengthEnforced = cupertinoTextField.maxLengthEnforced;
```

遷移後的程式碼：

```dart
const TextField textField = TextField(maxLengthEnforcement: MaxLengthEnforcement.enforce);
const TextField textField = TextField(maxLengthEnforcement: MaxLengthEnforcement.none);
final lengthEnforced = textField.maxLengthEnforcement;

const TextFormField textFormField = TextFormField(maxLengthEnforcement: MaxLengthEnforcement.enforce);
const TextFormField textFormField = TextFormField(maxLengthEnforcement: MaxLengthEnforcement.none);
final lengthEnforced = textFormField.maxLengthEnforcement;

const CupertinoTextField cupertinoTextField = CupertinoTextField(maxLengthEnforcement: MaxLengthEnforcement.enforce);
const CupertinoTextField cupertinoTextField = CupertinoTextField(maxLengthEnforcement: MaxLengthEnforcement.none);
final lengthEnforced = cupertinoTextField.maxLengthEnforcement;
```

**參考資料**

API 文件：

* [`TextField`][`TextField`]
* [`TextFormField`][`TextFormField`]
* [`CupertinoTextField`][`CupertinoTextField`]

相關議題：

* [Issue 67898]({{site.repo.flutter}}/issues/67898)

相關 PR：

* 在 [#68086]({{site.repo.flutter}}/pull/68086) 標記為已淘汰
* 在 [#98539]({{site.repo.flutter}}/pull/98539) 移除

[In-depth migration guide available]: /release/breaking-changes/use-maxLengthEnforcement-instead-of-maxLengthEnforced
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
[`TextFormField`]: {{site.api}}/flutter/material/TextFormField-class.html
[`CupertinoTextField`]: {{site.api}}/flutter/cupertino/CupertinoTextField-class.html

---

### `VelocityTracker` 建構函式

支援 Flutter Fix：是

`VelocityTracker` 的預設建構函式自 v1.22 起已被淘汰。

建議改用 `VelocityTracker.withKind()`。這樣可以為追蹤器指定 `PointerDeviceKind`。先前 `VelocityTracker.kind` 的預設值為 `PointerDeviceKind.touch`。

**遷移指南**

遷移前的程式碼：

```dart
final VelocityTracker tracker = VelocityTracker();
```

遷移後的程式碼：

```dart
final VelocityTracker tracker = VelocityTracker.withKind(PointerDeviceKind.touch);
```

**參考資料**

API 文件：

* [`VelocityTracker`][`VelocityTracker`]
* [`PointerDeviceKind`][`PointerDeviceKind`]

相關 PR：

* 在 [#66043]({{site.repo.flutter}}/pull/66043) 標記為已淘汰（Deprecated）
* 在 [#98541]({{site.repo.flutter}}/pull/98541) 移除

[`VelocityTracker`]: {{site.api}}/flutter/gestures/VelocityTracker-class.html
[`PointerDeviceKind`]: {{site.api}}/flutter/dart-ui/PointerDeviceKind.html

---

### `DayPicker` 與 `MonthPicker`

Flutter Fix 是否支援：否

`DayPicker` 與 `MonthPicker` 元件（Widgets）最初於 v1.15 標記為已淘汰，並於 v1.26 擴充。

它們已被一個更完整的元件（Widget）`CalendarDatePicker` 取代。

這些元件原本是透過 `showDatePicker` 方法顯示。在本次版本之前，該方法已遷移為顯示新的 `CalendarDatePicker`，因此最終移除這些元件時，通常不需要額外處理。

**參考資料**

設計文件：

* [Material Date Picker Redesign][Material Date Picker Redesign]

API 文件：

* [`CalendarDatePicker`][`CalendarDatePicker`]
* [`showDatePicker`][`showDatePicker`]

相關議題：

* [Issue 50133]({{site.repo.flutter}}/issues/50133)

相關 PR：

* 在 [#50546]({{site.repo.flutter}}/issues/50546) 標記為已淘汰（Deprecated）
* 在 [#98543]({{site.repo.flutter}}/issues/98543) 移除

[Material Date Picker Redesign]: /go/material-date-picker-redesign
[`CalendarDatePicker`]: {{site.api}}/flutter/material/CalendarDatePicker-class.html
[`showDatePicker`]: {{site.api}}/flutter/material/showDatePicker.html

---

### `FlatButton`、`RaisedButton` 與 `OutlineButton`

Flutter Fix 是否支援：否

`FlatButton`、`RaisedButton` 以及 `OutlineButton` 元件（Widgets）最初於 v1.20 標記為已淘汰，並於 v1.26 擴充。

它們已被新的按鈕元件（Widgets）`TextButton`、`ElevatedButton` 和 `OutlinedButton` 取代。這些新元件也採用新的專屬主題，而不再使用通用的 `ButtonTheme`。

| 舊元件（Widget） | 舊主題      | 新元件（Widget） | 新主題                |
|------------------|-------------|------------------|-----------------------|
| `FlatButton`           | `ButtonTheme`      | `TextButton`           | `TextButtonTheme`                |
| `RaisedButton`           | `ButtonTheme`      | `ElevatedButton`           | `ElevatedButtonTheme`                |
| `OutlineButton`           | `ButtonTheme`      | `OutlinedButton`           | `OutlinedButtonTheme`                |

{:.table .table-striped .nowrap}

**遷移指南**

[提供詳細樣式調整的遷移指南][In-depth migration guide available for detailed styling]

遷移前的程式碼：

```dart
FlatButton(
  onPressed: onPressed,
  child: Text('Button'),
  // ...
);

RaisedButton(
  onPressed: onPressed,
  child: Text('Button'),
  // ...
);

OutlineButton(
  onPressed: onPressed,
  child: Text('Button'),
  // ...
);
```

遷移後的程式碼：

```dart
TextButton(
  onPressed: onPressed,
  child: Text('Button'),
  // ...
);

ElevatedButton(
  onPressed: onPressed,
  child: Text('Button'),
  // ...
);

OutlinedButton(
  onPressed: onPressed,
  child: Text('Button'),
  // ...
);
```

**參考資料**

設計文件：

* [New Material buttons and themes][New Material buttons and themes]

API 文件：

* [`ButtonStyle`][`ButtonStyle`]
* [`ButtonStyleButton`][`ButtonStyleButton`]
* [`ElevatedButton`][`ElevatedButton`]
* [`ElevatedButtonTheme`][`ElevatedButtonTheme`]
* [`ElevatedButtonThemeData`][`ElevatedButtonThemeData`]
* [`OutlinedButton`][`OutlinedButton`]
* [`OutlinedButtonTheme`][`OutlinedButtonTheme`]
* [`OutlinedButtonThemeData`][`OutlinedButtonThemeData`]
* [`TextButton`][`TextButton`]
* [`TextButtonTheme`][`TextButtonTheme`]
* [`TextButtonThemeData`][`TextButtonThemeData`]

相關 PR：

* 新 API 於 [#59702]({{site.repo.flutter}}/issues/59702) 新增
* 於 [#73352]({{site.repo.flutter}}/issues/73352) 標記為已淘汰
* 於 [#98546]({{site.repo.flutter}}/issues/98546) 移除

[In-depth migration guide available for detailed styling]: /release/breaking-changes/buttons
[New Material buttons and themes]: /go/material-button-migration-guide
[`ButtonStyle`]: {{site.api}}/flutter/material/ButtonStyle-class.html
[`ButtonStyleButton`]: {{site.api}}/flutter/material/ButtonStyleButton-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`ElevatedButtonTheme`]: {{site.api}}/flutter/material/ElevatedButtonTheme-class.html
[`ElevatedButtonThemeData`]: {{site.api}}/flutter/material/ElevatedButtonThemeData-class.html
[`OutlinedButton`]: {{site.api}}/flutter/material/OutlinedButton-class.html
[`OutlinedButtonTheme`]: {{site.api}}/flutter/material/OutlinedButtonTheme-class.html
[`OutlinedButtonThemeData`]: {{site.api}}/flutter/material/OutlinedButtonThemeData-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`TextButtonTheme`]: {{site.api}}/flutter/material/TextButtonTheme-class.html
[`TextButtonThemeData`]: {{site.api}}/flutter/material/TextButtonThemeData-class.html

---

### `Scaffold` `SnackBar` 方法

Flutter Fix 是否支援：否

以下 `Scaffold` `SnackBar` 方法在 v1.23 版本中已被淘汰。

- `showSnackBar`
- `removeCurrentSnackBar`
- `hideCurrentSnackBar`

請改用 `ScaffoldMessenger` 中同名的方法。每個 `MaterialApp` 都已自動建立一個預設的 `ScaffoldMessenger`。

**遷移指南**

[提供詳細遷移指南][In-depth migration guide available]

遷移前的程式碼：

```dart
Scaffold.of(context).showSnackBar(mySnackBar);
Scaffold.of(context).removeCurrentSnackBar(mySnackBar);
Scaffold.of(context).hideCurrentSnackBar(mySnackBar);
```

遷移後的程式碼：

```dart
ScaffoldMessenger.of(context).showSnackBar(mySnackBar);
ScaffoldMessenger.of(context).removeCurrentSnackBar(mySnackBar);
ScaffoldMessenger.of(context).hideCurrentSnackBar(mySnackBar);
```

**參考資料**

設計文件：
* [ScaffoldMessenger 設計][ScaffoldMessenger Design]

影片內容：

* [SnackBar 傳遞][SnackBar Delivery]
* [本週元件 (Widget of the Week)][Widget of the Week]

API 文件：

* [`ScaffoldMessenger`][`ScaffoldMessenger`]
* [`SnackBar`][`SnackBar`]

相關議題：

* [Issue 57218]({{site.repo.flutter}}/issues/57218)
* [Issue 62921]({{site.repo.flutter}}/issues/62921)

相關 PR：

* 新 API 新增於 [#64101]({{site.repo.flutter}}/issues/64101)
* 已棄用於 [#67947]({{site.repo.flutter}}/issues/67947)
* 已移除於 [#98549]({{site.repo.flutter}}/issues/98549)

[In-depth migration guide available]: /release/breaking-changes/scaffold-messenger
[ScaffoldMessenger Design]: /go/scaffold-messenger
[SnackBar Delivery]: https://youtu.be/sYG7HAGu_Eg?t=10271
[Widget of the Week]: https://youtu.be/lytQi-slT5Y
[`ScaffoldMessenger`]: {{site.api}}/flutter/material/ScaffoldMessenger-class.html
[`SnackBar`]: {{site.api}}/flutter/material/SnackBar-class.html

---

### `RectangularSliderTrackShape.disabledThumbGapWidth`

Flutter Fix 支援：是

`RectangularSliderTrackShape.disabledThumbGapWidth` 首次於 v1.5 被棄用，並於 v1.26 擴展。

此 API 已不再被框架使用，因為當滑桿（slider）停用時，滑桿拇指的動畫（Animation）不再執行。

**遷移指南**

遷移前的程式碼：

```dart
RectangularSliderTrackShape(disabledThumbGapWidth: 2.0);
```

遷移後的程式碼：

```dart
RectangularSliderTrackShape();
```

**參考資料**

API 文件：
* [`RectangularSliderTrackShape`][`RectangularSliderTrackShape`]

相關 PR：
* 動畫 (Animation) 變更於 [#30390]({{site.repo.flutter}}/issues/30390)
* 已棄用於 [#65246]({{site.repo.flutter}}/issues/65246)
* 已移除於 [#98613]({{site.repo.flutter}}/issues/98613)

[`RectangularSliderTrackShape`]: {{site.api}}/flutter/material/RectangularSliderTrackShape-class.html

---

### `ThemeData` 到 `TextSelectionThemeData` 的文字選取

支援 Flutter Fix：是

以下 `ThemeData` 成員最初於 v1.23 棄用，並在 v1.26 擴展。

- `useTextSelectionTheme`
- `textSelectionColor`
- `cursorColor`
- `textSelectionHandleColor`

這些應改為更完整的 `TextSelectionThemeData`，
目前已在 `ThemeData` 本身中指定。

`useTextSelectionTheme` 旗標曾作為暫時的遷移旗標，
用來區分兩個 API，現在可以移除。

**遷移指南**

[提供詳細遷移指南][In-depth migration guide available]

遷移前的程式碼：

```dart
ThemeData(
  useTextSelectionTheme: false,
  textSelectionColor: Colors.blue,
  cursorColor: Colors.green,
  textSelectionHandleColor: Colors.red,
);
```

遷移後的程式碼：

```dart
ThemeData(
  textSelectionTheme: TextSelectionThemeData(
    selectionColor: Colors.blue,
    cursorColor: Colors.green,
    selectionHandleColor: Colors.red,
  ),
);
```

**參考資料**

設計文件：

* [Text Selection Theme][Text Selection Theme]

API 文件：

* [`ThemeData`][`ThemeData`]
* [`TextSelectionThemeData`][`TextSelectionThemeData`]

相關議題：

* [Issue 17635]({{site.repo.flutter}}/issues/17635)
* [Issue 56082]({{site.repo.flutter}}/issues/56082)
* [Issue 61227]({{site.repo.flutter}}/issues/61227)

相關 PR：

* 新 API 於 [#62014]({{site.repo.flutter}}/issues/62014) 新增
* 於 [#66485]({{site.repo.flutter}}/issues/66482) 標記為已淘汰
* 於 [#98578]({{site.repo.flutter}}/issues/98578) 移除

[In-depth migration guide available]: /release/breaking-changes/text-selection-theme
[Text Selection Theme]: /go/text-selection-theme
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`TextSelectionThemeData`]: {{site.api}}/flutter/material/TextSelectionThemeData-class.html

---

### `RenderEditable.onSelectionChanged` 變更為 `TextSelectionDelegate.textEditingValue`

Flutter Fix 是否支援：否

`RenderEditable.onSelectionChanged` 和 `TextSelectionDelegate.textEditingValue`
已於 v1.26 標記為已淘汰。

請改為呼叫
`TextSelectionDelegate.userUpdateTextEditingValue`，以取代呼叫其中一個或兩個方法。這樣可以修正
`TextInputFormatter` 會收到錯誤選取值的問題。

**遷移指南**

遷移前的程式碼：

```dart
renderEditable.onSelectionChanged(selection, renderObject, cause);
textSelectionDelegate.textEditingValue = value;
```

遷移後的程式碼：

```dart
textSelectionDelegate.userUpdateTextEditingValue(value, cause);
```

**參考資料**

API 文件：

* [`RenderEditable`][`RenderEditable`]
* [`TextSelectionDelegate`][`TextSelectionDelegate`]

相關議題：

* 已解決 [#75505]({{site.repo.flutter}}/issues/75502)

相關 PR：

* 已在 [#75541]({{site.repo.flutter}}/issues/75541) 標記為已棄用
* 已在 [#98582]({{site.repo.flutter}}/issues/98582) 移除

[`RenderEditable`]: {{site.api}}/flutter/rendering/RenderEditable-class.html
[`TextSelectionDelegate`]: {{site.api}}/flutter/services/TextSelectionDelegate-mixin.html

---

### `Stack.overflow`

Flutter Fix 支援：是

`Stack.overflow` 以及 `Overflow` 列舉（enum）已於 v1.22 棄用。

建議改用 `Stack.clipBehavior`，這項變更是為了統一整個框架中的剪裁（clip）行為與語意。原本使用 `Overflow.visible` 的地方，請改用 `Clip.none`。原本使用 `Overflow.clip` 的地方，請改用 `Clip.hardEdge`。

**遷移指南**

[提供詳細遷移指南][In-depth migration guide available]

遷移前的程式碼：

```dart
const Stack stack = Stack(overflow: Overflow.visible);
const Stack stack = Stack(overflow: Overflow.clip);
```

遷移後的程式碼：

```dart
const Stack stack = Stack(clipBehavior: Clip.none);
const Stack stack = Stack(clipBehavior: Clip.hardEdge);
```

**參考資料**

API 文件：

* [`Stack`][`Stack`]
* [`Clip`][`Clip`]

相關議題：

* 已解決 [#66030]({{site.repo.flutter}}/issues/66030)

相關 PR：

* 已在 [#66305]({{site.repo.flutter}}/issues/66305) 標記為已棄用
* 已在 [#98583]({{site.repo.flutter}}/issues/98583) 移除

[In-depth migration guide available]: /release/breaking-changes/clip-behavior
[`Stack`]: {{site.api}}/flutter/widgets/Stack-class.html
[`Clip`]: {{site.api}}/flutter/dart-ui/Clip.html

---

### `UpdateLiveRegionEvent`

Flutter Fix 是否支援：否

`SemanticsEvent` `UpdateLiveRegionEvent`，首次於 v1.12 標記為已棄用，
並於 v1.26 擴充。

此功能從未由框架實作，任何相關引用都應移除。

**參考資料**

API 文件：

* [`SemanticsEvent`][`SemanticsEvent`]

相關 PR：

* 已在 [#45940]({{site.repo.flutter}}/issues/45940) 標記為已棄用
* 已在 [#98615]({{site.repo.flutter}}/issues/98615) 移除

[`SemanticsEvent`]: {{site.api}}/flutter/semantics/SemanticsEvent-class.html

---

### `RenderObjectElement` 方法

Flutter Fix 是否支援：是

以下 `RenderObjectElement` 方法已於 v1.21 標記為已棄用。

- `insertChildRenderObject`
- `moveChildRenderObject`
- `removeChildRenderObject`

這些方法分別被以下方法取代：

- `insertRenderObjectChild`
- `moveRenderObjectChild`
- `removeRenderObjectChild`

這些變更屬於軟性破壞性棄用，目的是為了調整函式簽章。

**遷移指南**

遷移前的程式碼：

```dart
element.insertChildRenderObject(child, slot);
element.moveChildRenderObject(child, slot);
element.removeChildRenderObject(child);
```

遷移後的程式碼：

```dart
element.insertRenderObjectChild(child, slot);
element.moveRenderObjectChild(child, oldSlot, newSlot);
element.removeRenderObjectChild(child, slot);
```

**參考資料**

API 文件：

* [`RenderObjectElement`][`RenderObjectElement`]

相關議題：

* [Issue 63269]({{site.repo.flutter}}/issues/63269)

相關 PR：

* 已在 [#64254]({{site.repo.flutter}}/issues/64254) 標記為已淘汰
* 已在 [#98616]({{site.repo.flutter}}/issues/98616) 移除

[`RenderObjectElement`]: {{site.api}}/flutter/widgets/RenderObjectElement-class.html

---

## 時程

在穩定版發行：3.0.0
