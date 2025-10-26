---
title: 開發套件與插件
shortTitle: 開發
description: 如何為 Flutter 撰寫套件與插件。
---

## 套件簡介

套件（Packages）可讓你建立模組化的程式碼，方便分享與重複利用。
一個最基本的套件包含以下內容：

**`pubspec.yaml`**
: 一個中繼資料檔案，用於宣告套件名稱、版本、作者等資訊。

**`lib`**
: `lib` 目錄包含套件中的公開程式碼，最少需有一個 `<package-name>.dart` 檔案。

:::note
若想了解撰寫高品質插件時的注意事項，請參考 Mehmet Fidanboylu 的 Medium 文章
[Writing a good plugin][Writing a good plugin]。
:::

### 套件類型 {:#types}

套件可以包含多種類型的內容：

**Dart 套件**
: 一般以 Dart 撰寫的套件，例如 [`path`][`path`] 套件。
  其中有些可能包含 Flutter 專屬功能，因此會依賴 Flutter 框架，
  僅能在 Flutter 中使用，例如 [`fluro`][`fluro`] 套件。

**插件套件（Plugin packages）**
: 一種特殊的 Dart 套件，包含以 Dart 程式碼撰寫的 API，
  並結合一個或多個平台專屬的實作。

  插件套件可以針對 Android（使用 Kotlin 或 Java）、iOS（使用 Swift 或 Objective-C）、Web、macOS、Windows 或 Linux，或是這些平台的任意組合進行開發。

  具體範例如 [`url_launcher`][`url_launcher`] 插件套件。
  若想了解如何使用 `url_launcher` 套件，以及其如何擴充支援 Web，
  請參考 Harry Terkelsen 的 Medium 文章
  [How to Write a Flutter Web Plugin, Part 1][How to Write a Flutter Web Plugin, Part 1]。

**FFI 插件套件（FFI Plugin packages）**
: 一種特殊的 Dart 套件，包含以 Dart 程式碼撰寫的 API，
  並結合一個或多個使用 Dart FFI（[Android][Android]、[iOS][iOS]、[macOS][macOS]）的
  平台專屬實作。

## 開發 Dart 套件 {:#dart}

以下說明如何撰寫 Flutter 套件。

### 步驟 1：建立套件

若要建立一個入門的 Flutter 套件，
請在 `flutter create` 指令中加入 `--template=package` 旗標：

```console
$ flutter create --template=package hello
```

這會在`hello`資料夾中建立一個套件專案，內容如下：

**LICENSE**
: 一個（大多為空白的）授權條款文字檔。

**test/hello_test.dart**
: 套件的[單元測試][unit tests]。

**hello.iml**
: IntelliJ IDE 所使用的設定檔。

**.gitignore**
: 一個隱藏檔案，用於告訴 Git 專案中哪些檔案或
  資料夾應被忽略。

**.metadata**
: 一個隱藏檔案，供 IDE 追蹤 Flutter 專案屬性使用。

**pubspec.yaml**
: 一個 yaml 格式的設定檔，包含描述
  套件相依性的中繼資料。由 pub 工具使用。

**README.md**
: 一個起始用的 markdown 檔案，簡要說明
  套件的用途。

**lib/hello.dart**
: 一個起始應用程式，包含此套件的 Dart 程式碼。

**.idea/modules.xml**, **.idea/workspace.xml**
: 一個隱藏資料夾，內含 IntelliJ IDE 的設定檔。

**CHANGELOG.md**
: 一個（大多為空白的）markdown 檔案，用於追蹤
  套件的版本變更。

### 步驟 2：實作套件

對於純 Dart 套件，只需將功能加入主要的`lib/<package name>.dart`檔案，
或是放在`lib`目錄下的多個檔案中。

若要測試套件，請在`test`目錄中加入[單元測試][unit tests]。

關於如何組織套件內容的更多細節，
請參考 [Dart library package][Dart library package] 文件。

## 開發插件套件 {:#plugin}

如果你想開發一個需要呼叫平台專屬 API 的套件，
你就需要開發一個插件套件（plugin package）。

API 會透過[平台通道（platform channel）][platform channel]
連接到平台專屬的實作。

### 聯邦式插件（Federated plugins）

