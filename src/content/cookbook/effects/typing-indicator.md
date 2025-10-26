---
title: 建立輸入中指示器
description: 如何實作輸入中指示器。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/effects/typing_indicator"?>

{% render docs/deprecated.md %}

現代聊天應用程式會在其他使用者正在輸入回應時顯示指示器。這些指示器有助於防止你和對方之間出現快速且相互衝突的回應。在本教學中，你將建立一個會以動畫進出畫面的對話泡泡輸入中指示器。

下方動畫展示了應用程式的行為：

![The typing indicator is turned on and off](/assets/images/docs/cookbook/effects/TypingIndicator.webp){:.site-mobile-screenshot}

## 定義輸入中指示器元件 (Widget)

輸入中指示器存在於它自己的元件 (Widget) 中，因此可以在你的應用程式中任何地方使用。和所有控制動畫 (Animation) 的元件一樣，輸入中指示器需要是一個有狀態元件 (StatefulWidget)。這個元件接受一個布林值，用來決定指示器是否顯示。這個對話泡泡輸入中指示器可接受泡泡顏色，以及用於大對話泡泡內閃爍圓圈的明暗兩種顏色。

請定義一個名為 `TypingIndicator` 的新有狀態元件 (StatefulWidget)。

<?code-excerpt "lib/excerpt1.dart (typing-indicator)"?>
```dart
class TypingIndicator extends StatefulWidget {
  const TypingIndicator({
    super.key,
    this.showIndicator = false,
    this.bubbleColor = const Color(0xFF646b7f),
    this.flashingCircleDarkColor = const Color(0xFF333333),
    this.flashingCircleBrightColor = const Color(0xFFaec1dd),
  });

  final bool showIndicator;
  final Color bubbleColor;
  final Color flashingCircleDarkColor;
  final Color flashingCircleBrightColor;

  @override
  State<TypingIndicator> createState() => _TypingIndicatorState();
}

class _TypingIndicatorState extends State<TypingIndicator> {
  @override
  Widget build(BuildContext context) {
    // TODO:
    return const SizedBox();
  }
}
```

## 為輸入中指示器預留空間

當輸入中指示器未顯示時，它不會佔用任何空間。因此，當指示器出現時，需要增加其高度；而當指示器消失時，則需要縮小其高度。

輸入中指示器的高度可以設為其內部語音氣泡的自然高度。然而，這些語音氣泡會以彈性的曲線展開。如果這種彈性效果快速地將所有對話訊息向上或向下推動，視覺上會顯得過於突兀。因此，輸入中指示器的高度會以自身的動畫方式變化，在氣泡出現前，先平滑地展開高度；而當氣泡消失時，高度則會平滑地收縮至零。

這種行為需要對輸入中指示器的高度進行[明確動畫][explicit animation]。

請為輸入中指示器的高度定義一個動畫，然後將該動畫值套用到輸入中指示器內的`SizedBox`元件。

<?code-excerpt "lib/excerpt2.dart (typing-indicator-state)"?>
```dart
class _TypingIndicatorState extends State<TypingIndicator>
    with TickerProviderStateMixin {
  late AnimationController _appearanceController;
  late Animation<double> _indicatorSpaceAnimation;

  @override
  void initState() {
    super.initState();

    _appearanceController = AnimationController(vsync: this);

    _indicatorSpaceAnimation = CurvedAnimation(
      parent: _appearanceController,
      curve: const Interval(0.0, 0.4, curve: Curves.easeOut),
      reverseCurve: const Interval(0.0, 1.0, curve: Curves.easeOut),
    ).drive(Tween<double>(begin: 0.0, end: 60.0));

    if (widget.showIndicator) {
      _showIndicator();
    }
  }

  @override
  void didUpdateWidget(TypingIndicator oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (widget.showIndicator != oldWidget.showIndicator) {
      if (widget.showIndicator) {
        _showIndicator();
      } else {
        _hideIndicator();
      }
    }
  }

  @override
  void dispose() {
    _appearanceController.dispose();
    super.dispose();
  }

  void _showIndicator() {
    _appearanceController
      ..duration = const Duration(milliseconds: 750)
      ..forward();
  }

  void _hideIndicator() {
    _appearanceController
      ..duration = const Duration(milliseconds: 150)
      ..reverse();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _indicatorSpaceAnimation,
      builder: (context, child) {
        return SizedBox(height: _indicatorSpaceAnimation.value);
      },
    );
  }
}
```

