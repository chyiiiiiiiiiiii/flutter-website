---
title: 深入了解 Flutter
description: 從創始工程師的角度，了解 Flutter 的內部運作原理。
---

本文檔說明了 Flutter 工具包的內部運作原理，這些設計使 Flutter 的 API 得以實現。由於 Flutter 元件（widgets）採用高度組合（aggressive composition）的方式構建，使用 Flutter 所打造的使用者介面會包含大量的元件。為了支援這樣的工作負載，Flutter 在版面配置（layout）和元件建構上採用了次線性（sublinear）演算法，以及能高效進行樹狀結構操作的資料結構，並且進行了多項常數因子的最佳化（constant-factor optimizations）。透過一些額外的細節，這種設計也讓開發者能夠輕鬆地利用回呼（callback）建立僅顯示於使用者畫面上的元件，從而實現無限滾動清單。

## 積極的組合性

Flutter 最顯著的特點之一就是其 _積極的組合性_（aggressive composability）。元件（widgets）是由其他元件組合而成，而這些元件又是由更基礎的元件逐層構建。例如，`Padding` 是一個元件，而不是其他元件的屬性。因此，使用 Flutter 建構的使用者介面會由非常多的元件組成。

元件建構的遞迴最終會落在 `RenderObjectWidgets`，這些元件會在底層的 _render_ 樹上建立節點。render 樹是一種資料結構，用來儲存使用者介面的幾何資訊，這些資訊會在 _layout_ 階段計算，並於 _painting_（繪製）及 _hit testing_（點擊測試）時使用。大多數 Flutter 開發者不會直接撰寫 render 物件，而是透過元件來操作 render 樹。

為了在元件層支援積極的組合性，Flutter 在元件層與 render 樹層都採用了多種高效的演算法與最佳化，以下各節將分別說明。

### 次線性版面配置

當元件與 render 物件數量龐大時，良好效能的關鍵在於高效的演算法。其中最重要的是 _layout_（版面配置）效能，也就是決定 render 物件幾何資訊（例如尺寸與位置）的演算法。有些工具包採用 O(N²) 或更差的版面配置演算法（例如某些限制條件領域的定點迭代）。Flutter 目標是在初次版面配置時達到線性效能，並在後續更新既有版面配置時，於常見情境下達到 _次線性_ 效能。理想情況下，layout 所花費的時間應該隨 render 物件數量增加而成長得更慢。

Flutter 每一幀只執行一次 layout，且 layout 演算法僅需單一遍歷。_constraints_（限制條件）會由父物件往下傳遞，父物件會對每個子物件呼叫 layout 方法。子物件會遞迴執行自身的 layout，然後透過從 layout 方法返回的方式，將 _geometry_（幾何資訊）往上傳回樹狀結構。重要的是，一旦 render 物件從其 layout 方法返回，在該幀的 layout 階段結束前，該 render 物件不會再次被訪問[^1]。這種方式將原本可能分開的測量（measure）與 layout 階段合併為單一遍歷，因此每個 render 物件在 layout 階段 _最多只會被訪問兩次_[^2]：一次是往下傳遞時，一次是往上傳回時。

Flutter 對這個通用協議有多種專門化。最常見的是 `RenderBox`，它在二維笛卡兒座標下運作。在 box layout 中，constraints 是最小與最大寬度、最小與最大高度。在 layout 過程中，子物件會在這些範圍內選擇自己的尺寸。當子物件 layout 完成返回後，父物件會決定子物件在父座標系中的位置[^3]。請注意，子物件的 layout 不能依賴於其位置，因為位置要等到子物件 layout 返回後才決定。因此，父物件可以自由地重新定位子物件，而無需重新計算其 layout。

更一般來說，在 layout 過程中，從父到子的 _唯一_ 資訊是 constraints，從子到父的 _唯一_ 資訊是 geometry。這些不變性（invariants）可以減少 layout 所需的工作量：

