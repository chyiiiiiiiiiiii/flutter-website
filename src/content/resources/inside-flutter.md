---
title: 深入 Flutter
description: 從創始工程師的角度，了解 Flutter 的內部運作機制。
---

本文檔說明了 Flutter 工具包的內部運作原理，這些設計使 Flutter 的 API 成為可能。由於 Flutter 元件（widgets）採用高度組合的方式構建，使用 Flutter 所建立的使用者介面通常包含大量的元件。為了支援這樣的工作負載，Flutter 在版面配置（layout）和元件構建上採用了次線性（sublinear）演算法，以及能夠高效進行樹狀結構操作的資料結構，並且進行了多項常數因子的優化。透過一些額外的設計細節，這種架構也讓開發者能夠輕鬆建立以回呼（callback）方式動態構建可見元件的無限滾動清單。

## 積極的組合性

Flutter 最具特色的其中一點，就是其「積極的組合性」（_aggressive composability_）。元件（widgets）是透過組合其他元件來構建的，而這些元件本身又是由更基礎的元件逐層組成。例如，`Padding` 是一個元件，而不是其他元件的屬性。因此，使用 Flutter 建立的使用者介面會包含非常多的元件。

元件構建的遞迴最終會落在 `RenderObjectWidgets`，這些元件會在底層的 _render_ 樹中建立節點。render 樹是一種儲存使用者介面幾何資訊的資料結構，這些資訊會在 _layout_ 階段計算，並在 _painting_ 及 _hit testing_ 時使用。大多數 Flutter 開發者不會直接撰寫 render objects，而是透過元件來操作 render 樹。

為了在元件層支援積極的組合性，Flutter 在元件和 render 樹層都採用了多種高效演算法與優化，以下各節將分別說明。

### 次線性版面配置

隨著元件和 render 物件數量增加，良好效能的關鍵在於高效的演算法。最重要的就是 _layout_（版面配置）效能，layout 演算法負責決定 render 物件的幾何資訊（例如大小和位置）。部分其他工具包採用 O(N²) 或更糟的 layout 演算法（例如，某些約束領域中的定點迭代）。Flutter 目標是在初次 layout 時達到線性效能，並在後續更新現有 layout 時達到 _次線性 layout 效能_。理想情況下，layout 所花費的時間應該比 render 物件數量成長得更慢。

Flutter 每一幀只執行一次 layout，且 layout 演算法僅需單一遍歷。_constraints_（約束）由父物件往下傳遞，呼叫每個子物件的 layout 方法。子物件會遞迴執行自己的 layout，然後再將 _geometry_（幾何資訊）回傳給父物件。重要的是，一旦 render 物件從其 layout 方法返回，在本幀的 layout 過程中就不會再被訪問[^1]，直到下一幀。這種方式將原本可能分開的「測量」和「版面配置」兩個階段合併為單一階段，因此每個 render 物件在 layout 時最多只會被訪問 _兩次_[^2]：一次在樹往下遞迴時，一次在往上回傳時。

Flutter 對這個通用協定有多種特化。最常見的特化是 `RenderBox`，它在二維笛卡兒座標系下運作。在 box layout 中，constraints 包含最小和最大寬度，以及最小和最大高度。layout 過程中，子物件會在這些範圍內選擇自己的大小。當子物件完成 layout 返回後，父物件才決定其在父座標系中的位置[^3]。請注意，子物件的 layout 不能依賴其位置，因為位置是在子物件返回 layout 後才決定。因此，父物件可以自由地重新定位子物件，而無需重新計算其 layout。

更一般而言，在 layout 過程中，_唯一_ 從父物件流向子物件的資訊是 constraints，而 _唯一_ 從子物件流向父物件的資訊是 geometry。這些不變性可以減少 layout 所需的工作量：

* 如果子物件沒有標記自己的 layout 為 dirty，且父物件給予的 constraints 與上次 layout 時相同，則子物件可以立即返回，終止遞迴。
* 每當父物件呼叫子物件的 layout 方法時，父物件會指示是否使用子物件回傳的 size 資訊。如果父物件不使用這些資訊（這種情況很常見），則即使子物件選擇了新的大小，父物件也不需重新計算 layout，因為可以保證新大小會符合既有 constraints。
* _Tight constraints_（緊密約束）是指只能被唯一一組 geometry 滿足的約束。例如，若 min 和 max 寬度相等，且 min 和 max 高度也相等，則唯一符合這些約束的 size 就是該寬高。如果父物件提供 tight constraints，即使父物件在 layout 中依賴子物件的 size，當子物件重新 layout 時，父物件也不需重新 layout，因為子物件在未獲得新 constraints 前無法改變 size。
* render 物件可以宣告其僅使用父物件提供的 constraints 來決定 geometry。這樣的宣告會通知框架：即使 constraints 不是 tight 的，且父物件的 layout 依賴子物件的 size，只要子物件未獲得新 constraints，父物件就不需重新 layout。

