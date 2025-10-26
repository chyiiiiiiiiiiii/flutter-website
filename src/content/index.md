---
title: Flutter 文件
shortTitle: 文件
description: >-
  開始使用 Flutter。提供元件（Widgets）、範例、更新與 API 文件，
  協助你撰寫第一個 Flutter 應用程式。
---

<div class="card-grid">
{% for card in docsCards -%}
  <a class="card filled-card outlined-card" href="{{card.url}}">
    <div class="card-header">
      <span class="card-title">{{card.name}}</span>
    </div>
    <div class="card-content">
      <p>{{card.description}}</p>
    </div>
  </a>
{% endfor -%}
</div>

**若要查看自上次版本發佈以來的網站變更，
請參閱[最新動態][].**

[What's new]: /release/whats-new

## 初次接觸 Flutter？

準備好從單一程式碼庫打造美觀、多平台的應用程式了嗎？
這段影片將帶你了解 Flutter 的基礎，並教你如何開始。

完成[設定 Flutter][]後，
建議你依序參考
[撰寫你的第一個 Flutter 應用程式][]教學
以及閱讀[Flutter 基礎][]
這些資源是經過精心設計的文件，
會引導你掌握建立 Flutter 應用程式最重要的部分。

[Write your first Flutter app]: /get-started/codelab
[Flutter fundamentals]: /get-started/fundamentals

### 文件

來自其他平台嗎？請參考針對下列開發者的 Flutter 指南：
[Android][], [SwiftUI][], [UIKit][], [React Native][]，以及
[Xamarin.Forms][] 開發者。

[建立版面][]
：學習如何在 Flutter 中建立版面配置，
  在這裡一切皆為元件（Widget）。

[理解限制條件][]
：只要你理解「限制條件向下傳遞，尺寸向上回報，父元件設定位置」，
  就能掌握 Flutter 的版面配置模型。

[為你的 Flutter 應用程式加入互動性][interactivity]
：學習如何為應用程式新增有狀態元件（Stateful Widget）。

[常見問題][]
：取得常見問題的解答。

[Android]: /get-started/flutter-for/android-devs
[Building layouts]: /ui/layout
[FAQ]: /resources/faq
[Set up Flutter]: /get-started
[interactivity]: /ui/interactivity
[SwiftUI]: /get-started/flutter-for/swiftui-devs
[UIKit]: /get-started/flutter-for/uikit-devs
[React Native]: /get-started/flutter-for/react-native-devs
[Understanding constraints]: /ui/layout/constraints
[Xamarin.Forms]: /get-started/flutter-for/xamarin-forms-devs

### 影片

{% videoWrapper 'Check out what\'s new in Flutter at Google I/O 2025!' %}
{% ytEmbed 'v6Rzo5khNE8', 'What\'s new in Flutter', true %}
{% endvideoWrapper %}
<br>

想了解更多 Google I/O 2025 的 Flutter 內容，請參閱
[如何使用 Flutter 與 Firebase AI Logic 打造 Agentic 應用程式][]
以及[Flutter 如何充分發揮各平台優勢][]。

<div class="card-grid">
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed 'xo271p-Fl_4', 'How to build agentic apps with Flutter and Firebase AI Logic', true %}
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed 'flwULzNYRac', 'How Flutter makes the most of your platforms', true %}
    </div>
  </div>
</div>

[How to build agentic apps with Flutter and Firebase AI Logic]: {{site.yt.watch}}?v=xo271p-Fl_4
[How Flutter makes the most of your platforms]: {{site.yt.watch}}?v=flwULzNYRac

想了解所有 Flutter 影片系列，請參閱我們的[影片][]頁面。

我們幾乎每週都會推出新影片！

<a class="filled-button" target="_blank" href="https://www.youtube.com/@flutterdev">前往 Flutter YouTube 頻道</a>

[videos]: /resources/videos
