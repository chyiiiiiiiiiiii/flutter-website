---
title: DevTools 2.35.0 發行說明
shortTitle: 2.35.0 發行說明
breadcrumb: 2.35.0
description: Dart 與 Flutter DevTools 2.35.0 版本的發行說明。
showToc: false
---

Dart 與 Flutter DevTools 2.35.0 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools 總覽](/tools/devtools)。

## 一般更新

* Network 螢幕與 CPU profiler 螢幕的錄製功能，改為單一按鈕控制開始與停止。 - [#7573](https://github.com/flutter/devtools/pull/7573)

  ![CPU profiler 分頁的新錄製按鈕畫面截圖。](/assets/images/docs/tools/devtools/release-notes/images-2.35.0/profiler_recording.png)
  ![Network 分頁的新錄製按鈕畫面截圖。](/assets/images/docs/tools/devtools/release-notes/images-2.35.0/network_recording.png)

## Inspector 更新

* 新增預設 Inspector 檢視的偏好設定。 - [#6949](https://github.com/flutter/devtools/pull/6949)

## 記憶體 (Memory) 更新

* 在快照清單中，以 reachable size 取代 total size。 - [#7493](https://github.com/flutter/devtools/pull/7493)

## 除錯器 (Debugger) 更新

* 在 hot-restart 過程中，`pause_isolates_on_start`，且僅在設定完中斷點後才 `resume` 應用程式。 - [#7234](https://github.com/flutter/devtools/pull/7234)

## Network profiler 更新

* 在請求與回應的文字檢視器中，新增文字選取功能。 - [#7596](https://github.com/flutter/devtools/pull/7596)
* 在 JSON 檢視器中新增 JSON 複製體驗。 - [#7596](https://github.com/flutter/devtools/pull/7596)

  ![JSON 檢視器中的全新 JSON 複製體驗](/assets/images/docs/tools/devtools/release-notes/images-2.35.0/json_viewer_copy.png)

* 修正停止並重新開始 Network 錄製時，會列出未錄製期間發生的請求的錯誤。 - [#7626](https://github.com/flutter/devtools/pull/7626)

## 深層連結 (deep links) 工具更新

* 改善窄螢幕下的版面配置。 - [#7524](https://github.com/flutter/devtools/pull/7524)
* 新增對缺少 scheme 與 domain 的錯誤處理。 - [#7559](https://github.com/flutter/devtools/pull/7559)

## VS Code 側邊欄 (Sidebar) 更新

* 新增 DevTools 區塊，列出無需偵錯階段即可使用的工具與擴充功能。 -
  [#7598](https://github.com/flutter/devtools/pull/7598), [#7604](https://github.com/flutter/devtools/pull/7604)

## DevTools 擴充功能 (Extension) 更新

* 支援不需執行中應用程式即可運作的 DevTools 擴充功能，並可從使用者的 IDE 工作區自動偵測。 - [#7612](https://github.com/flutter/devtools/pull/7612)
* 停用 `DevToolsExtension.requiresRunningApplication` 欄位，改為使用新的可選 `requiresConnection` 欄位，可加入至擴充功能的 `config.yaml` 檔案中。 -
  [#7611](https://github.com/flutter/devtools/pull/7611), [#7602](https://github.com/flutter/devtools/pull/7602)
* 偵測套件中所有類型執行目標的擴充功能。 -
  [#7533](https://github.com/flutter/devtools/pull/7533), [#7535](https://github.com/flutter/devtools/pull/7535)

## 完整提交紀錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.35.0)。
