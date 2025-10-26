---
title: 為你的 Flutter 應用程式新增互動性
description: 如何實作一個能回應點擊的 stateful widget（有狀態元件）。
shortTitle: 互動性
---

{% assign examples = site.repo.this | append: "/tree/" | append: site.branch | append: "/examples" -%}

:::secondary 你將學到什麼
* 如何回應點擊事件。
* 如何建立自訂元件（custom widget）。
* 無狀態元件（stateless widget）與有狀態元件（stateful widget）的差異。
:::

你要如何修改你的應用程式，讓它能夠回應使用者的輸入？
在本教學中，你將為一個只包含非互動元件的應用程式新增互動性。
具體來說，你會修改一個圖示（icon），讓它可以被點擊，
並透過建立一個自訂的 stateful widget（有狀態元件）來管理兩個
stateless widgets（無狀態元件）。

[版面配置教學][building layouts tutorial] 已經教你如何建立下圖的版面配置。

{% render docs/app-figure.md, img-class:"site-mobile-screenshot border", image:"ui/layout/lakes.jpg", caption:"版面配置教學應用程式" %}

當應用程式首次啟動時，星星是實心紅色，
表示這個湖泊已經被收藏過。
星星旁的數字表示有 41 人收藏了這個湖泊。完成本教學後，
點擊星星會取消收藏狀態，
將實心星星換成外框星星，並減少數字。
再次點擊則會重新收藏該湖泊，
顯示實心星星並增加數字。

{% render docs/app-figure.md, image:"ui/favorited-not-favorited.png", alt:"你將建立的自訂元件", img-class:"diagram-wrap" %}

為了達成這個目標，你將建立一個自訂元件，
其中同時包含星星和數字計數，這兩者本身也是元件。
點擊星星會同時改變這兩個元件的狀態，因此應由同一個元件來管理。

