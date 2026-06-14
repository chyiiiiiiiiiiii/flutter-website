#### 在終端機中建置 Flutter 應用程式的 macOS 版本

若要產生所需的 macOS 平台相依套件，
請執行 `flutter build` 指令。

```console
flutter build macos --debug
```

```console
Building macOS application...
```

<Tabs key="darwin-debug-flow">
<Tab name="Start from VS Code">

#### 先從 VS Code 開始除錯 {:#vscode-macos}

##### 在 VS Code 中啟動除錯工具

{% render "docs/debug/debug-flow-vscode-as-start.md" %}

##### 在 Xcode 中附加到 Flutter 程序

1. 若要附加到 Flutter 應用程式，請前往
   **Debug** <span aria-label="and then">></span>
   **Attach to Process** <span aria-label="and then">></span>
   **Runner**。

   **Runner** 應該會出現在 **Attach to Process** 選單頂端
   **Likely Targets** 標題下方。

</Tab>
<Tab name="Start from XCode">

#### 先從 Xcode 開始除錯 {:#xcode-macos}

##### 在 Xcode 中啟動除錯工具

1. 從你的 Flutter 應用程式目錄開啟 `macos/Runner.xcworkspace`。

1. 在 Xcode 中以一般應用程式的方式執行此 Runner。

{% comment %}
   ![Start button in Xcode interface](/assets/images/docs/testing/debugging/native/xcode/run-app.png)
   <div class="figure-caption">

   Start button displayed in Xcode interface.

   </div>
{% endcomment %}

   執行完成後，Xcode 底部的 **Debug** 區域會顯示
   一則包含 Dart VM service URI 的訊息，格式類似如下：

   ```console
   2023-07-12 14:55:39.966191-0500 Runner[58361:53017145]
       flutter: The Dart VM service is listening on
       http://127.0.0.1:50642/00wEOvfyff8=/
   ```

1. 複製 Dart VM service URI。

##### 在 VS Code 中附加到 Dart VM

1. 若要開啟指令面板，請前往 **View** > **Command Palette...**

   你也可以按下 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>。

1. 輸入 `debug`。

1. 點擊 **Debug: Attach to Flutter on Device** 指令。

{% comment %}
   !['Running the Debug: Attach to Flutter on Device command in VS Code.'](/assets/images/docs/testing/debugging/vscode-ui/screens/attach-flutter-process-menu.png){:width="100%"}
{% endcomment %}

1. 在 **Paste an VM Service URI** 欄位中，貼上你從 Xcode 複製的 URI，
   然後按下 <kbd>Enter</kbd>。

{% comment %}
   ![Alt text](/assets/images/docs/testing/debugging/vscode-ui/screens/vscode-add-attach-uri-filled.png)
{% endcomment %}

</Tab>
</Tabs>
