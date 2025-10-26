---
title: 使用者輸入
description: 透過按鈕與文字欄位 (text field) 接收使用者輸入
permalink: /tutorial/user-input/
---

{%- comment %} TODO(ewindmill) embed video {%- endcomment %}

應用程式會在`Tile`元件（Widget）中顯示使用者的猜測，
但還需要讓使用者能夠輸入這些猜測。在本課程中，
你將透過兩個互動元件（Interaction widgets）來實作這個功能：[`TextField`][`TextField`] 和
[`IconButton`][`IconButton`]。

## 實作回呼函式

為了讓使用者能夠輸入他們的猜測，你將建立一個專用的
元件（Widget），名稱為`GuessInput`。首先，請為你的
`GuessInput`元件建立基本結構，並讓它需要一個回呼函式（callback function）作為參數。
請將這個回呼函式命名為`onSubmitGuess`。

請將下列程式碼加入你的`main.dart`檔案中。

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

第 `final void Function(String) onSubmitGuess;` 行
宣告了一個類別的 `final` 成員，名稱為 `onSubmitGuess`，
其型別為 `void Function(String)`。這個函式會接收一個
`String` 參數（即使用者的猜測），且不會回傳任何
值（以 `void` 表示）。

這個 callback（回呼函式）告訴我們，實際處理使用者猜測的邏輯會寫在其他地方。對於互動式元件（Widget）來說，使用 callback 函式是一個良好的做法，可以讓處理互動的元件保持可重複使用，並且與特定功能解耦。

在本課程結束時，傳入的 `onGuessSubmitted` 函式
會在使用者輸入猜測時被呼叫。首先，你需要建立這個元件的視覺部分。以下是這個元件的外觀。

<img src='/assets/images/docs/tutorial/app_with_input.png' alt="A screenshot of the Flutter property editor tool.">

## `TextField` 元件（Widget）

由於文字欄位（text field）和按鈕是並排顯示的，
請將它們建立為 `Row` 元件（Widget）。將你的
`build` 方法中的 `Container` 占位符，替換為包含一個 `Expanded` `TextField` 的 `Row`：

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

你在前面的課程中已經看過其中一些元件（Widgets）：`Row` 和 `Padding`。不過，這裡新增了一個 [`Expanded`][`Expanded`] 元件。當 `Row`（或 `Column`）的子元件被包裹在 `Expanded` 中時，它會指示該子元件填滿主軸（對 `Row` 為水平方向，對 `Column` 為垂直方向）上尚未被其他子元件佔用的所有可用空間。這會讓 `TextField` 伸展以佔據除了其他元件在該 row 中所佔空間以外的所有空間。

:::tip 提示
`Expanded` 通常是解決「[unbounded width/height][unbounded width/height]」例外的方案。
:::

`TextField` 元件也是本課程的新內容，並且是這一章的主角。這是 Flutter 中用於文字輸入的基本元件（Widget）。

目前為止，`TextField` 的設定如下：

* 它有一個圓角邊框裝飾。請注意，這個裝飾的設定方式與 `Container` 和 box 的裝飾方式非常相似。
* 它的 `maxLength` 屬性設為 5，因為這個遊戲只允許猜 5 個字母的單字。

## 使用 `TextEditingController` 處理文字

接下來，你需要一種方式來管理使用者在輸入欄位中輸入的文字。為此，請使用 [`TextEditingController`][`TextEditingController`]。 

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

`TextEditingController` 用於讀取、清除以及修改 `TextField` 中的文字。要使用它，請將其傳遞給 `TextField`。

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
但你還需要知道*何時*擷取這些內容。  

最簡單的方式是使用`TextField.onSubmitted`參數。這個參數接受一個回呼函式（callback），  
而當使用者在文字欄位具有焦點時按下鍵盤上的「Enter」鍵，該回呼函式就會被觸發。  

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

在這個情境下，你可以直接列印傳遞給 `onSubmitted` 回呼函式的 `input`，但為了提供更好的使用者體驗，建議在每次猜測後清除文字內容：你需要一個 `TextEditingController` 來達成這個目的。請依下列方式更新程式碼：

:::note
在 Dart 中，良好的撰寫習慣是對於永遠不會被使用的函式輸入，使用 `_` [萬用字元][wildcard] 來隱藏該輸入。以下範例即採用了這種做法。
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

通常，你會希望某個特定的輸入或元件（Widget）能在不需使用者操作的情況下自動取得焦點。例如，在這個應用程式中，使用者唯一能做的就是輸入猜測，因此`TextField`應該在應用程式啟動時自動取得焦點。而當使用者輸入猜測後，焦點應該持續停留在`TextField`，以便他們可以直接輸入下一個猜測。

為了解決首次焦點的問題，請在`TextField`上設定`autoFocus`屬性。

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

第二個問題需要你使用 [`FocusNode`][`FocusNode`] 來管理鍵盤焦點。你可以使用 `FocusNode` 來要求某個 `TextField` 取得焦點（在行動裝置上會讓鍵盤出現），或是用來判斷某個欄位是否有焦點。

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

現在，當你在輸入文字後按下「Enter」，就可以繼續輸入。

## 使用輸入 (Input)

最後，你需要處理使用者輸入的文字。
回想一下，`GuessInput` 的建構函式需要一個名為 `onGuessSubmitted` 的回呼函式 (callback)。
在 `GuessInput` 中，你需要使用這個回呼函式。
請將 `print` 陳述式替換為呼叫該函式。

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

剩下的功能則是在父層元件（Widget）`GamePage` 中處理。在該類別的 `build` 方法中，請將 `GuessInput` 元件（Widget）新增至 `Column` 的 `children` 清單中，並放在 `Row` 元件（Widgets）之下。

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

目前，這只是在螢幕上印出猜測，以證明輸入已正確連接。要提交猜測，則需要使用`StatefulWidget`的功能，這部分你會在[`StatefulWidget`課程][`StatefulWidget` lesson]中完成。

## 按鈕

為了提升行動裝置上的使用者體驗（UX），並符合常見的使用者介面（UI）設計，還應該加入一個可以提交猜測的按鈕。

Flutter 內建了許多按鈕元件（Widgets），例如 [`TextButton`][`TextButton`]、[`ElevatedButton`][`ElevatedButton`]，以及你現在要使用的按鈕：[`IconButton`][`IconButton`]。這些按鈕（以及許多其他互動元件）除了可選參數外，還需要兩個必要參數：

* 傳遞給`onPressed`的回呼函式（callback function）。
* 作為按鈕內容的元件（通常是`Text`或`Icon`）。

請在`GuessInput`元件的 `children` 清單中新增一個圖示按鈕，並給它一個 [`Icon`][`Icon`] 元件作為顯示內容。`Icon`元件需要一些設定；在這個例子中，`padding`屬性會將按鈕邊緣與包覆的圖示之間的間距設為零。這樣會移除預設間距，讓按鈕變得更小。

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

`IconButton.onPressed` 回呼函式（callback）應該很熟悉：

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

:::note 挑戰題 - 共用「提交時」邏輯

你可能會想：「我們是不是應該把這些方法抽象成一個函式，然後傳給兩個輸入元件 (Input Widgets)？」你確實可以這麼做，而且隨著你的應用程式變得更複雜，這通常也是推薦的做法。不過，`IconButton.onPressed`和`TextField.onSubmitted`這兩個回呼函式的簽名 (signature) 不太一樣，所以並不是完全直觀。

請重構程式碼，讓這些方法中的邏輯不會重複。

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
:::
