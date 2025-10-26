---
title: Flutter 1.9.1 發行說明
shortTitle: 1.9.1 發行說明
description: Flutter 1.9.1 的發行說明。
---

您好，歡迎來到 Flutter 的另一個穩定版本發行。今年到目前為止，我們已經完全按照[我們的計畫](https://github.com/flutter/flutter/blob/master/docs/releases/Flutter-build-release-channels.md)（其實與其說是計畫，不如說是目標，但目前為止進展得相當順利……），每季都有一次穩定版本發行。這次的發行是我們有史以來最大的一次，共有來自 116 位貢獻者的 620 個 Pull Request 被合併。和往常一樣，以下列出了有趣的 PR。本次發行有許多值得討論的新內容，包括：

*   修復了一個回歸問題，但也新增了一個
*   一些破壞性 API 變更
*   修復了若干嚴重問題
*   支援 macOS Catalina 與 iOS 13
*   數個新功能
*   以及更多！

需要說明的是，這裡的「我們」指的是整個 Flutter 社群。沒有所有貢獻者（無論你在哪家公司工作），Flutter 團隊都無法持續擴展到現在的規模。感謝大家的貢獻！


## 回歸問題

在這個版本中，我們修復了一個回歸問題（[37955](https://github.com/flutter/flutter/pull/37955) 針對 Skia 近期變更更新 shader 預熱流程），但也新增了一個回歸問題（[38167](https://github.com/dart-lang/sdk/issues/38167) 增量編譯器會重新發出常數求值器的錯誤）。這個新回歸問題已在 1.9.1 穩定版發行後修復（[00d14e7](https://github.com/dart-lang/sdk/commit/00d14e7) [CFE] 常數求值錯誤總是從要求評估的位置開始），如果你遇到這個問題，可以選擇較新的 build 來解決，將其帶入你的 Flutter 應用程式中。


## 破壞性 API 變更

我們非常努力避免破壞性變更，但同時也不希望在推動 Flutter 前進到新場景與新平台時，產生不直覺的 API。以下是本次發行的破壞性變更。請參閱相關公告，以便讓你的程式碼順利遷移。

[33281](https://github.com/flutter/flutter/pull/33281) ([公告](https://groups.google.com/forum/#!msg/flutter-announce/ZmnseDOW9Wc/5K7xD0V8BwAJ)) 更新 TextStyle 與 StrutStyle 的 height 文件

[34019](https://github.com/flutter/flutter/pull/34019) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/34019%7Csort:date/flutter-announce/GBFULLQxGp4/-3uujTAaCgAJ)) Selectable Text

[34665](https://github.com/flutter/flutter/pull/34665) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/34665%7Csort:date/flutter-announce/W9KQKpf0Ves/6bdDq_U8CQAJ)) Selection handles 位置偏移

[35110](https://github.com/flutter/flutter/pull/35110) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/35110%7Csort:date/flutter-announce/FHicLlzr9gQ/OM9KgLxMBwAJ)) 永遠測試 semantics

[35136](https://github.com/flutter/flutter/pull/35136) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/35136%7Csort:date/flutter-announce/UrhJwkaKaSc/ONoMzKrtAwAJ)) 更新 Dark Theme 的 disabledColor 為 White38

[35785](https://github.com/flutter/flutter/pull/35785) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/35785%7Csort:date/flutter-announce/AL5ure2NWNI/4gPoziQSBAAJ)) 從隱式動畫元件移除 reverseDuration，因為該屬性會被忽略

[36030](https://github.com/flutter/flutter/pull/36030) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/36030%7Csort:date/flutter-announce/bN6vFnoVpmk/7UCOxj6LCwAJ)) [Material] 實作 TooltipTheme 與 Tooltip.textStyle，修正 Tooltip debugLabel，更新 Tooltip 預設值

[36106](https://github.com/flutter/flutter/pull/36106) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/36106%7Csort:date/flutter-announce/Yo3WxDCria4/AgNUznoZBgAJ)) 更新 ColorScheme.dark() 顏色以符合 Material Dark 主題規範

[36217](https://github.com/flutter/flutter/pull/36217) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/36217%7Csort:date/flutter-announce/3vyI_41YX44/yQy0MHAuBgAJ)) Mouse 與 Listener 拆分

[36402](https://github.com/flutter/flutter/pull/36402) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/36402%7Csort:date/flutter-announce/taTeI07sK0w/-fsJvpfCFQAJ)) 讓 render objects 能重複利用 engine layers

[36856](https://github.com/flutter/flutter/pull/36856)（無公告）[Material] 實作 TooltipTheme 與 Tooltip.textStyle，更新 Tooltip 預設值

[36964](https://github.com/flutter/flutter/pull/36964) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/36964%7Csort:date/flutter-announce/IALsYuwhzNk/OaP1ijOhCwAJ)) Interactive size const

[37338](https://github.com/flutter/flutter/pull/37338) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/37338%7Csort:date/flutter-announce/ZNX-Rd6IKSQ/3K4-1_skDAAJ)) 更新 TooltipTheme、ToggleButtonsTheme、PopupMenuTheme 的建構子 API

[37341](https://github.com/flutter/flutter/pull/37341)（無公告）hero 動畫過渡後隱藏原 hero

[37544](https://github.com/flutter/flutter/pull/37544) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/37544%7Csort:date/flutter-announce/Igg0DuIO6Zg/2QroNaSkDAAJ)) 用 ButtonBarTheme 取代 ButtonBar.bar 方法

[37652](https://github.com/flutter/flutter/pull/37652) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/37652%7Csort:date/flutter-announce/bTliCEss-VA/CfqN9DCWEwAJ)) RenderObject.getTransformTo 變更為包含 ancestor

[37736](https://github.com/flutter/flutter/pull/37736) ([公告](https://groups.google.com/forum/#!searchin/flutter-announce/37736%7Csort:date/flutter-announce/-kotruZbBDQ/vny4JjFmFQAJ)) 新增可組合的 waitForCondition Driver/extension API


## 嚴重：當機、客戶關鍵與效能修正

在 Flutter 中，我們每次發行都會致力於提升品質。本次修復了多個嚴重問題，包括當機、客戶關鍵問題與效能問題。

[34907](https://github.com/flutter/flutter/pull/34907) 修正 LicensePage 在載入 License 前關閉頁面會導致錯誤

[35223](https://github.com/flutter/flutter/pull/35223) Navigator pushAndRemoveUntil 修正

[36097](https://github.com/flutter/flutter/pull/36097) 修正 nested scroll view 可在無 layout 下重建

[37033](https://github.com/flutter/flutter/pull/37033) 修正 debug paint 在軸向反轉時當機

[37254](https://github.com/flutter/flutter/pull/37254) 當 extendBody 為 true 時，限制 Scaffold 的最大 body 高度

[34298](https://github.com/flutter/flutter/pull/34298) 保留 SafeArea：第 2 部分

[37718](https://github.com/flutter/flutter/pull/37718) 為 MediaQueryData 與 TestWindow 新增 physicalDepth

[35297](https://github.com/flutter/flutter/pull/35297) 修正追蹤與 driver 中第一幀邏輯


## 新功能

本次發行也帶來了兩個新的 Material 元件：ToggleButtons 元件（在 iOS 上稱為 [segmented control](https://developer.apple.com/design/human-interface-guidelines/ios/controls/segmented-controls/)）以及 ColorFilter 元件（詳見下方「文字與無障礙」章節）。想看這些元件實際運作，請參考簡短的 [ToggleButtons](https://github.com/csells/flutter_toggle_buttons) 與 [ColorFilter](https://github.com/csells/flutter_color_filter) 範例。另外，SelectableText 元件允許使用者選取唯讀文字。

[34599](https://github.com/flutter/flutter/pull/34599) [Material] ToggleButtons

[34019](https://github.com/flutter/flutter/pull/34019) Selectable Text

[35207](https://github.com/flutter/flutter/pull/35207) 抽離 selection handlers

[36030](https://github.com/flutter/flutter/pull/36030) [Material] 實作 TooltipTheme 與 Tooltip.textStyle，修正 Tooltip debugLabel，更新 Tooltip 預設值

[36411](https://github.com/flutter/flutter/pull/36411) 實作 InputDecorationTheme 的 copyWith、==、hashCode

[36856](https://github.com/flutter/flutter/pull/36856) [Material] 實作 TooltipTheme 與 Tooltip.textStyle，更新 Tooltip 預設值

[36963](https://github.com/flutter/flutter/pull/36963) 為 tooltip 新增邊距

[37266](https://github.com/flutter/flutter/pull/37266) 調整 Web 端 kMaxUnsignedSMI 的值

[37341](https://github.com/flutter/flutter/pull/37341) hero 動畫過渡後隱藏原 hero

[37492](https://github.com/flutter/flutter/pull/37492) Drawer 邊緣拖曳寬度優化


## macOS Catalina 支援

隨著 macOS Catalina 即將發行，我們已確保工具鏈在你遷移到 Catalina、iOS 13 與 Xcode 11 時能順利運作。需要特別說明的是，**建議你在升級到 Catalina 前，先升級到 Flutter 1.9.1 穩定版**。反過來的順序也可以，但那樣會看到一個錯誤訊息（該[錯誤](https://github.com/flutter/flutter/issues/33890) 無害，但還是……）。

[38325](https://github.com/flutter/flutter/pull/38325) 將 flutter upgrade 重構為兩步驟，第二步支援重入

[cd70b](https://github.com/dart-lang/sdk/commit/ec2d06d4b9f4f0accad2b4aa841499e8e93cd70b) mmap 執行頁面時使用 MAP_JIT（Catalina 需求）

[38662](https://github.com/flutter/flutter/pull/38662) Plist 解析由 defaults 改為 plutil

[2856](https://github.com/flutter/website/issues/2856) 更新「快速開始」路徑設定以支援 zsh shell（支援 Catalina）

[2857](https://github.com/flutter/website/issues/2857) 更新「iOS 設定」頁面以反映 Xcode 11 UI 變更

[37733](https://github.com/flutter/flutter/pull/37733) 支援 Catalina 風格的簽章憑證名稱

[10010](https://github.com/flutter/engine/pull/10010) 針對 arm 目標使用 simarm_x64

[37407](https://github.com/flutter/flutter/pull/37407) 移除 iOS build 的 multi-arch 檢查

[37445](https://github.com/flutter/flutter/pull/37445) iOS gen_snapshot 由 multi-arch binary 改為多個 binary

[37647](https://github.com/flutter/flutter/pull/37647) 調整 gen_snapshot 搜尋路徑優先順序


## iOS

本次發行有超過 50 個 iOS 相關 PR，iOS 支援仍是 Flutter 的重點，包括 iOS 13 scrollbar 實作（支援長按、右側拖曳與震動回饋）、CupertinoSwitch 元件更新以符合 iOS 13，以及持續針對 bitcode 的實驗。

[35829](https://github.com/flutter/flutter/pull/35829) iOS 13 scrollbar

[37724](https://github.com/flutter/flutter/pull/37724) iOS 13 scrollbar 震動回饋

[36087](https://github.com/flutter/flutter/pull/36087) 更新 CupertinoSwitch 視覺風格以符合 iOS 13

[38587](https://github.com/flutter/flutter/pull/38587) 改善 bitcode 檢查

[36471](https://github.com/flutter/flutter/pull/36471) 啟用 AOT bitcode 編譯

[36093](https://github.com/flutter/flutter/pull/36093) 重新上線 ios deps bundle

[34676](https://github.com/flutter/flutter/pull/34676) 預設啟用密碼文字欄位的選取，並公開 API

[34723](https://github.com/flutter/flutter/pull/34723) CupertinoTextField 垂直對齊

[34964](https://github.com/flutter/flutter/pull/34964) CupertinoTextField.onTap

[35303](https://github.com/flutter/flutter/pull/35303) 修正預設 artifacts，排除 ios 與 android

[35307](https://github.com/flutter/flutter/pull/35307) 清理 host_app_ephemeral Profile build 設定

[35731](https://github.com/flutter/flutter/pull/35731) 從 CLI 執行時保持 LLDB 與 iOS 裝置連線

[35749](https://github.com/flutter/flutter/pull/35749) 新增 iOS build 基準測試

[35756](https://github.com/flutter/flutter/pull/35756) 移除 @objc 推斷 build 設定

[35763](https://github.com/flutter/flutter/pull/35763) UIApplicationLaunchOptionsKey -> UIApplication.LaunchOptionsKey

[35833](https://github.com/flutter/flutter/pull/35833) 在 Xcode build phase 停用 CocoaPods 輸入與輸出路徑（ephemeral add-to-app 專案）

[36174](https://github.com/flutter/flutter/pull/36174) [cupertino_icons] 為 brightness #16102 新增 glyph refs

[36194](https://github.com/flutter/flutter/pull/36194) 從 CLI 執行時保持 LLDB 與 iOS 裝置連線

[36498](https://github.com/flutter/flutter/pull/36498) 清理 host_app_ephemeral_cocoapods Profile build 設定

[36793](https://github.com/flutter/flutter/pull/36793) 將 Flutter module App.framework 以本地 CocoaPod pod 方式安裝至 host app

[36887](https://github.com/flutter/flutter/pull/36887) 修正 thumb 大小計算

[37026](https://github.com/flutter/flutter/pull/37026) 新增 Kannada (kn) 語系支援

[37048](https://github.com/flutter/flutter/pull/37048) 建立 collapsed selection 時使用 SizedBox 取代 Container

[37276](https://github.com/flutter/flutter/pull/37276) 將 podhelper.rb 做成範本，避免傳入 module 名稱

[37319](https://github.com/flutter/flutter/pull/37319) Cupertino 無 NavBar 時 resizeToAvoidBottomInset

[37449](https://github.com/flutter/flutter/pull/37449) 若 xcode_backend.sh 腳本失敗或變數遺漏，則 host Xcode build 失敗

[37738](https://github.com/flutter/flutter/pull/37738) 安裝 module pods 時使用相對路徑

[37809](https://github.com/flutter/flutter/pull/37809) 為內部使用 Focus 元件的元件新增 autofocus 參數

[37906](https://github.com/flutter/flutter/pull/37906) 總是安裝 ephemeral engine 複本，而非從 CocoaPods specs 下載

[38593](https://github.com/flutter/flutter/pull/38593) 修正 Cupertino scaffolds 非內容元件的 text scale factor

[38629](https://github.com/flutter/flutter/pull/38629) 處理已連線但未配對的 iOS 裝置

[38645](https://github.com/flutter/flutter/pull/38645) macOS 發行模式下重新命名 iOS 架構（macOS 發行模式 2/3）

[9075](https://github.com/flutter/engine/pull/9075) iOS Platform view 轉換/裁剪

[9464](https://github.com/flutter/engine/pull/9464) 為 ios 單元測試腳本新增 shebang

[9478](https://github.com/flutter/engine/pull/9478) iOS PlatformView clip path

[9491](https://github.com/flutter/engine/pull/9491) iOS 低記憶體時清除快取

[9636](https://github.com/flutter/engine/pull/9636) 為 ios 單元測試腳本新增 shebang (#9464)

[9667](https://github.com/flutter/engine/pull/9667) iOS platform view 透明度

[9722](https://github.com/flutter/engine/pull/9722) 將 iOS dark mode trait 傳遞給 Flutter framework (#34441)

[9819](https://github.com/flutter/engine/pull/9819) 允許 iOS 動態執行緒合併以支援嵌入式視圖變動

[9952](https://github.com/flutter/engine/pull/9952) ios: 修正第一幀 callback 不再依賴 splash screen

[10186](https://github.com/flutter/engine/pull/10186) 確保 iOS debug 模式下 app 一定會 attach

[10381](https://github.com/flutter/engine/pull/10381) 修正 iOS 上 composing range 為空

[10386](https://github.com/flutter/engine/pull/10386) iOS 上 hot-reload 不再使用 DBC

[10645](https://github.com/flutter/engine/pull/10645) iOS 上 hot-reload 不再使用 DBC

[10656](https://github.com/flutter/engine/pull/10656) 修正 iOS 鍵盤當機：- [__NSCFString substringWithRange:], range o…

[10662](https://github.com/flutter/engine/pull/10662) 將本地 podspec 的 ios deployment target 由 7.0 提升至 8.0

[10777](https://github.com/flutter/engine/pull/10777) 手動 roll Skia 以拉取 iOS armv7 build 失敗修正

[10791](https://github.com/flutter/engine/pull/10791) 重新上線 iOS 平台亮度支援

[10820](https://github.com/flutter/engine/pull/10820) iOS JIT 支援與 scenarios app 增強

[10949](https://github.com/flutter/engine/pull/10949) 修正 iOS 對 PostPrerollResult 的參考

[11006](https://github.com/flutter/engine/pull/11006) iOS 透過 service protocol 回報偏好每秒幀數


## Android

本次 Android 最大的新增功能是支援新指令：'flutter build aar'。這個 build 指令與 'flutter build apk' 或 'flutter build appbundle' 類似，但專為 plugin 與 module 專案設計。將 plugin 建置為 [AARs](https://developer.android.com/studio/projects/android-library)，Android Gradle plugin 可用 Jetifier 將支援庫轉換為 AndroidX，減少使用 AndroidX 時的錯誤。

[35217](https://github.com/flutter/flutter/pull/35217) 新增 flutter build aar

[36732](https://github.com/flutter/flutter/pull/36732) Flutter build aar

[10778](https://github.com/flutter/engine/pull/10778) 建置包含 Android embedding 原始碼與 engine 原生函式庫的 JARs

[34573](https://github.com/flutter/flutter/pull/34573) 確保 flutter jar 加入所有 plugin 專案 build type

[36695](https://github.com/flutter/flutter/pull/36695) Android visible password input type 支援

[36805](https://github.com/flutter/flutter/pull/36805) 支援 host app 的 flavors 與自訂 build
