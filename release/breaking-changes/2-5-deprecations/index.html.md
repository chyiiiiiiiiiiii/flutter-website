# v2.5 之後移除的已棄用 API

> 在達到生命週期終止後，以下已棄用的 API 已從 Flutter 中移除。



## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 2.5 穩定版發佈後達到生命週期終止的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此
主要來源，以協助遷移。
同時也提供了[快速參考表][quick reference sheet]。


[Deprecation Policy]: https://github.com/flutter/flutter/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-2-5

## 變更內容

本節依受影響的類別列出棄用項目。

---

### `autovalidate`（屬於 `Form` 及相關類別）

Flutter Fix 支援：是

`autovalidate` 於 v1.19 被標記為棄用。

請改用 `autovalidateMode`。
當 `autovalidate` 為 true 時，請替換為 `AutovalidateMode.always`。
當 `autovalidate` 為 false 時，請替換為 `AutovalidateMode.disabled`。
此變更允許指定更多行為，不再僅限於原本的二元選擇，並新增了 `AutovalidateMode.onUserInteraction` 作為額外選項。

以下類別皆有相同的 API 變更：

- `Form`
- `FormField`
- `DropdownButtonFormField`
- `TextFormField`

**遷移指南**

[提供詳細遷移指南][In-depth migration guide available]

遷移前的程式碼：

```dart
const Form form = Form(autovalidate: true);
const Form form = Form(autovalidate: false);
final autoMode = form.autovalidate;

const FormField formField = FormField(autovalidate: true);
const FormField formField = FormField(autovalidate: false);
final autoMode = formField.autovalidate;

const TextFormField textFormField = TextFormField(autovalidate: true);
const TextFormField textFormField = TextFormField(autovalidate: false);

const DropdownButtonFormField dropDownButtonFormField = DropdownButtonFormField(autovalidate: true);
const DropdownButtonFormField dropdownButtonFormField = DropdownButtonFormField(autovalidate: false);
```

遷移後的程式碼：

```dart
const Form form = Form(autovalidateMode: AutovalidateMode.always);
const Form form = Form(autovalidateMode: AutovalidateMode.disabled);
final autoMode = form.autovalidateMode;

const FormField formField = FormField(autovalidateMode: AutovalidateMode.always);
const FormField formField = FormField(autovalidateMode: AutovalidateMode.disabled);
final autoMode = formField.autovalidateMode;

const TextFormField textFormField = TextFormField(autovalidateMode: AutovalidateMode.always);
const TextFormField textFormField = TextFormField(autovalidateMode: AutovalidateMode.disabled);

const DropdownButtonFormField dropDownButtonFormField = DropdownButtonFormField(autovalidateMode: AutovalidateMode.always);
const DropdownButtonFormField dropdownButtonFormField = DropdownButtonFormField(autovalidateMode: AutovalidateMode.disabled);
```

[In-depth migration guide available]: /release/breaking-changes/form-field-autovalidation-api

**參考資料**

API 文件：

* [`Form`][`Form`]
* [`FormField`][`FormField`]
* [`TextFormField`][`TextFormField`]
* [`DropdownButtonFormField`][`DropdownButtonFormField`]
* [`AutovalidateMode`][`AutovalidateMode`]

相關議題：

