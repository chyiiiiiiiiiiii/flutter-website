---
title: Flutter 3.3.0 發行說明
shortTitle: 3.3.0 發行說明
description: Flutter 3.3.0 的發行說明。
---

本頁為 3.3.0 版本的發行說明。  
如需後續錯誤修正版本的資訊，請參閱我們的 [CHANGELOG][CHANGELOG]。  

[CHANGELOG]: {{site.repo.flutter}}/blob/main/CHANGELOG.md

## 有哪些變更

本次發行包含以下變更：

### Framework
* 在 https://github.com/flutter/flutter/pull/100267 由 @matasb-google 改善文字對比度的 A11Y 測試
* 在 https://github.com/flutter/flutter/pull/94601 由 @werainkhatri 修正 `FadeInImage` 以支援無縫播放
* 在 https://github.com/flutter/flutter/pull/98547 由 @Piinks 移除已棄用的 RaisedButton
* 在 https://github.com/flutter/flutter/pull/100586 由 @Piinks 移除 text selection ThemeData 的棄用警告（第 3 次）
* 在 https://github.com/flutter/flutter/pull/96815 由 @ds84182 為 Scrollables 中的 FocusNodes 新增可設定的 padding
* 在 https://github.com/flutter/flutter/pull/101141 由 @TahaTesser 新增缺失的 `ListTile` 測試、移除重複測試並修正錯字
* 在 https://github.com/flutter/flutter/pull/101376 由 @chunhtai 清理 AutomaticKeepAlive
* 在 https://github.com/flutter/flutter/pull/100162 由 @gspencergoog 為 AnimatedModalBarrier 新增 onDismiss，並更新測試
* 在 https://github.com/flutter/flutter/pull/101378 由 @gspencergoog 調整部分介面名稱以保持一致性
* 在 https://github.com/flutter/flutter/pull/101280 由 @TahaTesser 修正 `DrawerHeader` decoration 未繼承 `ColorScheme.primary` 的問題
* 在 https://github.com/flutter/flutter/pull/101460 由 @Piinks 修正 App Bar 捲動下方行為的反向情境
* 在 https://github.com/flutter/flutter/pull/100765 由 @TahaTesser 為 `ListTile` 新增 debugFillProperties
* 在 https://github.com/flutter/flutter/pull/101536 由 @Piinks 回滾「重構 `ToggleButtons`（移除 `RawMaterialButton`）」的變更
* 在 https://github.com/flutter/flutter/pull/101399 由 @blasten 修正平台視圖建立前不建立 surface
* 在 https://github.com/flutter/flutter/pull/101528 由 @Piinks 重新啟用 Gold post-submit fail 狀態
* 在 https://github.com/flutter/flutter/pull/101544 由 @jason-simmons 確保若第一個排程的 frame 是強制 frame 時，engine frame callbacks 會被安裝
* 在 https://github.com/flutter/flutter/pull/101567 由 @goderbauer 啟用 strict-casts（取代 implicit-casts）
* 在 https://github.com/flutter/flutter/pull/101537 由 @gspencergoog 將 key 範例改用 `Focus` 元件取代 `RawKeyboardListener`
* 在 https://github.com/flutter/flutter/pull/101600 由 @goderbauer 啟用 unnecessary_import
* 在 https://github.com/flutter/flutter/pull/100893 由 @guillempuche 修正 AppBar 文件中的單字
* 在 https://github.com/flutter/flutter/pull/98549 由 @Piinks 移除已棄用的 Scaffold SnackBar API
* 在 https://github.com/flutter/flutter/pull/100794 由 @darrenaustin 將常用按鈕遷移至 Material 3
* 在 https://github.com/flutter/flutter/pull/101200 由 @MrBirb 允許 ClipRRect.borderRadius 支援 BorderRadiusDirectional
* 在 https://github.com/flutter/flutter/pull/101101 由 @wangying3426 為 BackdropFilterLayer 新增部分 debug 屬性
* 在 https://github.com/flutter/flutter/pull/101602 由 @kenzieschmoll 新增除錯旗標以增強 Build、Layout 及 Paint 的 timeline 參數
* 在 https://github.com/flutter/flutter/pull/98545 由 @Piinks 移除已棄用的 FlatButton
* 在 https://github.com/flutter/flutter/pull/101507 由 @TahaTesser 重構 chip 類別並將獨立 chip 拆分為不同類別
* 在 https://github.com/flutter/flutter/pull/101512 由 @danagbemava-nc 更新 WidgetsBindingsObserver 範例
* 在 https://github.com/flutter/flutter/pull/101601 由 @jonahwilliams [framework] 在 Opacity 元件中引入 repaint boundary
* 在 https://github.com/flutter/flutter/pull/99519 由 @TahaTesser 為 `CupertinoContextMenu`/`ContextMenuAction` 新增 Web 端可點擊游標
* 在 https://github.com/flutter/flutter/pull/101774 由 @jonahwilliams 修正 opacity/repaint 變更導致的測試
* 在 https://github.com/flutter/flutter/pull/101772 由 @Piinks 回滾「可設定 Scrollables 中 FocusNodes 周圍的 padding」
* 在 https://github.com/flutter/flutter/pull/100978 由 @jason-simmons 為 TextStyle 新增 variable font axes
* 在 https://github.com/flutter/flutter/pull/101731 由 @jonahwilliams [framework] 動畫停止時省略 ImageFilter layer
* 在 https://github.com/flutter/flutter/pull/101382 由 @gaaclarke 移除過時的 timelineArgumentsIndicatingLandmarkEvent
* 在 https://github.com/flutter/flutter/pull/101786 由 @jonahwilliams [framework] 在 zoom page transition 中使用 ImageFilter
* 在 https://github.com/flutter/flutter/pull/101790 由 @gaaclarke 將 WriteBuffers 起始容量提升至 64 bytes
* 在 https://github.com/flutter/flutter/pull/89944 由 @moffatman 在 framework 支援觸控板手勢
* 在 https://github.com/flutter/flutter/pull/101777 由 @gaaclarke 加快 ascii 字串編碼速度
* 在 https://github.com/flutter/flutter/pull/101794 由 @jason-simmons 確保 Element.inflateWidget 記錄的 timeline event 一定結束
* 在 https://github.com/flutter/flutter/pull/101838 由 @jonahwilliams 回滾「[framework] 在 zoom page transition 中使用 ImageFilter」
* 在 https://github.com/flutter/flutter/pull/100719 由 @chunhtai 新增預設選取樣式
* 在 https://github.com/flutter/flutter/pull/101837 由 @QuncCccccc 移除多餘的 the
* 在 https://github.com/flutter/flutter/pull/101844 由 @jonahwilliams 回滾 opacity/fade transition repaint boundary 與次要變更
* 在 https://github.com/flutter/flutter/pull/101858 由 @Piinks 修正文件以指向替代的 render object
* 在 https://github.com/flutter/flutter/pull/100905 由 @goderbauer 為 `use_super_parameters` 做好 framework 準備
* 在 https://github.com/flutter/flutter/pull/101853 由 @christopherfujino 為可執行檔測試 framework
* 在 https://github.com/flutter/flutter/pull/100880 由 @bleroux 修正 InkWell highlight 與 splash 有時會殘留
* 在 https://github.com/flutter/flutter/pull/101869 由 @chunhtai 修正有 endDrawer 時 Backbutton 未顯示
* 在 https://github.com/flutter/flutter/pull/99146 由 @xu-baolin 當僅有一個字元溢出時進行裁切
* 在 https://github.com/flutter/flutter/pull/100803 由 @dkwingsmt RawKeyboardMacos 新增 "specifiedLogicalKey" 欄位
* 在 https://github.com/flutter/flutter/pull/101921 由 @chunhtai 回滾「新增預設選取樣式 (#100719)」
* 在 https://github.com/flutter/flutter/pull/101934 由 @Piinks 文件去重
* 在 https://github.com/flutter/flutter/pull/100269 由 @maheshmnj 為 DraggableScrollableController 新增 `isAttached` getter
* 在 https://github.com/flutter/flutter/pull/101929 由 @Piinks 回滾「修正 App Bar 捲動下方行為的反向情境 (#101460)」
* 在 https://github.com/flutter/flutter/pull/101588 由 @justinmc Linux 與 Windows 右鍵點擊文字行為
* 在 https://github.com/flutter/flutter/pull/101998 由 @chunhtai 回滾「修正有 endDrawer 時 Backbutton 未顯示 (#1…」
* 在 https://github.com/flutter/flutter/pull/101297 由 @TahaTesser 為 `persistentFooterButtons` 新增 alignment 參數
* 在 https://github.com/flutter/flutter/pull/101989 由 @kenzieschmoll 為 `profileUserWidgetBuilds` 註冊 service extension
* 在 https://github.com/flutter/flutter/pull/101954 由 @chunhtai 重新上線「新增預設選取樣式 (#100719)」
* 在 https://github.com/flutter/flutter/pull/101970 由 @ColdPaleLight 重構 'FakeSceneBuilder' 以使用 'NoSuchMethod Forwarding'
* 在 https://github.com/flutter/flutter/pull/94363 由 @werainkhatri 新建的 tweens 應有相同的 begin 與 end
* 在 https://github.com/flutter/flutter/pull/101508 由 @TahaTesser 新增 Material 3 `Dialog` 範例並更新現有 `Dialog` 範例
* 在 https://github.com/flutter/flutter/pull/101345 由 @TahaTesser 新增 Material 3 `NavigationRail` 範例並改善 Material 2 範例
* 在 https://github.com/flutter/flutter/pull/101900 由 @TahaTesser 將 `ListTile` TextTheme TextStyle 參考遷移至 Material 3
* 在 https://github.com/flutter/flutter/pull/101105 由 @TahaTesser 新增 Material 3 `FloatingActionButton` 與 `FloatingActionButton` 變體範例
* 在 https://github.com/flutter/flutter/pull/101907 由 @bleroux 新增 `ClipRRect` 範例與疑難排解註解
* 在 https://github.com/flutter/flutter/pull/101847 由 @gspencergoog 延遲 focus trap unfocus 至 post-frame
* 在 https://github.com/flutter/flutter/pull/102092 由 @justinmc 回滾「當僅有一個字元溢出時進行裁切」
* 在 https://github.com/flutter/flutter/pull/101938 由 @egramond 修正 Mediaquery 在呼叫 removePadding() 時遺失 navigationMode 值
* 在 https://github.com/flutter/flutter/pull/100959 由 @xu-baolin 修正 `DataTable` 異常並改善部分文件
* 在 https://github.com/flutter/flutter/pull/102107 由 @Piinks 從已棄用 API 移除 required
* 在 https://github.com/flutter/flutter/pull/100475 由 @xu-baolin 為 `Draggable` 與 `LongPressDraggable` 公開 `ignoringPointer` 屬性
* 在 https://github.com/flutter/flutter/pull/102152 由 @HansMuller 回滾「將 `ListTile` TextTheme TextStyle 參考遷移至 Material 3」
* 在 https://github.com/flutter/flutter/pull/102161 由 @chunhtai 為 AccessibilityGuideline 新增 API 範例碼
* 在 https://github.com/flutter/flutter/pull/102136 由 @TahaTesser 修正 `typography.dart`、`navigation_bar.dart` 與 `modal_barrier.dart` 的間距問題
* 在 https://github.com/flutter/flutter/pull/101860 由 @gaaclarke 提升 StandardMethodCodec 的 WriteBuffer 起始容量
* 在 https://github.com/flutter/flutter/pull/100860 由 @TowaYamashita 修正 textContaining 註解中的範例碼錯誤
* 在 https://github.com/flutter/flutter/pull/102309 由 @TahaTesser 改善「NestedScrollView 及內部捲動」測試以涵蓋所有內層子 layer
* 在 https://github.com/flutter/flutter/pull/87684 由 @chunhtai 為 semantics node 新增 tooltip
* 在 https://github.com/flutter/flutter/pull/102311 由 @TahaTesser 在 `debugCheckHasMaterial control test` 中以 `Chip` 取代 `ListTile`
* 在 https://github.com/flutter/flutter/pull/101923 由 @jason-simmons 修正 CupertinoIcons.location 的 code point
* 在 https://github.com/flutter/flutter/pull/102270 由 @rgevrek 修正長按選取文字時跳動的問題
* 在 https://github.com/flutter/flutter/pull/102342 由 @DanielCardonaRojas 新增可尋找至少指定數量元件的 matcher
* 在 https://github.com/flutter/flutter/pull/101899 由 @wangying3426 為更多 layer 指派 debugCreator
* 在 https://github.com/flutter/flutter/pull/100049 由 @HelioStrike 讓 TestDefaultBinaryMessenger 能攔截所有平台通道
* 在 https://github.com/flutter/flutter/pull/102343 由 @Piinks 重新上線 AppBar 捲動下方的反向情境
* 在 https://github.com/flutter/flutter/pull/102336 由 @gaaclarke 讓 Directionality 放棄相依追蹤以提升效能
* 在 https://github.com/flutter/flutter/pull/102085 由 @jonahwilliams [framework] 允許停用 image filter layer
* 在 https://github.com/flutter/flutter/pull/102129 由 @xu-baolin 修正 `Slider` 元件的無障礙 bug
* 在 https://github.com/flutter/flutter/pull/102504 由 @bleroux 修正 DraggableScrollableController.animateTo 造成的 Ticker 洩漏
* 在 https://github.com/flutter/flutter/pull/102556 由 @dnfield 當 renderView 無子元件時避免排程強制 frame
* 在 https://github.com/flutter/flutter/pull/101952 由 @jonahwilliams [framework] 允許其他 RenderObject 行為如 repaint boundary
* 在 https://github.com/flutter/flutter/pull/102580 由 @Piinks 回滾「重新上線 AppBar 捲動下方的反向情境」
* 在 https://github.com/flutter/flutter/pull/102552 由 @jonahwilliams [framework] 重新上線：zoom page transition 使用 ImageFilter
* 在 https://github.com/flutter/flutter/pull/102536 由 @jason-simmons 提升在 notifyListeners 時複製 animation ObserverList 的效率
* 在 https://github.com/flutter/flutter/pull/102595 由 @goderbauer 修正 Navigator 的 restorable 方法回傳值文件
* 在 https://github.com/flutter/flutter/pull/102274 由 @jonahwilliams [framework] 移除並棄用 physical model layer
* 在 https://github.com/flutter/flutter/pull/102611 由 @jonahwilliams 回滾「[framework] 重新上線：zoom page transition 使用 ImageFilter」
* 在 https://github.com/flutter/flutter/pull/102585 由 @a14n 為 list/set/map 字面量補上缺失的逗號
* 在 https://github.com/flutter/flutter/pull/102615 由 @pq 重新命名帶有 `_` 的區域函式
* 在 https://github.com/flutter/flutter/pull/102632 由 @guidezpl 修正「material」與「material design」相關文件不一致
* 在 https://github.com/flutter/flutter/pull/101760 由 @TahaTesser [重新上線] 重構 ToggleButtons（移除 RawMaterialButton）
* 在 https://github.com/flutter/flutter/pull/101884 由 @darrenaustin 將 AppBar 遷移至 Material 3
* 在 https://github.com/flutter/flutter/pull/102582 由 @Piinks 修正 AppBar scrolledUnder 初始狀態（第三次）
* 在 https://github.com/flutter/flutter/pull/102689 由 @pq [flutter_driver] 重新命名帶有 `_` 的區域函式
* 在 https://github.com/flutter/flutter/pull/102638 由 @TahaTesser 修正 `BottomNavigationBar` 標籤樣式文字顏色
* 在 https://github.com/flutter/flutter/pull/102756 由 @Piinks 回滾「修正 `BottomNavigationBar` 標籤樣式文字顏色」
* 在 https://github.com/flutter/flutter/pull/102723 由 @TahaTesser `ReorderableListView`：修正損壞的 dartpad 範例並更新範例、補上測試
* 在 https://github.com/flutter/flutter/pull/102419 由 @QuncCccccc 為 Navigation Bar 新增 padding 以考量安全區域
* 在 https://github.com/flutter/flutter/pull/102487 由 @apeltop 修正錯字
* 在 https://github.com/flutter/flutter/pull/102414 由 @chunhtai 新增 RouteInformationParser.parseRouteInformationWithDependencies
* 在 https://github.com/flutter/flutter/pull/102791 由 @yjbanov [web] 允許 HTML renderer 有小幅 golden 差異
* 在 https://github.com/flutter/flutter/pull/91982 由 @prateekmedia 改善 SearchDelegate
* 在 https://github.com/flutter/flutter/pull/100124 由 @TahaTesser `ToggleButtons`：新增互動式範例
* 在 https://github.com/flutter/flutter/pull/102628 由 @TahaTesser 新增 `surfaceTintColor` 至 `NavigationBar`
* 在 https://github.com/flutter/flutter/pull/102650 由 @TahaTesser ⟦C43
