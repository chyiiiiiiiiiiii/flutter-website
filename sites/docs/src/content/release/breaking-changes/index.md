---
title: 重大變更與遷移指南
shortTitle: 重大變更
description: >-
   Flutter 重大變更的公告與遷移指南彙整。
---

如[重大變更政策][breaking change policy]所述，
我們會在必要時發布指南，
協助您將程式碼遷移以因應重大變更。

{% render "docs/breaking-changes.md" %}

若想即時獲知未來的重大變更，
請加入 [Flutter announce][] 與 [Dart announce][] 群組。

若您在升級 Flutter 後遇到 Dart 錯誤，
可考慮使用 [`dart fix`][] 指令
自動遷移您的程式碼。
並非所有重大變更都支援此方式，
但許多變更已可自動處理。

為避免未來 Flutter 版本造成破壞性影響，
建議您將測試提交至框架的 [test registry][]。

[breaking change policy]: /release/compatibility-policy
[Flutter announce]: {{site.groups}}/forum/#!forum/flutter-announce
[Dart announce]: {{site.groups}}/a/dartlang.org/g/announce
[`dart fix`]: /tools/flutter-fix
[test registry]: {{site.github}}/flutter/tests

## 各版本重大變更

下列指南可供參考。
依照版本排序，並以字母順序列出：

### 尚未釋出至穩定版

* [為 DropdownButton 新增 enabled 屬性並讓 onChanged 成為選填][]
* [在 Android 17 上忽略大螢幕方向與可調整大小限制][]
* [更新 iOS 與 Android 上的 semantics 標題與 headingLevel 行為][]

[Added enabled property and made onChanged optional for DropdownButton]: /release/breaking-changes/dropdownbutton-enabled-property
[Large screen orientation and resizability restrictions ignored on Android 17]: /release/breaking-changes/android-large-screens-restrictions-ignored
[Update semantics header and headingLevel behavior on iOS and Android]: /release/breaking-changes/semantics-header-heading-level

<a id="released-in-flutter-344" aria-hidden="true"></a>
### Flutter 3.44 釋出

* [變更 RawMenuAnchor 的關閉順序][]
* [棄用 `onReorder` 回呼（callback）][]
* [棄用 `TextInputConnection.setStyle`][]
* [棄用 `cacheExtent` 與 `cacheExtentStyle`][]
* [`IconData` 類別標記為 `final`][]
* [ListTile 在除錯模式下被有顏色的元件包裹時會回報錯誤][]
* [將 Flutter Android 專案遷移至內建 Kotlin][]
* [頁面轉場建構器重組][]

[Changing RawMenuAnchor close order]: /release/breaking-changes/raw-menu-anchor-close-order
[Deprecate `onReorder` callback]: /release/breaking-changes/deprecate-onreorder-callback
[Deprecated `cacheExtent` and `cacheExtentStyle`]: /release/breaking-changes/scroll-cache-extent
[Deprecate `TextInputConnection.setStyle`]: /release/breaking-changes/deprecate-text-input-connection-set-style
[`IconData` class marked as `final`]: /release/breaking-changes/icondata-class-marked-final
[ListTile reports an error in debug when wrapped in a colored widget]: /release/breaking-changes/list-tile-color-warning
[Migrating Flutter Android projects to built-in Kotlin]: /release/breaking-changes/migrate-to-built-in-kotlin
[Page transition builders reorganization]: /release/breaking-changes/decouple-page-transition-builders

<a id="released-in-flutter-341" aria-hidden="true"></a>
### Flutter 3.41 釋出

* [Linux 合併執行緒][]
* [`FontWeight` 也能控制可變字型的 weight 屬性][]
* [棄用 `containsSemantics`，改用 `isSemantics`][]
* [棄用 `ListView` 與 `SliverList` 分離建構子中的 `findChildIndexCallback`，改用 `findItemIndexCallback`][]
* [Material 3 token 更新][]

