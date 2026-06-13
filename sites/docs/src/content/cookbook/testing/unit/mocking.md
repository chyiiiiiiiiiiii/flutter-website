---
title: 使用 Mockito 模擬（Mock）相依元件
description: >
  使用 Mockito 套件來模擬服務的行為以進行測試。
shortTitle: 模擬（Mocking）
---

<?code-excerpt path-base="cookbook/testing/unit/mocking"?>

有時候，單元測試（unit tests）可能會依賴於從即時 Web 服務或資料庫擷取資料的類別。這樣做會帶來一些不便：

  * 呼叫即時服務或資料庫會拖慢測試執行速度。
  * 若 Web 服務或資料庫回傳了非預期的結果，原本通過的測試可能會失敗。這種情況稱為「不穩定測試（flaky test）」。
  * 僅透過即時 Web 服務或資料庫，很難測試所有可能的成功與失敗情境。

因此，與其依賴即時 Web 服務或資料庫，不如「模擬（mock）」這些相依元件。Mock 可以模擬即時 Web 服務或資料庫，並根據不同情境回傳特定結果。

一般來說，你可以透過建立類別的替代實作來模擬相依元件。這些替代實作可以手動撰寫，或是利用 [Mockito 套件][Mockito package] 來加快開發流程。

本教學將示範如何使用 Mockito 套件進行基本的模擬，步驟如下：

  1. 新增套件相依。
  2. 建立要測試的函式。
  3. 建立包含 mock `http.Client` 的測試檔案。
  4. 為每個條件撰寫測試。
  5. 執行測試。

如需更多資訊，請參閱 [Mockito 套件][Mockito package] 文件。

## 1. 新增套件相依

若要使用 `mockito` 套件，請將它與 `flutter_test` 相依一同加入 `pubspec.yaml` 檔案的 `dev_dependencies` 區段。

本範例也會用到 `http` 套件，因此請在 `dependencies` 區段中定義該相依。

`mockito: 5.0.0` 透過程式碼產生支援 Dart 的 null safety。
為了執行必要的程式碼產生，請在 `dev_dependencies` 區段加入 `build_runner` 相依。

要加入這些相依，請執行 `flutter pub add`：

```console
$ flutter pub add http dev:mockito dev:build_runner
```

## 2. 建立要測試的函式

在這個範例中，將對 [從網路擷取資料][Fetch data from the internet] 教學中的 `fetchAlbum` 函式進行單元測試。
為了測試這個函式，需要做兩個修改：

  1. 為函式提供 `http.Client`。這樣可以根據不同情境，提供正確的 `http.Client`。
     對於 Flutter 和伺服器端專案，請提供 `http.IOClient`。
     對於瀏覽器應用程式，請提供 `http.BrowserClient`。
     對於測試，請提供 mock（模擬）`http.Client`。
  2. 使用所提供的 `client` 來從網路擷取資料，而不是使用難以模擬的靜態 `http.get()` 方法。

現在，這個函式應該會像這樣：

