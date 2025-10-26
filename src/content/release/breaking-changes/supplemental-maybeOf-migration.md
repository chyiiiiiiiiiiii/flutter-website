---
title: 將 `of` 遷移為非 nullable 回傳值，並新增 `maybeOf`
description: >
  為了消除 nullOk 參數，以提升 API 在 null safety 下的合理性
---

{% render docs/breaking-changes.md %}

## 摘要

本遷移指南說明如何將原本使用各種靜態 `of` 函式，從 context 取得資訊且回傳 nullable 值的程式碼，轉換為現在回傳非 nullable 值的寫法。

## 背景說明

Flutter 常見的設計模式是允許透過靜態成員函式來查找某些型別的元件（通常是 [`InheritedWidget`][`InheritedWidget`]，但也包含其他類型），這些函式通常命名為 `of`。

當 non-nullability（非空性）成為預設時，我們希望最常用的 API 能回傳非 nullable 的值。原因在於，呼叫 `Scrollable.of(context)` 後仍需加上 `!` 運算子或 `?` 並指定預設值，這樣的寫法顯得彆扭，且不符合 Dart 非 nullable 程式碼的慣例。

大部分相關遷移已在[先前的遷移][previous migration]中，移除了 `nullOk` 參數，但當時有些 `of` 方法遺漏未處理，之後又有部分方法新增時仍採用 nullable 回傳型態，這與我們一貫的設計模式不符。

在這次遷移中，受影響的 `of` 存取器被拆分為兩種呼叫方式：一種回傳非 nullable 值，若找不到目標值則會丟出例外（仍命名為 `of`）；另一種則回傳 nullable 值，若找不到則回傳 null，不會丟出例外（新方法命名為 `maybeOf`）。

## 變更說明

這次變更將這些靜態 `of` API 修改為回傳非 nullable 值。
若找不到對應值，現在會在 debug 模式下 assert，release 模式下則會丟出例外。

* [`AutofillGroup.of`]
* [`DefaultTabController.of`]
* [`DefaultTextHeightBehavior.of`]
* [`Form.of`]
* [`HeroControllerScope.of`]
* [`Material.of`]
* [`Overlay.of`]
* [`PageStorage.of`]
* [`PrimaryScrollController.of`]
* [`RenderAbstractViewport.of`]
* [`RestorationScope.of`]
* [`Scrollable.of`]
* [`ScrollNotificationObserver.of`]

同時也針對上述函式新增了新的靜態 `maybeOf` API，這些 API 會回傳 nullable 版本的值，若找不到則直接回傳 null，不會丟出任何例外。

* [`AutofillGroup.maybeOf`]
* [`DefaultTabController.maybeOf`]
* [`DefaultTextHeightBehavior.maybeOf`]
* [`Form.maybeOf`]
* [`HeroControllerScope.maybeOf`]
* [`Material.maybeOf`]
* [`Overlay.maybeOf`]
* [`PageStorage.maybeOf`]
* [`PrimaryScrollController.maybeOf`]
* [`RenderAbstractViewport.maybeOf`]
* [`RestorationScope.maybeOf`]
* [`Scrollable.maybeOf`]
* [`ScrollNotificationObserver.maybeOf`]

## 遷移指南

若要讓你的程式碼使用新版 API，請先將所有原本靜態 `of` 函式（當其 nullability 很重要時）改為使用 `maybeOf` 形式。

遷移前的程式碼：

```dart
ScrollController? controller = Scrollable.of(context);
```

遷移後的程式碼：

```dart
ScrollController? controller = Scrollable.maybeOf(context);
```

接著，針對程式碼中呼叫 `of` API 並接續使用驚嘆號的情境，只需移除驚嘆號：該方法現在已不會回傳可為 null 的值。

遷移前的程式碼：

```dart
ScrollController controller = Scrollable.of(context)!;
```

遷移後的程式碼：

```dart
ScrollController controller = Scrollable.of(context);
```

以下內容也可能對您有所幫助：

* [`unnecessary_non_null_assertion`][`unnecessary_non_null_assertion`] (linter message) 可協助找出應移除 `!` 運算子的地方
* [`unnecessary_null_checks`][`unnecessary_null_checks`] (analysis option) 可協助找出不需要 `?` 運算子的地方
* [`unnecessary_null_in_if_null_operators`][`unnecessary_null_in_if_null_operators`] 可協助找出不需要 `??` 運算子的地方
* [`unnecessary_nullable_for_final_variable_declarations`][`unnecessary_nullable_for_final_variable_declarations`] (analysis option)
  可協助尋找在 `final` 和 `const` 變數上多餘的問號運算子

