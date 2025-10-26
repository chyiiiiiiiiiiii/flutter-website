---
title: v3.13 之後移除的已棄用 API
description: >-
  在達到生命週期終止（end of life）後，以下已棄用的 API
  已從 Flutter 中移除。
---

## 摘要

根據 Flutter 的[棄用政策（Deprecation Policy）][Deprecation Policy]，
在 3.13 穩定版發佈後，達到生命週期終止的已棄用 API
已被移除。

所有受影響的 API 已彙整於此主要來源，方便您進行遷移。
為了進一步協助您的遷移，請參考這份
[快速參考表][quick reference sheet]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-13

## 變更內容

本節依套件與受影響的類別列出相關棄用項目。

### Chip 類別的 useDeleteButtonTooltip

套件：flutter  
Flutter Fix 支援：是

以下類別的 `useDeleteButtonTooltip` 屬性自 v2.10 起已被棄用：

* `DeletableChipAttributes`
* `Chip`
* `RawChip`
* `InputChip`

`deleteButtonTooltipMessage` 取代了 `useDeleteButtonTooltip`。這項變更簡化了 API，因為在 `deleteButtonTooltipMessage` 傳入空字串即可達到將原本屬性 `useDeleteButtonTooltip` 設為 false 的相同效果。
當 `deleteButtonTooltipMessage` 未設定時，預設會使用
`MaterialLocalizations.deleteButtonTooltip`。

[Deprecate `useDeleteButtonTooltip` for Chips][Deprecate `useDeleteButtonTooltip` for Chips] 設計文件
更深入說明了此 Chip 與提示工具（tooltip）的更新內容。
如需詳細資訊，請參考 [chips and tooltips 遷移指南][chips and tooltips migration guide]。

[Deprecate `useDeleteButtonTooltip` for Chips]: https://docs.google.com/document/d/1wc9ot7T2E7hJubYxEWMX230a79wYSiFey4BHxnEzHtw/edit?usp=sharing&resourcekey=0-Bo7KPqEtkWgZcSuRCqwQ5w
[chips and tooltips migration guide]: /release/breaking-changes/chip-usedeletebuttontooltip-migration

**遷移指南**

遷移前的程式碼：

```dart
Chip(useDeleteButtonTooltip: false);
InputChip(useDeleteButtonTooltip: true);
RawChip rawChip = RawChip();
rawChip.useDeleteButtonTooltip;
```

遷移後的程式碼：

```dart
Chip(deleteButtonTooltipMessage: '');
InputChip();
RawChip rawChip = RawChip();
rawChip.deleteButtonTooltipMessage;
```

**參考資料**

API 文件：

* [`DeletableChipAttributes`][`DeletableChipAttributes`]
* [`Chip`][`Chip`]
* [`RawChip`][`RawChip`]
* [`InputChip`][`InputChip`]
* [`MaterialLocalizations.deleteButtonTooltip`][`MaterialLocalizations.deleteButtonTooltip`]

相關 PR：

