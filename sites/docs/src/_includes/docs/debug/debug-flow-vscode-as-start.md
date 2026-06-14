1. 若要開啟 Flutter 應用程式目錄，請前往
   **File** <span aria-label="and then">></span>
   **Open Folder...** 並選擇 `my_app` 目錄。

1. 開啟 `lib/main.dart` 檔案。

1. 如果你可以為多部裝置建置應用程式，
   則必須先選擇裝置。

   前往
   **View** <span aria-label="and then">></span>
   **Command Palette...**

   你也可以按下 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> +
   <kbd>Shift</kbd> + <kbd>P</kbd>。

1. 輸入 `flutter select`。

1. 點擊 **Flutter: Select Device** 指令。

1. 選擇你的目標裝置。

1. 點擊除錯圖示
   (![VS Code 的蟲形圖示，用於啟動 Flutter 應用程式的除錯模式](/assets/images/docs/testing/debugging/vscode-ui/icons/debug.png))。
   這會開啟 **Debug** 面板並啟動應用程式。
   請等待應用程式在裝置上啟動，並等待除錯面板顯示 **Connected**。
   除錯器第一次啟動需要較長時間，
   後續啟動速度會加快。

   這個 Flutter 應用程式包含兩個按鈕：

   - **Launch in browser**：此按鈕會在你裝置的預設瀏覽器中開啟此頁面。
   - **Launch in app**：此按鈕會在你的應用程式中開啟此頁面。
     此按鈕僅適用於 iOS 或 Android，桌面應用程式會啟動瀏覽器。
