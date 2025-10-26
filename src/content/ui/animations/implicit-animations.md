---
title: 隱式動畫
description: 在 Flutter 中使用隱式動畫的進一步資訊。
---

透過 Flutter 的 [動畫函式庫][animation library]，
你可以為 UI 中的元件 (Widgets) 增添動態效果與視覺特效。
這個函式庫的一部分包含了一系列
能自動管理動畫的元件 (Widgets)。
這些元件統稱為 _隱式動畫_，
或稱 _隱式動畫元件 (implicitly animated widgets)_，
名稱來源於它們所實作的
[`ImplicitlyAnimatedWidget`][`ImplicitlyAnimatedWidget`] 類別。
下列資源提供多種學習 Flutter 隱式動畫的方法。

## 文件

[隱式動畫 codelab][Implicit animations codelab]
: 直接進入程式碼實作！
  這份 codelab 透過互動式範例
  及逐步教學，帶你學會
  如何使用隱式動畫。

[`AnimatedContainer` 範例][`AnimatedContainer` sample]
: 使用
  [`AnimatedContainer`][`AnimatedContainer`] 隱式動畫元件的
  步驟教學。

[`ImplicitlyAnimatedWidget`][`ImplicitlyAnimatedWidget`] API 文件
: 所有隱式動畫皆繼承自 `ImplicitlyAnimatedWidget` 類別。

## Flutter in Focus 影片

Flutter in Focus 影片系列提供 5-10 分鐘的教學，
以實際程式碼示範每位 Flutter 開發者都必須熟悉的技巧。
以下影片涵蓋與隱式動畫相關的主題。

{% ytEmbed 'IVTjpW3W33s', 'Flutter implicit animation basics' %}

{% ytEmbed '6KiPEqzJIKQ', 'Create custom implicit animations with TweenAnimationBuilder' %}

## The Boring Show

觀看 The Boring Show，跟著 Google 工程師從零開始用 Flutter 開發應用程式。
以下集數介紹如何在新聞聚合應用中
使用隱式動畫。

{% ytEmbed '8ehlWchLVlQ', 'Adding implicit animations to a news application' %}

## Widget of the Week 影片

每週推出的短動畫影片系列，介紹
單一元件 (Widget) 的重要特性。
約 60 秒內，你將看到每個元件的實際程式碼
及其運作展示。
以下 Widget of the Week 影片涵蓋
隱式動畫元件：

{% assign animatedWidgets = 'AnimatedOpacity, AnimatedPadding, AnimatedPositioned, AnimatedSwitcher' | split: ", " %}
{% assign animatedUrls = 'QZAvjqOqiLY, PY2m0fhGNz4, hC3s2YdtWt8, 2W7POjFb88g' | split: ", " %}

{% for widget in animatedWidgets %}
{% assign videoUrl = animatedUrls[forloop.index0] %}
{% assign videoDescription = 'Learn about the ' | append: widget | append: ' Flutter Widget' %}

{% ytEmbed videoUrl, videoDescription %}

{% endfor -%}

[`AnimatedContainer` sample]: /cookbook/animation/animated-container
[`AnimatedContainer`]: {{site.api}}/flutter/widgets/AnimatedContainer-class.html
[animation library]: {{site.api}}/flutter/animation/animation-library.html
[Implicit animations codelab]: /codelabs/implicit-animations
[`ImplicitlyAnimatedWidget`]: {{site.api}}/flutter/widgets/ImplicitlyAnimatedWidget-class.html
