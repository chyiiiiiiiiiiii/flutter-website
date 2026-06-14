# 將 Flutter 模組整合到您的 iOS 專案中（舊版）

> 學習如何將 Flutter 模組整合到您現有的 iOS 專案中。



:::warning

自 Flutter 3.44 起，Swift Package Manager（SwiftPM）已取代 CocoaPods，
成為 iOS 和 macOS Flutter 應用程式的預設相依套件管理工具。
CocoaPods 目前已正式進入維護模式，
其套件倉庫將於 2026 年 12 月 2 日永久[轉為唯讀][read-only]。

本指南僅供參考，不再持續維護。
請使用[更新後的整合指南][updated integration guide]遷移至 Swift Package Manager。

:::

您可以將 Flutter UI 元件 (Widget) 以嵌入式 framework 的方式，逐步加入到現有的 iOS 應用程式中。
要在現有應用程式中嵌入 Flutter，請考慮下列三種方法之一。

| 嵌入方式 | 方法說明 | 優點 |
|---|---|---|
| 使用 CocoaPods _(推薦)_ | 安裝並使用 Flutter SDK 與 CocoaPods。每次 Xcode 建置 iOS 應用程式時，Flutter 會從原始碼編譯 `flutter_module`。 | 將 Flutter 嵌入應用程式最簡單的方法。 |
| 使用 [iOS frameworks][] | 為 Flutter 元件建立 iOS framework，將其嵌入到您的 iOS 專案，並更新現有應用程式的建置設定。 | 不需要每位開發者都在本機安裝 Flutter SDK 與 CocoaPods。 |
| 同時使用 iOS frameworks 與 CocoaPods | 在 Xcode 中嵌入 iOS 應用程式與插件的 framework，但將 Flutter engine 以 CocoaPods podspec 方式發佈。 | 提供一種替代方案，避免直接分發大型 Flutter engine（`Flutter.xcframework`）函式庫。 |

{:.table .table-striped}

[iOS frameworks]: https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WhatAreFrameworks.html

當您將 Flutter 加入現有的 iOS 應用程式時，會[增加您的 iOS 應用程式的體積][app-size]。

若需以 UIKit 建立的應用程式範例，請參考 [add_to_app code samples][] 中的 iOS 目錄。
若需 SwiftUI 範例，請參考 [News Feed App][] 的 iOS 目錄。

## 開發系統需求

Flutter 需要安裝最新版的 Xcode 與 [CocoaPods][]。

## 建立 Flutter 模組

無論您選擇哪種嵌入方式，嵌入 Flutter 到現有應用程式前，請先建立 Flutter 模組。
請使用下列指令來建立 Flutter 模組。

```console
$ cd /path/to/my_flutter
$ flutter create --template module my_flutter
```

Flutter 會在 `/path/to/my_flutter/` 下建立模組專案。
如果你使用 [CocoaPods 方法][CocoaPods method]，請將模組儲存在與你現有 iOS 應用程式相同的父目錄下。

[CocoaPods method]: /add-to-app/ios/project-setup-legacy/?tab=embed-using-cocoapods

從 Flutter 模組目錄中，
你可以執行與其他 Flutter 專案相同的 `flutter` 指令，
例如 `flutter run` 或 `flutter build ios`。
你也可以在 [VS Code][] 或
[Android Studio/IntelliJ][] 中，搭配 Flutter 與 Dart 插件來執行該模組。
這個專案在你將模組嵌入現有 iOS 應用程式之前，
會包含一個單一畫面的範例版本。
這有助於你測試僅與 Flutter 有關的程式碼部分。

## 管理你的模組

`my_flutter` 模組目錄結構類似於一般的 Flutter 應用程式。

<FileTree>

- my_flutter/
  - .ios/
    - Runner.xcworkspace
    - Flutter/
      - podhelper.rb
  - lib/
    - main.dart
  - test/
  - pubspec.yaml

</FileTree>

你的 Dart 程式碼應該加入到 `lib/` 目錄中。
你的 Flutter 相依套件、套件與插件必須加入到 `pubspec.yaml` 檔案中。

`.ios/` 隱藏子資料夾中包含一個 Xcode workspace，
你可以在其中執行你的模組獨立版本。
這個包裝專案負責啟動你的 Flutter 程式碼。
它包含協助腳本，方便你建置 frameworks 或
透過 CocoaPods 將模組嵌入到你現有的應用程式中。

:::note

* 請將自訂的 iOS 程式碼加入到你自己現有應用程式的
  專案或插件中，而不是加入到模組的 `.ios/`
  目錄。對模組的 `.ios/` 目錄所做的變更
  不會反映在使用該模組的現有 iOS 專案中，且可能會被 Flutter 覆蓋。

* 請將 `.ios/` 目錄排除在版本控制之外，
  因為它是自動產生的。

* 在新機器上建置模組之前，
  請在 `my_flutter` 目錄下執行 `flutter pub get`。
  這會在建置使用 Flutter 模組的 iOS 專案前，
  重新產生 `.ios/` 目錄。

:::

## 在你的 iOS 應用程式中嵌入 Flutter 模組

當你開發好 Flutter 模組後，
可以使用本頁頂端表格中描述的方法進行嵌入。

