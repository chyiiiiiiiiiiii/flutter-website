---
title: 處理長清單
description: 使用 ListView.builder 來實作長或無限清單。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/lists/long_lists/"?>

標準的 [`ListView`][`ListView`] 建構函式適用於小型清單。
若要處理包含大量項目的清單，建議使用
[`ListView.builder`][`ListView.builder`] 建構函式。

與預設的 `ListView` 建構函式（需要一次建立所有項目）不同，
`ListView.builder()` 建構函式會在項目捲動到螢幕上時才建立它們。

## 1. 建立資料來源

首先，你需要一個資料來源。例如，資料來源可能是一組訊息清單、搜尋結果，或商店中的產品列表。
大多數情況下，這些資料來自網路或資料庫。

在這個範例中，使用 [`List.generate`][`List.generate`] 建構函式產生一個包含 10,000 個字串的清單。

<?code-excerpt "lib/main.dart (Items)" replace="/^items: //g"?>
```dart
List<String>.generate(10000, (i) => 'Item $i'),
```

## 2. 將資料來源轉換為元件（Widgets）

要顯示字串清單，可以使用`ListView.builder()`，將每個 String 渲染為一個元件（Widget）。
在這個範例中，每個 String 都顯示在自己的獨立一行。

<?code-excerpt "lib/main.dart (ListView)" replace="/^body: //g;/^\),$/)/g"?>
```dart
ListView.builder(
  itemCount: items.length,
  prototypeItem: ListTile(title: Text(items.first)),
  itemBuilder: (context, index) {
    return ListTile(title: Text(items[index]));
  },
)
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter create long list hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    MyApp(
      items: List<String>.generate(10000, (i) => 'Item $i'),
    ),
  );
}

class MyApp extends StatelessWidget {
  final List<String> items;

  const MyApp({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    const title = 'Long List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: ListView.builder(
          itemCount: items.length,
          prototypeItem: ListTile(title: Text(items.first)),
          itemBuilder: (context, index) {
            return ListTile(title: Text(items[index]));
          },
        ),
      ),
    );
  }
}
```

## 子項目範圍（Children's extent）

要指定每個項目的範圍（extent），你可以使用 [`prototypeItem`][`prototypeItem`]、[`itemExtent`][`itemExtent`] 或 [`itemExtentBuilder`][`itemExtentBuilder`]。

明確指定項目範圍會比讓子項目自行決定範圍來得更有效率，因為滾動機制可以預先知道子項目的範圍，從而節省運算資源，例如當滾動位置大幅變動時。

如果你的清單（list）中每個項目的大小都是固定的，請使用 [`prototypeItem`][`prototypeItem`] 或 [`itemExtent`][`itemExtent`]。

如果你的清單中每個項目的大小不一，請使用 [`itemExtentBuilder`][`itemExtentBuilder`]。

<noscript>
  <img src="/assets/images/docs/cookbook/long-lists.webp" alt="Long Lists Demo" class="site-mobile-screenshot" />
</noscript>

[`List.generate`]: {{site.api}}/flutter/dart-core/List/List.generate.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`ListView.builder`]: {{site.api}}/flutter/widgets/ListView/ListView.builder.html
[`prototypeItem`]: {{site.api}}/flutter/widgets/ListView/prototypeItem.html
[`itemExtent`]: {{site.api}}/flutter/widgets/ListView/itemExtent.html
[`itemExtentBuilder`]: {{site.api}}/flutter/widgets/ListView/itemExtentBuilder.html
