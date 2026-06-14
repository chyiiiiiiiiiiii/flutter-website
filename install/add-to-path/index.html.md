# 將 Flutter 加入 PATH

> 了解如何在下載 Flutter SDK 後，將 Flutter 加入你的 PATH。



了解如何在下載 SDK 後，將 Flutter 加入你的 `PATH` 環境變數。
將 Flutter 加入你的 `PATH`，即可在終端機與 IDE 中使用
`flutter` 和 `dart` 命令列工具。

:::tip
如果你尚未下載 Flutter，
請改為參考[設定與試用 Flutter][Set up and test drive Flutter]。
:::

<div class="card-grid">
  <a class="card outlined-card" href="#windows">
    <div class="card-header">
      <span class="card-title">Windows</span>
    </div>
    <div class="card-content">
      <p>在 Windows 上將 Flutter 加入你的 path。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#macos">
    <div class="card-header">
      <span class="card-title">macOS</span>
    </div>
    <div class="card-content">
      <p>在 macOS 上將 Flutter 加入你的 path。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#linux">
    <div class="card-header">
      <span class="card-title">Linux</span>
    </div>
    <div class="card-content">
      <p>在 Linux 上將 Flutter 加入你的 path。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#chromeos">
    <div class="card-header">
      <span class="card-title">ChromeOS</span>
    </div>
    <div class="card-content">
      <p>在 ChromeOS 上將 Flutter 加入你的 path。</p>
    </div>
  </a>
</div>

[Set up and test drive Flutter]: /install/quick

## Windows

若要在 Windows 的終端機中執行 `flutter` 和 `dart` 指令，
請將 Flutter SDK 的 `bin` 目錄加入 `Path` 環境變數。


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


## macOS

若要在 macOS 的終端機中執行 `flutter` 和 `dart` 指令，
請將 Flutter SDK 的 `bin` 目錄加入 `PATH` 環境變數。

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


## Linux

若要在 Linux 的終端機中執行 `flutter` 和 `dart` 指令，
請將 Flutter SDK 的 `bin` 目錄加入 `PATH` 環境變數。

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


## ChromeOS

若要在 ChromeOS 的終端機中執行 `flutter` 和 `dart` 指令，
請將 Flutter SDK 的 `bin` 目錄加入 `PATH` 環境變數。

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


