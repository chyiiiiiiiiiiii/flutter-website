---
title: 動畫 API 概覽
shortTitle: API 概覽
description: 動畫概念總覽。
---

Flutter 的動畫系統是基於型別化的
[`Animation`][] 物件。元件 (Widget) 可以直接在其 build
函式中讀取這些動畫的當前值並監聽其狀態變化，或是將這些動畫作為更複雜動畫的基礎，並傳遞給其他元件。

## 動畫（Animation）

動畫系統的主要構件是
[`Animation`][] 類別。動畫（Animation）代表一個特定型別的值，該值可以在動畫生命週期中變化。大多數執行動畫的元件會以參數形式接收一個 `Animation` 物件，
從中讀取動畫的當前值，並監聽該值的變化。

### `addListener`

每當動畫的值發生變化時，
動畫會通知所有使用
[`addListener`][] 新增的監聽器。通常，監聽動畫的 [`State`][]
物件會在其監聽器回呼（callback）中呼叫
[`setState`][]，以通知元件系統需要
以動畫的新值重新建構。

這種模式非常常見，因此有兩個元件
可以協助元件在動畫值變化時自動重建：
[`AnimatedWidget`][] 和 [`AnimatedBuilder`][]。
第一個 `AnimatedWidget`，最適合用於
無狀態動畫元件。要使用 `AnimatedWidget`，
只需繼承它並實作 [`build`][] 函式。
第二個 `AnimatedBuilder`，適用於希望在較大 build 函式中納入動畫的複雜元件。
要使用 `AnimatedBuilder`，只需建立該元件
並傳入一個 `builder` 函式。

### `addStatusListener`

動畫也提供一個 [`AnimationStatus`][]，
用於指示動畫如何隨時間演化。
每當動畫的狀態改變時，
動畫會通知所有使用
[`addStatusListener`][] 新增的監聽器。通常，動畫會以 `dismissed` 狀態（狀態）開始，這表示它們
處於範圍的起始點。例如，
從 0.0 進展到 1.0 的動畫，
當其值為 0.0 時會是 `dismissed` 狀態。
動畫接著可能會進行 `forward`（從 0.0 到 1.0），
或是在 `reverse`（從 1.0 到 0.0）。
最終，若動畫達到其範圍的終點
（1.0），動畫會進入 `completed` 狀態。

## Animation&shy;Controller

要建立動畫，首先需建立一個 [`AnimationController`][]。
`AnimationController` 不僅本身是一個動畫，還能讓你控制動畫。例如，
你可以指示控制器播放動畫
[`forward`][] 或 [`stop`][] 動畫。
你也可以 [`fling`][] 動畫，
這會使用物理模擬（如彈簧）來驅動動畫。

建立動畫控制器後，
你可以基於它建置其他動畫。
例如，你可以建立一個 [`ReverseAnimation`][]，
它會鏡像原始動畫但以相反方向運行（從 1.0 到 0.0）。
同樣地，你可以建立一個 [`CurvedAnimation`][]，
其值會由 [`Curve`][] 進行調整。

## Tweens

若要實現超出 0.0 到 1.0 區間的動畫，可以使用
[`Tween<T>`][]，它會在其
[`begin`][] 和 [`end`][] 值之間進行插值。許多型別都有專屬的
`Tween` 子類別，提供型別專屬的插值方式。
例如，[`ColorTween`][] 可在顏色之間插值，
[`RectTween`][] 可在矩形之間插值。
你也可以透過建立自己的 `Tween` 子類別並覆寫其
[`lerp`][] 函式來自訂插值方式。

單獨來看，tween 只定義了如何在兩個值之間插值。要取得動畫當前幀的具體值，還需要一個動畫來決定當前狀態。
有兩種方式可以將 tween 與動畫結合以取得具體值：

1. 你可以在動畫的當前值上 [`evaluate`][] tween。這種方式最適合已經在監聽動畫且會在動畫值變化時重建的元件。

2. 你可以根據動畫 [`animate`][] tween。
   `animate` 函式不會回傳單一值，而是回傳一個包含 tween 的新 `Animation`。
   當你想將新建立的動畫傳遞給其他元件時，這種方式最為實用，
   這樣其他元件就能讀取包含 tween 的當前值並監聽值的變化。

## 架構

動畫實際上是由多個核心構件組成。

### Scheduler（排程器）

[`SchedulerBinding`][] 是一個單例類別，
提供 Flutter 排程原語。

