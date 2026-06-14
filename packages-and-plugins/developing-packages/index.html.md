# 開發套件與插件

> 如何為 Flutter 撰寫套件與插件。



## 套件簡介

套件（Packages）讓你能夠建立可輕鬆分享的模組化程式碼。
一個最小的套件包含以下內容：

**`pubspec.yaml`**
: 一個中繼資料檔案，用於宣告套件名稱、版本、作者等資訊。

**`lib`**
: `lib` 目錄包含套件中的公開程式碼，最少需有一個 `<package-name>.dart` 檔案。

:::note
想了解撰寫高效插件時的注意事項，請參考 Mehmet Fidanboylu 的 Medium 文章
[Writing a good plugin][]。
:::

### 套件類型 {:#types}

套件可以包含多種類型的內容：

**Dart 套件**
: 一般以 Dart 撰寫的套件，例如 [`path`][] 套件。
  其中有些可能包含 Flutter 專屬功能，因此會依賴 Flutter 框架，只能在 Flutter 使用，
  例如 [`fluro`][] 套件。

**插件套件（Plugin packages）**
: 一種特殊的 Dart 套件，包含以 Dart 程式碼撰寫的 API，並結合一個或多個平台專屬的實作。

  插件套件可以針對 Android（使用 Kotlin 或 Java）、iOS（使用 Swift 或 Objective-C）、Web、macOS、Windows 或 Linux，或其任意組合進行開發。

  一個具體範例是 [`url_launcher`][] 插件套件。
  若想了解如何使用 `url_launcher` 套件，以及它如何擴充支援 Web，
  請參考 Harry Terkelsen 的 Medium 文章
  [How to Write a Flutter Web Plugin, Part 1][]。

**FFI 套件（FFI packages）**
: 一種特殊的 Dart 套件，可使用 `dart:ffi` 呼叫原生程式碼。
  這類套件可在 Dart 獨立環境中運作，不需要作業系統專屬的建置檔案。
  建立方式是使用 `flutter create --template=package_ffi` 指令（請參閱
  [建立 FFI 套件][bind-native]）。
  自 Flutter 3.38 起，這是建置和封裝原生程式碼的建議做法。

## 開發 Dart 套件 {:#dart}

以下說明如何撰寫 Flutter 套件。

### 步驟 1：建立套件

要建立一個入門的 Flutter 套件，
請在 `flutter create` 指令中加入 `--template=package` 旗標：

```console
$ flutter create --template=package hello
```

這會在 `hello` 資料夾中建立一個套件專案，內容如下：

**LICENSE**
: 一個（大多為空白的）授權條款文字檔。

**test/hello_test.dart**
: 此套件的[單元測試][unit tests]。

**hello.iml**
: IntelliJ IDE 所使用的設定檔。

**.gitignore**
: 一個隱藏檔案，用於告訴 Git 在專案中應忽略哪些檔案或資料夾。

**.metadata**
: 一個隱藏檔案，供 IDE 用來追蹤 Flutter 專案的屬性。

**pubspec.yaml**
: 一個 yaml 格式的設定檔，包含指定套件相依性的中繼資料。由 pub 工具使用。

**README.md**
: 一個起始用的 markdown 檔案，簡要描述套件的用途。

**lib/hello.dart**
: 一個起始應用程式，內含此套件的 Dart 程式碼。

**.idea/modules.xml**, **.idea/workspace.xml**
: 一個隱藏資料夾，內含 IntelliJ IDE 的設定檔。

**CHANGELOG.md**
: 一個（大多為空白的）markdown 檔案，用於追蹤套件的版本變更。

### 步驟 2：實作套件

對於純 Dart 套件，只需將功能加入主要的 `lib/<package name>.dart` 檔案，
或是放在 `lib` 目錄下的多個檔案中。

若要測試套件，請在 `test` 目錄中新增[單元測試][unit tests]。

關於如何組織套件內容的更多細節，請參閱 [Dart library package][] 文件。

## 開發插件套件 {:#plugin}

如果你想開發一個能呼叫平台專屬 API 的套件，你需要開發一個插件套件（plugin package）。

API 會透過[平台通道 (platform channel)][platform channel]連接到平台專屬的實作。

### 聯邦式插件（Federated plugins）

