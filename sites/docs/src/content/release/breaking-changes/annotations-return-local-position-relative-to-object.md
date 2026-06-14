---
title: AnnotatedRegionLayers 回傳相對於裁剪區域的區域座標
description: >
  為註解搜尋提供更可靠且有意義的區域座標。
---

{% render "docs/breaking-changes.md" %}

## 摘要

在註解搜尋中，`AnnotatedRegionLayers` 回傳的區域座標，現在改為相對於裁剪區域，而非原本的圖層。這讓區域座標更加有意義且可靠，但會影響到直接執行註解搜尋並使用該區域座標的程式碼。

## 背景

註解（Annotations）是在渲染（render）階段指派給螢幕上特定區域的中繼資料。
使用位置來搜尋註解時，會取得包含該位置的相關資訊。
這些註解常用於偵測滑鼠事件，以及應用程式列（app bars）的主題化（theming）。

當初在搜尋結果中加入 `localPosition` 時，
其定義為相對於擁有該註解的圖層，
但這被證明是一個設計錯誤。
相對於圖層的偏移既無意義也不可靠。
舉例來說，若一個 `Transform` 元件（Widget）在同一個圖層上繪製，
當轉換矩陣只是簡單的平移時會有一個偏移；
若矩陣較為複雜，則會推送一個專用的 `TransformLayer`。
前者會保留原本的座標原點（例如應用程式的左上角），
而後者則因為在新圖層上而改變了座標原點。
這兩種情況在視覺上可能沒有明顯差異，
因為額外的圖層可能僅僅是縮放到 99%，
但註解搜尋卻會回傳不同的結果。
為了讓這個區域座標更可靠，我們必須選擇一種結果作為標準。

## 變更說明

現在，`AnnotatedRegionLayer` 回傳的 `localPosition`
會是其收到的區域座標減去 `offset`，
其中 `offset` 表示裁剪區域相對於圖層的位置。

```dart
class AnnotatedRegionLayer<T> extends ContainerLayer {
  @override
  bool findAnnotations<S>(AnnotationResult<S> result, Offset localPosition, { required bool onlyFirst }) {
    ...
    if (/* shouldAddAnnotation */) {
      result.add(AnnotationEntry<S>(
        annotation: typedValue,
        // Used to be:
        // localPosition: localPosition,
        localPosition: localPosition - offset,
      ));
    }
    ...
  }
}
```

從概念上來說，這改變了 `AnnotatedRegionLayer.offset` 和 `size` 的定義。
它們過去代表「限制註解搜尋的裁剪矩形」，而現在則共同表示「註解物件的區域」。

## 遷移指南

如果你的程式碼有主動使用這個 `localPosition`，本質上很可能是直接與圖層（layer）互動，
因為若是透過 render objects 或元件（Widgets）取得，這個結果早已不可靠。
為了維持先前的行為，你可以自行重新實作 `AnnotatedRegionLayer`，
讓其回傳 `localPosition` 時不再扣除 `offset`。

## 時程

合併進版本：1.15.2<br>
穩定版釋出：1.17

## 參考資料

API 文件：

* [`AnnotatedRegionLayer`][]
* [`AnnotationEntry`][]

相關議題：

* [Issue #49568][]

相關 PR：

* [Make Annotation's localPosition relative to object][]

[`AnnotatedRegionLayer`]: {{site.api}}/flutter/rendering/AnnotatedRegionLayer-class.html
[`AnnotationEntry`]: {{site.api}}/flutter/rendering/AnnotationEntry-class.html
[Issue #49568]: {{site.repo.flutter}}/issues/49568
[Make Annotation's localPosition relative to object]: {{site.repo.flutter}}/pull/50157
