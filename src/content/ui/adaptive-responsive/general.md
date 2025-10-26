---
title: 適應式應用程式的一般實作方式
description: >-
  關於如何讓你的 Flutter 應用程式具備適應性的通用建議。
shortTitle: 一般實作方式
---

<?code-excerpt path-base="ui/adaptive_app_demos"?>

那麼，究竟該如何將一個原本為傳統行動裝置設計的應用程式，
讓它在各種不同裝置上都能展現美觀的介面？需要哪些步驟？

曾經為大型應用程式進行過這類調整的 Google 工程師，建議採用以下三步驟：

## 步驟 1：抽象化

![步驟 1：將通用資訊抽象化以供任何 UI 元件（Widget）使用](/assets/images/docs/ui/adaptive-responsive/abstract.png)

首先，找出你計畫要動態化的元件（Widgets）。
分析這些元件的建構子，並將可共用的資料抽象化。

常見需要具備適應性的元件包括：

* 對話框（Dialog），包含全螢幕與模態對話框
* 導覽 UI，包含導覽軌（rail）與底部導覽列（bottom bar）
* 自訂版面配置，例如「UI 區域是較高還是較寬？」

舉例來說，在`Dialog`元件中，你可以共用包含對話框_內容_的資訊。

或者，你可能希望在應用程式視窗較小時切換為`NavigationBar`，
而在視窗較大時切換為`NavigationRail`。
這些元件很可能會共用一份可導覽目的地的清單。
在這種情況下，你可以建立一個`Destination`元件來儲存這些資訊，
並指定`Destination`同時包含圖示與文字標籤。

接下來，你需要評估螢幕尺寸，以決定如何呈現 UI。

## 步驟 2：量測

![步驟 2：如何量測螢幕尺寸](/assets/images/docs/ui/adaptive-responsive/measure.png)

你有兩種方式可以判斷顯示區域的大小：`MediaQuery` 與 `LayoutBuilder`。

### MediaQuery

過去，你可能會使用`MediaQuery.of`來判斷裝置螢幕的尺寸。
然而，現今裝置的螢幕尺寸與形狀多樣，
這種判斷方式可能會產生誤導。

舉例來說，也許你的應用程式目前只佔據大螢幕上的一個小視窗。
如果你使用`MediaQuery.of`方法並判斷螢幕很小
（事實上只是應用程式顯示在大螢幕上的一個小視窗），
而你又將應用程式鎖定為直向顯示，這會導致
應用程式的視窗被固定在螢幕中央，四周則是黑色區塊。
這在大螢幕上顯然不是理想的 UI 呈現方式。

:::note
Material Guidelines 建議你**不要**將應用程式鎖定為直向顯示（即禁用橫向模式）。
但如果你認為確實有必要，至少要讓直向模式同時支援「正向」與「反向」顯示。
:::

請注意，`MediaQuery.sizeOf` 回傳的是應用程式整個螢幕的目前尺寸，
而不僅僅是單一元件的尺寸。

你有兩種方式可以量測螢幕空間。
你可以根據需求選擇`MediaQuery.sizeOf`或`LayoutBuilder`，
取決於你想取得整個應用程式視窗的尺寸，還是更區域性的尺寸。

如果你希望元件即使在應用程式視窗很小時也能全螢幕顯示，
請使用`MediaQuery.sizeOf`，這樣你就可以根據應用程式視窗本身的大小來選擇 UI。
在前一節中，你希望根據整個應用程式視窗來決定尺寸行為，
因此會使用`MediaQuery.sizeOf`。

:::secondary 為什麼要用`MediaQuery.sizeOf`而不是`MediaQuery.of`？
過去的建議是使用`of`方法
（`MediaQuery`）來取得應用程式視窗的尺寸。
為什麼這個建議會改變？
簡單來說，**是為了效能考量。**

`MediaQuery`包含大量資料，但如果你只關心尺寸屬性，
使用`sizeOf`方法會更有效率。這兩種方法
都會以邏輯像素（又稱_密度無關像素_）回傳應用程式視窗的尺寸。
邏輯像素尺寸通常效果最佳，因為在所有裝置上視覺大小大致相同。
`MediaQuery`類別也針對每個屬性提供了專用函式，理由相同。
:::

如果你在`build`方法內部（如`MediaQuery.sizeOf(context)`）請求應用程式視窗的尺寸，
那麼每當尺寸屬性變化時，該`BuildContext`都會重新建構。

### LayoutBuilder

`LayoutBuilder`與`MediaQuery.sizeOf`有相似的目標，但也有一些差異。

`LayoutBuilder`不是提供應用程式視窗的尺寸，
而是提供來自父層`Widget`的版面配置限制（constraints）。
這表示你取得的是元件樹中特定位置的尺寸資訊，
也就是你加入`LayoutBuilder`的那個位置。
此外，`LayoutBuilder`回傳的是`BoxConstraints`物件，而不是`Size`物件，
因此你會取得內容的有效寬度與高度範圍（最小與最大值），
而不僅僅是固定尺寸。
這對於自訂元件來說非常實用。

舉例來說，假設你有一個自訂元件，希望尺寸根據
分配給該元件的空間來決定，而不是整個應用程式視窗。
這種情境下，請使用`LayoutBuilder`。

## 步驟 3：分支

![步驟 3：根據所需 UI 分支程式碼](/assets/images/docs/ui/adaptive-responsive/branch.png)

此時，你必須決定在選擇顯示哪一種 UI 版本時，
要採用哪些尺寸斷點（breakpoints）。
例如，[Material layout][Material layout] 指南建議，
當視窗寬度小於 600 邏輯像素時使用底部導覽列（bottom nav bar），
而寬度大於或等於 600 像素時則使用導覽軌（nav rail）。
同樣地，你的選擇不應該依賴於裝置的_類型_，
而是依據裝置可用的視窗尺寸。

[Material layout]: https://m3.material.io/foundations/layout/applying-layout/window-size-classes

如果你想參考一個在`NavigationRail`與`NavigationBar`之間切換的範例，
請參考[使用 Material 3 建立動畫響應式應用程式版面][codelab]。

[codelab]: {{site.codelabs}}/codelabs/flutter-animated-responsive-layout

下一頁將說明如何確保你的應用程式在大螢幕與可摺疊裝置上有最佳呈現。

