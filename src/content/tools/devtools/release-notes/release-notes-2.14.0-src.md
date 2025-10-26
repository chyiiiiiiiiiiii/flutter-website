# DevTools 2.14.0 發行說明

Dart 與 Flutter DevTools 2.14.0 版本
包含以下變更及其他一般性改進。
想進一步瞭解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 在「關於 DevTools」對話框中新增了連結至全新 DevTools
  [Discord 頻道](https://discord.com/channels/608014603317936148/958862085297672282)
  -
  [#4102](https://github.com/flutter/devtools/pull/4102)

  ![about-devtools](/assets/images/docs/tools/devtools/release-notes/images-2.14.0/image1.png "about devtools")

## 網路（Network）更新

* 在網路分析工具（network profiler）中，為選取的請求新增了
  「Copy as URL」及「Copy as cURL」動作
  （特別感謝 [@jankuss](https://github.com/jankuss)！）-
  [#4113](https://github.com/flutter/devtools/pull/4113)

  ![network-request-copy-actions](/assets/images/docs/tools/devtools/release-notes/images-2.14.0/image2.png "network request copy actions")

## Flutter 檢查器（inspector）更新

* 新增設定，可控制當滑鼠懸停於檢查器中的元件（Widget）時，
  是否在懸浮卡片中顯示其屬性與數值 -
  [#4090](https://github.com/flutter/devtools/pull/4090)

## 除錯器（Debugger）更新

* 在主控台（console）中新增自動完成建議
  （特別感謝 [@jankuss](https://github.com/jankuss)！）-
  [#4062](https://github.com/flutter/devtools/pull/4062)

  ![auto-complete-suggestions](/assets/images/docs/tools/devtools/release-notes/images-2.14.0/image3.png "auto complete suggestions")

* 新增選項，可複製所選函式庫的完整檔案路徑 -
  [#4147](https://github.com/flutter/devtools/pull/4147)
* 修正除錯器例外選單的格式問題 -
  [#4066](https://github.com/flutter/devtools/pull/4066)

## 記憶體（Memory）更新

* 修正 heap tree 檢視中記憶體數值的格式顯示問題 -
  [#4153](https://github.com/flutter/devtools/pull/4153)
* 修正導致 GC 事件無法顯示於記憶體圖表的錯誤 -
  [#4131](https://github.com/flutter/devtools/pull/4131)

## 效能（Performance）更新

* 當應用程式處於 profile 模式時，於
  「更多除錯選項」（More Debugging Options）選單中警告使用者，
  渲染層級切換功能無法使用 -
  [#4075](https://github.com/flutter/devtools/pull/4075)

## 完整提交記錄

如需查閱自前一版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.13.1...v2.14.0)。