你可以在模擬器或真實裝置上以 **Debug** 模式執行，
並在真實裝置上以 **Release** 模式執行。

:::note
進一步了解 [Flutter 的建置模式][build modes of Flutter]。

如需使用 Flutter 除錯功能（如 hot reload），
請參考 [Debugging your add-to-app module][]。
:::

<Tabs key="darwin-deps">
<Tab name="Use CocoaPods">

### 使用 CocoaPods 與 Flutter SDK {:#method-a .no_toc}

#### 方法說明 {:#method-a-approach}

第一種方法使用 CocoaPods 嵌入 Flutter 模組。
CocoaPods 負責管理 Swift 專案的相依套件，
包含 Flutter 程式碼與插件。
每次 Xcode 建置應用程式時，
CocoaPods 就會嵌入 Flutter 模組。

如此可讓你快速迭代，確保使用最新版本的
Flutter 模組，而無需在 Xcode 之外執行額外指令。

若要進一步了解 CocoaPods，
請參閱 [CocoaPods 入門指南][CocoaPods getting started guide]。

#### 觀看影片

如果你偏好透過影片學習，
以下影片介紹了如何將 Flutter 加入 iOS 應用程式：

<YouTubeEmbed id="IIcrfrTshTs" title="Step by step on how to add Flutter to an existing iOS app"></YouTubeEmbed>

#### 需求條件 {:#method-a-reqs}

專案中每位開發人員都必須在本機安裝
Flutter SDK 與 CocoaPods。

#### 範例專案結構 {:#method-a-structure}

本節假設你的現有應用程式與
Flutter 模組位於同層目錄中。
如果你的目錄結構不同，
請調整相對路徑。
範例目錄結構如下所示：

<FileTree>

- my_flutter/
   - .ios/
   - Flutter/
      - podhelper.rb
- MyApp/
   - Podfile

</FileTree>

#### 更新你的 Podfile

將 Flutter 模組加入你的 Podfile 設定檔。
本節假設你的 Swift 應用程式名稱為 `MyApp`。

1. _（選用）_ 若你的現有應用程式缺少 `Podfile` 設定檔，
   請切換至應用程式目錄的根目錄。
   使用 `pod init` 指令建立 `Podfile` 檔案。

   :::tip
   若 `pod init` 指令發生錯誤，
   請確認你是否使用最新版本的 CocoaPods。
   :::

1. 更新你的 `Podfile` 設定檔。

   1. 在 `platform` 宣告之後加入以下幾行。

      ```ruby title="MyApp/Podfile"
      flutter_application_path = '../my_flutter'
      load File.join(flutter_application_path, '.ios', 'Flutter', 'podhelper.rb')
      ```

   1. 針對每個需要嵌入 Flutter 的 [Podfile 目標（target）][Podfile target]，
      加入對
      `install_all_flutter_pods(flutter_application_path)` 方法的呼叫。
      請將這些呼叫加在上一步驟的設定之後。

      ```ruby title="MyApp/Podfile"
      target 'MyApp' do
        install_all_flutter_pods(flutter_application_path)
      end
      ```

   1. 在 `Podfile` 的 `post_install` 區塊中，
      加入對 `flutter_post_install(installer)` 的呼叫。
      此區塊應為 `Podfile` 設定檔中的最後一個區塊。

      ```ruby title="MyApp/Podfile"
      post_install do |installer|
        flutter_post_install(installer) if defined?(flutter_post_install)
      end
      ```

若要查看 `Podfile` 範例，請參閱 [Flutter Podfile 範例][Flutter Podfile sample]。

#### 嵌入你的框架

在建置時，Xcode 會將你的 Dart 程式碼、每個 Flutter 插件
以及 Flutter 引擎分別封裝成各自的 `*.xcframework` 套件。
CocoaPods 的 `podhelper.rb` 腳本接著會將這些
`*.xcframework` 套件嵌入你的專案中。

* `Flutter.xcframework` 包含 Flutter 引擎。
* `App.xcframework` 包含此專案已編譯的 Dart 程式碼。
* `<plugin>.xcframework` 包含一個 Flutter 插件。

若要將 Flutter 引擎、你的 Dart 程式碼以及 Flutter 插件
嵌入你的 iOS 應用程式，請完成以下步驟。

1. 重新整理你的 Flutter 插件。

   若你修改了 `pubspec.yaml` 檔案中的 Flutter 相依套件，
   請在 Flutter 模組目錄中執行 `flutter pub get`。
   這將重新整理 `podhelper.rb` 腳本所讀取的插件清單。

   ```console
   flutter pub get
   ```

1. 使用 CocoaPods 嵌入插件與框架。

   1. 切換至位於 `/path/to/MyApp/MyApp` 的 iOS 應用程式專案目錄。

   1. 使用 `pod install` 指令。

      ```console
      pod install
      ```

   你的 iOS 應用程式的 **Debug** 與 **Release** 建置組態
   會嵌入對應[建置模式的 Flutter 元件][build-modes]。

