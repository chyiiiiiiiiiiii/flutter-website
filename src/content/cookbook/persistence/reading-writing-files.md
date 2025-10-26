---
title: 讀寫檔案
description: 如何在磁碟上讀取與寫入檔案。
---

<?code-excerpt path-base="cookbook/persistence/reading_writing_files/"?>

在某些情況下，你需要將檔案讀寫到磁碟上。
例如，你可能需要在應用程式啟動之間持久化資料，
或是從網路下載資料並儲存起來以供離線使用。

若要在行動裝置或桌面應用程式中將檔案儲存到磁碟，
請結合 [`path_provider`][`path_provider`] 套件與 [`dart:io`][`dart:io`] 函式庫。

本教學將採用以下步驟：

  1. 找到正確的本機路徑。
  2. 建立檔案位置的參考。
  3. 將資料寫入檔案。
  4. 從檔案讀取資料。

想進一步了解，請觀看這支關於 `path_provider` 套件的「本週套件」介紹影片：

{% ytEmbed 'Ci4t-NkOY3I', 'path_provider | Flutter package of the week' %}

:::note
本教學目前不支援網頁應用程式。
若想追蹤相關討論，
請參考 `flutter/flutter` [issue #45296]({{site.repo.flutter}}/issues/45296)。
:::

## 1. 找到正確的本機路徑

本範例會顯示一個計數器。當計數器變動時，
會將資料寫入磁碟，以便在應用程式重新載入時再次讀取。
那麼，應該將這些資料儲存在哪裡呢？

[`path_provider`][`path_provider`] 套件
提供一種與平台無關的方式，讓你可以存取裝置檔案系統中常用的位置。該套件目前支援存取
兩個檔案系統位置：

*暫存目錄（Temporary directory）*
：一個暫時性的目錄（快取），系統可能隨時清除。在 iOS 上，對應到
  [`NSCachesDirectory`][`NSCachesDirectory`]。在 Android 上，則為
  [`getCacheDir()`][`getCacheDir()`] 回傳的值。

*文件目錄（Documents directory）*
：一個專供應用程式儲存檔案的目錄，只有該應用程式能夠存取。系統僅在應用程式被刪除時才會清除該目錄。
  在 iOS 上，對應到 `NSDocumentDirectory`。
  在 Android 上，則為 `AppData` 目錄。

本範例會將資訊儲存在文件目錄（Documents directory）中。
你可以透過以下方式找到文件目錄的路徑：

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

當你已經知道要將檔案儲存在哪裡時，請建立一個指向該檔案完整位置的參考。你可以使用 [`File`][`File`] 類別，這個類別來自 [`dart:io`][`dart:io`] 函式庫，來達成這個目的。

<?code-excerpt "lib/main.dart (localFile)"?>
```dart
Future<File> get _localFile async {
  final path = await _localPath;
  return File('$path/counter.txt');
}
```

## 3. 將資料寫入檔案

現在你已經有了`File`可以使用，
接下來就可以用它來讀取與寫入資料。
首先，將一些資料寫入檔案。
計數器是一個整數，但會使用`'$counter'`語法
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

現在你已經將一些資料寫入磁碟，可以開始讀取這些資料了。
同樣地，請再次使用 `File` 類別。

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

[`dart:io`]: {{site.api}}/flutter/dart-io/dart-io-library.html  
[`File`]: {{site.api}}/flutter/dart-io/File-class.html  
[`getCacheDir()`]: {{site.android-dev}}/reference/android/content/Context#getCacheDir()  
[`NSCachesDirectory`]: {{site.apple-dev}}/documentation/foundation/nssearchpathdirectory/nscachesdirectory  
[`path_provider`]: {{site.pub-pkg}}/path_provider
