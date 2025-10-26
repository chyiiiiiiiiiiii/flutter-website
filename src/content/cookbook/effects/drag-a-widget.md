---
title: 拖曳 UI 元件
description: 如何實作可拖曳的 UI 元件。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/effects/drag_a_widget"?>

拖放（Drag and drop）是行動應用程式中常見的互動方式。
當使用者長按（有時稱為 _觸控並按住_）某個元件（Widget）時，
另一個元件會出現在使用者手指下方，
接著使用者可以將該元件拖曳到最終位置後放開。
在本教學中，你將建立一個拖放互動，
讓使用者可以長按選擇一項食物，
然後將該食物拖曳到正在付款的顧客圖片上。

下方動畫展示了此應用程式的行為：

![Ordering the food by dragging it to the person](/assets/images/docs/cookbook/effects/DragAUIElement.webp){:.site-mobile-screenshot}

本教學從一個預先建立好的菜單項目清單和一排顧客開始。
第一步是偵測長按動作，
並顯示一張可拖曳的菜單項目照片。

## 按壓並拖曳

Flutter 提供了一個名為 [`LongPressDraggable`][`LongPressDraggable`] 的元件，
它正好能實現你需要的拖放互動行為。`LongPressDraggable`
元件會在偵測到長按時，
於使用者手指附近顯示一個新的元件。
當使用者拖曳時，該元件會跟隨手指移動。
`LongPressDraggable` 讓你可以完全控制
使用者拖曳的元件內容。

每個菜單清單項目都會以自訂的
`MenuListItem` 元件顯示。

<?code-excerpt "lib/main.dart (MenuListItem)" replace="/^child: //g;/^\),$/)/g"?>
```dart
MenuListItem(
  name: item.name,
  price: item.formattedTotalItemPrice,
  photoProvider: item.imageProvider,
)
```

將 `MenuListItem` 元件（Widget）包裹在 `LongPressDraggable` 元件（Widget）中。

<?code-excerpt "lib/main.dart (LongPressDraggable)" replace="/^return //g;/^\),$/)/g"?>
```dart
LongPressDraggable<Item>(
  data: item,
  dragAnchorStrategy: pointerDragAnchorStrategy,
  feedback: DraggingListItem(
    dragKey: _draggableKey,
    photoProvider: item.imageProvider,
  ),
  child: MenuListItem(
    name: item.name,
    price: item.formattedTotalItemPrice,
    photoProvider: item.imageProvider,
  ),
);
```

在這個範例中，當使用者長按`MenuListItem`元件時，`LongPressDraggable`元件會顯示`DraggingListItem`。  
這個`DraggingListItem`會在使用者手指下方置中顯示所選食物項目的照片。

`dragAnchorStrategy`屬性被設為[`pointerDragAnchorStrategy`][`pointerDragAnchorStrategy`]。  
這個屬性值會指示`LongPressDraggable`根據使用者的手指來決定`DraggableListItem`的位置。  
當使用者移動手指時，`DraggableListItem`也會跟著移動。

如果在拖曳結束時沒有傳遞任何資訊，拖放操作就沒有什麼意義。  
因此，`LongPressDraggable`會接收`data`參數。  
在這個範例中，`data`的型別是`Item`，它保存了使用者按下的食物菜單項目的相關資訊。

與`LongPressDraggable`相關聯的`data`會被傳送到一個特殊的元件，稱為`DragTarget`，  
當使用者釋放拖曳手勢時，資料就會傳遞到這裡。  
接下來你將實作拖放的行為。

## 放下可拖曳元件

使用者可以將`LongPressDraggable`放到任何他們想要的位置，  
但只有當它被放到`DragTarget`上時才會產生效果。  
當使用者將可拖曳元件放到`DragTarget`元件上時，`DragTarget`元件可以選擇接受或拒絕來自 draggable 的資料。

在這個範例中，使用者應該將菜單項目拖放到`CustomerCart`元件上，  
以將該菜單項目加入使用者的購物車。

