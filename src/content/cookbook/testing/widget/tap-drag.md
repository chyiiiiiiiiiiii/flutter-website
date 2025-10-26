---
title: 點擊、拖曳與輸入文字
description: 如何測試元件（Widgets）的使用者互動。
---

<?code-excerpt path-base="cookbook/testing/widget/tap_drag/"?>

許多元件（Widgets）不僅用來顯示資訊，也會回應使用者的互動。這包括可點擊的按鈕，以及用於輸入文字的 [`TextField`][`TextField`]。

為了測試這些互動行為，你需要在測試環境中模擬這些操作。為此，請使用 [`WidgetTester`][`WidgetTester`] 函式庫。

`WidgetTester` 提供了輸入文字、點擊以及拖曳等方法。

* [`enterText()`][`enterText()`]
* [`tap()`][`tap()`]
* [`drag()`][`drag()`]

在許多情況下，使用者互動會更新應用程式的狀態。在測試環境中，Flutter 並不會在狀態變更時自動重建元件。為了確保在模擬使用者互動後元件樹會被重建，請呼叫 `WidgetTester` 所提供的 [`pump()`][`pump()`] 或 [`pumpAndSettle()`][`pumpAndSettle()`] 方法。
本教學將採用以下步驟：

  1. 建立要測試的元件（Widget）。
  2. 在文字欄位（text field）中輸入文字。
  3. 確認點擊按鈕會新增待辦事項。
  4. 確認滑動刪除會移除待辦事項。

## 1. 建立要測試的元件（Widget）

在這個範例中，
我們會建立一個基本的待辦事項（todo）應用程式，並測試三個功能：

  1. 在 `TextField` 中輸入文字。
  2. 點擊 `FloatingActionButton`，將文字新增到待辦清單中。
  3. 透過滑動刪除，將項目從清單中移除。

為了聚焦於測試，
本教學不會詳細說明如何建立這個待辦事項應用程式。
若想進一步了解此應用程式的建構方式，
請參考以下相關教學：

* [Create and style a text field][Create and style a text field]
* [Handle taps][Handle taps]
* [Create a basic list][Create a basic list]
* [Implement swipe to dismiss][Implement swipe to dismiss]

<?code-excerpt "test/main_test.dart (TodoList)"?>
```dart
class TodoList extends StatefulWidget {
  const TodoList({super.key});

  @override
  State<TodoList> createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> {
  static const _appTitle = 'Todo List';
  final todos = <String>[];
  final controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _appTitle,
      home: Scaffold(
        appBar: AppBar(title: const Text(_appTitle)),
        body: Column(
          children: [
            TextField(controller: controller),
            Expanded(
              child: ListView.builder(
                itemCount: todos.length,
                itemBuilder: (context, index) {
                  final todo = todos[index];

                  return Dismissible(
                    key: Key('$todo$index'),
                    onDismissed: (direction) => todos.removeAt(index),
                    background: Container(color: Colors.red),
                    child: ListTile(title: Text(todo)),
                  );
                },
              ),
            ),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            setState(() {
              todos.add(controller.text);
              controller.clear();
            });
          },
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}
```

## 2. 在文字欄位 (text field) 輸入文字

現在你已經有了一個待辦事項應用程式，開始撰寫測試吧。
首先，將文字輸入到`TextField`中。

你可以透過以下步驟完成這個任務：

  1. 在測試環境中建立元件（Widget）。
  2. 使用`WidgetTester`的 [`enterText()`][`enterText()`] 方法。

<?code-excerpt "test/main_steps.dart (TestWidgetStep2)"?>
```dart
testWidgets('Add and remove a todo', (tester) async {
  // Build the widget
  await tester.pumpWidget(const TodoList());

  // Enter 'hi' into the TextField.
  await tester.enterText(find.byType(TextField), 'hi');
});
```

:::note
本教學範例是在先前的元件（Widget）測試教學基礎上進行的。  
若要瞭解元件測試的核心概念，請參考以下教學：

* [元件測試介紹][Introduction to widget testing]
* [在元件測試中尋找元件][Finding widgets in a widget test]
:::

## 3. 確認點擊按鈕會新增待辦事項

在將文字輸入到`TextField`之後，請確認點擊`FloatingActionButton`會將項目新增到清單中。

