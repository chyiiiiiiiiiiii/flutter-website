---
title: TestWidgetsFlutterBinding.clock 變更
description: Clock 實作現在來自 package:clock。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`TestWidgetsFlutterBinding.clock` 現在來自
`package:clock`，而不是 `package:quiver`。

## 背景

`flutter_test` 套件正在移除對較重的 `quiver` 套件的相依性，改為依賴兩個更有針對性且較輕量的套件：
`clock` 和 `fake_async`。

這可能會影響使用者程式碼，例如從
`TestWidgetsFlutterBinding` 取得 clock 並傳遞給期望接受來自 `package:quiver` 的 `Clock` 的 API，
像是以下這類程式碼：

```dart
testWidgets('some test', (WidgetTester tester) {
  someApiThatWantsAQuiverClock(tester.binding.clock);
});
```

## 遷移指南

在此變更之後，你可能會看到如下所示的錯誤訊息：

```plaintext
Error: The argument type 'Clock/*1*/' can't be assigned to the parameter type 'Clock/*2*/'.
 - 'Clock/*1*/' is from 'package:clock/src/clock.dart' ('<pub-cache>/clock/lib/src/clock.dart').
 - 'Clock/*2*/' is from 'package:quiver/time.dart' ('<pub-cache>/quiver/lib/time.dart').
```

### 選項 #1：從 package:clock 的 Clock 建立 package:quiver 的 Clock

最簡單的遷移方式是從 `package:clock` 的 clock 建立一個 `package:quiver` 的 clock，
只需將 `.now` 函式的 tearoff 傳遞給 `Clock` 建構子即可：

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

如果你擁有正在呼叫的 API，
你可以考慮將它修改為接受來自 `package:clock` 的 `Clock`。
這需要依據有多少地方在呼叫此 API 時，
傳入的不是從 `TestWidgetsFlutterBinding` 取得的 clock 來判斷。

如果你採用這種做法，
那些傳入 `tester.binding.clock` 的呼叫端就不需要修改，
但其他呼叫端則需要調整。

### 選項 #3：將 API 修改為接受 `DateTime function()`

如果你只用 `Clock` 的 `now` 函式，
而且你可以控制這個 API，那麼你也可以直接將它
改為接受該函式本身，而不是 `Clock`。
這樣一來，不論是哪一種類型的 `Clock`，
都可以透過傳入該 clock 類型的 `now` 方法的 tearoff 來呼叫：

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
穩定版發佈於：1.20

## 參考資料

API 文件：

* [`TestWidgetsFlutterBinding`][]

相關 PR：

* [PR 54125][]：移除 flutter_test 的 quiver 相依性，
  改為使用 fake_async 與 clock

[`TestWidgetsFlutterBinding`]: {{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding-class.html
[PR 54125]: {{site.repo.flutter}}/pull/54125
