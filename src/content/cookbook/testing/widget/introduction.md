---
title: 元件（Widget）測試簡介
description: 進一步了解 Flutter 中的元件（Widget）測試。
shortTitle: 簡介
---

<?code-excerpt path-base="cookbook/testing/widget/introduction/"?>

在 [單元測試簡介][introduction to unit testing] 教學中，
你已學會如何使用 `test` 套件來測試 Dart 類別。
若要測試元件（Widget）類別，你還需要一些由
[`flutter_test`][`flutter_test`] 套件（隨 Flutter SDK 提供）所提供的額外工具。

`flutter_test` 套件為測試元件（Widget）提供了以下工具：

  * [`WidgetTester`][`WidgetTester`] 可讓你在測試環境中建立並互動
    元件（Widget）。
  * [`testWidgets()`][`testWidgets()`] 函式會自動為每個測試案例建立新的 `WidgetTester`，
    並用來取代一般的 `test()` 函式。
  * [`Finder`][`Finder`] 類別可用於在測試環境中搜尋元件（Widget）。
  * 元件專用的 [`Matcher`][`Matcher`] 常數可協助驗證
   `Finder` 是否能在測試環境中定位單一或多個元件（Widget）。

如果你覺得這些資訊有點複雜，別擔心。本教學將透過以下步驟，帶你了解這些工具如何整合運作：

  1. 新增 `flutter_test` 相依套件。
  2. 建立要測試的元件（Widget）。
  3. 建立 `testWidgets` 測試。
  4. 使用 `WidgetTester` 建立元件（Widget）。
  5. 使用 `Finder` 搜尋元件（Widget）。
  6. 使用 `Matcher` 驗證元件（Widget）。

## 1. 新增 `flutter_test` 相依套件

在撰寫測試之前，請先在 `pubspec.yaml` 檔案的 `dev_dependencies` 區段中
加入 `flutter_test` 相依套件。
如果你是透過命令列工具或程式碼編輯器建立新的 Flutter 專案，這個相依套件應該已經預設包含在內。

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
```

## 2. 建立要測試的元件（Widget）

接下來，建立一個用於測試的元件（Widget）。在本教學範例中，
請建立一個顯示 `title` 和 `message` 的元件。

<?code-excerpt "test/main_test.dart (widget)"?>
```dart
class MyWidget extends StatelessWidget {
  const MyWidget({super.key, required this.title, required this.message});

