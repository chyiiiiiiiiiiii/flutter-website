# 動畫（Animation）教學

> 一個展示如何在 Flutter 中建立明確動畫（explicit animations）的教學。



:::secondary 你將學到什麼
* 如何使用動畫（animation）函式庫中的基礎類別，為元件 (Widget) 加入動畫效果。
* 何時該使用 `AnimatedWidget` 與 `AnimatedBuilder`。
:::

本教學將帶你學習如何在 Flutter 中建立明確動畫（explicit animations）。
範例將循序漸進，帶你認識動畫（animation）函式庫的不同面向。
本教學基於動畫函式庫中的基本概念、類別與方法，相關內容可參考
[動畫簡介][Introduction to animations]。

Flutter SDK 也提供了內建的明確動畫（explicit animations），
如 [`FadeTransition`][]、[`SizeTransition`][] 與 [`SlideTransition`][]。
這些元件接收一個 `Animation` 物件，
通常由 `AnimationController` 驅動，
並在其數值變化時更新 UI。
它們所需的程式碼比本教學所介紹的
自訂明確動畫（custom explicit animations）更少。

以下章節將引導你實作多個動畫範例。
每個章節都會提供該範例的原始碼連結。

## 動畫的渲染（Rendering animations）

:::secondary 重點提示
* 如何使用 `addListener()` 與 `setState()`，為元件（Widget）加入基本動畫效果。
* 每當 `Animation` 產生新數值時，
  透過 `addListener()` 註冊的回呼（callback）會呼叫 `setState()`。
* 如何定義一個帶有必要 `vsync` 參數的 `AnimationController`。
* 如何使用 `..addListener` 中的 `..` 語法，
  也就是 Dart 的 _串接符號（cascade notation）_。
:::

`Animation` 物件會隨時間產生一串數字，
但不會將任何內容渲染到螢幕上。
若要使用 `Animation` 物件進行渲染，請將 `Animation` 物件
儲存為元件（Widget）的成員，並根據其值決定如何繪製畫面。

請參考下方這個不帶動畫的 Flutter 標誌（logo）繪製範例：

<?code-excerpt "animation/animate0/lib/main.dart"?>
```dart
import 'package:material_ui/material_ui.dart';

void main() => runApp(const LogoApp());

class LogoApp extends StatefulWidget {
  const LogoApp({super.key});

  @override
  State<LogoApp> createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 10),
        height: 300,
        width: 300,
        child: const FlutterLogo(),
      ),
    );
  }
}
```

**App 原始碼：** [animate0][]

以下展示了相同的程式碼，經過修改後，讓 logo 從無到有逐漸放大至完整尺寸。
在定義 `AnimationController` 時，必須傳入一個 `vsync` 物件。`vsync` 參數的說明請參考 [`AnimationController` 章節][`AnimationController` section]。

與未加入動畫（Animation）的範例相比，變更之處已特別標示：

```dart diff
- class _LogoAppState extends State<LogoApp> {
+ class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
+   late Animation<double> animation;
+   late AnimationController controller;
+
+   @override
+   void initState() {
+     super.initState();
+     controller = AnimationController(
+       duration: const Duration(seconds: 2),
+       vsync: this,
+     );
+     animation = Tween<double>(begin: 0, end: 300).animate(controller)
+       ..addListener(() {
+         setState(() {
+           // The state that has changed here is the animation object's value.
+         });
+       });
+     controller.forward();
+   }
+
    @override
    Widget build(BuildContext context) {
      return Center(
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 10),
-         height: 300,
-         width: 300,
+         height: animation.value,
+         width: animation.value,
          child: const FlutterLogo(),
        ),
      );
    }
+
+   @override
+   void dispose() {
+     controller.dispose();
+     super.dispose();
+   }
  }
```

**App source:** [animate1][]

