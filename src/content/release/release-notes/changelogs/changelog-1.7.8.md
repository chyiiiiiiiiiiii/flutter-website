---
title: Flutter 1.7.8 變更日誌
shortTitle: 1.7.8 變更日誌
description: Flutter 1.7.8 變更日誌，包含本次發佈合併的所有 PR 清單。
---

## flutter/flutter 本次發佈關閉的 PR

從 2019 年 5 月 1 日（週三）16:56:00 -0700 到 2019 年 7 月 18 日（週四）08:04:00 -0700

[28808](https://github.com/flutter/flutter/pull/28808)  更新 tearDownAll 函式（cla: yes, t: flutter driver, team, tool, waiting for tree to go green）

[28834](https://github.com/flutter/flutter/pull/28834) Sliver 動畫列表（cla: yes, framework, waiting for tree to go green）

[29683](https://github.com/flutter/flutter/pull/29683) 根據裝置類型顯示/隱藏工具列與控制柄（a: desktop, a: text input, cla: yes, framework, severe: API break）

[29809](https://github.com/flutter/flutter/pull/29809) 修正文字選取工具列出現在遮蔽物下方的問題（cla: yes, f: cupertino, f: material design, framework）

[29954](https://github.com/flutter/flutter/pull/29954) Cupertino 在地化第 9 步：新增測試（cla: yes, f: cupertino, framework）

[30076](https://github.com/flutter/flutter/pull/30076) 實作 FocusTraversalPolicy 與 DefaultFocusTraversal 功能。（a: desktop, cla: yes, framework）

[30224](https://github.com/flutter/flutter/pull/30224) Cupertino 在地化第 10 步：更新 flutter_localizations 的 README（cla: yes, f: cupertino, framework）

[30388](https://github.com/flutter/flutter/pull/30388) 在 SearchDelegate 新增 hintStyle（cla: yes, f: material design, framework）

[30406](https://github.com/flutter/flutter/pull/30406) 為 platform channels 新增 binaryMessenger 建構子參數（cla: yes, framework, p: framework）

[30874](https://github.com/flutter/flutter/pull/30874) 重做「從部分 pointer events 移除壓力自訂化」功能（cla: yes, framework, severe: API break）

[30979](https://github.com/flutter/flutter/pull/30979) 修正 issue 30526：四捨五入誤差（cla: yes, framework, waiting for tree to go green）

[30983](https://github.com/flutter/flutter/pull/30983) 重構 FlutterError 的核心用法。（cla: yes, framework）

[30988](https://github.com/flutter/flutter/pull/30988) 緊密段落寬度（cla: yes, framework）

[31018](https://github.com/flutter/flutter/pull/31018) [Material] BottomNavigationBar 已選/未選標籤樣式與圖示主題（cla: yes, f: material design, framework）

[31025](https://github.com/flutter/flutter/pull/31025) 在 Scaffold 元件中新增 `scrimColor` 屬性（cla: yes, f: material design, framework）

[31028](https://github.com/flutter/flutter/pull/31028) 新增支援產生使用 AndroidX 支援函式庫的專案（cla: yes, tool, waiting for tree to go green）

[31039](https://github.com/flutter/flutter/pull/31039) 修正 iOS 啟動時 flutter run 的 bundle id 問題（cla: yes, tool）

[31095](https://github.com/flutter/flutter/pull/31095) 為 WidgetController 及相關測試類別新增按鈕自訂化功能（cla: yes, framework）

[31227](https://github.com/flutter/flutter/pull/31227) 新增 CupertinoTabController（cla: yes, f: cupertino, framework, severe: API break）

[31308](https://github.com/flutter/flutter/pull/31308) 當 isDefaultAction 為 true 時，CupertinoDialogAction 加粗字體（cla: yes, f: cupertino）

[31317](https://github.com/flutter/flutter/pull/31317) 為 AppBar 新增文件說明（cla: yes, d: api docs, f: material design, framework）

[31318](https://github.com/flutter/flutter/pull/31318) 新增 BottomSheetTheme 以支援主題色彩、陰影、形狀（cla: yes, f: material design, framework）

[31333](https://github.com/flutter/flutter/pull/31333) 清理 flutter_test/test/controller_test.dart（a: tests, cla: yes, framework）

[31438](https://github.com/flutter/flutter/pull/31438) 實作 Material 按鈕的焦點處理與滑鼠懸停（cla: yes, f: material design, framework）

[31485](https://github.com/flutter/flutter/pull/31485) 防止 hasScrolledBody 拋出例外（cla: yes, f: scrolling, framework）

[31514](https://github.com/flutter/flutter/pull/31514) 日期選擇器版面配置例外處理（cla: yes, f: material design, framework）

[31574](https://github.com/flutter/flutter/pull/31574) 改善 RadioListTile 回呼行為一致性（cla: yes, f: material design, framework, severe: API break）

[31581](https://github.com/flutter/flutter/pull/31581) 修正巢狀 TabBarView 銷毀時的例外（cla: yes, f: material design, framework, severe: crash）

[31631](https://github.com/flutter/flutter/pull/31631) 教 Linux 使用本地引擎（cla: yes, tool）

[31644](https://github.com/flutter/flutter/pull/31644) Cupertino 在地化第 12 步：推送所有支援語言的翻譯（a: internationalization, cla: yes, f: cupertino, f: material design, framework）

[31662](https://github.com/flutter/flutter/pull/31662) 為 SliverAppBar 新增 shape 屬性（cla: yes, f: material design, framework）

[31681](https://github.com/flutter/flutter/pull/31681) [Material] 建立可主題化的 Range Slider（連續與離散）（cla: yes, f: material design, framework）

[31699](https://github.com/flutter/flutter/pull/31699) 再次上線：新增 Tooltip hover 支援（cla: yes, f: material design, framework）

[31701](https://github.com/flutter/flutter/pull/31701) 新增更多 assert 以檢查矩陣有效性（cla: yes, framework）

[31763](https://github.com/flutter/flutter/pull/31763) 修正 ScrollbarPainter thumbExtent 計算並新增 padding（cla: yes, d: api docs, f: cupertino, f: material design, f: scrolling, framework）

[31798](https://github.com/flutter/flutter/pull/31798) 修正 tab 縮排（cla: yes, framework, tool, waiting for tree to go green）

[31822](https://github.com/flutter/flutter/pull/31822) 移除 catalog 範例中不必要的人為延遲（cla: yes, d: examples, framework）

[31824](https://github.com/flutter/flutter/pull/31824) 修正 FlutterDriver timeout（cla: yes, framework, t: flutter driver）

[31825](https://github.com/flutter/flutter/pull/31825) 修正函式字面量缺少 return 陳述式（cla: yes, team, tool）

[31850](https://github.com/flutter/flutter/pull/31850) 使 Gradle 錯誤訊息更具體（cla: yes, tool）

[31851](https://github.com/flutter/flutter/pull/31851) 為 Navigator 新增文件說明（cla: yes, framework）

[31852](https://github.com/flutter/flutter/pull/31852) 文字選取控制柄有時無法互動（cla: yes, f: cupertino, f: material design, framework）

[31861](https://github.com/flutter/flutter/pull/31861) 為 Constrained Chip 標籤計算新增水平 padding（cla: yes, f: material design, framework）

[31873](https://github.com/flutter/flutter/pull/31873) 新增基本桌面 Linux 檢查（cla: yes, tool）

[31885](https://github.com/flutter/flutter/pull/31885) 修正 deploy_gallery 分支的 commit 訊息 UTF 問題（cla: yes, team）

[31889](https://github.com/flutter/flutter/pull/31889) 開始將平台邏輯構建抽象到共用介面之後（cla: yes, tool）

[31890](https://github.com/flutter/flutter/pull/31890) 對 Flex 應用 fp hack（cla: yes, framework）

[31894](https://github.com/flutter/flutter/pull/31894) 為 Box 與 Sliver 引入獨立的 HitTestResults（cla: yes, framework）

[31895](https://github.com/flutter/flutter/pull/31895) 在 flutter build aot --report-timings 報告 CompileTime 指標（cla: yes, tool）

[31902](https://github.com/flutter/flutter/pull/31902) 更新 primaryColor 文件，參考 colorScheme 屬性（cla: yes, d: api docs, f: material design, framework）

[31903](https://github.com/flutter/flutter/pull/31903) 從 Image.asset dardoc 中抽取 TODO 註解（cla: yes, d: api docs, framework）

[31909](https://github.com/flutter/flutter/pull/31909) 將 unfocus 改為取消整個焦點鏈，而非僅主焦點（cla: yes, framework）

[31910](https://github.com/flutter/flutter/pull/31910) [fuchsia] 新增 'device' 指令支援，使用 SDK（cla: yes）

[31912](https://github.com/flutter/flutter/pull/31912) 回滾「Redo: Add buttons to gestures」（cla: yes）

[31923](https://github.com/flutter/flutter/pull/31923) 再次上線 #31623 - 修正邊緣滑動並回到起點（cla: yes）

[31925](https://github.com/flutter/flutter/pull/31925) 新增指令以便本地開發時切換 dart imports（cla: yes）

[31926](https://github.com/flutter/flutter/pull/31926) 避免 NPE（cla: yes）

[31929](https://github.com/flutter/flutter/pull/31929) Flow 元件範例程式碼與動畫（cla: yes, d: api docs, d: examples, framework）

[31935](https://github.com/flutter/flutter/pull/31935) 再次上線#2: 為 gestures 新增按鈕支援（a: desktop, cla: yes, framework）

[31936](https://github.com/flutter/flutter/pull/31936) 使 windows/mac 與 linux 一致（cla: yes）

[31938](https://github.com/flutter/flutter/pull/31938) 使用正確的 const 格式更新 scrimDrawerColor（cla: yes, f: material design, framework）

[31944](https://github.com/flutter/flutter/pull/31944) 效能問題模板（cla: yes, team）

[31947](https://github.com/flutter/flutter/pull/31947) 簡化抽屜 scrimColor 預設值，更新測試（cla: yes）

[31954](https://github.com/flutter/flutter/pull/31954) 修正 MediaQueryData.toString() 產生可讀輸出（cla: yes）

[31960](https://github.com/flutter/flutter/pull/31960) 修正處理循環診斷時的錯誤（cla: yes）

[31967](https://github.com/flutter/flutter/pull/31967) cherry-pick：修正邊緣滑動並回到起點 (#31623)（cla: yes）

[31978](https://github.com/flutter/flutter/pull/31978) 再次上線修正 25807，實作 sliver multibox 元件的移動（cla: yes）

[31979](https://github.com/flutter/flutter/pull/31979) 回滾「Tight Paragraph Width」（cla: yes）

[31987](https://github.com/flutter/flutter/pull/31987) 文字換行寬度（a: typography, cla: yes, framework）

[31998](https://github.com/flutter/flutter/pull/31998) [flutter_tool] 針對平台拉取正確的 Fuchsia SDK（cla: yes）

[32003](https://github.com/flutter/flutter/pull/32003) 回滾「開始將平台邏輯構建抽象到共用介面之後」（cla: yes）

[32013](https://github.com/flutter/flutter/pull/32013) Cupertino 土耳其語翻譯（a: internationalization, cla: yes, f: cupertino, framework）

[32025](https://github.com/flutter/flutter/pull/32025) 使 Hover Listener 尊重變換（cla: yes, framework, waiting for tree to go green）

[32041](https://github.com/flutter/flutter/pull/32041) 移除已棄用的 decodedCacheRatioCap（cla: yes, framework）

[32043](https://github.com/flutter/flutter/pull/32043) 回滾 Android caret 變更（cla: yes）

[32050](https://github.com/flutter/flutter/pull/32050) 依據 a11y 對比指引測試 Material 按鈕（cla: yes）

[32053](https://github.com/flutter/flutter/pull/32053) 增加 TimePicker 觸控目標（cla: yes, f: material design, framework）

[32059](https://github.com/flutter/flutter/pull/32059) 修正 issue 14014 唯讀文字欄位（a: text input, cla: yes, framework, severe: API break）

[32060](https://github.com/flutter/flutter/pull/32060) 讓 hotfix 使用加號而非減號（cla: yes, tool）

[32066](https://github.com/flutter/flutter/pull/32066) 更新套件並解除 build 鎖定（cla: yes）

[32070](https://github.com/flutter/flutter/pull/32070) 將 foreground 與 background 重新命名為 light 與 dark（a: tests, cla: yes, framework）

[32071](https://github.com/flutter/flutter/pull/32071) [flutter_tool] 在 'attach' 中使用 Fuchsia SDK 的 platform dill 等（cla: yes, tool）

[32072](https://github.com/flutter/flutter/pull/32072) pubspec 為空時不會 NPE（cla: yes, tool）

[32086](https://github.com/flutter/flutter/pull/32086) 修正 CupertinoSliverRefreshControl 的 onRefresh 回呼（cla: yes, f: cupertino, framework）

[32126](https://github.com/flutter/flutter/pull/32126) 提升 multicast_dns 版本（cla: yes, tool）

[32135](https://github.com/flutter/flutter/pull/32135) 回滾「Sliver 動畫列表」（cla: yes）

[32142](https://github.com/flutter/flutter/pull/32142) 修正 RenderPointerListener 回呼時機錯誤問題（cla: yes, framework）

[32147](https://github.com/flutter/flutter/pull/32147) 為 SwitchListTile 新增狀態管理文件/範例（cla: yes, d: api docs, f: material design, framework）

[32155](https://github.com/flutter/flutter/pull/32155) 回滾「為 SliverAppBar 新增 shape 屬性」（cla: yes）

[32177](https://github.com/flutter/flutter/pull/32177) 分頁動畫範例影片（cla: yes, d: api docs, f: material design, framework）

[32192](https://github.com/flutter/flutter/pull/32192) 將 PointerEvents 轉換至事件接收者的本地座標系（cla: yes, framework）

[32256](https://github.com/flutter/flutter/pull/32256) 修正 issue 32212 文字欄位鍵盤選取崩潰（cla: yes）

[32266](https://github.com/flutter/flutter/pull/32266) 為 iOS profile 設定新增 Runner-Bridging-Header.h 參考（cla: yes, t: xcode, waiting for tree to go green）

[32302](https://github.com/flutter/flutter/pull/32302) 為 Flutter Driver 新增 geometry getters（cla: yes）

[32328](https://github.com/flutter/flutter/pull/32328) 為 TextOverflow 新增 breadcrumbs（cla: yes, framework, waiting for tree to go green）

[32335](https://github.com/flutter/flutter/pull/32335) 教 flutter msbuild 支援 Windows（cla: yes, tool）

[32340](https://github.com/flutter/flutter/pull/32340) 使 immutables 為 const（cla: yes, framework）

[32345](https://github.com/flutter/flutter/pull/32345) 為效能問題模板新增 master channel（cla: yes, team）

[32350](https://github.com/flutter/flutter/pull/32350) 修正巢狀監聽器，使祖先監聽器也能收到 enter/exit/move 事件（cla: yes）

[32360](https://github.com/flutter/flutter/pull/32360) 允許 flutter web 可用 flutter 編譯（cla: yes, framework, tool）

[32380](https://github.com/flutter/flutter/pull/32380) Driver 中全部使用 const（cla: yes, framework, t: flutter driver, waiting for tree to go green）

[32404](https://github.com/flutter/flutter/pull/32404) 在範本的 gitignore 中註解掉 .vscode/（cla: yes, tool）

[32406](https://github.com/flutter/flutter/pull/32406) 修正 macos_build_flutter_assets.sh 中的賦值（cla: yes）

[32408](https://github.com/flutter/flutter/pull/32408) 更多 const 轉換（cla: yes, framework）

[32410](https://github.com/flutter/flutter/pull/32410) 為 Driver 新增 ancestor 與 descendant finders（cla: yes, framework, waiting for tree to go green）

[32425](https://github.com/flutter/flutter/pull/32425) 修正 layer.find⟦L1295⟧(Offset) 的基準測試回歸（cla: yes）

[32434](https://github.com/flutter/flutter/pull/32434) 支援替換 TabController，並釋放舊的（cla: yes, f: material design, framework）

[32437](https://github.com/flutter/flutter/pull/32437) 新增 assert，確保 root widget 已附加（a: tests, cla: yes, framework）

[32444](https://github.com/flutter/flutter/pull/32444) 更新部分連結（cla: yes, framework, tool）

[32469](https://github.com/flutter/flutter/pull/32469) 讓 CupertinoNavigationBarBackButton 可自訂 onPressed（cla: yes, f: cupertino, framework）

[32470]
