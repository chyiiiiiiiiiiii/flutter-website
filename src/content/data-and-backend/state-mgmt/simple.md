---
title: 簡單的應用程式狀態管理
description: 一種簡單的狀態管理方式。
prev:
  title: 短暫狀態與應用程式狀態
  path: /data-and-backend/state-mgmt/ephemeral-vs-app
next:
  title: 方法列表
  path: /data-and-backend/state-mgmt/options
---

<?code-excerpt path-base="state_mgmt/simple/"?>

現在你已經了解了[宣告式 UI 程式設計][declarative UI programming]
以及[短暫狀態與應用程式狀態的差異][ephemeral and app state]，
你已經準備好學習簡單的應用程式狀態管理了。

在本頁中，我們將會使用 `provider` 套件。
如果你是 Flutter 新手，且沒有強烈理由選擇其他方法
（如 Redux、Rx、hooks 等），這大概是你最適合入門的方式。
`provider` 套件容易理解，且所需程式碼不多。
它也使用了在其他方法中都適用的觀念。

話雖如此，如果你在其他反應式框架中有豐富的狀態管理經驗，
你可以在[方法選擇頁][options page]找到相關套件與教學。

## 我們的範例

<img src='/assets/images/docs/development/data-and-backend/state-mgmt/model-shopper-screencast.webp' alt='An animated gif showing a Flutter app in use. It starts with the user on a login screen. They log in and are taken to the catalog screen, with a list of items. The click on several items, and as they do so, the items are marked as "added". The user clicks on a button and gets taken to the cart view. They see the items there. They go back to the catalog, and the items they bought still show "added". End of animation.' class='site-image-right' style="max-height: 24rem;">

舉例來說，請參考以下這個簡單的應用程式。

這個應用程式有兩個獨立的螢幕：一個是目錄（catalog），
另一個是購物車（cart）（分別由 `MyCatalog`
和 `MyCart` 元件（Widgets）表示）。它可以是一個購物應用程式，
但你也可以想像成一個簡單的社群應用程式
（將目錄換成「動態牆」，購物車換成「收藏」）。

目錄螢幕包含一個自訂的應用程式列（`MyAppBar`）
以及一個可捲動的多個清單項目視圖（`MyListItems`）。

以下是這個應用程式的元件樹（widget tree）視覺化圖示。

<img src='/assets/images/docs/development/data-and-backend/state-mgmt/simple-widget-tree.png' width="100%" class="diagram-wrap" alt="A widget tree with MyApp at the top, and  MyCatalog and MyCart below it. MyCart area leaf nodes, but MyCatalog have two children: MyAppBar and a list of MyListItems.">

{% comment %}
  上述 png 的原始繪圖來源：https://docs.google.com/drawings/d/1KXxAl_Ctxc-avhR4uE58BXBM6Tyhy0pQMCsSMFHVL_0/edit?zx=y4m1lzbhsrvx
{% endcomment %}

因此我們至少有 5 個 `Widget` 子類別。其中許多都需要
存取「屬於」其他地方的狀態。例如，每個
`MyListItem` 都需要能夠將自己加入購物車。
它也可能需要知道目前顯示的項目是否已經在購物車中。

這帶出了我們的第一個問題：我們應該把購物車的目前狀態放在哪裡？

## 狀態上提（Lifting state up）

在 Flutter 中，
將狀態保存在使用該狀態的元件（Widgets）之上是合理的做法。

為什麼？在像 Flutter 這樣的宣告式框架中，如果你想改變 UI，
你必須重新建構它。沒有簡單的方法可以
`MyCart.updateWith(somethingNew)`。換句話說，
很難從外部以呼叫方法的方式命令式地改變一個元件（Widget）。
即使你可以這麼做，也是在與框架對抗，而不是善用它的協助。

```dart
// BAD: DO NOT DO THIS
void myTapHandler() {
  var cartWidget = somehowGetMyCartWidget();
  cartWidget.updateWith(item);
}
```

即使你讓上述程式碼能夠運作，
接下來你還需要在 `MyCart` 元件（Widget）中處理以下事項：

```dart
// BAD: DO NOT DO THIS
Widget build(BuildContext context) {
  return SomeWidget(
    // The initial state of the cart.
  );
}

void updateWith(Item item) {
  // Somehow you need to change the UI from here.
}
```

你需要考慮 UI 的當前狀態，並將新資料套用到其上。這種做法很難避免錯誤。

