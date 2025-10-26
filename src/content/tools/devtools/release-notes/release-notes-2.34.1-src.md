# DevTools 2.34.1 版本發行說明

Dart 和 Flutter DevTools 2.34.1 版本
包含以下變更及其他一般性改進。
如需進一步了解 DevTools，請參閱
[DevTools overview](/tools/devtools)。

## 一般更新

* 修正了 DevTools 無法連線至未由 Flutter Tools 啟動的 Flutter 應用程式的問題。 - [#6848](https://github.com/flutter/devtools/issues/6848)
* 提升 FlatTable 的效能。-
  [#7391](https://github.com/flutter/devtools/pull/7391)

## 檢查器（Inspector）更新

- 修正了一個極端情境，導致其他套件的元件（Widgets）可能出現在檢查器樹中。- [#7353](https://github.com/flutter/devtools/pull/7353)

## 效能（Performance）更新
* 新增設定，可在時間軸（Timeline）中包含 CPU 取樣。-
  [#7333](https://github.com/flutter/devtools/pull/7333), [#7369](https://github.com/flutter/devtools/pull/7369)

    ![Timeline settings](/assets/images/docs/tools/devtools/release-notes/images-2.34.1/7369-timeline-settings.png "Timeline settings")

* 移除了舊版追蹤檢視器（legacy trace viewer）。
  舊版追蹤檢視器自 DevTools 2.21.1 版本起已由內嵌的 Perfetto trace viewer 取代，但仍可透過設定啟用，以確保平順過渡。
  本次版本已完全移除舊版追蹤檢視器。- [#7316](https://github.com/flutter/devtools/pull/7316)
* 更新 Perfetto trace viewer 的建置版本。-
  [#7445](https://github.com/flutter/devtools/pull/7445),
  [#7456](https://github.com/flutter/devtools/pull/7456),
  [#7480](https://github.com/flutter/devtools/pull/7480)
* 在重新整理時間軸時，新增載入中訊息。- [#7463](https://github.com/flutter/devtools/pull/7463)

    ![Loading message](/assets/images/docs/tools/devtools/release-notes/images-2.34.1/7463-overlay.png "Loading message")

## 記憶體（Memory）更新

* 啟用快照匯出，並提升快照效能。-
  [#7197](https://github.com/flutter/devtools/pull/7197),
  [#7439](https://github.com/flutter/devtools/pull/7439),
  [#7449](https://github.com/flutter/devtools/pull/7449)

    ![Export snapshot](/assets/images/docs/tools/devtools/release-notes/images-2.34.1/7197-export.png "Export snapshot")

* 修正追蹤（tracing）中斷線時發生的錯誤。- [#7440](https://github.com/flutter/devtools/pull/7440)

* 讓類別篩選器（class filter）在
  `Profile Memory` 與 `Diff Snapshots` 面板間共用。- [#7462](https://github.com/flutter/devtools/pull/7462)

## 網路分析器（Network profiler）更新

* 提升 Network profiler 效能。- [#7266](https://github.com/flutter/devtools/pull/7266)
* 修正已選取的待處理請求在更新後未能刷新分頁的問題。- [#7266](https://github.com/flutter/devtools/pull/7266)
* 修正 JSON 檢視器，讓多行字串可在其所在列中顯示，並可透過工具提示檢視。- [#7389](https://github.com/flutter/devtools/pull/7389)
* 修正 JsonViewer，避免所有展開區段會自動收合的問題。[#7367](https://github.com/flutter/devtools/pull/7367)

## 深層連結工具（Deep Links tool）更新

* 自動從已連線的 IDE 中填入 Flutter 專案清單。- [#7415](https://github.com/flutter/devtools/pull/7415), [#7431](https://github.com/flutter/devtools/pull/7431)

## 完整提交記錄

如需本次發行的完整變更列表，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.34.1)。
