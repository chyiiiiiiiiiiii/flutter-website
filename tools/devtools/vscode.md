# 從 VS Code 執行 DevTools

> 學習如何從 VS Code 啟動與使用 DevTools。



## 新增 VS Code 擴充功能

若要在 VS Code 中使用 DevTools，你需要安裝 [Dart 擴充功能][Dart extension]。
如果你正在除錯 Flutter 應用程式，也建議安裝
[Flutter 擴充功能][Flutter extension]。

## 啟動應用程式進行除錯 {: #run-and-debug}

請在 VS Code 中開啟專案的根目錄（包含 `pubspec.yaml` 的那個資料夾），
然後點擊 **Run > Start Debugging**（`F5`），即可啟動應用程式的除錯工作階段。

## 啟動 DevTools

當除錯工作階段啟動且應用程式已經開始執行後，
**Open DevTools** 指令會在
VS Code 指令面板（`F1`）中變得可用：

![顯示 Open DevTools 指令的螢幕截圖](/assets/images/docs/tools/vs-code/vscode_command.png){:width="100%"}

你選擇的工具會以嵌入方式在 VS Code 內開啟。

![顯示 DevTools 嵌入於 VS Code 的螢幕截圖](/assets/images/docs/tools/vs-code/vscode_embedded.png){:width="100%"}

你可以透過 `dart.embedDevTools` 設定，選擇是否總是在瀏覽器中開啟 DevTools，
並可利用 `dart.devToolsLocation` 設定，控制 DevTools 是以完整視窗開啟，
還是於目前編輯器旁的新欄位中開啟。

完整的 Dart/Flutter 設定列表可在
[dartcode.org](https://dartcode.org/docs/settings/)
或
[VS Code 設定編輯器](https://code.visualstudio.com/docs/getstarted/settings#_settings-editor)
中找到。
部分 Dart/Flutter 在 VS Code 的推薦設定也可參考
[dartcode.org](https://dartcode.org/docs/recommended-settings/)。

你也可以在語言狀態區（狀態列中 **Dart** 旁的 `{}` 圖示）查看 DevTools 是否正在執行，
並從該處在瀏覽器中啟動 DevTools。

![顯示 DevTools 在 VS Code 語言狀態區的螢幕截圖](/assets/images/docs/tools/vs-code/vscode_status_bar.png){:width="100%"}

[Dart extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code
[Flutter extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter

