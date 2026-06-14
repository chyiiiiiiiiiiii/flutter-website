# 使用套件

> 如何在你的 Flutter 應用程式中使用套件。



<?code-excerpt path-base="platform_integration/plugin_api_migration"?>

Flutter 支援使用其他開發者貢獻給 Flutter 與 Dart 生態系的共用套件。這讓你能夠快速建立應用程式，而不必從零開始開發所有功能。

:::note 套件與插件 (plugin) 的差異
插件（plugin）是一種_套件_——完整名稱為_插件套件（plugin package）_，通常簡稱為 _plugin_。

**套件（Packages）**
: 最基本的 Dart 套件是一個包含 `pubspec.yaml` 檔案的目錄。此外，套件還可以包含相依套件（列在 pubspec 中）、Dart 函式庫、應用程式、資源、測試、圖片、字型和範例。[pub.dev][] 網站列出了許多套件——由 Google 工程師及 Flutter 與 Dart 社群的熱心成員開發——你可以在你的應用程式中使用這些套件。

**插件（Plugins）**
: 插件套件是一種特殊的套件，能讓應用程式存取平台功能。插件套件可以針對 Android（使用 Kotlin 或 Java）、iOS（使用 Swift 或 Objective-C）、Web、macOS、Windows、Linux 或這些平台的任意組合來撰寫。例如，某個插件可能為 Flutter 應用程式提供使用裝置相機的能力。

<YouTubeEmbed id="Y9WifT8aN6o"
  title="Packages versus plugins | Decoding Flutter"></YouTubeEmbed>
:::

現有的套件可實現許多應用情境——例如，進行網路請求（[`http`][]）、導航／路由處理（[`go_router`][]）、整合裝置 API（[`url_launcher`][] 和 [`battery_plus`][]），以及使用第三方平台 SDK，如 Firebase（[FlutterFire][]）。

若要撰寫新的套件，請參閱[開發套件][developing packages]。若要加入資產、圖片或字型（無論是檔案還是套件中的），請參閱[加入資產與圖片][Adding assets and images]。

[Adding assets and images]: /ui/assets/assets-and-images
[`battery_plus`]: https://pub.dev/packages/battery_plus
[developing packages]: /packages-and-plugins/developing-packages
[FlutterFire]: https://github.com/firebase/flutterfire

[`go_router`]: https://pub.dev/packages/go_router
[`http`]: /cookbook/networking/fetch-data
[pub.dev]: https://pub.dev
[`url_launcher`]: https://pub.dev/packages/url_launcher

## 使用套件

以下章節說明如何使用現有已發佈的套件。

### 搜尋套件

套件會發佈到 [pub.dev][]。

pub.dev 上的 [Flutter 首頁][Flutter landing page] 會顯示與 Flutter 相容的熱門套件（即那些宣告與 Flutter 相容相依性的套件），並支援在所有已發佈套件中搜尋。

pub.dev 上的 [Flutter Favorites][] 頁面列出了被認定為你在撰寫應用程式時應優先考慮使用的插件與套件。關於成為 Flutter Favorite 的意義，請參閱 [Flutter Favorites 計畫][Flutter Favorites program]。

你也可以透過在 pub.dev 上篩選 [Android][]、[iOS][]、[web][]、[Linux][]、[Windows][]、[macOS][] 或這些平台的任意組合來瀏覽套件。

[Android]: https://pub.dev/packages?q=sdk%3Aflutter+platform%3Aandroid
[Flutter Favorites]: https://pub.dev/flutter/favorites
[Flutter Favorites program]: /packages-and-plugins/favorites
[Flutter landing page]: https://pub.dev/flutter
[Linux]: ?q=sdk%3Aflutter+platform%3Alinux
[iOS]: https://pub.dev/packages?q=sdk%3Aflutter+platform%3Aios
[macOS]: https://pub.dev/packages?q=sdk%3Aflutter+platform%3Amacos
[web]: https://pub.dev/packages?q=sdk%3Aflutter+platform%3Aweb
[Windows]: https://pub.dev/packages?q=sdk%3Aflutter+platform%3Awindows

### 使用 `flutter pub add` 為應用程式新增套件相依

