# DevTools 2.20.0 版本發行說明

Dart 與 Flutter DevTools 2.20.0 版本
包含以下變更及其他一般性改進。
若想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## CPU 分析器（CPU profiler）更新

* 新增依標籤分組樣本的支援 -
  [#4693](https://github.com/flutter/devtools/pull/4693)

  ![samples by tag](/assets/images/docs/tools/devtools/release-notes/images-2.20.0/4693.png "samples by tag")

* 為樹狀檢視（tree view）啟用輔助線（guidelines） -
  [#4722](https://github.com/flutter/devtools/pull/4722)

  ![guidelines](/assets/images/docs/tools/devtools/release-notes/images-2.20.0/4722.png "guidelines")

* 將「Profile granularity」重新命名為「CPU sampling rate（CPU 取樣率）」
  並移至相關區域下方 -
  [#4803](https://github.com/flutter/devtools/pull/4722)

  ![sampling rate](/assets/images/docs/tools/devtools/release-notes/images-2.20.0/4803.png "sampling rate")

## 記憶體（Memory）更新

* 移除 **Analysis** 分頁 -
  [#4714](https://github.com/flutter/devtools/pull/4714)

* 新增 **Diff** 分頁，透過比較堆疊快照（heap snapshots）
  以協助偵測與排查記憶體洩漏，
  並提供實例數量、shallow size、retained size 及 retaining paths 等資訊 -
  [#4714](https://github.com/flutter/devtools/pull/4714)

  ![diff](/assets/images/docs/tools/devtools/release-notes/images-2.20.0/4714.png "Diff in Memory tab")

## 除錯器（Debugger）更新

* 在變數檢視器（variables viewer）中支援檢查更多型別的實例
  （Expandos、Types、TypeArguments、Parameters、Closures + closure Contexts、
  WeakProperty、Function、FunctionType、ReceivePort、Closure、RegExp） -
  [#4760](https://github.com/flutter/devtools/pull/4760)

* 在 CodeView 中新增顯示覆蓋率（coverage）的支援 -
  [#4700](https://github.com/flutter/devtools/pull/4700)

  ![coverage](/assets/images/docs/tools/devtools/release-notes/images-2.20.0/4700.png "coverage in CodeView")

## 網路（Network）更新

* 當 content type 不是 JSON 時，顯示請求資料
  （感謝 @leungpuikuen！）-
  [#4602](https://github.com/flutter/devtools/pull/4602)

## 完整提交紀錄

若需查閱自上個版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.19.0...v2.20.0)。