<?code-excerpt "lib/main.dart (CustomerCart)" replace="/^return //g;/^\),$/)/g"?>
```dart
CustomerCart(
  hasItems: customer.items.isNotEmpty,
  highlighted: candidateItems.isNotEmpty,
  customer: customer,
);
```

將 `CustomerCart` 元件（Widget）包裹在 `DragTarget` 元件（Widget）中。

<?code-excerpt "lib/main.dart (DragTarget)" replace="/^child: //g;/^\),$/)/g"?>
```dart
DragTarget<Item>(
  builder: (context, candidateItems, rejectedItems) {
    return CustomerCart(
      hasItems: customer.items.isNotEmpty,
      highlighted: candidateItems.isNotEmpty,
      customer: customer,
    );
  },
  onAcceptWithDetails: (details) {
    _itemDroppedOnCustomerCart(item: details.data, customer: customer);
  },
)
```

`DragTarget` 會顯示你現有的元件（Widget），並且與 `LongPressDraggable` 協同運作，以辨識使用者何時將可拖曳項目拖曳到 `DragTarget` 上方。
`DragTarget` 也能辨識使用者何時將可拖曳項目放到 `DragTarget` 元件（Widget）上。

當使用者在 `DragTarget` 元件（Widget）上拖曳可拖曳項目時，
`candidateItems` 會包含使用者正在拖曳的資料項目。
這個可拖曳項目允許你在使用者拖曳到元件上方時，改變元件的外觀。
在這個例子中，當任何項目被拖曳到 `DragTarget` 元件（Widget）上方時，`Customer` 元件（Widget）會變成紅色。
紅色的視覺效果是透過 `CustomerCart` 元件（Widget）內的 `highlighted` 屬性來設定的。

當使用者將可拖曳項目放到 `DragTarget` 元件（Widget）上時，
`onAcceptWithDetails` callback 會被呼叫。這時你可以決定是否要接受被放下的資料。
在這個例子中，項目總是會被接受並處理。
你也可以選擇檢查傳入的項目，以做出不同的決策。

請注意，拖曳到 `DragTarget` 上的項目類型必須與從 `LongPressDraggable` 拖曳的項目類型相符。
如果類型不相容，則不會呼叫 `onAcceptWithDetails` 方法。

當你將 `DragTarget` 元件（Widget）設定為接受你想要的資料後，
就可以透過拖放的方式，將資料從 UI 的一個部分傳送到另一個部分。

在下一步中，
你會用拖放的選單項目來更新顧客的購物車。

## 將選單項目加入購物車

每個顧客都由一個 `Customer` 物件所表示，
該物件會維護一個購物車項目清單以及總價。

<?code-excerpt "lib/main.dart (CustomerClass)"?>
```dart
class Customer {
  Customer({required this.name, required this.imageProvider, List<Item>? items})
    : items = items ?? [];

  final String name;
  final ImageProvider imageProvider;
  final List<Item> items;

  String get formattedTotalItemPrice {
    final totalPriceCents = items.fold<int>(
      0,
      (prev, item) => prev + item.totalPriceCents,
    );
    return '\$${(totalPriceCents / 100.0).toStringAsFixed(2)}';
  }
}
```

`CustomerCart` 元件（Widget）會根據 `Customer` 實例，顯示顧客的照片、姓名、總金額以及商品數量。

若要在拖放菜單項目到顧客購物車時更新內容，請將拖放的項目加入對應的 `Customer` 物件中。

<?code-excerpt "lib/main.dart (AddCart)"?>
```dart
void _itemDroppedOnCustomerCart({
  required Item item,
  required Customer customer,
}) {
  setState(() {
    customer.items.add(item);
  });
}
```

當使用者將選單項目拖放到`CustomerCart`元件（Widget）上時，`_itemDroppedOnCustomerCart`方法會在`onAcceptWithDetails()`中被呼叫。透過將拖放的項目加入`customer`物件，並呼叫`setState()`以觸發版面配置更新，UI 會隨即刷新，顯示新的顧客價格總計與項目數量。

恭喜你！你已經完成了一個可以將食物項目拖放至顧客購物車的拖放互動效果。

## 互動範例

執行此應用程式：

