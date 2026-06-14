---
title: Android 預設頁面轉場效果現已更新為 PredictiveBackPageTransitionsBuilder
description: >-
  Android 的預設頁面轉場效果已更新，以符合平台規範並支援預測性返回功能。
---

## 摘要

Android 的預設頁面轉場效果已從
[`ZoomPageTransitionsBuilder`][] 更新為 [`PredictiveBackPageTransitionsBuilder`][]。
若未使用預測性返回，則會退回使用
[`FadeForwardsPageTransitionsBuilder`][]。

## 背景說明

Android 一直在推出一項名為預測性返回 (predictive back) 的功能，使用者在執行返回手勢時，可以預覽前一個路由或應用程式，並可能取消導航。Flutter 透過元件 (Widget) [`PopScope`][] 以及後續的 [`PredictiveBackPageTransitionsBuilder`][] 新增了對此功能的支援。

同時，Android 也更新了其預設的頁面轉場效果。Flutter 透過 [`FadeForwardsPageTransitionsBuilder`][] 新增了對此功能的支援。

## 變更說明

透過此變更，[`PredictiveBackPageTransitionsBuilder`][] 已取代
[`ZoomPageTransitionsBuilder`][] 成為 Android 上的預設頁面轉場效果。
在不使用預測性返回手勢的一般頁面轉場期間，使用者將看到新的 [`FadeForwardsPageTransitionsBuilder`][] 作為預設的頁面轉場效果。使用預測性返回手勢時，頁面會隨著手勢動畫，並允許取消或確認返回導航。

在以下範例中，未明確指定任何頁面轉場效果，因此主題中的 Android
[預設值]({{site.github}}/flutter/flutter/blob/e983e4bd81f29b17215057fa5c9f46f96cbaf183/packages/flutter/lib/src/material/page_transitions_theme.dart#L806-L813)
會設定為 [`PredictiveBackPageTransitionsBuilder`][]。

```dart
MaterialApp(
  theme: ThemeData(
    brightness: Brightness.light,
  ),
  home: const PageOne(),
);
```

## 遷移指南

若您想保留應用程式原本的 [`ZoomPageTransitionsBuilder`][] 頁面轉場效果，可以在應用程式主題中明確設定頁面轉場。請注意，這樣做將無法支援預測性返回路由轉場。

遷移前的程式碼：

```dart
return MaterialApp(
  theme: ThemeData(
    brightness: Brightness.light,
    // pageTransitionsTheme is the default.
  ),
  home: const MyFirstScreen(),
);
```

遷移後的程式碼：

```dart
MaterialApp(
  theme: ThemeData(
    // pageTransitionsTheme is explicitly set to the old transition on Android.
    pageTransitionsTheme: const PageTransitionsTheme(
      builders: {
        TargetPlatform.android: ZoomPageTransitionsBuilder(),
      },
    ),
  ),
  home: const MyFirstScreen(),
);
```

變更預設轉場效果的副作用之一是，頁面之間轉場所需的時間已從 300ms 增加至 450ms。這可能會導致依賴舊轉場時間的測試出現問題。所幸可以使用 [`TransitionDurationObserver`][] 讓測試不依賴於所使用的頁面轉場效果。

遷移前的程式碼：

```dart
testWidgets('example', (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      onGenerateRoute: (RouteSettings settings) { ... },
    ),
  );

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsNothing);

  // Pump through the whole transition, hardcoded to 300ms.
  await tester.tap(find.text('Next'));
  await tester.pump(const Duration(milliseconds: 300));

  expect(find.text('Page 1'), findsNothing);
  expect(find.text('Page 2'), findsOneWidget);
});
```

遷移後的程式碼：

```dart
testWidgets('example', (WidgetTester tester) async {
  final TransitionDurationObserver observer = TransitionDurationObserver();

  await tester.pumpWidget(
    MaterialApp(
      navigatorObservers: <NavigatorObserver>[observer],
      onGenerateRoute: (RouteSettings settings) { ... },
    ),
  );

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsNothing);

  // Pump through the whole transition independent of the duration.
  await tester.tap(find.text('Next'));
  await observer.pumpPastTransition(tester);

  expect(find.text('Page 1'), findsNothing);
  expect(find.text('Page 2'), findsOneWidget);
});
```

您甚至可以撰寫需要在頁面轉場過程中途進行 pump 的測試，而無需依賴確切的時間長度。

遷移前的程式碼：

```dart
testWidgets('example', (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      onGenerateRoute: (RouteSettings settings) { ... },
    ),
  );

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsNothing);

  // Pump through half of the transition with a hardcoded value.
  await tester.tap(find.text('Back'));
  await tester.pump(const Duration(milliseconds: 150));

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsOneWidget);
});
```

遷移後的程式碼：

```dart
testWidgets('example', (WidgetTester tester) async {
  final TransitionDurationObserver observer = TransitionDurationObserver();

  await tester.pumpWidget(
    MaterialApp(
      navigatorObservers: <NavigatorObserver>[observer],
      onGenerateRoute: (RouteSettings settings) { ... },
    ),
  );

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsNothing);

  // Pump through half of the transition independent of the duration.
  await tester.tap(find.text('Back'));
  await tester.pump(observer.transitionDuration ~/ 2);

  expect(find.text('Page 1'), findsOneWidget);
  expect(find.text('Page 2'), findsOneWidget);
});
```

## 時間軸

導入版本：3.37.0-0.0.pre<br>
穩定版本：3.38.0

## 參考資料

API 文件：

* [`ZoomPageTransitionsBuilder`][]
* [`PredictiveBackPageTransitionsBuilder`][]
* [`FadeForwardsPageTransitionsBuilder`][]
* [`PopScope`][]
* [`TransitionDurationObserver`][]

相關 Issue：

* [Android predictive back route transitions][]

相關 PR：

* [Predictive back route transitions by default][]

[`FadeForwardsPageTransitionsBuilder`]: {{site.api}}/flutter/material/FadeForwardsPageTransitionsBuilder-class.html
[`PopScope`]: {{site.api}}/flutter/widgets/PopScope-class.html
[`PredictiveBackPageTransitionsBuilder`]: {{site.api}}/flutter/material/PredictiveBackPageTransitionsBuilder-class.html
[`TransitionDurationObserver`]: {{site.api}}/flutter/flutter_test/TransitionDurationObserver-class.html
[`ZoomPageTransitionsBuilder`]: {{site.api}}/flutter/material/ZoomPageTransitionsBuilder-class.html

[Android predictive back route transitions]: {{site.github.com}}/flutter/flutter/issues/131961
[Predictive back route transitions by default]: {{site.github}}/flutter/flutter/pull/165832
