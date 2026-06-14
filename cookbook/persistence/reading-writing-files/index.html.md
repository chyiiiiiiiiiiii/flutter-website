# 讀取與寫入檔案

> 如何在磁碟上讀取與寫入檔案。



<?code-excerpt path-base="cookbook/persistence/reading_writing_files/"?>

在某些情況下，你可能需要在磁碟上讀取與寫入檔案。
例如，你可能需要讓資料在應用程式（app）重啟後仍然保留，
或是從網路下載資料並儲存起來以便離線使用。

若要在行動裝置或桌面應用程式中將檔案儲存到磁碟，
可以結合 [`path_provider`][] 插件與 [`dart:io`][] 函式庫來實現。

本教學範例包含以下步驟：

  1. 找到正確的本機路徑。
  2. 建立檔案位置的參考。
  3. 將資料寫入檔案。
  4. 從檔案讀取資料。

想了解更多，請觀看這支介紹 `path_provider` 套件的「本週套件」影片：

<YouTubeEmbed id="Ci4t-NkOY3I" title="path_provider | Flutter package of the week"></YouTubeEmbed>

:::note
本教學目前不支援網頁應用程式（web apps）。
若想追蹤此議題的討論，
請參考 `flutter/flutter` [issue #45296](https://github.com/flutter/flutter/issues/45296)。
:::

## 1. 找到正確的本機路徑

這個範例會顯示一個計數器。當計數器變動時，
會將資料寫入磁碟，這樣當應用程式再次載入時就能讀取到這些資料。
那麼，應該將這些資料儲存在哪裡呢？

[`path_provider`][] 套件
提供了一種與平台無關的方式，讓你可以存取裝置檔案系統中常用的位置。該套件目前支援存取
兩個檔案系統位置：

*暫存目錄（Temporary directory）*
: 一個暫存目錄（快取），系統可能隨時清除。於 iOS 上，對應到
  [`NSCachesDirectory`][]。在 Android 上，則是
  [`getCacheDir()`][] 所回傳的值。

*文件目錄（Documents directory）*
: 應用程式專用的檔案儲存目錄，只有該 app 可以存取。系統只會在 app
  被刪除時才清除該目錄。
  在 iOS 上，對應到 `NSDocumentDirectory`。
  在 Android 上，則是 `AppData` 目錄。

本範例會將資料儲存在文件目錄中。
你可以透過以下方式取得文件目錄的路徑：

<?code-excerpt "lib/main.dart (localPath)"?>
```dart
import 'package:path_provider/path_provider.dart';
  // ···
  Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();

    return directory.path;
  }
```

## 2. 建立檔案位置的參考

當你已經知道要將檔案儲存在哪裡時，請建立一個指向該檔案完整位置的參考。你可以使用 [`File`][]
類別，這個類別來自 [`dart:io`][] 函式庫，來達成這個目的。

<?code-excerpt "lib/main.dart (localFile)"?>
```dart
Future<File> get _localFile async {
  final path = await _localPath;
  return File('$path/counter.txt');
}
```

## 3. 將資料寫入檔案

現在你已經有了一個 `File` 可以使用，
接下來就用它來讀取和寫入資料。
首先，將一些資料寫入檔案。
這個計數器是一個整數，但會透過 `'$counter'` 語法
以字串的形式寫入檔案。

<?code-excerpt "lib/main.dart (writeCounter)"?>
```dart
Future<File> writeCounter(int counter) async {
  final file = await _localFile;

  // Write the file
  return file.writeAsString('$counter');
}
```

## 4. 從檔案讀取資料

現在你已經將一些資料寫入磁碟，可以開始讀取它了。
同樣地，請使用 `File` 類別。

<?code-excerpt "lib/main.dart (readCounter)"?>
```dart
Future<int> readCounter() async {
  try {
    final file = await _localFile;

    // Read the file
    final contents = await file.readAsString();

    return int.parse(contents);
  } catch (e) {
    // If encountering an error, return 0
    return 0;
  }
}
```

## 完整範例

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';

void main() {
  runApp(
    MaterialApp(
      title: 'Reading and Writing Files',
      home: FlutterDemo(storage: CounterStorage()),
    ),
  );
}

class CounterStorage {
  Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();

    return directory.path;
  }

  Future<File> get _localFile async {
    final path = await _localPath;
    return File('$path/counter.txt');
  }

  Future<int> readCounter() async {
    try {
      final file = await _localFile;

      // Read the file
      final contents = await file.readAsString();

      return int.parse(contents);
    } catch (e) {
      // If encountering an error, return 0
      return 0;
    }
  }

  Future<File> writeCounter(int counter) async {
    final file = await _localFile;

    // Write the file
    return file.writeAsString('$counter');
  }

}

class FlutterDemo extends StatefulWidget {
  const FlutterDemo({super.key, required this.storage});

  final CounterStorage storage;

  @override
  State<FlutterDemo> createState() => _FlutterDemoState();
}

class _FlutterDemoState extends State<FlutterDemo> {
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    widget.storage.readCounter().then((value) {
      setState(() {
        _counter = value;
      });
    });
  }

  Future<File> _incrementCounter() {
    setState(() {
      _counter++;
    });

    // Write the variable as a string to the file.
    return widget.storage.writeCounter(_counter);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Reading and Writing Files')),
      body: Center(
        child: Text('Button tapped $_counter time${_counter == 1 ? '' : 's'}.'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

[`dart:io`]: https://api.flutter.dev/flutter/dart-io/dart-io-library.html
[`File`]: https://api.flutter.dev/flutter/dart-io/File-class.html
[`getCacheDir()`]: https://developer.android.com/reference/android/content/Context#getCacheDir()
[`NSCachesDirectory`]: https://developer.apple.com/documentation/foundation/nssearchpathdirectory/nscachesdirectory
[`path_provider`]: https://pub.dev/packages/path_provider

