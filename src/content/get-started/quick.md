---
title: 設定並試用 Flutter
shortTitle: 快速開始
description: >-
  在你的裝置上使用基於開源軟體（OSS）的編輯器，例如 VS Code，完成 Flutter 的設定，
  並開始開發你的第一個多平台 Flutter 應用程式！
showBanner: false
sitemap: false
---

學習如何使用任何基於開源軟體（OSS）的編輯器，例如 VS Code，
來設定你的 Flutter 開發環境，並體驗 Flutter 的開發者體驗。

如果你之前已經使用過 Flutter 進行開發，
或是你偏好使用其他編輯器或 IDE，
你也可以改為參考[自訂安裝指引][custom setup instructions]。

:::note 你將學會

- 安裝 Flutter 的軟體先決條件。
- 使用 VS Code 下載並安裝 Flutter。
- 從範本建立一個新的 Flutter 應用程式。
- 體驗如 stateful hot reload 等 Flutter 開發功能。

:::

[custom setup instructions]: /get-started/custom

## 確認你的開發平台 {: #dev-platform}

本頁的指引預設涵蓋
在 **Windows**{:.selected-os-text} 裝置上安裝與體驗 Flutter。

如果你想要參考其他作業系統的指引，
請選擇下方其中一項。

{% osSelector %}

## 下載必要軟體 {: #download-prerequisites}

為了讓 Flutter 安裝過程最順暢，
請先安裝以下工具。

 1. <h3>設定 Linux 支援</h3>

    如果你之前尚未在 Chromebook 上設定 Linux 支援，
    請[開啟 Linux 支援][chromeos-linux]。

    如果你已經開啟過 Linux 支援，
    請依照[修復 Linux 問題][chromeos-linux-update]的指引，確保其已是最新狀態。

 1. <h3>下載並安裝必要套件</h3>

    使用 `apt-get` 或你偏好的安裝方式，
    安裝下列套件的最新版本：

    - `curl`
    - `git`
    - `unzip`
    - `xz-utils`
    - `zip`
    - `libglu1-mesa`

    如果你想要使用 `apt-get`，
    請使用以下指令安裝這些套件：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並編輯與除錯您的應用程式，請[安裝並設定 Visual Studio Code][vscode-install]。

    您也可以安裝並使用任何其他支援 VS Code 擴充功能的 Code OSS-based 編輯器。
    如果您選擇這麼做，本文其餘部分所提到的 VS Code，請視為您選用的編輯器。

{: .steps .chromeos-only}

 1. <h3>安裝 git</h3>

    **如果您已經安裝了 git，請跳至下一步：下載並安裝 Visual Studio Code。**

    在您的 Mac 上安裝 git 有幾種方式，
    我們建議您使用 XCode 來安裝。
    當您將來要針對 iOS 或 macOS 進行建置時，這會非常重要。

    ```console
    $ xcode-select --install
    ```

    如果你尚未安裝相關工具，
    系統會跳出一個對話框，確認你是否要安裝這些工具。
    請點選 **Install**（安裝），安裝完成後再點選 **Done**（完成）。

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並編輯與除錯你的應用程式，
    請[安裝並設定 Visual Studio Code][vscode-install]。

    你也可以選擇安裝並使用其他支援 VS Code 擴充功能的 Code OSS-based 編輯器。
    如果你選擇這麼做，本文其餘部分所提到的 VS Code，請視為你所選擇的編輯器。

{: .steps .macos-only}

 1. <h3>安裝 Git for Windows</h3>

    下載並安裝最新版的 [Git for Windows][Git for Windows]。

    若需要安裝或疑難排解 Git 的協助，
    請參考 [Git 文件][git-install]。

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並編輯與除錯你的應用程式，
    請[安裝並設定 Visual Studio Code][vscode-install]。

    你也可以選擇安裝並使用其他支援 VS Code 擴充功能的 Code OSS-based 編輯器。
    如果你選擇這麼做，本文其餘部分所提到的 VS Code，請視為你所選擇的編輯器。

{: .steps .windows-only}

 1. <h3>下載並安裝必要套件</h3>

    使用你偏好的套件管理工具或安裝方式，
    安裝下列套件的最新版本：

    - `curl`
    - `git`
    - `unzip`
    - `xz-utils`
    - `zip`
    - `libglu1-mesa`

    在如 Ubuntu 這類支援 `apt-get` 的 Debian 系發行版中，
    可使用下列指令安裝這些套件：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並編輯與除錯你的應用程式，請[安裝並設定 Visual Studio Code][vscode-install]。

    你也可以選擇安裝並使用任何其他支援 VS Code 擴充功能的 Code OSS-based 編輯器。
    如果你選擇這麼做，本文其餘部分所提及的 VS Code，請視為你所選擇的編輯器。