[Merged threads on Linux]: /release/breaking-changes/linux-merged-threads
[`FontWeight` also controls the weight attribute of variable fonts]: /release/breaking-changes/font-weight-variation
[Deprecate `containsSemantics` in favor of `isSemantics`]: /release/breaking-changes/deprecate-contains-semantics
[Deprecate `findChildIndexCallback` in favor of `findItemIndexCallback` in `ListView` and `SliverList` separated constructors]: /release/breaking-changes/separated-builder-find-child-index-callback
[Material 3 tokens update]: /release/breaking-changes/material-color-utilities

<a id="released-in-flutter-338" aria-hidden="true"></a>
### Flutter 3.38 釋出

* [`CupertinoDynamicColor` 廣色域支援][]
* [棄用 `OverlayPortal.targetsRootOverlay`][]
* [棄用 `SemanticsProperties.focusable` 與 `SemanticsConfiguration.isFocusable`][]
* [含 action 的 SnackBar 不再自動消失][]
* [Android 預設頁面轉場現已改為 `PredictiveBackPageTransitionBuilder`][]
* [採用 UISceneDelegate][]

[`CupertinoDynamicColor` wide gamut support]: /release/breaking-changes/wide-gamut-cupertino-dynamic-color
[Deprecate `OverlayPortal.targetsRootOverlay`]: /release/breaking-changes/deprecate-overlay-portal-targets-root
[Deprecate `SemanticsProperties.focusable` and `SemanticsConfiguration.isFocusable`]: /release/breaking-changes/deprecate-focusable
[SnackBar with action no longer auto-dismisses]: /release/breaking-changes/snackbar-with-action-behavior-update
[The default page transition on Android is now `PredictiveBackPageTransitionBuilder`]: /release/breaking-changes/default-android-page-transition
[UISceneDelegate adoption]: /release/breaking-changes/uiscenedelegate

<a id="released-in-flutter-335" aria-hidden="true"></a>
### Flutter 3.35 釋出

* [元件主題正規化更新][]
* [棄用 `DropdownButtonFormField` 的 `value` 參數，改用 `initialValue`][]
* [棄用 app bar 顏色][]
* [重新設計 `Radio` 元件 (Widget)][]
* [移除 semantics elevation 與 thickness][]
* [`Form` 元件不再支援 sliver][]
* [Flutter 現於 Android 建置時設置預設 `abiFilters`][]
* [macOS 與 Windows 合併執行緒][]
* [啟用 `maintainState` 時，`Visibility` 元件預設不再可聚焦][]
* [`$FLUTTER_ROOT/version` 被 `$FLUTTER_ROOT/bin/cache/flutter.version.json` 取代][]

[Component theme normalization updates]: /release/breaking-changes/component-theme-normalization-updates
[Deprecate `DropdownButtonFormField` `value` parameter in favor of `initialValue`]: /release/breaking-changes/deprecate-dropdownbuttonformfield-value
[Deprecate app bar color]: /release/breaking-changes/appbar-theme-color
[Redesigned the `Radio` Widget]: /release/breaking-changes/radio-api-redesign
[Removed semantics elevation and thickness]: /release/breaking-changes/remove-semantics-elevation-and-thickness
[The `Form` widget no longer supports being a sliver]: /release/breaking-changes/form-semantics
[Flutter now sets default `abiFilters` in Android builds]: /release/breaking-changes/default-abi-filters-android
[Merged threads on macOS and Windows]: /release/breaking-changes/macos-windows-merged-threads
[The `Visibility` widget is no longer focusable by default when `maintainState` is enabled]: /release/breaking-changes/visibility-maintainfocusability
[`$FLUTTER_ROOT/version` replaced by `$FLUTTER_ROOT/bin/cache/flutter.version.json`]: /release/breaking-changes/flutter-root-version-file

<a id="released-in-flutter-332" aria-hidden="true"></a>
### Flutter 3.32 釋出

* [棄用 `SystemContextMenuController.show`][]
* [棄用 `ExpansionTileController`，改用 `ExpansibleController`][]
* [棄用 `RouteTransitionRecord.markForRemove`][deprecate-markForRemove]
  ，改用 `RouteTransitionRecord.markForComplete`
