---
title: 使用 SQLite 儲存資料
description: 如何使用 SQLite 來儲存與讀取資料。
---

<?code-excerpt path-base="cookbook/persistence/sqlite/"?>

:::note
本指南使用 [sqflite 套件][sqflite package]。
此套件僅支援在 macOS、iOS 或 Android 上執行的應用程式。
:::

[sqflite package]: {{site.pub-pkg}}/sqflite

如果你正在開發一個需要在本地裝置上儲存與查詢大量資料的應用程式，建議使用資料庫來取代本地檔案或鍵值儲存（key-value store）。一般而言，資料庫在插入、更新與查詢資料時，效能會優於其他本地持久化方案。

Flutter 應用程式可以透過 [`sqflite`][`sqflite`] 套件（plugin），在 pub.dev 上取得對 SQLite 資料庫的支援。
本教學將示範如何使用 `sqflite` 來插入、讀取、更新與刪除有關不同狗狗（Dogs）的資料。

如果你是第一次接觸 SQLite 與 SQL 語法，建議先參考 [SQLite Tutorial][SQLite Tutorial]，學習基本知識後再完成本教學。

本教學包含以下步驟：

  1. 新增相依套件。
  2. 定義 `Dog` 資料模型。
  3. 開啟資料庫。
  4. 建立 `dogs` 資料表。
  5. 將 `Dog` 插入資料庫。
  6. 取得狗狗清單。
  7. 在資料庫中更新 `Dog`。
  7. 從資料庫中刪除 `Dog`。

## 1. 新增相依套件

要操作 SQLite 資料庫，請匯入 `sqflite` 與 `path` 套件。

  * `sqflite` 套件提供與 SQLite 資料庫互動的類別與函式。
  * `path` 套件提供定義資料庫儲存於磁碟位置的相關函式。

要將這些套件加入為相依套件，請執行 `flutter pub add`：

```console
$ flutter pub add sqflite path
```

請確保在你要編輯的檔案中匯入相關套件。

<?code-excerpt "lib/main.dart (imports)"?>
```dart
import 'dart:async';

import 'package:flutter/widgets.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
```

## 2. 定義 Dog 資料模型

在建立用於儲存 Dog 資訊的資料表之前，請先花點時間定義需要儲存的資料。在這個範例中，定義一個 Dog 類別，包含三個資料欄位：
每隻狗都有一個唯一的 `id`、`name`，以及 `age`。

<?code-excerpt "lib/step2.dart"?>
```dart
class Dog {
  final int id;
  final String name;
  final int age;

  const Dog({required this.id, required this.name, required this.age});
}
```

## 3. 開啟資料庫

在讀取和寫入資料到資料庫之前，需先建立與資料庫的連線。這包含兩個步驟：

  1. 使用`sqflite`套件中的`getDatabasesPath()`，結合`path`套件中的`join`函式，定義資料庫檔案的路徑。
  2. 使用`sqflite`中的`openDatabase()`函式來開啟資料庫。

:::note
為了使用關鍵字`await`，程式碼必須寫在`async`函式內。你應該將下列所有的資料表函式都放在`void main() async {}`中。
:::

<?code-excerpt "lib/step3.dart (openDatabase)"?>
```dart
// Avoid errors caused by flutter upgrade.
// Importing 'package:flutter/widgets.dart' is required.
WidgetsFlutterBinding.ensureInitialized();
// Open the database and store the reference.
final database = openDatabase(
  // Set the path to the database. Note: Using the `join` function from the
  // `path` package is best practice to ensure the path is correctly
  // constructed for each platform.
  join(await getDatabasesPath(), 'doggie_database.db'),
);
```

## 4. 建立 `dogs` 資料表

接下來，建立一個資料表來儲存各種狗（Dogs）的資訊。
在這個範例中，請建立一個名為 `dogs` 的資料表，定義可儲存的資料內容。
每個 `Dog` 都包含 `id`、`name` 和 `age`。
因此，這些資料會以三個欄位的形式存在於 `dogs` 資料表中。

  1. `id` 是 Dart `int`，在 SQLite 中以 `INTEGER` 資料型別（Datatype）儲存。一般建議將 `id` 設為資料表的主鍵（primary key），以提升查詢與更新效率。
  2. `name` 是 Dart `String`，在 SQLite 中以 `TEXT` 資料型別儲存。
  3. `age` 也是 Dart `int`，在 SQLite 中以 `INTEGER` 資料型別儲存。

如需更多關於 SQLite 可儲存資料型別（Datatypes）的資訊，請參閱 [官方 SQLite Datatypes 文件][official SQLite Datatypes documentation]。

<?code-excerpt "lib/main.dart (openDatabase)"?>
```dart
final database = openDatabase(
  // Set the path to the database. Note: Using the `join` function from the
  // `path` package is best practice to ensure the path is correctly
  // constructed for each platform.
  join(await getDatabasesPath(), 'doggie_database.db'),
  // When the database is first created, create a table to store dogs.
  onCreate: (db, version) {
    // Run the CREATE TABLE statement on the database.
    return db.execute(
      'CREATE TABLE dogs(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)',
    );
  },
  // Set the version. This executes the onCreate function and provides a
  // path to perform database upgrades and downgrades.
  version: 1,
);
```

