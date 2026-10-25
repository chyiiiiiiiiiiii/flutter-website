# 使用 Logging 檢視畫面

> 學習如何使用 DevTools 的 logging 檢視畫面。



:::note
logging 檢視畫面可搭配所有 Flutter 和 Dart 應用程式使用。
:::

## 什麼是 Logging 檢視畫面？

logging 檢視畫面會顯示來自 Dart 執行階段（runtime）、應用程式框架（如 Flutter），以及應用程式層級的日誌（logging）事件。

## 標準日誌事件

預設情況下，logging 檢視畫面會顯示：

* 來自 Dart 執行階段的垃圾回收（garbage collection）事件
* Flutter 框架事件，例如畫面幀建立（frame creation）事件
* `stdout` 和 `stderr` 來自應用程式的事件
* 應用程式自訂的日誌事件

![Screenshot of a logging view](/assets/images/docs/tools/devtools/logging_log_entries.png){:width="100%"}

## 從你的應用程式產生日誌

若要在你的程式碼中實作日誌功能，請參考
[Debugging Flutter apps programmatically][Debugging Flutter apps programmatically] 頁面的
[Logging][Logging] 章節。

## 清除日誌

若要清除 logging 檢視畫面中的日誌紀錄，請點擊 **Clear logs** 按鈕。

[Logging]: /testing/code-debugging#add-logging-to-your-application
[Debugging Flutter apps programmatically]: /testing/code-debugging

## 其他資源

想了解不同的日誌記錄方式，以及如何有效運用 DevTools
來更快分析和除錯 Flutter 應用程式，請參考導覽式的
[Logging View tutorial][logging-tutorial]。

[logging-tutorial]: https://medium.com/@fluttergems/mastering-dart-flutter-devtools-logging-view-part-5-of-8-b634f3a3af26

