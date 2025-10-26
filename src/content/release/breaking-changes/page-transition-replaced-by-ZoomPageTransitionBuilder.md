---
title: 頁面轉場已由 ZoomPageTransitionsBuilder 取代
description: 使用最新的頁面轉場取代舊版。
---

{% render docs/breaking-changes.md %}

## 摘要

為了確保函式庫遵循最新的 OEM 行為，現在所有平台（不包括 iOS 與 macOS）上的預設頁面轉場建構器，皆改為使用 `ZoomPageTransitionsBuilder`，而非 `FadeUpwardsPageTransitionsBuilder`。

## 背景說明

`FadeUpwardsPageTransitionsBuilder`（隨首個 Flutter 版本提供）定義了一種與 Android O 類似的頁面轉場。根據 Flutter 的[棄用政策](/release/compatibility-policy#deprecation-policy)，這個頁面轉場建構器未來將在 Android 上被棄用。

`ZoomPageTransitionsBuilder`，是 Android、Linux 和 Windows 的新頁面轉場建構器，其定義的頁面轉場與 Android Q 和 R 所提供的效果相似。

根據 [Flutter repo 風格指南][Style guide for Flutter repo]，框架將遵循最新的 OEM 行為。所有使用 `FadeUpwardsPageTransitionsBuilder` 的頁面轉場建構器皆已切換為 `ZoomPageTransitionsBuilder`。當目前的 `TargetPlatform` 在 `ThemeData.pageTransitionsTheme` 中未定義 `PageTransitionsBuilder` 時，則會以 `ZoomPageTransitionsBuilder` 作為預設值。

[Style guide for Flutter repo]: {{site.repo.flutter}}/blob/main/docs/contributing/Style-guide-for-Flutter-repo.md
## 變更說明

`PageTransitionsTheme._defaultBuilders` 中所定義的 `PageTransitionsBuilder`，針對 `TargetPlatform.android`、`TargetPlatform.linux` 以及 `TargetPlatform.windows`，已由 `FadeUpwardsPageTransitionsBuilder` 改為 `ZoomPageTransitionsBuilder`。

## 移轉指南

如果你希望切換回先前的頁面轉場建構器（`FadeUpwardsPageTransitionsBuilder`），請明確為目標平台定義建構器。

移轉前的程式碼：

```dart
MaterialApp(
  theme: ThemeData(colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple)),
)
```

遷移後的程式碼：

```dart
MaterialApp(
  theme: ThemeData(
    pageTransitionsTheme: const PageTransitionsTheme(
      builders: <TargetPlatform, PageTransitionsBuilder>{
        TargetPlatform.android: FadeUpwardsPageTransitionsBuilder(), // Apply this to every platforms you need.
      },
    ),
  ),
)
```

如果你想要在所有平台上套用相同的 page transition builder（頁面轉場建構器）：

```dart
MaterialApp(
  theme: ThemeData(
    pageTransitionsTheme: PageTransitionsTheme(
      builders: Map<TargetPlatform, PageTransitionsBuilder>.fromIterable(
        TargetPlatform.values,
        value: (dynamic _) => const FadeUpwardsPageTransitionsBuilder(),
      ),
    ),
  ),
)

```

### 測試遷移

如果你在使用新轉場時，嘗試尋找元件（Widgets）但因 *Too many elements*（元素過多）而失敗，並看到類似以下的錯誤訊息：

```plaintext
══╡ EXCEPTION CAUGHT BY FLUTTER TEST FRAMEWORK ╞════════════════════════════════════════════════════
The following StateError was thrown running a test:
Bad state: Too many elements

When the exception was thrown, this was the stack:
#0      Iterable.single (dart:core/iterable.dart:656:24)
#1      WidgetController.widget (package:flutter_test/src/controller.dart:69:30)
#2      main.<anonymous closure> (file:///path/to/your/test.dart:1:2)
```

你應該透過在具有特定元件（Widget）型別的`Finder`上，使用`descendant`範圍來遷移你的測試。
以下是`DataTable`測試的範例：

遷移前的測試：

```dart
final Finder finder = find.widgetWithIcon(Transform, Icons.arrow_upward);
```

遷移後測試：

```dart
final Finder finder = find.descendant(
  of: find.byType(DataTable),
  matching: find.widgetWithIcon(Transform, Icons.arrow_upward),
);
```

通常需要遷移 finder scope 的元件（Widgets）包括：
`Transform`、`FadeTransition`、`ScaleTransition` 和 `ColoredBox`。

## 時程

合併於版本：2.13.0-1.0.pre<br>  
穩定版釋出：3.0.0

## 參考資料

API 文件：

* [`ZoomPageTransitionsBuilder`][`ZoomPageTransitionsBuilder`]
* [`FadeUpwardsPageTransitionsBuilder`][`FadeUpwardsPageTransitionsBuilder`]
* [`PageTransitionsTheme`][`PageTransitionsTheme`]

相關議題：

* [Issue 43277][Issue 43277]

相關 PR：

* [PR 100812][PR 100812]

[`ZoomPageTransitionsBuilder`]: {{site.api}}/flutter/material/ZoomPageTransitionsBuilder-class.html
[`FadeUpwardsPageTransitionsBuilder`]: {{site.api}}/flutter/material/FadeUpwardsPageTransitionsBuilder-class.html
[`PageTransitionsTheme`]: {{site.api}}/flutter/material/PageTransitionsTheme-class.html
[Issue 43277]: {{site.repo.flutter}}/issues/43277
[PR 100812]: {{site.repo.flutter}}/pull/100812