  final String title;
  final String message;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: Text(title)),
        body: Center(child: Text(message)),
      ),
    );
  }
}
```

## 3. 建立`testWidgets`測試

有了要測試的元件（Widget）後，首先撰寫你的第一個測試。
使用`flutter_test`套件所提供的 [`testWidgets()`][`testWidgets()`] 函式來定義一個測試。
`testWidgets` 函式可讓你定義一個
元件測試（widget test），並建立一個`WidgetTester`以供操作。

此測試會驗證`MyWidget`是否正確顯示指定的標題與訊息。
測試標題也相應命名，並將於下一節中補充內容。

<?code-excerpt "test/main_step3_test.dart (main)"?>
```dart
void main() {
  // Define a test. The TestWidgets function also provides a WidgetTester
  // to work with. The WidgetTester allows you to build and interact
  // with widgets in the test environment.
  testWidgets('MyWidget has a title and message', (tester) async {
    // Test code goes here.
  });
}
```

## 4. 使用 `WidgetTester` 建立元件（Widget）

接下來，請利用 `WidgetTester` 所提供的 [`pumpWidget()`][`pumpWidget()`] 方法，在測試環境中建立 `MyWidget`。
`pumpWidget` 方法會建立並渲染所提供的元件（Widget）。

建立一個 `MyWidget` 實例，並顯示 "T" 作為標題，以及 "M" 作為訊息。

<?code-excerpt "test/main_step4_test.dart (main)"?>
```dart
void main() {
  testWidgets('MyWidget has a title and message', (tester) async {
    // Create the widget by telling the tester to build it.
    await tester.pumpWidget(const MyWidget(title: 'T', message: 'M'));
  });
}
```

### 關於 pump() 方法的注意事項

在最初呼叫 `pumpWidget()` 之後，`WidgetTester` 提供了額外的方法來重建相同的元件（Widget）。這在你處理 `StatefulWidget` 或動畫（Animation）時特別有用。

舉例來說，點擊按鈕會呼叫 `setState()`，但在測試環境中 Flutter 並不會自動重建你的元件（Widget）。
你可以使用以下其中一種方法，要求 Flutter 重新建立元件。

[`tester.pump(Duration duration)`][`tester.pump(Duration duration)`]
: 排程一個 frame 並觸發元件（Widget）的重建。
  如果指定了 `Duration`，則會將時鐘推進該段時間並排程一個 frame。即使 duration 長於單一 frame，也只會排程一次 frame，不會排程多個 frame。

:::note
要啟動動畫（Animation），你需要先呼叫一次 `pump()`（不帶 duration 參數），以啟動 ticker。
否則動畫將不會開始。
:::

[`tester.pumpAndSettle()`][`tester.pumpAndSettle()`]
: 會以給定的 duration 重複呼叫 `pump()`，直到沒有任何 frame 被排程為止。
  基本上，這會等待所有動畫（Animation）完成。

這些方法能讓你對元件建構生命週期有更細緻的控制，在測試時特別實用。

## 5. 使用 `Finder` 搜尋我們的元件（Widget）

有了在測試環境中的元件（Widget）後，可以透過元件樹搜尋 `title` 和 `message` 文字元件（Text Widgets），方法是使用 `Finder`。這可以驗證元件是否正確顯示。

為此，請使用 `flutter_test` 套件所提供的頂層 [`find()`][`find()`] 方法來建立 `Finders`。
由於你知道要找的是 `Text` 元件（Widget），因此可以使用 [`find.text()`][`find.text()`] 方法。

關於 `Finder` 類別的更多資訊，請參閱 [Finding widgets in a widget test][Finding widgets in a widget test] 教學。

<?code-excerpt "test/main_step5_test.dart (main)"?>
```dart
void main() {
  testWidgets('MyWidget has a title and message', (tester) async {
    await tester.pumpWidget(const MyWidget(title: 'T', message: 'M'));

    // Create the Finders.
    final titleFinder = find.text('T');
    final messageFinder = find.text('M');
  });
}
```

## 6. 使用 `Matcher` 驗證元件（Widget）

最後，請使用 `Matcher` 常數（由 `flutter_test` 提供）來驗證標題和訊息 `Text` 元件（Widgets）是否出現在螢幕上。  
`Matcher` 類別是 `test` 套件的核心部分，提供了一種通用方式來驗證指定的值是否符合預期。

請確保這些元件（Widgets）在螢幕上恰好出現一次。  
為此，請使用 [`findsOneWidget`][`findsOneWidget`] `Matcher`。

<?code-excerpt "test/main_step6_test.dart (main)"?>
```dart
void main() {
  testWidgets('MyWidget has a title and message', (tester) async {
    await tester.pumpWidget(const MyWidget(title: 'T', message: 'M'));
    final titleFinder = find.text('T');
    final messageFinder = find.text('M');

    // Use the `findsOneWidget` matcher provided by flutter_test to verify
    // that the Text widgets appear exactly once in the widget tree.
    expect(titleFinder, findsOneWidget);
    expect(messageFinder, findsOneWidget);
  });
}
```

### 其他比對器（Matchers）

除了 `findsOneWidget` 之外，`flutter_test` 也提供了額外的比對器（matchers），以因應常見情境。

[`findsNothing`][`findsNothing`]
: 驗證沒有找到任何元件（Widgets）。

[`findsWidgets`][`findsWidgets`]
: 驗證找到一個或多個元件（Widgets）。

[`findsNWidgets`][`findsNWidgets`]
: 驗證找到特定數量的元件（Widgets）。

[`matchesGoldenFile`][`matchesGoldenFile`]
: 驗證元件（Widget）的渲染結果是否符合特定的點陣圖圖片（即「golden file」測試）。

## 完整範例

<?code-excerpt "test/main_test.dart"?>
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  // Define a test. The TestWidgets function also provides a WidgetTester
  // to work with. The WidgetTester allows building and interacting
  // with widgets in the test environment.
  testWidgets('MyWidget has a title and message', (tester) async {
    // Create the widget by telling the tester to build it.
    await tester.pumpWidget(const MyWidget(title: 'T', message: 'M'));

    // Create the Finders.
    final titleFinder = find.text('T');
    final messageFinder = find.text('M');

    // Use the `findsOneWidget` matcher provided by flutter_test to
    // verify that the Text widgets appear exactly once in the widget tree.
    expect(titleFinder, findsOneWidget);
    expect(messageFinder, findsOneWidget);
  });
}

class MyWidget extends StatelessWidget {
  const MyWidget({super.key, required this.title, required this.message});

  final String title;
  final String message;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: Text(title)),
        body: Center(child: Text(message)),
      ),
    );
  }
}
```


