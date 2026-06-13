---
title: 元件（Widget）測試簡介
description: 進一步了解 Flutter 中的元件（Widget）測試。
shortTitle: 簡介
---

<?code-excerpt path-base="cookbook/testing/widget/introduction/"?>

在 [單元測試簡介](/cookbook/testing/unit/introduction) 教學中，
你已經學會如何使用 `test` 套件來測試 Dart 類別。
若要測試元件（Widget）類別，你還需要一些由
[`flutter_test`]({{site.api}}/flutter/flutter_test/flutter_test-library.html) 套件（隨 Flutter SDK 一同提供）所提供的額外工具。

`flutter_test` 套件為元件（Widget）測試提供了以下工具：

  * [`WidgetTester`]({{site.api}}/flutter/flutter_test/WidgetTester-class.html) 可在測試環境中建立並互動操作元件（Widget）。
  * [`testWidgets()`]({{site.api}}/flutter/flutter_test/testWidgets.html) 函式會自動為每個測試案例建立新的 `WidgetTester`，
    並取代一般的 `test()` 函式使用。
  * [`Finder`]({{site.api}}/flutter/flutter_test/Finder-class.html) 類別可用於在測試環境中搜尋元件（Widget）。
  * 元件專用的 [`Matcher`]({{site.api}}/flutter/package-matcher_matcher/Matcher-class.html) 常數有助於驗證
    `Finder` 是否能在測試環境中定位到一個或多個元件（Widget）。

如果你覺得這些內容有些複雜，別擔心。你將會在本教學中學會這些工具如何整合運作，步驟如下：

  1. 新增 `flutter_test` 相依套件。
  2. 建立要測試的元件（Widget）。
  3. 建立 `testWidgets` 測試。
  4. 使用 `WidgetTester` 建立元件（Widget）。
  5. 使用 `Finder` 搜尋元件（Widget）。
  6. 使用 `Matcher` 驗證元件（Widget）。

## 1. 新增 `flutter_test` 相依套件

