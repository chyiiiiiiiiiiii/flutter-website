---
title: "持久化儲存架構：SQL"
description: 使用 SQL 將複雜的應用程式資料儲存到使用者裝置。
contentTags:
  - data
  - SQL
iconPath: /assets/images/docs/app-architecture/design-patterns/sql-icon.svg
order: 2
---

<?code-excerpt path-base="app-architecture/todo_data_service"?>

大多數 Flutter 應用程式，無論規模大小，最終都可能需要將資料儲存在使用者的裝置上。例如，API 金鑰、使用者偏好設定，或是應該可離線存取的資料。

在本教學中，你將學習如何在遵循 Flutter 架構設計模式的 Flutter 應用程式中，使用 SQL 整合複雜資料的持久化儲存。

若你想了解如何儲存較簡單的鍵值資料，請參考 Cookbook 教學：[持久化儲存架構：鍵值資料](/app-architecture/design-patterns/key-value-data)。

閱讀本教學前，你應該已熟悉 SQL 與 SQLite。如果需要協助，建議先閱讀 [使用 SQLite 持久化資料](/cookbook/persistence/sqlite) 教學。

本範例使用 [`sqflite`]({{site.pub}}/packages/sqflite) 搭配 [`sqflite_common_ffi`]({{site.pub}}/packages/sqflite_common_ffi) 套件，兩者結合可同時支援行動裝置與桌面端。Web 支援則由實驗性套件 [`sqflite_common_ffi_web`]({{site.pub}}/packages/sqflite_common_ffi_web) 提供，但本範例未涵蓋。

## 範例應用程式：待辦清單應用程式

本範例應用程式包含單一螢幕，頂部有 app bar，中間為項目清單，底部則有文字欄位 (text field) 輸入區。

<img src='/assets/images/docs/cookbook/architecture/todo_app_light.png'
class="site-mobile-screenshot" alt="ToDo application in light mode" >

應用程式主體包含 `TodoListScreen`。此螢幕包含一個 `ListView`，其內為 `ListTile` 項目，每個項目代表一個待辦事項 (ToDo item)。在底部，`TextField` 讓使用者可以輸入任務描述，然後點擊 "Add" `FilledButton` 來建立新的待辦事項。

使用者可以點擊刪除 `IconButton` 來刪除待辦事項。

待辦事項清單會透過資料庫服務儲存在本地端，並在使用者啟動應用程式時還原。

:::note
本範例的完整可執行原始碼可在 [`/examples/app-architecture/todo_data_service/`]({{site.repo.this}}/tree/main/examples/app-architecture/todo_data_service/) 取得。
:::

## 使用 SQL 儲存複雜資料

此功能遵循推薦的 [Flutter 架構設計](/app-architecture)，包含 UI 層與資料層。此外，在領域層 (domain layer) 你會看到所使用的資料模型。

- UI 層：`TodoListScreen` 與 `TodoListViewModel`
- 領域層：`Todo` 資料類別
- 資料層：`TodoRepository` 與 `DatabaseService`

### 待辦清單呈現層

