---
title: 更新的 Material 3 進度指示器
description: >-
  `LinearProgressIndicator` 和 `CircularProgressIndicator` 元件（Widgets）
  已更新以符合 Material 3 Design 規範。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`LinearProgressIndicator` 和 `CircularProgressIndicator`
已更新以符合 Material 3 Design 規範。

`LinearProgressIndicator` 的變更包含主動與非主動軌道之間的間隙、停止指示器，以及圓角設計。
`CircularProgressIndicator` 的變更包含主動與非主動軌道之間的間隙，以及圓角的描邊端點。

## 背景說明

Material 3 Design 規範針對 `LinearProgressIndicator` 和
`CircularProgressIndicator` 已於 2023 年 12 月進行更新。

若要選擇使用 2024 年的設計規範，
請將 `LinearProgressIndicator.year2023` 和
`CircularProgressIndicator.year2023` 旗標設為 `false`。
這麼做是為了確保現有應用程式不會受到
更新後設計規範的影響。

## 變更說明

`LinearProgressIndicator` 和 `CircularProgressIndicator` 元件 (Widget) 各自
都有一個 `year2023` 旗標，可設為 `false` 以
選擇使用更新後的設計規範。
`year2023` 旗標的預設值為 `true`，這表示
進度指示器會使用 2023 年的設計規範。

當 [`LinearProgressIndicator.year2023`][] 設為 `false` 時，
進度指示器會在主動與非主動軌道之間顯示間隙，
並有停止指示器與圓角設計。
如果 `LinearProgressIndicator` 為不確定狀態（indeterminate），
則不會顯示停止指示器。

當 [`CircularProgressIndicator.year2023`][] 設為 `false` 時，
進度指示器會有軌道間隙與圓角的描邊端點。

## 遷移指南

若要讓 `LinearProgressIndicator` 選擇使用更新後的設計規範，
請將 `year2023` 旗標設為 `false`：

```dart highlightLines=2
LinearProgressIndicator(
  year2023: false,
  value: 0.5,
),
```

若要將整個應用程式更新為使用新版的 `LinearProgressIndicator` 設計，請在您的 `MaterialApp` 中，將 `ProgressIndicatorThemeData.year2023` 屬性設為 `false`：

```dart highlightLines=2
return MaterialApp(
  theme: ThemeData(progressIndicatorTheme: const ProgressIndicatorThemeData(year2023: false)),
        // ...
        LinearProgressIndicator(
          year2023: false,
          value: 0.5,
        ),
        // ...
```

若要讓 `CircularProgressIndicator` 選擇使用更新後的設計規範，
請將 `year2023` 旗標設為 `false`：

```dart highlightLines=2
CircularProgressIndicator(
  year2023: false,
  value: 0.5,
),
```

若要將整個應用程式更新為使用新版的 `CircularProgressIndicator` 設計，請在您的 `MaterialApp` 中，將 `ProgressIndicatorThemeData.year2023` 屬性設為 `false`：

```dart highlightLines=2
return MaterialApp(
  theme: ThemeData(progressIndicatorTheme: const ProgressIndicatorThemeData(year2023: false)),
        // ...
        CircularProgressIndicator(
          year2023: false,
          value: 0.5,
        ),
        // ...
```

## 時程

合併於版本：3.28.0-0.1.pre<br>
正式版本：3.29

## 參考資料

API 文件：

- [`LinearProgressIndicator`][]
- [`CircularProgressIndicator`][]
- [`LinearProgressIndicator.year2023`][]
- [`CircularProgressIndicator.year2023`][]

相關議題：

- [為 Material 3 重新設計更新 `ProgressIndicator`][Update both `ProgressIndicator` for Material 3 redesign]

相關 PR：

- [為新視覺風格更新 Material 3 `LinearProgressIndicator`][Update Material 3 `LinearProgressIndicator` for new visual style]
- [為新視覺風格更新 Material 3 `CircularProgressIndicator`][Update Material 3 `CircularProgressIndicator` for new visual style]

[`LinearProgressIndicator`]: {{site.main-api}}/flutter/material/LinearProgressIndicator-class.html
[`CircularProgressIndicator`]: {{site.main-api}}/flutter/material/CircularProgressIndicator-class.html
[`LinearProgressIndicator.year2023`]: {{site.main-api}}/flutter/material/LinearProgressIndicator/year2023.html
[`CircularProgressIndicator.year2023`]: {{site.main-api}}/flutter/material/CircularProgressIndicator/year2023.html
[Update both `ProgressIndicator` for Material 3 redesign]: {{site.repo.flutter}}/issues/141340
[Update Material 3 `LinearProgressIndicator` for new visual style]: {{site.repo.flutter}}/pull/154817
[Update Material 3 `CircularProgressIndicator` for new visual style]: {{site.repo.flutter}}/pull/158104
