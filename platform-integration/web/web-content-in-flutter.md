# 在 Flutter Web 應用程式中嵌入網頁內容

> 瞭解如何嵌入網頁內容、理解 DOM slot 的分層方式， 以及在 Flutter Web 應用程式中處理指標事件。



在某些情況下，Flutter Web 應用程式需要嵌入非由 Flutter 所渲染的網頁內容。例如，嵌入 `google_maps_flutter` 檢視（其使用 Google Maps JavaScript SDK），或是 `video_player`（其使用標準的 `video` 元素）。

Flutter Web 可以在 `Widget` 的範圍內渲染任意網頁內容，而前述範例套件所使用的基礎原件，所有 Flutter Web 應用程式皆可使用。

## HtmlElementView

`HtmlElementView` Flutter 元件 (Widget) 會在版面配置中保留一個區域，可用來填入任何 HTML 元素。它有兩個建構函式：

* `HtmlElementView.fromTagName`
* `HtmlElementView` 與 `registerViewFactory`

### `HtmlElementView.fromTagName`

[`HtmlElementView.fromTagName` 建構函式][`HtmlElementView.fromTagName` constructor] 會根據其 `tagName` 建立一個 HTML 元素，並提供一個 `onElementCreated` 方法，讓你在該元素被注入 DOM 之前進行設定：

```dart
// Create a `video` tag, and set its `src` and some `style` properties...
HtmlElementView.fromTagName(
  tagName: 'video',
  onElementCreated: (Object video) {
    video as web.HTMLVideoElement;
    video.src =
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
    video.style.width = '100%';
    video.style.height = '100%';
    // other customizations to the element...
  },
);
```

若想進一步了解如何與 DOM API 互動，請參考 [`package:web`][] 中的 [`HTMLVideoElement` 類別][`HTMLVideoElement` class]。

若想進一步了解轉型為 `web.HTMLVideoElement` 的影片 `Object`，請參考 Dart 的 [JS Interoperability][] 文件。

### `HtmlElementView` 與 `registerViewFactory`

如果你需要更細緻地控制所注入的 HTML 程式碼，可以使用 Flutter 用來實作 `fromTagName` 建構函式的基礎原件。在這種情境下，你需要為每一種要加入應用程式的 HTML 內容類型，各自註冊自己的 HTML 元素 factory。

這樣的程式碼每一種平台檢視類型都需分兩個步驟：

1. 使用 `dart:ui_web` 提供的 `platformViewRegistry.registerViewFactory` 註冊 HTML 元素 factory。
1. 在應用程式的元件樹中，利用 `HtmlElementView(viewType: 'viewType')` 放置帶有指定 `viewType` 的元件 (Widget)。

如需此方法的詳細說明，請參考 [`HtmlElementView` 元件][`HtmlElementView` widget] 文件。

## 修正點擊測試問題

由於 Flutter Web 執行點擊測試 (hit testing) 的方式，底層的平台檢視有時會在指標事件傳到 Flutter 之前就將其攔截。

為了避免遺失原本要給 Flutter 元件的指標事件，請使用 [`package:pointer_interceptor`][] 套件。

[`PointerInterceptor`][] 元件會建立一個空白且透明的平台檢視，並依繪製順序將它直接放在其子元件的後方。這個透明元素會在瀏覽器指標事件到達底層的 `HtmlElementView` 之前將其攔截，讓 Flutter 的手勢框架能依預期處理互動。

### 加入相依套件

將 `pointer_interceptor` 加入你的 `pubspec.yaml` 檔案：

```yaml
dependencies:
  pointer_interceptor: ^0.10.1+2
```

### 包住可互動的元件

若要讓單一可互動的元件（例如 [`FloatingActionButton`][] 或 [`ElevatedButton`][]）在 `HtmlElementView` 上方仍可點擊，請用 `PointerInterceptor` 包住該元件：

```dart
PointerInterceptor(
  child: FloatingActionButton(
    onPressed: () {
      // Handle button press
    },
    child: const Icon(Icons.add),
  ),
)
```

### 包住版面配置與覆蓋層容器

當你使用會覆蓋在平台檢視上的覆蓋層元件，例如 [`Drawer`][]、對話框或彈出選單時，請將容器元件包在 `PointerInterceptor` 中：

```dart
Scaffold(
  drawer: PointerInterceptor(
    child: Drawer(
      child: ListView(
        children: [
          ListTile(
            title: const Text('Home'),
            onTap: () {
              // Handle navigation
            },
          ),
        ],
      ),
    ),
  ),
  body: HtmlElementView.fromTagName(tagName: 'iframe'),
)
```

### 有條件地攔截事件

`intercepting` 屬性讓你可以依據布林條件，啟用或停用指標攔截：

```dart
PointerInterceptor(
  intercepting: isOverlayVisible,
  child: ElevatedButton(
    onPressed: () {
      // Handle button press
    },
    child: const Text('Submit'),
  ),
)
```

當 `intercepting` 為 `false` 時，`PointerInterceptor` 會直接渲染其 `child`，不會在 DOM 中額外建立平台檢視。

### 偵錯攔截器的範圍

`PointerInterceptor` 元件包含一個 `debug` 屬性。設定 `debug: true` 會在攔截器區域上方顯示一層可見的彩色覆蓋層，協助你確認被攔截區域的大小與位置：

```dart
PointerInterceptor(
  debug: true,
  child: ElevatedButton(
    onPressed: () {},
    child: const Text('Click me'),
  ),
)
```

## `package:webview_flutter`

在 Flutter 應用程式中嵌入完整 HTML 頁面是常見的需求。Flutter 團隊為此提供了專用的插件：

* [`package:webview_flutter`][]

[JS Interoperability]: https://dart.dev/interop/js-interop
[`Drawer`]: https://pub.dev/documentation/material_ui/latest/material_ui/Drawer-class.html
[`ElevatedButton`]: https://pub.dev/documentation/material_ui/latest/material_ui/ElevatedButton-class.html
[`FloatingActionButton`]: https://pub.dev/documentation/material_ui/latest/material_ui/FloatingActionButton-class.html
[`HtmlElementView.fromTagName` constructor]: https://api.flutter.dev/flutter/widgets/HtmlElementView/HtmlElementView.fromTagName.html
[`HtmlElementView` widget]: https://api.flutter.dev/flutter/widgets/HtmlElementView-class.html
[`HTMLVideoElement` class]: https://pub.dev/documentation/web/latest/web/HTMLVideoElement-extension-type.html
[`package:pointer_interceptor`]: https://pub.dev/packages/pointer_interceptor
[`package:web`]: https://pub.dev/packages/web
[`package:webview_flutter`]: https://pub.dev/packages/webview_flutter
[`package:webview_flutter_web`]: https://pub.dev/packages/webview_flutter_web
[`PointerInterceptor`]: https://pub.dev/documentation/pointer_interceptor/latest/pointer_interceptor/PointerInterceptor-class.html

