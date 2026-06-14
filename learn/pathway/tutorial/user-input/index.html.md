# 使用者輸入

> 使用按鈕和文字欄位接收使用者輸入。



學習建置文字輸入欄位、使用控制器管理文字，以及使用按鈕處理使用者動作。

<SummaryCard>
title: 你將完成的事項
items:
  - title: 使用 TextField 建置文字輸入元件
    icon: text_fields
  - title: 使用 TextEditingController 管理文字
    icon: edit_note
  - title: 控制輸入焦點以提升使用者體驗
    icon: center_focus_strong
  - title: 使用回呼（callback）和按鈕處理使用者動作
    icon: touch_app
</SummaryCard>

---

### 簡介

應用程式將在 `Tile` 元件 (Widget) 中顯示使用者的猜測，
但它需要一種方式讓使用者輸入猜測內容。
在本課中，使用兩個互動元件來建置此功能：
[`TextField`][] 和 [`IconButton`][]。

[`TextField`]: https://api.flutter.dev/flutter/material/TextField-class.html
[`IconButton`]: https://api.flutter.dev/flutter/material/IconButton-class.html

### 實作回呼（callback）函式

為了讓使用者能夠輸入猜測內容，
你將建立一個名為 `GuessInput` 的專用元件。
首先，為你的 `GuessInput` 元件建立基本結構，
該結構需要一個回呼函式作為引數。
將此回呼函式命名為 `onSubmitGuess`。

將以下程式碼新增到你的 `main.dart` 檔案中。

<?code-excerpt "fwe/birdle/lib/step4a_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  @override
  Widget build(BuildContext context) {
    // You'll build the UI in the next steps.
    return Container(); // Placeholder
  }
}
```

`final void Function(String) onSubmitGuess;` 這行
宣告了類別中一個名為 `onSubmitGuess` 的 `final` 成員，
其型別為 `void Function(String)`。
此函式接受一個 `String` 引數（使用者的猜測），
且不回傳任何值（以 `void` 表示）。

此回呼告訴我們，實際處理使用者猜測的邏輯將在其他地方撰寫。
對互動元件而言，使用回呼函式是一種良好的實踐，
可讓處理互動的元件保持可重複使用，
並與任何特定功能解耦。

在本課結束時，當使用者輸入猜測時，
傳入的 `onSubmitGuess` 函式將被呼叫。
首先，你需要建置此元件的視覺部分。
以下是元件完成後的外觀。

<img src='/assets/images/docs/tutorial/app_with_input.png' width="320px" alt="A screenshot of the Flutter property editor tool.">

### `TextField` 元件

由於文字欄位和按鈕並排顯示，
請將它們建立為一個 `Row` 元件。
將 `build` 方法中的 `Container` 佔位符替換為
包含 `Expanded` 的 `TextField` 的 `Row`：

<?code-excerpt "fwe/birdle/lib/step4b_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
```

你在前幾課中已見過其中一些元件：
`Row` 和 `Padding`。不過 [`Expanded`][] 元件是新的。
當 `Row`（或 `Column`）的子元件被 `Expanded` 包裹時，
它會告訴該子元件填滿主軸方向上的所有可用空間
（`Row` 為水平方向，`Column` 為垂直方向），
即其他子元件未佔用的部分。
這使 `TextField` 延伸以佔用所有空間，*除了*
同一列中其他元件所佔用的空間。

:::tip
`Expanded` 通常是解決「[unbounded width/height][]」例外的方案。
:::

`TextField` 元件在本課中也是新的，它是主角。
這是 Flutter 中用於文字輸入的基本元件。

目前，`TextField` 有以下設定。

- 它帶有圓角邊框裝飾。
  請注意，裝飾設定與
  `Container` 和方塊的裝飾方式非常相似。
- 其 `maxLength` 屬性設為 5，因為遊戲
  只允許猜測 5 個字母的單詞。

[`Expanded`]: https://api.flutter.dev/flutter/widgets/Expanded-class.html
[unbounded width/height]: https://www.youtube.com/watch?v=jckqXR5CrPI

