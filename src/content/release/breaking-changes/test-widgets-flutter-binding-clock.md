---
title: TestWidgetsFlutterBinding.clock 變更
description: 現在的 Clock 實作來自 package:clock。
---

{% render docs/breaking-changes.md %}

## 摘要

`TestWidgetsFlutterBinding.clock` 現在來自
`package:clock`，而不是 `package:quiver`。

## 背景說明

`flutter_test` 套件正在移除對較重的 `quiver` 套件的相依性，改為依賴兩個更有針對性且輕量的套件，
也就是 `clock` 和 `fake_async`。

這可能會影響到使用者程式碼，例如從
`TestWidgetsFlutterBinding` 取得 clock 並傳遞給預期來自 `package:quiver` 的 `Clock` 的 API，
像是以下這類程式碼：

```dart
testWidgets('some test', (WidgetTester tester) {
  someApiThatWantsAQuiverClock(tester.binding.clock);
});
```

## 遷移指南

此變更後你可能會看到的錯誤訊息如下所示：

```plaintext
Error: The argument type 'Clock/*1*/' can't be assigned to the parameter type 'Clock/*2*/'.
 - 'Clock/*1*/' is from 'package:clock/src/clock.dart' ('<pub-cache>/clock/lib/src/clock.dart').
 - 'Clock/*2*/' is from 'package:quiver/time.dart' ('<pub-cache>/quiver/lib/time.dart').
```

### 選項 #1：從 package:clock 的 Clock 建立 package:quiver 的 Clock

最簡單的遷移方式是從 `package:clock` clock 建立 `package:quiver` clock，只需將 `.now` 函式 tearoff 傳遞給 `Clock` 建構函式即可：

遷移前的程式碼：

```dart
testWidgets('some test', (WidgetTester tester) {
  someApiThatWantsAQuiverClock(tester.binding.clock);
});
```

遷移後的程式碼：

```dart
testWidgets('some test', (WidgetTester tester) {
  someApiThatWantsAQuiverClock(Clock(tester.binding.clock.now));
});
```

### 選項 #2：將 API 修改為接受 package:clock 的 Clock

如果你擁有你所呼叫的 API，
你可以考慮將其修改為接受來自`package:clock`的`Clock`。
這需要根據有多少地方
以非從`TestWidgetsFlutterBinding`取得的 clock 呼叫此 API 來判斷。

如果你選擇這個做法，傳遞`tester.binding.clock`的呼叫端不需要修改，
但其他呼叫端則需要調整。

### 選項 #3：將 API 修改為接受`DateTime function()`

如果你只使用`Clock`的`now`函式，
且你能控制該 API，那麼你也可以將其
直接改為接受該函式，而不是`Clock`。
這樣可以讓你用任一類型的`Clock`輕鬆呼叫，
只需傳入任一類型 clock 的`now`方法 tearoff 即可：

遷移前的呼叫程式碼：

```dart
testWidgets('some test', (WidgetTester tester) {
  someApiThatWantsAQuiverClock(tester.binding.clock);
});
```

遷移後的呼叫程式碼：

```dart
testWidgets('some test', (WidgetTester tester) {
  modifiedApiThatTakesANowFunction(tester.binding.clock.now);
});
```

## 時間軸

合併於版本：1.18.0<br>  
於穩定版發佈：1.20

## 參考資料

API 文件：

* [`TestWidgetsFlutterBinding`][`TestWidgetsFlutterBinding`]

相關 PR：

* [PR 54125][PR 54125]：移除 flutter_test 對 quiver 的依賴，
  改為使用 fake_async 與 clock

[`TestWidgetsFlutterBinding`]: {{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding-class.html
[PR 54125]: {{site.repo.flutter}}/pull/54125
