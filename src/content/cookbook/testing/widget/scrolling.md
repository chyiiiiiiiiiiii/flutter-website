---
title: 處理滾動
description: 如何在元件（Widget）測試中處理滾動。
---

<?code-excerpt path-base="cookbook/testing/widget/scrolling/"?>

許多應用程式都包含內容清單，從電子郵件客戶端到音樂應用程式等。
若要透過元件（Widget）測試驗證清單是否包含預期內容，
你需要有方法能夠在清單中滾動，以搜尋特定項目。

若要在整合測試中操作清單滾動，
請使用 [`WidgetTester`][`WidgetTester`] 類別所提供的方法，
該類別包含於 [`flutter_test`][`flutter_test`] 套件中：

在本範例中，你將學習如何在清單中滾動以
驗證特定元件（Widget）是否顯示，
並了解不同做法的優缺點。

本範例包含以下步驟：

1. 建立一個包含項目清單的應用程式。
2. 撰寫一個能夠滾動清單的測試。
3. 執行測試。

## 1. 建立一個包含項目清單的應用程式

本範例會建立一個顯示長清單的應用程式。
為了讓本範例聚焦於測試，請使用
[Work with long lists][Work with long lists] 範例中建立的應用程式。
如果你不確定如何處理長清單，
請參考該範例的介紹。

在你想要於整合測試中互動的元件（Widget）上加入 key。

<?code-excerpt "lib/main.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp(items: List<String>.generate(10000, (i) => 'Item $i')));
}

class MyApp extends StatelessWidget {
  final List<String> items;

  const MyApp({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    const title = 'Long List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: ListView.builder(
          // Add a key to the ListView. This makes it possible to
          // find the list and scroll through it in the tests.
          key: const Key('long_list'),
          itemCount: items.length,
          itemBuilder: (context, index) {
            return ListTile(
              title: Text(
                items[index],
                // Add a key to the Text widget for each item. This makes
                // it possible to look for a particular item in the list
                // and verify that the text is correct
                key: Key('item_${index}_text'),
              ),
            );
          },
        ),
      ),
    );
  }
}
```


## 2. 撰寫一個滾動清單的測試

現在，你可以撰寫一個測試。在這個範例中，會滾動瀏覽項目清單，並驗證特定項目是否存在於清單中。[`WidgetTester`][`WidgetTester`] 類別提供了 [`scrollUntilVisible()`][`scrollUntilVisible()`] 方法，該方法會滾動清單，直到特定的元件（Widget）可見。這非常實用，因為清單中項目的高度可能會因裝置而異。

與其假設你知道清單中所有項目的高度，或假設特定元件在所有裝置上都會被渲染，`scrollUntilVisible()` 方法會重複滾動項目清單，直到找到目標項目為止。

以下程式碼展示如何使用 `scrollUntilVisible()` 方法，在清單中尋找特定項目。這段程式碼位於名為 `test/widget_test.dart` 的檔案中。

<?code-excerpt "test/widget_test.dart (ScrollWidgetTest)"?>
```dart

// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:scrolling/main.dart';

void main() {
  testWidgets('finds a deep item in a long list', (tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      MyApp(items: List<String>.generate(10000, (i) => 'Item $i')),
    );

    final listFinder = find.byType(Scrollable);
    final itemFinder = find.byKey(const ValueKey('item_50_text'));

    // Scroll until the item to be found appears.
    await tester.scrollUntilVisible(itemFinder, 500.0, scrollable: listFinder);

    // Verify that the item contains the correct text.
    expect(itemFinder, findsOneWidget);
  });
}
```

## 3. 執行測試

請在專案根目錄下，使用以下指令來執行測試：

```console
flutter test test/widget_test.dart
```

[`flutter_test`]: {{site.api}}/flutter/flutter_test/flutter_test-library.html
[`WidgetTester`]: {{site.api}}/flutter/flutter_test/WidgetTester-class.html
[`ListView.builder`]: {{site.api}}/flutter/widgets/ListView/ListView.builder.html
[`scrollUntilVisible()`]: {{site.api}}/flutter/flutter_test/WidgetController/scrollUntilVisible.html
[Work with long lists]: /cookbook/lists/long-lists
