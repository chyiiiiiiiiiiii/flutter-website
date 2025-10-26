---
title: 大螢幕裝置
description: >-
  調整應用程式以適應大螢幕時
  需要注意的事項。
shortTitle: 大螢幕
---

<?code-excerpt path-base="ui/adaptive_app_demos"?>

本頁將提供最佳化應用程式，
以提升其在大螢幕裝置上表現的相關指引。

Flutter 與 Android 一樣，將[大螢幕裝置][large screens]定義為平板電腦、
可摺疊裝置，以及執行 Android 的 ChromeOS 裝置。Flutter
_另外_ 也將 Web、桌面與 iPad 視為大螢幕裝置。

:::secondary 為什麼大螢幕特別重要？
大螢幕的需求持續增加。
截至 2024 年 1 月，
已有超過 [2.7 億台活躍大螢幕][large screens]
與可摺疊裝置運行於 Android 平台，且有超過
[1,490 萬 iPad 使用者][14.9 million iPad users]。

當你的應用程式支援大螢幕時，
同時也能獲得其他好處。
最佳化應用程式以填滿螢幕空間，例如：

* 提升應用程式的使用者互動指標。
* 增加應用程式在 Play 商店的曝光度。
  最近的 [Play 商店更新][Play Store updates]會依裝置類型顯示評分，
  並標示出不支援大螢幕的應用程式。
* 確保你的應用程式符合 iPadOS 上架規範，
  並能[通過 App Store 審核][accepted in the App Store]。
:::

[14.9 million iPad users]: https://www.statista.com/statistics/299632/tablet-shipments-apple/
[accepted in the App Store]: https://developer.apple.com/ipados/submit/
[large screens]: {{site.android-dev}}/guide/topics/large-screens/get-started-with-large-screens
[Play Store updates]: {{site.android-dev}}/2022/03/helping-users-discover-quality-apps-on.html

## 使用 GridView 進行版面配置

請參考下方應用程式的螢幕截圖。
該應用程式將 UI 顯示在 `ListView` 中。
左側圖片為應用程式在行動裝置上的執行畫面，右側圖片則是在
大螢幕裝置上執行（_尚未套用本頁建議前_）的畫面。

![Sample of large screen](/assets/images/docs/ui/adaptive-responsive/large-screen.png){:width="90%"}

這樣的呈現方式並不理想。

[Android 大螢幕應用程式品質指引][guidelines]
以及 [iOS 對應指引][iOS equivalent]
都建議文字或方塊不應佔據整個螢幕寬度。那麼，如何以自適應方式解決這個問題呢？

[guidelines]: https://developer.android.com/docs/quality-guidelines/large-screen-app-quality
[iOS equivalent]: https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados

常見的解決方案是使用 `GridView`，如下節所示。

### GridView

你可以使用 `GridView` 元件（Widget），
將現有的 `ListView` 轉換為更合理大小的項目。

`GridView` 類似於 [`ListView`][`ListView`] 元件，
但除了能線性排列元件清單外，
`GridView` 還能將元件排列成二維陣列。

`GridView` 也有與 `ListView` 類似的建構函式。
`ListView` 的預設建構函式對應到 `GridView.count`，
`ListView.builder` 則類似於 `GridView.builder`。

`GridView` 還有一些額外的建構函式，可用於自訂版面配置。
如需了解更多，請參考 [`GridView`][`GridView`] API 文件。

[`GridView`]: {{site.api}}/flutter/widgets/GridView-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html

例如，如果你的原始應用程式使用 `ListView.builder`，
可以將其替換為 `GridView.builder`。
若應用程式有大量項目，建議使用這個 builder 建構函式，
僅建立實際可見的項目元件（Widget）。

兩者建構函式中的大多數參數都相同，因此替換相當直接。
但你需要決定 `gridDelegate` 的設定值。

Flutter 提供了強大的預製 `gridDelegates`，
你可以直接使用，分別是：

[`SliverGridDelegateWithFixedCrossAxisCount`][`SliverGridDelegateWithFixedCrossAxisCount`]
: 允許你為網格指定固定的欄數。

[`SliverGridDelegateWithMaxCrossAxisExtent`][`SliverGridDelegateWithMaxCrossAxisExtent`] 
: 允許你定義項目的最大寬度。

[`SliverGridDelegateWithFixedCrossAxisCount`]: {{site.api}}/flutter/rendering/SliverGridDelegateWithFixedCrossAxisCount-class.html 
[`SliverGridDelegateWithMaxCrossAxisExtent`]:  {{site.api}}/flutter/rendering/SliverGridDelegateWithMaxCrossAxisExtent-class.html

:::secondary
請勿直接使用這些類別的 grid delegate 來設定欄數，
並根據裝置是否為平板等條件硬編碼欄數。
欄數應該根據視窗大小而非實體裝置大小來決定。

