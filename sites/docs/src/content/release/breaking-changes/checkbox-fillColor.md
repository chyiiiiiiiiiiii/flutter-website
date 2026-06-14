---
title: 已更新的 `Checkbox.fillColor` 行為
description: >
  改良後的 `Checkbox.fillColor` 行為會在核取方塊未被選取時，將填充色（fill color）套用到背景上。
---

{% render "docs/breaking-changes.md" %}

## 摘要

現在，`Checkbox.fillColor` 會在核取方塊未被選取時，套用到其背景上。

## 背景說明

過去，當核取方塊未被選取且背景為透明時，`Checkbox.fillColor` 會套用到核取方塊的邊框上。此更動後，`Checkbox.fillColor` 會套用到核取方塊的背景，而邊框則會使用 `Checkbox.side` 顏色，當核取方塊未被選取時。

## 變更說明

現在，`Checkbox.fillColor` 會在核取方塊未被選取時，套用到其背景上，而不再作為邊框顏色使用。

## 遷移指南

更新後的 `Checkbox.fillColor` 行為會在核取方塊未被選取時，將填充色（fill color）套用到其背景。若要維持先前的行為，請在未選取狀態下，將 `Checkbox.fillColor` 設為 `Colors.transparent`，並將 `Checkbox.side` 設為所需顏色。

如果你使用 `Checkbox.fillColor` 屬性來自訂核取方塊。

遷移前的程式碼：

```dart
Checkbox(
  fillColor: MaterialStateProperty.resolveWith((states) {
    if (!states.contains(MaterialState.selected)) {
      return Colors.red;
    }
    return null;
  }),
  value: _checked,
  onChanged: _enabled
    ? (bool? value) {
        setState(() {
          _checked = value!;
        });
      }
    : null,
),
```

遷移後的程式碼：

```dart
Checkbox(
  fillColor: MaterialStateProperty.resolveWith((states) {
    if (!states.contains(MaterialState.selected)) {
      return Colors.transparent;
    }
    return null;
  }),
  side: const BorderSide(color: Colors.red, width: 2),
  value: _checked,
  onChanged: _enabled
    ? (bool? value) {
        setState(() {
          _checked = value!;
        });
      }
    : null,
),
```

如果你使用 `CheckboxThemeData.fillColor` 屬性來自訂核取方塊（checkbox）。

遷移前的程式碼：

```dart
checkboxTheme: CheckboxThemeData(
  fillColor: MaterialStateProperty.resolveWith((states) {
    if (!states.contains(MaterialState.selected)) {
      return Colors.red;
    }
    return null;
  }),
),
```

遷移後的程式碼：

```dart
checkboxTheme: CheckboxThemeData(
  fillColor: MaterialStateProperty.resolveWith((states) {
    if (!states.contains(MaterialState.selected)) {
      return Colors.transparent;
    }
    return null;
  }),
  side: const BorderSide(color: Colors.red, width: 2),
),
```

## 時程

合併於版本：3.10.0-17.0.pre<br>
正式版本釋出：3.13.0

## 參考資料

API 文件：

* [`Checkbox.fillColor`][]

相關議題：

* [為 `Checkbox` 和 `CheckboxThemeData` 新增 `backgroundColor`][Add `backgroundColor` to `Checkbox` and `CheckboxThemeData`]

相關 PR：

* [當核取方塊未勾選時，`Checkbox.fillColor` 應套用於核取方塊的背景顏色。][`Checkbox.fillColor` should be applied to checkbox's background color when it is unchecked.]

[`Checkbox.fillColor`]: {{site.api}}/flutter/material/Checkbox/fillColor.html

[Add `backgroundColor` to `Checkbox` and `CheckboxThemeData`]: {{site.repo.flutter}}/issues/123386
[`Checkbox.fillColor` should be applied to checkbox's background color when it is unchecked.]: {{site.repo.flutter}}/pull/125643
