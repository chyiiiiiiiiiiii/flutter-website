---
title: 有狀態元件 (Stateful widgets)
description: 了解 StatefulWidgets 以及 Flutter UI 的重建機制。
permalink: /tutorial/stateful-widget/
---

{%- comment %} TODO(ewindmill) embed video {%- endcomment %}

到目前為止，你的應用程式已經顯示了一個格線和一個輸入欄位，但格線尚未根據使用者的猜測進行更新。當這個應用程式完成時，每當使用者提交猜測後，下一個尚未填寫的列中的每個方格都應該會更新，具體包括：

* 顯示正確的字母。
* 根據字母是否正確（綠色）、是否在單字中但位置不正確（黃色），或完全不在單字中（灰色）來改變顏色。

為了處理這種動態行為，你需要將 `GamePage` 從 `StatelessWidget` 轉換為 [`StatefulWidget`][`StatefulWidget`]。

## 為什麼要使用有狀態元件？

當一個元件（Widget）的外觀或資料需要在其生命週期中改變時，你就需要一個 `StatefulWidget` 以及一個對應的 `State` 物件。
雖然 `StatefulWidget` 本身仍然是不可變的（其屬性在建立後無法更改），但 `State` 物件則是長壽命的，可以保存可變資料，並且當這些資料變動時可以重新建構，從而觸發 UI 更新。

舉例來說，下方的元件樹示意了一個簡單的應用程式，當按下按鈕時計數器會遞增，並且使用了有狀態元件。

<img src='/assets/images/docs/tutorial/widget_tree_stateful.png' alt="A diagram of a widget tree with a stateful widget and state object.">

以下是基本的 `StatefulWidget` 結構（暫時不用做任何操作）：

```dart
class ExampleWidget extends StatefulWidget {
  ExampleWidget({super.key});
  
  @override
  State<ExampleWidget> createState() => _ExampleWidgetState();
}

class _ExampleWidgetState extends State<ExampleWidget> {
  @override
  Widget build(BuildContext context) {
   return Container();
  }
}
```

## 將 `GamePage` 轉換為有狀態元件 (Stateful Widget)

若要將 `GamePage` 元件（或其他元件）從無狀態元件 (StatelessWidget) 轉換為有狀態元件 (StatefulWidget)，請依照以下步驟操作：

1. 將 `GamePage` 改為繼承 `StatefulWidget`，而非
   `StatelessWidget`。  
2. 建立一個名為 `_GamePageState` 的新類別，並繼承
   `State<GamePage>`。這個新類別將用來保存可變狀態，以及
   `build` 方法。請將 `build` 方法和所有
   *在元件上實例化* 的屬性，從 `GamePage` 移動到 state 物件中。  
3. 在 `GamePage` 中實作 `createState()` 方法，該方法會回傳
   `_GamePageState` 的實例。

:::tip 快速輔助

你不需要手動進行這些操作，因為 Flutter 的 VS Code 和 IntelliJ 外掛提供了[「快速輔助」]["quick assists"]功能，可以自動幫你完成這個轉換。

:::

你修改後的程式碼應該如下所示：

```dart
class GamePage extends StatefulWidget {
  GamePage({super.key});

  @override
  State<GamePage> createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  final Game _game = Game();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          for (var guess in _game.guesses)
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (var letter in guess)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 2.5, vertical: 2.5),
                    child: Tile(letter),
                  )
              ],
            ),
          GuessInput(
            onSubmitGuess: (_) {
              // TODO, handle guess
              print(guess); // Temporary
            },
          ),
        ],
      ),
    );
  }
}
```

## 使用 `setState` 更新 UI

每當你變更 `State` 物件時，都必須呼叫 [`setState`][`setState`]，以通知框架更新使用者介面，並再次呼叫
`State` 的 `build` 方法。

在這個應用程式中，當使用者進行猜測時，他們所猜的單字會儲存在 `Game` 物件上，
而該物件是 `GamePage` 類別中的一個屬性，因此這屬於可能會改變並需要 UI 更新的狀態。
當這個狀態被變更時，格線應該要重新繪製，以顯示使用者的猜測。

為了實作這個功能，請更新傳遞給 `GuessInput` 的回呼函式。該函式需要呼叫 `setState`，
並且在 `setState` 內執行判斷使用者猜測是否正確的邏輯。

:::note

遊戲邏輯已被抽象化到 [`Game` 物件][`Game` object] 中，這超出了本教學的範圍。

:::

請更新你的程式碼：

```dart
class GamePage extends StatefulWidget {
  GamePage({super.key});

  @override
  State<GamePage> createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  final Game _game = Game();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          for (var guess in _game.guesses)
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (var letter in guess)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 2.5, vertical: 2.5),
                    child: Tile(letter),
                  )
              ],
            ),
          GuessInput(
           onSubmitGuess: (String guess) {
              setState(() { // NEW
                _game.guess(guess); 
              });
            },
          ),
        ],
      ),
    );
  }
}
```

現在，當你在`TextInput`中輸入合法的猜測並提交時，應用程式會反映使用者的猜測。如果你呼叫`_game.guess(guess)`*而沒有*呼叫`setState`，內部的遊戲資料雖然會改變，但 Flutter 不會知道需要重新繪製螢幕，使用者也不會看到任何更新。

["quick assists"]: /tools/android-studio#assists-quick-fixes
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`setState`]: {{site.api}}/flutter/widgets/State/setState.html
[`Game` object]: https://github.com/flutter/demos
