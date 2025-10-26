---
title: 點擊、拖曳與其他手勢
shortTitle: 手勢
description: 介紹 Flutter 中點擊、拖曳等手勢的運作方式。
---

本文說明如何在 Flutter 中監聽並回應 _手勢_。
手勢的範例包括點擊（tap）、拖曳（drag）以及縮放（scaling）。

Flutter 的手勢系統分為兩個層次。
第一層是原始指標事件（raw pointer events），描述指標（例如觸控、滑鼠、觸控筆）在螢幕上的位置與移動。
第二層則是 _手勢_，描述由一個或多個指標移動所組成的語意動作。

## 指標（Pointers）

指標代表使用者與裝置螢幕互動的原始資料。
指標事件分為四種類型：

[`PointerDownEvent`][`PointerDownEvent`]
: 指標已在特定位置接觸螢幕。

[`PointerMoveEvent`][`PointerMoveEvent`]
: 指標已從螢幕上的一個位置移動到另一個位置。

[`PointerUpEvent`][`PointerUpEvent`]
: 指標已停止接觸螢幕。

[`PointerCancelEvent`][`PointerCancelEvent`]
: 來自此指標的輸入不再導向此應用程式。

當指標按下時，框架會對您的應用程式進行 _命中測試_（hit test），以判斷指標接觸螢幕位置上存在哪個元件（Widget）。
指標按下事件（以及該指標的後續事件）會被派發給命中測試找到的最內層元件。
從那裡，事件會沿著樹狀結構向上冒泡，並派發給從最內層元件到樹根路徑上的所有元件。
目前沒有機制可以取消或阻止指標事件繼續被派發。

若要直接從元件層監聽指標事件，請使用 [`Listener`][`Listener`] 元件。
然而，通常建議改用下方所述的手勢偵測方式。


[`Listener`]: {{site.api}}/flutter/widgets/Listener-class.html
[`PointerCancelEvent`]: {{site.api}}/flutter/gestures/PointerCancelEvent-class.html
[`PointerDownEvent`]: {{site.api}}/flutter/gestures/PointerDownEvent-class.html
[`PointerMoveEvent`]: {{site.api}}/flutter/gestures/PointerMoveEvent-class.html
[`PointerUpEvent`]: {{site.api}}/flutter/gestures/PointerUpEvent-class.html

## 手勢（Gestures）

手勢代表語意動作（例如點擊、拖曳與縮放），這些動作是由多個獨立的指標事件，甚至多個指標組合而成。
手勢可以根據其生命週期（例如拖曳開始、拖曳更新、拖曳結束）派發多個事件：

**點擊（Tap）**

`onTapDown`
: 可能造成點擊的指標已在特定位置接觸螢幕。

`onTapUp`
: 觸發點擊的指標已在特定位置停止接觸螢幕。

`onTap`
: 先前觸發 `onTapDown` 的指標也觸發了 `onTapUp`，最終造成一次點擊。

`onTapCancel`
: 先前觸發 `onTapDown` 的指標最終不會造成點擊。

**雙擊（Double tap）**

`onDoubleTap`
: 使用者在短時間內於同一位置連續點擊兩次螢幕。

**長按（Long press）**

`onLongPress`
: 指標在同一位置長時間接觸螢幕。

**垂直拖曳（Vertical drag）**

`onVerticalDragStart`
: 指標已接觸螢幕，並可能開始垂直移動。

`onVerticalDragUpdate`
: 指標持續接觸螢幕並垂直移動時，已在垂直方向上移動。

`onVerticalDragEnd`
: 先前持續接觸螢幕並垂直移動的指標已停止接觸螢幕，且停止時有特定速度。

**水平拖曳（Horizontal drag）**

`onHorizontalDragStart`
: 指標已接觸螢幕，並可能開始水平移動。

`onHorizontalDragUpdate`
: 指標持續接觸螢幕並水平移動時，已在水平方向上移動。

