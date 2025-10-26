# DevTools 2.33.0 發行說明

Dart 與 Flutter DevTools 2.33.0 版本
包含以下變更以及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](/tools/devtools)。

## 一般更新

* 透過讓 DevTools UI 更為緊湊，提升整體可用性。
  這大幅改善了在 IDE 內嵌使用 DevTools 時的使用體驗。- [#7030](https://github.com/flutter/devtools/pull/7030)
* 移除了「緊湊模式（Dense mode）」設定。- [#7086](https://github.com/flutter/devtools/pull/7086)
* 在 Logging、Network 與 CPU profiler 頁面新增支援
  正規表示式過濾功能。- [#7027](https://github.com/flutter/devtools/pull/7027)
* 新增 DevTools 伺服器互動功能以取得 DTD URI。- [#7054](https://github.com/flutter/devtools/pull/7054), [#7164](https://github.com/flutter/devtools/pull/7164)
* 啟用 Web 端具作用域的運算式評估，
  允許對已檢查的元件（Widgets）進行評估。- [#7144](https://github.com/flutter/devtools/pull/7144)
* 將 `package:vm_service` 約束更新為 `^14.0.0`。- [#6953](https://github.com/flutter/devtools/pull/6953)
* 將 DevTools 導入 [`package:unified_analytics`](https://pub.dev/packages/unified_analytics)，
  以實現 Flutter 與 Dart 工具的統一遙測日誌記錄。- [#7084](https://github.com/flutter/devtools/pull/7084)

## 除錯器（Debugger）更新

* 修正導致 profiler 命中（hits）顯示在錯誤行數的 off by one 錯誤。- [#7178](https://github.com/flutter/devtools/pull/7178)
* 改善暗色模式下顯示程式碼覆蓋率命中行號的對比度。- [#7178](https://github.com/flutter/devtools/pull/7178)
* 改善暗色模式下 profiler 命中細節的對比度。- [#7178](https://github.com/flutter/devtools/pull/7178)
* 修正當原始檔使用 `\r\n` 行結尾時，註解的語法高亮顯示問題。[#7190](https://github.com/flutter/devtools/pull/7190)
* 熱重啟（hot-restart）後重新建立中斷點。- [#7205](https://github.com/flutter/devtools/pull/7205)

## VS Code 側邊欄（Sidebar）更新

* 不再於 Flutter 側邊欄顯示 DevTools 發行說明。- [#7166](https://github.com/flutter/devtools/pull/7166)

## DevTools 擴充功能（Extension）更新

* 新增支援從模擬的 DevTools 環境連接至 Dart Tooling Daemon。- [#7133](https://github.com/flutter/devtools/pull/7133)
* 在模擬的 DevTools 環境中，於 VM Service 與 DTD 連線文字欄位新增說明按鈕。- [#7133](https://github.com/flutter/devtools/pull/7133)
* 修正未能偵測子目錄下測試檔案擴充功能的問題。- [#7174](https://github.com/flutter/devtools/pull/7174)
* 新增建立純 Dart 套件擴充功能的範例。- [#7196](https://github.com/flutter/devtools/pull/7196)
* 更新 `README.md` 與 `example/README.md`，
  提供更完整的文件說明。- [#7237](https://github.com/flutter/devtools/pull/7237), [#7261](https://github.com/flutter/devtools/pull/7261)
* 新增 `devtools_extensions validate` 指令，
  於開發期間驗證擴充功能需求。- [#7257](https://github.com/flutter/devtools/pull/7257)

## 完整提交紀錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.33.0)。
