# 將鍵值資料儲存到磁碟

> 學習如何使用 shared_preferences 套件來儲存鍵值資料。



<?code-excerpt path-base="cookbook/persistence/key_value/"?>

如果你有一組相對較小的鍵值資料需要儲存，可以使用 [`shared_preferences`][] 插件。

一般來說，你需要針對每個平台撰寫原生平台的整合程式來儲存資料。
幸運的是，[`shared_preferences`][] 插件可以用來
在 Flutter 支援的每個平台上，將鍵值資料持久化到磁碟。

本教學將依照以下步驟進行：

  1. 新增相依套件。
  2. 儲存資料。
  3. 讀取資料。
  4. 移除資料。

:::note
想了解更多，請觀看這部關於 `shared_preferences` 套件的短片「本週套件」：

<YouTubeEmbed id="sa_U0jffQII" title="shared_preferences | Flutter package of the week"></YouTubeEmbed>
:::

## 1. 新增相依套件

在開始之前，請先將 [`shared_preferences`][] 套件加入為相依套件。

要將 `shared_preferences` 套件加入為相依套件，
請執行 `flutter pub add`：

```console
flutter pub add shared_preferences
```

## 2. 儲存資料

要將資料持久化，請使用 `SharedPreferences` 類別所提供的 setter 方法。這些 setter 方法支援多種基本型別，例如 `setInt`、`setBool` 和 `setString`。

Setter 方法會執行兩個動作：首先，會同步地在記憶體中更新 key-value 配對。接著，會將資料持久化儲存到磁碟中。

<?code-excerpt "lib/partial_excerpts.dart (Step2)"?>
```dart
// Load and obtain the shared preferences for this app.
final prefs = await SharedPreferences.getInstance();

// Save the counter value to persistent storage under the 'counter' key.
await prefs.setInt('counter', counter);
```

## 3. 讀取資料

要讀取資料，請使用 `SharedPreferences` 類別所提供的對應 getter 方法。每個 setter 都有一個相對應的 getter。例如，你可以使用 `getInt`、`getBool` 和 `getString` 方法。

<?code-excerpt "lib/partial_excerpts.dart (Step3)"?>
```dart
final prefs = await SharedPreferences.getInstance();

// Try reading the counter value from persistent storage.
// If not present, null is returned, so default to 0.
final counter = prefs.getInt('counter') ?? 0;
```

請注意，如果持久化的值類型與 getter 方法所期望的類型不同，getter 方法會拋出例外。

## 4. 移除資料

若要刪除資料，請使用 `remove()` 方法。

<?code-excerpt "lib/partial_excerpts.dart (Step4)"?>
```dart
final prefs = await SharedPreferences.getInstance();

// Remove the counter key-value pair from persistent storage.
await prefs.remove('counter');
```

## 支援的型別

雖然 `shared_preferences` 提供的鍵值儲存（key-value storage）簡單且方便使用，但它有以下限制：

* 只能使用原始型別（primitive types）：`int`、`double`、`bool`、`String` 和 `List<String>`。
* 它並非設計用來儲存大量資料。
* 無法保證資料在應用程式重新啟動後仍會被保留。

## 測試支援

建議針對使用 `shared_preferences` 進行資料持久化的程式碼進行測試。
為了達成這個目的，該套件提供了一個記憶體內（in-memory）的偏好設定儲存（preference store）模擬實作（mock implementation）。

若要在測試中使用這個模擬實作，請在測試檔案中的 `setUpAll()` 方法內呼叫 `setMockInitialValues` 靜態方法。
傳入一個作為初始值的鍵值對（key-value pairs）map。

<?code-excerpt "test/prefs_test.dart (setup)"?>
```dart
SharedPreferences.setMockInitialValues(<String, Object>{'counter': 2});
```

## 完整範例

<?code-excerpt "lib/main.dart"?>
```dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Shared preferences demo',
      home: MyHomePage(title: 'Shared preferences demo'),
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
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    _loadCounter();
  }

  /// Load the initial counter value from persistent storage on start,
  /// or fallback to 0 if it doesn't exist.
  Future<void> _loadCounter() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _counter = prefs.getInt('counter') ?? 0;
    });
  }

  /// After a click, increment the counter state and
  /// asynchronously save it to persistent storage.
  Future<void> _incrementCounter() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _counter = (prefs.getInt('counter') ?? 0) + 1;
      prefs.setInt('counter', _counter);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('You have pushed the button this many times: '),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
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

[`shared_preferences`]: https://pub.dev/packages/shared_preferences

