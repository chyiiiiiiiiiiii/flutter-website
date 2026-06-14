---
title: 將 RawKeyEvent/RawKeyboard 系統遷移至 KeyEvent/HardwareKeyboard 系統
description: >-
  原始鍵盤事件子系統已被鍵盤事件子系統取代，所有使用 RawKeyEvent 和 RawKeyboard 的 API
  都已轉換為 KeyEvent 和 HardwareKeyboard。
---

{% render "docs/breaking-changes.md" %}

## 摘要

Flutter 已經同時實作了兩套鍵盤事件（key events）系統有一段時間（數年）。
新的系統已經達到與舊有平台專屬原始鍵盤事件系統相同的功能，且原始系統已經被棄用。

## 背景說明

在原始鍵盤事件子系統中，為了處理每個平台的特殊情況，無論是在框架還是客戶端應用程式中，都導致程式碼過於複雜，而且舊系統無法正確反映系統上鍵盤事件的真實狀態。

舊版 API [`RawKeyboard`][] 已被棄用，
未來將會移除。
[`HardwareKeyboard`][] 和 [`KeyEvent`][] API 取代了這個舊版 API。
此變更的一個例子是 [`FocusNode.onKeyEvent`][]
取代了 `FocusNode.onKey`。

[`RawKeyboard`][] 的行為
所提供的事件模型比 [`HardwareKeyboard`][]
更不統一且不規則。
請參考以下例子：

* 按下（down）事件不一定會有對應的放開（up）事件，反之亦然（按下的鍵集合會被靜默更新）。
* 按下事件的邏輯鍵（logical key）不一定與放開事件相同。
* 按下事件與重複事件（repeat events）不易區分（必須手動追蹤）。
* 鎖定模式（如 CapsLock）只記錄其「啟用」狀態，無法取得其實際按下狀態。

因此，新的 [`KeyEvent`][]/[`HardwareKeyboard`][] 為基礎的系統誕生了。為了將破壞性變更降到最低，這套新系統與舊系統並行實作，最終目標是棄用原始系統。現在時機已到，應用程式開發者應該盡快將程式碼遷移，以避免未來移除舊 API 時產生破壞性變更。

## 變更說明

以下是已被棄用的 API。

### 有對應替代 API 的已棄用 API

* [`Focus.onKey`][] => [`Focus.onKeyEvent`][]
* [`FocusNode.attach`][] 的 `onKey` 參數 => `onKeyEvent` 參數
* [`FocusNode.onKey`][] => [`FocusNode.onKeyEvent`][]
* [`FocusOnKeyCallback`][] => [`FocusOnKeyEventCallback`][]
* [`FocusScope.onKey`][] => [`FocusScope.onKeyEvent`][]
* [`FocusScopeNode.onKey`][] => [`FocusScopeNode.onKeyEvent`][]
* [`RawKeyboard`][] => [`HardwareKeyboard`][]
* [`RawKeyboardListener`][] => [`KeyboardListener`][]
* [`RawKeyDownEvent`][] => [`KeyDownEvent`][]
* [`RawKeyEvent`][] => [`KeyEvent`][]
* [`RawKeyUpEvent`][] => [`KeyUpEvent`][]

### 已移除的 API

這些 API 在僅剩一套鍵盤事件系統後已不再需要，或其功能已不再提供。

* [`debugKeyEventSimulatorTransitModeOverride`][]
* [`GLFWKeyHelper`][]
* [`GtkKeyHelper`][]
* [`KeyboardSide`][]
* [`KeyDataTransitMode`][]
* [`KeyEventManager`][]
* [`KeyHelper`][]
* [`KeyMessage`][]
* [`KeyMessageHandler`][]
* [`KeySimulatorTransitModeVariant`][]
* [`ModifierKey`][]
* [`RawKeyEventData`][]
* [`RawKeyEventDataAndroid`][]
* [`RawKeyEventDataFuchsia`][]
* [`RawKeyEventDataIos`][]
* [`RawKeyEventDataLinux`][]
* [`RawKeyEventDataMacOs`][]
* [`RawKeyEventDataWeb`][]
* [`RawKeyEventDataWindows`][]
* [`RawKeyEventHandler`][]
* [`ServicesBinding.keyEventManager`][]

