---
title: 動畫 (Animate) 容器的屬性
description: 如何使用隱式動畫 (implicit animations) 來為容器的屬性製作動畫效果。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/animation/animated_container/"?>

[`Container`][`Container`] 類別提供了一個方便的方法，
可以建立具有特定屬性的元件（Widget）：
寬度、高度、背景顏色、內距（padding）、邊框等。

簡單的動畫 (Animation) 通常涉及隨時間改變這些屬性。
舉例來說，
你可能希望將背景顏色從灰色動畫變化為綠色，
以表示使用者已選取某個項目。

為了讓這些屬性能夠動畫化，
Flutter 提供了 [`AnimatedContainer`][`AnimatedContainer`] 元件（Widget）。
和 `Container` 元件類似，`AnimatedContainer` 允許你定義
寬度、高度、背景顏色等屬性。然而，當
`AnimatedContainer` 以新的屬性重新建構時，會自動在舊值與新值之間產生動畫效果。在 Flutter 中，這類動畫稱為「隱式動畫 (implicit animations)」。

本教學將說明如何使用 `AnimatedContainer`，在使用者點擊按鈕時，為尺寸、背景顏色和圓角（border radius）製作動畫，步驟如下：

  1. 建立一個帶有預設屬性的 StatefulWidget。
  2. 使用這些屬性建立 `AnimatedContainer`。
  3. 透過以新屬性重新建構元件，啟動動畫。

## 1. 建立帶有預設屬性的 StatefulWidget

首先，建立 [`StatefulWidget`][`StatefulWidget`] 和 [`State`][`State`] 類別。
使用自訂的 State 類別來定義那些會隨時間改變的屬性。在這個範例中，包含寬度、高度、顏色和圓角（border radius）。你也可以為每個屬性定義預設值。

這些屬性屬於自訂的 `State` 類別，讓它們可以在使用者點擊按鈕時被更新。

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

## 2. 使用這些屬性建立`AnimatedContainer`

接下來，使用前一步定義的屬性來建立`AnimatedContainer`。此外，請提供`duration`，用來定義動畫（Animation）執行的時間長度。

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

## 3. 透過以新屬性重建來啟動動畫 (Animation)

最後，透過以新屬性重建`AnimatedContainer`，來啟動動畫 (Animation)。
要如何觸發重建？
請使用 [`setState()`][`setState()`] 方法。

在應用程式中新增一個按鈕。當使用者點擊按鈕時，
在呼叫`setState()`的區塊內，更新寬度、高度、背景顏色以及圓角（border radius）等屬性為新的值。

實際的應用程式通常會在固定值之間進行轉換（例如，從灰色背景變為綠色背景）。
而在本範例中，每當使用者點擊按鈕時，則會產生新的屬性值。

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
  <img src="/assets/images/docs/cookbook/animated-container.webp" alt="AnimatedContainer 範例展示一個方塊在改變顏色與圓角半徑的同時，尺寸會放大與縮小" class="site-mobile-screenshot" />
</noscript>


[`AnimatedContainer`]: {{site.api}}/flutter/widgets/AnimatedContainer-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`setState()`]: {{site.api}}/flutter/widgets/State/setState.html
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
