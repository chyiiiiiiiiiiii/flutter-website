##### 啟動 Xcode 除錯器
{:.no_toc}

1. 從 Flutter 應用程式目錄開啟 `ios/Runner.xcworkspace`。

1. 使用工具列中的 **Scheme** 選單選取正確的裝置。

    若無特定偏好，請選擇 **iPhone Pro 14**。

   {% comment %}
    ![Selecting iPhone 14 in the Scheme menu in the Xcode toolbar](/assets/images/docs/testing/debugging/native/xcode/select-device.png){:width="100%"}
    <div markdown="1">{:.figure-caption}
    在 Xcode 工具列的 Scheme 選單中選取 iPhone 14。
    </div>
    {% endcomment %}

1. 以一般應用程式的方式在 Xcode 中執行此 Runner。

    {% comment %}
    ![Start button in Xcode interface](/assets/images/docs/testing/debugging/native/xcode/run-app.png)
    <div markdown="1">{:.figure-caption}
    Xcode 介面中顯示的啟動按鈕。
    </div>
    {% endcomment %}

    執行完成後，Xcode 底部的 **Debug** 區域會顯示一則包含
    Dart VM 服務 URI 的訊息，格式如下所示：

    ```console
    2023-07-12 14:55:39.966191-0500 Runner[58361:53017145]
        flutter: The Dart VM service is listening on
        http://127.0.0.1:50642/00wEOvfyff8=/
    ```

1. 複製 Dart VM 服務 URI。

##### 在 VS Code 中附加至 Dart VM
{:.no_toc}

1. 若要開啟命令面板，請前往
    **View** <span aria-label="and then">></span>
    **Command Palette...**

    你也可以按下 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>。

1. 輸入 `debug`。

1. 點擊 **Debug: Attach to Flutter on Device** 命令。

{% comment %}
    !['Running the Debug: Attach to Flutter on Device command in VS Code.'](/assets/images/docs/testing/debugging/vscode-ui/screens/attach-flutter-process-menu.png){:width="100%"}
{% endcomment %}

1. 在 **Paste an VM Service URI** 方塊中，貼上從 Xcode 複製的 URI，
    然後按下 <kbd>Enter</kbd>。

{% comment %}
    ![Alt text](/assets/images/docs/testing/debugging/vscode-ui/screens/vscode-add-attach-uri-filled.png)
{% endcomment %}
