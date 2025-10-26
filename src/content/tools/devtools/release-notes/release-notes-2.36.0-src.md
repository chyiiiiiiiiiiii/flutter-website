# DevTools 2.36.0 版本發行說明

Dart 與 Flutter DevTools 2.36.0 版本
包含以下變更及其他一般性改進。
若想進一步了解 DevTools，請參閱
[DevTools overview](/tools/devtools)。

## 效能更新

* 新增顯示元件 (Widgets) 建構次數的功能。
  啟用此設定後，您可以在「Frame Analysis」工具中
  查看每個 Flutter 畫格的元件建構次數，或在全新的「Rebuild Stats」工具中
  查看這些次數的彙總統計資料。- [#7838](https://github.com/flutter/devtools/pull/7838), [#7847](https://github.com/flutter/devtools/pull/7847)

    ![Track widget build counts setting](/assets/images/docs/tools/devtools/release-notes/images-2.36.0/track_build_counts_setting.png "Track widget build counts setting")

    ![Widget rebuild counts in the Frame Analysis view](/assets/images/docs/tools/devtools/release-notes/images-2.36.0/rebuild_counts_frame_analysis.png "Widget rebuilds counts for a flutter frame")

    ![Widget rebuild counts in the Rebuild Stats view](/assets/images/docs/tools/devtools/release-notes/images-2.36.0/rebuild_stats.png "Widget rebuilds counts aggregate stats")

## 網路分析工具更新

* 改善對窄視窗的支援，例如當此螢幕嵌入於 IDE 時。- [#7726](https://github.com/flutter/devtools/pull/7726)

## 深層連結 (deep links) 工具更新

* 當工具無法解析專案時，新增錯誤頁面以說明問題。- [#7767](https://github.com/flutter/devtools/pull/7767)

## DevTools 擴充功能更新

* 修正偵測 Dart 或 Flutter 測試擴充功能的問題。- [#7717](https://github.com/flutter/devtools/pull/7717)
* 修正偵測巢狀 Dart 或 Flutter 專案擴充功能的問題。- [#7742](https://github.com/flutter/devtools/pull/7742)
* 在 `package:devtools_extensions` 中新增範例，展示如何從
  DevTools 擴充功能與 Dart Tooling Daemon 互動。- [#7752](https://github.com/flutter/devtools/pull/7752)
* 修正與停用擴充功能相關的 DevTools 路由錯誤。- [#7791](https://github.com/flutter/devtools/pull/7791)
* 修正從擴充功能畫面重新整理 DevTools 時出現「Page Not Found」錯誤的問題。- [#7822](https://github.com/flutter/devtools/pull/7822)
* 修正當擴充功能嵌入於 IDE 時的主題化 (theming) 問題。- [#7824](https://github.com/flutter/devtools/pull/7824)

## 完整提交紀錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.36.0)。
