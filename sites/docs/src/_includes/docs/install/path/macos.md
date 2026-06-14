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
