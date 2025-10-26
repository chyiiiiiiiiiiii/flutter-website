---
title: Flutter 3.22.0 發行說明
shortTitle: 3.22.0 發行說明
description: Flutter 3.22.0 的發行說明。
---

本頁為 3.22.0 版本的發行說明。
如需後續錯誤修正版本的資訊，請參閱我們的 [CHANGELOG]⟦L1573⟧。
⟦L1572⟧

## Flutter

### Framework
* 由 @zanderso 在 [141110](https://github.com/flutter/flutter/pull/141110) 停用 widget_tester_leaks_test.dart 測試的洗牌功能
* 由 @bleroux 在 [140384](https://github.com/flutter/flutter/pull/140384) 修正當文字包含正則表達式保留字元時拼字檢查會拋出例外的問題
* 由 @polina-c 在 [141183](https://github.com/flutter/flutter/pull/141183) 移除依賴順序的條件
* 由 @polina-c 在 [141153](https://github.com/flutter/flutter/pull/141153) 升級 leak_tracker
* 由 @TahaTesser 在 [141166](https://github.com/flutter/flutter/pull/141166) 更新 `RouteObserver` 範例並修正一個拋出錯誤
* 由 @SharbelOkzan 在 [135578](https://github.com/flutter/flutter/pull/135578) 新增 Form 驗證方法
* 由 @goderbauer 在 [140918](https://github.com/flutter/flutter/pull/140918) 重新套用「動態視圖尺寸調整」(#140165)
* 由 @kevmoo 在 [141205](https://github.com/flutter/flutter/pull/141205) 正確處理 ProcessText.queryTextActions 的 null 情況
* 由 @chrisbobbe 在 [141141](https://github.com/flutter/flutter/pull/141141) TextStyle: 在 copyWith 中，當接收者沒有 debugLabel 時不再忽略 debugLabel
* 由 @Michal-MK 在 [138319](https://github.com/flutter/flutter/pull/138319) 修正 `NestedScrollView` 的外部可滾動元件因 `double` 精度誤差導致與 `BouncingScrollPhysics` 跳動的問題
* 由 @polina-c 在 [140553](https://github.com/flutter/flutter/pull/140553) 改善洩漏追蹤測試
* 由 @polina-c 在 [141226](https://github.com/flutter/flutter/pull/141226) 修正傳遞洩漏追蹤旗標的機制
* 由 @justinmc 在 [141221](https://github.com/flutter/flutter/pull/141221) 當使用 pages API 時呼叫 onPopInvoked
* 由 @Piinks 在 [141318](https://github.com/flutter/flutter/pull/141318) 在 2D API 中新增協變以減少子類型轉型
* 由 @polina-c 在 [141312](https://github.com/flutter/flutter/pull/141312) 修正一處資源洩漏
* 由 @Piinks 在 [141300](https://github.com/flutter/flutter/pull/141300) 為 flutter_driver 新增 dart fix 支援
* 由 @jonahwilliams 在 [141341](https://github.com/flutter/flutter/pull/141341) 為 skia gold client 新增 impeller key，並啟用一個以 --enable-impeller 執行單元測試的 framework 測試分片
* 由 @TahaTesser 在 [141372](https://github.com/flutter/flutter/pull/141372) 修正 `ListWheelScrollView` 在高為零的 `AnimatedContainer` 中會拋出錯誤的問題
* 由 @QuncCccccc 在 [141426](https://github.com/flutter/flutter/pull/141426) 修正拼字錯誤
* 由 @christopherfujino 在 [141424](https://github.com/flutter/flutter/pull/141424) 解除 web_socket_channel 的鎖定並更新 pub 套件
* 由 @OutdatedGuy 在 [141270](https://github.com/flutter/flutter/pull/141270) 為 `.gitignore` 檔案新增結尾換行
* 由 @ksokolovskyi 在 [141526](https://github.com/flutter/flutter/pull/141526) BoxPainter 應派發建立與釋放事件
* 由 @auto-submit 在 [141545](https://github.com/flutter/flutter/pull/141545) 回滾「BoxPainter 應派發建立與釋放事件」
* 由 @bartekpacia 在 [141582](https://github.com/flutter/flutter/pull/141582) 在 TODO 註解中引用 GitHub issue
* 由 @LongCatIsLooong 在 [140516](https://github.com/flutter/flutter/pull/140516) 允許 composing 區域的選取
* 由 @ksokolovskyi 在 [141635](https://github.com/flutter/flutter/pull/141635) TrainHoppingAnimation 應派發建立與釋放事件
* [web] 由 @yjbanov 在 ⟦L1578⟧ 中為 [49786](https://github.com/flutter/engine/pull/49786) 做準備
* [web] 由 @yjbanov 在 ⟦L1579⟧ 中為 layers_test.dart 做 [49786](https://github.com/flutter/engine/pull/49786) 準備
* 由 @pbo-linaro 在 [137618](https://github.com/flutter/flutter/pull/137618) 為 windows-arm64 啟用原生編譯
* 由 @moffatman 在 [140745](https://github.com/flutter/flutter/pull/140745) ScaleGestureRecognizer 的 pointerCount=2 以支援觸控板手勢
* 由 @auto-submit 在 [141809](https://github.com/flutter/flutter/pull/141809) 回滾「為 windows-arm64 啟用原生編譯」
* 由 @yjbanov 在 [141791](https://github.com/flutter/flutter/pull/141791) 在 web 模式下啟用更多測試
* 由 @fzyzcjy 在 [140282](https://github.com/flutter/flutter/pull/140282) 微調關於 bindings 的不準確文件
* 由 @Hixie 在 [141814](https://github.com/flutter/flutter/pull/141814) 回滾「使測試更能抵抗 Skia gold 失敗並重構 flutter_goldens 以清除技術債 (#140101)」
* 由 @sstrickl 在 [141105](https://github.com/flutter/flutter/pull/141105) 在非 debug、非 web 構建中將 defaultTargetPlatform 標記為常數
* 由 @ueman 在 [141595](https://github.com/flutter/flutter/pull/141595) 新增說明 `debugPrint` 在 release 模式下也會記錄日誌
* 由 @gspencergoog 在 [141822](https://github.com/flutter/flutter/pull/141822) 移除測試中不需要的預期
* 由 @matanlurey 在 [141821](https://github.com/flutter/flutter/pull/141821) 測試失敗時不要讓 `flutter_tools` 內的測試卡住
* 由 @matanlurey 在 [141988](https://github.com/flutter/flutter/pull/141988) 按 natebosch 建議移除重複程式碼
* 由 @justinmc 在 [133002](https://github.com/flutter/flutter/pull/133002) 新增 floating cursor 文件
* 由 @Hixie 在 [141810](https://github.com/flutter/flutter/pull/141810) 在沒有 selectionControls 時啟用 contextMenuBuilder
* 由 @Hixie 在 [141902](https://github.com/flutter/flutter/pull/141902) 新增如何測試 flutter_goldens 的註解
* 由 @goderbauer 在 [141976](https://github.com/flutter/flutter/pull/141976) 從 OverflowBar 移除未使用的 clipBehavior
* 由 @Hixie 在 [141900](https://github.com/flutter/flutter/pull/141900) 合併 flutter_goldens_client 至 flutter_goldens
* 由 @polina-c 在 [141737](https://github.com/flutter/flutter/pull/141737) 忽略一個資源洩漏
* 由 @matanlurey 在 [142062](https://github.com/flutter/flutter/pull/142062) 重構 `external_ui` → `external_textures`
* 由 @polina-c 在 [142162](https://github.com/flutter/flutter/pull/142162) 升級 leak_tracker
* 由 @justinmc 在 [142163](https://github.com/flutter/flutter/pull/142163) 改善 PopScope 範例
* 由 @nate-thegrate 在 [141591](https://github.com/flutter/flutter/pull/141591) 在 `cupertino/` 目錄中實作 `switch` 運算式
* 由 @NobodyForNothing 在 [140700](https://github.com/flutter/flutter/pull/140700) 修正 TextField 換行時 Ink 未更新
* 由 @pbo-linaro 在 [141930](https://github.com/flutter/flutter/pull/141930) 為 windows-arm64 啟用原生編譯
* 由 @polina-c 在 [141411](https://github.com/flutter/flutter/pull/141411) 為 ImageInfo 加入監控
* 由 @matanlurey 在 [142257](https://github.com/flutter/flutter/pull/142257) 開始以新增 `bringup: true` 的方式進行重新命名，作為 Android 模擬器
* 由 @polina-c 在 [142287](https://github.com/flutter/flutter/pull/142287) 修正測試中未釋放的 ImageInfo
* 由 @goderbauer 在 [141484](https://github.com/flutter/flutter/pull/141484) 新增 runWidget 以在沒有預設 View 的情況下啟動元件樹
* 由 @auto-submit 在 [142339](https://github.com/flutter/flutter/pull/142339) 回滾「新增 runWidget 以在沒有預設 View 的情況下啟動元件樹」
* 由 @andrewkolos 在 [142281](https://github.com/flutter/flutter/pull/142281) 移除 `UserMessages` 的重複全域宣告
* 由 @Amir-P 在 [141504](https://github.com/flutter/flutter/pull/141504) 修正重新排序二維子元件時的斷言失敗
* 由 @goderbauer 在 [142344](https://github.com/flutter/flutter/pull/142344) 重新套用「新增 runWidget 以在沒有預設 View 的情況下啟動元件樹」
* 由 @zanderso 在 [142267](https://github.com/flutter/flutter/pull/142267) 將 Android minSdkVersion 更新為 21
* 由 @polina-c 在 [142417](https://github.com/flutter/flutter/pull/142417) 使某測試不參與洩漏追蹤
* 由 @Piinks 在 [142482](https://github.com/flutter/flutter/pull/142482) 修正 SliverMainAxisGroup 幾何 cacheExtent
* 由 @aizatazhar 在 [141844](https://github.com/flutter/flutter/pull/141844) 在每個測試結束時將 framesEnabled 重設為預設值
* 由 @kseino 在 [141345](https://github.com/flutter/flutter/pull/141345) 使用 PDI 結束 RLI 的獨立範疇
* 由 @justinmc 在 [142254](https://github.com/flutter/flutter/pull/142254) 「系統返回手勢」說明
* 由 @goderbauer 在 [142486](https://github.com/flutter/flutter/pull/142486) 修正多視圖情境下 ParentDataWidget 異常
* 由 @christopherfujino 在 [141427](https://github.com/flutter/flutter/pull/141427) 解除 test 的鎖定
* 由 @sstasi95 在 [141604](https://github.com/flutter/flutter/pull/141604) 修正 CupertinoTabView 在搭配 PopScope 時於 Android 返回鍵的處理
* 由 @polina-c 在 [142677](https://github.com/flutter/flutter/pull/142677) 修正測試中的資源洩漏
* 由 @piedcipher 在 [142635](https://github.com/flutter/flutter/pull/142635) 為 `form.0.dart` 的 API 範例撰寫測試
* 由 @chingjun 在 [142760](https://github.com/flutter/flutter/pull/142760) 避免 flutter_tools 依賴 build_system/targets 下非頂層進入點的檔案
* 由 @justinmc 在 [142248](https://github.com/flutter/flutter/pull/142248) 支援 Cupertino 返回手勢期間的導航
* 由 @luccasclezar 在 [138195](https://github.com/flutter/flutter/pull/138195) 修正 CupertinoTextSelectionToolbar 裁切問題
* 由 @justinmc 在 [142463](https://github.com/flutter/flutter/pull/142463) 更新 TextSelectionOverlay
* 由 @bartekpacia 在 [140115](https://github.com/flutter/flutter/pull/140115) 更新 gradle lockfiles 範本
* 由 @auto-submit 在 [142889](https://github.com/flutter/flutter/pull/142889) 回滾「更新 gradle lockfiles 範本」
* 由 @ShaunByrne-UniSA 在 [136181](https://github.com/flutter/flutter/pull/136181) 在 CupertinoDatePicker 灰階顯示不可選日期
* 由 @moffatman 在 [142776](https://github.com/flutter/flutter/pull/142776) 修正 CupertinoPageScaffold 的 resizeToAvoidBottomInset
* 由 @paldepind 在 [141364](https://github.com/flutter/flutter/pull/141364) 將 destructiveRed 設為 CupertinoDynamicColor
* 由 @cbracken 在 [142341](https://github.com/flutter/flutter/pull/142341) [Windows] 修正帶符號/無符號整數比較
* 由 @bramp 在 [142177](https://github.com/flutter/flutter/pull/142177) 更新 _goldens_io.dart 以在尺寸不符時產生失敗圖片
* 由 @polina-c 在 [143007](https://github.com/flutter/flutter/pull/143007) 為 CurvedAnimation 加入監控
* 由 @dnfield 在 [143017](https://github.com/flutter/flutter/pull/143017) 釋放預先快取的 image info
* 由 @maRci002 在 [142523](https://github.com/flutter/flutter/pull/142523) 在生命週期狀態產生時處理轉換至 AppLifecycleState.detached
* 由 @goderbauer 在 [142826](https://github.com/flutter/flutter/pull/142826) 在 SemanticsNode 除錯資訊中新增 indexInParent
* 由 @ValentinVignal 在 [142975](https://github.com/flutter/flutter/pull/142975) 在 golden 測試輸出中新增不符像素數
* 由 @Hixie 在 [142251](https://github.com/flutter/flutter/pull/142251) 為 isAvailableForEnvironment 邏輯新增測試
* 由 @gmackall 在 [143085](https://github.com/flutter/flutter/pull/143085) 恢復 gradle OOM 當機時的日誌傾印，並設定 `MaxMetaspaceSize` 的值
* 由 @bartekpacia 在 [143081](https://github.com/flutter/flutter/pull/143081) 重新套用「更新 gradle lockfiles 範本 (#140115)」
* 由 @goderbauer 在 [143184](https://github.com/flutter/flutter/pull/143184) 交叉連結 SliverFixedExtentList/SliverPrototypeExtentList/SliverVariedExtentList
* 由 @goderbauer 在 [143188](https://github.com/flutter/flutter/pull/143188) animated GIFs 只進行一次版面配置
* 由 @bartekpacia 在 [142008](https://github.com/flutter/flutter/pull/142008) 將 integration_test 套件遷移至 Gradle Kotlin DSL
* 由 @jmagman 在 [143167](https://github.com/flutter/flutter/pull/143167) 設定 plugin 範本最低 iOS 版本為 12.0
* 由 @whiskeyPeak 在 [140378](https://github.com/flutter/flutter/pull/140378) 在 `OnDragEnd` 回呼中新增位置資料
* 由 @krispypen 在 [142913](https://github.com/flutter/flutter/pull/142913) golden 測試比較效能提升
* 由 @polina-c 在 [143236](https://github.com/flutter/flutter/pull/143236) 升級 leak_tracker
* 由 @LongCatIsLooong 在 [143024](https://github.com/flutter/flutter/pull/143024) 修正 `TextWidthBasis.longestLine` 的 text painter 最長行尺寸調整邏輯
* 由 @jmagman 在 [143248](https://github.com/flutter/flutter/pull/143248) 更新 integration_test iOS FTL README 腳本以移除目標版本
* 由 @ValentinVignal 在 [143295](https://github.com/flutter/flutter/pull/143295) 為 `StreamBuilder`（如 `FutureBuilder`）新增最佳實踐文件
* [web] 由 @kevmoo 在 [143274](https://github.com/flutter/flutter/pull/143274) 將 JS interop 移至 extension types
* 由 @camsim99 在 [143329](https://github.com/flutter/flutter/pull/143329) 回滾「將 integration_test 套件遷移至 Gradle Kotlin DSL (#142008)」
* 由 @nate-thegrate 在 [143293](https://github.com/flutter/flutter/pull/143293) 在 `widgets/` 中實作 `switch` 運算式
* 由 @reidbaker 在 [143111](https://github.com/flutter/flutter/pull/143111) 更新 integration test 依賴
* 由 @nate-thegrate 在 [142930](https://github.com/flutter/flutter/pull/142930) 讓 `FocusManager` 可回應應用程式生命週期狀態變更
* [devicelab] 由 @jonahwilliams 在 [143
