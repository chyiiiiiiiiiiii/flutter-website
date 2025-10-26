---
title: Flutter 的 Cupertino 設計
description: 了解 Flutter 的 Cupertino 設計。
---

Flutter 的 Cupertino 函式庫是一組
實作 Apple iOS 設計語言的元件 (Widgets)，
可用於 Flutter 應用程式。這些元件 (Widgets) 呈現出
與 iOS 類似的外觀與操作體驗，包括圓角、漸層
以及極簡設計風格。
它們同時也包含 iOS 的互動與動畫 (Animation)。

以下這段 15 分鐘的影片，將為你高層次
介紹 Cupertino 套件：

{% ytEmbed '3PdUaidHc-E', 'Flutter\'s Cupertino Package' %}

若想觀看部分 Cupertino 元件 (Widgets) 的實際應用，以下
Widget of the Week 系列影片介紹了其中幾個元件 (Widgets)。

<div class="card-grid">
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed 'D0xwcz2IqAY', 'CupertinoRadio (Widget of the Week)' %}
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed '5H-WvH5O29I', 'CupertinoSheetRoute (Widget of the Week)' %}
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed 'esnBf6V4C34', 'CupertinoSlidingSegmentedControl (Widget of the Week)' %}
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed 'ua54JU7k1Us', 'CupertinoCheckbox (Widget of the Week)' %}
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      {% ytEmbed '24tg_N4sdMQ', 'CupertinoSwitch (Widget of the Week)' %}
    </div>
  </div>
</div>

## 更多資訊 {:.no_toc}

想進一步了解如何在 Flutter 中使用 Cupertino
套件，請參考以下資源：

* doc.flutter.dev 上（以視覺為主的）[Cupertino 元件 (Widgets) 目錄][Cupertino widget catalog]
* API 文件中的 [Cupertino 函式庫][Cupertino library] 頁面
* flutter/flutter
  原始碼庫中的 [Cupertino API 範例][Cupertino API examples]。（[操作說明][Instructions]）例如，
  若要執行 `CupertinoSwitch`：

```console
cd path/to/flutter
cd examples/api
flutter run lib/cupertino/switch/cupertino_switch.0.dart
```

[Cupertino API examples]: {{site.github}}/flutter/flutter/tree/main/examples/api/lib/cupertino
[Cupertino library]: {{site.api}}/flutter/cupertino/cupertino-library.html
[Cupertino widget catalog]: /ui/widgets/cupertino
[Instructions]: {{site.github}}/flutter/flutter/tree/main/examples/api#api-example-code

