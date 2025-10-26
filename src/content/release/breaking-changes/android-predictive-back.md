---
title: Android 預測返回（Predictive Back）
description: >-
  為了支援 Android 14 的 Predictive Back（預測返回）功能，原本在接收到返回手勢時控制返回導覽的能力，已被預先判斷（ahead-of-time）的導覽 API 取代。
---

{% render docs/breaking-changes.md %}

## 摘要

為了支援 Android 14 的 Predictive Back（預測返回）功能，
一組預先判斷（ahead-of-time）API 取代了即時（just-in-time）導覽 API，
例如 `WillPopScope` 和 `Navigator.willPop`。

:::note
Flutter 3.22 版本針對 Predictive Back 行為進行了一些更新。
如需更多資訊，請參閱
[Issue #132504][Issue #132504]。
:::

[Issue #132504]: {{site.github}}/flutter/flutter/issues/132504#issuecomment-2025776552

## 背景

Android 14 推出了
[Predictive Back 功能]({{site.android-dev}}/guide/navigation/predictive-back-gesture)，
讓使用者在執行有效返回手勢時，可以預覽當前 Route 背後的內容，並決定是否繼續返回或取消手勢。這與 Flutter 允許開發者在接收到返回手勢後才取消返回的導覽 API 不相容。

有了 Predictive Back，當使用者開始手勢時，返回動畫會立即啟動，且在手勢尚未被確認時就已經開始。此時 Flutter 應用程式無法再決定是否允許返回，這必須在事前就已知。

因此，所有允許 Flutter 應用程式開發者在接收到返回手勢時才取消返回導覽的 API 現已被棄用。這些 API 已被等效的新 API 取代，這些新 API 會隨時維護一個布林值狀態，用來決定是否允許返回導覽。若允許，Predictive Back 動畫會照常進行；否則，導覽會被阻止。無論哪種情況，應用程式開發者都會被通知有返回操作發生，以及該操作是否成功。

### PopScope

`PopScope` 類別直接取代了 `WillPopScope`，以支援 Predictive Back。與其在發生時才決定是否允許 pop，現在需事先透過 `canPop` 布林值設定。你仍然可以使用 `onPopInvoked` 來監聽 pop 事件。

```dart
PopScope(
  canPop: _myPopDisableEnableLogic(),
  onPopInvoked: (bool didPop) {
    // Handle the pop. If `didPop` is false, it was blocked.
  },
)
```

### Form.canPop 與 Form.onPopInvoked

這兩個新參數是基於 `PopScope`，並取代了已淘汰的 `Form.onWillPop` 參數。它們與 `PopScope` 的使用方式與上述相同。

```dart
Form(
  canPop: _myPopDisableEnableLogic(),
  onPopInvoked: (bool didPop) {
    // Handle the pop. If `didPop` is false, it was blocked.
  },
)
```

### Route.popDisposition

這個 getter 會同步回傳該 Route 的 `RoutePopDisposition`，用來描述 pop 操作時的行為方式。

```dart
if (myRoute.popDisposition == RoutePopDisposition.doNotPop) {
  // Back gestures are disabled.
}
```

### ModalRoute.registerPopEntry 和 ModalRoute.unregisterPopEntry

使用這些方法來註冊`PopScope`元件（Widgets），當 Route 決定是否可以 pop 時，會對其進行評估。這項功能可用於實作自訂的`PopScope`元件（Widget）。

```dart
@override
void didChangeDependencies() {
  super.didChangeDependencies();
  final ModalRoute<dynamic>? nextRoute = ModalRoute.of(context);
  if (nextRoute != _route) {
    _route?.unregisterPopEntry(this);
    _route = nextRoute;
    _route?.registerPopEntry(this);
  }
}
```

## 遷移指南

### 從`WillPopScope`遷移至`PopScope`

`WillPopScope`元件（Widget）的直接替代方案是`PopScope`元件（Widget）。
在許多情況下，原本在`onWillPop`中於返回手勢觸發時執行的邏輯，
可以在建構階段完成，並設定到`canPop`。

遷移前的程式碼：

```dart
WillPopScope(
  onWillPop: () async {
    return _myCondition;
  },
  child: ...
),
```

遷移後的程式碼：

```dart
PopScope(
  canPop: _myCondition,
  child: ...
),
```

在需要獲得 pop 嘗試通知的情況下，可以像使用 `onWillPop` 一樣使用 `onPopInvoked` 方法。

請注意，`onWillPop` 會在 pop 被處理之前呼叫，並且有機會取消該操作，而 `onPopInvoked` 則是在 pop 處理完成後才會被呼叫。

遷移前的程式碼：

```dart
WillPopScope(
  onWillPop: () async {
    _myHandleOnPopMethod();
    return true;
  },
  child: ...
),
```

遷移後的程式碼：

```dart
PopScope(
  canPop: true,
  onPopInvoked: (bool didPop) {
    _myHandleOnPopMethod();
  },
  child: ...
),
```

### 從 WillPopScope 遷移至 NavigatorPopHandler 以支援巢狀 Navigator

`WillPopScope` 的一個非常常見的使用情境，是在使用巢狀 `Navigator` 元件（Widgets）時，正確處理返回手勢（back gestures）。
雖然也可以使用 `PopScope` 來實現這個功能，
但現在有一個包裝元件（wrapper widget）可以讓這件事變得更加容易：
`NavigatorPopHandler`。

遷移前的程式碼：

```dart
WillPopScope(
  onWillPop: () async => !(await _nestedNavigatorKey.currentState!.maybePop()),
  child: Navigator(
    key: _nestedNavigatorKey,
    …
  ),
)
```

遷移後的程式碼：

```dart
NavigatorPopHandler(
  onPop: () => _nestedNavigatorKey.currentState!.pop(),
  child: Navigator(
    key: _nestedNavigatorKey,
    …
  ),
)
```

### 從 Form.onWillPop 遷移至 Form.canPop 和 Form.onPopInvoked

過去，`Form` 在底層使用了一個 `WillPopScope` 實例，並對外暴露其 `onWillPop` 方法。
現在這部分已被 `PopScope` 取代，並對外提供其 `canPop` 以及 `onPopInvoked` 方法。
遷移方式與上述從 `WillPopScope` 遷移到 `PopScope` 的步驟相同，詳情請參考上文。

### 從 Route.willPop 遷移至 Route.popDisposition

`Route` 的 `willPop` 方法過去會回傳一個 `Future<RoutePopDisposition>`，
以因應 pop 操作可能會被取消的情況。由於現在已不再有這種情況，
相關邏輯已簡化為同步 getter。

遷移前的程式碼：

```dart
if (await myRoute.willPop() == RoutePopDisposition.doNotPop) {
  ...
}
```

遷移後的程式碼：

```dart
if (myRoute.popDisposition == RoutePopDisposition.doNotPop) {
  ...
}
```

### 從 ModalRoute.add/removeScopedWillPopCallback 遷移至 ModalRoute.(un)registerPopEntry

在內部，`ModalRoute` 會透過將 `WillPopScope` 註冊到 `addScopedWillPopCallback` 和 `removeScopedWillPopCallback`，來追蹤其元件（Widget）子樹中 `WillPopScope` 的存在狀態。
由於 `PopScope` 取代了 `WillPopScope`，
這些方法也分別被 `registerPopEntry` 和 `unregisterPopEntry` 取代。

`PopEntry` 由 `PopScope` 實作，以僅向 `ModalRoute` 暴露必要的最少資訊。若您自行實作 `PopScope`，
應該實作 `PopEntry`，並將您的元件註冊與解除註冊到其所屬的 `ModalRoute`。

遷移前的程式碼：

```dart
@override
void didChangeDependencies() {
  super.didChangeDependencies();
  if (widget.onWillPop != null) {
    _route?.removeScopedWillPopCallback(widget.onWillPop!);
  }
  _route = ModalRoute.of(context);
  if (widget.onWillPop != null) {
    _route?.addScopedWillPopCallback(widget.onWillPop!);
  }
}
```

遷移後的程式碼：

```dart
@override
void didChangeDependencies() {
  super.didChangeDependencies();
  _route?.unregisterPopEntry(this);
  _route = ModalRoute.of(context);
  _route?.registerPopEntry(this);
}
```

### 從 ModalRoute.hasScopedWillPopCallback 遷移至 ModalRoute.popDisposition

此方法先前主要用於 Cupertino 函式庫中，處理與 Predictive Back 類似的使用情境，當某些返回（back）轉場允許取消導覽時會使用。只要有可能存在`WillPopScope`元件（Widget）會取消 pop，該路由的轉場就會被停用。

現在，API 要求必須預先決定這個行為，因此不再需要根據是否存在`PopScope`元件（Widget）來推測。判斷`ModalRoute`是否因`PopScope`元件（Widget）而被阻擋 pop 的最終邏輯，已經整合進`ModalRoute.popDisposition`之中。

遷移前的程式碼：

```dart
if (_route.hasScopedWillPopCallback) {
  // Disable predictive route transitions.
}
```

遷移後的程式碼：

```dart
if (_route.popDisposition == RoutePopDisposition.doNotPop) {
  // Disable predictive route transitions.
}
```

### 遷移 back 確認對話框

`WillPopScope` 以前有時會用來在收到返回手勢（back gesture）時顯示確認對話框。
現在仍然可以用`PopScope`，採用類似的模式來實現。

遷移前的程式碼：

```dart
WillPopScope(
  onWillPop: () async {
    final bool? shouldPop = await _showBackDialog();
    return shouldPop ?? false;
  },
  child: child,
)
```

遷移後的程式碼：

```dart
return PopScope(
  canPop: false,
  onPopInvoked: (bool didPop) async {
    if (didPop) {
      return;
    }
    final NavigatorState navigator = Navigator.of(context);
    final bool? shouldPop = await _showBackDialog();
    if (shouldPop ?? false) {
      navigator.pop();
    }
  },
  child: child,
)
```

### 支援 Predictive Back（預測性返回）

  1. 執行 Android 14（API 等級 34）或以上版本。
  1. 在裝置的「開發者選項」中啟用 Predictive Back（預測性返回）功能旗標。
     未來版本的 Android 將不需要此步驟。
  1. 在 `android/app/src/main/AndroidManifest.xml` 中設定 `android:enableOnBackInvokedCallback="true"`。
      如有需要，請參考
     [Android 的完整指南]({{site.android-dev}}/guide/navigation/custom-back/predictive-back-gesture)
     以遷移 Android 應用程式以支援 Predictive Back（預測性返回）。
  1. 請確保你使用的是 Flutter `3.14.0-7.0.pre` 版本或更高版本。
  1. 請確保你的 Flutter 應用程式未使用 `WillPopScope` 元件（Widget）。使用該元件會停用 Predictive Back（預測性返回）。如有需要，請改用 `PopScope`。
  1. 執行應用程式並執行返回手勢（從螢幕左側滑動）。

## 時程表

已納入版本：3.14.0-7.0.pre<br>
正式版本：3.16

## 參考資料

API 文件：

* [`PopScope`][`PopScope`]
* [`NavigatorPopHandler`][`NavigatorPopHandler`]
* [`PopEntry`][`PopEntry`]
* [`Form.canPop`][`Form.canPop`]
* [`Form.onPopInvoked`][`Form.onPopInvoked`]
* [`Route.popDisposition`][`Route.popDisposition`]
* [`ModalRoute.registerPopEntry`][`ModalRoute.registerPopEntry`]
* [`ModalRoute.unregisterPopEntry`][`ModalRoute.unregisterPopEntry`]

相關議題：

* [Issue 109513][Issue 109513]

相關 PR：

* [根路由的 Predictive Back 支援][Predictive Back support for root routes]
* [Predictive Back 的平台通道][Platform channel for predictive back]

[`PopScope`]: {{site.api}}/flutter/widgets/PopScope-class.html
[`NavigatorPopHandler`]: {{site.api}}/flutter/widgets/NavigatorPopHandler-class.html
[`PopEntry`]: {{site.api}}/flutter/widgets/PopEntry-class.html
[`Form.canPop`]: {{site.api}}/flutter/widgets/Form/canPop.html
[`Form.onPopInvoked`]: {{site.api}}/flutter/widgets/Form/onPopInvoked.html
[`Route.popDisposition`]: {{site.api}}/flutter/widgets/Route/popDisposition.html
[`ModalRoute.registerPopEntry`]: {{site.api}}/flutter/widgets/ModalRoute/registerPopEntry.html
[`ModalRoute.unregisterPopEntry`]: {{site.api}}/flutter/widgets/ModalRoute/unregisterPopEntry.html

[Issue 109513]: {{site.repo.flutter}}/issues/109513
[Predictive back support for root routes]: {{site.repo.flutter}}/pull/120385
[Platform channel for predictive back]: {{site.repo.engine}}/pull/39208