**聯邦式插件**是一種將插件 API 拆分為平台介面、該介面的各平台獨立實作，以及使用目前執行平台已註冊實作的面向應用程式介面的方式。

**套件分離的聯邦式插件**是指平台介面、平台實作與面向應用程式介面都各自分成獨立 Dart 套件的聯邦式插件。

因此，套件分離的聯邦式插件可以針對 iOS 使用一個套件、Android 使用另一個套件、Web 使用另一個套件，甚至針對車用裝置（作為 IoT 裝置的範例）再用另一個套件。這種方式的好處之一，是讓領域專家可以擴充現有插件，讓其支援自己最熟悉的平台。

一個聯邦式插件需要以下幾個部分：

**面向應用程式的介面（app-facing interface）**
: 插件使用者在使用插件時所互動的介面。此介面定義 Flutter 應用程式所使用的 API。
  在套件分離的聯邦式插件中，這是插件使用者為了使用插件而依賴的套件。

**平台實作（platform implementation(s)）**
: 一個或多個包含平台專屬實作程式碼的套件。面向應用程式的介面會呼叫這些實作——在套件分離的情況下，除非它們包含最終使用者可存取的平台專屬功能，否則不會在應用程式中直接使用或被依賴。

**平台介面（platform interface）**
: 將面向應用程式的介面與平台實作連接起來的介面。此介面宣告任何平台實作都必須實作的規格，以支援面向應用程式的介面。有一個獨立套件來定義此介面，可以確保所有平台套件都以一致的方式實作相同功能。

#### 被認可的聯邦式插件（Endorsed federated plugin）

理想情況下，當你為套件分離的聯邦式插件新增一個平台實作時，應與套件作者協調，將你的實作納入。這樣，原始作者就會_認可（endorse）_你的實作。

例如，假設你為（假想的）`foobar` 插件撰寫了一個 `foobar_windows` 實作。
在被認可的插件中，原始 `foobar` 作者會將你的 Windows 實作作為相依性，
加入到面向應用程式的套件的 pubspec 檔案中。
如此一來，當開發者在他們的 Flutter 應用程式中加入 `foobar` 插件時，
Windows 實作以及其他被認可的實作就會自動對應用程式可用。

#### 未被認可的聯邦式插件（Non-endorsed federated plugin）

如果因任何原因，你無法讓原始插件作者將你的實作納入，那麼你的插件就_不_被認可。開發者仍然可以使用你的實作，但必須手動將該插件加入應用程式的 `pubspec.yaml` 檔案中：

```yaml
dependencies:
  foobar: ^1.0.0
  foobar_windows: ^1.0.0 # Non-endorsed plugin implementation
```

這種方法同樣適用於覆寫已經被認可（endorsed）的 `foobar` 插件實作。

如需進一步了解聯邦式插件、其用途，以及如何實作，請參考 Harry Terkelsen 在 Medium 上的文章：[How To Write a Flutter Web Plugin, Part 2][]。

### 指定插件支援的平台 {:#plugin-platforms}

插件可以透過在 `pubspec.yaml` 檔案中的 `platforms` 對映（map）新增鍵值來指定其支援的平台。例如，以下的 pubspec 檔案顯示了 `hello` 插件的 `flutter:` 對映，該插件僅支援 iOS 和 Android：

```yaml
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin
```

當你要為更多平台新增插件實作時，應相應地更新 `platforms` 對應表（map）。例如，以下是在 pubspec 檔案中，為 `hello` 插件新增 macOS 和 web 支援後的對應表內容：

```yaml
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin
      macos:
        pluginClass: HelloPlugin
      web:
        pluginClass: HelloPlugin
        fileName: hello_web.dart
```

#### 聯邦式平台套件（Federated platform packages）

平台套件（platform package）使用相同的格式，
但會包含一個 `implements` 項目，指出
它實作的是哪一個面向應用程式的套件（app-facing package）。例如，
一個包含 `hello` 的 Windows 實作的 `hello_windows` 插件，
其 `flutter:` 對應表會如下所示：

```yaml
flutter:
  plugin:
    implements: hello
    platforms:
      windows:
        pluginClass: HelloPlugin
```

#### 受認可的實作（Endorsed implementations）

面向應用程式的套件（app facing package）可以透過新增對平台套件的相依性，並在 `platforms:` 對映（map）中將其作為 `default_package` 來納入，以此認可（endorse）某個平台套件。如果上述的 `hello` 插件認可了 `hello_windows`，其寫法如下：


