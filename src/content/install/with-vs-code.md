---
title: 使用 VS Code 安裝 Flutter
shortTitle: 使用 VS Code 安裝
breadcrumb: 使用 VS Code
description: >-
  學習如何利用 VS Code 快速安裝與設定 Flutter SDK。
---

學習如何在基於 Code OSS 的編輯器中安裝與設定 Flutter。
這包含（但不限於）[VS Code][VS Code]、[Cursor][Cursor] 以及 [Windsurf][Windsurf]。

[VS Code]: https://code.visualstudio.com
[Cursor]: https://cursor.com/
[Windsurf]: https://windsurf.com/

:::tip
如果你從未設定過 Flutter 或開發過 Flutter 應用程式，
請改為參考 [設定並試用 Flutter][Set up and test drive Flutter]。
:::

[Set up and test drive Flutter]: /get-started/quick

## 選擇你的開發平台 {: #dev-platform}

本頁的指引預設用於在 **Windows**{:.selected-os-text} 裝置上安裝 Flutter。

如果你想查看其他作業系統的指引，
請選擇下列其中一項。

{% osSelector %}

## 下載必要軟體 {: #download-prerequisites}

為了讓 Flutter 安裝過程更順利，
請先安裝以下工具。

 1. <h3>設定 Linux 支援</h3>

    如果你之前尚未在 Chromebook 上設定 Linux 支援，
    請先[開啟 Linux 支援][chromeos-linux]。

    如果你已經開啟 Linux 支援，
    請依照[修復 Linux 問題][chromeos-linux-update]的說明，確保其為最新狀態。

 1. <h3>下載並安裝必要套件</h3>

    使用 `apt-get` 或你偏好的安裝方式，
    安裝下列套件的最新版本：

    - `curl`
    - `git`
    - `unzip`
    - `xz-utils`
    - `zip`
    - `libglu1-mesa`

    如果你想使用 `apt-get`，
    請使用以下指令安裝這些套件：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並編輯及除錯你的應用程式，請[安裝並設定 Visual Studio Code][vscode-install]。

{: .steps .chromeos-only}

 1. <h3>安裝 Xcode 命令列工具</h3>

    下載 Xcode 命令列工具，以取得 Flutter 依賴的命令列工具，包括 Git。

    要下載這些工具，請在你偏好的終端機中執行以下指令：

    ```console
    $ xcode-select --install
    ```

    如果你尚未安裝這些工具，
    系統應會跳出一個對話視窗，確認你是否要安裝它們。
    請點選 **Install**（安裝），安裝完成後再點選 **Done**（完成）。

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並編輯與除錯你的應用程式，
    請[安裝並設定 Visual Studio Code][vscode-install]。

{: .steps .macos-only}

 1. <h3>安裝 Git for Windows</h3>

    下載並安裝最新版的 [Git for Windows][Git for Windows]。

    如需安裝或疑難排解 Git 的協助，
    請參考 [Git 文件][git-install]。

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並編輯與除錯你的應用程式，
    請[安裝並設定 Visual Studio Code][vscode-install]。

{: .steps .windows-only}

 1. <h3>下載並安裝必要套件</h3>

    使用你偏好的套件管理工具或安裝方式，
    安裝下列套件的最新版：

    - `curl`
    - `git`
    - `unzip`
    - `xz-utils`
    - `zip`
    - `libglu1-mesa`

    在以 Debian 為基礎的發行版（如 Ubuntu）且有 `apt-get` 的情況下，
    可使用以下指令安裝這些套件：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

 1. <h3>下載並安裝 Visual Studio Code</h3>

    若要快速安裝 Flutter，並編輯與除錯您的應用程式，
    請[安裝並設定 Visual Studio Code][vscode-install]。

{: .steps .linux-only}

[chromeos-linux]: https://support.google.com/chromebook/answer/9145439
[chromeos-linux-update]: https://support.google.com/chromebook/answer/9145439?hl=en#:~:text=Fix%20problems%20with%20Linux
[Git for Windows]: https://git-scm.com/downloads/win
[git-install]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[vscode-install]: https://code.visualstudio.com/docs/setup/setup-overview

## 安裝與設定 Flutter {: #install-flutter}

