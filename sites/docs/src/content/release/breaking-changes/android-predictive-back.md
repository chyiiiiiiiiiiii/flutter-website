---
title: Android 預測返回（Predictive Back）
description: >-
  為了支援 Android 14 的預測返回（Predictive Back）功能，當收到返回手勢時即時控制返回導覽的能力，已被預先（ahead-of-time）導覽 API 取代。
---

{% render "docs/breaking-changes.md" %}

## 摘要

為了支援 Android 14 的預測返回（Predictive Back）功能，
一組預先（ahead-of-time）API 已取代即時（just-in-time）導覽 API，
例如 `WillPopScope` 和 `Navigator.willPop`。

:::note
Flutter 3.22 版本針對預測返回行為有一些更新。
如需更多資訊，請參閱
[Issue #132504][]。
:::

[Issue #132504]: {{site.github}}/flutter/flutter/issues/132504#issuecomment-2025776552

## 背景

Android 14 推出了
[預測返回（Predictive Back）功能]({{site.android-dev}}/guide/navigation/predictive-back-gesture)，
讓使用者在進行有效的返回手勢時，可以預覽當前 Route 背後的內容，並決定是否繼續返回或取消該手勢。這與 Flutter 允許開發者在收到返回手勢後才取消返回的導覽 API 不相容。

在預測返回（Predictive Back）中，當使用者啟動返回手勢時，返回動畫會立即開始，且在動畫被提交前就已經執行。此時 Flutter 應用程式無法決定是否允許這個操作，必須事先（ahead-of-time）就知道結果。

因此，所有允許 Flutter 應用程式開發者在收到返回手勢時才取消返回導覽的 API 現已被棄用。這些 API 已被等效的 API 取代，這些新的 API 會隨時維護一個布林值（boolean state），用來決定是否允許返回導覽。若允許，預測返回動畫會如常發生；否則，導覽會被阻止。在這兩種情況下，應用程式開發者都會被通知有返回操作被嘗試，以及該操作是否成功。

### PopScope

`PopScope` 類別直接取代了 `WillPopScope`，以支援預測返回（Predictive Back）。不再是在發生時決定是否允許 pop，而是預先透過 `canPop` 布林值設定。你仍然可以透過 `onPopInvoked` 來監聽 pop 事件。

```dart
PopScope(
  canPop: _myPopDisableEnableLogic(),
  onPopInvoked: (bool didPop) {
    // Handle the pop. If `didPop` is false, it was blocked.
  },
)
```

### Form.canPop 與 Form.onPopInvoked

這兩個新參數是基於 `PopScope`，並取代了已棄用的 `Form.onWillPop` 參數。它們與 `PopScope` 的使用方式與上方所述相同。

```dart
Form(
  canPop: _myPopDisableEnableLogic(),
  onPopInvoked: (bool didPop) {
    // Handle the pop. If `didPop` is false, it was blocked.
  },
)
```

### Route.popDisposition

這個 getter 會同步回傳該 Route 的 `RoutePopDisposition`，用來描述 pop 操作的行為方式。

```dart
if (myRoute.popDisposition == RoutePopDisposition.doNotPop) {
  // Back gestures are disabled.
}
```

### ModalRoute.registerPopEntry 和 ModalRoute.unregisterPopEntry

使用這些方法來註冊 `PopScope` 元件 (Widget)，當 Route 判斷是否可以 pop 時，這些元件會被評估。這項功能可用於實作自訂的 `PopScope` 元件 (Widget)。

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

### 從 `WillPopScope` 遷移至 `PopScope`

`WillPopScope` 元件 (Widget) 的直接替代方案是 `PopScope` 元件 (Widget)。
在許多情況下，原本在 `onWillPop` 中於返回手勢（back gesture）時執行的邏輯，
可以在建置（build）階段完成，並設置給 `canPop`。

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

在需要獲得 pop 嘗試通知的情況下，可以使用 `onPopInvoked` 方法，其用法與 `onWillPop` 類似。
請注意，`onWillPop` 會在 pop 被處理之前呼叫，並且有能力取消該操作，
而 `onPopInvoked` 則是在 pop 完成處理後才會被呼叫。

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

### 從 WillPopScope 遷移到 NavigatorPopHandler 以支援巢狀 Navigator

`WillPopScope` 的一個非常常見的使用情境，是在使用巢狀 `Navigator` 元件 (Widget) 時，正確處理返回手勢（back gestures）。
雖然也可以使用 `PopScope` 來實現這個需求，
但現在有一個包裝元件（wrapper widget）可以讓這件事變得更簡單：
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
現在已經改為使用 `PopScope`，並對外暴露其 `canPop` 和 `onPopInvoked` 方法。
遷移方式與上方所述從 `WillPopScope` 遷移至 `PopScope` 完全相同。

### 從 Route.willPop 遷移至 Route.popDisposition

`Route` 的 `willPop` 方法過去會回傳一個 `Future<RoutePopDisposition>`，
以因應彈出操作可能會被取消的情況。由於現在不再需要這樣的處理，
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

在內部，`ModalRoute` 會透過將 `WillPopScope` 註冊到 `addScopedWillPopCallback` 和 `removeScopedWillPopCallback`，來追蹤其元件 (Widget) 子樹中 `WillPopScope` 的存在情況。
由於 `PopScope` 取代了 `WillPopScope`，這些方法也分別被 `registerPopEntry` 和 `unregisterPopEntry` 取代。

`PopEntry` 由 `PopScope` 實作，以僅向 `ModalRoute` 暴露必要的最少資訊。任何自行撰寫 `PopScope` 的開發者，都應該實作 `PopEntry`，並將其元件向所屬的 `ModalRoute` 註冊與取消註冊。

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

這個方法先前主要用於 Cupertino 函式庫中，處理與 Predictive Back 類似的使用情境，也就是某些返回（back）轉場允許取消導覽（navigation）。當存在任何可能由 `WillPopScope` 元件 (Widget) 取消 pop 的情況時，該 Route 的轉場就會被停用。

現在，由於 API 要求必須預先決定這個行為，因此不再需要僅根據 `PopScope` 元件 (Widget) 的存在來推測。判斷 `ModalRoute` 是否因 `PopScope` 元件 (Widget) 而被阻擋 pop 的最終邏輯，已經內建於 `ModalRoute.popDisposition` 中。

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

`WillPopScope` 有時會用來在收到返回手勢（back gesture）時顯示確認對話框。
這仍然可以透過 `PopScope` 以類似的方式實現。

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

### 支援預測返回（predictive back）

  1. 執行 Android 14（API 等級 34）或以上版本。
  1. 在裝置的「開發人員選項」中啟用預測返回（predictive back）功能旗標。
     在未來的 Android 版本中將不再需要這個步驟。
  1. 在 `android/app/src/main/AndroidManifest.xml` 中設定 `android:enableOnBackInvokedCallback="true"`。
      如有需要，請參考
     [Android 的完整指南]({{site.android-dev}}/guide/navigation/custom-back/predictive-back-gesture)
     以協助 Android 應用程式遷移並支援預測返回。
  1. 請確保你使用的是 Flutter 版本 `3.14.0-7.0.pre` 或更高版本。
  1. 請確認你的 Flutter 應用程式沒有使用
     `WillPopScope` 元件 (Widget)。使用該元件會停用
     預測返回。若有需要，請改用 `PopScope`。
  1. 執行應用程式，並從螢幕左側滑動進行返回手勢。

## 時程

Landed in version: 3.14.0-7.0.pre<br>
In stable release: 3.16

## 參考資料

API 文件：

* [`PopScope`][]
* [`NavigatorPopHandler`][]
* [`PopEntry`][]
* [`Form.canPop`][]
* [`Form.onPopInvoked`][]
* [`Route.popDisposition`][]
* [`ModalRoute.registerPopEntry`][]
* [`ModalRoute.unregisterPopEntry`][]

相關議題：

* [Issue 109513][]

相關 PR：

* [Predictive Back support for root routes][]
* [Platform channel for predictive back][]

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