<?code-excerpt "lib/main.dart (fetchAlbum)"?>
```dart
Future<Album> fetchAlbum(http.Client client) async {
  final response = await client.get(
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

在你的應用程式程式碼中，你可以直接使用 `fetchAlbum(http.Client())`，將 `http.Client` 提供給 `fetchAlbum` 方法。`http.Client()` 會建立一個預設的 `http.Client`。

## 3. 建立一個包含 mock `http.Client` 的測試檔案

接下來，建立一個測試檔案。

依照 [Introduction to unit testing][Introduction to unit testing] 教學中的建議，
在根目錄的 `test` 資料夾下建立一個名為 `fetch_album_test.dart` 的檔案。

在 main 函式上加入註解
`@GenerateMocks([], customMocks: [MockSpec<http.Client>(as: #MockHttpClient)])`
以產生一個帶有 `mockito` 的 `MockHttpClient` 類別。

產生出來的 `MockHttpClient` 類別會實作 `http.Client` 類別。
這讓你可以將 `MockHttpClient` 傳遞給 `fetchAlbum` 函式，
並在每個測試中回傳不同的 http 回應。

產生的 mock 會位於 `fetch_album_test.mocks.dart`。
請匯入這個檔案以使用它們。

<?code-excerpt "test/fetch_album_test.dart (mockClient)" plaster="none"?>
```dart
import 'package:http/http.dart' as http;
import 'package:mocking/main.dart';
import 'package:mockito/annotations.dart';

// Generate a MockClient using the Mockito package.
// Create new instances of this class in each test.
// Note: Naming the generated mock `MockHttpClient` to avoid confusion with
// `MockClient` from `package:http/testing.dart`.
@GenerateMocks([], customMocks: [MockSpec<http.Client>(as: #MockHttpClient)])
void main() {
}
```

接下來，請執行以下指令來產生 mock（模擬物件）：

```console
$ dart run build_runner build
```

## 4. 為每個條件撰寫測試

`fetchAlbum()` 函式會執行下列兩種情況之一：

  1. 如果 HTTP 呼叫成功，則回傳 `Album`
  2. 如果 HTTP 呼叫失敗，則拋出 `Exception`

因此，你需要針對這兩種情況進行測試。
使用 `MockHttpClient` 類別，在成功測試時回傳 "Ok" 回應，
在失敗測試時則回傳錯誤回應。
利用 Mockito 提供的 `when()` 函式來測試這些情況：

<?code-excerpt "test/fetch_album_test.dart"?>
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mocking/main.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'fetch_album_test.mocks.dart';

// Generate a MockClient using the Mockito package.
// Create new instances of this class in each test.
// Note: Naming the generated mock `MockHttpClient` to avoid confusion with
// `MockClient` from `package:http/testing.dart`.
@GenerateMocks([], customMocks: [MockSpec<http.Client>(as: #MockHttpClient)])
void main() {
  group('fetchAlbum', () {
    test('returns an Album if the http call completes successfully', () async {
      final client = MockHttpClient();

      // Use Mockito to return a successful response when it calls the
      // provided http.Client.
      when(
        client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')),
      ).thenAnswer(
        (_) async =>
            http.Response('{"userId": 1, "id": 2, "title": "mock"}', 200),
      );

      expect(await fetchAlbum(client), isA<Album>());
    });

    test('throws an exception if the http call completes with an error', () {
      final client = MockHttpClient();

      // Use Mockito to return an unsuccessful response when it calls the
      // provided http.Client.
      when(
        client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')),
      ).thenAnswer((_) async => http.Response('Not Found', 404));

      expect(fetchAlbum(client), throwsException);
    });
  });
}
```

## 5. 執行測試

現在你已經有一個帶有測試的 `fetchAlbum()` 函式，
請執行這些測試。

```console
$ flutter test test/fetch_album_test.dart
```

你也可以依照 [Introduction to unit testing][Introduction to unit testing] 教學中的說明，在你喜愛的編輯器內執行測試。

## 完整範例

##### lib/main.dart

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<Album> fetchAlbum(http.Client client) async {
  final response = await client.get(
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
    return Album(
      userId: json['userId'] as int,
      id: json['id'] as int,
      title: json['title'] as String,
    );
  }
}

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late final Future<Album> futureAlbum;

  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum(http.Client());
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

##### test/fetch_album_test.dart

<?code-excerpt "test/fetch_album_test.dart"?>
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mocking/main.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'fetch_album_test.mocks.dart';

// Generate a MockClient using the Mockito package.
// Create new instances of this class in each test.
// Note: Naming the generated mock `MockHttpClient` to avoid confusion with
// `MockClient` from `package:http/testing.dart`.
@GenerateMocks([], customMocks: [MockSpec<http.Client>(as: #MockHttpClient)])
void main() {
  group('fetchAlbum', () {
    test('returns an Album if the http call completes successfully', () async {
      final client = MockHttpClient();

      // Use Mockito to return a successful response when it calls the
      // provided http.Client.
      when(
        client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')),
      ).thenAnswer(
        (_) async =>
            http.Response('{"userId": 1, "id": 2, "title": "mock"}', 200),
      );

      expect(await fetchAlbum(client), isA<Album>());
    });

    test('throws an exception if the http call completes with an error', () {
      final client = MockHttpClient();

      // Use Mockito to return an unsuccessful response when it calls the
      // provided http.Client.
      when(
        client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')),
      ).thenAnswer((_) async => http.Response('Not Found', 404));

      expect(fetchAlbum(client), throwsException);
    });
  });
}
```

## 摘要

在本範例中，你已學會如何使用 Mockito 來測試依賴於網路服務或資料庫的函式或類別。這僅僅是對 Mockito 函式庫以及 Mock（模擬）概念的簡要介紹。如需更多資訊，請參閱 [Mockito 套件][Mockito package] 所提供的文件。


[Fetch data from the internet]: /cookbook/networking/fetch-data
[Introduction to unit testing]: /cookbook/testing/unit/introduction
[Mockito package]: {{site.pub-pkg}}/mockito
