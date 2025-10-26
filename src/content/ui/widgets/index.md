---
title: 元件目錄
description: Flutter 豐富元件集的部分目錄。
shortTitle: 元件
showToc: false
---

透過 Flutter 所提供的視覺、結構、平台及互動元件 (Widgets) 集合，讓你能更快速打造美麗的應用程式。除了依類別瀏覽元件外，你也可以在 [widget index][widget index] 中查看所有元件。

## 設計系統

Flutter 隨 SDK 一同提供了兩套設計系統。

<div class="card-grid">
{% assign categories = catalog.index | sort: 'name' -%}
{% for section in categories %}
  {%- if section.name == "Cupertino" or section.name == "Material components" -%}
    <a class="card outlined-card" href="{{page.url}}{{section.id}}">
      <div class="card-header">
        <span class="card-title">{{section.name}}</span>
      </div>
      <div class="card-content">
        <p>{{section.description}}</p>
      </div>
    </a>
  {% endif -%}
{% endfor %}
</div>

你可以在 Dart 和 Flutter 的套件倉庫 [pub.dev]({{site.pub}}) 上，找到更多由 Flutter 社群打造的設計系統，例如 Windows 風格的 [fluent_ui]({{site.pub-pkg}}/fluent_ui)、macOS 風格的 [macos_ui]({{site.pub-pkg}}/macos_ui)，以及 Ubuntu 風格的 [yaru]({{site.pub-pkg}}/yaru) 元件。

## 基礎元件

基礎元件 (Base widgets) 支援多種常見的渲染選項，例如輸入、版面配置及文字。

<div class="card-grid">
{% assign categories = catalog.index | sort: 'name' -%}
{% for section in categories %}
  {%- if section.name != "Cupertino" and section.name != "Material components" and section.name != "Material 2 components" -%}
    <a class="card outlined-card" href="{{page.url}}{{section.id}}">
      <div class="card-header">
        <span class="card-title">{{section.name}}</span>
      </div>
      <div class="card-content">
        <p>{{section.description}}</p>
      </div>
    </a>
  {% endif -%}
{% endfor %}
</div>

## 本週元件

超過 100 部短篇、每部約 1 分鐘的說明影片，協助你快速上手 Flutter 元件 (Widgets)。

<div class="card-grid wide">
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed 'D0xwcz2IqAY', 'CupertinoRadio - Flutter widget of the week', true %}
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed '5H-WvH5O29I', 'CupertinoSheetRoute - Flutter widget of the week', true %}
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed 'esnBf6V4C34', 'CupertinoSlidingSegmentedControl - Flutter widget of the week', true %}
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed 'ua54JU7k1Us', 'CupertinoCheckbox - Flutter widget of the week', true %}
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed '24tg_N4sdMQ', 'CupertinoSwitch - Flutter widget of the week', true %}
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed 'GQ8ajYVF0bo', 'CarouselView - Flutter widget of the week', true %}
    </div>
  </div>
</div>

<a class="filled-button" target="_blank" href="{{site.yt.playlist}}PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">觀看更多本週元件影片</a>

[widget index]: /reference/widgets
