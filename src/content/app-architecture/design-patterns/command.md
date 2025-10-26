---
title: 指令模式
description: "透過實作 Command 類別，簡化 view model 邏輯。"
contentTags:
  - mvvm
  - asynchronous dart
  - state
iconPath: /assets/images/docs/app-architecture/design-patterns/command-icon.svg
order: 4
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="app-architecture/command"?>

[Model-View-ViewModel (MVVM)][Model-View-ViewModel (MVVM)] 是一種設計模式，
將應用程式的一個功能分為三個部分：
model（模型）、view model（檢視模型）以及 view（檢視）。
View 和 view model 組成應用程式的 UI 層。
Repository（儲存庫）和 service（服務）則代表應用程式的資料層，
也就是 MVVM 的 model 層。

Command（指令）是一個包裝方法的類別，
用來協助處理該方法的不同狀態，
例如執行中、完成與錯誤。

[View model][View models] 可以使用 command 來處理互動與執行動作。
你也可以利用它們來顯示不同的 UI 狀態，
像是在動作執行時顯示載入指示器，
或是在動作失敗時顯示錯誤對話框。

隨著應用程式規模成長、功能變得更複雜，
view model 也可能變得非常複雜。
Command 可以協助簡化 view model，
並重複利用程式碼。

在本指南中，你將學習
如何運用指令模式（command pattern）
來優化你的 view model。

## 實作 view model 時的挑戰

在 Flutter 中，view model 類別通常是
透過繼承 [`ChangeNotifier`][`ChangeNotifier`] 類別來實作。
這讓 view model 可以呼叫 `notifyListeners()` 來刷新 view，
當資料被更新時。

<?code-excerpt "lib/no_command.dart (HomeViewModel2)" replace="/2//g"?>
```dart
class HomeViewModel extends ChangeNotifier {
  // ···
}
```

View model（檢視模型）包含 UI 狀態的表示方式，包括正在顯示的資料。
例如，這個 `HomeViewModel` 將 `User` 實例暴露給 view（檢視）。

<?code-excerpt "lib/no_command.dart (getUser)" replace="/null;/\/\/ .../g;/2//g"?>
```dart
class HomeViewModel extends ChangeNotifier {

  User? get user => // ...
  // ···
}
```

View model 也包含通常由 view 觸發的動作，例如負責載入 `user` 的 `load` 動作。

<?code-excerpt "lib/no_command.dart (load1)" replace="/null;/\/\/ .../g;/2//g"?>
```dart
class HomeViewModel extends ChangeNotifier {

  User? get user => // ...
  // ···
  void load() {
    // load user
  }
  // ···
}
```

### 檢視模型（view model）中的 UI 狀態

檢視模型（view model）除了包含資料之外，還會包含 UI 狀態，例如畫面目前是否正在執行，或是否發生錯誤。這讓應用程式能夠告知使用者某個操作是否已成功完成。

<?code-excerpt "lib/no_command.dart (UiState1)" replace="/(null|false);/\/\/ .../g;/2//g"?>
```dart
class HomeViewModel extends ChangeNotifier {

  User? get user => // ...

  bool get running => // ...

  Exception? get error => // ...

  void load() {
    // load user
  }
  // ···
}
```

你可以利用 running 狀態，在畫面中顯示進度指示器：

<?code-excerpt "lib/no_command.dart (ListenableBuilder)" replace="/\.load//g;/body: //g;/^\),$/)/g"?>
```dart
ListenableBuilder(
  listenable: widget.viewModel,
  builder: (context, _) {
    if (widget.viewModel.running) {
      return const Center(child: CircularProgressIndicator());
    }
    // ···
  },
)
```

或者使用 running 狀態來避免多次執行該動作：

<?code-excerpt "lib/no_command.dart (load2)" replace="/2//g"?>
```dart
void load() {
  if (running) {
    return;
  }
  // load user
}
```

當一個 view model 包含多個動作（action）時，管理動作的狀態會變得相當複雜。  
例如，將 `edit()` 動作加入 `HomeViewModel` 中，可能會導致以下結果：

