---
title: "Flutter pubspec 選項"
description: "說明 pubspec 檔案中僅限 Flutter 使用的欄位。"
---

每個以 Dart 語言撰寫的專案，包括所有 Flutter 應用程式與程式庫，都包含一個 `pubspec.yaml` 檔案，稱為 _pubspec_。建立新專案時，系統會在專案樹的最上層產生一個基本的 pubspec，其中包含中繼資料並列出專案的相依套件。

**Dart 與 Flutter 專案都通用的欄位，請參考 dart.dev 上的 [pubspec 檔案][pubspec]。**
本頁列出僅適用於 Flutter 專案的欄位。

[Package dependency management]: /packages-and-plugins/dependency-management
[pubspec]: {{site.dart-site}}/tools/pub/pubspec

## 範例

當你使用 `flutter create` 指令（或在你的 IDE 中使用對應的按鈕）建立新專案時，系統會為基本的 Flutter 應用程式建立一個 pubspec。

第一次建置專案時，系統也會建立一個 `pubspec.lock` 檔案，裡面記錄了所包含套件的特定版本。這可確保下次建置專案時，取得相同的套件版本。
若想進一步了解 Flutter 與 Dart 如何解析套件相依性，請參閱 [Package dependency management][]。

以下的 pubspec 檔案範例標示出僅在 Flutter 應用程式中使用的欄位。
其他未標示的欄位，請參閱 [dart.dev][pubspec]。

```yaml title="pubspec.yaml"
name: <project name>
description: A new Flutter project.

publish_to: 'none'  # Remove this line if you wish to publish to pub.dev
version: 1.0.0+1

environment:
  sdk: ^3.13.0

dependencies:
  [!flutter:!]       # Required for every Flutter project
    [!sdk: flutter!] # Required for every Flutter project
  [!flutter_localizations:!] # Required to enable localization
    [!sdk: flutter!]         # Required to enable localization

  [!material_ui!]    # Required for projects that use the Material components pkg
  [!cupertino_ui!]   # Required for projects that use the Cupertino components pkg
  [!cupertino_icons: ^1.0.8!] # Only required if you use Cupertino (iOS style) icons

dev_dependencies:
  [!flutter_test:!]
    [!sdk: flutter!] # Required for a Flutter project that includes tests
  [!integration_test:!]
    [!sdk: flutter!] # Required for integration tests

  [!flutter_lints: ^6.0.0!] # Contains a set of recommended lints for Flutter code

[!flutter:!]

  [!uses-material-design: true!] # Required if you use the Material icon font

  [!generate: true!] # Enables generation of localized strings from arb files

  [!config:!] # App-specific configuration flags that mirror `flutter config`
    [!enable-swift-package-manager: true!]

  [!assets:!]  # Lists assets, such as image files
    [!- images/a_dot_burr.jpeg!]
    [!- images/a_dot_ham.jpeg!]

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

本頁討論僅限 Flutter 使用的 pubspec 欄位。
若想了解一般的 Dart 欄位，請參閱 [Dart's pubspec supported fields][Dart's pubspec supported fields]。

:::note
pubspec 可能會包含這裡未列出的其他自動產生的 Flutter 欄位。
:::

[Dart's pubspec supported fields]: {{site.dart-site}}/tools/pub/pubspec#supported-fields

### assets 欄位 {: #assets }

您的應用程式所使用的資源（assets）路徑清單。這些資源會與您的應用程式一起打包。常見的資源類型包括靜態資料（例如：`JSON`）、設定檔、圖示，以及圖片（`JPEG`、`WebP`、`GIF`、動畫 `WebP/GIF`、`PNG`、`BMP` 及 `WBMP`）。

除了列出包含於應用程式套件中的圖片外，圖片資源也可以指向一個或多個針對不同解析度的「變體」。如需更多資訊，請造訪 [resolution aware][resolution aware] 章節以及 [Assets and images][Assets and images] 頁面。
若要了解如何從套件相依性中加入資源，請造訪同一頁的 [asset images in package dependencies][asset images in package dependencies] 章節。

`assets` 欄位的結構如下：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - [ path_to_file | path_to_directory ]
      [ flavor_path_field | platform_path_field | transformer_path_field ]
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
# flavor_path_field structure
- path: path/to/directory
  flavors:
    - flavor_name
```

```yaml
# platform_path_field structure
- path: path/to/file
  platforms:
    - platform_name
```

```yaml
# transformer_path_field structure
- path: path/to/file
  transformers:
    - package: transformer_package_name
      args: ['arg1', 'arg2'] # Optional
```

`assets` 的子欄位：

