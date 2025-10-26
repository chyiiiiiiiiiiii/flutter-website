---
title: 使用 Flutter 建構使用者介面
shortTitle: UI
description: Flutter 使用者介面開發簡介。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="ui/widgets_intro/"?>

Flutter 元件 (Widgets) 是使用現代化框架所建構，其靈感來自 [React][React]。其核心理念是：你可以透過元件 (Widgets) 來構建 UI。元件 (Widgets) 會根據其當前的設定與狀態，描述它們應該呈現的樣貌。當元件 (Widget) 的狀態改變時，該元件會重新建立其描述，框架會將新的描述與先前的描述進行比較（diff），以判斷底層渲染樹（render tree）中所需的最小變更，從而實現狀態之間的轉換。

:::note
如果你想透過實作程式碼來更深入認識 Flutter，可以參考[建構版面配置][building layouts]以及[為 Flutter 應用程式新增互動功能][adding interactivity to your Flutter app]。
:::

## Hello world

最簡單的 Flutter 應用程式只需以元件 (Widget) 作為參數呼叫 [`runApp()`][`runApp()`] 函式：

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Hello World hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    const Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
        style: TextStyle(color: Colors.blue),
      ),
    ),
  );
}
```

`runApp()` 函式會將給定的 [`Widget`][`Widget`] 設為元件樹（widget tree）的根節點。在這個範例中，元件樹由兩個元件組成，分別是 [`Center`][`Center`] 元件以及其子元件 [`Text`][`Text`] 元件。框架會強制讓根元件覆蓋整個螢幕，這表示文字 "Hello, world" 最終會置中顯示在螢幕上。在這個例子中，需要明確指定文字方向；當你使用 `MaterialApp` 元件時，這部分會自動處理，稍後會有示範。

在開發應用程式時，你通常會撰寫新的元件，這些元件會繼承自 [`StatelessWidget`][`StatelessWidget`] 或 [`StatefulWidget`][`StatefulWidget`]，取決於你的元件是否需要管理狀態。元件的主要工作是實作 [`build()`][`build()`] 函式，這個函式會以其他更底層的元件來描述此元件。框架會依序建立這些元件，直到最底層的元件，這些元件代表底層的 [`RenderObject`][`RenderObject`]，用來計算並描述元件的幾何形狀。

## 基本元件

Flutter 提供了一套強大的基本元件，以下是常用的幾個：

**[`Text`][`Text`]**
: `Text` 元件讓你可以在應用程式中建立一段具備樣式的文字。

**[`Row`][`Row`]、[`Column`][`Column`]**
: 這些彈性元件（flex widgets）讓你可以在水平方向（`Row`）和垂直方向（`Column`）建立彈性的版面配置。這些物件的設計基於網頁的 flexbox 版面配置模型。

**[`Stack`][`Stack`]**
: `Stack` 元件不是線性排列（不論水平或垂直），而是允許你依繪製順序將元件堆疊在彼此之上。你可以在 `Stack` 的子元件上使用 [`Positioned`][`Positioned`] 元件，將它們相對於堆疊的頂部、右側、底部或左側邊緣定位。Stack（堆疊）元件是基於網頁的絕對定位（absolute positioning）版面配置模型。

**[`Container`][`Container`]**
: `Container` 元件讓你可以建立一個矩形的視覺元素。Container 可以使用 [`BoxDecoration`][`BoxDecoration`] 進行裝飾，例如設定背景、邊框或陰影。`Container` 也可以設定外距（margin）、內距（padding）以及尺寸限制（constraints）。此外，`Container` 還可以透過矩陣進行三維空間的變形。

以下是一些結合上述及其他元件的簡單元件範例：

<?code-excerpt "lib/main_myappbar.dart"?>
```dartpad title="Flutter combining widgets hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget {
  const MyAppBar({required this.title, super.key});

  // Fields in a Widget subclass are always marked "final".

  final Widget title;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56, // in logical pixels
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(color: Colors.blue[500]),
      // Row is a horizontal, linear layout.
      child: Row(
        children: [
          const IconButton(
            icon: Icon(Icons.menu),
            tooltip: 'Navigation menu',
            onPressed: null, // null disables the button
          ),
          // Expanded expands its child
          // to fill the available space.
          Expanded(child: title),
          const IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
    );
  }
}

