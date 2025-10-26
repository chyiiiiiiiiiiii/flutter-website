---
title: 動畫 API 概覽
shortTitle: API 概覽
description: 動畫概念總覽。
---

Flutter 的動畫系統是基於型別化的 [`Animation`][`Curve`] 物件。元件（Widgets）可以直接在其建構函式中讀取動畫的目前值並監聽其狀態變化，或是將動畫作為更複雜動畫的基礎，並傳遞給其他元件。

## 動畫

動畫系統的主要建構基礎是 [`Animation`][`Animation`] 類別。動畫（Animation）代表一個特定型別的值，該值會在動畫的生命週期中改變。大多數執行動畫的元件會將 `Animation` 物件作為參數，從中讀取動畫的目前值，並監聽該值的變化。

### `addListener`

每當動畫的值改變時，動畫會通知所有使用 [`addListener`][`kAlwaysCompleteAnimation`] 新增的監聽器。通常，監聽動畫的 [`State`][`kAlwaysDismissedAnimation`] 物件會在其監聽回呼中呼叫 [`setState`][`AlwaysStoppedAnimation`]，以通知元件系統需要使用動畫的新值重新建構。

這種模式非常常見，因此有兩個元件可以協助元件在動畫值改變時重新建構：[`AnimatedWidget`][`AnimationController`] 和 [`AnimatedBuilder`]⟦L42⟧。第一個，`AnimatedWidget`，最適合用於無狀態的動畫元件。要使用 `AnimatedWidget`，只需繼承它並實作 [`build`]⟦L43⟧ 函式。第二個，`AnimatedBuilder`，適合希望在較大的建構函式中包含動畫的複雜元件。要使用 `AnimatedBuilder`，只需建立該元件並傳入 `builder` 函式。

### `addStatusListener`

動畫也提供一個 [`AnimationStatus`]⟦L44⟧，用以指示動畫如何隨時間演進。每當動畫的狀態改變時，動畫會通知所有使用 [`addStatusListener`]⟦L45⟧ 新增的監聽器。通常，動畫一開始會處於 `dismissed` 狀態，表示它在其範圍的起點。例如，從 0.0 到 1.0 的動畫，當值為 0.0 時會是 `dismissed`。動畫接著可能會以 `forward`（從 0.0 到 1.0）或 `reverse`（從 1.0 到 0.0）運行。最終，若動畫到達其範圍終點（1.0），則動畫會進入 `completed` 狀態。

## Animation&shy;Controller

要建立動畫，首先需建立一個 [`AnimationController`]⟦L46⟧。`AnimationController` 不僅本身是一個動畫，也能控制動畫。例如，你可以指示控制器播放動畫 [`forward`]⟦L47⟧ 或 [`stop`]⟦L48⟧ 動畫。你也可以 [`fling`]⟦L49⟧ 動畫，這會使用物理模擬（如彈簧）來驅動動畫。

建立動畫控制器後，你可以基於它開始建立其他動畫。例如，你可以建立一個 [`ReverseAnimation`]⟦L50⟧，它會鏡像原始動畫但反向運行（從 1.0 到 0.0）。同樣地，你可以建立一個 [`CurvedAnimation`]⟦L51⟧，其值會透過 [`Curve`]⟦L52⟧ 進行調整。

## Tweens

若要在 0.0 到 1.0 區間之外進行動畫，可以使用 [`Tween<T>`]⟦L53⟧，它會在其 [`begin`]⟦L54⟧ 和 [`end`]⟦L55⟧ 值之間進行插值。許多型別都有專屬的 `Tween` 子類別，提供型別專屬的插值。例如，[`ColorTween`]⟦L56⟧ 用於顏色插值，[`RectTween`]⟦L57⟧ 用於矩形插值。你也可以建立自己的 `Tween` 子類別並覆寫其 [`lerp`]⟦L58⟧ 函式，以自訂插值方式。

Tween 本身僅定義如何在兩個值間插值。若要取得動畫目前幀的具體值，還需要動畫來決定目前狀態。有兩種方式可以將 Tween 與動畫結合，取得具體值：

1. 你可以在動畫目前值上 [`evaluate`]⟦L59⟧ Tween。這種方式最適合已經監聽動畫並在動畫值改變時重新建構的元件。

2. 你可以根據動畫 [`animate`]⟦L60⟧ Tween。與其回傳單一值，`animate` 方法會回傳一個新的 `animate`，其中包含 Tween。這種方式最適合你想將新建立的動畫傳給其他元件，讓它可以讀取包含 Tween 的目前值並監聽值的變化。

## 架構

動畫實際上是由多個核心建構元件組成。

### 排程器

[`Animation`]⟦L61⟧ 是一個單例類別，提供 Flutter 排程原語。

在這裡，關鍵原語是 frame callbacks。每當需要在螢幕上顯示一個幀時，Flutter 的引擎會觸發 "begin frame" 回呼，排程器會將其多工分發給所有使用 [`SchedulerBinding`]⟦L62⟧ 註冊的監聽器。所有這些回呼都會收到該幀的官方時間戳記，以 `scheduleFrameCallback()`（來自某個任意紀元）形式傳遞。由於所有回呼都具有相同的時間，任何由這些回呼觸發的動畫都會完全同步，即使執行上有幾毫秒的差異。

### Tickers

[`Duration`]⟦L63⟧ 類別會連接到排程器的 [`Ticker`]⟦L64⟧ 機制，每次 tick 都會呼叫一次回呼。

