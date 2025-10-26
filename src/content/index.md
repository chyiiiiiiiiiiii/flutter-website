---
title: Flutter 文件
shortTitle: 文件
description: >-
  開始使用 Flutter。元件 (Widgets)、範例、更新，以及 API 文件，
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

**若要查看自上次發佈以來的網站變更，
請參閱[最新消息][What's new]。**

[What's new]: /release/whats-new

## 初次接觸 Flutter？

準備好從單一程式碼庫打造美觀的多平台應用程式了嗎？
這支影片將帶你了解 Flutter 的基礎，並教你如何開始。

當你完成[設定 Flutter][Set up Flutter]後，
建議你接著參考
[撰寫你的第一個 Flutter 應用程式][Write your first Flutter app] codelab，
並閱讀 [Flutter 基礎知識][Flutter fundamentals]。
這些資源是有方向性的文件，
將引導你掌握開發 Flutter 應用程式最重要的部分。

[Write your first Flutter app]: /get-started/codelab
[Flutter fundamentals]: /get-started/fundamentals

### 文件

來自其他平台嗎？請參考下列針對不同開發者的 Flutter 文件：
[Android][Android]、[SwiftUI][SwiftUI]、[UIKit][UIKit]、[React Native][React Native]，以及
[Xamarin.Forms][Xamarin.Forms] 開發者。

[建立版面配置][Building layouts]
: 學習如何在 Flutter 中建立版面配置，
  在這裡一切皆為元件 (Widgets)。

[理解限制條件][Understanding constraints]
: 當你理解「限制條件向下傳遞，尺寸向上回傳，父元件決定位置」，
  你就能掌握 Flutter 的版面配置模型。

[為 Flutter 應用程式加入互動性][interactivity]
: 學習如何將有狀態元件 (stateful widget) 加入你的應用程式。

[常見問答集][FAQ]
: 獲取常見問題的解答。

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

{% videoWrapper '來看看 Flutter 在 Google I/O 2025 的最新動態！' %}
{% ytEmbed 'v6Rzo5khNE8', 'Flutter 最新消息', true %}
{% endvideoWrapper %}
<br>

想了解更多 Google I/O 2025 的 Flutter 內容，請參考
[如何使用 Flutter 與 Firebase AI Logic 打造 Agentic 應用程式][How to build agentic apps with Flutter and Firebase AI Logic]
以及 [Flutter 如何充分發揮各平台優勢][How Flutter makes the most of your platforms]。

<div class="card-grid">
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed 'xo271p-Fl_4', '如何使用 Flutter 與 Firebase AI Logic 打造 Agentic 應用程式', true %}
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed 'flwULzNYRac', 'Flutter 如何充分發揮各平台優勢', true %}
    </div>
  </div>
</div>

[How to build agentic apps with Flutter and Firebase AI Logic]: {{site.yt.watch}}?v=xo271p-Fl_4
[How Flutter makes the most of your platforms]: {{site.yt.watch}}?v=flwULzNYRac

想了解所有 Flutter 影片系列，請參閱我們的 [影片][videos] 頁面。

我們幾乎每週都會推出新影片！

<a class="filled-button" target="_blank" href="https://www.youtube.com/@flutterdev">立即前往 Flutter YouTube 頻道</a>

[videos]: /resources/videos