1. 建置專案。

   1. 在 Xcode 中開啟 `MyApp.xcworkspace`。

      確認你開啟的是 `MyApp.xcworkspace`，
      而非 `MyApp.xcodeproj`。
      `.xcworkspace` 檔案包含 CocoaPod 相依套件，
      `.xcodeproj` 則不包含。

   1. 選取 **Product** > **Build**，或按下 <kbd>Cmd</kbd> + <kbd>B</kbd>。

#### 設定 LLDB Init 檔案

:::warning
請將你的方案（scheme）設定為使用 Flutter 的 LLDB Init 檔案。若缺少此檔案，
在 iOS 26 或更新版本的裝置上進行除錯時可能會閃退。
:::

1. 產生 Flutter LLDB 檔案。

   1. 在你的 Flutter 應用程式中，執行以下指令：

   ```console
   flutter build ios --config-only
   ```

   此指令將在 `.ios/Flutter/ephemeral` 目錄中產生 LLDB 檔案。

1. 設定 LLDB Init 檔案。

   1. 前往 **Product > Scheme > Edit Scheme**。

   1. 在左側邊欄選取 **Run** 區段。

   1. 使用與你在**更新你的 Podfile** 一節的 Podfile 中
      相同的相對路徑，設定 **LLDB Init File**。

      ```console
      $(SRCROOT)/../my_flutter/.ios/Flutter/ephemeral/flutter_lldbinit
      ```

      若你的方案中已有 **LLDB Init File**，
      可以將 Flutter 的 LLDB 檔案加入其中。
      Flutter LLDB Init 檔案的路徑必須相對於
      你專案 LLDB Init 檔案的位置。

      例如，若你的 LLDB 檔案位於 `/path/to/MyApp/.lldbinit`，
      請加入以下內容：

      ```console
      command source --relative-to-command-file "../my_flutter/.ios/Flutter/ephemeral/flutter_lldbinit"
      ```

[build-modes]: /testing/build-modes
[CocoaPods getting started guide]: https://guides.cocoapods.org/using/using-cocoapods.html
[Podfile target]: https://guides.cocoapods.org/syntax/podfile.html#target
[Flutter Podfile sample]: https://github.com/flutter/samples/blob/main/add_to_app/plugin/ios_using_plugin/Podfile


</Tab>
<Tab name="Use frameworks">

### 在 Xcode 中連結並嵌入框架 {:#method-b .no_toc}

#### 做法 {:#method-b-approach}

在第二種方法中，請編輯現有的 Xcode 專案、
產生所需的框架，並將其嵌入應用程式中。
Flutter 會為 Flutter 本身、已編譯的 Dart 程式碼，以及每個 Flutter 插件
產生對應的 iOS 框架。
請嵌入這些框架，並更新現有應用程式的建置設定。

#### 需求 {:#method-b-reqs}

此方法無需額外的軟體或硬體需求。
在下列情況下請使用此方法：

* 團隊成員無法安裝 Flutter SDK 與 CocoaPods
* 您不想在現有 iOS 應用程式中使用 CocoaPods 作為相依套件管理工具

#### 限制 {:#method-b-limits}


Flutter 無法處理 [xcframeworks 的共用相依套件][common]。
若宿主應用程式與 Flutter 模組的插件定義了相同的 Pod 相依套件，
且你使用此選項整合 Flutter 模組，將會產生錯誤。
這些錯誤包括 `Multiple commands produce
'CommonDependency.framework'` 之類的問題。

若要解決此問題，請在宿主應用程式的 `Podfile` 中，
將 Flutter 模組內每個插件原始碼連結到其 `podspec` 檔案。
請連結原始碼，而非插件的 `xcframework` 框架。
下一節將說明如何[產生該框架][ios-framework]。

若要防止共用相依套件存在時發生的錯誤，
請使用帶有 `--no-plugins` 旗標的 `flutter build ios-framework` 指令。

[common]: https://github.com/flutter/flutter/issues/130220
[ios-framework]: https://github.com/flutter/flutter/issues/114692


#### 範例專案結構 {:#method-b-structure}

以下範例假設你想將框架輸出至 `/path/to/MyApp/Flutter/`。

```console
$ flutter build ios-framework --output=/path/to/MyApp/Flutter/
```

每次在 Flutter 模組中修改程式碼後，都需重新執行此指令。

產生的專案結構應類似以下目錄樹。

<FileTree>

- /path/to/MyApp/
  - Flutter/
    - Debug/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework (If you have plugins with iOS-platform code)
      - example_plugin.xcframework (One framework file for each plugin)
    - Profile/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework
      - example_plugin.xcframework
    - Release/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework
      - example_plugin.xcframework

</FileTree>

:::warning
請務必使用位於同一目錄下的 `Flutter.xcframework` 與 `App.xcframework` 套件。
混用來自不同目錄的 `.xcframework` 匯入
（例如以 `Profile/Flutter.xcframework` 搭配 `Debug/App.xcframework`）
會導致執行階段崩潰。
:::


#### 操作步驟

在 Xcode 中，如何將產生的框架連結、嵌入或同時進行兩者，
取決於框架的類型。

* 連結並嵌入動態框架。
* 連結靜態框架。[切勿嵌入靜態框架][static-framework]。

