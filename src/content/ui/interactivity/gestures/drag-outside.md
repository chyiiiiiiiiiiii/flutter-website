---
title: 拖曳至應用程式外部
description: 如何從一個應用程式拖曳到另一個應用程式或作業系統。
---

你可能會想要在你的應用程式中實作
拖放（drag and drop）功能。

你有幾種潛在的實作方式可以選擇。
一種是直接使用 Flutter 元件（Widgets），
另一種則是使用一個套件
（[super_drag_and_drop][super_drag_and_drop]），可在 [pub.dev][pub.dev] 上取得。

[pub.dev]: {{site.pub}}
[super_drag_and_drop]: {{site.pub-pkg}}/super_drag_and_drop

## 在應用程式內建立可拖曳元件

如果你想要在應用程式內部實作拖放功能，
你可以使用 [`Draggable`][`Draggable`] 元件。關於這種做法的詳細說明，
請參考 [在應用程式內拖曳 UI 元素][Drag a UI element within an app] 教學。

使用 `Draggable` 和 `DragTarget` 的優點在於，
你可以提供 Dart 程式碼來決定是否接受拖放。

如需更多資訊，請參考
[`Draggable` widget of the week][video] 影片。

[Drag a UI element within an app]: /cookbook/effects/drag-a-widget
[`Draggable`]:  {{site.api}}/flutter/widgets/Draggable-class.html
[`DragTarget`]: {{site.api}}/flutter/widgets/DragTarget-class.html
[local data]: {{site.pub-api}}/super_drag_and_drop/latest/super_drag_and_drop/DragItem/localData.html
[video]: https://youtu.be/q4x2G_9-Mu0?si=T4679e90U2yrloCs

## 實作跨應用程式的拖放功能

如果你想要實作不僅在應用程式內部，
還能在你的應用程式與其他（可能不是 Flutter）應用程式之間
進行拖放，請參考 [super_drag_and_drop][super_drag_and_drop] 套件。

為了避免需要分別實作兩種拖放樣式
（應用程式外部拖曳與應用程式內部拖曳），
你可以提供 [local data][local data] 給該套件，
以在你的應用程式內部執行拖曳。

這種做法與直接使用 `Draggable` 的另一個差異在於，
你必須事先告知套件你的應用程式能接受哪些資料，
因為平台 API 需要同步回應，這不允許框架提供非同步回應。

這種方式的優點是能同時支援桌面、行動裝置，_以及_ 網頁平台。
