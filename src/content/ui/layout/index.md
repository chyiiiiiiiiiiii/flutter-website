---
title: Flutter 中的版面配置
shortTitle: 版面配置
description: >-
  了解 Flutter 的版面配置機制如何運作，以及如何建立應用程式的版面配置。
---

## 概觀

:::secondary 有什麼重點？
* Flutter 中的版面配置是由元件（Widgets）構成的。
* 元件是用來建立 UI 的類別。
* 元件也用來建立 UI 元素。
* 組合簡單的元件可以構建複雜的元件。
:::

Flutter 版面配置機制的核心是元件（Widgets）。
在 Flutter 中，幾乎所有東西都是元件——
甚至連版面配置模型本身也是元件。你在 Flutter 應用程式中看到的圖片、圖示和文字，都是元件。
但你看不到的東西也是元件，
例如排列、限制和對齊可見元件的 row、column 和 grid。
你可以透過組合元件來建立更複雜的元件，進而完成版面配置。

## 概念範例

在以下範例中，第一張螢幕截圖顯示了三個帶有標籤的圖示，第二張螢幕截圖則包含了 row 和 column 的視覺化版面配置。
在第二張截圖中，`debugPaintSizeEnabled` 被設為 `true`，
因此你可以看到版面配置的視覺效果。

<div class="side-by-side">
  <div class="centered-rows">
    <img src='/assets/images/docs/ui/layout/lakes-icons.png' alt="Sample layout">
  </div>
  <div class="centered-rows">
    <img src='/assets/images/docs/ui/layout/lakes-icons-visual.png' alt="Sample layout with visual debugging">
  </div>
</div>

以下是前述範例的元件樹（widget tree）示意圖：

<img src='/assets/images/docs/ui/layout/sample-flutter-layout.png' class="text-center diagram-wrap" alt="Node tree">

大部分內容應該如你所預期，但你可能會對那些容器（以粉紅色顯示）感到好奇。[`Container`][`Container`] 是一個元件類別，
它允許你自訂其子元件。當你想要為子元件增加內距（padding）、外距（margin）、邊框或背景顏色等功能時，可以使用 `Container`。

每個 [`Text`][`Text`] 元件都被放在 `Container` 中以增加外距。
整個 [`Row`][`Row`] 也被放在 `Container` 中，以在 row 周圍增加內距。

其餘的 UI 則由屬性控制。
你可以透過 [`Icon`][`Icon`] 的 `color` 屬性來設定顏色。
使用 `Text.style` 屬性可以設定字型、顏色、字重等。
column 和 row 也有屬性，可讓你指定其子元件的垂直或水平對齊方式，以及子元件應佔據多少空間。

:::note
本教學中的大多數螢幕截圖都將
`debugPaintSizeEnabled` 設為 `true`，以便你可以看到
版面配置的視覺效果。更多資訊請參閱
[視覺化除錯版面配置問題][Debugging layout issues visually]。
:::