```yaml
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin
      windows:
        default_package: hello_windows

dependencies:
  hello_windows: ^1.0.0
```

請注意，如下所示，一個面向應用程式的套件（app-facing package）可以在套件內部實作部分平台，其他平台則透過被認可（endorsed）的聯邦式實作（federated implementations）來實現。

#### iOS 與 macOS 共用實作

許多框架同時支援 iOS 和 macOS，且其 API 完全相同或大致相同，因此可以使用相同的程式碼庫為 iOS 和 macOS 實作某些插件（plugin）。通常，每個平台的實作會放在各自的資料夾中，但透過 `sharedDarwinSource` 選項，可以讓 iOS 和 macOS 共用同一個資料夾：


```yaml
flutter:
  plugin:
    platforms:
      ios:
        pluginClass: HelloPlugin
        sharedDarwinSource: true
      macos:
        pluginClass: HelloPlugin
        sharedDarwinSource: true

environment:
  sdk: ^3.0.0
  # Flutter versions prior to 3.7 did not support the
  # sharedDarwinSource option.
  flutter: ">=3.7.0"
```

當啟用 `sharedDarwinSource` 時，iOS 不再使用 `ios` 目錄，macOS 也不再使用 `macos` 目錄，這兩個平台會改為共用一個 `darwin` 目錄來存放所有程式碼與資源。啟用此選項時，你需要將現有的檔案從 `ios` 和 `macos` 移動到這個共用目錄。你也需要更新 podspec 檔案，為兩個平台設定相依套件與部署目標，例如：

```ruby
  s.ios.dependency 'Flutter'
  s.osx.dependency 'FlutterMacOS'
  s.ios.deployment_target = '13.0'
  s.osx.deployment_target = '10.15'
```

### 步驟 1：建立套件

要建立一個插件套件，請使用 `--template=plugin` 旗標搭配 `flutter create`。

使用 `--platforms=` 選項，後接以逗號分隔的平台清單，以指定該插件支援的平台。可用的平台有：`android`、`ios`、`web`、`linux`、`macos` 和 `windows`。如果未指定任何平台，則產生的專案將不支援任何平台。

使用 `--org` 選項來指定你的組織，格式採用反向網域名稱（reverse domain name）表示法。此值會用於產生的插件程式碼中的各種套件與 bundle 識別碼。

預設情況下，插件專案會使用 Swift 作為 iOS 程式碼，Kotlin 作為 Android 程式碼。如果你偏好使用 Objective-C 或 Java，可以分別透過 `-i` 指定 iOS 語言，以及 `-a` 指定 Android 語言。
請選擇下列**其中一項**：

```console
$ flutter create --org com.example --template=plugin --platforms=android,ios,linux,macos,windows -a kotlin hello
```
```console
$ flutter create --org com.example --template=plugin --platforms=android,ios,linux,macos,windows -a java hello
```
```console
$ flutter create --org com.example --template=plugin --platforms=android,ios,linux,macos,windows -i objc hello
```
```console
$ flutter create --org com.example --template=plugin --platforms=android,ios,linux,macos,windows -i swift hello
```

這會在 `hello` 資料夾中建立一個插件專案，
並包含以下專屬內容：

**`lib/hello.dart`**
: 插件的 Dart API。

**`android/src/main/java/com/example/hello/HelloPlugin.kt`**
: 以 Kotlin 撰寫的 Android 平台專屬插件 API 實作。

**`ios/Classes/HelloPlugin.m`**
: 以 Objective-C 撰寫的 iOS 平台專屬插件 API 實作。

**`example/`**
: 一個依賴此插件的 Flutter 應用程式，
  並展示如何使用它。

### 步驟 2：實作套件 {:#edit-plugin-package}

由於插件套件包含多個平台、以多種程式語言撰寫的程式碼，
因此需要一些特定步驟來確保開發流程順暢。

#### 步驟 2a：定義套件 API（.dart）

插件套件的 API 是以 Dart 程式碼定義的。
請在你喜愛的 [Flutter 編輯器][Flutter editor] 中開啟主要的 `hello/` 資料夾。
找到 `lib/hello.dart` 檔案。

#### 步驟 2b：新增 Android 平台程式碼（.kt/.java）

