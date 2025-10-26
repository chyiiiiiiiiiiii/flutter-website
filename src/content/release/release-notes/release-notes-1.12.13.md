---
title: Flutter 1.12.13 發行說明
shortTitle: 1.12.13 發行說明
description: Flutter 1.12.13 的發行說明。
---

歡迎來到 Flutter 1.12，我們迄今為止規模最大的穩定版本！
在這個版本中，我們合併了來自 188 位貢獻者（包括 Google 員工與非 Google 貢獻者）的 1,905 個 Pull Request！
請參閱下方圖表，了解每個版本的 PR 數量。過去一年中，除了 Flutter 1.9（為支援 Catalina 而特別發佈的版本）外，每個版本的 PR 數量都在成長。
在最近的 [GitHub Octoverse 報告]⟦L1406⟧ 中，Flutter 被列為 GitHub 上前三大活躍的倉庫之一！

隨著假期的到來，我們想對我們令人驚豔的開發者社群表達最誠摯的感謝——你們相信 Flutter、為 Flutter 發聲並貢獻於 Flutter。
這對我們所有人來說都是不可思議的一年！我們期待未來幾年繼續與你們攜手前行。

如往常一樣，你可以在下方找到有趣的 PR 列表。
本次發行有許多值得一提的新內容，包括：

*   一些破壞性 API 變更
*   修復多項嚴重問題
*   Web 支援現已於 beta channel 提供
*   MacOS 支援自 1.13 起於 dev channel 啟用
*   改善 SDK，便於將 Flutter 加入現有 Android/iOS 應用
*   iOS 13 視覺更新，包含 iOS Dark mode 支援
*   增強的工具體驗
*   新元件（Widgets）與功能
*   以及更多！

## 破壞性變更（Breaking changes）

我們通常會避免對 Flutter、其插件或套件引入破壞性變更，但有時為了讓 API 更直覺，這是無可避免的。
我們已實施一項新流程，邀請你提交測試，協助我們偵測破壞性變更。
欲了解更多資訊，請參閱 [Ian Hickson 的這篇文章]⟦L1407⟧、[flutter-announce]⟦L1408⟧ 以及
[Flutter wiki 上的 breaking change policy]⟦L1409⟧。

以下是本次發行的破壞性變更清單。
請參閱相關公告，以便你的程式碼能順利遷移。

