---
title: DevTools 2.44.0 發行說明
shortTitle: 2.44.0 發行說明
breadcrumb: 2.44.0
description: Dart 與 Flutter DevTools 2.44.0 版本的發行說明。
showToc: false
---

Dart 與 Flutter DevTools 2.44.0 版本
包含以下變更以及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools 總覽](/tools/devtools/overview)。

## 一般更新

* 修正了多項記憶體洩漏與生命週期相關問題。-
  [#8901](https://github.com/flutter/devtools/pull/8901),
  [#8902](https://github.com/flutter/devtools/pull/8902),
  [#8907](https://github.com/flutter/devtools/pull/8907),
  [#8917](https://github.com/flutter/devtools/pull/8917),
  [#8932](https://github.com/flutter/devtools/pull/8932),
  [#8933](https://github.com/flutter/devtools/pull/8933),
  [#8934](https://github.com/flutter/devtools/pull/8934),
  [#8935](https://github.com/flutter/devtools/pull/8935),
  [#8937](https://github.com/flutter/devtools/pull/8937),
  [#8953](https://github.com/flutter/devtools/pull/8953),
  [#8969](https://github.com/flutter/devtools/pull/8969),
  [#8970](https://github.com/flutter/devtools/pull/8970),
  [#8975](https://github.com/flutter/devtools/pull/8975)

## CPU 分析器更新

* 改善了 CPU profile 的載入時間與記憶體使用量。
  * [#8892](https://github.com/flutter/devtools/pull/8892)
  * [#8878](https://github.com/flutter/devtools/pull/8878)
  * [#8839](https://github.com/flutter/devtools/pull/8839)
* 修正了在未取樣期間導致的持續時間計算錯誤問題 - [#8941](https://github.com/flutter/devtools/pull/8941)。

## 記憶體更新

* 調整記憶體 heap 快照工具，現在預設會在快照中包含參考資訊。-
  [#8899](https://github.com/flutter/devtools/pull/8899)

## 除錯器更新

* 新增例外模式下拉選單的說明工具提示。-
  [#8849](https://github.com/flutter/devtools/pull/8849)
* 更新語法高亮，支援數字分隔符，並改善註解與字串插值的處理。-
  [#8861](https://github.com/flutter/devtools/pull/8861)
* 更新 `string_scanner` 相依套件，避免在 Windows 上原始碼於特定位置包含 `\r\n` 時出現語法高亮問題。-
  [#8904](https://github.com/flutter/devtools/pull/8904)
* 除錯主控台新增軟換行（soft line wrapping）功能。
  [#8855](https://github.com/flutter/devtools/pull/8855)。

## 網路分析器更新

* 為網路畫面新增離線支援（感謝 @hrajwade96！）-
  [#8332](https://github.com/flutter/devtools/pull/8332)

  ![Network profiler controls](/assets/images/docs/tools/devtools/release-notes/images-2.44.0/network_controls.png "Network profiler controls")

  ![Network profiler open / save button](/assets/images/docs/tools/devtools/release-notes/images-2.44.0/network_open_save_button.png "Network profiler open / save button")

* 調整右鍵選單樣式，使其與其他畫面一致
  [#8859](https://github.com/flutter/devtools/pull/8859)。

## 完整提交紀錄

如需本次發行的完整變更列表，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.44.0)。
