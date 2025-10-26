---
title: 取得文字欄位的值
description: 如何從文字欄位 (text field) 取得文字。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/forms/retrieve_input"?>

在本教學中，
你將學習如何透過以下步驟，
取得使用者在文字欄位 (text field) 中輸入的文字：

  1. 建立`TextEditingController`。
  2. 將`TextEditingController`提供給`TextField`。
  3. 顯示文字欄位目前的值。

## 1. 建立`TextEditingController`

若要取得使用者在文字欄位 (text field) 中輸入的文字，
請建立一個[`TextEditingController`][`TextEditingController`]，
並將其提供給`TextField`或`TextFormField`。

:::important
當你不再使用`TextEditingController`時，請呼叫其`dispose`。這能確保釋放該物件所佔用的資源。
:::

<?code-excerpt "lib/starter.dart (Starter)" remove="return Container();"?>
```dart
// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  State<MyCustomForm> createState() => _MyCustomFormState();
}

// Define a corresponding State class.
// This class holds the data related to the Form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Create a text controller and use it to retrieve the current value
  // of the TextField.
  final myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Fill this out in the next step.
  }
}
```

## 2. 將 `TextEditingController` 提供給 `TextField`

現在你已經有了一個 `TextEditingController`，接下來請使用 `controller` 屬性，將它連接到一個文字欄位 (text field)：

<?code-excerpt "lib/step2.dart (TextFieldController)"?>
```dart
return TextField(controller: myController);
```

## 3. 顯示文字欄位 (text field) 的目前值

在將 `TextEditingController` 提供給文字欄位 (text field) 之後，
即可開始讀取值。使用 `TextEditingController` 所提供的 [`text`][`text`]
屬性來取得使用者在文字欄位 (text field) 中輸入的字串 (String)。

以下程式碼會在使用者點擊浮動操作按鈕（floating action button）時，
顯示一個包含目前文字欄位 (text field) 值的提示對話框（alert dialog）。

<?code-excerpt "lib/step3.dart (FloatingActionButton)" replace="/^floatingActionButton\: //g"?>
```dart
FloatingActionButton(
  // When the user presses the button, show an alert dialog containing
  // the text that the user has entered into the text field.
  onPressed: () {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          // Retrieve the text that the user has entered by using the
          // TextEditingController.
          content: Text(myController.text),
        );
      },
    );
  },
  tooltip: 'Show me the value!',
  child: const Icon(Icons.text_fields),
),
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter retrieve input hands-on example in DartPad" run="true"
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
// This class holds the data related to the Form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Create a text controller and use it to retrieve the current value
  // of the TextField.
  final myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Retrieve Text Input')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: TextField(controller: myController),
      ),
      floatingActionButton: FloatingActionButton(
        // When the user presses the button, show an alert dialog containing
        // the text that the user has entered into the text field.
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                // Retrieve the text the that user has entered by using the
                // TextEditingController.
                content: Text(myController.text),
              );
            },
          );
        },
        tooltip: 'Show me the value!',
        child: const Icon(Icons.text_fields),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/retrieve-input.webp" alt="擷取文字輸入 (Retrieve Text Input) 示範" class="site-mobile-screenshot" />
</noscript>


[`text`]: {{site.api}}/flutter/widgets/TextEditingController/text.html
[`TextEditingController`]: {{site.api}}/flutter/widgets/TextEditingController-class.html