[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[Debugging layout issues visually]: /tools/devtools/inspector#debugging-layout-issues-visually
[`Icon`]: {{site.api}}/flutter/material/Icons-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html

## 版面配置一個元件

在 Flutter 中，如何配置單一元件的版面？本節將說明如何建立並顯示一個簡單的元件，
同時也會展示一個簡單 Hello World 應用程式的完整程式碼。

在 Flutter 中，只需幾個步驟就能將文字、圖示或圖片顯示在畫面上。

### 1. 選擇一個版面配置元件

你可以根據希望對可見元件如何對齊或限制，從多種[版面配置元件][layout widgets]中選擇，
因為這些特性通常會傳遞給被包含的元件。

例如，你可以使用
[`Center`][`Center`] 版面配置元件，將可見元件水平和垂直置中顯示：

```dart
Center(
  // Content to be centered here.
)
```

[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[layout widgets]: /ui/widgets/layout

### 2. 建立可見元件 (Widget)

為您的應用程式選擇一個[可見元件][visible widget]，用來承載可見元素，例如[文字][text]、[圖片][images]或[圖示][icons]。

例如，您可以使用 [`Text`][`Text`] 元件來顯示一些文字：

```dart
Text('Hello World')
```

[icons]: {{site.api}}/flutter/material/Icons-class.html
[images]: {{site.api}}/flutter/widgets/Image-class.html
[text]: {{site.api}}/flutter/widgets/Text-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[visible widget]: /ui/widgets

### 3. 將可見元件 (Widget) 加入版面配置元件 (Layout Widget)

<?code-excerpt path-base="layout/base"?>

所有版面配置元件 (Layout Widget) 都具備下列其中一種屬性：

* 如果只接受單一子元件，則具有 `child` 屬性——例如，
  `Center` 或 `Container`
* 如果接受多個元件的清單，則具有 `children` 屬性——例如，
  `Row`、`Column`、`ListView` 或 `Stack`。

將 `Text` 元件加入 `Center` 元件中：

<?code-excerpt "lib/main.dart (centered-text)" replace="/body: //g"?>
```dart
const Center(
  child: Text('Hello World'),
),
```

### 4. 將版面配置元件 (layout widget) 加入頁面

一個 Flutter 應用程式本身就是一個元件 (Widget)，而大多數元件都有一個 [`build()`][`build()`]
方法。在應用程式的 `build()` 方法中實例化並回傳一個元件，即可顯示該元件。

<a id="non-material-apps" aria-hidden="true"></a>
<a id="material-apps" aria-hidden="true"></a>
<a id="cupertino-apps" aria-hidden="true"></a>

{% tabs "app-type-tabs", true %}

{% tab "Standard apps" %}

對於一般應用程式，你可以將 `Container` 元件加入到應用程式的 `build()` 方法中：

<?code-excerpt path-base="layout/non_material"?>
<?code-excerpt "lib/main.dart (my-app)"?>
```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(color: Colors.white),
      child: const Center(
        child: Text(
          'Hello World',
          textDirection: TextDirection.ltr,
          style: TextStyle(fontSize: 32, color: Colors.black87),
        ),
      ),
    );
  }
}
```

預設情況下，一般應用程式（general app）不包含`AppBar`、標題或背景顏色。如果你希望在一般應用程式中加入這些功能，需要自行實作。本範例將背景顏色設為白色，文字顏色設為深灰色，以模仿 Material app 的外觀。

{% endtab %}

{% tab "Material apps" %}

對於`Material`應用程式，你可以使用[`Scaffold`][`Scaffold`]元件 (Widget)；它會提供預設的橫幅、背景顏色，並且有 API 可用於新增抽屜（drawer）、訊息條（snack bar）及底部彈窗（bottom sheet）。然後，你可以直接將`Center`元件 (Widget) 加到`body`屬性作為首頁內容。

<?code-excerpt path-base="layout/base"?>
<?code-excerpt "lib/main.dart (my-app)"?>
```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const String appTitle = 'Flutter layout demo';
    return MaterialApp(
      title: appTitle,
      home: Scaffold(
        appBar: AppBar(title: const Text(appTitle)),
        body: const Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```

:::note
[Material library][Material library] 實作了遵循 [Material Design][Material
Design] 原則的元件 (Widgets)。在設計 UI 時，你可以只使用標準 [widgets library][widgets library] 的元件，或是使用 Material library 的元件。你也可以混合使用這兩個函式庫的元件，自訂現有元件，或建立你自己的自訂元件集合。
:::

{% endtab %}

{% tab "Cupertino apps" %}

若要建立 `Cupertino` 應用程式，
請使用 `CupertinoApp` 和 [`CupertinoPageScaffold`][`CupertinoPageScaffold`] 元件 (Widgets)。

與 `Material` 不同，這裡不會自動提供預設的橫幅或背景顏色。
你需要自行設定這些屬性。

* 若要設定預設顏色，請將已設定的 [`CupertinoThemeData`][`CupertinoThemeData`]
  傳入應用程式的 `theme` 屬性。
* 若要在應用程式頂部加入 iOS 風格的導覽列，請在 scaffold 的 `navigationBar`
  屬性中加入 [`CupertinoNavigationBar`][`CupertinoNavigationBar`] 元件。
  你可以使用 [`CupertinoColors`][`CupertinoColors`] 提供的顏色來
  配置你的元件，使其符合 iOS 設計風格。

* 若要配置應用程式主體內容，請將 scaffold 的 `child` 屬性
  設為你想要的元件，例如 `Center` 或 `Column`。

想了解還有哪些 UI 元件可以加入，請參考 [Cupertino library][Cupertino library]。

<?code-excerpt "lib/cupertino.dart (my-app)"?>
```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'Flutter layout demo',
      theme: CupertinoThemeData(
        brightness: Brightness.light,
        primaryColor: CupertinoColors.systemBlue,
      ),
      home: CupertinoPageScaffold(
        navigationBar: CupertinoNavigationBar(
          backgroundColor: CupertinoColors.systemGrey,
          middle: Text('Flutter layout demo'),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [Text('Hello World')],
          ),
        ),
      ),
    );
  }
}
```

:::note
[Cupertino 函式庫][Cupertino library] 實作了遵循 [Apple iOS 人機介面指引][Apple's Human Interface Guidelines for iOS] 的元件 (Widgets)。
在設計您的 UI 時，您可以使用標準 [widgets 函式庫][widgets library] 或 Cupertino 函式庫中的元件。
您可以混合使用這兩個函式庫的元件，也可以自訂現有元件，或建立您自己的自訂元件集。
:::

{% endtab %}

{% endtabs %}

[`CupertinoColors`]: {{site.api}}/flutter/cupertino/CupertinoColors-class.html
[`CupertinoPageScaffold`]: {{site.api}}/flutter/cupertino/CupertinoPageScaffold-class.html
[`CupertinoThemeData`]: {{site.api}}/flutter/cupertino/CupertinoThemeData-class.html
[`CupertinoNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoNavigationBar-class.html
[Cupertino library]: {{site.api}}/flutter/cupertino/cupertino-library.html
[Apple's Human Interface Guidelines for iOS]: {{site.apple-dev}}/design/human-interface-guidelines/designing-for-ios
[`build()`]: {{site.api}}/flutter/widgets/StatelessWidget/build.html
[Material library]: {{site.api}}/flutter/material/material-library.html
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[widgets library]: {{site.api}}/flutter/widgets/widgets-library.html

### 5. 執行您的應用程式

<div class="side-by-side">
<div>

在您加入元件後，請執行您的應用程式。當您執行
應用程式時，應該會看到 _Hello World_。

應用程式原始碼：

* [Material 應用程式]({{site.repo.this}}/tree/main/examples/layout/base)
* [非 Material 應用程式]({{site.repo.this}}/tree/main/examples/layout/non_material)

</div>
{% render docs/app-figure.md, image:"ui/layout/hello-world.png", alt:"Screenshot of app displaying Hello World", img-style:"max-height: 400px;"  %}
</div>
<hr>

## 垂直與水平排列多個元件

<?code-excerpt path-base=""?>

最常見的版面配置模式之一，就是將元件垂直或水平排列。您可以使用
`Row` 元件來水平排列元件，
使用 `Column` 元件來垂直排列元件。

:::secondary 有什麼重點？
* `Row` 和 `Column` 是最常用的兩種版面配置模式。
* `Row` 和 `Column` 都接受一個子元件清單。
* 子元件本身也可以是 `Row`、`Column`，
    或其他複雜元件。
* 您可以指定 `Row` 或 `Column` 如何在垂直與水平方向上對齊其子元件。
* 您可以拉伸或限制特定的子元件。
* 您可以指定子元件如何使用 `Row` 或
    `Column` 的可用空間。
:::

要在 Flutter 中建立 row 或 column，您只需將子元件清單加入 [`Row`][`Row`] 或 [`Column`][`Column`] 元件。每個子元件本身也可以是 row 或 column，如此類推。
以下範例展示了如何在 row 或 column 中巢狀放入其他 row 或 column。

這個版面配置以 `Row` 為主體。該 row 包含兩個子元件：
左側是一個 column，右側是一張圖片：

<img src='/assets/images/docs/ui/layout/pavlova-diagram.png' class="diagram-wrap" alt="Screenshot with callouts showing the row containing two children">

左側 column 的元件樹中巢狀了多個 row 與 column。

<img src='/assets/images/docs/ui/layout/pavlova-left-column-diagram.png' class="diagram-wrap" alt="Diagram showing a left column broken down to its sub-rows and sub-columns">

您將在 [巢狀 row 與 column](#巢狀排列-row-與-column) 中實作部分 Pavlova 的版面配置程式碼。

:::note
`Row` 和 `Column` 是用於水平與垂直版面配置的基本原始元件——這些低階元件可提供最大的自訂彈性。Flutter 也提供了專門且更高階的元件，可能更符合您的需求。例如，
您可以用 [`ListTile`][`ListTile`] 取代 `Row`，
這是一個易於使用的元件，支援 leading 與 trailing icon，以及最多三行文字。若要取代 Column，您可以考慮 [`ListView`][`ListView`]，這是一種類似 column 的版面配置，當內容過長時會自動捲動。
如需更多資訊，請參閱 [常用版面配置元件][Common layout widgets]。
:::

[Common layout widgets]: #常用版面配置元件-widgets
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`ListTile`]: {{site.api}}/flutter/material/ListTile-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html

### 對齊元件

您可以使用 `mainAxisAlignment` 和 `crossAxisAlignment` 屬性來控制 row 或 column 如何對齊其子元件。
對於 row，主軸 (main axis) 為水平方向，交叉軸 (cross axis) 為垂直方向。對於 column，主軸為垂直方向，交叉軸為水平方向。

<div class="side-by-side">
  <div class="centered-rows">
    <img src='/assets/images/docs/ui/layout/row-diagram.png' class="diagram-wrap" alt="Diagram showing the main axis and cross axis for a row">
  </div>
  <div class="centered-rows">
    <img src='/assets/images/docs/ui/layout/column-diagram.png' class="diagram-wrap" alt="Diagram showing the main axis and cross axis for a column">
  </div>
</div>

[`MainAxisAlignment`][`MainAxisAlignment`] 與 [`CrossAxisAlignment`][`CrossAxisAlignment`]
列舉型別 (enum) 提供多種常數，可用於控制對齊方式。

:::note
當您將圖片加入專案時，
需要更新 `pubspec.yaml` 檔案才能存取這些圖片——本範例使用 `Image.asset` 來顯示圖片。
如需更多資訊，請參閱本範例的 [`pubspec.yaml` 檔案][`pubspec.yaml` file] 或 [加入資產與圖片][Adding assets and images]。
如果您使用 `Image.network` 參考線上圖片，則不需要這麼做。
:::

在下列範例中，三張圖片各寬 100 像素。
渲染區域（本例為整個螢幕）寬度超過 300 像素，因此將主軸對齊方式設為 `spaceEvenly` 時，會將多餘的水平空間平均分配在每張圖片之間、前方與後方。

<div class="code-and-content">
<div>

<?code-excerpt "layout/row_column/lib/main.dart (row)" replace="/Row/[!$&!]/g"?>
```dart
[!Row!](
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Image.asset('images/pic1.jpg'),
    Image.asset('images/pic2.jpg'),
    Image.asset('images/pic3.jpg'),
  ],
);
```

</div>
<div>
  <img src='/assets/images/docs/ui/layout/row-spaceevenly-visual.png' class="small-diagram-wrap" alt="Row with 3 evenly spaced images">

  **App 原始碼：** [row_column]({{site.repo.this}}/tree/main/examples/layout/row_column)
</div>
</div>

Column（欄）與 Row（列）的運作方式相同。以下範例展示了一個包含 3 張圖片的 Column，每張圖片高度為 100 像素。渲染盒子的高度（在此例中為整個螢幕）超過 300 像素，因此將主軸對齊（main axis alignment）設為 `spaceEvenly` 時，會將多餘的垂直空間平均分配在每張圖片之間、上方及下方。

<div class="code-and-content">
<div>

  <?code-excerpt "layout/row_column/lib/main.dart (column)" replace="/Column/[!$&!]/g"?>
  ```dart
  [!Column!](
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      Image.asset('images/pic1.jpg'),
      Image.asset('images/pic2.jpg'),
      Image.asset('images/pic3.jpg'),
    ],
  );
  ```

</div>
<div class="text-center">
  <img src='/assets/images/docs/ui/layout/column-visual.png' height="250px" class="small-diagram-wrap" alt="Column showing 3 images spaced evenly">

  **應用程式原始碼:** [row_column]({{site.repo.this}}/tree/main/examples/layout/row_column)
</div>
</div>

[`CrossAxisAlignment`]: {{site.api}}/flutter/rendering/CrossAxisAlignment.html
[`MainAxisAlignment`]: {{site.api}}/flutter/rendering/MainAxisAlignment.html
[`pubspec.yaml` file]: {{site.repo.this}}/tree/main/examples/layout/row_column/pubspec.yaml

### 元件 (Widgets) 的尺寸調整

當版面配置過大，無法完整顯示於裝置上時，受影響的邊緣會出現黃色與黑色相間的條紋圖案。以下是一個[範例][sizing]，顯示一個過寬的 row：

<img src='/assets/images/docs/ui/layout/layout-too-large.png' class="text-center" style="max-height: 15rem;" alt="Overly-wide row">

可以使用 [`Expanded`][`Expanded`] 元件 (Widget) 來調整元件在 row 或 column 中的尺寸。若要修正前述圖片 row 超出其 render box 的問題，請將每個圖片包裹在 `Expanded` 元件 (Widget) 中。

<div class="code-and-content">
<div>

  <?code-excerpt "layout/sizing/lib/main.dart (expanded-images)" replace="/Expanded/[!$&!]/g"?>
  ```dart
  Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      [!Expanded!](child: Image.asset('images/pic1.jpg')),
      [!Expanded!](child: Image.asset('images/pic2.jpg')),
      [!Expanded!](child: Image.asset('images/pic3.jpg')),
    ],
  );
  ```

</div>
<div>
  <img src='/assets/images/docs/ui/layout/row-expanded-2-visual.png' class="small-diagram-wrap" alt="三張圖片排列成一行，每張圖片都太寬，但各自僅佔 1/3 空間">

  **應用程式原始碼：** [sizing]({{site.repo.this}}/tree/main/examples/layout/sizing)
</div>
</div>

有時你可能希望某個元件（Widget）佔據比其他同層元件多兩倍的空間。這時可以使用 `Expanded` 元件的 `flex` 屬性，這是一個整數，用來決定該元件的彈性係數（flex factor）。預設的彈性係數為 1。以下程式碼將中間圖片的彈性係數設為 2：

<div class="code-and-content">
<div>

  <?code-excerpt "layout/sizing/lib/main.dart (expanded-images-with-flex)" replace="/flex.*/[!$&!]/g"?>
  ```dart
  Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      Expanded(child: Image.asset('images/pic1.jpg')),
      Expanded([!flex: 2, child: Image.asset('images/pic2.jpg')),!]
      Expanded(child: Image.asset('images/pic3.jpg')),
    ],
  );
  ```

</div>
<div>
  <img src='/assets/images/docs/ui/layout/row-expanded-visual.png' class="small-diagram-wrap" alt="Row of 3 images with the middle image twice as wide as the others">

  **應用程式來源：** [sizing]({{site.repo.this}}/tree/main/examples/layout/sizing)
</div>
</div>

[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
[sizing]: {{site.repo.this}}/tree/main/examples/layout/sizing

### 元件 (Widgets) 的排列

預設情況下，row（橫向排列）或 column（縱向排列）會沿著其主軸方向盡可能佔滿空間，但如果你希望將子元件緊密排列在一起，可以將其 `mainAxisSize` 設為 `MainAxisSize.min`。以下範例利用此屬性，將星形圖示緊密排列。

<div class="code-and-content">
<div>

  <?code-excerpt "layout/pavlova/lib/main.dart (stars)" replace="/mainAxisSize.*/[!$&!]/g; /\w+ \w+ = //g; /;//g"?>
  ```dart
  Row(
    [!mainAxisSize: MainAxisSize.min,!]
    children: [
      Icon(Icons.star, color: Colors.green[500]),
      Icon(Icons.star, color: Colors.green[500]),
      Icon(Icons.star, color: Colors.green[500]),
      const Icon(Icons.star, color: Colors.black),
      const Icon(Icons.star, color: Colors.black),
    ],
  )
  ```

</div>
<div>
  <img src='/assets/images/docs/ui/layout/packed.png' class="small-diagram-wrap" alt="Row of 5 stars, packed together in the middle of the row">

  **應用程式原始碼：** [pavlova]({{site.repo.this}}/tree/main/examples/layout/pavlova)
</div>
</div>

### 巢狀排列 Row 與 Column

這個版面配置框架允許你在 Row 與 Column 之間，依照需求任意深度地巢狀嵌套。
讓我們來看看下圖中紅框區塊的程式碼：

<img src='/assets/images/docs/ui/layout/pavlova-large-annotated.png' class="border text-center" alt="Screenshot of the pavlova app, with the ratings and icon rows outlined in red">

紅框區塊是由兩個 Row 實作而成。評分 Row 包含五顆星星和評論數量。圖示 Row 則包含三個由圖示與文字組成的 Column。

評分 Row 的元件樹如下：

<img src='/assets/images/docs/ui/layout/widget-tree-pavlova-rating-row.png' class="text-center diagram-wrap" alt="Ratings row widget tree">

`ratings` 變數會建立一個 Row，其中包含一個較小的 5 星圖示 Row 以及文字：

<?code-excerpt "layout/pavlova/lib/main.dart (ratings)" replace="/ratings/[!$&!]/g"?>
```dart
final stars = Row(
  mainAxisSize: MainAxisSize.min,
  children: [
    Icon(Icons.star, color: Colors.green[500]),
    Icon(Icons.star, color: Colors.green[500]),
    Icon(Icons.star, color: Colors.green[500]),
    const Icon(Icons.star, color: Colors.black),
    const Icon(Icons.star, color: Colors.black),
  ],
);

