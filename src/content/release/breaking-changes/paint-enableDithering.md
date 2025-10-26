---
title: Paint.enableDithering 現在預設為 true。
description: >-
  停用使用者可設定的 `Paint.enableDithering`。
---

{% render docs/breaking-changes.md %}

## 摘要

[`Paint.enableDithering`][`Paint.enableDithering`] 現在預設為 `true`（先前為 `false`），
並且已被_棄用_，即將移除——Flutter 不再支援
使用者自訂的抖動（dithering）設定。

此外，抖動相關文件現在說明僅_支援_漸層（gradients）。

## 背景

[`Paint.enableDithering`][`Paint.enableDithering`] 是在 [PR 13868][PR 13868] 中作為全域選項新增的，
是針對 [Issue 44134][Issue 44134] 的回應。該議題回報 Flutter 中的漸層
會出現明顯的色帶（banding）問題：

> 目前漸層在所有裝置上都有明顯的色帶，搭配 pulse 動畫時看起來很奇怪。
> 解決方法是讓漸層不透明，並在 Skia 中使用抖動漸層。
> 目前尚未開放抖動漸層的設定，因此若能在 dart:ui 的 Paint 類別中新增 dither 參數會很不錯。
> 這樣我們就能用 CustomPainter 手動繪製漸層。

![色帶範例](https://user-images.githubusercontent.com/30870216/210907719-4f4a1a8d-e28a-4d39-9e99-3635a26a0c74.png)

[Issue 118073][Issue 118073] 回報我們新的 [Impeller][Impeller]
後端在某些漸層上也會出現明顯的色帶。
後來發現 Impeller 並不支援（很少被使用的）
[`Paint.enableDithering`][`Paint.enableDithering`] 屬性。

在為 Impeller 加入抖動支援後（[PR 44181][PR 44181]、[PR 44331][PR 44331]、
[PR 44522][PR 44522]），並檢視抖動對效能的影響（幾乎可忽略），
有以下觀察：

1. 社群共識認為預設情況下漸層效果良好：[Issue 112498][Issue 112498]。
2. 全域選項原本就預計要棄用：[PR 13868][PR 13868]。

因此做出以下決策：

1. 預設啟用抖動。
2. 棄用全域選項。
3. 未來版本將移除全域選項。

在這個過程中，抖動影響漸層以外內容的能力已於 [PR 44730][PR 44730] 和 [PR 44912][PR 44912] 中移除。
這麼做是為了簡化遷移流程，因為 Impeller 永遠只會支援漸層的抖動。

## 遷移指南

大多數使用者與函式庫無需進行任何變更。

如果你有維護 golden tests（黃金測試），
可能需要更新 golden 圖片以反映新的預設值。
例如，若你使用 [`matchesGoldenFile`][`matchesGoldenFile`]
來測試包含漸層的元件（Widget）：

```console
$ flutter test --update-goldens
```

雖然這種情況預期並不常見，但你可以在 `main()` 方法中（無論是在應用程式或測試中）暫時停用抖動效果，只需設定 `enableDithering` 屬性即可：

```dart diff
  void main() {
+   // TODO: Remove this after XYZ.
+   Paint.enableDithering = false;

    runApp(MyApp());
  }
```

由於計畫要_永久_移除 `enableDithering` 屬性，如果你有因效能或閃退等原因需要停用抖色（dithering）的使用情境，請在 [Issue 112498][Issue 112498] 提供你的回饋。

如果你有特殊需求_必須_繪製不帶抖色效果的漸層，則需要自行撰寫自訂著色器（custom shader）。本遷移指南不涵蓋相關說明，但你可以參考以下資源與範例：

- [撰寫與使用片段著色器 (fragment shaders)][Writing and using fragment shaders]
- [`hsl_linear_gradient.frag`][`hsl_linear_gradient.frag`]

**注意**：Flutter Web 不支援抖色（dithering）：[Issue 134250][Issue 134250]。

## 時程

合併於版本：3.14.0-0.1.pre<br>  
穩定版釋出：3.16

## 參考資料

API 文件：

- [`Paint.enableDithering`][`Paint.enableDithering`]
- [`matchesGoldenFile`]

相關議題：

- [Issue 44134][Issue 44134]
- [Issue 112498][Issue 112498]
- [Issue 118073][Issue 118073]

相關 PR：

- [PR 13868][PR 13868]
- [PR 44181][PR 44181]
- [PR 44331][PR 44331]
- [PR 44522][PR 44522]
- [PR 44730][PR 44730]
- [PR 44912][PR 44912]

[`Paint.enableDithering`]: {{site.api}}/flutter/dart-ui/Paint/enableDithering.html
[`matchesGoldenFile`]: {{site.api}}/flutter_test/matchesGoldenFile.html
[Impeller]: /perf/impeller
[PR 13868]: {{site.repo.engine}}/pull/13868
[PR 44181]: {{site.repo.engine}}/pull/44181
[PR 44331]: {{site.repo.engine}}/pull/44331
[PR 44522]: {{site.repo.engine}}/pull/44522
[PR 44730]: {{site.repo.engine}}/pull/44730
[PR 44912]: {{site.repo.engine}}/pull/44912
[Issue 44134]: {{site.repo.flutter}}/issues/44134
[Issue 112498]: {{site.repo.flutter}}/issues/112498
[Issue 118073]: {{site.repo.flutter}}/issues/118073
[Issue 134250]: {{site.repo.flutter}}/issues/134250
[Writing and using fragment shaders]: /ui/design/graphics/fragment-shaders
[`hsl_linear_gradient.frag`]: https://github.com/jonahwilliams/awesome_gradients/blob/a4e09c47ef1760bd7073beb60f49dad8ede5bb2e/shaders/hsl_linear_gradient.frag
