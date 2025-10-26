---
title: 建立格狀清單（Grid List）
description: 如何實作格狀清單。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/lists/grid_lists"?>

在某些情況下，你可能希望將項目以格狀（grid）的方式顯示，而不是讓項目一個接一個地以一般清單呈現。
這時，可以使用 [`GridView`][`GridView`] 元件（Widget）。

最簡單開始使用格狀清單的方法，就是透過 [`GridView.count()`][`GridView.count()`] 建構函式，
因為它允許你指定想要的列數或行數。

為了幫助你理解 `GridView` 的運作方式，
我們將產生一個包含 100 個元件（Widget）的清單，並在每個元件中顯示其在清單中的索引。

<?code-excerpt "lib/main.dart (GridView)" replace="/^body\: //g"?>
```dart
GridView.count(
  // Create a grid with 2 columns.
  // If you change the scrollDirection to horizontal,
  // this produces 2 rows.
  crossAxisCount: 2,
  // Generate 100 widgets that display their index in the list.
  children: List.generate(100, (index) {
    return Center(
      child: Text(
        'Item $index',
        style: TextTheme.of(context).headlineSmall,
      ),
    );
  }),
),
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter GridView hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Grid List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: GridView.count(
          // Create a grid with 2 columns.
          // If you change the scrollDirection to horizontal,
          // this produces 2 rows.
          crossAxisCount: 2,
          // Generate 100 widgets that display their index in the list.
          children: List.generate(100, (index) {
            return Center(
              child: Text(
                'Item $index',
                style: TextTheme.of(context).headlineSmall,
              ),
            );
          }),
        ),
      ),
    );
  }
}
```

<img src="/assets/images/docs/cookbook/grid-list.webp" alt="Grid List Demo" class="site-mobile-screenshot" />
