---
title: 從網路顯示圖片
description: 如何從網路顯示圖片。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/images/network_image"?>

顯示圖片是大多數行動應用程式的基本功能。  
Flutter 提供了 [`Image`][`Image`] 元件（Widget），可用來顯示各種類型的圖片。

若要處理來自 URL 的圖片，請使用  
[`Image.network()`][`Image.network()`] 建構函式。

<?code-excerpt "lib/main.dart (ImageNetwork)" replace="/^body\: //g"?>
```dart
Image.network('https://picsum.photos/250?image=9'),
```

## 額外補充：動畫 gif

`Image` 元件（Widget）有一個很實用的特性：
它支援動畫 gif。

<?code-excerpt "lib/gif.dart (Gif)" replace="/^return\ //g"?>
```dart
Image.network(
  'https://docs.flutter.dev/assets/images/dash/dash-fainting.gif',
);
```

## 使用預設圖（placeholder）實現圖片淡入效果

預設的 `Image.network` 建構函式並不支援進階功能，例如圖片載入完成後的淡入效果。
若要實現這個功能，
請參考 [使用預設圖實現圖片淡入效果][Fade in images with a placeholder]。

* [使用預設圖實現圖片淡入效果][Fade in images with a placeholder]

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter network images hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    var title = 'Web Images';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: Text(title)),
        body: Image.network('https://picsum.photos/250?image=9'),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/network-image.png" alt="網路圖片示範" class="site-mobile-screenshot" />
</noscript>


[Fade in images with a placeholder]: /cookbook/images/fading-in-images
[`Image`]: {{site.api}}/flutter/widgets/Image-class.html
[`Image.network()`]: {{site.api}}/flutter/widgets/Image/Image.network.html
