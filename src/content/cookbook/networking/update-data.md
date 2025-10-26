---
title: 透過網際網路更新資料
description: 如何使用 http 套件透過網際網路更新資料。
---

<?code-excerpt path-base="cookbook/networking/update_data/"?>

對於大多數應用程式來說，透過網際網路更新資料是必要的。
`http` 套件正好可以滿足這個需求！

本教學步驟如下：

  1. 新增 `http` 套件。
  2. 使用 `http` 套件透過網際網路更新資料。
  3. 將回應轉換為自訂的 Dart 物件。
  4. 從網際網路取得資料。
  5. 根據使用者輸入，更新現有的 `title`。
  6. 更新並在螢幕上顯示回應。

## 1. 新增 `http` 套件

要將 `http` 套件加入為相依套件，
請執行 `flutter pub add`：

```console
$ flutter pub add http
```

匯入 `http` 套件。

<?code-excerpt "lib/main.dart (Http)"?>
```dart
import 'package:http/http.dart' as http;
```

{% render docs/cookbook/networking/internet-permission.md %}

## 2. 使用 `http` 套件透過網路更新資料

本教學將說明如何使用 [`http.put()`][`http.put()`] 方法，將專輯標題（album title）更新到 [JSONPlaceholder][JSONPlaceholder]。

<?code-excerpt "lib/main_step2.dart (updateAlbum)"?>
```dart
Future<http.Response> updateAlbum(String title) {
  return http.put(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{'title': title}),
  );
}
```

`http.put()` 方法會回傳一個包含 `Response` 的 `Future`。

* [`Future`][`Future`] 是 Dart 的核心類別，用於處理非同步操作。`Future` 物件代表一個未來某個時間點可能取得的值或錯誤。
* `http.Response` 類別包含從成功的 HTTP 呼叫中接收到的資料。
* `updateAlbum()` 方法會接收一個參數 `title`，該參數會傳送到伺服器以更新 `Album`。

## 3. 將 `http.Response` 轉換為自訂 Dart 物件

雖然發送網路請求很簡單，但直接操作原始的 `Future<http.Response>` 並不方便。為了讓開發更輕鬆，建議將 `http.Response` 轉換為 Dart 物件。

### 建立 Album 類別

首先，建立一個 `Album` 類別，用來存放網路請求取得的資料。這個類別包含一個 factory 建構函式，可從 JSON 建立 `Album`。

使用 [pattern matching][pattern matching] 轉換 JSON 只是其中一種方法。更多資訊請參考完整文章：[JSON and serialization][JSON and serialization]。

<?code-excerpt "lib/main.dart (Album)"?>
```dart
class Album {
  final int id;
  final String title;

  const Album({required this.id, required this.title});

  factory Album.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {'id': int id, 'title': String title} => Album(id: id, title: title),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}
```

### 將 `http.Response` 轉換為 `Album`

現在，請依照以下步驟，將 `updateAlbum()` 函式更新為回傳 `Future<Album>`：

  1. 使用 `dart:convert` 套件，將回應主體（response body）轉換為 JSON `Map`。
  2. 如果伺服器回傳狀態碼為 200 的 `UPDATED` 回應，則使用 `fromJson()` 工廠方法，將 JSON `Map` 轉換為 `Album`。
  3. 如果伺服器沒有回傳狀態碼為 200 的 `UPDATED` 回應，則拋出例外（exception）。
     （即使伺服器回應為 "404 Not Found"，也請拋出例外，不要回傳 `null`。
     這在檢查 `snapshot` 中的資料時非常重要，如下所示。）

<?code-excerpt "lib/main.dart (updateAlbum)"?>
```dart
Future<Album> updateAlbum(String title) async {
  final response = await http.put(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{'title': title}),
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to update album.');
  }
}
```

太棒了！
你現在已經有一個可以更新相簿名稱的函式了。

### 從網路取得資料

在你能夠更新資料之前，必須先從網路取得資料。
完整範例請參考 [Fetch data][Fetch data] 教學。

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

理想情況下，你會在`initState`期間使用此方法來設定`_futureAlbum`，以從網路擷取資料。

## 4. 根據使用者輸入更新現有標題

建立一個`TextField`來輸入標題，以及一個`ElevatedButton`來更新伺服器上的資料。
同時定義一個`TextEditingController`，用於從`TextField`讀取使用者輸入。

