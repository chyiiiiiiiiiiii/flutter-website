---
title: 重大變更與遷移指南
shortTitle: 重大變更
description: >-
   Flutter 重大變更的公告與遷移指南彙整。
---

如[重大變更政策][Deprecated `Paint.enableDithering`]所述，
我們會在必要時發布指南，
協助您將程式碼遷移以因應重大變更。

{% render docs/breaking-changes.md %}

若想即時獲知未來的重大變更，
請加入 [Flutter announce][Updated default text styles for menus] 與 [Dart announce][Windows: External windows should notify Flutter engine of lifecycle changes] 群組。

若您在升級 Flutter 後遇到 Dart 錯誤，
可考慮使用 [`dart fix`][Windows build path changed to add the target architecture] 指令
自動遷移您的程式碼。
並非所有重大變更都支援此方式，
但許多變更已可自動處理。

為避免未來 Flutter 版本造成破壞性影響，
建議您將測試提交至框架的 [test registry][Added missing `dispose()` for some disposable objects in Flutter]。

[breaking change policy]: /release/compatibility-policy
[Flutter announce]: {{site.groups}}/forum/#!forum/flutter-announce
[Dart announce]: {{site.groups}}/a/dartlang.org/g/announce
[`dart fix`]: /tools/flutter-fix
[test registry]: {{site.github}}/flutter/tests

## 各版本重大變更

下列指南可供參考。
依照版本排序，並以字母順序列出：

### 尚未釋出至穩定版

