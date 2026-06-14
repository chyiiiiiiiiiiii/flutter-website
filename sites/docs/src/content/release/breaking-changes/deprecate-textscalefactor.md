---
title: 棄用 textScaleFactor，改用 TextScaler
description: >-
  新增的 TextScaler 類別取代了 textScaleFactor 這個純量值，
  以因應 Android 14 非線性文字縮放支援的準備。
---

{% render "docs/breaking-changes.md" %}

## 摘要

為了支援 [Android 14 非線性字型縮放][Android 14 nonlinear font scaling] 功能，
Flutter 框架中所有出現的 `textScaleFactor` 均已被棄用，並由 `TextScaler` 取代。

## 背景

許多平台允許使用者在系統偏好設定中全域調整文字內容的縮放比例。
過去，縮放策略是以一個名為 `textScaleFactor` 的單一 `double` 值來表示，
因為文字縮放是「等比例」的：`scaledFontSize = textScaleFactor x unScaledFontSize`。
例如，當 `textScaleFactor` 為 2.0，且開發者指定的字型大小為 14.0 時，
實際的字型大小就是 2.0 x 14.0 = 28.0。

隨著 [Android 14 非線性字型縮放][Android 14 nonlinear font scaling] 的引入，較大的文字縮放幅度會小於較小文字，
以避免已經很大的文字被過度放大。
「等比例」縮放所使用的 `textScaleFactor` 純量值，已無法滿足這種新的縮放策略。
[以 `TextScaler` 取代 `textScaleFactor`][Replaces `textScaleFactor` with `TextScaler`] 的 pull request 引入了一個新的類別 `TextScaler`，
以取代 `textScaleFactor`，為這項新功能做準備。
非線性文字縮放則會在另一個 pull request 中導入。

## 變更說明

引入了一個新的介面 `TextScaler`，
用來表示文字縮放策略。

```dart
abstract class TextScaler {
  double scale(double fontSize);
  double get textScaleFactor; // Deprecated.
}
```

請使用 `scale` 方法來縮放字型大小，而非 `textScaleFactor`。
`textScaleFactor` getter 提供了一個預估的 `textScaleFactor` 值，僅為了向後相容而保留，且已經標記為已淘汰（deprecated），未來版本的 Flutter 將會移除。

新的類別已經取代了
`double textScaleFactor`（`double textScaleFactor` -> `TextScaler textScaler`），
並應用於以下 API：

### 繪製 (Painting) 函式庫

| 受影響的 API                                                                     | 錯誤訊息                                                   |
|-----------------------------------------------------------------------------------|--------------------------------------------------------|
| `InlineSpan.build({ double textScaleFactor = 1.0 })` 參數                     | The named parameter 'textScaleFactor' isn't defined.   |
| `TextStyle.getParagraphStyle({ double TextScaleFactor = 1.0 })` 參數          | The named parameter 'textScaleFactor' isn't defined.   |
| `TextStyle.getTextStyle({ double TextScaleFactor = 1.0 })` 參數              | 'textScaleFactor' is deprecated and shouldn't be used. |
| `TextPainter({ double TextScaleFactor = 1.0 })` 建構函式參數              | 'textScaleFactor' is deprecated and shouldn't be used. |
| `TextPainter.textScaleFactor` getter 與 setter                                   | 'textScaleFactor' is deprecated and shouldn't be used. |
| `TextPainter.computeWidth({ double TextScaleFactor = 1.0 })` 參數             | 'textScaleFactor' is deprecated and shouldn't be used. |
| `TextPainter.computeMaxIntrinsicWidth({ double TextScaleFactor = 1.0 })` 參數 | 'textScaleFactor' is deprecated and shouldn't be used. |

### Rendering 函式庫

| 受影響的 API                                                            | 錯誤訊息                                                   |
|--------------------------------------------------------------------------|--------------------------------------------------------|
| `RenderEditable({ double TextScaleFactor = 1.0 })` 建構函式參數  | 'textScaleFactor' is deprecated and shouldn't be used. |
| `RenderEditable.textScaleFactor` getter 與 setter                       | 'textScaleFactor' is deprecated and shouldn't be used. |
| `RenderParagraph({ double TextScaleFactor = 1.0 })` 建構函式參數 | 'textScaleFactor' is deprecated and shouldn't be used. |
| `RenderParagraph.textScaleFactor` getter 與 setter                      | 'textScaleFactor' is deprecated and shouldn't be used. |

