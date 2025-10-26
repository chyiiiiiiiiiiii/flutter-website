---
title: Flutter 的字型與排版
description: 了解 Flutter 對排版的支援。
---

[_Typography（排版）_][_Typography_] 涵蓋了字體或字型的風格與外觀：它規範了字型的粗細、傾斜度、字母間距，以及文字的其他視覺屬性。

所有字型並非都一樣。

一種字型風格至少由以下幾個部分定義：字體（typeface），代表同一字型家族下描述字型的共同字元規則，例如 **Roboto** 或 **Noto**；字重（font weight，例如 Regular、Bold 或數值）；以及樣式（style，如 Regular、_Italic_ 等）。這些屬性與其他預設屬性組合在一起，就形成了我們所說的靜態字型（static font）。

可變字型（Variable fonts）允許在執行時修改部分屬性，並將原本需要多個靜態字型的內容儲存在單一檔案中。

[_Typography_]: https://en.wikipedia.org/wiki/Typography

## 排版比例（Typographic Scale）

排版比例是一組相關的文字樣式，用於在您的應用程式中提供平衡性、一致性與視覺多樣性。

Flutter 中常見的字型比例，由 [`TextTheme`][`TextTheme`] 提供，包含五種文字功能分類：

* Display
* Headline
* Title
* Label
* Body

每一種分類又有三種尺寸變化：

* Small
* Medium
* Large

這五種分類與三種尺寸的十五種組合，各自對應一個 [`TextStyle`][`TextStyle`]。

<img src='/assets/images/docs/development/ui/typography/typographical-scale.png' alt="Material TextTheme 的排版比例列表">

Flutter 所提供的所有平台專屬排版比例，都包含在 [`Typography`][`Typography`] 類別中。通常，您不需要直接參考這個類別，因為 `TextTheme` 會根據目標平台自動在地化。

[`TextTheme`]: https://api.flutter.dev/flutter/material/TextTheme-class.html
[`TextStyle`]: https://api.flutter.dev/flutter/painting/TextStyle-class.html
[`Typography`]: https://api.flutter.dev/flutter/material/Typography-class.html

## 可變字型（Variable fonts）

[可變字型（Variable fonts）][Variable fonts]
讓您可以控制文字樣式中預先定義的屬性。
可變字型支援特定軸向，例如寬度、粗細、傾斜度（僅舉幾例）。
使用者在指定字型時，可以在連續軸上選擇_任意值_。

[Variable fonts]: https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts

### 使用 Google Fonts 型態測試工具（Type Tester）

越來越多 Google Fonts 上的字型支援可變字型功能。
您可以透過 Type Tester 來查看各種選項，並觀察如何變化單一字型。

<img src='/assets/images/docs/development/ui/typography/google-fonts-type-tester.png' alt="Noto Sans 字型搭配 Lorem ipsum 文字的多種變化示範">

即時地，在任一軸上移動滑桿即可看到字型的變化效果。當您在程式中使用可變字型時，請使用 [`FontVariation`][`FontVariation`] 類別來調整字型的設計軸。`FontVariation` 類別符合
[OpenType font variables 規範][OpenType font variables spec]。

[`FontVariation`]: {{site.api}}/flutter/dart-ui/FontVariation-class.html
[Google Fonts]: https://fonts.google.com/
[OpenType font variables spec]: https://learn.microsoft.com/en-us/typography/opentype/spec/otvaroverview

## 靜態字型（Static fonts）

Google Fonts 也包含靜態字型。與可變字型一樣，您需要了解字型的設計方式，才能知道有哪些可用選項。
同樣地，Google Fonts 網站可以協助您。

### 使用 Google Fonts 套件

雖然您可以從網站下載字型並手動安裝到應用程式中，但也可以直接從 [google_fonts][google_fonts] 套件於 [pub.dev][pub.dev] 上使用。

只需參考字型名稱即可直接使用：

```dart
Text(
  'This is Google Fonts',
  style: GoogleFonts.lato(),
),
```

或是透過設定產生的 `TextStyle` 的屬性來自訂：

```dart
Text(
  'This is Google Fonts',
  style: GoogleFonts.lato(
    textStyle: Theme.of(context).textTheme.displayLarge,
    fontSize: 48,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.italic,
  ),
),
```

### 修改字型

使用以下 API 可以以程式方式修改靜態字型
（但請記住，這僅適用於該字型「設計時」就支援此功能的情況）：

* [`FontFeature`][`FontFeature`] 用於選擇字形（glyphs）
* [`FontWeight`][`FontWeight`] 用於修改字重（weight）
* [`FontStyle`][`FontStyle`] 用於斜體化（italicize）
* [`FontVariation`][`FontVariation`] 用於指定特定屬性的數值範圍。

`FontFeature` 對應一個 [OpenType 功能標籤（feature tag）][OpenType feature tag]，
你可以將其視為一個布林旗標（boolean flag），
用來啟用或停用指定字型的某個功能。

[`FontFeature`]: {{site.api}}/flutter/dart-ui/FontFeature-class.html
[`FontStyle`]: {{site.api}}/flutter/dart-ui/FontStyle.html
[`FontWeight`]: {{site.api}}/flutter/dart-ui/FontWeight-class.html
[OpenType feature tag]: https://learn.microsoft.com/en-us/typography/opentype/spec/featuretags
[pub.dev]: https://pub.dev
[google_fonts]: https://pub.dev/packages/google_fonts

## 其他資源

下方影片展示了 Flutter 字體排印（typography）的一些功能，
並結合了 Material 及 Cupertino 的外觀與操作體驗
（會依據應用程式執行的平台自動切換），
還有動畫（Animation）與自訂片段著色器（custom fragment shaders）：

{% ytEmbed 'sA5MRFFUuOU', 'Prototyping beautiful designs with Flutter' %}

如果你想了解某位工程師
自訂可變字型（variable fonts）並將其動畫化（morphing）的經驗
（這也是上述影片的基礎），
可以參考 Medium 上的免費文章
[Playful typography with Flutter][article]。
文中範例同樣使用了自訂著色器（custom shader）。

[article]: {{site.flutter-medium}}/playful-typography-with-flutter-f030385058b4
