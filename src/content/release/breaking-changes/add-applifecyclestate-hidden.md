---
title: 新增 AppLifecycleState.hidden 的遷移指南
description: AppLifecycleState 新增了一個 hidden 狀態。
---

{% render docs/breaking-changes.md %}

## 摘要

[`AppLifecycleState`][`AppLifecycleState`] 列舉新增了一個新的 `hidden` 狀態，用來表示應用程式目前處於不可見的狀態。

## 背景說明

`AppLifecycleState` 列舉用於標示應用程式在呼叫 [`WidgetsBindingObserver.didChangeAppLifecycleState`][`WidgetsBindingObserver.didChangeAppLifecycleState`] 時所處的生命週期狀態。

## 變更說明

`AppLifecycleState.hidden` 這個新狀態已經加入 `AppLifecycleState` 列舉，並屬於 `dart:ui` 套件。

當所有應用程式視圖都不再對使用者可見時，便會進入 `hidden` 狀態。在 Android 和 iOS 上，當狀態機從 inactive 轉為 paused，或從 paused 轉為 inactive 時，會短暫進入此狀態。進入 paused 或 inactive 狀態時不會改變為此狀態。在其他平台上，只要應用程式處於不可見狀態，便會維持在此狀態。

## 遷移指南

如果程式碼中有針對 `AppLifecycleState` 列舉進行所有情境處理的 switch 陳述式，則需要新增一個 case 來處理 `AppLifecycleState.hidden` 狀態。

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

如果在 switch 陳述式中已經有 `default:` 的 case，或是程式碼改用條件判斷來處理，那麼程式碼將可在不修改的情況下編譯通過，但仍需檢查 default case 或條件判斷，以決定是否也需要處理 `hidden` 狀態。

## 時程

合併至版本：3.11.0-16.0.pre<br>  
正式版發行：3.13.0

## 參考資料

相關 PR：

* [PR 42418][PR 42418]：新增 `AppLifecycleState.hidden` enum 值

[PR 42418]: {{site.repo.engine}}/pull/42418
[`WidgetsBindingObserver.didChangeAppLifecycleState`]: {{site.api}}/flutter/widgets/WidgetsBindingObserver/didChangeAppLifecycleState.html
[`AppLifecycleState`]: {{site.api}}/flutter/dart-ui/AppLifecycleState.html
