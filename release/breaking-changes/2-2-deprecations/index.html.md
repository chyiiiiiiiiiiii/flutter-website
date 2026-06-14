# v2.2 之後移除的已棄用 API

> 在達到生命週期終點後，下列已棄用的 API 已從 Flutter 中移除。



## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 2.2 穩定版發佈後達到生命週期終點的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此
主要來源，以協助遷移。
同時也提供了[快速參考表][quick reference sheet]。

[Deprecation Policy]: https://github.com/flutter/flutter/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-2-2

## 變更內容

本節將依受影響的類別列出棄用項目。

### `InputDecoration` 與 `InputDecorationTheme` 的 `hasFloatingPlaceholder`

Flutter Fix 支援：是

`hasFloatingPlaceholder` 於 v1.13.2 被棄用。
請改用 `floatingLabelBehavior`。
當 `useFloatingPlaceholder` 為 true 時，請替換為 `FloatingLabelBehavior.auto`。
當 `useFloatingPlaceholder` 為 false 時，請替換為 `FloatingLabelBehavior.never`。
此變更允許指定更多行為，超越原本的二元選擇，並新增了 `FloatingLabelBehavior.always` 作為額外選項。

**遷移指南**

遷移前的程式碼：

```dart
// InputDecoration
// Base constructor
InputDecoration(hasFloatingPlaceholder: true);
InputDecoration(hasFloatingPlaceholder: false);

// collapsed constructor
InputDecoration.collapsed(hasFloatingPlaceholder: true);
InputDecoration.collapsed(hasFloatingPlaceholder: false);

// Field access
inputDecoration.hasFloatingPlaceholder;

// InputDecorationTheme
// Base constructor
InputDecorationTheme(hasFloatingPlaceholder: true);
InputDecorationTheme(hasFloatingPlaceholder: false);

// Field access
inputDecorationTheme.hasFloatingPlaceholder;

// copyWith
inputDecorationTheme.copyWith(hasFloatingPlaceholder: false);
inputDecorationTheme.copyWith(hasFloatingPlaceholder: true);
```

遷移後的程式碼：

```dart
// InputDecoration
// Base constructor
InputDecoration(floatingLabelBehavior: FloatingLabelBehavior.auto);
InputDecoration(floatingLabelBehavior: FloatingLabelBehavior.never);

// collapsed constructor
InputDecoration.collapsed(floatingLabelBehavior: FloatingLabelBehavior.auto);
InputDecoration.collapsed(floatingLabelBehavior: FloatingLabelBehavior.never);

// Field access
inputDecoration.floatingLabelBehavior;

// InputDecorationTheme
// Base constructor
InputDecorationTheme(floatingLabelBehavior: FloatingLabelBehavior.auto);
InputDecorationTheme(floatingLabelBehavior: FloatingLabelBehavior.never);

// Field access
inputDecorationTheme.floatingLabelBehavior;

// copyWith
inputDecorationTheme.copyWith(floatingLabelBehavior: FloatingLabelBehavior.never);
inputDecorationTheme.copyWith(floatingLabelBehavior: FloatingLabelBehavior.auto);
```

**參考資料**

API 文件：

* [`InputDecoration`][`InputDecoration`]
* [`InputDecorationTheme`][`InputDecorationTheme`]
* [`FloatingLabelBehavior`][`FloatingLabelBehavior`]

相關議題：

* [InputDecoration: option to always float label][InputDecoration: option to always float label]

相關 PR：

