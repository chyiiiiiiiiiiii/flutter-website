---
title: 建立新的 Flutter 應用程式
shortTitle: 建立新應用程式
description: >-
  學習如何在命令列、不同編輯器，甚至雲端中，快速啟動一個新的 Flutter 應用程式。
showBreadcrumbs: false
---

本頁將提供逐步說明，協助你在偏好的開發環境中
快速啟動一個新的 Flutter 應用程式。

要建立新的 Flutter 應用程式，請先[設定 Flutter][flutter-setup]，然後
選擇你偏好的開發環境，並依照對應的指引操作。

<div class="card-grid">
  <a class="card outlined-card" href="#vs-code">
    <div class="card-header">
      <span class="card-title">VS Code</span>
    </div>
    <div class="card-content">
      <p>在 VS Code 內直接建立新的 Flutter 應用程式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#android-studio">
    <div class="card-header">
      <span class="card-title">Android Studio</span>
    </div>
    <div class="card-content">
      <p>在 Android Studio 內直接建立新的 Flutter 應用程式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#intellij">
    <div class="card-header">
      <span class="card-title">IntelliJ</span>
    </div>
    <div class="card-content">
      <p>在 IntelliJ 系列 IDE 內直接建立新的 Flutter 應用程式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#antigravity">
    <div class="card-header">
      <span class="card-title">Antigravity</span>
    </div>
    <div class="card-content">
      <p>如需 AI 輔助編碼支援，可在 Antigravity 中建立新的 Flutter 應用程式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#terminal">
    <div class="card-header">
      <span class="card-title">Terminal</span>
    </div>
    <div class="card-content">
      <p>追求最大彈性時，可從命令列建立新的 Flutter 應用程式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/add-to-app#get-started">
    <div class="card-header">
      <span class="card-title">
        <span>新增至現有應用程式</span>
        <Icon id="open_in_new" size="1rem" />
      </span>
    </div>
    <div class="card-content">
      <p>建立新的 Flutter 模組並嵌入至現有應用程式中。</p>
    </div>
  </a>
</div>

## VS Code

若要使用 [VS Code][VS Code] 或其他基於 Code OSS 的編輯器建立 Flutter 應用程式，
請先[安裝 Flutter][flutter-setup]並
[設定 VS Code][vscode-setup] 以進行 Flutter 開發。
接著依照以下步驟操作：

 1. <h3>啟動 VS Code</h3>

    開啟 VS Code 或你偏好的 Code OSS 編輯器。

 1. <h3>開啟命令面板</h3>

    前往 **檢視** <span aria-label="and then">></span> **命令面板**，
    或按下 <kbd class="special-key">Cmd/Ctrl</kbd> +
    <kbd>Shift</kbd> + <kbd>P</kbd>。

 1. <h3>尋找 Flutter 指令</h3>

    在命令面板中開始輸入 `flutter:`。
    VS Code 應會顯示來自 Flutter 外掛的相關指令。

 1. <h3>執行新專案指令</h3>

    選擇 **Flutter: New Project** 指令。
    作業系統或 VS Code 可能會要求存取你的文件，
    請同意以繼續下一步。

 1. <h3>選擇範本</h3>

    VS Code 應會提示你選擇 **Which Flutter template?**。
    根據你想建立的 Flutter 專案類型，
    選擇對應的範本。
    若要建立新的 Flutter 應用程式，請選擇 **Application**。

 1. <h3>選擇專案位置</h3>

    應會出現檔案對話框。
    請選擇或建立你希望放置專案的父目錄。
    不需要自行建立專案資料夾，Flutter 工具會自動建立。
    確認選擇後，
    點擊 **Select a folder to create the project in**。

 1. <h3>輸入專案名稱</h3>

    VS Code 會提示你輸入新專案的名稱。
    請輸入符合 `lowercase_with_underscores`
    命名規範的應用程式名稱，並遵循 [Effective Dart][package-name] 指南。
    確認後，按下 <kbd>Enter</kbd>。

 1. <h3>等待專案初始化</h3>

    根據你輸入的資訊，
    VS Code 會使用 `flutter create` 來啟動你的應用程式。
    進度通常會以右下角通知顯示，
    也可在 **Output** 面板中查看。

 1. <h3>執行你的應用程式</h3>

    你的新應用程式現在應已建立並在 VS Code 中開啟。
    若要體驗新應用程式，
    請依照 [在 VS Code 執行與除錯][vscode-run] 的步驟操作。

{:.steps}

你已成功在 VS Code 中建立新的 Flutter 應用程式！
若需要更多關於在 VS Code 開發 Flutter 的協助，
請參考 [Flutter 的 VS Code 參考文件][vscode-more]。

[VS Code]: https://code.visualstudio.com/
[vscode-setup]: /tools/vs-code#installation-and-setup
[vscode-run]: /tools/vs-code#running-and-debugging
[vscode-more]: /tools/vs-code

## Android Studio

