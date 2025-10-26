---
title: 在背景解析 JSON
description: 如何在背景執行任務。
---

<?code-excerpt path-base="cookbook/networking/background_parsing/"?>

預設情況下，Dart 應用程式都在單一執行緒上執行所有工作。
在許多情況下，這種模型能簡化程式撰寫，且速度足夠快，
不會導致應用程式效能不佳或動畫卡頓，
這種現象通常被稱為「jank」。

然而，有時你可能需要執行較耗時的運算，
例如解析非常大的 JSON 文件。
如果這項工作花費超過 16 毫秒，
使用者就會感受到卡頓。

為了避免卡頓，你需要將這類耗時的運算
移至背景執行，並使用獨立的 [Isolate][Isolate]。
本教學將採用以下步驟：

  1. 新增 `http` 套件。
  2. 使用 `http` 套件發送網路請求。
  3. 將回應轉換為照片清單。
  4. 將這些工作移至獨立的 isolate 執行。

## 1. 新增 `http` 套件

首先，將 [`http`][`http`] 套件加入你的專案中。
`http` 套件可以讓你更容易執行網路請求，
例如從 JSON 端點擷取資料。

要將 `http` 套件設為相依套件，
請執行 `flutter pub add`：

```console
$ flutter pub add http
```

## 2. 發送網路請求

本範例說明如何使用 [`http.get()`][`http.get()`] 方法，
從 [JSONPlaceholder REST API][JSONPlaceholder REST API] 取得一份包含 5000 個照片物件的大型 JSON 文件。

<?code-excerpt "lib/main_step2.dart (fetchPhotos)"?>
```dart
Future<http.Response> fetchPhotos(http.Client client) async {
  return client.get(Uri.parse('https://jsonplaceholder.typicode.com/photos'));
}
```

:::note
在這個範例中，你將`http.Client`傳遞給函式。
這樣可以讓函式更容易在不同環境下進行測試與使用。
:::

## 3. 解析並將 JSON 轉換為照片清單

接下來，依照
[從網路擷取資料][Fetch data from the internet] 教學的指引，
將`http.Response`轉換為 Dart 物件的清單。
這樣可以讓資料更容易操作。

### 建立 `Photo` 類別

首先，建立一個`Photo`類別，用來儲存有關照片的資料。
請加入`fromJson()`工廠方法（factory method），
讓你可以輕鬆地從 JSON 物件建立`Photo`。

<?code-excerpt "lib/main_step3.dart (Photo)"?>
```dart
class Photo {
  final int albumId;
  final int id;
  final String title;
  final String url;
  final String thumbnailUrl;

  const Photo({
    required this.albumId,
    required this.id,
    required this.title,
    required this.url,
    required this.thumbnailUrl,
  });

  factory Photo.fromJson(Map<String, dynamic> json) {
    return Photo(
      albumId: json['albumId'] as int,
      id: json['id'] as int,
      title: json['title'] as String,
      url: json['url'] as String,
      thumbnailUrl: json['thumbnailUrl'] as String,
    );
  }
}
```

### 將回應轉換為照片清單

現在，請依照以下指示來更新
`fetchPhotos()` 函式，使其回傳
`Future<List<Photo>>`：

  1. 建立一個 `parsePhotos()` 函式，將回應主體（body）轉換為 `List<Photo>`。
  2. 在 `fetchPhotos()` 函式中使用 `parsePhotos()` 函式。

<?code-excerpt "lib/main_step3.dart (parsePhotos)"?>
```dart
// A function that converts a response body into a List<Photo>.
List<Photo> parsePhotos(String responseBody) {
  final parsed = (jsonDecode(responseBody) as List<Object?>)
      .cast<Map<String, Object?>>();

  return parsed.map<Photo>(Photo.fromJson).toList();
}

Future<List<Photo>> fetchPhotos(http.Client client) async {
  final response = await client.get(
    Uri.parse('https://jsonplaceholder.typicode.com/photos'),
  );

  // Synchronously run parsePhotos in the main isolate.
  return parsePhotos(response.body);
}
```

## 4. 將這項工作移至獨立的 isolate

