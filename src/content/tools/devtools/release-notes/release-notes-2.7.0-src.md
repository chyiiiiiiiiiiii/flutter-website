# DevTools 2.7.0 版本更新說明

Dart 與 Flutter DevTools 2.7.0 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](/tools/devtools)。

## 一般更新

* 初始頁面載入時間優化 -
  [#3309](https://github.com/flutter/devtools/pull/3309)
* 修正數個與捲軸有關的問題 -
  [#3393](https://github.com/flutter/devtools/pull/3393),
  [#3401](https://github.com/flutter/devtools/pull/3401)

## 除錯器（Debugger）更新

* 新增開啟檔案對話框（ctrl / cmd + p） -
  [#3342](https://github.com/flutter/devtools/pull/3342),
  [#3354](https://github.com/flutter/devtools/pull/3354),
  [#3371](https://github.com/flutter/devtools/pull/3371),
  [#3384](https://github.com/flutter/devtools/pull/3384)

  ![Open file dialog](/assets/images/docs/tools/devtools/release-notes/images-2.7.0/image1.gif "Open file dialog")

* 在呼叫堆疊（call stack）檢視中新增複製按鈕 -
  [#3334](https://github.com/flutter/devtools/pull/3334)

  ![Call stack view](/assets/images/docs/tools/devtools/release-notes/images-2.7.0/image2.png "Call stack view")

## CPU 分析器（profiler）更新

* 新增 Flutter 應用程式啟動時載入啟動分析（app startup profile）的功能。
  此分析檔將包含 Dart VM 初始化到第一個 Flutter 畫面渲染完成前的 CPU 取樣資料 -
  [#3357](https://github.com/flutter/devtools/pull/3357)

  ![Profile button](/assets/images/docs/tools/devtools/release-notes/images-2.7.0/image3.png "Profile button")

  當應用程式啟動分析檔載入後，
  你會看到「AppStartUp」使用者標籤（user tag）已被選取。
  你也可以在可用的使用者標籤列表中，選擇此標籤來載入啟動分析檔（若有出現）。

  ![User tag example](/assets/images/docs/tools/devtools/release-notes/images-2.7.0/image4.png "User tag example")

* 新增多 isolate 支援。
  可從頁面底部的 isolate 選擇器選擇要分析的 isolate -
  [#3362](https://github.com/flutter/devtools/pull/3362)

  ![isolate selector](/assets/images/docs/tools/devtools/release-notes/images-2.7.0/image5.png "isolate selector")

* 在分析器的 CPU 堆疊框架（stack frames）中新增類別名稱顯示 -
  [#3385](https://github.com/flutter/devtools/pull/3385)

  ![Class names](/assets/images/docs/tools/devtools/release-notes/images-2.7.0/image6.png "Class names")

## 完整提交紀錄

如需查詢自前一版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.6.0...v2.7.0)。
