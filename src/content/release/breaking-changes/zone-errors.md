---
title: "\"Zone 不相符\" 訊息"
description: >
  當 Flutter 的綁定（bindings）在與 `runApp` 使用的 Zone 不同的區域（Zone）中初始化時，系統會在主控台顯示警告訊息。
---

{% render docs/breaking-changes.md %}

## 摘要

自 Flutter 3.10 起，框架會偵測 Zone 使用上的不一致，並在偵錯（debug）模式下於主控台回報相關訊息。

## 背景說明

Zone 是 Dart 中用於管理回呼（callback）的一種機制。雖然 Zone 主要用於在測試中覆寫 `print` 和 `Timer` 邏輯，以及攔截測試中的錯誤，但有時也會用來將全域變數的作用範圍限定於應用程式的特定部分。

Flutter 要求（且一直以來都要求）所有框架程式碼必須在同一個 Zone 中執行。特別需要注意的是，呼叫 `WidgetsFlutterBinding.ensureInitialized()` 時，應當與呼叫 `runApp()` 處於同一個 Zone。

過去，Flutter 並不會偵測這類 Zone 不一致的情況。這有時會導致難以追蹤與除錯的隱晦問題。例如，鍵盤輸入的回呼可能會在一個無法存取預期 `zoneValues` 的 Zone 中被觸發。根據我們的經驗，大多數（如果不是全部的話）在 Zone 的使用上未能保證 Flutter 框架所有部分都在同一個 Zone 執行的程式碼，都存在潛在的錯誤。這些錯誤通常表面上與 Zone 的使用無關。

為了協助開發者發現這類不小心違反此不變條件（invariant）的情況，自 Flutter 3.10 起，當偵測到 Zone 不一致時，會在偵錯模式下於主控台顯示非致命警告。該警告訊息如下所示：

```plaintext
════════ Exception caught by Flutter framework ════════════════════════════════════
The following assertion was thrown during runApp:
Zone mismatch.

The Flutter bindings were initialized in a different zone than is now being used.
This will likely cause confusion and bugs as any zone-specific configuration will
inconsistently use the configuration of the original binding initialization zone or
this zone based on hard-to-predict factors such as which zone was active when a
particular callback was set.
It is important to use the same zone when calling `ensureInitialized` on the
binding as when calling `runApp` later.
To make this warning fatal, set BindingBase.debugZoneErrorsAreFatal to true before
the bindings are initialized (i.e. as the first statement in `void main() { }`).
[...]
═══════════════════════════════════════════════════════════════════════════════════
```

你可以透過將 [`BindingBase.debugZoneErrorsAreFatal`][`BindingBase.debugZoneErrorsAreFatal`] 設定為 `true`，讓該警告變成致命錯誤。這個旗標在未來的 Flutter 版本中，預設值可能會改為 `true`。

## 遷移指南

最好的方式來消除此訊息，是從應用程式中移除對 Zones 的使用。

Zones 本質上是全域變數，因此非常難以除錯，且會破壞封裝性。最佳實踐是避免使用全域變數與 zones。

如果無法移除 zones（例如應用程式依賴第三方函式庫，而該函式庫需要 zones 來進行設定），那麼所有呼叫 Flutter 框架的程式碼應該都要移動到同一個 zone 內。

通常，這代表需要將對 `WidgetsFlutterBinding.ensureInitialized()` 的呼叫，移到與對 `runApp()` 呼叫相同的閉包（closure）中。

當 `runApp` 執行所在的 zone，是透過從外掛取得的 `zoneValues` 進行初始化時（這通常需要先呼叫 `WidgetsFlutterBinding.ensureInitialized()`），這種情況會比較棘手。

在這類情境下，一種做法是將一個可變物件放入 `zoneValues`，並在值可用時再更新該物件。

```dart
import 'dart:async';
import 'package:flutter/material.dart';

class Mutable<T> {
  Mutable(this.value);
  T value;
}

void main() {
  var myValue = Mutable<double>(0.0);
  Zone.current.fork(
    zoneValues: {
      'myKey': myValue,
    }
  ).run(() {
    WidgetsFlutterBinding.ensureInitialized();
    var newValue = ...; // obtain value from plugin
    myValue.value = newValue; // update value in Zone
    runApp(...);
  });
}
```

在需要使用 `myKey` 的程式碼中，
可以透過間接方式，使用 `Zone.current['myKey'].value` 來取得。

當這類解決方案無法運作時，
例如某個第三方相依套件要求針對特定的 `zoneValues` key 使用特定型別，
則所有進入該相依套件的呼叫
都可以包裹在 `Zone` 呼叫中，並提供適當的值。

強烈建議以這種方式使用 zones 的套件
應遷移至更易於維護的解決方案。

## 時程

合併於版本：3.9.0-9.0.pre<br>
正式版發佈：3.10.0

## 參考資料

API 文件：

* [`Zone`][`Zone`]
* [`BindingBase.debugZoneErrorsAreFatal`][`BindingBase.debugZoneErrorsAreFatal`]

相關議題：

* [Issue 94123][Issue 94123]：當 ensureInitialized
  在與 runApp 不同的 zone 被呼叫時，Flutter framework 未發出警告

相關 PR：

* [PR 122836][PR 122836]：新增斷言，確保 runApp
  與 binding.ensureInitialized 在相同 zone 被呼叫

[`Zone`]: {{site.api}}/flutter/dart-async/Zone-class.html
[`BindingBase.debugZoneErrorsAreFatal`]: {{site.api}}/flutter/foundation/BindingBase/debugZoneErrorsAreFatal.html
[Issue 94123]: {{site.repo.flutter}}/issues/94123
[PR 122836]: {{site.repo.flutter}}/pull/122836