`TodoListScreen` 是一個元件 (Widget)，負責顯示與建立待辦事項的 UI。它遵循 [MVVM 模式](/app-architecture/guide#mvvm)，並搭配 `TodoListViewModel`，其中包含待辦事項清單，以及三個指令：載入、加入與刪除待辦事項。

此螢幕分為兩個部分，一部分為待辦事項清單，使用 `ListView` 實作；另一部分則是 `TextField` 與 `Button`，用於建立新的待辦事項。

`ListView` 會被 `ListenableBuilder` 包裹，`ListenableBuilder` 會監聽 `TodoListViewModel` 的變化，並為每個待辦事項顯示一個 `ListTile`。

<?code-excerpt "lib/ui/todo_list/widgets/todo_list_screen.dart (ListenableBuilder)" replace="/child: //g;/^\),$/)/g"?>
```dart
ListenableBuilder(
  listenable: widget.viewModel,
  builder: (context, child) {
    return ListView.builder(
      itemCount: widget.viewModel.todos.length,
      itemBuilder: (context, index) {
        final todo = widget.viewModel.todos[index];
        return ListTile(
          title: Text(todo.task),
          trailing: IconButton(
            icon: const Icon(Icons.delete),
            onPressed: () => widget.viewModel.delete.execute(todo.id),
          ),
        );
      },
    );
  },
)
```

待辦事項（ToDo）清單定義在 `TodoListViewModel` 中，
並由 `load` 指令載入。
此方法會呼叫 `TodoRepository` 並取得待辦事項清單。

<?code-excerpt "lib/ui/todo_list/viewmodel/todo_list_viewmodel.dart (TodoListViewModel)"?>
```dart
List<Todo> _todos = [];

List<Todo> get todos => _todos;

Future<Result<void>> _load() async {
  try {
    final result = await _todoRepository.fetchTodos();
    switch (result) {
      case Ok<List<Todo>>():
        _todos = result.value;
        return Result.ok(null);
      case Error():
        return Result.error(result.error);
    }
  } on Exception catch (e) {
    return Result.error(e);
  } finally {
    notifyListeners();
  }
}
```

按下 `FilledButton`，
會執行 `add` 指令，
並傳入文字控制器的值。

<?code-excerpt "lib/ui/todo_list/widgets/todo_list_screen.dart (FilledButton)" replace="/^\),$/)/g"?>
```dart
FilledButton.icon(
  onPressed: () =>
      widget.viewModel.add.execute(_controller.text),
  label: const Text('Add'),
  icon: const Icon(Icons.add),
)
```

`add` 指令接著會呼叫 `TodoRepository.createTodo()` 方法，
並傳入任務描述文字，進而建立一個新的 ToDo 項目。

`createTodo()` 方法會回傳新建立的 ToDo，
然後將其加入到檢視模型（view model）中的 `_todo` 清單。

ToDo 項目包含由資料庫產生的唯一識別碼。
這也是為什麼檢視模型（view model）本身不會建立 ToDo 項目，
而是由 `TodoRepository` 來負責。

<?code-excerpt "lib/ui/todo_list/viewmodel/todo_list_viewmodel.dart (Add)"?>
```dart
Future<Result<void>> _add(String task) async {
  try {
    final result = await _todoRepository.createTodo(task);
    switch (result) {
      case Ok<Todo>():
        _todos.add(result.value);
        return Result.ok(null);
      case Error():
        return Result.error(result.error);
    }
  } on Exception catch (e) {
    return Result.error(e);
  } finally {
    notifyListeners();
  }
}
```

最後，`TodoListScreen` 也會監聽 `add` 指令中的結果。
當動作完成時，`TextEditingController` 會被清除。

<?code-excerpt "lib/ui/todo_list/widgets/todo_list_screen.dart (Add)"?>
```dart
void _onAdd() {
  // Clear the text field when the add command completes.
  if (widget.viewModel.add.completed) {
    widget.viewModel.add.clearResult();
    _controller.clear();
  }
}
```

當使用者在 `ListTile` 中點擊 `IconButton` 時，將會執行刪除指令。

<?code-excerpt "lib/ui/todo_list/widgets/todo_list_screen.dart (Delete)" replace="/trailing: //g;/^\),$/)/g"?>
```dart
IconButton(
  icon: const Icon(Icons.delete),
  onPressed: () => widget.viewModel.delete.execute(todo.id),
)
```

接著，view model 會呼叫 `TodoRepository.deleteTodo()` 方法，
並傳入該 ToDo 項目的唯一識別碼。
正確執行後，該 ToDo 項目會從 view model *以及* 螢幕上移除。

<?code-excerpt "lib/ui/todo_list/viewmodel/todo_list_viewmodel.dart (Delete)"?>
```dart
Future<Result<void>> _delete(int id) async {
  try {
    final result = await _todoRepository.deleteTodo(id);
    switch (result) {
      case Ok<void>():
        _todos.removeWhere((todo) => todo.id == id);
        return Result.ok(null);
      case Error():
        return Result.error(result.error);
    }
  } on Exception catch (e) {
    return Result.error(e);
  } finally {
    notifyListeners();
  }
}
```

### Todo list 領域層（domain layer）

此範例應用程式的領域層包含 `Todo` 項目資料模型。

每個項目皆以不可變的資料類別（immutable data class）表示。
在本例中，應用程式使用 `freezed` 套件來產生相關程式碼。

該類別有兩個屬性，一個是以 `int` 表示的 ID，以及一個以 `String` 表示的任務描述。

<?code-excerpt "lib/business/model/todo.dart (Todo)"?>
```dart
@freezed
abstract class Todo with _$Todo {
  const factory Todo({
    /// The unique identifier of the Todo item.
    required int id,

    /// The task description of the Todo item.
    required String task,
  }) = _Todo;
}
```

### Todo 清單資料層

此功能的資料層由兩個類別組成，分別是 `TodoRepository` 和 `DatabaseService`。

`TodoRepository` 作為所有 Todo 項目的權威資料來源（source of truth）。View model 必須透過這個 repository 來存取 Todo 清單，且不應暴露任何關於其儲存方式的實作細節。

在內部，`TodoRepository` 會使用 `DatabaseService`，而 `DatabaseService` 則透過 `sqflite` 套件來實作對 SQL 資料庫的存取。你也可以使用其他儲存套件（如 `sqlite3`、`drift`），甚至是雲端儲存解決方案（如 `firebase_database`），來實作相同的 `DatabaseService`。

`TodoRepository` 會在每次請求前檢查資料庫是否已開啟，必要時會自動開啟。

它實作了 `fetchTodos()`、`createTodo()` 和 `deleteTodo()` 方法。

<?code-excerpt "lib/data/repositories/todo_repository.dart (TodoRepository)"?>
```dart
class TodoRepository {
  TodoRepository({required this._database});

  final DatabaseService _database;

  Future<Result<List<Todo>>> fetchTodos() async {
    if (!_database.isOpen()) {
      await _database.open();
    }
    return _database.getAll();
  }

  Future<Result<Todo>> createTodo(String task) async {
    if (!_database.isOpen()) {
      await _database.open();
    }
    return _database.insert(task);
  }

  Future<Result<void>> deleteTodo(int id) async {
    if (!_database.isOpen()) {
      await _database.open();
    }
    return _database.delete(id);
  }
}
```

`DatabaseService` 透過 `sqflite` 套件來實作對 SQLite 資料庫的存取。

建議將資料表與欄位名稱定義為常數，以避免在撰寫 SQL 程式碼時發生拼字錯誤。

<?code-excerpt "lib/data/services/database_service.dart (Table)"?>
```dart
static const String _todoTableName = 'todo';
static const String _idColumnName = '_id';
static const String _taskColumnName = 'task';
```

`open()` 方法會開啟現有的資料庫，
如果資料庫不存在，則會建立一個新的。

<?code-excerpt "lib/data/services/database_service.dart (Open)"?>
```dart
Future<void> open() async {
  _database = await databaseFactory.openDatabase(
    join(await databaseFactory.getDatabasesPath(), 'app_database.db'),
    options: OpenDatabaseOptions(
      onCreate: (db, version) {
        return db.execute(
          'CREATE TABLE $_todoTableName($_idColumnName INTEGER PRIMARY KEY AUTOINCREMENT, $_taskColumnName TEXT)',
        );
      },
      version: 1,
    ),
  );
}
```

請注意，欄位 `id` 被設為 `primary key` 和 `autoincrement`；
這表示每次插入新項目時，
`id` 欄位都會被指派一個新的值。

`insert()` 方法會在資料庫中建立一個新的 ToDo 項目，
並回傳一個新建立的 Todo 實例。
如前所述，`id` 會自動產生。

<?code-excerpt "lib/data/services/database_service.dart (Insert)"?>
```dart
Future<Result<Todo>> insert(String task) async {
  try {
    final id = await _database!.insert(_todoTableName, {
      _taskColumnName: task,
    });
    return Result.ok(Todo(id: id, task: task));
  } on Exception catch (e) {
    return Result.error(e);
  }
}
```

所有的 `DatabaseService` 操作都使用 `Result` 類別來回傳值，這是依照 [Flutter 架構建議](/app-architecture) 所推薦的做法。這有助於在應用程式後續的程式碼步驟中處理錯誤。

`getAll()` 方法會執行資料庫查詢，取得 `id` 與 `task` 欄位中的所有數值。對於每一筆資料，會建立一個 `Todo` 類別的實例。

<?code-excerpt "lib/data/services/database_service.dart (GetAll)"?>
```dart
Future<Result<List<Todo>>> getAll() async {
  try {
    final entries = await _database!.query(
      _todoTableName,
      columns: [_idColumnName, _taskColumnName],
    );
    final list = entries
        .map(
          (element) => Todo(
            id: element[_idColumnName] as int,
            task: element[_taskColumnName] as String,
          ),
        )
        .toList();
    return Result.ok(list);
  } on Exception catch (e) {
    return Result.error(e);
  }
}
```

`delete()` 方法會根據 ToDo 項目 `id` 執行資料庫刪除操作。

在此情況下，如果沒有任何項目被刪除，則會回傳錯誤，表示發生了某些問題。

<?code-excerpt "lib/data/services/database_service.dart (Delete)"?>
```dart
Future<Result<void>> delete(int id) async {
  try {
    final rowsDeleted = await _database!.delete(
      _todoTableName,
      where: '$_idColumnName = ?',
      whereArgs: [id],
    );
    if (rowsDeleted == 0) {
      return Result.error(Exception('No todo found with id $id'));
    }
    return Result.ok(null);
  } on Exception catch (e) {
    return Result.error(e);
  }
}
```

:::note
在某些情況下，你可能會希望在使用完資料庫後將其關閉。
例如，當使用者離開螢幕時，
或是在經過一段特定時間後。

這取決於資料庫的實作方式
以及你的應用程式需求。
建議你參考該資料庫套件作者的建議做法。
:::

## 整合應用

在應用程式的 `main()` 方法中，
首先初始化 `DatabaseService`，
而這在不同平台上需要不同的初始化程式碼。
接著，將新建立的 `DatabaseService` 傳入 `TodoRepository`，
而 `TodoRepository` 本身則作為建構子參數相依性傳入 `MainApp`。

<?code-excerpt "lib/main.dart (MainTodo)"?>
```dart
void main() {
  late DatabaseService databaseService;
  if (kIsWeb) {
    throw UnsupportedError('Platform not supported');
  } else if (Platform.isLinux || Platform.isWindows || Platform.isMacOS) {
    // Initialize FFI SQLite
    sqfliteFfiInit();
    databaseService = DatabaseService(databaseFactory: databaseFactoryFfi);
  } else {
    // Use default native SQLite
    databaseService = DatabaseService(databaseFactory: databaseFactory);
  }

  runApp(
    MainApp(
      // ···
      todoRepository: TodoRepository(database: databaseService),
    ),
  );
}
```

然後，當建立 `TodoListScreen` 時，
同時建立 `TodoListViewModel`，
並將 `TodoRepository` 作為相依性傳遞給它。

<?code-excerpt "lib/main.dart (TodoListScreen)" replace="/body: //g;/^\),$/)/g"?>
```dart
TodoListScreen(
  viewModel: TodoListViewModel(todoRepository: widget.todoRepository),
)
```

[Flutter Architecture design]:/app-architecture
[Flutter architecture recommendations]:/app-architecture
[MVVM pattern]:/app-architecture/guide#mvvm
[Persist data with SQLite]:/cookbook/persistence/sqlite
[Persistent storage architecture: Key-value data]:/app-architecture/design-patterns/key-value-data
[`/examples/app-architecture/todo_data_service/`]: {{site.repo.this}}/tree/main/examples/app-architecture/todo_data_service/
[`sqflite_common_ffi_web`]:{{site.pub}}/packages/sqflite_common_ffi_web
[`sqflite_common_ffi`]:{{site.pub}}/packages/sqflite_common_ffi
[`sqflite`]:{{site.pub}}/packages/sqflite