class MyScaffold extends StatelessWidget {
  const MyScaffold({super.key});

  @override
  Widget build(BuildContext context) {
    // Material is a conceptual piece
    // of paper on which the UI appears.
    return Material(
      // Column is a vertical, linear layout.
      child: Column(
        children: [
          MyAppBar(
            title: Text(
              'Example title',
              style:
                  Theme.of(context) //
                      .primaryTextTheme
                      .titleLarge,
            ),
          ),
          const Expanded(child: Center(child: Text('Hello, world!'))),
        ],
      ),
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      title: 'My app', // used by the OS task switcher
      home: SafeArea(child: MyScaffold()),
    ),
  );
}
```

請確保在`pubspec.yaml`檔案的`flutter`區段中有`uses-material-design: true`項目。這可讓你使用預先定義的[Material icons][Material icons]集合。如果你正在使用Materials函式庫，通常建議加入這一行。

```yaml
name: my_app
flutter:
  uses-material-design: true
```

許多 Material Design 元件 (Widgets) 需要放在 [`MaterialApp`][`MaterialApp`] 之內，才能正確顯示並繼承主題資料。
因此，請使用 `MaterialApp` 來執行應用程式。

`MyAppBar` 元件會建立一個高度為 56 裝置獨立像素，左右內邊距為 8 像素的 [`Container`][`Container`]。
在這個容器內，`MyAppBar` 會使用 [`Row`][`Row`] 佈局來排列其子元件。
中間的子元件，也就是 `title` 元件，被標記為 [`Expanded`][`Expanded`]，
這代表它會擴展以填滿其他子元件未佔用的剩餘空間。
你可以有多個 `Expanded` 子元件，並透過 `Expanded` 的 [`flex`][`flex`] 參數
來決定它們分配剩餘空間的比例。

`MyScaffold` 元件會將其子元件垂直排列成一個欄 (column)。
在欄的頂部會放置一個 `MyAppBar` 實例，
並傳遞一個 [`Text`][`Text`] 元件作為 app bar 的標題。
將元件作為參數傳遞給其他元件是一種強大的技巧，
讓你可以建立可重複使用且高度泛用的元件。
最後，`MyScaffold` 使用 [`Expanded`][`Expanded`] 來填滿剩餘空間作為主體，
主體內容為置中的訊息。

如需更多資訊，請參閱 [Layouts][Layouts]。

## 使用 Material 元件

Flutter 提供許多元件 (Widgets)，協助你打造符合 Material Design 的應用程式。
一個 Material 應用程式會從 [`MaterialApp`][`MaterialApp`] 元件開始，
這個元件會在你的應用程式根部建立多個實用元件，
其中包括一個 [`Navigator`][`Navigator`]，
它會管理一個以字串識別的元件堆疊，也就是所謂的「路由」(routes)。
`Navigator` 讓你可以在應用程式畫面間順暢切換。
使用 [`MaterialApp`][`MaterialApp`] 元件並非強制，但這是一個良好的實踐。

<?code-excerpt "lib/main_tutorial.dart"?>
```dartpad title="Flutter Material design hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(title: 'Flutter Tutorial', home: TutorialHome()));
}

class TutorialHome extends StatelessWidget {
  const TutorialHome({super.key});

