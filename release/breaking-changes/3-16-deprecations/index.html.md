# v3.16 之後移除的已棄用 API

> 以下在 Flutter 達到生命週期終止後， 已從 Flutter 移除的已棄用 API。



## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 3.16 穩定版發佈後達到生命週期終止的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此主要來源，
以協助您進行遷移。
如需進一步協助遷移，請參考這份
[快速參考表][quick reference sheet]。

[Deprecation Policy]: https://github.com/flutter/flutter/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-16

## 變更內容

本節依套件及受影響的類別列出棄用項目。

### Button `styleFrom` 屬性

套件：flutter
支援 Flutter Fix：是

`TextButton`、`ElevatedButton` 以及 `OutlinedButton` 這三個元件 (Widget) 皆有一個
靜態的 `styleFrom` 方法用於產生 `ButtonStyle`。在 v3.1 版本中，
以下各類別該方法的顏色屬性已被棄用：

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

這些變更讓 API 更符合最新的 Material Design
規範。這些調整也讓按鈕顏色的應用方式更加明確，
透過以 `backgroundColor`、`foregroundColor` 和 `disabledForegroundColor` 取代上述屬性來達成。

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

* [`TextButton`][]
* [`ElevatedButton`][]
* [`OutlinedButton`][]
* [`ButtonStyle`][]

相關 PR：

* 在 [#105291][] 中標記為已棄用
* 在 [#139267][] 中移除

[`TextButton`]: https://api.flutter.dev/flutter/material/TextButton-class.html
[`ElevatedButton`]: https://api.flutter.dev/flutter/material/ElevatedButton-class.html
[`OutlinedButton`]: https://api.flutter.dev/flutter/material/OutlinedButton-class.html
[`ButtonStyle`]: https://api.flutter.dev/flutter/material/ButtonStyle-class.html

[#105291]: https://github.com/flutter/flutter/pull/105291
[#139267]: https://github.com/flutter/flutter/pull/139267

---

### ThemeData.selectedRowColor

套件：flutter
支援 Flutter Fix：是

`ThemeData` 的 `selectedRowColor` 屬性於 v3.1 被標記為已棄用。

此屬性已不再被框架使用，因為原本使用它的元件已遷移至其他元件主題，
或是在新版 Material Design 規範下已不再需要此屬性。

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

* [`ThemeData`][]

相關 PR：

* 在 [#109070][] 中標記為已棄用
* 在 [#139080][] 中移除

[`ThemeData`]: https://api.flutter.dev/flutter/material/ThemeData-class.html

[#109070]: https://github.com/flutter/flutter/pull/109070
[#139080]: https://github.com/flutter/flutter/pull/139080

---

### NavigatorState.focusScopeNode

套件：flutter
支援 Flutter Fix：是

`NavigatorState` 的 `focusScopeNode` 屬性於 v3.1 被標記為已棄用。

此變更是為了解決由 `Navigator` 引入的 `FocusScopeNode` 所產生的多項問題。
取而代之的是，`FocusScope` 現在會包覆 `WidgetsApp` 中最上層的 `Navigator`。
`NavigatorState` 也被調整為包含自己的 `FocusNode`，
並可透過其 `FocusNode.enclosingScope` 來存取正確的 `FocusScopeNode`。

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

* [`Navigator`][]
* [`NavigatorState`][]
* [`FocusScope`][]
* [`FocusScopeNode`][]
* [`FocusNode`][]

相關 PR：

* 在 [#109702][] 中標記為已棄用
* 在 [#139260][] 中移除

[`Navigator`]: https://api.flutter.dev/flutter/widgets/Navigator-class.html
[`NavigatorState`]: https://api.flutter.dev/flutter/widgets/NavigatorState-class.html
[`FocusScope`]: https://api.flutter.dev/flutter/widgets/FocusScope-class.html
[`FocusScopeNode`]: https://api.flutter.dev/flutter/widgets/FocusScopeNode-class.html
[`FocusNode`]: https://api.flutter.dev/flutter/widgets/FocusNode-class.html

[#109702]: https://github.com/flutter/flutter/pull/109702
[#139260]: https://github.com/flutter/flutter/pull/139260

---

### PlatformMenuBar.body

套件：flutter
支援 Flutter Fix：是

`PlatformMenuBar` 的 `body` 屬性於 v3.1 被標記為已棄用。

此變更是為了讓 `PlatformMenuBar` 與框架中其他元件保持一致，
將其重新命名為 `child`。

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

* [`PlatformMenuBar`][]

相關 PR：

* 在 [#104565][] 中標記為已棄用
* 在 [#138509][] 中移除

[`PlatformMenuBar`]: https://api.flutter.dev/flutter/widgets/PlatformMenuBar-class.html

[#104565]: https://github.com/flutter/flutter/pull/104565
[#138509]: https://github.com/flutter/flutter/pull/138509

---

[先前公告][previously announced] 的 `TextTheme`、`WidgetInspectorService`
和 `WidgetInspectorServiceExtensions` 棄用項目，在本次週期中尚未移除。
`WidgetInspectorService` 和 `WidgetInspectorServiceExtensions`
在 `setPubRootDirectories` 上的棄用時程已延長一年，以便 IDE 及其他客戶進行遷移。
預計 `TextTheme` 的棄用項目將於下個週期移除，屆時會再次公告。

[previously announced]: https://groups.google.com/g/flutter-announce/c/DLnuqZo714o

---

## 時程

穩定版發佈於：3.19.0

