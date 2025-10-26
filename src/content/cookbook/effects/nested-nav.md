---
title: 建立巢狀導覽流程
description: 如何實作具有巢狀導覽的流程。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/effects/nested_nav"?>

隨著應用程式的發展，路由（Route）會逐漸累積成數十甚至數百個。
其中有些路由適合作為頂層（全域）路由。
例如 "/", "profile", "contact", "social_feed" 都是
應用程式中可能的頂層路由。
但試想，如果你將所有可能的路由都定義在
頂層的 `Navigator` 元件（Widget）中，清單會非常冗長，
而且其中許多路由更適合巢狀在其他元件之中管理。

以一個物聯網（IoT）無線燈泡的設定流程為例，
你可以透過 App 來控制燈泡。
這個設定流程包含四個頁面：

* `find_devices` 頁面：搜尋附近的燈泡。
* `select_device` 頁面：選擇你想新增的燈泡。
* `connecting` 頁面：新增燈泡。
* `finished` 頁面：完成設定。

你可以在頂層的 `Navigator` 元件（Widget）中協調這些行為。
不過，更合理的做法是在 `SetupFlow` 元件內部定義第二個
巢狀的 `Navigator` 元件，並讓這個巢狀的 `Navigator` 元件
負責管理設定流程中的四個頁面。
這種導覽的委派方式能讓本地控制更靈活，
在軟體開發時通常是較佳選擇。

下方動畫展示了 App 的行為：

![Gif showing the nested "setup" flow](/assets/images/docs/cookbook/effects/NestedNavigator.webp){:.site-mobile-screenshot}

在本教學中，你將實作一個四頁式的 IoT 設定流程，
並讓它的導覽邏輯巢狀於頂層的 `Navigator` 元件之下。

## 導覽前的準備

這個 IoT App 有兩個頂層螢幕，
以及一個設定流程。請將這些
路由名稱定義為常數，方便在程式碼中引用。

<?code-excerpt "lib/main.dart (routes)"?>
```dart
const routeHome = '/';
const routeSettings = '/settings';
const routePrefixDeviceSetup = '/setup/';
const routeDeviceSetupStart = '/setup/$routeDeviceSetupStartPage';
const routeDeviceSetupStartPage = 'find_devices';
const routeDeviceSetupSelectDevicePage = 'select_device';
const routeDeviceSetupConnectingPage = 'connecting';
const routeDeviceSetupFinishedPage = 'finished';
```

home 和 settings 螢幕是以靜態名稱參照的。然而，setup flow 頁面則是使用兩個路徑來建立其路由名稱：`/setup/` 前綴加上特定頁面的名稱。

透過結合這兩個路徑，你的 `Navigator` 可以判斷某個路由名稱是屬於 setup flow，而不需要辨識所有與 setup flow 相關的個別頁面。

最上層的 `Navigator` 並不負責辨識個別的 setup flow 頁面。因此，你的最上層 `Navigator` 需要解析傳入的路由名稱，以辨識 setup flow 的前綴。

需要解析路由名稱，代表你不能使用最上層 `routes` 的屬性。相反地，你必須為 `onGenerateRoute` 屬性提供一個函式。

實作 `onGenerateRoute`，以便針對三個最上層路徑分別回傳適當的元件（Widget）。

<?code-excerpt "lib/main.dart (OnGenerateRoute)"?>
```dart
onGenerateRoute: (settings) {
  final Widget page;
  if (settings.name == routeHome) {
    page = const HomeScreen();
  } else if (settings.name == routeSettings) {
    page = const SettingsScreen();
  } else if (settings.name!.startsWith(routePrefixDeviceSetup)) {
    final subRoute = settings.name!.substring(
      routePrefixDeviceSetup.length,
    );
    page = SetupFlow(setupPageRoute: subRoute);
  } else {
    throw Exception('Unknown route: ${settings.name}');
  }

  return MaterialPageRoute<void>(
    builder: (context) {
      return page;
    },
    settings: settings,
  );
},
```

