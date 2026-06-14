# DevTools 2.51.1 版本發布說明



Dart 和 Flutter DevTools 的 2.51.1 版本包含以下變更及其他一般性改善。
若要深入了解 DevTools，請參閱
[DevTools 總覽](/tools/devtools/overview)。

## 一般更新

- Flutter beta 頻道的使用者已自動加入 DevTools-on-Wasm 實驗。
  其他使用者仍可從設定對話框啟用 Wasm 編譯版本的 DevTools。 - [#9455](https://github.com/flutter/devtools/pull/9455)
- 在資料表中新增水平捲軸以協助導覽。 -
  [#9482](https://github.com/flutter/devtools/pull/9482)
- 現在可透過拖曳欄位標題分隔線來調整資料表欄位寬度。 -
  [#9485](https://github.com/flutter/devtools/pull/9485)

## Inspector 更新

- 修正使用 Inspector 選取元件 (Widget) 時，會開啟元件定義檔案而非使用者專案檔案的問題。 -
  [#176530](https://github.com/flutter/flutter/pull/176530)

## 網路分析器更新

- 修正頁籤名稱中「錯誤計數」徽章的版面配置。 -
  [#9470](https://github.com/flutter/devtools/pull/9470)
- 修正在無標頭時「回應標頭」與「請求標頭」的顯示問題。 - [#9492](https://github.com/flutter/devtools/pull/9492)
- 新增橫幅以清楚標示 DevTools 未記錄網路請求的狀況。 - [#9495](https://github.com/flutter/devtools/pull/9495)

## VS Code 更新

- 修正在 macOS 上將 DevTools 嵌入 VS Code 時，`Cmd`+`C` 和 `Cmd`+`V` 等快捷鍵無法使用的問題。 -
  [#9472](https://github.com/flutter/devtools/pull/9472)

## 完整提交歷史記錄

若要查看此版本的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.51.1)。