在這裡，關鍵的原語是 frame callbacks（畫格回呼）。
每當需要在螢幕上顯示一個畫格時，
Flutter 引擎會觸發一個 "begin frame" 回呼，
排程器會將其多工分發給所有使用
[`scheduleFrameCallback()`][] 註冊的監聽器。所有這些回呼都會
收到該畫格的官方時間戳記，
以 `Duration` 的形式（來自某個任意紀元）。由於所有回呼收到的時間相同，任何從這些回呼中觸發的動畫都會看起來完全同步，即使它們的執行有幾毫秒的差異。

### Tickers（計時器）

[`Ticker`][] 類別會連接到排程器的
[`scheduleFrameCallback()`][]
機制，每個 tick 觸發一次回呼。

`Ticker` 可以啟動和停止。啟動時，
會回傳一個 `Future`，當停止時會完成。

每個 tick，`Ticker` 會提供自啟動後第一個 tick 起算的經過時間給回呼。

由於計時器總是以啟動後的第一個 tick 作為相對時間起點，因此所有計時器都是同步的。如果你在兩個 tick 之間的不同時刻啟動三個計時器，它們仍會以相同的起始時間同步，並隨後保持步調一致。就像在公車站等車的人一樣，
所有計時器都在等待一個定期發生的事件
（tick）來開始計時。

### Simulations（模擬）

[`Simulation`][] 抽象類別會將
相對時間值（經過時間）對應到一個
double 值，並具有完成的概念。

理論上模擬是無狀態的，但實務上
有些模擬（例如，
[`BouncingScrollSimulation`][] 和
[`ClampingScrollSimulation`][]）
在被查詢時會不可逆地改變狀態。

`Simulation` 類別針對不同效果有[多種具體實作][various concrete implementations]。

### Animatables（可動畫物件）

[`Animatable`][] 抽象類別會將一個
double 對應到特定型別的值。

`Animatable` 類別是無狀態且不可變的。

#### Tweens

[`Tween<T>`][] 抽象類別會將名義上在 0.0-1.0 區間內的 double
值對應到一個型別化的值
（例如 `Color`，或另一個 double）。
它是一個 `Animatable`。

它具有輸出型別（`T`）、`begin` 值和 `end` 值，
並提供一種在起始值與結束值之間插值（`lerp`）的方法，
針對給定的輸入值（名義上在 0.0-1.0 區間的 double）。

`Tween` 類別是無狀態且不可變的。

#### 組合 animatables

將一個 `Animatable<double>`（父物件）傳給 `Animatable` 的
`chain()` 方法，會建立一個新的 `Animatable` 子類別，該子類別會先套用父物件的對應，再套用子物件的對應。

### Curves（曲線）

[`Curve`][] 抽象類別會將名義上在 0.0-1.0 區間的 double
對應到名義上在 0.0-1.0 區間的 double。

`Curve` 類別是無狀態且不可變的。

### Animations（動畫）

[`Animation`][] 抽象類別提供
特定型別的值、動畫方向與動畫狀態的概念，以及一個監聽介面，可註冊在值或狀態變化時被呼叫的回呼。

部分 `Animation` 子類別的值永遠不會改變
（[`kAlwaysCompleteAnimation`][]、[`kAlwaysDismissedAnimation`][]、
[`AlwaysStoppedAnimation`][]）；在這些類別上註冊回呼沒有任何效果，因為回呼永遠不會被呼叫。

`Animation<double>` 變體很特別，因為它可以用來
表示名義上在 0.0-1.0 區間的 double，這正是 `Curve` 和 `Tween` 類別，以及部分 `Animation` 子類別所預期的輸入。

有些 `Animation` 子類別是無狀態的，
僅將監聽器轉發給其父物件。
有些則非常有狀態。

#### 可組合動畫（Composable animations）

大多數 `Animation` 子類別會明確接收一個「父」`Animation<double>`。它們由該父物件驅動。

`CurvedAnimation` 子類別會接收一個 `Animation<double>` 類別（父物件）以及一對 `Curve` 類別（正向與反向曲線）作為輸入，並將父物件的值作為曲線的輸入來決定其輸出。`CurvedAnimation` 是不可變且無狀態的。

`ReverseAnimation` 子類別會接收一個
`Animation<double>` 類別作為父物件，並將動畫的所有值反轉。它假設父物件使用名義上在 0.0-1.0 區間的值，並回傳 1.0-0.0 區間的值。父動畫的狀態與方向也會被反轉。`ReverseAnimation` 是不可變且無狀態的。

`ProxyAnimation` 子類別會接收一個 `Animation<double>` 類別作為父物件，僅轉發該父物件的當前狀態。
但父物件是可變的。

`TrainHoppingAnimation` 子類別會接收兩個父物件，
並在它們的值交叉時切換。

#### 動畫控制器（Animation controllers）