### 使用 `TextEditingController` 處理文字

接下來，你需要一種方式來管理
使用者在輸入欄位中輸入的文字。
為此，請使用 [`TextEditingController`][]。

<?code-excerpt "fwe/birdle/lib/step4c_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  // NEW
  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
            ),
          ),
        ),
        //
      ],
    );
  }
}
```

`TextEditingController` 用於
讀取、清除和修改 `TextField` 中的文字。
要使用它，請將其傳入 `TextField`。

<?code-excerpt "fwe/birdle/lib/step4d_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController, // NEW
            ),
          ),
        ),
      ],
    );
  }
}
```

現在，當使用者輸入文字時，你可以
用 `_textEditingController` 擷取它，但
你需要知道 _何時_ 擷取。
對輸入做出反應最簡單的方式是
使用 `TextField.onSubmitted` 引數。
此引數接受一個回呼，當使用者在文字欄位有焦點時
按下鍵盤上的 "Enter" 鍵，該回呼便會被觸發。

目前，請將以下回呼新增到 `TextField.onSubmitted` 來確認其正常運作：

<?code-excerpt "fwe/birdle/lib/step4e_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              onSubmitted: (input) {
                // NEW
                print(_textEditingController.text); // Temporary
              },
            ),
          ),
        ),
      ],
    );
  }
}
```

在這個情況下，
你可以直接印出傳給 `onSubmitted` 回呼的 `input`，
但更好的使用者體驗是在每次猜測後清除文字：
你需要 `TextEditingController` 來完成這件事。請如下更新程式碼：

<?code-excerpt "fwe/birdle/lib/step4f_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              onSubmitted: (_) {
                // UPDATED
                print(_textEditingController.text); // Temporary
                _textEditingController.clear(); // NEW
              },
            ),
          ),
        ),
      ],
    );
  }
}
```

:::note
在 Dart 中，使用 `_` [萬用字元][wildcard] 來
隱藏永遠不會被使用的函式輸入是良好的實踐。
上述範例就是這樣做的。
:::

[`TextEditingController`]: https://api.flutter.dev/flutter/widgets/TextEditingController-class.html
[wildcard]: https://dart.dev/language/variables#wildcard-variables

### 取得輸入焦點

通常，你希望某個特定的輸入或元件
能夠自動取得焦點，而無需使用者採取任何動作。
例如在這個應用程式中，使用者唯一能做的事就是輸入猜測，
因此 `TextField` 應在應用程式啟動時自動取得焦點。
而在使用者輸入猜測後，焦點應留在
`TextField` 中，以便他們輸入下一個猜測。

要解決第一個焦點問題，
請在 `TextField` 上設定 `autofocus` 屬性。

<?code-excerpt "fwe/birdle/lib/step4g_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              autofocus: true, // NEW
              onSubmitted: (input) {
                print(input); // Temporary
                _textEditingController.clear();
              },
            ),
          ),
        ),
      ],
    );
  }
}
```

第二個問題需要你
使用 [`FocusNode`][] 來管理鍵盤焦點。
你可以使用 `FocusNode` 請求 `TextField` 取得焦點
（在行動裝置上會使鍵盤彈出），
或得知某個欄位是否擁有焦點。

首先，在 `GuessInput` 類別中建立一個 `FocusNode`：

<?code-excerpt "fwe/birdle/lib/step4h_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  final FocusNode _focusNode = FocusNode(); // NEW

  @override
  Widget build(BuildContext context) {
    // ...
    return Container();
  }
}
```

然後，在控制器清除後每當 `TextField` 被提交時，
使用 `FocusNode` 請求焦點：

