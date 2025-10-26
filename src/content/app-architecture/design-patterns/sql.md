---
title: "持久化儲存架構：SQL"
description: 使用 SQL 將複雜的應用程式資料儲存到使用者裝置。
contentTags:
  - data
  - SQL
iconPath: /assets/images/docs/app-architecture/design-patterns/sql-icon.svg
order: 2
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="app-architecture/todo_data_service"?>

大多數 Flutter 應用程式，
無論規模大小，
在某些時候都可能需要將資料儲存在使用者的裝置上。
例如，API 金鑰、
使用者偏好設定，或是應該能離線存取的資料。

在本教學中，
你將學會如何在遵循 Flutter 架構設計模式的 Flutter 應用程式中，
使用 SQL 整合複雜資料的持久化儲存。

若想了解如何儲存較簡單的鍵值資料，
請參考 Cookbook 教學：
[持久化儲存架構：鍵值資料][Persistent storage architecture: Key-value data]。

在閱讀本教學前，
你應該已熟悉 SQL 與 SQLite。
如果需要協助，可以先閱讀 [使用 SQLite 儲存資料][Persist data with SQLite] 教學，
再回來閱讀本篇。

本範例使用 [`sqflite`][`sqflite`] 搭配 [`sqflite_common_ffi`][`sqflite_common_ffi`] 套件，
兩者結合後可同時支援行動裝置與桌面端。
Web 支援則由實驗性套件 [`sqflite_common_ffi_web`][`sqflite_common_ffi_web`] 提供，
但本範例未涵蓋。

## 範例應用程式：待辦清單應用程式

範例應用程式包含單一個螢幕，頂部有應用程式列（app bar），
中間是一個項目清單，底部則有一個文字欄位（text field）輸入區。

<img src='/assets/images/docs/cookbook/architecture/todo_app_light.png'
class="site-mobile-screenshot" alt="ToDo application in light mode" >

應用程式主體包含 `TodoListScreen`。
此螢幕包含一個 `ListView`，其內有多個 `ListTile` 項目，
每個項目代表一個待辦事項（ToDo item）。
在底部，`TextField` 讓使用者可以輸入任務描述，
然後點擊 “Add” `FilledButton` 來建立新的待辦事項。

使用者可以點擊刪除 `IconButton` 來刪除待辦事項。

待辦事項清單會透過資料庫服務儲存在本地端，
並於使用者啟動應用程式時還原。

:::note
本範例的完整可執行原始碼可在 [`/examples/app-architecture/todo_data_service/`][`/examples/app-architecture/todo_data_service/`] 取得。
:::

## 使用 SQL 儲存複雜資料

此功能遵循建議的 [Flutter 架構設計][Flutter Architecture design]，
包含 UI 層與資料層。
另外，在領域層（domain layer）中會看到所使用的資料模型。

- UI 層包含 `TodoListScreen` 與 `TodoListViewModel`
- 領域層包含 `Todo` 資料類別
- 資料層包含 `TodoRepository` 與 `DatabaseService`

### 待辦清單呈現層（Presentation Layer）

`TodoListScreen` 是一個元件（Widget），負責顯示與建立待辦事項的 UI。
它遵循 [MVVM 模式][MVVM pattern]，
並搭配 `TodoListViewModel`，
該元件包含待辦事項清單，
以及三個用於載入、新增與刪除待辦事項的指令。

此螢幕分為兩個部分，
一部分是待辦事項清單，
以 `ListView` 實作，
另一部分則是 `TextField`
以及 `Button`，用於建立新的待辦事項。

`ListView` 會被 `ListenableBuilder` 包裹，
`ListenableBuilder` 會監聽 `TodoListViewModel` 的變化，
並為每個待辦事項顯示一個 `ListTile`。

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

ToDo 項目的清單定義在 `TodoListViewModel` 中，  
並由 `load` 指令載入。  
此方法會呼叫 `TodoRepository` 並取得 ToDo 項目的清單。

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
並傳入 text controller 的值。

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
並傳入任務描述文字，該方法會建立一個新的 ToDo 項目。

`createTodo()` 方法會回傳新建立的 ToDo，  
接著這個 ToDo 會被加入到 view model 中的 `_todo` 清單。

ToDo 項目包含由資料庫產生的唯一識別碼。  
這也是為什麼 view model 不會直接建立 ToDo 項目，  
而是交由 `TodoRepository` 來處理。

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

最後，`TodoListScreen` 也會監聽 `add` 指令的結果。
當該動作完成時，`TextEditingController` 會被清除。

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