  @override
  Widget build(BuildContext context) {
    // Scaffold is a layout for
    // the major Material Components.
    return Scaffold(
      appBar: AppBar(
        leading: const IconButton(
          icon: Icon(Icons.menu),
          tooltip: 'Navigation menu',
          onPressed: null,
        ),
        title: const Text('Example title'),
        actions: const [
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
      // body is the majority of the screen.
      body: const Center(child: Text('Hello, world!')),
      floatingActionButton: const FloatingActionButton(
        tooltip: 'Add', // used by assistive technologies
        onPressed: null,
        child: Icon(Icons.add),
      ),
    );
  }
}
```

現在，程式碼已經從 `MyAppBar` 和 `MyScaffold` 切換為 [`AppBar`][`AppBar`] 和 [`Scaffold`][`Scaffold`] 元件 (Widgets)，以及從 `material.dart`，讓應用程式開始更有 Material 的風格。例如，應用程式列（app bar）現在有陰影，標題文字也會自動繼承正確的樣式。此外，也新增了一個浮動操作按鈕（Floating Action Button）。

請注意，元件 (Widgets) 可以作為參數傳遞給其他元件。例如，[`Scaffold`][`Scaffold`] 元件會以具名參數的方式接收多個不同的元件，每個元件都會被放置在 `Scaffold` 版面配置中的適當位置。類似地，[`AppBar`][`AppBar`] 元件允許你傳入 [`leading`][`leading`] 元件，以及 [`actions`][`actions`] 到 [`title`][`title`] 元件。這種設計模式在整個框架中反覆出現，也是你在設計自訂元件時可以考慮的做法。

如需更多資訊，請參考 [Material Components widgets][Material Components widgets]。

:::note
Material 是 Flutter 內建的兩種設計風格之一。
如果你想打造以 iOS 為主的設計風格，
請參考 [Cupertino components][Cupertino components] 套件，
它提供了自己的 [`CupertinoApp`][`CupertinoApp`] 和 [`CupertinoNavigationBar`][`CupertinoNavigationBar`] 版本。
:::


## 處理手勢

大多數應用程式都包含某種形式的使用者與系統互動。
建立互動式應用程式的第一步，就是偵測輸入手勢。你可以透過建立一個簡單的按鈕來了解其運作方式：

<?code-excerpt "lib/main_mybutton.dart"?>
```dartpad title="Flutter button hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class MyButton extends StatelessWidget {
  const MyButton({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        print('MyButton was tapped!');
      },
      child: Container(
        height: 50,
        padding: const EdgeInsets.all(8),
        margin: const EdgeInsets.symmetric(horizontal: 8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5),
          color: Colors.lightGreen[500],
        ),
        child: const Center(child: Text('Engage')),
      ),
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(body: Center(child: MyButton())),
    ),
  );
}
```

[`GestureDetector`][`GestureDetector`] 元件本身沒有視覺化的呈現，而是用來偵測使用者的手勢操作。  
當使用者在 [`Container`][`Container`] 上點擊時，`GestureDetector` 會呼叫它的 [`onTap()`][`onTap()`] callback，此例中會在主控台印出一則訊息。  
你可以使用 `GestureDetector` 來偵測各種輸入手勢，包括點擊（tap）、拖曳（drag）和縮放（scale）等。

許多元件會使用 [`GestureDetector`][`GestureDetector`] 來為其他元件提供可選的 callback。  
例如，[`IconButton`][`IconButton`]、[`ElevatedButton`][`ElevatedButton`] 和 [`FloatingActionButton`][`FloatingActionButton`] 元件都有 [`onPressed()`][`onPressed()`] callback，當使用者點擊該元件時就會被觸發。

如需更多資訊，請參考 [Gestures in Flutter][Gestures in Flutter]。

## 根據輸入變更元件

目前為止，本頁僅使用了 stateless 元件。  
Stateless 元件會從其父元件接收參數，並將這些參數儲存在 [`final`][`final`] 成員變數中。  
當元件被要求 [`build()`][`build()`] 時，會利用這些已儲存的值來推導出它所建立的其他元件的新參數。

為了建立更複雜的互動體驗——例如，對使用者輸入做出更豐富的反應——應用程式通常需要攜帶一些狀態（state）。  
Flutter 使用 `StatefulWidgets` 來實現這個概念。`StatefulWidgets` 是一種特殊的元件，它知道如何產生 `State` 物件，而這些物件則用來儲存狀態。  
請參考這個基本範例，使用前面提到的 [`ElevatedButton`][`ElevatedButton`]：

<?code-excerpt "lib/main_counter.dart"?>
```dartpad title="Flutter state management hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class Counter extends StatefulWidget {
  // This class is the configuration for the state.
  // It holds the values (in this case nothing) provided
  // by the parent and used by the build  method of the
  // State. Fields in a Widget subclass are always marked
  // "final".

  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      // This call to setState tells the Flutter framework
      // that something has changed in this State, which
      // causes it to rerun the build method below so that
      // the display can reflect the updated values. If you
      // change _counter without calling setState(), then
      // the build method won't be called again, and so
      // nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called,
    // for instance, as done by the _increment method above.
    // The Flutter framework has been optimized to make
    // rerunning build methods fast, so that you can just
    // rebuild anything that needs updating rather than
    // having to individually changes instances of widgets.
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        ElevatedButton(onPressed: _increment, child: const Text('Increment')),
        const SizedBox(width: 16),
        Text('Count: $_counter'),
      ],
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(body: Center(child: Counter())),
    ),
  );
}
```

你可能會好奇，為什麼 `StatefulWidget` 和 `State` 會是分開的物件。

在 Flutter 中，這兩種類型的物件有不同的生命週期。

`Widgets` 是暫時性的物件，用於構建應用程式在當前狀態下的呈現。而 `State` 物件則在每次呼叫 `build()` 時會持續存在，因此能夠記住資訊。

上面的範例會接受使用者輸入，並直接在其 `build()` 方法中使用這個結果。

在更複雜的應用程式中，元件（widget）階層的不同部分可能會負責不同的功能；例如，一個元件可能會呈現一個複雜的使用者介面，目的是收集特定資訊（例如日期或地點），而另一個元件則可能會利用這些資訊來改變整體的呈現方式。

在 Flutter 中，變更通知會透過回呼（callback）「向上」流動至元件階層，而當前狀態則會「向下」傳遞到負責呈現的 stateless 元件。

負責重新導向這種資料流動的共同父元件是 `State`。

以下這個稍微複雜一點的範例展示了這種機制在實際中的運作方式：

<?code-excerpt "lib/main_counterdisplay.dart"?>
```dartpad title="Flutter Hello World hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class CounterDisplay extends StatelessWidget {
  const CounterDisplay({required this.count, super.key});

  final int count;

  @override
  Widget build(BuildContext context) {
    return Text('Count: $count');
  }
}

