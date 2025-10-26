# DevTools 2.30.0 版本發行說明

Dart 與 Flutter DevTools 2.30.0 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 效能更新

* 在 Flutter Frames 圖表中新增渲染引擎指示器。-
  [#6771](https://github.com/flutter/devtools/pull/6771)

  ![Flutter rendering engine text](/assets/images/docs/tools/devtools/release-notes/images-2.30.0/flutter_frames_engine_text.png "Text describing the current flutter rendering engine")

* 當無法取得 Flutter frame 的分析資料時，改善提示訊息。- [#6768](https://github.com/flutter/devtools/pull/6768)

## VS Code 側邊欄更新

* 提供給 VS Code 的 Flutter 側邊欄現在具備啟用新平台的能力，
  如果有裝置可用於目前專案尚未啟用的平台，則可直接啟用。
  此功能同時需要對應的 Dart 擴充功能（extension）於 VS Code 更新後才會顯示。- [#6688](https://github.com/flutter/devtools/pull/6688)

* 側邊欄中的 DevTools 選單現在新增「Open in Browser」項目，
  即使 VS Code 設定為預設使用內嵌 DevTools，也能在外部瀏覽器視窗中開啟 DevTools。- [#6736](https://github.com/flutter/devtools/pull/6736)

## 完整提交記錄

如需本次版本的完整變更列表，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.30.0)。