## 時程

穩定版發佈於：3.7

## 參考資料

API 文件：

* [`Material.of`][`Material.of`]

相關 PR：

* [針對所有 `of` 會回傳 nullable 的情境新增 `maybeOf`][Add `maybeOf` for all the cases when `of` returns nullable]
* [新增 `Overlay.maybeOf`，讓 `Overlay.of` 回傳非 nullable 實例][Add `Overlay.maybeOf`, make `Overlay.of` return a non-nullable instance]

[previous migration]: /release/breaking-changes/eliminating-nullok-parameters
[`unnecessary_non_null_assertion`]: {{site.dart-site}}/tools/diagnostic-messages#unnecessary_non_null_assertion
[`unnecessary_null_checks`]: {{site.dart-site}}/tools/linter-rules#unnecessary_null_checks
[`unnecessary_null_in_if_null_operators`]: {{site.dart-site}}/tools/linter-rules#unnecessary_null_in_if_null_operators
[`unnecessary_nullable_for_final_variable_declarations`]: {{site.dart-site}}/tools/linter-rules#unnecessary_nullable_for_final_variable_declarations
[`AutofillGroup.maybeOf`]: {{site.api}}/flutter/widgets/AutofillGroup/maybeOf.html
[`AutofillGroup.of`]: {{site.api}}/flutter/widgets/AutofillGroup/of.html
[`DefaultTabController.maybeOf`]: {{site.api}}/flutter/material/DefaultTabController/maybeOf.html
[`DefaultTabController.of`]: {{site.api}}/flutter/material/DefaultTabController/of.html
[`DefaultTextHeightBehavior.maybeOf`]: {{site.api}}/flutter/widgets/DefaultTextHeightBehavior/maybeOf.html
[`DefaultTextHeightBehavior.of`]: {{site.api}}/flutter/widgets/DefaultTextHeightBehavior/of.html
[`Form.maybeOf`]: {{site.api}}/flutter/widgets/Form/maybeOf.html
[`Form.of`]: {{site.api}}/flutter/widgets/Form/of.html
[`HeroControllerScope.maybeOf`]: {{site.api}}/flutter/widgets/HeroControllerScope/maybeOf.html
[`HeroControllerScope.of`]: {{site.api}}/flutter/widgets/HeroControllerScope/of.html
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[`Material.maybeOf`]: {{site.api}}/flutter/material/Material/maybeOf.html
[`Material.of`]: {{site.api}}/flutter/material/Material/of.html
[`Overlay.maybeOf`]: {{site.api}}/flutter/widgets/Overlay/maybeOf.html
[`Overlay.of`]: {{site.api}}/flutter/widgets/Overlay/of.html
[`PageStorage.maybeOf`]: {{site.api}}/flutter/widgets/PageStorage/maybeOf.html
[`PageStorage.of`]: {{site.api}}/flutter/widgets/PageStorage/of.html
[`PrimaryScrollController.maybeOf`]: {{site.api}}/flutter/widgets/PrimaryScrollController/maybeOf.html
[`PrimaryScrollController.of`]: {{site.api}}/flutter/widgets/PrimaryScrollController/of.html
[`RenderAbstractViewport.maybeOf`]: {{site.api}}/flutter/rendering/RenderAbstractViewport/maybeOf.html
[`RenderAbstractViewport.of`]: {{site.api}}/flutter/rendering/RenderAbstractViewport/of.html
[`RestorationScope.maybeOf`]: {{site.api}}/flutter/widgets/RestorationScope/maybeOf.html
[`RestorationScope.of`]: {{site.api}}/flutter/widgets/RestorationScope/of.html
[`Scrollable.maybeOf`]: {{site.api}}/flutter/widgets/Scrollable/maybeOf.html
[`Scrollable.of`]: {{site.api}}/flutter/widgets/Scrollable/of.html
[`ScrollNotificationObserver.maybeOf`]: {{site.api}}/flutter/widgets/ScrollNotificationObserver/maybeOf.html
[`ScrollNotificationObserver.of`]: {{site.api}}/flutter/widgets/ScrollNotificationObserver/of.html
[Add `maybeOf` for all the cases when `of` returns nullable]: {{site.repo.flutter}}/pull/114120
[Add `Overlay.maybeOf`, make `Overlay.of` return a non-nullable instance]: {{site.repo.flutter}}/pull/110811