這包含三個步驟：

 1. 使用 [`tap()`][`tap()`] 方法點擊新增按鈕。
 2. 當狀態改變後，使用 [`pump()`][`pump()`] 方法重新建構元件（Widget）。
 3. 確認清單項目已顯示在螢幕上。

<?code-excerpt "test/main_steps.dart (TestWidgetStep3)"?>
```dart
testWidgets('Add and remove a todo', (tester) async {
  // Enter text code...

  // Tap the add button.
  await tester.tap(find.byType(FloatingActionButton));

  // Rebuild the widget after the state has changed.
  await tester.pump();

  // Expect to find the item on screen.
  expect(find.text('hi'), findsOneWidget);
});
```

## 4. 確認滑動刪除能移除待辦事項

最後，請確認對待辦事項項目執行滑動刪除（swipe-to-dismiss）操作時，該項目會從清單中移除。這包含三個步驟：

  1. 使用 [`drag()`][`drag()`] 方法來執行滑動刪除操作。
  2. 使用 [`pumpAndSettle()`][`pumpAndSettle()`] 方法，持續重建元件樹（widget tree），直到刪除動畫（Animation）完成。
  3. 確認該項目已不再顯示於螢幕上。

<?code-excerpt "test/main_steps.dart (TestWidgetStep4)"?>
```dart
testWidgets('Add and remove a todo', (tester) async {
  // Enter text and add the item...

  // Swipe the item to dismiss it.
  await tester.drag(find.byType(Dismissible), const Offset(500, 0));

  // Build the widget until the dismiss animation ends.
  await tester.pumpAndSettle();

  // Ensure that the item is no longer on screen.
  expect(find.text('hi'), findsNothing);
});
```

## 完整範例

<?code-excerpt "test/main_test.dart"?>
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Add and remove a todo', (tester) async {
    // Build the widget.
    await tester.pumpWidget(const TodoList());

    // Enter 'hi' into the TextField.
    await tester.enterText(find.byType(TextField), 'hi');

    // Tap the add button.
    await tester.tap(find.byType(FloatingActionButton));

    // Rebuild the widget with the new item.
    await tester.pump();

    // Expect to find the item on screen.
    expect(find.text('hi'), findsOneWidget);

    // Swipe the item to dismiss it.
    await tester.drag(find.byType(Dismissible), const Offset(500, 0));

    // Build the widget until the dismiss animation ends.
    await tester.pumpAndSettle();

    // Ensure that the item is no longer on screen.
    expect(find.text('hi'), findsNothing);
  });
}

class TodoList extends StatefulWidget {
  const TodoList({super.key});

  @override
  State<TodoList> createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> {
  static const _appTitle = 'Todo List';
  final todos = <String>[];
  final controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _appTitle,
      home: Scaffold(
        appBar: AppBar(title: const Text(_appTitle)),
        body: Column(
          children: [
            TextField(controller: controller),
            Expanded(
              child: ListView.builder(
                itemCount: todos.length,
                itemBuilder: (context, index) {
                  final todo = todos[index];

                  return Dismissible(
                    key: Key('$todo$index'),
                    onDismissed: (direction) => todos.removeAt(index),
                    background: Container(color: Colors.red),
                    child: ListTile(title: Text(todo)),
                  );
                },
              ),
            ),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            setState(() {
              todos.add(controller.text);
              controller.clear();
            });
          },
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}
```

[Create a basic list]: /cookbook/lists/basic-list
[Create and style a text field]: /cookbook/forms/text-input
[`drag()`]: {{site.api}}/flutter/flutter_test/WidgetController/drag.html
[`enterText()`]: {{site.api}}/flutter/flutter_test/WidgetTester/enterText.html
[Finding widgets in a widget test]: /cookbook/testing/widget/finders
[Handle taps]: /cookbook/gestures/handling-taps
[Implement swipe to dismiss]: /cookbook/gestures/dismissible
[Introduction to widget testing]: /cookbook/testing/widget/introduction
[`pump()`]: {{site.api}}/flutter/flutter_test/WidgetTester/pump.html
[`pumpAndSettle()`]: {{site.api}}/flutter/flutter_test/WidgetTester/pumpAndSettle.html
[`tap()`]: {{site.api}}/flutter/flutter_test/WidgetController/tap.html
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
[`WidgetTester`]: {{site.api}}/flutter/flutter_test/WidgetTester-class.html