聯邦式插件是一種將不同平台支援分割到不同套件的方式。
因此，一個聯邦式插件可以針對 iOS 使用一個套件，
Android 使用另一個套件，Web 使用另一個套件，
甚至還可以針對車載（例如 IoT 裝置）使用另一個套件。
這種方式的好處之一是，領域專家可以擴充現有插件，
讓它能支援他們最熟悉的平台。

一個聯邦式插件需要以下幾個套件：

**面向應用的套件（app-facing package）**
: 插件使用者在專案中依賴的套件。
  這個套件定義了 Flutter 應用程式所使用的 API。

**平台套件（platform package）**
: 一個或多個包含平台專屬實作程式碼的套件。
  面向應用的套件會呼叫這些套件——
  它們不會自動被加入應用程式，
  除非它們包含最終使用者可存取的平台專屬功能。

**平台介面套件（platform interface package）**
: 將面向應用的套件與平台套件串接起來的套件。
  這個套件會宣告一個介面，任何平台套件都必須實作該介面，
  以支援面向應用的套件。單一套件統一定義這個介面，
  可確保所有平台套件都能以一致的方式實作相同功能。

#### 已背書（endorsed）的聯邦式插件

理想情況下，當你要為聯邦式插件新增一個平台實作時，
你會與套件原作者協調，將你的實作納入其中。
如此一來，原作者就會_背書_你的實作。

舉例來說，假設你為（假想的）`foobar`插件
撰寫了一個`foobar_windows`實作。
在已背書的插件中，原`foobar`作者
會將你的 Windows 實作加入面向應用套件的 pubspec 相依性中。
這樣，當開發者在他們的 Flutter 應用程式中加入`foobar`插件時，
Windows 實作以及其他已背書的實作
都會自動提供給該應用程式使用。

#### 未背書（non-endorsed）的聯邦式插件

如果因任何原因，你無法讓原插件作者
將你的實作納入，那你的插件就是_未背書_的。
開發者仍然可以使用你的實作，但必須手動將該插件
加入應用程式的`pubspec.yaml`檔案中：

```yaml
dependencies:
  foobar: ^1.0.0
  foobar_windows: ^1.0.0 # Non-endorsed plugin implementation
```

這種方法同樣適用於覆寫已經被認可（endorsed）的 `foobar` 插件實作。

若需進一步了解聯邦式插件（federated plugins）、其用途及實作方式，請參考 Harry Terkelsen 在 Medium 上的文章：[How To Write a Flutter Web Plugin, Part 2][How To Write a Flutter Web Plugin, Part 2]。

### 指定插件支援的平台 {:#plugin-platforms}

插件可以透過在 `pubspec.yaml` 檔案中的 `platforms` 對應表（map）新增鍵值，來指定其支援的平台。例如，下方的 pubspec 檔案展示了 `hello` 插件的 `flutter:` 對應表，該插件僅支援 iOS 與 Android：

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

當你要為更多平台新增 plugin 實作時，`platforms` 對應表也應該相應地更新。舉例來說，以下是 `hello` plugin 的 pubspec 檔案中的對應表，當其更新以支援 macOS 和 web 時的範例：

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
但會包含一個 `implements` 項目，表示
它實作了哪一個面向應用程式的套件（app-facing package）。例如，
一個包含 `hello`
Windows 實作的 `hello_windows`
plugin，其 `flutter:` 對應表如下：

```yaml
flutter:
  plugin:
    implements: hello
    platforms:
      windows:
        pluginClass: HelloPlugin
```

#### 授權實作（Endorsed implementations）

面向應用程式的套件可以透過在其專案中新增對平台套件的相依性，並將其作為`default_package`加入`platforms:`對應表（map）中，來授權（endorse）一個平台套件。如果上述的`hello`外掛（plugin）授權了`hello_windows`，其設定方式如下所示：


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

請注意，如上所示，一個面向應用程式的套件（app-facing package）可以在套件內實作部分平台，並將其他平台交由經過認可的聯邦式實作（endorsed federated implementations）來處理。

#### 共享 iOS 和 macOS 的實作

許多框架同時支援 iOS 和 macOS，且擁有相同或幾乎相同的 API，這讓部分插件可以用同一份程式碼同時支援 iOS 和 macOS。一般來說，每個平台的實作會放在各自的資料夾中，但透過 `sharedDarwinSource` 選項，可以讓 iOS 和 macOS 共用同一個資料夾：


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

