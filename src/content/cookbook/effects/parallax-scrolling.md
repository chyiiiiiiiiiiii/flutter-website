---
title: 建立滾動視差效果
description: 如何實作滾動視差（parallax）效果。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/effects/parallax_scrolling"?>

當你在應用程式中滾動一個卡片清單（例如包含圖片的卡片）時，你可能會注意到這些圖片看起來比螢幕上的其他內容滾動得更慢。這幾乎讓人感覺清單中的卡片位於前景，而圖片本身則遠遠地位於背景。這種效果被稱為視差（parallax）。

在本教學中，你將透過建立一個卡片清單（帶有圓角並包含一些文字）來實現視差效果。每張卡片同時也包含一張圖片。當卡片向上滑動時，每張卡片內的圖片則會向下滑動。

下方動畫展示了此應用程式的行為：

![Parallax scrolling](/assets/images/docs/cookbook/effects/ParallaxScrolling.webp){:.site-mobile-screenshot}

## 建立一個用於存放視差項目的清單

若要顯示一個具有視差滾動效果的圖片清單，你首先需要顯示一個清單。

建立一個新的無狀態元件（stateless widget），命名為`ParallaxRecipe`。在`ParallaxRecipe`中，建立一個包含`SingleChildScrollView`和`Column`的元件樹，這樣就形成了一個清單。

<?code-excerpt "lib/excerpt1.dart (ParallaxRecipe)"?>
```dart
class ParallaxRecipe extends StatelessWidget {
  const ParallaxRecipe({super.key});

  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(child: Column(children: []));
  }
}
```

## 顯示帶有文字與靜態圖片的項目

每個清單項目會顯示一個圓角矩形的背景圖片，代表世界上七個地點之一。

在該背景圖片之上，堆疊著該地點的名稱及其所屬國家，並定位於左下角。

在背景圖片與文字之間，會有一個深色漸層，以提升文字在背景上的可讀性。

請實作一個名為 `LocationListItem` 的無狀態元件（StatelessWidget），其內容包含上述提到的視覺元素。

目前，請先使用靜態的 `Image` 元件作為背景。

之後，你將會用視差（parallax）版本來取代該元件。

<?code-excerpt "lib/excerpt2.dart (LocationListItem)"?>
```dart
@immutable
class LocationListItem extends StatelessWidget {
  const LocationListItem({
    super.key,
    required this.imageUrl,
    required this.name,
    required this.country,
  });

  final String imageUrl;
  final String name;
  final String country;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: AspectRatio(
        aspectRatio: 16 / 9,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Stack(
            children: [
              _buildParallaxBackground(context),
              _buildGradient(),
              _buildTitleAndSubtitle(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildParallaxBackground(BuildContext context) {
    return Positioned.fill(child: Image.network(imageUrl, fit: BoxFit.cover));
  }

  Widget _buildGradient() {
    return Positioned.fill(
      child: DecoratedBox(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.transparent, Colors.black.withValues(alpha: 0.7)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            stops: const [0.6, 0.95],
          ),
        ),
      ),
    );
  }

  Widget _buildTitleAndSubtitle() {
    return Positioned(
      left: 20,
      bottom: 20,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            name,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            country,
            style: const TextStyle(color: Colors.white, fontSize: 14),
          ),
        ],
      ),
    );
  }
}
```

接下來，將清單項目新增到你的 `ParallaxRecipe` 元件（Widget）中。

<?code-excerpt "lib/excerpt3.dart (ParallaxRecipeItems)"?>
```dart
class ParallaxRecipe extends StatelessWidget {
  const ParallaxRecipe({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          for (final location in locations)
            LocationListItem(
              imageUrl: location.imageUrl,
              name: location.name,
              country: location.place,
            ),
        ],
      ),
    );
  }
}
```

你現在已經有了一個典型的、可滾動的卡片清單，展示了世界上七個獨特的地點。接下來，你將為背景圖片加入視差（parallax）效果。

## 實作視差效果

視差滾動效果是透過將背景圖片稍微往清單其餘部分的反方向推動來達成的。當清單項目往螢幕上方滑動時，每個背景圖片會稍微往下滑動。相反地，當清單項目往螢幕下方滑動時，每個背景圖片會稍微往上滑動。視覺上，這就產生了視差效果。

