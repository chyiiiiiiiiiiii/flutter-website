---
title: 建立新的 Flutter 應用程式
shortTitle: 建立新應用程式
description: >-
  學習如何從命令列、不同的編輯器，甚至雲端環境，快速啟動一個全新的 Flutter 應用程式。
---

本頁將提供逐步說明，教你如何在你偏好的開發環境中
快速啟動（bootstrap）一個新的 Flutter 應用程式。

要建立新的 Flutter 應用程式，請先[設定 Flutter][flutter-setup]，然後
選擇你偏好的環境並依照對應的說明操作。

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
  <a class="card outlined-card" href="#firebase-studio">
    <div class="card-header">
      <span class="card-title">Firebase Studio</span>
    </div>
    <div class="card-content">
      <p>快速且簡易地在 Firebase Studio 建立新的 Flutter 應用程式。</p>
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
        <span>Add to app</span>
        <span class="material-symbols" aria-hidden="true" style="font-size: 1rem;" translate="no">open_in_new</span>
      </span>
    </div>
    <div class="card-content">
      <p>建立新的 Flutter 模組，嵌入至現有應用程式中。</p>
    </div>
  </a>
</div>

## VS Code

若要使用 [VS Code][VS Code] 或其他基於 Code OSS 的編輯器建立 Flutter 應用程式，
你需要先[安裝 Flutter][flutter-setup]並
[設定 VS Code][vscode-setup]以進行 Flutter 開發。
接著請依照以下步驟操作：

 1. <h3>啟動 VS Code</h3>

    開啟 VS Code 或你偏好的 Code OSS 編輯器。

 1. <h3>開啟命令選擇器（Command Palette）</h3>

    前往 **View** <span aria-label="and then">></span> **Command Palette**，或
    按下 <kbd class="special-key">Cmd/Ctrl</kbd> +
    <kbd>Shift</kbd> + <kbd>P</kbd>。

 1. <h3>尋找 Flutter 指令</h3>

    在命令選擇器中開始輸入 `flutter:`。
    VS Code 應會顯示來自 Flutter 外掛的相關指令。

 1. <h3>執行新專案指令</h3>

    選擇 **Flutter: New Project** 指令。
    你的作業系統或 VS Code 可能會要求存取你的文件，
    請同意以繼續下一步。

 1. <h3>選擇範本</h3>

    VS Code 應會提示你選擇 **Which Flutter template?**。
    根據你想建立的 Flutter 專案類型，
    選擇對應的範本。
    若要建立新的 Flutter 應用程式，請選擇 **Application**。

 1. <h3>選擇專案位置</h3>

    會出現檔案對話框。
    請選擇或建立你希望建立專案的父目錄。
    不需要自行建立專案資料夾，Flutter 工具會自動建立。
    確認選擇後，
    點擊 **Select a folder to create the project in**。

 1. <h3>輸入專案名稱</h3>

    VS Code 會提示你輸入新專案的名稱。
    請輸入符合 `lowercase_with_underscores`
    命名規範且遵循 [Effective Dart][package-name] 指南的應用程式名稱。
    確認後請按 <kbd>Enter</kbd>。

 1. <h3>等待專案初始化</h3>

    根據你輸入的資訊，
    VS Code 會使用 `flutter create` 來初始化你的應用程式。
    進度通常會以右下角通知顯示，
    也可於 **Output** 面板中查看。

 1. <h3>執行你的應用程式</h3>

    你的新應用程式現在應已建立並在 VS Code 中開啟。
    若要試用新應用程式，
    請依照 [在 VS Code 執行與除錯][vscode-run] 的步驟操作。

{:.steps}

你已成功在 VS Code 建立新的 Flutter 應用程式！
若需要更多在 VS Code 開發 Flutter 的協助，
請參考 [VS Code for Flutter 參考文件][vscode-more]。

[VS Code]: https://code.visualstudio.com/
[vscode-setup]: /tools/vs-code#installation-and-setup
[vscode-run]: /tools/vs-code#running-and-debugging
[vscode-more]: /tools/vs-code

## Android Studio

