---
title: window singleton 已被棄用
description: >
  為了支援多視圖（multiple views）與多視窗（multiple windows），
  window singleton 已被棄用。
---

{% render docs/breaking-changes.md %}

## 摘要

為了支援多視圖（multiple views）與多視窗（multiple windows），`window` singleton 已被棄用。先前依賴 `window` singleton 的程式碼，現在需要透過 `View.of` API 查找要操作的特定視圖，或直接與 `PlatformDispatcher` 互動。

## 背景說明

最初，Flutter 假設一個應用程式只包含一個單一視圖（即 `window`），所有內容都繪製於其中。在多視圖（multi-view）環境下，這個假設已不再合理，因此相關 API 也已被棄用。取而代之的是，依賴這些 API 的應用程式與函式庫，必須選擇要操作的特定視圖，並依照本遷移指南，遷移至新的多視圖相容 API。

## 變更說明

本次變更中被棄用的 API 包含：

* 由 `dart:ui` 所公開的全域 `window` 屬性。
* `BaseBinding` 類別上的 `window` 屬性，通常可透過下列方式存取：
  * `GestureBinding.instance.window`，
  * `SchedulerBinding.instance.window`，
  * `ServicesBinding.instance.window`，
  * `PaintingBinding.instance.window`，
  * `SemanticsBinding.instance.window`，
  * `RendererBinding.instance.window`，
  * `WidgetsBinding.instance.window`，
  * 或 `WidgetTester.binding.window`。
* 來自 `dart:ui` 的 `SingletonFlutterView` 類別。
* `flutter_test` 的 `TestWindow`，其建構子，以及其所有屬性與方法。

針對依賴這些已棄用 API 的應用程式與函式庫程式碼，有以下遷移選項：

若有 `BuildContext` 可用，建議透過 `View.of` 查找目前的 `FlutterView`。這會回傳 `FlutterView`，即與給定 context 關聯的 `build()` 方法所建構的元件將被繪製的視圖。`FlutterView` 提供與先前已棄用的 `SingletonFlutterView` 類別（由上述已棄用的 `window` 屬性回傳）相同的功能。不過，部分平台專屬功能已移至 `PlatformDispatcher`，可透過 `View.of` 回傳的 `FlutterView` 以 `FlutterView.platformDispatcher` 存取。使用 `View.of` 是遷移離上述已棄用屬性的推薦方式。

若沒有 `BuildContext` 可用來查找 `FlutterView`，則可直接查詢 `PlatformDispatcher` 以存取平台專屬功能。它同時也在 `PlatformDispatcher.views` 維護所有可用 `FlutterView` 的清單，方便存取特定視圖功能。如有可能，應透過 binding（例如 `WidgetsBinding.instance.platformDispatcher`）來存取 `PlatformDispatcher`，而非直接使用靜態 `PlatformDispatcher.instance` 屬性。這樣可確保 `PlatformDispatcher` 的功能在測試時能被正確 mock。

### 測試

若測試程式中存取 `WidgetTester.binding.window` 屬性以變更 window 屬性，請依下列方式進行遷移：

在使用 `testWidgets` 撰寫的測試中，新增了兩個新屬性，合起來可取代 `TestWindow` 的功能。

* `WidgetTester.view` 會提供一個可修改的 `TestFlutterView`，類似於 `WidgetTester.binding.window`，但僅包含視圖專屬屬性，例如視圖的尺寸、顯示像素比等。
  * `WidgetTester.viewOf` 針對某些多視圖使用情境可用，但從 `WidgetTester.binding.window` 遷移時通常不需要。
* `WidgetTester.platformDispatcher` 則可存取 `TestPlatformDispatcher`，可用來修改平台專屬屬性，例如平台語系、系統功能是否可用等。

## 遷移指南

應用程式與函式庫程式碼，若可存取 `BuildContext`，應改用 `View.of` 查找與該 context 關聯的 `FlutterView`，而非直接存取靜態 `window` 屬性。部分屬性已移至可由視圖透過 `platformDispatcher` getter 存取的 `PlatformDispatcher`。

