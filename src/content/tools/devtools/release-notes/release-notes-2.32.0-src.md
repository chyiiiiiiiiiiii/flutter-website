# DevTools 2.32.0 版本發行說明

Dart 和 Flutter DevTools 2.32.0 版本
包含以下變更以及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 透過讓 DevTools UI 更加緊湊，提升整體易用性。
  這大幅改善了在 IDE 內嵌使用 DevTools 時的使用體驗。- [#7030](https://github.com/flutter/devtools/pull/7030)
* 移除了「緊湊模式」（Dense mode）設定。- [#7086](https://github.com/flutter/devtools/pull/7086)
* 在 Logging、Network 和 CPU profiler 頁面新增了正則表達式過濾支援。- [#7027](https://github.com/flutter/devtools/pull/7027)
* 新增 DevTools 伺服器互動功能以取得 DTD uri。- [#7054](https://github.com/flutter/devtools/pull/7054)

## 記憶體相關更新

* 支援 Flutter profile build 及 Dart AOT 編譯應用程式的配置追蹤（allocation tracing）。- [#7058](https://github.com/flutter/devtools/pull/7058)
* 支援匯入記憶體快照。- [#6974](https://github.com/flutter/devtools/pull/6974)

## 除錯器相關更新

* 將 `extension type` 高亮顯示為宣告關鍵字，
  在識別字插值中將 `# DevTools 2.32.0 版本發行說明

Dart 和 Flutter DevTools 2.32.0 版本
包含以下變更以及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 透過讓 DevTools UI 更加緊湊，提升整體易用性。
  這大幅改善了在 IDE 內嵌使用 DevTools 時的使用體驗。- [#7030](https://github.com/flutter/devtools/pull/7030)
* 移除了「緊湊模式」（Dense mode）設定。- [#7086](https://github.com/flutter/devtools/pull/7086)
* 在 Logging、Network 和 CPU profiler 頁面新增了正則表達式過濾支援。- [#7027](https://github.com/flutter/devtools/pull/7027)
* 新增 DevTools 伺服器互動功能以取得 DTD uri。- [#7054](https://github.com/flutter/devtools/pull/7054)

## 記憶體相關更新

* 支援 Flutter profile build 及 Dart AOT 編譯應用程式的配置追蹤（allocation tracing）。- [#7058](https://github.com/flutter/devtools/pull/7058)
* 支援匯入記憶體快照。- [#6974](https://github.com/flutter/devtools/pull/6974)

## 除錯器相關更新

* 將 ` 作為插值的一部分進行高亮顯示，
  並正確高亮顯示型別參數中的註解。- [#6837](https://github.com/flutter/devtools/pull/6984)

## 日誌相關更新

* 新增切換過濾器，可過濾掉雜訊較多的 Flutter 和 Dart 日誌。- [#7026](https://github.com/flutter/devtools/pull/6709)

    ![Logging view filters](https://github.com/flutter/devtools/tree/v2.32.0)

* 在詳細資訊窗格中新增了捲軸。- [#6917]⟦L11⟧

## DevTools 擴充功能相關更新

* 在使用者專案中建立的 ` 高亮顯示為宣告關鍵字，
  在識別字串插值中將  作為插值的一部分進行高亮，
  並正確高亮型別參數中的註解。- [#6837](https://github.com/flutter/devtools/pull/6837)

## 日誌（Logging）相關更新

* 新增切換式過濾器，用於過濾雜訊較多的 Flutter 和 Dart 日誌。- [#7026](https://github.com/flutter/devtools/pull/7026)

    ![Logging view filters](/assets/images/docs/tools/devtools/release-notes/images-2.32.0/logging_toggle_filters.png "Toggle filters for logging screen")

* 在詳細資訊窗格（details pane）中新增捲軸。- [#6917](https://github.com/flutter/devtools/pull/6917)

## DevTools 擴充功能相關更新

* 在使用者專案中建立的 ` 檔案中，新增了描述與文件連結。- [#7052]⟦L12⟧
* 更新模擬 DevTools 環境面板為可收合（感謝 @victoreronmosele！）。- [#7062]⟦L13⟧
* DevTools 擴充功能已整合至新的 Dart Tooling Daemon。
  這將允許 DevTools 擴充功能存取其他 DTD 客戶端（如 IDE）註冊的公開方法，
  並可存取簡易檔案系統 API 以與開發專案互動。- [#7108]⟦L14⟧

## VS Code 側邊欄相關更新

* 修正了近期 ` 檔案中新增描述與文件連結。- [#7052](https://github.com/flutter/devtools/pull/7052)
* 將模擬 DevTools 環境面板（Simulated DevTools Environment Panel）改為可收合（感謝 @victoreronmosele！）。- [#7062](https://github.com/flutter/devtools/pull/7062)
* DevTools 擴充功能已整合至新的 Dart Tooling Daemon。
  這將允許 DevTools 擴充功能存取其他 DTD 用戶端（如 IDE）註冊的公開方法，
  並可存取簡易檔案系統 API 以與開發專案互動。- [#7108](https://github.com/flutter/devtools/pull/7108)

## VS Code 側邊欄相關更新

* 修正導致近期 ` 和 ` 和 ` 版本無法載入 VS Code 側邊欄的問題。- [#6984]⟦L15⟧
* 當可用時，於偵錯階段的 DevTools 下拉選單中，將 DevTools 擴充功能顯示為選項。- [#6709]⟦L16⟧

## 完整提交歷史

如需本次發行的完整變更清單，請參閱
[DevTools git log]⟦L17⟧。
