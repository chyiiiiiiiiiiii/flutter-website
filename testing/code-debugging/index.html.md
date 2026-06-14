# 從程式碼偵錯 Flutter 應用程式

> 如何從程式碼與命令列啟用各種偵錯工具。



<?code-excerpt path-base="testing/code_debugging"?>

本指南說明你可以在程式碼中啟用哪些偵錯功能。
如需完整的偵錯與效能分析工具列表，請參閱
[Debugging][] 頁面。

## 為應用程式新增日誌紀錄

以下列出幾種你可以用來記錄應用程式行為的敘述。
你可以在 DevTools 的
[Logging view][] 或系統主控台中檢視你的日誌。

*   [`print()`][]：輸出 `stdout`（標準輸出）訊息。屬於
    `dart:io` 函式庫的一部分。

*   [`stderr.method_to_invoke()`][]：輸出 `stderr`（標準錯誤）訊息。
    將 `method_to_invoke()` 替換為 `stderr`
    屬性所支援的方法，例如 `writeln()` 或 `write()`。通常用於 `try...catch`
    區塊中。屬於 `dart:io` 函式庫的一部分。

    <?code-excerpt "lib/main.dart (stderr)"?>
    ```dart
    stderr.writeln('print me');
    ```

*   [`log()`][]：在日誌輸出中包含更細緻的層級與更多資訊。屬於 `dart:developer` 函式庫的一部分。

*   [`debugPrint()`][]：如果過多的輸出導致日誌行被捨棄，可以使用此功能保留這些行。除非是在 debug 模式檢查或 assert 中，否則在 release 模式下也會輸出訊息。屬於 `foundations` 函式庫的一部分。

### 範例 1 {:.no_toc}

<?code-excerpt "lib/main.dart (log)"?>
```dart
import 'dart:developer' as developer;

void main() {
  developer.log('log me', name: 'my.app.category');

  developer.log('log me 1', name: 'my.other.category');
  developer.log('log me 2', name: 'my.other.category');
}
```

你也可以將應用程式資料（app data）傳遞給 log 呼叫。
慣例上，這會使用 `error:` 命名參數於 `log()` 呼叫中，將你想傳送的物件進行 JSON 編碼，並將編碼後的字串傳遞給 error 參數。

### 範例 2 {:.no_toc}

<?code-excerpt "lib/app_data.dart (pass-data)"?>
```dart
import 'dart:convert';
import 'dart:developer' as developer;

void main() {
  var myCustomObject = MyCustomObject();

  developer.log(
    'log me',
    name: 'my.app.category',
    error: jsonEncode(myCustomObject),
  );
}
```

DevTool 的日誌檢視會將 JSON 編碼的錯誤參數
解析為資料物件。
DevTool 會在該日誌條目的詳細資訊檢視中呈現此資料。

## 設定中斷點

你可以在 DevTools 的 [Debugger][] 或
你的 IDE 內建的偵錯工具中設定中斷點。

若要以程式方式設定中斷點：

1. 在相關檔案中匯入 `dart:developer` 套件。
1. 使用 `debugger()` 陳述式插入程式中斷點。
   此陳述式可選擇性地接受 `when` 參數。
   這個布林值參數會在指定條件為 true 時觸發中斷。

   **範例 3** 會說明這一點。

### 範例 3 {:.no_toc}

<?code-excerpt "lib/debugger.dart"?>
```dart
import 'dart:developer';

void someFunction(double offset) {
  debugger(when: offset > 30);
  // ...
}
```

## 使用旗標除錯應用程式層級

Flutter 框架的每一層都提供了一個函式，可以透過 `debugPrint` 屬性將其當前狀態或事件輸出（dump）到主控台。

:::note
以下所有範例皆於 MacBook Pro M1 上以 macOS 原生應用程式執行。這些輸出內容可能會與您的開發機器所顯示的內容不同。
:::

:::tip
任何樹狀結構中的每個 render object（渲染物件）都包含其 [`hashCode`][] 的前五個十六進位數字。
這個雜湊值可作為該 render object 的唯一識別碼。
:::

[`hashCode`]: https://api.flutter.dev/flutter/rendering/TextSelectionPoint/hashCode.html

### 輸出元件樹（Widget tree）

若要輸出 Widgets（元件）函式庫的狀態，
請呼叫 [`debugDumpApp()`][] 函式。

1. 開啟您的原始檔案。
1. 匯入 `package:flutter/rendering.dart`。
1. 在 `runApp()` 函式中呼叫 [`debugDumpApp()`][] 函式。
   您需要讓應用程式處於 debug 模式。
   應用程式正在建構（building）時，無法在 `build()` 方法內呼叫此函式。
1. 如果您尚未啟動應用程式，請使用您的 IDE 進行除錯。
1. 如果您已經啟動應用程式，請儲存您的原始檔案。
   熱重載（Hot reload）會重新渲染您的應用程式。

#### 範例 4：呼叫 `debugDumpApp()`