Flutter 插件可能會產生[靜態或動態框架][static or dynamic frameworks]。
請連結靜態框架，[_絕對不要_嵌入它們][static-framework]。

若你將靜態框架嵌入 iOS 應用程式，
將無法把該應用程式發布到 App Store。
發布時會出現
`Found an unexpected Mach-O header code` 封存錯誤。

##### 連結所有框架

若要連結必要的框架，請按照以下步驟操作。

1. 選擇要連結的框架。

   1. 在 **Project Navigator** 中，點擊你的專案。

   1. 點擊 **Build Phases** 頁籤。

   1. 展開 **Link Binary With Libraries**。

      <DashImage image="development/add-to-app/ios/project-setup/linked-libraries.png" caption="在 Xcode 中展開 **Link Binary With Libraries** 建置階段" />

   1. 點擊 **+**（加號）。

   1. 點擊 **Add Other...** 然後 **Add Files...**。

   1. 在 **Choose frameworks and libraries to add:** 對話框中，
      瀏覽至 `/path/to/MyApp/Flutter/Release/` 目錄。

   1. 按住 Command 鍵點擊該目錄中的框架，然後點擊 **Open**。

      <DashImage image="development/add-to-app/ios/project-setup/choose-libraries.png" caption="在 Xcode 的 **Choose frameworks and libraries to add:** 對話框中選擇要連結的框架" />

1. 更新函式庫的路徑以對應建置模式。

   1. 啟動 Finder。

   1. 瀏覽至 `/path/to/MyApp/` 目錄。

   1. 右鍵點擊 `MyApp.xcodeproj` 並選擇 **Show Package
      Contents**。

   1. 用 Xcode 開啟 `project.pbxproj`。該檔案會在 Xcode 的文字
      編輯器中開啟。這也會鎖定 **Project Navigator**，直到你關閉文字編輯器。

      <DashImage image="development/add-to-app/ios/project-setup/project-pbxproj.png" caption="在 Xcode 文字編輯器中開啟的 `project-pbxproj` 檔案" />

   1. 在 `/* Begin PBXFileReference section */` 中找到
      類似以下文字的行。

      ```text
      312885572C1A441C009F74FF /* Flutter.xcframework */ = {
        isa = PBXFileReference;
        expectedSignature = "AppleDeveloperProgram:S8QB4VV633:FLUTTER.IO LLC";
        lastKnownFileType = wrapper.xcframework;
        name = Flutter.xcframework;
        path = Flutter/[!Release!]/Flutter.xcframework;
        sourceTree = "<group>";
      };
      312885582C1A441C009F74FF /* App.xcframework */ = {
        isa = PBXFileReference;
        lastKnownFileType = wrapper.xcframework;
        name = App.xcframework;
        path = Flutter/[!Release!]/App.xcframework;
        sourceTree = "<group>";
      };
      ```

   1. 將上一步驟中反白的 `Release` 文字
      改為 `$(CONFIGURATION)`，並在路徑前後加上
      引號。

      ```text
      312885572C1A441C009F74FF /* Flutter.xcframework */ = {
        isa = PBXFileReference;
        expectedSignature = "AppleDeveloperProgram:S8QB4VV633:FLUTTER.IO LLC";
        lastKnownFileType = wrapper.xcframework;
        name = Flutter.xcframework;
        path = [!"!]Flutter/[!$(CONFIGURATION)!]/Flutter.xcframework[!"!];
        sourceTree = "<group>";
      };
      312885582C1A441C009F74FF /* App.xcframework */ = {
        isa = PBXFileReference;
        lastKnownFileType = wrapper.xcframework;
        name = App.xcframework;
        path = [!"!]Flutter/[!$(CONFIGURATION)!]/App.xcframework[!"!];
        sourceTree = "<group>";
      };
      ```

1. 更新搜尋路徑。

   1. 點擊 **Build Settings** 頁籤。

   1. 瀏覽至 **Search Paths**。

   1. 雙擊 **Framework Search Paths** 右側。

   1. 在組合框中，點擊 **+**（加號）。

   1. 輸入 `$(inherited)`
      並按下 <kbd>Enter</kbd>。

   1. 點擊 **+**（加號）。

   1. 輸入 `$(PROJECT_DIR)/Flutter/$(CONFIGURATION)/`
      並按下 <kbd>Enter</kbd>。

      <DashImage image="development/add-to-app/ios/project-setup/framework-search-paths.png" caption="在 Xcode 中更新 **Framework Search Paths**" />

連結框架後，它們應會顯示在
目標 **General** 設定的
**Frameworks, Libraries, and Embedded Content**
區段中。

##### 嵌入動態框架

若要嵌入動態框架，請完成以下步驟。

1. 瀏覽至 **General** <span aria-label="and then">></span>
   **Frameworks, Libraries, and Embedded Content**。

1. 點擊每個動態框架並選擇 **Embed & Sign**。

   <DashImage image="development/add-to-app/ios/project-setup/choose-to-embed.png" caption="在 Xcode 中為每個框架選擇 **Embed & Sign**" />

   請勿包含任何靜態框架，
   包括 `FlutterPluginRegistrant.xcframework`。

1. 點擊 **Build Phases** 頁籤。

