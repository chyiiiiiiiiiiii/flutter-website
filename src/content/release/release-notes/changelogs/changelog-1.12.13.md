---
title: Flutter 1.12.13 變更記錄
shortTitle: 1.12.13 變更記錄
description: Flutter 1.12.13 變更記錄，包含此版本合併的所有 PR 清單。
---

## 本次 flutter/flutter 版本關閉的 PR

從 2019 年 8 月 19 日（日）17:37:00（-0700）到 2019 年 11 月 25 日（一）12:05:00（-0800）

[34188](https://github.com/flutter/flutter/pull/34188) 使用獨立的 isolate 進行圖片載入。（a: images, a: tests, cla: yes, framework）

[35100](https://github.com/flutter/flutter/pull/35100) 新增平台傳送 'TextInput.clearClient' 訊息至 framework 的處理（#35054）。（a: text input, cla: yes, framework）

[35516](https://github.com/flutter/flutter/pull/35516) 更多 UI-as-code（cla: yes, team）

[36864](https://github.com/flutter/flutter/pull/36864) 清理 bots 輸出並移除逾時設定（cla: yes, team, waiting for tree to go green）

[36871](https://github.com/flutter/flutter/pull/36871) 審查 defaultTargetPlatform 的使用（cla: yes, f: cupertino, f: material design, framework, waiting for tree to go green）

[36998](https://github.com/flutter/flutter/pull/36998) 在 DropdownButtonFormField 新增屬性以對齊 DropdownButton（cla: yes, f: material design, framework）

[37024](https://github.com/flutter/flutter/pull/37024) 使用 SliverLayoutBuilder 實作 PageView，棄用 RenderSliverFillViewport（cla: yes, f: gestures, f: scrolling, framework, severe: API break, waiting for tree to go green）

[37268](https://github.com/flutter/flutter/pull/37268) 執行網頁測試分批；啟用 foundation 測試（cla: yes, ☸ platform-web）

[37416](https://github.com/flutter/flutter/pull/37416) 新增 MediaQuery.systemGestureInsets 以支援 Android Q（cla: yes, customer: crowd, framework, severe: new feature, ▣ platform-android）

[37508](https://github.com/flutter/flutter/pull/37508) 使用 assemble 建構 bundle（cla: yes, tool）

[37526](https://github.com/flutter/flutter/pull/37526) gradle 更新過程中捕捉錯誤（cla: yes, tool）

[37544](https://github.com/flutter/flutter/pull/37544) 以 ButtonBarTheme 取代 ButtonBar.bar 方法（cla: yes, d: examples, f: material design, framework, severe: API break, team, team: gallery）

[37642](https://github.com/flutter/flutter/pull/37642) build.dart::GenSnapshot 的單元測試（cla: yes, tool）

[37645](https://github.com/flutter/flutter/pull/37645) 更新 CONTRIBUTING.md（cla: yes, team）

[37646](https://github.com/flutter/flutter/pull/37646) 在測試中紀錄未完成的計時器（a: tests, cla: yes, framework）

[37719](https://github.com/flutter/flutter/pull/37719) CupertinoDynamicColor 及相關功能（cla: yes, f: cupertino, f: material design, framework）

[37739](https://github.com/flutter/flutter/pull/37739) 修正 AnimationStatus 在 repeat(reverse: true) 與 animateWith 的行為（a: animation, cla: yes, framework, severe: API break）

[37819](https://github.com/flutter/flutter/pull/37819) 新增 HtmlElementView（Flutter Web 平台視圖）（cla: yes, framework, ☸ platform-web）

[37832](https://github.com/flutter/flutter/pull/37832) 為 devicelab runner 新增 --exit 與 --match-host-platform 預設值（cla: yes, team, tool）

[37845](https://github.com/flutter/flutter/pull/37845) 將錯誤訊息輸出至 stderr（CQ+1, cla: yes, tool）

[37896](https://github.com/flutter/flutter/pull/37896) MouseRegion 新增透明度控制。Layer 新增 findAnnotations 方法。（a: desktop, cla: yes, framework, severe: API break）

[37901](https://github.com/flutter/flutter/pull/37901) [macOS] 在建立邏輯鍵前檢查特殊鍵（a: desktop, cla: yes, framework, ⌘‬ platform-mac）

[37962](https://github.com/flutter/flutter/pull/37962) 顯示搜尋 app bar 主題（cla: yes, f: material design, framework）

[38317](https://github.com/flutter/flutter/pull/38317) TweenAnimationBuilder：自訂動畫建構器，無需管理 AnimationController（a: animation, cla: yes, framework）

[38464](https://github.com/flutter/flutter/pull/38464) 將預設 BinaryMessenger 實例移至 ServicesBinding（a: accessibility, a: tests, cla: yes, f: cupertino, f: material design, framework, team）

[38481](https://github.com/flutter/flutter/pull/38481) Timer picker 精度修正（cla: yes, f: cupertino, framework, severe: API break, will affect goldens）

[38560](https://github.com/flutter/flutter/pull/38560) 重構 cocoapods validator 以偵測損壞的安裝（cla: yes, tool）

[38568](https://github.com/flutter/flutter/pull/38568) clipBehavior 斷言檢查標準化（CQ+1, cla: yes, f: material design, framework, severe: API break）

[38573](https://github.com/flutter/flutter/pull/38573) 限制 scrollOffset，防止 textfield 彈跳（a: text input, cla: yes, framework）

[38576](https://github.com/flutter/flutter/pull/38576) flutter_tools/version：git log.showSignature=false（cla: yes, tool）

[38583](https://github.com/flutter/flutter/pull/38583) 新增 InheritedTheme（cla: yes, f: material design, framework）

[38632](https://github.com/flutter/flutter/pull/38632) Flutter Plugin Tool 支援多平台 plugin 設定（cla: yes, tool）

[38643](https://github.com/flutter/flutter/pull/38643) PlatformViewLink 處理焦點（a: platform-views, cla: yes, framework）

[38650](https://github.com/flutter/flutter/pull/38650) 支援 Persistent 與 Modal bottom sheets 獨立主題化（cla: yes, f: material design, framework）

[38654](https://github.com/flutter/flutter/pull/38654) [flutter_tool] 移除部分非同步檔案 IO（cla: yes, tool）

[38699](https://github.com/flutter/flutter/pull/38699) 修正 widgetspan 在 text widget 使用 ellipsis 時無效的問題（cla: yes, framework）

[38709](https://github.com/flutter/flutter/pull/38709) [Material] SwitchListTile 新增 contentPadding 屬性（cla: yes, f: material design, framework）

[38712](https://github.com/flutter/flutter/pull/38712) iOS 安裝失敗時顯示處理錯誤（cla: yes, tool）

[38723](https://github.com/flutter/flutter/pull/38723) 處理網頁應用程式編譯失敗（cla: yes, tool, ☸ platform-web）

[38724](https://github.com/flutter/flutter/pull/38724) 從範本 Copy Bundle Resources build phases 移除 xcconfigs（cla: yes, d: examples, t: xcode, team, team: gallery, tool, ⌺‬ platform-ios）

[38726](https://github.com/flutter/flutter/pull/38726) 讓停用的按鈕/chip/文字欄位無法取得焦點（CQ+1, cla: yes, f: material design, framework）

[38748](https://github.com/flutter/flutter/pull/38748) 正確建立 macOS 的 framework 結構（cla: yes, tool）

[38789](https://github.com/flutter/flutter/pull/38789) 修正 DragTarget 當被拒絕的 Draggable 進入時未重建的問題 #38786（cla: yes, framework）

[38813](https://github.com/flutter/flutter/pull/38813) ToggleButtons 新增 textStyle 屬性（cla: yes, f: material design, framework）

[38814](https://github.com/flutter/flutter/pull/38814) 新增 iOS backdrop filter 基準測試（cla: yes, severe: performance, team）

[38815](https://github.com/flutter/flutter/pull/38815) 還原「新增可組合的 waitForCondition Driver/extension API (#37…」（a: tests, cla: yes, framework）

[38821](https://github.com/flutter/flutter/pull/38821) 快取 caret 參數（a: text input, cla: yes, framework, severe: performance）

[38823](https://github.com/flutter/flutter/pull/38823) 連接網頁應用程式時列印服務 URL（cla: yes, tool, ☸ platform-web）

[38831](https://github.com/flutter/flutter/pull/38831) [Material] bottom sheet 及其主題新增 clip 屬性（cla: yes, f: material design, framework）

[38833](https://github.com/flutter/flutter/pull/38833) 在 CoC 中更明確連結至 xkcd（cla: yes）

[38836](https://github.com/flutter/flutter/pull/38836) 新增可組合的 waitForCondition Driver/extension API（a: tests, cla: yes, framework）

[38840](https://github.com/flutter/flutter/pull/38840) 修正 onReportTiming 至 frameTiming 的分析器問題（a: tests, cla: yes, framework）

[38858](https://github.com/flutter/flutter/pull/38858) Windows 與 Linux 使用 GLFW-name 產物（cla: yes, tool）

[38861](https://github.com/flutter/flutter/pull/38861) 以 frameTimings 取代已棄用的 onReportTimings（cla: yes, framework, severe: performance）

[38866](https://github.com/flutter/flutter/pull/38866) 還原「FocusManager 自動焦點高亮模式 (#37825)」（cla: yes, f: material design, framework）

[38869](https://github.com/flutter/flutter/pull/38869) 依建構組態儲存檔案雜湊值（cla: yes, tool）

[38894](https://github.com/flutter/flutter/pull/38894) [flutter_tool] 將 http request close 移至 try-catch（cla: yes, tool）

[38895](https://github.com/flutter/flutter/pull/38895) [Shrine] 為文字欄位新增外框（cla: yes, d: examples, team, team: gallery）

[38898](https://github.com/flutter/flutter/pull/38898) ToggleButtons 測試改進（cla: yes, f: material design, framework）

[38905](https://github.com/flutter/flutter/pull/38905) 在 Profile 與 Release 模式下，從 SUPPORTED_PLATFORMS 移除 iphonesimulator（cla: yes, t: xcode, tool, ⌺‬ platform-ios）

[38907](https://github.com/flutter/flutter/pull/38907) 當 hot reload 進入錯誤狀態時丟出錯誤（cla: yes, tool）

[38909](https://github.com/flutter/flutter/pull/38909) 支援 macOS release/profile 模式（3/3）（cla: yes, tool, ⌘‬ platform-mac）

[38916](https://github.com/flutter/engine/pull/8507) 更新 BUILD.gn 以支援 package:flutter_test（a: tests, cla: yes, framework）

[38920](https://github.com/flutter/engine/pull/9386) [flutter_tool] 處理 doctor validators 的崩潰（cla: yes, tool）

[38922](https://github.com/flutter/engine/pull/9498) 改善 text 文件（ready to land）（cla: yes, framework, waiting for tree to go green）

[38925](https://github.com/flutter/engine/pull/9806) [flutter_tool] 每次執行只發送一份崩潰報告（cla: yes, tool）

[38930](https://github.com/flutter/engine/pull/9864) 實作系統字體 system channel 監聽器（cla: yes, framework）

[38932](https://github.com/flutter/engine/pull/9888) 非 debug 桌面建構時新增建構警告（cla: yes, tool）

[38936](https://github.com/flutter/engine/pull/10154) 修正 KeySet⟦L1911⟧（及 LogicalKeySet）hashCode 計算（cla: yes, framework）

[38979](https://github.com/flutter/engine/pull/10182) 為隱式動畫元件新增 onEnd callback（a: animation, cla: yes, framework, waiting for tree to go green）

[38992](https://github.com/flutter/engine/pull/10326) flutter clean 時清理 Xcode workspace（cla: yes, tool）

[38999](https://github.com/flutter/engine/pull/10670) 標記 smoke_catalina_start_up 為非 flaky（CQ+1, cla: yes, team）

[39000](https://github.com/flutter/engine/pull/10814) 呼叫 assemble 時不再丟出 StateError（CQ+1, cla: yes, tool）

[39005](https://github.com/flutter/engine/pull/10945) [flutter_tool] crash reporter 支援 HttpException（cla: yes, tool）

[39006](https://github.com/flutter/engine/pull/11031) 預設驗證器新增 web workflow（cla: yes, tool）

[39013](https://github.com/flutter/engine/pull/11035) 更新套件版本至最新版（cla: yes, tool）

[39017](https://github.com/flutter/engine/pull/11041) 新增 "OneSequenceRecognizer.resolvePointer"。修正 DragGestureRecognizer 多指崩潰（a: desktop, cla: yes, f: gestures, framework）

[39052](https://github.com/flutter/engine/pull/11049) 讓 forward calls 以互動模式執行（cla: yes, tool）

[39056](https://github.com/flutter/engine/pull/11062) 修正 Background Color 問題 #34741（cla: yes, f: cupertino, framework）

[39059](https://github.com/flutter/engine/pull/11063) 說明 MediaQuery 測試檔案中的 const 值（cla: yes, framework）

[39066](https://github.com/flutter/engine/pull/11064) 瀏覽器斷線時終止 resident runner（cla: yes, tool, ☸ platform-web）

[39072](https://github.com/flutter/engine/pull/11070) 解除 tools/lib/src 與 lib/src/commands/ 的依賴（cla: yes, tool）

[39073](https://github.com/flutter/plugins/pull/1370) 為 Flutter Web 應用新增 profile 模式（cla: yes, tool, ☸ platform-web）

[39079](https://github.com/flutter/plugins/pull/1702) 修正 widget 在 warm up frame 被建立兩次的問題（cla: yes, f: scrolling, framework, severe: API break, waiting for tree to go green）

[39080](https://github.com/flutter/plugins/pull/1767) 修正 plugin 範本 app 的測試（cla: yes, team, tool）

[39082](https://github.com/flutter/plugins/pull/1784) Golden Doc 更新（a: tests, cla: yes, d: api docs, d: examples, framework, waiting for tree to go green）

[39085](https://github.com/flutter/plugins/pull/1813) inspector details 子樹深度可設定（cla: yes, framework）

[39088](https://github.com/flutter/plugins/pull/1866) SliverFillRemaining 文件改進（cla: yes, d: api docs, d: examples, framework, waiting for tree to go green）

[39089](https://github.com/flutter/plugins/pull/1933) 修正 InheritedTheme.captureAll() 多個相同類型主題祖先的情況（cla: yes, framework）

[39124](https://github.com/flutter/plugins/pull/1953) image_list 範例改用 https（a: images, cla: yes, d: examples, framework, team）

[39126](https://github.com/flutter/plugins/pull/1984) Gradle 3.5 支援 app bundle（cla: yes, tool）

[39136](https://github.com/flutter/plugins/pull/1985) [flutter_tool] 'version' 增加額外輸入驗證（cla: yes, tool, waiting for tree to go green）

[39140](https://github.com/flutter/plugins/pull/1990) 指令移至各自 shard（cla: yes, tool）

[39142](https://github.com/flutter/plugins/pull/1993) 修正 sliverfixedextent 與 sliverchildbuilderdelegate 不正確問題（cla: yes, f: scrolling, framework）

[39144](https://github.com/flutter/plugins/pull/1996) TextFormField 新增 textAlignVertical 參數（cla: yes, f: material design, framework）

[39145](https://github.com/flutter/plugins/pull/1998) Gradle wrapper 目錄補齊缺失檔案（cla: yes, t: gradle, tool）

[39147](https://github.com/flutter/plugins/pull/1999) 降級 AndroidX 警告（cla: yes, tool）

[39150]⟦L98⟧ 提及 conduct@flutter.dev（cla: yes, waiting for tree to go green）

[39156]⟦L99⟧ Scaffold 新增 extendBodyBehindAppBar（cla: yes, f: material design, framework）

[39157]⟦L100⟧ Gradle 使用新 Maven 產物（cla: yes, t: gradle, tool）

[39160]⟦L101⟧ 還原「將錯誤訊息輸出至 stderr」（cla: yes, waiting for tree to go green）

[39189]⟦L102⟧ 修正 flutter web 的 source map 載入與 service protocol（cla: yes, tool）

[39195]⟦L103⟧ 支援 reversed scroll views（cla: yes, framework）

[39196]⟦L104⟧ Driver 新增等待無待處理平台訊息條件（a: tests, cla: yes, framework）

[39198]⟦L105⟧ 文件（a: tests, cla: yes, f: material design, framework）

[39214]⟦L106⟧ terminalUi flag 移至 terminal 介面（cla: yes, tool）

[39215]⟦L107⟧ CupertinoActionSheet dark

