```markdown
---
title: FloatingActionButton 與 ThemeData 的 accent 屬性
description: >
  移除 FloatingActionButton 未文件化的
  ThemeData accentTextTheme 屬性使用，
  以及其對 accentIconTheme 的不必要依賴。
---

{% render docs/breaking-changes.md %}

## 摘要

移除了 Flutter 的 `FloatingActionButton`（FAB）對
`ThemeData` accent 屬性的依賴。

## 背景

這是 [Material Theme System Updates][Material Theme System Updates] 專案中的一個小部分。

過去，`ThemeData` [`accentIconTheme`] 屬性僅被
[`FloatingActionButton`][`FloatingActionButton`] 用來決定按鈕內文字或圖示的預設顏色。

`FloatingActionButton` 也會使用
`ThemeData accentTextTheme` 屬性，
但這個依賴既未文件化，也非必要。

這兩個依賴都容易造成混淆。
例如，若設定了 `Theme` 的 `accentIconTheme`
來改變所有浮動操作按鈕（FloatingActionButton）的外觀時，
很難知道還有什麼其他元件會受到影響，
或是未來可能會被影響。

[Material Design 規範][Material Design spec] 已不再包含「accent」色彩。
現在改用 `ColorScheme` 的 [secondary color][secondary color]。

以往，應用程式可以透過元件的 `foregroundColor` 屬性，
或 `FloatingActionButtonTheme` 的 `foregroundColor`，
來設定 `FloatingActionButtons` 內文字及圖示的顏色。
如果這兩個屬性都未指定，前景色會預設為 `accentIconTheme` 的顏色。

此變更後，預設行為會改為使用色彩方案（color scheme）的
`onSecondary` 色彩。

## 變更說明

過去，`accentIconTheme` 會為
`FloatingActionButton` 的 `foregroundColor` 屬性提供預設值：
```

```dart
    final Color foregroundColor = this.foregroundColor
      ?? floatingActionButtonTheme.foregroundColor
      ?? theme.accentIconTheme.color // To be removed.
      ?? theme.colorScheme.onSecondary;
```

如果應用程式透過設定其主題的 `accentIconTheme`，來有效地設定所有 floating action buttons 的 `foregroundColor`，那麼現在也可以透過設定主題的 `foregroundColor` 的 `floatingActionButtonTheme`，來達到相同的效果。

`FloatingActionButton` 的 `foregroundColor` 現在會用來設定由 `textStyle` 建立的 `RawMaterialButton` 的 `FloatingActionButton`。  
先前，這個文字樣式是根據 `ThemeData.accentTextTheme` 的按鈕樣式來設定的：

```dart
// theme.accentTextTheme becomes theme.textTheme
final TextStyle textStyle = theme.accentTextTheme.button.copyWith(
  color: foregroundColor,
  letterSpacing: 1.2,
);

```

除非應用程式有明確設定`accentTextTheme`來利用這個未公開的相依性，否則這裡使用`accentTextTheme`是沒有必要的。本次變更將這個`accentTextTheme`的用法替換為`textTheme`。

## 遷移指南

這項變更分為兩個步驟：

1. 如果`FloatingActionButton`的前景色（foreground）被設定為非預設顏色，現在會顯示警告。
2. 已移除`accentIconTheme`的相依性。如果你尚未這麼做，請依照下方範例模式遷移你的應用程式。

若要為所有 FAB 設定`FloatingActionButton`的`foregroundColor`，你可以設定主題的`floatingActionButtonTheme`，而不是設定`accentIconTheme`。

遷移前的程式碼：

```dart
MaterialApp(
  theme: ThemeData(
    accentIconTheme: IconThemeData(color: Colors.red),
  ),
)
```

遷移後的程式碼：

```dart
MaterialApp(
  theme: ThemeData(
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      foregroundColor: Colors.red,
    ),
  ),
)
```

## 時程

合併於版本：1.16.3<br>  
正式版釋出：1.17

## 參考資料

設計文件：

* [移除 FAB 對 Accent Theme 的依賴][Remove FAB Accent Theme Dependency]

API 文件：

* [`FloatingActionButton`][`FloatingActionButton`]
* [`ThemeData`][`ThemeData`]
* [`FloatingActionButtonThemeData`][`FloatingActionButtonThemeData`]

相關 PR：

* [第 1 步，共 2 步][Step 1 of 2] 警告 Flutter 的 FloatingActionButton 依賴 ThemeData 的 accent 屬性
* [第 2 步，共 2 步][Step 2 of 2] 移除 Flutter 的 FloatingActionButton 對 ThemeData accent 屬性的依賴

其他：

* [Material Theme System 更新][Material Theme System Updates]


[`accentIconTheme`]: {{site.api}}/flutter/material/ThemeData/accentIconTheme.html
[`FloatingActionButton`]: {{site.api}}/flutter/material/FloatingActionButton/foregroundColor.html
[`FloatingActionButtonThemeData`]: {{site.api}}/flutter/material/FloatingActionButtonThemeData-class.html
[Material Design spec]: {{site.material}}/styles/color
[Material Theme System Updates]: /go/material-theme-system-updates
[Remove FAB Accent Theme Dependency]: /go/remove-fab-accent-theme-dependency
[secondary color]: {{site.material}}/styles/color/the-color-system/color-roles#904230ec-ae73-4f0f-8bff-4024a036ca66
[Step 1 of 2]: {{site.repo.flutter}}/pull/48435
[Step 2 of 2]: {{site.repo.flutter}}/pull/46923
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData/floatingActionButtonTheme.html