1. 展開 **Embed Frameworks**。
   你的動態框架應顯示在該區段中。

   <DashImage image="development/add-to-app/ios/project-setup/embed-xcode.png" caption="在 Xcode 中展開的 **Embed Frameworks** 建置階段" />

1. 建置專案。

   1. 在 Xcode 中開啟 `MyApp.xcworkspace`。

      請確認你開啟的是 `MyApp.xcworkspace` 而
      不是 `MyApp.xcodeproj`。
      `.xcworkspace` 檔案包含 CocoaPod 相依套件，
      `.xcodeproj` 則沒有。

   1. 選擇 **Product** <span aria-label="and then">></span>
      **Build** 或按下 <kbd>Cmd</kbd> + <kbd>B</kbd>。

#### 設定 LLDB Init File

:::warning
請將你的 Scheme 設定為使用 Flutter 的 LLDB Init File。若缺少此檔案，在
iOS 26 或更新版本的裝置上進行除錯時可能會崩潰。
:::

1. 產生 Flutter LLDB 檔案。

   1. 在你的 Flutter 應用程式中，如果尚未執行，請重新執行 `flutter build ios-framework`：

   ```console
   $ flutter build ios-framework --output=/path/to/MyApp/Flutter/
   ```

   這將在 `/path/to/MyApp/Flutter/` 目錄中產生 LLDB 檔案。

1. 設定 LLDB Init File。

   1. 前往 **Product > Scheme > Edit Scheme**。

   1. 在左側邊欄選擇 **Run** 區段。

   1. 將 **LLDB Init File** 設定為以下路徑：

      ```console
      $(PROJECT_DIR)/Flutter/flutter_lldbinit
      ```

      如果你的 Scheme 已有 **LLDB Init File**，可以將 Flutter 的
      LLDB 檔案加入其中。Flutter 的 LLDB Init File 路徑必須相對於
      你專案的 LLDB Init File 所在位置。

      例如，若你的 LLDB 檔案位於 `/path/to/MyApp/.lldbinit`，
      請加入以下內容：

      ```console
      command source --relative-to-command-file "Flutter/flutter_lldbinit"
      ```

[static or dynamic frameworks]: https://stackoverflow.com/questions/32591878/ios-is-it-a-static-or-a-dynamic-framework
[static-framework]: https://developer.apple.com/library/archive/technotes/tn2435/_index.html


[static-framework]: https://developer.apple.com/library/archive/technotes/tn2435/_index.html


</Tab>
<Tab name="Use frameworks and CocoaPods">

### 在 Xcode 中使用框架並以 podspec 方式使用 Flutter 框架 {:#method-c .no_toc}

#### 方法說明 {:#method-c-approach}

此方法將 Flutter 產生為 CocoaPods 的 podspec，
而非將龐大的 `Flutter.xcframework` 分發給其他開發者、
機器或持續整合系統。
Flutter 仍會為已編譯的 Dart 程式碼
以及每個 Flutter 插件產生 iOS 框架。
嵌入這些框架並更新現有應用程式的建置設定。

#### 需求 {:#method-c-reqs}

此方法不需要額外的軟體或硬體需求。
在以下使用情境中採用此方法：

* 團隊成員無法安裝 Flutter SDK 與 CocoaPods
* 你不想在現有的 iOS 應用程式中使用 CocoaPods 作為相依套件管理工具

#### 限制 {:#method-c-limits}


Flutter 無法處理 [xcframeworks 的共用相依套件][common]。
若宿主應用程式與 Flutter 模組的插件定義了相同的 Pod 相依套件，
且你使用此選項整合 Flutter 模組，將會產生錯誤。
這些錯誤包括 `Multiple commands produce
'CommonDependency.framework'` 之類的問題。

若要解決此問題，請在宿主應用程式的 `Podfile` 中，
將 Flutter 模組內每個插件原始碼連結到其 `podspec` 檔案。
請連結原始碼，而非插件的 `xcframework` 框架。
下一節將說明如何[產生該框架][ios-framework]。

若要防止共用相依套件存在時發生的錯誤，
請使用帶有 `--no-plugins` 旗標的 `flutter build ios-framework` 指令。

[common]: https://github.com/flutter/flutter/issues/130220
[ios-framework]: https://github.com/flutter/flutter/issues/114692


此方法僅適用於 `beta` 或 `stable` [發布頻道][release channels]。

[release channels]: /install/upgrade#switching-flutter-channels

#### 範例專案結構 {:#method-c-structure}

以下範例假設你想將框架輸出至 `/path/to/MyApp/Flutter/`。

```console
$ flutter build ios-framework --output=/path/to/MyApp/Flutter/
```

每次在 Flutter 模組中修改程式碼後，都需重新執行此指令。

產生的專案結構應類似以下目錄樹。

<FileTree>

- /path/to/MyApp/
  - Flutter/
    - Debug/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework (If you have plugins with iOS-platform code)
      - example_plugin.xcframework (One framework file for each plugin)
    - Profile/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework
      - example_plugin.xcframework
    - Release/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework
      - example_plugin.xcframework

</FileTree>

