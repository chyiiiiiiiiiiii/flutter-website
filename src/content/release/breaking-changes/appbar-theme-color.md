---
title: AppBar 主題色彩參數棄用
description: >-
  為了提升 API 一致性，AppBarTheme 與 AppBarThemeData 中的 color 參數已被棄用，請改用 backgroundColor。
---

{% render docs/breaking-changes.md %}

## 摘要

`color` 參數在 `AppBarTheme` 和 `AppBarThemeData` 的建構函式，以及它們的 `copyWith` 方法中已被棄用。請改用 `backgroundColor`。此變更會影響 AppBar 主題的設定方式，並可能在現有程式碼中產生棄用警告。

## 背景

AppBar 主題化（theming）系統中原本有兩個參數可控制相同屬性：`color` 和 `backgroundColor`。這種重複設計導致 API 混淆與不一致。為了提升清晰度與一致性，`color` 參數已被棄用，請改用 `backgroundColor`。

本次棄用影響以下類別與方法：

- `AppBarTheme` 建構函式
- `AppBarTheme.copyWith` 方法
- `AppBarThemeData` 建構函式
- `AppBarThemeData.copyWith` 方法

當你使用已棄用的 `color` 參數時，將會看到如下警告：

```txt
'color' is deprecated and shouldn't be used. Use backgroundColor instead.
This feature was deprecated after v3.33.0-0.2.pre.
```

這些類別同時包含了斷言檢查，以防止同時使用兩個參數：

```txt
The color and backgroundColor parameters mean the same thing. Only specify one.
```

## 遷移指南

請將所有在
`AppBarTheme` 和 `AppBarThemeData` 建構函式以及 `copyWith` 方法中使用的 `color` 參數，替換為 `backgroundColor`。

遷移前的程式碼：

```dart
// AppBarTheme constructor
AppBarTheme(
  color: Colors.blue,
  elevation: 4.0,
)

// AppBarTheme copyWith
theme.copyWith(
  color: Colors.red,
  elevation: 2.0,
)

// AppBarThemeData constructor
AppBarThemeData(
  color: Colors.green,
  elevation: 4.0,
)

// AppBarThemeData copyWith
themeData.copyWith(
  color: Colors.purple,
  elevation: 2.0,
)
```

遷移後的程式碼：

```dart
// AppBarTheme constructor
AppBarTheme(
  backgroundColor: Colors.blue,
  elevation: 4.0,
)

// AppBarTheme copyWith
theme.copyWith(
  backgroundColor: Colors.red,
  elevation: 2.0,
)

// AppBarThemeData constructor
AppBarThemeData(
  backgroundColor: Colors.green,
  elevation: 4.0,
)

// AppBarThemeData copyWith
themeData.copyWith(
  backgroundColor: Colors.purple,
  elevation: 2.0,
)
```

## 時程

合併於版本：3.33.0-0.2.pre<br>  
正式版本：3.35.4

## 參考資料

API 文件：

- [`AppBarTheme`](https://main-api.flutter.dev/flutter/material/AppBarTheme-class.html)
- [`AppBarThemeData`](https://main-api.flutter.dev/flutter/material/AppBarThemeData-class.html)

相關 PR：

- [AppBar theme color parameter deprecation #170624]({{site.github}}/flutter/flutter/pull/170624)
