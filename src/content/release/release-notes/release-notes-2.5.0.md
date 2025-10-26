---
title: Flutter 2.5.0 發行說明
shortTitle: 2.5.0 發行說明
description: Flutter 2.5.0 的發行說明。
---
本頁為 2.5.0 版本的發行說明。
如需後續錯誤修正版本的資訊，請參閱我們的 [CHANGELOG]⟦L7318⟧
⟦L7317⟧

## `flutter/flutter` 標籤彙總已合併 PR

### framework - 530 個 pull request

[69826](https://github.com/flutter/flutter/pull/69826) 為 FloatingActionButton 新增 enableFeedback 屬性（framework, f: material design, cla: yes, waiting for tree to go green）

[69880](https://github.com/flutter/flutter/pull/69880) 為 DropdownButton 新增 enableFeedback 屬性（framework, f: material design, cla: yes）

[71947](https://github.com/flutter/flutter/pull/71947) 改善 ChangeNotifier 的效能（framework, cla: yes, waiting for tree to go green）

[73440](https://github.com/flutter/flutter/pull/73440) 硬體鍵盤：codegen（a: text input, team, framework, cla: yes）

[75091](https://github.com/flutter/flutter/pull/75091) 根據 AppBar 背景顏色計算系統疊加樣式（framework, f: material design, cla: yes, waiting for tree to go green）

[75460](https://github.com/flutter/flutter/pull/75460) 新增 TabBar padding 屬性（framework, f: material design, cla: yes, waiting for tree to go green）

[75497](https://github.com/flutter/flutter/pull/75497) 為 Scrollbar 新增 axisOrientation 屬性（framework, f: material design, f: scrolling, cla: yes, f: cupertino, waiting for tree to go green）

[76145](https://github.com/flutter/flutter/pull/76145) 新增指標滾動支援以觸發 floats 與 snaps（framework, a: fidelity, f: scrolling, cla: yes, a: quality, platform-web, waiting for tree to go green, a: desktop, a: mouse）

[76288](https://github.com/flutter/flutter/pull/76288) 遷移至 ChannelBuffers.push（a: tests, team, framework, f: material design, a: accessibility, cla: yes, f: cupertino, d: examples）

[76742](https://github.com/flutter/flutter/pull/76742) 為 transform widgets 新增 bitmap operation 屬性以啟用/控制 bitmap 轉換（team, framework, cla: yes, will affect goldens）

[76968](https://github.com/flutter/flutter/pull/76968) 在 DropdownMenuItem 新增 disable 參數（framework, f: material design, cla: yes）

[77514](https://github.com/flutter/flutter/pull/77514) 變更 SnackBar 的關閉方向（framework, f: material design, cla: yes, waiting for tree to go green）

[78032](https://github.com/flutter/flutter/pull/78032) 在呼叫 NavigationRail.onDestinationSelected 前新增 null 檢查（severe: crash, framework, f: material design, cla: yes, a: quality, waiting for tree to go green, a: null-safety）

[78133](https://github.com/flutter/flutter/pull/78133) 變更 SnackBar 的預設垂直 padding（framework, f: material design, cla: yes, waiting for tree to go green）

[78173](https://github.com/flutter/flutter/pull/78173) 改善 AssetImage 文件說明（framework, cla: yes, d: api docs, waiting for tree to go green, documentation）

[78202](https://github.com/flutter/flutter/pull/78202) 合併 CupertinoAlertDialog 與 CupertinoActionSheet 原始碼（framework, cla: yes, f: cupertino, waiting for tree to go green）

[78284](https://github.com/flutter/flutter/pull/78284) 新增 CupertinoScrollbar API 文件（framework, cla: yes, f: cupertino, d: api docs, d: examples, waiting for tree to go green, documentation）

[78522](https://github.com/flutter/flutter/pull/78522) Shortcut activator（a: tests, a: text input, team, framework, cla: yes）

[78558](https://github.com/flutter/flutter/pull/78558) PageView widget 公開 padEnds 屬性（framework, cla: yes, waiting for tree to go green）

[78649](https://github.com/flutter/flutter/pull/78649) 偵錯器附加時將部分例外視為未處理（tool, framework, cla: yes, waiting for tree to go green, cp: 2.2）

[78744](https://github.com/flutter/flutter/pull/78744) 修正 material toggle 繪製問題（#78733）（framework, f: material design, a: fidelity, cla: yes, waiting for tree to go green, will affect goldens）

[78835](https://github.com/flutter/flutter/pull/78835) [狀態還原] Restorable FormField 與 TextFormField（framework, f: material design, cla: yes, a: state restoration）

[78879](https://github.com/flutter/flutter/pull/78879) ListTile.divideTiles 只執行 Iterable 一次（framework, f: material design, cla: yes, waiting for tree to go green）

[78886](https://github.com/flutter/flutter/pull/78886) 改善 AppBar 的 `action` Icon 大小處理（framework, f: material design, cla: yes, waiting for tree to go green）

[78927](https://github.com/flutter/flutter/pull/78927) TextStyle 新增 TextOverflow 屬性（framework, f: material design, cla: yes, a: typography, waiting for tree to go green）

[78948](https://github.com/flutter/flutter/pull/78948) 修正貼上時 section 無效導致的崩潰（framework, f: material design, cla: yes, waiting for tree to go green）

[79035](https://github.com/flutter/flutter/pull/79035) 修正旋轉手勢辨識錯誤（framework, cla: yes, waiting for tree to go green）

[79085](https://github.com/flutter/flutter/pull/79085) 重新修正 button.icon 版面溢位問題（framework, f: material design, cla: yes）

[79287](https://github.com/flutter/flutter/pull/79287) 重新上線 InteractiveViewer.builder（framework, cla: yes, waiting for tree to go green）

[79535](https://github.com/flutter/flutter/pull/79535) 更新 TabController widget 時，若 _controller.index >= widget.length，則同步更新 _animationController 的值（framework, f: material design, cla: yes, waiting for tree to go green）

[79581](https://github.com/flutter/flutter/pull/79581) [flutter_driver] 為 flutter_driver 新增 waitForTappable（a: tests, framework, cla: yes, waiting for tree to go green）

[79599](https://github.com/flutter/flutter/pull/79599) 為 semantics 新增文字屬性支援（a: tests, framework, a: accessibility, cla: yes）

[79607](https://github.com/flutter/flutter/pull/79607) [RenderEditable] selection 無效時不繪製游標（framework, cla: yes, waiting for tree to go green）

[79608](https://github.com/flutter/flutter/pull/79608) 移除 test/widgets 中「不必要」的 import（tool, framework, cla: yes, waiting for tree to go green）

[79610](https://github.com/flutter/flutter/pull/79610) 移除雜項函式庫中的「不必要」import（team, framework, f: material design, cla: yes, waiting for tree to go green）

[79680](https://github.com/flutter/flutter/pull/79680) VisualDensity 不應減少 ButtonStyleButton 的水平 padding（framework, f: material design, cla: yes, waiting for tree to go green）

[79721](https://github.com/flutter/flutter/pull/79721) 修正 ExactAssetImage 範例（framework, cla: yes, waiting for tree to go green）

[79752](https://github.com/flutter/flutter/pull/79752) ListView 新增 prototypeItem 屬性（framework, cla: yes, waiting for tree to go green）

[79860](https://github.com/flutter/flutter/pull/79860) BorderRadiusTween.lerp 支援 null begin/end 值（framework, cla: yes, a: quality, waiting for tree to go green, a: null-safety）

[79957](https://github.com/flutter/flutter/pull/79957) 降低 BuildContext/Element 被保留時的記憶體洩漏嚴重性（framework, cla: yes, waiting for tree to go green）

[79959](https://github.com/flutter/flutter/pull/79959) 解除 roll 阻擋，還原 #79061（a: tests, team, framework, cla: yes）

[79966](https://github.com/flutter/flutter/pull/79966) 為 CupertinoSearchTextField 新增 onTap 與 autocorrect（framework, cla: yes, f: cupertino, waiting for tree to go green）

[79973](https://github.com/flutter/flutter/pull/79973) 支援帶有 word 與 line 修飾符的區塊刪除（framework, cla: yes）

[79988](https://github.com/flutter/flutter/pull/79988) 為可能遺漏的 TextSelectionOverlay 新增 dispose（framework, cla: yes, waiting for tree to go green）

[79990](https://github.com/flutter/flutter/pull/79990) 修正 FlexColumnWidth.value 的文件（framework, cla: yes, waiting for tree to go green）

[79998](https://github.com/flutter/flutter/pull/79998) AnimationController dispose 時清除 listeners（framework, cla: yes, waiting for tree to go green）

[79999](https://github.com/flutter/flutter/pull/79999) 新增 MaterialState.scrolledUnder 並支援 AppBar.backgroundColor（framework, f: material design, cla: yes）

[80003](https://github.com/flutter/flutter/pull/80003) 重構 text editing 測試 API（Mark III）（a: tests, team, framework, cla: yes, waiting for tree to go green）

[80006](https://github.com/flutter/flutter/pull/80006) 更新 SearchDelegate 的 leading 與 actions widget 可為 null（framework, f: material design, cla: yes, waiting for tree to go green）

[80028](https://github.com/flutter/flutter/pull/80028) 修正拼字錯誤（framework, cla: yes, waiting for tree to go green）

[80047](https://github.com/flutter/flutter/pull/80047) 調整選取拖曳起始位置以配合 viewport offset 變化（framework, cla: yes, waiting for tree to go green）

[80049](https://github.com/flutter/flutter/pull/80049) 測試改為不實作 ByteData（framework, cla: yes, waiting for tree to go green）

[80059](https://github.com/flutter/flutter/pull/80059) 還原「改善 viewport 大小變更時 scrollbar 行為」（framework, cla: yes, waiting for tree to go green）

[80070](https://github.com/flutter/flutter/pull/80070) 還原「移除雜項函式庫中的「不必要」import」（team, framework, f: material design, cla: yes）

[80087](https://github.com/flutter/flutter/pull/80087) 新增 ButtonStyle.maximumSize（framework, f: material design, cla: yes）

[80110](https://github.com/flutter/flutter/pull/80110) 讓 SelectableText 的焦點遍歷行為更標準化（framework, f: material design, cla: yes, waiting for tree to go green）

[80129](https://github.com/flutter/flutter/pull/80129) 新增 BackdropFilter blend mode（framework, cla: yes, waiting for tree to go green, will affect goldens）

[80134](https://github.com/flutter/flutter/pull/80134) 將 ExpansionPanelList 移至 Canvas.drawShadow（framework, f: material design, cla: yes, waiting for tree to go green）

[80142](https://github.com/flutter/flutter/pull/80142) 還原「改善 viewport 大小變更時 scrollbar 行為 (#7…」（framework, cla: yes, waiting for tree to go green）

[80157](https://github.com/flutter/flutter/pull/80157) 非 debug build 時搖動 widget inspector（team, framework, cla: yes, waiting for tree to go green）

[80166](https://github.com/flutter/flutter/pull/80166) 修正 InteractiveViewer.builder 於自訂 RenderBox 父元件的問題（framework, cla: yes, waiting for tree to go green）

[80184](https://github.com/flutter/flutter/pull/80184) 修改 DataRow，當 onSelectChanged 未設定時將其設為 disabled（framework, f: material design, cla: yes）

[80186](https://github.com/flutter/flutter/pull/80186) 修正右鍵點擊右至左選取時的問題（framework, cla: yes, waiting for tree to go green）

[80187](https://github.com/flutter/flutter/pull/80187) 修正 autocomplete 選項高度（framework, f: material design, cla: yes, waiting for tree to go green）

[80237](https://github.com/flutter/flutter/pull/80237) 調整 TabBar，當僅少數 tab 同時有 icon 與 text 時，為所有 tab 提供一致 padding（framework, f: material design, cla: yes, a: quality, waiting for tree to go green）

[80251](https://github.com/flutter/flutter/pull/80251) 讓 ReorderableListView 的 padding 隨列表滾動（framework, f: material design, cla: yes）

[80257](https://github.com/flutter/flutter/pull/80257) Autocomplete 與 RawAutocomplete 新增 initialValue 參數（framework, f: material design, cla: yes, waiting for tree to go green）

[80294](https://github.com/flutter/flutter/pull/80294) 移除已不再需要的 dynamic（及其 TODO）（framework, cla: yes, waiting for tree to go green）

[80302](https://github.com/flutter/flutter/pull/80302) 處理收到鍵盤事件時 primary focus 為 null 的情況（framework, cla: yes）

[80305](https://github.com/flutter/flutter/pull/80305) 還原「Reland InteractiveViewer.builder」（framework, cla: yes, waiting for tree to go green）

[80316](https://github.com/flutter/flutter/pull/80316) 修正 AppBar.title API 文件範例中的拼字錯誤（framework, f: material design, cla: yes）

[80326](https://github.com/flutter/flutter/pull/80326) 還原「移除已不再需要的 dynamic（及其 TODO）」 （framework, cla: yes）

[80336](https://github.com/flutter/flutter/pull/80336) 新增 `showTimePicker` 函式連結（framework, f: material design, cla: yes, waiting for tree to go green）

[80355](https://github.com/flutter/flutter/pull/80355) 修正 BackButtonListener 錯誤（framework, cla: yes, waiting for tree to go green）

[80360](https://github.com/flutter/flutter/pull/80360) 新增 ExpansionTile.controlAffinity（framework, f: material design, cla: yes）

[80373](https://github.com/flutter/flutter/pull/80373) 重新上線「移除已不再需要的 dynamic（及其 TODO） (#80294)」（team, framework, cla: yes, waiting for tree to go green）

[80380](https://github.com/flutter/flutter/pull/80380) 還原「新增 MaterialState.scrolledUnder 並支援 AppBar.backgroundColor」（framework, f: material design, cla: yes）

[80395](https://github.com/flutter/flutter/pull/80395) 重新上線「新增 MaterialState.scrolledUnder 並支援 AppBar.backgroundColor」（framework, f: material design, cla: yes, waiting for tree to go green）

[80420](https://github.com/flutter/flutter/pull/80420) 更新 PopupMenuButton widget（framework, f: material design, cla: yes, waiting for tree to go green）

[80453](https://github.com/flutter/flutter/pull/80453) 修正 AppBar.toolbarHeight > ktoolbarHeight 時 FlexibleSpaceBar Opacity（framework, f: material design, cla: yes, a: quality, waiting for tree to go green）

[80454](https://github.com/flutter/flutter/pull/80454) 更新 OutlinedButton 類別 API 文件（framework, f: material design, cla: yes）

[80459](https://github.com/flutter/flutter/pull/80459) [flutter_releases] Flutter Dev 2.2.0-10.1.pre Framework Cherrypicks（tool, framework, engine, cla: yes）

[80467](https://github.com/flutter/flutter/pull/80467) 新增 AppBarTheme.toolbarHeight 支援（framework, f: material design, cla: yes, waiting for tree to go green）

[80476](https://github.com/flutter/flutter/pull/80476) router.dart 將 dynamic 改為 Object/Object?（framework, cla: yes, waiting for tree to go green）

[80527](https://github.com/flutter/flutter/pull/80527) 新增 bottom sheets 尺寸限制功能（framework, f: material design, cla: yes, waiting for tree to go green）

[80545](https://github.com/flutter/flutter/pull/80545) 還原「修正 AppBar.toolbarHeight > ktoolbarHeight 時 FlexibleSpaceBar Opacity」（framework, f: material design, cla: yes, waiting for tree to go green）

[80554](https://github.com/flutter/flutter/pull/80554) 將 AnimatedSize 轉為 StatefulWidget（team, framework, cla: yes, waiting for tree to go green）

[80566](https://github.com/flutter/flutter/pull/80566) [狀態還原] Restorable `TimePickerDialog` widget, `RestorableTimeOfDay`（framework, f: material design, cla: yes, waiting for tree to go green）

[80567](https://github.com/flutter/flutter/pull/80567) DropdownButton 滑鼠懸停時變更游標（framework, f: material design, cla: yes, waiting for tree to go green）

[80573](https://github.com/flutter/flutter/pull/80573) 修正 NestedScrollView 的 ScrollPosition 存取錯誤（framework, cla: yes, waiting for tree to go green）

[80587](https://github.com/flutter/flutter/pull/80587) 為 DragAnchor 棄用新增 dart fix（team, framework, f: material design, cla: yes, f: cupertino, waiting for tree to go green）

[80588](https://github.com/flutter/flutter/pull/80588) 移除 release build 中部分 runtime 檢查



