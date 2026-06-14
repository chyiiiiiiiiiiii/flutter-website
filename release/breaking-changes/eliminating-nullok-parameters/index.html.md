# 移除 nullOk 參數

> 為了提升 API 在 null safety 環境下的清晰度，移除 nullOk 參數。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

本遷移指南說明如何將使用多個 `of` 靜態存取器及相關存取器上的 `nullOk`
參數的程式碼，轉換為使用回傳可為 null 的替代 API。

## 背景

Flutter 常見的一種模式，是允許透過靜態成員函式來查找某些類型的元件 (Widget)
（[`InheritedWidget`][]s），這些函式通常命名為 `of`，並接受一個 `BuildContext`。

在 non-nullability（非空性）尚未成為預設之前，這些 API 提供一個切換開關，能夠在元件樹中找不到該元件時，選擇是拋出例外還是回傳 null。這樣的設計很實用，也不會造成混淆，因為當時每個變數都可以是 nullable。

當 non-nullability 成為預設後，讓最常用的 API 回傳 non-nullable 值就變得更理想。因為如果呼叫 `MediaQuery.of(context, nullOk: false)` 後，仍然需要加上 `!` 運算子，或是 `?` 並加上備用值，這樣的寫法顯得不自然。

`nullOk` 參數原本是一種簡便的 null safety 切換方式，但隨著語言本身支援 non-nullability，這個參數就變得多餘，甚至可能給開發者帶來矛盾的訊號。

為了解決這個問題，`of` 存取器（以及其他也使用 `nullOk` 的相關存取器）被拆分為兩種呼叫方式：一種回傳 non-nullable 值，若找不到目標元件則拋出例外；另一種則回傳可為 null 的值，不會拋出例外，找不到元件時回傳 null。

本變更的設計文件請參考 [Eliminating nullOk parameters][]。

[Eliminating nullOk parameters]: /go/eliminating-nullok-parameters

## 變更說明

實際的變更是將這些 API 移除 `nullOk` 參數，並改為回傳 non-nullable 值：

* [`MediaQuery.of`][]
* [`Navigator.of`][]
* [`ScaffoldMessenger.of`][]
* [`Scaffold.of`][]
* [`Router.of`][]
* [`Localizations.localeOf`][]
* [`FocusTraversalOrder.of`][]
* [`FocusTraversalGroup.of`][]
* [`Focus.of`][]
* `Shortcuts.of`
* [`Actions.handler`][]
* [`Actions.find`][]
* [`Actions.invoke`][]
* [`AnimatedList.of`][]
* [`SliverAnimatedList.of`][]
* [`CupertinoDynamicColor.resolve`][]
* [`CupertinoDynamicColor.resolveFrom`][]
* [`CupertinoUserInterfaceLevel.of`][]
* [`CupertinoTheme.brightnessOf`][]
* [`CupertinoThemeData.resolveFrom`][]
* [`NoDefaultCupertinoThemeData.resolveFrom`][]
* [`CupertinoTextThemeData.resolveFrom`][]
* [`MaterialBasedCupertinoThemeData.resolveFrom`][]

並同時新增以下這些 API，讓其回傳可為 null 的值：

* [`MediaQuery.maybeOf`][]
* [`Navigator.maybeOf`][]
* [`ScaffoldMessenger.maybeOf`][]
* [`Scaffold.maybeOf`][]
* [`Router.maybeOf`][]
* [`Localizations.maybeLocaleOf`][]
* [`FocusTraversalOrder.maybeOf`][]
* [`FocusTraversalGroup.maybeOf`][]
* [`Focus.maybeOf`][]
* `Shortcuts.maybeOf`
* [`Actions.maybeFind`][]
* [`Actions.maybeInvoke`][]
* [`AnimatedList.maybeOf`][]
* [`SliverAnimatedList.maybeOf`][]
* [`CupertinoDynamicColor.maybeResolve`][]
* [`CupertinoUserInterfaceLevel.maybeOf`][]
* [`CupertinoTheme.maybeBrightnessOf`][]

## 遷移指南

為了讓你的程式碼改用新的 API 形式，請將所有帶有 `nullOk = true` 參數的呼叫，
改為使用 `maybe` 形式的 API。

也就是說，原本這樣的寫法：

```dart
MediaQueryData? data = MediaQuery.of(context, nullOk: true);
```

變更為：

```dart
MediaQueryData? data = MediaQuery.maybeOf(context);
```

你也需要修改所有使用 `nullOk =
false`（通常為預設值）呼叫 API 的情境，以接受不可為 null 的回傳值，或移除任何
`!` 運算子：

所以可以選擇以下任一方式：

```dart
MediaQueryData data = MediaQuery.of(context)!; // nullOk false by default.
MediaQueryData? data = MediaQuery.of(context); // nullOk false by default.
```

兩者都變成：

```dart
MediaQueryData data = MediaQuery.of(context); // No ! or ? operator here now.
```

