# 測試螢幕方向

> 如何測試應用程式目前是直向（portrait）還是橫向（landscape）模式。



在 Flutter 中，你可以根據目前的[螢幕方向（orientation）][orientation]建立不同的版面配置。例如，當應用程式處於直向模式時，可以顯示兩欄資料；若為橫向模式，則顯示三欄資料。
此外，你也可以撰寫測試，檢查在不同螢幕方向下顯示的欄位數是否正確。

在本教學中，你將學會如何檢查應用程式的螢幕方向是 `portrait` 或 `landscape`，以及每種螢幕方向下顯示了多少欄位。

本教學包含以下步驟：

  1. 建立一個會根據螢幕方向更新內容版面的應用程式。
  1. 建立一個螢幕方向測試群組。
  1. 建立直向模式（portrait orientation）測試。
  1. 建立橫向模式（landscape orientation）測試。
  1. 執行測試。

## 1. 建立一個會根據螢幕方向更新的應用程式

建立一個 Flutter 應用程式，當應用程式處於直向或橫向模式時，會改變顯示的欄位數：

1.  建立一個新的 Flutter 專案，名稱為 `orientation_tests`。

    ```console
    flutter create orientation_tests
    ```

2.  請依照[根據螢幕方向更新 UI][Update the UI based on orientation]中的步驟來設定專案。

## 2. 建立螢幕方向測試群組

在你完成 `orientation_tests` 專案的設定後，請依照以下步驟來為未來的螢幕方向測試進行分組：

1.  在你的 Flutter 專案中，開啟 `test/widget_test.dart`。
1.  將現有內容替換為以下內容：

    <?code-excerpt "cookbook/testing/widget/orientation_tests/test/widget_test.dart (scaffolding)"?>
    ```dart title="widget_test.dart"
    import 'package:flutter/material.dart';
    import 'package:flutter_test/flutter_test.dart';
    import 'package:orientation_tests/main.dart';
    
    void main() {
      group('Orientation', () {
        // ···
      });
    }
    ```

## 3. 建立直向（portrait）螢幕方向測試

將直向螢幕方向測試加入 `Orientation` 群組中。
此測試會確保螢幕方向為 `portrait`，並且
應用程式中僅會顯示 `2` 欄資料：

1.  在 `test/widget_test.dart` 中，將 `Orientation` 群組內的 `...`
    替換為以下測試內容：

    <?code-excerpt "cookbook/testing/widget/orientation_tests/test/widget_test.dart (portrait-mode-test)"?>
    ```dart title="widget_test.dart"
    // Check if portrait mode displays correctly.
    testWidgets('Displays 2 columns in portrait mode', (tester) async {
      // Build the app.
      await tester.pumpWidget(const MyApp());
    
      // Change to portrait.
      tester.view.physicalSize = const Size(600, 800);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(() {
        tester.view.resetPhysicalSize();
      });
      await tester.pump();
    
      // Verify initial orientation is portrait.
      final orientation = MediaQuery.of(
        tester.element(find.byType(OrientationList)),
      ).orientation;
      expect(orientation, Orientation.portrait);
    
      // Verify there are only 2 columns in portrait mode.
      final gridViewFinder = find.byType(GridView);
      final gridView = tester.widget<GridView>(gridViewFinder);
      final delegate =
          gridView.gridDelegate as SliverGridDelegateWithFixedCrossAxisCount;
      expect(delegate.crossAxisCount, 2);
    });
    ```

## 4. 建立橫向（landscape）螢幕方向測試

將橫向螢幕方向測試加入 `Orientation` 群組中。
此測試會確保螢幕方向為 `landscape`，並且
應用程式中只會顯示 `3` 欄資料：

