# DevTools 2.45.0 發行說明

Dart 與 Flutter DevTools 2.45.0 版本
包含以下變更及其他一般性改進。
若想進一步了解 DevTools，請參閱
[DevTools overview](/tools/devtools/overview)。

## 一般更新

* 新增記憶體壓力警告，讓你可以降低 DevTools 的記憶體用量，以避免 OOM（記憶體不足）當機。-
[#8989](https://github.com/flutter/devtools/pull/8989)、
[#8997](https://github.com/flutter/devtools/pull/8997)、
[#8998](https://github.com/flutter/devtools/pull/8998)

* 修正斷線時「檢視歷史」體驗的錯誤。-
[#8985](https://github.com/flutter/devtools/pull/8985)

* 修正 DevTools 於連線時自動繼續執行，而非在中斷點暫停的錯誤。-
[#8991](https://github.com/flutter/devtools/pull/8991)

* 防止文字輸入欄位搶奪 IDE 焦點。-
[#9091](https://github.com/flutter/devtools/pull/9091)

## Inspector 更新

* 修正 inspector 樹狀結構中的錯誤（例如 RenderFlex overflow 錯誤）在熱重載（hot-reload）後未被移除的問題。-
[#9106](https://github.com/flutter/devtools/pull/9106)

## 除錯器（Debugger）更新

* 將「暫停」（Pause）與「繼續」（Resume）按鈕合併為單一按鈕。-
[#9095](https://github.com/flutter/devtools/pull/9095)

## 深層連結 (deep links) 工具更新

* 修正在 Windows 檔案路徑於深層連結頁面顯示不正確的問題 [#9027](https://github.com/flutter/devtools/pull/9027)。

* 修正當沒有 iOS 設定時，深層連結頁面發生當機的問題 [#9027](https://github.com/flutter/devtools/pull/9027)。

## 完整提交紀錄

若需查詢本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.45.0)。
