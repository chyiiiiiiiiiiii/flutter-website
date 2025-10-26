---
title: Flutter 更新日誌 0.0.21 - 1.0.0
shortTitle: Flutter 更新日誌至 1.0.0
description: 歷史更新日誌 wiki 頁面，包含 Flutter 0.0.21 至 1.0.0 之間的發行資訊。
---

_本頁為 Flutter wiki 舊版更新日誌頁面的匯總，內容涵蓋至 flutter.dev 上正式發佈的 [Flutter release notes](./) 之前。_

## 1.0.0（含）以前的變更

* Skia 與引擎（engine）升級以解決以下問題：
  * [video_player 在 Flutter 更新至 0.11.3 後出現圖片失真問題](https://github.com/flutter/flutter/issues/24402)
  * [相機預覽畫面上出現綠色閃爍條](https://github.com/flutter/flutter/issues/24289)
  * [從 0.9.4 升級到 0.10.2 後，Adreno 3xx 裝置上的圖片渲染問題](https://github.com/flutter/flutter/issues/24517)
* 引擎升級以修復
  * [在 iOS 上為第一個 locale 預先加上 [NSLocale currentLocale] 以確保 countryCode 存在，並允許僅語言的 locale。](https://github.com/flutter/engine/issues/6995)
  * [解除 Fuchsia 升級阻礙的相關變更](https://github.com/flutter/engine/issues/6949)
* 工具鏈相關的多項修正，針對文件、文件，以及範本所附帶的文件進行改善。

## v0.10.2 之後的變更
* [flutter/engine#6883](https://github.com/flutter/engine/pull/6883) - FlutterViewController 預設將不再載入您的應用程式啟動畫面。該實作已移至新方法 `loadDefaultSplashScreenView`。
* [#23755](https://github.com/flutter/flutter/pull/23755) 移除了 flutter_test 對 `package:test` 的直接相依。Flutter 現在需要 test 版本 1.5.1 與 mockito 版本 4.0.0。

  ### 重大變更：
  這需要您在 pubspec.yaml（設定檔）中明確新增相依套件： 
  ```yaml
  dev_dependencies:
    test: ^1.5.1
  ```
* [#24024](https://github.com/flutter/flutter/pull/24024) 以及 [flutter/engine#6760](https://github.com/flutter/engine/pull/6760) 將 harfbuzz 升級至 2.1.0，顯著提升文字排版效能，並加強 iOS 上的零寬連字元（zwj）支援，讓表情符號顯示更佳。
* [#23417](https://github.com/flutter/flutter/pull/23417) 當 locale 不可用或無效時，提供 `null`，而非 `_`。
* [#23583](https://github.com/flutter/flutter/pull/23583) 改進在地化（localization）演算法，支援 scriptCodes 及完整偏好語系清單，當 locale 變更時，callback 會有破壞性變更（傳遞清單而非單一 locale）。

### v0.11.0
* [#23320](https://github.com/flutter/flutter/pull/23320) 為 Cupertino 導航列的跨頁轉場新增回滑手勢支援。
* [#23320](https://github.com/flutter/flutter/pull/23322) 新增多個 Navigator 之間的 Hero 動畫轉場支援。

## v0.10.2（自 v0.9.4 起的變更）- beta 10

### v0.10.2
* [#23194](https://github.com/flutter/flutter/pull/23194) 新增 CupertinoTextField，提供 iOS 風格的文字輸入欄位。
* [#23221](https://github.com/flutter/flutter/pull/23221) 為 Cupertino 導航列的跨頁轉場新增 RTL（由右至左）支援。

### v0.10.1
* [#22977](https://github.com/flutter/flutter/pull/22977) 將大部分 `Null` 替換為 `void`。詳見[提案郵件](https://groups.google.com/forum/#!topic/flutter-dev/b7TKGqERNTM)。
* [#22985](https://github.com/flutter/flutter/pull/22985) 實作正確的正交投影
* [#23104](https://github.com/flutter/flutter/pull/23104) 更新換行訊息
* [#22924](https://github.com/flutter/flutter/pull/22924) 支援停用互動式 TextField 游標及選取功能
* [#22870](https://github.com/flutter/flutter/pull/22870) 使用新的 `mixin` 語法實作 super-mixins
* [#22022](https://github.com/flutter/flutter/pull/22022) 允許 flutter create 命令列選項 "--project-name"
* [#23126](https://github.com/flutter/flutter/pull/23126) 每次導航時派發 Flutter.Navigation 事件。
* [#23183](https://github.com/flutter/flutter/pull/23183) 修正 gradle build 規則在切換時會重新執行的錯誤
* [#22394](https://github.com/flutter/flutter/pull/22394) 修正 ClampingScrollSimulation 中 spring 模擬超出範圍的問題
* [#23174](https://github.com/flutter/flutter/pull/23174) 啟用 lint 規則 prefer_void_to_null
* [#23184](https://github.com/flutter/flutter/pull/23184) TextTheme.apply() 不應假設 TextStyle 欄位為非 null
* [#23168](https://github.com/flutter/flutter/pull/23168) 新增蒙古語（mn）翻譯
* [#23167](https://github.com/flutter/flutter/pull/23167) 修正停用的 formfield 驗證問題
* [#23015](https://github.com/flutter/flutter/pull/23015) 在單行 TextField 按下 Enter 鍵時結束編輯
* [#23021](https://github.com/flutter/flutter/pull/23021) 簡化 iOS 使用 CocoaPods 進行 Add2App 的流程
* [#22825](https://github.com/flutter/flutter/pull/22825) 修正 Curves.bounceInOut 的數學計算
* [#22977](https://github.com/flutter/flutter/pull/22977) 偏好 void 而非 null
* [#22822](https://github.com/flutter/flutter/pull/22822) 新增 Long Press Up 的 callback
* [#18770](https://github.com/flutter/flutter/pull/18770) 為 DropdownButton 新增 `disabledHint`
* [#21657](https://github.com/flutter/flutter/pull/21657) 讓 AndroidView 可接受 gesture recognizer factories。
* [#22449](https://github.com/flutter/flutter/pull/22449) 新增文字陰影支援
* [flutter/engine#6644](https://github.com/flutter/engine/pull/6644) 為 Paragraph.getBoxesForRange() 新增 BoxHeightStyle 與 BoxWidthStyle 參數，以取得不同樣式的包覆框。
* Skia 更新，變更了模糊與抗鋸齒的底層實作，可能導致 golden tests 失敗。

### v0.9.7
* [flutter/engine#6393](https://github.com/flutter/engine/pull/6393) 為 Android MethodChannel/MethodCall 新增 nullability 標註。

### v0.9.6
* [#21251](https://github.com/flutter/flutter/pull/21251) 新增 CupertinoDatePicker，提供支援日期模式與日期＋時間模式的 iOS 風格選擇器。

## v0.9.4（自 v0.8.2 起的變更）- beta 9

### v0.9.4

* [#21715](https://github.com/flutter/flutter/pull/21715)，預設的 MaterialPageRoute 動畫轉場現在由 Theme 決定。新增（可選）Android P 風格頁面轉場支援。MaterialPageRoute 不再支援「託管」其他 route 以重用其 buildTransitions() 方法，因為 PageTransitionsBuilders（包含 CupertinoPageTransitionBuilder）現在是獨立物件。

### v0.9.3

* [#22108](https://github.com/flutter/flutter/pull/22108) 略微更動 `flutter doctor` 的輸出，可能影響依賴精確輸出的自動化腳本。

### v0.9.2

* [#21540](https://github.com/flutter/flutter/pull/21540) 為 [`Animatable`](https://api.flutter.dev/flutter/animation/Animatable-class.html) 新增 `transform()` 方法。該方法由 `Tween`（`Animatable` 的主要子類別）實作，但直接繼承 `Animatable` 的類別需自行實作。通常可將現有的 `evaluate()` 方法改為實作 `transform()`，並使用傳入 `transform()` 的參數值，而非目前由 `evaluate()` 提供的 animation 值。`evaluate()` 現在有預設實作，會委託給 `transform()`。

## v0.8.2（自 v0.7.3 起的變更）- beta 8

### v0.7.4
* [#20322](https://github.com/flutter/flutter/pull/20322) 在不同 `CupertinoNavigationBar` 與 `CupertinoSliverNavigationBar` 之間導覽時執行視差轉場效果。

## v0.7.3（自 v0.6.0 起的變更）- beta 7

### v0.7.3
* [#20966](https://github.com/flutter/flutter/pull/20966) 新增 `CupertinoTimerPicker`。

### v0.7.2
* [#20929](https://github.com/flutter/flutter/pull/20929) 修正 `CupertinoPageScaffold` 在鍵盤顯示時未正確內縮內容的錯誤。

### v0.7.1
* [#19637](https://github.com/flutter/flutter/pull/19637) `CupertinoNavigationBar` 與 `CupertinoSliverNavigationBar` 現在會根據其 `CupertinoPageRoute.title` 自動填入標題與返回按鈕標籤。

## v0.6.0（自 v0.5.1 起的變更）- beta 6

### v0.6.0
* Dart SDK 更新至 Dart 2 版本（2.1.0-dev.0.0）。套件與插件作者應確保其 `pubspec.yaml` 檔案包含 Dart SDK 上限為 `<3.0.0` 的約束。詳情請參閱 [Getting ready for Dart 2 post](https://blog.dart.dev/getting-ready-for-dart-2-and-making-your-packages-look-great-on-the-pub-site-118464d7f59d)。
* [#19025](https://github.com/flutter/flutter/pull/19025) 為一致性將 `CupertinoRefreshControl` 更名為 `CupertinoSliverRefreshControl`。
* [#19317](https://github.com/flutter/flutter/pull/19317) 為 TextField（Material）游標新增 cursorWidth 與 cursorRadius。
* [#20116](https://github.com/flutter/flutter/pull/20116) 釋出版二進位檔案大小減少約 2MB
* [#20267](https://github.com/flutter/flutter/pull/20267) 新增 `CupertinoSegmentedControl'.
* [#19232](https://github.com/flutter/flutter/pull/19232) adds `CupertinoActionSheet` for iOS-style bottom pop-up sheets.
* [#20101](https://github.com/flutter/flutter/pull/20101) improves `CupertinoScrollbar` visual fidelity during overscrolls.
* [#19789](https://github.com/flutter/flutter/pull/19789) adds support for infinite scrolling and looped scrolling for `CupertinoPicker`.
* [#18381](https://github.com/flutter/flutter/pull/18381) improves visual fidelity of `CupertinoAlertDialog`.

### v0.5.8
* [#19284](https://github.com/flutter/flutter/pull/19284) adds multi-column `CupertinoPicker` support for off-axis cylindrical projection.

### v0.5.7
* [#18469](https://github.com/flutter/flutter/pull/18469) added a `CupertinoApp` for creating iOS styled apps.

### v0.5.6
* [#18614](https://github.com/flutter/flutter/pull/18614) added `isInstanceOf` as a function exported from Flutter, because package:matcher has deprecated its implementation of `isInstanceOf`.
* [flutter/engine#5517](https://github.com/flutter/engine/pull/5517) enabled the `--sync-async` Dart flag.

### v0.5.5

* [#18488](https://github.com/flutter/flutter/pull/18488) made the `--debug-port` argument to `flutter trace` required, because the previous behaviour was unreliable and caused flaky tests.

### v0.5.2

* [#18096](https://github.com/flutter/flutter/pull/18096) changed the rendering of the character counter in text fields to more closely match the Material design specifications.

## Changes in v0.5.1 (since v0.3.2) - beta 5

### v0.5.0

* [#17661](https://github.com/flutter/flutter/pull/17661) changed the layout and size of `ListTile` to better conform to the latest Material design specs.

* [#17620](https://github.com/flutter/flutter/pull/17620) slightly reduces the default dimensions of `Checkbox`, `Radio`, and `Switch` to better conform to the latest Material design specs.

* [#17637](https://github.com/flutter/flutter/pull/17637) updates `Checkbox`, `Radio`, and `Switch` to use the `ThemeData` `toggleableActiveColor`. If you are using a light theme and are not specifying an `accentColor` in your `ThemeData`, these controls will now use a higher contrast shade from the primary swatch.

* [#17586](https://github.com/flutter/flutter/pull/17586) added a new `background` property to `TextStyle`. Subclasses must ensure that this property is handled in constructors and `copyWith`.

## Changes in v0.4.4 (since v0.3.2) - beta 4

### v0.4.0
* [#17021](https://github.com/flutter/flutter/pull/17021) added implicit a11y scrolling for iOS. For this, viewports define a cache extend before the leading as well as after the trailing edge and slivers are expected to provide semantics information if they fall into the cache extent.

  ### Breaking change
  With this change, children of a viewport that are currently not visible in the viewport are now considered off-stage. To find them in a test, specify `skipOffstage: false` on the Finder.

### v0.3.6

* [#17094](https://github.com/flutter/flutter/pull/17094) introduced the ability to do golden image testing in widget tests.  Within a widget test, you can now use the following matcher to ensure that your widget's rasterized image matches a golden file (e.g. `foo.png`):

  ```dart
  await expectLater(find.byType(MyWidget), matchesGoldenFile('foo.png'));
  ```

  ### 重大變更

此變更的一個結果是，所有透過 `flutter test` 執行的測試現在都會明確依賴於 `package:flutter_test`。`flutter test` 的使用者如果尚未在 `pubspec.yaml` 檔案中加入下列內容，則需要進行更新：

  ```yaml
  dev_dependencies:
    flutter_test:
      sdk: flutter
  ```

  如果您的 `pubspec.yaml` 未包含必要的相依套件，且您執行 `flutter test`，則會看到如下形式的錯誤訊息：

  ```console
  compiler message: Error: Could not resolve the package 'flutter_test' in 'package:flutter_test/flutter_test.dart'.
  ```

### v0.3.3

* [flutter/engine#5060](https://github.com/flutter/engine/pull/5060) 新增了透過 `Image.toByteData()` 將 `dart:ui Image` 編碼為 PNG 的能力。呼叫端若希望取得編碼後的位元組，可傳入 `format` 參數，如下所示：

  ```dart
  image.toByteData(format: ui.ImageByteFormat.png);
  ```

## v0.3.2 的變更（自 v0.3.1 起）- beta 3

## v0.3.1 的變更（自 v0.2.8 起）- beta 2 更新

我們已知 `HttpClient` 實作中存在憑證驗證的潛在問題。
如需追蹤我們的調查進度，請參閱 [Dart issue 32936](https://github.com/dart-lang/sdk/issues/32936)。

### v0.3.1

* [flutter/engine#4932](https://github.com/flutter/engine/pull/4932) 引入了全新的 shell 嵌入式 API，帶來了許多新功能。特別是，現在單一行程可以承載多個 Flutter shells。

* [flutter/engine#4762](https://github.com/flutter/engine/pull/4762) 與 [flutter/engine#5008](https://github.com/flutter/engine/pull/5008) 引入了 `Image.toByteData()`，可用於在 `dart:ui` 中取得 `Image` 實例的原始 RGBA 位元組。

* [#16721](https://github.com/flutter/flutter/pull/16721) 微調了 iOS 上的滾動動作啟動，避免滾動剛開始時產生跳動，並更貼近原生行為。

### v0.2.11

* [#16039](https://github.com/flutter/flutter/pull/16039) 與 [#16447](https://github.com/flutter/flutter/pull/16447) 大幅修訂了 `Chip` 實作，新增了新的 chip 類型：`InputChip`、`ChoiceChip`、`FilterChip`、`ActionChip`，並更新了 chip 的外觀。

### v0.2.9

* [#16187](https://github.com/flutter/flutter/pull/16187) 更新了 `Card` 元件的形狀與陰影。

### Flutter v0.2.8 之後的 Dart 變更

* `dart:async`：移除了 `Stream.firstWhere` 與 `Stream.lastWhere` 上已棄用的 `defaultValue` 參數。
* `dart:core`：在 `int`、`double`、`num`、`BigInt`、`Uri` 和 `DateTime` 上新增了 `tryParse` 靜態方法，並在 `int.parse`、`double.parse`、`num.parse` 上棄用了 `onError` 參數。
* 現在可以隨時省略 `new` 關鍵字。若要建立常數運算式，必須使用 `const` 關鍵字，但在運算式內部，可進一步省略 `const` 關鍵字。

## v0.2.8 的變更（自 v0.2.3 起）- beta 2

### v0.2.8

* [#16040](https://github.com/flutter/flutter/pull/16040) 新增了一個 API，可讓 `CupertinoTabScaffold` 的目前分頁能透過其 `CupertinoTabBar` 的 `currentIndex` 以程式方式切換。

### v0.2.5

* [#15416](https://github.com/flutter/flutter/pull/15416) 從 Flutter 中移除了 `package:http`，並將所有用法替換為 `dart:io` 的 `HttpClient`。如果你使用 `package:http`，必須在 `pubspec.yaml` 中將其加入為相依套件，才能繼續使用。

  `createHttpClient()` 也在標記為已棄用後被移除。若要變更框架建立 http client 的方式，你可以使用 `dart:io` 的 [HttpOverrides](https://api.flutter.dev/flutter/dart-io/HttpOverrides-class.html)，全域或區域（zone）地提供自訂的 `createHttpClient()` callback。

  更多細節請參閱[公告](https://groups.google.com/forum/#!topic/flutter-dev/AnqDqgQ6vus)。

* [#15871](https://github.com/flutter/flutter/pull/15871) 變更了由 `flutter create` 建立的 `AndroidManifest.xml` 的預設設定。現在 "screenLayout" 與 "density" 會預設包含在 configChanges 屬性中，當這些值變動時可避免 Flutter 應用程式重新啟動。

* [#15324](https://github.com/flutter/flutter/pull/15324) 新增了仿 iOS 下拉更新樣式的 CupertinoRefreshControl 元件。可於 Flutter Gallery 中觀看示範。

### v0.2.4

* [#15565](https://github.com/flutter/flutter/pull/15565) 預設啟用 Dart 2 模式。若要以 Dart 1 模式執行，仍可使用 `--no-preview-dart-2`。

  更多細節請參閱[公告](https://groups.google.com/d/msg/flutter-dev/H8dDhWg_c8I/_Ql78q_6AgAJ)。

* [#15537](https://github.com/flutter/flutter/pull/15537) 移除了 SemanticsSortOrder。從現在起，遍歷排序僅在同層級節點間進行。

  更多細節請參閱[公告](https://groups.google.com/forum/#!topic/flutter-dev/iCoLnW31heE)。

* [#15484](https://github.com/flutter/flutter/pull/15484) 變更了 `TextFormField` `initialValue` 建構子參數的意義。

  TextFormField 的 initialValue 參數不再無條件初始化其 TextEditingController 的 text 屬性。如果你建立 TextFormField 並提供 controller，initialValue 必須為 null（現為預設值）。如果你提供 controller，可直接用 TextEditingController 的 text 屬性指定初始文字。

  > #### 變更前
  >     new TextFormField(
  >       initialValue: 'Hello World',
  >       controller: _myTextEditingController,
  >     );
  >
  > #### 變更後
  >     new TextFormField(
  >       controller: _myTextEditingController ..text = 'Hello World',
  >     )
  >     // 或更常見的寫法：
  >     _myTextEditingController = new TextEditingController(
  >       text: 'Hello World',
  >     );
  >     new TextFormField(
  >       controller: _myTextEditingController,
  >     );

* [#15303](https://github.com/flutter/flutter/pull/15303) 更新了 `showDialog` 函式，改為接受 builder 並棄用了 `widget` 參數。

  > #### 變更前
  >     showDialog(context: context, child: new Text('hello'))
  >
  > #### 變更後
  >     showDialog(context: context, builder: (BuildContext context) => new Text('hello'))

* [#15265](https://github.com/flutter/flutter/pull/15265) 更新了 `ThemeData`，現在會使用 `MaterialColor` 的主色（primary color），而不再無條件使用 light 主題下的 500 色階。顏色值本身未變動。

  > #### 變更前
  >     expect(widget.color, Colors.blue.shade500) // 主色
  >
  > #### 變更後
  >     expect(widget.color, Colors.blue) // 主色

* [#15548](https://github.com/flutter/flutter/pull/15548) 新增了除錯旗標 `debugDisableClipLayers`、`debugDisablePhysicalShapeLayers` 與 `debugDisableOpacityLayers`，協助診斷光柵化速度的效能問題。

## v0.2.3 的變更（自 v0.1.5 起）- beta 1 更新

### v0.2.0

* [flutter/engine#4742](https://github.com/flutter/engine/pull/4742) 讓資源（assets）可直接從 Android 的 APK 讀取。因此，圖片資源路徑不再支援開頭的斜線：

  > #### 變更前
  >     new Image.asset('/foo/bar.png')
  >
  > #### 變更後：
  >     new Image.asset('foo/bar.png')

### v0.1.9

* [#14901](https://github.com/flutter/flutter/pull/14901) [Slider](https://api.flutter.dev/flutter/material/Slider-class.html) 的視覺更新，調整了顏色、不透明度，以及 value indicator 的形狀與行為。也從 Slider 類別中移除了 "`thumbOpenAtMin`" 旗標（已不再需要，可透過自訂 thumb shape 支援來模擬）。

## v0.1.5 的變更（自 v0.1.4 起）- beta 1.1

### v0.1.5

* [#14714](https://github.com/flutter/flutter/pull/14714) 修正了 Flutter Gallery 的 groovy 腳本，進而修正了 [#14912](https://github.com/flutter/flutter/issues/14912)。

## v0.1.4 的變更（自 v0.0.20 起）- beta 1

### v0.1.3

* [#14702](https://github.com/flutter/flutter/pull/14702) 從 flutter tool 的 `Version` 類別中移除了 `engineDartVersion` getter。

### v0.1.1

* [flutter/engine#4607](https://github.com/flutter/engine/pull/4607) 與 [#14601](https://github.com/flutter/flutter/pull/14601) 移除了下列 `dart:ui` 類別的預設建構子：

  * `Codec`
  * `FrameInfo`
  * `Gradient`
  * `Image`
  * `Paragraph`
  * `Picture`
  * `Scene`
  * `SemanticsUpdate`
  * `Shader`

  移除預設建構子的目的是防止這些類別產生未初始化的實例（某些情況下也防止繼承這些類別）。這些類別應僅由 Flutter engine 或透過命名建構子（若有提供）實例化。

### v0.0.24

* [#14410](https://github.com/flutter/flutter/pull/14410) 對 `ButtonTheme` 進行了破壞性 API 變更：

  * `ButtonTheme()` 與 `ButtonTheme.bar()` 建構子不再可由 `const` 建立
  * `ButtonTheme.textTheme` 現為 `ButtonTheme.data.textTheme`
  * `ButtonTheme.minWidth` 現為 `ButtonTheme.data.minWidth`
  * `ButtonTheme.height` 現為 `ButtonTheme.data.height`
  * `ButtonTheme.padding` 現為 `ButtonTheme.data.padding`

* [#14410](https://github.com/flutter/flutter/pull/14410) 變更了 `FlatButton` 與 `RaisedButton` 的繼承層級——它們現在都繼承自 `RawMaterialButton`，而非 `MaterialButton`。

* [#14410](https://github.com/flutter/flutter/pull/14410) 變更了 `RaisedButton`，當其為 disabled 狀態時不再投射陰影。

### v0.0.23

* [#14343](https://github.com/flutter/flutter/pull/14343) 調整了 EditableText 的複製、剪下與貼上行為：TextSelectionControls 抽象類別新增了 canCopy、canCut 等方法，用以判斷這些動作是否可用。TextSelectionDelegate 介面現在要求額外的方法 bringIntoView(TextPosition position)，以將 TextPosition 捲動至 TextField 的可見區域。此外，該介面不再由 TextSelectionOverlay 實作，改由 EditableTextState 實作。詳情請參閱 [flutter-dev/IHPndyUDy0M](https://groups.google.com/forum/#!topic/flutter-dev/IHPndyUDy0M)

#### Sliver API

* [#14449](https://github.com/flutter/flutter/pull/14449) 用 `SliverGridLayout.computeMaxScrollOffset` 方法取代了 `SliverGridLayout.estimateMaxScrollOffset` 方法。新方法必須回報精確值，而非僅僅估算。這是為了解決有限 `SliverGrid` 無法正確處理被捲動至螢幕頂端的 bug（因為無法得知其內容長度）。

  出於類似原因，`RenderSliverBoxChildManager` 介面新增了 getter `childCount`，當 `createChild` 可能回傳 null 時，必須回傳非 null 值。實務上，實作此介面並不常見，因此影響有限。更常見的是實作 widgets 層級的對應介面 `SliverChildDelegate`，該介面本來就有 `estimatedChildCount` getter。該 getter 仍然存在，但語意略有調整：若 delegate 的 `build` 方法可能回傳 null，則必須保證回傳值正確。

### v0.0.21

* [#13734](https://github.com/flutter/flutter/pull/13734)、[#14055](https://github.com/flutter/flutter/pull/14055) 與 [#14177](https://github.com/flutter/flutter/pull/14177) 大幅修訂了 InputDecorator 及相關元件。InputDecorator 各部分的版面配置略有調整，意味著文字欄位（text field）的內部排版也有所變動。依賴文字欄位內部幾何結構的測試需進行更新。

  此外，`hideDivider: true` 必須替換為新的 `border: InputBorder.none`。這是我們簡化輸入元件（Input）客製化渲染方式的一部分；你現在也可以自行提供自訂的 InputBorder 子類別，以滿足特殊的輸入裝飾需求。

* [#4528](https://github.com/flutter/engine/pull/4528) 與 [#14011](https://github.com/flutter/flutter/pull/14011) 棄用了標準平台通道訊息/方法編解碼器對大整數（big integers）的支援，四週寬限期後將不可用。這項變更是因為 Dart 2.0 過渡，`int` 型別不再為無限大小。

* [#4487](https://github.com/flutter/engine/pull/4487) 將 `io.flutter.plugin.common.PluginRegistry` 中所有 `RequestPermissionResult` callback 概念替換為 `RequestPermissionsResult`，並新增了缺少的 `s`，以與對應的 Android SDK 概念對齊。

  舊 API 已被棄用，未來版本將移除。在引入棄用的版本與移除舊 API 的版本之間，至少會有四週的寬限期。
  
