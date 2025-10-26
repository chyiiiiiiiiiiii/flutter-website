---
title: 傳送資料到新螢幕
description: 如何將資料傳遞到新路由。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/navigation/passing_data"?>

通常，你不僅會想要導覽（navigate）到新的螢幕，還會希望同時將資料傳遞到該螢幕。例如，你可能會想要傳遞被點擊項目的相關資訊。

請記住：螢幕其實就是元件（Widgets）。在這個範例中，我們會建立一個待辦事項（todo）清單。當某個待辦事項被點擊時，導覽到一個新的螢幕（元件），並在該螢幕上顯示該待辦事項的資訊。本教學將採用以下步驟：

  1. 定義一個 todo 類別。
  2. 顯示 todo 清單。
  3. 建立一個可顯示 todo 資訊的詳細螢幕。
  4. 導覽並將資料傳遞到詳細螢幕。

## 1. 定義 todo 類別

首先，你需要一個簡單的方式來表示 todo。在這個範例中，建立一個類別，包含兩個資料欄位：標題（title）和描述（description）。

<?code-excerpt "lib/main.dart (Todo)"?>
```dart
class Todo {
  final String title;
  final String description;

  const Todo(this.title, this.description);
}
```

## 2. 建立待辦事項（todo）清單

第二步，顯示一個待辦事項（todo）清單。在這個範例中，會產生 20 筆待辦事項，並使用 ListView 來顯示它們。
如需更多關於清單操作的資訊，請參考 [使用清單][Use lists] 教學。

### 產生待辦事項（todo）清單

<?code-excerpt "lib/main.dart (Generate)" replace="/^todos:/final todos =/g/^\),$/);/g"?>
```dart
final todos = List.generate(
  20,
  (i) => Todo(
    'Todo $i',
    'A description of what needs to be done for Todo $i',
  ),
);
```

### 使用 ListView 顯示 todos 清單

<?code-excerpt "lib/main_todoscreen.dart (ListViewBuilder)" replace="/^body: //g;/^\),$/)/g"?>
```dart
ListView.builder(
  itemCount: todos.length,
  itemBuilder: (context, index) {
    return ListTile(title: Text(todos[index].title));
  },
)
```

到目前為止，一切都很順利。
這會產生 20 個待辦事項（todos），並將它們顯示在 ListView 中。

## 3. 建立一個 Todo 螢幕來顯示清單

為了實現這一點，我們會建立一個 `StatelessWidget`。我們將它命名為 `TodosScreen`。
由於這個頁面的內容在執行期間不會改變，
我們必須在這個元件（Widget）的範疇內要求傳入待辦事項（todos）清單。

我們將 `ListView.builder` 作為元件（Widget）主體傳遞給我們要回傳給 `build()` 的元件。
這樣就能將清單渲染到螢幕上，讓你可以開始操作！

<?code-excerpt "lib/main_todoscreen.dart (TodosScreen)"?>
```dart
class TodosScreen extends StatelessWidget {
  // Requiring the list of todos.
  const TodosScreen({super.key, required this.todos});

  final List<Todo> todos;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Todos')),
      //passing in the ListView.builder
      body: ListView.builder(
        itemCount: todos.length,
        itemBuilder: (context, index) {
          return ListTile(title: Text(todos[index].title));
        },
      ),
    );
  }
}
```

使用 Flutter 的預設樣式，你可以直接開始，不需要擔心日後想要進行的調整！

## 4. 建立詳細螢幕以顯示 todo 的資訊

現在，請建立第二個螢幕。該螢幕的標題會顯示 todo 的標題，螢幕的主體則會顯示描述內容。

由於詳細螢幕是一個普通的 `StatelessWidget`，請要求使用者在 UI 中輸入 `Todo`。
接著，使用給定的 todo 來建立 UI。

<?code-excerpt "lib/main.dart (detail)"?>
```dart
class DetailScreen extends StatelessWidget {
  // In the constructor, require a Todo.
  const DetailScreen({super.key, required this.todo});

  // Declare a field that holds the Todo.
  final Todo todo;

  @override
  Widget build(BuildContext context) {
    // Use the Todo to create the UI.
    return Scaffold(
      appBar: AppBar(title: Text(todo.title)),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(todo.description),
      ),
    );
  }
}
```

## 5. 導航並傳遞資料到詳細螢幕

當你已經有了`DetailScreen`之後，
你就可以進行導航（Navigation）。
在這個範例中，當使用者在清單中
點擊某個待辦事項（todo）時，導航到`DetailScreen`。
同時，將該 todo 傳遞給`DetailScreen`。

為了在`TodosScreen`中捕捉使用者的點擊事件，請為`ListTile`元件（Widget）
撰寫一個 [`onTap()`][`onTap()`] callback。
在`onTap()` callback 內，
使用 [`Navigator.push()`][`Navigator.push()`] 方法。

<?code-excerpt "lib/main.dart (builder)"?>
```dart
body: ListView.builder(
  itemCount: todos.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(todos[index].title),
      // When a user taps the ListTile, navigate to the DetailScreen.
      // Notice that you're not only creating a DetailScreen, you're
      // also passing the current todo through to it.
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute<void>(
            builder: (context) => DetailScreen(todo: todos[index]),
          ),
        );
      },
    );
  },
),
```