## 5. 將 Dog 插入資料庫

現在你已經有了一個包含適合儲存多隻狗資訊的資料表的資料庫，是時候來讀取與寫入資料了。

首先，將一個 `Dog` 插入到 `dogs` 資料表中。這包含兩個步驟：

1. 將 `Dog` 轉換為 `Map`
2. 使用 [`insert()`][`insert()`] 方法，將 `Map` 儲存到 `dogs` 資料表中。

<?code-excerpt "lib/main.dart (Dog)"?>
```dart
class Dog {
  final int id;
  final String name;
  final int age;

  Dog({required this.id, required this.name, required this.age});

  // Convert a Dog into a Map. The keys must correspond to the names of the
  // columns in the database.
  Map<String, Object?> toMap() {
    return {'id': id, 'name': name, 'age': age};
  }

  // Implement toString to make it easier to see information about
  // each dog when using the print statement.
  @override
  String toString() {
    return 'Dog{id: $id, name: $name, age: $age}';
  }
}
```

<?code-excerpt "lib/main.dart (insertDog)"?>
```dart
// Define a function that inserts dogs into the database
Future<void> insertDog(Dog dog) async {
  // Get a reference to the database.
  final db = await database;

  // Insert the Dog into the correct table. You might also specify the
  // `conflictAlgorithm` to use in case the same dog is inserted twice.
  //
  // In this case, replace any previous data.
  await db.insert(
    'dogs',
    dog.toMap(),
    conflictAlgorithm: ConflictAlgorithm.replace,
  );
}
```

<?code-excerpt "lib/main.dart (fido)"?>
```dart
// Create a Dog and add it to the dogs table
var fido = Dog(id: 0, name: 'Fido', age: 35);

await insertDog(fido);
```

## 6. 取得 Dogs 清單

現在已經將 `Dog` 儲存到資料庫中，可以查詢資料庫以取得特定的 dog 或所有 dogs 的清單。這包含兩個步驟：

  1. 對 `dogs` 資料表執行 `query`。這會回傳一個 `List<Map>`。
  2. 將 `List<Map>` 轉換為 `List<Dog>`。

<?code-excerpt "lib/main.dart (dogs)"?>
```dart
// A method that retrieves all the dogs from the dogs table.
Future<List<Dog>> dogs() async {
  // Get a reference to the database.
  final db = await database;

  // Query the table for all the dogs.
  final List<Map<String, Object?>> dogMaps = await db.query('dogs');

  // Convert the list of each dog's fields into a list of `Dog` objects.
  return [
    for (final {'id': id as int, 'name': name as String, 'age': age as int}
        in dogMaps)
      Dog(id: id, name: name, age: age),
  ];
}
```

<?code-excerpt "lib/main.dart (print)"?>
```dart
// Now, use the method above to retrieve all the dogs.
print(await dogs()); // Prints a list that include Fido.
```

## 7. 更新資料庫中的 `Dog`

在將資訊插入資料庫後，
你可能會希望在之後的某個時間點更新這些資訊。
你可以透過 `sqflite` 函式庫中的 [`update()`][`update()`]
方法來完成這件事。

這個過程包含兩個步驟：

  1. 將 Dog 轉換為 Map。
  2. 使用 `where` 子句來確保你更新的是正確的 Dog。

<?code-excerpt "lib/main.dart (update)"?>
```dart
Future<void> updateDog(Dog dog) async {
  // Get a reference to the database.
  final db = await database;

  // Update the given Dog.
  await db.update(
    'dogs',
    dog.toMap(),
    // Ensure that the Dog has a matching id.
    where: 'id = ?',
    // Pass the Dog's id as a whereArg to prevent SQL injection.
    whereArgs: [dog.id],
  );
}
```

<?code-excerpt "lib/main.dart (update2)"?>
```dart
// Update Fido's age and save it to the database.
fido = Dog(id: fido.id, name: fido.name, age: fido.age + 7);
await updateDog(fido);

// Print the updated results.
print(await dogs()); // Prints Fido with age 42.
```

:::warning
請務必使用 `whereArgs` 來傳遞參數給 `where` 陳述式。  
這有助於防範 SQL 注入攻擊。

請勿使用字串插值，例如 `where: "id = ${dog.id}"`！
:::

## 8. 從資料庫刪除 `Dog`

除了插入與更新 Dogs 的資訊之外，  
你也可以從資料庫中移除 dog。若要刪除資料，  
請使用 `sqflite` 函式庫中的 [`delete()`][`delete()`] 方法。

在本節中，將建立一個函式，該函式接收一個 id，並從資料庫中刪除 id 相符的 dog。  
為了讓這個操作生效，你必須提供 `where` 子句，以限制被刪除的紀錄。