當啟用`sharedDarwinSource`時，iOS 不再使用`ios`目錄，macOS 也不再使用`macos`目錄，這兩個平台會共用一個`darwin`目錄來存放所有程式碼與資源。

啟用此選項時，你需要將現有的檔案從`ios`和`macos`移動到共用目錄。

你也需要更新 podspec 檔案，為兩個平台設定相依套件與部署目標，例如：

```ruby
  s.ios.dependency 'Flutter'
  s.osx.dependency 'FlutterMacOS'
  s.ios.deployment_target = '13.0'
  s.osx.deployment_target = '10.15'
```

### 步驟 1：建立套件

要建立一個插件（plugin）套件，請使用 `--template=plugin`
旗標搭配 `flutter create` 指令。

使用 `--platforms=` 選項，後接以逗號分隔的清單，
來指定該插件支援的平台。可用的平台有：
`android`、`ios`、`web`、`linux`、`macos` 和 `windows`。
如果未指定任何平台，則產生的專案將不支援任何平台。

使用 `--org` 選項來指定您的組織名稱，
請採用反向網域名稱（reverse domain name）格式。這個值會用於
產生的插件程式碼中的各種套件與 bundle 識別碼。

預設情況下，插件專案會為 iOS 使用 Swift，為 Android 使用 Kotlin。
如果您偏好使用 Objective-C 或 Java，
可以分別使用 `-i` 指定 iOS 語言，使用 `-a` 指定 Android 語言。
請從下列選項中**選擇一項**：

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

這會在`hello`資料夾中建立一個 plugin 專案，
內容包含以下專屬項目：

**`lib/hello.dart`**
: plugin 的 Dart API。

**`android/src/main/java/com/example/hello/HelloPlugin.kt`**
: plugin API 的 Android 平台專屬實作，
  使用 Kotlin 撰寫。

**`ios/Classes/HelloPlugin.m`**
: plugin API 的 iOS 平台專屬實作，
  使用 Objective-C 撰寫。

**`example/`**
: 一個依賴此 plugin 的 Flutter 應用程式，
  並示範如何使用它。

### 步驟 2：實作套件 {:#edit-plugin-package}

由於 plugin 套件包含多個平台、使用多種程式語言撰寫的程式碼，
因此需要一些特定步驟，以確保開發流程順暢。

#### 步驟 2a：定義套件 API（.dart）

plugin 套件的 API 是以 Dart 程式碼定義的。
請在你喜愛的 [Flutter 編輯器][Flutter editor] 中開啟主要的`hello/`資料夾。
找到`lib/hello.dart`檔案。

#### 步驟 2b：新增 Android 平台程式碼（.kt/.java）

我們建議你使用 Android Studio 編輯 Android 程式碼。

在 Android Studio 編輯 Android 平台程式碼之前，
請先確保程式碼至少已經編譯過一次
（換句話說，請從你的 IDE/編輯器執行 example app，
或在終端機執行
`cd hello/example; flutter build apk --config-only`）。

然後請依照以下步驟操作：

1. 啟動 Android Studio。
1. 在 **Welcome to Android Studio** 對話框中選擇 **Open an existing Android Studio Project**，
   或從選單選擇 **File > Open**，
   並選取`hello/example/android/build.gradle`檔案。
1. 在 **Gradle Sync** 對話框中，選擇 **OK**。
1. 在 **Android Gradle Plugin Update** 對話框中，
   選擇 **Don't remind me again for this project**。

你的 plugin 的 Android 平台程式碼位於
`hello/java/com.example.hello/HelloPlugin`。

你可以在 Android Studio 中按下執行（&#9654;）按鈕來執行 example app。

#### 步驟 2c：新增 iOS 平台程式碼（.swift/.h+.m）

我們建議你使用 Xcode 編輯 iOS 程式碼。

在 Xcode 編輯 iOS 平台程式碼之前，
請先確保程式碼至少已經編譯過一次
（換句話說，請從你的 IDE/編輯器執行 example app，
或在終端機執行
`cd hello/example; flutter build ios --no-codesign --config-only`）。

然後請依照以下步驟操作：

