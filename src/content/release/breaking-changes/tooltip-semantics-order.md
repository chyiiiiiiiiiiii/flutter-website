---
title: Tooltip 的無障礙瀏覽順序已變更
description: >-
  Tooltip 元件（Widget）的訊息現在會在無障礙瀏覽時，緊接在 Tooltip 元件的子元件之後。
---

{% render docs/breaking-changes.md %}

## 摘要

在無障礙焦點瀏覽過程中，`Tooltip.message` 會在 `Tooltip.child` 之後立即被訪問。

## 背景

`Tooltip` 元件（Widget）通常會包裹一個互動式 UI 元件（例如按鈕），並在長按時顯示說明訊息。
當訊息顯示時，輔助技術應該在按鈕之後宣讀該訊息。

`Tooltip` 元件（Widget）原本會在長按時將 `Tooltip.message` 放在 `OverlayEntry` 上。
因此，在語意樹（semantics tree）中，`Tooltip.message` 並不會緊接在 `Tooltip.child` 之後。

## 遷移指南

這項變更調整了 tooltip 訊息在語意樹中的位置。
如果你的無障礙測試預期 tooltip 訊息在語意樹的特定位置出現，當訊息顯示時，可能會導致無障礙測試失敗。
請更新所有失敗的無障礙測試，以符合新的 tooltip 語意順序。

例如，如果你在測試中建立了以下的元件樹：

```dart
Directionality(
  textDirection: TextDirection.ltr,
  child: Overlay(
    initialEntries: <OverlayEntry>[
      OverlayEntry(
        builder: (BuildContext context) {
          return ListView(
            children: <Widget>[
              const Text('before'),
              Tooltip(
                key: tooltipKey,
                showDuration: const Duration(days: 365),
                message: 'message',
                child: const Text('child'),
              ),
              const Text('after'),
            ],
          );
        },
      ),
    ],
  ),
);
```

當 tooltip 訊息顯示時，此變更前對應的語意樹（semantics tree）應如下所示：

```dart
SemanticsNode#0
 │
 ├─SemanticsNode#1
 │ │
 │ └─SemanticsNode#5
 │   │ flags: hasImplicitScrolling
 │   │ scrollChildren: 3
 │   │
 │   ├─SemanticsNode#2
 │   │   tags: RenderViewport.twoPane
 │   │   label: "before"
 │   │   textDirection: ltr
 │   │
 │   ├─SemanticsNode#3
 │   │   tags: RenderViewport.twoPane
 │   │   label: "child"
 │   │   tooltip: "message"
 │   │   textDirection: ltr
 │   │
 │   └─SemanticsNode#4
 │       tags: RenderViewport.twoPane
 │       label: "after"
 │       textDirection: ltr
 │
 └─SemanticsNode#6
     label: "message"
     textDirection: ltr
```

在此變更之後，相同的元件樹（widget tree）會產生略有不同的語意樹（semantics tree），如下所示。節點 #6 會成為節點 #3 的子節點，而不是節點 #0 的子節點。

```dart
SemanticsNode#0
 │
 └─SemanticsNode#1
   │
   └─SemanticsNode#5
     │ flags: hasImplicitScrolling
     │ scrollChildren: 3
     │
     ├─SemanticsNode#2
     │   tags: RenderViewport.twoPane
     │   label: "before"
     │   textDirection: ltr
     │
     ├─SemanticsNode#3
     │ │ tags: RenderViewport.twoPane
     │ │ label: "child"
     │ │ tooltip: "message"
     │ │ textDirection: ltr
     │ │
     │ └─SemanticsNode#6
     │     label: "message"
     │     textDirection: ltr
     │
     └─SemanticsNode#4
         tags: RenderViewport.twoPane
         label: "after"
         textDirection: ltr
```

## 時程

導入版本：3.16.0-11.0.pre<br>  
穩定版發佈：3.19.0

## 參考資料

API 文件：

* [`Tooltip`][`Tooltip`]

相關 PR：

* [OverlayPortal.overlayChild 將 semantics 貢獻給 OverlayPortal，而非 Overlay][OverlayPortal.overlayChild contributes semantics to OverlayPortal instead of Overlay]

[`Tooltip`]: {{site.api}}/flutter/material/Tooltip-class.html
[OverlayPortal.overlayChild contributes semantics to OverlayPortal instead of Overlay]: {{site.repo.flutter}}/pull/134921
