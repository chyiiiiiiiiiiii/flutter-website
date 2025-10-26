# DevTools 2.38.0 發行說明

Dart 與 Flutter DevTools 2.38.0 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](/tools/devtools/overview)。

## 效能更新

* 將「Track builds, paints, and layouts」設定重新命名為「Trace builds, paints, and layouts」。- [#8084](https://github.com/flutter/devtools/pull/8084)
* 將「Track widget build counts」設定重新命名為「Count widget builds」。- [#8084](https://github.com/flutter/devtools/pull/8084)

## 除錯器（Debugger）更新

* 新增建議從 IDE 進行程式碼除錯，並附上 IDE 操作說明的連結。- [#8085](https://github.com/flutter/devtools/pull/8085)

## 網路分析器（Network profiler）更新

* 新增支援將網路請求匯出為 HAR 檔案（感謝 @hrajwade96！）。- [#7970](https://github.com/flutter/devtools/pull/7970)

## DevTools 擴充功能（Extension）更新

* 修正當 DevTools 擴充功能嵌入於 IDE 時，未能正確載入主題的問題。- [#8034](https://github.com/flutter/devtools/pull/8034)
* 新增一個 API，可透過父層 DevTools Web 應用程式代理方式複製文字到剪貼簿，
以解決嵌入 IDE 時複製相關問題。- [#8130](https://github.com/flutter/devtools/pull/8130)

## 完整提交紀錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.38.0)。
