# 設定並試駕 Flutter

> 使用以 Code OSS 為基礎的編輯器（例如 VS Code）在您的裝置上設定 Flutter， 並開始開發您的第一個多平台應用程式！



了解如何使用任何基於 Code OSS 的編輯器（例如 VS Code）來設定你的 Flutter 開發環境，
並體驗 Flutter 的開發者使用流程。

如果你曾經使用過 Flutter 開發，
或者偏好使用其他編輯器或 IDE，
可以改為參照[自訂安裝說明][]。

:::note 你將達成的目標

- 安裝 Flutter 所需的軟體先決條件。
- 使用 VS Code 下載並安裝 Flutter。
- 從範例範本建立一支新的 Flutter 應用程式。
- 試用 Flutter 開發功能，例如有狀態的熱重載（hot reload）。

:::

[自訂安裝說明]: /install/custom

## 確認你的開發平台 {: #dev-platform}

本頁的說明已設定為涵蓋在 **Windows**{:.selected-os-text} 裝置上
安裝並試用 Flutter。

如果你想參照其他作業系統的說明，
請選擇以下其中一個。

<OSSelector />

## 下載必要的軟體 {: #download-prerequisites}

為了讓 Flutter 設定過程更加順暢，
請先安裝以下工具。

 1. <h3>設定 Linux 支援</h3>

    如果你尚未在 Chromebook 上設定 Linux 支援，
    請[開啟 Linux 支援][chromeos-linux]。

    如果你已開啟 Linux 支援，
    請依照[修正 Linux 問題][chromeos-linux-update]的說明確認它是最新版本。

 1. <h3>下載並安裝必要套件</h3>

    使用 `apt-get` 或你偏好的安裝方式，
    安裝以下套件的最新版本：

    - `curl`
    - `git`
    - `unzip`
    - `xz-utils`
    - `zip`
    - `libglu1-mesa`

    如果你想使用 `apt-get`，
    請以下列指令安裝這些套件：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並在之後編輯和除錯你的應用程式，
    請[安裝並設定 Visual Studio Code][vscode-install]。

    你也可以改為安裝並使用任何其他支援 VS Code 擴充功能的 Code OSS 編輯器。
    若選擇如此，在本文的其餘部分，
    請將 VS Code 視為你所選擇的編輯器。

{: .steps .chromeos-only}

 1. <h3>安裝 git</h3>

    **如果你已安裝 git，請跳到下一步：下載並安裝 Visual Studio Code。**

    在 Mac 上有幾種安裝 git 的方式，
    但我們推薦使用 XCode。
    這在你以 iOS 或 macOS 為目標平台進行建置時非常重要。

    ```console
    $ xcode-select --install
    ```

    如果你尚未安裝這些工具，
    應該會開啟一個對話框，確認你是否要安裝。
    點擊 **Install**，安裝完成後點擊 **Done**。

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並在之後編輯和除錯你的應用程式，
    請[安裝並設定 Visual Studio Code][vscode-install]。

    你也可以改為安裝並使用任何其他支援 VS Code 擴充功能的 Code OSS 編輯器。
    若選擇如此，在本文的其餘部分，
    請將 VS Code 視為你所選擇的編輯器。

{: .steps .macos-only}

 1. <h3>安裝 Git for Windows</h3>

    下載並安裝最新版本的 [Git for Windows][]。

    如需安裝或疑難排解的協助，
    請參閱 [Git 文件][git-install]。

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並在之後編輯和除錯你的應用程式，
    請[安裝並設定 Visual Studio Code][vscode-install]。

    你也可以改為安裝並使用任何其他支援 VS Code 擴充功能的 Code OSS 編輯器。
    若選擇如此，在本文的其餘部分，
    請將 VS Code 視為你所選擇的編輯器。

