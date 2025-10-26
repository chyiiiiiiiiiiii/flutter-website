---
title: 處理點擊事件
description: 如何處理點擊與拖曳。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/gestures/handling_taps/"?>

你不僅希望向使用者顯示資訊，更希望使用者能與你的應用程式互動。  
使用 [`GestureDetector`][`GestureDetector`] 元件（Widget）來回應基本操作，例如點擊（tap）與拖曳（drag）。

:::note
想進一步了解，請觀看這段關於 `GestureDetector` 元件（Widget）的 Widget of the Week 短片：

{% ytEmbed 'WhVXkCFPmK4', 'GestureDetector | Flutter widget of the week' %}
:::

本教學將示範如何建立一個自訂按鈕，當被點擊時顯示 snackbar，步驟如下：

  1. 建立按鈕。
  2. 將其包裹在 `GestureDetector` 中，並提供 `onTap()` callback。

<?code-excerpt "lib/main.dart (GestureDetector)" replace="/return //g;/^\);$/)/g"?>
```dart
// The GestureDetector wraps the button.
GestureDetector(
  // When the child is tapped, show a snackbar.
  onTap: () {
    const snackBar = SnackBar(content: Text('Tap'));

    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  },
  // The custom button
  child: Container(
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(
      color: Colors.lightBlue,
      borderRadius: BorderRadius.circular(8),
    ),
    child: const Text('My Button'),
  ),
)
```

## 注意事項

  1. 若需為你的按鈕加入 Material 漣漪（ripple）效果，請參閱 [Add Material touch ripples][Add Material touch ripples] 教學。
  2. 雖然本範例建立了一個自訂按鈕，Flutter 其實已內建多種按鈕實作，例如：
     [`ElevatedButton`][`ElevatedButton`]、[`TextButton`][`TextButton`]，以及
     [`CupertinoButton`][`CupertinoButton`]。

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter tap handling hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Gesture Demo';

    return const MaterialApp(
      title: title,
      home: MyHomePage(title: title),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  const MyHomePage({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: const Center(child: MyButton()),
    );
  }
}

class MyButton extends StatelessWidget {
  const MyButton({super.key});

  @override
  Widget build(BuildContext context) {
    // The GestureDetector wraps the button.
    return GestureDetector(
      // When the child is tapped, show a snackbar.
      onTap: () {
        const snackBar = SnackBar(content: Text('Tap'));

        ScaffoldMessenger.of(context).showSnackBar(snackBar);
      },
      // The custom button
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.lightBlue,
          borderRadius: BorderRadius.circular(8),
        ),
        child: const Text('My Button'),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/handling-taps.webp" alt="點擊事件處理示範" class="site-mobile-screenshot" />
</noscript>

[Add Material touch ripples]: /cookbook/gestures/ripples
[`CupertinoButton`]: {{site.api}}/flutter/cupertino/CupertinoButton-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
