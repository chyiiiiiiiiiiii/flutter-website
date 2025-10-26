---
title: 遷移至 Material 3
description: >-
  學習如何將你的 Flutter 應用程式 UI 從 Material 2 遷移到 Material 3。
---

{% render docs/breaking-changes.md %}

## 摘要

Materials 函式庫已更新以符合 Material 3 Design 規範。這次更新包含了新的元件 (Widgets) 與元件主題、更新的元件視覺效果，以及更多內容。許多更新會自動套用。當你將應用程式以 3.16（或更高）版本重新編譯時，受影響的元件 (Widget) 將會顯示新版本。不過，為了完成遷移，仍有部分步驟需要手動處理。

## 遷移指南

在 3.16 版本之前，你可以透過將 `useMaterial3` 旗標設為 true 來選擇啟用 Material 3 變更。自 Flutter 3.16 版本（2023 年 11 月）起，`useMaterial3` 預設為 true。

另外，你_可以_透過將 `useMaterial3` 設為 `false`，讓應用程式回復 Material 2 行為。然而，這僅是暫時性的解決方案。根據 Flutter 的淘汰政策，`useMaterial3` 旗標_以及_ Material 2 的實作最終都會被移除。

### 顏色

`ThemeData.colorScheme` 的預設值已更新，以符合 Material 3 Design 規範。

`ColorScheme.fromSeed` 建構子會根據給定的 `seedColor` 產生一個 `ColorScheme`。這個建構子所產生的顏色設計上能夠協同運作，並符合 Material 3 Design 系統的無障礙對比需求。

當你升級到 3.16 版本時，如果沒有正確的 `ColorScheme`，你的 UI 可能會顯得有些奇怪。為了解決這個問題，請遷移至由 `ColorScheme.fromSeed` 建構子產生的 `ColorScheme`。

遷移前的程式碼：

```dart
theme: ThemeData(
  colorScheme: ColorScheme.light(primary: Colors.blue),
),
```

遷移後的程式碼：

```dart
theme: ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
),
```

若要產生基於內容的動態配色方案，請使用
`ColorScheme.fromImageProvider` 靜態方法。關於如何產生配色方案的範例，請參考 [`ColorScheme` from a network image][`ColorScheme` from a network image] 範例。

[`ColorScheme` from a network image]: {{site.api}}/flutter/material/ColorScheme/fromImageProvider.html

Flutter Material 3 的變更包含了新的背景顏色。
`ColorScheme.surfaceTint` 表示一個有提升效果的元件 (Widget)。
有些元件會使用不同的顏色。

若您希望將應用程式的 UI 恢復到先前的行為（我們不建議這麼做）：

* 當主題為 `Brightness.light` 時，將 `Colors.grey[50]!` 設為 `ColorScheme.background`。
* 當主題為 `Brightness.dark` 時，將 `Colors.grey[850]!` 設為 `ColorScheme.background`。

遷移前的程式碼：

```dart
theme: ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
),
```

遷移後的程式碼：

```dart
theme: ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple).copyWith(
    background: Colors.grey[50]!,
  ),
),
```

```dart
darkTheme: ThemeData(
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.deepPurple,
    brightness: Brightness.dark,
  ).copyWith(background: Colors.grey[850]!),
),
```

`ColorScheme.surfaceTint` 值表示元件在 Material 3 中的 elevation（高度）。有些元件（Widgets）可能同時使用 `surfaceTint` 和 `shadowColor` 來表示 elevation（例如 `Card` 和 `ElevatedButton`），而其他元件則可能只使用 `surfaceTint` 來表示 elevation（例如 `AppBar`）。

若要回復元件（Widget）先前的行為，請在主題（theme）中將 `Colors.transparent` 設為 `ColorScheme.surfaceTint`。若要讓元件的陰影與內容區分開來（當其沒有陰影時），請在沒有預設陰影顏色的元件主題（widget theme）中，將 `ColorScheme.shadow` 顏色設為 `shadowColor` 屬性。

遷移前的程式碼：

```dart
theme: ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
),
```

遷移後的程式碼：

```dart
theme: ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple).copyWith(
    surfaceTint: Colors.transparent,
  ),
  appBarTheme: AppBarTheme(
   elevation: 4.0,
   shadowColor: Theme.of(context).colorScheme.shadow,
 ),
),
```

`ElevatedButton` 現在會以全新的配色組合進行自我樣式設定。  
先前，當 `useMaterial3` 旗標設為 false 時，`ElevatedButton` 會以 `ColorScheme.primary` 作為背景色，以及 `ColorScheme.onPrimary` 作為前景色來進行樣式設定。若要達到相同的視覺效果，請改用新的 `FilledButton` 元件（Widget），但不包含 elevation 變化或陰影效果。

