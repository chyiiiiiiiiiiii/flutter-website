---
title: 跨螢幕動畫顯示元件
description: 如何將元件從一個螢幕動畫到另一個螢幕
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/navigation/hero_animations"?>

當使用者在應用程式中從一個螢幕切換到另一個螢幕時，適當地引導他們的視覺焦點通常非常有幫助。一種常見的技巧是將某個元件（Widget）從一個螢幕動畫到下一個螢幕。這樣可以在兩個螢幕之間建立視覺上的連結。

使用 [`Hero`][`Hero`] 元件（Widget），可以將元件從一個螢幕動畫到另一個螢幕。
本教學將依照以下步驟進行：

  1. 建立兩個顯示相同圖片的螢幕。
  2. 在第一個螢幕加入 `Hero` 元件。
  3. 在第二個螢幕加入 `Hero` 元件。

## 1. 建立兩個顯示相同圖片的螢幕

在這個範例中，會在兩個螢幕上顯示相同的圖片。
當使用者點擊圖片時，將圖片從第一個螢幕動畫到第二個螢幕。目前先建立畫面結構，動畫的處理會在後續步驟說明。

:::note
本範例基於
[Navigate to a new screen and back][Navigate to a new screen and back]
以及 [Handle taps][Handle taps] 教學進行擴充。
:::

<?code-excerpt "lib/main_original.dart"?>
```dart
import 'package:flutter/material.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Main Screen')),
      body: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute<void>(
              builder: (context) {
                return const DetailScreen();
              },
            ),
          );
        },
        child: Image.network('https://picsum.photos/250?image=9'),
      ),
    );
  }
}

class DetailScreen extends StatelessWidget {
  const DetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        onTap: () {
          Navigator.pop(context);
        },
        child: Center(
          child: Image.network('https://picsum.photos/250?image=9'),
        ),
      ),
    );
  }
}
```

## 2. 在第一個螢幕加入 `Hero` 元件（Widget）

為了將兩個螢幕以動畫（Animation）連接起來，請將兩個螢幕上的 `Image` 元件（Widget）都包裹在 `Hero` 元件（Widget）中。
`Hero` 元件需要兩個參數：

`tag`
: 一個用來識別 `Hero` 的物件。
  在兩個螢幕上必須相同。

`child`
: 要在螢幕間進行動畫的元件（Widget）。

{% comment %}
RegEx removes the first "child" property name and removed the trailing comma at the end
{% endcomment %}
<?code-excerpt "lib/main.dart (Hero1)" replace="/^child: //g;/^\),$/)/g"?>
```dart
Hero(
  tag: 'imageHero',
  child: Image.network('https://picsum.photos/250?image=9'),
)
```

## 3. 在第二個螢幕加入 `Hero` 元件（Widget）

為了完成與第一個螢幕的連結，
請將第二個螢幕上的 `Image` 包裹在一個 `Hero`
元件（Widget）中，並確保該元件的 `tag` 與第一個螢幕中的 `Hero` 相同。

在第二個螢幕套用 `Hero` 元件（Widget）後，
螢幕之間的動畫（Animation）就會自動運作。

{% comment %}
RegEx removes the first "child" property name and removed the trailing comma at the end
{% endcomment %}
<?code-excerpt "lib/main.dart (Hero2)" replace="/^child: //g;/^\),$/)/g"?>
```dart
Hero(
  tag: 'imageHero',
  child: Image.network('https://picsum.photos/250?image=9'),
)
```


:::note
這段程式碼與你在第一個螢幕上的內容相同。
作為最佳實踐，建議建立可重複使用的元件（Widget），
而不是重複撰寫程式碼。為了簡化說明，本範例在兩個
元件中都使用了相同的程式碼。
:::

## 互動式範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Hero animation hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const HeroApp());

class HeroApp extends StatelessWidget {
  const HeroApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Transition Demo', home: MainScreen());
  }
}

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Main Screen')),
      body: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute<void>(
              builder: (context) {
                return const DetailScreen();
              },
            ),
          );
        },
        child: Hero(
          tag: 'imageHero',
          child: Image.network('https://picsum.photos/250?image=9'),
        ),
      ),
    );
  }
}

class DetailScreen extends StatelessWidget {
  const DetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        onTap: () {
          Navigator.pop(context);
        },
        child: Center(
          child: Hero(
            tag: 'imageHero',
            child: Image.network('https://picsum.photos/250?image=9'),
          ),
        ),
      ),
    );
  }
}
```

<img src="/assets/images/docs/cookbook/hero.webp" alt="Hero demo" class="site-mobile-screenshot" />
