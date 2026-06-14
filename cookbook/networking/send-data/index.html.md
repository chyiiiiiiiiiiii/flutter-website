# 傳送資料到網際網路

> 如何使用 http 套件透過網際網路傳送資料。



<?code-excerpt path-base="cookbook/networking/send_data/"?>

對於大多數應用程式來說，傳送資料到網際網路是必要的。
`http` 套件同樣能夠滿足這個需求。

本教學範例包含以下步驟：

  1. 新增 `http` 套件。
  2. 使用 `http` 套件將資料傳送到伺服器。
  3. 將回應轉換為自訂的 Dart 物件。
  4. 從使用者輸入取得 `title`。
  5. 在螢幕上顯示回應結果。

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

若要部署至 Android，請編輯 `AndroidManifest.xml` 檔案以新增網際網路權限。

```xml
<!-- Required to fetch data from the internet. -->
<uses-permission android:name="android.permission.INTERNET" />
```

同樣地，若要部署至 macOS，請編輯
`macos/Runner/DebugProfile.entitlements` 與 `macos/Runner/Release.entitlements`
檔案，加入網路客戶端授權。

```xml
<!-- Required to fetch data from the internet. -->
<key>com.apple.security.network.client</key>
<true/>
```


## 2. 傳送資料到伺服器

本教學將說明如何建立 `Album`，
透過傳送專輯標題到
[JSONPlaceholder][]，並使用
[`http.post()`][] 方法。

請匯入 `dart:convert`，以便存取 `jsonEncode` 來編碼資料：

<?code-excerpt "lib/create_album.dart (convert-import)"?>
```dart
import 'dart:convert';
```

使用 `http.post()` 方法來傳送已編碼的資料：

<?code-excerpt "lib/create_album.dart (CreateAlbum)"?>
```dart
Future<http.Response> createAlbum(String title) {
  return http.post(
    Uri.parse('https://jsonplaceholder.typicode.com/albums'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{'title': title}),
  );
}
```

`http.post()` 方法會回傳一個包含 `Response` 的 `Future`。

* [`Future`][] 是 Dart 的核心類別，用於處理非同步 (asynchronous) 操作。Future 物件代表一個未來某個時間點可能會取得的值或錯誤。
* `http.Response` 類別包含從成功的 HTTP 呼叫所接收到的資料。
* `createAlbum()` 方法會接收一個參數 `title`，該參數會傳送到伺服器以建立一個 `Album`。

## 3. 將 `http.Response` 轉換為自訂 Dart 物件

雖然發送網路請求很簡單，但直接操作原始的 `Future<http.Response>` 並不方便。為了讓開發更容易，請將 `http.Response` 轉換成 Dart 物件。

### 建立 Album 類別

首先，建立一個 `Album` 類別來承載從網路請求取得的資料。這個類別包含一個 factory 建構函式，可從 JSON 建立 `Album`。

使用[模式比對 (pattern matching)][pattern matching] 轉換 JSON 只是其中一種選擇。欲了解更多資訊，請參閱完整的 [JSON 與序列化][JSON and serialization]文章。

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

請依照以下步驟，將 `createAlbum()` 函式更新為回傳 `Future<Album>`：

  1. 使用 `dart:convert` 套件，將回應主體（response body）轉換為 JSON `Map`。
  2. 如果伺服器回傳狀態碼為 201 的 `CREATED` 回應，則使用 `fromJson()` 工廠方法，將 JSON `Map` 轉換為 `Album`。
  3. 如果伺服器未回傳狀態碼為 201 的 `CREATED` 回應，則拋出例外（exception）。
     （即使伺服器回應為 "404 Not Found"，也請拋出例外，不要回傳 `null`。
     這在檢查 `snapshot` 中的資料時非常重要，如下所示。）

<?code-excerpt "lib/main.dart (createAlbum)"?>
```dart
Future<Album> createAlbum(String title) async {
  final response = await http.post(
    Uri.parse('https://jsonplaceholder.typicode.com/albums'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{'title': title}),
  );

  if (response.statusCode == 201) {
    // If the server did return a 201 CREATED response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 201 CREATED response,
    // then throw an exception.
    throw Exception('Failed to create album.');
  }
}
```

太棒了！你現在已經有一個可以將標題傳送到伺服器以建立相簿的函式。