遷移前的程式碼如下：

```dart
ElevatedButton(
  onPressed: () {},
  child: const Text('Button'),
),
```

遷移後的程式碼：

```dart
ElevatedButton(
  style: ElevatedButton.styleFrom(
    backgroundColor: Theme.of(context).colorScheme.primary,
    foregroundColor: Theme.of(context).colorScheme.onPrimary,
  ),
  onPressed: () {},
  child: const Text('Button'),
),
```

### 字體排版（Typography）

`ThemeData.textTheme` 的預設值已更新，以符合 Material 3 的預設設定。這些變更包含字體大小、字重、字距（letter spacing）以及行高的調整。更多細節請參閱 [`TextTheme`][`TextTheme`] 文件。

如以下範例所示，在 3.16 版本之前，當一個在受限版面中使用 `TextTheme.bodyLarge` 的 `Text` 元件（Widget）顯示長字串時，會將文字自動換行為兩行。然而，在 3.16 版本中，文字會換行為三行。如果你需要維持先前的行為，請調整文字樣式，並在必要時調整字距（letter spacing）。

遷移前的程式碼：

```dart
ConstrainedBox(
  constraints: const BoxConstraints(maxWidth: 200),
    child: Text(
      'This is a very long text that should wrap to multiple lines.',
      style: Theme.of(context).textTheme.bodyLarge,
  ),
),
```

遷移後的程式碼：

```dart
ConstrainedBox(
  constraints: const BoxConstraints(maxWidth: 200),
    child: Text(
      'This is a very long text that should wrap to multiple lines.',
      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
        letterSpacing: 0.0,
      ),
  ),
),
```

[`TextTheme`]: {{site.api}}/flutter/material/TextTheme-class.html

### 元件 (Components)

有些元件（Widgets）無法僅僅透過更新來符合 Material 3 Design 規範，而是需要全新的實作。這類元件（Widgets）需要手動遷移，因為 Flutter SDK（Flutter 軟體開發套件）無法確切知道你想要什麼。

請將 Material 2 風格的 [`BottomNavigationBar`][`BottomNavigationBar`] 元件（Widget）替換為新的
[`NavigationBar`][`NavigationBar`] 元件（Widget）。新元件稍微更高，包含膠囊形狀的導覽指示器，並採用新的顏色對應方式。

遷移前的程式碼：

```dart
BottomNavigationBar(
  items: const <BottomNavigationBarItem>[
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Home',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.business),
      label: 'Business',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.school),
      label: 'School',
    ),
  ],
),
```

遷移後的程式碼：

```dart
NavigationBar(
  destinations: const <Widget>[
    NavigationDestination(
      icon: Icon(Icons.home),
      label: 'Home',
    ),
    NavigationDestination(
      icon: Icon(Icons.business),
      label: 'Business',
    ),
    NavigationDestination(
      icon: Icon(Icons.school),
      label: 'School',
    ),
  ],
),
```

請參考完整範例：[migrating from `BottomNavigationBar` to `NavigationBar`][migrating from `BottomNavigationBar` to `NavigationBar`]。

請將 [`Drawer`][`Drawer`] 元件（Widget）替換為 [`NavigationDrawer`][`NavigationDrawer`]，它提供膠囊形（pill-shaped）的導覽指示器、圓角以及全新的顏色對應。

遷移前的程式碼如下：

```dart
Drawer(
  child: ListView(
    children: <Widget>[
      DrawerHeader(
        child: Text(
          'Drawer Header',
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
      ListTile(
        leading: const Icon(Icons.message),
        title: const Text('Messages'),
        onTap: () { },
      ),
      ListTile(
        leading: const Icon(Icons.account_circle),
        title: const Text('Profile'),
        onTap: () {},
      ),
      ListTile(
        leading: const Icon(Icons.settings),
        title: const Text('Settings'),
        onTap: () { },
      ),
    ],
  ),
),
```

遷移後的程式碼：

```dart
NavigationDrawer(
  children: <Widget>[
    DrawerHeader(
      child: Text(
        'Drawer Header',
        style: Theme.of(context).textTheme.titleLarge,
      ),
    ),
    const NavigationDrawerDestination(
      icon: Icon(Icons.message),
      label: Text('Messages'),
    ),
    const NavigationDrawerDestination(
      icon: Icon(Icons.account_circle),
      label: Text('Profile'),
    ),
    const NavigationDrawerDestination(
      icon: Icon(Icons.settings),
      label: Text('Settings'),
    ),
  ],
),
```

