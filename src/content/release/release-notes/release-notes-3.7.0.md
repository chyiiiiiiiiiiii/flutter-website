---
title: Flutter 3.7.0 版本發行說明
shortTitle: 3.7.0 版本發行說明
description: Flutter 3.7.0 的發行說明。
---
本頁為 3.7.0 版本的發行說明。  
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
* 修正 g3 問題後重新合併「修正 AnimatedSwitcher 鏈產生重複項」，由 @youssef-attia 提交於 https://github.com/flutter/flutter/pull/107466
* 當 TextRange 無效時，updateEditingValueWithDeltas 應明確失敗，由 @Renzo-Olivares 提交於 https://github.com/flutter/flutter/pull/107104
* [PopupMenu]：新增 menu `ClipBehavior`，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/106955
* 更新 `ListTile` 與 `ListTile` 相關元件文件以符合 Material 使用方式，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/107561
* 更新 `ListTile` 文件以說明顏色動畫問題並新增範例，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/107581
* 回滾「[framework] SliverDecoration」，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/106909
* 修正 RenderIndexedStack 的 null 安全檢查，由 @christopherfujino 提交於 https://github.com/flutter/flutter/pull/107172
* [Keyboard, iOS] 產生 iOS 特殊鍵映射，由 @dkwingsmt 提交於 https://github.com/flutter/flutter/pull/106561
* 修正 scrollbar 邊距，由 @Piinks 提交於 https://github.com/flutter/flutter/pull/106018
* [flutter_driver] 支援傳送文字輸入動作，由 @nploi 提交於 https://github.com/flutter/flutter/pull/107531
* 為 `AppBar.notificationPredicate` 新增範例，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/106731
* 為 `Overlay` 新增互動式範例，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/106878
* `DropdownButton`：當 `selectedItemBuilder` 非 null 時修正提示對齊，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/107683
* 修正拖曳時若文字選擇工具列已顯示則不會隱藏工具列，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/106977
* 移除驚嘆號，由 @LongCatIsLooong 提交於 https://github.com/flutter/flutter/pull/107173
* 允許在 `SlottedMultiChildRenderObjectWidgetMixin` 中於不同 slot 之間重新指定 key，由 @LongCatIsLooong 提交於 https://github.com/flutter/flutter/pull/107847
* 修正因抽屜開啟導致框架鎖定時 `Scaffold` `setState` 的問題，由 @markusaksli-nc 提交於 https://github.com/flutter/flutter/pull/105987
* 啟用 combinators_ordering，由 @a14n 提交於 https://github.com/flutter/flutter/pull/107268
* PointerEvent 斷言裝置類型，由 @dkwingsmt 提交於 https://github.com/flutter/flutter/pull/107756
* 在 InputDatePickerFormField 應用在地化日期時不再複製舊選擇，由 @jason-simmons 提交於 https://github.com/flutter/flutter/pull/107819
* RawScrollbar 新增 padding 屬性，由 @Piinks 提交於 https://github.com/flutter/flutter/pull/107221
* 更新 `IconButton` 的 `color` 參數文件，由 @ValentinVignal 提交於 https://github.com/flutter/flutter/pull/107605
* 移動時游標不再閃爍，與 iOS 平台效果一致，由 @talisk 提交於 https://github.com/flutter/flutter/pull/107836
* 為 NavigationRail 新增 SafeArea，由 @QuncCccccc 提交於 https://github.com/flutter/flutter/pull/107201
* 文件錯誤：應為 `CustomPaint` 而非 `CustomPainter`，由 @0xba1 提交於 https://github.com/flutter/flutter/pull/107195
* 修正 Dropdown 高度在大字體比例下的問題，由 @foongsq 提交於 https://github.com/flutter/flutter/pull/106638
* [Keyboard] 讓 CharacterActivator 支援 Ctrl 與 Meta 修飾鍵及重複，由 @dkwingsmt 提交於 https://github.com/flutter/flutter/pull/105958
* SnackBar 新增 transitionOnUserGestures 設為 true 以支援返回滑動，由 @letsar 提交於 https://github.com/flutter/flutter/pull/78732
* 修正 Cupertino 日期選擇器在使用 minuteInterval 時 minDate、maxDate 的問題，由 @NikosTsesmelis 提交於 https://github.com/flutter/flutter/pull/107140
* 實作 `CupertinoListSection` 與 `CupertinoListTile`，由 @campovski 提交於 https://github.com/flutter/flutter/pull/106896
* 為 `showModalBottomSheet` 新增 `useSafeArea` 參數，由 @bleroux 提交於 https://github.com/flutter/flutter/pull/107068
* 為 `Icon` 新增 fill、weight、grade 及 optical size 支援，由 @guidezpl 提交於 https://github.com/flutter/flutter/pull/107976
* 使用 persistent hash map 儲存 _inheritedWidgets，由 @mraleph 提交於 https://github.com/flutter/flutter/pull/108038
* 允許設定 TestWidgetsFlutterBinding.pointerEventSource，由 @HelioStrike 提交於 https://github.com/flutter/flutter/pull/103833
* 回滾「允許設定 TestWidgetsFlutterBinding.pointerEventSource」，由 @dnfield 提交於 https://github.com/flutter/flutter/pull/107715
* 新增 OvalBorder 與 BoxShape.oval，由 @bernaferrari 提交於 https://github.com/flutter/flutter/pull/108116
* 修正 BottomNavigationBarItem 預設 tooltip 為 label，由 @bleroux 提交於 https://github.com/flutter/flutter/pull/106891
* 指標事件：允許 trackpad 產生 hover 事件，由 @dkwingsmt 提交於 https://github.com/flutter/flutter/pull/107312
* 滾動慣性取消 [framework]，由 @moffatman 提交於 https://github.com/flutter/flutter/pull/108071
* GestureDetector 新增 supportedDevices 參數，由 @moffatman 提交於 https://github.com/flutter/flutter/pull/106621
* [flutter_tool] 將 shader 編譯為 .iplr 並於 ink_sparkle 使用 FragmentProgram.fromAsset，由 @zanderso 提交於 https://github.com/flutter/flutter/pull/108190
* 使用 toPictureSync 加速頁面縮放轉場，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/108056
* 允許 trackpad 慣性取消事件，由 @moffatman 提交於 https://github.com/flutter/flutter/pull/107337
* 修正 GestureDetector.onDoubleTapDown 未被呼叫，由 @pedromassango 提交於 https://github.com/flutter/flutter/pull/107568
* [web] 在 driver 測試初始化時提早定義 $flutterDriverResult 變數，由 @yjbanov 提交於 https://github.com/flutter/flutter/pull/107876
* 為 Flutter web 的 aria announcement 新增可選旗標以決定 assertiveness 等級，由 @nbayati 提交於 https://github.com/flutter/flutter/pull/108262
* 修正重建時 sheet 重設的問題，由 @caseycrogers 提交於 https://github.com/flutter/flutter/pull/108198
* 回滾「為 Flutter web 的 aria announcement 新增可選旗標以決定 assertiveness 等級」，由 @CaseyHillers 提交於 https://github.com/flutter/flutter/pull/107943
* flutter update-packages --force-upgrade + analyzer 修正，由 @goderbauer 提交於 https://github.com/flutter/flutter/pull/108268
* InputDecorator 遷移至 Material 3，由 @hangyujin 提交於 https://github.com/flutter/flutter/pull/105280
* ButtonStyle 新增 iconSize 參數，由 @QuncCccccc 提交於 https://github.com/flutter/flutter/pull/108234
* 在 `KeyMessageManager.keyMessageHandler` 說明「patching」協定並新增範例，由 @dkwingsmt 提交於 https://github.com/flutter/flutter/pull/108228
* 處置 scaffold drawers，由 @polina-c 提交於 https://github.com/flutter/flutter/pull/108233
* 處置 _TextSpanEditingController，由 @polina-c 提交於 https://github.com/flutter/flutter/pull/108193
* 處置 painters，由 @polina-c 提交於 https://github.com/flutter/flutter/pull/108227
* 處置 widgets 以防止記憶體洩漏，由 @polina-c 提交於 https://github.com/flutter/flutter/pull/108384
* 處置 KeepAliveHandle，由 @polina-c 提交於 https://github.com/flutter/flutter/pull/108396
* 更新 ChangeNotifier.dispose 與 KeepAliveHandle.release 的文件，由 @dnfield 提交於 https://github.com/flutter/flutter/pull/107963
* 僅當 assertiveness 非 polite 時才將其加入 dataMap，由 @nbayati 提交於 https://github.com/flutter/flutter/pull/108401
* [flutter_tools] 新增 shader 熱重載工具支援，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/108280
* 移除已棄用 styleFrom 參數的引用，由 @darrenaustin 提交於 https://github.com/flutter/flutter/pull/108369
* 新增 RenderRepaintBoundary.toImageSync() 方法，由 @tgucio 提交於 https://github.com/flutter/flutter/pull/108415
* 移除 SelectableText 時處理拖曳不再崩潰，由 @xu-baolin 提交於 https://github.com/flutter/flutter/pull/103473
* 使用 FragmentProgram.fromAssetAsync，由 @zanderso 提交於 https://github.com/flutter/flutter/pull/107738
* FloatingActionButton：新增可主題化的滑鼠游標，由 @jpnurmi 提交於 https://github.com/flutter/flutter/pull/108379
* 在 BoxScroll 與 ListView 文件中新增 scrollBehaviour 說明，由 @snat-s 提交於 https://github.com/flutter/flutter/pull/107848
* 優化 input_decorator_theme 中的閉包，由 @hangyujin 提交於 https://github.com/flutter/flutter/pull/108383
* 在 [FilteringTextInputFormatter] 文件中建議使用 predicate-based formatter 進行全字串比對，由 @LongCatIsLooong 提交於 https://github.com/flutter/flutter/pull/108473
* 簡化 mark needs build，由 @goderbauer 提交於 https://github.com/flutter/flutter/pull/108489
* async FragmentProgram.fromAsset 過渡的第 n 部分，由 @zanderso 提交於 https://github.com/flutter/flutter/pull/108287
* 新增 StarBorder 與 StarBorder.polygon，並附範例，由 @gspencergoog 提交於 https://github.com/flutter/flutter/pull/107632
* 修正 tabs indicator padding 更新錯誤，由 @xu-baolin 提交於 https://github.com/flutter/flutter/pull/108366
* 修正 NestedScrollView UserScrollNotification 問題，由 @xu-baolin 提交於 https://github.com/flutter/flutter/pull/108477
* TextField 遷移至 Material 3，由 @hangyujin 提交於 https://github.com/flutter/flutter/pull/108496
* 將 Switch 中 `effectiveInactivePressedOverlayColor` 的預設值改為參考 `effectiveInactiveThumbColor`，由 @QuncCccccc 提交於 https://github.com/flutter/flutter/pull/108565
* RenderAndroidView 防止非同步回呼後仍被使用，並取消註冊監聽器，由 @dnfield 提交於 https://github.com/flutter/flutter/pull/108562
* 修正 toPictureSync 問題期間禁用新轉場，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/108405
* 將 NavigationBar 標記為非 const 以符合實際情況，由 @goderbauer 提交於 https://github.com/flutter/flutter/pull/108538
* Dialog 與 DialogTheme 新增 shadowColor 和 surfaceTintColor，由 @darrenaustin 提交於 https://github.com/flutter/flutter/pull/107262
* 更新 Chips 範例並重新命名檔案，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/105799
* 用 TapRegionSurface 取代 FocusTrap，由 @gspencergoog 提交於 https://github.com/flutter/flutter/pull/108629
* 「全選」自動將 EditableText 捲動至文字欄位末尾，這在原生 iOS 不會發生，由 @antholeole 提交於 https://github.com/flutter/flutter/pull/108621
* TextFormField 新增 onTapOutside，由 @gspencergoog 提交於 https://github.com/flutter/flutter/pull/108633
* 回滾「Dialog 與 DialogTheme 新增 shadowColor 和 surfaceTintColor。」由 @CaseyHillers 提交於 https://github.com/flutter/flutter/pull/108574
* Sliver 文件快速修正，由 @youssef-attia 提交於 https://github.com/flutter/flutter/pull/108640
* 當無法取得語意資訊時改善 dumpSemanticsTree 錯誤訊息，由 @goderbauer 提交於 https://github.com/flutter/flutter/pull/108654
* 更新自動填充的網頁連結，由 @kevmoo 提交於 https://github.com/flutter/flutter/pull/108644
* 修正文件註解行被誤刪，由 @kevmoo 提交於 https://github.com/flutter/flutter/pull/108571
* [framework] 從 value listenable 建立動畫，由 @jonahwilliams 提交於 https://github.com/flutter/flutter/pull/108623
* TextPainter 擲出堆疊追蹤以協助追查 layout 前讀取問題，由 @LongCatIsLooong 提交於 https://github.com/flutter/flutter/pull/108743
* 覆寫 PlaceholderDimensions 的等號運算子以避免不必要的 TextPainter 重新排版，由 @tgucio 提交於 https://github.com/flutter/flutter/pull/107834
* 修正 lerp 至偏心圓的問題，由 @gspencergoog 提交於 https://github.com/flutter/flutter/pull/108573
* 修正 ExpansionTile 展開時顯示子項背景，由 @bleroux 提交於 https://github.com/flutter/flutter/pull/108508
* 建立 `containsSemantics` 以允許測試中部分語意比對，由 @pdblasi-google 提交於 https://github.com/flutter/flutter/pull/107477
* [SelectionOverlay] 將 debug 訊息移至 assertion 範圍內，由 @xu-baolin 提交於 https://github.com/flutter/flutter/pull/97972
* Loupe Android + iOS，由 @antholeole 提交於 https://github.com/flutter/flutter/pull/108844
* 棄用 `toggleableActiveColor`，由 @TahaTesser 提交於 https://github.com/flutter/flutter/pull/108843
* 回滾「修正 ExpansionTile 展開時顯示子項背景」，由 @Piinks 提交於 https://github.com/flutter/flutter/pull/108718
* 更新文件說明 ImageChunkEvent 為可選參數，由 @parkershepherd 提交於 https://github.com/flutter/flutter/pull/108430
* 重新合併「Dialog 與 DialogTheme 新增 shadowColor 和 surfaceTintColor。」由 @darrenaustin 提交於 https://github.com/flutter/flutter/pull/108507
* [flutter_test] 新增旗標以將裝置指標事件傳送至框架，由 @jiahaog 提交於 https://github.com/flutter/flutter/pull/105407
* 更新 `equalsIgnoringHashCodes` 以接受字串清單，由 @gspencergoog 提交於 https://github.com/flutter/flutter/pull/108332
* [macOS] 使用來自 engine 的編輯意圖，由 @knopp 提交於 https://github.com/flutter/flutter/pull/108868
* 新增 `IconButtonTheme` 並應用於 M3 的 `IconButton`，由 @QuncCccccc 提交於 https://github.com/flutter/flutter/pull/108915
* [flutter_test] 效能優化：find.ancestor，由 @passsy 提交於 https://github.com/flutter/flutter/pull/107179
* 移除部分過時的忽略標記，由 @goderbauer 提交於 https://github.com/flutter/flutter/pull/108924
* 清理 ScrollbarPainter，由 @Piinks 提交於 https://github.com/flutter/flutter/pull/108930
* 移除過時的忽略標記，由 @goderbauer 提交於 ⟦L118⟧
* 新增更多日誌以診斷 Gold flake，由 @Piinks 提交於 ⟦L119
