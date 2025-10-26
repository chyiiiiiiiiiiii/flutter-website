---
title: 多個 Flutter 螢幕或視圖
shortTitle: 新增多個 Flutter
description: >
  如何在您的應用程式中整合多個
  Flutter 引擎、螢幕或視圖實例。
---

## 使用情境

如果您正在將 Flutter 整合到現有應用程式中，
或是逐步將現有應用程式遷移至使用 Flutter，
您可能會希望在同一個專案中新增多個
Flutter 實例。
這在以下情境中特別有用：

* 應用程式中，整合的 Flutter 螢幕不是導覽圖（navigation graph）的葉節點，導覽堆疊可能是原生 -> Flutter -> 原生 -> Flutter 的混合結構。
* 某個螢幕上，可能同時整合並顯示多個部分螢幕的 Flutter 視圖。

使用多個 Flutter 實例的優點在於，每個
實例都是獨立的，並維護自己的內部導覽堆疊、UI 和應用程式狀態。這簡化了整體應用程式程式碼對狀態管理的負擔，並提升模組化程度。更多關於多個 Flutter 使用情境的細節，請參考
[flutter.dev/go/multiple-flutters][flutter.dev/go/multiple-flutters]。

Flutter 已針對這種情境進行最佳化，新增額外 Flutter 實例的增量記憶體成本極低（約 180kB）。這種固定成本的降低，讓您在 add-to-app 整合時可以更靈活地使用多個 Flutter 實例模式。

## 元件

在 Android 與 iOS 上新增多個 Flutter 實例的主要 API，
是基於新的 `FlutterEngineGroup` 類別（[Android API][Android API]、[iOS API][iOS API]）
來建立 `FlutterEngine`，而不是先前所用的 `FlutterEngine`
建構子。

雖然 `FlutterEngine` API 直接且易於使用，
但由同一個 `FlutterEngineGroup` 派生的 `FlutterEngine`
具有效能上的優勢，能夠共用許多常見且可重複利用的資源，例如 GPU
內容、字型度量、isolate group snapshot，這帶來更快的初始渲染延遲與更低的記憶體佔用。

* 由 `FlutterEngineGroup` 派生的 `FlutterEngine` 可用於
   連接到 UI 類別，例如 [`FlutterActivity`][`FlutterActivity`] 或 [`FlutterViewController`][`FlutterViewController`]，
   其用法與一般建構的快取 `FlutterEngine` 相同。

* 從 `FlutterEngineGroup` 派生的第一個 `FlutterEngine` 不需要
  持續存活，只要隨時至少有 1 個存活的 `FlutterEngine`，
  後續的 `FlutterEngine` 仍可共用資源。

* 從 `FlutterEngineGroup` 建立的第一個 `FlutterEngine`，
  其[效能特性][performance characteristics]與先前使用建構子建立
  `FlutterEngine` 相同。

* 當某個 `FlutterEngineGroup` 的所有 `FlutterEngine` 都被銷毀後，
  下一個建立的 `FlutterEngine` 會與最初的引擎有相同的效能特性。

* `FlutterEngineGroup` 本身不需要比所有已派生的引擎存活更久。
  銷毀 `FlutterEngineGroup` 不會影響現有已派生的
  `FlutterEngine`，但會失去再派生可共用資源的
  `FlutterEngine` 的能力。

## 溝通

Flutter 實例間的溝通是透過主機平台上的 [平台通道（platform channels）][platform channels]
(or [Pigeon][Pigeon]) 來處理。若想了解我們在溝通或多 Flutter 實例增強上的規劃，請參考
[Issue 72009][Issue 72009]。

## 範例

您可以在 [GitHub][GitHub] 上找到展示如何在 Android 與 iOS 使用 `FlutterEngineGroup` 的範例。

{% render docs/app-figure.md, image:"development/add-to-app/multiple-flutters-sample.webp", alt:"A sample demonstrating multiple-Flutters" %}

[GitHub]: {{site.repo.samples}}/tree/main/add_to_app/multiple_flutters
[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html
[`FlutterViewController`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html
[performance characteristics]: /add-to-app/performance
[flutter.dev/go/multiple-flutters]: /go/multiple-flutters
[Issue 72009]: {{site.repo.flutter}}/issues/72009
[Pigeon]: {{site.pub}}/packages/pigeon
[platform channels]: /platform-integration/platform-channels
[Android API]: https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/engine/FlutterEngineGroup.java
[iOS API]: https://cs.opensource.google/flutter/engine/+/main:shell/platform/darwin/ios/framework/Headers/FlutterEngineGroup.h