若要將套件 `english_words` 新增至應用程式：

1. 在專案目錄內使用 [`pub add`][] 指令
   * `flutter pub add english_words`

1. 匯入套件
   * 在 Dart 程式碼中加入對應的 `import` 陳述。

1. 如有需要，停止並重新啟動應用程式
   * 如果該套件包含平台專屬程式碼（Android 的 Kotlin/Java，iOS 的 Swift/Objective-C），這些程式碼必須被建置進你的應用程式。熱重載（hot reload）與熱重啟（hot restart）只會更新 Dart 程式碼，因此可能需要完整重新啟動應用程式，以避免在使用該套件時出現 `MissingPluginException` 等錯誤。

[`pub add`]: https://dart.dev/tools/pub/cmd/pub-add

### 為應用程式新增套件相依

若要將套件 `english_words` 新增至應用程式：

1. 加入相依
   * 開啟應用程式資料夾內的 `pubspec.yaml` 檔案，並在 `dependencies` 下方加入 `english_words: ^4.0.0`。

1. 安裝套件
   * 從終端機執行：執行 `flutter pub get`。<br/>
   **或**
   * 從 VS Code：點擊 `pubspec.yaml` 頂部操作列右側的 **Get Packages**（下載圖示）。
   * 從 Android Studio/IntelliJ：點擊 `pubspec.yaml` 頂部操作列的 **Pub get**。

1. 匯入套件
   * 在 Dart 程式碼中加入對應的 `import` 陳述。

1. 如有需要，停止並重新啟動應用程式
   * 如果該套件包含平台專屬程式碼（Android 的 Kotlin/Java，iOS 的 Swift/Objective-C），這些程式碼必須被建置進你的應用程式。熱重載（hot reload）與熱重啟（hot restart）只會更新 Dart 程式碼，因此可能需要完整重新啟動應用程式，以避免在使用該套件時出現 `MissingPluginException` 等錯誤。

### 使用 `flutter pub remove` 移除應用程式的套件相依

若要從應用程式中移除套件 `english_words`：

1. 在專案目錄內使用 [`pub remove`][] 指令
   * `flutter pub remove english_words`

[安裝標籤（Installing tab）][Installing tab] 可在 pub.dev 上任何套件頁面找到，是這些步驟的便利參考。

完整範例請參考下方的 [english_words 範例][english_words example]。

[english_words example]: #english-words-example
[Installing tab]: https://pub.dev/packages/english_words/install
[`pub remove`]: https://dart.dev/tools/pub/cmd/pub-remove

### 衝突解決

假設你想在應用程式中同時使用 `some_package` 和 `another_package`，而這兩者都相依於 `url_launcher`，但所需版本不同。這會造成潛在衝突。避免這種情況的最佳做法是套件作者在指定相依時，使用[版本範圍][version ranges]，而非指定特定版本。

```yaml
dependencies:
  url_launcher: ^5.4.0    # Good, any version >= 5.4.0 but < 6.0.0
  image_picker: '5.4.3'   # Not so good, only version 5.4.3 works.
```

如果 `some_package` 宣告了上述相依套件，
而 `another_package` 則宣告了一個相容的
`url_launcher` 相依套件，例如 `'5.4.6'` 或
`^5.5.0`，pub 會自動解決這個問題。
針對 [Gradle modules][Gradle modules] 和／或 [CocoaPods][CocoaPods]
等平台專屬相依套件，也會以類似方式處理。

即使 `some_package` 和 `another_package`
對 `url_launcher` 宣告了不相容的版本，
它們實際上可能以相容的方式使用 `url_launcher`。在這種情況下，
可以透過在應用程式的 `pubspec.yaml` 檔案中加入
相依套件覆寫（dependency override）宣告，強制使用特定版本來解決衝突。

例如，若要強制使用 `url_launcher` 的 `5.4.0` 版本，
請對應用程式的 `pubspec.yaml` 檔案進行以下修改：

```yaml
dependencies:
  some_package:
  another_package:
dependency_overrides:
  url_launcher: '5.4.0'
```

如果產生衝突的相依項目本身不是套件（package），而是像 `guava` 這樣的 Android 專用函式庫，則必須將相依項目的覆寫宣告加入到 Gradle 的建置邏輯中。

