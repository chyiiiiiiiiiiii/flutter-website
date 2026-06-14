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
