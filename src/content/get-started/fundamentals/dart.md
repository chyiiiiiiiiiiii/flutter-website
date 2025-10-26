---
title: Dart 簡介
description: 認識 Dart 程式語言
prev:
  title: 基礎知識
  path: /get-started/fundamentals
next:
  title: 元件 (Widgets)
  path: /get-started/fundamentals/widgets
---

要開始使用 Flutter，
你需要對 Dart 程式語言有一些基本認識，因為 Flutter
應用程式就是以 Dart 撰寫的。
本頁將會對 Dart 做一個簡單的介紹，
如果你已經能夠輕鬆閱讀
以下的程式碼範例，也可以直接跳過本頁。
你不需要成為 Dart 專家，
也能繼續學習這個系列課程。

## Dart

Flutter 應用程式是使用 [Dart][Dart] 開發的，
這是一種對曾經寫過 Java、JavaScript，
或其他 C 語系語言的人來說會感到熟悉的語言。

:::note
安裝 Flutter 時也會一併安裝 Dart，
因此你不需要另外安裝 Dart。
:::

以下是一個簡單的程式範例，
它會從 dart.dev 取得資料，
解碼回傳的 JSON，
並將結果輸出到主控台。
如果你能夠理解這個程式的內容，
可以直接跳到下一頁。

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class Package {
  final String name;
  final String latestVersion; 
  final String? description;

  Package(this.name, this.latestVersion, {this.description});

  @override
  String toString() {
    return 'Package{name: $name, latestVersion: $latestVersion, description: $description}';
  }
}

void main() async {
  final httpPackageUrl = Uri.https('dart.dev', '/f/packages/http.json');
  final httpPackageResponse = await http.get(httpPackageUrl);
  if (httpPackageResponse.statusCode != 200) {
    print('Failed to retrieve the http package!');
    return;
  }
  final json = jsonDecode(httpPackageResponse.body);
  final package = Package(
    json['name'],
    json['latestVersion'],
    description: json['description'],
  );
  print(package);
}
```

這個程式包含兩個部分：
`Package` 類別宣告，以及商業邏輯，
商業邏輯包含在 [`main`][`main`] 函式中。

`Package` 類別包含了你在 [Dart 類別][classes in Dart] 中常用的許多功能。
這個類別有三個成員，
並定義了一個建構函式和一個方法。

Dart 語言具有 [型別安全][type safe]；它使用
靜態型別檢查來確保
變數的值始終符合
該變數的靜態型別。
在定義類別時，成員標註
`String` 是必要的，
但由於型別推斷，通常可以省略。
在本範例的 `main` 函式中，
有多行是以 `final variableName =` 開頭。
這些行雖然沒有明確指定型別，
但依然是型別安全的。

Dart 也內建了 [嚴格 Null 安全][sound null safety]。
在範例中，`description` 成員
被宣告為 `String?` 型別。
`String?` 結尾的 `?` 表示
這個屬性可以為 null。
另外兩個成員則不能為 null，
如果你嘗試將它們設為 `null`，
程式將無法編譯。
你可以在 `Package` 類別的建構函式中看到這點。
它接受兩個必要的
位置參數，以及一個可選的命名參數。

接下來範例中是 `main` 函式。
所有 Dart 程式，包括 Flutter 應用程式，
都從 `main` 函式開始。
這個函式展示了多項 Dart 語言的基本功能，
包含使用函式庫、標記函式為 async、
呼叫函式、使用 `if` 控制流程語句，
以及更多。

:::note 初始化程式碼該放在哪裡？
啟動版 Flutter 應用程式的主要進入點在 `lib/main.dart`。
預設的 `main` 方法如下所示：

```dart title="lib/main.dart"
void main() {
  runApp(const MyApp());
}       
```

在呼叫 `runApp()` 之前，請進行任何「快速」初始化（少於一至兩幀的時間），
但請注意，此時元件樹（widget tree）尚未建立。
如果你需要執行較耗時的初始化，例如從磁碟或網路載入資料，
請以不會阻塞主 UI 執行緒的方式進行。
如需更多資訊，請參閱 [非同步程式設計][Asynchronous programming]、
[`FutureBuilder`][`FutureBuilder`] API、[延遲載入元件（Deferred components）][Deferred components]，
或 [處理長清單][Working with long lists] cookbook 教學，視需求選用。

每個有狀態元件（stateful widget）都有一個 `initState()` 方法，
該方法會在元件被建立並加入元件樹時呼叫。
你可以覆寫這個方法並在其中執行初始化，
但此方法的第一行 _必須_ 是 `super.initState()`。

最後，熱重載（hot reload）你的應用程式時，
_不會_ 再次呼叫 `initState` 或 `main`。
熱重啟（hot restart）則會呼叫這兩者。
:::

如果你對這些功能還不熟悉，
可以在 [Bootstrap into Dart][Bootstrap into Dart] 頁面找到學習 Dart 的資源。

## 下一步：元件 (Widgets)

本頁介紹 Dart，
幫助你熟悉閱讀 Flutter 與 Dart 程式碼。
如果你對本頁的所有程式碼還不完全理解也沒關係，
只要你對 Dart 語言的_語法_感到自在即可。
在下一節，你將學習 Flutter 應用程式的基礎組件：元件 (Widgets)。

[Asynchronous programming]: {{site.dart-site}}/libraries/async/async-await
[Dart]: {{site.dart-site}}
[Deferred components]: /perf/deferred-components
[`main`]: {{site.dart-site}}/language#hello-world
[classes in Dart]: {{site.dart-site}}/language/classes
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html
[type safe]: {{site.dart-site}}/language/type-system
[sound null safety]: {{site.dart-site}}/null-safety
[Working with long lists]: /cookbook/lists/long-lists
[Bootstrap into Dart]: /resources/bootstrap-into-dart

## 意見回饋

由於本網站區塊仍在持續改進中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="dart"
