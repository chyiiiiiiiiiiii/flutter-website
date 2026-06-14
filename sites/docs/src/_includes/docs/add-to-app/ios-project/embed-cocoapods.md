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