<?code-excerpt "lib/no_command.dart (HomeViewModel3)" replace="/(null|false);/\/\/ .../g;/3//g"?>
```dart
class HomeViewModel extends ChangeNotifier {
  User? get user => // ...

  bool get runningLoad => // ...

  Exception? get errorLoad => // ...

  bool get runningEdit => // ...

  Exception? get errorEdit => // ...

  void load() {
    // load user
  }

  void edit(String name) {
    // edit user
  }
}
```

在 `load()` 和 `edit()` 動作之間共享執行中狀態（running state）並不一定總是可行，
因為你可能希望在執行 `load()` 動作時顯示不同的 UI 元件，
而不是在執行 `edit()` 動作時顯示的元件；
對於 `error` 狀態，你也會遇到相同的問題。

### 從 view model 觸發 UI 動作

當 view model 類別在執行 UI 動作且 view model 狀態變更時，
可能會遇到一些問題。

舉例來說，你可能希望在發生錯誤時顯示 `SnackBar`，
或是在某個動作完成時導向到不同的螢幕。
要實作這樣的功能，可以監聽 view model 的狀態變化，
並根據狀態執行相應的動作。

在 view 中：

<?code-excerpt "lib/no_command.dart (addListener)"?>
```dart
@override
void initState() {
  super.initState();
  widget.viewModel.addListener(_onViewModelChanged);
}

@override
void dispose() {
  widget.viewModel.removeListener(_onViewModelChanged);
  super.dispose();
}
```

<?code-excerpt "lib/no_command.dart (_onViewModelChanged)" remove="widget.viewModel.clearError();"?>
```dart
void _onViewModelChanged() {
  if (widget.viewModel.error != null) {
    // Show Snackbar
  }
}
```

你需要在每次執行此動作時清除錯誤狀態，否則每當`notifyListeners()`被呼叫時，這個動作都會發生。

<?code-excerpt "lib/no_command.dart (_onViewModelChanged)"?>
```dart
void _onViewModelChanged() {
  if (widget.viewModel.error != null) {
    widget.viewModel.clearError();
    // Show Snackbar
  }
}
```

## Command 模式（Command pattern）

你可能會發現自己一再重複上面的程式碼，為每個 view model 的每個動作實作不同的執行狀態。在這種情況下，將這段程式碼抽取出來，變成一個可重複使用的模式，也就是所謂的 _command_（命令）會比較合理。

Command（命令）是一個封裝 view model 動作的類別，並且對外公開一個動作可能擁有的不同狀態。

<?code-excerpt "lib/simple_command.dart (Command)" replace="/(null|false);/\/\/ .../g;"?>
```dart
class Command extends ChangeNotifier {
  Command(this._action);

  bool get running => // ...

  Exception? get error => // ...

  bool get completed => // ...

  void Function() _action;

  void execute() {
    // run _action
  }

  void clear() {
    // clear state
  }
}
```

在 view model（檢視模型）中，
你不是直接用方法來定義一個 action（動作），
而是建立一個 command（命令）物件：

<?code-excerpt "lib/simple_command.dart (ViewModel)" replace="/(null|false);/\/\/ .../g;"?>
```dart
class HomeViewModel extends ChangeNotifier {
  HomeViewModel() {
    load = Command(_load)..execute();
  }

  User? get user => // ...

  late final Command load;

  void _load() {
    // load user
  }
}
```

先前的 `load()` 方法變成了 `_load()`，
現在則是將指令 `load` 暴露給 `View`。
原本的 `running` 和 `error` 狀態可以移除，
因為它們現在已經成為指令的一部分。

### 執行指令

現在不再呼叫 `viewModel.load()` 來執行載入動作，
而是改為呼叫 `viewModel.load.execute()`。

`execute()` 方法也可以在 view model 內部被呼叫。
下列程式碼會在 view model 建立時執行 `load` 指令。

<?code-excerpt "lib/main.dart (ViewModelInit)"?>
```dart
HomeViewModel() {
  load = Command(_load)..execute();
}
```

`execute()` 方法會將執行狀態設為 `true`，
並重設 `error` 和 `completed` 狀態。
當動作結束時，
`running` 狀態會變為 `false`，
而 `completed` 狀態則會變為 `true`。