透過 `addListener()` 註冊的回呼會呼叫 `setState()`，
因此每當 `Animation` 產生新數字時，
元件就會被標記為需要重建。
在 `build()` 中，容器（container）的大小會改變，因為它的高度與
寬度現在使用 `animation.value`，而不是硬編碼的數值。
當 `State` 物件被丟棄時，請記得釋放 controller，
以避免記憶體洩漏。

只要做這幾個小改動，
你就完成了在 Flutter 中的第一個動畫（Animation）。

:::tip Dart 語言小技巧
你可能還不熟悉 Dart 的 cascade notation（串接運算子）&mdash;也就是 `..addListener()` 中的兩個點。
這個語法代表會以 `animate()` 的回傳值來呼叫 `addListener()` 方法。
請參考以下範例：

<?code-excerpt "animation/animate1/lib/main.dart (add-listener)"?>
```dart highlightLines=2
animation = Tween<double>(begin: 0, end: 300).animate(controller)
  ..addListener(() {
    // ···
  });
```

這段程式碼等同於：

<?code-excerpt "animation/animate1/lib/main.dart (add-listener)" replace="/animation.*/$&;/g; /  \./animation/g;"?>
```dart highlightLines=2
animation = Tween<double>(begin: 0, end: 300).animate(controller);
animation.addListener(() {
    // ···
  });
```

想了解更多關於級聯（cascade），
請參閱 [Cascade notation][]
於 [Dart language documentation][]。
:::

## 使用 AnimatedWidget 簡化

:::secondary 重點提示
* 如何使用 [`AnimatedWidget`][] 輔助類別
  （取代 `addListener()`
  和 `setState()`）來建立可動畫的元件（Widget）。
* 使用 `AnimatedWidget` 建立可重複使用動畫的元件（Widget）。
  若要將動畫過渡與元件分離，請使用
  `AnimatedBuilder`，如
  [Refactoring with AnimatedBuilder][] 章節所示。
* Flutter API 中 `AnimatedWidget` 元件的範例：
  `AnimatedBuilder`、`AnimatedModalBarrier`、
  `DecoratedBoxTransition`、`FadeTransition`、
  `PositionedTransition`、`RelativePositionedTransition`、
  `RotationTransition`、`ScaleTransition`、
  `SizeTransition`、`SlideTransition`。
:::

`AnimatedWidget` 基底類別可讓你將
核心元件（Widget）程式碼與動畫程式碼分離。
`AnimatedWidget` 會自行管理其 `State` 物件與動畫監聽器，
因此你不需要在子類別中實作它們。
請新增以下 `AnimatedLogo` 類別：

<?code-excerpt "animation/animate2/lib/main.dart (AnimatedLogo)"?>
```dart
class AnimatedLogo extends AnimatedWidget {
  const AnimatedLogo({super.key, required Animation<double> animation})
    : super(listenable: animation);

  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 10),
        height: animation.value,
        width: animation.value,
        child: const FlutterLogo(),
      ),
    );
  }
}
```

`AnimatedLogo` 在繪製自身時，會使用 `animation` 的當前值。

`LogoApp` 仍然負責管理 `AnimationController` 和 `Tween`，
並且會將 `Animation` 物件傳遞給 `AnimatedLogo`：

```dart diff
  void main() => runApp(const LogoApp());

+ class AnimatedLogo extends AnimatedWidget {
+   const AnimatedLogo({super.key, required Animation<double> animation})
+     : super(listenable: animation);
+
+   @override
+   Widget build(BuildContext context) {
+     final animation = listenable as Animation<double>;
+     return Center(
+       child: Container(
+         margin: const EdgeInsets.symmetric(vertical: 10),
+         height: animation.value,
+         width: animation.value,
+         child: const FlutterLogo(),
+       ),
+     );
+   }
+ }
+
  class LogoApp extends StatefulWidget {
    // ...
  }

  class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
    // ...

    @override
    void initState() {
      super.initState();
      controller = AnimationController(
        duration: const Duration(seconds: 2),
        vsync: this,
      );
-     animation = Tween<double>(begin: 0, end: 300).animate(controller)
-       ..addListener(() {
-         setState(() {
-           // The state that has changed here is the animation object's value.
-         });
-       });
+     animation = Tween<double>(begin: 0, end: 300).animate(controller);
      controller.forward();
    }

    @override
-   Widget build(BuildContext context) {
-     return Center(
-       child: Container(
-         margin: const EdgeInsets.symmetric(vertical: 10),
-         height: animation.value,
-         width: animation.value,
-         child: const FlutterLogo(),
-       ),
-     );
-   }
+   Widget build(BuildContext context) => AnimatedLogo(animation: animation);

    // ...
  }
```