final [!ratings!] = Container(
  padding: const EdgeInsets.all(20),
  child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      stars,
      const Text(
        '170 Reviews',
        style: TextStyle(
          color: Colors.black,
          fontWeight: FontWeight.w800,
          fontFamily: 'Roboto',
          letterSpacing: 0.5,
          fontSize: 20,
        ),
      ),
    ],
  ),
);
```

:::tip
為了減少因為過度巢狀的版面配置程式碼所造成的視覺混亂，建議將 UI 的各個部分實作在變數和函式中。
:::

在評分列下方的圖示列（icons row）包含 3 個欄位；每個欄位都包含一個圖示和兩行文字，如下圖的元件樹（widget tree）所示：

<img src='/assets/images/docs/ui/layout/widget-tree-pavlova-icon-row.png' class="text-center diagram-wrap" alt="Icon widget tree">

`iconList` 變數定義了這個圖示列：

<?code-excerpt "layout/pavlova/lib/main.dart (icon-list)" replace="/iconList/[!$&!]/g"?>
```dart
const descTextStyle = TextStyle(
  color: Colors.black,
  fontWeight: FontWeight.w800,
  fontFamily: 'Roboto',
  letterSpacing: 0.5,
  fontSize: 18,
  height: 2,
);

// DefaultTextStyle.merge() allows you to create a default text
// style that is inherited by its child and all subsequent children.
final [!iconList!] = DefaultTextStyle.merge(
  style: descTextStyle,
  child: Container(
    padding: const EdgeInsets.all(20),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Column(
          children: [
            Icon(Icons.kitchen, color: Colors.green[500]),
            const Text('PREP:'),
            const Text('25 min'),
          ],
        ),
        Column(
          children: [
            Icon(Icons.timer, color: Colors.green[500]),
            const Text('COOK:'),
            const Text('1 hr'),
          ],
        ),
        Column(
          children: [
            Icon(Icons.restaurant, color: Colors.green[500]),
            const Text('FEEDS:'),
            const Text('4-6'),
          ],
        ),
      ],
    ),
  ),
);
```

`leftColumn` 變數包含了評分與圖示的列，以及描述 Pavlova 的標題與文字：

<?code-excerpt "layout/pavlova/lib/main.dart (left-column)" replace="/leftColumn/[!$&!]/g"?>
```dart
final [!leftColumn!] = Container(
  padding: const EdgeInsets.fromLTRB(20, 30, 20, 20),
  child: Column(children: [titleText, subTitle, ratings, iconList]),
);
```

左側欄位被放置在`SizedBox`中，以限制其寬度。
最後，整個 UI 是將整行（包含左側欄位和圖片）放在`Card`中建構而成。

[Pavlova 圖片][Pavlova image] 來自 [Pixabay][Pixabay]。
你可以使用`Image.network()`從網路嵌入圖片，
但在此範例中，圖片被儲存於專案的 images 目錄下，
並加入到 [pubspec 檔案][pubspec file]，然後使用`Images.asset()`來存取。
如需更多資訊，請參閱 [新增資產與圖片][Adding assets and images]。

<?code-excerpt "layout/pavlova/lib/main.dart (body)"?>
```dart
body: Center(
  child: Container(
    margin: const EdgeInsets.fromLTRB(0, 40, 0, 30),
    height: 600,
    child: Card(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(width: 440, child: leftColumn),
          mainImage,
        ],
      ),
    ),
  ),
),
```

:::tip
Pavlova 範例在橫向、螢幕較寬的裝置（如平板電腦）上效果最佳。如果你在 iOS 模擬器中執行此範例，可以透過 **Hardware > Device** 選單選擇不同的裝置。建議本範例使用 iPad Pro。你可以使用 **Hardware > Rotate** 將其切換為橫向模式。也可以透過 **Window > Scale** 調整模擬器視窗的大小（不會改變邏輯像素數）。
:::

**應用程式原始碼：** [pavlova]({{site.repo.this}}/tree/main/examples/layout/pavlova)

<hr>

[Pavlova image]: https://pixabay.com/en/photos/pavlova
[Pixabay]: https://pixabay.com/en/photos/pavlova
[pubspec file]: {{site.repo.this}}/tree/main/examples/layout/pavlova/pubspec.yaml

## 常用版面配置元件 (Widgets)

Flutter 擁有豐富的版面配置元件 (Widgets) 函式庫。以下列出一些最常用的元件，目的是讓你能夠快速上手，而不是給你一份完整清單。若需查詢其他可用元件，請參考 [Widget catalog][Widget catalog]，或在 [API 文件][API reference docs] 的搜尋框中查找。此外，API 文件中的元件頁面通常也會建議其他可能更適合你需求的相似元件。

下列元件分為兩大類：來自 [widgets library][widgets library] 的標準元件，以及來自 [Material library][Material library] 的專用元件。任何應用程式都可以使用 widgets library，但只有 Material 應用程式才能使用 Material Components library。

<a id="standard-widgets" aria-hidden="true"></a>
<a id="materials-widgets" aria-hidden="true"></a>

{% tabs "widget-types-tabs", true %}

{% tab "Standard widgets" %}

[`Container`](#container)
: 為元件 (Widget) 增加內距（padding）、外距（margin）、邊框、背景顏色或其他裝飾效果。

[`GridView`](#gridview)
: 以可捲動的網格方式排列元件。

[`ListView`](#listview)
: 以可捲動的清單方式排列元件。

[`Stack`](#stack)
: 將一個元件疊加在另一個元件之上。

{% endtab %}

{% tab "Material widgets" %}

[`Scaffold`][`Scaffold`]
: 提供結構化的版面配置框架，包含常見 Material Design 應用元素的插槽。

[`AppBar`][`AppBar`]
: 建立一個通常顯示在螢幕頂端的橫條。

[`Card`](#card)
: 將相關資訊組織在具有圓角和陰影效果的方框中。

[`ListTile`](#listtile)
: 將最多三行文字，以及可選的前置與後置圖示，組成一個橫列。

{% endtab %}

{% tab "Cupertino widgets" %}

[`CupertinoPageScaffold`][`CupertinoPageScaffold`]
: 提供 iOS 風格頁面的基本版面結構。

[`CupertinoNavigationBar`][`CupertinoNavigationBar`]
: 在螢幕頂端建立 iOS 風格的導覽列。

[`CupertinoSegmentedControl`][`CupertinoSegmentedControl`]
: 建立分段控制器（segmented control）以供選擇。

[`CupertinoTabBar`][`CupertinoTabBar`] 和 [`CupertinoTabScaffold`][`CupertinoTabScaffold`]
: 建立具有 iOS 特色的底部分頁列。

{% endtab %}

{% endtabs %}

[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`AppBar`]: {{site.api}}/flutter/material/AppBar-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`CupertinoPageScaffold`]: {{site.api}}/flutter/cupertino/CupertinoPageScaffold-class.html
[`CupertinoNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoNavigationBar-class.html
[`CupertinoSegmentedControl`]: {{site.api}}/flutter/cupertino/CupertinoSegmentedControl-class.html
[`CupertinoTabBar`]: {{site.api}}/flutter/cupertino/CupertinoTabBar-class.html
[`CupertinoTabScaffold`]: {{site.api}}/flutter/cupertino/CupertinoTabScaffold-class.html
[`GridView`]: {{site.api}}/flutter/widgets/GridView-class.html
[`ListTile`]: {{site.api}}/flutter/material/ListTile-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[Material library]: {{site.api}}/flutter/material/material-library.html
[widgets library]: {{site.api}}/flutter/widgets/widgets-library.html

