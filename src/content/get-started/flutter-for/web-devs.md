---
title: 給網頁開發者的 Flutter 指南
description: >-
  學習如何將 Web 開發知識應用於 Flutter 應用程式開發。
---

<?code-excerpt path-base="get-started/flutter-for/web_devs"?>

本頁面適用於熟悉 HTML 與 CSS 語法、用於安排應用程式 UI 元件（Widgets）的使用者。此頁將 HTML/CSS 程式碼片段對應到其 Flutter/Dart 程式碼等價寫法。

Flutter 是一個用於建構跨平台應用程式的框架，採用 Dart 程式語言。若想了解 Dart 與 JavaScript 程式設計之間的一些差異，請參閱[作為 JavaScript 開發者學習 Dart][Learning Dart as a JavaScript Developer]。

設計網頁版面與 Flutter 版面配置其中一個根本性的差異，在於理解「限制條件（constraints）」的運作方式，以及元件（Widgets）如何被調整大小與定位。欲進一步了解，請參閱[理解限制條件][Understanding constraints]。

本頁範例假設：

* HTML 文件以 `<!DOCTYPE html>` 開頭，且所有 HTML 元素的 CSS box model 都設為 [`border-box`][`border-box`]，以與 Flutter 的模型保持一致。

  ```css
  {
      box-sizing: border-box;
  }
  ```
* 在 Flutter 中，'Lorem ipsum' 文字的預設樣式是由 `bold24Roboto` 變數定義，如下所示，以保持語法簡潔：

  <?code-excerpt "lib/main.dart (text-style)"?>
  ```dart
  TextStyle bold24Roboto = const TextStyle(
    color: Colors.white,
    fontSize: 24,
    fontWeight: FontWeight.bold,
  );
  ```

:::secondary
react 風格，或稱為 _宣告式_（declarative）程式設計，與傳統的命令式（imperative）程式設計有何不同？
如需比較，請參閱 [Introduction to declarative UI][Introduction to declarative UI]。
:::

## 執行基本版面配置操作

以下範例展示如何執行最常見的 UI 版面配置任務。

### 文字的樣式設定與對齊

字體樣式、大小以及其他文字屬性，在 CSS 中通常透過 font 和 color 屬性處理，而在 Flutter 中則是 [`TextStyle`][`TextStyle`] 作為 [`Text`][`Text`] 元件（Widget）的子屬性來個別設定。

至於 CSS 中用於文字對齊的 text-align 屬性，Flutter 則有 [`Text`][`Text`] 元件（Widget）的 textAlign 屬性可用。

在 HTML 與 Flutter 中，子元素或元件（Widgets）預設都是錨定在左上角。

```css highlightLines=9
<div class="grey-box">
  Lorem ipsum
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Georgia;
}
```

```dart highlightLines=8-13
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: const Text(
    'Lorem ipsum',
    style: TextStyle(
      fontFamily: 'Georgia',
      fontSize: 24,
      fontWeight: FontWeight.bold,
    ),
    textAlign: TextAlign.center,
  ),
);
```

### 設定背景顏色

在 Flutter 中，你可以透過 `color` 屬性或 `decoration` 屬性來設定 [`Container`][`Container`] 的背景顏色。
不過，這兩個屬性不能同時指定，因為這樣可能會導致裝飾（decoration）覆蓋背景顏色的情況。
當背景僅需單一顏色時，建議優先使用 `color` 屬性。
若需其他效果，例如漸層或圖片，則請使用 `decoration` 屬性。

CSS 範例中所使用的顏色為 Material 色彩調色盤的十六進位對應值。

```css highlightLines=6
<div class="grey-box">
  Lorem ipsum
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
}
```

```dart highlightLines=5
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Text(
    'Lorem ipsum',
    style: bold24Roboto,
  ),
);
```

```dart highlightLines=5-7
final container = Container(
  // grey box
  width: 320,
  height: 240,
  decoration: BoxDecoration(
    color: Colors.grey[300],
  ),
  child: Text(
    'Lorem ipsum',
    style: bold24Roboto,
  ),
);
```

### 置中元件

[`Center`][`Center`] 元件（Widget）會同時在水平與垂直方向上置中其子元件。

若要在 CSS 中達到類似的效果，父元素通常會使用 flex 或 table-cell 的 display 行為。本頁範例展示的是 flex 行為。

