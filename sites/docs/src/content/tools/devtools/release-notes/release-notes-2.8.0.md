---
title: DevTools 2.8.0 發行說明
shortTitle: 2.8.0 發行說明
breadcrumb: 2.8.0
description: Dart 與 Flutter DevTools 2.8.0 版的發行說明。
showToc: false
---

Dart 與 Flutter DevTools 2.8.0 版本
帶來了以下變更及其他一般性改進。
如需進一步了解 DevTools，請參閱
[DevTools 總覽](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 初始頁面載入時間優化 -
  [#3325](https://github.com/flutter/devtools/pull/3325)
* 連接 DevTools 至裝置的效能提升，
  對於記憶體較低的裝置特別有感 -
  [#3468](https://github.com/flutter/devtools/pull/3468)
* 對於使用 Flutter 2.8.0 或更高版本（或 Dart 2.15.0 或更高版本）的使用者，
  現在應透過 `dart devtools` 指令啟動 DevTools，
  而非執行 `pub global activate devtools`。
  DevTools 2.8.0 將是最後一個於 pub 發佈的 DevTools 版本，
  未來所有 DevTools 版本都將隨 Dart SDK 一同發佈。
  若您看到此警告，
  請務必透過 `dart devtools` 開啟 DevTools，而非從 pub 啟動：

  ![dart devtools warning dialog](/assets/images/docs/tools/devtools/release-notes/images-2.8.0/image1.png "dart devtools warning dialog")

## 效能更新

* 新增「Enhance Tracing（增強追蹤）」功能，協助使用者診斷由於 Build、Layout 與 Paint 操作過於耗時所導致的 UI 卡頓。

  ![Enhance tracing](/assets/images/docs/tools/devtools/release-notes/images-2.8.0/image2.png "Enhance tracing")

  預期的操作流程如下：

  1. 使用者於效能頁面調查 UI 卡頓問題
  2. 使用者發現 Build、Layout 和/或 Paint 事件耗時過長
  3. 使用者於「Enhance Tracing」功能中開啟對應的追蹤開關
  4. 使用者於應用程式中重現 UI 卡頓
  5. 使用者查看新的 Timeline 事件集，現在應該會有
     額外的子事件，顯示哪些元件 (Widget) 被建立、哪些 render objects 被版面配置，
     以及/或哪些 render objects 被渲染

  ![Timeline events](/assets/images/docs/tools/devtools/release-notes/images-2.8.0/image3.png "Timeline events")

* 新增「More debugging options（更多除錯選項）」功能，可用來停用 Clip、Opacity 與 Physical Shapes 的渲染層。

  ![More debugging options](/assets/images/docs/tools/devtools/release-notes/images-2.8.0/image4.png "More debugging options")

  預期的操作流程如下：

  1. 使用者於效能頁面調查 UI 卡頓問題
  2. 使用者發現有許多卡頓畫格，並懷疑可能與過度使用裁剪（clipping）、透明度（opacity）或物理形狀（physical shapes）有關
  3. 使用者於「More debugging options」功能中關閉對應的渲染層開關
  4. 使用者於應用程式中重現 UI 卡頓
  5. 若關閉某個渲染層後 UI 卡頓減少，
     使用者應嘗試優化應用程式，減少裁剪/透明度/物理形狀效果的使用。
     若 UI 卡頓未減少，
     則可確認效能問題並非由這些 UI 效果所致。

## 除錯器更新

* 將「Libraries」窗格更換為「File Explorer（檔案總管）」窗格 -
  [#3448](https://github.com/flutter/devtools/pull/3448)。
  「File Explorer」窗格包含兩個部分：

  1. 應用程式中所有函式庫的樹狀檢視。
     您可以使用 File Explorer 來尋找並開啟函式庫，
     或使用現有的 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> +
     <kbd>P</kbd> 鍵盤快速鍵來搜尋檔案。
  1. 新增的「Outline（大綱）」檢視，顯示所選函式庫的結構。
     此檢視會顯示類別、成員、方法等，
     當選取某個項目時，
     原始碼檢視會自動跳至該項目對應的程式碼行。

  ![Outline view selected library](/assets/images/docs/tools/devtools/release-notes/images-2.8.0/image5.png "Outline view selected library")

* 表達式評估自動完成效能提升 -
  [#3463](https://github.com/flutter/devtools/pull/3463)
* 修正鍵盤快速鍵相關的錯誤 -
  [#3458](https://github.com/flutter/devtools/pull/3458)
* UI 優化 - [#3421](https://github.com/flutter/devtools/pull/3421),
  [#3449](https://github.com/flutter/devtools/pull/3449)

## 完整提交紀錄

如需查詢自上個版本以來的所有變更，
請參閱
[GitHub 上的差異比較](https://github.com/flutter/devtools/compare/v2.7.0...v2.8.0)。