在 Flutter 中，每當元件（Widget）的內容發生變化時，你都會重新建構一個新的元件。你不是使用 `MyCart.updateWith(somethingNew)`（方法呼叫），而是使用 `MyCart(contents)`（建構子）。由於你只能在父元件的 build 方法中建構新的元件，如果你想要改變 `contents`，那它就必須存在於 `MyCart` 的父元件或更高層級。

<?code-excerpt "lib/src/provider.dart (my-tap-handler)"?>
```dart
// GOOD
void myTapHandler(BuildContext context) {
  var cartModel = somehowGetMyCartModel(context);
  cartModel.add(item);
}
```

現在 `MyCart` 只需要一條程式碼路徑來建構任何版本的 UI。

<?code-excerpt "lib/src/provider.dart (build)"?>
```dart
// GOOD
Widget build(BuildContext context) {
  var cartModel = somehowGetMyCartModel(context);
  return SomeWidget(
    // Just construct the UI once, using the current state of the cart.
    // ···
  );
}
```

在我們的範例中，`contents` 需要存在於 `MyApp` 之中。每當它發生變化時，會從上層重新建構 `MyCart`（稍後會詳細說明）。因此，`MyCart` 不需要擔心生命週期——它只需宣告在任何給定的 `contents` 下要顯示什麼。當那個狀態改變時，舊的 `MyCart` 元件（Widget）會消失，並被全新的一個取代。

<img src='/assets/images/docs/development/data-and-backend/state-mgmt/simple-widget-tree-with-cart.png' width="100%" class="diagram-wrap" alt="Same widget tree as above, but now we show a small 'cart' badge next to MyApp, and there are two arrows here. One comes from one of the MyListItems to the 'cart', and another one goes from the 'cart' to the MyCart widget.">

{% comment %}
  上述 png 的原始繪圖來源：https://docs.google.com/drawings/d/1ErMyaX4fwfbIW9ABuPAlHELLGMsU6cdxPDFz_elsS9k/edit?zx=j42inp8903pt
{% endcomment %}

這就是我們所說的「元件（Widgets）是不可變的」的意思。它們本身不會改變——而是被取代。

現在我們已經知道要把購物車的狀態放在哪裡，接下來看看如何存取它。

## 存取狀態

當使用者點擊目錄中的某個項目時，它會被加入購物車。但由於購物車存在於 `MyListItem` 之上，那該怎麼做到呢？

一個簡單的做法是提供一個 callback（回呼函式），讓 `MyListItem` 在被點擊時可以呼叫它。Dart 的函式是第一類物件（first class objects），所以你可以隨意傳遞它們。因此，在 `MyCatalog` 內部，你可以這樣定義：

<?code-excerpt "lib/src/passing_callbacks.dart (methods)"?>
```dart
@override
Widget build(BuildContext context) {
  return SomeWidget(
    // Construct the widget, passing it a reference to the method above.
    MyListItem(myTapCallback),
  );
}

void myTapCallback(Item item) {
  print('user tapped on $item');
}
```

這樣的做法雖然可行，但如果應用程式的狀態需要在許多不同的地方被修改，你就必須傳遞大量的回呼函式（callback）&mdash;這很快就會變得繁瑣。

幸好，Flutter 提供了讓元件（Widgets）可以將資料和服務提供給其後代元件（也就是不僅僅是子元件，而是所有在其下方的元件）的方法。正如你對 Flutter 的期待一樣，在 _Everything is a Widget™_ 的設計理念下，這些方法本身也只是特殊類型的元件（Widgets）&mdash;`InheritedWidget`、`InheritedNotifier`、`InheritedModel` 等等。我們這裡不會深入介紹這些，因為它們對於我們目前的需求來說層級較低。

取而代之的是，我們將使用一個能與這些底層元件配合、但又簡單易用的套件。這個套件叫做 `provider`。

在使用 `provider` 之前，
別忘了先在你的 `pubspec.yaml` 中加入對它的相依性。

要將 `provider` 套件加入為相依性，請執行 `flutter pub add`：

```console
$ flutter pub add provider
```

現在你可以`import 'package:provider/provider.dart';`，並開始建構你的應用程式。

使用`provider`時，你不需要擔心 callbacks 或`InheritedWidgets`。但你需要理解三個概念：

* ChangeNotifier
* ChangeNotifierProvider
* Consumer

## ChangeNotifier

`ChangeNotifier`是一個包含在 Flutter SDK（Flutter 軟體開發套件）中的簡單類別，能夠向其監聽者（listeners）提供變更通知。換句話說，如果某個物件是`ChangeNotifier`，你就可以訂閱它的變化。（對於熟悉這個術語的人來說，它是一種 Observable。）

