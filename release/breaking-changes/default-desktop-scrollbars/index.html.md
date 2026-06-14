# 桌面預設捲軸

> ScrollBehaviors 現在會在桌面平台自動建立 Scrollbars。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`ScrollBehavior` 現在會自動將 `Scrollbar` 套用到桌面平台（Mac、Windows 和 Linux）上的滾動元件 (Widget)。

## 背景說明

在此變更之前，`Scrollbar` 必須由開發者在所有平台手動套用到滾動元件 (Widget)。這與開發者在桌面平台執行 Flutter 應用程式時的預期不符。

現在，繼承的 `ScrollBehavior` 會自動將 `Scrollbar` 套用到大多數滾動元件 (Widget)。這與 `GlowingOverscrollIndicator` 由 `ScrollBehavior` 建立的方式類似。少數不受此行為影響的元件，已於下方列出。

為了讓此功能的管理與控制更加完善，`ScrollBehavior` 也已更新。原本用於套用 `GlowingOverscrollIndicator` 的 `buildViewportChrome` 方法已被棄用。取而代之的是，`ScrollBehavior` 現在支援個別方法來裝飾 viewport，即 `buildScrollbar` 以及 `buildOverscrollIndicator`。這些方法可以被覆寫，以控制滾動元件 (Scrollable) 周圍的建構內容。

此外，`ScrollBehavior` 的子類別 `MaterialScrollBehavior` 與 `CupertinoScrollBehavior` 也已公開，讓開發者可以擴充並基於框架中其他現有的 `ScrollBehavior` 進行開發。這些子類別先前是私有的。


## 變更說明

先前的做法要求開發者在所有平台自行建立 `Scrollbar`。在某些使用情境下，必須將 `ScrollController` 提供給 `Scrollbar` 以及滾動元件 (Widget)。

```dart
final ScrollController controller = ScrollController();
Scrollbar(
  controller: controller,
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    }
  )
);
```

`ScrollBehavior` 現在在桌面環境下執行時，會自動套用 `Scrollbar`，並且會自動為 `Scrollbar` 提供 `ScrollController`。

```dart
final ScrollController controller = ScrollController();
ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
   return Text('Item $index');
 }
);
```

框架中的某些元件 (Widget) 不會自動套用 `Scrollbar`。
這些元件包括：

- 當 `maxLines` 為 1 時的 `EditableText`
- `ListWheelScrollView`
- `PageView`
- `NestedScrollView`

由於這些元件會手動覆寫繼承的 `ScrollBehavior` 來移除 `Scrollbar`，因此這些元件現在都新增了一個 `scrollBehavior` 參數，讓你可以自行提供該參數以取代預設的覆寫行為。

這項變更在開發過程中並未導致任何測試失敗、當機或錯誤訊息，但如果你在桌面平台上手動加入 `Scrollbar`，可能會導致應用程式中同時渲染 (render) 出兩個 `Scrollbar`。

如果你在應用程式中遇到這種情況，有幾種方式可以控制與設定此功能：

- 在桌面環境執行時，移除應用程式中手動加入的 `Scrollbar`。

- 擴充 `ScrollBehavior`、`MaterialScrollBehavior`
  或 `CupertinoScrollBehavior` 以修改預設行為。

  - 透過自訂的 `ScrollBehavior`，你可以在整個應用程式層級套用，方法是設定
    `MaterialApp.scrollBehavior` 或 `CupertinoApp.scrollBehavior`。
  - 或者，如果你只想套用到特定元件 (Widget)，可以在該元件上方加入
    `ScrollConfiguration`，並指定你的自訂 `ScrollBehavior`。

你的可滾動元件 (Widget) 將會繼承並反映這個行為。

- 除了自訂 `ScrollBehavior` 之外，另一種變更預設行為的方式，是複製現有的 `ScrollBehavior`，然後切換你想要的功能。
  - 在元件 (Widget) 樹中建立 `ScrollConfiguration`，並使用 `copyWith` 於目前的 context 中提供一份已修改的 `ScrollBehavior` 副本。

## 遷移指南

### 在桌面移除手動 `Scrollbar`

遷移前的程式碼：

```dart
final ScrollController controller = ScrollController();
Scrollbar(
  controller: controller,
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    }
  )
);
```