當使用者在`ListTile`中點擊`IconButton`時，刪除指令就會被執行。

<?code-excerpt "lib/ui/todo_list/widgets/todo_list_screen.dart (Delete)" replace="/trailing: //g;/^\),$/)/g"?>
```dart
IconButton(
  icon: const Icon(Icons.delete),
  onPressed: () => widget.viewModel.delete.execute(todo.id),
)
```

接著，view model（檢視模型）會呼叫 `TodoRepository.deleteTodo()` 方法，
並傳入該 ToDo 項目的唯一識別碼。
若操作正確，將會從 view model *以及* 螢幕上移除該 ToDo 項目。

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

每個項目由一個不可變的資料類別（immutable data class）表示。
在本例中，應用程式使用 `freezed` 套件來產生程式碼。

這個類別有兩個屬性，一個是由 `int` 表示的 ID，以及一個由 `String` 表示的任務描述（task description）。

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

### Todo list 資料層

此功能的資料層由兩個類別組成，
分別是 `TodoRepository` 和 `DatabaseService`。

`TodoRepository` 作為所有 ToDo 項目的唯一真實來源（source of truth）。
View model 必須透過這個 repository 來存取 ToDo 清單，
且不應暴露任何關於其儲存方式的實作細節。

在內部，`TodoRepository` 會使用 `DatabaseService`，
`DatabaseService` 則透過 `sqflite` 套件來實作對 SQL 資料庫的存取。
你也可以使用其他儲存套件來實作相同的 `DatabaseService`，
例如 `sqlite3`、`drift`，甚至是像 `firebase_database` 這樣的雲端儲存解決方案。

`TodoRepository` 會在每次請求前檢查資料庫是否已開啟，
如有需要則會開啟資料庫。

它實作了 `fetchTodos()`、`createTodo()` 和 `deleteTodo()` 方法。

<?code-excerpt "lib/data/repositories/todo_repository.dart (TodoRepository)"?>
```dart
class TodoRepository {
  TodoRepository({required DatabaseService database}) : _database = database;

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

`DatabaseService` 使用 `sqflite` 套件來實作對 SQLite 資料庫的存取。

建議將資料表與欄位名稱定義為常數，這樣在撰寫 SQL 程式碼時可以避免拼寫錯誤。

<?code-excerpt "lib/data/services/database_service.dart (Table)"?>
```dart
static const String _todoTableName = 'todo';
static const String _idColumnName = '_id';
static const String _taskColumnName = 'task';
```

`open()` 方法會開啟現有的資料庫，  
如果資料庫不存在則會建立一個新的。

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
這表示每當插入新項目時，
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

所有的 `DatabaseService` 操作都使用 `Result` 類別來回傳值，這是根據 [Flutter architecture recommendations][Flutter architecture recommendations] 的建議。這樣可以方便在應用程式後續的程式碼中處理錯誤。

`getAll()` 方法會執行一次資料庫查詢，取得 `id` 和 `task` 欄位中的所有值。
對於每一筆資料，會建立一個 `Todo` 類別的實例。

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

在這種情況下，如果沒有任何項目被刪除，則會回傳錯誤，表示發生了某些問題。

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
在某些情況下，您可能會希望在不再使用資料庫時將其關閉。  
例如，當使用者離開螢幕，  
或是在經過一段時間後。

這取決於資料庫的實作方式  
以及您的應用程式需求。  
建議您參考資料庫套件作者的建議做法。
:::

## 整合應用

在您的應用程式的 `main()` 方法中，  
首先初始化 `DatabaseService`，  
不同平台需要不同的初始化程式碼。  
接著，將新建立的 `DatabaseService` 傳入 `TodoRepository`，  
而 `TodoRepository` 則作為建構子參數依賴，傳遞給 `MainApp`。

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
[MVVM pattern]:/get-started/fundamentals/state-management#using-mvvm-for-your-applications-architecture  
[Persist data with SQLite]:/cookbook/persistence/sqlite  
[Persistent storage architecture: Key-value data]:/app-architecture/design-patterns/key-value-data  
[`/examples/app-architecture/todo_data_service/`]: {{site.repo.this}}/tree/main/examples/app-architecture/todo_data_service/  
[`sqflite_common_ffi_web`]:{{site.pub}}/packages/sqflite_common_ffi_web  
[`sqflite_common_ffi`]:{{site.pub}}/packages/sqflite_common_ffi  
[`sqflite`]:{{site.pub}}/packages/sqflite
