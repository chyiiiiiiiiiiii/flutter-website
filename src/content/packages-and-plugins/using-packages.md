---
title: 使用套件
description: 如何在你的 Flutter 應用程式中使用套件。
---

<?code-excerpt path-base="platform_integration/plugin_api_migration"?>

Flutter 支援使用其他開發者貢獻給 Flutter 和 Dart 生態系的共用套件（package）。這讓你可以快速建立應用程式，而不必從零開始開發所有功能。

:::note 套件與外掛（plugin）的差異
外掛（plugin）是一種_套件_（package）&mdash;完整名稱為 _外掛套件（plugin package）_，通常簡稱為 _外掛（plugin）_。

**套件（Packages）**
: Dart 套件至少是一個包含 `pubspec.yaml` 檔案的目錄。此外，套件還可以包含相依套件（列於 pubspec）、Dart 函式庫、應用程式、資源、測試、圖片、字型及範例。[pub.dev][pub.dev] 網站上列出了許多套件——由 Google 工程師及 Flutter 和 Dart 社群的熱心成員開發——你可以在你的應用程式中使用這些套件。

**外掛（Plugins）**
: 外掛套件是一種特殊的套件，能讓應用程式存取平台功能。外掛套件可以為 Android（使用 Kotlin 或 Java）、iOS（使用 Swift 或 Objective-C）、web、macOS、Windows、Linux，或這些平台的任意組合開發。例如，某個外掛可能讓 Flutter 應用程式能夠使用裝置的相機。

{% ytEmbed 'Y9WifT8aN6o', 'Packages versus plugins | Decoding Flutter' %}
:::

現有的套件已能實現許多應用情境——例如，發送網路請求（[`http`][`http`]）、導覽/路由處理（[`go_router`][`go_router`]）、整合裝置 API（[`url_launcher`][`url_launcher`] 和 [`battery_plus`][`battery_plus`]），以及使用如 Firebase 等第三方平台 SDK（[FlutterFire][FlutterFire]）。

若要撰寫新的套件，請參閱[開發套件][developing packages]。若要新增資產、圖片或字型（不論是檔案或套件中的），請參閱[新增資產與圖片][Adding assets and images]。

[Adding assets and images]: /ui/assets/assets-and-images
[`battery_plus`]: {{site.pub-pkg}}/battery_plus
[developing packages]: /packages-and-plugins/developing-packages
[FlutterFire]: {{site.github}}/firebase/flutterfire

[`go_router`]: {{site.pub-pkg}}/go_router
[`http`]: /cookbook/networking/fetch-data
[pub.dev]: {{site.pub}}
[`url_launcher`]: {{site.pub-pkg}}/url_launcher

## 使用套件

以下章節說明如何使用現有已發佈的套件。

### 搜尋套件

套件會發佈到 [pub.dev][pub.dev]。

pub.dev 上的 [Flutter 首頁][Flutter landing page] 會顯示與 Flutter 相容的熱門套件（這些套件的相依性通常與 Flutter 相容），並支援在所有已發佈套件中搜尋。

pub.dev 上的 [Flutter Favorites][Flutter Favorites] 頁面列出了被認定為你在開發應用程式時應優先考慮使用的外掛與套件。關於成為 Flutter Favorite 的意義，請參閱 [Flutter Favorites 計畫][Flutter Favorites program]。

你也可以在 pub.dev 上透過篩選 [Android][Android]、[iOS][iOS]、[web][web]、[Linux][Linux]、[Windows][Windows]、[macOS][macOS]，或這些平台的任意組合來瀏覽套件。

[Android]: {{site.pub-pkg}}?q=sdk%3Aflutter+platform%3Aandroid
[Flutter Favorites]: {{site.pub}}/flutter/favorites
[Flutter Favorites program]: /packages-and-plugins/favorites
[Flutter landing page]: {{site.pub}}/flutter
[Linux]: {{site.pub-pkgs}}?q=sdk%3Aflutter+platform%3Alinux
[iOS]: {{site.pub-pkg}}?q=sdk%3Aflutter+platform%3Aios
[macOS]: {{site.pub-pkg}}?q=sdk%3Aflutter+platform%3Amacos
[web]: {{site.pub-pkg}}?q=sdk%3Aflutter+platform%3Aweb
[Windows]: {{site.pub-pkg}}?q=sdk%3Aflutter+platform%3Awindows

### 使用 `flutter pub add` 為應用程式新增套件相依

若要將套件 `css_colors` 新增至應用程式：

1. 在專案目錄內使用 [`pub add`][`pub add`] 指令
   * `flutter pub add css_colors`

1. 匯入套件
   * 在 Dart 程式碼中新增對應的 `import` 陳述式。

1. 如有需要，停止並重新啟動應用程式
   * 若套件包含平台專屬程式碼（Android 的 Kotlin/Java、iOS 的 Swift/Objective-C），這些程式碼必須編譯進你的應用程式。熱重載（hot reload）和熱重啟（hot restart）只會更新 Dart 程式碼，因此使用該套件時，可能需要完整重啟應用程式，以避免出現如 `MissingPluginException` 這類錯誤。