{: .steps .windows-only}

 1. <h3>下載並安裝必要套件</h3>

    使用你偏好的套件管理器或安裝方式，
    安裝以下套件的最新版本：

    - `curl`
    - `git`
    - `unzip`
    - `xz-utils`
    - `zip`
    - `libglu1-mesa`

    在使用 `apt-get` 的 Debian 系發行版（例如 Ubuntu）上，
    請以下列指令安裝這些套件：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並在之後編輯和除錯你的應用程式，
    請[安裝並設定 Visual Studio Code][vscode-install]。

    你也可以改為安裝並使用任何其他支援 VS Code 擴充功能的 Code OSS 編輯器。
    若選擇如此，在本文的其餘部分，
    請將 VS Code 視為你所選擇的編輯器。

{: .steps .linux-only}

[chromeos-linux]: https://support.google.com/chromebook/answer/9145439
[chromeos-linux-update]: https://support.google.com/chromebook/answer/9145439?hl=en#:~:text=Fix%20problems%20with%20Linux
[Git for Windows]: https://git-scm.com/downloads/win
[git-install]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[vscode-install]: https://code.visualstudio.com/docs/setup/setup-overview

## 安裝並設定 Flutter {: #install}

現在你已安裝 Git 和 VS Code，
請依照以下步驟使用 VS Code 安裝並設定 Flutter。

:::note 手動下載
如果你偏好手動安裝 Flutter，
請依照[手動安裝 Flutter][Install Flutter manually] 的說明操作。
:::

 1. <h3>啟動 VS Code</h3>

    如果尚未開啟，請透過 Spotlight 搜尋，或從安裝目錄手動開啟 VS Code。

 1. <h3>將 Flutter 擴充功能加入 VS Code</h3>

    若要將 Dart 和 Flutter 擴充功能加入 VS Code，
    請前往 [Flutter 擴充功能的 Marketplace 頁面][flutter-vscode]，
    然後點擊 **Install**。
    如果你的瀏覽器提示，請允許它開啟 VS Code。

 1. <h3>使用 VS Code 安裝 Flutter</h3>

    1. 在 VS Code 中開啟指令面板（Command Palette）。

       前往 **View** <span aria-label="and then">></span> **Command Palette**
       或按下 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. 在指令面板中，輸入 `flutter`。

    1. 選取 **Flutter: New Project**。

    1. VS Code 會提示你指定電腦上 Flutter SDK 的位置。
       選取 **Download SDK**。

    1. 當 **Select Folder for Flutter SDK** 對話框出現時，
       選擇你想要安裝 Flutter 的位置。

    1. 點擊 **Clone Flutter**。

       在下載 Flutter 期間，VS Code 會顯示以下彈出通知：

       ```console
       Downloading the Flutter SDK. This may take a few minutes.
       ```

       此下載需要數分鐘。
       如果你懷疑下載已停頓，請點擊 **Cancel**，然後
       重新開始安裝。

    1. 點擊 **Add SDK to PATH**。

       成功後，會顯示以下通知：

       ```console
       The Flutter SDK was added to your PATH
       ```

    1. VS Code 可能會顯示 Google Analytics 通知。

       如果你同意，請點擊 **OK**。

    1. 確認 Flutter 可在所有終端機中使用：

       1. 關閉所有終端機視窗，然後重新開啟。
       1. 重新啟動 VS Code。

       {:type="a"}

    :::note
    VS Code 的設定流程可能會檢查 Android Studio，如果未安裝可能會出現警告。
    如果你的目標平台是其他平台（例如 Web、iOS 或 macOS），可以安全地忽略此警告，安裝仍然會成功。
    完成後，執行 `flutter doctor` 驗證你的安裝。
    :::

 1. <h3>疑難排解安裝問題</h3>

    如果你在安裝過程中遇到任何問題，
    請參閱 [Flutter 安裝疑難排解][troubleshoot]。

{:.steps}

[Install Flutter manually]: /install/manual
[flutter-vscode]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[troubleshoot]: /install/troubleshoot


## 試駕 Flutter {: #test-drive}

