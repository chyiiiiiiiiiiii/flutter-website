---
title: 自動平台調適
description: 進一步了解 Flutter 的平台適應性。
---

## 調適理念

一般來說，平台適應性有兩種情境：

1. 屬於作業系統環境行為的事項
   （例如文字編輯與滾動），
   若出現不同行為會被視為「錯誤」。
2. 傳統上在應用程式中，會依照 OEM 的 SDK
   實作的事項（例如在 iOS 使用平行分頁標籤，
   或在 Android 顯示 [`android.app.AlertDialog`][`android.app.AlertDialog`]）。

本文主要說明 Flutter 在 Android 與 iOS 上針對第一種情境所提供的自動調適。

針對第二種情境，Flutter 提供產生符合平台慣例效果的方式，
但當需要應用程式設計決策時，則不會自動調適。
相關討論請參見 [issue #8410][issue #8410] 及
[Material/Cupertino 適應元件問題定義][Material/Cupertino adaptive widget problem definition]。

若需參考同一份內容程式碼，
但在 Android 與 iOS 採用不同資訊架構結構的應用程式範例，
請參見 [platform_design 程式碼範例][platform_design code samples]。

:::secondary
針對第二種情境的初步指引，
正陸續新增至 UI 元件區段。
你可以在 [issue #8427][8427] 留言，提出額外指引的需求。
:::

[`android.app.AlertDialog`]: {{site.android-dev}}/reference/android/app/AlertDialog.html
[issue #8410]: {{site.repo.flutter}}/issues/8410#issuecomment-468034023
[Material/Cupertino adaptive widget problem definition]: https://bit.ly/flutter-adaptive-widget-problem
[platform_design code samples]: {{site.repo.samples}}/tree/main/platform_design

## 頁面導覽

Flutter 提供 Android 與 iOS 常見的導覽模式，
並會自動依據目前平台調整導覽動畫。

### 導覽轉場動畫

在 **Android** 上，預設的 [`Navigator.push()`][`Navigator.push()`] 轉場動畫
仿照 [`startActivity()`][`startActivity()`]，
通常只有一種自底向上的動畫變體。

在 **iOS** 上：

* 預設的 [`Navigator.push()`][`Navigator.push()`] API 產生 iOS 的 Show/Push 風格轉場，
  會依據語系的 RTL 設定，從結束端到起始端進行動畫。
  新路由背後的頁面也會如 iOS 一樣進行視差滑動。
* 當推送一個 [`PageRoute.fullscreenDialog`][`PageRoute.fullscreenDialog`] 為 true 的頁面路由時，
  會有一種自底向上的獨立轉場風格。
  這對應 iOS 的 Present/Modal 風格轉場，
  通常用於全螢幕的模態頁面。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-android.webp", img-style:"border-radius: 12px;", caption:"Android 頁面轉場", alt:"Android 上自底向上頁面轉場動畫" %}
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-ios.webp", img-style:"border-radius: 22px;", caption:"iOS push 轉場", alt:"iOS 上結束端到起始端風格的 push 頁面轉場動畫" %}
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-ios-modal.webp", img-style:"border-radius: 22px;", caption:"iOS present 轉場", alt:"iOS 上自底向上風格的 present 頁面轉場動畫" %}
</div>

[`Navigator.push()`]: {{site.api}}/flutter/widgets/Navigator/push.html
[`startActivity()`]: {{site.android-dev}}/reference/kotlin/android/app/Activity#startactivity
[`PageRoute.fullscreenDialog`]: {{site.api}}/flutter/widgets/PageRoute-class.html

### 平台專屬轉場細節

在 **Android** 上，Flutter 採用 [`ZoomPageTransitionsBuilder`][`ZoomPageTransitionsBuilder`] 動畫。
當使用者點擊某個項目時，UI 會放大進入包含該項目的畫面。
當使用者返回時，UI 會縮小回到前一個畫面。

在 **iOS** 上，當使用 push 風格轉場時，
Flutter 內建的 [`CupertinoNavigationBar`][`CupertinoNavigationBar`]
與 [`CupertinoSliverNavigationBar`][`CupertinoSliverNavigationBar`] 導覽列
會自動將每個子元件動畫過渡到下一頁或前一頁對應的
`CupertinoNavigationBar` 或 `CupertinoSliverNavigationBar`。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/android-zoom-animation.png", img-style:"border-radius: 12px;", caption:"Android", alt:"Android 上頁面轉場動畫" %}
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-ios-nav-bar.webp", img-style:"border-radius: 22px;", caption:"iOS 導覽列", alt:"iOS 上頁面轉場時導覽列的動畫過渡" %}
</div>

[`ZoomPageTransitionsBuilder`]: {{site.api}}/flutter/material/ZoomPageTransitionsBuilder-class.html
[`CupertinoNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoNavigationBar-class.html
[`CupertinoSliverNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoSliverNavigationBar-class.html

### 返回導覽

在 **Android** 上，
作業系統的返回按鈕預設會傳送給 Flutter，
並彈出 [`WidgetsApp`][`WidgetsApp`] 的 Navigator 最上層路由。

在 **iOS** 上，
可以使用螢幕邊緣滑動手勢來彈出最上層路由。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-android-back.webp", img-style:"border-radius: 12px;", caption:"Android 返回按鈕", alt:"由 Android 返回按鈕觸發的頁面轉場" %}
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-ios-back.webp", img-style:"border-radius: 22px;", caption:"iOS 返回滑動手勢", alt:"由 iOS 返回滑動手勢觸發的頁面轉場" %}
</div>

[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html

## 滾動行為

滾動是平台視覺與操作體驗的重要部分，
Flutter 會自動調整滾動行為以符合當前平台。

### 物理模擬

Android 與 iOS 都有複雜的滾動物理模擬，
難以用文字完整描述。
一般來說，iOS 的可滾動區塊具有較大的重量與動態摩擦力，
而 Android 則有較高的靜態摩擦力。
因此 iOS 在加速時速度提升較慢，但停止時較不突然，
且在低速時較為滑順。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-soft.webp", caption:"輕拋比較", alt:"iOS 可滾動區塊以較低速度滑動距離較 Android 長" %}
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-medium.webp", caption:"中等拋比較", alt:"Android 可滾動區塊加速較快，滑動距離較長後突然停止" %}
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-strong.webp", caption:"強拋比較", alt:"Android 可滾動區塊加速較快，且滑動距離明顯更長" %}
</div>

### 超出滾動範圍的行為

在 **Android** 上，
滾動超出可滾動區塊邊緣時會顯示
[overscroll glow indicator][overscroll glow indicator] (based on the color
of the current Material theme)。

在 **iOS** 上，滾動超出可滾動區塊邊緣時
會[超出滾動範圍][overscrolls]，阻力逐漸增加並彈回原位。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-overscroll.webp", caption:"動態超出滾動比較", alt:"Android 與 iOS 可滾動區塊被拋出邊界時展現平台特有的超出滾動行為" %}
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-static-overscroll.webp", caption:"靜態超出滾動比較", alt:"Android 與 iOS 可滾動區塊從靜止狀態被超出滾動時展現平台特有的超出滾動行為" %}
</div>

[overscroll glow indicator]: {{site.api}}/flutter/widgets/GlowingOverscrollIndicator-class.html
[overscrolls]: {{site.api}}/flutter/widgets/BouncingScrollPhysics-class.html

### 動量

在 **iOS** 上，
連續向同一方向拋動會疊加動量，
每次拋動都會累積更高速度。
Android 上則沒有這種行為。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-momentum-ios.webp", caption:"iOS 滾動動量", alt:"iOS 上連續拋動產生動量" %}
</div>

### 回到頂部

在 **iOS** 上，
點擊作業系統狀態列會將主要
滾動控制器滾動回頂部。
Android 上則沒有這種行為。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-tap-to-top-ios.webp", img-style:"border-radius: 22px;", caption:"iOS 狀態列點擊回頂部", alt:"點擊狀態列將主要可滾動區塊滾回頂部" %}
</div>

## 字體排印（Typography）

當使用 Material 函式庫時，
字體會自動預設為符合平台的字型。
Android 使用 Roboto 字型。
iOS 使用 San Francisco 字型。

當使用 Cupertino 函式庫時，[預設主題][default theme]
會使用 San Francisco 字型。

San Francisco 字型授權僅限於
執行於 iOS、macOS 或 tvOS 的軟體。
因此，若在 Android 上執行時平台被偽裝為 iOS，
或使用預設 Cupertino 主題時，會使用備用字型。

你也可以選擇讓 Material 元件的文字樣式
更貼近 iOS 的預設文字樣式。
你可以在 [UI 元件區段](#ui-components) 看到針對元件的具體範例。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/typography-android.png", img-style:"border-radius: 12px;", caption:"Android 上的 Roboto", alt:"Android 上 Roboto 字型排印比例" %}
  {% render docs/app-figure.md, image:"platform-adaptations/typography-ios.png", img-style:"border-radius: 22px;", caption:"iOS 上的 San Francisco", alt:"iOS 上 San Francisco 字型排印比例" %}
</div>

[default theme]: {{site.repo.flutter}}/blob/main/packages/flutter/lib/src/cupertino/text_theme.dart

## 圖示設計（Iconography）

當使用 Material 函式庫時，
部分圖示會依據平台自動顯示不同圖形。
例如，溢出選單按鈕的三個點在 iOS 上是水平排列，
在 Android 上則是垂直排列。
返回按鈕在 iOS 上是簡單的山形符號（chevron），
在 Android 上則有桿身（stem/shaft）。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/iconography-android.png", caption:"Android 上的圖示", alt:"適用於 Android 的圖示" %}
  {% render docs/app-figure.md, image:"platform-adaptations/iconography-ios.png", caption:"iOS 上的圖示", alt:"適用於 iOS 的圖示" %}
</div>

Material 函式庫也透過 [`Icons.adaptive`][`Icons.adaptive`]
提供一組平台適應性圖示。

[`Icons.adaptive`]: {{site.api}}/flutter/material/PlatformAdaptiveIcons-class.html

## 觸覺回饋（Haptic feedback）

Material 與 Cupertino 函式庫會在
特定情境下自動觸發符合平台的觸覺回饋。

例如，
在文字欄位長按選字時，
Android 會有「嗡嗡」震動，iOS 則沒有。

在 iOS 上捲動選擇器（picker）項目時會有
「輕敲」的觸覺回饋，Android 則無回饋。

## 文字編輯

Material 與 Cupertino 的文字輸入欄位
皆支援拼字檢查，並會依平台調整
拼字檢查設定、拼字選單與高亮顏色。

Flutter 也會在編輯文字欄位內容時，
根據當前平台進行下列調適。

### 鍵盤手勢導覽

在 **Android** 上，
可在軟體鍵盤的 <kbd>space</kbd> 鍵上左右滑動
以移動 Material 與 Cupertino 文字欄位的游標。

在具備 3D Touch 功能的 **iOS** 裝置上，
可在軟體鍵盤上用重壓拖曳手勢，
以浮動游標在二維空間移動游標。
此功能同時適用於 Material 與 Cupertino 文字欄位。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/text-keyboard-move-android.webp", caption:"Android 空白鍵游標移動", alt:"在 Android 上透過空白鍵移動游標" %}
  {% render docs/app-figure.md, image:"platform-adaptations/text-keyboard-move-ios.webp", caption:"iOS 3D Touch 拖曳游標移動", alt:"在 iOS 上透過 3D Touch 拖曳鍵盤移動游標" %}
</div>

### 文字選取工具列

在 **Android** 上使用 Material 時，
於文字欄位選取文字時會顯示 Android 風格的選取工具列。

在 **iOS** 上使用 Material 或使用 **Cupertino** 時，
於文字欄位選取文字時會顯示 iOS 風格的選取工具列。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/text-toolbar-android.png", caption:"Android 文字選取工具列", alt:"適用於 Android 的文字工具列" %}
  {% render docs/app-figure.md, image:"platform-adaptations/text-toolbar-ios.png", caption:"iOS 文字選取工具列", alt:"適用於 iOS 的文字工具列" %}
</div>

### 單點擊手勢

在 **Android** 上使用 Material 時，
於文字欄位單點會將游標移至點擊位置。

當文字選取為收合狀態時，也會顯示可拖曳的
控制柄以移動游標。

在 **iOS** 上使用 Material 或使用 **Cupertino** 時，
於文字欄位單點會將游標移至所點單字的最近邊緣。

iOS 上收合狀態的文字選取不會有可拖曳的控制柄。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/text-single-tap-android.webp", caption:"Android 點擊", alt:"在 Android 上將游標移至點擊位置" %}
  {% render docs/app-figure.md, image:"platform-adaptations/text-single-tap-ios.webp", caption:"iOS 點擊", alt:"在 iOS 上將游標移至所點單字最近邊緣" %}
</div>

### 長按手勢

在 **Android** 上使用 Material 時，
長按會選取長按下的單字。
放開時會顯示選取工具列。

在 **iOS** 上使用 Material 或使用 **Cupertino** 時，
長按會將游標移至長按位置。
放開時會顯示選取工具列。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/text-long-press-android.webp", caption:"Android 長按", alt:"在 Android 上長按選取單字" %}
  {% render docs/app-figure.md, image:"platform-adaptations/text-long-press-ios.webp", caption:"iOS 

```dart
// Map the text theme to iOS styles
TextTheme cupertinoTextTheme = TextTheme(
    headlineMedium: CupertinoThemeData()
        .textTheme
        .navLargeTitleTextStyle
         // fixes a small bug with spacing
        .copyWith(letterSpacing: -1.5),
    titleLarge: CupertinoThemeData().textTheme.navTitleTextStyle)
...

// Use iOS text theme on iOS devices
ThemeData(
      textTheme: Platform.isIOS ? cupertinoTextTheme : null,
      ...
)
...

// Modify AppBar properties
AppBar(
        surfaceTintColor: Platform.isIOS ? Colors.transparent : null,
        shadowColor: Platform.isIOS ? CupertinoColors.darkBackgroundGray : null,
        scrolledUnderElevation: Platform.isIOS ? .1 : null,
        toolbarHeight: Platform.isIOS ? 44 : null,
        ...
      ),
```

不過，由於應用程式列（app bars）會與頁面中的其他內容一起顯示，建議僅在與應用程式整體風格一致的情況下調整其樣式。你可以在 [GitHub 討論區關於 app bar 調整的討論][appbar-post] 中，查看更多程式碼範例與進一步說明。

[mat-appbar]: {{site.material}}/components/top-app-bar/overview
[hig-appbar]: {{site.apple-dev}}/design/human-interface-guidelines/components/navigation-and-search/navigation-bars/
[appbar-post]: {{site.repo.uxr}}/discussions/93

### 底部導覽列（Bottom navigation bars）

自 Android 12 起，底部導覽列的預設 UI 已遵循 [Material 3][mat-navbar] 所定義的設計指引。在 iOS 上，對應的元件稱為「Tab Bars（分頁列）」，其設計可參考 [Apple 的人機介面指引（Human Interface Guidelines）][hig-tabbar] (HIG)。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/mat-navbar.png", caption:"Material 3 的底部導覽列", alt:"Bottom Navigation Bar in Material 3", height: "160px" %}
  {% render docs/app-figure.md, image:"platform-adaptations/hig-tabbar.png", caption:"Human Interface Guidelines 中的 Tab Bar", alt:"Tab Bar in Human Interface Guidelines", height: "160px" %}
</div>

由於分頁列（tab bars）會在你的應用程式中持續顯示，因此應該與你的品牌風格相符。不過，如果你選擇在 Android 上使用 Material 的預設樣式，也可以考慮在 iOS 上採用預設的分頁列樣式。

若要實作平台特定的底部導覽列，你可以在 Android 上使用 Flutter 的 `NavigationBar` 元件，在 iOS 上則使用 `CupertinoTabBar` 元件。以下是一段你可以參考並調整的程式碼片段，用於顯示平台特定的導覽列。

```dart
final Map<String, Icon> _navigationItems = {
    'Menu': Platform.isIOS ? Icon(CupertinoIcons.house_fill) : Icon(Icons.home),
    'Order': Icon(Icons.adaptive.share),
  };

...

Scaffold(
  body: _currentWidget,
  bottomNavigationBar: Platform.isIOS
          ? CupertinoTabBar(
              currentIndex: _currentIndex,
              onTap: (index) {
                setState(() => _currentIndex = index);
                _loadScreen();
              },
              items: _navigationItems.entries
                  .map<BottomNavigationBarItem>(
                      (entry) => BottomNavigationBarItem(
                            icon: entry.value,
                            label: entry.key,
                          ))
                  .toList(),
            )
          : NavigationBar(
              selectedIndex: _currentIndex,
              onDestinationSelected: (index) {
                setState(() => _currentIndex = index);
                _loadScreen();
              },
              destinations: _navigationItems.entries
                  .map<Widget>((entry) => NavigationDestination(
                        icon: entry.value,
                        label: entry.key,
                      ))
                  .toList(),
            ));
```

[mat-navbar]: {{site.material}}/components/navigation-bar/overview
[hig-tabbar]: {{site.apple-dev}}/design/human-interface-guidelines/components/navigation-and-search/tab-bars/

### 文字欄位 (text fields)

自 Android 12 起，文字欄位遵循
[Material 3][m3-text-field] (M3) 設計指引。
在 iOS 上，Apple 的 [人機介面指引（Human Interface Guidelines）][hig-text-field] (HIG)
則定義了對應的元件。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/m3-text-field.png", caption:"Material 3 中的文字欄位", alt:"Text Field in Material 3", width:"320px", height:"100px" %}
  {% render docs/app-figure.md, image:"platform-adaptations/hig-text-field.png", caption:"HIG 中的文字欄位", alt:"Text Field in Human Interface Guidelines", width:"320px", height:"100px" %}
</div>

由於文字欄位 (text fields) 需要用戶輸入，
其設計應遵循各平台的慣例。

若要在 Flutter 中實作平台專屬的 `TextField`，
可以調整 Material `TextField` 的樣式來達成。

```dart
Widget _createAdaptiveTextField() {
  final _border = OutlineInputBorder(
    borderSide: BorderSide(color: CupertinoColors.lightBackgroundGray),
  );

  final iOSDecoration = InputDecoration(
    border: _border,
    enabledBorder: _border,
    focusedBorder: _border,
    filled: true,
    fillColor: CupertinoColors.white,
    hoverColor: CupertinoColors.white,
    contentPadding: EdgeInsets.fromLTRB(10, 0, 0, 0),
  );

  return Platform.isIOS
      ? SizedBox(
          height: 36.0,
          child: TextField(
            decoration: iOSDecoration,
          ),
        )
      : TextField();
}
```

想進一步了解如何調整文字欄位（text field），請參閱
[GitHub 上關於文字欄位的討論][text-field-post]。
你可以在該討論中留下回饋或提出問題。

[text-field-post]: {{site.repo.uxr}}/discussions/95
[m3-text-field]: {{site.material}}/components/text-fields/overview
[hig-text-field]: {{site.apple-dev}}/design/human-interface-guidelines/text-fields