* 捲動瀏覽食物項目。
* 用手指長按其中一個項目，或用滑鼠點擊並按住。
* 按住時，該食物項目的圖片會顯示在清單上方。
* 拖曳圖片並將其放到螢幕下方的某位人物上。
  圖片下方的文字會更新，顯示該人物的消費金額。
  你可以持續新增食物項目，觀察消費金額累積的變化。

<!-- Start DartPad -->

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter drag a widget hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: ExampleDragAndDrop(),
      debugShowCheckedModeBanner: false,
    ),
  );
}

const _urlPrefix =
    'https://docs.flutter.dev/assets/images/exercise/effects/split-check';

const List<Item> _items = [
  Item(
    name: 'Spinach Pizza',
    totalPriceCents: 1299,
    uid: '1',
    imageProvider: NetworkImage('$_urlPrefix/Food1.jpg'),
  ),
  Item(
    name: 'Veggie Delight',
    totalPriceCents: 799,
    uid: '2',
    imageProvider: NetworkImage('$_urlPrefix/Food2.jpg'),
  ),
  Item(
    name: 'Chicken Parmesan',
    totalPriceCents: 1499,
    uid: '3',
    imageProvider: NetworkImage('$_urlPrefix/Food3.jpg'),
  ),
];

@immutable
class ExampleDragAndDrop extends StatefulWidget {
  const ExampleDragAndDrop({super.key});

  @override
  State<ExampleDragAndDrop> createState() => _ExampleDragAndDropState();
}

class _ExampleDragAndDropState extends State<ExampleDragAndDrop>
    with TickerProviderStateMixin {
  final List<Customer> _people = [
    Customer(
      name: 'Makayla',
      imageProvider: const NetworkImage('$_urlPrefix/Avatar1.jpg'),
    ),
    Customer(
      name: 'Nathan',
      imageProvider: const NetworkImage('$_urlPrefix/Avatar2.jpg'),
    ),
    Customer(
      name: 'Emilio',
      imageProvider: const NetworkImage('$_urlPrefix/Avatar3.jpg'),
    ),
  ];

  final GlobalKey _draggableKey = GlobalKey();

  void _itemDroppedOnCustomerCart({
    required Item item,
    required Customer customer,
  }) {
    setState(() {
      customer.items.add(item);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7F7F7),
      appBar: _buildAppBar(),
      body: _buildContent(),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      iconTheme: const IconThemeData(color: Color(0xFFF64209)),
      title: Text(
        'Order Food',
        style: Theme.of(context).textTheme.headlineMedium?.copyWith(
          fontSize: 36,
          color: const Color(0xFFF64209),
          fontWeight: FontWeight.bold,
        ),
      ),
      backgroundColor: const Color(0xFFF7F7F7),
      elevation: 0,
    );
  }

  Widget _buildContent() {
    return Stack(
      children: [
        SafeArea(
          child: Column(
            children: [
              Expanded(child: _buildMenuList()),
              _buildPeopleRow(),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMenuList() {
    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: _items.length,
      separatorBuilder: (context, index) {
        return const SizedBox(height: 12);
      },
      itemBuilder: (context, index) {
        final item = _items[index];
        return _buildMenuItem(item: item);
      },
    );
  }

  Widget _buildMenuItem({required Item item}) {
    return LongPressDraggable<Item>(
      data: item,
      dragAnchorStrategy: pointerDragAnchorStrategy,
      feedback: DraggingListItem(
        dragKey: _draggableKey,
        photoProvider: item.imageProvider,
      ),
      child: MenuListItem(
        name: item.name,
        price: item.formattedTotalItemPrice,
        photoProvider: item.imageProvider,
      ),
    );
  }

  Widget _buildPeopleRow() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 20),
      child: Row(children: _people.map(_buildPersonWithDropZone).toList()),
    );
  }

  Widget _buildPersonWithDropZone(Customer customer) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 6),
        child: DragTarget<Item>(
          builder: (context, candidateItems, rejectedItems) {
            return CustomerCart(
              hasItems: customer.items.isNotEmpty,
              highlighted: candidateItems.isNotEmpty,
              customer: customer,
            );
          },
          onAcceptWithDetails: (details) {
            _itemDroppedOnCustomerCart(item: details.data, customer: customer);
          },
        ),
      ),
    );
  }
}