`TypingIndicator` 會根據傳入的 `showIndicator` 變數是 `true` 還是 `false`，分別向前或向後執行動畫。

控制高度的動畫會根據動畫的方向使用不同的動畫曲線（animation curve）。
當動畫向前移動時，需要快速為對話泡泡（speech bubbles）騰出空間。因此，向前的動畫曲線會在整個出現動畫的前 40% 內完成高度動畫。
當動畫反向時，則需要給對話泡泡足夠的時間消失，再收縮高度。這時，使用一個涵蓋所有可用時間的 ease-out 曲線，是實現這種行為的好方法。

:::note
`AnimatedBuilder` 元件（Widget）會在 `_indicatorSpaceAnimation` 發生變化時，重建 `SizedBox` 元件。
使用 `AnimatedBuilder` 的替代做法，是在每次動畫變化時呼叫 `setState()`，然後在 `TypingIndicator` 內重建整個元件樹（widget tree）。
這種方式呼叫 `setState()` 是可行的，但隨著更多元件加入這個元件樹，只為了改變 `SizedBox` 元件的高度而重建整棵樹，會浪費 CPU 資源。
:::

## 為對話泡泡加入動畫

打字指示器（typing indicator）會顯示三個對話泡泡。
前兩個泡泡較小且呈圓形，第三個泡泡則是橢圓形，裡面包含幾個閃爍的圓點。
這些泡泡會從可用空間的左下角依序錯落排列。

每個泡泡會透過動畫將其縮放比例從 0% 增加到 100%，而且每個泡泡的動畫時機略有不同，讓每個泡泡看起來像是依序出現。
這種效果稱為[階梯式動畫（staggered animation）][staggered animation]。

請將三個泡泡繪製在左下角的理想位置。然後，當 `showIndicator` 屬性變化時，為泡泡的縮放比例加入動畫，讓泡泡出現時呈現階梯式效果。

