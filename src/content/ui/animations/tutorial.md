---
title: 動畫（Animation）教學
shortTitle: 教學
description: 一個展示如何在 Flutter 中建立明確動畫（explicit animations）的教學。
---

<?code-excerpt path-base="animation"?>

:::secondary 你將學到什麼
* 如何使用動畫（animation）函式庫中的基礎類別，為元件（Widget）加入動畫效果。
* 何時該使用 `AnimatedWidget` 與 `AnimatedBuilder`。
:::

本教學將帶你學習如何在 Flutter 中建立明確動畫（explicit animations）。
範例將循序漸進，帶你認識動畫（animation）函式庫的不同面向。
本教學基於動畫函式庫中的基本概念、類別與方法，相關內容可參考
[動畫簡介][Introduction to animations]。

Flutter SDK（Flutter 軟體開發套件）也提供了內建的明確動畫（explicit animations），
如 [`FadeTransition`][`FadeTransition`]、[`SizeTransition`][`SizeTransition`]，
以及 [`SlideTransition`][`SlideTransition`]。這些簡單動畫
只需設定起點與終點即可觸發。
它們比自訂明確動畫（custom explicit animations）更容易實作，
而本教學將說明如何建立自訂明確動畫。

以下章節將引導你實作多個動畫範例。
每個章節都會提供該範例的原始碼連結。

## 動畫的渲染（Rendering animations）

:::secondary 重點提示
* 如何使用 `addListener()` 與 `setState()`，為元件（Widget）加入基本動畫效果。
* 每當 Animation 產生新數值時，`addListener()`
  函式會呼叫 `setState()`。
* 如何定義一個帶有必要 `vsync` 參數的 `AnimationController`。
* 理解 "`..addListener`" 中的 "`..`" 語法，
  也就是 Dart 的 _串接符號（cascade notation）_。
* 若要讓類別變為私有，請以底線（`_`）作為開頭。
:::

目前為止，你已學會如何隨時間產生一串數字。
但尚未將任何內容渲染到螢幕上。若要使用
`Animation` 物件進行渲染，請將 `Animation` 物件
儲存為元件（Widget）的成員，並根據其值決定如何繪製畫面。

請參考下方這個不帶動畫的 Flutter 標誌（logo）繪製範例：

<?code-excerpt "animate0/lib/main.dart"?>
```dart
import 'package:flutter/material.dart';

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

**App 原始碼：** [animate0][animate0]

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
+     controller =
+         AnimationController(duration: const Duration(seconds: 2), vsync: this);
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

**App source:** [animate1][animate1]

`addListener()` 函式會呼叫 `setState()`，
因此每當 `Animation` 產生新數字時，
目前的畫面（frame）就會被標記為 dirty，這會強制
再次呼叫 `build()`。在 `build()` 中，
容器（container）的大小會改變，因為它的高度與
寬度現在使用 `animation.value`，而不是硬編碼的數值。
當 `State` 物件被丟棄時，請記得釋放 controller，
以避免記憶體洩漏。

只要做這幾個小改動，
你就完成了在 Flutter 中的第一個動畫（Animation）！

:::tip Dart 語言小技巧
你可能還不熟悉 Dart 的 cascade notation（串接運算子）&mdash;也就是 `..addListener()` 中的兩個點。
這個語法代表會以 `animate()` 的回傳值來呼叫 `addListener()` 方法。
請參考以下範例：

<?code-excerpt "animate1/lib/main.dart (add-listener)"?>
```dart highlightLines=2
animation = Tween<double>(begin: 0, end: 300).animate(controller)
  ..addListener(() {
    // ···
  });
```

這段程式碼等同於：

<?code-excerpt "animate1/lib/main.dart (add-listener)" replace="/animation.*/$&;/g; /  \./animation/g;"?>
```dart highlightLines=2
animation = Tween<double>(begin: 0, end: 300).animate(controller);
animation.addListener(() {
    // ···
  });
