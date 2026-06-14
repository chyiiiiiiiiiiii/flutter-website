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
