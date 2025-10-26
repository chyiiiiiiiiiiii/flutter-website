---
title: 版面配置
description: 學習如何在 Flutter 中建立版面配置。
prev:
  title: 元件 (Widgets)
  path: /get-started/fundamentals/widgets
next:
  title: 狀態管理
  path: /get-started/fundamentals/state-management
---

由於 Flutter 是一套 UI 工具包，你會花很多時間使用 Flutter 元件 (Widgets) 來建立版面配置。在本節中，你將學習如何使用一些最常見的版面配置元件 (Layout widgets) 來建立版面。你也會使用 Flutter DevTools（也稱為 Dart DevTools）來了解 Flutter 如何建立你的版面。最後，你將遇到並除錯 Flutter 最常見的版面錯誤之一——令人頭痛的「無界限限制（unbounded constraints）」錯誤。

## 理解 Flutter 的版面配置

Flutter 版面配置機制的核心是元件 (Widgets)。在 Flutter 中，幾乎所有東西都是元件——即使是版面配置模型也是元件。你在 Flutter 應用程式中看到的圖片、圖示和文字，都是元件。你看不到的東西也是元件，例如排列、限制和對齊可見元件 (Widget) 的 rows（行）、columns（列）和 grids（網格）。

你可以透過組合元件來建立更複雜的元件，進而完成版面配置。例如，下圖顯示了三個圖示，每個圖示下方都有一個標籤，以及對應的元件樹：

<img src='/assets/images/docs/fwe/layout/simple_row_column_widget_tree.png' alt="A diagram that shows widget composition with a series of lines and nodes.">

在這個例子中，有一行包含三個列，每個列中都有一個圖示和一個標籤。所有的版面配置，不論多麼複雜，都是透過這些版面配置元件 (Layout widgets) 組合而成。

### 限制（Constraints）

理解 Flutter 中的限制（constraints）是了解 Flutter 版面配置運作方式的重要部分。

一般來說，版面配置指的是元件的大小以及它們在螢幕上的位置。任何元件的大小和位置都會受到其父元件的限制；它不能隨意設定任何大小，也不能自己決定在螢幕上的位置。相反地，大小和位置是透過元件與其父元件之間的對話來決定的。

在最簡單的例子中，這個版面配置對話如下：

 1. 元件從其父元件接收限制（constraints）。
 2. 限制其實就是四個 double 數值的集合：最小和最大寬度，以及最小和最大高度。
 3. 元件根據這些限制決定自己應該有多大，然後將自己的寬度和高度回傳給父元件。
 4. 父元件根據它想要的大小以及應該如何對齊，設定元件的位置。對齊可以明確設定，例如使用各種元件如 `Center`，以及 `Row` 和 `Column` 上的對齊屬性。

在 Flutter 中，這個版面配置對話經常以簡化的說法表達為：「限制往下傳遞，大小往上回報，父元件設定位置。」

### Box 類型

在 Flutter 中，元件是由其底層的 [`RenderBox`][`RenderBox`] 物件來繪製。這些物件決定了它們如何處理所接收到的限制（constraints）。

一般來說，有三種 box（方塊）類型：
* 嘗試盡可能大。例如，[`Center`][`Center`] 和 [`ListView`][`ListView`] 所使用的 box。
* 嘗試與其子元件一樣大。例如，[`Transform`][`Transform`] 和 [`Opacity`][`Opacity`] 所使用的 box。
* 嘗試成為特定大小。例如，[`Image`][`Image`] 和 [`Text`][`Text`] 所使用的 box。

有些元件，例如 [`Container`][`Container`]，會根據建構子的參數在不同 box 類型之間切換。`Container` 建構子預設會嘗試盡可能大，但如果你給它一個寬度，它就會嘗試遵守這個設定，變成特定大小。

其他元件，例如 [`Row`][`Row`] 和 [`Column`][`Column`] (flex boxes)，則會根據所給的限制（constraints）而有所不同。你可以在 [Understanding Constraints article][Understanding Constraints article] 進一步閱讀有關 flex box 和限制的內容。

