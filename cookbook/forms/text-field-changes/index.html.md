# 處理文字欄位的變更

> 如何偵測文字欄位 (text field) 的變更。



<?code-excerpt path-base="cookbook/forms/text_field_changes/"?>

在某些情境下，你可能會希望每當文字欄位 (text field) 的內容變更時，執行一個回呼（callback）函式。例如，你可能想要建立一個具有自動完成（autocomplete）功能的搜尋螢幕，並在使用者輸入時即時更新搜尋結果。

要如何在每次文字變更時執行回呼（callback）函式呢？
在 Flutter 中，你有兩種選擇：

  1. 為 `TextField` 或 `TextFormField` 提供一個 `onChanged()` callback。
  2. 使用 `TextEditingController`。

## 1. 為 `TextField` 或 `TextFormField` 提供一個 `onChanged()` callback

最簡單的方法是為 [`TextField`][] 或 [`TextFormField`][] 提供一個 [`onChanged()`][] callback。
每當文字內容變更時，該 callback 就會被呼叫。

在這個範例中，每次文字變更時，會將目前的值與文字欄位 (text field) 的長度輸出到主控台。

在處理使用者輸入時，建議使用 [characters][]，因為文字可能包含複雜字元。
這能確保每個字元都能正確地按照使用者所見被計算。

<?code-excerpt "lib/main.dart (TextField1)"?>
```dart
TextField(
  onChanged: (text) {
    print('First text field: $text (${text.characters.length})');
  },
),
```

## 2. 使用 `TextEditingController`

一種更強大但也更繁複的方法，是將 [`TextEditingController`][] 作為 `TextField` 或 `TextFormField` 的 [`controller`][] 屬性提供。

若要在文字變更時收到通知，可以按照以下步驟，使用 [`addListener()`][] 方法來監聽 controller：

  1. 建立 `TextEditingController`。
  2. 將 `TextEditingController` 連接到文字欄位 (text field)。
  3. 建立一個函式來列印最新的值。
  4. 監聽 controller 的變化。

### 建立 `TextEditingController`

建立 `TextEditingController`：

<?code-excerpt "lib/main_step1.dart (Step1)" remove="return Container();"?>
```dart
// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  State<MyCustomForm> createState() => _MyCustomFormState();
}

// Define a corresponding State class.
// This class holds data related to the Form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Create a text controller. Later, use it to retrieve the
  // current value of the TextField.
  final myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is removed from the
    // widget tree.
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Fill this out in the next step.
  }
}
```

:::note
請記得在不再需要 `TextEditingController` 時進行釋放（dispose）。這可確保你釋放該物件所佔用的所有資源。
:::

### 將 `TextEditingController` 連接到文字欄位 (text field)

將 `TextEditingController` 提供給 `TextField` 或 `TextFormField`。當你將這兩個類別串接起來後，就可以開始監聽文字欄位 (text field) 的變化。

<?code-excerpt "lib/main.dart (TextField2)"?>
```dart
TextField(controller: myController),
```

### 建立一個函式來印出最新的值

你需要一個函式，在每次文字變動時執行。
請在 `_MyCustomFormState` 類別中建立一個方法，用來印出目前文字欄位 (text field) 的值。

<?code-excerpt "lib/main.dart (printLatestValue)"?>
```dart
void _printLatestValue() {
  final text = myController.text;
  print('Second text field: $text (${text.characters.length})');
}
```

### 監聽 controller 的變化

最後，監聽 `TextEditingController`，並在文字變更時呼叫
`_printLatestValue()` 方法。為此，請使用
[`addListener()`][] 方法。

當 `_MyCustomFormState` 類別初始化時開始監聽變化，
並在 `_MyCustomFormState` 被釋放（disposed）時停止監聽。

<?code-excerpt "lib/main.dart (init-state)"?>
```dart
@override
void initState() {
  super.initState();

  // Start listening to changes.
  myController.addListener(_printLatestValue);
}
```

<?code-excerpt "lib/main.dart (dispose)"?>
```dart
@override
void dispose() {
  // Clean up the controller when the widget is removed from the widget tree.
  // This also removes the _printLatestValue listener.
  myController.dispose();
  super.dispose();
}
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter text field change hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Retrieve Text Input',
      home: MyCustomForm(),
    );
  }
}

// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  State<MyCustomForm> createState() => _MyCustomFormState();
}

// Define a corresponding State class.
// This class holds data related to the Form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Create a text controller and use it to retrieve the current value
  // of the TextField.
  final myController = TextEditingController();

  @override
  void initState() {
    super.initState();

    // Start listening to changes.
    myController.addListener(_printLatestValue);
  }

  @override
  void dispose() {
    // Clean up the controller when the widget is removed from the widget tree.
    // This also removes the _printLatestValue listener.
    myController.dispose();
    super.dispose();
  }

  void _printLatestValue() {
    final text = myController.text;
    print('Second text field: $text (${text.characters.length})');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Retrieve Text Input')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              onChanged: (text) {
                print('First text field: $text (${text.characters.length})');
              },
            ),
            TextField(controller: myController),
          ],
        ),
      ),
    );
  }
}
```

[`addListener()`]: https://api.flutter.dev/flutter/foundation/ChangeNotifier/addListener.html
[`controller`]: https://api.flutter.dev/flutter/material/TextField/controller.html
[`onChanged()`]: https://api.flutter.dev/flutter/material/TextField/onChanged.html
[`TextField`]: https://api.flutter.dev/flutter/material/TextField-class.html
[`TextEditingController`]: https://api.flutter.dev/flutter/widgets/TextEditingController-class.html
[`TextFormField`]: https://api.flutter.dev/flutter/material/TextFormField-class.html
[characters]: https://pub.dev/packages/characters

