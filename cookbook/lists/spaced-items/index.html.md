# 帶有間距的清單

> 如何建立具有間距或展開項目的清單



<?code-excerpt path-base="cookbook/lists/spaced_items/"?>

有時你可能希望建立一個所有清單項目之間均勻分布的清單，讓這些項目能夠佔據可見空間。例如，下圖中的四個項目就被均勻分布，「Item 0」在最上方，「Item 3」在最下方。

![Spaced items](/assets/images/docs/cookbook/spaced-items-1.png){:.site-mobile-screenshot}

同時，當清單項目無法完全顯示時，你可能還希望讓使用者可以捲動清單。這可能是因為裝置螢幕太小、使用者調整了視窗大小，或是項目數量超過了螢幕可容納的範圍。

![Scrollable items](/assets/images/docs/cookbook/spaced-items-2.png){:.site-mobile-screenshot}

通常，你可以使用 [`Spacer`][] 來調整元件 (Widget) 之間的間距，或使用 [`Expanded`][] 來讓元件展開填滿可用空間。然而，這些解決方案在可捲動元件內部並不可行，因為它們需要有限的高度約束。

本教學將示範如何使用 [`LayoutBuilder`][] 與 [`ConstrainedBox`][]，在有足夠空間時讓清單項目均勻分布，而在空間不足時允許使用者捲動，步驟如下：

  1. 新增一個帶有 [`SingleChildScrollView`][] 的 [`LayoutBuilder`][]。
  2. 在 [`SingleChildScrollView`][] 內加入 [`ConstrainedBox`][]。
  3. 建立一個具有間距項目的 [`Column`][]。

## 1. 新增一個帶有 `SingleChildScrollView` 的 `LayoutBuilder`

首先，建立一個 [`LayoutBuilder`][]。你需要提供一個帶有兩個參數的 `builder` 回呼（callback）函式：

  1. 由 [`LayoutBuilder`][] 提供的 [`BuildContext`][]。
  2. 父元件的 [`BoxConstraints`][]。

在本教學中，你不會使用 [`BuildContext`][]，但你會在下一步用到 [`BoxConstraints`][]。

在 `builder` 函式內，回傳一個 [`SingleChildScrollView`][]。這個元件可確保子元件即使在父容器太小時，也能夠被捲動顯示。

<?code-excerpt "lib/spaced_list.dart (builder)"?>
```dart
LayoutBuilder(
  builder: (context, constraints) {
    return SingleChildScrollView(child: Placeholder());
  },
);
```

## 2. 在 `SingleChildScrollView` 中加入 `ConstrainedBox`

在這個步驟中，將 [`ConstrainedBox`][]
作為 [`SingleChildScrollView`][] 的子元件加入。

[`ConstrainedBox`][] 元件會對其子元件施加額外的限制。

請透過設定 `minHeight` 參數為
[`LayoutBuilder`][] 限制中的 `maxHeight` 來配置這個限制。

這樣可以確保子元件
會被限制為最小高度等於
[`LayoutBuilder`][] 限制所提供的可用空間，
也就是 [`BoxConstraints`][] 的最大高度。

<?code-excerpt "lib/spaced_list.dart (constrainedBox)"?>
```dart
LayoutBuilder(
  builder: (context, constraints) {
    return SingleChildScrollView(
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: constraints.maxHeight),
        child: Placeholder(),
      ),
    );
  },
);
```

然而，你不需要設定 `maxHeight` 參數，
因為你需要允許子元件可以大於 [`LayoutBuilder`][] 的大小，
以防清單項目無法完全顯示於螢幕上。

## 3. 建立具有間距的 `Column`

最後，將 [`Column`][] 作為 [`ConstrainedBox`][] 的子元件。

為了讓項目之間平均分配間距，
請將 `mainAxisAlignment` 設定為 `MainAxisAlignment.spaceBetween`。

<?code-excerpt "lib/spaced_list.dart (column)"?>
```dart
LayoutBuilder(
  builder: (context, constraints) {
    return SingleChildScrollView(
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: constraints.maxHeight),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ItemWidget(text: 'Item 1'),
            ItemWidget(text: 'Item 2'),
            ItemWidget(text: 'Item 3'),
          ],
        ),
      ),
    );
  },
);
```

另外，你也可以使用 [`Spacer`][] 元件來調整項目之間的間距，
或者如果你希望某個元件比其他元件佔用更多空間，則可以使用 [`Expanded`][] 元件。

為此，你必須將 [`Column`] 包裹在 [`IntrinsicHeight`][] 元件中，
這樣會強制 [`Column`][] 元件以最小高度自我調整，
而不是無限擴展。

<?code-excerpt "lib/spaced_list.dart (intrinsic)"?>
```dart
LayoutBuilder(
  builder: (context, constraints) {
    return SingleChildScrollView(
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: constraints.maxHeight),
        child: IntrinsicHeight(
          child: Column(
            children: [
              ItemWidget(text: 'Item 1'),
              Spacer(),
              ItemWidget(text: 'Item 2'),
              Expanded(child: ItemWidget(text: 'Item 3')),
            ],
          ),
        ),
      ),
    );
  },
);
```

:::tip
請嘗試在不同裝置上操作、調整應用程式大小，
或縮放瀏覽器視窗，觀察項目清單如何根據可用空間自動調整。
:::

## 互動範例

此範例展示了一個項目清單，這些項目在一個欄中均勻分佈。
當項目無法完全顯示於螢幕時，清單可以上下捲動。
項目的數量由變數 `items` 決定，
你可以更改這個值，觀察當項目無法完全顯示於螢幕時會發生什麼情況。

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Spaced Items hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const SpacedItemsList());

class SpacedItemsList extends StatelessWidget {
  const SpacedItemsList({super.key});

  @override
  Widget build(BuildContext context) {
    const items = 4;

    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        cardTheme: CardThemeData(color: Colors.blue.shade50),
      ),
      home: Scaffold(
        body: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: List.generate(
                    items,
                    (index) => ItemWidget(text: 'Item $index'),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

class ItemWidget extends StatelessWidget {
  const ItemWidget({super.key, required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: SizedBox(height: 100, child: Center(child: Text(text))),
    );
  }
}
```

[`BoxConstraints`]: https://api.flutter.dev/flutter/rendering/BoxConstraints-class.html
[`BuildContext`]: https://api.flutter.dev/flutter/widgets/BuildContext-class.html
[`Column`]: https://api.flutter.dev/flutter/widgets/Column-class.html
[`ConstrainedBox`]: https://api.flutter.dev/flutter/widgets/ConstrainedBox-class.html
[`Expanded`]: https://api.flutter.dev/flutter/widgets/Expanded-class.html
[`IntrinsicHeight`]: https://api.flutter.dev/flutter/widgets/IntrinsicHeight-class.html
[`LayoutBuilder`]: https://api.flutter.dev/flutter/widgets/LayoutBuilder-class.html
[`SingleChildScrollView`]: https://api.flutter.dev/flutter/widgets/SingleChildScrollView-class.html
[`Spacer`]: https://api.flutter.dev/flutter/widgets/Spacer-class.html

