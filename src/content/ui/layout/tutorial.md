---
title: 建立 Flutter 版面配置
shortTitle: 版面配置教學
description: 學習如何在 Flutter 中建立版面配置。
---

{% assign examples = site.repo.this | append: "/tree/" | append: site.branch | append: "/examples" -%}

:::secondary 您將學到什麼
* 如何將元件（Widgets）並排排列。
* 如何在元件之間加入間距。
* 如何透過新增與巢狀元件組成 Flutter 版面配置。
:::

本教學將說明如何在 Flutter 中設計與建立版面配置。

如果您使用提供的範例程式碼，可以建立如下的應用程式。

{% render docs/app-figure.md, img-class:"site-mobile-screenshot border", image:"ui/layout/layout-demo-app.png", caption:"完成的應用程式。", width:"50%" %}

<figcaption class="figure-caption">

照片來源：[Dino Reichmuth][ch-photo]，取自 [Unsplash][Unsplash]。
文字來源：[Switzerland Tourism][Switzerland Tourism]。

</figcaption>

若要更全面了解版面配置機制，請先參考
[Flutter 的版面配置方法][Flutter's approach to layout]。

[Switzerland Tourism]: https://www.myswitzerland.com/en-us/destinations/lake-oeschinen
[Flutter's approach to layout]: /ui/layout

## 繪製版面配置圖

在本節中，請思考您希望應用程式使用者獲得什麼樣的使用體驗。

請考慮如何定位使用者介面的各個元件。
版面配置即是這些定位的最終成果。
事先規劃版面配置可以加快您的程式撰寫速度。
利用視覺提示來決定螢幕上各元素的位置會非常有幫助。

您可以選擇任何喜歡的方法，例如介面設計工具或紙筆。
在撰寫程式碼前，先規劃好要將元素放在哪個位置。
這就像程式設計版的俗語：「量兩次，剪一次。」

<ol>
<li>

請透過以下問題，將版面配置拆解為基本元素：

* 您能辨識出橫列（row）與直行（column）嗎？
* 版面配置是否包含網格（grid）？
* 是否有重疊的元素？
* UI 是否需要分頁（tabs）？
* 哪些需要對齊、留白（padding）或加上邊框（border）？

</li>

<li>

先辨識較大的元素。在本範例中，您會將圖片、標題、按鈕與描述依序排列成一個直行（column）。

{% render docs/app-figure.md, img-class:"site-mobile-screenshot border", image:"ui/layout/layout-sketch-intro.svg", caption:"版面配置中的主要元素：圖片、橫列、橫列與文字區塊", width:"50%" %}

</li>
<li>

逐一繪製每個橫列。

<ol type="a">

<li>

橫列 1，也就是 **標題** 區段，包含三個子元素：
一個文字直行、一個星形圖示，以及一個數字。
其中第一個子元素（直行）包含兩行文字。
這個直行可能需要較多空間。

{% render docs/app-figure.md, image:"ui/layout/layout-sketch-title-block.svg", caption:"標題區段，包含文字區塊與圖示" -%}

</li>

<li>

橫列 2，也就是 **按鈕** 區段，包含三個子元素：每個子元素都是一個直行，裡面有一個圖示和一段文字。

{% render docs/app-figure.md, image:"ui/layout/layout-sketch-button-block.svg", caption:"按鈕區段，包含三個有標籤的按鈕", width:"50%" %}

  </li>

</ol>

</li>
</ol>

在繪製完版面配置圖後，請思考要如何撰寫程式碼。

您會將所有程式碼寫在同一個類別中嗎？
還是會為版面配置的每個部分建立一個類別？

依照 Flutter 的最佳實踐，請為版面配置的每個部分建立一個類別或元件（Widget）。
當 Flutter 需要重新渲染部分 UI 時，只會更新有變動的最小區塊。
這也是 Flutter 採用「一切皆元件」的設計理念。
如果只有 `Text` 元件中的文字有變動，Flutter 只會重繪該文字。
Flutter 會根據使用者輸入，盡量只變更最少的 UI 區塊。

本教學建議您將每個辨識出的元素都寫成獨立的元件（Widget）。

## 建立應用程式的基礎程式碼

在本節中，請先撰寫基本的 Flutter 應用程式程式碼，作為起始點。

<?code-excerpt path-base="layout/base"?>

1. [設定您的 Flutter 開發環境][Set up your Flutter environment]。

1. [建立新的 Flutter 應用程式][new-flutter-app]。

1. 將 `lib/main.dart` 的內容替換為以下程式碼。
   此應用程式會使用一個參數來設定應用程式標題，以及顯示在 `appBar` 上的標題。
   這樣可以簡化程式碼。

   <?code-excerpt "lib/main.dart (all)"?>
   ```dart
   import 'package:flutter/material.dart';
   
   void main() => runApp(const MyApp());
   
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

[Set up your Flutter environment]: /get-started
[new-flutter-app]: /reference/create-new-app

## 新增標題區塊

在本節中，建立一個`TitleSection`元件（Widget），其版面配置如下所示。

<?code-excerpt path-base="layout/lakes"?>

{% render docs/app-figure.md, image:"ui/layout/layout-sketch-title-block-unlabeled.svg", caption:"標題區塊的草圖與原型 UI" %}

### 新增`TitleSection`元件（Widget）

請將以下程式碼加入在`MyApp`類別之後。

<?code-excerpt "step2/lib/main.dart (title-section)"?>
```dart
class TitleSection extends StatelessWidget {
  const TitleSection({super.key, required this.name, required this.location});

  final String name;
  final String location;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(32),
      child: Row(
        children: [
          Expanded(
            /*1*/
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                /*2*/
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Text(
                    name,
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                Text(location, style: TextStyle(color: Colors.grey[500])),
              ],
            ),
          ),
          /*3*/
          Icon(Icons.star, color: Colors.red[500]),
          const Text('41'),
        ],
      ),
    );
  }
}
```

{:.numbered-code-notes}

1. 若要在橫列中使用所有剩餘的可用空間，請使用 `Expanded` 元件來
   拉伸 `Column` 元件。
   若要將該 column 放在橫列的起始位置，
   請將 `crossAxisAlignment` 屬性設為 `CrossAxisAlignment.start`。
2. 若要在多行文字之間加入間距，請將這些行放入 `Padding` 元件中。
3. 標題橫列以紅色星號圖示和文字 `41` 結尾。
    整個橫列包在 `Padding` 元件中，並在每個邊緣加上 32 像素的內距。

### 將應用程式主體改為可滾動檢視

在 `body` 屬性中，將 `Center` 元件替換為
`SingleChildScrollView` 元件。
在 [`SingleChildScrollView`][`SingleChildScrollView`] 元件內，將 `Text` 元件替換為
`Column` 元件。

```dart diff
- body: const Center(
-   child: Text('Hello World'),
+ body: const SingleChildScrollView(
+   child: Column(
+     children: [
```

這些程式碼更新會以以下方式改變應用程式：

* `SingleChildScrollView` 元件（Widget）可以捲動。
  這讓無法完全顯示在當前螢幕上的元素也能被顯示出來。
* `Column` 元件會依照其 `children` 屬性中所列的順序，顯示所有元素。
  在 `children` 清單中第一個列出的元素，會顯示在清單的最上方。`children` 清單中的元素，會依照陣列順序從上到下顯示在螢幕上。

[`SingleChildScrollView`]: {{site.api}}/flutter/widgets/SingleChildScrollView-class.html

### 更新應用程式以顯示標題區塊

將 `TitleSection` 元件作為 `children` 清單中的第一個元素加入。
這樣就會將它放在螢幕的最上方。
將提供的名稱和位置傳遞給 `TitleSection` 建構子。

```dart diff
+ children: [
+   TitleSection(
+     name: 'Oeschinen Lake Campground',
+     location: 'Kandersteg, Switzerland',
+   ),
+ ],
```

:::tip
* 當你將程式碼貼到你的應用程式時，縮排可能會跑掉。
  若要在 Flutter 編輯器中修正這個問題，請使用[自動重新格式化功能][automatic reformatting support]。
* 為了加快開發速度，請嘗試 Flutter 的[熱重載 (hot reload)][hot reload]功能。
* 如果遇到問題，請將你的程式碼與[`lib/main.dart`][`lib/main.dart`]進行比較。
:::

[automatic reformatting support]: /tools/formatting
[hot reload]: /tools/hot-reload
[`lib/main.dart`]: {{examples}}/layout/lakes/step2/lib/main.dart

## 新增 Button 區塊

在本節中，將新增按鈕，為你的應用程式加入功能。

<?code-excerpt path-base="layout/lakes/step3"?>

**Button** 區塊包含三個欄，每個欄都使用相同的版面配置：
一個圖示位於一行文字之上。

{% render docs/app-figure.md, image:"ui/layout/layout-sketch-button-block-unlabeled.svg", caption:"Button 區塊的手稿與原型 UI" %}

規劃將這三個欄平均分配在同一行，讓每個欄位佔用相同的空間。所有文字與圖示皆使用主色 (primary color) 繪製。

### 新增 `ButtonSection` 元件 (Widget)

請在 `TitleSection` 元件之後，加入以下程式碼，以建立按鈕列所需的程式碼區塊。

<?code-excerpt "lib/main.dart (button-start)"?>
```dart
class ButtonSection extends StatelessWidget {
  const ButtonSection({super.key});

  @override
  Widget build(BuildContext context) {
    final Color color = Theme.of(context).primaryColor;
    // ···
  }

}
```

### 建立一個元件 (Widget) 來製作按鈕

由於每一欄的程式碼都可以使用相同的語法，請建立一個名為 `ButtonWithText` 的元件 (Widget)。
這個元件的建構子會接收一個顏色、圖示資料 (icon data)，以及按鈕的標籤。
利用這些值，該元件會建立一個 `Column`，其子元件包含一個 `Icon` 和一個經過樣式化的 `Text` 元件。
為了協助分隔這些子元件，`Padding` 元件中的 `Text` 元件會再包裹一層 `Padding` 元件。

請在 `ButtonSection` 類別之後加入以下程式碼。

<?code-excerpt "lib/main.dart (button-with-text)"?>
```dart
class ButtonSection extends StatelessWidget {
  const ButtonSection({super.key});
  // ···
}

class ButtonWithText extends StatelessWidget {
  const ButtonWithText({
    super.key,
    required this.color,
    required this.icon,
    required this.label,
  });

  final Color color;
  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(icon, color: color),
        Padding(
          padding: const EdgeInsets.only(top: 8),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w400,
              color: color,
            ),
          ),
        ),
      ],
    );
  }
