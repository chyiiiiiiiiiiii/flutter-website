---
title: 焦點與文字欄位 (text field)
description: 焦點在文字欄位 (text field) 中的運作方式。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/forms/focus/"?>

當文字欄位 (text field) 被選取並開始接受輸入時，
我們稱它具有「焦點」(focus)。
一般來說，使用者會透過點擊來將焦點移到文字欄位，
而開發者則可以透過本教學所介紹的工具，
以程式方式將焦點移到文字欄位。

管理焦點是建立具備直覺流程的表單時非常重要的工具。
舉例來說，假設你有一個搜尋畫面，其中包含一個文字欄位。
當使用者導覽至搜尋畫面時，
你可以將焦點設置在搜尋字詞的文字欄位上。
這樣一來，使用者在畫面顯示後就能立即開始輸入，
無需手動點擊文字欄位。

在本教學中，你將學習如何在文字欄位一顯示時就給予焦點，
以及如何在按下按鈕時將焦點給予文字欄位。

## 文字欄位一顯示就取得焦點

若要讓文字欄位在顯示時立即取得焦點，
請使用 `autofocus` 屬性。

```dart
TextField(
  autofocus: true,
);
```

如需更多有關處理輸入（Input）及建立文字欄位（text field）的資訊，
請參閱本食譜的 [Forms][Forms] 章節。

## 當按鈕被點擊時，聚焦文字欄位（text field）

有時候，您可能不希望立即將焦點移到特定的文字欄位（text field），
而是需要在稍後的某個時間點才將焦點給予文字欄位。
在實際應用中，您也可能需要根據 API 呼叫或驗證錯誤，
將焦點移到指定的文字欄位。
本範例將在使用者按下按鈕後，依照以下步驟將焦點給予文字欄位：

  1. 建立 `FocusNode`。
  2. 將 `FocusNode` 傳遞給 `TextField`。
  3. 當按鈕被點擊時，將焦點給予 `TextField`。

### 1. 建立 `FocusNode`

首先，建立一個 [`FocusNode`][`FocusNode`]。
使用 `FocusNode` 來識別 Flutter「焦點樹（focus tree）」中的特定 `TextField`。
這樣您就能在後續步驟中將焦點給予 `TextField`。

由於焦點節點（focus nodes）是長期存在的物件，建議使用 `State` 物件來管理其生命週期。
請依照以下指引，在 `State` 類別的 `initState()` 方法中建立 `FocusNode` 實例，
並於 `dispose()` 方法中進行清理：

<?code-excerpt "lib/starter.dart (Starter)" remove="return Container();"?>
```dart
// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  State<MyCustomForm> createState() => _MyCustomFormState();
}

// Define a corresponding State class.
// This class holds data related to the form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Define the focus node. To manage the lifecycle, create the FocusNode in
  // the initState method, and clean it up in the dispose method.
  late FocusNode myFocusNode;

  @override
  void initState() {
    super.initState();

    myFocusNode = FocusNode();
  }

  @override
  void dispose() {
    // Clean up the focus node when the Form is disposed.
    myFocusNode.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Fill this out in the next step.
  }
}
```

### 2. 將 `FocusNode` 傳遞給 `TextField`

現在你已經有了 `FocusNode`，
請在 `build()` 方法中，將其傳遞給特定的 `TextField`。

<?code-excerpt "lib/step2.dart (Build)"?>
```dart
@override
Widget build(BuildContext context) {
  return TextField(focusNode: myFocusNode);
}
```

### 3. 當按下按鈕時，讓 `TextField` 取得焦點

最後，當使用者點擊浮動操作按鈕（floating action button）時，讓文字欄位 (text field) 取得焦點。請使用 [`requestFocus()`][`requestFocus()`] 方法來完成這個任務。

<?code-excerpt "lib/step3.dart (FloatingActionButton)" replace="/^floatingActionButton\: //g"?>
```dart
FloatingActionButton(
  // When the button is pressed,
  // give focus to the text field using myFocusNode.
  onPressed: () => myFocusNode.requestFocus(),
),
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter text focus hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Text Field Focus', home: MyCustomForm());
  }
}

// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  State<MyCustomForm> createState() => _MyCustomFormState();
}

// Define a corresponding State class.
// This class holds data related to the form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Define the focus node. To manage the lifecycle, create the FocusNode in
  // the initState method, and clean it up in the dispose method.
  late FocusNode myFocusNode;

  @override
  void initState() {
    super.initState();

    myFocusNode = FocusNode();
  }

  @override
  void dispose() {
    // Clean up the focus node when the Form is disposed.
    myFocusNode.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Text Field Focus')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // The first text field is focused on as soon as the app starts.
            const TextField(autofocus: true),
            // The second text field is focused on when a user taps the
            // FloatingActionButton.
            TextField(focusNode: myFocusNode),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // When the button is pressed,
        // give focus to the text field using myFocusNode.
        onPressed: () => myFocusNode.requestFocus(),
        tooltip: 'Focus Second Text Field',
        child: const Icon(Icons.edit),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/focus.webp" alt="文字欄位焦點示範" class="site-mobile-screenshot" />
</noscript>


[fix has landed]: {{site.repo.flutter}}/pull/50372
[`FocusNode`]: {{site.api}}/flutter/widgets/FocusNode-class.html
[Forms]: /cookbook/forms
[flutter/flutter@bf551a3]: {{site.repo.flutter}}/commit/bf551a31fe7ef45c854a219686b6837400bfd94c
[Issue 52221]: {{site.repo.flutter}}/issues/52221
[`requestFocus()`]: {{site.api}}/flutter/widgets/FocusNode/requestFocus.html
[workaround]: {{site.repo.flutter}}/issues/52221#issuecomment-598244655
