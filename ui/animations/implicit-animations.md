# 隱式動畫

> 進一步了解如何在 Flutter 中使用隱式動畫的相關資訊。



透過 Flutter 的[動畫函式庫][animation library]，
你可以為 UI 中的元件 (Widget) 增添動態效果與視覺特效。
此函式庫的一部分包含了一系列
能自動管理動畫的元件。
這些元件統稱為 _隱式動畫_（implicit animations），
或稱 _隱式動畫元件_（implicitly animated widgets），
名稱源自它們所實作的
[`ImplicitlyAnimatedWidget`][] 類別。

使用隱式動畫時，你不需要
管理 `AnimationController` 或 `Ticker`。
只要將 `duration` 和選用的 `curve`
傳給隱式動畫元件，例如 `AnimatedOpacity`。
當你以新的目標值更新該元件時，
例如在呼叫 `setState()` 之後，
元件就會自動以動畫過渡到該值：

<?code-excerpt "animation/implicit/lib/main.dart (fade-box-demo)"?>
```dart
import 'package:material_ui/material_ui.dart';

class FadeBoxDemo extends StatefulWidget {
  const FadeBoxDemo({super.key});

  @override
  State<FadeBoxDemo> createState() => _FadeBoxDemoState();
}

class _FadeBoxDemoState extends State<FadeBoxDemo> {
  bool _visible = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        AnimatedOpacity(
          opacity: _visible ? 1 : 0,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
          child: const FlutterLogo(size: 100),
        ),
        const SizedBox(height: 16),
        ElevatedButton(
          onPressed: () => setState(() => _visible = !_visible),
          child: const Text('Toggle opacity'),
        ),
      ],
    );
  }
}
```

**應用程式原始碼：**[隱式動畫範例][implicit animation example]

當內建的隱式動畫元件都無法涵蓋
你想要製作動畫的屬性時，
可以使用 [`TweenAnimationBuilder`][] 建立自訂的隱式動畫。

以下資源將提供多種方式，協助你學習
如何在 Flutter 中使用隱式動畫。

[animation library]: https://api.flutter.dev/flutter/animation/animation-library.html
[implicit animation example]: https://github.com/flutter/website/tree/main/examples/animation/implicit

## 文件 {:#documentation}

[Flutter 動畫 codelab][Animations in Flutter codelab]
: 學習隱式與顯式動畫，
  並實際動手為完整的 Flutter 應用程式
  加入隱式動畫。

[`AnimatedContainer` 範例][`AnimatedContainer` sample]
: 一個逐步說明如何使用
  [`AnimatedContainer`][] 隱式動畫元件的食譜。

[使用 AnimatedOpacity 淡入淡出元件][Fade a widget in and out]
: 一份 cookbook 食譜，示範如何使用 [`AnimatedOpacity`][] 讓元件淡入淡出。

[`TweenAnimationBuilder`][] API 文件
: 使用 `Tween` 和 `builder` 回呼（callback），
  為任何屬性建立自訂的隱式動畫。

[`ImplicitlyAnimatedWidget`][] API 文件
: 所有隱式動畫元件皆繼承自 `ImplicitlyAnimatedWidget` 類別。

[Animations in Flutter codelab]: https://codelabs.developers.google.com/advanced-flutter-animations
[`AnimatedContainer` sample]: /cookbook/animation/animated-container
[`AnimatedContainer`]: https://api.flutter.dev/flutter/widgets/AnimatedContainer-class.html
[`AnimatedOpacity`]: https://api.flutter.dev/flutter/widgets/AnimatedOpacity-class.html
[Fade a widget in and out]: /cookbook/animation/opacity-animation
[`ImplicitlyAnimatedWidget`]: https://api.flutter.dev/flutter/widgets/ImplicitlyAnimatedWidget-class.html
[`TweenAnimationBuilder`]: https://api.flutter.dev/flutter/widgets/TweenAnimationBuilder-class.html

## Flutter in Focus 影片 {:#flutter-in-focus-videos}

Flutter in Focus 影片系列提供 5-10 分鐘的教學，
以實際程式碼示範每位 Flutter 開發者都必須掌握的技巧。
以下影片涵蓋與隱式動畫相關的主題。

<YouTubeEmbed id="IVTjpW3W33s" title="Flutter implicit animation basics"></YouTubeEmbed>

<YouTubeEmbed id="6KiPEqzJIKQ" title="Create custom implicit animations with TweenAnimationBuilder"></YouTubeEmbed>

## The Boring Show {:#the-boring-show}

觀看 The Boring Show，跟著 Google 工程師從零開始用 Flutter 開發應用程式。
以下集數介紹如何在新聞聚合應用程式中
使用隱式動畫。

<YouTubeEmbed id="8ehlWchLVlQ" title="Adding implicit animations to a news application"></YouTubeEmbed>

## Widget of the Week 影片 {:#widget-of-the-week-videos}

每週推出一支短片，介紹一個元件的重要功能。
約 60 秒內，你將看到該元件的實際程式碼與運作展示。
以下 Widget of the Week 影片涵蓋
隱式動畫元件：

<div class="card-grid wide">
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <YouTubeEmbed id="QZAvjqOqiLY" title="AnimatedOpacity - Flutter widget of the week"></YouTubeEmbed>
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <YouTubeEmbed id="PY2m0fhGNz4" title="AnimatedPadding - Flutter widget of the week"></YouTubeEmbed>
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <YouTubeEmbed id="hC3s2YdtWt8" title="AnimatedPositioned - Flutter widget of the week"></YouTubeEmbed>
    </div>
  </div>
  <div class="card wrapped-card outlined-card">
    <div class="card-content">
      <YouTubeEmbed id="2W7POjFb88g" title="AnimatedSwitcher - Flutter widget of the week"></YouTubeEmbed>
    </div>
  </div>
</div>

