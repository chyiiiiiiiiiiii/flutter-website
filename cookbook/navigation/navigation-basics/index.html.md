# 導航至新螢幕並返回

> 如何在路由之間進行導航。



<?code-excerpt path-base="cookbook/navigation/navigation_basics"?>

大多數應用程式都包含多個螢幕，用於顯示不同類型的資訊。例如，一個應用程式可能有一個顯示產品的螢幕。當使用者點擊某個產品的圖片時，會跳轉到新的螢幕，顯示該產品的詳細資訊。

:::note Terminology
在 Flutter 中，_screens_（螢幕）和 _pages_（頁面）稱為 _routes_（路由）。
本篇教學後續將以「路由」來稱呼。
:::

在 Android 中，路由相當於 `Activity`。
在 iOS 中，路由相當於 `ViewController`。
在 Flutter 中，路由就是一個元件 (Widget)。

本教學使用 [`Navigator`][] 來導覽至新的路由。

接下來的幾個章節將說明如何在兩個路由之間進行導航，步驟如下：

  1. 建立兩個路由。
  2. 使用 `Navigator.push()` 導航至第二個路由。
  3. 使用 `Navigator.pop()` 返回第一個路由。

## 1. 建立兩個路由

首先，建立兩個可供操作的路由。由於這是一個基礎範例，每個路由僅包含一個按鈕。在第一個路由點擊按鈕會導航至第二個路由；在第二個路由點擊按鈕則會返回第一個路由。

首先，設定視覺結構：

<Tabs key="target-os">

<Tab name="Android">

<?code-excerpt "lib/main_step1.dart (first-second-routes)"?>
```dart
class FirstRoute extends StatelessWidget {
  const FirstRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Route')),
      body: Center(
        child: ElevatedButton(
          child: const Text('Open route'),
          onPressed: () {
            // Navigate to second route when tapped.
          },
        ),
      ),
    );
  }
}

class SecondRoute extends StatelessWidget {
  const SecondRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Second Route')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Navigate back to first route when tapped.
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

</Tab>

<Tab name="iOS">

<?code-excerpt "lib/main_step1_cupertino.dart (first-second-routes)"?>
```dart
class FirstRoute extends StatelessWidget {
  const FirstRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(middle: Text('First Route')),
      child: Center(
        child: CupertinoButton(
          child: const Text('Open route'),
          onPressed: () {
            // Navigate to second route when tapped.
          },
        ),
      ),
    );
  }
}

class SecondRoute extends StatelessWidget {
  const SecondRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(middle: Text('Second Route')),
      child: Center(
        child: CupertinoButton(
          onPressed: () {
            // Navigate back to first route when tapped.
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

</Tab>

</Tabs>

## 2. 使用 Navigator.push() 切換到第二個路由

若要切換到新的路由，請使用 [`Navigator.push()`][] 方法。`push()` 方法會將 `Route` 加入由 `Navigator` 管理的路由堆疊中。那麼 `Route` 是從哪裡來的呢？你可以自行建立，也可以使用像 [`MaterialPageRoute`][] 或 [`CupertinoPageRoute`][] 這類特定平台的 Route。使用特定平台的 Route 很有用，因為它會以該平台專屬的動畫切換到新路由。

在 `FirstRoute` 元件的 `build()` 方法中，請更新 `onPressed()` 回呼（callback）：

<Tabs key="target-os">

<Tab name="Android">

<?code-excerpt "lib/main_step2.dart (first-route-on-pressed)" replace="/^\},$/}/g"?>
```dart
// Within the `FirstRoute` widget:
onPressed: () {
  Navigator.push(
    context,
    MaterialPageRoute<void>(
      builder: (context) => const SecondRoute(),
    ),
  );
}
```

</Tab>

<Tab name="iOS">

<?code-excerpt "lib/main_step2_cupertino.dart (first-route-on-pressed)" replace="/^\},$/}/g"?>
```dart
// Within the `FirstRoute` widget:
onPressed: () {
  Navigator.push(
    context,
    CupertinoPageRoute<void>(
      builder: (context) => const SecondRoute(),
    ),
  );
}
```

</Tab>

</Tabs>

## 3. 使用 Navigator.pop() 返回第一個路由

如何關閉第二個路由並返回第一個？
可以使用 [`Navigator.pop()`][] 方法來實現。
`pop()` 方法會將目前的 `Route` 從 `Navigator` 所管理的路由堆疊中移除。

若要實作返回原始路由，請更新 `SecondRoute` 元件中的 `onPressed()` 回呼函式：

<?code-excerpt "lib/main_step2.dart (second-route-on-pressed)" replace="/^\},$/}/g"?>
```dart
// Within the SecondRoute widget
onPressed: () {
  Navigator.pop(context);
}
```

## 互動範例

<Tabs key="target-os">

<Tab name="Android">

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter navigation hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(title: 'Navigation Basics', home: FirstRoute()));
}

class FirstRoute extends StatelessWidget {
  const FirstRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Route')),
      body: Center(
        child: ElevatedButton(
          child: const Text('Open route'),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute<void>(
                builder: (context) => const SecondRoute(),
              ),
            );
          },
        ),
      ),
    );
  }
}