```

想了解更多關於級聯（cascade），
請參閱 [Cascade notation][Cascade notation]
於 [Dart language documentation][Dart language documentation]。
:::

##  使用 Animated&shy;Widget 簡化

:::secondary 有什麼重點？
* 如何使用 [`AnimatedWidget`][`AnimatedWidget`] 輔助類別
  （取代 `addListener()`
  和 `setState()`）來建立可動畫的元件（Widget）。
* 使用 `AnimatedWidget` 建立可重複使用動畫的元件（Widget）。
  若要將動畫過渡與元件分離，請使用
  `AnimatedBuilder`，如
  [Refactoring with AnimatedBuilder][Refactoring with AnimatedBuilder] 章節所示。
* Flutter API 中 `AnimatedWidget` 的範例：
  `AnimatedBuilder`、`AnimatedModalBarrier`、
  `DecoratedBoxTransition`、`FadeTransition`、
  `PositionedTransition`、`RelativePositionedTransition`、
  `RotationTransition`、`ScaleTransition`、
  `SizeTransition`、`SlideTransition`。
:::

`AnimatedWidget` 基底類別可讓你將
核心元件（Widget）程式碼與動畫程式碼分離。
`AnimatedWidget` 不需要維護一個 `State`
物件來保存動畫。請新增以下 `AnimatedLogo` 類別：

<?code-excerpt path-base="animation/animate2"?>
<?code-excerpt "lib/main.dart (AnimatedLogo)"?>
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
<?code-excerpt path-base="animation"?>

`AnimatedLogo` 在繪製自身時，會使用 `animation` 的當前值。

`LogoApp` 仍然負責管理 `AnimationController` 和 `Tween`，
並且會將 `Animation` 物件傳遞給 `AnimatedLogo`：

```dart diff
  void main() => runApp(const LogoApp());

