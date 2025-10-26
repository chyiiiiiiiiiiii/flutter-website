---
title: Flutter 元件索引 (widget index)
description: Flutter 元件 (Widgets) 的字母排序清單。
shortTitle: 元件 (Widgets)
showBreadcrumbs: false
---

{% assign sorted = catalog.widgets | sort:'name' -%}

這是一份以字母順序排列的 Flutter 內建元件 (Widgets) 清單。
你也可以[依類別瀏覽元件][catalog]。

你也可以前往 [Flutter YouTube 頻道]({{site.social.youtube}})，觀看我們的「Widget of the Week」影片系列。每集短片都會介紹不同的 Flutter 元件 (Widget)。更多影片系列，請參閱我們的[影片](/resources/videos)頁面。

{% ytEmbed 'b_sQ9bMltGU', 'Introducing the Flutter Widget of the Week' %}

[Widget of the Week 播放清單]({{site.yt.playlist}}PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)

<div class="card-grid">
{% for comp in sorted -%}
  <a class="card outlined-card" href="{{comp.link}}">
    <div class="card-image-holder">
      {% if comp.vector -%}
        {{comp.vector}}
      {% elsif comp.image -%}
        <img alt="Rendered image or visualization of the {{comp.name}} widget." src="{{comp.image.src}}">
      {% else -%}
        <img alt="Flutter logo for widget missing visualization image." src="/assets/images/docs/catalog-widget-placeholder.png" aria-hidden="true">
      {% endif -%}
    </div>
    <div class="card-header">
      <span class="card-title">{{comp.name}}</span>
    </div>
    <div class="card-content">
      <p class="card-text">{{ comp.description | truncatewords: 25 }}</p>
    </div>
  </a>
{% endfor %}
</div>

[catalog]: /ui/widgets
