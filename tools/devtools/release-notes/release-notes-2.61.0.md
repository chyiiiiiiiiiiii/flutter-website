# DevTools 2.61.0 版本說明



Dart 與 Flutter DevTools 的 2.61.0 版本
包含以下變更，以及其他一般性改進。
若想進一步了解 DevTools，請參閱
[DevTools 概覽](/tools/devtools)。

## 一般更新

* 修正版本說明面板中文字無法閱讀的問題：
  在深色主題下，引用區塊 (blockquote) 被繪製在寫死的淺藍色背景上。
  [#9957](https://github.com/flutter/devtools/pull/9957)
* 新增支援透過 `MessagePort` 代理 VM service 連線，
  使用方式為 `?uri=messageport:<origin>`。
  [#9964](https://github.com/flutter/devtools/pull/9964)

## Inspector 更新

* 在 Inspector 詳細資訊窗格中新增元件 (Widget) 的原始碼檔案路徑
  (`filename.dart:line:column`)，與舊版 Inspector 的行為一致。
  [#9972](https://github.com/flutter/devtools/pull/9972),
  [#9922](https://github.com/flutter/devtools/issues/9922)

## 效能更新

* 修正一個錯誤：切換離開 Performance 畫面後再切換回來時，
  Flutter frames 圖表可能看起來凍結。
  [#9960](https://github.com/flutter/devtools/pull/9960)
* 當應用程式以 profile 模式執行而無法追蹤元件重建時，
  在 Performance 面板中新增提示訊息。
  [#9755](https://github.com/flutter/devtools/pull/9755)

## CPU profiler 更新

* 修正一個錯誤：調整 CPU flame chart 大小時，
  圖表頂部的時間數值會跟著改變。
  [#9915](https://github.com/flutter/devtools/pull/9915)

## 記憶體更新

* 新增將類別釘選在 Profile Memory 表格頂端的功能。
  [#8898](https://github.com/flutter/devtools/issues/8898)

## 偵錯工具更新

* 防止數值在評估期間被垃圾回收 (garbage-collected)。
  [#9885](https://github.com/flutter/devtools/pull/9885)
* 更新至最新版的 Dart 語法醒目提示文法 (syntax highlighting grammar)。
  [#9920](https://github.com/flutter/devtools/pull/9920)
* 修正 TextMate 文法解析器的錯誤：
  該錯誤可能導致註解之後的程式碼被歸類為註解。
  [#9921](https://github.com/flutter/devtools/pull/9921)
* 修正當 Debugger 畫面較窄時（例如 DevTools 嵌入 IDE 側邊面板時），
  偵錯控制項溢出的問題。控制項現在會水平捲動，而不再溢出。
  [#9949](https://github.com/flutter/devtools/pull/9949)

## Network profiler 更新

* 修正 Copy as cURL 在請求失敗或逾時時，
  會遺漏請求標頭與內容的問題。
  [#9963](https://github.com/flutter/devtools/pull/9963)
* 在 Network profiler 中新增 WebSocket 支援，
  包含 WebSocket 連線詳細資訊、生命週期事件、
  訊框 (frame) 層級的檢視，以及連線時間資訊。
  [#9968](https://github.com/flutter/devtools/pull/9968)
* 修正一個問題：hot restart 之後，
  Network 分頁會停止擷取 HTTP 請求。
  [#9856](https://github.com/flutter/devtools/pull/9856)
* 修正一個問題：在錄製期間按下 Clear 之後，
  Network 分頁會停止擷取新的 HTTP 請求。
  [#9856](https://github.com/flutter/devtools/pull/9856)

## Logging 更新

* 修正 GC 事件的時間單位與累計性質。
  [#9890](https://github.com/flutter/devtools/pull/9890)
* 修正一個錯誤：過長的 `dart:developer` 記錄訊息
  會失去結構化的 Details 檢視。
  [#10011](https://github.com/flutter/devtools/pull/10011)

## Deep links 工具更新

* 在狀態列新增「Watch tutorial」連結，
  指向[深層連結影片教學](https://youtu.be/d7sZL6h1Elw)。
  [#9925](https://github.com/flutter/devtools/pull/9925)
* 在 Deep Links 工具中驗證建置選項參數，
  並顯示 iOS universal link 設定錯誤。
  [#10022](https://github.com/flutter/devtools/pull/10022)

## DevTools 擴充功能更新

* 在標準畫面上，於單一畫面嵌入模式
  (`EmbedMode.embedOne`) 下隱藏 DevTools 擴充功能選單按鈕。
  [#8507](https://github.com/flutter/devtools/issues/8507)
* 為嵌入的 DevTools 擴充功能新增 iframe 沙箱 (sandboxing)，
  以強制執行來源隔離。 [#9967](https://github.com/flutter/devtools/pull/9967)
* 透過追蹤提供擴充功能的套件名稱，
  來改善 DevTools 擴充功能的隔離性，
  用於啟用、去重與資源載入。
  [#9981](https://github.com/flutter/devtools/pull/9981)

## 完整提交記錄

若要查看此版本的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.61.0)。