若要使用 Android Studio 建立 Flutter 應用程式，
請先[安裝 Flutter][flutter-setup]並
[設定 Android Studio][as-setup] 以進行 Flutter 開發。
接著依照以下步驟操作：

 1. <h3>啟動 Android Studio</h3>

    開啟已安裝 Dart 與 Flutter 外掛的 Android Studio。

 1. <h3>開始建立專案</h3>

    如果你在 IDE 歡迎畫面（顯示 **Welcome to Android Studio**），
    請在中央找到並點擊 **New Flutter Project** 按鈕。

    若你已開啟其他專案，可先關閉該專案，或
    前往 **File** <span aria-label="and then">></span> **New**
    <span aria-label="and then">></span> **New Flutter Project...**。

 1. <h3>選擇專案類型</h3>

    在 **New Project** 對話框左側的 **Generators** 區塊中，
    選擇 **Flutter**。

 1. <h3>確認 Flutter SDK 設定</h3>

    在右側面板頂部，請確保 **Flutter SDK path** 的路徑
    與你要開發的 Flutter SDK 位置相符。
    若不相符，請選擇或指定正確的路徑。

 1. <h3>設定專案</h3>

    點擊 **Next** 進入專案設定。
    會出現多個設定選項。

    在 **Project name** 欄位，請輸入符合
    `lowercase_with_underscores` 命名規範的應用程式名稱，
    並遵循 [Effective Dart][package-name] 指南。

    若你不是要建立應用程式，
    請從 **Project type** 下拉選單選擇其他範本。

    若你預計將來會發佈此應用程式，
    請將 **Organization** 欄位[設為你的公司網域][as-set-org]。

    其他欄位可維持預設值，或依專案需求調整。

 1. <h3>完成專案建立</h3>

    完成專案設定後，
    點擊 **Create** 開始初始化專案。

 1. <h3>等待工作區初始化</h3>

    Android Studio 會初始化你的工作區，
    建立專案檔案結構，
    並下載應用程式所需的相依套件。
    這個過程可能需要一些時間，可在視窗底部追蹤進度。

 1. <h3>執行你的應用程式</h3>

    你的新應用程式現在應已建立並在 Android Studio 中開啟。
    若要體驗新應用程式，
    請依照 [在 Android Studio 執行與除錯][as-run] 的步驟操作。

{:.steps}

你已成功在 Android Studio 中建立新的 Flutter 應用程式！
若需要更多關於在 Android Studio 開發 Flutter 的協助，
請參考 [Flutter 的 Android Studio 參考文件][as-more]。

[as-setup]: /tools/android-studio#installation-and-setup
[as-set-org]: /tools/android-studio#set-the-company-domain
[as-run]: /tools/android-studio#running-and-debugging
[as-more]: /tools/android-studio

## IntelliJ

若要使用 IntelliJ 或其他 JetBrains IDE 建立 Flutter 應用程式，
請先[安裝 Flutter][flutter-setup]並
[設定 IntelliJ][ij-setup] 以進行 Flutter 開發。
接著依照以下步驟操作：

 1. <h3>啟動 IntelliJ</h3>

    開啟 IntelliJ IDEA 或你偏好的 JetBrains IntelliJ 系列 IDE，
    並確保已安裝 Dart 與 Flutter 外掛。

 1. <h3>開始建立專案</h3>

    如果你在 IDE 歡迎畫面（顯示 **Welcome to IntelliJ IDEA**），
    請在右上角找到並點擊 **New Project** 按鈕。

    若你已開啟其他專案，可先關閉該專案，或
    前往 **File** <span aria-label="and then">></span> **New**
    <span aria-label="and then">></span> **New Project...**。

 1. <h3>選擇專案類型</h3>

    在 **New Project** 對話框左側的 **Generators** 區塊中，
    選擇 **Flutter**。

 1. <h3>確認 Flutter SDK 設定</h3>

    在右側面板頂部，請確保 **Flutter SDK path** 的路徑
    與你要開發的 Flutter SDK 位置相符。
    若不相符，請選擇或指定正確的路徑。

 1. <h3>設定專案</h3>

    點擊 **Next** 進入專案設定。
    會出現多個設定選項。

    在 **Project name** 欄位，請輸入符合
    `lowercase_with_underscores` 命名規範的應用程式名稱，
    並遵循 [Effective Dart][package-name] 指南。

    若你不是要建立應用程式，
    請從 **Project type** 下拉選單選擇其他範本。

    若你預計將來會發佈此應用程式，
    請將 **Organization** 欄位設為你的公司網域。

    其他欄位可維持預設值，或依專案需求調整。

 1. <h3>完成專案建立</h3>

    完成專案設定後，
    點擊 **Create** 開始初始化專案。

 1. <h3>等待工作區初始化</h3>

    IntelliJ 會初始化你的工作區，
    建立專案檔案結構，
    並下載應用程式所需的相依套件。
    這個過程可能需要一些時間，可在視窗底部追蹤進度。

 1. <h3>執行你的應用程式</h3>

    你的新應用程式現在應已建立並在 IntelliJ 中開啟。
    若要體驗新應用程式，
    請依照 [在 IntelliJ 執行與除錯][ij-run] 的步驟操作。

{:.steps}

