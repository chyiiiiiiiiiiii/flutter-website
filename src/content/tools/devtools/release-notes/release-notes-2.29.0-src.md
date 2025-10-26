# DevTools 2.29.0 版本發行說明

Dart 與 Flutter DevTools 2.29.0 版本
包含以下變更及其他一般性改進。
如需進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 修正服務擴充（service extension）狀態在應用程式斷線時
  未被清除的錯誤。- [#6547](https://github.com/flutter/devtools/pull/6547)

* 優化連線至應用程式時底部狀態列的樣式。- [#6525](https://github.com/flutter/devtools/pull/6525)

* 新增解決方案，修復 VSCode 中複製按鈕的功能。- [#6598](https://github.com/flutter/devtools/pull/6598)

## 效能（Performance）更新

* 在「Enhance Tracing」選單中新增追蹤平台通道（platform channel）
  活動的選項。這對於有使用插件的應用程式非常有用。- [#6515](https://github.com/flutter/devtools/pull/6515)

  ![Track platform channels setting](/assets/images/docs/tools/devtools/release-notes/images-2.29.0/track_platform_channels.png "Track platform channels setting")

* 當沒有連線至應用程式時，Performance 螢幕現在也可使用。
  先前從 DevTools 儲存的效能資料
  可以在此螢幕重新載入並檢視。- [#6567](https://github.com/flutter/devtools/pull/6567)

* 在 Performance 控制區新增「Open」按鈕，
  以載入先前從 DevTools 儲存的資料。- [#6567](https://github.com/flutter/devtools/pull/6567)

  ![Open file button on the performance screen](/assets/images/docs/tools/devtools/release-notes/images-2.29.0/open_file_performance_screen.png "Open file button on the performance screen")

## CPU 分析器（CPU profiler）更新

* 現在「Bottom Up」與「Call Tree」分頁的樹狀指引線（tree guidelines）會始終啟用。- [#6534](https://github.com/flutter/devtools/pull/6534)

* 當沒有連線至應用程式時，CPU profiler 螢幕現在也可使用。
  先前從 DevTools 儲存的 CPU 分析資料
  可以在此螢幕重新載入並檢視。- [#6567](https://github.com/flutter/devtools/pull/6567)

* 在 CPU profiler 控制區新增「Open」按鈕，
  以載入先前從 DevTools 儲存的資料。- [#6567](https://github.com/flutter/devtools/pull/6567)

## 網路分析器（Network profiler）更新

* 當請求失敗時，網路狀態現在會以錯誤顏色顯示。- [#6527](https://github.com/flutter/devtools/pull/6527)

## 完整提交記錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.29.0)。