<?code-excerpt "lib/dump_app.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpApp();
          },
          child: const Text('Dump Widget Tree'),
        ),
      ),
    );
  }
}
```

此函式會從元件樹（widget tree）的根節點開始，遞迴呼叫 `toStringDeep()` 方法。它會回傳一個「扁平化」的樹狀結構。

**範例 4** 產生了以下的元件樹（widget tree）。其中包含：

* 所有經由各自 build 函式投影出來的元件 (Widget)。
* 許多在你的應用程式原始碼中看不到的元件。
  這些元件是由框架的元件 build 函式在建構過程中插入的。

  例如，以下的樹狀結構顯示了 [`_InkFeatures`][]。
  此類別實作了 [`Material`][] 元件（Widget）的一部分。
  它在 **範例 4** 的程式碼中完全沒有出現。

<details>
<summary><strong>展開以檢視範例 4 的元件樹</strong></summary>

```plaintext
flutter: WidgetsFlutterBinding - DEBUG MODE
flutter: [root](renderObject: RenderView#06beb)
flutter: └View-[GlobalObjectKey FlutterView#7971c]
flutter:  └_ViewScope
flutter:   └_MediaQueryFromView(state: _MediaQueryFromViewState#d790c)
flutter:    └MediaQuery(MediaQueryData(size: Size(800.0, 600.0), devicePixelRatio: 1.0, textScaleFactor: 1.0, platformBrightness: Brightness.dark, padding: EdgeInsets.zero, viewPadding: EdgeInsets.zero, viewInsets: EdgeInsets.zero, systemGestureInsets: EdgeInsets.zero, alwaysUse24HourFormat: false, accessibleNavigation: false, highContrast: false, disableAnimations: false, invertColors: false, boldText: false, navigationMode: traditional, gestureSettings: DeviceGestureSettings(touchSlop: null), displayFeatures: []))
flutter:     └MaterialApp(state: _MaterialAppState#27fa9)
flutter:      └ScrollConfiguration(behavior: MaterialScrollBehavior)
flutter:       └HeroControllerScope
flutter:        └Focus(state: _FocusState#d7f97)
flutter:         └_FocusInheritedScope
flutter:          └Semantics(container: false, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#a6464)
flutter:           └WidgetsApp-[GlobalObjectKey _MaterialAppState#27fa9](state: _WidgetsAppState#b5b17)
flutter:            └RootRestorationScope(state: _RootRestorationScopeState#6b028)
flutter:             └UnmanagedRestorationScope
flutter:              └RestorationScope(dependencies: [UnmanagedRestorationScope], state: _RestorationScopeState#d1369)
flutter:               └UnmanagedRestorationScope
flutter:                └SharedAppData(state: _SharedAppDataState#95e82)
flutter:                 └_SharedAppModel
flutter:                  └Shortcuts(shortcuts: <Default WidgetsApp Shortcuts>, state: _ShortcutsState#272dc)
flutter:                   └Focus(debugLabel: "Shortcuts", dependencies: [_FocusInheritedScope], state: _FocusState#a3300)
flutter:                    └_FocusInheritedScope
flutter:                     └Semantics(container: false, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#db110)
flutter:                      └DefaultTextEditingShortcuts
flutter:                       └Shortcuts(shortcuts: <Default Text Editing Shortcuts>, state: _ShortcutsState#1d796)
flutter:                        └Focus(debugLabel: "Shortcuts", dependencies: [_FocusInheritedScope], state: _FocusState#0081b)
flutter:                         └_FocusInheritedScope
flutter:                          └Semantics(container: false, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#0d70e)
flutter:                           └Shortcuts(shortcuts: <Web Disabling Text Editing Shortcuts>, state: _ShortcutsState#56bac)
flutter:                            └Focus(debugLabel: "Shortcuts", dependencies: [_FocusInheritedScope], state: _FocusState#3152e)
flutter:                             └_FocusInheritedScope
flutter:                              └Semantics(container: false, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#b7eaf)
flutter:                               └Actions(dispatcher: null, actions: {DoNothingIntent: DoNothingAction#0fda1, DoNothingAndStopPropagationIntent: DoNothingAction#17f30, RequestFocusIntent: RequestFocusAction#10bd0, NextFocusIntent: NextFocusAction#60317, PreviousFocusIntent: PreviousFocusAction#2a933, DirectionalFocusIntent: DirectionalFocusAction#a6922, ScrollIntent: _OverridableContextAction<ScrollIntent>#964fe(defaultAction: ScrollAction#ffb50), PrioritizedIntents: PrioritizedAction#be0e2, VoidCallbackIntent: VoidCallbackAction#805fa}, state: _ActionsState#bbd25)
flutter:                                └_ActionsScope
flutter:                                 └FocusTraversalGroup(policy: ReadingOrderTraversalPolicy#f1e76, state: _FocusTraversalGroupState#0c200)
flutter:                                  └Focus(debugLabel: "FocusTraversalGroup", focusNode: _FocusTraversalGroupNode#ffcad(FocusTraversalGroup [IN FOCUS PATH]), dependencies: [_FocusInheritedScope], state: _FocusState#c7dc2)
flutter:                                   └_FocusInheritedScope
flutter:                                    └TapRegionSurface(renderObject: RenderTapRegionSurface#17aba)
flutter:                                     └ShortcutRegistrar(state: _ShortcutRegistrarState#44954)
flutter:                                      └_ShortcutRegistrarScope
flutter:                                       └Shortcuts(manager: ShortcutManager#eb38c(shortcuts: {}), shortcuts: {}, state: _ShortcutsState#f85ac)
flutter:                                        └Focus(debugLabel: "Shortcuts", dependencies: [_FocusInheritedScope], state: _FocusState#8c1a7)
flutter:                                         └_FocusInheritedScope
flutter:                                          └Semantics(container: false, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#1fc98)
flutter:                                           └Localizations(locale: en_US, delegates: [DefaultMaterialLocalizations.delegate(en_US), DefaultCupertinoLocalizations.delegate(en_US), DefaultWidgetsLocalizations.delegate(en_US)], state: _LocalizationsState#ae3a0)
flutter:                                            └Semantics(container: false, properties: SemanticsProperties, tooltip: null, textDirection: ltr, renderObject: RenderSemanticsAnnotations#8776e)
flutter:                                             └_LocalizationsScope-[GlobalKey#61ca6]
flutter:                                              └Directionality(textDirection: ltr)
flutter:                                               └Title(color: Color(0xff2196f3))
flutter:                                                └CheckedModeBanner("DEBUG")
flutter:                                                 └Banner("DEBUG", textDirection: ltr, location: topEnd, Color(0xa0b71c1c), text inherit: true, text color: Color(0xffffffff), text size: 10.2, text weight: 900, text height: 1.0x, dependencies: [Directionality])
flutter:                                                  └CustomPaint(renderObject: RenderCustomPaint#c014d)
flutter:                                                   └DefaultTextStyle(debugLabel: fallback style; consider putting your text in a Material, inherit: true, color: Color(0xd0ff0000), family: monospace, size: 48.0, weight: 900, decoration: double Color(0xffffff00) TextDecoration.underline, softWrap: wrapping at box width, overflow: clip)
flutter:                                                    └Builder(dependencies: [MediaQuery])
flutter:                                                     └ScaffoldMessenger(dependencies: [MediaQuery], state: ScaffoldMessengerState#5b36e)
flutter:                                                      └_ScaffoldMessengerScope
flutter:                                                       └DefaultSelectionStyle
flutter:                                                        └AnimatedTheme(duration: 200ms, state: _AnimatedThemeState#cd149(ticker inactive, ThemeDataTween(ThemeData#ef3b2 → ThemeData#ef3b2)))
flutter:                                                         └Theme(ThemeData#ef3b2, dependencies: [DefaultSelectionStyle])
flutter:                                                          └_InheritedTheme
flutter:                                                           └CupertinoTheme(brightness: light, primaryColor: MaterialColor(primary value: Color(0xff2196f3)), primaryContrastingColor: Color(0xffffffff), scaffoldBackgroundColor: Color(0xfffafafa), actionTextStyle: TextStyle(inherit: false, color: MaterialColor(primary value: Color(0xff2196f3)), family: .SF Pro Text, size: 17.0, letterSpacing: -0.4, decoration: TextDecoration.none), navActionTextStyle: TextStyle(inherit: false, color: MaterialColor(primary value: Color(0xff2196f3)), family: .SF Pro Text, size: 17.0, letterSpacing: -0.4, decoration: TextDecoration.none))
flutter:                                                            └_InheritedCupertinoTheme
flutter:                                                             └IconTheme(color: MaterialColor(primary value: Color(0xff2196f3)))
flutter:                                                              └IconTheme(color: Color(0xdd000000))
flutter:                                                               └DefaultSelectionStyle
flutter:                                                                └FocusScope(debugLabel: "Navigator Scope", AUTOFOCUS, dependencies: [_FocusInheritedScope], state: _FocusScopeState#acbd8)
flutter:                                                                 └Semantics(container: false, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#ab3f0)
flutter:                                                                  └_FocusInheritedScope
flutter:                                                                   └Navigator-[GlobalObjectKey<NavigatorState> _WidgetsAppState#b5b17](dependencies: [HeroControllerScope, UnmanagedRestorationScope], state: NavigatorState#1395a(tickers: tracking 1 ticker))
flutter:                                                                    └HeroControllerScope
flutter:                                                                     └Listener(listeners: [down, up, cancel], behavior: deferToChild, renderObject: RenderPointerListener#34172)
flutter:                                                                      └AbsorbPointer(absorbing: false, renderObject: RenderAbsorbPointer#f8711)
flutter:                                                                       └FocusTraversalGroup(policy: ReadingOrderTraversalPolicy#f1e76, state: _FocusTraversalGroupState#8d61a)
flutter:                                                                        └Focus(debugLabel: "FocusTraversalGroup", focusNode: _FocusTraversalGroupNode#dd2b1(FocusTraversalGroup [IN FOCUS PATH]), dependencies: [_FocusInheritedScope], state: _FocusState#0bb03)
flutter:                                                                         └_FocusInheritedScope
flutter:                                                                          └Focus(debugLabel: "Navigator", AUTOFOCUS, focusNode: FocusNode#a3309(Navigator [IN FOCUS PATH]), dependencies: [_FocusInheritedScope], state: _FocusState#d3d07)
flutter:                                                                           └_FocusInheritedScope
flutter:                                                                            └UnmanagedRestorationScope
flutter:                                                                             └Overlay-[LabeledGlobalKey<OverlayState>#5485a](state: OverlayState#5bd52(entries: [OverlayEntry#fc947(opaque: true; maintainState: false), OverlayEntry#05a32(opaque: false; maintainState: true)]))
flutter:                                                                              └_Theater(skipCount: 0, dependencies: [Directionality], renderObject: _RenderTheater#e86c3)
flutter:                                                                               ├_OverlayEntryWidget-[LabeledGlobalKey<_OverlayEntryWidgetState>#1b37e](state: _OverlayEntryWidgetState#06ab0)
flutter:                                                                               │└TickerMode(state: _TickerModeState#0b4ac(requested mode: enabled))
flutter:                                                                               │ └_EffectiveTickerMode(effective mode: enabled)
flutter:                                                                               │  └_RenderTheaterMarker
flutter:                                                                               │   └IgnorePointer(ignoring: false, renderObject: RenderIgnorePointer#34c66)
flutter:                                                                               │    └ModalBarrier
flutter:                                                                               │     └BlockSemantics(blocking: true, renderObject: RenderBlockSemantics#97799)
flutter:                                                                               │      └ExcludeSemantics(excluding: true, renderObject: RenderExcludeSemantics#8c4ce)
flutter:                                                                               │       └_ModalBarrierGestureDetector
flutter:                                                                               │        └RawGestureDetector(state: RawGestureDetectorState#556f6(gestures: [any tap], behavior: opaque))
flutter:                                                                               │         └_GestureSemantics(renderObject: RenderSemanticsGestureHandler#616f1)
flutter:                                                                               │          └Listener(listeners: [down, panZoomStart], behavior: opaque, renderObject: RenderPointerListener#c2b89)
flutter:                                                                               │           └Semantics(container: false, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#c3b31)
flutter:                                                                               │            └MouseRegion(listeners: <none>, cursor: SystemMouseCursor(basic), renderObject: RenderMouseRegion#53cdb)
flutter:                                                                               │             └ConstrainedBox(BoxConstraints(biggest), renderObject: RenderConstrainedBox#faa51)
flutter:                                                                               └_OverlayEntryWidget-[LabeledGlobalKey<_OverlayEntryWidgetState>#bc0aa](state: _OverlayEntryWidgetState#cbf35)
flutter:                                                                                └TickerMode(state: _TickerModeState#23e73(requested mode: enabled))
flutter:                                                                                 └_EffectiveTickerMode(effective mode: enabled)
flutter:                                                                                  └_RenderTheaterMarker
flutter:                                                                                   └Semantics(container: false, properties: SemanticsProperties, tooltip: null, sortKey: OrdinalSortKey#135f4(order: 0.0), renderObject: RenderSemanticsAnnotations#5565e)
flutter:                                                                                    └_ModalScope<dynamic>-[LabeledGlobalKey<_ModalScopeState<dynamic>>#4fe82](state: _ModalScopeState<dynamic>#4da7d)
flutter:                                                                                     └AnimatedBuilder(listenable: ValueNotifier<String?>#d87c6(null), state: _AnimatedState#dde81)
flutter:                                                                                      └RestorationScope(dependencies: [UnmanagedRestorationScope], state: _RestorationScopeState#78c51)
flutter:                                                                                       └UnmanagedRestorationScope
flutter:                                                                                        └_ModalScopeStatus(active)
flutter:                                                                                         └Offstage(offstage: false, renderObject: RenderOffstage#5e498)
flutter:                                                                                          └PageStorage
flutter:                                                                                           └Builder
flutter:                                                                                            └Actions(dispatcher: null, actions: {DismissIntent: _DismissModalAction#6279e}, state: _ActionsState#48019)
flutter:                                                                                             └_ActionsScope
flutter:                                                                                              └PrimaryScrollController(ScrollController#6a546(no clients))
flutter:                                                                                               └FocusScope(debugLabel: "_ModalScopeState<dynamic> Focus Scope", focusNode: FocusScopeNode#0e2af(_ModalScopeState<dynamic> Focus Scope [PRIMARY FOCUS]), dependencies: [_FocusInheritedScope], state: _FocusScopeState#0bac4)
flutter:                                                                                                └Semantics(container: false, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#44b4e)
flutter:                                                                                                 └_FocusInheritedScope
flutter:                                                                                                  └RepaintBoundary(renderObject: RenderRepaintBoundary#38f41)
flutter:                                                                                                   └AnimatedBuilder(listenable: Listenable.merge([AnimationController#9d623(⏭ 1.000; paused; for MaterialPageRoute<dynamic>(/))➩ProxyAnimation, kAlwaysDismissedAnimation➩ProxyAnimation➩ProxyAnimation]), dependencies: [_InheritedTheme, _LocalizationsScope-[GlobalKey#61ca6]], state: _AnimatedState#47725)
flutter:                                                                                                    └CupertinoPageTransition(dependencies: [Directionality])
flutter:                                                                                                     └SlideTransition(listenable: kAlwaysDismissedAnimation➩ProxyAnimation➩ProxyAnimation➩Cubic(0.35, 0.91, 0.33, 0.97)ₒₙ/Cubic(0.67, 0.03, 0.65, 0.09)➩Tween<Offset>(Offset(0.0, 0.0) → Offset(-0.3, 0.0))➩Offset(0.0, 0.0), state: _AnimatedState#b6162)
flutter:                                                                                                      └FractionalTranslation(renderObject: RenderFractionalTranslation#fb461)
flutter:                                                                                                       └SlideTransition(listenable: AnimationController#9d623(⏭ 1.000; paused; for MaterialPageRoute<dynamic>(/))➩ProxyAnimation➩ThreePointCubic ₒₙ/FlippedCurve(ThreePointCubic )➩Tween<Offset>(Offset(1.0, 0.0) → Offset(0.0, 0.0))➩Offset(0.0, 0.0), state: _AnimatedState#834bf)
flutter:                                                                                                        └FractionalTranslation(renderObject: RenderFractionalTranslation#73ea4)
flutter:                                                                                                         └DecoratedBoxTransition(listenable: AnimationController#9d623(⏭ 1.000; paused; for MaterialPageRoute<dynamic>(/))➩ProxyAnimation➩Cubic(0.35, 0.91, 0.33, 0.97)➩DecorationTween(_CupertinoEdgeShadowDecoration(colors: null) → _CupertinoEdgeShadowDecoration(colors: [Color(0x04000000), Color(0x00000000)]))➩_CupertinoEdgeShadowDecoration(colors: [Color(0x04000000), Color(0x00000000)]), state: _AnimatedState#a7fca)
flutter:                                                                                                          └DecoratedBox(bg: _CupertinoEdgeShadowDecoration(colors: [Color(0x04000000), Color(0x00000000)]), dependencies: [Directionality, MediaQuery, _LocalizationsScope-[GlobalKey#61ca6]], renderObject: RenderDecoratedBox#9965c)
flutter:                                                                                                           └_CupertinoBackGestureDetector<dynamic>(dependencies: [Directionality, MediaQuery], state: _CupertinoBackGestureDetectorState<dynamic>#ab8cd)
flutter:                                                                                                            └Stack(alignment: AlignmentDirectional.topStart, fit: passthrough, dependencies: [Directionality], renderObject: RenderStack#b2b7c)
flutter:                                                                                                             ├AnimatedBuilder(listenable: ValueNotifier<bool>#1a88e(false), state: _AnimatedState#6e33c)
flutter:                                                                                                             │└IgnorePointer(ignoring: false, renderObject: RenderIgnorePointer#2b763)
flutter:                                                                                                             │ └RepaintBoundary-[GlobalKey#628f4](renderObject: RenderRepaintBoundary#5a53b)
flutter:                                                                                                             │  └Builder
flutter:                                                                                                             │   └Semantics(container: false, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#f8795)
flutter:                                                                                                             │    └AppHome
flutter:                                                                                                             │     └Material(type: canvas, dependencies: [_InheritedTheme, _LocalizationsScope-[GlobalKey#61ca6]], state: _MaterialState#7d183)
flutter:                                                                                                             │      └AnimatedPhysicalModel(duration: 200ms, shape: rectangle, borderRadius: BorderRadius.zero, elevation: 0.0, color: Color(0xfffafafa), animateColor: false, shadowColor: Color(0xff000000), animateShadowColor: true, state: _AnimatedPhysicalModelState#d479e(ticker inactive))
flutter:                                                                                                             │       └PhysicalModel(shape: rectangle, borderRadius: BorderRadius.zero, elevation: 0.0, color: Color(0xfffafafa), shadowColor: Color(0xff000000), renderObject: RenderPhysicalModel#c60b5)
flutter:                                                                                                             │        └NotificationListener<LayoutChangedNotification>
flutter:                                                                                                             │         └_InkFeatures-[GlobalKey#e9da0 ink renderer](renderObject: _RenderInkFeatures#d8e6d)
flutter:                                                                                                             │          └AnimatedDefaultTextStyle(duration: 200ms, debugLabel: (englishLike bodyMedium 2014).merge(blackRedwoodCity bodyMedium), inherit: false, color: Color(0xdd000000), family: .AppleSystemUIFont, size: 14.0, weight: 400, baseline: alphabetic, decoration: TextDecoration.none, softWrap: wrapping at box width, overflow: clip, state: _AnimatedDefaultTextStyleState#12f43(ticker inactive))
flutter:                                                                                                             │           └DefaultTextStyle(debugLabel: (englishLike bodyMedium 2014).merge(blackRedwoodCity bodyMedium), inherit: false, color: Color(0xdd000000), family: .AppleSystemUIFont, size: 14.0, weight: 400, baseline: alphabetic, decoration: TextDecoration.none, softWrap: wrapping at box width, overflow: clip)
flutter:                                                                                                             │            └Center(alignment: Alignment.center, dependencies: [Directionality], renderObject: RenderPositionedBox#b088f)
flutter:                                                                                                             │             └TextButton(dirty, dependencies: [MediaQuery, _InheritedTheme, _LocalizationsScope-[GlobalKey#61ca6]], state: _ButtonStyleState#687c9)
flutter:                                                                                                             │              └Semantics(container: true, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#ca411 relayoutBoundary=up1)
flutter:                                                                                                             │               └_InputPadding(renderObject: _RenderInputPadding#60ede relayoutBoundary=up2)
flutter:                                                                                                             │                └ConstrainedBox(BoxConstraints(56.0<=w<=Infinity, 28.0<=h<=Infinity), renderObject: RenderConstrainedBox#34800 relayoutBoundary=up3)
flutter:                                                                                                             │                 └Material(type: button, color: Color(0x00000000), shadowColor: Color(0xff000000), textStyle.debugLabel: ((englishLike labelLarge 2014).merge(blackRedwoodCity labelLarge)).copyWith, textStyle.inherit: false, textStyle.color: MaterialColor(primary value: Color(0xff2196f3)), textStyle.family: .AppleSystemUIFont, textStyle.size: 14.0, textStyle.weight: 500, textStyle.baseline: alphabetic, textStyle.decoration: TextDecoration.none, shape: RoundedRectangleBorder(BorderSide(width: 0.0, style: none), BorderRadius.circular(4.0)), dependencies: [_InheritedTheme, _LocalizationsScope-[GlobalKey#61ca6]], state: _MaterialState#50a4d(tickers: tracking 5 tickers))
flutter:                                                                                                             │                  └_MaterialInterior(duration: 200ms, shape: RoundedRectangleBorder(BorderSide(width: 0.0, style: none), BorderRadius.circular(4.0)), elevation: 0.0, color: Color(0x00000000), shadowColor: Color(0xff000000), dependencies: [Directionality, _InheritedTheme, _LocalizationsScope-[GlobalKey#61ca6]], state: _MaterialInteriorState#d296d(ticker inactive))
flutter:                                                                                                             │                   └PhysicalShape(clipper: ShapeBorderClipper, elevation: 0.0, color: Color(0x00000000), shadowColor: Color(0xff000000), renderObject: RenderPhysicalShape#43df6 relayoutBoundary=up4)
flutter:                                                                                                             │                    └_ShapeBorderPaint(dependencies: [Directionality])
flutter:                                                                                                             │                     └CustomPaint(renderObject: RenderCustomPaint#c1a3c relayoutBoundary=up5)
flutter:                                                                                                             │                      └NotificationListener<LayoutChangedNotification>
flutter:                                                                                                             │                       └_InkFeatures-[GlobalKey#625bc ink renderer](renderObject: _RenderInkFeatures#54439 relayoutBoundary=up6)
flutter:                                                                                                             │                        └AnimatedDefaultTextStyle(duration: 200ms, debugLabel: ((englishLike labelLarge 2014).merge(blackRedwoodCity labelLarge)).copyWith, inherit: false, color: MaterialColor(primary value: Color(0xff2196f3)), family: .AppleSystemUIFont, size: 14.0, weight: 500, baseline: alphabetic, decoration: TextDecoration.none, softWrap: wrapping at box width, overflow: clip, state: _AnimatedDefaultTextStyleState#2f29d(ticker inactive))
flutter:                                                                                                             │                         └DefaultTextStyle(debugLabel: ((englishLike labelLarge 2014).merge(blackRedwoodCity labelLarge)).copyWith, inherit: false, color: MaterialColor(primary value: Color(0xff2196f3)), family: .AppleSystemUIFont, size: 14.0, weight: 500, baseline: alphabetic, decoration: TextDecoration.none, softWrap: wrapping at box width, overflow: clip)
flutter:                                                                                                             │                          └InkWell
flutter:                                                                                                             │                           └_InkResponseStateWidget(gestures: [tap], mouseCursor: ButtonStyleButton_MouseCursor, clipped to BoxShape.rectangle, dirty, dependencies: [Directionality, MediaQuery, _InheritedTheme, _LocalizationsScope-[GlobalKey#61ca6]], state: _InkResponseState#0b11d)
flutter:                                                                                                             │                            └_ParentInkResponseProvider
flutter:                                                                                                             │                             └Actions(dispatcher: null, actions: {ActivateIntent: CallbackAction<ActivateIntent>#018db, ButtonActivateIntent: CallbackAction<ButtonActivateIntent>#ef87a}, state: _ActionsState#a5eab)
flutter:                                                                                                             │                              └_ActionsScope
flutter:                                                                                                             │                               └Focus(dependencies: [_FocusInheritedScope], state: _FocusState#5a9de)
flutter:                                                                                                             │                                └_FocusInheritedScope
flutter:                                                                                                             │                                 └Semantics(container: false, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#8ac3e relayoutBoundary=up7)
flutter:                                                                                                             │                                  └MouseRegion(listeners: [enter, exit], cursor: SystemMouseCursor(click), renderObject: RenderMouseRegion#13d4e relayoutBoundary=up8)
flutter:                                                                                                             │                                   └Builder(dependencies: [DefaultSelectionStyle])
flutter:                                                                                                             │                                    └DefaultSelectionStyle
flutter:                                                                                                             │                                     └Semantics(container: false, properties: SemanticsProperties, tooltip: null, renderObject: RenderSemanticsAnnotations#d99cc relayoutBoundary=up9)
flutter:                                                                                                             │                                      └GestureDetector(startBehavior: start, dependencies: [MediaQuery])
flutter:                                                                                                             │                                       └RawGestureDetector(state: RawGestureDetectorState#b8d93(gestures: [tap], excludeFromSemantics: true, behavior: opaque))
flutter:                                                                                                             │                                        └Listener(listeners: [down, panZoomStart], behavior: opaque, renderObject: RenderPointerListener#a4c3b relayoutBoundary=up10)
flutter:                                                                                                             │                                         └Builder(dependencies: [IconTheme])
flutter:                                                                                                             │                                          └IconTheme(color: MaterialColor(primary value: Color(0xff2196f3)))
flutter:                                                                                                             │                                           └Padding(padding: EdgeInsets(8.0, 0.0, 8.0, 0.0), dependencies: [Directionality], renderObject: RenderPadding#18a87 relayoutBoundary=up11)
flutter:                                                                                                             │                                            └Align(alignment: Alignment.center, widthFactor: 1.0, heightFactor: 1.0, dependencies: [Directionality], renderObject: RenderPositionedBox#fb8a8 relayoutBoundary=up12)
flutter:                                                                                                             │                                             └Text("Dump Widget Tree", dependencies: [DefaultSelectionStyle, DefaultTextStyle, MediaQuery])
flutter:                                                                                                             │                                              └RichText(softWrap: wrapping at box width, maxLines: unlimited, text: "Dump Widget Tree", dependencies: [Directionality, _LocalizationsScope-[GlobalKey#61ca6]], renderObject: RenderParagraph#d15aa relayoutBoundary=up13)
flutter:                                                                                                             └PositionedDirectional(dependencies: [Directionality])
flutter:                                                                                                              └Positioned(left: 0.0, top: 0.0, bottom: 0.0, width: 20.0)
flutter:                                                                                                               └Listener(listeners: [down], behavior: translucent, renderObject: RenderPointerListener#d884c)
flutter:
flutter:
```
</details>

當按鈕從被按下變為釋放時，
會觸發 `debugDumpApp()` 函式。
這同時也會讓 [`TextButton`][] 物件呼叫 [`setState()`][]，
進而將自身標記為 dirty（髒狀態）。
這說明了為什麼 Flutter 會將特定物件標記為「dirty」。
當你檢視元件樹時，請留意類似以下的行：

```plaintext
└TextButton(dirty, dependencies: [MediaQuery, _InheritedTheme, _LocalizationsScope-[GlobalKey#5880d]], state: _ButtonStyleState#ab76e)
```

如果你撰寫自己的元件（Widgets），請覆寫
[`debugFillProperties()`][widget-fill] 方法以新增資訊。
在該方法的參數中加入 [DiagnosticsProperty][] 物件，
並呼叫父類別的方法。
`toString` 方法會利用這個函式來填充元件（Widget）的描述。

### 列印 render tree（渲染樹）

當你在除錯版面配置問題時，元件（Widgets）層的樹狀結構可能缺乏細節。
下一步的除錯可能需要 render tree（渲染樹）。
要傾印 render tree，請執行下列步驟：

1. 開啟你的原始碼檔案。
1. 呼叫 [`debugDumpRenderTree()`][] 函式。
   你可以在任何時候呼叫這個函式，除了在 layout 或 paint 階段。
   建議從 [frame callback][] 或事件處理器（event handler）中呼叫。
1. 如果你尚未啟動應用程式，請使用你的 IDE 進行除錯。
1. 如果你已經啟動應用程式，請儲存你的原始碼檔案。
   熱重載（Hot reload）會重新渲染你的應用程式。

#### 範例 5：呼叫 `debugDumpRenderTree()`

<?code-excerpt "lib/dump_render_tree.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpRenderTree();
          },
          child: const Text('Dump Render Tree'),
        ),
      ),
    );
  }
}
```

在除錯版面配置問題時，請查看 `size` 和 `constraints` 欄位。
約束（constraints）會沿著樹往下傳遞，而尺寸（sizes）則會往上回傳。

<details>
<summary><strong>展開以檢視 Example 5 的 render tree（渲染樹）</strong></summary>

```plaintext
flutter: RenderView#02c80
flutter:  │ debug mode enabled - macos
flutter:  │ view size: Size(800.0, 600.0) (in physical pixels)
flutter:  │ device pixel ratio: 1.0 (physical pixels per logical pixel)
flutter:  │ configuration: Size(800.0, 600.0) at 1.0x (in logical pixels)
flutter:  │
flutter:  └─child: RenderSemanticsAnnotations#fe6b5
flutter:    │ needs compositing
flutter:    │ creator: Semantics ← _FocusInheritedScope ← Focus ←
flutter:    │   HeroControllerScope ← ScrollConfiguration ← MaterialApp ←
flutter:    │   MediaQuery ← _MediaQueryFromView ← _ViewScope ←
flutter:    │   View-[GlobalObjectKey FlutterView#6cffa] ← [root]
flutter:    │ parentData: <none>
flutter:    │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:    │ size: Size(800.0, 600.0)
flutter:    │
flutter:    └─child: RenderSemanticsAnnotations#6edef
flutter:      │ needs compositing
flutter:      │ creator: Semantics ← _FocusInheritedScope ← Focus ← Shortcuts ←
flutter:      │   _SharedAppModel ← SharedAppData ← UnmanagedRestorationScope ←
flutter:      │   RestorationScope ← UnmanagedRestorationScope ←
flutter:      │   RootRestorationScope ← WidgetsApp-[GlobalObjectKey
flutter:      │   _MaterialAppState#5c303] ← Semantics ← ⋯
flutter:      │ parentData: <none> (can use size)
flutter:      │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:      │ size: Size(800.0, 600.0)
flutter:      │
flutter:      └─child: RenderSemanticsAnnotations#e8ce8
flutter:        │ needs compositing
flutter:        │ creator: Semantics ← _FocusInheritedScope ← Focus ← Shortcuts ←
flutter:        │   DefaultTextEditingShortcuts ← Semantics ← _FocusInheritedScope
flutter:        │   ← Focus ← Shortcuts ← _SharedAppModel ← SharedAppData ←
flutter:        │   UnmanagedRestorationScope ← ⋯
flutter:        │ parentData: <none> (can use size)
flutter:        │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:        │ size: Size(800.0, 600.0)
flutter:        │
flutter:        └─child: RenderSemanticsAnnotations#fc545
flutter:          │ needs compositing
flutter:          │ creator: Semantics ← _FocusInheritedScope ← Focus ← Shortcuts ←
flutter:          │   Semantics ← _FocusInheritedScope ← Focus ← Shortcuts ←
flutter:          │   DefaultTextEditingShortcuts ← Semantics ← _FocusInheritedScope
flutter:          │   ← Focus ← ⋯
flutter:          │ parentData: <none> (can use size)
flutter:          │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:          │ size: Size(800.0, 600.0)
flutter:          │
flutter:          └─child: RenderTapRegionSurface#ff857
flutter:            │ needs compositing
flutter:            │ creator: TapRegionSurface ← _FocusInheritedScope ← Focus ←
flutter:            │   FocusTraversalGroup ← _ActionsScope ← Actions ← Semantics ←
flutter:            │   _FocusInheritedScope ← Focus ← Shortcuts ← Semantics ←
flutter:            │   _FocusInheritedScope ← ⋯
flutter:            │ parentData: <none> (can use size)
flutter:            │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:            │ size: Size(800.0, 600.0)
flutter:            │ behavior: deferToChild
flutter:            │
flutter:            └─child: RenderSemanticsAnnotations#fe316
flutter:              │ needs compositing
flutter:              │ creator: Semantics ← _FocusInheritedScope ← Focus ← Shortcuts ←
flutter:              │   _ShortcutRegistrarScope ← ShortcutRegistrar ← TapRegionSurface
flutter:              │   ← _FocusInheritedScope ← Focus ← FocusTraversalGroup ←
flutter:              │   _ActionsScope ← Actions ← ⋯
flutter:              │ parentData: <none> (can use size)
flutter:              │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:              │ size: Size(800.0, 600.0)
flutter:              │
flutter:              └─child: RenderSemanticsAnnotations#fa55c
flutter:                │ needs compositing
flutter:                │ creator: Semantics ← Localizations ← Semantics ←
flutter:                │   _FocusInheritedScope ← Focus ← Shortcuts ←
flutter:                │   _ShortcutRegistrarScope ← ShortcutRegistrar ← TapRegionSurface
flutter:                │   ← _FocusInheritedScope ← Focus ← FocusTraversalGroup ← ⋯
flutter:                │ parentData: <none> (can use size)
flutter:                │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                │ size: Size(800.0, 600.0)
flutter:                │
flutter:                └─child: RenderCustomPaint#4b256
flutter:                  │ needs compositing
flutter:                  │ creator: CustomPaint ← Banner ← CheckedModeBanner ← Title ←
flutter:                  │   Directionality ← _LocalizationsScope-[GlobalKey#4a3aa] ←
flutter:                  │   Semantics ← Localizations ← Semantics ← _FocusInheritedScope ←
flutter:                  │   Focus ← Shortcuts ← ⋯
flutter:                  │ parentData: <none> (can use size)
flutter:                  │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                  │ size: Size(800.0, 600.0)
flutter:                  │ painter: null
flutter:                  │ foregroundPainter: BannerPainter#1bfd7(Instance of
flutter:                  │   '_SystemFontsNotifier')
flutter:                  │
flutter:                  └─child: RenderSemanticsAnnotations#f470f
flutter:                    │ needs compositing
flutter:                    │ creator: Semantics ← FocusScope ← DefaultSelectionStyle ←
flutter:                    │   IconTheme ← IconTheme ← _InheritedCupertinoTheme ←
flutter:                    │   CupertinoTheme ← _InheritedTheme ← Theme ← AnimatedTheme ←
flutter:                    │   DefaultSelectionStyle ← _ScaffoldMessengerScope ← ⋯
flutter:                    │ parentData: <none> (can use size)
flutter:                    │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                    │ size: Size(800.0, 600.0)
flutter:                    │
flutter:                    └─child: RenderPointerListener#f59c8
flutter:                      │ needs compositing
flutter:                      │ creator: Listener ← HeroControllerScope ←
flutter:                      │   Navigator-[GlobalObjectKey<NavigatorState>
flutter:                      │   _WidgetsAppState#0d73a] ← _FocusInheritedScope ← Semantics ←
flutter:                      │   FocusScope ← DefaultSelectionStyle ← IconTheme ← IconTheme ←
flutter:                      │   _InheritedCupertinoTheme ← CupertinoTheme ← _InheritedTheme ← ⋯
flutter:                      │ parentData: <none> (can use size)
flutter:                      │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                      │ size: Size(800.0, 600.0)
flutter:                      │ behavior: deferToChild
flutter:                      │ listeners: down, up, cancel
flutter:                      │
flutter:                      └─child: RenderAbsorbPointer#c91bd
flutter:                        │ needs compositing
flutter:                        │ creator: AbsorbPointer ← Listener ← HeroControllerScope ←
flutter:                        │   Navigator-[GlobalObjectKey<NavigatorState>
flutter:                        │   _WidgetsAppState#0d73a] ← _FocusInheritedScope ← Semantics ←
flutter:                        │   FocusScope ← DefaultSelectionStyle ← IconTheme ← IconTheme ←
flutter:                        │   _InheritedCupertinoTheme ← CupertinoTheme ← ⋯
flutter:                        │ parentData: <none> (can use size)
flutter:                        │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                        │ size: Size(800.0, 600.0)
flutter:                        │ absorbing: false
flutter:                        │ ignoringSemantics: null
flutter:                        │
flutter:                        └─child: _RenderTheater#07897
flutter:                          │ needs compositing
flutter:                          │ creator: _Theater ←
flutter:                          │   Overlay-[LabeledGlobalKey<OverlayState>#49a93] ←
flutter:                          │   UnmanagedRestorationScope ← _FocusInheritedScope ← Focus ←
flutter:                          │   _FocusInheritedScope ← Focus ← FocusTraversalGroup ←
flutter:                          │   AbsorbPointer ← Listener ← HeroControllerScope ←
flutter:                          │   Navigator-[GlobalObjectKey<NavigatorState>
flutter:                          │   _WidgetsAppState#0d73a] ← ⋯
flutter:                          │ parentData: <none> (can use size)
flutter:                          │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          │ size: Size(800.0, 600.0)
flutter:                          │ skipCount: 0
flutter:                          │ textDirection: ltr
flutter:                          │
flutter:                          ├─onstage 1: RenderIgnorePointer#3b659
flutter:                          │ │ creator: IgnorePointer ← _RenderTheaterMarker ←
flutter:                          │ │   _EffectiveTickerMode ← TickerMode ←
flutter:                          │ │   _OverlayEntryWidget-[LabeledGlobalKey<_OverlayEntryWidgetState>#a47f4]
flutter:                          │ │   ← _Theater ← Overlay-[LabeledGlobalKey<OverlayState>#49a93] ←
flutter:                          │ │   UnmanagedRestorationScope ← _FocusInheritedScope ← Focus ←
flutter:                          │ │   _FocusInheritedScope ← Focus ← ⋯
flutter:                          │ │ parentData: not positioned; offset=Offset(0.0, 0.0) (can use
flutter:                          │ │   size)
flutter:                          │ │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          │ │ size: Size(800.0, 600.0)
flutter:                          │ │ ignoring: false
flutter:                          │ │ ignoringSemantics: null
flutter:                          │ │
flutter:                          │ └─child: RenderBlockSemantics#7586c
flutter:                          │   │ creator: BlockSemantics ← ModalBarrier ← IgnorePointer ←
flutter:                          │   │   _RenderTheaterMarker ← _EffectiveTickerMode ← TickerMode ←
flutter:                          │   │   _OverlayEntryWidget-[LabeledGlobalKey<_OverlayEntryWidgetState>#a47f4]
flutter:                          │   │   ← _Theater ← Overlay-[LabeledGlobalKey<OverlayState>#49a93] ←
flutter:                          │   │   UnmanagedRestorationScope ← _FocusInheritedScope ← Focus ← ⋯
flutter:                          │   │ parentData: <none> (can use size)
flutter:                          │   │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          │   │ blocks semantics of earlier render objects below the common
flutter:                          │   │ boundary
flutter:                          │   │ size: Size(800.0, 600.0)
flutter:                          │   │ blocking: true
flutter:                          │   │
flutter:                          │   └─child: RenderExcludeSemantics#c1d3f
flutter:                          │     │ creator: ExcludeSemantics ← BlockSemantics ← ModalBarrier ←
flutter:                          │     │   IgnorePointer ← _RenderTheaterMarker ← _EffectiveTickerMode ←
flutter:                          │     │   TickerMode ←
flutter:                          │     │   _OverlayEntryWidget-[LabeledGlobalKey<_OverlayEntryWidgetState>#a47f4]
flutter:                          │     │   ← _Theater ← Overlay-[LabeledGlobalKey<OverlayState>#49a93] ←
flutter:                          │     │   UnmanagedRestorationScope ← _FocusInheritedScope ← ⋯
flutter:                          │     │ parentData: <none> (can use size)
flutter:                          │     │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          │     │ size: Size(800.0, 600.0)
flutter:                          │     │ excluding: true
flutter:                          │     │
flutter:                          │     └─child: RenderSemanticsGestureHandler#70b16
flutter:                          │       │ creator: _GestureSemantics ← RawGestureDetector ←
flutter:                          │       │   _ModalBarrierGestureDetector ← ExcludeSemantics ←
flutter:                          │       │   BlockSemantics ← ModalBarrier ← IgnorePointer ←
flutter:                          │       │   _RenderTheaterMarker ← _EffectiveTickerMode ← TickerMode ←
flutter:                          │       │   _OverlayEntryWidget-[LabeledGlobalKey<_OverlayEntryWidgetState>#a47f4]
flutter:                          │       │   ← _Theater ← ⋯
flutter:                          │       │ parentData: <none> (can use size)
flutter:                          │       │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          │       │ size: Size(800.0, 600.0)
flutter:                          │       │ behavior: opaque
flutter:                          │       │ gestures: <none>
flutter:                          │       │
flutter:                          │       └─child: RenderPointerListener#1f34a
flutter:                          │         │ creator: Listener ← _GestureSemantics ← RawGestureDetector ←
flutter:                          │         │   _ModalBarrierGestureDetector ← ExcludeSemantics ←
flutter:                          │         │   BlockSemantics ← ModalBarrier ← IgnorePointer ←
flutter:                          │         │   _RenderTheaterMarker ← _EffectiveTickerMode ← TickerMode ←
flutter:                          │         │   _OverlayEntryWidget-[LabeledGlobalKey<_OverlayEntryWidgetState>#a47f4]
flutter:                          │         │   ← ⋯
flutter:                          │         │ parentData: <none> (can use size)
flutter:                          │         │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          │         │ size: Size(800.0, 600.0)
flutter:                          │         │ behavior: opaque
flutter:                          │         │ listeners: down, panZoomStart
flutter:                          │         │
flutter:                          │         └─child: RenderSemanticsAnnotations#73467
flutter:                          │           │ creator: Semantics ← Listener ← _GestureSemantics ←
flutter:                          │           │   RawGestureDetector ← _ModalBarrierGestureDetector ←
flutter:                          │           │   ExcludeSemantics ← BlockSemantics ← ModalBarrier ←
flutter:                          │           │   IgnorePointer ← _RenderTheaterMarker ← _EffectiveTickerMode ←
flutter:                          │           │   TickerMode ← ⋯
flutter:                          │           │ parentData: <none> (can use size)
flutter:                          │           │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          │           │ size: Size(800.0, 600.0)
flutter:                          │           │
flutter:                          │           └─child: RenderMouseRegion#560dc
flutter:                          │             │ creator: MouseRegion ← Semantics ← Listener ← _GestureSemantics ←
flutter:                          │             │   RawGestureDetector ← _ModalBarrierGestureDetector ←
flutter:                          │             │   ExcludeSemantics ← BlockSemantics ← ModalBarrier ←
flutter:                          │             │   IgnorePointer ← _RenderTheaterMarker ← _EffectiveTickerMode ← ⋯
flutter:                          │             │ parentData: <none> (can use size)
flutter:                          │             │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          │             │ size: Size(800.0, 600.0)
flutter:                          │             │ behavior: opaque
flutter:                          │             │ listeners: <none>
flutter:                          │             │ cursor: SystemMouseCursor(basic)
flutter:                          │             │
flutter:                          │             └─child: RenderConstrainedBox#01e8c
flutter:                          │                 creator: ConstrainedBox ← MouseRegion ← Semantics ← Listener ←
flutter:                          │                   _GestureSemantics ← RawGestureDetector ←
flutter:                          │                   _ModalBarrierGestureDetector ← ExcludeSemantics ←
flutter:                          │                   BlockSemantics ← ModalBarrier ← IgnorePointer ←
flutter:                          │                   _RenderTheaterMarker ← ⋯
flutter:                          │                 parentData: <none> (can use size)
flutter:                          │                 constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          │                 size: Size(800.0, 600.0)
flutter:                          │                 additionalConstraints: BoxConstraints(biggest)
flutter:                          │
flutter:                          ├─onstage 2: RenderSemanticsAnnotations#8187b
flutter:                          ╎ │ needs compositing
flutter:                          ╎ │ creator: Semantics ← _RenderTheaterMarker ← _EffectiveTickerMode
flutter:                          ╎ │   ← TickerMode ←
flutter:                          ╎ │   _OverlayEntryWidget-[LabeledGlobalKey<_OverlayEntryWidgetState>#8cd54]
flutter:                          ╎ │   ← _Theater ← Overlay-[LabeledGlobalKey<OverlayState>#49a93] ←
flutter:                          ╎ │   UnmanagedRestorationScope ← _FocusInheritedScope ← Focus ←
flutter:                          ╎ │   _FocusInheritedScope ← Focus ← ⋯
flutter:                          ╎ │ parentData: not positioned; offset=Offset(0.0, 0.0) (can use
flutter:                          ╎ │   size)
flutter:                          ╎ │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎ │ size: Size(800.0, 600.0)
flutter:                          ╎ │
flutter:                          ╎ └─child: RenderOffstage#f211d
flutter:                          ╎   │ needs compositing
flutter:                          ╎   │ creator: Offstage ← _ModalScopeStatus ← UnmanagedRestorationScope
flutter:                          ╎   │   ← RestorationScope ← AnimatedBuilder ←
flutter:                          ╎   │   _ModalScope<dynamic>-[LabeledGlobalKey<_ModalScopeState<dynamic>>#db401]
flutter:                          ╎   │   ← Semantics ← _RenderTheaterMarker ← _EffectiveTickerMode ←
flutter:                          ╎   │   TickerMode ←
flutter:                          ╎   │   _OverlayEntryWidget-[LabeledGlobalKey<_OverlayEntryWidgetState>#8cd54]
flutter:                          ╎   │   ← _Theater ← ⋯
flutter:                          ╎   │ parentData: <none> (can use size)
flutter:                          ╎   │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎   │ size: Size(800.0, 600.0)
flutter:                          ╎   │ offstage: false
flutter:                          ╎   │
flutter:                          ╎   └─child: RenderSemanticsAnnotations#9436c
flutter:                          ╎     │ needs compositing
flutter:                          ╎     │ creator: Semantics ← FocusScope ← PrimaryScrollController ←
flutter:                          ╎     │   _ActionsScope ← Actions ← Builder ← PageStorage ← Offstage ←
flutter:                          ╎     │   _ModalScopeStatus ← UnmanagedRestorationScope ←
flutter:                          ╎     │   RestorationScope ← AnimatedBuilder ← ⋯
flutter:                          ╎     │ parentData: <none> (can use size)
flutter:                          ╎     │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎     │ size: Size(800.0, 600.0)
flutter:                          ╎     │
flutter:                          ╎     └─child: RenderRepaintBoundary#f8f28
flutter:                          ╎       │ needs compositing
flutter:                          ╎       │ creator: RepaintBoundary ← _FocusInheritedScope ← Semantics ←
flutter:                          ╎       │   FocusScope ← PrimaryScrollController ← _ActionsScope ← Actions
flutter:                          ╎       │   ← Builder ← PageStorage ← Offstage ← _ModalScopeStatus ←
flutter:                          ╎       │   UnmanagedRestorationScope ← ⋯
flutter:                          ╎       │ parentData: <none> (can use size)
flutter:                          ╎       │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎       │ layer: OffsetLayer#e73b7
flutter:                          ╎       │ size: Size(800.0, 600.0)
flutter:                          ╎       │ metrics: 66.7% useful (1 bad vs 2 good)
flutter:                          ╎       │ diagnosis: insufficient data to draw conclusion (less than five
flutter:                          ╎       │   repaints)
flutter:                          ╎       │
flutter:                          ╎       └─child: RenderFractionalTranslation#c3a54
flutter:                          ╎         │ needs compositing
flutter:                          ╎         │ creator: FractionalTranslation ← SlideTransition ←
flutter:                          ╎         │   CupertinoPageTransition ← AnimatedBuilder ← RepaintBoundary ←
flutter:                          ╎         │   _FocusInheritedScope ← Semantics ← FocusScope ←
flutter:                          ╎         │   PrimaryScrollController ← _ActionsScope ← Actions ← Builder ← ⋯
flutter:                          ╎         │ parentData: <none> (can use size)
flutter:                          ╎         │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎         │ size: Size(800.0, 600.0)
flutter:                          ╎         │ translation: Offset(0.0, 0.0)
flutter:                          ╎         │ transformHitTests: false
flutter:                          ╎         │
flutter:                          ╎         └─child: RenderFractionalTranslation#7fcf2
flutter:                          ╎           │ needs compositing
flutter:                          ╎           │ creator: FractionalTranslation ← SlideTransition ←
flutter:                          ╎           │   FractionalTranslation ← SlideTransition ←
flutter:                          ╎           │   CupertinoPageTransition ← AnimatedBuilder ← RepaintBoundary ←
flutter:                          ╎           │   _FocusInheritedScope ← Semantics ← FocusScope ←
flutter:                          ╎           │   PrimaryScrollController ← _ActionsScope ← ⋯
flutter:                          ╎           │ parentData: <none> (can use size)
flutter:                          ╎           │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎           │ size: Size(800.0, 600.0)
flutter:                          ╎           │ translation: Offset(0.0, 0.0)
flutter:                          ╎           │ transformHitTests: true
flutter:                          ╎           │
flutter:                          ╎           └─child: RenderDecoratedBox#713ec
flutter:                          ╎             │ needs compositing
flutter:                          ╎             │ creator: DecoratedBox ← DecoratedBoxTransition ←
flutter:                          ╎             │   FractionalTranslation ← SlideTransition ← FractionalTranslation
flutter:                          ╎             │   ← SlideTransition ← CupertinoPageTransition ← AnimatedBuilder ←
flutter:                          ╎             │   RepaintBoundary ← _FocusInheritedScope ← Semantics ← FocusScope
flutter:                          ╎             │   ← ⋯
flutter:                          ╎             │ parentData: <none> (can use size)
flutter:                          ╎             │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎             │ size: Size(800.0, 600.0)
flutter:                          ╎             │ ├─decoration: _CupertinoEdgeShadowDecoration
flutter:                          ╎             │     colors: Color(0x04000000), Color(0x00000000)
flutter:                          ╎             │
flutter:                          ╎             │ configuration: ImageConfiguration(bundle:
flutter:                          ╎             │   PlatformAssetBundle#164ca(), devicePixelRatio: 1.0, locale:
flutter:                          ╎             │   en_US, textDirection: TextDirection.ltr, platform: macOS)
flutter:                          ╎             │
flutter:                          ╎             └─child: RenderStack#83b13
flutter:                          ╎               │ needs compositing
flutter:                          ╎               │ creator: Stack ← _CupertinoBackGestureDetector<dynamic> ←
flutter:                          ╎               │   DecoratedBox ← DecoratedBoxTransition ← FractionalTranslation ←
flutter:                          ╎               │   SlideTransition ← FractionalTranslation ← SlideTransition ←
flutter:                          ╎               │   CupertinoPageTransition ← AnimatedBuilder ← RepaintBoundary ←
flutter:                          ╎               │   _FocusInheritedScope ← ⋯
flutter:                          ╎               │ parentData: <none> (can use size)
flutter:                          ╎               │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎               │ size: Size(800.0, 600.0)
flutter:                          ╎               │ alignment: AlignmentDirectional.topStart
flutter:                          ╎               │ textDirection: ltr
flutter:                          ╎               │ fit: passthrough
flutter:                          ╎               │
flutter:                          ╎               ├─child 1: RenderIgnorePointer#ad50f
flutter:                          ╎               │ │ needs compositing
flutter:                          ╎               │ │ creator: IgnorePointer ← AnimatedBuilder ← Stack ←
flutter:                          ╎               │ │   _CupertinoBackGestureDetector<dynamic> ← DecoratedBox ←
flutter:                          ╎               │ │   DecoratedBoxTransition ← FractionalTranslation ←
flutter:                          ╎               │ │   SlideTransition ← FractionalTranslation ← SlideTransition ←
flutter:                          ╎               │ │   CupertinoPageTransition ← AnimatedBuilder ← ⋯
flutter:                          ╎               │ │ parentData: not positioned; offset=Offset(0.0, 0.0) (can use
flutter:                          ╎               │ │   size)
flutter:                          ╎               │ │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎               │ │ size: Size(800.0, 600.0)
flutter:                          ╎               │ │ ignoring: false
flutter:                          ╎               │ │ ignoringSemantics: null
flutter:                          ╎               │ │
flutter:                          ╎               │ └─child: RenderRepaintBoundary#29754
flutter:                          ╎               │   │ needs compositing
flutter:                          ╎               │   │ creator: RepaintBoundary-[GlobalKey#75409] ← IgnorePointer ←
flutter:                          ╎               │   │   AnimatedBuilder ← Stack ←
flutter:                          ╎               │   │   _CupertinoBackGestureDetector<dynamic> ← DecoratedBox ←
flutter:                          ╎               │   │   DecoratedBoxTransition ← FractionalTranslation ←
flutter:                          ╎               │   │   SlideTransition ← FractionalTranslation ← SlideTransition ←
flutter:                          ╎               │   │   CupertinoPageTransition ← ⋯
flutter:                          ╎               │   │ parentData: <none> (can use size)
flutter:                          ╎               │   │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎               │   │ layer: OffsetLayer#fa835
flutter:                          ╎               │   │ size: Size(800.0, 600.0)
flutter:                          ╎               │   │ metrics: 90.9% useful (1 bad vs 10 good)
flutter:                          ╎               │   │ diagnosis: this is an outstandingly useful repaint boundary and
flutter:                          ╎               │   │   should definitely be kept
flutter:                          ╎               │   │
flutter:                          ╎               │   └─child: RenderSemanticsAnnotations#95566
flutter:                          ╎               │     │ creator: Semantics ← Builder ← RepaintBoundary-[GlobalKey#75409]
flutter:                          ╎               │     │   ← IgnorePointer ← AnimatedBuilder ← Stack ←
flutter:                          ╎               │     │   _CupertinoBackGestureDetector<dynamic> ← DecoratedBox ←
flutter:                          ╎               │     │   DecoratedBoxTransition ← FractionalTranslation ←
flutter:                          ╎               │     │   SlideTransition ← FractionalTranslation ← ⋯
flutter:                          ╎               │     │ parentData: <none> (can use size)
flutter:                          ╎               │     │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎               │     │ size: Size(800.0, 600.0)
flutter:                          ╎               │     │
flutter:                          ╎               │     └─child: RenderPhysicalModel#bc9d7
flutter:                          ╎               │       │ creator: PhysicalModel ← AnimatedPhysicalModel ← Material ←
flutter:                          ╎               │       │   AppHome ← Semantics ← Builder ←
flutter:                          ╎               │       │   RepaintBoundary-[GlobalKey#75409] ← IgnorePointer ←
flutter:                          ╎               │       │   AnimatedBuilder ← Stack ←
flutter:                          ╎               │       │   _CupertinoBackGestureDetector<dynamic> ← DecoratedBox ← ⋯
flutter:                          ╎               │       │ parentData: <none> (can use size)
flutter:                          ╎               │       │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎               │       │ size: Size(800.0, 600.0)
flutter:                          ╎               │       │ elevation: 0.0
flutter:                          ╎               │       │ color: Color(0xfffafafa)
flutter:                          ╎               │       │ shadowColor: Color(0xfffafafa)
flutter:                          ╎               │       │ shape: BoxShape.rectangle
flutter:                          ╎               │       │ borderRadius: BorderRadius.zero
flutter:                          ╎               │       │
flutter:                          ╎               │       └─child: _RenderInkFeatures#ac819
flutter:                          ╎               │         │ creator: _InkFeatures-[GlobalKey#d721e ink renderer] ←
flutter:                          ╎               │         │   NotificationListener<LayoutChangedNotification> ← PhysicalModel
flutter:                          ╎               │         │   ← AnimatedPhysicalModel ← Material ← AppHome ← Semantics ←
flutter:                          ╎               │         │   Builder ← RepaintBoundary-[GlobalKey#75409] ← IgnorePointer ←
flutter:                          ╎               │         │   AnimatedBuilder ← Stack ← ⋯
flutter:                          ╎               │         │ parentData: <none> (can use size)
flutter:                          ╎               │         │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎               │         │ size: Size(800.0, 600.0)
flutter:                          ╎               │         │
flutter:                          ╎               │         └─child: RenderPositionedBox#dc1df
flutter:                          ╎               │           │ creator: Center ← DefaultTextStyle ← AnimatedDefaultTextStyle ←
flutter:                          ╎               │           │   _InkFeatures-[GlobalKey#d721e ink renderer] ←
flutter:                          ╎               │           │   NotificationListener<LayoutChangedNotification> ← PhysicalModel
flutter:                          ╎               │           │   ← AnimatedPhysicalModel ← Material ← AppHome ← Semantics ←
flutter:                          ╎               │           │   Builder ← RepaintBoundary-[GlobalKey#75409] ← ⋯
flutter:                          ╎               │           │ parentData: <none> (can use size)
flutter:                          ╎               │           │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:                          ╎               │           │ size: Size(800.0, 600.0)
flutter:                          ╎               │           │ alignment: Alignment.center
flutter:                          ╎               │           │ textDirection: ltr
flutter:                          ╎               │           │ widthFactor: expand
flutter:                          ╎               │           │ heightFactor: expand
flutter:                          ╎               │           │
flutter:                          ╎               │           └─child: RenderSemanticsAnnotations#a0a4b relayoutBoundary=up1
flutter:                          ╎               │             │ creator: Semantics ← TextButton ← Center ← DefaultTextStyle ←
flutter:                          ╎               │             │   AnimatedDefaultTextStyle ← _InkFeatures-[GlobalKey#d721e ink
flutter:                          ╎               │             │   renderer] ← NotificationListener<LayoutChangedNotification> ←
flutter:                          ╎               │             │   PhysicalModel ← AnimatedPhysicalModel ← Material ← AppHome ←
flutter:                          ╎               │             │   Semantics ← ⋯
flutter:                          ╎               │             │ parentData: offset=Offset(329.0, 286.0) (can use size)
flutter:                          ╎               │             │ constraints: BoxConstraints(0.0<=w<=800.0, 0.0<=h<=600.0)
flutter:                          ╎               │             │ semantic boundary
flutter:                          ╎               │             │ size: Size(142.0, 28.0)
flutter:                          ╎               │             │
flutter:                          ╎               │             └─child: _RenderInputPadding#4672f relayoutBoundary=up2
flutter:                          ╎               │               │ creator: _InputPadding ← Semantics ← TextButton ← Center ←
flutter:                          ╎               │               │   DefaultTextStyle ← AnimatedDefaultTextStyle ←
flutter:                          ╎               │               │   _InkFeatures-[GlobalKey#d721e ink renderer] ←
flutter:                          ╎               │               │   NotificationListener<LayoutChangedNotification> ← PhysicalModel
flutter:                          ╎               │               │   ← AnimatedPhysicalModel ← Material ← AppHome ← ⋯
flutter:                          ╎               │               │ parentData: <none> (can use size)
flutter:                          ╎               │               │ constraints: BoxConstraints(0.0<=w<=800.0, 0.0<=h<=600.0)
flutter:                          ╎               │               │ size: Size(142.0, 28.0)
flutter:                          ╎               │               │
flutter:                          ╎               │               └─child: RenderConstrainedBox#425d6 relayoutBoundary=up3
flutter:                          ╎               │                 │ creator: ConstrainedBox ← _InputPadding ← Semantics ← TextButton
flutter:                          ╎               │                 │   ← Center ← DefaultTextStyle ← AnimatedDefaultTextStyle ←
flutter:                          ╎               │                 │   _InkFeatures-[GlobalKey#d721e ink renderer] ←
flutter:                          ╎               │                 │   NotificationListener<LayoutChangedNotification> ← PhysicalModel
flutter:                          ╎               │                 │   ← AnimatedPhysicalModel ← Material ← ⋯
flutter:                          ╎               │                 │ parentData: offset=Offset(0.0, 0.0) (can use size)
flutter:                          ╎               │                 │ constraints: BoxConstraints(0.0<=w<=800.0, 0.0<=h<=600.0)
flutter:                          ╎               │                 │ size: Size(142.0, 28.0)
flutter:                          ╎               │                 │ additionalConstraints: BoxConstraints(56.0<=w<=Infinity,
flutter:                          ╎               │                 │   28.0<=h<=Infinity)
flutter:                          ╎               │                 │
flutter:                          ╎               │                 └─child: RenderPhysicalShape#8e171 relayoutBoundary=up4
flutter:                          ╎               │                   │ creator: PhysicalShape ← _MaterialInterior ← Material ←
flutter:                          ╎               │                   │   ConstrainedBox ← _InputPadding ← Semantics ← TextButton ←
flutter:                          ╎               │                   │   Center ← DefaultTextStyle ← AnimatedDefaultTextStyle ←
flutter:                          ╎               │                   │   _InkFeatures-[GlobalKey#d721e ink renderer] ←
flutter:                          ╎               │                   │   NotificationListener<LayoutChangedNotification> ← ⋯
flutter:                          ╎               │                   │ parentData: <none> (can use size)
flutter:                          ╎               │                   │ constraints: BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0)
flutter:                          ╎               │                   │ size: Size(142.0, 28.0)
flutter:                          ╎               │                   │ elevation: 0.0
flutter:                          ╎               │                   │ color: Color(0x00000000)
flutter:                          ╎               │                   │ shadowColor: Color(0x00000000)
flutter:                          ╎               │                   │ clipper: ShapeBorderClipper
flutter:                          ╎               │                   │
flutter:                          ╎               │                   └─child: RenderCustomPaint#eea46 relayoutBoundary=up5
flutter:                          ╎               │                     │ creator: CustomPaint ← _ShapeBorderPaint ← PhysicalShape ←
flutter:                          ╎               │                     │   _MaterialInterior ← Material ← ConstrainedBox ← _InputPadding ←
flutter:                          ╎               │                     │   Semantics ← TextButton ← Center ← DefaultTextStyle ←
flutter:                          ╎               │                     │   AnimatedDefaultTextStyle ← ⋯
flutter:                          ╎               │                     │ parentData: <none> (can use size)
flutter:                          ╎               │                     │ constraints: BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0)
flutter:                          ╎               │                     │ size: Size(142.0, 28.0)
flutter:                          ╎               │                     │ painter: null
flutter:                          ╎               │                     │ foregroundPainter: _ShapeBorderPainter#ac724()
flutter:                          ╎               │                     │
flutter:                          ╎               │                     └─child: _RenderInkFeatures#b19a7 relayoutBoundary=up6
flutter:                          ╎               │                       │ creator: _InkFeatures-[GlobalKey#87971 ink renderer] ←
flutter:                          ╎               │                       │   NotificationListener<LayoutChangedNotification> ← CustomPaint ←
flutter:                          ╎               │                       │   _ShapeBorderPaint ← PhysicalShape ← _MaterialInterior ←
flutter:                          ╎               │                       │   Material ← ConstrainedBox ← _InputPadding ← Semantics ←
flutter:                          ╎               │                       │   TextButton ← Center ← ⋯
flutter:                          ╎               │                       │ parentData: <none> (can use size)
flutter:                          ╎               │                       │ constraints: BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0)
flutter:                          ╎               │                       │ size: Size(142.0, 28.0)
flutter:                          ╎               │                       │
flutter:                          ╎               │                       └─child: RenderSemanticsAnnotations#4d1b3 relayoutBoundary=up7
flutter:                          ╎               │                         │ creator: Semantics ← _FocusInheritedScope ← Focus ← _ActionsScope
flutter:                          ╎               │                         │   ← Actions ← _ParentInkResponseProvider ←
flutter:                          ╎               │                         │   _InkResponseStateWidget ← InkWell ← DefaultTextStyle ←
flutter:                          ╎               │                         │   AnimatedDefaultTextStyle ← _InkFeatures-[GlobalKey#87971 ink
flutter:                          ╎               │                         │   renderer] ← NotificationListener<LayoutChangedNotification> ← ⋯
flutter:                          ╎               │                         │ parentData: <none> (can use size)
flutter:                          ╎               │                         │ constraints: BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0)
flutter:                          ╎               │                         │ size: Size(142.0, 28.0)
flutter:                          ╎               │                         │
flutter:                          ╎               │                         └─child: RenderMouseRegion#e5b3f relayoutBoundary=up8
flutter:                          ╎               │                           │ creator: MouseRegion ← Semantics ← _FocusInheritedScope ← Focus ←
flutter:                          ╎               │                           │   _ActionsScope ← Actions ← _ParentInkResponseProvider ←
flutter:                          ╎               │                           │   _InkResponseStateWidget ← InkWell ← DefaultTextStyle ←
flutter:                          ╎               │                           │   AnimatedDefaultTextStyle ← _InkFeatures-[GlobalKey#87971 ink
flutter:                          ╎               │                           │   renderer] ← ⋯
flutter:                          ╎               │                           │ parentData: <none> (can use size)
flutter:                          ╎               │                           │ constraints: BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0)
flutter:                          ╎               │                           │ size: Size(142.0, 28.0)
flutter:                          ╎               │                           │ behavior: opaque
flutter:                          ╎               │                           │ listeners: enter, exit
flutter:                          ╎               │                           │ cursor: SystemMouseCursor(click)
flutter:                          ╎               │                           │
flutter:                          ╎               │                           └─child: RenderSemanticsAnnotations#deb9b relayoutBoundary=up9
flutter:                          ╎               │                             │ creator: Semantics ← DefaultSelectionStyle ← Builder ←
flutter:                          ╎               │                             │   MouseRegion ← Semantics ← _FocusInheritedScope ← Focus ←
flutter:                          ╎               │                             │   _ActionsScope ← Actions ← _ParentInkResponseProvider ←
flutter:                          ╎               │                             │   _InkResponseStateWidget ← InkWell ← ⋯
flutter:                          ╎               │                             │ parentData: <none> (can use size)
flutter:                          ╎               │                             │ constraints: BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0)
flutter:                          ╎               │                             │ size: Size(142.0, 28.0)
flutter:                          ╎               │                             │
flutter:                          ╎               │                             └─child: RenderPointerListener#2017a relayoutBoundary=up10
flutter:                          ╎               │                               │ creator: Listener ← RawGestureDetector ← GestureDetector ←
flutter:                          ╎               │                               │   Semantics ← DefaultSelectionStyle ← Builder ← MouseRegion ←
flutter:                          ╎               │                               │   Semantics ← _FocusInheritedScope ← Focus ← _ActionsScope ←
flutter:                          ╎               │                               │   Actions ← ⋯
flutter:                          ╎               │                               │ parentData: <none> (can use size)
flutter:                          ╎               │                               │ constraints: BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0)
flutter:                          ╎               │                               │ size: Size(142.0, 28.0)
flutter:                          ╎               │                               │ behavior: opaque
flutter:                          ╎               │                               │ listeners: down, panZoomStart
flutter:                          ╎               │                               │
flutter:                          ╎               │                               └─child: RenderPadding#8455f relayoutBoundary=up11
flutter:                          ╎               │                                 │ creator: Padding ← IconTheme ← Builder ← Listener ←
flutter:                          ╎               │                                 │   RawGestureDetector ← GestureDetector ← Semantics ←
flutter:                          ╎               │                                 │   DefaultSelectionStyle ← Builder ← MouseRegion ← Semantics ←
flutter:                          ╎               │                                 │   _FocusInheritedScope ← ⋯
flutter:                          ╎               │                                 │ parentData: <none> (can use size)
flutter:                          ╎               │                                 │ constraints: BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0)
flutter:                          ╎               │                                 │ size: Size(142.0, 28.0)
flutter:                          ╎               │                                 │ padding: EdgeInsets(8.0, 0.0, 8.0, 0.0)
flutter:                          ╎               │                                 │ textDirection: ltr
flutter:                          ╎               │                                 │
flutter:                          ╎               │                                 └─child: RenderPositionedBox#80b8d relayoutBoundary=up12
flutter:                          ╎               │                                   │ creator: Align ← Padding ← IconTheme ← Builder ← Listener ←
flutter:                          ╎               │                                   │   RawGestureDetector ← GestureDetector ← Semantics ←
flutter:                          ╎               │                                   │   DefaultSelectionStyle ← Builder ← MouseRegion ← Semantics ← ⋯
flutter:                          ╎               │                                   │ parentData: offset=Offset(8.0, 0.0) (can use size)
flutter:                          ╎               │                                   │ constraints: BoxConstraints(40.0<=w<=784.0, 28.0<=h<=600.0)
flutter:                          ╎               │                                   │ size: Size(126.0, 28.0)
flutter:                          ╎               │                                   │ alignment: Alignment.center
flutter:                          ╎               │                                   │ textDirection: ltr
flutter:                          ╎               │                                   │ widthFactor: 1.0
flutter:                          ╎               │                                   │ heightFactor: 1.0
flutter:                          ╎               │                                   │
flutter:                          ╎               │                                   └─child: RenderParagraph#59bc2 relayoutBoundary=up13
flutter:                          ╎               │                                     │ creator: RichText ← Text ← Align ← Padding ← IconTheme ← Builder
flutter:                          ╎               │                                     │   ← Listener ← RawGestureDetector ← GestureDetector ← Semantics ←
flutter:                          ╎               │                                     │   DefaultSelectionStyle ← Builder ← ⋯
flutter:                          ╎               │                                     │ parentData: offset=Offset(0.0, 6.0) (can use size)
flutter:                          ╎               │                                     │ constraints: BoxConstraints(0.0<=w<=784.0, 0.0<=h<=600.0)
flutter:                          ╎               │                                     │ size: Size(126.0, 16.0)
flutter:                          ╎               │                                     │ textAlign: start
flutter:                          ╎               │                                     │ textDirection: ltr
flutter:                          ╎               │                                     │ softWrap: wrapping at box width
flutter:                          ╎               │                                     │ overflow: clip
flutter:                          ╎               │                                     │ locale: en_US
flutter:                          ╎               │                                     │ maxLines: unlimited
flutter:                          ╎               │                                     ╘═╦══ text ═══
flutter:                          ╎               │                                       ║ TextSpan:
flutter:                          ╎               │                                       ║   debugLabel: ((englishLike labelLarge 2014).merge(blackRedwoodCity
flutter:                          ╎               │                                       ║     labelLarge)).copyWith
flutter:                          ╎               │                                       ║   inherit: false
flutter:                          ╎               │                                       ║   color: MaterialColor(primary value: Color(0xff2196f3))
flutter:                          ╎               │                                       ║   family: .AppleSystemUIFont
flutter:                          ╎               │                                       ║   size: 14.0
flutter:                          ╎               │                                       ║   weight: 500
flutter:                          ╎               │                                       ║   baseline: alphabetic
flutter:                          ╎               │                                       ║   decoration: TextDecoration.none
flutter:                          ╎               │                                       ║   "Dump Render Tree"
flutter:                          ╎               │                                       ╚═══════════
flutter:                          ╎               └─child 2: RenderPointerListener#db4b5
flutter:                          ╎                   creator: Listener ← Positioned ← PositionedDirectional ← Stack ←
flutter:                          ╎                     _CupertinoBackGestureDetector<dynamic> ← DecoratedBox ←
flutter:                          ╎                     DecoratedBoxTransition ← FractionalTranslation ←
flutter:                          ╎                     SlideTransition ← FractionalTranslation ← SlideTransition ←
flutter:                          ╎                     CupertinoPageTransition ← ⋯
flutter:                          ╎                   parentData: top=0.0; bottom=0.0; left=0.0; width=20.0;
flutter:                          ╎                     offset=Offset(0.0, 0.0) (can use size)
flutter:                          ╎                   constraints: BoxConstraints(w=20.0, h=600.0)
flutter:                          ╎                   size: Size(20.0, 600.0)
flutter:                          ╎                   behavior: translucent
flutter:                          ╎                   listeners: down
flutter:                          ╎
flutter:                          └╌no offstage children
flutter:

```
</details>

在 **範例 5** 的 render tree（渲染樹）中：

* `RenderView`，也就是視窗大小（window size），會限制所有 render object（渲染物件），直到且包含 [`RenderPositionedBox`][]`#dc1df` render object，
  其尺寸都受到螢幕大小的限制。
  此範例將尺寸設為 `Size(800.0, 600.0)`

* 每個 render object 的 `constraints` 屬性會限制每個子項的大小。此屬性會以 [`BoxConstraints`][] render object 作為值。
  從 `RenderSemanticsAnnotations#fe6b5` 開始，constraint 等於 `BoxConstraints(w=800.0, h=600.0)`。

* [`Center`][] 元件（Widget）會在 `RenderSemanticsAnnotations#8187b` 子樹下建立 `RenderPositionedBox#dc1df` render object。

* 此 render object 下的每個子項都有同時包含最小值與最大值的 `BoxConstraints`。舉例來說，`RenderSemanticsAnnotations#a0a4b`
  使用了 `BoxConstraints(0.0<=w<=800.0, 0.0<=h<=600.0)`。

* `RenderPhysicalShape#8e171` render object 的所有子項都使用 `BoxConstraints(BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0))`。

* 子項 `RenderPadding#8455f` 設定了 `padding` 值為 `EdgeInsets(8.0, 0.0, 8.0, 0.0)`。
  這會為該 render object 之後的所有子項設定左右各 8 的 padding（內距）。
  它們現在有了新的 constraints：
  `BoxConstraints(40.0<=w<=784.0, 28.0<=h<=600.0)`。

這個物件，根據 `creator` 欄位顯示，很可能是 [`TextButton`][] 的定義的一部分，
它會對其內容設定最小寬度為 88 像素，以及特定高度 36.0。這是 `TextButton` 類別，實作了 Material Design 關於按鈕尺寸的設計指引。

`RenderPositionedBox#80b8d` render object 會再次放寬 constraints，以便將文字置中於按鈕內。
[`RenderParagraph`][]#59bc2 render object 會根據其內容決定自身尺寸。
如果你沿著樹往上追蹤尺寸，
你會看到文字的大小如何影響組成按鈕的所有方塊的寬度。
所有父層都會根據子項的尺寸來決定自身大小。

另一個觀察方式是查看每個方塊描述中的 `relayoutBoundary` 屬性。
這會告訴你有多少祖先會依賴此元素的尺寸。

舉例來說，最內層的 `RenderPositionedBox` 行有一個 `relayoutBoundary=up13`。
這表示當 Flutter 將 `RenderConstrainedBox` 標記為 dirty（需重繪）時，
也會將該方塊的 13 個祖先標記為 dirty，因為新的尺寸可能會影響這些祖先。

如果你要自訂 render object 並希望在 dump 中加入資訊，
請覆寫 [`debugFillProperties()`][render-fill]。
在方法的參數中加入 [DiagnosticsProperty][] 物件，
然後呼叫父類別的方法。

### 列印 layer tree（圖層樹）

若要除錯合成（compositing）問題，請使用 [`debugDumpLayerTree()`][]。

#### 範例 6：呼叫 `debugDumpLayerTree()`

<?code-excerpt "lib/dump_layer_tree.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpLayerTree();
          },
          child: const Text('Dump Layer Tree'),
        ),
      ),
    );
  }
}
```

<details>
<summary><strong>展開以檢視 Example 6 的 layer tree 輸出</strong></summary>

```plaintext
flutter: TransformLayer#214da
flutter:  │ owner: RenderView#ebaaf
flutter:  │ creator: [root]
flutter:  │ engine layer: TransformEngineLayer#535de
flutter:  │ handles: 1
flutter:  │ offset: Offset(0.0, 0.0)
flutter:  │ transform:
flutter:  │   [0] 1.0,0.0,0.0,0.0
flutter:  │   [1] 0.0,1.0,0.0,0.0
flutter:  │   [2] 0.0,0.0,1.0,0.0
flutter:  │   [3] 0.0,0.0,0.0,1.0
flutter:  │
flutter:  ├─child 1: OffsetLayer#0f766
flutter:  │ │ creator: RepaintBoundary ← _FocusInheritedScope ← Semantics ←
flutter:  │ │   FocusScope ← PrimaryScrollController ← _ActionsScope ← Actions
flutter:  │ │   ← Builder ← PageStorage ← Offstage ← _ModalScopeStatus ←
flutter:  │ │   UnmanagedRestorationScope ← ⋯
flutter:  │ │ engine layer: OffsetEngineLayer#1768d
flutter:  │ │ handles: 2
flutter:  │ │ offset: Offset(0.0, 0.0)
flutter:  │ │
flutter:  │ ├─child 1: PictureLayer#dd023
flutter:  │ │   handles: 1
flutter:  │ │   paint bounds: Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:  │ │   picture: _NativePicture#36f94
flutter:  │ │   raster cache hints: isComplex = false, willChange = false
flutter:  │ │
flutter:  │ └─child 2: OffsetLayer#4cfc8
flutter:  │   │ creator: RepaintBoundary-[GlobalKey#bd5d9] ← IgnorePointer ←
flutter:  │   │   AnimatedBuilder ← Stack ←
flutter:  │   │   _CupertinoBackGestureDetector<dynamic> ← DecoratedBox ←
flutter:  │   │   DecoratedBoxTransition ← FractionalTranslation ←
flutter:  │   │   SlideTransition ← FractionalTranslation ← SlideTransition ←
flutter:  │   │   CupertinoPageTransition ← ⋯
flutter:  │   │ engine layer: OffsetEngineLayer#a1676
flutter:  │   │ handles: 2
flutter:  │   │ offset: Offset(0.0, 0.0)
flutter:  │   │
flutter:  │   └─child 1: PictureLayer#aee55
flutter:  │       handles: 1
flutter:  │       paint bounds: Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:  │       picture: _NativePicture#e732d
flutter:  │       raster cache hints: isComplex = false, willChange = false
flutter:  │
flutter:  └─child 2: PictureLayer#b16e5
flutter:      handles: 1
flutter:      paint bounds: Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:      picture: _NativePicture#eef0a
flutter:      raster cache hints: isComplex = false, willChange = false
flutter:
```
</details>

`RepaintBoundary` 元件（Widget）會建立：

1. 一個 `RenderRepaintBoundary` RenderObject 於 render tree 中，
   如 **範例 5** 的結果所示。

   ```plaintext
   ╎     └─child: RenderRepaintBoundary#f8f28
   ╎       │ needs compositing
   ╎       │ creator: RepaintBoundary ← _FocusInheritedScope ← Semantics ←
   ╎       │   FocusScope ← PrimaryScrollController ← _ActionsScope ← Actions
   ╎       │   ← Builder ← PageStorage ← Offstage ← _ModalScopeStatus ←
   ╎       │   UnmanagedRestorationScope ← ⋯
   ╎       │ parentData: <none> (can use size)
   ╎       │ constraints: BoxConstraints(w=800.0, h=600.0)
   ╎       │ layer: OffsetLayer#e73b7
   ╎       │ size: Size(800.0, 600.0)
   ╎       │ metrics: 66.7% useful (1 bad vs 2 good)
   ╎       │ diagnosis: insufficient data to draw conclusion (less than five
   ╎       │   repaints)
   ```

1. 如 **範例 6** 所示，會在圖層樹（layer tree）中產生一個新的圖層。

   ```plaintext
   ├─child 1: OffsetLayer#0f766
   │ │ creator: RepaintBoundary ← _FocusInheritedScope ← Semantics ←
   │ │   FocusScope ← PrimaryScrollController ← _ActionsScope ← Actions
   │ │   ← Builder ← PageStorage ← Offstage ← _ModalScopeStatus ←
   │ │   UnmanagedRestorationScope ← ⋯
   │ │ engine layer: OffsetEngineLayer#1768d
   │ │ handles: 2
   │ │ offset: Offset(0.0, 0.0)
   ```

這樣可以減少需要重繪的範圍。

### 輸出焦點樹（focus tree）

若要除錯焦點（focus）或快捷鍵（shortcut）問題，可以使用 [`debugDumpFocusTree()`][] 函式來輸出焦點樹。

`debugDumpFocusTree()` 方法會回傳應用程式的焦點樹。

焦點樹會以以下方式標記節點：

* 被聚焦（focused）的節點會標記為 `PRIMARY FOCUS`。
* 焦點節點的祖先會標記為 `IN FOCUS PATH`。

如果你的應用程式有使用 [`Focus`][] 元件（Widget），可以利用 [`debugLabel`][]
屬性，讓你更容易在樹狀結構中找到它的焦點節點。

你也可以透過 [`debugFocusChanges`][] 布林屬性，在焦點變更時啟用更詳細的日誌紀錄。

#### 範例 7：呼叫 `debugDumpFocusTree()`

<?code-excerpt "lib/dump_focus_tree.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpFocusTree();
          },
          child: const Text('Dump Focus Tree'),
        ),
      ),
    );
  }
}
```

<details>
<summary><strong>展開以檢視 Example 7 的焦點樹</strong></summary>

```plaintext
flutter: FocusManager#9d096
flutter:  │ primaryFocus: FocusScopeNode#926dc(_ModalScopeState<dynamic>
flutter:  │   Focus Scope [PRIMARY FOCUS])
flutter:  │ primaryFocusCreator: FocusScope ← PrimaryScrollController ←
flutter:  │   _ActionsScope ← Actions ← Builder ← PageStorage ← Offstage ←
flutter:  │   _ModalScopeStatus ← UnmanagedRestorationScope ←
flutter:  │   RestorationScope ← AnimatedBuilder ←
flutter:  │   _ModalScope<dynamic>-[LabeledGlobalKey<_ModalScopeState<dynamic>>#bd53e]
flutter:  │   ← Semantics ← _RenderTheaterMarker ← _EffectiveTickerMode ←
flutter:  │   TickerMode ←
flutter:  │   _OverlayEntryWidget-[LabeledGlobalKey<_OverlayEntryWidgetState>#89dd7]
flutter:  │   ← _Theater ← Overlay-[LabeledGlobalKey<OverlayState>#52f82] ←
flutter:  │   UnmanagedRestorationScope ← ⋯
flutter:  │
flutter:  └─rootScope: FocusScopeNode#f4205(Root Focus Scope [IN FOCUS PATH])
flutter:    │ IN FOCUS PATH
flutter:    │ focusedChildren: FocusScopeNode#a0d10(Navigator Scope [IN FOCUS
flutter:    │   PATH])
flutter:    │
flutter:    └─Child 1: FocusNode#088ec([IN FOCUS PATH])
flutter:      │ context: Focus
flutter:      │ NOT FOCUSABLE
flutter:      │ IN FOCUS PATH
flutter:      │
flutter:      └─Child 1: FocusNode#85f70(Shortcuts [IN FOCUS PATH])
flutter:        │ context: Focus
flutter:        │ NOT FOCUSABLE
flutter:        │ IN FOCUS PATH
flutter:        │
flutter:        └─Child 1: FocusNode#f0c18(Shortcuts [IN FOCUS PATH])
flutter:          │ context: Focus
flutter:          │ NOT FOCUSABLE
flutter:          │ IN FOCUS PATH
flutter:          │
flutter:          └─Child 1: FocusNode#0749f(Shortcuts [IN FOCUS PATH])
flutter:            │ context: Focus
flutter:            │ NOT FOCUSABLE
flutter:            │ IN FOCUS PATH
flutter:            │
flutter:            └─Child 1: _FocusTraversalGroupNode#28990(FocusTraversalGroup [IN FOCUS PATH])
flutter:              │ context: Focus
flutter:              │ NOT FOCUSABLE
flutter:              │ IN FOCUS PATH
flutter:              │
flutter:              └─Child 1: FocusNode#5b515(Shortcuts [IN FOCUS PATH])
flutter:                │ context: Focus
flutter:                │ NOT FOCUSABLE
flutter:                │ IN FOCUS PATH
flutter:                │
flutter:                └─Child 1: FocusScopeNode#a0d10(Navigator Scope [IN FOCUS PATH])
flutter:                  │ context: FocusScope
flutter:                  │ IN FOCUS PATH
flutter:                  │ focusedChildren: FocusScopeNode#926dc(_ModalScopeState<dynamic>
flutter:                  │   Focus Scope [PRIMARY FOCUS])
flutter:                  │
flutter:                  └─Child 1: _FocusTraversalGroupNode#72c8a(FocusTraversalGroup [IN FOCUS PATH])
flutter:                    │ context: Focus
flutter:                    │ NOT FOCUSABLE
flutter:                    │ IN FOCUS PATH
flutter:                    │
flutter:                    └─Child 1: FocusNode#eb709(Navigator [IN FOCUS PATH])
flutter:                      │ context: Focus
flutter:                      │ IN FOCUS PATH
flutter:                      │
flutter:                      └─Child 1: FocusScopeNode#926dc(_ModalScopeState<dynamic> Focus Scope [PRIMARY FOCUS])
flutter:                        │ context: FocusScope
flutter:                        │ PRIMARY FOCUS
flutter:                        │
flutter:                        └─Child 1: FocusNode#a6b74
flutter:                            context: Focus
flutter:
```
</details>

### 列印語意樹（semantics tree）

`debugDumpSemanticsTree()` 函式會列印應用程式的語意樹（semantics tree）。

語意樹（Semantics tree）會提供給系統的無障礙 API 使用。
若要取得語意樹的傾印（dump），請依下列步驟操作：

1. 使用系統的無障礙工具，或是 `SemanticsDebugger`，啟用無障礙功能
1. 使用 [`debugDumpSemanticsTree()`][] 函式。

#### 範例 8：呼叫 `debugDumpSemanticsTree()`

<?code-excerpt "lib/dump_semantic_tree.dart"?>
```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: Semantics(
          button: true,
          enabled: true,
          label: 'Clickable text here!',
          child: GestureDetector(
            onTap: () {
              debugDumpSemanticsTree();
              if (kDebugMode) {
                print('Clicked!');
              }
            },
            child: const Text('Click Me!', style: TextStyle(fontSize: 56)),
          ),
        ),
      ),
    );
  }
}
```

<details>
<summary><strong>展開以檢視範例 8 的語意樹</strong></summary>

```plaintext
flutter: SemanticsNode#0
flutter:  │ Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:  │
flutter:  └─SemanticsNode#1
flutter:    │ Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:    │ textDirection: ltr
flutter:    │
flutter:    └─SemanticsNode#2
flutter:      │ Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:      │ sortKey: OrdinalSortKey#824a2(order: 0.0)
flutter:      │
flutter:      └─SemanticsNode#3
flutter:        │ Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:        │ flags: scopesRoute
flutter:        │
flutter:        └─SemanticsNode#4
flutter:            Rect.fromLTRB(278.0, 267.0, 522.0, 333.0)
flutter:            actions: tap
flutter:            flags: isButton, hasEnabledState, isEnabled
flutter:            label:
flutter:              "Clickable text here!
flutter:              Click Me!"
flutter:            textDirection: ltr
flutter:
flutter: Clicked!
```
</details>

### 列印事件時序

如果你想知道事件發生的時間點相對於 frame（畫面幀）的開始與結束，可以設定列印來記錄這些事件。
若要將 frame 的開始與結束列印到主控台（console），請切換 [`debugPrintBeginFrameBanner`][]
以及 [`debugPrintEndFrameBanner`][]。

**範例 1 的 frame banner 日誌輸出**

```plaintext
I/flutter : ▄▄▄▄▄▄▄▄ Frame 12         30s 437.086ms ▄▄▄▄▄▄▄▄
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

要列印導致目前 frame 被排程的呼叫堆疊（call stack），請使用 [`debugPrintScheduleFrameStacks`][] 旗標。

## 偵錯版面配置（Layout）問題

若要使用圖形介面（GUI）來偵錯版面配置問題，請將 [`debugPaintSizeEnabled`][] 設為 `true`。
此旗標可在 `rendering` 函式庫中找到。
你可以隨時啟用它，並且在 `true` 期間會影響所有繪製（Painting）。
建議將其加入 `void main()` 入口點的最上方。

#### 範例 9

請參考以下程式碼範例：

<?code-excerpt "lib/debug_flags.dart (debug-paint-size-enabled)"?>
```dart
// Add import to the Flutter rendering library.
import 'package:flutter/rendering.dart';

void main() {
  debugPaintSizeEnabled = true;
  runApp(const MyApp());
}
```

啟用後，Flutter 會在您的應用程式中顯示以下變化：

* 以亮青色邊框顯示所有方框。
* 以淡藍色填充和藍色邊框顯示所有 padding，包覆在子元件（Widget）周圍。
* 以黃色箭頭顯示所有對齊（alignment）定位。
* 當 Spacer 沒有子元件時，以灰色顯示。

[`debugPaintBaselinesEnabled`][] 旗標
則針對具有基線（baseline）的物件做類似的顯示。
應用程式會以亮綠色顯示字母基線（alphabetic baseline），
以橘色顯示表意文字基線（ideographic baseline）。
字母字符會「坐」在字母基線上，
但該基線會「穿過」[CJK 字元][cjk]的底部。
Flutter 會將表意文字基線定位在文字行的最底部。

[`debugPaintPointersEnabled`][] 旗標會開啟特殊模式，
讓您點擊時以青色高亮顯示任何物件。
這有助於判斷某個物件是否未通過 hit test。
這種情況可能發生在物件超出其父元件的邊界，
因此一開始就不會被納入 hit testing。

如果您想要除錯 compositor layer，請考慮使用下列旗標。

* 使用 [`debugPaintLayerBordersEnabled`][] 旗標來尋找每個 layer 的邊界。
  啟用後，每個 layer 的邊界會以橘色框線標示。

* 使用 [`debugRepaintRainbowEnabled`][] 旗標來顯示已重繪的 layer。
  每當 layer 重繪時，會以一組旋轉顏色覆蓋。

Flutter 框架中所有以
`debug...` 開頭的函式或方法僅能在 [debug 模式][debug mode] 下運作。

[cjk]: https://en.wikipedia.org/wiki/CJK_characters

## 除錯動畫（Animation）問題

:::note
要用最少的力氣除錯動畫，請將動畫速度放慢。
若要放慢動畫速度，
請在 DevTools 的 [Inspector 檢查器檢視][Inspector view] 中點擊 **Slow Animations**。
這會將動畫速度降至 20%。
如果您想更細緻地控制動畫速度，
請依照下列指示操作。
:::

將 [`timeDilation`][] 變數（來自 `scheduler`
函式庫）設為大於 1.0 的數值，例如 50.0。
建議只在應用程式啟動時設定一次。
如果您在動畫運行期間動態更改這個值，特別是降低它，
框架可能會偵測到時間倒退，這通常會導致 assert 失敗，
並干擾您的除錯工作。

## 除錯效能問題

:::note
您可以使用 [DevTools][] 達到與部分 debug 旗標類似的效果。
有些 debug 旗標帶來的效益有限。
如果您發現某個旗標的功能希望加到 [DevTools][]，
請[提出 issue][file an issue]。
:::

Flutter 提供多種頂層屬性與函式，
協助您在開發週期的不同階段除錯應用程式。
要使用這些功能，請以 debug 模式編譯您的應用程式。

以下列出一些來自 [rendering 函式庫][rendering library]，
用於除錯效能問題的旗標與函式。

[`debugDumpRenderTree()`][]
: 若要將 rendering tree 輸出至主控台，
  請在非 layout 或 repaint 階段呼叫此函式。

  設定這些旗標的方法有：

  * 編輯框架原始碼。
  * 匯入該模組，在您的 `main()` 函式中設定值，
    然後執行 hot restart。

[`debugPaintLayerBordersEnabled`][]
: 若要顯示每個 layer 的邊界，請將此屬性設為 `true`。
  啟用後，每個 layer 會在其邊界繪製一個方框。

[`debugRepaintRainbowEnabled`][]
: 若要在每個元件（Widget）周圍顯示彩色邊框，請將此屬性設為 `true`。
  這些邊框會隨著使用者在應用程式中滾動而改變顏色。
  若要設定此旗標，請在您的應用程式中以頂層屬性加入 `debugRepaintRainbowEnabled = true;`。
  如果設定此旗標後，任何靜態元件會持續變換顏色，
  請考慮在那些區塊加入 repaint boundaries。

[`debugPrintMarkNeedsLayoutStacks`][]
: 若要判斷應用程式是否產生超出預期的 layout，
  請將此屬性設為 `true`。
  這類 layout 問題可能發生在 timeline、profile，
  或 layout 方法中的 `print` 陳述式。
  啟用後，框架會在主控台輸出 stack trace，
  說明為何每個 render object 會被標記為需要 layout。

[`debugPrintMarkNeedsPaintStacks`][]
: 若要判斷應用程式是否繪製超出預期的 layout，
  請將此屬性設為 `true`。

您也可以隨時產生 stack trace。
若要自行輸出 stack trace，請在應用程式中加入 `debugPrintStack()`
函式。

### 追蹤 Dart 程式碼效能

:::note
您可以使用 DevTools 的 [Timeline events 分頁][Timeline events tab] 來進行追蹤。
您也可以在 Timeline 檢視中匯入與匯出追蹤檔案，
但僅限於 DevTools 產生的檔案。
:::

若要自訂效能追蹤並測量任意 Dart 程式碼片段的 wall time 或 CPU time，
請使用 `dart:developer` [Timeline][] 工具。

1. 開啟您的原始碼。
1. 將想要測量的程式碼包裹在 `Timeline` 方法中。

    <?code-excerpt "lib/perf_trace.dart"?>
    ```dart
    import 'dart:developer';
    
    void main() {
      Timeline.startSync('interesting function');
      // iWonderHowLongThisTakes();
      Timeline.finishSync();
    }
    ```

1. 連接到你的應用程式後，打開 DevTools 的 [Timeline events 標籤頁][Timeline events tab]。
1. 在 **Performance settings**（效能設定）中選擇 **Dart** 錄製選項。
1. 執行你想要測量的功能。

為了確保執行時的效能特性能夠與最終產品盡可能相符，請在 [profile mode][] 下執行你的應用程式。

### 新增效能疊加層（performance overlay）

:::note
你可以透過 [Flutter inspector][] 中的 **Performance Overlay** 按鈕，切換應用程式上的效能疊加層顯示。如果你偏好在程式碼中設定，請參考以下說明。
:::

若要在程式碼中啟用 `PerformanceOverlay` 元件，請將 [`MaterialApp`][]、[`CupertinoApp`][] 或 [`WidgetsApp`][] 的建構函式中的 `showPerformanceOverlay` 屬性設為 `true`：

#### 範例 10

<?code-excerpt "lib/performance_overlay.dart (show-overlay)"?>
```dart
import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      showPerformanceOverlay: true,
      title: 'My Awesome App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'My Awesome App'),
    );
  }
}
```

（如果你沒有使用 `MaterialApp`、`CupertinoApp` 或 `WidgetsApp`，你也可以將你的應用程式包裹在 stack 中，並在 stack 上放置一個由呼叫 [`PerformanceOverlay.allEnabled()`][] 所建立的元件（Widget），即可達到相同效果。）

若要學習如何解讀 overlay（疊加層）中的圖表，請參考 [The performance overlay][] 於
[Profiling Flutter performance][]。

## 新增元件對齊網格

若要在你的應用程式上新增 [Material Design baseline grid][] 疊加層，以協助驗證對齊情況，請在 [`MaterialApp` constructor][] 中加入 `debugShowMaterialGrid` 參數。

若要在非 Material 應用程式中新增疊加層，請加入一個 [`GridPaper`][] 元件（Widget）。

[`_InkFeatures`]: https://api.flutter.dev/flutter/material/InkFeature-class.html
[`BoxConstraints`]: https://api.flutter.dev/flutter/rendering/BoxConstraints-class.html
[`Center`]: https://api.flutter.dev/flutter/widgets/Center-class.html
[`CupertinoApp`]: https://api.flutter.dev/flutter/cupertino/CupertinoApp-class.html
[`debugDumpApp()`]: https://api.flutter.dev/flutter/widgets/debugDumpApp.html
[`debugDumpFocusTree()`]: https://api.flutter.dev/flutter/widgets/debugDumpFocusTree.html
[`debugDumpLayerTree()`]: https://api.flutter.dev/flutter/rendering/debugDumpLayerTree.html
[`debugDumpRenderTree()`]: https://api.flutter.dev/flutter/rendering/debugDumpRenderTree.html
[`debugDumpSemanticsTree()`]: https://api.flutter.dev/flutter/rendering/debugDumpSemanticsTree.html
[`debugFocusChanges`]: https://api.flutter.dev/flutter/widgets/debugFocusChanges.html
[`debugLabel`]: https://api.flutter.dev/flutter/widgets/Focus/debugLabel.html
[`debugPaintBaselinesEnabled`]: https://api.flutter.dev/flutter/rendering/debugPaintBaselinesEnabled.html
[`debugPaintLayerBordersEnabled`]: https://api.flutter.dev/flutter/rendering/debugPaintLayerBordersEnabled.html
[`debugPaintPointersEnabled`]: https://api.flutter.dev/flutter/rendering/debugPaintPointersEnabled.html
[`debugPaintSizeEnabled`]: https://api.flutter.dev/flutter/rendering/debugPaintSizeEnabled.html
[`debugPrint()`]: https://api.flutter.dev/flutter/widgets/debugPrint.html
[`debugPrintBeginFrameBanner`]: https://api.flutter.dev/flutter/scheduler/debugPrintBeginFrameBanner.html
[`debugPrintEndFrameBanner`]: https://api.flutter.dev/flutter/scheduler/debugPrintEndFrameBanner.html
[`debugPrintMarkNeedsLayoutStacks`]: https://api.flutter.dev/flutter/rendering/debugPrintMarkNeedsLayoutStacks.html
[`debugPrintMarkNeedsPaintStacks`]: https://api.flutter.dev/flutter/rendering/debugPrintMarkNeedsPaintStacks.html
[`debugPrintScheduleFrameStacks`]: https://api.flutter.dev/flutter/scheduler/debugPrintScheduleFrameStacks.html
[`debugRepaintRainbowEnabled`]: https://api.flutter.dev/flutter/rendering/debugRepaintRainbowEnabled.html
[`Focus`]: https://api.flutter.dev/flutter/widgets/Focus-class.html
[`GridPaper`]: https://api.flutter.dev/flutter/widgets/GridPaper-class.html
[`log()`]: https://api.flutter.dev/flutter/dart-developer/log.html
[`Material`]: https://api.flutter.dev/flutter/material/Material-class.html
[`MaterialApp` constructor]: https://api.flutter.dev/flutter/material/MaterialApp/MaterialApp.html
[`MaterialApp`]: https://api.flutter.dev/flutter/material/MaterialApp/MaterialApp.html
[`PerformanceOverlay.allEnabled()`]: https://api.flutter.dev/flutter/widgets/PerformanceOverlay/PerformanceOverlay.allEnabled.html
[`print()`]: https://api.flutter.dev/flutter/dart-core/print.html
[`RenderParagraph`]: https://api.flutter.dev/flutter/rendering/RenderParagraph-class.html
[`RenderPositionedBox`]: https://api.flutter.dev/flutter/rendering/RenderPositionedBox-class.html
[`setState()`]: https://api.flutter.dev/flutter/widgets/State/setState.html
[`stderr.method_to_invoke()`]: https://api.flutter.dev/flutter/dart-io/stderr.html
[`TextButton`]: https://api.flutter.dev/flutter/material/TextButton-class.html
[`timeDilation`]: https://api.flutter.dev/flutter/scheduler/timeDilation.html
[`WidgetsApp`]: https://api.flutter.dev/flutter/widgets/WidgetsApp-class.html
[debug mode]: /testing/build-modes#debug
[Debugger]: /tools/devtools/debugger
[Debugging]: /testing/debugging
[DevTools]: /tools/devtools
[DiagnosticsProperty]: https://api.flutter.dev/flutter/foundation/DiagnosticsProperty-class.html
[file an issue]: https://github.com/flutter/devtools/issues
[Flutter inspector]: /tools/devtools/inspector
[frame callback]: https://api.flutter.dev/flutter/scheduler/SchedulerBinding/addPersistentFrameCallback.html
[Inspector view]: /tools/devtools/inspector
[Logging view]: /tools/devtools/logging
[Material Design baseline grid]: https://m3.material.io/foundations/layout/understanding-layout/spacing
[profile mode]: /testing/build-modes#profile
[Profiling Flutter performance]: /perf/ui-performance
[render-fill]: https://api.flutter.dev/flutter/rendering/Layer/debugFillProperties.html
[rendering library]: https://api.flutter.dev/flutter/rendering/rendering-library.html
[The performance overlay]: /perf/ui-performance#the-performance-overlay
[Timeline events tab]: /tools/devtools/performance#timeline-events-tab
[Timeline]: https://api.dart.dev/dart-developer/Timeline-class.html
[widget-fill]: https://api.flutter.dev/flutter/widgets/Widget/debugFillProperties.html

