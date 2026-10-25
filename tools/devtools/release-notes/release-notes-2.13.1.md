# DevTools 2.13.1 發行說明

> Dart 與 Flutter DevTools 2.13.1 版本的發行說明。



Dart 與 Flutter DevTools 2.13.1 版本
包含以下變更，以及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 此版本進行了大量的程式碼清理與技術債減少。
  最顯著的更新是我們已完成遷移至 sound null safety。
* 在 IDE 內嵌版本的 DevTools 中顯示發行說明 -
  [#4053](https://github.com/flutter/devtools/pull/4053)
* DevTools 頁尾的細節優化 -
  [#3989](https://github.com/flutter/devtools/pull/3989),
  [#4026](https://github.com/flutter/devtools/pull/4026),
  [#4041](https://github.com/flutter/devtools/pull/4041),
  [#4076](https://github.com/flutter/devtools/pull/4076)

## 效能相關更新

* 新增協助你偵錯 Flutter 應用程式中 raster jank 的功能。
  此功能允許你對應用程式目前顯示的螢幕進行快照，
  並依圖層分解該場景的渲染時間。
  這有助於你找出場景中耗費大量 rasterize 成本的部分 -
  [#4046](https://github.com/flutter/devtools/pull/4046)

  ![raster-metrics-feature](/assets/images/docs/tools/devtools/release-notes/images-2.13.1/image1.png "raster metrics feature")

* 為「Track Widget Builds」新增範圍設定，
  讓你可以指定是否僅追蹤你自己的程式碼中的元件 (Widget) 建立，
  或是追蹤所有程式碼中的元件建立 -
  [#4010](https://github.com/flutter/devtools/pull/4010)

  ![track-widget-builds-scope-setting](/assets/images/docs/tools/devtools/release-notes/images-2.13.1/image2.png "track widget builds scope setting")

## CPU 分析器更新

* 在 CPU 分析器的「Source」欄位中，改用 package URI 取代 file URI -
  [#3932](https://github.com/flutter/devtools/pull/3932)

## 除錯器更新

* 修正除錯器中斷點的捲動錯誤 -
  [#4074](https://github.com/flutter/devtools/pull/4074)

## Flutter 檢查器更新

* 在 Layout Explorer 中新增支援顯示大於 5 的 flex 值 -
  [#4055](https://github.com/flutter/devtools/pull/4055)

## 完整提交紀錄

若要查看自前一版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.12.2...v2.13.1)。