* [Issue 56363](https://github.com/flutter/flutter/issues/56363)
* [Issue 18885](https://github.com/flutter/flutter/issues/18885)
* [Issue 15404](https://github.com/flutter/flutter/issues/15404)
* [Issue 36154](https://github.com/flutter/flutter/issues/36154)
* [Issue 48876](https://github.com/flutter/flutter/issues/48876)

相關 PR：

* 在 [#59766](https://github.com/flutter/flutter/pull/59766) 標記為已淘汰
* 在 [#90292](https://github.com/flutter/flutter/pull/90292) 移除

[`Form`]: https://api.flutter.dev/flutter/widgets/Form-class.html
[`FormField`]: https://api.flutter.dev/flutter/widgets/FormField-class.html
[`TextFormField`]: https://api.flutter.dev/flutter/material/TextFormField-class.html
[`DropdownButtonFormField`]: https://api.flutter.dev/flutter/material/DropdownButtonFormField-class.html
[`AutovalidateMode`]: https://api.flutter.dev/flutter/widgets/AutovalidateMode-class.html

---

### `FloatingHeaderSnapConfiguration.vsync`

Flutter Fix 是否支援：否

`FloatingHeaderSnapConfiguration` 的 `TickerProvider` `vsync` 屬性已於 v1.19 被標記為已淘汰。

動畫 (Animation) 的 `vsync` 應改為使用 `SliverPersistentHeaderDelegate.vsync` 來指定。

**遷移指南**

遷移前的程式碼：

```dart
class MySliverPersistentHeaderDelegate extends SliverPersistentHeaderDelegate {
  FloatingHeaderSnapConfiguration? get snapConfiguration => FloatingHeaderSnapConfiguration(vsync: myTickerProvider);
}
```

遷移後的程式碼：

```dart
class MySliverPersistentHeaderDelegate extends SliverPersistentHeaderDelegate {
  FloatingHeaderSnapConfiguration? get snapConfiguration => FloatingHeaderSnapConfiguration();
  TickerProvider? get vsync => myTickerProvider;
}

```

**參考資料**

設計文件：

* [Control SliverPersistentHeader's showOnScreen Behavior][Control SliverPersistentHeader's showOnScreen Behavior]

API 文件：

* [`FloatingHeaderSnapConfiguration`][`FloatingHeaderSnapConfiguration`]
* [`SliverPersistentHeaderDelegate`][`SliverPersistentHeaderDelegate`]
* [`TickerProvider`][`TickerProvider`]

相關議題：

* [Issue 25507](https://github.com/flutter/flutter/issues/25507)

相關 PR：

* 已在 [#56413](https://github.com/flutter/flutter/pull/56413) 標記為已淘汰（Deprecated）
* 已在 [#90293](https://github.com/flutter/flutter/pull/90293) 移除

[Control SliverPersistentHeader's showOnScreen Behavior]: https://docs.google.com/document/d/1BZhxy176uUnqOCnXdnHM1XetS9mw9WIyUAOE-dgVdUM/edit?usp=sharing
[`FloatingHeaderSnapConfiguration`]: https://api.flutter.dev/flutter/rendering/FloatingHeaderSnapConfiguration-class.html
[`SliverPersistentHeaderDelegate`]: https://api.flutter.dev/flutter/widgets/SliverPersistentHeaderDelegate-class.html
[`TickerProvider`]: https://api.flutter.dev/flutter/scheduler/TickerProvider-class.html

---

### `AndroidViewController` 及其子類別的 `id`

Flutter Fix 支援：是

`AndroidViewController`、`TextureAndroidViewController` 和 `SurfaceAndroidViewController` 的 `id` 已於 v1.20 被標記為已淘汰（Deprecated）。

針對這些所有使用情境，應改用 `viewId`。

**遷移指南**

遷移前的程式碼：

```dart
final SurfaceAndroidViewController surfaceController = SurfaceAndroidViewController(
  viewId: 10,
  viewType: 'FixTester',
  layoutDirection: TextDirection.ltr,
);
int viewId = surfaceController.id;
final SurfaceAndroidViewController surfaceController = SurfaceAndroidViewController(
  error: '',
);
final TextureAndroidViewController textureController = TextureAndroidViewController(
  error: '',
);
final TextureAndroidViewController textureController = TextureAndroidViewController(
  viewId: 10,
  viewType: 'FixTester',
  layoutDirection: TextDirection.ltr,
);
viewId = textureController.id;
```

遷移後的程式碼：

```dart
final SurfaceAndroidViewController surfaceController = SurfaceAndroidViewController(
  viewId: 10,
  viewType: 'FixTester',
  layoutDirection: TextDirection.ltr,
);
int viewId = surfaceController.viewId;
final SurfaceAndroidViewController surfaceController = SurfaceAndroidViewController(
  error: '',
);
final TextureAndroidViewController textureController = TextureAndroidViewController(
  error: '',
);
final TextureAndroidViewController textureController = TextureAndroidViewController(
  viewId: 10,
  viewType: 'FixTester',
  layoutDirection: TextDirection.ltr,
);
viewId = textureController.viewId;
```

**參考資料**

設計文件：

* [Flutter Hybrid Composition][Flutter Hybrid Composition]

API 文件：

* [`AndroidViewController`][`AndroidViewController`]
* [`TextureAndroidViewController`][`TextureAndroidViewController`]
* [`SurfaceAndroidViewController`][`SurfaceAndroidViewController`]

相關議題：

* [Issue 55218](https://github.com/flutter/flutter/issues/55218)

相關 PR：

* 在 [#60320](https://github.com/flutter/flutter/issues/60320) 標記為已淘汰
* 在 [#90294](https://github.com/flutter/flutter/issues/90294) 移除

[Flutter Hybrid Composition]: https://github.com/flutter/flutter/blob/main/docs/platforms/Hybrid-Composition.md
[`AndroidViewController`]: https://api.flutter.dev/flutter/services/AndroidViewController-class.html
[`TextureAndroidViewController`]: https://api.flutter.dev/flutter/services/TextureAndroidViewController-class.html
[`SurfaceAndroidViewController`]: https://api.flutter.dev/flutter/services/SurfaceAndroidViewController-class.html

---

### `BlacklistingTextInputFormatter` & `WhitelistingTextInputFormatter`

Flutter Fix 是否支援：否

`BlacklistingTextInputFormatter` 和 `WhitelistingTextInoutFormatter` 這兩個整個類別已於 v1.20 被標記為已淘汰。

其功能已重寫整合至單一類別 `FilteringTextInputFormatter`。

**遷移指南**

遷移前的程式碼：

```dart
formatter = BlacklistingTextInputFormatter(pattern, replacementString: 'replacedPattern');
formatter = BlacklistingTextInputFormatter.singleLineFormatter;
pattern = formatter.blacklistedPattern;
formatter = WhitelistingTextInputFormatter(pattern);
formatter = WhitelistingTextInputFormatter.digitsOnly;
pattern = formatter.whitelistedPattern;
```

遷移後的程式碼：

```dart
formatter = FilteringTextInputFormatter.deny(pattern, replacementString: 'replacedPattern');
formatter = FilteringTextInputFormatter.singleLineFormatter;
pattern = formatter.filterPattern;
formatter = FilteringTextInputFormatter.allow(pattern);
formatter = FilteringTextInputFormatter.digitsOnly;
pattern = formatter.filterPattern;
```

**參考資料**

API 文件：

* [`FilteringTextInputFormatter`][`FilteringTextInputFormatter`]

相關 PR：

* 在 [#59120](https://github.com/flutter/flutter/issues/59120) 標記為已淘汰
* 在 [#90296](https://github.com/flutter/flutter/issues/90296) 移除

[`FilteringTextInputFormatter`]: https://api.flutter.dev/flutter/services/FilteringTextInputFormatter-class.html

---

### `BottomNavigationBarItem.title`

Flutter Fix 支援：是

`BottomNavigationBarItem` 的 `title` 已於 v1.19 標記為已淘汰。
應改為使用 `label` 屬性。這項遷移可提升文字縮放效果，並為 `BottomNavigationBarItem`
在 `BottomNavigationBar` 的情境下提供內建的 `Tooltip`。

**遷移指南**

[提供詳細遷移指南][In-depth migration guide available]

遷移前的程式碼：

```dart
const BottomNavigationBarItem bottomNavigationBarItem = BottomNavigationBarItem(title: myTitle);
const BottomNavigationBarItem bottomNavigationBarItem = BottomNavigationBarItem();
bottomNavigationBarItem.title;
```

遷移後的程式碼：

```dart
const BottomNavigationBarItem bottomNavigationBarItem = BottomNavigationBarItem(label: myTitle);
const BottomNavigationBarItem bottomNavigationBarItem = BottomNavigationBarItem();
bottomNavigationBarItem.label;
```

**參考資料**

設計文件：
* [BottomNavigationBarItem title][BottomNavigationBarItem title]

API 文件：

* [`BottomNavigationBarItem`][`BottomNavigationBarItem`]
* [`BottomNavigationBar`][`BottomNavigationBar`]
* [`Tooltip`][`Tooltip`]

相關 PR：

* 在 [#59127](https://github.com/flutter/flutter/issues/59127) 標記為已淘汰
* 在 [#90295](https://github.com/flutter/flutter/issues/90295) 移除

[In-depth migration guide available]: /release/breaking-changes/bottom-navigation-title-to-label
[BottomNavigationBarItem title]: /go/bottom-navigation-bar-title-deprecation
[`BottomNavigationBarItem`]: https://api.flutter.dev/flutter/widgets/BottomNavigationBarItem-class.html
[`BottomNavigationBar`]: https://api.flutter.dev/flutter/material/BottomNavigationBar-class.html
[`Tooltip`]: https://api.flutter.dev/flutter/material/Tooltip-class.html

---

### `packageRoot` 在 `dart:core`、`dart:isolate` 和 `package:platform` 中

以下 API 已被移除：

* [`Platform.packageRoot`][`Platform.packageRoot`] 位於 `dart:core`
* [`Isolate.packageRoot`][`Isolate.packageRoot`] 位於 `dart:isolate`
* [`Platform.packageRoot`][`Platform.packageRoot`] 位於 `package:platform`

這些 API 在 [Dart 2.0][dart-deprecated] 時已被標記為淘汰，且在任何 Dart 2.x 版本中都無法正確運作。

**遷移指南**

這些 `packageRoot` API 已被一組全新的 `packageConfig` API 取代，建議您遷移至新 API。

* [`Platform.packageConfig`][`Platform.packageConfig`] 位於 `dart:core`
* [`Isolate.packageConfig`][`Isolate.packageConfig`] 位於 `dart:isolate`
* [`Platform.packageConfig`][`Platform.packageConfig`] 位於 `package:platform`

如果您正在使用 `package:platform` 套件，請注意，無論您是否有使用 `packageRoot` API，該套件的舊版本都無法與 Dart 2.16 及之後的版本相容，因為它們依賴已被移除的 `packageRoot` API。當您嘗試執行應用程式時，可能會看到如下錯誤訊息：

```plaintext
../../.pub-cache/hosted/pub.dartlang.org/platform-3.0.0/
  lib/src/interface/local_platform.dart:46:19:
  Error: Member not found: 'packageRoot'.
      io.Platform.packageRoot; // ignore: deprecated_member_use
                  ^^^^^^^^^^^
```

為了解決此問題，請將 `package:platform` 升級至 `3.1.0` 版本或更高版本，方法是在你的 `pubspec.yaml` 檔案中升級相依條件：

```yaml
dependencies:
  platform: ^3.1.0
```

**參考資料**

相關的 PR：

* 已從 Dart 函式庫中移除，詳見 [#47769][#47769]
* 已從 `package:platform` 中移除，詳見 [PR #38][PR #38]
* Flutter 已更新為使用 `package:platform` 3.1.0，詳見 [PR #94603][PR #94603]

[`Platform.packageRoot`]: https://api.dart.dev/stable/2.15.1/dart-io/Platform/packageRoot.html
[`Isolate.packageRoot`]: https://api.dart.dev/stable/2.15.1/dart-isolate/Isolate/packageRoot.html
[`Platform.packageRoot`]: https://pub.dev/documentation/platform/3.0.0/platform/Platform/packageRoot.html
[dart-deprecated]: https://dart-review.googlesource.com/c/sdk/+/59100/16/CHANGELOG.md
[`Platform.packageConfig`]: https://api.dart.dev/stable/2.15.1/dart-io/Platform/packageConfig.html
[`Isolate.packageConfig`]: https://api.dart.dev/stable/2.15.1/dart-isolate/Isolate/packageConfig.html
[`Platform.packageConfig`]: https://pub.dev/documentation/platform/3.0.0/platform/Platform/packageConfig.html
[#47769]: https://github.com/dart-lang/sdk/issues/47769
[PR #38]: https://github.com/google/platform.dart/pull/38
[PR #94603]: https://github.com/flutter/flutter/pull/94603

---

## 時程

在穩定版釋出：2.10

