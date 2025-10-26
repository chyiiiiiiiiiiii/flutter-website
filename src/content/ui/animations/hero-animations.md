---
title: Hero 動畫
description: 如何讓元件在兩個螢幕間飛行並產生動畫效果。
shortTitle: Hero
---

:::secondary 你將學到什麼
* _Hero_ 指的是在螢幕間飛行的元件 (Widget)。
* 使用 Flutter 的 Hero 元件建立 hero 動畫。
* 讓 hero 從一個螢幕飛到另一個螢幕。
* 在 hero 飛行過程中，將其形狀從圓形動畫變換為矩形。
* Flutter 中的 Hero 元件實作了一種常見的動畫風格，稱為 _共享元素轉場_（shared element transitions）或 _共享元素動畫_（shared element animations）。
:::

你很可能已經多次看過 hero 動畫。例如，一個螢幕顯示一串縮圖，代表可供購買的商品。當你選擇某個商品時，該商品會「飛」到一個新的螢幕，顯示更多細節和「購買」按鈕。將圖片從一個螢幕飛到另一個螢幕，在 Flutter 中稱為 _hero 動畫_，而這種動作有時也被稱為 _共享元素轉場_。

你可以觀看這段一分鐘的影片，快速了解 Hero 元件：

{% ytEmbed 'Be9UH1kXFDw', 'Hero | Flutter widget of the week' %}

本指南將示範如何建立標準 hero 動畫，以及在飛行過程中將圖片從圓形變換為方形的 hero 動畫。

:::secondary 範例
本指南針對每種 hero 動畫風格，分別提供了以下範例連結。

* [標準 hero 動畫程式碼][Standard hero animation code]
* [徑向 hero 動畫程式碼][Radial hero animation code]
:::

:::secondary Flutter 新手？
本頁假設你已經知道如何使用 Flutter 的元件 (Widgets) 建立版面配置。更多資訊請參閱 [在 Flutter 中建立版面配置][Building Layouts in Flutter]。
:::

:::tip 術語說明
  [_Route_][_Route_] 代表 Flutter 應用程式中的一個頁面或螢幕。
:::

你可以透過 Hero 元件在 Flutter 中實現這種動畫。當 hero 從來源 route 動畫到目標 route 時，目標 route（不包含 hero）會逐漸淡入顯示。通常，hero 是 UI 中兩個 route 共同擁有的小部分（如圖片）。對使用者來說，hero 就像在 route 之間「飛行」。本指南將示範如何建立以下 hero 動畫：

**標準 hero 動畫**<br>

_標準 hero 動畫_ 會讓 hero 從一個 route 飛到新的 route，通常會落在不同的位置並有不同的大小。

下方影片（以慢速錄製）展示了一個典型範例。點擊 route 中央的 flippers，會將它們飛到新藍色 route 的左上角，並縮小顯示。點擊藍色 route 中的 flippers（或使用裝置返回前一個 route 的手勢）則會將 flippers 飛回原來的 route。

{% ytEmbed 'CEcFnqRDfgw', 'Standard hero animation in Flutter' %}

**徑向 hero 動畫**<br>

在 _徑向 hero 動畫_ 中，hero 在 route 之間飛行時，其形狀會從圓形變為矩形。

下方影片（以慢速錄製）展示了一個徑向 hero 動畫的範例。起始時，三個圓形圖片排成一列，顯示在 route 底部。點擊任一圓形圖片，該圖片會飛到新 route，並以方形顯示。點擊方形圖片，則會將 hero 飛回原來的 route，並以圓形顯示。

{% ytEmbed 'LWKENpwDKiM', 'Radial hero animation in Flutter' %}

