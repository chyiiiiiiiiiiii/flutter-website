---
title: 提升繪製效能
description: 如何衡量與評估您的應用程式繪製效能。
---

{% render docs/performance.md %}

在應用程式中繪製動畫（Animation）是效能評測時最常被關注的主題之一。
這多虧於 Flutter 的 Skia 引擎，以及其能夠快速建立與銷毀元件（Widgets）的能力，
Flutter 應用程式預設就具有良好的效能，
因此只需避免常見的陷阱，即可達到極佳的效能表現。

## 一般建議

如果您發現動畫（Animation）出現卡頓（不流暢），請**務必**在以 _profile_ 模式建置的應用程式中進行效能分析。
Flutter 預設的建置會產生 _debug_ 模式的應用程式，這並不能反映最終釋出的效能。
如需更多資訊，請參閱 [Flutter 的建置模式][Flutter's build modes]。

幾個常見的陷阱包括：

* 每一幀重建的 UI 遠超過預期。要追蹤元件（Widgets）重建情形，請參閱 [顯示效能資料][Show performance data]。
* 直接建立大量 `children` 清單，而不是使用 ListView。

如需更多關於效能評估與常見陷阱的資訊，請參閱下列文件：

* [效能最佳實踐][Performance best practices]
* [Flutter 效能分析][Flutter performance profiling]

## 僅限行動裝置的建議

您是否只在行動裝置應用程式的動畫（Animation）首次執行時看到明顯的卡頓？為避免這種情況，請確保您正在使用 Flutter 預設的圖形渲染器 [Impeller][Impeller]。

[Impeller]: /perf/impeller

## 僅限網頁的建議

以下系列文章介紹 Flutter Material 團隊在提升 Flutter Gallery 應用程式網頁版效能時的經驗：

* [透過 tree shaking 與延遲載入優化 Flutter 網頁應用程式效能][shaking]
* [利用圖片預留區、預先快取與停用導覽轉場提升感知效能][images]
* [打造高效能的 Flutter 元件（Widgets）][Building performant Flutter widgets]


[Building performant Flutter widgets]: {{site.flutter-medium}}/building-performant-flutter-widgets-3b2558aa08fa
[Flutter's build modes]: /testing/build-modes
[Flutter performance profiling]: /perf/ui-performance
[images]: {{site.flutter-medium}}/improving-perceived-performance-with-image-placeholders-precaching-and-disabled-navigation-6b3601087a2b
[Performance best practices]: /perf/best-practices
[shaking]: {{site.flutter-medium}}/optimizing-performance-in-flutter-web-apps-with-tree-shaking-and-deferred-loading-535fbe3cd674
[Show performance data]: /tools/android-studio#show-performance-data
