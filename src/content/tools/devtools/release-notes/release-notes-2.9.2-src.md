# DevTools 2.9.2 發行說明

Dart 與 Flutter DevTools 2.9.2 版本
包含以下變更及其他一般性改進。
若想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 歡迎參加我們的 2022 DevTools 問卷調查！請提供您的回饋，協助我們提升
  您的開發體驗。此問卷提示將於二月中旬直接在 DevTools 中顯示。

  ![survey prompt](/assets/images/docs/tools/devtools/release-notes/images-2.9.2/image1.png "survey_prompt")

  *注意*：如果您在開啟問卷時遇到問題，請確保您已升級至最新的 Flutter 穩定版 2.10。
  DevTools 先前有一個錯誤（已於
  [#3574](https://github.com/flutter/devtools/pull/3574)
  修正），導致無法開啟問卷，除非您已升級至 Flutter 2.10，否則此錯誤仍會存在。_

* 一般錯誤修正與改進 -
  [#3528](https://github.com/flutter/devtools/pull/3528)、
  [#3531](https://github.com/flutter/devtools/pull/3531)、
  [#3532](https://github.com/flutter/devtools/pull/3532)、
  [#3539](https://github.com/flutter/devtools/pull/3539)

## 效能更新

* 在 Flutter 畫格圖表的 x 軸新增畫格編號 -
  [#3526](https://github.com/flutter/devtools/pull/3526)

  ![frame numbers](/assets/images/docs/tools/devtools/release-notes/images-2.9.2/image2.png "frame_numbers")

## 除錯器（Debugger）更新

* 修正 Debugger 中的檔案總管（File Explorer）在熱重啟（hot restart）後未顯示內容的錯誤 -
  [#3527](https://github.com/flutter/devtools/pull/3527)

## 完整提交歷史

若需查詢自上個版本以來的完整變更列表，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.9.1...v2.9.2)。
