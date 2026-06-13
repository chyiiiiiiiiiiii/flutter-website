---
title: 建立 shimmer 載入效果
description: 如何實作 shimmer 載入效果。
---

<?code-excerpt path-base="cookbook/effects/shimmer_loading"?>

在應用程式開發中，載入時間是無法避免的。
從使用者體驗（UX）的角度來看，
最重要的是讓使用者知道
目前正在載入資料。一個常見的做法是，
在近似於即將載入內容外觀的區塊上，
顯示帶有 shimmer 動畫的 chrome 色塊，
以此傳達資料正在載入中。

下方動畫展示了應用程式的行為：

![Gif showing the UI loading](/assets/images/docs/cookbook/effects/UILoadingAnimation.webp){:.site-mobile-screenshot}

本教學從已定義並定位好的內容元件（Widgets）開始。
右下角還有一個浮動操作按鈕（Floating Action Button, FAB），
可在載入模式與已載入模式之間切換，
方便你驗證自己的實作。

## 繪製 shimmer 形狀

在這個效果中會出現 shimmer 動畫的形狀，
與最終實際載入的內容是獨立的。

因此，目標是盡可能準確地顯示
代表最終內容的形狀。

當內容有明確邊界時，顯示正確的形狀很容易。
例如，在本教學中，
有一些圓形圖片和一些圓角矩形圖片。
你可以繪製與這些圖片輪廓完全相符的形狀。

另一方面，考慮出現在圓角矩形圖片下方的文字。
在文字載入前，你無法得知會有幾行文字。
因此，沒有必要為每一行文字都繪製一個矩形。
相反地，在資料載入期間，
你可以畫幾個非常細長的圓角矩形，
用來代表即將出現的文字。這些形狀和尺寸
未必完全符合，但這樣做是沒問題的。

先從螢幕頂部的圓形清單項目開始。
確保每個 `CircleListItem` 元件（Widget）在圖片載入時
都能顯示一個帶顏色的圓形。

<?code-excerpt "lib/main.dart (CircleListItem)"?>
```dart
class CircleListItem extends StatelessWidget {
  const CircleListItem({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
      child: Container(
        width: 54,
        height: 54,
        decoration: const BoxDecoration(
          color: Colors.black,
          shape: BoxShape.circle,
        ),
        child: ClipOval(
          child: Image.network(
            'https://docs.flutter.dev/assets/images/'
            'exercise/split-check/Avatar1.jpg',
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}
```

只要你的元件 (Widget) 顯示某種形狀，就可以在本教學中套用 shimmer（閃爍）效果。

類似於 `CircleListItem` 元件（Widgets），請確保 `CardListItem` 元件（Widgets）在圖片將顯示的位置呈現一個顏色。同時，在 `CardListItem` 元件（Widget）中，根據目前的載入狀態，在文字與矩形之間切換顯示。

<?code-excerpt "lib/main.dart (CardListItem)"?>
```dart
class CardListItem extends StatelessWidget {
  const CardListItem({super.key, required this.isLoading});

  final bool isLoading;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [_buildImage(), const SizedBox(height: 16), _buildText()],
      ),
    );
  }

  Widget _buildImage() {
    return AspectRatio(
      aspectRatio: 16 / 9,
      child: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          color: Colors.black,
          borderRadius: BorderRadius.circular(16),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Image.network(
            'https://docs.flutter.dev/assets/images/'
            'exercise/split-check/Food1.jpg',
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }

  Widget _buildText() {
    if (isLoading) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            height: 24,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          const SizedBox(height: 16),
          Container(
            width: 250,
            height: 24,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(16),
            ),
          ),
        ],
      );
    } else {
      return const Padding(
        padding: EdgeInsets.symmetric(horizontal: 8),
        child: Text(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do '
          'eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ),
      );
    }
  }
}
```

現在，你的 UI 會根據載入中或已載入的狀態，以不同方式呈現自己。
你可以暫時註解掉圖片（images）URL，來觀察 UI 呈現的兩種狀態。


