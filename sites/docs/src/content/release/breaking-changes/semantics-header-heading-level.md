---
title: 更新 iOS 和 Android 上的語意標頭與 headingLevel 行為
description: >-
  `header` 語意屬性在 iOS 和 Android 上現在是無操作 (no-op)。
  無障礙標題行為現在改由 `headingLevel` 控制。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`header` 語意屬性在 iOS 和 Android 上現在的行為為無操作 (no-op)。
若要在這些平台上為無障礙功能宣告區段標題，
請使用 `headingLevel` 屬性並設定大於 `0` 的值。

## 背景

過去，Flutter 使用布林值的 `header` 語意屬性
來在各平台實作中表示標題：
* 在 Android 上，`header` 值為 `true` 會對應至
  `View.setHeading(true)`。
* 在 iOS 上，`header` 值為 `true` 會對應至
  `UIAccessibilityTraitHeader` 無障礙特性。

然而，`setHeading` 與 `UIAccessibilityTraitHeader`
代表的是標題（相當於區段標頭/標題），
最好以標題層級來表示。
相對地，這些平台上的「標頭 (header)」通常代表橫幅
或應用程式列（例如 `SliverAppBar` 或 `AppBar`），
造成平台 API 與 Flutter 屬性之間的混淆與不一致。

透過此變更：
* `header` 語意屬性在 iOS 和 Android 上的行為變為無操作 (no-op)。
  它仍保留在 API 中，若日後提供類似 API，可繼續使用。
* `headingLevel` 屬性已更新，設定大於 `0` 的值時，
  在 Android 上會直接對應至 `View.setHeading(true)`，
  在 iOS 上則對應至 `UIAccessibilityTraitHeader`。
  在 iOS 13+ 上，它也會對應至 `accessibilityHeadingLevel`。

## 遷移指南

若您的程式碼先前使用 `Semantics(header: true, ...)` 或
`SemanticsProperties(header: true, ...)` 來宣告標題，
請將程式碼遷移至使用 `headingLevel: 1`
（或其他大於 `0` 的整數）。

請注意，雖然將 `headingLevel` 設定為任何大於 `0` 的值
在 Android 和 iOS 上均可宣告標題，但其他平台（例如網頁）
對特定標題層級數字的處理方式有所不同。例如，
在網頁上，值 `1` 至 `6` 分別對應至
`<h1>` 至 `<h6>` HTML 元素。

遷移前的程式碼：

```dart
Semantics(
  header: true,
  child: Text('Section Title'),
)
```

遷移後的程式碼：

```dart
Semantics(
  headingLevel: 1,
  child: Text('Section Title'),
)
```

同樣地，若您使用 `SemanticsProperties`：

遷移前的程式碼：

```dart
SemanticsProperties(
  header: true,
)
```

遷移後的程式碼：

```dart
SemanticsProperties(
  headingLevel: 1,
)
```

## 時間表

落地版本：3.45.0-0.1.pre<br>
穩定版發布：待定

## 參考資料

API 文件：

* [`Semantics`][]
* [`SemanticsProperties`][]
* [`SemanticsConfiguration`][]

相關 Issue：

* [Issue 175416][]

相關 PR：

* [PR 186916][]
* [PR 175416][]

[`Semantics`]: {{site.api}}/flutter/widgets/Semantics-class.html
[`SemanticsProperties`]: {{site.api}}/flutter/semantics/SemanticsProperties-class.html
[`SemanticsConfiguration`]: {{site.api}}/flutter/semantics/SemanticsConfiguration-class.html
[Issue 175416]: {{site.repo.flutter}}/issues/175416
[PR 186916]: {{site.repo.flutter}}/pull/186916
[PR 175416]: {{site.repo.flutter}}/pull/175416