{: .steps .linux-only}

[chromeos-linux]: https://support.google.com/chromebook/answer/9145439
[chromeos-linux-update]: https://support.google.com/chromebook/answer/9145439?hl=en#:~:text=Fix%20problems%20with%20Linux
[Git for Windows]: https://git-scm.com/downloads/win
[git-install]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[vscode-install]: https://code.visualstudio.com/docs/setup/setup-overview

## 安裝並設定 Flutter {: #install}

現在你已經安裝好 Git 與 VS Code，
請依照以下步驟，使用 VS Code 來安裝並設定 Flutter。

:::note 手動下載
如果你偏好手動安裝 Flutter，
請依照[手動安裝 Flutter][Install Flutter manually]的說明進行。
:::

 1. <h3>啟動 VS Code</h3>

    如果尚未開啟，請透過 Spotlight 搜尋或從安裝目錄手動開啟 VS Code。

 1. <h3>將 Flutter 擴充功能新增至 VS Code</h3>

    若要將 Dart 與 Flutter 擴充功能加入 VS Code，
    請前往 [Flutter 擴充功能的 marketplace 頁面][flutter-vscode]，
    然後點擊 **Install**。
    若瀏覽器出現提示，請允許其開啟 VS Code。

 1. <h3>使用 VS Code 安裝 Flutter</h3>

    1. 在 VS Code 中開啟指令面板。

       前往 **View** <span aria-label="and then">></span> **Command Palette**
       或按下 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. 在指令面板中輸入 `flutter`。

    1. 選擇 **Flutter: New Project**。

    1. VS Code 會提示你在電腦上定位 Flutter SDK。
       請選擇 **Download SDK**。

    1. 當出現 **Select Folder for Flutter SDK** 對話框時，
       請選擇你想安裝 Flutter 的位置。

    1. 點擊 **Clone Flutter**。

       在下載 Flutter 的過程中，VS Code 會顯示以下彈出通知：

       ```console
       Downloading the Flutter SDK. This may take a few minutes.
       ```

       此下載過程可能需要幾分鐘時間。
       如果你懷疑下載已經卡住，請點選 **取消**，然後
       重新開始安裝。

    1. 點選 **Add SDK to PATH**。

       完成後，會顯示一則通知：

       ```console
       The Flutter SDK was added to your PATH
       ```

    1. VS Code 可能會顯示 Google Analytics（分析）通知。

       如果你同意，請點擊 **OK**。

    1. 為確保 Flutter 可在所有終端機中使用：

       1. 關閉並重新開啟所有終端機視窗。
       1. 重新啟動 VS Code。

       {:type="a"}

 1. <h3>安裝疑難排解</h3>

    如果你在安裝過程中遇到任何問題，
    請參考 [Flutter 安裝疑難排解][troubleshoot]。

{:.steps}

[Install Flutter manually]: /install/manual
[flutter-vscode]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[troubleshoot]: /install/troubleshoot

## 試駕 Flutter {: #test-drive}

