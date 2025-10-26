---
title: 使用者輸入
description: 使用按鈕與文字欄位 (text field) 接收使用者輸入
permalink: /tutorial/user-input/
---

{%- comment %} TODO(ewindmill) embed video {%- endcomment %}

應用程式會在`Tile`元件（Widget）中顯示使用者的猜測，
但還需要提供一個方式讓使用者輸入這些猜測。在本課程中，
你將透過兩個互動元件（Interaction widgets）來實作這個功能：[`TextField`][`TextField`] 和
[`IconButton`][`IconButton`]。

## 實作回呼函式（callback functions）

為了讓使用者可以輸入他們的猜測，你將建立一個專用的
元件（Widget），名稱為`GuessInput`。首先，為你的
`GuessInput`元件（Widget）建立基本結構，並讓它需要一個回呼函式作為參數。
請將回呼函式命名為`onSubmitGuess`。

請將以下程式碼加入你的`main.dart`檔案中。

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  @override
  Widget build(BuildContext context) {
    // You'll build the UI in the next steps
    return Container(); // Placeholder
  }
}
```

這一行 `final void Function(String) onSubmitGuess;`  
宣告了一個類別的 `final` 成員，名稱為 `onSubmitGuess`，  
其型別為 `void Function(String)`。這個函式會接收一個  
`String` 參數（即使用者的猜測），並且不會回傳任何值（以 `void` 表示）。

這個 callback（回呼函式）告訴我們，實際處理使用者猜測的邏輯會寫在其他地方。對於互動式元件（Widget）來說，使用 callback 函式是一個良好做法，可以讓處理互動的元件保持可重複使用，並與特定功能解耦。

在本課程結束時，當使用者輸入猜測時，所傳入的 `onGuessSubmitted` 函式就會被呼叫。首先，你需要建立這個元件的視覺部分。這個元件的外觀如下圖所示。

<img src='/assets/images/docs/tutorial/app_with_input.png' alt="A screenshot of the Flutter property editor tool.">

## `TextField` 元件（Widget）

由於文字欄位（text field）和按鈕是並排顯示的，  
請將它們建立為一個 `Row` 元件。將你  
`build` 方法中的 `Container` 占位符，替換為一個包含 `Expanded` `TextField` 的 `Row`：

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

你在前面的課程中已經看過這些元件（Widgets）：`Row` 和 `Padding`。不過，這裡新增了一個 [`Expanded`][`Expanded`] 元件。當 `Row`（或 `Column`）的子元件被包裹在 `Expanded` 中時，這會告訴該子元件填滿主軸（對於 `Row` 是水平方向，對於 `Column` 是垂直方向）上尚未被其他子元件佔用的所有可用空間。這讓 `TextField` 能夠延展，佔據除了其他元件在該 row 內已佔用空間以外的所有空間。

:::tip 提示
`Expanded` 通常是解決「[unbounded width/height][unbounded width/height]」例外狀況的方案。
:::

`TextField` 元件也是本課程的新內容，並且是這一節的主角。這是 Flutter 中用於文字輸入（text input）的基本元件。

目前為止，`TextField` 有以下設定：

* 它有一個圓角邊框裝飾。請注意，這個裝飾的設定方式與 `Container` 以及 box 的裝飾方式非常相似。
* 它的 `maxLength` 屬性設為 5，因為這個遊戲只允許猜 5 個字母的單字。

## 使用 `TextEditingController` 處理文字

接下來，你需要一種方式來管理使用者在輸入欄位（input field）中輸入的文字。為此，請使用 [`TextEditingController`][`TextEditingController`]。 

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

`TextEditingController` 用於讀取、清除及修改 `TextField` 中的文字。要使用它，請將其傳遞給 `TextField`。

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
              inputDecoration: InputDecoration(
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

現在，當使用者輸入文字時，你可以使用`_textEditingController`來擷取輸入內容，  
但你還需要知道*何時*進行擷取。  

最簡單的方式是使用`TextField.onSubmitted`參數。這個參數接受一個回呼函式（callback），  
當使用者在文字欄位具有焦點時，按下鍵盤上的「Enter」鍵，  
就會觸發該回呼函式。  

目前，請在`TextField.onSubmitted`中加入以下回呼函式，以確保這個功能可以正常運作。

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
              inputDecoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              onSubmitted: (String input) { // NEW
                print(_textEditingController.text); // Temporary
              }
            ),
          ),
        ),
      ],
    );
  }
}
```

在這個情境下，你可以直接列印傳遞給 `onSubmitted` 回呼函式的 `input`，但為了提供更好的使用者體驗，建議在每次猜測後清除文字：你需要一個 `TextEditingController` 來達成這個目的。請將程式碼更新如下：

:::note
在 Dart 中，良好的實踐是使用 `_` [萬用字元（wildcard）][wildcard] 來隱藏永遠不會被使用的函式輸入。以下範例即採用了這種做法。
:::


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
              inputDecoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              onSubmitted: (_) { // UPDATED
                print(_textEditingController.text); // Temporary
                _textEditingController.clear(); // NEW
              } 
            ),
          ),
        ),
      ],
    );
  }
}
```

## 取得輸入焦點

通常，你會希望某個特定的輸入元件或元件（Widget）在不需要使用者操作的情況下自動取得焦點。例如，在這個應用程式中，使用者唯一能做的事情就是輸入猜測，因此`TextField`應該在應用程式啟動時自動取得焦點。而在使用者輸入猜測之後，焦點也應該持續停留在`TextField`，以便他們可以繼續輸入下一個猜測。

為了解決首次焦點取得的問題，請在`TextField`上設定`autoFocus`屬性。

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
              inputDecoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
		          controller: _textEditingController,
		          autoFocus: true // NEW
		          onSubmitted: (String input) {
                print(input); // Temporary
                _textEditingController.clear();
              } 
 		        ),
          ),
        ),
      ],
    );
  }
}
```

