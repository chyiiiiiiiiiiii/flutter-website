# 手動安裝 Flutter

> 學習如何手動安裝與設定 Flutter SDK（Flutter 軟體開發套件）。



學習如何安裝並手動設定
你的 Flutter 開發環境。

:::tip
如果你只是想快速安裝 Flutter，
建議考慮使用 [VS Code 安裝 Flutter][with-vs-code]，
享受更簡化的設定體驗。
:::

[with-vs-code]: /install/with-vs-code

## 選擇你的開發平台 {: #dev-platform}

本頁說明內容以在 **Windows**{:.selected-os-text} 裝置上
安裝 Flutter 為主。

如果你想參考其他作業系統的安裝說明，
請選擇下列其中一項。

<OSSelector />

## 下載必要軟體 {: #download-prerequisites}

在安裝 Flutter SDK（Flutter 軟體開發套件）之前，
請先完成以下設定步驟。

 1. <h3>安裝 Git for Windows</h3>

    下載並安裝最新版的 [Git for Windows][]。

    若需要安裝或疑難排解 Git，
    請參考 [Git 文件][git-install]。

 1. <h3>設定編輯器或 IDE</h3>

    為獲得最佳的 Flutter 應用程式開發體驗，
    建議安裝並設定
    [支援 Flutter 的編輯器或 IDE][editors]{: target="_blank"}。

{: .steps .windows-only}

 1. <h3>安裝 Xcode 命令列工具</h3>

    下載 Xcode 命令列工具以取得
    Flutter 依賴的命令列工具（包含 Git）。

    若要下載這些工具，請在你偏好的終端機中執行下列指令：

    ```console
    $ xcode-select --install
    ```

    如果你尚未安裝這些工具，
    系統會跳出一個對話視窗，確認你是否要安裝它們。
    請點選 **Install**（安裝），安裝完成後再點選 **Done**（完成）。

 1. <h3>設定編輯器或 IDE</h3>

    為了獲得最佳的 Flutter 應用程式開發體驗，
    建議你安裝並設定一個
    [支援 Flutter 的編輯器或 IDE][editors]{: target="_blank"}。

{: .steps .macos-only}

 1. <h3>下載並安裝必要的套件</h3>

    請使用你偏好的套件管理工具或安裝方式，
    安裝下列套件的最新版本：

    - `curl`
    - `git`
    - `unzip`
    - `xz-utils`
    - `zip`
    - `libglu1-mesa`

    在以 `apt-get` 為基礎的 Debian 發行版（如 Ubuntu）上，
    請使用以下指令安裝這些套件：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

1. <h3>設定編輯器或 IDE</h3>

   為了獲得最佳的 Flutter 應用程式開發體驗，
   建議安裝並設定
   [支援 Flutter 的編輯器或 IDE][editors]{: target="_blank"}。

{: .steps .linux-only}

 1. <h3>設定 Linux 支援</h3>

    如果你之前尚未在 Chromebook 上設定 Linux 支援，
    請參考 [開啟 Linux 支援][chromeos-linux]。

    如果你已經開啟了 Linux 支援，
    請依照 [修正 Linux 問題][chromeos-linux-update] 的指示，確保其為最新狀態。

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
    請使用下列指令安裝這些套件：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

 1. <h3>設定編輯器或 IDE</h3>

    為了獲得最佳的 Flutter 應用程式開發體驗，
    建議安裝並設定
    [支援 Flutter 的編輯器或 IDE][editors]{: target="_blank"}。

{: .steps .chromeos-only}

[editors]: /tools/editors
[Git for Windows]: https://git-scm.com/downloads/win
[git-install]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[chromeos-linux]: https://support.google.com/chromebook/answer/9145439
[chromeos-linux-update]: https://support.google.com/chromebook/answer/9145439?hl=en#:~:text=Fix%20problems%20with%20Linux

## 安裝並設定 Flutter {: #install-flutter}