**App source:** [animate2][]

<a id="monitoring"></a>

## 監控動畫（Animation）的進度

:::secondary 重點提示
* 使用 `addStatusListener()` 來接收動畫（Animation）狀態（status）變化的通知，例如開始、抵達端點或反向。
* 當動畫（Animation）完成或回到起始狀態時，透過反向播放讓動畫（Animation）無限循環執行，
  或是呼叫 `controller.repeat(reverse: true)`。
:::

了解動畫（Animation）狀態變化的時機（例如結束、向前移動或反向）通常很有幫助。
你可以透過 `addStatusListener()` 來接收這些通知。
以下程式碼修改了前一個範例，使其能夠監聽狀態變化並列印更新訊息。
高亮的那一行顯示了這個變更：

<?code-excerpt "animation/animate3/lib/main.dart (print-state)" plaster="none" replace="/\/\/ (\.\..*)/$1;/g; /\n  }/$&\n  \/\/ .../g"?>
```dart highlightLines=13
class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    animation = Tween<double>(begin: 0, end: 300).animate(controller)
      ..addStatusListener((status) => debugPrint('$status'));
    controller.forward();
  }
  // ...
}
```

執行此程式碼會產生以下輸出：

```console
AnimationStatus.forward
AnimationStatus.completed
```

接下來，使用 `addStatusListener()` 在動畫（Animation）的開始或結束時反轉動畫，這樣可以產生「呼吸」效果：

```dart diff
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
-   animation = Tween<double>(begin: 0, end: 300).animate(controller);
+   animation = Tween<double>(begin: 0, end: 300).animate(controller)
+     ..addStatusListener((status) {
+       if (status == AnimationStatus.completed) {
+         controller.reverse();
+       } else if (status == AnimationStatus.dismissed) {
+         controller.forward();
+       }
+     })
+     ..addStatusListener((status) => debugPrint('$status'));
    controller.forward();
  }
```

**App source:** [animate3][]

:::tip 重複播放動畫
雖然 `addStatusListener()` 很適合用來回應狀態變化，
但如果你的目標只是讓動畫朝單向或雙向持續循環，
可以呼叫 [`controller.repeat(reverse: true)`][repeat]，
而不必在狀態監聽器中手動切換 `forward()` 與 `reverse()`。
呼叫 `stop()` 並不會改變動畫的狀態，
因此不會通知狀態監聽器。
:::

## 使用 AnimatedBuilder 進行重構

:::secondary 重點提示
* [`AnimatedBuilder`][] 將轉場效果與被加上動畫的元件（Widget）分離。
* `AnimatedBuilder` 本身不會渲染元件（Widget），
  也不會管理 `Animation` 物件。
* 使用 `AnimatedBuilder` 可以在其他元件（Widget）的 `build()` 方法中
  描述動畫（Animation）。
  若要定義一個帶有可重複使用動畫的元件（Widget），
  請使用 `AnimatedWidget`，如
  [Simplifying with AnimatedWidget][] 一節所示。
* Flutter API 中使用 `AnimatedBuilder` 的元件範例有：
  `BottomSheet`、`ExpansionTile`、`PopupMenu`、`ProgressIndicator`、
  `RefreshIndicator`、`Scaffold`、`SnackBar`、`TabBar`、
  `TextField`。
:::

