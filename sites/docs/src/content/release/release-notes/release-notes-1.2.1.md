---
title: Flutter 1.2.1 版本說明
shortTitle: 1.2.1 版本說明
description: Flutter 1.2.1 的版本說明。
skipTemplateRendering: true
---

自 Flutter v1.0 發布以來，我們的首要任務就是持續解決 Flutter 開發者和 Flutter 團隊本身回報的重要問題。
自去年十二月以來，我們已在 Flutter 引擎與框架中合併了 672 個 pull requests（我們真的很忙！）。
以下我們列出了這次版本中值得注意的新功能與破壞性變更。最大幅度的更新來自 Framework 和 Tool 標籤，但我們也發現並修正了幾個嚴重（Severe）問題。

## Framework

為了更完整地強化 Flutter 的動畫（Animation）支援，本次版本新增了多個標準的緩動（easing）函式：

[#25788](https://github.com/flutter/flutter/pull/25788) 新增 Robert Penner 的 easing 函式

為了更好地整合 Android，本次版本加入了對 [Android App Bundles][Android App Bundles] 的支援，
這是一種新的封裝格式，有助於減少應用程式大小，並啟用如 Android 動態交付等新功能：

[#24440](https://github.com/flutter/flutter/pull/24440) 新增對 Android App Bundle 的支援

為了更好地整合 iOS，本次版本針對 iOS 新增了多項功能與修正，包括全新的 CupertinoTheme：

[#25183](https://github.com/flutter/flutter/pull/25183) 為 CupertinoTabView 新增 navigatorKey

[#25593](https://github.com/flutter/flutter/pull/25593) 讓 CupertinoTabScaffold 也能處理鍵盤間距（insets）

[#24876](https://github.com/flutter/flutter/pull/24876) 在 iOS 上新增淡入淡出效果、圓角、修正游標偏移與高度

[#23759](https://github.com/flutter/flutter/pull/23759) 新增 CupertinoTheme

除了 iOS Cupertino 主題支援外，本次版本也持續強化 Material 主題：

[#24169](https://github.com/flutter/flutter/pull/24169) [Material] 對話框（dialogs）支援主題化的 elevation

[#25339](https://github.com/flutter/flutter/pull/25339) [Material] AlertDialog 支援主題化的 TextStyles

為了更好地支援桌面裝置型態，如 Android 平板、ChromeOS 以及桌面網頁與桌面作業系統，這次版本進一步強化了鍵盤與滑鼠作為一級輸入裝置的支援：

[#7758](https://github.com/flutter/engine/pull/7758) 推薦的組合字元實作

[#27853](https://github.com/flutter/flutter/pull/27853) 將字元事件與未修改的 code points 連接到 Android 原始鍵盤事件處理

[#27620](https://github.com/flutter/flutter/pull/27620) 新增鍵盤 key code 產生器

[#27627](https://github.com/flutter/flutter/pull/27627) 新增對邏輯與實體鍵盤事件的支援

[#6961](https://github.com/flutter/engine/pull/6961) 為引擎新增 hover 事件支援

[#24830](https://github.com/flutter/flutter/pull/24830) 為滑鼠指標實作 hover 支援

元件 (Widget) 是 Flutter 與使用者互動的核心方式，本次版本持續為 Flutter 元件集新增功能與修正，特別針對 [SliverAppBar](https://api.flutter.dev/flutter/material/SliverAppBar-class.html)：

[#26021](https://github.com/flutter/flutter/pull/26021) 修正 SliverAppBar 標題透明度，並測試所有情境

[#26101](https://github.com/flutter/flutter/pull/26101) 修正浮動吸附（floating snapping）SliverAppBar 當機問題

[#25091](https://github.com/flutter/flutter/pull/25091) 為 SliverAppBar 文件新增動畫（Animation）說明

[#24736](https://github.com/flutter/flutter/pull/24736) 為 FAB（Floating Action Button）提供更多位置選項

[#25585](https://github.com/flutter/flutter/pull/25585) 在 TextStyle 中公開字體備援（font fallback）API，Roll engine 54a3577c0139..215ca1560088

[#24457](https://github.com/flutter/flutter/pull/24457) 修訂 Material TextField 在 Android 與 iOS 上的手勢

[#24554](https://github.com/flutter/flutter/pull/24554) 新增 force press 手勢偵測器與辨識器

[#23919](https://github.com/flutter/flutter/pull/23919) 允許偵測 TabBar 上的點擊

[#25384](https://github.com/flutter/flutter/pull/25384) 新增對浮動游標（floating cursor）的支援

[#24976](https://github.com/flutter/flutter/pull/24976) 支援 TextField 多行提示文字（multi-line hint text）

[#26332](https://github.com/flutter/flutter/pull/26332) Strut：細緻控制文字最小行高，可強制行高為指定高度

最後，隨著 Flutter 全球使用量持續成長，我們也持續增強多語系在地化（localizations）支援，本次版本新增了烏克蘭語、波蘭語、斯瓦希里語與加利西亞語。

[#25394](https://github.com/flutter/flutter/pull/25394) 更新在地化（localizations）

[#27506](https://github.com/flutter/flutter/pull/27506) 新增斯瓦希里語（material_sw.arb）支援

[#27352](https://github.com/flutter/flutter/pull/24876) 新增加利西亞語支援


## Plug-Ins

如同框架與引擎本身，我們也持續專注於插件（plugin）品質：

[flutter/engine#7317](https://github.com/flutter/engine/pull/7317) 修正 iOS platform views 的 GrContext 遺留問題

[flutter/engine#7558](https://github.com/flutter/engine/pull/7558) 修正 iOS platform views 遺失觸控事件

[flutter/plugins#1157](https://github.com/flutter/plugins/pull/1157) [google_maps_flutter] 修正 iOS 上相機定位問題

[flutter/plugins#1176](https://github.com/flutter/plugins/pull/1176) [firebase_auth] 修正 Android 上 Firebase 電話驗證

[flutter/plugins#1037](https://github.com/flutter/plugins/pull/1037) [camera] 在 iOS 上儲存照片方向

[flutter/plugins#1129](https://github.com/flutter/plugins/pull/1129) [android_alarm_manager] 修正 "background start not allowed" 問題，佇列過早收到的事件

[flutter/plugins#1051 ](https://github.com/flutter/plugins/pull/1051)[image_picker] 修正 iOS 上多次點擊選擇器時的當機

webview_flutter 插件新增了 Dart 與 JavaScript 之間的通訊通道：

[flutter/plugins#1116](https://github.com/flutter/plugins/pull/1116) 新增 WebView JavaScript channels（Dart 端）

[flutter/plugins#1130](https://github.com/flutter/plugins/pull/1130) WebView JavaScript channels Android 實作

[flutter/plugins#1139](https://github.com/flutter/plugins/pull/1139) WebView JavaScript channels - iOS 實作

[lutter/plugins1021](https://github.com/flutter/plugins/pull/1021) JavaScript 評估 iOS/Android

我們在 In App Purchase 插件（仍為預發布階段）上也有進展：

[#1057](https://github.com/flutter/plugins/pull/1057) [IAP] 檢查付款處理器是否可用

[#1084](https://github.com/flutter/plugins/pull/1084) [IAP] 從 Google Play 取得 SkuDetails

[#1068](https://github.com/flutter/plugins/pull/1068) IAP 產品清單 iOS

[#1172](https://github.com/flutter/plugins/pull/1172) [In_app_purchase] 新增支付 objc 轉譯器


## Dart

本次版本包含全新的 Dart SDK，支援新的 set 字面值語法，並透過減少呼叫建構子或靜態方法的額外負擔，提升 10-20% 的 AOT 執行效能：

[#37](https://github.com/dart-lang/language/issues/37) Set 字面值

[#33274](https://github.com/dart-lang/sdk/issues/33274) 支援 "naked" 指令：全域物件池、PC 相對靜態呼叫、更快的間接呼叫、潛在的程式碼共用


## Tool

本次版本新增了多項新工具及現有工具的新功能。

本次版本持續改善多種工具的錯誤訊息：

[#26107](https://github.com/flutter/flutter/pull/26107) 為 flutter tool --dynamic 旗標提供更好的錯誤訊息

[#26084](https://github.com/flutter/flutter/pull/26084) 儲存編譯訓練資料時改善訊息

[#25863](https://github.com/flutter/flutter/pull/25863) 使用動態修補時提供更友善的訊息

本次版本也新增對 Java 1.8 的支援：

[#25470](https://github.com/flutter/flutter/pull/25470) 支援 Java 1.8


## Severe

本次版本我們發現並修正了前一版本的幾個嚴重（Severe）問題，包括兩個當機與一個效能下降。

當機

[#7314](https://github.com/flutter/flutter/issues/7314) Flutter 啟動時當機（metabug）

效能

[#25381](https://github.com/flutter/flutter/pull/25381) 為 device lab 新增 cull opacity 效能測試


## 破壞性變更（Breaking Changes）

為了自 1.0 以來持續改進 Flutter 以滿足客戶需求，我們進行了幾項破壞性變更：

### [#8769](https://github.com/flutter/flutter/pull/8769) 將 ListItem 更名為 ListTile，並記錄 ListTile 固定高度的幾何資訊

許多開發者對 ListItem 為固定高度感到困惑。我們將其更名為 ListTile，以表明（如同其他 tile 一樣）其高度是固定的，且文件已明確說明 ListTile 的這一特性。你需要將程式碼中所有 ListItem 類別實例更名為 ListTile。

### [#7518](https://github.com/flutter/engine/pull/7518) 更新 iOS 嵌入的預設 flutter_assets 路徑

iOS 應用程式的 Flutter 資源（assets）現在位於 Frameworks/App.framework/flutter_assets，而非原本的 flutter_assets。flutter 命令列工具應會自動處理這項差異，但如果你正在為 iOS 撰寫 AddToApp 應用並與 Flutter 共用資源，請注意這項變更。


### [#27697](https://github.com/flutter/flutter/pull/27697) Cupertino TextField 游標修正

CupertinoTextField 的 cursorColor 預設值現在會與應用程式主題一致。如果你不希望如此，開發者可透過 ThemeData 的 cupertinoOverrideTheme 屬性，使用 CupertinoThemeData 物件提供 Cupertino 專用的覆寫，例如：

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


### [#23424](https://github.com/flutter/flutter/pull/23424) 為 DragGestureRecognizer 增加拖曳起始行為設定

預設情況下，拖曳手勢偵測器（drag gesture detector）的 `onStart` 回呼（callback）會在偵測到拖曳手勢的位置（也就是拖曳超過一定像素後）被呼叫，而不是在觸控按下（touch down）的位置。若要讓指定的拖曳手勢辨識器（drag gesture recognizer）使用舊有的行為，應將該辨識器的 `dragStartBehavior` 變數設為 `DragStartBehavior.down`，例如在宣告 GestureDecorator 時，加入下方粗體標示的那一行：

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


### [#26238](https://github.com/flutter/flutter/pull/26238) 移除已長期棄用的 TwoLevelList

已移除長期棄用的 TwoLevelList 元件；請改用 ListView 搭配 ExpansionTile。參見[此範例](https://github.com/flutter/flutter/blob/v1.2.1/examples/catalog/lib/expansion_tile_sample.dart)，以取得使用 ExpansionTile 的範例。


###[#7442](https://github.com/flutter/engine/pull/7442) 將 Picture.toImage 的光柵化移至 GPU 執行緒

Picture.toImage 現在會回傳 `Future<Image>`。這讓圖片的光柵化能在 GPU 執行緒上進行，在許多情況下提升效能並確保結果正確。至少，您需要將呼叫 Picture 實例的方法宣告為 async，並使用 await，如下所示：

```dart
void usePictureImage(Picture p) async {
  var image = await p.toImage();
  // Do something with the pixels in image….
}
```

然而，您的應用程式很可能還會執行其他非同步（asynchronous）操作，因此您應該考慮在這種情境下如何處理圖片處理。關於 Dart 對非同步程式設計與 `Future` 類別的支援，請參閱 [https://www.dartlang.org/tutorials/language/futures.](https://www.dartlang.org/tutorials/language/futures)


### [#7567](https://github.com/flutter/engine/pull/7567) embedder.h 中的 FlutterResult 重新命名

在 Embedder API 中，`FlutterResult` 類型已重新命名為 `FlutterEngineResult`，以更清楚地說明其用途。您需要將所有出現舊名稱的地方改為新名稱。


### [#7414](https://github.com/flutter/engine/pull/7414) Strut 實作

將 `dart:ui` 中 `ParagraphStyle.lineHeight` 重新命名為 `ParagraphStyle.height`。`ParagraphStyle.lineHeight` 屬性先前並未發揮作用，這次重新命名是為了與 `TextStyle.height` 保持一致。您需要將所有出現舊名稱的地方改為新名稱。


## 回歸問題（Regressions）

在 1.2 版本發佈後不久，我們發現了兩個回歸問題：


* [#28640](https://github.com/flutter/flutter/issues/28640) NoSuchMethodError: android.view.MotionEvent.isFromSource

[flutter/flutter#24830](https://github.com/flutter/flutter/pull/24830)（「為滑鼠指標實作 hover 支援。」）使用了舊版裝置不存在的 Android API。這可能會導致 Android 4.1（Jellybean）與 4.1（Jellybean MR1）發生閃退。


* [#28484](https://github.com/flutter/flutter/issues/28484) Flutter 更新後元件（Widget）渲染異常

在實體 iOS 裝置載入某些圖片時，這可能會導致渲染問題。

若要取得這些回歸問題的修正，待 1.3 beta 於三月發佈後，您可以切換到 beta 頻道並在命令列執行 `flutter upgrade`。在撰寫本文時，這將會更新至至少 1.3.8 版本，其中包含 [flutter/engine#8006](https://github.com/flutter/engine/pull/8006)（「防止使用未在 API level 16 & 17 定義的 Android API」）以及修正渲染問題的 Skia commit。關於閃退問題，受影響的兩個 Android 版本已超過十年歷史，僅佔所有 Android 用戶的 2.5% 以內，而且這些用戶極少會安裝新應用程式（無論是否為 Flutter 應用程式）。即便如此，我們仍不希望在穩定版中留下已知回歸問題，但經過多次內部討論後，我們認為這是對 Flutter 開發者及其應用程式使用者最合適的做法。

我們對於任何嚴重問題的理想修正方式，是透過「hotfix」發佈，從既有發佈版本中「cherry pick」想要套用的修正。我們已在 1.2 版本實作了 hotfix 能力，但尚未達到生產等級。這導致如果我們針對回歸問題發佈新的穩定版「1.2.1-a」，所有用戶都會被困在該分支；若要更新到未來分支，用戶必須移除並重新安裝 Flutter，這顯然是不可接受的。我們正努力驗證 1.3+ 版本的 hotfix 能力，以避免再次發生這類問題。

另一個選項是將 1.3 推向穩定版。我們目前的政策是每季僅發佈一次穩定版，以減少 Flutter 開發者的變動負擔。撰寫本文時，pre-stable 1.3 版本包含 104 個 framework commit（以及更多 engine、Dart 與 Skia commit），這些變動都有可能影響您現有應用程式的運作。為降低風險，我們會將發佈版本維持在 beta 狀態一個月，讓開發者測試，僅在我們有信心時才推升至穩定頻道。這就是我們如何維持季度發佈穩定性的方式。

我們預計下一次穩定版將於 2019 年 5 月發佈，這將是首個包含此回歸修正的穩定版。如果您受到 [#28640](https://github.com/flutter/flutter/issues/28640) 影響，且認為使用 pre-release 1.3 作為解決方法不可行，請直接在 [flutter/flutter#29235](https://github.com/flutter/flutter/issues/29235) 告訴我們。同樣地，若您受到 [#28484](https://github.com/flutter/flutter/issues/28484) 影響，請在 [flutter/flutter/#29360](https://github.com/flutter/flutter/issues/29360) 告知。如果我們發現 Flutter 社群有大量反饋認為我們的決策不妥，我們會根據您的意見重新評估。畢竟，Flutter 是社群共同努力的成果，您的意見非常重要。


## 工具相關發佈

除了 1.2 版本的 Flutter framework 變更外，我們在同一時期也發佈了多項工具更新，詳情請參閱：



*   Visual Studio Code 的 Dart & Flutter 支援：版本 [2.21](https://dartcode.org/releases/v2-21/)、[2.22](https://dartcode.org/releases/v2-22/)、[2.23](https://dartcode.org/releases/v2-23/) 和 [2.24](https://dartcode.org/releases/v2-24/)。
*   IntelliJ & Android Studio 的 Dart & Flutter 支援：[2019 年 1 月](https://groups.google.com/forum/#!searchin/flutter-dev/nilay%7Csort:date/flutter-dev/VCfGRhDsHgs/JcYKxkxHBAAJ) 與 [2019 年 2 月](https://groups.google.com/forum/#!searchin/flutter-dev/nilay%7Csort:date/flutter-dev/VCfGRhDsHgs/JcYKxkxHBAAJ) 發佈。
*   Dart DevTools [alpha 版本](/tools/devtools)。

## 完整問題清單

您可以查看[本次發佈中提交的所有 PR 清單](/release/release-notes/changelogs/changelog-1.2.1)。

[Android App Bundles]: https://developer.android.com/guide/app-bundle/