在`provider`中，`ChangeNotifier`是一種封裝應用程式狀態的方式。對於非常簡單的應用程式，你只需要一個`ChangeNotifier`即可。若是較為複雜的應用程式，則會有多個模型，因此也會有多個`ChangeNotifiers`。（你完全不需要強制將`ChangeNotifier`與`provider`一起使用，但這是一個很容易上手的類別。）

在我們的購物應用程式範例中，我們希望用`ChangeNotifier`來管理購物車的狀態。我們可以建立一個繼承自它的新類別，如下所示：

<?code-excerpt "lib/src/provider.dart (model)" replace="/ChangeNotifier/[!$&!]/g;/notifyListeners/[!$&!]/g"?>
```dart
class CartModel extends [!ChangeNotifier!] {
  /// Internal, private state of the cart.
  final List<Item> _items = [];

  /// An unmodifiable view of the items in the cart.
  UnmodifiableListView<Item> get items => UnmodifiableListView(_items);

  /// The current total price of all items (assuming all items cost $42).
  int get totalPrice => _items.length * 42;

  /// Adds [item] to cart. This and [removeAll] are the only ways to modify the
  /// cart from the outside.
  void add(Item item) {
    _items.add(item);
    // This call tells the widgets that are listening to this model to rebuild.
    [!notifyListeners!]();
  }

  /// Removes all items from the cart.
  void removeAll() {
    _items.clear();
    // This call tells the widgets that are listening to this model to rebuild.
    [!notifyListeners!]();
  }
}
```

唯一與 `ChangeNotifier` 相關的程式碼，就是對 `notifyListeners()` 的呼叫。只要模型發生可能會影響應用程式 UI 的變化時，都應該呼叫這個方法。`CartModel` 內的其他內容則是模型本身及其商業邏輯。

`ChangeNotifier` 屬於 `flutter:foundation` 的一部分，並且不依賴於 Flutter 中任何更高階的類別。這讓它非常容易進行測試（甚至不需要使用 [widget testing][widget testing]）。舉例來說，以下是一個針對 `CartModel` 的簡單單元測試：

<?code-excerpt "test/model_test.dart (test)"?>
```dart
test('adding item increases total cost', () {
  final cart = CartModel();
  final startingPrice = cart.totalPrice;
  var i = 0;
  cart.addListener(() {
    expect(cart.totalPrice, greaterThan(startingPrice));
    i++;
  });
  cart.add(Item('Dash'));
  expect(i, 1);
});
```


## ChangeNotifierProvider

`ChangeNotifierProvider` 是一個元件（Widget），用來將 `ChangeNotifier` 的實例提供給其子孫元件。它來自 `provider` 套件。

我們已經知道該將 `ChangeNotifierProvider` 放在哪裡：放在需要存取它的元件之上。以 `CartModel` 為例，這表示要放在 `MyCart` 和 `MyCatalog` 的上方某處。

你不會希望將 `ChangeNotifierProvider` 放得比必要的層級還高（因為你不想污染作用域）。但在我們這個例子中，唯一同時位於 `MyCart` 和 `MyCatalog` 之上的元件是 `MyApp`。

<?code-excerpt "lib/main.dart (main)" replace="/ChangeNotifierProvider/[!$&!]/g"?>
```dart
void main() {
  runApp(
    [!ChangeNotifierProvider!](
      create: (context) => CartModel(),
      child: const MyApp(),
    ),
  );
}
```

請注意，我們這裡定義了一個 builder，用來建立 `CartModel` 的新實例。`ChangeNotifierProvider` 足夠聰明，只有在絕對必要時才會重新建立 `CartModel`。此外，當該實例不再需要時，它也會自動在 `CartModel` 上呼叫 `dispose()`。

如果你想要提供多個類別，可以使用 `MultiProvider`：

<?code-excerpt "lib/main.dart (multi-provider-main)" replace="/multiProviderMain/main/g;/MultiProvider/[!$&!]/g"?>
```dart
void main() {
  runApp(
    [!MultiProvider!](
      providers: [
        ChangeNotifierProvider(create: (context) => CartModel()),
        Provider(create: (context) => SomeOtherClass()),
      ],
      child: const MyApp(),
    ),
  );
}
```

## Consumer

現在，`CartModel` 已經透過最上層的 `ChangeNotifierProvider` 宣告提供給我們應用程式中的元件（Widgets），我們就可以開始使用它了。

這可以透過 `Consumer` 元件（Widget）來實現。