如果你在較慢的裝置上執行 `fetchPhotos()` 函式，
你可能會注意到應用程式在解析與轉換 JSON 時會短暫凍結。
這就是所謂的 jank（卡頓），你會希望將其消除。

你可以透過使用 Flutter 提供的 [`compute()`][`compute()`]
函式，將解析與轉換的工作移到背景 isolate 來消除卡頓。
`compute()` 函式會在背景 isolate 執行耗時的函式並回傳結果。
在這個案例中，請將 `parsePhotos()` 函式放到背景執行。

<?code-excerpt "lib/main.dart (fetchPhotos)"?>
```dart
Future<List<Photo>> fetchPhotos(http.Client client) async {
  final response = await client.get(
    Uri.parse('https://jsonplaceholder.typicode.com/photos'),
  );

  // Use the compute function to run parsePhotos in a separate isolate.
  return compute(parsePhotos, response.body);
}
```

## 使用 isolates 的注意事項

Isolate 之間是透過傳遞訊息來進行通訊。這些訊息可以是原始值，例如 `null`、`num`、`bool`、`double` 或 `String`，也可以是像本範例中的 `List<Photo>` 這樣的簡單物件。

如果你嘗試在 isolates 之間傳遞較為複雜的物件，例如 `Future` 或 `http.Response`，可能會遇到錯誤。

作為替代方案，你可以參考 [`worker_manager`][`worker_manager`] 或 [`workmanager`][`workmanager`] 套件來進行背景處理。

[`worker_manager`]:  {{site.pub}}/packages/worker_manager
[`workmanager`]: {{site.pub}}/packages/workmanager

## 完整範例

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<List<Photo>> fetchPhotos(http.Client client) async {
  final response = await client.get(
    Uri.parse('https://jsonplaceholder.typicode.com/photos'),
  );

  // Use the compute function to run parsePhotos in a separate isolate.
  return compute(parsePhotos, response.body);
}

// A function that converts a response body into a List<Photo>.
List<Photo> parsePhotos(String responseBody) {
  final parsed = (jsonDecode(responseBody) as List<Object?>)
      .cast<Map<String, Object?>>();

  return parsed.map<Photo>(Photo.fromJson).toList();
}

class Photo {
  final int albumId;
  final int id;
  final String title;
  final String url;
  final String thumbnailUrl;

  const Photo({
    required this.albumId,
    required this.id,
    required this.title,
    required this.url,
    required this.thumbnailUrl,
  });

  factory Photo.fromJson(Map<String, dynamic> json) {
    return Photo(
      albumId: json['albumId'] as int,
      id: json['id'] as int,
      title: json['title'] as String,
      url: json['url'] as String,
      thumbnailUrl: json['thumbnailUrl'] as String,
    );
  }
}

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appTitle = 'Isolate Demo';

    return const MaterialApp(
      title: appTitle,
      home: MyHomePage(title: appTitle),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late Future<List<Photo>> futurePhotos;

  @override
  void initState() {
    super.initState();
    futurePhotos = fetchPhotos(http.Client());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: FutureBuilder<List<Photo>>(
        future: futurePhotos,
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return const Center(child: Text('An error has occurred!'));
          } else if (snapshot.hasData) {
            return PhotosList(photos: snapshot.data!);
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }
}

class PhotosList extends StatelessWidget {
  const PhotosList({super.key, required this.photos});

  final List<Photo> photos;

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
      ),
      itemCount: photos.length,
      itemBuilder: (context, index) {
        return Image.network(photos[index].thumbnailUrl);
      },
    );
  }
}
```

![Isolate demo](/assets/images/docs/cookbook/isolate.webp){:.site-mobile-screenshot}

[`compute()`]: {{site.api}}/flutter/foundation/compute.html
[Fetch data from the internet]: /cookbook/networking/fetch-data
[`http`]: {{site.pub-pkg}}/http
[`http.get()`]: {{site.pub-api}}/http/latest/http/get.html
[Isolate]: {{site.api}}/flutter/dart-isolate/Isolate-class.html
[JSONPlaceholder REST API]: https://jsonplaceholder.typicode.com