![Gif showing the shimmer animation](/assets/images/docs/cookbook/effects/LoadingShimmer.webp){:.site-mobile-screenshot}

下一個目標是使用單一個漸層（gradient）來繪製所有有顏色的區域，使其呈現出 shimmer（閃爍）效果。

## 繪製 shimmer 漸層

本教學實現此效果的關鍵，是使用一個名為 [`ShaderMask`][] 的元件（Widget）。
顧名思義，`ShaderMask` 元件會將著色器（shader）應用到其子元件（child）上，但僅限於子元件已經繪製過的區域。
舉例來說，你將只會把著色器套用到先前設定過的黑色形狀上。

定義一個具有金屬色（chrome-colored）、線性漸層（linear gradient）的漸層效果，並將其套用到 shimmer 形狀上。

<?code-excerpt "lib/main.dart (shimmerGradient)"?>
```dart
const _shimmerGradient = LinearGradient(
  colors: [Color(0xFFEBEBF4), Color(0xFFF4F4F4), Color(0xFFEBEBF4)],
  stops: [0.1, 0.3, 0.4],
  begin: Alignment(-1.0, -0.3),
  end: Alignment(1.0, 0.3),
  tileMode: TileMode.clamp,
);
```

定義一個新的 StatefulWidget（`ShimmerLoading`），
用來將指定的 `child` 元件（Widget）包裹在 `ShaderMask` 之中。
設定 `ShaderMask` 元件，將 shimmer 漸層（gradient）作為 shader，
並使用 `blendMode` 設為 `srcATop`。
`srcATop` 混合模式（blend mode）會用 shader 顏色取代
`child` 元件原本繪製的任何顏色。

<?code-excerpt "lib/main.dart (ShimmerLoading)"?>
```dart
class ShimmerLoading extends StatefulWidget {
  const ShimmerLoading({
    super.key,
    required this.isLoading,
    required this.child,
  });

  final bool isLoading;
  final Widget child;

  @override
  State<ShimmerLoading> createState() => _ShimmerLoadingState();
}

class _ShimmerLoadingState extends State<ShimmerLoading> {
  @override
  Widget build(BuildContext context) {
    if (!widget.isLoading) {
      return widget.child;
    }

    return ShaderMask(
      blendMode: BlendMode.srcATop,
      shaderCallback: (bounds) {
        return _shimmerGradient.createShader(bounds);
      },
      child: widget.child,
    );
  }
}
```

將你的 `CircleListItem` 元件（Widgets）包裹在 `ShimmerLoading` 元件（Widget）中。

<?code-excerpt "lib/shimmer_loading_items.dart (buildTopRowItem)"?>
```dart
Widget _buildTopRowItem() {
  return ShimmerLoading(isLoading: _isLoading, child: const CircleListItem());
}
```

將你的 `CardListItem` 元件（Widgets）包裹在 `ShimmerLoading` 元件（Widget）中。

<?code-excerpt "lib/shimmer_loading_items.dart (buildListItem)"?>
```dart
Widget _buildListItem() {
  return ShimmerLoading(
    isLoading: _isLoading,
    child: CardListItem(isLoading: _isLoading),
  );
}
```

當你的圖形正在載入時，現在會顯示
由 `shaderCallback` 回傳的
shimmer（閃爍）漸層效果。

這是一個正確方向上的重要一步，
但這種漸層顯示方式有個問題。
每個 `CircleListItem` 元件（Widget）以及每個 `CardListItem` 元件
都會顯示一個新的漸層版本。
在這個範例中，整個螢幕應該
看起來像是一個大面積的閃爍表面。
你會在下一步解決這個問題。

## 繪製一個大範圍的 shimmer 效果

若要在整個螢幕上繪製一個大範圍的 shimmer 效果，
每個 `ShimmerLoading` 元件都需要
根據該 `ShimmerLoading` 元件在螢幕上的位置，
繪製相同的全螢幕漸層。