若要強制使用 `guava` 版本 `28.0`，請在應用程式的 `android/build.gradle` 檔案中進行以下修改：

<Tabs key="android-conflict-resolution">
<Tab name="Kotlin">

```kotlin title="android/app/build.gradle.kts"
configurations.all {
    resolutionStrategy {
        force("com.google.guava:guava:28.0-android")
    }
}
```

</Tab>
<Tab name="Groovy">

```groovy title="android/app/build.gradle"
configurations.all {
    resolutionStrategy {
        force 'com.google.guava:guava:28.0-android'
    }
}
```

</Tab>
</Tabs>

CocoaPods 目前尚未提供相依套件覆寫（dependency override）功能。

[CocoaPods]: https://guides.cocoapods.org/syntax/podspec.html#dependency
[Gradle modules]: https://docs.gradle.org/current/userguide/declaring_dependencies.html
[version ranges]: https://dart.dev/tools/pub/dependencies#version-constraints

## 開發新套件

如果現有的套件無法滿足你的特定需求，你可以[撰寫自訂套件][write a custom package]。

[write a custom package]: /packages-and-plugins/developing-packages

## 管理套件相依性與版本

為了降低版本衝突的風險，請在 `pubspec.yaml` 檔案中指定版本範圍。

### 套件版本

所有套件都有一個版本號，這個版本號會在套件的 `pubspec.yaml` 檔案中指定。套件的目前版本會顯示在其名稱旁邊（例如，請參閱 [`url_launcher`][] 套件），同時也會列出所有先前版本（請參閱 [`url_launcher` versions][]）。

為了確保在更新套件時應用程式不會發生錯誤，請使用以下其中一種格式來指定版本範圍。

* **範圍限制（Ranged constraints）：** 指定最小與最大版本。

  ```yaml
  dependencies:
    url_launcher: '>=5.4.0 <6.0.0'
  ```

* **使用 [caret 語法][caret syntax] 的區間限制：**
  指定作為包含式最小版本的版本號。
  這樣會涵蓋從該版本到下一個主版本之前的所有版本。

  ```yaml
  dependencies:
    collection: '^5.4.0'
  ```

  這種語法與第一個項目符號中提到的語法具有相同的意義。

如需進一步了解，請參閱[套件版本管理指南][package versioning guide]。

[caret syntax]: https://dart.dev/tools/pub/dependencies#caret-syntax
[package versioning guide]: https://dart.dev/tools/pub/versioning
[`url_launcher` versions]: https://pub.dev/packages/url_launcher/versions

### 更新套件相依性

當你在新增套件後第一次執行 `flutter pub get` 時，
Flutter 會將找到的具體套件版本儲存在 `pubspec.lock`
[lockfile][lockfile] 中。這可確保你或團隊中的其他開發者再次執行 `flutter pub get` 時，
都能取得相同的套件版本。

若要升級至該套件的新版本，
例如想使用該套件中的新功能時，
請執行 `flutter pub upgrade`，
以取得該套件在 `pubspec.yaml`
所指定版本限制下可用的最高版本。
請注意，這個指令與
`flutter upgrade` 或 `flutter update-packages`
不同，後者會更新 Flutter 本身。

[lockfile]: https://dart.dev/tools/pub/glossary#lockfile

### 相依於未發佈的套件

即使套件尚未發佈到 pub.dev，也可以使用這些套件。
對於私人套件或尚未準備好發佈的套件，
還有其他相依性選項可供選擇：

**路徑相依性（Path dependency）**
: Flutter 應用程式可以透過檔案系統的
  `path:` 相依性來依賴套件。路徑可以是相對路徑或絕對路徑。
  相對路徑會以包含 `pubspec.yaml` 的目錄為基準進行解析。例如，若要依賴一個
  位於應用程式旁邊目錄中的套件 packageA，
  可以使用以下語法：

  ```yaml
    dependencies:
    packageA:
      path: ../packageA/

  ```

**Git 相依套件（Git dependency）**
: 你也可以依賴儲存在 Git 儲存庫中的套件。
  如果該套件位於儲存庫的根目錄，
  請使用以下語法：

  ```yaml
    dependencies:
      packageA:
        git:
          url: https://github.com/flutter/packageA.git
  ```