<?code-excerpt "lib/excerpt3.dart (bubbles)"?>
```dart
class _TypingIndicatorState extends State<TypingIndicator>
    with TickerProviderStateMixin {
  late AnimationController _appearanceController;

  late Animation<double> _indicatorSpaceAnimation;

  late Animation<double> _smallBubbleAnimation;
  late Animation<double> _mediumBubbleAnimation;
  late Animation<double> _largeBubbleAnimation;

  late AnimationController _repeatingController;
  final List<Interval> _dotIntervals = const [
    Interval(0.25, 0.8),
    Interval(0.35, 0.9),
    Interval(0.45, 1.0),
  ];

  @override
  void initState() {
    super.initState();

    _appearanceController = AnimationController(vsync: this)
      ..addListener(() {
        setState(() {});
      });

    _indicatorSpaceAnimation = CurvedAnimation(
      parent: _appearanceController,
      curve: const Interval(0.0, 0.4, curve: Curves.easeOut),
      reverseCurve: const Interval(0.0, 1.0, curve: Curves.easeOut),
    ).drive(Tween<double>(begin: 0.0, end: 60.0));

    _smallBubbleAnimation = CurvedAnimation(
      parent: _appearanceController,
      curve: const Interval(0.0, 0.5, curve: Curves.elasticOut),
      reverseCurve: const Interval(0.0, 0.3, curve: Curves.easeOut),
    );
    _mediumBubbleAnimation = CurvedAnimation(
      parent: _appearanceController,
      curve: const Interval(0.2, 0.7, curve: Curves.elasticOut),
      reverseCurve: const Interval(0.2, 0.6, curve: Curves.easeOut),
    );
    _largeBubbleAnimation = CurvedAnimation(
      parent: _appearanceController,
      curve: const Interval(0.3, 1.0, curve: Curves.elasticOut),
      reverseCurve: const Interval(0.5, 1.0, curve: Curves.easeOut),
    );

    if (widget.showIndicator) {
      _showIndicator();
    }
  }

  @override
  void didUpdateWidget(TypingIndicator oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (widget.showIndicator != oldWidget.showIndicator) {
      if (widget.showIndicator) {
        _showIndicator();
      } else {
        _hideIndicator();
      }
    }
  }

  @override
  void dispose() {
    _appearanceController.dispose();
    super.dispose();
  }

  void _showIndicator() {
    _appearanceController
      ..duration = const Duration(milliseconds: 750)
      ..forward();
  }

  void _hideIndicator() {
    _appearanceController
      ..duration = const Duration(milliseconds: 150)
      ..reverse();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _indicatorSpaceAnimation,
      builder: (context, child) {
        return SizedBox(height: _indicatorSpaceAnimation.value, child: child);
      },
      child: Stack(
        children: [
          AnimatedBubble(
            animation: _smallBubbleAnimation,
            left: 8,
            bottom: 8,
            bubble: CircleBubble(size: 8, bubbleColor: widget.bubbleColor),
          ),
          AnimatedBubble(
            animation: _mediumBubbleAnimation,
            left: 10,
            bottom: 10,
            bubble: CircleBubble(size: 16, bubbleColor: widget.bubbleColor),
          ),
          AnimatedBubble(
            animation: _largeBubbleAnimation,
            left: 12,
            bottom: 12,
            bubble: StatusBubble(
              dotIntervals: _dotIntervals,
              flashingCircleDarkColor: widget.flashingCircleDarkColor,
              flashingCircleBrightColor: widget.flashingCircleBrightColor,
              bubbleColor: widget.bubbleColor,
            ),
          ),
        ],
      ),
    );
  }
}

class CircleBubble extends StatelessWidget {
  const CircleBubble({
    super.key,
    required this.size,
    required this.bubbleColor,
  });

  final double size;
  final Color bubbleColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(shape: BoxShape.circle, color: bubbleColor),
    );
  }
}

class AnimatedBubble extends StatelessWidget {
  const AnimatedBubble({
    super.key,
    required this.animation,
    required this.left,
    required this.bottom,
    required this.bubble,
  });

  final Animation<double> animation;
  final double left;
  final double bottom;
  final Widget bubble;

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: left,
      bottom: bottom,
      child: AnimatedBuilder(
        animation: animation,
        builder: (context, child) {
          return Transform.scale(
            scale: animation.value,
            alignment: Alignment.bottomLeft,
            child: child,
          );
        },
        child: bubble,
      ),
    );
  }
}

class StatusBubble extends StatelessWidget {
  const StatusBubble({
    super.key,
    required this.dotIntervals,
    required this.flashingCircleBrightColor,
    required this.flashingCircleDarkColor,
    required this.bubbleColor,
  });

  final List<Interval> dotIntervals;
  final Color flashingCircleDarkColor;
  final Color flashingCircleBrightColor;
  final Color bubbleColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 85,
      height: 44,
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(27),
        color: bubbleColor,
      ),
    );
  }
}
```

## 動畫化閃爍的圓點

在大型對話泡泡（speech bubble）內，輸入指示器（typing indicator）會顯示三個不斷閃爍的小圓點。每個圓點的閃爍時機略有不同，營造出單一光源在每個圓點後方移動的視覺效果。這個閃爍動畫會無限重複。

引入一個重複的 `AnimationController` 來實作圓點閃爍，並將其傳遞給 `StatusBubble`。

