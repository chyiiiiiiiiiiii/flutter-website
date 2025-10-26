---
title: v2.5 之後移除的已棄用 API
description: >
  在達到生命週期終止後，以下已棄用的 API
  已從 Flutter 移除。
---

## 摘要

根據 Flutter 的 [棄用政策][Deprecation Policy]，
在 2.5 穩定版發佈後，達到生命週期終止的
已棄用 API 已被移除。

所有受影響的 API 已彙整於此主要來源，
以協助遷移。另提供
[快速參考表][quick reference sheet]。


[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-2-5

## 變更內容

本節依受影響的類別列出棄用項目。

---

### `autovalidate`（屬於 `Form` 及相關類別）

Flutter Fix 支援：是

`autovalidate` 在 v1.19 已被棄用。

請改用 `autovalidateMode`。
若 `autovalidate` 為 true，請替換為 `AutovalidateMode.always`。
若 `autovalidate` 為 false，請替換為 `AutovalidateMode.disabled`。
此變更允許指定更多行為，超越原本的二元選擇，並新增 `AutovalidateMode.onUserInteraction` 作為額外選項。

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

* [Issue 56363]({{site.repo.flutter}}/issues/56363)
* [Issue 18885]({{site.repo.flutter}}/issues/18885)
* [Issue 15404]({{site.repo.flutter}}/issues/15404)
* [Issue 36154]({{site.repo.flutter}}/issues/36154)
* [Issue 48876]({{site.repo.flutter}}/issues/48876)

相關 PR：

* 在 [#59766]({{site.repo.flutter}}/pull/59766) 中標記為過時
* 在 [#90292]({{site.repo.flutter}}/pull/90292) 中移除

[`Form`]: {{site.api}}/flutter/widgets/Form-class.html
[`FormField`]: {{site.api}}/flutter/widgets/FormField-class.html
[`TextFormField`]: {{site.api}}/flutter/material/TextFormField-class.html
[`DropdownButtonFormField`]: {{site.api}}/flutter/material/DropdownButtonFormField-class.html
[`AutovalidateMode`]: {{site.api}}/flutter/widgets/AutovalidateMode-class.html

---

### `FloatingHeaderSnapConfiguration.vsync`

Flutter Fix 支援：否

`FloatingHeaderSnapConfiguration` 的 `TickerProvider` `vsync` 屬性已於 v1.19 標記為過時。

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

* [Issue 25507]({{site.repo.flutter}}/issues/25507)

相關 PR：

* 已在 [#56413]({{site.repo.flutter}}/pull/56413) 標記為過時
* 已在 [#90293]({{site.repo.flutter}}/pull/90293) 移除

[Control SliverPersistentHeader's showOnScreen Behavior]: https://docs.google.com/document/d/1BZhxy176uUnqOCnXdnHM1XetS9mw9WIyUAOE-dgVdUM/edit?usp=sharing
[`FloatingHeaderSnapConfiguration`]: {{site.api}}/flutter/rendering/FloatingHeaderSnapConfiguration-class.html
[`SliverPersistentHeaderDelegate`]: {{site.api}}/flutter/widgets/SliverPersistentHeaderDelegate-class.html
[`TickerProvider`]: {{site.api}}/flutter/scheduler/TickerProvider-class.html

---

### `AndroidViewController` 及其子類別的 `id`

Flutter Fix 支援：是

`AndroidViewController`、`TextureAndroidViewController` 和 `SurfaceAndroidViewController` 的 `id` 已在 v1.20 被標記為過時。

針對上述所有使用情境，應改用 `viewId`。

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

* [Issue 55218]({{site.repo.flutter}}/issues/55218)

相關 PR：

* 在 [#60320]({{site.repo.flutter}}/issues/60320) 標記為已淘汰
* 在 [#90294]({{site.repo.flutter}}/issues/90294) 移除

[Flutter Hybrid Composition]: {{site.repo.flutter}}/blob/main/docs/platforms/Hybrid-Composition.md
[`AndroidViewController`]: {{site.api}}/flutter/services/AndroidViewController-class.html
[`TextureAndroidViewController`]: {{site.api}}/flutter/services/TextureAndroidViewController-class.html
[`SurfaceAndroidViewController`]: {{site.api}}/flutter/services/SurfaceAndroidViewController-class.html

---

### `BlacklistingTextInputFormatter` & `WhitelistingTextInputFormatter`

Flutter Fix 支援：否

`BlacklistingTextInputFormatter` 和 `WhitelistingTextInoutFormatter` 這兩個類別已於 v1.20 標記為已淘汰。

它們的功能已重寫整合至單一類別 `FilteringTextInputFormatter`。

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

* 在 [#59120]({{site.repo.flutter}}/issues/59120) 標記為已淘汰
* 在 [#90296]({{site.repo.flutter}}/issues/90296) 移除

[`FilteringTextInputFormatter`]: {{site.api}}/flutter/services/FilteringTextInputFormatter-class.html

---

### `BottomNavigationBarItem.title`

Flutter Fix 支援：是

`BottomNavigationBarItem` 的 `title` 已於 v1.19 標記為已淘汰。
應改用 `label` 屬性。此遷移可帶來更佳的文字縮放效果，並且在 `BottomNavigationBar` 的情境下，為 `BottomNavigationBarItem` 提供內建的 `Tooltip`。

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

* 已在 [#59127]({{site.repo.flutter}}/issues/59127) 標記為已淘汰（Deprecated）
* 已在 [#90295]({{site.repo.flutter}}/issues/90295) 移除

[In-depth migration guide available]: /release/breaking-changes/bottom-navigation-title-to-label
[BottomNavigationBarItem title]: /go/bottom-navigation-bar-title-deprecation
[`BottomNavigationBarItem`]: {{site.api}}/flutter/widgets/BottomNavigationBarItem-class.html
[`BottomNavigationBar`]: {{site.api}}/flutter/material/BottomNavigationBar-class.html
[`Tooltip`]: {{site.api}}/flutter/material/Tooltip-class.html

---

### `packageRoot` 在 `dart:core`、`dart:isolate` 和 `package:platform` 中

以下 API 已被移除：

* [`Platform.packageRoot`][`Platform.packageRoot`] 位於 `dart:core`
* [`Isolate.packageRoot`][`Isolate.packageRoot`] 位於 `dart:isolate`
* [`Platform.packageRoot`][`Platform.packageRoot`] 位於 `package:platform`

這些 API 已於 [Dart 2.0 中標記為已淘汰][dart-deprecated]，且在任何 Dart 2.x 版本中皆無法正確運作。

**遷移指南**

這些 `packageRoot` API 已由新的一組 `packageConfig` API 取代，建議您遷移至新 API。

* [`Platform.packageConfig`][`Platform.packageConfig`] 位於 `dart:core`
* [`Isolate.packageConfig`][`Isolate.packageConfig`] 位於 `dart:isolate`
* [`Platform.packageConfig`][`Platform.packageConfig`] 位於 `package:platform`

如果您正在使用 `package:platform` 套件，請注意，無論您是否有使用 `packageRoot` API，該套件的舊版本皆不相容於 Dart 2.16 及更高版本，因為其依賴已被移除的 `packageRoot` API。當您嘗試執行應用程式時，可能會看到如下錯誤訊息：

```plaintext
../../.pub-cache/hosted/pub.dartlang.org/platform-3.0.0/
  lib/src/interface/local_platform.dart:46:19:
  Error: Member not found: 'packageRoot'.
      io.Platform.packageRoot; // ignore: deprecated_member_use
                  ^^^^^^^^^^^
```

為了解決此問題，請將 `package:platform` 升級至 `3.1.0` 版本或更高版本，方法是更新你在 `pubspec.yaml` 檔案中的相依性限制：

```yaml
dependencies:
  platform: ^3.1.0
```

**參考資料**

相關的 PR：

* 已從 Dart 函式庫中移除，詳見 [#47769][#47769]
* 已從 `package:platform` 中移除，詳見 [PR #38][PR #38]
* Flutter 已更新為使用 `package:platform` 3.1.0，詳見 [PR #94603][PR #94603]

[`Platform.packageRoot`]: {{site.dart.api}}/stable/2.15.1/dart-io/Platform/packageRoot.html
[`Isolate.packageRoot`]: {{site.dart.api}}/stable/2.15.1/dart-isolate/Isolate/packageRoot.html
[`Platform.packageRoot`]: {{site.pub-api}}/platform/3.0.0/platform/Platform/packageRoot.html
[dart-deprecated]: https://dart-review.googlesource.com/c/sdk/+/59100/16/CHANGELOG.md
[`Platform.packageConfig`]: {{site.dart.api}}/stable/2.15.1/dart-io/Platform/packageConfig.html
[`Isolate.packageConfig`]: {{site.dart.api}}/stable/2.15.1/dart-isolate/Isolate/packageConfig.html
[`Platform.packageConfig`]: {{site.pub-api}}/platform/3.0.0/platform/Platform/packageConfig.html
[#47769]: {{site.github}}/dart-lang/sdk/issues/47769
[PR #38]: {{site.github}}/google/platform.dart/pull/38
[PR #94603]: {{site.repo.flutter}}/pull/94603

---

## 時程表

穩定版發行：2.10
