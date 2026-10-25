# 提升繪製效能

> 如何衡量與評估您的應用程式繪製效能。



::: note
若要瞭解如何使用 **Performance View**
（Flutter DevTools 的一部分）
來除錯效能問題，
請參閱 [使用 Performance 檢視][Using the Performance view]。
:::

[Using the Performance view]: /tools/devtools/performance


在應用程式中繪製動畫（Animation）是效能量測時最常被提及的主題之一。
多虧了 Flutter 的 Skia 引擎以及其能夠快速建立與銷毀元件（Widget）的能力，
Flutter 應用程式預設就具有良好的效能，
因此您只需避免常見的陷阱，即可達到卓越的效能表現。

## 一般建議

如果您發現動畫出現卡頓（不流暢），請**務必**在以 _profile_ 模式建置的應用程式下進行效能分析。
Flutter 預設的建置會產生 _debug_ 模式的應用程式，
這並不能反映正式發佈時的效能。
如需更多資訊，請參閱 [Flutter 的建置模式][Flutter's build modes]。

幾個常見的陷阱：

* 每一幀重建的 UI 遠超過預期。要追蹤元件重建情況，請參閱[顯示效能資料][Show performance data]。
* 直接建立大量 `children` 清單，而不是使用 ListView。

如需更多關於效能評估及常見陷阱的資訊，
請參閱以下文件：

* [效能最佳實踐][Performance best practices]
* [Flutter 效能分析][Flutter performance profiling]

## 僅限行動裝置的建議

您是否在行動裝置應用程式上，僅在動畫首次執行時發現明顯的卡頓？為避免這種情況，請確保您正在使用 Flutter 預設的圖形渲染器 [Impeller][]。

[Impeller]: /perf/impeller

## 僅限網頁的建議

以下系列文章涵蓋了 Flutter Material 團隊在提升 Flutter Gallery 應用程式網頁效能時的經驗：

* [透過 tree shaking 與延遲載入優化 Flutter Web 應用程式效能][shaking]
* [利用圖片預留區、預先快取與停用導覽轉場提升感知效能][images]
* [打造高效能的 Flutter 元件][Building performant Flutter widgets]


[Building performant Flutter widgets]: https://blog.flutter.dev/building-performant-flutter-widgets-3b2558aa08fa
[Flutter's build modes]: /testing/build-modes
[Flutter performance profiling]: /perf/ui-performance
[images]: https://blog.flutter.dev/improving-perceived-performance-with-image-placeholders-precaching-and-disabled-navigation-6b3601087a2b
[Performance best practices]: /perf/best-practices
[shaking]: https://blog.flutter.dev/optimizing-performance-in-flutter-web-apps-with-tree-shaking-and-deferred-loading-535fbe3cd674
[Show performance data]: /tools/android-studio#show-performance-data