## 4. 從使用者輸入獲取標題

接下來，建立一個 `TextField` 來輸入標題，以及一個 `ElevatedButton` 用來將資料傳送到伺服器。
同時定義一個 `TextEditingController`，用於從 `TextField` 讀取使用者輸入。

當按下 `ElevatedButton` 時，`_futureAlbum` 會被設為 `createAlbum()` 方法所回傳的值。

<?code-excerpt "lib/main.dart (Column)" replace="/^return //g;/^\);$/)/g"?>
```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    TextField(
      controller: _controller,
      decoration: const InputDecoration(hintText: 'Enter Title'),
    ),
    ElevatedButton(
      onPressed: () {
        setState(() {
          _futureAlbum = createAlbum(_controller.text);
        });
      },
      child: const Text('Create Data'),
    ),
  ],
)
```

當按下 **Create Data** 按鈕時，會發送網路請求，將 `TextField` 的資料以 `POST` 請求的方式傳送到伺服器。這裡產生的 Future，`_futureAlbum`，會在下一步中使用。

## 5. 在螢幕上顯示回應

若要在螢幕上顯示資料，請使用 [`FutureBuilder`][] 元件 (Widget)。`FutureBuilder` 元件是 Flutter 內建的，能讓你更輕鬆地處理非同步資料來源。你需要提供兩個參數：

  1. 你要處理的 `Future`。在本例中，就是從 `createAlbum()` 函式回傳的 future。
  2. 一個 `builder` 函式，用來告訴 Flutter 根據 `Future` 的狀態（載入中、成功或錯誤）該渲染 (render) 什麼內容。

請注意，`snapshot.hasData` 只有在 snapshot 包含非 null 資料時才會回傳 `true`。這也是為什麼 `createAlbum()` 函式即使遇到伺服器回應 "404 Not Found" 時也應該拋出例外。如果 `createAlbum()` 回傳 `null`，那麼 `CircularProgressIndicator` 會無限顯示下去。

<?code-excerpt "lib/main.dart (FutureBuilder)" replace="/^return //g;/^\);$/)/g"?>
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
)
```

## 完整範例

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<Album> createAlbum(String title) async {
  final response = await http.post(
    Uri.parse('https://jsonplaceholder.typicode.com/albums'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{'title': title}),
  );

  if (response.statusCode == 201) {
    // If the server did return a 201 CREATED response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 201 CREATED response,
    // then throw an exception.
    throw Exception('Failed to create album.');
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
  Future<Album>? _futureAlbum;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Create Data Example',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text('Create Data Example')),
        body: Container(
          alignment: Alignment.center,
          padding: const EdgeInsets.all(8),
          child: (_futureAlbum == null) ? buildColumn() : buildFutureBuilder(),
        ),
      ),
    );
  }

  Column buildColumn() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        TextField(
          controller: _controller,
          decoration: const InputDecoration(hintText: 'Enter Title'),
        ),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _futureAlbum = createAlbum(_controller.text);
            });
          },
          child: const Text('Create Data'),
        ),
      ],
    );
  }

  FutureBuilder<Album> buildFutureBuilder() {
    return FutureBuilder<Album>(
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
  }
}
```

[ConnectionState]: https://api.flutter.dev/flutter/widgets/ConnectionState-class.html
[`didChangeDependencies()`]: https://api.flutter.dev/flutter/widgets/State/didChangeDependencies.html
[Fetch Data]: /cookbook/networking/fetch-data
[`Future`]: https://api.flutter.dev/flutter/dart-async/Future-class.html
[`FutureBuilder`]: https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html
[`http`]: https://pub.dev/packages/http
[`http.post()`]: https://pub.dev/documentation/http/latest/http/post.html
[`http` package]: https://pub.dev/packages/http/install
[`InheritedWidget`]: https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html
[Introduction to unit testing]: /cookbook/testing/unit/introduction
[`initState()`]: https://api.flutter.dev/flutter/widgets/State/initState.html
[JSONPlaceholder]: https://jsonplaceholder.typicode.com/
[JSON and serialization]: /data-and-backend/serialization/json
[Mock dependencies using Mockito]: /cookbook/testing/unit/mocking
[pattern matching]: https://dart.dev/language/patterns
[`State`]: https://api.flutter.dev/flutter/widgets/State-class.html

