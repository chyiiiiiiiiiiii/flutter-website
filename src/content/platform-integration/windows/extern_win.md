---
title: 在 Flutter Windows 應用程式中使用外部視窗
description: 在 Flutter 應用程式中新增外部視窗的特殊注意事項
---

# Windows 生命週期

## 影響對象

使用 Flutter 3.13 之後版本建置，並且會開啟非 Flutter 視窗的 Windows 應用程式。

## 概述

當你在 Flutter Windows 應用程式中新增非 Flutter 視窗時，預設情況下該視窗不會被納入應用程式生命週期狀態更新的邏輯中。例如，這代表當外部視窗顯示或隱藏時，應用程式的生命週期狀態不會正確地更新為 inactive（非活動）或 hidden（隱藏）。因此，應用程式可能會透過 [WidgetsBindingObserver.didChangeAppLifecycle][WidgetsBindingObserver.didChangeAppLifecycle] 收到錯誤的生命週期狀態變更。

# 我需要做什麼？

若要將外部視窗納入應用程式的這項邏輯中，該視窗的 `WndProc` 程序必須呼叫 `FlutterEngine::ProcessExternalWindowMessage`。

為達成此目的，請將以下程式碼加入視窗訊息處理函式中：

```cpp diff
  LRESULT Window::Messagehandler(HWND hwnd, UINT msg, WPARAM wparam, LPARAM lparam) {
+     std::optional<LRESULT> result = flutter_controller_->engine()->ProcessExternalWindowMessage(hwnd, msg, wparam, lparam);
+     if (result.has_value()) {
+         return *result;
+     }
      // Original contents of WndProc...
  }
```

[documentation of this breaking change.]: /release/breaking-changes/win_lifecycle_process_function
[WidgetsBindingObserver.didChangeAppLifecycle]: {{site.api}}/flutter/widgets/WidgetsBindingObserver/didChangeAppLifecycleState.html
