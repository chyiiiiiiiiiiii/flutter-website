---
title: 在 Flutter 中處理錯誤
description: 如何控制錯誤訊息與錯誤日誌的紀錄
---

<?code-excerpt path-base="testing/errors"?>

Flutter 框架會攔截在框架自身觸發的回呼（callback）期間發生的錯誤，包括在建構（build）、版面配置（layout）與繪製（paint）階段遇到的錯誤。不在 Flutter 回呼內發生的錯誤，框架無法攔截，但你可以透過在 [`PlatformDispatcher`][`PlatformDispatcher`] 上設置錯誤處理器來處理這些錯誤。

所有被 Flutter 攔截的錯誤都會導向 [`FlutterError.onError`][`FlutterError.onError`] 處理器。預設情況下，
這會呼叫 [`FlutterError.presentError`][`FlutterError.presentError`]，
將錯誤資訊輸出到裝置日誌中。
當你從 IDE 執行時，檢查器（inspector）會覆寫這個行為，讓錯誤同時也能導向 IDE 的主控台，方便你檢查訊息中提及的物件。

:::note
建議你在自訂錯誤處理器中呼叫 [`FlutterError.presentError`][`FlutterError.presentError`]，
以便同時在主控台看到日誌。
:::

當錯誤發生在建構（build）階段時，
會呼叫 [`ErrorWidget.builder`][`ErrorWidget.builder`] 回呼，
用來建構取代原本失敗元件（Widget）的元件。
預設情況下，在 debug 模式下會顯示紅色錯誤訊息，
而在 release 模式下則顯示灰色背景。

當錯誤發生時，呼叫堆疊中沒有 Flutter 回呼時，
這些錯誤會由 `PlatformDispatcher` 的錯誤回呼處理。預設情況下，
這只會列印錯誤，不會做其他處理。

你可以自訂這些行為，
通常是在你的 `void main()` 函式中設定。

下方會分別說明每種錯誤類型的處理方式。最下方
有一個可以處理所有錯誤類型的程式碼片段。雖然
你可以直接複製貼上該程式碼，但我們建議你
先熟悉各種錯誤類型的處理方式。

## Flutter 攔截的錯誤

例如，若你希望在 release 模式下，只要 Flutter 攔截到錯誤就讓應用程式立即結束，可以使用以下的處理器：

<?code-excerpt "lib/quit_immediate.dart (on-error-main)"?>
```dart
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    if (kReleaseMode) exit(1);
  };
  runApp(const MyApp());
}

// The rest of the `flutter create` code...
```

:::note
最上層的 [`kReleaseMode`][`kReleaseMode`] 常數用來指示應用程式是否以 release 模式編譯。
:::

這個處理器也可以用來回報錯誤至日誌服務（logging service）。
如需更多細節，請參閱我們的食譜章節：[reporting errors to a service][reporting errors to a service]。

## 為建構階段錯誤定義自訂錯誤元件（Widget）

若要定義一個自訂的錯誤元件（Widget），當 builder 無法建構元件時顯示，請使用 [`MaterialApp.builder`][`MaterialApp.builder`]。

<?code-excerpt "lib/excerpts.dart (custom-error)"?>
```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      builder: (context, widget) {
        Widget error = const Text('...rendering error...');
        if (widget is Scaffold || widget is Navigator) {
          error = Scaffold(body: Center(child: error));
        }
        ErrorWidget.builder = (errorDetails) => error;
        if (widget != null) return widget;
        throw StateError('widget is null');
      },
    );
  }
}
```

## Flutter 無法捕捉的錯誤

請考慮一個 `onPressed` 回呼（callback），它會呼叫一個非同步函式，
例如 `MethodChannel.invokeMethod`（或幾乎任何 plugin）。
例如：

<?code-excerpt "lib/excerpts.dart (on-pressed)" replace="/return //g;/^\);$/)/g"?>
```dart
OutlinedButton(
  child: const Text('Click me!'),
  onPressed: () async {
    const channel = MethodChannel('crashy-custom-channel');
    await channel.invokeMethod('blah');
  },
)
```

如果 `invokeMethod` 拋出錯誤，該錯誤不會被轉發到 `FlutterError.onError`。
相反地，錯誤會被轉發到 `PlatformDispatcher`。

若要攔截這類錯誤，請使用 [`PlatformDispatcher.instance.onError`][`PlatformDispatcher.instance.onError`]。

<?code-excerpt "lib/excerpts.dart (catch-error)"?>
```dart
import 'package:flutter/material.dart';
import 'dart:ui';

void main() {
  MyBackend myBackend = MyBackend();
  PlatformDispatcher.instance.onError = (error, stack) {
    myBackend.sendError(error, stack);
    return true;
  };
  runApp(const MyApp());
}
```

## 處理所有類型的錯誤

假設你希望在發生任何例外時結束應用程式，並且當元件（Widget）建構失敗時顯示自訂的錯誤元件（Widget）——你可以根據以下程式碼片段來處理錯誤：

<?code-excerpt "lib/main.dart (all-errors)"?>
```dart
import 'package:flutter/material.dart';
import 'dart:ui';

Future<void> main() async {
  await myErrorsHandler.initialize();
  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    myErrorsHandler.onErrorDetails(details);
  };
  PlatformDispatcher.instance.onError = (error, stack) {
    myErrorsHandler.onError(error, stack);
    return true;
  };
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      builder: (context, widget) {
        Widget error = const Text('...rendering error...');
        if (widget is Scaffold || widget is Navigator) {
          error = Scaffold(body: Center(child: error));
        }
        ErrorWidget.builder = (errorDetails) => error;
        if (widget != null) return widget;
        throw StateError('widget is null');
      },
    );
  }
}
```

[`ErrorWidget.builder`]: {{site.api}}/flutter/widgets/ErrorWidget/builder.html  
[`FlutterError.onError`]: {{site.api}}/flutter/foundation/FlutterError/onError.html  
[`FlutterError.presentError`]: {{site.api}}/flutter/foundation/FlutterError/presentError.html  
[`kReleaseMode`]:  {{site.api}}/flutter/foundation/kReleaseMode-constant.html  
[`MaterialApp.builder`]: {{site.api}}/flutter/material/MaterialApp/builder.html  
[reporting errors to a service]: /cookbook/maintenance/error-reporting  
[`PlatformDispatcher.instance.onError`]: {{site.api}}/flutter/dart-ui/PlatformDispatcher/onError.html  
[`PlatformDispatcher`]: {{site.api}}/flutter/dart-ui/PlatformDispatcher-class.html
