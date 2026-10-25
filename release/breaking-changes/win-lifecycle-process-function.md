# 引入 FlutterEngine::ProcessExternalWindowMessage

> 外部視窗應呼叫 ProcessExternalWindowMessage， 以納入應用程式生命週期事件的考量。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

當你在 Flutter 應用程式中新增任何外部視窗時，
你需要將它們納入 Window 的應用程式生命週期邏輯中。
為了納入該視窗，其 `WndProc` 函式應該呼叫
`FlutterEngine::ProcessExternalWindowMessage`。

## 受影響對象

針對 Flutter 3.13 或更新版本建置，且會開啟非 Flutter 視窗的 Windows 應用程式。

## 變更說明

在 Windows 上實作應用程式生命週期時，需要監聽 Window 訊息，以便更新生命週期狀態。若要讓額外的非 Flutter 視窗影響生命週期狀態，必須從它們的 `WndProc` 函式將其視窗訊息轉發至 `FlutterEngine::ProcessExternalWindowMessage`。此函式會回傳一個 `std::optional<LRESULT>`，當訊息被接收但未被消耗時，該值為 `std::nullopt`。當回傳結果有值時，表示該訊息已被消耗，`WndProc` 中的後續處理應停止。

## 遷移指南

以下範例 `WndProc` 程序會呼叫
`FlutterEngine::ProcessExternalWindowMessage`：

```cpp
LRESULT Window::Messagehandler(HWND hwnd, UINT msg, WPARAM wparam, LPARAM lparam) {
    std::optional<LRESULT> result = flutter_controller_->engine()->ProcessExternalWindowMessage(hwnd, msg, wparam, lparam);
    if (result.has_value()) {
        return *result;
    }
    // Original contents of WndProc...
}
```

## 時程

合併於版本：3.14.0-3.0.pre<br>
正式版釋出：3.16

## 參考資料

相關 PR：

* [Reintroduce Windows lifecycle with guard for posthumous OnWindowStateEvent][]

[Reintroduce Windows lifecycle with guard for posthumous OnWindowStateEvent]: https://github.com/flutter/engine/pull/44344

