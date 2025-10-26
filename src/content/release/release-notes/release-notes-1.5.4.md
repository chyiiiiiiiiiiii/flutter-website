---
title: Flutter 1.5.4 版本發佈說明
shortTitle: 1.5.4 版本發佈說明
description: Flutter 1.5.4 的發佈說明。
---

自 1.2 版本發佈以來，Flutter 團隊持續專注於提升品質與穩定性。隨著 Google I/O 大會的臨近，Flutter 1.5.4 穩定版也帶來了一系列新功能。此外，[Apple 對於 iOS SDK 12.1 版本的建置有設下期限](https://developer.apple.com/news/?id=03202019a)，而本次更新已符合此要求。只需拉取 1.5.4 穩定版，重新建置並將您的 Flutter 應用程式上架至 Apple Store，即可滿足 Apple 的規定。

此外，本次版本也修復了 Flutter 1.2 中出現的兩個回歸問題：

* [#28640](https://github.com/flutter/flutter/issues/28640) NoSuchMethodError: **android.view.MotionEvent.isFromSource 已於 1.3.7 之後的所有版本中關閉並修復
* [#28484](https://github.com/flutter/flutter/issues/28484) Widget rendering strange since Flutter update:** 此回歸問題已於 1.4.0 修正

最後，若想了解其他修復與新功能的詳細內容，請繼續閱讀下文。


## 重大變更（Breaking Changes）

我們最近的調查顯示，Flutter 開發者傾向於接受重大變更，只要這能改善 Flutter 的 API 與行為。當然，我們仍會謹慎進行重大變更。以下列出本次版本的重大變更，並附上每項變更的完整說明及在 Flutter 程式碼中的處理方式連結。

*   [flutter#26261](https://github.com/flutter/flutter/issues/26261): CupertinoTextField 的 cursorColor 預設值現在會與應用程式主題一致（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/uJFi5sENr1g)）
*   [flutter#26026](https://github.com/flutter/flutter/issues/26261): 使用原始 EditableText 時需手動觸發選擇工具列（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/uJFi5sENr1g)）
*   [flutter#23148](https://github.com/flutter/flutter/issues/26261): 提出修正以統一 Firebase Messaging Plugin 在 Android 與 iOS 上的回應行為（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/v4dt7Zc-NGg)）
*   [flutter#28014](https://github.com/flutter/flutter/issues/26261): PointerEvent 轉換為 Diagnosticable（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/ZPPRKV642Uk)）
*   [flutter#20183](https://github.com/flutter/flutter/issues/26261): CupertinoTextField：將提供的 TextStyle 與 Theme 的 TextStyle 合併（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/3OV8J3GhO6U)）
*   [flutter#20693](https://github.com/flutter/flutter/issues/26261): LongPressGestureRecognizer 在長按後移動不再丟棄 up 事件（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/kWT0J8Ii5Rw)）
*   [flutter#20693](https://github.com/flutter/flutter/issues/26261): GestureRecognizerState 列舉新增 'accepted' 值（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/YXNZ4OFL8Uo)）
*   [flutter#18314](https://github.com/flutter/flutter/issues/26261), [flutter#22830](https://github.com/flutter/flutter/issues/26261), [flutter#23424](https://github.com/flutter/flutter/issues/26261): Drag 的 moveBy 呼叫被拆分，且所有帶有拖曳辨識器的元件預設 DragStartBehavior 改為 DragStartBehavior.start（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/iTZt49dP_pU)）
*   [flutter#27891](https://github.com/flutter/flutter/issues/26261): 所有平台上的實體形狀支援複合圖層（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/8bAn-BPQPE8)）
*   [flutter#19418](https://github.com/flutter/flutter/issues/26261): AndroidViewController 新增 onPlatformViewCreated（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/LoAfcK5IJ9A)）
*   [flutter#29070](https://github.com/flutter/flutter/issues/26261): BackdropFilter 會填滿其父層／祖先的裁剪區域（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/AC4NDVh1h5k)）
*   [flutter#29816](https://github.com/flutter/flutter/issues/26261): FontWeight.lerp 若參數為 null 則回傳 null（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/0uS_Hzq894I)）
*   [flutter#29696](https://github.com/flutter/flutter/issues/26261): PointerEnterEvent 與 PointerExitEvent 的 fromHoverEvent 改名為 fromMouseEvent（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/ECoJc9LOs2M)）
*   [flutter#28602](https://github.com/flutter/flutter/pull/28602): 允許 PointerEnterEvent 與 PointerExitEvent 可從任何 PointerEvent 建立
*   [flutter#28953](https://github.com/flutter/flutter/pull/28953): 在 semantics tree 中包含 platformViewId
*   [flutter#27612](https://github.com/flutter/flutter/pull/27612): 在帶有 strut 的 TextFields 強制行高
*   [flutter#30991](https://github.com/flutter/flutter/pull/30991): 在 Android 上使用字形的完整高度作為游標高度
*   [flutter#30414](https://github.com/flutter/flutter/pull/30414): 移除部分 pointer events 的壓力自訂化
*   [engine#8274](https://github.com/flutter/engine/pull/8274): [ui] 在 FontWeight.lerp 中加入 null 檢查


## 嚴重效能與崩潰修正

本次版本修復了多項嚴重效能與崩潰問題。

*   [flutter#30990](https://github.com/flutter/flutter/pull/30990): 允許在 profile 模式下進行元件建構分析
*   [flutter#30985](https://github.com/flutter/flutter/pull/30985): 新增 rrect contains microbenchmark
*   [flutter#28651](https://github.com/flutter/flutter/pull/28651): 無法執行操作，因為 FlutterJNI 尚未連接至 native。


## iOS 相關變更

對 Flutter 團隊來說，支援 iOS 與支援 Android 同等重要，這從本次版本中大量針對 iOS 體驗的優化可見一斑。

*   [flutter#29200](https://github.com/flutter/flutter/pull/29200): Cupertino 在地化第一步：新增英文 arb 檔案
*   [flutter#29821](https://github.com/flutter/flutter/pull/29821): Cupertino 在地化 1.5 步驟：修正 cupertino_en.arb 的資源不符
*   [flutter#30160](https://github.com/flutter/flutter/pull/30160): Cupertino 在地化 1.9：為 cupertino_en.arb 新增必要的單數資源
*   [flutter#29644](https://github.com/flutter/flutter/pull/29644): Cupertino 在地化第三步：調整部分 material 工具位置，為 cupertino 騰出空間
*   [flutter#29650](https://github.com/flutter/flutter/pull/29650): Cupertino 在地化第四步：讓產生的日期在地化可結合 material 與 cupertino 語系
*   [flutter#29708](https://github.com/flutter/flutter/pull/29708): Cupertino 在地化第五步：新增法文 arb 作為翻譯範例
*   [flutter#29767](https://github.com/flutter/flutter/pull/29767): Cupertino 在地化第六步：新增帶有日期時間格式化的 GlobalCupertinoLocalizations 基底類別
*   [flutter#30527](https://github.com/flutter/flutter/pull/30527): Cupertino 在地化第十一步：在說明中新增更多翻譯說明
*   [flutter#28629](https://github.com/flutter/flutter/pull/28629): 確保 Cupertino 頁面轉場在返回滑動時可線性過渡
*   [flutter#28001](https://github.com/flutter/flutter/pull/28001): CupertinoTextField：新增可變更 placeholder 顏色的能力
*   [flutter#29304](https://github.com/flutter/flutter/pull/29304): 在 iOS 的 semantics tree 中包含 platformViewId
*   [flutter#29946](https://github.com/flutter/flutter/pull/29946): 讓 CupertinoPageScaffold 支援點擊狀態列回頂部
*   [flutter#29474](https://github.com/flutter/flutter/pull/29474): 讓 CupertinoTextField 的清除按鈕同時觸發 onChanged
*   [flutter#29008](https://github.com/flutter/flutter/pull/29008): 更新 CupertinoTextField
*   [flutter#29630](https://github.com/flutter/flutter/pull/29630): 為 CupertinoIcons 新增愛心圖形
*   [flutter#28597](https://github.com/flutter/flutter/pull/28597): 調整剩餘的 Cupertino 路由動畫以符合原生效果
*   [flutter#29407](https://github.com/flutter/flutter/pull/29407): [cupertino_icons] 新增 circle 與 circle_filled，供 radio button 使用
*   [flutter#29024](https://github.com/flutter/flutter/pull/29024): 修正 CupertinoTabView 在視圖內縮變更時的樹狀結構
*   [flutter#28478](https://github.com/flutter/flutter/pull/28478): 支援 iOS 裝置回報壓力數據為 0
*   [flutter#29987](https://github.com/flutter/flutter/pull/29987): 更新 CupertinoSwitch 文件
*   [flutter#29943](https://github.com/flutter/flutter/pull/29943): 移除導航欄與安全區域子元件間不必要的間隙
*   [flutter#28855](https://github.com/flutter/flutter/pull/28855): 將 material iOS 返回滑動測試移至 material
*   [flutter#28756](https://github.com/flutter/flutter/pull/28756): 處理 Cupertino 返回手勢被 Navigator push 中斷的情況
*   [flutter#31088](https://github.com/flutter/flutter/pull/31088): 文字欄位 (text field) 捲動物理效果
*   [flutter#30946](https://github.com/flutter/flutter/pull/30946): 新增更多 cupertino 圖示
*   [flutter#30521](https://github.com/flutter/flutter/pull/30521): 在 CupertinoTheme 中提供預設 IconTheme
*   [flutter#30475](https://github.com/flutter/flutter/pull/30475): 修正觸控板模式下的崩潰問題


## Material 相關變更

當然，Material 仍然是 Flutter 團隊的重點之一。

*   [flutter#28290](https://github.com/flutter/flutter/pull/28290): [Material] 建立 FloatingActionButton ThemeData 並在 FloatingActionButton 內遵循（[#28735](https://github.com/flutter/flutter/pull/28735)）
*   [flutter#29980](https://github.com/flutter/flutter/pull/29980): 修正帳號抽屜標頭箭頭在 setState 時旋轉的問題
*   [flutter#29563](https://github.com/flutter/flutter/pull/29563): 拖曳選取文字時避免閃爍
*   [flutter#29138](https://github.com/flutter/flutter/pull/29138): 更新 DropdownButton 下劃線為可自訂
*   [flutter#29572](https://github.com/flutter/flutter/pull/29572): DropdownButton 圖示可自訂
*   [flutter#29183](https://github.com/flutter/flutter/pull/29183): 在 TabBarTheme 中實作 labelPadding 設定
*   [flutter#21834](https://github.com/flutter/flutter/pull/21834): App Bar 新增 shapeBorder 選項
*   [flutter#28163](https://github.com/flutter/flutter/pull/28163): [Material] 為 chips 及 chip themes 新增陰影顏色與選取時陰影顏色設定
*   [flutter#27711](https://github.com/flutter/flutter/pull/27711): 讓擴展型 FAB 的圖示為選填
*   [flutter#28159](https://github.com/flutter/flutter/pull/28159): [Material] 擴展 BottomNavigationBar API（再版）
*   [flutter#27973](https://github.com/flutter/flutter/pull/27973): Scaffold 新增 extendBody 參數，body 的 MediaQuery 反映 BAB 高度
*   [flutter#30390](https://github.com/flutter/flutter/pull/30390): [Material] 更新 slider 及 slider theme，包含新尺寸、形狀與顏色對應
*   [flutter#29390](https://github.com/flutter/flutter/pull/29390): 讓展開面板可選擇是否點擊標頭時切換狀態
*   [flutter#30754](https://github.com/flutter/flutter/pull/30754): [Material] 修正 showDialog 因舊 context 導致的崩潰
*   [flutter#30525](https://github.com/flutter/flutter/pull/30525): 修正游標超出輸入寬度問題
*   [flutter#30805](https://github.com/flutter/flutter/pull/30805): 使用 Scaffold 範本更新 ExpansionPanelList 範例
*   [flutter#30537](https://github.com/flutter/flutter/pull/30537): ListTile 範例程式碼新增內嵌圖片與多種變化
*   [flutter#30455](https://github.com/flutter/flutter/pull/30455): 確保卡片尺寸適應螢幕，避免 shrine 垂直捲動
*   [flutter#29413](https://github.com/flutter/flutter/pull/29413): 修正 MaterialApp 的 _navigatorObserver 僅使用 builder 時的問題


## 桌面端相關變更

Flutter 正積極擴展對桌面級輸入機制的支援，包括鍵盤對應、文字選取、滑鼠滾輪與懸停偵測，以及工具鏈初步支援桌面平台。

*   [flutter#29993](https://github.com/flutter/flutter/pull/29993): 新增 Linux 鍵盤對應
*   [flutter#29769](https://github.com/flutter/flutter/pull/29769): 為 Cupertino 文字欄位新增滑鼠選取文字支援
*   [flutter#22762](https://github.com/flutter/flutter/pull/22762): 新增滾輪支援
*   [flutter#28900](https://github.com/flutter/flutter/pull/28900): 為 cupertino button 新增鍵盤支援
*   [flutter#28290](https://github.com/flutter/flutter/pull/28290): 支援滑鼠選取文字
*   [flutter#28602](https://github.com/flutter/flutter/pull/28602): 允許 PointerEnterEvent 與 PointerExitEvent 可從任何 PointerEvent 建立
*   [flutter#30829](https://github.com/flutter/flutter/pull/30829): 讓 hover 標註圖層與滑鼠偵測器保持同步
*   [flutter#30648](https://github.com/flutter/flutter/pull/30648): 允許下載桌面嵌入式資源
*   [flutter#31283](https://github.com/flutter/flutter/pull/31283): 為 doctor 新增桌面工作流程
*   [flutter#31229](https://github.com/flutter/flutter/pull/31229): 為 linux 與 windows 新增 flutter run 支援
*   [flutter#31277](https://github.com/flutter/flutter/pull/31277): 傳遞 track widget creation 旗標至建置腳本
*   [flutter#31218](https://github.com/flutter/flutter/pull/31218): 新增 macOS 目標的執行能力
*   [flutter#31205](https://github.com/flutter/flutter/pull/31205): 新增桌面專案與建置指令（實驗性）
*   [flutter#30670](https://github.com/flutter/flutter/issues/30670): 為 C++ shells 實作 StandardMethodCodec


## 框架（Framework）相關變更

除了平台相關更新外，我們也持續強化 Flutter 框架核心。

*   [engine#8402](https://github.com/flutter/engine/pull/8402): 支援關閉所有 VM 的 root isolate
*   [flutter#31210](https://github.com/flutter/flutter/pull/31210): 在 Android v2 上使用字形完整高度作為游標高度
*   [flutter#30422](https://github.com/flutter/flutter/pull/30422): 當返回滑動結束時立即執行 navigator.pop
*   [flutter#30792](https://github.com/flutter/flutter/pull/30792): Border.uniform() 改名為 Border.fromSide()
*   [flutter#31159](https://github.com/flutter/flutter/pull/31159): 還原「在 Android 上使用字形完整高度作為游標高度」
*   [flutter#30932](https://github.com/flutter/flutter/pull/30932): 2D 轉換使用者體驗改進
*   [flutter#30898](https://github.com/flutter/flutter/pull/30898): 檢查 ErrorWidget.builder 在測試後未被修改
*   [flutter#30809](https://github.com/flutter/flutter/pull/30809): 修正 issue 23527：Exception: RenderViewport 超出最大子項數
*   [flutter#30880](https://github.com/flutter/flutter/pull/30880): 讓 sliver.dart 的 _createErrorWidget 可與其他元件協作
*   [flutter#30876](https://github.com/flutter/flutter/pull/30876): 簡化 toImage future 處理
*   [flutter#30470](https://github.com/flutter/flutter/pull/30470): 修正 Table flex column 版面配置錯誤 #30437
*   [flutter#30215](https://github.com/flutter/flutter/pull/30215): 檢查無效
