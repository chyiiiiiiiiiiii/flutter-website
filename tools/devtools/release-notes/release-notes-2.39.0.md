# DevTools 2.39.0 發行說明

> Dart 與 Flutter DevTools 2.39.0 版本的發行說明。



Dart 與 Flutter DevTools 2.39.0 版本
包含以下變更，以及其他一般性改進。
如需進一步了解 DevTools，請參閱
[DevTools 概覽](/tools/devtools/overview)。

## 一般更新

* 表格欄位預設可排序。- [#8175](https://github.com/flutter/devtools/pull/8175)
* 更新 DevTools 螢幕圖示，使其與 Flutter 支援的 IDE 中所使用的圖示一致。- [#8181](https://github.com/flutter/devtools/pull/8181)

## 記憶體相關更新

* 啟用記憶體快照的離線分析，並支援在應用程式斷線時檢視記憶體資料。例如，當應用程式意外
  當機或遇到記憶體不足問題時，可能會發生這種情況。- [#7843](https://github.com/flutter/devtools/pull/7843)、
  [#8093](https://github.com/flutter/devtools/pull/8093)、
  [#8096](https://github.com/flutter/devtools/pull/8096)

* 修正記憶體圖表可能導致連線中的應用程式在重複分配大量短暫物件時
  發生記憶體不足例外的問題。- [#8209](https://github.com/flutter/devtools/pull/8209)

## App size 工具更新

* 增加檔案匯入檢視的 UI 優化。[#8232](https://github.com/flutter/devtools/pull/8232)

## 完整提交記錄

如需本次發行的完整變更列表，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.39.0)。