你已成功在 IntelliJ 中建立新的 Flutter 應用程式！
若需要更多關於在 IntelliJ 開發 Flutter 的協助，
請參考 [Flutter 的 IntelliJ 參考文件][ij-more]。

[ij-setup]: /tools/android-studio#installation-and-setup
[ij-more]: /tools/android-studio
[ij-run]: /tools/android-studio#running-and-debugging

<a id="project-idx" aria-hidden="true"></a>

## Antigravity

若要使用 Antigravity 建立 Flutter 應用程式，請先安裝並設定 Antigravity，
詳情請參閱 [Antigravity 頁面](/ai/antigravity)。
接著依照以下步驟操作：

 1. <h3>開啟 Antigravity 並建立工作區</h3>

    啟動 Antigravity IDE，並透過 Agent Manager 為你的專案建立一個新的
    沙盒工作區。

 1. <h3>使用 Agent Manager</h3>

    切換至 Agent Manager 介面，
    這是你透過對話方式與 AI 代理程式互動的地方。

 1. <h3>撰寫詳細的提示</h3>

    使用詳細、有條理的提示向代理程式說明你的應用程式需求，
    就像向初階開發人員提供指示一樣。
    例如：「建立一個名為 my_app 的新 Flutter 專案。
    新增一個包含項目清單與浮動操作按鈕的首頁畫面」。

 1. <h3>審閱並核准計畫</h3>

    AI 代理程式將產生詳細的實作計畫，
    包含資料夾結構、相依套件與步驟說明。
    你可以審閱此計畫，點擊 **Proceed** 繼續，
    或提供回饋以進行修改。

 1. <h3>授權操作</h3>

    代理程式在執行終端機指令（例如 `flutter pub add` 或 `flutter create`）
    或存取瀏覽器/模擬器之前，會先請求你的許可。
    審閱後點擊 **Accept** 以允許代理程式建置應用程式。

 1. <h3>反覆調整與優化</h3>

    初始應用程式產生後，
    你可以繼續提供提示來新增功能、
    調整 UI、實作邏輯，或新增持久化功能
    （例如：「使用 shared_preferences 新增本機儲存功能」）。

 1. <h3>測試應用程式</h3>

    使用內建的模擬器或連接實體裝置
    來測試應用程式。代理程式甚至可以執行測試，
    並提供功能的影片說明。

 1. <h3>在編輯器中驗證程式碼</h3>

    你可以隨時切換至標準程式碼編輯器檢視，
    以檢查產生的 Dart 與 Flutter 檔案，
    確認程式碼品質符合你的標準。

{:.steps}

## Terminal

若要在終端機中建立 Flutter 應用程式，
請先安裝並[設定 Flutter][flutter-setup]。
接著依照以下步驟操作：

 1. <h3>開啟終端機</h3>

    開啟你偏好的命令列存取方式，
    例如 macOS 上的 Terminal 或 Windows 上的 PowerShell。

 1. <h3>切換至所需目錄</h3>

    請確保目前的工作目錄
    是你新應用程式所需的父目錄。
    不需要自行建立專案資料夾，`flutter` 工具會自動建立。

 1. <h3>設定專案建立選項</h3>

    在終端機中輸入 `flutter create` 指令，
    並傳入任何所需的旗標與選項來設定你的專案。
    例如，若要建立一個含有最精簡 `main.dart` 檔案的應用程式，
    可以加入 `--empty` 選項：

    ```console
    $ flutter create --empty
    ```

    若要瞭解可用的建立選項，請在另一個終端機視窗中執行 `flutter create --help`。

 1. <h3>輸入專案名稱</h3>

    作為 `flutter create` 唯一的非選項參數，
    請指定你的應用程式目錄及預設名稱。
    名稱應遵循 `lowercase_with_underscores` 命名規範，
    並依照 [Effective Dart][package-name] 指南。

    例如，若你想建立一個名為 `my_app` 的應用程式：

    ```console
    $ flutter create my_app
    ```

 1. <h3>執行已設定的指令</h3>

    若要依照你指定的設定建立專案，
    請執行你在前一個步驟組成的指令。

 1. <h3>等待專案初始化</h3>

    `flutter` 工具現在會初始化你的專案檔案結構，
    並下載所有必要的相依套件。
    這個過程可能需要一些時間。

 1. <h3>進入專案目錄</h3>

    現在你的專案已經建立完成，
    你可以在終端機或你偏好的編輯器中切換到該目錄。
    例如，若你使用 bash shell，且專案名稱為 `my_app`：

    ```console
    $ cd my_app
    ```

 1. <h3>執行你的應用程式</h3>

    若要嘗試你的新應用程式，
    請在終端機中執行 `flutter run` 指令，
    並依照提示選擇輸出裝置。

{:.steps}

你已成功在終端機中建立新的 Flutter 應用程式！
若需要協助設定專案或使用 `flutter` 命令列介面 (CLI) 工具，
請參閱 [Flutter CLI 參考文件][cli-reference]。

[cli-reference]: /reference/flutter-cli

[flutter-setup]: /install
[package-name]: {{site.dart-site}}/effective-dart/style#do-name-packages-and-file-system-entities-using-lowercase-with-underscores
