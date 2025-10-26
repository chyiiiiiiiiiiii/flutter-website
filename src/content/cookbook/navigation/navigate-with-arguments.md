---
title: 傳遞參數至命名路由
description: 如何將參數傳遞給命名路由。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/navigation/navigate_with_arguments"?>

[`Navigator`][`Navigator`] 提供了從應用程式的任何部分，透過共用識別符號導向命名路由（named route）的能力。
在某些情境下，你可能還需要將參數傳遞給命名路由。例如，你可能希望導向 `/user` 路由，並將使用者相關資訊傳遞給該路由。

:::note
對於大多數應用程式來說，命名路由（named routes）已不再建議使用。更多資訊請參考
[navigation overview][navigation overview] 頁面的 [Limitations][Limitations]。
:::

[Limitations]: /ui/navigation#limitations
[navigation overview]: /ui/navigation

你可以透過 [`Navigator.pushNamed()`][`Navigator.pushNamed()`] 方法的 `arguments` 參數來完成這個任務。你可以使用 [`ModalRoute.of()`][`ModalRoute.of()`] 方法，或是在傳遞給 [`MaterialApp`][`MaterialApp`] 或 [`CupertinoApp`][`CupertinoApp`] 建構子的 [`onGenerateRoute()`][`onGenerateRoute()`] 函式內部擷取參數。

本教學將示範如何傳遞參數至命名路由，並透過 `ModalRoute.of()` 和 `onGenerateRoute()` 讀取參數，步驟如下：

  1. 定義你需要傳遞的參數。
  2. 建立一個擷取參數的元件（Widget）。
  3. 在 `routes` 表中註冊該元件。
  4. 導向該元件。

## 1. 定義你需要傳遞的參數

首先，定義你要傳遞給新路由的參數。
在這個範例中，會傳遞兩個資料：
螢幕（screen）的 `title` 和一個 `message`。

為了同時傳遞這兩個資料，請建立一個用來儲存這些資訊的類別。

<?code-excerpt "lib/main.dart (ScreenArguments)"?>
```dart
// You can pass any object to the arguments parameter.
// In this example, create a class that contains both
// a customizable title and message.
class ScreenArguments {
  final String title;
  final String message;

  ScreenArguments(this.title, this.message);
}
```

## 2. 建立一個擷取參數的元件（Widget）

接下來，建立一個元件（Widget），用來從 `ScreenArguments` 擷取並顯示 `title` 和 `message`。
若要存取 `ScreenArguments`，
請使用 [`ModalRoute.of()`][`ModalRoute.of()`] 方法。
此方法會回傳帶有參數的當前路由（Route）。

<?code-excerpt "lib/main.dart (ExtractArgumentsScreen)"?>
```dart
// A Widget that extracts the necessary arguments from
// the ModalRoute.
class ExtractArgumentsScreen extends StatelessWidget {
  const ExtractArgumentsScreen({super.key});

  static const routeName = '/extractArguments';

  @override
  Widget build(BuildContext context) {
    // Extract the arguments from the current ModalRoute
    // settings and cast them as ScreenArguments.
    final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;

    return Scaffold(
      appBar: AppBar(title: Text(args.title)),
      body: Center(child: Text(args.message)),
    );
  }
}
```

## 3. 在 `routes` 表中註冊元件（Widget）

接下來，請在提供給 `MaterialApp` 元件（Widget）的 `routes` 中新增一個項目。  
`routes` 決定了根據路由名稱應該建立哪一個元件（Widget）。

{% comment %}
RegEx removes the return statement and adds the closing parenthesis at the end
{% endcomment %}
<?code-excerpt "lib/main.dart (routes)" plaster="none" replace="/return //g;/^\);$/)/g"?>
```dart
MaterialApp(
  routes: {
    ExtractArgumentsScreen.routeName: (context) =>
        const ExtractArgumentsScreen(),
  },
)
```


## 4. 導航至元件（Widget）

最後，當使用者點擊按鈕時，使用 [`Navigator.pushNamed()`][`Navigator.pushNamed()`] 導航至 `ExtractArgumentsScreen`。
透過 `arguments` 屬性將參數傳遞給路由（Route）。
`ExtractArgumentsScreen` 會從這些參數中擷取 `title` 和 `message`。

<?code-excerpt "lib/main.dart (PushNamed)"?>
```dart
// A button that navigates to a named route.
// The named route extracts the arguments
// by itself.
ElevatedButton(
  onPressed: () {
    // When the user taps the button,
    // navigate to a named route and
    // provide the arguments as an optional
    // parameter.
    Navigator.pushNamed(
      context,
      ExtractArgumentsScreen.routeName,
      arguments: ScreenArguments(
        'Extract Arguments Screen',
        'This message is extracted in the build method.',
      ),
    );
  },
  child: const Text('Navigate to screen that extracts arguments'),
),
```

## 或者，使用 `onGenerateRoute` 來提取參數

除了可以直接在元件（Widget）內提取參數之外，你也可以在 [`onGenerateRoute()`][`onGenerateRoute()`]
函式中提取參數，然後將它們傳遞給元件（Widget）。

`onGenerateRoute()` 函式會根據給定的 [`RouteSettings`][`RouteSettings`] 建立正確的 Route。

{% comment %}
RegEx removes the return statement, removed "routes" property and adds the closing parenthesis at the end
{% endcomment %}

```dart
MaterialApp(
  // Provide a function to handle named routes.
  // Use this function to identify the named
  // route being pushed, and create the correct
  // Screen.
  onGenerateRoute: (settings) {
    // If you push the PassArguments route
    if (settings.name == PassArgumentsScreen.routeName) {
      // Cast the arguments to the correct
      // type: ScreenArguments.
      final args = settings.arguments as ScreenArguments;

      // Then, extract the required data from
      // the arguments and pass the data to the
      // correct screen.
      return MaterialPageRoute(
        builder: (context) {
          return PassArgumentsScreen(
            title: args.title,
            message: args.message,
          );
        },
      );
    }
    // The code only supports
    // PassArgumentsScreen.routeName right now.
    // Other values need to be implemented if we
    // add them. The assertion here will help remind
    // us of that higher up in the call stack, since
    // this assertion would otherwise fire somewhere
    // in the framework.
    assert(false, 'Need to implement ${settings.name}');
    return null;
  },
)
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter complete navigation hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {
        ExtractArgumentsScreen.routeName: (context) =>
            const ExtractArgumentsScreen(),
      },
      // Provide a function to handle named routes.
      // Use this function to identify the named
      // route being pushed, and create the correct
      // Screen.
      onGenerateRoute: (settings) {
        // If you push the PassArguments route
        if (settings.name == PassArgumentsScreen.routeName) {
          // Cast the arguments to the correct
          // type: ScreenArguments.
          final args = settings.arguments as ScreenArguments;

          // Then, extract the required data from
          // the arguments and pass the data to the
          // correct screen.
          return MaterialPageRoute(
            builder: (context) {
              return PassArgumentsScreen(
                title: args.title,
                message: args.message,
              );
            },
          );
        }
        // The code only supports
        // PassArgumentsScreen.routeName right now.
        // Other values need to be implemented if we
        // add them. The assertion here will help remind
        // us of that higher up in the call stack, since
        // this assertion would otherwise fire somewhere
        // in the framework.
        assert(false, 'Need to implement ${settings.name}');
        return null;
      },
      title: 'Navigation with Arguments',
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home Screen')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // A button that navigates to a named route.
            // The named route extracts the arguments
            // by itself.
            ElevatedButton(
              onPressed: () {
                // When the user taps the button,
                // navigate to a named route and
                // provide the arguments as an optional
                // parameter.
                Navigator.pushNamed(
                  context,
                  ExtractArgumentsScreen.routeName,
                  arguments: ScreenArguments(
                    'Extract Arguments Screen',
                    'This message is extracted in the build method.',
                  ),
                );
              },
              child: const Text('Navigate to screen that extracts arguments'),
            ),
            // A button that navigates to a named route.
            // For this route, extract the arguments in
            // the onGenerateRoute function and pass them
            // to the screen.
            ElevatedButton(
              onPressed: () {
                // When the user taps the button, navigate
                // to a named route and provide the arguments
                // as an optional parameter.
                Navigator.pushNamed(
                  context,
                  PassArgumentsScreen.routeName,
                  arguments: ScreenArguments(
                    'Accept Arguments Screen',
                    'This message is extracted in the onGenerateRoute '
                        'function.',
                  ),
                );
              },
              child: const Text('Navigate to a named that accepts arguments'),
            ),
          ],
        ),
      ),
    );
  }
}

// A Widget that extracts the necessary arguments from
// the ModalRoute.
class ExtractArgumentsScreen extends StatelessWidget {
  const ExtractArgumentsScreen({super.key});

  static const routeName = '/extractArguments';

  @override
  Widget build(BuildContext context) {
    // Extract the arguments from the current ModalRoute
    // settings and cast them as ScreenArguments.
    final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;

    return Scaffold(
      appBar: AppBar(title: Text(args.title)),
      body: Center(child: Text(args.message)),
    );
  }
}

// A Widget that accepts the necessary arguments via the
// constructor.
class PassArgumentsScreen extends StatelessWidget {
  static const routeName = '/passArguments';

  final String title;
  final String message;

  // This Widget accepts the arguments as constructor
  // parameters. It does not extract the arguments from
  // the ModalRoute.
  //
  // The arguments are extracted by the onGenerateRoute
  // function provided to the MaterialApp widget.
  const PassArgumentsScreen({
    super.key,
    required this.title,
    required this.message,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(child: Text(message)),
    );
  }
}

// You can pass any object to the arguments parameter.
// In this example, create a class that contains both
// a customizable title and message.
class ScreenArguments {
  final String title;
  final String message;

  ScreenArguments(this.title, this.message);
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/navigate-with-arguments.webp" alt="示範如何帶參數導向不同路由" class="site-mobile-screenshot" />
</noscript>


[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[`ModalRoute.of()`]: {{site.api}}/flutter/widgets/ModalRoute/of.html
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Navigator.pushNamed()`]: {{site.api}}/flutter/widgets/Navigator/pushNamed.html
[`onGenerateRoute()`]: {{site.api}}/flutter/widgets/WidgetsApp/onGenerateRoute.html
[`RouteSettings`]: {{site.api}}/flutter/widgets/RouteSettings-class.html
