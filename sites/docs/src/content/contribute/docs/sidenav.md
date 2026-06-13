---
title: 側邊導覽列
description: >-
  了解如何新增與設定 Dart 和 Flutter 文件網站的側邊導覽列。
sitemap: false
noindex: true
showBreadcrumbs: true
---

:::warning
此文件仍在撰寫中。
:::

側邊導覽列 (sidenav) 呈現網站的整體資訊架構，
讓開發者能依主題存取文件。

側邊導覽列的內容設定於
`/src/data/sidenav/` 目錄下的 [YAML][] 檔案中。
該目錄中的每個檔案定義一個具名側邊導覽列，
以檔名（不含副檔名）作為鍵值。
頁面透過 `sidenav` front matter 欄位選擇要顯示哪個側邊導覽列。
若未指定側邊導覽列，則使用 `default` 側邊導覽列。

[YAML]: https://yaml.org/

## 新增頁面

## 移除頁面

## 收合時隱藏頁面

## 頂層區段的圖示

頂層區段項目支援選用的 `icon` 欄位，可在區段標題左側渲染 Material Symbols 圖示。請使用圖示的識別碼（例如 `flag`、`download` 或 `build`）。此圖示僅適用於第一層項目。

圖示使用網站的 Material Symbols 字型。請從 Google 的 [Material Symbols 目錄](https://fonts.google.com/icons)選擇識別碼。

## 基礎架構
