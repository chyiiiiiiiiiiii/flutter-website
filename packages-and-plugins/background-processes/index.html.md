# 背景處理程序

> 在 Flutter 中實作背景處理程序的進階資訊。



你是否曾經想要在背景執行 Dart 程式碼——即使你的應用程式不是目前的前台應用程式？也許你想要實作一個監控時間的處理程序，或是偵測相機移動。在 Flutter 中，你可以在背景執行 Dart 程式碼。

這項功能的實現機制涉及設定 isolate。_Isolates_（隔離區）是 Dart 的多執行緒模型，不同於傳統的執行緒，isolate 不會與主程式共享記憶體。你可以透過 callback（回呼）與 callback dispatcher（回呼分派器）來設定 isolate 以進行背景執行。

此外，[WorkManager] 插件可實現持久性的背景處理，讓任務即使在應用程式重啟或系統重新開機後仍能繼續排程執行。

如需更多資訊，以及一個使用 Dart 程式碼背景執行的地理圍欄（geofencing）範例，請參考 Ben Konyi 的 Medium 文章：[Executing Dart in the Background with Flutter Plugins and Geofencing][background-processes]。在該文章結尾，你可以找到範例程式碼連結，以及 Dart、iOS 和 Android 的相關文件。

[background-processes]: https://blog.flutter.dev/executing-dart-in-the-background-with-flutter-plugins-and-geofencing-2b3e40a1a124
[WorkManager]: https://pub.dev/packages/workmanager

