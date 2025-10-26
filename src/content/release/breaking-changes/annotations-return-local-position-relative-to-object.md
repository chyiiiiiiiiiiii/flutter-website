---
title: AnnotatedRegionLayers 回傳相對於裁剪區域的區域座標
description: >
  為註解搜尋提供更可靠且有意義的區域座標。
---

{% render docs/breaking-changes.md %}

## 摘要

在註解搜尋中，`AnnotatedRegionLayers` 回傳的區域座標，現在會以裁剪區域為基準，而非以圖層為基準。這讓區域座標更具意義且更可靠，但會影響到那些直接執行註解搜尋並使用區域座標的程式碼。

## 背景

註解（Annotations）是在繪製階段指派給螢幕上特定區域的中繼資料。
透過指定位置來搜尋註解，可以取得包含該位置的相關資訊。
註解通常用於偵測滑鼠事件，以及應用程式工具列的主題化（theming）。

當`localPosition`首次被加入到搜尋結果時，
它被定義為相對於擁有該註解的圖層，
但這被證明是一個設計錯誤。
以圖層為基準的偏移量既無意義也不可靠。
舉例來說，`Transform`元件（Widget）如果其轉換矩陣僅為平移，會以偏移方式繪製在同一個圖層上；
若矩陣較為複雜，則會推送一個專屬的`TransformLayer`。
前者會保留原本的座標原點（例如應用程式的左上角），
而後者則因為在新圖層上而改變了座標原點。
這兩種情況在視覺上可能沒有明顯差異，因為額外的圖層可能僅僅是 99% 的縮放，
但註解搜尋卻會回傳不同的結果。
為了讓這個區域座標變得可靠，我們必須選擇其中一種結果作為標準。

## 變更說明

現在，`AnnotatedRegionLayer` 回傳的 `localPosition`
會是其接收到的區域座標減去 `offset`，
其中 `offset` 是裁剪區域相對於圖層的位置。

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

從概念上來說，這改變了`AnnotatedRegionLayer.offset`和`size`的定義。它們過去代表「限制註解（annotation）搜尋的裁剪矩形」，而現在則共同代表「註解物件的區域」。

## 遷移指南

如果你的程式碼有主動使用這個 local position，通常是直接與 layer 互動，因為若是透過 render objects 或元件（Widgets）來使用，這個結果早已不可靠。為了保留先前的行為，你可以重新實作`AnnotatedRegionLayer`，讓其回傳 local position 時不再扣除 offset。

## 時程

導入版本：1.15.2<br>  
穩定版釋出於：1.17

## 參考資料

API 文件：

* [`AnnotatedRegionLayer`][`AnnotatedRegionLayer`]
* [`AnnotationEntry`][`AnnotationEntry`]

相關議題：

* [Issue #49568][Issue #49568]

相關 PR：

* [Make Annotation's localPosition relative to object][Make Annotation's localPosition relative to object]

[`AnnotatedRegionLayer`]: {{site.api}}/flutter/rendering/AnnotatedRegionLayer-class.html
[`AnnotationEntry`]: {{site.api}}/flutter/rendering/AnnotationEntry-class.html
[Issue #49568]: {{site.repo.flutter}}/issues/49568
[Make Annotation's localPosition relative to object]: {{site.repo.flutter}}/pull/50157