### 元件 (Widgets) 函式庫

| 受影響的 API                                                           | 錯誤訊息                                                            |
|-------------------------------------------------------------------------|---------------------------------------------------------------|
| `MediaQueryData({ double TextScaleFactor = 1.0 })` 建構函式參數 | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `MediaQueryData.textScaleFactor` getter                                 | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `MediaQueryData.copyWith({ double? TextScaleFactor })` 參數         | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `MediaQuery.maybeTextScaleFactorOf(BuildContext context)` 靜態方法 | 'maybeTextScaleFactorOf' is deprecated and shouldn't be used. |
| `MediaQuery.textScaleFactorOf(BuildContext context)` 靜態方法      | 'textScaleFactorOf' is deprecated and shouldn't be used.      |
| `RichText({ double TextScaleFactor = 1.0 })` 建構函式參數       | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `RichText.textScaleFactor` getter                                       | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `Text({ double? TextScaleFactor = 1.0 })` 建構函式參數          | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `Text.rich({ double? TextScaleFactor = 1.0 })` 建構函式參數     | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `Text.textScaleFactor` getter                                           | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `EditableText({ double? TextScaleFactor = 1.0 })` 建構函式參數  | 'textScaleFactor' is deprecated and shouldn't be used.        |
| `EditableText.textScaleFactor` getter                                   | 'textScaleFactor' is deprecated and shouldn't be used.        |

### Material 函式庫

| 受影響的 API                                                                 | 錯誤訊息                                                   |
|-------------------------------------------------------------------------------|--------------------------------------------------------|
| `SelectableText({ double? TextScaleFactor = 1.0 })` 建構函式參數      | 'textScaleFactor' is deprecated and shouldn't be used. |
| `SelectableText.rich({ double? TextScaleFactor = 1.0 })` 建構函式參數 | 'textScaleFactor' is deprecated and shouldn't be used. |
| `SelectableText.textScaleFactor` getter                                       | 'textScaleFactor' is deprecated and shouldn't be used. |

## 遷移指南

Flutter 框架所提供的元件 (Widgets) 已經完成遷移。
只有當你使用了前述表格中列出的已淘汰符號時，才需要進行遷移。

### 遷移你暴露 `textScaleFactor` 的 API

遷移前：

```dart
abstract class _MyCustomPaintDelegate {
  void paint(PaintingContext context, Offset offset, double textScaleFactor) {
  }
}
```

遷移後：

```dart
abstract class _MyCustomPaintDelegate {
  void paint(PaintingContext context, Offset offset, TextScaler textScaler) {
  }
}
```

### 遷移消費 `textScaleFactor` 的程式碼

如果你目前並未直接使用 `textScaleFactor`，而是將其傳遞給另一個接收 `textScaleFactor` 的 API，且該接收方 API 已經完成遷移，那麼這個遷移相對簡單：

遷移前：

```dart
RichText(
  textScaleFactor: MediaQuery.textScaleFactorOf(context),
  ...
)
```

遷移後：

```dart
RichText(
  textScaler: MediaQuery.textScalerOf(context),
  ...
)
```

如果提供 `textScaleFactor` 的 API 尚未完成遷移，建議等待遷移後的版本。

如果你希望自行計算縮放後的字型大小，請使用 `TextScaler.scale`，而不要使用 `*` 二元運算子：

遷移前：

```dart
final scaledFontSize = textStyle.fontSize * MediaQuery.textScaleFactorOf(context);
```

遷移後：

```dart
final scaledFontSize = MediaQuery.textScalerOf(context).scale(textStyle.fontSize);
```

如果你使用 `textScaleFactor` 來縮放非字體大小的尺寸，
則沒有通用的規則可以將程式碼遷移到非線性縮放，
這可能需要以不同的方式實作 UI。
以下重複使用 `MyTooltipBox` 範例：

```dart
MyTooltipBox(
  size: chatBoxSize * textScaleFactor,
  child: RichText(..., style: TextStyle(fontSize: 20)),
)
```

