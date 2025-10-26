---
title: "Flutter pubspec 選項"
description: "說明 pubspec 檔案中僅限 Flutter 使用的欄位。"
---

本頁面主要針對撰寫 Flutter 應用程式的開發者。如果你是開發套件（package）或外掛（plugin），（例如你想建立一個分層外掛 federated plugin），請參閱 [Developing packages and plugins][Developing packages and plugins] 頁面。

## 概覽

每個 Flutter 專案都包含一個 `pubspec.yaml` 檔案，通常稱為 _pubspec_。當你建立新的 Flutter 專案時，系統會自動產生一個基本的 pubspec。它位於專案樹的最上層，並包含 Dart 與 Flutter 工具所需的專案中繼資料。pubspec 採用 [YAML][YAML] 格式編寫，這是一種易於閱讀的格式，但請注意 _空白字元（Tab 與空格）很重要_。

pubspec 會指定專案所需的相依項目，例如：

+ 特定套件及其版本
+ 字型
+ 圖片
+ 開發用套件（如測試或模擬套件）
+ 對 Flutter SDK 版本的特定限制

Dart 與 Flutter 專案通用的欄位，請參閱 [the pubspec file][the pubspec file]（於 [dart.dev][dart.dev]）。本頁將列出僅適用於 Flutter 專案的 _Flutter 專屬_ 欄位與套件。

[YAML]: https://yaml.org/
[the pubspec file]: {{site.dart-site}}/tools/pub/pubspec
[dart.dev]: {{site.dart-site}}

## 範例

當你使用 `flutter create` 指令（或在你的 IDE 中使用對應按鈕）建立新專案時，系統會為基本的 Flutter 應用程式建立一個 pubspec。

第一次建置專案時，系統也會產生一個 `pubspec.lock` 檔案，裡面記錄了所包含套件的具體版本。這可確保下次建置專案時，取得相同的套件版本。

以下是一個 Flutter 專案 pubspec 檔案的範例。已特別標示出僅限 Flutter 使用的欄位與套件。

```yaml title="pubspec.yaml"
name: <project name>
description: A new Flutter project.

publish_to: none
version: 1.0.0+1

environment:
  sdk: ^3.9.0

dependencies:
  [!flutter:!]       # Required for every Flutter project
    [!sdk: flutter!] # Required for every Flutter project
  [!flutter_localizations:!] # Required to enable localization
    [!sdk: flutter!]         # Required to enable localization

  [!cupertino_icons: ^1.0.8!] # Only required if you use Cupertino (iOS style) icons

dev_dependencies:
  [!flutter_test:!]
    [!sdk: flutter!] # Required for a Flutter project that includes tests

  [!flutter_lints: ^6.0.0!] # Contains a set of recommended lints for Flutter code

[!flutter:!]

  [!uses-material-design: true!] # Required if you use the Material icon font

  [!generate: true!] # Enables generation of localized strings from arb files

  [!config:!] # App-specific configuration flags that mirror `flutter config`
    [!enable-swift-package-manager: true!]

  [!assets:!]  # Lists assets, such as image files
    [!- images/a_dot_burr.png!]
    [!- images/a_dot_ham.png!]

  [!licenses:!] # Lists additional license files to be bundled with the app
    [!- assets/my_license.txt!]

  [!fonts:!]              # Required if your app uses custom fonts
    [!- family: Schyler!]
      [!fonts:!]
        [!- asset: fonts/Schyler-Regular.ttf!]
        [!- asset: fonts/Schyler-Italic.ttf!]
          [!style: italic!]
    [!- family: Trajan Pro!]
      [!fonts:!]
        [!- asset: fonts/TrajanPro.ttf!]
        [!- asset: fonts/TrajanPro_Bold.ttf!]
          [!weight: 700!]
```

## 欄位

Flutter 專屬與 Dart 專屬的欄位可以加入到 Flutter 的 pubspec。若要進一步了解 Flutter 專屬欄位，請參閱下方各節。若要了解 Dart 專屬欄位，請參考 [Dart's pubspec supported fields][Dart's pubspec supported fields]。

:::note
pubspec 可能會包含其他自動產生的 Flutter 欄位，這些欄位未在此列出。
:::