現在你已經完成 VS Code 與 Flutter 的設定，
是時候建立一個應用程式並體驗 Flutter 開發了！

 1. <h3>建立新的 Flutter 應用程式</h3>

    1. 在 VS Code 中開啟指令面板（Command Palette）。

       前往 **View** <span aria-label="and then">></span> **Command Palette**
       或按下 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. 在指令面板中開始輸入 `flutter:`。

       VS Code 應該會顯示來自 Flutter 外掛的相關指令。

    1. 選擇 **Flutter: New Project** 指令。

       你的作業系統或 VS Code 可能會請求存取你的文件，
       請同意以繼續下一步。

    1. 選擇 **Application** 範本。

       VS Code 應會提示 **Which Flutter template?**。
       請選擇 **Application**，以建立一個簡單的計數器應用程式。

    1. 建立或選擇新應用程式資料夾的父目錄。

       應會出現檔案對話框。

       1. 選擇或建立你希望專案建立於其中的父目錄。
       1. 要確認選擇，請點擊 **Select a folder to create the project in**。

    1. 輸入你的應用程式名稱。

       VS Code 應會提示你輸入新應用程式的名稱。
       輸入 `trying_flutter` 或類似的 `lowercase_with_underscores` 名稱。
       要確認選擇，請按下 <kbd>Enter</kbd>。

    1. 等待專案初始化完成。

       任務進度通常會以通知的形式顯示在右下角，
       也可以從 **Output** 面板中查看。

    1. 開啟 `lib` 目錄，然後開啟 `main.dart` 檔案。

       如果你想了解程式碼每個部分的作用，
       請參考檔案中的註解。

 1. <h3>在網頁上執行你的應用程式</h3>

    雖然 Flutter 應用程式可以在多種平台上運行，
    這裡建議你先在網頁上執行新建立的應用程式。

    1. 在 VS Code 中開啟指令面板（Command Palette）。

       前往 **View** <span aria-label="and then">></span> **Command Palette**
       或按下 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. 在指令面板中開始輸入 `flutter:`。

       VS Code 應該會顯示來自 Flutter 外掛的相關指令。

    1. 選擇 **Flutter: Select Device** 指令。

    1. 在 **Select Device** 提示中，選擇 **Chrome**。

    1. 執行或開始偵錯你的應用程式。

       前往 **Run** <span aria-label="and then">></span>
       **Start Debugging** 或按下 <kbd>F5</kbd>。

       `flutter run` 會用來建置並啟動你的應用程式，
       接著應會自動開啟新的 Chrome 視窗，
       並開始執行你新建立的應用程式。

 1. <h3>體驗熱重載（Hot Reload）</h3>

    Flutter 提供快速的開發循環，支援 **stateful hot reload**（有狀態熱重載），
    你可以在不重啟或不丟失應用程式狀態的情況下，
    重新載入正在執行中的應用程式程式碼。

    你可以修改應用程式的原始碼，
    在 VS Code 執行熱重載指令，
    然後立即在執行中的應用程式看到變更。

    1. 在執行中的應用程式裡，嘗試點擊 ![increment (+)][increment-button]{: .text-icon} 按鈕數次來增加計數器。

    1. 保持應用程式執行中，在 `lib/main.dart` 檔案中做出修改。

       將 `_incrementCounter` 方法中的 `_counter++` 行
       改為遞減 `_counter` 欄位的值。

       ```dart diff
         setState(() {
           // ...
       -   _counter++;
       +   _counter--;
         });
       ```

    1. 儲存你的變更
       （**檔案** <span aria-label="and then">></span> **全部儲存**）或
       點擊 **熱重載** ![hot reload icon][hot reload icon]{: .text-icon} 按鈕。

       Flutter 會在不丟失現有狀態的情況下，更新正在執行的應用程式。
       請注意，現有的值保持不變。

    1. 嘗試再次點擊
       ![increment (+)][increment-button]{: .text-icon} 按鈕。
       注意這次數值是減少而不是增加。

 1. <h3>探索 Flutter 側邊欄</h3>

    Flutter 外掛會在 VS Code 中新增專屬的側邊欄，
    用於管理 Flutter 除錯工作階段與裝置、
    檢視你的程式碼與元件（Widgets）的大綱，
    以及存取 Dart 與 Flutter DevTools。

    1. 如果你的應用程式尚未執行，請再次啟動除錯。

       前往 **執行** <span aria-label="and then">></span>
       **開始除錯** 或按下 <kbd>F5</kbd>。

    1. 在 VS Code 中開啟 Flutter 側邊欄。

       你可以點擊 VS Code 側邊欄上的 Flutter ![Flutter logo][Flutter logo]{: .text-icon} 按鈕開啟，
       或從命令面板執行 **Flutter: Focus on Flutter Sidebar View** 指令來開啟。

    1. 在 Flutter 側邊欄的 **DevTools** 區塊下，
       點擊 **Flutter Inspector** 按鈕。

       這時 VS Code 會另外開啟一個 **Widget Inspector** 面板。

       在元件檢查器（widget inspector）中，你可以檢視應用程式的元件樹（widget tree），
       檢視每個元件的屬性與版面配置，還有更多功能。

    1. 在元件檢查器中，嘗試點擊最上層的 `MyHomePage` 元件（Widget）。

       這時會顯示其屬性與版面配置的檢視，
       並且 VS Code 編輯器會自動跳轉並聚焦到該元件被引用的那一行。

    1. 探索並嘗試元件檢查器與 Flutter 側邊欄中的其他功能。

{:.steps}

[increment-button]: /assets/images/docs/get-started/increment-button.png
[hot reload icon]: /assets/images/docs/get-started/hot-reload.svg
[Flutter logo]: /assets/images/branding/flutter/logo/square.svg

## 持續你的 Flutter 旅程 {: #next-steps}

**恭喜你！**
現在你已經安裝並體驗過 Flutter，
可以繼續參考 [建立你的第一個應用程式][Building your first app] 的教學（codelab），
或設定 [其他目標平台][additional target platform] 的開發環境，
也可以探索以下這些資源，持續你的 Flutter 學習之旅。

{% render docs/get-started/setup-next-steps.html, site: site %}

[Building your first app]: /get-started/codelab
[additional target platform]: /platform-integration#setup
