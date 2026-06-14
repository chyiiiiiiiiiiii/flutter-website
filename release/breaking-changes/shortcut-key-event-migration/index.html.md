# 將 ShortcutActivator 與 ShortcutManager 遷移至 KeyEvent 系統

> 原始鍵盤事件子系統已被鍵盤事件子系統取代， 所有使用 RawKeyEvent 與 RawKeyboard 的 API 已轉換為 KeyEvent 與 HardwareKeyboard。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

Flutter 已經同時實作了兩套鍵盤事件（key events）系統有一段時間（數年）。新的系統已經與舊的、平台特定的原始鍵盤事件系統達到功能等同，且原始系統即將被移除。為了迎接這個變化，所有使用舊系統的 Flutter API 正在進行修改，並且對於其中少數 API，我們決定進行破壞性更動，以維持 API 的品質。

## 背景

在原始的鍵盤事件子系統中，為了處理各平台的特殊行為，無論是在框架還是用戶端應用程式，都導致了過於複雜的程式碼，而且舊系統無法正確反映系統上鍵盤事件的實際狀態。

因此，新的 [`KeyEvent`][]-為基礎的系統誕生了。為了將破壞性更動降到最低，新的系統與舊系統並行實作，最終目標是淘汰原始系統。這個時機很快就會到來，為了準備，我們已經針對 API 品質進行了必要的最小破壞性更動。

## 變更說明

受影響的 API 摘要如下：

- `ShortcutActivator.accepts` 現在接收 `KeyEvent` 與 `HardwareKeyboard`。
- `ShortcutActivator.isActivatedBy` 現已棄用。請直接呼叫 `accepts`。
- `ShortcutActivator.triggers` 現在為選填，若未實作則回傳 null。
- `ShortcutManager.handleKeypress` 現在接收 `KeyEvent`。

這項變更將 `ShortcutActivator.accepts` 方法修改為接收 `KeyEvent`
與 `HardwareKeyboard`，取代先前的 `RawKeyEvent` 與 `RawKeyboard`。

`ShortcutActivator.accepts` 的意義有些微調整。在此變更前，假設只有當 `ShortcutActivator.triggers` 回傳 null 時，
或傳給 `accepts` 的鍵盤事件（key event）具有在 `triggers` 清單中的 logical key 時，才會呼叫 `accepts`。現在則會無條件呼叫，且可選擇性地利用 `triggers` 清單提升效能，但並非強制。Flutter 的子類別如 `SingleActivator` 與 `CharacterActivator` 已經這麼做。

這項變更也將 `ShortcutManager.handleKeypress` 方法修改為接收
`KeyEvent`，取代先前的 `RawKeyEvent`。

## 遷移指南

Flutter 框架所提供的 API 已經完成遷移。只有當你使用上一節所列方法時，才需要進行遷移。

### 遷移你使用 `ShortcutActivator` 或其子類別的 API

請傳遞 `KeyEvent`，而非 `RawKeyEvent` 給 `ShortcutActivator.accepts`。
這可能意味著你需要調整取得鍵盤事件（key events）的方式。根據你取得事件的來源，可能需要從 `Focus.onKey` 切換為 `Focus.onKeyEvent`，或是如果你使用 `FocusScope`、`FocusNode` 或 `FocusScopeNode`，則進行類似的調整。

如果你使用的是 `RawKeyboardListener`，請改用
`KeyboardListener`。如果你直接存取 `RawKeyboard`，請改用
`HardwareKeyboard`。你會發現所有鍵盤事件來源都有非 raw 版本可用。

### 遷移你擴充 `ShortcutActivator` 的 API

`ShortcutActivator.accepts` 方法已修改為接收 `KeyEvent` 與
`HardwareKeyboard`，取代先前的 `RawKeyEvent` 與 `RawKeyboard`。

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

變更後：

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

`ShortcutManager` 類別已修改為在 `handleKeypress` 中接收 `KeyEvent`，而非 `RawKeyEvent`。這兩個 API 之間有一個差異：重複鍵的判斷方式不同。在 `RawKeyEvent` 的情況下，`repeat` 成員用於表示重複，但在 `KeyEvent` 的程式碼中，事件會是另一種型別（`KeyRepeatEvent`）。

變更前：

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

變更後：

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

合併於版本：3.17.0-5.0.pre<br>
正式版釋出於：3.19.0

## 參考資料

API 文件：

* [`KeyEvent`][]
* [`HardwareKeyboard`][]
* [`ShortcutActivator`][]
* [`ShortcutManager`][]

相關議題：

* [`RawKeyEvent` 和 `RawKeyboard` 等應該被棄用並移除（Issue 136419）][`RawKeyEvent` and `RawKeyboard`, et al should be deprecated and removed (Issue 136419)]

相關 PR：

* [準備將 ShortcutActivator 和 ShortcutManager 從 RawKeyEvent 遷移至 KeyEvent][Prepare ShortcutActivator and ShortcutManager to migrate to KeyEvent from RawKeyEvent]

[`KeyEvent`]: https://api.flutter.dev/flutter/services/KeyEvent-class.html
[`HardwareKeyboard`]: https://api.flutter.dev/flutter/services/HardwareKeyboard-class.html
[`ShortcutActivator`]: https://api.flutter.dev/flutter/widgets/ShortcutActivator-class.html
[`ShortcutManager`]: https://api.flutter.dev/flutter/widgets/ShortcutManager-class.html
[`RawKeyEvent` and `RawKeyboard`, et al should be deprecated and removed (Issue 136419)]: https://github.com/flutter/flutter/issues/136419
[Prepare ShortcutActivator and ShortcutManager to migrate to KeyEvent from RawKeyEvent]: https://github.com/flutter/flutter/pull/136854

