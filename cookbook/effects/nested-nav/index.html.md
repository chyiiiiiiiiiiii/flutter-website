# 建立巢狀導覽流程

> 如何實作具有巢狀導覽的流程。



<?code-excerpt path-base="cookbook/effects/nested_nav"?>

隨著應用程式的發展，路由（Route）數量會從數十個累積到數百個。
你的一些路由適合作為頂層（全域）路由。
例如，"/"、"profile"、"contact"、"social_feed" 都是
應用程式中可能的頂層路由。
但想像一下，如果你將所有可能的路由都定義在
頂層的 `Navigator` 元件 (Widget) 中，這個清單會非常冗長，
而且其中許多路由
其實更適合巢狀於其他元件之中來處理。

以一個無線燈泡的物聯網（IoT）設定流程為例，
你可以用應用程式來控制這顆燈泡。
這個設定流程包含四個頁面：

* `find_devices` 頁面：尋找附近的燈泡。
* `select_device` 頁面：選擇你想要
  新增的燈泡。
* `connecting` 頁面：新增燈泡。
* `finished` 頁面：完成設定。

你可以在頂層的
`Navigator` 元件中協調這個行為。然而，更合理的做法是，在 `SetupFlow` 元件內部定義第二個巢狀的 `Navigator` 元件，
並讓這個巢狀的 `Navigator` 元件負責設定流程中的四個頁面。
這種導覽的委派方式能促進更好的區域控制，
這在軟體開發時通常是較佳的選擇。

下方動畫展示了應用程式的行為：

![Gif showing the nested "setup" flow](/assets/images/docs/cookbook/effects/NestedNavigator.webp){:.site-mobile-screenshot}

在本教學中，你將實作一個四頁式的 IoT 設定流程，
並讓它的導覽邏輯巢狀於
頂層的 `Navigator` 元件之下。

## 導覽準備

這個 IoT 應用程式有兩個頂層螢幕，
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

home 和 settings 螢幕是以靜態名稱參照的。然而，設定流程（setup flow）頁面則是透過兩個路徑來建立其路由名稱：`/setup/` 前綴加上特定頁面的名稱。
透過結合這兩個路徑，你的 `Navigator` 可以判斷某個路由名稱是否屬於設定流程，而不需要認得所有與設定流程相關的個別頁面。

最上層的 `Navigator` 並不負責識別個別的設定流程頁面。因此，你的最上層 `Navigator` 需要解析傳入的路由名稱，以辨識設定流程的前綴。需要解析路由名稱，代表你無法使用最上層 `Navigator` 的 `routes` 屬性。相反地，你必須為 `onGenerateRoute` 屬性提供一個函式。

實作 `onGenerateRoute`，以便針對三個最上層路徑分別回傳對應的元件。

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

請注意，home 和 settings 這兩個路由是以精確的命名路由（named route）來比對。然而，setup flow 路由的條件則只檢查前綴。如果路由名稱包含 setup flow 的前綴，則路由名稱剩餘的部分會被忽略，並傳遞給 `SetupFlow` 元件進行處理。
這種對路由名稱的分割方式，使得最上層的 `Navigator` 能夠對 setup flow 內部的各種子路由保持無感（agnostic）。

建立一個名為 `SetupFlow` 的有狀態元件（StatefulWidget），並讓它接受一個路由名稱。

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

## 為設定流程顯示應用程式列

設定流程會顯示一個持續存在的應用程式列（app bar），
該列會出現在所有頁面上。

請在你的 `SetupFlow`
元件的 `build()` 方法中回傳一個 `Scaffold`
元件，
並包含你想要的 `AppBar` 元件。

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

應用程式列會顯示返回箭頭，並在按下返回箭頭時結束設定流程（setup flow）。然而，結束設定流程會導致使用者失去所有進度。因此，系統會提示使用者確認是否真的要離開設定流程。

請在使用者嘗試離開設定流程時，提示其確認，並確保當使用者按下裝置上的實體返回鍵（hardware back button）時，也會顯示此提示。

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

當使用者點擊應用程式列上的返回箭頭，
或是在裝置上按下返回鍵時，
會跳出一個提示對話框（alert dialog），
以確認使用者是否真的想要離開設定流程。
如果使用者按下 **Leave**（離開），那麼設定流程會從
最上層的導覽堆疊（navigation stack）中彈出自己。
如果使用者按下 **Stay**（留下），則此動作會被忽略。

你可能會注意到，`Navigator.pop()`
同時被 **Leave** 和 **Stay** 兩個按鈕呼叫。
需要特別說明的是，
這個 `pop()` 動作是將提示對話框從
導覽堆疊中彈出，而不是設定流程本身。

## 產生巢狀路由

設定流程的工作是顯示流程中適當的
頁面。

在 `SetupFlow` 中加入 `Navigator` 元件，
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

`_onGenerateRoute` 函式的運作方式與頂層的 `Navigator` 相同。該函式會接收一個 `RouteSettings` 物件，該物件包含該路由的 `name`。根據這個路由名稱，會回傳四個流程頁面中的其中一個。

第一個頁面稱為 `find_devices`，會等待幾秒鐘以模擬網路掃描。等待結束後，該頁面會呼叫它的回呼（callback）。在這個例子中，該回呼為 `_onDiscoveryComplete`。
設定流程會辨識到，當裝置探索完成時，應該顯示裝置選擇頁面。因此，在 `_onDiscoveryComplete` 中，`_navigatorKey` 會指示巢狀的 `Navigator` 導航至 `select_device` 頁面。

`select_device` 頁面會要求使用者從可用裝置清單中選擇一個裝置。在本範例中，僅會顯示一個裝置給使用者。
當使用者點擊某個裝置時，會觸發 `onDeviceSelected` 回呼。設定流程會辨識到，當選擇裝置後，應該顯示連線頁面。因此，在 `_onDeviceSelected` 中，`_navigatorKey` 會指示巢狀的 `Navigator` 導航至 `"connecting"` 頁面。

`connecting` 頁面的運作方式與 `find_devices` 頁面相同。`connecting` 頁面會等待幾秒鐘，然後呼叫它的回呼。
在這個例子中，回呼為 `_onConnectionEstablished`。設定流程會辨識到，當連線建立完成時，應該顯示最終頁面。因此，在 `_onConnectionEstablished` 中，`_navigatorKey` 會指示巢狀的 `Navigator` 導航至 `finished` 頁面。

`finished` 頁面會提供使用者一個 **Finish** 按鈕。當使用者點擊 **Finish** 時，會觸發 `_exitSetup` 回呼，此回呼會將整個設定流程從頂層 `Navigator` 堆疊中彈出，將使用者帶回主畫面。

恭喜你！
你已經實作了包含四個子路由的巢狀導覽（nested navigation）。

## 互動式範例

執行應用程式：

* 在 **Add your first bulb** 螢幕上，點擊帶有加號（**+**）的 FAB。這會帶你進入 **Select a nearby device** 螢幕，畫面上會列出一個燈泡。
* 點擊該燈泡，會出現 **Finished!** 螢幕。
* 點擊 **Finished** 按鈕，即可返回第一個畫面。

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