更精確地說，與其假設 shimmer
應該佔滿整個螢幕，
應該有某個區域共享 shimmer 效果。
這個區域也許佔滿整個螢幕，
也可能沒有。要在 Flutter 解決這類問題，
可以定義另一個元件（Widget），
將其放在所有 `ShimmerLoading` 元件之上
（在元件樹中），並命名為 `Shimmer`。
然後，每個 `ShimmerLoading` 元件都會取得
`Shimmer` 祖先的參考，
並請求要顯示的尺寸與漸層。

請定義一個新的 StatefulWidget，命名為 `Shimmer`，
它接收一個 [`LinearGradient`][]，並讓子孫元件
可以存取其 `State` 物件。

<?code-excerpt "lib/main.dart (Shimmer)"?>
```dart
class Shimmer extends StatefulWidget {
  static ShimmerState? of(BuildContext context) {
    return context.findAncestorStateOfType<ShimmerState>();
  }

  const Shimmer({super.key, required this.linearGradient, this.child});

  final LinearGradient linearGradient;
  final Widget? child;

  @override
  ShimmerState createState() => ShimmerState();
}

class ShimmerState extends State<Shimmer> {
  @override
  Widget build(BuildContext context) {
    return widget.child ?? const SizedBox();
  }
}
```

在 `ShimmerState` 類別中新增方法，以便提供對 `linearGradient` 的存取、`ShimmerState` 的 `RenderBox` 大小，以及查詢某個子孫在 `ShimmerState` 的 `RenderBox` 中的位置。

<?code-excerpt "lib/shimmer_state.dart (ShimmerState)"?>
```dart
class ShimmerState extends State<Shimmer> {
  Gradient get gradient => LinearGradient(
    colors: widget.linearGradient.colors,
    stops: widget.linearGradient.stops,
    begin: widget.linearGradient.begin,
    end: widget.linearGradient.end,
  );

  bool get isSized =>
      (context.findRenderObject() as RenderBox?)?.hasSize ?? false;

  Size get size => (context.findRenderObject() as RenderBox).size;

  Offset getDescendantOffset({
    required RenderBox descendant,
    Offset offset = Offset.zero,
  }) {
    final shimmerBox = context.findRenderObject() as RenderBox;
    return descendant.localToGlobal(offset, ancestor: shimmerBox);
  }

  @override
  Widget build(BuildContext context) {
    return widget.child ?? const SizedBox();
  }
}
```

將你所有螢幕的內容包裹在 `Shimmer` 元件（Widget）中。

<?code-excerpt "lib/main.dart (ExampleUiAnimationState)"?>
```dart
class _ExampleUiLoadingAnimationState extends State<ExampleUiLoadingAnimation> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Shimmer(
        linearGradient: _shimmerGradient,
        child: ListView(
          // ListView Contents
        ),
      ),
    );
  }
}
```

在你的 `ShimmerLoading` 元件（Widget）中使用 `Shimmer` 元件（Widget），以繪製共享的漸層效果。

<?code-excerpt "lib/shimmer_loading_state_pt2.dart (ShimmerLoadingStatePt2)"?>
```dart
class _ShimmerLoadingState extends State<ShimmerLoading> {
  @override
  Widget build(BuildContext context) {
    if (!widget.isLoading) {
      return widget.child;
    }

    // Collect ancestor shimmer information.
    final shimmer = Shimmer.of(context)!;
    if (!shimmer.isSized) {
      // The ancestor Shimmer widget isn't laid
      // out yet. Return an empty box.
      return const SizedBox();
    }
    final shimmerSize = shimmer.size;
    final gradient = shimmer.gradient;
    final offsetWithinShimmer = shimmer.getDescendantOffset(
      descendant: context.findRenderObject() as RenderBox,
    );

    return ShaderMask(
      blendMode: BlendMode.srcATop,
      shaderCallback: (bounds) {
        return gradient.createShader(
          Rect.fromLTWH(
            -offsetWithinShimmer.dx,
            -offsetWithinShimmer.dy,
            shimmerSize.width,
            shimmerSize.height,
          ),
        );
      },
      child: widget.child,
    );
  }
}
```