現在您已設定好 VS Code 與 Flutter，
是時候建立一個應用程式並試試 Flutter 開發了！

 1. <h3>建立一個新的 Flutter 應用程式</h3>

    1. 在 VS Code 中開啟指令面板 (Command Palette)。

       前往 **View** <span aria-label="and then">></span> **Command Palette**
       或按下 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. 在指令面板中，開始輸入 `flutter:`。

       VS Code 應該會顯示來自 Flutter 插件的指令。

    1. 選擇 **Flutter: New Project** 指令。

       您的作業系統或 VS Code 可能會要求存取您的文件，
       同意後即可繼續下一步。

    1. 選擇 **Application** 範本 (template)。

       VS Code 應該會以 **Which Flutter template?** 提示您。
       選擇 **Application** 以建置 (bootstrap) 一個簡單的計數器應用程式。

    1. 為您的新應用程式資料夾建立或選擇上層目錄 (parent directory)。

       此時應該會出現一個檔案對話框。

       1. 選擇或建立您希望建立專案的上層目錄。
       1. 若要確認您的選擇，
          點擊 **Select a folder to create the project in**。

    1. 輸入您應用程式的名稱。

       VS Code 應該會提示您為新應用程式輸入名稱。
       輸入 `trying_flutter` 或類似的 `lowercase_with_underscores` 名稱。
       若要確認，請按 <kbd>Enter</kbd>。

    1. 等待專案初始化完成。

       工作進度通常會以右下角的通知顯示，
       也可以從 **Output** 面板存取。

    1. 開啟 `lib` 目錄，然後開啟 `main.dart` 檔案。

       如果您對程式碼各部分的功能感到好奇，
       請查閱檔案中各處的前置說明注釋。

 1. <h3>在網頁上執行您的應用程式</h3>

    雖然 Flutter 應用程式可以在許多平台上執行，
    先試著在網頁上執行您的新應用程式吧。

    1. 在 VS Code 中開啟指令面板。

       前往 **View** <span aria-label="and then">></span> **Command Palette**
       或按下 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. 在指令面板中，開始輸入 `flutter:`。

       VS Code 應該會顯示來自 Flutter 插件的指令。

    1. 選擇 **Flutter: Select Device** 指令。

    1. 在 **Select Device** 提示中，選擇 **Chrome**。

    1. 執行或開始對應用程式進行除錯。

       前往 **Run** <span aria-label="and then">></span>
       **Start Debugging** 或按下 <kbd>F5</kbd>。

       `flutter run` 用於建置 (build) 並啟動您的應用程式，
       接著會開啟一個新的 Chrome 視窗，
       並開始執行您新建立的應用程式。

 1. <h3>試試熱重載 (Hot Reload)</h3>

    Flutter 透過**有狀態熱重載 (stateful hot reload)** 提供快速的開發週期，
    讓您無需重新啟動或遺失應用程式狀態 (app state)，
    即可重新載入正在執行的應用程式程式碼。

    您可以變更應用程式的原始碼，
    在 VS Code 中執行熱重載指令，
    然後在正在執行的應用程式中看到變更。

    1. 在正在執行的應用程式中，試著點擊幾次
       ![increment (+)][increment-button]{: .text-icon} 按鈕來增加計數器的值。

    1. 在應用程式仍在執行的情況下，對 `lib/main.dart` 檔案進行修改。

       將 `_incrementCounter` 方法中的 `_counter++` 這行
       改為遞減 `_counter` 欄位。

       ```dart diff
         setState(() {
           // ...
       -   _counter++;
       +   _counter--;
         });
       ```

    1. 儲存您的變更
       (**File** <span aria-label="and then">></span> **Save All**) 或
       點擊 **Hot Reload** ![hot reload icon][]{: .text-icon} 按鈕。

       Flutter 會在不遺失任何現有狀態的情況下更新正在執行的應用程式。
       請注意現有的數值保持不變。

    1. 再次嘗試點擊
       ![increment (+)][increment-button]{: .text-icon} 按鈕。
       請注意數值減少而非增加。

 1. <h3>探索 Flutter 側邊欄</h3>

    Flutter 插件為 VS Code 新增了一個專屬側邊欄，
    用於管理 Flutter 除錯工作階段與裝置、
    檢視程式碼與元件 (Widget) 的概覽，
    以及存取 Dart 和 Flutter DevTools。

    1. 如果您的應用程式未在執行，請再次開始除錯。

       前往 **Run** <span aria-label="and then">></span>
       **Start Debugging** 或按下 <kbd>F5</kbd>。

    1. 在 VS Code 中開啟 Flutter 側邊欄。

       可透過側邊欄中的 Flutter ![Flutter logo][]{: .text-icon} 按鈕開啟，
       或在指令面板中執行 **Flutter: Focus on Flutter Sidebar View** 指令來開啟。

    1. 在 Flutter 側邊欄的 **DevTools** 下，
       點擊 **Flutter Inspector** 按鈕。

       VS Code 中應該會開啟一個獨立的 **Widget Inspector** 面板。

       在元件檢視器 (widget inspector) 中，您可以檢視應用程式的元件樹 (widget tree)、
       查看每個元件的屬性與版面配置，以及更多功能。

    1. 在元件檢視器中，試著點擊頂層的 `MyHomePage` 元件。

       應該會開啟其屬性與版面配置的檢視，
       VS Code 編輯器也會導覽並聚焦到
       包含該元件的那一行程式碼。

    1. 探索並試用元件檢視器和 Flutter 側邊欄中的其他功能。

