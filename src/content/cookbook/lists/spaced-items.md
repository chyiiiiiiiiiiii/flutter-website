---
title: 間距排列的清單項目
description: 如何建立具有間距或展開項目的清單
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/lists/spaced_items/"?>

有時你可能想建立一個清單，讓所有清單項目能夠平均分配間距，讓項目填滿可見空間。
例如，下圖中的四個項目就是平均分布的，
"Item 0" 在最上方，而 "Item 3" 在最下方。

![Spaced items](/assets/images/docs/cookbook/spaced-items-1.png){:.site-mobile-screenshot}

同時，你可能也希望當清單項目無法完全顯示時，
允許使用者可以捲動清單，
這可能是因為裝置螢幕太小、使用者調整了視窗大小，
或是項目數量超過了螢幕可顯示的範圍。

![Scrollable items](/assets/images/docs/cookbook/spaced-items-2.png){:.site-mobile-screenshot}

一般來說，你可以使用 [`Spacer`][`Spacer`] 來調整元件（Widgets）之間的間距，
或使用 [`Expanded`][`Expanded`] 讓元件展開填滿可用空間。
然而，這些解法在可捲動元件（如滾動元件）中無法使用，
因為它們需要有限的高度約束。

本教學將示範如何使用 [`LayoutBuilder`][`LayoutBuilder`] 和 [`ConstrainedBox`][`ConstrainedBox`]，
在空間足夠時平均分配清單項目間距，空間不足時則允許使用者捲動，
步驟如下：

  1. 加入一個帶有 [`SingleChildScrollView`][`SingleChildScrollView`] 的 [`LayoutBuilder`][`LayoutBuilder`]。
  2. 在 [`SingleChildScrollView`][`SingleChildScrollView`] 中加入 [`ConstrainedBox`][`ConstrainedBox`]。
  3. 建立一個具有間距項目的 [`Column`][`Column`]。

## 1. 加入一個帶有 `SingleChildScrollView` 的 `LayoutBuilder`

首先，建立一個 [`LayoutBuilder`][`LayoutBuilder`]。你需要提供一個帶有兩個參數的 `builder` callback 函式：

  1. 由 [`LayoutBuilder`][`LayoutBuilder`] 提供的 [`BuildContext`][`BuildContext`]。
  2. 父元件的 [`BoxConstraints`][`BoxConstraints`]。

在本教學中，你不會用到 [`BuildContext`][`BuildContext`]，
但你會在下一步用到 [`BoxConstraints`][`BoxConstraints`]。

在 `builder` 函式內，回傳一個 [`SingleChildScrollView`][`SingleChildScrollView`]。
這個元件（Widget）可以確保子元件即使在父容器太小時也能捲動顯示。

<?code-excerpt "lib/spaced_list.dart (builder)"?>
```dart
LayoutBuilder(
  builder: (context, constraints) {
    return SingleChildScrollView(child: Placeholder());
  },
);
```

## 2. 在`SingleChildScrollView`中加入`ConstrainedBox`

在這個步驟中，將一個 [`ConstrainedBox`][`ConstrainedBox`]
作為 [`SingleChildScrollView`][`SingleChildScrollView`] 的子元件（child）加入。

[`ConstrainedBox`][`ConstrainedBox`] 元件會對其子元件施加額外的限制條件（constraints）。

請透過設定 `minHeight` 參數為
[`LayoutBuilder`][`LayoutBuilder`] 限制條件中的 `maxHeight` 來配置這個限制。

這樣可以確保子元件
會被限制為最小高度等於
[`LayoutBuilder`][`LayoutBuilder`] 限制條件所提供的可用空間，
也就是 [`BoxConstraints`][`BoxConstraints`] 的最大高度。

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
因為你需要允許子元件（child）可以大於 [`LayoutBuilder`][`LayoutBuilder`] 的尺寸，
以防這些項目無法完全顯示在螢幕上。

## 3. 建立具有間距的 `Column`

最後，將 [`Column`][`Column`] 作為 [`ConstrainedBox`][`ConstrainedBox`] 的子元件（child）。

為了讓項目之間平均分配間距，
請將 `mainAxisAlignment` 設為 `MainAxisAlignment.spaceBetween`。

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

另外，你也可以使用 [`Spacer`][`Spacer`] 元件（Widget）來調整項目之間的間距，  
或者如果你希望某個元件（Widget）佔據比其他元件更多的空間，則可以使用 [`Expanded`][`Expanded`] 元件（Widget）。

為此，你需要將 [`Column`] 包裹在 [`IntrinsicHeight`][`IntrinsicHeight`] 元件（Widget）中，  
這會強制 [`Column`][`Column`] 元件（Widget）以最小高度自我調整，而不是無限擴展。

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
或調整瀏覽器視窗大小，觀察項目清單如何根據可用空間自動調整。
:::

## 互動範例

此範例展示了一個項目清單，這些項目會在一個欄位中平均分配間距。
當項目無法完全顯示於螢幕時，清單可以上下捲動。
項目的數量由變數 `items` 所定義，
你可以變更這個值，觀察當項目無法完全顯示於螢幕時會發生什麼情況。

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

(https://api.flutter.dev/flutter/widgets/ListView-class.html)
[`BoxConstraints`]: {{site.api}}/flutter/rendering/BoxConstraints-class.html
# 有間距的清單項目

[`BuildContext`]: {{site.api}}/flutter/widgets/BuildContext-class.html
本範例說明如何在 `ListView` 的清單項目之間加入間距。

[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
你可以使用 `ListView.separated` 來在清單項目之間自動插入分隔元件（Widget），例如 `SizedBox` 或 `Divider`。

[`ConstrainedBox`]: {{site.api}}/flutter/widgets/ConstrainedBox-class.html
```dart
ListView.separated(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text('項目 \$index'),
    );
  },
  separatorBuilder: (context, index) => const SizedBox(height: 8),
)
```

[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
在上述範例中，每個清單項目之間會有 8 像素的垂直間距。

[`IntrinsicHeight`]: {{site.api}}/flutter/widgets/IntrinsicHeight-class.html
你也可以將 `SizedBox` 換成 `Divider`，以顯示分隔線：

[`LayoutBuilder`]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
```dart
separatorBuilder: (context, index) => const Divider(),
```

[`SingleChildScrollView`]: {{site.api}}/flutter/widgets/SingleChildScrollView-class.html
這種方式可以讓你的清單項目更易於閱讀，並提升整體的版面配置效果。
