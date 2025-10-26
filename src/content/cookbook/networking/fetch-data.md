---
title: 從網路擷取資料
description: 如何使用 http 套件從網路擷取資料。
---

<?code-excerpt path-base="cookbook/networking/fetch_data/"?>

對於大多數應用程式來說，從網路擷取資料是必要的。
幸運的是，Dart 和 Flutter 提供了像是
`http` 這類工具來處理這類工作。

:::note
你應該避免直接使用 `dart:io` 或 `dart:html`
來發送 HTTP 請求。
這些函式庫依賴於特定平台，
並且綁定於單一實作。
:::

本教學將採用以下步驟：

  1. 新增 `http` 套件。
  2. 使用 `http` 套件發送網路請求。
  3. 將回應轉換為自訂的 Dart 物件。
  4. 使用 Flutter 擷取並顯示資料。

## 1. 新增 `http` 套件

[`http`][`http`] 套件提供了
從網路擷取資料最簡單的方法。

要將 `http` 套件加入為相依套件，
請執行 `flutter pub add`：

```console
$ flutter pub add http
```

匯入 http 套件。

<?code-excerpt "lib/main.dart (Http)"?>
```dart
import 'package:http/http.dart' as http;
```

{% render docs/cookbook/networking/internet-permission.md %}

## 2. 發送網路請求

本教學將說明如何使用 [`http.get()`][`http.get()`] 方法，從 [JSONPlaceholder][JSONPlaceholder] 取得一個範例相簿。

<?code-excerpt "lib/main_step1.dart (fetchAlbum)"?>
```dart
Future<http.Response> fetchAlbum() {
  return http.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1'));
}
```

`http.get()` 方法會回傳一個包含 `Response` 的 `Future`。

* [`Future`][`Future`] 是 Dart 的核心類別之一，用於處理非同步操作。Future 物件代表一個未來某個時間點可能會取得的值或錯誤。
* `http.Response` 類別則包含了從成功的 HTTP 呼叫中取得的資料。

## 3. 將回應轉換為自訂 Dart 物件

雖然發送網路請求很簡單，但直接操作原始的 `Future<http.Response>` 並不方便。
為了讓開發更容易，
可以將 `http.Response` 轉換為 Dart 物件。

### 建立 `Album` 類別

首先，建立一個 `Album` 類別，用來存放網路請求取得的資料。這個類別包含一個工廠建構函式，可從 JSON 建立 `Album`。

使用 [pattern matching][pattern matching] 來轉換 JSON 只是其中一種方式。
如需更多資訊，請參閱完整文章
[JSON and serialization][JSON and serialization]。

<?code-excerpt "lib/main.dart (Album)"?>
```dart
class Album {
  final int userId;
  final int id;
  final String title;

  const Album({required this.userId, required this.id, required this.title});

  factory Album.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {'userId': int userId, 'id': int id, 'title': String title} => Album(
        userId: userId,
        id: id,
        title: title,
      ),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}
```

### 將 `http.Response` 轉換為 `Album`

現在，請依照以下步驟，將 `fetchAlbum()` 函式更新為回傳 `Future<Album>`：

  1. 使用 `dart:convert` 套件，將回應主體轉換為 JSON `Map`。
  2. 如果伺服器確實回傳狀態碼為 200 的 OK 回應，則使用 `fromJson()` 工廠方法，將 JSON `Map` 轉換為 `Album`。
  3. 如果伺服器未回傳狀態碼為 200 的 OK 回應，則拋出例外。
     （即使伺服器回應為 "404 Not Found"，也要拋出例外。不要回傳 `null`。
     這在後續檢查 `snapshot` 中的資料時非常重要，如下所示。）

<?code-excerpt "lib/main.dart (fetchAlbum)"?>
```dart
Future<Album> fetchAlbum() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}
```

太棒了！
你現在已經有了一個可以從網路上取得專輯資料的函式。

## 4. 取得資料

在 [`initState()`][`initState()`] 或 [`didChangeDependencies()`][`didChangeDependencies()`] 方法中呼叫 `fetchAlbum()` 方法。