{:.steps}

[increment-button]: /assets/images/docs/get-started/increment-button.png
[hot reload icon]: /assets/images/docs/get-started/hot-reload.svg
[Flutter logo]: /assets/images/branding/flutter/logo/square.svg

## 繼續您的 Flutter 學習之旅 {: #next-steps}

**恭喜！**
您已安裝並試用 Flutter，
接下來可以遵循 [Flutter 學習路徑][Flutter learning pathway]、
設定[其他目標平台][additional target platform]的開發環境，
或探索以下資源繼續您的 Flutter 學習之旅。

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-phone.svg" height="160" aria-hidden="true"
        alt="A representation of Flutter on multiple devices.">
    </div>
    <div class="card-header">
      <span class="card-title">Build for other platforms</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/android/setup">Target Android</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/ios/setup">Target iOS</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/macos/setup">Target macOS</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/windows/setup">Target Windows</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/linux/setup">Target Linux</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/pointing-the-way.png" height="160" aria-hidden="true"
        alt="Dash helping you explore Flutter learning resources.">
    </div>
    <div class="card-header">
      <span class="card-title">Learn Flutter development</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/learn/pathway">Learn the fundamentals</a>
        </li>
        <li>
          <a class="text-button"
            href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">
            Discover Flutter widgets</a>
        </li>
        <li>
          <a class="text-button" href="/reference/learning-resources">Explore learning resources</a>
        </li>
        <li>
          <a class="text-button" href="https://dart.dev/overview">
            <span>Learn Dart programming</span>
            <Icon id="open_in_new" size="1rem" />
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/up-to-date.png" height="160" aria-hidden="true"
        alt="Keep up to date with Flutter">
    </div>
    <div class="card-header">
      <span class="card-title">Stay up to date with Flutter</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/install/upgrade">Update Flutter</a>
        </li>
        <li>
          <a class="text-button" href="/release/release-notes">Find out what's new</a>
        </li>
        <li>
          <a class="text-button" href="https://medium.com/flutter">
            <span>Check out the blog</span>
            <Icon id="open_in_new" size="1rem" />
          </a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/@flutterdev">
            <span>Subscribe on YouTube</span>
            <Icon id="open_in_new" size="1rem" />
          </a>
        </li>
        <li>
          <a class="text-button" href="https://bsky.app/profile/flutter.dev">
            <span>Follow on Bluesky</span>
            <Icon id="open_in_new" size="1rem" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>


[Flutter learning pathway]: /learn/pathway
[additional target platform]: /platform-integration#setup