因此，當 render 物件樹中有 dirty 節點時，只有這些節點及其周圍有限的子樹會在 layout 時被訪問。

### 次線性元件構建

與 layout 演算法類似，Flutter 的 widget 構建演算法也是次線性的。元件構建完成後，會由 _element tree_（元素樹）保存，該樹保留了使用者介面的邏輯結構。element tree 是必要的，因為 widgets 本身是 _immutable_（不可變）的，這意味著它們不能記住與其他 widgets 的父子關係。element tree 同時保存了與 stateful widgets 相關聯的 _state_ 物件。

當使用者輸入（或其他刺激）發生時，element 可能會變 dirty，例如開發者呼叫了關聯 state 物件上的 `setState()`。框架會維護一個 dirty elements 清單，在 _build_ 階段直接跳至這些 dirty elements，跳過 clean elements。build 階段中，資訊是 _單向_ 往 element tree 下方流動，因此每個 element 在 build 階段最多只會被訪問一次。element 一旦被清理，就不會再次變 dirty，因為其所有 ancestor elements 也都是 clean[^4]。

由於 widgets 是 _immutable_，如果 element 未標記自己為 dirty，且 parent 用相同的 widget 重建該 element，則 element 可以立即返回，終止遞迴。此外，element 只需比較兩個 widget 參照的物件識別（object identity），即可判斷新舊 widget 是否相同。開發者常利用這項優化來實現 _reprojection_（重投影）模式，即 widget 將預先構建好的 child widget 作為成員變數存放於 build 中。

build 過程中，Flutter 也避免使用 `InheritedWidgets` 來遍歷 parent chain。如果 widgets 經常遍歷 parent chain，例如為了取得目前主題色，則 build 階段的效能會隨樹的深度達到 O(N²)，而由於積極組合，樹的深度可能很大。為了避免這種 parent walks，框架會在每個 element 維護一個 `InheritedWidget` 的雜湊表，並將資訊往 element tree 下方推送。通常，許多 elements 會引用同一個雜湊表，只有在引入新 `InheritedWidget` 的 element 處才會改變。

### 線性對帳

與一般認知不同，Flutter 並未採用 tree-diffing（樹狀差異）演算法。框架會獨立檢查每個 element 的 child list，使用 O(N) 演算法決定是否重用 elements。child list reconciliation 演算法針對以下情境進行優化：

* 舊的 child list 為空。
* 兩個 lists 完全相同。
* 有一處或多處 widgets 插入或移除。
* 若每個 list 都包含具有相同 key 的 widget[^5]，則這兩個 widgets 會被配對。

一般做法是比較兩個 child lists 的開頭和結尾，根據 widget 的執行時型別和 key 進行比對，可能會在兩個 lists 中間找到一段未配對的範圍。框架會將舊 list 範圍內的 children 依 key 存入雜湊表，然後遍歷新 list 範圍，根據 key 查詢雜湊表進行配對。未配對的 children 會被丟棄並重新構建，配對成功的則用新 widget 重建。

### 樹狀結構操作

重用 elements 對效能至關重要，因為 elements 擁有兩個關鍵資料：stateful widgets 的 state，以及底層的 render objects。當框架能重用 element 時，該邏輯部分的使用者介面 state 得以保留，先前計算的 layout 資訊也能重用，通常可以避免整個子樹的遍歷。事實上，重用 elements 如此重要，以至於 Flutter 支援 _非局部_ 樹狀結構變動，以保留 state 和 layout 資訊。

開發者可以透過將 `GlobalKey` 關聯到 widget 來進行非局部樹狀結構變動。每個 global key 在整個應用程式中都是唯一的，並註冊在特定執行緒的雜湊表中。build 階段，開發者可以將帶有 global key 的 widget 移動到 element tree 的任意位置。框架不會在新位置建立全新 element，而是查詢雜湊表，將現有 element 從原位置重新掛載到新位置，並保留整個子樹。

被重新掛載的子樹中的 render objects 能保留其 layout 資訊，因為在 render tree 中，唯一從 parent 流向 child 的資訊就是 layout constraints。新 parent 會因 child list 改變而標記為 dirty，但如果新 parent 給予 child 的 layout constraints 與舊 parent 相同，child 可以立即返回，終止遞迴。