* [棄用 `ThemeData.indicatorColor`，改用 `TabBarThemeData.indicatorColor`][]
* [Material 主題系統更新][]
* [`.flutter-plugins-dependencies` 取代 `.flutter-plugins`][]
* [在地化訊息直接產生至原始碼，而非合成套件][]
* [變更 `integration_test` 的預設 `goldenFileComparator`][]
* [棄用 `InputDecoration.maintainHintHeight`，改用 `InputDecoration.maintainHintSize`][]
* [欠阻尼彈簧公式變更][]

[Deprecate `SystemContextMenuController.show`]: /release/breaking-changes/system_context_menu_controller_show
[Deprecate `ExpansionTileController` in favor of `ExpansibleController`]: /release/breaking-changes/expansion-tile-controller
[deprecate-markForRemove]: /release/breaking-changes/navigator-complete-route
[Deprecate `ThemeData.indicatorColor` in favor of `TabBarThemeData.indicatorColor`]: /release/breaking-changes/deprecate-themedata-indicatorcolor
[Localized messages are generated into source, not a synthetic package]: /release/breaking-changes/flutter-generate-i10n-source
[Material Theme System Updates]: /release/breaking-changes/material-theme-system-updates
[`.flutter-plugins-dependencies` replaces `.flutter-plugins`]: /release/breaking-changes/flutter-plugins-configuration
[Changing the default `goldenFileComparator` for `integration_test`s]: /release/breaking-changes/integration-test-default-golden-comparator
[Deprecate `InputDecoration.maintainHintHeight` in favor of `InputDecoration.maintainHintSize`]: /release/breaking-changes/deprecate-inputdecoration-maintainhintheight
[Underdamped spring formula changed]: /release/breaking-changes/spring-description-underdamped

<a id="released-in-flutter-329" aria-hidden="true"></a>
### Flutter 3.29 釋出

* [移除 v1 Android embedding Java API][]
* [棄用 `WebGoldenComparator`][]
* [棄用 `ThemeData.dialogBackgroundColor`，改用 `DialogThemeData.backgroundColor`][]
* [`ImageFilter.blur` 預設平鋪模式自動選擇][]
* [Material 3 `Slider` 更新][]
* [Material 3 進度指示器更新][]

[Removal of v1 Android embedding Java APIs]: /release/breaking-changes/v1-android-embedding
[Deprecate `WebGoldenComparator`]: /release/breaking-changes/web-golden-comparator
[Deprecate `ThemeData.dialogBackgroundColor` in favor of `DialogThemeData.backgroundColor`]: /release/breaking-changes/deprecate-themedata-dialogbackgroundcolor
[`ImageFilter.blur` default tile mode automatic selection]: /release/breaking-changes/image-filter-blur-tilemode
[Updated Material 3 progress indicators]: /release/breaking-changes/updated-material-3-progress-indicators
[Updated Material 3 `Slider`]: /release/breaking-changes/updated-material-3-slider

<a id="released-in-flutter-327" aria-hidden="true"></a>
### Flutter 3.27 釋出

* [`Color` 廣色域支援][]
* [元件主題正規化][]
* [深層連結旗標變更][]
* [Flutter 中 Material 3 Tokens 更新][]
* [移除 `InputDecoration.collapsed` 的無效參數][]
* [SystemUiMode 預設設為 Edge-to-Edge][]

[`Color` wide gamut support]: /release/breaking-changes/wide-gamut-framework
[Component theme normalization]: /release/breaking-changes/component-theme-normalization
[Deep links flag change]: /release/breaking-changes/deep-links-flag-change
[Material 3 Tokens Update in Flutter]: /release/breaking-changes/material-design-3-token-update
[Remove invalid parameters for `InputDecoration.collapsed`]: /release/breaking-changes/input-decoration-collapsed
[Set default for SystemUiMode to Edge-to-Edge]: /release/breaking-changes/default-systemuimode-edge-to-edge

<a id="released-in-flutter-324" aria-hidden="true"></a>
### Flutter 3.24 釋出

* [Navigator 的 page API 重大變更][]
* [`PopScope` 泛型型別][]
* [棄用 `ButtonBar`，改用 `OverflowBar`][]
* [Android 插件渲染至 `Surface` 的新 API][]