`unnecessary_non_null_assertion` 分析選項在尋找應移除 `!` 運算子的地方時非常有幫助，而 `unnecessary_nullable_for_final_variable_declarations` 分析選項則有助於找出在 `final` 和 `const` 變數上不必要的問號運算子。

## 時程表

合併於版本：1.24.0<br>
正式版釋出：2.0.0

## 參考資料

API 文件：

* [`MediaQuery.of`][]
* [`Navigator.of`][]
* [`ScaffoldMessenger.of`][]
* [`Scaffold.of`][]
* [`Router.of`][]
* [`Localizations.localeOf`][]
* [`FocusTraversalOrder.of`][]
* [`FocusTraversalGroup.of`][]
* [`Focus.of`][]
* `Shortcuts.of`
* [`Actions.handler`][]
* [`Actions.find`][]
* [`Actions.invoke`][]
* [`AnimatedList.of`][]
* [`SliverAnimatedList.of`][]
* [`CupertinoDynamicColor.resolve`][]
* [`CupertinoDynamicColor.resolveFrom`][]
* [`CupertinoUserInterfaceLevel.of`][]
* [`CupertinoTheme.brightnessOf`][]
* [`CupertinoThemeData.resolveFrom`][]
* [`NoDefaultCupertinoThemeData.resolveFrom`][]
* [`CupertinoTextThemeData.resolveFrom`][]
* [`MaterialBasedCupertinoThemeData.resolveFrom`][]
* [`MediaQuery.maybeOf`][]
* [`Navigator.maybeOf`][]
* [`ScaffoldMessenger.maybeOf`][]
* [`Scaffold.maybeOf`][]
* [`Router.maybeOf`][]
* [`Localizations.maybeLocaleOf`][]
* [`FocusTraversalOrder.maybeOf`][]
* [`FocusTraversalGroup.maybeOf`][]
* [`Focus.maybeOf`][]
* `Shortcuts.maybeOf`
* [`Actions.maybeFind`][]
* [`Actions.maybeInvoke`][]
* [`AnimatedList.maybeOf`][]
* [`SliverAnimatedList.maybeOf`][]
* [`CupertinoDynamicColor.maybeResolve`][]
* [`CupertinoUserInterfaceLevel.maybeOf`][]
* [`CupertinoTheme.maybeBrightnessOf`][]

相關議題：

* [Issue 68637][]

相關 PR：

* [Remove `nullOk` in `MediaQuery.of`][]
* [Remove `nullOk` in `Navigator.of`][]
* [Remove `nullOk` parameter from `AnimatedList.of` and `SliverAnimatedList.of`][]
* [Remove `nullOk` parameter from `Shortcuts.of`, `Actions.find`, and `Actions.handler`][]
* [Remove `nullOk` parameter from `Focus.of`, `FocusTraversalOrder.of`, and `FocusTraversalGroup.of`][]
* [Remove `nullOk` parameter from `Localizations.localeOf`][]
* [Remove `nullOk` parameter from `Router.of`][]
* [Remove `nullOk` from `Scaffold.of` and `ScaffoldMessenger.of`][]
* [Remove `nullOk` parameter from Cupertino color resolution APIs][]
* [Remove vestigial `nullOk` parameter from `Localizations.localeOf`][]
* [Remove `nullOk` from `Actions.invoke`, add `Actions.maybeInvoke`][]

