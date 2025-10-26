---
title: Flutter 1.5.4 版本說明
shortTitle: 1.5.4 版本說明
description: Flutter 1.5.4 的版本說明。
---

自 1.2 版本以來，Flutter 團隊持續專注於品質與穩定性。隨著 Google I/O 大會的臨近，Flutter 1.5.4 穩定版也帶來了一系列新功能。此外，[Apple 對於 iOS SDK 12.1 版本有建置期限要求](https://developer.apple.com/news/?id=03202019a)，本次更新已符合該要求。您只需拉取 1.5.4 穩定版，建置並將您的 Flutter 應用程式更新至 Apple Store，即可滿足 Apple 的規範。

此外，本次版本修復了 Flutter 1.2 版本中出現的兩個回歸問題：

* [#28640](https://github.com/flutter/flutter/issues/28640) NoSuchMethodError: **android.view.MotionEvent.isFromSource** 問題已在 1.3.7 之後所有版本關閉並修復
* [#28484](https://github.com/flutter/flutter/issues/28484) Widget rendering strange since Flutter update:** 此回歸問題已於 1.4.0 修正

如需更多修復與新功能細節，請繼續閱讀下方內容。


## 破壞性變更（Breaking Changes）

我們最近的調查顯示，Flutter 開發者傾向於接受破壞性變更，只要能改善 Flutter 的 API 與行為。當然，我們仍然謹慎地進行破壞性變更。以下是本次版本的破壞性變更列表，並附有每項變更的完整說明連結及在 Flutter 程式碼中的因應方式：

*   [flutter#26261](https://github.com/flutter/flutter/issues/26261)：CupertinoTextField 的 cursorColor 預設值現在會符合應用程式主題（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/uJFi5sENr1g)）
*   [flutter#26026](https://github.com/flutter/flutter/issues/26261)：使用原始 EditableText 時需手動觸發選取工具列（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/uJFi5sENr1g)）
*   [flutter#23148](https://github.com/flutter/flutter/issues/26261)：提出修正以統一 Firebase Messaging Plugin 在 Android 與 iOS 的回應（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/v4dt7Zc-NGg)）
*   [flutter#28014](https://github.com/flutter/flutter/issues/26261)：PointerEvent 轉換為 Diagnosticable（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/ZPPRKV642Uk)）
*   [flutter#20183](https://github.com/flutter/flutter/issues/26261)：CupertinoTextField：合併提供的 TextStyle 與主題的 TextStyle（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/3OV8J3GhO6U)）
*   [flutter#20693](https://github.com/flutter/flutter/issues/26261)：LongPressGestureRecognizer 長按後移動不再丟棄 up 事件（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/kWT0J8Ii5Rw)）
*   [flutter#20693](https://github.com/flutter/flutter/issues/26261)：GestureRecognizerState 列舉新增 'accepted' 值（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/YXNZ4OFL8Uo)）
*   [flutter#18314](https://github.com/flutter/flutter/issues/26261)、[flutter#22830](https://github.com/flutter/flutter/issues/26261)、[flutter#23424](https://github.com/flutter/flutter/issues/26261)：Drag moveBy 呼叫被拆成兩部分，且所有帶拖曳辨識元件的預設 DragStartBehavior 改為 DragStartBehavior.start（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/iTZt49dP_pU)）
*   [flutter#27891](https://github.com/flutter/flutter/issues/26261)：所有平台的物理形狀合成層（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/8bAn-BPQPE8)）
*   [flutter#19418](https://github.com/flutter/flutter/issues/26261)：AndroidViewController 新增 onPlatformViewCreated（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/LoAfcK5IJ9A)）
*   [flutter#29070](https://github.com/flutter/flutter/issues/26261)：BackdropFilter 會填滿其父層／祖先剪裁區域（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/AC4NDVh1h5k)）
*   [flutter#29816](https://github.com/flutter/flutter/issues/26261)：FontWeight.lerp 若參數為 null 則回傳 null（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/0uS_Hzq894I)）
*   [flutter#29696](https://github.com/flutter/flutter/issues/26261)：PointerEnterEvent 與 PointerExitEvent 的 fromHoverEvent 改名為 fromMouseEvent（[公告與因應方式](https://groups.google.com/forum/#!topic/flutter-announce/ECoJc9LOs2M)）
*   [flutter#28602](https://github.com/flutter/flutter/pull/28602)：允許 PointerEnterEvent 與 PointerExitEvents 可由任意 PointerEvent 建立
*   [flutter#28953](https://github.com/flutter/flutter/pull/28953)：semantics tree 中加入 platformViewId
*   [flutter#27612](https://github.com/flutter/flutter/pull/27612)：TextFields 強制行高（line height）與 strut 一致
*   [flutter#30991](https://github.com/flutter/flutter/pull/30991)：Android 上 caret 高度使用字形完整高度
*   [flutter#30414](https://github.com/flutter/flutter/pull/30414)：移除部分 pointer events 的壓力（pressure）自訂化
*   [engine#8274](https://github.com/flutter/engine/pull/8274)：[ui] FontWeight.lerp 增加 null 檢查


## 嚴重效能與崩潰修正

本次版本修復了多項嚴重效能與崩潰問題。

*   [flutter#30990](https://github.com/flutter/flutter/pull/30990)：允許在 profile 模式下建立 profile widget
*   [flutter#30985](https://github.com/flutter/flutter/pull/30985)：新增 rrect contains 微型效能測試
*   [flutter#28651](https://github.com/flutter/flutter/pull/28651)：因 FlutterJNI 未連接至原生層而無法執行操作


## iOS 相關變更

Flutter 團隊同樣重視 iOS 支援，本次版本針對 iOS 體驗進行了大量優化。

*   [flutter#29200](https://github.com/flutter/flutter/pull/29200)：Cupertino 本地化第一步：新增英文 arb 檔案
*   [flutter#29821](https://github.com/flutter/flutter/pull/29821)：Cupertino 本地化第 1.5 步：修正 cupertino_en.arb 資源不匹配
*   [flutter#30160](https://github.com/flutter/flutter/pull/30160)：Cupertino 本地化 1.9：cupertino_en.arb 新增必要的單數資源
*   [flutter#29644](https://github.com/flutter/flutter/pull/29644)：Cupertino 本地化第 3 步：移動部分 material 工具以騰出 Cupertino 空間
*   [flutter#29650](https://github.com/flutter/flutter/pull/29650)：Cupertino 本地化第 4 步：讓產生的日期本地化可結合 material 與 cupertino 語系
*   [flutter#29708](https://github.com/flutter/flutter/pull/29708)：Cupertino 本地化第 5 步：新增法文 arb 作為翻譯範例
*   [flutter#29767](https://github.com/flutter/flutter/pull/29767)：Cupertino 本地化第 6 步：新增 GlobalCupertinoLocalizations 基底類別，含日期時間格式化
*   [flutter#30527](https://github.com/flutter/flutter/pull/30527)：Cupertino 本地化第 11 步：說明中新增更多翻譯細節
*   [flutter#28629](https://github.com/flutter/flutter/pull/28629)：確保 Cupertino 頁面轉場在回滑時可線性過渡
*   [flutter#28001](https://github.com/flutter/flutter/pull/28001)：CupertinoTextField：新增可自訂 placeholder 顏色
*   [flutter#29304](https://github.com/flutter/flutter/pull/29304)：iOS 的 semantics tree 中加入 platformViewId
*   [flutter#29946](https://github.com/flutter/flutter/pull/29946)：CupertinoPageScaffold 支援點擊狀態列回頂端
*   [flutter#29474](https://github.com/flutter/flutter/pull/29474)：CupertinoTextField 的清除按鈕也會呼叫 onChanged
*   [flutter#29008](https://github.com/flutter/flutter/pull/29008)：更新 CupertinoTextField
*   [flutter#29630](https://github.com/flutter/flutter/pull/29630)：CupertinoIcons 新增愛心圖示
*   [flutter#28597](https://github.com/flutter/flutter/pull/28597)：調整 Cupertino 路由動畫以符合原生效果
*   [flutter#29407](https://github.com/flutter/flutter/pull/29407)：[cupertino_icons] 新增 circle 與 circle_filled，供 radio 按鈕使用
*   [flutter#29024](https://github.com/flutter/flutter/pull/29024)：修正 CupertinoTabView 在視圖嵌入變更時的樹狀結構
*   [flutter#28478](https://github.com/flutter/flutter/pull/28478)：支援 iOS 裝置回報壓力資料為 0
*   [flutter#29987](https://github.com/flutter/flutter/pull/29987)：更新 CupertinoSwitch 文件
*   [flutter#29943](https://github.com/flutter/flutter/pull/29943)：移除導覽列與安全區域子元件間多餘間距
*   [flutter#28855](https://github.com/flutter/flutter/pull/28855)：將 material iOS 回滑測試移至 material
*   [flutter#28756](https://github.com/flutter/flutter/pull/28756)：處理 Navigator push 中斷 Cupertino 回退手勢
*   [flutter#31088](https://github.com/flutter/flutter/pull/31088)：文字欄位滾動物理效果
*   [flutter#30946](https://github.com/flutter/flutter/pull/30946)：新增更多 Cupertino 圖示
*   [flutter#30521](https://github.com/flutter/flutter/pull/30521)：CupertinoTheme 提供預設 IconTheme
*   [flutter#30475](https://github.com/flutter/flutter/pull/30475)：修正觸控板模式崩潰


## Material 相關變更

Material 仍然是 Flutter 團隊的重點之一。

*   [flutter#28290](https://github.com/flutter/flutter/pull/28290)：[Material] 建立 FloatingActionButton ThemeData 並於 FloatingActionButton 中支援（[#28735](https://github.com/flutter/flutter/pull/28735)）
*   [flutter#29980](https://github.com/flutter/flutter/pull/29980)：修正帳號抽屜標頭箭頭在 setState 時旋轉的問題
*   [flutter#29563](https://github.com/flutter/flutter/pull/29563)：拖曳選取文字時避免閃爍
*   [flutter#29138](https://github.com/flutter/flutter/pull/29138)：DropdownButton 下劃線可自訂
*   [flutter#29572](https://github.com/flutter/flutter/pull/29572)：DropdownButton 圖示可自訂
*   [flutter#29183](https://github.com/flutter/flutter/pull/29183)：TabBarTheme 實作 labelPadding 設定
*   [flutter#21834](https://github.com/flutter/flutter/pull/21834)：App Bar 新增 shapeBorder 選項
*   [flutter#28163](https://github.com/flutter/flutter/pull/28163)：[Material] 支援 chip 及 chip 主題的陰影顏色與選取陰影顏色
*   [flutter#27711](https://github.com/flutter/flutter/pull/27711)：extended FAB 的 icon 可選擇性提供
*   [flutter#28159](https://github.com/flutter/flutter/pull/28159)：[Material] 擴充 BottomNavigationBar API（重啟）
*   [flutter#27973](https://github.com/flutter/flutter/pull/27973)：Scaffold 新增 extendBody 參數，body 的 MediaQuery 反映 BAB 高度
*   [flutter#30390](https://github.com/flutter/flutter/pull/30390)：[Material] 更新 slider 與 slider theme，包含新尺寸、形狀與顏色對應
*   [flutter#29390](https://github.com/flutter/flutter/pull/29390)：Expansion panel 可選擇點擊標頭切換狀態
*   [flutter#30754](https://github.com/flutter/flutter/pull/30754)：[Material] 修正 showDialog 因舊 context 崩潰
*   [flutter#30525](https://github.com/flutter/flutter/pull/30525)：修正游標超出輸入框寬度
*   [flutter#30805](https://github.com/flutter/flutter/pull/30805)：ExpansionPanelList 範例更新，加入 Scaffold 範本
*   [flutter#30537](https://github.com/flutter/flutter/pull/30537)：ListTile 範例加入嵌入圖片及多種變化
*   [flutter#30455](https://github.com/flutter/flutter/pull/30455)：shrine 垂直滾動防止，確保卡片大小適配螢幕
*   [flutter#29413](https://github.com/flutter/flutter/pull/29413)：修正 MaterialApp 的 _navigatorObserver 僅使用 builder 時的問題


## 桌面相關變更

Flutter 持續推進桌面級輸入機制的支援，包括鍵盤對應、文字選取、滑鼠滾輪與懸停偵測，以及工具鏈初步支援桌面平台。

*   [flutter#29993](https://github.com/flutter/flutter/pull/29993)：新增 Linux 鍵盤對應
*   [flutter#29769](https://github.com/flutter/flutter/pull/29769)：Cupertino 文字欄位支援滑鼠文字選取
*   [flutter#22762](https://github.com/flutter/flutter/pull/22762)：支援滑鼠滾輪
*   [flutter#28900](https://github.com/flutter/flutter/pull/28900)：cupertino button 支援鍵盤操作
*   [flutter#28290](https://github.com/flutter/flutter/pull/28290)：滑鼠文字選取
*   [flutter#28602](https://github.com/flutter/flutter/pull/28602)：允許 PointerEnterEvent 與 PointerExitEvents 由任意 PointerEvent 建立
*   [flutter#30829](https://github.com/flutter/flutter/pull/30829)：懸停註記層與滑鼠偵測器保持同步
*   [flutter#30648](https://github.com/flutter/flutter/pull/30648)：支援下載桌面嵌入資源
*   [flutter#31283](https://github.com/flutter/flutter/pull/31283)：doctor 工具新增桌面工作流程
*   [flutter#31229](https://github.com/flutter/flutter/pull/31229)：flutter run 支援 Linux 與 Windows
*   [flutter#31277](https://github.com/flutter/flutter/pull/31277)：傳遞 track widget creation 旗標至 build script
*   [flutter#31218](https://github.com/flutter/flutter/pull/31218)：macOS 目標新增執行能力
*   [flutter#31205](https://github.com/flutter/flutter/pull/31205)：新增桌面專案與建置指令（實驗性）
*   [flutter#30670](https://github.com/flutter/flutter/issues/30670)：C++ shell 實作 StandardMethodCodec


## 框架相關變更

除了平台細節外，我們也持續強化 Flutter 框架核心。

*   [engine#8402](https://github.com/flutter/engine/pull/8402)：支援關閉所有 VM 根隔離（root isolates）
*   [flutter#31210](https://github.com/flutter/flutter/pull/31210)：Android caret 高度使用字形完整高度 v2
*   [flutter#30422](https://github.com/flutter/flutter/pull/30422)：back swipe 放開時立即執行 navigator.pop
*   [flutter#30792](https://github.com/flutter/flutter/pull/30792)：Border.uniform() 改名為 Border.fromSide()
*   [flutter#31159](https://github.com/flutter/flutter/pull/31159)：回滾「Android caret 高度使用字形完整高度」
*   [flutter#30932](https://github.com/flutter/flutter/pull/30932)：2D 轉換使用者體驗改進
*   [flutter#30898](https://github.com/flutter/flutter/pull/30898)：檢查 ErrorWidget.builder 測試後未被修改
*   [flutter#30809](https://github.com/flutter/flutter/pull/30809)：修正 23527 問題：RenderViewport 超過最大數量例外
*   [flutter#30880](https://github.com/flutter/flutter/pull/30880)：sliver.dart _createErrorWidget 支援其他元件
*   [flutter#30876](https://github.com/flutter/flutter/pull/30876)：簡化 toImage future 處理
*   [flutter#30470](https://github.com/flutter/flutter/pull/30470)：修正 Table 彈性欄位佈局錯誤 #30437
*   [flutter#30215](https://github.com/flutter/flutter/pull/30215)：檢查無效的 elevation
*   [flutter#30667](https://github.com/flutter/flutter/pull/30667)：修正 @mustCallSuper 間接覆寫與混入
*   [flutter#30814](https://github.com/flutter/flutter/pull/30814)：修正 StatefulWidget 與 StatelessWidget 範例文件
*   [flutter#30760](https://github.com/flutter/flutter/pull/30760)：修正 invokeListMethod 與 invokeMapMethod 的型別轉換 NPE
*   [flutter#30640](https://github.com/flutter/flutter/pull/30640)：新增 const
