##### 啟用自動附加

你可以設定 VS Code 在開始除錯時自動附加到你的 Flutter 模組專案。
若要啟用此功能，
請在你的 Flutter 模組專案中建立 `.vscode/launch.json` 檔案。

1. 前往 **View** <span aria-label="and then">></span> **Run**。

   你也可以按
   <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd>。

   VS Code 會顯示 **Run and Debug** 側邊欄。

1. 在此側邊欄中，點擊 **create a launch.json file**。

   VS Code 會在頂部顯示 **Select debugger** 選單。

1. 選取 **Dart & Flutter**。

   VS Code 會建立並開啟 `.vscode/launch.json` 檔案。

   <details markdown="1">
   <summary>展開以查看 launch.json 檔案範例</summary>

    ```json
    {
        // Use IntelliSense to learn about possible attributes.
        // Hover to view descriptions of existing attributes.
        // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
        "version": "0.2.0",
        "configurations": [
            {
                "name": "my_app",
                "request": "launch",
                "type": "dart"
            },
            {
                "name": "my_app (profile mode)",
                "request": "launch",
                "type": "dart",
                "flutterMode": "profile"
            },
            {
                "name": "my_app (release mode)",
                "request": "launch",
                "type": "dart",
                "flutterMode": "release"
            }
        ]
    }
    ```

    </details>

1. 若要附加，前往 **Run** <span aria-label="and then">></span>
   **Start Debugging**。

   你也可以按 <kbd>F5</kbd>。