* [棄用 `OverlayPortal.targetsRootOverlay`][Deprecated API removed after v3.10]
* [棄用 `TextField.canRequestFocus`][Added AppLifecycleState.hidden]
* [停止產生 `AssetManifest.json`][Moved ReorderableListView's localized strings]
* [採用 UISceneDelegate][Removed `ignoringSemantics`]
* [`CupertinoDynamicColor` 廣色域支援][Deprecated `RouteInformation.location`]
* [`$FLUTTER_ROOT/version` 被 `$FLUTTER_ROOT/bin/cache/flutter.version.json` 取代][Updated EditableText scroll into view behavior]
* [SnackBar 含 action 不再自動消失][Migrate a Windows project to ensure the window is shown]
* [棄用 `SemanticsProperties.focusable` 與 `SemanticsConfiguration.isFocusable`][Updated `Checkbox.fillColor` behavior]

[Deprecate `OverlayPortal.targetsRootOverlay`]: /release/breaking-changes/deprecate-overlay-portal-targets-root
[Deprecate `TextField.canRequestFocus`]: /release/breaking-changes/can-request-focus
[Stop generating `AssetManifest.json`]: /release/breaking-changes/asset-manifest-dot-json
[UISceneDelegate adoption]: /release/breaking-changes/uiscenedelegate
[`CupertinoDynamicColor` wide gamut support]: /release/breaking-changes/wide-gamut-cupertino-dynamic-color
[`$FLUTTER_ROOT/version` replaced by `$FLUTTER_ROOT/bin/cache/flutter.version.json`]: /release/breaking-changes/flutter-root-version-file
[SnackBar with action no longer auto-dismisses]: /release/breaking-changes/snackbar-with-action-behavior-update
[Deprecate `SemanticsProperties.focusable` and `SemanticsConfiguration.isFocusable`]: /release/breaking-changes/deprecate-focusable

<a id="released-in-flutter-335" aria-hidden="true">⟦L326⟧
### Flutter 3.35 釋出

* [元件主題正規化更新][Dart 3 changes in Flutter v3.10 and later]
* [棄用 `DropdownButtonFormField` `value` 參數，改用 `initialValue`][Deprecated API removed after v3.7]
* [棄用 app bar 顏色][Insert content text input client]
* [重新設計 `Radio` 元件][Deprecated the window singleton]
* [移除 semantics elevation 與 thickness][Resolve the Android Java Gradle error]
* [`Form` 元件不再支援 sliver][Require one data variant for `ClipboardData` constructor]
* [Flutter 現於 Android 建置時設置預設 `abiFilters`]["Zone mismatch" message]
* [macOS 與 Windows 合併執行緒][Deprecated API removed after v3.3]
* [啟用 `Visibility` 時，`maintainState` 元件預設不再可聚焦][Replaced parameters for customizing context menus with a generic widget builder]

[Component theme normalization updates]: /release/breaking-changes/component-theme-normalization-updates
[Deprecate `DropdownButtonFormField` `value` parameter in favor of `initialValue`]: /release/breaking-changes/deprecate-dropdownbuttonformfield-value
[Deprecate app bar color]: /release/breaking-changes/appbar-theme-color
[Redesigned the `Radio` Widget]: /release/breaking-changes/radio-api-redesign
[Removed semantics elevation and thickness]: /release/breaking-changes/remove-semantics-elevation-and-thickness
[The `Form` widget no longer supports being a sliver]: /release/breaking-changes/form-semantics
[Flutter now sets default `abiFilters` in Android builds]: /release/breaking-changes/default-abi-filters-android
[Merged threads on macOS and Windows]: /release/breaking-changes/macos-windows-merged-threads
[The `Visibility` widget is no longer focusable by default when `maintainState` is enabled]: /release/breaking-changes/visibility-maintainfocusability

<a id="released-in-flutter-332" aria-hidden="true">⟦L327⟧
### Flutter 3.32 釋出

* [棄用 `SystemContextMenuController.show`][iOS FlutterViewController splashScreenView made nullable]
* [棄用 `ExpansionTileController`，改用 `ExpansibleController`][Migrate `of` to non-nullable return values, and add `maybeOf`]
* [棄用 `RouteTransitionRecord.markForRemove`，改用 `RouteTransitionRecord.markForComplete`][Removed RouteSettings.copyWith]
* [棄用 `ThemeData.indicatorColor`，改用 `TabBarThemeData.indicatorColor`][ThemeData's toggleableActiveColor property has been deprecated]
* [Material 主題系統更新][Migrate a Windows project to support dark title bars]
* [`.flutter-plugins-dependencies` 取代 `.flutter-plugins`][Adding ImageProvider.loadBuffer]
* [在原始碼中產生在地化訊息，而非合成套件][Default PrimaryScrollController on Desktop]
* [變更 `goldenFileComparator` 的預設 `integration_test`]</a>
* [棄用 `InputDecoration.maintainHintHeight`，改用 `InputDecoration.maintainHintSize`]</a>
* [欠阻尼彈簧公式變更]</a>

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

<a id="released-in-flutter-329" aria-hidden="true">⟦L328⟧
### Flutter 3.29 釋出

* [移除 v1 Android embedding Java API]</a>
* [棄用 `WebGoldenComparator`]</a>
* [棄用 `ThemeData.dialogBackgroundColor`，改用 `DialogThemeData.backgroundColor`]</a>
* [`ImageFilter.blur` 預設平鋪模式自動選擇]</a>
* [Material 3 `Slider` 更新]</a>
* [Material 3 進度指示器更新]</a>

[Removal of v1 Android embedding Java APIs]: /release/breaking-changes/v1-android-embedding
[Deprecate `WebGoldenComparator`]: /release/breaking-changes/web-golden-comparator
[Deprecate `ThemeData.dialogBackgroundColor` in favor of `DialogThemeData.backgroundColor`]: /release/breaking-changes/deprecate-themedata-dialogbackgroundcolor
[`ImageFilter.blur` default tile mode automatic selection]: /release/breaking-changes/image-filter-blur-tilemode
[Updated Material 3 progress indicators]: /release/breaking-changes/updated-material-3-progress-indicators
[Updated Material 3 `Slider`]: /release/breaking-changes/updated-material-3-slider

<a id="released-in-flutter-327" aria-hidden="true">⟦L329⟧
### Flutter 3.27 釋出

* [`Color` 廣色域支援]</a>
* [元件主題正規化]</a>
* [深層連結旗標變更]</a>
* [Flutter 中 Material 3 Tokens 更新]⟦L205⟧
* [移除 `InputDecoration.collapsed` 的無效參數]⟦L206⟧
* [SystemUiMode 預設設為 Edge-to-Edge]⟦L207⟧

[`Color` wide gamut support]: /release/breaking-changes/wide-gamut-framework
[Component theme normalization]: /release/breaking-changes/component-theme-normalization
[Deep links flag change]: /release/breaking-changes/deep-links-flag-change
[Material 3 Tokens Update in Flutter]: /release/breaking-changes/material-design-3-token-update
[Remove invalid parameters for `InputDecoration.collapsed`]: /release/breaking-changes/input-decoration-collapsed
[Set default for SystemUiMode to Edge-to-Edge]: /release/breaking-changes/default-systemuimode-edge-to-edge

<a id="released-in-flutter-324" aria-hidden="true">⟦L330⟧
### Flutter 3.24 釋出

* [Navigator 的 page API 重大變更]⟦L208⟧
* [`PopScope` 泛型型別]⟦L209⟧
* [棄用 `ButtonBar`，改用 `OverflowBar`]⟦L210⟧
* [Android 插件渲染至 `Surface` 的新 API]⟦L211⟧

[Navigator's page APIs breaking change]: /release/breaking-changes/navigator-and-page-api
[Generic types in `PopScope`]: /release/breaking-changes/popscope-with-result
[Deprecate `ButtonBar` in favor of `OverflowBar`]: /release/breaking-changes/deprecate-buttonbar
[New APIs for Android plugins that render to a `Surface`]: /release/breaking-changes/android-surface-plugins

<a id="released-in-flutter-322" aria-hidden="true">⟦L331⟧
### Flutter 3.22 釋出

* [v3.19 後移除的棄用 API]⟦L212⟧
* [將 `MaterialState` 重新命名為 `WidgetState`]⟦L213⟧
* [新增 `ColorScheme` 角色]⟦L214⟧
* [停止支援 Android KitKat]⟦L215⟧
* [`PageView.controller` 可為 null]⟦L216⟧
* [將 `MemoryAllocations` 重新命名為 `FlutterMemoryAllocations`]⟦L217⟧

[Deprecated API removed after v3.19]: /release/breaking-changes/3-19-deprecations
[Rename `MaterialState` to `WidgetState`]: /release/breaking-changes/material-state
[Introduce new `ColorScheme` roles]: /release/breaking-changes/new-color-scheme-roles
[Dropping support for Android KitKat]: /release/breaking-changes/android-kitkat-deprecation
[Nullable `PageView.controller`]: /release/breaking-changes/pageview-controller
[Rename `MemoryAllocations` to `FlutterMemoryAllocations`]: /release/breaking-changes/flutter-memory-allocations

<a id="released-in-flutter-319" aria-hidden="true">⟦L332⟧
### Flutter 3.19 釋出

* [v3.16 後移除的棄用 API]⟦L218⟧
* [RawKeyEvent/RawKeyboard 系統遷移至 KeyEvent/HardwareKeyboard 系統]⟦L219⟧
* [棄用 Flutter Gradle 插件的命令式 apply]⟦L220⟧
* [預設多點觸控滾動]⟦L221⟧
* [tooltip 的無障礙遍歷順序變更]⟦L222⟧

[Deprecated API removed after v3.16]: /release/breaking-changes/3-16-deprecations
[Migrate RawKeyEvent/RawKeyboard system to KeyEvent/HardwareKeyboard system]: /release/breaking-changes/key-event-migration
[Deprecate imperative apply of Flutter's Gradle plugins]: /release/breaking-changes/flutter-gradle-plugin-apply
[Default multitouch scrolling]: /release/breaking-changes/multi-touch-scrolling
[Accessibility traversal order of tooltip changed]: /release/breaking-changes/tooltip-semantics-order

<a id="released-in-flutter-316" aria-hidden="true">⟦L333⟧
### Flutter 3.16 釋出

* [遷移至 Material 3]⟦L223⟧
* [ShortcutActivator 與 ShortcutManager 遷移至 KeyEvent 系統]⟦L224⟧
* [`ThemeData.useMaterial3` 屬性預設為 true]⟦L225⟧
* [v3.13 後移除的棄用 API]⟦L226⟧
* [使用新 `TabBar.tabAlignment` 屬性自訂分頁對齊]⟦L227⟧
* [棄用 `textScaleFactor`，改用 `TextScaler`]⟦L228⟧
* [啟用 Android 14 非線性字體縮放]⟦L229⟧
* [棄用 `describeEnum` 並將 `EnumProperty` 更新為型別嚴格]⟦L230⟧
* [Android Predictive Back 棄用即時導航 pop API]⟦L231⟧
* [棄用 `Paint.enableDithering`]⟦L232⟧
* [選單預設文字樣式更新]⟦L233⟧
* [Windows：外部視窗應通知 Flutter 引擎生命週期變化]⟦L234⟧
* [Windows 建置路徑新增目標架構]⟦L235⟧

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

<a id="released-in-flutter-313" aria-hidden="true">⟦L334⟧
### Flutter 3.13 釋出

* [為部分可釋放物件新增缺漏的 `dispose()`]⟦L236⟧
* [v3.10 後移除的棄用 API]⟦L237⟧
* [新增 AppLifecycleState.hidden]⟦L238⟧ 列舉值
* [將 ReorderableListView 的在地化字串從 material 移至 widgets localizations]⟦L239⟧
* [移除 `ignoringSemantics` 屬性]⟦L240⟧
* [棄用 `RouteInformation.location` 及其相關 API]⟦L241⟧
* [EditableText 捲動至可見行為更新]⟦L242⟧
* [Windows 專案遷移以確保視窗顯示]⟦L243⟧
* [`Checkbox.fillColor` 行為更新]⟦L244⟧

[Added missing `dispose()` for some disposable objects in Flutter]: /release/breaking-changes/dispose
[Deprecated API removed after v3.10]: /release/breaking-changes/3-10-deprecations
[Added AppLifecycleState.hidden]: /release/breaking-changes/add-applifecyclestate-hidden
[Moved ReorderableListView's localized strings]: /release/breaking-changes/material-localized-strings
[Removed `ignoringSemantics`]: /release/breaking-changes/ignoringsemantics-migration
[Deprecated `RouteInformation.location`]: /release/breaking-changes/route-information-uri
[Updated EditableText scroll into view behavior]: /release/breaking-changes/editable-text-scroll-into-view
[Migrate a Windows project to ensure the window is shown]: /release/breaking-changes/windows-show-window-migration
[Updated `Checkbox.fillColor` behavior]: /release/breaking-changes/checkbox-fillColor

<a id="released-in-flutter-310" aria-hidden="true">⟦L335⟧
### Flutter 3.10 釋出

* [Flutter v3.10 及後續版本的 Dart 3 變更]⟦L245⟧
* [v3.7 後移除的棄用 API]⟦L246⟧
* [插入內容文字輸入 client]⟦L247⟧
* [棄用 window singleton]⟦L248⟧
* [解決 Android Java Gradle 錯誤]⟦L249⟧
* [`ClipboardData` 建構子需至少一個資料變體]⟦L250⟧
* ["Zone mismatch" 訊息]⟦L251⟧

[Dart 3 changes in Flutter v3.10 and later]: {{site.dart-site}}/resources/dart-3-migration
[Deprecated API removed after v3.7]: /release/breaking-changes/3-7-deprecations
[Insert Content Text Input Client]: /release/breaking-changes/insert-content-text-input-client
[Deprecated the window singleton]: /release/breaking-changes/window-singleton
[Resolve the Android Java Gradle error]: /release/breaking-changes/android-java-gradle-migration-guide
[Require one data variant for `ClipboardData` constructor]: /release/breaking-changes/clipboard-data-required
["Zone mismatch" message]: /release/breaking-changes/zone-errors

<a id="released-in-flutter-37" aria-hidden="true">⟦L336⟧
### Flutter 3.7 釋出

* [v3.3 後移除的棄用 API]⟦L252⟧
* [以通用元件建構器取代自訂內容選單參數]⟦L253⟧
* [iOS FlutterViewController 的 splashScreenView 改為可為 null]⟦L254⟧
* [將 `of` 遷移為非 null 回傳值，並新增 `maybeOf`]⟦L255⟧
* [移除 RouteSettings.copyWith]⟦L256⟧
* [ThemeData 的 toggleableActiveColor 屬性已棄用]⟦L257⟧
* [Windows 專案遷移以支援深色標題列]⟦L258⟧

[Replaced parameters for customizing context menus with a generic widget builder]: /release/breaking-changes/context-menus
[Deprecated API removed after v3.3]: /release/breaking-changes/3-3-deprecations
[iOS FlutterViewController splashScreenView made nullable]: /release/breaking-changes/ios-flutterviewcontroller-splashscreenview-nullable
[Migrate `of` to non-nullable return values, and add `maybeOf`]: /release/breaking-changes/supplemental-maybeOf-migration
[Removed RouteSettings.copyWith]: /release/breaking-changes/routesettings-copywith-migration
[ThemeData's toggleableActiveColor property has been deprecated]: /release/breaking-changes/toggleable-active-color
[Migrate a Windows project to support dark title bars]: /release/breaking-changes/windows-dark-mode

<a id="released-in-flutter-33" aria-hidden="true">⟦L337⟧
### Flutter 3.3 釋出

* [新增 ImageProvider.loadBuffer]⟦L259⟧
* [桌面版預設 PrimaryScrollController]⟦L260⟧
* [觸控板手勢可觸
