---
title: 宣告式 UI 簡介
shortTitle: 宣告式 UI
description: 說明宣告式與命令式程式設計風格的差異。
---

<?code-excerpt path-base="get-started/flutter-for/declarative"?>

_本簡介將說明 Flutter 採用的宣告式（declarative）風格，與許多其他 UI 框架所使用的命令式（imperative）風格之間的概念差異。_

## 為什麼選擇宣告式 UI？

從 Win32 到 Web、Android 及 iOS 等框架，通常都採用命令式的 UI 程式設計風格。這可能是你最熟悉的風格——你會手動建立一個功能完整的 UI 實體，例如 UIView 或類似物件，並在 UI 狀態改變時，透過方法與 setter 來修改它。

為了減輕開發者在不同 UI 狀態間切換時，必須手動編寫過渡邏輯的負擔，Flutter 採用不同的方式：讓開發者描述當前的 UI 狀態，並將狀態過渡的細節交由框架處理。

然而，這需要你在操作 UI 的思維上做出些許轉變。

## 如何在宣告式框架中變更 UI

請參考下方這個簡化的範例：

<img src="/assets/images/docs/declarativeUIchanges.png"
  alt="View B（由 View A 包含）從包含兩個視圖 c1 和 c2，變成只包含視圖 c3。">

在命令式風格中，你通常會到 ViewB 的擁有者那裡，透過 selector 或 `findViewById` 等方式取得 `b` 的實例，然後對其進行修改（並隱含地使其失效）。例如：

```java
// Imperative style
b.setColor(red)
b.clearChildren()
ViewC c3 = new ViewC(...)
b.add(c3)
```

你可能也需要在 ViewB 的建構函式（constructor）中複製這個設定，因為 UI 的真實資料來源（source of truth）可能比 `b` 實例本身存活得更久。

在宣告式（declarative）風格中，視圖設定（例如 Flutter 的元件 (Widget)s）是不可變的，且僅是輕量的「藍圖」。若要變更 UI，元件（Widget）會觸發自身重建（在 Flutter 中，最常見的方式是在 `StatefulWidgets` 上呼叫 `setState`），並建立一個新的 `Widget` 子樹。

<?code-excerpt "lib/main.dart (declarative)"?>
```dart
// Declarative style
return ViewB(color: red, child: const ViewC());
```

在這裡，當 UI 發生變化時，Flutter 並不是去修改舊的實例 `b`，而是建立新的 `Widget` 實例。框架透過 [`RenderObjects`][] 在背後管理許多傳統 UI 物件的職責（例如維護版面配置（layout）的狀態）。`RenderObject` 是一個持久且可變的物件，負責處理版面配置、繪製（painting）及點擊測試（hit testing）等繁重工作。`RenderObject` 在不同畫面幀之間持續存在，而 Flutter 輕量級且不可變的 `Widget` 則作為藍圖，告訴框架在不同狀態間對 `RenderObject` 進行修改。剩下的部分則由 Flutter 框架自動處理。

[`RenderObjects`]: /resources/glossary#renderobject
