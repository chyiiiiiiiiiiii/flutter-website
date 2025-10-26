---
title: "持久化儲存架構：鍵值資料"
description: 將應用程式資料儲存到使用者裝置上的鍵值儲存區。
contentTags:
  - data
  - shared-preferences
  - dark mode
iconPath: /assets/images/docs/app-architecture/design-patterns/kv-store-icon.svg
order: 1
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="app-architecture/todo_data_service"?>

大多數 Flutter 應用程式，無論規模大小，都會在某個時刻需要將資料儲存到使用者的裝置上，例如 API 金鑰、使用者偏好設定，或是需要離線可用的資料。

在本教學中，你將學習如何在採用推薦 [Flutter 架構設計][Flutter architecture design] 的 Flutter 應用程式中，整合鍵值資料的持久化儲存。如果你對於將資料儲存到磁碟還不熟悉，可以先閱讀 [將鍵值資料儲存到磁碟][Store key-value data on disk] 教學。

鍵值儲存區通常用於儲存簡單資料，例如應用程式設定。在本教學中，你將使用它來儲存深色模式（Dark Mode）偏好設定。如果你想學習如何在裝置上儲存複雜資料，建議使用 SQL。此時可以參考本教學後續的 [持久化儲存架構：SQL][Persistent storage architecture: SQL] 教學。

## 範例應用程式：具備主題選擇的應用

範例應用程式包含一個單一螢幕，頂部有 app bar，中間是一個項目清單，底部有一個文字欄位 (text field) 輸入區。

<img src='/assets/images/docs/cookbook/architecture/todo_app_light.png'
class="site-mobile-screenshot" alt="ToDo application in light mode" >

在 `AppBar` 中，`Switch` 讓使用者可以切換深色與淺色主題模式。此設定會立即套用，並透過鍵值資料儲存服務儲存在裝置上。當使用者再次啟動應用程式時，該設定會自動還原。

<img src='/assets/images/docs/cookbook/architecture/todo_app_dark.png'
class="site-mobile-screenshot" alt="ToDo application in dark mode" >

:::note
本範例的完整可執行原始碼可在 [`/examples/app-architecture/todo_data_service/`][`/examples/app-architecture/todo_data_service/`] 取得。
:::

## 儲存主題選擇的鍵值資料

此功能遵循推薦的 Flutter 架構設計模式，分為呈現層（presentation layer）與資料層（data layer）。

- 呈現層包含 `ThemeSwitch` 元件 (Widget) 以及 `ThemeSwitchViewModel`。
- 資料層包含 `ThemeRepository` 以及 `SharedPreferencesService`。

### 主題選擇的呈現層

`ThemeSwitch` 是一個 `StatelessWidget`，其中包含一個 `Switch` 元件 (Widget)。開關的狀態由 `ThemeSwitchViewModel` 中的公開欄位 `isDarkMode` 來表示。當使用者點擊開關時，程式會在 view model 中執行 `toggle` 指令。

<?code-excerpt "lib/ui/theme_config/widgets/theme_switch.dart (ThemeSwitch)"?>
```dart
class ThemeSwitch extends StatelessWidget {
  const ThemeSwitch({super.key, required this.viewmodel});

  final ThemeSwitchViewModel viewmodel;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Row(
        children: [
          const Text('Dark Mode'),
          ListenableBuilder(
            listenable: viewmodel,
            builder: (context, _) {
              return Switch(
                value: viewmodel.isDarkMode,
                onChanged: (_) {
                  viewmodel.toggle.execute();
                },
              );
            },
          ),
        ],
      ),
    );
  }
}
```

`ThemeSwitchViewModel` 實作了一個 view model（檢視模型），
這與 MVVM（Model-View-ViewModel）模式中的描述相符。
這個 view model 包含了 `ThemeSwitch` 元件（Widget）的狀態，
並以布林變數 `_isDarkMode` 來表示。

此 view model 使用 `ThemeRepository`
來儲存與讀取深色模式（dark mode）設定。

它包含了兩個不同的指令操作（command actions）：
`load`，用於從儲存庫（repository）載入深色模式設定，
以及 `toggle`，用於在深色模式與淺色模式之間切換狀態。
它透過 `isDarkMode` getter 對外暴露狀態。

`_load` 方法實作了 `load` 指令。
此方法會呼叫 `ThemeRepository.isDarkMode`
以取得已儲存的設定，並呼叫 `notifyListeners()` 來刷新 UI。

`_toggle` 方法則實作了 `toggle` 指令。
此方法會呼叫 `ThemeRepository.setDarkMode`
來儲存新的深色模式設定。
此外，它也會變更本地狀態 `_isDarkMode`，
然後呼叫 `notifyListeners()` 以更新 UI。

<?code-excerpt "lib/ui/theme_config/viewmodel/theme_switch_viewmodel.dart (ThemeSwitchViewModel)"?>
```dart
class ThemeSwitchViewModel extends ChangeNotifier {
  ThemeSwitchViewModel(this._themeRepository) {
    load = Command0(_load)..execute();
    toggle = Command0(_toggle);
  }

  final ThemeRepository _themeRepository;

  bool _isDarkMode = false;

  /// If true show dark mode
  bool get isDarkMode => _isDarkMode;

  late final Command0<void> load;

  late final Command0<void> toggle;

  /// Load the current theme setting from the repository
  Future<Result<void>> _load() async {
    final result = await _themeRepository.isDarkMode();
    if (result is Ok<bool>) {
      _isDarkMode = result.value;
    }
    notifyListeners();
    return result;
  }

  /// Toggle the theme setting
  Future<Result<void>> _toggle() async {
    _isDarkMode = !_isDarkMode;
    final result = await _themeRepository.setDarkMode(_isDarkMode);
    notifyListeners();
    return result;
  }
}
```

