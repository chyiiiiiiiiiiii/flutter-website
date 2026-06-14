以下範例假設你想將框架輸出至 `/path/to/MyApp/Flutter/`。

```console
$ flutter build ios-framework --output=/path/to/MyApp/Flutter/
```

每次在 Flutter 模組中修改程式碼後，都需重新執行此指令。

產生的專案結構應類似以下目錄樹。

<FileTree>

- /path/to/MyApp/
  - Flutter/
    - Debug/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework (If you have plugins with iOS-platform code)
      - example_plugin.xcframework (One framework file for each plugin)
    - Profile/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework
      - example_plugin.xcframework
    - Release/
      - Flutter.xcframework
      - App.xcframework
      - FlutterPluginRegistrant.xcframework
      - example_plugin.xcframework

</FileTree>

:::warning
請務必使用位於同一目錄下的 `Flutter.xcframework` 與 `App.xcframework` 套件。
混用來自不同目錄的 `.xcframework` 匯入
（例如以 `Profile/Flutter.xcframework` 搭配 `Debug/App.xcframework`）
會導致執行階段崩潰。
:::