請注意，home 和 settings 這兩個路由是以精確的路由名稱來匹配的。然而，setup flow 路由的條件則只檢查前綴。如果路由名稱包含 setup flow 的前綴，則剩下的路由名稱會被忽略，並傳遞給 `SetupFlow` widget 進行處理。

這種對路由名稱的拆分方式，使得最上層的 `Navigator` 能夠對 setup flow 內的各種子路由保持無感知。

建立一個名為 `SetupFlow` 的 stateful widget，並讓它接受一個路由名稱。

<?code-excerpt "lib/setupflow.dart (SetupFlow)" replace="/@override\n*.*\n\s*return const SizedBox\(\);\n\s*}/\/\/.../g"?>
```dart
class SetupFlow extends StatefulWidget {
  const SetupFlow({super.key, required this.setupPageRoute});

  final String setupPageRoute;

  @override
  State<SetupFlow> createState() => SetupFlowState();
}

class SetupFlowState extends State<SetupFlow> {
  //...
}
```

## 為設定流程顯示應用程式列（App Bar）

設定流程會顯示一個持續存在的應用程式列（App Bar），
並且會在所有頁面上顯示。

請在你的 `SetupFlow` 元件（Widget）的 `build()` 方法中
回傳 `Scaffold` 元件（Widget），
並加入你想要的 `AppBar` 元件（Widget）。

<?code-excerpt "lib/setupflow2.dart (SetupFlow2)"?>
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(appBar: _buildFlowAppBar(), body: const SizedBox());
}

PreferredSizeWidget _buildFlowAppBar() {
  return AppBar(title: const Text('Bulb Setup'));
}
```

應用程式列（app bar）會顯示返回箭頭，並在按下返回箭頭時結束設定流程（setup flow）。然而，結束流程會導致使用者失去所有進度。因此，系統會提示使用者確認是否真的要離開設定流程。

請提示使用者確認是否要離開設定流程，並確保當使用者按下裝置上的硬體返回鍵時，也會顯示此提示。

<?code-excerpt "lib/prompt_user.dart (PromptUser)"?>
```dart
Future<void> _onExitPressed() async {
  final isConfirmed = await _isExitDesired();

  if (isConfirmed && mounted) {
    _exitSetup();
  }
}

Future<bool> _isExitDesired() async {
  return await showDialog<bool>(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: const Text('Are you sure?'),
            content: const Text(
              'If you exit device setup, your progress will be lost.',
            ),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop(true);
                },
                child: const Text('Leave'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop(false);
                },
                child: const Text('Stay'),
              ),
            ],
          );
        },
      ) ??
      false;
}

void _exitSetup() {
  Navigator.of(context).pop();
}

@override
Widget build(BuildContext context) {
  return PopScope(
    canPop: false,
    onPopInvokedWithResult: (didPop, _) async {
      if (didPop) return;

      if (await _isExitDesired() && context.mounted) {
        _exitSetup();
      }
    },
    child: Scaffold(appBar: _buildFlowAppBar(), body: const SizedBox()),
  );
}

PreferredSizeWidget _buildFlowAppBar() {
  return AppBar(
    leading: IconButton(
      onPressed: _onExitPressed,
      icon: const Icon(Icons.chevron_left),
    ),
    title: const Text('Bulb Setup'),
  );
}
```

當使用者在應用程式列（app bar）點擊返回箭頭，
或在裝置上按下返回按鈕時，
會跳出一個提示對話框，確認
使用者是否真的想要離開設定流程（setup flow）。
如果使用者按下 **Leave**（離開），則設定流程會將自己
從頂層導覽堆疊（navigation stack）中移除。
如果使用者按下 **Stay**（停留），則該動作會被忽略。

你可能會注意到 `Navigator.pop()`
同時被 **Leave** 和
**Stay** 按鈕呼叫。需要特別說明的是，
這個 `pop()` 動作是將提示對話框從
導覽堆疊中移除，而不是設定流程。

## 產生巢狀路由（nested routes）

設定流程的工作是顯示流程中
適當的頁面。

在 `SetupFlow` 中加入 `Navigator` 元件（Widget），
並實作 `onGenerateRoute` 屬性。

<?code-excerpt "lib/add_navigator.dart (AddNavigator)"?>
```dart
final _navigatorKey = GlobalKey<NavigatorState>();

