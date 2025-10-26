---
title: Flutter 1.2.2 變更日誌
shortTitle: 1.2.2 變更日誌
description: Flutter 1.2.2 版本的變更日誌，包含本次發行合併的所有 PR 清單。
---

## 本次 flutter/flutter 發行關閉的 PR

從 2018 年 11 月 29 日（五）19:41:00 -0800 到 2019 年 2 月 21 日（四）20:22:00 -0800

[21157](https://github.com/flutter/flutter/pull/21157) 交換 scope 與 gesture（cla: yes, f: scrolling, framework）

[22139](https://github.com/flutter/flutter/pull/22139) 將 INTERNET 權限移至 debug/AndroidManifest.xml（cla: yes, tool, ▣ platform-android）

[23118](https://github.com/flutter/flutter/pull/23118) 設定 ExpansionTile 中第一個 ListTile 的 icon 顏色。修正 #23053（cla: yes, f: material design, framework）

[23188](https://github.com/flutter/flutter/pull/23188) 編譯 Xcode 10 時檢查重複的 Flutter.framework 嵌入（cla: yes, tool, ⌺‬ platform-ios）

[23424](https://github.com/flutter/flutter/pull/23424) 教 DragGestureRecognizer 支援拖曳起始行為（a: text input, cla: yes, d: examples, f: cupertino, f: date/time picker, f: gestures, f: material design, f: scrolling, framework）

[23506](https://github.com/flutter/flutter/pull/23506) 在 gallery 中建立可編輯數值的 slider（cla: yes, f: material design, framework）

[23531](https://github.com/flutter/flutter/pull/23531) [O] 移除多個逾時設定。（a: tests, cla: yes, t: gradle, team, tool）

[23677](https://github.com/flutter/flutter/pull/23677) 為 FloatingActionButtonLocation 的變更新增動畫測試（cla: yes, f: material design, framework）

[23759](https://github.com/flutter/flutter/pull/23759) 新增 CupertinoTheme（cla: yes, f: cupertino, f: material design, framework, team: gallery）

[23782](https://github.com/flutter/flutter/pull/23782) 將 flutter_shared 資源加入模組產物（a: assets, t: gradle, tool）

[23817](https://github.com/flutter/flutter/pull/23817) 修正專案目錄含有空格時導致編譯錯誤（a: existing-apps, cla: yes, tool, ▣ platform-android）

[23860](https://github.com/flutter/flutter/pull/23860) 清除或逐出快取時一併清空 pendingImages（cla: yes, framework）

[23889](https://github.com/flutter/flutter/pull/23889) Flutter doctor 錯誤訊息查詢（cla: yes, t: flutter doctor, tool）

[23919](https://github.com/flutter/flutter/pull/23919) 允許偵測 TabBar 點擊（cla: yes, f: material design, framework）

[24156](https://github.com/flutter/flutter/pull/24156) [Material] Bottom app bar 主題（cla: yes, f: material design, framework）

[24169](https://github.com/flutter/flutter/pull/24169) [Material] 對話框可主題化的 elevation（cla: yes, f: material design, framework）

[24209](https://github.com/flutter/flutter/pull/24209) 專案範本不再忽略 pubspec.lock（cla: yes, tool）

[24440](https://github.com/flutter/flutter/pull/24440) 新增對 Android app bundle 的支援 - Issue #17829（cla: no, t: gradle, tool, ▣ platform-android）

[24449](https://github.com/flutter/flutter/pull/24449) Text field 樣式合併（cla: yes, f: material design, framework）

[24457](https://github.com/flutter/flutter/pull/24457) 修正 Material TextField 在 Android 與 iOS 上的手勢（a: text input, cla: yes, f: cupertino, f: material design, framework）

[24511](https://github.com/flutter/flutter/pull/24511) [H] 取消棄用 BigInteger 支援，並補充其實際作用的文件。（cla: yes, framework）

[24513](https://github.com/flutter/flutter/pull/24513) 為 `flutter test` 中的運算式求值新增基本測試（a: debugging, a: tests, cla: yes, tool）

[24515](https://github.com/flutter/flutter/pull/24515) 新增基本除錯單步測試（a: debugging, cla: yes, tool）

[24527](https://github.com/flutter/flutter/pull/24527) obscureText 與 enableInteractiveSelection 預設值（a: text input, cla: yes, framework）

[24537](https://github.com/flutter/flutter/pull/24537) 為 attach 指令新增 IPv6 與 observatory port 支援（cla: yes, customer: dream (g3), tool）

[24551](https://github.com/flutter/flutter/pull/24551) 在 Viewport 回報時，將 consumedScrollExtent 加入 SliverConstraints（cla: yes, f: scrolling, framework）

[24554](https://github.com/flutter/flutter/pull/24554) 新增 force press 手勢偵測器與辨識器（cla: yes, f: gestures, framework）

[24580](https://github.com/flutter/flutter/pull/24580) 移除 Googlers 的簽署特例（第二輪）（cla: yes, tool, ⌺‬ platform-ios）

[24581](https://github.com/flutter/flutter/pull/24581) [OR] 清理 device lab 測試並移除逾時設定。（cla: yes, t: hot reload, tool）

[24587](https://github.com/flutter/flutter/pull/24587) 驗證 TextField 樣式（cla: yes, f: material design, framework）

[24632](https://github.com/flutter/flutter/pull/24632) 在崩潰報告中包含錯誤訊息（cla: yes, tool）

[24635](https://github.com/flutter/flutter/pull/24635) TextFormField 游標參數（a: text input, cla: yes, f: material design, framework）

[24643](https://github.com/flutter/flutter/pull/24643) [H] InputDecoration 的小幅調整（主要為文件）（cla: yes, f: material design, framework）

[24669](https://github.com/flutter/flutter/pull/24669) 確保快取目錄與檔案擁有適當權限（cla: yes, tool）

[24728](https://github.com/flutter/flutter/pull/24728) [H] 支援設定停用的 floating action button 的 elevation（cla: yes, f: material design, framework）

[24736](https://github.com/flutter/flutter/pull/24736) [H] 提供更多 FAB 位置選項。（cla: yes, f: material design, framework）

[24744](https://github.com/flutter/flutter/pull/24744) app 變為不可見/可見時移除/恢復焦點（a: text input, cla: yes, framework）

[24746](https://github.com/flutter/flutter/pull/24746) 變更 adb 需求版本，舊版會導致 hot reload 失效。（cla: yes, tool, ▣ platform-android）

[24752](https://github.com/flutter/flutter/pull/24752) 以 switch 取代平台判斷（cla: yes, f: material design）

[24754](https://github.com/flutter/flutter/pull/24754) 以 switch 取代 Android 特定判斷（cla: yes, framework, team）

[24761](https://github.com/flutter/flutter/pull/24761) 新增 floating cursor 支援（a: text input, cla: yes, framework）

[24767](https://github.com/flutter/flutter/pull/24767) [H] 改善溢出 ListTile 中 leading 與 trailing 元件的對齊（cla: yes, f: material design, framework）

[24779](https://github.com/flutter/flutter/pull/24779) 若文字未變更則跳過 formatter（a: text input, cla: yes, framework）

[24797](https://github.com/flutter/flutter/pull/24797) 在 text painter 中遍歷潛在的字素叢集長度（a: text input, a: typography, cla: yes, framework）

[24816](https://github.com/flutter/flutter/pull/24816) [H] ClipPath.shape 及相關修正（cla: yes, f: material design, framework）

[24830](https://github.com/flutter/flutter/pull/24830) 實作滑鼠指標的 hover 支援（cla: yes, f: gestures, framework, ⎊ platform-chromebook, ▣ platform-android）

[24848](https://github.com/flutter/flutter/pull/24848) [H] 在 `compute()` 中處理錯誤並傳遞至 Future（cla: yes, framework）

[24862](https://github.com/flutter/flutter/pull/24862) 修正 semantics 編譯器對 offstage 子元件的處理（a: accessibility, cla: yes, framework, severe: crash）

[24868](https://github.com/flutter/flutter/pull/24868) 釐清 foundation 函式庫中 dart:ui 依賴（cla: yes, d: api docs, framework）

[24876](https://github.com/flutter/flutter/pull/24876) 為 iOS 游標新增淡入淡出、圓角、修正偏移與高度（a: text input, cla: yes, f: cupertino, f: material design, framework）

[24878](https://github.com/flutter/flutter/pull/24878) 為 fuchsia 新增 flutter-attach 進入點（cla: yes, tool）

[24881](https://github.com/flutter/flutter/pull/24881) 從 KeepAlive 移除 offstage 描述（cla: yes, framework）

[24889](https://github.com/flutter/flutter/pull/24889) 更新 AUTHORS（cla: yes, team）

[24890](https://github.com/flutter/flutter/pull/24890) 移除已棄用的 lint "prefer_bool_in_asserts"（cla: yes, team）

[24892](https://github.com/flutter/flutter/pull/24892) 處理 TabBarView 特例：動畫結束前刪除最後一個分頁（cla: yes, f: material design, framework）

[24930](https://github.com/flutter/flutter/pull/24930) 直接執行時（flutter run -t test_file）透過 mini test engine 執行 flutter 測試（a: tests, cla: yes, framework）

[24932](https://github.com/flutter/flutter/pull/24932) 修正 Typography null 工廠建構子（cla: yes, f: material design, framework）

[24941](https://github.com/flutter/flutter/pull/24941) 更新 Switch 文件：停用狀態（cla: yes, f: material design, framework）

[24942](https://github.com/flutter/flutter/pull/24942) 修正 debugPrint(null) 不再導致崩潰（cla: yes, framework, severe: crash）

[24944](https://github.com/flutter/flutter/pull/24944) 修正 flutter root 錯誤訊息字串插值（cla: yes, tool）

[24953](https://github.com/flutter/flutter/pull/24953) Fuchsia 多裝置與目標支援（cla: yes, customer: fuchsia, tool）

[24976](https://github.com/flutter/flutter/pull/24976) 支援 TextField 多行提示文字 #20941（cla: yes, f: material design, framework）

[24989](https://github.com/flutter/flutter/pull/24989) 新增如何使用 annotated region 的文件（cla: yes, d: api docs, framework）

[24993](https://github.com/flutter/flutter/pull/24993) 為 InputDecoration 新增 alignLabelWithHint 參數（cla: yes, f: material design, framework）

[24994](https://github.com/flutter/flutter/pull/24994) 為 Fuchsia 新增模組輪詢發現（cla: yes, tool, ○ platform-fuchsia）

[24999](https://github.com/flutter/flutter/pull/24999) 移除 TextField.noMaxLength，改用 maxLength = -1（cla: yes, f: material design, framework）

[25003](https://github.com/flutter/flutter/pull/25003) 修正文件中的拼字錯誤（cla: yes, d: api docs, framework）

[25007](https://github.com/flutter/flutter/pull/25007) 在 master channel 編譯時顯示警告（cla: yes, tool）

[25008](https://github.com/flutter/flutter/pull/25008) [Slider] 自訂軌道、ticker 與 overlay shape painter（cla: yes, f: material design, framework）

[25013](https://github.com/flutter/flutter/pull/25013) 為 Cupertino Navigation demo 新增小修正（cla: yes, team: gallery）

[25046](https://github.com/flutter/flutter/pull/25046) 檢查 build 方法是否回傳 context.widget（cla: yes, framework）

[25048](https://github.com/flutter/flutter/pull/25048) 若 pinned 與 floating AppBar 的剩餘 minExtent 不足時不再崩潰（cla: yes, framework, severe: crash）

[25049](https://github.com/flutter/flutter/pull/25049) 修正 handleDrawFrame() 在 benchmark 模式下的行為（a: tests, cla: yes, framework）

[25051](https://github.com/flutter/flutter/pull/25051) pinned 與 floating AppBar 不再淡出文字（cla: yes, f: material design, framework）

[25055](https://github.com/flutter/flutter/pull/25055) 在 textfield 本質寬度量測中包含游標（a: text input, cla: yes, framework）

[25058](https://github.com/flutter/flutter/pull/25058) 確保 lastBuildTimestamp 在提前返回前已設定（cla: yes, tool）

[25076](https://github.com/flutter/flutter/pull/25076) 修正：cupertino dialog action 背景模糊效果（cla: yes, f: cupertino, framework）

[25079](https://github.com/flutter/flutter/pull/25079) 修正 Podfile 問題 #24342（cla: yes, tool, waiting for tree to go green, ⌺‬ platform-ios）

[25091](https://github.com/flutter/flutter/pull/25091) 為 SliverAppBar 文件新增動畫說明（cla: yes, d: api docs, f: material design, framework）

[25094](https://github.com/flutter/flutter/pull/25094) 在 'flutter config' 輸出中包含空 config 訊息（cla: yes, tool）

[25095](https://github.com/flutter/flutter/pull/25095) InputDecorator Count Widget（cla: yes, f: material design, framework）

[25096](https://github.com/flutter/flutter/pull/25096) 更改文件中的網路圖片 URL（cla: yes, d: api docs, framework）

[25120](https://github.com/flutter/flutter/pull/25120) 以非過時連結（設計原則頁面）取代註解（cla: yes, d: api docs, f: material design, framework）

[25125](https://github.com/flutter/flutter/pull/25125) 為 AnimationController 的 repeat() 新增 reverse 功能（a: animation, cla: yes, framework）

[25126](https://github.com/flutter/flutter/pull/25126) 修正錯誤訊息與其他拼字錯誤（cla: yes, framework）

[25154](https://github.com/flutter/flutter/pull/25154) 執行 `flutter emulators` 時不再要求 AVD 資料夾必須存在（cla: yes, tool, ▣ platform-android）

[25159](https://github.com/flutter/flutter/pull/25159) 修正 #25143 連續呼叫 `precacheImage()` 會丟出例外（cla: yes, framework, waiting for tree to go green）

[25168](https://github.com/flutter/flutter/pull/25168) 修正 InheritedWidget 程式碼範例拼字錯誤（cla: yes, framework）

[25178](https://github.com/flutter/flutter/pull/25178) 為 Dash/Zeal 文件集新增 favicon，並加入 OpenSearch metadata（cla: yes, team）

[25183](https://github.com/flutter/flutter/pull/25183) 為 CupertinoTabView 新增 navigatorKey（cla: yes, f: cupertino, framework）

[25184](https://github.com/flutter/flutter/pull/25184) 為範例程式碼範本新增 imports 區段，並補充更多文件（cla: yes, team）

[25186](https://github.com/flutter/flutter/pull/25186) 臨時加入已過濾的 bintray ExoPlayer repository（cla: yes, team: gallery）

[25217](https://github.com/flutter/flutter/pull/25217) 修正拼字錯誤（cla: yes, framework）

[25221](https://github.com/flutter/flutter/pull/25221) 除 ANDROID_HOME 外支援 ANDROID_SDK_ROOT（cla: yes, tool, ▣ platform-android）

[25228](https://github.com/flutter/flutter/pull/25228) IntrinsicWidth stepWidth 或 stepHeight == 0.0（cla: yes, framework）

[25229](https://github.com/flutter/flutter/pull/25229) 右對齊 backspace 錯誤（a: text input, cla: yes, framework）

[25237](https://github.com/flutter/flutter/pull/25237) 修正拼字錯誤（a: text input, cla: yes, d: api docs, framework）

[25238](https://github.com/flutter/flutter/pull/25238) [OR] 更新中國地區協助連結（cla: yes, tool）

[25239](https://github.com/flutter/flutter/pull/25239) 在附加子元件前呼叫 mark* 方法（cla: yes, framework, severe: crash）

[25240](https://github.com/flutter/flutter/pull/25240) 還原「確保快取目錄與檔案擁有適當權限」（cla: yes, tool）

[25243](https://github.com/flutter/flutter/pull/25243) 允許 snippets 工具從任意 CWD 執行（cla: yes, d: api docs, team）

[25269](https://github.com/flutter/flutter/pull/25269) 使 doctor 輸出在 VS Code/IntelliJ/Android Studio 插件遺失時一致（cla: yes, t: flutter doctor, tool）

[25288](https://github.com/flutter/flutter/pull/25288) 還原「為 attach 指令新增 IPv