第二個問題需要你使用 [`FocusNode`][`FocusNode`] 來管理鍵盤焦點。你可以使用 `FocusNode` 來要求某個 `TextField` 取得焦點（在行動裝置上會讓鍵盤顯示），或是用來判斷某個欄位目前是否有焦點。

首先，在 `GuessInput` 類別中建立一個 `FocusNode`：

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  final FocusNode _focusNode = FocusNode(); // NEW

  @override
  Widget build(BuildContext context) {
    // ...
  }
}
```

然後，使用 `FocusNode`，在 controller 被清除後，每當 `TextField` 被提交時請求焦點：

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
              inputDecoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              autoFocus: true
              focusNode: _focusNode, // NEW
              onSubmitted: (String input) {
                print(input); // Temporary
                _textEditingController.clear();
                _focusNode.requestFocus(); // NEW
              } 
            ),
          ),
        ),
      ],
    );
  }
}
```

現在，當你在輸入文字後按下「Enter」，可以繼續輸入。

## 使用輸入

最後，你需要處理使用者所輸入的文字。
回想一下，`GuessInput` 的建構函式需要一個名為 `onGuessSubmitted` 的 callback（回呼函式）。
在 `GuessInput` 中，你需要使用這個 callback。
請將 `print` 陳述式替換為對該函式的呼叫。

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
              inputDecoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              autoFocus: true
              focusNode: _focusNode,
              onSubmitted: (String input) {
                onSubmitGuess(_textEditionController.text.trim())
                _textEditingController.clear();
                _focusNode.requestFocus();
              } 
            ),
          ),
        ),
      ],
    );
  }
}
```

:::note 
`trim` 函式會防止輸入空白字元；否則，使用者可能會輸入四個字母加上一個空白字元。
:::

其餘的功能則由父元件（Widget）`GamePage` 處理。在該類別的 `build` 方法中，請將 `GuessInput` 元件（Widget）新增到 `Column` 的 `children` 清單中的 `Row` 元件下方。

```dart
class GamePage extends StatelessWidget {
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
                for (var letter in guess) Tile(letter),
              ],
            ),
          GuessInput(
            onSubmitGuess: (String guess) {
              // TODO, handle guess
              print(guess); // Temporary
            }
          ),
        ],
      ),
    );
  }
}
```

目前，這個功能僅僅是將猜測結果列印出來，以證明它已經正確連接。要提交猜測，需要使用`StatefulWidget`的功能，這部分你會在[`StatefulWidget`課程][`StatefulWidget` lesson]中學習。

## 按鈕

為了提升行動裝置上的使用者體驗（UX），並符合常見的 UI，應該再加入一個可以提交猜測的按鈕。

Flutter 內建了許多按鈕元件（Widgets），例如 [`TextButton`][`TextButton`]、[`ElevatedButton`][`ElevatedButton`]，以及你現在將使用的 [`IconButton`][`IconButton`]。這些按鈕（還有許多其他互動元件）都需要兩個參數（除了它們的選用參數之外）：

* 傳遞給`onPressed`的回呼函式（callback function）。
* 組成按鈕內容的元件（Widget），通常是`Text`或`Icon`。

請在`GuessInput`元件（Widget）的`children`清單中加入一個圖示按鈕，並給它一個 [`Icon`][`Icon`]元件來顯示。`Icon`元件需要設定；在這個例子中，`padding`屬性會將按鈕邊緣與所包覆圖示之間的內距（padding）設為零。這樣會移除預設的內距，讓按鈕變得更小。

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
        Expanded(...),
        IconButton(
          padding: EdgeInsets.zero,
          icon: Icon(Icons.arrow_circle_up),  
        ),
      ],
    );
  }
}
```

`IconButton.onPressed` 回呼函式（callback）應該看起來很熟悉：

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
        Expanded(...),
        IconButton(
          padding: EdgeInsets.zero,
          icon: Icon(Icons.arrow_circle_up),
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

這個方法的作用與`TextField`上的`onSubmitted`回呼函式相同。

:::note 挑戰題 - 共用「on submitted」邏輯

你可能會想：「我們是否應該將這些方法抽象成一個函式，然後傳遞給兩個輸入元件 (Input Widgets)？」你確實可以這麼做，而且隨著應用程式的複雜度提升，你很可能應該這麼做。不過，需要注意的是，`IconButton.onPressed`和`TextField.onSubmitted`這兩個回呼函式的簽章 (signature) 不同，因此並不是完全直觀可以合併。

請重構程式碼，使這些方法中的邏輯不會重複。

**解答**

```dart
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
              decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              onSubmitted: (String value) {
                _onSubmit();
              },
            ),
          ),
        ),
        IconButton(
          padding: EdgeInsets.zero,
          icon: Icon(Icons.arrow_circle_up),
          onPressed: _onSubmit,
        ),
      ],
    );
  }
}
```

:::


[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
[`IconButton`]: {{site.api}}/flutter/material/IconButton-class.html
[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
[unbounded width/height]: https://www.youtube.com/watch?v=jckqXR5CrPI
[`TextEditingController`]: {{site.api}}/flutter/widgets/TextEditingController-class.html
[wildcard]: {{site.dart-site}}/language/pattern-types#wildcard
[`FocusNode`]: {{site.api}}/flutter/widgets/FocusNode-class.html
[`StatefulWidget` lesson]: /tutorial/stateful-widget
[`Icon`]: {{site.api}}/flutter/material/Icons-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`IconButton`]: {{site.api}}/flutter/material/IconButton-class.html