:::warning
請務必使用位於同一目錄下的 `Flutter.xcframework` 與 `App.xcframework` 套件。
混用來自不同目錄的 `.xcframework` 匯入
（例如以 `Profile/Flutter.xcframework` 搭配 `Debug/App.xcframework`）
會導致執行階段崩潰。
:::


#### 將 Flutter 引擎加入 Podfile

使用 CocoaPods 的宿主應用程式可以將 Flutter 引擎加入其 Podfile。

```ruby title="MyApp/Podfile"
pod 'Flutter', :podspec => '/path/to/MyApp/Flutter/[![build mode]!]/Flutter.podspec'
```

:::note
你必須將 `[build mode]` 的值寫死。
例如，若需要使用 `flutter attach` 請使用 `Debug`，
準備好發布時則使用 `Release`。
:::

#### 連結並嵌入應用程式與插件框架

Flutter 插件可能會產生[靜態或動態框架][static or dynamic frameworks]。
請連結靜態框架，[_絕對不要_嵌入它們][static-framework]。

若你將靜態框架嵌入 iOS 應用程式，
將無法把該應用程式發布到 App Store。
發布時會出現
`Found an unexpected Mach-O header code` 封存錯誤。

##### 連結所有框架

若要連結必要的框架，請按照以下步驟操作。

1. 選擇要連結的框架。

   1. 在 **Project Navigator** 中，點擊你的專案。

   1. 點擊 **Build Phases** 頁籤。

   1. 展開 **Link Binary With Libraries**。

      <DashImage image="development/add-to-app/ios/project-setup/linked-libraries.png" caption="在 Xcode 中展開 **Link Binary With Libraries** 建置階段" />

   1. 點擊 **+**（加號）。

   1. 點擊 **Add Other...** 然後 **Add Files...**。

   1. 在 **Choose frameworks and libraries to add:** 對話框中，
      瀏覽至 `/path/to/MyApp/Flutter/Release/` 目錄。

   1. 按住 Command 鍵點擊該目錄中的框架，然後點擊 **Open**。

      <DashImage image="development/add-to-app/ios/project-setup/choose-libraries.png" caption="在 Xcode 的 **Choose frameworks and libraries to add:** 對話框中選擇要連結的框架" />

1. 更新函式庫的路徑以對應建置模式。

   1. 啟動 Finder。

   1. 瀏覽至 `/path/to/MyApp/` 目錄。

   1. 右鍵點擊 `MyApp.xcodeproj` 並選擇 **Show Package
      Contents**。

   1. 用 Xcode 開啟 `project.pbxproj`。該檔案會在 Xcode 的文字
      編輯器中開啟。這也會鎖定 **Project Navigator**，直到你關閉文字編輯器。

      <DashImage image="development/add-to-app/ios/project-setup/project-pbxproj.png" caption="在 Xcode 文字編輯器中開啟的 `project-pbxproj` 檔案" />

   1. 在 `/* Begin PBXFileReference section */` 中找到
      類似以下文字的行。

      ```text
      312885572C1A441C009F74FF /* Flutter.xcframework */ = {
        isa = PBXFileReference;
        expectedSignature = "AppleDeveloperProgram:S8QB4VV633:FLUTTER.IO LLC";
        lastKnownFileType = wrapper.xcframework;
        name = Flutter.xcframework;
        path = Flutter/[!Release!]/Flutter.xcframework;
        sourceTree = "<group>";
      };
      312885582C1A441C009F74FF /* App.xcframework */ = {
        isa = PBXFileReference;
        lastKnownFileType = wrapper.xcframework;
        name = App.xcframework;
        path = Flutter/[!Release!]/App.xcframework;
        sourceTree = "<group>";
      };
      ```

   1. 將上一步驟中反白的 `Release` 文字
      改為 `$(CONFIGURATION)`，並在路徑前後加上
      引號。

      ```text
      312885572C1A441C009F74FF /* Flutter.xcframework */ = {
        isa = PBXFileReference;
        expectedSignature = "AppleDeveloperProgram:S8QB4VV633:FLUTTER.IO LLC";
        lastKnownFileType = wrapper.xcframework;
        name = Flutter.xcframework;
        path = [!"!]Flutter/[!$(CONFIGURATION)!]/Flutter.xcframework[!"!];
        sourceTree = "<group>";
      };
      312885582C1A441C009F74FF /* App.xcframework */ = {
        isa = PBXFileReference;
        lastKnownFileType = wrapper.xcframework;
        name = App.xcframework;
        path = [!"!]Flutter/[!$(CONFIGURATION)!]/App.xcframework[!"!];
        sourceTree = "<group>";
      };
      ```

1. 更新搜尋路徑。

   1. 點擊 **Build Settings** 頁籤。

   1. 瀏覽至 **Search Paths**。

   1. 雙擊 **Framework Search Paths** 右側。

   1. 在組合框中，點擊 **+**（加號）。

   1. 輸入 `$(inherited)`
      並按下 <kbd>Enter</kbd>。

   1. 點擊 **+**（加號）。

   1. 輸入 `$(PROJECT_DIR)/Flutter/$(CONFIGURATION)/`
      並按下 <kbd>Enter</kbd>。

      <DashImage image="development/add-to-app/ios/project-setup/framework-search-paths.png" caption="在 Xcode 中更新 **Framework Search Paths**" />