請參閱
[從 `Drawer` 遷移到 `NavigationDrawer` 的完整範例][migrating from `Drawer` to `NavigationDrawer`]。

Material 3 引入了 medium（中型）與 large（大型）app bar，這些 app bar 在捲動前會顯示較大的標題。當捲動時，系統不再使用陰影效果，而是利用 `ColorScheme.surfaceTint` 顏色來與內容區分。

以下程式碼展示如何實作 medium app bar：

```dart
CustomScrollView(
  slivers: <Widget>[
    const SliverAppBar.medium(
      title: Text('Title'),
    ),
    SliverToBoxAdapter(
      child: Card(
        child: SizedBox(
          height: 1200,
          child: Padding(
            padding: const EdgeInsets.fromLTRB(8, 100, 8, 100),
            child: Text(
              'Here be scrolling content...',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
          ),
        ),
      ),
    ),
  ],
),
```

現在有兩種類型的 [`TabBar`][`TabBar`] 元件（Widgets）：主要（primary）和次要（secondary）。
次要分頁（secondary tabs）用於內容區域內，進一步區分相關內容並建立階層結構。請參考 [`TabBar.secondary`][`TabBar.secondary`]
範例。

新的 [`TabBar.tabAlignment`][`TabBar.tabAlignment`] 屬性用於指定分頁的水平對齊方式。

以下範例展示如何在可滾動的 `TabBar` 中修改分頁的對齊方式：

```dart
AppBar(
  title: const Text('Title'),
  bottom: const TabBar(
    tabAlignment: TabAlignment.start,
    isScrollable: true,
    tabs: <Widget>[
      Tab(
        icon: Icon(Icons.cloud_outlined),
      ),
      Tab(
        icon: Icon(Icons.beach_access_sharp),
      ),
      Tab(
        icon: Icon(Icons.brightness_5_sharp),
      ),
    ],
  ),
),
```

[`SegmentedButton`][`SegmentedButton`]，這是 [`ToggleButtons`][`ToggleButtons`] 的更新版本，
採用了完全圓角設計，版面配置高度與尺寸有所不同，
並使用 Dart `Set` 來判斷已選取的項目。

遷移前的程式碼：

```dart
enum Weather { cloudy, rainy, sunny }

ToggleButtons(
  isSelected: const [false, true, false],
  onPressed: (int newSelection) { },
  children: const <Widget>[
    Icon(Icons.cloud_outlined),
    Icon(Icons.beach_access_sharp),
    Icon(Icons.brightness_5_sharp),
  ],
),
```

遷移後的程式碼：

```dart
enum Weather { cloudy, rainy, sunny }

SegmentedButton<Weather>(
  selected: const <Weather>{Weather.rainy},
  onSelectionChanged: (Set<Weather> newSelection) { },
  segments: const <ButtonSegment<Weather>>[
    ButtonSegment(
      icon: Icon(Icons.cloud_outlined),
      value: Weather.cloudy,
    ),
    ButtonSegment(
      icon: Icon(Icons.beach_access_sharp),
      value: Weather.rainy,
    ),
    ButtonSegment(
      icon: Icon(Icons.brightness_5_sharp),
      value: Weather.sunny,
    ),
  ],
),
```

請參閱完整範例：[從 `ToggleButtons` 遷移到 `SegmentedButton`][migrating from `ToggleButtons` to `SegmentedButton`]。

[migrating from `BottomNavigationBar` to `NavigationBar`]: {{site.api}}/flutter/material/BottomNavigationBar-class.html#material.BottomNavigationBar.2
[migrating from `Drawer` to `NavigationDrawer`]: {{site.api}}/flutter/material/Drawer-class.html#material.Drawer.2
[migrating from `ToggleButtons` to `SegmentedButton`]: {{site.api}}/flutter/material/ToggleButtons-class.html#material.ToggleButtons.1

