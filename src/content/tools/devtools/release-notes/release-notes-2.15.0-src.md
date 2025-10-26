# DevTools 2.15.0 發行說明

Dart 與 Flutter DevTools 2.15.0 版本
除了其他一般性改進外，還包含以下變更。
如需進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* DevTools 2.15 版本針對所有 DevTools 中的表格（記錄檢視、網路分析器、CPU 分析器等）進行了改進 -
  [#4175](https://github.com/flutter/devtools/pull/4175)

## 效能更新

* 在 Raster Metrics 工具中，為每個顯示的圖層新增了外框 -
  [#4192](https://github.com/flutter/devtools/pull/4192)

  ![raster-metrics-layer-outlines](/assets/images/docs/tools/devtools/release-notes/images-2.15.0/image1.png "raster metrics layer outlines")

* 修正載入離線資料時的錯誤 -
  [#4189](https://github.com/flutter/devtools/pull/4189)

## 網路相關更新

* 為網路回應新增了具備語法高亮的 JSON 檢視器 -
  [#4167](https://github.com/flutter/devtools/pull/4167)

  ![network-response-json-viewer](/assets/images/docs/tools/devtools/release-notes/images-2.15.0/image2.png "network response json viewer")

* 新增複製網路回應的功能 -
  [#4190](https://github.com/flutter/devtools/pull/4190)

## 記憶體相關更新

* 可從 DevTools 頁腳選擇不同的 isolate -
  [#4173](https://github.com/flutter/devtools/pull/4173)
* 自動快照功能現可作為可設定選項 -
  [#4200](https://github.com/flutter/devtools/pull/4200)

## CPU 分析器

* 停止在分析器表格中手動截斷來源 URI -
  [#4166](https://github.com/flutter/devtools/pull/4166)

## 完整提交記錄

如需查閱自上個版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.14.0...v2.15.0)。