視差效果依賴於清單項目在其父層 `Scrollable` 中的當前位置。隨著清單項目的滾動位置改變，該項目的背景圖片位置也必須跟著改變。這是一個有趣的問題，因為清單項目在 `Scrollable` 中的位置，直到 Flutter 的版面配置階段（layout phase）完成後才會得知。這表示背景圖片的位置必須在繪製階段（paint phase）決定，而這個階段是在版面配置階段之後。幸運的是，Flutter 提供了一個名為 `Flow` 的元件（Widget），專門設計來讓你在子元件即將被繪製前，控制其轉換（transform）。換句話說，你可以攔截繪製階段，並自行決定如何重新定位你的子元件。

:::note
想進一步了解，請參考這段關於 `Flow` 元件（Widget）的 Widget of the Week 短片：

{% ytEmbed 'NG6pvXpnIso', 'Flow | Flutter widget of the week' %}
:::

:::note
如果你需要控制子元件繪製「內容」而非「位置」，可以考慮使用 [`CustomPaint`][`CustomPaint`] 元件（Widget）。

如果你需要同時控制版面配置、繪製以及點擊測試，則可以考慮自訂 [`RenderBox`][`RenderBox`]。
:::

將你的背景 `Image` 元件（Widget）包裹在 [`Flow`][`Flow`] 元件（Widget）中。

<?code-excerpt "lib/excerpt4.dart (BuildParallaxBackground)" replace="/\n    delegate: ParallaxFlowDelegate\(\),//g"?>
```dart
Widget _buildParallaxBackground(BuildContext context) {
  return Flow(
    children: [Image.network(imageUrl, fit: BoxFit.cover)],
  );
}
```

引入一個新的 `FlowDelegate`，名稱為 `ParallaxFlowDelegate`。

<?code-excerpt "lib/excerpt4.dart (BuildParallaxBackground)"?>
```dart
Widget _buildParallaxBackground(BuildContext context) {
  return Flow(
    delegate: ParallaxFlowDelegate(),
    children: [Image.network(imageUrl, fit: BoxFit.cover)],
  );
}
```

<?code-excerpt "lib/excerpt4.dart (parallax-flow-delegate)" replace="/\n    return constraints;//g"?>
```dart
class ParallaxFlowDelegate extends FlowDelegate {
  ParallaxFlowDelegate();

  @override
  BoxConstraints getConstraintsForChild(int i, BoxConstraints constraints) {
    // TODO: We'll add more to this later.
  }

  @override
  void paintChildren(FlowPaintingContext context) {
    // TODO: We'll add more to this later.
  }

  @override
  bool shouldRepaint(covariant FlowDelegate oldDelegate) {
    // TODO: We'll add more to this later.
    return true;
  }
}
```

`FlowDelegate` 控制其子元件（children）的尺寸，以及這些子元件的繪製位置。在這個例子中，你的 `Flow` 元件只有一個子元件：背景圖片（background image）。該圖片的寬度必須與 `Flow` 元件完全相同。

請為你的背景圖片子元件回傳緊密（tight）的寬度限制。

<?code-excerpt "lib/main.dart (TightWidth)"?>
```dart
@override
BoxConstraints getConstraintsForChild(int i, BoxConstraints constraints) {
  return BoxConstraints.tightFor(width: constraints.maxWidth);
}
```

你的背景圖片現在已經有適當的尺寸，
但你仍然需要根據每張背景圖片的滾動位置來計算其垂直位置，然後進行繪製（Painting）。

要計算背景圖片的理想位置，你需要三個關鍵資訊：

* 祖先 `Scrollable` 的邊界（bounds）
* 個別清單項目的邊界
* 圖片縮小後適合放入清單項目的尺寸

若要查詢 `Scrollable` 的邊界，
你需要將 `ScrollableState` 傳入 `FlowDelegate`。

若要查詢個別清單項目的邊界，
請將清單項目的 `BuildContext` 傳入 `FlowDelegate`。

若要查詢背景圖片的最終尺寸，
請將 `GlobalKey` 指派給 `Image` 元件（Widget），
然後將該 `GlobalKey` 傳入
`FlowDelegate`。

請將這些資訊提供給 `ParallaxFlowDelegate`。