```

### 使用 `Row` 元件 (Widget) 排列按鈕位置

將以下程式碼加入到 `ButtonSection` 元件中。

1. 新增三個 `ButtonWithText` 元件的實例，每個按鈕各用一次。
2. 傳遞該按鈕專屬的顏色、`Icon` 和文字。
3. 使用 `MainAxisAlignment.spaceEvenly` 值，將欄 (columns) 沿著主軸 (main axis) 對齊。
   對於 `Row` 元件，主軸為水平；對於 `Column` 元件，主軸為垂直。
   因此，這個值會告訴 Flutter 沿著 `Row`，在每個欄位的前方、之間和後方，平均分配剩餘空間。

<?code-excerpt "lib/main.dart (button-section)"?>
```dart
class ButtonSection extends StatelessWidget {
  const ButtonSection({super.key});

  @override
  Widget build(BuildContext context) {
    final Color color = Theme.of(context).primaryColor;
    return SizedBox(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          ButtonWithText(color: color, icon: Icons.call, label: 'CALL'),
          ButtonWithText(color: color, icon: Icons.near_me, label: 'ROUTE'),
          ButtonWithText(color: color, icon: Icons.share, label: 'SHARE'),
        ],
      ),
    );
  }

}

class ButtonWithText extends StatelessWidget {
  const ButtonWithText({
    super.key,
    required this.color,
    required this.icon,
    required this.label,
  });

