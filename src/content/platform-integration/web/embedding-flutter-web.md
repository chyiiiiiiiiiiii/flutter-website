---
title: 將 Flutter 加入任意網頁應用程式
shortTitle: 為任意網頁應用程式加入 Flutter
description: 瞭解將 Flutter 視圖嵌入網頁內容的不同方式。
---

Flutter 視圖（Flutter views）與網頁內容可以以不同方式組合，來產生網頁應用程式。請根據您的使用情境選擇以下其中一種方式：

* 由 Flutter 視圖控制整個頁面（[全頁模式][full page mode]）
* 將 Flutter 視圖加入現有網頁應用程式（[嵌入模式][embedded mode]）

[full page mode]: #全頁模式-full-page-mode
[embedded mode]: #embedded-mode

## 全頁模式（Full page mode）

在全頁模式下，Flutter 網頁應用程式會接管整個瀏覽器視窗，並在渲染時完全覆蓋其 viewport。

這是新建立 Flutter 網頁專案的預設嵌入模式，無需額外設定。

```html highlightLines=6
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <script src="flutter_bootstrap.js" defer></script>
  </body>
</html>
```

當 Flutter web 在啟動時沒有參考 `multiViewEnabled` 或 `hostElement` 時，會使用全頁模式（full page mode）。

想進一步了解 `flutter_bootstrap.js` 檔案，請參考 [Customize app initialization][Customize app initialization]。

[Customize app initialization]: {{site.docs}}/platform-integration/web/initialization/

### `iframe` 嵌入（embedding）

當透過 `iframe` 嵌入 Flutter web 應用程式時，建議使用全頁模式（full page mode）。嵌入 `iframe` 的頁面可以根據需求調整其大小與位置，而 Flutter 會完整填滿該區域。

```html
<iframe src="https://url-to-your-flutter/index.html"></iframe>
```

想進一步了解`iframe`的優缺點，請參閱 MDN 上的 [Inline Frame element][Inline Frame element] 文件。