要安裝 Flutter SDK（Flutter 軟體開發套件），
請從 SDK 歷史版本存檔下載最新的安裝包，
然後將 SDK 解壓縮到你希望儲存的位置。

 1. <h3>下載 Flutter SDK 安裝包</h3>

    下載以下安裝包以取得
    最新穩定版的 Flutter SDK。

    <DownloadLatestButton os="windows" />

 1. <h3>建立儲存 SDK 的資料夾</h3>

    建立或尋找一個資料夾來儲存解壓縮後的 SDK。
    建議在
    `%USERPROFILE%\develop`（`C:\Users\{username}\develop`）建立並使用一個目錄。

    :::note
    請選擇一個路徑中沒有特殊字元或空格，
    且不需要提升權限的位置。
    :::

 1. <h3>解壓縮 SDK</h3>

    將你下載的 SDK 安裝包
    解壓縮到你想儲存 Flutter SDK 的目錄中。

    1. 複製以下指令。
    1. 將 `<sdk_zip_path>` 替換為你下載的安裝包路徑。
    1. 將 `<destination_directory_path>` 替換為你希望解壓縮後 SDK 所在的資料夾路徑。
    1. 在你偏好的終端機中執行已編輯的指令。

    ```console
    $ Expand-Archive –Path <sdk_zip_path> -Destination <destination_directory_path>
    ```

    例如，如果你已將 Flutter 3.29.3 的安裝包下載到 `%USERPROFILE%\Downloads` 目錄，並希望將解壓縮後的 SDK 儲存到 `%USERPROFILE%\develop` 目錄：

    ```console
    $ Expand-Archive `
      -Path $env:USERPROFILE\Downloads\flutter_windows_3.29.3-stable.zip `
      -Destination $env:USERPROFILE\develop\
    ```

    :::note
    如果解壓縮後 `bin` 目錄中缺少 `flutter.bat` 檔案，
    可能是防毒軟體將其隔離所致。
    若發生此情況，請將 Flutter SDK 目錄設定為防毒軟體的信任位置，
    然後再重新解壓縮安裝包。
    :::

{: .steps .windows-only}

 1. <h3>下載 Flutter SDK 安裝包</h3>

    根據你的 macOS 裝置 CPU 架構，請下載下列其中一個安裝包，以取得最新穩定版的 Flutter SDK。

    | Apple Silicon (ARM64)                            | Intel                                          |
    |--------------------------------------------------|------------------------------------------------|
    | <DownloadLatestButton os="macos" arch="arm64" /> | <DownloadLatestButton os="macos" arch="x64" /> |

 1. <h3>建立儲存 SDK 的資料夾</h3>

    請建立或尋找一個資料夾，用來存放解壓縮後的 SDK。建議在 `~/develop/` 建立並使用一個目錄。

 1. <h3>解壓縮 SDK</h3>

    將你下載的 SDK 安裝包解壓縮到你希望存放 Flutter SDK 的目錄中。

    1. 複製下方指令。
    1. 將 `<sdk_zip_path>` 替換為你下載的安裝包路徑。
    1. 將 `<destination_directory_path>` 替換為你希望解壓縮後 SDK 所在的資料夾路徑。
    1. 在你偏好的終端機中執行編輯後的指令。

    ```console
    $ unzip <sdk_zip_path> -d <destination_directory_path>
    ```

    例如，假設你已將 Flutter 3.29.3 的安裝包下載到 `~/Downloads` 目錄，並希望將解壓縮後的 SDK 儲存在 `~/develop` 目錄：

    ```console
    $ unzip ~/Downloads/flutter_macos_3.29.3-stable.zip -d ~/develop/
    ```

{: .steps .macos-only}

 1. <h3>下載 Flutter SDK 安裝包</h3>

    下載以下安裝包，以取得最新穩定版本的 Flutter SDK（Flutter 軟體開發套件）。

    <DownloadLatestButton os="linux" />

 1. <h3>建立儲存 SDK 的資料夾</h3>

    建立或尋找一個資料夾，用來存放解壓縮後的 SDK。
    建議在 `~/develop/` 目錄下建立並使用該資料夾。

 1. <h3>解壓縮 SDK</h3>

    將你下載的 SDK 安裝包解壓縮到你想要存放 Flutter SDK 的目錄中。

    1. 複製以下指令。
    1. 將 `<sdk_zip_path>` 替換為你下載的安裝包路徑。
    1. 將 `<destination_directory_path>` 替換為你希望解壓縮後 SDK 所在的資料夾路徑。
    1. 在你偏好的終端機中執行編輯後的指令。

    ```console
    $ tar -xf <sdk_zip_path> -C <destination_directory_path>
    ```

    例如，假設你已將 Flutter 3.29.3 的安裝包下載到 `~/Downloads` 目錄，並希望將解壓縮後的 SDK 儲存到 `~/develop` 目錄：

    ```console
    $ tar -xf ~/Downloads/flutter_linux_3.29.3-stable.tar.xz -C ~/develop/
    ```

{: .steps .linux-only .chromeos-only}

## 將 Flutter 加入你的 PATH {: #add-to-path}

