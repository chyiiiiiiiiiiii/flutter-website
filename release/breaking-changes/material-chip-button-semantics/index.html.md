# Material Chip 按鈕語意

> 互動式 Material Chips 現在會以語意標記為按鈕。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

Flutter 現在會將 `button` 的語意標籤套用到所有互動式 [Material Chips][]，以提升無障礙體驗。

## 背景說明

互動式 Material Chips（即 [`ActionChip`][]、
[`ChoiceChip`][]、[`FilterChip`][] 以及 [`InputChip`][]）
現在都會以語意標記為按鈕。
然而，非互動式的資訊 [`Chip`][] 則不會如此標記。

將 Chips 標記為按鈕有助於無障礙工具、搜尋引擎及其他語意分析軟體
理解應用程式的意義。例如，這讓螢幕閱讀器
（如 Android 的 TalkBack 及 iOS 的 VoiceOver）
能夠將可點擊的 Chip 宣告為「按鈕」，
協助使用者更容易瀏覽你的應用程式。
在這項變更之前，無障礙工具的使用者可能會有較差的體驗，
除非你已在應用程式中手動為 Chip 元件 (Widget) 補上缺少的語意資訊。

## 變更說明

包裹所有 Chip 類別、用於描述其語意屬性的最外層
[`Semantics`][] 元件（Widget）已經被修改。

以下變更適用於
[`ActionChip`][]、[`ChoiceChip`][]、[`FilterChip`][]
以及 [`InputChip`][]：

* [`button`][`SemanticsProperties.button`] 屬性會被設為 `true`。
* [`enabled`][`SemanticsProperties.enabled`] 屬性會反映該 Chip 是否
  _目前_可點擊（即是否有設定回呼（callback））。

這些屬性變更讓互動式 Chips 的語意行為與其他 [Material Buttons][] 一致。

對於非互動式資訊 [`Chip`][]：

* [`button`][`SemanticsProperties.button`] 屬性會被設為 `false`。
* [`enabled`][`SemanticsProperties.enabled`] 屬性會被設為 `null`。

## 遷移指南

**你可能不需要進行任何遷移。**
這項變更僅在你曾經為了解決 Material Chips 缺少 `button` 語意的問題，
而將傳遞給 `Chip` 的 `label` 欄位的元件（Widget）包裹在一個
已標記為 `button: true` 的 `Semantics` 元件時才會影響你。
**在這種情況下，內外層的 `button` 語意會產生衝突，
導致按鈕的可點擊區域在這項變更後縮小到僅剩標籤的大小。**
你可以透過刪除該 `Semantics` 元件並直接使用其子元件，
或是在仍需為 Chip 的 `label` 元件套用其他語意屬性時，
移除 `button: true` 屬性來解決此問題。

以下程式碼片段以 [`InputChip`][] 為例，
但同樣適用於 [`ActionChip`][]、[`ChoiceChip`][] 以及 [`FilterChip`][]。

**情境一：移除 `Semantics` 元件。**

遷移前的程式碼：

```dart
Widget myInputChip = InputChip(
  onPressed: () {},
  label: Semantics(
    button: true,
    child: Text('My Input Chip'),
  ),
);
```

遷移後的程式碼：

```dart
Widget myInputChip = InputChip(
  onPressed: () {},
  label: Text('My Input Chip'),
);
```

**情境二：從 `Semantics` 元件中移除 `button:true`。**

遷移前的程式碼：

```dart
Widget myInputChip = InputChip(
  onPressed: () {},
  label: Semantics(
    button: true,
    hint: 'Example Hint',
    child: Text('My Input Chip'),
  ),
);
```

遷移後的程式碼：

```dart
Widget myInputChip = InputChip(
  onPressed: () {},
  label: Semantics(
    hint: 'Example Hint',
    child: Text('My Input Chip'),
  ),
);
```

## 時程

合併於版本：1.23.0-7.0.pre<br>
正式版釋出：2.0.0

## 參考資料

API 文件：

* [`ActionChip`][]
* [`Chip`][]
* [`ChoiceChip`][]
* [`FilterChip`][]
* [`InputChip`][]
* [Material Buttons][]
* [Material Chips][]
* [`Semantics`][]
* [`SemanticsProperties.button`][]
* [`SemanticsProperties.enabled`][]

相關議題：

* [Issue 58010][]：InputChip 在 iOS 上無障礙（a11y）時未宣告任何動作

相關 PR：

* [PR 60141][]：調整 Material Chip 的無障礙語意（a11y semantics），使其與按鈕一致
* [PR 60645][]：還原「調整 Material Chip 的無障礙語意以符合按鈕（#60141）」
* [PR 61048][]：重新合併「調整 Material Chip 的無障礙語意以符合按鈕（#60141）」

[`ActionChip`]: https://api.flutter.dev/flutter/material/ActionChip-class.html
[`Chip`]: https://api.flutter.dev/flutter/material/Chip-class.html
[`ChoiceChip`]: https://api.flutter.dev/flutter/material/ChoiceChip-class.html
[`FilterChip`]: https://api.flutter.dev/flutter/material/FilterChip-class.html
[`InputChip`]: https://api.flutter.dev/flutter/material/InputChip-class.html
[Material Buttons]: https://m3.material.io/components/all-buttons
[Material Chips]: https://m3.material.io/components/chips
[`Semantics`]: https://api.flutter.dev/flutter/widgets/Semantics-class.html
[`SemanticsProperties.button`]: https://api.flutter.dev/flutter/semantics/SemanticsProperties/button.html
[`SemanticsProperties.enabled`]: https://api.flutter.dev/flutter/semantics/SemanticsProperties/enabled.html

[Issue 58010]: https://github.com/flutter/flutter/issues/58010

[PR 60141]: https://github.com/flutter/flutter/pull/60141
[PR 60645]: https://github.com/flutter/flutter/pull/60645
[PR 61048]: https://github.com/flutter/flutter/pull/61048

