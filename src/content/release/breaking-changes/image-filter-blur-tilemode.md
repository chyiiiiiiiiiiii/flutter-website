---
title: ImageFilter.blur 預設平鋪模式自動選擇
description: >-
  如果在建構函式中未指定平鋪模式，ImageFilter.blur 會根據渲染情境自動選擇平鋪模式。
---

{% render docs/breaking-changes.md %}

## 摘要

`ui.ImageFilter.blur` 的預設平鋪模式（tile mode）現在會由後端自動選擇。
過去，除非明確指定其他平鋪模式，否則會使用 `TileMode.clamp`。
現在，預設值為 `null`，代表自動選擇，除非明確指定特定的平鋪模式。

## 背景

`ImageFilter.blur` 的 _平鋪模式_（tile mode）決定了
套用濾鏡時邊緣像素的處理方式。
共有四種選項：

- `TileMode.clamp`（先前的預設值）
- `Tilemode.repeated`
- `TileMode.mirror`
- `TileMode.decal`

過去，如果未指定行為，
`ImageFilter` 會預設為 `clamp` 模式。
這有時會讓開發者感到意外，因為結果不一定符合預期。

自本次變更起，濾鏡會根據情境自動選擇下列平鋪模式：

* 在 save layers 以及套用於個別形狀繪製時（例如 `drawRect` 和 `drawPath`），使用 `decal`。
* 在 backdrop filters 時，使用 `mirror`。
* 用於 `drawImage` 時，使用 `clamp`。

## 遷移指南

只有未明確指定平鋪模式的模糊（blur）圖片濾鏡會受到此變更影響。

我們認為新的預設值通常會有更好的效果，因此建議移除任何已指定的模糊平鋪模式。

遷移前的程式碼：

```dart
final filter = ui.ImageFilter.blur(sigmaX: 4, sigmaY: 4, tileMode: TileMode.decal);
```

遷移後的程式碼：

```dart
final filter = ui.ImageFilter.blur(sigmaX: 4, sigmaY: 4);
```

## 時程

合併於版本：3.28.0-0.1.pre<br>  
正式版發佈：3.29

## 參考資料

API 文件：

* [`ImageFilter`][`ImageFilter`]
* [`TileMode`][`TileMode`]

相關議題：

* [Issue #154935][Issue #154935]
* [Issue #110318][Issue #110318]
* [Issue #157693][Issue #157693]

相關 PR：

* [Change default TileMode for blur ImageFilter objects to null][Change default TileMode for blur ImageFilter objects to null]

[`ImageFilter`]: {{site.api}}/flutter/dart-ui/ImageFilter-class.html
[`ImageFilter.blur`]: {{site.api}}/flutter/dart-ui/ImageFilter/ImageFilter.blur.html
[`TileMode`]: {{site.api}}/flutter/dart-ui/TileMode.html
[Issue #154935]: {{site.repo.flutter}}/issues/154935
[Issue #110318]: {{site.repo.flutter}}/issues/110318
[Issue #157693]: {{site.repo.flutter}}/issues/157693
[Change default TileMode for blur ImageFilter objects to null]: {{site.repo.engine}}/pull/55552