* 如果子物件沒有將自身的 layout 標記為 dirty，且父物件給予的 constraints 與上次 layout 相同，則子物件可以立即從 layout 返回，終止遍歷。
* 每當父物件呼叫子物件的 layout 方法時，父物件會指示是否會使用子物件返回的尺寸資訊。如果父物件不需要尺寸資訊（這種情況很常見），那麼即使子物件選擇了新的尺寸，只要新尺寸符合現有 constraints，父物件也無需重新計算 layout。
* _Tight_ constraints 指的是只有一組有效 geometry 可以滿足的 constraints。例如，若 min 與 max 寬度相等、min 與 max 高度相等，則唯一滿足這些 constraints 的尺寸就是該寬高。如果父物件提供 tight constraints，則即使父物件 layout 依賴於子物件尺寸，當子物件重新計算 layout 時，父物件也無需重新 layout，因為子物件在未獲得新 constraints 前無法改變尺寸。
* Render 物件可以宣告它僅使用父物件提供的 constraints 來決定自身 geometry。這樣的宣告會通知框架，當子物件重新 layout 時，即使 constraints 不是 tight、即使父物件 layout 依賴於子物件尺寸，父物件也無需重新 layout，因為子物件在未獲得新 constraints 前無法改變尺寸。

這些最佳化的結果是，當 render 物件樹中有 dirty 節點時，只有這些節點及其周圍有限的子樹會在 layout 過程中被訪問。

### 次線性元件建構

與 layout 演算法類似，Flutter 的元件建構演算法也是次線性的。元件建構完成後，會由 _element 樹_ 持有，這個樹保留了使用者介面的邏輯結構。element 樹是必要的，因為元件本身是 _不可變_ 的（immutable），這意味著它們無法記住與其他元件的父子關係。element 樹同時也持有與 stateful 元件相關聯的 _state_ 物件。

當用戶輸入（或其他刺激）發生時，element 可能會變成 dirty，例如開發者在相關 state 物件上呼叫 `setState()`。框架會維護一個 dirty element 清單，並在 _build_ 階段直接跳到這些 dirty element，跳過乾淨（clean）的 element。在 build 階段，資訊會 _單向_ 地往下傳遞 element 樹，因此每個 element 在 build 階段最多只會被訪問一次。當 element 清理完畢後，不會再次變 dirty，因為根據歸納法，其所有祖先 element 也都是乾淨的[^4]。

由於元件是 _不可變_ 的，如果 element 沒有將自己標記為 dirty，當父物件用相同的元件重建 element 時，element 可以立即從 build 返回，終止遍歷。此外，element 只需比較兩個元件參考的物件識別（object identity），即可確認新舊元件是否相同。開發者會利用這項最佳化來實現 _reprojection_ 模式，即元件將預先建構好的子元件作為成員變數，並在 build 時直接使用。

在 build 過程中，Flutter 也會避免遍歷父鏈（parent chain），例如使用 `InheritedWidgets`。如果元件經常遍歷父鏈，例如為了取得當前主題色彩，build 階段的複雜度會因樹的深度而達到 O(N²)，而積極組合會讓樹的深度相當大。為避免這種父鏈遍歷，框架會在每個 element 維護一個 `InheritedWidget` 的雜湊表，將資訊往下推送。通常，許多 element 會參考同一個雜湊表，只有在引入新 `InheritedWidget` 的 element 處才會變更。

### 線性對帳

與常見認知相反，Flutter 並未採用樹狀差異（tree-diffing）演算法。相反地，框架會針對每個 element 獨立檢查其子清單，並使用 O(N) 演算法決定是否重用 element。子清單對帳演算法針對以下情境進行最佳化：

* 舊的子清單為空。
* 兩個清單完全相同。
* 清單中某一處有一個或多個元件插入或移除。
* 如果每個清單都包含具有相同 key 的元件[^5]，則這兩個元件會被配對。

一般做法是，透過比較每個元件的執行階段型別與 key，將兩個子清單的開頭與結尾配對，可能會在中間找到一個非空區間，包含所有未配對的子元件。框架會將舊子清單中該區間的子元件依 key 放入雜湊表，然後遍歷新子清單的區間，根據 key 查詢雜湊表以尋找配對。未配對的子元件會被丟棄並重新建構，而已配對的則會用新元件重建。

### 樹狀結構手術

重用 element 對效能至關重要，因為 element 擁有兩項關鍵資料：stateful 元件的 state 以及底層 render 物件。當框架能夠重用 element 時，該邏輯部分的 state 會被保留，先前計算的 layout 資訊也能重複使用，通常能避免整個子樹的遍歷。事實上，重用 element 如此重要，以至於 Flutter 支援 _非區域性_（non-local）的樹狀結構變動，以保留 state 與 layout 資訊。

