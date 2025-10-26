# DevTools 2.40.2 版本更新說明

Dart 與 Flutter DevTools 2.40.2 版本
包含以下變更及其他一般性改進。
想進一步瞭解 DevTools，請參閱
[DevTools overview](/tools/devtools/overview)。

## 一般更新

* 新增設定，允許使用者選擇以 WebAssembly 載入 DevTools。- [#8270](https://github.com/flutter/devtools/pull/8270)

  ![Wasm opt-in setting](/assets/images/docs/tools/devtools/release-notes/images-2.40.2/wasm_setting.png "DevTools setting to opt into wasm.")

* 已從 DevTools 移除舊版 Provider 螢幕。
  `package:provider` 工具現已作為
  DevTools 擴充功能，由 `package:provider` 發佈。
  請升級您的 `package:provider` 相依套件以
  使用此擴充功能。- [#8364](https://github.com/flutter/devtools/pull/8364)

* 修正一個導致 DevTools 版本更新說明
  總是顯示的錯誤。- [#8277](https://github.com/flutter/devtools/pull/8277)

* 新增支援於 pub workspace 中載入擴充功能
  [8347](https://github.com/flutter/devtools/pull/8347)。

* 錯誤堆疊追蹤已對應至 Dart 原始碼位置，
  讓其更易於閱讀。- [#8385](https://github.com/flutter/devtools/pull/8385)

* 新增 IDE 主題變更事件的處理，
  以更新嵌入式 DevTools UI。- [#8336](https://github.com/flutter/devtools/pull/8336)

* 修正一個在 Network 與 Logging 螢幕清除資料時，
  會一併清除資料篩選器的錯誤。- [#8407](https://github.com/flutter/devtools/pull/8407)

* 修正一個在開啟 VM Flags 對話框時，
  Navigator 會遺失狀態的錯誤。- [#8413](https://github.com/flutter/devtools/pull/8413)

* 表格在嵌入 IDE 時，會配合 IDE 主題顯示。- [#8498](https://github.com/flutter/devtools/pull/8498)

## Inspector 更新

- 在 Flutter Inspector 控制項中新增設定，
  允許使用者選擇加入全新設計的 Flutter Inspector。- [#8342](https://github.com/flutter/devtools/pull/8342)

  ![New inspector opt-in setting](/assets/images/docs/tools/devtools/release-notes/images-2.40.2/new_inspector.png "DevTools setting to opt into the new Flutter Inspector.")

## 效能（Performance）更新

* 修正「Refreshing timeline」覆蓋層在不該顯示時仍出現的問題。- [#8318](https://github.com/flutter/devtools/pull/8318)

## 網路分析器（Network Profiler）更新

* 解決 `.har` 匯出時，
  回應內容有時會遺漏的問題。- [#8333](https://github.com/flutter/devtools/pull/8333)

## Deep links 工具更新

- 新增支援驗證 iOS 深層連結（deep link）設定。- [#8394](https://github.com/flutter/devtools/pull/8394)

  ![Deep link validator for iOS](/assets/images/docs/tools/devtools/release-notes/images-2.40.2/deep_link_ios.png "DevTools Deep link validator Page")

## 完整提交紀錄

如需本次版本所有變更的完整清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.40.2)。
