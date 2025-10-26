```markdown
---
title: 在網路上刪除資料
description: 如何使用 `http` 套件在網路上刪除資料。
---

<?code-excerpt path-base="cookbook/networking/delete_data/"?>

本教學將說明如何使用 `http` 套件透過網路刪除資料。

本教學包含以下步驟：

  1. 新增 `http` 套件。
  2. 在伺服器上刪除資料。
  3. 更新螢幕。

## 1. 新增 `http` 套件

要將 `http` 套件加入為相依套件，請執行 `flutter pub add`：
```

```console
$ flutter pub add http
```

匯入 `http` 套件。

<?code-excerpt "lib/main.dart (Http)"?>
```dart
import 'package:http/http.dart' as http;
```

{% render docs/cookbook/networking/internet-permission.md %}

## 2. 刪除伺服器上的資料

本教學將說明如何使用 `http.delete()` 方法，從 [JSONPlaceholder][JSONPlaceholder] 刪除一個相簿（album）。
請注意，這需要你想要刪除的相簿的 `id`。
在本範例中，請使用你已經知道的內容，例如 `id = 1`。

<?code-excerpt "lib/main_step1.dart (deleteAlbum)"?>
```dart
Future<http.Response> deleteAlbum(String id) async {
  final http.Response response = await http.delete(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/$id'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
  );

  return response;
}
```

`http.delete()` 方法會回傳一個包含 `Response` 的 `Future`。

* [`Future`][`Future`] 是 Dart 的核心類別，用於處理非同步操作。Future 物件代表一個未來某個時間點可能會取得的值或錯誤。
* `http.Response` 類別包含從成功的 HTTP 呼叫所取得的資料。
* `deleteAlbum()` 方法需要一個 `id` 參數，用來識別要從伺服器刪除的資料。

## 3. 更新螢幕

為了檢查資料是否已被刪除，首先請使用 `http.get()` 方法從 [JSONPlaceholder][JSONPlaceholder] 取得資料，並顯示在螢幕上。（完整範例請參考 [Fetch Data][Fetch Data] 教學。）你現在應該會有一個 **Delete Data** 按鈕，當按下時會呼叫 `deleteAlbum()` 方法。

<?code-excerpt "lib/main.dart (Column)" replace="/return //g"?>
```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    Text(snapshot.data?.title ?? 'Deleted'),
    ElevatedButton(
      child: const Text('Delete Data'),
      onPressed: () {
        setState(() {
          _futureAlbum = deleteAlbum(
            snapshot.data!.id.toString(),
          );
        });
      },
    ),
  ],
);
```
現在，當你點擊 ***Delete Data*** 按鈕時，
`deleteAlbum()` 方法會被呼叫，而你傳遞的 id
就是你從網際網路取得的資料的 id。
這表示你將會刪除
你從網際網路擷取的同一筆資料。

### 從 deleteAlbum() 方法回傳回應
當刪除請求完成後，
你可以從 `deleteAlbum()`
方法回傳一個回應，以通知螢幕資料已被刪除。

<?code-excerpt "lib/main.dart (deleteAlbum)"?>
```dart
Future<Album> deleteAlbum(String id) async {
  final http.Response response = await http.delete(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/$id'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then return an empty Album. After deleting,
    // you'll get an empty JSON `{}` response.
    // Don't return `null`, otherwise `snapshot.hasData`
    // will always return false on `FutureBuilder`.
    return Album.empty();
  } else {
    // If the server did not return a "200 OK response",
    // then throw an exception.
    throw Exception('Failed to delete album.');
  }
}
```

`FutureBuilder()` 會在收到回應時重新建構。
如果請求成功，回應的 body 通常不會有任何資料，
因此 `Album.fromJson()` 方法會以預設值（在我們的範例中是 `null`）建立 `Album` 物件的實例。
你可以依照自己的需求，自由調整這個行為。

