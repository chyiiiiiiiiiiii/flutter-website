# 使用 Flutter 建立使用者介面

> Flutter 使用者介面開發簡介。



<?code-excerpt path-base="ui/widgets_intro/"?>

Flutter 元件 (Widget) 是利用現代化框架所建構，其靈感來自 [React][]。核心理念是你可以利用元件 (Widget) 來組建你的 UI。元件會根據其目前的設定與狀態，描述它們應該呈現的視圖樣貌。當元件的狀態發生變化時，該元件會重新建立其描述，框架則會將新的描述與先前的描述進行差異比較，以決定底層渲染樹（render tree）中所需的最小變更，以便從一個狀態平滑過渡到下一個狀態。

:::note
如果你想透過實作程式碼來更深入了解 Flutter，歡迎參考[建立版面配置][building layouts]，以及[為你的 Flutter 應用程式加入互動功能][adding interactivity to your Flutter app]。
:::

## Hello world

最簡單的 Flutter 應用程式只需呼叫 [`runApp()`][]
函式並傳入一個元件 (Widget)：

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

`runApp()` 函式會接收給定的 [`Widget`][]，並將其設為元件樹（widget tree）的根節點。在此範例中，元件樹包含兩個元件，分別是 [`Center`][] 元件以及其子元件 [`Text`][]。框架會強制根元件覆蓋整個螢幕，因此文字 "Hello, world" 最終會置中顯示在螢幕上。在這個例子中，必須指定文字方向；當你使用 `MaterialApp` 元件時，這部分會自動處理，稍後會有相關示範。

在撰寫應用程式時，你通常會建立新的元件，這些元件會繼承自 [`StatelessWidget`][] 或 [`StatefulWidget`][]，取決於你的元件是否需要管理狀態。元件的主要工作是實作 [`build()`][] 函式，該函式會以其他較低階的元件來描述此元件。框架會依序建置這些元件，直到最底層的元件，這些元件代表底層的 [`RenderObject`][]，負責計算並描述元件的幾何形狀。

## 基本元件（Basic widgets）

Flutter 提供了一套強大的基本元件（Basic widgets），其中以下幾個是最常用的：

**[`Text`][]**
: `Text` 元件可讓你在應用程式中建立一段具備樣式的文字。

**[`Row`][], [`Column`][]**
: 這些彈性元件（flex widgets）可讓你在水平方向（`Row`）與垂直方向（`Column`）建立彈性的版面配置。這些物件的設計是基於網頁的 flexbox 版面配置模型。

**[`Stack`][]**
: `Stack` 元件不是線性排列（不論是水平還是垂直），而是允許你依繪製順序將元件堆疊在彼此之上。你可以在 `Stack` 的子元件上使用 [`Positioned`][] 元件，將它們相對於堆疊的上、右、下或左邊緣定位。Stack 以網頁的絕對定位（absolute positioning）版面配置模型為基礎。

**[`Container`][]**
: `Container` 元件可讓你建立一個矩形的視覺元素。Container 可以使用 [`BoxDecoration`][] 進行裝飾，例如背景、邊框或陰影。`Container` 也可以設定外距（margin）、內距（padding）以及尺寸限制（constraints）。此外，`Container` 還可以透過矩陣進行三維空間的變形。

以下是一些結合這些及其他元件的簡單元件範例：

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

請確保在 `pubspec.yaml` 檔案的 `flutter` 區段中有 `uses-material-design: true` 這一項。這樣可以讓你使用預先定義的 [Material icons][]。如果你正在使用 Materials 函式庫，通常建議加入這一行。

```yaml
name: my_app
flutter:
  uses-material-design: true
```

許多 Material Design 元件需要放在 [`MaterialApp`][] 內部，才能正確顯示並繼承主題資料。因此，請使用 `MaterialApp` 來執行應用程式。