* 在 [#96174][#96174] 標記為已淘汰（Deprecated）
* 在 [#134486][#134486] 移除

[`DeletableChipAttributes`]: {{site.api}}/flutter/material/DeletableChipAttributes-class.html
[`Chip`]: {{site.api}}/flutter/material/Chip-class.html
[`RawChip`]: {{site.api}}/flutter/material/RawChip-class.html
[`InputChip`]: {{site.api}}/flutter/material/InputChip-class.html
[`MaterialLocalizations.deleteButtonTooltip`]: {{site.api}}/flutter/material/MaterialLocalizations/deleteButtonTooltip.html

[#96174]: {{site.repo.flutter}}/pull/96174
[#134486]: {{site.repo.flutter}}/pull/134486

---

### MaterialButtonWithIconMixin

套件：flutter  
Flutter Fix 支援：否

`MaterialButtonWithIconMixin` 屬性自 v2.11 起已被標記為淘汰（deprecated）。

隨著新按鈕類別 `TextButton`、`OutlinedButton` 和 `ElevatedButton` 的引入，這個 mixin 已不再被使用。  
更早的版本已經移除了使用此 mixin 的舊按鈕類別。  
因此，這個 mixin 現在不會再影響任何可能混入它的類別。

**遷移指南**

遷移前的程式碼：

```dart
class MyButtonClass extends StatelessWidget with MaterialButtonWithIconMixin {
  // ...
}
```

遷移後的程式碼：

```dart
class MyButtonClass extends StatelessWidget {
  // ...
}
```

**參考資料**

相關的 PR：

* 在 [#99088][#99088] 中已棄用
* 在 [#133173][#133173] 中已移除

[#99088]: {{site.repo.flutter}}/pull/99088
[#133173]: {{site.repo.flutter}}/pull/133173

---

### PlatformsViewsService.synchronizeToNativeViewHierarchy

套件：flutter  
Flutter Fix 支援：否

`PlatformsViewsService` 的靜態方法 `synchronizeToNativeViewHierarchy`  
自 v2.11 起已被棄用。

在棄用期間，該方法成為無操作（no-op）函式，因為已不再需要呼叫來提升效能。  
應將對該方法的引用移除，這不會影響應用程式的運作。

**遷移指南**

遷移前的程式碼：

```dart
await PlatformsViewsService.synchronizeToNativeViewHierarchy(false);
````

遷移後的程式碼：

```dart
```

**參考資料**

API 文件：

* [`PlatformViewsService`][`PlatformViewsService`]

相關 PR：

* 在 [#100990][#100990] 中標記為已淘汰（Deprecated）
* 在 [#133175][#133175] 中移除

[`PlatformViewsService`]: {{site.api}}/flutter/services/PlatformViewsService-class.html

[#100990]: {{site.repo.flutter}}/pull/100990
[#133175]: {{site.repo.flutter}}/pull/133175

---

### TextSelectionOverlay.fadeDuration

套件：flutter  
支援 Flutter Fix：是

`TextSelectionOverlay` 的靜態 `fadeDuration` 屬性已於 v2.12 被標記為已淘汰（Deprecated）。

`SelectionOverlay.fadeDuration` 屬性取代了 `TextSelectionOverlay.fadeDuration`。  
隨著 `TextSelectionOverlay` 的重構，`SelectionOverlay` 被加入作為一個更通用的元件（Widget），不再特別依賴於 `RenderEditable`。

**遷移指南**

遷移前的程式碼：

```dart
TextSelectionOverlay.fadeDuration;
```

遷移後的程式碼：

```dart
SelectionOverlay.fadeDuration;
```

**參考資料**

API 文件：

* [`TextSelectionOverlay`][`TextSelectionOverlay`]
* [`SelectionOverlay`][`SelectionOverlay`]

相關 PR：

* 在 [#100381][#100381] 標記為已淘汰（Deprecated）
* 在 [#134485][#134485] 移除

[`TextSelectionOverlay`]: {{site.api}}/flutter/widgets/TextSelectionOverlay-class.html
[`SelectionOverlay`]: {{site.api}}/flutter/widgets/SelectionOverlay-class.html

[#100381]: {{site.repo.flutter}}/pull/100381
[#134485]: {{site.repo.flutter}}/pull/134485

---

### androidOverscrollIndicator

套件：flutter  
Flutter Fix 支援：否

下列類別的 `androidOverscrollIndicator` 屬性自 v2.13 起已被標記為已淘汰（Deprecated）：

* `ScrollBehavior`
* `MaterialScrollBehavior`
* `ThemeData`

此旗標最初是為了讓使用者能夠設定滾動元件（Scrolling Widgets）使用 `GlowingOverscrollIndicator` 或 `StretchingOvercrollIndicator`。
隨著框架對 Material 3 風格元件（Material 3-styled widgets）提供了更多支援，此旗標已被 `ThemeData.useMaterial3` 旗標取代。

由於 `ThemeData.useMaterial3` 預設為 `true`，因此預設會套用 `StretchingOverscrollIndicator`。
若將此值設為 `false`，則會改為套用 `GlowingOverscrollIndicator`。

另外，也可以覆寫 `ScrollBehavior` 的 `buildOverscrollIndicator` 方法或 `MaterialScrollBehavior`，以進一步自訂 Overscroll 指示器（overscroll indicators）的外觀。

**遷移指南**

遷移前的程式碼：

```dart
MaterialApp(
  scrollBehavior: MaterialScrollBehavior(
    androidOverscrollIndicator: AndroidOverscrollIndicator.glow,
  ),
  //...
);

MaterialApp(
  scrollBehavior: ScrollBehavior(
    androidOverscrollIndicator: AndroidOverscrollIndicator.glow,
  ),
  //...
);

MaterialApp(
  theme: Theme.light().copyWith(
    androidOverscrollIndicator: AndroidOverscrollIndicator.glow,
  ),
  //...
);
```

遷移後的程式碼：

```dart
MaterialApp(
  theme: Theme.light().copyWith(
    // defaults to true and stretching indicator,
    // false results in glowing indicator
    useMaterial3: false,
  ),
  //...
);
```

**參考資料**

API 文件：

* [`ScrollBehavior`][`ScrollBehavior`]
* [`MaterialScrollBehavior`][`MaterialScrollBehavior`]
* [`ThemeData`][`ThemeData`]
* [`GlowingOverscrollIndicator`][`GlowingOverscrollIndicator`]
* [`StretchingOverscrollIndicator`][`StretchingOverscrollIndicator`]

相關 PR：

* 已在 [#100234][#100234] 標記為已淘汰
* 已在 [#133181][#133181] 移除

[`ScrollBehavior`]: {{site.api}}/flutter/widgets/ScrollBehavior-class.html
[`MaterialScrollBehavior`]: {{site.api}}/flutter/material/MaterialScrollBehavior-class.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`GlowingOverscrollIndicator`]: {{site.api}}/flutter/widgets/GlowingOverscrollIndicator-class.html
[`StretchingOverscrollIndicator`]: {{site.api}}/flutter/widgets/StretchingOverscrollIndicator-class.html

[#100234]: {{site.repo.flutter}}/pull/100234
[#133181]: {{site.repo.flutter}}/pull/133181

---

### ImageProvider 與 PaintingBinding 的更新

套件：flutter  
支援 Flutter Fix：否

`PaintingBinding` 的 `instantiateImageCodec` 方法，以及 `ImageProvider` 的 `load` 方法與相關的 `DecoderCallback`，皆於 v2.13 被標記為已淘汰（deprecated）。

各自的替代方法如下：

| 已淘汰方法                             | 現行方法                                         |
|----------------------------------------|--------------------------------------------------|
| `PaintingBinding.instantiateImageCodec` | `PaintingBinding.instantiateImageCodecFromBuffer` |
| `ImageProvider.load`                    | `ImageProvider.loadBuffer`                        |
| `DecoderCallback`                       | `DecoderBufferCallback`                           |

此變更透過使用緩衝區（buffer），提升了圖片載入的效能。

**遷移指南**

遷移前的程式碼：

```dart
PaintingBinding.instance.instantiateImageCodec
```

遷移後的程式碼：

```dart
PaintingBinding.instance.instantiateImageCodecFromBuffer
```

**參考資料**

API 文件：

* [`PaintingBinding`][`PaintingBinding`]
* [`ImageProvider`][`ImageProvider`]
* [`DecoderBufferCallback`][`DecoderBufferCallback`]

相關 PR：

* 已在 [#103496][#103496] 標記為已淘汰（Deprecated）
* 已在 [#132679][#132679] 移除

[`PaintingBinding`]: {{site.api}}/flutter/painting/PaintingBinding-mixin.html
[`ImageProvider`]: {{site.api}}/flutter/painting/ImageProvider-class.html
[`DecoderBufferCallback`]: {{site.api}}/flutter/painting/DecoderBufferCallback.html

[#103496]: {{site.repo.flutter}}/pull/103496
[#132679]: {{site.repo.flutter}}/pull/132679

---

### TestWindow 屬性

套件：flutter_test  
Flutter Fix 支援：否

為了支援多視窗（multi-window），
許多 `TestWindow` 已淘汰的屬性已被移除。
雖然 `TestWindow` 已被標記為淘汰，但目前尚未符合移除條件。
現在遷移這些過期屬性，將有助於從 `TestWindow` 遷移。

以下屬性已被移除：

* `localeTestValue`
* `clearLocaleTestValue`
* `localesTestValue`
* `clearLocalesTestValue`
* `initialLifecycleStateTestValue`
* `textScaleFactorTestValue`
* `clearTextScaleFactorTestValue`
* `platformBrightnessTestValue`
* `clearPlatformBrightnessTestValue`
* `alwaysUse24HourFormatTestValue`
* `clearAlwaysUse24HourTestValue`
* `brieflyShowPasswordTestValue`
* `defaultRouteNameTestValue`
* `clearDefaultRouteNameTestValue`
* `semanticsEnabledTestValue`
* `clearSemanticsEnabledTestValue`
* `accessibilityFeaturesTestValue`
* `clearAccessibilityFeaturesTestValue`

若要進一步了解此 `TestWindow` 更新，請參閱  
[`TestWindow` 遷移指南][`TestWindow` migration guide]。

[`TestWindow` migration guide]: /release/breaking-changes/window-singleton

**遷移指南**

遷移前的程式碼：

```dart
testWidgets('My test', (WidgetTester tester) aysnc {
  // For all instances, replace window with platformDispatcher
  tester.binding.window.textScaleFactorTestValue = 42;
  addTearDown(tester.binding.window.clearTextScaleFactorTestValue);
  // ...
});
```

遷移後的程式碼：

```dart
testWidgets('My test', (WidgetTester tester) aysnc {
  // For all instances, replace window with platformDispatcher
  tester.binding.platformDispatcher.textScaleFactorTestValue = 42;
  addTearDown(tester.binding.platformDispatcher.clearTextScaleFactorTestValue);
  // ...
});
```

**參考資料**

API 文件：

* [`WidgetTester`][`WidgetTester`]
* [`TestWidgetsFlutterBinding`][`TestWidgetsFlutterBinding`]
* [`TestPlatformDispatcher`][`TestPlatformDispatcher`]

相關 PR：

* 已在 [#99443][#99443] 標記為已淘汰
* 已在 [#131098][#131098] 移除

[`WidgetTester`]: {{site.api}}/flutter/flutter_test/WidgetTester-class.html
[`TestWidgetsFlutterBinding`]: {{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding-class.html
[`TestPlatformDispatcher`]: {{site.api}}/flutter/flutter_test/TestPlatformDispatcher-class.html

[#99443]: {{site.repo.flutter}}/pull/99443
[#131098]: {{site.repo.flutter}}/pull/131098

---

## 時程

穩定版發佈：3.16
