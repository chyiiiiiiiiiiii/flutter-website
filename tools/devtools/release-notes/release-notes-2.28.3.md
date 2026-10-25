# DevTools 2.28.3 發行說明

> Dart 和 Flutter DevTools 2.28.3 版本的發行說明。



Dart 和 Flutter DevTools 2.28.3 版本
包含以下變更及其他一般性改進。
若想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

這是基於 DevTools 2.28.2 的 cherry-pick 發行版本。
若想了解 DevTools 2.28.2 所包含的改進，請閱讀
[發行說明](/tools/devtools/release-notes/release-notes-2.28.2)。

## 一般更新

* 在底部狀態列新增了「Dive in to DevTools」YouTube
  [影片](https://www.youtube.com/watch?v=_EYk-E29edo)的連結。
  此影片為每個 DevTools 螢幕提供簡短教學 (tutorial)。
  [#6554](https://github.com/flutter/devtools/pull/6554)

  ![連結至 DevTools 教學影片](/assets/images/docs/tools/devtools/release-notes/images-2.28.3/watch_tutorial_link.png "Link to watch a DevTools tutorial video")

* 新增修正方式以解決 VSCode 中複製按鈕的功能問題。- [#6598](https://github.com/flutter/devtools/pull/6598)

## 效能更新

* 因不支援 Impeller 後端，已停用 Raster Stats 工具。- [#6616](https://github.com/flutter/devtools/pull/6616)

## VS Code 側邊欄更新

* 當在 VS Code 使用淺色主題時，DevTools 所提供的內嵌側邊欄現在也會顯示為淺色主題。- [#6581](https://github.com/flutter/devtools/pull/6581)

## 完整提交紀錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.28.3)。

