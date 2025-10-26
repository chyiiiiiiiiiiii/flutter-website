---
title: 建立並設計文字欄位 (text field)
description: 如何實作文字欄位 (text field)。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/forms/text_input/"?>

文字欄位 (text fields) 允許使用者在應用程式中輸入文字。
它們常用於建立表單、傳送訊息、打造搜尋體驗等多種情境。
在本教學中，將介紹如何建立並設計文字欄位 (text fields)。

Flutter 提供了兩種文字欄位 (text fields)：
[`TextField`][`TextField`] 與 [`TextFormField`][`TextFormField`]。

## `TextField`

[`TextField`][`TextField`] 是最常用的文字輸入元件 (text input widget)。

預設情況下，`TextField` 會以底線進行裝飾 (underline)。
你可以透過提供 [`InputDecoration`][`InputDecoration`] 作為 `TextField` 的 [`decoration`][`decoration`] 屬性，
來加入標籤 (label)、圖示 (icon)、內嵌提示文字 (inline hint text) 以及錯誤訊息 (error text)。
若要完全移除裝飾（包含底線與為標籤預留的空間），
請將 `decoration` 設為 null。

<?code-excerpt "lib/main.dart (TextField)" replace="/^child\: //g"?>
```dart
TextField(
  decoration: InputDecoration(
    border: OutlineInputBorder(),
    hintText: 'Enter a search term',
  ),
),
```

若要在值變更時取得其值，請參考 [處理文字欄位變更][Handle changes to a text field] 教學。

## `TextFormField`

[`TextFormField`][`TextFormField`] 包裝了一個 `TextField`，並將其與外層的 [`Form`][`Form`] 整合。
這樣可以提供額外的功能，例如驗證，以及與其他
[`FormField`][`FormField`] 元件 (Widgets) 的整合。

<?code-excerpt "lib/main.dart (TextFormField)" replace="/^child\: //g"?>
```dart
TextFormField(
  decoration: const InputDecoration(
    border: UnderlineInputBorder(),
    labelText: 'Enter your username',
  ),
),
```

## 互動範例

<?code-excerpt "lib/main.dart" replace="/^child\: //g"?>
```dartpad title="Flutter text input hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appTitle = 'Form Styling Demo';
    return MaterialApp(
      title: appTitle,
      home: Scaffold(
        appBar: AppBar(title: const Text(appTitle)),
        body: const MyCustomForm(),
      ),
    );
  }
}

class MyCustomForm extends StatelessWidget {
  const MyCustomForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 8, vertical: 16),
          child: TextField(
            decoration: InputDecoration(
              border: OutlineInputBorder(),
              hintText: 'Enter a search term',
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
          child: TextFormField(
            decoration: const InputDecoration(
              border: UnderlineInputBorder(),
              labelText: 'Enter your username',
            ),
          ),
        ),
      ],
    );
  }
}
```

如需有關輸入驗證（input validation）的更多資訊，請參閱
[Building a form with validation][Building a form with validation] 教學範例。


[Building a form with validation]: /cookbook/forms/validation/
[`decoration`]: {{site.api}}/flutter/material/TextField/decoration.html
[`Form`]: {{site.api}}/flutter/widgets/Form-class.html
[`FormField`]: {{site.api}}/flutter/widgets/FormField-class.html
[Handle changes to a text field]: /cookbook/forms/text-field-changes/
[`InputDecoration`]: {{site.api}}/flutter/material/InputDecoration-class.html
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
[`TextFormField`]: {{site.api}}/flutter/material/TextFormField-class.html