* `path_to_file`：代表檔案路徑的字串。
* `path_to_directory`：代表目錄路徑的字串。
* `flavor_path_field`：一個路徑欄位及其 flavor 子欄位。
* `platform_path_field`：一個路徑欄位及其平台子欄位。
* `transformer_path_field`：一個路徑欄位及其轉換器（transformer）子欄位。
* `path`：資源檔案或目錄的路徑。
* `flavors`：在特定路徑下要搭配資源（assets）使用的 Flutter flavor 清單。若要進一步了解 flavor，請參閱設定 flavor 的指南：[Android][]、[iOS and macOS][]、[Linux][] 與 [Windows][]。
* `platforms`：在特定路徑下要搭配資源使用的平台清單。有效值為 `android`、`ios`、`web`、`linux`、`macos` 及 `windows`。
* `transformers`：在建置時要對資源執行的轉換器套件清單。若要進一步了解，請參閱 [Transforming assets at build time][]。

你可以傳入檔案的路徑：

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

你可以針對特定的 flavor 傳入一個目錄的路徑：

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

你可以針對特定平台傳入一個檔案的路徑：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - path: assets/web_worker.js
      platforms:
        - web
    - path: assets/desktop_icon.png
      platforms:
        - windows
        - linux
        - macos
```

你可以設定建置時的資源轉換器：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - path: assets/logo.svg
      transformers:
        - package: vector_graphics_compiler
          args: ['--tessellate']
```

[Android]: /deployment/flavors
[iOS and macOS]: /deployment/flavors-ios
[Linux]: /deployment/flavors-linux
[Windows]: /deployment/flavors-windows
[Transforming assets at build time]: /ui/assets/asset-transformation
[Assets and images]: /ui/assets/assets-and-images
[asset images in package dependencies]: /ui/assets/assets-and-images#from-packages
[resolution aware]: /ui/assets/assets-and-images#resolution-aware

### config 欄位 {: #config }

這是一個鍵值對應的 map，將鍵對應到旗標（`true` 或 `false`），用來影響 `flutter` 命令列介面（Command Line Interface）的執行方式。

可用的鍵與 `flutter config --list` 中可用的鍵相同。

```yaml title="pubspec.yaml"
flutter:
  config:
    cli-animations: false
```

使用 `flutter config --help` 來查看每個 flag 的說明。

flag 只會從目前的 _應用程式_ 套件中讀取，在套件或相依套件的情境下不會產生任何效果。

<a id="disable-swift-package-manager-field" aria-hidden="true"></a>

#### enable-swift-package-manager 欄位 {: #enable-swift-package-manager }

控制 Flutter 是否使用 Swift Package Manager 來管理此專案的原生 iOS 與 macOS 相依性。
若要在此專案中停用，請將此欄位設為 `false`。

```yaml title="pubspec.yaml"
flutter:
  config:
    enable-swift-package-manager: false
```

:::version-note
在 3.44 之前的 Flutter 版本中，
Swift Package Manager 預設並未啟用。

停用 Swift Package Manager 的支援將在未來的 Flutter 版本中移除。
若想開始使用 Swift Package Manager，請參閱
[Swift Package Manager for app developers][] 或
[Swift Package Manager for plugin authors][]。
:::

[Swift Package Manager for app developers]: /packages-and-plugins/swift-package-manager/for-app-developers
[Swift Package Manager for plugin authors]: /packages-and-plugins/swift-package-manager/for-plugin-authors

### default-flavor 欄位 {: #default-flavor }

為應用程式指定預設的 Flutter flavor。
當設定此欄位後，在啟動 Flutter 時就不需要在指令中額外包含這個 flavor 的名稱。

```yaml title="pubspec.yaml"
flutter:
  default-flavor: flavor_name
```

在以下範例中，一個 Android Flutter 應用程式有名為 `staging` 和 `production` 的 flavor。`production` flavor 是預設的 flavor。當執行該 flavor 時，你不需要在啟動指令中額外指定它。

```yaml title="pubspec.yaml"
flutter:
  default-flavor: production
```

```console title="console"
# Use this command to run the default flavor (production).
$ flutter run

# Use this command to run non-default flavors (staging).
$ flutter run --flavor staging
```

若要學習如何建立 Flutter flavors，請參閱設定 flavor 的指南：
[Android][]、[iOS and macOS][]、[Linux][] 與 [Windows][]。

### deferred-components 欄位 {: #deferred-components }

延後下載元件，以縮減 Android 應用程式的初始下載大小。這通常用於大型應用程式、模組化應用程式，以及具有隨需功能的應用程式。

`deferred-components` 欄位的結構如下：

```yaml title="pubspec.yaml"
flutter:
  deferred-components:
    - name: component_name
      libraries:
        - string_expression
        [...]
      assets:
        - string_expression
        [...]
    [...]
```

