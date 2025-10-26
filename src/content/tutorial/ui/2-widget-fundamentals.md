---
title: 建立元件
description: 認識無狀態元件，並學習如何自訂元件。
permalink: /tutorial/stateless-widgets/
---

{%- comment %}
<!-- TODO(ewindmill) embed video -->
{%- endcomment %}

在本課程中，你將會建立自己的自訂元件，並認識 SDK 中最常見的一些元件（Widgets）。

自訂元件（Custom widgets）讓你可以在應用程式中重複使用 UI 元件，將複雜的 UI 程式碼組織成易於管理的區塊，並撰寫出更乾淨且易於維護的程式碼。完成本課程後，你將會建立出自己的自訂 Tile 元件。

## 開始之前

本應用程式依賴一些與 UI 無關的遊戲邏輯，因此這部分不在本教學範圍內。在繼續之前，你需要先將這些邏輯加入你的應用程式。

1. 在 `lib` 目錄下建立一個名為 `game.dart` 的新檔案。
2. 將以下程式碼複製到該檔案，並在你的 `main.dart` 檔案中匯入這段程式碼。

{% render docs/tutorial/game-code.md  %}

:::note 遊戲邏輯說明
你可能會注意到名為 `legalGuesses` 和 `legalWords` 的清單只包含了幾個單字。完整的清單合計超過 10,000 個單字，為了簡潔起見這裡省略了。你不需要完整清單也能繼續本教學。在測試應用程式時，請確保使用這些清單中的少數單字。

另外，你也可以在 [這個 GitHub repository][this github repository] 找到完整清單，以及如何將其匯入專案的說明。
:::

## 無狀態元件的結構

`Widget` 是一個 Dart 類別，會繼承自 Flutter 的元件類別，本例中是 [`StatelessWidget`][`StatelessWidget`]。

請打開你的 `main.dart` 檔案，並在 `MainApp` 類別下方加入以下程式碼，這段程式碼會定義一個名為 `Tile` 的新元件。

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  // ... 
}
```

### 建構函式

`Tile` 類別有一個 [`constructor`][`constructor`]，用來定義在渲染該元件（Widget）時需要傳入哪些資料。在這裡，會傳入一個 `String`，代表猜測的字母，以及一個 `HitType`，這是一個 [列舉值（enum value）][enum value]，用來決定方塊的顏色。（例如，`HitType.hit` 會顯示為綠色方塊。）將資料傳遞給元件（Widget）是讓元件具備可重複使用性的核心。

### `Build` 方法

最後，就是非常重要的 `build` 方法。每個元件（Widget）都必須定義這個方法，且它總是會回傳另一個元件（Widget）。 

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
	// TODO: Replace Containter with widgets.
	return Container();
  }
}
```

## 使用自訂元件（Widget）

當這個應用程式完成後，螢幕上將會有 25 個這個元件（Widget）的實例。
但目前，請只顯示一個，以便你可以在每次更新時看到變化。在 `MainApp.build` 方法中，將 `Text` 元件（Widget）替換為以下內容：

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

 @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Tile('A', HitType.hit), // NEW
        ),
      ),
    );
  }
}
```

目前，你的應用程式會是空白的，因為`Tile` 元件（Widget）回傳了一個空的 `Container`，預設情況下不會顯示任何內容。

## `Container` 元件（Widget）

`Tile` 元件（Widget）由三個最常見的基本元件（Widgets）組成：`Container`、`Center` 和 `Text`。
[`Container`][`Container`] 是一個便利元件（Widget），它包裝了多個基本樣式元件（Widgets），例如 `Padding`、[`ColoredBox`][`ColoredBox`]、[`SizedBox`][`SizedBox`]、[`DecoratedBox`][`DecoratedBox`]，以及更多其他元件。

由於完成後的 UI 會包含 25 個`Tile` 元件（Widgets），並以整齊的行與列排列，因此應該要有明確的尺寸。請在 `Container` 上設定 width 和 height 屬性。（你也可以使用 `SizedBox` 元件（Widget）來達成，但接下來你會用到更多 `Container` 的屬性。） 

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
	// NEW
	  return Container(
       width: 60,
       height: 60,
       // TODO: Add needed widgets
    );
  }
}
```

## BoxDecoration

接下來，使用以下程式碼為方塊新增一個 [`Border`][`Border`]：

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
	// NEW
	  return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        // TODO: add background color
      ),
    );
  }
}
```

`BoxDecoration` 是一個可以為元件（Widget）新增任意數量裝飾效果的物件，從背景顏色、邊框到盒子陰影等都可以實現。在這個例子中，你新增了一個邊框。當你進行熱重載（hot reload）後，應該會看到白色方塊周圍出現一圈淡色的邊框。

當這個遊戲完成時，方塊的顏色會根據使用者的猜測而變化。當使用者猜對時，方塊會變成綠色；當字母正確但位置錯誤時，會變成黃色；如果猜測在兩個維度上都錯誤，則會顯示為灰色。

下圖展示了這三種可能的狀態。

<img src='/assets/images/docs/tutorial/tiles.png' alt="A screenshot of a green, yellow, and grey tile.">

要在 UI 中實現這個效果，可以使用 [switch expression][switch expression] 來設定 `color` 的 `BoxDecoration`。

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
        // TODO: add children
      ),
    );
  }
}
```

## 子元件（Child widgets）

最後，將 `Center` 和 `Text` 元件（Widget）加入到 `Container.child` 屬性中。

在 Flutter SDK（Flutter 軟體開發套件）中，大多數元件（Widget）都有 `child` 或 `children` 屬性，分別用來接收單一元件或元件清單。建議在自訂元件時，也遵循相同的命名慣例。

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

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
      child: Center(
        child: Text(
          letter.toUpperCase(),
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}
```

熱重載（hot reload）後會出現一個綠色方塊。若要切換顏色，請更新並熱重載傳遞給你所建立的 `Tile` 的 `HitType`：

```dart
// main.dart line ~16
// green
child: Tile('A', HitType.hit)
// grey
child: Tile('A', HitType.miss)
// yellow
child: Tile('A', HitType.partial)
```

很快地，這個小方塊將會成為螢幕上眾多元件（Widgets）之一。在下一課中，你將開始建構遊戲格線本身。



[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`constructor`]: {{site.dart-site}}/language/constructors
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`Border`]: {{site.api}}/flutter/widgets/Container-class.html
[`ColoredBox`]: {{site.api}}/flutter/widgets/ColoredBox-class.html
[`SizedBox`]: {{site.api}}/flutter/widgets/SizedBox-class.html
[`DecoratedBox`]: {{site.api}}/flutter/widgets/DecoratedBox-class.html
[switch expression]: {{site.dart-site}}/language/branches#switch-statements
[enum value]: {{site.dart-site}}/language/branches#switch-statements
[this github repository]: https://github.com/ericwindmill/legal_wordle_words
