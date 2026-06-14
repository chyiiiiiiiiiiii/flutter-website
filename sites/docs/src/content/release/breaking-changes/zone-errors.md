---
title: "\"Zone 不相符\" 訊息"
description: >
  當 Flutter 的綁定（bindings）在與 `runApp` 使用的 Zone 不同的區域（Zone）中初始化時，會在主控台顯示警告訊息。
---

{% render "docs/breaking-changes.md" %}

## 摘要

自 Flutter 3.10 起，框架會在使用 Zone 時偵測到不相符的情況，並於除錯（debug）建置時將其回報至主控台。

## 背景

Zone 是 Dart 中用於管理回呼（callback）的一種機制。雖然 Zone 主要用於在測試中覆寫 `print` 和 `Timer` 邏輯，以及攔截測試中的錯誤，但有時也會用來將全域變數的作用範圍限定在應用程式的特定部分。

Flutter 要求（且一直以來都要求）所有框架程式碼必須在同一個 Zone 中執行。特別需要注意的是，呼叫 `WidgetsFlutterBinding.ensureInitialized()` 時，應該與呼叫 `runApp()` 處於同一個 Zone。

過去，Flutter 並不會偵測這類不相符的情況。這有時會導致難以追蹤與除錯的問題。例如，鍵盤輸入的回呼可能會在一個無法存取其預期 `zoneValues` 的 Zone 中被觸發。根據我們的經驗，幾乎所有未能保證 Flutter 框架所有部分都在同一個 Zone 下運作的 Zone 使用方式，都存在潛在的 bug。這些 bug 通常表面上與 Zone 的使用無關。

為了協助開發者避免不小心違反這項不變式（invariant），自 Flutter 3.10 起，當偵測到 Zone 不相符時，會在除錯建置中顯示非致命（non-fatal）警告。該警告訊息如下所示：

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

可以透過將 [`BindingBase.debugZoneErrorsAreFatal`][] 設定為 `true`，讓該警告變成致命錯誤。此旗標在未來的 Flutter 版本中，預設值可能會改為 `true`。

## 遷移指南

最好的方式來消除此訊息，是在應用程式內部移除對 Zones 的使用。Zones 本質上是全域變數，因此非常難以除錯，且會破壞封裝性。最佳實踐是避免使用全域變數與 zones。

如果無法移除 zones（例如應用程式依賴於某個第三方函式庫，而該函式庫需要 zones 來進行設定），那麼所有呼叫 Flutter 框架的程式碼應該都放在同一個 zone 內。通常，這代表需要將對 `WidgetsFlutterBinding.ensureInitialized()` 的呼叫，移到與 `runApp()` 呼叫相同的閉包（closure）中。

當 `runApp` 執行所在的 zone，是透過從插件取得的 `zoneValues` 進行初始化時（這通常需要先呼叫 `WidgetsFlutterBinding.ensureInitialized()`），這樣的調整會比較棘手。

在這種情境下，一種做法是將一個可變物件放入 `zoneValues`，並在值可用時再更新該物件。

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

在需要使用 `myKey` 的程式碼中，可以透過 `Zone.current['myKey'].value` 間接取得。

當這種解決方案無法運作，因為第三方相依套件要求針對特定的 `zoneValues` key 使用特定型別時，所有進入該相依套件的呼叫都可以包裹在 `Zone` 呼叫中，以提供合適的值。

強烈建議以這種方式使用 zones 的套件遷移至更易於維護的解決方案。

## 時程

合併於版本：3.9.0-9.0.pre<br>
正式版本：3.10.0

## 參考資料

API 文件：

* [`Zone`][]
* [`BindingBase.debugZoneErrorsAreFatal`][]

相關議題：

* [Issue 94123][]：Flutter framework 在 ensureInitialized
  被呼叫於與 runApp 不同的 zone 時未發出警告

相關 PR：

* [PR 122836][]：斷言 runApp 必須呼叫於
  與 binding.ensureInitialized 相同的 zone

[`Zone`]: {{site.api}}/flutter/dart-async/Zone-class.html
[`BindingBase.debugZoneErrorsAreFatal`]: {{site.api}}/flutter/foundation/BindingBase/debugZoneErrorsAreFatal.html
[Issue 94123]: {{site.repo.flutter}}/issues/94123
[PR 122836]: {{site.repo.flutter}}/pull/122836