#### 新元件

 * 「選單列與階層式選單（Menu bars and cascading menus）」提供一套桌面風格的選單系統，可完全透過滑鼠或鍵盤操作。選單由 [`MenuBar`][`MenuBar`] 或 [`MenuAnchor`][`MenuAnchor`] 作為錨點。這套新選單系統並非現有應用程式必須遷移的對象，但若您的應用程式部署於 Web 或桌面平台，建議考慮使用它來取代 `PopupMenuButton`（及相關）類別。
 * [`DropdownMenu`][`DropdownMenu`] 結合了文字欄位 (text field) 與選單，實現所謂的 _combo box_。使用者可以輸入相符字串，或透過觸控、滑鼠、鍵盤操作選單，從可能很長的清單中選擇項目。這可以作為 `DropdownButton` 元件（Widget）的良好替代方案，雖然並非強制必要。
 * [`SearchBar`][`SearchBar`] 與 [`SearchAnchor`][`SearchAnchor`] 適用於使用者輸入查詢、應用程式計算符合條件的回應清單，然後讓使用者選擇其中一項或調整查詢的互動情境。
 * [`Badge`][`Badge`] 會為其子元件加上一個僅數個字元的小標籤，例如「+1」。徽章（Badge）通常用於裝飾 `NavigationDestination`、`NavigationRailDestination`、`NavigationDrawerDestination` 中的圖示，或按鈕的圖示，如 `TextButton.icon`。
 * [`FilledButton`] 與 [`FilledButton.tonal`][`FilledButton.tonal`] 與 `ElevatedButton` 類似，但沒有高程（elevation）變化與陰影效果。
 * [`FilterChip.elevated`][`FilterChip.elevated`]、[`ChoiceChip.elevated`][`ChoiceChip.elevated`] 及 [`ActionChip.elevated`] 則是同類型 chip 的高程變體，具備陰影與填充色。
 * [`Dialog.fullscreen`][`Dialog.fullscreen`] 會填滿整個螢幕，通常在頂部包含標題、動作按鈕與關閉按鈕。

[`BottomNavigationBar`]: {{site.api}}/flutter/material/BottomNavigationBar-class.html
[`NavigationBar`]: {{site.api}}/flutter/material/NavigationBar-class.html
[`Drawer`]: {{site.api}}/flutter/material/Drawer-class.html
[`NavigationDrawer`]: {{site.api}}/flutter/material/NavigationDrawer-class.html
[`TabBar`]: {{site.api}}/flutter/material/TabBar-class.html
[`TabBar.secondary`]: {{site.api}}/flutter/material/TabBar/TabBar.secondary.html
[`TabBar.tabAlignment`]: {{site.api}}/flutter/material/TabBar/tabAlignment.html
[`SegmentedButton`]: {{site.api}}/flutter/material/SegmentedButton-class.html
[`ToggleButtons`]: {{site.api}}/flutter/material/ToggleButtons-class.html
[`MenuBar`]: {{site.api}}/flutter/material/MenuBar-class.html
[`MenuAnchor`]: {{site.api}}/flutter/material/MenuAnchor-class.html
[`DropdownMenu`]: {{site.api}}/flutter/material/DropdownMenu-class.html
[`SearchBar`]: {{site.api}}/flutter/material/SearchBar-class.html
[`SearchAnchor`]: {{site.api}}/flutter/material/SearchAnchor-class.html
[`Badge`]: {{site.api}}/flutter/material/Badge-class.html
[`FilledButton`]: {{site.api}}/flutter/material/FilledButton-class.html
[`FilledButton.tonal`]: {{site.api}}/flutter/material/FilledButton/FilledButton.tonal.html
[`FilterChip.elevated`]: {{site.api}}/flutter/material/FilterChip/FilterChip.elevated.html
[`ChoiceChip.elevated`]: {{site.api}}/flutter/material/ChoiceChip/ChoiceChip.elevated.html
[`ActionChip.elevated`]: {{site.api}}/flutter/material/ActionChip/ActionChip.elevated.html
[`Dialog.fullscreen`]: {{site.api}}/flutter/material/Dialog/Dialog.fullscreen.html

## 時程

穩定版釋出：3.16

## 參考資料

文件：

* [Flutter 的 Material Design][Material Design for Flutter]

API 文件：

* [`ThemeData.useMaterial3`][`ThemeData.useMaterial3`]

相關議題：

* [Material 3 umbrella issue][Material 3 umbrella issue]

相關 PR：

* [將 `ThemeData.useMaterial3` 的預設值改為 true][Change the default for `ThemeData.useMaterial3` to true]
* [更新 `ThemeData.useMaterial3` API 文件，預設值為 true][Updated `ThemeData.useMaterial3` API doc, default is true]


[Material 3 umbrella issue]: {{site.repo.flutter}}/issues/91605
[Material Design for Flutter]: /ui/design/material
[`ThemeData.useMaterial3`]: {{site.api}}/flutter/material/ThemeData/useMaterial3.html
[Change the default for `ThemeData.useMaterial3` to true]: {{site.repo.flutter}}/pull/129724
[Updated `ThemeData.useMaterial3` API doc, default is true]: {{site.repo.flutter}}/pull/130764
