---
title: 寬廣色域顏色的遷移指南
description: >-
  支援寬廣色域顏色的變更與遷移說明。
---

{% render docs/breaking-changes.md %}

## 摘要

`dart:ui` 中的 [`Color`][`Color`] 類別 API 正在進行調整，以支援[寬廣色域色彩空間][wide gamut color spaces]。

## 背景

Flutter 引擎已經透過 [Impeller][Impeller] [支援寬廣色域顏色][already supports wide gamut color]，這項支援現在也[加入到框架][to the framework]中。

Flutter 支援的 iOS 裝置可以渲染更廣泛的顏色，特別是在 [DisplayP3][DisplayP3] 色彩空間中。
這項變更後，Flutter 框架能夠在 iOS Impeller 上渲染所有這些顏色，
同時 `Color` 類別也更能因應未來的色彩空間或色彩元件位元深度的變更。

## 變更說明

[`Color`][`Color`] 的變更：

 1. 新增一個列舉欄位，用來指定其 [`ColorSpace`][`ColorSpace`]。
 1. 新增可使用標準化浮點數色彩元件的 API。
 1. 移除使用 8 位元無號整數色彩元件的 API，因為這可能導致資料遺失。

[`ColorSpace`][`ColorSpace`] 的變更：

 1. 新增 `displayP3` 屬性。

## 遷移指南

### 8 位元無號整數建構函式

像 `Color.fromARGB` 這類建構函式維持不變，並會持續支援。
若要使用 Display P3 色彩，必須使用新的 `Color.from` 建構函式，該建構函式接受標準化的浮點數色彩元件。

```dart
// Before: Constructing an sRGB color from the lower 8 bits of four integers.
final magenta = Color.fromARGB(0xff, 0xff, 0x0, 0xff);

// After: Constructing a color with normalized floating-point components.
final magenta = Color.from(alpha: 1.0, red: 1.0, green: 0.0, blue: 1.0);
```

### `Color` 的實作類別

由於 `Color` 新增了新的方法，
任何繼承 `implements Color` 的類別都會產生相容性破壞，並且必須實作這些新方法，例如 `Color.a` 和 `Color.b`。

最終，實作類別應該遷移以善用新的 API。
在短期內，這些方法可以很容易地實作，而不需要更動類別的底層結構。

例如：

```dart
class Foo implements Color {
  int _red;

  @override
  double get r => _red / 255.0;
}
```

:::note
Flutter 計劃最終將 `Color` 類別鎖定，並使其成為 `sealed`。

現在或許是個好時機，從[繼承轉向組合][inheritance to composition]，並停止重新實作 `Color`。
:::

### 色彩空間支援

使用 `Color` 並對色彩元件進行任何計算的客戶端，現在應該在執行計算前，先檢查色彩空間元件。
為了協助這一點，你可以使用新的 `Color.withValues` 方法來進行色彩空間轉換。

範例遷移方式：

```dart
// Before
double redRatio(Color x, Color y) => x.red / y.red;

// After
double redRatio(Color x, Color y) {
  final xPrime = x.withValues(colorSpace: ColorSpace.extendedSRGB);
  final yPrime = y.withValues(colorSpace: ColorSpace.extendedSRGB);
  return xPrime.r / yPrime.r;
}
```

在未對齊色彩空間的情況下，直接以色彩元件進行計算，可能會導致細微且難以預期的結果。在前述範例中，`redRatio` 在以不同色彩空間與對齊色彩空間進行計算時，會出現與 `0.09` 的差異。

### 存取色彩元件

如果你的應用程式需要存取 `Color` 元件，建議善用浮點數元件。在短期內，你可以直接對元件進行縮放處理。

```dart
extension IntColorComponents on Color {
  int get intAlpha => _floatToInt8(this.a);
  int get intRed => _floatToInt8(this.r);
  int get intGreen => _floatToInt8(this.g);
  int get intBlue => _floatToInt8(this.b);

  int _floatToInt8(double x) {
    return (x * 255.0).round() & 0xff;
  }
}
```

### 透明度（Opacity）

