---
title: DevTools
description: 學習在開發 Flutter 應用程式時使用 Dart DevTools。
permalink: /tutorial/devtools/
---

{%- comment %} TODO(ewindmill) embed video {%- endcomment %}

隨著你的 Flutter 應用程式日益複雜，了解每個元件（Widget）屬性如何影響 UI 變得越來越重要。
[Dart 的 DevTools][Dart's DevTools] 提供兩個特別實用的功能：**元件檢查器（widget inspector）**與**屬性編輯器（property editor）**。

首先，請在應用程式以偵錯模式執行時，透過下列指令啟動 DevTools：

```shell
$ flutter pub global activate devtools  # You only need to run this once
$ devtools
```

:::note 在您的 IDE 中執行

您也可以直接在 [VS Code][VS Code] 和 [IntelliJ][IntelliJ] 中執行 DevTools，只要您已安裝 Flutter 外掛程式。本課程中的截圖來自 VS Code。

:::

## 元件檢查器 (widget inspector)

元件檢查器 (widget inspector) 可讓您視覺化並探索您的元件樹 (widget tree)。它有助於您了解 UI 的版面配置，並識別哪些元件負責螢幕上的不同區塊。以您目前建置的應用程式來說，檢查器看起來如下所示：

<img src='/assets/images/docs/tutorial/widget_inspector.png' alt="A screenshot of the Flutter widget inspector tool.">

請參考您在本節中建立的 `GamePage` 元件：

```dart
class GamePage extends StatelessWidget {
  const GamePage({super.key});
  
  final Game _game = Game();

  @override  
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 5.0,
        children: [
          for (var guess in _game.guesses)
            Row(
              spacing: 5.0,
              children: [
              for (var letter in guess) Tile(letter, )
              ]
            ),
        ],
      ),
    );
  }
}
```

以及它在 `MainApp` 中的使用方式：

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(child: GamePage()),
      ),
    );
  }
}
```

在元件（Widget）檢查器中，你應該會看到一棵與你程式碼中完全相同的元件樹：以 `MaterialApp` 為根節點，`Scaffold` 作為其 `home`，`AppBar` 作為其 `appBar`，如此類推，一直到擁有 `Tile` 子元件的 `Row` 元件為止。你可以在樹狀結構中選擇任何一個元件，來查看其屬性，甚至可以直接跳轉到 IDE 中的原始碼位置。

## 偵錯版面配置問題

元件檢查器在偵錯版面配置（layout）問題時，或許是最有用的工具。

在某些情況下，元件的 [constraints][constraints]（約束條件）是無界（unbounded）或無限的。這代表最大寬度或最大高度被設為 [`double.infinity`][`double.infinity`]。當一個元件嘗試盡可能放大時，若遇到無界約束條件，在 debug 模式下會丟出例外，因為這樣的情境下元件將無法正常運作。

最常見的情況是，當一個 render box 位於 flex box 元件（如 [`Row`][`Row`] 或 [`Column`][`Column`]）內，或在可捲動區域（例如 [`ListView`][`ListView`] 以及其他 [`ScrollView`][`ScrollView`] 子類別）時，會出現無界約束。舉例來說，`ListView` 會嘗試在交錯方向上展開以填滿可用空間（例如它是一個垂直捲動的區塊，會嘗試與父元件一樣寬）。如果你將一個垂直捲動的 `ListView` 巢狀放在一個水平捲動的 `ListView` 內，內部的清單會嘗試盡可能變寬，而由於外層元件在該方向上可捲動，因此寬度會變成無限大。

你在開發 Flutter 應用程式時最常遇到的錯誤之一，就是錯誤使用版面配置元件（Layout widgets），這種錯誤通常被稱為「無界約束（unbounded constraints）」錯誤。

請觀看下方影片，了解如何發現並解決這個問題。

{% ytEmbed 'jckqXR5CrPI', 'Decoding Flutter: Unbounded height and width' %}

## 屬性編輯器

當你在元件檢查器中選擇一個元件時，屬性編輯器會顯示該元件所有的屬性。這是一個強大的工具，可以幫助你理解元件為何呈現現在的樣貌，並能即時嘗試修改屬性值。

<img src='/assets/images/docs/tutorial/property_editor.png' alt="A screenshot of the Flutter property editor tool.">

請參考前面提到的 `Tile` 元件的 `build` 方法：

```dart
class Tile extends StatelessWidget {
  const Tile(required this.letter, required hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        color: switch (hitType) {
          HitType.hit => Colors.green,
          HitType.partial => Colors.yellow,
          HitType.miss => Colors.grey,
          _ => Colors.white,
        },
      ),
    );
  }
}
```

如果你在 Widget Inspector（元件檢查器）中選取了一個 `Tile` 元件（Widget），屬性編輯器（Property Editor）會顯示其 `width`（60）、`height`（60）以及 `decoration` 屬性。你可以展開 `BoxDecoration`，以查看 `border` 和 `color` 屬性。

對於許多屬性，你甚至可以直接在屬性編輯器中修改它們的值。例如，若要快速測試不同的 `width` 或 `height` 在 `Tile` 元件（Widget）中的 `Container` 呈現效果，只需在屬性編輯器中變更數值，即可立即在執行中的應用程式上看到更新，無需重新編譯或甚至 hot reload。這讓 UI 設計能夠快速反覆調整。

[Dart's DevTools]: /tools/devtools
[constraints]: /ui/layout/constraints
[`double.infinity`]:{{site.api}}/flutter/dart-core/double/infinity-constant.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`ScrollView`]: {{site.api}}/flutter/widgets/ScrollView-class.html
[VS Code]: /tools/vs-code
[IntelliJ]: /tools/android-studio