開發者可以將 `GlobalKey` 關聯到自己的元件上，來進行非區域性樹狀結構變動。每個 global key 在整個應用程式中都是唯一的，並會註冊到特定執行緒的雜湊表中。在 build 階段，開發者可以將帶有 global key 的元件移動到 element 樹的任意位置。此時，框架不會在新位置建立新的 element，而是查詢雜湊表，將現有的 element 從原位置重新掛載到新位置，並保留整個子樹。

被重新掛載的子樹中的 render 物件能夠保留其 layout 資訊，因為在 render 樹中，從父到子的唯一資訊是 layout constraints。新的父物件會因子清單變動而被標記為 layout dirty，但如果新父物件給予子物件與舊父物件相同的 layout constraints，子物件可以立即從 layout 返回，終止遍歷。

Global key 與非區域性樹狀結構變動被開發者廣泛用於實現 hero 動畫、頁面導航等效果。

### 常數因子最佳化

除了這些演算法層級的最佳化之外，實現積極組合性還仰賴數個重要的常數因子最佳化。這些最佳化在前述主要演算法的葉節點處最為關鍵。

* **不依賴特定子模型。** 與大多數工具包採用子清單不同，Flutter 的 render 樹並未綁定特定的子模型。例如，`RenderBox` 類別有一個抽象的 `visitChildren()` 方法，而非具體的 `firstChild` 與 `nextSibling` 介面。許多子類僅支援單一子物件，直接以成員變數持有，而非子清單。例如，`RenderPadding` 僅支援單一子物件，因此擁有更簡單、執行更快的 layout 方法。
* **視覺 render 樹與邏輯元件樹分離。** 在 Flutter 中，render 樹運作於裝置無關的視覺座標系統中，這意味著 x 座標較小的值永遠在左側，即使當前閱讀方向為從右至左。元件樹則通常運作於邏輯座標系統中，使用 _start_ 和 _end_ 值，其視覺解讀取決於閱讀方向。從邏輯座標到視覺座標的轉換發生在元件樹與 render 樹之間的交接處。這種做法更有效率，因為 render 樹中的 layout 與繪製計算比元件到 render 樹的交接發生得更頻繁，能避免重複座標轉換。
* **文字由專門的 render 物件處理。** 絕大多數 render 物件不需處理文字的複雜性。文字由專門的 render 物件 `RenderParagraph` 處理，該物件是 render 樹的葉節點。開發者不需繼承支援文字的 render 物件，而是透過組合將文字納入介面。這種模式讓 `RenderParagraph` 只要父物件提供相同的 layout constraints，即可避免重新計算文字 layout，這在樹狀結構手術時也很常見。
* **可觀察物件。** Flutter 同時採用 model-observation 與 reactive（反應式）兩種範式。雖然 reactive 為主流，但 Flutter 在某些葉節點資料結構中仍採用可觀察模型物件。例如，`Animation` 在其值變更時會通知觀察者清單。Flutter 會將這些可觀察物件從元件樹傳遞到 render 樹，render 樹直接觀察它們，並在變更時僅使適當的管線階段失效。例如，`Animation<Color>` 的變更可能只觸發 paint 階段，而不會同時觸發 build 與 paint 階段。

這些最佳化加總起來，對於由積極組合產生的大型樹狀結構，能顯著提升效能。

### Element 樹與 RenderObject 樹的分離

Flutter 中的 `RenderObject` 與 `Element`（Widget）樹是同構的（嚴格來說，`RenderObject` 樹是 `Element` 樹的子集）。一個明顯的簡化方式是將這兩棵樹合併為一棵樹。然而，實務上將這兩棵樹分開有多項好處：

* **效能。** 當 layout 發生變化時，只需遍歷 layout 樹的相關部分。由於組合性，element 樹常常包含許多需要略過的額外節點。
* **清晰性。** 明確的職責分離讓元件協定與 render 物件協定都能針對各自需求進行專門化，簡化 API 介面，降低 bug 風險與測試負擔。
* **型別安全。** Render 物件樹能更安全地檢查型別，因為可於執行時保證子物件型別正確（每種座標系統都有自己的 render 物件型別）。組合元件可不關心 layout 時所用的座標系統（例如同一元件可同時用於 box layout 與 sliver layout），因此若要在 element 樹中驗證 render 物件型別，需進行樹狀遍
