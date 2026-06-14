# 具狀態元件

> 瞭解 StatefulWidget 以及如何重新建置 Flutter UI。



瞭解元件何時需要具有狀態，以及如何使用 setState 觸發 UI 更新。

<YouTubeEmbed id="Gzz8FwSlsUg" title="Stateful widgets in Flutter" fullWidth="true"></YouTubeEmbed>

<SummaryCard>
title: 你將完成的事項
items:
  - title: 瞭解元件何時需要具有狀態
    icon: change_circle
  - title: 將 StatelessWidget 轉換為 StatefulWidget
    icon: swap_horiz
  - title: 使用 setState 觸發 UI 更新
    icon: refresh
</SummaryCard>

---

### 簡介

到目前為止，你的應用程式顯示了一個格狀方格和一個輸入欄位，但方格尚未更新以反映使用者的猜測。當此應用程式完成時，下一個未填滿列中的每個方塊，應在每次提交使用者猜測後更新，具體方式為：

- 顯示正確的字母。
- 變更顏色以反映字母是否正確（綠色）、字母存在於單詞中但位置錯誤（黃色），或字母完全不在單詞中（灰色）。

為了處理這種動態行為，你需要將 `GamePage` 從 `StatelessWidget` 轉換為 [`StatefulWidget`][]。

[`StatefulWidget`]: https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html

### 為何需要具狀態元件？

當元件 (Widget) 的外觀或資料需要在其生命週期內改變時，你需要使用 `StatefulWidget` 以及配套的 `State` 物件。雖然 `StatefulWidget` 本身仍然是不可變的（其屬性在建立後無法更改），但 `State` 物件是長期存在的，可以保存可變的資料，並且當資料發生變化時可以重新建置，從而使 UI 更新。

例如，以下的元件樹展示了一個簡單的應用程式範例，該應用程式使用具狀態元件，其計數器會在按下按鈕時遞增。

<img src='/assets/images/docs/tutorial/widget_tree_stateful.png' width="320px" alt="A diagram of a widget tree with a stateful widget and state object.">

以下是基本的 `StatefulWidget` 結構（目前尚未執行任何操作）：

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

### 將 `GamePage` 轉換為具狀態元件

要將 `GamePage`（或任何其他）元件從無狀態元件轉換為具狀態元件，請執行以下步驟：

1.  將 `GamePage` 改為繼承 `StatefulWidget` 而非 `StatelessWidget`。
1.  建立一個名為 `_GamePageState` 的新類別，繼承 `State<GamePage>`。這個新類別將保存可變的狀態和 `build` 方法。將 `build` 方法以及所有*在元件上實例化的屬性*從 `GamePage` 移至狀態物件。
1.  在 `GamePage` 中實作 `createState()` 方法，該方法會回傳 `_GamePageState` 的實例。

:::tip 快速輔助

你不必手動執行此工作，因為適用於 VS Code 和 IntelliJ 的 Flutter 插件提供了["quick assists"][]，可以為你自動執行此轉換。

:::

修改後的程式碼應如下所示：

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
                    child: Tile(letter.char, letter.type),
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

["quick assists"]: /tools/android-studio#assists-quick-fixes

### 使用 `setState` 更新 UI

每當你修改 `State` 物件時，你必須呼叫 [`setState`][] 來通知框架更新使用者介面並再次呼叫 `build` 方法。

在此應用程式中，當使用者進行猜測時，猜測的單詞會儲存在 `Game` 物件上，該物件是 `GamePage` 類別的屬性，因此是可能會變更並需要 UI 更新的狀態 (state)。當此狀態被修改時，方格應重新繪製以顯示使用者的猜測。

要實作這一點，請更新傳遞給 `GuessInput` 的回呼（callback）函式。該函式需要呼叫 `setState`，並在 `setState` 內部執行邏輯以判斷使用者的猜測是否正確。

:::note

遊戲邏輯已抽象化至 `Game` 物件中，不在本教學的範圍內。

:::

更新你的程式碼：

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
                    child: Tile(letter.char, letter.type),
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

現在，當你在 `TextInput` 中輸入合法的猜測並提交時，應用程式將反映使用者的猜測。如果你在未呼叫 `setState` 的情況下呼叫 `_game.guess(guess)`，內部遊戲資料將會改變，但 Flutter 不會知道需要重新繪製螢幕，使用者也不會看到任何更新。

[`setState`]: https://api.flutter.dev/flutter/widgets/State/setState.html

### 複習

<SummaryCard>
title: 你完成的事項
subtitle: 以下是你在本課程中建置和學習的摘要。
completed: true
items:
  - title: 瞭解元件何時需要具有狀態
    icon: change_circle
    details: >-
      當元件的外觀或資料需要在其生命週期內改變時，你需要 `StatefulWidget`。元件本身保持不可變，但其配套的 `State` 物件保存可變資料並觸發重新建置。
  - title: 將 GamePage 轉換為 StatefulWidget
    icon: swap_horiz
    details: >-
      你透過建立配套的 `_GamePageState` 類別、將 `build` 方法和可變屬性移至其中，以及實作 `createState()`，將 `GamePage` 重構為具狀態元件。IDE 的快速輔助支援可以自動化此轉換。
  - title: 使用 setState 讓應用程式回應使用者輸入
    icon: refresh
    details: >-
      呼叫 `setState` 會告訴 Flutter 重新建置元件的 UI。當使用者提交猜測時，你呼叫 `setState` 來更新遊戲狀態，方格會自動反映新資料。你的應用程式現在真正具有互動性了！
</SummaryCard>

### 自我測驗

<Quiz title="Stateful Widgets Quiz">
- question: 何時應使用 StatefulWidget 而非 StatelessWidget？
  options:
    - text: 當元件需要發出 HTTP 請求時。
      correct: false
      explanation: HTTP 請求可以從任一種元件發出，但狀態變更需要 StatefulWidget。
    - text: 當元件的外觀或資料需要在其生命週期內改變時。
      correct: true
      explanation: 當 UI 必須回應隨時間發生的資料變更時，需要使用 StatefulWidget。
    - text: 當元件擁有超過三個子元件時。
      correct: false
      explanation: 子元件的數量不決定元件是否具有狀態。
    - text: 當元件位於元件樹的根部時。
      correct: false
      explanation: 根元件可以是無狀態的；是否具有狀態取決於資料是否在元件的生命週期內發生變更。
- question: 如果你在 State 物件中變更資料而不呼叫 setState，會發生什麼？
  options:
    - text: 應用程式將崩潰並出現錯誤。
      correct: false
      explanation: 應用程式不會崩潰，但 UI 不會更新。
    - text: 資料在內部發生變更，但 Flutter 不會重新建置 UI 以反映變更。
      correct: true
      explanation: 不呼叫 setState 時，Flutter 不知道需要重新繪製，因此使用者不會看到更新。
    - text: Flutter 自動偵測到變更並重新建置 UI。
      correct: false
      explanation: Flutter 需要 setState 才能知道何時重新建置；它不會自動偵測變更。
    - text: 元件從元件樹中被移除。
      correct: false
      explanation: 元件依然存在；只是在沒有 setState 的情況下不會在視覺上更新。
</Quiz>

