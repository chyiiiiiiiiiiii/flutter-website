---
title: 在 Flutter Web 應用程式中嵌入網頁內容
shortTitle: Flutter 中的網頁內容
description: 瞭解如何在網頁上載入與顯示圖片。
---

在某些情況下，Flutter Web 應用程式需要嵌入非由 Flutter 所渲染的網頁內容。例如，嵌入 `google_maps_flutter` 檢視（其使用 Google Maps JavaScript SDK），或是 `video_player`（其使用標準的 `video` 元素）。

Flutter Web 可以在 `Widget` 的範圍內渲染任意網頁內容，而前述範例套件所使用的基礎原件，所有 Flutter Web 應用程式皆可使用。

## `HtmlElementView`

`HtmlElementView` Flutter 元件 (Widget) 會在版面配置中保留一個區域，可用來填入任何 HTML 元素。它有兩個建構函式：

* `HtmlElementView.fromTagName`。
* `HtmlElementView` 與 `registerViewFactory`。

### `HtmlElementView.fromTagName`

[`HtmlElementView.fromTagName` 建構函式][`HtmlElementView.fromTagName` constructor] 會根據其 `tagName` 建立一個 HTML 元素，並提供一個 `onElementCreated` 方法，讓你在該元素被注入 DOM 之前進行設定：

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

若想進一步了解如何與 DOM API 互動，請參考 [`package:web`][] 中的 [`HTMLVideoElement` 類別]。

若想進一步了解轉型為 `web.HTMLVideoElement` 的影片 `Object`，請參考 Dart 的 [JS Interoperability][] 文件。

[`HtmlElementView.fromTagName` constructor]: {{site.api}}/flutter/widgets/HtmlElementView/HtmlElementView.fromTagName.html
[`HTMLVideoElement` class]: {{site.pub}}/documentation/web/latest/web/HTMLVideoElement-extension-type.html
[`package:web`]: {{site.pub-pkg}}/web

### `HtmlElementView` 與 `registerViewFactory`

如果你需要更細緻地控制所注入的 HTML 程式碼，可以使用 Flutter 用來實作 `fromTagName` 建構函式的基礎原件。在這種情境下，你需要為每一種要加入應用程式的 HTML 內容類型，各自註冊自己的 HTML Element factory。

這樣寫出來的程式碼會比較冗長，且每一種平台檢視類型都需分兩個步驟：

1. 使用 `dart:ui_web.` 提供的 `platformViewRegistry.registerViewFactory` 註冊 HTML Element Factory。
2. 在應用程式的元件樹中，利用 `HtmlElementView('viewType')` 放置帶有指定 `viewType` 的元件 (Widget)。

如需此方法的詳細說明，請參考 [`HtmlElementView` 元件][`HtmlElementView` widget] 文件。

[`HtmlElementView` widget]: {{site.api}}/flutter/widgets/HtmlElementView-class.html

## `package:webview_flutter`

在 Flutter 應用程式中嵌入完整 HTML 頁面是非常常見的功能，Flutter 團隊也因此提供了專用的插件：

* [`package:webview_flutter`][]

[JS Interoperability]: {{site.dart-site}}/interop/js-interop
[`package:webview_flutter`]: {{site.pub}}/packages/webview_flutter
[`package:webview_flutter_web`]: {{site.pub}}/packages/webview_flutter_web
