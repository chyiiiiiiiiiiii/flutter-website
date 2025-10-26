---
title: 使用命名路由進行導覽
description: 如何實作命名路由以在螢幕間導覽。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/navigation/named_routes"?>

:::note
大多數應用程式現在已不再建議使用命名路由。
如需更多資訊，請參閱
[Limitations][Limitations] 於 [navigation overview][navigation overview] 頁面。
:::

[Limitations]: /ui/navigation#limitations
[navigation overview]: /ui/navigation

在 [Navigate to a new screen and back][Navigate to a new screen and back] 教學中，
你已學會如何建立新的 Route 並將其推送到 [`Navigator`][`Navigator`]，
以導覽至新螢幕。

然而，如果你需要在應用程式的多個地方導覽至相同的螢幕，
這種做法會導致程式碼重複。
解決方法是定義一個 _命名路由_（named route），
並使用命名路由來進行導覽。

要使用命名路由，
請使用 [`Navigator.pushNamed()`][`Navigator.pushNamed()`] 函式。
本範例重現了原始教學的功能，
並透過以下步驟示範如何使用命名路由：

  1. 建立兩個螢幕。
  2. 定義路由。
  3. 使用 `Navigator.pushNamed()` 導覽至第二個螢幕。
  4. 使用 `Navigator.pop()` 返回第一個螢幕。

## 1. 建立兩個螢幕

首先，建立兩個要操作的螢幕。第一個螢幕包含一個
按鈕，用來導覽至第二個螢幕。第二個螢幕則包含一個
按鈕，可導覽回第一個螢幕。

<?code-excerpt "lib/main_original.dart"?>
```dart
import 'package:flutter/material.dart';

class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Screen')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Navigate to the second screen when tapped.
          },
          child: const Text('Launch screen'),
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  const SecondScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Second Screen')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Navigate back to first screen when tapped.
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

## 2. 定義路由

接下來，透過在 [`MaterialApp`][`MaterialApp`] 建構函式中提供額外的屬性來定義路由：`initialRoute`
以及 `routes` 本身。

`initialRoute` 屬性用來定義應用程式啟動時應該從哪個路由開始。
`routes` 屬性則用來定義可用的命名路由（named routes）以及在導向這些路由時要建立的元件（Widgets）。

{% comment %}
RegEx removes the trailing comma
{% endcomment %}
<?code-excerpt "lib/main.dart (MaterialApp)" replace="/^\),$/)/g"?>
```dart
MaterialApp(
  title: 'Named Routes Demo',
  // Start the app with the "/" named route. In this case, the app starts
  // on the FirstScreen widget.
  initialRoute: '/',
  routes: {
    // When navigating to the "/" route, build the FirstScreen widget.
    '/': (context) => const FirstScreen(),
    // When navigating to the "/second" route, build the SecondScreen widget.
    '/second': (context) => const SecondScreen(),
  },
)
```

:::warning
當你使用 `initialRoute` 時，**不要** 定義 `home` 屬性。
:::

## 3. 導航至第二個螢幕

當元件（Widgets）與命名路由（routes）都設定完成後，可以透過
[`Navigator.pushNamed()`][`Navigator.pushNamed()`] 方法來觸發導航。
這會告訴 Flutter 去建立在 `routes` 表格中定義的元件（Widget），並開啟該螢幕。

在 `FirstScreen` 元件（Widget）的 `build()` 方法中，更新 `onPressed()`
回呼函式（callback）：

{% comment %}
RegEx removes the trailing comma
{% endcomment %}
<?code-excerpt "lib/main.dart (PushNamed)" replace="/,$//g"?>
```dart
// Within the `FirstScreen` widget
onPressed: () {
  // Navigate to the second screen using a named route.
  Navigator.pushNamed(context, '/second');
}
```

## 4. 返回第一個螢幕

若要導覽回到第一個螢幕，請使用
[`Navigator.pop()`][`Navigator.pop()`] 函式。

{% comment %}
RegEx removes the trailing comma
{% endcomment %}
<?code-excerpt "lib/main.dart (Pop)" replace="/,$//g"?>
```dart
// Within the SecondScreen widget
onPressed: () {
  // Navigate back to the first screen by popping the current route
  // off the stack.
  Navigator.pop(context);
}
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Named Routes hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      title: 'Named Routes Demo',
      // Start the app with the "/" named route. In this case, the app starts
      // on the FirstScreen widget.
      initialRoute: '/',
      routes: {
        // When navigating to the "/" route, build the FirstScreen widget.
        '/': (context) => const FirstScreen(),
        // When navigating to the "/second" route, build the SecondScreen widget.
        '/second': (context) => const SecondScreen(),
      },
    ),
  );
}

class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Screen')),
      body: Center(
        child: ElevatedButton(
          // Within the `FirstScreen` widget
          onPressed: () {
            // Navigate to the second screen using a named route.
            Navigator.pushNamed(context, '/second');
          },
          child: const Text('Launch screen'),
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  const SecondScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Second Screen')),
      body: Center(
        child: ElevatedButton(
          // Within the SecondScreen widget
          onPressed: () {
            // Navigate back to the first screen by popping the current route
            // off the stack.
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/navigation-basics.webp" alt="導航基礎示範" class="site-mobile-screenshot" />
</noscript>


[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[Navigate to a new screen and back]: /cookbook/navigation/navigation-basics
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Navigator.pop()`]: {{site.api}}/flutter/widgets/Navigator/pop.html
[`Navigator.pushNamed()`]: {{site.api}}/flutter/widgets/Navigator/pushNamed.html