現在你已下載好 SDK，
請將 Flutter SDK 的 `bin` 目錄加入你的 `PATH` 環境變數中。
將 Flutter 加入你的 `PATH` 之後，你就能在終端機與 IDE 中
使用 `flutter` 和 `dart` 命令列工具。

<div class="windows-only">


 1. <h3>確認 Flutter SDK 安裝位置</h3>

    複製您下載並解壓縮 Flutter SDK 的目錄之絕對路徑。

 1. <h3>前往環境變數設定</h3>

    1. 按下 <kbd>Windows</kbd> + <kbd>Pause</kbd>。

       若您的鍵盤沒有 <kbd>Pause</kbd> 鍵，
       請嘗試 <kbd>Windows</kbd> + <kbd>Fn</kbd> + <kbd>B</kbd>。

       **System > About** 對話方塊會開啟。

    1. 點擊 **Advanced System Settings**
       <span aria-label="and then">></span> **Advanced**
       <span aria-label="and then">></span> **Environment Variables...**。

       **Environment Variables** 對話方塊會開啟。

 1. <h3>將 Flutter SDK bin 加入您的路徑</h3>

    1. 在 **Environment Variables** 對話方塊的
       **User variables for (username)** 區段中，
       尋找 **Path** 項目。

    1. 若 **Path** 項目已存在，請雙擊它。

       **Edit Environment Variable** 對話方塊應會開啟。

       1. 雙擊空白列。

       1. 輸入 Flutter 安裝目錄中 `bin` 資料夾的路徑。

          舉例來說，若您將 Flutter 下載到使用者目錄下的
          `develop\flutter` 資料夾，請輸入以下內容：

          ```plaintext
          %USERPROFILE%\develop\flutter\bin
          ```

       1. 點擊您剛新增的 Flutter 項目以選取它。

       1. 點擊 **Move Up**，直到 Flutter 項目移至清單頂端。

       1. 若要確認變更，請點擊 **OK** 三次。

       {: type="a"}

    1. 若項目不存在，請點擊 **New...**。

       **Edit Environment Variable** 對話方塊應會開啟。

       1. 在 **Variable Name** 欄位中輸入 `Path`。

       1. 在 **Variable Value** 欄位中，
          輸入 Flutter 安裝目錄中 `bin` 資料夾的路徑。

          舉例來說，若您將 Flutter 下載到使用者目錄下的
          `develop\flutter` 資料夾，請輸入以下內容：

          ```plaintext
          %USERPROFILE%\develop\flutter\bin
          ```

       1. 若要確認變更，請點擊 **OK** 三次。

       {: type="a"}

 1. <h3>套用變更</h3>

    若要套用此變更並取得 `flutter` 工具的存取權，
    請關閉並重新開啟所有已開啟的命令提示字元、
    終端機應用程式中的工作階段，以及 IDE。

 1. <h3>驗證設定</h3>

    若要確認您已成功將 SDK 新增至 `PATH`，
    請開啟命令提示字元或您偏好的終端機應用程式，
    然後嘗試執行 `flutter` 和 `dart` 工具。

    ```console
    $ flutter --version
    $ dart --version
    ```

    若任一指令找不到，
    請參閱 [Flutter 安裝疑難排解][troubleshoot]。

{: .steps}

[troubleshoot]: /install/troubleshoot


</div>

<div class="macos-only">

:::note
以下步驟假設你在 macOS 上使用[預設 shell][zsh-mac]，即 Zsh。

若你使用 Zsh 以外的 shell，
請參閱[這份設定 PATH 的教學][other-path]。
:::

 1. <h3>確認 Flutter SDK 安裝位置</h3>

    複製你下載並解壓縮 Flutter SDK 的目錄絕對路徑。

 1. <h3>開啟或建立 Zsh 環境變數檔</h3>

    若檔案已存在，請用你慣用的文字編輯器開啟 [Zsh 環境變數檔][zsh-files]
    `~/.zprofile`。
    若檔案不存在，請建立 `~/.zprofile` 檔案。

 1. <h3>將 Flutter SDK bin 加入你的 PATH</h3>

    在 `~/.zprofile` 檔案末尾，
    使用內建的 `export` 指令更新 `PATH` 變數，
    將 Flutter 安裝目錄下的 `bin` 目錄包含進來。

    請將 `<path-to-sdk>` 替換為你的 Flutter SDK 安裝路徑。

    ```bash
    export PATH="<path-to-sdk>/bin:$PATH"
    ```

    例如，若你將 Flutter 下載到使用者目錄內的
    `develop/flutter` 資料夾，
    則需在檔案中加入以下內容：

    ```bash
    export PATH="$HOME/develop/flutter/bin:$PATH"
    ```

 1. <h3>儲存變更</h3>

    儲存並關閉你編輯的 `~/.zprofile` 檔案。

 1. <h3>套用變更</h3>

    若要套用此變更並取得 `flutter` 工具的存取權，
    請關閉並重新開啟終端機應用程式及 IDE 中所有已開啟的 Zsh 工作階段。

 1. <h3>驗證設定</h3>

    為確認你已成功將 SDK 加入 `PATH`，
    請在慣用的終端機中開啟一個 Zsh 工作階段，
    然後嘗試執行 `flutter` 和 `dart` 工具。

    ```console
    $ flutter --version
    $ dart --version
    ```

    若任一指令找不到，
    請參閱 [Flutter 安裝疑難排解][troubleshoot]。