class CounterIncrementor extends StatelessWidget {
  const CounterIncrementor({required this.onPressed, super.key});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(onPressed: onPressed, child: const Text('Increment'));
  }
}

class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      ++_counter;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        CounterIncrementor(onPressed: _increment),
        const SizedBox(width: 16),
        CounterDisplay(count: _counter),
      ],
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(body: Center(child: Counter())),
    ),
  );
}
```

請注意這裡建立了兩個新的無狀態元件 (stateless widgets)，
將「_顯示_」計數器（`CounterDisplay`）與「_變更_」計數器（`CounterIncrementor`）的職責清楚分離。
雖然最終效果與前一個範例相同，
但這種職責分離讓更高的複雜度可以封裝在各自的元件中，
同時維持父元件的簡潔。

如需更多資訊，請參考：

* [`StatefulWidget`][`StatefulWidget`]
* [`setState()`][`setState()`]

## 整合所有概念

接下來是一個更完整的範例，將這些概念整合起來：一個假想的購物應用程式會顯示各種待售商品，並維護一個購物車以儲存預計購買的商品。首先定義展示用的類別 `ShoppingListItem`：

<?code-excerpt "lib/main_shoppingitem.dart"?>
```dartpad title="Flutter complete shopping list item hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class Product {
  const Product({required this.name});

  final String name;
}

typedef CartChangedCallback = void Function(Product product, bool inCart);

class ShoppingListItem extends StatelessWidget {
  ShoppingListItem({
    required this.product,
    required this.inCart,
    required this.onCartChanged,
  }) : super(key: ObjectKey(product));

  final Product product;
  final bool inCart;
  final CartChangedCallback onCartChanged;