我們建議你使用 Android Studio 編輯 Android 程式碼。

在 Android Studio 編輯 Android 平台程式碼之前，
請先確保程式碼已經至少建置過一次
（換句話說，請從你的 IDE/編輯器執行範例應用程式，
或在終端機執行：

```console
cd hello/example; flutter build apk --config-only
```

然後請依照以下步驟操作：

1. 啟動 Android Studio。
1. 在 **Welcome to Android Studio** 對話框中選擇 **Open an existing Android Studio Project**，
   或從選單選擇 **File > Open**，
   並選取 `hello/example/android/build.gradle`
   或 `hello/example/android/build.gradle.kts` 檔案。
1. 在 **Gradle Sync** 對話框中，選擇 **OK**。
1. 在 **Android Gradle Plugin Update** 對話框中，
   選擇 **Don't remind me again for this project**。

你的插件的 Android 平台程式碼位於
`hello/java/com.example.hello/HelloPlugin`。

你可以在 Android Studio 中按下執行（&#9654;）按鈕來執行範例應用程式。

#### 步驟 2c：新增 iOS 平台程式碼（.swift/.h+.m）

我們建議你使用 Xcode 編輯 iOS 程式碼。

在 Xcode 編輯 iOS 平台程式碼之前，
請先確保程式碼已經至少建置過一次
（換句話說，請從你的 IDE/編輯器執行範例應用程式，
或在終端機執行
`cd hello/example; flutter build ios --no-codesign --config-only`）。

然後請依照以下步驟操作：

1. 啟動 Xcode。
1. 選擇 **File > Open**，然後選取
   `hello/example/ios/Runner.xcworkspace` 檔案。

你的插件的 iOS 平台程式碼位於
`Pods/Development Pods/hello/../../example/ios/.symlinks/plugins/hello/ios/Classes`
的 Project Navigator 中。（如果你使用的是 `sharedDarwinSource`，
路徑最後會是 `Flutter/hello/Sources/hello`。）

你可以按下執行（&#9654;）按鈕來執行範例應用程式。

##### 新增原生 Darwin 相依套件（Swift Package Manager）

Flutter 使用 Swift Package Manager 作為管理原生 iOS 和 macOS 相依套件的主要策略。

若要使用 Swift Package Manager 為你的插件新增相依套件：

1. 在你的插件的 `ios/my_plugin_name`
   或 `macos/my_plugin_name` 目錄中建立一個 `Package.swift` 檔案。
2. 在 `Package.swift` 描述檔的 `dependencies` 陣列中宣告你的原生相依套件：

```swift title="Package.swift"
dependencies: [
    .package(url: "https://github.com/path/to/HelloLibrary.git", from: "1.0.0")
]
```

如需完整的原生資料夾結構、資源封裝或混合設定的詳細說明，
請參閱 [Swift Package Manager 插件作者指南][Swift Package Manager for plugin authors]。

[Swift Package Manager for plugin authors]: /packages-and-plugins/swift-package-manager/for-plugin-authors

##### 新增 CocoaPod 相依套件（舊版）

Flutter 持續支援 CocoaPods 以維持向下相容性。如果你的插件需要支援尚未遷移至 Swift Package Manager 的開發者，請在 `ios/hello.podspec` 的結尾指定你的 CocoaPods 相依套件：

```ruby
s.dependency 'HelloPod', '0.0.1'
```

針對私有 pods，請參考
[Private CocoaPods][] 以確保有存取該 repo 的權限：

```ruby
s.source = {
    # For pods hosted on GitHub
    :git => "https://github.com/path/to/HelloPod.git",
    # Alternatively, for pods hosted locally
    # :path => "file:///path/to/private/repo",
    :tag => s.version.to_s
  }
```

[Private CocoaPods]: https://guides.cocoapods.org/making/private-cocoapods.html

##### 安裝插件相依套件

若要取得並連結插件的相依套件，請將插件加入你的應用程式專案的
`pubspec.yaml` 相依性中，然後執行 `flutter pub get`。Flutter 會在原生應用程式建置步驟中自動解析並連接 Swift Package Manager 描述檔或 CocoaPods pod 檔案。