`MyAppBar` 元件會建立一個 [`Container`][]，其高度為 56 個裝置獨立像素，左右兩側各有 8 像素的內距（padding）。在這個容器內，`MyAppBar` 使用 [`Row`][] 版面配置來組織其子元件。中間的子元件，也就是 `title` 元件，被標記為 [`Expanded`][]，這表示它會擴展以填滿尚未被其他子元件佔用的剩餘空間。你可以有多個 `Expanded` 子元件，並可透過 `Expanded` 的 [`flex`][] 參數來決定它們分配剩餘空間的比例。

`MyScaffold` 元件會將其子元件以垂直欄（column）排列。在欄的最上方會放置一個 `MyAppBar` 實例，並將 [`Text`][] 元件作為標題傳遞給 app bar。將元件作為參數傳遞給其他元件是一個強大的技巧，可以讓你建立通用且能以多種方式重複使用的元件。最後，`MyScaffold` 使用 [`Expanded`][] 來用其主體填滿剩餘空間，而主體內容是一則置中的訊息。

如需更多資訊，請參閱 [Layouts][]。

## 使用 Material 元件

Flutter 提供多種元件，協助你打造符合 Material Design 的應用程式。Material 應用程式從 [`MaterialApp`][] 元件開始，該元件會在你的應用程式根部建立多個實用元件，包括 [`Navigator`][]，它會管理一個以字串識別的元件堆疊，也就是所謂的「路由」。`Navigator` 讓你能在應用程式的不同螢幕間順暢切換。使用 [`MaterialApp`][] 元件並非強制，但這是一個良好的實作習慣。

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

現在，程式碼已經從 `MyAppBar` 和 `MyScaffold` 切換為 [`AppBar`][] 和 [`Scaffold`][] 元件，以及從 `material.dart`，讓應用程式開始更有 Material 的風格。
例如，應用程式列（app bar）現在有陰影，標題文字也會自動繼承正確的樣式。此外，也新增了一個浮動操作按鈕（floating action button）。

請注意，元件可以作為參數傳遞給其他元件。
[`Scaffold`][] 元件會以命名參數的方式接收多個不同的元件，每個元件都會被放置在 `Scaffold` 版面配置中的適當位置。類似地，[`AppBar`][] 元件允許你傳入 [`leading`][] 元件，以及 [`title`][] 元件的 [`actions`][]。
這種設計模式在整個框架中反覆出現，當你設計自己的元件時，也可以考慮採用這種方式。

如需更多資訊，請參閱 [Material Components widgets][]。

:::note
Material 是 Flutter 內建的兩種設計風格之一。
若要建立以 iOS 為主的設計，請參考 [Cupertino components][] 套件，
該套件有自己的 [`CupertinoApp`][] 和 [`CupertinoNavigationBar`][] 版本。
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

[`GestureDetector`][] 元件沒有視覺上的呈現，而是用來偵測使用者所做的手勢。
當使用者點擊 [`Container`][] 時，`GestureDetector` 會呼叫其 [`onTap()`][] 回呼（callback），在這個例子中則是在主控台印出訊息。
你可以使用 `GestureDetector` 來偵測各種輸入手勢，包括點擊（tap）、拖曳（drag）和縮放（scale）等。

許多元件會使用 [`GestureDetector`][] 來為其他元件提供可選的回呼函式。
舉例來說，[`IconButton`][]、[`ElevatedButton`][] 和
[`FloatingActionButton`][] 這些元件都有 [`onPressed()`][]
回呼函式，當使用者點擊該元件時就會被觸發。

如需更多資訊，請參閱 [Gestures in Flutter][]。

## 根據輸入變更元件

到目前為止，本頁僅使用了無狀態元件（stateless widgets）。
無狀態元件會從其父元件接收參數，並將這些參數儲存在 [`final`][] 成員變數中。
當元件被要求 [`build()`][] 時，會利用這些儲存的值來推導出它所建立的元件的新參數。

