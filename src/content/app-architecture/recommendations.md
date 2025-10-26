---
title: 架構建議與資源
shortTitle: 架構建議
description: >
  建立可擴展 Flutter 應用程式的建議。
prev:
  title: 架構案例研究
  path: /app-architecture/case-study
next:
  title: 設計模式
  path: /app-architecture/design-patterns
---

本頁介紹架構最佳實踐、其重要性，以及我們是否建議你在 Flutter 應用程式中採用這些做法。
你應該將這些建議視為「建議」而非絕對規則，並根據你應用程式的獨特需求進行調整。

本頁的最佳實踐會標註優先順序，這代表 Flutter 團隊推薦的強烈程度。

* **強烈建議：** 如果你正在開始建立新應用程式，應該始終實作這項建議。除非這會與你現有的做法根本衝突，否則你也應該強烈考慮重構現有應用程式以導入此實踐。
* **建議：** 這項實踐很可能會提升你的應用程式品質。
* **有條件：** 在特定情境下，這項實踐可以改善你的應用程式。
<br /><br />

{% for section in architectureRecommendations %}
<h2>{{section.category}}</h2>
<p>{{section.description}}</p>
<table class="table table-striped" style="border-bottom:1px #DADCE0 solid">
    <tr class="tr-main-head">
      <th style="width: 30%">建議</th>
      <th style="width: 70%">說明</th>
    </tr>
    {% for rec in section.recommendations %}
    <tr>
      <td>
        <p>{{rec.recommendation}}</p>
        {% if rec.confidence == "strong" %}
            <div class="rrec-pill success">強烈建議</div>
        {% elsif rec.confidence == "recommend" %}
            <div class="rrec-pill info">建議</div>
        {% else %}
            <div class="rrec-pill">有條件</div>
        {% endif %}
      </td>
      <td>
        {{rec.description}}
        <br />
        {{rec.confidence-description}}</td>
    </tr>    {% endfor %}
</table>
<br />
{% endfor %}

## 推薦資源

* 程式碼與範本
  * [Compass app source code][Compass app source code] -
    一個功能完善且穩健的 Flutter 應用程式原始碼，實作了許多本頁建議。
  * [very_good_cli][very_good_cli] -
    由 Flutter 專家 Very Good Ventures 製作的 Flutter 應用程式範本。
    此範本會產生類似的應用程式架構。
* 文件
  * [Very Good Engineering architecture documentation][Very Good Engineering architecture documentation] -
    Very Good Engineering 是 VGV 推出的文件網站，包含技術文章、展示與開源專案。
    其中也有關於 Flutter 應用程式架構的相關文件。
  * [State Management with ChangeNotifier walkthrough][State Management with ChangeNotifier walkthrough] -
    介紹如何使用 Flutter SDK 內建原始元件進行狀態管理的入門教學。
* 工具
  * [Flutter developer tools][Flutter developer tools] -
    DevTools 是一套針對 Dart 與 Flutter 的效能與除錯工具。
  * [flutter_lints][flutter_lints] -
    一個收錄 Flutter 團隊推薦檢查規則（lints）的套件。
    使用此套件可促進團隊間良好的程式撰寫習慣。


[Separation-of-concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns
[architecture case study]: /app-architecture/guide
[our ChangeNotifier recommendation]: /get-started/fwe/state-management
[other popular options]: https://docs.flutter.dev/data-and-backend/state-mgmt/options
[freezed]: https://pub.dev/packages/freezed
[built_value]: https://pub.dev/packages/built_value
[Flutter Navigator API]: https://docs.flutter.dev/ui/navigation
[pub.dev]: https://pub.dev
[Compass app source code]: https://github.com/flutter/samples/tree/main/compass_app
[very_good_cli]: https://cli.vgv.dev/
[Very Good Engineering architecture documentation]: https://engineering.verygood.ventures/architecture/
[State Management with ChangeNotifier walkthrough]: /get-started/fwe/state-management
[Flutter developer tools]: /tools/devtools
[flutter_lints]: https://pub.dev/packages/flutter_lints

## 意見回饋

由於本網站此區塊仍在持續演進中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="recommendations"
