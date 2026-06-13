---
title: Visual Studio Code
shortTitle: VS Code
description: 如何在 Visual Studio Code 中開發 Flutter 應用程式。
---

<ul class="nav nav-tabs" id="ide-tabs" role="tablist">
  <li class="nav-item">
    <a class="nav-link" href="/tools/android-studio" role="tab" aria-selected="false">Android Studio 和 IntelliJ</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" role="tab" aria-selected="true">Visual Studio Code</a>
  </li>
</ul>

<a id="installation-and-setup" aria-hidden="true"></a>

## 安裝與設定 {: #setup}

[VS Code][] 是一款用於建置與除錯應用程式的程式碼編輯器。
安裝 Flutter 擴充功能後，你可以編譯、部署並除錯
Flutter 應用程式。

若要安裝最新版的 VS Code，
請依照 Microsoft 提供的相關平台說明進行：

- [在 macOS 上安裝][Install on macOS]
- [在 Windows 上安裝][Install on Windows]
- [在 Linux 上安裝][Install on Linux]

[VS Code]: https://code.visualstudio.com/
[Install on macOS]: https://code.visualstudio.com/docs/setup/mac
[Install on Windows]: https://code.visualstudio.com/docs/setup/windows
[Install on Linux]: https://code.visualstudio.com/docs/setup/linux

### 安裝 Flutter 擴充功能 {: #install-extension}

1. 啟動 **VS Code**。

1. 開啟瀏覽器並前往 Visual Studio Marketplace 上的 [Flutter 擴充功能][Flutter extension] 頁面。

1. 點擊 **Install**。
   安裝 Flutter 擴充功能時，也會一併安裝 Dart 擴充功能。

