---
title: 適應式應用程式的一般實作方法
description: >-
  關於如何讓你的 Flutter 應用程式具備適應性的通用建議。
shortTitle: 一般實作方法
---

<?code-excerpt path-base="ui/adaptive_app_demos"?>

那麼，究竟該如何將一個為傳統行動裝置設計的應用程式，
變得在各種不同裝置上都能展現美觀的介面？需要哪些步驟？

Google 工程師們在為大型應用程式進行這類改造時，
建議採用以下三步驟的方法。

## 步驟 1：抽象化

![步驟 1：將資訊抽象化，適用於任何 UI 元件](/assets/images/docs/ui/adaptive-responsive/abstract.png)

首先，找出你打算讓其具備動態調整能力的元件 (Widget)。
分析這些元件的建構子，並將可以共用的資料抽象化。

常見需要適應性的元件包括：

* 對話框（Dialog），包含全螢幕與模態對話框
* 導覽 UI，包括側邊導覽軌（rail）與底部導覽列（bottom bar）
* 自訂版面配置，例如「UI 區域是較高還是較寬？」

舉例來說，在 `Dialog` 元件中，你可以共用包含對話框_內容_的資訊。

又或者，你希望當應用程式視窗較小時切換為 `NavigationBar`，
當視窗較大時則切換為 `NavigationRail`。這些元件很可能會共用一份可導覽目的地的清單。
在這種情況下，你可以建立一個 `Destination` 元件來保存這些資訊，
並將 `Destination` 設計為同時包含圖示與文字標籤。

接下來，你將需要評估螢幕尺寸，以決定如何呈現 UI。

## 步驟 2：測量

![步驟 2：如何測量螢幕尺寸](/assets/images/docs/ui/adaptive-responsive/measure.png)

你有兩種方式可以判斷顯示區域的大小：
`MediaQuery` 與 `LayoutBuilder`。

### MediaQuery

過去，你可能會使用 `MediaQuery.of` 來判斷裝置螢幕的尺寸。
然而，現今裝置的螢幕尺寸與形狀多樣，
這種判斷方式可能會產生誤導。

舉例來說，假設你的應用程式目前只佔據大型螢幕上的一個小視窗。
如果你使用 `MediaQuery.of` 方法，並認定螢幕很小
（實際上只是應用程式顯示在大螢幕上的小視窗），
而且你又將應用程式鎖定為直向模式，
這會導致應用程式視窗被鎖定在螢幕中央，
四周都是黑色區域。
這在大螢幕上顯然不是理想的 UI 呈現。

:::note
Material Guidelines 建議你**不要**將應用程式鎖定為直向模式（停用橫向模式）。
但如果你真的有必要這麼做，
至少要讓直向模式同時支援正向與倒向顯示。
:::

請注意，`MediaQuery.sizeOf` 回傳的是應用程式整個螢幕的當前尺寸，
而不僅僅是單一元件的尺寸。

你有兩種方式可以測量螢幕空間。
你可以根據需求選擇 `MediaQuery.sizeOf` 或 `LayoutBuilder`，
取決於你需要的是整個應用程式視窗的尺寸，還是更局部的尺寸。

如果你希望元件即使在應用程式視窗很小時也能全螢幕顯示，
請使用 `MediaQuery.sizeOf`，這樣你可以根據應用程式視窗本身的尺寸來選擇 UI。
在前述情境中，你會希望根據整個應用程式視窗來決定尺寸行為，
因此應使用 `MediaQuery.sizeOf`。

:::secondary 為什麼要用 `MediaQuery.sizeOf` 而不是 `MediaQuery.of`？
先前的建議是使用 `MediaQuery` 的 `of` 方法
來取得應用程式視窗的尺寸。
為什麼建議改變了？
簡單來說，**是為了效能考量。**

`MediaQuery` 包含大量資料，但如果你只關心尺寸屬性，
使用 `sizeOf` 方法會更有效率。這兩種方法都會以邏輯像素（又稱為_密度無關像素_）回傳應用程式視窗的尺寸。
邏輯像素尺寸通常最適合，因為在各種裝置上視覺大小大致相同。
`MediaQuery` 類別也針對各自的屬性提供了專門的方法，原因也是為了效能。
:::

如果你在 `build` 方法內請求應用程式視窗尺寸，例如 `MediaQuery.sizeOf(context)`，
當尺寸屬性變化時，給定的 `BuildContext` 會被重新建置。

### LayoutBuilder

`LayoutBuilder` 與 `MediaQuery.sizeOf` 目標相似，但有一些差異。

`LayoutBuilder` 不是提供應用程式視窗的尺寸，
而是提供來自父層 `Widget` 的版面配置限制（layout constraints）。
這表示你取得的是元件樹中特定位置的尺寸資訊，
也就是你放置 `LayoutBuilder` 的那個地方。
此外，`LayoutBuilder` 回傳的是 `BoxConstraints` 物件，而不是 `Size` 物件，
因此你會取得內容的有效寬度與高度範圍（最小與最大值），
而不只是固定尺寸。
這對於自訂元件來說非常實用。

舉例來說，假設你有一個自訂元件，希望其尺寸根據分配給該元件的空間來決定，
而不是依據整個應用程式視窗。
這種情境下，請使用 `LayoutBuilder`。

## 步驟 3：分支

![步驟 3：根據所需 UI 分支程式碼](/assets/images/docs/ui/adaptive-responsive/branch.png)

此時，你必須決定在選擇 UI 版本時要採用哪些尺寸斷點（breakpoints）。
例如，[Material layout][] 指南建議，
當視窗寬度小於 600 邏輯像素時使用底部導覽列（bottom nav bar），
寬度大於或等於 600 像素時則使用導覽軌（nav rail）。
同樣地，你的選擇不應該取決於裝置_類型_，
而是依據裝置可用的視窗尺寸。

[Material layout]: https://m3.material.io/foundations/layout/applying-layout/window-size-classes

若想參考一個在 `NavigationRail` 與 `NavigationBar` 之間切換的範例，
請參閱[使用 Material 3 建立動畫響應式應用程式版面][codelab]。

[codelab]: {{site.codelabs}}/codelabs/flutter-animated-responsive-layout

下一頁將說明如何確保你的應用程式在大螢幕與摺疊裝置上也能有最佳呈現。
