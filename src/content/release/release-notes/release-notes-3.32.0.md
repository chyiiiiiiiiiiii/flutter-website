---
title: Flutter 3.32.0 發行說明
shortTitle: 3.32.0 發行說明
description: Flutter 3.32.0 的發行說明。
---

本頁為 3.32.0 的發行說明。
如需後續錯誤修正版本的資訊，
請參閱 Flutter [CHANGELOG]⟦L719⟧。
⟦L718⟧

## Flutter 框架

### 框架

* 由 @MitchellGoodwin 在 [161696](https://github.com/flutter/flutter/pull/161696) 修正：不再於 CupertinoSheetRoute body 阻擋垂直拖曳手勢
* 由 @LongCatIsLooong 在 [161789](https://github.com/flutter/flutter/pull/161789) 將 `PipelineOwner` 轉為 `base` 類別
* 由 @gaaclarke 在 [161625](https://github.com/flutter/flutter/pull/161625) [Impeller] 補齊 TextContents 的單元測試
* 由 @mernen 在 [161863](https://github.com/flutter/flutter/pull/161863) 修正 Flow.clipBehavior 的文件說明
* 由 @flutter-pub-roller-bot 在 [162015](https://github.com/flutter/flutter/pull/162015) 滾動 pub 套件
* 由 @chunhtai 在 [161768](https://github.com/flutter/flutter/pull/161768) 新增 cupertino picker 的語意測試
* 由 @flar 在 [161855](https://github.com/flutter/flutter/pull/161855) [Impeller] 將單元測試自 Skia 幾何類別遷移
* 由 @nate-thegrate 在 [160564](https://github.com/flutter/flutter/pull/160564) `const AnimationStyle`
* 由 @auto-submit 在 [162046](https://github.com/flutter/flutter/pull/162046) 還原 "[Impeller] Migrate unit tests off of Skia geometry classes (#161855)"
* 由 @robert-ancell 在 [162056](https://github.com/flutter/flutter/pull/162056) 取代建立假裝裝置的臨時程式碼
* 由 @koji-1009 在 [161131](https://github.com/flutter/flutter/pull/161131) 修正：於 `flutter_test` 呼叫 codec.dispose
* 由 @koji-1009 在 [161127](https://github.com/flutter/flutter/pull/161127) 修正：於 `flutter/test` 呼叫 codec.dispose
* 由 @flutter-pub-roller-bot 在 [162095](https://github.com/flutter/flutter/pull/162095) 滾動 pub 套件
* 由 @flar 在 [162146](https://github.com/flutter/flutter/pull/162146) 重新上線 "[Impeller] Migrate unit tests off of Skia geometry classes (#161855)"
* 由 @FrankenApps 在 [161856](https://github.com/flutter/flutter/pull/161856) 更新 Android 整合測試套件以支援新版 AGP
* 由 @chinmaygarde 在 [162037](https://github.com/flutter/flutter/pull/162037) [DisplayList] 將巢狀 canvas enums 移至獨立 TU
* 由 @matanlurey 在 [160992](https://github.com/flutter/flutter/pull/160992) 移除 `scenario_app/android` 並重新命名為 `ios_scenario_app`
* 由 @chunhtai 在 [162282](https://github.com/flutter/flutter/pull/162282) Table 實作 redepth
* 由 @gaaclarke 在 [162049](https://github.com/flutter/flutter/pull/162049) 開始調整 uvs 以符合像素對齊
* 由 @kevmoo 在 [162336](https://github.com/flutter/flutter/pull/162336) [engine, web] 多處回傳 switch 運算式
* 由 @hgraceb 在 [159582](https://github.com/flutter/flutter/pull/159582) 修正 WidgetTester 中的 scrollUntilVisible
* 由 @bkonyi 在 [159219](https://github.com/flutter/flutter/pull/159219) 新增 WidgetPreview 及 @Preview() 註解
* 由 @auto-submit 在 [162392](https://github.com/flutter/flutter/pull/162392) 還原 "Started adjusting uvs to match pixel snapping. (#162049)"
* 由 @bkonyi 在 [162325](https://github.com/flutter/flutter/pull/162325) 將 package:vm_service 升級至 15.0.0，package:leak_tracker 升級至 10.0.9
* 由 @hgraceb 在 [159386](https://github.com/flutter/flutter/pull/159386) 修正 Scrollbar 意外顯示問題
* 由 @victorsanni 在 [162425](https://github.com/flutter/flutter/pull/162425) 新增測試，確認 CupertinoSliverNavigationBar 在 .always bottom 模式下部分捲動時會 snap
* 由 @gaaclarke 在 [162351](https://github.com/flutter/flutter/pull/162351) 修正 TextContents 的部分浮點數誤差
* 由 @gaaclarke 在 [162415](https://github.com/flutter/flutter/pull/162415) 修正文字長寬比
* 由 @PurplePolyhedron 在 [162453](https://github.com/flutter/flutter/pull/162453) 修正註解偽代碼的語法錯誤
* 由 @mosuem 在 [162591](https://github.com/flutter/flutter/pull/162591) 升級 `package:intl` 至 `0.20.2`
* 由 @mdebbar 在 [162537](https://github.com/flutter/flutter/pull/162537) [web] 取消略過部分現已通過的段落測試
* 由 @matanlurey 在 [162623](https://github.com/flutter/flutter/pull/162623) 將 `SkiaException` 轉為 `TestFailure`（post-submit）
* 由 @gaaclarke 在 [162555](https://github.com/flutter/flutter/pull/162555) 字型圖集解析度提升 2 倍
* 由 @StanleyCocos 在 [161295](https://github.com/flutter/flutter/pull/161295) feat(CupertinoButton): 新增 minWidth 與 minHeight 以取代 minSize
* 由 @kevmoo 在 [162424](https://github.com/flutter/flutter/pull/162424) [semantics] 使用 switch 取代 map 來列舉檢查
* 由 @vizakenjack 在 [161660](https://github.com/flutter/flutter/pull/161660) 為 CupertinoButton.filled 建構函式新增 color
* 由 @MitchellGoodwin 在 [162481](https://github.com/flutter/flutter/pull/162481) 調整 Cupertino sheet content 的 padding
* 由 @victorsanni 在 [162181](https://github.com/flutter/flutter/pull/162181) 讓 CupertinoSheetRoute 可與 Cupertino(Sliver)NavigationBar 搭配使用
* 由 @mdebbar 在 [161682](https://github.com/flutter/flutter/pull/161682) [web] SelectableRegion 僅建立一個 `<style>`
* 由 @rkishan516 在 [162228](https://github.com/flutter/flutter/pull/162228) 修正：SelectionArea 選取文字時發生 RangeError
* 由 @Paulik8 在 [162238](https://github.com/flutter/flutter/pull/162238) 為 TextInputConfiguration 與 AutofillConfiguration 新增 equals 與 hashCode
* 由 @ksokolovskyi 在 [162578](https://github.com/flutter/flutter/pull/162578) 在 SemanticsNode._isDifferentFromCurrentSemanticAnnotation 函式中新增角色檢查
* 由 @dev-lup 在 [161490](https://github.com/flutter/flutter/pull/161490) 修正：確保 CupertinoAlertDialog 分隔線橫跨整個寬度並正確顯示
* 由 @Paulik8 在 [162632](https://github.com/flutter/flutter/pull/162632) 更新 SemanticsProperties 的 hintOverrides 欄位文件
* 由 @matanlurey 在 [162644](https://github.com/flutter/flutter/pull/162644) 從 devicelab 任務執行中移除 `--verbose`
* 由 @auto-submit 在 [162853](https://github.com/flutter/flutter/pull/162853) 還原 "Remove `--verbose` from devicelab task executions. (#162644)"
* 由 @jonahwilliams 在 [162751](https://github.com/flutter/flutter/pull/162751) [Android] HC++ 串接 dart platform channel 程式碼與整合測試
* 由 @huycozy 在 [162558](https://github.com/flutter/flutter/pull/162558) 修正 DropdownMenu 範例 RenderFlex overflowed 錯誤
* 由 @gaaclarke 在 [162824](https://github.com/flutter/flutter/pull/162824) 修正翻譯文字的次像素對齊
* 由 @victorsanni 在 [159120](https://github.com/flutter/flutter/pull/159120) 支援 CupertinoSliverNavigationBar.search 與精簡大標題
* 由 @davidhicks980 在 [162807](https://github.com/flutter/flutter/pull/162807) [raw_menu_anchor.0.dart] 移除繪製錯誤的 emoji
* 由 @jonahwilliams 在 [162859](https://github.com/flutter/flutter/pull/162859) [Android] 修正 hcpp 手勢
* 由 @Paulik8 在 [162422](https://github.com/flutter/flutter/pull/162422) 改善 PageController 未附加至 PageView 時的錯誤訊息
* 由 @goderbauer 在 [162893](https://github.com/flutter/flutter/pull/162893) 修正文件參考拼字錯誤
* 由 @jakemac53 在 [162774](https://github.com/flutter/flutter/pull/162774) 切換 service extensions 時更早回傳
* 由 @matanlurey 在 [163017](https://github.com/flutter/flutter/pull/163017) 重新上線 #162644：從 devicelab 任務執行中移除 `--verbose`
* 由 @jonahwilliams 在 [163004](https://github.com/flutter/flutter/pull/163004) [Android] 新增 runtime flag 以判斷是否支援 HCPP
* 由 @robert-ancell 在 [162495](https://github.com/flutter/flutter/pull/162495) 修正 Linux 鍵盤對 AltGr 的支援
* 由 @jonahwilliams 在 [163018](https://github.com/flutter/flutter/pull/163018) [Android] 新增 HCPP platform views 基準測試與整合測試
* 由 @jonahwilliams 在 [163035](https://github.com/flutter/flutter/pull/163035) [Android] 再次修正 hcpp 點擊問題並新增測試
* 由 @koji-1009 在 [159945](https://github.com/flutter/flutter/pull/159945) 修正：建立 frame 後釋放 codec
* 由 @chunhtai 在 [163014](https://github.com/flutter/flutter/pull/163014) 為 matchesSemantics 新增 hasSelectedState 參數以利遷移
* 由 @flutter-pub-roller-bot 在 [163083](https://github.com/flutter/flutter/pull/163083) 滾動 pub 套件
* 由 @EArminjon 在 [157725](https://github.com/flutter/flutter/pull/157725) feat: removeRoute 現在會呼叫 didComplete
* 由 @robert-ancell 在 [162131](https://github.com/flutter/flutter/pull/162131) 將 FlTextInputHandler 從 FlView 移出
* 由 @matanlurey 在 [163157](https://github.com/flutter/flutter/pull/163157) 啟用 `goldenFileComparator` 修正以支援裝置端整合測試
* 由 @gaaclarke 在 [162710](https://github.com/flutter/flutter/pull/162710) 補齊次像素單元測試
* 由 @mdebbar 在 [162837](https://github.com/flutter/flutter/pull/162837) [web] 徹底移除 framework 中所有 HTML 相關內容
* 由 @mdebbar 在 [162836](https://github.com/flutter/flutter/pull/162836) [web] 徹底移除 flutter tool 與測試工具中的 HTML 內容
* 由 @gaaclarke 在 [163229](https://github.com/flutter/flutter/pull/163229) 啟用 web 上 CupertinoDesktopTextSelectionToolbar 的 ImageFilter.compose
* 由 @gaaclarke 在 [162480](https://github.com/flutter/flutter/pull/162480) 微調 TextContents 計算以避免浮點誤差
* 由 @yiiim 在 [161849](https://github.com/flutter/flutter/pull/161849) 重構 SliverMainAxisGroup 以支援反向模式
* 由 @chunhtai 在 [163075](https://github.com/flutter/flutter/pull/163075) 新增所有 semantics 角色
* 由 @ksokolovskyi 在 [162572](https://github.com/flutter/flutter/pull/162572) 為 _ArcPaintPredicate 新增缺漏屬性
* 由 @Piinks 在 [163629](https://github.com/flutter/flutter/pull/163629) 驗證 Gold 整合
* 由 @polina-c 在 [163637](https://github.com/flutter/flutter/pull/163637) 建立協助方法以分派物件建立與釋放
* 由 @ueman 在 [140783](https://github.com/flutter/flutter/pull/140783) 讓 Flutter 版本資訊可於執行時存取
* 由 @auto-submit 在 [163753](https://github.com/flutter/flutter/pull/163753) 還原 "Make Flutter version information accessible at runtime (#140783)"
* 由 @reidbaker 在 [163556](https://github.com/flutter/flutter/pull/163556) 建立 Android-API-And-Related-Versions.md
* 由 @StanleyCocos 在 [162932](https://github.com/flutter/flutter/pull/162932) fix(CupertinoDatePicker): 修正字型不一致
* 由 @victorsanni 在 [163089](https://github.com/flutter/flutter/pull/163089) CupertinoSliverNavigationBar.search 精細度更新
* 由 @NabilaWorks 在 [161027](https://github.com/flutter/flutter/pull/161027) WebKit 應尊重 TextCapitalization.words
* 由 @matanlurey 在 [160289](https://github.com/flutter/flutter/pull/160289) 預設啟用 `--explicit-package-dependencies`
* 由 @justinmc 在 [159013](https://github.com/flutter/flutter/pull/159013) Secure paste 里程碑 2
* 由 @jmagman 在 [163798](https://github.com/flutter/flutter/pull/163798) 更新範例與測試專案中的 gradle 記憶體屬性
* 由 @mdebbar 在 [164003](https://github.com/flutter/flutter/pull/164003) [web] 實際移除 HTML 程式碼
* 由 @ueman 在 [163761](https://github.com/flutter/flutter/pull/163761) 重新上線 "Make Flutter version information accessible at runtime (#140783)"
* 由 @polina-c 在 [163822](https://github.com/flutter/flutter/pull/163822) 縮短方法簽名以便單行呼叫
* 由 @yiiim 在 [163528](https://github.com/flutter/flutter/pull/163528) SliverMainAxisGroup 支援多個 PinnedHeaderSliver 子元件
* 由 @jmagman 在 [163898](https://github.com/flutter/flutter/pull/163898) 更新 dragDevices 文件，納入預設 PointerDeviceKind.trackpad
* 由 @flar 在 [164054](https://github.com/flutter/flutter/pull/164054) [DisplayList] 刪除 DlCanvas 所有舊有 Skia 導向方法多載
* 由 @pathconnected 在 [162955](https://github.com/flutter/flutter/pull/162955) 設定 SliverResizingHeader 的 maxScrollObstructionExtent 為 minExtent
* 由 @dominikh 在 [163942](https://github.com/flutter/flutter/pull/163942) 修正 WidgetsApp 文件中的小問題
* 由 @cbracken 在 [164144](https://github.com/flutter/flutter/pull/164144) [iOS] 為 integration_test 範例新增 platform view
* 由 @Michae1Weiss 在 [162581](https://github.com/flutter/flutter/pull/162581) 為 CupertinoNavigationBar 新增 `Back` 與 `Cancel` 按鈕的在地化
* 由 @flutter-pub-roller-bot 在 [163567](https://github.com/flutter/flutter/pull/163567) 滾動 pub 套件
* 由 @chul0061 在 [163850](https://github.com/flutter/flutter/pull/163850) 修正韓文 cupertino datepicker 日期時間順序
* 由 @flutter-pub-roller-bot 在 [164316](https://github.com/flutter/flutter/pull/164316) 滾動 pub 套件
* 由 @reidbaker 在 [164195](https://github.com/flutter/flutter/pull/164195) android_host_app_v2_embedding 更新相依套件與文件
* 由 @reidbaker 在 [164198](https://github.com/flutter/flutter/pull/164198) 移除 min/compile/target SdkVersion 最後用法，統一 repo 內 sourceCompatibility，並更新 android 版本文件
* 由 @matanlurey 在 [164335](https://github.com/flutter/flutter/pull/164335) 文件說明 `engine.version`（如何/將如何）計算
* 由 @Hannnes1 在 [162575](https://github.com/flutter/flutter/pull/162575) 新增 EditableText.onTapUpOutside 預設行為的設定動作
* 由 @yiiim 在 [161731](https://github.com/flutter/flutter/pull/161731) 讓 CupertinoButton 按下與移動行為更貼近原生
* 由 @LongCatIsLooong 在 [160120](https://github.com/flutter/flutter/pull/160120) 新增 `isSystemTextScaler` matcher
* 由 @loic-sharma 在 [164154](https://github.com/flutter/flutter/pull/164154) [A11y] 新增 radio group 角色
* 由 @mattka
