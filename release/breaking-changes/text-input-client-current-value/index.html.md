# TextInputClient currentTextEditingValue

> 在 `TextInputClient` 介面中新增一個欄位， 以便從 client 取得目前的 TextEditingValue。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

在 `TextInputClient` 介面中新增一個欄位 `currentTextEditingValue`，
讓平台 client 能夠取得可編輯文字欄位（text field）的目前值。

## 背景

`TextInputClient` 類別被 Flutter 框架用來與平台端程式碼溝通，
以取得像是 `EditableText` 這類文字輸入元件 (Widget) 的目前狀態。

當 Android 應用程式切換到背景時，平台端可能會遺失其狀態。
自本次變更起，應用程式可以向框架查詢最後已知的狀態。
為了取得這項資訊，`TextEditingValue` 已經對 `TextInputClient` 提供。

## 變更說明

在某些支援的平台上，應用程式可能會被移到背景，
此時預期應用程式應減少資源消耗。
例如，在 Android 上被移到背景的應用程式應避免不必要的記憶體消耗，
且不需要保留對視圖（views）的參考。
在這項變更之前，當應用程式回到前景時，
Android 特定的平台程式碼可能會遺失可編輯文字欄位的狀態資訊。
例如，當在 `TextField` 元件中輸入的文字在 Java 程式碼中遺失，
但 Dart 程式碼仍然記得該內容時，就會出現這種情況。

自本次變更起，平台端現在會透過 `textInput` channel
發送名為 `TextInput.requestExistingState` 的訊息。
這會通知 Dart 程式碼，當應用程式喚醒時，
應重新建立所有文字輸入連線，
並將其最近一次已知的編輯狀態通知給平台端。

`TextInput` 類別會透過 `TextInputClient` 介面與 client 元件互動。
這個介面先前無法得知 client 目前的值。
為了讓 `TextInput` 類別能夠正確回應 `TextInput.requestExistingState`，
在 `TextInputClient` 中新增了一個名為 `currentTextEditingValue` 的 getter。
你無法安全地使用最後一次傳給 `TextInputConnection.setEditingState` 的值，
因為 client 只會在特定情境下呼叫該方法，
例如當 Dart 程式碼直接修改 `TextEditingController` 的值，
而這種修改方式並不會直接反映平台對鍵盤輸入事件的原生處理結果。
這正是 `TextInputFormatter` 通常的運作方式，
或是當 Dart 程式碼直接設定 `TextEditingController.value` 時會發生的情況。

## 遷移指南

如果你先前有實作或繼承 `TextEditingClient`，
你現在必須為 `currentTextEditingValue` 新增適當的覆寫（override）。

這個值可能為 null。

如果你希望在這項變更正式推出前就進行遷移，
你可以在你的類別中加入類似以下的內容：

```dart
abstract class _TemporaryTextEditingClient {
  TextEditingValue get currentTextEditingValue;
}
```

這讓你可以在變更進入 framework 之前，使用
`@override` 註解來新增新的成員。
之後，你可以移除暫時的介面定義。

遷移前的程式碼：

```dart
class _MyCustomTextWidgetState extends State<MyCustomWidget> implements TextEditingClient {
  ...

  @override
  void updateEditingValue(TextEditingValue value) {
    ...
  }

  @override
  void performAction(TextInputAction action) {
    ...
  }

  @override
  void updateFloatingCursor(RawFloatingCursorPoint point) {
    ...
  }
}
```

遷移後的程式碼：

```dart
class _MyCustomTextWidgetState extends State<MyCustomWidget> implements TextEditingClient {
  ...

  @override
  TextEditingValue get currentTextEditingValue => widget.textEditingController.value;

  @override
  void updateEditingValue(TextEditingValue value) {
    ...
  }

  @override
  void performAction(TextInputAction action) {
    ...
  }

  @override
  void updateFloatingCursor(RawFloatingCursorPoint point) {
    ...
  }
}
```

## 時間軸

合併於版本：1.16.3<br>
進入穩定版：1.17

## 參考資料

API 文件：

* [`TextInput`][]
* [`TextInputClient`][]
* [`EditableText`][]
* [`SystemChannels.textInput`][]

相關議題：

* [Issue 47137][]

相關 PR：

* [Fix requestExistingInputState response][]


[`EditableText`]: https://api.flutter.dev/flutter/widgets/EditableText-class.html
[Fix requestExistingInputState response]: https://github.com/flutter/flutter/pull/47472
[Issue 47137]: https://github.com/flutter/flutter/issues/47137
[`TextInput`]: https://api.flutter.dev/flutter/services/TextInput-class.html
[`TextInputClient`]: https://api.flutter.dev/flutter/services/TextInputClient-class.html
[`SystemChannels.textInput`]: https://api.flutter.dev/flutter/services/SystemChannels/textInput-constant.html