<?code-excerpt "fwe/birdle/lib/step4i_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              autofocus: true,
              focusNode: _focusNode, // NEW
              onSubmitted: (input) {
                print(input); // Temporary
                _textEditingController.clear();
                _focusNode.requestFocus(); // NEW
              },
            ),
          ),
        ),
      ],
    );
  }
}
```

現在，當你輸入文字後按下 <kbd>Enter</kbd> 鍵，
你可以繼續輸入。

[`FocusNode`]: https://api.flutter.dev/flutter/widgets/FocusNode-class.html

### 使用輸入內容

最後，你需要處理使用者輸入的文字。
回想一下，`GuessInput` 的建構函式需要
一個名為 `onSubmitGuess` 的回呼。
在 `GuessInput` 中，你需要使用該回呼。
將 `print` 陳述式替換為對該函式的呼叫。

<?code-excerpt "fwe/birdle/lib/step4j_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              autofocus: true,
              focusNode: _focusNode,
              onSubmitted: (input) {
                onSubmitGuess(_textEditingController.text.trim());
                _textEditingController.clear();
                _focusNode.requestFocus();
              },
            ),
          ),
        ),
      ],
    );
  }
}
```

:::note
`trim` 函式可防止輸入空白字元；
否則使用者可能會輸入四個字母的單詞加上一個空格字元。
:::

其餘功能由父元件 `GamePage` 處理。
在該類別的 `build` 方法中，
在 `Column` 元件子元件清單的 `Row` 元件之後，
新增 `GuessInput` 元件：

<?code-excerpt "fwe/birdle/lib/step4k_main.dart (GamePage)"?>
```dart
class GamePage extends StatelessWidget {
  GamePage({super.key});

  final Game _game = Game();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 5.0,
        children: [
          for (final guess in _game.guesses)
            Row(
              spacing: 5.0,
              children: [
                for (final letter in guess) Tile(letter.char, letter.type),
              ],
            ),
          GuessInput(
            onSubmitGuess: (guess) {
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

目前，這只會印出猜測內容，
以證明連線已正確設定。
提交猜測需要使用 `StatefulWidget` 的功能，
你將在下一課中完成這部分。

### 按鈕

為了改善行動裝置上的使用者體驗（UX）並符合常見的 UI 慣例，
還應該提供一個可以提交猜測的按鈕。

Flutter 內建了許多按鈕元件，例如 [`TextButton`][]、
[`ElevatedButton`][]，以及你現在將使用的：[`IconButton`][]。
所有這些按鈕（以及許多其他互動元件）需要兩個
引數（除了其可選引數之外）：

- 傳遞給 `onPressed` 的回呼函式。
- 組成按鈕內容的元件（通常為 `Text` 或 `Icon`）。

在 `GuessInput` 元件的 `Row` 元件子元件清單中新增一個圖示按鈕，
並為其提供一個 [`Icon`][] 元件來顯示。
`Icon` 元件需要設定；在這個情況下，
`padding` 屬性將按鈕邊緣與其包裹的圖示之間的內距設為零。
這樣可以移除預設內距，使按鈕更小。

<?code-excerpt "fwe/birdle/lib/step4l_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();
  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(child: Container()),
        IconButton(
          padding: EdgeInsets.zero,
          icon: const Icon(Icons.arrow_circle_up),
          onPressed: null,
        ),
      ],
    );
  }
}
```

`IconButton.onPressed` 回呼應該看起來很熟悉：

<?code-excerpt "fwe/birdle/lib/step4m_main.dart (GuessInput)"?>
```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();
  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(child: Container()),
        IconButton(
          padding: EdgeInsets.zero,
          icon: const Icon(Icons.arrow_circle_up),
          onPressed: () {
            onSubmitGuess(_textEditingController.text.trim());
            _textEditingController.clear();
            _focusNode.requestFocus();
          },
        ),
      ],
    );
  }
}
```

此方法與 `TextField` 上的 `onSubmitted` 回呼功能相同。

[`Icon`]: https://api.flutter.dev/flutter/material/Icons-class.html
[`TextButton`]: https://api.flutter.dev/flutter/material/TextButton-class.html
[`ElevatedButton`]: https://api.flutter.dev/flutter/material/ElevatedButton-class.html
[`IconButton`]: https://api.flutter.dev/flutter/material/IconButton-class.html

:::note Challenge - Share "on submitted" logic.