void _onDiscoveryComplete() {
  _navigatorKey.currentState!.pushNamed(routeDeviceSetupSelectDevicePage);
}

void _onDeviceSelected(String deviceId) {
  _navigatorKey.currentState!.pushNamed(routeDeviceSetupConnectingPage);
}

void _onConnectionEstablished() {
  _navigatorKey.currentState!.pushNamed(routeDeviceSetupFinishedPage);
}

@override
Widget build(BuildContext context) {
  return PopScope(
    canPop: false,
    onPopInvokedWithResult: (didPop, _) async {
      if (didPop) return;

      if (await _isExitDesired() && context.mounted) {
        _exitSetup();
      }
    },
    child: Scaffold(
      appBar: _buildFlowAppBar(),
      body: Navigator(
        key: _navigatorKey,
        initialRoute: widget.setupPageRoute,
        onGenerateRoute: _onGenerateRoute,
      ),
    ),
  );
}

Route<Widget> _onGenerateRoute(RouteSettings settings) {
  final page = switch (settings.name) {
    routeDeviceSetupStartPage => WaitingPage(
      message: 'Searching for nearby bulb...',
      onWaitComplete: _onDiscoveryComplete,
    ),
    routeDeviceSetupSelectDevicePage => SelectDevicePage(
      onDeviceSelected: _onDeviceSelected,
    ),
    routeDeviceSetupConnectingPage => WaitingPage(
      message: 'Connecting...',
      onWaitComplete: _onConnectionEstablished,
    ),
    routeDeviceSetupFinishedPage => FinishedPage(onFinishPressed: _exitSetup),
    _ => throw StateError('Unexpected route name: ${settings.name}!'),
  };

  return MaterialPageRoute(
    builder: (context) {
      return page;
    },
    settings: settings,
  );
}
```

`_onGenerateRoute` 函式的運作方式與頂層的 `Navigator` 相同。`RouteSettings` 物件會被傳入該函式，其中包含該路由的 `name`。根據這個路由名稱，會回傳四個流程頁面中的其中一個。

第一個頁面稱為 `find_devices`，它會等待幾秒鐘以模擬網路掃描。等待結束後，該頁面會呼叫其 callback。在這個案例中，該 callback 為 `_onDiscoveryComplete`。設定流程會辨識到，當裝置探索完成時，應顯示裝置選擇頁面。因此，在 `_onDiscoveryComplete` 中，`_navigatorKey` 會指示巢狀的 `Navigator` 導航至 `select_device` 頁面。

`select_device` 頁面會要求使用者從可用裝置清單中選擇一個裝置。在本範例中，僅會向使用者顯示一個裝置。當使用者點選裝置時，會呼叫 `onDeviceSelected` callback。設定流程會辨識到，當選擇裝置後，應顯示連線頁面。因此，在 `_onDeviceSelected` 中，`_navigatorKey` 會指示巢狀的 `Navigator` 導航至 `"connecting"` 頁面。

`connecting` 頁面的運作方式與 `find_devices` 頁面相同。`connecting` 頁面會等待幾秒鐘，然後呼叫其 callback。在這個案例中，callback 為 `_onConnectionEstablished`。設定流程會辨識到，當連線建立後，應顯示最終頁面。因此，在 `_onConnectionEstablished` 中，`_navigatorKey` 會指示巢狀的 `Navigator` 導航至 `finished` 頁面。

`finished` 頁面會提供使用者一個 **完成** 按鈕。當使用者點選 **完成** 時，會呼叫 `_exitSetup` callback，該 callback 會將整個設定流程從頂層 `Navigator` 堆疊中彈出，將使用者帶回主畫面。

恭喜！
你已經實作了具有四個子路由的巢狀導覽。

## 互動範例

執行應用程式：

* 在 **新增您的第一個燈泡** 螢幕上，點選浮動操作按鈕（FAB），按鈕上有加號 **+**。這會帶你到 **選擇附近裝置** 螢幕。螢幕上會列出一個燈泡。
* 點選列出的燈泡。會出現 **完成！** 螢幕。
* 點選 **完成** 按鈕即可返回第一個螢幕。

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter nested navigation hands-on example in DartPad" run="true" height="640px"
import 'package:flutter/material.dart';

const routeHome = '/';
const routeSettings = '/settings';
const routePrefixDeviceSetup = '/setup/';
const routeDeviceSetupStart = '/setup/$routeDeviceSetupStartPage';
const routeDeviceSetupStartPage = 'find_devices';
const routeDeviceSetupSelectDevicePage = 'select_device';
const routeDeviceSetupConnectingPage = 'connecting';
const routeDeviceSetupFinishedPage = 'finished';

void main() {
  runApp(
    MaterialApp(
      theme: ThemeData(
        brightness: Brightness.dark,
        appBarTheme: const AppBarTheme(backgroundColor: Colors.blue),
        floatingActionButtonTheme: const FloatingActionButtonThemeData(
          backgroundColor: Colors.blue,
        ),
      ),
      onGenerateRoute: (settings) {
        final Widget page;
        if (settings.name == routeHome) {
          page = const HomeScreen();
        } else if (settings.name == routeSettings) {
          page = const SettingsScreen();
        } else if (settings.name!.startsWith(routePrefixDeviceSetup)) {
          final subRoute = settings.name!.substring(
            routePrefixDeviceSetup.length,
          );
          page = SetupFlow(setupPageRoute: subRoute);
        } else {
          throw Exception('Unknown route: ${settings.name}');
        }

        return MaterialPageRoute<void>(
          builder: (context) {
            return page;
          },
          settings: settings,
        );
      },
      debugShowCheckedModeBanner: false,
    ),
  );
}

@immutable
class SetupFlow extends StatefulWidget {
  static SetupFlowState of(BuildContext context) {
    return context.findAncestorStateOfType<SetupFlowState>()!;
  }

  const SetupFlow({super.key, required this.setupPageRoute});

  final String setupPageRoute;

  @override
  SetupFlowState createState() => SetupFlowState();
}

class SetupFlowState extends State<SetupFlow> {
  final _navigatorKey = GlobalKey<NavigatorState>();

  @override
  void initState() {
    super.initState();
  }

  void _onDiscoveryComplete() {
    _navigatorKey.currentState!.pushNamed(routeDeviceSetupSelectDevicePage);
  }

  void _onDeviceSelected(String deviceId) {
    _navigatorKey.currentState!.pushNamed(routeDeviceSetupConnectingPage);
  }

  void _onConnectionEstablished() {
    _navigatorKey.currentState!.pushNamed(routeDeviceSetupFinishedPage);
  }

  Future<void> _onExitPressed() async {
    final isConfirmed = await _isExitDesired();

    if (isConfirmed && mounted) {
      _exitSetup();
    }
  }

  Future<bool> _isExitDesired() async {
    return await showDialog<bool>(
          context: context,
          builder: (context) {
            return AlertDialog(
              title: const Text('Are you sure?'),
              content: const Text(
                'If you exit device setup, your progress will be lost.',
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop(true);
                  },
                  child: const Text('Leave'),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop(false);
                  },
                  child: const Text('Stay'),
                ),
              ],
            );
          },
        ) ??
        false;
  }

  void _exitSetup() {
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) async {
        if (didPop) return;

        if (await _isExitDesired() && context.mounted) {
          _exitSetup();
        }
      },
      child: Scaffold(
        appBar: _buildFlowAppBar(),
        body: Navigator(
          key: _navigatorKey,
          initialRoute: widget.setupPageRoute,
          onGenerateRoute: _onGenerateRoute,
        ),
      ),
    );
  }

  Route<Widget> _onGenerateRoute(RouteSettings settings) {
    final page = switch (settings.name) {
      routeDeviceSetupStartPage => WaitingPage(
        message: 'Searching for nearby bulb...',
        onWaitComplete: _onDiscoveryComplete,
      ),
      routeDeviceSetupSelectDevicePage => SelectDevicePage(
        onDeviceSelected: _onDeviceSelected,
      ),
      routeDeviceSetupConnectingPage => WaitingPage(
        message: 'Connecting...',
        onWaitComplete: _onConnectionEstablished,
      ),
      routeDeviceSetupFinishedPage => FinishedPage(onFinishPressed: _exitSetup),
      _ => throw StateError('Unexpected route name: ${settings.name}!'),
    };

    return MaterialPageRoute(
      builder: (context) {
        return page;
      },
      settings: settings,
    );
  }

  PreferredSizeWidget _buildFlowAppBar() {
    return AppBar(
      leading: IconButton(
        onPressed: _onExitPressed,
        icon: const Icon(Icons.chevron_left),
      ),
      title: const Text('Bulb Setup'),
    );
  }
}

class SelectDevicePage extends StatelessWidget {
  const SelectDevicePage({super.key, required this.onDeviceSelected});

  final void Function(String deviceId) onDeviceSelected;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Select a nearby device:',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 54,
                child: ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: WidgetStateColor.resolveWith((states) {
                      return const Color(0xFF222222);
                    }),
                  ),
                  onPressed: () {
                    onDeviceSelected('22n483nk5834');
                  },
                  child: const Text(
                    'Bulb 22n483nk5834',
                    style: TextStyle(fontSize: 24),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class WaitingPage extends StatefulWidget {
  const WaitingPage({
    super.key,
    required this.message,
    required this.onWaitComplete,
  });

  final String message;
  final VoidCallback onWaitComplete;

  @override
  State<WaitingPage> createState() => _WaitingPageState();
}

class _WaitingPageState extends State<WaitingPage> {
  @override
  void initState() {
    super.initState();
    _startWaiting();
  }

  Future<void> _startWaiting() async {
    await Future<dynamic>.delayed(const Duration(seconds: 3));

    if (mounted) {
      widget.onWaitComplete();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const CircularProgressIndicator(),
              const SizedBox(height: 32),
              Text(widget.message),
            ],
          ),
        ),
      ),
    );
  }
}

class FinishedPage extends StatelessWidget {
  const FinishedPage({super.key, required this.onFinishPressed});

  final VoidCallback onFinishPressed;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 200,
                  height: 200,
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    color: Color(0xFF222222),
                  ),
                  child: const Center(
                    child: Icon(
                      Icons.lightbulb,
                      size: 140,
                      color: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(height: 32),
                const Text(
                  'Bulb added!',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 32),
                ElevatedButton(
                  style: ButtonStyle(
                    padding: WidgetStateProperty.resolveWith((states) {
                      return const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      );
                    }),
                    backgroundColor: WidgetStateColor.resolveWith((states) {
                      return const Color(0xFF222222);
                    }),
                    shape: WidgetStateProperty.resolveWith((states) {
                      return const StadiumBorder();
                    }),
                  ),
                  onPressed: onFinishPressed,
                  child: const Text('Finish', style: TextStyle(fontSize: 24)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

@immutable
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(context),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 200,
                height: 200,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: Color(0xFF222222),
                ),
                child: Center(
                  child: Icon(
                    Icons.lightbulb,
                    size: 140,
                    color: Theme.of(context).scaffoldBackgroundColor,
                  ),
                ),
              ),
              const SizedBox(height: 32),
              const Text(
                'Add your first bulb',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context).pushNamed(routeDeviceSetupStart);
        },
        child: const Icon(Icons.add),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(BuildContext context) {
    return AppBar(
      title: const Text('Welcome'),
      actions: [
        IconButton(
          icon: const Icon(Icons.settings),
          onPressed: () {
            Navigator.pushNamed(context, routeSettings);
          },
        ),
      ],
    );
  }
}

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(8, (index) {
            return Container(
              width: double.infinity,
              height: 54,
              margin: const EdgeInsets.only(left: 16, right: 16, top: 16),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: const Color(0xFF222222),
              ),
            );
          }),
        ),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(title: const Text('Settings'));
  }
}
```
