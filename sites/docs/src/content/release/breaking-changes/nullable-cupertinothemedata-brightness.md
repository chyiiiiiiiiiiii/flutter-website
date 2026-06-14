---
title: 可為空的 CupertinoThemeData.brightness
description: >
  CupertinoThemeData.brightness 現在可為空，並且會如實回傳使用者指定的值（預設為 null）。
---

{% render "docs/breaking-changes.md" %}

## 摘要

[`CupertinoThemeData.brightness`] 現在可為空。

## 背景說明

[`CupertinoThemeData.brightness`][] 現在用於覆寫 Cupertino 元件 (Widget) 的 `MediaQuery.platformBrightness`。
在此變更之前，[`CupertinoThemeData.brightness`][]
getter 在被設為 null 時會回傳 `Brightness.light`。

## 變更說明

過去 [`CupertinoThemeData.brightness`][]
是以 getter 方式實作：

```dart
Brightness get brightness => _brightness ?? Brightness.light;
final Brightness _brightness;
```

它現在是一個儲存屬性：

```dart
final Brightness brightness;
```

## 遷移指南

一般來說，[`CupertinoThemeData.brightness`][]
在 Flutter 框架之外很少會用到。
若要取得 Cupertino 元件 (Widget) 的亮度設定，
現在請改用 [`CupertinoTheme.brightnessOf`][]。

隨著這項變更，現在可以在
`CupertinoThemeData` 的子類別中覆寫 `CupertinoThemeData.brightness`，
以變更亮度覆寫設定。例如：

```dart
class AlwaysDarkCupertinoThemeData extends CupertinoThemeData {
  Brightness brightness => Brightness.dark;
}
```

當 `CupertinoTheme` 使用上述 `CupertinoThemeData` 時，
所有受此 `CupertinoTheme` 影響的 Cupertino 元件 (Widget) 子孫都會啟用深色模式 (dark mode)。

## 時程

合併於版本：1.16.3<br>
穩定版發佈：1.17

## 參考資料

設計文件：

* [Make `CupertinoThemeData.brightness nullable`][]

API 文件：

* [`CupertinoThemeData.brightness`][]

相關議題：

* [Issue 47255][]

相關 PR：

* [Let material `ThemeData` dictate brightness if `cupertinoOverrideTheme.brightness` is null][]


[`CupertinoTheme.brightnessOf`]: {{site.api}}/flutter/cupertino/CupertinoTheme/brightnessOf.html
[`CupertinoThemeData.brightness`]: {{site.api}}/flutter/cupertino/NoDefaultCupertinoThemeData/brightness.html
[Issue 47255]: {{site.repo.flutter}}/issues/47255
[Let material `ThemeData` dictate brightness if `cupertinoOverrideTheme.brightness` is null]: {{site.repo.flutter}}/pull/47249
[Make `CupertinoThemeData.brightness nullable`]: /go/nullable-cupertinothemedata-brightness
