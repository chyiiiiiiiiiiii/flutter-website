# DevTools 2.40.2 版本發行說明

Dart 與 Flutter DevTools 2.40.2 版本
包含以下變更及其他一般性改進。
想了解更多 DevTools 相關資訊，請參閱
[DevTools overview](/tools/devtools/overview)。

## 一般更新

* 新增一個設定，讓使用者可以選擇以 WebAssembly 載入 DevTools。- [#8270](https://github.com/flutter/devtools/pull/8270)

  ![Wasm opt-in setting](/assets/images/docs/tools/devtools/release-notes/images-2.40.2/wasm_setting.png "DevTools setting to opt into wasm.")

* 從 DevTools 中移除了舊版 Provider 螢幕。
  `package:provider` 工具現在作為
  DevTools 擴充功能，由 `package:provider` 發佈。
  請升級您的 `package:provider` 相依套件以
  使用此擴充功能。- [#8364](https://github.com/flutter/devtools/pull/8364)

* 修正了一個導致 DevTools 發行說明總是顯示的錯誤。- [#8277](https://github.com/flutter/devtools/pull/8277)

* 新增支援在 pub 工作區載入擴充功能
  [8347](https://github.com/flutter/devtools/pull/8347)。

* 錯誤堆疊追蹤現在會對應到 Dart 原始碼位置，使其更易於閱讀。- [#8385](https://github.com/flutter/devtools/pull/8385)

* 新增對 IDE 主題切換事件的處理，
  以即時更新嵌入式 DevTools UI。- [#8336](https://github.com/flutter/devtools/pull/8336)

* 修正一個在 Network 與 Logging 螢幕清除資料時，
  會一併清除資料篩選器的錯誤。- [#8407](https://github.com/flutter/devtools/pull/8407)

* 修正一個在開啟 VM Flags 對話框時，
  Navigator 會遺失狀態的問題。- [#8413](https://github.com/flutter/devtools/pull/8413)

* 當 DevTools 嵌入於 IDE 時，表格會自動配合 IDE 主題。- [#8498](https://github.com/flutter/devtools/pull/8498)

## Inspector 更新

- 在 Flutter Inspector 控制項中新增設定，
  讓使用者可以選擇啟用全新設計的 Flutter Inspector。- [#8342](https://github.com/flutter/devtools/pull/8342)

  ![New inspector opt-in setting](/assets/images/docs/tools/devtools/release-notes/images-2.40.2/new_inspector.png "DevTools setting to opt into the new Flutter Inspector.")

## 效能相關更新

* 修正「Refreshing timeline」覆蓋層在不該顯示時仍顯示的問題。- [#8318](https://github.com/flutter/devtools/pull/8318)

## 網路分析工具更新

* 修正 `.har` 匯出時，
  有時回應內容會遺漏的問題。- [#8333](https://github.com/flutter/devtools/pull/8333)

## Deep links 工具更新

- 新增支援驗證 iOS 深層連結 (deep link) 設定。- [#8394](https://github.com/flutter/devtools/pull/8394)

  ![Deep link validator for iOS](/assets/images/docs/tools/devtools/release-notes/images-2.40.2/deep_link_ios.png "DevTools Deep link validator Page")

## 完整提交記錄

如需本次發行的完整變更列表，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.40.2)。
