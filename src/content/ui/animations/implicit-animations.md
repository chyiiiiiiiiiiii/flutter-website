---
title: 隱式動畫
description: 進一步了解如何在 Flutter 中使用隱式動畫的相關資訊。
---

透過 Flutter 的 [動畫 (Animation) 函式庫][animation library]，
你可以為 UI 中的元件 (Widgets) 增添動態效果與視覺特效。
此函式庫的一部分包含了一系列
能自動管理動畫 (Animation) 的元件 (Widgets)。
這些元件統稱為 _隱式動畫_（implicit animations），
或稱 _隱式動畫元件_（implicitly animated widgets），
名稱源自它們所實作的
[`ImplicitlyAnimatedWidget`][`ImplicitlyAnimatedWidget`] 類別。
以下資源將提供多種方式，協助你學習
如何在 Flutter 中使用隱式動畫。

## 文件

[隱式動畫 codelab][Implicit animations codelab]
: 直接進入程式碼實作！
  此 codelab 透過互動式範例
  及逐步教學，帶你學會
  如何使用隱式動畫。

[`AnimatedContainer` 範例][`AnimatedContainer` sample]
: 一個逐步教學，說明如何使用
  [`AnimatedContainer`][`AnimatedContainer`] 隱式動畫元件。

[`ImplicitlyAnimatedWidget`][`ImplicitlyAnimatedWidget`] API 文件
: 所有隱式動畫元件皆繼承自 `ImplicitlyAnimatedWidget` 類別。

## Flutter in Focus 影片

Flutter in Focus 影片系列提供 5-10 分鐘的教學，
以實際程式碼示範每位 Flutter 開發者都必須熟悉的技巧。
以下影片涵蓋與隱式動畫相關的主題。

{% ytEmbed 'IVTjpW3W33s', 'Flutter 隱式動畫基礎' %}

{% ytEmbed '6KiPEqzJIKQ', '使用 TweenAnimationBuilder 建立自訂隱式動畫' %}

## The Boring Show

觀看 The Boring Show，跟著 Google 工程師從零開始用 Flutter 開發應用程式。
以下集數介紹如何在新聞聚合應用程式中
使用隱式動畫。

{% ytEmbed '8ehlWchLVlQ', '為新聞應用程式加入隱式動畫' %}

## Widget of the Week 影片

每週推出一支短片，介紹一個元件 (Widget) 的重要功能。
約 60 秒內，你將看到該元件的實際程式碼與運作展示。
以下 Widget of the Week 影片涵蓋
隱式動畫元件：

{% assign animatedWidgets = 'AnimatedOpacity, AnimatedPadding, AnimatedPositioned, AnimatedSwitcher' | split: ", " %}
{% assign animatedUrls = 'QZAvjqOqiLY, PY2m0fhGNz4, hC3s2YdtWt8, 2W7POjFb88g' | split: ", " %}

{% for widget in animatedWidgets %}
{% assign videoUrl = animatedUrls[forloop.index0] %}
{% assign videoDescription = '認識 ' | append: widget | append: ' Flutter 元件 (Widget)' %}

{% ytEmbed videoUrl, videoDescription %}

{% endfor -%}

[`AnimatedContainer` sample]: /cookbook/animation/animated-container
[`AnimatedContainer`]: {{site.api}}/flutter/widgets/AnimatedContainer-class.html
[animation library]: {{site.api}}/flutter/animation/animation-library.html
[Implicit animations codelab]: /codelabs/implicit-animations
[`ImplicitlyAnimatedWidget`]: {{site.api}}/flutter/widgets/ImplicitlyAnimatedWidget-class.html