[`MediaQuery.of`]: https://api.flutter.dev/flutter/widgets/MediaQuery/of.html
[`Navigator.of`]: https://api.flutter.dev/flutter/widgets/Navigator/of.html
[`ScaffoldMessenger.of`]: https://api.flutter.dev/flutter/material/ScaffoldMessenger/of.html
[`Scaffold.of`]: https://api.flutter.dev/flutter/material/Scaffold/of.html
[`Router.of`]: https://api.flutter.dev/flutter/widgets/Router/of.html
[`Localizations.localeOf`]: https://api.flutter.dev/flutter/widgets/Localizations/localeOf.html
[`FocusTraversalOrder.of`]: https://api.flutter.dev/flutter/widgets/FocusTraversalOrder/of.html
[`FocusTraversalGroup.of`]: https://api.flutter.dev/flutter/widgets/FocusTraversalGroup/of.html
[`Focus.of`]: https://api.flutter.dev/flutter/widgets/Focus/of.html
[`Actions.handler`]: https://api.flutter.dev/flutter/widgets/Actions/handler.html
[`Actions.find`]: https://api.flutter.dev/flutter/widgets/Actions/find.html
[`Actions.invoke`]: https://api.flutter.dev/flutter/widgets/Actions/invoke.html
[`AnimatedList.of`]: https://api.flutter.dev/flutter/widgets/AnimatedList/of.html
[`SliverAnimatedList.of`]: https://api.flutter.dev/flutter/widgets/SliverAnimatedList/of.html
[`CupertinoDynamicColor.resolve`]: https://api.flutter.dev/flutter/cupertino/CupertinoDynamicColor/resolve.html
[`CupertinoDynamicColor.resolveFrom`]: https://api.flutter.dev/flutter/cupertino/CupertinoDynamicColor/resolveFrom.html
[`CupertinoUserInterfaceLevel.of`]: https://api.flutter.dev/flutter/cupertino/CupertinoUserInterfaceLevel/of.html
[`CupertinoTheme.brightnessOf`]: https://api.flutter.dev/flutter/cupertino/CupertinoTheme/brightnessOf.html
[`CupertinoThemeData.resolveFrom`]: https://api.flutter.dev/flutter/cupertino/CupertinoThemeData/resolveFrom.html
[`NoDefaultCupertinoThemeData.resolveFrom`]: https://api.flutter.dev/flutter/cupertino/NoDefaultCupertinoThemeData/resolveFrom.html
[`CupertinoTextThemeData.resolveFrom`]: https://api.flutter.dev/flutter/cupertino/CupertinoTextThemeData/resolveFrom.html
[`MaterialBasedCupertinoThemeData.resolveFrom`]: https://api.flutter.dev/flutter/material/MaterialBasedCupertinoThemeData/resolveFrom.html
[`MediaQuery.maybeOf`]: https://api.flutter.dev/flutter/widgets/MediaQuery/maybeOf.html
[`Navigator.maybeOf`]: https://api.flutter.dev/flutter/widgets/Navigator/maybeOf.html
[`ScaffoldMessenger.maybeOf`]: https://api.flutter.dev/flutter/material/ScaffoldMessenger/maybeOf.html
[`Scaffold.maybeOf`]: https://api.flutter.dev/flutter/material/Scaffold/maybeOf.html
[`Router.maybeOf`]: https://api.flutter.dev/flutter/widgets/Router/maybeOf.html
[`Localizations.maybeLocaleOf`]: https://api.flutter.dev/flutter/widgets/Localizations/maybeLocaleOf.html
[`FocusTraversalOrder.maybeOf`]: https://api.flutter.dev/flutter/widgets/FocusTraversalOrder/maybeOf.html
[`FocusTraversalGroup.maybeOf`]: https://api.flutter.dev/flutter/widgets/FocusTraversalGroup/maybeOf.html
[`Focus.maybeOf`]: https://api.flutter.dev/flutter/widgets/Focus/maybeOf.html
[`Actions.maybeFind`]: https://api.flutter.dev/flutter/widgets/Actions/maybeFind.html
[`Actions.maybeInvoke`]: https://api.flutter.dev/flutter/widgets/Actions/maybeInvoke.html
[`AnimatedList.maybeOf`]: https://api.flutter.dev/flutter/widgets/AnimatedList/maybeOf.html
[`SliverAnimatedList.maybeOf`]: https://api.flutter.dev/flutter/widgets/SliverAnimatedList/maybeOf.html
[`CupertinoDynamicColor.maybeResolve`]: https://api.flutter.dev/flutter/cupertino/CupertinoDynamicColor/maybeResolve.html
[`CupertinoUserInterfaceLevel.maybeOf`]: https://api.flutter.dev/flutter/cupertino/CupertinoUserInterfaceLevel/maybeOf.html
[`CupertinoTheme.maybeBrightnessOf`]: https://api.flutter.dev/flutter/cupertino/CupertinoTheme/maybeBrightnessOf.html
[`InheritedWidget`]: https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html
[Issue 68637]: https://github.com/flutter/flutter/issues/68637
[Remove `nullOk` in `MediaQuery.of`]: https://github.com/flutter/flutter/pull/68736
[Remove `nullOk` in `Navigator.of`]: https://github.com/flutter/flutter/pull/70726
[Remove `nullOk` parameter from `AnimatedList.of` and `SliverAnimatedList.of`]: https://github.com/flutter/flutter/pull/68925
[Remove `nullOk` parameter from `Shortcuts.of`, `Actions.find`, and `Actions.handler`]: https://github.com/flutter/flutter/pull/68921
[Remove `nullOk` parameter from `Focus.of`, `FocusTraversalOrder.of`, and `FocusTraversalGroup.of`]: https://github.com/flutter/flutter/pull/68917
[Remove `nullOk` parameter from `Localizations.localeOf`]: https://github.com/flutter/flutter/pull/68911
[Remove `nullOk` parameter from `Router.of`]: https://github.com/flutter/flutter/pull/68910
[Remove `nullOk` from `Scaffold.of` and `ScaffoldMessenger.of`]: https://github.com/flutter/flutter/pull/68908
[Remove `nullOk` parameter from Cupertino color resolution APIs]: https://github.com/flutter/flutter/pull/68905
[Remove vestigial `nullOk` parameter from `Localizations.localeOf`]: https://github.com/flutter/flutter/pull/74657
[Remove `nullOk` from `Actions.invoke`, add `Actions.maybeInvoke`]: https://github.com/flutter/flutter/pull/74680

