# DevTools 2.8.0 發行說明

Dart 與 Flutter DevTools 2.8.0 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 初始頁面載入時間改進 -
  [#3325](https://github.com/flutter/devtools/pull/3325)
* 將 DevTools 連接至裝置時的效能提升，
  對於低記憶體裝置特別有感 -
  [#3468](https://github.com/flutter/devtools/pull/3468)
* 對於使用 Flutter 2.8.0 或更高版本（或 Dart 2.15.0 或更高版本）的用戶，
  DevTools 現在應透過 `dart devtools` 指令啟動，
  而非執行 `pub global activate devtools`。
  DevTools 2.8.0 將是最後一個透過 pub 發佈的版本，
  未來所有 DevTools 版本都將隨 Dart SDK 一同發佈。
  若您看到此警告，
  請務必透過 `dart devtools` 開啟 DevTools，而非從 pub 啟動：

  ![dart devtools warning dialog](/assets/images/docs/tools/devtools/release-notes/images-2.8.0/image1.png "dart devtools warning dialog")

## 效能更新

* 新增「增強追蹤（Enhance Tracing）」功能，協助使用者診斷由於 Build、Layout 與 Paint 操作過於耗時所導致的 UI 卡頓。

  ![Enhance tracing](/assets/images/docs/tools/devtools/release-notes/images-2.8.0/image2.png "Enhance tracing")
  
  預期的操作流程如下：
  
  1. 使用者在效能頁面調查 UI 卡頓問題
  2. 使用者注意到 Build、Layout 和/或 Paint 事件持續時間過長
  3. 使用者在「增強追蹤」功能中開啟對應的追蹤開關
  4. 使用者在自己的應用程式中重現 UI 卡頓
  5. 使用者查看新的 Timeline 事件集，此時應會有
     額外的子事件，顯示元件（Widgets）建構、渲染物件版面配置、
     和/或渲染物件繪製的詳細資訊

  ![Timeline events](/assets/images/docs/tools/devtools/release-notes/images-2.8.0/image3.png "Timeline events")

* 新增「更多除錯選項（More debugging options）」功能，可用於停用 Clip、Opacity 與 Physical Shapes 的渲染層。

  ![More debugging options](/assets/images/docs/tools/devtools/release-notes/images-2.8.0/image4.png "More debugging options")
  
  預期的操作流程如下：
  
  1. 使用者在效能頁面調查 UI 卡頓問題
  2. 使用者發現有大量卡頓畫面，並懷疑可能是因為
     過度使用剪裁（clipping）、透明度（opacity）或物理形狀（physical shapes）所致
  3. 使用者在「更多除錯選項」功能中關閉對應的渲染層開關
  4. 使用者在自己的應用程式中重現 UI 卡頓
  5. 若關閉某個渲染層後 UI 卡頓有所減少，
     則建議使用者優化應用程式，減少剪裁／透明度／物理形狀等效果的使用。
     若 UI 卡頓未減少，
     則使用者可確認效能問題並非由這些 UI 效果造成。

## 除錯器更新

* 將「Libraries」面板替換為「File Explorer」面板 -
  [#3448](https://github.com/flutter/devtools/pull/3448)。
  「File Explorer」面板包含兩個部分：

  1. 應用程式中所有程式庫的樹狀檢視。
     您可以使用 File Explorer 尋找並開啟程式庫，
     也可以使用現有的 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> +
     <kbd>P</kbd> 鍵盤快速鍵來搜尋檔案。
  1. 新增的「Outline」檢視，可顯示所選程式庫的結構。
     此檢視會顯示類別、成員、方法等，
     當選取某一項目時，
     原始碼檢視會自動跳至該項目的對應程式碼行。

  ![Outline view selected library](/assets/images/docs/tools/devtools/release-notes/images-2.8.0/image5.png "Outline view selected library")

* 表達式自動完成效能提升 -
  [#3463](https://github.com/flutter/devtools/pull/3463)
* 修正鍵盤快速鍵相關的錯誤 -
  [#3458](https://github.com/flutter/devtools/pull/3458)
* UI 優化 - [#3421](https://github.com/flutter/devtools/pull/3421),
  [#3449](https://github.com/flutter/devtools/pull/3449)

## 完整提交紀錄

如需查詢自上個版本以來的完整變更清單，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.7.0...v2.8.0)。
