# 新增 Material 觸控漣漪效果

> 如何實作漣漪動畫 (ripple animation)。



<?code-excerpt path-base="cookbook/gestures/ripples/"?>

遵循 Material Design 指南的元件 (Widget) 在被點擊時會顯示漣漪動畫 (ripple animation)。

Flutter 提供了 [`InkWell`][]
元件來實現這個效果。
請依照以下步驟建立漣漪效果：

  1. 建立一個支援點擊的元件 (Widget)。
  2. 使用 `InkWell` 元件包裹它，以管理點擊回呼（callback）與漣漪動畫。

<?code-excerpt "lib/main.dart (InkWell)" replace="/return //g;/^\);$/)/g"?>
```dart
// The InkWell wraps the custom flat button widget.
InkWell(
  // When the user taps the button, show a snackbar.
  onTap: () {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('Tap')));
  },
  child: const Padding(
    padding: EdgeInsets.all(12),
    child: Text('Flat Button'),
  ),
)
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Material ripples hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'InkWell Demo';

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
    // The InkWell wraps the custom flat button widget.
    return InkWell(
      // When the user taps the button, show a snackbar.
      onTap: () {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Tap')));
      },
      child: const Padding(
        padding: EdgeInsets.all(12),
        child: Text('Flat Button'),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/ripples.webp" alt="Ripples Demo" class="site-mobile-screenshot" />
</noscript>


[`InkWell`]: https://api.flutter.dev/flutter/material/InkWell-class.html