你的 `ShimmerLoading` 元件（Widgets）現在會顯示一個共用的漸層，並且這個漸層會佔滿 `Shimmer` 元件（Widget）內的所有空間。

## 動畫化 shimmer 效果

為了呈現閃爍的光澤效果，shimmer 漸層需要移動。

`LinearGradient` 有一個名為 `transform` 的屬性，可以用來轉換漸層的外觀，例如讓漸層水平移動。`transform` 屬性接受一個 `GradientTransform` 實例。

定義一個名為 `_SlidingGradientTransform` 的類別，並實作 `GradientTransform`，以實現水平滑動的視覺效果。

<?code-excerpt "lib/original_example.dart (sliding-gradient-transform)"?>
```dart
class _SlidingGradientTransform extends GradientTransform {
  const _SlidingGradientTransform({required this.slidePercent});

  final double slidePercent;

  @override
  Matrix4? transform(Rect bounds, {TextDirection? textDirection}) {
    return Matrix4.translationValues(bounds.width * slidePercent, 0.0, 0.0);
  }
}
```

漸層滑動的百分比會隨時間改變，
以產生動態的視覺效果。
若要改變這個百分比，請在 `ShimmerState` 類別中設定
[`AnimationController`][]。

<?code-excerpt "lib/original_example.dart (shimmer-state-animation)" replace="/\/\/ code-excerpt-closing-bracket/}/g"?>
```dart
class ShimmerState extends State<Shimmer> with SingleTickerProviderStateMixin {
  late AnimationController _shimmerController;

  @override
  void initState() {
    super.initState();

    _shimmerController = AnimationController.unbounded(vsync: this)
      ..repeat(min: -0.5, max: 1.5, period: const Duration(milliseconds: 1000));
  }

  @override
  void dispose() {
    _shimmerController.dispose();
    super.dispose();
  }
  }
```

將 `_SlidingGradientTransform` 套用到 `gradient`，
方法是使用 `_shimmerController` 的 `value` 作為 `slidePercent`。

<?code-excerpt "lib/original_example.dart (linear-gradient)"?>
```dart
LinearGradient get gradient => LinearGradient(
  colors: widget.linearGradient.colors,
  stops: widget.linearGradient.stops,
  begin: widget.linearGradient.begin,
  end: widget.linearGradient.end,
  transform: _SlidingGradientTransform(
    slidePercent: _shimmerController.value,
  ),
);
```

現在漸層已經開始動畫，但你的個別
`ShimmerLoading` 元件（Widgets）在漸層變化時並不會自行重繪。
因此，看起來就像什麼事都沒發生。

將 `_shimmerController` 從 `ShimmerState`
以 [`Listenable`][] 的形式公開。

<?code-excerpt "lib/original_example.dart (shimmer-changes)"?>
```dart
Listenable get shimmerChanges => _shimmerController;
```

在 `ShimmerLoading` 中，監聽上層 `ShimmerState` 的 `shimmerChanges` 屬性變化，並重新繪製 shimmer 漸層效果。

<?code-excerpt "lib/original_example.dart (shimmer-loading-state)" replace="/\/\/ code-excerpt-closing-bracket/}/g"?>
```dart
class _ShimmerLoadingState extends State<ShimmerLoading> {
  Listenable? _shimmerChanges;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_shimmerChanges != null) {
      _shimmerChanges!.removeListener(_onShimmerChange);
    }
    _shimmerChanges = Shimmer.of(context)?.shimmerChanges;
    if (_shimmerChanges != null) {
      _shimmerChanges!.addListener(_onShimmerChange);
    }
  }

  @override
  void dispose() {
    _shimmerChanges?.removeListener(_onShimmerChange);
    super.dispose();
  }

  void _onShimmerChange() {
    if (widget.isLoading) {
      setState(() {
        // Update the shimmer painting.
      });
    }
  }
  }
```

恭喜你！
你現在已經擁有一個全螢幕的
動畫 shimmer 效果，會在內容載入時
自動開啟與關閉。

## 互動範例