延遲元件（deferred component）子欄位：

* `name`：特定延遲元件的唯一識別碼。
* `libraries`：屬於該延遲元件的 Dart 程式庫清單。
* `assets`：與該延遲元件相關聯的資源（assets）路徑清單。

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

若要進一步了解如何在 Flutter Android 應用程式中使用延遲元件（deferred components），請參閱
[Deferred components for Android]。

[Deferred components for Android]: /perf/deferred-components

### flutter 欄位 {: #flutter }

一個包含 Flutter 專屬設定的欄位，適用於您的應用程式。

```yaml title="pubspec.yaml"
flutter:
  [flutter_field]
  [...]
```

### fonts 欄位 {: #fonts }

在你的 Flutter 應用程式中設定並加入自訂字型（custom fonts）。

關於使用字型的範例，請造訪 Flutter cookbook 中的 [Use a custom font][Use a custom font] 以及 [Export fonts from a package][Export fonts from a package] 教學。

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

+ `family`：選填。字型家族名稱。可以包含多個字型資源。
+ `asset`：要使用的字型。
+ `weight`：選填。字型的粗細。可以是 `100`、`200`、`300`、`400`、`500`、`600`、`700`、`800` 或 `900`。
+ `style`：選填。字型的樣式。可以是 `italic`。

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

或者，如果你有一個字型（font）不需要指定 family、weight 或 style，你可以將它作為一個簡單的資源（asset）宣告：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - fonts/Roboto-Regular.ttf
```

[Export fonts from a package]: /cookbook/design/package-fonts
[Use a custom font]: /cookbook/design/fonts

### generate 欄位 {: #generate }

啟用從 `.arb` 檔案產生包含在地化字串的 Dart 檔案。

啟用一般在地化功能：

```yaml title="pubspec.yaml"
flutter:
  generate: true
```

若想進一步了解，請造訪 [Internationalizing Flutter apps][]。

[Internationalizing Flutter apps]: /ui/accessibility-and-internationalization/internationalization

### licenses 欄位 {: #licenses }

一個額外授權檔案路徑的清單，這些檔案會與您的應用程式一起打包。這些檔案通常位於您專案的 `assets` 目錄中。

`licenses` 欄位的結構如下：

```yaml title="pubspec.yaml"
flutter:
  licenses:
    - [path_to_file]
```

### module 欄位 {: #module }

在將 Flutter 加入既有的 Android 或 iOS 宿主應用程式（Add-to-App）時，設定 Flutter module 專案的相關設定。

`module` 欄位的結構如下：

```yaml title="pubspec.yaml"
flutter:
  module:
    androidPackage: com.example.my_module # Optional
    iosBundleIdentifier: com.example.myModule # Optional
```

`module` 的子欄位：

* `androidX`：選填。指定此 module 是否使用 AndroidX。
* `androidPackage`：選填。用於產生的 Android 程式碼的套件名稱。
* `iosBundleIdentifier`：選填。用於產生的 iOS 程式碼的 bundle identifier。

若想進一步了解，請造訪 [Add Flutter to existing apps][]。

[Add Flutter to existing apps]: /add-to-app

### plugin 欄位 {: #plugin }

專門用於設定 Flutter 外掛（plugin）的相關設定。

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

* `platforms`：將會有設定值的平台清單。
* `package`：外掛的 Android 套件名稱。這可用於 Android 平台，且為必填欄位。
* `pluginClass`：外掛類別名稱。如果同一平台有使用 `dartPluginClass`，則為選填。這可用於 Android、iOS、Linux、macOS 和 Windows 平台。
* `default_package`：選填。指定作為平台介面預設實作的套件。僅適用於聯邦式外掛（federated plugins），即外掛的實作分為多個特定平台的套件時。
* `dartPluginClass`：選填。作為 Flutter 外掛進入點的 Dart 類別。這可用於 Android、iOS、Linux、macOS 和 Windows 平台。
* `sharedDarwinSource`：選填。表示該外掛在 iOS 與 macOS 之間共用原生程式碼。這可用於 iOS 和 macOS 平台。
* `fileName`：選填。包含外掛類別的檔案。
* `ffiPlugin`：選填。如果外掛使用 Foreign Function Interface (FFI)，則為 true。
* `implements`：選填。Flutter 外掛所實作的平台介面。

如需進一步了解外掛，請參閱
[Developing packages & plugins][Developing packages & plugins]。

[Developing packages & plugins]: /packages-and-plugins/developing-packages

### shaders 欄位 {: #shaders }

具有 `.frag` 副檔名的 GLSL 著色器（shaders），必須在專案的 `pubspec.yaml` 檔案的 `shaders` 區段中宣告。
Flutter 命令列工具會將著色器編譯為對應後端格式並產生必要的執行時中繼資料。編譯後的著色器會像資源（asset）一樣被包含在應用程式中。

`shaders` 欄位接受個別檔案路徑的清單，不支援目錄路徑。
此欄位的結構如下：

```yaml title="pubspec.yaml"
flutter:
  shaders:
    - [path_to_file]
    [...]
