---
title: Web 支援 viewport-fit=cover 的 SafeArea
description: >-
  Flutter web 現在會遵循 index.html 中的 viewport-fit=cover，
  並以 CSS env(safe-area-inset-*) 的值填入 FlutterView.viewPadding。
---

{% render "docs/breaking-changes.md" %}

## 摘要

Flutter web 現在會遵循你在 `web/index.html` 的
`<meta name="viewport">` 標籤中設定的 `viewport-fit=cover`，
並以瀏覽器的 CSS `env(safe-area-inset-*)` 值填入
[`FlutterView.viewPadding`][]、[`MediaQuery.paddingOf`][] 與
[`SafeArea`][]。

如果既有的 web 應用程式已在 `web/index.html` 中加入 `viewport-fit=cover`，
現在它會以邊到邊 (edge-to-edge) 的方式渲染在行動裝置的挖孔、瀏海與
首頁指示條 (home indicator) 後方，
而不是像以前那樣被 web 引擎移除 `viewport-fit=cover`。

## 背景

過去在全頁模式 (full-page mode) 初始化時，Flutter web 引擎會將
`web/index.html` 中任何 `<meta name="viewport">` 標籤，
替換成一個不含 `viewport-fit=cover` 的預設 viewport 標籤，
並且一律將 [`FlutterView.viewPadding`][] 回報為 `ViewPadding.zero`。

為了讓行動版 web 應用程式能在有螢幕挖孔與瀏海的裝置上以邊到邊方式渲染，
Flutter web 現在會在替換之前，先檢查 `web/index.html` 中的
`<meta name="viewport">` 標籤：

* 若**未**設定 `viewport-fit=cover`（預設），Flutter web 會在瀏覽器的
  安全區域 (safe area) 內渲染（`viewport-fit=contain`），
  並回報 `ViewPadding.zero`。
* 若在 `web/index.html` 中**有**設定 `viewport-fit=cover`，Flutter web 會在
  作用中的 `<meta name="viewport" flt-viewport>` 標籤上保留
  `viewport-fit=cover`。接著它會量測瀏覽器的 CSS
  `env(safe-area-inset-*)` 值，並透過
  [`FlutterView.viewPadding`][]、[`MediaQuery.paddingOf`][] 與
  [`SafeArea`][] 提供這些值。

## 遷移指南

只有在你現有的 `web/index.html` 檔案已於 `<meta name="viewport">` 標籤中
指定 `viewport-fit=cover` 時，才會**受到影響**。

### 選項 1：維持邊到邊渲染，並以 `SafeArea` 包住 UI

如果你希望 web 應用程式以邊到邊方式渲染在瀏海與首頁指示條後方，
請將互動式內容包在 [`SafeArea`][] 元件 (Widget) 中（或讀取
[`MediaQuery.paddingOf`][]），避免控制項被系統挖孔遮住：

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: SafeArea(
      child: MyAppContent(),
    ),
  );
}
```

### 選項 2：還原為 `viewport-fit=contain`（預設）

如果你不希望在行動瀏覽器上以邊到邊方式渲染，
請從 `web/index.html` 的 `<meta name="viewport">` 中移除
`viewport-fit=cover`：

遷移前的程式碼：

```html title="web/index.html"
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

遷移後的程式碼：

```html title="web/index.html"
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 時間軸

於穩定版釋出：3.50

## 參考資料

API 文件：

* [`FlutterView.viewPadding`][]
* [`MediaQuery.paddingOf`][]
* [`SafeArea`][]

相關 issue：

* [Issue 84833][]

相關 PR：

* [PR 191647][]

[`FlutterView.viewPadding`]: {{site.api}}/flutter/dart-ui/FlutterView/viewPadding.html
[`MediaQuery.paddingOf`]: {{site.api}}/flutter/widgets/MediaQuery/paddingOf.html
[`SafeArea`]: {{site.api}}/flutter/widgets/SafeArea-class.html
[Issue 84833]: {{site.repo.flutter}}/issues/84833
[PR 191647]: {{site.repo.flutter}}/pull/191647
