---
title: "隱式動畫"
description: >
  透過互動範例與練習，學習如何使用 Flutter 的隱式動畫元件 (Widgets)。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="animation/implicit"?>

歡迎來到隱式動畫教學 (codelab)，在這裡你將學習如何使用 Flutter
元件 (Widgets) 來輕鬆為特定屬性建立動畫效果。

{% render docs/dartpad-troubleshooting.md, site: site %}

為了讓你能從本教學獲得最大收穫，建議你具備以下基礎知識：

- 如何[建立 Flutter 應用程式][make a Flutter app]。
- 如何使用[有狀態元件 (Stateful Widgets)][stateful widgets]。

本教學將涵蓋以下內容：

- 使用 `AnimatedOpacity` 來建立淡入 (fade-in) 效果。
- 使用 `AnimatedContainer` 來動畫化尺寸、顏色與邊距的轉換。
- 隱式動畫的概述與使用技巧。

**預估完成本教學所需時間：15-30 分鐘。**

## 什麼是隱式動畫？

透過 Flutter 的[動畫函式庫][animation library]，
你可以為 UI 中的元件 (Widgets) 增添動態效果與視覺特效。
函式庫中有一組元件 (Widgets) 會自動為你管理動畫，
這些元件統稱為 _隱式動畫_ 或 _隱式動畫元件 (implicitly animated widgets)_，
名稱來自它們所實作的 [ImplicitlyAnimatedWidget][ImplicitlyAnimatedWidget] 類別。
使用隱式動畫時，你只需設定元件屬性的目標值；
每當該目標值改變時，
元件就會自動將屬性從舊值動畫到新值。
換句話說，隱式動畫以便利性換取部分控制權——
它們會自動處理動畫效果，讓你無需手動管理。

## 範例：文字淡入效果

以下範例展示如何利用名為 [AnimatedOpacity][AnimatedOpacity] 的隱式動畫元件 (Widget)
為現有 UI 加入淡入效果。
**範例一開始並沒有任何動畫程式碼**——
它是一個 [Material App][Material App] 首頁畫面，內容包含：

- 一張貓頭鷹的照片。
- 一個 **Show details** 按鈕（點擊時尚未有任何動作）。
- 照片中貓頭鷹的描述文字。

### 淡入效果（起始程式碼）

點擊 **Run** 以檢視範例：

{% render docs/implicit-animations/fade-in-starter-code.md %}

### 使用 AnimatedOpacity 元件動畫化透明度

本節列出一系列步驟，協助你將隱式動畫加入
[淡入起始程式碼][fade-in starter code]。在步驟之後，你也可以直接執行
已完成修改的 [淡入完整範例][fade-in complete] 程式碼。
這些步驟說明如何使用 `AnimatedOpacity`
元件 (Widget) 來新增下列動畫功能：

- 貓頭鷹的描述文字在使用者點擊 **Show details** 前保持隱藏。
- 當使用者點擊 **Show details** 時，
  貓頭鷹的描述文字會以淡入效果顯示。

#### 1. 選擇要動畫化的元件屬性

要製作淡入效果，你可以使用 `AnimatedOpacity` 元件 (Widget)
動畫化 `opacity` 屬性。
將 `Column` 元件包裹在 `AnimatedOpacity` 元件中：

```dart diff
  @override
  Widget build(BuildContext context) {
    return ListView(children: <Widget>[
      Image.network(owlUrl),
      TextButton(
        child: const Text(
          'Show Details',
          style: TextStyle(color: Colors.blueAccent),
        ),
        onPressed: () => {},
      ),
-     const Column(
-       children: [
-         Text('Type: Owl'),
-         Text('Age: 39'),
-         Text('Employment: None'),
-       ],
-     ),
+     AnimatedOpacity(
+       child: const Column(
+         children: [
+           Text('Type: Owl'),
+           Text('Age: 39'),
+           Text('Employment: None'),
+         ],
+       ),
+     ),
    ]);
  }
```

:::note
你可以參考範例程式碼中的行號，以協助追蹤要在 [fade-in starter code][fade-in starter code] 進行哪些修改。
:::

#### 2. 初始化動畫屬性的狀態變數

為了在使用者點擊 **Show details** 之前隱藏文字，請將 `opacity` 的起始值設為零：

```dart diff
  class _FadeInDemoState extends State<FadeInDemo> {
+   double opacity = 0;
+ 
    @override
    Widget build(BuildContext context) {
      return ListView(children: <Widget>[
        // ...
        AnimatedOpacity(
+         opacity: opacity,
          child: const Column(
```

#### 3. 設定動畫（Animation）的持續時間

