# DevTools 2.22.2 版本發行說明

Dart 與 Flutter DevTools 2.22.2 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

- 避免在沒有 main isolate 時發生崩潰 -
  [#5232](https://github.com/flutter/devtools/pull/5232)

## CPU 分析器（CPU profiler）更新

- 在方法名稱旁內嵌顯示堆疊框架的 URI，
  以確保在巢狀很深的樹狀結構中 URI 也能隨時可見 -
  [#5181](https://github.com/flutter/devtools/pull/5181)

  ![inline uri](/assets/images/docs/tools/devtools/release-notes/images-2.22.2/5181.png "inline uri")

- 新增可依方法名稱或原始碼 URI 篩選的功能 -
  [#5204](https://github.com/flutter/devtools/pull/5204)

## 記憶體（Memory）更新

- 預設篩選條件改為僅顯示專案及第三方相依套件 -
  [#5201](https://github.com/flutter/devtools/pull/5201)。

  ![filter default](/assets/images/docs/tools/devtools/release-notes/images-2.22.2/5201.png "filter default")

- 支援在主控台針對執行中的應用程式進行運算式求值 -
  [#5248](https://github.com/flutter/devtools/pull/5248)。

  ![evaluation](/assets/images/docs/tools/devtools/release-notes/images-2.22.2/5248.png "evaluation")

- 新增 `Persisted` 欄位以支援記憶體差異比較（memory diffing） -
  [#5290](https://github.com/flutter/devtools/pull/5290)

  ![persisted](/assets/images/docs/tools/devtools/release-notes/images-2.22.2/5290.png "persisted")

## 除錯器（Debugger）更新

- 當使用檔案總管（File Explorer）瀏覽時，
  新增對瀏覽器導覽歷史的支援 -
  [#4906](https://github.com/flutter/devtools/pull/4906)
- 針對 `Record` 型別的定位欄位（positional fields），
  以 getter 語法自 `$1` 起標示 -
  [#5272](https://github.com/flutter/devtools/pull/5272)
- 修正 `Map` 與 `List` 實例的變數檢查問題 -
  [#5320](https://github.com/flutter/devtools/pull/5320)

  ![map and list](/assets/images/docs/tools/devtools/release-notes/images-2.22.2/5320.png "map and list")

- 修正 `Set` 實例的變數檢查問題 -
  [#5323](https://github.com/flutter/devtools/pull/5323)

  ![set](/assets/images/docs/tools/devtools/release-notes/images-2.22.2/5323.png "set")


## 網路分析器（Network profiler）更新

- 提升 Network 分頁的穩定性與效能 -
  [#5056](https://github.com/flutter/devtools/pull/5056)

## 完整提交記錄

若需查詢自前一版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.21.1...v2.22.2).
