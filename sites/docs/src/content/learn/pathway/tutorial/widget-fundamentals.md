---
title: 建立元件
description: 學習無狀態元件以及如何建置自己的元件。
layout: tutorial
---

學習建立自訂元件 (Widget)，並使用最常見的 SDK 元件，例如 Container、Center 和 Text。

<YouTubeEmbed id="gyBUnaojFDg" title="Anatomy of a widget" fullWidth="true"></YouTubeEmbed>

<SummaryCard>
title: 你將完成的事項
items:
  - title: 建立自訂 StatelessWidget
    icon: widgets
  - title: 透過建構子參數使元件可重複使用
    icon: tune
  - title: 使用 Container 和 BoxDecoration 為元件套用樣式
    icon: palette
</SummaryCard>

---

### 開始之前

這個應用程式依賴一些與 UI 無關的遊戲邏輯，因此不在本教學的範圍內。
在繼續之前，你需要先將這些邏輯加入應用程式。

1.  下載以下 Dart 檔案，並將其儲存為專案目錄中的 `lib/game.dart`。

    <DownloadableSnippet src="tutorial/game-code.dart" name="game.dart" />

1.  為了能夠存取 `game.dart` 函式庫中定義的型別，
    請在 `lib/main.dart` 檔案中加入對其的 import：

    ```dart title="main.dart" highlightLines=3
    import 'package:flutter/material.dart';

    import 'game.dart';
    ```

:::note 遊戲邏輯備註

你可能會注意到 `legalGuesses` 和 `legalWords` 列表只包含少數幾個單字。
完整列表合計超過 10,000 個單字，為求簡潔而省略。
你不需要完整列表就能繼續本教學。
在測試應用程式時，請確保使用這些列表中的單字。

或者，你也可以在[此 GitHub 儲存庫][full-words]中找到完整列表，
以及將其匯入專案的說明。

:::

[full-words]: https://github.com/ericwindmill/legal_wordle_words

### 無狀態元件的結構

`Widget` 是一個 Dart 類別，它繼承自 Flutter 的某個元件類別，
在本例中為 [`StatelessWidget`][]。

開啟 `main.dart` 檔案，在 `MainApp` 類別下方加入以下程式碼，
這段程式碼定義了一個名為 `Tile` 的新元件。

<?code-excerpt "fwe/birdle/lib/step2a_main.dart (Tile)"?>
```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html

#### 建構子

`Tile` 類別有一個[建構子 (constructor)][constructor]，用來定義
渲染元件時需要傳入的資料。
在本例中，建構子接受兩個參數：

- 一個 `String`，代表方格中猜測的字母。
- 一個 `HitType` [列舉值 (enum value)][enum value]，代表猜測結果，
  用來決定方格的顏色。
  例如，`HitType.hit` 會顯示綠色方格。

透過建構子將資料傳入元件，是使元件可重複使用的核心概念。

[constructor]: {{site.dart-site}}/language/constructors
[enum value]: {{site.dart-site}}/language/enums

#### Build 方法

最後是至關重要的 `build` 方法，每個元件都必須定義此方法，
且它永遠會回傳另一個元件。

<?code-excerpt "fwe/birdle/lib/step2b_main.dart (Tile)"?>
```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    // TODO: Replace Container with widgets.
    return Container();
  }
}
```

### 使用自訂元件

應用程式完成後，畫面上會有 25 個此元件的實例。
但現在先只顯示一個，以便在修改時看到更新效果。
在 `MainApp.build` 方法中，將 `Text` 元件替換為以下內容：

<?code-excerpt "fwe/birdle/lib/step2_main.dart (MainApp)"?>
```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Tile('A', HitType.hit), // NEW
        ),
      ),
    );
  }
}
```

目前應用程式會顯示為空白，
因為 `Tile` 元件回傳的是空的 `Container`，
而 `Container` 預設不顯示任何內容。

### `Container` 元件

`Tile` 元件由三個最常見的核心元件組成：
`Container`、`Center` 和 `Text`。
[`Container`][] 是一個便利元件，它封裝了多個核心樣式元件，
例如 [`Padding`][]、[`ColoredBox`][]、[`SizedBox`][] 和 [`DecoratedBox`][]。

由於完成後的 UI 包含 25 個整齊排列成欄列的 `Tile` 元件，
因此應為其設定明確的大小。
在 `Container` 上設定 `width` 和 `height` 屬性。
（也可以使用 `SizedBox` 元件來完成，但接下來你會用到
`Container` 更多的屬性。）

<?code-excerpt "fwe/birdle/lib/step2c_main.dart (Tile)"?>
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

[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`Padding`]: {{site.api}}/flutter/widgets/Padding-class.html
[`ColoredBox`]: {{site.api}}/flutter/widgets/ColoredBox-class.html
[`SizedBox`]: {{site.api}}/flutter/widgets/SizedBox-class.html
[`DecoratedBox`]: {{site.api}}/flutter/widgets/DecoratedBox-class.html

### BoxDecoration

接下來，用以下程式碼為方框加入 [`Border`][]（邊框）：

<?code-excerpt "fwe/birdle/lib/step2d_main.dart (Tile)"?>
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

`BoxDecoration` 是一個物件，可以為元件加入各種裝飾，
從背景色到邊框再到陰影等。
在本例中，你加入了一個邊框。
熱重載後，白色方塊周圍應該出現一條淺色邊框。

遊戲完成後，方格的顏色將取決於使用者的猜測結果。
當使用者猜測完全正確時，方格呈綠色；
字母正確但位置不對時呈黃色；
兩者都不對時呈灰色。

下圖展示了這三種情況。

<img src='/assets/images/docs/tutorial/tiles.png' width="320px" alt="A screenshot of a green, yellow, and grey tile.">


要在 UI 中實現這一點，請使用 [switch 表達式][switch expression]
來設定 `BoxDecoration` 的 `color`。

<?code-excerpt "fwe/birdle/lib/step2e_main.dart (Tile)"?>
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
        // TODO: add children
      ),
    );
  }
}
```

