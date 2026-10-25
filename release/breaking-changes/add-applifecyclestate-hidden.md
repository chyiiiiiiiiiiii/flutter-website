# 新增 AppLifecycleState.hidden 的遷移指南

> AppLifecycleState 新增了一個 hidden 狀態。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

在 [`AppLifecycleState`][] 列舉（enum）中新增了一個 `hidden` 狀態，用於表示應用程式目前處於不可見狀態。

## 背景說明

`AppLifecycleState` 列舉（enum）用於指示當 [`WidgetsBindingObserver.didChangeAppLifecycleState`][]
被呼叫時，應用程式目前所處的生命週期狀態。

## 變更說明

在 `dart:ui` 套件中的 `AppLifecycleState` 列舉（enum）新增了一個新的狀態 `AppLifecycleState.hidden`。

當所有應用程式視圖（views）都不再對使用者可見時，會進入 `hidden` 狀態。在 Android 和 iOS 上，當狀態機從 inactive 轉換到 paused，或從 paused 轉換到 inactive 時，會短暫進入此狀態。進入 paused 或 inactive 狀態時不會改變為此狀態。在其他平台上，只要應用程式不可見時，則會處於此狀態。

## 遷移指南

如果程式碼中有針對 `AppLifecycleState` 列舉（enum）所有情況的 switch 陳述式，則需要新增一個 case 來處理 `AppLifecycleState.hidden` 狀態。

遷移前的程式碼：

```dart
void didChangeAppLifecycleState(AppLifecycleState state) {
  switch (state) {
    case AppLifecycleState.resumed:
    case AppLifecycleState.inactive:
      // Do something when the app is visible...
      break;
    case AppLifecycleState.paused:
    case AppLifecycleState.detached:
      // Do something when the app is not visible...
      break;
  }
}
```

遷移後的程式碼：

```dart
void didChangeAppLifecycleState(AppLifecycleState state) {
  switch (state) {
    case AppLifecycleState.resumed:
    case AppLifecycleState.inactive:
      // Do something when the app is visible...
      break;
    case AppLifecycleState.hidden:  // <-- This is the new state.
    case AppLifecycleState.paused:
    case AppLifecycleState.detached:
      // Do something when the app is not visible...
      break;
  }
}
```

如果在 switch 陳述式中已經有 `default:` case，或是程式碼改用條件判斷來處理，那麼程式碼可以不經修改就順利編譯，但仍需檢查 default case 或條件判斷，以決定是否也應處理 `hidden` 狀態。

## 時程

合併至版本：3.11.0-16.0.pre<br>
穩定版釋出：3.13.0

## 參考資料

相關 PR：

* [PR 42418][]：新增 `AppLifecycleState.hidden` enum 值

[PR 42418]: https://github.com/flutter/engine/pull/42418
[`WidgetsBindingObserver.didChangeAppLifecycleState`]: https://api.flutter.dev/flutter/widgets/WidgetsBindingObserver/didChangeAppLifecycleState.html
[`AppLifecycleState`]: https://api.flutter.dev/flutter/dart-ui/AppLifecycleState.html