global key 與非局部樹狀結構變動被開發者廣泛用於實現如 hero 動畫、導覽等效果。

### 常數因子優化

除了上述演算法優化外，實現積極組合性還仰賴多項重要的常數因子優化。這些優化在前述主要演算法的葉節點尤為重要。

* **子模型無關性。** 不同於多數工具包使用 child lists，Flutter 的 render tree 並不限定特定 child model。例如，`RenderBox` 類別有抽象的 `visitChildren()` 方法，而非具體的 `firstChild` 和 `nextSibling` 介面。許多子類僅支援單一 child，直接以成員變數保存，而非 child list。例如，`RenderPadding` 只支援單一 child，因此其 layout 方法更簡單，執行時間更短。

* **視覺 render tree，邏輯 widget tree。** 在 Flutter 中，render tree 運作於裝置無關的視覺座標系，這表示 x 座標較小的值永遠在左側，即使目前閱讀方向為由右至左。widget tree 通常運作於邏輯座標系，使用 _start_ 和 _end_ 值，其視覺意義依閱讀方向而定。邏輯座標至視覺座標的轉換在 widget tree 與 render tree 交接時進行。這種做法更有效率，因為 render tree 中的 layout 與 painting 計算比 widget-to-render tree 的交接更頻繁，可避免重複座標轉換。

* **文字由專屬 render object 處理。** 絕大多數 render objects 不需處理文字的複雜性。文字由專屬 render object `RenderParagraph` 處理，該物件是 render tree 的葉節點。開發者不需繼承具備文字處理能力的 render object，而是透過組合將文字納入介面。這種模式讓 `RenderParagraph` 只要 parent 提供相同的 layout constraints，就能避免重新計算文字 layout，這在 tree surgery 時很常見。

* **可觀察物件。** Flutter 同時採用 model-observation 和 reactive paradigms。雖然 reactive paradigm 為主流，但 Flutter 在某些葉節點資料結構上使用 observable model objects。例如，`Animation` 在值變更時通知 observer list。Flutter 會將這些 observable objects 從 widget tree 交接到 render tree，讓 render tree 直接觀察並僅在變更時使適當的管線階段失效。例如，`Animation<Color>` 的變更可能只觸發 painting 階段，而非同時觸發 build 與 paint。

綜合以上優化，在積極組合所產生的大型樹結構中，這些優化對效能有顯著提升。

### 元素樹與 RenderObject 樹的分離

Flutter 中的 `RenderObject` 與 `Element`（Widget）樹是同構的（嚴格來說，`RenderObject` 樹是 `Element` 樹的子集）。一個顯而易見的簡化方式是將這兩棵樹合併為一棵樹。然而，實際上分開這兩棵樹有多項好處：

* **效能。** 當 layout 改變時，只需遍歷 layout tree 的相關部分。由於組合性，element tree 通常會有更多額外節點，必須跳過。
* **清晰性。** 明確分離關注點，讓 widget protocol 和 render object protocol 可針對自身需求進行特化，簡化 API 表面，降低 bug 風險及測試負擔。
* **型別安全。** render object tree 可更具型別安全性，能於執行時保證 children 會是適當型別（每種座標系都有專屬 render object 型別）。composition widgets 可不關心 layout 時使用的座標系（例如同一 widget 可同時用於 box layout 和 sliver layout），因此在 element tree 中，若要驗證 render objects 的型別則需遍歷整棵樹。

## 無限滾動

無限滾動清單對許多工具包來說都是難題。Flutter 以簡單的介面支援無限滾動清單，這個介面基於 _builder_ 模式，⟦C22⟧ 會在滾動時透過回呼動態構建可見 widgets。支援這個功能需要 _viewport-aware layout_ 以及 _on-demand widget building_。

### Viewport-aware layout

如同 Flutter 的大多數設計，scrollable widgets 也是透過組合構建的。scrollable widget 的外層是 ⟦C23⟧，它是一個「內部比外部大」的 box，表示其 children 可以超出 viewport 邊界並可滾動進入可視範圍。然而，viewport 並非擁有 ⟦C24⟧ children，而是擁有 ⟦C25⟧ children，稱為 _slivers_，它們有一套 viewport-aware layout 協定。

sliver layout 協定與 box layout 協定結構相似，parent 將 constraints 傳遞給 children，並接收 geometry 作為回應。但兩者的 constraints
