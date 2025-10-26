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

為了讓你能從本教學獲得最大效益，建議你先具備以下基礎知識：

- 如何[建立一個 Flutter 應用程式][make a Flutter app]。
- 如何使用[有狀態元件 (Stateful Widgets)][stateful widgets]。

本教學涵蓋以下內容：

- 使用 `AnimatedOpacity` 建立淡入 (fade-in) 效果。
- 使用 `AnimatedContainer` 動畫化尺寸、顏色與邊距的轉換。
- 隱式動畫的概述與使用技巧。

**完成本教學的預估時間：15-30 分鐘。**

## 什麼是隱式動畫？

透過 Flutter 的[動畫函式庫 (animation library)][animation library]，
你可以為 UI 中的元件 (Widgets) 增加動態效果與視覺特效。
函式庫中有一組元件 (Widgets) 會自動為你管理動畫，
這些元件統稱為 _隱式動畫_ (implicit animations)，
或稱 _隱式動畫元件 (implicitly animated widgets)_，
名稱來自它們所實作的
[ImplicitlyAnimatedWidget][ImplicitlyAnimatedWidget] 類別。
使用隱式動畫時，
你只需設定目標屬性值即可讓元件自動產生動畫效果；
每當目標值改變時，
元件會自動將屬性從舊值動畫到新值。
因此，隱式動畫以便利性換取控制權&mdash;它們會自動管理動畫效果，讓你無需自行處理。

## 範例：文字淡入效果

以下範例說明如何利用名為 [AnimatedOpacity][AnimatedOpacity] 的隱式動畫元件 (Widget)
為現有 UI 加入淡入效果。
**此範例一開始並未包含任何動畫程式碼**&mdash;它
僅包含一個 [Material App][Material App] 首頁畫面，內容包括：

- 一張貓頭鷹的照片。
- 一個 **顯示詳細資料** 按鈕，點擊時不會有任何動作。
- 照片中貓頭鷹的描述文字。

### 淡入效果（起始程式碼）

點選 **Run** 以檢視範例：

{% render docs/implicit-animations/fade-in-starter-code.md %}

### 使用 AnimatedOpacity 元件動畫化透明度

本節將列出一系列步驟，協助你在
[淡入效果起始程式碼][fade-in starter code] 中加入隱式動畫。
步驟說明後，你也可以直接執行
[淡入效果完成版][fade-in complete] 程式碼，體驗已完成的效果。
這些步驟將指導你如何使用 `AnimatedOpacity`
元件 (Widget) 加入下列動畫功能：

- 貓頭鷹的描述文字在使用者點擊
  **顯示詳細資料** 前保持隱藏。
- 當使用者點擊 **顯示詳細資料** 時，
  貓頭鷹的描述文字會以淡入方式顯示。

#### 1. 選擇要動畫化的元件屬性

若要建立淡入效果，你可以利用
`opacity` 屬性，並搭配 `AnimatedOpacity` 元件 (Widget) 來實現。
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
你可以參考範例程式碼中的行號，協助追蹤在 [fade-in starter code][fade-in starter code] 中需要進行這些修改的位置。
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

除了 `opacity` 參數之外，`AnimatedOpacity` 還需要指定一個
[duration][duration]，以用於其動畫（Animation）。在這個範例中，
你可以先設定為 2 秒：

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
為了讓 `FadeInDemo` 元件（Widget）在使用者點擊 **Show details** 時完全顯示，
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
你只需要設定 `opacity` 的起始值和結束值。
`AnimatedOpacity` 元件（Widget）會自動管理中間的所有過程。
:::

### 淡入效果（完成版）

以下是你已完成修改後的範例。
執行此範例，然後點擊 **Show details** 以觸發動畫（Animation）。

{% render docs/implicit-animations/fade-in-complete.md %}

### 整合所有內容

[淡入文字效果][Fade-in text effect] 範例展示了 `AnimatedOpacity` 元件（Widget）的以下特性：

- 監聽其 `opacity` 屬性的狀態變化。
- 當 `opacity` 屬性變更時，
  會針對 `opacity` 的新值進行動畫（Animation）過渡。
- 需要一個 `duration` 參數來定義
  值之間過渡所需的時間。

:::note
- 隱式動畫（Implicit animations）只能對父 StatefulWidget 的屬性進行動畫（Animation）。
  前述範例透過繼承 `StatefulWidget` 的 `FadeInDemo` 元件（Widget）來實現這一點。

- `AnimatedOpacity` 元件（Widget）僅能針對 `opacity` 屬性進行動畫（Animation）。
  有些隱式動畫元件（Widgets）可以同時對多個屬性進行動畫（Animation）。
  下列範例將展示這一點。
:::

## 範例：變形（Shape-shifting）效果

以下範例展示如何使用 [`AnimatedContainer`][`AnimatedContainer`] 元件（Widget），
同時針對多個屬性（`margin`、`borderRadius` 和 `color`）
以及不同型別（`double` 和 `Color`）進行動畫（Animation）。
**此範例一開始沒有任何動畫（Animation）程式碼**。
它從一個 [Material App][Material App] 首頁開始，內容包含：