在 [animate3][] 範例的程式碼中有一個問題，
那就是每當動畫（Animation）變更時，就必須修改渲染 logo 的元件（Widget）。
更好的做法是將不同的職責拆分到不同的類別中：

* 負責渲染 logo
* 定義 `Animation` 物件
* 負責渲染轉場效果

你可以藉由 `AnimatedBuilder` 類別
（或其通用版本 [`ListenableBuilder`][]）來達成這樣的職責分離。
`AnimatedBuilder` 是元件樹（widget tree）中的一個獨立元件。
就像 `AnimatedWidget` 一樣，
`AnimatedBuilder` 會自動監聽來自 `Animation` 物件的通知，
並在需要時將元件樹（Widget tree）標記為 dirty，
因此你不需要手動呼叫 `addListener()`。

[animate4][] 範例的元件樹（Widget tree）如下所示：

<DashImage figure image="ui/AnimatedBuilder-WidgetTree.png" alt="AnimatedBuilder widget tree" />

從元件樹（Widget tree）底部開始，渲染 logo 的程式碼非常簡單明瞭：

<?code-excerpt "animation/animate4/lib/main.dart (logo-widget)"?>
```dart
class LogoWidget extends StatelessWidget {
  const LogoWidget({super.key});

  // Leave out the height and width so it fills the animating parent.
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: const FlutterLogo(),
    );
  }
}
```

圖中中間的三個區塊，都是在 `GrowTransition` 的 `build()` 方法中建立的，如下所示。
`GrowTransition` 元件（Widget）本身是無狀態元件（stateless），並持有定義轉場動畫（transition animation）所需的一組 final 變數。
`build()` 方法會建立並回傳 `AnimatedBuilder`，它會將匿名的 `builder` 回呼（callback）和 `LogoWidget` 物件作為參數。
實際負責渲染轉場動畫的工作，是在匿名的 `builder` 回呼中完成的，該回呼會建立一個適當大小的 `SizedBox`（圖中標示為 `Container`），以強制 `LogoWidget` 縮小以適應。

以下程式碼中有一個較為棘手的地方，就是 `child` 看起來像是被指定了兩次。實際上，外層對 `child` 的參考會傳遞給 `AnimatedBuilder`，再傳遞給匿名閉包，最後該閉包會將該物件作為其 child 使用。最終的結果是，`AnimatedBuilder` 會插入在這兩個元件（Widgets）之間的元件樹（widget tree）中，而且動畫的每個 tick 都不會重建靜態的 `child` 子樹。

<?code-excerpt "animation/animate4/lib/main.dart (grow-transition)"?>
```dart
class GrowTransition extends StatelessWidget {
  const GrowTransition({
    required this.child,
    required this.animation,
    super.key,
  });

  final Widget child;
  final Animation<double> animation;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: AnimatedBuilder(
        animation: animation,
        builder: (context, child) {
          return SizedBox(
            height: animation.value,
            width: animation.value,
            child: child,
          );
        },
        child: child,
      ),
    );
  }
}
```

最後，用於初始化動畫的程式碼看起來與 [animate2][] 範例非常相似。
`initState()` 方法會建立一個 `AnimationController` 和一個 `Tween`，
然後用 `animate()` 將它們綁定在一起。接著，
`build()` 方法會回傳一個 `GrowTransition` 物件，
以 `LogoWidget` 作為子元件，
並以動畫物件驅動轉場。這正是上方項目符號所列出的三個元素。

