---
title: 為你的 Flutter 應用程式加入互動性
description: 如何實作可回應點擊的有狀態元件（stateful widget）。
shortTitle: 互動性
---

{% assign examples = site.repo.this | append: "/tree/" | append: site.branch | append: "/examples" -%}

:::secondary 你將學到什麼
* 如何回應點擊事件。
* 如何建立自訂元件（widget）。
* 無狀態元件（stateless widget）與有狀態元件（stateful widget）的差異。
:::

你要如何修改你的應用程式，讓它能回應使用者輸入？
在本教學中，你將為一個僅包含非互動元件的應用程式加入互動性。
具體來說，你會修改一個圖示，讓它可以被點擊，
並透過建立一個自訂的有狀態元件來管理兩個
無狀態元件。

[版面配置教學][building layouts tutorial] 已經教你如何建立下圖的版面配置。

{% render docs/app-figure.md, img-class:"site-mobile-screenshot border", image:"ui/layout/lakes.jpg", caption:"版面配置教學應用程式" %}

當應用程式首次啟動時，星星是實心紅色，
表示這個湖泊已經被收藏過。
星星旁邊的數字表示有 41
人收藏了這個湖泊。完成本教學後，
點擊星星會移除收藏狀態，
將實心星星換成空心，並減少計數。再次點擊則會重新收藏該湖泊，
顯示實心星星並增加計數。

{% render docs/app-figure.md, image:"ui/favorited-not-favorited.png", alt:"你將建立的自訂元件", img-class:"diagram-wrap" %}

為了達成這個目標，你將建立一個自訂元件，
同時包含星星和數字計數，這兩者本身也是元件。
點擊星星會同時改變這兩個元件的狀態，因此應由同一個元件來管理兩者。

