---
title: Flutter 1.2.2 變更日誌
shortTitle: 1.2.2 變更日誌
description: Flutter 1.2.2 版本的變更日誌，包含本次發行合併的所有 PR 列表。
---

## 本次 flutter/flutter 發行關閉的 PR

從 2018 年 11 月 29 日（五）19:41:00 -0800 至 2019 年 2 月 21 日（四）20:22:00 -0800

[21157](https://github.com/flutter/flutter/pull/21157) 交換 scope 與 gesture（cla: yes, f: scrolling, framework）

[22139](https://github.com/flutter/flutter/pull/22139) 將 INTERNET 權限移至 debug/AndroidManifest.xml（cla: yes, tool, ▣ platform-android）

[23118](https://github.com/flutter/flutter/pull/23118) 設定 ExpansionTile 中第一個 ListTile 的圖示顏色。修正 #23053（cla: yes, f: material design, framework）

[23188](https://github.com/flutter/flutter/pull/23188) 構建 Xcode 10 時檢查重複的 Flutter.framework 嵌入（cla: yes, tool, ⌺‬ platform-ios）

[23424](https://github.com/flutter/flutter/pull/23424) 教 DragGestureRecognizer 支援拖曳起始行為（a: text input, cla: yes, d: examples, f: cupertino, f: date/time picker, f: gestures, f: material design, f: scrolling, framework）

[23506](https://github.com/flutter/flutter/pull/23506) 在 gallery 中建立可編輯數值的 slider（cla: yes, f: material design, framework）

[23531](https://github.com/flutter/flutter/pull/23531) [O] 移除多個 timeout 設定。（a: tests, cla: yes, t: gradle, team, tool）

[23677](https://github.com/flutter/flutter/pull/23677) 為 FloatingActionButtonLocation 的變更新增動畫測試（cla: yes, f: material design, framework）

[23759](https://github.com/flutter/flutter/pull/23759) 新增 CupertinoTheme（cla: yes, f: cupertino, f: material design, framework, team: gallery）

[23782](https://github.com/flutter/flutter/pull/23782) 將 flutter_shared 資源加入 module artifact（a: assets, t: gradle, tool）

[23817](https://github.com/flutter/flutter/pull/23817) 修正專案目錄含空格導致編譯錯誤（a: existing-apps, cla: yes, tool, ▣ platform-android）

[23860](https://github.com/flutter/flutter/pull/23860) 當快取被清除或移除時清空 pendingImages（cla: yes, framework）

[23889](https://github.com/flutter/flutter/pull/23889) Flutter doctor 錯誤訊息查詢（cla: yes, t: flutter doctor, tool）

[23919](https://github.com/flutter/flutter/pull/23919) 允許偵測 TabBar 上的點擊（cla: yes, f: material design, framework）

[24156](https://github.com/flutter/flutter/pull/24156) [Material] Bottom app bar 主題（cla: yes, f: material design, framework）

[24169](https://github.com/flutter/flutter/pull/24169) [Material] 對話框支援主題化的 elevation（cla: yes, f: material design, framework）

[24209](https://github.com/flutter/flutter/pull/24209) 專案範本不再忽略 pubspec.lock（cla: yes, tool）

[24440](https://github.com/flutter/flutter/pull/24440) 新增 Android app bundle 支援 - Issue #17829（cla: no, t: gradle, tool, ▣ platform-android）

[24449](https://github.com/flutter/flutter/pull/24449) Text field 樣式合併（cla: yes, f: material design, framework）

[24457](https://github.com/flutter/flutter/pull/24457) 修訂 Material TextField 在 Android 與 iOS 上的手勢（a: text input, cla: yes, f: cupertino, f: material design, framework）

[24511](https://github.com/flutter/flutter/pull/24511) [H] 取消棄用 BigInteger 支援，並補充實際功能說明。（cla: yes, framework）

[24513](https://github.com/flutter/flutter/pull/24513) 為 `flutter test` 的運算式求值新增基本測試（a: debugging, a: tests, cla: yes, tool）

[24515](https://github.com/flutter/flutter/pull/24515) 新增基本 debug 單步測試（a: debugging, cla: yes, tool）

[24527](https://github.com/flutter/flutter/pull/24527) obscureText 與 enableInteractiveSelection 預設值（a: text input, cla: yes, framework）

[24537](https://github.com/flutter/flutter/pull/24537) 在 attach 指令中加入 ipv6 與 observatory port 支援（cla: yes, customer: dream (g3), tool）

[24551](https://github.com/flutter/flutter/pull/24551) 將 consumedScrollExtent 加入 SliverConstraints，由 Viewport 回報（cla: yes, f: scrolling, framework）

[24554](https://github.com/flutter/flutter/pull/24554) 新增 force press gesture detector 與 recognizer（cla: yes, f: gestures, framework）

[24580](https://github.com/flutter/flutter/pull/24580) 移除 Googlers 代碼簽章特殊處理（第二回）（cla: yes, tool, ⌺‬ platform-ios）

[24581](https://github.com/flutter/flutter/pull/24581) [OR] 清理 device lab 測試並移除 timeout（cla: yes, t: hot reload, tool）

[24587](https://github.com/flutter/flutter/pull/24587) 驗證 TextField 樣式（cla: yes, f: material design, framework）

[24632](https://github.com/flutter/flutter/pull/24632) 在 crash 報告中包含錯誤訊息（cla: yes, tool）

[24635](https://github.com/flutter/flutter/pull/24635) TextFormField 游標參數（a: text input, cla: yes, f: material design, framework）

[24643](https://github.com/flutter/flutter/pull/24643) [H] InputDecoration 小幅調整（主要為文件）（cla: yes, f: material design, framework）

[24669](https://github.com/flutter/flutter/pull/24669) 確保快取目錄與檔案有適當權限（cla: yes, tool）

[24728](https://github.com/flutter/flutter/pull/24728) [H] 支援設定停用 floating action button 的 elevation（cla: yes, f: material design, framework）

[24736](https://github.com/flutter/flutter/pull/24736) [H] 提供更多 FAB 位置選項（cla: yes, f: material design, framework）

[24744](https://github.com/flutter/flutter/pull/24744) app 不可見/可見時 drop/restore focus（a: text input, cla: yes, framework）

[24746](https://github.com/flutter/flutter/pull/24746) 更改 adb 所需版本，舊版會導致 hot reload 失效（cla: yes, tool, ▣ platform-android）

[24752](https://github.com/flutter/flutter/pull/24752) 以 switch 取代平台檢查（cla: yes, f: material design）

[24754](https://github.com/flutter/flutter/pull/24754) 以 switch 取代 Android 專用檢查（cla: yes, framework, team）

[24761](https://github.com/flutter/flutter/pull/24761) 新增 floating cursor 支援（a: text input, cla: yes, framework）

[24767](https://github.com/flutter/flutter/pull/24767) [H] 改善 ListTile 溢出時 leading 與 trailing 元件的定位（cla: yes, f: material design, framework）

[24779](https://github.com/flutter/flutter/pull/24779) 若文字未變更則略過 formatter（a: text input, cla: yes, framework）

[24797](https://github.com/flutter/flutter/pull/24797) 在 text painter 中遍歷可能的字素叢集長度（a: text input, a: typography, cla: yes, framework）

[24816](https://github.com/flutter/flutter/pull/24816) [H] ClipPath.shape 及相關修正（cla: yes, f: material design, framework）

[24830](https://github.com/flutter/flutter/pull/24830) 實作滑鼠指標 hover 支援（cla: yes, f: gestures, framework, ⎊ platform-chromebook, ▣ platform-android）

[24848](https://github.com/flutter/flutter/pull/24848) [H] 在 `compute()` 中處理錯誤並傳遞至 Future（cla: yes, framework）

[24862](https://github.com/flutter/flutter/pull/24862) 修正 semantics 編譯器處理 offstage 子項目（a: accessibility, cla: yes, framework, severe: crash）

[24868](https://github.com/flutter/flutter/pull/24868) 釐清 foundation 函式庫中 dart:ui 依賴（cla: yes, d: api docs, framework）

[24876](https://github.com/flutter/flutter/pull/24876) iOS 游標淡入淡出、圓角、偏移與高度修正（a: text input, cla: yes, f: cupertino, f: material design, framework）

[24878](https://github.com/flutter/flutter/pull/24878) 為 fuchsia 新增 flutter-attach 進入點（cla: yes, tool）

[24881](https://github.com/flutter/flutter/pull/24881) 移除 KeepAlive 文件中的 offstage 描述（cla: yes, framework）

[24889](https://github.com/flutter/flutter/pull/24889) 更新 AUTHORS（cla: yes, team）

[24890](https://github.com/flutter/flutter/pull/24890) 移除已棄用 lint "prefer_bool_in_asserts"（cla: yes, team）

[24892](https://github.com/flutter/flutter/pull/24892) 處理 TabBarView 特殊情況：動畫結束前刪除最後一個分頁（cla: yes, f: material design, framework）

[24930](https://github.com/flutter/flutter/pull/24930) flutter 測試可直接透過 mini test engine 執行（flutter run -t test_file）（a: tests, cla: yes, framework）

[24932](https://github.com/flutter/flutter/pull/24932) 修正 Typography null factory 建構函式（cla: yes, f: material design, framework）

[24941](https://github.com/flutter/flutter/pull/24941) 更新 Switch 文件：停用狀態說明（cla: yes, f: material design, framework）

[24942](https://github.com/flutter/flutter/pull/24942) 修正 debugPrint(null) 不會當機（cla: yes, framework, severe: crash）

[24944](https://github.com/flutter/flutter/pull/24944) 修正 flutter root 錯誤訊息字串插值（cla: yes, tool）

[24953](https://github.com/flutter/flutter/pull/24953) Fuchsia 多裝置與目標支援（cla: yes, customer: fuchsia, tool）

[24976](https://github.com/flutter/flutter/pull/24976) 支援 TextField 多行提示文字 #20941（cla: yes, f: material design, framework）

[24989](https://github.com/flutter/flutter/pull/24989) 新增 annotated region 使用說明文件（cla: yes, d: api docs, framework）

[24993](https://github.com/flutter/flutter/pull/24993) 新增 InputDecoration alignLabelWithHint 參數（cla: yes, f: material design, framework）

[24994](https://github.com/flutter/flutter/pull/24994) 為 Fuchsia 新增模組輪詢發現（cla: yes, tool, ○ platform-fuchsia）

[24999](https://github.com/flutter/flutter/pull/24999) 移除 TextField.noMaxLength，改用 maxLength = -1（cla: yes, f: material design, framework）

[25003](https://github.com/flutter/flutter/pull/25003) 修正文件錯字（cla: yes, d: api docs, framework）

[25007](https://github.com/flutter/flutter/pull/25007) 在 master channel 構建時發出警告（cla: yes, tool）

[25008](https://github.com/flutter/flutter/pull/25008) [Slider] 自訂 track、ticker 與 overlay shape painter（cla: yes, f: material design, framework）

[25013](https://github.com/flutter/flutter/pull/25013) 修正 Cupertino Navigation demo 小問題（cla: yes, team: gallery）

[25046](https://github.com/flutter/flutter/pull/25046) 檢查 build 方法是否回傳 context.widget（cla: yes, framework）

[25048](https://github.com/flutter/flutter/pull/25048) 若 pinned & floating AppBar 剩餘 minExtent 不足時不會當機（cla: yes, framework, severe: crash）

[25049](https://github.com/flutter/flutter/pull/25049) 修正 benchmark 模式下 handleDrawFrame() 行為（a: tests, cla: yes, framework）

[25051](https://github.com/flutter/flutter/pull/25051) pinned & floating AppBar 不會淡出文字（cla: yes, f: material design, framework）

[25055](https://github.com/flutter/flutter/pull/25055) TextField 內在寬度計算包含游標（a: text input, cla: yes, framework）

[25058](https://github.com/flutter/flutter/pull/25058) 確保 lastBuildTimestamp 在提前返回前已設定（cla: yes, tool）

[25076](https://github.com/flutter/flutter/pull/25076) 修正：cupertino dialog action 背景模糊效果（cla: yes, f: cupertino, framework）

[25079](https://github.com/flutter/flutter/pull/25079) 修正 Podfile 問題 #24342（cla: yes, tool, waiting for tree to go green, ⌺‬ platform-ios）

[25091](https://github.com/flutter/flutter/pull/25091) 為 SliverAppBar 文件新增動畫說明（cla: yes, d: api docs, f: material design, framework）

[25094](https://github.com/flutter/flutter/pull/25094) 'flutter config' 輸出中包含空 config 訊息（cla: yes, tool）

[25095](https://github.com/flutter/flutter/pull/25095) InputDecorator Count Widget（cla: yes, f: material design, framework）

[25096](https://github.com/flutter/flutter/pull/25096) 變更文件中的網路圖片 URL（cla: yes, d: api docs, framework）

[25120](https://github.com/flutter/flutter/pull/25120) 以新連結（design-principles 頁面）取代已棄用連結（cla: yes, d: api docs, f: material design, framework）

[25125](https://github.com/flutter/flutter/pull/25125) 為 AnimationController 的 repeat() 新增 reverse 功能（a: animation, cla: yes, framework）

[25126](https://github.com/flutter/flutter/pull/25126) 修正錯誤訊息與其他錯字（cla: yes, framework）

[25154](https://github.com/flutter/flutter/pull/25154) 不再要求 AVD 資料夾存在才能執行 `flutter emulators`（cla: yes, tool, ▣ platform-android）

[25159](https://github.com/flutter/flutter/pull/25159) 修正 #25143，連續呼叫 `precacheImage()` 會丟出例外（cla: yes, framework, waiting for tree to go green）

[25168](https://github.com/flutter/flutter/pull/25168) 修正 InheritedWidget 程式碼範例錯字（cla: yes, framework）

[25178](https://github.com/flutter/flutter/pull/25178) 為 Dash/Zeal docset 新增 favicon，並加入 OpenSearch metadata（cla: yes, team）

[25183](https://github.com/flutter/flutter/pull/25183) 為 CupertinoTabView 新增 navigatorKey（cla: yes, f: cupertino, framework）

[25184](https://github.com/flutter/flutter/pull/25184) 為範例程式碼範本新增 imports 區塊與更多文件（cla: yes, team）

[25186](https://github.com/flutter/flutter/pull/25186) 臨時加回過濾後的 bintray ExoPlayer repository（cla: yes, team: gallery）

[25217](https://github.com/flutter/flutter/pull/25217) 修正拼字（cla: yes, framework）

[25221](https://github.com/flutter/flutter/pull/25221) 支援 ANDROID_SDK_ROOT（除 ANDROID_HOME 外）（cla: yes, tool, ▣ platform-android）

[25228](https://github.com/flutter/flutter/pull/25228) IntrinsicWidth stepWidth 或 stepHeight == 0.0（cla: yes, framework）

[25229](https://github.com/flutter/flutter/pull/25229) 右對齊 backspace 錯誤（a: text input, cla: yes, framework）

[25237](https://github.com/flutter/flutter/pull/25237) 修正錯字（a: text input, cla: yes, d: api docs, framework）

[25238](https://github.com/flutter/flutter/pull/25238) [OR] 更新中國地區協助連結（cla: yes, tool）

[25239](https://github.com/flutter/flutter/pull/25239) 在附加子項目前呼叫 mark* 方法（cla: yes, framework, severe: crash）

[25240](https://github.com/flutter/flutter/pull/25240) 還原「確保快取目錄與檔案有適當權限」（cla: yes, tool）

[25243](https://github.com/flutter/flutter/pull/25243) 允許 snippets 工具從任意 CWD 執行（cla: yes, d: api docs, team）

[25269](https://github.com/flutter/flutter/pull/25269) 使 doctor 輸出在 VS Code/IntelliJ/Android Studio 缺少插件時一致（cla: yes, t: flutter doctor, tool）

[25288](https://github.com/flutter/flutter/pull/25288) 還原「為 attach 指令新增 ipv6 與 observatory port 支援」（cla: yes, tool）

[25300](https://github.com/flutter/flutter/pull/25300) 移除 hello_world 範例中的 uses-material-design（a: size, cla: yes, d: examples）

[25301](https://github.com/flutter/flutter/pull/25301) Flutter 工具支
