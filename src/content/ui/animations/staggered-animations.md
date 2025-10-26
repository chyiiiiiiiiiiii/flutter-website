---
title: 交錯動畫（Staggered animations）
description: 如何在 Flutter 中撰寫交錯動畫。
shortTitle: 交錯（Staggered）
---

:::secondary 你將學到什麼
* 交錯動畫（staggered animation）由一連串順序或重疊的動畫組成。
* 要建立交錯動畫，請使用多個 `Animation` 物件。
* 一個 `AnimationController` 控制所有的 `Animation`。
* 每個 `Animation` 物件會指定一個 `Interval` 期間的動畫。
* 對於每個要動畫化的屬性，都要建立一個 `Tween`。
:::

:::tip 術語說明
如果你對 tweens 或 tweening 的概念還不熟悉，請參閱 [Flutter 中的動畫教學][Animations in Flutter tutorial]。
:::

交錯動畫（staggered animation）是一個簡單易懂的概念：視覺變化會以一系列操作的方式發生，而不是同時發生。動畫可以是完全依序進行，每個變化在前一個結束後才開始，也可以部分或完全重疊。也可能會有空檔，期間沒有任何變化。

本指南將說明如何在 Flutter 中建立交錯動畫。

:::secondary 範例
本指南說明了 basic_staggered_animation 範例。你也可以參考更進階的範例 staggered_pic_selection。

[basic_staggered_animation][basic_staggered_animation]
: 展示單一元件（Widget）一連串依序與重疊的動畫。點擊螢幕會啟動動畫，依序改變透明度、尺寸、形狀、顏色與內距（padding）。

[staggered_pic_selection][staggered_pic_selection]
: 展示從三種尺寸之一的圖片清單中刪除圖片的過程。此範例使用兩個 [動畫控制器（animation controllers）][animation controllers]：一個用於圖片選取/取消選取，另一個用於圖片刪除。選取/取消選取動畫為交錯動畫。（若要明顯看到這個效果，可能需要增加 `timeDilation` 的值。）選取一張最大尺寸的圖片——它會縮小，並在藍色圓圈中顯示勾選符號。接著選取一張最小尺寸的圖片——大圖片會放大，勾選符號消失。在大圖片尚未完全放大時，小圖片會縮小並顯示勾選符號。這種交錯行為類似你在 Google Photos 中看到的效果。
:::

下方影片展示了 basic_staggered_animation 所執行的動畫：

{% ytEmbed '0fFvnZemmh8', 'Staggered animation example' %}

在影片中，你會看到單一元件（Widget）的動畫，該元件一開始是帶有邊框、略帶圓角的藍色方形。動畫依下列順序進行變化：

1. 淡入（fades in）
1. 變寬
1. 變高並向上移動
1. 轉變為帶邊框的圓形
1. 顏色變為橘色

動畫播放到結尾後，會反向播放回來。

:::secondary 初次接觸 Flutter？
本頁假設你已經知道如何使用 Flutter 的元件（Widgets）建立版面配置。欲了解更多資訊，請參閱 [在 Flutter 中建立版面配置][Building Layouts in Flutter]。
:::

## 交錯動畫的基本結構

:::secondary 重點整理
* 所有動畫都由同一個 [`AnimationController`][`AnimationController`] 控制。
* 無論動畫實際持續多久，控制器的值都必須介於 0.0 到 1.0 之間（含）。
* 每個動畫都有一個 [`Interval`][`Interval`]，範圍同樣介於 0.0 到 1.0 之間。
* 對於每個在區間內動畫化的屬性，都要建立一個 [`Tween`][`Tween`]。`Tween` 會指定該屬性的起始與結束值。
* `Tween` 會產生一個由控制器管理的 [`Animation`][`Animation`] 物件。
:::

{% comment %}
這個應用程式本質上是在動畫化一個 `Container`，其裝飾（decoration）與尺寸都會被動畫化。`Container` 置於另一個 `Container` 之內，外層的 padding 會移動內部的 container，還有一個 `Opacity` 元件（Widget）用來控制整體淡入淡出。
{% endcomment %}

