---
title: Radio 元件 (Widget) API 重新設計
description: >-
  了解 Flutter 3.35 中 radio 元件 (Widget) 的變更。
---

{% render docs/breaking-changes.md %}

## 摘要

引入了 `RadioGroup` 元件 (Widget)，用於集中管理 `groupValue`，以及一組 `Radio` 元件 (Widgets) 的 `onChanged` 回呼 (callback)。因此，個別的 `Radio.groupValue` 和 `Radio.onChanged` 屬性已被棄用。

## 背景

為了符合 APG（ARIA Practices Guide，ARIA 實踐指南）對於鍵盤導覽及 radio button 群組語意屬性的要求，Flutter 需要一個專用的 radio group 概念。透過引入包裝元件 (Widget) `RadioGroup`，即可原生支援這些需求。這項變更也同時簡化了個別 `Radio` 元件 (Widget) 的 API。

## 變更說明

以下 API 已被棄用：

* `Radio.onChanged`
* `Radio.groupValue`
* `CupertinoRadio.onChanged`
* `CupertinoRadio.groupValue`
* `RadioListTile.groupValue`
* `RadioListTile.onChanged`

## 遷移指南

如果你正在使用這些屬性，請改用 `RadioGroup` 來重構你的程式碼。

### 情境 1：簡單案例

遷移前的程式碼：

```dart
Widget build(BuildContext context) {
  return Column(
    children: <Widget>[
      Radio<int>(
        value: 0,
        groupValue: _groupValue,
        onChanged: (int? value) {
          setState(() {
            _groupValue = value;
          });
        },
      ),
      Radio<int>(
        value: 2,
        groupValue: _groupValue,
        onChanged: (int? value) {
          setState(() {
            _groupValue = value;
          });
        },
      ),
    ],
  );
}
```

遷移後的程式碼：

```dart
Widget build(BuildContext context) {
  return RadioGroup<int>(
    groupValue: _groupValue,
    onChanged: (int? value) {
      setState(() {
        _groupValue = value;
      });
    },
    child: Column(
      children: <Widget>[
        Radio<int>(value: 0),
        Radio<int>(value: 2),
      ],
    ),
  );
}
```

### 案例 2：disabled radio

遷移前的程式碼：

```dart
Widget build(BuildContext context) {
  return Column(
    children: <Widget>[
      Radio<int>(
        value: 0,
        groupValue: _groupValue,
        onChanged: (int? value) {
          setState(() {
            _groupValue = value;
          });
        },
      ),
      Radio<int>(
        value: 2,
        groupValue: _groupValue,
        onChanged: null, // disabled
      ),
    ],
  );
}
```

遷移後的程式碼：

```dart
Widget build(BuildContext context) {
  return RadioGroup<int>(
    groupValue: _groupValue,
    onChanged: (int? value) {
      setState(() {
        _groupValue = value;
      });
    },
    child: Column(
      children: <Widget>[
        Radio<int>(value: 0),
        Radio<int>(value: 2, enabled: false),
      ],
    ),
  );
}
```

### 案例 3：混合群組或多重選擇

遷移前的程式碼：

```dart
Widget build(BuildContext context) {
  return Column(
    children: <Widget>[
      Radio<int>(
        value: 1,
        groupValue: _groupValue,
        onChanged: (int? value) {
          setState(() {
            _groupValue = value;
          });
        }, // disabled
      ),
      Radio<String>(
        value: 'a',
        groupValue: _stringValue,
        onChanged: (String? value) {
          setState(() {
            _stringValue = value;
          });
        },
      ),
      Radio<String>(
        value: 'b',
        groupValue: _stringValue,
        onChanged: (String? value) {
          setState(() {
            _stringValue = value;
          });
        },
      ),
      Radio<int>(
        value: 2,
        groupValue: _groupValue,
        onChanged: (int? value) {
          setState(() {
            _groupValue = value;
          });
        }, // disabled
      ),
    ],
  );
}
```

遷移後的程式碼：

```dart
Widget build(BuildContext context) {
  return RadioGroup<int>(
    groupValue: _groupValue,
    onChanged: (int? value) {
      setState(() {
        _groupValue = value;
      });
    },
    child: Column(
      children: <Widget>[
        Radio<int>(value: 1),
        RadioGroup<String>(
          child: Column(
            children: <Widget>[
              Radio<String>(value: 'a'),
              Radio<String>(value: 'b'),
            ]
          ),
        ),
        Radio<int>(value: 2),
      ],
    ),
  );
}
```

## 時程

合併於版本：3.34.0-0.0.pre<br>  
在穩定版釋出：3.35

## 參考資料

* [`APG`][`APG`]

API 文件：

* [`Radio`][`Radio`]
* [`CupertinoRadio`][`CupertinoRadio`]
* [`RadioListTile`][`RadioListTile`]
* [`RadioGroup`][`RadioGroup`]

相關議題：

* [Issue 113562][Issue 113562]

相關 PR：

* [PR 168161][PR 168161]

[`APG`]: https://www.w3.org/WAI/ARIA/apg/patterns/radio
[`Radio`]: {{site.api}}/flutter/material/Radio-class.html
[`RadioListTile`]: {{site.api}}/flutter/material/RadioListTile-class.html
[`CupertinoRadio`]: {{site.api}}/flutter/cupertino/CupertinoRadio-class.html
[`RadioGroup`]: {{site.api}}/flutter/widgets/RadioGroup-class.html
[Issue 113562]: {{site.repo.flutter}}/issues/113562
[PR 168161]: {{site.repo.flutter}}/pull/168161
