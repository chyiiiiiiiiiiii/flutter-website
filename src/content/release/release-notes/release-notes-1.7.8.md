---
title: Flutter 1.7.8 發行說明
shortTitle: 1.7.8 發行說明
description: Flutter 1.7.8 的發行說明。
---

1.7.8 版本是 5 月 1.5.4 穩定版的後續發行，合併了 1289 個 PR 並關閉了 184 個議題。
本次發行的主要主題包括：

*   支援 Android 32 位元與 64 位元套件
*   大量 iOS 功能與修復，
    包含更完善的文字編輯與在地化
*   透過 `flutter create` 的 `--androidx` 旗標，為新專案提供 [AndroidX 支援](https://github.com/flutter/flutter/pull/31028)
*   新元件：[RangeSlider](https://api.flutter.dev/flutter/material/RangeSlider-class.html)

如我們的[路線圖](https://github.com/flutter/flutter/blob/master/docs/roadmap/Roadmap.md)所述，
我們也持續在 Flutter engine 及 framework 上進行支援 Web 與桌面目標的相關工作；
不過，目前尚未適合一般用戶使用。

## 支援 32 位元與 64 位元 Android 套件

自 2019 年 8 月 1 日起，使用原生程式碼並以 Android 9 Pie 為目標的 Android 應用程式，在發佈至 Google Play 商店時，除了 32 位元版本外，[必須同時提供 64 位元版本](https://android-developers.googleblog.com/2019/01/get-your-apps-ready-for-64-bit.html)。由於所有 Flutter 應用程式都包含原生程式碼，這項規定將影響所有新提交至商店的 Flutter 應用程式，以及現有 Flutter 應用程式的更新。已發佈於商店的現有應用版本則不受影響。

本次發行已支援建構同時包含 32 位元與 64 位元二進位檔的 app bundle 與 APK，完成了我們在 [⟦L268⟧](https://github.com/flutter/flutter/issues/31922) 上的相關工作。使用本次版本建構 Android 應用程式時，您的 App Bundle 或 APK 現在預設同時支援 32 位元與 64 位元 CPU 架構。

## 重大變更（Breaking Changes）

以下為本次發行中的重大變更列表，包含每項變更的說明及在 Flutter 程式碼中如何處理。

*   [#29188](https://github.com/flutter/flutter/pull/29188) 修正 25807：於 sliver multibox 元件實作 move
*   [#29683](https://github.com/flutter/flutter/pull/29683) [根據裝置類型顯示/隱藏工具列與控制點](https://groups.google.com/d/msgid/flutter-announce/CAAzQ467mb_7ZC4-djDeWLiYEmAH815-R5eums2cWmo2ND%3Dz%3DOw%40mail.gmail.com.)
*   [#30040](https://github.com/flutter/flutter/pull/30040) 為桌面平台實作 focus traversal（焦點遍歷），shoehorn 版本。
*   [#30579](https://github.com/flutter/flutter/pull/30579) [PointerDownEvent 與 PointerMoveEvent 的預設 buttons 設為 1](https://groups.google.com/d/msgid/flutter-announce/9ed026a5-f6e3-438d-b4fd-303ae444323d%40googlegroups.com.)
*   [#30874](https://github.com/flutter/flutter/pull/30874) 重做「移除部分 pointer events 的壓力自訂」
*   [#31227](https://github.com/flutter/flutter/pull/31227) [新增 CupertinoTabController](https://groups.google.com/d/msgid/flutter-announce/a1e7e4df-0310-4083-93b6-12ffd150dad0%40googlegroups.com.)
*   [#31574](https://github.com/flutter/flutter/pull/31574) 改善 RadioListTile Callback 行為一致性
*   [#32059](https://github.com/flutter/flutter/pull/32059) 修正 issue 14014 唯讀文字欄位
*   [#32842](https://github.com/flutter/flutter/pull/32842) 允許 "from" hero 狀態於 hero 動畫 push 轉場中保留
*   [#33148](https://github.com/flutter/flutter/pull/33148) ExpandIcon 支援自訂顏色
*   [#33164](https://github.com/flutter/flutter/pull/33164) [移除 Layer.replaceWith，因無使用且無測試](https://groups.google.com/d/msgid/flutter-announce/f9823aec-676a-41e9-a9ff-b6598c63b7fe%40googlegroups.com)
*   [#33370](https://github.com/flutter/flutter/pull/33370) [更新 FadeInImage 以使用新 Image API]( https://groups.google.com/d/msgid/flutter-announce/CAA8mi4cGh6BVXS5u0g_7Kep6LOL6gO5htViMTgS%2BkMJ08oAjAQ%40mail.gmail.com.)
*   [#34051](https://github.com/flutter/flutter/pull/34051) [Text inline widgets, TextSpan 重構 (#30069)，改善向後相容性](https://groups.google.com/d/msgid/flutter-announce/CAN87bmyu29-ikjeSouVFNcpR7OEL95NPLnb7DN-F8bVLsnzkzQ%40mail.gmail.com.)
*   [#34095](https://github.com/flutter/flutter/pull/34095) [Cupertino 文字編輯 tooltip，重構](https://groups.google.com/d/msgid/flutter-announce/f7cc747a-c812-4bab-a97c-4adb4ce04084%40googlegroups.com.)
*   [#34501](https://github.com/flutter/flutter/pull/34501) [Material] 修正 RangeSliderThumbShape 與 RangeSliderValueIndicatorShape 的 TextDirection 與選取滑塊
*   [#33946](https://github.com/flutter/flutter/pull/33946) 重新上線「Text inline widgets, TextSpan 重構」

## 嚴重崩潰修正

我們也在本次發行中修正了多個導致崩潰的問題。

*   [#31228](https://github.com/flutter/flutter/pull/31228) 修正 ExpansionPanelList 重複 Global Keys 例外
*   [#31581](https://github.com/flutter/flutter/pull/31581) 修正巢狀 TabBarView 銷毀時的例外
*   [#34460](https://github.com/flutter/flutter/pull/34460) 恢復可於 Gradle 覆寫本地 engine 的能力

## iOS

我們持續專注於 Flutter 的 iOS 支援，本次發行包含更強化的文字編輯與在地化。

*   [#29809](https://github.com/flutter/flutter/pull/29809) 修正文字選取工具列出現在遮蔽物下方
*   [#29824](https://github.com/flutter/flutter/pull/29824) Cupertino 在地化第 8 步：建立 gen_cupertino_localizations 並產生英文與法文的 cupertino 在地化
*   [#29954](https://github.com/flutter/flutter/pull/29954) Cupertino 在地化第 9 步：新增測試
*   [#30129](https://github.com/flutter/flutter/pull/30129) 修正 gallery demo 中的 refresh control，並更新註解
*   [#30224](https://github.com/flutter/flutter/pull/30224) Cupertino 在地化第 10 步：更新 flutter_localizations 的 README
*   [#31039](https://github.com/flutter/flutter/pull/31039) 修正使用 flutter run 啟動 iOS 時的 bundle id
*   [#31308](https://github.com/flutter/flutter/pull/31308) CupertinoDialogAction 當 isDefaultAction 為 true 時新增粗體字型
*   [#31326](https://github.com/flutter/flutter/pull/31326) 新增更多隨機 cupertino 圖示
*   [#31332](https://github.com/flutter/flutter/pull/31332) iOS 選取控制點不可見
*   [#31464](https://github.com/flutter/flutter/pull/31464) CupertinoPicker 精細度修正
*   [#31623](https://github.com/flutter/flutter/pull/31623) 修正邊緣滑動與回到起點的問題
*   [#31644](https://github.com/flutter/flutter/pull/31644) Cupertino 在地化第 12 步：推送所有支援語言的翻譯
*   [#31687](https://github.com/flutter/flutter/pull/31687) 置中 iOS 游標，移除不會縮放的固定偏移量
*   [#31763](https://github.com/flutter/flutter/pull/31763) 修正 ScrollbarPainter thumbExtent 計算並新增 padding
*   [#31852](https://github.com/flutter/flutter/pull/31852) 文字選取控制點有時無法互動
*   [#32013](https://github.com/flutter/flutter/pull/32013) Cupertino 土耳其語翻譯
*   [#32086](https://github.com/flutter/flutter/pull/32086) 修正 CupertinoSliverRefreshControl 的 onRefresh callback
*   [#32469](https://github.com/flutter/flutter/pull/32469) 讓 CupertinoNavigationBarBackButton 可自訂 onPressed
*   [#32513](https://github.com/flutter/flutter/pull/32513) Cupertino 在地化第 12 步第 2 次嘗試：推送所有支援語言的翻譯
*   [#32620](https://github.com/flutter/flutter/pull/32620) 為 TextField 新增 ScrollController
*   [#32823](https://github.com/flutter/flutter/pull/32823) 為 CupertinoTextField 新增 enableInteractiveSelection
*   [#32974](https://github.com/flutter/flutter/pull/32974) 修正停用狀態下的 CupertinoTextField 樣式
*   [#33450](https://github.com/flutter/flutter/pull/33450) IosProject.isSwift 不再回傳 null
*   [#33624](https://github.com/flutter/flutter/pull/33624) 修正 CupertinoTabScaffold 異常
*   [#33634](https://github.com/flutter/flutter/pull/33634) 支援顯示捲軸
*   [#33653](https://github.com/flutter/flutter/pull/33653) 將 TextEditingController API 加入有關 dispose 的建議
*   [#33684](https://github.com/flutter/flutter/pull/33684) 停用 Xcode build phase 中 CocoaPods 的 input 與 output 路徑，並採用新 Xcode build system
*   [#33739](https://github.com/flutter/flutter/pull/33739) 修正 cupertinoTextField placeholder 的 textAlign
*   [#33852](https://github.com/flutter/flutter/pull/33852) 停用 Xcode build phase 中 CocoaPods 的 input 與 output 路徑，並採用新 Xcode build system
*   [#34293](https://github.com/flutter/flutter/pull/34293) 將 Xcode developmentRegion 改為 'en'，CFBundleDevelopmentRegion 改為 DEVELOPMENT_LANGUAGE
*   [#34964](https://github.com/flutter/flutter/pull/34964) CupertinoTextField.onTap

## Android

本次發行針對 Android 進行了多項改進，包括來自外部貢獻者的新 AndroidX 支援（感謝 [Josh](https://github.com/athornz)！），以及符合 [Google Play 商店新政策](https://developer.android.com/distribute/best-practices/develop/64-bit) 的 64 位元與 32 位元 APK 套件支援。

*   [#31028](https://github.com/flutter/flutter/pull/31028) 新增產生使用 AndroidX 支援函式庫的專案功能
*   [#31359](https://github.com/flutter/flutter/pull/31359) 移除 Android 動態修補建構支援
*   [#31491](https://github.com/flutter/flutter/pull/31491) 允許 adb stdout 包含 port 號時不會失敗
*   [#31835](https://github.com/flutter/flutter/pull/31835) 將 ADB CrOS 修正回補至 beta
*   [#32787](https://github.com/flutter/flutter/pull/32787) 支援 32 與 64 位元
*   [#33191](https://github.com/flutter/flutter/pull/33191) 移除 Gradle 任務名稱中的冒號，因已棄用
*   [#33611](https://github.com/flutter/flutter/pull/33611) 使用 Dart 新的 ELF 產生器將 AOT blobs 打包為 Android APK 的共享函式庫
*   [#33696](https://github.com/flutter/flutter/pull/33696) 產生 ELF 共享函式庫並允許 APK 與 App bundle 中有多 ABI 函式庫
*   [#33901](https://github.com/flutter/flutter/pull/33901) 回應 AndroidView 的 focus 事件
*   [#33923](https://github.com/flutter/flutter/pull/33923) [flutter_tool] 追蹤 APK sha 計算時間
*   [#33951](https://github.com/flutter/flutter/pull/33951) 白名單 adb.exe heap corruption 的結束碼
*   [#34066](https://github.com/flutter/flutter/pull/34066) 為 modules pubspec.yaml 範本新增 androidX 旗標
*   [#34123](https://github.com/flutter/flutter/pull/34123) 產生 ELF 共享函式庫並允許 APK 與 App bundle 中有多 ABI 函式庫

## Material

本次發行對現有 Material 元件進行了多項改進，包括 DatePicker、SnackBar 與 TimePicker，同時也新增了一個新元件：[RangeSlider](https://api.flutter.dev/flutter/material/RangeSlider-class.html)。

*   [#30572](https://github.com/flutter/flutter/pull/30572) [Material] 自適應 Slider 建構子
*   [#30884](https://github.com/flutter/flutter/pull/30884) [Material] 更新 TabController 以支援動態 Tabs
*   [#31018](https://github.com/flutter/flutter/pull/31018) [Material] BottomNavigationBar 上已選/未選標籤樣式與圖示主題
*   [#31025](https://github.com/flutter/flutter/pull/31025) Scaffold 元件新增 scrimColor 屬性
*   [#31275](https://github.com/flutter/flutter/pull/31275) 更新 SnackBar 以支援 Material 規範的新樣式
*   [#31295](https://github.com/flutter/flutter/pull/31295) 改善 ThemeData.accentColor 與 secondary color 的關聯
*   [#31318](https://github.com/flutter/flutter/pull/31318) 新增 BottomSheetTheme 以主題化 BottomSheet 的顏色、高度、形狀
*   [#31438](https://github.com/flutter/flutter/pull/31438) 實作 Material 按鈕的 focus 與 hover 處理
*   [#31514](https://github.com/flutter/flutter/pull/31514) Date picker 版面例外修正
*   [#31566](https://github.com/flutter/flutter/pull/31566) TimePicker 在選擇小時後自動切換到分鐘模式
*   [#31662](https://github.com/flutter/flutter/pull/31662) SliverAppBar 新增 shape 屬性
*   [#31681](https://github.com/flutter/flutter/pull/31681) [Material] 建立可主題化的 Range Slider（連續與離散）
*   [#31693](https://github.com/flutter/flutter/pull/31693) 為 Radio/RadioListTile 的 onChange 新增註解
*   [#31902](https://github.com/flutter/flutter/pull/31902) 更新 primaryColor 文件以參考 colorScheme 屬性
*   [#31938](https://github.com/flutter/flutter/pull/31938) 使用正確的 const 格式更新 scrimDrawerColor
*   [#32053](https://github.com/flutter/flutter/pull/32053) 增加 TimePicker 觸控目標範圍
*   [#32070](https://github.com/flutter/flutter/pull/32070) 將 foreground 與 background 重新命名為 light 與 dark
*   [#32527](https://github.com/flutter/flutter/pull/32527) PopupMenuButton 新增 'enabled' 屬性
*   [#32726](https://github.com/flutter/flutter/pull/32726) Material 不應阻止 ScrollNotifications 向上冒泡
*   [#32904](https://github.com/flutter/flutter/pull/32904) Tooltip 與 InkWell 使用 reverseDuration
*   [#32911](https://github.com/flutter/flutter/pull/32911) Material 長按文字控制點閃爍
*   [#33073](https://github.com/flutter/flutter/pull/33073) SliverAppBar shape 屬性
*   [#34869](https://github.com/flutter/flutter/pull/34869) [Material] 正確呼叫 Range Slider 的 onChangeStart 與 onChangeEnd
*   [#32950](https://github.com/flutter/flutter/pull/32950) Material 在未收合時允許「全選」

## Web

Web 功能的開發持續進行，已將 flutter_web 倉庫的程式碼合併進主 flutter 倉庫，讓這項預覽技術的開發體驗更簡單。我們已經[將許多現有的 Flutter 範例編譯成 Web 版本]({{site.github}}/flutter/samples/)。
歡迎體驗！

*   [#32360](https://github.com/flutter/flutter/pull/32360) 允許使用 flutter 編譯 flutter web
*   [#33197](https://github.com/flutter/flutter/pull/33197) 為 web 接上 hot restart 與增量重建
*   [#33406](https://github.com/flutter/flutter/pull/33406) 為 Platform.isPlatform getter 新增 web 安全間接層
*   [#33525](https://github.com/flutter/flutter/pull/33525) flutter test 新增 –platform=chrome 支援
*   [#33533](https://github.com/flutter/flutter/pull/33533) 重新上線 - 為 web 接上 hot restart 與增量重建
*   [#33629](https://github.com/flutter/flutter/pull/33629) 使用 webkit inspection protocol 為 web 新增更真實的 restart
*   [#33859](https://github.com/flutter/flutter/pull/33859) 重新上線 flutter test 支援 platform chrome
*   [#33892](https://github.com/flutter/flutter/pull/33892) 新增 web 體積追蹤基準測試
*   [#33956](https://github.com/flutter/flutter/pull/33956) 為 flutter web 應用程式產生程式進入點
*   [#34018](https://github.com/flutter/flutter/pull/34018) 新增 flutter create for the web
*   [#34084](https://github.com/flutter/flutter/pull/34084) 讓 web 執行變得「spooky」
*   [#34112](https://github.com/flutter/flutter/pull/34112) 分離 web 與 io 的 network image 實作
*   [#34159](https://github.com/flutter/flutter/pull/34159) flutter web 使用 product define 並移除多餘資產伺服器
*   [#34589](https://github.com/flutter/flutter/pull/34589) 移除大部分 build web 的目標邏輯，清理規則
*   [#34856