遷移前的程式碼：

```dart
Widget build(BuildContext context) {
  final double dpr = WidgetsBinding.instance.window.devicePixelRatio;
  final Locale locale = WidgetsBinding.instance.window.locale;
  return Text('The device pixel ratio is $dpr and the locale is $locale.');
}
```

遷移後的程式碼：

```dart
Widget build(BuildContext context) {
  final double dpr = View.of(context).devicePixelRatio;
  final Locale locale = View.of(context).platformDispatcher.locale;
  return Text('The device pixel ratio is $dpr and the locale is $locale.');
}
```

如果沒有可用的 `BuildContext`，可以直接參考綁定所公開的 `PlatformDispatcher`。

遷移前的程式碼：

```dart
double getTextScaleFactor() {
  return WidgetsBinding.instance.window.textScaleFactor;
}
```

遷移後的程式碼：

```dart
double getTextScaleFactor() {
  // View.of(context).platformDispatcher.textScaleFactor if a BuildContext is available, otherwise:
  return WidgetsBinding.instance.platformDispatcher.textScaleFactor;
}
```

### 測試

在使用 `testWidget` 撰寫的測試中，應改用新的 `view` 和 `platformDispatcher` 存取器。

#### 設定特定檢視的屬性

`TestFlutterView` 也針對測試 API 進行了優化，使其更清晰且簡潔，現在採用與相關 getter 同名的 setter，而非使用 `TestValue` 字尾的 setter。

遷移前的程式碼：

```dart
testWidget('test name', (WidgetTester tester) async {
  tester.binding.window.devicePixelRatioTestValue = 2.0;
  tester.binding.window.displayFeaturesTestValue = <DisplayFeatures>[];
  tester.binding.window.gestureSettingsTestValue = const GestureSettings(physicalTouchSlop: 100);
  tester.binding.window.paddingTestValue = FakeViewPadding.zero;
  tester.binding.window.physicalGeometryTestValue = const Rect.fromLTRB(0,0, 500, 800);
  tester.binding.window.physicalSizeTestValue = const Size(300, 400);
  tester.binding.window.systemGestureInsetsTestValue = FakeViewPadding.zero;
  tester.binding.window.viewInsetsTestValue = FakeViewPadding.zero;
  tester.binding.window.viewPaddingTestValue = FakeViewPadding.zero;
});
```

遷移後的程式碼

```dart
testWidget('test name', (WidgetTester tester) async {
  tester.view.devicePixelRatio = 2.0;
  tester.view.displayFeatures = <DisplayFeatures>[];
  tester.view.gestureSettings = const GestureSettings(physicalTouchSlop: 100);
  tester.view.padding = FakeViewPadding.zero;
  tester.view.physicalGeometry = const Rect.fromLTRB(0,0, 500, 800);
  tester.view.physicalSize = const Size(300, 400);
  tester.view.systemGestureInsets = FakeViewPadding.zero;
  tester.view.viewInsets = FakeViewPadding.zero;
  tester.view.viewPadding = FakeViewPadding.zero;
});
```

#### 重設檢視專屬屬性

`TestFlutterView` 仍然保有重設個別屬性或整個檢視的能力，但為了讓命名更加清晰且一致，這些方法的名稱已從 `clear<property>TestValue` 和 `clearAllTestValues` 分別更改為 `reset<property>` 和 `reset`。

##### 重設個別屬性

遷移前的程式碼：

```dart
testWidget('test name', (WidgetTester tester) async {
  addTearDown(tester.binding.window.clearDevicePixelRatioTestValue);
  addTearDown(tester.binding.window.clearDisplayFeaturesTestValue);
  addTearDown(tester.binding.window.clearGestureSettingsTestValue);
  addTearDown(tester.binding.window.clearPaddingTestValue);
  addTearDown(tester.binding.window.clearPhysicalGeometryTestValue);
  addTearDown(tester.binding.window.clearPhysicalSizeTestValue);
  addTearDown(tester.binding.window.clearSystemGestureInsetsTestValue);
  addTearDown(tester.binding.window.clearViewInsetsTestValue);
  addTearDown(tester.binding.window.clearViewPaddingTestValue);
});
```

