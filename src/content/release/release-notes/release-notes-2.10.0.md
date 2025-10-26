---
title: Flutter 2.10.0 發行說明
shortTitle: 2.10.0 發行說明
description: Flutter 2.10.0 的發行說明。
---

本頁為 2.10.0 版本的發行說明。  
關於後續的錯誤修正版本，請參閱我們的 [CHANGELOG][CHANGELOG]  

[CHANGELOG]: https://github.com/flutter/flutter/blob/master/CHANGELOG.md

## 依標籤分類的合併 PR 一覽（`flutter/flutter`）




#### waiting for tree to go green - 526 個 Pull Request

[72919](https://github.com/flutter/flutter/pull/72919) 新增 CupertinoTabBar.height（嚴重：新功能、framework、cla: yes、f: cupertino、waiting for tree to go green）

[77103](https://github.com/flutter/flutter/pull/77103) [web] 允許在不使用條件式匯入的情況下使用 url strategies（cla: yes、f: routes、platform-web、waiting for tree to go green）

[83860](https://github.com/flutter/flutter/pull/83860) 在 ModalBarrier 新增 `onDismiss` callback。（framework、f: material design、cla: yes、waiting for tree to go green）

[87643](https://github.com/flutter/flutter/pull/87643) 更新 IconButton.iconSize，從主題取得值（framework、f: material design、cla: yes、waiting for tree to go green）

[88508](https://github.com/flutter/flutter/pull/88508) 修正同時用兩指拖曳 ReorderableListView 不會崩潰（framework、f: material design、cla: yes、waiting for tree to go green）

[89045](https://github.com/flutter/flutter/pull/89045) feat: 在 test 指令啟用 flavor 選項（tool、cla: yes、waiting for tree to go green）

[90178](https://github.com/flutter/flutter/pull/90178) 更新 scrollbar，支援即使未 hover 也能一直顯示軌道（framework、f: material design、cla: yes、waiting for tree to go green）

[90461](https://github.com/flutter/flutter/pull/90461) 修正 route transition duration 為零時的崩潰（framework、cla: yes、waiting for tree to go green）

[90608](https://github.com/flutter/flutter/pull/90608) RangeMaintainingScrollPhysics 移除 overscroll 維持行為於 grow 時（framework、f: scrolling、cla: yes、waiting for tree to go green）

[90684](https://github.com/flutter/flutter/pull/90684) 將文字編輯 `Action`s 移至 `EditableTextState`（team、framework、f: material design、cla: yes、f: cupertino、d: examples、waiting for tree to go green）

[90932](https://github.com/flutter/flutter/pull/90932) showBottomSheet 對外公開 enableDrag 屬性（framework、f: material design、cla: yes、waiting for tree to go green、will affect goldens）

[90936](https://github.com/flutter/flutter/pull/90936) 從 dartdoc 移除 font-weight 覆寫（team、cla: yes、waiting for tree to go green）

[91458](https://github.com/flutter/flutter/pull/91458) add-to-app 專案跳過 'generateLockfiles'（tool、cla: yes、waiting for tree to go green）

[91532](https://github.com/flutter/flutter/pull/91532) 當手勢被禁用時允許點擊穿透 scrollbar（framework、f: material design、f: scrolling、cla: yes、waiting for tree to go green）

[91590](https://github.com/flutter/flutter/pull/91590) build_aar 指令新增 --extra-gen-snapshot-options 支援（tool、cla: yes、waiting for tree to go green）

[91698](https://github.com/flutter/flutter/pull/91698) 修正文字游標或輸入可能超出文字欄位（a: text input、framework、cla: yes、waiting for tree to go green、will affect goldens）

[91959](https://github.com/flutter/flutter/pull/91959) Win32 範本：FileDescription 改用 {{projectName}} 取代 {{description}}（tool、cla: yes、waiting for tree to go green）

[91987](https://github.com/flutter/flutter/pull/91987) 在 TabController 新增 `animationDuration` 屬性（framework、f: material design、cla: yes、waiting for tree to go green）

[92031](https://github.com/flutter/flutter/pull/92031) 工具新增 warning log 等級與命令列選項，可在警告/錯誤時失敗（team、tool、cla: yes、waiting for tree to go green）

[92160](https://github.com/flutter/flutter/pull/92160) 在 `FlexibleSpaceBar` 新增 `expandedScale`（framework、f: material design、cla: yes、waiting for tree to go green）

[92172](https://github.com/flutter/flutter/pull/92172) [CupertinoActivityIndicator] 新增 `color` 參數（framework、f: material design、cla: yes、f: cupertino、waiting for tree to go green）

[92197](https://github.com/flutter/flutter/pull/92197) 重新上線移除 BottomNavigationBarItem.title 的棄用（framework、f: material design、cla: yes、f: cupertino、waiting for tree to go green）

[92297](https://github.com/flutter/flutter/pull/92297) 新增 widgets/AppModel（team、framework、f: material design、cla: yes、d: api docs、d: examples、waiting for tree to go green、documentation）

[92343](https://github.com/flutter/flutter/pull/92343) Transform.Scale 新增 scaleX 與 scaleY 參數（framework、cla: yes、waiting for tree to go green）

[92374](https://github.com/flutter/flutter/pull/92374) 移除 no-shuffle 標籤並修正 flutter_goldens_test.dart 記憶體洩漏（a: tests、team、framework、cla: yes、waiting for tree to go green）

[92440](https://github.com/flutter/flutter/pull/92440) 允許以程式控制 Draggable Sheet（framework、f: scrolling、cla: yes、waiting for tree to go green）

[92451](https://github.com/flutter/flutter/pull/92451) 當 Android SDK 版本需與 plugin 一致時新增警告（tool、cla: yes、waiting for tree to go green）

[92480](https://github.com/flutter/flutter/pull/92480) [Cupertino] 修正 `ContextMenuAction` 的暗色模式（a: text input、framework、cla: yes、f: cupertino、waiting for tree to go green）

[92535](https://github.com/flutter/flutter/pull/92535) 重新上線：「更新 benchmarks 資料夾中過時的 runners (#91126)」（team、tool、cla: yes、waiting for tree to go green、integration_test）

[92615](https://github.com/flutter/flutter/pull/92615) 修正導向新路由時會破壞前一個 FocusNode 的問題（framework、cla: yes、waiting for tree to go green、f: focus）

[92630](https://github.com/flutter/flutter/pull/92630) 遷移至 `process` 4.2.4（a: tests、team、tool、framework、cla: yes、waiting for tree to go green）

[92657](https://github.com/flutter/flutter/pull/92657) 修正 scrollbar 崩潰錯誤（framework、f: scrolling、cla: yes、waiting for tree to go green）

[92733](https://github.com/flutter/flutter/pull/92733) Flutter Gallery manifest 新增 exported 屬性（team、cla: yes、waiting for tree to go green、integration_test）

[92738](https://github.com/flutter/flutter/pull/92738) 模擬器遷移至 null safety（tool、cla: yes、waiting for tree to go green、a: null-safety、tech-debt）

[92753](https://github.com/flutter/flutter/pull/92753) [gen_l10n] 支援在 select 內新增 placeholder（tool、cla: yes、waiting for tree to go green）

[92758](https://github.com/flutter/flutter/pull/92758) 改善未初始化 channel 的錯誤訊息（framework、cla: yes、waiting for tree to go green）

[92808](https://github.com/flutter/flutter/pull/92808) feat: 將 test_data/compile_error_project.dart 遷移至 null safety（tool、cla: yes、waiting for tree to go green）

[92812](https://github.com/flutter/flutter/pull/92812) 將 integration.shard/vmservice_integration_test.dart 遷移至 null safety（tool、cla: yes、waiting for tree to go green、integration_test）

[92849](https://github.com/flutter/flutter/pull/92849) tracing 遷移至 null safety（tool、cla: yes、waiting for tree to go green、a: null-safety、tech-debt）

[92857](https://github.com/flutter/flutter/pull/92857) Engine 從 43561d8820e0 滾動至 8317c5eedb68（2 次修訂）（cla: yes、waiting for tree to go green）

[92860](https://github.com/flutter/flutter/pull/92860) Engine 從 8317c5eedb68 滾動至 98e3216ab470（1 次修訂）（cla: yes、waiting for tree to go green）

[92861](https://github.com/flutter/flutter/pull/92861) 移除 globals_null_migrated.dart，合併至 globals.dart（a: text input、tool、cla: yes、waiting for tree to go green、integration_test、a: null-safety）

[92866](https://github.com/flutter/flutter/pull/92866) Engine 從 98e3216ab470 滾動至 2ea889c9af5c（1 次修訂）（cla: yes、waiting for tree to go green）

[92868](https://github.com/flutter/flutter/pull/92868) Engine 從 2ea889c9af5c 滾動至 7797c76bb99c（1 次修訂）（cla: yes、waiting for tree to go green）

[92869](https://github.com/flutter/flutter/pull/92869) build_system targets 遷移至 null safety（tool、cla: yes、waiting for tree to go green、a: null-safety、tech-debt）

[92871](https://github.com/flutter/flutter/pull/92871) flutter_command 遷移至 null safety（tool、cla: yes、waiting for tree to go green、a: null-safety、tech-debt）

[92875](https://github.com/flutter/flutter/pull/92875) Engine 從 7797c76bb99c 滾動至 a4e700eb0c8b（2 次修訂）（cla: yes、waiting for tree to go green）

[92886](https://github.com/flutter/flutter/pull/92886) Engine 從 a4e700eb0c8b 滾動至 c674d2cbc6e0（4 次修訂）（cla: yes、waiting for tree to go green）

[92892](https://github.com/flutter/flutter/pull/92892) Engine 從 c674d2cbc6e0 滾動至 76b4caeafe75（1 次修訂）（cla: yes、waiting for tree to go green）

[92901](https://github.com/flutter/flutter/pull/92901) 嘗試執行或建置時，遇到已棄用的 v1 embedding 則直接退出（team、tool、a: accessibility、cla: yes、waiting for tree to go green、integration_test）

[92904](https://github.com/flutter/flutter/pull/92904) Engine 從 76b4caeafe75 滾動至 6095a1367846（3 次修訂）（cla: yes、waiting for tree to go green）

[92906](https://github.com/flutter/flutter/pull/92906) MediaQuery 新增 display features（a: tests、嚴重：新功能、framework、cla: yes、waiting for tree to go green、a: layout）

[92916](https://github.com/flutter/flutter/pull/92916) 標記 Mac_ios platform_view_ios__start_up 為穩定（cla: yes、waiting for tree to go green）

[92918](https://github.com/flutter/flutter/pull/92918) Engine 從 6095a1367846 滾動至 4dbdc0844425（1 次修訂）（cla: yes、waiting for tree to go green）

[92923](https://github.com/flutter/flutter/pull/92923) 更新 flutter localizations（f: material design、a: internationalization、cla: yes、f: cupertino、waiting for tree to go green）

[92924](https://github.com/flutter/flutter/pull/92924) 更新套件（team、tool、cla: yes、waiting for tree to go green）

[92930](https://github.com/flutter/flutter/pull/92930) [Material 3] Navigation Rail 新增可選指示器（framework、f: material design、cla: yes、waiting for tree to go green）

[92932](https://github.com/flutter/flutter/pull/92932) 文件指向 assets-for-api-docs 的 cupertino css 檔案（team、cla: yes、f: cupertino、d: api docs、waiting for tree to go green、documentation）

[92938](https://github.com/flutter/flutter/pull/92938) 原生 macOS 整合測試期間跳過 codesigning（team、cla: yes、waiting for tree to go green、integration_test）

[92940](https://github.com/flutter/flutter/pull/92940) TextField 邊框間隙 padding 改進（framework、f: material design、cla: yes、waiting for tree to go green、will affect goldens）

[92945](https://github.com/flutter/flutter/pull/92945) [TextInput] 切換輸入客戶端時，先傳送 `setEditingState` 再傳送 `show` 給 text input plugin（a: text input、framework、cla: yes、waiting for tree to go green）

[92946](https://github.com/flutter/flutter/pull/92946) macOS 建立範本新增 Help 選單（team、tool、cla: yes、waiting for tree to go green、integration_test）

[92948](https://github.com/flutter/flutter/pull/92948) 移除 globals_null_migrated.dart，合併至 globals.dart（tool、cla: yes、waiting for tree to go green）

[92950](https://github.com/flutter/flutter/pull/92950) channel、clean 及其他指令遷移至 null safety（tool、cla: yes、waiting for tree to go green）

[92952](https://github.com/flutter/flutter/pull/92952) doctor、format 及其他指令遷移至 null safety（tool、cla: yes、waiting for tree to go green、a: null-safety、tech-debt）

[92954](https://github.com/flutter/flutter/pull/92954) Plugins 從 e51cc1df7b75 滾動至 53fff22979d2（7 次修訂）（cla: yes、waiting for tree to go green）

[92955](https://github.com/flutter/flutter/pull/92955) custom_device 遷移至 null safety（tool、cla: yes、waiting for tree to go green、a: null-safety、tech-debt）

[92956](https://github.com/flutter/flutter/pull/92956) windows_device 遷移至 null safety（tool、cla: yes、waiting for tree to go green、a: null-safety、tech-debt）

[92957](https://github.com/flutter/flutter/pull/92957) 部分檔案遷移至 null safety（tool、cla: yes、waiting for tree to go green）

[92970](https://github.com/flutter/flutter/pull/92970) 重新上線「Refactor ThemeData (#91497)」(part 2)（framework、f: material design、cla: yes、waiting for tree to go green）

[92975](https://github.com/flutter/flutter/pull/92975) 確保 flutter_gen 專案於 "flutter create" 時正確建立（tool、cla: yes、waiting for tree to go green）

[92977](https://github.com/flutter/flutter/pull/92977) Engine 從 6095a1367846 滾動至 f08694a57857（15 次修訂）（cla: yes、waiting for tree to go green）

[92980](https://github.com/flutter/flutter/pull/92980) Engine 從 f08694a57857 滾動至 6ae304aeef1b（1 次修訂）（cla: yes、waiting for tree to go green）

[92984](https://github.com/flutter/flutter/pull/92984) Engine 從 6ae304aeef1b 滾動至 535f1c4c1c49（2 次修訂）（cla: yes、waiting for tree to go green）

[92989](https://github.com/flutter/flutter/pull/92989) 停止發送 metrics 至 builder name（team、cla: yes、waiting for tree to go green、team: benchmark）

[92996](https://github.com/flutter/flutter/pull/92996) Engine 從 535f1c4c1c49 滾動至 e9d92561b9a7（2 次修訂）（cla: yes、waiting for tree to go green）

[93004](https://github.com/flutter/flutter/pull/93004) Engine 從 e9d92561b9a7 滾動至 caf6d2997ddd（1 次修訂）（cla: yes、waiting for tree to go green）

[93005](https://github.com/flutter/flutter/pull/93005) Plugins 從 53fff22979d2 滾動至 2e102b8a8c41（1 次修訂）（cla: yes、waiting for tree to go green）

[93013](https://github.com/flutter/flutter/pull/93013) 標記 Linux web_canvaskit_tests_0 為穩定（team、cla: yes、team: flakes、waiting for tree to go green、tech-debt）

[93014](https://github.com/flutter/flutter/pull/93014) 標記 Linux web_canvaskit_tests_1 為穩定（team、cla: yes、team: flakes、waiting for tree to go green、tech-debt）

[93015](https://github.com/flutter/flutter/pull/93015) 標記 Linux web_canvaskit_tests_2 為穩定（team、cla: yes、team: flakes、waiting for tree to go green