{: .steps}

[zsh-mac]: https://support.apple.com/en-us/102360
[zsh-files]: https://zsh.sourceforge.io/Intro/intro_3.html
[other-path]: https://www.cyberciti.biz/faq/unix-linux-adding-path/
[troubleshoot]: /install/troubleshoot


</div>

<div class="linux-only">

 1. <h3>確認 Flutter SDK 安裝位置</h3>

    複製你下載並解壓縮 Flutter SDK 的目錄之絕對路徑。

 1. <h3>確認預設 shell</h3>

    如果你不確定使用哪種 shell，
    請開啟新的終端機視窗，確認啟動的是哪種 shell。

    ```console
    $ echo $SHELL
    ```

 1. <h3>將 Flutter SDK bin 加入 PATH</h3>

    要將 Flutter 安裝目錄下的 `bin` 目錄加入 `PATH`：

    1. 展開符合你預設 shell 的說明。
    1. 複製所提供的指令。
    1. 將 `<path-to-sdk>` 替換成你的 Flutter SDK 安裝路徑。
    1. 在你偏好的終端機中，以該 shell 執行修改後的指令。

    <hr>

    <details>
    <summary>展開 <code>bash</code> 說明</summary>

    ```console
    $ echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.bashrc
    ```

    舉例來說，如果你將 Flutter 下載到使用者目錄下的
    `develop/flutter` 資料夾，請執行以下指令：

    ```console
    $ echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.bashrc
    ```

    </details>

    <details>
    <summary>展開 <code>zsh</code> 說明</summary>

    ```console
    $ echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.zshenv
    ```

    舉例來說，如果你將 Flutter 下載到使用者目錄下的
    `develop/flutter` 資料夾，請執行以下指令：

    ```console
    $ echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.zshenv
    ```

    </details>

    <details>
    <summary>展開 <code>fish</code> 說明</summary>

    ```console
    $ fish_add_path -g -p <path-to-sdk>/bin
    ```

    舉例來說，如果你將 Flutter 下載到使用者目錄下的
    `develop/flutter` 資料夾，請執行以下指令：

    ```console
    $ fish_add_path -g -p ~/develop/flutter/bin
    ```

    </details>

    <details>
    <summary>展開 <code>csh</code> 說明</summary>

    ```console
    $ echo 'setenv PATH "<path-to-sdk>/bin:$PATH"' >> ~/.cshrc
    ```

    舉例來說，如果你將 Flutter 下載到使用者目錄下的
    `develop/flutter` 資料夾，請執行以下指令：

    ```console
    $ echo 'setenv PATH "$HOME/develop/flutter/bin:$PATH"' >> ~/.cshrc
    ```

    </details>

    <details>
    <summary>展開 <code>tcsh</code> 說明</summary>

    ```console
    $ echo 'setenv PATH "<path-to-sdk>/bin:$PATH"' >> ~/.tcshrc
    ```

    舉例來說，如果你將 Flutter 下載到使用者目錄下的
    `develop/flutter` 資料夾，請執行以下指令：

    ```console
    $ echo 'setenv PATH "$HOME/develop/flutter/bin:$PATH"' >> ~/.tcshrc
    ```

    </details>

    <details>
    <summary>展開 <code>ksh</code> 說明</summary>

    ```console
    $ echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.profile
    ```

    舉例來說，如果你將 Flutter 下載到使用者目錄下的
    `develop/flutter` 資料夾，請執行以下指令：

    ```console
    $ echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.profile
    ```

    </details>

    <details>
    <summary>展開 <code>sh</code> 說明</summary>

    ```console
    $ echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.profile
    ```

    舉例來說，如果你將 Flutter 下載到使用者目錄下的
    `develop/flutter` 資料夾，請執行以下指令：

    ```console
    $ echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.profile
    ```

    </details>

 1. <h3>套用變更</h3>

    要套用此變更並存取 `flutter` 工具，
    請關閉並重新開啟終端機應用程式和 IDE 中所有已開啟的 shell 工作階段。

 1. <h3>驗證設定</h3>

    為確認你已成功將 SDK 加入 `PATH`，
    請以預設 shell 開啟你偏好的終端機，
    然後嘗試執行 `flutter` 和 `dart` 工具。

    ```console
    $ flutter --version
    $ dart --version
    ```

    如果其中任一指令找不到，
    請參閱 [Flutter 安裝疑難排解][troubleshoot]。