<?code-excerpt "lib/excerpt4.dart (animation-controller)"?>
```dart
class _TypingIndicatorState extends State<TypingIndicator>
    with TickerProviderStateMixin {
  late AnimationController _appearanceController;

  late Animation<double> _indicatorSpaceAnimation;

  late Animation<double> _smallBubbleAnimation;
  late Animation<double> _mediumBubbleAnimation;
  late Animation<double> _largeBubbleAnimation;

  late AnimationController _repeatingController;
  final List<Interval> _dotIntervals = const [
    Interval(0.25, 0.8),
    Interval(0.35, 0.9),
    Interval(0.45, 1.0),
  ];

  @override
  void initState() {
    super.initState();

    // other initializations...

    _repeatingController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );

    if (widget.showIndicator) {
      _showIndicator();
    }
  }

  @override
  void dispose() {
    _appearanceController.dispose();
    _repeatingController.dispose();
    super.dispose();
  }

  void _showIndicator() {
    _appearanceController
      ..duration = const Duration(milliseconds: 750)
      ..forward();
    _repeatingController.repeat(); // <-- Add this
  }

  void _hideIndicator() {
    _appearanceController
      ..duration = const Duration(milliseconds: 150)
      ..reverse();
    _repeatingController.stop(); // <-- Add this
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _indicatorSpaceAnimation,
      builder: (context, child) {
        return SizedBox(height: _indicatorSpaceAnimation.value, child: child);
      },
      child: Stack(
        children: [
          AnimatedBubble(
            animation: _smallBubbleAnimation,
            left: 8,
            bottom: 8,
            bubble: CircleBubble(size: 8, bubbleColor: widget.bubbleColor),
          ),
          AnimatedBubble(
            animation: _mediumBubbleAnimation,
            left: 10,
            bottom: 10,
            bubble: CircleBubble(size: 16, bubbleColor: widget.bubbleColor),
          ),
          AnimatedBubble(
            animation: _largeBubbleAnimation,
            left: 12,
            bottom: 12,
            bubble: StatusBubble(
              repeatingController: _repeatingController, // <-- Add this
              dotIntervals: _dotIntervals,
              flashingCircleDarkColor: widget.flashingCircleDarkColor,
              flashingCircleBrightColor: widget.flashingCircleBrightColor,
              bubbleColor: widget.bubbleColor,
            ),
          ),
        ],
      ),
    );
  }
}

class StatusBubble extends StatelessWidget {
  const StatusBubble({
    super.key,
    required this.repeatingController,
    required this.dotIntervals,
    required this.flashingCircleBrightColor,
    required this.flashingCircleDarkColor,
    required this.bubbleColor,
  });

  final AnimationController repeatingController;
  final List<Interval> dotIntervals;
  final Color flashingCircleDarkColor;
  final Color flashingCircleBrightColor;
  final Color bubbleColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 85,
      height: 44,
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(27),
        color: bubbleColor,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          FlashingCircle(
            index: 0,
            repeatingController: repeatingController,
            dotIntervals: dotIntervals,
            flashingCircleDarkColor: flashingCircleDarkColor,
            flashingCircleBrightColor: flashingCircleBrightColor,
          ),
          FlashingCircle(
            index: 1,
            repeatingController: repeatingController,
            dotIntervals: dotIntervals,
            flashingCircleDarkColor: flashingCircleDarkColor,
            flashingCircleBrightColor: flashingCircleBrightColor,
          ),
          FlashingCircle(
            index: 2,
            repeatingController: repeatingController,
            dotIntervals: dotIntervals,
            flashingCircleDarkColor: flashingCircleDarkColor,
            flashingCircleBrightColor: flashingCircleBrightColor,
          ),
        ],
      ),
    );
  }
}

class FlashingCircle extends StatelessWidget {
  const FlashingCircle({
    super.key,
    required this.index,
    required this.repeatingController,
    required this.dotIntervals,
    required this.flashingCircleBrightColor,
    required this.flashingCircleDarkColor,
  });

  final int index;
  final AnimationController repeatingController;
  final List<Interval> dotIntervals;
  final Color flashingCircleDarkColor;
  final Color flashingCircleBrightColor;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: repeatingController,
      builder: (context, child) {
        final circleFlashPercent = dotIntervals[index].transform(
          repeatingController.value,
        );
        final circleColorPercent = sin(pi * circleFlashPercent);

        return Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Color.lerp(
              flashingCircleDarkColor,
              flashingCircleBrightColor,
              circleColorPercent,
            ),
          ),
        );
      },
    );
  }
}
```

每個圓點都會使用正弦（`sin`）函數來計算其顏色，這樣顏色在最小值與最大值之間會平滑地變化。此外，每個圓點會在指定的區間內進行顏色動畫，這個區間僅佔整體動畫時間的一部分。這些區間的位置排列，產生出一個光源在三個圓點後方移動的視覺效果。

恭喜你！你現在已經擁有一個輸入指示器（typing indicator），能讓使用者知道其他人正在輸入。這個指示器會以動畫方式顯示與隱藏，並在對方輸入時持續重複播放動畫。

## 互動範例

執行應用程式：

* 點擊螢幕下方的圓形開關，可以開啟或關閉輸入指示器泡泡。

<!-- Start DartPad -->

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter typing indicator hands-on example in DartPad" run="true"
import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: ExampleIsTyping(),
      debugShowCheckedModeBanner: false,
    ),
  );
}

const _backgroundColor = Color(0xFF333333);

class ExampleIsTyping extends StatefulWidget {
  const ExampleIsTyping({super.key});