## 遷移指南

Flutter 框架函式庫已經完成遷移。
如果你的程式碼有使用前述章節列出的類別或方法，請遷移至這些新 API。

### 遷移你使用 `RawKeyEvent` 的程式碼

大多數情況下，所有 `RawKeyEvent` API 都有對應的 `KeyEvent` API 可用。

部分與平台相關的資訊，原本包含於 [`RawKeyEventData`][] 物件或其子類別的 API 已被移除且不再支援。唯一的例外是 [`RawKeyEventDataAndroid.eventSource`][]
資訊現在可以透過更具平台獨立性的 [`KeyEvent.deviceType`][] 取得。

#### 遷移 `isKeyPressed` 及相關功能

如果舊版程式碼使用了 [`RawKeyEvent.isKeyPressed`][]、
[`RawKeyEvent.isControlPressed`][]、[`RawKeyEvent.isShiftPressed`][]、
[`RawKeyEvent.isAltPressed`][] 或 [`RawKeyEvent.isMetaPressed`][] API，
現在都可以在 [`HardwareKeyboard`][] 單例實例上找到對應功能，
但在 [KeyEvent] 上不可用。[`RawKeyEvent.isKeyPressed`][]
則可作為 [`HardwareKeyboard.isLogicalKeyPressed`][] 使用。

遷移前：

```dart
KeyEventResult _handleKeyEvent(RawKeyEvent keyEvent) {
  if (keyEvent.isControlPressed ||
      keyEvent.isShiftPressed ||
      keyEvent.isAltPressed ||
      keyEvent.isMetaPressed) {
    print('Modifier pressed: $keyEvent');
  }
  if (keyEvent.isKeyPressed(LogicalKeyboardKey.keyA)) {
    print('Key A pressed.');
  }
  return KeyEventResult.ignored;
}
```

遷移後：

```dart
KeyEventResult _handleKeyEvent(KeyEvent _) {
  if (HardwareKeyboard.instance.isControlPressed ||
      HardwareKeyboard.instance.isShiftPressed ||
      HardwareKeyboard.instance.isAltPressed ||
      HardwareKeyboard.instance.isMetaPressed) {
    print('Modifier pressed: $keyEvent');
  }
  if (HardwareKeyboard.instance.isLogicalKeyPressed(LogicalKeyboardKey.keyA)) {
    print('Key A pressed.');
  }
  return KeyEventResult.ignored;
}
```

#### 設定焦點的 `onKey`

如果舊有程式碼使用了 [`Focus.onKey`][]、[`FocusScope.onKey`][]、
[`FocusNode.onKey`][] 或 [`FocusScopeNode.onKey`][] 參數，則有對應的 [`Focus.onKeyEvent`][]、[`FocusScope.onKeyEvent`][]、
[`FocusNode.onKeyEvent`][] 或 [`FocusScopeNode.onKeyEvent`][] 參數，
這些參數會提供 `KeyEvent`（而非 `RawKeyEvent`）。

變更前：

```dart
Widget build(BuildContext context) {
  return Focus(
    onKey: (RawKeyEvent keyEvent) {
      print('Key event: $keyEvent');
      return KeyEventResult.ignored;
    }
    child: child,
  );
}
```

變更後：

```dart
Widget build(BuildContext context) {
  return Focus(
    onKeyEvent: (KeyEvent keyEvent) {
      print('Key event: $keyEvent');
      return KeyEventResult.ignored;
    }
    child: child,
  );
}
```

#### 重複鍵盤事件的處理

如果你之前依賴 [`RawKeyEvent.repeat`][] 屬性來判斷是否為重複的鍵盤事件（repeat key event），現在這部分已經被拆分為獨立的 [`KeyRepeatEvent`][] 類型。

變更前：

```dart
KeyEventResult _handleKeyEvent(RawKeyEvent keyEvent) {
  if (keyEvent is RawKeyDownEvent) {
    print('Key down: ${keyEvent.data.logicalKey.keyLabel}(${keyEvent.repeat ? ' (repeated)' : ''})');
  }
  return KeyEventResult.ignored;
}
```

