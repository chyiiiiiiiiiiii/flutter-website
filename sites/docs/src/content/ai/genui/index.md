---
title: 適用於 Flutter 的 GenUI SDK
sidenav: ai
shortTitle: GenUI SDK
description: >-
  了解如何使用適用於 Flutter 的 GenUI SDK，為應用程式與聊天機器人打造更豐富的互動體驗。
next:
  title: GenUI SDK main components & concepts
  path: /ai/genui/components
---

## 什麼是 GenUI？ {:#what-is-genui}

適用於 Flutter 的 GenUI SDK 本質上是一個協調層 (orchestration layer)。
這套套件組合協調使用者、Flutter 元件 (Widget) 與 AI 代理之間的資訊流，
將以文字為基礎的對話轉化為豐富的互動體驗。

想像一下，您不再讓使用者面對一大段文字，
而是呈現一個圖形化 UI，例如一排帶有標籤的按鈕和一個日期選擇器。

適用於 Flutter 的 GenUI SDK 使用以 JSON 為基礎的格式，
從您現有的元件目錄組合出 UI。
當使用者與 UI 互動時，狀態變更會回傳給代理，
形成高效的雙向循環，讓代理互動成為豐富且直觀的體驗。

適用於 Flutter 的 GenUI SDK 設計成可輕鬆整合至您的 Flutter 應用程式。

## 何時使用？ {:#when-would-you-use-it}

使用適用於 Flutter 的 GenUI SDK，可在您的應用程式中加入圖形化 UI。例如：

* 不必用文字描述產品清單，
  而是用它來渲染可點擊的產品元件輪播。
* 當使用者詢問旅行規劃時，用它來產生
  包含滑桿、日期選擇器和文字欄位的完整表單。

若想進一步了解適用於 Flutter 的 GenUI SDK，
請參考 [GenUI 入門影片][Getting started with GenUI video]：

<YouTubeEmbed id="nWr6eZKM6no"
    title="Getting started with GenUI"></YouTubeEmbed>

另外，也歡迎觀看 Google I/O 2026 的 Flutter + A2UI = GenUI 影片！

<YouTubeEmbed id="tXeyaV1gVJk"
    title="Flutter + A2UI = GenUI"></YouTubeEmbed>

:::experimental
`genui` 套件目前處於 alpha 階段，內容可能會有所變動。
:::

[Getting started with GenUI video]: https://www.youtube.com/watch?v=nWr6eZKM6no
