---
title: 已棄用的 `cacheExtent` 與 `cacheExtentStyle`
description: >-
  `cacheExtent` 與 `cacheExtentStyle` 屬性已被棄用。
  它們由帶有 `ScrollCacheExtent` 物件的 `scrollCacheExtent` 取代。
---

{% render "docs/breaking-changes.md" %}

## 摘要

Flutter 3.44 在與捲動相關的元件 (Widget) 中棄用了 `cacheExtent` 與 `cacheExtentStyle`，
包括 `ListView`、`GridView`、`CustomScrollView` 和 `Viewport`，
以及其對應的渲染物件，例如 `RenderViewport`。
新的 `scrollCacheExtent` 屬性將值與快取策略（像素或視口）封裝於一處。

## 背景

過去，`cacheExtent` 是一個 `double`，
而 `cacheExtentStyle` 決定了該 `double` 的解讀方式
（可為像素或視口的比例）。
這種分開設定的方式使設定較難理解。

新的 `scrollCacheExtent` 屬性使用 `ScrollCacheExtent` 物件，
明確地將值與快取策略（像素或視口）封裝在一起，
從而提供型別安全性與更清晰的意圖。

## 遷移指南

### 元件層

#### `cacheExtent`（像素）

若您的程式碼使用預設以像素為單位的 `cacheExtent`，
請改用帶有 `ScrollCacheExtent.pixels` 的 `scrollCacheExtent`。

**之前：**

```dart
ListView(
  cacheExtent: 500.0,
  children: // ...
)
```

**之後：**

```dart
ListView(
  scrollCacheExtent: const ScrollCacheExtent.pixels(500.0),
  children: // ...
)
```

#### `cacheExtentStyle`（視口）

若您的程式碼在 `Viewport` 中搭配 `CacheExtentStyle.viewport` 使用 `cacheExtent`，
請改用帶有 `ScrollCacheExtent.viewport` 的 `scrollCacheExtent`。

**之前：**

```dart
Viewport(
  cacheExtent: 0.5,
  cacheExtentStyle: CacheExtentStyle.viewport,
  slivers: // ...
)
```

**之後：**

```dart
Viewport(
  scrollCacheExtent: const ScrollCacheExtent.viewport(0.5),
  slivers: // ...
)
```

### 渲染物件層

若您的程式碼直接在 `RenderViewport` 或類似的渲染物件上設定屬性，
請改用 `scrollCacheExtent`。

**之前：**

```dart
renderViewport.cacheExtent = 500.0;
renderViewport.cacheExtentStyle = CacheExtentStyle.pixel;
```

**之後：**

```dart
renderViewport.scrollCacheExtent = const ScrollCacheExtent.pixels(500.0);
```

## 時間表

登陸版本：3.41.0-0.0.pre<br>
穩定版本：3.44

## 參考資料

API 文件：

* [`ScrollCacheExtent`][]
* [`ScrollView.scrollCacheExtent`][]
* [`RenderViewportBase.scrollCacheExtent`][]

相關 PR：

* [Introduce ScrollCacheExtent][pr-181092]

[`ScrollCacheExtent`]: {{site.api}}/flutter/rendering/ScrollCacheExtent-class.html
[`ScrollView.scrollCacheExtent`]: {{site.api}}/flutter/widgets/ScrollView/scrollCacheExtent.html
[`RenderViewportBase.scrollCacheExtent`]: {{site.api}}/flutter/rendering/RenderViewportBase/scrollCacheExtent.html

[pr-181092]: {{site.repo.flutter}}/pull/181092