遷移後的程式碼：

```dart
final ScrollController controller = ScrollController();
final Widget child = ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
    return Text('Item $index');
  }
);
// Only manually add a `Scrollbar` when not on desktop platforms.
// Or, see other migrations for changing `ScrollBehavior`.
switch (currentPlatform) {
  case TargetPlatform.linux:
  case TargetPlatform.macOS:
  case TargetPlatform.windows:
    return child;
  case TargetPlatform.android:
  case TargetPlatform.fuchsia:
  case TargetPlatform.iOS:
    return Scrollbar(
      controller: controller,
      child: child;
    );
}
```

### 為您的應用程式設定自訂 `ScrollBehavior`

遷移前的程式碼：

```dart
// MaterialApps previously had a private ScrollBehavior.
MaterialApp(
  // ...
);
```

遷移後的程式碼：

```dart
// MaterialApps previously had a private ScrollBehavior.
// This is available to extend now.
class MyCustomScrollBehavior extends MaterialScrollBehavior {
  // Override behavior methods like buildOverscrollIndicator and buildScrollbar
}

// ScrollBehavior can now be configured for an entire application.
MaterialApp(
  scrollBehavior: MyCustomScrollBehavior(),
  // ...
);
```

### 為特定元件 (Widget) 設定自訂的 `ScrollBehavior`

遷移前的程式碼：

```dart
final ScrollController controller = ScrollController();
ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
   return Text('Item $index');
 }
);
```

遷移後的程式碼：

```dart
// MaterialApps previously had a private ScrollBehavior.
// This is available to extend now.
class MyCustomScrollBehavior extends MaterialScrollBehavior {
  // Override behavior methods like buildOverscrollIndicator and buildScrollbar
}

// ScrollBehavior can be set for a specific widget.
final ScrollController controller = ScrollController();
ScrollConfiguration(
  behavior: MyCustomScrollBehavior(),
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
     return Text('Item $index');
    }
  ),
);
```

### 複製並修改現有的 `ScrollBehavior`

遷移前的程式碼：

```dart
final ScrollController controller = ScrollController();
ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
   return Text('Item $index');
 }
);
```

遷移後的程式碼：

```dart
// ScrollBehavior can be copied and adjusted.
final ScrollController controller = ScrollController();
ScrollConfiguration(
  behavior: ScrollConfiguration.of(context).copyWith(scrollbars: false),
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
     return Text('Item $index');
    }
  ),
);
```

## 時程

合併至版本：2.2.0-10.0.pre<br>
正式版發佈於：2.2.0

## 參考資料

API 文件：

* [`ScrollConfiguration`][]
* [`ScrollBehavior`][]
* [`MaterialScrollBehavior`][]
* [`CupertinoScrollBehavior`][]
* [`Scrollbar`][]
* [`CupertinoScrollbar`][]

相關議題：

* [Issue #40107][]
* [Issue #70866][]

相關 PR：

* [Exposing ScrollBehaviors for app-wide settings][]
* [Automatically applying Scrollbars on desktop platforms with configurable ScrollBehaviors][]


[`ScrollConfiguration`]: https://api.flutter.dev/flutter/widgets/ScrollConfiguration-class.html
[`ScrollBehavior`]: https://api.flutter.dev/flutter/widgets/ScrollBehavior-class.html
[`MaterialScrollBehavior`]: https://api.flutter.dev/flutter/material/MaterialScrollBehavior-class.html
[`CupertinoScrollBehavior`]: https://api.flutter.dev/flutter/cupertino/CupertinoScrollBehavior-class.html
[`Scrollbar`]: https://api.flutter.dev/flutter/material/Scrollbar-class.html
[`CupertinoScrollbar`]: https://api.flutter.dev/flutter/cupertino/CupertinoScrollbar-class.html
[Issue #40107]: https://github.com/flutter/flutter/issues/40107
[Issue #70866]: https://github.com/flutter/flutter/issues/70866
[Exposing ScrollBehaviors for app-wide settings]: https://github.com/flutter/flutter/pull/76739
[Automatically applying Scrollbars on desktop platforms with configurable ScrollBehaviors]: https://github.com/flutter/flutter/pull/78588