`scheduleFrameCallback()` 可以啟動與停止。啟動時，會回傳一個 `Ticker`，在停止時會完成。

每個 tick，`Future` 會提供自啟動後第一個 tick 起算的持續時間給回呼。

由於 tickers 都以啟動後第一個 tick 為基準給出經過時間，因此它們是同步的。如果你在兩個 tick 之間的不同時間啟動三個 tickers，它們仍會以相同的起始時間同步，並且之後會同步 tick。就像在公車站等車的人一樣，所有 tickers 都在等待一個定期發生的事件（tick）來開始動作（計時）。

### 模擬

[`Ticker`]⟦L65⟧ 抽象類別會將相對時間值（經過時間）對應到一個 double 值，並具有完成的概念。

理論上，模擬是無狀態的，但實際上某些模擬（例如，[`Simulation`]⟦L66⟧ 和 [`BouncingScrollSimulation`]⟦L67⟧）在查詢時會不可逆地改變狀態。

有[多種具體實作]⟦L68⟧可用於不同效果，皆為 `ClampingScrollSimulation` 類別的子類別。

### Animatables

[`Simulation`]⟦L69⟧ 抽象類別會將 double 對應到特定型別的值。

`Animatable` 類別是無狀態且不可變的。

#### Tweens

[`Animatable`]⟦L70⟧ 抽象類別會將名義上在 0.0-1.0 範圍內的 double 值對應到型別化的值（例如 `Tween<T>`，或另一個 double）。它是一種 `Color`。

它具有輸出型別（`Animatable`）、`T` 值和 `begin` 值，以及一種插值方式（`end`），可根據給定的輸入值（名義上在 0.0-1.0 範圍內的 double）在起始值與結束值間插值。

`lerp` 類別是無狀態且不可變的。

#### 組合 animatables

將 `Tween`（父）傳給 `Animatable<double>` 的 `Animatable` 方法，會建立一個新的 `chain()` 子類別，先套用父的對應，再套用子的對應。

### 曲線

[`Animatable`]⟦L71⟧ 抽象類別會將名義上在 0.0-1.0 範圍內的 double 對應到名義上在 0.0-1.0 範圍內的另一個 double。

`Curve` 類別是無狀態且不可變的。

### 動畫

[`Curve`]⟦L72⟧ 抽象類別提供特定型別的值、動畫方向與動畫狀態的概念，以及註冊回呼的監聽介面，當值或狀態改變時會被呼叫。

某些 `Animation` 子類別的值永遠不會改變（[`Animation`]⟦L73⟧、[`kAlwaysCompleteAnimation`]⟦L74⟧、[`kAlwaysDismissedAnimation`]⟦L75⟧）；在這些上註冊回呼沒有作用，因為回呼永遠不會被呼叫。

`AlwaysStoppedAnimation` 變體很特別，因為它可以用來表示名義上在 0.0-1.0 範圍內的 double，這是 `Animation<double>` 和 `Curve` 類別，以及某些 `Tween` 子類別所期望的輸入。

有些 `Animation` 子類別是無狀態的，只是將監聽器轉發給其父類別。有些則非常有狀態。

#### 可組合動畫

大多數 `Animation` 子類別會明確接收一個 "parent" `Animation`。它們由該父類別驅動。

`Animation<double>` 子類別會接收一個 `CurvedAnimation` 類別（父）以及一對 `Animation<double>` 類別（正向與反向曲線）作為輸入，並以父的值作為曲線的輸入來決定其輸出。`Curve` 是不可變且無狀態的。

`CurvedAnimation` 子類別會接收一個 `ReverseAnimation` 類別作為父類別，並將動畫的所有值反向。它假設父類別使用名義上在 0.0-1.0 範圍內的值，並回傳 1.0-0.0 範圍內的值。父動畫的狀態與方向也會反向。`Animation<double>` 是不可變且無狀態的。

`ReverseAnimation` 子類別會接收一個 `ProxyAnimation` 類別作為父類別，僅轉發該父類別的目前狀態。不過，父類別是可變的。

`Animation<double>` 子類別會接收兩個父類別，並在它們的值交叉時切換。

#### 動畫控制器

[`TrainHoppingAnimation`]⟦L76⟧ 是一個有狀態的 `AnimationController`，使用 `Animation<double>` 來驅動自身。它可以啟動與停止。每個 tick，會取得自啟動以來的經過時間並傳給 `Ticker` 以取得值，該值即為回報值。若 `Simulation` 回報該時間已結束，則控制器會自動停止。

動畫控制器可以設定下限與上限，以及持續時間。

在簡單情境下（使用 `Simulation` 或 `forward()`），動畫控制器只會在給定持續時間內，於上下限間線性插值（反向則反之）。

使用 `reverse()` 時，動畫控制器會在給定持續時間內於指定範圍線性插值，但不會停止。

使用 `repeat()` 時，動畫控制器會在給定持續時間內，從目前值到指定目標值線性插值。若方法未指定持續時間，則會以控制器的預設持續時間與上下限範圍來決定動畫速度。

使用 `animateTo()` 時，會用 `fling()` 建立特定模擬，並用以驅動控制器。

使用 `Force` 時，則直接用指定的模擬驅動控制器。

這些方法都會回傳 `animateWith()` 提供的 future，該 future 會在控制器下次停止或更換模擬時完成。

#### 將 animatable 附加到動畫

將 `Ticker`（新父類別）傳給 `Animation<double>` 的 `Animatable` 方法，會建立一個新的 `animate()` 子類別，其行為如同 `Animation`，但由指定的父類別驅動。