## 配置單一元件

要在 Flutter 中配置單一元件，可以將一個可見元件 (Widget)，如 `Text` 或 `Image`，包裹在一個可以改變其在螢幕上位置的元件中，例如 `Center` 元件。

:::note 注意
本頁範例使用了一個名為 `BorderedImage` 的元件。這是一個自訂元件，僅用於隱藏與本主題無關的程式碼。
:::

```dart
Widget build(BuildContext context) {
  return Center(
    child: BorderedImage(),
  );
}
```

下圖顯示了左側一個未對齊的元件（Widget），以及右側一個已置中的元件（Widget）。

<img src='/assets/images/docs/fwe/layout/center.png' alt="A screenshot of a centered widget and a screenshot of a widget that hasn't been centered.">

所有版面配置元件 (Layout widgets) 都具有以下其中一種屬性：
* 如果僅接受單一子元件，則具有 `child` 屬性——例如 `Center`、`Container` 或 `Padding`。
* 如果接受多個元件的清單，則具有 `children` 屬性——例如 `Row`、`Column`、`ListView` 或 `Stack`。

### Container

`Container` 是一個便利元件（Widget），它由多個負責版面配置、繪製（Painting）、定位與尺寸調整的元件所組成。在版面配置方面，它可用來為元件（Widget）添加內距（padding）與邊距（margin）。這裡同樣也可以使用 `Padding` 元件來達到相同效果。以下範例使用了 `Container`。

```dart
Widget build(BuildContext context) {
  return Container(
    padding: EdgeInsets.all(16.0),
    child: BorderedImage(),
  );
}
```

下圖左側顯示沒有左側內距（padding）的元件（Widget），
右側則顯示有內距的元件。

<img src='/assets/images/docs/fwe/layout/padding.png' alt="A screenshot of a widget with padding and a screenshot of a widget without padding.">

若要在 Flutter 中建立更複雜的版面配置，
你可以組合多個元件（Widgets）。
例如，你可以結合 `Container` 和 `Center`：

```dart
Widget build(BuildContext context) {
  return Center(
    Container(
      padding: EdgeInsets.all(16.0),
      child: BorderedImage(),
    ),
  );
}
```

## 垂直或水平排列多個元件（Widgets）

其中一個最常見的版面配置模式，就是將元件（Widgets）垂直或水平排列。  
你可以使用 `Row` 元件來水平排列元件，  
也可以使用 `Column` 元件來垂直排列元件。  
本頁的第一張圖同時使用了這兩種元件。

以下是使用 `Row` 元件的最基本範例。

