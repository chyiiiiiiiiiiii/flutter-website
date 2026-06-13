---
title: 使用 sliver 實現華麗的捲動效果
description: >-
  關於如何在 Flutter 中使用 sliver
  實現彈性捲動等華麗捲動效果的相關資訊。
showToc: false
---

sliver 是可捲動區域的一部分，你可以自訂其特殊的行為。
你可以利用 sliver 來實現自訂的捲動效果，
例如彈性捲動。

如果你想參加免費、由講師帶領並使用 DartPad 的影片工作坊，
可以參考以下關於 sliver 的教學影片。

<YouTubeEmbed id="YY-_yrZdjGc" title="Building scrolling experiences in Flutter"></YouTubeEmbed>

## 資源

如需更多在 Flutter 中實現華麗捲動效果的資訊，請參考以下資源：

**[Slivers, Demystified][]**
: 一篇 Medium 免費文章，說明如何利用 sliver 類別
  實作自訂捲動效果。

**[SliverAppBar][sliver-app-bar-video]**
: 一分鐘的「本週元件 (Widget-of-the-week)」影片，
  概述 `SliverAppBar` 元件 (Widget)。

  <YouTubeEmbed id="R9C5KMJKluE" title="SliverAppBar | Flutter widget of the week"></YouTubeEmbed>

**[SliverList and SliverGrid][]**
: 一分鐘的「本週元件 (Widget-of-the-week)」影片，
  概述 `SliverList` 與 `SliverGrid` 元件。

  <YouTubeEmbed id="ORiTTaVY6mM" title="SliverList & SliverGrid | Flutter widget of the week"></YouTubeEmbed>

**[Slivers explained - Making dynamic layouts][]**
: [The Boring Show][] 的一集 50 分鐘節目，
  由 Flutter 技術負責人 Ian Hickson 與 Filip Hracek
  一同討論 sliver 的強大功能。

  <YouTubeEmbed id="Mz3kHQxBjGg" title="Slivers explained - Making dynamic layouts"></YouTubeEmbed>

## API 文件

想進一步了解可用的 sliver API，請參閱以下相關 API 文件：

* [`CustomScrollView`][]
* [`SliverAppBar`][]
* [`SliverGrid`][]
* [`SliverList`][]

[`CustomScrollView`]: {{site.api}}/flutter/widgets/CustomScrollView-class.html
[sliver-app-bar-video]: {{site.yt.watch}}?v=R9C5KMJKluE
[`SliverAppBar`]: {{site.api}}/flutter/material/SliverAppBar-class.html
[`SliverGrid`]: {{site.api}}/flutter/widgets/SliverGrid-class.html
[SliverList and SliverGrid]: {{site.yt.watch}}?v=ORiTTaVY6mM
[`SliverList`]: {{site.api}}/flutter/widgets/SliverList-class.html
[Slivers, DeMystified]: {{site.flutter-blog}}/slivers-demystified-6ff68ab0296f
[Slivers explained - Making dynamic layouts]: {{site.yt.watch}}?v=Mz3kHQxBjGg
[The Boring Show]: {{site.yt.playlist}}PLOU2XLYxmsIK0r_D-zWcmJ1plIcDNnRkK
