---
title: 多個 Flutter 螢幕或視圖
shortTitle: 新增多個 Flutter
description: >
  如何在您的應用程式中整合多個 Flutter 引擎、螢幕或視圖。
---

## 使用情境

如果您正在將 Flutter 整合到現有應用程式中，
或是逐步將現有應用程式遷移至 Flutter，
您可能會希望在同一個專案中加入多個
Flutter 實例。這在以下情境中特別有用：

* 應用程式中，整合的 Flutter 螢幕不是導覽圖的葉節點，
  導覽堆疊可能是原生 -> Flutter -> 原生 -> Flutter 的混合結構。
* 某個螢幕同時整合並顯示多個部分螢幕的 Flutter 視圖。

使用多個 Flutter 實例的優點在於，每個
實例都是獨立的，並維護自己的內部導覽堆疊、UI 及應用程式狀態。
這簡化了整體應用程式程式碼對狀態管理的責任，並提升模組化程度。
有關多個 Flutter 實例使用動機的更多細節，請參考
[flutter.dev/go/multiple-flutters][]。

Flutter 已針對這種情境進行最佳化，新增額外 Flutter 實例的
增量記憶體成本很低（約 180kB）。
這個固定成本的降低，使您在 add-to-app 整合時能更靈活地採用多個 Flutter 實例的模式。

## 元件

在 Android 與 iOS 上新增多個 Flutter 實例的主要 API
是基於新的 `FlutterEngineGroup` 類別（[Android API][]、[iOS API][]），
用來建立 `FlutterEngine`，而非先前使用的 `FlutterEngine`
建構子。

雖然 `FlutterEngine` API 較為直接且易於使用，
但由同一個 `FlutterEngineGroup` 派生的 `FlutterEngine`
具有效能上的優勢，能共享許多常用、可重複利用的資源，例如 GPU
context、字型度量及 isolate group snapshot，帶來更快的初次渲染延遲與更低的記憶體佔用。

* 由 `FlutterEngineGroup` 派生的 `FlutterEngine`
   可用於連接 UI 類別，例如 [`FlutterActivity`][] 或 [`FlutterViewController`][]，
   其方式與一般建構的快取 `FlutterEngine` 相同。

* 從 `FlutterEngineGroup` 派生的第一個 `FlutterEngine`
  不需要持續存活，只要任何時刻至少有一個存活的 `FlutterEngine`，
  後續的 `FlutterEngine` 仍可共享資源。

* 從 `FlutterEngineGroup` 建立的第一個 `FlutterEngine`，
  其[效能特性][performance characteristics]與先前使用建構子建立 `FlutterEngine` 相同。

* 當來自同一 `FlutterEngineGroup` 的所有 `FlutterEngine` 都被銷毀後，
  下一個建立的 `FlutterEngine` 會與最初建立引擎時有相同的效能特性。

* `FlutterEngineGroup` 本身不需要比所有已派生的引擎存活更久。
  銷毀 `FlutterEngineGroup` 不會影響現有已派生的 `FlutterEngine`，
  但會失去派生更多可與現有引擎共享資源的 `FlutterEngine` 的能力。

## 溝通

Flutter 實例之間的溝通是透過[平台通道][platform channels]
（或 [Pigeon][]），經由主機平台來處理。如需查看我們在溝通上的規劃藍圖，
或其他關於增強多個 Flutter 實例的計畫，請參考
[Issue 72009][]。

## 範例

您可以在 [GitHub][] 上找到同時展示如何在 Android 與 iOS
使用 `FlutterEngineGroup` 的範例。

<DashImage figure image="development/add-to-app/multiple-flutters-sample.webp" alt="A sample demonstrating multiple-Flutters" />

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
