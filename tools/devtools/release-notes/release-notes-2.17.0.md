# DevTools 2.17.0 版本發行說明

> Dart 與 Flutter DevTools 2.17.0 版本的發行說明。



Dart 與 Flutter DevTools 2.17.0 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## Inspector 更新

* 新增手動設定應用程式套件目錄（package directories）的支援。
  如果你曾經在載入 Inspector（檢查器）時發現
  有些元件 (Widget) 沒有顯示在元件樹中，這可能
  表示你的應用程式套件目錄
  沒有正確設定或偵測到。
  套件目錄會決定 Inspector 視哪些元件
  屬於_你的_應用程式。
  如果你看到 Inspector 元件樹為空，
  或者你在多個套件中開發元件，
  並希望所有這些位置的元件都能顯示在元件樹中，
  請檢查 **Inspector Settings**（檢查器設定）對話框，確保你的套件
  目錄已正確設定 -
  [#4306](https://github.com/flutter/devtools/pull/4306)

  ![frame_analysis](/assets/images/docs/tools/devtools/release-notes/images-2.17.0/package_directories.png "package directories")

## 效能（Performance）更新

* 在 Performance（效能）頁面新增 **Frame Analysis**（畫格分析）分頁。
  當你分析一個 Flutter 畫格出現卡頓時，
  此檢視會提供診斷卡頓的提示，並
  偵測可能導致畫格時間過長的高耗費操作。
  此檢視也會依階段（**Build**、**Layout**、**Paint**、**Raster**）
  顯示 Flutter 畫格時間的細項分布，
  幫助你朝正確方向進行調整 -
  [#4339](https://github.com/flutter/devtools/pull/4339)

  ![frame_analysis](/assets/images/docs/tools/devtools/release-notes/images-2.17.0/frame_analysis.png "frame analysis")

## 完整提交紀錄

若要查詢自前一版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.16.0...v2.17.0)。

