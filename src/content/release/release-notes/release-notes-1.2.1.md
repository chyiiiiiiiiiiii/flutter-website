---
title: Flutter 1.2.1 版本說明
shortTitle: 1.2.1 版本說明
description: Flutter 1.2.1 的版本說明。
---

自 Flutter v1.0 發布以來，我們的首要任務一直是持續解決由 Flutter 開發者及 Flutter 團隊本身回報的高優先級問題。
自去年十二月以來，我們已在 Flutter 引擎與框架中合併了 672 個 pull requests（我們真的很忙！）。
以下我們特別列出了值得注意的新功能與重大變更。這些變更大多來自 Framework 和 Tool 標籤，但我們也發現並修復了幾個嚴重問題。

## Framework

為了更完整地強化 Flutter 的動畫（Animation）支援，本次版本新增了多個標準緩動（easing）函式：

[#25788](https://github.com/flutter/flutter/pull/25788) 新增 Robert Penner 的 easing 函式

為了更好地整合 Android，本次版本新增了對 [Android App Bundles][Android App Bundles] 的支援，
這是一種新的封裝格式，有助於減少應用程式大小，並啟用 Android 應用的動態交付等新功能：

[#24440](https://github.com/flutter/flutter/pull/24440) 新增對 Android App Bundle 的支援

為了更好地整合 iOS，本次版本針對 iOS 新增了多項功能與修正，包括全新的 CupertinoTheme：

[#25183](https://github.com/flutter/flutter/pull/25183) 為 CupertinoTabView 新增 navigatorKey

[#25593](https://github.com/flutter/flutter/pull/25593) 讓 CupertinoTabScaffold 也能處理鍵盤內嵌（insets）

[#24876](https://github.com/flutter/flutter/pull/24876) 在 iOS 上新增淡入淡出效果、圓角、修正游標偏移與高度

[#23759](https://github.com/flutter/flutter/pull/23759) 新增 CupertinoTheme

除了 iOS 的 Cupertino 主題支援外，本次版本也持續強化 Material 主題：

[#24169](https://github.com/flutter/flutter/pull/24169) [Material] 對話框支援主題化的 elevation

[#25339](https://github.com/flutter/flutter/pull/25339) [Material] AlertDialog 支援主題化的 TextStyles

為了更好地支援桌面型態裝置（如 Android 平板、ChromeOS 以及桌面網頁和桌面作業系統），本次版本進一步將鍵盤與滑鼠作為一等輸入裝置進行支援：

[#7758](https://github.com/flutter/engine/pull/7758) 建議的組合字元實作

[#27853](https://github.com/flutter/flutter/pull/27853) 將字元事件與未修改的 code points 連接到 Android 原始鍵盤事件處理

[#27620](https://github.com/flutter/flutter/pull/27620) 新增鍵盤 key code 產生器

[#27627](https://github.com/flutter/flutter/pull/27627) 新增對 logical 與 physical key events 的支援

[#6961](https://github.com/flutter/engine/pull/6961) 為引擎新增 hover 事件支援

[#24830](https://github.com/flutter/flutter/pull/24830) 實作滑鼠指標的 hover 支援

由於元件（Widgets）是 Flutter 與使用者互動的核心方式，本次版本持續為 Flutter 元件集新增功能與修正，特別針對 [SliverAppBar](https://api.flutter.dev/flutter/material/SliverAppBar-class.html) 進行了優化：

[#26021](https://github.com/flutter/flutter/pull/26021) 修正 SliverAppBar 標題透明度並測試所有情境

[#26101](https://github.com/flutter/flutter/pull/26101) 修正 floating snapping SliverAppBar 當機問題

[#25091](https://github.com/flutter/flutter/pull/25091) 為 SliverAppBar 文件新增動畫（Animation）說明

[#24736](https://github.com/flutter/flutter/pull/24736) 為 FAB（Floating Action Button）提供更多位置選擇

[#25585](https://github.com/flutter/flutter/pull/25585) 在 TextStyle 中公開字型備援（font fallback）API，Roll engine 54a3577c0139..215ca1560088

[#24457](https://github.com/flutter/flutter/pull/24457) 修訂 Material TextField 在 Android 與 iOS 上的手勢

[#24554](https://github.com/flutter/flutter/pull/24554) 新增 force press 手勢偵測器與辨識器

[#23919](https://github.com/flutter/flutter/pull/23919) 允許偵測 TabBar 上的點擊

[#25384](https://github.com/flutter/flutter/pull/25384) 新增浮動游標（floating cursor）支援

[#24976](https://github.com/flutter/flutter/pull/24976) 支援 TextField 多行提示文字（multi-line hint text）

[#26332](https://github.com/flutter/flutter/pull/26332) Strut：可精細控制文字最小行高，允許強制行高為指定高度

最後，隨著 Flutter 在全球的使用持續成長，我們也持續增強多語系在地化（localizations）支援，本次版本新增了烏克蘭語、波蘭語、斯瓦希里語與加利西亞語等語言。

[#25394](https://github.com/flutter/flutter/pull/25394) 更新在地化（localizations）

[#27506](https://github.com/flutter/flutter/pull/27506) 新增斯瓦希里語（material_sw.arb）支援

[#27352](https://github.com/flutter/flutter/pull/24876) 新增加利西亞語支援


## Plug-Ins

如同在框架與引擎本身，我們也持續聚焦於插件（plugin）品質：

[flutter/engine#7317](https://github.com/flutter/engine/pull/7317) 修正 iOS platform views 的過時 GrContext 問題

[flutter/engine#7558](https://github.com/flutter/engine/pull/7558) 修正 iOS platform views 遺失觸控事件問題

[flutter/plugins#1157](https://github.com/flutter/plugins/pull/1157) [google_maps_flutter] 修正 iOS 上相機定位問題

[flutter/plugins#1176](https://github.com/flutter/plugins/pull/1176) [firebase_auth] 修正 Android 上 Firebase 手機驗證問題

[flutter/plugins#1037](https://github.com/flutter/plugins/pull/1037) [camera] 在 iOS 上儲存照片方向

[flutter/plugins#1129](https://github.com/flutter/plugins/pull/1129) [android_alarm_manager] 修正「不允許背景啟動」問題，將過早收到的事件排隊

[flutter/plugins#1051 ](https://github.com/flutter/plugins/pull/1051) [image_picker] 修正 iOS 上多次點擊選擇器時的當機問題

webview_flutter 插件新增了 Dart 與 JavaScript 之間的通訊通道：

[flutter/plugins#1116](https://github.com/flutter/plugins/pull/1116) 新增 WebView JavaScript 通道（Dart 端）

[flutter/plugins#1130](https://github.com/flutter/plugins/pull/1130) WebView JavaScript 通道 Android 實作

[flutter/plugins#1139](https://github.com/flutter/plugins/pull/1139) WebView JavaScript 通道 iOS 實作

[lutter/plugins1021](https://github.com/flutter/plugins/pull/1021) JavaScript 評估（evaluation）iOS/Android

我們在 In App Purchase 插件（目前仍為預覽版）上也有進展：

[#1057](https://github.com/flutter/plugins/pull/1057) [IAP] 檢查支付處理器是否可用

[#1084](https://github.com/flutter/plugins/pull/1084) [IAP] 從 Google Play 取得 SkuDetails

[#1068](https://github.com/flutter/plugins/pull/1068) IAP 產品清單 iOS

[#1172](https://github.com/flutter/plugins/pull/1172) [In_app_purchase] 新增支付 objc 翻譯器


## Dart

本次版本包含新版 Dart SDK，支援新的 set 字面值語法，並透過減少呼叫建構子或靜態方法的開銷，將 AOT 執行效能提升 10-20%：

[#37](https://github.com/dart-lang/language/issues/37) Set 字面值

[#33274](https://github.com/dart-lang/sdk/issues/33274) 新增對「裸指令」的支援：全域物件池、PC 相對靜態呼叫、更快的間接呼叫、潛在的程式碼共用


## Tool

本次版本新增了多項新工具與現有工具的新功能。

本次版本持續改善多種工具的錯誤訊息：

[#26107](https://github.com/flutter/flutter/pull/26107) 為 flutter tool --dynamic 旗標提供更好的錯誤訊息

[#26084](https://github.com/flutter/flutter/pull/26084) 儲存編譯訓練資料時改善訊息

[#25863](https://github.com/flutter/flutter/pull/25863) 使用動態修補時提供更友善的訊息

本次版本也新增了對 Java 1.8 的支援：

[#25470](https://github.com/flutter/flutter/pull/25470) 支援 Java 1.8


## Severe

在本次版本中，我們發現並修正了前一版本的幾個嚴重問題，包括兩個當機與一個效能下降問題。

當機

[#7314](https://github.com/flutter/flutter/issues/7314) Flutter 啟動時當機（metabug）

效能

[#25381](https://github.com/flutter/flutter/pull/25381) 在 device lab 新增 cull opacity 效能測試


## 重大變更（Breaking Changes）

為了自 1.0 以來持續改進 Flutter 以滿足用戶需求，我們做出了一些重大變更：

### [#8769](https://github.com/flutter/flutter/pull/8769) 將 ListItem 更名為 ListTile，並記錄 ListTile 固定高度的幾何資訊

許多開發者對 ListItem 為固定高度感到困惑。我們將其更名為 ListTile，以表示（如同其他 tile 一樣）其高度是固定的，並已在文件中明確說明 ListTile 的這一特性。你需要將程式碼中的 ListItem 類別實例更名為 ListTile。

### [#7518](https://github.com/flutter/engine/pull/7518) 更新 iOS 嵌入的預設 flutter_assets 路徑

iOS 應用的 Flutter 資源（assets）現在位於 Frameworks/App.framework/flutter_assets，而非原本的 flutter_assets。flutter 命令列工具會自動處理這項差異，但如果你正在為 iOS 撰寫 AddToApp 應用並與 Flutter 共用資源，請留意此變更。


### [#27697](https://github.com/flutter/flutter/pull/27697) Cupertino TextField 游標修正

CupertinoTextField 的 cursorColor 預設值現在會與應用程式主題一致。如果你不希望這樣，可以使用 ThemeData 的 cupertinoOverrideTheme 屬性，透過 CupertinoThemeData 物件提供 Cupertino 專屬的覆寫，例如： 
 
```dart
Widget build(BuildContext context) { 
  // Set theme data for override in the CupertinoThemeData's constructor 
  Theme.of(context).cupertinoOverrideTheme = CupertinoThemeData(  
    brightness: Brightness.dark,  
    primaryColor: Color(0xFF42A5F5) 
  ); 
  return Text( 
    'Example', 
    style: Theme.of(context).textTheme.title, 
  ); 
}
```


### [#23424](https://github.com/flutter/flutter/pull/23424) 為 DragGestureRecognizer 增加拖曳開始行為設定

預設情況下，拖曳手勢偵測器（drag gesture detector）的 `onStart` 回呼函式會在偵測到拖曳手勢的位置（也就是拖曳超過一定像素數後）被呼叫，而不是在觸控按下（touch down）的位置。若要在指定的拖曳手勢辨識器（drag gesture recognizer）中使用舊有的行為，應將該辨識器的 `dragStartBehavior` 變數設為 `DragStartBehavior.down`，例如在宣告 GestureDecorator 時，請加入下方粗體標示的那一行：

```dart
GestureDectector( 
  dragStartBehavior: DragStartBehavior.down,
  onVerticalDragDown: myDragDown 
  onVerticalDragEnd: myDragEnd, 
  onVerticalDragStart: myDragStart, 
  onVerticalDragUpdate: myDragUpdate, 
  onVerticalDragCancel: myDragCancel, 
  onHorizontalDragDown: myDragDown 
  onHorizontalDragEnd: myDragEnd, 
  onHorizontalDragStart: myDragStart, 
  onHorizontalDragUpdate: myDragUpdate, 
  onHorizontalDragCancel: myDragCancel, 
// Other fields… 
```


### [#26238](https://github.com/flutter/flutter/pull/26238) 移除長期棄用的 TwoLevelList

已移除長期棄用的 TwoLevelList 元件；請改用 ListView 搭配 ExpansionTile。參見[此範例](https://github.com/flutter/flutter/blob/v1.2.1/examples/catalog/lib/expansion_tile_sample.dart)，以了解如何使用 ExpansionTile。

### [#7442](https://github.com/flutter/engine/pull/7442) 將 Picture.toImage 的光柵化移至 GPU 執行緒

Picture.toImage 現在會回傳 `Future<Image>`。這使得圖片的光柵化可以在 GPU 執行緒上進行，在許多情況下可提升效能並確保結果正確。至少，您需要將呼叫 Picture 實例的方法宣告為 async，並使用 await，如下所示：

```dart
void usePictureImage(Picture p) async { 
  var image = await p.toImage(); 
  // Do something with the pixels in image…. 
}
```

然而，你的應用程式很可能還會執行其他非同步操作，因此你應該考慮如何在這樣的情境下處理圖片處理。關於 Dart 對非同步程式設計與 Future 類別的支援，請參閱 [https://www.dartlang.org/tutorials/language/futures.](https://www.dartlang.org/tutorials/language/futures)

### [#7567](https://github.com/flutter/engine/pull/7567) embedder.h 中的 FlutterResult 更名

在 Embedder API 中，`FlutterResult` 型別已更名為 `FlutterEngineResult`，以更清楚地說明其用途。你需要將所有出現 `FlutterResult` 的地方更名為 `FlutterEngineResult`。

### [#7414](https://github.com/flutter/engine/pull/7414) Strut 實作

將 `dart:ui` 的 `ParagraphStyle.lineHeight` 更名為 `ParagraphStyle.height`。`ParagraphStyle.lineHeight` 屬性先前並未發揮任何作用，這次更名是為了與 `TextStyle.height` 保持一致。你需要將所有出現 `lineHeight` 的地方更名為 `height`。

## 回歸問題（Regressions）

在 1.2 版本釋出後不久，我們發現了兩個回歸問題：

* [#28640](https://github.com/flutter/flutter/issues/28640) NoSuchMethodError: android.view.MotionEvent.isFromSource

[flutter/flutter#24830](https://github.com/flutter/flutter/pull/24830)（「為滑鼠指標實作 hover 支援。」）使用了舊裝置上不存在的 Android API。這可能會導致 Android 4.1（Jellybean）及 4.1（Jellybean MR1）發生閃退。

* [#28484](https://github.com/flutter/flutter/issues/28484) Flutter 更新後元件（Widget）渲染異常

這可能會在實體 iOS 裝置載入特定圖片時造成渲染問題。

若要取得這些回歸問題的修正，當 1.3 beta 於三月釋出後，你可以切換到 beta 頻道，並在命令列執行 `flutter upgrade`。在撰寫本文時，這將會把你的 Flutter 更新到至少 1.3.8 版，其中包含 [flutter/engine#8006](https://github.com/flutter/engine/pull/8006)（「防止在 API 等級 16 & 17 中使用未定義的 Android API」）以及修正渲染問題的 Skia commit。針對閃退問題，受影響的兩個 Android 版本已經超過十年歷史，最多僅佔 Android 使用者的 2.5%，而且這些用戶很少會安裝新應用程式，不論是否為 Flutter 應用。即便如此，我們仍不希望在穩定版中留下已知的回歸問題，但經過內部多次討論後，我們認為這是對 Flutter 開發者及其應用程式使用者最好的處理方式。

我們理想的嚴重問題修正方式，是釋出「hotfix」版本，從現有版本中「cherry pick」（挑選）想要套用的修正。我們已在 1.2 版本實作了對穩定版 hotfix 的能力，但尚未達到生產等級。這導致如果我們釋出帶有修正的「1.2.1-a」穩定版，所有用戶都會被困在那個分支；若要升級到未來的分支，用戶必須移除並重新安裝 Flutter，這顯然是不可接受的。我們正努力驗證 1.3+ 版本的 hotfix 能力，以避免未來再發生此問題。

另一個選擇是將 1.3 升級為穩定版。我們目前的政策是每季只釋出一次穩定版，以減少 Flutter 開發者的變動負擔。撰寫本文時，預備穩定的 1.3 版本包含了 104 個 framework commit（以及更多 engine、Dart 和 Skia 的 commit），其中任何一個都可能影響你現有應用程式的運作。為了降低風險，我們會讓版本在 beta 頻道停留一個月，讓開發者測試，只有在我們有信心時才會將其升級為穩定版。這就是我們如何維持每季穩定釋出的方式。

我們下一個穩定版目前預計在 2019 年 5 月釋出，這將是第一個包含此回歸問題修正的穩定版。如果你受到 [#28640](https://github.com/flutter/flutter/issues/28640) 影響，且認為使用預先釋出的 1.3 不是可行選項，請在 [flutter/flutter#29235](https://github.com/flutter/flutter/issues/29235) 上告訴我們。同樣地，如果你受到 [#28484](https://github.com/flutter/flutter/issues/28484) 影響，請在 [flutter/flutter/#29360](https://github.com/flutter/flutter/issues/29360) 上留言。如果我們發現 Flutter 社群有大量回饋認為我們的決策不妥，我們會根據你的意見重新評估。畢竟 Flutter 是社群共同努力的成果，你的意見非常重要。

## 工具相關釋出

除了 1.2 版的 Flutter framework 變更外，我們在同一時期也釋出了多項工具相關版本，你可以在這裡閱讀：

*   Visual Studio Code 的 Dart & Flutter 支援：[2.21](https://dartcode.org/releases/v2-21/)、[2.22](https://dartcode.org/releases/v2-22/)、[2.23](https://dartcode.org/releases/v2-23/) 和 [2.24](https://dartcode.org/releases/v2-24/) 版本。
*   IntelliJ & Android Studio 的 Dart & Flutter 支援：[2019 年 1 月](https://groups.google.com/forum/#!searchin/flutter-dev/nilay%7Csort:date/flutter-dev/VCfGRhDsHgs/JcYKxkxHBAAJ) 與 [2019 年 2 月](https://groups.google.com/forum/#!searchin/flutter-dev/nilay%7Csort:date/flutter-dev/VCfGRhDsHgs/JcYKxkxHBAAJ) 版本。
*   Dart DevTools [alpha 版](/tools/devtools)。

## 完整議題清單

你可以參閱[本次釋出所合併的 PR 完整清單](/release/release-notes/changelogs/changelog-1.2.1)。

[Android App Bundles]: https://developer.android.com/guide/app-bundle/
