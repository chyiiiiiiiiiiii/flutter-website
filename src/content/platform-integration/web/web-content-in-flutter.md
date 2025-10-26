---
title: 在 Flutter Web 應用程式中嵌入網頁內容
shortTitle: Flutter 中的網頁內容
description: 學習如何在網頁上載入與顯示圖片。
---

在某些情況下，Flutter Web 應用程式需要嵌入非 Flutter 所渲染的網頁內容。例如，嵌入一個 `google_maps_flutter` 視圖（使用 Google Maps JavaScript SDK），或是一個 `video_player`（使用標準的 `video` 元素）。

Flutter Web 可以在 `Widget` 的範圍內渲染任意網頁內容，而前述範例套件所使用的基礎功能，也同樣開放給所有 Flutter Web 應用程式使用。

## `HtmlElementView`

`HtmlElementView` Flutter 元件（Widget）會在版面配置中保留一個區域，用來填入任意 HTML 元素。它有兩個建構函式：

* `HtmlElementView.fromTagName`。
* `HtmlElementView` 與 `registerViewFactory`。

### `HtmlElementView.fromTagName`

[`HtmlElementView.fromTagName` 建構函式][`HtmlElementView.fromTagName` constructor] 會根據其 `tagName` 建立一個 HTML 元素，並提供 `onElementCreated` 方法，讓你在元素被注入 DOM 之前進行設定：

```dart
// Create a `video` tag, and set its `src` and some `style` properties...
HtmlElementView.fromTag('video', onElementCreated: (Object video) {
  video as web.HTMLVideoElement;
  video.src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
  video.style.width = '100%';
  video.style.height = '100%';
  // other customizations to the element...
});
```

若想進一步了解如何與 DOM API 互動，請參閱 [`HTMLVideoElement` class] 於 [`package:web`][`package:web`]。

若想進一步了解投放到 `web.HTMLVideoElement` 的影片 `Object`，請參閱 Dart 的 [JS Interoperability][JS Interoperability] 文件。

[`HtmlElementView.fromTagName` constructor]: {{site.api}}/flutter/widgets/HtmlElementView/HtmlElementView.fromTagName.html
[`HTMLVideoElement` class]: {{site.pub}}/documentation/web/latest/web/HTMLVideoElement-extension-type.html
[`package:web`]: {{site.pub-pkg}}/web

### `HtmlElementView` 與 `registerViewFactory`

如果你需要更細緻地控制所注入的 HTML 程式碼，可以使用 Flutter 用來實作 `fromTagName` 建構子的原始方法。在這種情境下，你需要為每一種要加入應用程式的 HTML 內容註冊自己的 HTML Element factory。

這種做法的程式碼會較為冗長，且每一種平台檢視類型需分兩個步驟：

1. 使用 `dart:ui_web.` 提供的 `platformViewRegistry.registerViewFactory` 註冊 HTML Element Factory  
2. 在應用程式的元件樹中，透過 `HtmlElementView('viewType')` 放置帶有指定 `viewType` 的元件

如需此方法的詳細說明，請參閱 [`HtmlElementView` widget][`HtmlElementView` widget] 文件。

[`HtmlElementView` widget]: {{site.api}}/flutter/widgets/HtmlElementView-class.html

## `package:webview_flutter`

在 Flutter 應用程式中嵌入完整 HTML 頁面是非常常見的需求，因此 Flutter 團隊提供了一個專用的插件：

* [`package:webview_flutter`][`package:webview_flutter`]

[JS Interoperability]: {{site.dart-site}}/interop/js-interop
[`package:webview_flutter`]: {{site.pub}}/packages/webview_flutter
[`package:webview_flutter_web`]: {{site.pub}}/packages/webview_flutter_web
