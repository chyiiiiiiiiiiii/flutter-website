# 使用物理模擬為元件 (Widget) 建立動畫

> 如何實作物理動畫。



<?code-excerpt path-base="cookbook/animation/physics_simulation/"?>

物理模擬可以讓應用程式的互動感覺更真實且具互動性。
舉例來說，你可能會希望動畫化一個元件 (Widget)，讓它看起來像是被彈簧連接，或是在重力作用下下落。

本教學將示範如何將一個元件從拖曳的位置移動回中心，並使用彈簧模擬來實現。

本教學包含以下步驟：

1. 建立動畫控制器
2. 透過手勢移動元件
3. 動畫化元件
4. 計算速度以模擬彈簧運動


## 步驟 1：建立動畫控制器

首先建立一個名為 `DraggableCard` 的 stateful 元件 (StatefulWidget)：

<?code-excerpt "lib/starter.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: PhysicsCardDragDemo()));
}

class PhysicsCardDragDemo extends StatelessWidget {
  const PhysicsCardDragDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: const DraggableCard(child: FlutterLogo(size: 128)),
    );
  }
}

class DraggableCard extends StatefulWidget {
  const DraggableCard({required this.child, super.key});

  final Widget child;

  @override
  State<DraggableCard> createState() => _DraggableCardState();
}