{: .steps}

[troubleshoot]: /install/troubleshoot


</div>

<div class="chromeos-only">

:::note
以下步驟假設你已[開啟 Linux 支援][chromeos-linux]，
並且使用的是 Bash 或 ChromeOS 的預設 shell。

若你使用的不是預設 shell 或 Bash，請改依照
[Linux 的新增路徑說明][linux-path]{: target="_blank"} 操作。
:::

 1. <h3>確認你的 Flutter SDK 安裝位置</h3>

    複製你下載並解壓縮 Flutter SDK 的目錄絕對路徑。

 1. <h3>將 Flutter SDK 的 bin 目錄加入路徑</h3>

    若要將 Flutter 安裝目錄的 `bin` 資料夾加入 `PATH`：

    1. 複製以下指令。
    1. 將 `<path-to-sdk>` 替換為你的 Flutter SDK 安裝路徑。
    1. 在慣用的終端機中執行修改後的指令。

    ```console
    $ echo 'export PATH="<path-to-sdk>:$PATH"' >> ~/.bash_profile
    ```

    例如，若你將 Flutter 下載至使用者目錄下的
    `develop/flutter` 資料夾，則需執行以下指令：

    ```console
    $ echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.bash_profile
    ```

 1. <h3>套用變更</h3>

    若要套用此變更並取得 `flutter` 工具的存取權，
    請關閉並重新開啟終端機應用程式與 IDE 中所有已開啟的 Zsh 工作階段。

 1. <h3>驗證設定</h3>

    若要確認你已成功將 SDK 加入 `PATH`，
    請在慣用的終端機中開啟 Zsh 工作階段，
    然後嘗試執行 `flutter` 與 `dart` 工具。

    ```console
    $ flutter --version
    $ dart --version
    ```

    若找不到上述任一指令，
    請參閱 [Flutter 安裝疑難排解][troubleshoot]。

{: .steps}

[chromeos-linux]: https://support.google.com/chromebook/answer/9145439
[linux-path]: /install/add-to-path#linux
[troubleshoot]: /install/troubleshoot


</div>

## 繼續你的 Flutter 之旅 {: #next-steps}

現在你已成功安裝 Flutter，
請至少設定一個目標平台的開發環境，
以繼續你的 Flutter 之旅。

:::recommend
如果你尚未決定開發時要鎖定哪個平台，
Flutter 團隊建議你可以先嘗試
[在網頁上開發][web-setup]！
:::

[web-setup]: /platform-integration/web/setup

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-phone.svg"
           height="160" aria-hidden="true"
           alt="A representation of Flutter on multiple devices.">
    </div>
    <div class="card-header">
      <span class="card-title">設定目標平台</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/web/setup">目標平台：Web</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/android/setup">目標平台：Android</a>
        </li>
        <li class="macos-only">
          <a class="text-button" href="/platform-integration/ios/setup">目標平台：iOS</a>
        </li>
        <li class="macos-only">
          <a class="text-button" href="/platform-integration/macos/setup">目標平台：macOS</a>
        </li>
        <li class="windows-only">
          <a class="text-button" href="/platform-integration/windows/setup">目標平台：Windows</a>
        </li>
        <li class="linux-only">
          <a class="text-button" href="/platform-integration/linux/setup">目標平台：Linux</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/pointing-the-way.png"
           height="160" aria-hidden="true"
           alt="Dash helping you explore Flutter learning resources.">
    </div>
    <div class="card-header">
      <span class="card-title">學習 Flutter 開發</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/learn/pathway">學習基礎知識</a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">探索 Flutter 元件 (Widgets)</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/up-to-date.png" height="160"
           aria-hidden="true" alt="Keep up to date with Flutter">
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
          <a class="text-button" href="https://www.youtube.com/@flutterdev">訂閱 YouTube 頻道</a>
        </li>
      </ul>
    </div>
  </div>
</div>

