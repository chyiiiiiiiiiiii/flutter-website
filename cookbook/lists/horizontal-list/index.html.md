# 建立水平捲動清單

> 如何實作水平捲動清單。



<?code-excerpt path-base="cookbook/lists/horizontal_list"?>

有時您可能希望清單能水平捲動，而非垂直捲動。
元件 (Widget) [`ListView`][] 支援水平清單。

使用標準的 `ListView` 建構函式，傳入水平方向的
`scrollDirection`，即可覆寫預設的垂直方向。

<?code-excerpt "lib/main.dart (list-view)" replace="/^child\: //g"?>
```dart highlightLines=2
ListView(
  scrollDirection: Axis.horizontal,
  children: [
    for (final color in Colors.primaries)
      Container(width: 160, color: color),
  ],
),
```

[`ListView`]: https://api.flutter.dev/flutter/widgets/ListView-class.html

## 互動範例 {:#interactive-example}

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter horizontal list hands-on example in DartPad" run="true"
import 'dart:ui';

import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Horizontal list';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: Container(
          margin: const EdgeInsets.symmetric(vertical: 20),
          height: 200,
          child: ScrollConfiguration(
            // Add a custom scroll behavior that
            // allows all devices to drag the list.
            behavior: const MaterialScrollBehavior().copyWith(
              dragDevices: {...PointerDeviceKind.values},
            ),
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                for (final color in Colors.primaries)
                  Container(width: 160, color: color),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/horizontal-list.webp" alt="Horizontal List Demo" class="site-mobile-screenshot" />
</noscript>