### 主題選擇資料層

依照架構指引，  
資料層被劃分為兩個部分：`ThemeRepository` 與 `SharedPreferencesService`。

`ThemeRepository` 是所有主題化（theming）設定的唯一真實來源（single source of truth），  
並且負責處理來自服務層的任何可能錯誤。

在這個範例中，  
`ThemeRepository` 也透過可觀察的 `Stream` 對外暴露深色模式（dark mode）設定。  
這使得應用程式的其他部分  
可以訂閱深色模式設定的變化。

`ThemeRepository` 依賴於 `SharedPreferencesService`。  
Repository 會從 service 取得儲存的值，  
並在值變更時進行儲存。

`setDarkMode()` 方法會將新值傳遞給 `StreamController`，  
以便任何監聽 `observeDarkMode` stream 的元件  


<?code-excerpt "lib/data/repositories/theme_repository.dart (ThemeRepository)"?>
```dart
class ThemeRepository {
  ThemeRepository(this._service);

  final _darkModeController = StreamController<bool>.broadcast();

  final SharedPreferencesService _service;

  /// Get if dark mode is enabled
  Future<Result<bool>> isDarkMode() async {
    try {
      final value = await _service.isDarkMode();
      return Result.ok(value);
    } on Exception catch (e) {
      return Result.error(e);
    }
  }

  /// Set dark mode
  Future<Result<void>> setDarkMode(bool value) async {
    try {
      await _service.setDarkMode(value);
      _darkModeController.add(value);
      return Result.ok(null);
    } on Exception catch (e) {
      return Result.error(e);
    }
  }

  /// Stream that emits theme config changes.
  /// ViewModels should call [isDarkMode] to get the current theme setting.
  Stream<bool> observeDarkMode() => _darkModeController.stream;
}
```

`SharedPreferencesService` 包裝了 `SharedPreferences` 插件的功能，並呼叫 `setBool()` 和 `getBool()` 方法來儲存深色模式（dark mode）設定，將這個第三方相依性（dependency）隱藏在應用程式的其他部分之外。

:::note
第三方相依性（third-party dependency）是指由你所在組織以外的其他程式設計師所開發的套件與插件。
:::

<?code-excerpt "lib/data/services/shared_preferences_service.dart (SharedPreferencesService)"?>
```dart
class SharedPreferencesService {
  static const String _kDarkMode = 'darkMode';

  Future<void> setDarkMode(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_kDarkMode, value);
  }

  Future<bool> isDarkMode() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_kDarkMode) ?? false;
  }
}
```

## 綜合應用

在這個範例中，
`ThemeRepository` 和 `SharedPreferencesService` 會在 `main()` 方法中建立，
並作為建構子參數依賴傳遞給 `MainApp`。

<?code-excerpt "lib/main.dart (MainTheme)"?>
```dart
void main() {
  // ···
  runApp(
    MainApp(
      themeRepository: ThemeRepository(SharedPreferencesService()),
      // ···
    ),
  );
}
```

接著，當建立 `ThemeSwitch` 時，
同時建立 `ThemeSwitchViewModel`，
並將 `ThemeRepository` 作為相依性傳遞進去。

<?code-excerpt "lib/main.dart (AddThemeSwitch)"?>
```dart
ThemeSwitch(
  viewmodel: ThemeSwitchViewModel(widget.themeRepository),
),
```

範例應用程式中也包含了 `MainAppViewModel` 類別，
它會監聽 `ThemeRepository` 的變化，
並將深色模式（dark mode）設定暴露給 `MaterialApp` 元件（Widget）。

<?code-excerpt "lib/main_app_viewmodel.dart (MainAppViewModel)"?>
```dart
class MainAppViewModel extends ChangeNotifier {
  MainAppViewModel(this._themeRepository) {
    _subscription = _themeRepository.observeDarkMode().listen((isDarkMode) {
      _isDarkMode = isDarkMode;
      notifyListeners();
    });
    _load();
  }

  final ThemeRepository _themeRepository;
  StreamSubscription<bool>? _subscription;

  bool _isDarkMode = false;

  bool get isDarkMode => _isDarkMode;

  Future<void> _load() async {
    final result = await _themeRepository.isDarkMode();
    if (result is Ok<bool>) {
      _isDarkMode = result.value;
    }
    notifyListeners();
  }

  @override
  void dispose() {
    _subscription?.cancel();
    super.dispose();
  }
}
```

<?code-excerpt "lib/main.dart (ListenableBuilder)" replace="/^return //g;/},$/},\n  child: \/\/...\n)/g"?>
```dart
ListenableBuilder(
  listenable: _viewModel,
  builder: (context, child) {
    return MaterialApp(
      theme: _viewModel.isDarkMode ? ThemeData.dark() : ThemeData.light(),
      home: child,
    );
  },
  child: //...
)
```

[Flutter architecture design]: /app-architecture
[Store key-value data on disk]: /cookbook/persistence/key-value
[Persistent Storage Architecture: SQL]: /app-architecture/design-patterns/sql
[`/examples/app-architecture/todo_data_service/`]: {{site.repo.this}}/tree/main/examples/app-architecture/todo_data_service/
