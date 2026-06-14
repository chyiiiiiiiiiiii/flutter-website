---
title: ThemeData.useMaterial3 旗標預設為 true
description: >-
   ThemeData.useMaterial3 旗標現在預設為 true。
---

{% render "docs/breaking-changes.md" %}

## 摘要

Material 函式庫已更新，以符合最新的 Material Design 規範。
此次變更包含了全新元件 (Widget)、新元件主題，以及更新的元件視覺效果。
自本次版本起，[`ThemeData.useMaterial3`][] 預設設為 `true`。

## 背景

Flutter 的 Material 元件現已完整支援 Material 3，
且自 Flutter 3.16 起，Material 3 成為預設樣式。

Material 3 元件的外觀主要由 [`ThemeData.colorScheme`][] 和 [`ThemeData.textTheme`][] 的值所決定。
ColorScheme 讓你更容易建立深色與淺色主題，讓你的應用程式既美觀又符合無障礙需求。
若要進一步自訂 Material 3 元件的外觀，
可在你的 `ThemeData` 中加入元件主題，
例如 [`ThemeData.segmentedButtonTheme`][] 或 [`ThemeData.snackBarTheme`][]。

此外，Material 3 透過使用 easing 與 duration tokens 改善了動態效果（motion）。
這表示 Material 2 的曲線（curves）已重新命名為包含「legacy」字樣，並將在未來被棄用並移除。

你可以參考 [Material 3 gallery][]，體驗所有新元件，並與 Material 2 進行比較。

[`ThemeData.colorScheme`]: {{site.api}}/flutter/material/ThemeData/colorScheme.html
[`ThemeData.textTheme`]: {{site.api}}/flutter/material/ThemeData/textTheme.html
[`ThemeData.segmentedButtonTheme`]: {{site.api}}/flutter/material/ThemeData/segmentedButtonTheme.html
[`ThemeData.snackBarTheme`]: {{site.api}}/flutter/material/ThemeData/snackBarTheme.html

## 遷移指南

在 3.16 版本之前，這些變更是「選擇性啟用」，
可透過 `useMaterial3` 主題屬性於 `ThemeData` 上設定。
自本次版本起，`useMaterial3` 預設為 `true`。
你仍然可以在 `MaterialApp` 主題中指定 `useMaterial3: false`，以選擇不使用 Material 3 版本的 Material 函式庫。

:::note
Material 2 的支援以及設定 `useMaterial3` 屬性的功能，最終將被棄用並移除。
:::

另外，部分元件無法僅透過更新就支援 Material 3，
而是需要全新實作。
因此，當你以 Material 3 執行時，UI 可能會出現些微異常。
為了解決這個問題，請手動遷移至新元件，例如 [`NavigationBar`][]。

更多細節請參考 GitHub 上的 [Material 3 umbrella issue][]。

[`NavigationBar`]: {{site.api}}/flutter/material/NavigationBar-class.html

## 時程

合併於版本：3.13.0-4.0.pre<br>
穩定版本：3.16

## 參考資料

文件說明：

* [Material Design for Flutter][]

API 文件：

* [`ThemeData.useMaterial3`][]

相關議題：

* [Material 3 umbrella issue][]
* [Add support for M3 motion][]

相關 PR：

* [Change the default for `ThemeData.useMaterial3` to true][]
* [Updated `ThemeData.useMaterial3` API doc, default is true][]


[Material 3 gallery]: https://github.com/flutter/samples/tree/main/material_3_demo
[Material 3 umbrella issue]: {{site.repo.flutter}}/issues/91605
[Material Design for Flutter]: /ui/design/material
[`ThemeData.useMaterial3`]: {{site.api}}/flutter/material/ThemeData/useMaterial3.html
[Add support for M3 motion]: {{site.repo.flutter}}/issues/129942
[Change the default for `ThemeData.useMaterial3` to true]: {{site.repo.flutter}}/pull/129724
[Updated `ThemeData.useMaterial3` API doc, default is true]: {{site.repo.flutter}}/pull/130764