你可以直接進入
[步驟 2：繼承 StatefulWidget](#step-2) 開始動手寫程式碼。
如果你想嘗試不同的狀態管理方式，
請跳到 [狀態管理][Managing state]。

## 有狀態元件與無狀態元件

一個元件（widget）可以是有狀態（stateful）或無狀態（stateless）。如果一個元件會改變——例如當使用者與它互動時——那麼它就是有狀態的。

_無狀態元件_ 永遠不會改變。
[`Icon`][`Icon`]、[`IconButton`][`IconButton`] 和 [`Text`][`Text`]
都是無狀態元件的例子。無狀態元件
會繼承自 [`StatelessWidget`][`StatelessWidget`]。

_有狀態元件_ 是動態的：例如，
它可以根據使用者互動觸發的事件或接收到資料時改變外觀。
[`Checkbox`][`Checkbox`]、[`Radio`][`Radio`]、[`Slider`][`Slider`]、
[`InkWell`][`InkWell`]、[`Form`][`Form`] 和 [`TextField`][`TextField`]
都是有狀態元件的例子。有狀態元件
會繼承自 [`StatefulWidget`][`StatefulWidget`]。

元件的狀態會儲存在 [`State`][`State`] 物件中，
將元件的狀態與其外觀分離。
狀態包含那些可能改變的值，例如
滑桿目前的值，或勾選框是否被勾選。
當元件的狀態改變時，
狀態物件會呼叫 `setState()`，
通知框架重新繪製該元件。

## 建立有狀態元件

:::secondary 重點整理

* 一個有狀態元件是由兩個類別實作而成：
  一個繼承自 `StatefulWidget`，另一個繼承自 `State`。
* 狀態類別包含元件可變的狀態以及
  元件的 `build()` 方法。
* 當元件的狀態改變時，狀態物件會呼叫
  `setState()`，通知框架重新繪製該元件。

:::

在本節中，你將建立一個自訂有狀態元件。
你會將兩個無狀態元件——實心紅色星星
以及旁邊的數字計數——替換成一個
自訂有狀態元件，該元件會管理一個包含兩個
子元件（children）的 row：`IconButton` 和 `Text`。

實作自訂有狀態元件需要建立兩個類別：

* 一個繼承自 `StatefulWidget` 的類別，用來定義元件。
* 一個繼承自 `State` 的類別，負責該
  元件的狀態，並定義元件的 `build()` 方法。

本節將示範如何為 lakes 應用程式
建立一個名為 `FavoriteWidget` 的有狀態元件。
完成設定後，你的第一步是選擇如何為 `FavoriteWidget`
管理狀態。

### 步驟 0：準備工作

如果你已經完成
[版面配置教學][building layouts tutorial]，
請直接跳到下一節。

 1. 請確認你已經[完成環境設定][set up]。
 1. [建立一個新的 Flutter 應用程式][new-flutter-app]。
 1. 用 [`main.dart`][`main.dart`] 替換 `lib/main.dart` 檔案。
 1. 用 [`pubspec.yaml`][`pubspec.yaml`] 替換 `pubspec.yaml` 檔案。
 1. 在你的專案中建立 `images` 目錄，並加入
    [`lake.jpg`][`lake.jpg`]。

當你有一台已連接且啟用的裝置，
或你已啟動 [iOS 模擬器][iOS simulator]
(part of the Flutter install) 或
[Android 模擬器][Android emulator] (part of the Android Studio
install)，就可以開始了！

<a id="step-1"></a>

### 步驟 1：決定由哪個物件管理元件的狀態

一個元件的狀態可以用多種方式管理，
但在本例中，元件本身，
`FavoriteWidget`，會自行管理自己的狀態。
在這個例子中，切換星星的動作是獨立的，
不會影響父元件或其他 UI，因此可以由元件內部自行處理狀態。

想進一步了解元件與狀態的分離，
以及狀態可能的管理方式，請參考 [狀態管理][Managing state]。

<a id="step-2"></a>

### 步驟 2：繼承 StatefulWidget

`FavoriteWidget` 類別會自行管理自己的狀態，
因此會覆寫 `createState()`，建立一個 `State`
物件。當框架需要建立該元件時，會呼叫 `createState()`。
在這個例子中，`createState()` 會回傳一個
`_FavoriteWidgetState` 的實例，
你將在下一步實作它。

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
(`_`) 為私有。欲了解更多資訊，
請參閱 [Libraries and imports][Libraries and imports]，該章節位於
[Dart language documentation][Dart language documentation]。
:::

<a id="step-3"></a>

### 步驟 3：繼承 State

`_FavoriteWidgetState` 類別用來儲存可變動的資料，
這些資料會隨著元件（Widget）的生命週期而改變。
當應用程式首次啟動時，UI 會顯示一顆實心紅色星星，
表示該湖泊已被標記為「最愛」狀態，並顯示 41 個讚。
這些值分別儲存在
`_isFavorited` 和 `_favoriteCount` 欄位中：

<?code-excerpt "lib/main.dart (favorite-state-fields)" replace="/(bool|int) .*/[!$&!]/g"?>
```dart
class _FavoriteWidgetState extends State<FavoriteWidget> {
  [!bool _isFavorited = true;!]
  [!int _favoriteCount = 41;!]
```

這個類別同時定義了一個 `build()` 方法，
該方法會建立一個包含紅色 `IconButton` 和 `Text` 的橫列。
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
將 `Text` 放在 [`SizedBox`][`SizedBox`] 中並設定其寬度，可以避免當文字在 40 與 41 之間變化時出現明顯的「跳動」現象——否則，由於這兩個值的寬度不同，會產生跳動。
:::

`_toggleFavorite()` 方法會在按下 `IconButton` 時被呼叫，並進而呼叫 `setState()`。呼叫 `setState()` 是關鍵步驟，因為這會通知框架該元件（Widget）的狀態已經改變，應該重新繪製。傳遞給 `setState()` 的函式參數會在這兩種 UI 狀態間切換：

* 顯示 `star` 圖示和數字 41
* 顯示 `star_border` 圖示和數字 40

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

### 步驟 4：將有狀態元件（StatefulWidget）插入元件樹（widget tree）

在應用程式的 `build()` 方法中，將你自訂的有狀態元件加入元件樹。首先，找到建立 `Icon` 和 `Text` 的程式碼，並將其刪除。
接著，在相同的位置建立這個有狀態元件：

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

就是這樣！當你熱重載（hot reload）應用程式時，
星形圖示現在應該會對點擊做出反應。

### 有問題嗎？

如果你的程式碼無法執行，請在
IDE 中查看可能的錯誤。[偵錯 Flutter 應用程式][Debugging Flutter apps] 可能會有所幫助。
如果你仍然找不到問題所在，
請將你的程式碼與 GitHub 上的互動 lakes 範例進行比對。

{% comment %}
TODO: 將下方連結替換為分頁式程式碼面板。
{% endcomment -%}

* [`lib/main.dart`]({{site.repo.this}}/tree/{{site.branch}}/examples/layout/lakes/interactive/lib/main.dart)
* [`pubspec.yaml`]({{site.repo.this}}/tree/{{site.branch}}/examples/layout/lakes/interactive/pubspec.yaml)
* [`lakes.jpg`]({{site.repo.this}}/tree/{{site.branch}}/examples/layout/lakes/interactive/images/lake.jpg)

如果你還有其他問題，可以參考任一開發者
[社群][community] 頻道。

---

本頁接下來將介紹多種管理元件（Widget）狀態的方法，
並列出其他可用的互動元件（Widgets）。

## 狀態管理

:::secondary 有什麼重點？
* 狀態管理有不同的方法。
* 作為元件設計者的你，可以選擇要使用哪一種方法。
* 如果不確定，建議先從父元件管理狀態開始。
:::

誰來管理 stateful 元件的狀態？是元件本身？
還是父元件？兩者皆是？還是其他物件？
答案是……視情況而定。有好幾種有效的方式
可以讓你的元件具備互動性。你作為元件設計者，
可以根據你預期元件的使用方式來做決定。
以下是最常見的狀態管理方式：

* [元件自行管理自己的狀態](#元件自行管理自己的狀態)
* [父元件管理元件的狀態](#父元件-widget-管理元件的狀態)
* [混合搭配的方法](#混合搭配的方法)
那要如何決定該用哪一種方式呢？
以下原則可以協助你做判斷：

* 如果該狀態屬於使用者資料，
  例如核取方塊（checkbox）的勾選或未勾選狀態，
  或是滑桿（slider）的位置，
  那麼這類狀態最好由父元件管理。

* 如果該狀態屬於美觀（aesthetic），
  例如動畫（Animation），
  那麼這類狀態最好由元件本身管理。

如果不確定，建議先從父元件管理狀態開始。

我們將透過三個簡單範例來說明不同的狀態管理方式：TapboxA、TapboxB，
以及 TapboxC。這些範例的運作方式都很類似——
每個範例都會建立一個容器（Container），當點擊時，
會在綠色與灰色方塊之間切換。`_active` 布林值決定了
顏色：啟用時為綠色，未啟用時為灰色。

<div class="side-by-side text-center">
  <div class="text-center">
    <img src='/assets/images/docs/ui/tapbox-active-state.png' class="simple-border" width="150px" alt="Active state">
    <img src='/assets/images/docs/ui/tapbox-inactive-state.png' class="simple-border" width="150px" alt="Inactive state">
  </div>
</div>

這些範例會使用 [`GestureDetector`][`GestureDetector`] 來捕捉
`Container` 上的互動行為。

<a id="self-managed" aria-hidden="true"></a>

### 元件自行管理自己的狀態

有時候，讓元件在內部自行管理狀態是最合理的。例如，
[`ListView`][`ListView`] 當內容超出 render box 時會自動捲動。
大多數使用 `ListView` 的開發者並不希望自己管理 `ListView`
的捲動行為，因此 `ListView` 會自行管理其捲動位置（scroll offset）。

`_TapboxAState` 類別：

* 管理 `TapboxA` 的狀態。
* 定義 `_active` 布林值，決定方塊目前的顏色。
* 定義 `_handleTap()` 函式，當方塊被點擊時會更新
  `_active`，並呼叫 `setState()` 函式來更新 UI。
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

### 父元件（Widget）管理元件的狀態

通常讓父元件來管理狀態並在需要時通知其子元件更新，是最合理的做法。例如，[`IconButton`][`IconButton`] 讓你可以將圖示（icon）當作可點擊的按鈕來使用。`IconButton` 是一個無狀態元件（StatelessWidget），因為我們決定父元件需要知道按鈕是否被點擊，以便採取適當的行動。

在以下範例中，TapboxB 透過 callback（回呼）將其狀態回傳給父元件。由於 TapboxB 不自行管理任何狀態，因此它繼承自 StatelessWidget。

ParentWidgetState 類別：

* 管理 TapboxB 的 `_active` 狀態。
* 實作 `_handleTapboxChanged()`，這個方法會在方塊被點擊時呼叫。
* 當狀態改變時，呼叫 `setState()` 來更新 UI。

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

對於某些元件（Widgets），採用混合搭配的方法最為合適。在這種情境下，狀態型元件（StatefulWidget）會管理部分狀態，而父元件則管理其他狀態的面向。

在`TapboxC`範例中，當點擊按下時，方框周圍會出現深綠色的邊框。當點擊放開時，邊框消失，且方框的顏色會改變。`TapboxC`會將其`_active`狀態傳遞給父元件，但會在內部自行管理`_highlight`狀態。此範例中有兩個`State`物件，分別是`_ParentWidgetState`與`_TapboxCState`。

`_ParentWidgetState`物件：

* 負責管理`_active`狀態。
* 實作`_handleTapboxChanged()`，當方框被點擊時會呼叫此方法。
* 當點擊事件發生且`_active`狀態改變時，會呼叫`setState()`以更新 UI。

`_TapboxCState`物件：

* 負責管理`_highlight`狀態。
* `GestureDetector`會監聽所有點擊事件。當使用者按下時，會加入高亮效果（以深綠色邊框實作）。當使用者放開時，則移除高亮效果。
* 當點擊按下、放開或取消時，且`_highlight`狀態改變，會呼叫`setState()`來更新 UI。
* 在點擊事件發生時，會將該狀態變化傳遞給父元件，讓父元件透過[`widget`][`widget`]屬性採取適當的行動。

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

另一種實作方式可能會將 highlight 狀態導出給父元件，同時將 active 狀態保留在內部，
但如果你請某人使用那個 tap box，他們可能會抱怨這樣做沒什麼道理。
開發者關心的是這個方塊是否為 active 狀態。
開發者大概不會在意 highlight 是如何被管理的，並且更希望 tap box 能自己處理這些細節。

<hr>

## 其他互動式元件

Flutter 提供了各種按鈕和類似的互動式元件（Widgets）。
這些元件大多實作了 [Material Design 指南][Material Design guidelines]，
該指南定義了一套具有明確 UI 風格的元件。

如果你有需要，也可以使用 [`GestureDetector`][`GestureDetector`]
將互動性加入任何自訂元件中。
你可以在
[狀態管理][Managing state]中找到 `GestureDetector` 的範例。想進一步了解 `GestureDetector`，
請參考 Flutter cookbook 中的 [Handle taps][Handle taps] 教學。

:::tip
Flutter 也提供了一組 iOS 風格的元件，稱為
[`Cupertino`][`Cupertino`]。
:::

當你需要互動性時，最簡單的方式就是使用現成的元件。以下是部分清單：

### 標準元件

* [`Form`][`Form`]
* [`FormField`][`FormField`]

### Material 元件（Material Components）

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

以下資源有助於你在應用程式中加入互動性。

[Gestures][Gestures]，Flutter cookbook 中的相關章節。

[Handling gestures][Handling gestures]
：如何建立按鈕並讓它回應輸入。

[Gestures in Flutter][Gestures in Flutter]
：介紹 Flutter 手勢機制的說明文件。

[Flutter API 文件][Flutter API documentation]
：所有 Flutter 函式庫的參考文件。

Wonderous app [執行中應用程式][wonderous-app]、[原始碼庫][wonderous-repo]
：一個具有自訂設計和豐富互動體驗的 Flutter 展示應用程式。

[Flutter 的分層設計][Flutter's Layered Design] (video)
：這支影片包含有關 state 與
  無狀態元件（stateless widgets）的資訊。由 Google 工程師 Ian Hickson 主講。

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