為了建構更複雜的體驗&mdash;例如，對使用者輸入做出更有趣的反應&mdash;應用程式
通常會帶有某些狀態。Flutter 使用 `StatefulWidgets` 來實現這個概念。`StatefulWidgets` 是一種特殊的元件，能夠產生 `State` 物件，這些物件則用來儲存狀態。
請參考這個基本範例，使用前面提到的 [`ElevatedButton`][]：

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

你可能會好奇，為什麼 `StatefulWidget` 和 `State` 是分開的物件。
在 Flutter 中，這兩種類型的物件有不同的生命週期。
`Widgets` 是暫時性的物件，用於構建應用程式當前狀態下的呈現方式。而 `State` 物件則會在每次呼叫
`build()` 時持續存在，讓它們能夠記住資訊。

上面的範例接受使用者輸入，並直接在其 `build()` 方法中使用結果。在更複雜的應用程式中，
元件階層中的不同部分可能負責不同的職責；例如，一個
元件可能會呈現一個複雜的使用者介面
以收集特定資訊（如日期或地點），而另一個元件則可能
使用這些資訊來改變整體的呈現方式。

在 Flutter 中，變更通知會透過回呼（callback）「向上」流動至元件
階層，而當前狀態則會「向下」傳遞給負責呈現的無狀態元件（stateless widgets）。
負責重新導向這個流程的共同父元件是 `State`。
以下這個稍微複雜一點的範例展示了這個機制在實際運作時的情況：

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

請注意，這裡建立了兩個新的無狀態元件（stateless widgets），
將「_顯示_」計數器（`CounterDisplay`）與「_變更_」計數器（`CounterIncrementor`）的職責清楚分離。
雖然最終結果與前一個範例相同，
但這種職責分離讓更複雜的邏輯可以封裝在各自的元件中，
同時保持父元件的簡潔。

如需更多資訊，請參考：

* [`StatefulWidget`][]
* [`setState()`][]

## 整合所有概念

接下來是一個更完整的範例，將這些概念整合起來：一個假想的購物應用程式會顯示各種待售商品，並維護一個購物車以供使用者選購。首先，定義呈現用的類別
`ShoppingListItem`：

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

`ShoppingListItem` 元件遵循無狀態元件（stateless widgets）的常見設計模式。它會將建構函式收到的值，儲存在 [`final`][] 成員變數中，並在其 [`build()`][] 函式中使用這些值。
例如，`inCart` 布林值可在兩種視覺外觀之間切換：一種使用目前主題的主色，另一種則使用灰色。

當使用者點擊清單項目時，該元件不會直接修改其 `inCart` 值。相反地，元件會呼叫從父元件接收到的
`onCartChanged` 函式。這種設計模式讓你可以將狀態儲存在元件階層（widget hierarchy）較高的地方，讓狀態能夠持續更長的時間。
在極端情況下，儲存在傳遞給
[`runApp()`][] 的元件上的狀態，會在整個應用程式生命週期內持續存在。

當父元件收到 `onCartChanged` 回呼時，
父元件會更新其內部狀態，這會觸發
父元件重新建置（rebuild），並以新的 `inCart` 值建立新的
`ShoppingListItem` 實例。
雖然父元件在重新建置時會建立新的
`ShoppingListItem` 實例，但這個操作是輕量的，因為框架會將新建構的元件與先前建構的元件進行比較，並僅將差異套用到底層的
[`RenderObject`][]。

以下是一個儲存可變狀態（mutable state）的父元件範例：

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

`ShoppingList` 類別繼承自 [`StatefulWidget`][]，
這表示此元件會儲存可變狀態。
當 `ShoppingList` 元件首次插入到樹狀結構中時，框架會呼叫 [`createState()`][] 函式，
以建立一個全新的 `_ShoppingListState` 實例，並將其與該樹中對應的位置關聯。
（請注意，[`State`][] 的子類別通常會以底線開頭命名，
以表示它們是私有的實作細節。）
當此元件的父元件重建時，父元件會建立一個新的 `ShoppingList` 實例，
但框架會重複使用已經存在於樹中的 `_ShoppingListState` 實例，而不會再次呼叫 `createState`。