```css highlightLines=10-12
<div class="grey-box">
  Lorem ipsum
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

```dart highlightLines=6-7
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Text(
      'Lorem ipsum',
      style: bold24Roboto,
    ),
  ),
);
```

### 設定容器寬度

若要指定 [`Container`][`Container`] 元件（Widget）的寬度，可以使用其 `width` 屬性。這是一個固定寬度，與 CSS 的 max-width 屬性不同，max-width 會根據最大值自動調整容器寬度。若要在 Flutter 中模擬這種效果，可以使用 Container 的 `constraints` 屬性。建立一個新的 [`BoxConstraints`][`BoxConstraints`] 元件，並搭配 `minWidth` 或 `maxWidth` 使用。

對於巢狀的 Container，如果父容器的寬度小於子容器的寬度，子 Container 會自動調整大小以符合父容器。

```css highlightLines=9,20-21
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    width: 100%;
    max-width: 240px;
}
```

```dart highlightLines=3,9
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      width: 240, // max-width is 240
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
      ),
    ),
  ),
);
```

## 操作位置與尺寸

以下範例展示如何對元件（Widget）的位置、尺寸與背景進行更複雜的操作。

### 設定絕對位置

預設情況下，元件會相對於其父元件進行定位。

若要以 x-y 座標為元件指定絕對位置，請將其巢狀於 [`Positioned`][`Positioned`] 元件中，並進一步巢狀於 [`Stack`][`Stack`] 元件內。

```css highlightLines=8,18-20
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    position: relative;
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    position: absolute;
    top: 24px;
    left: 24px;
}
```

```dart highlightLines=6-7,10-11
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Stack(
    children: [
      Positioned(
        // red box
        left: 24,
        top: 24,
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.red[400],
          ),
          child: Text(
            'Lorem ipsum',
            style: bold24Roboto,
          ),
        ),
      ),
    ],
  ),
);
```

### 旋轉元件 (Rotating components)

若要旋轉一個元件（Widget），請將其巢狀於 [`Transform`][`Transform`] 元件中。
使用 `Transform` 元件的 `alignment` 與 `origin` 屬性，
分別以相對與絕對的方式指定變形原點（支點）。

若要進行簡單的 2D 旋轉（即在 Z 軸上旋轉元件），
請建立一個新的 [`Matrix4`][`Matrix4`] 單位矩陣物件（identity object），
並使用其 `rotateZ()` 方法，透過弧度（度數 × π / 180）來指定旋轉因子。

```css highlightLines=20
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    transform: rotate(15deg);
}
```

```dart highlightLines=7-10,
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Transform(
      alignment: Alignment.center,
      transform: Matrix4.identity()..rotateZ(15 * 3.1415927 / 180),
      child: Container(
        // red box
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.red[400],
        ),
        child: Text(
          'Lorem ipsum',
          style: bold24Roboto,
          textAlign: TextAlign.center,
        ),
      ),
    ),
  ),
);
```

### 元件縮放

若要放大或縮小一個元件（Widget），請將其包裹在 [`Transform`][`Transform`] 元件中。
可以使用 Transform 元件的 `alignment` 和 `origin` 屬性，
分別以相對或絕對方式指定變形的原點（支點）。

若要在 x 軸上進行簡單的縮放操作，
請建立一個新的 [`Matrix4`][`Matrix4`] 單位矩陣物件，
並使用其 `scale()` 方法來指定縮放係數。

當你縮放父元件時，
其子元件也會相應地被縮放。

```css highlightLines=20
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    transform: scale(1.5);
}
```

```dart highlightLines=7-10
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Transform(
      alignment: Alignment.center,
      transform: Matrix4.identity()..scaleByDouble(1.5, 1.5, 1.5, 1.5),
      child: Container(
        // red box
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.red[400],
        ),
        child: Text(
          'Lorem ipsum',
          style: bold24Roboto,
          textAlign: TextAlign.center,
        ),
      ),
    ),
  ),
);
```

### 套用線性漸層

要將線性漸層應用於元件（Widget）的背景，請將其巢狀於 [`Container`][`Container`] 元件中。接著，使用 `Container` 元件的 `decoration` 屬性來建立一個 [`BoxDecoration`][`BoxDecoration`] 物件，並透過 `BoxDecoration` 的 `gradient` 屬性來轉換背景填色。

漸層的「角度」是根據 Alignment（x, y）值來決定：

* 如果起始與結束的 x 值相同，則漸層為垂直方向（0° | 180°）。
* 如果起始與結束的 y 值相同，則漸層為水平方向（90° | 270°）。

#### 垂直漸層

```css highlightLines=19
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    padding: 16px;
    color: #ffffff;
    background: linear-gradient(180deg, #ef5350, rgba(0, 0, 0, 0) 80%);
}
```

```dart highlightLines=9-18
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment(0.0, 0.6),
          colors: <Color>[
            Color(0xffef5350),
            Color(0x00ef5350),
          ],
        ),
      ),
      padding: const EdgeInsets.all(16),
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
      ),
    ),
  ),
);
```

#### 水平漸層

```css highlightLines=19
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    padding: 16px;
    color: #ffffff;
    background: linear-gradient(90deg, #ef5350, rgba(0, 0, 0, 0) 80%);
}
```

```dart highlightLines=10-19
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment(-1.0, 0.0),
          end: Alignment(0.6, 0.0),
          colors: <Color>[
            Color(0xffef5350),
            Color(0x00ef5350),
          ],
        ),
      ),
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
      ),
    ),
  ),
);
```

## 操作圖形

以下範例展示如何建立與自訂圖形。

### 圓角處理

若要讓矩形圖形的角落變為圓角，可以使用 [`BoxDecoration`][`BoxDecoration`] 物件的 `borderRadius` 屬性。建立一個新的 [`BorderRadius`][`BorderRadius`] 物件，並指定每個角落的圓角半徑。

```css highlightLines=20
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    border-radius: 8px;
}
```

```dart highlightLines=12-14
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red circle
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.red[400],
        borderRadius: const BorderRadius.all(
          Radius.circular(8),
        ),
      ),
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
      ),
    ),
  ),
);
```

### 新增 box shadows（盒狀陰影）

在 CSS 中，你可以使用 `box-shadow` 屬性，以簡寫方式指定陰影的偏移量和模糊程度。以下範例展示了兩個 box shadows，其屬性為：

* `xOffset: 0px, yOffset: 2px, blur: 4px, color: black @80% alpha`
* `xOffset: 0px, yOffset: 06x, blur: 20px, color: black @50% alpha`

在 Flutter 中，每個屬性和值都需要分開指定。請使用 `BoxDecoration` 的 `boxShadow` 屬性來建立一個 [`BoxShadow`][`BoxShadow`] 元件（Widgets）清單。你可以定義一個或多個 `BoxShadow` 元件（Widgets），這些元件可以堆疊，以自訂陰影的深度、顏色等效果。

```css highlightLines=20-21
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8),
              0 6px 20px rgba(0, 0, 0, 0.5);
}
```

```dart highlightLines=15-26
final container = Container(
  // grey box
  width: 320,
  height: 240,
  margin: const EdgeInsets.only(bottom: 16),
  decoration: BoxDecoration(
    color: Colors.grey[300],
  ),
  child: Center(
    child: Container(
      // red box
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.red[400],
        boxShadow: const <BoxShadow>[
          BoxShadow(
            color: Color(0xcc000000),
            offset: Offset(0, 2),
            blurRadius: 4,
          ),
          BoxShadow(
            color: Color(0x80000000),
            offset: Offset(0, 6),
            blurRadius: 20,
          ),
        ],
      ),
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
      ),
    ),
  ),
);
```

### 製作圓形與橢圓形

在 CSS 中製作圓形通常需要透過將矩形的四個邊的 `border-radius` 設為 50% 來達成，雖然也有[基本形狀][basic shapes]可用。

這種做法可以透過 [`BoxDecoration`][`BoxDecoration`] 的 `borderRadius` 屬性來實現，而 Flutter 則提供了 `shape` 屬性，並搭配 [`BoxShape` enum][`BoxShape` enum] 來達成相同目的。

```css highlightLines=20-23
<div class="grey-box">
  <div class="red-circle">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-circle {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    text-align: center;
    width: 160px;
    height: 160px;
    border-radius: 50%;
}
```

```dart highlightLines=11,14-15,19
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red circle
      decoration: BoxDecoration(
        color: Colors.red[400],
        shape: BoxShape.circle,
      ),
      padding: const EdgeInsets.all(16),
      width: 160,
      height: 160,
      child: Text(
        'Lorem ipsum',
        style: bold24Roboto,
        textAlign: TextAlign.center,
      ),
    ),
  ),
);
```

## 操作文字

以下範例說明如何指定字型及其他文字屬性，同時也展示如何轉換文字字串、自訂間距，以及建立摘要。

### 調整文字間距

在 CSS 中，你可以透過設定 `letter-spacing` 和 `word-spacing` 屬性來指定每個字母或單字之間的空白量。這些屬性的值可以使用 px、pt、cm、em 等單位。

在 Flutter 中，你可以在 [`TextStyle`][`TextStyle`] 的 `letterSpacing` 和 `wordSpacing` 屬性（以邏輯像素為單位，允許負值）來指定空白量，並將其作為 `Text` 元件（Widget）的子元件（child）。

```css highlightLines=20
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    letter-spacing: 4px;
}
```

```dart highlightLines=19
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      child: const Text(
        'Lorem ipsum',
        style: TextStyle(
          color: Colors.white,
          fontSize: 24,
          fontWeight: FontWeight.w900,
          letterSpacing: 4,
        ),
      ),
    ),
  ),
);
```

### 進行行內格式變更

[`Text`][`Text`] 元件（Widget）可讓你顯示具有部分格式設定特性的文字。  
若要顯示具有多種樣式的文字（例如：讓單一單字加強顯示），請改用 [`RichText`][`RichText`] 元件。  
其 `text` 屬性可以指定一個或多個 [`TextSpan`][`TextSpan`] 物件，這些物件可以各自設定樣式。

在以下範例中，"Lorem" 會以預設（繼承）文字樣式顯示於 `TextSpan`，而 "ipsum" 則會以自訂樣式顯示於另一個 `TextSpan`。

```css highlightLines=3,11,21-4
<div class="grey-box">
  <div class="red-box">
    Lorem <em>ipsum</em>
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
}
.red-box em {
    font: 300 48px Roboto;
    font-style: italic;
}
```

```dart highlightLines=13-28
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      padding: const EdgeInsets.all(16),
      child: RichText(
        text: TextSpan(
          style: bold24Roboto,
          children: const <TextSpan>[
            TextSpan(text: 'Lorem '),
            TextSpan(
              text: 'ipsum',
              style: TextStyle(
                fontWeight: FontWeight.w300,
                fontStyle: FontStyle.italic,
                fontSize: 48,
              ),
            ),
          ],
        ),
      ),
    ),
  ),
);
```

### 建立文字摘要

文字摘要會顯示段落的前幾行文字，並處理溢出的文字，通常會以省略號顯示。

在 Flutter 中，可以使用 [`Text`][`Text`] 元件（Widget）的 `maxLines` 屬性來指定摘要中要顯示的行數，並透過 `overflow` 屬性來處理溢出的文字。

```css highlightLines=20-23
<div class="grey-box">
  <div class="red-box">
    Lorem ipsum dolor sit amet, consec etur
  </div>