連結框架後，它們應會顯示在
目標 **General** 設定的
**Frameworks, Libraries, and Embedded Content**
區段中。

##### 嵌入動態框架

若要嵌入動態框架，請完成以下步驟。

1. 瀏覽至 **General** <span aria-label="and then">></span>
   **Frameworks, Libraries, and Embedded Content**。

1. 點擊每個動態框架並選擇 **Embed & Sign**。

   <DashImage image="development/add-to-app/ios/project-setup/choose-to-embed.png" caption="在 Xcode 中為每個框架選擇 **Embed & Sign**" />

   請勿包含任何靜態框架，
   包括 `FlutterPluginRegistrant.xcframework`。

1. 點擊 **Build Phases** 頁籤。

1. 展開 **Embed Frameworks**。
   你的動態框架應顯示在該區段中。

   <DashImage image="development/add-to-app/ios/project-setup/embed-xcode.png" caption="在 Xcode 中展開的 **Embed Frameworks** 建置階段" />

1. 建置專案。

   1. 在 Xcode 中開啟 `MyApp.xcworkspace`。

      請確認你開啟的是 `MyApp.xcworkspace` 而
      不是 `MyApp.xcodeproj`。
      `.xcworkspace` 檔案包含 CocoaPod 相依套件，
      `.xcodeproj` 則沒有。

   1. 選擇 **Product** <span aria-label="and then">></span>
      **Build** 或按下 <kbd>Cmd</kbd> + <kbd>B</kbd>。

#### 設定 LLDB Init File

:::warning
請將你的 Scheme 設定為使用 Flutter 的 LLDB Init File。若缺少此檔案，在
iOS 26 或更新版本的裝置上進行除錯時可能會崩潰。
:::

1. 產生 Flutter LLDB 檔案。

   1. 在你的 Flutter 應用程式中，如果尚未執行，請重新執行 `flutter build ios-framework`：

   ```console
   $ flutter build ios-framework --output=/path/to/MyApp/Flutter/
   ```

   這將在 `/path/to/MyApp/Flutter/` 目錄中產生 LLDB 檔案。

1. 設定 LLDB Init File。

   1. 前往 **Product > Scheme > Edit Scheme**。

   1. 在左側邊欄選擇 **Run** 區段。

   1. 將 **LLDB Init File** 設定為以下路徑：

      ```console
      $(PROJECT_DIR)/Flutter/flutter_lldbinit
      ```

      如果你的 Scheme 已有 **LLDB Init File**，可以將 Flutter 的
      LLDB 檔案加入其中。Flutter 的 LLDB Init File 路徑必須相對於
      你專案的 LLDB Init File 所在位置。

      例如，若你的 LLDB 檔案位於 `/path/to/MyApp/.lldbinit`，
      請加入以下內容：

      ```console
      command source --relative-to-command-file "Flutter/flutter_lldbinit"
      ```

[static or dynamic frameworks]: https://stackoverflow.com/questions/32591878/ios-is-it-a-static-or-a-dynamic-framework
[static-framework]: https://developer.apple.com/library/archive/technotes/tn2435/_index.html



</Tab>
</Tabs>


## 設定本地網路隱私權限

在 iOS 14 及更新版本中，請在 iOS 應用程式的 **Debug** 版本中啟用 Dart multicast DNS 服務。
這可透過 `flutter attach` 新增[除錯功能，例如熱重載與 DevTools](/add-to-app/debugging)。

:::warning
請勿在應用程式的 **Release** 版本中啟用此服務。
Apple App Store 可能會拒絕你的應用程式上架。
:::

若要僅在應用程式的 Debug 版本中設定本機網路隱私權限，
請為每個建置設定建立獨立的 `Info.plist` 檔案。
SwiftUI 專案預設不含 `Info.plist` 檔案。
若需要建立 property list，
可透過 Xcode 或文字編輯器進行。
以下說明假設使用預設的 **Debug** 與 **Release** 設定。
請依照你的應用程式建置設定調整名稱。

1. 建立新的 property list。

   1. 在 Xcode 中開啟你的專案。

   1. 在 **Project Navigator** 中，點擊專案名稱。

   1. 在編輯器面板的 **Targets** 清單中，點擊你的應用程式。

   1. 點擊 **Info** 分頁。

   1. 展開 **Custom iOS Target Properties**。

   1. 在清單上按右鍵，選擇 **Add Row**。

   1. 從下拉選單中選擇 **Bonjour Services**。
      這會在專案目錄中建立一個名為 `Info` 的新 property list 檔案，
      在 Finder 中顯示為 `Info.plist`。

1. 將 `Info.plist` 重新命名為 `Info-Debug.plist`。

   1. 在左側專案清單中點擊 **Info** 檔案。

   1. 在右側的 **Identity and Type** 面板中，
      將 **Name** 從 `Info.plist` 改為 `Info-Debug.plist`。

1. 建立 Release property list。

   1. 在 **Project Navigator** 中，點擊 `Info-Debug.plist`。

   1. 選擇 **File** > **Duplicate...**。
      你也可以按下 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>。

   1. 在對話框中，將 **Save As:** 欄位設為
      `Info-Release.plist`，然後點擊 **Save**。

