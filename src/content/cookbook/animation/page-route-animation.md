---
title: 為頁面路由轉場加入動畫
description: 如何在不同頁面間切換時加入動畫效果。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/animation/page_route_animation/"?>

一種設計語言，例如 Material Design，會定義在不同路由（或螢幕）之間切換時的標準行為。不過，有時候自訂螢幕間的轉場動畫，能讓應用程式更具特色。為此，[`PageRouteBuilder`][`PageRouteBuilder`] 提供了一個 [`Animation`] 物件。
這個 `Animation` 可以搭配 [`Tween`][`Tween`] 和 [`Curve`][`Curve`] 物件，來自訂轉場動畫效果。
本教學將說明如何讓新路由從螢幕底部進入畫面，實現頁面間的動畫切換。

要建立自訂的頁面路由轉場動畫，本教學將採用以下步驟：

1. 設定 PageRouteBuilder
2. 建立 `Tween`
3. 加入 `AnimatedWidget`
4. 使用 `CurveTween`
5. 合併兩個 `Tween`

## 1. 設定 PageRouteBuilder

首先，使用 [`PageRouteBuilder`][`PageRouteBuilder`] 來建立一個 [`Route`][`Route`]。
`PageRouteBuilder` 具有兩個回呼函式，一個用來建立路由內容（`pageBuilder`），另一個則用來建立路由的轉場動畫（`transitionsBuilder`）。

:::note
transitionsBuilder 中的 `child` 參數，是由 pageBuilder 回傳的元件（Widget）。`pageBuilder` 函式只會在路由第一次被建立時呼叫。由於 `child` 在整個轉場過程中都保持不變，框架可以避免額外的運算。
:::

以下範例會建立兩個路由：一個首頁路由，包含一個「Go!」按鈕，以及一個標題為「Page 2」的第二個路由。

<?code-excerpt "lib/starter.dart (Starter)"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: Page1()));
}

class Page1 extends StatelessWidget {
  const Page1({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.of(context).push(_createRoute());
          },
          child: const Text('Go!'),
        ),
      ),
    );
  }
}

Route<void> _createRoute() {
  return PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => const Page2(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return child;
    },
  );
}

class Page2 extends StatelessWidget {
  const Page2({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: const Center(child: Text('Page 2')),
    );
  }
}
```

## 2. 建立 Tween

為了讓新頁面從底部動畫進入，應該讓其從 `Offset(0,1)` 動畫到 `Offset(0, 0)`（通常使用 `Offset.zero` 建構函式來定義）。在這個情境下，Offset 是用於 ['FractionalTranslation']['FractionalTranslation'] 元件 (Widget) 的二維向量。
將 `dy` 參數設為 1 代表垂直平移一個頁面的完整高度。

`transitionsBuilder` 回呼函式會有一個 `animation` 參數。它是一個會產生 0 到 1 之間數值的 `Animation<double>`。可以使用 Tween 將 `Animation<double>` 轉換為 `Animation<Offset>`：

<?code-excerpt "lib/starter.dart (step1)"?>
```dart
transitionsBuilder: (context, animation, secondaryAnimation, child) {
  const begin = Offset(0.0, 1.0);
  const end = Offset.zero;
  final tween = Tween(begin: begin, end: end);
  final offsetAnimation = animation.drive(tween);
  return child;
},
```

## 3. 使用 AnimatedWidget

Flutter 提供了一組繼承自 [`AnimatedWidget`][`AnimatedWidget`] 的元件（Widgets），當動畫（Animation）的值改變時，這些元件會自動重新建構自己。例如，`SlideTransition` 會接收一個 `Animation<Offset>`，並在動畫值變化時，透過 FractionalTranslation 元件來平移其子元件（child）。

AnimatedWidget 會回傳一個 [`SlideTransition`][`SlideTransition`]，並帶入 `Animation<Offset>` 以及子元件（child）：

<?code-excerpt "lib/starter.dart (step2)"?>
```dart
transitionsBuilder: (context, animation, secondaryAnimation, child) {
  const begin = Offset(0.0, 1.0);
  const end = Offset.zero;
  final tween = Tween(begin: begin, end: end);
  final offsetAnimation = animation.drive(tween);

  return SlideTransition(position: offsetAnimation, child: child);
},
```

## 4. 使用 CurveTween

Flutter 提供多種緩動曲線（easing curves），可用來調整動畫（Animation）隨時間的變化速率。
[`Curves`][`Curves`] 類別
內建了一組常用的曲線供選擇。
例如，`Curves.easeOut`
可以讓動畫一開始快速，結束時則緩慢。

若要使用 Curve，請建立新的 [`CurveTween`][`CurveTween`]，
並傳入一個 Curve：

<?code-excerpt "lib/starter.dart (step3)"?>
```dart
var curve = Curves.ease;
var curveTween = CurveTween(curve: curve);
```

這個新的 Tween 仍然會產生從 0 到 1 的數值。在下一步中，將會把它與第 2 步的 `Tween<Offset>` 結合。

## 5. 結合兩個 Tween

要結合這兩個 tween，
請使用 [`chain()`][`chain()`]：

<?code-excerpt "lib/main.dart (Tween)"?>
```dart
const begin = Offset(0.0, 1.0);
const end = Offset.zero;
const curve = Curves.ease;