如果 `running` 狀態為 `true`，
則無法再次開始執行該命令。
這可以防止使用者快速連續按下按鈕時，
多次觸發同一個命令。

命令的 `execute()` 方法會自動捕捉任何拋出的 `Exceptions`，
並將其公開於 `error` 狀態中。

以下程式碼展示了一個簡化版的 `Command` 類別，
僅供示範用途。
你可以在本頁底部看到完整的實作。

<?code-excerpt "lib/main.dart (Command)"?>
```dart
class Command extends ChangeNotifier {
  Command(this._action);

  bool _running = false;
  bool get running => _running;

  Exception? _error;
  Exception? get error => _error;

  bool _completed = false;
  bool get completed => _completed;

  final Future<void> Function() _action;

  Future<void> execute() async {
    if (_running) {
      return;
    }

    _running = true;
    _completed = false;
    _error = null;
    notifyListeners();

    try {
      await _action();
      _completed = true;
    } on Exception catch (error) {
      _error = error;
    } finally {
      _running = false;
      notifyListeners();
    }
  }

  void clear() {
    _running = false;
    _error = null;
    _completed = false;
  }
}
```

### 監聽指令狀態

`Command` 類別繼承自 `ChangeNotifier`，
讓 Views 能夠監聽其狀態。

在 `ListenableBuilder` 中，
不需要將 view model 傳遞給 `ListenableBuilder.listenable`，
而是直接傳遞指令（command）：


<?code-excerpt "lib/main.dart (CommandListenable)" replace="/body: //g;/^\),$/)/g"?>
```dart
ListenableBuilder(
  listenable: widget.viewModel.load,
  builder: (context, child) {
    if (widget.viewModel.load.running) {
      return const Center(child: CircularProgressIndicator());
    }
  // ···
)
```

並且監聽指令（command）狀態的變化，以便執行 UI 動作：

<?code-excerpt "lib/main.dart (addListener)"?>
```dart
@override
void initState() {
  super.initState();
  widget.viewModel.addListener(_onViewModelChanged);
}

@override
void dispose() {
  widget.viewModel.removeListener(_onViewModelChanged);
  super.dispose();
}
```

<?code-excerpt "lib/main.dart (_onViewModelChanged)"?>
```dart
void _onViewModelChanged() {
  if (widget.viewModel.load.error != null) {
    widget.viewModel.load.clear();
    // Show Snackbar
  }
}
```

### 結合 command 與 ViewModel

你可以堆疊多個 `ListenableBuilder` 元件（Widgets），以便在顯示 view model 資料之前，監聽 `running` 和 `error` 狀態。

<?code-excerpt "lib/main.dart (ListenableBuilder)"?>
```dart
body: ListenableBuilder(
  listenable: widget.viewModel.load,
  builder: (context, child) {
    if (widget.viewModel.load.running) {
      return const Center(child: CircularProgressIndicator());
    }

    if (widget.viewModel.load.error != null) {
      return Center(
        child: Text('Error: ${widget.viewModel.load.error}'),
      );
    }

    return child!;
  },
  child: ListenableBuilder(
    listenable: widget.viewModel,
    builder: (context, _) {
      // ···
    },
  ),
),
```

你可以在單一的 view model 中定義多個 command 類別，  
這樣可以簡化其實作，並減少重複程式碼的數量。

<?code-excerpt "lib/main.dart (HomeViewModel2)" replace="/null;/\/\/ .../g"?>
```dart
class HomeViewModel2 extends ChangeNotifier {
  HomeViewModel2() {
    load = Command(_load)..execute();
    delete = Command(_delete);
  }

  User? get user => // ...

  late final Command load;

  late final Command delete;

  Future<void> _load() async {
    // load user
  }

  Future<void> _delete() async {
    // delete user
  }
}
```

### 擴充命令模式（command pattern）

命令模式（command pattern）可以透過多種方式進行擴充。
例如，可以用來支援不同數量的參數。