- 一個已設定 `borderRadius`、`margin` 和 `color` 的 `Container` 元件（Widget）。
  這些屬性會在每次執行範例時重新產生。
- 一個 **Change** 按鈕，點擊時目前尚未有任何動作。

### 變形效果（起始程式碼）

要開始此範例，請點擊 **Run**。

{% render docs/implicit-animations/shape-shifting-starter-code.md %}

### 使用 AnimatedContainer 動畫 color、borderRadius 和 margin

本節提供一系列步驟，協助你將隱式動畫（Implicit animation）加入 [變形效果起始程式碼][shape-shifting starter code]。
每完成一個步驟，也可以直接執行
[完整變形效果範例][complete shape-shifting example]，檢視已套用變更的結果。

[變形效果起始程式碼][shape-shifting starter code] 會為 `Container` 元件（Widget）中的每個屬性指派一個隨機值。
相關函式會產生對應的值：

- `randomColor()` 函式會為 `color` 屬性產生 `Color`
- `randomBorderRadius()` 函式會為 `borderRadius` 屬性產生 `double`
- `randomMargin()` 函式會為 `margin` 屬性產生 `double`

下列步驟將使用 `AnimatedContainer` 元件（Widget）來：

- 每當使用者點擊 **Change** 時，將 `color`、`borderRadius` 和 `margin` 過渡到新值。
- 每當 `color`、`borderRadius` 和 `margin` 被設定時，對其進行動畫（Animation）過渡。

#### 1. 新增隱式動畫（Implicit animation）

將 `Container` 元件（Widget）更改為 `AnimatedContainer` 元件（Widget）：

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

#### 2. 設定動畫屬性的起始值

當`AnimatedContainer`元件（Widget）的屬性發生變化時，會在舊值與新值之間進行過渡動畫。  
為了包覆當使用者點擊 **Change** 時所觸發的行為，請建立一個`change()`方法。  
`change()`方法可以使用`setState()`方法來設定`color`、`borderRadius`和`margin`這三個 state 變數的新值：

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

#### 4. 設定動畫（Animation）持續時間

設定`duration`，以決定動畫（Animation）在舊值與新值之間轉換時所需的時間：

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

以下是你已完成修改後的範例。
執行程式碼並點擊 **Change** 來觸發動畫（Animation）。
每次點擊 **Change**，形狀都會針對 `margin`、`borderRadius` 和 `color` 的新值進行動畫過渡。

{% render docs/implicit-animations/shape-shifting-complete.md %}

### 使用動畫曲線（animation curves）

前述範例展示了：

- 隱式動畫（implicit animations）允許你針對特定元件（Widget）屬性的值變化進行動畫過渡。
- `duration` 參數可用來設定動畫完成所需的時間長度。

隱式動畫同時也允許你控制動畫在設定的 `duration` 期間內**速率的變化**。
若要定義這個速率變化，
請將 `curve` 參數設為
[`Curve`][`Curve`]，例如在 [`Curves`][`Curves`] 類別中所宣告的曲線。

前述範例並未為 `curve` 參數指定值。
若未指定曲線（curve）值，
隱式動畫會套用 [線性動畫曲線（linear animation curve）][linear animation curve]。

你可以在
[完整的形狀變換範例][complete shape-shifting example] 中，為 `curve` 參數指定值。
當你將 [`easeInOutBack`][`easeInOutBack`] 常數傳遞給 `curve` 時，動畫會產生變化。

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

當你將 `Curves.easeInOutBack` 常數傳遞給 `curve` 元件的 `AnimatedContainer` 屬性時，請觀察 `margin`、`borderRadius` 和 `color` 的變化速率如何遵循該常數所定義的曲線。

<video style="width:464px; height:192px;" loop="" autoplay disablepictureinpicture playsinline controls controlslist="nodownload noremoteplayback">
  
</video>

### 整合所有內容

[完整的形狀變換範例][complete shape-shifting example] 會對 `margin`、`borderRadius` 和 `color` 屬性的值之間的轉換進行動畫處理。
`AnimatedContainer` 元件可以對其任何屬性的變化進行動畫處理，
包括你未使用到的屬性，例如 `padding`、`transform`，
甚至還有 `child` 和 `alignment`！
透過展示隱式動畫的更多功能，
[完整的形狀變換範例][complete shape-shifting example] 是在 [fade-in complete][fade-in complete] 範例的基礎上進一步延伸。

總結隱式動畫：

- 有些隱式動畫元件，如 `AnimatedOpacity`，只會針對一個屬性進行動畫處理。
  其他像 `AnimatedContainer` 這類元件，則可以同時對多個屬性進行動畫處理。
- 隱式動畫會在屬性值發生變化時，根據所提供的 `curve` 和 `duration`，對新舊值之間的轉換進行動畫處理。
- 如果你沒有指定 `curve`，隱式動畫會預設使用 [線性曲線][linear curve]。

## 接下來呢？

恭喜你完成了本次 codelab！
若想進一步學習，請參考以下建議：

- 嘗試 [animations tutorial][animations tutorial]。
- 了解 [hero animations][hero animations] 以及 [staggered animations][staggered animations]。
- 查看 [animation library][animation library]。
- 探索其他 [Flutter learning resources][Flutter learning resources]。