這個區別很重要，因為許多行動裝置支援多視窗模式，
這可能導致你的應用程式顯示區域小於裝置實體螢幕大小。
此外，Flutter 應用程式也能在 Web 與桌面端執行，
其視窗大小可能有多種變化。
**因此，請使用 `MediaQuery` 取得應用程式視窗大小，
而非實體裝置大小。**
:::

### 其他解決方案

另一種做法是
利用 `BoxConstraints` 的 `maxWidth` 屬性。
具體步驟如下：

* 將 `GridView` 包裝在 `ConstrainedBox` 中，並設定
  最大寬度的 `BoxConstraints`。
* 若需要設定背景顏色等功能，可使用 `Container` 取代 `ConstrainedBox`。

在選擇最大寬度值時，
建議參考 Material 3 在 [Applying layout][Applying layout] 指南中
所推薦的數值。

[Applying layout]: https://m3.material.io/foundations/layout/applying-layout/window-size-classes

## 可摺疊裝置（Foldables）

如前所述，Android 與 Flutter 的設計指引都建議
**不要** 鎖定螢幕方向，
但有些應用程式仍會鎖定螢幕方向。
請注意，這在可摺疊裝置上可能會造成問題。

當在可摺疊裝置上執行時，裝置摺疊時應用程式可能顯示正常，
但展開時，應用程式可能會出現信箱模式（letterboxed）。

如 [SafeArea & MediaQuery][sa-mq] 頁面所述，
信箱模式（letterboxing）代表應用程式視窗被鎖定在螢幕中央，
四周則以黑色填充。

[sa-mq]: /ui/adaptive-responsive/safearea-mediaquery

為什麼會發生這種情況？

這通常是因為你使用 `MediaQuery` 來取得應用程式的視窗大小。
當裝置摺疊時，螢幕方向被限制為直向模式。
在底層，`setPreferredOrientations` 會讓
Android 啟用直向相容模式，應用程式就會以信箱模式顯示。
在這種狀態下，`MediaQuery` 永遠不會收到
允許 UI 擴展的較大視窗尺寸。

你可以用以下兩種方式解決：

* 支援所有螢幕方向。
* 使用_實體螢幕_的尺寸。
  事實上，這是少數應該使用實體螢幕尺寸、
  而_不是_視窗尺寸的情境之一。

如何取得實體螢幕尺寸？

你可以使用 [`Display`][`Display`] API，
此 API 於 Flutter 3.13 引入，
可取得裝置的尺寸、像素比與更新率。

[`Display`]: {{site.api}}/flutter/dart-ui/Display-class.html

以下範例程式碼會取得一個 `Display` 物件：

```dart
/// AppState object.
ui.FlutterView? _view;

@override
void didChangeDependencies() {
  super.didChangeDependencies();
  _view = View.maybeOf(context);
}

void didChangeMetrics() {
  final ui.Display? display = _view?.display;
}
```

重要的是要找到你關心的視圖（view）的顯示方式。這樣可以建立一個具前瞻性的 API，能夠支援目前以及未來的多螢幕與多視圖裝置。

## 自適應輸入（Adaptive input）

支援更多螢幕，也代表需要擴充輸入控制。

Android 指南將大型裝置支援分為三個層級。

![3 tiers of large format device support](/assets/images/docs/ui/adaptive-responsive/large-screen-guidelines.png){:width="90%"}

第 3 層（最低支援層級）包含對滑鼠與觸控筆輸入的支援
（[Material 3 指南][m3-guide]、[Apple 指南][Apple guidelines]）。

如果你的應用程式使用 Material 3 及其按鈕與選擇器，那麼你的應用程式已經內建支援多種額外的輸入狀態。

但如果你有自訂元件（Widget）呢？
請參考 [User input][User input] 頁面，取得
[元件輸入支援][input support for widgets] 的相關指引。

[Apple guidelines]: https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados#Best-practices
[input support for widgets]: /ui/adaptive-responsive/input#custom-widgets
[m3-guide]: {{site.android-dev}}/docs/quality-guidelines/large-screen-app-quality
[User input]: /ui/adaptive-responsive/input

### 導航（Navigation）

在支援各種不同尺寸裝置時，導航會帶來獨特的挑戰。一般來說，你會根據可用螢幕空間，在 [`BottomNavigationBar`][`BottomNavigationBar`] 與 [`NavigationRail`] 之間切換。

如需更多資訊（以及對應的範例程式碼），請參考 [Problem: Navigation rail][Problem: Navigation rail]，該內容收錄於
[Developing Flutter apps for Large screens][article] 文章中。

[article]: {{site.flutter-medium}}/developing-flutter-apps-for-large-screens-53b7b0e17f10
[`BottomNavigationBar`]: {{site.api}}/flutter/material/BottomNavigationBar-class.html
[`NavigationRail`]: {{site.api}}/flutter/material/NavigationRail-class.html
[Problem: Navigation rail]: {{site.flutter-medium}}/developing-flutter-apps-for-large-screens-53b7b0e17f10#:~:text=Problem%3A%20Navigation%20rail1

