---
title: 版面配置
description: 認識 Flutter 中常見的版面配置元件 (Layout widgets)。
permalink: /tutorial/layout/
---

{%- comment %} TODO(ewindmill) embed video {%- endcomment %}

由於 Flutter 是一個 UI 工具包，你將花費大量時間使用 Flutter 元件（Widgets）來建立版面配置。在本節中，你將學習如何使用一些最常見的版面配置元件 (Layout widgets) 來構建版面，這些元件從高階的 [`Scaffold`][`Scaffold`] 和 [`AppBar`][`AppBar`]（用於建立螢幕結構），到較低階的 [`Column`][`Column`] 或 [`Row`][`Row`]（用於垂直或水平排列元件）等。

## `Scaffold` 與 `AppBar`

行動應用程式通常會在頂部有一個稱為「應用程式列（app bar）」的區塊，用來顯示標題、導覽控制項和/或操作按鈕。

<img src='/assets/images/docs/tutorial/apppad.png' alt="A screenshot of a simple application with a bar across the top that has a title and settings button.">

在你的應用程式中加入 app bar 最簡單的方法，就是使用兩個元件：`Scaffold` 和 `AppBar`。

`Scaffold` 是一個便利元件，提供 Material 風格的頁面版面配置，讓你可以輕鬆地在應用程式的頁面中加入 app bar、抽屜（drawer）、導覽列（navigation bar）等。`AppBar` 則是 app bar 本身。

由 `$ flutter create --empty` 指令所產生的程式碼，已經包含了一個 `AppBar` 元件和一個 `Scaffold` 元件。以下程式碼將其更新，加入另一個版面配置元件：[`Align`][`Align`]。這個元件會將標題靠左對齊（預設會置中）。`Text` 元件則包含實際的標題內容。

請修改你的 `MainApp` 的 `build` 方法中的 `Scaffold`：

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Align(
            alignment: Alignment.centerLeft,
            child: Text('Birdle'),
          ),
        ),
        body: Center(child: Tile('A', HitType.hit)),
      ),
    );
  }
}
```

### 更新後的元件樹（widget tree）

請注意，隨著應用程式規模的擴大，元件樹（widget tree）會變得越來越重要。在這個階段，元件樹首次出現了「分支」，現在看起來就像下圖所示。

<img src='/assets/images/docs/tutorial/widget_tree_with_app_bar.png' alt="A screenshot that resembles the popular game Wordle.">

## 建立 GamePage 元件（Widget）

在你的 `main.dart` 檔案中，新增以下名為 `GamePage` 的元件（Widget）程式碼。這個元件將用來顯示遊戲本身所需的 UI 元素。

```dart
class GamePage extends StatelessWidget {
  const GamePage({super.key});
  // This object is part of the game.dart file.
  // It manages wordle logic, and is outside the scope of this tutorial.
  final Game _game = Game();

  @override
  Widget build(BuildContext context) {
    // TODO: Replace with screen contents
    return Container();
  }
}
```

:::note 挑戰 - 顯示`GamePage`而不是`Tile`。

**解答：**

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        // Changed from `Tile` 
        body: Center(child: GamePage()),
      ),
    );
  }
}
```
:::

## 使用 `Column` 和 `Row` 排列元件 (Widgets)

`GamePage` 版面配置元件 (Layout widget) 包含了一個用於顯示使用者猜測的格子網格。

<img src='/assets/images/docs/tutorial/birdle.png' alt="A screenshot that resembles the popular game Wordle.">

你可以用多種方式來建立這個版面配置，而最簡單的方法就是使用
`Column` 和 `Row` 元件 (Widgets)。每一列包含五個格子，分別代表一次猜測中的五個字母，總共有五列。你需要一個包含五列的 column，每一列各自包含五個子元件 (children)。
首先，請從 `GamePage.build` 方法回傳一個 `Column`（並用 `Padding` 元件包裹）。

```dart
class GamePage extends StatelessWidget {
  const GamePage({super.key});
  // This manages game logic, and is out of scope for this lesson
  final Game _game = Game();

    @override
    Widget build(BuildContext context) {
      return Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          spacing: 5.0,
          children: [
            // Add children next
          ],
        ),
      );
    }`
}
```

`spacing` 屬性會在主軸上的每個元素之間加入五個像素的間距。

在 `Column.children` 中，*為每個* `_game.guesses` 清單中的元素新增一列。

:::note
這個 `guesses` 清單是一個**固定大小**的清單，起始時包含五個元素，每個元素對應一個*可能*的猜測。該清單始終會包含五個元素，因此也會固定渲染五列。
:::

```dart
class GamePage extends StatelessWidget {
  const GamePage({super.key});
  // This manages game logic, and is out of scope for this lesson
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
                // tiles
                ]
              ),
          ],
      ),
    );
  }
}
```

這稱為 [collection-for][collection-for] 迴圈，是 Dart 的一項功能，允許你在執行迴圈時，將一個清單展開插入到另一個清單中。這種語法糖讓你更容易處理元件 (Widgets) 的集合，其效果等同於以下的偽程式碼：

```dart
[...ListOfData.map((element) => Widget(element)).toList()],
```

在這個例子中，它會將五個 `Row` 元件（Widget）加入到 column 中，每個對應於 `Game` 物件上的一個猜測。

### 更新後的元件樹（Widget Tree）

在本課程中，這個應用程式的元件樹（Widget tree）已經大幅擴展。現在，它看起來更像下圖所示（為了易讀性，圖中有部分省略）。

### 更新後的元件樹（Widget Tree）

隨著應用程式規模的成長，考慮元件樹（Widget tree）的結構變得越來越重要。此時，樹中首次出現了「分支」，現在看起來像下圖這樣。

<img src='/assets/images/docs/tutorial/widget_tree_rows_columns.png' alt="A diagram showing a tree like structure with a node for each widget in the app.">

:::note 挑戰

在每一列中，為每個允許猜測的字母新增一個 `Tile`。  
在迴圈中的 `guess` 變數是一個型別為 `({String char, HitType type})` 的 [record][record]。

**解答：**

```dart
class GamePage extends StatelessWidget {
  const GamePage({super.key});
  // This manages game logic, and is out of scope for this lesson
  final Game _game = Game();
    
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
                  for (var letter in guess) 
                    Tile(letter.char, letter.type),
                ]
              ),
          ],
      ),
    );
  }
}
```

:::

當你重新載入你的應用程式時，應該會看到一個 5x5 的白色方格。

<img src='/assets/images/docs/tutorial/grid_of_tiles.png' alt="一個類似熱門遊戲 Wordle 的螢幕截圖。">

[`AppBar`]: {{site.api}}/flutter/material/AppBar-class.html
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`Column`]:  {{site.api}}/flutter/widgets/Column-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`Align`]: {{site.api}}/flutter/widgets/Align-class.html
[collection-for]: {{site.dart-site}}/language/collections#for-element
[record]: {{site.dart-site}}/language/records