1. 啟動 Xcode。
1. 選擇 **File > Open**，然後選取
   `hello/example/ios/Runner.xcworkspace` 檔案。

你的 plugin 的 iOS 平台程式碼位於
`Pods/Development Pods/hello/../../example/ios/.symlinks/plugins/hello/ios/Classes`
（在 Project Navigator 中）。如果你使用的是`sharedDarwinSource`，
路徑會以`hello/darwin/Classes`結尾。

你可以按下執行（&#9654;）按鈕來執行 example app。

##### 新增 CocoaPod 相依套件

:::warning
Flutter 正在遷移至 [Swift Package Manager][Swift Package Manager]
來管理 iOS 與 macOS 原生相依套件。
Flutter 對 Swift Package Manager 的支援仍在開發中，
未來實作方式可能會有所變動。
Swift Package Manager 僅在 Flutter 的 [`main` channel][`main` channel] 上提供。
Flutter 仍然支援 CocoaPods。
:::

[Swift Package Manager]: https://www.swift.org/documentation/package-manager/
[`main` channel]: /install/upgrade#switching-flutter-channels

請依照以下說明，新增版本為`0.0.1`的`HelloPod`：

1. 在`ios/hello.podspec`的結尾指定相依套件：

   ```ruby
   s.dependency 'HelloPod', '0.0.1'
   ```

   針對私有 pods，請參考
   [Private CocoaPods][Private CocoaPods] 以確保有存取該 repo 的權限：

   ```ruby
   s.source = {
       # For pods hosted on GitHub
       :git => "https://github.com/path/to/HelloPod.git",
       # Alternatively, for pods hosted locally
       # :path => "file:///path/to/private/repo",
       :tag => s.version.to_s
     }`
   ```

[Private CocoaPods]: https://guides.cocoapods.org/making/private-cocoapods.html

2. 安裝插件

   - 在專案的 `pubspec.yaml` dependencies 中加入該插件。
   - 執行 `flutter pub get`。
   - 在專案的 `ios/` 目錄下執行 `pod install`。

該 pod 應該會出現在安裝摘要中。

如果你的插件需要隱私權聲明（privacy manifest），例如，
當它使用任何**必要理由 API（required reason APIs）**時，
請更新 `PrivacyInfo.xcprivacy` 檔案以
描述你的插件對隱私的影響，
並在 podspec 檔案的底部加入以下內容：

```ruby
s.resource_bundles = {'your_plugin_privacy' => ['your_plugin/Sources/your_plugin/Resources/PrivacyInfo.xcprivacy']}
```

如需更多資訊，請參閱 Apple 開發者網站上的 [Privacy manifest files][Privacy manifest files]。

[Privacy manifest files]: {{site.apple-dev}}/documentation/bundleresources/privacy_manifest_files

#### 步驟 2d：新增 Linux 平台程式碼（.h + .cc）

建議您使用具備 C++ 整合功能的 IDE 編輯 Linux 程式碼。以下說明以安裝了「C/C++」與「CMake」擴充功能的 Visual Studio Code 為例，但也可依照其他 IDE 進行調整。

在 IDE 中編輯 Linux 平台程式碼之前，請先確保程式碼已經至少建置過一次（也就是說，請從您的 Flutter IDE/編輯器執行範例應用程式，或在終端機執行
`cd hello/example; flutter build linux`）。

然後請依照下列步驟操作：

1. 啟動 Visual Studio Code。
1. 開啟 `hello/example/linux/` 目錄。
1. 在出現提示詢問：
   `Would you like to configure project "linux"?` 時，選擇 **Yes**。
   這樣 C++ 自動完成功能才能正常運作。

您的套件在 Linux 平台上的程式碼位於
`flutter/ephemeral/.plugin_symlinks/hello/linux/`。

您可以使用 `flutter run` 執行範例應用程式。
**注意：** 在 Linux 上建立可執行的 Flutter 應用程式需要執行 `flutter` 工具的相關步驟，因此即使您的編輯器支援 CMake 整合，直接用該方式建置與執行也無法正確運作。

#### 步驟 2e：新增 macOS 平台程式碼（.swift）

建議您使用 Xcode 編輯 macOS 程式碼。

在 Xcode 編輯 macOS 平台程式碼之前，請先確保程式碼已經至少建置過一次（也就是說，請從您的 IDE/編輯器執行範例應用程式，或在終端機執行
`cd hello/example; flutter build macos --config-only`）。

然後請依照下列步驟操作：

1. 啟動 Xcode。
1. 選擇 **File > Open**，並選取
   `hello/example/macos/Runner.xcworkspace` 檔案。

您的套件在 macOS 平台上的程式碼位於
專案導覽器（Project Navigator）中的 `Pods/Development Pods/hello/../../example/macos/Flutter/ephemeral/.symlinks/plugins/hello/macos/Classes`。
（如果您使用的是 `sharedDarwinSource`，路徑會以 `hello/darwin/Classes` 結尾。）

您可以按下執行（&#9654;）按鈕來執行範例應用程式。

#### 步驟 2f：新增 Windows 平台程式碼（.h + .cpp）

建議您使用 Visual Studio 編輯 Windows 程式碼。

在 Visual Studio 編輯 Windows 平台程式碼之前，請先確保程式碼已經至少建置過一次（也就是說，請從您的 IDE/編輯器執行範例應用程式，或在終端機執行
`cd hello/example; flutter build windows`）。

然後請依照下列步驟操作：

1. 啟動 Visual Studio。
1. 選擇 **Open a project or solution**，並選取
   `hello/example/build/windows/hello_example.sln` 檔案。

您的套件在 Windows 平台上的程式碼位於
方案總管（Solution Explorer）中的 `hello_plugin/Source Files` 與 `hello_plugin/Header Files`。

您可以在方案總管中右鍵點擊 `hello_example`，選擇 **Set as Startup Project**，然後按下執行（&#9654;）按鈕來執行範例應用程式。**重要提醒：** 修改套件程式碼後，請務必在再次執行前選擇 **Build > Build Solution**，否則會執行到舊版的套件，無法反映您的最新變更。

#### 步驟 2g：連接 API 與平台程式碼

最後，您需要將以 Dart 程式碼撰寫的 API 與各平台的實作連接起來。
這可以透過 [平台通道（platform channel）][platform channel]，或是透過平台介面套件中定義的介面來完成。

### 在現有套件專案中新增平台支援

若要在現有的套件專案中新增特定平台的支援，請在專案目錄下再次執行 `flutter create`，並加上 `--template=plugin` 旗標。
例如，若要在現有套件中新增 web 支援，請執行：

```console
$ flutter create --template=plugin --platforms=web .
```

如果此指令顯示有關更新`pubspec.yaml`檔案的訊息，請依照提供的指示操作。

### Dart 平台實作

在許多情況下，非 Web 平台的實作僅會使用該平台專屬的實作語言，如上所示。然而，平台實作也可以同時使用平台專屬的 Dart。

:::note
以下範例僅適用於非 Web 平台。Web 外掛的實作一律以 Dart 撰寫，並如上所示，使用`pluginClass`與`fileName`來進行 Dart 實作。
:::

#### 純 Dart 平台實作

在某些情況下，部分平台可以完全以 Dart 實作（例如，透過 FFI）。若要在 Web 以外的平台上進行純 Dart 平台實作，請將 pubspec.yaml（設定檔）中的`pluginClass`替換為`dartPluginClass`。
以下是上述`hello_windows`範例，經過修改後成為純 Dart 實作的版本：

```yaml
flutter:
  plugin:
    implements: hello
    platforms:
      windows:
        dartPluginClass: HelloPluginWindows
