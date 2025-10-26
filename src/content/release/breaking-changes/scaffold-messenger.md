---
title: 由 ScaffoldMessenger 管理的 SnackBars
description: >
  SnackBars 現在由 ScaffoldMessenger 管理，並可在路由間持續顯示。
---

{% render docs/breaking-changes.md %}

## 摘要

`SnackBar` API 現在在 `Scaffold` 中由
`ScaffoldMessenger` 處理，而在 `MaterialApp` 的 context 中預設就會有一個。

## 背景說明

在這項變更之前，顯示 `SnackBar` 時會呼叫
目前 `BuildContext` 內的 `Scaffold`。
透過呼叫 `Scaffold.of(context).showSnackBar`，
目前的 `Scaffold` 會將 `SnackBar` 動畫顯示出來。
這僅會作用於目前的 `Scaffold`，
而且如果在 `SnackBar` 顯示期間路由被切換，
則無法在不同路由間持續顯示。
此外，如果在執行非同步事件時呼叫 `showSnackBar`，
而此時因路由切換導致 `BuildContext` 失效且 `Scaffold` 被銷毀，
也會造成錯誤。

現在由 `ScaffoldMessenger` 處理 `SnackBar`，
以便能在路由間持續顯示，並且永遠顯示於目前的 `Scaffold` 上。
預設情況下，`MaterialApp` 會包含一個根 `ScaffoldMessenger`，
但你也可以自行建立受控範圍的 `ScaffoldMessenger`，
以進一步控制 _哪些_ `Scaffold` 能接收你的 `SnackBar`。

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

新的方法會呼叫`ScaffoldMessenger`來顯示`SnackBar`。在這種情況下，`Builder`不再需要提供一個「位於」`Scaffold`之下、帶有`BuildContext`的新作用域。

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

當在轉場期間顯示`SnackBar`時，`SnackBar`會完成`Hero`動畫（Animation），
使其平滑地移動到下一個頁面。

`ScaffoldMessenger`會建立一個範疇（scope），讓所有子孫`Scaffold`註冊以接收`SnackBar`，
這也是它們能在這些轉場期間持續存在的原因。
當使用由`MaterialApp`提供的根`ScaffoldMessenger`時，所有子孫`Scaffold`都能收到`SnackBar`，
除非在樹狀結構中更下層建立了新的`ScaffoldMessenger`範疇。
如果你自行實例化`ScaffoldMessenger`，就能根據應用程式的情境，
控制哪些`Scaffold`能收到`SnackBar`，哪些不能。

方法`debugCheckHasScaffoldMessenger`可用來斷言指定的 context 是否有`ScaffoldMessenger`祖先。
如果嘗試在沒有`ScaffoldMessenger`祖先的情況下顯示`SnackBar`，
將會出現如下的斷言訊息：

```plaintext
No ScaffoldMessenger widget found.
Scaffold widgets require a ScaffoldMessenger widget ancestor.
Typically, the ScaffoldMessenger widget is introduced by the MaterialApp
at the top of your application widget tree.
```

## 移轉指南

移轉前的程式碼：

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

## 時間軸

合併於版本：1.23.0-13.0.pre<br>  
穩定版本釋出：2.0.0

## 參考資料

API 文件：

* [`Scaffold`][`Scaffold`]
* [`ScaffoldMessenger`][`ScaffoldMessenger`]
* [`SnackBar`][`SnackBar`]
* [`MaterialApp`][`MaterialApp`]

相關議題：

* [Issue #57218][Issue #57218]
* [Issue #62921][Issue #62921]

相關 PR：

* [ScaffoldMessenger][ScaffoldMessenger]
* [ScaffoldMessenger Migration][ScaffoldMessenger Migration]

[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`ScaffoldMessenger`]: {{site.api}}/flutter/material/ScaffoldMessenger-class.html
[`SnackBar`]: {{site.api}}/flutter/material/SnackBar-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[Issue #57218]: {{site.repo.flutter}}/issues/57218
[Issue #62921]: {{site.repo.flutter}}/issues/62921
[ScaffoldMessenger]: {{site.repo.flutter}}/pull/64101
[ScaffoldMessenger Migration]: {{site.repo.flutter}}/pull/64170
