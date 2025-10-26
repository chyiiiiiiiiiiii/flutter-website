---
title: 將 ShortcutActivator 與 ShortcutManager 遷移至 KeyEvent 系統
description: >
  原始鍵盤事件子系統已被鍵盤事件子系統取代，
  使用 RawKeyEvent 與 RawKeyboard 的 API 已轉換為 KeyEvent 與 HardwareKeyboard。
---

{% render docs/breaking-changes.md %}

## 摘要

Flutter 已經同時實作了兩套鍵盤事件（key event）系統有一段時間（數年）。新的系統已經與舊有的、平台特定的原始鍵盤事件系統達到功能等價，且原始系統即將被移除。為了因應這一變化，Flutter 中使用舊系統的 API 正在進行調整，並且我們決定對其中部分 API 進行破壞性變更，以維持 API 的品質。

## 背景

在原本的鍵盤事件子系統中，為了處理各平台的特殊行為，框架與用戶端應用程式的程式碼變得過於複雜，且舊系統無法正確反映系統上鍵盤事件的真實狀態。

因此，新的 [`KeyEvent`][`KeyEvent`]-based 系統誕生了。為了將破壞性變更降到最低，這套新系統與舊系統並行實作，最終目標是淘汰原始系統。這個時刻即將到來，為了準備這一變動，我們對 API 進行了必要的、最小限度的破壞性調整，以維持 API 的品質。

## 變更說明

受影響的 API 摘要如下：

- `ShortcutActivator.accepts` 現在接收 `KeyEvent` 與 `HardwareKeyboard`。
- `ShortcutActivator.isActivatedBy` 現已棄用。請直接呼叫 `accepts`。
- `ShortcutActivator.triggers` 現在為選用，若未實作則回傳 null。
- `ShortcutManager.handleKeypress` 現在接收 `KeyEvent`。

這項變更將 `ShortcutActivator.accepts` 方法修改為接收 `KeyEvent` 與 `HardwareKeyboard`，不再是先前的 `RawKeyEvent` 與 `RawKeyboard`。

`ShortcutActivator.accepts` 的意義有些微調整。在變更前，假設只有當 `ShortcutActivator.triggers` 回傳 null，或傳給 `accepts` 的鍵盤事件具有在 `triggers` 清單中的邏輯鍵時，才會呼叫 `accepts`。現在則會一律呼叫，並且可以利用 `triggers` 清單來提升效能，但並非必須這麼做。Flutter 的子類別，例如 `SingleActivator` 與 `CharacterActivator` 已經這麼處理。

這項變更也將 `ShortcutManager.handleKeypress` 方法改為接收 `KeyEvent`，不再是 `RawKeyEvent`。

## 遷移指南

Flutter 框架所提供的 API 已經完成遷移。只有當你使用前述區段所列的方法時，才需要進行遷移。

### 遷移你使用 `ShortcutActivator` 或其子類別的 API

請傳入 `KeyEvent`，而非 `RawKeyEvent` 給 `ShortcutActivator.accepts`。
這可能代表你需要調整取得鍵盤事件的位置。依據你目前的取得方式，這可能需要從 `Focus.onKey` 改為使用 `Focus.onKeyEvent`，或是若你使用 `FocusScope`、`FocusNode` 或 `FocusScopeNode`，則做出類似的調整。

如果你正在使用 `RawKeyboardListener`，請改用 `KeyboardListener`。若你直接存取 `RawKeyboard`，請改用 `HardwareKeyboard`。你會發現所有鍵盤事件來源都有非 raw 的對應版本。

### 遷移你繼承 `ShortcutActivator` 的 API

`ShortcutActivator.accepts` 方法已修改為接收 `KeyEvent` 與 `HardwareKeyboard`，不再是 `RawKeyEvent` 與 `RawKeyboard`。

變更前：

```dart
class MyActivator extends ShortcutActivator {
  @override
  bool accepts(RawKeyEvent event, RawKeyboard state) {
    // ... (your implementation here)
    returns false;
  }
  // ...
}
```

之後：

```dart
class MyActivator extends ShortcutActivator {
  @override
  bool accepts(KeyEvent event, HardwareKeyboard state) {
    // ... (your implementation here)
    returns false;
  }
  // ...
}
```

### 遷移擴充 `ShortcutManager` 的 API

`ShortcutManager` 類別已經修改，在 `handleKeypress` 中改為接收 `KeyEvent`，而不是 `RawKeyEvent`。這兩個 API 之間的一個差異在於重複按鍵（repeated keys）的判斷方式不同。在 `RawKeyEvent` 的情境下，`repeat` 成員用來表示重複，但在 `RawKeyEvent` 的程式碼中，該事件屬於不同型別（`KeyRepeatEvent`）。

修改前：

```dart
class _MyShortcutManager extends ShortcutManager {
  @override
  KeyEventResult handleKeypress(BuildContext context, RawKeyEvent event) {
    if (event is! RawKeyDownEvent) {
      return KeyEventResult.ignored;
    }
    if (event.repeat) {
      // (Do something with repeated keys.)
    }
    // ... (your implementation here)
    return KeyEventResult.handled;
  }
}
```

之後：

```dart
class _MyShortcutManager extends ShortcutManager {
  @override
  KeyEventResult handleKeypress(BuildContext context, KeyEvent event) {
    if (event is! KeyDownEvent && event is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    if (event is KeyRepeatEvent) {
      // (Do something with repeated keys.)
    }
    // ... (your implementation here)
    return KeyEventResult.handled;
  }
}
```

## 時程

導入版本：3.17.0-5.0.pre<br>  
穩定版本釋出：3.19.0

## 參考資料

API 文件：

* [`KeyEvent`][`KeyEvent`]
* [`HardwareKeyboard`][`HardwareKeyboard`]
* [`ShortcutActivator`][`ShortcutActivator`]
* [`ShortcutManager`][`ShortcutManager`]

相關議題：

* [`RawKeyEvent` 和 `RawKeyboard` 等應該被棄用並移除（Issue 136419）][`RawKeyEvent` and `RawKeyboard`, et al should be deprecated and removed (Issue 136419)]

相關 PR：

* [為 ShortcutActivator 和 ShortcutManager 遷移至 KeyEvent（取代 RawKeyEvent）做準備][Prepare ShortcutActivator and ShortcutManager to migrate to KeyEvent from RawKeyEvent]

[`KeyEvent`]: {{site.api}}/flutter/services/KeyEvent-class.html
[`HardwareKeyboard`]: {{site.api}}/flutter/services/HardwareKeyboard-class.html
[`ShortcutActivator`]: {{site.api}}/flutter/widgets/ShortcutActivator-class.html
[`ShortcutManager`]: {{site.api}}/flutter/widgets/ShortcutManager-class.html
[`RawKeyEvent` and `RawKeyboard`, et al should be deprecated and removed (Issue 136419)]: {{site.repo.flutter}}/issues/136419
[Prepare ShortcutActivator and ShortcutManager to migrate to KeyEvent from RawKeyEvent]: {{site.repo.flutter}}/pull/136854