如果你的插件需要隱私權聲明檔（privacy manifest），例如，
如果它使用了任何**必要理由 API（required reason APIs）**，
請更新 `PrivacyInfo.xcprivacy` 檔案以
描述你的插件對隱私的影響，
並在 podspec 檔案的底部新增以下內容：

```ruby
s.resource_bundles = {'your_plugin_privacy' => ['your_plugin/Sources/your_plugin/Resources/PrivacyInfo.xcprivacy']}
```

如需更多資訊，請參閱 Apple 開發者網站上的 [Privacy manifest files][]。

[Privacy manifest files]: https://developer.apple.com/documentation/bundleresources/privacy_manifest_files

#### 步驟 2d：新增 Linux 平台程式碼（.h+.cc）

建議你使用具備 C++ 整合功能的 IDE 來編輯 Linux 程式碼。以下說明以安裝了「C/C++」與「CMake」擴充功能的 Visual Studio Code 為例，但也可依照其他 IDE 進行調整。

在 IDE 中編輯 Linux 平台程式碼之前，請先確保程式碼已至少建置過一次（換句話說，請從你的 Flutter IDE/編輯器執行範例應用程式，或在終端機中執行
`cd hello/example; flutter build linux`）。

然後依照以下步驟操作：

1. 啟動 Visual Studio Code。
1. 開啟 `hello/example/linux/` 目錄。
1. 在提示訊息中選擇 **Yes**，內容為：
   `Would you like to configure project "linux"?`。
   這樣可以啟用 C++ 自動完成功能。

你的插件在 Linux 平台上的程式碼位於
`flutter/ephemeral/.plugin_symlinks/hello/linux/`。

你可以使用 `flutter run` 執行範例應用程式。
**注意：** 在 Linux 上建立可執行的 Flutter 應用程式需要透過 `flutter` 工具進行，因此即使你的編輯器支援 CMake 整合，直接用該方式建置與執行也無法正確運作。

#### 步驟 2e：新增 macOS 平台程式碼（.swift）

建議你使用 Xcode 編輯 macOS 程式碼。

在 Xcode 中編輯 macOS 平台程式碼之前，請先確保程式碼已至少建置過一次（換句話說，請從你的 IDE/編輯器執行範例應用程式，或在終端機中執行
`cd hello/example; flutter build macos --config-only`）。

然後依照以下步驟操作：

1. 啟動 Xcode。
1. 選擇 **File > Open**，並選取
   `hello/example/macos/Runner.xcworkspace` 檔案。

你的插件在 macOS 平台上的程式碼位於
專案導覽器（Project Navigator）中的 `Pods/Development Pods/hello/../../example/macos/Flutter/ephemeral/.symlinks/plugins/hello/macos/Classes`。
（如果你使用的是 `sharedDarwinSource`，則路徑會以 `hello/darwin/Classes` 結尾。）

你可以按下執行（&#9654;）按鈕來執行範例應用程式。

#### 步驟 2f：新增 Windows 平台程式碼（.h+.cpp）

建議你使用 Visual Studio 編輯 Windows 程式碼。

在 Visual Studio 中編輯 Windows 平台程式碼之前，請先確保程式碼已至少建置過一次（換句話說，請從你的 IDE/編輯器執行範例應用程式，或在終端機中執行
`cd hello/example; flutter build windows`）。

然後依照以下步驟操作：

1. 啟動 Visual Studio。
1. 選擇 **Open a project or solution**，並選取
   `hello/example/build/windows/hello_example.sln` 檔案。

你的插件在 Windows 平台上的程式碼位於
方案總管（Solution Explorer）中的 `hello_plugin/Source Files` 與 `hello_plugin/Header Files`。

你可以在方案總管中右鍵點擊 `hello_example`，選擇 **Set as Startup Project**，然後按下執行（&#9654;）按鈕來執行範例應用程式。**重要：** 修改插件程式碼後，請務必在再次執行前選擇 **Build > Build Solution**，否則將會執行到舊版本的插件，而非包含你最新變更的版本。

#### 步驟 2g：串接 API 與平台程式碼

最後，你需要將以 Dart 程式碼撰寫的 API 與各平台的實作串接起來。
這可以透過[平台通道 (platform channel)][platform channel]，
或是透過平台介面套件中定義的介面來完成。

### 在現有插件專案中新增平台支援

若要在現有插件專案中新增特定平台的支援，請在專案目錄下再次執行帶有 `--template=plugin` 旗標的 `flutter create`。
例如，若要在現有插件中新增 Web 支援，請執行：