### Container

許多版面配置會大量使用 [`Container`][`Container`] 來透過內距分隔元件，或加入邊框與外距。你可以將整個版面包在 `Container` 中，並更改其背景顏色或圖片，以改變裝置的背景。

<div class="side-by-side">
<div>

[`Container`]: {{site.api}}/flutter/widgets/Container-class.html

#### 摘要（Container）

* 新增內距、外距、邊框
* 更改背景顏色或圖片
* 僅包含一個子元件，但該子元件可以是 `Row`、`Column`，甚至是元件樹的根節點

</div>
<div class="text-center">
  <img src='/assets/images/docs/ui/layout/margin-padding-border.png' class="diagram-wrap" alt="Diagram showing: margin, border, padding, and content">
</div>
</div>

#### 範例（Container）

此版面配置由一個包含兩列的 column 組成，每列各有兩張圖片。利用 [`Container`][`Container`] 將 column 的背景顏色設為較淺的灰色。

<div class="code-and-content">
<div>

  <?code-excerpt "layout/container/lib/main.dart (column)" replace="/\bContainer/[!$&!]/g;"?>
  ```dart
  Widget _buildImageColumn() {
    return [!Container!](
      decoration: const BoxDecoration(color: Colors.black26),
      child: Column(children: [_buildImageRow(1), _buildImageRow(3)]),
    );
  }
  ```

