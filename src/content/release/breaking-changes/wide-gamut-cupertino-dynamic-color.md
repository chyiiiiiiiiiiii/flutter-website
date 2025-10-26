---
title: wide gamut CupertinoDynamicColor 遷移指南
description: >-
  解決先前遺漏的 CupertinoDynamicColor 棄用項目，以配合 wide gamut Color API。
---

{% render docs/breaking-changes.md %}

## 摘要

為了配合 [`Color`][`Color`] 類別，部分 [`CupertinoDynamicColor`][`CupertinoDynamicColor`] 的屬性與方法已被棄用，這是因為 [Flutter 3.27][Migration guide for wide gamut Color] 新增了 [wide gamut 色域空間][wide gamut color spaces] 的支援。

## 背景說明

`Color` 類別已更新以支援 wide gamut 色域空間，但由於其實作方式，而非繼承自 `Color`，因此部分對應的棄用項目最初未套用至 `CupertinoDynamicColor`。

## 變更說明

1.  [`CupertinoDynamicColor.red`][`CupertinoDynamicColor.red`] 欄位已被棄用，請改用 [`CupertinoDynamicColor.r`]。
1.  [`CupertinoDynamicColor.green`][`CupertinoDynamicColor.green`] 已被棄用，請改用 [`CupertinoDynamicColor.g`]。
1.  [`CupertinoDynamicColor.blue`][`CupertinoDynamicColor.blue`] 已被棄用，請改用 [`CupertinoDynamicColor.b`]。
1.  [`CupertinoDynamicColor.opacity`][`CupertinoDynamicColor.opacity`] 已被棄用，請改用 [`CupertinoDynamicColor.a`]。
1.  [`CupertinoDynamicColor.withOpacity()`][`CupertinoDynamicColor.withOpacity()`] 已被棄用，請改用 [`CupertinoDynamicColor.withValues()`]。

## 遷移指南

### 存取顏色元件

如果您的應用程式需要存取單一顏色元件，建議利用浮點數元件。在短期內，您可以自行縮放這些元件的值。

```dart
int _floatToInt8(double x) {
  return (x * 255.0).round().clamp(0, 255);
}

const CupertinoDynamicColor color = CupertinoColors.systemBlue;
final intRed = _floatToInt8(color.r);
final intGreen = _floatToInt8(color.g);
final intBlue = _floatToInt8(color.b);
```

### 透明度（Opacity）

在 Flutter 3.27 之前，`Color` 採用了「透明度（opacity）」的概念，這在 `opacity` 和 `withOpacity()` 方法中有所體現。自 Flutter 3.27 起，alpha 會以浮點數值儲存。使用 `.a` 和 `.withValues()` 時，將完整表達浮點數值，不會被量化（限制在有限範圍內）。這表示「alpha」能更正確地表達「透明度」的意圖。

#### 遷移 `opacity`

```dart
// Before: Access the alpha channel as a (converted) floating-point value.
final x = color.opacity;

// After: Access the alpha channel directly.
final x = color.a;
```

#### 遷移 `withOpacity`

```dart
// Before: Create a new color with the specified opacity.
final x = color.withOpacity(0.5);

// After: Create a new color with the specified alpha channel value,
// accounting for the current or specified color space.
final x = color.withValues(alpha: 0.5);
```

## 時程

合併於版本：尚未<br>  
穩定版本釋出：尚未

## 參考資料

相關指南：

* [wide gamut Color 遷移指南][Migration guide for wide gamut Color]

相關議題：

* [在 Framework 中實作 wide gamut color 支援][Implement wide gamut color support in the Framework]
* [CupertinoDynamicColor 缺少棄用（deprecation）通知][CupertinoDynamicColor is missing deprecation notices]

相關 PR：

* [為 CupertinoDynamicColor 補上缺少的棄用（deprecation）][Add missing deprecations to CupertinoDynamicColor]

[`Color`]: {{site.api}}/flutter/dart-ui/Color-class.html
[`CupertinoDynamicColor`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor-class.html
[wide gamut color spaces]: https://en.wikipedia.org/wiki/RGB_color_spaces
[`CupertinoDynamicColor.red`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/red.html
[`CupertinoDynamicColor.r`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/r.html
[`CupertinoDynamicColor.green`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/green.html
[`CupertinoDynamicColor.g`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/g.html
[`CupertinoDynamicColor.blue`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/blue.html
[`CupertinoDynamicColor.b`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/b.html
[`CupertinoDynamicColor.opacity`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/opacity.html
[`CupertinoDynamicColor.a`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/a.html
[`CupertinoDynamicColor.withOpacity()`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/withOpacity.html
[`CupertinoDynamicColor.withValues()`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/withValues.html
[Migration guide for wide gamut Color]: /release/breaking-changes/wide-gamut-framework
[Implement wide gamut color support in the Framework]: {{site.repo.flutter}}/issues/127855
[CupertinoDynamicColor is missing deprecation notices]: {{site.repo.flutter}}/issues/171059
[Add missing deprecations to CupertinoDynamicColor]: {{site.repo.flutter}}/pull/171160