遷移後的程式碼

```dart
testWidget('test name', (WidgetTester tester) async {
  addTearDown(tester.view.resetDevicePixelRatio);
  addTearDown(tester.view.resetDisplayFeatures);
  addTearDown(tester.view.resetGestureSettings);
  addTearDown(tester.view.resetPadding);
  addTearDown(tester.view.resetPhysicalGeometry);
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetSystemGestureInsets);
  addTearDown(tester.view.resetViewInsets);
  addTearDown(tester.view.resetViewPadding);
});
```

##### 一次重設所有屬性

遷移前的程式碼：

```dart
testWidget('test name', (WidgetTester tester) async {
  addTearDown(tester.binding.window.clearAllTestValues);
});
```

遷移後的程式碼

```dart
testWidget('test name', (WidgetTester tester) async {
  addTearDown(tester.view.reset);
});
```

#### 設定平台專屬屬性

`TestPlatformDispatcher` 保留了與 `TestWindow` 相同的功能與命名規則，用於測試 setter，因此平台專屬屬性的遷移主要只需在新的 `WidgetTester.platformDispatcher` 存取器上呼叫相同的 setter 即可。

遷移前的程式碼：

```dart
testWidgets('test name', (WidgetTester tester) async {
  tester.binding.window.accessibilityFeaturesTestValue = FakeAccessibilityFeatures.allOn;
  tester.binding.window.alwaysUse24HourFormatTestValue = false;
  tester.binding.window.brieflyShowPasswordTestValue = true;
  tester.binding.window.defaultRouteNameTestValue = '/test';
  tester.binding.window.initialLifecycleStateTestValue = 'painting';
  tester.binding.window.localesTestValue = <Locale>[const Locale('en-us'), const Locale('ar-jo')];
  tester.binding.window.localeTestValue = const Locale('ar-jo');
  tester.binding.window.nativeSpellCheckServiceDefinedTestValue = false;
  tester.binding.window.platformBrightnessTestValue = Brightness.dark;
  tester.binding.window.semanticsEnabledTestValue = true;
  tester.binding.window.textScaleFactorTestValue = 2.0;
});
```

遷移後的程式碼：

```dart
testWidgets('test name', (WidgetTester tester) async {
  tester.platformDispatcher.accessibilityFeaturesTestValue = FakeAccessibilityFeatures.allOn;
  tester.platformDispatcher.alwaysUse24HourFormatTestValue = false;
  tester.platformDispatcher.brieflyShowPasswordTestValue = true;
  tester.platformDispatcher.defaultRouteNameTestValue = '/test';
  tester.platformDispatcher.initialLifecycleStateTestValue = 'painting';
  tester.platformDispatcher.localesTestValue = <Locale>[const Locale('en-us'), const Locale('ar-jo')];
  tester.platformDispatcher.localeTestValue = const Locale('ar-jo');
  tester.platformDispatcher.nativeSpellCheckServiceDefinedTestValue = false;
  tester.platformDispatcher.platformBrightnessTestValue = Brightness.dark;
  tester.platformDispatcher.semanticsEnabledTestValue = true;
  tester.platformDispatcher.textScaleFactorTestValue = 2.0;
});
```

#### 重設平台專屬屬性

與設定屬性類似，重設平台專屬屬性主要是將 `binding.window` 存取器改為 `platformDispatcher` 存取器。

##### 重設個別屬性

遷移前的程式碼：

