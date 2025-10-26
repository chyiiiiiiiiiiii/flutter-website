---
title: Flutter 3.7.0 版本公告
shortTitle: 3.7.0 版本公告
description: Flutter 3.7.0 的版本公告。
---
本頁為 3.7.0 版本公告。  
如需後續錯誤修正版本的資訊，請參閱我們的 [CHANGELOG][CHANGELOG]。

[CHANGELOG]: {{site.repo.flutter}}/blob/main/CHANGELOG.md

## 變更內容

本次版本包含以下變更：

### Framework
* 新增包含 epsilon 的 Matrix4 比對器，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/107435
* 在 MaterialApp 中公開主題動畫的 duration 與 curve，由 @darrenaustin 提交於 https://github.com/flutter/flutter/pull/107269
* Persistent BottomSheet 現在無法透過 a11y 關閉，由 @goderbauer 提交於 https://github.com/flutter/flutter/pull/106948
* [framework] SliverDecoration，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/107396
* 更新 `PopupRoute` 文件並新增範例，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/107476
* 在 DraggableScrollableSheet 新增 snapAnimationDuration 參數，由 @hangyujin 提交於 https://github.com/flutter/flutter/pull/107426
* 修正 AnimatedSwitcher 鏈產生重複項目的問題後重新合併，@youssef-attia 於 https://github.com/flutter/flutter/pull/107466
* 當 TextRange 無效時，updateEditingValueWithDeltas 應明確拋出錯誤，由 @Renzo-Olivares 提交於 https://github.com/flutter/flutter/pull/107104
* [PopupMenu]：新增 menu `ClipBehavior`，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/106955
* 更新 `ListTile` 與 `ListTile` 相關元件文件以符合 Material 用法，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/107561
* 更新 `ListTile` 文件，修正顏色動畫問題並新增範例，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/107581
* 還原 "[framework] SliverDecoration"，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/106909
* 修正 RenderIndexedStack 的 null 安全檢查，由 @christopherfujino 提交於 https://github.com/flutter/flutter/pull/107172
* [Keyboard, iOS] 產生 iOS 特殊鍵對應表，由 @dkwingsmt 提交於 https://github.com/flutter/flutter/pull/106561
* 修正 scrollbar 邊距問題，由 @Piinks 提交於 https://github.com/flutter/flutter/pull/106018
* [flutter_driver] 支援傳送文字輸入動作，由 @nploi 提交於 https://github.com/flutter/flutter/pull/107531
* 為 `AppBar.notificationPredicate` 新增範例，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/106731
* 為 `Overlay` 新增互動式範例，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/106878
* `DropdownButton`：當 `selectedItemBuilder` 非 null 時修正提示對齊問題，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/107683
* 修正拖曳時文字選擇工具列未隱藏的問題，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/106977
* 移除驚嘆號，由 @LongCatIsLooong 提交於 https://github.com/flutter/flutter/pull/107173
* 允許在 `SlottedMultiChildRenderObjectWidgetMixin` 中於不同 slot 間重新指定 key，由 @LongCatIsLooong 提交於 https://github.com/flutter/flutter/pull/107847
* 修正因抽屜開啟導致框架鎖定時的 `Scaffold` `setState` 問題，由 @markusaksli-nc 提交於 https://github.com/flutter/flutter/pull/105987
* 啟用 combinators_ordering，由 @a14n 提交於 https://github.com/flutter/flutter/pull/107268
* PointerEvent 斷言裝置類型，由 @dkwingsmt 提交於 https://github.com/flutter/flutter/pull/107756
* 在 InputDatePickerFormField 應用本地化至日期時，不再複製舊有選取範圍，由 @jason-simmons 提交於 https://github.com/flutter/flutter/pull/107819
* 在 RawScrollbar 公開 padding 屬性，由 @Piinks 提交於 https://github.com/flutter/flutter/pull/107221
* 更新 `IconButton` 的 `color` 參數文件，由 @ValentinVignal 提交於 https://github.com/flutter/flutter/pull/107605
* 移動游標時不再閃爍，與 iOS 平台效果一致，由 @talisk 提交於 https://github.com/flutter/flutter/pull/107836
* 為 NavigationRail 新增 SafeArea，由 @QuncCccccc 提交於 https://github.com/flutter/flutter/pull/107201
* 文件錯誤：應為 `CustomPaint` 而非 `CustomPainter`，由 @0xba1 提交於 https://github.com/flutter/flutter/pull/107195
* 修正 Dropdown 在大字體下的高度問題，由 @foongsq 提交於 https://github.com/flutter/flutter/pull/106638
* [Keyboard] 讓 CharacterActivator 支援 Ctrl、Meta 修飾鍵與重複輸入，由 @dkwingsmt 提交於 https://github.com/flutter/flutter/pull/105958
* SnackBar 支援回滑時 transitionOnUserGestures 設為 true，由 @letsar 提交於 https://github.com/flutter/flutter/pull/78732
* 修正 Cupertino 日期選擇器在使用 minuteInterval 時 minDate、maxDate 問題，由 @NikosTsesmelis 提交於 https://github.com/flutter/flutter/pull/107140
* 實作 `CupertinoListSection` 與 `CupertinoListTile`，由 @campovski 提交於 https://github.com/flutter/flutter/pull/106896
* 為 `showModalBottomSheet` 新增 `useSafeArea` 參數，由 @bleroux 提交於 https://github.com/flutter/flutter/pull/107068
* 為 `Icon` 新增 fill、weight、grade 與 optical size 支援，由 @guidezpl 提交於 https://github.com/flutter/flutter/pull/107976
* 使用持久化 hash map 儲存 _inheritedWidgets，由 @mraleph 提交於 https://github.com/flutter/flutter/pull/108038
* 允許設定 TestWidgetsFlutterBinding.pointerEventSource，由 @HelioStrike 提交於 https://github.com/flutter/flutter/pull/103833
* 還原 "允許設定 TestWidgetsFlutterBinding.pointerEventSource"，由 @dnfield 提交於 https://github.com/flutter/flutter/pull/107715
* 新增 OvalBorder 與 BoxShape.oval，由 @bernaferrari 提交於 https://github.com/flutter/flutter/pull/108116
* 修正 BottomNavigationBarItem 預設 tooltip 為 label，由 @bleroux 提交於 https://github.com/flutter/flutter/pull/106891
* 指標事件：允許 trackpad 產生 hover 事件，由 @dkwingsmt 提交於 https://github.com/flutter/flutter/pull/107312
* 滾動慣性取消 [framework]，由 @moffatman 提交於 https://github.com/flutter/flutter/pull/108071
* GestureDetector 新增 supportedDevices 參數，由 @moffatman 提交於 https://github.com/flutter/flutter/pull/106621
* [flutter_tool] 將 shader 編譯為 .iplr 並對 ink_sparkle 使用 FragmentProgram.fromAsset，由 @zanderso 提交於 https://github.com/flutter/flutter/pull/108190
* 使用 toPictureSync 加速頁面縮放轉場，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/108056
* 允許 trackpad 慣性取消事件，由 @moffatman 提交於 https://github.com/flutter/flutter/pull/107337
* 修正 GestureDetector.onDoubleTapDown 未被呼叫的問題，由 @pedromassango 提交於 https://github.com/flutter/flutter/pull/107568
* [web] 在 driver 測試初始化時提早定義 $flutterDriverResult 變數，由 @yjbanov 提交於 https://github.com/flutter/flutter/pull/107876
* 為 flutter web 的 aria announcement 新增可選旗標以決定 assertiveness 等級，由 @nbayati 提交於 https://github.com/flutter/flutter/pull/108262
* 修正 sheet 重建時重置的問題，由 @caseycrogers 提交於 https://github.com/flutter/flutter/pull/108198
* 還原 "為 flutter web 的 aria announcement 新增可選旗標以決定 assertiveness 等級"，由 @CaseyHillers 提交於 https://github.com/flutter/flutter/pull/107943
* flutter update-packages --force-upgrade 並修正 analyzer，由 @goderbauer 提交於 https://github.com/flutter/flutter/pull/108268
* InputDecorator 遷移至 Material 3，由 @hangyujin 提交於 https://github.com/flutter/flutter/pull/105280
* ButtonStyle 新增 iconSize 參數，由 @QuncCccccc 提交於 https://github.com/flutter/flutter/pull/108234
* 在 `KeyMessageManager.keyMessageHandler` 文件中說明 "patching" 協定並新增範例，由 @dkwingsmt 提交於 https://github.com/flutter/flutter/pull/108228
* 釋放 scaffold 抽屜資源，由 @polina-c 提交於 https://github.com/flutter/flutter/pull/108233
* 釋放 _TextSpanEditingController 資源，由 @polina-c 提交於 https://github.com/flutter/flutter/pull/108193
* 釋放 painter 資源，由 @polina-c 提交於 https://github.com/flutter/flutter/pull/108227
* 釋放 widget 以避免記憶體洩漏，由 @polina-c 提交於 https://github.com/flutter/flutter/pull/108384
* 釋放 KeepAliveHandle，由 @polina-c 提交於 https://github.com/flutter/flutter/pull/108396
* 更新 ChangeNotifier.dispose 與 KeepAliveHandle.release 文件，由 @dnfield 提交於 https://github.com/flutter/flutter/pull/107963
* 僅在 assertiveness 非 polite 時才將其加入 dataMap，由 @nbayati 提交於 https://github.com/flutter/flutter/pull/108401
* [flutter_tools] 新增 shader 熱重載工具支援，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/108280
* 移除已棄用 styleFrom 參數的引用，由 @darrenaustin 提交於 https://github.com/flutter/flutter/pull/108369
* 新增 RenderRepaintBoundary.toImageSync() 方法，由 @tgucio 提交於 https://github.com/flutter/flutter/pull/108415
* 移除 SelectableText 時處理拖曳不再崩潰，由 @xu-baolin 提交於 https://github.com/flutter/flutter/pull/103473
* 使用 FragmentProgram.fromAssetAsync，由 @zanderso 提交於 https://github.com/flutter/flutter/pull/107738
* FloatingActionButton：新增可主題化的滑鼠游標，由 @jpnurmi 提交於 https://github.com/flutter/flutter/pull/108379
* 在 BoxScroll 與 ListView 文件中新增 scrollBehaviour 說明，由 @snat-s 提交於 https://github.com/flutter/flutter/pull/107848
* 優化 input_decorator_theme 中的閉包，由 @hangyujin 提交於 https://github.com/flutter/flutter/pull/108383
* 在 [FilteringTextInputFormatter] 文件中建議使用 predicate-based formatter 進行整字串比對，由 @LongCatIsLooong 提交於 https://github.com/flutter/flutter/pull/108473
* 簡化 mark needs build，由 @goderbauer 提交於 https://github.com/flutter/flutter/pull/108489
* 非同步 FragmentProgram.fromAsset 過渡的第 N 部分，由 @zanderso 提交於 https://github.com/flutter/flutter/pull/108287
* 新增 StarBorder 與 StarBorder.polygon，並附範例，由 @gspencergoog 提交於 https://github.com/flutter/flutter/pull/107632
* 修正 tabs indicator padding 更新錯誤，由 @xu-baolin 提交於 https://github.com/flutter/flutter/pull/108366
* 修正 NestedScrollView UserScrollNotification 問題，由 @xu-baolin 提交於 https://github.com/flutter/flutter/pull/108477
* TextField 遷移至 Material 3，由 @hangyujin 提交於 https://github.com/flutter/flutter/pull/108496
* 將 Switch 的 `effectiveInactivePressedOverlayColor` 預設值改為參考 `effectiveInactiveThumbColor`，由 @QuncCccccc 提交於 https://github.com/flutter/flutter/pull/108565
* RenderAndroidView 在非同步回呼後防止重複使用，並註銷監聽器，由 @dnfield 提交於 https://github.com/flutter/flutter/pull/108562
* 修正 toPictureSync 問題期間停用新轉場，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/108405
* 將 NavigationBar 標記為非 const，以符合實際情況，由 @goderbauer 提交於 https://github.com/flutter/flutter/pull/108538
* Dialog 與 DialogTheme 新增 shadowColor 與 surfaceTintColor，由 @darrenaustin 提交於 https://github.com/flutter/flutter/pull/107262
* 更新 Chips 範例並重新命名檔案，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/105799
* 以 TapRegionSurface 取代 FocusTrap，由 @gspencergoog 提交於 https://github.com/flutter/flutter/pull/108629
* "全選" 會自動將 EditableText 捲動到文字欄位結尾，這在原生 iOS 不會發生，由 @antholeole 提交於 https://github.com/flutter/flutter/pull/108621
* TextFormField 新增 onTapOutside，由 @gspencergoog 提交於 https://github.com/flutter/flutter/pull/108633
* 還原 "Dialog 與 DialogTheme 新增 shadowColor 與 surfaceTintColor"，由 @CaseyHillers 提交於 https://github.com/flutter/flutter/pull/108574
* Sliver 文件快速修正，由 @youssef-attia 提交於 https://github.com/flutter/flutter/pull/108640
* 改善 dumpSemanticsTree 在無語意時的錯誤訊息，由 @goderbauer 提交於 https://github.com/flutter/flutter/pull/108654
* 更新 autofill 的網頁連結，由 @kevmoo 提交於 https://github.com/flutter/flutter/pull/108644
* 修正被誤刪的文件註解行，由 @kevmoo 提交於 https://github.com/flutter/flutter/pull/108571
* [framework] 從 value listenable 建立動畫，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/108623
* TextPainter 拋出堆疊追蹤以協助追查 layout 前讀取問題，由 @LongCatIsLooong 提交於 https://github.com/flutter/flutter/pull/108743
* 覆寫 PlaceholderDimensions 的等號運算子以避免不必要的 TextPainter 重新 layout，由 @tgucio 提交於 https://github.com/flutter/flutter/pull/107834
* 修正 lerp 至偏心圓的問題，由 @gspencergoog 提交於 https://github.com/flutter/flutter/pull/108573
* 修正 ExpansionTile 展開時顯示子項背景的問題，由 @bleroux 提交於 https://github.com/flutter/flutter/pull/108508
* 建立 `containsSemantics` 以支援測試中語意的部分比對，由 @pdblasi-google 提交於 https://github.com/flutter/flutter/pull/107477
* [SelectionOverlay] 移動 debug 訊息至 assertion 範圍內，由 @xu-baolin 提交於 https://github.com/flutter/flutter/pull/97972
* Loupe Android + iOS，由 @antholeole 提交於 https://github.com/flutter/flutter/pull/108844
* 棄用 `toggleableActiveColor`，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/108843
* 還原 "修正 ExpansionTile 展開時顯示子項背景的問題"，由 @Piinks 提交於 https://github.com/flutter/flutter/pull/108718
* 更新文件以顯示 ImageChunkEvent 為可選參數，由 @parkershepherd 提交於 https://github.com/flutter/flutter/pull/108430
* 再次合併 "Dialog 與 DialogTheme 新增 shadowColor 與 surfaceTintColor"，由 @darrenaustin 提交於 https://github.com/flutter/flutter/pull/108507
* [flutter_test] 新增旗標以將裝置指標事件傳送至框架，由 @jiahaog 提交於 https://github.com/flutter/flutter/pull/105407
* 更新 `equalsIgnoringHashCodes` 以接受字串清單，由 @gspencergoog 提交於 https://github.com/flutter/flutter/pull/108332
* [macOS] 從 engine 使用 editing intents，由 @knopp 提交於 https://github.com/flutter/flutter/pull/108868
* 新增 `IconButtonTheme` 並應用於 M3 的 `IconButton`，由 @QuncCccccc 提交於 https://github.com/flutter/flutter/pull/108915
* [flutter_test] 效能：find.ancestor，由 @passsy 提交於 https://github.com/flutter/flutter/pull/107179
* 移除部分過時的 framework 忽略註記，由 @goderbauer 提交於 https://github.com/flutter/flutter/pull/108924
* 清理 ScrollbarPainter，由 @Piinks 提交於 ⟦L117⟧
* 移除過時的忽略註記，由 @goderbauer 提交於 ⟦L118⟧
* 增加更多日誌以診斷 Gold