[`pub add`]: {{site.dart-site}}/tools/pub/cmd/pub-add

### 為應用程式新增套件相依

若要將套件 `css_colors` 新增至應用程式：

1. 加入相依
   * 開啟應用程式資料夾內的 `pubspec.yaml` 檔案，並在 `dependencies` 區塊下新增 `css_colors: ^1.0.0`。

1. 安裝套件
   * 在終端機執行：`flutter pub get`。<br/>
   **或**
   * 在 VS Code：點擊 `pubspec.yaml` 頂端動作列右側的 **Get Packages**（下載圖示）。
   * 在 Android Studio/IntelliJ：點擊 `pubspec.yaml` 頂端動作列的 **Pub get**。

1. 匯入套件
   * 在 Dart 程式碼中新增對應的 `import` 陳述式。

1. 如有需要，停止並重新啟動應用程式
   * 若套件包含平台專屬程式碼（Android 的 Kotlin/Java、iOS 的 Swift/Objective-C），這些程式碼必須編譯進你的應用程式。熱重載（hot reload）和熱重啟（hot restart）只會更新 Dart 程式碼，因此使用該套件時，可能需要完整重啟應用程式，以避免出現如 `MissingPluginException` 這類錯誤。

### 使用 `flutter pub remove` 移除應用程式的套件相依

若要從應用程式移除套件 `css_colors`：

1. 在專案目錄內使用 [`pub remove`][`pub remove`] 指令
   * `flutter pub remove css_colors`

[安裝（Installing）分頁][Installing tab]，可在 pub.dev 上任何套件頁面找到，是這些步驟的便利參考。

完整範例請參閱下方的 [css_colors 範例][css_colors example]。

[css_colors example]: #css-example
[Installing tab]: {{site.pub-pkg}}/css_colors/install
[`pub remove`]: {{site.dart-site}}/tools/pub/cmd/pub-remove

### 衝突解決

假設你想在應用程式中同時使用 `some_package` 和 `another_package`，而這兩個套件都依賴 `url_launcher`，但版本不同。這就產生了潛在的衝突。為避免這種情況，最佳做法是套件作者在指定相依套件時，使用[版本範圍][version ranges]而非指定特定版本。

```yaml
dependencies:
  url_launcher: ^5.4.0    # Good, any version >= 5.4.0 but < 6.0.0
  image_picker: '5.4.3'   # Not so good, only version 5.4.3 works.
```

如果 `some_package` 聲明了上述相依套件，
而 `another_package` 聲明了一個相容的
`url_launcher` 相依套件，例如 `'5.4.6'` 或
`^5.5.0`，pub 會自動解決這個問題。
針對 [Gradle modules][Gradle modules] 和／或 [CocoaPods][CocoaPods]
等平台專屬相依套件，也會以類似方式解決。

即使 `some_package` 和 `another_package`
對 `url_launcher` 聲明了不相容的版本，
它們實際上可能以相容的方式使用 `url_launcher`。在這種情況下，
可以透過在應用程式的 `pubspec.yaml` 檔案中
加入相依套件覆寫（dependency override）宣告，強制使用特定版本來解決衝突。

例如，若要強制使用 `url_launcher` 的 `5.4.0` 版本，
請對應用程式的 `pubspec.yaml` 檔案進行以下修改：

```yaml
dependencies:
  some_package:
  another_package:
dependency_overrides:
  url_launcher: '5.4.0'
```

如果產生衝突的相依項目本身不是套件（package），而是像 `guava` 這樣的 Android 專用函式庫，則必須將相依性覆寫（dependency override）宣告新增到 Gradle 的建置邏輯中。

若要強制使用 `guava` 的 `28.0` 版本，請在應用程式的 `android/build.gradle` 檔案中進行以下修改：

```groovy
configurations.all {
    resolutionStrategy {
        force 'com.google.guava:guava:28.0-android'
    }
}
```

CocoaPods 目前尚未提供相依套件覆寫（dependency override）功能。

[CocoaPods]: https://guides.cocoapods.org/syntax/podspec.html#dependency
[Gradle modules]: https://docs.gradle.org/current/userguide/declaring_dependencies.html
[version ranges]: {{site.dart-site}}/tools/pub/dependencies#version-constraints

## 開發新套件

如果目前尚無符合您特定需求的套件，您可以[撰寫自訂套件][write a custom package]。

[write a custom package]: /packages-and-plugins/developing-packages

## 管理套件相依性與版本

為了降低版本衝突的風險，請在 `pubspec.yaml` 檔案中指定版本範圍。

### 套件版本

所有套件都有一個版本號，這個版本號會在套件的 `pubspec.yaml` 檔案中指定。套件的目前版本會顯示在其名稱旁（例如，請參閱 [`url_launcher`][`url_launcher`] 套件），同時也會列出所有先前版本（請參閱 [`url_launcher` versions][`url_launcher` versions]）。

為了確保在更新套件時應用程式不會發生錯誤，請使用下列其中一種格式來指定版本範圍。