現在您已經安裝好 Git 和 VS Code，
請依照下列步驟，使用 VS Code 來安裝與設定 Flutter。

 1. <h3>啟動 VS Code</h3>

    如果尚未開啟 VS Code，請透過 Spotlight 搜尋，
    或從安裝目錄手動開啟 VS Code。

 1. <h3>將 Flutter 擴充功能加入 VS Code</h3>

    若要將 Dart 與 Flutter 擴充功能加入 VS Code，
    請前往 [Flutter 擴充功能的 marketplace 頁面][flutter-vscode]，
    並點擊 **Install**。
    若瀏覽器跳出提示，請允許其開啟 VS Code。

 1. <h3>使用 VS Code 安裝 Flutter</h3>

    1. 在 VS Code 中開啟命令面板。

       前往 **View** <span aria-label="and then">></span> **Command Palette**
       或按下 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. 在命令面板中輸入 `flutter`。

    1. 選擇 **Flutter: New Project**。

    1. VS Code 會提示您在電腦上選擇 Flutter SDK 的位置。
       請選擇 **Download SDK**。

    1. 當出現 **Select Folder for Flutter SDK** 對話框時，
       請選擇您想安裝 Flutter 的位置。

    1. 點擊 **Clone Flutter**。

       在下載 Flutter 的過程中，VS Code 會顯示以下彈出通知：

       ```console
       Downloading the Flutter SDK. This may take a few minutes.
       ```

       此下載過程可能需要幾分鐘時間。
       如果你懷疑下載已經卡住，請點選 **取消**，然後
       重新開始安裝流程。

    1. 點選 **Add SDK to PATH**。

       當操作成功時，會顯示通知：

       ```console
       The Flutter SDK was added to your PATH
       ```

    1. VS Code 可能會顯示 Google Analytics（分析）通知。

       如果你同意，請點選 **OK**。

    1. 為確保 Flutter 可在所有終端機中使用：

       1. 關閉並重新開啟所有終端機視窗。
       1. 重新啟動 VS Code。

       {:type="a"}

 1. <h3>驗證你的安裝環境</h3>

    為確保你已正確安裝 Flutter，
    請在你偏好的終端機中執行 `flutter doctor -v`。

    如果找不到該指令或出現錯誤，
    請參考 [Flutter 安裝疑難排解][troubleshoot]。

{:.steps}

[Install Flutter manually]: /install/manual
[flutter-vscode]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[troubleshoot]: /install/troubleshoot

## 繼續你的 Flutter 之旅 {: #next-steps}

現在你已成功安裝 Flutter，
請為至少一個目標平台完成開發環境設定，
以繼續你的 Flutter 之旅。

:::recommend
如果你還沒有偏好的開發目標平台，
Flutter 團隊建議你可以先嘗試
[開發網頁應用程式][web-setup]！
:::

[web-setup]: /platform-integration/web/setup

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-phone.svg" height="160" aria-hidden="true" alt="A representation of Flutter on multiple devices.">
    </div>
    <div class="card-header">
      <span class="card-title">設定目標平台</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/web/setup">目標 Web</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/android/setup">目標 Android</a>
        </li>
        <li class="macos-only">
          <a class="text-button" href="/platform-integration/ios/setup">目標 iOS</a>
        </li>
        <li class="macos-only">
          <a class="text-button" href="/platform-integration/macos/setup">目標 macOS</a>
        </li>
        <li class="windows-only">
          <a class="text-button" href="/platform-integration/windows/setup">目標 Windows</a>
        </li>
        <li class="linux-only">
          <a class="text-button" href="/platform-integration/linux/setup">目標 Linux</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/pointing-the-way.png" height="160" aria-hidden="true" alt="Dash helping you explore Flutter learning resources.">
    </div>
    <div class="card-header">
      <span class="card-title">學習 Flutter 開發</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/get-started/codelab">撰寫你的第一個應用程式</a>
        </li>
        <li>
          <a class="text-button" href="/get-started/fundamentals">學習基礎知識</a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">探索 Flutter 元件 (Widgets)</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/up-to-date.png" height="160" aria-hidden="true" alt="Keep up to date with Flutter">
    </div>
    <div class="card-header">
      <span class="card-title">隨時掌握 Flutter 最新動態</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/install/upgrade">更新 Flutter</a>
        </li>
        <li>
          <a class="text-button" href="/release/release-notes">了解最新功能</a>
        </li>
        <li>
          <a class="text-button" href="{{site.social.youtube}}">訂閱 YouTube 頻道</a>
        </li>
      </ul>
    </div>
  </div>
</div>
