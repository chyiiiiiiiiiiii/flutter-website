# DevTools 2.10.0 發行說明

Dart 與 Flutter DevTools 2.10.0 版本
包含以下變更及其他一般性改進。
如需進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## Flutter 檢查器（inspector）更新

* 為元件樹（Widget Tree）新增搜尋功能，
  並在元件詳細樹（Widget Details Tree）中加入麵包屑導覽器，
  讓您能快速在樹狀階層中瀏覽 –
  [#3525](https://github.com/flutter/devtools/pull/3525)

  ![inspector search](/assets/images/docs/tools/devtools/release-notes/images-2.10.0/image1.png "inspector_search")

## CPU 分析器（profiler）更新

* 修正在載入離線快照時，
  CPU 分析器發生 null 參考的問題 –
  [#3596](https://github.com/flutter/devtools/pull/3596)

## 除錯器（Debugger）更新

* 新增多關鍵字檔案搜尋支援，
  並改善搜尋結果的排序邏輯，
  讓檔案名稱的符合度優先於完整路徑的符合度 –
  [#3582](https://github.com/flutter/devtools/pull/3582)
* 修正部分與焦點相關的問題 –
  [#3602](https://github.com/flutter/devtools/pull/3602)

## 日誌檢視（Logging view）更新

* 修正當多次篩選日誌時
  發生的嚴重錯誤 –
  [#3588](https://github.com/flutter/devtools/pull/3588)

## 完整提交紀錄

如需查詢自上個版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.9.2...v2.10.0)。
