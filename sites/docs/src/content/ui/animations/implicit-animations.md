---
title: 隱式動畫
description: 進一步了解如何在 Flutter 中使用隱式動畫的相關資訊。
---

透過 Flutter 的[動畫函式庫][animation library]，
你可以為 UI 中的元件 (Widget) 增添動態效果與視覺特效。
此函式庫的一部分包含了一系列
能自動管理動畫的元件。
這些元件統稱為 _隱式動畫_（implicit animations），
或稱 _隱式動畫元件_（implicitly animated widgets），
名稱源自它們所實作的
[`ImplicitlyAnimatedWidget`][] 類別。
以下資源將提供多種方式，協助你學習
如何在 Flutter 中使用隱式動畫。

[animation library]: {{site.api}}/flutter/animation/animation-library.html

## 文件 {:#documentation}

[Flutter 動畫 codelab][Animations in Flutter codelab]
: 學習隱式與顯式動畫，
  並實際動手為完整的 Flutter 應用程式
  加入隱式動畫。

[`AnimatedContainer` 範例][`AnimatedContainer` sample]
: 一個逐步說明如何使用
  [`AnimatedContainer`][] 隱式動畫元件的食譜。

[`ImplicitlyAnimatedWidget`][] API 文件
: 所有隱式動畫元件皆繼承自 `ImplicitlyAnimatedWidget` 類別。

[Animations in Flutter codelab]: {{site.codelabs}}/advanced-flutter-animations
[`AnimatedContainer` sample]: /cookbook/animation/animated-container
[`AnimatedContainer`]: {{site.api}}/flutter/widgets/AnimatedContainer-class.html
[`ImplicitlyAnimatedWidget`]: {{site.api}}/flutter/widgets/ImplicitlyAnimatedWidget-class.html

## Flutter in Focus 影片 {:#flutter-in-focus-videos}

Flutter in Focus 影片系列提供 5-10 分鐘的教學，
以實際程式碼示範每位 Flutter 開發者都必須掌握的技巧。
以下影片涵蓋與隱式動畫相關的主題。

<YouTubeEmbed id="IVTjpW3W33s" title="Flutter implicit animation basics"></YouTubeEmbed>

<YouTubeEmbed id="6KiPEqzJIKQ" title="Create custom implicit animations with TweenAnimationBuilder"></YouTubeEmbed>

## The Boring Show {:#the-boring-show}

觀看 The Boring Show，跟著 Google 工程師從零開始用 Flutter 開發應用程式。
以下集數介紹如何在新聞聚合應用程式中
使用隱式動畫。

<YouTubeEmbed id="8ehlWchLVlQ" title="Adding implicit animations to a news application"></YouTubeEmbed>

## Widget of the Week 影片 {:#widget-of-the-week-videos}

每週推出一支短片，介紹一個元件的重要功能。
約 60 秒內，你將看到該元件的實際程式碼與運作展示。
以下 Widget of the Week 影片涵蓋
隱式動畫元件：

<div class="card-grid wide">
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <YouTubeEmbed id="QZAvjqOqiLY" title="AnimatedOpacity - Flutter widget of the week"></YouTubeEmbed>
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <YouTubeEmbed id="PY2m0fhGNz4" title="AnimatedPadding - Flutter widget of the week"></YouTubeEmbed>
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <YouTubeEmbed id="hC3s2YdtWt8" title="AnimatedPositioned - Flutter widget of the week"></YouTubeEmbed>
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <YouTubeEmbed id="2W7POjFb88g" title="AnimatedSwitcher - Flutter widget of the week"></YouTubeEmbed>
    </div>
  </div>
</div>