var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
```

然後，將這個 tween 傳遞給 `animation.drive()`。這會建立一個新的 `Animation<Offset>`，可以提供給 `SlideTransition` 元件（Widget）使用：

<?code-excerpt "lib/main.dart (SlideTransition)"?>
```dart
return SlideTransition(position: animation.drive(tween), child: child);
```

這個新的 Tween（或 Animatable）會先評估 `CurveTween`，再評估 `Tween<Offset>.`，以產生 `Offset` 的值。當動畫（Animation）執行時，值會依照以下順序計算：

1. 動畫（Animation）（傳遞給 transitionsBuilder 回呼函式）會產生從 0 到 1 的值。
2. CurveTween 會根據其曲線，將這些值對映到新的 0 到 1 之間的值。
3. `Tween<Offset>` 會將 `double` 的值轉換為 `Offset` 的值。

另一種建立具有緩動曲線（easing curve）的 `Animation<Offset>` 的方式是使用 `CurvedAnimation`：

<?code-excerpt "lib/starter.dart (step4)" replace="/^\},$/}/g"?>
```dart
transitionsBuilder: (context, animation, secondaryAnimation, child) {
  const begin = Offset(0.0, 1.0);
  const end = Offset.zero;
  const curve = Curves.ease;

  final tween = Tween(begin: begin, end: end);
  final curvedAnimation = CurvedAnimation(parent: animation, curve: curve);

  return SlideTransition(
    position: tween.animate(curvedAnimation),
    child: child,
  );
}
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter page routing hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: Page1()));
}

class Page1 extends StatelessWidget {
  const Page1({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.of(context).push(_createRoute());
          },
          child: const Text('Go!'),
        ),
      ),
    );
  }
}

Route<void> _createRoute() {
  return PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => const Page2(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      const begin = Offset(0.0, 1.0);
      const end = Offset.zero;
      const curve = Curves.ease;

      var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));

      return SlideTransition(position: animation.drive(tween), child: child);
    },
  );
}

class Page2 extends StatelessWidget {
  const Page2({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: const Center(child: Text('Page 2')),
    );
  }
}
```
<noscript>
  <img src="/assets/images/docs/cookbook/page-route-animation.webp" alt="展示自訂頁面路由轉場動畫，從螢幕底部向上動畫顯示" class="site-mobile-screenshot" />
</noscript>


[`AnimatedWidget`]: {{site.api}}/flutter/widgets/AnimatedWidget-class.html
[`Animation`]: {{site.api}}/flutter/animation/Animation-class.html
[`chain()`]: {{site.api}}/flutter/animation/Animatable/chain.html
[`Curve`]: {{site.api}}/flutter/animation/Curve-class.html
[`Curves`]: {{site.api}}/flutter/animation/Curves-class.html
[`CurveTween`]: {{site.api}}/flutter/animation/CurveTween-class.html
['FractionalTranslation']: {{site.api}}/flutter/widgets/FractionalTranslation-class.html
[`PageRouteBuilder`]: {{site.api}}/flutter/widgets/PageRouteBuilder-class.html
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[`SlideTransition`]: {{site.api}}/flutter/widgets/SlideTransition-class.html
[`Tween`]: {{site.api}}/flutter/animation/Tween-class.html