</div>
<div class="text-center">
  <img src='/assets/images/docs/ui/layout/container.png' class="mb-4" width="230px" alt="Screenshot showing 2 rows, each containing 2 images">
</div>
</div>

`Container` 也可用來為每張圖片新增圓角邊框與邊距：

<?code-excerpt "layout/container/lib/main.dart (row)" replace="/\bContainer/[!$&!]/g;"?>
```dart
Widget _buildDecoratedImage(int imageIndex) => Expanded(
  child: [!Container!](
    decoration: BoxDecoration(
      border: Border.all(width: 10, color: Colors.black38),
      borderRadius: const BorderRadius.all(Radius.circular(8)),
    ),
    margin: const EdgeInsets.all(4),
    child: Image.asset('images/pic$imageIndex.jpg'),
  ),
);

Widget _buildImageRow(int imageIndex) => Row(
  children: [
    _buildDecoratedImage(imageIndex),
    _buildDecoratedImage(imageIndex + 1),
  ],
);
```

你可以在 [tutorial][tutorial] 中找到更多 `Container` 範例。

**應用程式原始碼：** [container]({{site.repo.this}}/tree/main/examples/layout/container)

<hr>

[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[tutorial]: /ui/layout/tutorial

### GridView

使用 [`GridView`][`GridView`] 來將元件 (Widgets) 以二維清單的方式排列。`GridView` 提供了兩種預先製作的清單，或者你也可以自訂自己的網格 (grid)。當 `GridView` 偵測到其內容過長無法完全顯示於 render box 時，會自動啟用捲動功能。

[`GridView`]: {{site.api}}/flutter/widgets/GridView-class.html

#### 摘要（GridView）

* 以網格方式排列元件 (Widgets)
* 偵測當欄內容超出 render box 時，自動提供捲動
* 可自訂網格，或使用內建網格：
  * `GridView.count` 允許你指定欄數
  * `GridView.extent` 允許你指定單一格子的最大像素寬度
{% comment %}
* 使用 `MediaQuery.of(context).orientation` 可建立根據裝置橫向或直向模式自動變換佈局的網格
{% endcomment %}

:::note
當你要顯示一個二維清單，且需要明確知道每個儲存格 (cell) 所在的列與欄（例如，「avocado」這一列在「calorie」這一欄的資料），請使用 [`Table`][`Table`] 或 [`DataTable`][`DataTable`]。
:::

[`DataTable`]: {{site.api}}/flutter/material/DataTable-class.html
[`Table`]: {{site.api}}/flutter/widgets/Table-class.html

#### 範例（GridView）

<div class="side-by-side">
<div>
  <img src='/assets/images/docs/ui/layout/gridview-extent.png' class="text-center" alt="A 3-column grid of photos" height="440px">

  使用 `GridView.extent` 建立最大寬度為 150 像素的網格。

  **應用程式原始碼：** [grid_and_list]({{site.repo.this}}/tree/main/examples/layout/grid_and_list)
</div>
<div>
  <img src='/assets/images/docs/ui/layout/gridview-count-flutter-gallery.png' class="text-center" alt="A 2 column grid with footers" height="440px">

  使用 `GridView.count` 建立直向模式下為 2 欄、橫向模式下為 3 欄的網格。
  標題是透過為每個 [`GridTile`][`GridTile`] 設定 `footer` 屬性來建立。

  **Dart 程式碼：**
  [`grid_list_demo.dart`]({{site.repo.this}}/tree/main/examples/layout/gallery/lib/grid_list_demo.dart)
</div>
</div>

<?code-excerpt "layout/grid_and_list/lib/main.dart (grid)" replace="/\GridView/[!$&!]/g;"?>
```dart
Widget _buildGrid() => [!GridView!].extent(
  maxCrossAxisExtent: 150,
  padding: const EdgeInsets.all(4),
  mainAxisSpacing: 4,
  crossAxisSpacing: 4,
  children: _buildGridTileList(30),
);

// The images are saved with names pic0.jpg, pic1.jpg...pic29.jpg.
// The List.generate() constructor allows an easy way to create
// a list when objects have a predictable naming pattern.
List<Widget> _buildGridTileList(int count) =>
    List.generate(count, (i) => Image.asset('images/pic$i.jpg'));
```

<hr>

[`GridTile`]: {{site.api}}/flutter/material/GridTile-class.html

### ListView

[`ListView`][`ListView`] 是一個類似欄的元件 (Widget)，當內容超出其渲染框時，會自動提供捲動功能。

[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html

#### 摘要（ListView）

* 一個專門用於組織方塊清單的 [`Column`][`Column`]
* 可以橫向或縱向排列
* 能偵測內容無法完全顯示時自動提供捲動
* 可設定選項比 `Column` 少，但更易於使用且支援捲動

[`Column`]: {{site.api}}/flutter/widgets/Column-class.html

#### 範例（ListView）

<div class="side-by-side">
<div>
  <img src='/assets/images/docs/ui/layout/listview.png' height="400px" class="simple-border text-center" alt="ListView containing movie theaters and restaurants">

  使用 `ListView` 來顯示一個包含多家商家的清單，並以 `ListTile` 元件呈現。`Divider` 用於將電影院與餐廳分隔開。

  **應用程式原始碼：** [grid_and_list]({{site.repo.this}}/tree/main/examples/layout/grid_and_list)
</div>
<div>
  <img src='/assets/images/docs/ui/layout/listview-color-gallery.png' height="400px" class="simple-border text-center" alt="ListView containing shades of blue">

  使用 `ListView` 來顯示 [`Colors`][`Colors`]，這些顏色來自 [Material 2 Design palette][Material 2 Design palette]，屬於某一特定色系。

  **Dart 程式碼：**
  [`colors_demo.dart`]({{site.repo.this}}/tree/main/examples/layout/gallery/lib/colors_demo.dart)
</div>
</div>

<?code-excerpt "layout/grid_and_list/lib/main.dart (list)" replace="/\ListView/[!$&!]/g;"?>
```dart
Widget _buildList() {
  return [!ListView!](
    children: [
      _tile('CineArts at the Empire', '85 W Portal Ave', Icons.theaters),
      _tile('The Castro Theater', '429 Castro St', Icons.theaters),
      _tile('Alamo Drafthouse Cinema', '2550 Mission St', Icons.theaters),
      _tile('Roxie Theater', '3117 16th St', Icons.theaters),
      _tile(
        'United Artists Stonestown Twin',
        '501 Buckingham Way',
        Icons.theaters,
      ),
      _tile('AMC Metreon 16', '135 4th St #3000', Icons.theaters),
      const Divider(),
      _tile('K\'s Kitchen', '757 Monterey Blvd', Icons.restaurant),
      _tile('Emmy\'s Restaurant', '1923 Ocean Ave', Icons.restaurant),
      _tile('Chaiya Thai Restaurant', '272 Claremont Blvd', Icons.restaurant),
      _tile('La Ciccia', '291 30th St', Icons.restaurant),
    ],
  );
}

ListTile _tile(String title, String subtitle, IconData icon) {
  return ListTile(
    title: Text(
      title,
      style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 20),
    ),
    subtitle: Text(subtitle),
    leading: Icon(icon, color: Colors.blue[500]),
  );
}
```

<hr>

[`Colors`]: {{site.api}}/flutter/material/Colors-class.html
[Material 2 Design palette]: {{site.material2}}/design/color/the-color-system.html#tools-for-picking-colors

### Stack

使用 [`Stack`][`Stack`] 可以將元件 (Widgets) 疊加在一個基礎元件之上——通常是一張圖片。這些元件可以完全或部分重疊在基礎元件上。

[`Stack`]: {{site.api}}/flutter/widgets/Stack-class.html

#### 摘要（Stack）

* 適用於需要讓元件重疊在其他元件上的情境
* 子元件列表中的第一個元件為基礎元件；後續的子元件會疊加在該基礎元件之上
* `Stack` 的內容無法捲動
* 你可以選擇是否裁剪超出渲染區域的子元件

#### 範例（Stack）

<div class="side-by-side">
<div>
  <img src='/assets/images/docs/ui/layout/stack.png' class="text-center" height="200px" alt="Circular avatar image with a label">

  使用 `Stack` 疊加一個 `Container`
  （其會在半透明黑色背景上顯示其 `Text`）於 `CircleAvatar` 之上。
  `Stack` 透過 `alignment` 屬性及 `Alignment` 來偏移文字。

  **App 原始碼：** [card_and_stack]({{site.repo.this}}/tree/main/examples/layout/card_and_stack)
</div>
<div>
  <img src='/assets/images/docs/ui/layout/stack-flutter-gallery.png' class="text-center" height="200px" alt="An image with a icon overlaid on top">

  使用 `Stack` 疊加一個圖示於圖片之上。

  **Dart 程式碼：**
  [`bottom_navigation_demo.dart`]({{site.repo.this}}/tree/main/examples/layout/gallery/lib/bottom_navigation_demo.dart)
</div>
</div>

<?code-excerpt "layout/card_and_stack/lib/main.dart (stack)" replace="/\bStack/[!$&!]/g;"?>
```dart
Widget _buildStack() {
  return [!Stack!](
    alignment: const Alignment(0.6, 0.6),
    children: [
      const CircleAvatar(
        backgroundImage: AssetImage('images/pic.jpg'),
        radius: 100,
      ),
      Container(
        decoration: const BoxDecoration(color: Colors.black45),
        child: const Text(
          'Mia B',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
    ],
  );
}
```

<hr>

### Card

一個 [`Card`][`Card`]，來自 [Material library][Material library]，
用於承載相關的資訊片段（nuggets of information），
內容可以由幾乎任何元件（Widget）組成，但通常會與
[`ListTile`][`ListTile`] 一起使用。`Card` 僅能有一個子元件，
但這個子元件可以是 column、row、list、grid，
或其他支援多個子元件的元件。
預設情況下，`Card` 會將自身尺寸縮小為 0 x 0 像素。
你可以使用 [`SizedBox`][`SizedBox`] 來限制 card 的尺寸。

在 Flutter 中，`Card` 具有略為圓角的邊框
以及陰影效果，營造出 3D 立體感。
透過調整 `Card` 的 `elevation` 屬性，你可以控制
陰影的效果。例如，將 elevation 設為 24，
會讓 `Card` 在視覺上看起來更浮起，
且陰影也會更加擴散。
支援的 elevation 值請參考 [Elevation][Elevation]
於 [Material guidelines][Material Design]。
如果指定了不支援的值，則陰影效果會被完全關閉。

[`Card`]: {{site.api}}/flutter/material/Card-class.html
[Elevation]: {{site.material}}/styles/elevation
[`ListTile`]: {{site.api}}/flutter/material/ListTile-class.html
[Material Design]: {{site.material}}/styles
[`SizedBox`]: {{site.api}}/flutter/widgets/SizedBox-class.html
[Material library]: {{site.api}}/flutter/material/material-library.html

#### 摘要（Card）

* 實作一個 [Material card][Material card]
* 用於呈現相關的資訊片段
* 僅接受一個子元件，但該子元件可以是 `Row`、
  `Column`，或其他可包含多個子元件的元件
* 以圓角和陰影效果呈現
* `Card` 的內容無法滾動
* 來自 [Material library][Material library]

[Material card]: {{site.material}}/components/cards
[Material library]: {{site.api}}/flutter/material/material-library.html

#### 範例（Card）

<div class="side-by-side">
<div>
  <img src='/assets/images/docs/ui/layout/card.png' height="200px" class="text-center" alt="Card containing 3 ListTiles">

  一個 `Card`，內含 3 個 ListTile，並透過包裹
  `SizedBox` 來設定尺寸。`Divider` 用於分隔
  第一個和第二個 `ListTiles`。

  **App 原始碼：** [card_and_stack]({{site.repo.this}}/tree/main/examples/layout/card_and_stack)
</div>
<div>
  <img src='/assets/images/docs/ui/layout/card-flutter-gallery.png' height="200px" class="text-center" alt="Tappable card containing an image and multiple forms of text">

  一個 `Card`，內含圖片與文字。

  **Dart 程式碼：**
  [`cards_demo.dart`]({{site.repo.this}}/tree/main/examples/layout/gallery/lib/cards_demo.dart)
</div>
</div>

<?code-excerpt "layout/card_and_stack/lib/main.dart (card)" replace="/\bCard/[!$&!]/g;"?>
```dart
Widget _buildCard() {
  return SizedBox(
    height: 210,
    child: [!Card!](
      child: Column(
        children: [
          ListTile(
            title: const Text(
              '1625 Main Street',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            subtitle: const Text('My City, CA 99984'),
            leading: Icon(Icons.restaurant_menu, color: Colors.blue[500]),
          ),
          const Divider(),
          ListTile(
            title: const Text(
              '(408) 555-1212',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            leading: Icon(Icons.contact_phone, color: Colors.blue[500]),
          ),
          ListTile(
            title: const Text('costa@example.com'),
            leading: Icon(Icons.contact_mail, color: Colors.blue[500]),
          ),
        ],
      ),
    ),
  );
}
```

<hr>

### ListTile

使用 [`ListTile`][`ListTile`]，這是一個來自 [Material library][Material library] 的專用 row 元件 (Widget)，可以輕鬆建立包含最多三行文字，以及可選的前置與後置圖示的 row。`ListTile` 最常用於 [`Card`][`Card`] 或 [`ListView`][`ListView`]，但也可以用在其他地方。

[`Card`]: {{site.api}}/flutter/material/Card-class.html
[`ListTile`]: {{site.api}}/flutter/material/ListTile-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[Material library]: {{site.api}}/flutter/material/material-library.html

#### 摘要（ListTile）

* 一個專用的 row，最多可包含三行文字與可選的圖示
* 可自訂性比 `Row` 低，但更容易使用
* 來自 [Material library][Material library]

[Material library]: {{site.api}}/flutter/material/material-library.html

#### 範例（ListTile）

<div class="side-by-side">
<div>
  <img src='/assets/images/docs/ui/layout/card.png' class="text-center" alt="Card containing 3 ListTiles">

  一個 `Card`，內含 3 個 `ListTile`。

  **App 原始碼：** [card_and_stack]({{site.repo.this}}/tree/main/examples/layout/card_and_stack)
</div>
<div>
  <img src='/assets/images/docs/ui/layout/listtile-flutter-gallery.png' height="200px" class="simple-border text-center" alt="4 ListTiles, each containing a leading avatar">

  使用帶有前置元件的 `ListTile`。

  **Dart 程式碼：**
  [`list_demo.dart`]({{site.repo.this}}/tree/main/examples/layout/gallery/lib/list_demo.dart)
</div>
</div>

<hr>

## 限制條件（Constraints）

要完整理解 Flutter 的排版系統，你需要了解 Flutter 如何在版面中定位與調整元件 (components) 的大小。更多資訊請參閱 [Understanding constraints][Understanding constraints]。

[Understanding constraints]: /ui/layout/constraints

## 影片

以下影片為 [Flutter in Focus][Flutter in Focus] 系列的一部分，說明 `Stateless` 與 `Stateful` 元件 (Widgets)。

{% ytEmbed 'wE7khGHVkYY', 'How to create stateless widgets' %}

{% ytEmbed 'AqCMFXEmf3w', 'How and when stateful widgets are best used' %}

[Flutter in Focus 播放清單]({{site.yt.playlist}}PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2)

---

[Widget of the Week 系列][Widget of the Week series] 的每一集都聚焦於一個元件 (Widget)，其中有多集介紹排版相關的元件。

{% ytEmbed 'b_sQ9bMltGU', 'Introducing widget of the week' %}

[Flutter Widget of the Week 播放清單]({{site.yt.playlist}}PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)

[Widget of the Week series]: {{site.yt.playlist}}PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG
[Flutter in Focus]: {{site.yt.watch}}?v=wgTBLj7rMPM&list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2

## 其他資源

以下資源在撰寫排版程式碼時可能有所幫助。

[Layout tutorial][Layout tutorial]
: 學習如何建立一個排版。

[Widget catalog][Widget catalog]
: 介紹 Flutter 中可用的多種元件 (Widgets)。

[HTML/CSS Analogs in Flutter][HTML/CSS Analogs in Flutter]
: 若你熟悉網頁程式設計，本頁將 HTML/CSS 功能對應到 Flutter 的特性。

[API reference docs][API reference docs]
: 提供所有 Flutter 函式庫的 API 文件。

[Adding assets and images][Adding assets and images]
: 說明如何將圖片與其他資源加入你的 App 套件中。

[Zero to One with Flutter][Zero to One with Flutter]
: 一位開發者撰寫其第一個 Flutter App 的經驗分享。

[Layout tutorial]: /ui/layout/tutorial
[Widget catalog]: /ui/widgets
[HTML/CSS Analogs in Flutter]: /get-started/flutter-for/web-devs
[API reference docs]: {{site.api}}/flutter
[Adding assets and images]: /ui/assets/assets-and-images
[Zero to One with Flutter]: {{site.medium}}/@mravn/zero-to-one-with-flutter-43b13fd7b354