在 Flutter 3.27 之前，Color 具有「透明度（opacity）」的概念，這體現在 `Color` 和 `opacity` 方法中。透明度被引入，是為了以浮點數值（[0.0, 1.0]）與 `withOpacity()` 溝通其 alpha 通道。透明度方法是為了方便設定 8 位元的 alpha 值（[0, 255]），但從未能完整表達浮點數的精度。當顏色元件以 8 位元整數儲存時，這樣的設計已經足夠。

自 Flutter 3.27 起，alpha 會以浮點數值儲存。使用 `Color` 和 `.a` 時，將能完整表達浮點數值，不會被量化（限制在有限的範圍內）。這代表「alpha」能更正確地表達「透明度（opacity）」的意圖。透明度（opacity）在細節上有所不同，其使用方式可能導致意外的資料遺失，因此 `.withValues()` 和 `.withOpacity()` 已被棄用，並維持其語意以避免破壞現有程式碼。

例如：

```dart
// Prints 0.5019607843137255.
print(Colors.black.withOpacity(0.5).a);
// Prints 0.5.
print(Colors.black.withValues(alpha: 0.5).a);
```

幾乎所有的使用情境都能直接受益於更精確的顏色。在極少數無法受益的情況下，可以透過使用`.alpha`和`.withAlpha()`將不透明度量化為 [0, 255]，以符合 Flutter 3.27 之前的行為。

<a id="opacity-migration" aria-hidden="true"></a>
#### 遷移 `opacity`

```dart
// Before: Access the alpha channel as a (converted) floating-point value.
final x = color.opacity;

// After: Access the alpha channel directly.
final x = color.a;
```

<a id="withopacity-migration" aria-hidden="true"></a>
#### 遷移 `withOpacity`

```dart
// Before: Create a new color with the specified opacity.
final x = color.withOpacity(0.0);

// After: Create a new color with the specified alpha channel value,
// accounting for the current or specified color space.
final x = color.withValues(alpha: 0.0);
```

### 相等性

當 `Color` 開始以浮點數儲存其色彩元件時，
相等性判斷會有些許不同。
在進行色彩計算時，數值之間可能會出現
極小的差異，但這些差異可以視為相等。
為了因應這種情況，請使用 [`closeTo`][`closeTo`] 或 [`isColorSameAs`][`isColorSameAs`] 比對器（matcher）。

```dart
// Before: Check exact equality of int-based color.
expect(calculateColor(), const Color(0xffff00ff));

// After: Check rough equality of floating-point-based color.
expect(calculateColor(), isSameColorAs(const Color(0xffff00ff)));
```

## 時程

### 第一階段 - 新 API 推出，舊 API 停用

已於版本：3.26.0-0.1.pre<br>
正式版釋出：3.27.0

### 第二階段 - 舊 API 移除

已於版本：尚未<br>
正式版釋出：尚未

## 參考資料

相關議題：

* [issue 127855][issue 127855]：在 Framework 中實作寬色域（wide gamut）色彩支援

相關 PR：

* [PR 54737][PR 54737]：Framework wide color

[`Color`]: {{site.api}}/flutter/dart-ui/Color-class.html
[already supports wide gamut color]: {{site.repo.flutter}}/issues/55092
[to the framework]: {{site.repo.flutter}}/issues/127855
[issue 127855]: {{site.repo.flutter}}/issues/127855
[`ColorSpace`]: {{site.api}}/flutter/dart-ui/ColorSpace.html
[PR 54737]: {{site.repo.engine}}/pull/54737
[DisplayP3]: https://en.wikipedia.org/wiki/DCI-P3
[Impeller]: {{site.api}}/perf/impeller
[wide gamut color spaces]: https://en.wikipedia.org/wiki/RGB_color_spaces
[inheritance to composition]: https://en.wikipedia.org/wiki/Composition_over_inheritance
[`closeTo`]: {{site.api}}/documentation/matcher/latest/matcher/closeTo.html
[`isColorSameAs`]: {{site.api}}/flutter/flutter_test/isSameColorAs.html
