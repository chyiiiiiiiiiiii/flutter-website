---
title: 使用清單
description: 如何實作清單。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/lists/basic_list"?>

在行動應用程式中，顯示資料清單是一個基本的設計模式。  
Flutter 提供了 [`ListView`][`ListView`]
元件（Widget），讓處理清單變得輕而易舉。

## 建立 ListView

當清單只包含少量項目時，使用標準的 `ListView` 建構函式
是最理想的選擇。  
內建的 [`ListTile`][`ListTile`]
元件（Widget）可以為項目提供視覺結構。

<?code-excerpt "lib/main.dart (ListView)" replace="/^body\: //g"?>
```dart
ListView(
  children: const <Widget>[
    ListTile(leading: Icon(Icons.map), title: Text('Map')),
    ListTile(leading: Icon(Icons.photo_album), title: Text('Album')),
    ListTile(leading: Icon(Icons.phone), title: Text('Phone')),
  ],
),
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter lists hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Basic List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: ListView(
          children: const <Widget>[
            ListTile(leading: Icon(Icons.map), title: Text('Map')),
            ListTile(leading: Icon(Icons.photo_album), title: Text('Album')),
            ListTile(leading: Icon(Icons.phone), title: Text('Phone')),
          ],
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/basic-list.png" alt="基本清單範例" class="site-mobile-screenshot" /> 
</noscript>


[`ListTile`]: {{site.api}}/flutter/material/ListTile-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