```

在這個版本中，你將不會有任何 C++ Windows 程式碼，而是會將 `hello` 外掛的 Dart 平台介面類別進行子類化，建立一個包含靜態 `registerWith()` 方法的 `HelloPluginWindows` 類別。這個方法會在啟動時被呼叫，可用來註冊 Dart 實作：

```dart
class HelloPluginWindows extends HelloPluginPlatform {
  /// Registers this class as the default instance of [HelloPluginPlatform].
  static void registerWith() {
    HelloPluginPlatform.instance = HelloPluginWindows();
  }
```

#### 混合式平台實作

平台實作也可以同時使用 Dart 以及特定平台的語言。例如，一個 plugin 可以針對每個平台使用不同的 platform channel，以便根據平台自訂 channel。

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

Dart 的 `HelloPluginWindows` 類別會如上所示，使用 `registerWith()` 來實作僅限 Dart 的功能，而 C++ 的 `HelloPlugin` 類別則與純 C++ 實作時相同。

### 測試你的插件

我們鼓勵你使用自動化測試來測試你的插件，以確保在你修改程式碼時，功能不會出現回歸（regression）問題。

想進一步了解如何測試你的插件，請參考 [Testing plugins][Testing plugins]。
如果你正在為 Flutter 應用程式撰寫測試，且插件導致當機，請參考 [Flutter in plugin tests][Flutter in plugin tests]。

[Flutter in plugin tests]: /testing/plugins-in-tests
[Testing plugins]: /testing/testing-plugins

## 開發 FFI 插件套件 {:#plugin-ffi}

如果你想開發一個使用 Dart 的 FFI 呼叫原生 API 的套件，你需要開發一個 FFI 插件套件（FFI plugin package）。

FFI 插件套件與非 FFI 插件套件都支援捆綁原生程式碼。然而，FFI 插件套件不支援 method channel，但 _支援_ method channel 的註冊程式碼。
若要實作同時使用 method channel _和_ FFI 的插件，請使用非 FFI 插件。
每個平台都可以選擇使用 FFI 或非 FFI 的平台實作。

### 步驟 1：建立套件

要建立一個 FFI 插件套件的起始範本，請在 `flutter create` 指令中加入 `--template=plugin_ffi` 參數：

```console
$ flutter create --template=plugin_ffi hello
```

這會在`hello`資料夾中建立一個 FFI 插件專案，內容包含以下專屬結構：

**lib**：定義插件 API 的 Dart 程式碼，並透過`dart:ffi`呼叫原生程式碼。

**src**：原生原始碼，以及一個`CMakeLists.txt`檔案，用於將這些原始碼建置成動態函式庫。

**平台資料夾**（`android`、`ios`、`windows`等）：用於建置與打包原生程式碼函式庫到各平台應用程式的建置檔案。

### 步驟 2：建置與打包原生程式碼

`pubspec.yaml`會如下指定 FFI 插件：

```yaml
  plugin:
    platforms:
      some_platform:
        ffiPlugin: true
```

這個設定會針對各個目標平台呼叫原生建置（native build），並將這些 FFI 插件所產生的二進位檔（binaries）打包到 Flutter 應用程式中。

這可以和 `dartPluginClass` 結合使用，例如在聯邦插件（federated plugin）中，當 FFI 用於其中一個平台的實作時：

```yaml
  plugin:
    implements: some_other_plugin
    platforms:
      some_platform:
        dartPluginClass: SomeClass
        ffiPlugin: true
```

一個 plugin（外掛）可以同時擁有 FFI 及 method channels（方法通道）：

```yaml
  plugin:
    platforms:
      some_platform:
        pluginClass: SomeName
        ffiPlugin: true
```

FFI（以及 method channels）外掛所呼叫的原生建置系統如下：

* Android：Gradle，會呼叫 Android NDK 來進行原生建置。
  * 請參閱 `android/build.gradle` 的相關文件。
* iOS 與 macOS：Xcode，並使用 CocoaPods。
  * 請參閱 `ios/hello.podspec` 的相關文件。
  * 請參閱 `macos/hello.podspec` 的相關文件。
* Linux 與 Windows：CMake。
  * 請參閱 `linux/CMakeLists.txt` 的相關文件。
  * 請參閱 `windows/CMakeLists.txt` 的相關文件。

### 步驟 3：綁定原生程式碼

若要使用原生程式碼，必須在 Dart 中建立綁定（bindings）。

為了避免手動撰寫這些綁定，可以透過 [`package:ffigen`][`package:ffigen`] 從標頭檔（`src/hello.h`）自動產生。
有關安裝此套件的資訊，請參考 [ffigen 文件][ffigen docs]。

若要重新產生綁定，請執行以下指令：

```console
$ dart run ffigen --config ffigen.yaml
```

### 步驟 4：呼叫原生程式碼

執行時間非常短的原生函式可以直接從任何 isolate 呼叫。
範例請參見 `sum`（位於 `lib/hello.dart`）。

執行時間較長的函式，建議在[輔助 isolate][helper isolate]上呼叫，以避免 Flutter 應用程式掉幀。
範例請參見 `sumAsync`（位於 `lib/hello.dart`）。

## 新增文件

建議所有套件都加入以下文件：

1. 一個 `README.md` 檔案，介紹此套件
1. 一個 `CHANGELOG.md` 檔案，記錄每個版本的變更
1. 一個 [`LICENSE`] 檔案，載明套件的授權條款
1. 所有公開 API 的 API 文件（詳情請見下方）

### API 文件

當你發佈套件時，
API 文件會自動產生並發佈到 pub.dev/documentation。
例如，請參考 [`device_info_plus`][`device_info_plus`] 的文件。

如果你希望在本機開發機器上產生 API 文件，可以使用以下指令：

<ol>
<li>

切換目錄至你的套件所在位置：

```console
cd ~/dev/mypackage
```

</li>

<li>

告訴文件工具 Flutter SDK（Flutter 軟體開發套件）的位置（請根據你放置的位置修改以下指令）：

```console
   export FLUTTER_ROOT=~/dev/flutter  # on macOS or Linux

