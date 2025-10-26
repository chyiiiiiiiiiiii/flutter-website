---
title: 使用全新 TabBar.tabAlignment 屬性自訂分頁對齊方式
description: 介紹 TabBar.tabAlignment 屬性。
---

{% render docs/breaking-changes.md %}

## 摘要

使用 `TabBar.tabAlignment` 來自訂 `TabBar` 中分頁（tabs）的對齊方式。

## 背景說明

`TabBar.tabAlignment` 屬性用於設定 Material 3 `TabBar` 中分頁的擺放位置。
`TabAlignment` 列舉（enum）包含以下幾個值：

* `TabAlignment.start`：將分頁對齊至可捲動 `TabBar` 的起始位置。
* `TabAlignment.startOffset`：將分頁對齊至可捲動 `TabBar` 的起始位置，並有 `52.0` 像素的偏移。
* `TabAlignment.center`：將分頁對齊至 `TabBar` 的中央。
* `TabAlignment.fill`：將分頁對齊至起始位置，並將分頁拉伸以填滿固定寬度的 `TabBar`。

可捲動的 `TabBar` 支援以下對齊方式：

* `TabAlignment.start`
* `TabAlignment.startOffset`
* `TabAlignment.center`

固定寬度的 `TabBar` 支援以下對齊方式：

* `TabAlignment.fill`
* `TabAlignment.center`

當你將 `ThemeData.useMaterial3` 設為 `true` 時，
可捲動的 `TabBar` 預設會以 `TabAlignment.startOffset` 方式對齊分頁。
若要變更此對齊方式，請設定
`TabBar.tabAlignment` 屬性以進行元件層級的自訂。
或者，設定 `TabBarThemeData.tabAlignment` 屬性以進行應用程式層級的自訂。

## 變更說明

當你將 `TabBar.isScrollable` 和 `ThemeData.useMaterial3` 設為 `true` 時，
可捲動的 `TabBar` 中的分頁預設會以 `TabAlignment.startOffset` 方式對齊。
這會將分頁對齊至可捲動 `TabBar` 的起始位置，並有 `52.0` 像素的偏移。
這項行為與先前不同。
過去當分頁數量超過可顯示寬度時，分頁會對齊至可捲動 `TabBar` 的起始位置。

## 遷移指南

Material 3 可捲動 `TabBar` 會以 `TabAlignment.startOffset` 作為
預設的分頁對齊方式。
這會將分頁對齊至可捲動 `TabBar` 的起始位置，並有 `52.0` 像素的偏移。

若要將分頁對齊至可捲動 `TabBar` 的起始位置，請將 `TabBar.tabAlignment` 設為 `TabAlignment.start`。
這項變更同時也會移除 `52.0` 像素的偏移。
以下程式碼片段展示如何使用 `TabBar.tabAlignment`
將分頁對齊至可捲動 `TabBar` 的起始位置：

遷移前的程式碼：

```dart
TabBar(
  isScrollable: true,
  tabs: List<Tab>.generate(
    count,
    (int index) => Tab(text: 'Tab $index'),
  ).toList(),
);
```

遷移後的程式碼：

```dart
TabBar(
  tabAlignment: TabAlignment.start,
  isScrollable: true,
  tabs: List<Tab>.generate(
    count,
    (int index) => Tab(text: 'Tab $index'),
  ).toList(),
);
```

## 時程

合併於版本：3.13.0-17.0.pre<br>  
正式版釋出：3.16

## 參考資料

API 文件：

* [`TabBar`][`TabBar`]
* [`TabBar.tabAlignment`][`TabBar.tabAlignment`]
* [`TabAlignment`][`TabAlignment`]

相關 PR：

* [Introduce `TabBar.tabAlignment`][Introduce `TabBar.tabAlignment`]
* [Fix Material 3 Scrollable `TabBar`][Fix Material 3 Scrollable `TabBar`]

[`TabBar`]: {{site.api}}/flutter/material/TabBar-class.html
[`TabBar.tabAlignment`]: {{site.api}}/flutter/material/TabBar/tabAlignment.html
[`TabAlignment`]: {{site.api}}/flutter/material/TabAlignment.html

[Introduce `TabBar.tabAlignment`]: {{site.repo.flutter}}/pull/125036
[Fix Material 3 Scrollable `TabBar`]: {{site.repo.flutter}}/pull/131409
