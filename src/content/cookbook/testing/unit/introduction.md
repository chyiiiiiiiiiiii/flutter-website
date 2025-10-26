---
title: 單元測試簡介
description: 如何撰寫單元測試。
shortTitle: 簡介
---

<?code-excerpt path-base="cookbook/testing/unit/counter_app"?>

當你在為應用程式新增更多功能或修改既有功能時，如何確保你的應用程式依然能正常運作？
答案就是撰寫測試。

單元測試（Unit test）非常適合用來驗證單一函式、方法或類別的行為。[`test`][`test`] 套件提供了撰寫單元測試的核心框架，而 [`flutter_test`][`flutter_test`] 套件則提供了更多用於測試元件 (Widgets) 的工具。

本教學將透過以下步驟，示範 `test` 套件所提供的核心功能：

  1. 新增 `test` 或 `flutter_test` 相依套件。
  2. 建立測試檔案。
  3. 建立欲測試的類別。
  4. 為我們的類別撰寫 `test`。
  5. 將多個測試結合在 `group` 中。
  6. 執行測試。

如需有關 test 套件的更多資訊，請參閱 [test package documentation][test package documentation]。

## 1. 新增 test 相依套件

`test` 套件提供了在 Dart 中撰寫測試的核心功能。當你要撰寫可被網頁、伺服器與 Flutter 應用程式共用的套件時，這是最佳的選擇。

若要將 `test` 套件新增為 dev 相依套件，請執行 `flutter pub add`：

```console
$ flutter pub add dev:test
```

## 2. 建立測試檔案

在這個範例中，請建立兩個檔案：`counter.dart` 和 `counter_test.dart`。

`counter.dart` 檔案包含你要進行測試的類別，並位於 `lib` 資料夾中。`counter_test.dart` 檔案則包含實際的測試內容，並放在 `test` 資料夾內。

一般來說，測試檔案應該放在你的 Flutter 應用程式或套件根目錄下的 `test` 資料夾中。測試檔案的檔名應該都以 `_test.dart` 結尾，這是 test runner 在搜尋測試時所遵循的慣例。

完成後，資料夾結構應如下所示：

```plaintext
counter_app/
  lib/
    counter.dart
  test/
    counter_test.dart
```

## 3. 建立要測試的類別

接下來，你需要一個「單元」來進行測試。請記住：「單元」（unit）是指函式、方法或類別的另一種稱呼。在這個範例中，請在`lib/counter.dart`檔案中建立`Counter`類別。它負責將`value`從`0`開始進行遞增與遞減。

<?code-excerpt "lib/counter.dart"?>
```dart
class Counter {
  int value = 0;

  void increment() => value++;

  void decrement() => value--;
}
```

**注意：** 為了簡化說明，本教學並未採用「測試驅動開發」（Test Driven Development, TDD）的方法。如果你對這種開發風格較為熟悉，也可以選擇採用 TDD。

## 4. 為我們的類別撰寫測試

在 `counter_test.dart` 檔案中，撰寫第一個單元測試。測試是透過頂層的 `test` 函式來定義，並且可以使用頂層的 `expect` 函式來檢查結果是否正確。
這兩個函式都來自 `test` 套件。

<?code-excerpt "test/counter_test.dart"?>
```dart
// Import the test package and Counter class
import 'package:counter_app/counter.dart';
import 'package:test/test.dart';

void main() {
  test('Counter value should be incremented', () {
    final counter = Counter();

    counter.increment();

    expect(counter.value, 1);
  });
}
```

## 5. 在`group`中結合多個測試

如果你想要執行一系列相關的測試，可以使用`flutter_test`套件的[`group`][`group`]函式來將測試分類。將測試歸入同一群組後，你可以透過一個指令，對該群組中的所有測試呼叫`flutter test`。

<?code-excerpt "test/group.dart"?>
```dart
import 'package:counter_app/counter.dart';
import 'package:test/test.dart';

void main() {
  group('Test start, increment, decrement', () {
    test('value should start at 0', () {
      expect(Counter().value, 0);
    });

    test('value should be incremented', () {
      final counter = Counter();

      counter.increment();

      expect(counter.value, 1);
    });

    test('value should be decremented', () {
      final counter = Counter();

      counter.decrement();

      expect(counter.value, -1);
    });
  });
}
```

## 6. 執行測試

現在你已經有了一個`Counter`類別以及相對應的測試，
你可以開始執行這些測試。

### 使用 IntelliJ 或 VSCode 執行測試

Flutter 的 IntelliJ 與 VSCode 外掛都支援執行測試。
這通常是在撰寫測試時最好的選擇，因為它能提供最快速的回饋循環，
並且可以設置中斷點進行除錯。

- **IntelliJ**

  1. 開啟`counter_test.dart`檔案
  1. 前往 **Run** > **Run 'tests in counter_test.dart'**。
     你也可以按下對應平台的快捷鍵。

- **VSCode**

  1. 開啟`counter_test.dart`檔案
  1. 前往 **Run** > **Start Debugging**。
     你也可以按下對應平台的快捷鍵。

### 在終端機中執行測試

若要從終端機執行所有測試，
請在專案根目錄下執行以下指令：

```console
flutter test test/counter_test.dart
```

若要執行你放在同一個 `group` 中的所有測試，請在專案根目錄下執行以下指令：

```console
flutter test --plain-name "Test start, increment, decrement"
```

本範例使用了在**第 5 節**中建立的 `group`。

若想進一步了解單元測試（unit tests），你可以執行以下指令：

```console
flutter test --help
```

[`group`]: {{site.api}}/flutter/flutter_test/group.html
[`flutter_test`]: {{site.api}}/flutter/flutter_test/flutter_test-library.html
[`test`]: {{site.pub-pkg}}/test
[test package documentation]: {{site.pub}}/packages/test