```

例如，要在專案中新增特定著色器：

```yaml title="pubspec.yaml"
flutter:
  shaders:
    - assets/shaders/shader_a.frag
    - assets/shaders/shader_b.frag
```

請勿將著色器檔案列在 `assets` 欄位下，無論是直接列出或透過包含它們的目錄。
如果著色器同時在兩處宣告，Flutter 工具會回報錯誤。

與其他資源一樣，著色器也支援 `flavors`、`platforms` 與 `transformers`。

若想進一步了解如何在 Flutter 中使用著色器，請參閱
[Writing and using fragment shaders][]。

[Writing and using fragment shaders]: /ui/design/graphics/fragment-shaders

### uses-material-design 欄位 {: #uses-material-design }

在您的 Flutter 應用程式中使用 Material Design 元件 (Material components) 與圖示字型。

```yaml title="pubspec.yaml"
flutter:
  uses-material-design: true
```

## 套件（Packages）

以下這些 Flutter 專用套件可以加入到 pubspec 中。如果你新增了套件，請在終端機執行 `flutter pub get` 來安裝該套件。

### flutter 套件 {: #flutter-package }

這是一個代表 Flutter SDK（Flutter 軟體開發套件）本身的套件，可以加入到 `dependencies` 欄位。如果你的專案依賴於 Flutter SDK，而不是來自 pub.dev 的一般套件，請使用這個設定。

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
```

### flutter_localizations 套件 {: #flutter-localizations }

由 Flutter SDK 提供的套件，可啟用 `ARB` 檔案的在地化功能。通常會與 `intl` 套件搭配使用。

```yaml title="pubspec.yaml"
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any
```

### flutter_test 套件 {: #flutter_test }

由 Flutter SDK 提供的套件，包含用於 Flutter 應用程式單元測試與元件（Widget）測試的測試工具。

```yaml title="pubspec.yaml"
dev_dependencies:
  flutter_test:
    sdk: flutter
```

### integration_test 套件 {: #integration_test }

由 Flutter SDK 提供的套件，用於在目標裝置或模擬器上執行整合測試。

```yaml title="pubspec.yaml"
dev_dependencies:
  integration_test:
    sdk: flutter
```

若想進一步了解，請造訪 [Integration testing][]。

[Integration testing]: /testing/integration-tests

### flutter_lints 套件 {: #flutter_lints }

一個為 Flutter 專案提供建議檢查規則（lints）集合的套件。你可以將此套件加入 pubspec 的 `dev_dependencies` 欄位中。

```yaml title="pubspec.yaml"
dev_dependencies:
  flutter_lints: ^6.0.0
```

### cupertino_icons 套件 {: #cupertino_icons }

這是一個提供 Apple 的 Cupertino 圖示（icons）套件，可用於 Flutter 應用程式中。你可以將此套件加入到 pubspec 的 `dependencies` 欄位中。

```yaml title="pubspec.yaml"
dependencies:
  cupertino_icons: ^1.0.8
```

## 更多資訊

若需瞭解有關套件（packages）、外掛（plugins）及 pubspec 檔案的更多資訊，請造訪以下內容：

* [Add Flutter to existing apps][]
* [Creating packages][Creating packages]（在 dart.dev 上）
* [Glossary of package terms][Glossary of package terms]（在 dart.dev 上）
* [Integration testing][]
* [Package dependency management][]
* [Package dependencies][Package dependencies]（在 dart.dev 上）
* [設定 Android 的 Flutter flavors][Android]
* [設定 iOS 與 macOS 的 Flutter flavors][iOS and macOS]
* [設定 Linux 的 Flutter flavors][Linux]
* [設定 Windows 的 Flutter flavors][Windows]
* [Transforming assets at build time][]
* [Using packages][Using packages]
* [What not to commit][What not to commit]（在 dart.dev 上）

[Creating packages]: {{site.dart-site}}/guides/libraries/create-library-packages
[Developing packages and plugins]: /packages-and-plugins/developing-packages
[Federated plugins]: /packages-and-plugins/developing-packages#federated-plugins
[Glossary of package terms]: {{site.dart-site}}/tools/pub/glossary
[Package dependencies]: {{site.dart-site}}/tools/pub/dependencies
[Using packages]: /packages-and-plugins/using-packages
[What not to commit]: {{site.dart-site}}/guides/libraries/private-files#pubspeclock
