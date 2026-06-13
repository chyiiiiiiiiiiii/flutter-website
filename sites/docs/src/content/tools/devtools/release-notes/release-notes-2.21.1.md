---
title: DevTools 2.21.1 版本發行說明
shortTitle: 2.21.1 版本發行說明
breadcrumb: 2.22.1
description: Dart 與 Flutter DevTools 2.21.1 版本的發行說明。
showToc: false
---

Dart 與 Flutter DevTools 2.21.1 版本
包含以下變更及其他一般性改進。
若想進一步瞭解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 效能更新

* 將 DevTools 時間軸追蹤檢視器替換為
  [Perfetto](https://perfetto.dev/) 追蹤檢視器 -
  [#5142](https://github.com/flutter/devtools/pull/5142)

  ![perfetto trace viewer](/assets/images/docs/tools/devtools/release-notes/images-2.21.1/image1.png "perfetto_trace_viewer")

* 修正多項將 Performance 快照載入 DevTools 時的問題 -
  [#5048](https://github.com/flutter/devtools/pull/5048),
  [#4929](https://github.com/flutter/devtools/pull/4929)
* UI 優化與清理 - [#4889](https://github.com/flutter/devtools/pull/4889)

## 記憶體更新

* 改善快照差異比對的易用性 -
  [#5015](https://github.com/flutter/devtools/pull/5015)
* UI 優化與清理 -
  [#4855](https://github.com/flutter/devtools/pull/4855)
* 依據類別定義位置（SDK、您的套件、相依套件等）進行顏色標示 -
  [#5030](https://github.com/flutter/devtools/pull/5030)
* 修正追蹤的狀態管理問題 -
  [#5062](https://github.com/flutter/devtools/pull/5062)
* 提升取得 heap 快照的效能 -
  [#5134](https://github.com/flutter/devtools/pull/5134)
* 移除已損壞的匯入/匯出功能 -
  [#5135](https://github.com/flutter/devtools/pull/5135)

## 除錯器更新

* 新增在除錯器腳本檢視器中查看 profiler 命中的支援 -
  [#4831](https://github.com/flutter/devtools/pull/4831)
* 新增檢查 record 的支援 -
  [#5084](https://github.com/flutter/devtools/pull/5084)

## 一般更新

* 修正語法高亮顯示的多個問題，包含變數名稱含有保留字時顏色標示錯誤，
  以及部分類別的 `extends`/`implements` 子句未上色的問題 -
  [#4948](https://github.com/flutter/devtools/pull/4948)
* 修正在 Safari 及其他不支援 RegExp 負向後顯（negative lookbehind）的瀏覽器中，
  導致 DevTools 無法載入的問題 -
  [#4938](https://github.com/flutter/devtools/pull/4938)
* 修正導致 DevTools 無法連接後端伺服器，進而停用部分功能的問題 -
  [#5016](https://github.com/flutter/devtools/pull/5016)
* 在 About 選單中新增 DevTools
  [貢獻指南](https://github.com/flutter/devtools/blob/master/CONTRIBUTING.md)
  的連結，並修正 Discord 連結 -
  [#4926](https://github.com/flutter/devtools/pull/4926)
* 修正亮色主題下的顏色衝突問題 -
  [#5067](https://github.com/flutter/devtools/pull/5067)

## 完整提交記錄

如需查閱自上個版本以來的完整變更清單，
請參閱
[GitHub 上的差異比較](https://github.com/flutter/devtools/compare/v2.20.0...v2.21.1)。
