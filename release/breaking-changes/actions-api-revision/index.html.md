# Actions API 修訂

> 移除呼叫時需傳入 FocusNode，並將 Intent 類型對應至 Actions。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

在 Flutter 中，[`Intent`][] 是一個物件，通常會透過 [`Shortcuts`][] 元件 (Widget) 綁定至某個鍵盤組合鍵。
`Intent` 可以綁定至 [`Action`][]，
用於更新應用程式狀態或執行其他操作。
在使用此 API 的過程中，我們發現設計上有幾個缺點，因此我們對 Actions API 進行了更新，使其更易於使用與理解。

在先前的 Actions API 設計中，actions 是從 [`LocalKey`][] 對應到 `ActionFactory`，每次呼叫 `invoke` 方法時都會建立一個新的 `Action`。
在目前的 API 中，actions 是從 `Intent` 的類型對應到 `Action` 實例（帶有 `Map<Type, Action>`），
且每次呼叫時不會重新建立實例。

## 背景說明

原本的 Actions API 設計是為了讓 actions 能從元件 (Widget) 中被呼叫，並在該元件的上下文中執行。
團隊在實際使用 actions 時，發現該設計有幾項限制需要改進：

1. 無法從元件 (Widget) 階層外部呼叫 actions。
   例如：處理指令腳本、某些 undo 架構，以及部分 controller 架構。

1. 從快捷鍵到 `Intent` 再到 `Action` 的對應關係並不總是很清楚，因為資料結構是將 LogicalKeySet => Intent，再由
   `LocalKey` => `ActionFactory`。新的對應方式仍然是 `LogicalKeySet` 對應 `Intent`，但接著會將 `Type`
   （`Intent` 類型）對應到 `Action`，
   這樣的設計更直接且易讀，因為 intent 的類型會直接寫在對應表中。

1. 如果某個 action 的鍵盤綁定在元件階層的其他地方，`Intent` 不一定能取得決定 intent/action 是否啟用所需的狀態。

為了解決這些問題，我們對 API 進行了重大調整。
actions 的對應方式變得更直觀，
而啟用（enabled）介面則移至 `Action` 類別。
另外，`Action` 的 `invoke` 方法與建構函式中也移除了不必要的參數，並允許 actions 的 invoke 方法回傳結果。
actions 現在改為泛型（generics），可指定所處理的 `Intent` 類型，且不再使用 `LocalKeys` 來識別要執行哪個 action，而是改用 `Intent` 的類型。

這些主要變更大多來自 [Revise Action API][] 及 [Make Action.enabled be
isEnabled(Intent intent) instead][] 這兩個 PR，詳細內容可參考[設計文件](/go/actions-and-shortcuts-design-revision)。

## 變更說明

以下是針對上述問題所做的調整：

1. 提供給 [`Actions`][] 元件 (Widget) 的 `Map<LocalKey, ActionFactory>`，現在是一個 `Map<Type, Action<Intent>>`（其類型為要傳遞給 Action 的 Intent 類型）。
1. `isEnabled` 方法已從 `Intent` 類別移至 `Action` 類別。
1. `Action.invoke` 與 `Actions.invoke` 方法中的 `FocusNode` 參數已被移除。
1. 呼叫 action 時不再會建立新的 `Action` 實例。
1. `Intent` 建構函式中的 `LocalKey` 參數已被移除。
1. `CallbackAction` 的 `LocalKey` 參數已被移除。
1. `Action` 類別現在為泛型（`Action<T extends Intent>`），以提升型別安全性。
1. `CallbackAction` 所使用的 `OnInvokeCallback` 不再需要 `FocusNode` 參數。
1. `ActionDispatcher.invokeAction` 的簽章已變更，不再接受可選的 `FocusNode`，而是改為可選的 `BuildContext`。
1. `Action` 子類別中的 `LocalKey` 靜態常數（依慣例命名為 key）已被移除。
1. `Action.invoke` 與 `ActionDispatcher.invokeAction` 方法現在會以 `Object` 形式回傳 action 執行的結果。
1. `Action` 類別現在可以監聽狀態變化。
1. `ActionFactory` typedef 已被移除，因為已不再使用。

## 範例分析器錯誤

以下是一些可能因為 Actions API 使用過時而導致的分析器（analyzer）錯誤範例。實際錯誤內容可能有所不同，且這些變更也可能導致其他錯誤。

```plaintext
error: MyActionDispatcher.invokeAction' ('bool Function(Action<Intent>, Intent, {FocusNode focusNode})') isn't a valid override of 'ActionDispatcher.invokeAction' ('Object Function(Action<Intent>, Intent, [BuildContext])'). (invalid_override at [main] lib/main.dart:74)

error: MyAction.invoke' ('void Function(FocusNode, Intent)') isn't a valid override of 'Action.invoke' ('Object Function(Intent)'). (invalid_override at [main] lib/main.dart:231)

error: The method 'isEnabled' isn't defined for the type 'Intent'. (undefined_method at [main] lib/main.dart:97)

error: The argument type 'Null Function(FocusNode, Intent)' can't be assigned to the parameter type 'Object Function(Intent)'. (argument_type_not_assignable at [main] lib/main.dart:176)

error: The getter 'key' isn't defined for the type 'NextFocusAction'. (undefined_getter at [main] lib/main.dart:294)

error: The argument type 'Map<LocalKey, dynamic>' can't be assigned to the parameter type 'Map<Type, Action<Intent>>'. (argument_type_not_assignable at [main] lib/main.dart:418)
```

## 遷移指南

要將現有程式碼更新至新版 API，需進行重大變更。

### 預設動作的 Actions 對應

若要在 `Actions` 元件 (Widget) 中，針對 Flutter 的預設動作（例如 `ActivateAction` 和 `SelectAction`）更新 action 對應，請依下列步驟操作：

