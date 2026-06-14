
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