`onHorizontalDragEnd`
: 先前持續接觸螢幕並水平移動的指標已停止接觸螢幕，且停止時有特定速度。

**平移（Pan）**

`onPanStart`
: 指標已接觸螢幕，並可能開始水平或垂直移動。若同時設定 `onHorizontalDragStart` 或 `onVerticalDragStart`，此回呼會發生錯誤。

`onPanUpdate`
: 指標持續接觸螢幕並在垂直或水平方向移動。若同時設定 `onHorizontalDragUpdate` 或 `onVerticalDragUpdate`，此回呼會發生錯誤。

`onPanEnd`
: 先前持續接觸螢幕的指標已停止接觸，且停止時有特定速度。若同時設定 `onHorizontalDragEnd` 或 `onVerticalDragEnd`，此回呼會發生錯誤。

### 為元件加入手勢偵測

若要從元件層監聽手勢，請使用 [`GestureDetector`][`GestureDetector`]。

:::note
想進一步了解，請觀看這段關於 `GestureDetector` 元件的 Widget of the Week 短片：

{% ytEmbed 'WhVXkCFPmK4', 'GestureDetector - Flutter widget of the week' %}
:::

如果您正在使用 Material 元件（Material components），
許多這類元件已經能回應點擊或手勢。
例如，[`IconButton`][`IconButton`] 與 [`TextButton`][`TextButton`]
會回應按壓（點擊），而 [`ListView`][`ListView`]
則可回應滑動以觸發捲動。
如果您沒有使用這些元件，但希望在點擊時有「墨水波紋」效果，可以使用 [`InkWell`][`InkWell`]。


[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[`IconButton`]: {{site.api}}/flutter/material/IconButton-class.html
[`InkWell`]: {{site.api}}/flutter/material/InkWell-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html

### 手勢消歧（Gesture disambiguation）

在螢幕的某個位置，可能會有多個手勢偵測器（gesture detectors）。
例如：

* 一個 `ListTile` 擁有一個回應整個 `ListTile` 的點擊辨識器，以及包覆尾端圖示按鈕的巢狀辨識器。此時，尾端圖示的螢幕區域同時被兩個手勢辨識器覆蓋，若該區域發生點擊，兩者需協調由誰處理此手勢。
* 一個 `GestureDetector` 覆蓋一個螢幕區域，該區域同時設定為可處理多種手勢，例如長按與點擊。當使用者觸碰該區域時，`tap` 辨識器必須與 `long press` 辨識器協調。根據指標後續的動作，兩者之一會收到手勢，或若使用者執行的動作既非點擊也非長按，則兩者都不會收到手勢。

這些手勢偵測器都會監聽指標事件流，並嘗試辨識特定手勢。[`GestureDetector`] 元件會根據其哪些回呼非 null，決定要嘗試辨識哪些手勢。

當同一指標在螢幕上有多個手勢辨識器時，框架會透過讓每個辨識器加入 _手勢競技場_（gesture arena）來消除歧義。手勢競技場會依下列規則決定哪個手勢獲勝：

* 任一時刻，辨識器都可以自行淘汰並離開競技場。如果只剩一個辨識器，該辨識器即為獲勝者。

* 任一時刻，辨識器可以宣告自己獲勝，導致其餘辨識器全部失敗。

例如，在區分水平與垂直拖曳時，兩個辨識器在收到指標按下事件時都會進入競技場。辨識器會觀察指標移動事件。
如果使用者在水平方向移動超過一定邏輯像素數，水平辨識器會宣告勝利，手勢即被視為水平拖曳。
同理，若使用者在垂直方向移動超過一定邏輯像素數，則垂直辨識器會宣告自己獲勝。

當只有水平（或垂直）拖曳辨識器時，手勢競技場特別有用。此時競技場中僅有一個辨識器，水平拖曳會立即被辨識，也就是說第一個水平移動像素就會被當作拖曳處理，使用者不必等待進一步的手勢消歧。
