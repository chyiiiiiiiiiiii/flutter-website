---
title: 偵錯網頁應用程式的效能
description: 學習如何使用 Chrome DevTools 偵錯網頁效能問題。
---

:::note
剖析 Flutter 網頁應用程式需要 Flutter 3.14 或以上版本。
:::

Flutter 框架在建構畫面、繪製場景以及追蹤其他活動（如垃圾回收）時，會發出時間軸事件。這些事件會在[Chrome DevTools 效能面板][Chrome DevTools performance panel]中公開，供偵錯使用。

:::note
若需優化網頁載入速度的相關資訊，請參考 Medium 上的（免費）文章：[Best practices for optimizing Flutter web loading speed][article]。

[article]: {{site.flutter-medium}}/best-practices-for-optimizing-flutter-web-loading-speed-7cc0df14ce5c
:::

你也可以使用 `dart:developer` [Timeline][Timeline] 與 [TimelineTask][TimelineTask] API，自行發出時間軸事件，以進行更深入的效能分析。

[Chrome DevTools performance panel]: https://developer.chrome.com/docs/devtools/performance
[Timeline]: {{site.api}}/flutter/dart-developer/Timeline-class.html
[TimelineTask]: {{site.api}}/flutter/dart-developer/TimelineTask-class.html

![Chrome DevTools 效能面板的螢幕截圖](/assets/images/docs/tools/devtools/chrome-devtools-performance-panel.png)

## 可選旗標以增強追蹤

若要設定要追蹤哪些時間軸事件，請在應用程式的 `main` 方法中，將下列任一頂層屬性設為 `true`。

- [debugProfileBuildsEnabled][debugProfileBuildsEnabled]：為每個建構的 `Widget` 新增 `Timeline` 事件。
- [debugProfileBuildsEnabledUserWidgets][debugProfileBuildsEnabledUserWidgets]：為每個使用者建立的 `Widget` 新增 `Timeline` 事件。
- [debugProfileLayoutsEnabled][debugProfileLayoutsEnabled]：為每個 `RenderObject` 版面配置新增 `Timeline` 事件。
- [debugProfilePaintsEnabled][debugProfilePaintsEnabled]：為每個繪製的 `RenderObject` 新增 `Timeline` 事件。

[debugProfileBuildsEnabled]: {{site.api}}/flutter/widgets/debugProfileBuildsEnabled.html
[debugProfileBuildsEnabledUserWidgets]: {{site.api}}/flutter/widgets/debugProfileBuildsEnabledUserWidgets.html
[debugProfileLayoutsEnabled]: {{site.api}}/flutter/rendering/debugProfileLayoutsEnabled.html
[debugProfilePaintsEnabled]: {{site.api}}/flutter/rendering/debugProfilePaintsEnabled.html

## 操作說明

1. _[可選]_ 在應用程式的 main 方法中，將所需的追蹤旗標設為 true。
2. 以[效能分析模式（profile mode）][profile mode]執行你的 Flutter 網頁應用程式。
3. 為你的應用程式開啟 [Chrome DevTools 效能面板][Chrome DevTools Performance panel]，並[開始錄製][start recording]以擷取時間軸事件。

[start recording]: https://developer.chrome.com/docs/devtools/performance/#record

[profile mode]: /testing/build-modes#profile
[Chrome DevTools performance panel]: https://developer.chrome.com/docs/devtools/performance