[Inline Frame element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe

## 嵌入模式

Flutter Web 應用程式也可以將內容渲染到其他 Web 應用程式中的任意數量的元素（通常是`div`）；這種方式稱為「嵌入模式」（embedded mode，或稱「多視圖」multi-view）。

在此模式下：

* Flutter Web 應用程式可以啟動，但在第一個「視圖」被加入（使用`addView`）之前不會進行渲染。
* 主應用程式可以從嵌入的 Flutter Web 應用程式中新增或移除視圖。
* 當視圖被新增或移除時，Flutter 應用程式會收到通知，從而可以相應地調整其元件（Widgets）。

### 啟用多視圖模式

請在`initializeEngine`方法中設定`multiViewEnabled: true`，以啟用多視圖模式，如下所示：

```js highlightLines=8 title="flutter_bootstrap.js"
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

_flutter.loader.load({
  onEntrypointLoaded: async function onEntrypointLoaded(engineInitializer) {
    let engine = await engineInitializer.initializeEngine({
      multiViewEnabled: true, // Enables embedded mode.
    });
    let app = await engine.runApp();
    // Make this `app` object available to your JS app.
  }
});
```

### 從 JavaScript 管理 Flutter 視圖

若要新增或移除視圖，請使用由 `runApp` 方法所回傳的 `app` 物件：

```js highlightLines=2-4,7
// Adding a view...
let viewId = app.addView({
  hostElement: document.querySelector('#some-element'),
});

// Removing viewId...
let viewConfig = app.removeView(viewId);
```

### 從 Dart 處理視圖變更

視圖的新增與移除會透過 `WidgetsBinding` 類別的 [`didChangeMetrics` 方法][`didChangeMetrics` method] 傳遞給 Flutter。

您可以透過 `WidgetsBinding.instance.platformDispatcher.views` iterable 取得目前附加在 Flutter 應用程式上的所有視圖清單。
這些視圖屬於 [`FlutterView` 類型][type `FlutterView`]。

若要將內容渲染到每個 `FlutterView`，您的 Flutter 應用程式需要建立一個
[`View` 元件 (Widget)][`View` widget]。多個 `View` 元件可以一起歸納在
[`ViewCollection` 元件 (Widget)][`ViewCollection` widget] 下。

以下範例取自 _Multi View Playground_，將上述邏輯封裝在一個 `MultiViewApp` 元件 (Widget) 中，可作為您的應用程式根元件 (root widget) 使用。每個 `FlutterView` 都會執行一次 [`WidgetBuilder` 函式][`WidgetBuilder` function]：

```dart highlightLines=25,39,46-49,56-61,72 title="multi_view_app.dart"
import 'dart:ui' show FlutterView;
import 'package:flutter/widgets.dart';

/// Calls [viewBuilder] for every view added to the app to obtain the widget to
/// render into that view. The current view can be looked up with [View.of].
class MultiViewApp extends StatefulWidget {
  const MultiViewApp({super.key, required this.viewBuilder});

  final WidgetBuilder viewBuilder;

  @override
  State<MultiViewApp> createState() => _MultiViewAppState();
}

class _MultiViewAppState extends State<MultiViewApp> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _updateViews();
  }

  @override
  void didUpdateWidget(MultiViewApp oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Need to re-evaluate the viewBuilder callback for all views.
    _views.clear();
    _updateViews();
  }

  @override
  void didChangeMetrics() {
    _updateViews();
  }

  Map<Object, Widget> _views = <Object, Widget>{};

  void _updateViews() {
    final Map<Object, Widget> newViews = <Object, Widget>{};
    for (final FlutterView view in WidgetsBinding.instance.platformDispatcher.views) {
      final Widget viewWidget = _views[view.viewId] ?? _createViewWidget(view);
      newViews[view.viewId] = viewWidget;
    }
    setState(() {
      _views = newViews;
    });
  }

  Widget _createViewWidget(FlutterView view) {
    return View(
      view: view,
      child: Builder(
        builder: widget.viewBuilder,
      ),
    );
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ViewCollection(views: _views.values.toList(growable: false));
  }
}
```

如需更多資訊，請參閱 API 文件中的 [`WidgetsBinding` mixin][`WidgetsBinding` mixin]，或參考開發過程中所使用的 [Multi View Playground repo][Multi View Playground repo]。

[`didChangeMetrics` method]: {{site.api}}/flutter/widgets/WidgetsBindingObserver/didChangeMetrics.html
[Multi View Playground repo]: {{site.github}}/goderbauer/mvp
[type `FlutterView`]: {{site.api}}/flutter/dart-ui/FlutterView-class.html
[`View` widget]: {{site.api}}/flutter/widgets/View-class.html
[`ViewCollection` widget]: {{site.api}}/flutter/widgets/ViewCollection-class.html
[`WidgetsBinding` mixin]: {{site.api}}/flutter/widgets/WidgetsBinding-mixin.html
[`WidgetBuilder` function]: {{site.api}}/flutter/widgets/WidgetBuilder.html

### 在 Dart 中以 `runWidget` 取代 `runApp`

Flutter 的 [`runApp` 函式][`runApp` function] 假設至少有一個可用的 view 來進行渲染（即 `implicitView`），但在 Flutter web 的多視圖（multi-view）模式下，`implicitView` 已經不存在，因此 `runApp` 會開始因為 `Unexpected null value` 錯誤而失敗。

在多視圖模式下，你的 `main.dart` 必須改為呼叫 [`runWidget` 函式][`runWidget` function]。這個函式不需要 `implicitView`，並且只會渲染那些已經明確加入應用程式中的 views。

以下範例使用上述的 `MultiViewApp`，在每個可用的 `FlutterView` 上渲染 `MyApp()` 元件的副本：

```dart highlightLines=3 title="main.dart"
void main() {
  runWidget(
    MultiViewApp(
      viewBuilder: (BuildContext context) => const MyApp(),
    ),
  );
}
```

[`runApp` function]: {{site.api}}/flutter/widgets/runApp.html
[`runWidget` function]: {{site.api}}/flutter/widgets/runWidget.html

### 識別視圖

每個 `FlutterView` 在附加時都會由 Flutter 指派一個識別碼。這個 `viewId` 可用於唯一識別每個視圖、取得其初始設定，或決定要在其中渲染什麼內容。

已渲染 `FlutterView` 的 `viewId` 可以從其 `BuildContext` 如下取得：

```dart highlightLines=4-5
class SomeWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Retrieve the `viewId` where this Widget is being built:
    final int viewId = View.of(context).viewId;
    // ...
```

同樣地，從 `MultiViewApp` 的 `viewBuilder` 方法中，可以這樣取得 `viewId`：

```dart highlightLines=4
MultiViewApp(
  viewBuilder: (BuildContext context) {
    // Retrieve the `viewId` where this Widget is being built:
    final int viewId = View.of(context).viewId;
    // Decide what to render based on `viewId`...
  },
)
```

閱讀更多關於 [`View.of` constructor][`View.of` constructor]。

[`View.of` constructor]: {{site.api}}/flutter/widgets/View/of.html

### 初始視圖設定

Flutter 視圖（views）在啟動時可以從 JavaScript 接收任何初始化資料。
這些數值會透過 `initialData` 屬性傳遞給 `addView` 方法，如下所示：

```js highlightLines=4-7
// Adding a view with initial data...
let viewId = app.addView({
  hostElement: someElement,
  initialData: {
    greeting: 'Hello, world!',
    randomValue: Math.floor(Math.random() * 100),
  }
});
```

在 Dart 中，`initialData` 以 `JSAny` 物件的形式提供，並可透過 `dart:ui_web` 函式庫中的頂層 `views` 屬性存取。資料則可透過目前檢視的 `viewId` 來存取，如下所示：

```dart
final initialData = ui_web.views.getInitialData(viewId) as YourJsInteropType;
```

若想了解如何定義 `YourJsInteropType` 類別，以便將從 JavaScript 傳遞過來的 `initialData` 物件在 Dart 程式中進行型別安全的對應，請參考：[JS Interoperability][JS Interoperability]（在 dart.dev 上）。

[JS Interoperability]: {{site.dart-site}}/interop/js-interop

### 檢視約束（View constraints）

預設情況下，嵌入式 Flutter Web 檢視會將其 `hostElement` 的大小視為不可變屬性，並將其版面配置嚴格限制在可用空間內。

在網頁上，元素的內在尺寸（intrinsic size）通常會影響頁面的版面配置（例如 `img` 或 `p` 標籤，可以讓內容重新排版圍繞它們）。

當你將檢視新增到 Flutter Web 時，你可以透過設定約束（constraints）來告知 Flutter 該檢視需要如何進行版面配置：

```js highlightLines=4-8
// Adding a view with initial data...
let viewId = app.addView({
  hostElement: someElement,
  viewConstraints: {
    maxWidth: 320,
    minHeight: 0,
    maxHeight: Infinity,
  }
});
```

從 JavaScript 傳遞過來的視圖限制（view constraints）需要與嵌入 Flutter 的 `hostElement` 的 CSS 樣式相容。例如，若在 CSS 中傳遞 `max-height: 100px`，但又將 `maxHeight: Infinity` 傳給 Flutter，這種互相矛盾的常數，Flutter 並不會嘗試「修正」。

如需進一步了解，請參閱 [`ViewConstraints` 類別][`ViewConstraints` class]，
以及[理解限制條件][Understanding constraints]。

[`ViewConstraints` class]: {{site.api}}/flutter/dart-ui/ViewConstraints-class.html
[Understanding constraints]: {{site.docs}}/ui/layout/constraints

## 自訂元素（Custom element，`hostElement`）

自 Flutter 3.10 版本起，
你可以將單一視圖的 Flutter Web 應用程式
嵌入到網頁的任意 HTML 元素中。

若要告訴 Flutter Web 要渲染到哪個元素，
請將包含 `config` 欄位的物件傳遞給 `_flutter.loader.load` 函式，
並以 `HTMLElement` 作為 `hostElement` 來指定。

```js highlightLines=3
_flutter.loader.load({
  config: {
    hostElement: document.getElementById('flutter_host'),
  }
});
```

:::note
多視圖（multi-view）嵌入同樣適用於單一視圖（single view）。
使用多視圖支援來嵌入單一視圖的優點在於，
你可以動態地建立和移除視圖。此外，
如果未來單一視圖支援被棄用，也不會影響你的應用程式。
:::

想進一步了解其他設定選項，
請參考[自訂網頁應用程式初始化][Customizing web app initialization]。

[Customizing web app initialization]: {{site.docs}}/platform-integration/web/initialization
