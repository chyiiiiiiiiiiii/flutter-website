---
title: 自動平台適應
description: 進一步了解 Flutter 的平台適應性。
---

## 適應性理念

一般來說，平台適應性可分為兩種情境：

1. 屬於作業系統環境本身的行為
   （例如文字編輯與捲動），若行為不符則會「錯誤」。
2. 通常在應用程式中，透過 OEM 的 SDK 實作的行為
   （例如 iOS 上的平行分頁或
   Android 上顯示 [`android.app.AlertDialog`][`android.app.AlertDialog`]）。

本文主要說明 Flutter 在 Android 與 iOS 上針對第一種情境所提供的自動適應。

針對第二種情境，Flutter 提供產生符合平台慣例效果的方法，
但當應用程式設計需要選擇時，不會自動適應。
相關討論請參閱 [issue #8410][issue #8410] 以及
[Material/Cupertino 適應元件問題定義][Material/Cupertino adaptive widget problem definition]。

若需參考在 Android 與 iOS 上使用不同資訊架構結構，
但共用相同內容程式碼的應用程式範例，請參閱 [platform_design 程式碼範例][platform_design code samples]。

:::secondary
針對第二種情境的初步指引
正陸續新增至 UI 元件區塊。
你可以在 [issue #8427][8427] 留言，提出更多指引需求。
:::

[`android.app.AlertDialog`]: {{site.android-dev}}/reference/android/app/AlertDialog.html
[issue #8410]: {{site.repo.flutter}}/issues/8410#issuecomment-468034023
[Material/Cupertino adaptive widget problem definition]: https://bit.ly/flutter-adaptive-widget-problem
[platform_design code samples]: {{site.repo.samples}}/tree/main/platform_design

## 頁面導覽

Flutter 提供 Android 與 iOS 常見的導覽模式，
並會自動根據目前平台調整導覽動畫。

### 導覽轉場

在 **Android** 上，預設的 [`Navigator.push()`][`Navigator.push()`] 轉場
模仿 [`startActivity()`][`startActivity()`]，
通常呈現自下而上的動畫變化。

在 **iOS** 上：

* 預設的 [`Navigator.push()`][`Navigator.push()`] API 產生 iOS Show/Push 風格的轉場，
  依據語系的 RTL 設定，動畫會從結尾到開頭（end-to-start）。
  新路徑後方的頁面也會以 iOS 風格的視差滑動同方向移動。
* 當推送的頁面路由其 [`PageRoute.fullscreenDialog`][`PageRoute.fullscreenDialog`] 為 true 時，
  會使用獨立的自下而上轉場風格。
  這對應 iOS 的 Present/Modal 風格轉場，通常用於全螢幕模態頁面。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-android.webp", img-style:"border-radius: 12px;", caption:"Android 頁面轉場", alt:"An animation of the bottom-up page transition on Android" %}
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-ios.webp", img-style:"border-radius: 22px;", caption:"iOS push 轉場", alt:"An animation of the end-start style push page transition on iOS" %}
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-ios-modal.webp", img-style:"border-radius: 22px;", caption:"iOS present 轉場", alt:"An animation of the bottom-up style present page transition on iOS" %}
</div>

[`Navigator.push()`]: {{site.api}}/flutter/widgets/Navigator/push.html
[`startActivity()`]: {{site.android-dev}}/reference/kotlin/android/app/Activity#startactivity
[`PageRoute.fullscreenDialog`]: {{site.api}}/flutter/widgets/PageRoute-class.html

### 平台專屬轉場細節

在 **Android** 上，Flutter 採用 [`ZoomPageTransitionsBuilder`][`ZoomPageTransitionsBuilder`] 動畫。
當使用者點擊某項目時，UI 會放大進入該項目的畫面；
返回時 UI 則縮小回前一個畫面。

在 **iOS** 上，當使用 push 風格轉場時，
Flutter 內建的 [`CupertinoNavigationBar`][`CupertinoNavigationBar`]
與 [`CupertinoSliverNavigationBar`][`CupertinoSliverNavigationBar`] 導覽列
會自動將每個子元件動畫過渡到下一頁或前一頁
對應的 `CupertinoNavigationBar` 或 `CupertinoSliverNavigationBar`。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/android-zoom-animation.png", img-style:"border-radius: 12px;", caption:"Android", alt:"An animation of the page transition on Android" %}
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-ios-nav-bar.webp", img-style:"border-radius: 22px;", caption:"iOS 導覽列", alt:"An animation of the nav bar transitions during a page transition on iOS" %}
</div>

[`ZoomPageTransitionsBuilder`]: {{site.api}}/flutter/material/ZoomPageTransitionsBuilder-class.html
[`CupertinoNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoNavigationBar-class.html
[`CupertinoSliverNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoSliverNavigationBar-class.html

### 返回導覽

在 **Android** 上，
作業系統的返回鍵預設會傳送給 Flutter，
並彈出 [`WidgetsApp`][`WidgetsApp`] 的 Navigator 最上層路由。

在 **iOS** 上，
可以使用邊緣滑動手勢來彈出最上層路由。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-android-back.webp", img-style:"border-radius: 12px;", caption:"Android 返回鍵", alt:"A page transition triggered by the Android back button" %}
  {% render docs/app-figure.md, image:"platform-adaptations/navigation-ios-back.webp", img-style:"border-radius: 22px;", caption:"iOS 返回滑動手勢", alt:"A page transition triggered by an iOS back swipe gesture" %}
</div>

[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html

## 捲動（Scrolling）

捲動是平台視覺與體驗的重要一環，
Flutter 會自動調整捲動行為以符合目前平台。

### 物理模擬

Android 與 iOS 都有複雜的捲動物理模擬，
難以用文字完整描述。
一般而言，iOS 的可捲動區塊具有較高的慣性與動態摩擦力，
而 Android 則有較高的靜態摩擦力。
因此，iOS 捲動加速較慢、停止較不突兀，
且在低速時較為滑順。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-soft.webp", caption:"輕拋比較", alt:"A soft fling where the iOS scrollable slid longer at lower speed than Android" %}
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-medium.webp", caption:"中等拋比較", alt:"A medium force fling where the Android scrollable reaches speed faster and stopped more abruptly after reaching a longer distance" %}
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-strong.webp", caption:"強拋比較", alt:"A strong fling where the Android scrollable reaches speed faster and covered significantly more distance" %}
</div>

### 超出邊界行為（Overscroll behavior）

在 **Android** 上，
捲動超過可捲動區塊邊界時會顯示
[overscroll glow indicator][overscroll glow indicator] (based on the color
of the current Material theme)。

在 **iOS** 上，捲動超過邊界時會
[overscroll][overscrolls]，隨著阻力增加而回彈。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-overscroll.webp", caption:"動態超出邊界比較", alt:"Android and iOS scrollables being flung past their edge and exhibiting platform specific overscroll behavior" %}
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-static-overscroll.webp", caption:"靜態超出邊界比較", alt:"Android and iOS scrollables being overscrolled from a resting position and exhibiting platform specific overscroll behavior" %}
</div>

[overscroll glow indicator]: {{site.api}}/flutter/widgets/GlowingOverscrollIndicator-class.html
[overscrolls]: {{site.api}}/flutter/widgets/BouncingScrollPhysics-class.html

### 慣性（Momentum）

在 **iOS** 上，
連續向同一方向拋動會堆疊慣性，
每次拋動都會加快速度。
Android 則沒有此行為。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-momentum-ios.webp", caption:"iOS 捲動慣性", alt:"Repeated scroll flings building momentum on iOS" %}
</div>

### 返回頂部

在 **iOS** 上，
點擊作業系統狀態列會將主捲動控制器
捲動回頂部位置。
Android 則沒有此行為。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/scroll-tap-to-top-ios.webp", img-style:"border-radius: 22px;", caption:"iOS 狀態列點擊返回頂部", alt:"Tapping the status bar scrolls the primary scrollable back to the top" %}
</div>

## 字體排版（Typography）

使用 Material 套件時，
字體會自動預設為該平台適合的字型。
Android 使用 Roboto 字型，
iOS 則使用 San Francisco 字型。

使用 Cupertino 套件時，[預設主題][default theme]
會採用 San Francisco 字型。

San Francisco 字型授權僅限於
iOS、macOS 或 tvOS 上執行的軟體使用。
因此，若在 Android 上將平台偽裝為 iOS 或使用預設 Cupertino 主題時，
會自動使用替代字型。

你也可以選擇將 Material 元件的文字樣式調整為符合 iOS 預設樣式。
你可以在 [UI 元件區塊](#文字欄位) 看到元件專屬範例。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/typography-android.png", img-style:"border-radius: 12px;", caption:"Android 上的 Roboto", alt:"Roboto font typography scale on Android" %}
  {% render docs/app-figure.md, image:"platform-adaptations/typography-ios.png", img-style:"border-radius: 22px;", caption:"iOS 上的 San Francisco", alt:"San Francisco typography scale on iOS" %}
</div>

[default theme]: {{site.repo.flutter}}/blob/main/packages/flutter/lib/src/cupertino/text_theme.dart

## 圖示設計（Iconography）

使用 Material 套件時，
部分圖示會根據平台自動顯示不同圖形。
例如，溢出按鈕的三個點在 iOS 為橫向排列，
Android 則為縱向排列。
返回按鈕在 iOS 為簡單的山形符號（chevron），
Android 則有一條主幹。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/iconography-android.png", caption:"Android 上的圖示", alt:"Android appropriate icons" %}
  {% render docs/app-figure.md, image:"platform-adaptations/iconography-ios.png", caption:"iOS 上的圖示", alt:"iOS appropriate icons" %}
</div>

Material 函式庫也透過 [`Icons.adaptive`][`Icons.adaptive`]
提供一組平台自適應圖示。

[`Icons.adaptive`]: {{site.api}}/flutter/material/PlatformAdaptiveIcons-class.html

## 觸覺回饋（Haptic feedback）

Material 與 Cupertino 套件會在特定情境下
自動觸發符合平台的觸覺回饋。

例如，
在文字欄位長按選取單字時，
Android 會有「嗡嗡」震動，
iOS 則不會。

在 iOS 上捲動選擇器項目時，
會有「輕微敲擊」的觸覺回饋，
Android 則無。

## 文字編輯

Material 與 Cupertino 的文字輸入欄位
皆支援拼字檢查，並會根據平台
自動套用正確的拼字檢查設定、
拼字檢查選單與標示顏色。

Flutter 也會在編輯文字欄位內容時，
根據目前平台自動做出下列適應：

### 鍵盤手勢導覽

在 **Android** 上，
可於軟體鍵盤的 <kbd>space</kbd> 鍵上左右滑動，
以在 Material 與 Cupertino 文字欄位中移動游標。

在具備 3D Touch 功能的 **iOS** 裝置上，
可於軟體鍵盤上用重按並拖曳手勢，
以浮動游標在 2D 空間移動游標。
此功能適用於 Material 與 Cupertino 文字欄位。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/text-keyboard-move-android.webp", caption:"Android 空白鍵游標移動", alt:"Moving the cursor via the space key on Android" %}
  {% render docs/app-figure.md, image:"platform-adaptations/text-keyboard-move-ios.webp", caption:"iOS 3D Touch 拖曳游標移動", alt:"Moving the cursor via 3D Touch drag on the keyboard on iOS" %}
</div>

### 文字選取工具列

在 **Android** 上使用 Material 時，
於文字欄位選取文字時會顯示 Android 風格的選取工具列。

在 **iOS** 上使用 Material 或使用 **Cupertino** 時，
於文字欄位選取文字時會顯示 iOS 風格的選取工具列。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/text-toolbar-android.png", caption:"Android 文字選取工具列", alt:"Android appropriate text toolbar" %}
  {% render docs/app-figure.md, image:"platform-adaptations/text-toolbar-ios.png", caption:"iOS 文字選取工具列", alt:"iOS appropriate text toolbar" %}
</div>

### 單擊手勢

在 **Android** 上使用 Material 時，
於文字欄位單擊會將游標放在點擊位置。

若為收合的文字選取，會顯示可拖曳的控制點，
以便後續移動游標。

在 **iOS** 上使用 Material 或使用 **Cupertino** 時，
於文字欄位單擊會將游標放在所點單字的最近邊緣。

iOS 上收合的文字選取不會顯示可拖曳控制點。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/text-single-tap-android.webp", caption:"Android 點擊", alt:"Moving the cursor to the tapped position on Android" %}
  {% render docs/app-figure.md, image:"platform-adaptations/text-single-tap-ios.webp", caption:"iOS 點擊", alt:"Moving the cursor to the nearest edge of the tapped word on iOS" %}
</div>

### 長按手勢

在 **Android** 上使用 Material 時，
長按會選取長按下的單字，
放開後顯示選取工具列。

在 **iOS** 上使用 Material 或使用 **Cupertino** 時，
長按會將游標放在長按位置，
放開後顯示選取工具列。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/text-long-press-android.webp", caption:"Android 長按", alt:"Selecting a word with long press on Android" %}
  {% render docs/app-figure.md, image:"platform-adaptations/text-long-press-ios.webp", caption:"iOS 長按", alt:"Selecting a position with long press on iOS" %}
</div>

### 長按拖曳手勢

在 **Android** 上使用 Material 時，
長按拖曳會擴展所選單字範圍。

在 **iOS** 上使用 Material 或使用 **Cupertino** 時，
長按拖曳會移動游標。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/text-long-press-drag-android.webp", caption:"Android 長按拖曳", alt:"Expanding word selection with a long-press drag on Android" %}
  {% render docs/app-figure.md, image:"platform-adapt 

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

然而，由於應用程式列（app bars）會與頁面中的其他內容一同顯示，建議僅在與應用程式整體風格一致時才調整其樣式。你可以在 [GitHub 討論區關於 app bar 適應性調整的討論][appbar-post] 中查看更多程式碼範例與進一步說明。

[mat-appbar]: {{site.material}}/components/top-app-bar/overview
[hig-appbar]: {{site.apple-dev}}/design/human-interface-guidelines/components/navigation-and-search/navigation-bars/
[appbar-post]: {{site.repo.uxr}}/discussions/93

### 底部導覽列（Bottom navigation bars）

自 Android 12 起，底部導覽列的預設 UI 採用了 [Material 3][mat-navbar] 所定義的設計指引。在 iOS 上，對應的元件稱為「Tab Bars（分頁列）」，其設計規範可參考 [Apple 的人機介面指引（Human Interface Guidelines）][hig-tabbar] (HIG)。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/mat-navbar.png", caption:"Material 3 的底部導覽列", alt:"Bottom Navigation Bar in Material 3", height: "160px" %}
  {% render docs/app-figure.md, image:"platform-adaptations/hig-tabbar.png", caption:"Human Interface Guidelines 中的 Tab Bar", alt:"Tab Bar in Human Interface Guidelines", height: "160px" %}
</div>

由於分頁列（tab bars）會在整個應用程式中持續顯示，因此應該符合你自己的品牌風格。不過，如果你選擇在 Android 上使用 Material 的預設樣式，也可以考慮在 iOS 上採用預設的分頁列樣式。

若要實作平台專屬的底部導覽列，你可以在 Android 上使用 Flutter 的 `NavigationBar` 元件，在 iOS 上則使用 `CupertinoTabBar` 元件。以下提供一個程式碼片段，你可以依需求調整，以顯示平台專屬的導覽列。

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

### 文字欄位

自 Android 12 起，文字欄位遵循
[Material 3][m3-text-field] (M3) 設計指引。
在 iOS 上，Apple 的 [人機介面指引（Human Interface Guidelines）][hig-text-field] (HIG)
則定義了對應的元件。

<div class="wrapping-row">
  {% render docs/app-figure.md, image:"platform-adaptations/m3-text-field.png", caption:"Material 3 的文字欄位", alt:"Text Field in Material 3", width:"320px", height:"100px" %}
  {% render docs/app-figure.md, image:"platform-adaptations/hig-text-field.png", caption:"HIG 的文字欄位", alt:"Text Field in Human Interface Guidelines", width:"320px", height:"100px" %}
</div>

由於文字欄位需要用戶輸入，  
其設計應遵循平台慣例。

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

想進一步了解如何調整文字欄位（text fields），請參閱
[GitHub 上關於文字欄位的討論][text-field-post]。
你可以在該討論中留下回饋或提出問題。

[text-field-post]: {{site.repo.uxr}}/discussions/95
[m3-text-field]: {{site.material}}/components/text-fields/overview
[hig-text-field]: {{site.apple-dev}}/design/human-interface-guidelines/text-fields
