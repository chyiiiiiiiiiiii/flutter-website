# DevTools 2.24.0 版本發行說明

Dart 與 Flutter DevTools 2.24.0 版本
除了其他一般性改進外，還包含以下變更。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 改善 DevTools 表格的整體效能 -
  [#5664](https://github.com/flutter/devtools/pull/5664)、
  [#5696](https://github.com/flutter/devtools/pull/5696)

## CPU 分析器更新

* 修正 CPU flame chart（火焰圖）選取與工具提示的錯誤 -
  [#5676](https://github.com/flutter/devtools/pull/5676)

## 除錯器（Debugger）更新

* 改善對檢查
  `UserTag` 與 `MirrorReferent` 實例的支援 -
  [#5490](https://github.com/flutter/devtools/pull/5490)
* 修正運算式評估的錯誤，當選擇欄位的自動完成結果時，會清除目前的輸入內容 -
  [#5717](https://github.com/flutter/devtools/pull/5717)
* 當選取堆疊框架（stack frame）時，
  會自動捲動至原始碼中的該框架位置 -
  [#5722](https://github.com/flutter/devtools/pull/5722)
* 提升搜尋檔案及在檔案內搜尋的效能 -
  [#5733](https://github.com/flutter/devtools/pull/5733)
* 由於效能限制，對於超過 100,000 字元的檔案停用語法高亮顯示 -
  [#5743](https://github.com/flutter/devtools/pull/5743)
* 修正若檔案停用語法高亮時，原始碼無法顯示的問題 -
  [#5743](https://github.com/flutter/devtools/pull/5743)
* 防止檔案名稱與原始碼內容不同步的情形發生 -
  [#5827](https://github.com/flutter/devtools/pull/5827)

## 完整提交紀錄

若需查閱自上一版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.23.1...v2.24.0)。
