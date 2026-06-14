# v2.10 之後移除的已棄用 API

> 在達到生命週期終止後，以下已棄用的 API 已從 Flutter 中移除。



## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 2.10 穩定版發佈後達到生命週期終止的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此主來源文件，
以協助遷移作業。同時也提供了
[快速參考表][quick reference sheet]。


[Deprecation Policy]: https://github.com/flutter/flutter/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-2-10

## 變更內容

本節依受影響的類別列出棄用項目。

---

### `maxLengthEnforced`（屬於 `TextField` 及相關類別）

Flutter Fix 支援：是

`maxLengthEnforced` 在 v1.25 時已被棄用。

請改用 `maxLengthEnforcement`。
若 `maxLengthEnforced` 為 true，請替換為 `MaxLengthEnforcement.enforce`。
若 `maxLengthEnforced` 為 false，請替換為 `MaxLengthEnforcement.none`。
此變更允許指定更多行為，超越原本的二元選項，
並新增了 `MaxLengthEnforcement.truncateAfterCompositionEnds` 作為
額外選項。

以下類別皆有相同的 API 變更：

- `TextField`
- `TextFormField`
- `CupertinoTextField`

**遷移指南**

[提供詳細遷移指南][In-depth migration guide available]

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

* [Issue 67898](https://github.com/flutter/flutter/issues/67898)

相關 PR：

* 已在 [#68086](https://github.com/flutter/flutter/pull/68086) 標記為已淘汰
* 已在 [#98539](https://github.com/flutter/flutter/pull/98539) 移除

[In-depth migration guide available]: /release/breaking-changes/use-maxLengthEnforcement-instead-of-maxLengthEnforced
[`TextField`]: https://api.flutter.dev/flutter/material/TextField-class.html
[`TextFormField`]: https://api.flutter.dev/flutter/material/TextFormField-class.html
[`CupertinoTextField`]: https://api.flutter.dev/flutter/cupertino/CupertinoTextField-class.html

---

### `VelocityTracker` 建構函式

Flutter Fix 支援：是

`VelocityTracker` 的預設建構函式自 v1.22 起已被標記為已淘汰。

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

* 已於 [#66043](https://github.com/flutter/flutter/pull/66043) 標記為不建議使用（Deprecated）
* 已於 [#98541](https://github.com/flutter/flutter/pull/98541) 移除

[`VelocityTracker`]: https://api.flutter.dev/flutter/gestures/VelocityTracker-class.html
[`PointerDeviceKind`]: https://api.flutter.dev/flutter/dart-ui/PointerDeviceKind.html

---

### `DayPicker` 與 `MonthPicker`

Flutter Fix 是否支援：否

`DayPicker` 和 `MonthPicker` 元件（Widgets）首次於 v1.15 標記為不建議使用（Deprecated），並於 v1.26 延長支援。

這些元件已由一個更完整的元件 `CalendarDatePicker` 取代。

這些元件原本是透過 `showDatePicker` 方法顯示。在本次版本之前，該方法已遷移為顯示新的 `CalendarDatePicker`，因此最終移除這些元件時，通常不需要額外處理。

**參考資料**

設計文件：

* [Material Date Picker Redesign][Material Date Picker Redesign]

API 文件：

* [`CalendarDatePicker`][`CalendarDatePicker`]
* [`showDatePicker`][`showDatePicker`]

相關議題：

* [Issue 50133](https://github.com/flutter/flutter/issues/50133)

相關 PR：

* 已於 [#50546](https://github.com/flutter/flutter/issues/50546) 標記為不建議使用（Deprecated）
* 已於 [#98543](https://github.com/flutter/flutter/issues/98543) 移除

[Material Date Picker Redesign]: /go/material-date-picker-redesign
[`CalendarDatePicker`]: https://api.flutter.dev/flutter/material/CalendarDatePicker-class.html
[`showDatePicker`]: https://api.flutter.dev/flutter/material/showDatePicker.html

---

### `FlatButton`、`RaisedButton` 與 `OutlineButton`

Flutter Fix 是否支援：否

`FlatButton`、`RaisedButton` 和 `OutlineButton` 元件（Widgets）首次於 v1.20 標記為不建議使用（Deprecated），並於 v1.26 延長支援。

這些元件已由新按鈕 `TextButton`、`ElevatedButton` 和 `OutlinedButton` 取代。這些新元件也採用了新的專屬主題，而非通用的 `ButtonTheme`。

| 舊元件 (Widget) | 舊主題 (Theme) | 新元件 (Widget) | 新主題 (Theme)         |
|-----------------|---------------|------------------|-----------------------|
| `FlatButton`    | `ButtonTheme` | `TextButton`     | `TextButtonTheme`     |
| `RaisedButton`  | `ButtonTheme` | `ElevatedButton` | `ElevatedButtonTheme` |
| `OutlineButton` | `ButtonTheme` | `OutlinedButton` | `OutlinedButtonTheme` |

{:.table .table-striped .nowrap}

**遷移指南**

[提供詳細樣式的完整遷移指南][In-depth migration guide available for detailed styling]

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

* 新增 API 於 [#59702](https://github.com/flutter/flutter/issues/59702)
* 已棄用於 [#73352](https://github.com/flutter/flutter/issues/73352)
* 已移除於 [#98546](https://github.com/flutter/flutter/issues/98546)

[In-depth migration guide available for detailed styling]: /release/breaking-changes/buttons
[New Material buttons and themes]: /go/material-button-migration-guide
[`ButtonStyle`]: https://api.flutter.dev/flutter/material/ButtonStyle-class.html
[`ButtonStyleButton`]: https://api.flutter.dev/flutter/material/ButtonStyleButton-class.html
[`ElevatedButton`]: https://api.flutter.dev/flutter/material/ElevatedButton-class.html
[`ElevatedButtonTheme`]: https://api.flutter.dev/flutter/material/ElevatedButtonTheme-class.html
[`ElevatedButtonThemeData`]: https://api.flutter.dev/flutter/material/ElevatedButtonThemeData-class.html
[`OutlinedButton`]: https://api.flutter.dev/flutter/material/OutlinedButton-class.html
[`OutlinedButtonTheme`]: https://api.flutter.dev/flutter/material/OutlinedButtonTheme-class.html
[`OutlinedButtonThemeData`]: https://api.flutter.dev/flutter/material/OutlinedButtonThemeData-class.html
[`TextButton`]: https://api.flutter.dev/flutter/material/TextButton-class.html
[`TextButtonTheme`]: https://api.flutter.dev/flutter/material/TextButtonTheme-class.html
[`TextButtonThemeData`]: https://api.flutter.dev/flutter/material/TextButtonThemeData-class.html

---

### `Scaffold` `SnackBar` 方法

Flutter Fix 是否支援：否

以下 `Scaffold` `SnackBar` 方法已於 v1.23 棄用。

- `showSnackBar`
- `removeCurrentSnackBar`
- `hideCurrentSnackBar`

請改為使用 `ScaffoldMessenger` 中同名的方法。每個 `MaterialApp` 已經預設建立了一個 `ScaffoldMessenger`。

**遷移指南**

[有詳細的遷移指南可參考][In-depth migration guide available]

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
* [ScaffoldMessenger Design][ScaffoldMessenger Design]

影片內容：

* [SnackBar Delivery][SnackBar Delivery]
* [Widget of the Week][Widget of the Week]

API 文件：

* [`ScaffoldMessenger`][`ScaffoldMessenger`]
* [`SnackBar`][`SnackBar`]

相關議題：

* [Issue 57218](https://github.com/flutter/flutter/issues/57218)
* [Issue 62921](https://github.com/flutter/flutter/issues/62921)

相關 PR：

* 新 API 於 [#64101](https://github.com/flutter/flutter/issues/64101) 新增
* 於 [#67947](https://github.com/flutter/flutter/issues/67947) 標記為已淘汰
* 於 [#98549](https://github.com/flutter/flutter/issues/98549) 移除

[In-depth migration guide available]: /release/breaking-changes/scaffold-messenger
[ScaffoldMessenger Design]: /go/scaffold-messenger
[SnackBar Delivery]: https://youtu.be/sYG7HAGu_Eg?t=10271
[Widget of the Week]: https://youtu.be/lytQi-slT5Y
[`ScaffoldMessenger`]: https://api.flutter.dev/flutter/material/ScaffoldMessenger-class.html
[`SnackBar`]: https://api.flutter.dev/flutter/material/SnackBar-class.html

---

### `RectangularSliderTrackShape.disabledThumbGapWidth`

Flutter Fix 支援：是

`RectangularSliderTrackShape.disabledThumbGapWidth` 首次於 v1.5 標記為已淘汰，並於 v1.26 擴展。

此功能已不再由框架使用，因為當滑桿（slider）停用時，滑塊（thumb）的動畫（Animation）不再發生。

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
* 動畫 (Animation) 變更於 [#30390](https://github.com/flutter/flutter/issues/30390)
* 已於 [#65246](https://github.com/flutter/flutter/issues/65246) 標記為不建議使用（Deprecated）
* 已於 [#98613](https://github.com/flutter/flutter/issues/98613) 移除

[`RectangularSliderTrackShape`]: https://api.flutter.dev/flutter/material/RectangularSliderTrackShape-class.html

---

### `ThemeData` 到 `TextSelectionThemeData` 的文字選取

支援 Flutter Fix：是

以下 `ThemeData` 成員最初於 v1.23 標記為不建議使用，並於 v1.26 擴充。

- `useTextSelectionTheme`
- `textSelectionColor`
- `cursorColor`
- `textSelectionHandleColor`

這些應該被更完整的 `TextSelectionThemeData` 取代，該內容現在已在 `ThemeData` 本身中指定。

`useTextSelectionTheme` 旗標曾作為臨時遷移用來區分兩個 API，現在可以移除了。

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

* [Issue 17635](https://github.com/flutter/flutter/issues/17635)
* [Issue 56082](https://github.com/flutter/flutter/issues/56082)
* [Issue 61227](https://github.com/flutter/flutter/issues/61227)

相關 PR：

* 新 API 於 [#62014](https://github.com/flutter/flutter/issues/62014) 新增
* 於 [#66485](https://github.com/flutter/flutter/issues/66482) 標記為已淘汰（Deprecated）
* 於 [#98578](https://github.com/flutter/flutter/issues/98578) 移除

[In-depth migration guide available]: /release/breaking-changes/text-selection-theme
[Text Selection Theme]: /go/text-selection-theme
[`ThemeData`]: https://api.flutter.dev/flutter/material/ThemeData-class.html
[`TextSelectionThemeData`]: https://api.flutter.dev/flutter/material/TextSelectionThemeData-class.html

---

### `RenderEditable.onSelectionChanged` 到 `TextSelectionDelegate.textEditingValue`

Flutter Fix 支援：否

`RenderEditable.onSelectionChanged` 和 `TextSelectionDelegate.textEditingValue`
自 v1.26 起已被標記為淘汰（deprecated）。

請改為呼叫
`TextSelectionDelegate.userUpdateTextEditingValue`，以取代上述一或兩個方法。這樣可以修正
`TextInputFormatter` 取得錯誤選取值的錯誤。

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

* 已解決 [#75505](https://github.com/flutter/flutter/issues/75502)

相關 PR：

* 已在 [#75541](https://github.com/flutter/flutter/issues/75541) 標記為已淘汰
* 已在 [#98582](https://github.com/flutter/flutter/issues/98582) 移除

[`RenderEditable`]: https://api.flutter.dev/flutter/rendering/RenderEditable-class.html
[`TextSelectionDelegate`]: https://api.flutter.dev/flutter/services/TextSelectionDelegate-mixin.html

---

### `Stack.overflow`

Flutter Fix 支援：是

`Stack.overflow` 以及 `Overflow` 列舉（enum）已於 v1.22 被標記為已淘汰。

建議替代方案為 `Stack.clipBehavior`，此更動是為了統一整個框架中的剪裁（clip）行為與語意。原本使用 `Overflow.visible` 的地方，請改用 `Clip.none`。原本使用 `Overflow.clip` 的地方，請改用 `Clip.hardEdge`。

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

* 已解決 [#66030](https://github.com/flutter/flutter/issues/66030)

相關 PR：

* 已在 [#66305](https://github.com/flutter/flutter/issues/66305) 標記為過時
* 已在 [#98583](https://github.com/flutter/flutter/issues/98583) 移除

[In-depth migration guide available]: /release/breaking-changes/clip-behavior
[`Stack`]: https://api.flutter.dev/flutter/widgets/Stack-class.html
[`Clip`]: https://api.flutter.dev/flutter/dart-ui/Clip.html

---

### `UpdateLiveRegionEvent`

Flutter Fix 支援：否

`SemanticsEvent` `UpdateLiveRegionEvent`，最初於 v1.12 標記為過時，
並於 v1.26 延長。

此功能從未由框架實作，任何相關參考都應該移除。

**參考資料**

API 文件：

* [`SemanticsEvent`][`SemanticsEvent`]

相關 PR：

* 已在 [#45940](https://github.com/flutter/flutter/issues/45940) 標記為過時
* 已在 [#98615](https://github.com/flutter/flutter/issues/98615) 移除

[`SemanticsEvent`]: https://api.flutter.dev/flutter/semantics/SemanticsEvent-class.html

---

### `RenderObjectElement` 方法

Flutter Fix 支援：是

以下 `RenderObjectElement` 方法已於 v1.21 標記為過時。

- `insertChildRenderObject`
- `moveChildRenderObject`
- `removeChildRenderObject`

這些方法分別被以下方法取代：

- `insertRenderObjectChild`
- `moveRenderObjectChild`
- `removeRenderObjectChild`

這些變更屬於軟性不相容的棄用（soft breaking deprecation），
目的是為了調整函式簽章（function signature）。

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

* [Issue 63269](https://github.com/flutter/flutter/issues/63269)

相關 PR：

* 已在 [#64254](https://github.com/flutter/flutter/issues/64254) 標記為已淘汰
* 已在 [#98616](https://github.com/flutter/flutter/issues/98616) 移除

[`RenderObjectElement`]: https://api.flutter.dev/flutter/widgets/RenderObjectElement-class.html

---

## 時程

於正式版本：3.0.0

