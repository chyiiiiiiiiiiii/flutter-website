# Radio 元件 (Widget) 全新設計

> 了解 Flutter 3.35 中 radio 元件的變更內容。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

引入了 `RadioGroup` 元件 (Widget)，用於集中管理 `groupValue`，以及一組 `Radio` 元件的 `onChanged` 回呼 (callback)。因此，個別的 `Radio.groupValue` 和 `Radio.onChanged` 屬性已被棄用。

## 背景

為了符合 APG（ARIA Practices Guide）對於 radio 按鈕群組在鍵盤導覽和語意屬性的要求，Flutter 需要一個專用的 radio 群組概念。引入包裹元件 `RadioGroup`，即可直接支援這些功能。這項變更同時也讓個別 `Radio` 元件的 API 得以簡化。

## 變更說明

以下 API 已被棄用：

* `Radio.onChanged`
* `Radio.groupValue`
* `CupertinoRadio.onChanged`
* `CupertinoRadio.groupValue`
* `RadioListTile.groupValue`
* `RadioListTile.onChanged`。

## 遷移指南

如果你正在使用這些屬性，可以使用 `RadioGroup` 來重構你的程式碼。

### 案例 1：簡單案例

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
穩定版發佈於：3.35

## 參考資料

* [`APG`][]

API 文件：

* [`Radio`][]
* [`CupertinoRadio`][]
* [`RadioListTile`][]
* [`RadioGroup`][]

相關議題：

* [Issue 113562][]

相關 PR：

* [PR 168161][]

[`APG`]: https://www.w3.org/WAI/ARIA/apg/patterns/radio
[`Radio`]: https://api.flutter.dev/flutter/material/Radio-class.html
[`RadioListTile`]: https://api.flutter.dev/flutter/material/RadioListTile-class.html
[`CupertinoRadio`]: https://api.flutter.dev/flutter/cupertino/CupertinoRadio-class.html
[`RadioGroup`]: https://api.flutter.dev/flutter/widgets/RadioGroup-class.html
[Issue 113562]: https://github.com/flutter/flutter/issues/113562
[PR 168161]: https://github.com/flutter/flutter/pull/168161