就是這樣！
現在你已經有一個可以從網路上刪除資料的函式了。

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
    // If the server did return a 200 OK response, then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response, then throw an exception.
    throw Exception('Failed to load album');
  }
}

Future<Album> deleteAlbum(String id) async {
  final http.Response response = await http.delete(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/$id'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then return an empty Album. After deleting,
    // you'll get an empty JSON `{}` response.
    // Don't return `null`, otherwise `snapshot.hasData`
    // will always return false on `FutureBuilder`.
    return Album.empty();
  } else {
    // If the server did not return a "200 OK response",
    // then throw an exception.
    throw Exception('Failed to delete album.');
  }
}

class Album {
  int? id;
  String? title;

  Album({this.id, this.title});

  Album.empty();

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
  late Future<Album> _futureAlbum;

  @override
  void initState() {
    super.initState();
    _futureAlbum = fetchAlbum();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Delete Data Example',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text('Delete Data Example')),
        body: Center(
          child: FutureBuilder<Album>(
            future: _futureAlbum,
            builder: (context, snapshot) {
              // If the connection is done,
              // check for response data or an error.
              if (snapshot.connectionState == ConnectionState.done) {
                if (snapshot.hasData) {
                  return Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(snapshot.data?.title ?? 'Deleted'),
                      ElevatedButton(
                        child: const Text('Delete Data'),
                        onPressed: () {
                          setState(() {
                            _futureAlbum = deleteAlbum(
                              snapshot.data!.id.toString(),
                            );
                          });
                        },
                      ),
                    ],
                  );
                } else if (snapshot.hasError) {
                  return Text('${snapshot.error}');
                }
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

[Fetch Data]: /cookbook/networking/fetch-data
# 刪除資料

[ConnectionState]: {{site.api}}/flutter/widgets/ConnectionState-class.html
在許多應用程式中，刪除資料是一項常見的網路操作。通常會透過 API 的 `DELETE` 方法來完成。以下範例說明如何使用 HTTP 請求來刪除資料。

[`didChangeDependencies()`]: {{site.api}}/flutter/widgets/State/didChangeDependencies.html
## 步驟 1：建立刪除請求

[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html
使用 `http` 套件來發送 `DELETE` 請求至 API。請確保你已經安裝並匯入 `http` 套件。

[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html
```dart
final response = await http.delete(
  Uri.parse('https://example.com/items/`didChangeDependencies()`'),
);
```

[JSONPlaceholder]: https://jsonplaceholder.typicode.com/
其中，`didChangeDependencies()` 是你要刪除資料的唯一識別碼（ID）。

[`http`]: {{site.pub-pkg}}/http
## 步驟 2：處理回應

[`http.delete()`]: {{site.pub-api}}/http/latest/http/delete.html
收到回應後，請檢查狀態碼以確認刪除是否成功。一般來說，成功的刪除會回傳 200 或 204 狀態碼。

[`http` package]: {{site.pub-pkg}}/http/install
```dart
if (response.statusCode == 200 || response.statusCode == 204) {
  // 刪除成功
} else {
  // 處理錯誤
}
```

[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
## 步驟 3：更新 UI

[Introduction to unit testing]: /cookbook/testing/unit/introduction
當刪除操作完成後，請更新你的 UI 以反映資料已被移除。例如，從列表中移除該項目。

[`initState()`]: {{site.api}}/flutter/widgets/State/initState.html
## 注意事項

[Mock dependencies using Mockito]: /cookbook/testing/unit/mocking
- 請確認 API 支援 `DELETE` 方法。
- 某些 API 可能需要授權或額外的標頭（headers）。
- 錯誤處理很重要，請妥善處理可能的失敗情境。

[JSON and serialization]: /data-and-backend/serialization/json
## 進階應用

[`State`]: {{site.api}}/flutter/widgets/State-class.html
你可以根據需求，將刪除邏輯封裝成函式，並在需要時呼叫。這有助於程式碼重用與維護。
