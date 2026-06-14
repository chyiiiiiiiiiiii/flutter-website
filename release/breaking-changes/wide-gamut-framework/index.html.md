# 寬廣色域色彩的遷移指南

> 支援寬廣色域色彩的變更與遷移說明。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`dart:ui` 中的 [`Color`][] 類別的 API 正在進行調整，以支援[寬廣色域色彩空間][wide gamut color spaces]。

## 背景說明

Flutter 引擎已經透過 [Impeller][] [支援寬廣色域色彩][already supports wide gamut color]，而這項支援現正[加入至框架][to the framework]。

Flutter 支援的 iOS 裝置能夠渲染更廣泛的色彩，特別是在 [DisplayP3][] 色彩空間中。
這項變更後，Flutter 框架將能在 iOS Impeller 上渲染所有這些色彩，
而 `Color` 類別也將更能因應未來的色彩空間或色彩元件位元深度的變動。

## 變更說明

[`Color`][] 的變更：

 1. 新增一個列舉欄位，用以指定其 [`ColorSpace`][]。
 1. 新增 API，支援使用標準化浮點數色彩元件。
 1. 移除使用 8 位元無號整數色彩元件的 API，避免資料遺失。

[`ColorSpace`][] 的變更：

 1. 新增 `displayP3` 屬性。

## 遷移指南

### 8 位元無號整數建構函式

像是 `Color.fromARGB` 這類建構函式維持不變，並會持續支援。
若要利用 Display P3 色彩，必須改用新的 `Color.from` 建構函式，該建構函式接受標準化浮點數色彩元件。

```dart
// Before: Constructing an sRGB color from the lower 8 bits of four integers.
final magenta = Color.fromARGB(0xff, 0xff, 0x0, 0xff);

// After: Constructing a color with normalized floating-point components.
final magenta = Color.from(alpha: 1.0, red: 1.0, green: 0.0, blue: 1.0);
```

### `Color` 的實作類別

由於 `Color` 新增了方法，
任何繼承 `implements Color` 的類別都會發生相容性破壞，
並且必須實作這些新方法，例如 `Color.a` 和 `Color.b`。

最終，實作者應該遷移並善用新的 API。
在短期內，這些方法可以很容易地實作，
而不需要更動類別的底層結構。

例如：

```dart
class Foo implements Color {
  int _red;

  @override
  double get r => _red / 255.0;
}
```

:::note
Flutter 計劃最終會將 `Color` 類別鎖定，並使其成為 `sealed`。

現在或許是個好時機，將[繼承轉換為組合][inheritance to composition]，並停止重新實作 `Color`。
:::

### 色彩空間支援

使用 `Color` 並對色彩元件進行任何計算的客戶端，現在應該在執行計算前，先檢查色彩空間元件。
為了協助這個流程，你可以使用新的 `Color.withValues` 方法來進行色彩空間轉換。

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

在未對齊色彩空間的情況下，直接以色彩分量進行計算，可能會導致細微且難以預期的結果。
在前述範例中，`redRatio` 在以不同色彩空間與對齊色彩空間進行計算時，會出現 `0.09` 的差異。

### 存取色彩分量

如果你的應用程式需要存取 `Color` 分量，建議善用浮點數分量。
在短期內，你可以直接對這些分量進行縮放處理。

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

在 Flutter 3.27 之前，Color 具有「透明度（opacity）」的概念，這體現在 `opacity` 和 `withOpacity()` 方法中。
透明度的引入，是為了能以浮點數值（[0.0, 1.0]）與 `Color` 溝通其 alpha 通道。
透明度相關的方法是為了方便設定 8 位元的 alpha 值（[0, 255]），
但這些方法從未提供完整的浮點數表達能力。
當色彩元件以 8 位元整數儲存時，這樣的設計已經足夠。

自 Flutter 3.27 起，alpha 會以浮點數值儲存。
使用 `.a` 和 `.withValues()` 可以完整表達浮點數值，
不會被量化（即不會被限制在有限的範圍內）。
這表示「alpha」能更正確地表達「透明度（opacity）」的意圖。
透明度（opacity）在細節上有些微差異，其使用方式有可能導致意外的資料遺失，
因此 `.withOpacity()` 和 `.opacity` 已被棄用，並且其語意被保留，以避免破壞既有程式碼。

例如：

```dart
// Prints 0.5019607843137255.
print(Colors.black.withOpacity(0.5).a);
// Prints 0.5.
print(Colors.black.withValues(alpha: 0.5).a);
```

幾乎所有的使用情境都能直接受益於更精確的色彩表現。
在極少數無法受益的情況下，可以透過使用 `.alpha` 和 `.withAlpha()`，
將透明度量化為 [0, 255]，以符合 Flutter 3.27 之前的行為。

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

當 `Color` 以浮點數儲存其色彩元件時，
相等性的判斷方式會略有不同。
在進行色彩運算時，數值之間可能會出現
極小的差異，但這些差異可以視為相等。
為了因應這種情況，請使用 [`closeTo`][] 或 [`isColorSameAs`][] 比對器（matcher）。

```dart
// Before: Check exact equality of int-based color.
expect(calculateColor(), const Color(0xffff00ff));

// After: Check rough equality of floating-point-based color.
expect(calculateColor(), isSameColorAs(const Color(0xffff00ff)));
```

## 時程表

### 第一階段 - 新 API 引入，舊 API 棄用

已於版本：3.26.0-0.1.pre<br>
穩定版發佈於：3.27.0

### 第二階段 - 移除舊 API

已於版本：尚未<br>
穩定版發佈於：尚未

## 參考資料

相關議題：

* [issue 127855][]：在 Framework 中實作寬廣色域（wide gamut）色彩支援

相關 PR：

* [PR 54737][]：Framework 寬廣色域色彩

[`Color`]: https://api.flutter.dev/flutter/dart-ui/Color-class.html
[already supports wide gamut color]: https://github.com/flutter/flutter/issues/55092
[to the framework]: https://github.com/flutter/flutter/issues/127855
[issue 127855]: https://github.com/flutter/flutter/issues/127855
[`ColorSpace`]: https://api.flutter.dev/flutter/dart-ui/ColorSpace.html
[PR 54737]: https://github.com/flutter/engine/pull/54737
[DisplayP3]: https://en.wikipedia.org/wiki/DCI-P3
[Impeller]: https://api.flutter.dev/perf/impeller
[wide gamut color spaces]: https://en.wikipedia.org/wiki/RGB_color_spaces
[inheritance to composition]: https://en.wikipedia.org/wiki/Composition_over_inheritance
[`closeTo`]: https://api.flutter.dev/documentation/matcher/latest/matcher/closeTo.html
[`isColorSameAs`]: https://api.flutter.dev/flutter/flutter_test/isSameColorAs.html