class _DraggableCardState extends State<DraggableCard> {
  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Align(child: Card(child: widget.child));
  }
}
```

讓 `_DraggableCardState` 類別繼承自
[SingleTickerProviderStateMixin][]。
然後在 `initState` 中建立一個 [AnimationController][]，
並將 `vsync` 設為 `this`。

:::note
繼承 `SingleTickerProviderStateMixin` 可以讓狀態 (state) 物件成為
`AnimationController` 的 `TickerProvider`。如需更多資訊，請參閱 [TickerProvider][] 的文件。
:::

```dart diff
- class _DraggableCardState extends State<DraggableCard> {
+ class _DraggableCardState extends State<DraggableCard>
+     with SingleTickerProviderStateMixin {
+   late AnimationController _controller;
+
    @override
    void initState() {
      super.initState();
+     _controller =
+         AnimationController(vsync: this, duration: const Duration(seconds: 1));
    }

    @override
    void dispose() {
+     _controller.dispose();
      super.dispose();
    }
```

## 步驟 2：使用手勢移動元件

讓元件在被拖曳時能夠移動，並在 `_DraggableCardState` 類別中新增一個 [Alignment][] 欄位：

```dart diff
  class _DraggableCardState extends State<DraggableCard>
      with SingleTickerProviderStateMixin {
    late AnimationController _controller;
+   Alignment _dragAlignment = Alignment.center;
```

新增一個 [GestureDetector][]，用來處理 `onPanDown`、`onPanUpdate` 和 `onPanEnd` 回呼（callback）。為了調整對齊方式，可以使用 [MediaQuery][] 來取得元件的尺寸，並除以 2。（這會將「拖曳的像素」單位轉換為 [Align][] 使用的座標。）然後，將 `Align` 元件的 `alignment` 設為 `_dragAlignment`：

```dart diff
  @override
  Widget build(BuildContext context) {
-   return Align(
-     child: Card(
-       child: widget.child,
+   var size = MediaQuery.of(context).size;
+   return GestureDetector(
+     onPanDown: (details) {},
+     onPanUpdate: (details) {
+       setState(() {
+         _dragAlignment += Alignment(
+           details.delta.dx / (size.width / 2),
+           details.delta.dy / (size.height / 2),
+         );
+       });
+     },
+     onPanEnd: (details) {},
+     child: Align(
+       alignment: _dragAlignment,
+       child: Card(
+         child: widget.child,
+       ),
      ),
    );
  }
```

## 步驟 3：為元件加入動畫

當元件被釋放時，應該會以彈簧效果回到中心位置。

新增一個 `Animation<Alignment>` 欄位和一個 `_runAnimation` 方法。這個方法會定義一個 `Tween`，用來在元件被拖曳到的位置與中心點之間進行插值（interpolate）。

```dart diff
  class _DraggableCardState extends State<DraggableCard>
      with SingleTickerProviderStateMixin {
    late AnimationController _controller;
+   late Animation<Alignment> _animation;
    Alignment _dragAlignment = Alignment.center;
```

<?code-excerpt "lib/step3.dart (runAnimation)"?>
```dart
void _runAnimation() {
  _animation = _controller.drive(
    AlignmentTween(begin: _dragAlignment, end: Alignment.center),
  );
  _controller.reset();
  _controller.forward();
}
```

接下來，當 `AnimationController` 產生數值時，請更新 `_dragAlignment`：

```dart diff
  @override
  void initState() {
    super.initState();
    _controller =
        AnimationController(vsync: this, duration: const Duration(seconds: 1));
+   _controller.addListener(() {
+     setState(() {
+       _dragAlignment = _animation.value;
+     });
+   });
  }
```

接下來，讓 `Align` 元件使用 `_dragAlignment` 欄位：

<?code-excerpt "lib/step3.dart (align)"?>
```dart
child: Align(
  alignment: _dragAlignment,
  child: Card(child: widget.child),
),
```

最後，更新 `GestureDetector` 以管理動畫控制器（AnimationController）：

```dart diff
  return GestureDetector(
-   onPanDown: (details) {},
+   onPanDown: (details) {
+     _controller.stop();
+   },
    onPanUpdate: (details) {
      // ...
    },
-   onPanEnd: (details) {},
+   onPanEnd: (details) {
+     _runAnimation();
+   },
    child: Align(
```

## 步驟 4：計算速度以模擬彈簧運動

最後一步需要進行一些數學運算，以計算元件在拖曳結束後的速度。這樣可以讓元件以更真實的方式，先依照該速度繼續移動，然後再被拉回來。（`_runAnimation` 方法已經透過設定動畫的起始與結束對齊方式來決定方向。）

首先，匯入 `physics` 套件：

<?code-excerpt "lib/main.dart (import)"?>
```dart
import 'package:flutter/physics.dart';
```

`onPanEnd` 回呼會提供一個 [DragEndDetails][] 物件。這個物件會提供指標停止接觸螢幕時的速度。該速度的單位是每秒像素（pixels per second），但 `Align` 元件並不是以像素為單位，而是使用介於 [-1.0, -1.0] 到 [1.0, 1.0] 的座標值，其中 [0.0, 0.0] 代表中心點。在步驟 2 計算出的 `size`，則用來將像素轉換為這個範圍內的座標值。

最後，`AnimationController` 有一個 `animateWith()` 方法，可以傳入一個 [SpringSimulation][]：

<?code-excerpt "lib/main.dart (runAnimation)"?>
```dart
/// Calculates and runs a [SpringSimulation].
void _runAnimation(Offset pixelsPerSecond, Size size) {
  _animation = _controller.drive(
    AlignmentTween(begin: _dragAlignment, end: Alignment.center),
  );
  // Calculate the velocity relative to the unit interval, [0,1],
  // used by the animation controller.
  final unitsPerSecondX = pixelsPerSecond.dx / size.width;
  final unitsPerSecondY = pixelsPerSecond.dy / size.height;
  final unitsPerSecond = Offset(unitsPerSecondX, unitsPerSecondY);
  final unitVelocity = unitsPerSecond.distance;

  const spring = SpringDescription(mass: 1, stiffness: 1, damping: 1);

  final simulation = SpringSimulation(spring, 0, 1, -unitVelocity);

  _controller.animateWith(simulation);
}
```

別忘了以 velocity（速度）和 size（大小）來呼叫 `_runAnimation()`：

<?code-excerpt "lib/main.dart (onPanEnd)"?>
```dart
onPanEnd: (details) {
  _runAnimation(details.velocity.pixelsPerSecond, size);
},
```

:::note
現在動畫控制器（AnimationController）已經使用模擬（simulation），其 `duration` 參數已不再需要。
:::

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter physics simulation hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';
import 'package:flutter/physics.dart';

void main() {
  runApp(const MaterialApp(home: PhysicsCardDragDemo()));
}

class PhysicsCardDragDemo extends StatelessWidget {
  const PhysicsCardDragDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: const DraggableCard(child: FlutterLogo(size: 128)),
    );
  }
}

/// A draggable card that moves back to [Alignment.center] when it's
/// released.
class DraggableCard extends StatefulWidget {
  const DraggableCard({required this.child, super.key});

  final Widget child;

  @override
  State<DraggableCard> createState() => _DraggableCardState();
}

class _DraggableCardState extends State<DraggableCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  /// The alignment of the card as it is dragged or being animated.
  ///
  /// While the card is being dragged, this value is set to the values computed
  /// in the GestureDetector onPanUpdate callback. If the animation is running,
  /// this value is set to the value of the [_animation].
  Alignment _dragAlignment = Alignment.center;

  late Animation<Alignment> _animation;

  /// Calculates and runs a [SpringSimulation].
  void _runAnimation(Offset pixelsPerSecond, Size size) {
    _animation = _controller.drive(
      AlignmentTween(begin: _dragAlignment, end: Alignment.center),
    );
    // Calculate the velocity relative to the unit interval, [0,1],
    // used by the animation controller.
    final unitsPerSecondX = pixelsPerSecond.dx / size.width;
    final unitsPerSecondY = pixelsPerSecond.dy / size.height;
    final unitsPerSecond = Offset(unitsPerSecondX, unitsPerSecondY);
    final unitVelocity = unitsPerSecond.distance;

    const spring = SpringDescription(mass: 1, stiffness: 1, damping: 1);

    final simulation = SpringSimulation(spring, 0, 1, -unitVelocity);

    _controller.animateWith(simulation);
  }

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);

    _controller.addListener(() {
      setState(() {
        _dragAlignment = _animation.value;
      });
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return GestureDetector(
      onPanDown: (details) {
        _controller.stop();
      },
      onPanUpdate: (details) {
        setState(() {
          _dragAlignment += Alignment(
            details.delta.dx / (size.width / 2),
            details.delta.dy / (size.height / 2),
          );
        });
      },
      onPanEnd: (details) {
        _runAnimation(details.velocity.pixelsPerSecond, size);
      },
      child: Align(
        alignment: _dragAlignment,
        child: Card(child: widget.child),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/animation-physics-card-drag.webp" alt="展示一個元件被拖曳並自動回彈至中央的示範" class="site-mobile-screenshot" />
</noscript>

[Align]: https://api.flutter.dev/flutter/widgets/Align-class.html
[Alignment]: https://api.flutter.dev/flutter/painting/Alignment-class.html
[AnimationController]: https://api.flutter.dev/flutter/animation/AnimationController-class.html
[GestureDetector]: https://api.flutter.dev/flutter/widgets/GestureDetector-class.html
[SingleTickerProviderStateMixin]: https://api.flutter.dev/flutter/widgets/SingleTickerProviderStateMixin-mixin.html
[TickerProvider]: https://api.flutter.dev/flutter/scheduler/TickerProvider-class.html
[MediaQuery]: https://api.flutter.dev/flutter/widgets/MediaQuery-class.html
[DragEndDetails]: https://api.flutter.dev/flutter/gestures/DragEndDetails-class.html
[SpringSimulation]: https://api.flutter.dev/flutter/physics/SpringSimulation-class.html