[37024]({{site.repo.flutter}}/pull/37024) [以 SliverLayoutBuilder 實作 PageView，棄用 RenderSliverFillViewport](https://groups.google.com/g/flutter-announce/c/1CUo2GCjrD4/m/VGKsyVirFQAJ)  
[37739]({{site.repo.flutter}}/pull/37739) [修正 repeat(reverse: true) 與 animateWith 的 AnimationStatus](https://groups.google.com/g/flutter-announce/c/yYqqt4Z5IIo/m/3wRYBwSQEwAJ)  
[37896]({{site.repo.flutter}}/pull/37896) [為 MouseRegion 新增 opacity 控制。為 Layer 新增 findAnnotations。](https://groups.google.com/g/flutter-announce/c/GHSNLpjzmPw/m/ozNXwdbHDwAJ)  
[38481]({{site.repo.flutter}}/pull/38481) [Timer picker 精度調整](https://groups.google.com/g/flutter-announce/c/cSwtxCpWWEU/m/LtZS9g6eAgAJ)  
[38568]({{site.repo.flutter}}/pull/38568) [clipBehavior 的 assert 檢查標準化](https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!searchin/flutter-announce/clipBehavior%7Csort:date/flutter-announce/VJaYV9R9usU/_mV1GV25DwAJ)  
[39079]({{site.repo.flutter}}/pull/39079) [修正 widget 在 warm up frame 被建立兩次的問題](https://groups.google.com/g/flutter-announce/c/m6ewfoO64mI/m/ziD4VmwUBQAJ)  
[39440]({{site.repo.flutter}}/pull/39440) [允許 initial route 存在間隔](https://groups.google.com/g/flutter-announce/c/ysFSO3eScbs/m/GzPFkLuvAQAJ)  
[39919]({{site.repo.flutter}}/pull/39919) [CupertinoDatePicker 與 CupertinoTimerPicker 支援 dark mode](https://groups.google.com/g/flutter-announce/c/0DAdg-k_jDw/m/DUGLDQagAAAJ)  
[40166]({{site.repo.flutter}}/pull/40166) [新增正確的焦點處理於路由 push 與 pop 時](https://groups.google.com/g/flutter-announce/c/BjPKnOw5jzU/m/Ev-gUJ_VAwAJ)  
[40179]({{site.repo.flutter}}/pull/40179) [更新 PopupMenu 版面配置](https://groups.google.com/g/flutter-announce/c/UlK3y9HWyBg/m/Dybr660DAAAJ)  
[40566]({{site.repo.flutter}}/pull/40566) [移除 CupertinoSystemColors，改用 CupertinoColors](https://groups.google.com/g/flutter-announce/c/pMYPTvjWCX4/m/UiocKCk0AQAJ)  
[40690]({{site.repo.flutter}}/pull/40690) [CupertinoPageScaffold 支援 dark mode](https://groups.google.com/g/flutter-announce/c/r_2xpmKiLj4/m/-myr4ZRPAAAJ)  
[41220]({{site.repo.flutter}}/pull/41220) [為使用 InkWell 的控制項新增 ActivateAction](https://groups.google.com/g/flutter-announce/c/oLsxPDDRc6s/m/oCtHP3ejAAAJ)  
[41857]({{site.repo.flutter}}/pull/41857) [將 dark theme elevation overlay 改為使用 colorScheme.onSurface]  
[42449]({{site.repo.flutter}}/pull/42449) [將 TextField 最小高度由 40 提升至 48](https://groups.google.com/g/flutter-announce/c/RDyeXZK0fO8/m/rdkBzgw4DgAJ)  
[42470]({{site.repo.flutter}}/pull/42470) [密碼欄位不允許多行](https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!msg/flutter-announce/Ken8TY_QiuY/qxJF2ugyBQAJ)  
[42479]({{site.repo.flutter}}/pull/42479) [使 DropdownButton 的 disabledHint 與 hint 行為一致](https://groups.google.com/g/flutter-announce/c/yHIl-zEXm5c/m/abpgrXuHDgAJ)  
[45135]({{site.repo.flutter}}/pull/45135) [新增延遲首次畫面渲染的選項](https://groups.google.com/g/flutter-announce/c/kBf4cXjD2y4/m/lg19fDnaAgAJ)  

## 嚴重崩潰與效能問題

每個穩定版本我們都致力於提升 Flutter 的品質。在 1.12 版本中，我們修復了多項嚴重問題，包括下列崩潰與效能議題。

[40009]({{site.repo.flutter}}/pull/40009) 為 _IndicatorPainter._tabOffsetsEqual() 新增 null 檢查以防止崩潰  
[40263]({{site.repo.flutter}}/pull/40263) 修正 flutter doctor 在 vswhere 搜尋時的崩潰  
[40786]({{site.repo.flutter}}/pull/40786) 修正 vswhere 查詢遺失安裝時的崩潰  
[42342]({{site.repo.flutter}}/pull/42342) 修正 DropdownButton 當 hint 與 selectedItemBuilder 同時定義時的崩潰  
[44610]({{site.repo.flutter}}/pull/44610) createState 斷言的錯誤訊息  
[38814]({{site.repo.flutter}}/pull/38814) 新增 iOS backdrop filter 基準測試  
[38821]({{site.repo.flutter}}/pull/38821) 快取 caret 參數  
[38861]({{site.repo.flutter}}/pull/38861) 用 frameTimings 取代已棄用的 onReportTimings  
[39439]({{site.repo.flutter}}/pull/39439) 測量 iOS CPU/GPU 百分比  
[43676]({{site.repo.flutter}}/pull/43676) 允許多個 TimingsCallbacks  
[45050]({{site.repo.flutter}}/pull/45050) 為 picture raster cache 新增效能測試  

## 新功能

Flutter 1.12 帶來多項新功能，包括 [SliverOpacity]({{site.api}}/flutter/widgets/SliverOpacity-class.html) 元件、[SliverAnimatedList]({{site.api}}/flutter/widgets/SliverAnimatedList-class.html)，以及可為 SliverAppBar 設定拉伸效果的能力。

[37416]({{site.repo.flutter}}/pull/37416) 新增 MediaQuery.systemGestureInsets 以支援 Android Q  
[39857]({{site.repo.flutter}}/pull/39857) 更新 ToggleButtons 預設 constraints 並新增 constraints 參數  
[40161]({{site.repo.flutter}}/pull/40161) PageRouteBuilder 新增 fullscreenDialog 參數  
[40461]({{site.repo.flutter}}/pull/40461) 實作 DropdownButton.selectedItemBuilder  
[41415]({{site.repo.flutter}}/pull/41415) 開放 API 以調整圖片快取大小  
[42250]({{site.repo.flutter}}/pull/42250) SliverAppBar - 可設定 overscroll stretch 並帶有 callback，支援 FlexibleSpaceBar  
[42485]({{site.repo.flutter}}/pull/42485) 重新上線 SliverAnimatedList  
[42842]({{site.repo.flutter}}/pull/42842) showDialog 與 showGeneralDialog 新增 "navigator" 選項  
[43286]({{site.repo.flutter}}/pull/43286) FadeInImage 支援 cacheWidth 與 cacheHeight  
[44289]({{site.repo.flutter}}/pull/44289) SliverOpacity  
[45127]({{site.repo.flutter}}/pull/45127) SliverIgnorePointer  
[45432]({{site.repo.flutter}}/pull/45432) 使用 RenderSliverPadding 來內縮 SliverFillViewport  

## iOS 支援

iOS 仍然是 Flutter 重要的投資領域之一。
本次發行對 Cupertino 函式庫進行了視覺更新，以符合 iOS 13 的外觀。
我們現在支援 Cupertino 元件的 dark mode，並新增了兩個新元件 [CupertinoContextMenu]({{site.api}}/flutter/cupertino/CupertinoContextMenu-class.html) 與 [CupertinoSlidingSegmentedControl]({{site.api}}/flutter/cupertino/CupertinoSlidingSegmentedControl-class.html)，同時也改進了 segmented control 元件、[CupertinoAlertDialog]({{site.api}}/flutter/cupertino/CupertinoAlertDialog-class.html) 與 [CupertinoDatePicker]({{site.api}}/flutter/cupertino/CupertinoDatePicker-class.html)。

[36871]({{site.repo.flutter}}/pull/36871) 審查 defaultTargetPlatform 的使用  
[37719]({{site.repo.flutter}}/pull/37719) CupertinoDynamicColor 及相關功能  
[38712]({{site.repo.flutter}}/pull/38712) iOS 安裝失敗時顯示處理錯誤  
[39056]({{site.repo.flutter}}/pull/39056) 修正背景顏色相關問題 #34741  
[39215]({{site.repo.flutter}}/pull/39215) CupertinoActionSheet dark mode 與精度提升  
[39289]({{site.repo.flutter}}/pull/39289) CupertinoActivityIndicator & CupertinoApp dark mode  
[39430]({{site.repo.flutter}}/pull/39430) 讓 CupertinoDynamicColor 支援 const 建構  
[39463]({{site.repo.flutter}}/pull/39463) 更新驗證以支援 Xcode11 版本  
[39585]({{site.repo.flutter}}/pull/39585) 移除 ios/usb artifacts 的備用程式碼  
[39590]({{site.repo.flutter}}/pull/39590) 修正 CupertinoPageRoute 的使用者手勢  
[39765]({{site.repo.flutter}}/pull/39765) CupertinoButton 與底部標籤列支援 dark mode  
[39927]({{site.repo.flutter}}/pull/39927) CupertinoDynamicColor.resolve 在傳入 null color 時回傳 null  
[40007]({{site.repo.flutter}}/pull/40007) CupertinoAlertDialog dark mode 與 CupertinoActionSheet 精度提升  
[40100]({{site.repo.flutter}}/pull/40100) 修正 tab scaffold 中 focus nodes 的釋放問題  
[40189]({{site.repo.flutter}}/pull/40189) Dark mode CupertinoNavigationBar  
[40447]({{site.repo.flutter}}/pull/40447) 為 flutter run 實作 mdns  
[40454]({{site.repo.flutter}}/pull/40454) Dark Mode R: Refresh Control  
[40466]({{site.repo.flutter}}/pull/40466) ModalRoutes 在 (cupertino) pop 動畫進行時忽略輸入  
[40864]({{site.repo.flutter}}/pull/40864) 將 iOS 與 Android 的 gitignore 規則移至各自資料夾  
[41326]({{site.repo.flutter}}/pull/41326) TextField 選取時例外  
[41355]({{site.repo.flutter}}/pull/41355) 修正縮排（主要在 collection literals 附近）  
[41384]({{site.repo.flutter}}/pull/41384) [flutter_tools] 回報 iOS mDNS 查詢失敗至分析  
[41431]({{site.repo.flutter}}/pull/41431) Cupertino { TabScafold, TextSelection, TextField } dark mode 與細微精度更新  
[41473]({{site.repo.flutter}}/pull/41473) 補上缺少的結尾逗號  
[41482]({{site.repo.flutter}}/pull/41482) [flutter_tool] 新增 ios-mdns 備援成功/失敗的分析事件  
[41644]({{site.repo.flutter}}/pull/41644) 正確縮排函式參數  
[41799]({{site.repo.flutter}}/pull/41799) 改善 iOS 13 scrollbar 精度  
[41828]({{site.repo.flutter}}/pull/41828) 在 plugin 範本中設定 DEFINES_MODULE=YES  
[41892]({{site.repo.flutter}}/pull/41892) 修正 CupertinoActivityIndicator 半徑  
[42025]({{site.repo.flutter}}/pull/42025) 在地化（localization）刷新  
[42032]({{site.repo.flutter}}/pull/42032) 更新 CupertinoActivityIndicator 顏色與漸層  
[42533]({{site.repo.flutter}}/pull/42533) 停用 text fields 的方向鍵焦點導覽  
[42550]({{site.repo.flutter}}/pull/42550) 為 TextField 與 TextFormField 新增 enableSuggestions 旗標  
[42563]({{site.repo.flutter}}/pull/42563) 為 CupertinoSlider 新增 thumb 顏色自訂功能  
[42602]({{site.repo.flutter}}/pull/42602) 當 CupertinoPageRoute 的 route builder 回傳 null 時正確拋出 FlutterError  
[42775]({{site.repo.flutter}}/pull/42775) CupertinoSlidingSegmentedControl  
[42790]({{site.repo.flutter}}/pull/42790) 以不同方式停用 text fields 的上下方向鍵焦點導覽  
[42924]({{site.repo.flutter}}/pull/42924) CupertinoDialogAction 缺少 super 呼叫  
[42964]({{site.repo.flutter}}/pull/42964) 使用 buildSettings 中的 PRODUCT_BUNDLE_IDENTIFIER 於 iOS flavor 尋找正確 bundle id  
[42967]({{site.repo.flutter}}/pull/42967) CupertinoAlertDialog 使用 MediaQuery viewInsets 進行內距填充  
[43918]({{site.repo.flutter}}/pull/43918) CupertinoContextMenu（iOS 13）  
[43932]({{site.repo.flutter}}/pull/43932) 更新 CupertinoSlidingSegmentedControl 控制/回饋機制  
[44149]({{site.repo.flutter}}/pull/44149) 在 CupertinoDatePicker date 模式下套用 minimumDate 與 maximumDate 限制  
[44391]({{site.repo.flutter}}/pull/44391) Segmented control 快速雙擊修正  
[44551]({{site.repo.flutter}}/pull/44551) 移除未使用的新元素  
[44743]({{site.repo.flutter}}/pull/44743) 排序 Localization 產生輸出  
[44870]({{site.repo.flutter}}/pull/44870) 新增 -runFirstLaunch 提示文字  
[45124]({{site.repo.flutter}}/pull/45124) 分析 dartpad  
[11350]({{site.repo.engine}}/pull/11350) iOS 上 Platform Views 的 Firebase 測試  
[11390]({{site.repo.engine}}/pull/11390) 在 touchend 上 preventDefault 以顯示 iOS 鍵盤  
[11413]({{site.repo.engine}}/pull/11413) iOS 模擬器單元測試似乎未考慮完整編譯單元  
[11530]({{site.repo.engine}}/pull/11530) 建立 iOS framework 時可選擇性移除 bitcode  
[11652]({{site.repo.engine}}/pull/11652) iOS platform view mutation XCUITests  
[11802]({{site.repo.engine}}/pull/11802) 調整 iOS frame start 時間以符合平台資訊  
[11807]({{site.repo.engine}}/pull/11807) 修正 iOS 上刪除泰文母音的 bug  
[11817]({{site.repo.engine}}/pull/11817) 平滑 iOS 不規則輸入事件傳遞  
[11886]({{site.repo.engine}}/pull/11886) 移除 iOS embedding engine 多餘的重複 channel 設定  
[12078]({{site.repo.engine}}/pull/12078) 分開管理 iOS contexts  
[12084]({{site.repo.engine}}/pull/12084) 將 user notification 相關方法的可用性限制於 iOS 10.0  
[12192]({{site.repo.engine}}/pull/12192) 更新 iOS 文字欄位位置，為拼字檢查做前置作業  
[12295]({{site.repo.engine}}/pull/12295) Issue 13238：於 iOS 上，當目前方向不允許時強制變更方向  
[12404]({{site.repo.engine}}/pull/12404) 支援 iOS switches 的無障礙標籤  
[12990]({{site.repo.engine}}/pull/12990) 修正 iOS 上的 a11y 崩潰  
[13029]({{site.repo.engine}}/pull/13029) iOS 最小測試框架  
[13051]({{site.repo.engine}}/pull/13051) Metal 構建時不提升 iOS deployment target  
[13093]({{site.repo.engine}}/pull/13093) iOS Platform View：修正 observer 過度釋放  
[13170]({{site.repo.engine}}/pull/13170) Issue 13238：於 iOS 上，當目前方向不允許時強制變更方向  
[13449]({{site.repo.engine}}/pull/13449) 修正 iOS 上多個 platform views 於場景中時的崩潰  
[13469]({{site.repo.engine}}/pull/13469) 修正 iOS 上 platform view gr context 過時問題  
[13651]({{site.repo.engine}}/pull/13651) 修正 iOS 水平無障礙滾動事件的滾動方向  
[13852]({{site.repo.engine}}/pull/13852) iOS insertText 預設不使用 downstream affinity  
[13857]({{site.repo.engine}}/pull/13857) 防止孤立語意物件參考已失效的 iOS 無障礙橋接  
[1370]({{site.github}}/flutter/plugins/pull/1370) [camera] Android 與 iOS 支援暫
