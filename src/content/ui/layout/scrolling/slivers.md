---
title: 使用 slivers 實現炫酷捲動效果
description: >-
  在 Flutter 中，如何利用 slivers 實現炫酷的捲動效果，例如彈性捲動，及相關資源。
showToc: false
---

Sliver 是可捲動區域中的一部分，你可以自訂其特殊行為。
你可以利用 slivers 來實現自訂的捲動效果，例如彈性捲動。

如果你想參加免費的講師帶領影片工作坊（使用 DartPad），
可以參考以下關於 slivers 的教學影片。

{% ytEmbed 'YY-_yrZdjGc', 'Building scrolling experiences in Flutter' %}

## 資源

想了解更多在 Flutter 中實現炫酷捲動效果的方法，請參考以下資源：

**[Slivers, Demystified][Slivers, Demystified]**
: 一篇免費的 Medium 文章，說明如何利用 sliver 類別來實現自訂捲動。

**[SliverAppBar][sliver-app-bar-video]**
: 一分鐘的 Widget-of-the-week
  影片，簡要介紹 `SliverAppBar` 元件 (Widget)。

  {% ytEmbed 'R9C5KMJKluE', 'SliverAppBar | Flutter widget of the week' %}

**[SliverList and SliverGrid][SliverList and SliverGrid]**
: 一分鐘的 Widget-of-the-week
  影片，簡要介紹 `SliverList` 與 `SliverGrid` 元件 (Widget)。

  {% ytEmbed 'ORiTTaVY6mM', 'SliverList & SliverGrid | Flutter widget of the week' %}

**[Slivers explained - Making dynamic layouts][Slivers explained - Making dynamic layouts]**
: [The Boring Show][The Boring Show] 的一集長達 50 分鐘的節目，
  由 Flutter 技術負責人 Ian Hickson 和 Filip Hracek
  一同討論 slivers 的強大功能。

  {% ytEmbed 'Mz3kHQxBjGg', 'Slivers explained - Making dynamic layouts' %}

## API 文件

想進一步了解可用的 sliver API，請參考以下相關 API 文件：

* [`CustomScrollView`][`CustomScrollView`]
* [`SliverAppBar`][`SliverAppBar`]
* [`SliverGrid`][`SliverGrid`]
* [`SliverList`][`SliverList`]

[`CustomScrollView`]: {{site.api}}/flutter/widgets/CustomScrollView-class.html
[sliver-app-bar-video]: {{site.yt.watch}}?v=R9C5KMJKluE
[`SliverAppBar`]: {{site.api}}/flutter/material/SliverAppBar-class.html
[`SliverGrid`]: {{site.api}}/flutter/widgets/SliverGrid-class.html
[SliverList and SliverGrid]: {{site.yt.watch}}?v=ORiTTaVY6mM
[`SliverList`]: {{site.api}}/flutter/widgets/SliverList-class.html
[Slivers, DeMystified]: {{site.flutter-medium}}/slivers-demystified-6ff68ab0296f
[Slivers explained - Making dynamic layouts]: {{site.yt.watch}}?v=Mz3kHQxBjGg
[The Boring Show]: {{site.yt.playlist}}PLOU2XLYxmsIK0r_D-zWcmJ1plIcDNnRkK