* 已在 [#46115][#46115] 標記為已淘汰
* 已在 [#83923][#83923] 移除

[`InputDecoration`]: https://api.flutter.dev/flutter/material/InputDecoration-class.html
[`InputDecorationTheme`]: https://api.flutter.dev/flutter/material/InputDecorationTheme-class.html
[`FloatingLabelBehavior`]: https://api.flutter.dev/flutter/material/FloatingLabelBehavior-class.html
[InputDecoration: option to always float label]: https://github.com/flutter/flutter/issues/30664
[#46115]: https://github.com/flutter/flutter/pull/46115
[#83923]: https://github.com/flutter/flutter/pull/83923

---

### `TextTheme`

Flutter Fix 支援：是

多個 `TextStyle` 的 `TextTheme` 屬性已於 v1.13.8 被標記為已淘汰。下表列出了這些屬性及其在新 API 中對應的替代項目。

| 已淘汰屬性 | 新 API |
|---|---|
| display4 | headline1 |
| display3 | headline2 |
| display2 | headline3 |
| display1 | headline4 |
| headline | headline5 |
| title | headline6 |
| subhead | subtitle1 |
| body2 | bodyText1 |
| body1 | bodyText2 |
| subtitle | subtitle2 |

**遷移指南**

遷移前的程式碼：

```dart
// TextTheme
// Base constructor
TextTheme(
  display4: displayStyle4,
  display3: displayStyle3,
  display2: displayStyle2,
  display1: displayStyle1,
  headline: headlineStyle,
  title: titleStyle,
  subhead: subheadStyle,
  body2: body2Style,
  body1: body1Style,
  caption: captionStyle,
  button: buttonStyle,
  subtitle: subtitleStyle,
  overline: overlineStyle,
);

// copyWith
TextTheme.copyWith(
  display4: displayStyle4,
  display3: displayStyle3,
  display2: displayStyle2,
  display1: displayStyle1,
  headline: headlineStyle,
  title: titleStyle,
  subhead: subheadStyle,
  body2: body2Style,
  body1: body1Style,
  caption: captionStyle,
  button: buttonStyle,
  subtitle: subtitleStyle,
  overline: overlineStyle,
);

// Getters
TextStyle style;
style = textTheme.display4;
style = textTheme.display3;
style = textTheme.display2;
style = textTheme.display1;
style = textTheme.headline;
style = textTheme.title;
style = textTheme.subhead;
style = textTheme.body2;
style = textTheme.body1;
style = textTheme.caption;
style = textTheme.button;
style = textTheme.subtitle;
style = textTheme.overline;
```

遷移後的程式碼：

```dart
// TextTheme
// Base constructor
TextTheme(
  headline1: displayStyle4,
  headline2: displayStyle3,
  headline3: displayStyle2,
  headline4: displayStyle1,
  headline5: headlineStyle,
  headline6: titleStyle,
  subtitle1: subheadStyle,
  bodyText1: body2Style,
  bodyText2: body1Style,
  caption: captionStyle,
  button: buttonStyle,
  subtitle2: subtitleStyle,
  overline: overlineStyle,
);

TextTheme.copyWith(
  headline1: displayStyle4,
  headline2: displayStyle3,
  headline3: displayStyle2,
  headline4: displayStyle1,
  headline5: headlineStyle,
  headline6: titleStyle,
  subtitle1: subheadStyle,
  bodyText1: body2Style,
  bodyText2: body1Style,
  caption: captionStyle,
  button: buttonStyle,
  subtitle2: subtitleStyle,
  overline: overlineStyle,
);

TextStyle style;
style = textTheme.headline1;
style = textTheme.headline2;
style = textTheme.headline3;
style = textTheme.headline4;
style = textTheme.headline5;
style = textTheme.headline6;
style = textTheme.subtitle1;
style = textTheme.bodyText1;
style = textTheme.bodyText2;
style = textTheme.caption;
style = textTheme.button;
style = textTheme.subtitle2;
style = textTheme.overline;
```

**參考資料**

設計文件：

* [Update the TextTheme API][Update the TextTheme API]

API 文件：

* [`TextTheme`][`TextTheme`]

相關議題：

* [Migrate TextTheme to 2018 APIs][Migrate TextTheme to 2018 APIs]

相關 PR：

* 在 [#48547][#48547] 標記為已淘汰
* 在 [#83924][#83924] 移除

[Update the TextTheme API]: /go/update-text-theme-api
[`TextTheme`]: https://api.flutter.dev/flutter/material/TextTheme-class.html
[Migrate TextTheme to 2018 APIs]: https://github.com/flutter/flutter/issues/45745
[#48547]: https://github.com/flutter/flutter/pull/48547
[#83924]: https://github.com/flutter/flutter/pull/83924

---

### 預設 `Typography`

Flutter Fix 是否支援：否

預設的 `Typography` 已於 v1.13.8 標記為已淘汰。
先前的預設值會回傳 2014 年 Material Design 規範的文字樣式。
現在將會導致 `TextStyle` 反映 2018 年 Material Design 規範的文字樣式。
若需使用舊版，請改用 `material2014` 建構子。

**遷移指南**

遷移前的程式碼：

```dart
// Formerly returned 2014 TextStyle spec
Typography();
```

遷移後的程式碼：

```dart
// Use 2018 TextStyle spec, either by default or explicitly.
Typography();
Typography.material2018();

// Use 2014 spec from former API
Typography.material2014();
```

**參考資料**

設計文件：

* [Update the TextTheme API][Update the TextTheme API]

API 文件：

* [`Typography`][`Typography`]

相關議題：

* [Migrate TextTheme to 2018 APIs][Migrate TextTheme to 2018 APIs]

相關 PR：

* 在 [#48547][#48547] 標記為已棄用
* 在 [#83924][#83924] 移除

[Update the TextTheme API]: /go/update-text-theme-api
[`Typography`]: https://api.flutter.dev/flutter/material/Typography-class.html
[Migrate TextTheme to 2018 APIs]: https://github.com/flutter/flutter/issues/45745
[#48547]: https://github.com/flutter/flutter/pull/48547
[#83924]: https://github.com/flutter/flutter/pull/83924

---

## 時程

在穩定版發行：2.5