下圖展示了 [basic_staggered_animation][basic_staggered_animation] 範例中所使用的 `Interval`。你可以注意到以下特點：

* 透明度在時間軸的前 10% 期間變化。
* 透明度變化與寬度變化之間有一個小空檔。
* 在時間軸的最後 25% 期間沒有任何動畫。
* 增加 padding 會讓元件（Widget）看起來往上移動。
* 將 border radius 增加到 0.5，會讓帶圓角的方形變成圓形。
* padding 與高度的變化發生在完全相同的區間，但實際上它們不必這樣設計。

![Diagram showing the interval specified for each motion](/assets/images/docs/ui/animations/StaggeredAnimationIntervals.png)

設定動畫時：

* 建立一個 `AnimationController` 來管理所有 `Animations`。
* 對於每個要動畫化的屬性，建立一個 `Tween`。
  * `Tween` 定義了一個值的範圍。
  * `Tween` 的 `animate` 方法需要傳入 `parent` 控制器，並產生該屬性的 `Animation`。
* 在 `Animation` 的 `curve` 屬性上指定區間（interval）。

當控制動畫的值改變時，新的動畫值也會跟著改變，進而觸發 UI 更新。

下列程式碼為 `width` 屬性建立了一個 tween。它會建立一個 [`CurvedAnimation`][`CurvedAnimation`]，並指定一個緩動曲線（eased curve）。更多預設動畫曲線，請參閱 [`Curves`][`Curves`]。

```dart
width = Tween<double>(
  begin: 50.0,
  end: 150.0,
).animate(
  CurvedAnimation(
    parent: controller,
    curve: const Interval(
      0.125,
      0.250,
      curve: Curves.ease,
    ),
  ),
),
```

`begin` 和 `end` 的值不一定要是 double。
以下程式碼為 `borderRadius` 屬性（用來控制方形角落的圓角度）建立 tween，
並使用 `BorderRadius.circular()`。

```dart
borderRadius = BorderRadiusTween(
  begin: BorderRadius.circular(4),
  end: BorderRadius.circular(75),
).animate(
  CurvedAnimation(
    parent: controller,
    curve: const Interval(
      0.375,
      0.500,
      curve: Curves.ease,
    ),
  ),
),
```

### 完整的交錯動畫

如同所有互動元件 (Widgets) 一樣，完整的動畫 (Animation) 由一對元件組成：一個 stateless（無狀態）元件和一個 stateful（有狀態）元件。

stateless 元件會指定 `Tween`，定義 `Animation` 物件，並提供一個 `build()` 函式，負責建立元件樹中負責動畫的部分。

stateful 元件則會建立控制器、播放動畫，並建構元件樹中不參與動畫的部分。當在螢幕上偵測到點擊時，動畫即會開始。

[Full code for basic_staggered_animation's main.dart][Full code for basic_staggered_animation's main.dart]

### Stateless 元件：StaggerAnimation

在 stateless 元件 `StaggerAnimation` 中，`build()` 函式會實例化一個 [`AnimatedBuilder`][`AnimatedBuilder`]——這是一個用於建立動畫 (Animation) 的通用元件。`AnimatedBuilder` 會建立一個元件，並使用 `Tweens` 的當前值來設定它。範例中建立了一個名為 `_buildAnimation()` 的函式（負責實際的 UI 更新），並將其指定給 `builder` 屬性。AnimatedBuilder 會監聽動畫控制器的通知，當值變動時會將元件樹標記為 dirty。每當動畫 (Animation) 的每一個 tick，值都會被更新，進而觸發 `_buildAnimation()` 的呼叫。