<?code-excerpt "lib/main.dart (deleteDog)"?>
```dart
Future<void> deleteDog(int id) async {
  // Get a reference to the database.
  final db = await database;

  // Remove the Dog from the database.
  await db.delete(
    'dogs',
    // Use a `where` clause to delete a specific dog.
    where: 'id = ?',
    // Pass the Dog's id as a whereArg to prevent SQL injection.
    whereArgs: [id],
  );
}
```

## 範例

執行此範例的步驟如下：

  1. 建立一個新的 Flutter 專案。
  2. 在你的 `pubspec.yaml` 中加入 `sqflite` 和 `path` 套件。
  3. 將下列程式碼貼到一個名為 `lib/db_test.dart` 的新檔案中。
  4. 使用 `flutter run lib/db_test.dart` 執行程式碼。

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';

import 'package:flutter/widgets.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

void main() async {
  // Avoid errors caused by flutter upgrade.
  // Importing 'package:flutter/widgets.dart' is required.
  WidgetsFlutterBinding.ensureInitialized();
  // Open the database and store the reference.
  final database = openDatabase(
    // Set the path to the database. Note: Using the `join` function from the
    // `path` package is best practice to ensure the path is correctly
    // constructed for each platform.
    join(await getDatabasesPath(), 'doggie_database.db'),
    // When the database is first created, create a table to store dogs.
    onCreate: (db, version) {
      // Run the CREATE TABLE statement on the database.
      return db.execute(
        'CREATE TABLE dogs(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)',
      );
    },
    // Set the version. This executes the onCreate function and provides a
    // path to perform database upgrades and downgrades.
    version: 1,
  );

  // Define a function that inserts dogs into the database
  Future<void> insertDog(Dog dog) async {
    // Get a reference to the database.
    final db = await database;

    // Insert the Dog into the correct table. You might also specify the
    // `conflictAlgorithm` to use in case the same dog is inserted twice.
    //
    // In this case, replace any previous data.
    await db.insert(
      'dogs',
      dog.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  // A method that retrieves all the dogs from the dogs table.
  Future<List<Dog>> dogs() async {
    // Get a reference to the database.
    final db = await database;

    // Query the table for all the dogs.
    final List<Map<String, Object?>> dogMaps = await db.query('dogs');

    // Convert the list of each dog's fields into a list of `Dog` objects.
    return [
      for (final {'id': id as int, 'name': name as String, 'age': age as int}
          in dogMaps)
        Dog(id: id, name: name, age: age),
    ];
  }

  Future<void> updateDog(Dog dog) async {
    // Get a reference to the database.
    final db = await database;

    // Update the given Dog.
    await db.update(
      'dogs',
      dog.toMap(),
      // Ensure that the Dog has a matching id.
      where: 'id = ?',
      // Pass the Dog's id as a whereArg to prevent SQL injection.
      whereArgs: [dog.id],
    );
  }

  Future<void> deleteDog(int id) async {
    // Get a reference to the database.
    final db = await database;

    // Remove the Dog from the database.
    await db.delete(
      'dogs',
      // Use a `where` clause to delete a specific dog.
      where: 'id = ?',
      // Pass the Dog's id as a whereArg to prevent SQL injection.
      whereArgs: [id],
    );
  }

  // Create a Dog and add it to the dogs table
  var fido = Dog(id: 0, name: 'Fido', age: 35);

  await insertDog(fido);

  // Now, use the method above to retrieve all the dogs.
  print(await dogs()); // Prints a list that include Fido.

  // Update Fido's age and save it to the database.
  fido = Dog(id: fido.id, name: fido.name, age: fido.age + 7);
  await updateDog(fido);

  // Print the updated results.
  print(await dogs()); // Prints Fido with age 42.

  // Delete Fido from the database.
  await deleteDog(fido.id);

  // Print the list of dogs (empty).
  print(await dogs());
}

class Dog {
  final int id;
  final String name;
  final int age;

  Dog({required this.id, required this.name, required this.age});

  // Convert a Dog into a Map. The keys must correspond to the names of the
  // columns in the database.
  Map<String, Object?> toMap() {
    return {'id': id, 'name': name, 'age': age};
  }

  // Implement toString to make it easier to see information about
  // each dog when using the print statement.
  @override
  String toString() {
    return 'Dog{id: $id, name: $name, age: $age}';
  }
}
```


[`delete()`]: {{site.pub-api}}/sqflite_common/latest/sqlite_api/DatabaseExecutor/delete.html  
[`insert()`]: {{site.pub-api}}/sqflite_common/latest/sqlite_api/DatabaseExecutor/insert.html  
[`sqflite`]: {{site.pub-pkg}}/sqflite  
[SQLite Tutorial]: https://www.sqlitetutorial.net/  
[official SQLite Datatypes documentation]: https://www.sqlite.org/datatype3.html  
[`update()`]: {{site.pub-api}}/sqflite_common/latest/sqlite_api/DatabaseExecutor/update.html
