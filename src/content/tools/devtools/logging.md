---
title: 使用 Logging 檢視
description: 學習如何使用 DevTools 的 Logging 檢視。
---

:::note
Logging 檢視可用於所有 Flutter 和 Dart 應用程式。
:::

## 什麼是 Logging 檢視？

Logging 檢視會顯示來自 Dart 執行階段（runtime）、應用程式框架（如 Flutter），以及應用程式層級的日誌事件。

## 標準日誌事件

預設情況下，Logging 檢視會顯示：

* 來自 Dart 執行階段的垃圾回收（garbage collection）事件
* Flutter 框架事件，例如畫面幀建立（frame creation）事件
* 應用程式中的 `stdout` 和 `stderr`
* 應用程式自訂的日誌事件

![Screenshot of a logging view](/assets/images/docs/tools/devtools/logging_log_entries.png){:width="100%"}

## 從你的應用程式進行日誌紀錄

若要在你的程式碼中實作日誌紀錄，請參閱
[Debugging Flutter apps programmatically][Debugging Flutter apps programmatically]
頁面中的 [Logging][Logging] 章節。

## 清除日誌

若要清除 Logging 檢視中的日誌條目，請點擊 **Clear logs** 按鈕。

[Logging]: /testing/code-debugging#add-logging-to-your-application
[Debugging Flutter apps programmatically]: /testing/code-debugging

## 其他資源

想了解不同的日誌紀錄方法，以及如何有效利用 DevTools 更快速地分析與除錯 Flutter 應用程式，請參考有導引的 [Logging View tutorial][logging-tutorial]。

[logging-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-logging-view-part-5-of-8-b634f3a3af26
