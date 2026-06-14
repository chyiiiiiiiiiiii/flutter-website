# 尋找元件 (Widgets)

> 如何使用 Finder 類別來測試元件 (Widgets)。



<?code-excerpt path-base="cookbook/testing/widget/finders/"?>

要在測試環境中定位元件 (Widgets)，請使用 [`Finder`][`Finder`] 類別。雖然你可以自行撰寫 `Finder` 類別，但通常使用 [`flutter_test`][`flutter_test`] 套件所提供的工具來尋找元件會更加方便。

在元件 (Widget) 測試的 `flutter run` 階段中，你也可以互動式地點擊螢幕上的部分區域，讓 Flutter 工具列印出建議的 `Finder`。

本教學將介紹 `flutter_test` 套件所提供的 [`find`][`find`] 常數，並示範如何使用它所提供的一些 `Finders`。如需完整的 Finder 清單，請參閱 [`CommonFinders` 文件][`CommonFinders` documentation]。

如果你不熟悉元件 (Widget) 測試以及 `Finder` 類別的角色，請先參考 [元件測試介紹][Introduction to widget testing] 教學。

本教學包含以下步驟：

  1. 尋找 `Text` 元件 (Widget)。
  2. 尋找具有特定 `Key` 的元件。
  3. 尋找特定的元件實例。

## 1. 尋找 `Text` 元件 (Widget)

在測試時，你經常需要找到包含特定文字的元件 (Widget)。這正是 `find.text()` 方法的用途。它會建立一個 `Finder`，用來搜尋顯示特定 `String` 文字的元件。

<?code-excerpt "test/finders_test.dart (test1)"?>
```dart
testWidgets('finds a Text widget', (tester) async {
  // Build an App with a Text widget that displays the letter 'H'.
  await tester.pumpWidget(const MaterialApp(home: Scaffold(body: Text('H'))));

  // Find a widget that displays the letter 'H'.
  expect(find.text('H'), findsOneWidget);
});
```

## 2. 以特定的 `Key` 尋找元件（Widget）

在某些情況下，你可能希望根據指定給元件（Widget）的 Key 來尋找它。這在顯示多個相同元件實例時特別有用。例如，`ListView` 可能會顯示數個包含相同文字的 `Text` 元件（Widgets）。

在這種情況下，請為清單中的每個元件（Widget）提供一個 `Key`。這樣應用程式就能唯一識別特定元件，讓你在測試環境中更容易找到該元件。

<?code-excerpt "test/finders_test.dart (test2)"?>
```dart
testWidgets('finds a widget using a Key', (tester) async {
  // Define the test key.
  const testKey = Key('K');

  // Build a MaterialApp with the testKey.
  await tester.pumpWidget(MaterialApp(key: testKey, home: Container()));

  // Find the MaterialApp widget using the testKey.
  expect(find.byKey(testKey), findsOneWidget);
});
```

## 3. 尋找特定的元件（Widget）實例

最後，你可能會需要定位某個元件（Widget）的特定實例。
例如，當你建立帶有 `child` 屬性的元件時，若你想確保實際渲染的是 `child` 元件，這會非常有用。

<?code-excerpt "test/finders_test.dart (test3)"?>
```dart
testWidgets('finds a specific instance', (tester) async {
  const childWidget = Padding(padding: EdgeInsets.zero);

  // Provide the childWidget to the Container.
  await tester.pumpWidget(Container(child: childWidget));

  // Search for the childWidget in the tree and verify it exists.
  expect(find.byWidget(childWidget), findsOneWidget);
});
```

## 摘要

`find` 常數由 `flutter_test` 套件提供，
可用多種方式在測試環境中定位元件（Widgets）。
本教學示範了其中三種方法，此外還有更多方法可用於不同目的。

如果上述範例不適用於您的特定情境，
請參閱 [`CommonFinders` 文件][`CommonFinders` documentation]
以檢視所有可用的方法。

## 完整範例

<?code-excerpt "test/finders_test.dart"?>
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('finds a Text widget', (tester) async {
    // Build an App with a Text widget that displays the letter 'H'.
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: Text('H'))));

    // Find a widget that displays the letter 'H'.
    expect(find.text('H'), findsOneWidget);
  });

  testWidgets('finds a widget using a Key', (tester) async {
    // Define the test key.
    const testKey = Key('K');

    // Build a MaterialApp with the testKey.
    await tester.pumpWidget(MaterialApp(key: testKey, home: Container()));

    // Find the MaterialApp widget using the testKey.
    expect(find.byKey(testKey), findsOneWidget);
  });

  testWidgets('finds a specific instance', (tester) async {
    const childWidget = Padding(padding: EdgeInsets.zero);

    // Provide the childWidget to the Container.
    await tester.pumpWidget(Container(child: childWidget));

    // Search for the childWidget in the tree and verify it exists.
    expect(find.byWidget(childWidget), findsOneWidget);
  });
}
```

[`Finder`]: https://api.flutter.dev/flutter/flutter_test/Finder-class.html  
[`CommonFinders` documentation]: https://api.flutter.dev/flutter/flutter_test/CommonFinders-class.html  
[`find`]: https://api.flutter.dev/flutter/flutter_test/find-constant.html  
[`flutter_test`]: https://api.flutter.dev/flutter/flutter_test/flutter_test-library.html  
[Introduction to widget testing]: /cookbook/testing/widget/introduction

