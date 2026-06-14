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