你可能在想：「我們不應該把這些方法抽象成一個
函式，並將它傳遞給兩個輸入嗎？」
你可以這樣做，隨著應用程式複雜度增加，你可能也應該這樣做。
話雖如此，回呼 `IconButton.onPressed` 和 `TextField.onSubmitted` 有
不同的函式簽章，所以這並不是完全直接了當的事。

請重構程式碼，使此方法內的邏輯不重複出現。

**解答：**

<?code-excerpt "fwe/birdle/lib/step4_main.dart (GuessInput)"?>
```dart title="solution.dart" collapsed
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  final FocusNode _focusNode = FocusNode();

  void _onSubmit() {
    onSubmitGuess(_textEditingController.text);
    _textEditingController.clear();
    _focusNode.requestFocus();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              focusNode: _focusNode,
              autofocus: true,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              onSubmitted: (value) {
                _onSubmit();
              },
            ),
          ),
        ),
        IconButton(
          padding: EdgeInsets.zero,
          icon: const Icon(Icons.arrow_circle_up),
          onPressed: _onSubmit,
        ),
      ],
    );
  }
}
```

:::

### 回顧


<SummaryCard>
title: 你完成的事項
subtitle: 以下是你在本課中建置和學習的內容摘要。
completed: true
items:
  - title: 使用 TextField 建置文字輸入元件
    icon: text_fields
    details: >-
      你建立了一個帶有 `TextField` 的 `GuessInput` 元件用於文字輸入。
      你為其設定了圓角邊框、字元限制，並
      使用 `Expanded` 使其填滿列中的可用空間。
  - title: 使用 TextEditingController 管理文字
    icon: edit_note
    details: >-
      `TextEditingController` 讓你可以讀取和修改文字欄位的內容。
      你使用它透過 `.text` 擷取使用者的輸入，並在
      提交後透過 `.clear()` 清除欄位。
  - title: 控制輸入焦點以提升使用者體驗
    icon: center_focus_strong
    details: >-
      你使用 `autofocus` 在啟動時聚焦文字欄位，並使用帶有
      `requestFocus()` 的 `FocusNode` 在每次猜測後維持焦點。
      這些細節讓你的應用程式感覺更靈敏且完善。
  - title: 使用回呼和按鈕處理使用者動作
    icon: touch_app
    details: >-
      為了回應使用者的輸入，
      你指定了 `onSubmitted` 和 `onPressed` 等回呼函式。
      將回呼函式作為建構函式引數傳遞，可讓你的
      元件保持可重複使用，並與特定邏輯解耦。
</SummaryCard>

### 自我測驗

<Quiz title="使用者輸入測驗">
- question: 如何以程式方式讀取或清除 TextField 中的文字？
  options:
    - text: 直接存取 TextField 的 text 屬性。
      correct: false
      explanation: TextField 沒有公開 text 屬性；你需要一個控制器。
    - text: 使用附加到 TextField 的 TextEditingController。
      correct: true
      explanation: TextEditingController 提供 text 屬性來讀取值，以及 clear() 方法來重置它。
    - text: 監聽 onChanged 回呼並將值儲存在變數中。
      correct: false
      explanation: 雖然 onChanged 可用於讀取，但清除需要 TextEditingController。
    - text: 呼叫 TextField.getText() 方法。
      correct: false
      explanation: TextField 沒有 getText 方法；請改用 TextEditingController。
- question: 如何以程式方式將焦點移到特定的 TextField？
  options:
    - text: "直接呼叫 `TextField.focus()`。"
      correct: false
      explanation: TextField 沒有 focus 方法；你需要使用 FocusNode。
    - text: "在執行時將 `autofocus` 屬性設為 true。"
      correct: false
      explanation: "'autofocus' 屬性只在初始建置時有效，無法用於之後移動焦點。"
    - text: "使用 FocusNode 並對其呼叫 `requestFocus()`。"
      correct: true
      explanation: "FocusNode 讓你控制焦點，呼叫 `requestFocus()` 可將焦點移到其關聯的元件。"
    - text: 將 TextField 包裹在 GestureDetector 中並以程式方式點擊。
      correct: false
      explanation: 這不是管理焦點的方式；FocusNode 才是正確的方法。
</Quiz>