若要使用 Android Studio 建立 Flutter 應用程式，
你需要先[安裝 Flutter][flutter-setup]並
[設定 Android Studio][as-setup]以進行 Flutter 開發。
接著請依照以下步驟操作：

 1. <h3>啟動 Android Studio</h3>

    開啟已安裝 Dart 與 Flutter 外掛的 Android Studio。

 1. <h3>開始建立專案</h3>

    若你在 IDE 歡迎畫面（**Welcome to Android Studio**），
    請在中央找到並點擊 **New Flutter Project** 按鈕。

    若你已開啟其他專案，可先關閉，
    或前往 **File** <span aria-label="and then">></span> **New**
    <span aria-label="and then">></span> **New Flutter Project...**。

 1. <h3>選擇專案類型</h3>

    在 **New Project** 對話框左側的 **Generators** 區塊中，
    選擇 **Flutter**。

 1. <h3>確認 Flutter SDK 設定</h3>

    在右側面板頂部，確認 **Flutter SDK path** 的路徑
    是否為你想開發用的 Flutter SDK 位置。
    若不是，請選擇或指定正確路徑。

 1. <h3>設定專案</h3>

    點擊 **Next** 以繼續專案設定。
    會出現多個設定選項。

    在 **Project name** 欄位，輸入符合
    `lowercase_with_underscores` 命名規範且遵循 [Effective Dart][package-name] 指南的應用程式名稱。

    若你不是要建立應用程式，
    請從 **Project type** 下拉選單選擇其他範本。

    若你將來可能會發佈此應用程式，
    請將 **Organization** 欄位[設為你的公司網域][as-set-org]。

    其他欄位可保持預設，或依專案需求調整。

 1. <h3>完成專案建立</h3>

    完成專案設定後，
    點擊 **Create** 開始初始化專案。

 1. <h3>等待工作區初始化</h3>

    Android Studio 會開始初始化你的工作區，
    建立專案檔案結構，
    並下載應用程式所需的相依套件。
    這可能需要一段時間，可在視窗下方追蹤進度。

 1. <h3>執行你的應用程式</h3>

    你的新應用程式現在應已建立並在 Android Studio 中開啟。
    若要試用新應用程式，
    請依照 [在 Android Studio 執行與除錯][as-run] 的步驟操作。

{:.steps}

你已成功在 Android Studio 建立新的 Flutter 應用程式！
若需要更多在 Android Studio 開發 Flutter 的協助，
請參考 [Android Studio for Flutter 參考文件][as-more]。

[as-setup]: /tools/android-studio#installation-and-setup
[as-set-org]: /tools/android-studio#set-the-company-domain
[as-run]: /tools/android-studio#running-and-debugging
[as-more]: /tools/android-studio

## IntelliJ

若要使用 IntelliJ 或其他 JetBrains IDE 建立 Flutter 應用程式，
你需要先[安裝 Flutter][flutter-setup]並
[設定 IntelliJ][ij-setup]以進行 Flutter 開發。
接著請依照以下步驟操作：

 1. <h3>啟動 IntelliJ</h3>

    開啟 IntelliJ IDEA 或你偏好的 JetBrains IntelliJ 系列 IDE，
    並確保已安裝 Dart 與 Flutter 外掛。

 1. <h3>開始建立專案</h3>

    若你在 IDE 歡迎畫面（**Welcome to IntelliJ IDEA**），
    請在右上角找到並點擊 **New Project** 按鈕。

    若你已開啟其他專案，可先關閉，
    或前往 **File** <span aria-label="and then">></span> **New**
    <span aria-label="and then">></span> **New Project...**。

 1. <h3>選擇專案類型</h3>

    在 **New Project** 對話框左側的 **Generators** 區塊中，
    選擇 **Flutter**。

 1. <h3>確認 Flutter SDK 設定</h3>

    在右側面板頂部，確認 **Flutter SDK path** 的路徑
    是否為你想開發用的 Flutter SDK 位置。
    若不是，請選擇或指定正確路徑。

 1. <h3>設定專案</h3>

    點擊 **Next** 以繼續專案設定。
    會出現多個設定選項。

    在 **Project name** 欄位，輸入符合
    `lowercase_with_underscores` 命名規範且遵循 [Effective Dart][package-name] 指南的應用程式名稱。

    若你不是要建立應用程式，
    請從 **Project type** 下拉選單選擇其他範本。

    若你將來可能會發佈此應用程式，
    請將 **Organization** 欄位[設為你的公司網域][ij-set-org]。

    其他欄位可保持預設，或依專案需求調整。

 1. <h3>完成專案建立</h3>

    完成專案設定後，
    點擊 **Create** 開始初始化專案。

 1. <h3>等待工作區初始化</h3>

    IntelliJ 會開始初始化你的工作區，
    建立專案檔案結構，
    並下載應用程式所需的相依套件。
    這可能需要一段時間，可在視窗下方追蹤進度。

 1. <h3>執行你的應用程式</h3>

    你的新應用程式現在應已建立並在 IntelliJ 中開啟。
    若要試用新應用程式，
    請依照 [在 IntelliJ 執行與除錯][ij-run] 的步驟操作。

