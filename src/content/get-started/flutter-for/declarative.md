---
title: 宣告式 UI 簡介
shortTitle: 宣告式 UI
description: 說明宣告式與命令式程式設計風格之間的差異。
---

<?code-excerpt path-base="get-started/flutter-for/declarative"?>

_本簡介將說明 Flutter 採用的宣告式（Declarative）風格，與許多其他 UI 框架所使用的命令式（Imperative）風格之間的概念差異。_

## 為什麼要使用宣告式 UI？

從 Win32 到 Web、Android 以及 iOS 的框架，通常都採用命令式的 UI 程式設計風格。這可能是你最熟悉的風格——你會手動建立一個功能完整的 UI 實體，例如 UIView 或類似物件，當 UI 需要變化時，再透過方法與 setter 來修改它。

為了減輕開發者在不同 UI 狀態間轉換時需要手動編寫轉換邏輯的負擔，Flutter 採取了不同的做法。Flutter 讓開發者只需描述當前的 UI 狀態，並將狀態轉換的細節交由框架處理。

然而，這也需要你在操作 UI 時稍微轉換思維方式。

## 如何在宣告式框架中變更 UI

請參考下方的簡化範例：

<img src="/assets/images/docs/declarativeUIchanges.png" alt="View B (contained by view A) morphs from containing two views, c1 and c2, to containing only view c3.">

在命令式風格中，你通常會到 ViewB 的擁有者那裡，透過 selector 或 `findViewById` 等方式取得 `b` 的實例，然後對其進行修改（並隱含地使其失效）。例如：

```java
// Imperative style
b.setColor(red)
b.clearChildren()
ViewC c3 = new ViewC(...)
b.add(c3)
```

你可能也需要在 ViewB 的建構函式中複製這個設定，因為 UI 的真實資料來源（source of truth）可能比 `b` 實例本身存活得更久。

在宣告式（declarative）風格中，視圖設定（例如 Flutter 的元件 (Widgets)）是不可變的，且僅僅是輕量級的「藍圖」。若要變更 UI，元件 (Widget) 會觸發自身的重建（最常見的方式是在 Flutter 的 StatefulWidgets 上呼叫 `setState()`），並建立一個新的元件 (Widget) 子樹。

<?code-excerpt "lib/main.dart (declarative)"?>
```dart
// Declarative style
return ViewB(color: red, child: const ViewC());
```

在這裡，當 UI 發生變化時，Flutter 並不是去改變舊的實例 `b`，  
而是建立新的 Widget 實例。

這個框架在幕後利用 RenderObjects 來管理許多傳統 UI 物件的責任（例如維護版面配置的狀態）。

RenderObjects 會在不同畫面幀之間持續存在，而 Flutter 輕量級的 Widgets 則告訴框架在不同狀態間去改變 RenderObjects。

其餘的部分則由 Flutter 框架自動處理。