  final Color color;
  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Column(
      // ···
    );
  }

}
```

### 更新應用程式以顯示按鈕區塊

將按鈕區塊新增到 `children` 清單中。

<?code-excerpt path-base="layout/lakes"?>

```dart diff
    TitleSection(
      name: 'Oeschinen Lake Campground',
      location: 'Kandersteg, Switzerland',
    ),
+   ButtonSection(),
  ],
```

## 新增文字區塊

在本節中，將文字描述加入此應用程式。

{% render docs/app-figure.md, image:"ui/layout/layout-sketch-add-text-block.svg", caption:"文字區塊的草圖與原型 UI" %}

<?code-excerpt path-base="layout/lakes"?>

### 新增 `TextSection` 元件 (Widget)

請將以下程式碼作為獨立元件，新增在 `ButtonSection` 元件之後。

<?code-excerpt "step4/lib/main.dart (text-section)"?>
```dart
class TextSection extends StatelessWidget {
  const TextSection({super.key, required this.description});

  final String description;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(32),
      child: Text(description, softWrap: true),
    );
  }
}
```

當將 [`softWrap`][`softWrap`] 設為 `true` 時，文字行會在單字邊界自動換行前，先填滿整個欄寬。

[`softWrap`]: {{site.api}}/flutter/widgets/Text/softWrap.html

### 更新應用程式以顯示文字區塊

在 `ButtonSection` 之後，新增一個 `TextSection` 元件 (Widget) 作為子元件。
新增 `TextSection` 元件時，請將其 `description` 屬性設為地點描述的文字內容。

```dart diff
      location: 'Kandersteg, Switzerland',
    ),
    ButtonSection(),
