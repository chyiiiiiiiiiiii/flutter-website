# 由 ScaffoldMessenger 管理的 SnackBars

> SnackBars 現在由 ScaffoldMessenger 管理，並可在路由間持續顯示。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`Scaffold` 中的 `SnackBar` API 現在由 `ScaffoldMessenger` 負責管理，而在 `MaterialApp` 的 context 中，預設就會有一個可用的 `ScaffoldMessenger`。

## 背景

在此變更之前，顯示 `SnackBar` 時會呼叫目前 `BuildContext` 內的 `Scaffold`。
當呼叫 `Scaffold.of(context).showSnackBar` 時，目前的 `Scaffold` 會將 `SnackBar` 以動畫方式顯示出來。
這僅會作用於目前的 `Scaffold`，如果在 `SnackBar` 顯示過程中路由發生變化，則不會在新路由中持續顯示。
此外，若在執行非同步事件時呼叫 `showSnackBar`，而因路由變更導致 `BuildContext` 失效且 `Scaffold` 被釋放，則會發生錯誤。

現在，`ScaffoldMessenger` 會管理 `SnackBar`，以便讓其可在路由間持續顯示，並始終顯示於目前的 `Scaffold` 上。
預設情況下，`MaterialApp` 會包含一個 root `ScaffoldMessenger`，但你也可以自行建立受控範圍的 `ScaffoldMessenger`，以進一步控制 _哪些_ `Scaffold` 能接收到你的 `SnackBar`。

## 變更說明

先前的做法是呼叫 `Scaffold` 來顯示 `SnackBar`。

```dart
Scaffold(
  key: scaffoldKey,
  body: Builder(
    builder: (BuildContext context) {
      return GestureDetector(
        onTap: () {
          Scaffold.of(context).showSnackBar(SnackBar(
            content: const Text('snack'),
            duration: const Duration(seconds: 1),
            action: SnackBarAction(
              label: 'ACTION',
              onPressed: () { },
            ),
          ));
        },
        child: const Text('SHOW SNACK'),
      );
    },
  )
);
```

新的做法是呼叫 `ScaffoldMessenger` 來顯示 `SnackBar`。在這種情況下，`Builder` 不再需要提供一個帶有 `BuildContext`、且位於 `Scaffold`「之下」的新範疇 (scope)。

```dart
Scaffold(
  key: scaffoldKey,
  body: GestureDetector(
    onTap: () {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: const Text('snack'),
        duration: const Duration(seconds: 1),
        action: SnackBarAction(
          label: 'ACTION',
          onPressed: () { },
        ),
      ));
    },
    child: const Text('SHOW SNACK'),
  ),
);
```

當在轉場期間顯示 `SnackBar` 時，`SnackBar` 會完成 `Hero` 動畫，平滑地移動到下一個頁面。

`ScaffoldMessenger` 會建立一個範疇 (scope)，在這個範疇內，所有子孫 `Scaffold` 都會註冊以接收 `SnackBar`，這就是它們能夠在這些轉場期間持續存在的方式。
當使用由 `MaterialApp` 所提供的 root `ScaffoldMessenger` 時，所有子孫 `Scaffold` 都會接收 `SnackBar`，除非在樹狀結構中更下層建立了新的 `ScaffoldMessenger` 範疇。
透過自行實例化 `ScaffoldMessenger`，你可以根據應用程式的情境，控制哪些 `Scaffold` 能接收 `SnackBar`，哪些不能。

方法 `debugCheckHasScaffoldMessenger` 可用來斷言指定的 context 是否有 `ScaffoldMessenger` 祖先。
如果嘗試在沒有 `ScaffoldMessenger` 祖先的情況下顯示 `SnackBar`，將會出現如下的斷言錯誤：

```plaintext
No ScaffoldMessenger widget found.
Scaffold widgets require a ScaffoldMessenger widget ancestor.
Typically, the ScaffoldMessenger widget is introduced by the MaterialApp
at the top of your application widget tree.
```

