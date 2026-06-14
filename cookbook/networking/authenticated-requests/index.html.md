# 發送已驗證請求

> 如何從網路服務擷取授權資料。



<?code-excerpt path-base="cookbook/networking/authenticated_requests/"?>

要從大多數網路服務擷取資料，你需要提供授權資訊。這有許多方式可以實現，但最常見的方法之一是使用 `Authorization` HTTP 標頭。

## 新增授權標頭

[`http`][`http`] 套件提供了一個方便的方法，讓你可以為請求新增標頭。或者，你也可以使用 `dart:io` 函式庫中的 [`HttpHeaders`][`HttpHeaders`] 類別。

<?code-excerpt "lib/main.dart (get)"?>
```dart
final response = await http.get(
  Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
  // Send authorization headers to the backend.
  headers: {HttpHeaders.authorizationHeader: 'Basic your_api_token_here'},
);
```

## 完整範例

本範例是在
[從網路擷取資料][Fetching data from the internet] 教學的基礎上進行擴充。

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

Future<Album> fetchAlbum() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
    // Send authorization headers to the backend.
    headers: {HttpHeaders.authorizationHeader: 'Basic your_api_token_here'},
  );
  final responseJson = jsonDecode(response.body) as Map<String, dynamic>;

  return Album.fromJson(responseJson);
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
```


[Fetching data from the internet]: /cookbook/networking/fetch-data  
[`http`]: https://pub.dev/packages/http  
[`HttpHeaders`]: https://api.dart.dev/dart-io/HttpHeaders-class.html