1. 在 **Debug** property list 中新增必要的屬性。

   1. 在 **Project Navigator** 中，點擊 `Info-Debug.plist`。

   1. 在 **Bonjour Services** 陣列中新增字串值 `_dartVmService._tcp`。

   1. _（選用）_ 若要設定自訂的權限對話框文字，
      新增鍵值 **Privacy - Local Network Usage Description**。

      <DashImage image="development/add-to-app/ios/project-setup/debug-plist.png" caption="已新增 **Bonjour Services** 與 **Privacy - Local Network Usage Description** 鍵值的 `Info-Debug` property list" />

1. 設定目標，讓不同建置模式使用不同的 property list。

   1. 在 **Project Navigator** 中，點擊你的專案。

   1. 點擊 **Build Settings** 分頁。

   1. 點擊 **All** 與 **Combined** 子分頁。

   1. 在搜尋框中輸入 `plist`。
      這會將設定篩選為包含 property list 的項目。

   1. 捲動清單直到看見 **Packaging**。

   1. 點擊 **Info.plist File** 設定。

   1. 將 **Info.plist File** 的值
      從 `path/to/Info.plist` 改為 `path/to/Info-$(CONFIGURATION).plist`。

      <DashImage image="development/add-to-app/ios/project-setup/set-plist-build-setting.png" caption="更新 `Info.plist` 建置設定以使用特定建置模式的 property list" />

      這會在 **Debug** 模式下解析為 **Info-Debug.plist**，
      在 **Release** 模式下解析為 **Info-Release.plist**。

      <DashImage image="development/add-to-app/ios/project-setup/plist-build-setting.png" caption="顯示各設定變體的更新後 **Info.plist File** 建置設定" />

1. 從 **Build Phases** 中移除 **Release** property list。

   1. 在 **Project Navigator** 中，點擊你的專案。

   1. 點擊 **Build Phases** 分頁。

   1. 展開 **Copy Bundle Resources**。

   1. 若此清單包含 `Info-Release.plist`，
      點擊該項目，然後點擊其下方的 **-**（減號）
      以將 property list 從資源清單中移除。

      <DashImage image="development/add-to-app/ios/project-setup/copy-bundle.png" caption="顯示 **Info-Release.plist** 設定的 **Copy Bundle** 建置階段，請移除此設定。" />

1. 你的 Debug 應用程式載入的第一個 Flutter 畫面會提示要求本機網路權限。

   點擊 **OK**。

   _（選用）_ 若要在應用程式載入前授予權限，請啟用
   **Settings > Privacy > Local Network > Your App**。

[debugging functionalities such as hot-reload and DevTools]: /add-to-app/debugging


## 解決 Apple Silicon Mac 已知問題

在 [Apple Silicon 處理器的 Mac][apple-silicon] 上，
主應用程式會為 `arm64` 模擬器建置。
雖然 Flutter 支援 `arm64` 模擬器，但部分插件可能不支援。
如果你使用這類插件，可能會看到像
**Undefined symbols for architecture arm64** 的編譯錯誤。
若遇到此情況，
請將 `arm64` 從主應用程式的模擬器架構中排除。

1. 在 **Project Navigator** 中點選你的專案。

1. 點選 **Build Settings** 分頁。

1. 點選 **All** 與 **Combined** 子分頁。

1. 在 **Architectures** 下，點選 **Excluded Architectures**。

1. 展開以查看可用的建置組態。

1. 點選 **Debug**。

1. 點選 **+**（加號）。

1. 選擇 **iOS Simulator**。

1. 在 **Any iOS Simulator SDK** 的值欄位雙擊。

1. 點選 **+**（加號）。

1. 在 **Debug > Any iOS Simulator SDK** 對話框中輸入 `arm64`。

   <DashImage image="development/add-to-app/ios/project-setup/excluded-archs.png" caption="將 `arm64` 加入為應用程式的排除架構" />

1. 按下 <kbd>Esc</kbd> 關閉此對話框。

1. 針對 **Release** 建置模式重複上述步驟。

1. 對所有 iOS 單元測試目標也重複上述步驟。

## 下一步

你現在可以[將 Flutter 畫面][add a Flutter screen] 加入到你現有的 iOS 應用程式中。

[add_to_app code samples]: https://github.com/flutter/samples/tree/main/add_to_app
[add a Flutter screen]: /add-to-app/ios/add-flutter-screen
[Android Studio/IntelliJ]: /tools/android-studio
[build modes of Flutter]: /testing/build-modes
[CocoaPods]: https://cocoapods.org/
[app-size]: /resources/faq#how-big-is-the-flutter-engine
[VS Code]: /tools/vs-code
[News Feed app]: https://github.com/flutter/put-flutter-to-work/tree/022208184ec2623af2d113d13d90e8e1ce722365
[Debugging your add-to-app module]: /add-to-app/debugging/
[apple-silicon]: https://support.apple.com/en-us/116943
[read-only]: https://blog.cocoapods.org/CocoaPods-Specs-Repo/
[updated integration guide]: /add-to-app/ios/project-setup