若要存取目前 `ShoppingList` 的屬性，
`_ShoppingListState` 可以使用其 [`widget`][] 屬性。
如果父元件重建並建立了一個新的 `ShoppingList`，
`_ShoppingListState` 會以新的元件值重建。
如果你希望在 `widget` 屬性變更時收到通知，
可以覆寫 [`didUpdateWidget()`][] 函式，該函式會傳入一個 `oldWidget`，
讓你可以比較舊的元件與目前的元件。

當處理 `onCartChanged` 回呼時，`_ShoppingListState`
會透過新增或移除 `_shoppingCart` 中的產品來改變其內部狀態。
為了向框架通知其內部狀態已變更，這些呼叫會包裹在 [`setState()`][] 呼叫中。
呼叫 `setState` 會將此元件標記為「髒」狀態，並排程於下次應用程式需要更新螢幕時重建。
如果你在修改元件的內部狀態時忘記呼叫 `setState`，
框架將不會知道你的元件已經變髒，
也可能不會呼叫該元件的 [`build()`][] 函式，
這代表使用者介面可能無法即時反映狀態的變更。透過這種方式管理狀態，你不需要為建立和更新子元件撰寫額外程式碼，
只需實作 `build` 函式即可同時處理這兩種情境。

## 回應元件生命週期事件

在 `StatefulWidget` 上呼叫 [`createState()`][] 後，
框架會將新的狀態物件插入樹中，
然後在該狀態物件上呼叫 [`initState()`][]。
[`State`][] 的子類別可以覆寫 `initState`，以執行僅需執行一次的工作。
例如，可以覆寫 `initState` 來設定動畫（Animation）或訂閱平台服務。
`initState` 的實作必須一開始就呼叫 `super.initState`。

當狀態物件不再需要時，
框架會在該狀態物件上呼叫 [`dispose()`][]。
可以覆寫 `dispose` 函式來進行清理工作。
例如，覆寫 `dispose` 以取消計時器或取消訂閱平台服務。
`dispose` 的實作通常會在結尾呼叫 `super.dispose`。

如需更多資訊，請參閱 [`State`][]。

## Keys（鍵值）

使用 key 來控制框架在元件重建時，
如何將元件與其他元件配對。預設情況下，
框架會根據元件的 [`runtimeType`][] 以及它們出現的順序，
來比對目前與前一次建構的元件。
有了 key，框架會要求兩個元件除了要有相同的 [`key`][]，
還必須有相同的 `runtimeType`。

key 在建立多個相同型別元件的情境中特別有用。
例如，`ShoppingList` 元件只會建立足夠的 `ShoppingListItem` 實例來填滿可見區域：

 * 沒有 key 時，目前建構中的第一個項目總是會與前一次建構的第一個項目同步，
   即使在語意上，清單的第一個項目其實已經滑出螢幕、在檢視區域中不可見。

 * 若為清單中的每個項目分配一個「語意」key，
   則無限清單可以更有效率，因為框架會同步具有相同語意 key 的項目，
   因此它們會有相似（甚至相同）的視覺外觀。
   此外，語意同步項目意味著，
   狀態會保留在有狀態的子元件上，並繫結於相同語意的項目，
   而不是僅僅依賴於檢視區域中的數值位置。

如需更多資訊，請參閱 [`Key`][] API。

## Global keys（全域 key）

使用全域 key 來唯一識別子元件。
全域 key 必須在整個元件階層中全域唯一，
而本地 key 只需在同層兄弟元件之間唯一即可。
由於全域唯一，全域 key 可用於檢索與元件關聯的狀態。

如需更多資訊，請參閱 [`GlobalKey`][] API。

