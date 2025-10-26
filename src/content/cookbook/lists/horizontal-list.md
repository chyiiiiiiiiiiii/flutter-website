---
title: 建立水平清單
description: 如何實作水平清單。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/lists/horizontal_list"?>

有時你可能會希望建立一個可以水平滾動的清單，而不是垂直滾動。
[`ListView`][`ListView`] 元件（Widget）支援水平清單。

請使用標準的 `ListView` 建構函式，並傳入一個水平的 `scrollDirection`，這樣就能覆寫預設的垂直方向。

<?code-excerpt "lib/main.dart (ListView)" replace="/^child\: //g"?>
```dart
ListView(
  // This next line does the trick.
  scrollDirection: Axis.horizontal,
  children: <Widget>[
    Container(width: 160, color: Colors.red),
    Container(width: 160, color: Colors.blue),
    Container(width: 160, color: Colors.green),
    Container(width: 160, color: Colors.yellow),
    Container(width: 160, color: Colors.orange),
  ],
),
```

## 互動範例

:::note 桌面與網頁注意事項
此範例可在瀏覽器與桌面上運作。
不過，因為這個清單是在水平軸上捲動
（從左到右或從右到左），
請在使用滑鼠滾輪捲動清單時，同時按住<kbd>Shift</kbd>鍵。

想了解更多，請參閱有關
預設拖曳捲動裝置的[重大變更][breaking change]頁面。
:::

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter horizontal list hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Horizontal List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: Container(
          margin: const EdgeInsets.symmetric(vertical: 20),
          height: 200,
          child: ListView(
            // This next line does the trick.
            scrollDirection: Axis.horizontal,
            children: <Widget>[
              Container(width: 160, color: Colors.red),
              Container(width: 160, color: Colors.blue),
              Container(width: 160, color: Colors.green),
              Container(width: 160, color: Colors.yellow),
              Container(width: 160, color: Colors.orange),
            ],
          ),
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/horizontal-list.webp" alt="水平清單範例" class="site-mobile-screenshot" />
</noscript>

[breaking change]: /release/breaking-changes/default-scroll-behavior-drag
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