<?code-excerpt "lib/excerpt5.dart (global-key)" plaster="none"?>
```dart
@immutable
class LocationListItem extends StatelessWidget {
  final GlobalKey _backgroundImageKey = GlobalKey();

  Widget _buildParallaxBackground(BuildContext context) {
    return Flow(
      delegate: ParallaxFlowDelegate(
        scrollable: Scrollable.of(context),
        listItemContext: context,
        backgroundImageKey: _backgroundImageKey,
      ),
      children: [
        Image.network(imageUrl, key: _backgroundImageKey, fit: BoxFit.cover),
      ],
    );
  }
}
```

<?code-excerpt "lib/excerpt5.dart (parallax-flow-delegate-gk)" plaster="none"?>
```dart
class ParallaxFlowDelegate extends FlowDelegate {
  ParallaxFlowDelegate({
    required this.scrollable,
    required this.listItemContext,
    required this.backgroundImageKey,
  });

  final ScrollableState scrollable;
  final BuildContext listItemContext;
  final GlobalKey backgroundImageKey;
}
```

現在已經擁有實作視差滾動（parallax scrolling）所需的所有資訊，請實作 `shouldRepaint()` 方法。

<?code-excerpt "lib/main.dart (ShouldRepaint)"?>
```dart
@override
bool shouldRepaint(ParallaxFlowDelegate oldDelegate) {
  return scrollable != oldDelegate.scrollable ||
      listItemContext != oldDelegate.listItemContext ||
      backgroundImageKey != oldDelegate.backgroundImageKey;
}
```

現在，實作視差（parallax）效果的版面配置計算。

首先，計算清單項目在其祖先 `Scrollable` 內的像素位置。

<?code-excerpt "lib/excerpt5.dart (paint-children)" plaster="none"?>
```dart
@override
void paintChildren(FlowPaintingContext context) {
  // Calculate the position of this list item within the viewport.
  final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
  final listItemBox = listItemContext.findRenderObject() as RenderBox;
  final listItemOffset = listItemBox.localToGlobal(
    listItemBox.size.centerLeft(Offset.zero),
    ancestor: scrollableBox,
  );
}
```

使用清單項目的像素位置來計算其距離`Scrollable`頂部的百分比。
位於可滾動區域頂部的清單項目應產生 0%，而位於可滾動區域底部的清單項目則應產生 100%。

<?code-excerpt "lib/excerpt5.dart (paint-children-2)"?>
```dart
@override
void paintChildren(FlowPaintingContext context) {
  // Calculate the position of this list item within the viewport.
  final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
  final listItemBox = listItemContext.findRenderObject() as RenderBox;
  final listItemOffset = listItemBox.localToGlobal(
    listItemBox.size.centerLeft(Offset.zero),
    ancestor: scrollableBox,
  );

  // Determine the percent position of this list item within the
  // scrollable area.
  final viewportDimension = scrollable.position.viewportDimension;
  final scrollFraction = (listItemOffset.dy / viewportDimension).clamp(
    0.0,
    1.0,
  );
  // ···
}
```

使用滾動百分比來計算`Alignment`。
當百分比為 0% 時，你需要`Alignment(0.0, -1.0)`，
而當百分比為 100% 時，你需要`Alignment(0.0, 1.0)`。
這些座標分別對應到頂部和底部對齊。

<?code-excerpt "lib/excerpt5.dart (paint-children-3)" plaster="none"?>
```dart
@override
void paintChildren(FlowPaintingContext context) {
  // Calculate the position of this list item within the viewport.
  final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
  final listItemBox = listItemContext.findRenderObject() as RenderBox;
  final listItemOffset = listItemBox.localToGlobal(
    listItemBox.size.centerLeft(Offset.zero),
    ancestor: scrollableBox,
  );

  // Determine the percent position of this list item within the
  // scrollable area.
  final viewportDimension = scrollable.position.viewportDimension;
  final scrollFraction = (listItemOffset.dy / viewportDimension).clamp(
    0.0,
    1.0,
  );

  // Calculate the vertical alignment of the background
  // based on the scroll percent.
  final verticalAlignment = Alignment(0.0, scrollFraction * 2 - 1);
}
```