   set FLUTTER_ROOT=~/dev/flutter     # on Windows
```
</li>

<li>執行 `dart doc` 工具（隨 Flutter SDK 一同提供），方式如下：

```console
   $FLUTTER_ROOT/bin/cache/dart-sdk/bin/dart doc   # on macOS or Linux

   %FLUTTER_ROOT%\bin\cache\dart-sdk\bin\dart doc  # on Windows
```
</li>
</ol>

關於如何撰寫 API 文件的建議，請參閱
[Effective Dart Documentation][Effective Dart Documentation]。

### 在 LICENSE 檔案中新增授權條款

每個 LICENSE 檔案中的個別授權條款
應以 80 個連字號（-）作為分隔，
每行單獨一條。

如果一個 LICENSE 檔案包含多個
元件授權條款，則每個元件授權條款
必須以該授權條款所適用的套件名稱開頭，
每個套件名稱各佔一行，
並以空白行將套件名稱清單
與實際授權條款內文分隔。
（這些套件名稱不一定要與
pub 套件名稱相同。例如，一個套件本身可能包含
來自多個第三方來源的程式碼，
因此需要為每一個來源分別附上授權條款。）

以下範例展示了一個組織良好的授權條款檔案：

```plaintext
package_1

<some license text>

--------------------------------------------------------------------------------
package_2

<some license text>
```

以下是一個組織良好的授權（license）檔案範例：

```plaintext
package_1

<some license text>

--------------------------------------------------------------------------------
package_1
package_2

<some license text>
```

以下是一個組織不良的 license 檔案範例：

```plaintext
<some license text>

--------------------------------------------------------------------------------
<some license text>
```

另一個組織不佳的授權檔案範例：

```plaintext
package_1

<some license text>
--------------------------------------------------------------------------------
<some license text>
```

## 發佈你的套件 {:#publish}

:::tip
你是否注意到在 pub.dev 上有些套件和插件被標註為 [Flutter Favorites][Flutter Favorites]？
這些是由經過驗證的開發者所發佈的套件，
並被認為是在撰寫應用程式時應優先考慮使用的套件與插件。
想了解更多，請參閱 [Flutter Favorites program][Flutter Favorites program]。
:::

當你完成一個套件的開發後，可以將其發佈到 [pub.dev][pub.dev]，
讓其他開發者能夠輕鬆使用。

在發佈之前，請務必檢查 `pubspec.yaml`、`README.md` 和 `CHANGELOG.md` 檔案，
以確保內容完整且正確。此外，為了提升你的套件品質與易用性
（也讓它更有機會成為 Flutter Favorite），建議包含以下項目：

* 多樣化的程式碼使用範例
* 截圖、動態 GIF 或影片
* 對應的程式碼儲存庫連結

接下來，請以 `dry-run` 模式執行發佈指令，
確認所有項目都通過分析：

```console
$ flutter pub publish --dry-run
```

下一步是將套件發佈到 pub.dev，但請確保你已經準備好，因為[發佈是永久的][publishing is forever]：

```console
$ flutter pub publish
```

如需發佈相關的詳細資訊，請參閱 dart.dev 上的 [publishing docs][publishing docs]。

## 處理套件間的相依性 {:#dependencies}

如果你正在開發一個套件 `hello`，且它依賴於另一個套件所公開的 Dart API，你需要將該套件加入到 `dependencies` 區塊中，並寫入你的 `pubspec.yaml` 檔案。以下程式碼會讓 `url_launcher` 插件的 Dart API 可供 `hello` 使用：

```yaml
dependencies:
  url_launcher: ^6.3.2
```

你現在可以在 `hello` 的 Dart 程式碼中 `import 'package:url_launcher/url_launcher.dart'` 和 `launch(someUrl)`。

這和你在 Flutter 應用程式或其他 Dart 專案中引入套件的方式沒有任何不同。

但如果 `hello` 剛好是一個 _plugin_ 套件（外掛套件），其平台專屬程式碼需要存取 `url_launcher` 所提供的平台專屬 API，則你還需要如下面所示，在你的平台專屬建置檔案中加入適當的相依性宣告。

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

您現在可以`import io.flutter.plugins.urllauncher.UrlLauncherPlugin`，並在原始碼中的`hello/android/src`存取`UrlLauncherPlugin`類別。

如需有關`build.gradle`檔案的更多資訊，請參閱
[Gradle Documentation][Gradle Documentation]（建置腳本相關說明）。

### iOS

以下範例在`hello/ios/hello.podspec`中為`url_launcher`設定相依性：

```ruby
Pod::Spec.new do |s|
  # lines skipped
  s.dependency 'url_launcher'
```

你現在可以`#import "UrlLauncherPlugin.h"`，並在原始碼中的`hello/ios/Classes`位置存取`UrlLauncherPlugin`類別。

如需關於`.podspec`檔案的更多細節，請參閱 [CocoaPods Documentation][CocoaPods Documentation]。

### Web

所有 Web 相關的相依套件都由`pubspec.yaml`檔案管理，這與其他 Dart 套件相同。

{% comment %}
<!-- Remove until we have better text. -->
### MacOS

PENDING
{% endcomment %}

[CocoaPods Documentation]: https://guides.cocoapods.org/syntax/podspec.html
[Dart library package]: {{site.dart-site}}/guides/libraries/create-library-packages
[`device_info_plus`]: {{site.pub-api}}/device_info_plus
[Effective Dart Documentation]: {{site.dart-site}}/guides/language/effective-dart/documentation
[federated plugins]: #聯邦式插件-federated-plugins
[ffigen docs]: {{site.pub-pkg}}/ffigen/install
[Android]: /platform-integration/android/c-interop
[iOS]: /platform-integration/ios/c-interop
[macOS]: /platform-integration/macos/c-interop
[`fluro`]: {{site.pub}}/packages/fluro
[Flutter editor]: /tools/editors
[Flutter Favorites]: {{site.pub}}/flutter/favorites
[Flutter Favorites program]: /packages-and-plugins/favorites
[Gradle Documentation]: https://docs.gradle.org/current/userguide/tutorial_using_tasks.html
[helper isolate]: {{site.dart-site}}/guides/language/concurrency#background-workers
[How to Write a Flutter Web Plugin, Part 1]: {{site.flutter-medium}}/how-to-write-a-flutter-web-plugin-5e26c689ea1
[How To Write a Flutter Web Plugin, Part 2]: {{site.flutter-medium}}/how-to-write-a-flutter-web-plugin-part-2-afdddb69ece6
[issue #33302]: {{site.repo.flutter}}/issues/33302
[`LICENSE`]: #在-license-檔案中新增授權條款
[`path`]: {{site.pub}}/packages/path
[`package:ffigen`]: {{site.pub}}/packages/ffigen
[platform channel]: /platform-integration/platform-channels
[pub.dev]: {{site.pub}}
[publishing docs]: {{site.dart-site}}/tools/pub/publishing
[publishing is forever]: {{site.dart-site}}/tools/pub/publishing#publishing-is-forever
[supported-platforms]: #plugin-platforms
[test your plugin]: #testing-your-plugin
[unit tests]: /testing/overview#unit-tests
[`url_launcher`]: {{site.pub}}/packages/url_launcher
[Writing a good plugin]: {{site.flutter-medium}}/writing-a-good-flutter-plugin-1a561b986c9c
