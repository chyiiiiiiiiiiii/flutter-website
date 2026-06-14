---
title: 裁剪行為（Clip Behavior）
description: >
  Flutter 統一了 clipBehavior，並在大多數情況下預設不進行裁剪。
---

{% render "docs/breaking-changes.md" %}

## 摘要

Flutter 現在預設**不進行裁剪**，僅有少數特殊元件 (Widget)（如 `ClipRect`）例外。若要覆寫「不裁剪」的預設行為，請在元件建構時明確設定 `clipBehavior`。

## 背景說明

過去 Flutter 因為裁剪導致效能較慢。例如，Flutter gallery app 基準測試在 2018 年 5 月的平均每幀光柵化（rasterization）時間約為 35ms，而流暢 60fps 的預算僅有 16ms。透過移除不必要的裁剪及相關操作，效能幾乎提升了一倍，從 35ms/幀降至 17.5ms/幀。

{% comment %}
以下兩張圖片無法顯示。
![](https://lh5.googleusercontent.com/Pn8FxuW2W3Cgvw9kIUvLLenrwXti7WRm_zPif3VJILa325d1Njm8aP47DXfK1r2Du-FwLKhI9umw5nMG6eNqn5fLnQBIt6VIPZ7Q2ETiCuXgQPD1cUYOeA-2Ph_DpvL27fK7m_Af)

這是有裁剪與無裁剪時轉場的比較。

![](https://lh5.googleusercontent.com/gSFKigrEoekji0juxTVjj29PlIizjuxJsetHsIegLt85zCHknRIUOeICjMdEBjBhPZDZXcEzFh1WCOrdmZa9KZ5vghgS7Uo9IDAKyBtEJ7h3tKfIHXf6A4vxrHfj1a_0kuT6f4r2)
{% endcomment %}

當時裁剪最大的效能成本在於 Flutter 會在每次裁剪後（除非是單純的軸對齊矩形裁剪）加上一個 `saveLayer` 呼叫，以避免如 [Issue 18057][] 所述的邊緣溢出（bleeding edge）問題。這種行為在 Material 應用程式中非常普遍，透過像 `Card`、`Chip`、`Button` 等元件，導致 `PhysicalShape` 和 `PhysicalModel` 都會裁剪其內容。

`saveLayer` 呼叫在舊裝置上特別耗費效能，因為它會建立一個離屏渲染目標（offscreen render target），而切換渲染目標有時甚至會耗費約 1ms。

即使沒有 `saveLayer` 呼叫，裁剪本身依然昂貴，因為它會套用到所有後續的繪製操作，直到還原為止。因此，一個裁剪操作可能會拖慢數百次繪製的效能。

除了效能問題，Flutter 也曾因為裁剪沒有集中管理與實作而產生正確性問題。在多個地方，`saveLayer` 被插入在錯誤的位置，結果只增加了效能負擔，卻沒有解決邊緣溢出的問題。

因此，我們在這次破壞性變更中統一了 `clipBehavior` 控制與其實作。大多數元件的預設 `clipBehavior` 為 `Clip.none` 以提升效能，僅有下列例外：

* `ClipPath` 預設為 `Clip.antiAlias`
* `ClipRRect` 預設為 `Clip.antiAlias`
* `ClipRect` 預設為 `Clip.hardEdge`
* `Stack` 預設為 `Clip.hardEdge`
* `EditableText` 預設為 `Clip.hardEdge`
* `ListWheelScrollView` 預設為 `Clip.hardEdge`
* `SingleChildScrollView` 預設為 `Clip.hardEdge`
* `NestedScrollView` 預設為 `Clip.hardEdge`
* `ShrinkWrappingViewport` 預設為 `Clip.hardEdge`

## 遷移指南

你有 4 種方式可以遷移你的程式碼：

1. 若你的內容不需要裁剪（例如，沒有任何元件的子元件超出其父元件邊界），可以維持原樣。這通常會對應用程式整體效能帶來正面影響。
2. 如果你需要裁剪，且無鋸齒（anti-alias）裁剪的效果已足夠（對你或你的客戶來說），請加入 `clipBehavior: Clip.hardEdge`。這通常用於裁剪矩形或曲線區域極小的形狀（如圓角矩形的角落）。
3. 若你需要抗鋸齒裁剪，請加入 `clipBehavior: Clip.antiAlias`。這會讓邊緣更平滑，但效能成本略高。這通常用於處理圓形與弧形。
4. 如果你想要與 2018 年 5 月之前完全相同的行為，請加入 `clip.antiAliasWithSaveLayer`。請注意，這會大幅影響效能，通常極少需要。你可能會需要這個選項的情境是：有一張圖片覆蓋在與其差異很大的背景色上。這種情況下，建議考慮是否能避免多種顏色重疊（例如，讓背景色只出現在圖片未覆蓋的地方）。

針對 `Stack` 元件，若你之前使用 `overflow: Overflow.visible`，請改為 `clipBehavior: Clip.none`。

針對 `ListWheelViewport` 元件，若你之前有指定 `clipToSize`，請改用對應的 `clipBehavior`：
`Clip.none` 對應 `clipToSize = false`，
`Clip.hardEdge` 對應 `clipToSize = true`。

遷移前的程式碼：

```dart
    await tester.pumpWidget(
      Directionality(
        textDirection: TextDirection.ltr,
        child: Center(
          child: Stack(
            overflow: Overflow.visible,
            children: const <Widget>[
              SizedBox(
                width: 100,
                height: 100,
              ),
            ],
          ),
        ),
      ),
    );
```

遷移後的程式碼：

```dart
    await tester.pumpWidget(
      Directionality(
        textDirection: TextDirection.ltr,
        child: Center(
          child: Stack(
            clipBehavior: Clip.none,
            children: const <Widget>[
              SizedBox(
                width: 100.0,
                height: 100.0,
              ),
            ],
          ),
        ),
      ),
    );
```

## 時程

合併於版本：_various_<br>
穩定版釋出：2.0.0

## 參考資料

API 文件：

* [`Clip`][]

相關議題：

* [Issue 13736][]
* [Issue 18057][]
* [Issue 21830][]

相關 PR：

* [PR 5420][]：移除不必要的 saveLayer
* [PR 18576][]：為 Material 及相關元件新增 Clip 列舉
* [PR 18616][]：從 dart 中移除 clip 後的 saveLayer
* [PR 5647][]：為 ClipPath/ClipRRect 與 PhysicalShape 圖層新增 ClipMode
* [PR 5670][]：為 canvas clip 呼叫新增抗鋸齒（anti-alias）開關
* [PR 5853][]：將 clip mode 更名為 clip behavior
* [PR 5868][]：在 compositing.dart 中將 clip 更名為 clipBehavior
* [PR 5973][]：如有 clip，則呼叫 drawPaint 取代 drawPath
* [PR 5952][]：如可行，則在無 clip 狀態下呼叫 drawPath
* [PR 20205][]：將預設 clipBehavior 設為 Clip.none 並更新測試
* [PR 20538][]：將 clipBehavior 對外開放給更多 Material 按鈕
* [PR 20751][]：為 InkWell 新增 customBorder，以便可裁剪 ShapeBorder
* [PR 20752][]：再次將預設 clip 設為 Clip.none
* [PR 21012][]：為更多按鈕新增預設無裁剪（no-clip）測試
* [PR 21703][]：將 ClipRect 的預設 clipBehavior 設為 hardEdge
* [PR 21826][]：為 ClipRectLayer 補上預設 hardEdge clip

[PR 5420]:  {{site.repo.engine}}/pull/5420
[PR 5647]:  {{site.repo.engine}}/pull/5647
[PR 5670]:  {{site.repo.engine}}/pull/5670
[PR 5853]:  {{site.repo.engine}}/pull/5853
[PR 5868]:  {{site.repo.engine}}/pull/5868
[PR 5952]:  {{site.repo.engine}}/pull/5952
[PR 5973]:  {{site.repo.engine}}/pull/5937
[PR 18576]: {{site.repo.flutter}}/pull/18576
[PR 18616]: {{site.repo.flutter}}/pull/18616
[PR 20205]: {{site.repo.flutter}}/pull/20205
[PR 20538]: {{site.repo.flutter}}/pull/20538
[PR 20751]: {{site.repo.flutter}}/pull/20751
[PR 20752]: {{site.repo.flutter}}/pull/20752
[PR 21012]: {{site.repo.flutter}}/pull/21012
[PR 21703]: {{site.repo.flutter}}/pull/21703
[PR 21826]: {{site.repo.flutter}}/pull/21826

[`Clip`]: {{site.api}}/flutter/dart-ui/Clip.html
[Issue 13736]: {{site.repo.flutter}}/issues/13736
[Issue 18057]: {{site.repo.flutter}}/issues/18057
[Issue 21830]: {{site.repo.flutter}}/issues/21830
