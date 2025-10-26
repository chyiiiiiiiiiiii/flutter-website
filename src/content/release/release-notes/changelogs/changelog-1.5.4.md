---
title: Flutter 1.5.4 變更記錄
shortTitle: 1.5.4 變更記錄
description: Flutter 1.5.4 版本的變更記錄，包含本次發佈合併的所有 PR 清單。
---

## 本次 flutter/flutter 版本關閉的 PR

從 2019 年 2 月 21 日（週四）20:22:00 -0800 到 2019 年 5 月 1 日（週三）16:56:00 -0700

[21834](https://github.com/flutter/flutter/pull/21834)  在 App Bar 新增 shapeBorder 選項（cla: yes, f: material design, framework）

[21896](https://github.com/flutter/flutter/pull/21896) Bottom sheet 捲動（a: animation, cla: yes, f: material design, f: routes, framework）

[22762](https://github.com/flutter/flutter/pull/22762) 新增對滾輪的支援（cla: yes, f: gestures, framework）

[22810](https://github.com/flutter/flutter/pull/22810) 在 PR 上建置 gallery（cla: yes, team）

[24476](https://github.com/flutter/flutter/pull/24476) 修正文字選取控制點顯示於可見文字區域外的問題（a: text input, cla: yes, framework）

[25164](https://github.com/flutter/flutter/pull/25164) 平移與縮放 gallery 範例（cla: yes, team, team: gallery）

[25202](https://github.com/flutter/flutter/pull/25202) 修復 #19175 測試中應如何使用 addTime？（a: tests, cla: yes, framework, team: gallery, waiting for tree to go green）

[26438](https://github.com/flutter/flutter/pull/26438) 將 moveBy 呼叫從 drag 和 dragFrom 拆分為兩個獨立呼叫，並將 DragStartBehavior 的預設行為改為 DragStartBehavior.start（cla: yes, f: gestures, framework, severe: API break）

[26785](https://github.com/flutter/flutter/pull/26785) 文件說明 SearchDelegate.buildResults 可被多次呼叫…（cla: yes, d: api docs, f: material design, framework, team: flakes, team: gallery）

[27034](https://github.com/flutter/flutter/pull/27034) 更新套件範本的 .gitignore 檔案（cla: yes, tool）

[27205](https://github.com/flutter/flutter/pull/27205) 修正 TextField 高度問題（a: text input, cla: no, framework）

[27217](https://github.com/flutter/flutter/pull/27217) 修正 Shrine overscroll 發光指示器（cla: yes, f: material design, framework, team, team: gallery）

[27435](https://github.com/flutter/flutter/pull/27435) 新增可在任意顏色與停駐點數量間進行 LinearGradients 插值（cla: yes, framework, waiting for tree to go green）

[27572](https://github.com/flutter/flutter/pull/27572) 從 Gradle 腳本中移除 flutter_shared 資源目錄（cla: yes, tool）

[27612](https://github.com/flutter/flutter/pull/27612) 強制 TextFields 使用 strut 時的行高（a: text input, a: typography, cla: yes, f: cupertino, f: material design, framework, severe: API break）

[27660](https://github.com/flutter/flutter/pull/27660) Shader 預熱（cla: yes, framework, severe: performance）

[27711](https://github.com/flutter/flutter/pull/27711) 讓 extended FAB 的 icon 為可選（a: fidelity, cla: yes, f: material design, framework）

[27712](https://github.com/flutter/flutter/pull/27712) add2app 測試（a: existing-apps, a: tests, cla: yes, engine, waiting for tree to go green）

[27749](https://github.com/flutter/flutter/pull/27749) 將 flutter_tools 從 script 切換為 app-jit snapshot（cla: yes, tool）

[27751](https://github.com/flutter/flutter/pull/27751) 為 FlatButton #21136 新增範例程式碼（cla: yes, d: api docs, f: material design, framework）

[27811](https://github.com/flutter/flutter/pull/27811) 設定 literal 轉換（cla: yes, framework, team）

[27898](https://github.com/flutter/flutter/pull/27898) 為 debugDeterministicCursor 新增輕微說明（a: text input, cla: yes, framework, waiting for tree to go green）

[27903](https://github.com/flutter/flutter/pull/27903) 懶下載資源 (III)：西斯大復仇（cla: yes, tool）

[27904](https://github.com/flutter/flutter/pull/27904) 將 PointerEvent 的 toString 轉為 Diagnosticable（a: debugging, cla: yes, f: gestures, framework）

[27944](https://github.com/flutter/flutter/pull/27944) 新增測試（a: tests, cla: yes, tool）

[27971](https://github.com/flutter/flutter/pull/27971) 在 Cirrus 上執行非效能敏感測試（a: tests, cla: yes, framework, team）

[28001](https://github.com/flutter/flutter/pull/28001) CupertinoTextField：新增變更 placeholder 顏色的能力（a: text input, cla: yes, f: cupertino, framework, waiting for tree to go green）

[28004](https://github.com/flutter/flutter/pull/28004) 在 CircularProgressIndicator 中繪製 backgroundColor（cla: yes, f: material design, framework）

[28013](https://github.com/flutter/flutter/pull/28013) [Material] 為 Slider 因過密跳過 tick mark 新增單元測試（cla: yes, f: material design, framework）

[28017](https://github.com/flutter/flutter/pull/28017) 為 BackdropFilter 新增更多文件（cla: yes, d: api docs, framework）

[28097](https://github.com/flutter/flutter/pull/28097) 允許 gradle 下載遺失的 SDK 資源（cla: yes, t: gradle, tool）

[28125](https://github.com/flutter/flutter/pull/28125) [Gallery] Fortnightly demo 從 flutter/samples 移動過來。（cla: yes, team, team: gallery）

[28152](https://github.com/flutter/flutter/pull/28152) 提升熱重載效能（cla: yes, t: hot reload, tool）

[28157](https://github.com/flutter/flutter/pull/28157) 在 future 前加上 await 以符合 analyzer（cla: yes, framework, team）

[28159](https://github.com/flutter/flutter/pull/28159) [Material] 擴展 BottomNavigationBar API（再版）（cla: no, f: material design, framework）

[28163](https://github.com/flutter/flutter/pull/28163) [Material] 為 chips 及 chip themes 新增設定陰影顏色與選取陰影顏色的能力（cla: yes, f: material design, framework）

[28166](https://github.com/flutter/flutter/pull/28166) 為 CupertinoPicker 新增更多文件（cla: yes, d: api docs, f: cupertino, framework）

[28168](https://github.com/flutter/flutter/pull/28168) [flutter_tool,fuchsia_tester] 僅在 coverage 需要時要求 test source 資料夾（a: tests, cla: yes, tool, ○ platform-fuchsia）

[28169](https://github.com/flutter/flutter/pull/28169) 為 FocusScope 新增/重寫測試（a: text input, cla: yes, framework）

[28171](https://github.com/flutter/flutter/pull/28171) 部署至 .dev firebase 專案（cla: yes, team）

[28172](https://github.com/flutter/flutter/pull/28172) 為 TextStyle 新增 backgroundColor 參數以便使用（cla: yes, framework）

[28174](https://github.com/flutter/flutter/pull/28174) BackdropFilter 的 cull rect 不再縮小（cla: yes, framework, severe: API break, waiting for tree to go green）

[28175](https://github.com/flutter/flutter/pull/28175) 僅在 Lollipop 以上版本呼叫 Activity.reportFullyDrawn（cla: yes, team, team: gallery）

[28193](https://github.com/flutter/flutter/pull/28193) 清理 flutter_gallery.cmx 的 sandbox（cla: yes, team, team: gallery）

[28214](https://github.com/flutter/flutter/pull/28214) [Material] 支援 trailing app bar actions 可獨立於 leading 設定主題（cla: yes, f: material design, framework）

[28215](https://github.com/flutter/flutter/pull/28215) 根據內部回饋對 Cards 範例進行小幅 UI 微調（cla: yes, team, team: gallery）

[28242](https://github.com/flutter/flutter/pull/28242) 為文字欄位新增長按移動支援 2（a: text input, cla: yes, f: cupertino, f: gestures, f: material design, framework, severe: API break）

[28245](https://github.com/flutter/flutter/pull/28245) [Typo] 將 'use' 改為 'user'（cla: yes, d: api docs, f: material design, framework）

[28264](https://github.com/flutter/flutter/pull/28264) 修正 create 指令 --sample 選項的 valueHelp 長度，並開啟自動換行（cla: yes, d: examples, tool）

[28280](https://github.com/flutter/flutter/pull/28280) [fuchsia] 修正 find 與 ls 的路徑（cla: yes, tool, ○ platform-fuchsia）

[28281](https://github.com/flutter/flutter/pull/28281) 將記憶體效能基準測試外層迴圈減少為 10（cla: yes, team）

[28290](https://github.com/flutter/flutter/pull/28290) 透過滑鼠進行文字選取（a: text input, cla: yes, f: gestures, framework）

[28291](https://github.com/flutter/flutter/pull/28291) 重新合併 #27754，因 bsdiff 已移至 flutter/packages（cla: yes, team）

[28295](https://github.com/flutter/flutter/pull/28295) 還原「允許 gradle 下載遺失的 SDK 資源」（cla: yes, tool, ▣ platform-android）

[28296](https://github.com/flutter/flutter/pull/28296) 將 engine 升級至 5db4b377244bae48bc21e449e616417e68c9a6b9（cla: yes）

[28297](https://github.com/flutter/flutter/pull/28297) Test reporter（a: tests, cla: yes, team, waiting for tree to go green）

[28302](https://github.com/flutter/flutter/pull/28302) 新增基本 web 裝置與執行支援（cla: yes, tool）

[28308](https://github.com/flutter/flutter/pull/28308) 將 engine 升級至 043d92c48abdebdad926569bc204a59c5cf20a11（cla: yes）

[28309](https://github.com/flutter/flutter/pull/28309) 將 engine 升級至 cb0f7ece1f251c78a07550db89d0fcb3edf61e3c（cla: yes）

[28315](https://github.com/flutter/flutter/pull/28315) 將 engine 升級至 33bb91cc15916610261097eb971ec8a11b804d06（cla: yes）

[28334](https://github.com/flutter/flutter/pull/28334) 移除 gen_snapshot 的未使用 --packages 參數（cla: yes, team, tool）

[28341](https://github.com/flutter/flutter/pull/28341) 在 daemon protocol 中使用 deviceManager discovery（cla: yes, tool）

[28343](https://github.com/flutter/flutter/pull/28343) 傳遞 --skip-build-script-checks 並移除 module 使用（cla: yes, team）

[28346](https://github.com/flutter/flutter/pull/28346) [flutter_tool,fuchsia] 為 flutter_tool 新增遺失的相依（cla: yes, team, tool）

[28349](https://github.com/flutter/flutter/pull/28349) 支援原生程式庫的動態修補（cla: yes, t: gradle, tool, ▣ platform-android）

[28352](https://github.com/flutter/flutter/pull/28352) 僅在有多個 root 時執行 multi-root mapping（cla: yes, tool）

[28355](https://github.com/flutter/flutter/pull/28355) 重新合併「允許 gradle 下載遺失的 SDK 資源」(#28097)（cla: yes, t: gradle, tool, waiting for tree to go green, ▣ platform-android）

[28356](https://github.com/flutter/flutter/pull/28356) 在 Windows 上失敗時記錄 pub 回傳碼（cla: yes, tool, ❖ platform-windows）

[28369](https://github.com/flutter/flutter/pull/28369) 在 presubmit 檢查中新增 LICENSE 測試（cla: yes, team）

[28370](https://github.com/flutter/flutter/pull/28370) 移除 CI 設定檔結尾的多餘空白（cla: yes, team）

[28371](https://github.com/flutter/flutter/pull/28371) 確保 DropdownButton 的選單遵守父層邊界（cla: yes, f: material design, framework）

[28372](https://github.com/flutter/flutter/pull/28372) V1.2.1 hotfix.1 --- cherry-pick（cla: yes, team）

[28373](https://github.com/flutter/flutter/pull/28373) 標記非 flaky 測試（a: tests, cla: yes, team）

[28376](https://github.com/flutter/flutter/pull/28376) 還原「Shader 預熱 (#27660)」（cla: yes, team, team: flakes）

[28386](https://github.com/flutter/flutter/pull/28386) 移除個人 repo 並以簡單範例取代以供 smoke test（cla: yes, tool）

[28398](https://github.com/flutter/flutter/pull/28398) 修正 analysis 的紅燈建置（a: typography, cla: yes, framework）

[28400](https://github.com/flutter/flutter/pull/28400) 更新套件（cla: yes, team）

[28431](https://github.com/flutter/flutter/pull/28431) [Gallery] 修正 fortnightly const 分析（cla: yes, team, team: gallery）

[28470](https://github.com/flutter/flutter/pull/28470) 當 Hero 有 Hero 子元件時拋出 assertion error（cla: yes, framework, waiting for tree to go green）

[28472](https://github.com/flutter/flutter/pull/28472) 為已發佈的 metadata 新增 SHA256 校驗碼（cla: yes, team）

[28477](https://github.com/flutter/flutter/pull/28477) 修正 AnsiStatus 的 backspace 與清除長度（cla: yes, tool）

[28478](https://github.com/flutter/flutter/pull/28478) 支援 iOS 裝置回報壓力數值為 0（cla: yes, f: cupertino, f: gestures, f: material design, ⚠ TODAY）

[28480](https://github.com/flutter/flutter/pull/28480) 增加 timeout（a: tests, cla: yes, team, team: flakes）

[28482](https://github.com/flutter/flutter/pull/28482) Fuschia -> Fuchsia（cla: yes, team）

[28517](https://github.com/flutter/flutter/pull/28517) 再次移除 json_schema 相依（cla: yes）

[28527](https://github.com/flutter/flutter/pull/28527) 更嚴格地尋找與修訂版關聯的版本號（cla: yes, team）

[28530](https://github.com/flutter/flutter/pull/28530) 修正 timelineEvents 指派的型別問題（cla: yes）

[28537](https://github.com/flutter/flutter/pull/28537) 重新合併「Shader 預熱 (#27660)」（cla: yes, framework, severe: performance）

[28540](https://github.com/flutter/flutter/pull/28540) 新增動畫曲線 slowMiddle（a: animation, cla: yes, framework, severe: new feature）

[28546](https://github.com/flutter/flutter/pull/28546) 當 down pointer 被取消時呼叫 onTapCancel（cla: yes, f: gestures, framework）

[28555](https://github.com/flutter/flutter/pull/28555) 停用 dart2js 測試（a: tests, cla: yes, team）

[28558](https://github.com/flutter/flutter/pull/28558) 修正錯字（a: text input, cla: yes, d: api docs, f: material design）

[28597](https://github.com/flutter/flutter/pull/28597) 調整剩餘 Cupertino 路由動畫以符合原生（a: fidelity, cla: yes, f: cupertino, f: routes, waiting for tree to go green）

[28598](https://github.com/flutter/flutter/pull/28598) TextField API 文件範例（cla: yes）

[28602](https://github.com/flutter/flutter/pull/28602) 允許從任意 PointerEvent 建立 PointerEnterEvent 與 PointerExitEvents（a: desktop, cla: yes, f: gestures, framework, severe: API break）

[28603](https://github.com/flutter/flutter/pull/28603) 在 FlutterDevice 初始化時選擇 ResidentCompiler（cla: yes, tool）

[28604](https://github.com/flutter/flutter/pull/28604) 為 TextEditingController 文件新增警告與範例（a: text input, cla: yes, d: api docs, framework）

[28607](https://github.com/flutter/flutter/pull/28607) 將 engine 升級至 3e4e6f5c54db7a705e6d50f7f3bddfa2ac0d6612（cla: yes）

[28608](https://github.com/flutter/flutter/pull/28608) 將 engine 升級至 4434a39c7d545ed47186b2f4d98cd09c8366e720（cla: yes）

[28614](https://github.com/flutter/flutter/pull/28614) 在 shader 預熱中新增凸路徑與非 AA 繪製（cla: yes, framework, p: firebase_performance）

[28619](https://github.com/flutter/flutter/pull/28619) 更新 gallery 的明亮與暗色主題（cla: yes, team,
