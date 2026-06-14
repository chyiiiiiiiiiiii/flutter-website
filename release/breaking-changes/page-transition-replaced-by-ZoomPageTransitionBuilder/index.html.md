# 頁面轉場已由 ZoomPageTransitionsBuilder 取代

> 使用最新的頁面轉場取代舊版。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

為了確保函式庫遵循最新的 OEM 行為，現在所有平台（不包括 iOS 與 macOS）上的預設頁面轉場建構器，皆改為使用 `ZoomPageTransitionsBuilder`，而非 `FadeUpwardsPageTransitionsBuilder`。

## 背景說明

`FadeUpwardsPageTransitionsBuilder`（隨首個 Flutter 版本提供）定義了一種與 Android O 類似的頁面轉場。根據 Flutter 的[棄用政策](/release/compatibility-policy#deprecation-policy)，這個頁面轉場建構器未來將在 Android 上被棄用。

`ZoomPageTransitionsBuilder`，是 Android、Linux 和 Windows 的新頁面轉場建構器，其定義的頁面轉場與 Android Q 和 R 所提供的效果相似。

根據 [Flutter repo 風格指南][Style guide for Flutter repo]，框架將遵循最新的 OEM 行為。所有使用 `FadeUpwardsPageTransitionsBuilder` 的頁面轉場建構器皆已切換為 `ZoomPageTransitionsBuilder`。當目前的 `TargetPlatform` 在 `ThemeData.pageTransitionsTheme` 中未定義 `PageTransitionsBuilder` 時，則會以 `ZoomPageTransitionsBuilder` 作為預設值。

[Style guide for Flutter repo]: https://github.com/flutter/flutter/blob/main/docs/contributing/Style-guide-for-Flutter-repo.md
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

移轉後的程式碼：

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

如果你想要在所有平台上套用相同的頁面轉場建構器（page transition builder）：

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

### 測試移轉

如果你在使用新轉場時，嘗試尋找元件 (Widget) 但因 *Too many elements*（元素過多）而失敗，並看到類似以下的錯誤訊息：

```plaintext
══╡ EXCEPTION CAUGHT BY FLUTTER TEST FRAMEWORK ╞════════════════════════════════════════════════════
The following StateError was thrown running a test:
Bad state: Too many elements

When the exception was thrown, this was the stack:
#0      Iterable.single (dart:core/iterable.dart:656:24)
#1      WidgetController.widget (package:flutter_test/src/controller.dart:69:30)
#2      main.<anonymous closure> (file:///path/to/your/test.dart:1:2)
```

你應該透過在具有特定元件型別的 `Finder` 上使用 `descendant` 範圍，來移轉你的測試。以下是 `DataTable` 測試的範例：

移轉前的測試：

```dart
final Finder finder = find.widgetWithIcon(Transform, Icons.arrow_upward);
```

移轉後的測試：

```dart
final Finder finder = find.descendant(
  of: find.byType(DataTable),
  matching: find.widgetWithIcon(Transform, Icons.arrow_upward),
);
```

通常需要移轉 finder scope 的元件包括：
`Transform`、`FadeTransition`、`ScaleTransition` 和 `ColoredBox`。

## 時程

合併於版本：2.13.0-1.0.pre<br>
穩定版釋出：3.0.0

## 參考資料

API 文件：

* [`ZoomPageTransitionsBuilder`][]
* [`FadeUpwardsPageTransitionsBuilder`][]
* [`PageTransitionsTheme`][]

相關議題：

* [Issue 43277][]

相關 PR：

* [PR 100812][]

[`ZoomPageTransitionsBuilder`]: https://api.flutter.dev/flutter/material/ZoomPageTransitionsBuilder-class.html
[`FadeUpwardsPageTransitionsBuilder`]: https://api.flutter.dev/flutter/material/FadeUpwardsPageTransitionsBuilder-class.html
[`PageTransitionsTheme`]: https://api.flutter.dev/flutter/material/PageTransitionsTheme-class.html
[Issue 43277]: https://github.com/flutter/flutter/issues/43277
[PR 100812]: https://github.com/flutter/flutter/pull/100812