{% render docs/code-and-image.md,
image:"fwe/layout/row.png",
caption: "這張圖顯示了一個具有三個子項的 row 元件。"
alt: "一個 row 元件，內含三個子項的螢幕截圖"
code:"
```dart
Widget build(BuildContext context) {
  return Row(
    children: [
      BorderedImage(),
      BorderedImage(),
      BorderedImage(),
    ],
  );
}
```
每個 `Row` 或 `Column` 的子項目（child）本身也可以是
rows 或 columns，彼此組合以建立複雜的版面配置。
例如，你可以在上述範例中的每個圖片下方，透過 columns 加上標籤。

{% render docs/code-and-image.md,
image:"fwe/layout/nested_row_column.png",
caption: "此圖顯示一個 row 元件（Widget），其有三個子項目，每個子項目都是一個 column。"
alt: "螢幕截圖顯示一排三個元件（Widget），每個元件下方都有一個標籤。"
code:"
```dart
Widget build(BuildContext context) {
  return Row(
    children: [
      Column(
        children: [
          BorderedImage(),
          Text('Dash 1'),
        ],
      ),
      Column(
        children: [
          BorderedImage(),
          Text('Dash 2'),
        ],
      ),
      Column(
        children: [
          BorderedImage(),
          Text('Dash 3'),
        ],
      ),
    ],
  );
}
```
" %}


### 在 Row 和 Column 中對齊元件 (Widgets)

在以下範例中，
每個元件 (Widget) 的寬度為 200 像素，
而檢視區（viewport）的寬度為 700 像素。
因此，這些元件會依序向左對齊，
多餘的空間則集中在右側。

<img src='/assets/images/docs/fwe/layout/left_alignment.png' alt="A diagram that shows three widgets laid out in a row. Each child widget is labeled as 200px wide, and the blank space on the right is labeled as 100px wide.">

你可以透過 `mainAxisAlignment` 和
`crossAxisAlignment` 屬性來控制 Row 或 Column
如何對齊其子元件 (children)。
對於 Row 來說，主軸（main axis）是水平方向，
而交叉軸（cross axis）是垂直方向；對於 Column，
主軸則是垂直方向，交叉軸則是水平方向。

<img src='/assets/images/docs/fwe/layout/axes_diagram.png' alt="A diagram that shows the direction of the main axis and cross axis in both rows and columns">

將主軸對齊方式設為 `spaceEvenly`
會將多餘的水平空間平均分配在每個圖片之間、前面以及後面。

{% render docs/code-and-image.md,
image:"fwe/layout/space_evenly.png",
caption: "此圖顯示一個 Row 元件 (Widget) 有三個子元件，並以 MainAxisAlignment.spaceEvenly 常數平均對齊。",
alt: "A screenshot of three widgets, spaced evenly from each other."
code:"
```dart
Widget build(BuildContext context) {
  return Row(
    [!mainAxisAlignment: MainAxisAlignment.spaceEvenly!],
    children: [
      BorderedImage(),
      BorderedImage(),
      BorderedImage(),
    ],
  );
}
```
" %}

欄（Column）與列（Row）運作方式相同。
以下範例展示了一個由 3 張圖片組成的欄，
每張圖片高度為 100 像素。該渲染框（在此例中為整個螢幕）的
高度超過 300 像素，因此將主軸對齊（main axis alignment）設為 `spaceEvenly`
會將多餘的垂直空間平均分配在每張圖片之間、上方與下方。

<img src='/assets/images/docs/fwe/layout/col_space_evenly.png' alt="A screenshot of a three widgets laid out vertically, using a column widget.">

[`MainAxisAlignment`][`MainAxisAlignment`] 和 [`CrossAxisAlignment`][`CrossAxisAlignment`]
這兩個 enum 提供多種常數，可用來控制對齊方式。

Flutter 也包含其他可用於對齊的元件（Widgets），其中較常用的是 `Align` 元件。

### 在 Row 與 Column 中調整元件尺寸

當版面配置超出裝置可顯示範圍時，
受影響的邊緣會出現黃黑相間的條紋圖案。
在此範例中，檢視區（viewport）寬度為 400 像素，
每個子元件寬度為 150 像素。

<img src='/assets/images/docs/fwe/layout/overflowing_row.png' alt="A screenshot of a row of widgets that are wider than their viewport.">

可以使用 `Expanded` 元件，將元件尺寸調整至適合於
Row 或 Column 之中。若要修正前述圖片列過寬
導致超出渲染框的問題，請將每張圖片包裹在 [`Expanded`][`Expanded`] 元件中。

{% render docs/code-and-image.md,
image:"fwe/layout/expanded_row.png",
caption: "此圖顯示一個 Row 元件，其三個子元件皆包裹於 `Expanded` 元件中。"
alt: "A screenshot of three widgets, which take up exactly the amount of space available on the main axis. All three widgets are equal width."
code:"
```dart
Widget build(BuildContext context) {
  return const Row(
    children: [
      [!Expanded!](
        child: BorderedImage(width: 150, height: 150),
      ),
      [!Expanded!](
        child: BorderedImage(width: 150, height: 150),
      ),
      [!Expanded!](
        child: BorderedImage(width: 150, height: 150),
      ),
    ],
  );
}
```
" %}

`Expanded` 元件（Widget）也可以決定某個元件（Widget）相對於其兄弟元件應該佔用多少空間。例如，你可能希望某個元件佔用的空間是其兄弟元件的兩倍。這時，可以使用 `Expanded` 元件的 `flex` 屬性，這是一個整數，用來決定該元件的彈性係數（flex factor）。預設的彈性係數為 1。以下程式碼將中間圖片的彈性係數設為 2：

{% render docs/code-and-image.md,
image:"fwe/layout/flex_2_row.png",
caption: "此圖顯示一個具有三個子元件的 row 元件（Widget），這些子元件都包裹在 `Expanded` 元件中。中間的子元件其 `flex` 屬性被設為 2。"
alt: "三個元件的螢幕截圖，它們在主軸上剛好佔滿所有可用空間。中間的元件寬度是左右兩側元件的兩倍。"
code:"
```dart
Widget build(BuildContext context) {
  return const Row(
    children: [
      Expanded(
        child: BorderedImage(width: 150, height: 150),
      ),
      Expanded(
        [!flex: 2!],
        child: BorderedImage(width: 150, height: 150),
      ),
      Expanded(
        child: BorderedImage(width: 150, height: 150),
      ),
    ],
  );
}
```
" %}

## DevTools 與版面配置除錯

在某些情況下，一個 box 的限制（constraint）是無界（unbounded）或無限（infinite）的。這代表最大寬度或最大高度被設為 [`double.infinity`][`double.infinity`]。當一個 box 嘗試盡可能變大時，如果給予它無界的限制，在 debug 模式下會丟出例外，因為這樣的 box 無法正常運作。

最常見的情況是，當一個 render box 處於 flex box（如 [`Row`][`Row`] 或 [`Column`][`Column`]）內，或是在可滾動區域（例如 [`ListView`][`ListView`] 及其他 [`ScrollView`][`ScrollView`] 子類別）中時，會遇到無界限制。例如，`ListView` 會嘗試在交錯方向（cross-direction）上展開以符合可用空間（也許它是一個垂直滾動的區塊，並嘗試與其父元件一樣寬）。如果你將一個垂直滾動的 `ListView` 巢狀放在一個水平滾動的 `ListView` 內，內層的列表會嘗試變得盡可能寬，而這個寬度是無限的，因為外層在該方向上是可滾動的。

你在開發 Flutter 應用程式時，最常遇到的錯誤之一，就是錯誤地使用版面配置元件（Layout widgets），這類錯誤被稱為「無界限制（unbounded constraints）」錯誤。

如果你剛開始開發 Flutter 應用程式，只需要準備面對一種型別的錯誤，那就是這個。

{% ytEmbed 'jckqXR5CrPI', 'Decoding Flutter: Unbounded height and width' %}

:::note Widget 檢查器
Flutter 提供了完整的 DevTools 工具組，協助你處理 Flutter 開發的各種面向。
其中「Widget Inspector」工具在建立與除錯版面配置（以及一般元件操作）時特別有用。

[進一步了解 Flutter inspector][Learn more about the Flutter inspector]。
:::

## 滾動元件 (Scrolling Widgets)

Flutter 內建許多會自動滾動的元件（Widgets），也提供多種可自訂的元件，讓你建立特定的滾動行為。
本頁將介紹如何使用最常見的元件來讓任何頁面可滾動，以及建立可滾動列表的元件。

### ListView

`ListView` 是一個類似 column 的元件，當其內容超過自身 render box 長度時，會自動提供滾動功能。
最基本的 `ListView` 用法與 `Column` 或 `Row` 非常相似。
不同於 column 或 row，`ListView` 要求其子元件（children）在交錯軸（cross axis）上必須佔滿所有可用空間，如下方範例所示。

{% render docs/code-and-image.md,
image:"fwe/layout/basic_listview.png",
caption: "此圖顯示了一個包含三個子元件的 ListView 元件。"
alt: "三個元件垂直排列的螢幕截圖。它們已經在交錯軸上展開，佔滿所有可用空間。"
code:"
```dart
Widget build(BuildContext context) {
  return [!ListView!](
    children: const [
      BorderedImage(),
      BorderedImage(),
      BorderedImage(),
    ],
  );
}
```
" %}

`ListView` 通常用於當你有未知數量、非常大量（或無限）的清單項目時。  
在這種情況下，建議使用 `ListView.builder` 建構函式（constructor）。  
builder 建構函式只會建立目前螢幕上可見的子元件（children）。

在以下範例中，`ListView` 正在顯示一個待辦事項（to-do）清單。  
這些待辦事項是從資料儲存庫（repository）中取得，  
因此待辦事項的數量是未知的。

{% render docs/code-and-image.md,
image:"fwe/layout/listview_builder.png",
caption: "此圖展示了 ListView.builder 建構函式用於顯示未知數量的子元件（children）。"
alt: "多個元件（Widget）垂直排列的螢幕截圖。這些元件已經展開，佔據了橫向所有可用空間。"
code:"
```dart
final List<ToDo> items = Repository.fetchTodos();

Widget build(BuildContext context) {
  return ListView.builder(
    itemCount: items.length,
    itemBuilder: (context, idx) {
      var item = items[idx];
      return Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(item.description),
            Text(item.isComplete),
          ],
        ),
      );
    },
  );
}
```
" %}

## 自適應版面配置

由於 Flutter 可用於建立行動裝置、平板、桌面以及網頁應用程式，因此你很可能需要根據螢幕大小或輸入裝置等因素，調整應用程式的行為。這種根據不同環境調整應用程式的作法，稱為讓應用程式具備「自適應」（adaptive）與「響應式」（responsive）特性。

在實現自適應版面配置時，其中一個最實用的元件（Widget）就是 [`LayoutBuilder`][`LayoutBuilder`] 元件。`LayoutBuilder` 是 Flutter 中眾多採用「builder」模式的元件之一。

### builder 模式

在 Flutter 中，你會發現有許多元件的名稱或建構函式中包含「builder」這個詞。以下清單並非全部：

* [`ListView.builder`][`ListView.builder`]
* [`GridView.builder`][`GridView.builder`]
* [`Builder`][`Builder`]
* [`LayoutBuilder`][`LayoutBuilder`]
* [`FutureBuilder`][`FutureBuilder`]

這些不同的「builder」元件適用於解決不同的問題。例如，`ListView.builder` 建構函式主要用於延遲渲染清單中的項目，而 `Builder` 元件則適合在深層元件程式碼中存取 `BuildContext`。

儘管用途不同，這些 builder 元件的運作方式是一致的。builder 元件與 builder 建構函式都會有名為 'builder' 的參數（或類似名稱，例如 `ListView.builder` 中的 `itemBuilder`），而這個 builder 參數總是接受一個回呼函式（callback）。這個回呼函式稱為 __builder 函式__。builder 函式會將資料傳遞給父元件，父元件則利用這些參數來建立並回傳子元件。builder 函式至少會傳入一個參數──build context──通常還會有其他參數。

舉例來說，`LayoutBuilder` 元件可用來根據檢視區（viewport）的大小建立響應式版面配置。builder 回呼函式的主體會從父元件接收到 [`BoxConstraints`][`BoxConstraints`]，以及元件的 'BuildContext'。有了這些限制條件，你就能根據可用空間回傳不同的元件。

{% ytEmbed 'IYDVcriKjsw', 'LayoutBuilder (Flutter Widget of the Week)' %}

在下方範例中，`LayoutBuilder` 所回傳的元件會根據檢視區寬度是否小於或等於 600 像素，或大於 600 像素而有所不同。

{% render docs/code-and-image.md,
image:"fwe/layout/layout_builder.png",
caption: "此圖顯示一個窄版面配置（子元件垂直排列）以及一個寬版面配置（子元件以網格排列）。"
alt: "兩個螢幕截圖，一個顯示窄版面配置，另一個顯示寬版面配置。"
code:"
```dart
Widget build(BuildContext context) {
  return LayoutBuilder(
    builder: (BuildContext context, BoxConstraints constraints) {
      [!if (constraints.maxWidth <= 600)!] {
        return _MobileLayout();
      } else {
        return _DesktopLayout();
      }
    },
  );
}
```
同時，`ListView.builder` 建構函式中的 `itemBuilder` 回呼函式會接收 build context 以及 `int`。  
這個回呼函式會針對清單中的每一個項目各自被呼叫一次，  
而 int 參數則代表該清單項目的索引。

每當 Flutter 建立 UI 時，第一次呼叫 itemBuilder 回呼時，  
傳入的 int 會是 0，第二次則是 1，依此類推。

這讓你可以根據索引提供特定的設定。

請回想上方使用 `ListView.builder` 建構函式的範例：

```dart
final List<ToDo> items = Repository.fetchTodos();

Widget build(BuildContext context) {
  return ListView.builder(
    itemCount: items.length,
    itemBuilder: (context, idx) {
      var item = items[idx];
      return Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(item.description),
            Text(item.isComplete),
          ],
        ),
      );
    },
  );
}
```

這段範例程式碼使用傳遞給 builder 的索引（index），從項目清單中取得正確的待辦事項（todo），然後將該待辦事項的資料顯示在 builder 回傳的元件（Widget）中。

為了說明這一點，下列範例會將每個清單項目的背景顏色交錯變化。

{% render docs/code-and-image.md,
image:"fwe/layout/alternating_list_items.png"
caption:"此圖顯示了一個`ListView`，其子元件具有交錯的背景顏色。背景顏色是根據該子元件在`ListView`中的索引值以程式方式決定的。"
code:"
```dart
final List<ToDo> items = Repository.fetchTodos();

Widget build(BuildContext context) {
  return ListView.builder(
    itemCount: items.length,
    itemBuilder: (context, idx) {
      var item = items[idx];
      return Container(
        [!color: idx % 2 == 0 ? Colors.lightBlue : Colors.transparent!],
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(item.description),
            Text(item.isComplete),
          ],
        ),
      );
    },
  );
}
```
```markdown
## 其他資源

* 常用版面配置元件 (Layout widgets) 與概念
  * 影片：[OverlayPortal—Flutter Widget of the Week][OverlayPortal—Flutter Widget of the Week]
  * 影片：[Stack—Flutter Widget of the Week][Stack—Flutter Widget of the Week]
  * 教學：[Layouts in Flutter][Layouts in Flutter]
  * 文件：[Stack documentation][Stack documentation]
* 元件 (Widgets) 的尺寸與定位
  * 影片：[Expanded—Flutter Widget of the Week][Expanded—Flutter Widget of the Week]
  * 影片：[Flexible—Flutter Widget of the Week][Flexible—Flutter Widget of the Week]
  * 影片：[Intrinsic widgets—Decoding Flutter][Intrinsic widgets—Decoding Flutter]
* 可捲動元件 (Scrollable widgets)
  * 範例程式碼：[Work with long lists][Work with long lists]
  * 範例程式碼：[Create a horizontal list][Create a horizontal list]
  * 範例程式碼：[Create a grid list][Create a grid list]
  * 影片：[ListView—Flutter Widget of the Week][ListView—Flutter Widget of the Week]
* 自適應應用程式 (Adaptive Apps)
  * 教學：[Adaptive Apps codelab][Adaptive Apps codelab]
  * 影片：[MediaQuery—Flutter Widget of the Week][MediaQuery—Flutter Widget of the Week]
  * 影片：[Building platform adaptive apps][Building platform adaptive apps]
  * 影片：[Builder—Flutter Widget of the Week][Builder—Flutter Widget of the Week]

### API 參考

以下資源說明各個 API。

* [`Builder`][`Builder`]
* [`Row`][`Row`]
* [`Column`][`Column`]
* [`Expanded`][`Expanded`]
* [`Flexible`][`Flexible`]
* [`ListView`][`ListView`]
* [`Stack`][`Stack`]
* [`Positioned`][`Positioned`]
* [`MediaQuery`][`MediaQuery`]
* [`LayoutBuilder`][`LayoutBuilder`]

[Layouts in Flutter]: /ui/layout
[Understanding constraints article]: /ui/layout/constraints
[`RenderBox`]: {{site.api}}/flutter/rendering/RenderBox-class.html
[Expanded—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=_rnZaagadyo
[Flexible—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=CI7x0mAZiY0
[Intrinsic widgets—Decoding Flutter]: {{site.youtube-site}}/watch?v=Si5XJ_IocEs
[Build a Flutter Layout]: /ui/layout/tutorial
[Basic scrolling]: /ui/layout/scrolling#basic-scrolling
[Builder—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=xXNOkIuSYuA
[ListView—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=KJpkjHGiI5A
[Work with long lists]: /cookbook/lists/long-lists
[Create a horizontal list]: /cookbook/lists/horizontal-list
[Create a grid list]: /cookbook/lists/grid-lists
[PageView—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=J1gE9xvph-A
[Stack—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=liEGSeD3Zt8
[Stack documentation]: /ui/layout#stack
[OverlayPortal—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=S0Ylpa44OAQ
[LayoutBuilder—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=IYDVcriKjsw
[MediaQuery—Flutter Widget of the Week]: {{site.youtube-site}}/watch?v=A3WrA4zAaPw
[Adaptive apps codelab]: {{site.codelabs}}/codelabs/flutter-adaptive-app
[Building platform adaptive apps]: {{site.youtube-site}}/watch?v=RCdeSKVt7LI
[Learn more about the Flutter inspector]: /tools/devtools/inspector
[Unbounded height and width—Decoding Flutter]: {{site.youtube-site}}/watch?v=jckqXR5CrPI
[2D Scrolling]: {{site.youtube-site}}/watch?v=ppEdTo-VGcg
[`Builder`]: {{site.api}}/flutter/widgets/Builder-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
[`Flexible`]: {{site.api}}/flutter/widgets/Flexible-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`Stack`]: {{site.api}}/flutter/widgets/Stack-class.html
[`Positioned`]: {{site.api}}/flutter/widgets/Positioned-class.html
[`MediaQuery`]: {{site.api}}/flutter/widgets/MediaQuery-class.html
[`Transform`]:{{site.api}}/flutter/widgets/Transform-class.html
[`Opacity`]:{{site.api}}/flutter/widgets/Opacity-class.html
[`Center`]:{{site.api}}/flutter/widgets/Center-class.html
[`ListView`]:{{site.api}}/flutter/widgets/Listview-class.html
[`Image`]:{{site.api}}/flutter/widgets/Image-class.html
[`Text`]:{{site.api}}/flutter/widgets/Text-class.html
[`MainAxisAlignment`]: {{site.api}}/flutter/rendering/MainAxisAlignment.html
[`CrossAxisAlignment`]: {{site.api}}/flutter/rendering/CrossAxisAlignment.html
[`double.infinity`]:{{site.api}}/flutter/dart-core/double/infinity-constant.html
[`ListView.builder`]: {{site.api}}/flutter/widgets/ListView/ListView.builder.html
[`GridView.builder`]: {{site.api}}/flutter/widgets/GridView/GridView.builder.html
[`Builder`]: {{site.api}}/flutter/widgets/Builder-class.html
[`ScrollView`]: {{site.api}}/flutter/widgets/Scrollview-class.html
[`LayoutBuilder`]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
[`BoxConstraints`]:{{site.api}}/flutter/rendering/BoxConstraints-class.html 
[`LayoutBuilder`]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html
[`Container`]:{{site.api}}/flutter/widgets/Container-class.html
[`Column`]:{{site.api}}/flutter/widgets/Column-class.html
[`Row`]:{{site.api}}/flutter/widgets/Row-class.html
[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html

## 意見回饋

由於本網站區塊仍在持續演進中，  
我們[歡迎您的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="layout"
```