在撰寫測試之前，請在 `pubspec.yaml` 檔案的 `dev_dependencies` 區段中
加入 `flutter_test` 相依套件。
如果你是透過命令列工具或程式碼編輯器建立新的 Flutter 專案，這個相依套件應該已經自動加入。

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
```

## 2. 建立要測試的元件（Widget）

接下來，建立一個用於測試的元件。針對本教學範例，
請建立一個會顯示 `title` 和 `message` 的元件。

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

有了要測試的元件（Widget）後，首先可以撰寫你的第一個測試。
使用`flutter_test`套件所提供的[`testWidgets()`]({{site.api}}/flutter/flutter_test/testWidgets.html)函式來定義一個測試。
`testWidgets`函式可讓你定義元件測試，並建立`WidgetTester`以供操作。

這個測試會驗證`MyWidget`是否正確顯示指定的標題與訊息。
測試標題也已相應命名，並會在下一節中補充內容。

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

接下來，請利用 `WidgetTester` 所提供的 [`pumpWidget()`]({{site.api}}/flutter/flutter_test/WidgetTester/pumpWidget.html) 方法，在測試環境中建立 `MyWidget`。
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

### 關於 pump() 方法的說明

在最初呼叫 `pumpWidget()` 之後，`WidgetTester` 提供了額外的方法來重新建構同一個元件（Widget）。這在你處理 `StatefulWidget` 或動畫（Animation）時特別有用。

例如，點擊按鈕會呼叫 `setState()`，但在測試環境中 Flutter 不會自動重新建構你的元件。你可以使用以下其中一種方法，要求 Flutter 重新建構元件。

[`tester.pump(Duration duration)`]({{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding/pump.html)
: 排程一個 frame 並觸發元件的重新建構。如果有指定 `Duration`，則會將時鐘推進該段時間並排程一個 frame。即使 duration 超過單一 frame 的長度，也不會排程多個 frame。

:::note
為了啟動動畫（Animation），你需要先呼叫一次 `pump()`（不指定 duration）來啟動 ticker。否則動畫不會開始。
:::

[`tester.pumpAndSettle()`]({{site.api}}/flutter/flutter_test/WidgetTester/pumpAndSettle.html)
: 會以指定的 duration 重複呼叫 `pump()`，直到沒有任何 frame 被排程。基本上，這會等待所有動畫（Animation）完成。

這些方法讓你能夠細緻地控制建構生命週期，在測試時特別實用。

## 5. 使用 `Finder` 搜尋我們的元件（Widget）

將元件放入測試環境後，可以透過元件樹搜尋 `title` 和 `message` 文字元件（Text Widgets），方法是使用 `Finder`。這可以驗證元件是否正確顯示。

為此，請使用 `flutter_test` 套件提供的頂層 [`find()`]({{site.api}}/flutter/flutter_test/find-constant.html) 方法來建立 `Finders`。由於你知道要找的是 `Text` 元件（Widgets），因此可以使用 [`find.text()`]({{site.api}}/flutter/flutter_test/CommonFinders/text.html) 方法。

如需關於 `Finder` 類別的更多資訊，請參閱 [Finding widgets in a widget test](/cookbook/testing/widget/finders) 教學。

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

最後，請使用 `Matcher` 常數（由 `flutter_test` 提供）來驗證標題與訊息 `Text` 元件（Widgets）是否出現在螢幕上。  
`Matcher` 類別是 `test` 套件的核心組成部分，並提供一種通用方式來驗證指定的值是否符合預期。

請確保這些元件（Widgets）在螢幕上**僅出現一次**。  
為此，請使用 [`findsOneWidget`]({{site.api}}/flutter/flutter_test/findsOneWidget-constant.html) `Matcher`。

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

除了 `findsOneWidget` 之外，`flutter_test` 還提供了其他常見情境下可用的比對器（matchers）。

[`findsNothing`]({{site.api}}/flutter/flutter_test/findsNothing-constant.html)
: 驗證沒有找到任何元件（Widgets）。

[`findsWidgets`]({{site.api}}/flutter/flutter_test/findsWidgets-constant.html)
: 驗證至少找到一個元件（Widgets）。

[`findsNWidgets`]({{site.api}}/flutter/flutter_test/findsNWidgets.html)
: 驗證找到特定數量的元件（Widgets）。

[`matchesGoldenFile`]({{site.api}}/flutter/flutter_test/matchesGoldenFile.html)
: 驗證元件（Widget）的渲染結果是否與特定的點陣圖圖片（即「golden file」測試）相符。

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


(https://docs.flutter.dev/testing)
[`find()`]: {{site.api}}/flutter/flutter_test/find-constant.html
# Widget 測試簡介

[`find.text()`]: {{site.api}}/flutter/flutter_test/CommonFinders/text.html
在開發 Flutter 應用程式時，撰寫測試可以幫助你確保元件（Widget）如預期般運作，並且在未來修改程式碼時，能夠快速發現潛在問題。

[`findsNothing`]: {{site.api}}/flutter/flutter_test/findsNothing-constant.html
Flutter 提供了多種測試類型，包括單元測試、元件（Widget）測試，以及整合測試。本章將重點介紹元件（Widget）測試，這類測試可以驗證單一元件或多個元件之間的互動。

[`findsOneWidget`]: {{site.api}}/flutter/flutter_test/findsOneWidget-constant.html
元件（Widget）測試（有時也稱為元件測試）介於單元測試和整合測試之間。它們比單元測試更全面，因為可以驗證多個元件之間的互動；但又比整合測試更輕量，因為它們只會測試應用程式中的一小部分。

[`findsNWidgets`]: {{site.api}}/flutter/flutter_test/findsNWidgets.html
在元件（Widget）測試中，你可以模擬使用者與元件互動，例如點擊按鈕、輸入文字，並檢查畫面上的變化是否正確。

[`findsWidgets`]: {{site.api}}/flutter/flutter_test/findsWidgets-constant.html
這些測試會在虛擬環境（不需實際裝置或模擬器）中執行，因此速度非常快，適合在開發過程中頻繁執行。

[`matchesGoldenFile`]: {{site.api}}/flutter/flutter_test/matchesGoldenFile.html
要撰寫元件（Widget）測試，請使用 Flutter 的 `flutter_test` 套件。該套件提供了許多工具和 API，協助你建立和驗證元件（Widget）。

[`Finder`]: {{site.api}}/flutter/flutter_test/Finder-class.html
以下章節將介紹如何建立基本的元件（Widget）測試，包括：

[Finding widgets in a widget test]: /cookbook/testing/widget/finders
- 建立測試檔案
- 使用 `WidgetTester` 操作元件（Widget）
- 驗證元件（Widget）的狀態與外觀

[`flutter_test`]: {{site.api}}/flutter/flutter_test/flutter_test-library.html
你將學會如何：

[introduction to unit testing]: /cookbook/testing/unit/introduction
- 測試元件（Widget）是否正確顯示
- 模擬使用者互動
- 驗證狀態變化

[`Matcher`]: {{site.api}}/flutter/package-matcher_matcher/Matcher-class.html
這些技巧將幫助你撰寫更可靠且可維護的 Flutter 應用程式。

[`pumpWidget()`]: {{site.api}}/flutter/flutter_test/WidgetTester/pumpWidget.html
> 提示：除了元件（Widget）測試外，請考慮也撰寫單元測試與整合測試，以全面覆蓋你的應用程式。

[`tester.pump(Duration duration)`]: {{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding/pump.html
更多元件（Widget）測試的詳細資訊，請參考 [Flutter 官方文件](https://docs.flutter.dev/testing)。

[`tester.pumpAndSettle()`]: {{site.api}}/flutter/flutter_test/WidgetTester/pumpAndSettle.html
接下來，讓我們開始撰寫第一個元件（Widget）測試。

[`testWidgets()`]: {{site.api}}/flutter/flutter_test/testWidgets.html
[`WidgetTester`]: {{site.api}}/flutter/flutter_test/WidgetTester-class.html