  Color _getColor(BuildContext context) {
    // The theme depends on the BuildContext because different
    // parts of the tree can have different themes.
    // The BuildContext indicates where the build is
    // taking place and therefore which theme to use.

    return inCart //
        ? Colors.black54
        : Theme.of(context).primaryColor;
  }

  TextStyle? _getTextStyle(BuildContext context) {
    if (!inCart) return null;

    return const TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: () {
        onCartChanged(product, inCart);
      },
      leading: CircleAvatar(
        backgroundColor: _getColor(context),
        child: Text(product.name[0]),
      ),
      title: Text(product.name, style: _getTextStyle(context)),
    );
  }
}

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Center(
          child: ShoppingListItem(
            product: const Product(name: 'Chips'),
            inCart: true,
            onCartChanged: (product, inCart) {},
          ),
        ),
      ),
    ),
  );
}
```

`ShoppingListItem` 元件遵循了一個常見的無狀態元件（stateless widget）設計模式。它會將在建構函式中接收到的值，儲存在 [`final`][`final`] 成員變數中，然後在其 [`build()`][`build()`] 函式中使用這些變數。

例如，`inCart` 布林值用來在兩種不同的視覺外觀之間切換：一種使用當前主題的主色（primary color），另一種則使用灰色。

當使用者點擊清單項目時，該元件不會直接修改其 `inCart` 值。相反地，元件會呼叫從父元件接收到的 `onCartChanged` 函式。

這種設計模式讓你可以將狀態儲存在元件階層較高的位置，這樣狀態就能持續更長的時間。在極端情況下，儲存在傳遞給 [`runApp()`][`runApp()`] 的元件上的狀態，會在應用程式的整個生命週期內持續存在。

當父元件收到 `onCartChanged` 回呼時，父元件會更新其內部狀態，這會觸發父元件重新建構，並以新的 `inCart` 值建立一個新的 `ShoppingListItem` 實例。

雖然父元件在重新建構時會建立一個新的 `ShoppingListItem` 實例，但這個操作是高效的，因為框架會將新建構的元件與先前建構的元件進行比較，只將差異套用到底層的 [`RenderObject`][`RenderObject`]。

以下是一個儲存可變狀態的父元件範例：

<?code-excerpt "lib/main_shoppinglist.dart"?>
```dartpad title="Flutter storing mutable state hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class Product {
  const Product({required this.name});

  final String name;
}

typedef CartChangedCallback = void Function(Product product, bool inCart);

class ShoppingListItem extends StatelessWidget {
  ShoppingListItem({
    required this.product,
    required this.inCart,
    required this.onCartChanged,
  }) : super(key: ObjectKey(product));

  final Product product;
  final bool inCart;
  final CartChangedCallback onCartChanged;

  Color _getColor(BuildContext context) {
    // The theme depends on the BuildContext because different
    // parts of the tree can have different themes.
    // The BuildContext indicates where the build is
    // taking place and therefore which theme to use.

    return inCart //
        ? Colors.black54
        : Theme.of(context).primaryColor;
  }

  TextStyle? _getTextStyle(BuildContext context) {
    if (!inCart) return null;

    return const TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: () {
        onCartChanged(product, inCart);
      },
      leading: CircleAvatar(
        backgroundColor: _getColor(context),
        child: Text(product.name[0]),
      ),
      title: Text(product.name, style: _getTextStyle(context)),
    );
  }
}

class ShoppingList extends StatefulWidget {
  const ShoppingList({required this.products, super.key});

  final List<Product> products;

  // The framework calls createState the first time
  // a widget appears at a given location in the tree.
  // If the parent rebuilds and uses the same type of
  // widget (with the same key), the framework re-uses
  // the State object instead of creating a new State object.

  @override
  State<ShoppingList> createState() => _ShoppingListState();
}

class _ShoppingListState extends State<ShoppingList> {
  final _shoppingCart = <Product>{};