```console
$ flutter create --template=plugin --platforms=web .
```

如果這個指令顯示有關更新 `pubspec.yaml` 檔案的訊息，請依照提供的指示操作。

### Dart 平台實作

在許多情況下，非 Web 平台的實作只會使用該平台專屬的實作語言，如上所示。然而，平台實作也可以同時使用平台專屬的 Dart。

:::note
下方的範例僅適用於非 Web 平台。Web 插件（plugin）實作一律使用 Dart 撰寫，並如上所示，使用 `pluginClass` 與 `fileName` 來進行 Dart 實作。
:::

#### 僅使用 Dart 的平台實作

在某些情況下，部分平台可以完全以 Dart 實作（例如，透過 FFI）。若要在非 Web 平台上進行僅使用 Dart 的平台實作，請將 pubspec.yaml 中的 `pluginClass` 替換為 `dartPluginClass`。以下是上述 `hello_windows` 範例，已修改為僅使用 Dart 的實作版本：

```yaml
flutter:
  plugin:
    implements: hello
    platforms:
      windows:
        dartPluginClass: HelloPluginWindows
```

在這個版本中，你將不會有任何 C++ Windows 程式碼，而是會以 `hello` 套件的 Dart 平台介面類別為基礎，建立一個 `HelloPluginWindows` 類別，並在其中包含一個靜態的 `registerWith()` 方法。這個方法會在啟動時被呼叫，可用來註冊 Dart 的實作方式：

```dart
class HelloPluginWindows extends HelloPluginPlatform {
  /// Registers this class as the default instance of [HelloPluginPlatform].
  static void registerWith() {
    HelloPluginPlatform.instance = HelloPluginWindows();
  }
```

#### 混合式平台實作

平台實作也可以同時使用 Dart 以及平台專屬語言。例如，一個插件可以為每個平台使用不同的平台通道，讓通道能針對各平台進行自訂。

混合式實作會同時使用上述兩種註冊系統。以下是將上方 `hello_windows` 範例修改為混合式實作的方式：

```yaml
flutter:
  plugin:
    implements: hello
    platforms:
      windows:
        dartPluginClass: HelloPluginWindows
        pluginClass: HelloPlugin
```

Dart 的 `HelloPluginWindows` 類別會使用上方所示的 `registerWith()`，這適用於僅使用 Dart 的實作；而 C++ 的 `HelloPlugin` 類別則與僅使用 C++ 的實作相同。

### 測試你的插件

我們鼓勵你使用自動化測試來測試你的插件，以確保在你修改程式碼時，功能不會產生回歸問題。

想進一步了解如何測試你的插件，請參考 [Testing plugins][]。
如果你正在為 Flutter 應用程式撰寫測試，且插件導致當機，請參考 [Flutter in plugin tests][]。

[Flutter in plugin tests]: /testing/plugins-in-tests
[Testing plugins]: /testing/testing-plugins

## 開發 FFI 套件 {:#ffi}

如果你想開發一個使用 Dart FFI 呼叫原生 API 的套件，你需要開發一個 FFI 套件。

:::note
如果你需要存取 Flutter Plugin API 或在 Android 上設定 Google Play 服務執行環境，請改用 `flutter create --template=plugin` 指令。
:::

### 步驟 1：建立套件

要建立一個入門的 FFI 套件，
請在 `flutter create` 指令中加入 `--template=package_ffi` 旗標：

```console
$ flutter create --template=package_ffi hello
```

這會在 `hello` 資料夾中建立一個 FFI 套件專案，並包含以下專屬內容：

**lib**：定義套件 API 的 Dart 程式碼，並透過 `dart:ffi` 呼叫原生程式碼。

**src**：原生原始碼。

**hook/build.dart**：編譯原生程式碼的建置鉤子（hook）腳本。

### 步驟 2：綁定原生程式碼

若要使用原生程式碼，需要在 Dart 中建立綁定（bindings）。

為了避免手動撰寫這些綁定，可以透過 [`package:ffigen`][] 從標頭檔（`src/hello.h`）自動產生。
有關如何安裝此套件，請參考 [ffigen 文件][ffigen docs]。

若要重新產生綁定，請執行以下指令：

```console
$ dart run tool/ffigen.dart
```

