---
title: v3.16 之後移除的已棄用 API
description: >-
  在到達生命週期終點後，以下已棄用的 API
  已從 Flutter 中移除。
---

## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 3.16 穩定版發佈後，所有到達生命週期終點的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此主要來源，
以協助您進行遷移。
為了進一步協助您的遷移，請參考這份
[快速參考表][quick reference sheet]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-16

## 變更內容

本節依套件及受影響的類別列出棄用項目。

### Button `styleFrom` 屬性

套件：flutter
支援 Flutter Fix：是

`TextButton`、`ElevatedButton` 和 `OutlinedButton` 這三個元件（Widgets）皆有一個
靜態的 `styleFrom` 方法，用於產生 `ButtonStyle`。以下這些方法中的顏色
屬性，在 v3.1 時已被棄用：

* `TextButton.styleFrom`
  * `primary`
  * `onSurface`
* `ElevatedButton.styleFrom`
  * `primary`
  * `onPrimary`
  * `onSurface`
* `OutlinedButton.styleFrom`
  * `primary`
  * `onSurface`

這些變更讓 API 更加符合最新的 Material Design
規範。這些調整也讓按鈕顏色的應用方式更加明確，
這些屬性已被 `backgroundColor`、`foregroundColor` 和 `disabledForegroundColor` 取代。

**遷移指南**

遷移前的程式碼：

```dart
TextButton.styleFrom(
  primary: Colors.red,
  onSurface: Colors.black,
);
ElevatedButton.styleFrom(
  primary: Colors.red,
  onPrimary: Colors.blue,
  onSurface: Colors.black,
);
OutlinedButton.styleFrom(
  primary: Colors.red,
  onSurface: Colors.black,
);
```

遷移後的程式碼：

```dart
TextButton.styleFrom(
  foregroundColor: Colors.red,
  disabledForegroundColor: Colors.black,
);
ElevatedButton.styleFrom(
  backgroundColor: Colors.red,
  foregroundColor: Colors.blue,
  disabledForegroundColor: Colors.black,
);
OutlinedButton.styleFrom(
  foregroundColor: Colors.red,
  disabledForegroundColor: Colors.black,
);
```

**參考資料**

API 文件：

* [`TextButton`][`TextButton`]
* [`ElevatedButton`][`ElevatedButton`]
* [`OutlinedButton`][`OutlinedButton`]
* [`ButtonStyle`][`ButtonStyle`]

相關 PR：

* 已在 [#105291][#105291] 中標記為已淘汰
* 已在 [#139267][#139267] 中移除

[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`OutlinedButton`]: {{site.api}}/flutter/material/OutlinedButton-class.html
[`ButtonStyle`]: {{site.api}}/flutter/material/ButtonStyle-class.html

[#105291]: {{site.repo.flutter}}/pull/105291
[#139267]: {{site.repo.flutter}}/pull/139267

---

### ThemeData.selectedRowColor

套件：flutter  
Flutter Fix 支援：是

`ThemeData` 的 `selectedRowColor` 屬性已於 v3.1 標記為已淘汰。

此屬性已不再被框架使用，因為使用該屬性的元件（Widgets）已遷移至其他元件主題，或在新版 Material Design 規範中已不再需要此屬性。

**遷移指南**

遷移前的程式碼：

```dart
ThemeData(
  // ...
  selectedRowColor: Colors.pink, // Would have no effect.  
);
```

遷移後的程式碼：

```dart
ThemeData(
  // ...
  // Remove uses.  
);
```

**參考資料**

API 文件：

* [`ThemeData`][`ThemeData`]

相關 PR：

* 在 [#109070][#109070] 標記為已淘汰
* 在 [#139080][#139080] 移除

[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html

[#109070]: {{site.repo.flutter}}/pull/109070
[#139080]: {{site.repo.flutter}}/pull/139080

---

### NavigatorState.focusScopeNode

套件：flutter  
Flutter Fix 支援：是

`NavigatorState` 的 `focusScopeNode` 屬性自 v3.1 起已被標記為已淘汰。

此變更是為了解決由 `Navigator` 引入的 `FocusScopeNode` 所產生的多個問題。取而代之的是，`FocusScope` 被移動到包覆最上層的 `Navigator` 於 `WidgetsApp` 之中。`NavigatorState` 現在會包含自己的 `FocusNode`，並可透過其 `FocusNode.enclosingScope` 來存取正確的 `FocusScopeNode`。

**遷移指南**

遷移前的程式碼：

```dart
Navigator.of(context).focusScopeNode;

```

遷移後的程式碼：

```dart
Navigator.of(context).focusNode.enclosingScope!;
```

**參考資料**

API 文件：

* [`Navigator`][`Navigator`]
* [`NavigatorState`][`NavigatorState`]
* [`FocusScope`][`FocusScope`]
* [`FocusScopeNode`][`FocusScopeNode`]
* [`FocusNode`][`FocusNode`]

相關 PR：

* 在 [#109702][#109702] 中標記為已淘汰
* 在 [#139260][#139260] 中移除

[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`NavigatorState`]: {{site.api}}/flutter/widgets/NavigatorState-class.html
[`FocusScope`]: {{site.api}}/flutter/widgets/FocusScope-class.html
[`FocusScopeNode`]: {{site.api}}/flutter/widgets/FocusScopeNode-class.html
[`FocusNode`]: {{site.api}}/flutter/widgets/FocusNode-class.html

[#109702]: {{site.repo.flutter}}/pull/109702
[#139260]: {{site.repo.flutter}}/pull/139260

---

### PlatformMenuBar.body

套件：flutter  
支援 Flutter Fix：是

`body` 屬性在 `PlatformMenuBar` 中於 v3.1 被標記為已淘汰。

此變更是為了讓 `PlatformMenuBar` 與框架中的其他元件 (Widgets) 一致，並將其重新命名為 `child`。

**遷移指南**

遷移前的程式碼：

```dart
PlatformMenuBar(
  body: myWidget,
);
```

遷移後的程式碼：

```dart
PlatformMenuBar(
  child: myWidget,
);
```

**參考資料**

API 文件：

* [`PlatformMenuBar`][`PlatformMenuBar`]

相關 PR：

* 在 [#104565][#104565] 中標記為已淘汰
* 在 [#138509][#138509] 中移除

[`PlatformMenuBar`]: {{site.api}}/flutter/widgets/PlatformMenuBar-class.html

[#104565]: {{site.repo.flutter}}/pull/104565
[#138509]: {{site.repo.flutter}}/pull/138509

---

[先前公告][previously announced] 的 `TextTheme`、`WidgetInspectorService` 和 `WidgetInspectorServiceExtensions` 淘汰項目，在本次週期中尚未移除。
`WidgetInspectorService` 和 `WidgetInspectorServiceExtensions` 在 `setPubRootDirectories` 上的淘汰期限已延長一年，以便 IDE 及其他用戶進行遷移。
預計 `TextTheme` 的淘汰項目將於下個週期移除，屆時會再次公告。

[previously announced]: https://groups.google.com/g/flutter-announce/c/DLnuqZo714o

---

## 時程

穩定版發佈：3.19.0