使用 `verticalAlignment`，結合清單項目的尺寸以及背景圖片的尺寸，來產生`Rect`，以決定背景圖片應該被定位的位置。

<?code-excerpt "lib/excerpt5.dart (paint-children-4)" plaster="none"?>
```dart
@override
void paintChildren(FlowPaintingContext context) {
  // Calculate the position of this list item within the viewport.
  final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
  final listItemBox = listItemContext.findRenderObject() as RenderBox;
  final listItemOffset = listItemBox.localToGlobal(
    listItemBox.size.centerLeft(Offset.zero),
    ancestor: scrollableBox,
  );

  // Determine the percent position of this list item within the
  // scrollable area.
  final viewportDimension = scrollable.position.viewportDimension;
  final scrollFraction = (listItemOffset.dy / viewportDimension).clamp(
    0.0,
    1.0,
  );

  // Calculate the vertical alignment of the background
  // based on the scroll percent.
  final verticalAlignment = Alignment(0.0, scrollFraction * 2 - 1);

  // Convert the background alignment into a pixel offset for
  // painting purposes.
  final backgroundSize =
      (backgroundImageKey.currentContext!.findRenderObject() as RenderBox)
          .size;
  final listItemSize = context.size;
  final childRect = verticalAlignment.inscribe(
    backgroundSize,
    Offset.zero & listItemSize,
  );
}
```

使用 `childRect`，以所需的平移轉換來繪製背景圖片。
這個隨時間變化的轉換，就是產生視差（parallax）效果的關鍵。

<?code-excerpt "lib/excerpt5.dart (paint-children-5)" plaster="none" ?>
```dart
@override
void paintChildren(FlowPaintingContext context) {
  // Calculate the position of this list item within the viewport.
  final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
  final listItemBox = listItemContext.findRenderObject() as RenderBox;
  final listItemOffset = listItemBox.localToGlobal(
    listItemBox.size.centerLeft(Offset.zero),
    ancestor: scrollableBox,
  );

  // Determine the percent position of this list item within the
  // scrollable area.
  final viewportDimension = scrollable.position.viewportDimension;
  final scrollFraction = (listItemOffset.dy / viewportDimension).clamp(
    0.0,
    1.0,
  );

  // Calculate the vertical alignment of the background
  // based on the scroll percent.
  final verticalAlignment = Alignment(0.0, scrollFraction * 2 - 1);

  // Convert the background alignment into a pixel offset for
  // painting purposes.
  final backgroundSize =
      (backgroundImageKey.currentContext!.findRenderObject() as RenderBox)
          .size;
  final listItemSize = context.size;
  final childRect = verticalAlignment.inscribe(
    backgroundSize,
    Offset.zero & listItemSize,
  );

  // Paint the background.
  context.paintChild(
    0,
    transform: Transform.translate(
      offset: Offset(0.0, childRect.top),
    ).transform,
  );
}
```

你還需要最後一個細節來實現視差滾動（parallax effect）。
當輸入（inputs）變化時，`ParallaxFlowDelegate` 會重新繪製（repaint），
但 `ParallaxFlowDelegate` 並不會在每次
捲動位置（scroll position）變化時都重新繪製。

將 `ScrollableState` 的 `ScrollPosition`
傳遞給 `FlowDelegate` 的父類別（superclass），這樣 `FlowDelegate`
就能在每次 `ScrollPosition` 變化時都重新繪製。

<?code-excerpt "lib/main.dart (SuperScrollPosition)" replace="/;\n/;\n}/g"?>
```dart
class ParallaxFlowDelegate extends FlowDelegate {
  ParallaxFlowDelegate({
    required this.scrollable,
    required this.listItemContext,
    required this.backgroundImageKey,
  }) : super(repaint: scrollable.position);
}
```

恭喜你！
你現在已經擁有一個帶有視差（parallax）效果的卡片清單，
並且背景圖片會隨著滾動而移動。

## 互動範例

執行應用程式：

* 上下滾動以觀察視差（parallax）效果。

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter parallax scrolling hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

const Color darkBlue = Color.fromARGB(255, 18, 32, 47);

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark().copyWith(scaffoldBackgroundColor: darkBlue),
      debugShowCheckedModeBanner: false,
      home: const Scaffold(body: Center(child: ExampleParallax())),
    );
  }
}