  void _handleCartChanged(Product product, bool inCart) {
    setState(() {
      // When a user changes what's in the cart, you need
      // to change _shoppingCart inside a setState call to
      // trigger a rebuild.
      // The framework then calls build, below,
      // which updates the visual appearance of the app.

      if (!inCart) {
        _shoppingCart.add(product);
      } else {
        _shoppingCart.remove(product);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Shopping List')),
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: 8),
        children: widget.products.map((product) {
          return ShoppingListItem(
            product: product,
            inCart: _shoppingCart.contains(product),
            onCartChanged: _handleCartChanged,
          );
        }).toList(),
      ),
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      title: 'Shopping App',
      home: ShoppingList(
        products: [
          Product(name: 'Eggs'),
          Product(name: 'Flour'),
          Product(name: 'Chocolate chips'),
        ],
      ),
    ),
  );
}
```

`ShoppingList` 類別繼承自 [`StatefulWidget`][`StatefulWidget`]，  
這代表此元件（Widget）會儲存可變狀態。  
當 `ShoppingList` 元件首次被插入到樹中時，框架會呼叫 [`createState()`][`createState()`] 函式，  
以建立一個全新的 `_ShoppingListState` 實例，並將其與該樹中的位置關聯。（請注意，[`State`][`State`] 的子類別通常會以底線開頭命名，以表示它們是私有的實作細節。）  
當此元件的父元件重建時，父元件會建立一個新的 `ShoppingList` 實例，但框架會重複使用已經存在於樹中的 `_ShoppingListState` 實例，而不會再次呼叫 `createState`。

若要存取目前 `ShoppingList` 的屬性，`_ShoppingListState` 可以使用其 [`widget`][`widget`] 屬性。  
如果父元件重建並建立新的 `ShoppingList`，`_ShoppingListState` 會使用新的元件值進行重建。  
如果你希望在 `widget` 屬性變更時收到通知，請覆寫 [`didUpdateWidget()`][`didUpdateWidget()`] 函式，該函式會傳入一個 `oldWidget`，讓你可以比較舊的元件與目前的元件。

當處理 `onCartChanged` 回呼時，`_ShoppingListState` 會透過新增或移除 `_shoppingCart` 中的產品來變更其內部狀態。  
為了通知框架其內部狀態已變更，這些操作需包裹在 [`setState()`][`setState()`] 呼叫中。  
呼叫 `setState` 會將此元件標記為「髒污」（dirty），並排程於下次應用程式需要更新畫面時重建。  
如果你在修改元件的內部狀態時忘記呼叫 `setState`，框架將無法得知你的元件已髒污，可能不會呼叫元件的 [`build()`][`build()`] 函式，這會導致使用者介面無法反映狀態的變更。  
透過這種方式管理狀態，你無需為建立和更新子元件分別撰寫程式碼，只需實作 `build` 函式即可，同時處理這兩種情境。

## 回應元件生命週期事件

在 `StatefulWidget` 上呼叫 [`createState()`][`createState()`] 之後，  
框架會將新的狀態物件插入樹中，然後在該狀態物件上呼叫 [`initState()`][`initState()`]。  
[`State`][`State`] 的子類別可以覆寫 `initState` 來執行僅需發生一次的工作。  
例如，覆寫 `initState` 以設定動畫或訂閱平台服務。  
`initState` 的實作必須以呼叫 `super.initState` 作為開頭。

當某個狀態物件不再需要時，  
框架會在該狀態物件上呼叫 [`dispose()`][`dispose()`]。  
請覆寫 `dispose` 函式以進行清理工作。  
例如，覆寫 `dispose` 以取消計時器或取消訂閱平台服務。  
`dispose` 的實作通常會在結尾呼叫 `super.dispose`。

如需更多資訊，請參閱 [`State`][`State`]。

## Keys（鍵值）

使用 key 來控制框架在元件重建時，如何將元件與其他元件配對。  
預設情況下，框架會根據元件的 [`runtimeType`][`runtimeType`] 以及它們出現的順序，將目前與先前建構的元件進行配對。  
有了 key，框架要求兩個元件除了要有相同的 [`key`][`key`] 外，還必須有相同的 `runtimeType`。

key 在那些會建立多個相同型態元件的元件中特別有用。  
例如，`ShoppingList` 元件會建立剛好足夠的 `ShoppingListItem` 實例來填滿其可見區域：

 * 沒有 key 時，目前建構的第一個項目總會與先前建構的第一個項目同步，  
   即使在語意上，清單的第一個項目其實已經滾動出畫面且不再可見。

 * 若為清單中的每個項目分配一個「語意」key，  
   無限清單會更有效率，因為框架會將具有相同語意 key 的項目同步，  
   這些項目通常有相似（甚至相同）的視覺外觀。  
   此外，語意同步項目意味著，狀態會保留在有狀態的子元件上，  
   並且會附加在相同語意的項目上，而不是僅僅依照畫面中的數值位置。

如需更多資訊，請參閱 [`Key`][`Key`] API。

## Global keys（全域鍵值）

使用 global key（全域鍵值）來唯一識別子元件。  
global key 必須在整個元件階層中保持全域唯一，  
而 local key（區域鍵值）只需在同層兄弟元件間唯一即可。  
由於 global key 是全域唯一的，因此可以用來取得與元件關聯的狀態。

如需更多資訊，請參閱 [`GlobalKey`][`GlobalKey`] API。

[`actions`]: {{site.api}}/flutter/material/AppBar-class.html#actions
[adding interactivity to your Flutter app]: /ui/interactivity
[`AppBar`]: {{site.api}}/flutter/material/AppBar-class.html
[`BoxDecoration`]: {{site.api}}/flutter/painting/BoxDecoration-class.html
[`build()`]: {{site.api}}/flutter/widgets/StatelessWidget/build.html
[building layouts]: /ui/layout
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`createState()`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html#createState
[Cupertino components]: /ui/widgets/cupertino
[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`CupertinoNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoNavigationBar-class.html
[`didUpdateWidget()`]: {{site.api}}/flutter/widgets/State-class.html#didUpdateWidget
[`dispose()`]: {{site.api}}/flutter/widgets/State-class.html#dispose
[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
[`final`]: {{site.dart-site}}/language/variables#final-and-const
[`flex`]: {{site.api}}/flutter/widgets/Expanded-class.html#flex
[`FloatingActionButton`]: {{site.api}}/flutter/material/FloatingActionButton-class.html
[Gestures in Flutter]: /ui/interactivity/gestures
[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[`GlobalKey`]: {{site.api}}/flutter/widgets/GlobalKey-class.html
[`IconButton`]: {{site.api}}/flutter/material/IconButton-class.html
[`initState()`]: {{site.api}}/flutter/widgets/State-class.html#initState
[`key`]: {{site.api}}/flutter/widgets/Widget-class.html#key
[`Key`]: {{site.api}}/flutter/foundation/Key-class.html
[Layouts]: /ui/widgets/layout
[`leading`]: {{site.api}}/flutter/material/AppBar-class.html#leading
[Material Components widgets]: /ui/widgets/material
[Material icons]: https://design.google.com/icons/
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`onPressed()`]: {{site.api}}/flutter/material/ElevatedButton-class.html#onPressed
[`onTap()`]: {{site.api}}/flutter/widgets/GestureDetector-class.html#onTap
[`Positioned`]: {{site.api}}/flutter/widgets/Positioned-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[React]: https://react.dev
[`RenderObject`]: {{site.api}}/flutter/rendering/RenderObject-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`runApp()`]: {{site.api}}/flutter/widgets/runApp.html
[`runtimeType`]: {{site.api}}/flutter/widgets/Widget-class.html#runtimeType
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`setState()`]: {{site.api}}/flutter/widgets/State/setState.html
[`Stack`]: {{site.api}}/flutter/widgets/Stack-class.html
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[`title`]: {{site.api}}/flutter/material/AppBar-class.html#title
[`widget`]: {{site.api}}/flutter/widgets/State-class.html#widget
[`Widget`]: {{site.api}}/flutter/widgets/Widget-class.html