```dart diff
  void main() => runApp(const LogoApp());

+ class LogoWidget extends StatelessWidget {
+   const LogoWidget({super.key});
+
+   // Leave out the height and width so it fills the animating parent.
+   @override
+   Widget build(BuildContext context) {
+     return Container(
+       margin: const EdgeInsets.symmetric(vertical: 10),
+       child: const FlutterLogo(),
+     );
+   }
+ }
+
+ class GrowTransition extends StatelessWidget {
+   const GrowTransition({
+     required this.child,
+     required this.animation,
+     super.key,
+   });
+
+   final Widget child;
+   final Animation<double> animation;
+
+   @override
+   Widget build(BuildContext context) {
+     return Center(
+       child: AnimatedBuilder(
+         animation: animation,
+         builder: (context, child) {
+           return SizedBox(
+             height: animation.value,
+             width: animation.value,
+             child: child,
+           );
+         },
+         child: child,
+       ),
+     );
+   }
+ }

  class LogoApp extends StatefulWidget {
    // ...
  }

  class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
    // ...

    @override
-   Widget build(BuildContext context) => AnimatedLogo(animation: animation);
+   Widget build(BuildContext context) {
+     return GrowTransition(animation: animation, child: const LogoWidget());
+   }

    // ...
  }
```

**App source:** [animate4][]

## 同步動畫（Simultaneous animations）

:::secondary 重點提示
* [`Curves`][] 類別定義了一組常用的曲線（curves）陣列，
  你可以搭配 [`CurvedAnimation`][] 一起使用。
:::

在本節中，你將延續
[監控動畫進度][Monitoring the progress of the animation]
（[animate3][]）的範例，該範例使用 `AnimatedWidget`
來持續地進行進入與退出的動畫。假設你想要在進行進入與退出動畫的同時，讓透明度從全透明變化到不透明。

:::note
這個範例展示了如何在同一個動畫控制器（animation controller）上使用多個 Tween，每個 Tween 負責動畫中的不同效果。這僅供說明用途。
對於正式專案中的透明度動畫，
建議使用 [`FadeTransition`][]，以避免在每一幀都重建元件。
對於尺寸變化，若你想要以動畫呈現子元件被顯露出多少，
可以考慮使用 [`SizeTransition`][]。
:::

每個 Tween 管理動畫中的一個面向。例如：

<?code-excerpt "animation/animate5/lib/main.dart (tweens)" plaster="none"?>
```dart
controller = AnimationController(
  duration: const Duration(seconds: 2),
  vsync: this,
);
sizeAnimation = Tween<double>(begin: 0, end: 300).animate(controller);
opacityAnimation = Tween<double>(begin: 0.1, end: 1).animate(controller);
```

你可以透過 `sizeAnimation.value` 取得尺寸，並透過 `opacityAnimation.value` 取得透明度。
然而，`AnimatedLogo` 已經在監聽 controller 的動畫，
因此它可以直接從該單一動畫計算出這兩個數值。

請將 `AnimatedLogo` 修改為封裝其自身的 `Tween` 物件，
而其 `build()` 方法則會在父層的動畫物件上呼叫 `Tween.evaluate()`，
以計算所需的尺寸與透明度數值。
以下程式碼以重點標示顯示了這些變更：

<?code-excerpt "animation/animate5/lib/main.dart (diff)"?>
```dart highlightLines=6-7,13-14,17-18,34,44
class AnimatedLogo extends AnimatedWidget {
  const AnimatedLogo({super.key, required Animation<double> animation})
    : super(listenable: animation);

  // Make the tweens static because they don't change.
  static final Tween<double> _opacityTween = Tween(begin: 0.1, end: 1);
  static final Tween<double> _sizeTween = Tween(begin: 0, end: 300);

  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      child: Opacity(
        opacity: _opacityTween.evaluate(animation),
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 10),
          height: _sizeTween.evaluate(animation),
          width: _sizeTween.evaluate(animation),
          child: const FlutterLogo(),
        ),
      ),
    );
  }
}

class LogoApp extends StatefulWidget {
  const LogoApp({super.key});

  @override
  State<LogoApp> createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    animation = CurvedAnimation(parent: controller, curve: Curves.easeIn)
      ..addStatusListener((status) {
        if (status == AnimationStatus.completed) {
          controller.reverse();
        } else if (status == AnimationStatus.dismissed) {
          controller.forward();
        }
      });
    controller.forward();
  }

  @override
  Widget build(BuildContext context) => AnimatedLogo(animation: animation);

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
```