**使用 SSH 的 Git 相依套件**
: 如果儲存庫為私有，且你可以透過 SSH 連線，
  可以使用該儲存庫的 SSH URL 來加入套件相依性：

  ```yaml
    dependencies:
      packageA:
        git:
          url: git@github.com:flutter/packageA.git
  ```

**Git 相依於資料夾中的套件**
: Pub 預設套件位於 Git 儲存庫的根目錄。如果不是這種情況，請使用 `path` 參數來指定位置。例如：

  ```yaml
  dependencies:
    packageA:
      git:
        url: https://github.com/flutter/packages.git
        path: packages/packageA
  ```

  最後，使用 `ref` 參數將相依套件鎖定（pin）到特定的 git commit、分支（branch）或標籤（tag）。如需更多細節，請參閱 [Package dependencies][]。

[Package dependencies]: https://dart.dev/tools/pub/dependencies

## 範例

以下範例將逐步說明如何使用套件。

### 範例：使用 english_words 套件 {:#english-words-example}

[`english_words`][] 套件包含數千個最常用的英文單字以及一些實用工具函式。

要使用此套件，請依下列步驟操作：

1. 建立一個名為 `words_demo` 的新專案。

1. 執行 `dart pub add english_words` 以新增相依套件。

1. 開啟 `lib/main.dart`，並將其全部內容替換為：

    <?code-excerpt "lib/english_words.dart (english-words)"?>
    ```dart
    import 'package:english_words/english_words.dart';
    import 'package:flutter/material.dart';
    
    void main() {
      runApp(const MyApp());
    }
    
    class MyApp extends StatelessWidget {
      const MyApp({super.key});
    
      @override
      Widget build(BuildContext context) {
        return const MaterialApp(home: DemoPage());
      }
    }
    
    class DemoPage extends StatelessWidget {
      const DemoPage({super.key});
    
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: Center(child: Text(generateWordPairs().first.asPascalCase)),
        );
      }
    }
    ```

1. 執行應用程式。應用程式的文字應會顯示一組隨機的英文單字組合。

[`english_words`]: https://pub.dev/packages/english_words

### 範例：使用 url_launcher 套件開啟瀏覽器 {:#url-example}

[`url_launcher`][] 插件套件（plugin package）可以在行動平台上開啟預設瀏覽器，顯示指定的 URL，並支援 Android、iOS、Web、Windows、Linux 和 macOS。
這個套件是一種特殊的 Dart 套件，稱為_插件套件_（plugin package，或稱 _plugin_），其中包含平台專屬的程式碼。

要使用這個插件，請依照下列步驟：

1. 建立一個名為 `launchdemo` 的新專案。

1. 開啟 `pubspec.yaml`，並加入 `url_launcher` 相依套件（dependency）：

   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     url_launcher: ^5.4.0
   ```

1. 在終端機中執行 `flutter pub get`，
   或在 VS Code 中點擊 **Get Packages get**。

1. 開啟 `lib/main.dart`，並將其全部內容替換為以下內容：

    <?code-excerpt "lib/url_launcher.dart (url-launcher)"?>
    ```dart
    import 'package:flutter/material.dart';
    import 'package:url_launcher/url_launcher.dart';
    
    void main() {
      runApp(const MyApp());
    }
    
    class MyApp extends StatelessWidget {
      const MyApp({super.key});
    
      @override
      Widget build(BuildContext context) {
        return const MaterialApp(home: DemoPage());
      }
    }
    
    class DemoPage extends StatelessWidget {
      const DemoPage({super.key});
    
      void launchURL() {
        launchUrl(Uri.parse('https://flutter.dev'));
      }
    
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: Center(
            child: ElevatedButton(
              onPressed: launchURL,
              child: const Text('Show Flutter homepage'),
            ),
          ),
        );
      }
    }
    ```

1. 執行應用程式（如果在加入 plugin 前已經在執行，請先停止再重新啟動）。點擊 **Show Flutter homepage**。你應該會看到預設瀏覽器在裝置上開啟，並顯示 flutter.dev 的首頁。