1.  在 `test/widget_test.dart` 中，於 `Orientation` 群組內，
    在橫向測試之後新增以下測試：

    <?code-excerpt "cookbook/testing/widget/orientation_tests/test/widget_test.dart (landscape-mode-test)"?>
    ```dart title="widget_test.dart"
    // Check if landscape mode displays correctly.
    testWidgets('Displays 3 columns in landscape mode', (tester) async {
      // Build the app.
      await tester.pumpWidget(const MyApp());
    
      // Change to landscape.
      tester.view.physicalSize = const Size(800, 600);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(() {
        tester.view.resetPhysicalSize();
      });
      await tester.pump();
    
      // Verify initial orientation is landscape.
      final orientation = MediaQuery.of(
        tester.element(find.byType(OrientationList)),
      ).orientation;
      expect(orientation, Orientation.landscape);
    
      // Verify there are only 3 columns in landscape mode.
      final gridViewFinder = find.byType(GridView);
      final gridView = tester.widget<GridView>(gridViewFinder);
      final delegate =
          gridView.gridDelegate as SliverGridDelegateWithFixedCrossAxisCount;
      expect(delegate.crossAxisCount, 3);
    });
    ```

## 5. 執行測試

請在專案根目錄下，使用以下指令來執行測試：

```console
flutter test test/widget_test.dart
```

## 完整範例

<?code-excerpt "cookbook/testing/widget/orientation_tests/test/widget_test.dart"?>
```dart title="widget_test.dart"
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:orientation_tests/main.dart';

void main() {
  group('Orientation', () {
    // Check if portrait mode displays correctly.
    testWidgets('Displays 2 columns in portrait mode', (tester) async {
      // Build the app.
      await tester.pumpWidget(const MyApp());

      // Change to portrait.
      tester.view.physicalSize = const Size(600, 800);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(() {
        tester.view.resetPhysicalSize();
      });
      await tester.pump();

      // Verify initial orientation is portrait.
      final orientation = MediaQuery.of(
        tester.element(find.byType(OrientationList)),
      ).orientation;
      expect(orientation, Orientation.portrait);

      // Verify there are only 2 columns in portrait mode.
      final gridViewFinder = find.byType(GridView);
      final gridView = tester.widget<GridView>(gridViewFinder);
      final delegate =
          gridView.gridDelegate as SliverGridDelegateWithFixedCrossAxisCount;
      expect(delegate.crossAxisCount, 2);
    });

    // Check if landscape mode displays correctly.
    testWidgets('Displays 3 columns in landscape mode', (tester) async {
      // Build the app.
      await tester.pumpWidget(const MyApp());

      // Change to landscape.
      tester.view.physicalSize = const Size(800, 600);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(() {
        tester.view.resetPhysicalSize();
      });
      await tester.pump();

      // Verify initial orientation is landscape.
      final orientation = MediaQuery.of(
        tester.element(find.byType(OrientationList)),
      ).orientation;
      expect(orientation, Orientation.landscape);

      // Verify there are only 3 columns in landscape mode.
      final gridViewFinder = find.byType(GridView);
      final gridView = tester.widget<GridView>(gridViewFinder);
      final delegate =
          gridView.gridDelegate as SliverGridDelegateWithFixedCrossAxisCount;
      expect(delegate.crossAxisCount, 3);
    });
  });
}
```

<?code-excerpt "cookbook/testing/widget/orientation_tests/lib/main.dart"?>
```dart title="main.dart"
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appTitle = 'Orientation Demo';

    return const MaterialApp(
      title: appTitle,
      home: OrientationList(title: appTitle),
    );
  }
}

class OrientationList extends StatelessWidget {
  final String title;

  const OrientationList({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: OrientationBuilder(
        builder: (context, orientation) {
          return GridView.count(
            // Create a grid with 2 columns in portrait mode, or
            // 3 columns in landscape mode.
            crossAxisCount: orientation == Orientation.portrait ? 2 : 3,
            // Generate 100 widgets that display their index in the list.
            children: List.generate(100, (index) {
              return Center(
                child: Text(
                  'Item $index',
                  style: TextTheme.of(context).headlineLarge,
                ),
              );
            }),
          );
        },
      ),
    );
  }
}
```

[orientation]: https://api.flutter.dev/flutter/widgets/Orientation.html
[Update the UI based on orientation]: /cookbook/design/orientation

