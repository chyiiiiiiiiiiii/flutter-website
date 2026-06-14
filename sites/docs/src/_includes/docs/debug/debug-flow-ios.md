#### 在終端機中建置 Flutter 應用程式的 iOS 版本

若要產生所需的 iOS 平台相依套件，
請執行 `flutter build` 指令。

```console
$ flutter build ios --config-only --no-codesign --debug
```

```console
Warning: Building for device with codesigning disabled. You will have to manually codesign before deploying to device.
Building com.example.myApp for device (ios)...
```

<Tabs key="darwin-debug-flow">
<Tab name="Start from VS Code">

#### 從 VS Code 開始除錯 {:#vscode-ios}

如果你主要使用 VS Code 來除錯程式碼，請從本節開始。

##### 在 VS Code 中啟動 Dart 除錯工具

{% render "docs/debug/debug-flow-vscode-as-start.md" %}

{% if add == 'launch' %}
{% render "docs/debug/vscode-flutter-attach-json.md" %}
{% endif %}

##### 在 Xcode 中附加至 Flutter 程序

若要在 Xcode 中附加至 Flutter 應用程式：

1. 前往 **Debug** <span aria-label="and then">></span> **Attach to Process**。

1. 選擇 **Runner**。它應該位於
   **Attach to Process** 選單頂端的 **Likely Targets** 標題下方。

</Tab>
<Tab name="Start from Xcode">

#### 從 Xcode 開始除錯 {:#xcode-ios}

如果你主要使用 Xcode 來除錯程式碼，請從本節開始。

##### 啟動 Xcode 除錯工具

1. 從你的 Flutter 應用程式目錄開啟 `ios/Runner.xcworkspace`。

1. 使用工具列中的 **Scheme** 選單選擇正確的裝置。

    如果你沒有特別偏好，請選擇 **iPhone Pro 14**。

   {% comment %}
    ![Selecting iPhone 14 in the Scheme menu in the Xcode toolbar](/assets/images/docs/testing/debugging/native/xcode/select-device.png){:width="100%"}
    <div class="figure-caption">

    Selecting iPhone 14 in the Scheme menu in the Xcode toolbar.

    </div>
    {% endcomment %}

1. 以一般應用程式的方式在 Xcode 中執行此 Runner。

    {% comment %}
    ![Start button in Xcode interface](/assets/images/docs/testing/debugging/native/xcode/run-app.png)
    <div class="figure-caption">

    Start button displayed in Xcode interface.

    </div>
    {% endcomment %}

    執行完成後，Xcode 底部的 **Debug** 區域會顯示
    一則包含 Dart VM 服務 URI 的訊息，格式類似如下：

    ```console
    2023-07-12 14:55:39.966191-0500 Runner[58361:53017145]
        flutter: The Dart VM service is listening on
        http://127.0.0.1:50642/00wEOvfyff8=/
    ```

1. 複製 Dart VM 服務 URI。

##### 在 VS Code 中附加至 Dart VM

1. 若要開啟指令面板，前往
    **View** <span aria-label="and then">></span>
    **Command Palette...**

    你也可以按下 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>。

1. 輸入 `debug`。

1. 點擊 **Debug: Attach to Flutter on Device** 指令。

{% comment %}
    !['Running the Debug: Attach to Flutter on Device command in VS Code.'](/assets/images/docs/testing/debugging/vscode-ui/screens/attach-flutter-process-menu.png){:width="100%"}
{% endcomment %}

1. 在 **Paste an VM Service URI** 欄位中，貼上你從
    Xcode 複製的 URI，然後按下 <kbd>Enter</kbd>。

{% comment %}
    ![Alt text](/assets/images/docs/testing/debugging/vscode-ui/screens/vscode-add-attach-uri-filled.png)
{% endcomment %}

</Tab>
</Tabs>