你可以直接在
[步驟 2：繼承 StatefulWidget](#step-2)
開始動手寫程式碼。
如果你想嘗試不同的狀態管理方式，
可以跳到 [狀態管理][Managing state]。

## Stateful widget（有狀態元件）與 stateless widget（無狀態元件）

一個元件要麼是有狀態（stateful），要麼是無狀態（stateless）。如果一個元件可以改變——例如當使用者與它互動時——它就是有狀態的。

_stateless_ widget（無狀態元件）永遠不會改變。
[`Icon`][`Icon`]、[`IconButton`][`IconButton`] 和 [`Text`][`Text`]
都是無狀態元件的例子。Stateless widgets
會繼承 [`StatelessWidget`][`StatelessWidget`]。

_stateful_ widget（有狀態元件）是動態的：例如，
它可以根據使用者互動觸發的事件或接收到資料時改變外觀。
[`Checkbox`][`Checkbox`]、[`Radio`][`Radio`]、[`Slider`][`Slider`]、
[`InkWell`][`InkWell`]、[`Form`][`Form`] 和 [`TextField`][`TextField`]
都是有狀態元件的例子。Stateful widgets
會繼承 [`StatefulWidget`][`StatefulWidget`]。

元件的狀態會儲存在 [`State`][`State`] 物件中，
將元件的狀態與外觀分離。
狀態包含那些可能改變的值，例如
滑桿（slider）的目前值或核取方塊（checkbox）是否被勾選。
當元件的狀態改變時，
狀態物件會呼叫 `setState()`，
通知框架重新繪製該元件。

## 建立一個 stateful widget（有狀態元件）

:::secondary 重點是什麼？

* 一個 stateful widget（有狀態元件）是由兩個類別實作的：
  一個繼承自 `StatefulWidget`，另一個繼承自 `State`。
* 狀態類別包含元件的可變狀態以及
  元件的 `build()` 方法。
* 當元件的狀態改變時，狀態物件會呼叫
  `setState()`，通知框架重新繪製元件。

:::

在本節中，你將建立一個自訂的 stateful widget（有狀態元件）。
你會將兩個 stateless widgets（無狀態元件）——實心紅色星星
和旁邊的數字計數——替換成一個
自訂的 stateful widget（有狀態元件），它會管理一個包含兩個
子元件的 row：`IconButton` 和 `Text`。

實作自訂 stateful widget（有狀態元件）需要建立兩個類別：

* 一個繼承自 `StatefulWidget` 的類別，定義這個元件。
* 一個繼承自 `State` 的類別，包含該
  元件的狀態，並定義元件的 `build()` 方法。

本節將示範如何為 lakes app 建立一個名為 `FavoriteWidget` 的 stateful widget（有狀態元件）。
設定完成後，你的第一步就是選擇如何為 `FavoriteWidget` 管理狀態。

### 步驟 0：準備工作

如果你已經完成
[版面配置教學][building layouts tutorial]
中的應用程式，請跳到下一節。

 1. 確認你已經[完成環境設定][set up]。
 1. [建立一個新的 Flutter 應用程式][new-flutter-app]。
 1. 將 `lib/main.dart` 檔案替換為 [`main.dart`][`main.dart`]。
 1. 將 `pubspec.yaml` 檔案替換為 [`pubspec.yaml`][`pubspec.yaml`]。
 1. 在你的專案中建立一個 `images` 目錄，並加入
    [`lake.jpg`][`lake.jpg`]。

當你有一台已連接並啟用的裝置，
或已啟動 [iOS 模擬器][iOS simulator]
(part of the Flutter install) 或
[Android 模擬器][Android emulator] (part of the Android Studio
install) 時，就可以開始了！

<a id="step-1"></a>

### 步驟 1：決定由哪個物件管理元件的狀態

一個元件的狀態可以有多種管理方式，
但在我們的範例中，元件本身，
`FavoriteWidget`，會自行管理自己的狀態。
在這個例子中，切換星星的動作是獨立的，
不會影響父元件或其他 UI，因此這個元件可以自行處理其狀態。

想進一步了解元件與狀態的分離，
以及狀態可能的管理方式，請參考 [狀態管理][Managing state]。

<a id="step-2"></a>

### 步驟 2：繼承 StatefulWidget

`FavoriteWidget` 類別會自行管理自己的狀態，
因此會覆寫 `createState()`，以建立一個 `State`
物件。當框架需要建立這個元件時，會呼叫 `createState()`。
在這個範例中，`createState()` 會回傳一個
`_FavoriteWidgetState` 的實例，
你會在下一步實作它。

<?code-excerpt path-base="layout/lakes/interactive"?>

<?code-excerpt "lib/main.dart (favorite-widget)"?>
```dart
class FavoriteWidget extends StatefulWidget {
  const FavoriteWidget({super.key});

  @override
  State<FavoriteWidget> createState() => _FavoriteWidgetState();
}
```

:::note
以底線開頭的成員或類別
(`_`) 是私有的。欲了解更多資訊，
請參閱 [Libraries and imports][Libraries and imports]，該章節位於
[Dart language documentation][Dart language documentation] 中。
:::

<a id="step-3"></a>

### 步驟 3：繼承 State

`_FavoriteWidgetState` 類別用來儲存可變資料，
這些資料會隨著元件（Widget）的生命週期而改變。
當應用程式首次啟動時，UI 會顯示一顆實心紅色星星，
表示該湖泊已被標記為「最愛」，
同時顯示 41 個喜歡數。這些值分別儲存在
`_isFavorited` 和 `_favoriteCount` 欄位中：

<?code-excerpt "lib/main.dart (favorite-state-fields)" replace="/(bool|int) .*/[!$&!]/g"?>
```dart
class _FavoriteWidgetState extends State<FavoriteWidget> {
  [!bool _isFavorited = true;!]
  [!int _favoriteCount = 41;!]
```

這個類別同時定義了一個 `build()` 方法，
該方法會建立一個包含紅色 `IconButton` 和 `Text` 的橫列（row）。
你會使用 [`IconButton`][`IconButton`] (instead of `Icon`)，
因為它具有 `onPressed` 屬性，可以定義處理點擊事件的回呼函式（`_toggleFavorite`）。
接下來你將定義這個回呼函式。

<?code-excerpt "lib/main.dart (favorite-state-build)" replace="/build|icon.*|onPressed.*|child: Text.*/[!$&!]/g"?>
```dart
class _FavoriteWidgetState extends State<FavoriteWidget> {
  // ···
  @override
  Widget [!build!](BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          padding: const EdgeInsets.all(0),
          child: IconButton(
            padding: const EdgeInsets.all(0),
            alignment: Alignment.center,
            [!icon: (_isFavorited!]
                ? const Icon(Icons.star)
                : const Icon(Icons.star_border)),
            color: Colors.red[500],
            [!onPressed: _toggleFavorite,!]
          ),
        ),
        SizedBox(width: 18, child: SizedBox([!child: Text('$_favoriteCount'))),!]
      ],
    );
  }

  // ···
}
```

:::tip
將`Text`放在[`SizedBox`][`SizedBox`]中並設定其寬度，可以避免當文字在 40 和 41 之間變化時產生明顯的「跳動」現象——否則這兩個值因為寬度不同，會導致畫面跳動。
:::

`_toggleFavorite()` 方法會在按下 `IconButton` 時被呼叫，並進一步呼叫 `setState()`。
呼叫 `setState()` 非常重要，因為這會通知框架該元件 (Widget) 的狀態已經改變，需要重新繪製元件。
傳遞給 `setState()` 的函式參數會在這兩種狀態之間切換 UI：

* 一個 `star` 圖示以及數字 41
* 一個 `star_border` 圖示以及數字 40

<?code-excerpt "lib/main.dart (toggle-favorite)"?>
```dart
void _toggleFavorite() {
  setState(() {
    if (_isFavorited) {
      _favoriteCount -= 1;
      _isFavorited = false;
    } else {
      _favoriteCount += 1;
      _isFavorited = true;
    }
  });
}
```

<a id="step-4"></a>

### 步驟 4：將有狀態元件（stateful widget）插入元件樹（widget tree）

將你自訂的有狀態元件加入應用程式的`build()`方法中的元件樹。首先，找到建立`Icon`和`Text`的程式碼，並將其刪除。
然後在同一個位置建立你的有狀態元件：

<?code-excerpt path-base=""?>

```dart diff
  child: Row(
    children: [
      // ...
-     Icon(
-       Icons.star,
-       color: Colors.red[500],
-     ),
-     const Text('41'),
+     const FavoriteWidget(),
    ],
  ),
```

就是這樣！當你熱重載（hot reload）應用程式後，
星形圖示現在應該會對點擊做出回應。

### 有問題嗎？

如果你的程式碼無法執行，請在你的
IDE 中查看是否有錯誤訊息。[偵錯 Flutter 應用程式][Debugging Flutter apps] 可能會有所幫助。
如果你仍然找不到問題所在，
請將你的程式碼與 GitHub 上的互動 lakes 範例進行比對。

{% comment %}
TODO: replace the following links with tabbed code panes.
{% endcomment -%}

* [`lib/main.dart`]({{site.repo.this}}/tree/{{site.branch}}/examples/layout/lakes/interactive/lib/main.dart)
* [`pubspec.yaml`]({{site.repo.this}}/tree/{{site.branch}}/examples/layout/lakes/interactive/pubspec.yaml)
* [`lakes.jpg`]({{site.repo.this}}/tree/{{site.branch}}/examples/layout/lakes/interactive/images/lake.jpg)

如果你還有疑問，可以參考任一開發者
[社群][community] 頻道。

---

本頁接下來將介紹多種管理元件（Widget）狀態的方法，
並列出其他可用的互動元件。

## 狀態管理

:::secondary 有什麼重點？
* 狀態管理有不同的方法。
* 作為元件設計者的你，可以選擇要使用哪一種方法。
* 如果不確定，建議先從父元件管理狀態開始。
:::

誰來管理有狀態元件（stateful widget）的狀態？是元件自己？
還是父元件？還是兩者？或是其他物件？
答案是……視情況而定。有好幾種有效的方式
可以讓你的元件具備互動性。你，作為元件設計者，
可以根據你預期元件的使用方式來做決定。
以下是最常見的幾種狀態管理方式：

* [元件自行管理狀態](#元件自行管理狀態)
* [父元件管理元件狀態](#父元件-parent-widget-管理元件狀態)
* [混合搭配方式](#混合搭配的方法)
那麼該如何決定要用哪種方式呢？
以下原則可以協助你判斷：

* 如果該狀態屬於使用者資料，
  例如核取方塊的勾選或未勾選狀態，
  或是滑桿的位置，
  那麼建議由父元件來管理該狀態。

* 如果該狀態屬於美觀或視覺效果，
  例如動畫，
  那麼建議由元件自己來管理該狀態。

如果不確定，建議從父元件管理狀態開始。

我們將透過三個簡單範例來說明不同的狀態管理方式：TapboxA、TapboxB，
以及 TapboxC。這些範例的運作方式都很類似——
每個都會建立一個容器，當點擊時會在
綠色與灰色方塊間切換。`_active` 布林值決定
顏色：啟用時為綠色，未啟用時為灰色。

<div class="side-by-side text-center">
  <div class="text-center">
    <img src='/assets/images/docs/ui/tapbox-active-state.png' class="simple-border" width="150px" alt="Active state">
    <img src='/assets/images/docs/ui/tapbox-inactive-state.png' class="simple-border" width="150px" alt="Inactive state">
  </div>
</div>

這些範例使用 [`GestureDetector`][`GestureDetector`] 來捕捉
`Container` 上的互動行為。

<a id="self-managed" aria-hidden="true"></a>

### 元件自行管理狀態

有時候，讓元件在內部自行管理狀態是最合理的選擇。例如，
[`ListView`][`ListView`] 當內容超出渲染框時會自動捲動。
大多數使用 `ListView` 的開發者並不希望自己管理 `ListView`
的捲動行為，因此 `ListView` 會自行管理其捲動偏移量。

`_TapboxAState` 類別：

* 管理 `TapboxA` 的狀態。
* 定義 `_active` 布林值，用來決定方塊目前的顏色。
* 定義 `_handleTap()` 函式，當方塊被點擊時會更新
  `_active`，並呼叫 `setState()` 函式以更新 UI。
* 實作所有元件的互動行為。

<?code-excerpt path-base="ui/interactive/"?>

<?code-excerpt "lib/self_managed.dart"?>
```dart
import 'package:flutter/material.dart';

// TapboxA manages its own state.

//------------------------- TapboxA ----------------------------------

class TapboxA extends StatefulWidget {
  const TapboxA({super.key});

  @override
  State<TapboxA> createState() => _TapboxAState();
}

class _TapboxAState extends State<TapboxA> {
  bool _active = false;

  void _handleTap() {
    setState(() {
      _active = !_active;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        width: 200,
        height: 200,
        decoration: BoxDecoration(
          color: _active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
        child: Center(
          child: Text(
            _active ? 'Active' : 'Inactive',
            style: const TextStyle(fontSize: 32, color: Colors.white),
          ),
        ),
      ),
    );
  }
}

//------------------------- MyApp ----------------------------------

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: const Text('Flutter Demo')),
        body: const Center(child: TapboxA()),
      ),
    );
  }
}
```

<hr>

<a id="parent-managed"></a>

### 父元件 (Parent Widget) 管理元件狀態

通常由父元件來管理狀態並通知其子元件何時需要更新是最合理的做法。例如，[`IconButton`][`IconButton`] 讓你可以將一個 icon 當作可點擊的按鈕來使用。`IconButton` 是一個無狀態元件（StatelessWidget），因為我們決定父元件需要知道按鈕是否被點擊，才能採取適當的行動。

在以下範例中，TapboxB 透過 callback 將其狀態傳遞給父元件。由於 TapboxB 不管理任何狀態，因此它繼承自 StatelessWidget。

ParentWidgetState 類別：

* 管理 TapboxB 的 `_active` 狀態。
* 實作 `_handleTapboxChanged()`，
  這個方法會在方塊被點擊時呼叫。
* 當狀態改變時，呼叫 `setState()`
  來更新 UI。

TapboxB 類別：

* 繼承自 StatelessWidget，因為所有狀態都由父元件處理。
* 當偵測到點擊時，會通知父元件。

<?code-excerpt "lib/parent_managed.dart"?>
```dart
import 'package:flutter/material.dart';

// ParentWidget manages the state for TapboxB.

//------------------------ ParentWidget --------------------------------

class ParentWidget extends StatefulWidget {
  const ParentWidget({super.key});

  @override
  State<ParentWidget> createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _active = false;

  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: TapboxB(active: _active, onChanged: _handleTapboxChanged),
    );
  }
}

//------------------------- TapboxB ----------------------------------

class TapboxB extends StatelessWidget {
  const TapboxB({super.key, this.active = false, required this.onChanged});

  final bool active;
  final ValueChanged<bool> onChanged;

  void _handleTap() {
    onChanged(!active);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        width: 200,
        height: 200,
        decoration: BoxDecoration(
          color: active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
        child: Center(
          child: Text(
            active ? 'Active' : 'Inactive',
            style: const TextStyle(fontSize: 32, color: Colors.white),
          ),
        ),
      ),
    );
  }
}
```

<hr>

<a id="mix-and-match"></a>

### 混合搭配的方法

對於某些元件 (Widgets) 來說，採用混合搭配的方法最為合適。在這種情境下，有狀態元件 (stateful widget) 管理部分狀態，而父元件則管理其他狀態層面。

在`TapboxC`範例中，當點擊按下時，盒子周圍會出現深綠色的邊框。當點擊釋放時，邊框消失且盒子的顏色會改變。`TapboxC`會將其`_active`狀態導出給父元件，但會在內部自行管理`_highlight`狀態。這個範例中有兩個`State`物件，分別是`_ParentWidgetState`與`_TapboxCState`。

`_ParentWidgetState`物件：

* 負責管理`_active`狀態。
* 實作`_handleTapboxChanged()`，這個方法會在盒子被點擊時呼叫。
* 當點擊發生且`_active`狀態改變時，會呼叫`setState()`來更新 UI。

`_TapboxCState`物件：

* 負責管理`_highlight`狀態。
* `GestureDetector`會監聽所有點擊事件。當使用者按下時，會加上高亮效果（以深綠色邊框實作）。當使用者釋放點擊時，則移除高亮效果。
* 在點擊按下、釋放或取消時，若`_highlight`狀態改變，會呼叫`setState()`來更新 UI。
* 當發生點擊事件時，會將該狀態變化傳遞給父元件，讓其透過 [`widget`][`widget`] 屬性採取適當的動作。

<?code-excerpt "lib/mixed.dart"?>
```dart
import 'package:flutter/material.dart';

//---------------------------- ParentWidget ----------------------------

class ParentWidget extends StatefulWidget {
  const ParentWidget({super.key});

  @override
  State<ParentWidget> createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _active = false;

  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: TapboxC(active: _active, onChanged: _handleTapboxChanged),
    );
  }
}

//----------------------------- TapboxC ------------------------------

class TapboxC extends StatefulWidget {
  const TapboxC({super.key, this.active = false, required this.onChanged});

  final bool active;
  final ValueChanged<bool> onChanged;

  @override
  State<TapboxC> createState() => _TapboxCState();
}

class _TapboxCState extends State<TapboxC> {
  bool _highlight = false;

  void _handleTapDown(TapDownDetails details) {
    setState(() {
      _highlight = true;
    });
  }

  void _handleTapUp(TapUpDetails details) {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTapCancel() {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTap() {
    widget.onChanged(!widget.active);
  }

  @override
  Widget build(BuildContext context) {
    // This example adds a green border on tap down.
    // On tap up, the square changes to the opposite state.
    return GestureDetector(
      onTapDown: _handleTapDown, // Handle the tap events in the order that
      onTapUp: _handleTapUp, // they occur: down, up, tap, cancel
      onTap: _handleTap,
      onTapCancel: _handleTapCancel,
      child: Container(
        width: 200,
        height: 200,
        decoration: BoxDecoration(
          color: widget.active ? Colors.lightGreen[700] : Colors.grey[600],
          border: _highlight
              ? Border.all(color: Colors.teal[700]!, width: 10)
              : null,
        ),
        child: Center(
          child: Text(
            widget.active ? 'Active' : 'Inactive',
            style: const TextStyle(fontSize: 32, color: Colors.white),
          ),
        ),
      ),
    );
  }
}
```

另一種實作方式可能會將 highlight（高亮）狀態導出給父元件，同時將 active（啟用）狀態保留在內部，
但如果你請某人使用那個 tap box，他們很可能會抱怨這樣做沒有太大意義。
開發者關心的是這個方塊是否為啟用狀態。
開發者大概不會在意高亮效果是如何管理的，反而更希望 tap box 自行處理這些細節。

<hr>

## 其他互動式元件

Flutter 提供了各種按鈕及類似的互動式元件 (Widgets)。
這些元件大多實作了 [Material Design 指南][Material Design guidelines]，
該指南定義了一套具有明確 UI 風格的元件。

如果你有需要，也可以使用 [`GestureDetector`][`GestureDetector`]
為任何自訂元件加入互動功能。
你可以在
[狀態管理][Managing state]中找到 `GestureDetector` 的範例。
想進一步了解 `GestureDetector`，請參考 Flutter cookbook 中的 [Handle taps][Handle taps] 教學。

:::tip
Flutter 也提供了一套 iOS 風格的元件，稱為
[`Cupertino`][`Cupertino`]。
:::

當你需要互動功能時，最簡單的方式就是直接使用現成的元件。以下是部分常用清單：

### 標準元件

* [`Form`][`Form`]
* [`FormField`][`FormField`]

### Material Components

* [`Checkbox`][`Checkbox`]
* [`DropdownButton`][`DropdownButton`]
* [`TextButton`][`TextButton`]
* [`FloatingActionButton`][`FloatingActionButton`]
* [`IconButton`][`IconButton`]
* [`Radio`][`Radio`]
* [`ElevatedButton`][`ElevatedButton`]
* [`Slider`][`Slider`]
* [`Switch`][`Switch`]
* [`TextField`][`TextField`]

## 相關資源

以下資源可協助你在應用程式中加入互動功能。

[Gestures][Gestures]，Flutter cookbook 中的相關章節。

[Handling gestures][Handling gestures]
：說明如何建立按鈕並讓其回應輸入。

[Gestures in Flutter][Gestures in Flutter]
：介紹 Flutter 的手勢機制。

[Flutter API documentation][Flutter API documentation]
：所有 Flutter 函式庫的參考文件。

Wonderous app [running app][wonderous-app]、[repo][wonderous-repo]
：一個以自訂設計和豐富互動為特色的 Flutter 展示應用程式。

[Flutter's Layered Design][Flutter's Layered Design] (video)
：這支影片包含有關 state（有狀態）與 stateless（無狀態）元件 (Widgets) 的資訊。由 Google 工程師 Ian Hickson 主講。

[Android emulator]: /platform-integration/android/setup#set-up-devices
[`Checkbox`]: {{site.api}}/flutter/material/Checkbox-class.html
[`Cupertino`]: {{site.api}}/flutter/cupertino/cupertino-library.html
[Dart language documentation]: {{site.dart-site}}/language
[Debugging Flutter apps]: /testing/debugging
[`DropdownButton`]: {{site.api}}/flutter/material/DropdownButton-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`FloatingActionButton`]: {{site.api}}/flutter/material/FloatingActionButton-class.html
[Flutter API documentation]: {{site.api}}
[Flutter's Layered Design]: {{site.yt.watch}}?v=dkyY9WCGMi0
[`FormField`]: {{site.api}}/flutter/widgets/FormField-class.html
[`Form`]: {{site.api}}/flutter/widgets/Form-class.html
[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[Gestures]: /cookbook/gestures
[Gestures in Flutter]: /ui/interactivity/gestures
[Handling gestures]: /ui#handling-gestures
[new-flutter-app]: /reference/create-new-app
[`IconButton`]: {{site.api}}/flutter/material/IconButton-class.html
[`Icon`]: {{site.api}}/flutter/widgets/Icon-class.html
[`InkWell`]: {{site.api}}/flutter/material/InkWell-class.html
[iOS simulator]: /platform-integration/ios/setup#set-up-devices
[building layouts tutorial]: /ui/layout/tutorial
[community]: {{site.main-url}}/community
[Handle taps]: /cookbook/gestures/handling-taps
[`lake.jpg`]: {{examples}}/layout/lakes/step6/images/lake.jpg
[Libraries and imports]: {{site.dart-site}}/language/libraries
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`main.dart`]: {{examples}}/layout/lakes/step6/lib/main.dart
[Managing state]: #狀態管理
[Material Design guidelines]: {{site.material}}/styles
[`pubspec.yaml`]: {{examples}}/layout/lakes/step6/pubspec.yaml
[`Radio`]: {{site.api}}/flutter/material/Radio-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[wonderous-app]: {{site.wonderous}}/web
[wonderous-repo]: {{site.repo.wonderous}}
[set up]: /get-started
[`SizedBox`]: {{site.api}}/flutter/widgets/SizedBox-class.html
[`Slider`]: {{site.api}}/flutter/material/Slider-class.html
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`Switch`]: {{site.api}}/flutter/material/Switch-class.html
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[`widget`]: {{site.api}}/flutter/widgets/State/widget.html
