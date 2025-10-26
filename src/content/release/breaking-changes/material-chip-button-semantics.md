---
title: Material Chip 按鈕語意
description: 互動式 Material Chips 現在會以語意方式標記為按鈕。
---

{% render docs/breaking-changes.md %}

## 摘要

Flutter 現在會將 `button` 的語意標籤套用至所有互動式 [Material Chips][Material Chips]，以提升無障礙輔助功能。

## 背景

互動式 Material Chips（即 [`ActionChip`][`ActionChip`]、[`ChoiceChip`][`ChoiceChip`]、[`FilterChip`][`FilterChip`] 和 [`InputChip`][`InputChip`]）現在會以語意方式標記為按鈕。然而，非互動式資訊 [`Chip`][`Chip`] 則不會。

將 Chips 標記為按鈕有助於無障礙工具、搜尋引擎及其他語意分析軟體理解應用程式的意義。例如，這讓螢幕閱讀器（如 Android 的 TalkBack 和 iOS 的 VoiceOver）能夠將可點擊的 Chip 宣告為「按鈕」，協助使用者導覽您的應用程式。在此變更之前，無障礙工具的使用者可能會遇到較差的體驗，除非您已在應用程式中手動為 Chip 元件（Widgets）補上缺少的語意。

## 變更說明

包覆所有 Chip 類別、用於描述其語意屬性的最外層 [`Semantics`][`Semantics`] 元件（Widget）已進行修改。

以下變更適用於 [`ActionChip`][`ActionChip`]、[`ChoiceChip`][`ChoiceChip`]、[`FilterChip`][`FilterChip`] 和 [`InputChip`][`InputChip`]：

* [`button`][`SemanticsProperties.button`] 屬性會被設定為 `true`。
* [`enabled`][`SemanticsProperties.enabled`] 屬性會反映 Chip 是否「目前」可點擊（即有設定 callback）。

這些屬性變更讓互動式 Chips 的語意行為與其他 [Material Buttons][Material Buttons] 一致。

針對非互動式資訊 [`Chip`][`Chip`]：

* [`button`][`SemanticsProperties.button`] 屬性會被設定為 `false`。
* [`enabled`][`SemanticsProperties.enabled`] 屬性會被設定為 `null`。

## 移轉指南

**您可能不需要進行任何移轉。**
此變更僅影響那些曾因 Material Chips 缺少 `button` 語意而採取 workaround 的情境，例如將提供給 `label` 欄位的元件（Widget）包覆在一個已標記為 `button: true` 的 `Semantics` 元件（Widget）內。**在此情況下，內外層的 `button` 語意會產生衝突，導致按鈕的可點擊區域在此變更後縮小至僅剩標籤的大小。**請透過刪除該 `Semantics` 元件並改用其子元件，或在仍需套用其他語意屬性至 Chip 的 `label` 元件時，移除 `button: true` 屬性來修正此問題。

以下程式碼片段以 [`InputChip`][`InputChip`] 為例，但同樣適用於 [`ActionChip`][`ActionChip`]、[`ChoiceChip`][`ChoiceChip`] 和 [`FilterChip`][`FilterChip`]。

**案例 1：移除 `Semantics` 元件（Widget）。**

移轉前程式碼：

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

**案例 2：從 `Semantics` 元件（Widget）中移除 `button:true`。**

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

納入版本：1.23.0-7.0.pre<br>  
穩定版釋出：2.0.0

## 參考資料

API 文件：

* [`ActionChip`][`ActionChip`]
* [`Chip`][`Chip`]
* [`ChoiceChip`][`ChoiceChip`]
* [`FilterChip`][`FilterChip`]
* [`InputChip`][`InputChip`]
* [Material Buttons][Material Buttons]
* [Material Chips][Material Chips]
* [`Semantics`][`Semantics`]
* [`SemanticsProperties.button`][`SemanticsProperties.button`]
* [`SemanticsProperties.enabled`][`SemanticsProperties.enabled`]

相關議題：

* [Issue 58010][Issue 58010]：InputChip 在 iOS 上無障礙（a11y）時未宣告任何動作

相關 PR：

* [PR 60141][PR 60141]：調整 Material Chip 無障礙語意以符合按鈕
* [PR 60645][PR 60645]：回復「調整 Material Chip 無障礙語意以符合按鈕 (#60141)」
* [PR 61048][PR 61048]：重新納入「調整 Material Chip 無障礙語意以符合按鈕 (#60141)」

[`ActionChip`]: {{site.api}}/flutter/material/ActionChip-class.html
[`Chip`]: {{site.api}}/flutter/material/Chip-class.html
[`ChoiceChip`]: {{site.api}}/flutter/material/ChoiceChip-class.html
[`FilterChip`]: {{site.api}}/flutter/material/FilterChip-class.html
[`InputChip`]: {{site.api}}/flutter/material/InputChip-class.html
[Material Buttons]: {{site.material}}/components/all-buttons
[Material Chips]: {{site.material}}/components/chips
[`Semantics`]: {{site.api}}/flutter/widgets/Semantics-class.html
[`SemanticsProperties.button`]: {{site.api}}/flutter/semantics/SemanticsProperties/button.html
[`SemanticsProperties.enabled`]: {{site.api}}/flutter/semantics/SemanticsProperties/enabled.html

[Issue 58010]: {{site.repo.flutter}}/issues/58010

[PR 60141]: {{site.repo.flutter}}/pull/60141
[PR 60645]: {{site.repo.flutter}}/pull/60645
[PR 61048]: {{site.repo.flutter}}/pull/61048