  @override
  State<ExampleIsTyping> createState() => _ExampleIsTypingState();
}

class _ExampleIsTypingState extends State<ExampleIsTyping> {
  bool _isSomeoneTyping = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _backgroundColor,
      appBar: AppBar(title: const Text('Typing Indicator')),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(vertical: 8),
              itemCount: 25,
              reverse: true,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(left: 100),
                  child: FakeMessage(isBig: index.isOdd),
                );
              },
            ),
          ),
          Align(
            alignment: Alignment.bottomLeft,
            child: TypingIndicator(showIndicator: _isSomeoneTyping),
          ),
          Container(
            color: Colors.grey,
            padding: const EdgeInsets.all(16),
            child: Center(
              child: CupertinoSwitch(
                onChanged: (newValue) {
                  setState(() {
                    _isSomeoneTyping = newValue;
                  });
                },
                value: _isSomeoneTyping,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class TypingIndicator extends StatefulWidget {
  const TypingIndicator({
    super.key,
    this.showIndicator = false,
    this.bubbleColor = const Color(0xFF646b7f),
    this.flashingCircleDarkColor = const Color(0xFF333333),
    this.flashingCircleBrightColor = const Color(0xFFaec1dd),
  });

  final bool showIndicator;
  final Color bubbleColor;
  final Color flashingCircleDarkColor;
  final Color flashingCircleBrightColor;

  @override
  State<TypingIndicator> createState() => _TypingIndicatorState();
}

class _TypingIndicatorState extends State<TypingIndicator>
    with TickerProviderStateMixin {
  late AnimationController _appearanceController;

  late Animation<double> _indicatorSpaceAnimation;

  late Animation<double> _smallBubbleAnimation;
  late Animation<double> _mediumBubbleAnimation;
  late Animation<double> _largeBubbleAnimation;

  late AnimationController _repeatingController;
  final List<Interval> _dotIntervals = const [
    Interval(0.25, 0.8),
    Interval(0.35, 0.9),
    Interval(0.45, 1.0),
  ];

  @override
  void initState() {
    super.initState();

    _appearanceController = AnimationController(vsync: this)
      ..addListener(() {
        setState(() {});
      });

    _indicatorSpaceAnimation = CurvedAnimation(
      parent: _appearanceController,
      curve: const Interval(0.0, 0.4, curve: Curves.easeOut),
      reverseCurve: const Interval(0.0, 1.0, curve: Curves.easeOut),
    ).drive(Tween<double>(begin: 0.0, end: 60.0));

    _smallBubbleAnimation = CurvedAnimation(
      parent: _appearanceController,
      curve: const Interval(0.0, 0.5, curve: Curves.elasticOut),
      reverseCurve: const Interval(0.0, 0.3, curve: Curves.easeOut),
    );
    _mediumBubbleAnimation = CurvedAnimation(
      parent: _appearanceController,
      curve: const Interval(0.2, 0.7, curve: Curves.elasticOut),
      reverseCurve: const Interval(0.2, 0.6, curve: Curves.easeOut),
    );
    _largeBubbleAnimation = CurvedAnimation(
      parent: _appearanceController,
      curve: const Interval(0.3, 1.0, curve: Curves.elasticOut),
      reverseCurve: const Interval(0.5, 1.0, curve: Curves.easeOut),
    );

    _repeatingController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );

    if (widget.showIndicator) {
      _showIndicator();
    }
  }

  @override
  void didUpdateWidget(TypingIndicator oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (widget.showIndicator != oldWidget.showIndicator) {
      if (widget.showIndicator) {
        _showIndicator();
      } else {
        _hideIndicator();
      }
    }
  }

  @override
  void dispose() {
    _appearanceController.dispose();
    _repeatingController.dispose();
    super.dispose();
  }

  void _showIndicator() {
    _appearanceController
      ..duration = const Duration(milliseconds: 750)
      ..forward();
    _repeatingController.repeat();
  }

  void _hideIndicator() {
    _appearanceController
      ..duration = const Duration(milliseconds: 150)
      ..reverse();
    _repeatingController.stop();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _indicatorSpaceAnimation,
      builder: (context, child) {
        return SizedBox(height: _indicatorSpaceAnimation.value, child: child);
      },
      child: Stack(
        children: [
          AnimatedBubble(
            animation: _smallBubbleAnimation,
            left: 8,
            bottom: 8,
            bubble: CircleBubble(size: 8, bubbleColor: widget.bubbleColor),
          ),
          AnimatedBubble(
            animation: _mediumBubbleAnimation,
            left: 10,
            bottom: 10,
            bubble: CircleBubble(size: 16, bubbleColor: widget.bubbleColor),
          ),
          AnimatedBubble(
            animation: _largeBubbleAnimation,
            left: 12,
            bottom: 12,
            bubble: StatusBubble(
              repeatingController: _repeatingController,
              dotIntervals: _dotIntervals,
              flashingCircleDarkColor: widget.flashingCircleDarkColor,
              flashingCircleBrightColor: widget.flashingCircleBrightColor,
              bubbleColor: widget.bubbleColor,
            ),
          ),
        ],
      ),
    );
  }
}

class CircleBubble extends StatelessWidget {
  const CircleBubble({
    super.key,
    required this.size,
    required this.bubbleColor,
  });

  final double size;
  final Color bubbleColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(shape: BoxShape.circle, color: bubbleColor),
    );
  }
}

