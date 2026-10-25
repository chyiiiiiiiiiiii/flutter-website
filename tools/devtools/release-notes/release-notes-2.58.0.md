# DevTools 2.58.0 版本發行說明



Dart 與 Flutter DevTools 2.58.0 版本包含以下變更及其他一般性改進。
若要進一步了解 DevTools，請參閱
[DevTools 概覽](/tools/devtools)。

## Inspector 更新

- 移除了使用舊版 Inspector 的選項。
  [#9782](https://github.com/flutter/devtools/pull/9782)
- 修正了使用鍵盤方向鍵在 Inspector 元件 (Widget) 樹中導覽時，連線的 Flutter 應用程式未更新所選元件的問題。[#9810](https://github.com/flutter/devtools/pull/9810)
- 修正了在以左方向鍵收合子樹後點擊元件列，子樹意外重新展開的問題。[#9810](https://github.com/flutter/devtools/pull/9810)
- 修正了以左方向鍵將 Inspector 元件樹收合至單一列時，顯示載入中旋轉指示符而未顯示根節點的問題。[#9810](https://github.com/flutter/devtools/pull/9810)

## 效能更新

- 修正了在 profile 模式下，「更多除錯選項」即使已選取仍顯示為未選取的問題。[#9813](https://github.com/flutter/devtools/issues/9813)

## 除錯工具更新

- 修正了主控台／變數檢視中較長的字串值溢出並與其他元素重疊的問題。[#7112](https://github.com/flutter/devtools/issues/7112)

## 網路分析工具更新

- 在「網路」分頁新增了回應大小欄位，並在請求 Inspector 概覽中顯示回應大小。
  [#9744](https://github.com/flutter/devtools/pull/9744)

- 改進了「網路」分頁中 HTTP 請求狀態的分類方式，以更精確地區分已取消、已完成及進行中的請求（例如，避免某些已取消的請求顯示為待處理中）。[#9683](https://github.com/flutter/devtools/pull/9683)

- 新增了隱藏 HTTP 分析工具 socket 資料的篩選設定。
  [#9698](https://github.com/flutter/devtools/pull/9698)

## 記錄更新

- 修正了日誌訊息包含換行字元時，在記錄畫面中被錯誤拆分成多個獨立項目的問題。[#9757](https://github.com/flutter/devtools/pull/9757)

## Deep Links 工具更新

- 當存在多個錯誤時，驗證摘要通知標題中的「domain」與「path」改以複數形式顯示。[#9790](https://github.com/flutter/devtools/pull/9790)

## 完整提交記錄

若要查看此版本的完整變更清單，請參閱
[DevTools git 記錄](https://github.com/flutter/devtools/tree/v2.58.0)。