{:.steps}

你已成功在 IntelliJ 建立新的 Flutter 應用程式！
若需要更多在 IntelliJ 開發 Flutter 的協助，
請參考 [IntelliJ for Flutter 參考文件][ij-more]。

[ij-setup]: /tools/android-studio#installation-and-setup
[ij-more]: /tools/android-studio
[ij-run]: /tools/android-studio#running-and-debugging

<a id="project-idx" aria-hidden="true"></a>

## Firebase Studio

若要使用 [Firebase Studio][fbs] 建立 Flutter 應用程式，
你需要有 Google 帳號並[設定 Firebase Studio][fbs-setup]。
接著請依照以下步驟操作：

 1. <h3>啟動 Firebase Studio</h3>

    在你偏好的瀏覽器中，前往 [Firebase Studio 控制台][Firebase Studio dashboard]
    （位於 `studio.firebase.google.com/`）。
    若尚未登入，請先登入你的 Google 帳號。

 1. <h3>建立新工作區</h3>

    在 Firebase Studio 控制台中，找到 **Start coding an app** 區段。
    這裡會有多種範本可供選擇。
    請選擇 **Flutter** 範本。
    若找不到，可能位於 **Mobile** 分類下。

 1. <h3>命名你的工作區</h3>

    Firebase Studio 會提示你 **Name your workspace**。
    此名稱與 Flutter 應用程式名稱不同。
    請選擇一個描述性名稱，方便你在工作區清單中辨識

    ```console
    $ flutter create --empty
    ```

    若要瞭解可用的建立選項，請在另一個終端機視窗中執行 `flutter create --help`。

1. <h3>輸入專案名稱</h3>

    作為 `flutter create` 的唯一非選項參數，請指定您的應用程式目錄與預設名稱。名稱應遵循 `lowercase_with_underscores` 命名慣例，並依照 [Effective Dart][package-name] 指南。

    例如，若您想建立一個名為 `my_app` 的應用程式：

    ```console
    $ flutter create my_app
    ```

 1. <h3>執行已設定的指令</h3>

    若要依照你指定的設定建立專案，
    請執行你在前一步驟組成的指令。

 1. <h3>等待專案初始化</h3>

    `flutter` 工具現在會為你的專案建立檔案結構，
    並下載所有必要的相依套件。
    這個過程可能需要一些時間。

 1. <h3>進入專案目錄</h3>

    現在你的專案已經建立完成，
    你可以在終端機或你偏好的編輯器中切換到該目錄。
    例如，若使用 bash shell 且專案名稱為 `my_app`：

    ```console
    $ cd my_app
    ```

 1. <h3>執行你的應用程式</h3>

    若要嘗試你的新應用程式，
    請在終端機中執行 `flutter run` 指令，
    並依照提示選擇輸出裝置。

{:.steps}

你已經成功在終端機中建立了一個全新的 Flutter 應用程式！
如果你需要協助設定專案或使用 `flutter` 命令列介面 (Command Line Interface) 工具，
請參閱 [Flutter CLI reference][cli-reference]。

[cli-reference]: /reference/flutter-cli

[flutter-setup]: /get-started
[package-name]: {{site.dart-site}}/effective-dart/style#do-name-packages-and-file-system-entities-using-lowercase-with-underscores
