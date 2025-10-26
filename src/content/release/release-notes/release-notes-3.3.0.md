---
title: Flutter 3.3.0 發行說明
shortTitle: 3.3.0 發行說明
description: Flutter 3.3.0 的發行說明。
---

本頁為 3.3.0 版本的發行說明。  
如需後續錯誤修正版本的資訊，請參閱我們的 [CHANGELOG][CHANGELOG]。  

[CHANGELOG]: {{site.repo.flutter}}/blob/main/CHANGELOG.md

## 有哪些變更

本次版本包含以下變更：

### Framework
* 改進文字對比度的 A11Y 測試（@matasb-google，https://github.com/flutter/flutter/pull/100267）
* 修正 `FadeInImage` 以支援無縫播放（@werainkhatri，https://github.com/flutter/flutter/pull/94601）
* 移除已棄用的 RaisedButton（@Piinks，https://github.com/flutter/flutter/pull/98547）
* 移除 text selection ThemeData 的第 3 次棄用（@Piinks，https://github.com/flutter/flutter/pull/100586）
* Scrollables 中的 FocusNodes 支援可配置的內邊距（@ds84182，https://github.com/flutter/flutter/pull/96815）
* 新增缺失的 `ListTile` 測試、移除重複測試並修正拼字錯誤（@TahaTesser，https://github.com/flutter/flutter/pull/101141）
* 清理 AutomaticKeepAlive（@chunhtai，https://github.com/flutter/flutter/pull/101376）
* 為 AnimatedModalBarrier 新增 onDismiss，並更新測試（@gspencergoog，https://github.com/flutter/flutter/pull/100162）
* 調整部分介面名稱以保持一致性（@gspencergoog，https://github.com/flutter/flutter/pull/101378）
* 修正 `DrawerHeader` 的 decoration 未繼承 `ColorScheme.primary`（@TahaTesser，https://github.com/flutter/flutter/pull/101280）
* 修正 App Bar 捲動下方行為的反向情境（@Piinks，https://github.com/flutter/flutter/pull/101460）
* 新增 `ListTile` 的 debugFillProperties（@TahaTesser，https://github.com/flutter/flutter/pull/100765）
* 回復「重構 `ToggleButtons`（移除 `RawMaterialButton`）」的變更（@Piinks，https://github.com/flutter/flutter/pull/101536）
* 修正平台視圖建立前不建構 surface（@blasten，https://github.com/flutter/flutter/pull/101399）
* 重新啟用 Gold post-submit 失敗狀態（@Piinks，https://github.com/flutter/flutter/pull/101528）
* 確保當第一個排程的 frame 為強制 frame 時，engine frame 回呼已安裝（@jason-simmons，https://github.com/flutter/flutter/pull/101544）
* 啟用 strict-casts（取代 implicit-casts）（@goderbauer，https://github.com/flutter/flutter/pull/101567）
* 將 key 範例更新為使用 `Focus` 元件，取代 `RawKeyboardListener`（@gspencergoog，https://github.com/flutter/flutter/pull/101537）
* 啟用 unnecessary_import（@goderbauer，https://github.com/flutter/flutter/pull/101600）
* 修正 AppBar 文件中的單字（@guillempuche，https://github.com/flutter/flutter/pull/100893）
* 移除已棄用的 Scaffold SnackBar API（@Piinks，https://github.com/flutter/flutter/pull/98549）
* 將常用按鈕遷移至 Material 3（@darrenaustin，https://github.com/flutter/flutter/pull/100794）
* 允許 ClipRRect.borderRadius 支援 BorderRadiusDirectional（@MrBirb，https://github.com/flutter/flutter/pull/101200）
* 為 BackdropFilterLayer 新增部分 debug 屬性（@wangying3426，https://github.com/flutter/flutter/pull/101101）
* 新增除錯旗標以增強 Build、Layout、Paint 的 timeline 參數（@kenzieschmoll，https://github.com/flutter/flutter/pull/101602）
* 移除已棄用的 FlatButton（@Piinks，https://github.com/flutter/flutter/pull/98545）
* 重構 chip 類別並將獨立 chip 移至獨立類別（@TahaTesser，https://github.com/flutter/flutter/pull/101507）
* 更新 WidgetsBindingsObserver 範例（@danagbemava-nc，https://github.com/flutter/flutter/pull/101512）
* [framework] 在 Opacity 元件中引入 repaint boundary（@jonahwilliams，https://github.com/flutter/flutter/pull/101601）
* `CupertinoContextMenu`/`ContextMenuAction`：為 Web 新增可點擊游標（@TahaTesser，https://github.com/flutter/flutter/pull/99519）
* 修正 opacity/repaint 變更導致的測試（@jonahwilliams，https://github.com/flutter/flutter/pull/101774）
* 回復「可配置的 Scrollables 中 FocusNodes 的內邊距」變更（@Piinks，https://github.com/flutter/flutter/pull/101772）
* 為 TextStyle 新增 variable font axes（@jason-simmons，https://github.com/flutter/flutter/pull/100978）
* [framework] 動畫停止時省略 ImageFilter 圖層（@jonahwilliams，https://github.com/flutter/flutter/pull/101731）
* 移除過時的 timelineArgumentsIndicatingLandmarkEvent（@gaaclarke，https://github.com/flutter/flutter/pull/101382）
* [framework] 使用 ImageFilter 實現縮放頁面轉場（@jonahwilliams，https://github.com/flutter/flutter/pull/101786）
* 提高 WriteBuffers 初始容量至 64 bytes（@gaaclarke，https://github.com/flutter/flutter/pull/101790）
* 支援 framework 的 trackpad 手勢（@moffatman，https://github.com/flutter/flutter/pull/89944）
* 加快 ascii 字串編碼速度（@gaaclarke，https://github.com/flutter/flutter/pull/101777）
* 確保 Element.inflateWidget 記錄的 timeline 事件會結束（@jason-simmons，https://github.com/flutter/flutter/pull/101794）
* 回復「[framework] 使用 ImageFilter 實現縮放頁面轉場」（@jonahwilliams，https://github.com/flutter/flutter/pull/101838）
* 新增預設選取樣式（@chunhtai，https://github.com/flutter/flutter/pull/100719）
* 移除多餘的 the（@QuncCccccc，https://github.com/flutter/flutter/pull/101837）
* 回復 opacity/fade transition repaint boundary 及次要變更（@jonahwilliams，https://github.com/flutter/flutter/pull/101844）
* 修正文件以指向替代的 render object（@Piinks，https://github.com/flutter/flutter/pull/101858）
* 為 `use_super_parameters` 做好 framework 準備（@goderbauer，https://github.com/flutter/flutter/pull/100905）
* 為可執行檔測試 framework（@christopherfujino，https://github.com/flutter/flutter/pull/101853）
* 修正 InkWell 高亮與水波有時殘留的問題（@bleroux，https://github.com/flutter/flutter/pull/100880）
* 修正有 endDrawer 時 Backbutton 未顯示（@chunhtai，https://github.com/flutter/flutter/pull/101869）
* 僅一個字元溢出時裁切（@xu-baolin，https://github.com/flutter/flutter/pull/99146）
* RawKeyboardMacos 支援新欄位 "specifiedLogicalKey"（@dkwingsmt，https://github.com/flutter/flutter/pull/100803）
* 回復「新增預設選取樣式 (#100719)」（@chunhtai，https://github.com/flutter/flutter/pull/101921）
* 合併重複文件（@Piinks，https://github.com/flutter/flutter/pull/101934）
* 為 DraggableScrollableController 新增 `isAttached` getter（@maheshmnj，https://github.com/flutter/flutter/pull/100269）
* 回復「修正 App Bar 捲動下方行為的反向情境 (#101460)」（@Piinks，https://github.com/flutter/flutter/pull/101929）
* Linux 與 Windows 右鍵點擊文字行為（@justinmc，https://github.com/flutter/flutter/pull/101588）
* 回復「修正有 endDrawer 時 Backbutton 未顯示 (#1…」（@chunhtai，https://github.com/flutter/flutter/pull/101998）
* 為 `persistentFooterButtons` 新增 alignment 參數（@TahaTesser，https://github.com/flutter/flutter/pull/101297）
* 為 `profileUserWidgetBuilds` 註冊服務擴充（@kenzieschmoll，https://github.com/flutter/flutter/pull/101989）
* 重新上線「新增預設選取樣式 (#100719)」（@chunhtai，https://github.com/flutter/flutter/pull/101954）
* 重構 'FakeSceneBuilder' 以使用 'NoSuchMethod Forwarding'（@ColdPaleLight，https://github.com/flutter/flutter/pull/101970）
* 新建的 tweens 預設 begin 與 end 相同（@werainkhatri，https://github.com/flutter/flutter/pull/94363）
* 新增 Material 3 `Dialog` 範例並更新現有 `Dialog` 範例（@TahaTesser，https://github.com/flutter/flutter/pull/101508）
* 新增 Material 3 `NavigationRail` 範例並改進 Material 2 範例（@TahaTesser，https://github.com/flutter/flutter/pull/101345）
* 將 `ListTile` TextTheme TextStyle 參考遷移至 Material 3（@TahaTesser，https://github.com/flutter/flutter/pull/101900）
* 新增 Material 3 `FloatingActionButton` 與 `FloatingActionButton` 變體範例（@TahaTesser，https://github.com/flutter/flutter/pull/101105）
* 新增 `ClipRRect` 範例與疑難排解註解（@bleroux，https://github.com/flutter/flutter/pull/101907）
* 延遲 focus trap unfocus 至 post-frame（@gspencergoog，https://github.com/flutter/flutter/pull/101847）
* 回復「僅一個字元溢出時裁切」（@justinmc，https://github.com/flutter/flutter/pull/102092）
* 防止 Mediaquery 在呼叫 removePadding() 時遺失 navigationMode 值（@egramond，https://github.com/flutter/flutter/pull/101938）
* 修正 `DataTable` 異常並改進部分文件（@xu-baolin，https://github.com/flutter/flutter/pull/100959）
* 移除已棄用 API 的 required（@Piinks，https://github.com/flutter/flutter/pull/102107）
* 為 `Draggable`、`LongPressDraggable` 公開 `ignoringPointer` 屬性（@xu-baolin，https://github.com/flutter/flutter/pull/100475）
* 回復「將 `ListTile` TextTheme TextStyle 參考遷移至 Material 3」（@HansMuller，https://github.com/flutter/flutter/pull/102152）
* 為 AccessibilityGuideline 新增 API 範例程式碼（@chunhtai，https://github.com/flutter/flutter/pull/102161）
* 修正 `typography.dart`、`navigation_bar.dart`、`modal_barrier.dart` 的間距問題（@TahaTesser，https://github.com/flutter/flutter/pull/102136）
* 增加 StandardMethodCodec 的 WriteBuffer 初始容量（@gaaclarke，https://github.com/flutter/flutter/pull/101860）
* 修正 textContaining 註解中的範例程式碼錯誤（@TowaYamashita，https://github.com/flutter/flutter/pull/100860）
* 改進「NestedScrollView 與內部捲動」測試，涵蓋所有內層子圖層（@TahaTesser，https://github.com/flutter/flutter/pull/102309）
* 為 semantics node 新增 tooltip（@chunhtai，https://github.com/flutter/flutter/pull/87684）
* 在 `ListTile` 中以 `Chip` 取代 `debugCheckHasMaterial control test`（@TahaTesser，https://github.com/flutter/flutter/pull/102311）
* 修正 CupertinoIcons.location 的 code point（@jason-simmons，https://github.com/flutter/flutter/pull/101923）
* 修正長按選取文字時跳動問題（@rgevrek，https://github.com/flutter/flutter/pull/102270）
* 新增可查找至少指定數量元件的 matcher（@DanielCardonaRojas，https://github.com/flutter/flutter/pull/102342）
* 為更多圖層指派 debugCreator（@wangying3426，https://github.com/flutter/flutter/pull/101899）
* 允許 TestDefaultBinaryMessenger 攔截所有平台通道（@HelioStrike，https://github.com/flutter/flutter/pull/100049）
* 重新上線 AppBar 捲動下方的反向情境（@Piinks，https://github.com/flutter/flutter/pull/102343）
* Directionality 不再追蹤依賴以提升效能（@gaaclarke，https://github.com/flutter/flutter/pull/102336）
* [framework] 允許停用 image filter layer（@jonahwilliams，https://github.com/flutter/flutter/pull/102085）
* 修正 `Slider` 元件的無障礙問題（@xu-baolin，https://github.com/flutter/flutter/pull/102129）
* 修正 DraggableScrollableController.animateTo 泄漏 Ticker（@bleroux，https://github.com/flutter/flutter/pull/102504）
* 當 renderView 無子元件時避免排程強制 frame（@dnfield，https://github.com/flutter/flutter/pull/102556）
* [framework] 允許其他 RenderObjects 表現如 repaint boundaries（@jonahwilliams，https://github.com/flutter/flutter/pull/101952）
* 回復「重新上線 AppBar 捲動下方的反向情境」（@Piinks，https://github.com/flutter/flutter/pull/102580）
* [framework] 重新上線：使用 ImageFilter 實現縮放頁面轉場（@jonahwilliams，https://github.com/flutter/flutter/pull/102552）
* 提升 notifyListeners 複製 animation ObserverList 的效率（@jason-simmons，https://github.com/flutter/flutter/pull/102536）
* 修正 Navigator 的 restorable 方法的回傳值文件（@goderbauer，https://github.com/flutter/flutter/pull/102595）
* [framework] 移除並棄用 physical model layer（@jonahwilliams，https://github.com/flutter/flutter/pull/102274）
* 回復「[framework] 重新上線：使用 ImageFilter 實現縮放頁面轉場」（@jonahwilliams，https://github.com/flutter/flutter/pull/102611）
* 為 list/set/map 字面量補上缺失的逗號（@a14n，https://github.com/flutter/flutter/pull/102585）
* 以 `_`s 重新命名區域函式（@pq，https://github.com/flutter/flutter/pull/102615）
* 修正「material」與「material design」相關文件不一致（@guidezpl，https://github.com/flutter/flutter/pull/102632）
* [重新上線] 重構 ToggleButtons（移除 RawMaterialButton）（@TahaTesser，https://github.com/flutter/flutter/pull/101760）
* 將 AppBar 遷移至 Material 3（@darrenaustin，https://github.com/flutter/flutter/pull/101884）
* 修正 AppBar scrolledUnder 初始狀態（第三次）（@Piinks，https://github.com/flutter/flutter/pull/102582）
* [flutter_driver] 以 `_`s 重新命名區域函式（@pq，https://github.com/flutter/flutter/pull/102689）
* 修正 `BottomNavigationBar` 標籤樣式文字顏色（@TahaTesser，https://github.com/flutter/flutter/pull/102638）
* 回復「修正 `BottomNavigationBar` 標籤樣式文字顏色」（@Piinks，https://github.com/flutter/flutter/pull/102756）
* `ReorderableListView`：修正損壞的 dartpad 範例並更新範例、新增測試（@TahaTesser，https://github.com/flutter/flutter/pull/102723）
* 為 Navigation Bar 新增 padding 以考慮安全區域（@QuncCccccc，https://github.com/flutter/flutter/pull/102419）
* 修正拼字錯誤（@apeltop，https://github.com/flutter/flutter/pull/102487）
* 新增 RouteInformationParser.parseRouteInformationWithDependencies（@chunhtai，https://github.com/flutter/flutter/pull/102414）
* [web] 允許 HTML renderer 有小幅 golden 差異（@yjbanov，https://github.com/flutter/flutter/pull/102791）
* 改進 SearchDelegate（@prateekmedia，https://github.com/flutter/flutter/pull/91982）
* `ToggleButtons`：新增互動式範例（@TahaTesser，https://github.com/flutter/flutter/pull/100124）
* 新增 ⟦C41⟧ 至 ⟦C42⟧（@TahaTesser，https://github.com/flutter/flutter/pull/102628）
* ⟦C43⟧：為 ⟦C44⟧ 新增範例（@TahaTesser，⟦L119⟧）
* 延遲 OverlayEntry 的 listenable 釋放直到其 widget 被卸載（@LongCatIsLooong，⟦L120⟧）
* 更新 FAB M3 token 範本類別至新命名規則，並修正 ⟦C45⟧ 拼字錯誤（@TahaTesser，⟦
