---
title: 讓 PageView.controller 可為 null
description: >-
  PageView.controller 現在可為 null。
---

{% render docs/breaking-changes.md %}

## 摘要

如果在建構函式中未提供 controller，則 `controller` 成員會是 `null`。這讓 `PageView` 及其 `controller` 屬性與其他元件（Widgets）保持一致。

## 遷移指南

變更前：

```dart
pageView.controller.page
```

之後：

```dart
pageView.controller!.page
```

## 時間軸

合併於版本：3.19.0-12.0.pre<br>  
進入穩定版：3.22.0

## 參考資料

相關議題：

* [PageView uses global controller, that is never disposed. (Issue 141119)][PageView uses global controller, that is never disposed. (Issue 141119)]

[PageView uses global controller, that is never disposed. (Issue 141119)]: {{site.repo.flutter}}/issues/141119
