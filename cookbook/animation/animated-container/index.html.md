# 為容器的屬性製作動畫

> 如何使用隱式動畫為容器的屬性製作動畫。



<?code-excerpt path-base="cookbook/animation/animated_container/"?>

[`Container`][] 類別提供了一個方便的方式，
可以建立具有特定屬性的元件 (Widget)：
寬度、高度、背景顏色、內距（padding）、邊框（borders）等。

簡單的動畫通常涉及這些屬性隨時間變化。
例如，
你可能想要將背景顏色從灰色動畫變成綠色，
以表示使用者已選取某個項目。

為了讓這些屬性產生動畫效果，
Flutter 提供了 [`AnimatedContainer`][] 元件。
和 `Container` 元件類似，`AnimatedContainer` 也允許你定義
寬度、高度、背景顏色等屬性。然而，當
`AnimatedContainer` 以新屬性重新建構時，會自動在舊值與新值之間產生動畫過渡。在 Flutter 中，這類動畫稱為「隱式動畫 (implicit animations)」。

本教學將說明如何使用 `AnimatedContainer`，在使用者點擊按鈕時，
為尺寸、背景顏色和圓角（border radius）製作動畫，步驟如下：

  1. 建立一個具有預設屬性的 StatefulWidget。
  2. 使用這些屬性建構 `AnimatedContainer`。
  3. 透過以新屬性重新建構來啟動動畫。

## 1. 建立具有預設屬性的 StatefulWidget

首先，建立 [`StatefulWidget`][] 和 [`State`][] 類別。
使用自訂的 State 類別來定義會隨時間變化的屬性。在本範例中，包括寬度、高度、顏色和圓角（border radius）。你也可以為每個屬性定義預設值。

這些屬性屬於自訂的 `State` 類別，
以便在使用者點擊按鈕時可以更新。

<?code-excerpt "lib/starter.dart (Starter)" remove="return Container();"?>
```dart
class AnimatedContainerApp extends StatefulWidget {
  const AnimatedContainerApp({super.key});

  @override
  State<AnimatedContainerApp> createState() => _AnimatedContainerAppState();
}

class _AnimatedContainerAppState extends State<AnimatedContainerApp> {
  // Define the various properties with default values. Update these properties
  // when the user taps a FloatingActionButton.
  double _width = 50;
  double _height = 50;
  Color _color = Colors.green;
  BorderRadiusGeometry _borderRadius = BorderRadius.circular(8);

  @override
  Widget build(BuildContext context) {
    // Fill this out in the next steps.
  }
}
```

## 2. 使用這些屬性建構 `AnimatedContainer`

接下來，使用前一步定義的屬性來建構 `AnimatedContainer`。此外，還需提供 `duration`，用於定義動畫執行的時間長度。

<?code-excerpt "lib/main.dart (AnimatedContainer)" replace="/^child: //g;/^\),$/)/g"?>
```dart
AnimatedContainer(
  // Use the properties stored in the State class.
  width: _width,
  height: _height,
  decoration: BoxDecoration(
    color: _color,
    borderRadius: _borderRadius,
  ),
  // Define how long the animation should take.
  duration: const Duration(seconds: 1),
  // Provide an optional curve to make the animation feel smoother.
  curve: Curves.fastOutSlowIn,
)
```

## 3. 透過以新屬性重建來啟動動畫

最後，透過以新屬性重建 `AnimatedContainer` 來啟動動畫。
要如何觸發重建？
請使用 [`setState()`][] 方法。

在應用程式中加入一個按鈕。當使用者點擊按鈕時，
在呼叫 `setState()` 時，更新寬度、高度、背景顏色與圓角（border radius）等屬性。

實際的應用程式通常會在固定值之間進行轉換（例如，
從灰色背景轉換為綠色背景）。而在本範例中，
每當使用者點擊按鈕時，則會產生新的屬性值。

<?code-excerpt "lib/main.dart (FAB)" replace="/^floatingActionButton: //g;/^\),$/)/g"?>
```dart
FloatingActionButton(
  // When the user taps the button
  onPressed: () {
    // Use setState to rebuild the widget with new values.
    setState(() {
      // Create a random number generator.
      final random = Random();

      // Generate a random width and height.
      _width = random.nextInt(300).toDouble();
      _height = random.nextInt(300).toDouble();

      // Generate a random color.
      _color = Color.fromRGBO(
        random.nextInt(256),
        random.nextInt(256),
        random.nextInt(256),
        1,
      );

      // Generate a random border radius.
      _borderRadius = BorderRadius.circular(
        random.nextInt(100).toDouble(),
      );
    });
  },
  child: const Icon(Icons.play_arrow),
)
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter animated container hands-on example in DartPad" run="true"
import 'dart:math';

import 'package:flutter/material.dart';

void main() => runApp(const AnimatedContainerApp());

class AnimatedContainerApp extends StatefulWidget {
  const AnimatedContainerApp({super.key});

  @override
  State<AnimatedContainerApp> createState() => _AnimatedContainerAppState();
}

class _AnimatedContainerAppState extends State<AnimatedContainerApp> {
  // Define the various properties with default values. Update these properties
  // when the user taps a FloatingActionButton.
  double _width = 50;
  double _height = 50;
  Color _color = Colors.green;
  BorderRadiusGeometry _borderRadius = BorderRadius.circular(8);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('AnimatedContainer Demo')),
        body: Center(
          child: AnimatedContainer(
            // Use the properties stored in the State class.
            width: _width,
            height: _height,
            decoration: BoxDecoration(
              color: _color,
              borderRadius: _borderRadius,
            ),
            // Define how long the animation should take.
            duration: const Duration(seconds: 1),
            // Provide an optional curve to make the animation feel smoother.
            curve: Curves.fastOutSlowIn,
          ),
        ),
        floatingActionButton: FloatingActionButton(
          // When the user taps the button
          onPressed: () {
            // Use setState to rebuild the widget with new values.
            setState(() {
              // Create a random number generator.
              final random = Random();

              // Generate a random width and height.
              _width = random.nextInt(300).toDouble();
              _height = random.nextInt(300).toDouble();

              // Generate a random color.
              _color = Color.fromRGBO(
                random.nextInt(256),
                random.nextInt(256),
                random.nextInt(256),
                1,
              );

              // Generate a random border radius.
              _borderRadius = BorderRadius.circular(
                random.nextInt(100).toDouble(),
              );
            });
          },
          child: const Icon(Icons.play_arrow),
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/animated-container.webp" alt="AnimatedContainer 範例展示一個方塊在變大變小的同時，顏色與圓角（border radius）也隨之變化" class="site-mobile-screenshot" />
</noscript>


[`AnimatedContainer`]: https://api.flutter.dev/flutter/widgets/AnimatedContainer-class.html
[`Container`]: https://api.flutter.dev/flutter/widgets/Container-class.html
[`setState()`]: https://api.flutter.dev/flutter/widgets/State/setState.html
[`State`]: https://api.flutter.dev/flutter/widgets/State-class.html
[`StatefulWidget`]: https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html