```dart
testWidgets('test name', (WidgetTester tester) async {
  addTeardown(tester.binding.window.clearAccessibilityFeaturesTestValue);
  addTeardown(tester.binding.window.clearAlwaysUse24HourFormatTestValue);
  addTeardown(tester.binding.window.clearBrieflyShowPasswordTestValue);
  addTeardown(tester.binding.window.clearDefaultRouteNameTestValue);
  addTeardown(tester.binding.window.clearInitialLifecycleStateTestValue);
  addTeardown(tester.binding.window.clearLocalesTestValue);
  addTeardown(tester.binding.window.clearLocaleTestValue);
  addTeardown(tester.binding.window.clearNativeSpellCheckServiceDefinedTestValue);
  addTeardown(tester.binding.window.clearPlatformBrightnessTestValue);
  addTeardown(tester.binding.window.clearSemanticsEnabledTestValue);
  addTeardown(tester.binding.window.clearTextScaleFactorTestValue);
});
```

遷移後的程式碼：

```dart
testWidgets('test name', (WidgetTester tester) async {
  addTeardown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);
  addTeardown(tester.platformDispatcher.clearAlwaysUse24HourFormatTestValue);
  addTeardown(tester.platformDispatcher.clearBrieflyShowPasswordTestValue);
  addTeardown(tester.platformDispatcher.clearDefaultRouteNameTestValue);
  addTeardown(tester.platformDispatcher.clearInitialLifecycleStateTestValue);
  addTeardown(tester.platformDispatcher.clearLocalesTestValue);
  addTeardown(tester.platformDispatcher.clearLocaleTestValue);
  addTeardown(tester.platformDispatcher.clearNativeSpellCheckServiceDefinedTestValue);
  addTeardown(tester.platformDispatcher.clearPlatformBrightnessTestValue);
  addTeardown(tester.platformDispatcher.clearSemanticsEnabledTestValue);
  addTeardown(tester.platformDispatcher.clearTextScaleFactorTestValue);
});
```

##### 一次重設所有屬性

遷移前的程式碼：

```dart
testWidgets('test name', (WidgetTester tester) async {
  addTeardown(tester.binding.window.clearAllTestValues);
});
```

遷移後的程式碼：

```dart
testWidgets('test name', (WidgetTester tester) async {
  addTeardown(tester.platformDispatcher.clearAllTestValues);
});
```

## 時程

合併於版本：3.9.0-13.0.pre.20<br>  
正式版釋出：3.10.0

## 參考資料

API 文件：

* [`View.of`][`View.of`]
* [`FlutterView`][`FlutterView`]
* [`PlatformDispatcher`][`PlatformDispatcher`]
* [`TestPlatformDispatcher`][`TestPlatformDispatcher`]
* [`TestFlutterView`][`TestFlutterView`]
* [`TestWidgetsFlutterBinding.window`][`TestWidgetsFlutterBinding.window`]

相關議題：

* [Issue 116929][Issue 116929]
* [Issue 117481][Issue 117481]
* [Issue 121915][Issue 121915]

相關 PR：

* [Deprecate SingletonFlutterWindow and global window singleton][Deprecate SingletonFlutterWindow and global window singleton]
* [Deprecate BindingBase.window][Deprecate BindingBase.window]
* [Deprecates `TestWindow`][Deprecates `TestWindow`]


[`View.of`]: {{site.api}}/flutter/widgets/View/of.html
[`FlutterView`]: {{site.api}}/flutter/dart-ui/FlutterView-class.html
[`PlatformDispatcher`]: {{site.api}}/flutter/dart-ui/PlatformDispatcher-class.html
[`TestPlatformDispatcher`]: {{site.api}}/flutter/flutter_test/TestPlatformDispatcher-class.html
[`TestFlutterView`]: {{site.api}}/flutter/flutter_test/TestFlutterView-class.html
[`TestWidgetsFlutterBinding.window`]: {{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding/window.html
[Issue 116929]: {{site.repo.flutter}}/issues/116929
[Issue 117481]: {{site.repo.flutter}}/issues/117481
[Issue 121915]: {{site.repo.flutter}}/issues/121915
[Deprecate SingletonFlutterWindow and global window singleton]: {{site.repo.engine}}/pull/39302
[Deprecate BindingBase.window]: {{site.repo.flutter}}/pull/120998
[Deprecates `TestWindow`]: {{site.repo.flutter}}/pull/122824