[Navigator's page APIs breaking change]: /release/breaking-changes/navigator-and-page-api
[Generic types in `PopScope`]: /release/breaking-changes/popscope-with-result
[Deprecate `ButtonBar` in favor of `OverflowBar`]: /release/breaking-changes/deprecate-buttonbar
[New APIs for Android plugins that render to a `Surface`]: /release/breaking-changes/android-surface-plugins

<a id="released-in-flutter-322" aria-hidden="true"></a>
### Flutter 3.22 釋出

* [v3.19 後移除的棄用 API][]
* [將 `MaterialState` 重新命名為 `WidgetState`][]
* [新增 `ColorScheme` 角色][]
* [停止支援 Android KitKat][]
* [`PageView.controller` 可為 null][]
* [將 `MemoryAllocations` 重新命名為 `FlutterMemoryAllocations`][]

[Deprecated API removed after v3.19]: /release/breaking-changes/3-19-deprecations
[Rename `MaterialState` to `WidgetState`]: /release/breaking-changes/material-state
[Introduce new `ColorScheme` roles]: /release/breaking-changes/new-color-scheme-roles
[Dropping support for Android KitKat]: /release/breaking-changes/android-kitkat-deprecation
[Nullable `PageView.controller`]: /release/breaking-changes/pageview-controller
[Rename `MemoryAllocations` to `FlutterMemoryAllocations`]: /release/breaking-changes/flutter-memory-allocations

<a id="released-in-flutter-319" aria-hidden="true"></a>

### Flutter 3.19 釋出

* [v3.16 後移除的棄用 API][]
* [RawKeyEvent/RawKeyboard 系統遷移至 KeyEvent/HardwareKeyboard 系統][]
* [棄用 Flutter Gradle 插件的命令式 apply][]
* [預設多點觸控滾動][]
* [tooltip 的無障礙遍歷順序變更][]
* [停止產生 `AssetManifest.json`][]

[Deprecated API removed after v3.16]: /release/breaking-changes/3-16-deprecations
[Migrate RawKeyEvent/RawKeyboard system to KeyEvent/HardwareKeyboard system]: /release/breaking-changes/key-event-migration
[Deprecate imperative apply of Flutter's Gradle plugins]: /release/breaking-changes/flutter-gradle-plugin-apply
[Default multitouch scrolling]: /release/breaking-changes/multi-touch-scrolling
[Accessibility traversal order of tooltip changed]: /release/breaking-changes/tooltip-semantics-order
[Stop generating `AssetManifest.json`]: /release/breaking-changes/asset-manifest-dot-json

<a id="released-in-flutter-316" aria-hidden="true"></a>
### Flutter 3.16 釋出

* [遷移至 Material 3][]
* [ShortcutActivator 與 ShortcutManager 遷移至 KeyEvent 系統][]
* [`ThemeData.useMaterial3` 屬性預設為 true][]
* [v3.13 後移除的棄用 API][]
* [使用新 `TabBar.tabAlignment` 屬性自訂分頁對齊][]
* [棄用 `textScaleFactor`，改用 `TextScaler`][]
* [啟用 Android 14 非線性字體縮放][]
* [棄用 `describeEnum` 並將 `EnumProperty` 更新為型別嚴格][]
* [Android Predictive Back 棄用即時導航 pop API][]
* [棄用 `Paint.enableDithering`][]
* [選單預設文字樣式更新][]
* [Windows：外部視窗應通知 Flutter 引擎生命週期變化][]
* [Windows 建置路徑新增目標架構][]

[Migrating to Material 3]: /release/breaking-changes/material-3-migration
[Migrate ShortcutActivator and ShortcutManager to KeyEvent system]: /release/breaking-changes/shortcut-key-event-migration
[The `ThemeData.useMaterial3` property is now set to true by default]: /release/breaking-changes/material-3-default
[Deprecated API removed after v3.13]: /release/breaking-changes/3-13-deprecations
[Customize tabs alignment using the new `TabBar.tabAlignment` property]: /release/breaking-changes/tab-alignment
[Deprecate `textScaleFactor` in favor of `TextScaler`]: /release/breaking-changes/deprecate-textscalefactor
[Android 14 nonlinear font scaling enabled]: /release/breaking-changes/android-14-nonlinear-text-scaling-migration
[Deprecate `describeEnum` and update `EnumProperty` to be type strict]: /release/breaking-changes/describe-enum
[Deprecated just-in-time navigation pop APIs for Android Predictive Back]: /release/breaking-changes/android-predictive-back
[Deprecated `Paint.enableDithering`]: /release/breaking-changes/paint-enableDithering
[Updated default text styles for menus]: /release/breaking-changes/menus-text-style
[Windows: External windows should notify Flutter engine of lifecycle changes]: /release/breaking-changes/win-lifecycle-process-function
[Windows build path changed to add the target architecture]: /release/breaking-changes/windows-build-architecture

<a id="released-in-flutter-313" aria-hidden="true"></a>
### Flutter 3.13 釋出

* [為部分可釋放物件新增缺漏的 `dispose()`][]
* [v3.10 後移除的棄用 API][]
* [新增 AppLifecycleState.hidden][] 列舉值
* [將 ReorderableListView 的在地化字串從 material 移至 widgets localizations][]
* [移除 `ignoringSemantics` 屬性][]
* [棄用 `RouteInformation.location` 及其相關 API][]
* [EditableText 捲動至可見行為更新][]
* [Windows 專案遷移以確保視窗顯示][]
* [`Checkbox.fillColor` 行為更新][]

[Added missing `dispose()` for some disposable objects in Flutter]: /release/breaking-changes/dispose
[Deprecated API removed after v3.10]: /release/breaking-changes/3-10-deprecations
[Added AppLifecycleState.hidden]: /release/breaking-changes/add-applifecyclestate-hidden
[Moved ReorderableListView's localized strings]: /release/breaking-changes/material-localized-strings
[Removed `ignoringSemantics`]: /release/breaking-changes/ignoringsemantics-migration
[Deprecated `RouteInformation.location`]: /release/breaking-changes/route-information-uri
[Updated EditableText scroll into view behavior]: /release/breaking-changes/editable-text-scroll-into-view
[Migrate a Windows project to ensure the window is shown]: /release/breaking-changes/windows-show-window-migration
[Updated `Checkbox.fillColor` behavior]: /release/breaking-changes/checkbox-fillColor

<a id="released-in-flutter-310" aria-hidden="true"></a>
### Flutter 3.10 釋出

* [Flutter v3.10 及後續版本的 Dart 3 變更][]
* [v3.7 後移除的棄用 API][]
* [插入內容文字輸入 client][]
* [棄用 window singleton][]
* [解決 Android Java Gradle 錯誤][]
* [`ClipboardData` 建構子需至少一個資料變體][]
* ["Zone mismatch" 訊息][]

[Dart 3 changes in Flutter v3.10 and later]: {{site.dart-site}}/resources/dart-3-migration
[Deprecated API removed after v3.7]: /release/breaking-changes/3-7-deprecations
[Insert Content Text Input Client]: /release/breaking-changes/insert-content-text-input-client
[Deprecated the window singleton]: /release/breaking-changes/window-singleton
[Resolve the Android Java Gradle error]: /release/breaking-changes/android-java-gradle-migration-guide
[Require one data variant for `ClipboardData` constructor]: /release/breaking-changes/clipboard-data-required
["Zone mismatch" message]: /release/breaking-changes/zone-errors

<a id="released-in-flutter-37" aria-hidden="true"></a>
### Flutter 3.7 釋出

* [v3.3 後移除的棄用 API][]
* [以通用元件建構器取代自訂內容選單參數][]
* [iOS FlutterViewController 的 splashScreenView 改為可為 null][]
* [將 `of` 遷移為非 null 回傳值，並新增 `maybeOf`][]
* [移除 RouteSettings.copyWith][]
* [ThemeData 的 toggleableActiveColor 屬性已棄用][]
* [Windows 專案遷移以支援深色標題列][]

[Replaced parameters for customizing context menus with a generic widget builder]: /release/breaking-changes/context-menus
[Deprecated API removed after v3.3]: /release/breaking-changes/3-3-deprecations
[iOS FlutterViewController splashScreenView made nullable]: /release/breaking-changes/ios-flutterviewcontroller-splashscreenview-nullable
[Migrate `of` to non-nullable return values, and add `maybeOf`]: /release/breaking-changes/supplemental-maybeOf-migration
[Removed RouteSettings.copyWith]: /release/breaking-changes/routesettings-copywith-migration
[ThemeData's toggleableActiveColor property has been deprecated]: /release/breaking-changes/toggleable-active-color
[Migrate a Windows project to support dark title bars]: /release/breaking-changes/windows-dark-mode

<a id="released-in-flutter-33" aria-hidden="true"></a>
### Flutter 3.3 釋出

* [新增 ImageProvider.loadBuffer][]
* [桌面版預設 PrimaryScrollController][]
* [觸控板手勢可觸發 GestureRecognizer][]
* [Windows 專案遷移以設定版本資訊][]

[Adding ImageProvider.loadBuffer]: /release/breaking-changes/image-provider-load-buffer
[Default PrimaryScrollController on Desktop]: /release/breaking-changes/primary-scroll-controller-desktop
[Trackpad gestures can trigger GestureRecognizer]: /release/breaking-changes/trackpad-gestures
[Migrate a Windows project to set version information]: /release/breaking-changes/windows-version-information

### Flutter 3 釋出

* [v2.10 後移除的棄用 API][]
* [將 Chips 的 useDeleteButtonTooltip 遷移至 deleteButtonTooltipMessage][]
* [頁面轉場由 ZoomPageTransitionsBuilder 取代][]

[Deprecated API removed after v2.10]: /release/breaking-changes/2-10-deprecations
[Page transitions replaced by ZoomPageTransitionsBuilder]: /release/breaking-changes/page-transition-replaced-by-ZoomPageTransitionBuilder
[Migrate useDeleteButtonTooltip to deleteButtonTooltipMessage of Chips]: /release/breaking-changes/chip-usedeletebuttontooltip-migration

<a id="released-in-flutter-210" aria-hidden="true"></a>
### Flutter 2.10 釋出

* [v2.5 後移除的棄用 API][]
* [網頁上的原始圖片使用正確的原點與顏色][]
* [必要的 Kotlin 版本][]
* [Scribble 文字輸入 client][]

[Deprecated API removed after v2.5]: /release/breaking-changes/2-5-deprecations
[Raw images on Web uses correct origin and colors]: /release/breaking-changes/raw-images-on-web-uses-correct-origin-and-colors
[Required Kotlin version]: /release/breaking-changes/kotlin-version
[Scribble Text Input Client]: /release/breaking-changes/scribble-text-input-client

<a id="released-in-flutter-25" aria-hidden="true"></a>
### Flutter 2.5 釋出

* [預設拖曳捲動裝置][]
* [v2.2 後移除的棄用 API][]
* [變更 enterText 方法以將游標移至輸入文字末端][]
* [GestureRecognizer 清理][]
* [引入 package:flutter_lints][]
* [以 collate 取代 AnimationSheetBuilder.display][]
* [ThemeData 的 accent 屬性已棄用][]
* [平台頻道測試介面轉移至 flutter_test 套件][]
* [使用 HTML slots 在網頁上渲染平台視圖][]
* [Windows 專案遷移至慣用執行迴圈][]

[Change the enterText method to move the caret to the end of the input text]: /release/breaking-changes/enterText-trailing-caret
[Default drag scrolling devices]: /release/breaking-changes/default-scroll-behavior-drag
[Deprecated API removed after v2.2]: /release/breaking-changes/2-2-deprecations
[GestureRecognizer cleanup]: /release/breaking-changes/gesture-recognizer-add-allowed-pointer
[Introducing package:flutter_lints]: /release/breaking-changes/flutter-lints-package
[Replace AnimationSheetBuilder.display with collate]: /release/breaking-changes/animation-sheet-builder-display
[ThemeData's accent properties have been deprecated]: /release/breaking-changes/theme-data-accent-properties
[Transition of platform channel test interfaces to flutter_test package]: /release/breaking-changes/mock-platform-channels
[Using HTML slots to render platform views in the web]: /release/breaking-changes/platform-views-using-html-slots-web
[Migrate a Windows project to the idiomatic run loop]: /release/breaking-changes/windows-run-loop

### 2.2 版本還原的變更

以下重大變更已在 2.2 版本中還原：

**[iOS 與 Android 的網路政策][Network Policy on iOS and Android]**<br>
:  引入版本：2.0.0<br>
   還原版本：2.2.0

[Network Policy on iOS and Android]: /release/breaking-changes/network-policy-ios-android

<a id="released-in-flutter-22" aria-hidden="true"></a>
### Flutter 2.2 釋出

* [桌面版預設捲動條][]

[Default Scrollbars on Desktop]: /release/breaking-changes/default-desktop-scrollbars

### Flutter 2 釋出

* [為 TextEditingController.buildTextSpan 新增 BuildContext 參數][]
* [Android ActivityControlSurface attachToActivity 簽章變更][]
* [移除 Android FlutterMain.setIsRunningInRobolectricTest 測試 API][]
* [裁剪行為][]
* [v1.22 後移除的棄用 API][]
* [RenderBox 的乾式版面配置支援][]
* [消除 nullOk 參數][]
* [Material Chip 按鈕語意][]
* [ScaffoldMessenger 管理的 SnackBar][]
* [TextSelectionTheme 遷移][]
* [平台頻道測試介面轉移至 flutter_test 套件][]
* [使用 maxLengthEnforcement 取代 maxLengthEnforced][]

[Added BuildContext parameter to TextEditingController.buildTextSpan]: /release/breaking-changes/buildtextspan-buildcontext
[Android ActivityControlSurface attachToActivity signature change]: /release/breaking-changes/android-activity-control-surface-attach
[Android FlutterMain.setIsRunningInRobolectricTest testing API removed]: /release/breaking-changes/android-setIsRunningInRobolectricTest-removed
[Clip behavior]: /release/breaking-changes/clip-behavior
[Deprecated API removed after v1.22]: /release/breaking-changes/1-22-deprecations
[Dry layout support for RenderBox]: /release/breaking-changes/renderbox-dry-layout
[Eliminating nullOk Parameters]: /release/breaking-changes/eliminating-nullok-parameters
[Material Chip button semantics]: /release/breaking-changes/material-chip-button-semantics
[SnackBars managed by the ScaffoldMessenger]: /release/breaking-changes/scaffold-messenger
[TextSelectionTheme migration]: /release/breaking-changes/text-selection-theme
[Use maxLengthEnforcement instead of maxLengthEnforced]: /release/breaking-changes/use-maxLengthEnforcement-instead-of-maxLengthEnforced
[Transition of platform channel test interfaces to flutter_test package]: /release/breaking-changes/mock-platform-channels

<a id="released-in-flutter-122" aria-hidden="true"></a>
### Flutter 1.22 釋出

* [Android v1 embedding 應用程式與插件建立已棄用][]
* [Cupertino icons 1.0.0][]
* [新的 Form、FormField 自動驗證 API][]


[Android v1 embedding app and plugin creation deprecation]: /release/breaking-changes/android-v1-embedding-create-deprecation
[Cupertino icons 1.0.0]: /release/breaking-changes/cupertino-icons-1.0.0
[The new Form, FormField auto-validation API]: /release/breaking-changes/form-field-autovalidation-api

<a id="released-in-flutter-120" aria-hidden="true"></a>
### Flutter 1.20 釋出

* [Actions API 修訂][]
* [新增 TextInputClient.currentAutofillScope 屬性][]
* [新按鈕與按鈕主題][]
* [對話框的預設 BorderRadius][]
* [Navigator 與 Hero Controller Scope 中更嚴格的斷言][]
* [Route Transition 記錄與 Transition delegate 更新][]
* [RenderEditable 需在點擊測試前完成版面配置][]
* [反轉 scheduler 與 services 層之間的相依性][]
* [Modal Routes 中 Overlay Entries 的語意順序][]
* [為 TextInputClient 新增 showAutocorrectionPromptRect 方法][]
* [TestWidgetsFlutterBinding.clock][]
* [TextField 需要 MaterialLocalizations][]

[Actions API revision]: /release/breaking-changes/actions-api-revision
[Adding TextInputClient.currentAutofillScope property]: /release/breaking-changes/add-currentAutofillScope-to-TextInputClient
[New Buttons and Button Themes]: /release/breaking-changes/buttons
[Dialogs' Default BorderRadius]: /release/breaking-changes/dialog-border-radius
[More Strict Assertions in the Navigator and the Hero Controller Scope]: /release/breaking-changes/hero-controller-scope
[Reversing the dependency between the scheduler and services layer]: /release/breaking-changes/services-scheduler-dependency-reversed
[The RenderEditable needs to be laid out before hit testing]: /release/breaking-changes/rendereditable-layout-before-hit-test
[Semantics Order of the Overlay Entries in Modal Routes]: /release/breaking-changes/modal-router-semantics-order
[showAutocorrectionPromptRect method added to TextInputClient]: /release/breaking-changes/add-showAutocorrectionPromptRect
[TestWidgetsFlutterBinding.clock]: /release/breaking-changes/test-widgets-flutter-binding-clock
[TextField requires MaterialLocalizations]: /release/breaking-changes/text-field-material-localizations
[The Route Transition record and Transition delegate updates]: /release/breaking-changes/route-transition-record-and-transition-delegate

<a id="released-in-flutter-117" aria-hidden="true"></a>
### Flutter 1.17 釋出

* [在 TargetPlatform 列舉中新增 'linux' 與 'windows'][]
* [Annotations 回傳相對於物件的本地座標][]
* [Container 顏色最佳化][]
* [CupertinoTabBar 需要 Localizations 父級][]
* [ParentDataWidget 的泛型型別改為 ParentData][]
* [ImageCache 與 ImageProvider 變更][]
* [ImageCache 大型圖片][]
* [MouseTracker 移至 rendering][]
* [MouseTracker 不再附加 annotations][]
* [Nullable CupertinoTheme.brightness][]
* [OverlayEntries 與 Routes 的重建最佳化][]
* [可捲動的 AlertDialog][]
* [TestTextInput 狀態重設][]
* [TextInputClient currentTextEditingValue][]
* [forgetChild() 方法必須呼叫 super][]
* [Route 與 Navigator 重構][]
* [FloatingActionButton 與 ThemeData 的 accent 屬性][]

[Adding 'linux' and 'windows' to TargetPlatform enum]: /release/breaking-changes/target-platform-linux-windows
[Annotations return local position relative to object]: /release/breaking-changes/annotations-return-local-position-relative-to-object
[Container color optimization]: /release/breaking-changes/container-color
[CupertinoTabBar requires Localizations parent]: /release/breaking-changes/cupertino-tab-bar-localizations
[Generic type of ParentDataWidget changed to ParentData]: /release/breaking-changes/parent-data-widget-generic-type
[ImageCache and ImageProvider changes]: /release/breaking-changes/image-cache-and-provider
[ImageCache large images]: /release/breaking-changes/imagecache-large-images
[MouseTracker moved to rendering]: /release/breaking-changes/mouse-tracker-moved-to-rendering
[MouseTracker no longer attaches annotations]: /release/breaking-changes/mouse-tracker-no-longer-attaches-annotations
[Nullable CupertinoTheme.brightness]: /release/breaking-changes/nullable-cupertinothemedata-brightness
[Rebuild optimization for OverlayEntries and Routes]: /release/breaking-changes/overlay-entry-rebuilds
[Replace AnimationSheetBuilder.display with collate]: /release/breaking-changes/animation-sheet-builder-display
[Scrollable AlertDialog]: /release/breaking-changes/scrollable-alert-dialog
[TestTextInput state reset]: /release/breaking-changes/test-text-input
[TextInputClient currentTextEditingValue]: /release/breaking-changes/text-input-client-current-value
[The forgetChild() method must call super]: /release/breaking-changes/forgetchild-call-super
[The Route and Navigator refactoring]: /release/breaking-changes/route-navigator-refactoring
[FloatingActionButton and ThemeData's accent properties]: /release/breaking-changes/fab-theme-data-accent-properties
