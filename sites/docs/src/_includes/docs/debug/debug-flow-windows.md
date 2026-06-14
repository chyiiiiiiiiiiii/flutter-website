#### 在 PowerShell 或命令提示字元中建置 Windows 版本的 Flutter 應用程式

要產生所需的 Windows 平台相依套件，
請執行 `flutter build` 指令。

```console
C:\> flutter build windows --debug
```

```console
Building Windows application...                                    31.4s
√  Built build\windows\runner\Debug\my_app.exe.
```

<Tabs key="windows-debug-flow">
<Tab name="Start from VS Code">

#### 從 VS Code 開始除錯 {:#vscode-windows}

如果你大多使用 VS Code 進行除錯，請從本節開始。

##### 在 VS Code 中啟動除錯工具

{% render "docs/debug/debug-flow-vscode-as-start.md" %}

{% comment %}
     !['Flutter app generated as a Windows app. The app displays two buttons to open this page in a browser or in the app'](/assets/images/docs/testing/debugging/native/url-launcher-app/windows.png){:width="50%"}
     <div class="figure-caption">

     Flutter app generated as a Windows app. The app displays two buttons to open this page in a browser or in the app.

     </div>
{% endcomment %}

##### 在 Visual Studio 中附加至 Flutter 處理程序

1. 若要開啟專案方案檔，請前往
   **File** <span aria-label="and then">></span>
   **Open** <span aria-label="and then">></span>
   **Project/Solution…**

   你也可以按下 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd>。

1. 在你的 Flutter 應用程式目錄中選擇 `build/windows/my_app.sln` 檔案。

{% comment %}
   ![Open Project/Solution dialog box in Visual Studio 2022 with my_app.sln file selected.](/assets/images/docs/testing/debugging/native/visual-studio/choose-solution.png){:width="100%"}
   <div class="figure-caption">

   Open Project/Solution dialog box in Visual Studio 2022 with
   `my_app.sln` file selected.

   </div>
{% endcomment %}

1. 前往 **Debug** > **Attach to Process**。

   你也可以按下 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>P</kbd>。

1. 在 **Attach to Process** 對話框中，選擇 `my_app.exe`。

{% comment %}
   ![Selecting my_app from the Attach to Process dialog box](/assets/images/docs/testing/debugging/native/visual-studio/attach-to-process-dialog.png){:width="100%"}
{% endcomment %}

   Visual Studio 開始監控 Flutter 應用程式。

{% comment %}
   ![Visual Studio debugger running and monitoring the Flutter app](/assets/images/docs/testing/debugging/native/visual-studio/debugger-active.png){:width="100%"}
{% endcomment %}

</Tab>
<Tab name="Start from Visual Studio">

#### 從 Visual Studio 開始除錯

如果你大多使用 Visual Studio 進行除錯，請從本節開始。

##### 啟動本機 Windows 除錯工具

1. 若要開啟專案方案檔，請前往
   **File** <span aria-label="and then">></span>
   **Open** <span aria-label="and then">></span>
   **Project/Solution…**

   你也可以按下 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd>。

1. 在你的 Flutter 應用程式目錄中選擇 `build/windows/my_app.sln` 檔案。

{% comment %}
   ![Open Project/Solution dialog box in Visual Studio 2022 with my_app.sln file selected.](/assets/images/docs/testing/debugging/native/visual-studio/choose-solution.png){:width="100%"}
   <div class="figure-caption">

   Open Project/Solution dialog box in Visual Studio 2022 with
   `my_app.sln` file selected.

   </div>
{% endcomment %}

1. 將 `my_app` 設為啟動專案。
   在 **Solution Explorer** 中，右鍵點擊 `my_app` 並選擇
   **Set as Startup Project**。

1. 點擊 **Local Windows Debugger** 開始除錯。

   你也可以按下 <kbd>F5</kbd>。

   當 Flutter 應用程式啟動後，主控台視窗會顯示
   一則包含 Dart VM 服務 URI 的訊息，內容類似如下：

   ```console
   flutter: The Dart VM service is listening on http://127.0.0.1:62080/KPHEj2qPD1E=/
   ```

1. 複製 Dart VM 服務 URI。

##### 在 VS Code 中附加至 Dart VM

1. 若要開啟指令選擇區，請前往
   **View** <span aria-label="and then">></span>
   **Command Palette...**

   你也可以按下 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>。

1. 輸入 `debug`。

1. 點擊 **Debug: Attach to Flutter on Device** 指令。

{% comment %}
   !['Running the Debug: Attach to Flutter on Device command in VS Code.'](/assets/images/docs/testing/debugging/vscode-ui/screens/attach-flutter-process-menu.png){:width="100%"}
{% endcomment %}

1. 在 **Paste an VM Service URI** 欄位中，貼上從 Visual Studio 複製的 URI，
   然後按下 <kbd>Enter</kbd>。

{% comment %}
   ![Alt text](/assets/images/docs/testing/debugging/vscode-ui/screens/vscode-add-attach-uri-filled.png)
{% endcomment %}

</Tab>
</Tabs>