當按下`ElevatedButton`時，
`_futureAlbum`會被設定為
`updateAlbum()`方法所回傳的值。

<?code-excerpt "lib/main_step5.dart (Column)"?>
```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    Padding(
      padding: const EdgeInsets.all(8),
      child: TextField(
        controller: _controller,
        decoration: const InputDecoration(hintText: 'Enter Title'),
      ),
    ),
    ElevatedButton(
      onPressed: () {
        setState(() {
          _futureAlbum = updateAlbum(_controller.text);
        });
      },
      child: const Text('Update Data'),
    ),
  ],
);
```

當按下 **Update Data** 按鈕時，會發送一個網路請求，將 `TextField` 中的資料以 `PUT` 請求的方式傳送到伺服器。`_futureAlbum` 變數會在下一步中使用。

## 5. 在螢幕上顯示回應

若要在螢幕上顯示資料，請使用 [`FutureBuilder`][`FutureBuilder`] 元件 (Widget)。
`FutureBuilder` 元件 (Widget) 是 Flutter 內建的，能讓你更輕鬆處理非同步資料來源。
你必須提供兩個參數：

  1. 你想要處理的 `Future`。在這個例子中，是 `updateAlbum()` 函式回傳的 future。
  2. 一個 `builder` 函式，根據 `Future` 的狀態（載入中、成功或錯誤）告訴 Flutter 要渲染什麼內容。

請注意，`snapshot.hasData` 只有在 snapshot 包含非 null 資料值時才會回傳 `true`。
這也是為什麼 `updateAlbum` 函式即使遇到「404 Not Found」伺服器回應時，也應該丟出例外。
如果 `updateAlbum` 回傳 `null`，那麼 `CircularProgressIndicator` 就會無限期地顯示下去。

<?code-excerpt "lib/main_step5.dart (FutureBuilder)"?>
```dart
FutureBuilder<Album>(
  future: _futureAlbum,
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text(snapshot.data!.title);
    } else if (snapshot.hasError) {
      return Text('${snapshot.error}');
    }

    return const CircularProgressIndicator();
  },
);
```

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

Future<Album> updateAlbum(String title) async {
  final response = await http.put(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{'title': title}),
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to update album.');
  }
}

class Album {
  final int id;
  final String title;

  const Album({required this.id, required this.title});

  factory Album.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {'id': int id, 'title': String title} => Album(id: id, title: title),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() {
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  final TextEditingController _controller = TextEditingController();
  late Future<Album> _futureAlbum;

  @override
  void initState() {
    super.initState();
    _futureAlbum = fetchAlbum();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Update Data Example',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text('Update Data Example')),
        body: Container(
          alignment: Alignment.center,
          padding: const EdgeInsets.all(8),
          child: FutureBuilder<Album>(
            future: _futureAlbum,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                if (snapshot.hasData) {
                  return Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(snapshot.data!.title),
                      TextField(
                        controller: _controller,
                        decoration: const InputDecoration(
                          hintText: 'Enter Title',
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            _futureAlbum = updateAlbum(_controller.text);
                          });
                        },
                        child: const Text('Update Data'),
                      ),
                    ],
                  );
                } else if (snapshot.hasError) {
                  return Text('${snapshot.error}');
                }
              }

              return const CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }
}
```

[ConnectionState]: {{site.api}}/flutter/widgets/ConnectionState-class.html  
[`didChangeDependencies()`]: {{site.api}}/flutter/widgets/State/didChangeDependencies.html  
[Fetch data]: /cookbook/networking/fetch-data  
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html  
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html  
[`http`]: {{site.pub-pkg}}/http  
[`http.put()`]: {{site.pub-api}}/http/latest/http/put.html  
[`http` package]: {{site.pub}}/packages/http/install  
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html  
[Introduction to unit testing]: /cookbook/testing/unit/introduction  
[`initState()`]: {{site.api}}/flutter/widgets/State/initState.html  
[JSONPlaceholder]: https://jsonplaceholder.typicode.com/  
[JSON and serialization]: /data-and-backend/serialization/json  
[Mock dependencies using Mockito]: /cookbook/testing/unit/mocking  
[pattern matching]: {{site.dart-site}}/language/patterns  
[`State`]: {{site.api}}/flutter/widgets/State-class.html