* **範圍限制（Ranged constraints）：** 指定最小與最大版本。

  ```yaml
  dependencies:
    url_launcher: '>=5.4.0 <6.0.0'
  ```

* **使用 [caret 語法][caret syntax] 的範圍限制：**
  指定作為包含式最小版本的版本號。
  這會涵蓋從該版本到下一個主版本之間的所有版本。

  ```yaml
  dependencies:
    collection: '^5.4.0'
  ```

  這個語法與第一個項目符號中所提到的語法具有相同的意義。

想了解更多，請參閱 [套件版本管理指南][package versioning guide]。

[caret syntax]: {{site.dart-site}}/tools/pub/dependencies#caret-syntax
[package versioning guide]: {{site.dart-site}}/tools/pub/versioning
[`url_launcher` versions]: {{site.pub-pkg}}/url_launcher/versions

### 更新套件相依性

當你在新增套件後第一次執行 `flutter pub get` 時，
Flutter 會將找到的具體套件版本儲存在 `pubspec.lock`
[lockfile][lockfile] 中。這可確保你或團隊中的其他開發者再次執行 `flutter pub get` 時，
都能取得相同的套件版本。

若要升級至該套件的新版本，
例如想使用該套件的新功能，
請執行 `flutter pub upgrade`，
以取得版本限制條件（在
`pubspec.yaml`
中指定）所允許的最高可用版本。
請注意，這個指令與
`flutter upgrade` 或 `flutter update-packages`
不同，後兩者會更新 Flutter 本身。

[lockfile]: {{site.dart-site}}/tools/pub/glossary#lockfile

### 相依於未發佈的套件

即使套件尚未發佈到 pub.dev，也可以使用這些套件。
對於私有套件或尚未準備好發佈的套件，
還有其他相依性選項可用：

**路徑相依性（Path dependency）**
: Flutter 應用程式可以透過檔案系統的
  `path:` 相依性來依賴某個套件。路徑可以是相對路徑或絕對路徑。
  相對路徑會以包含 `pubspec.yaml` 的目錄為基準進行解析。例如，若要依賴一個與應用程式位於同一層目錄下的套件 packageA，
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
: 如果儲存庫是私有的，且你可以透過 SSH 連線，
  可以使用該儲存庫的 SSH URL 來加入套件相依性：

  ```yaml
    dependencies:
      packageA:
        git:
          url: git@github.com:flutter/packageA.git
  ```

**Git 依賴於資料夾中的套件**
: Pub 預設認為套件位於 Git 儲存庫的根目錄。如果不是這種情況，請使用 `path` 參數來指定位置。例如：

  ```yaml
  dependencies:
    packageA:
      git:
        url: https://github.com/flutter/packages.git
        path: packages/packageA
  ```

  最後，使用 `ref` 參數將相依套件鎖定（pin）到特定的 git commit、分支（branch）或標籤（tag）。更多細節請參閱 [Package dependencies][Package dependencies]。

[Package dependencies]: {{site.dart-site}}/tools/pub/dependencies

## 範例

以下範例將帶你一步步完成使用套件所需的步驟。

### 範例：使用 css_colors 套件 {:#css-example}

[`css_colors`][`css_colors`] 套件
定義了 CSS 顏色的顏色常數，因此你可以在 Flutter 框架需要 `Color` 型別的地方使用這些常數。

要使用此套件，請依下列步驟操作：

1. 建立一個名為 `cssdemo` 的新專案。

1. 開啟 `pubspec.yaml`，並新增 `css-colors` 相依套件：

   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     css_colors: ^1.0.0
   ```

1. 在終端機執行 `flutter pub get`，
   或在 VS Code 中點擊 **Get Packages**。

1. 開啟 `lib/main.dart`，並將其全部內容替換為：

    <?code-excerpt "lib/css_colors.dart (css-colors)"?>
    ```dart
    import 'package:css_colors/css_colors.dart';
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
        return Scaffold(body: Container(color: CSSColors.orange));
      }
    }
    ```

[`css_colors`]: {{site.pub-pkg}}/css_colors

1. 執行應用程式。現在應用程式的背景應該會變成橘色。

### 範例：使用 url_launcher 套件開啟瀏覽器 {:#url-example}

[`url_launcher`][`url_launcher`] 插件套件（plugin package）可在行動平台上開啟預設瀏覽器，顯示指定的 URL，並支援 Android、iOS、Web、Windows、Linux 以及 macOS。
這個套件是一種特殊的 Dart 套件，稱為 _插件套件_（plugin package，或稱 _plugin_），其中包含平台專屬的程式碼。

要使用這個插件，請依下列步驟操作：

1. 建立一個名為 `launchdemo` 的新專案。

1. 開啟 `pubspec.yaml`，並新增 `url_launcher` 相依套件（dependency）：

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

1. 執行應用程式（如果在加入 plugin 之前已經在執行，請先停止再重新啟動）。點擊 **Show Flutter homepage**。你應該會看到預設瀏覽器在裝置上開啟，並顯示 flutter.dev 的首頁。