class SecondRoute extends StatelessWidget {
  const SecondRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Second Route')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/navigation-basics.webp" alt="Navigation Basics Demo" class="site-mobile-screenshot" />
</noscript>

</Tab>

<Tab name="iOS">

<?code-excerpt "lib/main_cupertino.dart"?>
```dartpad title="Flutter Cupertino theme hands-on example in DartPad" run="true"
import 'package:flutter/cupertino.dart';

void main() {
  runApp(const CupertinoApp(title: 'Navigation Basics', home: FirstRoute()));
}

class FirstRoute extends StatelessWidget {
  const FirstRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(middle: Text('First Route')),
      child: Center(
        child: CupertinoButton(
          child: const Text('Open route'),
          onPressed: () {
            Navigator.push(
              context,
              CupertinoPageRoute<void>(
                builder: (context) => const SecondRoute(),
              ),
            );
          },
        ),
      ),
    );
  }
}

class SecondRoute extends StatelessWidget {
  const SecondRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(middle: Text('Second Route')),
      child: Center(
        child: CupertinoButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/navigation-basics-cupertino.webp" alt="Navigation Basics Cupertino Demo" class="site-mobile-screenshot" />
</noscript>

</Tab>

</Tabs>

## 其他導覽方法

本主題中的範例展示了一種使用 [`push`] 和 [`pop`] 方法於 [`Navigator`] 類別中，來導覽至新螢幕並返回前一個場景的方法，但其實還有其他幾種 `Navigator` 靜態方法可供使用。以下是其中幾個：

*   [`pushAndRemoveUntil`]：將一個導覽路由加入堆疊，然後移除堆疊中最新的路由，直到符合特定條件為止。
*   [`pushReplacement`]：以新的路由取代堆疊頂端的當前路由。
*   [`replace`]：將堆疊中的某個路由以另一個路由取代。
*   [`replaceRouteBelow`]：取代堆疊中特定路由下方的路由。
*   [`popUntil`]：移除最近加入堆疊的路由，直到符合特定條件為止。
*   [`removeRoute`]：從堆疊中移除特定路由。
*   [`removeRouteBelow`]：移除堆疊中特定路由下方的路由。
*   [`restorablePush`]：還原先前從堆疊中移除的路由。

[Cupertino]: /ui/widgets/cupertino
[Material Components]: /ui/widgets/material
[`CupertinoApp`]: https://api.flutter.dev/flutter/cupertino/CupertinoApp-class.html
[`CupertinoButton`]: https://api.flutter.dev/flutter/cupertino/CupertinoButton-class.html
[`CupertinoPageRoute`]: https://api.flutter.dev/flutter/cupertino/CupertinoPageRoute-class.html
[`CupertinoPageScaffold`]: https://api.flutter.dev/flutter/cupertino/CupertinoPageScaffold-class.html
[`ElevatedButton`]: https://api.flutter.dev/flutter/material/ElevatedButton-class.html
[`MaterialApp`]: https://api.flutter.dev/flutter/material/MaterialApp-class.html
[`MaterialPageRoute`]: https://api.flutter.dev/flutter/material/MaterialPageRoute-class.html
[`Navigator.pop()`]: https://api.flutter.dev/flutter/widgets/Navigator/pop.html
[`Navigator.push()`]: https://api.flutter.dev/flutter/widgets/Navigator/push.html
[`Navigator`]: https://api.flutter.dev/flutter/widgets/Navigator-class.html
[`pop`]: https://api.flutter.dev/flutter/widgets/Navigator/pop.html
[`popUntil`]: https://api.flutter.dev/flutter/widgets/Navigator/popUntil.html
[`push`]: https://api.flutter.dev/flutter/widgets/Navigator/push.html
[`pushAndRemoveUntil`]: https://api.flutter.dev/flutter/widgets/Navigator/pushAndRemoveUntil.html
[`pushReplacement`]: https://api.flutter.dev/flutter/widgets/Navigator/pushReplacement.html
[`removeRoute`]: https://api.flutter.dev/flutter/widgets/Navigator/removeRoute.html
[`removeRouteBelow`]: https://api.flutter.dev/flutter/widgets/Navigator/removeRouteBelow.html
[`replace`]: https://api.flutter.dev/flutter/widgets/Navigator/replace.html
[`replaceRouteBelow`]: https://api.flutter.dev/flutter/widgets/Navigator/replaceRouteBelow.html
[`restorablePush`]: https://api.flutter.dev/flutter/widgets/Navigator/restorablePush.html
[`Scaffold`]: https://api.flutter.dev/flutter/material/Scaffold-class.html