+ class AnimatedLogo extends AnimatedWidget {
+   const AnimatedLogo({super.key, required Animation<double> animation})
+       : super(listenable: animation);
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

    @override
    void initState() {
      super.initState();
      controller =
          AnimationController(duration: const Duration(seconds: 2), vsync: this);
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

**App source:** [animate2][animate2]

<a id="monitoring"></a>

## 監控動畫 (Animation) 的進度

:::secondary 有什麼重點？
* 使用 `addStatusListener()` 來接收動畫 (Animation) 狀態變化的通知，例如開始、停止或反向。
* 當動畫 (Animation) 完成或回到起始狀態時，透過反向播放讓動畫 (Animation) 無限循環執行。
:::

了解動畫 (Animation) 狀態變化的時機（例如結束、向前移動或反向）通常很有幫助。
你可以透過 `addStatusListener()` 來接收這些通知。
以下程式碼修改了前一個範例，使其能夠監聽狀態變化並列印更新訊息。
高亮的那一行顯示了這個變更：

<?code-excerpt "animate3/lib/main.dart (print-state)" plaster="none" replace="/\/\/ (\.\..*)/$1;/g; /\n  }/$&\n  \/\/ .../g"?>
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
      ..addStatusListener((status) => print('$status'));
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
    controller =
        AnimationController(duration: const Duration(seconds: 2), vsync: this);
-   animation = Tween<double>(begin: 0, end: 300).animate(controller);
+   animation = Tween<double>(begin: 0, end: 300).animate(controller)
+     ..addStatusListener((status) {
+       if (status == AnimationStatus.completed) {
+         controller.reverse();
+       } else if (status == AnimationStatus.dismissed) {
+         controller.forward();
+       }
+     })
+     ..addStatusListener((status) => print('$status'));
    controller.forward();
  }
```

**App 原始碼：** [animate3][animate3]

## 使用 AnimatedBuilder 進行重構

:::secondary 這樣做有什麼意義？
* 一個 [`AnimatedBuilder`][`AnimatedBuilder`] 了解如何渲染轉場效果。
* `AnimatedBuilder` 不知道如何渲染元件（Widget），
  也不會管理 `Animation` 物件。
* 使用 `AnimatedBuilder` 可以在其他元件（Widget）的 build 方法中
  描述動畫（Animation）。
  如果你只是想定義一個帶有可重複使用動畫的元件（Widget），
  請使用 `AnimatedWidget`，如
  [使用 AnimatedWidget 簡化][Simplifying with AnimatedWidget] 一節所示。
* Flutter API 中 `AnimatedBuilders` 的範例有：`BottomSheet`、
  `ExpansionTile`、`PopupMenu`、`ProgressIndicator`、
  `RefreshIndicator`、`Scaffold`、`SnackBar`、`TabBar`、
  `TextField`。
:::

在 [animate3][animate3] 範例的程式碼中有一個問題，
那就是每當動畫（Animation）變更時，就必須修改渲染 logo 的元件（Widget）。
更好的做法是將不同的職責拆分到不同的類別中：

* 負責渲染 logo
* 定義 `Animation` 物件
* 負責渲染轉場效果

你可以藉由 `AnimatedBuilder` 類別來達成這樣的職責分離。
`AnimatedBuilder` 是渲染樹中的一個獨立類別。
就像 `AnimatedWidget` 一樣，
`AnimatedBuilder` 會自動監聽來自 `Animation` 物件的通知，
並在需要時將元件樹（Widget tree）標記為 dirty，
因此你不需要手動呼叫 `addListener()`。

[animate4][animate4] 範例的元件樹（Widget tree）如下所示：

{% render docs/app-figure.md, image:"ui/AnimatedBuilder-WidgetTree.png", alt:"AnimatedBuilder widget tree" %}

從元件樹（Widget tree）底部開始，渲染 logo 的程式碼非常簡單明瞭：

<?code-excerpt "animate4/lib/main.dart (logo-widget)"?>
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

圖中中間的三個區塊，都是在 `build()` 方法中於 `GrowTransition` 內建立的，如下所示。
`GrowTransition` 元件（Widget）本身是無狀態元件（stateless），並持有定義轉場動畫（transition animation）所需的一組 final 變數。
build() 函式會建立並回傳 `AnimatedBuilder`，它會將 (`Anonymous` builder) 方法和 `LogoWidget` 物件作為參數。
實際負責渲染轉場動畫的工作，是在 (`Anonymous` builder) 方法中完成的，該方法會建立一個適當大小的 `Container`，以強制 `LogoWidget` 縮小以適應。

以下程式碼中有一個較為棘手的地方，就是 child 看起來像是被指定了兩次。實際上，外層的 child 參考會傳遞給 `AnimatedBuilder`，再傳遞給匿名閉包，最後該閉包會將該物件作為其 child 使用。最終的結果是，`AnimatedBuilder` 會插入在這兩個元件（Widgets）之間的渲染樹（render tree）中。

<?code-excerpt "animate4/lib/main.dart (grow-transition)"?>
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

最後，用於初始化動畫的程式碼看起來與 [animate2][animate2] 範例非常相似。

`initState()` 方法會建立一個 `AnimationController` 和一個 `Tween`，然後用 `animate()` 將它們綁定在一起。

關鍵在於 `build()` 方法。這個方法會回傳一個 `LogoWidget` 物件，其子元件為 `GrowTransition`，並且還有一個動畫物件來驅動轉場。

這三個元素正是上方項目符號所列出的內容。

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

    @override
-   Widget build(BuildContext context) => AnimatedLogo(animation: animation);
+   Widget build(BuildContext context) {
+     return GrowTransition(
+       animation: animation,
+       child: const LogoWidget(),
+     );
+   }

    // ...
  }
```

**App 原始碼：** [animate4][animate4]

## 同步動畫（Simultaneous animations）

:::secondary 有什麼重點？
* [`Curves`][`Curves`] 類別定義了一組常用的曲線（curves）陣列，
  你可以搭配 [`CurvedAnimation`][`CurvedAnimation`] 一起使用。
:::

在本節中，你將延續
[監控動畫進度][monitoring the progress of the animation]
([animate3][animate3]) 的範例，該範例使用 `AnimatedWidget`
來持續地進行進入與退出的動畫。假設你想要在進行進入與退出動畫的同時，讓透明度從全透明變化到不透明。

:::note
這個範例展示了如何在同一個動畫控制器（animation controller）上使用多個 Tween，每個 Tween 負責動畫中的不同效果。這僅供說明用途。
如果你在正式專案中要同時對透明度與尺寸進行 Tween 動畫，建議改用 [`FadeTransition`][`FadeTransition`] 和 [`SizeTransition`][`SizeTransition`]。
:::

每個 Tween 管理動畫中的一個面向。例如：

<?code-excerpt "animate5/lib/main.dart (tweens)" plaster="none"?>
```dart
controller = AnimationController(
  duration: const Duration(seconds: 2),
  vsync: this,
);
sizeAnimation = Tween<double>(begin: 0, end: 300).animate(controller);
opacityAnimation = Tween<double>(begin: 0.1, end: 1).animate(controller);
```

你可以透過 `sizeAnimation.value` 取得尺寸，並透過 `opacityAnimation.value` 取得透明度，
但 `AnimatedWidget` 的建構函式只接受單一的 `Animation` 物件。為了解決這個問題，
範例會自行建立 `Tween` 物件，並明確計算這些數值。

請將 `AnimatedLogo` 修改為封裝其自身的 `Tween` 物件，
而其 `build()` 方法則會在父層的動畫物件上呼叫 `Tween.evaluate()`，
以計算所需的尺寸與透明度數值。
以下程式碼以重點標示顯示了這些變更：

<?code-excerpt "animate5/lib/main.dart (diff)" replace="/(static final|child: Opacity|opacity:|_sizeTween\.|CurvedAnimation).*/[!$&!]/g"?>
```dart
class AnimatedLogo extends AnimatedWidget {
  const AnimatedLogo({super.key, required Animation<double> animation})
    : super(listenable: animation);

  // Make the Tweens static because they don't change.
  [!static final _opacityTween = Tween<double>(begin: 0.1, end: 1);!]
  [!static final _sizeTween = Tween<double>(begin: 0, end: 300);!]

  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      [!child: Opacity(!]
        [!opacity: _opacityTween.evaluate(animation),!]
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 10),
          height: [!_sizeTween.evaluate(animation),!]
          width: [!_sizeTween.evaluate(animation),!]
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
    animation = [!CurvedAnimation(parent: controller, curve: Curves.easeIn)!]
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

**App source:** [animate5][animate5] 物件知道動畫 (Animation) 的當前狀態
（例如：是否已啟動、已停止，
或是正在正向或反向移動），
但不會知道螢幕上實際顯示的內容。
* 一個 [`AnimationController`][`AnimationController`] 負責管理 `Animation`。
* 一個 [`CurvedAnimation`][`CurvedAnimation`] 以非線性曲線定義動畫進度。
* 一個 [`Tween`][`Tween`] 負責在動畫屬性的起始值與結束值之間進行插值。

## 下一步

本教學為你奠定了使用 `Tweens` 在 Flutter 中建立動畫 (Animation) 的基礎，但還有許多其他類別值得探索。
你可以進一步研究專門的 `Tween` 類別、
針對你設計系統類型的專屬動畫、`ReverseAnimation`、
共享元素轉場（也稱為 Hero 動畫），
物理模擬以及 `fling()` 方法。

[animate0]: {{site.repo.this}}/tree/main/examples/animation/animate0
[animate1]: {{site.repo.this}}/tree/main/examples/animation/animate1
[animate2]: {{site.repo.this}}/tree/main/examples/animation/animate2
[animate3]: {{site.repo.this}}/tree/main/examples/animation/animate3
[animate4]: {{site.repo.this}}/tree/main/examples/animation/animate4
[animate5]: {{site.repo.this}}/tree/main/examples/animation/animate5
[`AnimatedWidget`]: {{site.api}}/flutter/widgets/AnimatedWidget-class.html
[`AnimatedBuilder`]: {{site.api}}/flutter/widgets/AnimatedBuilder-class.html
[Introduction to animations]: /ui/animations
[`AnimationController`]: {{site.api}}/flutter/animation/AnimationController-class.html
[`AnimationController` section]: /ui/animations/index#animationcontroller
[`Curves`]: {{site.api}}/flutter/animation/Curves-class.html
[`CurvedAnimation`]: {{site.api}}/flutter/animation/CurvedAnimation-class.html
[Cascade notation]: {{site.dart-site}}/language/operators#cascade-notation
[Dart language documentation]: {{site.dart-site}}/language
[`FadeTransition`]: {{site.api}}/flutter/widgets/FadeTransition-class.html
[Monitoring the progress of the animation]: #monitoring
[Refactoring with AnimatedBuilder]: #refactoring-with-animatedbuilder
[`SlideTransition`]: {{site.api}}/flutter/widgets/SlideTransition-class.html
[Simplifying with AnimatedWidget]: #simplifying-with-animatedwidget
[`SizeTransition`]: {{site.api}}/flutter/widgets/SizeTransition-class.html
[`Tween`]: {{site.api}}/flutter/animation/Tween-class.html
