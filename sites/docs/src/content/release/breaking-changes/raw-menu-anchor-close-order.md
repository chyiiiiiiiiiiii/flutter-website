---
title: 變更 RawMenuAnchor 的關閉順序
description: >-
  關閉 `RawMenuAnchor` 現在會以協調的順序觸發所有
  後代 `RawMenuAnchor` 的 `onClose` 與 `onCloseRequested` 回呼（callback）。
---

{% render "docs/breaking-changes.md" %}

## 摘要

關閉 `RawMenuAnchor` 現在會觸發所有後代 `RawMenuAnchor` 的
`onCloseRequested` 與 `onClose` 回呼（callback）。
`onCloseRequested` 回呼會由上而下觸發，
從觸發的 `RawMenuAnchor` 開始，依序傳遞至其後代，
而 `onClose` 回呼則由下而上觸發。
若 `RawMenuAnchor` 已處於關閉狀態，
呼叫 `MenuController.close` 與 `MenuController.closeChildren`
不會觸發 `onCloseRequested` 回呼。

## 背景

`RawMenuAnchor` 是一個用於建置自訂選單系統的低階元件 (Widget)。
先前，`RawMenuAnchor` 在關閉時不會自動通知其後代。
您必須在 `onCloseRequested` 回呼中手動呼叫 `controller.closeChildren()`，
才能關閉後代的 `RawMenuAnchor`。

此外，`onClose` 回呼的觸發時機並不一致。
父級 `RawMenuAnchor` 的 `onClose` 可能在其後代完成關閉之前就已執行。

更新後的行為確保當父級 `RawMenuAnchor` 開始關閉時，
會以由上而下的方式依序觸發所有後代 `RawMenuAnchor` 的 `onCloseRequested`。

當在 `onCloseRequested` 中呼叫 `hideOverlay` 來關閉選單時，
所有後代 `RawMenuAnchor` 的 `onClose` 回呼會以由下而上的順序執行。
這表示最近開啟的 `RawMenuAnchor` 的 `onClose` 回呼會最先執行，
接著才是其父級，依此類推，直到層級頂端。

此設計允許以協調的關閉順序進行操作，
讓子級 `RawMenuAnchor` 在其父級完成關閉流程之前，
能夠先執行必要的清理作業。

最後，若 `RawMenuAnchor` 已處於關閉狀態，
呼叫 `MenuController.close` 與 `MenuController.closeChildren`
不會觸發 `onCloseRequested` 回呼，以避免不必要的回呼執行。

## 遷移指南

若您的程式碼未覆寫 `RawMenuAnchor.onCloseRequested` 的預設實作，
或您的 `RawMenuAnchor` 不包含子選單，則無需進行任何變更。

若您在包含子選單的 `RawMenuAnchor` 中
自訂了 `onCloseRequested` 的實作，
則當父選單關閉時，`controller.closeChildren()` 現在會自動呼叫。
請確認您的 `onCloseRequested` 實作在這個自動呼叫的情況下仍能正常運作。
在您的 `onCloseRequested` 回呼中直接呼叫 `controller.closeChildren()`
已不再必要，請移除這些呼叫。

此外，若您的邏輯依賴父級的 `onClose` 回呼在後代之前觸發，
請重構您的程式碼以適應新的由下而上的執行順序。

遷移前的程式碼：

```dart
RawMenuAnchor(
  controller: menuController,
  onCloseRequested: (hideOverlay) {
    if (!animationController.isForwardOrCompleted) {
      return;
    }

    // Descendant submenus must be closed before the parent menu.
    // This is now handled automatically, so this call is no longer necessary.
    menuController.closeChildren();
    animationController.reverse().whenComplete(hideOverlay);
  },
  onClose: () {
    // This might have executed before descendants called onClose().
    _handleMenuClosed();
  },
  // ...
)
```

遷移後的程式碼：

```dart
RawMenuAnchor(
  controller: menuController,
  onCloseRequested: (hideOverlay) {
    if (!animationController.isForwardOrCompleted) {
      return;
    }

    // `menuController.closeChildren()` is now called automatically.
    animationController.reverse().whenComplete(hideOverlay);
  },
  onClose: () {
    // This now executes only after all descendant submenus have
    // called `onClose()`.
    _handleMenuClosed();
  },
  // ...
)
```

:::important
此遷移不支援 `dart fix`
:::

## 時間軸

導入版本：3.44.0-0.1.pre<br>
穩定版發布：3.44

## 參考資料

API 文件：

* [`RawMenuAnchor`][]
* [`RawMenuAnchor.onCloseRequested`][]

相關 issue：

* [[widgets/raw_menu_anchor.dart] onClose should be called by descendant menus before parent][issue-182355]

相關 PR：

* [[widgets/raw_menu_anchor.dart] Always onClose and onCloseRequested on descendants before parent.][pr-182357]

[`RawMenuAnchor`]: {{site.api}}/flutter/widgets/RawMenuAnchor-class.html
[`RawMenuAnchor.onCloseRequested`]: {{site.api}}/flutter/widgets/RawMenuAnchor/onCloseRequested.html
[issue-182355]: {{site.repo.flutter}}/issues/182355
[pr-182357]: {{site.repo.flutter}}/pull/182357