變更後：

```dart
KeyEventResult _handleKeyEvent(KeyEvent _) {
  if (keyEvent is KeyDownEvent || keyEvent is KeyRepeatEvent) {
    print('Key down: ${keyEvent.logicalKey.keyLabel}(${keyEvent is KeyRepeatEvent ? ' (repeated)' : ''})');
  }
  return KeyEventResult.ignored;
}
```

雖然它不是 [`KeyDownEvent`][] 的子類別，
但 [`KeyRepeatEvent`][] 也是一個 key down 事件（鍵盤按下事件）。
請不要假設 `keyEvent is! KeyDownEvent` 只允許 key up 事件（鍵盤放開事件）。
請同時檢查 `KeyDownEvent` 和 `KeyRepeatEvent`。

## 時程

合併至版本：3.18.0-7.0.pre<br>
穩定版釋出：3.19.0

## 參考資料

替代 API 文件：

* [`Focus.onKeyEvent`][]
* [`FocusNode.onKeyEvent`][]
* [`FocusOnKeyEventCallback`][]
* [`FocusScope.onKeyEvent`][]
* [`FocusScopeNode.onKeyEvent`][]
* [`HardwareKeyboard`][]
* [`KeyboardListener`][]
* [`KeyDownEvent`][]
* [`KeyRepeatEvent`][]
* [`KeyEvent`][]
* [`KeyEventHandler`][]
* [`KeyUpEvent`][]

相關議題：

* [`RawKeyEvent` 和 `RawKeyboard` 等應該被棄用並移除（Issue 136419）][`RawKeyEvent` and `RawKeyboard`, et al should be deprecated and removed (Issue 136419)]

相關 PR：

* [棄用 RawKeyEvent 等，並豁免框架中的使用情境。][Deprecate RawKeyEvent, et al. and exempt uses in the framework.]