<?code-excerpt "lib/src/provider.dart (descendant)" replace="/Consumer/[!$&!]/g"?>
```dart
return [!Consumer!]<CartModel>(
  builder: (context, cart, child) {
    return Text('Total price: ${cart.totalPrice}');
  },
);
```

我們必須指定想要存取的模型型別。
在這個例子中，我們需要`CartModel`，所以我們寫
`Consumer<CartModel>`。如果你沒有指定泛型（`<CartModel>`），
`provider` 套件將無法協助你。`provider` 是以型別為基礎，
如果沒有型別，它就不知道你想要什麼。

`Consumer` 元件（Widget）唯一必須的參數
是 builder。Builder 是一個函式，只要
`ChangeNotifier` 發生變化時就會被呼叫。（換句話說，當你在模型中呼叫 `notifyListeners()`
時，所有對應 `Consumer` 元件（Widgets）的 builder 方法都會被呼叫。）

builder 會帶有三個參數。第一個是 `context`，
你在每個 build 方法中也都會拿到它。

builder 函式的第二個參數是
`ChangeNotifier` 的實例。這就是我們一開始想要取得的東西。
你可以利用模型中的資料來定義 UI 在任何時刻該呈現的樣貌。

第三個參數是 `child`，這是為了最佳化而設計的。
如果你的 `Consumer` 底下有一個龐大的元件子樹，且這些內容在模型變更時「不會」改變，你可以只建立一次，並透過 builder 取得它。

<?code-excerpt "lib/src/performance.dart (child)" replace="/\bchild\b/[!$&!]/g"?>
```dart
return Consumer<CartModel>(
  builder: (context, cart, [!child!]) => Stack(
    children: [
      // Use SomeExpensiveWidget here, without rebuilding every time.
      ?[!child!],
      Text('Total price: ${cart.totalPrice}'),
    ],
  ),
  // Build the expensive widget here.
  [!child!]: const SomeExpensiveWidget(),
);
```

最佳實踐是將你的`Consumer`元件（Widgets）盡可能放在樹狀結構的較深層。你不希望僅因為某個細節發生變化，就導致大範圍的 UI 重新建構。

<?code-excerpt "lib/src/performance.dart (non-leaf-descendant)"?>
```dart
// DON'T DO THIS
return Consumer<CartModel>(
  builder: (context, cart, child) {
    return HumongousWidget(
      // ...
      child: AnotherMonstrousWidget(
        // ...
        child: Text('Total price: ${cart.totalPrice}'),
      ),
    );
  },
);
```

請改用：

<?code-excerpt "lib/src/performance.dart (leaf-descendant)"?>
```dart
// DO THIS
return HumongousWidget(
  // ...
  child: AnotherMonstrousWidget(
    // ...
    child: Consumer<CartModel>(
      builder: (context, cart, child) {
        return Text('Total price: ${cart.totalPrice}');
      },
    ),
  ),
);
```

### Provider.of

有時候，你並不需要模型中的 _資料_ 來改變 UI，但你仍然需要存取它。例如，`ClearCart` 按鈕想要讓使用者將購物車內的所有項目移除。它不需要顯示購物車的內容，只需要呼叫 `clear()` 方法即可。

我們可以為此使用 `Consumer<CartModel>`，但這樣會很浪費。我們會要求框架重建一個其實不需要重建的元件（Widget）。

針對這種情境，我們可以使用 `Provider.of`，並將 `listen` 參數設為 `false`。

<?code-excerpt "lib/src/performance.dart (non-rebuilding)" replace="/listen: false/[!$&!]/g"?>
```dart
Provider.of<CartModel>(context, [!listen: false!]).removeAll();
```

在 build 方法中使用上述這一行，當呼叫 `notifyListeners` 時，並不會導致此元件（Widget）重新建構（rebuild）。

## 整合應用

你可以[查看本文涵蓋的範例][check out the example]。
如果你想要更簡單的範例，
可以參考這個簡單的 Counter 應用程式
[使用 `provider` 建構的樣子][built with `provider`]。

透過跟隨這些文章學習，你已大幅提升了建立以狀態為基礎應用程式的能力。
試著自己用 `provider` 建立一個應用程式，
來精通這些技能吧。

[built with `provider`]: {{site.repo.samples}}/tree/main/provider_counter
[check out the example]: {{site.repo.samples}}/tree/main/provider_shopper
[declarative UI programming]: /data-and-backend/state-mgmt/declarative
[ephemeral and app state]: /data-and-backend/state-mgmt/ephemeral-vs-app
[options page]: /data-and-backend/state-mgmt/options
[widget testing]: /testing/overview#widget-tests