### 步驟 3：呼叫原生程式碼

執行時間非常短的原生函式可以直接從任何 isolate 呼叫。
範例請參見 `lib/hello.dart` 中的 `sum`。

執行時間較長的函式，建議在[輔助 isolate][helper isolate] 上呼叫，以避免 Flutter 應用程式出現掉幀現象。
範例請參見 `lib/hello.dart` 中的 `sumAsync`。

## 新增文件

建議在所有套件中加入以下文件：

1. 一份 `README.md` 檔案，簡介此套件
1. 一份 `CHANGELOG.md` 檔案，記錄每個版本的變更
1. 一份 [`LICENSE`] 檔案，載明套件的授權條款
1. 所有公開 API 的 API 文件（詳情請見下方）

### API 文件

當你發佈套件時，
API 文件會自動產生並發佈至 pub.dev/documentation。
例如，請參考 [`device_info_plus`][] 的文件。

如果你希望在本機開發環境產生 API 文件，可以使用下列指令：

<ol>
<li>

切換目錄至你的套件所在位置：

```console
cd ~/dev/mypackage
```

</li>

<li>

告訴文件工具 Flutter SDK 的位置（請根據你安裝 Flutter SDK 的實際路徑修改下列指令）：

```console
   export FLUTTER_ROOT=~/dev/flutter  # on macOS or Linux

   set FLUTTER_ROOT=~/dev/flutter     # on Windows
```
</li>

<li>執行 `dart doc` 工具
    （隨 Flutter SDK 一同提供），方式如下：

```console
   $FLUTTER_ROOT/bin/cache/dart-sdk/bin/dart doc   # on macOS or Linux

   %FLUTTER_ROOT%\bin\cache\dart-sdk\bin\dart doc  # on Windows
```
</li>
</ol>

關於如何撰寫 API 文件的建議，請參閱
[Effective Dart Documentation][]。

### 在 LICENSE 檔案中新增授權條款

每個 LICENSE 檔案中的個別授權條款
應以 80 個連字號（-）作為分隔，
每行僅有連字號。

如果一個 LICENSE 檔案包含多於一個
元件授權條款，則每個元件授權條款
必須以該授權條款所適用的套件名稱開頭，
每個套件名稱各佔一行，
並以空白行將套件名稱清單
與實際授權條款內容分隔開來。
（這些套件名稱不必與 pub 套件名稱相同。例如，一個套件本身可能包含
來自多個第三方來源的程式碼，
因此可能需要為每個來源分別附上授權條款。）

以下範例顯示了一個組織良好的授權條款檔案：

```plaintext
package_1

<some license text>

--------------------------------------------------------------------------------
package_2

<some license text>
```

以下是一個組織良好的授權檔案範例：

```plaintext
package_1

<some license text>

--------------------------------------------------------------------------------
package_1
package_2

<some license text>
```

以下是一個組織不良的授權檔案範例：

```plaintext
<some license text>

--------------------------------------------------------------------------------
<some license text>
```

另一個組織不良的授權檔案範例：

```plaintext
package_1

<some license text>
--------------------------------------------------------------------------------
<some license text>
```

## 發佈你的套件 {:#publish}

:::tip
你是否注意到在 pub.dev 上有些套件和插件被標記為 [Flutter Favorites][]？
這些套件是由經過驗證的開發者所發佈，並被認為是在撰寫應用程式時應優先考慮使用的套件和插件。
想了解更多，請參閱 [Flutter Favorites program][]。
:::

當你完成套件的實作後，可以將其發佈到 [pub.dev][]，讓其他開發者能夠輕鬆使用。

在發佈之前，請務必檢查 `pubspec.yaml`、`README.md` 和 `CHANGELOG.md` 檔案，確保其內容完整且正確。此外，為了提升你的套件品質與易用性（也更有機會成為 Flutter Favorite），建議包含以下項目：

* 多樣化的程式碼使用範例
* 螢幕截圖、動態 GIF 或影片
* 對應的原始碼儲存庫連結

接下來，請以 `dry-run` 模式執行發佈指令，檢查所有項目是否通過分析：

```console
$ flutter pub publish --dry-run
```

下一步是將套件發佈到 pub.dev，但請務必確認你已經準備好，因為[發佈是永久性的][publishing is forever]：

```console
$ flutter pub publish
```

