# 使用全新 TabBar.tabAlignment 屬性自訂分頁標籤（Tabs）對齊方式

> 介紹 TabBar.tabAlignment 屬性。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

使用 `TabBar.tabAlignment` 來自訂 `TabBar` 中分頁標籤（Tabs）的對齊方式。

## 背景說明

`TabBar.tabAlignment` 屬性用於設定 Material 3 `TabBar` 中分頁標籤的擺放位置。
`TabAlignment` 列舉（enum）包含以下幾個值：

* `TabAlignment.start`：將分頁標籤對齊至可捲動 `TabBar` 的起始位置。
* `TabAlignment.startOffset`：將分頁標籤對齊至可捲動 `TabBar` 的起始位置，並有 `52.0` 像素的偏移量。
* `TabAlignment.center`：將分頁標籤對齊至 `TabBar` 的中央。
* `TabAlignment.fill`：將分頁標籤對齊至起始位置，並將分頁標籤拉伸以填滿固定寬度的 `TabBar`。

可捲動的 `TabBar` 支援以下對齊方式：

* `TabAlignment.start`
* `TabAlignment.startOffset`
* `TabAlignment.center`

固定寬度的 `TabBar` 支援以下對齊方式：

* `TabAlignment.fill`
* `TabAlignment.center`

當你將 `ThemeData.useMaterial3` 設為 `true` 時，
可捲動的 `TabBar` 預設會將分頁標籤對齊為 `TabAlignment.startOffset`。
若要變更此對齊方式，請設定
`TabBar.tabAlignment` 屬性以進行元件 (Widget) 層級的自訂。
或者，設定 `TabBarThemeData.tabAlignment` 屬性以進行應用程式層級的自訂。

## 變更說明

當你將 `TabBar.isScrollable` 和 `ThemeData.useMaterial3` 設為 `true` 時，
可捲動的 `TabBar` 中的分頁標籤預設會採用 `TabAlignment.startOffset`。
這會將分頁標籤對齊至可捲動 `TabBar` 的起始位置，並有 `52.0` 像素的偏移量。
這項行為與先前不同。
過去當分頁標籤數量超過可顯示寬度時，會將分頁標籤對齊至可捲動 `TabBar` 的起始位置。

## 遷移指南

Material 3 的可捲動 `TabBar` 預設使用 `TabAlignment.startOffset` 作為
分頁標籤的對齊方式。
這會將分頁標籤對齊至可捲動 `TabBar` 的起始位置，並有 `52.0` 像素的偏移量。

若要將分頁標籤對齊至可捲動 `TabBar` 的起始位置，請將 `TabBar.tabAlignment` 設為 `TabAlignment.start`。
此變更同時會移除 `52.0` 像素的偏移量。
以下程式碼片段展示如何使用 `TabBar.tabAlignment`
將分頁標籤對齊至可捲動 `TabBar` 的起始位置：

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
穩定版釋出：3.16

## 參考資料

API 文件：

* [`TabBar`][]
* [`TabBar.tabAlignment`][]
* [`TabAlignment`][]

相關 PR：

* [Introduce `TabBar.tabAlignment`][]
* [Fix Material 3 Scrollable `TabBar`][]

[`TabBar`]: https://api.flutter.dev/flutter/material/TabBar-class.html
[`TabBar.tabAlignment`]: https://api.flutter.dev/flutter/material/TabBar/tabAlignment.html
[`TabAlignment`]: https://api.flutter.dev/flutter/material/TabAlignment.html

[Introduce `TabBar.tabAlignment`]: https://github.com/flutter/flutter/pull/125036
[Fix Material 3 Scrollable `TabBar`]: https://github.com/flutter/flutter/pull/131409