`initState()` 方法只會被呼叫一次，之後就不會再被呼叫。
如果你希望能在 [`InheritedWidget`][`InheritedWidget`] 變動時重新載入 API，請將呼叫放在 `didChangeDependencies()` 方法中。
更多細節請參考 [`State`][`State`]。

<?code-excerpt "lib/main.dart (State)"?>
```dart
class _MyAppState extends State<MyApp> {
  late Future<Album> futureAlbum;

  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum();
  }
  // ···
}
```

這個 Future 會在下一步中使用。

## 5. 顯示資料

要在螢幕上顯示資料，請使用
[`FutureBuilder`][`FutureBuilder`] 元件（Widget）。
`FutureBuilder` 元件是 Flutter 內建的，
讓你可以輕鬆處理非同步資料來源。

你必須提供兩個參數：

  1. 你想要處理的 `Future`。
     在這個例子中，就是從
     `fetchAlbum()` 函式回傳的 future。
  2. 一個 `builder` 函式，根據
     `Future` 的狀態（載入中、成功或錯誤），
     告訴 Flutter 要渲染什麼內容。

請注意，`snapshot.hasData` 只有在 snapshot 包含非 null 的資料值時，
才會回傳 `true`。

由於 `fetchAlbum` 只能回傳非 null 的值，
因此即使遇到「404 Not Found」伺服器回應，
該函式也應該拋出例外。
拋出例外會將 `snapshot.hasError` 設為 `true`，
你可以利用這個狀態來顯示錯誤訊息。

否則，將會顯示轉圈圈（spinner）。

<?code-excerpt "lib/main.dart (FutureBuilder)" replace="/^child: //g;/^\),$/)/g"?>
```dart
FutureBuilder<Album>(
  future: futureAlbum,
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text(snapshot.data!.title);
    } else if (snapshot.hasError) {
      return Text('${snapshot.error}');
    }

    // By default, show a loading spinner.
    return const CircularProgressIndicator();
  },
)
```

## 為什麼在 initState() 中呼叫 fetchAlbum()？

雖然這樣做很方便，
但並不建議在 `build()` 方法中放置 API 呼叫。

Flutter 會在每次需要
變更畫面上的任何內容時呼叫 `build()` 方法，
而這種情況其實發生得非常頻繁。
如果將 `fetchAlbum()` 方法放在 `build()` 內，
每次重建時都會重複呼叫，導致應用程式變慢。

將 `fetchAlbum()` 的結果儲存在狀態變數中，可以確保
`Future` 只會執行一次，並在後續重建時快取結果。

## 測試

如果想了解如何測試這個功能，
請參考以下教學：

  * [Introduction to unit testing][Introduction to unit testing]
  * [Mock dependencies using Mockito][Mock dependencies using Mockito]

## 完整範例

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<Album> fetchAlbum() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}

class Album {
  final int userId;
  final int id;
  final String title;

  const Album({required this.userId, required this.id, required this.title});

  factory Album.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {'userId': int userId, 'id': int id, 'title': String title} => Album(
        userId: userId,
        id: id,
        title: title,
      ),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late Future<Album> futureAlbum;

  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fetch Data Example',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text('Fetch Data Example')),
        body: Center(
          child: FutureBuilder<Album>(
            future: futureAlbum,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text(snapshot.data!.title);
              } else if (snapshot.hasError) {
                return Text('${snapshot.error}');
              }

              // By default, show a loading spinner.
              return const CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }

}
```


[`didChangeDependencies()`]: {{site.api}}/flutter/widgets/State/didChangeDependencies.html  
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html  
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html  
[JSONPlaceholder]: https://jsonplaceholder.typicode.com/  
[`http`]: {{site.pub-pkg}}/http  
[`http.get()`]: {{site.pub-api}}/http/latest/http/get.html  
[`http` package]: {{site.pub-pkg}}/http/install  
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html  
[Introduction to unit testing]: /cookbook/testing/unit/introduction  
[`initState()`]: {{site.api}}/flutter/widgets/State/initState.html  
[Mock dependencies using Mockito]: /cookbook/testing/unit/mocking  
[JSON and serialization]: /data-and-backend/serialization/json  
[pattern matching]: {{site.dart-site}}/language/patterns  
[`State`]: {{site.api}}/flutter/widgets/State-class.html