[`AnimationController`][] 是一個有狀態的
`Animation<double>`，它使用 `Ticker` 來賦予自身生命。
它可以啟動與停止。每個 tick 時，會取得自啟動以來經過的時間並傳給 `Simulation` 以取得值。該值即為其回報的值。如果 `Simulation`
回報該時刻已結束，控制器會自動停止。

動畫控制器可設定下界與上界，
並於兩者間進行動畫，以及動畫持續時間。

簡單情境下（使用 `forward()` 或 `reverse()`），動畫控制器會在給定的持續時間內，於下界與上界（或反向時相反）之間進行線性插值。

使用 `repeat()` 時，動畫控制器會在給定的持續時間內於指定範圍內進行線性插值，但不會自動停止。

使用 `animateTo()` 時，動畫控制器會在給定的持續時間內，從當前值線性插值到指定目標。如果未指定持續時間，則會使用控制器的預設持續時間以及下界與上界描述的範圍來決定動畫速度。

使用 `fling()` 時，會用 `Force` 建立特定模擬，並用來驅動控制器。

使用 `animateWith()` 時，會用給定的模擬來驅動控制器。

這些方法都會回傳 `Ticker` 提供的 future，
該 future 會在控制器下次停止或更換模擬時完成。

#### 將 animatables 附加到動畫

將一個 `Animation<double>`（新父物件）傳給 `Animatable` 的
`animate()` 方法，會建立一個新的 `Animation` 子類別，該子類別的行為如同
`Animatable`，但由給定的父物件驅動。


[`addListener`]: {{site.api}}/flutter/animation/Animation/addListener.html
[`addStatusListener`]: {{site.api}}/flutter/animation/Animation/addStatusListener.html
[`AlwaysStoppedAnimation`]: {{site.api}}/flutter/animation/AlwaysStoppedAnimation-class.html
[`Animatable`]: {{site.api}}/flutter/animation/Animatable-class.html
[`animate`]: {{site.api}}/flutter/animation/Animatable/animate.html
[`AnimatedBuilder`]: {{site.api}}/flutter/widgets/AnimatedBuilder-class.html
[`AnimationController`]: {{site.api}}/flutter/animation/AnimationController-class.html
[`AnimatedWidget`]: {{site.api}}/flutter/widgets/AnimatedWidget-class.html
[`Animation`]: {{site.api}}/flutter/animation/Animation-class.html
[`AnimationStatus`]: {{site.api}}/flutter/animation/AnimationStatus.html
[`begin`]: {{site.api}}/flutter/animation/Tween/begin.html
[`BouncingScrollSimulation`]: {{site.api}}/flutter/widgets/BouncingScrollSimulation-class.html
[`build`]: {{site.api}}/flutter/widgets/AnimatedWidget/build.html
[`ClampingScrollSimulation`]: {{site.api}}/flutter/widgets/ClampingScrollSimulation-class.html
[`ColorTween`]: {{site.api}}/flutter/animation/ColorTween-class.html
[`Curve`]: {{site.api}}/flutter/animation/Curves-class.html
[`CurvedAnimation`]: {{site.api}}/flutter/animation/CurvedAnimation-class.html
[`end`]: {{site.api}}/flutter/animation/Tween/end.html
[`evaluate`]: {{site.api}}/flutter/animation/Animatable/evaluate.html
[`fling`]: {{site.api}}/flutter/animation/AnimationController/fling.html
[`forward`]: {{site.api}}/flutter/animation/AnimationController/forward.html
[`kAlwaysCompleteAnimation`]: {{site.api}}/flutter/animation/kAlwaysCompleteAnimation-constant.html
[`kAlwaysDismissedAnimation`]: {{site.api}}/flutter/animation/kAlwaysDismissedAnimation-constant.html
[`lerp`]: {{site.api}}/flutter/animation/Tween/lerp.html
[`RectTween`]: {{site.api}}/flutter/animation/RectTween-class.html
[`ReverseAnimation`]: {{site.api}}/flutter/animation/ReverseAnimation-class.html
[`scheduleFrameCallback()`]: {{site.api}}/flutter/scheduler/SchedulerBinding/scheduleFrameCallback.html
[`SchedulerBinding`]: {{site.api}}/flutter/scheduler/SchedulerBinding-mixin.html
[`setState`]: {{site.api}}/flutter/widgets/State/setState.html
[`Simulation`]: {{site.api}}/flutter/physics/Simulation-class.html
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[`stop`]: {{site.api}}/flutter/animation/AnimationController/stop.html
[`Ticker`]: {{site.api}}/flutter/scheduler/Ticker-class.html
[`Tween<T>`]: {{site.api}}/flutter/animation/Tween-class.html
[various concrete implementations]: {{site.api}}/flutter/physics/physics-library.html
