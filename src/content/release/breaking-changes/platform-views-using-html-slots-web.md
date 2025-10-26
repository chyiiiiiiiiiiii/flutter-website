---
title: 在網頁中使用 HTML slots 來渲染平台視圖
description: >
  由於某些 DOM 操作方式，Flutter Web 中的 iframe 以前會重新載入。
  Flutter Web 應用程式現在改變了渲染平台視圖的方式，
  使其更為穩定（防止 iframe 重新載入，以及解決 video 標籤或表單可能遺失狀態的問題）。
---

{% render docs/breaking-changes.md %}

## 摘要

Flutter 現在會將所有網頁平台視圖（platform views）渲染在 DOM 的一致位置，
作為 `flt-glass-pane` 的直接子元素（不論使用哪種渲染後端：
`html` 或 `canvaskit`）。平台視圖隨後會透過標準 HTML 功能，
以 _「slot」_ 方式插入 App DOM 的正確位置。

在這項變更之前，Flutter Web 會變更平台視圖渲染內容的樣式，
以將其定位／調整至可用空間。**現在已不再如此。**
使用者現在可以自行決定如何利用框架分配給平台視圖的空間。

## 背景

Flutter 框架經常調整其渲染樹，以最佳化每一幀最終執行的繪製操作。
在網頁端，這些渲染樹的變動通常會導致 DOM 操作。

Flutter Web 以前會將其平台視圖（[`HtmlElementView` 元件 (Widgets)][`HtmlElementView` widgets]）
直接渲染到 DOM 中對應的位置。

使用某些 DOM 元素作為特定 DOM 操作的「目標」會導致這些元素遺失其內部狀態。
實際上，這表示 `iframe` 標籤會重新載入、`video` 播放器可能會重新啟動，
或可編輯的表單可能會遺失編輯內容。

Flutter 現在會在單一、全應用的 [shadow root][shadow root] 內，
使用 [slot 元素][slot elements] 來渲染平台視圖。Slot 元素可以在 Shadow DOM 中新增／移除／移動，
而不會影響底層的 slotted 內容（這些內容會渲染在固定位置）。

這項變更的目的包括：

* 穩定 Flutter Web 中平台視圖的行為。
* 統一兩種渲染後端（`html` 和 `canvaskit`）在網頁端渲染平台視圖的方式。
* 在 DOM 中提供可預測的位置，讓開發者能可靠地使用 CSS 為平台視圖設計樣式，
  並能使用其他標準 DOM API，例如 `querySelector` 和 `getElementById`。

## 變更說明

Flutter Web 應用程式現在會被渲染在一個共同的 [shadow root][shadow root] 之內，
其中 [slot 元素][slot elements] 代表平台視圖。每個平台視圖的實際內容
會作為**該 shadow root 的兄弟元素**來渲染。

### 變更前

```html
...

<flt-glass-pane>
  ...
  <div id="platform-view">Contents</div> <!-- canvaskit -->
  <!-- OR -->
  <flt-platform-view>
    #shadow-root
    | <div id="platform-view">Contents</div> <!-- html -->
  </flt-platform-view>
  ...
</flt-glass-pane>

...
```

### 調整後

```html
...

<flt-glass-pane>
  #shadow-root
  | ...
  | <flt-platform-view-slot>
  |   <slot name="platform-view-1" />
  | </flt-platform-view-slot>
  | ...
  <flt-platform-view slot="platform-view-1">
    <div id="platform-view">Contents</div>
  </flt-platform-view>
  ...
</flt-glass-pane>

...
```

在此變更之後，當框架需要移動 DOM 節點時，會針對`flt-platform-view-slot`進行操作，而`flt-platform-view-slot`僅包含一個`slot`元素。該 slot 會「投影」(project)在 shadow root 外部由`flt-platform-view`元素所定義的內容。`flt-platform-view`元素將不再成為框架進行 DOM 操作的目標，因此可避免重新載入的問題。

從應用程式的角度來看，這項變更是透明的。**然而**，由於某些測試會對 Flutter 網頁應用程式的內部 DOM 結構做出假設，導致測試失效，因此這被視為_破壞性變更_（breaking change）。

## 遷移指南

### 程式碼

引擎可能會在主控台輸出類似以下的警告訊息：

```bash
Height of Platform View type: [$viewType] may not be set. Defaulting to `height: 100%`.
Set `style.height` to any appropriate value to stop this message.
```

或：

```bash
Width of Platform View type: [$viewType] may not be set. Defaulting to `width: 100%`.
Set `style.width` to any appropriate value to stop this message.
```

過去，[`PlatformViewFactory` functions][`PlatformViewFactory` functions] 所回傳的內容會由框架自動調整大小與定位。現在，Flutter 會針對 `<flt-platform-view-slot>`（即內容投影插槽的父元素）進行尺寸與位置的設定。

為了消除上述警告，平台視圖（platform views）需要將其根元素的 `style.width` 與 `style.height` 設定為任何合適的（非 null）值。

例如，若要讓根 `html.Element` 填滿框架所分配的所有可用空間，可以將其 `style.width` 與 `style.height` 屬性設為 `'100%'`：

```dart
ui.platformViewRegistry.registerViewFactory(viewType, (int viewId) {
  final html.Element htmlElement = html.DivElement()
    // ..other props
    ..style.width = '100%'
    ..style.height = '100%';
  // ...
  return htmlElement;
});
```

如果你使用其他技術來排版 platform view（例如 `inset: 0`），那麼將 `width` 和 `height` 設為 `auto` 就足以消除該警告。

請閱讀更多關於 [`CSS width`][`CSS width`] 和 [`CSS height`][`CSS height`] 的資訊。

### 測試

在這項變更之後，使用者的測試程式碼**不需要**深入檢查 App 的 shadow root 內容。所有 platform view 的內容都會被作為 `flt-glass-pane` 的直接子元素，並包裹在一個 `flt-platform-view` 元素中。

請避免檢查 `flt-glass-pane` 的 shadow root，這被視為**「私有實作細節」**，其標記（markup）可能隨時變動，恕不另行通知。

（請參考下方「相關 PR」以取得上述「遷移」的範例。）

## 時程

導入版本：2.3.0-16.0.pre<br>  
穩定版釋出：2.5

## 參考資料

設計文件：

* [Using slot to embed web Platform Views][design doc]

相關議題：

* [Issue #80524][issue-80524]

相關 PR：

* [flutter/engine#25747][pull-25747]：引入此功能。
* [flutter/flutter#82926][pull-82926]：調整 `flutter` 測試。
* [flutter/plugins#3964][pull-3964]：調整 `plugins` 程式碼。
* [flutter/packages#364][pull-364]：調整 `packages` 程式碼。

[`CSS height`]: https://developer.mozilla.org/en-US/docs/Web/CSS/height
[`CSS width`]: https://developer.mozilla.org/en-US/docs/Web/CSS/width
[`HtmlElementView` widgets]: {{site.api}}/flutter/widgets/HtmlElementView-class.html
[`PlatformViewFactory` functions]: {{site.repo.engine}}/blob/58459a5e342f84c755919f2ad5029b22bcddd548/lib/web_ui/lib/src/engine/platform_views/content_manager.dart#L15-L18
[design doc]: /go/web-slot-content
[issue-80524]: {{site.repo.flutter}}/issues/80524
[pull-25747]: {{site.repo.engine}}/pull/25747
[pull-364]: {{site.repo.packages}}/pull/364
[pull-3964]: {{site.github}}/flutter/plugins/pull/3964
[pull-82926]: {{site.repo.flutter}}/pull/82926
[shadow root]: https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot
[slot elements]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