class ExampleParallax extends StatelessWidget {
  const ExampleParallax({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          for (final location in locations)
            LocationListItem(
              imageUrl: location.imageUrl,
              name: location.name,
              country: location.place,
            ),
        ],
      ),
    );
  }
}

class LocationListItem extends StatelessWidget {
  LocationListItem({
    super.key,
    required this.imageUrl,
    required this.name,
    required this.country,
  });

  final String imageUrl;
  final String name;
  final String country;
  final GlobalKey _backgroundImageKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: AspectRatio(
        aspectRatio: 16 / 9,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Stack(
            children: [
              _buildParallaxBackground(context),
              _buildGradient(),
              _buildTitleAndSubtitle(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildParallaxBackground(BuildContext context) {
    return Flow(
      delegate: ParallaxFlowDelegate(
        scrollable: Scrollable.of(context),
        listItemContext: context,
        backgroundImageKey: _backgroundImageKey,
      ),
      children: [
        Image.network(imageUrl, key: _backgroundImageKey, fit: BoxFit.cover),
      ],
    );
  }

  Widget _buildGradient() {
    return Positioned.fill(
      child: DecoratedBox(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.transparent, Colors.black.withValues(alpha: 0.7)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            stops: const [0.6, 0.95],
          ),
        ),
      ),
    );
  }

  Widget _buildTitleAndSubtitle() {
    return Positioned(
      left: 20,
      bottom: 20,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            name,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            country,
            style: const TextStyle(color: Colors.white, fontSize: 14),
          ),
        ],
      ),
    );
  }
}

class ParallaxFlowDelegate extends FlowDelegate {
  ParallaxFlowDelegate({
    required this.scrollable,
    required this.listItemContext,
    required this.backgroundImageKey,
  }) : super(repaint: scrollable.position);


  final ScrollableState scrollable;
  final BuildContext listItemContext;
  final GlobalKey backgroundImageKey;

  @override
  BoxConstraints getConstraintsForChild(int i, BoxConstraints constraints) {
    return BoxConstraints.tightFor(width: constraints.maxWidth);
  }

  @override
  void paintChildren(FlowPaintingContext context) {
    // Calculate the position of this list item within the viewport.
    final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
    final listItemBox = listItemContext.findRenderObject() as RenderBox;
    final listItemOffset = listItemBox.localToGlobal(
      listItemBox.size.centerLeft(Offset.zero),
      ancestor: scrollableBox,
    );

    // Determine the percent position of this list item within the
    // scrollable area.
    final viewportDimension = scrollable.position.viewportDimension;
    final scrollFraction = (listItemOffset.dy / viewportDimension).clamp(
      0.0,
      1.0,
    );

    // Calculate the vertical alignment of the background
    // based on the scroll percent.
    final verticalAlignment = Alignment(0.0, scrollFraction * 2 - 1);

    // Convert the background alignment into a pixel offset for
    // painting purposes.
    final backgroundSize =
        (backgroundImageKey.currentContext!.findRenderObject() as RenderBox)
            .size;
    final listItemSize = context.size;
    final childRect = verticalAlignment.inscribe(
      backgroundSize,
      Offset.zero & listItemSize,
    );

    // Paint the background.
    context.paintChild(
      0,
      transform: Transform.translate(
        offset: Offset(0.0, childRect.top),
      ).transform,
    );
  }

  @override
  bool shouldRepaint(ParallaxFlowDelegate oldDelegate) {
    return scrollable != oldDelegate.scrollable ||
        listItemContext != oldDelegate.listItemContext ||
        backgroundImageKey != oldDelegate.backgroundImageKey;
  }

}

class Parallax extends SingleChildRenderObjectWidget {
  const Parallax({super.key, required Widget background})
    : super(child: background);

  @override
  RenderObject createRenderObject(BuildContext context) {
    return RenderParallax(scrollable: Scrollable.of(context));
  }

  @override
  void updateRenderObject(
    BuildContext context,
    covariant RenderParallax renderObject,
  ) {
    renderObject.scrollable = Scrollable.of(context);
  }
}

class ParallaxParentData extends ContainerBoxParentData<RenderBox> {}