<?code-excerpt "lib/extended_command.dart (HomeViewModel)" replace="/null;/\/\/ .../g"?>
```dart
class HomeViewModel extends ChangeNotifier {
  HomeViewModel() {
    load = Command0(_load)..execute();
    edit = Command1<String>(_edit);
  }

  User? get user => // ...

  // Command0 accepts 0 arguments
  late final Command0 load;

  // Command1 accepts 1 argument
  late final Command1<String> edit;

  Future<void> _load() async {
    // load user
  }

  Future<void> _edit(String name) async {
    // edit user
  }
}
```

## 整合應用

在本指南中，
你學會了如何使用 Command 設計模式（command design pattern），
來提升在採用 MVVM 設計模式時，
ViewModel 的實作品質。

下方提供了完整的 `Command` 類別，
這是根據 [Compass App 範例][Compass App example]
於 Flutter 架構指引中實作的版本。
它同時也會利用 [`Result` 類別][`Result` class]
來判斷動作是成功完成還是發生錯誤。

這個實作同時包含了兩種類型的 Command：
`Command0`，用於無參數的動作，
以及 `Command1`，用於需要一個參數的動作。

:::note
你也可以在 [pub.dev][pub.dev] 上找到其他
現成可用的 Command 設計模式實作，
例如 [`command_it`][`command_it`] 套件。
:::

<?code-excerpt "lib/command.dart"?>
```dart
// Copyright 2024 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'dart:async';

import 'package:flutter/foundation.dart';

import 'result.dart';

/// Defines a command action that returns a [Result] of type [T].
/// Used by [Command0] for actions without arguments.
typedef CommandAction0<T> = Future<Result<T>> Function();

/// Defines a command action that returns a [Result] of type [T].
/// Takes an argument of type [A].
/// Used by [Command1] for actions with one argument.
typedef CommandAction1<T, A> = Future<Result<T>> Function(A);

/// Facilitates interaction with a view model.
///
/// Encapsulates an action,
/// exposes its running and error states,
/// and ensures that it can't be launched again until it finishes.
///
/// Use [Command0] for actions without arguments.
/// Use [Command1] for actions with one argument.
///
/// Actions must return a [Result] of type [T].
///
/// Consume the action result by listening to changes,
/// then call to [clearResult] when the state is consumed.
abstract class Command<T> extends ChangeNotifier {
  bool _running = false;

  /// Whether the action is running.
  bool get running => _running;

  Result<T>? _result;

  /// Whether the action completed with an error.
  bool get error => _result is Error;

  /// Whether the action completed successfully.
  bool get completed => _result is Ok;

  /// The result of the most recent action.
  ///
  /// Returns `null` if the action is running or completed with an error.
  Result<T>? get result => _result;

  /// Clears the most recent action's result.
  void clearResult() {
    _result = null;
    notifyListeners();
  }

  /// Execute the provided [action], notifying listeners and
  /// setting the running and result states as necessary.
  Future<void> _execute(CommandAction0<T> action) async {
    // Ensure the action can't launch multiple times.
    // e.g. avoid multiple taps on button
    if (_running) return;

    // Notify listeners.
    // e.g. button shows loading state
    _running = true;
    _result = null;
    notifyListeners();

    try {
      _result = await action();
    } finally {
      _running = false;
      notifyListeners();
    }
  }
}

/// A [Command] that accepts no arguments.
final class Command0<T> extends Command<T> {
  /// Creates a [Command0] with the provided [CommandAction0].
  Command0(this._action);

  final CommandAction0<T> _action;

  /// Executes the action.
  Future<void> execute() async {
    await _execute(_action);
  }
}

/// A [Command] that accepts one argument.
final class Command1<T, A> extends Command<T> {
  /// Creates a [Command1] with the provided [CommandAction1].
  Command1(this._action);

  final CommandAction1<T, A> _action;

  /// Executes the action with the specified [argument].
  Future<void> execute(A argument) async {
    await _execute(() => _action(argument));
  }
}
```

[Compass App example]: {{site.repo.samples}}/tree/main/compass_app  
[`Result` class]: /app-architecture/design-patterns/result  
[pub.dev]: {{site.pub}}  
[`command_it`]: {{site.pub-pkg}}/command_it  
[`ChangeNotifier`]: /get-started/fundamentals/state-management  
[Model-View-ViewModel (MVVM)]: /app-architecture/guide#view-models  
[View models]: /app-architecture/guide#view-models