在進入 [標準](#標準-hero-動畫) 或 [徑向](#放射狀-hero-動畫-radial-hero-animations) hero 動畫的專屬章節前，請先閱讀 [hero 動畫的基本結構](#basic-structure)，了解 hero 動畫程式碼的結構，以及 [幕後運作原理](#幕後運作原理)，深入理解 Flutter 如何執行 hero 動畫。

<a id="basic-structure"></a>

## Hero 動畫的基本結構

:::secondary 重點整理
* 在不同的 route 中使用兩個具有相同 tag 的 hero 元件來實現動畫。
* Navigator 管理著一個包含應用程式 route 的堆疊。
* 在 Navigator 的堆疊上推入（push）或彈出（pop）route 會觸發動畫。
* Flutter 框架會計算一個矩形 tween，[`RectTween`][`RectTween`]，定義 hero 從來源 route 飛到目標 route 時的邊界。在飛行過程中，hero 會被移到應用程式 overlay 上，因此會顯示在兩個 route 之上。
:::

:::tip 術語說明
如果你對 tween 或 tweening 的概念不熟悉，請參考 [Flutter 動畫教學][Animations in Flutter tutorial]。
:::

Hero 動畫是透過兩個 [`Hero`][`Hero`] 元件實現的：一個描述來源 route 的元件，另一個描述目標 route 的元件。對使用者而言，hero 看起來是共用的，只有開發者需要知道這個實作細節。Hero 動畫的程式碼結構如下：

1. 定義一個起始的 Hero 元件，稱為 _來源 hero_。此 hero 指定其圖形表現（通常是一張圖片）及識別用的 tag，並存在於來源 route 所定義的當前 widget tree 中。
2. 定義一個結束的 Hero 元件，稱為 _目標 hero_。此 hero 也指定其圖形表現，且 tag 必須與來源 hero 相同。**兩個 hero 元件必須使用相同的 tag**，這個 tag 通常是代表底層資料的物件。為了達到最佳效果，兩個 hero 的 widget tree 結構應該幾乎一致。
3. 建立包含目標 hero 的 route。目標 route 定義動畫結束時存在的 widget tree。
4. 透過將目標 route 推入 Navigator 的堆疊來觸發動畫。Navigator 的 push 和 pop 操作，會針對來源與目標 route 中 tag 相同的 hero 配對執行動畫。

Flutter 會計算一個 tween，將 Hero 的邊界從起點動畫到終點（同時插值大小與位置），並在 overlay 上執行動畫。

下一節將更詳細說明 Flutter 的處理流程。

## 幕後運作原理

以下說明 Flutter 如何將 hero 從一個 route 轉場到另一個 route。

![轉場前，來源 hero 顯示在來源 route 上](/assets/images/docs/ui/animations/hero-transition-0.png)

轉場前，來源 hero 等待於來源 route 的 widget tree 中。目標 route 尚未建立，overlay 也是空的。

---

![轉場開始](/assets/images/docs/ui/animations/hero-transition-1.png)

將 route 推入 `Navigator` 會觸發動畫。在 `t=0.0`，Flutter 會執行下列動作：

* 依據 Material motion 規範中描述的曲線運動，離線計算目標 hero 的路徑。此時 Flutter 已經知道 hero 的最終位置。

* 將目標 hero 放入 overlay，並設定為與 _來源_ hero 相同的位置與大小。將 hero 加入 overlay 會改變其 Z 軸順序，使其顯示在所有 route 之上。

* 將來源 hero 移出螢幕。

---

![hero 在 overlay 上飛行至最終位置與大小](/assets/images/docs/ui/animations/hero-transition-2.png)

hero 飛行時，其矩形邊界會透過 [Tween&lt;Rect&gt;][Tween&lt;Rect&gt;] 動畫，該動畫由 Hero 的 [`createRectTween`][`createRectTween`] 屬性指定。預設情況下，Flutter 使用 [`MaterialRectArcTween`][`MaterialRectArcTween`] 實例，會讓矩形的對角線角落沿著曲線路徑動畫。（參見 [徑向 hero 動畫][Radial hero animations] 範例，該範例使用不同的 Tween 動畫。）

---

![轉場完成後，hero 從 overlay 移到目標 route](/assets/images/docs/ui/animations/hero-transition-3.png)

飛行結束時：

* Flutter 會將 hero 元件從 overlay 移到目標 route。此時 overlay 為空。

* 目標 hero 會出現在目標 route 的最終位置。

* 來源 hero 會被還原到其 route。

---

彈出 route（pop）時也會執行相同流程，將 hero 動畫回來源 route 的大小與位置。

### 主要類別

本指南中的範例使用以下類別來實作 hero 動畫：

[`Hero`][`Hero`]
: 負責從來源 route 飛到目標 route 的元件。需分別為來源 route 與目標 route 各定義一個 Hero，並給予相同的 tag。Flutter 會對 tag 相同的 hero 配對執行動畫。

[`InkWell`][`InkWell`]
: 指定點擊 hero 時的行為。`InkWell` 的 `onTap()` 方法會建立新 route 並推入 `Navigator` 的堆疊。

[`Navigator`][`Navigator`]
: `Navigator` 管理 route 的堆疊。將 route 推入或彈出 `Navigator` 的堆疊會觸發動畫。

[`Route`][`Route`]
: 指定一個螢幕或頁面。大多數應用程式（除了最簡單的）都會有多個 route。

## 標準 hero 動畫

:::secondary 重點整理
* 你可以使用 `MaterialPageRoute`、`CupertinoPageRoute` 指定 route，或用 `PageRouteBuilder` 自訂 route。本節範例均使用 MaterialPageRoute。
* 若要在轉場結束時改變圖片大小，請將目標圖片包在 `SizedBox` 中。
* 若要改變圖片位置，請將目標圖片放在版面配置元件中。本範例使用 `Container`。
:::

<a id="standard-hero-animation-code"></a>

:::secondary 標準 hero 動畫程式碼
以下每個範例都示範了如何將圖片從一個 route 飛到另一個 route。本指南將說明第一個範例。

[hero_animation][hero_animation]
: 將 hero 程式碼封裝在自訂 `PhotoHero` 元件中。hero 的移動會沿著曲線路徑動畫，符合 Material motion 規範。

[basic_hero_animation][basic_hero_animation]
: 直接使用 hero 元件。這個較基礎的範例僅供參考，本指南不會詳細說明。
:::

### 詳細說明

使用 Flutter 的 hero 元件，讓圖片從一個 route 飛到另一個 route 非常容易。當你使用 `MaterialPageRoute` 指定新 route 時，圖片會沿著曲線路徑飛行，符合 [Material Design 動態規範][Material Design motion spec]。

[建立新的 Flutter 應用程式][Create a new Flutter app]，並使用 [hero_animation][hero_animation] 的檔案進行更新。

執行範例時：

* 點擊首頁 route 的照片，會將圖片飛到新 route，並在不同位置與比例顯示相同照片。
* 點擊圖片或使用裝置的返回手勢，即可回到前一個 route。
* 你也可以透過 `timeDilation` 屬性進一步減慢轉場速度。

### PhotoHero 類別

自訂的 PhotoHero 類別負責維護 hero，以及其大小、圖片與點擊時的行為。PhotoHero 會建立以下 widget tree：

{% render docs/app-figure.md, image:"ui/animations/photohero-class.png", alt:"PhotoHero class widget tree %}

程式碼如下：

```dart
class PhotoHero extends StatelessWidget {
  const PhotoHero({
    super.key,
    required this.photo,
    this.onTap,
    required this.width,
  });

  final String photo;
  final VoidCallback? onTap;
  final double width;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      child: Hero(
        tag: photo,
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onTap,
            child: Image.asset(
              photo,
              fit: BoxFit.contain,
            ),
          ),
        ),
      ),
    );
  }
}
```

關鍵資訊：

* 當`HeroAnimation`被設為應用程式的 home 屬性時，起始 Route 會由`MaterialApp`隱式推入。
* `InkWell`包裹了圖片，讓你可以輕鬆地在來源與目標 hero 上加入點擊手勢。
* 使用透明色定義 Material 元件 (Widget)，可以讓圖片在飛向目標時「跳脫」背景。
* `SizedBox`指定了 hero 動畫開始與結束時的尺寸。
* 將圖片的`fit`屬性設為`BoxFit.contain`，可確保圖片在轉場期間盡可能放大，同時不改變其長寬比。

### HeroAnimation 類別

`HeroAnimation`類別會建立來源與目標的 PhotoHeroes，並設定轉場動畫。

以下是程式碼：

```dart
class HeroAnimation extends StatelessWidget {
  const HeroAnimation({super.key});

  Widget build(BuildContext context) {
    [!timeDilation = 5.0; // 1.0 means normal animation speed.!]

    return Scaffold(
      appBar: AppBar(
        title: const Text('Basic Hero Animation'),
      ),
      body: Center(
        [!child: PhotoHero(!]
          photo: 'images/flippers-alpha.png',
          width: 300.0,
          [!onTap: ()!] {
            [!Navigator.of(context).push(MaterialPageRoute<void>(!]
              [!builder: (context)!] {
                return Scaffold(
                  appBar: AppBar(
                    title: const Text('Flippers Page'),
                  ),
                  body: Container(
                    // Set background to blue to emphasize that it's a new route.
                    color: Colors.lightBlueAccent,
                    padding: const EdgeInsets.all(16),
                    alignment: Alignment.topLeft,
                    [!child: PhotoHero(!]
                      photo: 'images/flippers-alpha.png',
                      width: 100.0,
                      [!onTap: ()!] {
                        [!Navigator.of(context).pop();!]
                      },
                    ),
                  ),
                );
              }
            ));
          },
        ),
      ),
    );
  }
}
```

關鍵資訊：

* 當使用者點擊包含來源 hero 的 `InkWell` 時，
  程式碼會使用 `MaterialPageRoute` 建立目標路由（destination route）。
  將目標路由推送到 `Navigator` 的堆疊時，
  就會觸發動畫（Animation）。
* `Container` 會將 `PhotoHero` 定位在目標路由的左上角，
  並位於 `AppBar` 的下方。
* 目標 `PhotoHero` 的 `onTap()` 方法
  會將 `Navigator` 的堆疊彈出（pop），
  觸發動畫，讓 `Hero` 飛回原本的路由。
* 除錯時可使用 `timeDilation` 屬性來減慢轉場速度。

---

## 放射狀 hero 動畫（Radial hero animations）

:::secondary 這個效果有什麼用？
* _放射狀轉換_（radial transformation）會將圓形動畫變成方形。
* 放射狀 _hero_ 動畫會在 hero 從來源路由飛到目標路由的同時，執行放射狀轉換。
* `MaterialRectCenter­Arc­Tween` 定義了補間動畫（tween animation）。
* 使用 `PageRouteBuilder` 建立目標路由。
:::

將 hero 從一個路由飛到另一個路由，並同時從圓形轉換為矩形，是一個非常流暢的效果，你可以透過 Hero 元件（Widgets）來實現。
為了達成這個效果，程式碼會對兩個裁切形狀（clip shapes）：圓形與方形，進行交集動畫。
在整個動畫過程中，圓形裁切（以及圖片）會從 `minRadius` 縮放到 `maxRadius`，而方形裁切則保持固定大小。同時，圖片會從來源路由的位置飛到目標路由的位置。關於這種轉場的視覺範例，請參考 Material motion 規範中的 [Radial transformation][Radial transformation]。

這個動畫看起來可能很複雜（事實上也確實如此），但你可以**依照需求自訂提供的範例**。大部分繁瑣的工作都已經幫你處理好了。

<a id="radial-hero-animation-code"></a>

:::secondary 放射狀 hero 動畫程式碼
以下每個範例都展示了一個放射狀 hero 動畫。
本指南將說明第一個範例。

[radial_hero_animation][radial_hero_animation]
: 如 Material motion 規範所述的放射狀 hero 動畫。

[basic_radial_hero_animation][basic_radial_hero_animation]
: 最簡單的放射狀 hero 動畫範例。目標路由沒有 Scaffold、Card、Column 或 Text。
  這個基本範例僅供參考，本指南不會說明。

[radial_hero_animation_animate<wbr>_rectclip][radial_hero_animation_animate<wbr>_rectclip]
: 在 radial_hero_animation 基礎上，額外動畫化矩形裁切的大小。這個進階範例僅供參考，本指南不會說明。
:::

:::tip 專業小技巧
放射狀 hero 動畫會將圓形與方形進行交集。即使你用 `timeDilation` 減慢動畫，這個交集有時還是很難看清楚，因此你可以考慮在開發時啟用 [`debugPaintSizeEnabled`][`debugPaintSizeEnabled`] 標誌。
:::

### 發生了什麼事？

下圖顯示了動畫開始（`t = 0.0`）與結束（`t = 1.0`）時被裁切的圖片。

![Radial transformation from beginning to end](/assets/images/docs/ui/animations/radial-hero-animation.png)

藍色漸層（代表圖片）顯示了裁切形狀的交集區域。在轉場開始時，交集的結果是一個圓形裁切（[`ClipOval`][`ClipOval`]）。
在轉換過程中，`ClipOval` 會從 `minRadius` 縮放到 `maxRadius`，而 [ClipRect][ClipRect] 則維持固定大小。
轉場結束時，圓形與矩形裁切的交集會產生一個與 hero 元件（Widget）同樣大小的矩形。換句話說，轉場結束時圖片就不再被裁切。

[建立一個新的 Flutter app][Create a new Flutter app]，
並使用 [radial_hero_animation][radial_hero_animation] GitHub 目錄中的檔案進行更新。

執行範例的方式：

* 點擊三個圓形縮圖其中之一，將圖片動畫放大到新路由中央的方形，並遮蔽原本的路由。
* 點擊圖片或使用裝置的返回手勢，即可返回前一個路由。
* 你可以進一步利用 `timeDilation` 屬性減慢轉場速度。

### Photo 類別

`Photo` 類別會建立包含圖片的元件樹（widget tree）：

```dart
class Photo extends StatelessWidget {
  const Photo({super.key, required this.photo, this.color, this.onTap});

  final String photo;
  final Color? color;
  final VoidCallback onTap;

  Widget build(BuildContext context) {
    return [!Material(!]
      // Slightly opaque color appears where the image has transparency.
      [!color: Theme.of(context).primaryColor.withValues(alpha: 0.25),!]
      child: [!InkWell(!]
        onTap: [!onTap,!]
        child: [!Image.asset(!]
          photo,
          fit: BoxFit.contain,
        ),
      ),
    );
  }
}
```

關鍵資訊：

* `InkWell` 負責捕捉點擊（tap）手勢。
  呼叫的函式會將 `onTap()` 函式傳遞給
  `Photo` 的建構子。
* 在動畫過程中，`InkWell` 會在其第一個
  Material 祖先上繪製其水波紋（splash）。
* Material 元件具有些微不透明的顏色，因此
  圖片中透明的部分會以顏色呈現。
  這可確保從圓形到方形的轉換效果容易辨識，
  即使是具有透明區域的圖片也能清楚顯示。
* `Photo` 類別在其元件樹中不包含 `Hero`。
  為了讓動畫正常運作，hero
  需要包裹 `RadialExpansion` 元件。

### RadialExpansion 類別

`RadialExpansion` 元件是本範例的核心，負責建立
在動畫過渡期間裁切圖片的元件樹。
裁切後的形狀是由一個圓形裁切（在動畫過程中會放大），
與一個矩形裁切（在整個過程中保持固定大小）交集而成。

為了實現這個效果，它會建立如下的元件樹：

{% render docs/app-figure.md, image:"ui/animations/radial-expansion-class.png", alt:"RadialExpansion widget tree" %}

以下是相關程式碼：

```dart
class RadialExpansion extends StatelessWidget {
  const RadialExpansion({
    super.key,
    required this.maxRadius,
    this.child,
  }) : [!clipRectSize = 2.0 * (maxRadius / math.sqrt2);!]

  final double maxRadius;
  final clipRectSize;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return [!ClipOval(!]
      child: [!Center(!]
        child: [!SizedBox(!]
          width: clipRectSize,
          height: clipRectSize,
          child: [!ClipRect(!]
            child: [!child,!] // Photo
          ),
        ),
      ),
    );
  }
}
```

關鍵資訊：

* hero 會包裹 `RadialExpansion` 元件 (Widget)。
* 當 hero 飛行時，其尺寸會發生變化，並且因為它會限制其子元件的尺寸，所以 `RadialExpansion` 元件 (Widget) 也會隨之改變尺寸以配合。
* `RadialExpansion` 動畫 (Animation) 是由兩個重疊的裁切區域所產生。
* 此範例使用 [`MaterialRectCenterArcTween`][`MaterialRectCenterArcTween`] 來定義 tween 插值（tweening interpolation）。
  hero 動畫 (Animation) 的預設飛行路徑會以 hero 的角落來進行 tween 插值。
  這種做法會影響 hero 在徑向轉換過程中的長寬比，因此新的飛行路徑會使用 `MaterialRectCenterArcTween` 來以每個 hero 的中心點進行 tween 插值。

  以下是程式碼：

  ```dart
  static RectTween _createRectTween(Rect? begin, Rect? end) {
    return MaterialRectCenterArcTween(begin: begin, end: end);
  }
  ```

  Hero 的飛行路徑仍然遵循一條弧線，
但圖片（images）的長寬比保持不變。

[Animations in Flutter tutorial]: /ui/animations/tutorial
[basic_hero_animation]: {{site.repo.this}}/tree/{{site.branch}}/examples/_animation/basic_hero_animation/
[basic_radial_hero_animation]: {{site.repo.this}}/tree/{{site.branch}}/examples/_animation/basic_radial_hero_animation
[Building Layouts in Flutter]: /ui/layout
[`ClipOval`]: {{site.api}}/flutter/widgets/ClipOval-class.html
[ClipRect]: {{site.api}}/flutter/widgets/ClipRect-class.html
[Create a new Flutter app]: /reference/create-new-app
[`createRectTween`]: {{site.api}}/flutter/widgets/CreateRectTween.html
[`debugPaintSizeEnabled`]: /tools/devtools/inspector#debugging-layout-issues-visually
[`Hero`]: {{site.api}}/flutter/widgets/Hero-class.html
[hero_animation]: {{site.repo.this}}/tree/{{site.branch}}/examples/_animation/hero_animation/
[`InkWell`]: {{site.api}}/flutter/material/InkWell-class.html
[Material Design motion spec]: {{site.material2}}/design/motion/understanding-motion.html#principles
[`MaterialRectArcTween`]: {{site.api}}/flutter/material/MaterialRectArcTween-class.html
[`MaterialRectCenterArcTween`]: {{site.api}}/flutter/material/MaterialRectCenterArcTween-class.html
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[Radial hero animation code]: #radial-hero-animation-code
[radial_hero_animation]: {{site.repo.this}}/tree/{{site.branch}}/examples/_animation/radial_hero_animation
[radial_hero_animation_animate<wbr>_rectclip]: {{site.repo.this}}/tree/{{site.branch}}/examples/_animation/radial_hero_animation_animate_rectclip
[Radial hero animations]: #放射狀-hero-動畫-radial-hero-animations
[Radial transformation]: https://web.archive.org/web/20180223140424/https://material.io/guidelines/motion/transforming-material.html
[`RectTween`]: {{site.api}}/flutter/animation/RectTween-class.html
[_Route_]: /cookbook/navigation/navigation-basics
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[Standard hero animation code]: #standard-hero-animation-code
[Tween&lt;Rect&gt;]: {{site.api}}/flutter/animation/Tween-class.html