+   TextSection(
+     description:
+         'Lake Oeschinen lies at the foot of the Blüemlisalp in the '
+         'Bernese Alps. Situated 1,578 meters above sea level, it '
+         'is one of the larger Alpine Lakes. A gondola ride from '
+         'Kandersteg, followed by a half-hour walk through pastures '
+         'and pine forest, leads you to the lake, which warms to 20 '
+         'degrees Celsius in the summer. Activities enjoyed here '
+         'include rowing, and riding the summer toboggan run.',
+   ),
  ], 
```

## 新增圖片區塊

在本節中，將圖片檔案加入以完成你的版面配置。

### 設定應用程式以使用提供的圖片

若要讓你的應用程式能夠參考圖片，請修改其 `pubspec.yaml` 檔案。

1. 在專案根目錄下建立一個 `images` 目錄。

1. 下載 [`lake.jpg`][`lake.jpg`] 圖片，並將其加入新建立的 `images` 目錄中。

   :::note
   你無法使用 `wget` 來儲存這個二進位檔案。
   你可以從 [Unsplash][Unsplash] 依照 Unsplash 授權條款下載此 [圖片][ch-photo]。
   小尺寸檔案約為 94.4 kB。
   :::

1. 若要引入圖片，請在應用程式根目錄下的 `pubspec.yaml` 檔案中加入 `assets` 標籤。
   當你加入 `assets` 時，它會作為程式碼可用圖片的指標集合。

   ```yaml title="pubspec.yaml" diff
     flutter:
       uses-material-design: true
   +   assets:
   +     - images/lake.jpg
   ```

:::tip
`pubspec.yaml` 中的文字會保留空白字元與大小寫。
請依照前一個範例所示，將變更寫入檔案。

此變更可能需要你重新啟動正在執行的程式，才能顯示圖片。
:::

[`lake.jpg`]: https://raw.githubusercontent.com/flutter/website/main/examples/layout/lakes/step5/images/lake.jpg

### 建立 `ImageSection` 元件 (Widget)

在其他宣告之後，定義以下 `ImageSection` 元件 (Widget)。

<?code-excerpt "step5/lib/main.dart (image-section)"?>
```dart
class ImageSection extends StatelessWidget {
  const ImageSection({super.key, required this.image});

  final String image;

  @override
  Widget build(BuildContext context) {
    return Image.asset(image, width: 600, height: 240, fit: BoxFit.cover);
  }
}
```

`BoxFit.cover` 值告訴 Flutter 以兩個限制條件來顯示圖片。首先，將圖片顯示得盡可能小。其次，覆蓋版面配置分配給它的所有空間，這個空間稱為 render box（渲染盒）。

### 更新應用程式以顯示圖片區塊

在 `children` 清單的第一個子項中新增一個 `ImageSection` 元件（Widget）。將 `image` 屬性設為你在 [Configure your app to use supplied images](#設定應用程式以使用提供的圖片) 中新增的圖片路徑。

```dart diff
  children: [
+   ImageSection(
+     image: 'images/lake.jpg',
+   ),
    TitleSection(
      name: 'Oeschinen Lake Campground',
      location: 'Kandersteg, Switzerland',
```

## 恭喜你

就是這樣！當你熱重載（hot reload）應用程式後，你的應用程式應該會看起來像這樣。

{% render docs/app-figure.md, img-class:"site-mobile-screenshot border", image:"ui/layout/layout-demo-app.png", caption:"完成的應用程式", width:"50%" %}

## 資源

你可以從以下位置取得本教學中使用的資源：

```dart diff
  children: [
+   ImageSection(
+     image: 'images/lake.jpg',
+   ),
    TitleSection(
      name: 'Oeschinen Lake Campground',
      location: 'Kandersteg, Switzerland',
```

## Congratulations

That's it! When you hot reload the app, your app should look like this.

{% render docs/app-figure.md, img-class:"site-mobile-screenshot border", image:"ui/layout/layout-demo-app.png", caption:"The finished app", width:"50%" %}

## Resources

You can access the resources used in this tutorial from these locations:

**Dart code:** [`main.dart`]<br>
**Image:** [ch-photo][ch-photo]<br>
**Pubspec:** [`pubspec.yaml`][`pubspec.yaml`]<br>

[`main.dart`]: {{examples}}/layout/lakes/step6/lib/main.dart
[ch-photo]: https://unsplash.com/photos/red-and-gray-tents-in-grass-covered-mountain-5Rhl-kSRydQ
[`pubspec.yaml`]: {{examples}}/layout/lakes/step6/pubspec.yaml

## Next Steps

To add interactivity to this layout, follow the
[interactivity tutorial][interactivity tutorial].

[interactivity tutorial]: /ui/interactivity
[Unsplash]: https://unsplash.com