[`find()`]: {{site.api}}/flutter/flutter_test/find-constant.html
# 元件（Widget）測試簡介

[`find.text()`]: {{site.api}}/flutter/flutter_test/CommonFinders/text.html
在開發 Flutter 應用程式時，撰寫測試是確保應用程式品質與穩定性的關鍵步驟。本節將介紹如何針對 Flutter 元件（Widget）進行測試。

[`findsNothing`]: {{site.api}}/flutter/flutter_test/findsNothing-constant.html
元件測試（Widget testing）介於單元測試與整合測試之間。它允許你在模擬的環境中建立並互動元件，驗證其行為與 UI 是否符合預期。

[`findsOneWidget`]: {{site.api}}/flutter/flutter_test/findsOneWidget-constant.html
進行元件測試時，通常會使用 Flutter 提供的 `flutter_test` 套件。這個套件提供了多種工具，協助你渲染元件、模擬使用者互動，以及檢查元件樹的狀態。

[`findsNWidgets`]: {{site.api}}/flutter/flutter_test/findsNWidgets.html
元件測試的主要優點包括：

[`findsWidgets`]: {{site.api}}/flutter/flutter_test/findsWidgets-constant.html
- 可以快速驗證 UI 元件的外觀與行為。
- 減少回歸錯誤，提升開發效率。
- 讓重構 UI 時更有信心。

[`matchesGoldenFile`]: {{site.api}}/flutter/flutter_test/matchesGoldenFile.html
與單元測試不同，元件測試會建立一個完整的元件樹，並可模擬多種互動情境。而與整合測試相比，元件測試執行速度更快，且較不依賴外部系統。

[`Finder`]: {{site.api}}/flutter/flutter_test/Finder-class.html
接下來的章節將帶你了解如何撰寫基本的元件測試、模擬使用者操作，以及如何檢查元件的狀態與輸出。

[Finding widgets in a widget test]: /cookbook/testing/widget/finders
## 什麼是元件測試？

[`flutter_test`]: {{site.api}}/flutter/flutter_test/flutter_test-library.html
元件測試是針對單一元件（Widget）或一組元件進行的測試。它會在虛擬環境中建立元件樹，並驗證元件的行為與 UI 呈現是否正確。

[introduction to unit testing]: /cookbook/testing/unit/introduction
例如，你可以測試一個按鈕在被點擊時，是否正確地更新畫面或觸發事件。

[`Matcher`]: {{site.api}}/flutter/package-matcher_matcher/Matcher-class.html
## 何時該撰寫元件測試？

[`pumpWidget()`]: {{site.api}}/flutter/flutter_test/WidgetTester/pumpWidget.html
當你希望確保 UI 元件在不同情境下都能正確運作時，就應該撰寫元件測試。這對於複雜的互動元件或自訂元件特別重要。

[`tester.pump(Duration duration)`]: {{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding/pump.html
## 如何開始？

[`tester.pumpAndSettle()`]: {{site.api}}/flutter/flutter_test/WidgetTester/pumpAndSettle.html
要開始進行元件測試，請確保你的專案已加入 `flutter_test` 套件。你可以在 `pubspec.yaml`（設定檔）中找到相關設定。

[`testWidgets()`]: {{site.api}}/flutter/flutter_test/testWidgets.html
接著，建立測試檔案，並使用 `testWidgets()` 方法來撰寫你的元件測試案例。

[`WidgetTester`]: {{site.api}}/flutter/flutter_test/WidgetTester-class.html
後續章節將提供更多元件測試的實作範例與最佳實踐。