[`debugKeyEventSimulatorTransitModeOverride`]: {{site.api}}/flutter/services/debugKeyEventSimulatorTransitModeOverride-class.html
[`Focus.onKey`]: {{site.api}}/flutter/services/Focus/onKey.html
[`FocusNode.attach`]: {{site.api}}/flutter/services/FocusNode/attach.html
[`FocusNode.onKey`]: {{site.api}}/flutter/services/FocusNode/onKey.html
[`FocusOnKeyCallback`]: {{site.api}}/flutter/services/FocusOnKeyCallback-class.html
[`FocusScope.onKey`]: {{site.api}}/flutter/services/FocusScope/onKey.html
[`FocusScopeNode.onKey`]: {{site.api}}/flutter/services/FocusScopeNode/onKey.html
[`GLFWKeyHelper`]: {{site.api}}/flutter/services/GLFWKeyHelper-class.html
[`GtkKeyHelper`]: {{site.api}}/flutter/services/GtkKeyHelper-class.html
[`KeyboardSide`]: {{site.api}}/flutter/services/KeyboardSide-class.html
[`KeyDataTransitMode`]: {{site.api}}/flutter/services/KeyDataTransitMode-class.html
[`KeyEventManager`]: {{site.api}}/flutter/services/KeyEventManager-class.html
[`KeyHelper`]: {{site.api}}/flutter/services/KeyHelper-class.html
[`KeyMessage`]: {{site.api}}/flutter/services/KeyMessage-class.html
[`KeyMessageHandler`]: {{site.api}}/flutter/services/KeyMessageHandler-class.html
[`KeySimulatorTransitModeVariant`]: {{site.api}}/flutter/services/KeySimulatorTransitModeVariant-class.html
[`ModifierKey`]: {{site.api}}/flutter/services/ModifierKey-class.html
[`RawKeyboard`]: {{site.api}}/flutter/services/RawKeyboard-class.html
[`RawKeyboardListener`]: {{site.api}}/flutter/services/RawKeyboardListener-class.html
[`RawKeyDownEvent`]: {{site.api}}/flutter/services/RawKeyDownEvent-class.html
[`RawKeyEvent`]: {{site.api}}/flutter/services/RawKeyEvent-class.html
[`RawKeyEventData`]: {{site.api}}/flutter/services/RawKeyEventData-class.html
[`RawKeyEventDataAndroid`]: {{site.api}}/flutter/services/RawKeyEventDataAndroid-class.html
[`RawKeyEventDataFuchsia`]: {{site.api}}/flutter/services/RawKeyEventDataFuchsia-class.html
[`RawKeyEventDataIos`]: {{site.api}}/flutter/services/RawKeyEventDataIos-class.html
[`RawKeyEventDataLinux`]: {{site.api}}/flutter/services/RawKeyEventDataLinux-class.html
[`RawKeyEventDataMacOs`]: {{site.api}}/flutter/services/RawKeyEventDataMacOs-class.html
[`RawKeyEventDataWeb`]: {{site.api}}/flutter/services/RawKeyEventDataWeb-class.html
[`RawKeyEventDataWindows`]: {{site.api}}/flutter/services/RawKeyEventDataWindows-class.html
[`RawKeyEventHandler`]: {{site.api}}/flutter/services/RawKeyEventHandler-class.html
[`RawKeyUpEvent`]: {{site.api}}/flutter/services/RawKeyUpEvent-class.html
[`ServicesBinding.keyEventManager`]: {{site.api}}/flutter/services/ServicesBinding/keyEventManager.html
[`Focus.onKeyEvent`]: {{site.api}}/flutter/services/Focus/onKeyEvent.html
[`FocusNode.onKeyEvent`]: {{site.api}}/flutter/services/FocusNode/onKeyEvent.html
[`FocusOnKeyEventCallback`]: {{site.api}}/flutter/services/FocusOnKeyEventCallback-class.html
[`FocusScope.onKeyEvent`]: {{site.api}}/flutter/services/FocusScope/onKeyEvent.html
[`FocusScopeNode.onKeyEvent`]: {{site.api}}/flutter/services/FocusScopeNode/onKeyEvent.html
[`HardwareKeyboard`]: {{site.api}}/flutter/services/HardwareKeyboard-class.html
[`HardwareKeyboard.isLogicalKeyPressed`]: {{site.api}}/flutter/services/HardwareKeyboard/isLogicalKeyPressed.html
[`KeyboardListener`]: {{site.api}}/flutter/services/KeyboardListener-class.html
[`KeyDownEvent`]: {{site.api}}/flutter/services/KeyDownEvent-class.html
[`KeyRepeatEvent`]: {{site.api}}/flutter/services/KeyRepeatEvent-class.html
[`KeyEvent`]: {{site.api}}/flutter/services/KeyEvent-class.html
[`KeyEventHandler`]: {{site.api}}/flutter/services/KeyEventHandler-class.html
[`KeyUpEvent`]: {{site.api}}/flutter/services/KeyUpEvent-class.html
[`RawKeyEvent.isKeyPressed`]: {{site.api}}/flutter/services/RawKeyEvent/isKeyPressed.html
[`RawKeyEvent.isControlPressed`]: {{site.api}}/flutter/services/RawKeyEvent/isControlPressed.html
[`RawKeyEvent.isShiftPressed`]: {{site.api}}/flutter/services/RawKeyEvent/isShiftPressed.html
[`RawKeyEvent.isAltPressed`]: {{site.api}}/flutter/services/RawKeyEvent/isAltPressed.html
[`RawKeyEvent.isMetaPressed`]: {{site.api}}/flutter/services/RawKeyEvent/isMetaPressed.html
[`RawKeyEvent.repeat`]: {{site.api}}/flutter/services/RawKeyEvent/repeat.html
[`RawKeyEventDataAndroid.eventSource`]: {{site.api}}/flutter/services/RawKeyEventDataAndroid/eventSource.html
[`KeyEvent.deviceType`]: {{site.api}}/flutter/services/KeyEvent/deviceType.html
[`RawKeyEvent` and `RawKeyboard`, et al should be deprecated and removed (Issue 136419)]: {{site.repo.flutter}}/issues/136419
[Deprecate RawKeyEvent, et al. and exempt uses in the framework.]: {{site.repo.flutter}}/pull/136677