<?code-excerpt "lib/original_example.dart" remove="code-excerpt-closing-bracket"?>
```dartpad title="Flutter shimmer loading hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: ExampleUiLoadingAnimation(),
      debugShowCheckedModeBanner: false,
    ),
  );
}

const _shimmerGradient = LinearGradient(
  colors: [Color(0xFFEBEBF4), Color(0xFFF4F4F4), Color(0xFFEBEBF4)],
  stops: [0.1, 0.3, 0.4],
  begin: Alignment(-1.0, -0.3),
  end: Alignment(1.0, 0.3),
  tileMode: TileMode.clamp,
);

class ExampleUiLoadingAnimation extends StatefulWidget {
  const ExampleUiLoadingAnimation({super.key});

  @override
  State<ExampleUiLoadingAnimation> createState() =>
      _ExampleUiLoadingAnimationState();
}

class _ExampleUiLoadingAnimationState extends State<ExampleUiLoadingAnimation> {
  bool _isLoading = true;

  void _toggleLoading() {
    setState(() {
      _isLoading = !_isLoading;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Shimmer(
        linearGradient: _shimmerGradient,
        child: ListView(
          physics: _isLoading ? const NeverScrollableScrollPhysics() : null,
          children: [
            const SizedBox(height: 16),
            _buildTopRowList(),
            const SizedBox(height: 16),
            _buildListItem(),
            _buildListItem(),
            _buildListItem(),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _toggleLoading,
        child: Icon(_isLoading ? Icons.hourglass_full : Icons.hourglass_bottom),
      ),
    );
  }

  Widget _buildTopRowList() {
    return SizedBox(
      height: 72,
      child: ListView(
        physics: _isLoading ? const NeverScrollableScrollPhysics() : null,
        scrollDirection: Axis.horizontal,
        shrinkWrap: true,
        children: [
          const SizedBox(width: 16),
          _buildTopRowItem(),
          _buildTopRowItem(),
          _buildTopRowItem(),
          _buildTopRowItem(),
          _buildTopRowItem(),
          _buildTopRowItem(),
        ],
      ),
    );
  }

  Widget _buildTopRowItem() {
    return ShimmerLoading(isLoading: _isLoading, child: const CircleListItem());
  }

  Widget _buildListItem() {
    return ShimmerLoading(
      isLoading: _isLoading,
      child: CardListItem(isLoading: _isLoading),
    );
  }
}

class Shimmer extends StatefulWidget {
  static ShimmerState? of(BuildContext context) {
    return context.findAncestorStateOfType<ShimmerState>();
  }

  const Shimmer({super.key, required this.linearGradient, this.child});

  final LinearGradient linearGradient;
  final Widget? child;

  @override
  ShimmerState createState() => ShimmerState();
}

class ShimmerState extends State<Shimmer> with SingleTickerProviderStateMixin {
  late AnimationController _shimmerController;

  @override
  void initState() {
    super.initState();

    _shimmerController = AnimationController.unbounded(vsync: this)
      ..repeat(min: -0.5, max: 1.5, period: const Duration(milliseconds: 1000));
  }

  @override
  void dispose() {
    _shimmerController.dispose();
    super.dispose();
  }

  LinearGradient get gradient => LinearGradient(
    colors: widget.linearGradient.colors,
    stops: widget.linearGradient.stops,
    begin: widget.linearGradient.begin,
    end: widget.linearGradient.end,
    transform: _SlidingGradientTransform(
      slidePercent: _shimmerController.value,
    ),
  );

  bool get isSized =>
      (context.findRenderObject() as RenderBox?)?.hasSize ?? false;

  Size get size => (context.findRenderObject() as RenderBox).size;

  Offset getDescendantOffset({
    required RenderBox descendant,
    Offset offset = Offset.zero,
  }) {
    final shimmerBox = context.findRenderObject() as RenderBox?;
    return descendant.localToGlobal(offset, ancestor: shimmerBox);
  }

  Listenable get shimmerChanges => _shimmerController;

  @override
  Widget build(BuildContext context) {
    return widget.child ?? const SizedBox();
  }
}

class _SlidingGradientTransform extends GradientTransform {
  const _SlidingGradientTransform({required this.slidePercent});

  final double slidePercent;

  @override
  Matrix4? transform(Rect bounds, {TextDirection? textDirection}) {
    return Matrix4.translationValues(bounds.width * slidePercent, 0.0, 0.0);
  }
}

class ShimmerLoading extends StatefulWidget {
  const ShimmerLoading({
    super.key,
    required this.isLoading,
    required this.child,
  });

  final bool isLoading;
  final Widget child;

  @override
  State<ShimmerLoading> createState() => _ShimmerLoadingState();
}

class _ShimmerLoadingState extends State<ShimmerLoading> {
  Listenable? _shimmerChanges;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_shimmerChanges != null) {
      _shimmerChanges!.removeListener(_onShimmerChange);
    }
    _shimmerChanges = Shimmer.of(context)?.shimmerChanges;
    if (_shimmerChanges != null) {
      _shimmerChanges!.addListener(_onShimmerChange);
    }
  }

  @override
  void dispose() {
    _shimmerChanges?.removeListener(_onShimmerChange);
    super.dispose();
  }

  void _onShimmerChange() {
    if (widget.isLoading) {
      setState(() {
        // Update the shimmer painting.
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.isLoading) {
      return widget.child;
    }

    // Collect ancestor shimmer info.
    final shimmer = Shimmer.of(context)!;
    if (!shimmer.isSized) {
      // The ancestor Shimmer widget has not laid
      // itself out yet. Return an empty box.
      return const SizedBox();
    }
    final shimmerSize = shimmer.size;
    final gradient = shimmer.gradient;
    final offsetWithinShimmer = shimmer.getDescendantOffset(
      descendant: context.findRenderObject() as RenderBox,
    );

    return ShaderMask(
      blendMode: BlendMode.srcATop,
      shaderCallback: (bounds) {
        return gradient.createShader(
          Rect.fromLTWH(
            -offsetWithinShimmer.dx,
            -offsetWithinShimmer.dy,
            shimmerSize.width,
            shimmerSize.height,
          ),
        );
      },
      child: widget.child,
    );
  }
}

//----------- List Items ---------
class CircleListItem extends StatelessWidget {
  const CircleListItem({super.key});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
      child: Container(
        width: 54,
        height: 54,
        decoration: const BoxDecoration(
          color: Colors.black,
          shape: BoxShape.circle,
        ),
        child: ClipOval(
          child: Image.network(
            'https://docs.flutter.dev/assets/images/'
            'exercise/split-check/Avatar1.jpg',
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}

class CardListItem extends StatelessWidget {
  const CardListItem({super.key, required this.isLoading});

  final bool isLoading;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [_buildImage(), const SizedBox(height: 16), _buildText()],
      ),
    );
  }

  Widget _buildImage() {
    return AspectRatio(
      aspectRatio: 16 / 9,
      child: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          color: Colors.black,
          borderRadius: BorderRadius.circular(16),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Image.network(
            'https://docs.flutter.dev/assets/images/'
            'exercise/split-check/Food1.jpg',
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }

  Widget _buildText() {
    if (isLoading) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            height: 24,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          const SizedBox(height: 16),
          Container(
            width: 250,
            height: 24,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(16),
            ),
          ),
        ],
      );
    } else {
      return const Padding(
        padding: EdgeInsets.symmetric(horizontal: 8),
        child: Text(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do '
          'eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ),
      );
    }
  }
}
```



[`AnimationController`]: {{site.api}}/flutter/animation/AnimationController-class.html
[cloning the example code]: {{site.github}}/flutter/codelabs
[issue 44152]: {{site.repo.flutter}}/issues/44152
[`LinearGradient`]: {{site.api}}/flutter/painting/LinearGradient-class.html
[`Listenable`]: {{site.api}}/flutter/foundation/Listenable-class.html
[`ShaderMask`]: {{site.api}}/flutter/widgets/ShaderMask-class.html