## 遷移指南

遷移前的程式碼：

```dart
// The ScaffoldState of the current context was used for managing SnackBars.
Scaffold.of(context).showSnackBar(mySnackBar);
Scaffold.of(context).hideCurrentSnackBar(mySnackBar);
Scaffold.of(context).removeCurrentSnackBar(mySnackBar);

// If a Scaffold.key is specified, the ScaffoldState can be directly
// accessed without first obtaining it from a BuildContext via
// Scaffold.of. From the key, use the GlobalKey.currentState
// getter. This was previously used to manage SnackBars.
final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
Scaffold(
  key: scaffoldKey,
  body: ...,
);

scaffoldKey.currentState.showSnackBar(mySnackBar);
scaffoldKey.currentState.hideCurrentSnackBar(mySnackBar);
scaffoldKey.currentState.removeCurrentSnackBar(mySnackBar);

```

遷移後的程式碼：

```dart
// The ScaffoldMessengerState of the current context is used for managing SnackBars.
ScaffoldMessenger.of(context).showSnackBar(mySnackBar);
ScaffoldMessenger.of(context).hideCurrentSnackBar(mySnackBar);
ScaffoldMessenger.of(context).removeCurrentSnackBar(mySnackBar);

// If a ScaffoldMessenger.key is specified, the ScaffoldMessengerState can be directly
// accessed without first obtaining it from a BuildContext via
// ScaffoldMessenger.of. From the key, use the GlobalKey.currentState
// getter. This is used to manage SnackBars.
final GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();
ScaffoldMessenger(
  key: scaffoldMessengerKey,
  child: ...
)

scaffoldMessengerKey.currentState.showSnackBar(mySnackBar);
scaffoldMessengerKey.currentState.hideCurrentSnackBar(mySnackBar);
scaffoldMessengerKey.currentState.removeCurrentSnackBar(mySnackBar);

// The root ScaffoldMessenger can also be accessed by providing a key to
// MaterialApp.scaffoldMessengerKey. This way, the ScaffoldMessengerState can be directly accessed
// without first obtaining it from a BuildContext via ScaffoldMessenger.of. From the key, use
// the GlobalKey.currentState getter.
final GlobalKey<ScaffoldMessengerState> rootScaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();
MaterialApp(
  scaffoldMessengerKey: rootScaffoldMessengerKey,
  home: ...
)

rootScaffoldMessengerKey.currentState.showSnackBar(mySnackBar);
rootScaffoldMessengerKey.currentState.hideCurrentSnackBar(mySnackBar);
rootScaffoldMessengerKey.currentState.removeCurrentSnackBar(mySnackBar);
```

## 時程

加入版本：1.23.0-13.0.pre<br>
穩定版發佈：2.0.0

## 參考資料

API 文件：

* [`Scaffold`][]
* [`ScaffoldMessenger`][]
* [`SnackBar`][]
* [`MaterialApp`][]

相關議題：

* [Issue #57218][]
* [Issue #62921][]

相關 PR：

* [ScaffoldMessenger][]
* [ScaffoldMessenger Migration][]

[`Scaffold`]: https://api.flutter.dev/flutter/material/Scaffold-class.html
[`ScaffoldMessenger`]: https://api.flutter.dev/flutter/material/ScaffoldMessenger-class.html
[`SnackBar`]: https://api.flutter.dev/flutter/material/SnackBar-class.html
[`MaterialApp`]: https://api.flutter.dev/flutter/material/MaterialApp-class.html
[Issue #57218]: https://github.com/flutter/flutter/issues/57218
[Issue #62921]: https://github.com/flutter/flutter/issues/62921
[ScaffoldMessenger]: https://github.com/flutter/flutter/pull/64101
[ScaffoldMessenger Migration]: https://github.com/flutter/flutter/pull/64170

