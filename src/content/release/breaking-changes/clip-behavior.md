---
title: Clip 行為
description: >
  Flutter 統一 clipBehavior，並在大多數情況下預設不進行裁剪（clip）。
---

{% render docs/breaking-changes.md %}

## 摘要

Flutter 現在除了少數特殊元件（如 `ClipRect`）外，預設**不進行裁剪（clip）**。若要覆寫不裁剪的預設行為，請在元件建構時明確設定 `clipBehavior`。

## 背景

過去 Flutter 因為裁剪（clip）而導致效能較慢。例如，Flutter gallery app 的效能基準測試在 2018 年 5 月時，平均每幀光柵化（rasterization）時間約為 35 毫秒，而流暢 60fps 的繪製預算僅為 16 毫秒。透過移除不必要的裁剪及其相關操作，我們觀察到效能幾乎提升了 2 倍，從每幀 35 毫秒降至 17.5 毫秒。

{% comment %}
以下兩張圖片無法顯示。
![](https://lh5.googleusercontent.com/Pn8FxuW2W3Cgvw9kIUvLLenrwXti7WRm_zPif3VJILa325d1Njm8aP47DXfK1r2Du-FwLKhI9umw5nMG6eNqn5fLnQBIt6VIPZ7Q2ETiCuXgQPD1cUYOeA-2Ph_DpvL27fK7m_Af)

這是有裁剪與無裁剪時轉場的比較。

![](https://lh5.googleusercontent.com/gSFKigrEoekji0juxTVjj29PlIizjuxJsetHsIegLt85zCHknRIUOeICjMdEBjBhPZDZXcEzFh1WCOrdmZa9KZ5vghgS7Uo9IDAKyBtEJ7h3tKfIHXf6A4vxrHfj1a_0kuT6f4r2)
{% endcomment %}

當時裁剪的最大成本來自於 Flutter 會在每次裁剪後（除非是簡單的軸對齊矩形裁剪）加上一個 `saveLayer` 呼叫，以避免如 [Issue 18057][Issue 18057] 所描述的邊緣溢出（bleeding edge）問題。這種行為在 Material 應用中是普遍存在的，透過像 `Card`、`Chip`、`Button` 等元件實現，導致 `PhysicalShape` 和 `PhysicalModel` 都會裁剪其內容。

`saveLayer` 呼叫在舊裝置上尤其耗費資源，因為它會建立一個離屏（offscreen）渲染目標，而切換渲染目標有時會花費約 1 毫秒。

即使沒有 `saveLayer` 呼叫，裁剪本身仍然昂貴，因為它會套用到所有後續的繪製操作，直到恢復為止。因此，單一個裁剪可能會拖慢數百次繪製操作的效能。

除了效能問題外，Flutter 也曾因為裁剪的管理與實作分散在不同地方而出現正確性問題。在數個地方，`saveLayer` 被插入在錯誤的位置，結果只增加了效能負擔，卻無法修正任何邊緣溢出問題。

因此，在這次破壞性變更中，我們統一了 `clipBehavior` 控制及其實作。大多數元件的預設 `clipBehavior` 為 `Clip.none`，以提升效能，僅有以下例外：

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

您有 4 種方式可以遷移您的程式碼：

1. 如果您的內容不需要被裁剪（例如，所有元件的子項都不會超出父元件邊界），可以保持原樣。這通常會對應用程式的整體效能產生正面影響。
2. 如果需要裁剪，且沒有抗鋸齒（anti-alias）也能接受，請加上 `clipBehavior: Clip.hardEdge`。這通常用於裁剪矩形或曲線區域很小的形狀（例如圓角矩形的角落）。
3. 如果需要抗鋸齒裁剪，請加上 `clipBehavior: Clip.antiAlias`。這會讓邊緣更平滑，但成本略高。常見於處理圓形或弧形時。
4. 如果您想要與 2018 年 5 月前完全相同的行為，請加上 `clip.antiAliasWithSaveLayer`。請注意這會大幅影響效能，通常很少需要。唯一可能需要這種行為的情境是圖片覆蓋在非常不同的背景色上。在這些情況下，建議考慮是否可以避免多種顏色重疊（例如，讓背景色只出現在圖片未覆蓋的區域）。

針對 `Stack` 元件，如果您之前使用 `overflow: Overflow.visible`，請改用 `clipBehavior: Clip.none`。

針對 `ListWheelViewport` 元件，如果您之前指定了 `clipToSize`，請改用對應的 `clipBehavior`：
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

## 時間軸

合併於版本：_various_<br>  
穩定版釋出：2.0.0

## 參考資料

API 文件：

* [`Clip`][`Clip`]

相關議題（Issues）：

* [Issue 13736][Issue 13736]
* [Issue 18057][Issue 18057]
* [Issue 21830][Issue 21830]

相關 PR：

* [PR 5420][PR 5420]：移除不必要的 saveLayer
* [PR 18576][PR 18576]：為 Material 及相關元件 (Widgets) 新增 Clip 列舉
* [PR 18616][PR 18616]：從 dart 中移除 clip 後的 saveLayer
* [PR 5647][PR 5647]：為 ClipPath/ClipRRect 與 PhysicalShape 圖層新增 ClipMode
* [PR 5670][PR 5670]：為 canvas clip 呼叫新增抗鋸齒（anti-alias）開關
* [PR 5853][PR 5853]：將 clip mode 更名為 clip behavior
* [PR 5868][PR 5868]：在 compositing.dart 中將 clip 更名為 clipBehavior
* [PR 5973][PR 5973]：若有 clip 則呼叫 drawPaint 取代 drawPath
* [PR 5952][PR 5952]：如有可能，無 clip 時呼叫 drawPath
* [PR 20205][PR 20205]：將預設 clipBehavior 設為 Clip.none 並更新測試
* [PR 20538][PR 20538]：將 clipBehavior 釋出給更多 Material 按鈕
* [PR 20751][PR 20751]：為 InkWell 新增 customBorder，使其可裁剪 ShapeBorder
* [PR 20752][PR 20752]：再次將預設 clip 設為 Clip.none
* [PR 21012][PR 21012]：為更多按鈕新增預設不裁剪（no-clip）測試
* [PR 21703][PR 21703]：ClipRect 的預設 clipBehavior 設為 hardEdge
* [PR 21826][PR 21826]：為 ClipRectLayer 補上預設 hardEdge clip

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