**App source:** [animate5][]

## 下一步

本教學為你奠定了使用 tweens 在 Flutter 中建立明確動畫（explicit animations）的基礎，
但還有許多其他動畫 API 值得探索：

* [Implicit animations][] 與 [`TweenAnimationBuilder`][]，
  適用於不需要管理 `AnimationController` 的較簡單動畫。
* 專門的 [`Tween`][] 子類別，例如 [`ColorTween`][]、
  [`RectTween`][] 與 [`IntTween`][]。
* [Staggered animations][]，用於協調依序或重疊的動作。
* [Hero animations][]，用於在路由之間進行共享元素轉場。
* [Physics simulations][] 與 [`fling()`][] 方法，
  用於模擬真實世界物理的動作。
* [`ReverseAnimation`][] 與 [Animations overview][]，
  可更深入了解 Flutter 的動畫架構。

[animate0]: https://github.com/flutter/website/tree/main/examples/animation/animate0
[animate1]: https://github.com/flutter/website/tree/main/examples/animation/animate1
[animate2]: https://github.com/flutter/website/tree/main/examples/animation/animate2
[animate3]: https://github.com/flutter/website/tree/main/examples/animation/animate3
[animate4]: https://github.com/flutter/website/tree/main/examples/animation/animate4
[animate5]: https://github.com/flutter/website/tree/main/examples/animation/animate5
[`AnimatedWidget`]: https://api.flutter.dev/flutter/widgets/AnimatedWidget-class.html
[`AnimatedBuilder`]: https://api.flutter.dev/flutter/widgets/AnimatedBuilder-class.html
[Animations overview]: /ui/animations/overview
[Introduction to animations]: /ui/animations
[`AnimationController`]: https://api.flutter.dev/flutter/animation/AnimationController-class.html
[`AnimationController` section]: /ui/animations#animationcontroller
[`ColorTween`]: https://api.flutter.dev/flutter/animation/ColorTween-class.html
[`Curves`]: https://api.flutter.dev/flutter/animation/Curves-class.html
[`CurvedAnimation`]: https://api.flutter.dev/flutter/animation/CurvedAnimation-class.html
[Cascade notation]: https://dart.dev/language/operators#cascade-notation
[Dart language documentation]: https://dart.dev/language
[`FadeTransition`]: https://api.flutter.dev/flutter/widgets/FadeTransition-class.html
[`fling()`]: https://api.flutter.dev/flutter/animation/AnimationController/fling.html
[Hero animations]: /ui/animations/hero-animations
[Implicit animations]: /ui/animations/implicit-animations
[`IntTween`]: https://api.flutter.dev/flutter/animation/IntTween-class.html
[`ListenableBuilder`]: https://api.flutter.dev/flutter/widgets/ListenableBuilder-class.html
[Monitoring the progress of the animation]: #monitoring
[Physics simulations]: /cookbook/animation/physics-simulation
[`RectTween`]: https://api.flutter.dev/flutter/animation/RectTween-class.html
[Refactoring with AnimatedBuilder]: #refactoring-with-animatedbuilder
[repeat]: https://api.flutter.dev/flutter/animation/AnimationController/repeat.html
[`ReverseAnimation`]: https://api.flutter.dev/flutter/animation/ReverseAnimation-class.html
[`SlideTransition`]: https://api.flutter.dev/flutter/widgets/SlideTransition-class.html
[Simplifying with AnimatedWidget]: #simplifying-with-animatedwidget
[`SizeTransition`]: https://api.flutter.dev/flutter/widgets/SizeTransition-class.html
[Staggered animations]: /ui/animations/staggered-animations
[`Tween`]: https://api.flutter.dev/flutter/animation/Tween-class.html
[`TweenAnimationBuilder`]: https://api.flutter.dev/flutter/widgets/TweenAnimationBuilder-class.html