class CustomerCart extends StatelessWidget {
  const CustomerCart({
    super.key,
    required this.customer,
    this.highlighted = false,
    this.hasItems = false,
  });

  final Customer customer;
  final bool highlighted;
  final bool hasItems;

  @override
  Widget build(BuildContext context) {
    final textColor = highlighted ? Colors.white : Colors.black;

    return Transform.scale(
      scale: highlighted ? 1.075 : 1.0,
      child: Material(
        elevation: highlighted ? 8 : 4,
        borderRadius: BorderRadius.circular(22),
        color: highlighted ? const Color(0xFFF64209) : Colors.white,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ClipOval(
                child: SizedBox(
                  width: 46,
                  height: 46,
                  child: Image(
                    image: customer.imageProvider,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                customer.name,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: textColor,
                  fontWeight: hasItems ? FontWeight.normal : FontWeight.bold,
                ),
              ),
              Visibility(
                visible: hasItems,
                maintainState: true,
                maintainAnimation: true,
                maintainSize: true,
                child: Column(
                  children: [
                    const SizedBox(height: 4),
                    Text(
                      customer.formattedTotalItemPrice,
                      style: Theme.of(context).textTheme.bodySmall!.copyWith(
                        color: textColor,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${customer.items.length} item${customer.items.length != 1 ? 's' : ''}',
                      style: Theme.of(context).textTheme.titleMedium!.copyWith(
                        color: textColor,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class MenuListItem extends StatelessWidget {
  const MenuListItem({
    super.key,
    this.name = '',
    this.price = '',
    required this.photoProvider,
    this.isDepressed = false,
  });

  final String name;
  final String price;
  final ImageProvider photoProvider;
  final bool isDepressed;

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 12,
      borderRadius: BorderRadius.circular(20),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          mainAxisSize: MainAxisSize.max,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: SizedBox(
                width: 120,
                height: 120,
                child: Center(
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 100),
                    curve: Curves.easeInOut,
                    height: isDepressed ? 115 : 120,
                    width: isDepressed ? 115 : 120,
                    child: Image(image: photoProvider, fit: BoxFit.cover),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 30),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: Theme.of(
                      context,
                    ).textTheme.titleMedium?.copyWith(fontSize: 18),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    price,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class DraggingListItem extends StatelessWidget {
  const DraggingListItem({
    super.key,
    required this.dragKey,
    required this.photoProvider,
  });

  final GlobalKey dragKey;
  final ImageProvider photoProvider;

  @override
  Widget build(BuildContext context) {
    return FractionalTranslation(
      translation: const Offset(-0.5, -0.5),
      child: ClipRRect(
        key: dragKey,
        borderRadius: BorderRadius.circular(12),
        child: SizedBox(
          height: 150,
          width: 150,
          child: Opacity(
            opacity: 0.85,
            child: Image(image: photoProvider, fit: BoxFit.cover),
          ),
        ),
      ),
    );
  }
}

@immutable
class Item {
  const Item({
    required this.totalPriceCents,
    required this.name,
    required this.uid,
    required this.imageProvider,
  });
  final int totalPriceCents;
  final String name;
  final String uid;
  final ImageProvider imageProvider;
  String get formattedTotalItemPrice =>
      '\$${(totalPriceCents / 100.0).toStringAsFixed(2)}';
}

class Customer {
  Customer({required this.name, required this.imageProvider, List<Item>? items})
    : items = items ?? [];

  final String name;
  final ImageProvider imageProvider;
  final List<Item> items;

  String get formattedTotalItemPrice {
    final totalPriceCents = items.fold<int>(
      0,
      (prev, item) => prev + item.totalPriceCents,
    );
    return '\$${(totalPriceCents / 100.0).toStringAsFixed(2)}';
  }
}
```

[`pointerDragAnchorStrategy`]: {{site.api}}/flutter/widgets/pointerDragAnchorStrategy.html
[`LongPressDraggable`]: {{site.api}}/flutter/widgets/LongPressDraggable-class.html
