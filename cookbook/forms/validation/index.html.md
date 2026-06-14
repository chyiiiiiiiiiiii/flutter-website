# 建立具有驗證功能的表單

> 如何建立一個能驗證輸入的表單。



<?code-excerpt path-base="cookbook/forms/validation"?>

應用程式經常需要使用者在文字欄位（text field）中輸入資訊。
例如，你可能會要求使用者以電子郵件地址和密碼組合進行登入。

為了讓應用程式更安全且易於使用，應檢查使用者所提供的資訊是否有效。
如果使用者正確填寫了表單，就處理這些資訊。
如果使用者提交了錯誤的資訊，則顯示友善的錯誤訊息，讓他們知道哪裡出了問題。

在本範例中，你將學習如何透過以下步驟，為只有一個文字欄位的表單新增驗證功能：

  1. 建立一個 `Form` 並搭配 `GlobalKey`。
  2. 新增帶有驗證邏輯的 `TextFormField`。
  3. 建立一個按鈕來驗證並提交表單。

## 1. 建立 `Form` 並搭配 `GlobalKey`

建立一個 [`Form`][]。
`Form` 元件 (Widget) 作為容器，用於群組和驗證多個表單欄位。

建立表單時，請提供一個 [`GlobalKey`][]。
這會為你的 `Form` 分配一個唯一的識別碼。
同時也讓你之後可以驗證該表單。

將表單建立為 `StatefulWidget`。
這樣你就能只建立一次獨特的 `GlobalKey<FormState>()`，
並將其儲存為變數，方便在不同地方存取。

如果你將這個設為 `StatelessWidget`，你就必須*在某處*儲存這個 key。
由於這樣做資源消耗較大，你不會希望每次執行 `build` 方法時都產生新的 `GlobalKey`。

<?code-excerpt "lib/form.dart"?>
```dart
import 'package:flutter/material.dart';

// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  MyCustomFormState createState() {
    return MyCustomFormState();
  }
}

// Define a corresponding State class.
// This class holds data related to the form.
class MyCustomFormState extends State<MyCustomForm> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a `GlobalKey<FormState>`,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return Form(
      key: _formKey,
      child: const Column(
        children: <Widget>[
          // Add TextFormFields and ElevatedButton here.
        ],
      ),
    );
  }
}
```

:::tip
使用 `GlobalKey` 是存取表單的推薦方式。
然而，如果你的元件（Widget）樹較為複雜，
你可以使用 [`Form.of()`][] 方法，
在巢狀元件中存取表單。
:::

## 2. 新增具有驗證邏輯的 `TextFormField`

雖然已經有了 `Form`，
但目前還沒有讓使用者輸入文字的方式。
這正是 [`TextFormField`][] 的用途。
`TextFormField` 元件會渲染一個 Material Design 風格的文字欄位（text field），
並在發生驗證錯誤時顯示錯誤訊息。

你可以透過為 `TextFormField` 提供 `validator()` 函式來驗證輸入內容。
如果使用者的輸入不符合規範，
`validator` 函式會回傳一個包含錯誤訊息的 `String`。
如果沒有錯誤，驗證器必須回傳 null。

在這個範例中，請建立一個 `validator`，確保
`TextFormField` 不為空。如果為空，
則回傳一個友善的錯誤訊息。

<?code-excerpt "lib/main.dart (TextFormField)"?>
```dart
TextFormField(
  // The validator receives the text that the user has entered.
  validator: (value) {
    if (value == null || value.isEmpty) {
      return 'Please enter some text';
    }
    return null;
  },
),
```

## 3. 建立一個按鈕來驗證並提交表單

現在你已經有一個包含文字欄位（text field）的表單，
接下來請提供一個按鈕，讓使用者可以點擊以提交資訊。

當使用者嘗試提交表單時，請檢查表單是否有效。
如果有效，則顯示成功訊息。
如果無效（文字欄位沒有內容），則顯示錯誤訊息。

<?code-excerpt "lib/main.dart (ElevatedButton)" replace="/^child\: //g"?>
```dart
ElevatedButton(
  onPressed: () {
    // Validate returns true if the form is valid, or false otherwise.
    if (_formKey.currentState!.validate()) {
      // If the form is valid, display a snackbar. In the real world,
      // you'd often call a server or save the information in a database.
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Processing Data')),
      );
    }
  },
  child: const Text('Submit'),
),
```

### 這是如何運作的？

要驗證表單，請使用在步驟 1 建立的 `_formKey`。你可以透過 `_formKey.currentState` 存取 [`FormState`][]，這是在建構 `Form` 時由 Flutter 自動建立的。

`FormState` 類別包含 `validate()` 方法。
當呼叫 `validate()` 方法時，它會針對表單中的每個文字欄位（text field）執行 `validator()` 函式。
如果一切都正確，`validate()` 方法會回傳 `true`。
如果有任何文字欄位（text field）包含錯誤，`validate()` 方法會重新建構表單以顯示錯誤訊息，並回傳 `false`。

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter form validation hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appTitle = 'Form Validation Demo';

    return MaterialApp(
      title: appTitle,
      home: Scaffold(
        appBar: AppBar(title: const Text(appTitle)),
        body: const MyCustomForm(),
      ),
    );
  }
}

// Create a Form widget.
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  MyCustomFormState createState() {
    return MyCustomFormState();
  }
}

// Create a corresponding State class.
// This class holds data related to the form.
class MyCustomFormState extends State<MyCustomForm> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a GlobalKey<FormState>,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextFormField(
            // The validator receives the text that the user has entered.
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter some text';
              }
              return null;
            },
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 16),
            child: ElevatedButton(
              onPressed: () {
                // Validate returns true if the form is valid, or false otherwise.
                if (_formKey.currentState!.validate()) {
                  // If the form is valid, display a snackbar. In the real world,
                  // you'd often call a server or save the information in a database.
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Processing Data')),
                  );
                }
              },
              child: const Text('Submit'),
            ),
          ),
        ],
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/form-validation.webp" alt="表單驗證示範" class="site-mobile-screenshot" />
</noscript>

若想了解如何取得這些值，請參考
[取得文字欄位 (text field) 的值][Retrieve the value of a text field] 教學。


[Retrieve the value of a text field]: /cookbook/forms/retrieve-input
[`Form`]: https://api.flutter.dev/flutter/widgets/Form-class.html
[`Form.of()`]: https://api.flutter.dev/flutter/widgets/Form/of.html
[`FormState`]: https://api.flutter.dev/flutter/widgets/FormState-class.html
[`GlobalKey`]: https://api.flutter.dev/flutter/widgets/GlobalKey-class.html
[`TextFormField`]: https://api.flutter.dev/flutter/material/TextFormField-class.html

