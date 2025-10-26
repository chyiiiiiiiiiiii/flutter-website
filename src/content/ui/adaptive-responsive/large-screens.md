---
title: 大螢幕裝置
description: >-
  調整應用程式以適應大螢幕時需注意的事項。
shortTitle: 大螢幕
---

<?code-excerpt path-base="ui/adaptive_app_demos"?>

本頁將提供優化應用程式，以提升其在大螢幕裝置上表現的建議。

Flutter（如同 Android）將[大螢幕][large screens]定義為平板電腦、可折疊裝置，以及執行 Android 的 ChromeOS 裝置。Flutter
_同時_ 也將 Web、桌面與 iPad 視為大螢幕裝置。

:::secondary 為什麼大螢幕特別重要？
對大螢幕的需求持續增加。
截至 2024 年 1 月，
已有超過 [2.7 億台活躍的大螢幕][large screens]
與可折疊裝置運行於 Android 平台，且有超過
[1,490 萬名 iPad 使用者][14.9 million iPad users]。

當你的應用程式支援大螢幕時，
同時也能獲得其他好處。
優化你的應用程式以填滿螢幕空間。
例如：

* 提升應用程式的使用者互動指標。
* 增加應用程式在 Play 商店的能見度。
  最近的 [Play 商店更新][Play Store updates] 會根據裝置類型顯示評分，
  並指出應用程式是否缺乏大螢幕支援。
* 確保你的應用程式符合 iPadOS 上架規範，
  並能[順利上架 App Store][accepted in the App Store]。
:::

[14.9 million iPad users]: https://www.statista.com/statistics/299632/tablet-shipments-apple/
[accepted in the App Store]: https://developer.apple.com/ipados/submit/
[large screens]: {{site.android-dev}}/guide/topics/large-screens/get-started-with-large-screens
[Play Store updates]: {{site.android-dev}}/2022/03/helping-users-discover-quality-apps-on.html

## 使用 GridView 進行版面配置

請參考下方應用程式的螢幕截圖。
該應用程式將其 UI 顯示於`ListView`中。
左側圖片顯示應用程式運行於行動裝置上，右側圖片則為
應用程式運行於大螢幕裝置上（_尚未套用本頁建議_）。

![Sample of large screen](/assets/images/docs/ui/adaptive-responsive/large-screen.png){:width="90%"}

這樣的呈現並不理想。

[Android 大螢幕應用程式品質指引][guidelines]
以及[iOS 對應指引][iOS equivalent]
都建議：文字或方塊不應佔據整個螢幕寬度。那麼，如何以自適應方式解決這個問題？

[guidelines]: https://developer.android.com/docs/quality-guidelines/large-screen-app-quality
[iOS equivalent]: https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados

常見的解決方案是使用`GridView`，如下節所示。

### GridView

你可以使用`GridView`元件，將現有的`ListView`轉換為更合理尺寸的項目。

`GridView`類似於[`ListView`][`ListView`]元件，
但不僅能處理線性排列的小元件清單，
`GridView`還能將元件排列為二維陣列。

`GridView`也有與`ListView`類似的建構函式。
`ListView`的預設建構函式對應到`GridView.count`，
而`ListView.builder`則類似於`GridView.builder`。

`GridView`還有一些額外的建構函式，可用於更自訂的版面配置。
想了解更多，請參閱 [`GridView`][`GridView`] API 文件頁面。

[`GridView`]: {{site.api}}/flutter/widgets/GridView-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html

例如，若你的原始應用程式使用`ListView.builder`，
可以將其替換為`GridView.builder`。
如果你的應用程式有大量項目，
建議使用這個 builder 建構函式，僅建立實際可見的項目元件。

兩個元件的建構函式大多數參數都相同，因此替換起來相當直接。
但你需要決定`gridDelegate`的設定值。

Flutter 提供了強大的預設`gridDelegates`，
你可以直接使用，分別為：

[`SliverGridDelegateWithFixedCrossAxisCount`][`SliverGridDelegateWithFixedCrossAxisCount`]
: 讓你為網格指定固定的欄數。

[`SliverGridDelegateWithMaxCrossAxisExtent`][`SliverGridDelegateWithMaxCrossAxisExtent`] 
: 讓你定義項目的最大寬度。

[`SliverGridDelegateWithFixedCrossAxisCount`]: {{site.api}}/flutter/rendering/SliverGridDelegateWithFixedCrossAxisCount-class.html 
[`SliverGridDelegateWithMaxCrossAxisExtent`]:  {{site.api}}/flutter/rendering/SliverGridDelegateWithMaxCrossAxisExtent-class.html

:::secondary
請勿使用這些類別中的 grid delegate 直接設定欄數，然後根據裝置是否為平板等條件硬編碼欄數。
欄數應該根據視窗大小，而非實體裝置大小來決定。