除了 `opacity` 參數外，`AnimatedOpacity` 也需要一個
[duration][
        // ...
        AnimatedOpacity(
+         opacity: opacity,
          child: const Column(
```

#### 3. Set the duration of the animation

In addition to an `opacity` parameter, `AnimatedOpacity` requires a
[duration] to use for its animation. For this example,
you can start with 2 seconds:

```dart diff
  AnimatedOpacity(
+   duration: const Duration(seconds: 2),
    opacity: opacity,
    child: const Column(
```

#### 4. 設定動畫（Animation）的觸發條件並選擇結束值

將動畫（Animation）設定為在使用者點擊 **Show details** 時觸發。
為此，請使用 `onPressed()` 處理函式來變更 `opacity` 狀態，
並將其綁定到 `TextButton`。
若要讓 `FadeInDemo` 元件（Widget）在使用者點擊 **Show details** 時完全顯示，
請在 `onPressed()` 處理函式中將 `opacity` 設為 1：

```dart diff
  TextButton(
    child: const Text(
      'Show Details',
      style: TextStyle(color: Colors.blueAccent),
    ),
-   onPressed: () => {},
+   onPressed: () => setState(() {
+     opacity = 1;
+   }),
  ),
```

:::note
你只需要設定 `opacity` 的起始值與結束值。
`AnimatedOpacity` 元件（Widget）會自動管理中間的所有過程。
:::

### 淡入效果（完整範例）

以下是你已完成修改後的範例。
執行此範例，然後點擊 **Show details** 來觸發動畫（Animation）。

{% render docs/implicit-animations/fade-in-complete.md %}

### 整合所有內容

[淡入文字效果][Fade-in text effect]範例展示了 `AnimatedOpacity` 元件（Widget）下列功能：

- 監聽其 `opacity` 屬性的狀態變化。
- 當 `opacity` 屬性改變時，
  會將 `opacity` 的值以動畫（Animation）方式平滑過渡到新值。
- 需要一個 `duration` 參數來定義
  值之間轉換所需的時間長度。

:::note
- 隱式動畫（Implicit animations）只能對父 StatefulWidget 的屬性進行動畫處理。
  上述範例透過擴充自 `StatefulWidget` 的 `FadeInDemo` 元件來實現這一點。

- `AnimatedOpacity` 元件僅能對 `opacity` 屬性進行動畫。
  有些隱式動畫元件可以同時對多個屬性進行動畫處理，下方的範例將展示這一點。
:::

## 範例：變形效果（Shape-shifting effect）

以下範例說明如何使用 [`AnimatedContainer`][`AnimatedContainer`] 元件（Widget），
以動畫（Animation）方式處理多個屬性（`margin`、`borderRadius` 和 `color`），
且這些屬性型別各異（`double` 與 `Color`）。
**此範例一開始沒有任何動畫程式碼**。
它從一個 [Material App][Material App] 首頁開始，內容包含：

- 一個 `Container` 元件，並設定了
 `borderRadius`、`margin` 與 `color`。
  這些屬性會在每次執行範例時重新產生。
- 一個 **Change** 按鈕，點擊時尚未有任何動作。

### 變形效果（初始程式碼）

要開始此範例，請點擊 **Run**。

{% render docs/implicit-animations/shape-shifting-starter-code.md %}

### 使用 AnimatedContainer 動畫 color、borderRadius 與 margin

本節列出一系列步驟，說明如何將隱式動畫加入 [變形效果初始程式碼][shape-shifting starter code]。
完成每個步驟後，你也可以直接執行
[完整變形效果範例][complete shape-shifting example]，查看已套用變更的結果。

[變形效果初始程式碼][shape-shifting starter code] 會為 `Container` 元件的每個屬性指派隨機值。
相關函式會產生對應的值：

- `randomColor()` 函式會為 `color` 屬性產生 `Color`
- `randomBorderRadius()` 函式會為 `borderRadius` 屬性產生 `double`
- `randomMargin()` 函式會為 `margin` 屬性產生 `double`

以下步驟將使用 `AnimatedContainer` 元件來：

- 每當使用者點擊 **Change** 時，將 `color`、`borderRadius` 與 `margin` 平滑過渡到新值。
- 每當 `color`、`borderRadius` 與 `margin` 被設定新值時，以動畫方式過渡。

#### 1. 新增隱式動畫

將 `Container` 元件改為 `AnimatedContainer` 元件：

```dart diff
  SizedBox(
    width: 128,
    height: 128,
-   child: Container(
+   child: AnimatedContainer(
      margin: EdgeInsets.all(margin),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(borderRadius),
      ),
    ),
  ),
```

:::note
你可以參考範例程式碼中的行號，以協助追蹤在[shape-shifting starter code][shape-shifting starter code]中需要進行這些修改的位置。
:::

#### 2. 設定動畫屬性的初始值

當屬性值發生變化時，`AnimatedContainer` 元件（Widget）會在舊值與新值之間進行過渡動畫。  
為了包裹當使用者點擊 **Change** 時所觸發的行為，請建立一個 `change()` 方法。  
`change()` 方法可以使用 `setState()` 方法來設定 `color`、`borderRadius` 以及 `margin` 這三個 state 變數的新值：

```dart diff
+ void change() {
+   setState(() {
+     color = randomColor();
+     borderRadius = randomBorderRadius();
+     margin = randomMargin();
+   });
+ }
+
  @override
  Widget build(BuildContext context) {
    // ...
```

#### 3. 設定動畫 (Animation) 的觸發條件

若要在使用者按下 **Change** 時觸發動畫 (Animation)，請在 `onPressed()` 處理函式中呼叫 `change()` 方法：

```dart diff
  ElevatedButton(
    child: const Text('Change'),
-   onPressed: () => {},
+   onPressed: () => change(),
  ),
```

#### 4. 設定持續時間

設定動畫（Animation）的`duration`，以控制舊值與新值之間轉換時所用的動畫時間：

```dart diff
  SizedBox(
    width: 128,
    height: 128,
    child: AnimatedContainer(
      margin: EdgeInsets.all(margin),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(borderRadius),
      ),
+     duration: const Duration(milliseconds: 400),
    ),
  ),
```

### 形狀變換（完成版）

以下是你已完成修改的範例。
執行程式碼並點擊 **Change** 來觸發動畫（Animation）。
每次點擊 **Change**，形狀都會針對 `margin`、`borderRadius` 和 `color` 的新值進行動畫變化。

{% render docs/implicit-animations/shape-shifting-complete.md %}

### 使用動畫曲線（animation curves）

前面的範例展示了以下內容：

- 隱式動畫（Implicit animations）允許你針對特定元件（Widget）屬性的值之間的轉換進行動畫。
- `duration` 參數可讓你設定動畫完成所需的時間。

隱式動畫（Implicit animations）也允許你控制動畫在設定的 `duration` 期間內**速率的變化**。
若要定義這個速率變化，
請將 `curve` 參數的值設為
一個 [`Curve`][`Curve`]，例如在 [`Curves`][`Curves`] 類別中宣告的其中一個。

前述範例並未為 `curve` 參數指定值。
若未指定曲線（curve）值，
隱式動畫將套用 [線性動畫曲線（linear animation curve）][linear animation curve]。

請在
[完整形狀變換範例][complete shape-shifting example] 中為 `curve` 參數指定值。
當你為 `curve` 傳入 [`easeInOutBack`][`easeInOutBack`] 常數時，動畫會產生變化。

```dart diff
  SizedBox(
    width: 128,
    height: 128,
    child: AnimatedContainer(
      margin: EdgeInsets.all(margin),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(borderRadius),
      ),
      duration: _duration,
+     curve: Curves.easeInOutBack,
    ),
  ),
```

當你將 `Curves.easeInOutBack` 常數傳遞給 `curve` 元件的 `AnimatedContainer` 屬性時，請觀察 `margin`、`borderRadius` 和 `color` 的變化率如何遵循該常數所定義的曲線。

<video style="width:464px; height:192px;" loop="" autoplay disablepictureinpicture playsinline controls controlslist="nodownload noremoteplayback">
  
</video>

### 整合應用

[完整的形狀變換範例][complete shape-shifting example] 會對 `margin`、`borderRadius` 和 `color` 屬性的值之間的轉換進行動畫處理。
`AnimatedContainer` 元件可以對其任何屬性的變化進行動畫處理，
包括你未使用到的屬性，例如 `padding`、`transform`，
甚至還有 `child` 和 `alignment`！
藉由展示隱式動畫的更多功能，
[完整的形狀變換範例][complete shape-shifting example] 是在 [fade-in complete][fade-in complete] 範例的基礎上進一步擴展的。

總結隱式動畫：

- 有些隱式動畫元件（如 `AnimatedOpacity` 元件）只會對單一屬性進行動畫處理，
  其他元件（如 `AnimatedContainer` 元件）則可以同時對多個屬性進行動畫。
- 隱式動畫會在屬性值改變時，根據所提供的 `curve` 和 `duration`，對舊值與新值之間的轉換進行動畫處理。
- 如果你沒有指定 `curve`，隱式動畫會預設使用 [線性曲線][linear curve]。

## 下一步？

恭喜你，已經完成本次 codelab！
如果想進一步學習，請參考以下建議：

- 嘗試 [動畫教學][animations tutorial]。
- 了解 [hero 動畫][hero animations] 以及 [分段動畫][staggered animations]。
- 查看 [動畫函式庫][animation library]。
- 探索其他 [Flutter 學習資源][Flutter learning resources]。