### 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter passing data hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class Todo {
  final String title;
  final String description;

  const Todo(this.title, this.description);
}

void main() {
  runApp(
    MaterialApp(
      title: 'Passing Data',
      home: TodosScreen(
        todos: List.generate(
          20,
          (i) => Todo(
            'Todo $i',
            'A description of what needs to be done for Todo $i',
          ),
        ),
      ),
    ),
  );
}

class TodosScreen extends StatelessWidget {
  const TodosScreen({super.key, required this.todos});

  final List<Todo> todos;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Todos')),
      body: ListView.builder(
        itemCount: todos.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(todos[index].title),
            // When a user taps the ListTile, navigate to the DetailScreen.
            // Notice that you're not only creating a DetailScreen, you're
            // also passing the current todo through to it.
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute<void>(
                  builder: (context) => DetailScreen(todo: todos[index]),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class DetailScreen extends StatelessWidget {
  // In the constructor, require a Todo.
  const DetailScreen({super.key, required this.todo});

  // Declare a field that holds the Todo.
  final Todo todo;

  @override
  Widget build(BuildContext context) {
    // Use the Todo to create the UI.
    return Scaffold(
      appBar: AppBar(title: Text(todo.title)),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(todo.description),
      ),
    );
  }
}
```

## 或者，使用 RouteSettings 傳遞參數

重複前兩個步驟。

### 建立一個細節螢幕以擷取參數

接下來，建立一個細節螢幕，從 `Todo` 擷取並顯示 title 和 description。若要存取 `Todo`，請使用 [`ModalRoute.of()`][`ModalRoute.of()`] 方法。此方法會回傳帶有參數的當前 Route。

<?code-excerpt "lib/main_routesettings.dart (DetailScreen)"?>
```dart
class DetailScreen extends StatelessWidget {
  const DetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final todo = ModalRoute.of(context)!.settings.arguments as Todo;

    // Use the Todo to create the UI.
    return Scaffold(
      appBar: AppBar(title: Text(todo.title)),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(todo.description),
      ),
    );
  }
}
```

### 導航並將參數傳遞到詳細螢幕

最後，當使用者點擊`ListTile`元件（Widget）時，使用`Navigator.push()`導向`DetailScreen`。
將參數作為[`RouteSettings`][`RouteSettings`]的一部分傳遞。
`DetailScreen`會擷取這些參數。

<?code-excerpt "lib/main_routesettings.dart (builder)" replace="/^body: //g;/^\),$/)/g"?>
```dart
ListView.builder(
  itemCount: todos.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(todos[index].title),
      // When a user taps the ListTile, navigate to the DetailScreen.
      // Notice that you're not only creating a DetailScreen, you're
      // also passing the current todo through to it.
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute<void>(
            builder: (context) => const DetailScreen(),
            // Pass the arguments as part of the RouteSettings. The
            // DetailScreen reads the arguments from these settings.
            settings: RouteSettings(arguments: todos[index]),
          ),
        );
      },
    );
  },
)
```

### 完整範例

<?code-excerpt "lib/main_routesettings.dart"?>
```dart
import 'package:flutter/material.dart';

class Todo {
  final String title;
  final String description;

  const Todo(this.title, this.description);
}

void main() {
  runApp(
    MaterialApp(
      title: 'Passing Data',
      home: TodosScreen(
        todos: List.generate(
          20,
          (i) => Todo(
            'Todo $i',
            'A description of what needs to be done for Todo $i',
          ),
        ),
      ),
    ),
  );
}

class TodosScreen extends StatelessWidget {
  const TodosScreen({super.key, required this.todos});

  final List<Todo> todos;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Todos')),
      body: ListView.builder(
        itemCount: todos.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(todos[index].title),
            // When a user taps the ListTile, navigate to the DetailScreen.
            // Notice that you're not only creating a DetailScreen, you're
            // also passing the current todo through to it.
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute<void>(
                  builder: (context) => const DetailScreen(),
                  // Pass the arguments as part of the RouteSettings. The
                  // DetailScreen reads the arguments from these settings.
                  settings: RouteSettings(arguments: todos[index]),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class DetailScreen extends StatelessWidget {
  const DetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final todo = ModalRoute.of(context)!.settings.arguments as Todo;

    // Use the Todo to create the UI.
    return Scaffold(
      appBar: AppBar(title: Text(todo.title)),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(todo.description),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/passing-data.webp" alt="傳遞資料示範" class="site-mobile-screenshot" />
</noscript>


[`ModalRoute.of()`]: {{site.api}}/flutter/widgets/ModalRoute/of.html
[`Navigator.push()`]: {{site.api}}/flutter/widgets/Navigator/push.html
[`onTap()`]: {{site.api}}/flutter/material/ListTile/onTap.html
[`RouteSettings`]: {{site.api}}/flutter/widgets/RouteSettings-class.html
[Use lists]: /cookbook/lists/basic-list