[`actions`]: https://api.flutter.dev/flutter/material/AppBar-class.html#actions
[adding interactivity to your Flutter app]: /ui/interactivity
[`AppBar`]: https://api.flutter.dev/flutter/material/AppBar-class.html
[`BoxDecoration`]: https://api.flutter.dev/flutter/painting/BoxDecoration-class.html
[`build()`]: https://api.flutter.dev/flutter/widgets/StatelessWidget/build.html
[building layouts]: /ui/layout
[`Center`]: https://api.flutter.dev/flutter/widgets/Center-class.html
[`Column`]: https://api.flutter.dev/flutter/widgets/Column-class.html
[`Container`]: https://api.flutter.dev/flutter/widgets/Container-class.html
[`createState()`]: https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html#createState
[Cupertino components]: /ui/widgets/cupertino
[`CupertinoApp`]: https://api.flutter.dev/flutter/cupertino/CupertinoApp-class.html
[`CupertinoNavigationBar`]: https://api.flutter.dev/flutter/cupertino/CupertinoNavigationBar-class.html
[`didUpdateWidget()`]: https://api.flutter.dev/flutter/widgets/State-class.html#didUpdateWidget
[`dispose()`]: https://api.flutter.dev/flutter/widgets/State-class.html#dispose
[`Expanded`]: https://api.flutter.dev/flutter/widgets/Expanded-class.html
[`final`]: https://dart.dev/language/variables#final-and-const
[`flex`]: https://api.flutter.dev/flutter/widgets/Expanded-class.html#flex
[`FloatingActionButton`]: https://api.flutter.dev/flutter/material/FloatingActionButton-class.html
[Gestures in Flutter]: /ui/interactivity/gestures
[`GestureDetector`]: https://api.flutter.dev/flutter/widgets/GestureDetector-class.html
[`GlobalKey`]: https://api.flutter.dev/flutter/widgets/GlobalKey-class.html
[`IconButton`]: https://api.flutter.dev/flutter/material/IconButton-class.html
[`initState()`]: https://api.flutter.dev/flutter/widgets/State-class.html#initState
[`key`]: https://api.flutter.dev/flutter/widgets/Widget-class.html#key
[`Key`]: https://api.flutter.dev/flutter/foundation/Key-class.html
[Layouts]: /ui/widgets/layout
[`leading`]: https://api.flutter.dev/flutter/material/AppBar-class.html#leading
[Material Components widgets]: /ui/widgets/material
[Material icons]: https://design.google.com/icons/
[`MaterialApp`]: https://api.flutter.dev/flutter/material/MaterialApp-class.html
[`Navigator`]: https://api.flutter.dev/flutter/widgets/Navigator-class.html
[`onPressed()`]: https://api.flutter.dev/flutter/material/ElevatedButton-class.html#onPressed
[`onTap()`]: https://api.flutter.dev/flutter/widgets/GestureDetector-class.html#onTap
[`Positioned`]: https://api.flutter.dev/flutter/widgets/Positioned-class.html
[`ElevatedButton`]: https://api.flutter.dev/flutter/material/ElevatedButton-class.html
[React]: https://react.dev
[`RenderObject`]: https://api.flutter.dev/flutter/rendering/RenderObject-class.html
[`Row`]: https://api.flutter.dev/flutter/widgets/Row-class.html
[`runApp()`]: https://api.flutter.dev/flutter/widgets/runApp.html
[`runtimeType`]: https://api.flutter.dev/flutter/widgets/Widget-class.html#runtimeType
[`Scaffold`]: https://api.flutter.dev/flutter/material/Scaffold-class.html
[`setState()`]: https://api.flutter.dev/flutter/widgets/State/setState.html
[`Stack`]: https://api.flutter.dev/flutter/widgets/Stack-class.html
[`State`]: https://api.flutter.dev/flutter/widgets/State-class.html
[`StatefulWidget`]: https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html
[`StatelessWidget`]: https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html
[`Text`]: https://api.flutter.dev/flutter/widgets/Text-class.html
[`title`]: https://api.flutter.dev/flutter/material/AppBar-class.html#title
[`widget`]: https://api.flutter.dev/flutter/widgets/State-class.html#widget
[`Widget`]: https://api.flutter.dev/flutter/widgets/Widget-class.html