```dart
[!class StaggerAnimation extends StatelessWidget!] {
  StaggerAnimation({super.key, required this.controller}) :

    // Each animation defined here transforms its value during the subset
    // of the controller's duration defined by the animation's interval.
    // For example the opacity animation transforms its value during
    // the first 10% of the controller's duration.

    [!opacity = Tween<double>!](
      begin: 0.0,
      end: 1.0,
    ).animate(
      CurvedAnimation(
        parent: controller,
        curve: const Interval(
          0.0,
          0.100,
          curve: Curves.ease,
        ),
      ),
    ),

    // ... Other tween definitions ...
    );

  [!final AnimationController controller;!]
  [!final Animation<double> opacity;!]
  [!final Animation<double> width;!]
  [!final Animation<double> height;!]
  [!final Animation<EdgeInsets> padding;!]
  [!final Animation<BorderRadius?> borderRadius;!]
  [!final Animation<Color?> color;!]

  // This function is called each time the controller "ticks" a new frame.
  // When it runs, all of the animation's values will have been
  // updated to reflect the controller's current value.
  [!Widget _buildAnimation(BuildContext context, Widget? child)!] {
    return Container(
      padding: padding.value,
      alignment: Alignment.bottomCenter,
      child: Opacity(
        opacity: opacity.value,
        child: Container(
          width: width.value,
          height: height.value,
          decoration: BoxDecoration(
            color: color.value,
            border: Border.all(
              color: Colors.indigo[300]!,
              width: 3,
            ),
            borderRadius: borderRadius.value,
          ),
        ),
      ),
    );
  }

  @override
  [!Widget build(BuildContext context)!] {
    return [!AnimatedBuilder!](
      [!builder: _buildAnimation!],
      animation: controller,
    );
  }
}
```

### 有狀態元件：StaggerDemo

這個有狀態元件 `StaggerDemo`，會建立 `AnimationController`
（統一管理所有動畫的控制者），並指定 2000 毫秒的動畫時長。它負責播放動畫，並建立元件樹中不參與動畫的部分。
當螢幕偵測到點擊時，動畫會開始執行。
動畫會先正向播放，然後反向播放。

```dart
[!class StaggerDemo extends StatefulWidget!] {
  @override
  State<StaggerDemo> createState() => _StaggerDemoState();
}

class _StaggerDemoState extends State<StaggerDemo>
    with TickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
  }

  // ...Boilerplate...

  [!Future<void> _playAnimation() async!] {
    try {
      [!await _controller.forward().orCancel;!]
      [!await _controller.reverse().orCancel;!]
    } on TickerCanceled {
      // The animation got canceled, probably because it was disposed of.
    }
  }

  @override
  [!Widget build(BuildContext context)!] {
    timeDilation = 10.0; // 1.0 is normal animation speed.
    return Scaffold(
      appBar: AppBar(
        title: const Text('Staggered Animation'),
      ),
      body: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: () {
          _playAnimation();
        },
        child: Center(
          child: Container(
            width: 300,
            height: 300,
            decoration: BoxDecoration(
              color: Colors.black.withValues(alpha: 0.1),
              border: Border.all(
                color: Colors.black.withValues(alpha: 0.5),
              ),
            ),
            child: StaggerAnimation(controller:_controller.view),
          ),
        ),
      ),
    );
  }
}
```

[`Animation`]: {{site.api}}/flutter/animation/Animation-class.html  
[animation controllers]: {{site.api}}/flutter/animation/AnimationController-class.html  
[`AnimationController`]: {{site.api}}/flutter/animation/AnimationController-class.html  
[`AnimatedBuilder`]: {{site.api}}/flutter/widgets/AnimatedBuilder-class.html  
[Animations in Flutter tutorial]: /ui/animations/tutorial  
[basic_staggered_animation]: {{site.repo.this}}/tree/{{site.branch}}/examples/_animation/basic_staggered_animation  
[Building Layouts in Flutter]: /ui/layout  
[staggered_pic_selection]: {{site.repo.this}}/tree/{{site.branch}}/examples/_animation/staggered_pic_selection  
[`CurvedAnimation`]: {{site.api}}/flutter/animation/CurvedAnimation-class.html  
[`Curves`]: {{site.api}}/flutter/animation/Curves-class.html  
[Full code for basic_staggered_animation's main.dart]: {{site.repo.this}}/tree/{{site.branch}}/examples/_animation/basic_staggered_animation/lib/main.dart  
[`Interval`]: {{site.api}}/flutter/animation/Interval-class.html  
[`Tween`]: {{site.api}}/flutter/animation/Tween-class.html