如需有關發佈的更多細節，請參閱 dart.dev 上的
[發佈文件][publishing docs]。

## 處理套件間的相依性 {:#dependencies}

如果你正在開發一個依賴於另一個套件所公開 Dart API 的套件 `hello`，你需要將該套件加入到你的
`pubspec.yaml` 檔案中的 `dependencies` 區段。以下程式碼讓 `url_launcher` 插件的 Dart API 可供 `hello` 使用：

```yaml
dependencies:
  url_launcher: ^6.3.2
```

你現在可以在 `hello` 的 Dart 程式碼中 `import 'package:url_launcher/url_launcher.dart'` 和 `launch(someUrl)`。

這和你在 Flutter 應用程式或其他 Dart 專案中引入套件的方式沒有任何不同。

但如果 `hello` 剛好是一個 _plugin_ 套件，且其平台專屬程式碼需要存取 `url_launcher` 所提供的平台專屬 API，那麼你還需要如下面所示，將適當的相依性宣告加入你的平台專屬建置檔案中。

### Android

以下範例在 `hello/android/build.gradle` 中為 `url_launcher` 設定了一個相依性：

```groovy
android {
    // lines skipped
    dependencies {
        compileOnly rootProject.findProject(":url_launcher")
    }
}
```

你現在可以 `import io.flutter.plugins.urllauncher.UrlLauncherPlugin`，並在原始碼中的 `hello/android/src` 位置存取 `UrlLauncherPlugin` 類別。

如需有關 `build.gradle` 檔案的更多資訊，請參閱
[Gradle Documentation][]（建置腳本相關說明）。

### iOS

以下範例會在 `hello/ios/hello.podspec` 中為 `url_launcher` 設定相依性：

```ruby
Pod::Spec.new do |s|
  # lines skipped
  s.dependency 'url_launcher'
```

你現在可以 `#import "UrlLauncherPlugin.h"`，並在原始碼中的 `hello/ios/Classes` 位置存取 `UrlLauncherPlugin` 類別。

如需關於 `.podspec` 檔案的更多細節，請參閱
[CocoaPods Documentation][]。

### Web

所有 Web 相關的相依套件都由 `pubspec.yaml` 檔案管理，這與其他 Dart 套件相同。

[bind-native]: /platform-integration/bind-native-code
[CocoaPods Documentation]: https://guides.cocoapods.org/syntax/podspec.html
[Dart library package]: https://dart.dev/guides/libraries/create-library-packages
[`device_info_plus`]: https://pub.dev/documentation/device_info_plus
[Effective Dart Documentation]: https://dart.dev/guides/language/effective-dart/documentation
[federated plugins]: #federated-plugins
[ffigen docs]: https://pub.dev/packages/ffigen/install
[`fluro`]: https://pub.dev/packages/fluro
[Flutter editor]: /tools/editors
[Flutter Favorites]: https://pub.dev/flutter/favorites
[Flutter Favorites program]: /packages-and-plugins/favorites
[Gradle Documentation]: https://docs.gradle.org/current/userguide/tutorial_using_tasks.html
[helper isolate]: https://dart.dev/guides/language/concurrency#background-workers
[How to Write a Flutter Web Plugin, Part 1]: https://blog.flutter.dev/how-to-write-a-flutter-web-plugin-5e26c689ea1
[How To Write a Flutter Web Plugin, Part 2]: https://blog.flutter.dev/how-to-write-a-flutter-web-plugin-part-2-afdddb69ece6
[issue #33302]: https://github.com/flutter/flutter/issues/33302
[`LICENSE`]: #在-license-檔案中新增授權條款
[`path`]: https://pub.dev/packages/path
[`package:ffigen`]: https://pub.dev/packages/ffigen
[platform channel]: /platform-integration/platform-channels
[pub.dev]: https://pub.dev
[publishing docs]: https://dart.dev/tools/pub/publishing
[publishing is forever]: https://dart.dev/tools/pub/publishing#publishing-is-forever
[supported-platforms]: #plugin-platforms
[test your plugin]: #testing-your-plugin
[unit tests]: /testing/overview#unit-tests
[`url_launcher`]: https://pub.dev/packages/url_launcher
[Writing a good plugin]: https://blog.flutter.dev/writing-a-good-flutter-plugin-1a561b986c9c

