---
title: 平台通道測試介面遷移至 flutter_test 套件
description: >
   與 setMockMessageHandler 方法相關的 API
   已從 package:flutter 遷移至 package:flutter_test
---

{% render "docs/breaking-changes.md" %}

## 摘要

下列方法已由 `flutter_test` 套件中的 API 取代：

* `BinaryMessenger.checkMessageHandler`
* `BinaryMessenger.setMockMessageHandler`
* `BinaryMessenger.checkMockMessageHandler`
* `BasicMessageChannel.setMockMessageHandler`
* `MethodChannel.checkMethodCallHandler`
* `MethodChannel.setMockMethodCallHandler`
* `MethodChannel.checkMockMethodCallHandler`

`onPlatformMessage` 回呼（callback）已不再被 Flutter 框架使用。

## 背景說明

作為底層插件通訊架構重構的一部分，我們已經從先前的 `onPlatformMessage`/`handlePlatformMessage`
邏輯，遷移到由引擎中 `ChannelBuffers` 類別實作的每通道緩衝系統。
為了維持與現有程式碼的相容性，現有的 `BinaryMessenger.setMessageHandler` API
已重構為使用新的 `ChannelBuffers` API。

`ChannelBuffers` API 與先前 API 之間的一個差異是，新 API 在處理非同步方面更加一致。
因此，訊息傳遞相關的 API 現在完全採用非同步方式。

這對於舊有測試 API 的實作造成了一些問題，這些 API 基於歷史原因，
原本位於 `flutter` 套件中。
由於它們依賴底層邏輯部分為同步，因此需要進行重構。
為了避免將更多測試邏輯加入 `flutter` 套件，
我們決定將這部分邏輯遷移到 `flutter_test` 套件。

## 變更說明

具體而言，下列 API 受到影響：

* `BinaryMessenger.checkMessageHandler`：已淘汰。
* `BinaryMessenger.setMockMessageHandler`：已由
  `TestDefaultBinaryMessenger.setMockMessageHandler` 取代。
* `BinaryMessenger.checkMockMessageHandler`：已由
   `TestDefaultBinaryMessenger.checkMockMessageHandler` 取代。
* `BasicMessageChannel.setMockMessageHandler`：已由
   `TestDefaultBinaryMessenger.setMockDecodedMessageHandler` 取代。
* `MethodChannel.checkMethodCallHandler`：已淘汰。
* `MethodChannel.setMockMethodCallHandler`：已由
   `TestDefaultBinaryMessenger.setMockMethodCallHandler` 取代。
* `MethodChannel.checkMockMethodCallHandler`：已由
   `TestDefaultBinaryMessenger.checkMockMessageHandler` 取代。

這些替代方案僅適用於使用新 `TestDefaultBinaryMessengerBinding` 的程式碼
（例如在 `flutter_test` 測試中使用 `testWidgets` 的任何程式碼）。
針對生產環境中使用這些 API 的程式碼，並無替代方案，因為這些 API 並非設計給生產環境使用。

使用 `checkMessageHandler` 的測試在新 API 中沒有對應功能，因為訊息處理器的註冊是由 `ChannelBuffers` 物件直接處理，
且該物件不會公開目前註冊於某個通道的 listener。
（驗證 handler 註冊的測試似乎相當罕見。）

需要遷移的程式碼可能會看到如下錯誤訊息：

```plaintext
  error - The method 'setMockMessageHandler' isn't defined for the type 'BinaryMessenger' at test/sensors_test.dart:64:8 - (undefined_method)

  error • The method 'setMockMethodCallHandler' isn't defined for the type 'MethodChannel' • test/widgets/editable_text_test.dart:5623:30 • undefined_method

[error] The method 'setMockMessageHandler' isn't defined for the type 'BasicMessageChannel' (test/material/feedback_test.dart:37:36)
```

此外，原本由框架掛載以接收來自插件訊息的 `onPlatformMessage` 回呼（callback），現已不再使用（未來也將移除）。因此，呼叫此回呼（callback）以將訊息注入框架，現在將不再產生任何效果。

## 遷移指南

`flutter_test` 套件提供了一些 shim（兼容層），讓過時的 `setMock...` 和 `checkMock...` 方法仍可繼續運作。
先前未匯入 `package:flutter_test/flutter_test.dart` 的測試程式，
可以透過匯入該套件來啟用這些 shim；
這通常足以讓大多數程式碼順利遷移。

不過，這些 shim API 已被標記為不建議使用（deprecated）。因此，在使用 `WidgetTester` 的程式碼中（例如，使用 `testWidgets`），建議改用以下模式來取代對這些方法的呼叫
（其中 `tester` 為 `WidgetTester` 實例）：

```dart
// old code
ServicesBinding.defaultBinaryMessenger.setMockMessageHandler(...);
ServicesBinding.defaultBinaryMessenger.checkMockMessageHandler(...);
// new code
tester.binding.defaultBinaryMessenger.setMockMessageHandler(...);
tester.binding.defaultBinaryMessenger.checkMockMessageHandler(...);
```

```dart
// old code
myChannel.setMockMessageHandler(...);
myChannel.checkMockMessageHandler(...);
// new code
tester.binding.defaultBinaryMessenger.setMockDecodedMessageHandler(myChannel, ...);
tester.binding.defaultBinaryMessenger.checkMockMessageHandler(myChannel, ...);
```

```dart
// old code
myMethodChannel.setMockMethodCallHandler(...);
myMethodChannel.checkMockMethodCallHandler(...);
// new code
tester.binding.defaultBinaryMessenger.setMockMethodCallHandler(myMethodChannel, ...);
tester.binding.defaultBinaryMessenger.checkMockMessageHandler(myMethodChannel, ...);
```

使用 `package:test` 和 `test()` 的測試，可以改為使用 `package:flutter_test` 和 `testWidgets()`，以取得 `WidgetTester` 的存取權限。

沒有存取 `WidgetTester` 的程式碼，可以參考 `TestDefaultBinaryMessengerBinding.instance!.defaultBinaryMessenger`，而不是 `tester.binding.defaultBinaryMessenger`。

未使用預設測試元件 (Widget) 綁定（`AutomatedTestWidgetsFlutterBinding`，由 `testWidgets` 初始化）的測試，可以將 `TestDefaultBinaryMessengerBinding` mixin 混入其綁定中，以獲得相同的效果。

操作 `onPlatformMessage` 的測試將無法如預期運作。若要向 framework 傳送模擬訊息，請考慮使用 `ChannelBuffers.push`。
在新的 API 中，沒有機制可以攔截來自插件的訊息並將其轉發給 framework。
如果你的使用情境需要這樣的機制，請回報 bug。

## 時程

合併於版本：2.3.0-17.0.pre.1<br>
穩定版釋出：2.5

## 參考資料

API 文件：

* [`TestDefaultBinaryMessenger`][]
* [`TestDefaultBinaryMessengerBinding`][]

相關 PR：

* [PR #76288: Migrate to ChannelBuffers.push][]

[`TestDefaultBinaryMessenger`]: {{site.api}}/flutter/flutter_test/TestDefaultBinaryMessenger-class.html
[`TestDefaultBinaryMessengerBinding`]: {{site.api}}/flutter/flutter_test/TestDefaultBinaryMessengerBinding-mixin.html

[PR #76288: Migrate to ChannelBuffers.push]: {{site.repo.flutter}}/pull/76288