class RenderParallax extends RenderBox
    with RenderObjectWithChildMixin<RenderBox>, RenderProxyBoxMixin {
  RenderParallax({required ScrollableState scrollable})
    : _scrollable = scrollable;

  ScrollableState _scrollable;

  ScrollableState get scrollable => _scrollable;

  set scrollable(ScrollableState value) {
    if (value != _scrollable) {
      if (attached) {
        _scrollable.position.removeListener(markNeedsLayout);
      }
      _scrollable = value;
      if (attached) {
        _scrollable.position.addListener(markNeedsLayout);
      }
    }
  }

  @override
  void attach(covariant PipelineOwner owner) {
    super.attach(owner);
    _scrollable.position.addListener(markNeedsLayout);
  }

  @override
  void detach() {
    _scrollable.position.removeListener(markNeedsLayout);
    super.detach();
  }

  @override
  void setupParentData(covariant RenderObject child) {
    if (child.parentData is! ParallaxParentData) {
      child.parentData = ParallaxParentData();
    }
  }

  @override
  void performLayout() {
    size = constraints.biggest;

    // Force the background to take up all available width
    // and then scale its height based on the image's aspect ratio.
    final background = child!;
    final backgroundImageConstraints = BoxConstraints.tightFor(
      width: size.width,
    );
    background.layout(backgroundImageConstraints, parentUsesSize: true);

    // Set the background's local offset, which is zero.
    (background.parentData as ParallaxParentData).offset = Offset.zero;
  }

  @override
  void paint(PaintingContext context, Offset offset) {
    // Get the size of the scrollable area.
    final viewportDimension = scrollable.position.viewportDimension;

    // Calculate the global position of this list item.
    final scrollableBox = scrollable.context.findRenderObject() as RenderBox;
    final backgroundOffset = localToGlobal(
      size.centerLeft(Offset.zero),
      ancestor: scrollableBox,
    );

    // Determine the percent position of this list item within the
    // scrollable area.
    final scrollFraction = (backgroundOffset.dy / viewportDimension).clamp(
      0.0,
      1.0,
    );

    // Calculate the vertical alignment of the background
    // based on the scroll percent.
    final verticalAlignment = Alignment(0.0, scrollFraction * 2 - 1);

    // Convert the background alignment into a pixel offset for
    // painting purposes.
    final background = child!;
    final backgroundSize = background.size;
    final listItemSize = size;
    final childRect = verticalAlignment.inscribe(
      backgroundSize,
      Offset.zero & listItemSize,
    );

    // Paint the background.
    context.paintChild(
      background,
      (background.parentData as ParallaxParentData).offset +
          offset +
          Offset(0.0, childRect.top),
    );
  }
}

class Location {
  const Location({
    required this.name,
    required this.place,
    required this.imageUrl,
  });

  final String name;
  final String place;
  final String imageUrl;
}

const urlPrefix =
    'https://docs.flutter.dev/assets/images/exercise/effects/parallax';

const locations = [
  Location(
    name: 'Mount Rushmore',
    place: 'U.S.A',
    imageUrl: '$urlPrefix/01-mount-rushmore.jpg',
  ),
  Location(
    name: 'Gardens By The Bay',
    place: 'Singapore',
    imageUrl: '$urlPrefix/02-singapore.jpg',
  ),
  Location(
    name: 'Machu Picchu',
    place: 'Peru',
    imageUrl: '$urlPrefix/03-machu-picchu.jpg',
  ),
  Location(
    name: 'Vitznau',
    place: 'Switzerland',
    imageUrl: '$urlPrefix/04-vitznau.jpg',
  ),
  Location(
    name: 'Bali',
    place: 'Indonesia',
    imageUrl: '$urlPrefix/05-bali.jpg',
  ),
  Location(
    name: 'Mexico City',
    place: 'Mexico',
    imageUrl: '$urlPrefix/06-mexico-city.jpg',
  ),
  Location(name: 'Cairo', place: 'Egypt', imageUrl: '$urlPrefix/07-cairo.jpg'),
];
```

[`CustomPaint`]: {{site.api}}/flutter/widgets/CustomPaint-class.html  
[`Flow`]: {{site.api}}/flutter/widgets/Flow-class.html  
[`RenderBox`]: {{site.api}}/flutter/rendering/RenderBox-class.html