class AnimatedBubble extends StatelessWidget {
  const AnimatedBubble({
    super.key,
    required this.animation,
    required this.left,
    required this.bottom,
    required this.bubble,
  });

  final Animation<double> animation;
  final double left;
  final double bottom;
  final Widget bubble;

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: left,
      bottom: bottom,
      child: AnimatedBuilder(
        animation: animation,
        builder: (context, child) {
          return Transform.scale(
            scale: animation.value,
            alignment: Alignment.bottomLeft,
            child: child,
          );
        },
        child: bubble,
      ),
    );
  }
}

class StatusBubble extends StatelessWidget {
  const StatusBubble({
    super.key,
    required this.repeatingController,
    required this.dotIntervals,
    required this.flashingCircleBrightColor,
    required this.flashingCircleDarkColor,
    required this.bubbleColor,
  });

  final AnimationController repeatingController;
  final List<Interval> dotIntervals;
  final Color flashingCircleDarkColor;
  final Color flashingCircleBrightColor;
  final Color bubbleColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 85,
      height: 44,
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(27),
        color: bubbleColor,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          FlashingCircle(
            index: 0,
            repeatingController: repeatingController,
            dotIntervals: dotIntervals,
            flashingCircleDarkColor: flashingCircleDarkColor,
            flashingCircleBrightColor: flashingCircleBrightColor,
          ),
          FlashingCircle(
            index: 1,
            repeatingController: repeatingController,
            dotIntervals: dotIntervals,
            flashingCircleDarkColor: flashingCircleDarkColor,
            flashingCircleBrightColor: flashingCircleBrightColor,
          ),
          FlashingCircle(
            index: 2,
            repeatingController: repeatingController,
            dotIntervals: dotIntervals,
            flashingCircleDarkColor: flashingCircleDarkColor,
            flashingCircleBrightColor: flashingCircleBrightColor,
          ),
        ],
      ),
    );
  }
}

class FlashingCircle extends StatelessWidget {
  const FlashingCircle({
    super.key,
    required this.index,
    required this.repeatingController,
    required this.dotIntervals,
    required this.flashingCircleBrightColor,
    required this.flashingCircleDarkColor,
  });

  final int index;
  final AnimationController repeatingController;
  final List<Interval> dotIntervals;
  final Color flashingCircleDarkColor;
  final Color flashingCircleBrightColor;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: repeatingController,
      builder: (context, child) {
        final circleFlashPercent = dotIntervals[index].transform(
          repeatingController.value,
        );
        final circleColorPercent = sin(pi * circleFlashPercent);

        return Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Color.lerp(
              flashingCircleDarkColor,
              flashingCircleBrightColor,
              circleColorPercent,
            ),
          ),
        );
      },
    );
  }
}

class FakeMessage extends StatelessWidget {
  const FakeMessage({super.key, required this.isBig});

  final bool isBig;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 24),
      height: isBig ? 128 : 36,
      decoration: BoxDecoration(
        borderRadius: const BorderRadius.all(Radius.circular(8)),
        color: Colors.grey.shade300,
      ),
    );
  }
}
```

[explicit animation]: /ui/animations#tween-animation
[staggered animation]: /ui/animations/staggered-animations
