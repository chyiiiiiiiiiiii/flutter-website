---
title: Flutter 的運作原理
description: >-
  透過六集影片系列，深入了解 Flutter 的運作原理。
layout: tutorial
---

<Stepper level="2">

## Flutter 的架構 {:#architecture}


<div class="video-wrapper">
  <YouTubeEmbed id="0Xn1QhNtPkQ" title="How Flutter Works" fullWidth />
</div>

歡迎收看「Flutter 的運作原理」第一集。
這是一個六集系列，旨在探索你將 Dart 程式碼交付給 Flutter 框架後，
背後究竟發生了什麼事。
本集從高層次角度介紹 Flutter 的架構，
涵蓋宣告式程式碼、跨平台框架，
以及 Dart 在其中扮演的角色。
這支影片非常適合剛開始研究 Flutter、
想要了解整體架構的開發者。

## 元件 (Widget) 與三棵樹 {:#three-trees}

<div class="video-wrapper">
  <YouTubeEmbed id="xiW3ahr4CRU" title="The three trees" fullWidth />
</div>

深入探索 Flutter 架構中的三棵主要樹狀結構：`Widget`、`Element` 與 `RenderObject`。
了解元件如何為 Flutter 開發者提供宣告式 API，
並觀察 Element 如何將元件與渲染層串接在一起。
你也將學到 RenderObject 在將元件屬性值轉換為繪製呼叫時所扮演的角色。

## State 物件與其生命週期 {:#state}

<div class="video-wrapper">
  <YouTubeEmbed id="FP737UMx7ss" title="The state class" fullWidth />
</div>

「Flutter 的運作原理」第三集深入探討 `State` 類別——
每個 `StatefulWidget` 背後的核心機制。
跟著我們走過 `State` 物件的完整生命週期，
從初始化資源的 `initState`，
到清理資源的 `dispose`。
途中，我們還會探索重要方法，
包括 `didChangeDependencies`、`didUpdateWidget`，
以及至關重要的 `build` 方法。
看完本集後，你將理解 `State` 物件如何追蹤、
回應並管理 Flutter 應用程式中的變更，
以及 `State` 生命週期如何實現高效的 UI 更新。

本集也揭開了 Flutter 在 `setState` 呼叫後
如何遞迴遍歷元件樹的神秘面紗，
僅重新建置應用程式中需要變更的部分。
你將了解為何 `const` 建構函式對效能很重要、
為何 `setState` 的閉包必須是同步的，
以及 Element（而非元件本身）如何管理實際的重建流程。
如果你好奇 Flutter 如何讓應用程式保持快速流暢，
或者只是想真正了解幕後發生了什麼，
本集涵蓋了所有不可或缺的基礎知識。

## 真正負責渲染的元件 {:#render-object-widgets}

<div class="video-wrapper">
  <YouTubeEmbed id="zcJlHVVM84I" title="The RenderObjectWidget" fullWidth />
</div>

你是否曾好奇 Flutter 應用程式究竟是如何渲染到螢幕上的？
本集深入介紹 `RenderObjectWidget`——Flutter 中唯一
會實際建立視覺內容的元件類型。
無狀態元件與有狀態元件幫助你建構應用程式的結構，
但真正將 UI 程式碼轉換為實際像素的，
卻是 RenderObject 元件。

你將了解 Flutter 如何建置
`Widget`、`Element` 與 `RenderObject` 三棵樹，
為何許多常見元件不會直接渲染任何東西，
以及 Flutter 如何使用 `RenderObjectWidget`
來建立並更新驅動 UI 的 RenderObject。

## RenderObject 的一天 {:#render-objects}

<div class="video-wrapper">
  <YouTubeEmbed id="EuG12bebwac" title="A day in the life of a RenderObject" fullWidth />
</div>

在「Flutter 的運作原理」第五集中，Craig 帶我們走過
`RenderObject` 的完整一天。
延續第四集的概念，
本集說明 RenderObject 的核心職責：
版面配置、繪製、命中測試與無障礙功能。Craig 揭示了
約束條件如何沿著渲染樹向下傳遞、尺寸如何向上回傳，
以及父 RenderObject 如何設定子項的位置。
他也拆解了 `layout`、`paint` 與 `describeSemanticsConfiguration`
等關鍵方法，
說明它們如何協同運作，讓 UI 保持回應靈敏且精準。

## Flutter 引擎與嵌入器 {:#engine}

<div class="video-wrapper">
  <YouTubeEmbed id="Y2aBMjWVv2Y" title="The Flutter Engine and Embedders" fullWidth />
</div>

在「Flutter 的運作原理」第六集中，Craig 帶我們
深入 Dart 程式碼之下，探索 Flutter 引擎與嵌入器。
本集說明 Flutter 行動應用程式如何依賴
原生 Android 與 iOS 程式碼來啟動與運作，
Flutter 引擎如何將你的 Dart 程式碼與宿主平台連接，
以及嵌入器如何促進兩者之間的溝通。
Craig 也介紹了新建 Flutter 專案的結構，
深入探討 Flutter 應用程式中的執行緒管理，
並說明平台通道與 [Pigeon][] 套件的角色。

你還將了解 Flutter 引擎為何以 C++ 而非 Dart 撰寫、
它如何從 Chrome 的分支演進而來，
以及它如何使用 Skia 或 Impeller 來渲染每一幀。
本集最後展望 Flutter 未來的架構改進，
目標是進一步簡化原生互通機制。
如果你想對 Flutter 應用程式的底層運作建立清晰的心智模型，
這是將所有層次串連起來的最佳方式。

[Pigeon]: {{site.pub-pkg}}/pigeon

</Stepper>
