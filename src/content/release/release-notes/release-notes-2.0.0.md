---
title: Flutter 2.0.0 發行說明
shortTitle: 2.0.0 發行說明
description: Flutter 2.0.0 的發行說明。
---

本頁為 2.0.0 版本的發行說明。
如需後續錯誤修正版本的資訊，請參閱我們的 [CHANGELOG][CHANGELOG]

[CHANGELOG]: https://github.com/flutter/flutter/blob/master/CHANGELOG.md

## `flutter/flutter` 標籤合併 PR 一覽

### framework - 共 793 個 pull request

[48223](https://github.com/flutter/flutter/pull/48223) 新增 HeroMode 元件 (a: animation, cla: yes, f: cupertino, f: routes, framework, waiting for tree to go green)

[55209](https://github.com/flutter/flutter/pull/55209) 更新 SearchDelegate 以遵循自訂 InputDecorationTheme (cla: yes, f: material design, framework)

[56024](https://github.com/flutter/flutter/pull/56024) 在 showCupertinoModalPopup 中將 RouteSettings 傳遞給內部 Route (cla: yes, f: cupertino, framework)

[61366](https://github.com/flutter/flutter/pull/61366) clipBehavior 重大變更持續推進 (cla: yes, f: cupertino, framework, severe: API break)

[61981](https://github.com/flutter/flutter/pull/61981) iOS 上 IME bar 定位 (a: fidelity, a: internationalization, a: text input, cla: yes, framework, waiting for tree to go green)

[62616](https://github.com/flutter/flutter/pull/62616) foundation 測試遷移至 null safety (a: accessibility, a: null-safety, cla: yes, framework)

[62694](https://github.com/flutter/flutter/pull/62694) services 測試轉換為 NNBD (cla: yes, framework, team)

[62701](https://github.com/flutter/flutter/pull/62701) gestures、physics 和 scheduler 測試遷移至 null safety (a: null-safety, cla: yes, framework)

[62927](https://github.com/flutter/flutter/pull/62927) AutocompleteCore (a: text input, cla: yes, framework, severe: new feature)

[63272](https://github.com/flutter/flutter/pull/63272) 使用 end drawer 時移除返回按鈕 (cla: yes, f: material design, framework, waiting for tree to go green)

[63466](https://github.com/flutter/flutter/pull/63466) [MaterialSlice] 新增屬性以自訂 slice 顏色 (cla: yes, f: material design, framework, waiting for tree to go green)

[63683](https://github.com/flutter/flutter/pull/63683) Tab bar 改進 (cla: yes, f: material design, framework)

[63813](https://github.com/flutter/flutter/pull/63813) PointerEvent 的轉換座標延遲計算 (cla: yes, f: gestures, framework)

[63834](https://github.com/flutter/flutter/pull/63834) 將 hover 事件視為一般 pointer 事件，並將其帶回 Listener (a: tests, cla: yes, f: material design, framework, team, waiting for tree to go green)

[63910](https://github.com/flutter/flutter/pull/63910) 改進 Stepper controlsBuilder 文件 (cla: yes, d: api docs, documentation, f: material design, framework, waiting for tree to go green)

[63996](https://github.com/flutter/flutter/pull/63996) fuchsia_remote_debug_protocol 允許在遠端裝置開啟埠口 (a: tests, cla: yes, framework, tool)

[64140](https://github.com/flutter/flutter/pull/64140) [ReorderableListView] 修正項目拖放動畫 (a: animation, cla: yes, f: material design, f: scrolling, framework, waiting for tree to go green)

[64222](https://github.com/flutter/flutter/pull/64222) 允許修改 ListTile 的 horizontalTitleGap、minVerticalPadding、minLeadingWidth (cla: yes, f: material design, framework)

[64240](https://github.com/flutter/flutter/pull/64240) 為 FadeTransition 新增範例程式碼 (cla: yes, d: api docs, d: examples, documentation, framework, waiting for tree to go green)

[64379](https://github.com/flutter/flutter/pull/64379) 使 Dismissible 的 HitTestBehavior 成為參數 (cla: yes, f: gestures, framework, waiting for tree to go green)

[64468](https://github.com/flutter/flutter/pull/64468) 修正 CupertinoAlertDialog 的 TextStyle (cla: yes, f: cupertino, framework, waiting for tree to go green, will affect goldens)

[64638](https://github.com/flutter/flutter/pull/64638) 為 DefaultTextStyleTransition 新增範例程式碼 (cla: yes, d: api docs, d: examples, documentation, framework, waiting for tree to go green)

[64639](https://github.com/flutter/flutter/pull/64639) LicensePage 的 loading 顏色由 scaffoldBackgroundColor 改為 cardColor (cla: yes, f: material design, framework, waiting for tree to go green)

[64678](https://github.com/flutter/flutter/pull/64678) 用 SafeArea 包裹 PopupMenu 以尊重狀態列 (a: layout, a: quality, cla: yes, f: material design, framework, waiting for tree to go green)

[64698](https://github.com/flutter/flutter/pull/64698) 為 AnimatedAlign 新增範例程式碼 (cla: yes, d: api docs, d: examples, documentation, framework, waiting for tree to go green)

[64746](https://github.com/flutter/flutter/pull/64746) 當 FloatingActionButtonLocation 為 top 時，FloatingActionButton 位置保持不變 (a: quality, cla: yes, f: material design, framework, waiting for tree to go green)

[64846](https://github.com/flutter/flutter/pull/64846) 將 GestureBinding.handlePointerEvent 公開，取代 dispatchEvent 成為推薦事件派發方式 (a: tests, cla: yes, f: cupertino, f: material design, framework, team, waiting for tree to go green)

[64930](https://github.com/flutter/flutter/pull/64930) 新增 CompositedTransformFollower.{followerAnchor, leaderAnchor} 以自訂錨點 (a: layout, cla: yes, framework, waiting for tree to go green)

[64966](https://github.com/flutter/flutter/pull/64966) 文件小幅更新 (cla: yes, f: cupertino, f: material design, framework, waiting for tree to go green)

[65000](https://github.com/flutter/flutter/pull/65000) [LayoutBuilder] 實作 baseline 邏輯以將 baseline 傳遞給子元件 (cla: yes, framework, waiting for tree to go green)

[65010](https://github.com/flutter/flutter/pull/65010) 修正 showDatePicker 中 helpText 半隱藏問題 (a: internationalization, cla: yes, f: date/time picker, f: material design, framework)

[65044](https://github.com/flutter/flutter/pull/65044) TextSelectionTheme 支援（第 2/3 步）(cla: yes, f: material design, framework, waiting for tree to go green, will affect goldens)

[65057](https://github.com/flutter/flutter/pull/65057) 為 AnimationController 的 fling 方法新增 SpringDescription 參數 (a: animation, cla: yes, f: gestures, framework, waiting for tree to go green)

[65072](https://github.com/flutter/flutter/pull/65072) 測試中尋找包含指定文字 (a: tests, cla: yes, framework, waiting for tree to go green)

[65080](https://github.com/flutter/flutter/pull/65080) [ReorderableListView] 拖起項目後移除多餘的 margin (cla: yes, f: material design, framework, waiting for tree to go green)

[65087](https://github.com/flutter/flutter/pull/65087) 讓 Flutter SDK 使用 cupertino_icons 1.0.0 (cla: yes, f: cupertino, framework, team, tool)

[65126](https://github.com/flutter/flutter/pull/65126) 修正 overlay entry 移除時，若自身在 overlay 中，應先自我移除 (a: animation, cla: yes, f: routes, framework, waiting for tree to go green)

[65164](https://github.com/flutter/flutter/pull/65164) 為 CupertinoSliverRefreshControl 新增 dart-pad 範例程式碼 (cla: yes, f: cupertino, framework, waiting for tree to go green)

[65180](https://github.com/flutter/flutter/pull/65180) [修正] Image widget 的 errorBuilder 被呼叫後停止載入圖片 (cla: yes, framework)

[65193](https://github.com/flutter/flutter/pull/65193) 為 iOS 13.4+ 產生 RawKeyEvents (a: tests, cla: yes, framework, team)

[65226](https://github.com/flutter/flutter/pull/65226) 改善 Scrollable.ensureVisible 在巢狀 Scrollable 時的行為 (cla: yes, f: scrolling, framework)

[65235](https://github.com/flutter/flutter/pull/65235) CupertinoTextField 禁用時不應接受 requestFocus (cla: yes, f: cupertino, framework, waiting for tree to go green)

[65246](https://github.com/flutter/flutter/pull/65246) 棄用未使用的屬性 [RectangularSliderTrackShape.disabledThumbGapWidth] (cla: yes, f: material design, framework)

[65274](https://github.com/flutter/flutter/pull/65274) 為 CupertinoActionSheet 新增範例程式碼 (cla: yes, f: cupertino, framework)

[65313](https://github.com/flutter/flutter/pull/65313) 修正 flutter-web 上 MouseScrollWheel 放大時未執行 onInteraction 函數的 bug (cla: yes, framework, waiting for tree to go green)

[65320](https://github.com/flutter/flutter/pull/65320) 為 SelectableText 元件新增 onSelectionChanged (cla: yes, f: material design, framework, waiting for tree to go green)

[65323](https://github.com/flutter/flutter/pull/65323) Sliver padding 重疊修正 (a: quality, cla: yes, f: scrolling, framework, waiting for tree to go green)

[65432](https://github.com/flutter/flutter/pull/65432) 修正 InteractiveViewer minScale bug (cla: yes, framework, waiting for tree to go green)

[65444](https://github.com/flutter/flutter/pull/65444) 參數改為選填 (a: tests, cla: yes, framework, waiting for tree to go green)

[65463](https://github.com/flutter/flutter/pull/65463) [Tabs] 修正 tab indicator 飛出問題 (cla: yes, f: material design, framework, waiting for tree to go green)

[65499](https://github.com/flutter/flutter/pull/65499) [web] 當 read-only 標誌切換時通知 engine (a: tests, a: text input, cla: yes, framework, platform-web, waiting for tree to go green)

[65501](https://github.com/flutter/flutter/pull/65501) 更新 cupertino picker 視覺效果 (cla: yes, f: cupertino, framework)

[65503](https://github.com/flutter/flutter/pull/65503) 改進 ImageFiltered 與 BackdropFilter 的文件 (cla: yes, framework, waiting for tree to go green)

[65505](https://github.com/flutter/flutter/pull/65505) 建立測試 Flutter 套件中私有 API 的方式 (cla: yes, framework, team, waiting for tree to go green)

[65528](https://github.com/flutter/flutter/pull/65528) 重新上線 "Nnbd widgets" (a: accessibility, cla: yes, f: cupertino, framework, waiting for tree to go green)

[65568](https://github.com/flutter/flutter/pull/65568) 移除未使用的 'dart:async' 匯入 (a: accessibility, a: internationalization, a: tests, cla: yes, f: cupertino, f: material design, framework, team, tool)

[65579](https://github.com/flutter/flutter/pull/65579) 將 restoration channel 註冊移至 binding 初始化時 (cla: yes, framework, waiting for tree to go green)

[65584](https://github.com/flutter/flutter/pull/65584) List tile 文件 (cla: yes, f: material design, framework, waiting for tree to go green)

[65602](https://github.com/flutter/flutter/pull/65602) 重新上線 "perf test for measuring scroll smoothness" (a: tests, cla: yes, framework, team, waiting for tree to go green)

[65635](https://github.com/flutter/flutter/pull/65635) 還原 "Reland "Make sure all isolates start during flutter driver tests"" (a: tests, cla: yes, framework, waiting for tree to go green)

[65658](https://github.com/flutter/flutter/pull/65658) 讓 Navigator 可恢復狀態（包含 WidgetsApp、MaterialApp、CupertinoApp）(cla: yes, f: cupertino, f: material design, framework, waiting for tree to go green)

[65659](https://github.com/flutter/flutter/pull/65659) [Material] 修正 extended Navigation Rail 過渡動畫初始時跳動的問題 (cla: yes, f: material design, framework, waiting for tree to go green)

[65660](https://github.com/flutter/flutter/pull/65660) 還原 "Reland "Make sure all isolates start during flutter driver te… (a: tests, cla: yes, framework)

[65662](https://github.com/flutter/flutter/pull/65662) 按鈕在變更背景色前會先動畫化 elevation (cla: yes, f: material design, framework, waiting for tree to go green)

[65665](https://github.com/flutter/flutter/pull/65665) 更新 API 文件中已棄用的 Material 按鈕類別參考 (cla: yes, f: material design, framework, waiting for tree to go green)

[65667](https://github.com/flutter/flutter/pull/65667) 修正 `character` 欄位於非 Android 平台時持有正確資料 (a: desktop, a: tests, cla: yes, framework, team)

[65695](https://github.com/flutter/flutter/pull/65695) 修正 FormFieldState value 與 TextFormField onChanged value 不同步 (cla: yes, f: material design, framework)

[65703](https://github.com/flutter/flutter/pull/65703) 確保 flutter driver 測試時所有 isolates 都會啟動 (a: tests, cla: yes, framework, waiting for tree to go green)

[65704](https://github.com/flutter/flutter/pull/65704) 還原 "fuchsia_remote_debug_protocol allows open port on remote device" (a: tests, cla: yes, framework, tool)

[65754](https://github.com/flutter/flutter/pull/65754) 修正輸入本地狀態與 engine 狀態不一致問題 (cla: yes, framework, waiting for tree to go green)

[65766](https://github.com/flutter/flutter/pull/65766) 新增 slider semantics flag 的 getter/setter (a: accessibility, cla: yes, framework)

[65787](https://github.com/flutter/flutter/pull/65787) Flutter Stable Framework Cherrypicks 1.20.4 (a: internationalization, cla: yes, d: examples, engine, f: material design, framework, team, tool)

[65817](https://github.com/flutter/flutter/pull/65817) 釐清 scrollUntilVisible 的文件說明 (a: tests, cla: yes, d: api docs, documentation, framework)

[65832](https://github.com/flutter/flutter/pull/65832) 修正 #55400 PopupMenuButton 巢狀時選單定位錯誤 (cla: yes, f: material design, framework, waiting for tree to go green)

[65857](https://github.com/flutter/flutter/pull/65857) [flutter] 從特定 widget span 隱藏語意資訊 (cla: yes, framework, waiting for tree to go green)

[65861](https://github.com/flutter/flutter/pull/65861) 修正 ScrollMetrics 的 nullability (cla: yes, framework)

[65871](https://github.com/flutter/flutter/pull/65871) 還原 "Add CompositedTransformFollower.{followerAnchor, leaderAnchor} for custom anchoring (#64930)" (cla: yes, framework)

[65876](https://github.com/flutter/flutter/pull/65876) 允許為 ui.Image 測試新增新方法 (cla: yes, framework, team, waiting for tree to go green)

[65877](https://github.com/flutter/flutter/pull/65877) 更新 Navigation Rail 測試，加入回歸註解與更乾淨的尺寸檢查 (cla: yes, f: material design, framework, waiting for tree to go green)

[65878](https://github.com/flutter/flutter/pull/65878) 還原 "Add CompositedTransformFollower.{followerAnchor, leaderAnchor… (cla: yes, framework)

[65880](https://github.com/flutter/flutter/pull/65880) 部分 cupertino 檔案遷移至 null safety (cla: yes, f: cupertino, framework, waiting for tree to go green)

[65884](https://github.com/flutter/flutter/pull/65884) 重新上線 64930 Add CompositedTransformFollower.{followerAnchor, leaderAnchor} for custom anchoring (cla: yes, framework, waiting for tree to go green)

[65910](https://github.com/flutter/flutter/pull/65910) 為 Overlay、Flow、AnimatedSize 及 AndroidView 新增 clipBehavior (cla: yes, framework, waiting for tree to go green)

[65915](https://github.com/flutter/flutter/pull/65915) 修正 DropdownButton bug (cla: yes, f: material design, framework, waiting for tree to go green)

[65918](https://github.com/flutter/flutter/pull/65918) 在 bottom_navigation_bar_test.dart 中將 title 欄位改為 label (cla: yes, f: material design, framework, waiting for tree to go green)

[65944](https://github.com/flutter/flutter/pull/65944) Divider with subheader 範例更新 (cla: yes, f: material design, framework, waiting for tree to go green)

[65951](https://github.com/flutter/flutter/pull/65951) [flutter_tools] 連接 frontend_server 的 widget 快取 (cla: yes, framework, team, tool, waiting for tree to go green)

[65966](https://github.com/flutter/flutter/pull/65966) TextField 版面限制 bug (cla: yes, f: material design, framework)

[65973](https://github.com/flutter/flutter/pull/65973) Android 平台

