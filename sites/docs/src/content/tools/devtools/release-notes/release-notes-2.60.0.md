---
title: DevTools 2.60.0 版本資訊
shortTitle: 2.60.0 版本資訊
breadcrumb: 2.60.0
description: Dart 與 Flutter DevTools 2.60.0 版本的版本資訊。
showToc: false
---

Dart 與 Flutter DevTools 的 2.60.0 版本
包含以下變更，以及其他一般性改進。
若想進一步了解 DevTools，請參閱
[DevTools 概覽](/tools/devtools)。

## 一般更新

- 修正 DevTools 可能卡在中斷連線狀態的問題
  （例如 Mac 進入睡眠後），
  做法是在中斷連線畫面新增手動「Reconnect」按鈕。 -
  [#9838](https://github.com/flutter/devtools/issues/9838)
- 解決數個記憶體洩漏問題。 -
  [#9857](https://github.com/flutter/devtools/pull/9857)
- 修正深色模式下表格中醒目標示的搜尋比對結果難以辨識的錯誤，
  原因是醒目標示的顏色變成完全不透明。 -
  [#9863](https://github.com/flutter/devtools/pull/9863)
- DevTools 伺服器讀取檔案時拒絕絕對路徑，
  使其限制在 `~/.flutter-devtools/` 目錄內，
  不會解析到磁碟上的任意檔案。 -
  [#9844](https://github.com/flutter/devtools/pull/9844)
- 在擴充功能啟用狀態處理常式中驗證 `devtoolsOptionsUri` 參數，
  該參數必須是名為 `devtools_options.yaml` 的
  `file:` URI，
  以防止 DevTools 伺服器寫入任意檔案路徑。 -
  [#9834](https://github.com/flutter/devtools/pull/9834)

## Inspector 更新

- 修正 Inspector 錯誤徽章數量
  在導覽期間不正確地增加或消失的問題。 -
  [#9524](https://github.com/flutter/devtools/issues/9524)

## 效能更新

- 修正載入匯出的 Performance 資料時，
  未還原所選功能分頁的錯誤。 -
  [#9861](https://github.com/flutter/devtools/pull/9861)

## 網路分析器更新

- 修正清除所有請求後 Network 分頁搜尋欄位被停用的問題，
  現在可以隨時編輯搜尋查詢。 -
  [#9855](https://github.com/flutter/devtools/pull/9855)

## 深層連結工具更新

- 僅在連線到 Flutter 應用程式時才驗證深層連結。 -
  [#8081](https://github.com/flutter/devtools/issues/8081)

## 完整提交記錄

若要查看此版本的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.60.0)。
