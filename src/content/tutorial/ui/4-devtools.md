---
title: DevTools
description: 學習在開發 Flutter 應用程式時使用 Dart DevTools。
permalink: /tutorial/devtools/
---

{%- comment %} TODO(ewindmill) embed video {%- endcomment %}

隨著你的 Flutter 應用程式變得越來越複雜，了解每個元件（Widget）屬性如何影響 UI 變得更加重要。
[Dart 的 DevTools][Dart's DevTools] 提供兩個特別實用的功能來協助你：**元件檢查器（widget inspector）** 與 **屬性編輯器（property editor）**。

首先，請在你的應用程式以除錯模式（debug mode）執行時，執行以下指令來啟動 DevTools：

```shell
$ flutter pub global activate devtools  # You only need to run this once
$ devtools
```

:::note 在你的 IDE 中執行

你也可以直接在 [VS Code][VS Code] 和 [IntelliJ][IntelliJ] 內執行 DevTools，只要你已安裝 Flutter 外掛。這一課所使用的截圖來自 VS Code。

:::

## 元件檢查器 (widget inspector)

元件檢查器 (widget inspector) 讓你可以視覺化並探索你的元件樹 (widget tree)。它有助於你理解 UI 的版面配置，並找出螢幕上各個區塊分別由哪些元件負責。以你目前所建置的應用程式來說，檢查器看起來會像這樣：

<img src='/assets/images/docs/tutorial/widget_inspector.png' alt="A screenshot of the Flutter widget inspector tool.">

請參考你在本節中建立的 `GamePage` 元件：

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

在元件檢查器（widget inspector）中，你應該會看到一棵與你程式碼中完全相同的元件（Widgets）樹：以 `MaterialApp` 為根節點，`Scaffold` 作為其 `home`，並有一個 `AppBar` 作為其 `appBar`，如此一路往下，直到擁有 `Tile` 子元件的 `Row` 元件為止。你可以在樹狀結構中選取任何一個元件，以查看其屬性，甚至可以直接在你的 IDE 中跳轉到其原始碼。

## 偵錯版面配置問題

元件檢查器在偵錯版面配置（layout）問題時，或許是最有用的工具。

在某些情況下，元件的 [constraints][constraints]（約束）是無界（unbounded）或無限的。這代表最大寬度或最大高度被設為 [`double.infinity`][`double.infinity`]。當元件嘗試盡可能變大時，若遇到無界約束，在 debug 模式下將無法正常運作，並會拋出例外。

最常見的情況是，當一個 render box 處於 flex box 元件（如 [`Row`][`Row`] 或 [`Column`][`Column`]）內，或在可捲動區域（例如 [`ListView`][`ListView`] 及其他 [`ScrollView`][`ScrollView`] 子類別）時，會出現無界約束。舉例來說，`ListView` 會嘗試在其交錯方向上展開以填滿可用空間（也許它是一個垂直捲動的區塊，並嘗試與其父元件一樣寬）。如果你將一個垂直捲動的 `ListView` 巢狀在一個水平捲動的 `ListView` 內，內層的清單會嘗試變得盡可能寬，這在該方向上會是無限寬，因為外層是可捲動的。

你在開發 Flutter 應用程式時最常遇到的錯誤之一，就是錯誤使用版面配置元件（Layout widgets）所導致，這通常被稱為「無界約束（unbounded constraints）」錯誤。

請觀看以下影片，了解如何發現並解決這個問題。

{% ytEmbed 'jckqXR5CrPI', 'Decoding Flutter: Unbounded height and width' %}

## 屬性編輯器

當你在元件檢查器中選取某個元件時，屬性編輯器會顯示該元件的所有屬性。這是一個強大的工具，能幫助你理解元件為何會呈現目前的樣貌，並可即時嘗試修改屬性值。

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

如果你在 Widget Inspector（元件檢查器）中選取了一個 `Tile` 元件（Widget），Property Editor（屬性編輯器）會顯示其 `width`（60）、`height`（60）以及 `decoration` 屬性。你可以展開 `BoxDecoration`，查看 `border` 和 `color` 屬性。

對於許多屬性，你甚至可以直接在屬性編輯器中修改它們的值。例如，若要快速測試不同的 `width` 或 `height` 在你的 `Container` 於 `Tile` 元件（Widget）中的呈現效果，只需在 Property Editor（屬性編輯器）中變更數值，即可立即在執行中的應用程式上看到更新，無需重新編譯甚至 hot reload。這讓 UI 設計能夠快速反覆調整。

[Dart's DevTools]: /tools/devtools
[constraints]: /ui/layout/constraints
[`double.infinity`]:{{site.api}}/flutter/dart-core/double/infinity-constant.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`ScrollView`]: {{site.api}}/flutter/widgets/ScrollView-class.html
[VS Code]: /tools/vs-code
[IntelliJ]: /tools/android-studio