這個區別很重要，因為許多行動裝置支援多視窗模式，
這可能導致你的應用程式顯示區域小於實體螢幕尺寸。此外，Flutter 應用程式
也能在 Web 與桌面上運行，其尺寸可能有多種變化。
**因此，請使用`MediaQuery`來取得應用程式視窗大小，
而不是實體裝置大小。**
:::

### 其他解決方案

另一種做法是利用`BoxConstraints`的`maxWidth`屬性。
這包含以下步驟：

* 使用`ConstrainedBox`包裹`GridView`，並給予
  一個設定最大寬度的`BoxConstraints`。
* 如果你需要設定背景顏色等其他功能，請用`Container`取代`ConstrainedBox`。

在選擇最大寬度時，
建議參考 Material 3 的 [Applying layout][Applying layout] 指南中推薦的數值。

[Applying layout]: https://m3.material.io/foundations/layout/applying-layout/window-size-classes

## 可折疊裝置（Foldables）

如前所述，Android 與 Flutter 的設計指引都**不建議**
鎖定螢幕方向，
但有些應用程式仍會鎖定螢幕方向。
請注意，這麼做可能會在可折疊裝置上造成問題。

當應用程式運行於可折疊裝置時，裝置折疊時看似正常。
但展開裝置時，應用程式可能會出現 letterbox（信箱模式）現象。

如 [SafeArea & MediaQuery][sa-mq] 頁面所述，
letterboxing 意指應用程式視窗被鎖定在螢幕中央，
四周則以黑色填充。

[sa-mq]: /ui/adaptive-responsive/safearea-mediaquery

為什麼會發生這種情況？

這通常發生於你使用`MediaQuery`來取得應用程式視窗大小時。
當裝置處於折疊狀態時，螢幕方向會被限制為直向模式。
在底層，`setPreferredOrientations`會讓
Android 使用直向相容模式，應用程式因此以 letterbox 狀態顯示。
在 letterbox 狀態下，`MediaQuery`永遠不會收到
允許 UI 擴展的較大視窗尺寸。

你可以用以下兩種方式解決：

* 支援所有螢幕方向。
* 使用_實體螢幕_的尺寸。
  事實上，這是少數幾個
  你應該使用實體螢幕尺寸而_不是_視窗尺寸的情境之一。

那麼，如何取得實體螢幕尺寸？

你可以使用 [`Display`][`Display`] API（自 Flutter 3.13 起提供），
它包含裝置的尺寸、像素比與更新率等資訊。

[`Display`]: {{site.api}}/flutter/dart-ui/Display-class.html

以下範例程式碼會取得`Display`物件：

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

重要的是要找到你關心的 view 的顯示方式。這樣可以建立一個前瞻性的 API，能夠因應目前**以及**未來的多顯示器與多 view 裝置。

## 自適應輸入（Adaptive input）

支援更多螢幕，也代表要擴展輸入控制方式。

Android 指南將大型裝置的支援分為三個層級。

![3 tiers of large format device support](/assets/images/docs/ui/adaptive-responsive/large-screen-guidelines.png){:width="90%"}

第 3 層（最低層級的支援）包含對滑鼠與觸控筆輸入的支援
（[Material 3 指南][m3-guide]、[Apple 指南][Apple guidelines]）。

如果你的應用程式使用 Material 3 及其按鈕與選擇器，
那麼你的應用程式已經內建支援
多種額外的輸入狀態。

但如果你有自訂元件（Widget）呢？
請參考 [User input][User input] 頁面，
取得如何為
[元件加入輸入支援][input support for widgets]
的指引。

[Apple guidelines]: https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados#Best-practices
[input support for widgets]: /ui/adaptive-responsive/input#custom-widgets
[m3-guide]: {{site.android-dev}}/docs/quality-guidelines/large-screen-app-quality
[User input]: /ui/adaptive-responsive/input

### 導覽（Navigation）

在面對各種不同尺寸裝置時，導覽會帶來獨特的挑戰。一般來說，你會根據可用螢幕空間，在
[`BottomNavigationBar`][`BottomNavigationBar`] 和 [`NavigationRail`] 之間切換。

如需更多資訊（以及對應的範例程式碼），
請參考 [Problem: Navigation rail][Problem: Navigation rail]，這是
[Developing Flutter apps for Large screens][article] 文章中的一節。

[article]: {{site.flutter-medium}}/developing-flutter-apps-for-large-screens-53b7b0e17f10
[`BottomNavigationBar`]: {{site.api}}/flutter/material/BottomNavigationBar-class.html
[`NavigationRail`]: {{site.api}}/flutter/material/NavigationRail-class.html
[Problem: Navigation rail]: {{site.flutter-medium}}/developing-flutter-apps-for-large-screens-53b7b0e17f10#:~:text=Problem%3A%20Navigation%20rail1