* 更新 `actions` 參數的參數型別
* 在 `Shortcuts` 對應中，使用特定 `Intent` 類別的實例，而非 `Intent(TheAction.key)` 實例。

遷移前的程式碼：

```dart
class MyWidget extends StatelessWidget {
  // ...
  @override
  Widget build(BuildContext context) {
    return Shortcuts(
      shortcuts: <LogicalKeySet, Intent> {
        LogicalKeySet(LogicalKeyboardKey.enter): Intent(ActivateAction.key),
      },
      child: Actions(
        actions: <LocalKey, ActionFactory>{
          Activate.key: () => ActivateAction(),
        },
        child: Container(),
      )
    );
  }
}
```

遷移後的程式碼：

```dart
class MyWidget extends StatelessWidget {
  // ...
  @override
  Widget build(BuildContext context) {
    return Shortcuts(
      shortcuts: <LogicalKeySet, Intent> {
        LogicalKeySet(LogicalKeyboardKey.enter): ActivateIntent,
      },
      child: Actions(
        actions: <Type, Action<Intent>>{
          ActivateIntent: ActivateAction(),
        },
        child: Container(),
      )
    );
  }
}
```

### 自訂 actions

若要遷移您的自訂 actions，請移除您所定義的 `LocalKeys`，並以 `Intent` 子類別取代，同時也要將 `Actions` 元件的 `actions` 參數型別進行相應更改。

遷移前的程式碼：

```dart
class MyAction extends Action {
  MyAction() : super(key);

  /// The [LocalKey] that uniquely identifies this action to an [Intent].
  static const LocalKey key = ValueKey<Type>(RequestFocusAction);

  @override
  void invoke(FocusNode node, MyIntent intent) {
    // ...
  }
}

class MyWidget extends StatelessWidget {
  // ...
  @override
  Widget build(BuildContext context) {
    return Shortcuts(
      shortcuts: <LogicalKeySet, Intent> {
        LogicalKeySet(LogicalKeyboardKey.enter): Intent(MyAction.key),
      },
      child: Actions(
        actions: <LocalKey, ActionFactory>{
          MyAction.key: () => MyAction(),
        },
        child: Container(),
      )
    );
  }
}
```

遷移後的程式碼：

```dart
// You may need to create new Intent subclasses if you used
// a bare LocalKey before.
class MyIntent extends Intent {
  const MyIntent();
}

class MyAction extends Action<MyIntent> {
  @override
  Object invoke(MyIntent intent) {
    // ...
  }
}

class MyWidget extends StatelessWidget {
  // ...
  @override
  Widget build(BuildContext context) {
    return Shortcuts(
      shortcuts: <LogicalKeySet, Intent> {
        LogicalKeySet(LogicalKeyboardKey.enter): MyIntent,
      },
      child: Actions(
        actions: <Type, Action<Intent>>{
          MyIntent: MyAction(),
        },
        child: Container(),
      )
    );
  }
}
```

### 帶有參數的自訂 `Actions` 和 `Intents`

若要更新使用 intent 參數或保存狀態的 action，
你需要修改傳遞給 `invoke` 方法的參數。
在下方的範例中，程式碼會將參數的值保存在 intent 中，作為 action 實例的一部分。
這是因為在舊的設計中，每次執行時都會建立新的 action 實例，
而產生的 action 可能會被 [`ActionDispatcher`][] 保留，以記錄狀態。

在下方遷移後的程式碼範例中，
新的 `MyAction` 會在呼叫 `invoke` 時，將狀態作為結果回傳，
因為現在每次呼叫不會再建立新的實例。
這個狀態會回傳給 `Actions.invoke` 或 `ActionDispatcher.invokeAction` 的呼叫者，
具體取決於 action 的呼叫方式。

遷移前的程式碼：

```dart
class MyIntent extends Intent {
  const MyIntent({this.argument});

  final int argument;
}

class MyAction extends Action {
  MyAction() : super(key);

  /// The [LocalKey] that uniquely identifies this action to an [Intent].
  static const LocalKey key = ValueKey<Type>(RequestFocusAction);

  int state;

  @override
  void invoke(FocusNode node, MyIntent intent) {
    // ...
    state = intent.argument;
  }
}
```

遷移後的程式碼：

```dart
class MyIntent extends Intent {
  const MyIntent({this.argument});

  final int argument;
}

class MyAction extends Action<MyIntent> {
  @override
  int invoke(Intent intent) {
    // ...
    return intent.argument;
  }
}
```

## 時程

合併於版本：1.18<br>
正式版釋出：1.20

## 參考資料

API 文件：

* [`Action`][]
* [`ActionDispatcher`][]
* [`Actions`][]
* [`Intent`][]
* [`Shortcuts`][]

相關議題：

* [Issue 53276][]

相關 PR：

* [Revise Action API][]
* [Make Action.enabled be isEnabled(Intent intent) instead][]

[`Action`]: https://api.flutter.dev/flutter/widgets/Action-class.html
[`ActionDispatcher`]: https://api.flutter.dev/flutter/widgets/ActionDispatcher-class.html
[`Actions`]: https://api.flutter.dev/flutter/widgets/Actions-class.html
[`Intent`]: https://api.flutter.dev/flutter/widgets/Intent-class.html
[Issue 53276]: https://github.com/flutter/flutter/issues/53276
[`LocalKey`]: https://api.flutter.dev/flutter/foundation/LocalKey-class.html
[Make Action.enabled be isEnabled(Intent intent) instead]: https://github.com/flutter/flutter/pull/55230
[Revise Action API]: https://github.com/flutter/flutter/pull/42940
[`Shortcuts`]: https://api.flutter.dev/flutter/widgets/Shortcuts-class.html