</div>

.grey-box {
    background-color: #e0e0e0; /* grey 300 */
    width: 320px;
    height: 240px;
    font: 900 24px Roboto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.red-box {
    background-color: #ef5350; /* red 400 */
    padding: 16px;
    color: #ffffff;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
```

```dart highlightLines=16-17
final container = Container(
  // grey box
  width: 320,
  height: 240,
  color: Colors.grey[300],
  child: Center(
    child: Container(
      // red box
      decoration: BoxDecoration(
        color: Colors.red[400],
      ),
      padding: const EdgeInsets.all(16),
      child: Text(
        'Lorem ipsum dolor sit amet, consec etur',
        style: bold24Roboto,
        overflow: TextOverflow.ellipsis,
        maxLines: 1,
      ),
    ),
  ),
);
```


[basic shapes]: https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape  
[`border-box`]: https://css-tricks.com/box-sizing/  
[`BorderRadius`]: {{site.api}}/flutter/painting/BorderRadius-class.html  
[`BoxDecoration`]: {{site.api}}/flutter/painting/BoxDecoration-class.html  
[`BoxConstraints`]: {{site.api}}/flutter/rendering/BoxConstraints-class.html  
[`BoxShape` enum]: {{site.api}}/flutter/painting/BoxShape.html  
[`BoxShadow`]: {{site.api}}/flutter/painting/BoxShadow-class.html  
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html  
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html  
[Introduction to declarative UI]: /get-started/flutter-for/declarative  
[Learning Dart as a JavaScript Developer]: {{site.dart-site}}/guides/language/coming-from/js-to-dart  
[`Matrix4`]: {{site.api}}/flutter/vector_math_64/Matrix4-class.html  
[`Positioned`]: {{site.api}}/flutter/widgets/Positioned-class.html  
[`RichText`]: {{site.api}}/flutter/widgets/RichText-class.html  
[`Stack`]: {{site.api}}/flutter/widgets/Stack-class.html  
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html  
[`TextSpan`]: {{site.api}}/flutter/painting/TextSpan-class.html  
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html  
[`Transform`]: {{site.api}}/flutter/widgets/Transform-class.html  
[Understanding constraints]: /ui/layout/constraints