[Dart's pubspec supported fields]: {{site.dart-site}}/tools/pub/pubspec#supported-fields

### assets 欄位 {: #assets }

您的應用程式所使用的資源（assets）路徑清單。這些資源會與您的應用程式一起打包。常見的資源類型包括靜態資料（例如：`JSON`）、設定檔、圖示，以及圖片（`JPEG`、`WebP`、`GIF`、動畫 `WebP/GIF`、`PNG`、`BMP` 和 `WBMP`）。

除了列出應用程式套件中包含的圖片外，圖片資源（image asset）也可以指向一個或多個針對不同解析度的「變體」。如需詳細資訊，請參閱 [resolution aware][resolution aware] 章節以及 [Assets and images][Assets and images] 頁面。  
若需將套件相依性中的資源加入，請參考同一頁的 [asset images in package dependencies][asset images in package dependencies] 章節。

`asset` 欄位的結構如下：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - [ path_to_file | path_to_directory ]
      [ flavor_path_field ]
    [...]
```

```yaml
# path_to_file structure
- path/to/directory/file
```

```yaml
# path_to_directory structure
- path/to/directory/
```

```yaml
# flavor_path_field strucure
- path: path/to/directory
  flavors:
  - flavor_name
```

`assets` 的子欄位：

* `path_to_file`：表示檔案路徑的字串。
* `path_to_directory`：表示目錄路徑的字串。
* `flavor_path_field`：一個路徑欄位及其 flavor 子欄位。
* `path`：目錄的路徑。
* `flavors`：在特定路徑下要搭配資源（Assets）使用的 Flutter flavor 清單。若要進一步了解 flavor，請參閱 [Set up flavors for iOS and macOS] 及 [Set up flavors for Android]。

你可以傳入一個檔案的路徑：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - assets/images/my_image_a.png
    - assets/images/my_image_b.png
```

你可以傳入一個目錄的路徑：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - assets/images/
    - assets/icons/
```

你可以針對特定的 flavor，傳入一個目錄的路徑：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - path: assets/flavor_a_and_b/images
      flavors:
      - flavor_a
      - flavor_b
    - path: assets/flavor_c/images
      flavors:
      - flavor_c
```

[Set up flavors for iOS and macOS]: /deployment/flavors-ios
[Set up flavors for Android]: /deployment/flavors
[Assets and images]: /ui/assets/assets-and-images
[asset images in package dependencies]: /ui/assets/assets-and-images#from-packages
[resolution aware]: /ui/assets/assets-and-images#resolution-aware

### config 欄位 {: #config }

一個由鍵對應至旗標（`true` 或 `false`）的對應表，用於影響 `flutter` 命令列介面（Command Line Interface）的執行方式。

> 注意：此功能僅自
> [#167953]({{site.github}}/flutter/flutter/pull/167953) 起於 `main`
> 頻道提供。

可用的鍵與 `flutter config --list` 中可用的鍵相同。

```yaml title="pubspec.yaml"
flutter:
  config:
    cli-animations: false
    enable-swift-package-manager: true
```

使用 `flutter config --help` 來查看每個旗標（flag）的說明。

旗標僅會從目前的 _應用程式_ 套件中讀取，在套件或相依性（dependency）的情境下不會產生任何效果。

### default-flavor 欄位

為應用程式指定預設的 Flutter flavor。
當設定此欄位後，你在啟動 Flutter 時不需要在命令中額外指定這個 flavor 的名稱。

```yaml title="pubspec.yaml"
flutter:
  default-flavor: flavor_name
```

在以下範例中，一個 Android Flutter 應用程式有名為 `staging` 和 `production` 的 flavor。`production` flavor 是預設的 flavor。當你執行該 flavor 時，不需要在啟動指令中額外指定它。

```yaml title="pubspec.yaml"
flutter:
  default-flavor: production
```

```console title="console"
// Use this command to run the default flavor (production).
flutter run

// Use this command to run non-default flavors (staging).
flutter run --flavor staging
```

若要了解如何建立 Flutter flavors，請參閱[Set up Flutter flavors for Android][Set up Flutter flavors for Android]以及[Set up Flutter flavors for iOS and macOS][Set up Flutter flavors for iOS and macOS]。

[Set up Flutter flavors for Android]: /deployment/flavors
[Set up Flutter flavors for iOS and macOS]: /deployment/flavors-ios

### deferred-components 欄位

可延遲 Android 應用程式的初始下載大小。這通常用於大型應用程式、模組化應用程式，以及具有隨需功能的應用程式。

`deferred-components` 欄位的結構如下：

```yaml title="pubspec.yaml"
flutter:
  deferred-components:
    name: component_name
      libraries:
        - string_expression
        [...]
      assets:
        - string_expression
        [...]
    [...]
```

Deferred component 子欄位：

* `name`：特定 deferred component（延遲元件）的唯一識別碼。
* `libraries`：屬於該 deferred component 的 Dart 程式庫清單。
* `assets`：與該 deferred component 關聯的資源路徑清單。

範例：

```yaml title="pubspec.yaml"
flutter:
  deferred-components:
    - name: box_component
      libraries:
        - package:testdeferredcomponents/box.dart
    - name: gallery_feature
      libraries:
        - package:testdeferredcomponents/gallery_feature.dart
      assets:
        - assets/gallery_images/gallery_feature.png
```

想進一步了解如何在 Flutter Android 應用程式中使用延遲元件（deferred components），請參閱 [Deferred components for Android]。  

[Deferred components for Android]: /perf/deferred-components

### disable-swift-package-manager 欄位

停用 Swift Package Manager（SPM），使其不再管理您的 iOS 與 macOS Flutter 專案中的相依套件。

```yaml title="pubspec.yaml"
flutter:
  disable-swift-package-manager: true
```

> 注意：自 [#168433]({{site.github}}/flutter/flutter/pull/168433) 在 `main` 頻道之後，此屬性已移至 [`config`](#config) 區段：
>
> ```yaml title="pubspec.yaml"
> flutter:
>   config:
>     enable-swift-package-manager: false
> ```

### flutter 欄位

一個包含您應用程式 Flutter 專屬設定的欄位。

```yaml title="pubspec.yaml"
flutter:
  [flutter_field]
  [...]
```

### fonts 欄位 {: #fonts }

在你的 Flutter 應用程式中設定並加入自訂字型（custom fonts）。

關於如何使用字型的範例，請參考 Flutter cookbook 中的 [Use a custom font][Use a custom font] 以及 [Export fonts from a package][Export fonts from a package] 教學。

`fonts` 欄位的結構如下：

```yaml title="pubspec.yaml"
flutter:
  fonts:
    -  { font_family_field | font_asset_field }
    [...]
```

```yaml
# font_family_field structure
- family: font_name
      fonts:
        - font_asset_field
        [...]
```

```yaml
# font_asset_field structure
- asset: path/to/directory/font_name
  weight: int_expression # Optional
  style: string_expression # Optional
```

`fonts` 的子欄位：

+ `family`：可選。字型家族名稱。可以有多個字型資源。
+ `asset`：要使用的字型。
+ `weight`：可選。字型的粗細。可以是 `100`、`200`、`300`、`400`、`500`、`600`、`700`、`800` 或 `900`。
+ `style`：可選。字型的樣式。可以是 `italic`。

使用不屬於字型家族的字型：

```yaml title="pubspec.yaml"
flutter:
  fonts:
    - asset: fonts/Roboto-Regular.ttf
      weight: 900 # Optional
      style: italic # Optional  
```

使用字型家族（font family）：

```yaml title="pubspec.yaml"
flutter:
  fonts:
  - family: Roboto # Optional
        fonts:
          - asset: fonts/Roboto-Regular.ttf
          - asset: fonts/Roboto-Bold.ttf
            weight: 700 # Optional
            style: italic # Optional
```

另外，如果你有一個字型（font）不需要指定 family、weight 或 style 等屬性，你可以將它宣告為一個簡單的資源（asset）：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - fonts/Roboto-Regular.ttf
```

[Export fonts from a package]: /cookbook/design/package-fonts
[Use a custom font]: /cookbook/design/fonts

### generate 欄位

負責處理在地化（localization）相關任務。此欄位可以作為 `flutter` 與 `material` 的子欄位出現。

啟用一般在地化功能：

```yaml title="pubspec.yaml"
flutter:
  generate: true
```

### licenses 欄位 {: #licenses}

一個額外授權檔案路徑的清單，這些檔案會與您的應用程式一起打包。這些檔案通常位於您專案的 `assets` 目錄中。

`licenses` 欄位的結構如下：

```yaml title="pubspec.yaml"
flutter:
  licenses:
    - [path_to_file]
```

### plugin 欄位

針對 Flutter 插件（plugin）進行專屬設定。

`plugin` 欄位的結構如下：

```yaml title="pubspec.yaml"
flutter:
  plugin:
    platforms:
      android: # Optional
        package: com.example.my_plugin
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
      ios: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
        sharedDarwinSource: true
      macos: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
        sharedDarwinSource: true
      windows: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
      linux: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
      web: # Optional
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
    implements: # Optional
      - example_platform_interface
```

`plugin` 的子欄位：

* `platforms`：將會有設定的平臺清單。
* `package`：外掛的 Android 套件名稱。這可用於 Android 平臺，且為必填欄位。
* `pluginClass`：外掛類別名稱。如果同一平臺使用 `dartPluginClass`，則為選填。這可用於 Android、iOS、Linux、macOS 和 Windows 平臺。
* `default_package`：選填。指定應作為平臺介面預設實作的套件。僅適用於聯邦式外掛（federated plugins），即外掛的實作被拆分為多個特定平臺的套件。
* `dartPluginClass`：選填。作為 Flutter 外掛進入點的 Dart 類別。這可用於 Android、iOS、Linux、macOS 和 Windows 平臺。
* `sharedDarwinSource`：選填。表示外掛在 iOS 和 macOS 之間共用原生程式碼。這可用於 iOS 和 macOS 平臺。
* `fileName`：選填。包含外掛類別的檔案。
* `ffiPlugin`：選填。如果外掛使用 Foreign Function Interface (FFI)，則為 true。
* `implements`：選填。Flutter 外掛所實作的平臺介面。

如需進一步瞭解外掛，請參閱
[Developing packages & plugins][Developing packages & plugins]。

[Developing packages & plugins]: /packages-and-plugins/developing-packages

### shaders 欄位

具有 `FRAG` 副檔名的 GLSL 著色器（shaders），必須在專案的 `pubspec.yaml` 檔案的 shaders 區段中宣告。
Flutter 命令列工具會將著色器編譯為對應後端格式，並產生必要的執行時中繼資料。編譯後的著色器會像資源一樣被包含在應用程式中。

`shaders` 欄位的結構如下：

```yaml title="pubspec.yaml"
flutter:
  shaders:
    -  { path_to_file | path_to_directory }
    [...]
```

```yaml
# path_to_file structure
- assets/shaders/file
```

```yaml
# path_to_directory structure
- assets/shaders/
```

新增特定著色器（shaders）：

```yaml title="pubspec.yaml"
flutter:
  shaders:
    - assets/shaders/shader_a.frag
    - assets/shaders/shader_b.frag
```

新增一個著色器（shaders）目錄：

```yaml title="pubspec.yaml"
flutter:
  shaders:
    - assets/shaders/
```

或者，你也可以將你的著色器目錄加入`assets`欄位中：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - assets/shaders/my_shader.frag
```

### uses-material-design 欄位

在您的 Flutter 應用程式中使用 Material Design 元件 (Material components)。

```yaml title="pubspec.yaml"
flutter:
  uses-material-design: true
```

## 套件（Packages）

以下是可加入至 pubspec 的 Flutter 專用套件。如果你新增了套件，請在終端機執行 `flutter pub get` 來安裝該套件。

### flutter 套件

這是一個代表 Flutter SDK（Flutter 軟體開發套件）本身的套件，可以加入至 `dependencies` 欄位。如果你的專案依賴於 Flutter SDK，而不是來自 pub.dev 的一般套件，請使用此選項。

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
```

### flutter_localizations 套件

這是一個代表 Flutter SDK（Flutter 軟體開發套件）本身的套件，可以加入到 `dependencies` 欄位中。使用此套件可啟用 `ARB` 檔案的在地化功能。通常會與 `intl` 套件搭配使用。

```yaml title="pubspec.yaml"
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any
```

### flutter_test 套件

這是一個代表 Flutter SDK（Flutter 軟體開發套件）本身的套件，可以加入到 `dependencies` 欄位中。如果你的 Flutter 應用程式有單元測試、元件 (Widgets) 測試或整合測試，請使用這個套件。

```yaml title="pubspec.yaml"
dependencies:
  flutter_test:
    sdk: flutter
```

### flutter_lints 套件

一個為 Flutter 專案提供建議檢查（lints）規則的套件。你可以將此套件加入 pubspec 的 `dev_dependency` 欄位中。

```yaml title="pubspec.yaml"
dev_dependencies:
  flutter_lints: ^6.0.0
```

### cupertino_icons

這是一個提供 Apple 的 Cupertino 圖示（Cupertino icons）套件，可用於 Flutter 應用程式中。你可以將此套件新增至 pubspec 的 `dependency` 欄位中。

```yaml title="pubspec.yaml"
dependencies:
  cupertino_icons: ^1.0.0
```

## 更多資訊

如需有關套件（packages）、外掛（plugins）及 pubspec 檔案的更多資訊，請參考以下內容：

* [Creating packages][Creating packages]（在 dart.dev 上）
* [Glossary of package terms][Glossary of package terms]（在 dart.dev 上）
* [Package dependencies][Package dependencies]（在 dart.dev 上）
* [Using packages][Using packages]
* [What not to commit][What not to commit]（在 dart.dev 上）

[Creating packages]: {{site.dart-site}}/guides/libraries/create-library-packages
[Developing packages and plugins]: /packages-and-plugins/developing-packages
[Federated plugins]: /packages-and-plugins/developing-packages#federated-plugins
[Glossary of package terms]: {{site.dart-site}}/tools/pub/glossary
[Package dependencies]: {{site.dart-site}}/tools/pub/dependencies
[Using packages]: /packages-and-plugins/using-packages
[What not to commit]: {{site.dart-site}}/guides/libraries/private-files#pubspeclock
