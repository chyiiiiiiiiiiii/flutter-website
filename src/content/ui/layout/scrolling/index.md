---
title: 捲動
description: Flutter 捲動支援總覽
---

Flutter 內建了許多會自動捲動的元件 (Widgets)，同時也提供多種可自訂的元件，讓你能夠實現特定的捲動行為。

## 基本捲動

許多 Flutter 元件 (Widgets) 原生支援捲動，並且大多數情境下都能自動處理相關細節。例如，[`SingleChildScrollView`][`SingleChildScrollView`] 會在需要時自動捲動其子元件。其他實用的元件還有 [`ListView`][`ListView`] 和 [`GridView`][`GridView`]。你可以在元件目錄的 [scrolling page][scrolling page] 查看更多相關元件。

{% ytEmbed 'DbkIQSvwnZc', 'Scrollbar | Flutter widget of the week' %}

{% ytEmbed 'KJpkjHGiI5A', 'ListView | Flutter widget of the week' %}

### 無限捲動

當你的 `ListView` 或 `GridView` 中有很長的項目列表（包含 _無限_ 列表）時，你可以在項目進入可視範圍時，按需動態建立這些項目。這樣能帶來更高效的捲動體驗。想了解更多，請參考 [`ListView.builder`][`ListView.builder`] 或 [`GridView.builder`][`GridView.builder`]。

[`ListView.builder`]: {{site.api}}/flutter/widgets/ListView/ListView.builder.html
[`GridView.builder`]: {{site.api}}/flutter/widgets/GridView/GridView.builder.html

### 專用捲動元件

以下元件提供更專門的捲動行為。

關於 [`DraggableScrollableSheet`][`DraggableScrollableSheet`] 的使用教學影片：

{% ytEmbed 'Hgw819mL_78', 'DraggableScrollableSheet | Flutter widget of the week' %}

想要將可捲動區域變成輪盤式顯示，可以使用 [`ListWheelScrollView`][`ListWheelScrollView`]！

{% ytEmbed 'dUhmWAz4C7Y', 'ListWheelScrollView | Flutter widget of the week' %}

[`DraggableScrollableSheet`]: {{site.api}}/flutter/widgets/DraggableScrollableSheet-class.html
[`GridView`]: {{site.api}}/flutter/widgets/GridView-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`ListWheelScrollView`]: {{site.api}}/flutter/widgets/ListWheelScrollView-class.html
[scrolling page]: /ui/widgets/scrolling
[`SingleChildScrollView`]: {{site.api}}/flutter/widgets/SingleChildScrollView-class.html

{% comment %}
  Not yet, but coming. Two dimensional scrolling:
  TableView and TreeView.
  Video: {{site.yt.watch}}?v=UDZ0LPQq-n8
{% endcomment %}

## 進階捲動效果

你可能想要實現 _彈性捲動_（elastic scrolling，也稱為 _捲動回彈_），或是其他動態捲動效果，例如視差捲動（parallax scrolling）。又或者你想要一個具有特定行為的捲動標頭，例如縮小或消失。

這些效果都可以透過 Flutter 的 `Sliver*` 類別來實現。_sliver_ 指的是可捲動區域中的一個片段。你可以將 sliver 定義並插入到 [`CustomScrollView`][`CustomScrollView`] 中，來更細緻地控制該區域。

想進一步了解，請參考 [使用 slivers 實現進階捲動效果][Using slivers to achieve fancy scrolling] 以及 [Sliver 類別][Sliver classes]。

[`CustomScrollView`]: {{site.api}}/flutter/widgets/CustomScrollView-class.html
[Sliver classes]: /ui/widgets/layout#sliver-widgets
[Using slivers to achieve fancy scrolling]: /ui/layout/scrolling/slivers

## 巢狀捲動元件

如果你想要在一個可捲動元件內再嵌套另一個可捲動元件，卻又不想影響捲動效能，該怎麼做？
你會將 `ShrinkWrap` 屬性設為 true，還是選擇使用 sliver？

歡迎觀看「ShrinkWrap vs Slivers」教學影片：

{% ytEmbed 'LUqDNnv_dh0', 'ShrinkWrap vs Slivers | Decoding Flutter' %}
