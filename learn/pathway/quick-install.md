# 快速安裝

> 本頁將引導您完成 Flutter 的快速安裝流程。




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


## 開始學習！

安裝 Flutter SDK 時會自動一併安裝 Dart。現在您可以開始建置 Flutter 應用程式了！

<Card title="選用：從 Dart 開始" additional-classes="display-card">
  <p>

如果您是程式設計新手，可以先從 Dart 入門教學開始，學習 Dart 程式語言的基本概念。本教學的設計可銜接到 Flutter 入門教學。

  </p>
  <a href="https://dart.dev/learn/tutorial" class="outlined-button">開始學習</a>
</Card>

如果您已熟悉程式設計，可以跳過 Dart 教學，直接進入第一堂 Flutter 課程。

