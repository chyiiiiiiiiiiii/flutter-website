---
title: Flutter 文件
shortTitle: 文件
description: >-
  開始使用 Flutter。元件 (Widgets)、範例、更新，以及 API 文件，
  幫助你撰寫你的第一個 Flutter 應用程式。
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

**若要查看自上次發佈以來的網站變更，
請參閱[新功能介紹][What's new]。**

[What's new]: /release/whats-new

## 初次接觸 Flutter？

準備好從單一程式碼庫打造美觀的多平台應用程式了嗎？
這段影片將帶你了解 Flutter 的基本概念，並示範如何開始使用。

當你已經[設定好 Flutter][Set up Flutter]之後，
建議你依序完成
[撰寫你的第一個 Flutter 應用程式][Write your first Flutter app] codelab，
並閱讀[Flutter 基礎知識][Flutter fundamentals]。
這些資源是有指引性的文件，
會帶領你掌握建立 Flutter 應用程式最重要的部分。

[Write your first Flutter app]: /get-started/codelab
[Flutter fundamentals]: /get-started/fundamentals

### 文件

來自其他平台嗎？請參考針對以下平台的 Flutter 文件：
[Android][Android]、[SwiftUI][SwiftUI]、[UIKit][UIKit]、[React Native][React Native]，以及
[Xamarin.Forms][Xamarin.Forms] 開發者。

[建立版面配置][Building layouts]
: 學習如何在 Flutter 中建立版面配置，
  在這裡一切皆為元件 (Widget)。

[理解限制條件][Understanding constraints]
: 當你明白「限制條件向下傳遞，尺寸向上回傳，父元件設定位置」，
  你就已經掌握 Flutter 版面配置模型的精髓。

[為你的 Flutter 應用程式加入互動性][interactivity]
: 學習如何將有狀態元件加入你的應用程式。

[常見問題集][FAQ]
: 獲得常見問題的解答。

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
[如何使用 Flutter 與 Firebase AI Logic 打造 Agentic 應用程式][How to build agentic apps with Flutter and Firebase AI Logic]
以及 [Flutter 如何發揮你平台的最大效益][How Flutter makes the most of your platforms]。

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

想了解所有 Flutter 影片系列，請參閱我們的 [影片][videos] 頁面。

我們幾乎每週都會推出新影片！

<a class="filled-button" target="_blank" href="https://www.youtube.com/@flutterdev">前往 Flutter YouTube 頻道</a>

[videos]: /resources/videos