[Flutter extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter

### 驗證你的 VS Code 設定 {: #validate-setup}

1. 前往 **檢視** <span aria-label="and then">></span>
   **命令面板...**。

   你也可以按下 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> +
   <kbd>Shift</kbd> + <kbd>P</kbd>。

1. 輸入 `doctor`。

1. 選擇 **Flutter: Run Flutter Doctor**。

   當你選擇此指令後，VS Code 會執行下列動作：

   - 開啟 **Output** 面板。
   - 在此面板右上角的下拉選單中顯示 **flutter (flutter)**。
   - 顯示 `flutter doctor` 指令的輸出結果。

### 更新擴充功能 {:#updating}

擴充功能會定期推出更新。
預設情況下，VS Code 會在有更新時自動更新擴充功能。

若要自行安裝更新：

1. 點擊側邊欄的 **擴充功能**。
1. 如果 Flutter 擴充功能有可用的更新，
   點擊 **Update**，然後點擊 **Reload**。
1. 重新啟動 VS Code。

## 建立專案

建立新專案有幾種方式。

### 建立新專案

若要從 Flutter 起始應用程式範本建立新的 Flutter 專案：

1. 前往 **檢視** <span aria-label="and then">></span>
   **命令面板...**。

   你也可以按下 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> +
   <kbd>Shift</kbd> + <kbd>P</kbd>。

1. 輸入 `flutter`。
1. 選擇 **Flutter: New Project**。
1. 按下 <kbd>Enter</kbd>。
1. 選擇 **Application**。
1. 按下 <kbd>Enter</kbd>。
1. 選擇 **專案位置**。
1. 輸入你想要的 **專案名稱**。

### 從現有原始碼開啟專案

若要開啟現有的 Flutter 專案：

1. 前往 **檔案** <span aria-label="and then">></span> **開啟**。

   你也可以按下 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>O</kbd>

1. 瀏覽至存放你現有 Flutter 原始碼檔案的目錄。
1. 點擊 **開啟**。

## 編輯程式碼與檢視問題

Flutter 擴充功能會執行程式碼分析。
程式碼分析可以：

- 高亮語言語法
- 根據豐富的型別分析自動補全程式碼
- 導航至型別宣告

  - 前往 **Go** <span aria-label="and then">></span> **Go to Definition**。
  - 你也可以按下 <kbd>F12</kbd>。

- 尋找型別的使用處。

  - 按下 <kbd>Shift</kbd> + <kbd>F12</kbd>。

- 檢視所有目前原始碼的問題。

  - 前往 **檢視** <span aria-label="and then">></span> **Problems**。
  - 你也可以按下 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> +
    <kbd>Shift</kbd> + <kbd>M</kbd>。
  - 問題面板會顯示所有分析問題：<br>
    ![Problems pane](/assets/images/docs/tools/vs-code/problems.png)

## 執行與除錯

:::note
你可以用幾種方式來除錯你的應用程式。

- 使用 [DevTools][]，這是一套在瀏覽器中執行的除錯與效能分析工具。
- 使用 VS Code 內建的除錯功能，
  例如設定中斷點。

以下說明的是 VS Code 中可用的功能。
如需啟動與使用 DevTools 的相關資訊，請參閱
[DevTools][] 文件中的[從 VS Code 執行 DevTools][Running DevTools from VS Code]。
:::

你可以在主 IDE 視窗中點擊 **執行 > 開始除錯**，
或按下 <kbd>F5</kbd> 來開始除錯。

### 選擇目標裝置

當你在 VS Code 中開啟 Flutter 專案時，
你應該會在狀態列看到一組 Flutter 專屬的項目，
包含 Flutter SDK 版本與
裝置名稱（或顯示 **No Devices** 訊息）：<br>
![VS Code status bar][]

:::note
- 如果你沒有看到 Flutter 版本號或裝置資訊，
  你的專案可能未被偵測為 Flutter 專案。
  請確認包含你的 `pubspec.yaml` 的資料夾
  已經在 VS Code **工作區資料夾（Workspace Folder）** 內。
- 如果狀態列顯示 **No Devices**，代表 Flutter 尚未
  偵測到任何已連接的 iOS 或 Android 裝置或模擬器。
  你需要連接裝置，或啟動模擬器或模擬裝置，才能繼續。
:::

Flutter 擴充功能會自動選擇最後連接的裝置。
但如果你同時連接了多個裝置或模擬器，請點擊
狀態列中的 **device**，螢幕上方會出現選單。
選擇你想用來執行或除錯的裝置。

:::secondary
**你是否正在使用 Visual Studio Code Remote 遠端開發 macOS 或 iOS？**
如果是，可能需要手動解鎖鑰匙圈。詳情請參考
[StackExchange 上的這個問題][question on StackExchange]。
:::

[question on StackExchange]: https://superuser.com/questions/270095/when-i-ssh-into-os-x-i-dont-have-my-keychain-when-i-use-terminal-i-do/363840#363840

### 不設定中斷點執行應用程式

前往 **執行** > **Start Without Debugging**。

你也可以按下 <kbd>Ctrl</kbd> + <kbd>F5</kbd>。

### 設定中斷點執行應用程式

1. 如有需要，先在原始碼中設定中斷點。
1. 點擊 **執行** <span aria-label="and then">></span> **開始除錯**。
   你也可以按下 <kbd>F5</kbd>。
   狀態列會變成橘色，表示你正在除錯階段。<br>
   ![Debug console](/assets/images/docs/tools/vs-code/debug_console.png)

   - 左側的 **Debug Sidebar** 會顯示堆疊框架與變數。
   - 下方的 **Debug Console** 面板會顯示詳細的日誌輸出。
   - 除錯會根據預設啟動組態進行。
     若要自訂，請點擊 **Debug Sidebar** 頂端的齒輪圖示以建立 `launch.json` 檔案，
     然後你可以修改相關設定值。

### 以 debug、profile 或 release 模式執行應用程式

Flutter 提供多種不同的建置模式來執行你的應用程式。
你可以在 [Flutter 的建置模式][Flutter's build modes] 了解更多。

1. 在 VS Code 中開啟 `launch.json` 檔案。

   如果你還沒有 `launch.json` 檔案：

   {: type="a"}
   1. 前往 **檢視** <span aria-label="and then">></span> **執行**。

      你也可以按下 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> +
      <kbd>Shift</kbd> + <kbd>D</kbd>

      這時會顯示 **執行與除錯** 面板。

   1. 點擊 **建立 launch.json 檔案**。

1. 在 `configurations` 區段中，
   將 `flutterMode` 屬性更改為
   你想要目標的建置模式。

   例如，如果你想以 debug 模式執行，
   你的 `launch.json` 可能如下所示：

    ```json
    "configurations": [
      {
        "name": "Flutter",
        "request": "launch",
        "type": "dart",
        "flutterMode": "debug"
      }
    ]
    ```

1. 透過 **Run** 面板執行應用程式。

## 快速編輯與即時刷新開發循環

Flutter 提供業界領先的開發循環，透過 _Stateful Hot Reload_（狀態熱重載）功能，讓你幾乎能即時看到程式碼變更的效果。
想了解更多，請參閱 [Hot reload][]。

## 進階除錯

你可能會覺得以下進階除錯技巧很有幫助：

### 視覺版面配置問題的除錯

在除錯階段，[Command Palette][] 及 [Flutter inspector][] 會新增多項除錯指令。
當空間有限時，會以圖示方式顯示標籤。

**切換基線繪製** ![Baseline painting icon](/assets/images/docs/tools/devtools/paint-baselines-icon.png){:.theme-icon width="20px"}
: 讓每個 RenderBox 在其每個基線處繪製一條線。

**切換重繪彩虹** ![Repaint rainbow icon](/assets/images/docs/tools/devtools/repaint-rainbow-icon.png){:.theme-icon width="20px"}
: 在重繪時於圖層上顯示旋轉顏色。

**切換慢速動畫** ![Slow animations icon](/assets/images/docs/tools/devtools/slow-animations-icon.png){:.theme-icon width="20px"}
: 將動畫速度放慢，方便進行視覺檢查。

**切換除錯模式橫幅** ![Debug mode banner icon](/assets/images/docs/tools/devtools/debug-mode-banner-icon.png){:width="20px"}
: 即使在除錯建置時，也可隱藏除錯模式橫幅。

### 除錯外部函式庫

預設情況下，Flutter 擴充功能不會啟用外部函式庫的除錯。
若要啟用：

1. 選擇 **Settings > Extensions > Dart Configuration**。
2. 勾選 `Debug External Libraries` 選項。

## Flutter 程式碼編輯小技巧

如果你有其他值得分享的小技巧，歡迎[告訴我們][let us know]！

### 協助工具與快速修正

協助工具（Assists）是與特定程式碼識別子相關的程式碼變更。
當游標放在 Flutter 元件 (Widget) 識別子上時，會顯示多種協助工具，並以黃色燈泡圖示標示。
要啟用協助工具，請點擊如下截圖所示的燈泡：

![Code assists](/assets/images/docs/tools/vs-code/assists.png){:width="467px"}

你也可以按下 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>.</kbd>

快速修正（Quick fixes）與協助工具類似，不過它們會在程式碼出現錯誤時顯示，並協助你修正錯誤。

**以新元件包裹協助工具**
: 當你想將某個元件包裹在其他元件外層時可使用，例如想將元件包裹在 `Row` 或 `Column` 中。

**以新元件包裹元件清單協助工具**
: 與上述協助工具類似，但適用於包裹現有的元件清單，而非單一元件。

**將 child 轉換為 children 協助工具**
: 將 child 參數轉換為 children 參數，並將參數值包裝成清單。

**將 StatelessWidget 轉換為 StatefulWidget 協助工具**
: 將 `StatelessWidget` 的實作轉換為 `StatefulWidget`，自動建立 `State` 類別並將程式碼移至該處。

### 程式碼片段（Snippets）

程式碼片段可加速輸入常見的程式碼結構。
只需輸入片段前綴，然後從程式碼自動完成視窗中選擇即可：
![Snippets](/assets/images/docs/tools/vs-code/snippets.png){:width="100%"}

Flutter 擴充功能內建以下程式碼片段：

- 前綴 `stless`：建立新的 `StatelessWidget` 子類別。
- 前綴 `stful`：建立新的 `StatefulWidget` 子類別及其對應的 State 子類別。
- 前綴 `stanim`：建立新的 `StatefulWidget` 子類別及其對應的 State 子類別，並包含一個以 `AnimationController` 初始化的欄位。

Dart 擴充功能內建以下程式碼片段：

| 前綴 | 說明 | 程式碼範例 |
|---|---|---|
| `main` | 插入 main 函式，作為程式進入點。 | `void main(List<String> args) {  }` |
| `try` | 插入 try/catch 區塊。 | `try {  } catch (e) {  }` |
| `if` | 插入 if 陳述式。 | `if (condition) {  }` |
| `ife` | 插入含 else 區塊的 if 陳述式。 | `if (condition) {  } else {  }` |
| `switch` | 插入 switch 陳述式。 | `switch (variable) { case value1:  break; case value2:  break; default:  }` |
| `for` | 插入 for 迴圈。 | `for (var i = 0; i < 10; i++) {  }` |
| `fori` | 插入 for-in 迴圈。 | `for (var item in list) {  }` |
| `while` | 插入 while 迴圈。 | `while (condition) {  }` |
| `do` | 插入 do-while 迴圈。 | `do {  } while (condition);` |
| `fun` | 插入函式定義。 | `void myFunction(String name) {  }` |
| `class` | 插入類別定義。 | `class MyClass {  }` |
| `typedef` | 插入 typedef。 | `typedef MyFunction = void Function(String);` |
| `test` | 插入測試區塊。 | `test('My test description', () {  });` |
| `group` | 插入測試群組區塊。 | `group('My test group', () {  });` |

你也可以從 [Command Palette][] 執行 **Configure User Snippets** 來定義自訂程式碼片段。

### 鍵盤快速鍵

**熱重載（Hot reload）**
: 在除錯階段執行熱重載，請點擊 **Debug Toolbar** 上的 **Hot Reload**。

  你也可以按下 <kbd>Ctrl</kbd> + <kbd>F5</kbd>
  （macOS 上為 <kbd>Cmd</kbd> + <kbd>F5</kbd>）。

  鍵盤對應可透過從 [Command Palette][] 執行 **Open Keyboard Shortcuts** 指令來變更。

### 熱重載與熱重啟的差異

熱重載（Hot reload）的運作方式是將更新後的原始碼檔案注入到執行中的 Dart VM（虛擬機器）。
這不僅包括新增類別，還包括向現有類別新增方法和欄位，以及變更現有函式。
但有幾種類型的程式碼變更無法進行熱重載：

- 全域變數初始化器
- 靜態欄位初始化器
- 應用程式的 `main()` 方法

進行這些變更時，請重新啟動你的應用程式，但不需結束除錯階段。要執行熱重啟（hot restart），請在 [Command Palette][] 執行 **Flutter: Hot Restart** 指令。

你也可以按下
<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F5</kbd>
或在 macOS 上按 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>F5</kbd>。

## Flutter 屬性編輯器 {: #property-editor}

Flutter 屬性編輯器（Flutter Property Editor）是 [Flutter 擴充功能][Flutter extension] 提供的強大工具，讓你可以直接在視覺化介面中檢視並修改元件（Widget）屬性。

### 如何在 VS Code 開啟 Flutter 屬性編輯器

1. 點擊 VS Code 側邊欄的 Flutter 屬性編輯器 **圖示** ![Flutter Property Editor VS Code icon](/assets/images/docs/tools/devtools/property-editor-icon-vscode.png){:width="20px"}。
2. Flutter 屬性編輯器將會在側邊面板載入。
3. 詳細使用說明請參閱 Flutter 屬性編輯器[文件][documentation]。

![Flutter Property Editor side panel in VS Code](/assets/images/docs/tools/devtools/property-editor-vscode.png){:width="600px"}

[Flutter extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[documentation]: /tools/property-editor

## 疑難排解

### 已知問題與回饋

所有已知的錯誤皆記錄於問題追蹤器：[Dart and Flutter extensions GitHub issue tracker][issue tracker]。
我們歡迎各種回饋，包括錯誤/問題回報及功能需求。

在提交新問題前，請先：

- 在問題追蹤器中快速搜尋，確認該問題是否已被追蹤。
- 確認你已[更新](#updating)至最新版本的外掛程式。

提交新問題時，請附上 [flutter doctor][] 的輸出結果。

[Command Palette]: https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette
[DevTools]: /tools/devtools
[flutter doctor]: /resources/bug-reports/#provide-some-flutter-diagnostics
[Flutter inspector]: /tools/devtools/inspector
[Flutter's build modes]: /testing/build-modes
[Hot reload]: /tools/hot-reload
[let us know]: {{site.repo.this}}/issues/new
[issue tracker]: {{site.github}}/Dart-Code/Dart-Code/issues
[Running DevTools from VS Code]: /tools/devtools/vscode
[VS Code status bar]: /assets/images/docs/tools/vs-code/device_status_bar.png