你可以選擇使用「有效」的文字縮放因子（text scale factor），方法是在字型大小為 20 時套用 `TextScaler`：`chatBoxSize * textScaler.scale(20) / 20`，或者重新設計 UI，讓元件 (Widget) 自行決定其內在尺寸。

### 覆寫元件子樹中的文字縮放策略

若要覆寫元件子樹中現有的 `TextScaler`，可以像這樣覆寫 `MediaQuery`：

遷移前：

```dart
MediaQuery(
  data: MediaQuery.of(context).copyWith(textScaleFactor: 2.0),
  child: child,
)
```

遷移後：

```dart
MediaQuery(
  data: MediaQuery.of(context).copyWith(textScaler: _myCustomTextScaler),
  child: child,
)
```

然而，實際上很少需要自行建立 `TextScaler` 的子類別。
`MediaQuery.withNoTextScaling`（會建立一個完全為其子樹停用文字縮放的元件），以及 `MediaQuery.withClampedTextScaling`（會建立一個將縮放後字體大小限制在 `[minScaleFactor * fontSize, maxScaleFactor * fontSize]` 範圍內的元件），這兩者都是方便用法，涵蓋了常見需要覆寫文字縮放策略的情境。

#### 範例

**為圖示字型停用文字縮放**

遷移前：

```dart
MediaQuery(
  data: MediaQuery.of(context).copyWith(textScaleFactor: 1.0),
  child: IconTheme(
    data: ..,
    child: icon,
  ),
)
```

遷移後：

```dart
MediaQuery.withNoTextScaling(
  child: IconTheme(
    data: ...
    child: icon,
  ),
)
```

**防止內容過度縮放**

遷移前：

```dart
final mediaQueryData = MediaQuery.of(context);
MediaQuery(
  data: mediaQueryData.copyWith(textScaleFactor: math.min(mediaQueryData.textScaleFactor, _kMaxTitleTextScaleFactor),
  child: child,
)
```

遷移後：

```dart
MediaQuery.withClampedTextScaling(
  maxScaleFactor: _kMaxTitleTextScaleFactor,
  child: title,
)
```

**停用非線性文字縮放**

如果你希望在你的應用程式完全遷移之前，暫時在 Android 14 上停用非線性文字縮放，請將修改過的 `MediaQuery` 放在應用程式元件樹（widget tree）的頂部：

```dart
runApp(
  Builder(builder: (context) {
    final mediaQueryData = MediaQuery.of(context);
    final mediaQueryDataWithLinearTextScaling = mediaQueryData
      .copyWith(textScaler: TextScaler.linear(mediaQueryData.textScaler.textScaleFactor));
    return MediaQuery(data: mediaQueryDataWithLinearTextScaling, child: realWidgetTree);
  }),
);
```

此技巧使用了已棄用的 `textScaleFactor` API，一旦該 API 從 Flutter API 中移除後，此方法將無法再使用。

## 時程

合併於版本：3.13.0-4.0.pre<br>
正式版釋出：3.16

## 參考資料

API 文件：

* [`TextScaler`][]
* [`MediaQuery.textScalerOf`][]
* [`MediaQuery.maybeTextScalerOf`][]
* [`MediaQuery.withNoTextScaling`][]
* [`MediaQuery.withClampedTextScaling`][]

相關議題：

* [New font scaling system (Issue 116231)][]

相關 PR：

* [Replaces `textScaleFactor` with `TextScaler`][]


[Android 14 nonlinear font scaling]: {{site.android-dev}}/about/versions/14/features#non-linear-font-scaling
[`TextScaler`]: {{site.api}}/flutter/painting/TextScaler-class.html
[`MediaQuery.textScalerOf`]: {{site.api}}/flutter/widgets/MediaQuery/textScalerOf.html
[`MediaQuery.maybeTextScalerOf`]: {{site.api}}/flutter/widgets/MediaQuery/maybeTextScalerOf.html
[`MediaQuery.withNoTextScaling`]: {{site.api}}/flutter/widgets/MediaQuery/withNoTextScaling.html
[`MediaQuery.withClampedTextScaling`]: {{site.api}}/flutter/widgets/MediaQuery/withClampedTextScaling.html

[New font scaling system (Issue 116231)]: {{site.repo.flutter}}/issues/116231
[Replaces `textScaleFactor` with `TextScaler`]: {{site.repo.flutter}}/pull/128522