[`Border`]: {{site.api}}/flutter/widgets/Container-class.html
[switch expression]: {{site.dart-site}}/language/branches#switch-expressions

### 子元件

最後，將 `Center` 和 `Text` 元件加入 `Container.child` 屬性。

Flutter SDK 中大多數元件都有 `child` 或 `children` 屬性，
分別用來接收單一元件或元件列表。
在你自己的自訂元件中使用相同的命名慣例是最佳實踐。

<?code-excerpt "fwe/birdle/lib/step2f_main.dart (Tile)"?>
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

熱重載後會出現一個綠色方塊。若要切換顏色，
請更新傳入 `Tile` 的 `HitType` 並熱重載：

<?code-excerpt "fwe/birdle/lib/step2_main.dart (TileUsage)"?>
```dart
// main.dart line ~16
// green
Tile('A', HitType.hit);
// grey
Tile('A', HitType.miss);
// yellow
Tile('A', HitType.partial);
```

不久之後，這個小方塊將成為畫面上眾多元件之一。在下一節課中，
你將開始建置遊戲格線本身。

### 回顧


<SummaryCard>
title: 你完成的事項
subtitle: 以下是你在本課中建置與學習的摘要。
completed: true
items:
  - title: 建立了自訂 StatelessWidget
    icon: widgets
    details: >-
      你透過繼承 `StatelessWidget` 建立了新的 `Tile` 元件。
      每個元件都有一個接受資料的建構子，
      以及一個回傳其他元件的 `build` 方法。
      這個模式是使用 Flutter 建置使用者介面的基礎。
  - title: 透過建構子參數使元件可重複使用
    icon: tune
    details: >-
      透過接受 `letter` 和 `hitType` 作為建構子參數，
      你的 `Tile` 元件可以顯示不同的內容和顏色。
      透過建構子傳遞資料是建立靈活、可重複使用元件的方式。
  - title: 使用 Container 和 BoxDecoration 為元件套用樣式
    icon: palette
    details: >-
      你使用 `Container` 設定元件的大小，
      並使用 `BoxDecoration` 加入邊框和背景色。
      然後為了依條件設定方格顏色，
      你對 `hitType` 值使用了 switch 表達式。
</SummaryCard>

### 自我測驗

<Quiz title="元件基礎測驗">
- question: "Flutter 每個元件的 `build` 方法必須回傳什麼？"
  options:
    - text: 描述元件的 String。
      correct: false
      explanation: "`build` 方法回傳的是元件，而不是 String。"
    - text: 另一個元件。
      correct: true
      explanation: "`build` 方法永遠回傳另一個元件，構成元件樹的一部分。"
    - text: 表示成功或失敗的布林值。
      correct: false
      explanation: 元件不表示成功與否；它們回傳其他元件以進行渲染（render）。
    - text: 若沒有內容要顯示則回傳 Null。
      correct: false
      explanation: "`build` 方法不能回傳 null；它必須回傳一個有效的元件。"
- question: 哪個物件用來為 Container 加入邊框、背景色和陰影等裝飾？
  options:
    - text: ThemeData
      correct: false
      explanation: ThemeData 用於全應用程式範圍的樣式，而非個別容器的裝飾。
    - text: TextStyle
      correct: false
      explanation: TextStyle 用於文字格式，而非容器裝飾。
    - text: BoxDecoration
      correct: true
      explanation: BoxDecoration 可以為 Container 加入邊框、背景色、漸層、陰影等裝飾。
    - text: EdgeInsets
      correct: false
      explanation: EdgeInsets 用於指定內距（padding）或外距，而非視覺裝飾。
</Quiz>
